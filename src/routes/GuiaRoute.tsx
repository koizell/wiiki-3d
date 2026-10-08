import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import DibujoSintoma from '../components/DibujoSintoma';
import DiagnosticoGuia from '../components/DiagnosticoGuia';
import { Negrita } from '../components/Negrita';
import TuArchivo from '../components/TuArchivo';
import { idConocimiento, idVariable, etiquetaCampo } from '../lib/tu-archivo';
import { actualizarSeo, seoGuia } from '../lib/seo';
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
import type { Guia, Opcion, Regla, Variable } from '../content/guias/tipos';
import type { ProjectMetadata } from '../services/types';

/**
 * Una guía: las tres etapas, en orden.
 *
 * ## Por qué las variables van arriba y la recomendación abajo
 *
 * Por la dirección de la lectura, no por decoración. Quien llega con un warping
 * ya sabe que las esquinas se levantan — para eso está la tarjeta que ha pulsado
 * en el índice— y lo que no sabe es si su problema es de cama, de ventilador o de
 * material. Preguntar primero y resolver abajo es la única secuencia en la que
 * cada respuesta tiene consecuencia visible: al marcar «Textured PEI», las
 * tarjetas que no aplican desaparecen y la lista de acciones cambia de cifras. Eso
 * es lo que hace que la página esté viva en lugar derada.
 *
 * ## El diferencial es una etapa y no un párrafo
 *
 * Porque es lo que evita el error caro. Subir la cama de un warping que en
 * realidad es una separación entre capas no arregla nada, y quien va a la wiki
 * con un problema lo primero que tiene que poder hacer es descartarlo. Por eso va
 * primero, con dos caras enfrentadas por comprobación, y con salida: si la
 * respuesta es «no», el enlace lleva a la guía que sí lo es.
 */
export default function GuiaRoute() {
  const { slug } = useParams();
  const guia = guiaPorSlug(slug);
  const { metadata } = useAnalysis();

  /*
   * Las respuestas viven en el contexto de la guía y no en el de análisis, por dos
   * razones que salen de lo que es esta vista: no son datos del archivo —se pueden
   * cambiar sin tocar el G-code— y no tienen sentido fuera de esta guía. Lo que sí
   * sale del contexto de análisis es `precontestar`, que es el puente: lo que el
   * análisis sabe se escribe como si la persona lo hubiera dicho.
   */
  const { elegidas, alternar: alternarVariable, setElegidas, limpiar } = useGuiaEstado();

  /*
   * El cambio de guía con el mismo componente montado.
   *
   * Sin esto, entrar en `/wiki/warping-pla`, declarar variables y luego saltar a
   * `/wiki/separaciones-entre-capas` —que es justo lo que hace el `siNo` del
   * diferencial— dejaría las respuestas de la guía anterior en la pantalla: las
   * variables que no existen en la nueva guía se ignoran, pero las que comparten
   * nombre se quedan marcadas con el valor de otro material.
   *
   * La alternativa era un `key` en la ruta desde el router, que es más limpio pero
   * añade una pieza al shell para un caso que sólo ocurre en un sitio. Aquí se
   * resuelve con el `slug` como dependencia, y el aviso es el mismo que ya hay en
   * el `key` de la entrada del artículo.
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

  const alternar = alternarVariable;

  const reglas = useMemo(() => (guia ? reglasQueSalen(guia, elegidas) : []), [guia, elegidas]);
  const tarjetas = useMemo(
    () => (guia ? conocimientoVisible(guia, elegidas) : []),
    [guia, elegidas]
  );

  if (!guia) {
    return (
      <div className="guia guia--vacia">
        <div className="guia-caja">
          <h1>Esa guía no existe</h1>
          {slug && (
            <p>
              No hay nada en <code>/wiki/{slug}</code>. Puede que el enlace sea de
              una versión anterior.
            </p>
          )}
          <p>
            <Link className="guia-enlace" to="/wiki">
              Ver los problemas que sí están cubiertos
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="guia" key={guia.slug}>
      <Cabecera guia={guia} />

      {/*
        La barra de los datos del archivo va entre la cabecera y el diferencial, y
        el orden es la decisión: es la única parte de la página que habla de **tu**
        pieza, y las tres preguntas del diferencial se contestan mirando la pieza.
        Ponerla después de las variables la haría llegar cuando ya has declarado a
        mano el material que el archivo ya te decía.

        No aparece sin archivo, ni aparece en las guías que no declaran ningún
        campo: en los dos casos devuelve `null` y no deja nada detrás.
      */}
      <TuArchivo guia={guia} />

      <EtapaDiferencial guia={guia} />

      <EtapaVariables
        guia={guia}
        elegidas={elegidas}
        alternar={alternar}
        reglas={reglas.length}
      />

      <EtapaConocimiento guia={guia} tarjetas={tarjetas} elegidas={elegidas} alternar={alternar} />

      <EtapaRecomendacion reglas={reglas} metadata={metadata} />

      <FueraDeAlcance guia={guia} />

      <section className="guia-fuentes">
        <h2 className="etapa-titulo">
          <span className="etapa-num">·</span> De dónde sale esto
        </h2>
        <p className="guia-fuentes-nota">
          Las {guia.fuentes.length} fuentes que respaldan esta guía. Cada cifra y
          cada acción de arriba lleva la suya.
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
}

