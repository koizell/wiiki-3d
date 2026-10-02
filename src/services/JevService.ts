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
  const warpingRisk = estimateWarpingRisk(metadata);
  const needsSupport =
    metadata.hasOverhangs || metadata.overhangAngle >= SUPPORT_ANGLE_THRESHOLD;
  const riskLevel = deriveRiskLevel(warpingRisk, needsSupport);

  return {
    riskLevel,
    warpingRisk,
    needsSupport,
    recommendation: buildRecommendation(riskLevel, needsSupport),
  };
}

/** Riesgo de warping estimado: material + temperatura de cama + altura de capa. */
function estimateWarpingRisk(metadata: ProjectMetadata): number {
  const base = HIGH_WARPING_MATERIALS.includes(metadata.material.toUpperCase())
    ? 0.5
    : 0.15;

  // Una cama por debajo de 60 °C no adhere bien y la pieza se deforma más.
  const bedPenalty = metadata.bedTemp < 60 ? 0.2 : 0;
  // Las capas más gruesas enmascaran menos la deformación acumulada.
  const layerPenalty = metadata.layerHeight > 0.25 ? 0.05 : 0;

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

/** Texto accionable que acompaña al nivel de riesgo. */
function buildRecommendation(riskLevel: RiskLevel, needsSupport: boolean): string {
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