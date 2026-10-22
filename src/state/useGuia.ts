import { useContext } from 'react';
import { ContextoGuia } from './guia-contexto';
import type { EstadoGuia } from './guia-contexto';

/**
 * Leer el estado de la guía que se está leyendo.
 *
 * ## Por qué está en su propio fichero
 *
 * Por `react-refresh/only-export-components`. El proveedor vive en
 * `state/useGuia.tsx` y el hook en éste, porque un fichero que exporta un componente
 * **y** una función que no es componente no permite el recarga en caliente del
 * proveedor: cualquier cambio en él obliga a recargar la página entera, y en
 * desarrollo eso significa recargar la wiki mientras se está marcando.
 *
 * No es una preferencia de estilo. `npm run lint` falla, y el fallo es real: el
 * comportamiento de desarrollo se pierde por un detalle de exportación.
 *
 * ## Por qué un valor por defecto y no un `throw`
 *
 * Porque el carril y la guía están en lados distintos del shell, y un `throw` aquí
 * convertiría un fallo de montaje —que se ve en el primer fotograma— en una pantalla
 * en blanco con un error de React en la consola. Con un valor por defecto, la guía se
 * lee sin diagnosticar y el carril pinta su estado vacío, que es un fallo visible y
 * localizado.
 *
 * El valor por defecto tiene `alternar` y `setElegidas` como no-ops deliberados: sin
 * proveedor, pulsar un chip no rompe nada y no cambia nada. Es preferible a una
 * pantalla en blanco.
 */
export function useGuiaEstado(): EstadoGuia {
  const estado = useContext(ContextoGuia);
  if (!estado) {
    return {
      elegidas: {},
      alternar: () => {},
      setElegidas: () => {},
      limpiar: () => {},
      diferencial: {},
      alternarDiferencial: () => {},
    };
  }
  return estado;
}