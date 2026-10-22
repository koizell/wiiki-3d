/**
 * El recorte: qué se ha cambiado de verdad en las guías.
 *
 * ## Por qué hace falta
 *
 * Porque la vuelta de acortar los `porque` se hizo con agentes que han escrito
 * veinte y cuatro ficheros, y la palabra de un agente no es una comprobación.
 *
 * Este script compara **cada** guía con la que hay en `HEAD` y comprueba que lo
 * único que ha cambiado es el texto de `reglas[].porque`. Todo lo demás —las
 * `accion`, los `valor`, los `alcance`, las `fuente`, las `cuando`, las
 * variables, las tarjetas, el diferencial, las fuentes y el texto de la guía—
 * tiene que ser **idéntico**, campo por campo.
 *
 * Es la contraparte mecánica de la revisión editorial: el revisor lee si el
 * matiz se ha perdido, y este script comprueba que **no se ha perdido nada más**.
 *
 * ## Cómo se compara
 *
 * Con el AST de TypeScript, no con el texto del fichero: el texto cambia al
 * reescribir una cadena, y lo que importa es si el **dato** ha cambiado.
 *
 * ## Uso
 *
 *   node scripts/verify/recorte.mjs
 *
 * Sale con código 1 si algo se ha tocado de más. Si no hay ninguna guía
 * modificada, avisa y sale con código 0: es el estado normal de una vuelta
 * terminada.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CARPETA = join(RAIZ, 'src', 'content', 'guias');

const checks = [];
const fallos = [];

function comprobar(ok, mensaje) {
  if (ok) checks.push(`  ok    ${mensaje}`);
  else fallos.push(mensaje);
}

/** Los datos de una guía, leídos del AST. */
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

  const valorDe = (obj, nombre) => {
    const p = obj.properties.find(
      (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === nombre
    );
    if (!p) return null;
    return textoDe(p.initializer);
  };

  const textoDe = (v) => {
    if (v === undefined || v === null) return null;
    if (ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) return v.text;
    if (ts.isNumericLiteral(v)) return v.text;
    if (ts.isArrayLiteralExpression(v)) {
      return v.elements.map((e) => (ts.isStringLiteral(e) ? e.text : textoDe(e))).join('|');
    }
    if (ts.isObjectLiteralExpression(v)) {
      return v.properties
        .map((x) =>
          ts.isPropertyAssignment(x) && ts.isIdentifier(x.name)
            ? `${x.name.text}=${textoDe(x.initializer)}`
            : ''
        )
        .join(',');
    }
    if (v.kind === ts.SyntaxKind.TrueKeyword) return 'true';
    if (v.kind === ts.SyntaxKind.FalseKeyword) return 'false';
    return null;
  };

  const bloque = (nombre) => {
    const p = guia.properties.find(
      (x) => ts.isPropertyAssignment(x) && ts.isIdentifier(x.name) && x.name.text === nombre
    );
    if (!p || !ts.isArrayLiteralExpression(p.initializer)) return [];
    return p.initializer.elements.filter(ts.isObjectLiteralExpression);
  };

  const reglas = bloque('reglas').map((r) => ({
    id: valorDe(r, 'id'),
    accion: valorDe(r, 'accion'),
    valor: valorDe(r, 'valor'),
    alcance: valorDe(r, 'alcance'),
    fuente: valorDe(r, 'fuente'),
    cuando: valorDe(r, 'cuando'),
    rango: valorDe(r, 'rango'),
    indicador: valorDe(r, 'indicador'),
    porque: valorDe(r, 'porque'),
  }));

  return {
    slug: valorDe(guia, 'slug'),
    titulo: valorDe(guia, 'titulo'),
    resumen: valorDe(guia, 'resumen'),
    resumenExtra: valorDe(guia, 'resumenExtra'),
    entrada: valorDe(guia, 'entrada'),
    sintoma: valorDe(guia, 'sintoma'),
    minutos: valorDe(guia, 'minutos'),
    autor: valorDe(guia, 'autor'),
    actualizado: valorDe(guia, 'actualizado'),
    dibujo: valorDe(guia, 'dibujo'),
    diferencial: valorDe(guia, 'diferencial'),
    variables: bloque('variables').map((v) => ({
      id: valorDe(v, 'id'),
      etiqueta: valorDe(v, 'etiqueta'),
      para: valorDe(v, 'para'),
      indicador: valorDe(v, 'indicador'),
      opciones: valorDe(v, 'opciones'),
    })),
    conocimiento: bloque('conocimiento').map((c) => ({
      id: valorDe(c, 'id'),
      titulo: valorDe(c, 'titulo'),
      cuerpo: valorDe(c, 'cuerpo'),
      puntos: valorDe(c, 'puntos'),
      indicador: valorDe(c, 'indicador'),
      cifra: valorDe(c, 'cifra'),
      cita: valorDe(c, 'cita'),
      cuando: valorDe(c, 'cuando'),
    })),
    reglas,
    fueraDeAlcance: bloque('fueraDeAlcance').map((f) => ({
      sintoma: valorDe(f, 'sintoma'),
      porQue: valorDe(f, 'porQue'),
      guia: valorDe(f, 'guia'),
    })),
    fuentes: bloque('fuentes').map((f) => ({
      url: valorDe(f, 'url'),
      quien: valorDe(f, 'quien'),
      que: valorDe(f, 'que'),
    })),
  };
}

