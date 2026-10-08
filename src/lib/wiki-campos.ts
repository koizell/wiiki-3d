/**
 * Qué campo del panel de análisis explica cada guía.
 *
 * ## La regla: muchos campos a una guía, nunca al revés
 *
 * **Una guía puede cubrir varios campos.** `warping-pla` cubre `riskLevel` y
 * `warpingRisk`, que son el mismo dato en dos versiones: la categoría y el número.
 * Que el panel enlace desde dos sitios a la misma guía **no es duplicación**, es
 * corrección: quien lee «Alto» y quien lee «35 %» necesitan la misma explicación, y
 * mandarlos a dos páginas distintas sería trocear el mismo tema en dos.
 *
 * **Un campo no puede apuntar a dos guías.** Eso sí es ambiguo, y el panel no sabría
 * a cuál mandar a quien lee. Por eso la tabla es un `Record` y no una lista: una
 * clave repetida con dos slugs sería un error de datos que nadie vería, así que
 * `scripts/verify:wiki` lo comprueba.
 *
 * ## Por qué este fichero existe y no se importa `lib/guias.ts`
 *
 * Porque `lib/guias.ts` importa el contenido entero de las guías. Importarlo desde
 * `AnalysisPanel` metería todas las guías en el chunk inicial: kilobytes de
 * contenido para el visitante que quizá no abra nunca la wiki, y que en el peor
 * caso los pagaría en la pantalla de subida.
 *
 * Y hace falta algo más que el slug: una etiqueta corta para el enlace. Sacar el
 * título de la guía obliga a cargarla.
 *
 * ## Por qué no se desincroniza
 *
 * Porque `scripts/verify:wiki` lo comprueba contra las guías de verdad, en las dos
 * direcciones que importan: que cada campo apunte a una guía que existe y que
 * declara ese `campo`, y que un mismo campo no apunte a dos guías distintas. Es un
 * segundo sitio que puede desfasarse —y lo es— pero es un sitio que falla ruidosamente
 * en lugar de dejar un enlace roto en el panel.
 */

/**
 * Lo que el panel necesita para enlazar a la explicación de un campo.
 *
 * No es sólo a qué guía: es **a qué sección** de esa guía. «Riesgo de warping,
 * 35 %» con un enlace que deja al principio de una guía de tres etapas obliga a
 * buscar a mano la tarjeta que habla de ese 35 %, que es medio enlace.
 */
export interface ArticuloDeCampo {
  slug: string;
  etiqueta: string;
  /**
   * El `id` del elemento que explica el campo dentro de la guía, sin `#`.
   *
   * Es el mismo `id` que `anclasDeCampos` de `lib/tu-archivo.ts` calcula desde la
   * guía, y aquí está **duplicado** por el mismo motivo que el slug: el panel no
   * puede importar las guías sin meterlas en el chunk inicial. La duplicación no
   * se queda suelta: `verify:wiki` compara esta ancla con la que declara la guía,
   * así que renombrar la tarjeta sin tocar el panel falla en vez de dejar un
   * enlace que no salta.
   */
  ancla: string;
}

/**
 * Campo del panel -> guía que lo explica, y sección concreta dentro de ella.
 *
 * Los nombres de la izquierda son los de `ProjectMetadata` y `JevClassification`
 * en `src/services/types.ts`, tal cual. La lista completa está en cada guía, y en
 * `docs/plan-de-contenido.md` está qué guía va con cuál.
 *
 * Sólo hay entradas cuya guía **ya está escrita**. Anotar aquí un slug que todavía no
 * existe no reserva nada: rompe el enlace y hace fallar la verificación.
 */
export const CAMPOS_WIKI: Record<string, ArticuloDeCampo> = {
  material: { slug: 'material', etiqueta: 'Material', ancla: 'v-material' },
  warpingRisk: { slug: 'warping-pla', etiqueta: 'Warping en PLA', ancla: 'c-riesgo' },
  riskLevel: { slug: 'warping-pla', etiqueta: 'Warping en PLA', ancla: 'c-riesgo' },
  bedTemp: { slug: 'temperatura-cama', etiqueta: 'Temperatura de cama', ancla: 'v-material' },
};

/**
 * La guía que explica un campo del panel, o `null` si no hay ninguna.
 *
 * Que devuelva `null` no es un caso raro ni una carencia: es lo que va a pasar con
 * `printTime`, con `filename` y con `needsSupport`, que no tienen guía detrás.
 *
 * Y para los campos **que sí** lo tienen, devuelve guía tanto si el G-code trae el
 * dato como si no lo trae. El panel enlaza siempre, con «—» en el valor o con una
 * cifra: la guía explica el concepto, no esta instancia. Que el slicer de este G-code
 * concreto no escribiera el campo es **una razón más para leerla**.
 */
export function articuloParaCampo(campo: string): ArticuloDeCampo | null {
  return CAMPOS_WIKI[campo] ?? null;
}