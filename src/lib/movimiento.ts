/*
 * El movimiento, como cuatro primitivas y ninguna más.
 *
 * La spec de identidad visual (§6) define cuatro primitivas y dice que no se
 * añaden más. Aquí están las cuatro, con los nombres de la spec, sobre
 * `motion` —la librería de motiondivision— en vez de sobre CSS.
 *
 * ## Por qué `motion` y no el CSS que ya había
 *
 * Porque el CSS no tiene **salida**. Una tarjeta que entra con `@keyframes` sabe
 * entrar; una etapa que desaparece al cambiar de etapa no sabe. Y hay tres cosas
 * más que el CSS no da: el estado de «aparecer y desaparecer» (`AnimatePresence`),
 * los gestos (`whileDrag`) y los valores continuos (`useMotionValue`), que es lo que
 * hace que el deslizador de capa se mueva con el dedo y no a saltos.
 *
 * Lo que **no** se ha reescrito: el hover, el foco y el pulso de progreso se siguen
 * haciendo con CSS, que ahí es más barato y no necesita JavaScript.
 *
 * ## Las reglas, que son comprobables
 *
 * 1. **Sólo `transform` y `opacity`.** Ninguna propiedad de layout, o el CLS se
 *    mueve. `verify:animacion` mide el CLS.
 * 2. **Sin interacción, nada se mueve**, salvo el pulso de progreso. Es la regla de
 *    la spec y la razón de que las animaciones de entrada sean de una vez.
 * 3. **Con `prefers-reduced-motion: reduce`, todo se apaga** sin perder
 *    información. Aquí no es una cortesía: `useReducedMotion` devuelve la duración
 *    a cero, y el contenido se ve igual.
 * 4. **El chunk de entrada no crece.** `motion` entra por `GuiaRoute`, que ya es
 *    `lazy`; el visor 3D son 591 KB aparte y no se tocan.
 */
import { useContext } from 'react';
import { useReducedMotion } from 'motion/react';
import { ContextoMovimiento } from '../state/movimiento-contexto';

/** Las duraciones de la spec §3, en segundos. */
export const DURACION = {
  /** `control`: hover, focus, active. */
  control: 0.14,
  /** `entrada-ruta`: al montar. */
  entrada: 0.16,
  /** `resultado`: el número que aparece. */
  resultado: 0.18,
  /** `trazo`: la línea azul que se dibuja. */
  trazo: 0.22,
} as const;

/** La curva del motivo de plano, `--curva-plano` del `:root`. */
export const CURVA = [0.22, 0.7, 0.3, 1] as const;

/** El nombre de una duración. */
export type Primitiva = keyof typeof DURACION;

/**
 * El movimiento de la página, con el movimiento reducido ya resuelto.
 *
 * Devuelve un objeto con tres cosas:
 *
 * - `reducido`: si la persona pidió menos movimiento.
 * - `transicion(primitiva)`: la transición de una primitiva, con duración cero si
 *   hay movimiento reducido.
 * - `variantes`: las variantes de entrada y de estado, ya con la duración resuelta.
 */
export function useMovimiento() {
  const activo = useContext(ContextoMovimiento);
  const reducido = useReducedMotion();
  const sinMovimiento = !activo || Boolean(reducido);

  const transicion = (primitiva: Primitiva) =>
    sinMovimiento
      ? { duration: 0 }
      : { duration: DURACION[primitiva], ease: CURVA };

  return {
    /** Si la persona ha pedido menos movimiento. */
    reducido: Boolean(reducido),
    /**
     * Si hay que animar.
     *
     * `false` cuando el movimiento está reducido **y** cuando la exportación
     * estática está generando el HTML. En los dos casos los componentes pintan su
     * estado final sin transición, y en el segundo eso es lo que evita que el texto
     * salga invisible.
     */
    animar: !sinMovimiento,
    transicion,
    /**
     * Las variantes de entrada: un desplazamiento corto y una opacidad.
     *
     * Los cuatro píxeles no son un capricho: son los de la spec §6, y son
     * suficientes para que se note la entrada sin que se note el movimiento.
     */
    entrada: {
      oculto: { opacity: 0, y: sinMovimiento ? 0 : 4 },
      visible: {
        opacity: 1,
        y: 0,
        transition: transicion('entrada'),
      },
    },
    /** La variante de un elemento que acaba de aparecer. */
    resultado: {
      oculto: { opacity: 0, scale: sinMovimiento ? 1 : 0.98 },
      visible: { opacity: 1, scale: 1, transition: transicion('resultado') },
    },
  };
}

/**
 * El retardo de entrada de una lista.
 *
 * Lo hace `motion` con `staggerChildren`, que es lo que sustituye al `--i` que
 * usaba el CSS: el retardo lo calcula el padre, no cada hijo.
 */
export const RETARDO_LISTA = 0.04;
