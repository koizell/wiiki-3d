/*
 * Los imports llevan extensión `.ts` a propósito.
 *
 * Vite no la necesita —resolvería `../content/guias/warping` sin problema—, pero
 * `scripts/verify/guias.mjs` importa este mismo fichero en Node para probar el
 * motor sin navegador, y el resolver de Node **exige** la extensión: es la
 * diferencia entre ESM y el modo de Vite. `allowImportingTsExtensions` está
 * activado en `tsconfig.app.json`, así que el compilador lo acepta.
 *
 * La alternativa era duplicar el registro dentro del script de prueba, y entonces
 * la prueba comprobaría una lista de guías distinta de la que usa la web: el fallo
 * más difícil de encontrar y el más fácil de tener.
 */
import { adhesion } from '../content/guias/adhesion-primera-capa.ts';
import { alturaCapa } from '../content/guias/altura-capa.ts';
import { enclosureYWarping } from '../content/guias/enclosure-y-warping.ts';
import { material } from '../content/guias/material.ts';
import { separaciones } from '../content/guias/separaciones.ts';
import { temperaturaCama } from '../content/guias/temperatura-cama.ts';
import { voladizosSoportes } from '../content/guias/voladizos-y-soportes.ts';
import { warping } from '../content/guias/warping.ts';
import type { Condicion, Guia, RangoFuente, Regla, Variable } from '../content/guias/tipos.ts';

/**
 * El registro de guías y el motor que las hace funcionar.
 *
 * ## Por qué la condición es estricta
 *
 * Una regla aparece sólo si **todas** las variables de su condición están
 * contestadas y todas coinciden. La alternativa —aplicar la regla con lo que se
 * sepa— daría una recomendación que cambia según lo que el usuario se ha acordado
 * de contestar, y eso es peor que no dar ninguna: es una recomendación que parece
 * personalizada y no lo está.
 *
 * La consecuencia útil es que **la guía se llena mientras lees**. Cuantas más
 * variables declaras, más tarjetas y más acciones aparecen, y cada aparición es
 * una razón para seguir declarando. Ese es el bucle que hace que la página no sea
 * un documento.
 *
 * Y por eso las variables marcadas `necesaria` se dicen como tales: si una acción
 * depende de la chapa y la chapa no está declarada, la acción no sale, y el
 * propio contador lo enseña en vez de dejar que parezca que no hay más que hacer.
 */

/**
 * Las guías del sitio.
 *
 * A mano y no con `import.meta.glob`, y es una decisión de esta vez y no de la
 * anterior. Con glob el índice se derivaría del contenido y no podría
 * desincronizarse, que era el argumento bueno; pero el registro también es donde
 * vive el **orden**, y el orden de un índice de síntomas es editorial —el más
 * frecuente primero—, no alfabetético. Un array lo declara quien lo piensa; un
 * `glob` con un `.sort()` obliga a que el orden sea un dato del nombre del
 * fichero, y eso se rompe con el primer artículo que se llame de otra manera.
 *
 * El coste es que hay que añadir una línea al escribir una guía. Se acepta: es
 * una línea, y a cambio el orden dice algo.
 */
export const GUIAS: Guia[] = [alturaCapa, warping, enclosureYWarping, separaciones, temperaturaCama, adhesion, material, voladizosSoportes];

const POR_SLUG = new Map(GUIAS.map((g) => [g.slug, g]));

/** Una guía por su slug, o `null`. */
export function guiaPorSlug(slug: string | undefined): Guia | null {
  return slug ? POR_SLUG.get(slug) ?? null : null;
}

/** Cuántas guías hay, y sus slugs, para la exportación estática. */
export function slugsGuias(): string[] {
  return GUIAS.map((g) => g.slug);
}

/** La etiqueta de un slug, para pintar un enlace a otra guía sin cargarla entera. */
export function etiquetaGuia(slug: string): string | null {
  return POR_SLUG.get(slug)?.titulo ?? null;
}

