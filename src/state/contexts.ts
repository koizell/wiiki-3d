import { createContext, type RefObject } from 'react';
import type { AnalysisStatus } from '../components/AnalysisPanel';
import type { JevClassification, ProjectMetadata } from '../services/types';
import type { FileType } from '../lib/files';

/**
 * Los dos contextos del análisis y sus tipos.
 *
 * Viven aparte del proveedor, y no dentro de él, por la misma razón por la que
 * los hooks están en `useAnalysis.ts`: `react-refresh/only-export-components` no
 * admite que un fichero exporte componentes y además contextos o constantes,
 * porque entonces la recarga en caliente de Vite deja de funcionar en desarrollo.
 *
 * Los contextos se declaran aquí y no se usan aquí: los consume el proveedor que
 * los da y los hooks que los leen. Declararlos juntos es lo que permite que el
 * valor por defecto sea `null` en los dos sitios, y que un consumidor fuera del
 * proveedor falle con un mensaje claro en lugar de recibir `undefined`.
 */

/** Los valores que describen el archivo cargado y su análisis. */
export interface AnalysisState {
  file: File | null;
  fileType: FileType | null;
  metadata: ProjectMetadata | null;
  classification: JevClassification | null;
  status: AnalysisStatus;
  error: string | null;
}

/** Las acciones que cambian el estado, más el disparador del selector de ficheros. */
export interface AnalysisActions {
  /** Carga un fichero y arranca el análisis si el formato lo permite. */
  loadFile: (file: File) => void;
  /** Descarta el archivo y vuelve al estado de primera vez. */
  clearFile: () => void;
  /**
   * Vuelve a poner en el estado un análisis que estaba guardado en el historial.
   *
   * **`file` queda a `null`, y eso es lo importante.** P2 decidió que no se
   * guarda el archivo, sólo el análisis, así que no hay `File` que reconstruir.
   * Fabricar uno de cero bytes para que las vistas no se enteren sería una
   * mentira en el modelo de datos: el visor 3D lo abriría y fallaría, y alguien
   * acabaría intentando leerlo.
   *
   * Por eso `file: null` con `metadata` y `classification` puestos es un estado
   * de verdad —«hay un análisis pero no hay archivo»— y lo que tiene que hacer
   * cada vista con él es su trabajo, no un parche.
   */
  restaurarAnalisis: (entrada: EntradaRestaurable) => void;
  /**
   * Abre el diálogo del sistema para elegir fichero.
   *
   * Vive aquí porque hay dos botones que abren **el mismo** input —el de la barra
   * superior y el de la zona de subida— y están en ramas distintas del árbol. Sin
   * el contexto, uno de los dos tendría que buscar el input en la página.
   */
  openFilePicker: () => void;
  /**
   * El `<input type="file">` que hay que pintar con este ref, para que
   * `openFilePicker` tenga algo que pulsar.
   *
   * El input se pinta en el shell (`App.tsx`), que es donde toca; por el contexto
   * sólo viaja el ref que hay que engancharle.
   */
  fileInputRef: RefObject<HTMLInputElement | null>;
}

/**
 * Lo mínimo que hace falta para devolver un análisis a la pantalla.
 *
 * Es un tipo propio, y no `EntradaHistorial`, porque **lo que se restaura no es
 * la entrada del historial sino su contenido**: el `id` y la `fecha` no tienen
 * dónde pintarse —el fichero se sabe por su nombre—, y atar la acción a la
 * forma del almacén haría que cambiar `EntradaHistorial` tocara la lógica.
 */
export type EntradaRestaurable = {
  fileType: FileType;
  metadata: ProjectMetadata;
  classification: JevClassification;
};

/**
 * Estado del archivo y su análisis. `null` fuera del proveedor, para que el hook
 * pueda distinguir "no hay proveedor" de "hay proveedor pero no hay archivo".
 */
export const StateContext = createContext<AnalysisState | null>(null);

/**
 * Acciones y disparador del selector, en su propio contexto para que un
 * componente que sólo carga, limpia o abre el diálogo no se repinte en cada tick
 * del análisis.
 */
export const ActionsContext = createContext<AnalysisActions | null>(null);