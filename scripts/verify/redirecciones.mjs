/**
 * Comprueba los puentes de las URLs del blog antiguo.
 *
 * **Por qué existe.** El generador de `dist/` escribe 28 ficheros que no salen
 * del renderizador. Si uno se queda sin `canonical`, apunta a una guía que ya no
 * existe o escribe una ruta que no es la que Search Console reporta, el fallo es
 * invisible: el build pasa y el 404 sigue en producción. Este script mira lo que
 * el generador acaba de escribir y lo compara con el sitemap.
 *
 * **Qué no comprueba.** No hace peticiones a Internet: comprueba el artefacto.
 * Que GitHub Pages sirva cada fichero en su ruta es una propiedad del hosting
 * —un fichero por ruta—, no del contenido. La comprobación en producción se hace
 * después del despliegue con `curl`.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { REDIRECCIONES_LEGACY } from '../redirecciones-legacy.mjs';

const raiz = new URL('../../', import.meta.url).pathname;
const dist = resolve(process.env.DIST_DIR ?? join(raiz, 'dist'));
const dominio = readFileSync(join(raiz, 'public/CNAME'), 'utf8').trim();
const origen = `https://${dominio}`;

let pruebas = 0;
const fallos = [];

function comprobar(nombre, fn) {
  pruebas += 1;
  try {
    fn();
    console.log(`OK   ${nombre}`);
  } catch (error) {
    fallos.push(nombre);
    console.error(`FALLO ${nombre}\n      ${error.message}`);
  }
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const enSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

comprobar('el mapa no repite rutas de origen', () => {
  const vistas = new Set();
  for (const { desde } of REDIRECCIONES_LEGACY) {
    assert.ok(!vistas.has(desde), `ruta repetida: ${desde}`);
    vistas.add(desde);
  }
});

comprobar('cada destino es una página real y está en el sitemap', () => {
  for (const { desde, hacia } of REDIRECCIONES_LEGACY) {
    const fichero = join(dist, hacia, 'index.html');
    assert.ok(existsSync(fichero), `${desde} apunta a ${hacia}, que no se ha exportado`);
    assert.ok(enSitemap.has(`${origen}${hacia}`), `${desde} apunta a ${hacia}, que no está en el sitemap`);
  }
});

comprobar('ningún puente apunta a otro puente', () => {
  const puentes = new Set(REDIRECCIONES_LEGACY.map((r) => r.desde));
  for (const { desde, hacia } of REDIRECCIONES_LEGACY) {
    assert.ok(!puentes.has(hacia), `${desde} encadena con otro puente (${hacia})`);
  }
});

comprobar('cada puente existe en dist y declara canonical y refresco', () => {
  for (const { desde, hacia } of REDIRECCIONES_LEGACY) {
    const fichero = join(dist, `.${desde}`);
    assert.ok(existsSync(fichero), `no se ha escrito ${desde}`);
    const html = readFileSync(fichero, 'utf8');
    const destino = `${origen}${hacia}`;
    assert.ok(html.includes(`<link rel="canonical" href="${destino}"`), `${desde} no declara canonical a ${destino}`);
    assert.ok(html.includes(`http-equiv="refresh" content="0; url=${destino}"`), `${desde} no refresca a ${destino}`);
    assert.ok(html.includes(`<a href="${destino}"`), `${desde} no tiene un enlace visible a ${destino}`);
  }
});

comprobar('los puentes no se marcan noindex', () => {
  for (const { desde } of REDIRECCIONES_LEGACY) {
    const html = readFileSync(join(dist, `.${desde}`), 'utf8');
    assert.ok(!html.includes('noindex'), `${desde} lleva noindex y puede perder el refresco`);
  }
});

console.log(`\nREDIRECCIONES: ${pruebas - fallos.length}/${pruebas} comprobaciones aprobadas.`);
console.log(`  ${REDIRECCIONES_LEGACY.length} rutas antiguas · ${new Set(REDIRECCIONES_LEGACY.map((r) => r.hacia)).size} destinos distintos`);

if (fallos.length > 0) {
  console.error(`FALLAN ${fallos.length} comprobaciones: ${fallos.join(', ')}`);
  process.exit(1);
}
