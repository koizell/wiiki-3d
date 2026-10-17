/*
 * Verificación del catálogo de máquinas.
 *
 * Sin navegador: importa el catálogo y la lógica en Node y comprueba lo que una
 * captura no enseña.
 *
 * ## Lo que este script comprueba, y lo que no
 *
 * Comprueba el catálogo contra sus propias reglas: que no haya slugs repetidos,
 * que un campo marcado como pendiente no lleve valor, que el cerramiento esté
 * declarado con origen, que la regla no afirme lo que no puede saber, y que las
 * combinaciones de la tabla de abajo den el estado esperado.
 *
 * **No comprueba que las cifras sean verdaderas.** Que la Ender 3 V3 KE tenga
 * 300 °C de boquilla lo decide la fuente de `wiki/cooked/`, no este script: aquí
 * sólo se mira que la ficha y la regla sean coherentes entre sí. Una captura
 * verde significa «no se contradice», no «está verificado».
 *
 * Parte de las comprobaciones se han visto fallar rompiendo el dato a propósito
 * (las de rasgos, los campos pendientes con valor y el cerramiento sin
 * verificar). Otras no: su valor está en que avisan si alguien cambia el dato sin
 * mirar, no en que hayan demostrado servir alguna vez.
 *
 * Uso: npm run verify:maquinas
 */
import { MAQUINAS, FILAMENTOS, maquinaPorSlug, filamentoPorId } from '../../src/content/maquinas/catalogo.ts';
import { estadoFilamento, rizaria, duracionCiclo, avisos } from '../../src/lib/maquinas.ts';

let fallos = 0;
const ok = (cond, mensaje) => {
  if (cond) {
    console.log('  ✓', mensaje);
  } else {
    fallos++;
    console.log('  ✗', mensaje);
  }
};

console.log('\nCatálogo de máquinas\n');

// 1 · unicidad
const slugs = MAQUINAS.map((m) => m.slug);
const ids = FILAMENTOS.map((f) => f.id);
ok(new Set(slugs).size === slugs.length, 'los slug de máquina no se repiten');
ok(new Set(ids).size === ids.length, 'los id de filamento no se repiten');
ok(maquinaPorSlug('no-existe') === null, 'un slug desconocido devuelve null');

// 2 · cada máquina tiene lo que la ficha promete
for (const m of MAQUINAS) {
  ok(typeof m.marca === 'string' && m.marca.length > 0, `${m.slug}: tiene marca`);
  ok(['bed-slinger', 'corexy-cerrada', 'corexy-abierta', 'resina'].includes(m.familia), `${m.slug}: familia válida (${m.familia})`);
  ok(m.vol.every((n) => n > 0), `${m.slug}: volumen positivo`);
  ok(m.fuentes.length > 0, `${m.slug}: tiene al menos una fuente`);
  if (m.velMax !== null) ok(m.velMax > 0, `${m.slug}: velocidad positiva`);
  if (m.tNozMax !== null) ok(m.tNozMax > 100, `${m.slug}: boquilla máxima sensata`);
  if (m.familia === 'resina') {
    ok(m.tNozMax === null && m.tCamaMax === null, `${m.slug}: la resina no declara temperaturas de filamento`);
  } else if (m.origen.tNozMax === 'P') {
    // Pendiente a propósito: la cifra que había salía de un firmware modificado.
    ok(m.tNozMax === null && m.tCamaMax === null, `${m.slug}: temperaturas pendientes, sin valor inventado`);
  } else {
    ok(m.tNozMax !== null && m.tCamaMax !== null, `${m.slug}: la FDM declara temperaturas`);
  }
}

// 3 · la regla del origen: un dato verificado necesita fuente de ese origen
for (const m of MAQUINAS) {
  for (const [campo, origen] of Object.entries(m.origen)) {
    if (!origen || origen === 'P') continue;
    const conFuente = m.fuentes.some((f) => f.origen === origen);
    ok(conFuente, `${m.slug}: ${campo} marcado ${origen} tiene fuente de ese origen`);
  }
}

// 4 · las dos reglas de física
const ender = maquinaPorSlug('ender-3-v3-se');
const ke = maquinaPorSlug('ender-3-v3-ke');
const a1 = maquinaPorSlug('bambu-a1');
const mk4s = maquinaPorSlug('prusa-mk4s');
const p1s = maquinaPorSlug('bambu-p1s');
const mars = maquinaPorSlug('elegoo-mars-5-ultra');
const abs = filamentoPorId('abs-gen');
const pla = filamentoPorId('pla-gen');