/* -------------------------------------------------------------------------- */

function Cabecera({ guia }: { guia: Guia }) {
  return (
    <header className="guia-cabecera">
      <DibujoSintoma dibujo={guia.dibujo} grande className="guia-cabecera-dibujo" />
      <div className="guia-cabecera-texto">
        <p className="guia-cabecera-migas">
          <Link to="/wiki">Wiki 3D</Link>
        </p>
        <h1>{guia.sintoma}</h1>
        <p className="guia-cabecera-resumen">{guia.resumen}</p>
        <p className="guia-cabecera-meta">
          <span className="insignia">{guia.minutos} min</span>
          {guia.campos && guia.campos.length > 0 && (
            <span className="insignia insignia--acento">
              Explica {guia.campos.join(' y ')} del panel
            </span>
          )}
        </p>
      </div>
    </header>
  );
}

/**
 * Etapa 1 · El diferencial.
 *
 * Cada comprobación son dos tarjetas enfrentadas: lo que ves si **sí** es este
 * problema, y lo que ves si **no**. Facing cards en vez de una lista porque la
 * pregunta que hace quien lee es «¿lo mío es esto?», y una respuesta sí/no se
 * lee mejor de lado que en prosa.
 */
function EtapaDiferencial({ guia }: { guia: Guia }) {
  return (
    <section className="etapa etapa--diferencial">
      {/*
        El título dice «descártalo como X» y no «comprueba que es Y».
        *
        Es la misma información en las dos direcciones, pero llega distinta. «Comprueba
        que es warping» exige que quien lee ya sepa lo que es el warping; «descártalo
        como separación entre capas» sólo exige que mire su pieza. Y quien llega aquí
        todavía no sabe qué tiene: lo que sabe es que algo se levanta.

        Por eso sale `diferencial.contra` y no `titulo`. La primera versión usaba
        `titulo.toLowerCase()` y pintaba «comprueba que es warping en pla»: en minúsculas,
        PLA deja de ser PLA y la guía se convierte en un acertijo.
      */}
      <h2 className="etapa-titulo">
        <span className="etapa-num">1</span> Antes de tocar nada: descártalo como{' '}
        {guia.diferencial.contra}
      </h2>
      <p className="etapa-intro">
        Lo que más se confunde con esto es {guia.diferencial.contra}. Estas son las
        preguntas que lo distinguen, y todas se responden mirando la pieza, sin
        cambiar un solo ajuste.
      </p>

      <div className="diferencial">
        {guia.diferencial.comprobaciones.map((c) => (
          <article className="diferencial-fila" key={c.id}>
            <p className="diferencial-mira">{c.mira}</p>
            <div className="diferencial-pares">
              <div className="diferencial-cara diferencial-cara--si">
                <p className="diferencial-veredicto">Sí</p>
                <p>
                  <Negrita>{c.si}</Negrita>
                </p>
              </div>
              <div className="diferencial-cara diferencial-cara--no">
                <p className="diferencial-veredicto">No</p>
                <p>
                  <Negrita>{c.no}</Negrita>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {guia.diferencial.siNo && (
        <p className="diferencial-salida">
          <span>Si las tres te dicen que no, no es este problema.</span>
          <Link className="boton boton--ruta" to={`/wiki/${guia.diferencial.siNo.guia}`}>
            {guia.diferencial.siNo.etiqueta}
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      )}
    </section>
  );
}

/**
 * Etapa 2 · Las variables.
 *
 * Cada grupo es una fila de botones con `aria-pressed`, y volver a pulsar el que
 * está marcado lo desmarca. Poder arrepentirse importa: una guía que no
 * deja volver atrás obliga a acertar a la primera, y acertar a la primera es
 * justo lo que no se puede pedir a alguien que está diagnosing por primera vez.
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
  reglas: number;
}) {
  const orden = variablesEnOrden(guia);
  const contestadas = guia.variables.filter((v) => elegidas[v.id] !== undefined).length;

  return (
    <section className="etapa etapa--variables">
      <h2 className="etapa-titulo">
        <span className="etapa-num">2</span> Tu montaje
      </h2>
      <p className="etapa-intro">
        {contestadas === 0
          ? 'Marca lo que puedas. Cada respuesta acorta lo que hay que mirar: las tarjetas que no aplican desaparecen y la lista de abajo cambia.'
          : `${contestadas} de ${guia.variables.length} contestadas · ${reglas} ${reglas === 1 ? 'acción' : 'acciones'} que se pueden aplicar ya.`}
      </p>

      {/*
        El diagnóstico en línea. En escritorio vive en el carril, a la derecha y a
        la vista; por debajo de 1200 el carril cae al final de la página —el shell
        lo apila debajo de la guía—, así que el contador se trae aquí, junto al
        control que lo mueve. Los dos montan el mismo componente, así que no pueden
        decir números distintos.
      */}
      <div className="guia-diagnostico">
        <DiagnosticoGuia guia={guia} />
      </div>

      <div className="variables">
        {orden.map((variable) => (
          <GrupoVariable
            key={variable.id}
            variable={variable}
            elegida={elegidas[variable.id]}
            alternar={alternar}
          />
        ))}
      </div>

      {/*
        El atajo a la recomendación. Con doce tarjetas de conocimiento entre las
        variables y las acciones, quien ya sabe lo que hace tiene que poder saltar
        sin atravesarlas. Sólo aparece cuando hay algo a lo que saltar.
      */}
      {reglas > 0 && (
        <p className="guia-atajo">
          <a className="enlace-guia" href="#recomendacion">
            {reglas === 1 ? 'Ir a la acción' : `Ir a las ${reglas} acciones`}
            <span aria-hidden="true"> ↓</span>
          </a>
        </p>
      )}
    </section>
  );
}

