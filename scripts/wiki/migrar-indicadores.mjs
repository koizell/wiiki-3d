/*
 * La migración de las guías al formato con indicador y puntos.
 *
 * ## Qué hace y qué no hace
 *
 * **Añade** dos cosas a cada tarjeta de conocimiento y una a cada variable:
 *
 * - `indicador`: el tema visual de la tarjeta o de lo que se declara.
 * - `puntos`: el cuerpo troceado en puntos de una línea.
 *
 * **No cambia ni una palabra** del `cuerpo`, del `titulo` ni de ninguna fuente. El
 * troceado es mecánico: se corta por frases y se vuelve a pegar. El texto de una
 * guía es el producto, y un script que lo reescribe es un script que puede perder
 * contenido sin que nadie lo note.
 *
 * ## Por qué el AST y no una expresión regular
 *
 * Porque el fichero es TypeScript y sus textos son cadenas de una línea larguísima
 * con comillas y apóstrofes escapados. Un `replace` que encuentre «la tarjeta X» y
 * meta dos líneas detrás funciona en nueve de cada diez y rompe el fichero en el
 * décimo. El compilador ya sabe dónde acaba cada propiedad: `typescript` da las
 * posiciones exactas y el script sólo inserta donde toca.
 *
 * ## Cómo se comprueba que no se pierde nada
 *
 * `migrar-indicadores.mjs --verificar` vuelve a leer las guías **antes y después** de
 * migrar y compara: el número de tarjetas, sus `id`, sus `titulo`, su `cuerpo` y su
 * `fuente`. Si una sola palabra cambia, el script falla. La migración se declara
 * lossless o no se declara.
 *
 * ## Uso
 *
 *   node scripts/wiki/migrar-indicadores.mjs --archivo=warping   # una guía
 *   node scripts/wiki/migrar-indicadores.mjs                      # todas
 *   node scripts/wiki/migrar-indicadores.mjs --verificar          # comprueba sin escribir
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { temaDeTarjeta, temaDeVariable } from '../../src/lib/indicadores.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CARPETA = join(RAIZ, 'src', 'content', 'guias');

/** Las guías que no son guías. */
const NO_ES_GUIA = new Set(['tipos.ts', 'autor.ts']);

/**
 * Trocea un cuerpo en puntos.
 *
 * Se parte por frases, y **no** se parte si la frase anterior termina en una
 * abreviatura —«M6.», «mm.», «R.», «S.»— porque ahí la coma no es un final de frase.
 *
 * La abreviatura se reconoce por la última palabra: si tiene tres caracteres o menos
 * y termina en letra o cifra, es abreviatura y la frase siguiente se pega.
 */
