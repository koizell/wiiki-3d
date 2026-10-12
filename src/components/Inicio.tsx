import { Link } from 'react-router-dom';
import DibujoSintoma from './DibujoSintoma';
import { GUIAS, guiaPorSlug } from '../lib/guias';
import type { Guia } from '../content/guias/tipos';

/**
 * Lo que hay en el inicio además de la zona de subida.
 *
 * ## El problema que tenía este componente, y que no era de contenido
 *
 * El texto de aquí es bueno y llevaba meses escrito. El fallo era **dónde se
 * montaba**: esta pieza la pinta la aplicación, así que sólo existía cuando React
 * arrancaba. El HTML que se servía —el que lee un buscador, el que lee un revisor y
 * el que lee cualquiera con JavaScript apagado— no la tenía: tenía 44 palabras y un
 * aviso de que hacía falta JavaScript.
 *
 * Y al revés también estaba mal: cuando se exportó una portada estática propia, el
 * navegador la pintaba y **la sustituía** al montar React, porque el árbol del
 * cliente seguía siendo el de antes. Dos portadas distintas para la misma URL, con
 * un intercambio visible en medio.
 *
 * La salida es una sola portada con dos modos:
 *
 * - `interactivo` (por defecto): lo que monta la aplicación. Añade la zona de
 *   subida, que es lo único que necesita estado.
 * - sin él: lo que se exporta a `dist/index.html`. El mismo texto, sin controles
 *   que no pueden funcionar sin JavaScript.
 *
 * El contenido informativo —la tabla, los pasos, los problemas y las preguntas— está
 * en los dos. No es duplicación: es la misma pieza renderizada dos veces, que es lo
 * que hace el resto del sitio con las guías.
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

/** De dónde salen los rangos de la tabla. */
const FUENTES_TABLA = {
  cama: 'la tabla de filamentos de Bambu Lab',
  boquilla: 'la tabla de filamentos de Bambu Lab y la guía de material de Prusa',
} as const;

/** Una fila de la tabla de referencia. */
interface FilaTemperatura {
  material: string;
  cama: string | null;
  boquilla: string | null;
}

/**
 * Los materiales de la tabla, en el orden en que se leen.
 *
 * El orden no es alfabético ni el de ninguna guía: es de más a menos frecuente, que
 * es como se busca. `abs` cubre ABS y ASA porque la guía de cama declara una sola
 * opción «ABS o ASA» —comparten fila en la tabla del fabricante y ninguna regla
 * puede distinguirlas—, y aquí se respeta esa decisión en vez de inventar una
 * separación que el dato no tiene.
 */
const MATERIALES: { fila: string; cama: string[]; boquilla: string[] }[] = [
  { fila: 'PLA', cama: ['pla'], boquilla: ['pla'] },
  { fila: 'PETG', cama: ['petg'], boquilla: ['petg'] },
  { fila: 'ABS / ASA', cama: ['abs'], boquilla: ['abs', 'asa'] },
  { fila: 'TPU', cama: ['tpu'], boquilla: ['tpu'] },
  { fila: 'PC', cama: ['pc'], boquilla: ['pc'] },
  { fila: 'PA (nylon)', cama: ['pa'], boquilla: ['pa'] },
];

/**
 * Los rangos de temperatura por material, leídos de las guías.
 *
 * Las cifras **no se teclean aquí**: salen del detalle de las opciones de
 * `temperatura-cama` y de `temperatura-hotend`, que son las que ya pasaron revisión
 * contra `wiki/raw/`. Es la diferencia entre una tabla que se desincroniza del
 * contenido en cuanto alguien corrige un número y una que no puede: si la guía
 * cambia, la tabla cambia. `verify:seo` comprueba que cada celda siga apareciendo en
 * su guía, así que una divergencia rompe la batería en vez de publicarse.
 *
 * Devuelve `null` en una celda cuando la guía no declara ese material para ese eje.
 * Una celda vacía es información: dice que ese dato no está cubierto, y es preferible
 * a rellenarla con una cifra que nadie ha verificado.
 */
function temperaturasDeReferencia(): FilaTemperatura[] {
  const cama = guiaPorSlug('temperatura-cama');
  const boquilla = guiaPorSlug('temperatura-hotend');

  const detalle = (guia: Guia | null, variableId: string, opcionId: string): string | null =>
    guia?.variables.find((v) => v.id === variableId)?.opciones.find((o) => o.id === opcionId)
      ?.detalle ?? null;

  return MATERIALES.map(({ fila, cama: idsCama, boquilla: idsBoquilla }) => ({
    material: fila,
    cama: idsCama.map((id) => detalle(cama, 'material', id)).find((d) => d) ?? null,
    boquilla: idsBoquilla.map((id) => detalle(boquilla, 'material', id)).find((d) => d) ?? null,
  }));
}

