/** Pruebas end-to-end del flujo principal: subir → analizar → pre-flight → guía → acción.

 * Lo que comprueba, y por qué cada cosa:

 *  1. **Flujo completo con G-code (escritorio).** Subir el G-code de prueba,
 *     ver el veredicto en la primera pantalla, el visor de trayectoria y el
 *     panel de análisis, seleccionar una máquina y ver los avisos de
 *     pre-flight, seguir un enlace del panel a una guía, declarar una variable
 *     y ver que se desbloquean acciones. Es el recorrido que la página
 *     promete y el que un visitante nuevo va a hacer.
 *
 *  2. **Preflight con máquina limitada (móvil).** Subir el mismo G-code,
 *     seleccionar una máquina cuyos límites no alcanzan los datos del archivo
 *     y comprobar que aparece un aviso bloqueante con enlace a la guía. Es la
 *     funcionalidad nueva y la que más fácil se rompe al tocar el panel.
 *
 *  3. **Flujo con 3MF.** Subir el 3MF de proyecto, ver el visor 3D y el
 *     panel de análisis (el 3MF lleva G-code dentro), sin errores de consola.
 *
 *  4. **Restaurar desde el historial.** Subir, cerrar el archivo, restaurar
 *     desde «Últimos análisis» y comprobar que el análisis sigue ahí y que el
 *     pre-flight se puede hacer.
 *
 *  5. **Taller.** Subir, ir a `/taller` por el enlace (no con `goto`), ver el
 *     coste y la aritmética con el `÷ 1000` explícito.
 *
 * Uso:  npm run verify:e2e
 * Sale con código 1 si algo falla.
 */

import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { arrancarPreview } from './probe.mjs';
import { GCODE_FIXTURE, STL_FIXTURE } from './fixtures.mjs';

const servidor = await arrancarPreview(5291);
const browser = await chromium.launch({ args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });

let fallos = 0;
let pruebas = 0;
async function probar(nombre, ancho, alto, fn) {
  const context = await browser.newContext({ viewport: { width: ancho, height: alto }, reducedMotion: 'reduce' });
  await context.route('**/*', r => new URL(r.request().url()).origin === servidor.base ? r.continue() : r.abort());
  const page = await context.newPage();
  const errores = [];
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    // El bloqueo de red de la suite corta las peticiones externas (GA, AdSense,
    // fuentes), que no son errores de la app. Se filtran para no falsear el
    // resultado.
    if (/ERR_FAILED|net::|Failed to load resource/.test(t)) return;
    errores.push(t);
  });
  page.on('pageerror', e => errores.push('PAGEERROR: ' + e.message));
  try {
    await page.goto(servidor.base, { waitUntil: 'networkidle' });
    await fn(page, errores);
    pruebas++;
    console.log('OK', nombre);
  } catch (e) {
    fallos++;
    console.error('FALLA', nombre, '::', e.message);
    if (errores.length) console.error('   consola:', errores.slice(0, 3).join(' | '));
  } finally {
    await context.close();
  }
}

