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
import { GCODE_FIXTURE } from './fixtures.mjs';
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

  // ---- Estado con un archivo cargado, para cubrir los controles que sólo
  // existen entonces (el botón "X") y comprobar que el foco se ve ----
  await page.setInputFiles('#file-upload', GCODE_FIXTURE);
  await page.waitForFunction(() => !!document.querySelector('.panel-body'), null, {
    timeout: 20000,
  });
  await page.waitForTimeout(1200);

  const tabOrderConArchivo = [];
  await page.evaluate(() => document.body.focus());
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const at = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: el.className || null,
        id: el.id || null,
        text: (el.textContent || '').trim().slice(0, 24),
        // Un foco que no se ve es un foco que el usuario no puede seguir.
        outlineWidth: cs.outlineWidth,
        outlineStyle: cs.outlineStyle,
        outlineColor: cs.outlineColor,
        boxShadow: cs.boxShadow === 'none' ? '' : cs.boxShadow,
      };
    });
    tabOrderConArchivo.push(at);
    if (at.tag === 'BODY') break;
  }

  // ---- Familia tipográfica de los botones ----
  const fonts = await page.evaluate(() => {
    const body = getComputedStyle(document.body).fontFamily;
    const btn = document.querySelector('.btn-primary');
    return {
      body,
      btn: btn ? getComputedStyle(btn).fontFamily : null,
      input: (() => {
        const el = document.querySelector('.upload-zone .btn-primary');
        return el ? getComputedStyle(el).fontFamily : null;
      })(),
    };
  });

  await context.close();
  await browser.close();

  const fmt = (el) =>
    `${el.tag}${el.id ? '#' + el.id : ''}${
      el.cls ? '.' + String(el.cls).split(' ')[0] : ''
    } "${el.text}"`;

  console.log('=== Disparador de subida de archivo ===');
  console.log(`  #file-upload existe:      ${report.inputExists}`);
  console.log(`  display:                  ${report.inputDisplay}`);
  console.log(`  tabIndex:                 ${report.inputTabIndex}`);
  console.log(`  alcanzable con Tab:       ${
    report.inputDisplay === 'none' ? 'NO (display:none la saca del orden)' : 'si'
  }`);
  console.log(`  por diseño:               display:none, se activa con .click() desde el botón`);
  for (const l of report.labels) {
    console.log(`  <label for> "${l.text}": tabIndex=${l.tabIndex}, enfocable=${l.focusable}`);
  }

  const botones = report.focusables.filter((el) => el.tag === 'BUTTON');
  console.log(`  <button> de subida:       ${botones.length ? botones.map((b) => `"${b.text}"`).join(', ') : 'NINGUNO'}`);

  console.log('\n=== Orden de tabulación: estado vacío ===');
  for (const [i, el] of tabOrder.entries()) console.log(`  ${i + 1}. ${fmt(el)}`);

  console.log('\n=== Orden de tabulación: con archivo cargado ===');
  for (const [i, el] of tabOrderConArchivo.entries()) console.log(`  ${i + 1}. ${fmt(el)}`);

  console.log('\n=== Foco visible (con archivo cargado) ===');
  for (const el of tabOrderConArchivo) {
    const visible = el.outlineStyle !== 'none' && parseFloat(el.outlineWidth) > 0;
    const sombra = el.boxShadow !== '';
    console.log(
      `  ${fmt(el).padEnd(42)} outline ${el.outlineWidth}/${el.outlineStyle}` +
      `   sombra ${sombra ? 'si' : 'no'}   ${visible || sombra ? 'FOCO VISIBLE' : '*** SIN INDICADOR'}`
    );
  }

  console.log('\n=== Elementos enfocables en la app ===');
  for (const el of report.focusables) {
    console.log(`  ${el.tag}${el.cls ? '.' + String(el.cls).split(' ')[0] : ''} "${el.text}"`);
  }

  console.log('\n=== Items de navegación ===');
  for (const el of report.navItems) {
    console.log(`  <${el.tag}> role=${el.role} tabIndex=${el.tabIndex} href=${el.href} onClick=${el.onClick}`);
  }

  console.log('\n=== Familia tipográfica de los botones ===');
  console.log(`  body:        ${fonts.body}`);
  console.log(`  .btn-primary: ${fonts.btn}`);
  console.log(
    `  coincide con la de la app: ${
      fonts.btn && fonts.btn === fonts.body ? 'SI' : '*** NO (falta font-family: inherit)'
    }`
  );

  // ---- Aserciones ----
  const failures = [];
  const check = (name, ok, detail) => {
    console.log((ok ? '\nOK    ' : '\nFALLA ') + name + (detail ? '  -> ' + detail : ''));
    if (!ok) failures.push(name);
  };

  const hayBotonSubida = botones.length > 0;
  check('el input de fichero se activa desde un <button> alcanzable',
    hayBotonSubida && tabOrder.some((el) => el.cls && String(el.cls).includes('btn-primary')),
    hayBotonSubida
      ? `tabulación: ${tabOrder.map((el) => el.tag + (el.cls ? '.' + String(el.cls).split(' ')[0] : '')).join(' -> ')}`
      : 'no hay ningún <button> de subida');

  check('el input oculto no es el único disparador',
    report.labels.length === 0,
    `${report.labels.length} <label for="file-upload"> restantes`);

  check('todos los controles alcanzables tienen foco visible',
    tabOrderConArchivo
      .filter((el) => el.tag !== 'BODY')
      .every((el) => (el.outlineStyle !== 'none' && parseFloat(el.outlineWidth) > 0) || el.boxShadow !== ''),
    tabOrderConArchivo
      .filter((el) => el.tag !== 'BODY' && el.outlineStyle === 'none' && el.boxShadow === '')
      .map(fmt)
      .join(', ') || 'todos con indicador');

  check('`.btn-primary` hereda la familia tipográfica de la app',
    !!fonts.btn && fonts.btn === fonts.body,
    fonts.btn || 'sin .btn-primary');

  // Antes del enrutado, los items de navegación eran `<li>` con un `onClick`: se
  // veían, ocupaban sitio y no eran alcanzables con teclado ni se podían abrir
  // en una pestaña nueva. Ahora tienen que ser enlaces de verdad. La condición
  // exige `<a>` con `href` y sin `role`, y no sólo que no sea un `<li>`: un
  // `<div role="link">` volvería a ser inalcanzable aunque pase el filtro de antes.
  check('los items de navegación son enlaces de verdad, alcanzables con teclado',
    report.navItems.length === 4 && report.navItems.every(
      (el) => el.tag === 'A' && el.href && el.role === null && el.tabIndex >= 0 && !el.onClick
    ),
    report.navItems.length
      ? report.navItems
          .map((el) => `<${el.tag}${el.href ? ` href="${el.href}"` : ''}${el.role ? ` role="${el.role}"` : ''} tabIndex=${el.tabIndex}${el.onClick ? ' onclick' : ''}>`)
          .join(' ')
      : 'no hay items de navegación');

  if (failures.length) {
    console.log(`\nFALLAN: ${failures.join(' | ')}`);
    process.exitCode = 1;
  } else {
    console.log('\nTODAS LAS COMPROBACIONES PASAN');
  }
}

await main();