/**
 * Las preguntas frecuentes de la portada.
 *
 * Seis, y cada una responde algo que la aplicación **hace** y que no se puede
 * deducir de una captura. Sin `FAQPage` en JSON-LD todavía: el marcado de preguntas
 * frecuentes sólo se gana si el texto de la página es el mismo que el del esquema, y
 * aquí se prefiere publicar el texto primero y añadir el esquema cuando haya datos de
 * que Google lo está usando. Un esquema que no coincide con la página es peor que no
 * tenerlo.
 */
const PREGUNTAS: { pregunta: string; respuesta: React.ReactNode }[] = [
  {
    pregunta: '¿Qué formatos puedo subir?',
    respuesta: (
      <>
        G-code de Cura, PrusaSlicer, OrcaSlicer y Bambu Studio, y también STL y 3MF
        para verlos en 3D. De un G-code se leen los metadatos que el slicer ya
        escribió dentro: material, temperaturas, altura de capa, gramos y tiempo.
      </>
    ),
  },
  {
    pregunta: '¿Se sube mi archivo a algún servidor?',
    respuesta: (
      <>
        El archivo se abre <strong>en tu navegador</strong> y no se envía para
        guardarlo. Lo único que sale de tu equipo, cuando el diagnóstico está
        configurado, son los metadatos de impresión —y el nombre del archivo, que
        forma parte de ellos—. Está detallado en la{' '}
        <Link to="/privacidad">política de privacidad</Link>.
      </>
    ),
  },
  {
    pregunta: '¿De dónde salen las cifras de las guías?',
    respuesta: (
      <>
        De las fichas y los foros de los fabricantes: Prusa, Bambu Lab y OrcaSlicer.
        Cada guía lleva al final su lista de fuentes y cada acción dice de cuál sale.
        Cuando dos fabricantes se contradicen, la guía enseña la contradicción en vez
        de elegir una y callar la otra.
      </>
    ),
  },
  {
    pregunta: '¿Por qué una guía me pide datos de mi montaje?',
    respuesta: (
      <>
        Porque la cifra que sirve no es la general, es la tuya. La temperatura de cama
        de un PLA cambia según la chapa que uses, y la de boquilla según el fabricante
        del filamento. Al declarar tu montaje, las tarjetas que no aplican desaparecen
        y la lista de acciones sale con tu número.
      </>
    ),
  },
  {
    pregunta: '¿Sirve si no tengo un G-code a mano?',
    respuesta: (
      <>
        Sí. Todas las guías se leen sin subir nada, y sin JavaScript: el diagnóstico
        interactivo y el taller son lo que necesita el navegador. La calculadora de
        coste sí necesita los gramos, y ésos salen del G-code.
      </>
    ),
  },
  {
    pregunta: '¿Qué no hace wiiki-3d?',
    respuesta: (
      <>
        No laminar, no predecir si una pieza va a fallar antes de imprimirla y no
        decirte qué ajustar sin saber nada de tu montaje. Cada guía termina con un
        apartado de lo que <strong>no</strong> resuelve, y decirlo es lo que hace
        creíble el resto.
      </>
    ),
  },
];

/**
 * El inicio entero: los síntomas, la tabla, cómo funciona y las preguntas.
 *
 * @param interactivo Si hay navegador. Quita la zona de subida y el enlace que
 *   necesita estado, y deja el resto —que es la mayor parte— igual.
 */
