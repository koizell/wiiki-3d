import type { Autor } from './tipos';

/**
 * Quien firma las guías: la publicación wiiki-3d.
 *
 * Vive en un módulo para que las guías y el JSON-LD referencien una sola fuente.
 * Sostuvo el nombre y las credenciales personales del autor; a petición del
 * responsable, se reduce a la publicación, y la identidad verificable es el
 * **contacto del dominio** (`contacto@wiiki-3d.com`), no un perfil personal.
 *
 * Es una decisión de transparencia, no de ocultación: hay una persona real detrás
 * y es alcanzable por ese buzón para corregir cualquier cosa; lo que no se expone
 * es su identidad personal en cada ficha.
 */
export const AUTOR: Autor = {
  nombre: 'wiiki-3d',
};
