/**
 * Comprobación del historial: el ciclo completo, los tres estados y el borrado.
 *
 * Lo que se mide, y por qué cada cosa:
 *
 *  1. **El ciclo entero**: subir un G-code, esperar al análisis, verlo aparecer
 *     en `/`, **recargar la página** y comprobar que sigue ahí. IndexedDB en
 *     Playwright es real, así que no hay que simular nada.
 *
 *  2. **Que la recarga no dé un falso positivo por el contexto de React.** Un check que sube
 *     un fichero, recarga y ve que sigue ahí **puede pasar por accidente**: si la
 *     comprobación mirase un estado en memoria en vez de la base, el F5 lo
 *     borraría todo… salvo que el contexto sobreviviera. Y no sobrevive, pero
 *     eso hay que **medirlo**, no suponerlo. La forma de medirlo es vaciar el
 *     almacén a propósito antes de recargar y comprobar que la lista **se queda
 *     vacía**: si con el almacén vacío la lista saliera con algo, estaríamos
 *     viendo el contexto y no el almacenamiento.
 *
 *  3. **Los tres estados** en los cuatro tramos de ancho: con historial, sin
 *     historial, y sin IndexedDB.
 *
 *  4. **Borrar uno y vaciar todo**, con la confirmación, y que el vaciado diga
 *     cuántos se van.
 *
 *  5. **Sin IndexedDB**: con `addInitScript` que lo borra de `window`, el aviso
 *     aparece y **el análisis sigue funcionando**. Esta es la comprobación que
 *     importa del tercer estado: si al no poder guardar se rompiera el análisis,
 *     `estaDisponible()` estaría haciendo su trabajo pero al revés.
 *
 *  6. **Proyectos**: que nombrar un análisis lo convierta en proyecto, que dejar
 *     el nombre vacío lo devuelva al historial y que el diálogo sea usable con
 *     teclado. Es el módulo que comparte el almacén con esta lista.
 *
 * Uso:  node scripts/verify/historial.mjs
 * Sale con código 1 si algo falla.
 */

import { chromium } from 'playwright';
import { GCODE_FIXTURE } from './fixtures.mjs';
import { arrancarPreview } from './probe.mjs';

/** Los cuatro tramos, los mismos que `rutas.mjs` y `taller.mjs`. */
const TRAMOS = [
  { nombre: 'movil <640', width: 375, height: 667 },
  { nombre: '640-767', width: 700, height: 900 },
  { nombre: '768-1199', width: 900, height: 900 },
  { nombre: '>=1200', width: 1280, height: 800 },
];

const NOMBRE_GCODE = 'Argentina T-shirt medal_PLA_2m56s.gcode';

const checks = [];
const fallos = [];
let falloDeScript = null;

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/**
 * Si el módulo se ha visto funcionar alguna vez en esta ejecución.
 *
 * Existe para las comprobaciones **de ausencia** —«no se pinta esto», «no recorta
 * esto»—, que son tautologías cuando lo que falta es la función entera. Contra el
 * estado anterior a este módulo, seis comprobaciones de este script decían `ok`
 * sin haber comprobado nada: no había lista, luego no había lista, y una caja
 * sin contenido nunca recorta.
 *
 * Una vez que la lista ha aparecido, las comprobaciones de ausencia sí son
 * comprobaciones. Y si nunca ha aparecido, se dice que no se ha podido
 * comprobar, que es información distinta de «ok».
 */
let laListaHaAparecido = false;

/** Marca que la lista existe, a partir de una comprobación que la busca. */
function marcarSiAparece(presente) {
  if (presente) laListaHaAparecido = true;
  return presente;
}

/**
 * Una comprobación de ausencia. Sólo pasa si además la lista ha aparecido en
 * algún momento de esta ejecución.
 */
function comprobarAusencia(ausente, mensaje) {
  if (laListaHaAparecido) {
    comprobar(ausente, mensaje);
  } else {
    comprobar(false, `${mensaje} — no comprobable: la lista de recientes nunca apareció`);
  }
}

/**
 * Sube un G-code y espera a que el análisis termine.
 *
 * Espera a `.file-info`, que aparece cuando hay archivo, y luego a que el panel
 * deje de decir que está trabajando. Sin el segundo paso, el guardado —que
 * ocurre justo cuando `status` pasa a `done`— todavía no ha pasado.
 */
async function subirYAnalizar(page, fichero = GCODE_FIXTURE, esperarGuardado = true) {
  await page.setInputFiles('input[type="file"]', fichero);
  await page.waitForSelector('.file-info', { timeout: 20000 });
  // El panel muestra el spinner del análisis; cuando se va, `status` es `done`.
  await page
    .waitForFunction(
      () => {
        const cuerpo = document.querySelector('.panel-body');
        if (!cuerpo) return true;
        return !/analizando|clasificando/i.test(cuerpo.textContent ?? '');
      },
      null,
      { timeout: 20000 }
    )
    .catch(() => {});
  /*
   * Se espera **a la fila**, no a un reloj.
   *
   * La primera versión tenía `waitForTimeout(600)` y con el guardado ya
   * asíncrono —el aviso `alGuardar` añade un turno más— no llegaba: la
   * comprobación se hacía con la lista todavía vacía. Un tiempo fijo es una
   * apuesta sobre lo que tarda una máquina, y falla justo cuando la máquina va
   * más lenta que el portátil de quien la escribió.
   */
  if (esperarGuardado) {
    await page
      .waitForSelector('.recientes-fila', { timeout: 10000 })
      .catch(() => {});
  }
}

