/** Silueta del STL azul de fixtures, no texto/foco ni ruido de sombreado WebGL. */
export async function siluetaAzul(page, png) {
  return page.evaluate(async base64 => {
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
    bitmap.close();
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 2] > 50 && data[i + 2] > data[i + 1] * 1.25 && data[i + 2] > data[i] * 1.5) {
        minX = Math.min(minX, x); minY = Math.min(minY, y);
        maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
      }
    }
    if (maxX < 0) throw new Error('No se ve la geometría azul del fixture');
    return { width, height, minX, minY, maxX, maxY };
  }, png.toString('base64'));
}

export function cambioGeometrico(antes, despues) {
  if (antes.width !== despues.width || antes.height !== despues.height) {
    throw new Error('El control no debe cambiar las dimensiones del lienzo');
  }
  // Un píxel de antialiasing no equivale a mover la cámara.
  return ['minX', 'minY', 'maxX', 'maxY'].some(k => Math.abs(antes[k] - despues[k]) > 1);
}
