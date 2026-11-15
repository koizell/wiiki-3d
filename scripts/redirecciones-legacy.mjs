/**
 * Puentes para las URLs del blog antiguo.
 *
 * **El problema no es un 404, es una cadena rota.** El dominio viejo
 * (`www.wiiki-3d.com`) es un 301 de GitHub Pages al actual que **conserva la
 * ruta**. Quien llega desde un resultado de 2026 aterriza en
 * `wiiki-3d.com/2026/07/warping-solucion.html`, una ruta que hoy no existe: el
 * último salto termina en 404, y Search Console lo clasifica como «Error de
 * redirección» en vez de «404» porque el primer salto sí redirige. Eso deja 16
 * URLs en rojo por una causa que no se arregla reintentando la validación.
 *
 * **GitHub Pages no tiene redirecciones de servidor.** No hay `_redirects` ni
 * reglas de borde: el sitio es estático. La única forma de cerrar la cadena sin
 * tocar DNS ni el panel del dominio es publicar un fichero en cada ruta antigua.
 * No es un artículo: es un puente con `canonical` y `refresh` a la guía que hoy
 * responde la misma pregunta, más un enlace visible para quien no ejecute el
 * refresco.
 *
 * **Regla de mapeo.** Si hay guía equivalente, se apunta a ella. Si el tema no
 * tiene guía —pintura, glosario, piezas de la máquina—, se apunta al índice de
 * guías, que es donde la persona puede seguir buscando. No se inventa una guía
 * para justificar una redirección, y no se apunta a la portada: la portada no
 * responde la pregunta y Google la leería como un blando 404.
 *
 * **Qué no entra aquí.** `?m=1` es un parámetro de Blogger y no cambia el
 * fichero servido. `/feeds/posts/default` y `/search?q=` son rutas de Blogger que
 * no tienen equivalente y no afectan a la indexación del sitio actual.
 */
export const REDIRECCIONES_LEGACY = [
  // Guía equivalente: la misma pregunta, otra URL.
  { desde: '/2026/07/warping-solucion.html', hacia: '/wiki/warping-pla/' },
  { desde: '/2026/08/secar-filamento.html', hacia: '/wiki/secar-filamento/' },
  { desde: '/2026/08/brim-raft-falda.html', hacia: '/wiki/brim-y-skirt/' },
  { desde: '/2026/08/costuras-impresion-3d.html', hacia: '/wiki/z-seam/' },
  { desde: '/2026/08/boquilla-impresora-3d.html', hacia: '/wiki/temperatura-hotend/' },
  { desde: '/2026/07/imprimir-con-pla.html', hacia: '/wiki/material/' },
  { desde: '/2026/07/imprimir-con-abs.html', hacia: '/wiki/material/' },
  { desde: '/2026/07/imprimir-con-petg.html', hacia: '/wiki/material/' },
  { desde: '/2026/07/imprimir-con-tpu-flexible.html', hacia: '/wiki/tpu-flexible/' },
  { desde: '/2026/07/calibrar-flujo-esteps.html', hacia: '/wiki/flow-rate/' },
  { desde: '/2026/07/calibrar-retraccion.html', hacia: '/wiki/stringing/' },
  { desde: '/2026/07/stringing-solucion.html', hacia: '/wiki/stringing/' },
  { desde: '/2026/07/temperaturas-de-impresion.html', hacia: '/wiki/temperatura-hotend/' },
  { desde: '/2026/07/no-adhiere-a-la-cama.html', hacia: '/wiki/adhesion-primera-capa/' },
  { desde: '/2026/07/primera-capa-perfecta.html', hacia: '/wiki/adhesion-primera-capa/' },
  { desde: '/2026/07/ajustes-slicer-cura.html', hacia: '/wiki/slicer/' },
  { desde: '/2026/07/como-nivelar-la-cama.html', hacia: '/wiki/malla-de-cama/' },
  { desde: '/2026/08/mantenimiento-de-tu-impresora-3d.html', hacia: '/wiki/ruta-de-calibracion/' },
  { desde: '/2026/07/como-elegir-primera-impresora-3d.html', hacia: '/maquinas/' },
  { desde: '/2026/07/fdm-vs-resina.html', hacia: '/maquinas/' },
  { desde: '/p/configuracion.html', hacia: '/wiki/slicer/' },
  { desde: '/p/acerca.html', hacia: '/acerca-de/' },

  // Tema sin guía equivalente: el índice, no la portada.
  { desde: '/2026/08/pintar-piezas-3d.html', hacia: '/wiki/' },
  { desde: '/2026/08/ghosting-en-impresion-3d-ondas-en-tus.html', hacia: '/wiki/' },
  { desde: '/2026/08/el-filamento-no-carga-o-se-parte-7.html', hacia: '/wiki/' },
  { desde: '/2026/07/partes-de-una-impresora-3d.html', hacia: '/wiki/' },
  { desde: '/2026/07/glosario-impresion-3d.html', hacia: '/wiki/' },
  { desde: '/2026/07/que-es-la-impresion-3d.html', hacia: '/wiki/' },
];
