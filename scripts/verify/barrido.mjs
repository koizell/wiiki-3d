/**
 * Barrido del layout responsivo. Es el script de referencia: `npm run
 * verify:layout`.
 *
 * Mide 29 viewports en tres estados (vacío, STL, G-code) y comprueba las cinco
 * condiciones que el layout tiene que cumplir en todos ellos. La lista de
 * viewports cubre a propósito los bordes de los tres breakpoints (639/640/641,
 * 767/768, 1199/1200), las ventanas bajas (667 y 768 de alto, donde el reparto
 * de altura duele) y landscape de móvil (667×375, 900×375, 1199×375).
 *
 * Uso:  node scripts/verify/barrido.mjs
 * Sale con código 1 si alguna comprobación falla.
 */

import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { STL_FIXTURE, GCODE_FIXTURE } from './fixtures.mjs';
import { probePage, modelPixels, startPreview } from './probe.mjs';

const OUT_DIR = new URL('./out/', import.meta.url).pathname;

const CASES = [
  [320, 568], [375, 667], [414, 896], [639, 667], [640, 667], [641, 667],
  [700, 667], [767, 667], [768, 667], [768, 700], [768, 900], [768, 1024],
  [768, 1366], [900, 667], [900, 1024], [1023, 768], [1024, 768],
  [1024, 1366], [1199, 667], [1199, 900], [1200, 667], [1200, 1024],
  [1280, 800], [1440, 900], [1920, 1080],
  [667, 375], [640, 360], [900, 375], [1199, 375],
];

/**
 * Altura mínima que se considera utilizable para orbitar con un dedo. No sale
 * de una fuente: es el umbral con el que el layout de 768–1199 se garantiza
 * 313px, y por debajo de 150px el modelo en pantalla baja de 115px.
 *
 * **Este mismo número está escrito en el CSS**, en el suelo de
 * `.viewer-3d-container`: `min-height: max(40dvh, 150px)`. Es a propósito, y por
 * eso las dos mitades de la decisión son el mismo número y no dos que coinciden.
 * Si se cambia aquí y no allí, esta comprobación pasa a medir un fallo que la
 * aplicación ya no tiene —que es como se cuelan las comprobaciones que prueban
 * lo contrario de lo que dicen—; si se cambia allí y no aquí, el barrido avisa de
 * un cambio de la altura mínima que alguien ha hecho sin querer.
 */
const MIN_VIEWER = 150;

