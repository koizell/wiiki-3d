/**
 * Comprobación de Taller: los cinco estados, la aritmética y el recorte.
 *
 * Lo que se mide, y por qué cada cosa:
 *
 *  1. **Los cinco estados, en los cuatro tramos de ancho.** No en uno, porque el
 *     más estrecho es donde el texto se parte y donde un `max-width` equivocado
 *     se ve, y el más ancho es donde una caja estrecha queda perdida. Los cuatro
 *     tramos son los mismos que usa `rutas.mjs`, y salen de aquí y no de una
 *     copia: si el layout cambiara, esta lista se quedaría diciendo la verdad
 *     anterior.
 *
 *  2. **El número del criterio de aceptación.** Con el G-code del repo —PLA,
 *     0,93 g— y un precio de 25, el resultado tiene que ser `0,02 €`. El
 *     esperado está **calculado aquí**, no escrito a mano: es la misma operación
 *     con los mismos operandos, y si mañana cambiara la fórmula, el número
 *     esperado se movería con ella en lugar de estar explicando un fallo que no
 *     lo es.
 *
 *  3. **La coma.** Que `0,25` y `0.25` den el mismo resultado, y que la salida
 *     salga con coma.
 *
 *  4. **El precio inválido.** Cero, negativo y texto: en los tres casos el campo
 *     queda marcado, no hay número, y el resultado anterior ha desaparecido.
 *
 *  5. **Que el estado 3 no enseñe ningún número.** Es la comprobación que
 *     importa de verdad, porque el fallo sería un `0` de relleno: se vería
 *     perfecto y valdría cero euros.
 *
 *  6. **Que la caja quepa.** `.canvas-area` es `overflow: hidden`, así que un
 *     taller más alto que su hueco se recorta en silencio, sin scroll y sin
 *     aviso. Esto mide si se sale, en los cuatro tramos y en los cinco estados.
 *
 * Uso:  node scripts/verify/taller.mjs
 * Sale con código 1 si algo falla.
 */

import { chromium } from 'playwright';
import { GCODE_FIXTURE, GCODE_SIN_GRAMOS, STL_FIXTURE } from './fixtures.mjs';
import { startPreview } from './probe.mjs';

/**
 * Los cuatro tramos de ancho, tomados del módulo que ya los usa `rutas.mjs`.
 *
 * Se importan en vez de repetirse porque una lista de viewports copiada es una
 * lista que se queda vieja: el día que un tramo cambie, aquí seguiría
 * comprobando un ancho que ya no existe.
 */
const TRAMOS = [
  { nombre: 'movil <640', width: 375, height: 667 },
  { nombre: '640-767', width: 700, height: 900 },
  { nombre: '768-1199', width: 900, height: 900 },
  { nombre: '>=1200', width: 1280, height: 800 },
];

/**
 * El criterio de aceptación, calculado y no escrito.
 *
 * 0,93 g a 25 €/kg son 0,93 × 0,025 = 0,02325 €, que a dos decimales es 0,02 €.
 * El redondeo va en el lado de acá a propósito, para que el número esperado y el
 * que pinta la vista pasen por la misma operación y no por dos redondeos que
 * casualmente coincidan hoy.
 */
const GRAMOS = 0.93;
const PRECIO = 25;
const COSTE_ESPERADO = (GRAMOS * PRECIO / 1000).toFixed(2).replace('.', ',');
const LINEA_ESPERADA = `0,93 g × 25,00 €/kg = ${COSTE_ESPERADO} €`;

/** Los textos de los cinco estados, tal cual los fija `docs/taller.md`. */
const ESTADOS = [
  { numero: 1, etiqueta: 'sin archivo', texto: 'Sube un G-code para calcular cuánto te cuesta.' },
  {
    numero: 2,
    etiqueta: 'archivo que no es G-code',
    texto: 'El visor 3D no lleva datos de impresión. Sube un G-code para calcular el coste.',
  },
  {
    numero: 3,
    etiqueta: 'G-code sin gramos',
    texto:
      'Tu slicer no escribió los gramos consumidos. Sin ese dato no se puede calcular el coste.',
  },
  { numero: 4, etiqueta: 'con gramos, sin precio', texto: 'Falta el precio por kilogramo.' },
];

/** Los ficheros que hay que subir para llegar a cada estado. */
const COMO_LLEGAR = {
  1: null, // sin subir nada
  2: STL_FIXTURE,
  3: GCODE_SIN_GRAMOS,
  4: GCODE_FIXTURE,
  5: GCODE_FIXTURE,
};

const fallos = [];
const checks = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/** Texto visible de la zona de Taller, con los espacios normalizados. */
async function textoTaller(page) {
  return page.$eval('.taller', (el) => el.innerText.replace(/\s+/g, ' ').trim());
}

/** El texto del resultado, o `null` si no hay ninguno. */
async function textoResultado(page) {
  const el = await page.$('.taller-resultado');
  return el ? (await el.innerText()).replace(/\s+/g, ' ').trim() : null;
}

