import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GUIAS, guiaPorSlug, compararValor, conocimientoVisible, reglasQueSalen, seCumple, variablesEnOrden, precontestar } from '../../src/lib/guias.ts';
import { AUTOR } from '../../src/content/guias/autor.ts';
import {
  anclasDeCampos,
  camposDeLaGuia,
  enlazados,
  idConocimiento,
  idVariable,
  leerTuArchivo,
} from '../../src/lib/tu-archivo.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/*
 * El módulo de indicadores se carga aparte y a propósito falla suave.
 *
 * `src/lib/indicadores.ts` es la tabla que decide qué indicador lleva cada acción y
 * cada tarjeta. Si no existe, o si le falta un verbo, **esta** comprobación tiene que
 * fallar — y sólo ella: el resto del motor de guías sigue teniendo que correr, porque
 * un fallo aquí no significa que el contenido esté mal, sino que falta la tabla.
 */
let indicadores = null;
try {
  indicadores = await import('../../src/lib/indicadores.ts');
} catch {
  indicadores = null;
}

/**
 * La deuda de texto largo, medida y con freno.
 *
 * El «porqué» de una acción debería caber en una línea y el cuerpo de una tarjeta
 * debería ser una lista de puntos. Hoy no es así, y no se va a arreglar reescribiendo
 * 583 reglas a mano: se arregla en el ciclo del redactor, una vuelta cada vez.
 *
 * El número de aquí es el de **hoy**, y funciona como un freno: sólo puede bajar. Si
 * somebody escribe una regla más larga, la comprobación falla; si alguien acorta, el
 * número baja y hay que actualizar el de arriba. Es la forma de que una deuda que se
 * ve no se vuelva a crecer en silencio.
 */
const MAX_PORQUE = 200;
const DEUDA_PORQUE = 213;
const MAX_CUERPO = 1021;

/**
 * El motor de las guías, sin navegador.
 *
 * Sustituye a la prueba del renderizador de Markdown, que ya no existe, y no es un
 * reemplazo del mismo tipo: lo que se comprobaba era que un texto de un fichero no
 * pudiera inyectar etiquetas. Ese riesgo desapareció con el formato, porque el
 * contenido de una guía es un módulo de TypeScript y React lo pinta como nodos de
 * texto — no hay `innerHTML` en ninguna parte de la wiki.
 *
 * Lo que se comprueba ahora es lo que **no** puede ver el ojo: que una condición no
 * se dispare con una variable sin contestar, que ninguna regla apunte a una variable
 * que no existe, que cada acción traiga su fuente, y que ningún enlace interno
 * apunte a una guía inexistente. Es la clase de fallo que hace que una guía dé un
 * consejo que no corresponde, y es invisible en una captura.
 */

let pruebas = 0;
const fallos = [];

/**
 * Una comprobación, y todas las que quedan.
 *
 * Antes, un fallo abortaba el script entero en la primera comprobación. Con una
 * migración de 520 tarjetas de contenido eso significaba un fallo por vuelta y
 * 520 vueltas, así que el script **acumula** y sale con código 1 al final, como
 * hacen `verify:ui` y `verify:wiki`. El recuento de la última línea sigue siendo
 * el de comprobaciones aprobadas, que es lo que el tablero cita.
 */
function comprobar(nombre, fn) {
  try {
    fn();
    pruebas++;
    console.log(`  OK    ${nombre}`);
  } catch (error) {
    fallos.push({ nombre, mensaje: error?.message ?? String(error) });
    console.log(`  FALLA ${nombre}`);
  }
}

console.log('\n=== El registro ===\n');

comprobar('hay guías escritas', () => assert.ok(GUIAS.length >= 2, `${GUIAS.length}`));

comprobar('ningún slug repetido', () => {
  const vistos = new Set();
  for (const g of GUIAS) {
    assert.ok(!vistos.has(g.slug), `slug repetido: ${g.slug}`);
    vistos.add(g.slug);
  }
});

comprobar('guiaPorSlug devuelve la guía y null en lo que no existe', () => {
  assert.equal(guiaPorSlug(GUIAS[0].slug)?.slug, GUIAS[0].slug);
  assert.equal(guiaPorSlug('no-existe'), null);
  assert.equal(guiaPorSlug(undefined), null);
});

console.log('\n=== Las condiciones ===\n');

comprobar('una condición vacía se cumple siempre', () => assert.equal(seCumple({}, {}), true));

comprobar('una variable sin contestar NO cumple', () => {
  assert.equal(seCumple({ material: 'pla' }, {}), false);
});

comprobar('coincide con valor único y con lista', () => {
  assert.equal(seCumple({ material: 'pla' }, { material: 'pla' }), true);
  assert.equal(seCumple({ material: 'pla' }, { material: 'petg' }), false);
  assert.equal(seCumple({ material: ['pla', 'petg'] }, { material: 'petg' }), true);
  assert.equal(seCumple({ material: ['pla', 'petg'] }, { material: 'abs' }), false);
});

comprobar('con dos claves, basta con que una falle para que no cumpla', () => {
  const c = { material: 'pla', chapa: 'cool' };
  assert.equal(seCumple(c, { material: 'pla', chapa: 'cool' }), true);
  assert.equal(seCumple(c, { material: 'pla', chapa: 'textured' }), false);
  assert.equal(seCumple(c, { material: 'pla' }), false, 'chapa sin contestar');
  assert.equal(seCumple(c, { chapa: 'cool' }), false, 'material sin contestar');
});

console.log('\n=== Torre de temperatura: ajustes acotados al material ===\n');

const torre = guiaPorSlug('torre-temperatura');
assert.ok(torre, 'la guía de torre de temperatura está registrada');

for (const material of ['abs', 'petg', 'tpu', 'otro']) {
  comprobar(`torre: ${material} no recibe la refrigeración ni la cama del ejemplo PLA`, () => {
    const respuestas = { material, slicer: 'cura', uso: 'general' };
    const acciones = reglasQueSalen(torre, respuestas);
    const tarjetas = conocimientoVisible(torre, respuestas);
    for (const item of [...acciones, ...tarjetas]) {
      const texto = [item.accion, item.valor, item.porque, item.cuerpo].filter(Boolean).join(' ');
      assert.doesNotMatch(texto, /\b100\s*%|\b60\s*°C/, `${material}: ${item.id} aplica valores de PLA`);
    }
  });

  comprobar(`torre: Cura con ${material} no prescribe la secuencia térmica de PLA`, () => {
    const acciones = reglasQueSalen(torre, { material, slicer: 'cura' });
    for (const regla of acciones) {
      assert.doesNotMatch(
        `${regla.accion} ${regla.valor ?? ''}`,
        /215\s*°C|210\s*°C|205\s*°C/,
        `${material}: ${regla.id} prescribe temperaturas del ejemplo PLA`
      );
    }
  });
}