/**
 * El cuerpo que cuenta líneas, **declarado dentro de la página** y no en Node.
 *
 * `page.$eval` serializa el cuerpo de la función y lo ejecuta dentro del
 * navegador, así que no puede cerrar sobre nada de aquí: una función de Node
 * pasada por referencia es `lineasDe is not defined` dentro del `page`, con todo
 * el aspecto de un fallo de la comprobación. Va dentro, como un `addInitScript`.
 *
 * Y el `lineHeight` computed puede ser `normal`, que no es un número:
 * `Math.round(NaN / NaN)` es `NaN` y `NaN >= 2` es `false`, así que la
 * comprobación fallaba sin decir por qué. Cuando el interlineado no es un número
 * se mide contra la altura del propio elemento.
 */
function exponeContadorDeLineas() {
  window.LINEAS_EN_PAGINA = (el) => {
    const alto = el.getBoundingClientRect().height;
    // **El interlineado se mide, no se lee del estilo.** Cuando `line-height` es
    // `normal` —que es el valor por defecto y lo que tiene este texto— no hay
    // ningún número que leer, y dividir la altura por sí misma da 1 siempre. La
    // forma fiable es medir dos veces: con `nowrap` forzado el elemento mide
    // exactamente una línea, y con su `white-space` de verdad mide todas.
    const normal = el.style.whiteSpace;
    el.style.whiteSpace = 'nowrap';
    const unaLinea = el.getBoundingClientRect().height;
    el.style.whiteSpace = normal;
    return unaLinea > 0 ? Math.round(alto / unaLinea) : 0;
  };
}

/**
 * Sube el G-code las veces que hagan falta para tener `n` filas en el historial.
 *
 * No cuenta subidas, cuenta **filas**, porque las dos cosas no son lo mismo:
 * `subirYAnalizar` espera a que aparezca una fila, y si ya hay una de la subida
 * anterior vuelve enseguida. Con tres subidas seguidas medidas así se acababa
 * con una entrada y el bloque de borrado —que necesita tres para que el vaciado
 * tenga un número que decir— fallaba por el camino equivocado.
 */
async function llegarAEntradas(page, n) {
  for (let intento = 0; intento < n + 3; intento++) {
    const hay = await contarEntradas(page);
    if (hay >= n) return hay;
    await page.setInputFiles('input[type="file"]', GCODE_FIXTURE);
    await page.waitForSelector('.file-info', { timeout: 20000 });
    // Se espera **a la base**, no a un reloj ni a las filas de la pantalla. La
    // primera versión contaba `.historial-fila` estando en `/`, donde ese
    // selector no existe: siempre cero, así que subía un archivo en cada vuelta
    // y se quedaba con cinco en lugar de tres.
    await page
      .waitForFunction(
        (n) => window.__contarEntradas() >= n,
        n,
        { timeout: 15000 }
      )
      .catch(() => {});
  }
  return contarEntradas(page);
}

/** Cuántas entradas hay en el almacén, contadas desde la base. */
function contarEntradas(page) {
  return page.evaluate(
    () =>
      new Promise((hecho) => {
        const p = indexedDB.open('wiiki-3d', 1);
        p.onsuccess = () => {
          const db = p.result;
          if (!db.objectStoreNames.contains('analisis')) {
            db.close();
            hecho(0);
            return;
          }
          const c = db.transaction('analisis', 'readonly').objectStore('analisis').count();
          c.onsuccess = () => {
            db.close();
            hecho(c.result);
          };
          c.onerror = () => {
            db.close();
            hecho(-1);
          };
        };
        p.onerror = () => hecho(-1);
      })
  );
}

/**
 * Deja el almacén vacío desde la propia página, sin pasar por la interfaz.
 *
 * **Usa `clear()` y no `deleteDatabase()`.** La primera versión borraba la base
 * entera, y `deleteDatabase()` queda **bloqueado** mientras haya conexiones
 * abiertas —que las hay, porque la página acaba de abrirla para leer— así que
 * `onblocked` se disparaba, la función resolvía igual y la base no se borraba
 * Se quedaba con las entradas del bloque anterior y el bloque de borrado
 * borrado empezaba con cinco en vez de tres, y el fallo parecía del bloque.
 *
 * `clear()` sobre el almacén de objetos no tiene ese problema: es una
 * transacción normal y funciona con conexiones abiertas.
 */
async function vaciarDesdeLaPagina(page) {
  await page.evaluate(
    () =>
      new Promise((hecho) => {
        const p = indexedDB.open('wiiki-3d', 1);
        p.onsuccess = () => {
          const db = p.result;
          if (!db.objectStoreNames.contains('analisis')) {
            db.close();
            hecho();
            return;
          }
          const tx = db.transaction('analisis', 'readwrite');
          tx.objectStore('analisis').clear();
          tx.oncomplete = () => {
            db.close();
            hecho();
          };
          tx.onerror = tx.onabort = () => {
            db.close();
            hecho();
          };
        };
        p.onerror = () => hecho();
      })
  );
}

