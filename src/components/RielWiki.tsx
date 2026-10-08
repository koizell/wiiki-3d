import { Link, useParams } from 'react-router-dom';
import { GUIAS, reglasQueSalen, variablesEnOrden } from '../lib/guias';
import { useAnalysis } from '../state/useAnalysis';
import { useGuiaEstado } from '../state/useGuia';

/**
 * El carril derecho de las rutas de la wiki.
 *
 * ## Qué sustituye y por qué
 *
 * Antes, `/wiki`, `/taller` y las tres páginas de información tenían a su derecha
 * una columna de 320 px con la frase «Sube un archivo para ver el análisis técnico
 * automático». Eso es media pantalla en un portátil y nunca tenía contenido ahí:
 * el panel de análisis sólo pinta datos cuando hay un G-code cargado.
 *
 * Dos salidas, y se eligió la segunda por lo que cuesta la primera:
 *
 * 1. **Ocultar la columna cuando no hay análisis.** Barata, pero el grid cambia de
 *    ancho al entrar en la wiki y al volver, y eso se nota como un tirón. Además
 *    el hueco que aparece está vacío, que es el problema original con menos superficie.
 * 2. **Poner algo ahí que sirva en esas rutas.** En la wiki lo hay: las respuestas
 *    que ha dado, cuántas acciones se han desbloqueado, y la salida a la guía que
 *    toca. Es la interconexión del sitio hecha columna.
 *
 * Y en las rutas donde no hay nada que poner —`/taller`, `/contacto`, `/privacidad`—
 * la columna no se oculta: se queda con la navegación de las guías, que siempre sirve.
 *
 * ## Por qué lee el estado global y no props
 *
 * Porque el carril se monta en el shell y la guía es una ruta. Pasarle el estado
 * por props obligaría a que el shell conociera el interior de la guía; con un
 * contexto pequeño, el shell pinta el carril y la guía escribe en él, y los dos no
 * saben del otro más allá de este fichero.
 */
export default function RielWiki() {
  const { slug } = useParams();
  const guia = GUIAS.find((g) => g.slug === slug) ?? null;
  const { elegidas } = useGuiaEstado();
  const { metadata } = useAnalysis();

  const enGuia = guia !== null;
  const contestadas = enGuia ? guia.variables.filter((v) => elegidas[v.id] !== undefined).length : 0;
  const total = enGuia ? guia.variables.length : 0;
  const acciones = enGuia ? reglasQueSalen(guia, elegidas).length : 0;

  const otras = GUIAS.filter((g) => g.slug !== slug);

  return (
    <div className="riel">
      <section className="riel-bloque">
        <h2 className="riel-titulo">{enGuia ? 'Tu diagnóstico' : 'La wiki'}</h2>

        {enGuia ? (
          <>
            <p className="riel-cifra">
              <strong>{acciones}</strong>
              <span>
                {acciones === 1 ? 'acción' : 'acciones'} aplicables
              </span>
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
        ) : (
          <p className="riel-nota">
            Cada guía se abre por el síntoma que ves en la pieza y se cierra con las
            acciones que aplican a tu montaje, no con un artículo largo.
          </p>
        )}
      </section>

      <section className="riel-bloque">
        <h3 className="riel-subtitulo">
          {enGuia ? 'Otras guías' : 'Guía'}
        </h3>
        <ul className="riel-lista">
          {(enGuia ? otras : GUIAS).map((g) => (
            <li key={g.slug}>
              <Link
                className={`riel-enlace${g.slug === slug ? ' riel-enlace--activa' : ''}`}
                to={`/wiki/${g.slug}`}
              >
                <span className="riel-enlace-sintoma">{g.sintoma}</span>
                <span className="riel-enlace-titulo">{g.titulo}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {enGuia && Object.keys(elegidas).length > 0 && (
        <section className="riel-bloque">
          <h3 className="riel-subtitulo">Lo que se está filtrando</h3>
          <ul className="riel-variables">
            {variablesEnOrden(guia)
              .filter((v) => elegidas[v.id] !== undefined)
              .map((v) => (
                <li key={v.id}>
                  <span className="riel-var-nombre">{v.etiqueta}</span>
                  <span className="riel-var-valor">
                    {v.opciones.find((o) => o.id === elegidas[v.id])?.etiqueta}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}