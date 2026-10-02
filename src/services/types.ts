/**
 * Contratos de datos compartidos por la capa de servicios de wiiki-3d.
 *
 * Estos tipos son la frontera entre tres capas:
 *   1. El parseo local del archivo (ParserService).
 *   2. La clasificación en la nube de Jev / Camber (JevService).
 *   3. Los componentes de React que pintan el panel de análisis.
 *
 * Los campos se expresan en las unidades canónicas que consume el backend, de
 * forma que conectar la API real no obligue a los componentes a convertir nada.
 */

/** Nivel de riesgo calculado por Jev para una pieza. */
export type RiskLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Crítico';

/** Métricas extraídas del archivo subido por el usuario. */
export interface ProjectMetadata {
  /** Nombre original del archivo, tal cual lo subió el usuario. */
  filename: string;
  /** Material de impresión detectado (PLA, PETG, ABS, ASA...). */
  material: string;
  /** Temperatura de hotend, en °C. */
  hotendTemp: number;
  /** Temperatura de cama, en °C. */
  bedTemp: number;
  /** Altura de capa, en mm. */
  layerHeight: number;
  /** Tiempo estimado de impresión, en segundos. */
  printTime: number;
  /** Filamento consumido, en gramos. */
  filamentUsed: number;
  /** Si la geometría presenta voladizos que exigen soporte. */
  hasOverhangs: boolean;
  /** Ángulo del voladizo más crítico, en grados (90 = horizontal). */
  overhangAngle: number;
}

/** Diagnóstico devuelto por Jev para un conjunto de metadatos. */
export interface JevClassification {
  riskLevel: RiskLevel;
  /** Probabilidad de warping normalizada: 0 (imposible) a 1 (muy probable). */
  warpingRisk: number;
  needsSupport: boolean;
  /** Recomendación accionable en texto para el usuario. */
  recommendation: string;
}