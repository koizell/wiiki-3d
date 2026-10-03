import { chromium } from 'playwright';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4173';
const OUT = mkdtempSync(join(tmpdir(), 'wiiki-investigacion-'));
const STL = `${OUT}/prueba-visor.stl`;
const GCODE = join(import.meta.dirname, '../../..', 'test-fixtures', 'Argentina T-shirt medal_PLA_2m56s.gcode');

mkdirSync(OUT, { recursive: true });

// Tetraedro binario: sirve para tener geometría real en el visor.
function makeStl() {
  const tris = [
    [[0,0,0],[20,0,0],[10,17.32,0]],
    [[0,0,0],[10,17.32,0],[10,5.77,14.14]],
    [[0,0,0],[20,0,0],[10,5.77,14.14]],
    [[20,0,0],[10,17.32,0],[10,5.77,14.14]],
  ];
  const buf = Buffer.alloc(84 + tris.length * 50);
  buf.writeUInt32LE(tris.length, 80);
  let o = 84;
  for (const t of tris) {
    buf.writeFloatLE(0, o); o += 12;
    for (const v of t) { buf.writeFloatLE(v[0], o); o += 4; buf.writeFloatLE(v[1], o); o += 4; buf.writeFloatLE(v[2], o); o += 4; }
    buf.writeUInt16LE(0, o); o += 2;
  }
  writeFileSync(STL, buf);
}
makeStl();

/* Candidatos. Todos inyectados en runtime; el repo no se toca.
   El rango 768–1199 es donde duele, así que todos van acotados a él salvo
   E, que cambia también el modelo de scroll por debajo de 768. */
const RANGE = '@media (min-width: 768px) and (max-width: 1199.98px)';

const CANDIDATES = {
  A_actual: { css: '', desc: 'auto minmax(0,1fr) minmax(0,1fr)  [estado actual]' },

  B_suelo_40dvh: {
    css: `${RANGE}{.app-container{grid-template-rows:auto minmax(40dvh,1fr) minmax(0,1fr)}}`,
    desc: 'auto minmax(40dvh,1fr) minmax(0,1fr)',
  },

  C_asimetro_1_5fr: {
    css: `${RANGE}{.app-container{grid-template-rows:auto minmax(0,1.5fr) minmax(0,1fr)}}`,
    desc: 'auto minmax(0,1.5fr) minmax(0,1fr)',
  },

  D_panel_por_contenido: {
    css: `${RANGE}{.app-container{grid-template-rows:auto minmax(0,1fr) auto}}`,
    desc: 'auto minmax(0,1fr) auto',
  },

  E_aspect_ratio_doc_scroll: {
    css: `
      ${RANGE}{
        .app-container{grid-template-rows:auto auto auto; height:auto; min-height:100dvh}
        .viewer-3d-container{aspect-ratio:16/10; min-height:0; flex:0 0 auto}
        .canvas-placeholder{aspect-ratio:16/10; min-height:0; flex:0 0 auto}
        .canvas-area{min-height:0; align-items:flex-start}
        .viewer-container--fill{align-self:stretch}
        .sidebar-right{display:block; min-height:auto}
        .panel-body{overflow-y:visible; flex:none; padding-right:0}
      }`,
    desc: 'filas auto + aspect-ratio 16/10 + documento scrollea',
  },

  F_rail_64_lado_a_lado: {
    css: `${RANGE}{
        .app-container{
          grid-template-areas:"nav header header" "nav main panel";
          grid-template-columns:64px 1fr 320px;
          grid-template-rows:auto minmax(0,1fr);
        }
        .sidebar-left{padding:1rem .3rem}
        .sidebar-left ul{display:flex; flex-direction:column}
        .nav-item{justify-content:center; padding:.65rem .2rem; text-align:center; font-size:.6rem}
        .sidebar-right{border-left:1px solid var(--border)}
      }`,
    desc: 'rail de 64px + main|panel lado a lado (texto de los items se recorta: markup)',
  },
};

const VIEWPORTS = [
  [768, 667], [768, 900], [768, 1024], [900, 667],
  [1024, 768], [1024, 1366], [1199, 900], [667, 375],
];

