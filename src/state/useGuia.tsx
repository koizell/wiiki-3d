import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ContextoGuia, type EstadoGuia } from './guia-contexto';

/**
 * El proveedor del estado de la guía que se está leyendo.
 *
 * ## Por qué existe un contexto para un `useState`
 *
 * Porque el carril derecho necesita las respuestas, y el carril se monta en el shell
 * mientras la guía se monta en la ruta. Sin contexto, o el shell baja a la ruta a
 * preguntar —y entonces conoce el interior de la guía—, o el carril se pasa por props a
 * través de dos niveles que no lo usan.
 *
 * ## Qué NO vive aquí, y por qué
 *
 * **El cálculo.** Qué reglas se disparan con lo declarado es de `lib/guias.ts`, que es
 * lógica pura y se puede probar en Node sin navegador —lo hace `verify:guias`.
 *
 * **El estado del archivo.** `AnalysisContext` ya lo tiene, y mezclarlos haría que
 * cambiar de respuesta en una guía se confundiera con cambiar de G-code. Lo único que
 * se cruza es en el otro sentido: al entrar en una guía, lo que el análisis sabe se
 * escribe con `precontestar`, que es una lectura, no una escritura compartida.
 *
 * El resultado es un contexto diminuto: un objeto y tres funciones. Si algún día crece,
 * es señal de que algo se ha metido aquí que no debía.
 */
export function ProveedorGuia({ children }: { children: ReactNode }) {
  const [elegidas, setElegidas] = useState<Record<string, string>>({});

  /*
   * Marcar y desmarcar en la misma función.
   *
   * No hay dos operaciones porque no hay dos intenciones: quien pulsa un chip quiere
   * que ese chip cambie. Separarlo en `marcar` y `desmarcar` obligaría a la vista a
   * saber en qué estado está cada chip para decidir cuál llamar, y ese es
   * exactamente el estado que ya está en el objeto `elegidas`.
   *
   * La mutación copia el objeto en vez de editarlo porque es la clave de un `useMemo`
   * de la página entera: si se editara en el sitio, React no vería el cambio y la
   * recomendación no se recalcularía. El fallo sería silencioso y sólo aparecería con
   * más de una variable marcada.
   */
  const alternar = useCallback((variable: string, opcion: string) => {
    setElegidas((antes) => {
      const siguiente = { ...antes };
      if (siguiente[variable] === opcion) delete siguiente[variable];
      else siguiente[variable] = opcion;
      return siguiente;
    });
  }, []);

  const limpiar = useCallback(() => setElegidas({}), []);

  const valor = useMemo<EstadoGuia>(
    () => ({ elegidas, setElegidas, alternar, limpiar }),
    [elegidas, alternar, limpiar]
  );

  return <ContextoGuia.Provider value={valor}>{children}</ContextoGuia.Provider>;
}