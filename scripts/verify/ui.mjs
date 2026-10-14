/**
 * La auditoría de la interfaz, repetible.
 *
 * El 14 de octubre de 2026 se hizo una auditoría UI/UX a mano: 11 rutas en tres
 * anchos, 33 capturas, y un puñado de comprobaciones sueltas sobre `/maquinas`.
 * Todo eso se hizo con un script de un solo uso, así que **la siguiente
 * regresión no la iba a ver nadie**. Este fichero es ese script, puesto en el
 * repo y con sus comprobaciones numeradas.
 *
 * Lo que mide, y por qué cada cosa:
 *
 *  1. **Cada ruta, en cada ancho.** Un solo `<h1>` por ruta, sin desbordamiento
 *     horizontal del documento, y sin excepciones de JavaScript. Un `scrollWidth`
 *     mayor que el viewport es el fallo que más veces se ha visto en este
 *     proyecto y el que menos se nota en una captura de escritorio.
 *
 *  2. **Las fichas caben en su tarjeta.** No mide píxeles de una captura: mide
 *     si cada `dt`/`dd` de la ficha cae dentro del rectángulo del `<article>`.
 *     Fue el fallo real de esta semana —a 768 px la ficha tenía 115 px de ancho
 *     dentro de una tarjeta de 492—, y no se veía en ninguna otra medida.
 *
 *  3. **Las ocho ilustraciones tienen nombre.** El `<title>` tiene que ser
 *     hijo directo del `<svg>`; si vive dentro de un `<g>`, los lectores de
 *     pantalla anuncian las ocho como imagen sin nombre. Se comprueba con el
 *     árbol de accesibilidad, no con el marcado.
 *
 *  4. **El contraste, calculado.** El color de fondo y el de texto se leen de
 *     los estilos computados y se pasa por la fórmula del WCAG. No hay
 *     «a ojo»: el botón de peligro dio 3,76:1 con blanco y 4,83:1 con el rojo
 *     oscuro, y esa es la diferencia entre aprobar y no.
 *
 *  5. **Lo que la auditoría dejó pendiente sigue pendiente.** El resumen del
 *     selector, la pausa de animaciones y el movimiento reducido: si alguien
 *     las rompe, este script lo dice.
 *
 * Uso:  npm run verify:ui
 *        BASE_URL=http://127.0.0.1:5199 npm run verify:ui   (contra un servidor vivo)
 * Sale con código 1 si algo falla.
 */

import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { arrancarPreview } from './probe.mjs';

const RUTAS = [
  '/',
  '/maquinas',
  '/wiki',
  '/wiki/warping-pla',
  '/taller',
  '/proyectos',
  '/historial',
  '/privacidad',
  '/acerca-de',
  '/contacto',
  '/autor',
];

