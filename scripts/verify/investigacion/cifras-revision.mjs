/**
 * Cifras de lo publicado, para el informe de la revisión de AdSense.
 *
 * El informe cita números, y un número que no se puede repetir no sirve como
 * evidencia. Este script produce la tabla completa desde el `dist/` recién
 * construido, con el método escrito.
 *
 * **El método, y por qué es éste.**
 *
 * 1. **Palabras**: se cuenta lo que se lee, no lo que hay en el fichero. Se
 *    quitan `script`, `style`, `svg`, `noscript`, `nav` y los comentarios; el
 *    resto de etiquetas se convierten en separador, para que dos bloques
 *    distintos no peguen sus palabras. Se cuentan tokens de dos o más
 *    caracteres con al menos una letra o un número. `wc -w` sobre el HTML daría
 *    un número distinto, porque cuenta atributos y clases.
 * 2. **Enlaces de salida**: los `href` que apuntan fuera de `wiiki-3d.com`. Son
 *    las fuentes: lo que respalda las afirmaciones de la guía.
 * 3. **Imágenes**: etiquetas `<img>`. Hoy el sitio tiene 0 en las guías, y eso
 *    es un dato del informe, no un olvido.
 * 4. **Acciones**: bloques `class="accion"`, que es la cuarta etapa de la guía
 *    («qué cambiar»). Es la parte que un revisor ve como contenido del
 *    editor, y la que en su día salía vacía.
 * 5. **Fecha**: la que aparece en el JSON-LD (`dateModified`), no una suelta.
 *
 * ```bash
 * npm run build && node scripts/verify/investigacion/cifras-revision.mjs
 * ```
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const raiz = new URL('../../../', import.meta.url).pathname;
const dist = join(raiz, 'dist');

function htmls(dir) {
  const salida = [];
  for (const nombre of readdirSync(dir).sort()) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) salida.push(...htmls(ruta));
    else if (nombre.endsWith('.html')) salida.push(ruta);
  }
  return salida;
}

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

const filas = [];
for (const fichero of htmls(dist)) {
  const html = readFileSync(fichero, 'utf8');
  const relativo = fichero.slice(dist.length).replace(/\\/g, '/');
  const ruta = relativo.replace(/\/index\.html$/, '') || '/';
  const esquema = html.match(/<script id="wiki-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  const fecha = esquema ? JSON.parse(esquema).dateModified : null;
  filas.push({
    ruta: ruta === '/' ? '/' : `${ruta}/`,
    palabras: palabrasDe(html),
    fuentes: [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].filter((m) => !m[1].includes('wiiki-3d.com')).length,
    imagenes: (html.match(/<img[\s>]/gi) ?? []).length,
    acciones: (html.match(/class="accion"/g) ?? []).length,
    fecha: fecha ?? '—',
    noindex: /<meta\s+name="robots"\s+content="noindex/i.test(html),
  });
}

const guia = filas.filter((f) => f.ruta.startsWith('/wiki/') && f.ruta !== '/wiki/');
const secciones = filas.filter((f) => !f.ruta.startsWith('/wiki/') && f.ruta !== '/wiki/');

console.log('| Ruta | Palabras | Fuentes | Imágenes | Acciones | Actualizado |');
console.log('|---|---:|---:|---:|---:|---|');
for (const f of [...secciones, ...guia]) {
  console.log(`| \`${f.ruta}\` | ${f.palabras} | ${f.fuentes} | ${f.imagenes} | ${f.acciones} | ${f.fecha} |`);
}

const totalPalabras = filas.reduce((n, f) => n + f.palabras, 0);
const totalFuentes = guia.reduce((n, f) => n + f.fuentes, 0);
const totalAcciones = guia.reduce((n, f) => n + f.acciones, 0);
console.log('');
console.log(`Total: ${filas.length} páginas · ${totalPalabras} palabras visibles · ${guia.length} guías · ${totalFuentes} enlaces de fuente · ${totalAcciones} acciones`);
console.log(`Guías con menos de 800 palabras: ${guia.filter((f) => f.palabras < 800).map((f) => `${f.ruta} (${f.palabras})`).join(', ') || 'ninguna'}`);
console.log(`Guías con 0 acciones: ${guia.filter((f) => f.acciones === 0).map((f) => f.ruta).join(', ') || 'ninguna'}`);
