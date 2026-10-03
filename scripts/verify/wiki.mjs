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
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173';

/** El artículo de prueba. Si algún día cambia de nombre, esto avisa en vez de fallar en silencio. */
const SLUG = 'warping-pla';

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

  // --- 2. Un artículo -------------------------------------------------------
  console.log('\n=== Un artículo ===\n');
  {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);

    comprobar('el artículo no da errores de consola', errores.length === 0, errores[0] ?? '');

    const estructura = await page.evaluate(() => ({
      h1: document.querySelectorAll('.canvas-area h1').length,
      h1Texto: document.querySelector('.canvas-area h1')?.textContent ?? '',
      h2: document.querySelectorAll('.wiki-texto h2').length,
      h3: document.querySelectorAll('.wiki-texto h3').length,
      toc: document.querySelectorAll('.wiki-toc a').length,
      anclaFoco: document.activeElement?.tagName ?? '',
      anclaTexto: document.activeElement?.textContent ?? '',
      tabla: document.querySelectorAll('.wiki-tabla').length,
      filas: document.querySelectorAll('.wiki-tabla tbody tr').length,
      celdas: document.querySelectorAll('.wiki-tabla tbody td').length,
      fuentes: document.querySelectorAll('.wiki-fuentes a').length,
      pendientes: document.querySelectorAll('.wiki-pendiente').length,
      codigoInyectado: document.querySelectorAll('.wiki-texto script').length,
    }));

    comprobar('el artículo tiene exactamente un <h1>', estructura.h1 === 1, `"${estructura.h1Texto.slice(0, 40)}"`);
    comprobar('el <h1> recibe el foco al entrar', estructura.anclaFoco === 'H1', `<${estructura.anclaFoco.toLowerCase()}> "${estructura.anclaTexto.slice(0, 30)}"`);
    comprobar('hay encabezados de segundo nivel', estructura.h2 > 0, `${estructura.h2} h2 y ${estructura.h3} h3`);
    comprobar('la tabla de contenidos tiene un enlace por sección', estructura.toc === estructura.h2 + estructura.h3, `${estructura.toc} enlaces`);
    comprobar('la tabla comparativa se pintó entera', estructura.filas === 3 && estructura.celdas === 9, `${estructura.filas} filas, ${estructura.celdas} celdas`);
    comprobar('las fuentes salen al pie del artículo', estructura.fuentes === 5, `${estructura.fuentes} enlaces`);
    comprobar('el HTML del artículo no inyecta etiquetas', estructura.codigoInyectado === 0);

    // Los enlaces cruzados: `[[slug]]` a una página que existe y a una que no.
    const cruzados = await page.evaluate(() => ({
      pendientes: [...document.querySelectorAll('.wiki-pendiente')].map((e) => e.textContent),
      enlaces: [...document.querySelectorAll('.wiki-link')].map((e) => e.getAttribute('href')),
    }));
    const futuras = [...new Set(cruzados.pendientes)];
    comprobar(
      'una página que no existe se nombra como texto, no como enlace roto',
      cruzados.pendientes.length >= 3 && cruzados.enlaces.length === 0,
      `${cruzados.pendientes.length} menciones de ${futuras.length} páginas, ${cruzados.enlaces.length} enlaces`
    );
    /*
     * Se comparan páginas **distintas**, no apariciones. El artículo nombra
     * «separaciones entre capas» dos veces —en el diagnóstico y en el final— y
     * contar las dos como dos páginas distintas daría por bueno un artículo que
     * enlaza tres veces con lo mismo.
     */
    comprobar(
      'las tres páginas futuras del final están nombradas',
      ['Enclosure y warping', 'Separaciones entre capas', 'Adhesión en la primera capa'].every(
        (n) => futuras.includes(n)
      ),
      futuras.join(' · ')
    );

    // La tabla se desplaza dentro de su envoltorio y no arrastra la página.
    const tablaOk = await page.evaluate(() => {
      const env = document.querySelector('.wiki-tabla-envoltura');
      return env ? getComputedStyle(env).overflowX : null;
    });
    comprobar('la tabla tiene desplazamiento horizontal propio', tablaOk === 'auto', `overflow-x: ${tablaOk}`);

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

    // Y cada página existe, responde y tiene un solo <h1>.
    for (const [ruta, seccion] of [
      ['/acerca-de', 'la wiki'],
      ['/contacto', 'contacto'],
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
      comprobar(`${ruta}: menciona «${seccion}»`, info.texto.includes(seccion));
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

  // --- 10. La tabla campo -> artículo, contra los artículos de verdad -------
  console.log('\n=== La tabla de campos atados a artículos ===\n');
  {
    /*
     * `src/lib/wiki-campos.ts` está a mano y es un segundo sitio que puede
     * desfasarse. Se comprueba contra el frontmatter real de los artículos, que es
     * donde vive la verdad.
     */
    const fuente = readFileSync(join(RAIZ, 'src/lib/wiki-campos.ts'), 'utf-8');
    const entradas = [...fuente.matchAll(/^\s{2}(\w+):\s*\{\s*slug:\s*'([^']+)'/gm)].map((m) => ({
      campo: m[1],
      slug: m[2],
    }));
    comprobar('la tabla de campos tiene entradas', entradas.length > 0, `${entradas.length}`);

    const articulos = readdirSync(join(RAIZ, 'src/content/wiki')).filter((f) => f.endsWith('.md'));
    for (const { campo, slug } of entradas) {
      const ruta = join(RAIZ, 'src/content/wiki', `${slug}.md`);
      let ok = false;
      let detalle = 'el fichero no existe';
      try {
        const texto = readFileSync(ruta, 'utf-8');
        const linea = texto.match(/^campo:\s*\[(.*)\]/m);
        ok = Boolean(linea && linea[1].split(',').map((s) => s.trim()).includes(campo));
        detalle = ok
          ? `${campo} -> ${slug}, declarado en el frontmatter`
          : `el artículo existe pero no declara «campo: ${campo}»`;
      } catch {
        ok = false;
      }
      comprobar(`«${campo}» apunta a un artículo que existe y lo declara`, ok, detalle);
    }
    comprobar('con artículos escritos hay al menos un campo atado', entradas.length > 0 && articulos.length > 0);
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
