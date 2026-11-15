import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const source = resolve(root, 'node_modules/meshfix-wasm')
const metadata = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'))
if (metadata.version !== '0.6.1') throw new Error(`Versión inesperada de meshfix-wasm: ${metadata.version}`)
const dest = resolve(root, 'public/meshfix')
await mkdir(dest, { recursive: true })
for (const file of ['worker.js', 'meshfix-core.js', 'meshfix-core.wasm']) {
  await copyFile(resolve(source, 'dist', file), resolve(dest, file))
}