export default function Inicio({ interactivo = true }: { interactivo?: boolean }) {
  const destacadas = DESTACADAS.map((slug) => guiaPorSlug(slug)).filter(
    (g): g is Guia => g !== null
  );
  const filas = temperaturasDeReferencia();

  return (
    <>
      {/*
        La cabecera va en los dos modos, y es lo que arregla dos cosas a la vez: el
        HTML exportado tenía **cero** `<h1>` —empezaba por la tabla— y el titular es
        lo primero que tiene que leer quien llega. Es texto y no necesita estado, así
        que no hay motivo para que el navegador lo tenga y el rastreador no.
      */}
      <header className="inicio-hero">
        <h1>¿Va a salir bien tu impresión?</h1>
        <p>
          Sube el archivo que exportó tu slicer y wiiki-3d lee lo que ya está escrito
          dentro —material, temperaturas, gramos, tiempo— antes de que gastes
          filamento. Y si la pieza sale mal, aquí está el porqué.
        </p>
        <p>
          Alrededor del analizador hay una wiki de {GUIAS.length} guías escritas por
          síntoma: cada una empieza confirmando que el problema es el que crees, sigue
          con lo que hace falta saber de tu montaje y termina con las acciones que
          puedes aplicar, cada una con la fuente de donde sale.
        </p>
        {!interactivo ? (
          <p className="inicio-estatico-aviso">
            El analizador y el taller necesitan JavaScript. Esta página y las guías no:
            se leen enteras sin él, y la tabla de abajo viene con su fuente.
          </p>
        ) : null}
      </header>

      {interactivo ? (
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
      ) : null}

      <section className="inicio-referencia" aria-labelledby="inicio-referencia-titulo">
        <h2 id="inicio-referencia-titulo">Temperaturas por material</h2>
        <p className="inicio-referencia-intro">
          Los dos números que más se buscan, por familia de filamento. Son los mismos
          que usan las guías de <Link to="/wiki/temperatura-cama">temperatura de cama</Link> y
          de <Link to="/wiki/temperatura-hotend">temperatura de boquilla</Link>, donde
          están las fuentes y el matiz de cada uno.
        </p>
        <div className="tabla-scroll">
          <table className="tabla-referencia">
            <caption>
              Rangos publicados por el fabricante. La cama depende además de la chapa:
              en PLA, una Cool Plate trabaja a 35–45 °C y una Textured PEI a 45–65 °C.
            </caption>
            <thead>
              <tr>
                <th scope="col">Filamento</th>
                <th scope="col">Cama</th>
                <th scope="col">Boquilla</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.material}>
                  <th scope="row">{f.material}</th>
                  <td>{f.cama ?? <span className="tabla-sin-dato">sin dato</span>}</td>
                  <td>{f.boquilla ?? <span className="tabla-sin-dato">sin dato</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tabla-fuente">
          Fuente: {FUENTES_TABLA.cama} para la columna de cama, y {FUENTES_TABLA.boquilla}{' '}
          para la de boquilla. Las cifras salen de las guías enlazadas, no se copian:
          si una guía corrige un rango, esta tabla lo corrige con ella.
        </p>
      </section>

      <section className="inicio-pasos" aria-labelledby="inicio-pasos-titulo">
        <h2 id="inicio-pasos-titulo">Qué hace el analizador</h2>
        <ol className="inicio-pasos-lista">
          <li>
            <h3>Lee el archivo</h3>
            <p>
              Abre el G-code en tu navegador y extrae lo que el slicer escribió:
              material, temperaturas de cama y boquilla, altura de capa, gramos y tiempo
              estimado.
            </p>
          </li>
          <li>
            <h3>Dice qué le falta</h3>
            <p>
              Un campo que el slicer no escribió sale como «—» y no como un cero. La
              diferencia importa: un cero es un valor y una ausencia es una pregunta que
              hay que contestar a mano.
            </p>
          </li>
          <li>
            <h3>Estima el riesgo</h3>
            <p>
              Con esos datos calcula el riesgo de warping y de voladizos problemáticos, y
              te dice qué campo del archivo ha pesado en cada caso.
            </p>
          </li>
          <li>
            <h3>Te lleva a la guía</h3>
            <p>
              Cada dato del panel enlaza a la guía que lo explica, y allí lo declaras
              para que la lista de acciones salga con tu cifra en vez de con la del
              fabricante.
            </p>
          </li>
        </ol>
      </section>

      <section className="inicio-problemas" aria-labelledby="inicio-problemas-titulo">
        <h2 id="inicio-problemas-titulo">Los {GUIAS.length} problemas cubiertos</h2>
        <p className="inicio-problemas-intro">
          Cada guía se abre por lo que ves en la pieza, no por el nombre de un ajuste.
          Si no sabes cuál es el tuyo, empieza por el síntoma.
        </p>
        <ul className="inicio-problemas-lista">
          {GUIAS.map((g) => (
            <li key={g.slug}>
              <Link to={`/wiki/${g.slug}`}>
                <strong>{g.sintoma}</strong>
                <span>{g.resumen}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="inicio-preguntas" aria-labelledby="inicio-preguntas-titulo">
        <h2 id="inicio-preguntas-titulo">Preguntas frecuentes</h2>
        <dl className="inicio-preguntas-lista">
          {PREGUNTAS.map((p) => (
            <div className="inicio-pregunta" key={p.pregunta}>
              <dt>{p.pregunta}</dt>
              <dd>{p.respuesta}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="inicio-cierre" aria-labelledby="inicio-cierre-titulo">
        <h2 id="inicio-cierre-titulo">Por dónde empezar</h2>
        <p>
          Si ya tienes el G-code, súbelo y el panel te dice qué lleva dentro. Si lo que
          tienes es una pieza mal impresa, ve al <Link to="/wiki">índice de síntomas</Link>.
          Y si lo que quieres saber es cuánto te cuesta esa pieza en filamento, el{' '}
          <Link to="/taller">taller</Link> lo calcula con los gramos del propio archivo y
          el precio que teclees tú.
        </p>
      </section>

      {/*
        Los tres módulos, y sólo en el navegador.
        
        Aquí sí hay una razón para que sea interactivo: el enlace a `/historial` sólo
        tiene sentido si el historial puede leerse, y el de `/taller` si la calculadora
        puede calcular. En el HTML exportado se enlazan desde el cierre de arriba, que
        dice lo mismo con menos promesa.
      */}
      {interactivo ? (
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
      ) : null}
    </>
  );
}
