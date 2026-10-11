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
 * CORS. La respuesta de Jev se reenvía tal cual —con su código de estado y su
 * cuerpo— para que el frontend pueda leer el formato propio de Jev: cualquier
 * decisión sobre qué constituye una respuesta válida corresponde al backend, no
 * a este proxy.
 *
 * Única excepción: un 5xx de Jev se sustituye por un JSON propio. Cuando el
 * backend de Jev (o su CDN) falla por dentro, lo que llega es la página de error
 * de Cloudflare en `text/plain` — `error code: 502` — que no contiene nada que el
 * frontend pueda usar. Ver el paso 7.
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
 * Recorta un texto para el log, marcando cuándo se ha cortado.
 *
 * Los errores de upstream no siempre son el JSON de Jev: cuando falla por dentro
 * puede llegar la página de error de Cloudflare, que es HTML. Sin recortar, un
 * cuerpo grande inunda el tail y esconde el resto de eventos.
 */
function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}… (${text.length} bytes)`;
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

    // 5. Log de entrada y reenvío.
    //
    // TEMPORAL (diagnóstico del 502). Hasta ahora `wrangler tail` solo mostraba
    // «Ok», que es el resultado de la invocación y no el estado HTTP: un Worker
    // que devuelve una Response 502 también es «Ok». Sin un log explícito no
    // había forma de distinguir un 502 del Worker de un 502 reenviado desde Jev.
    //
    // El body se lee una sola vez y se reutiliza: un `Request` solo puede leerse
    // una vez, así que medirlo aquí y volver a leerlo en el `fetch` fallaría.
    // Se mide en bytes de verdad y no en caracteres porque el payload lleva
    // acentos y `String.length` los contaría como uno solo.
    //
    // Nunca se registra la API key ni el contenido de la petición: solo su
    // tamaño, que basta para distinguir "no llegó nada" de "llegó algo ilegible".
    let requestBody: string;
    try {
      requestBody = await request.text();
    } catch (error) {
      console.error('No se pudo leer el cuerpo de la petición:', error);
      return json({ error: 'Petición no válida.' }, 400, env.ALLOWED_ORIGIN);
    }

    console.log(
      `[jev] ${request.method} ${url.pathname} origin=${request.headers.get('Origin') ?? '(none)'} — ` +
        `entrada: ${new TextEncoder().encode(requestBody).length} bytes`
    );

    // El body se pasa tal cual sin parsear: este Worker no valida el contrato de
    // `ProjectMetadata` ni el de la respuesta de Jev. Esa validación pertenece
    // al servicio de Jev y al frontend, y duplicarla aquí solo daría un segundo
    // sitio donde quedar desincronizada.
    const startedAt = Date.now();
    let upstream: Response;
    try {
      upstream = await fetch(JEV_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.JEV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
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
    const elapsedMs = Date.now() - startedAt;

    // TEMPORAL (diagnóstico del 502): log del reenvío. Nunca se registra la API
    // key ni el cuerpo de entrada; del cuerpo de Jev solo el recorte de abajo.
    console.log(
      `[jev] ${upstream.status} ${upstream.statusText} en ${elapsedMs}ms — ` +
        `content-type: ${upstream.headers.get('Content-Type') ?? '(none)'} — ` +
        `body: ${new TextEncoder().encode(body).length} bytes`
    );

    if (!upstream.ok) {
      // Un 5xx aquí significa que Jev (o su CDN) falló por dentro: el Worker no
      // lanzó una excepción, solo reenvió lo que recibió. El cuerpo se recorta
      // porque puede ser una página de error de Cloudflare, no el JSON de Jev.
      console.error(
        `[jev] Respuesta no-OK de Jev (${upstream.status}) tras ${elapsedMs}ms: ` +
          truncate(body, 500)
      );
    }

    // 7. Degradación de un 5xx de Jev.
    //
    // Solo para errores de upstream. El 500 propio de este Worker —key ausente,
    // más arriba— ya se devuelve antes de llegar aquí y conserva su JSON y su
    // status: es un fallo nuestro y no debe disfrazarse de fallo de Jev.
    //
    // Lo que llega de un 5xx de Jev no es su JSON de error sino la página de
    // Cloudflare en `text/plain` (`error code: 502`), sin información utilizable.
    // Se sustituye por un JSON propio para que el frontend pueda distinguir
    // "Jev está caído" de "el payload es incorrecto".
    //
    // El status de la respuesta es siempre 502, no el de Jev: un proxy que sí
    // habló con upstream pero recibió una respuesta inservible es un 502 por
    // definición. El status original viaja en `upstream_status` para no perderlo.
    if (upstream.status >= 500) {
      return json(
        {
          error:
            'El servicio de análisis de Jev no está disponible en este momento. ' +
            'Inténtalo de nuevo más tarde.',
          upstream_status: upstream.status,
        },
        502,
        env.ALLOWED_ORIGIN
      );
    }

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