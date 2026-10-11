import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdtempSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4173';
const OUT = mkdtempSync(join(tmpdir(), 'wiiki-investigacion-'));
const STL = `${OUT}/prueba-visor.stl`;
const GCODE = join(import.meta.dirname, '../../..', 'test-fixtures', 'Argentina T-shirt medal_PLA_2m56s.gcode');

// Regla propuesta, acotada a la franja del problema para no rozar 640 ni 1200.
const R = '@media (min-width: 768px) and (max-width: 1199.98px)';
const PROPUESTA = `${R}{
  .viewer-3d-container,
  .canvas-placeholder { min-height: min(45dvh, 320px); }
}`;
// Variante sin tope, para comprobar si el 320px es necesario o decorativo.
const SIN_TOPE = `${R}{
  .viewer-3d-container,
  .canvas-placeholder { min-height: 45dvh; }
}`;
// Y la versión sin acotar, para ver si el suelo se colaría en >=1200.
const SIN_ACOTAR = `.viewer-3d-container, .canvas-placeholder { min-height: min(45dvh, 320px); }`;

const VARIANTES = {
  'propuesta (768-1199, min(45dvh,320px))': PROPUESTA,
  'sin tope: min-height:45dvh': SIN_TOPE,
  'sin acotar (se aplica tambien >=1200)': SIN_ACOTAR,
};

const VPS = [
  [768, 667], [768, 900], [768, 1024], [900, 667], [1024, 768],
  [1024, 1366], [1199, 900], [667, 375], [1200, 667], [1280, 800],
];

const probe = () => {
  const q = (s) => document.querySelector(s);
  const box = (s) => { const e = q(s); if (!e) return null;
    const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; };
  const pb = q('.panel-body');
  const canvas = q('.viewer-3d-container canvas');
  const stage = q('.viewer-3d-container') || q('.canvas-placeholder');
  return {
    viewer: box('.viewer-3d-container') || box('.canvas-placeholder'),
    webglOk: !!canvas && canvas.width > 0 && canvas.height > 0,
    webgl: canvas ? canvas.width + 'x' + canvas.height : null,
    panelH: pb ? pb.clientHeight : null,
    panelRectH: pb ? Math.round(pb.getBoundingClientRect().height) : null,
    panelScrolls: pb && pb.scrollHeight > pb.clientHeight + 1 &&
      getComputedStyle(pb).overflowY !== 'visible',
    docScrolls: document.documentElement.scrollHeight > window.innerHeight + 1,
    // ¿El visor se sale de su fila y .canvas-area lo recorta?
    clippedByCanvasArea: (() => {
      const ca = q('.canvas-area'); const st = q('.viewer-container');
      if (!ca || !st) return null;
      return st.scrollHeight > ca.clientHeight + 1;
    })(),
    topbar: box('.top-bar').h,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    minH: stage ? getComputedStyle(stage).minHeight : null,
  };
};

const browser = await chromium.launch();
const f = (v, n) => String(v ?? '-').padEnd(n);

for (const [name, css] of Object.entries(VARIANTES)) {
  console.log('='.repeat(104));
  console.log(name);
  console.log('='.repeat(104));
  console.log(f('viewport',10)+f('viewer',10)+f('aspect',7)+f('minH',10)+f('webgl',10)+f('panelH',8)+f('panelScr',9)+f('docScr',8)+f('recortado',10)+f('topbar',8)+'hScr');
  for (const [w, h] of VPS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: css });
    await page.setInputFiles('#file-upload', GCODE);
    await page.waitForFunction(() => !!document.querySelector('.panel-body'), null, { timeout: 20000 });
    await page.waitForTimeout(1200);
    const m = await page.evaluate(probe);
    console.log(
      f(`${w}x${h}`,10)+f(m.viewer.w+'x'+m.viewer.h,10)+
      f((m.viewer.w/m.viewer.h).toFixed(2),7)+f(m.minH,10)+f(m.webgl,10)+
      f(m.panelH,8)+f(m.panelScrolls?'si':'no',9)+f(m.docScrolls?'si':'no',8)+
      f(m.clippedByCanvasArea?'*** SI':'no',10)+f(m.topbar,8)+(m.hScroll?'*** SI':'no')
    );
    await ctx.close();
  }
  console.log('');
}
await browser.close();