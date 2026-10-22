/**
 * Los campos protegidos de las guías, contra una base.
 *
 * ## Qué protege
 *
 * El `accion`, el `valor`, el `alcance`, el `fuente` y el `cuando` de cada regla, y
 * el `titulo`, el `cuerpo` y la `cita` de cada tarjeta. El `porque` **no** está
 * protegido, porque se acorta a propósito y se reescribe en cada vuelta.
 *
 * ## Por qué hace falta
 *
 * Porque hay dos formas de romper una guía y sólo una se ve.
 *
 * La que se ve es el `porque`: un texto raro, un tono que no encaja, una frase que
 * dice otra cosa. La que **no** se ve es un `alcance` que se ha movido, una `fuente`
 * que ha cambiado de nombre o un `cuando` que ha apuntado a otra variable: el texto
 * sigue leyéndose bien y la guía sigue funcionando, pero **dice otra cosa**.
 *
 * Y hay un motivo estructural para que duela: esta vuelta la escribieron veinte y
 * cuatro agentes, y en una de ellas un `porque` se comió un dato que la fuente
 * respaldaba. Lo que se perdió no se notó en la lectura: se notó al cotejar campo
 * por campo contra lo que había antes.
 *
 * ## La regla que impone
 *
 * Un cambio en un campo protegido **tiene que actualizar la fecha de la guía**. La
 * fecha de una guía dice cuándo se revisó su contenido, y si un campo protegido
 * cambia y la fecha no, la fecha **miente** — y una fecha que miente es peor que
 * ninguna, porque es la que se usa para saber si un texto está al día.
 *
 * Cuando el cambio es legítimo, la comprobación **pide regenerar la base** y sale
 * con código 1. Es el flujo de un fichero dorado: el cambio se hace a propósito, en
 * un commit, y la base se regenera en ese mismo commit.
 *
 * ## Uso
 *
 *   node scripts/verify/protegidos.mjs              # comprueba contra la base
 *   node scripts/verify/protegidos.mjs --actualizar  # regenera la base
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GUIAS } from '../../src/lib/guias.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BASE = join(RAIZ, 'scripts', 'verify', 'base-guias.json');

/** Los campos que una regla no puede cambiar en silencio. */
const CAMPOS_REGLA = ['accion', 'valor', 'alcance', 'fuente', 'cuando'];
/** Los campos que una tarjeta no puede cambiar en silencio. */
const CAMPOS_TARJETA = ['titulo', 'cuerpo', 'cita'];

/** La huella de un objeto, por sus campos protegidos. */
function huella(campos) {
  const texto = JSON.stringify(campos);
  return createHash('sha1').update(texto).digest('hex').slice(0, 16);
}

/** Las huellas de una guía. */
function huellasDe(guia) {
  const mapa = {};
  for (const regla of guia.reglas) {
    mapa[`regla:${regla.id}`] = huella(
      CAMPOS_REGLA.map((campo) => regla[campo] ?? null)
    );
  }
  for (const tarjeta of guia.conocimiento) {
    mapa[`tarjeta:${tarjeta.id}`] = huella(
      CAMPOS_TARJETA.map((campo) => tarjeta[campo] ?? null)
    );
  }
  return mapa;
}

/** La base de ahora, sin leerla. */
function baseActual() {
  const guias = {};
  for (const guia of GUIAS) {
    guias[guia.slug] = {
      actualizado: guia.actualizado,
      huellas: huellasDe(guia),
    };
  }
  return { version: 1, guias };
}

if (process.argv.includes('--actualizar')) {
  const base = baseActual();
  writeFileSync(BASE, JSON.stringify(base, null, 2) + '\n', 'utf8');
  const guias = Object.keys(base.guias).length;
  let campos = 0;
  for (const g of Object.values(base.guias)) campos += Object.keys(g.huellas).length;
  console.log(`Base regenerada: ${guias} guías, ${campos} referencias.`);
  process.exit(0);
}

const base = JSON.parse(readFileSync(BASE, 'utf8'));
const ahora = baseActual();

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

const guiasNuevas = Object.keys(ahora.guias).filter((s) => !(s in base.guias));
const guiasFuera = Object.keys(base.guias).filter((s) => !(s in ahora.guias));

for (const slug of guiasNuevas) {
  comprobar(false, `${slug}: es una guía nueva y no está en la base: regenérala`);
}
for (const slug of guiasFuera) {
  comprobar(false, `${slug}: estaba en la base y ya no existe`);
}

let sinFecha = 0;
let conFecha = 0;

for (const [slug, guia] of Object.entries(ahora.guias)) {
  const antes = base.guias[slug];
  if (!antes) continue;

  const cambios = [];
  for (const [clave, huella] of Object.entries(guia.huellas)) {
    const previa = antes.huellas[clave];
    if (previa === undefined) {
      cambios.push(`${clave} (nuevo)`);
    } else if (previa !== huella) {
      cambios.push(clave);
    }
  }
  for (const clave of Object.keys(antes.huellas)) {
    if (!(clave in guia.huellas)) cambios.push(`${clave} (borrado)`);
  }

  if (cambios.length === 0) continue;

  if (guia.actualizado === antes.actualizado) {
    sinFecha += 1;
    fallos.push(
      `${slug}: han cambiado ${cambios.length} referencias protegidas (${cambios
        .slice(0, 4)
        .join(', ')}${cambios.length > 4 ? '…' : ''}) y la fecha sigue en ${guia.actualizado}: o se actualiza la fecha de la guía, o el cambio no es legítimo`
    );
  } else {
    conFecha += 1;
    checks.push(
      `  ok    ${slug}: han cambiado ${cambios.length} referencias protegidas y la fecha pasa de ${antes.actualizado} a ${guia.actualizado} — regenera la base`
    );
  }
}

console.log(`\nGuías en la base: ${Object.keys(base.guias).length}`);
console.log(`Referencias protegidas: ${Object.values(base.guias).reduce((a, g) => a + Object.keys(g.huellas).length, 0)}`);
console.log(`Cambios con fecha actualizada: ${conFecha}`);
console.log(`Cambios sin fecha: ${sinFecha}\n`);

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  ✗ ${f}`);
  console.log(
    '\nSi el cambio es legítimo, actualiza la fecha de la guía y regenera la base:\n' +
      '  node scripts/verify/protegidos.mjs --actualizar'
  );
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
