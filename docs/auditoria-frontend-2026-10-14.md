# Auditoría frontend — 14 de octubre de 2026

## Alcance y seguimiento

Revisión UI/UX de Inicio, Máquinas, Wiki, Guía, Taller y navegación compartida.
Los informes previos se contrastan con el código actual y pruebas de navegador.
El resultado no certifica cumplimiento completo de WCAG ni la exactitud técnica
de los datos del catálogo.

- [x] Recuperar y revisar el diff pendiente tras la interrupción.
- [x] Reproducir y corregir la subida por arrastre y el acceso desde Taller.
- [x] Verificar tarjetas, selector, fuentes, nombres accesibles y contraste.
- [x] Comprobar escritorio/móvil, navegación y movimiento reducido.
- [x] Ejecutar compilación y verificaciones pertinentes.
- [x] Registrar hallazgos pendientes y veredicto por módulo.
- [x] Actualizar el grafo de código.

## Veredicto por módulo

«Cumple» se limita a los flujos comprobados; no significa certificación WCAG ni
auditoría técnica del conocimiento de impresión 3D.

| Módulo | Resultado | Motivo |
|---|---|---|
| Inicio / subida | Cumple en parte | Arrastre, selección y errores de selección múltiple funcionan. La propuesta de valor sigue detrás de la subida y el primer encabezado es un h2. |
| Máquinas | Cumple en parte | SVG y ficha forman una tarjeta responsive; fuentes consultables, selector reversible con resumen, pausa y nombres accesibles. Falta representación específica y coherente de cada modelo. |
| Wiki / índice | Cumple en los flujos revisados | Búsqueda por síntoma, estado sin coincidencias, recuento anunciado y navegación a la guía funcionan. |
| Guía / warping-pla | Cumple en parte | Variables, filtrado y acciones funcionan; corregidos identificadores internos y explicación invertida del filtrado. Falta hacer más inmediato el resultado al cambiar opciones. |
| Taller | Cumple en los flujos revisados | Se puede seleccionar un G-code desde la pantalla, introducir precio y obtener el coste; errores, coma decimal y análisis restaurado comprobados. |
| Proyectos / Historial | Cumple en parte | Los estados vacíos explican qué guardan y caben en móvil. Les falta una acción local para empezar. En esta vuelta no se verificó todo el ciclo de edición y borrado. |
| Navegación compartida | Cumple en parte | Los cuatro destinos principales conservan su estructura. Máquinas tiene ahora acceso desde Inicio y el pie, y su miga no destruye el archivo cargado. En Máquinas no queda un destino principal activo. |
| Acerca de / Contacto / Autor / Privacidad | Cumple en lectura y adaptación revisadas | Un h1 por ruta y sin desbordamiento horizontal en los tres anchos. No se evalúan aquí los textos legales. |

## Hallazgos corregidos

| ID | Severidad original | Evidencia y corrección |
|---|---|---|
| M1 | Grave | La regla de tarjeta se había aplicado al SVG. `src/estilos/maquinas.css`: `.maquina` vuelve a contener ilustración y ficha (corrección previa `f2e40c3`). |
| M2 | Grave | A 768 px, la ficha disponía de 114,8 px aunque el documento no mostraba scroll horizontal. La rejilla ahora responde al espacio disponible; la ficha pasa a 454,8 px. |
| M3 | Grave | Nombres accesibles: el título se movió al SVG raíz. El árbol de accesibilidad anuncia los ocho modelos. |
| M4 | Media | `MaquinasRoute`: resumen `role=status`, opción «Sin comparar filamento», grupos genéricos/marcas y fuentes desplegables. No se presenta el resultado como garantía de compatibilidad. |
| M5 | Media | Etiquetas «pendiente» y «no aplica» se deciden por el origen, no sólo por un valor nulo. Ausencia de origen se trata como pendiente. |
| M6 | Grave | La miga usa `Link`. Probado: cargar archivo, pasar por Máquinas → Wiki → Inicio mantiene el archivo. |
| M7 | Media | Acceso a Máquinas añadido a «Qué más puedes hacer» en `Inicio.tsx`; antes sólo era visible en el pie. |
| M8 | Grave | Animaciones continuas sin control local: ahora hay pausa/reanudación. `prefers-reduced-motion` desactiva el movimiento. |
| I1 | Grave | `UploadRoute` prometía arrastrar sin manejar `drop` ni cancelar la navegación del navegador. Ahora utiliza el mismo `loadFile` del selector. Si se arrastran varios, anuncia el error y no abre uno arbitrariamente. |
| T1 | Media | Taller pedía subir un G-code sin control dentro del módulo. Añadido botón que abre el selector compartido y conserva la ruta. |
| G1 | Media | `GuiaRoute` mostraba claves como `warpingRisk`; utiliza las etiquetas existentes. El texto del filtrado ahora describe las tarjetas excluidas correctamente. |
| A1 | Grave | El arreglo anterior de contraste era incorrecto: texto rosa sobre rojo no aumentaba el contraste. Blanco sobre `--danger-hover` da **4,83:1**, medido con colores computados. Botones y selector tienen foco de 2 px; los botones «X» reciben nombre accesible. |

