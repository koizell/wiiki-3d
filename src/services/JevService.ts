import type { JevClassification, ProjectMetadata, RiskLevel } from './types';

/*
 * ============================================================================
 * RUTAS: cuál es la real y cuál es la de mock
 * ============================================================================
 *
 * REAL   -> `classifyWithJev` -> POST a `${VITE_JEV_PROXY_URL}/classify`
 *          El Worker `wiiki-3d-jev-proxy` es quien añade `env.JEV_API_KEY` y
 *          llama a https://www.jevai.org/api/v1/decisions. El bundle es público,
 *          así que la key NUNCA aparece aquí: solo su URL.
 *
 * MOCK   -> `mockClassify` -> heurística local, sin red.
 *          Se activa con `VITE_JEV_USE_MOCK=true` en el `.env`.
 *
 * El mock se conserva a propósito: con el backend de Jev caído sigue siendo la
 * única forma de que el panel de análisis se pueda desarrollar y demostrar.
 * Las dos rutas comparten los tipos de `services/types.ts`, así que los
 * componentes no distinguen cuál de las dos está activa.
 */

/** Base del proxy, sin barra final para poder concatenar la ruta sin duplicarla. */
const JEV_PROXY_URL = (import.meta.env.VITE_JEV_PROXY_URL ?? '').replace(/\/+$/, '');

/** Ruta única que expone el Worker. */
const CLASSIFY_PATH = '/classify';

/**
 * Interruptor de la ruta de mock.
 *
 * Se compara contra la cadena exacta `'true'` y no se usa un cast a boolean: en
 * Vite toda variable de entorno llega como texto, y `"false"` es truthy, así que
 * `VITE_JEV_USE_MOCK=false` acabaría activando el mock justo cuando se cree que
 * está desactivado.
 */
const MODO_EXPLICITO = import.meta.env.VITE_JEV_USE_MOCK;

/** `true` = demostración local. `false` = pedir al proxy, si lo hay. */
const QUIERE_RED = MODO_EXPLICITO === 'false';

/**
 * Modo con el que funciona de verdad, ya resuelto.
 *
 * **Si no está definido, gana el mock.** Antes era al revés —lo no definido
 * activaba la ruta real— y eso era un fallo real: el flujo de publicación de
 * GitHub Pages no define ninguna de las dos variables, así que el sitio ya
 * publicado iba por `POST /classify` contra su propio dominio, que no existe.
 * Subir un archivo en producción fallaba siempre. Medido el 2026-10-04.
 *
 * La regla ahora no tiene forma de romperse en silencio: **para hablar con la red
 * hay que pedirlo explícitamente y tener a dónde**. Si se pide la ruta real sin
 * proxy, se avisa en consola y se cae a la demostración, que es aproximada pero no
 * falla. Un resultado aproximado es menos malo que una excepción.
 */
export const MODO_CLASIFICACION: 'demo' | 'real' = QUIERE_RED && JEV_PROXY_URL ? 'real' : 'demo';

const USE_MOCK = MODO_CLASIFICACION === 'demo';

if (QUIERE_RED && !JEV_PROXY_URL) {
  console.warn(
    '[Jev] Se pidió la ruta real (VITE_JEV_USE_MOCK=false) pero no hay VITE_JEV_PROXY_URL. ' +
      'Se usa la clasificación de demostración: es aproximada, pero no falla.'
  );
}

/** Latencia simulada, acorde a una llamada de red real. */
const MOCK_LATENCY_MS = 600;

/** Resuelve tras `ms` milisegundos. Sustituye a la llamada HTTP. */
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/** Acota un valor al rango [0, 1]. */
const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/*
 * ============================================================================
 * Contrato de la petición
 * ============================================================================
 *
 * Tipos de pregunta que acepta Jev.
 *
 * `noul` aparece en el contrato de Jev por un typo suyo (querían decir `null`),
 * pero pedirlo tumba su backend: la respuesta es un 502 de Cloudflare en
 * `text/plain`, no un error de validación JSON. Queda en el tipo para no
 * romper a quien lo lea, y documentado aquí para que nadie lo reintroduzca.
 */
type JevQuestionType = 'choice' | 'score' | 'noul';