comprobar('torre: PLA conserva su ejemplo de refrigeración, sin extenderlo a otros materiales', () => {
  const acciones = reglasQueSalen(torre, { material: 'pla', slicer: 'cura' });
  assert.ok(acciones.some((r) => /100\s*%/.test(`${r.accion} ${r.valor ?? ''}`)));
});

console.log('\n=== Coherencia de cada guía ===\n');

for (const guia of GUIAS) {
  const opciones = new Map(guia.variables.map((v) => [v.id, new Set(v.opciones.map((o) => o.id))]));
  const ids = new Set(guia.variables.map((v) => v.id));

  comprobar(`${guia.slug}: ninguna condición apunta a una variable inexistente`, () => {
    for (const [nombre, items] of [
      // `cuando` es opcional desde `adhesion-primera-capa`: hay reglas generales, como
      // «recalibra al cambiar de chapa», que no dependen de ninguna variable. Para esas,
      // la condición es `{}`, que se cumple siempre.
      ['regla', guia.reglas.map((r) => [r.id, r.cuando ?? {}])],
      ['tarjeta', guia.conocimiento.map((c) => [c.id, c.cuando ?? {}])],
    ]) {
      for (const [id, cond] of items) {
        for (const variable of Object.keys(cond)) {
          assert.ok(
            ids.has(variable),
            `${nombre} «${id}» usa la variable «${variable}», que no existe en ${guia.slug}`
          );
        }
      }
    }
  });

  comprobar(`${guia.slug}: ningún valor de condición es imposible`, () => {
    for (const r of guia.reglas) {
      for (const [variable, esperado] of Object.entries(r.cuando ?? {})) {
        const validas = opciones.get(variable);
        const lista = Array.isArray(esperado) ? esperado : [esperado];
        for (const v of lista) {
          assert.ok(
            validas.has(v),
            `la regla «${r.id}» pide ${variable}=«${v}», que no es una opción de ${guia.slug}`
          );
        }
      }
    }
  });

  comprobar(`${guia.slug}: cada acción tiene porqué y fuente`, () => {
    for (const r of guia.reglas) {
      assert.ok(r.accion.length > 3, `regla «${r.id}» sin acción`);
      assert.ok(r.porque.length > 20, `regla «${r.id}» sin porqué`);
      assert.ok(r.fuente.length > 2, `regla «${r.id}» sin fuente`);
    }
  });

  comprobar(`${guia.slug}: ninguna acción es una instrucción sin número cuando dice serlo`, () => {
    for (const r of guia.reglas) {
      // Una acción con cifras debe traerlas en `valor`, no enterradas en el porqué.
      const conCifra = /°C|mm|%/.test(r.accion);
      if (conCifra) assert.ok(r.valor, `regla «${r.id}» dice una cifra en la acción y no la declara en valor`);
    }
  });

  /*
   * El indicador de cada acción: lo que convierte una lista de frases en un
   * instrumento.
   *
   * «Sube la temperatura de cama» es texto. «Sube la temperatura de cama» con una
   * flecha ↑ al lado es una **acción**, y se lee de un vistazo lo que hay que hacer
   * con ella: subir, bajar, limpiar, medir, activar.
   *
   * El indicador sale del **verbo** de la acción, no de un campo nuevo: escribirlo
   * dos veces sería mantenerlo en dos sitios. Cuando la derivación se equivoca, la
   * regla declara su `indicador` explícito y gana el declarado.
   *
   * Y aquí está la parte que manda: **un verbo que la tabla no conoce es un fallo**.
   * No porque el texto esté mal, sino porque una acción cuyo indicador nadie sabe
   * deducir es una acción que se pinta sin indicador, que es exactamente el muro de
   * texto que este trabajo viene a quitar.
   */
  comprobar(`${guia.slug}: cada acción tiene un indicador`, () => {
    assert.ok(indicadores, 'falta src/lib/indicadores.ts');
    const ofensores = [];
    for (const r of guia.reglas) {
      const explicito = r.indicador;
      if (explicito !== undefined) {
        if (!indicadores.INDICADORES_ACCION.includes(explicito)) {
          ofensores.push(`«${r.id}» declara el indicador «${explicito}», que no está en el vocabulario`);
        }
        continue;
      }
      const derivado = indicadores.indicadorDeAccion(r.accion);
      if (derivado === null) {
        ofensores.push(`«${r.id}» no dice qué hacer: «${r.accion}»`);
      }
    }
    assert.deepEqual(ofensores, [], ofensores.join('\n      '));
  });

  comprobar(`${guia.slug}: el resumen es una frase`, () => {
    /*
     * El contrato dice que `resumen` es una frase, y no lo era: la media eran 164
     * caracteres y 19 de las 32 guías tenían más de una frase. La tarjeta del índice
     * y el `description` salían con tres frases encima.
     *
     * Lo que se comprueba ahora es lo que el contrato dice. Y lo que va después de
     * la primera frase no se pierde: está en `resumenExtra` y sale en la cabecera
     * de la guía.
     */
    const frases = (guia.resumen.match(/[.!?](?=\s|$)/g) ?? []).length;
    assert.ok(frases <= 1, `el resumen tiene ${frases} frases: «${guia.resumen}»`);
  });

  comprobar(`${guia.slug}: cada tarjeta y cada variable declaran su tema`, () => {
    assert.ok(indicadores, 'falta src/lib/indicadores.ts');
    const ofensores = [];
    for (const c of guia.conocimiento) {
      if (c.indicador === undefined) {
        ofensores.push(`la tarjeta «${c.id}» no declara su indicador`);
        continue;
      }
      if (!indicadores.INDICADORES_TEMA.includes(c.indicador)) {
        ofensores.push(`la tarjeta «${c.id}» declara el indicador «${c.indicador}», que no está en el vocabulario`);
      }
    }
    for (const v of guia.variables) {
      if (v.indicador === undefined) {
        ofensores.push(`la variable «${v.id}» no declara su indicador`);
        continue;
      }
      if (!indicadores.INDICADORES_TEMA.includes(v.indicador)) {
        ofensores.push(`la variable «${v.id}» declara el indicador «${v.indicador}», que no está en el vocabulario`);
      }
    }
    assert.deepEqual(ofensores, [], ofensores.join('\n      '));
  });

  /*
   * El cuerpo de una tarjeta, en puntos.
   *
   * Un cuerpo de 336 caracteres de media son tres frases encadenadas, y encadenadas
   * se leen como un párrafo: un muro. Separadas en puntos, la misma información se
   * lee de un vistazo y la tarjeta gana la jerarquía que le faltaba.
   *
   * Los puntos son opcionales **sólo** mientras la migración no ha pasado por esta
   * guía. En cuanto están, la comprobación exige que sean de dos a cuatro y que
   * ninguno pase de 140 caracteres: un punto es una línea, no un párrafo.
   */
  comprobar(`${guia.slug}: cada tarjeta de conocimiento tiene sus puntos`, () => {
    const ofensores = [];
    for (const c of guia.conocimiento) {
      if (c.puntos === undefined) continue;
      assert.ok(c.puntos.length >= 1, `la tarjeta «${c.id}» no tiene puntos`);
      for (const p of c.puntos) {
        assert.ok(p.trim().length > 0, `la tarjeta «${c.id}» tiene un punto vacío`);
        if (p.length > 140) {
          ofensores.push(`la tarjeta «${c.id}» tiene un punto de ${p.length} caracteres`);
        }
      }
    }
    assert.deepEqual(ofensores, [], ofensores.join('\n      '));
  });

  comprobar(`${guia.slug}: el porqué de cada acción cabe en una línea`, () => {
    const largos = guia.reglas.filter((r) => r.porque.length > MAX_PORQUE).length;
    assert.ok(
      largos <= DEUDA_PORQUE,
      `${guia.slug} tiene ${largos} reglas con el porqué de más de ${MAX_PORQUE} caracteres, y el freno está en ${DEUDA_PORQUE}`
    );
  });

  comprobar(`${guia.slug}: ningún enlace interno apunta a una guía inexistente`, () => {
    const destinos = [
      guia.diferencial.siNo?.guia,
      ...guia.conocimiento.map((c) => c.enlaza?.guia),
      // El cuarto sitio: el enlace de una regla, que es lo que permite que una
      // guia enrute a las que diagnostican sin repetirlas.
      ...guia.reglas.map((r) => r.enlaza?.guia),
      ...guia.fueraDeAlcance.map((f) => f.guia),
    ].filter(Boolean);
    for (const d of destinos) {
      assert.ok(
        GUIAS.some((g) => g.slug === d),
        `${guia.slug} enlaza a «${d}», que no está escrita`
      );
    }
  });

  /*
   * La negrita esta escrita como `**` y la pagina la interpreta.
   *
   * Antes se veia literal. Las guias llevan `**negrita**` en los sitios donde carga
   * significado —casi siempre en `alcance`, marcando el matiz que separa una afirmacion
   * acotada de una general— y salia como `**no puede detectar que chapa esta instalada**`,
   * con los asteriscos dentro de la frase. Cincuenta y dos apariciones en cuatro guias.
   *
   * Lo que se comprueba es que **toda** negrita este equilibrada, y que ningun campo que la
   * pagina **no** interpreta con `<Negrita>` la lleve: ahi saldria literal, y una `**`
   * suelta no produce texto feo, produce texto que se come el resto de la frase.
   */
  comprobar(`${guia.slug}: la negrita esta equilibrada y en un campo que la interpreta`, () => {
    const conNegrita = [
      ...guia.reglas.flatMap((r) => [
        [r.porque],
        ...(r.alcance ? [r.alcance] : []),
      ]),
      ...guia.conocimiento.flatMap((c) => [
        [c.cuerpo],
        ...(c.cita ? [c.cita.texto] : []),
      ]),
      ...guia.diferencial.comprobaciones.flatMap((c) => [c.si, c.no]),
      ...guia.fueraDeAlcance.map((f) => f.porQue),
      ...guia.variables.map((v) => v.para),
    ];

    const abierta = (texto) =>
      typeof texto === 'string' && (texto.match(/\*\*/g) ?? []).length % 2 !== 0;

    for (const texto of conNegrita) {
      assert.ok(
        !abierta(texto),
        `negrita sin cerrar en un campo que se interpreta: "${texto.slice(0, 64)}"`
      );
    }

    const sinInterpretar = [
      guia.sintoma,
      guia.resumen,
      guia.entrada,
      guia.titulo,
      guia.autor.nombre,
      ...(guia.autor.credencial ? [guia.autor.credencial] : []),
      ...guia.reglas.map((r) => r.accion),
      ...guia.reglas.map((r) => r.valor ?? ''),
      ...guia.conocimiento.map((c) => c.cifra?.valor ?? ''),
      ...guia.conocimiento.map((c) => c.cifra?.nota ?? ''),
      ...guia.variables.map((v) => v.etiqueta),
      ...guia.variables.flatMap((v) => v.opciones.flatMap((o) => [o.etiqueta, o.detalle ?? ''])),
      ...guia.diferencial.comprobaciones.map((c) => c.mira),
      ...guia.fueraDeAlcance.map((f) => f.sintoma),
    ];
    for (const texto of sinInterpretar) {
      assert.ok(
        !texto.includes('**'),
        `un campo que se pinta como texto plano lleva ** y saldria literal: "${texto.slice(0, 64)}"`
      );
    }
  });

comprobar(`${guia.slug}: hay fuentes declaradas y son URLs`, () => {
    assert.ok(guia.fuentes.length >= 3, `${guia.fuentes.length} fuentes`);
    for (const f of guia.fuentes) {
      assert.match(f.url, /^https?:\/\//, `URL inválida: ${f.url}`);
      assert.ok(f.quien.length > 1 && f.que.length > 5);
    }
  });

  /*
   * La entrada existe y es un párrafo, no un titular.
   *
   * El tipo ya la hace obligatoria, así que el compilador la exige. Esto comprueba
   * lo que el compilador no puede: que esté **escrita** y no rellenada con un
   * mínimo para pasar el tipo. Un umbral de 60 caracteres separa una frase de
   * párrafo; las nueve rondan los 150–250, así que queda holgado.
   */
  comprobar(`${guia.slug}: la entrada es un párrafo escrito, no un relleno`, () => {
    assert.ok(
      typeof guia.entrada === 'string' && guia.entrada.length > 60,
      `entrada de ${guia.entrada?.length ?? 0} caracteres`
    );
  });

  /*
   * Autoría y fecha: la señal de calidad que un evaluador busca y que el nicho
   * en español no tiene. Se comprueba igual que el contenido —el tipo ya las
   * hace obligatorias, esto verifica que estén **bien**: un nombre real, un
   * perfil que sea URL si existe, y una fecha ISO válida (no «2026-13-40»).
   */
  comprobar(`${guia.slug}: tiene autor con nombre y fecha de actualización válida`, () => {
    assert.ok(typeof guia.autor?.nombre === 'string' && guia.autor.nombre.length > 3, 'el autor no tiene nombre');
    assert.equal(guia.autor, AUTOR, 'la guía no firma con el autor del proyecto (¿AUTOR duplicado a mano?)');
    if (guia.autor.perfil) {
      assert.match(guia.autor.perfil, /^https?:\/\//, `el perfil no es una URL: ${guia.autor.perfil}`);
    }
    assert.match(guia.actualizado ?? '', /^\d{4}-\d{2}-\d{2}$/, `actualizado no es ISO YYYY-MM-DD: ${guia.actualizado}`);
    assert.ok(
      !Number.isNaN(new Date(`${guia.actualizado}T00:00:00`).getTime()),
      `fecha de actualización inválida: ${guia.actualizado}`
    );
  });

  comprobar(`${guia.slug}: el diferencial tiene salida si declara siNo`, () => {
    if (!guia.diferencial.siNo) return;
    assert.ok(GUIAS.some((g) => g.slug === guia.diferencial.siNo.guia));
  });

  /*
   * El título de la etapa 1 no puede ser un trabalenguas.
   *
   * Es «Antes de tocar nada: descártalo como …», y `contra` puede ser una
   * enumeración entera: en `voladizos-y-soportes` salía «descártalo como voladizo
   * que cuelga, soportes que fallan y cara apoyada rugosa», que en el `h2` ocupa
   * dos líneas y no se lee. `contraCorto` es la versión corta para el título; esta
   * comprobación impide que vuelva a colarse una enumeración.
   *
   * El umbral es 40 caracteres. Los títulos de hoy van de 7 a 25 —«separación
   * entre capas» es el más largo—, así que 40 deja sitio sin permitir una frase
   * entera. Medido sobre las siete, no puesto a ojo.
   */
  comprobar(`${guia.slug}: el título de la etapa 1 es corto`, () => {
    const titulo = guia.diferencial.contraCorto ?? guia.diferencial.contra;
    assert.ok(
      titulo.length <= 40,
      `«${guia.slug}»: el título mide ${titulo.length} caracteres —"${titulo}"—; una enumeración ahí se lee como un trabalenguas. Va en contraCorto.`
    );
  });

  comprobar(`${guia.slug}: las variables necesarias van primero`, () => {
    const orden = variablesEnOrden(guia);
    const necesarias = guia.variables.filter((v) => v.necesaria).map((v) => v.id);
    for (const id of necesarias) {
      assert.ok(
        orden.findIndex((v) => v.id === id) < orden.findIndex((v) => !necesarias.includes(v.id)),
        `${id} es necesaria y no se pregunta antes que las opcionales`
      );
    }
  });

  comprobar(`${guia.slug}: sin variables marcadas sólo salen reglas generales`, () => {
    const condicionales = guia.reglas.filter((r) => r.cuando && Object.keys(r.cuando).length > 0);
    const saleSinNada = reglasQueSalen(guia, {}).map((r) => r.id);
    for (const r of condicionales) {
      assert.ok(
        !saleSinNada.includes(r.id),
        `«${r.id}» se dispara sin ninguna variable contestada, pero su condición pide ${Object.keys(r.cuando).join(', ')}`
      );
    }
    for (const id of saleSinNada) {
      const r = guia.reglas.find((x) => x.id === id);
      assert.ok(
        !r.cuando || Object.keys(r.cuando).length === 0,
        `«${id}» sale sin contestaciones y sin ser general`
      );
    }
  });

  /*
   * Una regla general tiene que existir por escrito, no por descuido.
   *
   * Con `cuando` opcional, quitar la condición de una regla es un cambio de una línea
   * que la convierte en un consejo que sale siempre. Eso es legítimo a veces —«recalibra
   * al cambiar de chapa» depende del grosor, no del material ni del síntoma— y es
   * exactamente el tipo de cosa que un redactor hace sin querer en la fila equivocada.
   *
   * Lo que distingue los dos casos no es la forma: es que la regla general legítima
   * explica **por qué no puede condicionarse**, y eso está en su `alcance`. Esto es un
   * aviso y no un fallo, a propósito: no hay forma de distinguir un descuido de una
   * decisión sin leer el motivo, y el motivo está a dos líneas de la regla. Un test que
   * fallara aquí obligaría a poner una condición falsa, que es peor.
   */
  const generales = guia.reglas.filter((r) => !r.cuando).map((r) => r.id);
  if (generales.length > 0) {
    console.log(
      `  AVISO ${guia.slug}: reglas sin condición -> ${generales.join(', ')}. Que cada una explique en «alcance» por qué no puede condicionarse.`
    );
  }

  /*
   * Ninguna variable puede ser decorativa.
   *
   * Esta comprobación existe por un fallo real, no por Prudencia. La primera
   * versión de la guía de warping declaraba una variable «Tamaño de la pieza» con
   * tres opciones y ninguna regla ni tarjeta la usaba. Preguntar algo que no
   * cambia el resultado es peor que no preguntar: la persona marca una casilla,
   * ve que la lista no se mueve, y se queda con la impresión de que la guía no
   * reacciona — que es exactamente el defecto que motivó todo el
   * cambio de formato.
   *
   * Se comprueba que la variable aparezca en alguna condición, no que produzca
   * un resultado distinto: PLA y PLA-CF comparten fila en la tabla de Bambu, y por
   * eso `material` tiene dos opciones que se comportan igual sin que eso sea un
   * problema.
   */
  /*
   * Cada cifra lleva su alcance, y no hay dos cifras que digan lo mismo de otra
   * manera.
   *
   * Esto existe por un fallo real del primer borrador. La tarjeta «La cifra de cama
   * depende de la chapa» mostraba **35–45 °C · PLA en Cool Plate** con una condición
   * que sólo pedía `material: pla`. Quien marcaba la Textured PEI —que es lo que
   * acababa de declarar— veía un número grande y destacado que **no era el suyo**, y
   * la única forma de enterarse era leer el cuerpo de la tarjeta.
   *
   * En un artículo eso era un error de prosa, tolerable: el párrafo estaba ahí. En el
   * formato nuevo la cifra es **la** cosa que se ve, va en color de acento y ocupa la
   * esquina de la tarjeta, así que un alcance equivocado ahí no es un matiz: es la
   * respuesta equivocada destacada.
   *
   * No se puede comprobar automáticamente que una cifra sea la correcta — eso es del
   * revisor—, pero sí dos cosas mecánicas: que la nota exista y tenga longitud, y que
   * dos cifras con el mismo valor no digan cosas distintas. Esta última es la que
   * atrapa el copiar-y-pegar, que es de donde salió el fallo.
   */
  comprobar(`${guia.slug}: cada cifra lleva su nota de alcance`, () => {
    for (const c of guia.conocimiento) {
      if (!c.cifra) continue;
      assert.ok(c.cifra.valor.length > 0, `la tarjeta «${c.id}» tiene cifra sin valor`);
      assert.ok(
        (c.cifra.nota ?? '').length >= 8,
        `la tarjeta «${c.id}» tiene la cifra «${c.cifra.valor}» sin nota de alcance, y sin ella se lee como recomendación general`
      );
    }
  });

  comprobar(`${guia.slug}: dos cifras iguales no tienen alcances distintos`, () => {
    const porValor = new Map();
    for (const c of guia.conocimiento) {
      if (!c.cifra) continue;
      const anteriores = porValor.get(c.cifra.valor) ?? [];
      for (const otro of anteriores) {
        assert.equal(
          otro.nota,
          c.cifra.nota,
          `«${otro.id}» y «${c.id}» muestran «${c.cifra.valor}» con alcances distintos: una de las dos está mal`
        );
      }
      anteriores.push({ id: c.id, nota: c.cifra.nota });
      porValor.set(c.cifra.valor, anteriores);
    }
  });

  comprobar(`${guia.slug}: ninguna variable es decorativa`, () => {
    const usadas = new Set();
    for (const cond of [
      ...guia.reglas.map((r) => r.cuando ?? {}),
      ...guia.conocimiento.map((c) => c.cuando ?? {}),
    ]) {
      for (const variable of Object.keys(cond)) usadas.add(variable);
    }
    for (const variable of guia.variables) {
      assert.ok(
        usadas.has(variable.id),
        `«${variable.id}» se pregunta pero ninguna regla ni tarjeta la mira: sobra`
      );
    }
  });

  /*
   * Ninguna opción tiene que ser indistinguible **en todos los montajes**.
   *
   * Se probó primero «tamaño» con cada opción por separado y falló: `grande` activa
   * una tarjeta que además pide `material: abs`, y `pequena`/`mediana` una regla que
   * también. Aisladas las tres dan el mismo resultado —nada— y la comprobación
   * decía que la variable no servía.
   *
   * Se probó una segunda vez fijando el resto de variables a su primera opción, y
   * también falló, porque para material=pla las dos reglas de `tamaño` están
   * bloqueadas. La comprobación seguía mirando un caso, no el caso.
   *
   * Por eso ahora se busca **alcanzabilidad de verdad**: se prueban todas las
   * combinaciones de las demás variables necesarias y sólo se acepta la variable si
   * hay al menos una combinación en la que sus opciones difieren. Con material=abs
   * sí la hay, que es lo que importa: una variable puede no cambiar nada por sí sola
   * y ser imprescindible en combinación, que es exactamente lo que hace `chapa` sin
   * `material`.
   *
   * El coste es 6 × 5 = 30 combinaciones por variable, y las condiciones son
   * comparaciones de strings sobre objetos de un tamaño fijo. Medido por debajo del
   * milisegundo.
   */
  comprobar(`${guia.slug}: cada variable cambia el resultado en algún montaje`, () => {
    /** Todas las condiciones de la guía, como listas de pares variable/valor. */
    const condiciones = [
      ...guia.reglas.map((r) => r.cuando).filter(Boolean),
      ...guia.conocimiento.map((c) => c.cuando).filter(Boolean),
    ];

    const firma = (elegidas) =>
      JSON.stringify([
        conocimientoVisible(guia, elegidas).map((c) => c.id),
        reglasQueSalen(guia, elegidas).map((r) => r.id),
      ]);

    for (const variable of guia.variables) {
      if (variable.opciones.length < 2) continue;

      /*
       * Sólo se varían las variables que **conviven** con esta en alguna condición.
       *
       * Variar todas las necesarias no basta —`cama` sólo aparece en una regla que
       * además pide `camara`, que no es necesaria— y variar todas las variables de
       * la guía daría miles de combinaciones para responder a una pregunta local.
       *
       * El conjunto relevante es pequeño y es el correcto: si dos variables no
       * comparten ninguna condición, la una no puede cambiar el resultado de la otra,
       * y comprobarlas por separado es suficiente.
       */
      const vecinas = [
        ...new Set(
          condiciones
            .filter((c) => variable.id in c)
            .flatMap((c) => Object.keys(c))
            .filter((v) => v !== variable.id)
        ),
      ];

      const combinaciones = vecinas
        .map((id) => guia.variables.find((v) => v.id === id))
        .filter(Boolean)
        .reduce((acum, v) => acum.flatMap((previa) => v.opciones.map((o) => [...previa, [v.id, o.id]])), [[]]);

      const diferencia = variable.opciones.some((primera, i) =>
        variable.opciones.slice(i + 1).some((otra) =>
          combinaciones.some((combo) => {
            const a = Object.fromEntries(combo);
            const b = { ...a };
            a[variable.id] = primera.id;
            b[variable.id] = otra.id;
            return firma(a) !== firma(b);
          })
        )
      );

      assert.ok(
        diferencia,
        `ninguna de las ${variable.opciones.length} opciones de «${variable.id}» cambia nada en ninguna de las ${combinaciones.length} combinaciones de ${vecinas.join(', ') || 'nada'}: la variable no sirve`
      );
    }
  });
}

console.log('\n=== El diagnóstico se estrecha ===\n');

const warping = guiaPorSlug('warping-pla');
/**
 * Que la guía se estreche.
 *
 * Lo que se comprueba aquí es la propiedad de arriba aplicada al caso bueno, y es
 * distinta a la de «ninguna variable es decorativa»: aquella pregunta «¿esta variable
 * sirve para algo?», ésta pregunta «¿declarar más da más?».
 *
 * Una versión anterior pedía que cada opción aislada añadiera algo, y falló con
 * `material=pla-cf`: PLA y PLA-CF dan el mismo resultado porque comparten fila en la
 * tabla de Bambu. La comprobación estaba mal, no el dato — obligar a que difieran
 * sería obligar a inventar una diferencia que las fuentes no tienen, que es el mismo
 * error que esta wiki lleva cuatro revisiones intentando no cometer.
 */
comprobar('al declarar todo se ve más que declarando una sola variable', () => {
  const todo = { material: 'pla', chapa: 'textured', tamaño: 'grande' };
  const completo = conocimientoVisible(warping, todo).length + reglasQueSalen(warping, todo).length;
  const parcial = reglasQueSalen(warping, { material: 'pla' }).length;
  assert.ok(completo > parcial, `completo ${completo} vs parcial ${parcial}`);
});

comprobar('sin declarar nada la recomendación avisa, no muestra una lista vacía', () => {
  // Las reglas con condición de material no pueden dispararse: el motor no inventa.
  assert.equal(reglasQueSalen(warping, {}).length, 0);
  // Y sí hay tarjetas, porque las que no llevan condición son la base de la guía.
  assert.ok(conocimientoVisible(warping, {}).length > 0);
});

comprobar('la chapa cambia la cifra de cama: es la razón de existir de la guía', () => {
  const conCool = reglasQueSalen(warping, { material: 'pla', chapa: 'cool' });
  const conTextured = reglasQueSalen(warping, { material: 'pla', chapa: 'textured' });
  const valor = (rs) => rs.find((r) => r.accion.startsWith('Sube la temperatura'))?.valor;
  assert.equal(valor(conCool), '35–45 °C');
  assert.match(valor(conTextured), /45–65/);
  assert.notEqual(valor(conCool), valor(conTextured));
});

console.log('\n=== El puente con el analizador ===\n');

comprobar('sin archivo no precontesta nada', () => {
  assert.deepEqual(precontestar(warping, null), {});
  assert.deepEqual(precontestar(warping, {}), {});
});

comprobar('lee el material del G-code y lo mapea a una opción existente', () => {
  /*
   * ASA cae en `abs` y no en una opción propia, y es correcto: la guía declara una
   * sola opción «ABS o ASA» porque comparten fila en la tabla de Bambu —90–100 °C
   * para las dos—. Si el mapeo las separara, el motor tendría una opción que ninguna
   * regla puede distinguir, y eso es peor que agruparlas.
   *
   * Los valores son los que escriben los slicers, no nombres químicos en español: el
   * campo viene de la cabecera del G-code, y lo que hay ahí son «PLA», «PETG»,
   * «ASA» o «PLA-CF». Se probó con «poliláctido» y falló, y la comprobación estaba
   * mal: ese nombre no aparece en ninguna cabecera de slicer, así que probarlo
   * documentaba una capacidad que no hace falta.
   */
  const casos = [
    ['PLA', 'pla'], ['PLA-CF', 'pla-cf'], ['PETG', 'petg'], ['ABS', 'abs'],
    ['ASA', 'abs'], ['PC', 'pc'], ['PA-CF', 'pa'], ['PLA Basic', 'pla'],
    ['PLA Silk', 'pla'], ['nylon PA12', 'pa'],
  ];
  for (const [entrada, esperado] of casos) {
    const r = precontestar(warping, { material: entrada });
    assert.equal(r.material, esperado, `«${entrada}» -> ${r.material ?? 'nada'}, esperaba ${esperado}`);
  }
});

comprobar('un material que la guía no cubre no se precontesta', () => {
  // El TPU no está entre las opciones de material de la guía de warping. Marcarlo
  // «un material cualquiera» sería peor que no marcarlo: la lista de acciones saldría
  // con cifras que no son de ese filamento.
  assert.equal(precontestar(warping, { material: 'TPU' }).material, undefined);
  assert.equal(precontestar(guiaPorSlug('temperatura-cama'), { material: 'TPU' }).material, 'tpu');
});

comprobar('PLA-CF no se confunde con PC: el orden de las agujas importa', () => {
  // Un orden alfabético plano clasificaría "PLA-CF" por su "PC" y lo mandaría al
  // extremo opuesto del ranking de warping.
  assert.equal(precontestar(warping, { material: 'PLA-CF' }).material, 'pla-cf');
});

comprobar('un material desconocido no precontesta nada, no inventa una opción', () => {
  assert.equal(precontestar(warping, { material: 'Resina XYZ' }).material, undefined);
});

comprobar('la temperatura de cama sólo precontesta si el slicer la escribió', () => {
  assert.equal(precontestar(warping, { bedTemp: 65 }).cama, 'alta');
  assert.equal(precontestar(warping, { bedTemp: 20 }).cama, undefined);
  assert.equal(precontestar(warping, {}).cama, undefined);
});

console.log('\n=== La barra «Tu archivo» ===\n');

/**
 * Los nombres de campo que existen de verdad.
 *
 * Leídos de `src/services/types.ts` y no escritos aquí, por lo mismo que
 * `leerCamposOpcionales()` de `verify:wiki`: una lista copiada seguiría pasando
 * después de que alguien añadiese un campo a `ProjectMetadata` o cambiase el
 * nombre de uno, y la comprobación documentaría una capacidad que ya
 * no existe.
 *
 * Se leen también los campos **obligatorios**, no sólo los opcionales: aquí no
 * importa la obligatoriedad, importa el nombre.
 */
const camposDeLosTipos = (() => {
  const tipos = readFileSync(join(RAIZ, 'src/services/types.ts'), 'utf-8');
  const nombres = new Set();
  for (const interfaz of ['ProjectMetadata', 'JevClassification']) {
    const desde = tipos.indexOf(`interface ${interfaz}`);
    assert.ok(desde >= 0, `no se encuentra la interfaz ${interfaz} en types.ts`);
    const hasta = tipos.indexOf('\n}', desde);
    const cuerpo = tipos.slice(desde, hasta < 0 ? tipos.length : hasta);
    for (const linea of cuerpo.split('\n')) {
      const par = linea.match(/^\s+([a-zA-Z][a-zA-Z0-9_]*)\??:\s*([^;]+);/);
      if (par) nombres.add(par[1]);
    }
  }
  return nombres;
})();

comprobar('los campos se han podido leer de types.ts', () => {
  assert.ok(camposDeLosTipos.size >= 10, `${camposDeLosTipos.size} campos`);
});

for (const guia of GUIAS) {
  const declarados = camposDeLaGuia(guia);
  const anclas = anclasDeCampos(guia);

  comprobar(`${guia.slug}: todo campo que declara existe en los contratos de datos`, () => {
    for (const campo of declarados) {
      assert.ok(
        camposDeLosTipos.has(campo),
        `${guia.slug} declara «${campo}», que no es un campo de ProjectMetadata ni de JevClassification`
      );
    }
  });

  comprobar(`${guia.slug}: ningún elemento declara un campo que la guía no declara`, () => {
    /*
     * Los `campos` viven en dos sitios —la guía y el elemento que lo explica— y
     * esto ata el segundo al primero. Sin esta comprobación, escribir
     * `campos: ['bedTemp']` en una variable y no añadirlo a `leeDelAnalisis`
     * dejaría un ancla que nada enlaza: el enlace se puede generar, pero la barra
     * nunca lo pinta porque la guía no lee ese campo. Es el fallo más silencioso
     * de los dos, porque el `href` está bien escrito y no hay ningún error.
     */
    for (const elemento of [...guia.variables, ...guia.conocimiento]) {
      for (const campo of elemento.campos ?? []) {
        assert.ok(
          declarados.includes(campo),
          `${guia.slug}: «${campo}» está declarado en un elemento pero no en leeDelAnalisis ni en campos de la guía`
        );
      }
    }
  });

  comprobar(`${guia.slug}: todo campo que declara tiene un sitio donde se explica`, () => {
    /*
     * La tarjeta 1.2 del kanban dice que cada dato enlaza a la sección que lo
     * explica. Sin ancla, el dato se enseña pero no lleva a ninguna parte, y eso
     * es peor que no enseñarlo: quien ve «60 °C» sin enlace debajo cree que la
     * guía lo ha relacionado con algo y no lo ha hecho.
     *
     * Y es también la comprobación que hace útil la lista de campos: una guía
     * que declara un campo que nadie explica es un campo que sobra, y aquí salta
     * al cambiar la guía en vez de en un enlace que no hace nada.
     */
    for (const campo of declarados) {
      assert.ok(anclas[campo], `${guia.slug} declara «${campo}» y ninguna variable ni tarjeta lo explica`);
    }
  });

  comprobar(`${guia.slug}: ninguna tarjeta con campos está filtrada por una condición`, () => {
    /*
     * Un fallo que salió al comprobar el HTML exportado, no al escribir la guía.
     *
     * Una tarjeta con `cuando` no se pinta hasta que se declara lo que su
     * condición pide. Si además declara un campo del panel, la barra «Tu archivo»
     * pinta un enlace a `#c-esa-tarjeta` que **no lleva a ninguna parte** hasta
     * que la persona marque algo —y con el filtro puesto, el enlace es un callejón
     * sin salida del que no hay aviso—.
     *
     * La alternativa sería aceptar el enlace roto y avisar en el texto. Es peor:
     * la variable es la que escribe el contenido del fichero y es donde el
     * contenido que explica el dato tiene que estar siempre.
     */
    for (const tarjeta of guia.conocimiento) {
      if (!tarjeta.campos) continue;
      assert.ok(
        !tarjeta.cuando || Object.keys(tarjeta.cuando).length === 0,
        `${guia.slug}: la tarjeta «${tarjeta.id}» declara campos y además tiene la condición ${JSON.stringify(tarjeta.cuando)}, así que el enlace de la barra no lleva a nada hasta que se declare`
      );
    }
  });

  comprobar(`${guia.slug}: ningún campo apunta a dos sitios distintos`, () => {
    const vistos = new Map();
    for (const elemento of [...guia.variables, ...guia.conocimiento]) {
      for (const campo of elemento.campos ?? []) {
        const ancla = 'opciones' in elemento ? idVariable(elemento.id) : idConocimiento(elemento.id);
        const anterior = vistos.get(campo);
        assert.ok(
          anterior === undefined || anterior === ancla,
          `${guia.slug}: «${campo}» está en ${anterior} y en ${ancla}, y el enlace dependería del orden de escritura`
        );
        vistos.set(campo, ancla);
      }
    }
  });

  comprobar(`${guia.slug}: ningún ancla apunta a un elemento que no existe`, () => {
    /*
     * El otro sentido de la misma regla, y el que de verdad rompe algo: que la
     * `href` de la barra tenga a dónde ir. El `id` se pone en la guía desde el
     * mismo prefijo, así que esto sólo puede fallar si se escribe un `id` a mano
     * en un elemento que no lo lleva.
     */
    for (const ancla of Object.values(anclas)) {
      const [, prefijo, id] = /^#(v|c)-(.+)$/.exec(ancla) ?? [];
      assert.ok(prefijo, `ancla con un prefijo desconocido: ${ancla}`);
      const existe = prefijo === 'v'
        ? guia.variables.some((v) => v.id === id)
        : guia.conocimiento.some((c) => c.id === id);
      assert.ok(existe, `${guia.slug}: la ancla ${ancla} no corresponde a ninguna variable ni tarjeta`);
    }
  });

  comprobar(`${guia.slug}: las anclas son únicas`, () => {
    const todas = [
      ...guia.variables.map((v) => `#${idVariable(v.id)}`),
      ...guia.conocimiento.map((c) => `#${idConocimiento(c.id)}`),
    ];
    assert.equal(new Set(todas).size, todas.length, 'hay dos elementos con el mismo id');
  });

  comprobar(`${guia.slug}: sin archivo no hay barra`, () => {
    assert.deepEqual(leerTuArchivo(guia, null, null), { datos: [], conValor: 0, delPanel: 0 });
  });

  comprobar(`${guia.slug}: sólo aparecen los campos que la guía declara`, () => {
    const lectura = leerTuArchivo(
      guia,
      {
        filename: 'x.gcode',
        slicer: 'orca',
        material: 'PLA',
        printTime: 100,
        hotendTemp: 215,
        bedTemp: 60,
        layerHeight: 0.2,
        filamentUsed: 1.2,
        filamentWeight: 3.4,
        hasOverhangs: true,
        overhangAngle: 45,
      },
      { riskLevel: 'Alto', warpingRisk: 0.35, needsSupport: false, recommendation: '' }
    );
    assert.deepEqual(
      lectura.datos.map((d) => d.campo),
      declarados,
      'la barra enseña campos que la guía no declara'
    );
  });
}

comprobar('una guía que no declara ningún campo no pinta barra, aunque haya archivo', () => {
  /*
   * El caso de `adhesion-primera-capa` y `separaciones-entre-capas` hoy es sólo
   * «no explica ningún campo del panel», pero la primera guía del backlog que no
   * lea nada del G-code tendrá esta forma exacta. Se construye aquí en vez de
   * esperar a que exista, porque una comprobación que sólo se puede escribir con
   * la guía real se queda sin escribir.
   */
  const guia = { ...warping, campos: [], leeDelAnalisis: [] };
  const lectura = leerTuArchivo(guia, { filename: 'x.gcode', slicer: 'orca', material: 'PLA', printTime: 1 }, null);
  assert.deepEqual(lectura, { datos: [], conValor: 0, delPanel: 0 });
});

comprobar('el material se enseña tal cual lo escribió el slicer, sin mapearlo', () => {
  /*
   * Mapearlo es lo que hace `precontestar`, y allí tiene sentido: el resultado es
   * una casilla marcada de un diagnóstico entre opciones que la guía declara. Aquí
   * el dato es una lectura, y escribir «PETG» donde la cabecera dice «PETG-CF»
   * sería corregir el archivo sin avisar. También se comprueba con un material
   * que la guía no cubre: sale el material, no un sustituto inventado.
   */
  const material = (v) => leerTuArchivo(warping, { filename: 'x.gcode', slicer: 'orca', material: v, printTime: 1 }, null)
    .datos.find((d) => d.campo === 'material')?.valor;
  assert.equal(material('PLA-CF'), 'PLA-CF');
  assert.equal(material('Resina XYZ'), 'Resina XYZ');
  assert.equal(material('PLA'), 'PLA');
});

comprobar('un dato ausente sale ausente, y un 0 sale como 0', () => {
  const sinNada = leerTuArchivo(warping, { filename: 'x.gcode', slicer: 'orca', material: 'PLA', printTime: 1 }, null);
  const cama = sinNada.datos.find((d) => d.campo === 'bedTemp');
  const riesgo = sinNada.datos.find((d) => d.campo === 'warpingRisk');
  assert.equal(cama.valor, null, 'bedTemp ausente tiene que ser null');
  assert.equal(riesgo.valor, null, 'sin clasificación, warpingRisk tiene que ser null');
  assert.ok(!sinNada.datos.some((d) => d.valor === '0' || d.valor === '0 °C' || d.valor === '—'));

  const conCero = leerTuArchivo(
    warping,
    { filename: 'x.gcode', slicer: 'orca', material: 'PLA', printTime: 1, bedTemp: 0, hasOverhangs: false },
    { riskLevel: 'Bajo', warpingRisk: 0, needsSupport: false, recommendation: '' }
  );
  assert.equal(conCero.datos.find((d) => d.campo === 'bedTemp').valor, '0 °C');
  assert.equal(conCero.datos.find((d) => d.campo === 'warpingRisk').valor, '0 %');
});

comprobar('las cifras salen en la misma unidad y con la coma decimal que el resto', () => {
  const lectura = leerTuArchivo(
    { ...warping, leeDelAnalisis: ['material', 'bedTemp', 'layerHeight', 'filamentWeight', 'overhangAngle', 'hasOverhangs'] },
    {
      filename: 'x.gcode',
      slicer: 'orca',
      material: 'PLA',
      printTime: 1,
      bedTemp: 65,
      layerHeight: 0.2,
      filamentWeight: 12.34,
      overhangAngle: 45,
      hasOverhangs: false,
    },
    null
  );
  const valor = (campo) => lectura.datos.find((d) => d.campo === campo)?.valor;
  assert.equal(valor('bedTemp'), '65 °C');
  assert.equal(valor('layerHeight'), '0,20 mm');
  assert.equal(valor('filamentWeight'), '12,34 g');
  assert.equal(valor('overhangAngle'), '45°');
  assert.equal(valor('hasOverhangs'), 'No', 'false es un valor, no una ausencia');
});

comprobar('warpingRisk sale en porcentaje y es el mismo número que enseña el panel', () => {
  /*
   * `warpingRisk` va de 0 a 1 en el tipo y el panel lo enseña multiplicado por
   * cien. Si la barra lo enseñara en otro formato serían dos datos distintos
   * sobre la misma fila del panel, y en las rutas de la wiki —donde el panel no
   * se monta— no habría forma de saber cuál era el bueno.
   */
  for (const [riesgo, esperado] of [[0, '0 %'], [0.35, '35 %'], [1, '100 %'], [0.126, '13 %']]) {
    const lectura = leerTuArchivo(
      warping,
      { filename: 'x.gcode', slicer: 'orca', material: 'PLA', printTime: 1 },
      { riskLevel: 'Bajo', warpingRisk: riesgo, needsSupport: false, recommendation: '' }
    );
    assert.equal(lectura.datos.find((d) => d.campo === 'warpingRisk').valor, esperado);
  }
});

comprobar('sin ancla declarada el dato se dice y no se enlaza', () => {
  /*
   * La otra mitad de la tarjeta 1.2: si el campo no tiene sección que lo explique, no
   * se ofrece enlace. Un enlace a la sección equivocada es peor que ninguno,
   * porque parece que la guía explica ese dato.
   *
   * Se quita el `campos` **del elemento**, y no de la lista de la guía: es el
   * campo en la variable el que crea el ancla. Una versión anterior de esta
   * comprobación sólo recortaba `leeDelAnalisis` y fallaba con `#v-cama`, porque
   * el ancla no depende de la lista de la guía sino de dónde está declarado.
   */
  const guia = {
    ...warping,
    variables: warping.variables.map((v) => (v.id === 'cama' ? { ...v, campos: undefined } : v)),
  };
  const lectura = leerTuArchivo(
    guia,
    { filename: 'x.gcode', slicer: 'orca', material: 'PLA', printTime: 1, bedTemp: 60 },
    null
  );
  assert.equal(lectura.datos.find((d) => d.campo === 'material').ancla, '#v-material');
  assert.equal(lectura.datos.find((d) => d.campo === 'bedTemp').ancla, null, 'la copia no declara dónde se explica bedTemp');
  assert.equal(enlazados(lectura), 3, 'de los cuatro campos, sólo el que perdió su declaración deja de enlazar');
});

comprobar('la barra distingue lo que viene del archivo de lo que viene del diagnóstico', () => {
  const lectura = leerTuArchivo(
    warping,
    { filename: 'x.gcode', slicer: 'orca', material: 'PLA', printTime: 1, bedTemp: 60 },
    { riskLevel: 'Moderado', warpingRisk: 0.35, needsSupport: false, recommendation: '' }
  );
  assert.equal(lectura.delPanel, 2, 'warpingRisk y riskLevel son del diagnóstico');
  assert.deepEqual(
    lectura.datos.filter((d) => d.origen === 'archivo').map((d) => d.campo),
    ['material', 'bedTemp']
  );
  assert.equal(lectura.conValor, 4, 'con el G-code completo no falta ninguno de los cuatro');
});

console.log('');
console.log('=== El intervalo de la fuente, para comparar con tu archivo ===');
console.log('');

for (const guia of GUIAS) {
  comprobar(`${guia.slug}: cada rango es un campo real y dice lo mismo que su valor`, () => {
    for (const r of guia.reglas) {
      if (!r.rango) continue;
      assert.ok(
        camposDeLosTipos.has(r.rango.campo),
        `la regla «${r.id}» compara «${r.rango.campo}», que no es un campo de ProjectMetadata ni de JevClassification`
      );
      assert.ok(r.rango.min < r.rango.max, `el rango de «${r.id}» no tiene min < max`);
      assert.ok(r.valor, `la regla «${r.id}» tiene rango y no tiene valor, y son el mismo dato`);
      assert.ok(
        r.valor.includes(String(r.rango.min)) && r.valor.includes(String(r.rango.max)),
        `el valor «${r.valor}» y el rango ${r.rango.min}–${r.rango.max} de «${r.id}» dicen cosas distintas`
      );
    }
  });
}

comprobar('al menos una regla trae el intervalo, o la comparación sería código muerto', () =>
  assert.ok(GUIAS.some((g) => g.reglas.some((r) => r.rango)), 'ninguna regla declara rango')
);

comprobar('la comparación marca dentro, por encima y por debajo', () => {
  const rango = { campo: 'bedTemp', min: 45, max: 65, unidad: '°C' };
  assert.deepEqual(compararValor(rango, 50), { posicion: 'dentro', diferencia: 0 });
  assert.deepEqual(compararValor(rango, 45), { posicion: 'dentro', diferencia: 0 }, 'el extremo bajo es dentro');
  assert.deepEqual(compararValor(rango, 65), { posicion: 'dentro', diferencia: 0 }, 'el extremo alto es dentro');
  assert.deepEqual(compararValor(rango, 40), { posicion: 'por-debajo', diferencia: 5 });
  assert.deepEqual(compararValor(rango, 70), { posicion: 'por-encima', diferencia: 5 });
  assert.equal(compararValor(rango, undefined), null, 'sin dato no hay comparación, no un «dentro»');
});

if (fallos.length > 0) {
  console.log(`\n${fallos.length} COMPROBACIONES HAN FALLADO:\n`);
  for (const f of fallos) console.log(`  ✗ ${f.nombre}\n      ${f.mensaje}\n`);
  process.exit(1);
}

console.log(`\nMotor de guías: ${pruebas}/${pruebas} comprobaciones aprobadas.`);
