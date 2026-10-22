import { useEffect, useState } from 'react';

/**
 * En qué etapa de la guía se está leyendo.
 *
 * ## Por qué hace falta
 *
 * El recorrido de arriba —«1 · Descártalo, 2 · Tu montaje, 3 · Saber, 4 ·
 * Acciones»— es un índice. Un índice dice dónde está cada cosa, pero no dice
 * **dónde estás**. Con cuatro etapas apiladas, quien baja a la mitad de la guía
 * ya no sabe si va por la segunda o por la tercera.
 *
 * ## Cómo lo decide
 *
 * Por la posición de cada etapa respecto a la línea de lectura —un tercio de la
 * pantalla desde arriba—. No con un `IntersectionObserver`, que con cuatro
 * secciones de tamaños muy distintos salta demasiado: la etapa 4 es más corta
 * que la 2 y entraría y saldría de la zona activa sin parar.
 *
 * El cálculo se hace en un `requestAnimationFrame` para no medir en cada
 * evento de scroll: se anota que hay que medir y se mide una vez por fotograma.
 *
 * @param ids Los `id` de las etapas, en orden.
 * @returns El índice de la etapa activa, empezando en cero.
 */
export function useEtapaActiva(ids: readonly string[]): number {
  const [activa, setActiva] = useState(0);
  // La clave es el texto de los ids: un array nuevo en cada render volvería a
  // colgar el oyente en cada scroll.
  const clave = ids.join('|');

  useEffect(() => {
    const etapas = clave.split('|').filter(Boolean);
    if (etapas.length === 0) return;

    let pendiente = false;

    const medir = () => {
      pendiente = false;
      const linea = window.innerHeight * 0.3;
      let indice = 0;
      etapas.forEach((id, i) => {
        const elemento = document.getElementById(id);
        if (!elemento) return;
        if (elemento.getBoundingClientRect().top <= linea) indice = i;
      });
      setActiva(indice);
    };

    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(medir);
    };

    medir();
    /*
     * El oyente va en el **documento**, y en fase de captura.
     *
     * Porque en este sitio la guía no se desplaza en la ventana: se desplaza en
     * `.canvas-area`, que es una columna con altura fija y `overflow: auto`. Los
     * eventos `scroll` **no suben**, así que un oyente en la ventana no se
     * entera de nada; en fase de captura, en cambio, los ve todos.
     */
    document.addEventListener('scroll', alDesplazar, { passive: true, capture: true });
    window.addEventListener('resize', alDesplazar, { passive: true });
    return () => {
      document.removeEventListener('scroll', alDesplazar, { capture: true });
      window.removeEventListener('resize', alDesplazar);
    };
  }, [clave]);

  return activa;
}