interface JevQuestion {
  type: JevQuestionType;
  instructions: string;
  /**
   * Opciones o niveles, según el tipo. El nombre es `criteria` en los dos casos,
   * pero **cambia la forma**:
   *
   *   - `choice`: objeto indexado por ID de opción -> etiqueta (2–255 opciones).
   *   - `score`:  array de etiquetas ordenadas (2–10 niveles).
   *   - `noul`:   no se envía; la pregunta solo lleva `instructions`.
   *
   * La asimetría es la trampa: enviar un array en un `choice` o un objeto en un
   * `score` produce `provide 2–255 choice options` / `provide 2–10 descriptive
   * score levels`, que no dicen qué campo esperar. Fuente: /docs de jevai.org.
   */
  criteria?: Record<string, string> | string[];
}

interface JevRequestPayload {
  state: ProjectMetadata;
  /**
   * Preguntas indexadas por su ID.
   *
   * `Record`, nunca `array`. Es la diferencia entre un 400 y un 200: Jev exige
   * "questions must be a JSON object keyed by question ID" y rechaza un array
   * aunque tenga el contenido correcto. El tipado lo hace explícito en el
   * contrato en vez de confiar en que quien lo llama lo recuerde.
   */
  questions: Record<string, JevQuestion>;
}

/** Envoltura de respuesta de Jev, observada en sus errores de validación. */
interface JevEnvelope {
  code?: number;
  message?: string | null;
  data?: unknown;
}

/**
 * Cuerpo con el que el Worker sustituye un 5xx de Jev.
 *
 * Lo que Jev devuelve en ese caso es la página de error de Cloudflare en texto
 * plano, sin nada utilizable, así que el Worker la reemplaza por este JSON. El
 * `upstream_status` es el status real de Jev: la respuesta del Worker siempre es
 * 502, para que el cliente solo tenga que tratar un caso de fallo de servidor.
 */
interface JevUnavailableBody {
  error?: string;
  upstream_status?: number;
}

/**
 * Construye la petición a partir de los metadatos.
 *
 * Se separa de `classifyWithJev` para que el payload se pueda inspeccionar y
 * probar sin hacer red, y para que quede escrito en un único sitio qué se le
 * pregunta a Jev. Una pregunta por cada dato que el panel sabe pintar, de modo
 * que la respuesta se pueda mapear uno a uno.
 */
export function buildJevPayload(metadata: ProjectMetadata): JevRequestPayload {
  return {
    state: metadata,
    questions: {
      risk_level: {
        type: 'choice',
        instructions:
          'Clasifica el riesgo de impresión en 3D de esta pieza. Considera el ' +
          'material, la temperatura de cama y la altura de capa declarados.',
        criteria: {
          low: 'Bajo',
          medium: 'Moderado',
          high: 'Alto',
          critical: 'Crítico',
        },
      },
      warping_risk: {
        type: 'score',
        instructions:
          'Estima la probabilidad de warping (curvatura) de esta pieza, en una ' +
          'escala de riesgo nulo a riesgo máximo.',
        criteria: ['Nulo', 'Bajo', 'Moderado', 'Alto', 'Máximo'],
      },
      needs_support: {
        type: 'noul',
        instructions:
          '¿Necesita la pieza soportes de impresión? Un ángulo de voladizo ' +
          'superior a 45° lo requiere.',
      },
    },
  };
}

/**
 * Extrae el mensaje de error de un cuerpo de Jev o del Worker.
 *
 * Hay tres formatos distintos y todos llegan por el mismo `fetch`:
 *   - `{"code":-1,"message":"...","data":null}` -> errores de Jev (4xx).
 *   - `{"error":"..."}` -> respuestas del propio Worker (403, 404, 500) y su
 *     envoltura de 5xx de Jev.
 *   - `error code: 502` en texto plano -> si un 5xx de Jev llegara sin pasar por
 *     la traducción del Worker. No hay JSON que leer.
 *
 * Devuelve `null` si el cuerpo no es JSON interpretable, para que quien llama
 * pueda escribir un mensaje genérico en vez de imprimir HTML de error al usuario.
 */
