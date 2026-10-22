/**
 * El lector de trayectoria del G-code, comprobado.
 *
 * ## Por qué una comprobación tan específica
 *
 * Porque un lector de trayectorias puede parecer que funciona y estar **mintiendo**.
 * Dibujar una línea por cada `G1` es fácil; lo difícil es no dibujar una
 * trayectoria que no sea la que la máquina va a ejecutar.
 *
 * La comprobación tiene **dos** materiales:
 *
 * 1. **El sintético**, que se genera en memoria y es determinista. Es el que hace
 *    que la comprobación valga en el CI: `test-fixtures/` está en el `.gitignore`
 *    a propósito —«G-codes reales de usuario, no se suben»— y una comprobación que
 *    depende de un archivo que no está en el repositorio no es una comprobación.
 * 2. **El real**, si está en la máquina de quien la ejecuta. Un G-code de verdad
 *    tiene arcos, retracciones y la sintaxis de tres familias de slicer, y eso no
 *    se fabrica. Cuando está, se usa como red de seguridad y se dice.
 *
 * ## La prueba de fondo
 *
 * Con el G-code real, el fixture declara lo que tiene que dar:
 *
 * - `; total layer number: 8` → **8 capas**.
 * - `; MINX = 95.00 … MAXX = 125.00` → la caja envolvente de la trayectoria.
 * - `; filament used [mm] = 311.01` → los milímetros de filamento.
 * - `; filament used [g] = 0.93`, con `filament_diameter: 1.75` y
 *   `filament_density: 1.24` → los gramos.
 *
 * Y aquí está la comprobación de verdad: **los gramos se calculan desde la
 * trayectoria y tienen que salir de la cabecera**. El lector no lee los gramos: los
 * deriva de la extrusión que ha visto. Si cuadran, es que ha summationado bien, que
 * ha respetado los `G92` y que no se ha comido ni un segmento de arco.
 *
 *   ΣE (mm) × π × (1,75/2)² / 1000 × 1,24 = gramos
 *
 * Esa es la prueba de que el lector dice la verdad. Un lector que dibuja una línea
 * bonita y se equivoca en los gramos no sirve para nada.
 *
 * Uso:  npm run verify:gcode
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unzipSync } from 'three/examples/jsm/libs/fflate.module.js';
import { analizarGcode, TIPOS_RECONOCIDOS } from '../../src/services/GcodeTrayectoria.ts';
import { leerProyecto3mf } from '../../src/services/ThreeMfProyecto.ts';
import { crearGcodeSintetico, crear3mfSintetico, CAJA_SINTETICA } from './gcode-sintetico.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FIXTURE = join(RAIZ, 'test-fixtures', 'Argentina T-shirt medal_PLA_2m56s.gcode');

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/**
 * Comprobaciones de una trayectoria contra lo que **declara** su cabecera.
 *
 * @param texto El G-code.
 * @param capeta El nombre del caso, para los mensajes.
 */
