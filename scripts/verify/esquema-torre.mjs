/** Piloto editorial: alcance, carga real de SVG y lectura con/sin JavaScript. */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { arrancarPreview } from './probe.mjs';

const servidor = await arrancarPreview(5291);
const base = servidor.base;
const origen = new URL(base).origin;
const browser = await chromium.launch();
let pruebas = 0;
function comprobar(nombre, fn) {
  fn();
  pruebas++;
  console.log(`OK ${nombre}`);
}

try {
  for (const javaScriptEnabled of [true, false]) {
    for (const width of [320, 375, 768, 1440]) {
      const contexto = await browser.newContext({ javaScriptEnabled, viewport: { width, height: 900 } });
      try {
        const page = await contexto.newPage();
        const errores = [];
        page.on('pageerror', (error) => errores.push(error.message));
        await page.route('**/*', (route) => new URL(route.request().url()).origin === origen
          ? route.continue() : route.abort());
        await page.goto(`${base}/wiki/torre-temperatura/`, { waitUntil: 'networkidle' });
        const caso = `${width}px · ${javaScriptEnabled ? 'con' : 'sin'} JS`;
        const figura = page.locator('figure.esquema-torre');
        const posicion = {
          total: await figura.count(),
          lectura: await page.locator('#c-puenteado .esquema-torre').count(),
          portada: await page.locator('.guia-cabecera .esquema-torre').count(),
        };
        comprobar(`${caso}: un esquema junto a la lectura, no en la portada`, () => {
          assert.equal(posicion.total, 1, `${caso}: falta el esquema de lectura`);
          assert.equal(posicion.lectura, 1);
          assert.equal(posicion.portada, 0);
        });

        const imagenes = figura.locator('img');
        assert.equal(await imagenes.count(), 3);
        for (const imagen of await imagenes.all()) {
          await imagen.scrollIntoViewIfNeeded();
          await imagen.evaluate((img) => img.decode());
        }
        const datos = await imagenes.evaluateAll((imgs) => imgs.map((img) => ({
          cargada: img.complete && img.naturalWidth > 0,
          alt: img.alt.trim(),
          ancho: Number(img.getAttribute('width')),
          alto: Number(img.getAttribute('height')),
          lazy: img.loading,
          ruta: img.getAttribute('src'),
        })));
        comprobar(`${caso}: tres SVG cargados, descritos y con espacio reservado`, () => {
          for (const imagen of datos) {
            assert.ok(imagen.cargada && imagen.alt.length > 10);
            assert.ok(imagen.ancho > 0 && imagen.alto > 0);
            assert.equal(imagen.lazy, 'lazy');
            assert.match(imagen.ruta, /^\/wiki\/torre-temperatura\/.+\.svg$/);
          }
        });

        const enlaces = await figura.locator('a').evaluateAll((items) => items.map((a) => ({
          texto: a.textContent.trim(),
          destino: a.hash,
          existe: !!document.getElementById(a.hash.slice(1)),
          alto: a.getBoundingClientRect().height,
        })));
        comprobar(`${caso}: etiquetas HTML con enlaces a los detalles existentes`, () => {
          assert.deepEqual(enlaces.map((a) => a.texto), ['Puenteado', 'Hilos', 'Capas']);
          assert.deepEqual(enlaces.map((a) => a.destino), ['#c-puenteado', '#c-stringing', '#c-adhesion-capas']);
          assert.ok(enlaces.every((a) => a.existe && a.alto >= 44));
        });

        const medidas = await figura.evaluate((el) => {
          const caja = el.getBoundingClientRect();
          const imagenes = [...el.querySelectorAll('img')].map((img) => img.getBoundingClientRect());
          return {
            desborda: document.documentElement.scrollWidth > innerWidth + 1,
            cabe: caja.width <= el.closest('.tarjeta').clientWidth,
            imagenesDentro: imagenes.every((img) => img.left >= caja.left && img.right <= caja.right),
            columnas: new Set(imagenes.map((img) => Math.round(img.top))).size,
          };
        });
        comprobar(`${caso}: esquema dentro de la columna y adaptación legible`, () => {
          assert.ok(!medidas.desborda && medidas.cabe && medidas.imagenesDentro, JSON.stringify(medidas));
          if (width <= 375) assert.equal(medidas.columnas, 3, 'móvil: un detalle por fila');
          if (width === 1440) assert.equal(medidas.columnas, 1, 'escritorio: tres detalles en una fila');
        });
        comprobar(`${caso}: sin excepciones JavaScript`, () => assert.deepEqual(errores, []));

        if (javaScriptEnabled && [375, 1440].includes(width)) {
          await mkdir('scripts/verify/out', { recursive: true });
          await figura.screenshot({ path: `scripts/verify/out/esquema-torre-${width}.png` });
        }
        if (javaScriptEnabled && width === 1440) {
          await page.getByRole('button', { name: 'ABS', exact: true }).click();
          await page.getByRole('button', { name: 'Cura', exact: true }).click();
          assert.equal(await figura.count(), 1, 'cambiar variables no duplica ni pierde el esquema');
          /*
           * La salida del diferencial aparece **al contestar «no»**: es la forma de
           * que el enlace signifique algo. Antes estaba siempre, y por eso esta
           * comprobación podía limitarse a pulsarlo.
           */
          await page.locator('.comprobacion-boton--no').first().click();
          await page.locator('.diferencial-salida a').click();
          await page.waitForURL('**/wiki/flow-rate');
          await figura.waitFor({ state: 'detached' });
          assert.equal(await figura.count(), 0, 'el piloto no se arrastra al cambiar de guía');
          pruebas += 2;
        }
      } finally {
        await contexto.close();
      }
    }
  }

  const contexto = await browser.newContext();
  try {
    const page = await contexto.newPage();
    const solicitudes = [];
    page.on('request', (request) => {
      if (request.url().includes('/wiki/torre-temperatura/') && request.url().endsWith('.svg')) solicitudes.push(request.url());
    });
    await page.goto(`${base}/wiki/altura-capa/`, { waitUntil: 'networkidle' });
    comprobar('otras guías no montan el esquema ni descargan sus imágenes', () => assert.equal(solicitudes.length, 0));
    assert.equal(await page.locator('.esquema-torre').count(), 0);
    await page.route('**/wiki/torre-temperatura/*.svg', (route) => route.abort());
    await page.goto(`${base}/wiki/torre-temperatura/`, { waitUntil: 'networkidle' });
    const figura = page.locator('.esquema-torre');
    await figura.scrollIntoViewIfNeeded();
    assert.equal(await figura.locator('a').count(), 3);
    assert.match(await figura.innerText(), /No representa un ensayo/);
    pruebas++;
    console.log('OK sin imágenes: se conservan etiquetas, enlaces y alcance del esquema');
  } finally {
    await contexto.close();
  }
  console.log(`Esquema torre: ${pruebas}/${pruebas} comprobaciones aprobadas.`);
} finally {
  await browser.close();
  servidor.detener();
}
