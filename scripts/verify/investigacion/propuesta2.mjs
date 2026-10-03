import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdtempSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4173';
const OUT = mkdtempSync(join(tmpdir(), 'wiiki-investigacion-'));
const GCODE = join(import.meta.dirname, '../../..', 'test-fixtures', 'Argentina T-shirt medal_PLA_2m56s.gcode');

const R = '@media (min-width: 768px) and (max-width: 1199.98px)';

// Cuánto ocupa el "cromo" alrededor del visor dentro de su fila:
//   .file-info 70px (boton 44 + padding 0.75rem*2 + borde 2)
// + gap 1rem 16px
// + .canvas-area padding 1.5rem*2 = 48px
const CHROME = 70 + 16 + 48;

const VARIANTES = {
  'C  auto minmax(0,1.5fr) minmax(0,1fr)': `${R}{
    .app-container{grid-template-rows:auto minmax(0,1.5fr) minmax(0,1fr)}
  }`,

  'K  suelo en la fila: minmax(calc(min(45dvh,320px) + 134px),1fr)': `${R}{
    .app-container{grid-template-rows:auto minmax(calc(min(45dvh, 320px) + ${CHROME}px), 1fr) minmax(0, 1fr)}
  }`,

  'L  suelo en la fila SIN contar el cromo (control)': `${R}{
    .app-container{grid-template-rows:auto minmax(min(45dvh, 320px), 1fr) minmax(0, 1fr)}
  }`,

  'M  C + panel con suelo minimo de 240px': `${R}{
    .app-container{grid-template-rows:auto minmax(0,1.5fr) minmax(240px, 1fr)}
  }`,
};

const VPS = [
  [768, 667], [768, 900], [768, 1024], [900, 667],
  [1024, 768], [1024, 1366], [1199, 900], [667, 375], [1200, 667], [1280, 800],
];

const probe = () => {
  const q = (s) => document.querySelector(s);
  const box = (s) => { const e = q(s); if (!e) return null;
    const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; };
  const pb = q('.panel-body');
  const ca = q('.canvas-area');
  const st = q('.viewer-container');
  const stage = q('.viewer-3d-container') || q('.canvas-placeholder');
  return {
    viewer: box('.viewer-3d-container') || box('.canvas-placeholder'),
    // Alto REALMENTE visible: el menor entre el layout y lo que deja el recorte
    viewerVisible: Math.max(0, Math.round(
      stage.getBoundingClientRect().bottom -
      Math.max(stage.getBoundingClientRect().top, ca.getBoundingClientRect().top)
    )),
    clipped: st.scrollHeight > ca.clientHeight + 1,
    panelH: pb ? pb.clientHeight : null,
    panelScrolls: pb && pb.scrollHeight > pb.clientHeight + 1 &&
      getComputedStyle(pb).overflowY !== 'visible',
    docScrolls: document.documentElement.scrollHeight > window.innerHeight + 1,
    topbar: box('.top-bar').h,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  };
};

const DEG = Math.PI / 180;
const modelPx = (w, h) => {
  const a = w / h, v = 45 * DEG, hf = 2 * Math.atan(Math.tan(v / 2) * a);
  const lim = Math.min(v, hf);
  const d = (100 / (2 * Math.tan(lim / 2))) * 1.3;
  return Math.round((100 / (2 * d * Math.tan(v / 2))) * h);
};

const browser = await chromium.launch();
const f = (v, n) => String(v ?? '-').padEnd(n);

for (const [name, css] of Object.entries(VARIANTES)) {
  console.log('='.repeat(112));
  console.log(name);
  console.log('='.repeat(112));
  console.log(f('viewport',10)+f('viewer',10)+f('visible',9)+f('aspect',7)+f('modelPx',8)+f('panelH',8)+f('panelScr',9)+f('docScr',8)+f('recortado',10)+f('topbar',8)+'hScr');
  let worst = { h: 1e9 };
  for (const [w, h] of VPS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: css });
    await page.setInputFiles('#file-upload', GCODE);
    await page.waitForFunction(() => !!document.querySelector('.panel-body'), null, { timeout: 20000 });
    await page.waitForTimeout(1200);
    const m = await page.evaluate(probe);
    if (w >= 768 && w < 1200 && m.viewerVisible < worst.h)
      worst = { h: m.viewerVisible, vp: `${w}x${h}` };
    console.log(
      f(`${w}x${h}`,10)+f(m.viewer.w+'x'+m.viewer.h,10)+f(m.viewerVisible,9)+
      f((m.viewer.w/m.viewer.h).toFixed(2),7)+f(modelPx(m.viewer.w, m.viewer.h),8)+
      f(m.panelH,8)+f(m.panelScrolls?'si':'no',9)+f(m.docScrolls?'si':'no',8)+
      f(m.clipped?'*** SI':'no',10)+f(m.topbar,8)+(m.hScroll?'*** SI':'no')
    );
    await ctx.close();
  }
  console.log(`  --> peor visor visible en 768-1199: ${worst.vp} -> ${worst.h}px\n`);
}
await browser.close();