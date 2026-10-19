/**
 * Autocomprobación de `revision.mjs`: rompe el sitio a propósito, una vez por
 * comprobación, y comprueba que el script se da cuenta.
 *
 * **Por qué existe.** Una comprobación que nunca ha fallado no está
 * comprobada: puede que mire la cosa equivocada y siempre pase. La regla del
 * repo es que cada comprobación nueva se rompe a propósito una vez y se ve el
 * rojo. Eso, hecho a mano, se hace una vez y luego se olvida; aquí está en
 * código, y se puede repetir en cualquier momento.
 *
 * **Cómo funciona.** Se copia `dist/` (y `src/` cuando la mutación lo pide) a
 * un directorio temporal, se aplica **una** mutación, y se ejecuta
 * `revision.mjs` contra esa copia. Se espera que **falle** (código de salida 1)
 * y que el mensaje mencione lo que se rompió.
 *
 * Ninguna mutación toca el repositorio: todo ocurre en `/tmp`.
 *
 * ```bash
 * node scripts/verify/revision-selftest.mjs
 * ```
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const raiz = new URL('../../', import.meta.url).pathname;
const distReal = join(raiz, 'dist');
const srcReal = join(raiz, 'src');
const script = join(raiz, 'scripts/verify/revision.mjs');

/**
 * Cada mutación: qué rompe y qué tiene que decir el script cuando lo ve.
 *
 * `dist` y `src` son ficheros de texto; `mutacion` los lee y los escribe.
 */
const MUTACIONES = [
  {
    nombre: 'una unidad de anuncio en una guía',
    espera: 'unidades de anuncio',
    muta: ({ dist }) => {
      const ruta = join(dist, 'wiki/warping-pla/index.html');
      const html = readFileSync(ruta, 'utf8').replace(
        '</body>',
        '<ins class="adsbygoogle" data-ad-client="ca-pub-1976099124866284" data-ad-slot="123"></ins></body>',
      );
      writeFileSync(ruta, html);
    },
  },
  {
    nombre: 'un iframe en la portada',
    espera: 'iframes',
    muta: ({ dist }) => {
      const ruta = join(dist, 'index.html');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace('</body>', '<iframe src="https://example.com"></iframe></body>'));
    },
  },
  {
    nombre: 'una guía escrita que no está registrada',
    espera: 'no registradas',
    usaSrc: true,
    muta: ({ src }) => {
      const ruta = join(src, 'lib/guias.ts');
      // Se quitan el import **y** la entrada del array: quitar sólo uno deja
      // el módulo sin cargar y el script revienta por una razón que no es la
      // que se quiere comprobar.
      const texto = readFileSync(ruta, 'utf8')
        .replace(/^import \{ stringing \}.*\n/m, '')
        .replace(/, stringing/, '');
      writeFileSync(ruta, texto);
    },
  },
  {
    nombre: 'una guía registrada sin página exportada',
    espera: 'sin página',
    muta: ({ dist }) => {
      rmSync(join(dist, 'wiki/torre-temperatura/index.html'));
      const ruta = join(dist, 'sitemap.xml');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace(/<url><loc>https:\/\/wiiki-3d\.com\/wiki\/torre-temperatura\/<\/loc>[^<]*<\/url>\s*/, ''));
    },
  },
  {
    nombre: 'una página indexable fuera del sitemap',
    espera: 'ausentes del sitemap',
    muta: ({ dist }) => {
      const ruta = join(dist, 'sitemap.xml');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace(/<url><loc>https:\/\/wiiki-3d\.com\/taller\/<\/loc><\/url>\s*/, ''));
    },
  },
  {
    nombre: 'una página con noindex en el sitemap',
    espera: 'no deberían estar',
    muta: ({ dist }) => {
      const ruta = join(dist, 'sitemap.xml');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace('</urlset>', '<url><loc>https://wiiki-3d.com/historial/</loc></url></urlset>'));
    },
  },
  {
    nombre: 'la privacidad diciendo que hay publicidad sin que la haya',
    espera: 'debería decir',
    muta: ({ dist }) => {
      const ruta = join(dist, 'privacidad/index.html');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace('no muestra publicidad', 'muestra publicidad'));
    },
  },
  {
    nombre: 'la privacidad diciendo que no hay publicidad cuando sí los hay',
    espera: 'sigue diciendo que no los hay',
    muta: ({ dist }) => {
      const ruta = join(dist, 'wiki/warping-pla/index.html');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace('</body>', '<ins class="adsbygoogle" data-ad-client="ca-pub-1"></ins></body>'));
    },
  },
  {
    nombre: 'la privacidad sin la cláusula de cookies de terceros',
    espera: 'ninguna frase dice que terceros colocan',
    muta: ({ dist }) => {
      const ruta = join(dist, 'privacidad/index.html');
      // Se quitan las dos frases que divulgaban que terceros colocan o leen
      // cookies. Quitar sólo una no basta: la otra seguiría cumplen la regla.
      const html = readFileSync(ruta, 'utf8')
        .replace('terceros —incluido Google— podrán colocar y leer cookies', 'Google podrá colocar y leer cookies')
        .replace('actuarán como terceros y podrán usar cookies', 'usará cookies');
      writeFileSync(ruta, html);
    },
  },
  {
    nombre: 'la privacidad sin el enlace a la página de partners de Google',
    espera: 'ningún enlace a la página de partners',
    muta: ({ dist }) => {
      const ruta = join(dist, 'privacidad/index.html');
      const html = readFileSync(ruta, 'utf8').replace(/https:\/\/policies\.google\.com\/technologies\/partner-sites/g, 'https://example.com');
      writeFileSync(ruta, html);
    },
  },
  {
    nombre: 'ads.txt sin el pub-ID',
    espera: 'ads.txt no declara ningún pub-ID',
    muta: ({ dist }) => {
      writeFileSync(join(dist, 'ads.txt'), '# sin pub-ID\n');
    },
  },
  {
    nombre: 'la meta con un pub-ID distinto del de ads.txt',
    espera: 'la meta dice',
    muta: ({ dist }) => {
      const ruta = join(dist, 'index.html');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace(/pub-\d+/, 'pub-0000000000000000'));
    },
  },
  {
    nombre: 'la etiqueta de AdSense quitada de la portada',
    espera: 'falta la etiqueta de AdSense',
    muta: ({ dist }) => {
      const ruta = join(dist, 'index.html');
      const html = readFileSync(ruta, 'utf8').replace(/<script[^>]*adsbygoogle\.js[^>]*><\/script>/i, '');
      writeFileSync(ruta, html);
    },
  },
  {
    nombre: 'un parámetro de Consent Mode v2 sin denegar',
    espera: 'falta ad_personalization',
    muta: ({ dist }) => {
      const ruta = join(dist, 'index.html');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace("ad_personalization: 'denied'", "ad_personalization: 'granted'"));
    },
  },
  {
    nombre: 'la etiqueta de AdSense antes del consentimiento',
    espera: 'se carga antes del consentimiento',
    muta: ({ dist }) => {
      const ruta = join(dist, 'index.html');
      const html = readFileSync(ruta, 'utf8');
      const consent = html.match(/<script>\s*window\.dataLayer[\s\S]*?<\/script>/)?.[0] ?? '';
      const etiqueta = html.match(/<script[^>]*adsbygoogle\.js[^>]*><\/script>/i)?.[0] ?? '';
      // Se quita el bloque de consentimiento y se vuelve a poner **después**
      // de la etiqueta. No basta con intercambiarlos: entre los dos hay un
      // comentario, así que no son contiguos.
      writeFileSync(ruta, html.replace(consent, '').replace(etiqueta, `${etiqueta}\n${consent}`));
    },
  },
  {
    nombre: 'una página sin enlace a la política de privacidad',
    espera: 'no enlaza a la política de privacidad',
    muta: ({ dist }) => {
      const ruta = join(dist, 'taller/index.html');
      writeFileSync(ruta, readFileSync(ruta, 'utf8').replace(/href="\/privacidad"/g, 'href="/otra-cosa"'));
    },
  },
];

