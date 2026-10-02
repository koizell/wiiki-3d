import type { ProjectMetadata } from './types';

/**
 * ParserService — extrae los metadatos de impresión de un archivo G-code.
 *
 * La lectura es parcial a propósito: los slicers escriben todos los metadatos en
 * los primeros kilobytes del archivo (Cura los emite justo después de la línea
 * de Genius), así que no hay motivo para traerse un G-code de 200 MB a memoria.
 *
 * TODO: el parseo sigue devolviendo datos simulados. Cuando implemente el
 * parseo real habrá que detectar el slicer (Cura, PrusaSlicer, BambuStudio...)
 * y mapear sus comentarios de cabecera a `ProjectMetadata`.
 */

/** Extensiones que este servicio sabe interpretar. */
const GCODE_EXTENSIONS = ['.gcode', '.gco'] as const;

/**
 * Tamaño de la ventana de lectura inicial, en bytes.
 *
 * 256 KiB es un margen muy holgado: las cabeceras reales ocupan entre 1 y
 * 10 KiB. Bajarlo afinaría la lectura, pero cualquier slicer futuro con más
 * metadatos (perfiles, datos deodo, notas de usuario) se quedaría fuera.
 */
const HEADER_BYTES = 256 * 1024;

/** Latencia simulada para que los estados de carga de la UI sean visibles. */
const MOCK_LATENCY_MS = 400;

/** Resuelve tras `ms` milisegundos. Sustituye al trabajo real de lectura. */
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Lee únicamente la cabecera de un archivo G-code.
 *
 * Se usa `file.slice()` en lugar de `file.text()` porque `text()` trae el
 * archivo entero a memoria de una sentada: en un G-code de 200 MB eso significa
 * 200 MB de string en el hilo principal más el coste de decodificarlo, y la
 * interfaz se congela mientras ocurre. `slice()` es perezoso —no lee nada del
 * disco hasta que se consume— y `Blob.text()` decodifica solo ese trozo, así
 * que el trabajo real se limita a unos cientos de kilobytes.
 *
 * @param file Archivo `.gcode` / `.gco` seleccionado por el usuario.
 * @returns El texto de los primeros {@link HEADER_BYTES} del archivo.
 */
export async function readGcodeHeader(file: File): Promise<string> {
  return file.slice(0, HEADER_BYTES).text();
}

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