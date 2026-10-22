/*
 * El cotejo de la migración: ¿se ha perdido algo?
 *
 * Compara cada fichero de guía **de la working tree** con el que hay en `HEAD`, y
 * dice si lo único que ha cambiado son las propiedades nuevas.
 *
 * No compara el texto del fichero, que cambia de forma por.insertar líneas; compara
 * los **datos**: el número de tarjetas, sus `id`, `titulo`, `cuerpo` y `cita`, las
 * variables, las reglas con su `accion` y su `fuente`, y las fuentes de la guía.
 *
 * Es la comprobación que convierte «el script no ha tocado el contenido» de una
 * intención en un hecho medido.
 *
 *   node scripts/wiki/cotejo-migracion.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CARPETA = join(RAIZ, 'src', 'content', 'guias');
const NO_ES_GUIA = new Set(['tipos.ts', 'autor.ts']);

/** Las propiedades que la migración añade y que no se comparan. */
const NUEVAS = new Set(['puntos', 'indicador']);

/**
 * Los datos de una guía, leídos del AST.
 *
 * Se leen del árbol sintáctico y no del fichero importado, porque así el cotejo
 * funciona con las dos versiones a la vez sin cargar módulos de dos maneras.
 */
function datosDe(sourceFile) {
  let guia = null;
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
      guia = nodo;
      return;
    }
    ts.forEachChild(nodo, visitar);
  };
  visitar(sourceFile);

  if (!guia) return null;

  /** El texto de un valor, sea del tipo que sea. */
  const textoDeValor = (v) => {
    if (v === undefined || v === null) return null;
    if (ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) return v.text;
    if (ts.isNumericLiteral(v)) return v.text;
    if (ts.isArrayLiteralExpression(v)) {
      return v.elements
        .map((e) =>
          ts.isStringLiteral(e) ? e.text : ts.isObjectLiteralExpression(e) ? textoDeObjeto(e) : ''
        )
        .join('|');
    }
    if (ts.isObjectLiteralExpression(v)) return textoDeObjeto(v);
    return null;
  };

  /** Un objeto literal, como una cadena de `clave=valor`. */
  const textoDeObjeto = (obj) =>
    obj.properties
      .map((x) =>
        ts.isPropertyAssignment(x) && ts.isIdentifier(x.name)
          ? `${x.name.text}=${textoDeValor(x.initializer)}`
          : ''
      )
      .join(',');

  /** El valor de una propiedad por su nombre. */
  const valorDe = (obj, nombre) => {
    const p = obj.properties.find(
      (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === nombre
    );
    if (!p) return null;
    return textoDeValor(p.initializer);
  };

  const bloque = (nombre) => {
    const p = guia.properties.find(
      (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === nombre
    );
    if (!p || !ts.isArrayLiteralExpression(p.initializer)) return [];
    return p.initializer.elements.filter(ts.isObjectLiteralExpression);
  };

  return {
    slug: valorDe(guia, 'slug'),
    titulo: valorDe(guia, 'titulo'),
    resumen: valorDe(guia, 'resumen'),
    entrada: valorDe(guia, 'entrada'),
    fuentes: bloque('fuentes').map((f) => `${valorDe(f, 'quien')}|${valorDe(f, 'que')}|${valorDe(f, 'url')}`),
    fueraDeAlcance: bloque('fueraDeAlcance').map((f) => `${valorDe(f, 'sintoma')}|${valorDe(f, 'porQue')}`),
    conocimiento: bloque('conocimiento').map((c) => {
      const datos = { id: valorDe(c, 'id'), titulo: valorDe(c, 'titulo'), cuerpo: valorDe(c, 'cuerpo') };
      const cita = c.properties.find(
        (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === 'cita'
      );
      datos.cita = cita && ts.isObjectLiteralExpression(cita.initializer)
        ? `${valorDe(cita.initializer, 'texto')}|${valorDe(cita.initializer, 'fuente')}`
        : null;
      const cifra = c.properties.find(
        (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === 'cifra'
      );
      datos.cifra = cifra && ts.isObjectLiteralExpression(cifra.initializer)
        ? `${valorDe(cifra.initializer, 'valor')}|${valorDe(cifra.initializer, 'nota')}`
        : null;
      const cuando = c.properties.find(
        (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === 'cuando'
      );
      datos.cuando = cuando ? valorDe(c, 'cuando') : null;
      return datos;
    }),
    variables: bloque('variables').map((v) => ({
      id: valorDe(v, 'id'),
      etiqueta: valorDe(v, 'etiqueta'),
      para: valorDe(v, 'para'),
      opciones: valorDe(v, 'opciones'),
    })),
    reglas: bloque('reglas').map((r) => ({
      id: valorDe(r, 'id'),
      accion: valorDe(r, 'accion'),
      valor: valorDe(r, 'valor'),
      porque: valorDe(r, 'porque'),
      fuente: valorDe(r, 'fuente'),
      cuando: valorDe(r, 'cuando'),
    })),
  };
}

/**
 * Los cambios de texto **previstos**.
 *
 * La migración no puede tocar ni una palabra, pero la revisión de las acciones sí
 * puede: siete acciones no eran acciones —empezaban por «En Prusa, la superficie
 * recomendada es…» o por «Lo que ves es…»— y se reescribieron en imperativo **sin
 * cambiar la afirmación, el valor, el porqué ni la fuente**.
 *
 * Cada una está aquí con su texto antes y su texto después, para que el cotejo siga
 * valiendo: si alguien cambia una de estas frases otra vez, o cambia cualquier otra,
 * el cotejo lo dice.
 */
const PREVISTOS = new Map([
  [
    'agujeros-ovalados.ts/tornillo-m6-ajuste',
    [
      'Recuerda que un tornillo M6 real mide ~5,9 mm',
      'Mide el tornillo M6 real: unos 5,9 mm',
    ],
  ],
  [
    'capas-desplazadas.ts/hold-z',
    [
      'En motores Z dedicados inactivos, hold_current puede aplicarse calibrando driver_TPOWERDOWN e IHOLDDELAY',
      'Aplica hold_current en motores Z dedicados inactivos, calibrando driver_TPOWERDOWN e IHOLDDELAY',
    ],
  ],
  [
    'capas-desplazadas.ts/accel-a-cero',
    [
      'Si la aceleración normal de printing es 0 en OrcaSlicer, el control de aceleración lo decide el firmware',
      'Confirma que la aceleración la decide el firmware si la de OrcaSlicer está a 0',
    ],
  ],
  [
    'elephant-foot.ts/a1-textured',
    ['Ajuste fino Bambu A1 (placa texturizada)', 'Ajusta el offset fino en la Bambu A1 con placa texturizada'],
  ],
  [
    'elephant-foot.ts/a1-lisa',
    [
      'Ajuste fino Bambu A1 (placa no texturizada)',
      'Ajusta el offset fino en la Bambu A1 con placa no texturizada',
    ],
  ],
  [
    'flow-rate.ts/klipper-volver-default',
    [
      'Si no mejora hasta 1,000, vuelve al valor por defecto sin PA',
      'Vuelve al valor por defecto sin PA si no mejora hasta 1.000',
    ],
  ],
  [
    'tpu-flexible.ts/prusa-placa',
    [
      'En Prusa, la superficie recomendada es PA Nylon o Satin',
      'Elige PA Nylon o Satin como superficie en Prusa',
    ],
  ],
  [
    'z-seam.ts/random-ya-activo',
    [
      'Lo que ves es el modo Random funcionando, no un fallo',
      'Comprueba que el modo Random está funcionando antes de tocar nada',
    ],
  ],
]);

const ficheros = readdirSync(CARPETA).filter(
  (f) => f.endsWith('.ts') && !NO_ES_GUIA.has(f)
);

const problemas = [];
let tarjetas = 0;
let palabrasAntes = 0;
let palabrasDespues = 0;
let previstos = 0;

for (const fichero of ficheros) {
  const ruta = join('src/content/guias', fichero);
  const antes = execFileSync('git', ['show', `HEAD:${ruta}`], { cwd: RAIZ, encoding: 'utf8' });
  const despues = readFileSync(join(CARPETA, fichero), 'utf8');

  const a = datosDe(ts.createSourceFile(ruta, antes, ts.ScriptTarget.Latest, true));
  const d = datosDe(ts.createSourceFile(ruta, despues, ts.ScriptTarget.Latest, true));
  if (!a || !d) {
    problemas.push(`${fichero}: no se ha podido leer`);
    continue;
  }

  for (const campo of ['slug', 'titulo', 'resumen', 'entrada']) {
    if (a[campo] !== d[campo]) problemas.push(`${fichero}: cambia «${campo}»`);
  }
  if (a.fuentes.join('|') !== d.fuentes.join('|')) problemas.push(`${fichero}: cambian las fuentes`);
  if (a.fueraDeAlcance.join('|') !== d.fueraDeAlcance.join('|')) {
    problemas.push(`${fichero}: cambia «lo que no resuelve»`);
  }
  if (a.conocimiento.length !== d.conocimiento.length) {
    problemas.push(`${fichero}: el número de tarjetas cambia`);
  }
  for (let i = 0; i < a.conocimiento.length; i++) {
    const ca = a.conocimiento[i];
    const cd = d.conocimiento[i];
    for (const campo of ['id', 'titulo', 'cuerpo', 'cita', 'cifra', 'cuando']) {
      if (ca[campo] !== cd[campo]) {
        problemas.push(`${fichero}/${ca.id}: cambia «${campo}»`);
      }
    }
    palabrasAntes += (ca.cuerpo ?? '').split(/\s+/).length;
    palabrasDespues += (cd.cuerpo ?? '').split(/\s+/).length;
    tarjetas++;
  }
  if (a.variables.length !== d.variables.length) {
    problemas.push(`${fichero}: el número de variables cambia`);
  }
  for (let i = 0; i < a.variables.length; i++) {
    for (const campo of ['id', 'etiqueta', 'para', 'opciones']) {
      if (a.variables[i][campo] !== d.variables[i][campo]) {
        problemas.push(`${fichero}/${a.variables[i].id}: cambia «${campo}» de la variable`);
      }
    }
  }
  if (a.reglas.length !== d.reglas.length) {
    problemas.push(`${fichero}: el número de reglas cambia`);
  }
  for (let i = 0; i < a.reglas.length; i++) {
    for (const campo of ['id', 'accion', 'valor', 'porque', 'fuente', 'cuando']) {
      if (a.reglas[i][campo] !== d.reglas[i][campo]) {
        const clave = `${fichero}/${a.reglas[i].id}`;
        const previsto = PREVISTOS.get(clave);
        if (campo === 'accion' && previsto && previsto[0] === a.reglas[i][campo] && previsto[1] === d.reglas[i][campo]) {
          previstos++;
          continue;
        }
        problemas.push(`${clave}: cambia «${campo}» de la regla`);
      }
    }
  }
}

console.log(`Guías cotejadas: ${ficheros.length}`);
console.log(`Tarjetas de conocimiento: ${tarjetas}`);
console.log(`Palabras de cuerpo antes: ${palabrasAntes}`);
console.log(`Palabras de cuerpo después: ${palabrasDespues}`);
console.log(`Acciones reescritas en imperativo (previstas): ${previstos}`);

if (problemas.length > 0) {
  console.log(`\n${problemas.length} DIFERENCIAS:\n`);
  for (const p of problemas.slice(0, 60)) console.log(`  ✗ ${p}`);
  if (problemas.length > 60) console.log(`  … y ${problemas.length - 60} más`);
  process.exit(1);
}

console.log('\nLa migración no ha cambiado ni un dato del contenido.');
