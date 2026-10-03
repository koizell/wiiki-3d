/**
 * Comprobación del enrutado con teclado.
 *
 * `teclado.mjs` mide el orden de tabulación de la pantalla de subida. Este
 * script mide lo que sólo aparece cuando hay cuatro rutas, y lo hace en los
 * cuatro tramos de ancho en lugar de en uno, porque el indicador del estado
 * activo cambia de orientación con el layout: `border-top` en la barra inferior de
 * móvil y `border-left` en la columna de ≥768px.
 *
 * Las comprobaciones, en orden:
 *
 *  1. Los cuatro enlaces de navegación son `<a href>` con `tabIndex` >= 0.
 *  2. Un recorrido con Tab los alcanza, y en el orden de las rutas.
 *  3. Enter sobre cada uno navega a su ruta.
 *  4. `aria-current="page"` está en el enlace de la ruta activa y **sólo** en él.
 *  5. El enlace activo tiene foco visible por dentro de su fondo.
 *
 * El punto 2 es el que importa: un enlace que no está en el orden de tabulación
 * existe igual y se ve igual, y aun así es inalcanzable con teclado. El punto 4
 * protege el atributo que sustituyó a la clase `.active`: si React Router no lo
 * pusiera donde debe, lo que se ve y lo que anuncia un lector de pantalla se
 * separarían.
 *
 * No carga ningún archivo: el enrutado no depende del estado del análisis. La
 * persistencia del archivo entre rutas la comprueba `teclado.mjs`, con el G-code
 * cargado.
 *
 * Uso:  node scripts/verify/rutas.mjs
 * Sale con código 1 si algo falla.
 */

import { chromium } from 'playwright';
import { startPreview } from './probe.mjs';

/** Las cuatro rutas de la app, con la etiqueta que debe verse en su enlace. */
const RUTAS = [
  { path: '/', etiqueta: 'Inicio' },
  { path: '/taller', etiqueta: 'Taller' },
  { path: '/wiki', etiqueta: 'Wiki 3D' },
  { path: '/proyectos', etiqueta: 'Proyectos' },
];

/**
 * Los cuatro tramos de ancho, uno por cada breakpoint del layout.
 *
 * No son los 29 del barrido: aquí lo que cambia entre tramos es el indicador del
 * estado activo y la disposición de la navegación, y con un viewport por tramo se
 * cubren los tres cortes.
 */
const TRAMOS = [
  { nombre: 'movil <640', width: 375, height: 667 },
  { nombre: '640-767', width: 700, height: 900 },
  { nombre: '768-1199', width: 900, height: 900 },
  { nombre: '>=1200', width: 1280, height: 800 },
];

/** Estado del enrutado tal como lo ve la página. Se evalúa dentro del navegador. */
function probeRutas() {
  const navLinks = [...document.querySelectorAll('.nav-item')];
  return {
    path: location.pathname,
    navLinks: navLinks.map((el) => ({
      href: el.getAttribute('href'),
      tag: el.tagName,
      text: (el.textContent || '').trim(),
      tabIndex: el.tabIndex,
      ariaCurrent: el.getAttribute('aria-current'),
      // `outline` se dibuja fuera del elemento, así que un `outline-offset`
      // negativo lo mete hacia dentro y no lo tapa el vecino con fondo.
      outlineWidth: getComputedStyle(el).outlineWidth,
      outlineStyle: getComputedStyle(el).outlineStyle,
      outlineOffset: getComputedStyle(el).outlineOffset,
    })),
    // El enlace activo, para comparar con `path`.
    current: navLinks.filter((el) => el.getAttribute('aria-current') === 'page')
      .map((el) => el.getAttribute('href')),
    // Contenido de la ruta activa, para confirmar que pinta algo.
    h1: (() => {
      const el = document.querySelector('.canvas-area h1');
      return el ? el.textContent.trim() : null;
    })(),
    canvasAreaHasContent: !!document.querySelector('.canvas-area')?.children.length,
  };
}