/**
 * Se expone el contador en `window` para poder esperar a un número desde fuera.
 *
 * Es una prueba, y una prueba puede añadir su propio accessor: lo que no puede
 * hacer es cambiar el comportamiento que mide. Este sólo lee, y la app no lo
 * llama nunca.
 */
async function exponerContador(page) {
  // Primero el contador de líneas, porque `page.$eval` lo necesita disponible
  // dentro de la página antes de que se ejecute nada.
  await page.addInitScript(exponeContadorDeLineas);
  await page.addInitScript(() => {
    window.__contarEntradas = () =>
      new Promise((hecho) => {
        const p = indexedDB.open('wiiki-3d', 1);
        p.onsuccess = () => {
          const db = p.result;
          if (!db.objectStoreNames.contains('analisis')) {
            db.close();
            hecho(0);
            return;
          }
          const c = db.transaction('analisis', 'readonly').objectStore('analisis').count();
          c.onsuccess = () => {
            db.close();
            hecho(c.result);
          };
          c.onerror = () => {
            db.close();
            hecho(-1);
          };
        };
        p.onerror = () => hecho(-1);
      });
  });
}

const servidor = await arrancarPreview();
const BASE = process.env.BASE_URL ?? servidor.base;
const browser = await chromium.launch({
  args: ['--no-sandbox'],
  executablePath: process.env.CHROMIUM_PATH || undefined,
});