function extractErrorMessage(raw: string): string | null {
  try {
    const parsed = JSON.parse(raw) as JevEnvelope & JevUnavailableBody;
    if (typeof parsed.message === 'string' && parsed.message.length > 0) {
      return parsed.message;
    }
    if (typeof parsed.error === 'string' && parsed.error.length > 0) {
      return parsed.error;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Lee el status real de Jev del cuerpo de un 5xx, si el Worker lo incluyó.
 *
 * Devuelve `null` cuando no viene de un 5xx traducido por el Worker, en cuyo
 * caso hay que fiarse del status de la respuesta HTTP.
 */
function extractUpstreamStatus(raw: string): number | null {
  try {
    const parsed = JSON.parse(raw) as JevUnavailableBody;
    return typeof parsed.upstream_status === 'number' ? parsed.upstream_status : null;
  } catch {
    return null;
  }
}

/**
 * Convierte un fallo del proxy o de Jev en un mensaje que pueda leer una persona.
 *
 * Se distingue el 5xx del resto porque es el único caso que no depende de quien
 * usa la app: con el backend de Jev caído, un mensaje accionable es la diferencia
 * entre "no funciona" y "espera y reintenta".
 *
 * Cuando el mensaje viene del Worker ya está redactado para el usuario, así que
 * se devuelve tal cual en vez de envolverlo: concatenarle encima una explicación
 * repetiría el mismo texto dos veces.
 */
function describeFailure(status: number, raw: string): string {
  const detail = extractErrorMessage(raw);

  if (status === 403) {
    return (
      'El análisis fue rechazado por el servidor por un problema de CORS. ' +
      'Comprueba que la app se sirve desde el dominio permitido.'
    );
  }

  if (status >= 500) {
    if (detail) return detail;
    const upstream = extractUpstreamStatus(raw);
    const suffix = upstream !== null ? ` (Jev devolvió ${upstream})` : '';
    return (
      `El servicio de análisis de Jev no está disponible en este momento${suffix}. ` +
      'Inténtalo de nuevo más tarde.'
    );
  }

  if (status === 404) {
    return 'El Worker de análisis no expone la ruta esperada. Puede que la URL del proxy sea incorrecta.';
  }

  if (status >= 400) {
    return detail
      ? `Jev rechazó la petición: ${detail}`
      : `Jev rechazó la petición con un error ${status}.`;
  }

  return detail ?? `El servicio de análisis devolvió una respuesta inesperada (${status}).`;
}

/**
 * Convierte la respuesta de Jev en el diagnóstico que pinta el panel.
 *
 * Basado en la documentación de `https://www.jevai.org/docs`: la envoltura es
 * `{ code, message, data }` con `code 0` en éxito, y el resultado de cada
 * pregunta vive en `data.answers` indexado por el ID que se envió. Cada respuesta
 * trae `choice` (con `probabilities` y `confidence`), `score` (con
 * `probabilities` y una `legend` opcional) o `noul` (probabilidad de sí, 0..1).
 *
 * SIN VERIFICAR CONTRA UNA RESPUESTA REAL: la cuenta está sin crédito, así que
 * sigue sin haberse observado un `200`. La forma viene de la documentación, no
 * de una captura.
 *
 * **Esta función falla o acierta; nunca rellena.** Ante cualquier duda —falta
 * una de las tres respuestas, un campo que no llega, una etiqueta que no se
 * reconoce, un score fuera de rango— lanza un error en vez de devolver un valor
 * por defecto. La razón es concreta: el panel pinta estos campos como si fueran
 * mediciones, y un "warping 0 %" o un "Moderado" inventados aparecerían con la
 * misma autoridad que un dato real, sin ninguna marca que los delate. Un error
 * visible es un problema; una medición falsa es un análisis que miente.
 *
 * La alternativa —admitir `undefined` y que el panel distinga "no medido" de
 * "cero"— está pendiente y es la solución correcta, pero requiere saber si Jev
 * puede devolver respuestas parciales, y eso no se sabrá hasta ver un `200`
 * real. Ver `JevClassification` en `services/types.ts`.
 *
 * `toClassification` es el único sitio que hay que ajustar cuando la API vuelva
 * a estar disponible.
 */
function toClassification(data: unknown): JevClassification {
  if (typeof data !== 'object' || data === null) {
    throw new Error(
      'Jev respondió correctamente pero sin datos reconocibles. El formato de ' +
      'la respuesta puede haber cambiado; hay que actualizar parseJevResponse.'
    );
  }

  const record = data as Record<string, unknown>;

  /**
   * Los resultados van en `data.answers`, indexados por el ID de cada pregunta
   * que se envió. No hay lectura alternativa: si no están ahí, la respuesta no es
   * del contrato que conocemos y adivinar sería fabricar el diagnóstico entero.
   */
  if (typeof record.answers !== 'object' || record.answers === null) {
    throw new Error(
      'Jev respondió sin el campo `answers`, donde van las respuestas a cada ' +
      'pregunta. El formato de la respuesta puede haber cambiado.'
    );
  }

  const answers = record.answers as Record<string, unknown>;

  /**
   * Se exigen las tres respuestas. El payload siempre pregunta las tres, así que
   * una respuesta incompleta no es "un dato que falta": es una respuesta que no
   * entendemos, y tratarla como válida convertiría la ausencia en un cero.
   */
  const missing = QUESTION_IDS.filter((id) => {
    const answer = answers[id];
    return typeof answer !== 'object' || answer === null;
  });

  if (missing.length > 0) {
    throw new Error(
      `Jev no respondió a estas preguntas: ${missing.join(', ')}. Se esperaban ` +
      `las tres (${QUESTION_IDS.join(', ')}).`
    );
  }

  const riskLevel = toRiskLevel(readField(answers, 'risk_level', 'choice'));
  const warpingRisk = toWarpingRisk(
    readField(answers, 'warping_risk', 'score'),
    answers.warping_risk as Record<string, unknown>
  );
  const needsSupport = toNeedsSupport(readField(answers, 'needs_support', 'noul'));

  // `data.guidance` es un campo documentado de la envoltura, no una respuesta de
  // pregunta. Si no viene, el texto se compone localmente a partir de datos ya
  // validados: es una conclusión derivda, no una medición suplantada.
  const guidance = typeof record.guidance === 'string' ? record.guidance : null;

  return {
    riskLevel,
    warpingRisk,
    needsSupport,
    recommendation:
      guidance ?? buildRecommendation(riskLevel, needsSupport, []),
  };
}

/** IDs de las tres preguntas que envía `buildJevPayload`, y su orden de lectura. */
const QUESTION_IDS = ['risk_level', 'warping_risk', 'needs_support'] as const;

/**
 * Lee un campo de la respuesta a una pregunta.
 *
 * Lanza si la respuesta no existe o si le falta ese campo. El nombre del campo
 * que falta se incluye en el mensaje porque es la diferencia entre "Jev cambió el
 * contrato" y "Jev respondió otra cosa", y son arreglos distintos.
 */
function readField(answers: Record<string, unknown>, id: string, field: string): unknown {
  const answer = answers[id];
  if (typeof answer !== 'object' || answer === null) {
    throw new Error(`Jev no devolvió respuesta para la pregunta "${id}".`);
  }
  const value = (answer as Record<string, unknown>)[field];
  if (value === undefined || value === null) {
    throw new Error(
      `La respuesta de "${id}" no trae el campo "${field}", que es el que exige ` +
      'el contrato de Jev para ese tipo de pregunta.'
    );
  }
  return value;
}

/** Niveles que el panel sabe pintar, en el mismo orden que se enviaron como `criteria`. */
const RISK_LEVELS: readonly RiskLevel[] = ['Bajo', 'Moderado', 'Alto', 'Crítico'];

/**
 * Traduce el `choice` de Jev a un nivel de riesgo del panel.
 *
 * La etiqueta tiene que coincidir con las que se enviaron en `criteria`. Si no
 * coincide, la respuesta usa un vocabulario que no conocemos y no hay forma
 * honesta de convertirla: se lanza en vez de devolver un nivel inventado, porque
 * el panel lo pintaría con su badge de color como si fuera una medición.
 */
function toRiskLevel(value: unknown): RiskLevel {
  if (typeof value === 'string') {
    const match = RISK_LEVELS.find((level) => level.toLowerCase() === value.toLowerCase());
    if (match) return match;
    throw new Error(
      `Jev devolvió un nivel de riesgo desconocido: "${value}". Se esperaba uno ` +
      `de ${RISK_LEVELS.map((l) => `"${l}"`).join(', ')}.`
    );
  }
  throw new Error(
    `Jev devolvió un nivel de riesgo de tipo ${typeof value}, no una etiqueta. ` +
    'El contrato espera la etiqueta de una opción `choice`.'
  );
}

/** Etiquetas de los niveles de `warping_risk`, en el orden en que se enviaron. */
const WARPING_LEVELS = ['Nulo', 'Bajo', 'Moderado', 'Alto', 'Máximo'] as const;

/**
 * Normaliza el `score` de Jev a un ratio en [0, 1].
 *
 * Un `score` es un **nivel ordinal**, no una probabilidad: la pregunta se envía
 * con cinco `criteria` ordenadas, así que el score es un índice dentro de esa
 * lista y el panel necesita un ratio para formatearlo como porcentaje.
 *
 * **Los scores son 0-based.** No es una suposición: la documentación de
 * `https://www.jevai.org/docs` lo fija, y el playground lo repite al construir
 * una pregunta de tipo score ("Fill in 2–10 levels, ordered low to high. Scores
 * start at 0"). El índice más bajo es 0 y el más alto es `levels - 1`.
 *
 * Un valor fuera de ese rango, o de un tipo que no sea número, se lanza. Forzar
 * el índice 0 convertiría "no medido" en "riesgo nulo", que es la lectura más
 * tranquilizadora posible y justo la más fácil de no mirar.
 */
function toWarpingRisk(value: unknown, answer: Record<string, unknown>): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(
      `Jev devolvió un score de warping de tipo ${typeof value}, no un número.`
    );
  }

  // Si Jev devuelve la leyenda, el score es su índice dentro de ella. Si no, se
  // asume la que se envió, que es la única que conocemos.
  const legend = Array.isArray(answer.legend) ? answer.legend : WARPING_LEVELS;
  const lastIndex = legend.length - 1;

  if (!Number.isInteger(value) || value < 0 || value > lastIndex) {
    throw new Error(
      `Jev devolvió un score de warping fuera de rango: ${value}. Con ${legend.length} ` +
      `niveles y base 0, el score válido va de 0 a ${lastIndex}.`
    );
  }

  return clamp01(value / lastIndex);
}

/**
 * Una pregunta `noul` devuelve la probabilidad de «sí» entre 0 y 1.
 *
 * El umbral es 0.5 porque es la lectura natural de una probabilidad, pero se
 * menciona en el nombre para que no parezca un número mágico: por debajo hay
 * margen de duda y el panel lo trata como «no hace falta soporte».
 *
 * Un valor que no sea booleano, texto ni número se lanza. Devolver `false` sería
 * afirmar que la pieza no necesita soportes, y esa es una afirmación categórica
 * que el panel muestra como un dato, no como una duda.
 */
const NOUL_THRESHOLD = 0.5;

function toNeedsSupport(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.toLowerCase();
    if (normalized === 'sí' || normalized === 'si' || normalized === 'yes') return true;
    if (normalized === 'no') return false;
    throw new Error(`Jev devolvió una respuesta de tipo noul inesperada: "${value}".`);
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0 || value > 1) {
      throw new Error(
        `Jev devolvió una probabilidad de "sí" fuera de [0, 1]: ${value}.`
      );
    }
    return value > NOUL_THRESHOLD;
  }
  throw new Error(
    `Jev devolvió una respuesta de tipo noul de tipo ${typeof value}, no una ` +
    'probabilidad entre 0 y 1.'
  );
}