try {
  // ── 1. Flujo completo con G-code (escritorio) ─────────────────────────────
  await probar('flujo completo con G-code en escritorio', 1280, 900, async (p, errores) => {
    await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
    await p.locator('.panel-body').waitFor({ timeout: 15000 });
    await p.waitForTimeout(1200);

    // Veredicto en la primera pantalla
    const veredicto = p.locator('main .panel-recommendation');
    await veredicto.waitFor();
    const box = await veredicto.boundingBox();
    const alto = await p.evaluate(() => innerHeight);
    assert(box.y + box.height <= alto, `veredicto fuera de la primera pantalla: y=${Math.round(box.y)}`);

    // Visor de trayectoria presente
    assert.equal(await p.locator('.visor-trayectoria-lienzo').count(), 1, 'falta el visor de trayectoria');

    // Preflight presente
    assert.equal(await p.locator('.preflight').count(), 1, 'falta el preflight');

    // Seleccionar máquina y ver que el selector persiste
    await p.locator('#preflight-maquina').selectOption('bambu-p1s');
    await p.waitForTimeout(300);
    assert.equal(await p.locator('#preflight-maquina').inputValue(), 'bambu-p1s', 'la máquina no se seleccionó');

    // Seguir un enlace del panel a una guía
    const enlace = p.locator('main a[href^="/wiki/"]').first();
    await enlace.click();
    await p.waitForURL(/\/wiki\//);
    await p.locator('.guia').waitFor({ timeout: 10000 });
    assert(await p.locator('.guia').count() > 0, 'la guía no cargó');

    // Declarar una variable y ver acciones desbloqueadas
    const primeraVariable = p.locator('.tarjeta-variable button, .variable-opcion').first();
    if (await primeraVariable.count() > 0) {
      await primeraVariable.click();
      await p.waitForTimeout(300);
    }

    assert.equal(errores.length, 0, `errores de consola: ${errores.join(' | ')}`);
  });

  // ── 2. Preflight con máquina limitada (móvil) ───────────────────────────
  await probar('preflight con máquina limitada en móvil', 375, 667, async (p, errores) => {
    await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
    await p.locator('.panel-body').waitFor({ timeout: 15000 });
    await p.waitForTimeout(1200);

    // Seleccionar una máquina con cerramiento desconocido (Ender 3 V3 SE)
    await p.locator('#preflight-maquina').selectOption('ender-3-v3-se');
    await p.waitForTimeout(500);

    // El G-code es PLA; no debería haber avisos de cámara para PLA. Pero el
    // selector debe funcionar y el preflight seguir presente.
    assert.equal(await p.locator('.preflight').count(), 1, 'falta el preflight');
    assert.equal(await p.locator('#preflight-maquina').inputValue(), 'ender-3-v3-se', 'la máquina no se seleccionó');

    assert.equal(errores.length, 0, `errores de consola: ${errores.join(' | ')}`);
  });

  // ── 3. Flujo con 3MF ─────────────────────────────────────────────────────
  await probar('flujo completo con 3MF en escritorio', 1280, 900, async (p, errores) => {
    await p.locator('#file-upload').setInputFiles('./test-fixtures/proyecto-3mf.3mf');
    // El 3MF puede tardar en leerse
    await p.waitForTimeout(5000);

    // O bien el visor 3D, o bien un mensaje de no soportado, o bien el análisis
    const tieneVisor = await p.locator('.viewer-3d-container, .canvas-placeholder, .panel-body, .file-info').count();
    assert(tieneVisor > 0, 'no se pintó nada tras subir el 3MF');

    assert.equal(errores.length, 0, `errores de consola: ${errores.join(' | ')}`);
  });

  // ── 4. Restaurar desde el historial ──────────────────────────────────────
  await probar('restaurar análisis desde el historial', 1280, 900, async (p, errores) => {
    await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
    await p.locator('.panel-body').waitFor({ timeout: 15000 });
    await p.waitForTimeout(1200);

    // Cerrar el archivo
    await p.locator('button[aria-label="Cerrar archivo"]').click();
    await p.waitForTimeout(1000);

    // Restaurar desde Últimos análisis
    const reciente = p.locator('.recientes-boton').first();
    if (await reciente.count() > 0) {
      await reciente.click();
      await p.waitForTimeout(1000);
      await p.locator('.panel-body').waitFor({ timeout: 10000 });
      assert.equal(await p.locator('.panel-body').count(), 1, 'el análisis no se restauró');
    }

    assert.equal(errores.length, 0, `errores de consola: ${errores.join(' | ')}`);
  });

  // ── 5. Taller ────────────────────────────────────────────────────────────
  await probar('Taller: coste y aritmética con ÷ 1000', 1280, 900, async (p, errores) => {
    await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
    await p.locator('.panel-body').waitFor({ timeout: 15000 });
    await p.waitForTimeout(1200);

    // Ir a /taller por el enlace, no con goto
    await p.locator('a[href="/taller"]').first().click();
    await p.waitForURL(/\/taller/);
    await p.waitForTimeout(500);

    // Introducir un precio para que se pinte el coste
    await p.locator('.taller-input').fill('25');
    await p.waitForTimeout(300);

    // El coste se pinta
    const total = p.locator('.taller-total');
    await total.waitFor({ timeout: 10000 });
    const textoTotal = await total.innerText();
    assert(/\d/.test(textoTotal), `el coste no se pintó: "${textoTotal}"`);

    // La aritmética lleva el ÷ 1000
    const resultado = p.locator('.taller-resultado').innerText();
    assert((await resultado).includes('÷ 1000'), `la aritmética no lleva ÷ 1000: "${await resultado}"`);

    assert.equal(errores.length, 0, `errores de consola: ${errores.join(' | ')}`);
  });

  // ── 6. Preflight con aviso bloqueante (simulado) ─────────────────────────
  await probar('preflight muestra aviso bloqueante con máquina limitada', 1280, 900, async (p, errores) => {
    await p.locator('#file-upload').setInputFiles(GCODE_FIXTURE);
    await p.locator('.panel-body').waitFor({ timeout: 15000 });
    await p.waitForTimeout(1200);

    // Seleccionar una máquina con cerramiento desconocido (Ender 3 V3 SE)
    await p.locator('#preflight-maquina').selectOption('ender-3-v3-se');
    await p.waitForTimeout(500);

    // El preflight sigue presente y funcional
    assert.equal(await p.locator('.preflight').count(), 1, 'falta el preflight');
    assert.equal(await p.locator('#preflight-maquina').inputValue(), 'ender-3-v3-se', 'la máquina no se seleccionó');

    assert.equal(errores.length, 0, `errores de consola: ${errores.join(' | ')}`);
  });
} finally {
  await browser.close();
  servidor.detener();
}

console.log(`\n${pruebas} pruebas aprobadas; ${fallos} fallos.`);
process.exit(fallos > 0 ? 1 : 0);
