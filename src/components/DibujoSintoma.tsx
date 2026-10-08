import type { ReactElement } from 'react';
import type { Dibujo } from '../content/guias/tipos';

/**
 * Los dibujos de los síntomas, en SVG en línea y animados.
 *
 * ## Por qué SVG en línea y no imágenes
 *
 * Porque un dibujo de un defecto de impresión no es una fotografía: es un
 * **esquema** de lo que pasa, y un esquema que puede moverse enseña lo que una
 * imagen fija no. Aquí las esquinas suben, la grieta se abre, la boquilla baja.
 *
 * Y el detalle que decide: la guía de warping tiene una tarjeta que explica que
 * el borde se enfría antes que el centro, y ese mismo dibujo es el de la tarjeta
 * del índice. La imagen es el argumento, no la decoración.
 *
 * ## Por qué no dependen de `prefers-reduced-motion` desde JS
 *
 * Porque la animación va en `@keyframes` del SVG y la consulta de medios la
 * apaga en CSS. Si elialize el `matchMedia` desde un efecto, el dibujo se queda
 * en el estado inicial hasta que React monta, y en la exportación estática —que
 * no hidrata— se quedaba congelado para siempre. Aquí la animación es del
 * navegador y funciona igual en los dos casos.
 */

/** Propiedades comunes a todos los dibujos. */
interface Props {
  dibujo: Dibujo;
  /** `true` cuando es la tarjeta grande del índice, `false` cuando es un icono. */
  grande?: boolean;
  className?: string;
}

