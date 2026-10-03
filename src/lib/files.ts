import type { ViewerFormat } from '../components/Viewer3D';

/**
 * Clasificación de archivos por extensión.
 *
 * Son funciones puras, sin React, y están aquí separadas del contexto porque
 * `detectFileType` decide qué componente se pinta y qué análisis se dispara, y
 * esas dos decisiones las toman cosas distintas: el contexto la usa al cargar
 * un fichero, y la vista de ruta la usa para decidir si monta el visor 3D o el
 * aviso de formato no soportado.
 *
 * Estaban antes dentro de `App.tsx`. Con el enrutado, `App.tsx` se queda con el
 * shell, así que aquí tienen su sitio propio y no dependen de nada de React.
 */

/** Formatos que la app sabe enrutar, deducidos de la extensión del archivo. */
export type FileType = 'stl' | 'gcode' | '3mf' | 'obj' | 'unknown';

/** Extensiones que el visor 3D sabe maquetar. */
const STL_EXTENSIONS = ['.stl'] as const;
/**
 * El 3MF es el proyecto de los slicers actuales (BambuStudio, PrusaSlicer,
 * OrcaSlicer). Se comprueba antes que G-code y STL porque su contenido es un
 * ZIP con el modelo y no un flujo de comandos: el orden de las comprobaciones
 * documenta esa diferencia en lugar de darla por supuesta.
 */
const THREEMF_EXTENSIONS = ['.3mf'] as const;
/** Extensiones que el panel de análisis sabe interpretar. */
const GCODE_EXTENSIONS = ['.gcode', '.gco'] as const;
/** Extensiones aceptadas por el input pero aún sin soporte en el visor. */
const OBJ_EXTENSIONS = ['.obj'] as const;

/**
 * Deduce el tipo de archivo a partir de su nombre.
 *
 * Es el punto de decisión de la app: de aquí sale tanto el componente que se
 * pinta en el área central como la cola de análisis que se dispara. Se
 * compara en minúsculas porque los navegadores entregan la extensión tal cual
 * la escribió el sistema de ficheros del usuario (`PIEZA.GCODE` es válido).
 */
export function detectFileType(filename: string): FileType {
  const name = filename.toLowerCase();
  if (THREEMF_EXTENSIONS.some((ext) => name.endsWith(ext))) return '3mf';
  if (STL_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'stl';
  if (GCODE_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'gcode';
  if (OBJ_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'obj';
  return 'unknown';
}

/** Acota el tipo de archivo a los que el visor 3D puede construir. */
export function isViewerFormat(fileType: FileType | null): fileType is ViewerFormat {
  return fileType === 'stl' || fileType === '3mf';
}

/** Explica en el área central por qué un formato todavía no se puede mostrar. */
export function unsupportedFileMessage(fileType: FileType, filename: string): string {
  if (fileType === 'obj') {
    return 'El visor 3D para archivos .obj todavía no está disponible. El análisis técnico se reserva a los archivos G-code.';
  }
  return `"${filename}" tiene un formato no compatible. Sube un archivo .stl, .3mf, .gcode o .gco.`;
}

/** Normaliza cualquier excepción a un mensaje presentable. */
export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Error inesperado al analizar el archivo.';
}