/** Longitud declarada del tramo binario completo, o null si no se identifica. */
export function finBinarioSTL(buffer: ArrayBuffer): number | null {
  if (buffer.byteLength < 84) return null;
  const caras = new DataView(buffer).getUint32(80, true);
  const fin = 84 + caras * 50;
  return caras > 0 && fin <= buffer.byteLength ? fin : null;
}

/** Validación compartida con lectura ASCII acotada y cancelable. */
export async function validarSTL(buffer: ArrayBuffer, check: () => void): Promise<number | undefined> {
  if (buffer.byteLength < 15) throw new Error('STL vacío o inválido');
  const fin = finBinarioSTL(buffer);
  if (fin !== null) return fin;
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const bytes = new Uint8Array(buffer);
  let inicio = '', cola = '', facet = false, end = false, valido = true;
  for (let offset = 0; offset < bytes.length; offset += 65536) {
    check();
    let text: string;
    try {
      text = decoder.decode(bytes.subarray(offset, offset + 65536), { stream: offset + 65536 < bytes.length });
    } catch { valido = false; break; }
    // eslint-disable-next-line no-control-regex
    if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text)) { valido = false; break; }
    const normalizado = text.replace(/\s+/g, ' ');
    if (inicio.length < 16) inicio = (inicio + normalizado).replace(/^ +/, '').slice(0, 16);
    const tramo = cola + normalizado;
    const completo = offset + 65536 >= bytes.length ? tramo : tramo.replace(/[a-z0-9_]+$/i, '');
    facet ||= /\bfacet\s+normal\b/i.test(completo);
    end ||= /\bendsolid(?:\s|$)/i.test(completo);
    cola = tramo.replace(/\s+/g, ' ').slice(-64);
    if (offset + 65536 < bytes.length && (offset / 65536) % 16 === 15) {
      await new Promise<void>(resolve => setTimeout(resolve, 0));
    }
  }
  check();
  if (!(valido && /^solid(?:\s|$)/i.test(inicio) && facet && end)) throw new Error('STL binario truncado o STL inválido');
}