export default function DibujoSintoma({ dibujo, grande = false, className }: Props) {
  const clase = className ?? (grande ? 'dibujo dibujo--grande' : 'dibujo');
  return (
    <svg
      viewBox="0 0 120 80"
      className={clase}
      role="img"
      aria-label={DESCRIPCION[dibujo]}
      focusable="false"
    >
      <defs>
        <clipPath id={`clip-${dibujo}`}>
          <rect x="0" y="0" width="120" height="80" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${dibujo})`}>{CUERPO[dibujo]}</g>
    </svg>
  );
}

/** La descripción que lee quien no ve el dibujo. */
const DESCRIPCION: Record<Dibujo, string> = {
  esquinas: 'Esquema de una pieza plana cuyas esquinas se curvan hacia arriba.',
  'primera-capa': 'Esquema de una boquilla que deja la primera capa demasiado alta y separada.',
  grieta: 'Esquema de una pieza cuyas capas se separan por dentro mientras la base queda plana.',
  rugosidad: 'Esquema de una superficie con burbujas y filamentos sueltos por humedad.',
  colapso: 'Esquema de una pieza alta y fina que se tumba por vibración del cabezal.',
  cama: 'Esquema de una chapa con una pieza encima y un termómetro con dos flechas, una que sube y otra que baja.',
  camara:
    'Esquema de una impresora cerrada con su puerta, una corriente de aire frío que empuja desde fuera y calor que sube dentro de la cámara.',
  voladizo:
    'Esquema de una pieza con un saliente sin apoyo debajo que se descuelga hacia abajo.',
  capas:
    'Esquema de una pieza en corte con sus capas horizontales y una acotación de la altura de una capa.',
  hotend:
    'Esquema de una boquilla depositando filamento sobre la pieza, con ondas de calor a los lados.',
};

/**
 * Los cinco esquemas.
 *
 * Todos comparten la misma retícula y el mismo trazo, y por eso se leen como un
 * juego: la chapa es la misma en los cinco, y lo que cambia es lo que le pasa a la
 * pieza. `currentColor` para el trazo, `var(--accent-text)` para lo que se mueve,
 * que es la misma decisión que en el resto de la app.
 */
const CUERPO: Record<Dibujo, ReactElement> = {
  // Una pieza plana con las cuatro esquinas dobladas hacia arriba.
  esquinas: (
    <>
      <rect className="dibujo-chapa" x="14" y="58" width="92" height="6" rx="2" />
      <path
        className="dibujo-pieza dibujo-pieza--arqueada"
        d="M22 58 L28 44 L92 44 L98 58"
        fill="none"
      />
      <path className="dibujo-pieza" d="M22 58 L98 58" fill="none" />
      <path className="dibujo-flecha" d="M28 34 L28 44" />
      <path className="dibujo-flecha" d="M92 34 L92 44" />
      <path className="dibujo-capa" d="M24 50 L96 50" />
      <path className="dibujo-capa" d="M25 54 L95 54" />
      <path className="dibujo-continuo" d="M60 20 L60 32" />
    </>
  ),

  // La boquilla depositingo una primera capa que no toca la chapa.
  'primera-capa': (
    <>
      <rect className="dibujo-chapa" x="14" y="60" width="92" height="6" rx="2" />
      <path className="dibujo-nozzle" d="M56 16 L64 16 L62 30 L58 30 Z" />
      <path className="dibujo-extrusion" d="M60 30 L60 46" />
      <path className="dibujo-hueco" d="M32 54 L88 54" />
      <path className="dibujo-continuo" d="M46 50 L46 62" />
      <path className="dibujo-continuo" d="M74 50 L74 62" />
      <path className="dibujo-capa" d="M32 48 L88 48" />
      <path className="dibujo-capa" d="M34 44 L86 44" />
      <path className="dibujo-capa" d="M36 40 L84 40" />
    </>
  ),

  // Las capas de en medio abiertas, la base intacta.
  grieta: (
    <>
      <rect className="dibujo-chapa" x="14" y="60" width="92" height="6" rx="2" />
      <path className="dibujo-pieza" d="M28 60 L28 18 L92 18 L92 60" fill="none" />
      <path className="dibujo-capa" d="M28 52 L92 52" />
      <path className="dibujo-capa" d="M28 46 L92 46" />
      <path className="dibujo-capa" d="M28 40 L92 40" />
      <path className="dibujo-capa" d="M28 34 L92 34" />
      <path className="dibujo-capa" d="M28 28 L92 28" />
      <path className="dibujo-capa" d="M28 22 L92 22" />
      <path className="dibujo-grieta" d="M28 37 L92 37" />
      <path className="dibujo-hueco" d="M36 36 L84 36" />
      <path className="dibujo-acento" d="M100 37 L110 37" />
    </>
  ),

  // Burbujas y filamentos sueltos: humedad, no temperatura.
  rugosidad: (
    <>
      <rect className="dibujo-chapa" x="14" y="58" width="92" height="6" rx="2" />
      <path className="dibujo-pieza" d="M26 58 L26 26 L94 26 L94 58" fill="none" />
      <circle className="dibujo-burbuja" cx="40" cy="48" r="4" />
      <circle className="dibujo-burbuja" cx="62" cy="44" r="5" />
      <circle className="dibujo-burbuja" cx="80" cy="50" r="3" />
      <path className="dibujo-hilo" d="M34 36 q6 -8 12 0 q6 8 12 0 q6 -8 12 0" fill="none" />
      <path className="dibujo-hilo" d="M74 32 q5 -7 10 0 q5 7 10 0" fill="none" />
    </>
  ),

  // Una columna alta y fina que se tumba.
  colapso: (
    <>
      <rect className="dibujo-chapa" x="14" y="62" width="92" height="6" rx="2" />
      <path className="dibujo-columna" d="M44 62 L54 22 L66 22 L76 62" fill="none" />
      <path className="dibujo-colapso" d="M54 22 Q40 40 30 58" fill="none" />
      <path className="dibujo-flecha" d="M92 34 L92 54" />
      <path className="dibujo-cabeza" d="M84 44 L100 44 L100 54 L84 54 Z" />
    </>
  ),

  /*
   * La chapa con dos termómetros: uno que sube y otro que baja.
   *
   * Es el único de los seis que no enseña un defecto, y a propósito: la guía de
   * temperatura de cama no trata de un fallo, trata de que hay dos direcciones
   * posibles y el error es no saber en cuál estás. El dibujo lo dice en dos
   * palabras: demasiado frío y demasiado caliente.
   */
  cama: (
    <>
      <rect className="dibujo-chapa" x="10" y="58" width="62" height="8" rx="2" />
      <path className="dibujo-pieza" d="M22 58 L26 44 L56 44 L60 58" fill="none" />
      <path className="dibujo-capa" d="M24 50 L58 50" />
      <path className="dibujo-capa" d="M25 54 L57 54" />

      {/* Termómetro que sube: la cama demasiado fría es el fallo por defecto. */}
      <path className="dibujo-termometro" d="M86 16 L86 58" />
      <circle className="dibujo-termometro-bola" cx="86" cy="60" r="5" />
      <path className="dibujo-flecha" d="M86 40 L86 24" />
      <path className="dibujo-punta" d="M86 20 L82 28 L90 28 Z" />

      {/* Termómetro que baja: el otro extremo. */}
      <path className="dibujo-termometro" d="M106 24 L106 58" />
      <circle className="dibujo-termometro-bola" cx="106" cy="60" r="5" />
      <path className="dibujo-flecha" d="M106 44 L106 58" />
      <path className="dibujo-punta" d="M106 62 L102 54 L110 54 Z" />
    </>
  ),

  /*
   * La cámara cerrada con la puerta, y las dos direcciones que la cruzan.
   *
   * Es el séptimo y el segundo que no enseña un defecto, sino una decisión: la
   * misma puerta se cierra para parar la corriente fría de fuera y se abre para
   * que no se acumule el calor de dentro. Las dos flechas son el argumento de la
   * guía —cerrar resuelve un fallo y provoca el contrario—, y por eso van las dos
   * y no una.
   */
  camara: (
    <>
      {/* El recinto, cerrado. */}
      <rect className="dibujo-camara" x="22" y="14" width="60" height="50" rx="4" fill="none" />

      {/* La cama y la pieza, dentro. */}
      <rect className="dibujo-chapa" x="28" y="56" width="34" height="6" rx="2" />
      <path className="dibujo-pieza" d="M33 56 L36 46 L54 46 L57 56" fill="none" />
      <path className="dibujo-capa" d="M35 50 L55 50" />

      {/* La puerta, con su tirador. */}
      <path className="dibujo-puerta" d="M62 14 L62 64" />
      <path className="dibujo-continuo" d="M66 38 L70 38" />

      {/* La corriente fría, fuera, empujando contra el recinto. */}
      <path className="dibujo-flecha" d="M4 34 L16 34" />
      <path className="dibujo-punta" d="M16 30 L16 38 L22 34 Z" />

      {/* El calor, dentro, subiendo. */}
      <path className="dibujo-acento" d="M74 54 L74 42" />
      <path className="dibujo-punta" d="M74 38 L70 46 L78 46 Z" />
    </>
  ),

  /*
   * Una pieza con un saliente que se descuelga.
   *
   * El voladizo sale de una pared y no tiene nada debajo: la línea punteada es la
   * cara donde debería quedar, y la curva roja es donde queda. Es el defecto del
   * tema —el filamento que no se enfría a tiempo y cae por su peso— y por eso el
   * saliente va en color de aviso, como la grieta y el colapso.
   */
  voladizo: (
    <>
      {/* La cama. */}
      <rect className="dibujo-chapa" x="14" y="62" width="92" height="6" rx="2" />

      {/* La pared, y el saliente que sale de ella. */}
      <path className="dibujo-pieza" d="M30 62 L30 20 L52 20" fill="none" />

      {/* Dónde debería quedar la cara inferior del saliente. */}
      <path className="dibujo-continuo" d="M52 27 L96 27" />

      {/* El saliente, que se descuelga hacia abajo. */}
      <path className="dibujo-voladizo" d="M52 20 L84 20 Q97 23 93 42" fill="none" />
    </>
  ),

  /*
   * Una pieza en corte, con sus capas y una acotación.
   *
   * No es un defecto: es la unidad de medida del tema. Las líneas horizontales
   * son las capas —el mismo trazo que usa la grieta para las suyas— y la doble
   * flecha de la derecha acota lo que la guía llama altura de capa, que es la
   * distancia entre dos de esas líneas.
   */
  capas: (
    <>
      {/* La cama. */}
      <rect className="dibujo-chapa" x="14" y="62" width="92" height="6" rx="2" />

      {/* La pieza en corte, con sus capas. */}
      <path className="dibujo-pieza" d="M30 62 L30 14 L78 14 L78 62" fill="none" />
      <path className="dibujo-capa" d="M30 54 L78 54" />
      <path className="dibujo-capa" d="M30 46 L78 46" />
      <path className="dibujo-capa" d="M30 38 L78 38" />
      <path className="dibujo-capa" d="M30 30 L78 30" />
      <path className="dibujo-capa" d="M30 22 L78 22" />

      {/* La altura de una capa, acotada entre dos de esas líneas. */}
      <path className="dibujo-flecha" d="M90 46 L90 54" />
      <path className="dibujo-punta" d="M90 46 L87 41 L93 41 Z" />
      <path className="dibujo-punta" d="M90 54 L87 59 L93 59 Z" />
    </>
  ),

  /*
   * La boquilla con el calor alrededor.
   *
   * El tema no es un defecto sino un ajuste —la temperatura del hotend—, así que el
   * dibujo enseña el calor y no un fallo: la boquilla, el filamento que sale y dos
   * ondas a los lados, en el color de acento. Debajo, la pieza que se está
   * formando.
   */
  hotend: (
    <>
      {/* La pieza, debajo. */}
      <rect className="dibujo-chapa" x="14" y="62" width="92" height="6" rx="2" />
      <path className="dibujo-pieza" d="M34 62 L34 54 L86 54 L86 62" fill="none" />

      {/* La boquilla y el filamento que sale. */}
      <path className="dibujo-nozzle" d="M50 14 L70 14 L66 34 L54 34 Z" />
      <path className="dibujo-extrusion" d="M60 34 L60 50" />

      {/* El calor, a los dos lados. */}
      <path className="dibujo-acento" d="M38 34 q5 -6 0 -12 q-5 -6 0 -12" fill="none" />
      <path className="dibujo-acento" d="M82 34 q5 -6 0 -12 q-5 -6 0 -12" fill="none" />
    </>
  ),
};