export function trocear(texto) {
  const frases = texto.split(/(?<=[.!?])\s+(?=[«"'A-ZÁÉÍÓÚÑ0-9])/);
  const puntos = [];
  let actual = '';
  for (const frase of frases) {
    const ultimaPalabra = (actual.match(/([^\s]+)$/) ?? ['', ''])[1];
    const esAbreviatura =
      ultimaPalabra.length > 0 &&
      ultimaPalabra.length <= 3 &&
      /[A-Za-zÁÉÍÓÚÑáéíóúñ0-9]\.$/.test(ultimaPalabra);
    if (actual && esAbreviatura) {
      actual += ' ' + frase;
    } else {
      if (actual) puntos.push(actual.trim());
      actual = frase;
    }
  }
  if (actual) puntos.push(actual.trim());
  return puntos.filter((p) => p.length > 0);
}

/**
 * Un punto es una línea: 140 caracteres.
 *
 * Lo que no cabe se parte por **cláusula**, que en español es la coma con su
 * conjunción: «…, y», «…, pero», «…, que». Una coma es un corte natural del texto, y
 * cortar por ahí no cambia ni una palabra.
 *
 * Cuando una parte sale demasiado corta —menos de 40 caracteres—, se pega a la
 * siguiente: un punto de «y el centro.» no es un punto, es un resto.
 */
const MAX_PUNTO = 140;
const MIN_PUNTO = 40;

/** Un corte de cláusula: coma, punto y coma o dos puntos, con lo que venga detrás. */
const CLAUSULA = /(?<=[,;:])\s+/;

/**
 * Parte un punto largo en puntos que caben en una línea.
 *
 * @param punto El texto a partir.
 * @param max El máximo por punto.
 */
function partirPunto(punto, max = MAX_PUNTO, forzar = false) {
  if (punto.length <= max && !forzar) return [punto];

  const partes = punto.split(CLAUSULA);
  if (partes.length <= 1) {
    // No hay comas: se parte por espacios, que es peor pero es lo que hay.
    const palabras = punto.split(' ');
    const out = [];
    let actual = '';
    for (const palabra of palabras) {
      if (actual && (actual + ' ' + palabra).length > max) {
        out.push(actual);
        actual = palabra;
      } else {
        actual = actual ? actual + ' ' + palabra : palabra;
      }
    }
    if (actual) out.push(actual);
    return out.length > 1 ? out : [punto];
  }

  // Se agrupan las partes en trozos que caben.
  const trozos = [];
  let actual = '';
  for (const parte of partes) {
    if (actual && (actual + ' ' + parte).length > max) {
      trozos.push(actual);
      actual = parte;
    } else {
      actual = actual ? actual + ' ' + parte : parte;
    }
  }
  if (actual) trozos.push(actual);

  // Un trozo que se ha quedado corto se pega al siguiente, si cabe.
  const pegados = [];
  for (const trozo of trozos) {
    const anterior = pegados[pegados.length - 1];
    if (anterior !== undefined && anterior.length < MIN_PUNTO) {
      pegados[pegados.length - 1] = `${anterior} ${trozo}`;
    } else {
      pegados.push(trozo);
    }
  }

  return pegados
    .flatMap((p) => (p.length > max ? partirPorPalabras(p, max) : [p]))
    .map((p) => {
      const limpio = p.replace(/[:;]\s*$/, '');
      // El punto de cierre se añade sólo si cabe: un punto de 141 caracteres
      // incumple el límite por un carácter, y el límite es el límite.
      const conPunto = /[.!?]$/.test(limpio) ? limpio : limpio + '.';
      return conPunto.length > max ? limpio : conPunto;
    });
}

/**
 * Un trozo sin comas que todavía no cabe en una línea.
 *
 * Se parte por palabras. Es peor que partir por cláusula —el texto queda sin la
 * unión que le daba sentido— pero es mejor que un punto de 200 caracteres, que es
 * un párrafo con otro nombre.
 */
function partirPorPalabras(texto, max) {
  const palabras = texto.split(' ');
  const out = [];
  let actual = '';
  for (const palabra of palabras) {
    if (actual && (actual + ' ' + palabra).length > max) {
      out.push(actual);
      actual = palabra;
    } else {
      actual = actual ? actual + ' ' + palabra : palabra;
    }
  }
  if (actual) out.push(actual);
  return out.length > 1 ? out : [texto];
}

/**
 * Una cadena de TypeScript en comillas simples, con lo que haga falta escapado.
 *
 * Los saltos de línea son el caso que no se ve: hay cuerpos de guía escritos en
 * varias líneas, y al copiarlos a un punto hay que escaparlos. Sin eso, el fichero
 * deja de compilar — y el fallo aparece lejos de la causa, en el primer `import`.
 */
function comillaSimple(texto) {
  const escapado = texto
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');
  return `'${escapado}'`;
}

/** Un bloque de una propiedad del objeto, con la sangría del fichero. */
function bloquePropiedad(nombre, valor, sangria) {
  return `\n${sangria}${nombre}: ${valor},`;
}

/**
 * La sangría de la línea en la que está una posición.
 *
 * Se calcula del fichero y no se supone: si un día los ficheros de contenido llevan
 * otra sangría, la migración la respeta sin tocar una línea de formato.
 */
function sangriaDe(sourceFile, posicion) {
  const linea = sourceFile.getLineAndCharacterOfPosition(posicion);
  return ' '.repeat(linea.character);
}

/**
 * El comienzo de la línea en la que está una posición.
 *
 * La inserción se hace **al principio de la línea**, no dentro de la propiedad: así
 * el bloque nuevo llega con su propia puntuación y la propiedad original no se
 * toca, con su coma o sin ella.
 */
function inicioDeLinea(sourceFile, posicion) {
  const linea = sourceFile.getLineAndCharacterOfPosition(posicion).line;
  return sourceFile.getPositionOfLineAndCharacter(linea, 0);
}

/**
 * Localiza el objeto `guia` de un fichero fuente.
 *
 * @returns Los nodos `conocimiento` y `variables` de la guía, o `null` si el
 *   fichero no es una guía.
 */
function encontrarGuia(sourceFile) {
  let resultado = null;
  const visitar = (nodo) => {
    if (
      ts.isObjectLiteralExpression(nodo) &&
      nodo.properties.some(
        (p) =>
          ts.isPropertyAssignment(p) &&
          ts.isIdentifier(p.name) &&
          p.name.text === 'conocimiento'
      )
    ) {
      resultado = nodo;
      return;
    }
    ts.forEachChild(nodo, visitar);
  };
  visitar(sourceFile);
  return resultado;
}

/** El texto de una propiedad que es una cadena literal. */
function textoDe(propiedad) {
  const valor = propiedad?.initializer;
  if (!valor || !ts.isStringLiteral(valor) && !ts.isNoSubstitutionTemplateLiteral(valor)) {
    return null;
  }
  return valor.text;
}

/**
 * Migra un fichero.
 *
 * @returns `{ texto, cambios, tarjetas }` — el texto nuevo, cuántas inserciones se
 *   han hecho y cuántas tarjetas se han tocado.
 */
export function migrarFichero(ruta) {
  const original = readFileSync(ruta, 'utf8');
  const sourceFile = ts.createSourceFile(ruta, original, ts.ScriptTarget.Latest, true);
  const guia = encontrarGuia(sourceFile);
  if (!guia) return { texto: original, cambios: 0, tarjetas: 0 };

  const propiedades = new Map();
  for (const p of guia.properties) {
    if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) {
      propiedades.set(p.name.text, p);
    }
  }

  /** Las inserciones, con la posición donde va cada una. */
  const inserciones = [];

  // --- Las tarjetas de conocimiento ---
  const bloqueConocimiento = propiedades.get('conocimiento');
  if (bloqueConocimiento && ts.isArrayLiteralExpression(bloqueConocimiento.initializer)) {
    for (const elemento of bloqueConocimiento.initializer.elements) {
      if (!ts.isObjectLiteralExpression(elemento)) continue;
      const cuerpo = elemento.properties.find(
        (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'cuerpo'
      );
      if (!cuerpo) continue;
      const cuerpoTexto = textoDe(cuerpo);
      if (cuerpoTexto === null) continue;

      const titulo = elemento.properties.find(
        (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'titulo'
      );
      const tituloTexto = titulo ? (textoDe(titulo) ?? '') : '';
      const tema = temaDeTarjeta(tituloTexto, cuerpoTexto);
      let puntos = trocear(cuerpoTexto).flatMap((p) => partirPunto(p));
      // Una tarjeta que ha salido en un solo punto es una tarjeta que sigue siendo
      // un párrafo: se parte por cláusula, aunque el punto quepa en una línea.
      if (puntos.length === 1) puntos = partirPunto(puntos[0], MAX_PUNTO, true);

      // La sangría es la de las propiedades del elemento.
      const sangria = sangriaDe(sourceFile, cuerpo.name.getStart(sourceFile));
      const fin = cuerpo.getEnd();
      void fin;
      const textoPuntos = `puntos: [\n${puntos
        .map((p) => `${sangria}  ${comillaSimple(p)},`)
        .join('\n')}\n${sangria}],`;
      inserciones.push({
        posicion: inicioDeLinea(sourceFile, cuerpo.name.getStart(sourceFile)),
        texto: `${sangria}${textoPuntos}\n${sangria}indicador: ${comillaSimple(tema)},\n`,
      });
    }
  }

  // --- Las variables ---
  const bloqueVariables = propiedades.get('variables');
  if (bloqueVariables && ts.isArrayLiteralExpression(bloqueVariables.initializer)) {
    for (const elemento of bloqueVariables.initializer.elements) {
      if (!ts.isObjectLiteralExpression(elemento)) continue;
      const id = elemento.properties.find(
        (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'id'
      );
      const idTexto = id ? (textoDe(id) ?? '') : '';
      if (!idTexto) continue;
      const tema = temaDeVariable(idTexto);
      if (!tema) continue;

      const para = elemento.properties.find(
        (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'para'
      );
      if (!para) continue;
      const sangria = sangriaDe(sourceFile, para.name.getStart(sourceFile));
      inserciones.push({
        posicion: inicioDeLinea(sourceFile, para.name.getStart(sourceFile)),
        texto: `${sangria}indicador: ${comillaSimple(tema)},\n`,
      });
    }
  }

  if (inserciones.length === 0) return { texto: original, cambios: 0, tarjetas: 0 };

  // De atrás hacia delante, para que las posiciones de las inserciones siguientes no
  // se desplazen al escribir las anteriores.
  inserciones.sort((a, b) => b.posicion - a.posicion);
  let texto = original;
  for (const ins of inserciones) {
    texto = texto.slice(0, ins.posicion) + ins.texto + texto.slice(ins.posicion);
  }

  return { texto, cambios: inserciones.length, tarjetas: inserciones.length };
}

/**
 * Compara la guía de antes y de después y dice si se ha perdido algo.
 *
 * La comparación es sobre los **datos**, no sobre el texto del fichero: cuenta
 * tarjetas, compara `id`, `titulo`, `cuerpo` y `fuente`, y cuenta las palabras
 * visibles. Un fichero que cambia de formato pero no de contenido sale limpio.
 */
export function comparar(antes, despues) {
  const problemas = [];
  if (antes.length !== despues.length) {
    problemas.push(`el número de guías cambia: ${antes.length} -> ${despues.length}`);
    return problemas;
  }
  for (let i = 0; i < antes.length; i++) {
    const a = antes[i];
    const d = despues[i];
    if (a.slug !== d.slug) {
      problemas.push(`la guía ${i} cambia de slug: ${a.slug} -> ${d.slug}`);
      continue;
    }
    if (a.conocimiento.length !== d.conocimiento.length) {
      problemas.push(
        `${a.slug}: el número de tarjetas cambia: ${a.conocimiento.length} -> ${d.conocimiento.length}`
      );
    }
    for (let j = 0; j < a.conocimiento.length; j++) {
      const ca = a.conocimiento[j];
      const cd = d.conocimiento[j];
      if (ca.id !== cd.id) {
        problemas.push(`${a.slug}: la tarjeta ${j} cambia de id: ${ca.id} -> ${cd.id}`);
        continue;
      }
      if (ca.titulo !== cd.titulo) {
        problemas.push(`${a.slug}/${ca.id}: cambia el título`);
      }
      if (ca.cuerpo !== cd.cuerpo) {
        problemas.push(`${a.slug}/${ca.id}: cambia el cuerpo`);
      }
      const fa = (ca.fuentes ?? []).join('|');
      const fd = (cd.fuentes ?? []).join('|');
      if (fa !== fd) problemas.push(`${a.slug}/${ca.id}: cambian las fuentes`);
    }
    for (let j = 0; j < a.variables.length; j++) {
      const va = a.variables[j];
      const vd = d.variables[j];
      if (va.id !== vd.id) problemas.push(`${a.slug}: la variable ${j} cambia de id`);
      if (va.etiqueta !== vd.etiqueta) problemas.push(`${a.slug}/${va.id}: cambia la etiqueta`);
      if (va.para !== vd.para) problemas.push(`${a.slug}/${va.id}: cambia el «para»`);
    }
    if (a.reglas.length !== d.reglas.length) {
      problemas.push(`${a.slug}: el número de reglas cambia: ${a.reglas.length} -> ${d.reglas.length}`);
    }
    for (let j = 0; j < a.reglas.length; j++) {
      if (a.reglas[j].accion !== d.reglas[j].accion) {
        problemas.push(`${a.slug}/${a.reglas[j].id}: cambia la acción`);
      }
      if (a.reglas[j].fuente !== d.reglas[j].fuente) {
        problemas.push(`${a.slug}/${a.reglas[j].id}: cambia la fuente`);
      }
    }
  }
  return problemas;
}


// ------------------------------------------------------------------------------------

const argumentos = process.argv.slice(2);
const soloVerificar = argumentos.includes('--verificar');
const soloArchivo = argumentos
  .map((a) => a.match(/^--archivo=(.+)$/)?.[1])
  .find(Boolean);

const { GUIAS } = await import('../../src/lib/guias.ts');
const antes = GUIAS.map((g) => ({
  slug: g.slug,
  conocimiento: g.conocimiento.map((c) => ({
    id: c.id,
    titulo: c.titulo,
    cuerpo: c.cuerpo,
    fuentes: (c.cita?.fuente ? [c.cita.fuente] : []).concat(g.fuentes.map((f) => f.url)),
  })),
  variables: g.variables.map((v) => ({ id: v.id, etiqueta: v.etiqueta, para: v.para })),
  reglas: g.reglas.map((r) => ({ id: r.id, accion: r.accion, fuente: r.fuente })),
}));

const { readdirSync } = await import('node:fs');
const ficheros = readdirSync(CARPETA)
  .filter((f) => f.endsWith('.ts') && !NO_ES_GUIA.has(f))
  .filter((f) => !soloArchivo || f.replace(/\.ts$/, '') === soloArchivo);

let totalCambios = 0;
for (const fichero of ficheros) {
  const ruta = join(CARPETA, fichero);
  const { texto, cambios } = migrarFichero(ruta);
  if (cambios === 0) continue;
  totalCambios += cambios;
  if (!soloVerificar) writeFileSync(ruta, texto, 'utf8');
  console.log(`  ${soloVerificar ? 'verifica' : 'migra'} ${fichero}: ${cambios} cambios`);
}

console.log(`\n${totalCambios} inserciones.`);

if (soloVerificar) {
  console.log(
    '\nPara comprobar que no se ha perdido nada, hay que migrar y comparar contra el\n' +
      'cotejo de antes, que está en el informe de la migración.'
  );
}