/** Se cumple una condición con lo declarado. */
export function seCumple(condicion: Condicion, elegidas: Record<string, string>): boolean {
  for (const [variable, esperado] of Object.entries(condicion)) {
    const actual = elegidas[variable];
    // Sin respuesta no hay cumplimiento. Es lo que hace que una regla con
    // `cama: 'alta'` espere a que se declare la cama en vez de salir en blanco.
    if (actual === undefined) return false;
    if (Array.isArray(esperado)) {
      if (!esperado.includes(actual)) return false;
    } else if (actual !== esperado) {
      return false;
    }
  }
  return true;
}

/**
 * Las reglas que se disparan con lo declarado, en el orden en que se declaran.
 *
 * `!r.cuando` sale siempre, y es lo correcto: hay reglas generales —«recalibra al
 * cambiar de chapa» depende del grosor, no del material ni del síntoma— y
 * escribirlas como `cuando: { chapa: [las cinco opciones] }` es no filtrar mientras
 * aparenta que sí. Ver el comentario de `Regla.cuando` en `tipos.ts`.
 */
export function reglasQueSalen(guia: Guia, elegidas: Record<string, string>): Regla[] {
  return guia.reglas.filter((r) => !r.cuando || seCumple(r.cuando, elegidas));
}

/**
 * Las tarjetas de conocimiento que son pertinentes con lo declarado.
 *
 * Una tarjeta sin `cuando` sale siempre; una con `cuando` sale si se cumple. Es
 * lo mismo que las reglas y por el mismo motivo: la wiki se estrecha con lo que
 * la persona ha dicho de su equipo.
 */
export function conocimientoVisible(guia: Guia, elegidas: Record<string, string>) {
  return guia.conocimiento.filter((c) => !c.cuando || seCumple(c.cuando, elegidas));
}

/**
 * Cuánta información falta, y qué variables laean.
 *
 * Sirve para dos cosas: para el contador del carril —«2 pasos más y esta guía te
 * dice tu cifra»— y para que las variables necesarias se pidan **antes** que las
 * opcionales. Pedir en el orden de la definición es pedir en el orden en que se
 * escribieron los datos, no en el orden en que aprieta quien lee.
 */
export function pendientes(guia: Guia, elegidas: Record<string, string>): Variable[] {
  return guia.variables.filter((v) => elegidas[v.id] === undefined);
}

/**
 * El orden en que se piden las variables.
 *
 * Las `necesaria` primero, y dentro de cada grupo el orden de declaración. Es lo
 * único que se reordena respecto al fichero, y el motivo es que las necesarias
 * son las que hacen aparecer las reglas: preguntarlas al final deja la pantalla
 * medio vacía durante todo el rato que se lee lo demás.
 */
export function variablesEnOrden(guia: Guia): Variable[] {
  return [
    ...guia.variables.filter((v) => v.necesaria),
    ...guia.variables.filter((v) => !v.necesaria),
  ];
}

/** Las variables obligatorias que faltan. */
export function necesariasQueFaltan(guia: Guia, elegidas: Record<string, string>): Variable[] {
  return guia.variables.filter((v) => v.necesaria && elegidas[v.id] === undefined);
}

/**
 * Qué se puede leer de un G-code para precontestar variables.
 *
 * Es la interconexión entre la herramienta y la wiki: con un archivo cargado, el
 * material y la temperatura de cama ya vienen escritos y quien llega a la guía no
 * los declara a mano.
 *
 * La guía **no inventa** el dato. `bedTemp` sólo se usa si el slicer lo escribió,
 * y si no lo escribió se queda sin contestar: es preferible que la guía pida el
 * dato a que le ponga uno que el panel muestra como «—».
 */
