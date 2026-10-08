/**
 * Iconos de la navegación, en SVG en línea.
 *
 * **Por qué no emoji.** La barra usaba 🏠 🧰 📚 🌐 y en el navegador de desarrollo
 * salían cuatro cuadritos vacíos: el contenedor no tiene fuente de emoji, y el
 * resultado depende de qué tenga instalado cada visitante. Un icono que a veces no
 * sale es peor que no tener icono, porque parece un fallo de la página y no una
 * fuente que falta.
 *
 * Un SVG en línea tiene la otra mitad de las ventajas —no es una petición de red,
 * se puede colorear con `currentColor`— y ninguno de esos problemas.
 * * Todos dibujan sobre `0 0 24 24`, con `stroke` y sin relleno salvo donde hace
 * falta, para que el trazo pese igual en los cuatro.
 */

/** Inicio: una casa. */
export function IconoInicio(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true" focusable="false">
      <path
        d="M3 10.5 12 3l9 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 9.5V20h13V9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Taller: una llave inglesa. */
export function IconoTaller(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true" focusable="false">
      <path
        d="M15.5 3.5a5.5 5.5 0 0 0-5.1 7.6L3.6 17.9a2 2 0 0 0 2.8 2.8l6.8-6.8a5.5 5.5 0 0 0 6.8-7.1l-3 3-2.5-.7-.7-2.5 3-3a5.5 5.5 0 0 0-1.3-.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wiki: un libro abierto. */
export function IconoWiki(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true" focusable="false">
      <path
        d="M12 6.5C10.5 5 8.5 4.5 4 4.5V18c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2V4.5c-4.5 0-6.5.5-8 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.5V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Proyectos: una rejilla de piezas. */
export function IconoProyectos(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true" focusable="false">
      <rect
        x="3.5"
        y="3.5"
        width="7"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="13.5"
        y="3.5"
        width="7"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="3.5"
        y="13.5"
        width="7"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="13.5"
        y="13.5"
        width="7"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}
