/*
 * Repuntar las tarjetas: el troceado del cuerpo, bien.
 *
 * ## Qué falla
 *
 * El primer troceado partía los cuerpos **en las comas y los dos puntos** cuando la
 * frase era larga, y dejaba el separador pegado al punto final:
 *
 *     «… cada capa se apoya sobre la anterior,.»
 *
 * **351 puntos** de las 537 tarjetas tienen ese final, y todos se ven. Es un
 * fallo del script de migración, no del contenido: el `cuerpo` original está
 * intacto y el cotejo lo demuestra.
 *
 * ## Qué hace este script
 *
 * Vuelve a trocear cada `cuerpo` —que es la fuente de verdad— con un troceado que
 * no deja separadores colgando, y **sustituye sólo el `puntos`**. Ni el `cuerpo`,
 * ni el `titulo`, ni la `cita`, ni ninguna otra propiedad se tocan.
 *
 * ## El troceado correcto
 *
 * 1. **Primero las frases.** El punto se queda con su frase.
 * 2. **Si una frase es larga**, se parte por una cláusula —coma, punto y coma o
 *    dos puntos— y, si un trozo sale todavía largo, por conjunción y, en último
 *    caso, por palabras.
 * 3. **Cada trozo termina en punto**, sin el separador colgando, y el siguiente
 *    **empieza en mayúscula**: en el cuerpo ya no es una continuación, es una
 *    frase propia.
 * 4. **Un trozo demasiado corto se pega al siguiente**, si cabe. Un punto de
 *    «y el centro.» no es un punto, es un resto.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CARPETA = join(RAIZ, 'src', 'content', 'guias');
const NO_ES_GUIA = new Set(['tipos.ts', 'autor.ts']);

/** Un punto es una línea: 140 caracteres. */
export const MAX_PUNTO = 140;

/**
 * El límite del contenido antes de terminarlo.
 *
 * Un punto que se corta por cláusula acaba con un punto final que no estaba, y
 * ese punto cuenta: un texto de 140 que se termina en 141 no cabe en una línea.
 */
const MAX_CONTENIDO = MAX_PUNTO - 1;

/** Un punto por debajo de esto no es un punto: es un resto, y se pega al siguiente. */
export const MIN_PUNTO = 40;

/**
 * Un corte de frase.
 *
 * El `*` está en el grupo de arranque porque en markdown un punto seguido de
 * negrita («**Demasiado alto:** la línea…») es una frase nueva, y sin él el
 * troceado se comía dos frases en un solo punto.
 */