export function precontestar(
  guia: Guia,
  metadata: { material?: string; bedTemp?: number } | null
): Record<string, string> {
  const elegidas: Record<string, string> = {};
  if (!metadata) return elegidas;

  const material = metadata.material?.toLowerCase() ?? '';
  /*
   * El orden importa por dos razones distintas, y las dos han dado un fallo.
   *
   * **Primero, los compuestos antes que el material del que están hechos.** `pla-cf`
   * y `pc` empiezan igual, así que si se probara `pc` antes, un `PLA-CF` acabaría
   * clasificado como policarbonato —el extremo opuesto del ranking de warping— y el
   * diagnóstico daría la recommendation equivocada con total confianza.
   *
   * **Segundo, el valor de la derecha no tiene que ser la aguja.** ASA mapea a `abs`
   * porque la guía de warping declara una sola opción «ABS o ASA»: comparten fila en
   * la tabla de Bambu y ninguna regla puede distinguirlas. La primera versión
   * mapeaba `asa → asa`, que no existía, y el efecto era que un G-code de ASA no
   * precontestaba nada —el peor fallo posible, porque el síntoma es «no pasa nada»
   * en vez de un error visible.
   *
   * La comprobación de que la opción exista está más abajo y es lo que convierte el
   * segundo fallo en un sonido de campana: si una aguja deja de tener destino, el
   * material se cae en vez de clasificarse mal.
   */
  const ORDEN: Array<[string, string]> = [
    ['pla-cf', 'pla-cf'],
    ['petg-cf', 'petg'],
    ['petg', 'petg'],
    ['abs', 'abs'],
    ['asa', 'abs'],
    ['pa6', 'pa'],
    ['pa-cf', 'pa'],
    ['nylon', 'pa'],
    ['pc', 'pc'],
    ['pla', 'pla'],
    ['tpu', 'tpu'],
  ];
  for (const [aguja, valor] of ORDEN) {
    if (!material.includes(aguja)) continue;
    /*
     * La opción tiene que existir **en esta guía**.
     *
     * Sin esta comprobación, una aguja sin destino se come el material en silencio:
     * el bucle `break` ya salió, y quien lee ve una guía sin material marcado y
     * ninguna lista de acciones, sin ningún mensaje que diga por qué. Con el
     * `continue` en vez del `break`, la aguja siguiente puede reconocer el material
     * por otra vía —«ASA-CF» se reconoce como `abs` por `asa`, y si esa opción no
     * existiera, por `pc-cf`— y lo que no se puede es dejar el campo a medias.
     */
    const existe = guia.variables
      .find((v) => v.id === 'material')
      ?.opciones.some((o) => o.id === valor);
    if (existe) elegidas.material = valor;
    break;
  }

  if (metadata.bedTemp !== undefined && metadata.bedTemp >= 60) {
    elegidas.cama = 'alta';
  }

  return elegidas;
}

/** Dónde cae el valor del archivo respecto al intervalo de la fuente. */
export type PosicionValor = 'dentro' | 'por-encima' | 'por-debajo';

/**
 * Compara el valor de un campo del archivo con el intervalo que da la fuente.
 *
 * Es lógica pura y sin React a propósito: la comparación de un número con un
 * intervalo es justo lo que se puede probar en Node, y lo que no conviene dejar
 * escrito a mano en el JSX, donde un `<` cambiado por un `<=` no lo vería nadie.
 *
 * Devuelve `null` cuando el archivo no trae el campo. No es un cero ni un «dentro»:
 * es que no hay nada que comparar, y la página no pinta la comparación. La
 * diferencia es la que separa «tu cama está bien» de «tu slicer no escribió la
 * cama», que son dos cosas distintas.
 */
export function compararValor(
  rango: RangoFuente,
  valor: number | undefined
): { posicion: PosicionValor; diferencia: number } | null {
  if (valor === undefined) return null;
  if (valor < rango.min) return { posicion: 'por-debajo', diferencia: rango.min - valor };
  if (valor > rango.max) return { posicion: 'por-encima', diferencia: valor - rango.max };
  return { posicion: 'dentro', diferencia: 0 };
}