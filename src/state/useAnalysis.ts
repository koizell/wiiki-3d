import { useContext } from 'react';
import {
  ActionsContext,
  StateContext,
  type AnalysisActions,
  type AnalysisState,
} from './contexts';

/**
 * Lectura del estado del archivo cargado.
 *
 * Va en su propio fichero, y no junto al proveedor, por la regla de
 * `react-refresh/only-export-components`: un fichero que exporta componentes y
 * además funciones o constantes pierde la recarga en caliente de Vite en
 * desarrollo. Los hooks son funciones, no componentes, así que tienen su sitio
 * aparte.
 *
 * Se repinta en cada tick del análisis, que es justo lo que necesita quien lee
 * el estado: quiere verlo avanzar. Para sólo disparar acciones y no repintarse,
 * `useAnalysisActions`.
 *
 * Ambos lanzan fuera del proveedor, para que el error aparezca en desarrollo y no
 * como un `undefined` en producción.
 */
export function useAnalysis(): AnalysisState {
  const ctx = useContext(StateContext);
  if (!ctx) {
    throw new Error('useAnalysis() se ha usado fuera de <AnalysisProvider>');
  }
  return ctx;
}

/**
 * Dispara acciones sobre el análisis sin suscribirse a su estado.
 *
 * Para componentes que sólo necesitan cargar un archivo, limpiarlo o abrir el
 * diálogo de selección, y no se repintan cuando el análisis avanza.
 */
export function useAnalysisActions(): AnalysisActions {
  const ctx = useContext(ActionsContext);
  if (!ctx) {
    throw new Error('useAnalysisActions() se ha usado fuera de <AnalysisProvider>');
  }
  return ctx;
}