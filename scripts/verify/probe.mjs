/**
 * Sondas compartidas por los scripts de verificación.
 *
 * Todo lo que mide la app vive aquí en un sitio, para que los números que
 * comparan dos commits sean comparables: si dos scripts calcularan el alto
 * visible del visor de forma distinta, el diff entre ellos no significaría nada.
 */

/**
 * El tamaño en pantalla del modelo, en píxeles, replicando la aritmética de
 * `frameCamera` en `src/components/Viewer3D.tsx:260-263`.
 *
 * `limitingFov = Math.min(verticalFov, horizontalFov)`, así que en un visor
 * ancho (`aspect > 1`) el limitante es el FOV **vertical**: el modelo se
 * encuadra a la altura del visor y ocupa el 77% de ella (= 1/FRAME_MARGIN). El
 * tamaño en pantalla escala lineal con el alto, y el FOV horizontal sólo manda
 * cuando `aspect < 1`.
 *
 * Asume `maxDimension = 100`: la fórmula es lineal, así que el resultado es el
 * alto que ocuparía un modelo de 100mm en su dimensión mayor. Sirve para
 * comparar viewports entre sí, no para predecir el tamaño de una pieza concreta.
 */
export function modelPixels(width, height) {
  const DEG = Math.PI / 180;
  const V_FOV = 45;
  const FRAME_MARGIN = 1.3;
  if (!width || !height) return null;

  const aspect = width / height;
  const verticalFov = V_FOV * DEG;
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
  const limitingFov = Math.min(verticalFov, horizontalFov);

  const distance = (100 / (2 * Math.tan(limitingFov / 2))) * FRAME_MARGIN;
  const halfHeight = distance * Math.tan(verticalFov / 2);
  return Math.round((100 / (2 * halfHeight)) * height);
}

/** Se ejecuta dentro de la página. Devuelve una objeto plano, serializable. */
export function probePage() {
  const q = (sel) => document.querySelector(sel);

  const box = (sel) => {
    const el = q(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  };

  // Con STL hay `.viewer-3d-container`; con G-code hay `.canvas-placeholder`.
  // Ambos son `flex: 1` dentro de `.viewer-container` y ambos compiten por el
  // alto, así que las mediciones los tratan igual.
  const stage = q('.viewer-3d-container') || q('.canvas-placeholder');
  const canvasArea = q('.canvas-area');
  const viewerContainer = q('.viewer-container');
  const canvas = q('.viewer-3d-container canvas');
  const panelBody = q('.panel-body');

  const stageRect = stage ? stage.getBoundingClientRect() : null;
  const areaRect = canvasArea ? canvasArea.getBoundingClientRect() : null;

  // El alto *visible* del visor, no el de layout: si `.canvas-area` recorta,
  // el modelo se encuadra contra un alto que el usuario no ve, que es peor que
  // un visor corto porque no se ve que falta.
  const visibleHeight =
    stageRect && areaRect
      ? Math.max(0, Math.round(stageRect.bottom - Math.max(stageRect.top, areaRect.top)))
      : null;

  const scrolls = (el) =>
    !!el &&
    el.scrollHeight > el.clientHeight + 1 &&
    getComputedStyle(el).overflowY !== 'visible';

  return {
    stage: box('.viewer-3d-container') || box('.canvas-placeholder'),
    visibleHeight,
    aspect: null, // lo calcula quien lo pinte: necesita el stage
    webgl: canvas ? { w: canvas.width, h: canvas.height } : null,
    webglOk: !!canvas && canvas.width > 0 && canvas.height > 0,
    clipped:
      !!viewerContainer &&
      !!canvasArea &&
      viewerContainer.scrollHeight > canvasArea.clientHeight + 1,
    topbar: box('.top-bar').h,
    panelHeight: panelBody ? panelBody.clientHeight : null,
    panelScrolls: scrolls(panelBody),
    docScrolls: document.documentElement.scrollHeight > window.innerHeight + 1,
    docHeight: document.documentElement.scrollHeight,
    windowHeight: window.innerHeight,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  };
}

/** Arranca `vite preview` y devuelve la URL, o `null` si ya había uno vivo. */
export async function startPreview(port = 4173) {
  const host = `http://127.0.0.1:${port}`;
  const alive = await fetch(host).then(
    () => true,
    () => false
  );
  if (alive) return null;

  const { spawn } = await import('node:child_process');
  const child = spawn(
    'npx',
    ['vite', 'preview', '--port', String(port), '--host', '127.0.0.1'],
    { detached: true, stdio: 'ignore' }
  );
  child.unref();

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 400));
    if (await fetch(host).then(() => true, () => false)) return host;
  }
  throw new Error('vite preview no arrancó en 12s');
}