/**
 * Si el taller se sale de la caja en la que vive.
 *
 * `scrollHeight > clientHeight` sobre `.canvas-area` es lo que importa, y no el
 * de `.taller`: lo que recorta es la caja, con su `overflow: hidden`.
 */
async function seSale(page) {
  return page.$eval('.canvas-area', (el) => el.scrollHeight - el.clientHeight);
}

const preview = await startPreview();
const browser = await chromium.launch({
  args: ['--no-sandbox'],
  executablePath: process.env.CHROMIUM_PATH || undefined,
});

/**
 * Un fallo de una comprobación es un resultado, no una excepción.
 *
 * La primera versión de este script hacía `waitForSelector('.taller')` sin
 * más, y contra el commit anterior a Taller —donde `/taller` era un
 * placeholder— moría con un `TimeoutError` y un stack trace. Fallaba, sí, pero
 * saying «falta `.taller`» y nada más: de las treinta comprobaciones sólo se
 * veía una, y la que de verdad importa —el número del criterio de aceptación—
 * no llegaba a comprobarse nunca.
 *
 * Un informe que se corta en el primer fallo no dice cuánto queda por mirar.
 * Con esto, un estado que no aparece se anota como fallo y el resto sigue.
 */
async function esperarOMarcar(page, selector, mensaje, opciones = {}) {
  try {
    await page.waitForSelector(selector, { timeout: 8000, ...opciones });
    return true;
  } catch {
    comprobar(false, mensaje);
    return false;
  }
}

