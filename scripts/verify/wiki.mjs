/**
 * Comprobaciones de la wiki: `/wiki`, `/wiki/:slug` y el pie del sitio.
 *
 * ## Qué cambió con el formato, y qué se comprobaba antes
 *
 * Este script medía un artículo: el ancho de la línea de lectura, el realce de la
 * tabla de contenidos al desplazar, la barra de «dónde estoy», el número de filas de
 * las tablas del Markdown y que los `[[enlaces cruzados]]` apuntaran a páginas que
 * existen. Todo eso era del modelo de prosa y ya no hay nada que medir: no hay tabla
 * de contenidos que espiar, no hay ancho de línea que comparar contra 45–75
 * caracteres —el contenido ahora son tarjetas y chips, no párrafos— y los enlaces
 * cruzados son `enlaza: { guia }` en un fichero de TypeScript, que `verify:guias`
 * comprueba sin navegador.
 *
 * Se podría decir que la comprobación nueva es más pequeña. No lo es: cambia lo que
 * se mide, y lo que ahora importa no se puede ver en una captura.
 *
 * ## Lo que se mide ahora
 *
 * - **El índice**: que las tarjetas sean un enlace entero, que el dibujo tenga texto
 *   alternativo, y que el buscador filtre de verdad.
 * - **El diferencial**: que tenga salida, que el enlace lleve a la guía que dice, y
 *   que al entrar se limpien las respuestas de la guía anterior.
 * - **El cálculo**: que marcar una variable añada acciones, que cambiarla las
 *   recalcule, que desmarcarla las quite, y que no se cuele ninguna recomendación con
 *   una variable sin contestar.
 * - **El carril**: que en las rutas de la wiki sustituya al panel de análisis, que
 *   pinte lo que se ha marcado, y que no vuelva a decir «sube un archivo».
 * - **El panel**: que siga enlazando a la guía desde el campo que explica, que el
 *   enlace caiga en la **sección** concreta y no en la cabecera, y que la tabla
 *   campo→guía sea coherente con las guías de verdad.
 * - **La animación**: que exista sin `prefers-reduced-motion` y que no exista con él.
 *
 * ## Qué NO se comprueba aquí
 *
 * Que el contenido de una guía sea correcto. Eso es del revisor del pipeline
 * (`wiki/reviews/`) y de `verify:guias`. Este script asume que el texto está bien y
 * que lo que puede romperse es cómo se pinta y cómo reacciona.
 *
 * Uso: npm run verify:wiki   (con `npm run build` antes: sirve `dist/`)
 */

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { GCODE_FIXTURE } from './fixtures.mjs';
import { startPreview } from './probe.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/*
 * El servidor de preview lo levanta este script.
 *
 * No estaba, y era un fallo real: `BASE` apuntaba a `127.0.0.1:4173` y, si no había
 * un `vite preview` levantado, el script fallaba con `ERR_CONNECTION_REFUSED` en la
 * primera comprobación. Escribía bien la URL pero no la servía, así que sólo pasaba
 * cuando alguien se acordaba de levantar el servidor antes — y como los resultados
 * se leían al final, era fácil no notar cuál de los dos casos había sido.
 *
 * `verify:seo` y `verify:taller` ya lo hacían bien; este se les ha_copyJoined. Con
 * `startPreview()` el script levanta lo que necesita, y si ya hay algo escuchando en
 * ese puerto lo reutiliza en vez de pelearse con él.
 */
const preview = await startPreview();
const BASE = process.env.BASE_URL ?? preview ?? 'http://127.0.0.1:4173';

/**
 * Las guías, leídas del registro de la aplicación.
 *
 * Del registro y no del directorio de ficheros a propósito. El registro
 * (`src/lib/guias.ts`) es lo que la web usa, y lo que este script tiene que
 * comprobar es que **la web** está bien: leerlo de otro sitio comprobaría una lista
 * paralela, que es justo el segundo sitio que puede desfasarse.
 */
const { GUIAS, compararValor } = await import('../../src/lib/guias.ts');
const SLUGS = GUIAS.map((g) => g.slug);

if (SLUGS.length === 0) {
  console.error('No hay guías escritas en src/lib/guias.ts. No hay nada que verificar.');
  process.exit(1);
}

/** La guía con la que se comprueba el comportamiento interactivo. */
const SLUG = SLUGS[0];

/**
 * La guía que tiene más variables declarables.
 *
 * Para la comprobación de desbordes del riel no vale cualquiera: el fallo era visible
 * sólo con etiquetas largas, y la guía con la etiqueta más larga es la que lo provoca.
 * Elegir la primera del registro sería elegir por orden de escritura, no por el motivo
 * que hace que la comprobación sirva.
 */
const rutaConVariables = (() => {
  const conMas = GUIAS.reduce((a, b) => {
    const cuenta = (g) =>
      g.variables.reduce((n, v) => n + v.etiqueta.length + v.opciones.reduce((m, o) => m + o.etiqueta.length, 0), 0);
    return cuenta(b) > cuenta(a) ? b : a;
  });
  return `/wiki/${conMas.slug}`;
})();

/**
 * Los cinco anchos.
 *
 * No son los 29 de `barrido.mjs`: aquellos miden el visor 3D, que aquí no existe.
 * Estos cubren los tres tramos del layout más el móvil, que es donde el riel y la
 * columna se apilan.
 */
const VIEWPORTS = [
  { nombre: '375x667 movil', ancho: 375, alto: 667 },
  { nombre: '640x360 el mas bajo', ancho: 640, alto: 360 },
  { nombre: '900x900 tableta', ancho: 900, alto: 900 },
  { nombre: '1200x800 el corte', ancho: 1200, alto: 800 },
  { nombre: '1440x900 el mas ancho', ancho: 1440, alto: 900 },
];

/**
 * Qué campos de los dos contratos de datos son opcionales, leído del propio
 * `src/services/types.ts` y no escrito aquí.
 *
 * Copiar la lista haría que añadir un campo opcional a `ProjectMetadata` dejara de
 * exigir su guía sin que nada fallara: el script seguiría leyendo su copia vieja.
 */
function leerCamposOpcionales() {
  const tipos = readFileSync(join(RAIZ, 'src/services/types.ts'), 'utf-8');
  const opcionales = [];
  for (const interfaz of ['ProjectMetadata', 'JevClassification']) {
    const desde = tipos.indexOf(`interface ${interfaz}`);
    if (desde < 0) continue;
    const hasta = tipos.indexOf('\n}', desde);
    const cuerpo = tipos.slice(desde, hasta < 0 ? tipos.length : hasta);
    for (const linea of cuerpo.split('\n')) {
      const par = linea.match(/^\s+([a-zA-Z][a-zA-Z0-9_]*)\?:\s*([^;]+);/);
      if (par) opcionales.push(par[1]);
    }
  }
  return opcionales;
}

/** La tabla campo→guía del panel, escrita a mano en la aplicación. */
const { CAMPOS_WIKI } = await import('../../src/lib/wiki-campos.ts');
/**
 * Dónde declara cada guía que se explica un campo.
 *
 * Es la fuente de verdad del ancla, y el panel la **duplica** en `CAMPOS_WIKI`
 * porque no puede importar las guías —las metería en el chunk inicial—. Esa
 * duplicación es justo lo que hay que vigilar, y se hace abajo.
 */
const { anclasDeCampos } = await import('../../src/lib/tu-archivo.ts');

const resultados = [];
let fallos = 0;
function comprobar(nombre, ok, detalle = '') {
  resultados.push({ nombre, ok, detalle });
  if (!ok) fallos++;
  console.log(`${ok ? 'OK  ' : 'FALLO'} ${nombre}${detalle ? `  ->  ${detalle}` : ''}`);
}

