/**
 * Comprobaciones de la wiki: `/wiki`, `/wiki/:slug` y el pie del sitio.
 *
 * ## Por qué un script y no pruebas unitarias
 *
 * Porque el proyecto no tiene runner de pruebas, y porque casi todo lo que se
 * comprueba aquí **no existe hasta que hay un navegador**: el ancho de la línea de
 * lectura depende del shell, el realce de la tabla depende del desplazamiento, y
 * `prefers-reduced-motion` sólo se puede preguntar al navegador. Una prueba
 * unitaria del renderizador daría verde con el ancho de línea mal, que es
 * justamente el fallo que interesa cazar.
 *
 * Lo que sí se mide aquí con números, se mide con números: el ancho de línea se
 * calcula contra el ancho real de un carácter de la fuente en pantalla, no contra
 * `ch` ni contra una suposición.
 *
 * ## Qué NO se comprueba aquí
 *
 * Que los artículos sean correctos. Eso es del revisor del pipeline
 * (`wiki/reviews/`), y es una comprobación de contenido, no de interfaz. Este
 * script asume que el texto está bien y que lo que puede romperse es cómo se
 * pinta.
 *
 * Uso: npm run verify:wiki
 */

import { chromium } from 'playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { GCODE_FIXTURE } from './fixtures.mjs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173';

/** El artículo de prueba. Si algún día cambia de nombre, esto avisa en vez de fallar en silencio. */
/**
 * Todos los artículos, leídos del directorio de contenido.
 *
 * Se descubren en vez de escribirse porque una lista en el script es una lista que
 * se queda corta: con el primer artículo no había forma de que se olvidara, y con
 * el segundo `SLUG` seguía apuntando al primero y sus comprobaciones de estructura
 * no se ejecutaban contra él. Un artículo que nadie comprueba es un artículo que
 * se publica sin comprobar.
 */
const SLUGS = readdirSync(join(RAIZ, 'src/content/wiki'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));

/**
 * El artículo con el que se comprueba el comportamiento.
 *
 * El más largo, a propósito. Los bloques de scroll, de ancho de línea y de
 * animación se ejecutan **una vez**, en un artículo, porque abrir once un navegador
 * por artículo multiplicaría el tiempo por diez. Elegir el más largo es la elección
 * conservadora: es el que más secciones tiene, el que más se desplaza y el que más
 * veces dispara el espía de la tabla de contenidos. Un artículo corto pasa por los
 * mismos bloques con menos margen para fallar.
 */
const SLUG = SLUGS.reduce((largo, corto) => {
  const n = (s) => readFileSync(join(RAIZ, 'src/content/wiki', `${s}.md`), 'utf-8').length;
  return n(corto) > n(largo) ? corto : largo;
}, SLUGS[0]);

if (SLUGS.length === 0) {
  console.error('No hay artículos en src/content/wiki/. No hay nada que verificar.');
  process.exit(1);
}

/**
 * Los cinco anchos.
 *
 * No son los 29 de `barrido.mjs`: aquellos miden el visor 3D, que aquí no
 * existe. Estos cinco cubren las cuatro etapas del layout más el punto en el que
 * la línea de lectura es la más ancha, que es donde el reparto en dos columnas se
 * activa y donde el ancho de línea puede salirse del rango.
 */
const VIEWPORTS = [
  { nombre: '375x667 movil', ancho: 375, alto: 667 },
  { nombre: '640x360 el mas bajo', ancho: 640, alto: 360 },
  { nombre: '900x900 tableta', ancho: 900, alto: 900 },
  { nombre: '1200x800 el corte', ancho: 1200, alto: 800 },
  { nombre: '1440x900 el mas ancho', ancho: 1440, alto: 900 },
];

/**
 * El rango de caracteres por línea.
 *
 * Los 45 de abajo vienen de la guideline, y el 75 de arriba de lo que se midió:
 * a 9,47px por carácter con este cuerpo, 75 son 710px, y por encima de eso la
 * línea se hace difícil de volver al principio con el cursor.
 *
 * El móvil está excluido a propósito, y con el motivo anotado: a 375px de pantalla
 * la caja central mide 335px, que son 35 caracteres, y subir el cuerpo hasta
 * completar 45 dejaría un solo artículo por pantalla. No es un descuido del
 * diseño, es la aritmética de una pantalla estrecha. Lo que sí se comprueba en
 * móvil es que **no haya recorte**, que es el fallo de verdad.
 */
const CARACTERES_MIN = 45;
const CARACTERES_MAX = 75;

/**
 * Los anchos donde el rango de caracteres no se aplica, y por qué.
 *
 * Se comparan por nombre en vez de declarar una lista aparte porque la condición
 * ya está escrita en el bucle: duplicarla en dos sitios es una forma segura de
 * que se queden desincronizadas sin que ninguna de las dos avise.
 */
const PREFIJO_ESTRECHO = '375x667';

/**
 * Qué campos de los dos contratos de datos son opcionales, leído del propio
 * `src/services/types.ts` y no escrito aquí.
 *
 * La lista se deriva a propósito. Copiarla en este script haría que añadir un
 * campo opcional a `ProjectMetadata` dejara de exigir su sección sin que nada
 * fallara: el script seguiría leyendo su copia vieja y daría verde.
 *
 * No es un parser de TypeScript y no pretende serlo: busca la declaración de la
 * interfaz, se queda hasta su llave de cierre y lee los `nombre?:` de dos líneas
 * por encima. Si algún día el tipo se rompe de otra forma, el script avisa de que
 * no ha encontrado campos opcionales en vez de pasarlo por alto.
 */
function leerCamposOpcionales() {
  const fuente = readFileSync(join(RAIZ, 'src/services/types.ts'), 'utf-8');
  const opcionales = new Set();
  const lista = [];

  for (const interfaz of ['ProjectMetadata', 'JevClassification']) {
    const desde = fuente.indexOf(`export interface ${interfaz}`);
    if (desde === -1) continue;
    const cuerpo = fuente.slice(desde, fuente.indexOf('\n}', desde));
    for (const m of cuerpo.matchAll(/^ {2}(\w+)\?:/gm)) {
      opcionales.add(m[1]);
      lista.push(m[1]);
    }
  }

  return { tiene: (c) => opcionales.has(c), lista };
}

