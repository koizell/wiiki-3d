// Réplica exacta de frameCamera() (Viewer3D.tsx:260-263) + proyección a píxeles.
const DEG = Math.PI / 180;
const V_FOV = 45;          // camera.fov (Viewer3D.tsx:56)
const FRAME_MARGIN = 1.3;  // FRAME_MARGIN (Viewer3D.tsx:19)

function frame(w, h, maxDim) {
  const aspect = w / h;
  const vFov = V_FOV * DEG;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  const limiting = Math.min(vFov, hFov);
  const distance = (maxDim / (2 * Math.tan(limiting / 2))) * FRAME_MARGIN;
  const halfH = distance * Math.tan(vFov / 2);        // media altura visible
  const halfW = distance * Math.tan(hFov / 2);        // media anchura visible
  return {
    aspect: aspect.toFixed(2),
    limiting: (limiting / DEG).toFixed(1) + '°',
    limitingIs: limiting === vFov ? 'VERTICAL' : 'HORIZONTAL',
    // Viewport visible en mm del modelo, medido en la distancia de encuadre
    viewW_mm: (2 * halfW).toFixed(1),
    viewH_mm: (2 * halfH).toFixed(1),
    // Cuántos píxeles ocupa la dimensión mayor del modelo
    modelPx: (maxDim / (2 * halfH) * h).toFixed(0),
  };
}

console.log('=== ¿Qué FOV manda? ===');
for (const [w, h] of [[343, 267], [500, 165], [500, 344], [676, 581], [500, 900], [200, 800]]) {
  const r = frame(w, h, 100);
  console.log(`  visor ${w}x${h}  aspect=${r.aspect}  limitingFov=${r.limiting} -> ${r.limitingIs}`);
}

console.log('\n=== Tamaño en pantalla del modelo (maxDim = 100 mm, típico de una pieza) ===');
console.log('viewport    visor      modelPx  %alto  %ancho  vista mm (WxH)');
for (const [w, h] of [[500, 165], [500, 282], [500, 344], [343, 267], [343, 410], [676, 581]]) {
  const r = frame(w, h, 100);
  const pctH = (100 / r.viewH_mm * 100).toFixed(0);
  const pctW = (100 / r.viewW_mm * 100).toFixed(0);
  console.log(`  ${w}x${h}`.padEnd(12) + `${w}x${h}`.padEnd(11) + String(r.modelPx).padEnd(9) + String(pctH+'%').padEnd(8) + String(pctW+'%').padEnd(8) + r.viewW_mm + ' x ' + r.viewH_mm);
}

console.log('\n=== El tamaño del modelo escala linealmente con el ALTO del visor ===');
for (const h of [120, 165, 250, 344, 410, 581]) {
  const r = frame(500, h, 100);
  console.log(`  alto=${String(h).padEnd(4)} modelPx=${String(r.modelPx).padEnd(5)} (${(100/r.viewH_mm*100).toFixed(0)}% del alto)`);
}
