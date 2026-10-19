/**
 * Blindaje de la revisión de AdSense: comprueba lo que un revisor mira, y que
 * nada de lo que se prohibitions de AdSense se rompa por descuido.
 *
 * **Por qué un script y no una lista.** La lista de congelación del plan
 * (`/home/koizell-dev/.opencode/plan/60-...md` §2.1) son ocho puntos que
 * dependen de que nadie se acuerde. Una comprobación que depende de la
 * memoria se rompe el día que hay prisa. Cada punto de la lista que se puede
 * mirar en el HTML exportado está aquí, mirado.
 *
 * **Qué mira, y qué no.** Este script no juzga la calidad del contenido: eso
 * lo hace una persona. Mira las cinco cosas que la política de AdSense
 * comprueba de forma mecánica:
 *
 * 1. Que no haya ni una unidad de anuncio mientras la revisión está en marcha.
 * 2. Que toda guía escrita esté publicada (una guía sin publicar es un 404).
 * 3. Que el sitemap coincida con lo que se exportó.
 * 4. Que la política de privacidad diga la verdad del día.
 * 5. Que la cadena de AdSense esté entera: `ads.txt`, meta, etiqueta y
 *    Consent Mode v2 en `denied` declarado antes que la etiqueta.
 *
 * **Cómo se comprueba que comprueba.** Un script que nunca ha fallado no está
 * comprobado. Cada comprobación de este fichero se ha roto a propósito una
 * vez, sobre una copia de `dist/`, para ver el rojo. Para repetirlo:
 *
 * ```bash
 * cp -r dist /tmp/opencode/dist-roto
 * # <romper algo> en /tmp/opencode/dist-roto
 * DIST_DIR=/tmp/opencode/dist-roto node scripts/verify/revision.mjs  # sale con código 1
 * ```
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const raiz = new URL('../../', import.meta.url).pathname;
const dist = resolve(process.env.DIST_DIR ?? join(raiz, 'dist'));
const src = resolve(process.env.SRC_DIR ?? join(raiz, 'src'));

let pruebas = 0;
const fallos = [];

/**
 * Cada comprobación se ejecuta **todas**, aunque una falle.
 *
 * La primera versión se detenía en el primer error, y eso tenía un coste
 * concreto: al meter una unidad de anuncio, el script se paraba en
 * «ninguna unidad de anuncio» y nunca llegaba a «la privacidad coincide con lo
 * que el sitio muestra», que es justo la comprobación que avisa de que la
 * política y el sitio han divergido. Un script que para en el primer error
 * esconde los demás problemas, y aquí lo que interesa es verlos todos de una
 * vez.
 */
function comprobar(nombre, fn) {
  pruebas++;
  try {
    fn();
    console.log(`OK ${nombre}`);
  } catch (error) {
    fallos.push(nombre);
    console.log(`FALLA ${nombre}`);
    console.log(`  ${String(error.message).split('\n').join('\n  ')}`);
  }
}

/** Todos los `.html` de un directorio, en orden estable. */
function htmls(dir) {
  const salida = [];
  for (const nombre of readdirSync(dir).sort()) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) salida.push(...htmls(ruta));
    else if (nombre.endsWith('.html')) salida.push(ruta);
  }
  return salida;
}

