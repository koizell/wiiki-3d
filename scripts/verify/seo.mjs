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
const rutas = ['/wiki', '/acerca-de', '/contacto', '/privacidad', '/autor', '/maquinas', ...slugs.map((s) => `/wiki/${s}`)];
const origen = 'https://wiiki-3d.com';
const canonical = (ruta) => `${origen}${ruta === '/' ? '/' : `${ruta}/`}`;
let pruebas = 0;
function comprobar(nombre, fn) {
  fn();
  pruebas++;
  console.log(`OK ${nombre}`);
}

/**
 * Las palabras que se leen en un HTML, contadas como las cuenta una persona.
 *
 * Se quitan `script`, `style`, `svg`, `noscript`, `nav` y los comentarios, y el
 * resto de etiquetas se convierte en separador para que dos bloques distintos no
 * peguen sus palabras. Se cuentan tokens con al menos una letra o un número, y de
 * dos caracteres en adelante.
 *
 * No vale `wc -w` sobre el fichero: cuenta atributos, clases y comentarios, y da
 * una cifra que no se corresponde con nada que nadie lea.
 */
function palabrasDe(html) {
  const body = (html.match(/<body[\s\S]*<\/body>/i) || [html])[0];
  const texto = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#?\w+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return texto.split(/\s+/).filter((w) => /[\p{L}\p{N}]{2,}/u.test(w)).length;
}

