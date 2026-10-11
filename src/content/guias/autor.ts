import type { Autor } from './tipos';

/**
 * Quien firma las guías de la wiki.
 *
 * Vive en un módulo y no repetido en las nueve guías a propósito: el autor es
 * un dato único del sitio, y nueve copias son nueve sitios que actualizar si
 * cambia una credencial. Las guías lo referencian (`autor: AUTOR`) y el
 * verificador comprueba que ninguna lo haya sustituido por un objeto a mano.
 *
 * El `perfil` es el Instagram público: es la identidad verificable que sostiene
 * la autoría ante un lector y ante una revisión de contenido.
 */
export const AUTOR: Autor = {
  nombre: 'John Puerta Sáez',
  credencial: 'Ingeniero en sistemas · 3 años con impresión 3D',
  perfil: 'https://instagram.com/printelite3d',
};