/** El texto que lee una persona: sin etiquetas, sin scripts, sin estilos. */
function textoDe(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const paginas = htmls(dist);
assert.ok(paginas.length > 0, `no hay HTML en ${dist}: ejecuta npm run build antes`);

/** La ruta pública de una página: `dist/wiki/warping-pla/index.html` → `/wiki/warping-pla/`. */
function rutaDe(fichero) {
  const dentro = fichero.slice(dist.length).replace(/\\/g, '/');
  const sinIndex = dentro.replace(/\/index\.html$/, '');
  return sinIndex === '' ? '/' : `${sinIndex}/`;
}

const htmlPorRuta = new Map(paginas.map((f) => [rutaDe(f), f]));
const esNoindex = (ruta) => {
  const html = readFileSync(htmlPorRuta.get(ruta), 'utf8');
  return /<meta\s+name="robots"\s+content="noindex/i.test(html);
};

// ---------------------------------------------------------------------------
// 1 · Ni una unidad de anuncio mientras la revisión está en marcha.
// ---------------------------------------------------------------------------

/**
 * Las señales de una unidad de anuncio. Se buscan en el HTML **exportado**,
 * que es lo que el revisor descarga, y no sólo en el bundle: una unidad
 * inyectada por JavaScript al vuelo también la ve el revisor.
 */
const SENALES_DE_ANUNCIO = [
  { nombre: 'llamada a adsbygoogle.push()', regex: /adsbygoogle\s*\.\s*push\s*\(/i },
  { nombre: 'elemento <ins class="adsbygoogle">', regex: /<ins[^>]+class=["'][^"']*adsbygoogle/i },
  { nombre: 'marca de estado de anuncio', regex: /google_ad_status/i },
  { nombre: 'contenedor de anuncio de Google', regex: /<div[^>]+id=["']google_ads_iframe/i },
];

const anuncios = [];
for (const ruta of htmlPorRuta.keys()) {
  const html = readFileSync(htmlPorRuta.get(ruta), 'utf8');
  for (const { nombre, regex } of SENALES_DE_ANUNCIO) {
    if (regex.test(html)) anuncios.push(`${ruta}: ${nombre}`);
  }
}

/**
 * Los `<iframe>` no son sólo anuncios: la política de *site behavior* prohíbe
 * anuncios en pantallas de salida o error, y un iframe en una pantalla de ese
 * tipo es exactamente el caso que se busca. El sitio no usa ninguno, así que
 * aquí cualquier iframe es una señal de alarma.
 */
const iframes = [...htmlPorRuta.keys()].filter((ruta) =>
  /<iframe/i.test(readFileSync(htmlPorRuta.get(ruta), 'utf8')),
);

comprobar('ninguna unidad de anuncio en el HTML exportado', () => {
  assert.deepEqual(anuncios, [], `unidades de anuncio encontradas:\n  ${anuncios.join('\n  ')}`);
});
comprobar('ningún <iframe> en el HTML exportado', () => {
  assert.deepEqual(iframes, [], `iframes en: ${iframes.join(', ')}`);
});

// ---------------------------------------------------------------------------
// 2 · Toda guía escrita está registrada y publicada.
// ---------------------------------------------------------------------------

/**
 * Una guía escrita y revisada que no está en el registro no se publica: su
 * fichero existe, pero no hay página, no hay enlace y el sitemap no la
 * menciona. Es un 404 disfrazado de trabajo hecho.
 *
 * Esto no es hipotético: la guía `stringing` se commitió sin registrar en
 * `src/lib/guias.ts`, y en producción `/wiki/stringing/` devolvía 404 con el
 * sitemap a 36 URLs en vez de 37.
 */
const { GUIAS } = await import(join(src, 'lib/guias.ts'));

const ficherosGuia = readdirSync(join(src, 'content/guias'))
  .filter((n) => n.endsWith('.ts') && !['tipos.ts', 'autor.ts'].includes(n))
  .map((n) => n.replace(/\.ts$/, ''));

const registro = readFileSync(join(src, 'lib/guias.ts'), 'utf8');
const importadas = new Set(
  [...registro.matchAll(/from\s+'\.\.\/content\/guias\/([\w-]+)\.ts'/g)].map((m) => m[1]),
);

comprobar('toda guía escrita está registrada en el registro de la aplicación', () => {
  const olvidadas = ficherosGuia.filter((f) => !importadas.has(f));
  assert.deepEqual(olvidadas, [], `guías escritas y no registradas: ${olvidadas.join(', ')}`);
});

comprobar('toda guía registrada tiene página exportada', () => {
  const sinPagina = GUIAS.filter((g) => !existsSync(join(dist, 'wiki', g.slug, 'index.html'))).map((g) => g.slug);
  assert.deepEqual(sinPagina, [], `guías registradas y sin página: ${sinPagina.join(', ')}`);
});

// ---------------------------------------------------------------------------
// 3 · El sitemap coincide con lo que se exportó.
// ---------------------------------------------------------------------------

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const enSitemap = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/wiiki-3d\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'),
);

comprobar('el sitemap lista todas las páginas indexables', () => {
  const faltan = [...htmlPorRuta.keys()].filter((ruta) => !esNoindex(ruta) && !enSitemap.has(ruta));
  assert.deepEqual(faltan, [], `páginas exportadas y ausentes del sitemap: ${faltan.join(', ')}`);
});

comprobar('el sitemap no lista ninguna página con noindex', () => {
  const sobran = [...enSitemap].filter((ruta) => !htmlPorRuta.has(ruta) || esNoindex(ruta));
  assert.deepEqual(sobran, [], `entradas del sitemap que no deberían estar: ${sobran.join(', ')}`);
});

comprobar('el sitemap y el exportado tienen el mismo número de URLs', () => {
  const indexables = [...htmlPorRuta.keys()].filter((ruta) => !esNoindex(ruta));
  assert.equal(enSitemap.size, indexables.length, `sitemap con ${enSitemap.size} URLs y ${indexables.length} páginas indexables`);
});

// ---------------------------------------------------------------------------
// 4 · La política de privacidad dice la verdad del día.
// ---------------------------------------------------------------------------

const privacidadHtml = readFileSync(htmlPorRuta.get('/privacidad/'), 'utf8');
const privacidad = textoDe(privacidadHtml);

/**
 * La frase que dice que hoy no hay publicidad. Está en el texto porque es lo
 * que la política afirma, no un marcador: si mañana hay anuncios, esa frase
 * desaparece y con ella la mentira.
 */
const SIN_PUBLICIDAD = 'no muestra publicidad';
const diceQueNoHay = privacidad.toLowerCase().includes(SIN_PUBLICIDAD);
const hayAnuncios = anuncios.length > 0;

comprobar('la privacidad coincide con lo que el sitio muestra', () => {
  if (hayAnuncios) {
    assert.ok(!diceQueNoHay, 'el sitio ya tiene unidades de anuncio y la privacidad sigue diciendo que no los hay');
  } else {
    assert.ok(diceQueNoHay, `la privacidad debería decir que hoy ${SIN_PUBLICIDAD}`);
  }
});

/**
 * La cláusula que AdSense exige con su texto literal: "The privacy policy must
 * disclose to users that **third parties may be placing and reading cookies**
 * on your users' browsers".
 *
 * Se comprueba **por frase**, no por vecindad: que en la página aparezcan
 * «terceros» y «cookies» en algún sitio no dice nada. Lo que exige la
 * política es que la divulgación esté en una misma frase: que terceros colocan
 * o leen cookies. Una comprobación por vecindad daba por buena una página que
 * sólo decía «los datos no se venden a terceros» al lado de un párrafo que
 * hablaba de cookies de analítica.
 */
comprobar('la privacidad divulga en una misma frase que terceros colocan o leen cookies', () => {
  const frases = privacidad.split(/[.;]/);
  /*
   * El orden importa: «terceros» tiene que ir **antes** del verbo y el verbo
   * antes de «cookies». Sin ese orden, la frase «junto con identificadores de
   * terceros» —que viene después— cumpliría la comprobación, y la página
   * podría haber perdido la divulgación sin que nadie se enterase.
   */
  const cumple = frases.some((frase) =>
    /tercer\w*[^.]{0,120}(?:usar|utilizar|colocar|leer|instalar|poner|establecer|emitir|depositar)[^.]{0,120}cookies/i.test(frase),
  );
  assert.ok(
    cumple,
    'ninguna frase dice que terceros colocan, leen o usan cookies. La política de AdSense exige esa divulgación literal.',
  );
});

comprobar('la privacidad enlaza a cómo usa Google la información de los sitios', () => {
  const enlaces = [...privacidadHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const sirve = enlaces.some((h) => h.includes('policies.google.com/technologies/partner-sites') || h.includes('google.com/policies/privacy/partners'));
  assert.ok(sirve, `ningún enlace a la página de partners de Google. Enlaces: ${enlaces.join(', ')}`);
});

// ---------------------------------------------------------------------------
// 5 · La cadena de AdSense está entera.
// ---------------------------------------------------------------------------

const adsTxt = readFileSync(join(dist, 'ads.txt'), 'utf8');
const pubDeAdsTxt = adsTxt.match(/pub-\d+/)?.[0];
const metaHome = readFileSync(join(dist, 'index.html'), 'utf8');

comprobar('ads.txt declara un pub-ID', () => {
  assert.ok(pubDeAdsTxt, 'ads.txt no declara ningún pub-ID');
  assert.ok(/DIRECT\s*,\s*f08c47fec0942fa0/.test(adsTxt), 'ads.txt no declara la línea google.com, pub-…, DIRECT, f08c47fec0942fa0');
});

comprobar('la meta de la portada declara el mismo pub-ID que ads.txt', () => {
  const pubDeMeta = metaHome.match(/google-adsense-account"\s+content="(?:ca-)?(pub-\d+)"/)?.[1];
  assert.ok(pubDeMeta, 'la portada no declara la meta google-adsense-account');
  assert.equal(pubDeMeta, pubDeAdsTxt, `la meta dice ${pubDeMeta} y ads.txt dice ${pubDeAdsTxt}`);
});

comprobar('la etiqueta de AdSense está en la portada y en cada guía exportada', () => {
  for (const ruta of ['/', ...GUIAS.map((g) => `/wiki/${g.slug}/`)]) {
    const html = readFileSync(htmlPorRuta.get(ruta), 'utf8');
    assert.ok(
      /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(html),
      `falta la etiqueta de AdSense en ${ruta}`,
    );
  }
});

/**
 * Consent Mode v2: los cuatro parámetros en `denied` por defecto, y declarados
 * **antes** de la etiqueta. Si el orden se invierte, Google puede leer cookies
 * antes de que el visitante acepte, y eso es uno de los fallos que enumera la
 * auditoría de la EU User Consent Policy.
 */
comprobar('Consent Mode v2 con los cuatro parámetros en denied', () => {
  for (const parametro of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage']) {
    assert.match(metaHome, new RegExp(`${parametro}\\s*:\\s*'denied'`), `falta ${parametro}: 'denied'`);
  }
});

comprobar('el consentimiento se declara antes que la etiqueta de AdSense', () => {
  const consent = metaHome.indexOf("gtag('consent', 'default'");
  const etiqueta = metaHome.indexOf('adsbygoogle.js');
  assert.ok(consent > -1, 'no hay declaración de consentimiento por defecto');
  assert.ok(etiqueta > -1, 'no hay etiqueta de AdSense');
  assert.ok(consent < etiqueta, 'la etiqueta de AdSense se carga antes del consentimiento por defecto');
});

comprobar('la portada y las guías enlazan a la política de privacidad', () => {
  for (const ruta of ['/', '/taller/', '/acerca-de/', '/contacto/', ...GUIAS.map((g) => `/wiki/${g.slug}/`)]) {
    const html = readFileSync(htmlPorRuta.get(ruta), 'utf8');
    assert.ok(html.includes('href="/privacidad"'), `la página ${ruta} no enlaza a la política de privacidad`);
  }
});

console.log(`REVISIÓN: ${pruebas - fallos.length}/${pruebas} comprobaciones aprobadas.`);
console.log(`  ${paginas.length} páginas exportadas · ${enSitemap.size} URLs en el sitemap · ${GUIAS.length} guías`);

if (fallos.length > 0) {
  console.error(`FALLAN ${fallos.length} comprobaciones: ${fallos.join(', ')}`);
  process.exit(1);
}
