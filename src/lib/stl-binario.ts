/** Longitud declarada del tramo binario completo, o null si no se identifica. */
export function finBinarioSTL(buffer: ArrayBuffer): number | null {
  if (buffer.byteLength < 84) return null;
  const caras = new DataView(buffer).getUint32(80, true);
  const fin = 84 + caras * 50;
  return caras > 0 && fin <= buffer.byteLength ? fin : null;
}
