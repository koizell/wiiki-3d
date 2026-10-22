import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DibujoSintoma from '../components/DibujoSintoma';
import DiagnosticoGuia from '../components/DiagnosticoGuia';
import { Negrita } from '../components/Negrita';
import TuArchivo from '../components/TuArchivo';
import EsquemaTorreTemperatura from '../components/EsquemaTorreTemperatura';
import Comprobacion from '../components/guia/Comprobacion';
import ReadoutAccion from '../components/guia/ReadoutAccion';
import StepperEtapas from '../components/guia/StepperEtapas';
import TarjetaConocimiento from '../components/guia/TarjetaConocimiento';
import TarjetaVariable from '../components/guia/TarjetaVariable';
import { etiquetaCampo } from '../lib/tu-archivo';
import { actualizarSeo, seoGuia } from '../lib/seo';
import { fechaLarga } from '../lib/formato';
import {
  compararValor,
  conocimientoVisible,
  guiaPorSlug,
  precontestar,
  reglasQueSalen,
  variablesEnOrden,
} from '../lib/guias';
import { useAnalysis } from '../state/useAnalysis';
import { useGuiaEstado } from '../state/useGuia';
import { ContextoMovimiento } from '../state/movimiento-contexto';
import { useEtapaActiva } from '../state/useEtapaActiva';
import type { Guia, Regla, Variable } from '../content/guias/tipos';
import type { ProjectMetadata } from '../services/types';

/**
 * Una guía: las cuatro etapas, en orden.
 *
 * ## Lo que ha cambiado
 *
 * La guía era un documento largo: cuatro etapas apiladas, con las comprobaciones del
 * diferencial como dos tarjetas de texto verde y rojo enfrentadas, las variables
 * como una fila de chips de dos palabras, las tarjetas de conocimiento como un
 * párrafo y un `blockquote`, y las acciones como una lista de seis bloques cada una.
 *
 * Ahora es un **instrumento**:
 *
 * - La **pregunta** del diferencial es lo grande, y el veredicto llega al
 *   contestar. El texto de las dos caras no se borra: baja a un desplegable.
 * - Las **opciones** son tarjetas con el detalle que ya estaba escrito en el
 *   contenido, y al marcar se dibuja el trazo azul de la spec §6.
 * - Las **tarjetas de conocimiento** llevan su cifra en grande y su cuerpo en
 *   puntos, no en un párrafo.
 * - Las **acciones** son readouts: la cifra manda, el porqué es una línea y la
 *   fuente va al lado.
 * - Encima, la **cabecera de plano** con el estado y el **recorrido** con los
 *   contadores en vivo.
 *
 * El contenido no ha cambiado: `src/content/guias/` sigue siendo el mismo, con
 * `indicador` y `puntos` añadidos. Lo que ha cambiado es cómo se pinta.
 *
 * ## `exportEstatico`: la misma guía, contada de otra forma
 *
 * Este componente se renderiza dos veces con propósitos distintos: en el navegador,
 * donde hay estado y por tanto hay diagnóstico interactivo, y en
 * `scripts/export-static.mjs`, que genera el HTML que lee quien **no** ejecuta
 * JavaScript —y el primer vistazo de cualquier rastreador—.
 *
 * En la segunda no hay estado que calcular, y sin respuestas la etapa 4 salía vacía:
 * ocho de las nueve guías publicaban «Qué cambiar» con cero acciones. Con esta
 * bandera, la etapa 4 publica el recetario completo con todas las condiciones que lo
 * desbloquea, que es la misma información en la única forma en que se puede contar
 * sin respuestas. Cada regla aparece una sola vez.
 *
 * Y en la segunda **no hay movimiento**: el HTML se genera una vez y se sirve, así
 * que una animación dejaría el texto en su estado inicial —invisible—. Por eso el
 * render va envuelto en `ContextoMovimiento` con `false`.
 */