const probe = () => {
  const q = (s) => document.querySelector(s);
  const box = (s) => {
    const el = q(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  };
  const scrolled = (el) =>
    el && el.scrollHeight > el.clientHeight + 1 && getComputedStyle(el).overflowY !== 'visible';

  // Con STL hay .viewer-3d-container; con G-code hay .canvas-placeholder.
  // Ambos son `flex:1` dentro de .viewer-container y ambos compiten por el alto.
  const stage = q('.viewer-3d-container') || q('.canvas-placeholder');
  const viewer = box('.viewer-3d-container') || box('.canvas-placeholder');
  const canvas = q('.viewer-3d-container canvas');
  const panelBody = q('.panel-body');
  const sidebarRight = q('.sidebar-right');
  const app = q('.app-container');

  return {
    stage: stage ? (stage.className.match(/viewer-3d|placeholder/) || ['?'])[0] : null,
    viewer,
    aspect: viewer ? +(viewer.w / viewer.h).toFixed(2) : null,
    webgl: canvas ? { w: canvas.width, h: canvas.height } : null,
    webglOk: !!canvas && canvas.width > 0 && canvas.height > 0,
    topbar: box('.top-bar'),
    canvasArea: box('.canvas-area'),
    panel: box('.sidebar-right'),
    // ¿Quién scrollea?
    panelScrolls: scrolled(panelBody),
    docScrolls:
      document.documentElement.scrollHeight > window.innerHeight + 1,
    // ¿Algo queda recortado sin forma de llegar a ello?
    clippedPanel:
      !!panelBody &&
      panelBody.scrollHeight > panelBody.clientHeight + 1 &&
      !scrolled(panelBody),
    appOverflows: app.scrollHeight > app.clientHeight + 1,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    docScrollH: document.documentElement.scrollHeight,
    winH: window.innerHeight,
  };
};

const browser = await chromium.launch();
const table = {};

for (const [name, cand] of Object.entries(CANDIDATES)) {
  table[name] = { desc: cand.desc, rows: {} };

  for (const [w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      colorScheme: 'dark',
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e).slice(0, 70)));
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 70)); });

    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    if (cand.css) await page.addStyleTag({ content: cand.css });
    await page.setInputFiles('#file-upload', STL);
    await page.waitForSelector('.viewer-3d-container canvas', { timeout: 20000 });
    await page.waitForTimeout(300);

    // Medir con STL (visor real) y luego con G-code (panel largo, caso habitual).
    const conStl = await page.evaluate(probe);

    await page.setInputFiles('#file-upload', GCODE);
    await page.waitForSelector('.panel-body', { timeout: 20000 });
    await page.waitForTimeout(1200); // mock de Jev: 600ms
    const conGcode = await page.evaluate(probe);

    table[name].rows[`${w}x${h}`] = { conStl, conGcode, errs: errs.length };
    await ctx.close();
  }
}
await browser.close();

writeFileSync(`${OUT}/candidatos.json`, JSON.stringify(table, null, 2));

// ---- Informe ----
const fmt = (v, n = 7) => String(v ?? '-').padEnd(n);
console.log('CANDIDATOS  (STL cargado = visor con geometría real)\n');
for (const [name, c] of Object.entries(table)) {
  console.log('='.repeat(112));
  console.log(`${name}   ${c.desc}`);
  console.log('='.repeat(112));
  console.log(
    fmt('viewport') + fmt('viewer') + fmt('aspect') + fmt('webgl') + fmt('topbar') +
    fmt('p scrolls') + fmt('doc scr') + fmt('hScr') + fmt('recortado') + 'errs'
  );
  for (const [vp, r] of Object.entries(c.rows)) {
    const s = r.conStl;
    console.log(
      fmt(vp, 11) +
      fmt(`${s.viewer.w}x${s.viewer.h}`) +
      fmt(s.aspect) +
      fmt(`${s.webgl.w}x${s.webgl.h}`) +
      fmt(s.topbar.h) +
      fmt(s.panelScrolls ? 'si' : 'no') +
      fmt(s.docScrolls ? 'si' : 'no') +
      fmt(s.hScroll ? '*** SI' : 'no') +
      fmt(s.clippedPanel ? '*** SI' : 'no') +
      r.errs
    );
  }
  // Con G-code el panel está lleno: es el caso que más importa.
  const g = Object.values(c.rows)[0].conGcode;
  const tall = Object.values(c.rows).map((r) => r.conGcode.panelScrolls);
  console.log(
    `  [G-code] viewer=${g.viewer.w}x${g.viewer.h} panel scrolls=${tall.filter(Boolean).length}/${tall.length} doc scrolls=${Object.values(c.rows).filter((r)=>r.conGcode.docScrolls).length}/${Object.keys(c.rows).length}`
  );
  console.log('');
}