function comprobarTrayectoria(texto, capeta) {
  /** Lo que dice la cabecera del archivo. */
  const cabecera = (clave) => {
    const m = texto.match(new RegExp(`^;\\s*${clave}\\s*[=:]\\s*(\\S+)`, 'im'));
    return m?.[1] ?? null;
  };

  const capasDeclaradas = Number(cabecera('total layer number'));
  const minX = Number(cabecera('MINX'));
  const maxX = Number(cabecera('MAXX'));
  const minY = Number(cabecera('MINY'));
  const maxY = Number(cabecera('MAXY'));
  const maxZ = Number(cabecera('MAXZ'));
  const filamentoMm = Number(cabecera('filament used \\[mm\\]'));
  const filamentoG = Number(cabecera('filament used \\[g\\]'));
  const diametro = Number(cabecera('filament_diameter'));
  const densidad = Number(cabecera('filament_density'));

  comprobar(
    !Number.isNaN(capasDeclaradas) &&
      !Number.isNaN(filamentoMm) &&
      !Number.isNaN(filamentoG) &&
      !Number.isNaN(diametro) &&
      !Number.isNaN(densidad),
    `${capeta}: la cabecera tiene los datos que hacen falta`
  );

  const t = analizarGcode(texto);

  comprobar(
    t.capas.length === capasDeclaradas,
    `${capeta}: las capas coinciden con la cabecera: ${t.capas.length} leídas, ${capasDeclaradas} declaradas`
  );
  comprobar(
    t.capas.length > 0 && t.capas[0].z < t.capas[t.capas.length - 1].z,
    `${capeta}: la Z de las capas sube`
  );
  comprobar(
    Math.abs(t.capas[t.capas.length - 1].z - maxZ) < 0.01,
    `${capeta}: la última capa está en la Z máxima: ${t.capas[t.capas.length - 1].z} frente a ${maxZ}`
  );
  comprobar(t.tramos.length > 0, `${capeta}: se han leído los tramos: ${t.tramos.length}`);

  /*
   * La extrusión.
   *
   * La suma de los avances **netos**: las retracciones restan, porque el filamento
   * que se tira hacia atrás se vuelve a empujar y no se cuenta dos veces. Es lo
   * que declara el slicer, y es lo que hay que reproducir.
   */
  const diferencia = Math.abs(t.filamento - filamentoMm);
  comprobar(
    diferencia / filamentoMm < 0.005,
    `${capeta}: los milímetros de filamento cuadran: ${t.filamento.toFixed(2)} leídos, ${filamentoMm} declarados`
  );

  /*
   * Y los gramos, que es la prueba de que todo lo demás está bien.
   *
   * Los gramos **no se leen**: se derivan de la extrusión que el lector ha visto.
   */
  const area = Math.PI * (diametro / 2) ** 2;
  const gramos = (t.filamento * area) / 1000 * densidad;
  comprobar(
    Math.abs(gramos - filamentoG) / filamentoG < 0.02,
    `${capeta}: los gramos derivados de la trayectoria cuadran con la cabecera: ${gramos.toFixed(3)} g, ${filamentoG} g`
  );

  /*
   * La caja.
   *
   * La caja que declara la cabecera es la del **objeto**, y el objeto puede estar
   * inclinado: en el fixture real la pieza es más ancha en X que en Y y su
   * proyección no coincide con la caja de la trayectoria. El **centro** sí
   * coincide, y es lo que dice dónde está la pieza.
   */
  const centroTrayectoria = {
    x: (t.caja.min.x + t.caja.max.x) / 2,
    y: (t.caja.min.y + t.caja.max.y) / 2,
  };
  const centroDeclarado = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  comprobar(
    Math.abs(centroTrayectoria.x - centroDeclarado.x) < 5,
    `${capeta}: el centro en X cuadra: ${centroTrayectoria.x.toFixed(2)} frente a ${centroDeclarado.x}`
  );
  comprobar(
    Math.abs(centroTrayectoria.y - centroDeclarado.y) < 5,
    `${capeta}: el centro en Y cuadra: ${centroTrayectoria.y.toFixed(2)} frente a ${centroDeclarado.y}`
  );
  comprobar(
    t.caja.max.z - t.caja.min.z < maxZ * 1.2,
    `${capeta}: la altura de la trayectoria no pasa de la pieza: ${(t.caja.max.z - t.caja.min.z).toFixed(2)} mm`
  );

  comprobar(t.viajes > 0, `${capeta}: hay viajes: ${t.viajes}`);
  comprobar(
    t.extrusionados === t.tramos.length - t.viajes,
    `${capeta}: extrusionados y viajes suman los tramos: ${t.extrusionados} + ${t.viajes} = ${t.tramos.length}`
  );

  const tipos = new Set(t.tramos.map((tr) => tr.tipo).filter(Boolean));
  comprobar(
    tipos.size >= 3,
    `${capeta}: se reconocen los tipos de rasgo: ${tipos.size} distintos (${[...tipos].join(', ')})`
  );
  comprobar(
    [...tipos].every((tipo) => TIPOS_RECONOCIDOS.includes(tipo)),
    `${capeta}: todos los tipos leídos están en el vocabulario`
  );
  comprobar(
    t.movimientos === t.tramos.length,
    `${capeta}: cada movimiento es un tramo: ${t.movimientos} movimientos, ${t.tramos.length} tramos`
  );

  return t;
}

/* ------------------------------------------------------------------------------------
 * El material sintético: el que hace que la comprobación valga en el CI
 * ---------------------------------------------------------------------------------- */

console.log('\n=== El G-code sintético ===\n');

const gcodeSintetico = crearGcodeSintetico();
comprobarTrayectoria(gcodeSintetico, 'sintético');

/*
 * La retracción y su contrarretracción.
 *
 * Es el detalle que separa la cuenta **neta** del slicer de la suma de las
 * positivas: 0,5 hacia atrás y 0,5 hacia delante se cancelan, y un lector que
 * sumara sólo las positivas daría 0,5 mm de más.
 */
