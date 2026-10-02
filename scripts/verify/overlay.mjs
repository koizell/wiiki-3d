/**
 * Estado del overlay del `Suspense` y su ancestro posicionado.
 *
 * `.viewer-overlay` es `position: absolute` y se usa en dos sitios: como fallback
 * del `Suspense` en `App.tsx` (hijo directo de `.viewer-container`) y dentro de
 * `Viewer3D` (hijo de `.viewer-3d-container`, que sí es `position: relative`).
 * En el primer caso el ancestro posicionado puede no existir, y entonces el
 * overlay se posiciona contra el viewport inicial en lugar de contra su recuadro.
 *
 * Uso:  node scripts/verify/overlay.mjs
 */

import { chromium } from 'playwright';
import { startPreview } from './probe.mjs';

async function main() {
  const BASE = (await startPreview()) ?? 'http://127.0.0.1:4173';

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 768, height: 667 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  // Antes de que three.js resuelva: hay que medir el overlay mientras existe.
  const report = await page.evaluate(async () => {
    const input = document.querySelector('#file-upload');
    const dt = new DataTransfer();

    // Un archivo STL mínimo, para no depender del fixture en disco.
    const stl = new Uint8Array(84 + 4 * 50);
    new DataView(stl.buffer).setUint32(80, 4, true);
    dt.items.add(new File([stl], 'prueba.stl', { type: 'model/stl' }));
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    // Esperar al overlay, que sólo existe mientras carga el chunk.
    for (let i = 0; i < 60; i++) {
      if (document.querySelector('.viewer-overlay')) break;
      await new Promise((r) => setTimeout(r, 50));
    }

    const ov = document.querySelector('.viewer-overlay');
    if (!ov) return { found: false };

    const r = ov.getBoundingClientRect();
    let el = ov.parentElement;
    let positioned = null;
    while (el) {
      const ps = getComputedStyle(el).position;
      if (ps !== 'static') {
        positioned = `${el.className || el.tagName} (${ps})`;
        break;
      }
      el = el.parentElement;
    }

    return {
      found: true,
      parent: ov.parentElement.className,
      parentPosition: getComputedStyle(ov.parentElement).position,
      position: getComputedStyle(ov).position,
      zIndex: getComputedStyle(ov).zIndex,
      rect: {
        w: Math.round(r.width),
        h: Math.round(r.height),
        top: Math.round(r.top),
        left: Math.round(r.left),
      },
      windowSize: { w: window.innerWidth, h: window.innerHeight },
      coveringViewport:
        r.width >= window.innerWidth - 1 && r.height >= window.innerHeight - 1,
      closestPositioned: positioned,
      viewerContainerHeight: Math.round(
        document.querySelector('.viewer-container').getBoundingClientRect().height
      ),
    };
  });

  await context.close();
  await browser.close();

  if (!report.found) {
    console.log('No se ha capturado el overlay (el chunk cargó demasiado rápido).');
    console.log('Vuelve a ejecutar con la red más lenta para verlo.');
    return;
  }

  console.log('=== Overlay del Suspense ===');
  console.log(`  padre:                 .${report.parent}`);
  console.log(`  position del padre:    ${report.parentPosition}`);
  console.log(`  ancestro posicionado:  ${report.closestPositioned ?? 'NINGUNO'}`);
  console.log(`  position del overlay:  ${report.position}`);
  console.log(`  z-index:               ${report.zIndex}`);
  console.log(`  rectángulo:            ${report.rect.w}x${report.rect.h} en (${report.rect.left}, ${report.rect.top})`);
  console.log(`  ventana:               ${report.windowSize.w}x${report.windowSize.h}`);
  console.log(`  alto de .viewer-container: ${report.viewerContainerHeight}px`);
  console.log(`  tapa el viewport entero:    ${report.coveringViewport}`);
}

await main();