ok(estadoFilamento(ender, abs).estado === 'limite-boquilla', 'ABS en la Ender 3 V3 SE (260 °C) es límite de boquilla');
// Las dos tienen el cerramiento sin verificar: la regla no puede afirmar que
// haga falta cámara, y antes lo hacía porque `!cerrada` treataba el hueco como
// «abierta».
ok(estadoFilamento(ke, abs).estado === 'camara-desconocida', 'ABS en la KE: cerramiento sin verificar, no afirma cámara');
ok(estadoFilamento(a1, abs).estado === 'camara-desconocida', 'ABS en la A1: cerramiento sin verificado, no afirma cámara');
ok(estadoFilamento(p1s, abs).estado === 'ok', 'ABS en la P1S cerrada es viable');
ok(estadoFilamento(mk4s, abs).estado === 'necesita-camara', 'ABS en la MK4S abierta sí necesita cámara (está verificado)');
ok(estadoFilamento(p1s, abs).estado === 'ok', 'ABS en la P1S cerrada es viable');
ok(estadoFilamento(mars, pla).estado === 'resina', 'la Mars no evalúa filamento');
ok(estadoFilamento(ender, null).estado === 'ok', 'sin filamento elegido no hay aviso');
for (const filamento of FILAMENTOS.filter(f => f.abierta && f.noz[1] <= ke.tNozMax)) {
  for (const cerrada of [null, false, true]) {
    ok(estadoFilamento({ ...ke, cerrada }, filamento).estado === 'ok',
      `${filamento.nombre}: no exige cámara con cerramiento ${cerrada}`);
  }
}

// 5 · el rizado y la velocidad salen de la ficha
ok(rizaria(ender, abs) === false, 'ABS en la Ender (cerramiento sin verificar) no dibuja el rizado');
ok(rizaria(mk4s, abs) === true, 'ABS en la MK4S, abierta y verificada, sí riza');
ok(rizaria(p1s, abs) === false, 'ABS en máquina cerrada no riza');
ok(rizaria(ender, pla) === false, 'PLA no riza');
ok(duracionCiclo(ke) === 24, '500 mm/s → ciclo de 24 s');
ok(duracionCiclo(ender) === 48, '250 mm/s → ciclo del doble (48 s)');
ok(duracionCiclo(mars) === 26, 'la resina tiene su propio ciclo');

// 6 · los avisos se emiten cuando toca y se callan cuando no
ok(avisos(ender, abs).length === 2, 'ABS en la Ender abierta avisa de boquilla y de cámara');
ok(avisos(p1s, abs).length === 0, 'ABS en la P1S no avisa de nada');
ok(avisos(mars, pla).length === 1 && avisos(mars, pla)[0].includes('resina'), 'la Mars explica que no lleva filamento');

/*
 * 7 · Los rasgos que la ilustración dibuja
 *
 * El catálogo existe para contar que dos máquinas de la misma marca no son la
 * misma máquina. Mientras el SVG sólo miraba la familia, la Ender 3 V3 SE y la KE
 * se dibujaban iguales: la ficha las separaba y el dibujo no.
 *
 * La comprobación es de datos, y a propósito. Contar píxeles o nodos del SVG
 * diría que dos dibujos son distintos sin decir por qué ni si la diferencia es
 * verdad. Lo que se mide es la firma de rasgos declarados, que sale de
 * `wiki/cooked/rasgos-visuales-*.md`; si un rasgo no está en el material cocinado,
 * no se declara, y dos máquinas sin rasgos propios compartirán silueta —que es
 * lo honesto.
 */
