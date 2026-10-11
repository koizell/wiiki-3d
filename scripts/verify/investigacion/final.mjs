import { chromium } from 'playwright';
import { join } from 'node:path';
const BASE='http://127.0.0.1:4173';
const GCODE=join(import.meta.dirname, '../../..', 'test-fixtures', 'Argentina T-shirt medal_PLA_2m56s.gcode');
const R='@media (min-width: 768px) and (max-width: 1199.98px)';
const E=`${R}{
  .app-container{grid-template-rows:auto auto auto; height:auto; min-height:100dvh}
  .viewer-3d-container,.canvas-placeholder{aspect-ratio:16/10; min-height:0; flex:0 0 auto}
  .canvas-area{align-items:flex-start}
  .sidebar-right{display:block; min-height:auto}
  .panel-body{overflow-y:visible; flex:none; padding-right:0}
}`;
const K=`${R}{
  .app-container{grid-template-rows:auto minmax(calc(min(45dvh,320px) + 134px),1fr) minmax(0,1fr)}
}`;
const VPS=[[768,667],[768,900],[768,1024],[768,1366],[900,667],[1024,768],[1024,1366],[1199,900],[1199,1366],[667,375],[375,667],[639,900],[1200,667],[1280,800],[1440,900],[1920,1080]];
const probe=()=>{const q=s=>document.querySelector(s);const box=s=>{const e=q(s);if(!e)return null;const r=e.getBoundingClientRect();return{w:Math.round(r.width),h:Math.round(r.height)};};
 const pb=q('.panel-body');const ca=q('.canvas-area');const st=q('.viewer-container');
 const stage=q('.viewer-3d-container')||q('.canvas-placeholder');const sr=stage.getBoundingClientRect();
 return{viewer:box('.viewer-3d-container')||box('.canvas-placeholder'),
  visible:Math.max(0,Math.round(sr.bottom-Math.max(sr.top,ca.getBoundingClientRect().top))),
  clipped:st.scrollHeight>ca.clientHeight+1,
  panelH:pb?pb.clientHeight:null,
  panelScrolls:pb&&pb.scrollHeight>pb.clientHeight+1&&getComputedStyle(pb).overflowY!=='visible',
  docH:document.documentElement.scrollHeight,winH:window.innerHeight,
  docScrolls:document.documentElement.scrollHeight>window.innerHeight+1,
  topbar:box('.top-bar').h,
  hScroll:document.documentElement.scrollWidth>window.innerWidth+1};};
const b=await chromium.launch();const f=(v,n)=>String(v??'-').padEnd(n);
for(const[name,css]of[['E',E],['K',K]]){
 console.log('='.repeat(104));console.log('CANDIDATO '+name);console.log('='.repeat(104));
 console.log(f('viewport',10)+f('viewer',10)+f('visible',9)+f('aspect',7)+f('panelH',8)+f('panelScr',9)+f('docScrolls',11)+f('docH/winH',13)+f('recort',8)+f('topbar',8)+'hScr');
 for(const[w,h]of VPS){
  const c=await b.newContext({viewport:{width:w,height:h},colorScheme:'dark'});const p=await c.newPage();
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:css});
  await p.setInputFiles('#file-upload',GCODE);
  await p.waitForFunction(()=>!!document.querySelector('.panel-body'),null,{timeout:20000});
  await p.waitForTimeout(1200);const m=await p.evaluate(probe);
  console.log(f(`${w}x${h}`,10)+f(m.viewer.w+'x'+m.viewer.h,10)+f(m.visible,9)+f((m.viewer.w/m.viewer.h).toFixed(2),7)+
   f(m.panelH,8)+f(m.panelScrolls?'si':'no',9)+f(m.docScrolls?'si':'no',11)+f(m.docH+'/'+m.winH,13)+
   f(m.clipped?'*** SI':'no',8)+f(m.topbar,8)+(m.hScroll?'*** SI':'no'));
  await c.close();}
 console.log('');}
await b.close();
