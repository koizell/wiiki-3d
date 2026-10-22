import { motion } from 'motion/react';
import { useMovimiento } from '../../lib/movimiento';

/**
 * Las cuatro etapas de la guía, con su estado.
 *
 * Antes eran cuatro botones que saltaban por ancla: un enlace a `#diagnostico`,
 * `#montaje`… Un enlace no dice dónde estás, sólo te lleva. Y el contador —«2 de 3
 * variables, 3 acciones»— estaba en el carril derecho, que en el tramo de 768 a
 * 1199 px cae al final de la página, a miles de píxeles del control que lo provoca.
 *
 * Ahora el recorrido **está en la guía** y cada etapa dice su estado. Es la misma
 * información que había, puesta donde se usa.
 *
 * Los botones son botones de verdad y no enlaces: cambian el estado, no la URL.
 * La URL no cambia porque la guía es un documento, no una aplicación, y un lector
 * que recibe el enlace tiene que ver lo mismo que quien está interactuando.
 */
export default function StepperEtapas({
  contestadas,
  totalVariables,
  acciones,
  tarjetas,
  activa,
}: {
  contestadas: number;
  totalVariables: number;
  acciones: number;
  tarjetas: number;
  /** La etapa en la que se está leyendo ahora. */
  activa: number;
}) {
  const { animar, entrada } = useMovimiento();

  /*
   * Las etapas y su ancla.
   *
   * Son **enlaces** y no botones, porque el destino tiene que ser la URL: quien
   * recibe un enlace con `#conocimiento` tiene que llegar a la etapa 3, y un
   * botón que moviera el scroll sin tocar la URL dejaría de poder enlazarse.
   */
  const etapas = [
    { numero: '1', titulo: 'Descártalo', estado: '3 preguntas', ancla: 'diagnostico' },
    { numero: '2', titulo: 'Tu montaje', estado: `${contestadas} de ${totalVariables}`, ancla: 'montaje' },
    { numero: '3', titulo: 'Saber', estado: `${tarjetas} tarjetas`, ancla: 'conocimiento' },
    { numero: '4', titulo: 'Acciones', estado: `${acciones} acciones`, ancla: 'recomendacion' },
  ];

  return (
    <motion.nav
      className="guia-recorrido"
      aria-label="Recorrido de la guía"
      initial={animar ? "oculto" : false}
      animate="visible"
      variants={entrada}
    >
      <ol className="guia-recorrido-lista">
        {etapas.map((etapa, indice) => {
          const esActiva = indice === activa;
          return (
          <li key={etapa.numero}>
            <a
              className={`guia-paso${esActiva ? ' guia-paso--activo' : ''}`}
              href={`#${etapa.ancla}`}
              aria-current={esActiva ? 'step' : undefined}
            >
              <span className="guia-paso-numero" aria-hidden="true">
                {etapa.numero}
              </span>
              <span className="guia-paso-texto">
                <span className="guia-paso-titulo">{etapa.titulo}</span>
                <span className="guia-paso-estado">{etapa.estado}</span>
              </span>
            </a>
          </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
