import { useMemo } from 'react';
import { useAnalysis } from '../state/useAnalysis';
import { enlazados, leerTuArchivo } from '../lib/tu-archivo';
import { MODO_CLASIFICACION } from '../services/JevService';
import type { Guia } from '../content/guias/tipos';
import { materialUnico } from '../lib/materiales';

/**
 * La barra «Tu archivo»: lo que el G-code dice, y dónde lo explica esta guía.
 *
 * ## Por qué está dentro de la guía y no en la columna de la derecha
 *
 * Porque en las rutas de la wiki la columna no es el panel de análisis —eso es
 * `RUTAS_ANALISIS` en `App.tsx`—, sino el riel del diagnóstico. Quien llega a
 * `/wiki/warping-pla` con un archivo cargado no tenía **ningún** sitio donde ver
 * sus datos: el panel se sustituyó por el riel, y el riel dice cuántas acciones hay
 * pero no dice cuáles son las suyas. Esta barra es ese sitio, y por eso aparece
 * arriba, justo antes del diferencial: es el dato que contesta a las tres
 * preguntas de la etapa 1.
 *
 * ## Por qué no aparece nunca vacía
 *
 * Sin archivo no se pinta nada, ni una caja, ni un título, ni un guion. Tres
 * razones y ninguna es estética:
 *
 * 1. Quien llega por un buscador no ha subido nada, y una barra vacía con el
 *    título «Tu archivo» es una promesa que la página no puede cumplir.
 * 2. El HTML exportado para GitHub Pages se genera con el contexto de análisis
 *    vacío, así que una barra que se reservara el espacio publicaría una caja
 *    muerta en las cuatro guías sin JavaScript.
 * 3. El espacio se nota. Una franja de 90 px con un borde por el medio de la
 *    lectura es de las cosas que hacen que una página parezca un plantilla.
 *
 * Y una guía que no declara ningún campo tampoco lo pinta, aunque haya archivo:
 * es lo que pasa con `adhesion-primera-capa`, que no explica ningún campo del
 * panel. Enseñar el material ahí sí; enseñar la altura de capa no.
 */
