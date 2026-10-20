import type { ReactNode } from 'react';
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
 * Los doce problemas que se enseñan con dibujo en la portada.
 *
 * Es una lista corta y **elegida**, no un recorte de `GUIAS`: se quedan los que
 * se reconocen mirando la pieza y los que, entre ellos, cubren los once
 * esquemas que el sitio sabe dibujar —esquinas, primera capa, grieta, boquilla,
 * chapa, voladizo, cámara, colapso, rugosidad, capas y corte en capas—, para que
 * la cuadrícula se lea como un juego de dibujos y no como la misma foto doce
 * veces.
 *
 * Los tres que estaban antes (`warping-pla`, `adhesion-primera-capa` y
 * `separaciones-entre-capas`) siguen dentro, y en el mismo sitio: son los tres
 * que más se buscan.
 */
const DESTACADAS = [
  'warping-pla',
  'adhesion-primera-capa',
  'stringing',
  'separaciones-entre-capas',
  'elephant-foot',
  'temperatura-cama',
  'voladizos-y-soportes',
  'enclosure-y-warping',
  'despegue-a-mitad',
  'material',
  'capas-desplazadas',
  'agujeros-ovalados',
] as const;

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
        El archivo se abre <strong>en tu navegador</strong>. Lo único que sale de tu
        equipo, cuando el diagnóstico está configurado, son los metadatos de
        impresión —y el nombre del archivo, que forma parte de ellos—. Está en la{' '}
        <Link to="/privacidad">política de privacidad</Link>.
      </>
    ),
  },
  {
    pregunta: '¿De dónde salen las cifras de las guías?',
    respuesta: (
      <>
        De las fichas y los foros de Prusa, Bambu Lab y OrcaSlicer. Cada guía lleva su
        lista de fuentes, y cuando dos fabricantes se contradicen, la guía enseña la
        contradicción en vez de elegir una y callar la otra.
      </>
    ),
  },
  {
    pregunta: '¿Por qué una guía me pide datos de mi montaje?',
    respuesta: (
      <>
        Porque la cifra que sirve no es la general, es la tuya. La temperatura de cama
        de un PLA cambia según la chapa que uses. Al declarar tu montaje, la lista de
        acciones sale con tu número y no con el del fabricante.
      </>
    ),
  },
  {
    pregunta: '¿Qué no hace wiiki-3d?',
    respuesta: (
      <>
        No laminar, no predecir si una pieza va a fallar antes de imprimirla y no
        decirte qué ajustar sin saber nada de tu montaje. Cada guía termina con un
        apartado de lo que <strong>no</strong> resuelve.
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
interface InicioProps {
  /** Si hay navegador. Quita lo que necesita estado y deja el resto igual. */
  interactivo?: boolean;
  /**
   * Lo que va entre la propuesta de valor y el resto de la página.
   *
   * La zona de subida vive en `UploadRoute` —necesita estado— y la cabecera en
   * `Inicio`. Pintarlas una detrás de otra dejaba el `<h2>` de subida ANTES del
   * `<h1>`; mover toda `Inicio` delante dejaba la subida al final de una página
   * larguísima. Con esto la ruta coloca la subida justo detrás de la propuesta de
   * valor, que es donde se decide si se suelta el archivo, y el HTML exportado
   * —que pinta `Inicio` sin children— no cambia.
   */
  children?: ReactNode;
}

export default function Inicio({ interactivo = true, children }: InicioProps) {
  const destacadas = DESTACADAS.map((slug) => guiaPorSlug(slug)).filter(
    (g): g is Guia => g !== null
  );
  const filas = temperaturasDeReferencia();

  return (
    <div className="inicio">
      {/*
        La cabecera va en los dos modos, y es lo que arregla dos cosas a la vez: el
        HTML exportado tenía **cero** `<h1>` —empezaba por la tabla— y el titular es
        lo primero que tiene que leer quien llega. Es texto y no necesita estado, así
        que no hay motivo para que el navegador lo tenga y el rastreador no.

        **El párrafo ya no pide que subas el archivo.** La zona de subida de abajo es
        la que lo pide, con un botón y con un «Sube tu archivo» que se lee. Cuando
        las dos cosas lo decían —la barra superior, el titular y la caja— subir el
        archivo era la primera instrucción de la página repetida tres veces. Ahora
        el titular dice qué se gana y la caja dice cómo se hace.

        El contenedor `.inicio` **lo pinta este componente**, y no la ruta. Antes lo
        pintaba `UploadRoute`, y por eso el HTML exportado —que renderiza
        `Inicio` sin esa capa— se quedaba sin la columna de contenido y con otras
        medidas. Un solo sitio que decide la forma de la portada, para los dos
        modos.
      */}
      <div className="inicio-accion">
        <header className="inicio-hero">
          {/*
            La cabecera de plano de la ruta: el número de plano, el nombre de la
            ruta y el estado. Es lo que pide la spec de identidad visual (§7.2) y
            lo que le da al sitio una cara de plano técnico en vez de una
            página más: una línea pequeña en mono, arriba, y el titular debajo.

            El estado **no es adorno**: dice qué está pasando en la pantalla. En
            la portada no hay archivo —o el archivo ya está en el visor, que es
            otra vista—, y en el HTML exportado, que no tiene analizador, se
            dice «Modo lectura».
          */}
          <p className="plano-ruta">
            <span>01 · Inicio</span>
            <span className="plano-ruta-estado">{interactivo ? 'Sin archivo' : 'Modo lectura'}</span>
          </p>
          <h1>¿Va a salir bien tu impresión?</h1>
          <p>
            Tu slicer ya escribió dentro del archivo el material, las temperaturas y
            los gramos. Esta página te dice qué significan.
          </p>
          {!interactivo ? (
            <p className="inicio-estatico-aviso">
              El analizador y el taller necesitan JavaScript. Esta página y las guías no:
              se leen enteras sin él, y la tabla de abajo viene con su fuente.
            </p>
          ) : null}
        </header>

        {children}
      </div>

      {/*
        La columna de los dibujos.

        Esta es la parte que hace que la portada se pueda **mirar** en vez de leer:
        nueve problemas, cada uno con su esquema —que es lo que explica el
        defecto, no una foto— y el nombre con el que quien lo ha visto lo
        describirá en una búsqueda.

        Antes estaba una sección con los tres primeros y, más abajo, un muro con
        los treinta problemas en tarjetas de texto: 3.000 palabras de la misma
        lista que ya está en `/wiki`, con buscador. Eso no era contenido de la
        portada: era el índice de otra página, copiado y descolocado. Aquí quedan
        los nueve que tienen dibujo, y el enlace al índice completo.
      */}
      <section className="inicio-visual" aria-labelledby="inicio-visual-titulo">
        <h2 id="inicio-visual-titulo"><span className="plano-numero" aria-hidden="true">02 ·</span>¿Tu pieza ha salido mal?</h2>
        <p className="inicio-visual-intro">
          Cada guía empieza confirmando que el problema es el que crees y termina con
          las acciones que puedes aplicar, cada una con su fuente.
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
          Ver los {GUIAS.length} problemas cubiertos →
        </Link>
      </section>

      {/*
        Los destinos que no son la subida. Antes eran dos bloques —«otras formas
        de empezar» con dos enlaces y «qué más puedes hacer» con tres— y entre los
        dos decían lo mismo dos veces: el taller y la wiki estaban en los dos.
        Ahora es una fila de tres tarjetas, y la wiki no está: la columna de los
        dibujos ya lleva a ella.
      */}
      <nav className="inicio-modulos" aria-label="Otras formas de empezar">
        <Link className="inicio-modulo" to="/taller">
          <span className="inicio-modulo-titulo">Taller</span>
          <span className="inicio-modulo-detalle">
            Calcula el coste de filamento de una pieza con los gramos que ya trae tu
            G-code.
          </span>
        </Link>
        <Link className="inicio-modulo" to="/maquinas">
          <span className="inicio-modulo-titulo">Máquinas</span>
          <span className="inicio-modulo-detalle">
            Ocho impresoras con sus datos y de dónde sale cada uno.
          </span>
        </Link>
        {interactivo ? (
          <Link className="inicio-modulo" to="/historial">
            <span className="inicio-modulo-titulo">Historial</span>
            <span className="inicio-modulo-detalle">
              Vuelve a consultar los análisis que ya has hecho.
            </span>
          </Link>
        ) : null}
      </nav>

      <section className="inicio-referencia" aria-labelledby="inicio-referencia-titulo">
        <h2 id="inicio-referencia-titulo"><span className="plano-numero" aria-hidden="true">03 ·</span>Temperaturas por material</h2>
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
        <h2 id="inicio-pasos-titulo"><span className="plano-numero" aria-hidden="true">04 ·</span>Qué hace el analizador</h2>
        <ol className="inicio-pasos-lista">
          <li>
            <h3>Lee el archivo</h3>
            <p>
              Abre el G-code en tu navegador y extrae lo que el slicer escribió:
              material, temperaturas, altura de capa, gramos y tiempo.
            </p>
          </li>
          <li>
            <h3>Dice qué le falta</h3>
            <p>
              Un campo que el slicer no escribió sale como «—» y no como un cero. Un
              cero es un valor; una ausencia es una pregunta.
            </p>
          </li>
          <li>
            <h3>Ofrece una orientación</h3>
            <p>
              En modo de demostración calcula un índice local orientativo: no es una
              probabilidad de fallo validada ni verifica si la geometría necesita
              soportes.
            </p>
          </li>
          <li>
            <h3>Te lleva a la guía</h3>
            <p>
              Cada dato del panel enlaza a la guía que lo explica, y allí lo declaras
              para que las acciones salgan con tu cifra y no con la del fabricante.
            </p>
          </li>
        </ol>
      </section>

      <section className="inicio-preguntas" aria-labelledby="inicio-preguntas-titulo">
        <h2 id="inicio-preguntas-titulo"><span className="plano-numero" aria-hidden="true">05 ·</span>Preguntas frecuentes</h2>
        <dl className="inicio-preguntas-lista">
          {PREGUNTAS.map((p) => (
            <div className="inicio-pregunta" key={p.pregunta}>
              <dt>{p.pregunta}</dt>
              <dd>{p.respuesta}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
