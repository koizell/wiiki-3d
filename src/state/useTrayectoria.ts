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

export function useTrayectoria(file: File | null): EstadoTrayectoria {
  const [estado, setEstado] = useState<EstadoTrayectoria>({ fase: 'vacia' });

  useEffect(() => {
    if (!file) {
      setEstado({ fase: 'vacia' });
      return;
    }

    let vivo = true;
    setEstado({ fase: 'leyendo' });

    analizarGcodeDeArchivo(file)
      .then((trayectoria) => {
        if (!vivo) return;
        setEstado({ fase: 'lista', trayectoria });
      })
      .catch((error: unknown) => {
        if (!vivo) return;
        setEstado({
          fase: 'error',
          mensaje: error instanceof Error ? error.message : 'No se ha podido leer el G-code.',
        });
      });

    // Al cambiar de archivo, el resultado que llegue tarde no se pinta.
    return () => {
      vivo = false;
    };
  }, [file]);

  return estado;
}