/** Los tres anchos de la auditoría, con el mismo nombre que usan los otros scripts. */
const TRAMOS = [
  { nombre: 'movil 375', width: 375, height: 667 },
  { nombre: 'tableta 768', width: 768, height: 900 },
  { nombre: 'escritorio 1440', width: 1440, height: 900 },
];

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/** Luminancia relativa de un color (`#hex` o `rgb(...)`), para el contraste del WCAG. */
function luminancia(color) {
  const c = color.trim();
  let r, g, b;
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    const largo = hex.length === 3 ? [...hex].map((x) => x + x).join('') : hex;
    r = parseInt(largo.slice(0, 2), 16);
    g = parseInt(largo.slice(2, 4), 16);
    b = parseInt(largo.slice(4, 6), 16);
  } else {
    [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
  }
  const canal = (v) => {
    const n = v / 255;
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

function contraste(delante, fondo) {
  const a = luminancia(delante);
  const b = luminancia(fondo);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const servidor = await arrancarPreview();
const BASE = process.env.BASE_URL ?? servidor.base;
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const erroresDePagina = [];

try {
  // ── 1 · Cada ruta, en cada ancho ─────────────────────────────────────────
  for (const tramo of TRAMOS) {
    const page = await browser.newPage({ viewport: { width: tramo.width, height: tramo.height } });
    page.on('pageerror', (e) => erroresDePagina.push(`${tramo.nombre}: ${e.message}`));

    for (const ruta of RUTAS) {
      await page.goto(`${BASE}${ruta}`);
      await page.locator('h1').first().waitFor();

      const estado = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        desborda: document.documentElement.scrollWidth > window.innerWidth,
        main: !!document.querySelector('main'),
      }));

      comprobar(estado.h1 === 1, `${tramo.nombre} · ${ruta}: un solo <h1> (hay ${estado.h1})`);
      comprobar(!estado.desborda, `${tramo.nombre} · ${ruta}: la página no se desplaza en horizontal`);
      comprobar(estado.main, `${tramo.nombre} · ${ruta}: hay <main>`);
    }
    await page.close();
  }

  // ── 2 y 3 · Las fichas y los nombres del catálogo ─────────────────────────
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 900 } });
    await page.goto(`${BASE}/maquinas`);
    await page.locator('.maquina').first().waitFor();

    const tarjetas = await page.$$eval('article.maquina', (els) =>
      els.map((el) => {
        const caja = el.getBoundingClientRect();
        const campos = [...el.querySelectorAll('dt, dd')];
        return {
          modelo: el.querySelector('h2')?.textContent?.trim() ?? '?',
          campos: campos.length,
          desbordan: campos.filter((x) => {
            const r = x.getBoundingClientRect();
            return r.left < caja.left - 1 || r.right > caja.right + 1 || r.bottom > caja.bottom + 1;
          }).length,
          fichaAncho: Math.round(el.querySelector('.maquina-ficha').getBoundingClientRect().width),
        };
      })
    );

    comprobar(tarjetas.length === 8, `/maquinas: hay 8 fichas (hay ${tarjetas.length})`);
    for (const t of tarjetas) {
      comprobar(
        t.desbordan === 0,
        `/maquinas · ${t.modelo}: los ${t.campos} campos caben en la tarjeta (desbordan ${t.desbordan})`
      );
    }
    // La ficha más estrecha de la auditoría fue 115 px a 768. Con la rejilla
    // auto-fit tiene que pasar de 240 px holgadamente.
    const masEstrecha = Math.min(...tarjetas.map((t) => t.fichaAncho));
    comprobar(masEstrecha > 240, `/maquinas: la ficha más estrecha mide ${masEstrecha}px (> 240)`);

    // El nombre accesible se mira en el árbol de accesibilidad, no en el marcado.
    const arbol = await page.locator('.maquinas-lista').ariaSnapshot();
    const imagenes = arbol.match(/img "/g) ?? [];
    comprobar(imagenes.length === 8, `/maquinas: las 8 ilustraciones tienen nombre (${imagenes.length})`);

    // ── 5 · Lo que la auditoría dejó pendiente sigue funcionando ────────────
    const estadoInicial = await page.getByRole('status').innerText();
    comprobar(
      /Sin comparar filamento/.test(estadoInicial),
      `/maquinas: el resumen empieza sin filamento elegido`
    );

    await page.locator('#maquinas-fil').selectOption('abs-gen');
    const estadoAbs = await page.getByRole('status').innerText();
    comprobar(
      /ABS/.test(estadoAbs) && /por revisar/.test(estadoAbs),
      `/maquinas: al elegir ABS el resumen lo dice («${estadoAbs.trim()}»)`
    );

    await page.locator('#maquinas-fil').selectOption('');
    comprobar(
      /Sin comparar/.test(await page.getByRole('status').innerText()),
      `/maquinas: se puede volver al estado neutro`
    );

    await page.locator('.maquina-fuentes summary').first().click();
    comprobar(
      await page.locator('.maquina-fuentes').first().getByRole('link').first().isVisible(),
      '/maquinas: las fuentes de la ficha se despliegan'
    );

    const giro = page.locator('.maquina-svg .giro').first();
    await page.getByRole('button', { name: 'Pausar animaciones' }).click();
    comprobar(
      (await giro.evaluate((el) => getComputedStyle(el).animationPlayState)) === 'paused',
      '/maquinas: la pausa detiene la animación'
    );
    await page.getByRole('button', { name: 'Reanudar animaciones' }).click();
    comprobar(
      (await giro.evaluate((el) => getComputedStyle(el).animationPlayState)) === 'running',
      '/maquinas: la animación se reanuda'
    );
    await page.close();
  }

  // ── 4 · El contraste, calculado ──────────────────────────────────────────
  {
    const page = await browser.newPage();
    await page.goto(`${BASE}/maquinas`);

    const colores = await page.evaluate(() => {
      const raiz = getComputedStyle(document.documentElement);
      return {
        peligroTexto: raiz.getPropertyValue('--danger-hover').trim(),
        tenue: raiz.getPropertyValue('--text-tertiary').trim(),
        fondo: raiz.getPropertyValue('--bg-dark').trim(),
      };
    });

    // Blanco sobre el rojo oscuro del botón: 4,83:1. El umbral de WCAG AA para
    // texto normal es 4,5:1.
    const ratioBoton = contraste('#ffffff', colores.peligroTexto);
    comprobar(ratioBoton >= 4.5, `contraste del botón de peligro: ${ratioBoton.toFixed(2)}:1 (>= 4,5)`);

    // El texto «no aplica», con --text-tertiary sobre el fondo del documento.
    const ratioTenue = contraste(colores.tenue, colores.fondo);
    comprobar(ratioTenue >= 4.5, `contraste del texto tenue: ${ratioTenue.toFixed(2)}:1 (>= 4,5)`);

    await page.close();
  }

  // ── 6 · Movimiento reducido ──────────────────────────────────────────────
  {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    await page.goto(`${BASE}/maquinas`);
    await page.locator('.maquina-svg .giro').first().waitFor();
    const animacion = await page
      .locator('.maquina-svg .giro')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName);
    comprobar(
      animacion === 'none',
      `movimiento reducido: la animación se apaga (animation-name: ${animacion})`
    );
    const botonPausa = page.getByRole('button', { name: 'Pausar animaciones' });
    comprobar(
      (await botonPausa.count()) === 0 || !(await botonPausa.first().isVisible()),
      'movimiento reducido: no se ofrece el control de pausa'
    );
    await page.close();
  }

  comprobar(erroresDePagina.length === 0, `sin excepciones de JavaScript (${erroresDePagina.length})`);
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
