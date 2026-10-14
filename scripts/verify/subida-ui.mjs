/**
 * La subida, de las dos formas que existen: arrastrando y eligiendo.
 *
 * Lo que comprueba, y por qué cada cosa:
 *
 *  1. **El arrastre abre el archivo.** La zona de subida de `/` llevaba semanas
 *     diciendo «Arrastra tu archivo aquí» sin un solo handler de `drop`:
 *     soltar un fichero encima hacía que el navegador lo abriera en la pestaña y
 *     se perdiera la página. Aquí se dispara el `drop` de verdad y se comprueba
 *     que queda cancelado y que el archivo entra en el analizador.
 *
 *  2. **Arrastrar varios archivos no abre ninguno.** Sin esto, el primer
 *     `files[0]` se cargaría en silencio y la persona creería haber subido el
 *     segundo. Tiene que avisar y no hacer nada.
 *
 *  3. **La subida llega al cálculo.** Arrastrar un G-code, ir a `/taller` por el
 *     enlace de la barra —no con `goto`, que destruiría el estado— y ver el
 *     coste. Es el recorrido que la página promete.
 *
 *  4. **Desde `/taller` también se puede subir.** Quien llega allí sin archivo
 *     tenía un texto que se lo pedía y ningún control para hacerlo: había que
 *     descubrir la barra de arriba. Se comprueba que el botón de la pantalla
 *     abre el selector y que la ruta no cambia.
 *
 * Uso:  npm run verify:subida
 *        BASE_URL=http://127.0.0.1:5199 npm run verify:subida   (contra un servidor vivo)
 * Sale con código 1 si algo falla.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { GCODE_FIXTURE } from './fixtures.mjs';
import { arrancarPreview } from './probe.mjs';

/*
 * `arrancarPreview` como el resto de `scripts/verify/`: mide contra la build de
 * `dist/`, y `BASE_URL` manda cuando está puesto para medir contra un servidor
 * de desarrollo sin tener que reconstruir.
 */
const servidor = await arrancarPreview();
const base = process.env.BASE_URL ?? servidor.base;
const browser = await chromium.launch({ args: ['--no-sandbox'] });

const contenido = readFileSync(GCODE_FIXTURE, 'utf8');

try {
  const page = await browser.newPage();
  await page.goto(base);
  const zone = page.locator('.upload-zone');
  await zone.waitFor();

  // ── 2 · Varios archivos: avisa y no carga ninguno ────────────────────────
  await zone.evaluate((element) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['uno'], 'uno.gcode'));
    dataTransfer.items.add(new File(['dos'], 'dos.gcode'));
    element.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }));
  });
  await page.getByRole('alert').waitFor();
  assert.match(
    await page.getByRole('alert').innerText(),
    /un solo archivo/,
    'Arrastrar varios archivos tiene que avisar'
  );
  assert.ok(
    await zone.isVisible(),
    'Una selección múltiple no debe cargar el primero en silencio'
  );

  // ── 1 · Un archivo: el navegador no se lo queda, lo carga la app ─────────
  const prevenido = await zone.evaluate((element, texto) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([texto], 'arrastrado.gcode'));
    const over = new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer });
    element.dispatchEvent(over);
    const drop = new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer });
    element.dispatchEvent(drop);
    return over.defaultPrevented && drop.defaultPrevented;
  }, contenido);
  assert.ok(
    prevenido,
    'El arrastre tiene que impedir que el navegador abra el archivo en la pestaña'
  );
  await page.getByRole('heading', { name: 'Archivo: arrastrado.gcode' }).waitFor();

  // ── 3 · Del arrastre al coste, por el enlace de la barra ─────────────────
  await page.getByRole('link', { name: 'Taller', exact: true }).first().click();
  await page.getByLabel('Precio del filamento (€/kg)').fill('25');
  assert.match(
    await page.locator('.taller-resultado').innerText(),
    /0,02 €/,
    'El G-code arrastrado tiene que llegar al cálculo del coste'
  );

  // ── 4 · Subir desde `/taller` sin salir de la ruta ───────────────────────
  const fresh = await browser.newPage();
  await fresh.goto(`${base}/taller`);
  await fresh.locator('.taller').getByRole('button', { name: 'Seleccionar G-code' }).waitFor();
  const selector = fresh.waitForEvent('filechooser');
  await fresh.locator('.taller').getByRole('button', { name: 'Seleccionar G-code' }).click();
  await (await selector).setFiles(GCODE_FIXTURE);
  await fresh.getByLabel('Precio del filamento (€/kg)').fill('25');
  assert.match(
    await fresh.locator('.taller-resultado').innerText(),
    /0,02 €/,
    'Elegir el G-code en /taller tiene que calcular el coste'
  );
  assert.equal(
    new URL(fresh.url()).pathname,
    '/taller',
    'Elegir el archivo no debe sacar de /taller'
  );

  console.log('OK: arrastre → análisis → coste; varios archivos se rechazan; se puede subir desde /taller.');
} finally {
  await browser.close();
  servidor.detener();
}
