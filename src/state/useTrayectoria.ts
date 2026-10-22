import { useEffect, useState } from 'react';
import { analizarGcodeDeArchivo, type Trayectoria } from '../services/GcodeTrayectoria';

/**
 * La trayectoria del G-code que se ha subido.
 *
 * El análisis del cuerpo del archivo **no puede ser síncrono**: un G-code real
 * pesa entre 20 y 200 MB, y leerlo entero en el hilo principal congela la
 * interfaz. Por eso el lector va por trozos (`analizarGcodeDeArchivo`) y aquí
 * sólo se espera su resultado.
 *
 * Y el estado es explícito porque el archivo se cambia: subir otro G-code tiene
 * que **cambiar** lo que se ve, no dejar el anterior en la pantalla. Un visor que
 * dibuja la trayectoria del archivo anterior es peor que no tener visor.
 */
export type EstadoTrayectoria =
  | { fase: 'vacia' }
  | { fase: 'leyendo' }
  | { fase: 'lista'; trayectoria: Trayectoria }
  | { fase: 'error'; mensaje: string };

/** El resultado de un análisis, con el archivo al que pertenece. */
type Resultado = { archivo: File; estado: EstadoTrayectoria };

export function useTrayectoria(file: File | null): EstadoTrayectoria {
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    if (!file) return;

    let vivo = true;

    analizarGcodeDeArchivo(file)
      .then((trayectoria) => {
        if (!vivo) return;
        setResultado({ archivo: file, estado: { fase: 'lista', trayectoria } });
      })
      .catch((error: unknown) => {
        if (!vivo) return;
        setResultado({
          archivo: file,
          estado: {
            fase: 'error',
            mensaje: error instanceof Error ? error.message : 'No se ha podido leer el G-code.',
          },
        });
      });

    // Al cambiar de archivo, el resultado que llegue tarde no se pinta.
    return () => {
      vivo = false;
    };
  }, [file]);

  /*
   * Las dos fases que no son resultado **se derivan**, no se escriben.
   *
   * Escribir `{fase: 'leyendo'}` dentro del efecto es un `setState` síncrono en
   * el cuerpo del efecto, y eso hace que React renderice otra vez en cascada
   * antes de que el efecto haya terminado. Además, obliga a duplicar el estado
   * en dos sitios: el efecto dice «leyendo» y el render dice «vacia», y basta un
   * cambio de archivo para que los dos se desincronicen.
   *
   * La regla que sale es más simple: **el estado es el resultado del análisis, y
   * el resultado pertenece a un archivo**. Si no hay archivo, no hay nada que
   * leer. Si el resultado no es del archivo que hay ahora —porque se acaba de
   * subir otro, o porque todavía no ha llegado—, se está leyendo.
   */
  if (!file) return { fase: 'vacia' };
  if (!resultado || resultado.archivo !== file) return { fase: 'leyendo' };
  return resultado.estado;
}