function GrupoVariable({
  variable,
  elegida,
  alternar,
}: {
  variable: Variable;
  elegida: string | undefined;
  alternar: (variable: string, opcion: string) => void;
}) {
  return (
    <fieldset className="variable" id={idVariable(variable.id)}>
      {/*
        El `id` es el destino del enlace de la barra «Tu archivo» cuando la variable
        recoge un campo del panel, y se calcula con `anclaVariable` para que el
        atributo y el `href` no puedan separarse: los dos salen de la misma función
        y `verify:guias` comprueba que el prefijo es el que la barra usa.

        Es un `id` y no un atributo inventado a propósito. Con un atributo propio el
        enlace habría que resolverlo en JavaScript, y el HTML exportado para
        GitHub Pages —que no lo ejecuta— se quedaría sin destino: un enlace que
        funciona con JavaScript y no sin él es la peor de las dos.
      */}
      <legend className="variable-titulo">
        {variable.etiqueta}
        {variable.necesaria && (
          <span className="variable-requerida" title="Sin esto la recomendación no se puede afinar">
            necesaria
          </span>
        )}
      </legend>
      <p className="variable-para">{variable.para}</p>
      <ul className="variable-opciones">
        {variable.opciones.map((o: Opcion) => {
          const activo = elegida === o.id;
          return (
            <li key={o.id}>
              <button
                type="button"
                className={`chip${activo ? ' chip--activo' : ''}`}
                aria-pressed={activo}
                onClick={() => alternar(variable.id, o.id)}
              >
                <span className="chip-texto">{o.etiqueta}</span>
                {o.detalle && <span className="chip-detalle">{o.detalle}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

/**
 * Etapa 3 · El conocimiento.
 *
 * Sólo sale lo que tus variables hacen pertinente, y cada tarjeta trae su cifra y
 * su cita. La cita va corta y literal a propósito: es la prueba de que el dato no
 * es una opinion, y una cita larga sería prosa con otro formato.
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
    <section className="etapa etapa--conocimiento">
      <h2 className="etapa-titulo">
        <span className="etapa-num">3</span> Lo que necesitas saber
      </h2>
      <p className="etapa-intro">
        {tarjetas.length === guia.conocimiento.length
          ? `Las ${tarjetas.length} tarjetas de esta guía. Marca algo arriba y las que no apliquen se irán.`
          : `${tarjetas.length} de ${guia.conocimiento.length} tarjetas: las que no se han filtrado son las que no aplican a lo que has marcado.`}
      </p>

      {tarjetas.length === 0 ? (
        <p className="etapa-vacia">
          Con lo que has marcado hasta ahora no hace falta ningún dato más. La
          recomendación de abajo ya es completa para tu caso.
        </p>
      ) : (
        <div className="tarjetas">
          {tarjetas.map((t) => (
            <article className="tarjeta" key={t.id} id={idConocimiento(t.id)}>
              <h3 className="tarjeta-titulo">
                {t.titulo}
                {t.cifra && (
                  <span className="tarjeta-cifra">
                    <strong>{t.cifra.valor}</strong>
                    <em>{t.cifra.nota}</em>
                  </span>
                )}
              </h3>
              <p className="tarjeta-cuerpo">
                <Negrita>{t.cuerpo}</Negrita>
              </p>
              {t.cita && (
                <blockquote className="tarjeta-cita">
                  <p>{t.cita.texto}</p>
                  <cite>
                    <a href={t.cita.fuente} target="_blank" rel="noopener noreferrer">
                      {anfitrion(t.cita.fuente)}
                    </a>
                  </cite>
                </blockquote>
              )}
              {t.enlaza && <EnlaceGuia guia={t.enlaza.guia} etiqueta={t.enlaza.etiqueta} />}
            </article>
          ))}
        </div>
      )}

      {/* Botón de desmarcar todo, sólo si hay algo que desmarcar. */}
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
 * Cada acción lleva su valor, su porqué y su fuente, y el alcance cuando la
 * fuente acota lo que recomienda. Ese bloque es lo que separa una recomendación
 * de un consejo.
 */
function EtapaRecomendacion({
  reglas,
  metadata,
}: {
  reglas: Guia['reglas'];
  metadata: ProjectMetadata | null;
}) {
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
          <p className="etapa-intro">
            {reglas.length === 1 ? '1 acción' : `${reglas.length} acciones`} que se
            aplican a tu caso. Las tres primeras son los pasos que el fabricante da por buenos de
            entrada; a partir de ahí el orden es nuestro, no de la fuente.
          </p>
          <ol className="acciones">
            {reglas.map((r, i) => (
              <li className="accion" key={r.id} style={{ '--i': i } as React.CSSProperties}>
                <div className="accion-cabeza">
                  <span className="accion-orden" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="accion-titulo">
                    <h3>{r.accion}</h3>
                    {r.valor && <p className="accion-valor">{r.valor}</p>}
                  </div>
                </div>
                <Comparacion regla={r} metadata={metadata} />
                <p className="accion-porque">
                  <Negrita>{r.porque}</Negrita>
                </p>
                {r.alcance && (
                  <p className="accion-alcance">
                    <Negrita>{r.alcance}</Negrita>
                  </p>
                )}
                <p className="accion-fuente">
                  <span>{r.fuente}</span>
                </p>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
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
      <h2 className="etapa-titulo">
        <span className="etapa-num">·</span> Esto no lo resuelve
      </h2>
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

/** Un enlace a otra guía. El tercer sitio donde la wiki se interconecta. */
function EnlaceGuia({ guia, etiqueta }: { guia: string; etiqueta: string }) {
  return (
    <Link className="enlace-guia" to={`/wiki/${guia}`}>
      {etiqueta}
      <span aria-hidden="true"> →</span>
    </Link>
  );
}

/** El anfitrión de una URL, sin la ruta. */
function anfitrion(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}