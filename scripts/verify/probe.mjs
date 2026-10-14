/**
 * Espera a que el chunk del visor 3D esté en caché y devuelve un `handle` con el
 * estado del overlay en ese instante.
 *
 * Hay que mediciónarlo rápido porque el overlay sólo existe mientras baja el
 * chunk. Se fuerza con `page.route`, que intercepta la petición y la retiene
 * hasta que el script suelta el lock: así el estado de carga es reproducible en
 * lugar de depender de cómo de rápido llegue la red.
 *
 * Los módulos se piden en producción con hash en el nombre, así que el patrón
 * `/assets/Viewer3D-` los cubre sin conocer el hash exacto.
 */
export async function captureOverlayDuringLoad(browser, base, { width, height }) {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  let release;
  const held = new Promise((resolve) => {
    release = resolve;
  });
  let sawChunk = false;

  // Importa ir a la página ANTES de instalar la ruta: si no, el chunk se pide
  // mientras el DOM todavía no existe y la medición se hace sobre un árbol a
  // medio montar.
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#file-upload', { state: 'attached', timeout: 15000 });

  await page.route('**/assets/Viewer3D-*', async (route) => {
    sawChunk = true;
    await held; // retiene la respuesta hasta que midamos
    await route.continue();
  });

  // El input tiene `display: none`, así que no se le puede pasar `setInputFiles`
  // desde fuera de la página; hay que dispararle el `change` desde dentro.
  await page.evaluate(() => {
    const el = document.querySelector('#file-upload');
    const dt = new DataTransfer();
    const stl = new Uint8Array(84 + 4 * 50);
    new DataView(stl.buffer).setUint32(80, 4, true);
    dt.items.add(new File([stl], 'prueba.stl', { type: 'model/stl' }));
    el.files = dt.files;
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Esperar a que aparezca el overlay del fallback.
  for (let i = 0; i < 100; i++) {
    if (await page.evaluate(() => !!document.querySelector('.viewer-overlay'))) break;
    await new Promise((r) => setTimeout(r, 50));
  }

  const loading = await page.evaluate(() => {
    const ov = document.querySelector('.viewer-overlay');
    if (!ov) return null;

    const rect = ov.getBoundingClientRect();
    let el = ov.parentElement;
    let positioned = null;
    while (el) {
      const ps = getComputedStyle(el).position;
      if (ps !== 'static') {
        positioned = `${String(el.className).split(' ')[0]} (${ps})`;
        break;
      }
      el = el.parentElement;
    }

    return {
      parentClass: String(ov.parentElement.className).split(' ')[0],
      closestPositioned: positioned,
      position: getComputedStyle(ov).position,
      rect: {
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
      },
      windowSize: { w: window.innerWidth, h: window.innerHeight },
      coveringViewport:
        rect.width >= window.innerWidth - 1 && rect.height >= window.innerHeight - 1,
      viewerContainerHeight: Math.round(
        document.querySelector('.viewer-container').getBoundingClientRect().height
      ),
    };
  });

  // Retener la lectura del fichero: el overlay montado puede desaparecer entre
  // dos evaluate() si FileReader termina muy rápido. Sólo se mide ese estado de
  // carga, no la geometría; el contexto se cierra al terminar la medición.
  await page.evaluate(() => {
    const leer = FileReader.prototype.readAsArrayBuffer;
    FileReader.prototype.readAsArrayBuffer = function (archivo) {
      if (archivo instanceof File && archivo.name === 'prueba.stl') return;
      leer.call(this, archivo);
    };
  });

  // Soltar el chunk y esperar a que el visor monte.
  release();
  for (let i = 0; i < 200; i++) {
    const mounted = await page.evaluate(() => {
      const ov = document.querySelector('.viewer-3d-container > .viewer-overlay');
      return ov ? ov.textContent.trim() : null;
    });
    if (mounted && mounted !== 'Cargando visor 3D...') {
      const mountedRect = await page.evaluate(() => {
        const box = document.querySelector('.viewer-3d-container');
        const ov = box.querySelector('.viewer-overlay');
        const r = box.getBoundingClientRect();
        const o = ov.getBoundingClientRect();
        return {
          box: { w: Math.round(r.width), h: Math.round(r.height) },
          overlay: { w: Math.round(o.width), h: Math.round(o.height) },
        };
      });
      await context.close();
      return {
        sawChunk,
        loading,
        mounted: {
          message: mounted,
          ...mountedRect,
        },
      };
    }
    await new Promise((r) => setTimeout(r, 50));
  }

  await context.close();
  return { sawChunk, loading, mounted: null };
}

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

/** ¿Hay algo escuchando en esa URL? */
async function vivo(url) {
  return fetch(url).then(
    () => true,
    () => false
  );
}

/** Arranca `vite preview` y devuelve la URL, o `null` si ya había uno vivo. */
export async function startPreview(port = 4173) {
  return (await arrancarPreview(port)).base;
}

/**
 * Arranca `vite preview` y devuelve `{ base, detener }`.
 *
 * `startPreview` devuelve la URL y nada más, así que **un script no puede cerrar
 * el servidor que ha abierto**: se queda huérfano. Dos scripts lo intentaron
 * haciendo `.kill()` sobre esa URL y morían con `preview.kill is not a function`
 * después de imprimir todas las comprobaciones (`taller.mjs`,
 * `historial.mjs`). Parecía un fallo de lo que medían y era del script.
 *
 * `detener()` cierra el servidor **sólo si este proceso lo abrió**: si ya había
 * uno vivo —el de otra sesión, o uno levantado a mano— no hace nada.
 */
export async function arrancarPreview(port = 4173) {
  const host = `http://127.0.0.1:${port}`;
  if (await vivo(host)) return { base: host, detener: () => {} };

  const { spawn } = await import('node:child_process');
  const child = spawn(
    'npx',
    ['vite', 'preview', '--port', String(port), '--host', '127.0.0.1'],
    { detached: true, stdio: 'ignore' }
  );
  child.unref();

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 400));
    if (await vivo(host)) {
      return {
        base: host,
        detener: () => {
          // `detached: true` hace al hijo líder de su grupo de procesos, así que
          // matar el grupo se lleva también al `vite` real que lanza `npx`. Con
          // `child.kill()` a secas quedaría el servidor vivo y huérfano.
          try {
            process.kill(-child.pid, 'SIGTERM');
          } catch {
            child.kill();
          }
        },
      };
    }
  }
  throw new Error('vite preview no arrancó en 12s');
}
