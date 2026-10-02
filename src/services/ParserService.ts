import type { ProjectMetadata } from './types';

/**
 * ParserService — extrae los metadatos de impresión de un archivo G-code.
 *
 * TODO: hoy devuelve datos simulados. Cuando implemente el parseo real habrá
 * que leer el contenido con `file.text()`, detectar el slicer (Cura, PrusaSlicer,
 * BambuStudio...) y mapear sus comentarios de cabecera a `ProjectMetadata`.
 */

/** Extensiones que este servicio sabe interpretar. */
const GCODE_EXTENSIONS = ['.gcode', '.gco'] as const;

/** Latencia simulada para que los estados de carga de la UI sean visibles. */
const MOCK_LATENCY_MS = 400;

/** Resuelve tras `ms` milisegundos. Sustituye al trabajo real de lectura. */
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Extrae los metadatos de impresión de un archivo G-code.
 *
 * @param file Archivo `.gcode` / `.gco` seleccionado por el usuario.
 * @throws {Error} Si la extensión no corresponde a un G-code.
 */
export async function parseGcode(file: File): Promise<ProjectMetadata> {
  const isGcode = GCODE_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  );
  if (!isGcode) {
    throw new Error(`"${file.name}" no es un archivo G-code válido.`);
  }

  await wait(MOCK_LATENCY_MS);

  return buildMockMetadata(file.name);
}

/**
 * Genera metadatos de prueba deterministas a partir del nombre del archivo,
 * para que cada demo del panel de análisis reaccione de forma distinta.
 * Se sustituirá por el parseo real de la cabecera G-code.
 */
function buildMockMetadata(filename: string): ProjectMetadata {
  const seed = hashFilename(filename);
  const materials = ['PLA', 'PETG', 'ABS', 'ASA'] as const;
  const layerHeights = [0.1, 0.15, 0.2, 0.28] as const;

  return {
    filename,
    material: pick(materials, seed),
    hotendTemp: 200 + (seed % 3) * 10,
    bedTemp: 50 + (seed % 4) * 5,
    layerHeight: pick(layerHeights, seed),
    printTime: 5400 + (seed % 5) * 1800,
    filamentUsed: 32 + (seed % 6) * 9,
    hasOverhangs: seed % 3 !== 0,
    overhangAngle: 30 + (seed % 4) * 15,
  };
}

/** Elige un valor de la lista de forma determinista a partir de la semilla. */
function pick<T>(values: readonly T[], seed: number): T {
  const value = values[seed % values.length];
  if (value === undefined) {
    throw new Error('pick() espera una lista de valores no vacía.');
  }
  return value;
}

/** Hash entero simple y estable para derivar valores de la semilla. */
function hashFilename(filename: string): number {
  let hash = 0;
  for (let i = 0; i < filename.length; i++) {
    hash = (hash + filename.charCodeAt(i)) % 1000;
  }
  return hash;
}