/**
 * Cuenta las tablas que declara un Markdown, con sus filas de cuerpo y sus celdas.
 *
 * Es una maquina de tres estados porque el formato de tabla de Markdown es
 * exactement eso: una cabecera, un separador, y un cuerpo que acaba en cuanto una
 * linea deja de empezar por barra vertical.
 *
 * Se cuenta **por bloque** y no en agregado por una razon concreta: un artículo con
 * dos tablas de distinto número de columnas tiene un total de celdas que no es
 * múltiplo del total de filas, y comprobar el agregado da un falso fallo con el
 * artículo perfectamente bien. Pasó con `temperatura-cama`: 4x3 mas 3x4 son 24
 * celdas en 7 filas, y una comprobacion de «celdas multiplo de filas» falla.
 */
function contarTablas(markdown) {
  const lineas = markdown.split('\n');
  const tablas = [];
  let i = 0;

  while (i < lineas.length) {
    const esFila = (l) => /^\s*\|/.test(l);
    const esSeparador = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l);
    const columnas = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').length;

    // Una tabla empieza en una cabecera seguida de un separador.
    if (!esFila(lineas[i]) || !esSeparador(lineas[i + 1] ?? '')) {
      i++;
      continue;
    }
    const ancho = columnas(lineas[i]);
    let filas = 0;
    let celdas = 0;
    i += 2; // cabecera y separador

    while (i < lineas.length && esFila(lineas[i]) && !esSeparador(lineas[i])) {
      filas++;
      celdas += columnas(lineas[i]);
      i++;
    }
    tablas.push({ ancho, filas, celdas });
  }
  return tablas;
}

/**
 * De la etiqueta que ve la persona al nombre del campo en el contrato de datos.
 *
 * El panel enseña «Peso total» y el tipo se llama `filamentWeight`, y no hay forma
 * de pasar de uno a otro sin un mapa: los rótulos son para las personas y los
 * nombres de campo son para el código, y no se parecen.
 */
const CAMPO_POR_FILA = {
  'Material': 'material',
  'Temp. hotend': 'hotendTemp',
  'Temp. cama': 'bedTemp',
  'Altura de capa': 'layerHeight',
  'Tiempo estimado': 'printTime',
  'Filamento': 'filamentUsed',
  'Peso total': 'filamentWeight',
  'Voladizos': 'hasOverhangs',
  'Ángulo máx.': 'overhangAngle',
  'Nivel de riesgo': 'riskLevel',
  'Riesgo de warping': 'warpingRisk',
  'Soportes': 'needsSupport',
};

const resultados = [];
let fallos = 0;

function comprobar(nombre, ok, detalle = '') {
  resultados.push({ nombre, ok, detalle });
  if (!ok) fallos++;
  console.log(`  ${ok ? 'OK   ' : 'FALLA'} ${nombre}${detalle ? `  ->  ${detalle}` : ''}`);
}

/**
 * Vuelve arriba de verdad, subiendo lo que de verdad se ha desplazado.
 *
 * `window.scrollTo(0, 0)` no basta y por eso esta función existe. Por debajo de
 * 1200px lo que se desplaza es el documento, así que `window` vale. A partir de
 * 1200px el shell es de altura fija y lo que se desplaza es `.canvas-area`, que
 * es un elemento interior con su propio `scrollTop`: subir la ventana deja el
 * artículo igual de abajo, y la prueba pasaba por casualidad en un ancho y
 * mentía en el otro.
 *
 * Se sube el documento y además el contenedor desplazable más cercano al
 * artículo, que es lo que sea en cada uno de los cinco anchos.
 */
async function irArriba(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    let e = document.querySelector('.wiki-texto')?.parentElement ?? null;
    while (e) {
      if (e.scrollHeight > e.clientHeight + 1) e.scrollTop = 0;
      e = e.parentElement;
    }
  });
  await page.waitForTimeout(500);
}

/** Abre una página con el tema oscuro, que es como se ve la aplicación. */
async function abrir(navegador, ancho, alto, ruta, opciones = {}) {
  const ctx = await navegador.newContext({
    viewport: { width: ancho, height: alto },
    colorScheme: 'dark',
    reducedMotion: opciones.reducedMotion ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  const errores = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errores.push(m.text());
  });
  page.on('pageerror', (e) => errores.push(String(e)));
  await page.goto(BASE + ruta, { waitUntil: 'networkidle' });
  return { ctx, page, errores };
}

const navegador = await chromium.launch();