/**
 * Foco visible en el enlace indicado, alcanzado con Tab de verdad.
 *
 * Tres detalles que hacen que esto mida la regla de CSS y no otra cosa:
 *
 *  - Se llega con pulsaciones de Tab, no con `page.focus()`. Un foco
 *    programático no dispara `:focus-visible`, así que con `focus()` se
 *    mediría el anillo por defecto del navegador y la comprobación pasaría
 *    aunque la regla no existiera.
 *  - Se espera a que termine la transición. `.nav-item` tiene
 *    `transition: all 0.15s`, y leer el estilo calculado en mitad de la
 *    transición devuelve el valor interpolado: midiendo sin esperar salía
 *    `3px solid` (el anillo del navegador) cuando la regla de la app ya estaba
 *    puesta.
 *  - Se comprueba el color, no sólo que haya outline. El anillo por defecto de
 *    Chromium es de otro color y de otro grosor, así que comparar color y
 *    grosor distingue la regla de la app del anillo genérico.
 */
async function outlineDeEnfocado(page, href) {
  await page.evaluate(() => document.body.focus());
  let measured = null;
  for (let i = 0; i < 12 && !measured; i++) {
    await page.keyboard.press('Tab');
    const at = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute?.('href') ?? null;
    });
    if (at === href) {
      await page.waitForTimeout(400); // que acabe `transition: all .15s`
      measured = await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        const activo = el.getAttribute('aria-current') === 'page';
        return {
          href: el.getAttribute('href'),
          focusVisible: el.matches(':focus-visible'),
          outlineWidth: parseFloat(cs.outlineWidth),
          outlineStyle: cs.outlineStyle,
          outlineColor: cs.outlineColor,
          outlineOffset: cs.outlineOffset,
          // El fondo que el outline tiene que Contrastar: el del propio enlace si
          // es el activo, y el del body si no. Se mide porque lo que se quiere
          // comprobar es que el anillo se ve *sobre* ese fondo, no que exista.
          fondo: cs.backgroundColor,
          esElEnlaceActivo: activo,
        };
      });
    }
  }
  return measured;
}