try {
  // --- El ciclo completo, una vez, en escritorio ---
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await exponerContador(page);
    await page.goto('http://127.0.0.1:4173/');
    await vaciarDesdeLaPagina(page);
    await page.reload();
    await page.waitForSelector('.upload-zone');

    /*
     * Las comprobaciones de ausencia **sólo valen si la función existe**.
     *
     * Una comprobación de que algo no se ve pasa siempre que no haya nada que
     * ver, y contra el estado anterior a este módulo no había nada que ver:
     * seis comprobaciones de este script «pasaban» con la aplicación entera sin
     * historial. No es que fueran inútiles: es que decían `ok` sobre algo que no
     * se había comprobado. Por eso aquí se sube un archivo **antes** de
     * comprobar que no aparece nada, y la lista tiene que existir.
     */
    await subirYAnalizar(page);
    const reciente = marcarSiAparece(await page.$('.recientes-fila'));
    comprobar(!!reciente, 'tras analizar, el análisis aparece en `/`');
    const laListaExiste = !!reciente;

    await vaciarDesdeLaPagina(page);
    await page.reload();
    await page.waitForSelector('.upload-zone');
    await page.waitForTimeout(600);

    if (laListaExiste) {
      comprobarAusencia(
        !(await page.$('.recientes')),
        'sin historial, con la lista funcionando: `/` no pinta nada'
      );
      comprobarAusencia(
        !(await page.$('.historial-aviso')),
        'sin historial, con la lista funcionando: `/` no avisa de nada'
      );
    } else {
      comprobar(
        false,
        'no se puede comprobar el estado sin historial: la lista de recientes nunca apareció'
      );
    }

    // --- El ciclo: subir, guardar, ver ---
    await subirYAnalizar(page);

    // El handle de la fila se consulta **antes** de recargar, que es cuando
    // vale. `vaciarDesdeLaPagina` y `page.reload()` de abajo destruyen el
    // contexto de ejecución, y un `ElementHandle` de la página anterior lanza
    // `Execution context was destroyed` cuando se le pide el texto. El fallo
    // estaba en el orden, no en la comprobación.
    const filaAhora = marcarSiAparece(await page.$('.recientes-fila'));
    const textoFila = filaAhora
      ? (await filaAhora.innerText()).replace(/\s+/g, ' ').trim()
      : '';
    if (filaAhora) {
      comprobar(
        textoFila.includes('PLA'),
        `la fila lleva el material (sale: ${textoFila})`
      );
      comprobar(
        /\b(Bajo|Moderado|Alto|Crítico)\b/.test(textoFila),
        `la fila lleva el nivel de riesgo (sale: ${textoFila})`
      );
      comprobar(
        !/\d{2}\/\d{2}\/\d{4}/.test(textoFila),
        `los recientes NO llevan la fecha, por decisión propia (sale: ${textoFila})`
      );
    } else {
      comprobar(false, 'no hay fila de reciente que leer');
    }

    // --- La comprobación que no pasa por el contexto ---
    //
    // Almacén vacío a propósito, y recargar. Si aquí saliera algo, lo que se
    // estaría viendo es el estado en memoria y no el almacenamiento.
    await vaciarDesdeLaPagina(page);
    await page.reload();
    await page.waitForSelector('.upload-zone');
    await page.waitForTimeout(600);
    comprobarAusencia(
      !(await page.$('.recientes')),
      'el almacenamiento vacío sale vacío tras recargar: no se está viendo el contexto de React'
    );

    // --- Y ahora sí, el ciclo de verdad, con recarga por el medio ---
    await subirYAnalizar(page);
    comprobar(
      !!(await page.$('.recientes-fila')),
      'ciclo 1: el análisis aparece en `/` antes de recargar'
    );

    await page.reload();
    await page.waitForSelector('.upload-zone');
    await page.waitForTimeout(800);
    const trasRecarga = marcarSiAparece(await page.$('.recientes-fila'));
    comprobar(!!trasRecarga, 'ciclo 1: tras recargar, el análisis sigue ahí — IndexedDB es real');

    const textoTras = trasRecarga
      ? (await trasRecarga.innerText()).replace(/\s+/g, ' ').trim()
      : '';
    comprobar(
      textoTras.includes(NOMBRE_GCODE),
      `tras recargar se conserva el nombre del archivo (sale: ${textoTras})`
    );

    // --- El enlace desde `/` a `/historial` ---
    const enlace = await page.$('.recientes-enlace');
    comprobar(!!enlace, 'en `/` hay enlace al historial completo');
    if (enlace) {
      await enlace.click();
      await page.waitForSelector('.historial', { timeout: 8000 });
      const url = page.url();
      comprobar(url.endsWith('/historial'), `el enlace lleva a /historial (va a ${url})`);
      const enHistorial = await page.$('.historial-fila');
      comprobar(!!enHistorial, 'el historial completo enseña la entrada');
    }

    await page.close();
  }

  // --- Los tres estados en los cuatro tramos ---
  for (const tramo of TRAMOS) {
    // Estado con historial.
    {
      const page = await browser.newPage({
        viewport: { width: tramo.width, height: tramo.height },
      });
      await page.goto('http://127.0.0.1:4173/');
      await subirYAnalizar(page);
      const hay = marcarSiAparece(await page.$('.recientes-fila'));
      comprobar(!!hay, `${tramo.nombre} · estado con historial: se ve el reciente en /`);

      comprobarAusencia(
        (await page.$eval('.canvas-area', (el) => el.scrollHeight - el.clientHeight)) <= 0,
        `${tramo.nombre} · estado con historial: la caja no recorta`
      );

      // Este tramo acaba de demostrar que la lista existe, así que ahora la de
      // «sin historial» sí es una comprobación y no una tautología.
      await vaciarDesdeLaPagina(page);
      await page.reload();
      await page.waitForSelector('.upload-zone');
      await page.waitForTimeout(600);
      comprobarAusencia(
        hay && !(await page.$('.recientes')),
        `${tramo.nombre} · estado sin historial, con la lista funcionando: / no pinta nada`
      );

      await page.close();
    }

    // Estado sin historial: almacén vacío desde el principio.
    {
      const page = await browser.newPage({
        viewport: { width: tramo.width, height: tramo.height },
      });
      await page.goto('http://127.0.0.1:4173/');
      await vaciarDesdeLaPagina(page);
      await page.reload();
      await page.waitForSelector('.upload-zone');
      await page.waitForTimeout(600);
      comprobarAusencia(
        !(await page.$('.recientes')),
        `${tramo.nombre} · estado sin historial: / no pinta lista`
      );

      await page.goto('http://127.0.0.1:4173/historial');
      await page.waitForSelector('.historial', { timeout: 8000 });
      const texto = (await page.$eval('.historial', (el) => el.innerText))
        .replace(/\s+/g, ' ')
        .trim();
      comprobar(
        texto.includes('Todavía no hay análisis guardados'),
        `${tramo.nombre} · estado sin historial: /historial lo dice`
      );

      comprobarAusencia(
        (await page.$eval('.canvas-area', (el) => el.scrollHeight - el.clientHeight)) <= 0,
        `${tramo.nombre} · estado sin historial: la caja no recorta`
      );
      await page.close();
    }

    // Estado sin IndexedDB, borrándolo de `window` antes de que corra nada.
    {
      const page = await browser.newPage({
        viewport: { width: tramo.width, height: tramo.height },
      });
      await page.addInitScript(() => {
        // `delete` sobre `window` es lo que hace que `typeof indexedDB` dé
        // `undefined`, que es la primera guarda de `estaDisponible()`. Un
        // `addInitScript` corre antes que el script de la página, así que la
        // app ni llega a verlo.
        // @ts-expect-error -- se quita a propósito, es lo que se quiere medir.
        delete window.indexedDB;
      });

      await page.goto('http://127.0.0.1:4173/');
      await page.waitForSelector('.upload-zone');
      await page.waitForTimeout(600);

      const aviso = await page.$('.historial-aviso');
      comprobar(
        !!aviso,
        `${tramo.nombre} · sin IndexedDB: / enseña el aviso`
      );
      const textoAviso = aviso ? (await aviso.innerText()).replace(/\s+/g, ' ').trim() : '';
      comprobar(
        textoAviso.includes('no está disponible'),
        `${tramo.nombre} · sin IndexedDB: el aviso dice por qué (sale: ${textoAviso})`
      );
      comprobar(
        !/reintent|volver a intentar/i.test(textoAviso),
        `${tramo.nombre} · sin IndexedDB: el aviso NO ofrece reintentar, no hay nada que reintentar`
      );
      comprobar(
        textoAviso.includes('sigue funcionando'),
        `${tramo.nombre} · sin IndexedDB: el aviso dice que el análisis sigue funcionando`
      );
      comprobar(
        !(await page.$('.recientes')),
        `${tramo.nombre} · sin IndexedDB: no se pinta lista de recientes`
      );

      // Y lo que de verdad importa: **el análisis sigue funcionando**.
      await subirYAnalizar(page);
      const panel = await page.$('.panel-body');
      const textoPanel = panel ? (await panel.innerText()).replace(/\s+/g, ' ') : '';
      comprobar(
        textoPanel.includes('PLA'),
        `${tramo.nombre} · sin IndexedDB: el análisis termina igualmente (panel: ${textoPanel.slice(0, 60)})`
      );

      await page.goto('http://127.0.0.1:4173/historial');
      await page.waitForSelector('.historial', { timeout: 8000 });
      const avisoHist = await page.$('.historial-aviso');
      comprobar(!!avisoHist, `${tramo.nombre} · sin IndexedDB: /historial también avisa`);

      await page.close();
    }
  }

  // --- Borrar uno y vaciar todo, con confirmación ---
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await exponerContador(page);
    await page.goto('http://127.0.0.1:4173/');
    await vaciarDesdeLaPagina(page);
    await page.reload();
    await page.waitForSelector('.upload-zone');

    // Tres entradas, para que el vaciado tenga un número que decir. Se cuentan
    // filas, no subidas: es lo que dice el bloque.
    await llegarAEntradas(page, 3);

    await page.goto('http://127.0.0.1:4173/historial');
    await page.waitForSelector('.historial-fila', { timeout: 10000 });
    await page.waitForTimeout(400);

    const antes = await page.$$eval('.historial-fila', (els) => els.length);
    comprobar(antes === 3, `hay tres entradas antes de borrar (hay ${antes})`);

    // **Orden descendente por fecha.** Tres entradas guardadas en el mismo
    // segundo darían la misma `fecha`, y el orden importaría menos de lo que
    // parece. Se comprueba que la lista no está al revés por el campo de fecha,
    // que es lo que se puede ver.
    const ordenVisible = await page.$$eval('.historial-meta', (els) =>
      els.map((e) => (e.textContent ?? '').match(/\d{2}\/\d{2}\/\d{4}/)?.[0] ?? '')
    );
    const fechas = ordenVisible.filter(Boolean);
    const descendente = [...fechas].every((f, i) => i === 0 || fechas[i - 1] >= f);
    comprobar(descendente, `la lista va de más reciente a más antigua (${fechas.join(' ')})`);

    // --- Borrar uno, con confirmación ---
    await page.click('.historial-fila .btn-danger');
    await page.waitForSelector('[role="alertdialog"]', { timeout: 8000 });
    const textoDialogo = await page.$eval('[role="alertdialog"]', (el) => el.innerText);
    comprobar(
      textoDialogo.includes('Borrar') && textoDialogo.includes('historial'),
      `borrar uno pide confirmación (dice: ${textoDialogo.replace(/\s+/g, ' ').trim()})`
    );

    // El foco tiene que estar dentro del diálogo.
    const dentroDelDialogo = await page.evaluate(() => {
      const d = document.querySelector('[role="alertdialog"]');
      return !!d && d.contains(document.activeElement);
    });
    comprobar(dentroDelDialogo, 'el diálogo de confirmación recibe el foco');

    // Cancelar no borra.
    await page.click('[role="alertdialog"] .btn-ghost');
    await page.waitForTimeout(300);
    const trasCancelar = await page.$$eval('.historial-fila', (els) => els.length);
    comprobar(trasCancelar === 3, `cancelar no borra nada (siguen ${trasCancelar})`);

    // Confirmar sí borra, y sólo uno.
    await page.click('.historial-fila .btn-danger');
    await page.waitForSelector('[role="alertdialog"]', { timeout: 8000 });
    await page.click('[role="alertdialog"] .btn-danger');
    await page.waitForTimeout(700);
    const trasBorrar = await page.$$eval('.historial-fila', (els) => els.length);
    comprobar(trasBorrar === 2, `borrar uno quita exactamente una entrada (quedan ${trasBorrar})`);

    // Y sigue ahí tras recargar: el borrado también persiste.
    await page.reload();
    await page.waitForSelector('.historial-fila', { timeout: 10000 });
    const trasRecargaBorrado = await page.$$eval('.historial-fila', (els) => els.length);
    comprobar(
      trasRecargaBorrado === 2,
      `el borrado persiste tras recargar (quedan ${trasRecargaBorrado})`
    );

    // --- Vaciar todo, y la confirmación dice cuántos ---
    await page.click('.historial-vaciar');
    await page.waitForSelector('[role="alertdialog"]', { timeout: 8000 });
    const textoVaciar = (await page.$eval('[role="alertdialog"]', (el) => el.innerText))
      .replace(/\s+/g, ' ')
      .trim();
    comprobar(
      textoVaciar.includes('2'),
      `la confirmación del vaciado DICE cuántos se van (dice: ${textoVaciar})`
    );
    comprobar(
      textoVaciar.includes('No se puede deshacer'),
      `la confirmación del vaciado avisa de que no se deshace (dice: ${textoVaciar})`
    );

    await page.click('[role="alertdialog"] .btn-danger');
    await page.waitForTimeout(800);
    const trasVaciar = await page.$eval('.historial', (el) => el.innerText);
    comprobar(
      trasVaciar.includes('Todavía no hay análisis guardados'),
      'vaciar todo deja el historial vacío'
    );
    comprobar(
      !(await page.$('.historial-vaciar')),
      'el botón de vaciar desaparece cuando no hay nada que vaciar'
    );

    // Y el estado vacío también persiste.
    await page.reload();
    await page.waitForSelector('.historial-aviso', { timeout: 10000 });
    const trasRecargaVacia = await page.$eval('.historial', (el) => el.innerText);
    comprobar(
      trasRecargaVacia.includes('Todavía no hay análisis guardados'),
      'el vaciado persiste tras recargar'
    );

    await page.close();
  }

  // --- Abrir una entrada: H-3.1 entero ---
  //
  // Es el bloque que más se extiende de lo que parece, porque no basta con que se vea el
  // análisis: tiene que verse **sin volver a subir el archivo**, y eso obliga a
  // navegar por el enrutador. Un `page.goto` en medio destruiría el contexto y la
  // comprobación pasaría sólo porque el archivo seguía subido.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await exponerContador(page);
    await page.goto('http://127.0.0.1:4173/');
    await vaciarDesdeLaPagina(page);
    await page.reload();
    await page.waitForSelector('.upload-zone');
    await llegarAEntradas(page, 1);

    // --- 1 · Alcanzable con teclado y activable ---
    const boton = await page.$('.recientes-boton');
    comprobar(!!boton, 'la entrada es un `<button>`, no un elemento con onclick');

    const esBoton = await page.$eval('.recientes-boton', (el) => el.tagName);
    comprobar(esBoton === 'BUTTON', `la entrada es un BUTTON (es un ${esBoton})`);

    await boton.focus();
    const conFoco = await page.evaluate(() =>
      document.activeElement?.classList.contains('recientes-boton')
    );
    comprobar(!!conFoco, 'la entrada recibe el foco');

    const conFocoVisible = await page.$eval('.recientes-boton', (el) => {
      const s = getComputedStyle(el);
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    });
    comprobar(conFocoVisible, 'la entrada con el foco tiene recuadro visible');

    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    // --- 2 · Se ven los nueve campos de metadatos y el diagnóstico ---
    const panel = await page.$eval('.panel-body', (el) => el.innerText).catch(() => '');
    const textoPanel = panel.replace(/\s+/g, ' ').trim();
    /*
     * Los nueve campos, **sacados del componente y no escritos de memoria**.
     *
     * La primera lista la puse de memoria y tenía tres etiquetas que no existen:
     * «Tiempo» en vez de «Tiempo estimado», «Soportes» —que sí aparece, pero en el
     * diagnóstico, no en los metadatos— y «Ángulo» en vez de «Ángulo máx.». Pasó
     * porque las tres sales por ===
     *
     * Y hay una trampa más: `innerText` devuelve el texto **ya con
     * `text-transform` aplicado**, y el panel pone las etiquetas en mayúsculas.
     * Una comprobación sensible a mayúsculas sobre texto estilizado falla por el
     * estilo, no por el dato.
     */
    const ETIQUETAS_METADATOS = [
      'Material',
      'Temp. hotend',
      'Temp. cama',
      'Altura de capa',
      'Tiempo estimado',
      'Filamento',
      'Peso total',
      'Voladizos',
      'Ángulo máx.',
    ];
    const mayus = (s) => s.toLocaleUpperCase('es-ES');
    const panelMayus = mayus(textoPanel);
    const faltan = ETIQUETAS_METADATOS.filter((campo) => !panelMayus.includes(mayus(campo)));
    comprobar(
      faltan.length === 0,
      `al abrir la entrada se ven los nueve campos de metadatos (faltan: ${faltan.join(', ') || 'ninguno'})`
    );
    comprobar(
      textoPanel.includes('PLA'),
      `y el material del análisis restaurado (sale: ${textoPanel.slice(0, 60)})`
    );

    // --- El diagnóstico: la clasificación ---
    //
    // En minúsculas-insensible, porque el panel pinta el nivel en mayúsculas por
    // `text-transform` y comparar sin tener en cuenta el estilo hace fallar la
    // comprobación por el motivo equivocado.
    const tieneDiagnostico = panelMayus.includes('DIAGN');
    comprobar(tieneDiagnostico, 'y el diagnóstico de Jev');

    const niveles = ['Bajo', 'Moderado', 'Alto', 'Crítico'];
    const nivel = niveles.find((n) => panelMayus.includes(mayus(n)));
    comprobar(
      nivel !== undefined,
      `y su nivel de riesgo (sale: ${nivel ?? 'ninguno de ' + niveles.join('/')})`
    );
    comprobar(
      textoPanel.includes('warping') || panelMayus.includes('WARPING'),
      'y el riesgo de warping'
    );
    comprobar(
      panelMayus.includes('SOPORTES'),
      'y el aviso de soportes'
    );

    // --- 3 · El aviso de que el visor no vuelve sin el archivo ---
    const aviso = await page.$eval('.canvas-error', (el) => el.innerText).catch(() => '');
    const textoAviso = aviso.replace(/\s+/g, ' ').trim();
    comprobar(
      textoAviso.includes('no se guarda el archivo'),
      `el aviso dice que el archivo no se guarda (sale: ${textoAviso.slice(0, 80)})`
    );
    comprobar(
      textoAviso.includes('visor'),
      `y que por eso el visor no se puede abrir (sale: ${textoAviso.slice(0, 80)})`
    );
    comprobar(
      !textoAviso.includes('retrospectiva'),
      'el aviso no inventa nada más allá de lo que no puede hacer'
    );

    // --- Abrir no duplica la entrada ---
    const antesDeAbrir = await contarEntradas(page);
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForSelector('.recientes-boton', { timeout: 10000 });
    await page.click('.recientes-boton');
    await page.waitForTimeout(1200);
    const despuesDeAbrir = await contarEntradas(page);
    comprobar(
      despuesDeAbrir === antesDeAbrir,
      `abrir una entrada no crea otra (antes ${antesDeAbrir}, después ${despuesDeAbrir})`
    );

    // --- 4 · Un nombre larguísimo se ROMPE, no se recorta ---
    await page.goto('http://127.0.0.1:4173/');
    await vaciarDesdeLaPagina(page);
    await page.reload();
    await page.waitForSelector('.upload-zone');

    const NOMBRE_LARGO =
      'pieza-de-prueba-con-un-nombre-deliberadamente-larguisimo-para-ver-que-se-rompe-en-varias-lineas-y-no-se-recorta.gcode';
    await page.evaluate(
      async (nombre) => {
        // Se guarda a mano con el nombre largo, porque el del fixture es corto
        // y el criterio habla de nombres largos.
        const p = indexedDB.open('wiiki-3d', 1);
        await new Promise((hecho) => {
          p.onsuccess = () => {
            const db = p.result;
            const tx = db.transaction('analisis', 'readwrite');
            tx.objectStore('analisis').put({
              id: crypto.randomUUID(),
              filename: nombre,
              fileType: 'gcode',
              fecha: Date.now(),
              metadata: {
                filename: nombre,
                slicer: 'creality',
                material: 'PLA',
                printTime: 1234,
                filamentUsed: 0.93,
              },
              classification: {
                riskLevel: 'Moderado',
                warpingRisk: 0.5,
                needsSupport: false,
                recommendation: 'prueba',
              },
            });
            tx.oncomplete = () => {
              db.close();
              hecho();
            };
            tx.onerror = () => {
              db.close();
              hecho();
            };
          };
          p.onerror = () => hecho();
        });
      },
      NOMBRE_LARGO
    );
    await page.reload();
    await page.waitForSelector('.recientes-boton', { timeout: 10000 });

    /*
     * El enlace al historial tiene objetivo táctil.
     *
     * Se mide **sin** `@media (pointer: coarse)` de por medio a propósito: la
     * primera versión de la regla lo metía dentro, y como Chromium headless no
     * cumple ese `media`, la regla no llegaba a aplicarse y `min-height: 0px`
     * pasaba por comprobar el objetivo táctil sin comprobarlo. Un requisito que
     * sólo se cumple en un dispositivo concreto es un requisito que no se
     * comprueba.
     */
    const enlace = await page.$('.recientes-enlace');
    if (enlace) {
      const caja = await enlace.boundingBox();
      const alto = caja ? Math.round(caja.height) : 0;
      const ancho = caja ? Math.round(caja.width) : 0;
      comprobar(
        alto >= 44,
        `el enlace al historial tiene objetivo táctil de 44px de alto (mide ${alto}px)`
      );
      comprobar(
        ancho >= 44,
        `y ancho suficiente para acertarlo (mide ${ancho}px)`
      );
    } else {
      comprobar(false, 'no hay enlace al historial que medir');
    }

    const mesure = await page.$eval('.recientes-nombre', (el) => {
      const estilos = getComputedStyle(el);
      return {
        lineas: LINEAS_EN_PAGINA(el),
        texto: (el.textContent ?? '').trim(),
        // `scrollWidth > clientWidth` es lo que delata un recorte con elipsis:
        // el elemento dice que su contenido es más ancho que la caja que lo pinta.
        recortado: el.scrollWidth > el.clientWidth + 1,
        ancho: Math.round(el.getBoundingClientRect().width),
        // Y si el texto se ha perdido en el DOM, que es el recorte sin CSS.
        completoEnElDom: (el.textContent ?? '').includes('larguisimo-para-ver-que-se-rompe'),
      };
    });
    comprobar(
      mesure.texto === NOMBRE_LARGO,
      `el nombre entero está en pantalla (sale: ${mesure.texto.slice(-40)})`
    );
    comprobar(!mesure.recortado, `el nombre NO se recorta con elipsis (sale: recortado=${mesure.recortado})`);
    comprobar(mesure.completoEnElDom, `el nombre completo llega al DOM, no cortado (sale: ${mesure.completoEnElDom})`);
    comprobar(
      mesure.lineas >= 2,
      `el nombre ocupa varias líneas (sale: ${mesure.lineas} línea(s) en ${mesure.ancho}px)`
    );

    // Y a 375 px, que es donde el criterio se mide.
    //
    // **La misma página con otro viewport, no una página nueva.** Cada
    // `browser.newPage()` abre un contexto con su propio almacenamiento, así que
    // una página nueva no ve la entrada recién guardada y el selector no aparece
    // nunca. Cambiar el viewport de la misma página es lo que mide «a 375 px» de
    // verdad: el mismo contenido, más estrecho.
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForSelector('.recientes-nombre', { timeout: 10000 });
    const enMovil = await page.$eval('.recientes-nombre', (el) => ({
      recortado: el.scrollWidth > el.clientWidth + 1,
      lineas: LINEAS_EN_PAGINA(el),
      ancho: Math.round(el.getBoundingClientRect().width),
      completo: (el.textContent ?? '').includes('larguisimo-para-ver-que-se-rompe'),
    }));
    comprobar(!enMovil.recortado, 'a 375px el nombre NO se recorta');
    comprobar(enMovil.completo, 'a 375px el nombre completo llega al DOM');
    comprobar(
      enMovil.lineas >= 2,
      `a 375px el nombre se parte en varias líneas (sale: ${enMovil.lineas} en ${enMovil.ancho}px)`
    );

    await page.close();
  }

  // --- Proyectos: nombrar un análisis lo convierte en proyecto ---
  //
  // El nombre es **lo único** que distingue un proyecto de una entrada del
  // historial, así que es lo que hay que medir: que un análisis recién hecho se
  // ofrezca para nombrar, que al nombrarlo pase a «Tus proyectos», que dejar el
  // nombre vacío lo devuelva al historial, y que el diálogo sea usable con teclado.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto('http://127.0.0.1:4173/');
    await subirYAnalizar(page);

    await page.goto('http://127.0.0.1:4173/proyectos');
    await page.waitForSelector('.historial-fila', { timeout: 10000 });

    const subtitulos = () =>
      page.$$eval('.proyectos-subtitulo', (els) => els.map((e) => e.textContent.trim()));

    comprobar(
      (await subtitulos()).some((t) => t.startsWith('Sin guardar')),
      'proyectos: el análisis recién hecho se ofrece para nombrar'
    );

    const uso = await page.$eval('.proyectos-uso', (e) => e.textContent ?? '').catch(() => '');
    comprobar(
      /\d+\s*(B|kB|MB)/.test(uso),
      `proyectos: dice cuánto ocupa (sale: ${uso.trim() || 'nada'})`
    );

    // El diálogo abre con el foco dentro, y `Escape` cierra sin guardar.
    await page.click('.historial-fila .btn-primary');
    await page.waitForSelector('[role="dialog"]');
    const focoEnCampo = await page.evaluate(
      () => document.activeElement?.tagName === 'INPUT'
    );
    comprobar(focoEnCampo, 'proyectos: el diálogo abre con el foco en el campo');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    comprobar(
      (await page.$('[role="dialog"]')) === null,
      'proyectos: Escape cierra el diálogo sin guardar'
    );

    // Nombrar lo mueve a «Tus proyectos».
    await page.click('.historial-fila .btn-primary');
    await page.waitForSelector('[role="dialog"]');
    await page.fill('[role="dialog"] input', 'Pieza de prueba');
    await page.click('[role="dialog"] button[type="submit"]');
    await page.waitForTimeout(400);
    comprobar(
      (await subtitulos()).some((t) => t.startsWith('Tus proyectos')),
      'proyectos: al nombrarlo pasa a «Tus proyectos»'
    );
    const nombre = await page
      .$eval('.historial-nombre', (e) => e.textContent?.trim() ?? '')
      .catch(() => '');
    comprobar(nombre === 'Pieza de prueba', `proyectos: se ve el nombre puesto (sale: «${nombre}»)`);

    // Y el nombre vacío lo devuelve al historial: «sin nombre» es una sola cosa.
    await page.click('.historial-fila .btn-ghost');
    await page.waitForSelector('[role="dialog"]');
    await page.fill('[role="dialog"] input', '');
    await page.click('[role="dialog"] button[type="submit"]');
    await page.waitForTimeout(400);
    comprobar(
      (await subtitulos()).some((t) => t.startsWith('Sin guardar')),
      'proyectos: dejar el nombre vacío lo devuelve al historial'
    );

    await page.close();
  }

  // --- La barra inferior sigue con cuatro destinos ---
  {
    const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await page.goto('http://127.0.0.1:4173/');
    // `.nav-item` y no una clase propia de la barra: es la clase que usan los
    // cuatro destinos de siempre, en las dos disposiciones. Inventar un nombre
    // para la barra aquí sería comprobar que existe un selector que sólo existe
    // en este script.
    await page.waitForSelector('.nav-item', { timeout: 8000 });
    const destinos = await page.$$eval('.nav-item', (els) =>
      els.map((e) => e.getAttribute('href'))
    );
    comprobar(
      destinos.length === 4,
      `la barra inferior sigue con cuatro destinos (tiene ${destinos.length}: ${destinos.join(' ')})`
    );
    comprobar(
      !destinos.includes('/historial'),
      'el historial NO está en la barra inferior: se llega desde `/`'
    );
    await page.close();
  }
} catch (error) {
  // Un fallo aquí no es un fallo de las comprobaciones: es que el script se ha
  // caído por otro motivo. Se dice cuál, y **se imprime igualmente todo lo que
  // se comprobó**, porque un script que muere sin imprimir nada deja al que lee
  // sin saber ni siquiera cuánto ha funcionado.
  falloDeScript = error instanceof Error ? error.message : String(error);
  comprobar(false, `el script se ha caído antes de terminar: ${falloDeScript}`);
} finally {
  await browser.close();
  servidor.detener();
}

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  FALLA  ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