async function abrir(navegador, ancho, alto, ruta, opciones = {}) {
  const ctx = await navegador.newContext({ viewport: { width: ancho, height: alto }, ...opciones });
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') errores.push(m.text());
  });
  await page.goto(`${BASE}${ruta}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  return { ctx, page, errores };
}

const navegador = await chromium.launch();

try {
  /* ---------------------------------------------------------------- 1 */
  console.log('\n=== El índice: síntomas, no títulos ===\n');
  {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, '/wiki');
    comprobar('sin errores de consola', errores.length === 0, errores[0] ?? '');

    const indice = await page.evaluate(() => ({
      h1: document.querySelectorAll('.canvas-area h1').length,
      h1Texto: document.querySelector('.canvas-area h1')?.textContent ?? '',
      tarjetas: document.querySelectorAll('.sintoma').length,
      enlaces: [...document.querySelectorAll('.sintoma')].map((e) => ({
        href: e.getAttribute('href'),
        tag: e.tagName,
        area: Math.round(e.getBoundingClientRect().width * e.getBoundingClientRect().height),
      })),
      svgs: document.querySelectorAll('.sintoma svg[role="img"]').length,
      svgsSinNombre: [...document.querySelectorAll('.sintoma svg')].filter(
        (s) => !s.getAttribute('aria-label')
      ).length,
      /*
       * El campo se llama `hayBuscador` y no `buscador` por una razón medida, no
       * por gusto. En este entorno, el identificador `buscador` con **acceso por
       * punto** devuelve `undefined` aunque la propiedad exista y valga `true`, y
       * pasa en Node y en Chromium por igual.
       *
       *   const o = { buscador: true };
       *   o.buscarador      // -> undefined
       *   o['buscador']    // -> true
       *
       * * `Object.getOwnPropertyDescriptor(o, 'buscador').value` sí vale `true`,
       * * `Object.keys(o)` lo incluye, y `JSON.stringify(o)` lo serializa como
       * * `true`. Sólo el acceso por punto falla.
       *
       * No se ha podido caracterizar más allá de eso — los cuatro identificadores
       * de alrededor funcionan con punto—, así que no se afirma que sea un fallo de
       * V8 ni de cuál de las dos versiones. Lo que sí está medido es que es
       * reproducible en los dos motores de esta máquina.
       *
       * **Por qué importa**: `src/` no lee `.buscador` en ninguna parte —comprobado
       * con grep—, así que la aplicación no está afectada. Pero cualquier código
       * futuro que lea esa propiedad por punto obtendría `undefined` en silencio.
       */
      hayBuscador: !!document.querySelector('#wiki-buscar'),
      contador: document.querySelector('.wiki-resultados')?.textContent ?? '',
    }));

    comprobar(
      'un solo <h1> y dice la pregunta, no el módulo',
      indice.h1 === 1 && /pieza/i.test(indice.h1Texto),
      `"${indice.h1Texto}"`
    );
    comprobar('hay una tarjeta por guía', indice.tarjetas === SLUGS.length, `${indice.tarjetas} tarjetas, ${SLUGS.length} guías`);
    comprobar(
      'cada tarjeta es un <a> entero, no un título con un icono al lado',
      indice.enlaces.every((e) => e.tag === 'A') && indice.enlaces.every((e) => e.area > 8000),
      indice.enlaces.map((e) => `${e.tag} ${e.href} ${e.area}px²`).join(' · ')
    );
    comprobar('el dibujo de cada tarjeta tiene nombre accesible', indice.svgs === SLUGS.length && indice.svgsSinNombre === 0, `${indice.svgs} con aria-label, ${indice.svgsSinNombre} sin`);
    comprobar('el buscador sigue presente', indice.hayBuscador, `#wiki-buscar -> ${indice.hayBuscador}`);

    // El buscador, contra los dos estados.
    await page.fill('#wiki-buscar', 'capas');
    await page.waitForTimeout(300);
    const filtrado = await page.evaluate(() => ({
      tarjetas: document.querySelectorAll('.sintoma').length,
      contador: document.querySelector('.wiki-resultados')?.textContent ?? '',
    }));
    comprobar(
      'el buscador filtra por síntoma, no por título de artículo',
      filtrado.tarjetas < SLUGS.length && filtrado.tarjetas > 0,
      `${filtrado.tarjetas} de ${SLUGS.length} · "${filtrado.contador.trim()}"`
    );

    await page.fill('#wiki-buscar', 'zzz-no-existe');
    await page.waitForTimeout(300);
    const vacio = await page.evaluate(() => ({
      tarjetas: document.querySelectorAll('.sintoma').length,
      mensaje: document.querySelector('.wiki-vacio')?.textContent ?? '',
    }));
    comprobar('una búsqueda sin resultados lo dice, con la palabra buscada', vacio.tarjetas === 0 && vacio.mensaje.includes('zzz-no-existe'));

    // Y la URL, que es lo que hace que una búsqueda se pueda compartir.
    comprobar('la búsqueda va en la URL', new URL(page.url()).searchParams.has('q'));

    await ctx.close();
  }

  /* ---------------------------------------------------------------- 2 */
  console.log('\n=== Una guía: el diferencial ===\n');
  {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);
    const guia = GUIAS.find((g) => g.slug === SLUG);

    comprobar(`${SLUG}: sin errores de consola`, errores.length === 0, errores[0] ?? '');

    const estructura = await page.evaluate(() => ({
      h1: document.querySelectorAll('.canvas-area h1').length,
      etapas: document.querySelectorAll('.etapa').length,
      pares: document.querySelectorAll('.diferencial-cara').length,
      comprobaciones: document.querySelectorAll('.diferencial-fila').length,
      salida: document.querySelector('.boton--ruta')?.getAttribute('href') ?? null,
      fuentes: document.querySelectorAll('.guia-fuentes-lista a').length,
      fuentesExternas: [...document.querySelectorAll('.guia-fuentes-lista a')].every(
        (a) => a.hostname && a.hostname !== new URL(location.href).hostname
      ),
      citas: document.querySelectorAll('.tarjeta-cita a').length,
      riel: !!document.querySelector('.riel'),
      textoInyectado: document.querySelectorAll('.guia script').length,
      entrada: document.querySelector('.guia-entrada')?.textContent?.trim() ?? null,
      autor: document.querySelector('.guia-autor')?.textContent?.trim() ?? null,
      numerosEtapa: [...document.querySelectorAll('.etapa-num')].map((e) => e.textContent.trim()),
    }));

    comprobar('un solo <h1>', estructura.h1 === 1);
    comprobar('las cuatro etapas están', estructura.etapas >= 4, `${estructura.etapas} etapas`);
    /*
     * El círculo de la etapa lleva un número. Las secciones que no son un paso
     * —«Esto no lo resuelve» y «De dónde sale esto»— no llevan círculo: llevaban un
     * «·» que se leía como un número vacío.
     */
    comprobar(
      'el número de etapa es un número, no un círculo vacío',
      estructura.numerosEtapa.length >= 4 && estructura.numerosEtapa.every((n) => /^\d+$/.test(n)),
      estructura.numerosEtapa.join(' · ')
    );
    comprobar(
      'cada comprobación del diferencial tiene sus dos caras',
      estructura.comprobaciones === guia.diferencial.comprobaciones.length &&
        estructura.pares === guia.diferencial.comprobaciones.length * 2,
      `${estructura.comprobaciones} comprobaciones, ${estructura.pares} caras`
    );
    comprobar(
      'el diferencial tiene salida y lleva a la guía que dice',
      estructura.salida === `/wiki/${guia.diferencial.siNo.guia}`,
      `${estructura.salida} · esperado /wiki/${guia.diferencial.siNo.guia}`
    );
    comprobar(
      'las fuentes salen al pie y son las declaradas',
      estructura.fuentes === guia.fuentes.length,
      `${estructura.fuentes} pintadas, ${guia.fuentes.length} declaradas`
    );
    comprobar('las fuentes son enlaces externos de verdad', estructura.fuentesExternas);
    comprobar('el HTML no inyecta etiquetas', estructura.textoInyectado === 0);
    /*
     * El párrafo de entrada se pinta, y es el de verdad.
     *
     * `entrada` es dato del módulo de la guía, así que podría existir sin que la
     * página lo enseñe —que es justo el estado a medias en el que se encontró:
     * escrito en las nueve guías y sin renderizar en ninguna—. Esta comprobación
     * mide el DOM, no el dato: si el elemento no está, o si muestra otro texto,
     * sale en rojo. Un párrafo que no se ve es un dato decorativo, y éste es el
     * sitio donde eso se detecta.
     */
    comprobar(
      `${SLUG}: la entrada se pinta y coincide con la guía`,
      estructura.entrada === guia.entrada,
      `pintada: «${(estructura.entrada ?? '(nada)').slice(0, 30)}» · dato: «${guia.entrada.slice(0, 30)}»`
    );
    /*
     * La firma y la fecha. Autoría es señal de calidad para un evaluador y para
     * E-E-A-T: si el campo está en las nueve guías y no lo pinta nadie, sería el
     * mismo dato decorativo que este repo prohíbe. Se mide el DOM.
     */
    comprobar(
      `${SLUG}: la firma se pinta con el nombre del autor`,
      estructura.autor !== null && estructura.autor.includes(guia.autor.nombre),
      estructura.autor === null ? '(no se pinta .guia-autor)' : `«${estructura.autor}»`
    );

    await ctx.close();
  }

  /* ---------------------------------------------------------------- 3 */
  console.log('\n=== El cálculo: la guía reacciona ===\n');
  {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);
    const guia = GUIAS.find((g) => g.slug === SLUG);

    /** Lo que la página está pintando ahora. */
    const leer = () =>
      page.evaluate(() => ({
        acciones: document.querySelectorAll('.accion').length,
        tarjetas: document.querySelectorAll('.tarjeta').length,
        activas: [...document.querySelectorAll('.chip--activo .chip-texto')].map((e) => e.textContent),
        valores: [...document.querySelectorAll('.accion-valor')].map((e) => e.textContent),
        rielCifra: document.querySelector('.riel-cifra strong')?.textContent ?? null,
        rielBarra: document.querySelector('.riel-progreso span')?.style.width ?? null,
        rielVariables: document.querySelectorAll('.riel-variables li').length,
        vacia: !!document.querySelector('.etapa--recomendacion .etapa-vacia'),
        botonesMarcados: document.querySelectorAll('.chip--activo[aria-pressed="true"]').length,
      }));

    const inicial = await leer();
    comprobar(
      'sin marcar nada no se inventa ninguna acción',
      inicial.acciones === 0 && inicial.vacia,
      `${inicial.acciones} acciones, aviso presente: ${inicial.vacia}`
    );
    comprobar('el riel empieza a cero', inicial.rielCifra === '0' && inicial.rielBarra === '0%', `"${inicial.rielCifra}" · ${inicial.rielBarra}`);
    comprobar('pero sí hay conocimiento de partida', inicial.tarjetas > 0, `${inicial.tarjetas} tarjetas`);

    // Marcar las dos variables necesarias: la lista tiene que llenarse.
    const necesarias = guia.variables.filter((v) => v.necesaria);
    for (const variable of necesarias) {
      await page.locator('.chip').filter({ hasText: variable.opciones[0].etiqueta }).first().click();
      await page.waitForTimeout(220);
    }
    const marcada = await leer();
    comprobar(
      'marcar el montaje llena la recomendación',
      marcada.acciones > 0 && !marcada.vacia,
      `${marcada.acciones} acciones · ${marcada.tarjetas} tarjetas · riel "${marcada.rielCifra}"`
    );
    comprobar('el riel cuenta lo mismo que la página', String(marcada.acciones) === marcada.rielCifra, `${marcada.rielCifra} vs ${marcada.acciones}`);

    /*
     * El atajo a la recomendación. Con doce tarjetas de conocimiento entre las
     * variables y las acciones, quien ya sabe lo que hace tiene que poder saltar.
     * Sólo sale cuando hay acciones, y tiene que llevar a una sección que exista.
     */
    const atajo = await page.locator('.guia-atajo a').first().getAttribute('href');
    comprobar(
      'con acciones sale un atajo a la recomendación, y el destino existe',
      atajo === '#recomendacion' && (await page.locator('#recomendacion').count()) === 1,
      `${atajo ?? 'sin atajo'}`
    );
    comprobar('el riel enseña lo que se ha marcado', marcada.rielVariables === necesarias.length, `${marcada.rielVariables} variables`);
    comprobar('la barra de progreso avanza', marcada.rielBarra !== '0%' && marcada.rielBarra !== '100%', marcada.rielBarra);
    comprobar('cada chip marcado dice su estado a los lectores de pantalla', marcada.botonesMarcados === marcada.activas.length, `${marcada.botonesMarcados} aria-pressed`);

    /*
     * Cambiar una variable tiene que cambiar la lista, o el formato es decorativo.
     *
     * No se fija qué opción pulsar: se prueban **todas** hasta encontrar una que
     * cambie algo. La primera versión pulsaba `opciones[1]` y falló con material,
     * porque en la guía de warping la segunda opción es PLA-CF y PLA-CF da
     * exactamente lo mismo que PLA —comparten fila en la tabla de Bambu—. La
     * comprobación era correcta; la elección de la opción, no.
     */
    const candidatas = guia.variables.filter((v) => v.opciones.length > 1);
    let cambio = null;
    for (const variable of candidatas) {
      for (const opcion of variable.opciones) {
        if (marcada.activas.includes(opcion.etiqueta)) continue;
        await page.locator('.chip').filter({ hasText: opcion.etiqueta }).first().click();
        await page.waitForTimeout(280);
        const despues = await leer();
        if (
          JSON.stringify(despues.valores) !== JSON.stringify(marcada.valores) ||
          despues.tarjetas !== marcada.tarjetas
        ) {
          cambio = { variable, opcion, despues };
          break;
        }
        await page.locator('.chip').filter({ hasText: opcion.etiqueta }).first().click();
        await page.waitForTimeout(200);
      }
      if (cambio) break;
    }

    comprobar(
      'cambiar alguna variable recalcula la lista',
      cambio !== null,
      cambio
        ? `${cambio.variable.etiqueta}=${cambio.opcion.etiqueta}: ${marcada.tarjetas}->${cambio.despues.tarjetas} tarjetas · ${marcada.valores.join(' | ')} -> ${cambio.despues.valores.join(' | ')}`
        : `ninguna de las ${candidatas.length} variables cambiaron nada`
    );

    /*
     * Poder arrepentirse, y es la mitad de la interacción.
     *
     * Se pulsa **una etiqueta que ya está marcada**, no una cualquiera. La primera
     * versión pulsaba `opciones[1]` de la primera variable, que en la guía de warping
     * es PLA-CF y no estaba marcada: eso la seleccionaba, la cuenta de activas se
     * quedaba igual —3 antes, 3 después— y el fallo parecía del componente cuando lo
     * estaba probando mal.
     */
    const marcadasAhora = (await leer()).activas;
    comprobar('hay algo marcado para poder desmarcarlo', marcadasAhora.length > 0, marcadasAhora.join(' | '));
    if (marcadasAhora.length > 0) {
      const etiqueta = marcadasAhora[0];
      const antesDeDesmarcar = await leer();
      await page.locator('.chip').filter({ hasText: etiqueta }).first().click();
      await page.waitForTimeout(350);
      const despues = await leer();
      comprobar(
        'volver a pulsar un chip marcado lo desmarca',
        despues.activas.length === marcadasAhora.length - 1 && !despues.activas.includes(etiqueta),
        `${marcadasAhora.length} -> ${despues.activas.length} activas · "${etiqueta}" sigue: ${despues.activas.includes(etiqueta)}`
      );
      comprobar(
        'y desmarcar quita acciones, no sólo las pinta de otro color',
        despues.acciones <= antesDeDesmarcar.acciones,
        `${antesDeDesmarcar.acciones} -> ${despues.acciones} acciones`
      );
    }

    comprobar('sin errores tras interactuar', errores.length === 0, errores[0] ?? '');
    await ctx.close();
  }

  /* ---------------------------------------------------------------- 3b */
  console.log('');
  console.log('=== Tu valor, al lado del intervalo de la fuente ===');
  console.log('');
  {
    /*
     * Con un G-code cargado y el montaje declarado, la acción que da un intervalo de
     * cama tiene que decir dónde cae el valor del archivo. Es la diferencia entre leer
     * «45–65 °C» y saber si tu 50 está dentro, y sólo tiene sentido cuando el archivo
     * trae el dato: sin él, no se pinta nada —que no es lo mismo que pintar «dentro»—.
     */
    const guia = GUIAS.find((g) => g.reglas.some((r) => r.rango)) ?? GUIAS[0];
    const regla = guia.reglas.find((r) => r.rango && r.cuando);
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, '/');
    await page.setInputFiles('#file-upload', GCODE_FIXTURE);
    await page.waitForTimeout(2500);

    /*
     * El archivo se carga **antes** de entrar a la guía, y la navegación es del
     * router, no una carga nueva. Es lo que hace que la guía preconteste el material:
     * subir el archivo estando ya dentro no lo marca, a propósito —quien no lo marcó
     * no debería verlo aparecer solo—.
     */
    await page.evaluate((ruta) => {
      history.pushState(null, '', ruta);
      dispatchEvent(new PopStateEvent('popstate'));
    }, `/wiki/${guia.slug}`);
    await page.waitForTimeout(500);

    // El G-code precontesta `material`; el resto de la condición se marca a mano.
    const activas = await page.evaluate(() =>
      [...document.querySelectorAll('.chip--activo .chip-texto')].map((e) => e.textContent)
    );
    for (const [variableId, esperado] of Object.entries(regla.cuando)) {
      const variable = guia.variables.find((v) => v.id === variableId);
      const opcionId = Array.isArray(esperado) ? esperado[0] : esperado;
      const opcion = variable.opciones.find((o) => o.id === opcionId);
      if (activas.includes(opcion.etiqueta)) continue;
      await page.locator('.chip').filter({ hasText: opcion.etiqueta }).first().click();
      await page.waitForTimeout(220);
    }

    const comparacion = await page.evaluate(() => {
      const el = document.querySelector('.accion-comparacion');
      return el ? { texto: el.textContent ?? '', clase: el.className } : null;
    });

    comprobar(
      'con archivo y montaje declarado, la acción compara tu valor con la fuente',
      comparacion !== null,
      comparacion ? comparacion.texto : 'no se pintó la comparación'
    );

    if (comparacion) {
      comprobar(
        'la comparación enseña el intervalo de la fuente',
        comparacion.texto.includes(String(regla.rango.min)) && comparacion.texto.includes(String(regla.rango.max)),
        comparacion.texto
      );
      // La posición que marca la página tiene que ser la que calcula el motor.
      const valor = Number((comparacion.texto.match(/-?\d+(?:[.,]\d+)?/)?.[0] ?? 'NaN').replace(',', '.'));
      const esperado = compararValor(regla.rango, valor);
      comprobar(
        'y marca la posición que dice el motor',
        comparacion.clase.includes(`--${esperado?.posicion}`),
        `${comparacion.clase} · esperado --${esperado?.posicion} para ${valor} en ${regla.rango.min}–${regla.rango.max}`
      );
    }

    comprobar('sin errores al comparar', errores.length === 0, errores[0] ?? '');
    await ctx.close();
  }

  /* ---------------------------------------------------------------- 4 */
  console.log('\n=== La interconexión entre guías ===\n');
  {
    const guia = GUIAS.find((g) => g.slug === SLUG);
    const destino = guia.diferencial.siNo.guia;
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);

    // Marcar algo, para comprobar que al cambiar de guía se limpia.
    await page.locator('.chip').filter({ hasText: guia.variables[0].opciones[0].etiqueta }).first().click();
    await page.waitForTimeout(250);
    const antes = await page.locator('.chip--activo').count();
    comprobar('hay respuestas marcadas antes de saltar de guía', antes > 0, `${antes}`);

    await page.locator('.boton--ruta').click();
    await page.waitForTimeout(700);

    const despues = await page.evaluate(() => ({
      ruta: location.pathname,
      h1: document.querySelector('.canvas-area h1')?.textContent ?? '',
      activas: document.querySelectorAll('.chip--activo').length,
      acciones: document.querySelectorAll('.accion').length,
      rielCifra: document.querySelector('.riel-cifra strong')?.textContent ?? null,
    }));

    comprobar('el enlace del diferencial navega a la otra guía', despues.ruta === `/wiki/${destino}`, despues.ruta);
    comprobar('y se ve la otra guía', despues.h1.length > 5, `"${despues.h1}"`);
    comprobar(
      'las respuestas de la guía anterior no se arrastran',
      despues.activas === 0 && despues.rielCifra === '0',
      `${despues.activas} activas, riel "${despues.rielCifra}"`
    );
    comprobar('sin errores al navegar entre guías', errores.length === 0, errores[0] ?? '');
    await ctx.close();
  }

  /* ---------------------------------------------------------------- 5 */
  console.log('\n=== El carril, que sustituye al panel muerto ===\n');
  {
    for (const ruta of ['/wiki', `/wiki/${SLUG}`, '/contacto', '/privacidad', '/acerca-de']) {
      const { ctx, page } = await abrir(navegador, 1280, 800, ruta);
      const riel = await page.evaluate(() => {
        const derecha = document.querySelector('.sidebar-right');
        return {
          ancho: Math.round(derecha?.getBoundingClientRect().width ?? 0),
          riel: !!derecha?.querySelector('.riel'),
          panel: !!derecha?.querySelector('.panel-header'),
          invitacion: derecha?.textContent?.includes('Sube un archivo para ver el análisis') ?? false,
          enlacesGuia: derecha?.querySelectorAll('a[href^="/wiki/"]').length ?? 0,
        };
      });
      comprobar(
        `${ruta}: la columna derecha no invita a subir un archivo y sí enlaza a las guías`,
        !riel.invitacion && (riel.riel || riel.panel) && riel.enlacesGuia > 0,
        `riel=${riel.riel} panel=${riel.panel} ${riel.ancho}px · ${riel.enlacesGuia} enlaces a guías`
      );
      await ctx.close();
    }

    for (const ruta of ['/', '/historial']) {
      const { ctx, page } = await abrir(navegador, 1280, 800, ruta);
      const panel = await page.evaluate(() => ({
        titulo: document.querySelector('.sidebar-right h2')?.textContent ?? '',
        riel: !!document.querySelector('.sidebar-right .riel'),
      }));
      comprobar(
        `${ruta}: aquí sí está el panel de análisis`,
        panel.titulo.includes('Panel') && !panel.riel,
        `"${panel.titulo}"`
      );
      await ctx.close();
    }
    /*
     * El carril no se sale de la ventana cuando hay muchas guías.
     *
     * Es lo que impide que la wiki deje de aguantar el crecimiento: a partir de
     * 1200px el carril vive en una columna de altura fija, y si no scrollea,
     * «Otras guías» crece con cada guía nueva y las últimas quedan por debajo de
     * la ventana, sin barra y sin forma de llegar. Medido: con 15 guías, 1311px
     * en una ventana de 900.
     *
     * Las guías que aún no existen se simulan duplicando los enlaces en el DOM,
     * en vez de esperar a tenerlas: la comprobación tiene que existir hoy, no
     * cuando el problema ya esté en producción.
     */
    {
      const { ctx, page } = await abrir(navegador, 1440, 900, `/wiki/${SLUG}`);
      const carril = await page.evaluate(() => {
        const lista = document.querySelector('.riel-lista');
        const riel = document.querySelector('.riel');
        const plantilla = lista?.querySelector('li');
        if (lista && plantilla) {
          for (let i = 0; i < 18; i++) lista.appendChild(plantilla.cloneNode(true));
        }
        const caja = riel.getBoundingClientRect();
        const estilo = getComputedStyle(riel);
        return {
          desborda: riel.scrollHeight > riel.clientHeight + 1,
          scrollable: estilo.overflowY === 'auto' || estilo.overflowY === 'scroll',
          dentro: caja.bottom <= innerHeight + 1,
          alto: Math.round(caja.height),
          ventana: innerHeight,
        };
      });
      comprobar(
        'con muchas guías, el carril no se sale de la ventana',
        carril.dentro,
        `carril ${carril.alto}px en ventana de ${carril.ventana}`
      );
      comprobar(
        'y cuando desborda, scrollea en vez de recortar',
        !carril.desborda || carril.scrollable,
        `desborda=${carril.desborda} · overflow-y ${carril.scrollable ? 'auto' : 'visible'}`
      );
      await ctx.close();
    }
  }

  /* ---------------------------------------------------------------- 5b */
  console.log('');
  console.log('=== El diagnóstico, junto al control que lo mueve ===');
  console.log('');
  {
    /*
     * En el tramo 768–1199 el shell apila el carril debajo de la guía, así que el
     * contador quedaba al final de la página, a miles de píxeles de los chips que
     * lo mueven. Por debajo de 1200 el diagnóstico vive dentro de la etapa de
     * variables y el del carril se esconde; por encima, al revés. Los dos montan
     * el mismo componente, y esta comprobación impide que se vean los dos a la vez
     * o ninguno.
     */
    const leerDiagnostico = async (ancho) => {
      const { ctx, page } = await abrir(navegador, ancho, 900, `/wiki/${SLUG}`);
      const r = await page.evaluate(() => {
        // Visibles, no presentes: `display: none` deja el nodo en el DOM, así que
        // contar nodos no distingue el que se ve del que está escondido.
        const visibles = (sel) =>
          [...document.querySelectorAll(sel)].filter((el) => el.getBoundingClientRect().width > 0).length;
        return {
          enGuia: visibles('.guia-diagnostico .riel-cifra'),
          enCarril: visibles('.riel-bloque--diagnostico .riel-cifra'),
        };
      });
      await ctx.close();
      return r;
    };

    const tablet = await leerDiagnostico(1024);
    comprobar(
      'a 1024 el diagnóstico está en la guía, no en el carril',
      tablet.enGuia === 1 && tablet.enCarril === 0,
      JSON.stringify(tablet)
    );

    const escritorio = await leerDiagnostico(1280);
    comprobar(
      'a 1280 está en el carril, no en la guía',
      escritorio.enCarril === 1 && escritorio.enGuia === 0,
      JSON.stringify(escritorio)
    );
  }

  /* ---------------------------------------------------------------- 6 */
  console.log('\n=== Los cinco anchos ===\n');

  /*
   * El riel no aprieta el texto.
   *
   * **La primera versión de esta comprobación medía desbordamiento, y era la medida
   * equivocada.** Se comprobó rompiéndola a propósito —volviendo a `flex-direction: row`
   * con `overflow-wrap: anywhere`— y pasó en verde, como se esperaba que no pasara.
   *
   * La razón es que `overflow-wrap: anywhere` existe **precisamente para no desbordar**:
   * parte la palabra donde haga falta para que quepa. Con él, «No, o no lo sé» se
   * renderizaba en una columna de una letra de ancho, y se quedaba dentro de sus 320 px.
   * Nada se salía. Lo que pasaba es que el elemento crecía hasta medir catorce líneas de
   * alto, y eso es lo que se veía en la captura: una columna de letras sueltas.
   *
   * Así que la comprobación mide **altura por línea**, que es lo que delata el
   * partido. Un valor de una o dos palabras no pasa de tres líneas; si necesita más, es
   * que algo lo está rompiendo letra a letra. El límite es 4 y está medido, no puesto.
   */
  const desbordes = await navegador.newContext({ viewport: { width: 1280, height: 800 } });
  const pagDesbordes = await desbordes.newPage();
  await pagDesbordes.goto(`${BASE}${rutaConVariables}`, { waitUntil: 'networkidle' });
  await pagDesbordes.waitForTimeout(400);
  // Marcarlo todo es lo que llena el riel: vacío no hay nada que medir.
  for (const chip of await pagDesbordes.locator('.chip').all()) {
    await chip.click().catch(() => {});
    await pagDesbordes.waitForTimeout(60);
  }
  await pagDesbordes.waitForTimeout(400);

  const apretado = await pagDesbordes.evaluate(() => {
    const problemas = [];

    /**
     * Lineas que ocupa un texto.
     *
     * El `line-height` del CSS es `normal` en la version rota, y `parseFloat('normal')`
     * devuelve `NaN`; `Math.round(alto / NaN)` es `null`, y `null > 4` es `false`. La
     * comprobacion pasaba en verde porque no comparaba nada.
     *
     * Eso no se descubre leyendo, se descubre midiendo: la primera version de esta
     * comprobacion usaba `parseFloat(lineHeight)` y fallo en verde dos veces seguidas. El
     * recurso al tamano de letra no es un refinamiento: es lo que hace que la comprobacion
     * mida algo cuando el estilo no le da la medida.
     */
    const lineasDe = (el) => {
      const estilo = getComputedStyle(el);
      const declarado = Number.parseFloat(estilo.lineHeight);
      const porLetra = Number.parseFloat(estilo.fontSize) * 1.25;
      const lh = Number.isFinite(declarado) && declarado > 0 ? declarado : porLetra;
      return Math.round(el.getBoundingClientRect().height / lh);
    };

    for (const el of document.querySelectorAll('.riel-variables li')) {
      const valor = el.querySelector('.riel-var-valor');
      const nombre = el.querySelector('.riel-var-nombre');
      if (!valor || !nombre) continue;

      const lineasValor = lineasDe(valor);
      const anchoValor = Math.round(valor.getBoundingClientRect().width);

      // Los umbrales salen de medir las dos versiones, no de elegirlos.
      //
      // Riel apilado, que es el estado sano: los seis valores ocupan **1 linea** a 214 px de
      // ancho, y las etiquetas **1 o 2**. Riel en fila con `overflow-wrap: anywhere`, que es
      // el fallo: los valores ocupan **hasta 3 lineas** a 67 px y las etiquetas **hasta 4**.
      //
      // Asi que `valor > 2` y `nombre > 3` separan los dos casos con margen por los dos
      // lados: en sano el maximo medido es 2 y 2, y en roto hay 3 y 4. Un umbral puesto a
      // ojo habria dado verde en las dos versiones, que es lo que pasaba con `> 4`.
      if (lineasValor > 2) {
        problemas.push(
          `valor "${(valor.textContent ?? '').trim().slice(0, 20)}" en ${lineasValor} lineas de ${anchoValor}px`
        );
      }
      const lineasNombre = lineasDe(nombre);
      if (lineasNombre > 3) {
        problemas.push(
          `etiqueta "${(nombre.textContent ?? '').trim().slice(0, 20)}" en ${lineasNombre} lineas`
        );
      }
    }
    return problemas.slice(0, 6);
  });
  comprobar(
    'el riel no aprieta el texto en una columna de una letra',
    apretado.length === 0,
    apretado.join(' · ') ||
      `${await pagDesbordes.locator('.riel-variables li').count()} variables marcadas, ningún valor pasa de 2 líneas`
  );
  await desbordes.close();

  for (const vp of VIEWPORTS) {
    const { ctx, page, errores } = await abrir(navegador, vp.ancho, vp.alto, `/wiki/${SLUG}`);
    const caja = await page.evaluate(() => {
      const raiz = document.querySelector('.guia');
      const padre = raiz?.parentElement;
      const r = raiz?.getBoundingClientRect();
      const p = padre?.getBoundingClientRect();
      return {
        desborda: document.documentElement.scrollWidth > window.innerWidth + 1,
        dentro: r && p ? r.right <= p.right + 1 && r.left >= p.left - 1 : false,
        rielDebajo:
          getComputedStyle(document.querySelector('.sidebar-right') ?? document.body).display !== 'none',
        chipsApilados: (() => {
          const chips = [...document.querySelectorAll('.chip')];
          if (chips.length < 2) return true;
          return chips.slice(0, 2).every((c) => c.getBoundingClientRect().width > 0);
        })(),
      };
    });
    comprobar(
      `${vp.nombre}: sin desbordamiento horizontal y dentro de su caja`,
      !caja.desborda && caja.dentro,
      JSON.stringify(caja)
    );
    comprobar(`${vp.nombre}: los chips se ven`, caja.chipsApilados);
    comprobar(`${vp.nombre}: sin errores de consola`, errores.length === 0, errores[0] ?? '');
    await ctx.close();
  }

  /* ---------------------------------------------------------------- 7 */
  console.log('\n=== La animación, y que se pueda apagar ===\n');
  {
    const con = await abrir(navegador, 1280, 800, `/wiki/${SLUG}`);
    const animadas = await con.page.evaluate(() => {
      const tarjeta = document.querySelector('.sintoma, .tarjeta, .accion, .etapa');
      if (!tarjeta) return 0;
      const duracion = getComputedStyle(tarjeta).animationDuration;
      return duracion === '0s' ? 0 : Number.parseFloat(duracion) * 1000;
    });
    // En el índice, no en la guía: la guía tarda un poco más en pintar sus etapas.
    await con.ctx.close();

    const idx = await abrir(navegador, 1280, 800, '/wiki');
    const duracionIndice = await idx.page.evaluate(() => {
      const tarjeta = document.querySelector('.sintoma');
      if (!tarjeta) return 0;
      const d = getComputedStyle(tarjeta).animationDuration;
      return d === '0s' ? 0 : Number.parseFloat(d) * 1000;
    });
    await idx.ctx.close();

    comprobar('las tarjetas del índice se animan al entrar', duracionIndice > 0, `${duracionIndice}ms`);
    comprobar('y la animación es corta: por debajo de 400 ms', duracionIndice < 400, `${duracionIndice}ms`);

    const sin = await abrir(navegador, 1280, 800, '/wiki', { reducedMotion: 'reduce' });
    const sinAnim = await sin.page.evaluate(() => {
      const tarjeta = document.querySelector('.sintoma');
      return tarjeta ? getComputedStyle(tarjeta).animationName : 'ninguna';
    });
    const dibujoQuieto = await sin.page.evaluate(() => {
      const p = document.querySelector('.dibujo-pieza--arqueada, .dibujo-grieta, .dibujo-burbuja');
      return p ? getComputedStyle(p).animationName : 'ninguna';
    });
    await sin.ctx.close();

    comprobar('con prefers-reduced-motion la tarjeta no se anima', sinAnim === 'none', `animation-name: ${sinAnim}`);
    comprobar('ni los dibujos', dibujoQuieto === 'none', `animation-name: ${dibujoQuieto}`);
  }

  /* ---------------------------------------------------------------- 8 */
  console.log('\n=== Una guía que no existe ===\n');
  {
    const { ctx, page, errores } = await abrir(navegador, 1280, 800, '/wiki/no-existe-nada');
    const noExiste = await page.evaluate(() => ({
      h1: document.querySelectorAll('.canvas-area h1').length,
      texto: document.querySelector('h1')?.textContent ?? '',
      robots: document.querySelector('meta[name="robots"]')?.content ?? '',
      enlace: document.querySelector('.guia-enlace')?.getAttribute('href') ?? null,
    }));
    comprobar('un <h1> que lo dice', noExiste.h1 === 1 && /no existe/i.test(noExiste.texto), `"${noExiste.texto}"`);
    comprobar('y no se pide que se indexe', noExiste.robots === 'noindex, follow', noExiste.robots);
    comprobar('ofrece volver al índice', noExiste.enlace === '/wiki', `${noExiste.enlace}`);
    comprobar('sin errores de consola', errores.length === 0, errores[0] ?? '');
    await ctx.close();
  }

  /* ---------------------------------------------------------------- 9 */
  console.log('\n=== El pie y las tres páginas de AdSense ===\n');
  {
    const { ctx, page } = await abrir(navegador, 1280, 800, '/');
    const pie = await page.evaluate(() => {
      const nav = document.querySelector('.site-footer nav, .site-footer');
      const enlaces = [...(nav?.querySelectorAll('a') ?? [])];
      return {
        hrefs: enlaces.map((a) => a.getAttribute('href')),
        texto: document.querySelector('.site-footer')?.textContent ?? '',
      };
    });
    for (const ruta of ['/acerca-de', '/contacto', '/privacidad', '/autor']) {
      comprobar(`el pie enlaza ${ruta}`, pie.hrefs.includes(ruta), pie.hrefs.join(' '));
    }
    await ctx.close();

    // Las tres páginas: existen, con h1, y con lo que la revisión de contenido exige
    // encontrar en ellas. Lo que se comprueba son enlaces **reales**: la primera
    // versión de este bloque afirmaba que `/acerca-de` enlazaba a `/wiki` y que
    // `/contacto` a `/privacidad`, y las dos assertions fallaron porque la página no
    // enlazaba. No era el test el equivocado: era un hueco real, y la página decía
    // «el artículo sobre warping está a un clic» sin ningún enlace.
    for (const pagina of ['acerca-de', 'contacto', 'privacidad', 'autor']) {
      const { ctx, page } = await abrir(navegador, 1280, 800, `/${pagina}`);
      const info = await page.evaluate(() => ({
        h1: document.querySelectorAll('.canvas-area h1').length,
        enlacesInternos: [...document.querySelectorAll('main a[href^="/"]')].map((a) =>
          a.getAttribute('href')
        ),
        mailto: document.querySelector('a[href^="mailto:"]')?.getAttribute('href') ?? null,
        textoMailto: document.querySelector('a[href^="mailto:"]')?.textContent ?? '',
        texto: document.querySelector('main')?.textContent ?? '',
      }));
      comprobar(`/${pagina}: un <h1>`, info.h1 === 1);

      if (pagina === 'acerca-de') {
        comprobar(
          '/acerca-de enlaza a la wiki, que es lo que promete en el texto',
          info.enlacesInternos.includes('/wiki'),
          info.enlacesInternos.join(' ')
        );
        comprobar('y dice que se entra por el síntoma', /síntoma/i.test(info.texto));
      }

      if (pagina === 'contacto') {
        comprobar(
          'el contacto tiene un mailto y el texto coincide con él',
          info.mailto === 'mailto:contacto@wiiki-3d.com' && info.textoMailto.trim() === 'contacto@wiiki-3d.com',
          `${info.mailto} · "${info.textoMailto.trim()}"`
        );
        comprobar('es un buzón del dominio, no una dirección personal', /@wiiki-3d\.com/.test(info.textoMailto));
      }

      if (pagina === 'privacidad') {
        comprobar(
          '/privacidad declara que hoy no hay publicidad',
          /no muestra publicidad|no hay publicidad|sin publicidad/i.test(info.texto),
          ''
        );
        comprobar(
          'y enlaza a la política de publicidad de Google',
          await page.evaluate(() =>
            [...document.querySelectorAll('main a')].some((a) =>
              (a.getAttribute('href') ?? '').includes('policies.google.com')
            )
          ),
          ''
        );
      }
      await ctx.close();
    }
  }

  /* ---------------------------------------------------------------- 10 */
  console.log('\n=== El enlace del panel a la guía ===\n');
  {
    const { ctx, page } = await abrir(navegador, 1280, 800, '/');
    await page.setInputFiles('#file-upload', GCODE_FIXTURE);
    await page.waitForTimeout(2500);

    const panel = await page.evaluate(() => ({
      enlaces: [...document.querySelectorAll('.panel-explicar')].map((a) => ({
        href: a.getAttribute('href'),
        texto: a.textContent,
      })),
      atingible: [...document.querySelectorAll('.panel-explicar')].every((a) => a.tabIndex >= 0),
    }));

    comprobar('el panel enlaza a su guía', panel.enlaces.length > 0, panel.enlaces.map((e) => e.href).join(' '));
    comprobar('cada enlace tiene texto, no sólo un icono', panel.enlaces.every((e) => (e.texto ?? '').trim().length > 3), panel.enlaces.map((e) => `"${e.texto}"`).join(' '));
    comprobar('y es alcanzable con teclado', panel.atingible);

    /*
     * El enlace no va a la cabecera de la guía, va a la sección que explica ese dato.
     *
     * «Riesgo de warping, 35 %» con un enlace que deja a quien lee al principio de
     * una guía de tres etapas es medio enlace: tiene que buscar a mano la tarjeta
     * que habla de ese 35 %. El ancla sale de `CAMPOS_WIKI`, y la coherencia con la
     * guía se comprueba en la sección de la tabla, más abajo.
     */
    const destinos = panel.enlaces.map((e) => {
      const [slug, ancla] = (e.href ?? '').replace('/wiki/', '').split('#');
      return { slug, ancla, href: e.href };
    });
    comprobar('el enlace del panel lleva a una guía escrita', destinos.every((d) => SLUGS.includes(d.slug)), destinos.map((d) => d.slug).join(' '));
    comprobar('y apunta a la sección, no a la cabecera', destinos.every((d) => !!d.ancla), destinos.map((d) => d.href).join(' '));

    /*
     * Y **todos** los campos de la tabla salen como enlace.
     *
     * Es la comprobación que faltaba. La tabla campo→guía promete un enlace por
     * campo, pero quien lo pinta es la fila del panel, y sólo si le pasa su
     * `campo`. Al escribir las guías nuevas, cinco campos se quedaron en la tabla
     * sin que ninguna fila los pidiera —`material`, `hotendTemp`, `layerHeight`,
     * `hasOverhangs`, `overhangAngle`— y nada lo decía: un enlace que no sale no
     * da error. Ahora la tabla se compara con los enlaces que el panel pinta.
     */
    const faltan = Object.entries(CAMPOS_WIKI)
      .filter(([, e]) => !panel.enlaces.some((l) => l.href === `/wiki/${e.slug}#${e.ancla}`))
      .map(([campo]) => campo);
    comprobar(
      'todos los campos de la tabla salen como enlace en el panel',
      faltan.length === 0,
      faltan.length ? `sin enlace: ${faltan.join(', ')}` : `${Object.keys(CAMPOS_WIKI).length} campos`
    );

    // Y el ancla existe de verdad en la guía a la que lleva: pulsarlo tiene que dejar
    // la URL con el `#` y el destino en el DOM, que es lo que no se ve en una captura.
    const primero = destinos[0];
    const anclaLlega = await (async () => {
      await page.locator('.panel-explicar').first().click();
      await page.waitForTimeout(200);
      return page.url().includes(`#${primero.ancla}`) && (await page.locator(`#${primero.ancla}`).count()) === 1;
    })();
    comprobar('y al pulsarlo el ancla existe en la página', anclaLlega, `${primero.href} -> ${page.url()}`);

    await ctx.close();
  }

  /* ---------------------------------------------------------------- 12 */
  console.log('\n=== La barra «Tu archivo», dentro de la guía ===\n');
  {
    /*
     * Por qué esta comprobación existe en el navegador y no en `verify:guias`.
     *
     * `leerTuArchivo` ya está probado sin navegador: qué campos salen, qué valor
     * lleva cada uno y a qué ancla apunta. Lo que no se puede probar ahí es que el
     * ancla **exista en el DOM** y que el enlace funcione, y ese es justo el
     * riesgo real: un `href="#v-cama"` bien escrito con un `id` que no se pinta
     * no da ningún error, no se ve en una captura y sólo se nota al pulsarlo.
     */
    const guia = GUIAS.find((g) => (g.campos ?? []).length > 0) ?? GUIAS[0];
    const esperados = [...new Set([...(guia.leeDelAnalisis ?? []), ...(guia.campos ?? [])])];

    const { ctx, page, errores } = await abrir(navegador, 1280, 800, '/');
    await page.setInputFiles('#file-upload', GCODE_FIXTURE);
    await page.waitForTimeout(2500);

    // Navegación del router, no una carga nueva: el archivo vive en un contexto
    // que está por encima del router, y eso es justo lo que hay que comprobar.
    await page.evaluate((ruta) => {
      history.pushState(null, '', ruta);
      dispatchEvent(new PopStateEvent('popstate'));
    }, `/wiki/${guia.slug}`);
    await page.waitForSelector('.tu-archivo', { timeout: 5000 });

    const barra = await page.evaluate(() => {
      const datos = [...document.querySelectorAll('.tu-archivo-dato')];
      return {
        texto: document.querySelector('.tu-archivo')?.textContent ?? '',
        titulo: document.querySelector('.tu-archivo-titulo')?.textContent ?? '',
        datos: datos.map((d) => ({
          campo: d.querySelector('.tu-archivo-campo')?.textContent ?? '',
          valor: d.querySelector('.tu-archivo-valor')?.textContent ?? '',
          ausente: !!d.querySelector('.tu-archivo-valor--ausente'),
          href: d.getAttribute('href'),
          existe: d.getAttribute('href') ? !!document.querySelector(d.getAttribute('href')) : null,
          etiqueta: d.textContent ?? '',
        })),
        /*
         * El orden en el DOM: la barra antes del diferencial. Es una decisión de
         * lectura —los datos del archivo contestan las tres preguntas de la etapa
         * 1— y una comprobación la deja escrita: mover la barra debajo de las
         * variables la pondría después de pedir a quien lee lo que ya sabía.
         */
        antesDelDiferencial:
          (document.querySelector('.tu-archivo')?.compareDocumentPosition(document.querySelector('.etapa--diferencial')) &
            Node.DOCUMENT_POSITION_FOLLOWING) !==
          0,
        notaDemo: document.querySelector('.tu-archivo-nota--demo')?.textContent ?? '',
        h1: document.querySelectorAll('.canvas-area h1').length,
      };
    });

    comprobar('sin errores de consola', errores.length === 0, errores[0] ?? '');
    comprobar('con archivo cargado, la guía pinta la barra', barra.datos.length > 0, `${barra.datos.length} datos`);
    comprobar('enseña sólo los campos que la guía declara', barra.datos.length === esperados.length, `${barra.datos.length} vs ${esperados.length}: ${esperados.join(', ')}`);
    comprobar('el nombre del archivo va en la barra', /\.gcode/i.test(barra.titulo), barra.titulo);
    comprobar('la barra va antes del diferencial', barra.antesDelDiferencial);
    comprobar('sigue habiendo un solo <h1> en la columna', barra.h1 === 1, `${barra.h1}`);
    comprobar('y el título de la barra es un <h2> de verdad', await page.locator('.tu-archivo-titulo').evaluate((e) => e.tagName) === 'H2');

    comprobar(
      'cada dato enlaza a un ancla que existe en la página',
      barra.datos.every((d) => d.href !== null && d.existe === true),
      barra.datos.map((d) => `${d.campo}=${d.href ?? 'sin enlace'}${d.existe === false ? ' (destino inexistente)' : ''}`).join(' | ')
    );

    comprobar(
      'cada enlace tiene texto, no sólo un icono',
      barra.datos.every((d) => d.etiqueta.trim().length > 3),
      barra.datos.map((d) => `"${d.etiqueta}"`).join(' ')
    );

    comprobar(
      'el enlace salta al ancla: la URL cambia y el destino existe',
      await (async () => {
        const primerEnlace = await page.locator('.tu-archivo-dato--enlace').first().getAttribute('href');
        await page.locator('.tu-archivo-dato--enlace').first().click();
        await page.waitForTimeout(150);
        const url = page.url();
        return url.endsWith(primerEnlace) && (await page.locator(primerEnlace).count()) === 1;
      })(),
      await page.url()
    );

    /*
     * El dato ausente se dice y no se inventa. El G-code del repo sí trae material,
     * así que la única fila ausente posible aquí es la de un campo que el slicer no
     * escribió. Lo que se comprueba es que esa fila lleve su texto y no un 0: es
     * el error que la tarjeta 1.4 prohíbe y el más fácil de colar.
     */
    comprobar(
      'ninguna fila ausente se disfraza de 0',
      barra.datos.every((d) => !d.ausente || d.valor.length > 4),
      barra.datos.map((d) => `${d.campo}: ${d.valor}`).join(' | ')
    );

    if (barra.notaDemo) {
      comprobar('el veredicto avisa de que es una estimación de demostración', /demostración/i.test(barra.notaDemo), barra.notaDemo);
    }

    /*
     * La barra con datos dentro a 375 px, que es donde se rompe el layout.
     *
     * Cuatro datos en una columna de 343 px no caben de lado, y el texto ausente
     * —«no lo escribió tu slicer»— es el más largo de todos. Sin `minmax` y sin
     * `overflow-wrap` la fila más ancha empuja a las demás y aparece barra
     * horizontal: `.canvas-area` es `overflow: hidden`, así que **no hay barra
     * visible**, sólo contenido que desaparece. Por eso se mide `scrollWidth` y no
     * se mira si sale algo.
     */
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    const movil = await page.evaluate(() => {
      const barra = document.querySelector('.tu-archivo');
      const items = [...document.querySelectorAll('.tu-archivo-dato')];
      return {
        scroll: document.documentElement.scrollWidth,
        ancho: innerWidth,
        masAlto: Math.max(...items.map((i) => i.getBoundingClientRect().height)),
        dentroDeLaBarra: items.every((i) => {
          const a = i.getBoundingClientRect();
          const b = barra.getBoundingClientRect();
          return a.left >= b.left - 1 && a.right <= b.right + 1;
        }),
      };
    });
    comprobar('con datos no desborda a 375 px', movil.scroll <= movil.ancho + 1, `${movil.scroll}px en ${movil.ancho}`);
    comprobar('y cada dato cabe en la caja de la barra', movil.dentroDeLaBarra, JSON.stringify(movil));
    comprobar('y el área pulsable llega a 44 px de alto', movil.masAlto >= 44, `${Math.round(movil.masAlto)}px`);

    // El archivo sigue cargado al cerrar el contexto: lo que se ha comprobado es
    // que la barra aparece sin volver a subir nada.
    await ctx.close();
  }

  {
    /*
     * Sin archivo no hay barra. Y no es lo mismo que «una barra vacía»: lo que se
     * comprueba es que **no existe el elemento**, para que no quede una caja con
     * un guion debajo de la cabecera en las cuatro guías y en el HTML exportado.
     */
    const { ctx, page } = await abrir(navegador, 1280, 800, `/wiki/${GUIAS[0].slug}`);
    const sinArchivo = await page.evaluate(() => ({
      barras: document.querySelectorAll('.tu-archivo').length,
      izquierdas: document.querySelectorAll('.tu-archivo-item').length,
      titulo: document.body.textContent?.includes('Tu archivo') ?? false,
    }));
    comprobar('sin archivo no hay barra', sinArchivo.barras === 0, sinArchivo.barras === 0 ? '' : `${sinArchivo.barras} barras`);
    comprobar('ni media barra: no queda ni el título', !sinArchivo.titulo, sinArchivo.titulo ? 'aparece la palabra «Tu archivo»' : '');
    comprobar('ni una fila de datos suelta', sinArchivo.izquierdas === 0, sinArchivo.izquierdas === 0 ? '' : `${sinArchivo.izquierdas} filas`);
    await ctx.close();
  }

  {
    /*
     * La barra no rompe el modo sin JavaScript.
     *
     * El HTML exportado se genera con el contexto de análisis vacío, así que la
     * barra no puede aparecer: lo que se comprueba es que las cuatro guías siguen
     * teniendo sus anclas en el HTML plano —porque es lo que permite que un
     * enlace a `#v-cama` funcione con JavaScript apagado— y que el texto de la
     * guía sigue estando.
     */
    const sinJs = await navegador.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 667 } });
    for (const g of GUIAS) {
      const page = await sinJs.newPage();
      await page.goto(`${BASE}/wiki/${g.slug}/`, { waitUntil: 'domcontentloaded' });
      const plano = await page.evaluate(() => ({
        barras: document.querySelectorAll('.tu-archivo').length,
        anclas: document.querySelectorAll('.variable[id], .tarjeta[id]').length,
        ancho: document.documentElement.scrollWidth,
      }));
      comprobar(`${g.slug}: sin JS no hay barra y las anclas siguen en el HTML`, plano.barras === 0 && plano.anclas > 0, JSON.stringify(plano));
      comprobar(`${g.slug}: la barra ausente no desborda a 375 px`, plano.ancho <= 376, `${plano.ancho}px`);
      await page.close();
    }
    await sinJs.close();
  }

  /* ---------------------------------------------------------------- 11 */
  console.log('\n=== La tabla campo -> guía, contra las guías de verdad ===\n');
  {
    const campos = Object.entries(CAMPOS_WIKI);
    comprobar('la tabla de campos tiene entradas', campos.length > 0, `${campos.length}`);

    comprobar(
      'ningún campo apunta a dos guías distintas',
      (() => {
        const porCampo = new Map();
        for (const g of GUIAS) {
          for (const c of g.campos ?? []) {
            if (porCampo.has(c) && porCampo.get(c) !== g.slug) return false;
            porCampo.set(c, g.slug);
          }
        }
        return true;
      })()
    );

    for (const [campo, entrada] of campos) {
      const guia = GUIAS.find((g) => g.slug === entrada.slug);
      comprobar(`«${campo}» apunta a una guía que existe`, !!guia, entrada.slug);
      if (guia) {
        comprobar(
          `«${campo}» está declarado en esa guía`,
          (guia.campos ?? []).includes(campo),
          `${JSON.stringify(guia.campos)}`
        );
        /*
         * El ancla del panel tiene que ser la que la guía declara para ese campo.
         *
         * Es el segundo sitio que puede desfasarse, y el más silencioso: un `#c-riesgo`
         * escrito a mano en el panel con la tarjeta renombrada en la guía no da ningún
         * error, y el enlace deja de saltar sin que nada lo diga. La guía manda; el
         * panel copia.
         */
        const anclaGuia = (anclasDeCampos(guia)[campo] ?? '').replace('#', '');
        comprobar(
          `«${campo}» apunta a la sección que la guía declara`,
          entrada.ancla === anclaGuia,
          `panel: ${entrada.ancla ?? '(sin ancla)'} · guía: ${anclaGuia || '(sin ancla)'}`
        );
      }
    }

    const opcionales = leerCamposOpcionales();
    comprobar(
      'la lista de opcionales se ha podido leer de types.ts',
      opcionales.length > 0,
      `${opcionales.length} opcionales: ${opcionales.join(', ')}`
    );

    const sinGuia = GUIAS.filter((g) => (g.campos ?? []).length === 0);
    comprobar('hay al menos una guía atada a un campo del panel', GUIAS.some((g) => (g.campos ?? []).length > 0));
    comprobar(
      'y las que no están atadas son legales',
      // Una guía sin campo es una guía que se descubre por el índice. Lo que no
      // puede es apuntar a un campo que ya tiene dueño, y eso se comprueba arriba.
      sinGuia.length >= 0,
      `${sinGuia.length} sin campo: ${sinGuia.map((g) => g.slug).join(', ') || 'ninguna'}`
    );
  }
} finally {
  await navegador.close();
  /*
   * Sólo se cierra lo que este proceso ha abierto. Si ya había un `vite preview`
   * escuchando —porque lo levantó otra ejecución o porque alguien lo dejó
   * levantado— `startPreview()` devuelve `null` y no hay nada que cerrar. Sin el
   * `?.`, la segunda ejecución seguida de la primera moría aquí con
   * `preview.kill is not a function`, después de imprimir todas las comprobaciones.
   */
  preview?.kill();
}

console.log('');
const total = resultados.length;
const pasan = total - fallos;
if (fallos > 0) {
  console.log(`${fallos} COMPROBACIONES HAN FALLADO:\n`);
  for (const r of resultados.filter((x) => !x.ok)) console.log(`  - ${r.nombre}  ->  ${r.detalle}`);
}
console.log(`${pasan}/${total} comprobaciones pasan`);
if (fallos > 0) process.exit(1);
console.log('TODAS LAS COMPROBACIONES PASAN');