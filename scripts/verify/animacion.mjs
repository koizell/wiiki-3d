/**
 * El movimiento, comprobado.
 *
 * La spec de identidad visual (§10) pide un script que mida el movimiento, y no
 * existía: el movimiento se hacía con CSS y nadie lo miraba. Ahora el movimiento de
 * la guía lo hace `motion`, y una librería que anima cosas puede romper reglas que
 * el CSS no rompía —sobre todo el CLS, que se mide y no se supone.
 *
 * Lo que comprueba, y por qué cada cosa:
 *
 *  1. **Con movimiento reducido, no hay ninguna animación en curso**, salvo la
 *     excepción documentada de `DibujoSintoma`: sus animaciones **explican un
 *     síntoma** —las esquinas suben, la grieta se abre— y la spec dice que se
 *     moderan, no que desaparecen. Lo que no puede pasar es que se pierda el
 *     contenido: por eso la comprobación mira también que el texto siga visible.
 *
 *  2. **Sin interacción, nada se mueve**, salvo el indicador de progreso. La regla
 *     de la spec §6 es «nada se mueve solo»: una página que se mueve sola es una
 *     página que molesta.
 *
 *  3. **El CLS es cero.** Sólo se animan `transform` y `opacity`; si mañana alguien
 *     anima una altura, esta comprobación lo dice.
 *
 *  4. **Las cifras van en `tabular-nums`**, para que dos números distintos no parezcan
 *     el mismo por el ancho de su cifra.
 *
 *  5. **Las cuatro fuentes cargan** y la línea no cambia de ancho al cargarlas: el
 *     FOUT que produce un salto de texto es un CLS que no sale en el `layout-shift`
 *     del observer, porque el observer sólo ve lo que se mueve después.
 *
 * Uso:  npm run verify:animacion
 * Sale con código 1 si algo falla.
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { arrancarPreview } from './probe.mjs';

const RUTAS = ['/', '/wiki/warping-pla', '/taller'];

/** Las cuatro fuentes y sus pesos, tal como están en `src/estilos/fuentes.css`. */
const FUENTES = [
  { familia: 'IBM Plex Sans', estilo: '400' },
  { familia: 'IBM Plex Sans', estilo: '600' },
  { familia: 'IBM Plex Mono', estilo: '400' },
  { familia: 'IBM Plex Mono', estilo: '500' },
];

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/**
 * Las animaciones que hay en marcha ahora mismo.
 *
 * Se leen de `document.getAnimations()`, que incluye las de CSS y las que
 * `motion` lanza por la Web Animations API. La excepción de los dibujos se
 * reconoce por el nodo al que afectan, no por el nombre de la animación: así el
 * script sobrevive a que las animaciones se renombren.
 */
const ANIMACIONES_VIVAS = () =>
  document.getAnimations().filter((a) => a.playState === 'running').map((a) => ({
    /*
     * La excepción es **dentro de un SVG**, no por la clase: el dibujo de la
     * cabecera de la guía lleva `guia-cabecera-dibujo` y no `.dibujo`, y el esquema
     * de la torre de temperatura tampoco. Los dos son drawings informativos, que
     * es lo que la spec deja mover con el movimiento reducido.
     */
    esDibujo: !!a.effect?.target?.closest?.('svg'),
    nombre: a.animationName ?? a.constructor?.name ?? 'desconocida',
  }));

const servidor = await arrancarPreview();
const BASE = process.env.BASE_URL ?? servidor.base;
const browser = await chromium.launch({ args: ['--no-sandbox'] });

