/** HTML, navegación y lectura sin JS. El build debe ejecutarse antes. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { startPreview } from './probe.mjs';

/*
 * Los slugs vienen del registro de la aplicación, no de un directorio de ficheros.
 *
 * La versión anterior los leía de `src/content/wiki/*.md`, que ya no existe: el
 * contenido de una guía es un módulo de TypeScript y no hay directorio que listar.
 * La razón de fondo es la misma que en `verify:wiki` y por eso está escrita aquí
 * también: lo que hay que comprobar es que **la web** está bien, y la lista de guías
 * que usa la web es la del registro. Leerla de otro sitio comprobaría una lista
 * paralela, que es un segundo sitio que puede desfasarse.
 */
const { GUIAS, conocimientoVisible } = await import('../../src/lib/guias.ts');

const raiz = new URL('../../', import.meta.url).pathname;
const dist = join(raiz, 'dist');
const BASE = process.env.BASE_URL ?? (await startPreview()) ?? 'http://127.0.0.1:4173';
const slugs = GUIAS.map((g) => g.slug);
const rutas = ['/wiki', '/acerca-de', '/contacto', '/privacidad', ...slugs.map((s) => `/wiki/${s}`)];
const origen = 'https://wiiki-3d.com';
const canonical = (ruta) => `${origen}${ruta === '/' ? '/' : `${ruta}/`}`;
let pruebas = 0;
function comprobar(nombre, fn) {
  fn();
  pruebas++;
  console.log(`OK ${nombre}`);
}
const browser = await chromium.launch();
try {
  const sin = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 667 } });
  const titulos = new Set();
  for (const ruta of rutas) {
    const html = readFileSync(join(dist, ruta.slice(1), 'index.html'), 'utf8');
    comprobar(`${ruta}: contenido y canonical en HTML`, () => {
      assert.ok(html.includes(`href="${canonical(ruta)}"`));
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
      assert.ok(!html.includes('noindex'));
      assert.equal((html.match(/<title>/g) ?? []).length, 1);
      const titulo = html.match(/<title>(.*?)<\/title>/)?.[1];
      assert.ok(titulo && !titulos.has(titulo));
      titulos.add(titulo);
      assert.ok(/<meta name="description" content="[^"]+"/.test(html));
    });
    const page = await sin.newPage();
    const respuesta = await page.goto(`${BASE}${ruta}/`, { waitUntil: 'networkidle' });
    comprobar(`${ruta}: 200 y lectura móvil sin JavaScript`, () => assert.equal(respuesta.status(), 200));
    assert.equal(await page.locator('main h1').count(), 1);
    const ancho = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    comprobar(`${ruta}: sin desbordamiento horizontal`, () => assert.ok(ancho.scroll <= ancho.width + 1, JSON.stringify(ancho)));
    if (ruta.startsWith('/wiki/')) {
      const json = await page.locator('#wiki-schema').textContent();
      const guia = GUIAS.find((g) => `/wiki/${g.slug}` === ruta);
      comprobar(`${ruta}: JSON-LD es un HowTo, no un Article`, () => {
        const schema = JSON.parse(json);
        assert.equal(schema['@type'], 'HowTo');
        assert.equal(schema.mainEntityOfPage, canonical(ruta));
        assert.equal(schema.inLanguage, 'es');
      });
      comprobar(`${ruta}: los pasos del HowTo son las acciones de la guía`, () => {
        const schema = JSON.parse(json);
        assert.ok(Array.isArray(schema.step) && schema.step.length > 0, 'sin pasos');
        assert.deepEqual(schema.step.map((s) => s.name), guia.reglas.slice(0, 8).map((r) => r.accion));
      });
      /*
       * Sin `datePublished`.
       *
       * El formato anterior era un artículo con fecha de revisión, y la metía. Este no
       * es un artículo, es un procedimiento, y **no hay dato de cuándo se escribió cada
       * guía**: inventar una fecha es peor que no ponerla, porque Google la lee y nadie
       * puede comprobarla. Si algún día se guarda, se pone; mientras tanto, que no esté.
       */
      comprobar(`${ruta}: no inventa fecha de publicación`, () => {
        const schema = JSON.parse(json);
        assert.equal(schema.datePublished, undefined);
        assert.equal(schema.dateModified, undefined);
      });
      /*
       * El contenido sin JavaScript.
       *
       * Antes se exigían 800 palabras porque ése era el criterio de un artículo largo.
       * Ahora lo que tiene que estar es lo que hace falta para entender el problema y ver
       * las cifras: el diferencial, las tarjetas y las fuentes. Y las **fuentes** son las
       * que más importan sin JS, porque son las que permiten comprobar una afirmación —lo
       * que distingue esta wiki de un blog— y llegan en el HTML estático.
       */
      const textoSinJs = await page.locator('main').innerText();
      comprobar(`${ruta}: se lee sin JS y trae el diferencial y las fuentes`, () => {
        assert.ok(/descártalo/i.test(textoSinJs), 'falta el diferencial');
        assert.ok(/de dónde sale|fuentes/i.test(textoSinJs), 'no dice de dónde sale');
        for (const f of guia.fuentes) assert.ok(textoSinJs.includes(f.quien), `falta la fuente ${f.quien}`);
      });
      /*
       * La barra «Tu archivo» no aparece en el HTML exportado, y es lo correcto.
       *
       * Depende del archivo de quien lee, y el HTML exportado no tiene archivo de
       * nadie: se genera con el contexto de análisis vacío. Lo que **no** puede
       * pasar es que quede una caja vacía —una franja con el título «Tu archivo» y
       * guiones debajo de la cabecera— porque entonces las cuatro guías publicarían
       * un hueco que no se llena nunca, y en la versión sin JavaScript no hay
       * ninguna forma de quitarlo.
       *
       * Y las anclas sí tienen que estar, porque son lo que permite que un enlace
       * a `#v-cama` funcione con el motor apagado.
       */
      comprobar(`${ruta}: sin JS no hay barra «Tu archivo» en el HTML exportado`, () => {
        assert.ok(!html.includes('tu-archivo'), 'el HTML exportado trae la barra de los datos del archivo');
      });
      comprobar(`${ruta}: las anclas de la guía sí están en el HTML exportado`, () => {
        for (const v of guia.variables) assert.ok(html.includes(`id="v-${v.id}"`), `falta el ancla de la variable ${v.id}`);
        /*
         * Sólo las tarjetas que se ven sin declarar nada, y no todas. Las que
         * llevan `cuando` no están en el HTML exportado porque nadie ha
         * contestado ninguna variable —que es lo que puede pasar sin JavaScript—,
         * y exigir su `id` sería exigir un elemento que la página no pinta. Por
         * eso se calcula la lista con el mismo motor que usa la ruta, en vez de
         * compararla con `guia.conocimiento`.
         */
        for (const c of conocimientoVisible(guia, {})) {
          assert.ok(html.includes(`id="c-${c.id}"`), `falta el ancla de la tarjeta ${c.id}`);
        }
      });
    }
    await page.close();
  }
  await sin.close();
  const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  comprobar('sitemap sólo con destinos indexables existentes', () => {
    for (const ruta of ['/', '/taller', ...rutas]) assert.ok(sitemap.includes(`<loc>${canonical(ruta)}</loc>`));
    assert.ok(!sitemap.includes('/proyectos') && !sitemap.includes('/historial'));
    assert.ok(readFileSync(join(dist, 'robots.txt'), 'utf8').includes(`Sitemap: ${origen}/sitemap.xml`));
  });
  for (const ruta of ['/proyectos', '/historial']) comprobar(`${ruta}: noindex en HTML`, () => {
    assert.ok(readFileSync(join(dist, ruta.slice(1), 'index.html'), 'utf8').includes('noindex, follow'));
  });
  comprobar('404 estático noindex', () => assert.ok(readFileSync(join(dist, '404.html'), 'utf8').includes('noindex, follow')));

  const con = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await con.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));
  await page.goto(`${BASE}/wiki/warping-pla/`, { waitUntil: 'networkidle' });
  const conSchema = `/wiki/${GUIAS[0].slug}`;
  for (const ruta of ['/wiki', '/privacidad', conSchema, '/historial', '/proyectos', '/wiki/no-existe']) {
    // Simula navegación del router sin recargar para detectar metadatos heredados.
    await page.evaluate((ruta) => {
      history.pushState(null, '', ruta);
      dispatchEvent(new PopStateEvent('popstate'));
    }, ruta);
    await page.waitForFunction((canonical) => document.querySelector('link[rel="canonical"]')?.href === canonical, canonical(ruta));
    comprobar(`${ruta}: canonical único al navegar`, () => assert.ok(true));
    assert.equal(await page.locator('head link[rel="canonical"]').count(), 1);
    assert.equal(await page.locator('head meta[name="description"]').count(), 1);
    const noindex = ['/historial', '/proyectos', '/wiki/no-existe'].includes(ruta);
    assert.equal(await page.locator('head meta[name="robots"]').getAttribute('content'), noindex ? 'noindex, follow' : 'index, follow');
    assert.equal(await page.locator('#wiki-schema').count(), ruta === conSchema ? 1 : 0);
  }
  for (const ruta of ['/wiki', '/privacidad', '/acerca-de', '/contacto']) {
    await page.goto(`${BASE}${ruta}/`, { waitUntil: 'networkidle' });
    comprobar(`${ruta}/: metadatos al cargar la URL de GitHub Pages`, () => assert.ok(true));
    assert.equal(await page.locator('head meta[name="robots"]').getAttribute('content'), 'index, follow');
    assert.equal(await page.locator('head link[rel="canonical"]').getAttribute('href'), canonical(ruta));
  }
  comprobar('navegación sin excepciones JavaScript', () => assert.deepEqual(errores, []));
  await con.close();
} finally {
  await browser.close();
}
console.log(`SEO: ${pruebas}/${pruebas} comprobaciones aprobadas.`);
