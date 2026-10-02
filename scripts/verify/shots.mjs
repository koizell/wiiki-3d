/**
 * Capturas de los viewports donde el reparto de altura del layout se nota.
 *
 * Cada caso se captura en su estado real: el visor 3D necesita geometría, así
 * que con STL; y el panel de análisis sólo tiene datos con un G-code. Se
 * guardan dos por viewport, la del viewport y la de página completa, porque la
 * segunda es la que deja ver si algo queda cortado por debajo.
 *
 * Uso:  node scripts/verify/shots.mjs
 * Las imágenes van a `scripts/verify/out/` (ignorado por git).
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { STL_FIXTURE, GCODE_FIXTURE } from './fixtures.mjs';
import { probePage, startPreview } from './probe.mjs';

const OUT_DIR = new URL('./out/', import.meta.url).pathname;

/** Los dos casos donde el reparto se nota, en sus dos estados. */
const CASES = [
  [768, 667],
  [768, 1024],
];

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const BASE = (await startPreview()) ?? 'http://127.0.0.1:4173';

  const browser = await chromium.launch();

  for (const [w, h] of CASES) {
    for (const [nombre, fixture] of [
      ['gcode', GCODE_FIXTURE],
      ['stl', STL_FIXTURE],
    ]) {
      const context = await browser.newContext({
        viewport: { width: w, height: h },
        colorScheme: 'dark',
      });
      const page = await context.newPage();
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      await page.setInputFiles('#file-upload', fixture);

      await page.waitForFunction(
        () => !!document.querySelector('.panel-body, .viewer-3d-container canvas'),
        null,
        { timeout: 20000 }
      );
      await page.waitForTimeout(1400);

      const probe = await page.evaluate(probePage);
      const base = `${OUT_DIR}${w}x${h}-${nombre}`;
      await page.screenshot({ path: `${base}.png` });
      await page.screenshot({ path: `${base}-full.png`, fullPage: true });

      console.log(
        `${base}.png   visor ${probe.stage.w}x${probe.stage.h}` +
        `   panel ${probe.panelHeight ?? '-'}px` +
        `   docScrolls ${probe.docScrolls}`
      );
      await context.close();
    }
  }

  await browser.close();
  console.log(`\nCapturas en ${OUT_DIR}`);
}

await main();