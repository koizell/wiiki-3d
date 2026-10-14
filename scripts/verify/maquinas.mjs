/*
 * Verificación del catálogo de máquinas.
 *
 * Sin navegador: importa el catálogo y la lógica en Node y comprueba lo que una
 * captura no enseña. Cada comprobación se ha visto fallar al menos una vez
 * rompiendo el dato a propósito (ver `npm run verify:maquinas:roto` en el
 * README de desarrollo); si no, no está comprobada.
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
const p1s = maquinaPorSlug('bambu-p1s');
const mars = maquinaPorSlug('elegoo-mars-5-ultra');
const abs = filamentoPorId('abs-gen');
const pla = filamentoPorId('pla-gen');

ok(estadoFilamento(ender, abs).estado === 'limite-boquilla', 'ABS en la Ender 3 V3 SE (260 °C) es límite de boquilla');
ok(estadoFilamento(ke, abs).estado === 'necesita-camara', 'ABS en la Ender 3 V3 KE también necesita cámara (es abierta)');
ok(estadoFilamento(a1, abs).estado === 'necesita-camara', 'ABS en la A1 abierta necesita cámara');
ok(estadoFilamento(p1s, abs).estado === 'ok', 'ABS en la P1S cerrada es viable');
ok(estadoFilamento(mars, pla).estado === 'resina', 'la Mars no evalúa filamento');
ok(estadoFilamento(ender, null).estado === 'ok', 'sin filamento elegido no hay aviso');

// 5 · el rizado y la velocidad salen de la ficha
ok(rizaria(ender, abs) === true, 'ABS en máquina abierta riza');
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

console.log(`\n${fallos === 0 ? 'VERDE' : 'ROJO'}: ${fallos} fallos\n`);
process.exit(fallos === 0 ? 0 : 1);