try {
  // --- 1. El índice y la búsqueda ------------------------------------------
  console.log('\n=== El índice y la búsqueda ===\n');
  {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, '/wiki');

    const h1 = await page.evaluate(() => {
      const el = document.querySelector('.canvas-area h1');
      return { texto: el?.textContent ?? null, total: document.querySelectorAll('.canvas-area h1').length };
    });
    comprobar('el índice tiene exactamente un <h1>', h1.total === 1, `"${h1.texto}"`);
    comprobar('sin errores de consola en /wiki', errores.length === 0, errores[0] ?? '');

    const tarjetas = await page.locator('.wiki-tarjeta').count();
    comprobar('el índice lista los artículos', tarjetas > 0, `${tarjetas} tarjeta(s)`);

    // La búsqueda: escribe, comprueba que filtra y que NO hahubo navegación.
    const urlAntes = page.url();
    await page.fill('#wiki-buscar', 'warping');
    await page.waitForTimeout(250);
    const trasWarping = await page.locator('.wiki-tarjeta').count();
    const enlaceWarping = await page.locator('.wiki-tarjeta h2 a', { hasText: /warping/i }).count();

    comprobar('buscar «warping» deja al menos un artículo', trasWarping > 0, `${trasWarping} resultado(s)`);
    comprobar('el resultado de «warping» es el artículo de warping', enlaceWarping === 1);
    comprobar('la búsqueda no ha recargado', page.url() !== urlAntes || page.url().includes('q=warping'));
    comprobar('la búsqueda va en la URL, para poder compartirla', page.url().includes('q=warping'));

    // Un término que no existe.
    await page.fill('#wiki-buscar', 'zzzqqq');
    await page.waitForTimeout(250);
    const cero = await page.locator('.wiki-tarjeta').count();
    const vacio = await page.locator('.wiki-vacio').count();
    comprobar('una búsqueda sin resultados lo dice', cero === 0 && vacio === 1);
    comprobar(
      'el contador de resultados se anuncia',
      (await page.locator('[role="status"][aria-live="polite"]').count()) > 0
    );

    // Sin acentos: quien busca «cama» no debería tener que escribir «cámara».
    await page.fill('#wiki-buscar', 'CAMÁ');
    await page.waitForTimeout(250);
    const sinAcentos = await page.locator('.wiki-tarjeta').count();
    comprobar('la búsqueda ignora mayúsculas y acentos', sinAcentos > 0, `${sinAcentos} resultado(s)`);

    // El filtro por campo del parser.
    await page.fill('#wiki-buscar', '');
    await page.waitForTimeout(200);
    const botonesCampo = await page.locator('.wiki-campos button').count();
    comprobar('el filtro por campo del panel ofrece algún campo', botonesCampo > 0, `${botonesCampo}`);

    await ctx.close();
  }

  // --- 2. Cada artículo -----------------------------------------------------
  console.log('\n=== Los artículos, uno por uno ===\n');
  for (const slug of SLUGS) {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, `/wiki/${slug}`);

    comprobar(`${slug}: sin errores de consola`, errores.length === 0, errores[0] ?? '');

    /*
     * Las filas y celdas esperadas se leen del Markdown, no se escriben aquí.
     *
     * Escribirlas habría puesto en el script el número de filas de un artículo
     * concreto, y con el segundo artículo la comprobación habría estado contando
     * filas de un artículo que ya no era el que se estaba mirando.
     *
     * El recuento lo hace `contarTablas()`, y el porqué de que cuente por bloque
     * está en su comentario. Resumen: la primera versión de estas comprobaciones
     * fallaba con este artículo, y el artículo estaba bien.
     */
    const markdown = readFileSync(join(RAIZ, 'src/content/wiki', `${slug}.md`), 'utf-8');
    const declaradas = contarTablas(markdown);
    const esperadoFilas = declaradas.reduce((s, x) => s + x.filas, 0);
    const esperadoCeldas = declaradas.reduce((s, x) => s + x.celdas, 0);

    const estructura = await page.evaluate(() => ({
      h1: document.querySelectorAll('.canvas-area h1').length,
      h1Texto: document.querySelector('.canvas-area h1')?.textContent ?? '',
      h2: document.querySelectorAll('.wiki-texto h2').length,
      h3: document.querySelectorAll('.wiki-texto h3').length,
      toc: document.querySelectorAll('.wiki-toc a').length,
      filas: document.querySelectorAll('.wiki-tabla tbody tr').length,
      celdas: document.querySelectorAll('.wiki-tabla tbody td').length,
      tablas: document.querySelectorAll('.wiki-tabla').length,
      fuentes: document.querySelectorAll('.wiki-fuentes a').length,
      pendientes: [...document.querySelectorAll('.wiki-pendiente')].map((e) => e.textContent),
      enlaces: [...document.querySelectorAll('.wiki-link')].map((e) => e.getAttribute('href')),
      codigoInyectado: document.querySelectorAll('.wiki-texto script').length,
    }));

    const fuentesMd = (markdown.match(/^  - https?:\/\//gm) ?? []).length;

    comprobar(`${slug}: un solo <h1>`, estructura.h1 === 1, `"${estructura.h1Texto.slice(0, 44)}"`);
    comprobar(`${slug}: el <h1> recibe el foco al entrar`, (await page.evaluate(() => document.activeElement?.tagName)) === 'H1');
    comprobar(`${slug}: hay secciones de segundo nivel`, estructura.h2 > 0, `${estructura.h2} h2 y ${estructura.h3} h3`);
    comprobar(
      `${slug}: la tabla de contenidos tiene un enlace por sección`,
      estructura.toc === estructura.h2 + estructura.h3,
      `${estructura.toc} enlaces para ${estructura.h2 + estructura.h3} secciones`
    );

    // Las tablas, contra lo que el fichero declara.
    comprobar(
      `${slug}: las tablas se pintan enteras`,
      estructura.tablas === declaradas.length &&
        estructura.filas === esperadoFilas &&
        estructura.celdas === esperadoCeldas,
      `pintadas ${estructura.tablas} / ${estructura.filas} / ${estructura.celdas}; ` +
        `declara ${declaradas.length} (${declaradas.map((x) => `${x.ancho}x${x.filas}`).join(' + ')})`
    );

    // Las fuentes, contra el frontmatter.
    comprobar(
      `${slug}: las fuentes salen al pie y son las del frontmatter`,
      estructura.fuentes === fuentesMd && fuentesMd > 0,
      `${estructura.fuentes} pintadas, ${fuentesMd} declaradas`
    );

    comprobar(`${slug}: el HTML no inyecta etiquetas`, estructura.codigoInyectado === 0);

    /*
     * Los enlaces cruzados. `[[slug]]` a una página que existe es un enlace; a una
     * que no, texto con marca. Lo que no puede haber es un `<a href>` apuntando a
     * un artículo inexistente, porque eso es un enlace roto en un artículo que ya
     * pasó revisión.
     */
    const roto = estructura.enlaces.filter((h) => !SLUGS.includes(h.replace('/wiki/', '')));
    comprobar(
      `${slug}: ningún enlace apunta a un artículo inexistente`,
      roto.length === 0,
      roto.length ? roto.join(' ') : `${estructura.enlaces.length} enlaces, ${estructura.pendientes.length} menciones de páginas pendientes`
    );
    comprobar(
      `${slug}: las páginas futuras se nombran como texto`,
      !estructura.pendientes.some((t) => /^https?:/.test(t)),
      `${estructura.pendientes.length} pendiente(s)`
    );

    // La tabla tiene desplazamiento horizontal propio, si hay tablas.
    const tablaOx = await page.evaluate(() => {
      const env = document.querySelector('.wiki-tabla-envoltura');
      return env ? getComputedStyle(env).overflowX : null;
    });
    if (estructura.tablas > 0) {
      comprobar(`${slug}: la tabla se desplaza en su propia caja`, tablaOx === 'auto', `overflow-x: ${tablaOx}`);
    }

    await ctx.close();
  }

  // --- 3. El realce de la sección activa ------------------------------------
  console.log('\n=== El realce al hacer scroll ===\n');
  {
    const { ctx, page } = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);
    await page.waitForTimeout(300);

    const inicial = await page.locator('.wiki-toc a[aria-current="location"]').textContent();
    comprobar('al entrar hay una sección marcada', Boolean(inicial), `"${inicial?.trim()}"`);

    /*
     * Al último encabezado, que es el más abajo del todo.
     *
     * El selector es `.wiki-toc ol > li:last-child > a` y **no** `.wiki-toc
     * a:last-child`. Este último casa con los doce enlaces, porque cada `<a>` es
     * el único hijo de su `<li>` y por tanto el último hijo de su padre; el
     * navegador devuelve el primero de ellos y la prueba baja al principio del
     * artículo, que es justo donde no hay nada que comprobar.
     */
    const ultimo = page.locator('.wiki-toc ol > li:last-child > a');
    const destino = await ultimo.getAttribute('href');
    const esperado = (await ultimo.textContent())?.trim();
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView(), destino);
    await page.waitForTimeout(500);

    const final = await page.locator('.wiki-toc a[aria-current="location"]').textContent();
    const marcada = await page.locator('.wiki-toc a[aria-current="location"]').count();
    comprobar('al bajar del todo, la marca se mueve con el lector', marcada === 1 && final?.trim() !== inicial?.trim(), `"${inicial?.trim()}" -> "${final?.trim()}"`);
    comprobar(
      'la marca coincide con el encabezado al que se ha ido',
      final?.trim() === esperado,
      `esperada "${esperado}", marcada "${final?.trim()}"`
    );

    /*
     * Y en sentido contrario, que es el caso que más se escapa: volver arriba tiene
     * que devolver la marca a la primera sección. Una lista que sólo sabe avanzar
     * parece correcta hasta que se vuelve.
     */
    await irArriba(page);
    const vuelto = await page.locator('.wiki-toc a[aria-current="location"]').textContent();
    comprobar('al volver arriba, la marca regresa a la primera sección', vuelto?.trim() === inicial?.trim(), `"${vuelto?.trim()}"`);

    // `aria-current` distinto de `page`: son dos cosas y se anuncian distinto.
    const tipo = await page.locator('.wiki-toc a[aria-current]').first().getAttribute('aria-current');
    comprobar('el realce usa `aria-current="location"`, no `page`', tipo === 'location', `aria-current="${tipo}"`);

    await ctx.close();
  }

  // --- 4. La barra de «dónde estoy» en el reparto apilado -------------------
  console.log('\n=== La barra de «dónde estoy» ===\n');
  {
    const { ctx, page } = await abrir(navegador, 900, 900, `/wiki/${SLUG}`);
    await page.waitForTimeout(300);

    const barra = page.locator('.wiki-donde');
    comprobar('la barra existe en el reparto apilado', (await barra.count()) === 1);

    const antesDeScroll = await barra.evaluate((e) => getComputedStyle(e).visibility);
    comprobar('con la tabla a la vista, la barra está oculta', antesDeScroll === 'hidden', `visibility: ${antesDeScroll}`);

    /*
     * La posición se mide **en el documento**, no en la ventana, y por una razón
     * concreta: la prueba hace un scroll hasta el final, así que la posición en la
     * ventana del texto cambia de todas formas. Comparar eso mide el scroll, no
     * la barra, y daría un fallo siempre. Lo que no puede cambiar es el sitio que
     * el texto ocupa dentro del documento.
     */
    const sitioEnElDocumento = () =>
      page.evaluate(() => {
        const r = document.querySelector('.wiki-texto').getBoundingClientRect();
        return Math.round(r.top + window.scrollY);
      });

    const sitioAntes = await sitioEnElDocumento();

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
      let e = document.querySelector('.wiki-texto')?.parentElement ?? null;
      while (e) {
        if (e.scrollHeight > e.clientHeight + 1) e.scrollTop = e.scrollHeight;
        e = e.parentElement;
      }
    });
    await page.waitForTimeout(500);

    const despues = await barra.evaluate((e) => getComputedStyle(e).visibility);
    comprobar('al irse la tabla, la barra se enciende', despues === 'visible', `visibility: ${despues}`);

    const texto = await barra.locator('.wiki-donde-titulo').textContent();
    comprobar('la barra nombra la sección actual', Boolean(texto?.trim()), `"${texto?.trim()}"`);

    const sitioDespues = await sitioEnElDocumento();
    comprobar(
      'la barra no empuja el texto al aparecer',
      sitioAntes === sitioDespues,
      `${sitioAntes}px -> ${sitioDespues}px dentro del documento`
    );

    await ctx.close();
  }

  // --- 5. La barra se apaga en el reparto en dos columnas -------------------
  console.log('\n=== La barra con la tabla al lado ===\n');
  {
    const { ctx, page } = await abrir(navegador, 1440, 900, `/wiki/${SLUG}`);
    await page.waitForTimeout(300);
    const reparto = await page.evaluate(() => {
      const cont = document.querySelector('.wiki-contenedor');
      const toc = document.querySelector('.wiki-toc');
      const barra = document.querySelector('.wiki-donde');
      return {
        columnas: getComputedStyle(cont).gridTemplateColumns,
        tocPegado: getComputedStyle(toc).position,
        barra: getComputedStyle(barra).display,
      };
    });
    comprobar('a 1440px la tabla va en su propia columna', reparto.columnas.split(' ').length === 2, reparto.columnas);
    comprobar('a 1440px la tabla queda fija', reparto.tocPegado === 'sticky', `position: ${reparto.tocPegado}`);
    comprobar('a 1440px la barra se apaga, porque sobra', reparto.barra === 'none', `display: ${reparto.barra}`);
    await ctx.close();
  }

  // --- 6. El ancho de la línea de lectura, medido --------------------------
  console.log('\n=== El ancho de la línea de lectura ===\n');
  {
    for (const vp of VIEWPORTS) {
      const { ctx, page } = await abrir(navegador, vp.ancho, vp.alto, `/wiki/${SLUG}`);
      await page.waitForTimeout(300);

      const m = await page.evaluate(() => {
        const t = document.querySelector('.wiki-texto');
        // El ancho de un carácter se mide con la fuente real en pantalla, no con
        // `ch` ni suponiendo: `ch` es el ancho del cero, y en Inter el cero es más
        // ancho que una letra media, así que usarlo daría un número optimista.
        const medidor = document.createElement('span');
        medidor.textContent = 'x'.repeat(100);
        medidor.style.cssText = 'position:absolute;visibility:hidden;font:inherit';
        t.appendChild(medidor);
        const porCaracter = medidor.getBoundingClientRect().width / 100;
        medidor.remove();

        const caja = t.getBoundingClientRect();
        const cont = document.querySelector('.wiki-contenedor');

        // ¿Se sale algo del viewport sin un contenedor que lo recorte?
        const sueltos = [];
        for (const e of document.querySelectorAll('body *')) {
          const b = e.getBoundingClientRect();
          if (!b.width || b.right <= window.innerWidth + 1) continue;
          let a = e.parentElement, recortado = false;
          while (a) {
            const ox = getComputedStyle(a).overflowX;
            if (ox === 'hidden' || ox === 'auto' || ox === 'scroll') { recortado = true; break; }
            a = a.parentElement;
          }
          if (!recortado) sueltos.push(e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]);
        }

        return {
          ancho: Math.round(caja.width),
          porCaracter,
          caracteres: Math.round(caja.width / porCaracter),
          desborda: caja.width > cont.getBoundingClientRect().width + 1,
          sueltos: sueltos.slice(0, 4),
        };
      });

      const estrecho = vp.nombre.startsWith(PREFIJO_ESTRECHO);
      comprobar(`${vp.nombre}: el texto no desborda su carril`, !m.desborda, `${m.ancho}px`);
      comprobar(
        `${vp.nombre}: nada se sale del viewport sin contenedor que lo recorte`,
        m.sueltos.length === 0,
        m.sueltos.join(', ')
      );

      if (estrecho) {
        // En móvil se dice el número y el motivo, en vez de fingir que el rango
        // se cumple. La caja son 335px: no hay más donde cortar.
        console.log(
          `  AVISO ${vp.nombre}: ${m.caracteres} caracteres por línea, por debajo de los ` +
            `${CARACTERES_MIN} del rango. La caja central mide 335px y el cuerpo es de ` +
            `16px; es aritmética de la pantalla, no del diseño.`
        );
      } else {
        comprobar(
          `${vp.nombre}: la línea está entre ${CARACTERES_MIN} y ${CARACTERES_MAX} caracteres`,
          m.caracteres >= CARACTERES_MIN && m.caracteres <= CARACTERES_MAX,
          `${m.caracteres} caracteres (${m.ancho}px a ${m.porCaracter.toFixed(2)}px/carácter)`
        );
      }
      await ctx.close();
    }
  }

  // --- 7. Las animaciones y prefers-reduced-motion -------------------------
  console.log('\n=== Las animaciones ===\n');
  {
    const con = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);
    await con.page.waitForTimeout(500);
    const animadas = await con.page.evaluate(() => ({
      entrada: getComputedStyle(document.querySelector('.wiki-contenedor')).animationDuration,
      animada: document.querySelector('.wiki-texto').classList.contains('wiki--animado'),
      titulo: getComputedStyle(document.querySelector('.wiki-texto h2')).opacity,
    }));
    comprobar('la entrada se anima', animadas.entrada !== '0s', `animation-duration: ${animadas.entrada}`);
    comprobar('la entrada dura menos de 300ms', parseFloat(animadas.entrada) < 0.3, `${animadas.entrada}`);
    comprobar('con movimiento, las secciones se revelan', animadas.animada === true);
    await con.ctx.close();

    const sin = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`, { reducedMotion: true });
    await sin.page.waitForTimeout(400);
    const quietas = await sin.page.evaluate(() => ({
      entrada: getComputedStyle(document.querySelector('.wiki-contenedor')).animationName,
      animada: document.querySelector('.wiki-texto').classList.contains('wiki--animado'),
      titulo: getComputedStyle(document.querySelector('.wiki-texto h2')).opacity,
      transicion: getComputedStyle(document.querySelector('.wiki-toc a')).transitionDuration,
    }));
    comprobar('sin movimiento, no hay animación de entrada', quietas.entrada === 'none', `animation-name: ${quietas.entrada}`);
    comprobar('sin movimiento, no se arma el revelado', quietas.animada === false);
    /*
     * Esta es la que de verdad importa. El estado inicial de las secciones es
     * visible y es JavaScript quien añade el estado oculto, para que un fallo de
     * JavaScript no deje un artículo en blanco. Con `prefers-reduced-motion` ni se
     * arma el revelado, así que lo que se mide aquí es que el texto **se ve**:
     */
    comprobar('sin movimiento, las secciones son visibles', quietas.titulo === '1', `opacity: ${quietas.titulo}`);
    await sin.ctx.close();
  }

  // --- 8. Una página que no existe -----------------------------------------
  console.log('\n=== Una página que no existe ===\n');
  {
    const { ctx, page } = await abrir(navegador, 1280, 800, '/wiki/no-existe-nada');
    const roto = await page.evaluate(() => ({
      h1: document.querySelectorAll('.canvas-area h1').length,
      texto: document.querySelector('.wiki-no-encontrado h1')?.textContent ?? '',
      enlaces: document.querySelectorAll('.wiki-no-encontrado a').length,
    }));
    comprobar('un slug inexistente da su propia pantalla con un <h1>', roto.h1 === 1, `"${roto.texto}"`);
    comprobar('y ofrece volver al índice', roto.enlaces >= 1);
    await ctx.close();
  }

  // --- 9. El pie del sitio y las tres páginas de AdSense --------------------
  console.log('\n=== El pie y las páginas de información ===\n');
  {
    const { ctx, page } = await abrir(navegador, 1280, 800, '/');
    const pie = await page.evaluate(() => {
      const f = document.querySelector('.site-footer');
      return {
        existe: Boolean(f),
        enlaces: [...(f?.querySelectorAll('a') ?? [])].map((a) => a.getAttribute('href')),
        hermanoDelShell: f?.nextElementSibling === null && f?.previousElementSibling?.classList.contains('app-container'),
        texto: f?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      };
    });
    comprobar('el pie existe', pie.existe);
    comprobar('el pie está fuera del shell, y no como cuarta fila', pie.hermanoDelShell === true);
    comprobar(
      'el pie lleva las tres páginas que la revisión de contenido exige',
      ['/acerca-de', '/contacto', '/privacidad'].every((r) => pie.enlaces.includes(r)),
      pie.enlaces.join(' ')
    );
    await ctx.close();

    // El pie no puede quedar debajo de la barra inferior fija en móvil.
    const movil = await abrir(navegador, 375, 667, '/');
    const tapado = await movil.page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => requestAnimationFrame(r));
      const nav = document.querySelector('.sidebar-left').getBoundingClientRect();
      // El **contenido** del pie, no su caja. La caja lleva 80px de relleno abajo
      // a propósito —60 son el hueco de la barra— así que su borde inferior
      // siempre queda por debajo de la barra y eso no es un fallo: es el
      // relleno haciendo su trabajo. Lo que no puede pasar es que un enlace quede
      // debajo.
      const enlaces = [...document.querySelectorAll('.site-footer a')];
      const tapados = enlaces.filter((a) => a.getBoundingClientRect().bottom > nav.top + 1);
      return {
        tapados: tapados.map((a) => a.textContent),
        navTop: Math.round(nav.top),
        ultimo: Math.round(Math.max(...enlaces.map((a) => a.getBoundingClientRect().bottom))),
      };
    });
    comprobar(
      'en móvil, la barra de navegación no tapa ningún enlace del pie',
      tapado.tapados.length === 0,
      tapado.tapados.length
        ? `tapados: ${tapado.tapados.join(', ')}`
        : `el último enlace acaba en ${tapado.ultimo}px, la barra empieza en ${tapado.navTop}px`
    );
    await movil.ctx.close();

    /*
     * La página de contacto tiene que tener un `mailto:` de verdad.
     *
     * Se comprueba y no se da por hecho porque su historia es la de un aviso
     *mintiendo: `CONTACTO` estuvo vacío a propósito y la página lo decía en
     * pantalla, lo cual era honesto pero dejaba la publicación bloqueada. Al poner
     * la dirección real, ese mismo `if/else` pasó a ser la cosa que podía volver a
     * mentir: si alguien vacía la constante, la página vuelve a anunciar que
     * no hay canal, y esta comprobación no se entera.
     *
     * Y se comprueba **el enlace**, no sólo que la dirección aparezca escrita: un
     * texto que parece un correo y no es un enlace es lo que falla una revisión de
     * contenido, porque se ve bien y no funciona.
     *
     * La primera versión de este bloque tenía cuatro comprobaciones y **dos no
     * podían fallar**. Una comparaba el texto del enlace con su `href`, así que con
     * `CONTACTO` vacío ambas cadenas eran cadenas vacías y pasaba: comprobaba que
     * `mailto:` era igual a `mailto:`. Otra buscaba el aviso de «canal sin
     * configurar», que ya no se puede escribir porque se fue el `if/else` entero: una
     * comprobación de algo que no puede aparecer es una comprobación muerta.
     *
     * Se comprobó vaciando `CONTACTO` a propósito y mirando cuáles caían. Éstas
     * son las que caen, y la cuarta es una guarda de futuro: hoy no puede fallar
     * porque no hay ningún correo en el repo, y ése es justo el motivo por el que
     * tiene que existir.
     */
    {
      const { ctx: c, page: p } = await abrir(navegador, 1280, 800, '/contacto');
      const contacto = await p.evaluate(() => {
        const enlaces = [...document.querySelectorAll('.wiki-info a[href^="mailto:"]')];
        return {
          mailto: enlaces.map((a) => a.getAttribute('href')),
          texto: enlaces.map((a) => a.textContent.trim()),
          visible: document.querySelector('.wiki-info')?.textContent ?? '',
        };
      });

      // La expresión regular exige algo antes y después de la arroba, así que un
      // `mailto:` a secas no la cuela.
      comprobar(
        '/contacto: hay un enlace «mailto:» con una dirección dentro',
        contacto.mailto.length === 1 && /^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contacto.mailto[0]),
        contacto.mailto.join(' ') || 'ninguno'
      );

      // La condición de longitud es la que faltaba en la versión anterior: sin
      // ella, dos cadenas vacías se comparan iguales y la comprobación pasa.
      comprobar(
        '/contacto: el texto del enlace es la dirección y no está vacío',
        contacto.texto.length === 1 &&
          contacto.texto[0].length > 0 &&
          `mailto:${contacto.texto[0]}` === contacto.mailto[0],
        `texto «${contacto.texto.join(' ')}» -> href «${contacto.mailto.join(' ')}»`
      );

      /*
       * La dirección se ve también como texto, sin depender del enlace.
       *
       * El `slice(7)` no es cosmético: sin él, un `mailto:` vacío deja la cadena
       * vacía, y `texto.includes('')` es siempre cierto. Esa comprobación pasaba con
       * la dirección en blanco, que es justo el caso que tenía que cazar.
       */
      const direccion = (contacto.mailto[0] ?? '').slice(7);
      comprobar(
        '/contacto: la dirección se lee en el texto de la página',
        direccion.length > 0 && contacto.visible.includes(direccion),
        direccion ? `«${direccion}» se lee en la página` : 'no hay dirección'
      );

      // Guarda de futuro, no estado: que nadie pegue un correo personal en la
      // página de un sitio que se va a monetizar.
      comprobar(
        '/contacto: el buzón es del dominio, no una dirección personal',
        !/@gmail\.com|@hotmail\.com|@outlook\.com|@yahoo\.com/.test(contacto.visible),
        'sin correo personal en la página'
      );
      await c.close();
    }

    /*
     * Y cada página existe, responde y tiene un solo <h1>.
     *
     * La palabra que se busca es la que sostiene la página, y la comparación no
     * distingue mayúsculas. Antes buscaba «contacto» y pasaba, pero por el motivo
     * equivocado: la palabra estaba dentro del aviso de «canal sin configurar» que
     * decía «falta por poner la dirección de contacto». Al quitar ese aviso, la
     * comprobación cayó — y tenía razón: llevaba tiempo comprobando la existencia
     * del aviso, no la del contenido. Es el mismo tipo de fallo que los otros tres
     * de esta fase: algo que parece comprobarse y en realidad no comprueba nada.
     *
     * De paso, cada página se busca por una palabra que va con ella: «la wiki»
     * para Acerca de, «Escríbenos» para Contacto, «Google AdSense» para Privacidad.
     */
    for (const [ruta, seccion] of [
      ['/acerca-de', 'la wiki'],
      ['/contacto', 'escríbenos'],
      ['/privacidad', 'Google AdSense'],
    ]) {
      const { ctx: c, page: p } = await abrir(navegador, 1280, 800, ruta);
      const info = await p.evaluate(() => {
        const art = document.querySelector('.wiki-info');
        return {
          h1: document.querySelectorAll('.canvas-area h1').length,
          h2: art?.querySelectorAll('h2').length ?? 0,
          texto: art?.textContent ?? '',
          alto: Math.round(art?.getBoundingClientRect().height ?? 0),
        };
      });
      comprobar(`${ruta}: un solo <h1> y varias secciones`, info.h1 === 1 && info.h2 >= 2, `${info.h1} h1, ${info.h2} h2`);
      comprobar(
        `${ruta}: el texto sostiene la página`,
        info.texto.toLowerCase().includes(seccion.toLowerCase()),
        `busca «${seccion}»`
      );
      await c.close();
    }

    // La privacidad tiene que nombrar a Google, decir que es un tercero y
    // enlazar a su política. Sin las tres, la revisión de contenido la rechaza.
    const priv = await abrir(navegador, 1280, 800, '/privacidad');
    const pol = await priv.page.evaluate(() => {
      const t = document.querySelector('.wiki-info').textContent;
      const enlaces = [...document.querySelectorAll('.wiki-info a')].map((a) => a.href);
      return {
        nombraGoogle: /Google/.test(t),
        tercero: /tercero/i.test(t),
        cookies: /cookie/i.test(t),
        politicaGoogle: enlaces.some((h) => h.startsWith('https://policies.google.com/')),
        consentimiento: enlaces.some((h) => h.startsWith('https://support.google.com/adsense')),
        hoyNoPublica: /no muestra publicidad|Todavía no hay/i.test(t),
      };
    });
    comprobar('la privacidad nombra a Google AdSense', pol.nombraGoogle);
    comprobar('la privacidad dice que es un tercero', pol.tercero);
    comprobar('la privacidad habla de cookies', pol.cookies);
    comprobar('la privacidad enlaza a la política de publicidad de Google', pol.politicaGoogle);
    comprobar('la privacidad enlaza a la ayuda de consentimiento de AdSense', pol.consentimiento);
    comprobar('la privacidad dice que hoy no hay publicidad', pol.hoyNoPublica);
    await priv.ctx.close();
  }

  // --- 11. El enlace del panel, con dato y sin dato ------------------------
  console.log('\n=== El enlace del panel a la wiki ===\n');
  {
    /*
     * El panel con un G-code cargado, porque es la única forma de ver los enlaces
     * en su sitio. El fixture deja dos campos opcionales sin dato —`Peso total` y
     * `Ángulo máx.`—, y eso es lo que permite comprobar la regla de la segunda
     * decisión sin tener que inventar un G-code: **el enlace no depende del
     * valor**.
     *
     * Ahora mismo los dos campos atados —`warpingRisk` y `riskLevel`— son
     * obligatorios, así que el caso del enlace con «—» se comprueba en vacío, y
     * esto lo deja escrito: en cuanto haya artículo para `filamentUsed`,
     * `filamentWeight`, `hasOverhangs` u `overhangAngle`, la comprobación empieza a
     * mirar de verdad. Si el enlace desapareciera al no haber dato, falla aquí el
     * primer día, no cuando alguien lo note.
     */
    const ctx = await navegador.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'dark',
    });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.setInputFiles('#file-upload', GCODE_FIXTURE);
    await page.waitForSelector('.file-info', { timeout: 30000 });
    await page.waitForTimeout(1200);

    const filas = await page.evaluate(() =>
      [...document.querySelectorAll('.panel-data-row')].map((f) => ({
        clave: f.querySelector('.panel-data-key')?.textContent.trim() ?? '',
        valor: f.querySelector('.panel-data-value')?.childNodes[0]?.textContent?.trim() ?? '',
        enlace: f.querySelector('.panel-explicar')?.getAttribute('href') ?? null,
      }))
    );

    /*
     * Cuáles filas **deben** tener enlace sale de `src/lib/wiki-campos.ts`, no de un
     * número escrito aquí.
     *
     * La primera versión de esta comprobación decía «desde los dos campos atados» y
     * contaba 2. Al añadir `bedTemp` a la tabla, sin tocar el script, dejó de pasar:
     * el artículo nuevo estaba bien enlazado y la comprobación contaba de más. Es el
     * mismo modo de fallo que las tablas por bloque, y por el mismo motivo: un
     * número escrito en el script describe el mundo de hoy y no el de mañana.
     */
    const conEnlace = filas.filter((f) => f.enlace);
    const atados = new Set(
      [...readFileSync(join(RAIZ, 'src/lib/wiki-campos.ts'), 'utf-8').matchAll(/^\s{2}(\w+):\s*\{/gm)].map(
        (m) => m[1]
      )
    );
    const esperadas = filas.filter((f) => atados.has(CAMPO_POR_FILA[f.clave]));
    const sinEnlace = esperadas.filter((f) => !f.enlace);

    comprobar(
      'el panel enlaza a su artículo desde todos los campos atados',
      esperadas.length > 0 && sinEnlace.length === 0 && conEnlace.length === esperadas.length,
      `enlazan ${conEnlace.length}: ${conEnlace.map((f) => `${f.clave} -> ${f.enlace}`).join(' · ')}` +
        (sinEnlace.length ? ` | SIN ENLACE: ${sinEnlace.map((f) => f.clave).join(', ')}` : '')
    );

    const sinDato = filas.filter((f) => f.valor === '—');
    comprobar(
      'el fixture deja campos opcionales sin dato, que es lo que hace falta para esta comprobación',
      sinDato.length >= 2,
      `«${sinDato.map((f) => f.clave).join('», «')}»`
    );

    // De los campos sin dato, los que tengan artículo tienen que enlazar igual.
    const enlaces = readFileSync(join(RAIZ, 'src/lib/wiki-campos.ts'), 'utf-8');
    const conArticulo = [...enlaces.matchAll(/^\s{2}(\w+):\s*\{\s*slug:/gm)].map((m) => m[1]);
    const sinDatoConArticulo = sinDato.filter((f) => conArticulo.includes(CAMPO_POR_FILA[f.clave]));
    comprobar(
      'un campo sin dato sigue enlazando a su artículo',
      sinDatoConArticulo.every((f) => f.enlace !== null),
      sinDatoConArticulo.length === 0
        ? `ninguno de los campos sin dato («${sinDato.map((f) => f.clave).join('», «')}») tiene artículo todavía; en cuanto tenga uno, esta comprobación deja de estar en vacío`
        : sinDatoConArticulo.map((f) => `${f.clave}: ${f.enlace ?? 'SIN ENLACE'}`).join(' · ')
    );

    // El enlace tiene que ser alcanzable y visible, no sólo estar en el DOM.
    const enlace = page.locator('.panel-explicar').first();
    comprobar('el enlace del panel es alcanzable con teclado', (await enlace.evaluate((e) => e.tabIndex >= 0)) === true);
    const foco = await enlace.evaluate((e) => {
      e.focus();
      const s = getComputedStyle(e);
      return { trazo: s.outlineWidth, visible: e === document.activeElement };
    });
    comprobar(
      'el enlace del panel muestra foco visible',
      foco.visible && foco.trazo !== '0px',
      `outline-width: ${foco.trazo}`
    );

    await ctx.close();
  }

  // --- 10. La tabla campo -> artículo, contra los artículos de verdad -------
  console.log('\n=== La tabla de campos atados a artículos ===\n');
  {
    /*
     * `src/lib/wiki-campos.ts` está a mano y es un segundo sitio que puede
     * desfasarse. Se comprueba contra el frontmatter real de los artículos, que es
     * donde vive la verdad.
     *
     * Y la dirección de la comprobación es deliberada: **cada campo apunta a un
     * artículo**, no «cada artículo tiene un campo». Son dos reglas distintas:
     *
     *   - Un artículo puede cubrir varios campos. `warping-pla` cubre `riskLevel` y
     *     `warpingRisk`, que son el mismo dato en dos versiones. Que el panel
     *     enlace desde dos sitios al mismo artículo no es duplicación.
     *   - Un campo no puede apuntar a dos artículos. Ahí sí hay ambigüedad y el
     *     panel no sabría a cuál mandar. Como la tabla es un `Record`, una clave
     *     repetida con dos slugs no da error: JavaScript se queda con la última en
     *     silencio. De ahí que se compruebe sobre el texto.
     */
    const fuente = readFileSync(join(RAIZ, 'src/lib/wiki-campos.ts'), 'utf-8');
    const entradas = [...fuente.matchAll(/^\s{2}(\w+):\s*\{\s*slug:\s*'([^']+)'/gm)].map((m) => ({
      campo: m[1],
      slug: m[2],
    }));
    comprobar('la tabla de campos tiene entradas', entradas.length > 0, `${entradas.length}`);

    // Un mismo campo, dos slugs: el `Record` se tragaría el duplicado sin avisar.
    const porCampo = new Map();
    for (const e of entradas) {
      if (!porCampo.has(e.campo)) porCampo.set(e.campo, new Set());
      porCampo.get(e.campo).add(e.slug);
    }
    const ambiguos = [...porCampo.entries()].filter(([, slugs]) => slugs.size > 1);
    comprobar(
      'ningún campo apunta a dos artículos distintos',
      ambiguos.length === 0,
      ambiguos.length ? ambiguos.map(([c, s]) => `${c} -> ${[...s].join(' y ')}`).join('; ') : `${entradas.length} campos, un artículo cada uno`
    );

    // Y al revés: que ningún campo quede apuntando a un artículo que no exista o
    // que no lo declare.
    const opcionales = leerCamposOpcionales();
    for (const { campo, slug } of entradas) {
      const ruta = join(RAIZ, 'src/content/wiki', `${slug}.md`);
      let declarado = false;
      let detalle = 'el fichero no existe';
      try {
        const texto = readFileSync(ruta, 'utf-8');
        const linea = texto.match(/^campo:\s*\[(.*)\]/m);
        declarado = Boolean(linea && linea[1].split(',').map((s) => s.trim()).includes(campo));
        detalle = declarado
          ? `${campo} -> ${slug}, declarado en el frontmatter`
          : `el artículo existe pero no declara «campo: ${campo}»`;
      } catch {
        declarado = false;
      }
      comprobar(`«${campo}» apunta a un artículo que existe y lo declara`, declarado, detalle);

      /*
       * La sección que exige la segunda decisión, y sólo cuando el campo es
       * opcional.
       *
       * Un artículo atado a un campo obligatorio —`material`, `printTime`, y los
       * tres de `JevClassification`— no la necesita: el slicer siempre escribe
       * esos, así que no hay caso «no me lo ha dado» que contestar. Y en un campo
       * opcional, esa sección es el contenido que explica por qué el panel de
       * quien lo lee acaba de pintar «—», que es material real y es la mitad de lo
       * que esta wiki sabe y una genérica no.
       *
       * `warping-pla` **no** pasa por aquí: `warpingRisk` y `riskLevel` son
       * obligatorios en `JevClassification`.
       */
      if (declarado && opcionales.tiene(campo)) {
        const cuerpo = readFileSync(ruta, 'utf-8');
        const titulos = [...cuerpo.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]);
        const tieneSeccion = titulos.some(
          (h) => /por qué/i.test(h) && /slicer|dato/i.test(h)
        );
        comprobar(
          `«${campo}» es opcional, así que su artículo explica por qué puede faltar`,
          tieneSeccion,
          tieneSeccion
            ? `«${titulos.find((h) => /por qué/i.test(h) && /slicer|dato/i.test(h))}»`
            : `secciones presentes: ${titulos.slice(0, 4).join(' · ')}`
        );
      }
    }

    const articulos = readdirSync(join(RAIZ, 'src/content/wiki')).filter((f) => f.endsWith('.md'));
    comprobar('hay artículos escritos y al menos un campo atado', entradas.length > 0 && articulos.length > 0, `${articulos.length} artículo(s)`);
    comprobar(
      'la lista de campos opcionales se ha podido leer de types.ts',
      opcionales.lista.length > 0,
      `${opcionales.lista.length} opcionales: ${opcionales.lista.join(', ')}`
    );
  }
} finally {
  await navegador.close();
}

console.log('');
const total = resultados.length;
const pasan = total - fallos;
console.log(`${pasan}/${total} comprobaciones pasan`);
if (fallos > 0) {
  console.log(`\nFALLAN ${fallos}:`);
  for (const r of resultados.filter((x) => !x.ok)) console.log(`  - ${r.nombre}${r.detalle ? `  ->  ${r.detalle}` : ''}`);
  process.exit(1);
}
console.log('TODAS LAS COMPROBACIONES PASAN');
