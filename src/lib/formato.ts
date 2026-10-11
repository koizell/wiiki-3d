/**
 * Formato de los valores que comparten el historial y proyectos.
 *
 * Son funciones sin estado y sin React, así que viven en `lib/`. Estaban dentro
 * de `HistorialRoute`; al aparecer una segunda vista que las necesitaba, se
 * movieron aquí en vez de copiarse: la fecha y el color del riesgo tienen que
 * pintarse **igual** en las dos listas, y dos copias garantizan que un día una
 * cambie y la otra no.
 */

/** La fecha en corto y en español, sin librerías de formato. */
export function formatarFecha(ms: number): string {
  return new Date(ms).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Una clase por nivel de riesgo, para que el color venga del CSS y no de aquí.
 *
 * El `riskLevel` es un texto en castellano que viene del clasificador, y usarlo
 * directamente como clase ataría el color al valor. Con esta tabla, un nivel
 * nuevo sale sin color en vez de salir con el color del nivel equivocado.
 */
export function riesgoClase(riskLevel: string): string {
  switch (riskLevel) {
    case 'Bajo':
      return 'bajo';
    case 'Moderado':
      return 'moderado';
    case 'Alto':
      return 'alto';
    case 'Crítico':
      return 'critico';
    default:
      return 'desconocido';
  }
}

/**
 * Un tamaño en bytes, legible.
 *
 * Es una estimación, no una medición de la cuota: `new Blob([json]).size` da los
 * bytes en UTF-8 de lo que se guarda, que es lo que de verdad ocupa cada entrada,
 * pero el navegador guarda además su propio índice. Sirve para que «cuánto ocupa
 * esto» tenga una respuesta, no para prometer un número exacto.
 */
export function formatoBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toLocaleString('es-ES', { maximumFractionDigits: 1 })} kB`;
  }
  return `${(kb / 1024).toLocaleString('es-ES', { maximumFractionDigits: 1 })} MB`;
}
