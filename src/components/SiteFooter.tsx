import { Link } from 'react-router-dom';

/**
 * El pie de página: las tres páginas que la revisión de contenido de Google exige
 * tener presentes en el sitio.
 *
 * ## Por qué vive **fuera** de `.app-container`, y no como una cuarta fila
 *
 * Porque medido. `.app-container` es un grid, y a partir de 1200px sus filas de
 * contenido son `1fr` con una altura de contenedor fija: el shell mide
 * exactamente la ventana y no hay scroll de documento. Añadir el pie como cuarta
 * fila quita su alto a `.canvas-area`, al visor y al panel.
 *
 * Midiendo las dos formas sobre la pantalla de referencia:
 *
 *   - Como cuarta fila: a 1280×800 el visor baja de 667 a 597 píxeles.
 *   - Como hermano del shell, con `min-height: 100dvh`: no se mueve ni el shell,
 *     ni la barra, ni el lienzo, ni el visor, ni el panel. En ninguno de los cinco
 *     anchos probados.
 *
 * La única diferencia de la segunda forma es que el documento pasa a medir unos
 * 70 píxeles más, y por tanto a hacer scroll a 1280×800. En los otros cuatro anchos
 * ya lo hacía. Es el mismo trato que ya reciben las demás columnas del shell.
 *
 * Y está fuera a propósito de la wiki: una página legal que sólo se encuentra
 * desde un módulo concreto es una página que un revisor puede no llegar a ver.
 */
export default function SiteFooter() {
  // El año sale del reloj y no de una constante: un año escrito a mano se queda
  // viejo solo, y nadie se acuerda de tocarlo.
  const anio = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <nav aria-label="Información del sitio">
        <ul>
          <li>
            <Link to="/acerca-de">Acerca de</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/privacidad">Privacidad</Link>
          </li>
          <li>
            <Link to="/autor">Autor</Link>
          </li>
        </ul>
      </nav>
      <p className="site-footer-nota">wiiki-3d · {anio}</p>
    </footer>
  );
}
