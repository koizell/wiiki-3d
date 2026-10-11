/**
 * Estado del overlay del `Suspense` y su anclaje.
 *
 * `.viewer-overlay` es `position: absolute`, así que su ancestro posicionado
 * decide dónde se ancla. Se usa en dos sitios con resultados distintos:
 *
 *   - dentro de `Viewer3D`, como hijo de `.viewer-3d-container`, que sí es
 *     `position: relative`. Correcto.
 *   - como fallback del `Suspense` en `App.tsx`. El padre es
 *     `.viewer-container`, que es `position: static`, así que el overlay se
 *     anclaba al viewport inicial y medía 768x667 en lugar de su recuadro.
 *
 * El chunk del visor pesa ~590 KB, así que el estado de carga tarda lo bastante
 * para verlo pero no siempre. Este script retiene la respuesta con `page.route`
 * para que la medición sea reproducible en vez de depender de la red.
 *
 * Uso:  node scripts/verify/overlay.mjs
 * Sale con código 1 si el overlay no está anclado a su recuadro, o si el alto
 * salta entre la carga y el montaje.
 */

import { chromium } from 'playwright';
import { startPreview, captureOverlayDuringLoad } from './probe.mjs';

async function main() {
  const BASE = (await startPreview()) ?? 'http://127.0.0.1:4173';
  const browser = await chromium.launch();
  const results = {};

  // Los dos tramos donde el layout decide el alto del visor de forma distinta.
  for (const [w, h] of [
    [768, 667],
    [1280, 800],
  ]) {
    results[`${w}x${h}`] = await captureOverlayDuringLoad(browser, BASE, {
      width: w,
      height: h,
    });
  }

  await browser.close();

  const failures = [];
  const check = (name, ok, detail) => {
    console.log((ok ? '\nOK    ' : '\nFALLA ') + name + (detail ? '  -> ' + detail : ''));
    if (!ok) failures.push(name);
  };

  for (const [vp, r] of Object.entries(results)) {
    console.log('='.repeat(76));
    console.log(`Overlay del Suspense en ${vp}`);
    console.log('='.repeat(76));

    if (!r.sawChunk) {
      console.log('  No se ha retenido el chunk del visor; nada que medir.');
      console.log('  Puede que el build no lo haya emitido con el prefijo esperado.');
      failures.push(`${vp}: el chunk del visor no se ha interceptado`);
      continue;
    }
    if (!r.loading) {
      console.log('  No se ha capturado el overlay durante la carga.');
      failures.push(`${vp}: no se capturó el overlay`);
      continue;
    }

    const l = r.loading;
    console.log(`  padre:                 .${l.parentClass}`);
    console.log(`  ancestro posicionado:  ${l.closestPositioned ?? 'NINGUNO'}`);
    console.log(`  position del overlay:  ${l.position}`);
    console.log(`  rectángulo:            ${l.rect.w}x${l.rect.h} en (${l.rect.left}, ${l.rect.top})`);
    console.log(`  ventana:               ${l.windowSize.w}x${l.windowSize.h}`);
    console.log(`  tapa el viewport:      ${l.coveringViewport}`);

    if (r.mounted) {
      console.log(`\n  --- con el visor montado ---`);
      console.log(`  mensaje:               "${r.mounted.message}"`);
      console.log(`  recuadro:              ${r.mounted.box.w}x${r.mounted.box.h}`);
      console.log(`  overlay:               ${r.mounted.overlay.w}x${r.mounted.overlay.h}`);
    } else {
      console.log('\n  El visor montado no se ha capturado.');
    }

    check(`[${vp}] el overlay tiene un ancestro posicionado que no es el viewport`,
      l.closestPositioned !== null && l.closestPositioned !== 'viewer-3d-container (static)',
      l.closestPositioned ?? 'NINGUNO');

    check(`[${vp}] el overlay no tapa la ventana entera`,
      !l.coveringViewport,
      `${l.rect.w}x${l.rect.h} en una ventana de ${l.windowSize.w}x${l.windowSize.h}`);

    if (r.mounted) {
      const salto = Math.abs(r.loading.rect.h - r.mounted.box.h);
      check(`[${vp}] el alto no salta entre la carga y el montaje`,
        salto <= 2,
        `carga ${l.rect.h}px -> montado ${r.mounted.box.h}px (salto ${salto}px)`);
    } else {
      failures.push(`${vp}: el visor montado no se capturó`);
    }
  }

  console.log('\n' + '='.repeat(76));
  if (failures.length) {
    console.log(`FALLAN: ${failures.join(' | ')}`);
    process.exitCode = 1;
  } else {
    console.log('TODAS LAS COMPROBACIONES PASAN');
  }
}

await main();