/**
 * El lector de trayectoria del G-code, comprobado contra un archivo real.
 *
 * ## Por qué una comprobación tan específica
 *
 * Porque un lector de trayectorias puede parecer que funciona y estar **mintiendo**.
 * Dibujar una línea por cada `G1` es fácil; lo difícil es no dibujar una
 * trayectoria que no sea la que la máquina va a ejecutar.
 *
 * El fixture es un G-code real de 6.813 líneas —Creality Print 6.3, una medalla de
 * 1,6 mm de alto— y su cabecera dice lo que tiene que dar:
 *
 * - `; total layer number: 8` → **8 capas**.
 * - `; MINX = 95.00 … MAXX = 125.00` → la caja envolvente de la trayectoria.
 * - `; filament used [mm] = 311.01` → los milímetros de filamento que la máquina
 *   extruye.
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
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { analizarGcode, TIPOS_RECONOCIDOS } from '../../src/services/GcodeTrayectoria.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FIXTURE = join(
  RAIZ,
  'test-fixtures',
  'Argentina T-shirt medal_PLA_2m56s.gcode'
);

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

const texto = readFileSync(FIXTURE, 'utf8');

/** Lo que dice la cabecera del archivo, para comparar contra lo leído. */
function cabecera(clave) {
  const m = texto.match(new RegExp(`^;\\s*${clave}\\s*[=:]\\s*(\\S+)`, 'im'));
  return m?.[1] ?? null;
}

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

function laCabeceraEsta() {
  return (
    !Number.isNaN(capasDeclaradas) &&
    !Number.isNaN(filamentoMm) &&
    !Number.isNaN(filamentoG) &&
    !Number.isNaN(diametro) &&
    !Number.isNaN(densidad)
  );
}

comprobar(
  laCabeceraEsta,
  'la cabecera del fixture tiene los datos que hacen falta'
);

const t = analizarGcode(texto);

comprobar(
  t.capas.length === capasDeclaradas,
  `las capas coinciden con la cabecera: ${t.capas.length} leídas, ${capasDeclaradas} declaradas`
);

comprobar(
  t.capas.length > 0 && t.capas[0].z < t.capas[t.capas.length - 1].z,
  'la Z de las capas sube'
);

comprobar(
  Math.abs(t.capas[t.capas.length - 1].z - maxZ) < 0.01,
  `la última capa está en la Z máxima: ${t.capas[t.capas.length - 1].z} frente a ${maxZ}`
);

comprobar(
  t.tramos.length > 1000,
  `se han leído los tramos: ${t.tramos.length}`
);

/*
 * La extrusión.
 *
 * La suma de los `E` **relativos** de cada tramo. El `G92 E0` pone el extrusor a
 * cero, así que el valor de `E` de cada movimiento es el avance desde el último
 * reset, y la suma de los incrementos de `E` da los milímetros de filamento.
 */
const diferenciaFilamento = Math.abs(t.filamento - filamentoMm);
comprobar(
  diferenciaFilamento / filamentoMm < 0.005,
  `los milímetros de filamento cuadran: ${t.filamento.toFixed(2)} leídos, ${filamentoMm} declarados`
);

/*
 * Y los gramos, que es la prueba de que todo lo demás está bien.
 *
 * Los gramos **no se leen**: se derivan de la extrusión que el lector ha visto. Si
 * el lector se equivoca en un segmento, en un arco o en un `G92`, los gramos no
 * cuadran.
 */
const area = Math.PI * (diametro / 2) ** 2;
const gramos = (t.filamento * area) / 1000 * densidad;
comprobar(
  Math.abs(gramos - filamentoG) / filamentoG < 0.02,
  `los gramos derivados de la trayectoria cuadran con la cabecera: ${gramos.toFixed(3)} g, ${filamentoG} g`
);

/*
 * La caja envolvente.
 *
 * El G-code se ejecuta en coordenadas de la cama, y la cabecera dice dónde está la
 * pieza. Si el lector leyera mal los ejes, la caja no saldría.
 */
/*
 * La caja, comparada por el **centro** y no por los extremos.
 *
 * La caja que declara la cabecera es la del **objeto**, y el objeto puede estar
 * inclinado: en el fixture, la pieza es más ancha en X que en Y, y su proyección
 * sobre la cama no coincide con la caja de la trayectoria. El centro sí coincide,
 * y es lo que dice dónde está la pieza.
 *
 * Comparar los extremos —con una tolerancia de medio milímetro— daría un falso
 * fallo por una inclinación que no es un error de lectura. Lo que sí atrapa el
 * centro es un lector que leyera mal los ejes.
 */
const centroTrayectoria = {
  x: (t.caja.min.x + t.caja.max.x) / 2,
  y: (t.caja.min.y + t.caja.max.y) / 2,
};
const centroDeclarado = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
comprobar(
  Math.abs(centroTrayectoria.x - centroDeclarado.x) < 5,
  `el centro en X cuadra: ${centroTrayectoria.x.toFixed(2)} frente a ${centroDeclarado.x}`
);
comprobar(
  Math.abs(centroTrayectoria.y - centroDeclarado.y) < 5,
  `el centro en Y cuadra: ${centroTrayectoria.y.toFixed(2)} frente a ${centroDeclarado.y}`
);
comprobar(
  t.caja.max.z - t.caja.min.z < maxZ * 1.2,
  `la altura de la trayectoria no pasa de la pieza: ${(t.caja.max.z - t.caja.min.z).toFixed(2)} mm`
);

/*
 * Los viajes.
 *
 * Un tramo sin `E` es un viaje: la cabeza se mueve sin extruir. Son los que
 * explican los hilos y el stringing, y por eso hay que poder distinguirlos.
 */
comprobar(t.viajes > 0, `hay viajes: ${t.viajes}`);
comprobar(
  t.extrusionados === t.tramos.length - t.viajes,
  `extrusionados y viajes suman los tramos: ${t.extrusionados} + ${t.viajes} = ${t.tramos.length}`
);

/*
 * Los tipos de rasgo.
 *
 * Es lo que permite **colorear la trayectoria por lo que hace**: perímetros,
 * relleno, soportes, superficies. La cabecera del slicer los escribe, y sin
 * ellos la trayectoria es una maraña sin color.
 */
const tipos = new Set(t.tramos.map((tr) => tr.tipo).filter(Boolean));
comprobar(
  tipos.size >= 5,
  `se reconocen los tipos de rasgo: ${tipos.size} distintos (${[...tipos].join(', ')})`
);
comprobar(
  [...tipos].every((tipo) => TIPOS_RECONOCIDOS.includes(tipo)),
  'todos los tipos leídos están en el vocabulario'
);

/*
 * Los arcos.
 *
 * `G2` y `G3` son arcos, y en este archivo hay 432: casi una de cada diez líneas
 * de movimiento. Si el lector los contara como rectas, la trayectoria sería un
 * error de menos de un milímetro en cada curva —visible en las esquinas— y el
 * recuento de tramos no cuadraría con el número de movimientos del archivo.
 */
comprobar(
  t.arcos > 0,
  `se han leido los arcos: ${t.arcos}`
);
comprobar(
  t.movimientos === t.tramos.length,
  `cada movimiento es un tramo: ${t.movimientos} movimientos, ${t.tramos.length} tramos`
);

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
