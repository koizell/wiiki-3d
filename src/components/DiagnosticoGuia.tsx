import { reglasQueSalen } from '../lib/guias';
import { useAnalysis } from '../state/useAnalysis';
import { useGuiaEstado } from '../state/useGuia';
import type { Guia } from '../content/guias/tipos';

/**
 * El contador de acciones y el progreso de una guía.
 *
 * ## Por qué es un componente y no dos copias
 *
 * Aparece en dos sitios y los dos tienen que decir **el mismo número**: en el
 * carril, cuando hay sitio a la derecha (escritorio), y dentro de la etapa de
 * variables, cuando no lo hay. En el tramo 768–1199 el carril cae al final de la
 * página —el shell lo apila debajo de la guía—, así que el contador quedaba a
 * miles de píxeles del control que lo provoca. La salida no es un segundo
 * contador escrito aparte, que se desincronizaría: es este, montado dos veces.
 *
 * ## Qué cuenta
 *
 * Las acciones son `reglasQueSalen`, las mismas que pinta la etapa 4, así que el
 * número del contador y la lista de abajo no pueden separarse. Y las variables
 * contestadas salen de `elegidas`, que es el mismo estado que mueve los chips.
 */
export default function DiagnosticoGuia({ guia }: { guia: Guia }) {
  const { elegidas } = useGuiaEstado();
  const { metadata } = useAnalysis();

  const contestadas = guia.variables.filter((v) => elegidas[v.id] !== undefined).length;
  const total = guia.variables.length;
  const acciones = reglasQueSalen(guia, elegidas).length;

  return (
    <>
      <p className="riel-cifra">
        <strong>{acciones}</strong>
        <span>{acciones === 1 ? 'acción' : 'acciones'} aplicables</span>
      </p>
      <div
        className="riel-progreso"
        role="progressbar"
        aria-valuenow={contestadas}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Variables contestadas"
      >
        <span style={{ width: `${total ? (contestadas / total) * 100 : 0}%` }} />
      </div>
      <p className="riel-nota">
        {contestadas === 0
          ? 'Nada marcado todavía. Cada variable que contestes acorta la lista.'
          : `${contestadas} de ${total} variables. ${acciones === 0 ? 'Aún no se puede aplicar nada.' : 'La lista se actualiza sola.'}`}
      </p>
      {metadata?.material && (
        <p className="riel-fuente">
          Material leído de tu archivo: <strong>{metadata.material}</strong>
        </p>
      )}
    </>
  );
}
