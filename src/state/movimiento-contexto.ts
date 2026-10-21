import { createContext } from 'react';

/**
 * Si el movimiento está activo.
 *
 * ## Por qué hace falta
 *
 * Porque la exportación estática **no se anima nunca**: el HTML que sale de
 * `scripts/export-static.mjs` lo lee un buscador, un revisor y cualquiera con
 * JavaScript apagado, y ese HTML se genera una vez y se sirve. Si el estado
 * inicial de una tarjeta fuera el de «oculto», el texto saldría con `opacity: 0` y
 * sería **invisible en el sitio publicado**.
 *
 * Con este contexto, el exportador envuelve el render en
 * `<ContextoMovimiento valor={false}>` y los componentes pintan directamente su
 * estado final, sin animación y sin invisible.
 *
 * Vive en un fichero propio y no junto al hook, por la misma razón que
 * `guia-contexto.ts`: un fichero que exporta un hook y una constante no recarga en
 * caliente.
 */
export const ContextoMovimiento = createContext(true);