const FRASE = /(?<=[.!?])\s+(?=[«"'*A-ZÁÉÍÓÚÑ0-9])/;

/** Un corte de cláusula: coma, punto y coma o dos puntos. */
const CLAUSULA = /(?<=[,;:])\s+/;

/** Un corte por conjunción: el final de una subordinada. */
const CONJUNCION = /(?<=\s)(?=(?:y|pero|o|que|porque|aunque|si)\s)/i;

/** Normaliza un texto: quita las comillas angulares y deja el resto. */
function limpiar(texto) {
  return texto.replace(/«/g, '"').replace(/»/g, '"').trim();
}

/**
 * Devuelve el texto con la primera letra en mayúscula.
 *
 * Se salta los signos de markdown: «**Demasiado bajo:**» empieza por asteriscos,
 * y poner mayúscula en el asterisco no capitaliza nada.
 */
function mayuscula(texto) {
  const i = texto.search(/[a-záéíóúñü]/i);
  if (i < 0) return texto;
  return texto.slice(0, i) + texto[i].toUpperCase() + texto.slice(i + 1);
}

/**
 * Termina un fragmento: le quita el separador colgando y le pone un punto.
 */
function terminar(texto) {
  let limpio = texto.trim().replace(/[,;:]\s*$/, '');
  if (limpio.length === 0) return texto.trim();
  if (!/[.!?]$/.test(limpio)) limpio += '.';
  return limpio;
}

/**
 * Parte un texto por los cortes que marca una expresión regular.
 *
 * **Un corte sólo cuenta si deja un trozo de verdad delante.** Si no, el troceado
 * se va a mil cortes de tres caracteres —«Lo | que sí se puede decir es | que…»— y
 * luego el reenganche acaba partiendo donde no debe: «…al enfriarse— y.».
 *
 * Por eso dos cortes tienen que estar separados por al menos `MIN_PUNTO`
 * caracteres. Con esa regla, el texto de arriba se parte en dos: lo que va antes
 * de «y que la diferencia…» y lo que va después.
 *
 * @param {string} texto El texto a partir.
 * @param {RegExp} regex Los cortes.
 * @returns {string[]} Los trozos.
 */
function cortarPor(texto, regex) {
  const cortes = [];
  let ultimo = 0;
  let coincidencia;
  const busqueda = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  while ((coincidencia = busqueda.exec(texto)) !== null) {
    if (coincidencia.index - ultimo >= MIN_PUNTO) {
      cortes.push(coincidencia.index);
      ultimo = coincidencia.index;
    }
    if (coincidencia.index === busqueda.lastIndex) busqueda.lastIndex += 1;
  }

  const trozos = [];
  let inicio = 0;
  for (const corte of cortes) {
    const trozo = texto.slice(inicio, corte).trim();
    if (trozo) trozos.push(trozo);
    inicio = corte;
  }
  const ultimoTrozo = texto.slice(inicio).trim();
  if (ultimoTrozo) trozos.push(ultimoTrozo);
  return trozos;
}

/**
 * Agrupa los trozos en líneas que caben, sin partir ninguno por la mitad.
 */
function agrupar(trozos) {
  const out = [];
  let actual = '';
  for (const trozo of trozos) {
    const candidata = actual ? actual + ' ' + trozo : trozo;
    if (actual && candidata.length > MAX_CONTENIDO) {
      out.push(actual);
      actual = trozo;
    } else {
      actual = candidata;
    }
  }
  if (actual) out.push(actual);
  return out;
}

/**
 * Parte un texto largo en trozos que caben en una línea.
 *
 * Primero por cláusula; un trozo que sigue siendo largo se parte por
 * conjunción y, en último caso, por palabras.
 *
 * @param {string} texto El texto a partir.
 * @returns {string[]} Los trozos.
 */
function partirPorClausula(texto) {
  const trozos = agrupar(cortarPor(texto, CLAUSULA));
  const out = [];
  for (const trozo of trozos) {
    if (trozo.length <= MAX_CONTENIDO) {
      out.push(trozo);
      continue;
    }
    out.push(...partirPorPalabras(trozo));
  }
  return out;
}

/**
 * Parte por conjunción y, si hace falta, por palabras.
 */
function partirPorPalabras(texto) {
  const porConjuncion = agrupar(cortarPor(texto, CONJUNCION));
  const out = [];
  for (const trozo of porConjuncion) {
    if (trozo.length <= MAX_CONTENIDO) {
      out.push(trozo);
      continue;
    }
    let acumulado = '';
    for (const palabra of trozo.split(' ')) {
      const candidata = acumulado ? acumulado + ' ' + palabra : palabra;
      if (acumulado && candidata.length > MAX_CONTENIDO) {
        out.push(acumulado);
        acumulado = palabra;
      } else {
        acumulado = candidata;
      }
    }
    if (acumulado) out.push(acumulado);
  }
  return out;
}

/**
 * Trocea un cuerpo en puntos.
 *
 * @param {string} cuerpo El cuerpo original, intacto.
 * @returns {string[]} Los puntos.
 */
export function trocearCuerpo(cuerpo) {
  const puntos = [];

  for (const frase of cuerpo.split(FRASE)) {
    const limpia = limpiar(frase);
    if (!limpia) continue;
    if (limpia.length <= MAX_CONTENIDO) {
      puntos.push(limpia);
      continue;
    }
    puntos.push(...partirPorClausula(limpia));
  }

  // Un punto demasiado corto se pega al siguiente, si cabe.
  const pegados = [];
  for (const punto of puntos) {
    const anterior = pegados[pegados.length - 1];
    if (anterior !== undefined && anterior.length < MIN_PUNTO) {
      const unido = `${anterior} ${punto}`;
      if (unido.length <= MAX_CONTENIDO) {
        pegados[pegados.length - 1] = unido;
        continue;
      }
    }
    pegados.push(punto);
  }

  // Red de seguridad: un punto que se pasó por un corte raro se parte por
  // palabras. Un punto de 141 es un punto de 140 y medio.
  const finales = [];
  for (const punto of pegados) {
    if (punto.length <= MAX_CONTENIDO) {
      finales.push(punto);
      continue;
    }
    finales.push(...partirPorPalabras(punto));
  }

  // Cada punto termina en punto y el siguiente empieza en mayúscula.
  return finales.map((punto, i) => {
    const terminado = terminar(punto);
    return i === 0 ? terminado : mayuscula(terminado);
  });
}

/** Escapa una cadena para TypeScript. */
function escapar(texto) {
  return texto
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');
}

/** El bloque de texto con la forma que usa el repositorio. */
function formatear(puntos, sangria) {
  const dentro = puntos.map((p) => `${sangria}  '${escapar(p)}',`).join('\n');
  return `puntos: [\n${dentro}\n${sangria}]`;
}

/**
 * Repunta las tarjetas de las guías.
 */
export function repuntar() {
  let totalTarjetas = 0;
  let totalPuntos = 0;
  let ficheros = 0;

  for (const nombre of readdirSync(CARPETA).filter((f) => f.endsWith('.ts') && !NO_ES_GUIA.has(f))) {
    const ruta = join(CARPETA, nombre);
    const original = readFileSync(ruta, 'utf8');
    const source = ts.createSourceFile(ruta, original, ts.ScriptTarget.Latest, true);

    /** Los cambios: posición de inicio, posición de fin, texto. */
    const cambios = [];

    const visitar = (nodo) => {
      if (ts.isArrayLiteralExpression(nodo)) {
        for (const elemento of nodo.elements) {
          if (!ts.isObjectLiteralExpression(elemento)) continue;
          const cuerpo = elemento.properties.find(
            (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'cuerpo'
          );
          const puntos = elemento.properties.find(
            (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'puntos'
          );
          if (!cuerpo || !puntos) continue;
          const inicializador = cuerpo.initializer;
          if (!ts.isStringLiteral(inicializador)) continue;

          const nuevos = trocearCuerpo(inicializador.text);
          if (nuevos.length === 0) continue;

          const linea = source.getLineAndCharacterOfPosition(puntos.name.getStart(source));
          const sangria = ' '.repeat(linea.character);

          cambios.push({
            inicio: puntos.getStart(source),
            fin: puntos.getEnd(source),
            texto: formatear(nuevos, sangria),
          });
          totalTarjetas += 1;
          totalPuntos += nuevos.length;
        }
      }
      ts.forEachChild(nodo, visitar);
    };
    visitar(source);

    if (cambios.length === 0) continue;

    let texto = original;
    cambios.sort((a, b) => b.inicio - a.inicio);
    for (const cambio of cambios) {
      texto = texto.slice(0, cambio.inicio) + cambio.texto + texto.slice(cambio.fin);
    }
    writeFileSync(ruta, texto, 'utf8');
    ficheros += 1;
    console.log(`  repunta ${nombre}: ${cambios.length} tarjetas`);
  }

  console.log(`\n${ficheros} ficheros, ${totalTarjetas} tarjetas, ${totalPuntos} puntos.`);
  return { ficheros, totalTarjetas, totalPuntos };
}

// Sólo cuando se ejecuta como programa: importarlo no debe cambiar nada.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  repuntar();
}
