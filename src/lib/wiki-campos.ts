/**
 * Qué campo del panel de análisis explica cada artículo.
 *
 * ## Por qué este fichero existe y no se importa `wiki.ts`
 *
 * Porque `src/lib/wiki.ts` carga el texto entero de los artículos con
 * `import.meta.glob` en modo `eager`. Importarlo desde `AnalysisPanel` metería
 * todos los artículos en el chunk inicial de la aplicación: unos 4 kB gzip con un
 * artículo, unos 37 kB con los diez, y todo eso para el visitante que quizá no
 * abra nunca la wiki.
 *
 * Y hace falta algo más que el slug: una etiqueta corta para el enlace. Sacar el
 * título del artículo obliga a cargarlo.
 *
 * ## Por qué no se desincroniza
 *
 * Porque `scripts/verify/wiki.mjs` lo comprueba contra los artículos de verdad, y
 * una entrada que apunte a un slug inexistente, o a un artículo que no declara ese
 * `campo` en su frontmatter, hace fallar la comprobación. Es un segundo sitio que
 * puede desfasarse —y lo es— pero es un sitio que falla ruidosamente en lugar de
 * dejar un enlace roto en el panel.
 *
 * La otra forma de resolverlo era un `import()` dinámico al renderizar: cero coste
 * y ninguna fuente duplicada, a cambio de que el enlace apareciera un fotograma
 * después de pintarse el panel. Un enlace que aparece tarde es un enlace que
 * parece un error, y en el panel de análisis la duda se lee como «el análisis va
 * mal».
 */

/**
 * Campo del panel -> artículo que lo explica.
 *
 * Los nombres de la izquierda son los de `ProjectMetadata` y `JevClassification`
 * en `src/services/types.ts`, tal cual. `riskLevel` y `warpingRisk` apuntan al
 * mismo artículo porque son el mismo dato dicho de dos maneras: el uno es la
 * categoría y el otro el número.
 *
 * Sólo hay entradas cuyo artículo **ya está escrito**. Anotar aquí un slug que
 * todavía no existe no reserva nada: rompe el enlace y hace fallar la verificación.
 */
export const CAMPOS_WIKI: Record<string, { slug: string; etiqueta: string }> = {
  warpingRisk: { slug: 'warping-pla', etiqueta: 'Warping en PLA' },
  riskLevel: { slug: 'warping-pla', etiqueta: 'Warping en PLA' },
};

/** El artículo que explica un campo del panel, o `null` si no hay ninguno. */
export function articuloParaCampo(campo: string): { slug: string; etiqueta: string } | null {
  return CAMPOS_WIKI[campo] ?? null;
}
