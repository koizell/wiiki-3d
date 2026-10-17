/** Prusa/Orca pueden declarar un material por ranura, separado con punto y coma. */
export function materialesDeclarados(declaracion: string): string[] {
  return [...new Set(declaracion.split(';').map((m) => m.trim().toUpperCase()).filter(Boolean))];
}

/** Una lista de ranuras no demuestra qué material se ha usado realmente. */
export function materialUnico(declaracion: string): string | null {
  const materiales = materialesDeclarados(declaracion);
  return materiales.length === 1 ? materiales[0] : null;
}

export function textoMaterial(declaracion: string): string {
  if (!declaracion.includes(';')) return declaracion;
  return materialesDeclarados(declaracion).join(' · ');
}

/** También invalida la valoración de entradas antiguas sin borrar sus datos. */
export function riesgoDelMaterial(declaracion: string, nivel: string): string {
  return materialUnico(declaracion) ? nivel : 'No evaluable';
}
