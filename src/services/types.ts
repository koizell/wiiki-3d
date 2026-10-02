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

/**
 * Slicer que generó el G-code.
 *
 * Vive aquí, y no junto al parser que lo detecta, porque forma parte del
 * contrato de datos que consumen los componentes. Importarlo desde
 * `ParserService` cerraría un ciclo entre la capa de contratos y la de
 * servicios, que es justo la dependencia que este archivo no debería tener.
 *
 * `unknown` no es "todavía no lo he mirado": es un valor real y persistente, el
 * de un G-code cuya cabecera no contiene ninguna firma reconocible. No se
 * colapsa en `cura`/`prusa`/`orca` porque adivinar el slicer haría que el resto
 * del análisis se atribuyera a un programa que no generó el archivo.
 */
export type SlicerKind = 'cura' | 'prusa' | 'orca' | 'unknown';

/** Métricas extraídas del archivo subido por el usuario. */
export interface ProjectMetadata {
  /** Nombre original del archivo, tal cual lo subió el usuario. */
  filename: string;
  /** Slicer que generó el G-code, según las firmas de su cabecera. */
  slicer: SlicerKind;
  /** Material de impresión detectado (PLA, PETG, ABS, ASA...). */
  material: string;
  /**
   * Temperatura de hotend, en °C.
   *
   * Opcional porque no todos los slicers la escriben como comentario de cabecera
   * legible (algunos la emiten solo como código `M104` dentro del cuerpo). Su
   * ausencia significa "el slicer no lo escribió", nunca "vale cero": un `0 °C` de
   * hotend es una temperatura físicamente imposible y presentarla como dato
   * sería peor que reconocer que no se ha leído.
   */
  hotendTemp?: number;
  /**
   * Temperatura de cama, en °C.
   *
   * Opcional porque la clave que la declara cambia según el slicer: la familia
   * Prusa/Orca escribe `bed_temperature`, pero los forks de Creality usan
   * `hot_plate_temp`, `cool_plate_temp` o `customized_plate_temp`. Si ninguna
   * aparece en la cabecera, el campo queda sin definir. El impacto de la ausencia
   * es real: sin este dato no se puede estimar el warping por mala adherencia,
   * así que quien lo consume debe tratarlo como "no medido", no como "cama mala".
   */
  bedTemp?: number;
  /**
   * Altura de capa, en mm.
   *
   * Opcional por la misma razón que {@link hotendTemp}: si la clave no está en la
   * cabecera, no se ha medido. Un `0 mm` sería una afirmación de que la pieza se
   * imprimió sin separación entre capas, que no es lo que dice un G-code sin este
   * dato. Quien lo use para estimar riesgo debe tratar la ausencia como "sin
   * penalizar", no como "capa fina".
   */
  layerHeight?: number;
  /** Tiempo estimado de impresión, en segundos. */
  printTime: number;
  /**
   * Filamento consumido, en gramos.
   *
   * Opcional y no por pereza: Cura solo informa de metros, y convertir metros a
   * gramos exige la densidad del material, que no siempre escribe. Cuando falta,
   * el campo queda sin definir. Un `0` aquí sería una mentira: significaría
   * "el usuario no imprimió nada".
   */
  filamentUsed?: number;
  /**
   * Peso total de filamento en gramos, si el slicer lo declara explícitamente.
   *
   * Es un dato distinto de {@link filamentUsed}: no todos los slicers lo emiten
   * (la familia Orca no lo escribe), así que suele quedarse sin definir.
   */
  filamentWeight?: number;
  /**
   * Si el slicer tenía soportes activados.
   *
   * Refleja la **configuración** del slicer, no la geometría real del cuerpo del
   * G-code: un archivo puede tener soportes desactivados y aun así contener
   * geometría de soporte. `undefined` significa que el flag no estaba en la
   * cabecera, que es distinto de `false`.
   */
  hasOverhangs?: boolean;
  /**
   * Ángulo del voladizo más crítico, en grados.
   *
   * No es derivable de la cabecera del G-code: el slicer no lo escribe y calcular
   * el ángulo real exigiría analizar la geometría. Se deja sin definir en lugar
   * de estimarlo.
   */
  overhangAngle?: number;
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