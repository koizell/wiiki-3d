import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type { Regla } from '../../content/guias/tipos';
import { useMovimiento } from '../../lib/movimiento';
import { indicadorDeRegla } from '../../lib/indicadores';
import { Negrita } from '../Negrita';
import Indicador from './Indicador';

/**
 * Una acción: un readout, no un párrafo.
 *
 * ## Lo que cambia
 *
 * Antes la acción era una lista de cinco bloques: el orden, el título con la
 * acción, el valor, el porqué, el alcance y la fuente. Seis cosas para leer, en
 * prosa, y el número —que es lo importante— iba en el mismo cuerpo que el resto.
 *
 * Ahora es un **readout**: el número grande en monoespaciada y en el color del
 * acento, la acción en el título, el porqué en una línea y la fuente al lado. Es el
 * mismo formato que la tabla de temperaturas de la portada, y funciona porque
 * funciona allí.
 *
 * ## La fuente no se abrevia
 *
 * Una acción sin su fuente es un consejo, y el bloque entero —acción, valor,
 * porqué, alcance y fuente— es lo que separa una recomendación de un consejo. Por
 * eso la fuente está en la misma línea que el porqué y no en un renglón aparte: no
 * es que se esconda, es que se lee con lo que explica.
 */
export default function ReadoutAccion({
  regla,
  orden,
  comparacion,
}: {
  regla: Regla;
  /** El número de la acción, counting desde uno. */
  orden: number;
  /** La comparación con el valor del archivo del visitante, si la hay. */
  comparacion?: ReactNode;
}) {
  const { animar, entrada, transicion } = useMovimiento();
  const indicador = indicadorDeRegla(regla.accion, regla.indicador);

  return (
    <motion.li
      className="accion"
      data-regla={regla.id}
      initial={animar ? "oculto" : false}
      animate="visible"
      variants={entrada}
    >
      <div className="accion-cabecera">
        <span className="accion-orden" aria-hidden="true">
          {String(orden).padStart(2, '0')}
        </span>
        {indicador && <Indicador indicador={indicador} className="accion-indicador" />}
        <h3 className="accion-titulo">{regla.accion}</h3>
        {regla.valor && <p className="accion-valor">{regla.valor}</p>}
      </div>

      {comparacion}

      {/*
        El porqué y el alcance van con `Negrita`, que es el componente que
        interpreta los `**` del contenido. 24 de las 583 reglas los traen, y sin
        este componente saldrían los asteriscos a la vista.
      */}
      <p className="accion-porque">
        <Negrita>{regla.porque}</Negrita>
      </p>

      {regla.alcance && (
        <p className="accion-alcance">
          <Negrita>{regla.alcance}</Negrita>
        </p>
      )}

      <motion.p
        className="accion-fuente"
        initial={animar ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={transicion('entrada')}
      >
        <span>FUENTE · {regla.fuente}</span>
      </motion.p>

      {/*
        El enlace a la guía que desarrolla esta acción.

        Es lo que permite que una guía **enrute** en vez de repetir: la ruta de
        calibración no reescribe los tests, lleva a la guía que sí los explica. Sin
        este enlace, una guía que enruta tendría que calcar el contenido, y calcar
        el contenido es exactamente lo que esta wiki no hace.
      */}
      {regla.enlaza && (
        <p className="accion-enlace">
          <a className="enlace-guia" href={regla.enlaza.guia}>
            {regla.enlaza.etiqueta}
            <span aria-hidden="true"> →</span>
          </a>
        </p>
      )}
    </motion.li>
  );
}
