/** Regresión de atribuciones y barrido de enlaces internos del sitio servido. */
import assert from 'node:assert/strict';
import { chromium, request } from 'playwright';
import { GUIAS, conocimientoVisible } from '../../src/lib/guias.ts';
import { arrancarPreview, TIMEOUT_COMPROBACION } from './probe.mjs';

const servidor = await arrancarPreview(5292);
const base = servidor.base;
const origen = new URL(base).origin;
const browser = await chromium.launch();
const http = await request.newContext({ timeout: TIMEOUT_COMPROBACION });
const internos = new Map();
const paginas = new Map();
let pruebas = 0;
let citas = 0;
function comprobar(nombre, fn) {
  fn();
  pruebas++;
  console.log(`OK ${nombre}`);
}

try {
  const respuesta = await http.get(`${base}/sitemap.xml`);
  assert.equal(respuesta.status(), 200);
  const rutas = [...(await respuesta.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname);
  assert.ok(rutas.length > GUIAS.length, 'sitemap vacío o sin páginas generales');
  rutas.push('/historial/', '/proyectos/');

  for (const javaScriptEnabled of [false, true]) {
    const modo = javaScriptEnabled ? 'con JS' : 'sin JS';
    const contexto = await browser.newContext({ javaScriptEnabled, viewport: { width: 375, height: 812 } });
    contexto.setDefaultTimeout(TIMEOUT_COMPROBACION);
    contexto.setDefaultNavigationTimeout(TIMEOUT_COMPROBACION);
    try {
      // Pruebas aisladas: no cargar publicidad/analítica ni visitar fuentes externas.
      await contexto.route('**/*', (route) => new URL(route.request().url()).origin === origen
        ? route.continue() : route.abort());
      const page = await contexto.newPage();
      const errores = [];
      page.on('pageerror', (error) => errores.push(error.message));
      for (const ruta of rutas) {
        const response = await page.goto(`${base}${ruta}`, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200, `${ruta}: no devuelve 200`);
        const guia = GUIAS.find((g) => ruta === `/wiki/${g.slug}/`);
        if (guia) {
          const esperadas = conocimientoVisible(guia, {}).filter((c) => c.cita);
          const atribuciones = await page.locator('.tarjeta-cita cite').evaluateAll((items) => items.map((el) => ({
            texto: el.textContent.trim(),
            visible: el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
            enlaces: [...el.querySelectorAll('a')].map((a) => ({
              href: a.getAttribute('href'), texto: a.textContent.trim(), target: a.target,
            })),
          })));
          comprobar(`${ruta} ${modo}: atribuciones conservadas y bibliografía accesible`, () => {
            assert.equal(atribuciones.length, esperadas.length, 'no ocultar citas para eliminar enlaces rotos');
            for (const [i, atribucion] of atribuciones.entries()) {
              assert.equal(atribucion.texto, `${esperadas[i].cita.fuente} · Ver fuentes de la guía`);
              assert.ok(atribucion.visible, 'la atribución no debe quedar oculta');
              assert.equal(atribucion.enlaces.length, 1);
              assert.equal(atribucion.enlaces[0].href, '#fuentes', `${ruta}: un nombre de fuente no es una URL`);
              assert.match(atribucion.enlaces[0].texto, /ver fuentes/i);
              assert.equal(atribucion.enlaces[0].target, '');
            }
          });
          citas += esperadas.length;
          const fuentes = await page.locator('#fuentes a').evaluateAll((items) => items.map((a) => a.getAttribute('href')));
          comprobar(`${ruta} ${modo}: enlaces originales de la bibliografía sin sustituciones`, () => {
            assert.deepEqual(fuentes, guia.fuentes.map((f) => f.url));
            for (const url of fuentes) assert.match(url, /^https?:\/\//);
          });
          if (guia.slug === 'torre-temperatura') {
            await page.locator('.tarjeta-cita cite a').first().click();
            assert.equal(new URL(page.url()).pathname, ruta);
            assert.equal(new URL(page.url()).hash, '#fuentes');
            await page.locator('#fuentes').waitFor({ state: 'visible' });
            const top = await page.locator('#fuentes').evaluate((el) => el.getBoundingClientRect().top);
            assert.ok(top >= 0 && top < 812, 'el clic no lleva a las fuentes');
            pruebas++;
          }
        }
        const datos = await page.evaluate(() => ({
          ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
          enlaces: [...document.querySelectorAll('a[href]')].map((a) => ({
            href: a.getAttribute('href'), url: a.href, texto: a.textContent.trim(),
          })),
        }));
        paginas.set(`${modo}:${ruta}`, new Set(datos.ids));
        comprobar(`${ruta} ${modo}: ningún nombre convertido en ruta relativa`, () => {
          for (const enlace of datos.enlaces) {
            assert.match(enlace.href, /^(?:\/|#|https?:\/\/|mailto:|tel:)/, JSON.stringify(enlace));
            const url = new URL(enlace.url);
            if (url.origin !== origen) continue;
            // El navegador puede estar en #fuentes después de probar el clic.
            if (url.pathname === ruta && url.hash) {
              assert.ok(datos.ids.includes(decodeURIComponent(url.hash.slice(1))), `ancla inexistente ${enlace.href}`);
            }
            internos.set(`${modo}:${url.href}`, { href: url.href, ruta, modo });
          }
        });
      }
      comprobar(`${modo}: sin excepciones JavaScript`, () => assert.deepEqual(errores, []));
    } finally {
      await contexto.close();
    }
  }

  // Una petición por ruta, no una por cada enlace repetido en el pie.
  const destinos = [...new Set([...internos.values()].map(({ href }) => {
    const url = new URL(href);
    return url.origin + url.pathname + url.search;
  }))];
  for (const url of destinos) {
    const response = await http.get(url);
    comprobar(`${new URL(url).pathname}: destino interno HTTP 200`, () => assert.equal(response.status(), 200));
  }
  for (const { href, ruta: desde, modo } of internos.values()) {
    const url = new URL(href);
    if (!url.hash) continue;
    const ruta = url.pathname === '/' ? '/' : `${url.pathname.replace(/\/$/, '')}/`;
    const ids = paginas.get(`${modo}:${ruta}`);
    assert.ok(ids, `destino con ancla no inspeccionado: ${href}`);
    assert.ok(ids.has(decodeURIComponent(url.hash.slice(1))), `${desde} ${modo}: ancla rota ${href}`);
  }
  console.log(`Enlaces: ${pruebas}/${pruebas} comprobaciones; ${citas} atribuciones revisadas entre ambos modos; ${destinos.length} destinos internos. Fuentes externas: URLs preservadas, disponibilidad remota no comprobada.`);
} finally {
  await http.dispose();
  await browser.close();
  servidor.detener();
}
