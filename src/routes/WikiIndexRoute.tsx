import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { buscarWiki, articulosWiki } from '../lib/wiki';

/**
 * El índice de la wiki, con búsqueda instantánea.
 *
 * ## La búsqueda no recarga, pero sí va en la URL
 *
 * El texto de búsqueda va en `?q=`. Con eso la búsqueda sigue siendo instantánea —
 * es un filtro sobre un array en memoria, no una petición — pero además se puede
 * compartir por enlace, y el botón "atrás" del navegador deshace una búsqueda
 * como deshace cualquier otra cosa. Sin eso, buscar algo y pulsar atrás dejaría al
 * usuario en un estado que no puede volver a encontrar.
 *
 * ## Por qué la lista se pinta aquí y no desde `wiki.ts`
 *
 * Porque la capa de contenido no sabe nada de React. `buscarWiki` devuelve
 * artículos; quién los pinta y con qué criterio es de la vista. Si el filtro
 * estuviera en la librería habría que probarlo con un framework en memoria, que es
 * una forma de acoplar lo que no depende de nada.
 */
export default function WikiIndexRoute() {
  const [params, setParams] = useSearchParams();
  const consulta = params.get('q') ?? '';
  const campo = params.get('campo') ?? '';

  // `useMemo` sobre la cadena de consulta, no sobre el resultado: el filtro es de
  // microsegundos y con diez artículos no lo necesita, pero si mañana hay cien
  // este es el punto donde el coste se vuelve visible.
  const resultados = useMemo(() => {
    const porTexto = buscarWiki(consulta);
    return campo ? porTexto.filter((a) => a.campos.includes(campo)) : porTexto;
  }, [consulta, campo]);

  const total = articulosWiki().length;

  /** Escribe un parámetro sin perder el otro, que es lo que rompe la mitad de las implementaciones. */
  const cambiar = (clave: string, valor: string) => {
    const siguiente = new URLSearchParams(params);
    if (valor) {
      siguiente.set(clave, valor);
    } else {
      siguiente.delete(clave);
    }
    // `replace` y no `push`: teclear en la caja de búsqueda no debería llenar el
    // historial de una entrada por cada letra.
    setParams(siguiente, { replace: true });
  };

  return (
    <div className="wiki-index">
      <h1>Wiki 3D</h1>

      {/*
        El `h1` es el de la vista. El título del módulo ya lo pone la barra
        superior, y `verify:rutas` comprueba que haya exactamente uno visible.
      */}
      <p className="wiki-index-intro">
        Guías de impresión 3D escritas a partir de fuentes reales, y cada artículo
        explica un dato que el panel de análisis ya está mostrando.
      </p>

      <div className="wiki-buscador">
        <label className="wiki-buscador-etiqueta" htmlFor="wiki-buscar">
          Buscar en la wiki
        </label>
        <input
          id="wiki-buscar"
          type="search"
          className="wiki-buscador-campo"
          value={consulta}
          placeholder="warping, cama, relleno…"
          autoComplete="off"
          onChange={(e) => cambiar('q', e.target.value)}
        />
        {/*
          El contador va en una región `polite`, no en un `alert`: cada tecla
          cambiaría el texto y con `alert` un lector de pantalla lo interrumpe. Con
          `polite` espera a que quien está leyendo termine la frase.

          Es también la única forma de que alguien que no ve la lista sepa que la
          búsqueda ha hecho algo, y en una wiki de diez páginas eso pasa en el
          artículo.
        */}
        <p className="wiki-resultados" role="status" aria-live="polite">
          {resultados.length === total
            ? `${total} ${total === 1 ? 'artículo' : 'artículos'}`
            : `${resultados.length} de ${total} artículos`}
        </p>
      </div>

      {/*
        El filtro por campo del parser es lo que hace esta wiki distinta de una
        genérica, y por eso está en la primera pantalla y no escondido en un
        desplegable: es el argumento de por qué existe.

        Sólo salen los campos que algún artículo declara, así que la lista no
        promete páginas que no hay detrás.
      */}
      {camposDisponibles().length > 0 && (
        <div className="wiki-campos">
          <span className="wiki-campos-titulo">Explica un campo del análisis</span>
          <ul>
            {campo ? (
              <li>
                <button type="button" onClick={() => cambiar('campo', '')}>
                  Quitar el filtro
                </button>
              </li>
            ) : (
              camposDisponibles().map((c) => (
                <li key={c}>
                  <button type="button" onClick={() => cambiar('campo', c)}>
                    <code>{c}</code>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {resultados.length === 0 ? (
        <p className="wiki-vacio">
          Ningún artículo coincide con <strong>{consulta}</strong>. Prueba con una
          palabra suelta: «warping», «cama», «relleno».
        </p>
      ) : (
        <ul className="wiki-lista-articulos">
          {resultados.map((a) => (
            <li key={a.slug}>
              <article className="wiki-tarjeta">
                <h2>
                  <Link to={`/wiki/${a.slug}`}>{a.title}</Link>
                </h2>
                {a.description && <p>{a.description}</p>}
                <p className="wiki-tarjeta-pie">
                  {a.campos.length > 0 && (
                    <span className="wiki-tarjeta-campos">
                      explica <code>{a.campos.join(', ')}</code>
                    </span>
                  )}
                  <span className="wiki-tarjeta-fuentes">
                    {a.sources.length} {a.sources.length === 1 ? 'fuente' : 'fuentes'}
                  </span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Los campos del parser que algún artículo declara, sin repetir y en orden.
 *
 * Se calcula en cada render en lugar de memorizarse a nivel de módulo porque son
 * unos pocos artículos y una lista de cinco cadenas: el coste es despreciable y
 * una caché global se desincroniza en cuanto se escribe un artículo sin
 * reiniciar nada.
 */
function camposDisponibles(): string[] {
  const vistos = new Set<string>();
  for (const a of articulosWiki()) {
    for (const c of a.campos) vistos.add(c);
  }
  return [...vistos].sort();
}
