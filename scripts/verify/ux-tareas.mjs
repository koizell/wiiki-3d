/** Regresiones de la auditoría UX: medir tareas y área libre, no sólo viewport. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { arrancarPreview } from './probe.mjs';
import { GCODE_FIXTURE, STL_FIXTURE } from './fixtures.mjs';
import { siluetaAzul, cambioGeometrico } from './silueta.mjs';

const servidor = await arrancarPreview(5287);
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
const grupo = process.argv.find(a => a.startsWith('--grupo='))?.split('=')[1];
let fallos = 0;
let pruebas = 0;
async function probar(nombre, fn) {
  const context = await browser.newContext({ viewport: { width: 375, height: 667 }, reducedMotion: 'reduce' });
  // El diagnóstico de impresión de esta suite usa el mock de build, no una API.
  await context.route('**/*', r => new URL(r.request().url()).origin === servidor.base ? r.continue() : r.abort());
  const page = await context.newPage();
  try {
    await page.goto(servidor.base, { waitUntil: 'networkidle' });
    await fn(page);
    pruebas++;
    console.log('OK', nombre);
  } catch (e) {
    fallos++;
    console.error('FALLA', nombre, e.message);
  } finally { await context.close(); }
}

try {
  if (!grupo || grupo === 'entrada') {
    await probar('subida completa sobre la barra fija, incluso con foco', async p => {
      const boton = p.getByRole('button', { name: 'Seleccionar Archivo', exact: true });
      await boton.focus();
      const libre = await boton.evaluate(el => {
        const r = el.getBoundingClientRect(), nav = document.querySelector('.sidebar-left').getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, limit: nav.top, hit: el.contains(document.elementFromPoint(r.x + r.width / 2, r.bottom - 2)) };
      });
      assert(libre.top >= 0 && libre.bottom < libre.limit && libre.hit, JSON.stringify(libre));
    });
    await probar('Inicio ofrece síntomas y catálogo antes de la documentación larga', async p => {
      const enlaces = p.locator('.inicio-accesos');
      assert.equal(await enlaces.locator('a[href="/wiki"]').count(), 1);
      assert.equal(await enlaces.locator('a[href="/maquinas"]').count(), 1);
      const r = await enlaces.boundingBox();
      assert(r.y < 667, `accesos en y=${r.y}`);
    });
    await probar('G-code muestra recomendación en main, sin visor vacío ni duplicados', async p => {
      await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
      await p.locator('.panel-body').waitFor();
      assert.equal(await p.locator('main .panel-body').count(), 1);
      assert.equal(await p.locator('.panel-body').count(), 1);
      assert.equal(await p.locator('.canvas-placeholder').count(), 0);
      assert.equal(await p.locator('main h1').count(), 1);
      const recomendacion = await p.locator('main .panel-recommendation').boundingBox();
      const nav = await p.locator('.sidebar-left').boundingBox();
      assert(recomendacion.y < nav.y, 'recomendación fuera del área inicial');
      assert.equal(await p.locator('main a[href="/taller"]').count(), 1);
    });
    await probar('formato no admitido permite elegir otro en el propio aviso', async p => {
      await p.locator('#file-upload').setInputFiles({ name: 'prueba.txt', mimeType: 'text/plain', buffer: Buffer.from('prueba') });
      assert.equal(await p.locator('main').getByRole('button', { name: 'Elegir otro archivo' }).count(), 1);
      assert(!(await p.locator('#file-upload').getAttribute('accept')).includes('.obj'));
    });
  }
  if (!grupo || grupo === 'guias') {
    await probar('enlace del análisis lleva a la variable de la guía, no sólo a su URL', async p => {
      await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
      await p.locator('.panel-body').waitFor();
      await p.locator('.panel-explicar').first().click();
      await p.locator('#v-material').waitFor();
      await p.waitForFunction(() => {
        const y = document.getElementById('v-material').getBoundingClientRect().top;
        return y >= 0 && y < 600;
      });
      const destino = await p.locator('#v-material').boundingBox();
      assert(destino.y >= 0 && destino.y < 600, `destino fuera de la pantalla: y=${destino.y}`);
    });
    await probar('guía de escritorio conserva cabecera y variables alcanzables al desplazarse', async p => {
      await p.setViewportSize({ width: 1440, height: 900 });
      await p.goto(servidor.base + '/wiki/altura-capa');
      await p.locator('.etapa--variables').waitFor();
      const titulo = await p.locator('main h1').boundingBox();
      const main = await p.locator('main').boundingBox();
      assert(titulo.y >= main.y, `cabecera fuera del área desplazable: ${titulo.y} < ${main.y}`);
      const boton = p.getByRole('button', { name: /^Fina \(0,08–0,10 mm\)/ });
      await boton.click();
      assert.equal(await boton.getAttribute('aria-pressed'), 'true');
    });
    await probar('guía orienta por cuatro etapas y adelanta la primera comprobación', async p => {
      await p.setViewportSize({ width: 375, height: 812 });
      await p.goto(servidor.base + '/wiki/warping-pla');
      await p.locator('.etapa--diferencial').waitFor();
      const nav = p.getByRole('navigation', { name: 'Recorrido de la guía' });
      assert.equal(await nav.locator('a').count(), 4);
      for (const link of await nav.locator('a').all()) {
        assert.equal(await p.locator(await link.getAttribute('href')).count(), 1);
      }
      const pregunta = await p.locator('.diferencial-mira').first().boundingBox();
      assert(pregunta.y < 750, `primera comprobación en y=${pregunta.y}`);
      assert.equal(await p.locator('.guia-contexto .guia-entrada').count(), 1);
      assert.equal(await p.locator('.guia-fuentes-lista').count(), 1);
    });
    await probar('guía conserva diferencial, variables y relacionadas sin enumerar toda la wiki', async p => {
      await p.goto(servidor.base + '/wiki/warping-pla');
      await p.locator('.etapa--variables').waitFor();
      assert.equal(await p.locator('.diferencial-fila').count(), 3);
      assert.equal(await p.locator('.riel-lista li').count(), 3);
      assert.equal(await p.locator('.riel a[href="/wiki"]').count(), 1);
      await p.locator('fieldset button').first().click();
      assert.equal(await p.locator('fieldset button[aria-pressed="true"]').count(), 1);
      assert(await p.locator('#recomendacion .accion').count() > 0);
    });
    await probar('Wiki agrupa todas las tarjetas y conserva búsqueda con recuento', async p => {
      await p.goto(servidor.base + '/wiki');
      await p.locator('.sintoma').first().waitFor();
      const total = await p.locator('.sintoma').count();
      assert(await p.locator('.wiki-grupo h2').count() >= 3);
      const links = await p.locator('.sintoma').evaluateAll(els => els.map(e => e.getAttribute('href')));
      assert.equal(new Set(links).size, total);
      await p.getByRole('searchbox').fill('esquinas');
      await p.waitForFunction(n => document.querySelectorAll('.sintoma').length < n, total);
      assert(await p.locator('.sintoma').count() > 0);
      assert.match(await p.locator('.wiki-resultados').innerText(), /de/);
    });
    await probar('Taller, biblioteca y páginas de lectura no compiten con un listado lateral', async p => {
      await p.setViewportSize({ width: 1440, height: 1000 });
      for (const route of ['/taller', '/proyectos', '/historial', '/contacto']) {
        await p.goto(servidor.base + route);
        await p.locator('main h1').waitFor();
        assert.equal(await p.locator('.sidebar-right').count(), 0, route);
        const h = await p.locator('main h1').boundingBox();
        assert(h.y < 220, `${route}: título en y=${h.y}`);
      }
    });
  }
  if (!grupo || grupo === 'herramientas') {
    await probar('catálogo móvil identifica la primera máquina sin atravesar un texto largo', async p => {
      await p.setViewportSize({ width: 375, height: 812 });
      await p.goto(servidor.base + '/maquinas');
      await p.locator('.maquina').first().waitFor();
      const nombre = await p.locator('.maquina h2').first().boundingBox();
      assert(nombre.y < 750, `primer modelo en y=${nombre.y}`);
      await p.locator('#maquinas-fil').selectOption('pla-gen');
      assert(!(await p.locator('main').innerText()).includes('PLA pide cámara cerrada'));
      assert.equal(await p.locator('.maquinas-alcance summary').count(), 1);
    });
    await probar('coste destaca el total y conserva unidades y fórmula comprobable', async p => {
      await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
      await p.locator('.panel-body').waitFor();
      await p.getByRole('link', { name: 'Taller', exact: true }).first().click();
      await p.getByLabel('Precio del filamento (€/kg)').fill('25');
      assert.match(await p.locator('.taller-total').innerText(), /0,02\s*€/);
      assert.match(await p.locator('.taller-resultado').innerText(), /0,93.*25,00.*0,02/);
      assert.match(await p.locator('.taller-limites').innerText(), /filamento/);
      await p.getByLabel('Precio del filamento (€/kg)').fill('-1');
      assert.equal(await p.locator('.taller-total').count(), 0);
      assert.equal(await p.locator('[aria-invalid="true"]').count(), 1);
    });
    await probar('visor permite zoom, giro y encuadre con controles de teclado', async p => {
      await p.setViewportSize({ width: 1440, height: 1000 });
      await p.locator('#file-upload').setInputFiles(STL_FIXTURE);
      await p.locator('canvas').waitFor();
      await p.locator('.viewer-overlay').waitFor({ state: 'hidden' });
      const lienzo = p.locator('canvas');
      // Sólo geometría: el texto vivo y el foco no deben falsear la comparación.
      const captura = async () => siluetaAzul(p, await lienzo.screenshot({ style: '.visor-estado, .visor-controles { visibility: hidden !important; }' }));
      const antes = await captura();
      const acercar = p.getByRole('button', { name: 'Acercar modelo' });
      await acercar.focus();
      await p.keyboard.press('Enter');
      await p.waitForFunction(() => document.querySelector('.visor-estado')?.textContent.includes('ampliada'));
      const ampliada = await captura();
      assert(cambioGeometrico(antes, ampliada), 'acercar debe cambiar la geometría, no sólo un texto');
      await p.getByRole('button', { name: 'Girar modelo' }).click();
      const girada = await captura();
      assert(cambioGeometrico(ampliada, girada), 'girar debe cambiar la geometría');
      await p.getByRole('button', { name: 'Encuadrar modelo' }).click();
      assert(cambioGeometrico(girada, await captura()), 'encuadrar debe cambiar la geometría');
      assert.match(await lienzo.getAttribute('aria-label'), /STL/);
      await p.locator('#file-upload').setInputFiles({ name: 'roto.3mf', mimeType: 'application/octet-stream', buffer: Buffer.from('roto') });
      await p.locator('.viewer-overlay.error').waitFor();
      assert.equal(await p.locator('.viewer-overlay.error').getByRole('button', { name: 'Elegir otro archivo' }).count(), 1);
    });
    await probar('Recientes no estrecha el visor y los controles no tapan el modelo', async p => {
      await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
      await p.locator('.recientes-fila').first().waitFor();
      await p.locator('#file-upload').setInputFiles(STL_FIXTURE);
      await p.locator('canvas').waitFor();
      await p.locator('.viewer-overlay').waitFor({ state: 'hidden' });
      for (const width of [375, 768]) {
        await p.setViewportSize({ width, height: 667 });
        await p.waitForFunction(() => Math.abs(document.querySelector('.viewer-3d-container').clientWidth
          - document.querySelector('canvas').getBoundingClientRect().width) < 2);
        const medida = await p.evaluate(() => {
          const main = document.querySelector('main');
          const css = getComputedStyle(main);
          const espacio = main.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
          const lienzo = document.querySelector('canvas').getBoundingClientRect();
          const controles = document.querySelector('.visor-controles').getBoundingClientRect();
          return { espacio, ancho: lienzo.width, fondo: lienzo.bottom, controlesTop: controles.top };
        });
        assert(medida.ancho >= medida.espacio - 4, JSON.stringify(medida));
        assert(medida.controlesTop >= medida.fondo, 'controles sobre la geometría');
      }
    });
  }
} finally {
  await browser.close();
  servidor.detener();
}
console.log(`${pruebas} pruebas aprobadas; ${fallos} fallos`);
if (fallos) process.exitCode = 1;