let pruebas = 0;
for (const mutacion of MUTACIONES) {
  const temporal = mkdtempSync(join(tmpdir(), 'revision-selftest-'));
  try {
    const distCopia = join(temporal, 'dist');
    cpSync(distReal, distCopia, { recursive: true });
    const entorno = { DIST_DIR: distCopia };

    if (mutacion.usaSrc) {
      const srcCopia = join(temporal, 'src');
      cpSync(srcReal, srcCopia, { recursive: true });
      entorno.SRC_DIR = srcCopia;
      mutacion.muta({ dist: distCopia, src: srcCopia });
    } else {
      mutacion.muta({ dist: distCopia });
    }

    let salida = '';
    let codigo = 0;
    try {
      salida = execFileSync(process.execPath, ['--experimental-strip-types', script], { env: { ...process.env, ...entorno }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (error) {
      codigo = error.status ?? 1;
      salida = `${error.stdout ?? ''}${error.stderr ?? ''}`;
    }

    assert.equal(codigo, 1, `«${mutacion.nombre}»: el script pasó con código 0. No lo detectó.`);
    assert.ok(
      salida.includes(mutacion.espera),
      `«${mutacion.nombre}»: el script falló, pero el mensaje no menciona «${mutacion.espera}».\n${salida}`,
    );
    pruebas++;
    console.log(`OK se ve fallar: ${mutacion.nombre}`);
  } finally {
    rmSync(temporal, { recursive: true, force: true });
  }
}

/** La última prueba: sin romper nada, el script tiene que pasar. */
{
  const temporal = mkdtempSync(join(tmpdir(), 'revision-selftest-'));
  try {
    const distCopia = join(temporal, 'dist');
    cpSync(distReal, distCopia, { recursive: true });
    execFileSync(process.execPath, ['--experimental-strip-types', script], { env: { ...process.env, DIST_DIR: distCopia }, encoding: 'utf8' });
    pruebas++;
    console.log('OK sin romper nada, el script pasa');
  } finally {
    rmSync(temporal, { recursive: true, force: true });
  }
}

console.log(`AUTOCOMPROBACIÓN: ${pruebas}/${pruebas} mutaciones detectadas.`);
