import { createContext } from 'react';

/**
 * El contrato del estado de la guía, y el contexto vacío.
 *
 * Vive en un fichero propio y no junto al proveedor ni junto al hook, por dos reglas
 * de `react-refresh/only-export-components`:
 *
 * - Un fichero que exporta un componente **y** un hook no recarga en caliente.
 * - Un fichero que exporta un componente **y** una constante tampoco.
 *
 * Con las tres piezas separadas —el contexto aquí, el proveedor en `useGuia.tsx` y el
 * hook en `useGuia.ts`— el proveedor sí recarga en caliente, que es lo único que
 * importa durante el desarrollo de una guía: se cambia el contenido, se marca un chip
 * y se ve el resultado sin que se pierda la respuesta.
 */

/** Lo que la guía y el carril comparten. */
export interface EstadoGuia {
  /** Variable → opción marcada. */
  elegidas: Record<string, string>;
  /** Marca una opción, o la desmarca si ya estaba marcada. */
  alternar: (variable: string, opcion: string) => void;
  /** Reemplaza el estado entero. Lo usa la guía al precontestar lo del G-code. */
  setElegidas: (elegidas: Record<string, string>) => void;
  /** Borra todas las respuestas. */
  limpiar: () => void;
  /**
   * Comprobación del diferencial → respuesta.
   *
   * El diferencial es un filtro con salida: se contesta «sí» o «no» a cada
   * comprobación, y sólo entonces se sabe si el problema es este o el de al lado.
   *
   * **Contestar es opcional.** Sin respuesta, la comprobación se enseña con su
   * pregunta y sin veredicto: es la pregunta la que dice qué mirar, y el texto de
   * las dos caras está ahí para quien lo quiera leer. Lo que se guarda es sólo la
   * respuesta, porque el veredicto **se pinta** al contestar y no antes — que es
   * justo lo que convierte un muro de texto en un filtro.
   */
  diferencial: Record<string, 'si' | 'no'>;
  /** Contesta una comprobación, o la deja sin contestar si ya lo estaba. */
  alternarDiferencial: (comprobacion: string, respuesta: 'si' | 'no') => void;
}

export const ContextoGuia = createContext<EstadoGuia | null>(null);