/**
 * Auditoría de accesibilidad de los controles disparadores.
 *
 * Comprueba que las acciones principales de la app son alcanzables con teclado,
 * no sólo con ratón. Hoy hay tres rutas de disparo de un fichero —dos `<label>`
 * y el `<input type="file">`— y sólo una cuenta si el input está en el orden de
 * tabulación.
 *
 * Uso:  node scripts/verify/teclado.mjs
 * Sale con código 1 si algún disparador no es alcanzable con Tab.
 */

import { chromium } from 'playwright';
import { startPreview } from './probe.mjs';

/** Selector de todo lo que un Tab puede alcanzar. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

async function main() {
  const BASE = (await startPreview()) ?? 'http://127.0.0.1:4173';

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  const report = await page.evaluate((sel) => {
    const input = document.querySelector('#file-upload');
    const labels = [...document.querySelectorAll('label[for="file-upload"]')];
    return {
      inputExists: !!input,
      inputDisplay: input ? getComputedStyle(input).display : null,
      // `display: none` saca el elemento del orden de tabulación. Un elemento
      // enfocable necesita estar rendered, no sólo existir.
      inputTabIndex: input ? input.tabIndex : null,
      labels: labels.map((l) => ({
        tag: l.tagName,
        text: l.textContent.trim(),
        tabIndex: l.tabIndex,
        // Un `<label>` no es enfocable por defecto en ningún navegador.
        focusable: l.tabIndex >= 0,
      })),
      focusables: [...document.querySelectorAll(sel)].map((e) => ({
        tag: e.tagName,
        cls: e.className || null,
        text: (e.textContent || '').trim().slice(0, 24),
      })),
      navItems: [...document.querySelectorAll('.nav-item')].map((el) => ({
        tag: el.tagName,
        role: el.getAttribute('role'),
        tabIndex: el.tabIndex,
        href: el.getAttribute('href'),
        onClick: el.getAttribute('onclick'),
      })),
    };
  }, FOCUSABLE);

  // Recorrer con Tab desde el principio y ver dónde cae el foco.
  const tabOrder = [];
  await page.evaluate(() => document.body.focus());
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const at = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tag: el.tagName,
        cls: el.className || null,
        id: el.id || null,
        text: (el.textContent || '').trim().slice(0, 24),
      };
    });
    tabOrder.push(at);
    if (at.tag === 'BODY') break;
  }

  await context.close();
  await browser.close();

  console.log('=== Disparador de subida de archivo ===');
  console.log(`  #file-upload existe:      ${report.inputExists}`);
  console.log(`  display:                  ${report.inputDisplay}`);
  console.log(`  tabIndex:                 ${report.inputTabIndex}`);
  console.log(`  alcanzable con Tab:       ${
    report.inputDisplay === 'none' ? 'NO (display:none la saca del orden)' : 'si'
  }`);
  for (const l of report.labels) {
    console.log(`  <label for> "${l.text}": tabIndex=${l.tabIndex}, enfocable=${l.focusable}`);
  }

  console.log('\n=== Orden de tabulación real ===');
  for (const [i, el] of tabOrder.entries()) {
    console.log(`  ${i + 1}. ${el.tag}${el.id ? '#' + el.id : ''}${
      el.cls ? '.' + String(el.cls).split(' ')[0] : ''
    } "${el.text}"`);
  }

  console.log('\n=== Elementos enfocables en la app ===');
  for (const el of report.focusables) {
    console.log(`  ${el.tag}${el.cls ? '.' + String(el.cls).split(' ')[0] : ''} "${el.text}"`);
  }

  console.log('\n=== Items de navegación ===');
  for (const el of report.navItems) {
    console.log(`  <${el.tag}> role=${el.role} tabIndex=${el.tabIndex} href=${el.href} onClick=${el.onClick}`);
  }

  // ---- Aserciones ----
  const failures = [];
  const check = (name, ok, detail) => {
    console.log((ok ? '\nOK    ' : '\nFALLA ') + name + (detail ? '  -> ' + detail : ''));
    if (!ok) failures.push(name);
  };

  check('el input de fichero es alcanzable con teclado',
    report.inputDisplay !== 'none',
    `display: ${report.inputDisplay}`);
  check('existe un disparador de subida enfocable',
    tabOrder.some((el) => el.id === 'file-upload'),
    `tabulación: ${tabOrder.map((el) => el.tag).join(' -> ')}`);
  check('los items de navegación son alcanzables con teclado',
    report.navItems.every((el) => el.tag !== 'LI' || el.tabIndex >= 0),
    report.navItems.map((el) => `${el.tag}[tabIndex=${el.tabIndex}]`).join(' '));

  if (failures.length) {
    console.log(`\nFALLAN: ${failures.join(' | ')}`);
    process.exitCode = 1;
  } else {
    console.log('\nTODAS LAS COMPROBACIONES PASAN');
  }
}

await main();