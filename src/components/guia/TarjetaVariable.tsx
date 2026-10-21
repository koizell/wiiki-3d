import { motion } from 'motion/react';
import type { Variable } from '../../content/guias/tipos';
import { idVariable } from '../../lib/tu-archivo';
import { useMovimiento } from '../../lib/movimiento';
import Indicador from './Indicador';

/**
 * Una variable: lo que se declara de tu montaje.
 *
 * ## Lo que cambia
 *
 * Antes era un `fieldset` con una pregunta y una fila de **chips de texto**. Un chip
 * es una palabra suelta: «Textured PEI» sin más dice el nombre de la chapa y nada
 * de lo que implica.
 *
 * Ahora la opción es una **tarjeta**: el nombre y, debajo, el `detalle` que ya
 * estaba escrito en el contenido —«PLA: 35–45 °C»— y que antes sólo se leía si
 * alguien sabía que el chip tenía un segundo renglón escondido.
 *
 * Al marcar, la tarjeta se dibuja con el **trazo azul** de la spec §6: aparece en
 * su sitio, con `scaleX`, sin desplazamiento. Es la confirmación de que la
 * respuesta se ha tomado, y es la única animación de esta pantalla que depende de
 * una interacción.
 */
export default function TarjetaVariable({
  variable,
  elegida,
  onAlternar,
}: {
  variable: Variable;
  /** El id de la opción marcada, si la hay. */
  elegida?: string;
  onAlternar: (opcion: string) => void;
}) {
  const { animar, transicion, entrada } = useMovimiento();

  return (
    <motion.fieldset
      className="variable"
      id={idVariable(variable.id)}
      initial={animar ? "oculto" : false}
      animate="visible"
      variants={entrada}
    >
      <legend className="variable-titulo">
        {variable.indicador && <Indicador indicador={variable.indicador} />}
        <span className="variable-texto">{variable.etiqueta}</span>
        {variable.necesaria && (
          <span className="variable-requerida" title="Sin esto la recomendación no se puede afinar">
            necesaria
          </span>
        )}
      </legend>

      <p className="variable-para">{variable.para}</p>

      <ul className="variable-opciones">
        {variable.opciones.map((opcion) => {
          const activa = elegida === opcion.id;
          return (
            <li key={opcion.id}>
              <button
                type="button"
                className={`chip${activa ? ' chip--activo' : ''}`}
                aria-pressed={activa}
                onClick={() => onAlternar(opcion.id)}
              >
                <span className="chip-texto">{opcion.etiqueta}</span>
                {opcion.detalle && <span className="chip-detalle">{opcion.detalle}</span>}
                {/*
                  El trazo azul de `confirmar`.

                  Va en un `span` propio y no en el botón porque el botón tiene su
                  propio fondo y su propio borde: el trazo es la **confirmación** de
                  que la respuesta se ha tomado, y tiene que verse por encima del
                  borde para que se lea como un trazo y no como un borde más.
                */}
                {activa && (
                  <motion.span
                    className="opcion-trazo"
                    aria-hidden="true"
                    initial={animar ? { scaleX: 0 } : false}
                    animate={{ scaleX: 1 }}
                    transition={transicion('trazo')}
                    style={{ originX: 0 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.fieldset>
  );
}
