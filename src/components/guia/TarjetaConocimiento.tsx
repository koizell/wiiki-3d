import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type { Conocimiento } from '../../content/guias/tipos';
import { idConocimiento } from '../../lib/tu-archivo';
import { useMovimiento } from '../../lib/movimiento';
import { Negrita } from '../Negrita';
import Indicador from './Indicador';

/**
 * Una tarjeta de conocimiento: la cifra manda y el texto va en puntos.
 *
 * ## Lo que cambia
 *
 * Antes la tarjeta era un `h3` con su `cifra` al lado, un párrafo de 336 caracteres
 * de media y un `blockquote` con la cita. La cita ocupaba más sitio que el
 * contenido, y el párrafo era un bloque.
 *
 * Ahora:
 *
 * - La **cifra** es el ancla visual: va en grande, en monoespaciada y en el color
 *   del acento, con su nota de alcance debajo. El campo `cifra` del contrato ya
 *   existía y casi no se usaba; aquí es lo que se ve primero.
 * - El cuerpo son **puntos**, no un párrafo. El contenido es el mismo —el troceado
 *   es mecánico y el cotejo lo demuestra— pero separado en líneas, que se leen de
 *   un vistazo.
 * - La **cita** baja a una línea de pie, con su atribución y su enlace a las
 *   fuentes de la guía.
 *
 * ## Lo que no cambia
 *
 * La nota de alcance de la cifra, la cita literal y su atribución, y el enlace a
 * la otra guía. Lo que no se puede abreviar es la prueba.
 */
export default function TarjetaConocimiento({
  tarjeta,
  enlaza,
  extra,
}: {
  tarjeta: Conocimiento;
  /** El enlace a otra guía, si la tarjeta lo declara. */
  enlaza?: { guia: string; etiqueta: string };
  /** Un esquema o una ilustración que va dentro de la tarjeta. */
  extra?: ReactNode;
}) {
  const { animar, entrada, transicion } = useMovimiento();
  const puntos = tarjeta.puntos ?? [tarjeta.cuerpo];

  return (
    <motion.article
      className="tarjeta"
      id={idConocimiento(tarjeta.id)}
      initial={animar ? "oculto" : false}
      animate="visible"
      variants={entrada}
    >
      <header className="tarjeta-cabecera">
        <h3 className="tarjeta-titulo">
          {tarjeta.indicador && <Indicador indicador={tarjeta.indicador} />}
          <span>{tarjeta.titulo}</span>
        </h3>
        {tarjeta.cifra && (
          <p className="tarjeta-cifra">
            <strong>{tarjeta.cifra.valor}</strong>
            <em>{tarjeta.cifra.nota}</em>
          </p>
        )}
      </header>

      <ul className="tarjeta-puntos">
        {puntos.map((punto, indice) => (
          <li key={indice}>
            <Negrita>{punto}</Negrita>
          </li>
        ))}
      </ul>

      {extra}

      {tarjeta.cita && (
        <motion.p
          className="tarjeta-cita"
          initial={animar ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={transicion('entrada')}
        >
          <span className="tarjeta-cita-texto">« {tarjeta.cita.texto} »</span>
          <cite className="tarjeta-cita-fuente">
            {tarjeta.cita.fuente}
            {' · '}
            <a href="#fuentes">Ver fuentes de la guía</a>
          </cite>
        </motion.p>
      )}

      {enlaza && (
        <p className="tarjeta-enlace">
          <a className="enlace-guia" href={enlaza.guia}>
            {enlaza.etiqueta}
          </a>
        </p>
      )}
    </motion.article>
  );
}
