import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { build } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const preview = process.argv.includes('--preview')
const bundleDir = '/tmp/opencode/reparacion-stl-bundle'
if (preview) {
  await build({ configFile: false, build: { outDir: bundleDir, emptyOutDir: true, lib: { entry: resolve('src/services/reparacionMalla.ts'), formats: ['es'], fileName: () => 'service.js' } } })
}
const server = spawn('npm', ['run', preview ? 'preview' : 'dev', '--', '--host', '127.0.0.1', '--port', '4179', '--strictPort'], { stdio: 'inherit' })
let browser
try {
  let ready = false
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch('http://127.0.0.1:4179/')).ok) { ready = true; break } } catch {}
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
  await page.goto('http://127.0.0.1:4179/')
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
    return { a, b, repair, c, bytes: output.byteLength, inv, fixed, errors, sheet, normal, before: before.byteLength, fill, after: after.byteLength }
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
  assert.equal(result.inv.esCerrada, true)
  assert.ok(result.fixed.reparacion.fixNormals.componentsFlipped > 0)
  assert.deepEqual(result.errors, [true, true, true])
  assert.ok(result.sheet.aberturas.length > 0)
  assert.ok(result.normal.reparacion.fillHoles.holesSkippedAsFeature > 0)
  assert.ok(result.fill.rellenoForzado.holesFilled > 0)
  for (const file of ['worker.js', 'meshfix-core.js', 'meshfix-core.wasm']) assert.ok(assets.has(`/meshfix/${file}`), `No se cargó ${file}`)
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
