/**
 * Qué campo del panel de análisis explica cada artículo.
 *
 * ## La regla: muchos campos a un artículo, nunca al revés
 *
 * **Un artículo puede cubrir varios campos.** `warping-pla` cubre `riskLevel` y
 * `warpingRisk`, que son el mismo dato en dos versiones: la categoría y el número.
 * Que el panel enlace desde dos sitios al mismo artículo **no es duplicación**, es
 * corrección: quien lee «Alto» y quien lee «35 %» necesitan la misma explicación, y
 * mandarlos a dos páginas distintas sería trocear el mismo tema en dos páginas.
 *
 * **Un campo no puede apuntar a dos artículos.** Eso sí es ambiguo, y el panel no
 * sabría a cuál mandar a quien lee. Por eso la tabla es un `Record` y no una lista:
 * una clave repetida con dos slugs sería un error de datos que nadie vería, así que
 * `scripts/verify/wiki.mjs` lo comprueba.
 *
 * ## Por qué este fichero existe y no se importa `wiki.ts`
 *
 * Porque `src/lib/wiki.ts` carga el texto entero de los artículos con
 * `import.meta.glob` en modo `eager`. Importarlo desde `AnalysisPanel` metería todos
 * los artículos en el chunk inicial: unos 5 kB gzip con el de ahora, y unos 53 kB
 * con los diez. Todo eso para el visitante que quizá no abra nunca la wiki.
 *
 * Y hace falta algo más que el slug: una etiqueta corta para el enlace. Sacar el
 * título del artículo obliga a cargarlo.
 *
 * ## Por qué no se desincroniza
 *
 * Porque `scripts/verify/wiki.mjs` lo comprueba contra los artículos de verdad, en
 * las dos direcciones que importan: que cada campo apunte a un artículo que existe
 * y que declara ese `campo`, y que un mismo campo no apunte a dos artículos
 * distintos. Es un segundo sitio que puede desfasarse —y lo es— pero es un sitio
 * que falla ruidosamente en lugar de dejar un enlace roto en el panel.
 */

/**
 * Campo del panel -> artículo que lo explica.
 *
 * Los nombres de la izquierda son los de `ProjectMetadata` y `JevClassification`
 * en `src/services/types.ts`, tal cual. La lista completa está en el frontmatter de
 * cada artículo, y en `docs/plan-de-contenido.md` está qué artículo va con cuál.
 *
 * Sólo hay entradas cuyo artículo **ya está escrito**. Anotar aquí un slug que
 * todavía no existe no reserva nada: rompe el enlace y hace fallar la verificación.
 */
export const CAMPOS_WIKI: Record<string, { slug: string; etiqueta: string }> = {
  warpingRisk: { slug: 'warping-pla', etiqueta: 'Warping en PLA' },
  riskLevel: { slug: 'warping-pla', etiqueta: 'Warping en PLA' },
};

/**
 * El artículo que explica un campo del panel, o `null` si no hay ninguno.
 *
 * Que devuelva `null` no es un caso raro ni una carencia: es lo que va a pasar con
 * `printTime`, con `filename` y con `needsSupport`, que no tienen artículo detrás.
 *
 * Y para los campos **que sí** lo tienen, devuelve artículo tanto si el G-code trae
 * el dato como si no lo trae. El panel enlaza siempre, con «—» en el valor o con
 * una cifra: el artículo explica el concepto, no esta instancia. Que el slicer de
 * este G-code concreto no escribiera el campo es **una razón más para leerlo**,
 * porque es justo lo que la sección «Por qué tu slicer puede no escribir este
 * dato» viene a contestar.
 */
export function articuloParaCampo(campo: string): { slug: string; etiqueta: string } | null {
  return CAMPOS_WIKI[campo] ?? null;
}
