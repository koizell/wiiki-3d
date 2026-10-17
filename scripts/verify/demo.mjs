/** Presentación, no inferencia: demo visible y diferenciada de la salida real. */
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { mkdir } from 'node:fs/promises';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { GUIAS } from '../../src/lib/guias.ts';
import { leerTuArchivo } from '../../src/lib/tu-archivo.ts';
import { arrancarPreview } from './probe.mjs';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const metadata = { filename: 'prueba.gcode', material: 'PLA', slicer: 'orca', bedTemp: 50, hotendTemp: 220, layerHeight: 0.2, printTime: 180, filamentUsed: 0.93 };
const classification = { riskLevel: 'Moderado', warpingRisk: 0.35, needsSupport: false, recommendation: 'Revisa el montaje.' };
let pruebas = 0;
function comprobar(nombre, fn) { fn(); pruebas++; console.log(`OK ${nombre}`); }
try {
  const { default: Panel } = await vite.ssrLoadModule('/src/components/AnalysisPanel.tsx');
  const render = (modoClasificacion, props = {}) => renderToStaticMarkup(createElement(Panel, {
    status: 'done', metadata, classification, error: null, modoClasificacion, ...props,
  }));
  const demo = render('demo');
  comprobar('demo no se atribuye a Jev ni presenta porcentajes como probabilidades', () => {
    assert.doesNotMatch(demo, /Jev|35\s*%|No necesarios/);
    assert.match(demo, /Estimación local/);
    assert.match(demo, /35\/100/);
    assert.match(demo, /no es una probabilidad/i);
    assert.match(demo, /no garantiza/i);
    assert.match(demo, /No verificados/);
  });
  comprobar('la carga demo tampoco dice que consulta un servicio', () => {
    const carga = render('demo', { status: 'classifying' });
    assert.doesNotMatch(carga, /Jev|Consultando/);
    assert.match(carga, /local/i);
    assert.match(carga, /role="status"/);
  });
  comprobar('el modo real conserva el resultado del servicio sin aviso demo', () => {
    const real = render('real');
    assert.match(real, /Diagnóstico de Jev/);
    assert.match(real, /35\s*%/);
    assert.match(real, /No necesarios/);
    assert.doesNotMatch(real, /35\/100|demostración/);
    assert.match(render('real', { status: 'classifying' }), /Consultando a Jev/);
  });
  comprobar('una señal positiva de soportes no se presenta como geometría verificada en demo', () => {
    const props = { classification: { ...classification, needsSupport: true } };
    assert.match(render('demo', props), /No verificados/);
    assert.doesNotMatch(render('demo', props), />Necesarios</);
    assert.match(render('real', props), />Necesarios</);
  });
  for (const [riesgo, demoValor, realValor] of [[0, '0/100', '0 %'], [0.35, '35/100', '35 %'], [1, '100/100', '100 %']]) {
    const g = GUIAS.find((g) => g.slug === 'warping-pla');
    const c = { ...classification, warpingRisk: riesgo };
    comprobar(`barra de guía: ${demoValor} en demo y ${realValor} en real`, () => {
      const demo = leerTuArchivo(g, metadata, c, 'demo').datos.find((d) => d.campo === 'warpingRisk');
      const real = leerTuArchivo(g, metadata, c, 'real').datos.find((d) => d.campo === 'warpingRisk');
      assert.equal(demo.valor, demoValor);
      assert.match(demo.etiqueta, /índice/i);
      assert.equal(real.valor, realValor);
    });
  }
} finally {
  await vite.close();
}

const servidor = await arrancarPreview(5293);
const browser = await chromium.launch();
try {
  await mkdir('scripts/verify/out', { recursive: true });
  for (const width of [375, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    try {
      const page = await context.newPage();
      const errores = [];
      page.on('pageerror', (error) => errores.push(error.message));
      await context.route('**/*', (route) => new URL(route.request().url()).origin === new URL(servidor.base).origin ? route.continue() : route.abort());
      await page.goto(servidor.base, { waitUntil: 'networkidle' });
      const portada = await page.locator('.inicio-pasos').innerText();
      comprobar(`${width}px: portada declara los límites antes de subir un archivo`, () => {
        assert.match(portada, /demostración/i);
        assert.match(portada, /no es una probabilidad/i);
      });
      await page.setInputFiles('#file-upload', 'test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode');
      await page.locator('.analisis-principal .panel-demo-nota').waitFor();
      const panel = await page.locator('.analisis-principal').innerText();
      comprobar(`${width}px: resultado demo inequívoco con metadatos intactos`, () => {
        assert.doesNotMatch(panel, /Jev|35\s*%|No necesarios/);
        assert.match(panel, /35\/100/);
        assert.match(panel, /220 °C/);
        assert.match(panel, /50 °C/);
        assert.match(panel, /0.93 g/);
      });
      await page.locator('.analisis-principal').screenshot({ path: `scripts/verify/out/demo-${width}.png` });
      await page.locator('.analisis-principal a[href*="warping-pla"]').first().click();
      await page.locator('.tu-archivo').waitFor();
      const barra = await page.locator('.tu-archivo').innerText();
      comprobar(`${width}px: la guía no vuelve a convertir la demo en porcentaje`, () => {
        assert.match(barra, /35\/100/);
        assert.doesNotMatch(barra, /35\s*%/);
        assert.match(barra, /no es una probabilidad/i);
      });
      await page.locator('.tu-archivo').screenshot({ path: `scripts/verify/out/demo-guia-${width}.png` });
      const medidas = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      comprobar(`${width}px: sin desbordamiento`, () => assert.ok(medidas.scroll <= medidas.width + 1));
      await page.goto(`${servidor.base}/acerca-de/`, { waitUntil: 'networkidle' });
      const acerca = await page.locator('main').innerText();
      comprobar(`${width}px: Acerca de distingue demo local de servicio real`, () => {
        assert.match(acerca, /demostración local/i);
        assert.doesNotMatch(acerca, /35\s*%/);
        assert.match(acerca, /modo real/i);
      });
      comprobar(`${width}px: sin excepciones JavaScript`, () => assert.deepEqual(errores, []));
    } finally { await context.close(); }
  }
} finally {
  await browser.close();
  servidor.detener();
}
console.log(`Demo: ${pruebas}/${pruebas} comprobaciones aprobadas.`);