## Pendientes, por prioridad

1. **Alta — fidelidad visual de las máquinas.** `MaquinaSVG.tsx` dibuja tres
   familias; SE y KE comparten geometría y existen correspondencias de modelo y
   familia que necesitan revisión. La bobina centrada no demuestra que toda la
   mecánica sea coherente: sigue pendiente la unión del filamento al cabezal y el
   recorrido de cama/pórtico. La interfaz describe estos SVG como esquemas, pero
   **no se cumple todavía el objetivo de reconocer cada modelo por su dibujo**.
2. **Alta — confianza de los resultados.** La comparación conserva reglas previas
   limitadas (techo térmico y cámara). La UI evita prometer compatibilidad completa;
   hace falta una revisión técnica independiente de datos y reglas antes de dar
   esa garantía. `verify:maquinas` verde sólo prueba las reglas actuales.
3. **Media — jerarquía de Inicio.** Poner el h1 y la explicación corta antes de la
   subida, con promesas diferenciadas para G-code y formatos de geometría.
4. **Media — respuesta de las guías.** Añadir un resumen de acciones actualizado y
   anunciado junto a las variables, con enlace directo al resultado. Actualmente
   el cambio exige recorrer una guía larga; la portada ocupa casi una pantalla
   móvil antes del diferencial.
5. **Media — densidad del catálogo.** Las ocho fichas completas requieren mucho
   desplazamiento y repiten las etiquetas de procedencia por fila. Conviene
   priorizar especificaciones clave y desplegar el resto, conservando las fuentes.
   Ocho elementos no justifican por sí solos paginación ni filtros avanzados.
6. **Baja — estados vacíos y orientación.** Dar acción local a Proyectos/Historial
   y una ubicación activa inequívoca al catálogo dentro de la navegación existente.
7. **Verificación — exportación sin JS.** Las ocho fichas y SVG están en el HTML
   exportado. Los controles de comparación/pausa necesitan JS; debe aclararse ese
   límite o sustituirse por una presentación de sólo lectura en ese modo.

## Evidencia de esta vuelta

- Navegador automatizado con Playwright, contexto aislado. No se abrió una ventana
  visible en el escritorio ni se probó con un lector de pantalla real.
- 11 rutas × 375 / 768 / 1440 px: 33 vistas, un h1 por ruta, sin desbordamiento
  horizontal del documento y sin excepciones JavaScript (`pageerror`). Esto no
  implica que todos los contrastes y controles del sitio cumplan WCAG.
- Máquinas también comprobada a 320 px. Contenido de fichas dentro de la tarjeta,
  ocho imágenes con nombre en el árbol accesible, fuentes desplegadas, selección
  ABS y regreso al estado neutro, pausa/reanudación y movimiento reducido.
- Búsqueda sin coincidencias y por «esquinas»; selección de PLA en la guía deja
  7 de 9 tarjetas y comunica las 2 excluidas en el texto visible.
- `scripts/verify/subida-ui.mjs`: visto fallar antes del arreglo; ahora pasa el
  flujo arrastre → análisis → coste y la selección directa desde Taller. Incluye
  rechazo de selección múltiple.
- `npm run build`: correcto; exporta 20 páginas. Aviso existente de chunk del visor
  3D superior a 500 kB.
- `npm run lint`: cero errores, tres advertencias en copias de `three.core.js`
  dentro de `.superpowers/brainstorm/`. ESLint sobre los archivos cambiados: limpio.
- `npm run verify:teclado`: aprobado.
- `npm run verify:guias`: 296/296; conserva avisos de reglas sin condición en
  `slicer` y `adhesion-primera-capa`.
- `npm run verify:maquinas`: cero fallos; no valida la física ni la fiabilidad de
  las fuentes del catálogo.
- `BASE_URL=http://127.0.0.1:5199 npm run verify:taller`: 180 comprobaciones
  aprobadas. La ejecución inicial falló al cerrar el servidor: `startPreview()`
  devuelve una URL y el script intenta `preview.kill()`. Se comprobó el flujo
  contra el servidor ya activo; queda pendiente corregir ese contrato del script.
- `graphify update .`: actualización AST completada; los nombres de algunas
  comunidades requieren reetiquetado si se quiere mantener la nomenclatura previa.

Capturas y mediciones locales: `/tmp/opencode/auditoria-frontend/`.
Las capturas de Wiki/Guía se tomaron de nuevo tras terminar la animación de entrada
para no confundir un fotograma del fundido con un problema permanente de contraste.

## Conclusión

La integración de **ilustración y ficha** funciona tras las correcciones y tiene
una entrada desde Inicio. El frontend mejora, pero la auditoría global sigue
siendo **cumplimiento parcial**, especialmente por la fidelidad por modelo, la
jerarquía inicial y la respuesta de las guías.
