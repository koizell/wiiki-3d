import { AnimatePresence, motion } from 'motion/react';
import type { Comprobacion as ComprobacionGuia } from '../../content/guias/tipos';
import { useMovimiento } from '../../lib/movimiento';

/**
 * Una comprobación del diferencial: la pregunta manda y el veredicto llega después.
 *
 * ## Lo que cambia
 *
 * Antes eran **dos tarjetas de texto verde y rojo, enfrentadas**, con el mismo
 * peso, y las tres comprobaciones de la guía ocupaban una pantalla entera antes de
 * poder hacer nada. El lector tenía que leer las seis caras para saber si su
 * problema era el que buscaba.
 *
 * Ahora la **pregunta** es lo grande, y hay dos botones. El veredicto —«es
 * warping» o «es otro problema»— aparece **cuando se contesta**, con su barra de
 * color, y las dos caras se leen debajo en letra pequeña.
 *
 * ## Por qué el texto no se borra
 *
 * Porque la pregunta sola no basta: «¿la base está plana o arqueada?» no dice qué
 * hacer con la respuesta. Las dos caras siguen ahí, debajo, para quien las quiera
 * leer. Lo que cambia es **cuándo** se ven: después de la pregunta, no antes.
 *
 * ## Contestar es opcional
 *
 * Una comprobación sin contestar se queda en la pregunta. Es válido: la pregunta
 * dice qué mirar, y mirar no obliga a contestar.
 */
export default function Comprobacion({
  comprobacion,
  respuesta,
  onResponder,
}: {
  comprobacion: ComprobacionGuia;
  /** La respuesta dada, o `undefined` si no se ha contestado. */
  respuesta?: 'si' | 'no';
  onResponder: (respuesta: 'si' | 'no') => void;
}) {
  const { animar, resultado, transicion } = useMovimiento();
  const contestada = respuesta !== undefined;
  const esSi = respuesta === 'si';

  return (
    <li className="comprobacion">
      <p className="comprobacion-mira">{comprobacion.mira}</p>

      <div className="comprobacion-botones" role="group" aria-label={`Responde a: ${comprobacion.mira}`}>
        <button
          type="button"
          className={`comprobacion-boton comprobacion-boton--si${esSi ? ' comprobacion-boton--activo' : ''}`}
          aria-pressed={esSi}
          onClick={() => onResponder('si')}
        >
          Sí
        </button>
        <button
          type="button"
          className={`comprobacion-boton comprobacion-boton--no${respuesta === 'no' ? ' comprobacion-boton--activo' : ''}`}
          aria-pressed={respuesta === 'no'}
          onClick={() => onResponder('no')}
        >
          No
        </button>
      </div>

      <AnimatePresence initial={false}>
        {contestada && (
          <motion.div
            key={respuesta}
            className={`comprobacion-veredicto comprobacion-veredicto--${respuesta}`}
            initial={animar ? "oculto" : false}
            animate="visible"
            exit={{ opacity: 0, transition: transicion('control') }}
            variants={resultado}
          >
            <span className="comprobacion-veredicto-titulo">
              {esSi ? 'ES ESTE PROBLEMA' : 'ES OTRO PROBLEMA'}
            </span>
            <span className="comprobacion-veredicto-texto">
              {esSi ? comprobacion.si : comprobacion.no}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Las dos caras, sin contestar.

        No desaparecen al contestar: se quedan debajo, en letra pequeña, para quien
        quiera ver la otra respuesta o leer el matiz. Lo que cambia es que ya no
        están **antes** de la pregunta.
      */}
      {!contestada && (
        <details className="comprobacion-detalle">
          <summary>Ver las dos caras</summary>
          <div className="comprobacion-pares">
            <p className="comprobacion-cara">
              <span className="comprobacion-cara-titulo">Sí</span>
              {comprobacion.si}
            </p>
            <p className="comprobacion-cara">
              <span className="comprobacion-cara-titulo">No</span>
              {comprobacion.no}
            </p>
          </div>
        </details>
      )}
    </li>
  );
}
