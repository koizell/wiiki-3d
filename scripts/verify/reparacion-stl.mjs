import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { build } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const subruta = process.argv.includes('--subruta')
const preview = process.argv.includes('--preview') || subruta
const base = subruta ? '/subruta/' : '/'
const bundleDir = '/tmp/opencode/reparacion-stl-bundle'
const subrutaDir = '/tmp/opencode/reparacion-stl-dist-subruta'
if (subruta) await build({ base, build: { outDir: subrutaDir, emptyOutDir: true } })
if (preview) {
  await build({ configFile: false, base, build: { outDir: bundleDir, emptyOutDir: true, lib: { entry: resolve('src/services/reparacionMalla.ts'), formats: ['es'], fileName: () => 'service.js' } } })
}
const args = ['run', preview ? 'preview' : 'dev', '--', '--host', '127.0.0.1', '--port', '4179', '--strictPort']
if (subruta) args.push('--base', base, '--outDir', subrutaDir)
const server = spawn('npm', args, { stdio: 'inherit' })
let browser
try {
  let ready = false
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(`http://127.0.0.1:4179${base}`)).ok) { ready = true; break } } catch {}
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  assert.ok(ready, 'Vite no arrancó')
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const assets = new Set()
  page.on('response', response => { if (response.url().includes('/meshfix/') && response.ok()) assets.add(new URL(response.url()).pathname) })
  if (preview) await page.route('**/verify-bundle/**', async route => {
    const name = new URL(route.request().url()).pathname.split('/').pop()
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: await readFile(resolve(bundleDir, name)) })
  })
  await page.goto(`http://127.0.0.1:4179${base}`)
  const result = await page.evaluate(async moduleUrl => {
    const { crearSesionMalla } = await import(/* @vite-ignore */ moduleUrl)
    const vertices = [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]]
    const faces = [[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]]
    function stl(tris) {
      const buffer = new ArrayBuffer(84 + tris.length * 50)
      const view = new DataView(buffer)
      view.setUint32(80, tris.length, true)
      tris.forEach((tri, i) => tri.forEach((v, j) => vertices[v].forEach((x, k) => view.setFloat32(84 + i * 50 + 12 + j * 12 + k * 4, x, true))))
      return buffer
    }
    const closed = await crearSesionMalla()
    const a = await closed.analizar(stl(faces))
    closed.dispose()
    const open = await crearSesionMalla()
    const b = await open.analizar(stl(faces.slice(2)))
    const repair = await open.reparar(() => {})
    const output = await open.exportar()
    let failedReload = false
    try { await open.analizar(stl([])) } catch { failedReload = true }
    const retained = new Uint8Array(await open.exportar())
    const retainedBytes = retained.length === output.byteLength && retained.every((v, i) => v === new Uint8Array(output)[i])
    const repairedAgain = await open.reparar()
    window.sesionPrueba = open
    const again = await crearSesionMalla()
    const c = await again.analizar(output)
    again.dispose()
    const inverted = await crearSesionMalla()
    const inv = await inverted.analizar(stl(faces.map(([a,b,c]) => [a,c,b])))
    const fixed = await inverted.reparar()
    inverted.dispose()
    const invalid = await crearSesionMalla()
    const errors = []
    for (const buffer of [new ArrayBuffer(0), stl([]), stl(faces).slice(0, 100)]) {
      try { await invalid.analizar(buffer); errors.push(false) } catch { errors.push(true) }
    }
    invalid.dispose()
    const forced = await crearSesionMalla()
    // Una lámina abierta: el motor la clasifica como posible abertura diseñada.
    const sheet = await forced.analizar(stl(faces.slice(0, 2)))
    const normal = await forced.reparar()
    const before = await forced.exportar()
    const fill = await forced.rellenarAberturas()
    const after = await forced.exportar()
    forced.dispose()
    return { a, b, repair, c, bytes: output.byteLength, inv, fixed, errors, sheet, normal, before: before.byteLength, fill, after: after.byteLength, failedReload, retainedBytes, repairedAgain }
  }, preview ? '/verify-bundle/service.js' : '/src/services/reparacionMalla.ts')
  console.log(JSON.stringify(result, null, 2))
  assert.equal(result.a.esCerrada, true)
  assert.equal(result.a.esManifold, true)
  assert.equal(result.b.esCerrada, false)
  assert.ok(result.b.incidencias.length)
  assert.ok(result.bytes > 84)
  assert.equal(result.c.esCerrada, true)
  assert.equal(result.c.analysis.faceCount, 12)
  assert.equal(result.b.analysis.boundaryEdges, 4)
  assert.equal(result.repair.reparacion.fillHoles.holesFilled, 1)
  assert.equal(result.failedReload, true)
  assert.equal(result.retainedBytes, true)
  assert.equal(result.repairedAgain.reparacion.facesBefore, 10)
  assert.equal(result.inv.esCerrada, true)
  assert.ok(result.fixed.reparacion.fixNormals.componentsFlipped > 0)
  assert.deepEqual(result.errors, [true, true, true])
  assert.ok(result.sheet.aberturas.length > 0)
  assert.ok(result.normal.reparacion.fillHoles.holesSkippedAsFeature > 0)
  assert.ok(result.fill.rellenoForzado.holesFilled > 0)
  for (const file of ['worker.js', 'meshfix-core.js', 'meshfix-core.wasm']) assert.ok(assets.has(`${base}meshfix/${file}`), `No se cargó ${file}`)
  const robustness = await page.evaluate(async moduleUrl => {
    const { crearSesionMalla } = await import(/* @vite-ignore */ moduleUrl)
    const ascii = new TextEncoder().encode('solid test\nfacet normal 0 0 1\n outer loop\n vertex 0 0 0\n vertex 1 0 0\n vertex 0 1 0\n endloop\nendfacet\nendsolid test\n').buffer
    const binary = new ArrayBuffer(134)
    const view = new DataView(binary)
    new Uint8Array(binary).set(new TextEncoder().encode('solid binary'))
    view.setUint32(80, 1, true)
    view.setFloat32(84 + 12 + 12, 1, true)
    view.setFloat32(84 + 12 + 24 + 4, 1, true)
    const s = await crearSesionMalla()
    const asciiResult = await s.analizar(ascii)
    const before = Array.from(new Uint8Array(await s.exportar()))
    let truncated = false
    try { await s.analizar(binary.slice(0, 100)) } catch { truncated = true }
    const after = Array.from(new Uint8Array(await s.exportar()))
    const first = s.analizar(binary)
    const competing = s.analizar(ascii).then(() => false, () => true)
    const [valid, rejected] = await Promise.all([first, competing])
    const losses = [valid.carasNoFinitasEliminadas, valid.reconstruccionesConectividad, valid.carasPerdidasAuditoria]
    const nonfinite = new ArrayBuffer(184)
    new Uint8Array(nonfinite).set(new Uint8Array(binary))
    const nv = new DataView(nonfinite)
    nv.setUint32(80, 2, true)
    nv.setFloat32(134 + 12, NaN, true)
    const lost = await s.analizar(nonfinite)
    s.dispose()
    return { ascii: asciiResult.analysis.faceCount, truncated, preserved: JSON.stringify(before) === JSON.stringify(after), rejected, losses, nonfinite: lost.carasNoFinitasEliminadas }
  }, preview ? '/verify-bundle/service.js' : '/src/services/reparacionMalla.ts')
  assert.deepEqual(robustness, { ascii: 1, truncated: true, preserved: true, rejected: true, losses: [0, 0, 0], nonfinite: 1 })
  const faults = await page.evaluate(async moduleUrl => {
    const { crearSesionMalla } = await import(/* @vite-ignore */ moduleUrl)
    const NativeWorker = window.Worker
    let mode = ''
    let terminated = 0
    class ControlledWorker extends NativeWorker {
      postMessage(message, transfer) {
        if (mode === 'hang-init' && message.method === 'init') return
        if (mode === 'hang-analysis' && message.method === 'analyzeDetailed') return
        if (mode === 'hang-export' && message.method === 'exportMesh') return
        if (mode === 'audit' && ['connectivityRebuilds', 'facesDroppedByAudit'].includes(message.method)) {
          const result = message.method === 'connectivityRebuilds' ? 2 : 3
          queueMicrotask(() => this.dispatchEvent(new MessageEvent('message', { data: { id: message.id, result } })))
          return
        }
        if (mode === 'crash-analysis' && message.method === 'analyzeDetailed') {
          mode = ''
          queueMicrotask(() => this.dispatchEvent(new ErrorEvent('error', { message: 'fallo posterior a init', cancelable: true })))
          return
        }
        if (mode === 'crash-export' && message.method === 'exportMesh') {
          mode = ''
          queueMicrotask(() => this.dispatchEvent(new ErrorEvent('error', { message: 'worker muerto', cancelable: true })))
          return
        }
        if (mode === 'crash-repair' && message.method === 'repair') {
          mode = ''
          queueMicrotask(() => this.dispatchEvent(new ErrorEvent('error', { message: 'fallo durante reparación', cancelable: true })))
          return
        }
        super.postMessage(message, transfer)
      }
      terminate() { terminated++; return super.terminate() }
    }
    window.Worker = ControlledWorker
    const ascii = new TextEncoder().encode('solid test\nfacet normal 0 0 1\n outer loop\n vertex 0 0 0\n vertex 1 0 0\n vertex 0 1 0\n endloop\nendfacet\nendsolid test\n').buffer
    const rejected = promise => promise.then(() => false, () => true)
    try {
      const s = await crearSesionMalla({ plazoMs: 10000 })
      await s.analizar(ascii)
      const before = Array.from(new Uint8Array(await s.exportar()))
      mode = 'crash-analysis'
      const failed = await rejected(s.analizar(ascii))
      const after = Array.from(new Uint8Array(await s.exportar()))
      mode = 'crash-repair'
      const failedRepair = await rejected(s.reparar())
      const afterRepair = Array.from(new Uint8Array(await s.exportar()))
      mode = 'hang-analysis'
      const pending = s.analizar(ascii)
      const simultaneousExport = await rejected(s.exportar())
      const simultaneousRepair = await rejected(s.reparar())
      const beforeDispose = terminated
      s.dispose()
      const cancelledOperation = await rejected(pending)
      const stoppedOperation = terminated > beforeDispose
      const afterDispose = await rejected(s.analizar(ascii))
      mode = ''
      const initSession = await crearSesionMalla({ plazoMs: 10000 })
      mode = 'hang-init'
      const pendingInit = initSession.analizar(ascii)
      const beforeInitDispose = terminated
      initSession.dispose()
      const disposedDuringInit = await rejected(pendingInit)
      const stoppedCandidateInit = terminated > beforeInitDispose
      mode = 'hang-init'
      const controller = new AbortController()
      const beforeAbort = terminated
      const init = crearSesionMalla({ signal: controller.signal, plazoMs: 10000 })
      await new Promise(resolve => setTimeout(resolve, 30))
      controller.abort()
      const cancelledInit = await rejected(init)
      const stoppedInit = terminated > beforeAbort
      const beforeTimeout = terminated
      const timedOut = await rejected(crearSesionMalla({ plazoMs: 30 }))
      const stoppedTimeout = terminated > beforeTimeout
      mode = ''
      const fatal = await crearSesionMalla({ plazoMs: 10000 })
      await fatal.analizar(ascii)
      mode = 'crash-export'
      const crashed = await rejected(fatal.exportar())
      const subsequent = await rejected(fatal.exportar())
      fatal.dispose()
      mode = ''
      const deadline = await crearSesionMalla({ plazoMs: 1000 })
      await deadline.analizar(ascii)
      mode = 'hang-export'
      const operationTimeout = await rejected(deadline.exportar())
      const afterTimeout = await rejected(deadline.exportar())
      deadline.dispose()
      mode = ''
      const auditSession = await crearSesionMalla()
      mode = 'audit'
      const audit = await auditSession.analizar(ascii)
      mode = ''
      auditSession.dispose()
      const countersForwarded = audit.reconstruccionesConectividad === 2 && audit.carasPerdidasAuditoria === 3
      return { failed, failedRepair, preserved: JSON.stringify(before) === JSON.stringify(after) && JSON.stringify(before) === JSON.stringify(afterRepair), simultaneousExport, simultaneousRepair, cancelledOperation, stoppedOperation, afterDispose, disposedDuringInit, stoppedCandidateInit, cancelledInit, stoppedInit, timedOut, stoppedTimeout, crashed, subsequent, operationTimeout, afterTimeout, countersForwarded }
    } finally { window.Worker = NativeWorker }
  }, preview ? '/verify-bundle/service.js' : '/src/services/reparacionMalla.ts')
  assert.deepEqual(faults, Object.fromEntries(['failed', 'failedRepair', 'preserved', 'simultaneousExport', 'simultaneousRepair', 'cancelledOperation', 'stoppedOperation', 'afterDispose', 'disposedDuringInit', 'stoppedCandidateInit', 'cancelledInit', 'stoppedInit', 'timedOut', 'stoppedTimeout', 'crashed', 'subsequent', 'operationTimeout', 'afterTimeout', 'countersForwarded'].map(key => [key, true])))
  console.log('OK exclusión, conservación, contadores y fallos de worker', faults)
  await page.route('**/meshfix/worker.js', route => route.abort())
  const failure = await page.evaluate(async moduleUrl => {
    const { crearSesionMalla } = await import(/* @vite-ignore */ moduleUrl)
    try { const session = await crearSesionMalla(); session.dispose(); return false } catch { return true }
  }, preview ? '/verify-bundle/service.js' : '/src/services/reparacionMalla.ts')
  assert.equal(failure, true, 'El fallo de worker debe rechazarse')
  const preserved = await page.evaluate(async () => {
    const session = window.sesionPrueba
    const before = new Uint8Array(await session.exportar())
    let rejected = false
    try { await session.rellenarAberturas() } catch { rejected = true }
    const after = new Uint8Array(await session.exportar())
    session.dispose()
    return rejected && before.length === after.length && before.every((value, index) => value === after[index])
  })
  assert.equal(preserved, true, 'Una segunda pasada fallida debe conservar la primera exportación')
  console.log('OK reparación STL')
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