export default function GuiaRoute({ exportEstatico = false }: { exportEstatico?: boolean } = {}) {
  const { slug } = useParams();
  const { hash } = useLocation();
  const guia = guiaPorSlug(slug);
  const { metadata } = useAnalysis();

  /*
   * Las respuestas viven en el contexto de la guía y no en el de análisis, por dos
   * razones que salen de lo que es esta vista: no son datos del archivo —se pueden
   * cambiar sin tocar el G-code— y no tienen sentido fuera de esta guía. Lo que sí
   * sale del contexto de análisis es `precontestar`, que es el puente: lo que el
   * análisis sabe se escribe como si la persona lo hubiera dicho.
   */
  const {
    elegidas,
    alternar: alternarVariable,
    setElegidas,
    limpiar,
    diferencial,
    alternarDiferencial,
  } = useGuiaEstado();

  /*
   * El cambio de guía con el mismo componente montado.
   *
   * Sin esto, entrar en `/wiki/warping-pla`, declarar variables y luego saltar a
   * `/wiki/separaciones-entre-capas` —que es justo lo que hace el `siNo` del
   * diferencial— dejaría las respuestas de la guía anterior en la pantalla: las
   * variables que no existen en la nueva guía se ignoran, pero las que comparten
   * nombre se quedan marcadas con el valor de otro material.
   */
  /*
   * Precontestar lo que el G-code ya sabe, y sólo una vez por guía.
   *
   * La dependencia es `slug` y no `metadata` a propósito: si quien sube un archivo
   * mientras está en la guía viera aparecer de golpe una variable marcada que él
   * no marcó, no sabría si el sistema se ha equivocado o si lo ha contestado él.
   * El material precontestado pertenece a la carga con la que se entró; cambiar de
   * archivo es una acción del panel, no de la guía, y quien quiera que la guía lo
   * vuelva a leer tiene el botón «Empezar de cero».
   *
   * Y por eso el efecto **borra** antes de precontestar, en vez de acumular: al
   * saltar a otra guía —que es justo lo que hace el `siNo` del diferencial— las
   * respuestas de la anterior se van con ella. De lo contrario, las variables que
   * comparten nombre entre las dos guías se quedarían marcadas con el valor del
   * otro material, y eso es peor que no tener nada.
   *
   * En la exportación estática el efecto no llega a correr —`renderToStaticMarkup`
   * no ejecuta efectos—, así que el HTML sale siempre sin diagnosticar. Es lo que
   * se quiere, y no depende de esta bandera.
   */
  useEffect(() => {
    limpiar();
    setElegidas(guia ? precontestar(guia, metadata) : {});
    // `metadata` se lee pero no se sigue a propósito: ver el comentario de arriba.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, guia]);

  useEffect(() => {
    actualizarSeo(
      guia
        ? seoGuia(guia)
        : {
            path: `/wiki/${slug ?? ''}/`,
            title: 'Guía no encontrada | wiiki-3d',
            description:
              'Esta guía no existe. Vuelve al índice para ver los problemas que sí están cubiertos.',
            noindex: true,
          }
    );
  }, [guia, slug]);

  // La guía puede llegar después del hash por lazy loading. Esperar al montaje,
  // no dejar el destino sólo en la URL y a dos pantallas de distancia.
  useEffect(() => {
    if (!hash || !guia) return;
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [hash, guia]);

  const reglas = useMemo(() => (guia ? reglasQueSalen(guia, elegidas) : []), [guia, elegidas]);
  const tarjetas = useMemo(
    () => (guia ? conocimientoVisible(guia, elegidas) : []),
    [guia, elegidas]
  );

  /**
   * En qué etapa se está leyendo.
   *
   * El recorrido de arriba no sólo dice dónde está cada etapa: dice **dónde
   * estás**, que con cuatro etapas apiladas es lo que se pierde al bajar.
   *
   * **El hook va antes del `return` de guía inexistente**, y no por gusto: los
   * hooks se llaman en el mismo orden en cada render, y aquí el orden depended
   * de si la guía ha llegado. La guía puede llegar después por lazy loading, así
   * que ese `return` sí se puede cruzar entre dos renders: con el hook debajo,
   * React vería un render con un hook y el siguiente sin él, y lo que eso
   * produce es un error de «los hooks se han llamado en un orden distinto» en
   * mitad de la lectura, no una pantalla en blanco.
   *
   * Los cuatro `id` son los de las cuatro etapas del contrato y **son los mismos
   * en todas las guías**, así que el hook puede llamarse sin mirar la guía.
   */
  const etapaActiva = useEtapaActiva(['diagnostico', 'montaje', 'conocimiento', 'recomendacion']);

  if (!guia) {
    return (
      <div className="guia guia--vacia">
        <div className="guia-caja">
          <h1>Esa guía no existe</h1>
          <p>
            El enlace que has seguido no lleva a ninguna guía escrita.{' '}
            <Link className="guia-enlace" to="/wiki">
              Vuelve al índice
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const contestadas = guia.variables.filter((v) => elegidas[v.id] !== undefined).length;

  const contenido = (
    <div className="guia" key={guia.slug}>
      <Cabecera guia={guia} />

      {/*
        El recorrido con los contadores.

        Son **enlaces**, no botones: el destino sigue siendo `#diagnostico`,
        `#montaje`…, y quien recibe un enlace con un ancla llega al mismo sitio que
        quien está interactuando. Un botón que moviera el scroll sin cambiar la URL
        dejaría de poder enlazarse a una etapa.
      */}
      <StepperEtapas
        contestadas={contestadas}
        totalVariables={guia.variables.length}
        acciones={reglas.length}
        tarjetas={tarjetas.length}
        activa={etapaActiva}
      />

      <TuArchivo guia={guia} />

      <EtapaDiferencial
        guia={guia}
        diferencial={diferencial}
        onResponder={alternarDiferencial}
      />

      <EtapaVariables
        guia={guia}
        elegidas={elegidas}
        alternar={alternarVariable}
        reglas={reglas}
      />

      <EtapaConocimiento guia={guia} tarjetas={tarjetas} elegidas={elegidas} alternar={alternarVariable} />

      <EtapaRecomendacion
        reglas={reglas}
        metadata={metadata}
        guia={exportEstatico ? guia : null}
      />

      <FueraDeAlcance guia={guia} />

      <section className="guia-fuentes" id="fuentes">
        <h2 className="etapa-titulo">De dónde sale esto</h2>
        <p className="guia-fuentes-nota">
          Cada dato de esta guía viene de una de estas fuentes. Cuando dos
          fabricantes se contradicen, la guía enseña la contradicción en vez de
          elegir una y callar la otra.
        </p>
        <ol className="guia-fuentes-lista">
          {guia.fuentes.map((f) => (
            <li key={f.url}>
              <a href={f.url} target="_blank" rel="noopener noreferrer">
                <strong>{f.quien}</strong>
                <span>{f.que}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );

  /*
   * La exportación estática no se anima: el HTML se genera una vez y se sirve, y una
   * animación dejaría el texto en su estado inicial, invisible.
   */
  if (exportEstatico) {
    return <ContextoMovimiento.Provider value={false}>{contenido}</ContextoMovimiento.Provider>;
  }
  return contenido;
}

/**
 * La cabecera de la guía: el plano de arriba y el dibujo.
 *
 * Lo de arriba es la **cabecera de plano** de la spec §7.2 —`01 · INICIO` con el
 * estado a la derecha— que hasta ahora sólo la portada tenía. En la guía dice
 * `04 · WIKI 3D / <SLUG>` y el estado es si hay un archivo con el que comparar.
 */
function Cabecera({ guia }: { guia: Guia }) {
  const { metadata } = useAnalysis();

  return (
    <header className="guia-cabecera">
      <div className="guia-plano">
        <span className="guia-plano-ruta">04 · Wiki 3D / {guia.slug}</span>
        <span
          className={`guia-plano-estado${metadata ? ' guia-plano-estado--con-datos' : ''}`}
        >
          {metadata ? `Con ${metadata.material ?? 'archivo'}` : 'Sin archivo'}
        </span>
      </div>

      <div className="guia-cabecera-cuerpo">
        <div className="guia-cabecera-texto">
          <p className="guia-cabecera-migas">
            <Link to="/wiki">Wiki 3D</Link>
          </p>
          <h1>{guia.sintoma}</h1>
          <p className="guia-cabecera-resumen">{guia.resumen}</p>
          {/*
            El contexto —el parrafo de entrada y la segunda mitad del resumen— sigue
            en un desplegable.

            Es lo que hace falta para entender por que ocurre, y es largo: leerlo
            antes de saber si el problema es el tuyo es leer de mas. Quien quiere
            entender, lo abre; quien quiere actuar, no lo necesita.

            Y la segunda mitad del resumen —que antes estaba en la cabecera, con
            178 caracteres y 124 px de alto— tambien es contexto: cabe en el mismo
            sitio. Lo que se ve de un vistazo es la primera frase, que es la que
            dice de que va la guia.
          */}
          <details className="guia-contexto">
            <summary>Entender el problema antes de empezar</summary>
            {guia.resumenExtra && <p className="guia-contexto-extra">{guia.resumenExtra}</p>}
            <p className="guia-entrada">{guia.entrada}</p>
          </details>

          <p className="guia-cabecera-meta">
            <span className="insignia">{guia.minutos} min</span>
            {guia.campos && guia.campos.length > 0 && (
              <span className="insignia insignia--acento">
                Explica {guia.campos.length} {guia.campos.length === 1 ? 'campo' : 'campos'} del
                panel
              </span>
            )}
          </p>
          <p className="guia-autor">
            <span>wiiki-3d</span>
            {' · '}
            <a href="mailto:contacto@wiiki-3d.com">Contacto</a>
            {' · Actualizado el '}
            {fechaLarga(guia.actualizado)}
          </p>
        </div>

        <div className="guia-cabecera-lateral">
          <DibujoSintoma dibujo={guia.dibujo} grande className="guia-cabecera-dibujo" />
        </div>
      </div>
    </header>
  );
}

/**
 * Etapa 1 · El diferencial.
 *
 * ## Lo que ha cambiado
 *
 * Antes eran **dos tarjetas de texto verde y rojo, enfrentadas**, por comprobación,
 * y las tres ocupaban una pantalla antes de poder hacer nada. El lector tenía que
 * leer las seis caras para saber si su problema era el que buscaba.
 *
 * Ahora la **pregunta** es lo grande, con dos botones, y el veredicto —«es este
 * problema» o «es otro problema»— aparece **cuando se contesta**. Las dos caras
 * siguen escritas, debajo, en un desplegable.
 *
 * Y el texto de entrada sigue diciendo lo mismo: si las tres son «no», no es este
 * problema, y sale el camino al que sí lo es.
 */
function EtapaDiferencial({
  guia,
  diferencial,
  onResponder,
}: {
  guia: Guia;
  diferencial: Record<string, 'si' | 'no'>;
  onResponder: (comprobacion: string, respuesta: 'si' | 'no') => void;
}) {
  const algunaNo = guia.diferencial.comprobaciones.some((c) => diferencial[c.id] === 'no');

  return (
    <section className="etapa etapa--diferencial" id="diagnostico">
      {/*
        El título es corto a propósito: dice **qué** hay que hacer, y el texto de
        entrada dice **con qué** se confunde. Antes el título llevaba el nombre del
        problema de al lado («descártalo como separación entre capas») y el texto de
        entrada lo repetía entero: dos veces lo mismo, y en un móvil el título
        ocupaba tres líneas.
      */}
      <h2 className="etapa-titulo">
        <span className="etapa-num">1</span> Antes de tocar nada: descártalo
      </h2>
      <p className="etapa-intro">
        {mayuscula(guia.diferencial.contra)}. Si las tres dicen que no, no es este
        problema.
      </p>

      <ul className="comprobaciones">
        {guia.diferencial.comprobaciones.map((c) => (
          <Comprobacion
            key={c.id}
            comprobacion={c}
            respuesta={diferencial[c.id]}
            onResponder={(respuesta) => onResponder(c.id, respuesta)}
          />
        ))}
      </ul>

      {/*
        La salida aparece **cuando hace falta**: si alguna comprobación es «no», el
        problema no es este y hay que ir al lado. Antes estaba siempre, que es lo
        mismo que no estar nunca.
      */}
      {algunaNo && guia.diferencial.siNo && (
        <div className="diferencial-salida">
          <span>Si has contestado «no», el problema es otro</span>
          <Link className="boton boton--ruta" to={`/wiki/${guia.diferencial.siNo.guia}`}>
            {guia.diferencial.siNo.etiqueta}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      )}
    </section>
  );
}

/**
 * Etapa 2 · Las variables.
 *
 * Lo que cambia es cómo se **pintan** las opciones: antes eran chips de una
 * palabra; ahora son tarjetas con el detalle que ya estaba escrito en el contenido.
 * El estado, los datos y el cálculo no cambian: son los mismos que alimentan la
 * etapa 4.
 */
function EtapaVariables({
  guia,
  elegidas,
  alternar,
  reglas,
}: {
  guia: Guia;
  elegidas: Record<string, string>;
  alternar: (variable: string, opcion: string) => void;
  reglas: Regla[];
}) {
  return (
    <section className="etapa etapa--variables" id="montaje">
      <h2 className="etapa-titulo">
        <span className="etapa-num">2</span> Tu montaje
      </h2>
      <p className="etapa-intro">
        Lo que declaras aquí decide qué acciones se aplican. Con lo que has marcado
        hasta ahora salen <strong>{reglas.length}</strong>{' '}
        {reglas.length === 1 ? 'acción' : 'acciones'}.
      </p>

      <div className="guia-diagnostico">
        <DiagnosticoGuia guia={guia} />
      </div>

      <div className="variables">
        {variablesEnOrden(guia).map((variable: Variable) => (
          <TarjetaVariable
            key={variable.id}
            variable={variable}
            elegida={elegidas[variable.id]}
            onAlternar={(opcion) => alternar(variable.id, opcion)}
          />
        ))}
      </div>

      <p className="guia-atajo">
        <a className="enlace-guia" href="#recomendacion">
          Ir a las acciones
          <span aria-hidden="true"> ↓</span>
        </a>
      </p>
    </section>
  );
}

/**
 * Etapa 3 · El conocimiento.
 *
 * Sólo sale lo que tus variables hacen pertinente, y cada tarjeta trae su cifra y
 * su cita. La cita va corta y literal a propósito: es la prueba de que el dato no
 * es una opinión, y una cita larga sería prosa con otro formato.
 *
 * El cuerpo ahora son **puntos** en vez de un párrafo. El texto es el mismo —el
 * troceado es mecánico y el cotejo lo demuestra—, pero separado en líneas se lee
 * de un vistazo.
 */
function EtapaConocimiento({
  guia,
  tarjetas,
  elegidas,
  alternar,
}: {
  guia: Guia;
  tarjetas: Guia['conocimiento'];
  elegidas: Record<string, string>;
  alternar: (variable: string, opcion: string) => void;
}) {
  return (
    <section className="etapa etapa--conocimiento" id="conocimiento">
      <h2 className="etapa-titulo">
        <span className="etapa-num">3</span> Lo que necesitas saber
      </h2>
      <p className="etapa-intro">
        {tarjetas.length === guia.conocimiento.length
          ? `Las ${tarjetas.length} tarjetas de esta guía. Marca algo arriba y las que no apliquen se irán.`
          : `${tarjetas.length} de ${guia.conocimiento.length} tarjetas: se han quedado fuera las ${guia.conocimiento.length - tarjetas.length} que no aplican a lo que has marcado.`}
      </p>

      {tarjetas.length === 0 ? (
        <p className="etapa-vacia">
          Con lo que has marcado hasta ahora no hace falta ningún dato más. La
          recomendación de abajo ya es completa para tu caso.
        </p>
      ) : (
        <div className="tarjetas">
          {tarjetas.map((t) => (
            <TarjetaConocimiento
              key={t.id}
              tarjeta={t}
              enlaza={
                t.enlaza
                  ? { guia: t.enlaza.guia, etiqueta: t.enlaza.etiqueta }
                  : undefined
              }
              extra={
                guia.slug === 'torre-temperatura' && t.id === 'puenteado' ? (
                  <EsquemaTorreTemperatura />
                ) : undefined
              }
            />
          ))}
        </div>
      )}

      {Object.keys(elegidas).length > 0 && (
        <button type="button" className="boton boton--sutil" onClick={() => Object.keys(elegidas).forEach((k) => alternar(k, elegidas[k]))}>
          Empezar de cero
        </button>
      )}
    </section>
  );
}

/**
 * Etapa 4 · La recomendación.
 *
 * Es la etapa que antes eran cinco párrafos con el orden dentro, y aquí es una
 * lista que se recalcula. El orden lo pone la guía y no el orden de aparición: las
 * tres primeras acciones son las del Tier 1 del fabricante, que es la única
 * secuencia que viene de una fuente y no de nosotros.
 *
 * ## Los dos modos
 *
 * `guia` llega con valor **sólo** en la exportación estática, y entonces esta etapa
 * publica el recetario completo con las condiciones de cada acción, en vez de
 * la lista filtrada por las respuestas —que en ese render no existen—. En el
 * navegador `guia` es `null` y se pinta la lista calculada, que es el
 * comportamiento de siempre.
 */
function EtapaRecomendacion({
  reglas,
  metadata,
  guia,
}: {
  reglas: Guia['reglas'];
  metadata: ProjectMetadata | null;
  guia: Guia | null;
}) {
  if (guia) return <Recetario guia={guia} />;

  return (
    <section className="etapa etapa--recomendacion" id="recomendacion">
      <h2 className="etapa-titulo">
        <span className="etapa-num">4</span> Qué cambiar
      </h2>

      {reglas.length === 0 ? (
        <p className="etapa-vacia">
          Con lo declarado hasta ahora no sale ninguna acción. Marca el material y la
          chapa y la lista se llena: casi todas las acciones dependen de esas dos.
        </p>
      ) : (
        <>
          {/*
            El recuento se anuncia, no sólo se ve.

            La lista de abajo cambia en cuanto marcas una variable, pero para
            alguien que llega con lector de pantalla —o para quien ha marcado y ha
            perdido la cuenta— el número tiene que poder leerse. El `aria-live` va
            en el párrafo del recuento, que es el que cambia.
          */}
          <p className="etapa-intro" role="status" aria-live="polite">
            {reglas.length === 1 ? '1 acción' : `${reglas.length} acciones`} que se
            aplican a lo que has declarado.
          </p>

          <ol className="acciones">
            {reglas.map((r, i) => (
              <ReadoutAccion
                key={r.id}
                regla={r}
                orden={i + 1}
                comparacion={<Comparacion regla={r} metadata={metadata} />}
              />
            ))}
          </ol>
        </>
      )}
    </section>
  );
}

/**
 * Etapa 4 sin JavaScript: una acción por regla, con todas sus condiciones juntas.
 *
 * Lleva su propio `id="recomendacion"` porque el atajo de la etapa 2 apunta ahí, y
 * el `<h2>` es el mismo número y el mismo título que en el modo interactivo: el
 * ancla y el índice de la página no pueden cambiar según haya JavaScript.
 *
 * El texto de entrada dice **qué se está viendo**, y es lo que impide que esto sea
 * una lista huérfana: sin él, un lector vería dieciséis acciones sin saber que su
 * caso es un subconjunto. Con él, sabe que marcar es estrechar.
 */
function Recetario({ guia }: { guia: Guia }) {
  return (
    <section className="etapa etapa--recomendacion" id="recomendacion">
      <h2 className="etapa-titulo">
        <span className="etapa-num">4</span> Qué cambiar
      </h2>

      <p className="etapa-intro">
        Estas son las {guia.reglas.length} acciones que esta guía puede llegar a
        recomendar, cada una una sola vez y con todas sus condiciones. Marca tu montaje arriba y la lista
        se estrecha: quedan sólo las que aplican a tu caso, con{' '}
        <strong>tu</strong> cifra.
      </p>

      <ol className="acciones">
        {guia.reglas.map((regla, i) => (
          <AccionEstatica key={regla.id} regla={regla} orden={i + 1} guia={guia} />
        ))}
      </ol>

      {guia.reglas.length === 0 && (
        <p className="etapa-vacia">Esta guía no tiene acciones: explica, no recomienda.</p>
      )}
    </section>
  );
}

/** Las variables se combinan con Y; las opciones de una misma variable, con O. */
function CondicionesAccion({ regla, guia }: { regla: Regla; guia: Guia }) {
  const condiciones = Object.entries(regla.cuando ?? {});
  return (
    <div className="accion-condiciones">
      {condiciones.length === 0 ? <p>Se aplica siempre.</p> : (
        <>
          <p>Se aplica si se cumplen todas estas condiciones:</p>
          <ul>
            {condiciones.map(([id, valores]) => {
              const variable = guia.variables.find((v) => v.id === id)!;
              const etiquetas = (Array.isArray(valores) ? valores : [valores])
                .map((valor) => variable.opciones.find((o) => o.id === valor)!.etiqueta);
              return <li key={id}><strong>{variable.etiqueta}:</strong> {etiquetas.join(' o ')}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

/** Una sola aparición de cada regla, en el orden editorial de la guía. */
function AccionEstatica({ regla, orden, guia }: { regla: Regla; orden: number; guia: Guia }) {
  return (
    <li className="accion" data-regla={regla.id}>
      <div className="accion-cabecera">
        <span className="accion-orden" aria-hidden="true">
          {String(orden).padStart(2, '0')}
        </span>
        <h3 className="accion-titulo">{regla.accion}</h3>
        {regla.valor && <p className="accion-valor">{regla.valor}</p>}
      </div>
      <CondicionesAccion regla={regla} guia={guia} />
      <p className="accion-porque">
        <Negrita>{regla.porque}</Negrita>
      </p>
      {regla.alcance && (
        <p className="accion-alcance">
          <Negrita>{regla.alcance}</Negrita>
        </p>
      )}
      <p className="accion-fuente">
        <span>FUENTE · {regla.fuente}</span>
      </p>
    </li>
  );
}

/**
 * Tu valor, al lado del intervalo de la fuente.
 *
 * La guía dice «45–65 °C» y quien lee tiene la cama a 60: el dato útil no es el
 * intervalo, es **dónde cae el suyo**. Esta línea lo dice, y sólo aparece cuando el
 * archivo trae el campo. Si el slicer no escribió la cama no hay nada que comparar,
 * y no se pinta nada —que es distinto de pintar «dentro», y la diferencia es la que
 * separa «tu cama está bien» de «tu slicer no dijo la cama»—.
 *
 * El intervalo sale de `rango`, que es el mismo que el `valor` de la regla en
 * números. `verify:guias` comprueba que los dos digan lo mismo.
 */
function Comparacion({ regla, metadata }: { regla: Regla; metadata: ProjectMetadata | null }) {
  const rango = regla.rango;
  if (!rango) return null;

  const valor = valorDeCampo(metadata, rango.campo);
  const comparacion = compararValor(rango, valor);
  if (comparacion === null || valor === undefined) return null;

  const etiqueta = (etiquetaCampo(rango.campo) ?? rango.campo).toLowerCase();
  const donde =
    comparacion.posicion === 'dentro'
      ? 'dentro del intervalo'
      : `${comparacion.diferencia} ${rango.unidad} ${comparacion.posicion === 'por-encima' ? 'por encima' : 'por debajo'}`;

  return (
    <p className={`accion-comparacion accion-comparacion--${comparacion.posicion}`}>
      <span className="accion-comparacion-tu">
        Tu {etiqueta}:{' '}
        <strong>
          {String(valor).replace('.', ',')} {rango.unidad}
        </strong>
      </span>
      {' · '}
      <span className="accion-comparacion-fuente">
        objetivo {rango.min}–{rango.max} {rango.unidad}
      </span>
      {' · '}
      <span className="accion-comparacion-donde">{donde}</span>
    </p>
  );
}

/** El valor numérico de un campo del archivo, si lo trae. */
function valorDeCampo(metadata: ProjectMetadata | null, campo: string): number | undefined {
  const valor = (metadata as unknown as Record<string, unknown> | null)?.[campo];
  return typeof valor === 'number' ? valor : undefined;
}

/** Lo que esta guía no resuelve, y a dónde llevar el caso. */
function FueraDeAlcance({ guia }: { guia: Guia }) {
  if (guia.fueraDeAlcance.length === 0) return null;
  return (
    <section className="etapa etapa--fuera">
      <h2 className="etapa-titulo">Esto no lo resuelve</h2>
      <p className="etapa-intro">
        Los tres motivos por los que esta guía puede no servirte, y qué hacer en cada
        caso. Decirlo es lo que hace que las de arriba sean creíbles.
      </p>
      <ul className="fuera">
        {guia.fueraDeAlcance.map((f) => (
          <li key={f.sintoma} className="fuera-item">
            <p className="fuera-sintoma">{f.sintoma}</p>
            <p className="fuera-porque">
              <Negrita>{f.porQue}</Negrita>
            </p>
            {f.guia && (
              <EnlaceGuia
                guia={f.guia}
                etiqueta={guiaPorSlug(f.guia)?.titulo ?? 'Ver la otra guía'}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Una enlace a otra guía. El tercer sitio donde la wiki se interconecta. */
function EnlaceGuia({ guia, etiqueta }: { guia: string; etiqueta: string }) {
  return (
    <Link className="enlace-guia" to={`/wiki/${guia}`}>
      {etiqueta}
      <span aria-hidden="true"> →</span>
    </Link>
  );
}

/**
 * La primera letra en mayúscula.
 *
 * `contra` es una enumeración en minúsculas —«separación entre capas», «voladizo
 * que cuelga»— porque se leía después de «descártalo como». Ahora abre la frase
 * del texto de entrada, y una frase no empieza en minúscula.
 */
function mayuscula(texto: string): string {
  return texto.length === 0 ? texto : texto.charAt(0).toUpperCase() + texto.slice(1);
}