/**
 * Pide a Jev la clasificación de una pieza a partir de sus metadatos.
 *
 * @param metadata Metadatos extraídos por `parseGcode`.
 * @returns El diagnóstico de riesgo, su probabilidad de warping y la
 *          recomendación asociada.
 * @throws {Error} Si el proxy no está configurado, si la red falla, o si Jev
 *         devuelve un error o un cuerpo no interpretable.
 */
export async function classifyWithJev(
  metadata: ProjectMetadata
): Promise<JevClassification> {
  // Ruta de mock: sin red y sin depender de que Jev esté en pie.
  if (USE_MOCK) {
    await wait(MOCK_LATENCY_MS);
    return buildMockClassification(metadata);
  }

  // Ruta real. Sin URL no hay nada que llamar, y es mejor decirlo que
  // terminar haciendo un `fetch` a `undefined/classify`, que produciría un
  // error de CORS imposible de interpretar en el panel.
  if (!JEV_PROXY_URL) {
    throw new Error(
      'Falta VITE_JEV_PROXY_URL en el entorno. Define la URL del Worker en el ' +
      '.env, o activa VITE_JEV_USE_MOCK=true para trabajar con datos simulados.'
    );
  }

  let response: Response;
  try {
    response = await fetch(`${JEV_PROXY_URL}${CLASSIFY_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildJevPayload(metadata)),
    });
  } catch {
    // Cualquier fallo antes de obtener una respuesta — red caída, CORS, DNS —
    // llega aquí como excepción. El mensaje no distingue entre causas porque
    // desde el navegador no se puede: lo observable es que no hubo respuesta.
    throw new Error(
      'No se ha podido contactar con el servicio de análisis. Revisa tu ' +
      'conexión y vuelve a intentarlo.'
    );
  }

  const raw = await response.text();

  if (!response.ok) {
    throw new Error(describeFailure(response.status, raw));
  }

  return parseJevResponse(raw);
}

/**
 * Parsea el cuerpo de una respuesta 200 de Jev.
 *
 * Se exporta separada del `fetch` para poder probar el parseo con una captura
 * real de la API sin hacer red. Será también el punto de entrada cuando haya que
 * ajustar el contrato.
 *
 * La envoltura de Jev es `{ code, message, data }` y **`code 0` es el único
 * código de éxito**. Comprobarlo aquí, y no confiar solo en el status HTTP,
 * cubre el caso en que un error de negocio viaje con un 2xx: `code: -1` es lo
 * que Jev devuelve en todos sus errores de validación, y sin esta comprobación
 * un `200` con `data` no nulo se interpretaría como un diagnóstico válido.
 *
 * @throws {Error} Si el cuerpo no es JSON, si `code` no es 0, o si no hay datos.
 */
export function parseJevResponse(raw: string): JevClassification {
  let parsed: JevEnvelope;
  try {
    parsed = JSON.parse(raw) as JevEnvelope;
  } catch {
    throw new Error(
      'Jev respondió con un cuerpo que no es JSON válido. No se puede ' +
      'interpretar el diagnóstico.'
    );
  }

  if (typeof parsed.code !== 'number') {
    throw new Error(
      'Jev respondió sin el campo `code`, que es el que indica si la petición ' +
      'se resolvió bien. Se esperaba 0. El envelope puede haber cambiado.'
    );
  }

  if (parsed.code !== 0) {
    throw new Error(
      parsed.message
        ? `Jev devolvió el código ${parsed.code}: ${parsed.message}`
        : `Jev devolvió el código ${parsed.code}, que no es de éxito (se esperaba 0).`
    );
  }

  if (parsed.data === null || parsed.data === undefined) {
    throw new Error('Jev respondió con código 0 pero sin datos.');
  }

  return toClassification(parsed.data);
}

/*
 * ============================================================================
 * Ruta de mock (heurística local)
 * ============================================================================
 *
 * Reproduce la forma del contrato real para no bloquear el desarrollo del
 * panel. No es una predicción de Jev: es una heurística declarada en el propio
 * cliente, y por eso vive aislada de la ruta real y solo se usa con
 * `VITE_JEV_USE_MOCK=true`.
 */

/** Materiales con alta contracción térmica: propuestos a deformarse. */
const HIGH_WARPING_MATERIALS = ['ABS', 'ASA', 'PA', 'PC'];

/** Ángulo (°) a partir del cual una superficie horizontal necesita soportes. */
const SUPPORT_ANGLE_THRESHOLD = 45;

/**
 * Heurística de apoyo: sustituye a la inferencia real de Jev, pero respeta la
 * forma del contrato para que los componentes puedan integrarse ya contra ella.
 */
function buildMockClassification(metadata: ProjectMetadata): JevClassification {
  const missingData: string[] = [];

  const warpingRisk = estimateWarpingRisk(metadata, missingData);
  const needsSupport = evaluateNeedsSupport(metadata, missingData);
  const riskLevel = deriveRiskLevel(warpingRisk, needsSupport);

  return {
    riskLevel,
    warpingRisk,
    needsSupport,
    recommendation: buildRecommendation(riskLevel, needsSupport, missingData),
  };
}

/**
 * Decide si la pieza necesita soportes, distinguiendo "no" de "no lo sé".
 *
 * Sin esta distinción, `undefined >= 45` sería `false` por casualidad numérica
 * pero el `||` con `hasOverhangs` seguiría tratándolo como un dato, y un G-code
 * sin el flag de soportes se diagnosticaría como "no necesita soportes" cuando
 * en realidad nadie lo comprobó. Aquí la ausencia de dato no penaliza (no hay
 * evidencia de voladizos), pero se anota para que la recomendación admita que el
 * diagnóstico es parcial.
 */
function evaluateNeedsSupport(metadata: ProjectMetadata, missingData: string[]): boolean {
  const supportFlag = metadata.hasOverhangs;
  const steepAngle =
    metadata.overhangAngle !== undefined &&
    metadata.overhangAngle >= SUPPORT_ANGLE_THRESHOLD;

  if (supportFlag === undefined && metadata.overhangAngle === undefined) {
    missingData.push(
      'No se pudo leer la configuración de soportes del G-code, así que no se ha podido verificar si la pieza tiene voladizos.'
    );
  }

  return supportFlag === true || steepAngle;
}

/**
 * Riesgo de warping estimado: material + temperatura de cama + altura de capa.
 *
 * `missingData` se llena en el camino para que la recomendación pueda bajar la
 * confianza del diagnóstico en vez de dejar que un dato ausente se lea como un
 * dato favorable.
 */
function estimateWarpingRisk(metadata: ProjectMetadata, missingData: string[]): number {
  const base = HIGH_WARPING_MATERIALS.includes(metadata.material.toUpperCase())
    ? 0.5
    : 0.15;

  // Una cama por debajo de 60 °C no adhere bien y la pieza se deforma más. Sin
  // dato de cama no se aplica el término: asumir cama mala subiría el riesgo de
  // forma injustificada, y asumir cama buena lo ocultaría.
  let bedPenalty = 0;
  if (metadata.bedTemp === undefined) {
    missingData.push(
      'No se pudo leer la temperatura de cama; el diagnóstico es menos preciso.'
    );
  } else if (metadata.bedTemp < 60) {
    bedPenalty = 0.2;
  }

  // Las capas más gruesas enmascaran menos la deformación acumulada. La
  // ausencia de altura de capa no penaliza: no hay evidencia de capa fina, así
  // que subir el riesgo por un dato que no se ha leído sería injustificado. La
  // comprobación es explícita y no la coerción de `undefined > 0.25`, para que
  // quede claro que es una decisión y no un accidente del lenguaje.
  const layerPenalty =
    metadata.layerHeight !== undefined && metadata.layerHeight > 0.25 ? 0.05 : 0;

  return clamp01(base + bedPenalty + layerPenalty);
}

/** Nivel de riesgo a partir de la probabilidad de warping y los soportes. */
function deriveRiskLevel(warpingRisk: number, needsSupport: boolean): RiskLevel {
  if (warpingRisk >= 0.7 || needsSupport) return 'Crítico';
  if (warpingRisk >= 0.45) return 'Alto';
  if (warpingRisk >= 0.25) return 'Moderado';
  return 'Bajo';
}

/** Texto accionable que acompaña al nivel de riesgo. */
function buildRecommendation(
  riskLevel: RiskLevel,
  needsSupport: boolean,
  missingData: readonly string[]
): string {
  const advice = advise(riskLevel, needsSupport);
  if (missingData.length === 0) return advice;

  return `${advice} Ten en cuenta que: ${joinSentences(missingData)}`;
}

/** Consejo principal según el riesgo, sin las advertencias de datos ausentes. */
function advise(riskLevel: RiskLevel, needsSupport: boolean): string {
  if (needsSupport) {
    return 'La pieza tiene voladizos que requieren soportes. Actívalos en el slicer y revisa que el ángulo de voladizo sea inferior a 45°.';
  }
  if (riskLevel === 'Alto' || riskLevel === 'Crítico') {
    return 'Sube la temperatura de cama por encima de 60 °C y añade una falda o brim para reducir el warping.';
  }
  if (riskLevel === 'Moderado') {
    return 'Ajustes de cama mejorados. Considera un brim si la pieza tiene piezas grandes y estrechas.';
  }
  return 'Configuración correcta. No se detectan riesgos relevantes en esta pieza.';
}

/** Une frases en una sola, sin duplicar el punto final. */
function joinSentences(items: readonly string[]): string {
  return items.join(' ').replace(/\.\s*$/, '') + '.';
}
