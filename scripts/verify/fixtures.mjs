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

import { writeFileSync, mkdtempSync, readFileSync } from 'node:fs';
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

/** El G-code real de Creality Print que el repo trae en `test-fixtures/`. */
const GCODE_REAL = join(
  import.meta.dirname,
  '..',
  '..',
  'test-fixtures',
  'Argentina T-shirt medal_PLA_2m56s.gcode'
);
export const GCODE_FIXTURE = GCODE_REAL;

/**
 * Un G-code **sin gramos de filamento**, para el estado 3 de Taller.
 *
 * Hace falta porque el estado 3 es el que más se parece a un fallo: no dice
 * «no hay archivo» ni «el archivo no vale», dice que el slicer no escribió una
 * cosa. Para comprobarlo hay que poder subir un G-code al que le falte
 * precisamente eso, y el del repo lo trae —`; filament used [g] = 0.93`—, así
 * que hace falta el otro.
 *
 * **Es una copia del G-code real con la línea de gramos quitada**, y no un
 * G-code de ocho líneas escrito a mano. La primera versión lo era, y no
 * analizaba: `detectSlicer` no reconoce una cabecera que no lleva la firma de
 * ningún slicer, así que el parser lanzaba `NO_METADATA_MESSAGE`, el análisis se
 * quedaba en `error` y en `/taller` no se pintaba ninguno de los cinco estados.
 * Un fixture que el parser no puede leer no sirve para medir los estados del
 * parser.
 *
 * Se quitan las tres claves de gramos que `FILAMENT_GRAM_KEYS` busca, no sólo la
 * primera: si sobrevive `; total filament used [g]`, `filamentUsed` saldría
 * definido y el estado 3 no se llegaría a ver.
 *
 * Se escribe en el directorio temporal y no en el repo, por la misma razón que
 * el tetraedro: un fichero de prueba que no está en el control de versiones no
 * puede quedarse obsoleto en silencio.
 */
const SIN_GRAMOS = mkdtempSync(join(tmpdir(), 'wiiki-verify-sin-gramos-'));
const sinGramos = join(SIN_GRAMOS, 'sin-gramos.gcode');
writeFileSync(sinGramos, readFileSync(GCODE_REAL, 'utf8').replace(/^;.*filament.*\[g\].*$\n?/gim, ''));
export const GCODE_SIN_GRAMOS = sinGramos;
