import type { IndicadorAccion, IndicadorTema } from '../../content/guias/tipos';
import { ETIQUETA, GLIFO } from '../../lib/indicadores';

/**
 * El indicador visual de un elemento de la guía.
 *
 * Un glifo y su nombre. El glifo va en `aria-hidden` porque **nunca es el único
 * canal**: la acción dice «Sube la temperatura de cama» y el tema dice de qué va la
 * tarjeta. El indicador es lo que permite entenderlo de un vistazo, no lo que
 * permite saberlo.
 *
 * El nombre va en el `title`, que es lo que lee quien pasa el ratón por encima.
 */
export default function Indicador({
  indicador,
  className,
}: {
  indicador: IndicadorAccion | IndicadorTema;
  className?: string;
}) {
  return (
    <span
      className={`indicador${className ? ' ' + className : ''}`}
      aria-hidden="true"
      title={ETIQUETA[indicador]}
    >
      {GLIFO[indicador]}
    </span>
  );
}
