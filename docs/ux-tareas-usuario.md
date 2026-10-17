# UI centrada en tareas · 16/10/2026

## Intención

Aplicar la auditoría global sin sustituir la identidad oscura/azul ni aumentar los cuatro destinos principales. Priorizar la acción y el resultado, en lugar de usar tres columnas en todas las pantallas.

## Cambios

- Inicio: cabecera y subida más compactas, entrada temprana a síntomas y catálogo.
- G-code: recomendación y datos en el área principal; sin un gran visor vacío. Los análisis restaurados conservan el resultado y explican que el archivo no se guarda.
- Guías: ilustración móvil pequeña, contexto extenso ampliable y navegación por las cuatro etapas. Las comparaciones, variables, acciones, autoría y fuentes permanecen.
- Los enlaces del análisis a una variable esperan al montaje de la guía y desplazan al destino: no dejan sólo el hash en la URL.
- Wiki: tarjetas compactas agrupadas por base/primera capa, fallos durante impresión y ajustes/material/acabado. No es un orden de popularidad. La búsqueda conserva recuento y URL.
- Marco: lateral sólo en guías o junto al visor; Taller, biblioteca y páginas informativas usan el espacio principal. Guías relacionadas limitadas a tres, con acceso al índice completo.
- Catálogo: explicación del alcance ampliable y modelos antes del texto largo. El estado de cámara desconocida sólo aplica si el filamento no admite máquina abierta.
- Taller: coste total destacado, fórmula verificable, unidades y límites cercanos. No cambia el precio local ni la aritmética.
- Visor: ayuda, zoom, giro y encuadre por botones, nombre accesible del canvas y recuperación junto al error.
- Los controles del visor tienen espacio propio fuera del lienzo y se reservan también durante la descarga del chunk. Los análisis recientes se apilan, no estrechan el modelo.
- Archivos: OBJ deja de anunciarse como admitido en el selector; si llega por arrastre, conserva su explicación de formato no soportado.
- Verificadores: `BASE_URL` tiene prioridad en el helper y en todas las navegaciones del historial; un servidor externo nunca se cierra mediante `detener()`.

## Pruebas nuevas

```sh
VITE_JEV_USE_MOCK=true npm run build
node scripts/verify/ux-tareas.mjs
```

El script abre y cierra su preview propio en el puerto 5287 cuando no se proporciona `BASE_URL`. Las peticiones externas se bloquean: es una prueba de interfaz, no de disponibilidad del servicio de diagnóstico.

Para comprobar el aislamiento de un preview ya abierto:

```sh
BASE_URL=http://127.0.0.1:5288 node scripts/verify/preview-base.mjs
```

Se observaron fallar las comprobaciones nuevas antes de implementar los cambios: botón parcialmente tapado, accesos ausentes, análisis fuera de main, recuperación ausente, navegación de etapas ausente, listado de relacionadas completo, falta de grupos, lateral irrelevante, primera ficha demasiado abajo, total no destacado, controles de visor ausentes y seis filamentos abiertos mal clasificados con cerramiento desconocido.

La revisión independiente detectó dos problemas importantes: los controles
superpuestos podían tapar el modelo y la prueba de zoom podía confundirse por
el cambio de texto o foco. Se añadió el caso G-code → STL con Recientes, se
separó la barra del lienzo y se reforzó la comparación de geometría para zoom,
giro y encuadre. Una mutación local de `zoom(0.8)` a `zoom(1)` se detectó como
ausencia de cambio geométrico; no se modificó el bundle publicado.

La comparación usa la silueta azul del fixture y exige más de un píxel de cambio
en sus bordes. No compara bytes de PNG: el sombreado WebGL puede producir
diferencias mínimas aun sin mover la cámara. El control negativo sin zoom y el
positivo con zoom se verificaron con esa misma medida.

## Verificación de cierre

| Comprobación | Resultado |
|---|---|
| Build TypeScript/Vite y exportación estática | Correcto; 30 páginas. Conserva el aviso de tamaño del chunk 3D presente en baseline. |
| ESLint | Correcto |
| Regresiones UX nuevas | 14/14 |
| Motor de guías | 566/566 |
| UI repetible | 170/170 |
| Taller | 180/180 |
| Historial y proyectos | 109/109 |
| Wiki | 188/188 |
| SEO | 293/293 |
| Catálogo, subida, rutas, teclado, overlay | Correctos |
| Barrido de layout | 29 viewports, mínimo 150 px conservado, sin recortes ni errores de consola |
| Capturas/DOM globales | 30 rutas × 5 anchos; sin overflow horizontal del documento ni pageerror |
| Aislamiento BASE_URL y mutación sin zoom | Correctos |

Pruebas locales con clasificación de demostración; la validación de fuentes en
red y la integración publicitaria real no forman parte de esta evidencia. La
revisión independiente solicitó cambios por dos Important; ambos quedaron
cubiertos por regresiones y correcciones. No se encargó una segunda revisión.

## Grupo B cerrado (contenido y datos)

- `pantallaTactil` retirado del catálogo, tipos y tests: sin fuente que lo afirme ni representación en el SVG.
- AD5X: temperaturas 300/110 °C desde ficha oficial (antes pendiente por confusión con zmod).
- A1, P1S, MK4S: dimensiones rellenadas desde fuentes oficiales.
- Mars 5 Ultra: cerramiento, volumen y velocidad marcados como pendientes (sin fuente archivada).
- MaquinaSVG: `null` se describe como "desconocido", no como "abierta".
- Revisor independiente: APROBADO (revision-2), 0 bloqueantes.
- Reglas térmicas: coherentes con el material cocinado (anotado como no bloqueante).

## Límites

- Laya no decide la calidad del diseño ni las prioridades: no superó los controles de la auditoría.
- No se fusionan Proyectos e Historial ni se modifica su persistencia.
- No se cambian datos técnicos, fuentes crudas/cocinadas, anuncios, consentimiento, endpoints ni permisos.
- Una prueba headless y sus capturas no sustituyen teléfonos físicos, lectores de pantalla ni pruebas con personas.
- El plan y las comprobaciones finales están en `docs/superpowers/plans/2026-10-16-ux-tareas-usuario.md`.

## Decisiones tomadas y sus límites

- Estilos de composición en un fichero propio, en lugar de ampliar App.css: limita conflictos; requiere vigilar la cascada con estilos de rutas.
- Verificadores respetan BASE_URL: evita medir otra sesión; quien ejecuta debe proporcionar el preview correcto.
- Asunciones antiguas de «panel siempre a la derecha» y «no puede haber scroll» se sustituyen por ubicación contextual y acceso real. Es un cambio de composición aprobado, no una reducción de comprobaciones.
- El barrido conserva el suelo de 150 px y los cortes 640/768/1200. La cabecera de móvil pasa de dos filas a una: se exige altura compacta de 44–69 px y el cambio real en 640, no los 104 px de la composición retirada.
- Wiki y barrido simulan recursos externos para no ejecutar publicidad o telemetría durante pruebas locales. No se filtran errores de consola: esto separa la prueba de UI de la integración publicitaria, que queda fuera de su evidencia.
- Proyectos/Historial conservan sus rutas y almacenamiento. No se introduce una migración de datos para mejorar la presentación.
