import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { GCODE_FIXTURE } from './fixtures.mjs';

// Ejecutar contra Vite: BASE_URL=http://127.0.0.1:5199 node scripts/verify/subida-ui.mjs
const base = process.env.BASE_URL ?? 'http://127.0.0.1:5199';
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(base);
  const zone = page.locator('.upload-zone');
  await zone.waitFor();
  await zone.evaluate((element) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['uno'], 'uno.gcode'));
    dataTransfer.items.add(new File(['dos'], 'dos.gcode'));
    element.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }));
  });
  await page.getByRole('alert').waitFor();
  assert.match(await page.getByRole('alert').innerText(), /un solo archivo/);
  assert.ok(await zone.isVisible(), 'Una selección múltiple no debe abrir arbitrariamente un archivo');
  const prevented = await zone.evaluate((element, content) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([content], 'arrastrado.gcode'));
    const over = new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer });
    element.dispatchEvent(over);
    const drop = new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer });
    element.dispatchEvent(drop);
    return over.defaultPrevented && drop.defaultPrevented;
  }, readFileSync(GCODE_FIXTURE, 'utf8'));
  assert.ok(prevented, 'El arrastre debe impedir que el navegador abra el archivo');
  await page.getByRole('heading', { name: 'Archivo: arrastrado.gcode' }).waitFor();
  await page.getByRole('link', { name: 'Taller', exact: true }).first().click();
  await page.getByLabel('Precio del filamento (€/kg)').fill('25');
  assert.match(await page.locator('.taller-resultado').innerText(), /0,02 €/);

  // Un contexto nuevo representa a quien llega directamente a Taller sin archivo.
  const fresh = await browser.newPage();
  await fresh.goto(`${base}/taller`);
  const upload = fresh.locator('.taller').getByRole('button', { name: 'Seleccionar G-code' });
  await upload.waitFor();
  const chooserPromise = fresh.waitForEvent('filechooser');
  await upload.click();
  await (await chooserPromise).setFiles(GCODE_FIXTURE);
  await fresh.getByLabel('Precio del filamento (€/kg)').fill('25');
  assert.match(await fresh.locator('.taller-resultado').innerText(), /0,02 €/);
  assert.equal(new URL(fresh.url()).pathname, '/taller');
  console.log('OK: arrastre → análisis → coste; selección desde Taller sin salir de la ruta.');
} finally {
  await browser.close();
}