try {
  for (const tramo of TRAMOS) {
    // --- Los cinco estados, y el número en el quinto ---
    for (const estado of ESTADOS) {
      // Una página por estado, y se cierra al final de cada uno. Compartirla
      // obligaría a acordarse de limpiar el archivo cargado entre estados, y
      // ese es exactamente el estado que no debe quedar: sin limpiar, el
      // estado 1 se mediría con el archivo del 5 puesto.
      const page = await browser.newPage({
        viewport: { width: tramo.width, height: tramo.height },
      });
      await page.goto('http://127.0.0.1:4173/taller');
      if (!(await esperarOMarcar(page, '.taller',
        `${tramo.nombre} · estado ${estado.numero} (${estado.etiqueta}): /taller no pinta la vista de Taller`))) {
        await page.close();
        continue;
      }

      const fichero = COMO_LLEGAR[estado.numero];
      if (fichero) {
        await page.setInputFiles('input[type="file"]', fichero);
        // El análisis es asíncrono: el mensaje de «sube un G-code» no se quita
        // hasta que ha terminado. Sin esta espera, los estados 2 a 5 se
        // medirían contra la pantalla del estado 1 y todos pasarían.
        // La espera mira el texto del estado 1 **completo**, no una subcadena.
        // La primera versión usaba `:not(:has-text("Sube un G-code"))`, y el
        // mensaje del estado 2 también contiene esas palabras —«Sube un G-code
        // para calcular el coste»—, así que el estado 2 nunca esperaba bien y
        // fallaba en tres de los cuatro tramos. Un `:has-text` con medio texto
        // no distingue dos estados que lo comparten.
        await page
          .waitForFunction(
            (textoInicial) => {
              const aviso = document.querySelector('.taller-aviso');
              const texto = (aviso?.textContent ?? '').replace(/\s+/g, ' ').trim();
              return !!document.querySelector('.taller-caja') || (!!aviso && texto !== textoInicial);
            },
            ESTADOS[0].texto,
            { timeout: 20000 }
          )
          .catch(() => {
            comprobar(
              false,
              `${tramo.nombre} · estado ${estado.numero}: el archivo no cambia la pantalla de Taller`
            );
            return null;
          });
        const cambiado = await page.$('.taller-caja, .taller-aviso');
        if (!cambiado) {
          await page.close();
          continue;
        }
        await page.waitForTimeout(300);
      }

      const texto = await textoTaller(page);

      comprobar(
        texto.includes(estado.texto),
        `${tramo.nombre} · estado ${estado.numero} (${estado.etiqueta}): se ve su mensaje`
      );

      // El estado 3 no puede llevar ningún número, y el 4 tampoco: son los dos
      // estados en los que la calculadora no sabe, y un `0` de relleno se vería
      // como un resultado legítimo.
      if (estado.numero === 3 || estado.numero === 4) {
        const resultado = await textoResultado(page);
        comprobar(
          resultado === null,
          `${tramo.nombre} · estado ${estado.numero}: no enseña ningún número`
        );
        comprobar(
          !/\d+[,.]?\d*\s*€/.test(texto),
          `${tramo.nombre} · estado ${estado.numero}: no enseña ningún euros`
        );
      }

      // El 4 tiene que tener el campo del precio, y es el primero que lo tiene.
      if (estado.numero === 4) {
        const hayCampo = await page.$('.taller-input');
        comprobar(!!hayCampo, `${tramo.nombre} · estado 4: aparece el campo del precio`);
      }

      // Y el 4 no puede tener campo antes de tener gramos, que es lo que hace
      // que el orden importa.
      if (estado.numero === 1 || estado.numero === 2 || estado.numero === 3) {
        const hayCampo = await page.$('.taller-input');
        comprobar(!hayCampo, `${tramo.nombre} · estado ${estado.numero}: no pide el precio todavía`);
      }

      const sobra = await seSale(page);
      comprobar(
        sobra <= 0,
        `${tramo.nombre} · estado ${estado.numero}: la caja no recorta (sobran ${sobra}px)`
      );

      await page.close();
    }

    // --- Estado 5: la aritmética, los tres formatos y los tres precios malos ---
    const page = await browser.newPage({ viewport: { width: tramo.width, height: tramo.height } });
    await page.goto('http://127.0.0.1:4173/taller');
    if (!(await esperarOMarcar(page, '.taller',
      `${tramo.nombre} · estado 5: /taller no pinta la vista de Taller`))) {
      await page.close();
      continue;
    }
    await page.setInputFiles('input[type="file"]', GCODE_FIXTURE);
    if (!(await esperarOMarcar(page, '.taller-gramos',
      `${tramo.nombre} · estado 5: el G-code no enseña los gramos`))) {
      await page.close();
      continue;
    }

    // Los gramos salen del G-code, y son 0,93.
    const gramos = await page.$eval('.taller-gramos strong', (el) => el.textContent.trim());
    comprobar(
      gramos === '0,93 g',
      `${tramo.nombre} · estado 5: los gramos del G-code se ven como 0,93 g (vienen: ${gramos})`
    );

    // El resultado antes de escribir el precio: no hay ninguno.
    comprobar(
      (await textoResultado(page)) === null,
      `${tramo.nombre} · estado 5: sin precio no hay resultado`
    );

    // --- Los tres formatos de entrada, y la coma en la salida ---
    for (const entrada of ['25', '25,00', '25.00']) {
      await page.fill('.taller-input', entrada);
      const resultado = await textoResultado(page);
      comprobar(
        resultado === LINEA_ESPERADA,
        `${tramo.nombre} · «${entrada}» → ${LINEA_ESPERADA} (sale: ${resultado})`
      );
    }

    // El punto como decimal, y no como millares: `1.234` son 1,234 €/kg, y el
    // coste sale de ahí. Es lo contrario de un millares, que daría 1000 veces más.
    await page.fill('.taller-input', '1.234');
    const conPunto = await textoResultado(page);
    const esperadoConPunto = (GRAMOS * 1.234 / 1000).toFixed(2).replace('.', ',');
    comprobar(
      conPunto === `0,93 g × 1,23 €/kg = ${esperadoConPunto} €`,
      `${tramo.nombre} · «1.234» son 1,234 €/kg y no mil doscientos treinta y cuatro`
    );

    // La coma: `0,25` y `0.25` tienen que ser el mismo precio.
    for (const entrada of ['0,25', '0.25']) {
      await page.fill('.taller-input', entrada);
      const resultado = await textoResultado(page);
      const esperado = (GRAMOS * 0.25 / 1000).toFixed(2).replace('.', ',');
      comprobar(
        resultado === `0,93 g × 0,25 €/kg = ${esperado} €`,
        `${tramo.nombre} · «${entrada}» es el mismo precio que su equivalente con punto`
      );
    }

    // --- Los tres precios que no valen ---
    //
    // Y uno que sí vale, que antes estaba en esta lista por error: `1.234` con
    // punto es **1,234 €/kg**, no mil doscientos treinta y cuatro. El diseño dice
    // «acepta coma y punto en la entrada» y «sin separador de miles», y de las
    // dos cosas se sigue que el punto es decimal; el millares no está admitido
    // ni en la entrada ni en la salida. La prueba decía lo contrario porque le
    // copié el miedo de mi propio comentario en vez de la regla del diseño.
    for (const malo of ['0', '-5', 'abc', '1,2,3', '12a']) {
      // Se parte de un precio bueno, para comprobar que el resultado anterior
      // desaparece y no se queda pegado.
      await page.fill('.taller-input', '25');
      await page.waitForSelector('.taller-resultado');
      await page.fill('.taller-input', malo);

      const marcado = await page.$('.taller-input[aria-invalid="true"]');
      comprobar(!!marcado, `${tramo.nombre} · «${malo}»: el campo queda marcado como inválido`);

      const resultado = await textoResultado(page);
      comprobar(
        resultado === null,
        `${tramo.nombre} · «${malo}»: el resultado anterior desaparece`
      );

      const texto = await textoTaller(page);
      comprobar(
        !/\d+[,.]?\d*\s*€/.test(texto),
        `${tramo.nombre} · «${malo}»: no queda ningún euros en pantalla`
      );
    }

    const sobra = await seSale(page);
    comprobar(sobra <= 0, `${tramo.nombre} · estado 5 con resultado: la caja no recorta`);

    await page.close();
  }
} finally {
  await browser.close();
  if (preview) preview.kill();
}

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  FALLA  ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
