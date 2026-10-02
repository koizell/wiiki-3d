import type { JevClassification, ProjectMetadata, RiskLevel } from './types';

/**
 * JevService — clasifica una pieza y estima su riesgo de fabricación.
 *
 * TODO: la clasificación real se ejecuta en la nube de Camber. La constante y
 * el `fetch` definitivos están documentados al final de este archivo; este stub
 * reproduce la latencia y la forma de la respuesta para no bloquear el desarrollo
 * del panel de análisis.
 */

/** Latencia simulada, acorde a una llamada de red real. */
const MOCK_LATENCY_MS = 600;

/** Resuelve tras `ms` milisegundos. Sustituye a la llamada HTTP. */
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/** Acota un valor al rango [0, 1]. */
const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** Materiales con alta contracción térmica: propensos a deformarse. */
const HIGH_WARPING_MATERIALS = ['ABS', 'ASA', 'PA', 'PC'];

/** Ángulo (°) a partir del cual una superficie horizontal necesita soportes. */
const SUPPORT_ANGLE_THRESHOLD = 45;

/**
 * Pide a Jev la clasificación de una pieza a partir de sus metadatos.
 *
 * @param metadata Metadatos extraídos por `parseGcode`.
 * @returns El diagnóstico de riesgo, su probabilidad de warping y la
 *          recomendación asociada.
 * @throws {Error} Si la API de Jev responde con un error o con un cuerpo no
 *         interpretable (ver la implementación de referencia más abajo).
 */
export async function classifyWithJev(
  metadata: ProjectMetadata
): Promise<JevClassification> {
  await wait(MOCK_LATENCY_MS);

  return buildMockClassification(metadata);
}

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
 * evidencia de voladizos), pero se anota para que la recomendación admita que
 * el diagnóstico es parcial.
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

/** Traduce las métricas calculadas al nivel de riesgo que ve el usuario. */
function deriveRiskLevel(
  warpingRisk: number,
  needsSupport: boolean
): RiskLevel {
  if (warpingRisk >= 0.7 || needsSupport) return 'Crítico';
  if (warpingRisk >= 0.45) return 'Alto';
  if (warpingRisk >= 0.25) return 'Moderado';
  return 'Bajo';
}

/**
 * Texto accionable que acompaña al nivel de riesgo.
 *
 * Las advertencias de datos ausentes se añaden al final: el consejo principal no
 * debe quedar diluido, pero el usuario tiene que saber que le falta información
 * para decidir con el diagnóstico completo.
 */
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

/*
 * ---------------------------------------------------------------------------
 * Implementación de referencia (a activar cuando exista el backend en Camber)
 * ---------------------------------------------------------------------------
 *
 * La URL real de la API de Jev irá aquí, conviene leerla del entorno de Vite
 * para no fijarla en el bundle:
 *
 *   // vite.config.ts -> define: { __JEV_API_URL__: JSON.stringify(process.env.JEV_API_URL) }
 *   const JEV_API_URL = import.meta.env.VITE_JEV_API_URL as string;
 *
 * Los metadatos se enviarían como JSON en el cuerpo de un POST:
 *
 *   export async function classifyWithJev(
 *     metadata: ProjectMetadata
 *   ): Promise<JevClassification> {
 *     const response = await fetch(`${JEV_API_URL}/v1/classify`, {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(metadata),
 *     });
 *
 *     if (!response.ok) {
 *       throw new Error(`Jev respondió ${response.status}: ${response.statusText}`);
 *     }
 *
 *     // Jev devuelve el riesgo ya normalizado; validarlo evita que un 500 con
 *     // cuerpo JSON llegue intacto hasta los componentes de React.
 *     const data = (await response.json()) as JevClassification;
 *     return { ...data, warpingRisk: clamp01(data.warpingRisk) };
 *   }
 * ---------------------------------------------------------------------------
 */