async function main() {
  const BASE = (await startPreview()) ?? 'http://127.0.0.1:4173';
  const browser = await chromium.launch();
  const failures = [];
  const lines = [];

  const check = (name, ok, detail) => {
    lines.push((ok ? 'OK    ' : 'FALLA ') + name + (detail ? '  -> ' + detail : ''));
    if (!ok) failures.push(name);
  };

  for (const tramo of TRAMOS) {
    const context = await browser.newContext({
      viewport: { width: tramo.width, height: tramo.height },
      colorScheme: 'dark',
    });
    const page = await context.newPage();

    lines.push('');
    lines.push('='.repeat(74));
    lines.push(`${tramo.nombre}  (${tramo.width}x${tramo.height})`);
    lines.push('='.repeat(74));

    await page.goto(BASE + '/', { waitUntil: 'networkidle' });

    // --- Check 1: los cuatro enlaces son focables y son enlaces de verdad ---
    const inicial = await page.evaluate(probeRutas);
    const todosFocables = inicial.navLinks.every(
      (el) => el.tag === 'A' && el.tabIndex >= 0 && el.href
    );
    check(
      `[${tramo.nombre}] los cuatro enlaces de navegación son <a href> focables`,
      todosFocables && inicial.navLinks.length === 4,
      inicial.navLinks.map((el) => `<${el.tag} href="${el.href}" tabIndex=${el.tabIndex}>`).join(' ')
    );

    // --- Check 2: el recorrido con Tab los alcanza, en orden ---
    await page.evaluate(() => document.body.focus());
    const alcanzados = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const at = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          isNav: el.classList?.contains?.('nav-item') ?? false,
          href: el.getAttribute?.('href') ?? null,
          tag: el.tagName,
        };
      });
      if (at.isNav) alcanzados.push(at.href);
      if (at.tag === 'BODY') break;
    }
    const ordenEsperado = RUTAS.map((r) => r.path);
    check(
      `[${tramo.nombre}] el recorrido con Tab alcanza los cuatro enlaces, en orden`,
      JSON.stringify(alcanzados) === JSON.stringify(ordenEsperado),
      alcanzados.length ? alcanzados.join(' -> ') : 'ninguno alcanzado'
    );

    // --- Check 3: Enter navega a cada ruta ---
    for (const ruta of RUTAS) {
      await page.goto(BASE + '/', { waitUntil: 'networkidle' });
      await page.focus(`a.nav-item[href="${ruta.path}"]`);
      await page.keyboard.press('Enter');
      await page.waitForFunction(
        (p) => location.pathname === p,
        ruta.path,
        { timeout: 5000 }
      ).catch(() => {});
      const actual = await page.evaluate(() => location.pathname);
      const h1 = await page.evaluate(() => {
        const el = document.querySelector('.canvas-area h1');
        return el ? el.textContent.trim() : null;
      });
      check(
        `[${tramo.nombre}] Enter sobre "${ruta.etiqueta}" navega a ${ruta.path}`,
        actual === ruta.path,
        `pathname=${actual}${h1 ? ` h1="${h1}"` : ''}`
      );
    }

    // --- Check 4: aria-current en la ruta activa y sólo en ella ---
    for (const ruta of RUTAS) {
      await page.goto(BASE + ruta.path, { waitUntil: 'networkidle' });
      const s = await page.evaluate(probeRutas);
      const soloUno = s.current.length === 1 && s.current[0] === ruta.path;
      check(
        `[${tramo.nombre}] en ${ruta.path}, aria-current="page" está sólo en su enlace`,
        soloUno,
        `marcan ${s.current.length === 0 ? 'ninguno' : s.current.join(', ')} (esperado ${ruta.path})`
      );
    }

    // --- Check 5: foco visible en el enlace activo, en los cuatro tramos ---
    //
    // Se mide sobre el enlace **activo**, que es el caso difícil: con
    // `background: var(--bg-hover)` puesto, el anillo dibujado hacia fuera cae en
    // el fondo y se pierde. Por eso la comprobación exige el offset negativo, y
    // no sólo que haya anillo.
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const foco = await outlineDeEnfocado(page, '/');
    const visible = foco?.outlineStyle !== 'none' && foco?.outlineWidth > 0;
    const haciaDentro = parseFloat(foco?.outlineOffset) < 0;
    // El anillo por defecto de Chromium es de otro color y otro grosor, así que
    // comparar color y grosor distingue la regla de la app del anillo genérico.
    const esLaReglaDeLaApp = foco?.outlineColor === 'rgb(96, 165, 250)'; // --accent-text
    check(
      `[${tramo.nombre}] el enlace activo tiene foco visible y dentro del fondo`,
      Boolean(
        visible && haciaDentro && esLaReglaDeLaApp && foco?.focusVisible && foco?.esElEnlaceActivo
      ),
      foco
        ? `outline ${foco.outlineWidth}px/${foco.outlineStyle} color ${foco.outlineColor} ` +
          `offset ${foco.outlineOffset} sobre fondo ${foco.fondo} · :focus-visible=${foco.focusVisible}` +
          (visible ? '' : ' *** SIN ANILLO ***') +
          (haciaDentro ? '' : ' *** OFFSET NO NEGATIVO: el vecino lo tapa ***') +
          (esLaReglaDeLaApp ? '' : ' *** NO ES LA REGLA DE LA APP ***') +
          (foco.esElEnlaceActivo ? '' : ' *** NO ES EL ENLACE ACTIVO ***')
        : 'no se alcanzó el enlace con Tab'
    );

    await context.close();
  }

  await browser.close();

  console.log(lines.join('\n'));
  console.log('\n' + '='.repeat(74));
  if (failures.length) {
    console.log(`FALLAN ${failures.length}:`);
    for (const f of failures) console.log('  - ' + f);
    process.exitCode = 1;
  } else {
    console.log('TODAS LAS COMPROBACIONES PASAN');
  }
}

await main();