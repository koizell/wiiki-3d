import { useCallback, useEffect, useState } from 'react';
import { maquinaPorSlug } from '../content/maquinas/catalogo';
import type { Maquina } from '../content/maquinas/tipos';

/**
 * La máquina que ha elegido quien está en la página.
 *
 * Antes de este hook la máquina vivía dentro de `Preflight.tsx`: se leía de
 * `localStorage` al montar y se escribía al cambiar el `<select>`. Eso valía
 * mientras sólo hubiera un selector, y en cuanto haya un segundo —el informe
 * del STL— los dos selectores quedan con copias del mismo dato y se
 * desincronizan: se elige en uno y el otro sigue con la máquina anterior.
 *
 * **La máquina elegida es una preferencia del navegador**, no un dato del
 * archivo: se guarda, se recuerda al recargar y la comparten todos los flujos
 * de la página. Por eso vive aquí y no en un componente.
 *
 * ## Cómo se comparte
 *
 * El estado de React no se comparte entre componentes que no están emparentados
 * (y el pre-flight y el informe del STL no lo están). Lo que se comparte es un
 * **evento en `window`**: quien cambia la máquina la despacha, y quien la
 * escucha se actualiza. Así los dos selectores enseñan lo mismo sin importar
 * cuál se toque primero.
 *
 * ## Por qué `try/catch` en todas partes
 *
 * El export estático renderiza en Node (`renderToStaticMarkup`), donde no hay
 * `window` ni `localStorage`. La lectura va en el estado inicial de React —o
 * sea, **durante el render**—, así que tiene que poder fallar sin tumbar la
 * exportación. Y en el navegador puede fallar por lo de siempre: el modo
 * privado de Safari y de Firefox bloquea `localStorage`.
 */

/** La clave de `localStorage` donde vive la máquina elegida. */
export const CLAVE_MAQUINA = 'wiiki-maquina';

/** El evento con el que se avisa de que la máquina elegida ha cambiado. */
export const EVENTO_MAQUINA = 'wiiki-maquina-cambio';

/** Lo que devuelve el hook. */
export interface MaquinaSeleccionada {
  /** El slug de la máquina elegida, o `''` si no hay ninguna. */
  slug: string;
  /** La máquina del catálogo, o `null` si no hay slug o el slug no existe. */
  maquina: Maquina | null;
  /** Elige una máquina. `''` significa «sin máquina». */
  setSlug: (slug: string) => void;
}

/** Lee la máquina guardada. `''` si no hay ninguna o si no se puede leer. */
function leerSlug(): string {
  try {
    return localStorage.getItem(CLAVE_MAQUINA) ?? '';
  } catch {
    // Sin `localStorage`: el render estático en Node, o el modo privado.
    return '';
  }
}

/** Guarda la máquina elegida, si el navegador deja. */
function guardarSlug(slug: string): void {
  try {
    localStorage.setItem(CLAVE_MAQUINA, slug);
  } catch {
    // `localStorage` puede no estar disponible (modo privado).
  }
}

/** Avisa a los demás flujos de que la máquina ha cambiado. */
function avisarCambio(slug: string): void {
  try {
    window.dispatchEvent(new CustomEvent<string>(EVENTO_MAQUINA, { detail: slug }));
  } catch {
    // Sin `window`: el render estático en Node.
  }
}

/**
 * La máquina elegida, compartida por todos los flujos de la página.
 *
 * - `slug`: lo que hay elegido, `''` si no hay nada.
 * - `maquina`: la ficha del catálogo, o `null` si no hay slug **o si el slug no
 *   existe** (una máquina borrada del catálogo deja de ser una máquina, no una
 *   máquina sin datos).
 * - `setSlug`: elige otra. Escribe en `localStorage` y avisa con el evento, de
 *   modo que los demás selectores se enteren.
 */
export function useMaquinaSeleccionada(): MaquinaSeleccionada {
  const [slug, setSlugEstado] = useState<string>(leerSlug);

  /*
   * Escucha el evento: si la máquina cambia en otro sitio, aquí se entera.
   *
   * El que escucha también guarda, y no sólo se entera: así `localStorage` y
   * lo que se ve son siempre lo mismo, pase lo que pase con el evento. Sin
   * esa escritura, un cambio que llegue por el evento se vería en la pantalla
   * pero se perdería al recargar.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alCambiar = (evento: Event) => {
      const detalle = (evento as CustomEvent<string>).detail;
      if (typeof detalle !== 'string') return;
      setSlugEstado(detalle);
      guardarSlug(detalle);
    };
    window.addEventListener(EVENTO_MAQUINA, alCambiar);
    return () => window.removeEventListener(EVENTO_MAQUINA, alCambiar);
  }, []);

  const setSlug = useCallback((nuevo: string) => {
    setSlugEstado(nuevo);
    guardarSlug(nuevo);
    avisarCambio(nuevo);
  }, []);

  const maquina = slug ? maquinaPorSlug(slug) : null;
  return { slug, maquina, setSlug };
}