const firma = (m) =>
  Object.entries(m.rasgos)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}${typeof v === 'number' ? `:${v}` : ''}`)
    .sort()
    .join(',') || '(familia)';

const porSlug = (s) => MAQUINAS.find((m) => m.slug === s);

for (const [a, b, motivo] of [
  ['ender-3-v3-se', 'ender-3-v3-ke', 'la KE lleva dos ventiladores y carril lineal en X'],
  ['bambu-p1s', 'prusa-core-one', 'la P1S lleva filtro de carbono; la CORE One aloja la bobina en un lateral'],
]) {
  const fa = firma(porSlug(a));
  const fb = firma(porSlug(b));
  ok(fa !== fb, `${a} y ${b} no comparten firma de rasgos (${motivo})`);
  console.log(`        ${a}: ${fa}`);
  console.log(`        ${b}: ${fb}`);
}

// Los rasgos declarados tienen que ser rasgos que la ilustración sabe dibujar:
// una clave inventada sería un rasgo que no se pinta y que la ficha promete.
const RASGOS_DIBUJABLES = ['ventiladoresDobles', 'carrilLinealX', 'bobinaLateral', 'filtroCarbon', 'ifsBobinas', 'zTriple', 'pantallaTactil'];
for (const m of MAQUINAS) {
  for (const clave of Object.keys(m.rasgos)) {
    ok(RASGOS_DIBUJABLES.includes(clave), `${m.slug}: el rasgo «${clave}» es dibujable`);
  }
}

/*
 * 6b · Un campo con origen P no puede llevar valor
 *
 * La ficha tenía dos campos que se contradecían a sí mismos: la AD5X mostraba
 * «120 °C · PENDIENTE DE FICHAR» y «Auto · PENDIENTE DE FICHAR». Un campo
 * pendiente que además tiene cifra es una cifra que nadie ha verificado
 * disfrazada de dato.
 *
 * El Hansa caso peor era el techo de boquilla de la AD5X: 350 °C sacados de zmod,
 * que es un firmware MODIFICADO. Es lo que permite el mod, no la especificación de
 * fábrica, y con esa cifra el ABS parecía viable en una máquina sin verificar.
 */
const CAMPOS_CON_VALOR = ['dims', 'vol', 'velMax', 'tNozMax', 'tCamaMax', 'extrusor', 'nivelacion'];
for (const m of MAQUINAS) {
  for (const campo of CAMPOS_CON_VALOR) {
    const org = m.origen[campo];
    const valor = m[campo];
    if (org === 'P') {
      ok(
        valor === null || valor === undefined,
        `${m.slug}.${campo}: origen pendiente sin valor (ahora: ${JSON.stringify(valor)})`
      );
    }
  }
}

/*
 * 6c · El cerramiento: o está verificado con origen, o es null.
 *
 * `cerrada` es el campo que decide el warping, y era un booleano sin origen.
 * `!maquina.cerrada` convertía cualquier máquina sin dato en «abierta», así que la
 * regla afirmaba warping sobre máquinas cuyo cerramiento nadie había comprobado.
 * Ahora null significa «no verificado» y la interfaz lo dice.
 */
for (const m of MAQUINAS) {
  const org = m.origen.cerrada;
  if (m.familia === 'resina') {
    ok(org === null || org === undefined, `${m.slug}: la resina no declara cerramiento`);
    continue;
  }
  if (m.cerrada === null) {
    ok(org === 'P', `${m.slug}: cerramiento sin verificar marcado como pendiente`);
  } else {
    ok(org === 'F' || org === 'T', `${m.slug}: cerramiento ${m.cerrada} declarado con origen (${org})`);
  }
}

/*
 * 6d · La regla no afirma lo que no puede saber.
 *
 * Un material que necesita cámara en una máquina cuyo cerramiento no está
 * verificado no puede dar «necesita cámara»: no se sabe. Y tampoco se dibuja el
 * rizado, que sería anunciar un fallo no comprobado.
 */
for (const m of MAQUINAS) {
  if (m.familia === 'resina') continue;
  const estado = estadoFilamento(m, abs);
  if (m.cerrada === null) {
    ok(estado.estado !== 'necesita-camara', `${m.slug}: sin cerramiento verificado no afirma que haga falta cámara`);
    ok(estado.estado === 'ok' || estado.estado === 'camara-desconocida' || estado.estado === 'limite-boquilla',
       `${m.slug}: ABS da «${estado.estado}», no una afirmación sobre la cámara`);
    ok(rizaria(m, abs) === false, `${m.slug}: sin cerramiento verificado no dibuja el rizado`);
  }
}

console.log(`\n${fallos === 0 ? 'VERDE' : 'ROJO'}: ${fallos} fallos\n`);
process.exit(fallos === 0 ? 0 : 1);
