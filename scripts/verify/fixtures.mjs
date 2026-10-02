/**
 * Genera un STL binario mínimo (un tetraedro de 20 mm) para poder medir el visor
 * 3D con geometría real.
 *
 * El repo no trae un STL: `test-fixtures/` tiene un G-code de Creality Print y
 * un `.obj`, y el visor sólo acepta STL y 3MF. Sin esto, cualquier medición del
 * visor sólo podría hacerse contra `.canvas-placeholder` (el aviso de G-code),
 * que no tiene canvas WebGL.
 *
 * El tetraedro se escribe en un directorio temporal, nunca en el repo.
 */

import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SIZE = Buffer.alloc(84 + 4 * 50);
SIZE.writeUInt32LE(4, 80);
let offset = 84;
for (const tri of [
  [[0, 0, 0], [20, 0, 0], [10, 17.32, 0]],
  [[0, 0, 0], [10, 17.32, 0], [10, 5.77, 14.14]],
  [[0, 0, 0], [20, 0, 0], [10, 5.77, 14.14]],
  [[20, 0, 0], [10, 17.32, 0], [10, 5.77, 14.14]],
]) {
  SIZE.writeFloatLE(0, offset); offset += 12; // normal
  for (const v of tri) {
    SIZE.writeFloatLE(v[0], offset); offset += 4;
    SIZE.writeFloatLE(v[1], offset); offset += 4;
    SIZE.writeFloatLE(v[2], offset); offset += 4;
  }
  SIZE.writeUInt16LE(0, offset); offset += 2;
}

const dir = mkdtempSync(join(tmpdir(), 'wiiki-verify-'));
const file = join(dir, 'prueba-visor.stl');
writeFileSync(file, SIZE);

export const STL_FIXTURE = file;

/** G-code real de Creality Print, que el repo trae en `test-fixtures/`. */
export const GCODE_FIXTURE = join(
  import.meta.dirname,
  '..',
  '..',
  'test-fixtures',
  'Argentina T-shirt medal_PLA_2m56s.gcode'
);