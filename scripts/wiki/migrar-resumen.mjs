/*
 * El resumen, partido en dos.
 *
 * ## El problema
 *
 * El contrato dice que `resumen` es **una frase**: «Sale en la tarjeta del índice y en
 * el `description`». La realidad es otra: la longitud media es de 164 caracteres y
 * **19 de las 32 guías tienen más de una frase**. Una tarjeta de índice con tres
 * frases no es un resumen, y una cabecera de guía con un párrafo de 124 px de alto
 * es exactamente el muro de texto que este trabajo viene a quitar.
 *
 * ## Qué hace
 *
 * Parte el resumen en su primera frase —que se queda en `resumen`— y el resto pasa a
 * `resumenExtra`. **No se pierde ni una palabra**: las dos mitades juntas son el
 * resumen de antes, y el cotejo lo comprueba.
 *
 * ## Dónde se ve cada mitad
 *
 * - `resumen`: la tarjeta del índice, el `description` y la cabecera de la guía.
 * - `resumenExtra`: sólo la cabecera de la guía, debajo del resumen, porque la
 *   tarjeta del índice y el `description` tienen que ser una línea.
 *
 * Uso:  node scripts/wiki/migrar-resumen.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CARPETA = join(RAIZ, 'src', 'content', 'guias');
const NO_ES_GUIA = new Set(['tipos.ts', 'autor.ts']);

/**
 * La primera frase de un texto.
 *
 * Corta en el primer terminador que abre otra frase, y **no** corta después de una
 * abreviatura: «M6.» y «S.» son el final de una frase en apariencia, y cortar ahí
 * parte el texto por la mitad.
 */
export function primeraFrase(texto) {
  const patron = /([.!?])\s+(?=[«"'A-ZÁÉÍÓÚÑ0-9])/g;
  let match;
  while ((match = patron.exec(texto)) !== null) {
    const antes = texto.slice(0, match.index);
    const ultimaPalabra = (antes.match(/([^\s]+)$/) ?? ['', ''])[1];
    const esAbreviatura =
      ultimaPalabra.length > 0 &&
      ultimaPalabra.length <= 3 &&
      /[A-Za-zÁÉÍÓÚÑáéíóúñ0-9][.!?]$/.test(ultimaPalabra);
    if (!esAbreviatura) return { primera: (antes + match[1]).trim(), resto: texto.slice(match.index + match[1].length).trim() };
  }
  return { primera: texto.trim(), resto: '' };
}

/** El resumen de un fichero, tal y como está en el código. */
const RESUMEN = /^([ \t]*)resumen:\s*\n?[ \t]*'((?:[^'\\]|\\.)*)',?\s*$/m;

const ficheros = readdirSync(CARPETA).filter(
  (f) => f.endsWith('.ts') && !NO_ES_GUIA.has(f)
);

let migrados = 0;
let palabrasAntes = 0;
let palabrasDespues = 0;

for (const fichero of ficheros) {
  const ruta = join(CARPETA, fichero);
  const texto = readFileSync(ruta, 'utf8');
  const match = texto.match(RESUMEN);
  if (!match) continue;

  const sangria = match[1];
  const resumen = match[2].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  const { primera, resto } = primeraFrase(resumen);

  palabrasAntes += resumen.split(/\s+/).length;
  palabrasDespues += primera.split(/\s+/).length + (resto ? resto.split(/\s+/).length : 0);

  if (!resto) continue;

  const escapar = (t) => `'${t.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  const sustitucion =
    `${sangria}resumen:\n${sangria}  ${escapar(primera)},\n` +
    `${sangria}resumenExtra:\n${sangria}  ${escapar(resto)},`;

  writeFileSync(ruta, texto.replace(RESUMEN, sustitucion), 'utf8');
  migrados++;
  console.log(`  migra ${fichero}: «${primera.slice(0, 48)}…»`);
}

console.log(`\n${migrados} resúmenes partidos.`);
console.log(`Palabras de resumen antes: ${palabrasAntes}`);
console.log(`Palabras de resumen después: ${palabrasDespues}`);
