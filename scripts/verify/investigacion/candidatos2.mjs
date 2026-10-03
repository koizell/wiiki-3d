import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdtempSync, writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4173';
const OUT = mkdtempSync(join(tmpdir(), 'wiiki-investigacion-'));
const STL = `${OUT}/prueba-visor.stl`;
const GCODE = join(import.meta.dirname, '../../..', 'test-fixtures', 'Argentina T-shirt medal_PLA_2m56s.gcode');

const RANGE = '@media (min-width: 768px) and (max-width: 1199.98px)';

/* Candidatos que faltaban, inspired en lo que dice la Tarea 1:
   - M3/SAP: un pane fijo + uno flexible; nunca "mitad y mitad" si no coinciden.
   - El visor necesita ALTO (el modelo mide 0.77 x alto) y la proporcion la fija
     el ancho disponible, no el reparto de filas. */
const CANDIDATES = {
  G_aspect_16_10_panel_resto: {
    css: `${RANGE}{
      .app-container{grid-template-rows:auto auto minmax(0,1fr)}
      .viewer-3d-container,.canvas-placeholder{aspect-ratio:16/10; min-height:0; flex:0 0 auto}
    }`,
    desc: 'filas auto/auto/1fr + aspect-ratio 16/10; el panel se queda con el resto',
  },
  H_aspect_4_3_panel_resto: {
    css: `${RANGE}{
      .app-container{grid-template-rows:auto auto minmax(0,1fr)}
      .viewer-3d-container,.canvas-placeholder{aspect-ratio:4/3; min-height:0; flex:0 0 auto}
    }`,
    desc: 'igual que G pero 4/3 (visor mas alto -> modelo mas grande)',
  },
  I_suelo_en_el_visor_no_en_la_fila: {
    css: `${RANGE}{
      .app-container{grid-template-rows:auto minmax(0,1fr) minmax(0,1fr)}
      .viewer-3d-container,.canvas-placeholder{min-height:min(45dvh, 320px)}
    }`,
    desc: 'A pero con el suelo en .viewer-3d-container (no en la fila)',
  },
};

const VIEWPORTS = [
  [768, 667], [768, 900], [768, 1024], [900, 667],
  [1024, 768], [1024, 1366], [1199, 900], [667, 375],
];

const probe = () => {
  const q = (s) => document.querySelector(s);
  const box = (s) => {
    const el = q(s); if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  };
  const scrolled = (el) =>
    el && el.scrollHeight > el.clientHeight + 1 && getComputedStyle(el).overflowY !== 'visible';
  const stage = q('.viewer-3d-container') || q('.canvas-placeholder');
  const viewer = box('.viewer-3d-container') || box('.canvas-placeholder');
  const canvas = q('.viewer-3d-container canvas');
  const panelBody = q('.panel-body');
  const app = q('.app-container');
  return {
    stage: stage ? (stage.className.match(/viewer-3d|placeholder/) || ['?'])[0] : null,
    viewer,
    aspect: viewer ? +(viewer.w / viewer.h).toFixed(2) : null,
    webgl: canvas ? { w: canvas.width, h: canvas.height } : null,
    webglOk: !!canvas && canvas.width > 0 && canvas.height > 0,
    panelVisible: panelBody ? panelBody.clientHeight : null,
    panelRect: panelBody ? (() => { const r = panelBody.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) }; })() : null,
    panelContent: panelBody ? panelBody.scrollHeight : null,
    panelScrolls: scrolled(panelBody),
    docScrolls: document.documentElement.scrollHeight > window.innerHeight + 1,
    docScrollH: document.documentElement.scrollHeight,
    winH: window.innerHeight,
    topbar: box('.top-bar').h,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  };
};

const browser = await chromium.launch();
const table = {};

for (const [name, cand] of Object.entries(CANDIDATES)) {
  table[name] = { desc: cand.desc, rows: {} };
  for (const [w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e).slice(0, 60)));
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 60)); });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    if (cand.css) await page.addStyleTag({ content: cand.css });

    await page.setInputFiles('#file-upload', STL);
    await page.waitForSelector('.viewer-3d-container canvas', { timeout: 20000 });
    await page.waitForTimeout(300);
    const stl = await page.evaluate(probe);

    await page.setInputFiles('#file-upload', GCODE);
    // No exigir visibilidad: un candidato puede colapsar el panel a 0px, y eso
    // es justo un resultado que hay que medir, no un fallo del script.
    await page.waitForFunction(
      () => !!document.querySelector('.panel-body'), null, { timeout: 20000 }
    );
    await page.waitForTimeout(1200);
    const gcode = await page.evaluate(probe);

    table[name].rows[`${w}x${h}`] = { stl, gcode, errs: errs.length };
    await ctx.close();
  }
}
await browser.close();

writeFileSync(`${OUT}/candidatos2.json`, JSON.stringify(table, null, 2));

const DEG = Math.PI / 180;
const modelPx = (w, h) => {
  const a = w / h, v = 45 * DEG, hf = 2 * Math.atan(Math.tan(v / 2) * a);
  const lim = Math.min(v, hf);
  const d = (100 / (2 * Math.tan(lim / 2))) * 1.3;
  return Math.round((100 / (2 * d * Math.tan(v / 2))) * h);
};
const f = (v, n) => String(v ?? '-').padEnd(n);

console.log('CANDIDATOS NUEVOS — con G-code (panel de 508px de contenido)\n');
for (const [name, c] of Object.entries(table)) {
  console.log('='.repeat(112));
  console.log(`${name}\n  ${c.desc}`);
  console.log('='.repeat(112));
  console.log(f('viewport',10)+f('viewer',10)+f('aspect',7)+f('modelPx',8)+f('panelVis',9)+f('panelScr',9)+f('docScr',7)+f('docH/winH',13)+f('hScr',6)+'errs');
  for (const [vp, r] of Object.entries(c.rows)) {
    const g = r.gcode;
    console.log(
      f(vp,10)+f(g.viewer.w+'x'+g.viewer.h,10)+f(g.aspect,7)+f(modelPx(g.viewer.w,g.viewer.h),8)+
      f(g.panelVisible,9)+f(g.panelScrolls?'si':'no',9)+f(g.docScrolls?'si':'no',7)+
      f(g.docScrollH+'/'+g.winH,13)+f(g.hScroll?'*** SI':'no',6)+r.errs
    );
  }
  const stlRows = Object.entries(c.rows);
  const worst = stlRows.map(([vp,r])=>({vp, h:r.stl.viewer.h, a:r.stl.aspect})).sort((a,b)=>a.h-b.h)[0];
  console.log(`  peor visor (STL): ${worst.vp} -> ${worst.h}px, aspect ${worst.a}`);
  console.log('');
}