export default function TuArchivo({ guia }: { guia: Guia }) {
  const { metadata, classification } = useAnalysis();

  const lectura = useMemo(
    () => leerTuArchivo(guia, metadata, classification, MODO_CLASIFICACION),
    [guia, metadata, classification]
  );

  if (!metadata || lectura.datos.length === 0) return null;

  const conEnlaces = enlazados(lectura);
  const materialAmbiguo = !materialUnico(metadata.material);
  const conDemo =
    !materialAmbiguo && MODO_CLASIFICACION === 'demo' && lectura.datos.some((d) => d.origen === 'panel' && d.valor !== null);

  return (
    <section className="tu-archivo" aria-labelledby="tu-archivo-titulo">
      <div className="tu-archivo-cabecera">
        {/*
          `h2` y no `p`: es una sección de la página y va debajo del `h1` de la
          guía, así que le corresponde el nivel 2. Con `p` la jerarquía saltaría del
          1 al 3 de las etapas y quien navega por encabezados perdería el tramo.

          Y el `id` del título es el que usa `aria-labelledby`, no un `aria-label`
          con el mismo texto: el nombre accesible sale del elemento visible, así
          que no hay dos textos que puedan desincronizarse.
        */}
        <h2 className="tu-archivo-titulo" id="tu-archivo-titulo">
          Tu archivo
          {/*
            El nombre del fichero va con `title` y no como texto suelto. Es
            contexto —«¿es el mío?»— y no un dato, así que no compite con las
            cifras; pero truncado con puntos suspensivos y en su `title` completo,
            que es donde se lee sin que se desborde en móvil.
          */}
          <span className="tu-archivo-nombre" title={metadata.filename}>
            {metadata.filename}
          </span>
        </h2>
      </div>

      <ul className="tu-archivo-datos">
        {lectura.datos.map((dato) => {
          const cuerpo = (
            <>
              <span className="tu-archivo-campo">{dato.etiqueta}</span>
              <span className={dato.valor === null ? 'tu-archivo-valor tu-archivo-valor--ausente' : 'tu-archivo-valor'}>
                {dato.valor ?? textoAusente(dato.origen)}
              </span>
            </>
          );

          return (
            <li className="tu-archivo-item" key={dato.campo}>
              {/*
                El enlace envuelve a las dos etiquetas, campo y valor, y no sólo al
                valor. El área entera es pulsable —que a 44 px de alto es lo que
                hace falta para el dedo— y el nombre accesible sale de las dos, sin
                `aria-label` que pueda contradecir lo que se ve.

                El `li` y el enlace llevan clases distintas a propósito. Con la
                misma, `.tu-archivo-dato` seleccionaba los dos elementos y
                `verify:wiki` contaba ocho datos donde hay cuatro, y además habría
                que distinguir «el que tiene `href`» de «el que no» para pintar el
                enlace. La lista es estructura y el enlace es la acción.

                Y el `href` es un ancla interna, así que `verify:wiki` comprueba que
                el destino existe de verdad en el DOM y no sólo que el atributo
                está bien escrito.
              */}
              {dato.ancla ? (
                <a className="tu-archivo-dato tu-archivo-dato--enlace" href={dato.ancla}>
                  {cuerpo}
                </a>
              ) : (
                <span className="tu-archivo-dato">{cuerpo}</span>
              )}
            </li>
          );
        })}
      </ul>

      {/*
        Dos notas, y sólo cuando aplican. La primera es sobre los datos que
        faltan, que es la que más gente va a ver: un slicer que no escribe la
        temperatura de cama es lo normal, y decirlo evita que la fila vacía se lea
        como un fallo de la página.

        La segunda es la del modo de la clasificación. En las rutas de la wiki no
        hay insignia de «Demo» —la del panel no se monta ahí—, así que un
        `warpingRisk` sin decir de dónde sale parecería una medición de un
        servicio. Es exactamente lo que el panel ya declara y lo que aquí hay que
        repetir porque aquí no hay panel.
      */}
      {lectura.conValor < lectura.datos.length && (
        <p className="tu-archivo-nota">
          {lectura.conValor === 0
            ? 'Tu archivo no trae ninguno de estos datos: el slicer no los escribió en la cabecera.'
            : `${lectura.datos.length - lectura.conValor} de estos datos no están en tu archivo. La guía los explica igual.`}
        </p>
      )}
      {conDemo && (
        <p className="tu-archivo-nota tu-archivo-nota--demo">
          El veredicto es una estimación de demostración: se calcula en tu navegador y no se
          envía nada a ningún servicio. El índice de 0 a 100 no es una probabilidad de fallo
          validada ni garantiza el resultado de la impresión.
        </p>
      )}
      {materialAmbiguo && <p className="tu-archivo-nota">La cabecera declara varios materiales: no hay una valoración única. Elige manualmente el material que usas en esta pieza.</p>}
      {conEnlaces > 0 && (
        <p className="tu-archivo-pista">Pulsa un dato para ver dónde lo explica esta guía.</p>
      )}
    </section>
  );
}

/**
 * Cómo se escribe un dato que falta.
 *
 * Dos textos y no uno, porque las dos ausencias no son la misma cosa. Un campo de
 * la cabecera del G-code que el slicer no escribió es un hueco conocido, con
 * nombre propio; un veredicto que no está es que la clasificación no se ha
 * hecho, y en ese caso escribir «el slicer no lo escribió» sería mentira: de
 * eso no fue el slicer.
 */
function textoAusente(origen: 'archivo' | 'panel'): string {
  return origen === 'panel' ? 'sin clasificar' : 'no lo escribió tu slicer';
}