const browser = await chromium.launch();
try {
  comprobar('despegue-a-mitad: no repetir una acción por cada variable', () => {
    const html = readFileSync(join(dist, 'wiki/despegue-a-mitad/index.html'), 'utf8');
    assert.equal((html.match(/class="accion"/g) ?? []).length, GUIAS.find((g) => g.slug === 'despegue-a-mitad').reglas.length);
  });
  const sin = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 667 } });
  const titulos = new Set();
  for (const ruta of rutas) {
    const html = readFileSync(join(dist, ruta.slice(1), 'index.html'), 'utf8');
    comprobar(`${ruta}: contenido y canonical en HTML`, () => {
      assert.ok(html.includes(`href="${canonical(ruta)}"`));
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
      assert.ok(!html.includes('noindex'));
      // Sólo el <title> del <head>. Los SVG legítimos pueden llevar su propio
      // <title> de accesibilidad (lo hace MaquinaSVG, uno por máquina); contarlos
      // en todo el HTML rompería esta comprobación sin que hubiera fallo de SEO.
      const head = (html.match(/<head[\s\S]*?<\/head>/i) ?? [''])[0];
      assert.equal((head.match(/<title>/g) ?? []).length, 1);
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
       * Fecha real y declarada, no inventada.
       *
       * El formato antiguo no metía fecha porque no había dato de cuándo se
       * escribió cada guía, e inventarla era peor que omitirla. Eso cambió: cada
       * guía declara `actualizado`, así que el HowTo publica `datePublished` y
       * `dateModified` con ese valor. El guard ya no comprueba «que no esté»,
       * sino **que sea exactamente la declarada**: si el schema y la guía se
       * desfasan, o si alguien teclea una fecha a mano en el JSON-LD, sale aquí.
       * Aprovecha y fija también la autoría, la otra señal nueva.
       */
      comprobar(`${ruta}: publica la fecha declarada y el autor`, () => {
        const schema = JSON.parse(json);
        assert.equal(schema.datePublished, guia.actualizado);
        assert.equal(schema.dateModified, guia.actualizado);
        assert.equal(schema.author?.['@type'], 'Organization');
        assert.equal(schema.author?.name, guia.autor.nombre);
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
       * Y las anclas sí tienen que estar, porque son las que permiten que un enlace
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

      /*
       * ======================================================================
       * La etapa 4, que es el producto de la guía, tiene que estar sin JS
       * ======================================================================
       *
       * Esto no se comprobaba, y el hueco no era teórico: como `reglasQueSalen`
       * depende de las respuestas y la exportación estática no tiene ninguna,
       * **ocho de las nueve guías publicaban «Qué cambiar» con cero acciones** y el
       * texto «con lo declarado hasta ahora no sale ninguna acción». La etapa que
       * justifica la guía entera era la única que no salía en el HTML, justo en la
       * versión que lee quien no ejecuta JavaScript y el primer vistazo de un
       * rastreador.
       *
       * Las tres comprobaciones de abajo atacan tres formas distintas de que eso
       * vuelva, y ninguna se conforma con «hay algo de texto ahí»:
       *
       * 1. **El recuento exacto** contra el motor, no contra el HTML de ayer: si una
       *    regla nueva no llega a la exportación o se duplica, el número deja de
       *    cuadrar. Se compara con el registro, no con un helper de agrupación que
       *    pudiera repetir el mismo defecto del renderizador.
       * 2. **Un suelo de palabras** por guía, medido sobre el texto visible. Es tosco
       *    y por eso va acompañado de lo demás, pero es lo único que cae si alguien
       *    revierte el render sin tocar ninguna etiqueta con nombre.
       * 3. **El ancla `#recomendacion`**, que la etapa 2 usa como atajo: si el bloque
       *    desaparece, el atajo apunta a un sitio que no existe y la comprobación de
       *    anclas de `verify:wiki` no lo ve, porque sólo mira la etapa 2.
       */
      const esperadas = guia.reglas.length;

      comprobar(`${ruta}: la etapa 4 publica todas sus acciones sin JavaScript`, () => {
        const enHtml = (html.match(/class="accion"/g) ?? []).length;
        assert.ok(guia.reglas.length > 0, 'la guía no tiene reglas');
        assert.equal(
          enHtml,
          esperadas,
          `${guia.slug}: el HTML trae ${enHtml} acciones y el motor dice ${esperadas}`
        );
        assert.ok(
          !html.includes('no sale ninguna acción'),
          'el HTML dice que no sale ninguna acción: la etapa 4 volvió a exportarse vacía'
        );
        assert.ok(html.includes('id="recomendacion"'), 'falta el ancla de la etapa 4');
      });

      comprobar(`${ruta}: cada acción del recetario dice de dónde sale`, () => {
        /*
         * Un `accion-fuente` por acción, y el número de fuentes citadas no puede ser
         * cero: una acción sin fuente es exactamente lo que este proyecto no publica.
         */
        const fuentesEnAcciones = (html.match(/class="accion-fuente"/g) ?? []).length;
        assert.equal(fuentesEnAcciones, esperadas, `${fuentesEnAcciones} fuentes para ${esperadas} acciones`);
      });

      const acciones = await page.locator('#recomendacion .accion').evaluateAll((items) => items.map((el) => ({
        id: el.getAttribute('data-regla'),
        titulo: el.querySelector('h3')?.textContent,
        valor: el.querySelector('.accion-valor')?.textContent ?? null,
        porque: el.querySelector('.accion-porque')?.textContent,
        alcance: el.querySelector('.accion-alcance')?.textContent ?? null,
        fuente: el.querySelector('.accion-fuente')?.textContent,
        condiciones: el.querySelector('.accion-condiciones')?.textContent,
      })));
      comprobar(`${ruta}: cada regla sale una sola vez, completa y en orden`, () => {
        assert.deepEqual(acciones.map((a) => a.id), guia.reglas.map((r) => r.id));
        const sinNegrita = (s) => s.replaceAll('**', '');
        for (const [i, regla] of guia.reglas.entries()) {
          const accion = acciones[i];
          assert.equal(accion.titulo, regla.accion);
          assert.equal(accion.valor, regla.valor ?? null);
          assert.equal(accion.porque, sinNegrita(regla.porque));
          assert.equal(accion.alcance, regla.alcance ? sinNegrita(regla.alcance) : null);
          assert.equal(accion.fuente, regla.fuente);
          const condiciones = Object.entries(regla.cuando ?? {});
          if (!condiciones.length) assert.match(accion.condiciones, /se aplica siempre/i);
          else {
            assert.match(accion.condiciones, /todas estas condiciones/i);
            for (const [id, valores] of condiciones) {
              const variable = guia.variables.find((v) => v.id === id);
              const etiquetas = (Array.isArray(valores) ? valores : [valores])
                .map((valor) => variable.opciones.find((o) => o.id === valor).etiqueta);
              assert.ok(accion.condiciones.includes(`${variable.etiqueta}: ${etiquetas.join(' o ')}`), `${regla.id}: condición incompleta`);
            }
          }
        }
      });

      /*
       * El suelo de palabras, y por qué es 900 y no 1200.
       *
       * 900 es el mínimo real medido hoy —la guía más corta, `temperatura-hotend`,
       * está en 975— con margen para que una edición que recorte un párrafo no
       * rompa la comprobación, y muy por encima de lo que queda si la etapa 4 se
       * vuelve a exportar vacía: la guía más corta perdería más de cien palabras y
       * las demás entre seiscientas y mil cuatrocientas. Un umbral más alto
       * convertiría esto en un objetivo de longitud, que es otra cosa y no la
       * queremos aquí: el criterio editorial de la casa es que el texto sea
       * suficiente, no que llegue a un número.
       */
      const MINIMO_PALABRAS = 900;
      comprobar(`${ruta}: la guía tiene cuerpo suficiente sin JavaScript`, () => {
        const palabras = palabrasDe(html);
        assert.ok(
          palabras >= MINIMO_PALABRAS,
          `${guia.slug}: ${palabras} palabras en el HTML exportado, por debajo del mínimo de ${MINIMO_PALABRAS}`
        );
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