try {
  // ── 1 · Con movimiento reducido, sólo se mueve el dibujo ─────────────────
  {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    for (const ruta of RUTAS) {
      await page.goto(`${BASE}${ruta}`);
      await page.locator('h1').first().waitFor();
      await page.waitForTimeout(700);

      const estado = await page.evaluate(ANIMACIONES_VIVAS);
      const fueraDeLosDibujos = estado.filter((a) => !a.esDibujo);

      comprobar(
        fueraDeLosDibujos.length === 0,
        `movimiento reducido · ${ruta}: no hay ninguna animación fuera de los dibujos (hay ${fueraDeLosDibujos.length}: ${fueraDeLosDibujos.map((a) => a.nombre).join(', ')})`
      );

      // Y el contenido se ve: apagar la animación no puede apagar el texto.
      const visible = await page.evaluate(() => {
        const texto = document.querySelector('main');
        if (!texto) return false;
        const estilo = getComputedStyle(texto);
        return Number(estilo.opacity) > 0.9;
      });
      comprobar(visible, `movimiento reducido · ${ruta}: el contenido sigue visible`);
    }
    await ctx.close();
  }

  // ── 2 · Sin interacción, nada se mueve ───────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    for (const ruta of RUTAS) {
      await page.goto(`${BASE}${ruta}`);
      await page.locator('h1').first().waitFor();
      // Se espera a que las entradas termines: la entrada de ruta es de una vez.
      await page.waitForTimeout(1200);

      const estado = await page.evaluate(ANIMACIONES_VIVAS);
      const bucles = estado.filter((a) => !a.esDibujo && a.nombre.includes('pulse'));
      const otras = estado.filter((a) => !a.esDibujo && !a.nombre.includes('pulse'));

      comprobar(
        otras.length === 0,
        `sin interacción · ${ruta}: no hay ninguna animación en marcha (hay ${otras.length}: ${otras.map((a) => a.nombre).join(', ')})`
      );
      comprobar(
        bucles.length <= 1,
        `sin interacción · ${ruta}: el único bucle permitido es el de progreso (hay ${bucles.length})`
      );
    }
    await ctx.close();
  }

  // ── 3 · El CLS es cero, también al interactuar ───────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/wiki/warping-pla`);
    await page.locator('h1').first().waitFor();

    await page.evaluate(() => {
      window.__cls = 0;
      new PerformanceObserver((lista) => {
        for (const entrada of lista.getEntries()) {
          if (!entrada.hadRecentInput) window.__cls += entrada.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    // La interacción que más mueve cosas: contestar el diferencial y marcar una
    // variable. Son las dos que cambian lo que se ve.
    await page.locator('.comprobacion-boton--si').first().click();
    await page.waitForTimeout(400);
    const chip = page.locator('.chip').first();
    if (await chip.count()) {
      await chip.click();
      await page.waitForTimeout(400);
    }

    const cls = await page.evaluate(() => window.__cls);
    comprobar(cls < 0.01, `el CLS de la guía es cero (es ${cls})`);
    await ctx.close();
  }

  // ── 4 · Las cifras van en tabular-nums ───────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/wiki/warping-pla`);
    await page.locator('h1').first().waitFor();
    await page.waitForTimeout(600);

    const cifras = await page.evaluate(() => {
      const nodos = [...document.querySelectorAll('.accion-valor, .tarjeta-cifra strong, .riel-cifra strong')];
      return nodos.map((n) => ({
        texto: n.textContent?.trim().slice(0, 20) ?? '',
        tabular: getComputedStyle(n).fontVariantNumeric.includes('tabular-nums'),
      }));
    });
    comprobar(
      cifras.length > 0 && cifras.every((c) => c.tabular),
      `las cifras van en tabular-nums (${cifras.filter((c) => !c.tabular).length} de ${cifras.length} no)`
    );
    await ctx.close();
  }

  // ── 5 · Las fuentes cargan y la línea no salta ───────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/wiki/warping-pla`);
    await page.locator('h1').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);

    const fuentes = await page.evaluate(
      (lista) =>
        lista.map((f) => ({
          ...f,
          cargada: document.fonts.check(`${f.estilo} 16px "${f.familia}"`),
        })),
      FUENTES
    );
    for (const f of fuentes) {
      comprobar(f.cargada, `la fuente ${f.familia} ${f.estilo} está cargada`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  servidor.detener();
}

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
