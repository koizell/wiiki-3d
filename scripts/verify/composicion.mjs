/** Composición: espacio aprovechado, contexto único y un solo scroll de lectura. */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { arrancarPreview } from './probe.mjs';

const servidor = await arrancarPreview(5295);
const browser = await chromium.launch();
let pruebas = 0;
function comprobar(nombre, fn) { fn(); pruebas++; console.log(`OK ${nombre}`); }
try {
  await mkdir('scripts/verify/out', { recursive: true });
  for (const width of [375, 768, 1024, 1536, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 864 }, reducedMotion: 'reduce' });
    try {
      await context.route('**/*', (r) => new URL(r.request().url()).origin === new URL(servidor.base).origin ? r.continue() : r.abort());
      const page = await context.newPage();
      const errores = [];
      page.on('pageerror', (e) => errores.push(e.message));
      await page.goto(`${servidor.base}/wiki`, { waitUntil: 'networkidle' });
      const medidas = await page.locator('.wiki-index').evaluate((el) => {
        const r = el.getBoundingClientRect(), main = el.closest('main'), m = main.getBoundingClientRect();
        const tarjetas = [...el.querySelectorAll('.wiki-grupo:first-child .sintoma')].map((c) => c.getBoundingClientRect());
        return { izquierda: r.left - m.left, derecha: m.right - r.right, ancho: r.width,
          columnas: new Set(tarjetas.map((c) => Math.round(c.left))).size, overflow: getComputedStyle(main).overflowY,
          desborda: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      comprobar(`${width}px: wiki centrada y rejilla adaptable`, () => {
        assert.ok(Math.abs(medidas.izquierda - medidas.derecha) <= 2, JSON.stringify(medidas));
        assert.equal(medidas.columnas, width >= 1536 ? 3 : width >= 1024 ? 2 : 1);
        assert.ok(!medidas.desborda);
      });
      comprobar(`${width}px: la lectura no tiene scroll anidado`, () => assert.equal(medidas.overflow, 'visible'));
      await page.screenshot({ path: `scripts/verify/out/wiki-composicion-${width}.png` });
      await page.locator('.site-footer').scrollIntoViewIfNeeded();
      const pie = await page.locator('.site-footer a').first().boundingBox();
      comprobar(`${width}px: el pie sigue accesible`, () => assert.ok(pie.y >= 0 && pie.y < 864));
      await page.getByRole('link', { name: 'Inicio', exact: true }).first().click();
      await page.locator('.inicio h1').waitFor();
      const inicio = await page.locator('.inicio h1').boundingBox();
      comprobar(`${width}px: cambiar de ruta vuelve al principio, no al fondo de la anterior`, () => assert.ok(inicio.y >= 0 && inicio.y < 400, JSON.stringify(inicio)));
      const anchoInicio = await page.evaluate(() => ({ ancho: innerWidth, contenido: document.documentElement.scrollWidth }));
      comprobar(`${width}px: Inicio tampoco se desborda al usar scroll de documento`, () => assert.ok(anchoInicio.contenido <= anchoInicio.ancho + 1));
      await page.setInputFiles('#file-upload', 'test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode');
      await page.locator('.panel-demo-nota').waitFor();
      const reparto = await page.locator('.analisis-principal').evaluate((el) => {
        const resumen = el.querySelector('.panel-estimacion'), datos = el.querySelector('.panel-metadatos');
        if (!resumen || !datos) return null;
        const r = resumen.getBoundingClientRect(), d = datos.getBoundingClientRect();
        const filas = [...datos.querySelectorAll('.panel-data-row')].map((f) => f.getBoundingClientRect());
        return { resumenTop: r.top, resumenBottom: r.bottom, datosTop: d.top, resumenAlto: r.height,
          columnasDatos: new Set(filas.map((f) => Math.round(f.left))).size,
          filasDatos: filas.length, scroll: getComputedStyle(el.closest('main')).overflowY };
      });
      comprobar(`${width}px: resumen compacto y metadatos independientes`, () => {
        assert.ok(reparto, 'faltan resumen o rejilla de datos');
        assert.ok(reparto.resumenBottom <= reparto.datosTop + 1, JSON.stringify(reparto));
        assert.ok(reparto.resumenAlto < (width >= 768 ? 180 : 260), `resumen estirado: ${reparto.resumenAlto}px`);
        assert.equal(reparto.filasDatos, 10);
        assert.equal(reparto.columnasDatos, width >= 1536 ? 3 : width >= 768 ? 2 : 1);
        assert.equal(reparto.scroll, 'visible');
      });
      await page.locator('.analisis-principal').screenshot({ path: `scripts/verify/out/resultado-composicion-${width}.png` });
      await page.getByRole('link', { name: 'Wiki 3D', exact: true }).first().click();
      await page.locator('.sintoma').first().waitFor();
      const contextos = await page.locator('.wiki-archivo').count();
      const insignias = await page.locator('.sintoma .insignia--acento').count();
      const contextoTexto = await page.locator('.wiki-archivo').innerText();
      comprobar(`${width}px: material del archivo una sola vez, no en cada guía`, () => {
        assert.equal(contextos, 1);
        assert.equal(insignias, 0);
        assert.match(contextoTexto, /PLA/);
      });
      await page.getByRole('searchbox').fill('esquinas');
      await page.waitForFunction(() => document.querySelectorAll('.sintoma').length < 28);
      assert.ok(await page.locator('.sintoma').count() > 0);
      await page.locator('.sintoma').first().click();
      await page.locator('.guia h1').waitFor();
      const guia = await page.locator('.guia h1').boundingBox();
      comprobar(`${width}px: abrir una guía no hereda el scroll del catálogo`, () => assert.ok(guia.y >= 0 && guia.y < 400, JSON.stringify(guia)));
      comprobar(`${width}px: sin excepciones JavaScript`, () => assert.deepEqual(errores, []));
    } finally { await context.close(); }
  }
} finally { await browser.close(); servidor.detener(); }
console.log(`Composición: ${pruebas}/${pruebas} comprobaciones aprobadas.`);