const tramoDe = (w) =>
  w < 640 ? 'movil' : w < 768 ? '640-767' : w < 1200 ? '768-1199' : '>=1200';

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const BASE = (await startPreview()) ?? 'http://127.0.0.1:4173';

  const browser = await chromium.launch();
  const rows = [];

  for (const [w, h] of CASES) {
    const context = await browser.newContext({
      viewport: { width: w, height: h },
      colorScheme: 'dark',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 80)));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text().slice(0, 80));
    });

    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    const vacio = await page.evaluate(probePage);

    await page.setInputFiles('#file-upload', STL_FIXTURE);
    await page.waitForFunction(
      () => !!document.querySelector('.viewer-3d-container canvas'),
      null,
      { timeout: 20000 }
    );
    await page.waitForTimeout(350);
    const stl = await page.evaluate(probePage);

    await page.setInputFiles('#file-upload', GCODE_FIXTURE);
    await page.waitForFunction(() => !!document.querySelector('.panel-body'), null, {
      timeout: 20000,
    });
    await page.waitForTimeout(1200); // la ruta mock de Jev tarda 600ms
    const gcode = await page.evaluate(probePage);

    rows.push({ w, h, tramo: tramoDe(w), vacio, stl, gcode, errors: errors.length });
    await context.close();
  }
  await browser.close();

  // Las mediciones en bruto, por si hace falta comparar entre commits sin
  // volver a ejecutar.
  writeFileSync(`${OUT_DIR}barrido.json`, JSON.stringify(rows, null, 2));

  // ---- Informe ----
  const f = (v, n) => String(v ?? '-').padEnd(n);
  console.log(`barrido del layout — ${CASES.length} viewports\n`);
  console.log(
    f('viewport', 11) + f('tramo', 10) + f('topbar', 8) + f('visor', 10) +
    f('visible', 8) + f('aspect', 7) + f('modelo', 8) + f('webgl', 7) +
    f('recort', 8) + f('hScroll', 9) + f('docScr', 8) + 'errs'
  );
  console.log('-'.repeat(104));

  for (const r of rows) {
    const s = r.stl;
    const mp = s.stage ? modelPixels(s.stage.w, s.stage.h) : null;
    console.log(
      f(`${r.w}x${r.h}`, 11) + f(r.tramo, 10) + f(s.topbar, 8) +
      f(`${s.stage.w}x${s.stage.h}`, 10) + f(s.visibleHeight, 8) +
      f(s.stage ? (s.stage.w / s.stage.h).toFixed(2) : null, 7) + f(mp, 8) +
      f(s.webglOk ? 'ok' : '*** 0', 7) + f(s.clipped ? '*** SI' : 'no', 8) +
      f(s.hScroll ? '*** SI' : 'no', 9) + f(r.gcode.docScrolls ? 'si' : 'no', 8) + r.errors
    );
  }

  // ---- Comprobaciones ----
  console.log('\n' + '='.repeat(72));
  const byVp = Object.fromEntries(rows.map((r) => [`${r.w}x${r.h}`, r]));
  const failures = [];
  const check = (name, ok, detail) => {
    console.log((ok ? 'OK    ' : 'FALLA ') + name + (detail ? '  -> ' + detail : ''));
    if (!ok) failures.push(name);
  };

  check('sin scroll horizontal en ningún estado',
    rows.every((r) => !r.stl.hScroll && !r.gcode.hScroll && !r.vacio.hScroll),
    `${CASES.length} viewports`);

  check('canvas WebGL nunca degenerado',
    rows.every((r) => r.stl.webglOk), `${CASES.length} viewports`);

  check('nada recortado por `.canvas-area`',
    rows.every((r) => !r.stl.clipped), 'sin recorte');

  check('cero errores de consola',
    rows.every((r) => r.errors === 0), `${CASES.length} viewports`);

  const topbarsByWidth = {};
  for (const r of rows) (topbarsByWidth[r.w] ??= new Set()).add(r.stl.topbar);
  const unstable = Object.keys(topbarsByWidth).filter(
    (w) => topbarsByWidth[w].size > 1
  );
  check('`.top-bar` no varía con la altura del viewport',
    unstable.length === 0,
    unstable.length
      ? unstable.map((w) => w + 'px').join(', ')
      : `${Object.keys(topbarsByWidth).length} anchos, valores ${[...new Set(Object.keys(topbarsByWidth).map((w) => [...topbarsByWidth[w]][0]))].join('/')}px`);

  const bajos = rows.filter((r) => r.stl.stage.h < MIN_VIEWER);
  check(`visor >= ${MIN_VIEWER}px en todos los viewports`,
    bajos.length === 0,
    bajos.length
      ? bajos.map((r) => `${r.w}x${r.h}=${r.stl.stage.h}px`).join(', ')
      : `mínimo ${Math.min(...rows.map((r) => r.stl.stage.h))}px`);

  /*
   * El umbral y el CSS son la misma decisión, y esto lo ata.
   *
   * Sin esta comprobación, el acoplamiento del que habla el comentario de
   * `MIN_VIEWER` es sólo una intención escrita en dos sitios. Se rompe en las dos
   * direcciones y ninguna se ve:
   *
   *   - Si se sube el CSS a 200 y el script sigue en 150, **todas las aserciones
   *     siguen en verde** y el barrido certifica que 150 px es suficiente cuando la
   *     aplicación ya garantiza 200. nobody lo ha mirando.
   *   - Si se baja el CSS a 100 y el script sigue en 150, falla por la razón
   *     correcta, pero el mensaje dice «el visor mide 110px» sin decir que el suelo
   *     se cambió a mano.
   *
   * La comprobación lee el CSS y compara los dos números, así que el fallo dice
   * **quién se desincronizó**: si la comprobación falla, el suelo y el umbral ya no
   * son la misma decisión, y el arreglo es decidir cuál de los dos cambia.
   *
   * Se busca `max(40dvh, Npx)` y no `Npx` a secas porque el suelo tiene dos
   * términos y sólo uno es el umbral; y se exige la forma con `max()` porque es la
   * que distingue «hay suelo» de «no hay suelo». Con `40dvh` solo, esta comprobación
   * falla, que es lo que tiene que pasar: es exactamente el estado en el que el
   * visor bajaba a 144.
   */
  const css = readFileSync(
    new URL('../../src/App.css', import.meta.url), 'utf8'
  );
  const suelo = css.match(/min-height:\s*max\(\s*\d+dvh\s*,\s*(\d+)px\s*\)/);
  check(
    `el suelo del visor en el CSS lleva el mismo mínimo que MIN_VIEWER (${MIN_VIEWER})`,
    suelo !== null && Number(suelo[1]) === MIN_VIEWER,
    suelo === null
      ? 'no se encuentra `min-height: max(<X>dvh, <N>px)` en src/App.css'
      : suelo[1] === String(MIN_VIEWER)
        ? `src/App.css lo fija en ${suelo[1]}px, como aquí`
        : `src/App.css fija el suelo en ${suelo[1]}px y aquí el umbral es ${MIN_VIEWER}px: o suben los dos o bajan los dos`
  );

  check('los tres breakpoints siguen en 640 / 768 / 1200',
    byVp['639x667'].stl.topbar === 100 && byVp['640x667'].stl.topbar === 69 &&
    byVp['767x667'].stl.stage.h !== byVp['768x667'].stl.stage.h &&
    byVp['1199x667'].stl.stage.h !== byVp['1200x667'].stl.stage.h,
    `topbar 100->69 en 640; visor ${byVp['767x667'].stl.stage.h}->${byVp['768x667'].stl.stage.h} en 768; ${byVp['1199x667'].stl.stage.h}->${byVp['1200x667'].stl.stage.h} en 1200`);

  console.log('='.repeat(72));

  console.log('\nAltura del visor y del modelo por tramo:');
  for (const [nombre, sel] of [
    ['móvil <640', (r) => r.w < 640],
    ['640-767', (r) => r.w >= 640 && r.w < 768],
    ['768-1199', (r) => r.w >= 768 && r.w < 1200],
    ['>=1200', (r) => r.w >= 1200],
  ]) {
    const sub = rows.filter(sel);
    const hs = sub.map((r) => r.stl.stage.h);
    const mp = sub.map((r) => modelPixels(r.stl.stage.w, r.stl.stage.h));
    console.log(
      `  ${nombre.padEnd(11)} visor ${Math.min(...hs)}-${Math.max(...hs)}px` +
      `   modelo ${Math.min(...mp)}-${Math.max(...mp)}px   (${sub.length} casos)`
    );
  }

  if (failures.length) {
    console.log(`\nFALLAN: ${failures.join(' | ')}`);
    process.exitCode = 1;
  } else {
    console.log('\nTODAS LAS COMPROBACIONES PASAN');
  }
}

await main();