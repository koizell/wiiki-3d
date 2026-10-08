import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DibujoSintoma from '../components/DibujoSintoma';
import { GUIAS } from '../lib/guias';
import { useAnalysis } from '../state/useAnalysis';
import type { Guia } from '../content/guias/tipos';

/**
 * El índice de la wiki, y ya no es un índice: es la pregunta de entrada.
 *
 * ## Por qué el índice son síntomas y no títulos
 *
 * Antes aquí había cuatro tarjetas con el título del artículo y un párrafo de
 * descripción, en orden alfabético. Eso obliga a quien llega con un problema en la
 * pieza a leer cuatro párrafos densos para averiguar cuál de los cuatro es el suyo,
 * y el orden alfabético no dice nada: «Adhesión», «Separaciones», «Temperatura»,
 * «Warping» son las cuatro primeras letras del español, no un orden de frecuencia.
 *
 * La tarjeta es **lo que se ve**, escrito como quien lo describe, y el título del
 * artículo se queda pequeño debajo. «Las esquinas se levantan de la cama» localiza
 * en un segundo a quien tiene warping; «Warping en PLA: por qué se levantan las
 * esquinas y qué cambiar» le pide que sepa lo que es el warping antes de empezar.
 *
 * Y el dibujo no es adorno: es el mismo esquema que aparece dentro de la guía, así
 * que quien reconoce su pieza en la tarjeta llega a la guía con el diagnóstico ya
 * hecho. La imagen es parte del argumento.
 *
 * ## El buscador
 *
 * Sigue funcionando, pero sobre lo que la tarjeta muestra —el síntoma, el resumen,
 * el material— y no sobre el texto de un artículo que ya no existe. Busca
 * problemas, no páginas.
 */
export default function WikiIndexRoute() {
  const [params, setParams] = useSearchParams();
  const consulta = params.get('q') ?? '';
  const resultados = useMemo(() => {
    const limpio = consulta.trim().toLowerCase();
    if (!limpio) return GUIAS;
    const palabras = limpio.split(/\s+/).filter(Boolean);
    return GUIAS.filter((g) => {
      const heno = [g.sintoma, g.titulo, g.resumen, g.diferencial.contra, ...g.campos ?? []]
        .join(' ')
        .toLowerCase();
      return palabras.every((p) => heno.includes(p));
    });
  }, [consulta]);

  const cambiar = (valor: string) => {
    const siguiente = new URLSearchParams(params);
    if (valor) siguiente.set('q', valor);
    else siguiente.delete('q');
    setParams(siguiente, { replace: true });
  };

  return (
    <div className="wiki-index">
      <h1>¿Qué le pasa a tu pieza?</h1>
      <p className="wiki-index-intro">
        Cada guía empieza por confirmar que el problema es el que crees, sigue con lo
        que hace falta saber y termina con las acciones que se pueden aplicar a tu
        montaje. Las cifras y cada acción llevan su fuente.
      </p>

      <div className="wiki-buscador">
        <label className="wiki-buscador-etiqueta" htmlFor="wiki-buscar">
          Buscar un problema
        </label>
        <input
          id="wiki-buscar"
          type="search"
          className="wiki-buscador-campo"
          value={consulta}
          placeholder="esquinas, capas, cama, primera capa…"
          autoComplete="off"
          onChange={(e) => cambiar(e.target.value)}
        />
        <p className="wiki-resultados" role="status" aria-live="polite">
          {resultados.length === GUIAS.length
            ? `${GUIAS.length} ${GUIAS.length === 1 ? 'problema cubierto' : 'problemas cubiertos'}`
            : `${resultados.length} de ${GUIAS.length}`}
        </p>
      </div>

      {resultados.length === 0 ? (
        <p className="wiki-vacio">
          Ninguna guía coincide con <strong>{consulta}</strong>. Prueba con una palabra
          suelta: «esquinas», «capas», «cama».
        </p>
      ) : (
        <ul className="wiki-sintomas">
          {resultados.map((g, i) => (
            <li key={g.slug} style={{ '--i': i } as React.CSSProperties}>
              <TarjetaSintoma guia={g} />
            </li>
          ))}
        </ul>
      )}

      {resultados.length > 1 && (
        <section className="wiki-encuentre">
          <h2>¿No sabes cuál es?</h2>
          <p>
            El warping y la separación entre capas se parecen en la foto y no se
            arreglan con lo mismo. Cada guía empieza por hacerte tres preguntas que
            los distinguen, y si la respuesta es que no, te lleva a la otra.
          </p>
        </section>
      )}
    </div>
  );
}

/**
 * Una tarjeta de síntoma.
 *
 * El `Link` envuelve **todo**, y eso es lo que la hace una tarjeta y no tres
 * textos juntos: el área pulsable es la entera, con el mismo motivo por el que la
 * zona de subida es un `label` grande y no un botón con un icono al lado. Con
 * `hover` y `focus-visible` sobre el mismo enlace, el foco visible del teclado y el
 * ratón pasan por la misma forma.
 */
function TarjetaSintoma({ guia }: { guia: Guia }) {
  const { metadata } = useAnalysis();
  /*
   * El badge de material es la interconexión con el analizador: si hay un G-code
   * cargado, la tarjeta dice «PLA» sin que nadie lo escriba, porque es el material
   * que el panel acaba de leer del archivo.
   */
  const material = metadata?.material;

  return (
    <Link className="sintoma" to={`/wiki/${guia.slug}`}>
      <div className="sintoma-dibujo">
        <DibujoSintoma dibujo={guia.dibujo} grande />
      </div>
      <div className="sintoma-texto">
        <h2 className="sintoma-titulo">{guia.sintoma}</h2>
        <p className="sintoma-guia">{guia.titulo}</p>
        <p className="sintoma-resumen">{guia.resumen}</p>
        <p className="sintoma-pie">
          <span className="insignia">{guia.minutos} min</span>
          {material && <span className="insignia insignia--acento">{material}</span>}
          <span className="sintoma-flecha" aria-hidden="true">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