const sintetico = analizarGcode(gcodeSintetico);
comprobar(
  Math.abs(sintetico.filamento - 16) < 0.001,
  `sintético: el filamento neto son 16 mm, con la retracción descontada: ${sintetico.filamento.toFixed(3)}`
);

/* ------------------------------------------------------------------------------------
 * El 3MF de proyecto: la malla y el G-code en un archivo
 * ---------------------------------------------------------------------------------- */

console.log('\n=== El 3MF de proyecto ===\n');

const zipSintetico = crear3mfSintetico(gcodeSintetico);
const bufferSintetico = zipSintetico.buffer.slice(
  zipSintetico.byteOffset,
  zipSintetico.byteOffset + zipSintetico.byteLength
);
const proyecto = leerProyecto3mf(bufferSintetico);

comprobar(
  proyecto.placas.length === 1,
  `el 3MF lleva su placa: ${proyecto.placas.join(', ')}`
);
comprobar(
  typeof proyecto.gcode === 'string' && proyecto.gcode.length > 100,
  `el 3MF trae el G-code: ${proyecto.gcode?.length ?? 0} caracteres`
);

/*
 * El G-code del 3MF tiene que ser **el mismo** que el de fuera: es la comprobación
 * de que abrir el ZIP y descomprimir la entrada no ha estropeado ni un byte.
 */
const desde3mf = analizarGcode(proyecto.gcode ?? '');
comprobar(
  desde3mf.capas.length === sintetico.capas.length &&
    Math.abs(desde3mf.filamento - sintetico.filamento) < 0.001,
  `el G-code del 3MF es el mismo: ${desde3mf.capas.length} capas, ${desde3mf.filamento.toFixed(2)} mm`
);

/*
 * Y la alineación: la malla del 3MF y la trayectoria del G-code están en el mismo
 * sitio de la cama.
 *
 * Es la comprobación que hace que la superposición sea **real** y no dos cosas que
 * casualmente se parecen.
 */
const zip = unzipSync(zipSintetico);
const xml = new TextDecoder().decode(zip['3D/3dmodel.model']);
const vertices = [...xml.matchAll(/<vertex x="(-?[\d.]+)" y="(-?[\d.]+)" z="(-?[\d.]+)"/g)].map(
  (m) => ({ x: Number(m[1]), y: Number(m[2]), z: Number(m[3]) })
);
const cajaModelo = {
  min: {
    x: Math.min(...vertices.map((v) => v.x)),
    y: Math.min(...vertices.map((v) => v.y)),
    z: Math.min(...vertices.map((v) => v.z)),
  },
  max: {
    x: Math.max(...vertices.map((v) => v.x)),
    y: Math.max(...vertices.map((v) => v.y)),
    z: Math.max(...vertices.map((v) => v.z)),
  },
};
comprobar(
  cajaModelo.min.x === CAJA_SINTETICA.x0 && cajaModelo.max.x === CAJA_SINTETICA.x1,
  `la malla ocupa la caja de la pieza: X ${cajaModelo.min.x}–${cajaModelo.max.x}`
);
comprobar(
  Math.abs(desde3mf.caja.min.x - cajaModelo.min.x) < 0.01 &&
    Math.abs(desde3mf.caja.max.x - cajaModelo.max.x) < 0.01,
  `la malla y la trayectoria están en el mismo sitio de la cama: X ${cajaModelo.min.x}–${cajaModelo.max.x} frente a ${desde3mf.caja.min.x.toFixed(2)}–${desde3mf.caja.max.x.toFixed(2)}`
);
comprobar(
  desde3mf.caja.min.z >= cajaModelo.min.z - 0.01 && desde3mf.caja.max.z <= cajaModelo.max.z + 0.01,
  `y la trayectoria va dentro de la altura de la malla: Z ${desde3mf.caja.min.z.toFixed(2)}–${desde3mf.caja.max.z.toFixed(2)} dentro de ${cajaModelo.min.z}–${cajaModelo.max.z}`
);

/* ------------------------------------------------------------------------------------
 * El archivo real, si está en la máquina
 * ---------------------------------------------------------------------------------- */

if (existsSync(FIXTURE)) {
  console.log('\n=== El G-code real de la máquina ===\n');
  const textoReal = readFileSync(FIXTURE, 'utf8');
  const real = comprobarTrayectoria(textoReal, 'real');
  comprobar(real.arcos > 0, `real: se han leído los arcos: ${real.arcos}`);
} else {
  console.log(
    '\nEl G-code real no está en esta máquina (está en el .gitignore a propósito).\n' +
      'Las comprobaciones del material real se saltan; las sintéticas no.'
  );
}

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
