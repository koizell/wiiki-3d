/** Una cabecera multiherramienta no identifica el material realmente utilizado. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { GUIAS, precontestar } from '../../src/lib/guias.ts';
import { leerTuArchivo } from '../../src/lib/tu-archivo.ts';
import { arrancarPreview } from './probe.mjs';

let pruebas = 0;
function comprobar(nombre, fn) { fn(); pruebas++; console.log(`OK ${nombre}`); }
const guia = GUIAS.find((g) => g.slug === 'warping-pla');
const metadata = { filename: 'varios.gcode', slicer: 'prusa', material: 'PLA;ABS;ABS;ABS;ABS;ABS', bedTemp: 60, layerHeight: 0.2, printTime: 200, filamentUsed: 2 };
const anterior = { riskLevel: 'Bajo', warpingRisk: 0.15, needsSupport: false, recommendation: 'Configuración correcta.' };
comprobar('varios materiales no eligen ABS o PLA automáticamente en la guía', () => {
  assert.equal(precontestar(guia, metadata).material, undefined);
});
comprobar('la barra no reutiliza el falso índice guardado de una lista mixta', () => {
  const lectura = leerTuArchivo(guia, metadata, anterior, 'demo');
  assert.equal(lectura.datos.find((d) => d.campo === 'warpingRisk').valor, null);
  assert.equal(lectura.datos.find((d) => d.campo === 'riskLevel').valor, null);
});

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { classifyWithJev } = await vite.ssrLoadModule('/src/services/JevService.ts');
  await assert.rejects(() => classifyWithJev(metadata), /material/i);
  pruebas++;
  const unica = await classifyWithJev({ ...metadata, material: ' ABS ; ABS ' });
  comprobar('una lista de ABS idénticos no cae en el riesgo base de PLA', () => assert.equal(unica.warpingRisk, 0.5));
  const { default: Panel } = await vite.ssrLoadModule('/src/components/AnalysisPanel.tsx');
  for (const classification of [anterior, null]) {
    const html = renderToStaticMarkup(createElement(Panel, { status: 'done', metadata, classification, error: null, modoClasificacion: 'demo' }));
    comprobar(`panel mixto ${classification ? 'antiguo' : 'nuevo'}: lectura disponible sin evaluación inventada`, () => {
      assert.match(html, /No evaluable/i);
      assert.match(html, /PLA · ABS/);
      assert.match(html, /60 °C/);
      assert.doesNotMatch(html, /15\/100|Configuración correcta|risk-bajo/);
    });
  }
} finally { await vite.close(); }

const servidor = await arrancarPreview(5294);
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1536, height: 864 } });
  await context.route('**/*', (r) => new URL(r.request().url()).origin === new URL(servidor.base).origin ? r.continue() : r.abort());
  const page = await context.newPage();
  await page.goto(servidor.base, { waitUntil: 'networkidle' });
  await page.setInputFiles('#file-upload', 'test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode');
  await page.locator('.recientes-boton').waitFor();
  const original = await readFile('test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode', 'utf8');
  assert.match(original, /^; filament_type = .+$/m);
  const contenido = original.replace(/^; filament_type = .+$/m, `; filament_type = ${metadata.material}`);
  await page.setInputFiles('#file-upload', { name: 'varios.gcode', mimeType: 'text/plain', buffer: Buffer.from(contenido) });
  await page.locator('.panel-multimaterial').waitFor();
  const texto = await page.locator('.analisis-principal').innerText();
  comprobar('G-code real con cabecera mixta conserva datos sin índice ni recomendación de éxito', () => {
    assert.match(texto, /PLA · ABS/);
    assert.match(texto, /220 °C/);
    assert.doesNotMatch(texto, /15\/100|Configuración correcta|BAJO/);
  });
  const guardadas = await page.evaluate(async () => {
    const request = indexedDB.open('wiiki-3d', 1);
    const db = await new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
    const filas = await new Promise((resolve, reject) => {
      const r = db.transaction('analisis', 'readonly').objectStore('analisis').getAll();
      r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error);
    });
    db.close();
    return filas.map((f) => f.filename);
  });
  comprobar('una lectura mixta tras un archivo válido no guarda una clasificación anterior', () => {
    assert.deepEqual(guardadas, ['Argentina T-shirt medal_PLA_2m56s.gcode']);
  });
  assert.equal(await page.locator('.analisis-siguiente a[href="/taller"]').count(), 1, 'el coste sigue disponible aunque no haya clasificación');
  await page.getByRole('link', { name: 'Wiki 3D', exact: true }).first().click();
  await page.locator('.sintoma').first().waitFor();
  await page.locator('.sintoma[href="/wiki/warping-pla"]').click();
  await page.locator('#v-material').waitFor();
  const marcados = await page.locator('#v-material button[aria-pressed="true"]').count();
  const barra = await page.locator('.tu-archivo').innerText();
  comprobar('la guía no toma una familia de la lista como material activo', () => {
    assert.equal(marcados, 0);
    assert.doesNotMatch(barra, /15\/100/);
  });
  await page.evaluate(async ({ metadata, anterior }) => {
    const request = indexedDB.open('wiiki-3d', 1);
    const db = await new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
    await new Promise((resolve, reject) => {
      const tx = db.transaction('analisis', 'readwrite');
      tx.objectStore('analisis').put({ id: 'mixto-antiguo', filename: metadata.filename, fileType: 'gcode', fecha: Date.now(), metadata, classification: anterior, nombre: 'Mixto antiguo' });
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
    db.close();
  }, { metadata, anterior });
  await page.goto(servidor.base, { waitUntil: 'networkidle' });
  await page.locator('.recientes-boton').filter({ hasText: 'varios.gcode' }).waitFor();
  const reciente = await page.locator('.recientes-boton').filter({ hasText: 'varios.gcode' }).locator('.recientes-meta').innerText();
  comprobar('Recientes no presenta el riesgo bajo de una entrada mixta antigua', () => {
    assert.match(reciente, /No evaluable/);
    assert.doesNotMatch(reciente, /Bajo|PLA;ABS/);
  });
  for (const ruta of ['/historial', '/proyectos']) {
    await page.goto(servidor.base + ruta, { waitUntil: 'networkidle' });
    const fila = page.locator('.historial-fila').filter({ hasText: ruta === '/proyectos' ? 'Mixto antiguo' : 'varios.gcode' });
    const riesgo = fila.locator('.historial-riesgo');
    await riesgo.waitFor();
    const texto = await riesgo.innerText(), clase = await riesgo.getAttribute('class');
    comprobar(`${ruta}: la clasificación antigua mixta se muestra sin falsa valoración`, () => {
      assert.equal(texto, 'No evaluable');
      assert.doesNotMatch(clase, /--bajo/);
    });
    await fila.locator('.historial-abrir').click();
    await page.locator('.panel-multimaterial').waitFor();
    assert.doesNotMatch(await page.locator('.analisis-principal').innerText(), /15\/100|Configuración correcta/);
  }
  await context.close();
} finally { await browser.close(); servidor.detener(); }
console.log(`Multimaterial: ${pruebas}/${pruebas} comprobaciones aprobadas.`);
