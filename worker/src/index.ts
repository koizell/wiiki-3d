/**
 * Proxy de Jev para wiiki-3d.
 *
 * El frontend es una app estática servida desde GitHub Pages. Si la llamada a
 * Jev se hiciera desde el navegador, la API key tendría que viajar en el bundle
 * —donde cualquiera la lee con F12— o exponerse en la petición, que es lo mismo.
 * Este Worker es la única forma de ocultarla: la vive en su entorno, la añade a
 * la petición hacia Jev y nunca se la devuelve al cliente.
 *
 * El Worker no implementa lógica de clasificación. Solo añade credenciales y
 * CORS, y devuelve la respuesta de Jev tal cual: cualquier decisión sobre qué
 * constitutes una respuesta válida corresponde al backend, no a este proxy.
 */

/** Variables de entorno disponibles en el Worker. */
interface Env {
  /** API key de Jev. Se inyecta con `wrangler secret put JEV_API_KEY`. */
  JEV_API_KEY: string;
  /** Único origen permitido a llamar al Worker. */
  ALLOWED_ORIGIN: string;
}

/**
 * Endpoint de Jev, según su documentación oficial (base `https://www.jevai.org`).
 *
 * Va como constante y no como variable de entorno a propósito: es pública, no es
 * un secreto, y tenerla en un solo sitio deja claro cuál es el destino. Si
 * algún día Jev cambia de dominio, se cambia esta línea y nada más.
 */
const JEV_API_URL = 'https://www.jevai.org/api/v1/decisions';

/** Única ruta expuesta. Cualquier otra devuelve 404. */
const CLASSIFY_PATH = '/classify';

/**
 * Cabeceras CORS para el origen permitido.
 *
 * `ALLOWED_ORIGIN` se refleja tal cual, nunca `*`: con `*` este
 * proxy invocable desde cualquier origen de internet. `Vary: Origin` evita que
 * un caché compartido sirva la respuesta de CORS de un origen a otro.
 */
function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

/** Respuesta JSON con CORS. `origin` vacío sirve para los errores de CORS. */
function json(
  body: unknown,
  status: number,
  origin: string
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin),
    },
  });
}

/**
 * Comprueba que el `Origin` de la petición sea el permitido.
 *
 * Es la única defensa real del proxy: sin ella, cualquiera podría usar este
 * Worker como relay gratuito contra la cuota de la API key. Devolver `null`
 * significa "no autorizado"; quien llama decide si responde 403 o continúa sin
 * cabeceras CORS.
 */
function isOriginAllowed(request: Request, allowed: string): boolean {
  return request.headers.get('Origin') === allowed;
}

export default {
  /**
   * Punto de entrada del Worker.
   *
   * El orden de las comprobaciones importa: primero se resuelve el origen,
   * porque un 403 por origen inválido no debe filtrar información sobre el resto
   * de la configuración; después la ruta; y solo al final se toca la key.
   */
  async fetch(request: Request, env: Env): Promise<Response> {
    // 1. CORS: el preflight va antes de cualquier validación de ruta para que el
    //    navegador pueda preguntar sin recibir un error que confunda al cliente.
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env.ALLOWED_ORIGIN),
      });
    }

    // 2. Origen. Se responde 403 sin CORS cuando no coincide: un atacante no
    //    debe poder leer ni siquiera el mensaje de error desde su navegador.
    if (!isOriginAllowed(request, env.ALLOWED_ORIGIN)) {
      return json(
        { error: 'Origen no permitido.' },
        403,
        ''
      );
    }

    // 3. Ruta y método. Un Worker público responde a cualquier método, así que
    //    se restringe a POST sobre la única ruta conocida en lugar de exponer
    //    todo el origin de Jev.
    const url = new URL(request.url);
    if (url.pathname !== CLASSIFY_PATH || request.method !== 'POST') {
      return json({ error: 'Ruta no encontrada.' }, 404, env.ALLOWED_ORIGIN);
    }

    // 4. Credencial. Si falta, el mensaje es genérico a propósito: no se le dice
    //    al cliente que falta configuración, porque eso ajuda a quien busca
    //    sondear el Worker. El detalle va al log del Worker, no a la respuesta.
    if (!env.JEV_API_KEY) {
      console.error('JEV_API_KEY no está configurada en este entorno.');
      return json(
        { error: 'El servicio no está disponible temporalmente.' },
        500,
        env.ALLOWED_ORIGIN
      );
    }

    // 5. Reenvío. El body se pasa tal cual sin parsear: este Worker no valida el
    //    contrato de `ProjectMetadata` ni el de la respuesta de Jev. Esa
    //    validación pertenece al servicio de Jev y al frontend, y duplicarla aquí
    //    solo daría un segundo sitio donde quedar desincronizada.
    let upstream: Response;
    try {
      upstream = await fetch(JEV_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.JEV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: await request.text(),
      });
    } catch (error) {
      console.error('Fallo de red al llamar a Jev:', error);
      return json(
        { error: 'No se pudo contactar con el servicio de análisis.' },
        502,
        env.ALLOWED_ORIGIN
      );
    }

    // 6. Respuesta de Jev tal cual, con su código de estado. Se copia el body
    //    como texto para no reinterpretar el JSON: si Jev devuelve un error con un
    //    formato propio, el frontend debe poder leerlo.
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: {
        'Content-Type':
          upstream.headers.get('Content-Type') ?? 'application/json; charset=utf-8',
        ...corsHeaders(env.ALLOWED_ORIGIN),
      },
    });
  },
} satisfies ExportedHandler<Env>;