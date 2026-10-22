/**
 * La deuda de texto de las guías, medida.
 *
 * ## Qué mide
 *
 * Las cuatro cosas que hacen que una guía sea un muro de texto, con su número:
 *
 * 1. **Los `porque` largos.** El `porque` de una acción es una frase: por qué
 *    funciona. Hay 583 reglas y 213 de ellas lo tienen de más de 200
 *    caracteres —dos o tres frases encadenadas, que en la página se leen como un
 *    párrafo debajo de la acción.
 * 2. **Los `resumen` de más de una frase.** El contrato dice que el resumen es
 *    una frase, y 19 guías lo tienen repartido en `resumen` + `resumenExtra`.
 * 3. **Los cuerpos de las tarjetas sin trocear.** 520 tarjetas, y las que no
 *    tienen `puntos` se leen como un bloque.
 * 4. **Las reglas sin indicador.** Un verbo que nadie sabe traducir a un
 *    indicador es una acción que se pinta sin nada que la distinga.
 *
 * ## Y qué hace
 *
 * Es un **freno**: el número de partida está escrito aquí y sólo puede bajar. Si
 * alguien escribe un `porque` más largo, esto falla. Si alguien lo acorta, el
 * número baja y hay que actualizar el de aquí.
 *
 * Un freno sólo sirve si el número de partida es verdad, así que el script lo
 * **comprueba**: si el número real es menor que el de aquí, avisa de que hay que
 * actualizar el freno, porque un freno que no se actualiza deja de avisar.
 *
 * Uso:  npm run verify:texto
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GUIAS } from '../../src/lib/guias.ts';
import { indicadorDeAccion } from '../../src/lib/indicadores.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** El límite de una línea. */
const MAX_PORQUE = 200;

/**
 * Los números de partida.
 *
 * Son los del 21 de octubre de 2026, con las 32 guías migradas a `puntos`,
 * `indicador` y `resumenExtra`. **Sólo pueden bajar.**
 */
const FRENO = {
  porqueLargos: 213,
  resumenesPartidos: 19,
  tarjetasSinPuntos: 0,
  reglasSinIndicador: 0,
};

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/* ------------------------------------------------------------------------------------
 * La medida
 * ---------------------------------------------------------------------------------- */

let porqueLargos = 0;
let resumenesPartidos = 0;
let tarjetasSinPuntos = 0;
let reglasSinIndicador = 0;
let tarjetas = 0;
let reglas = 0;
let palabras = 0;
let palabrasPorque = 0;

const porGuia = [];

for (const guia of GUIAS) {
  const largos = guia.reglas.filter((r) => r.porque.length > MAX_PORQUE);
  const sinPuntos = guia.conocimiento.filter((c) => !c.puntos);
  /*
   * Una regla **sin indicador** no es la que no lo declara: casi ninguna lo
   * declara, porque el indicador sale del verbo. Es la cuyo verbo no se sabe
   * traducir, que es lo mismo que no se puede pintar.
   */
  const sinIndicador = guia.reglas.filter((r) => indicadorDeAccion(r.accion, r.indicador) === null);

  porqueLargos += largos.length;
  tarjetasSinPuntos += sinPuntos.length;
  reglasSinIndicador += sinIndicador.length;
  tarjetas += guia.conocimiento.length;
  reglas += guia.reglas.length;

  if (guia.resumenExtra) resumenesPartidos += 1;

  for (const regla of guia.reglas) {
    palabrasPorque += regla.porque.split(/\s+/).length;
  }
  for (const tarjeta of guia.conocimiento) {
    palabras += (tarjeta.cuerpo ?? '').split(/\s+/).length;
  }

  if (largos.length > 0 || sinPuntos.length > 0 || sinIndicador.length > 0) {
    porGuia.push({
      slug: guia.slug,
      porque: largos.length,
      sinPuntos: sinPuntos.length,
      sinIndicador: sinIndicador.length,
    });
  }
}

console.log('\n=== La deuda de texto ===\n');
console.log(`  guías: ${GUIAS.length} · tarjetas: ${tarjetas} · reglas: ${reglas}`);
console.log(`  palabras de cuerpo: ${palabras} · palabras de porqué: ${palabrasPorque}`);
console.log(`  porqué de más de ${MAX_PORQUE} caracteres: ${porqueLargos}`);
console.log(`  resúmenes partidos en resumen + resumenExtra: ${resumenesPartidos}`);
console.log(`  tarjetas sin puntos: ${tarjetasSinPuntos}`);
console.log(`  reglas cuyo verbo no se traduce a un indicador: ${reglasSinIndicador}`);

if (porGuia.length > 0) {
  console.log('\n  guías con deuda:');
  for (const g of porGuia) {
    console.log(
      `    ${g.slug.padEnd(26)} porqué: ${g.porque}  ·  sin puntos: ${g.sinPuntos}  ·  sin indicador: ${g.sinIndicador}`
    );
  }
}

/* ------------------------------------------------------------------------------------
 * El freno
 * ---------------------------------------------------------------------------------- */

console.log('\n=== El freno ===\n');

comprobar(
  porqueLargos <= FRENO.porqueLargos,
  `los porqué largos no crecen: ${porqueLargos} de ${FRENO.porqueLargos} que había`
);
comprobar(
  resumenesPartidos <= FRENO.resumenesPartidos,
  `los resúmenes partidos no crecen: ${resumenesPartidos} de ${FRENO.resumenesPartidos}`
);
comprobar(
  tarjetasSinPuntos <= FRENO.tarjetasSinPuntos,
  `las tarjetas sin puntos no crecen: ${tarjetasSinPuntos} de ${FRENO.tarjetasSinPuntos}`
);
comprobar(
  reglasSinIndicador <= FRENO.reglasSinIndicador,
  `las reglas sin indicador no crecen: ${reglasSinIndicador} de ${FRENO.reglasSinIndicador}`
);

/*
 * El otro lado del freno: si el número **ha bajado**, el de aquí está
 * desactualizado y hay que arreglarlo. Un freno que no se actualiza deja de
 * avisar de las subidas siguientes, que es peor que no tenerlo.
 */
comprobar(
  porqueLargos === FRENO.porqueLargos,
  `AVISO: el freno de los porqué está desactualizado (${porqueLargos} reales, ${FRENO.porqueLargos} en el script): actualiza FRENO.porqueLargos`
);
comprobar(
  tarjetasSinPuntos === FRENO.tarjetasSinPuntos,
  `AVISO: el freno de las tarjetas sin puntos está desactualizado (${tarjetasSinPuntos} reales, ${FRENO.tarjetasSinPuntos} en el script): actualiza FRENO.tarjetasSinPuntos`
);

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