/**
 * Los cambios **fuera del `porque`** que están declarados.
 *
 * La vuelta de acortamiento no toca nada más, y esa es la regla. Pero hubo **un**
 * arreglo que sí tenía que tocar algo más: la condición de una regla que no se
 * disparaba donde debía, y que la revisión de la vuelta encontró. Ese cambio va
 * declarado aquí, con su motivo, y la comprobación lo acepta **sólo** si coincide
 * exactamente con lo declarado.
 *
 * Lo demás sigue fallando: un cambio no declarado fuera del `porque` es un fallo.
 */
const EXCEPCIONES = {
  'esquinas-petg.ts': {
    'recinto-abrir': {
      campo: 'cuando',
      motivo:
        'La regla tomaba la fila ① de la fuente de Bambu —PLA/PVA/TPU, cama por encima ' +
        'de 45 °C— en una guía sobre PETG, cuya fila ② dice cama por encima de 60 °C. ' +
        'Con la condición anterior (cama alta, que aquí es «por encima de 80 °C») la ' +
        'regla no se disparaba nunca en el rango recomendado del PETG. Lo encontró la ' +
        'revisión de la vuelta de acortamiento.',
    },
  },
};

/** El diff de una guía, sin el `porque` de las reglas. */
function sinPorque(guia) {
  return {
    ...guia,
    reglas: guia.reglas.map(({ porque, ...resto }) => resto),
  };
}

/** Los campos de una regla que han cambiado, sin contar el `porque`. */
function camposDistintos(antes, despues) {
  const campos = ['id', 'accion', 'valor', 'alcance', 'fuente', 'cuando', 'rango', 'indicador'];
  return campos.filter((campo) => antes[campo] !== despues[campo]);
}

const ficheros = readdirSync(CARPETA).filter((f) => f.endsWith('.ts'));
let modificadas = 0;
let porqueCambiados = 0;

for (const fichero of ficheros) {
  const ruta = `src/content/guias/${fichero}`;
  let antes;
  try {
    antes = execFileSync('git', ['show', `HEAD:${ruta}`], { cwd: RAIZ, encoding: 'utf8' });
  } catch {
    // Fichero nuevo: no hay con qué compararlo.
    continue;
  }
  const despues = readFileSync(join(CARPETA, fichero), 'utf8');
  if (antes === despues) continue;

  modificadas += 1;
  const a = datosDe(ts.createSourceFile(ruta, antes, ts.ScriptTarget.Latest, true));
  const d = datosDe(ts.createSourceFile(ruta, despues, ts.ScriptTarget.Latest, true));
  if (!a || !d) {
    fallos.push(`${fichero}: no se ha podido leer`);
    continue;
  }

  // Fuera de las reglas, nada puede cambiar.
  const antesSinReglas = JSON.stringify({ ...sinPorque(a), reglas: [] });
  const despuesSinReglas = JSON.stringify({ ...sinPorque(d), reglas: [] });
  comprobar(
    antesSinReglas === despuesSinReglas,
    `${fichero}: fuera de las reglas, nada ha cambiado`
  );

  if (a.reglas.length !== d.reglas.length) {
    fallos.push(`${fichero}: el número de reglas cambia`);
    continue;
  }

  // Y dentro de las reglas, sólo el `porque`, salvo lo declarado.
  const excepciones = EXCEPCIONES[fichero] ?? {};
  const fueraDelPorque = [];
  for (let i = 0; i < a.reglas.length; i++) {
    const campos = camposDistintos(a.reglas[i], d.reglas[i]);
    const declarados = campos.filter((campo) => campo !== 'porque');
    if (declarados.length === 0) continue;
    const excepcion = excepciones[a.reglas[i].id];
    const permitida =
      excepcion && declarados.length === 1 && declarados[0] === excepcion.campo;
    if (!permitida) {
      fueraDelPorque.push(
        `la regla «${a.reglas[i].id}» cambia ${declarados.join(', ')} sin que esté declarado`
      );
    }
  }
  comprobar(
    fueraDelPorque.length === 0,
    `${fichero}: sólo cambia el \`porque\`, salvo lo declarado${fueraDelPorque.length ? ': ' + fueraDelPorque.join('; ') : ''}`
  );
  const cambios = a.reglas.filter((r, i) => r.porque !== d.reglas[i].porque).length;
  porqueCambiados += cambios;
  comprobar(
    cambios > 0,
    `${fichero}: ha cambiado algún \`porque\` (${cambios})`
  );
}

console.log(`\nGuías modificadas: ${modificadas}`);
console.log(`Reglas con el \`porque\` cambiado: ${porqueCambiados}\n`);

if (modificadas === 0) {
  console.log('No hay ninguna guía modificada: nada que comprobar.');
  console.log('(Es el estado normal de una vuelta terminada.)');
  process.exit(0);
}

for (const c of checks) console.log(c);

console.log();
if (fallos.length > 0) {
  console.log(`${fallos.length} COMPROBACIONES FALLAN:`);
  for (const f of fallos) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`TODAS LAS COMPROBACIONES PASAN (${checks.length})`);
