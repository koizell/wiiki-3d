import { Link } from 'react-router-dom';
import DibujoSintoma from './DibujoSintoma';
import { GUIAS, guiaPorSlug } from '../lib/guias';
import type { Guia } from '../content/guias/tipos';

/**
 * Lo que hay en el inicio además de la zona de subida.
 *
 * ## Por qué existe
 *
 * La raíz `/` es la pantalla de subida, y lo sigue siendo: los cuatro scripts de
 * `scripts/verify/` cargan el fichero sobre `/`. Pero durante mucho tiempo eso era
 * **todo** lo que había: sin historial, `Recientes` devuelve `null` y la pantalla
 * quedaba reducida a la caja de arrastrar. Quien llegaba por primera vez —o una
 * revisión de contenido— veía una caja de subir archivos y nada más, cuando el
 * sitio tiene nueve guías, una calculadora y un historial.
 *
 * Esto pone alrededor de la subida lo que ya existe y no se veía: el síntoma como
 * puerta de entrada a la wiki y los tres destinos que no son la subida.
 *
 * ## Por qué reutiliza `GUIAS` y no una copia
 *
 * Porque `RielWiki` —el carril de la columna derecha— ya importa `lib/guias` de
 * forma estática, así que el contenido de las guías **ya está en el chunk de
 * entrada**. Importarlo aquí no añade peso que no estuviera ya, y una copia a mano
 * de los tres síntomas se desincronizaría del texto de la guía en cuanto alguien
 * lo cambiara. El dibujo es el mismo componente que usa el índice: el que reconoce
 * su pieza en la tarjeta llega a la guía con el diagnóstico empezado.
 */

/**
 * Los tres síntomas que se reconocen mirando la pieza, y no leyendo.
 *
 * Es una lista corta y elegida, no las tres primeras de `GUIAS`. El orden de
 * `GUIAS` es el del índice de la wiki, que empieza por la guía más general; para
 * la puerta de entrada valen más los tres defectos que alguien describe con sus
 * palabras. Los tres existen, y el que no existiera se cae de la lista en vez de
 * dejar un enlace roto.
 */
const DESTACADAS = ['warping-pla', 'adhesion-primera-capa', 'separaciones-entre-capas'];

export default function Inicio() {
  const destacadas = DESTACADAS.map((slug) => guiaPorSlug(slug)).filter(
    (g): g is Guia => g !== null
  );

  return (
    <>
      <section className="inicio-sintomas" aria-labelledby="inicio-sintomas-titulo">
        <h2 id="inicio-sintomas-titulo">¿Algo salió mal en la pieza?</h2>
        <p className="inicio-sintomas-intro">
          Cada guía empieza por confirmar que el problema es el que crees, sigue con
          lo que hace falta saber de tu montaje y termina con las acciones que puedes
          aplicar. Cada cifra lleva su fuente.
        </p>
        <ul className="inicio-sintomas-lista">
          {destacadas.map((g) => (
            <li key={g.slug}>
              <Link className="inicio-sintoma" to={`/wiki/${g.slug}`}>
                <span className="inicio-sintoma-dibujo">
                  <DibujoSintoma dibujo={g.dibujo} className="dibujo" />
                </span>
                <span className="inicio-sintoma-texto">
                  <span className="inicio-sintoma-sintoma">{g.sintoma}</span>
                  <span className="inicio-sintoma-flecha" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="inicio-sintomas-enlace" to="/wiki">
          Ver los {GUIAS.length} problemas cubiertos
        </Link>
      </section>

      <section className="inicio-modulos" aria-labelledby="inicio-modulos-titulo">
        <h2 id="inicio-modulos-titulo">Qué más puedes hacer</h2>
        <ul className="inicio-modulos-lista">
          <li>
            <Link className="inicio-modulo" to="/taller">
              <span className="inicio-modulo-titulo">Taller</span>
              <span className="inicio-modulo-detalle">
                Calcula el coste de filamento de una pieza con los gramos que ya trae
                tu G-code.
              </span>
            </Link>
          </li>
          <li>
            <Link className="inicio-modulo" to="/wiki">
              <span className="inicio-modulo-titulo">Wiki 3D</span>
              <span className="inicio-modulo-detalle">
                {GUIAS.length} guías por síntoma, con la fuente de cada cifra y las
                contradicciones entre fabricantes declaradas.
              </span>
            </Link>
          </li>
          <li>
            <Link className="inicio-modulo" to="/historial">
              <span className="inicio-modulo-titulo">Historial</span>
              <span className="inicio-modulo-detalle">
                Vuelve a consultar los análisis que ya has hecho, sin subir el archivo
                otra vez.
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
