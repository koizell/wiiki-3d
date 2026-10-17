---
titulo: Paredes y perímetros
tema: paredes-y-perimetros
fuentes:
  - wiki/raw/paredes-y-perimetros-prusa-kb-layers-and-perimeters.md
  - wiki/raw/paredes-y-perimetros-orcaslicer-wiki-strength-settings-walls.md
  - wiki/raw/paredes-y-perimetros-orcaslicer-wiki-strength-settings-top-bottom-shells.md
  - wiki/raw/paredes-y-perimetros-simplify3d-gaps-in-top-layers.md
  - wiki/raw/paredes-y-perimetros-orcaslicer-wiki-quality-settings-wall-generator.md
  - wiki/raw/paredes-y-perimetros-orcaslicer-wiki-quality-settings-wall-and-surfaces.md
  - wiki/raw/paredes-y-perimetros-simplify3d-gaps-in-thin-walls.md
cocinado: 2026-10-17
---

## Afirmaciones

### Resistencia: paredes vs relleno

- La resistencia de un modelo está definida principalmente por el número de perímetros, no por el relleno. Si quieres una pieza más fuerte, aumenta el número de perímetros. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Perfiles originales Prusa usan un mínimo de 2 perímetros. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- `wall_loops` (número de paredes por capa) al aumentar mejora la adherencia de capa, la resistencia y la rigidez; reduce el ghosting del relleno; aumenta el tiempo de impresión. — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17
- `alternate_extra_wall` añade una pared extra cada dos capas para que el relleno quede encajado verticalmente entre las paredes, resultando en impresiones más fuertes. — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17
- `alternate_extra_wall` no funciona bien con "Ensure vertical shell thickness: All"; OrcaSlicer ofrece cambiarlo a "Moderate". — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17
- `alternate_extra_wall` no recomendado con Lightning infill (hay poco relleno al que anclar las paredes extra). — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17
- Las capas sólidas superior/inferior (shells) se imprimen sobre el relleno disperso; aumentar el número de shell layers aumenta la resistencia general y la calidad de la superficie superior; recomendado al menos 3. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- El top solid infill es esencialmente bridging sobre el patrón de relleno; a menor porcentaje de relleno, mayor distancia de bridging y mayor sag; se contrarresta aumentando las capas sólidas (sugerido al menos 3 superiores) o con un modifier mesh que aumente el relleno en las últimas capas antes del sólido. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Las capas sólidas superior e inferior son normalmente 100 % de relleno. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17

### Mínimo de paredes y paredes cerradas

- Por defecto cada pared consta de perímetros externo e interno (mínimo 2 perímetros, incluso en paredes delgadas). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Detect thin walls (Prusa): genera un solo perímetro que sirve de cáscara interior y exterior para capturar detalles pequeños; las paredes más delgadas que el ancho de una sola extrusión probablemente se ignoran. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Detect thin walls se desactiva automáticamente si el generador Arachne está activo. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- OrcaSlicer `detect_thin_wall`: por defecto las paredes se imprimen como bucles cerrados; si una pared es demasiado delgada para dos anchos de línea, se imprime como una sola línea de extrusión; calidad superficial y resistencia reducidas por no ser bucles cerrados. — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17
- Recomendado usar el generador Arachne (desactiva `detect_thin_wall`). — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17
- Simplify3D: paredes delgadas respecto al diámetro de boquilla; ejemplo de pared de 1,0 mm con boquilla de 0,4 mm y ancho de extrusión de 0,4 mm. — [Simplify3D — Gaps in Thin Walls](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/), capturado 2026-10-17
- Simplify3D soluciones para paredes delgadas: gap fill por defecto (patrón back-and-forth) o "Allow single extrusion fill" (extrusión única dinámica); también ajustar el ancho de extrusión para que encaje (ej. 0,5 mm para una pared de 1,0 mm). — [Simplify3D — Gaps in Thin Walls](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/), capturado 2026-10-17

### Grosor óptimo de pared delgada (PrusaSlicer)

- PrusaSlicer calcula el grosor óptimo de pared delgada para un número de perímetros y una altura de capa dados; no es simplemente número × ancho de extrusión, por el solape entre perímetros. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Ejemplo: ancho de extrusión 0,45 mm, 2 perímetros a 0,2 mm de capa → 0,86 mm (no 0,90 mm). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Las recomendaciones se dan normalmente para un número par de perímetros (2, 4, 6…); con Detect thin walls habilitado, también para impar (1, 3…). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- La altura de capa (h) entra en el cálculo; cambiar la altura de capa cambia el grosor ideal. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Sección de extrusión asumida: rectángulo con extremos semicirculares; el ancho de extrusión incluye los dos extremos semicirculares. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Los perímetros se solapan ligeramente para rellenar el espacio vacío y unirlos. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17

### Capas sólidas superior e inferior (top/bottom shells)

- `shell_layers`: número de capas sólidas incluida la superficial; si el grosor calculado es menor que `shell_thickness`, se aumentan. Recomendado ≥ 3 para la mayoría de impresiones. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- `shell_thickness`: aumenta el número de capas sólidas si el grosor calculado es menor que ese valor; evita cáscaras demasiado finas con altura de capa baja; 0 desactiva. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- `top_bottom_infill_wall_overlap`: solape del relleno sólido superior/inferior con las paredes para mejor unión y menos pinholes; 25–30 % es un buen punto de partida. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- La base del porcentaje de solape cambia según el wall generator: mitad del espaciado de línea de pared interior + mitad del espaciado de relleno sólido interno con Classic; espaciado de línea de pared interior con Arachne; espaciado de línea de pared exterior cuando solo se imprime una pared. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- `top_surface_density` / `bottom_surface_density`: 100 % = superficie sólida; valores menores crean superficie dispersa. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- El bloque sólido superior debe tener al menos 0,5 mm de grosor. Con capa de 0,25 mm → mínimo 2 capas sólidas; con 0,1 mm → 5 capas. — [Simplify3D — Gaps in Top Layers](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-top-layers/), capturado 2026-10-17
- El relleno interior actúa de base para las capas sólidas; relleno bajo (10 %) crea huecos grandes; pasar de 30 % a 50 % mejora la base. — [Simplify3D — Gaps in Top Layers](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-top-layers/), capturado 2026-10-17
- Si persisten huecos tras más capas y más relleno → under-extrusion. — [Simplify3D — Gaps in Top Layers](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-top-layers/), capturado 2026-10-17
- Con 0,3 mm de capa usar 3 capas superiores; con 0,1 mm usar 9 capas; sugerido al menos 3 capas superiores. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Establecer top o bottom solid layers a 0 anula el grosor mínimo de pared. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Patrón de relleno sólido por defecto: rectilinear. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Ensure vertical shell thickness: Disabled (extrusión adicional solo para capas superiores; puede hacer fallar la impresión) / Partial (soporte parcial) / Enabled (estándar; añade relleno sólido cerca de superficies inclinadas para garantizar el grosor de cáscara vertical; aplicado a capas sólidas superior e inferior). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Only one perimeter: fuerza un solo perímetro en capas superiores o en la primera capa para un acabado más limpio sin sacrificar rigidez; top y bottom controlables por separado. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- `only_one_wall_first_layer` / `only_one_wall_top`: una sola pared en superficies planas para dar más espacio al patrón de relleno superior; útil en features pequeñas (letras); requiere shell layers > 0. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- `top_surface_expansion` (novedad ≥ 2.4.2): expande las superficies superiores por una distancia (mm) para conectar superficies distintas y rellenar huecos donde un feature sube a través de ellas; no hace nada si shell layers = 0 o surface density = 0 %. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- Surface expansion: margin (despeje real respecto a las paredes), direction (inward / outward / inward_and_outward) e interacción con Only one wall (las paredes internas se eliminan sobre la superficie expandida). — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- `center_of_surface_pattern` (novedad ≥ 2.4.2): each surface / each model / each assembly. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- `top_surface_fill_order` / `bottom_surface_fill_order` (novedad ≥ 2.4.2): default / outward / inward; outward preferido para top, inward para bottom. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17

### Orden de paredes (wall sequence)

- Inner/Outer: mejor para voladizos (las paredes voladas se adhieren a un perímetro vecino); calidad superficial ligeramente reducida (perímetro externo aplastado contra el interno). — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- Inner/Outer/Inner: mejor acabado superficial externo y precisión dimensional (perímetro externo impreso sin perturbar); requiere mínimo 3 paredes; recomendado sobre Outer/Inner en la mayoría de casos. La primera capa se imprime Inner/Outer. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- Outer/Inner: misma calidad superficial y precisión dimensional que Inner/Outer/Inner, pero costuras Z menos consistentes (la primera extrusión de una nueva capa empieza en superficie visible). — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- `is_infill_first`: imprime relleno y cáscaras antes que las paredes (útil para voladizos); empeora el acabado superficial (ghosting); recomendado usar Precise Wall, Inner/Outer/Inner o reducir el overlap. La primera capa siempre imprime las paredes primero. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- `wall_direction`: ccw/cw para el contorno; los huecos se imprimen en dirección opuesta; un hueco cuya pared externa toca la del contorno (pared estrecha de 2 líneas) corre con el contorno. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- `reduce_crossing_wall`: evita cruzar paredes en movimientos de viaje; reduce defectos superficiales y stringing (PETG/TPU); aumenta el tiempo de impresión; recomendado para prints detallados/estéticos. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- `max_travel_detour_distance`: absoluto en mm, porcentaje del viaje directo, o 0 (sin límite). — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- External perimeters first: perímetros de exterior a interior; puede mejorar la precisión dimensional (perímetro externo primero, exceso presionado hacia afuera); superficie ligeramente menos suave. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Avoid crossing perimeters: minimiza cruces de perímetros externos en viajes; reduce stringing (especialmente con extrusoras Bowden) y mejora la calidad; ralentiza la generación de G-code y aumenta el tiempo. Mejorado en la versión 2.3. Max detour length configurable (absoluto, porcentaje, o 0 para desactivar). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Fill gaps: rellena huecos entre perímetros individuales y entre el perímetro más interno y el relleno. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17

### Paredes delgadas: Arachne vs Classic

- Classic: crea tantas paredes como permite `wall_loops` extruyendo a lo largo del perímetro con ancho de línea definido; no varía el ancho de extrusión; rápido y predecible. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- Arachne: ajusta dinámicamente el ancho de extrusión para seguir mejor la geometría; mejor manejo de detalles finos y transiciones suaves entre número de paredes; referencia un paper sobre control adaptativo de ancho. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- Arachne (default) vs Classic: Arachne ajusta automáticamente el ancho de extrusión; para la mayoría de impresiones Arachne es superior; para piezas funcionales donde la precisión de esquinas cóncavas es importante, Classic puede ser mejor. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Narrow walls (OrcaSlicer): cuando una pared es demasiado estrecha para las paredes de ambos lados, contorno y hueco comparten el espacio:
  - 2 líneas: solo las paredes externas del contorno y el hueco, tocándose; la pared externa del hueco se imprime primero para que la del contorno se apoye, salvo orden Outer/Inner.
  - 3 líneas: las dos externas y una línea entre ellas. Arachne imprime esa línea como pared interna compartida por ambos lados y sigue el orden de paredes. Inner/Outer/Inner no tiene tercera pared para imprimir primero, así que imprime pared externa del hueco, luego del contorno, luego la línea intermedia.
  - Ejemplo (tubo de pared 0,5 mm, 3 wall loops, Arachne): 1 mm → 2 líneas; 1,5 mm → 3 líneas; 2 mm → 4 líneas (con los órdenes detallados en la tabla de la fuente). — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
  - Classic rellena el medio de una pared de 3 líneas con gap fill, impreso después de ambas paredes externas, que mantienen el orden de 2 líneas. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- `wall_transition_angle`: ángulo máximo de cuña (grados) para crear transición entre número par e impar de paredes; bajar reduce transiciones pero puede dejar huecos o sobre-extruir. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `wall_transition_filter_deviation`: tolerancia alrededor del ancho mínimo de pared; el ancho se mantiene en [min − margin, 2×min + margin]; mayor reduce transiciones pero aumenta variabilidad de extrusión. Expresado como % del diámetro de boquilla. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `wall_transition_length`: longitud para dividir/unir segmentos de pared al cambiar el número de paredes. Expresado como % del diámetro de boquilla. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `wall_distribution_count`: cuántas paredes (desde el centro) reparten la variación de ancho; valores bajos concentran la variación en las internas, manteniendo las externas consistentes para mejor calidad superficial. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `min_bead_width`: ancho de la pared que reemplaza features delgados (los que superan el minimum feature size); si el feature es más grueso, la pared iguala su ancho. Expresado como % del diámetro de boquilla. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `initial_layer_min_bead_width`: ancho mínimo de pared para la primera capa; recomendado igualar al diámetro de boquilla para mejorar adhesión y estabilidad de las paredes base. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `min_feature_size`: ancho mínimo para que un feature del modelo se imprima; features por debajo se saltan; features por encima pero más delgados que `min_bead_width` se ensanchan. Expresado como % del diámetro de boquilla. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `min_length_factor`: evita segmentos de pared muy cortos o aislados que añaden tiempo innecesario; aumentar elimina paredes cortas no conectadas, mejorando eficiencia. Top y bottom no se ven afectados. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `wall_maximum_resolution`: longitud mínima de segmento de pared que Arachne conserva al simplificar; valores bajos preservan más segmentos y detalle curvo (mejor calidad superficial, mayor G-code y complejidad de movimiento); valores altos simplifican más (G-code más limpio y pequeño, menor fidelidad geométrica). — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17
- `wall_maximum_deviation`: error geométrico máximo permitido al simplificar paredes; aumentar permite simplificación más fuerte (menor G-code y menos movimientos pequeños) a costa de precisión; si entra en conflicto con `wall_maximum_resolution`, la desviación prevalece. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17

### Vase mode (caso de pared única)

- Vase mode crea un contenedor de un solo perímetro continuo con altura Z gradual. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Con vase mode activo, PrusaSlicer ajusta automáticamente: 1 perímetro, 0 % de relleno, capas sólidas superiores desactivadas, soportes desactivados, "ensure vertical shell thickness" desactivado. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Se puede ajustar el número de capas sólidas inferiores y el ancho de extrusión de los perímetros externos para un vaso más grueso/fuerte/estanco (ej. de 0,45 a 0,6). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- El modelo debe definirse como sólido (solo dimensiones exteriores). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Solo se puede imprimir un objeto a la vez en vase mode. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17

### Gap fill

- Prusa: Fill gaps rellena huecos entre perímetros individuales y entre el perímetro más interno y el relleno (ver "Orden de paredes"). — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Classic rellena el medio de paredes de 3 líneas con gap fill, impreso después de ambas paredes externas. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- Simplify3D: gap fill por defecto para huecos pequeños entre paredes delgadas; patrón back-and-forth ajustable al espacio. — [Simplify3D — Gaps in Thin Walls](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-thin-walls/), capturado 2026-10-17
- OrcaSlicer expone `gap_fill_flow_ratio` como variable de flow ratio para gap fill. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- Small area flow compensation (OrcaSlicer): ajusta el flujo dinámicamente en pequeñas áreas de relleno sólido (tops de letras estrechas); solo aplica a internal solid infill, top surfaces y first layer bottom surfaces; solo con patrones rectilinear / aligned rectilinear / monotonic / monotonic line. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17

### Precisión dimensional (encaje/tolerancias)

- Inner/Outer/Inner y Outer/Inner ofrecen mejor precisión dimensional que Inner/Outer (perímetro externo impreso sin perturbar). — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- External perimeters first puede mejorar la precisión dimensional. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- `wall_maximum_deviation` afecta la precisión de la pared (mayor valor = menor precisión). — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17

### Flow ratio por feature (OrcaSlicer)

- OrcaSlicer permite ajustar flow ratios independientes para: top/bottom solid infill, outer/inner walls, overhang perimeters, sparse infill, internal solid infill, gap fill, support y support interfaces, además del flow ratio global y el de primera capa; requiere activar "Set other flow ratios". — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17

## Contradicciones

### 1. Mínimo de capas sólidas superiores

- Prusa: con 0,3 mm de capa usar 3 capas superiores; con 0,1 mm usar 9 capas (≈ 0,9 mm de grosor sólido); sugerido al menos 3. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- Simplify3D: el bloque sólido superior debe tener al menos 0,5 mm de grosor (2 capas a 0,25 mm; 5 capas a 0,1 mm). — [Simplify3D — Gaps in Top Layers](https://www.simplify3d.com/resources/print-quality-troubleshooting/gaps-in-top-layers/), capturado 2026-10-17
- OrcaSlicer: recomendado al menos 3 shell layers. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17

**Matiz.** No se contradicen en el fondo (a menor altura de capa, más capas sólidas), pero el umbral de grosor objetivo difiere: Prusa apunta a ≈ 0,9 mm, Simplify3D a 0,5 mm mínimo. Son reglas de dedo de slicers distintos. **El redactor debe presentar ambos umbrales con atribución, no elegir uno.**

### 2. Voladizo vs acabado superficial en el orden de paredes

- Inner/Outer: mejor para voladizos (las paredes voladas se adhieren a un perímetro vecino), a costa de calidad superficial ligeramente reducida. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- Inner/Outer/Inner: mejor acabado superficial y precisión dimensional, pero reduce el rendimiento de voladizo (no hay perímetro interno contra el que imprimir la pared externa). — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17

**Matiz.** Trade-off explícito, no contradicción: mejor voladizo o mejor acabado superficial, no ambos a la vez. **El redactor debe explicar el intercambio y dejar que el usuario priorice.**

### 3. Inner/Outer/Inner vs Outer/Inner

- Inner/Outer/Inner: recomendado sobre Outer/Inner en la mayoría de casos; requiere mínimo 3 paredes. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17
- Outer/Inner: ofrece la misma calidad superficial y precisión dimensional, pero costuras Z menos consistentes. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17

**Matiz.** La diferencia no está en la calidad superficial (idéntica) sino en la consistencia de la costura Z y en el mínimo de 3 paredes de Inner/Outer/Inner. **El redactor debe aclarar que "recomendado" no implica mejor calidad superficial.**

### 4. External perimeters first (Prusa) vs Outer/Inner (OrcaSlicer)

- Prusa "External perimeters first": imprime de exterior a interior; puede mejorar la precisión dimensional; superficie ligeramente menos suave. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- OrcaSlicer "Outer/Inner": misma dirección; misma calidad superficial y precisión dimensional, pero costuras Z menos consistentes. — [OrcaSlicer — Wall and Surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-17

**Matiz.** Coinciden en la dirección de impresión; difieren en el efecto secundario reportado (Prusa: superficie menos suave; OrcaSlicer: costuras Z menos consistentes). **El redactor debe atribuir cada efecto a su fuente y no fusionarlos.**

### 5. Solape 25–30 %: mismo número, distinta base de cálculo

- OrcaSlicer: 25–30 % es un buen punto de partida para `top_bottom_infill_wall_overlap`. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17
- La base del porcentaje cambia según el wall generator y el número de paredes: Classic usa mitad del espaciado de pared interior + mitad del espaciado de relleno sólido interno; Arachne usa el espaciado de pared interior; con una sola pared, el espaciado de pared exterior. — [OrcaSlicer — Top/Bottom Shells](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_top_bottom_shells), capturado 2026-10-17

**Matiz.** No es una contradicción entre fuentes, sino una ambigüedad dentro de una misma fuente: el valor 25–30 % no es comparable directamente entre configuraciones. **El redactor debe advertir que cambiar de Classic a Arachne cambia el significado del mismo porcentaje.**

### 6. Arachne vs Classic: superioridad no absoluta

- Prusa: para la mayoría de impresiones Arachne es superior; para piezas funcionales donde la precisión de esquinas cóncavas es importante, Classic puede ser mejor. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- OrcaSlicer describe ambos generadores sin declarar una preferencia explícita. — [OrcaSlicer — Wall Generator](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_generator), capturado 2026-10-17

**Matiz.** No se contradicen; Prusa añade un criterio de selección (precisión de esquinas cóncavas) que OrcaSlicer no menciona. **El redactor debe atribuir ese criterio a Prusa y no presentarlo como consenso.**

### 7. Detección de paredes delgadas: desactivación con Arachne

- Prusa: Detect thin walls se desactiva automáticamente si Arachne está activo. — [Prusa KB](https://help.prusa3d.com/article/layers-and-perimeters_1748), capturado 2026-10-17
- OrcaSlicer: recomienda usar Arachne, que desactiva `detect_thin_wall` porque usa un enfoque distinto. — [OrcaSlicer — Walls](https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls), capturado 2026-10-17

**Matiz.** Consistentes entre sí, pero con énfasis distinto: Prusa lo presenta como desactivación automática, OrcaSlicer como recomendación. **No hay conflicto; el redactor puede unificar ambas formulaciones.**

## Sin respaldo

- Que la resistencia de una pieza sea "principalmente" de los perímetros implique que añadir relleno no compensa la falta de perímetros: las fuentes afirman la primacía de los perímetros pero no cuantifican la relación ni dan un umbral a partir del cual el relleno empieza a importar. **[INFERENCIA NUESTRA — sin respaldo cuantitativo]**
- Que el grosor óptimo de pared delgada calculado por PrusaSlicer (0,86 mm para 2 perímetros a 0,2 mm) se pueda aplicar a otros slicers o boquillas: es un cálculo específico de PrusaSlicer para su modelo de sección (rectángulo con extremos semicirculares) y su solape. **[UNA SOLA FUENTE — Prusa, sin corroborar por OrcaSlicer ni Simplify3D]**
- Que "al menos 3 capas sólidas superiores" sea suficiente en todos los casos: Prusa lo sugiere como mínimo y OrcaSlicer recomienda ≥ 3, pero Simplify3D exige ≥ 0,5 mm (5 capas a 0,1 mm). No hay un consenso numérico único. **[SÍNTESIS NUESTRA — los umbrales difieren entre fuentes]**
- Que una pared de una sola extrusión (detect thin walls / allow single extrusion fill) tenga "resistencia reducida": afirmado por OrcaSlicer y Simplify3D, pero la magnitud de la reducción no se cuantifica en ninguna fuente. **[CUANTIFICACIÓN AUSENTE]**
- Encaje/tolerancias: ninguna fuente da valores de holgura o interferencia para piezas que deben encajar; solo afirmaciones genéricas de precisión dimensional (Inner/Outer/Inner, External perimeters first, wall_maximum_deviation). **[SIN DATOS EN LAS FUENTES]**
- Que Arachne sea superior a Classic para todos los casos: Prusa limita la superioridad a "la mayoría de las impresiones" y reserva Classic para precisión de esquinas cóncavas en piezas funcionales. **[MATIZ DE FUENTE — no es superioridad absoluta]**
- Que `alternate_extra_wall` mejore la resistencia en todos los materiales/patrones: OrcaSlicer lo contraindica con Lightning infill y con Ensure vertical shell thickness: All. **[LIMITACIÓN DOCUMENTADA POR LA FUENTE]**

## Tirado

- **Notas del recolector** de los 7 ficheros raw: metadatos del proceso (alcance, idioma, observaciones del recolector), no afirmaciones. Tiradas, pero informan el alcance.
- **Imágenes y miniaturas** referenciadas por URL en las fuentes (walls.png, top-bottom-shells.png, gifs de orden de paredes, diagramas de sección de Prusa): no descargadas; no son afirmaciones y no respaldan datos. Tiradas como ilustración, no como evidencia.
- **Navegación de wiki** de OrcaSlicer (enlaces internos entre páginas de settings, "Related Topics" de Simplify3D, índice de secciones): tirada como navegación sin contenido.
- **Etiquetas de modo y CLI examples** de OrcaSlicer (Mode: Simple/Advanced/Expert, `--wall-loops=1`, etc.): son metadatos de UI del slicer, no afirmaciones sobre impresión. Los nombres de variables se conservan en las afirmaciones; la sintaxis CLI y el modo se tiran.
- **Video recomendado** de Maker's Muse en la página de Walls de OrcaSlicer: anuncio/recomendación externa, no dato técnico. Tirado.
- **Surface patterns** de OrcaSlicer (lista de 9 patrones) y **surface expansion original/expanded images**: la lista de patrones se tira como catálogo de UI; las imágenes, como ilustración. Se conserva solo la funcionalidad de surface expansion.
- **Thick bridges** y **Detect bridging perimeters** (Prusa): afectan a puentes/voladizos, no al tema de paredes; tirados como fuera de alcance.
- **Spiral vase** (Prusa): el resto del artículo (scar en el punto de cambio de capa, ajuste automático de settings, secuencia de activación) se consolida en la sección "Vase mode"; no se tira. La mención de "External perimeters Extrusion width" para vasos más gruesos se conserva como afirmación.
- **Repeticiones consolidadas**: la idea de que "más capas sólidas a menor altura de capa" aparece en Prusa, OrcaSlicer y Simplify3D; se quedan las tres formulaciones porque los umbrales difieren (ver Contradicciones §1). La idea de "paredes delgadas como una sola extrusión reduce calidad/resistencia" aparece en Prusa, OrcaSlicer y Simplify3D; se consolidan en "Mínimo de paredes y paredes cerradas" con las tres atribuciones. "Avoid crossing perimeters" aparece en Prusa y OrcaSlicer; se consolidan en "Orden de paredes" con ambas atribuciones. "Fill gaps" aparece en Prusa, OrcaSlicer y Simplify3D; se consolida en "Gap fill".
- **End Notes / boilerplate** de las fuentes (tickets de soporte, Bambu AI, etc.): no presentes en estas fuentes; no aplica.
- **Encaje/tolerancias**: ninguna fuente aporta valores de holgura/interferencia; por eso no hay afirmaciones numéricas de tolerancia en este fichero (ver Sin respaldo).

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| resistencia de la pieza | número de perímetros | la resistencia está definida principalmente por los perímetros, no por el relleno |
| resistencia de la pieza | relleno (infill) | el relleno actúa de base para las capas sólidas; relleno bajo crea huecos y sag |
| resistencia de la pieza | shell layers (top/bottom) | más capas sólidas aumentan la resistencia general y la calidad superficial |
| resistencia de la pieza | alternate_extra_wall | una pared extra cada dos capas encaja el relleno verticalmente entre paredes |
| mínimo de perímetros | detect thin walls | por defecto mínimo 2 perímetros; detect thin walls permite pared de una sola extrusión |
| pared delgada (single extrusion) | calidad superficial y resistencia | reducidas por no ser bucles cerrados |
| pared delgada (single extrusion) | Arachne | Arachne desactiva detect thin walls y maneja mejor los detalles finos |
| grosor óptimo de pared delgada | número de perímetros | calculado por PrusaSlicer para un número de perímetros y altura de capa dados |
| grosor óptimo de pared delgada | altura de capa | la altura de capa entra en el cálculo; cambiarla cambia el grosor ideal |
| solape relleno/pared (25–30 %) | wall generator | la base del porcentaje cambia entre Classic y Arachne |
| solape relleno/pared (25–30 %) | pinholes en superficie | el solape mejora la unión y minimiza pinholes donde relleno y pared se encuentran |
| orden de paredes (Inner/Outer/Inner) | voladizos | Inner/Outer es mejor para voladizos; Inner/Outer/Inner sacrifica voladizo por acabado |
| orden de paredes (Inner/Outer/Inner) | precisión dimensional | mejor precisión porque el perímetro externo se imprime sin perturbar |
| orden de paredes (Outer/Inner) | costuras Z | costuras Z menos consistentes que con Inner/Outer/Inner |
| paredes estrechas (narrow walls) | Arachne vs Classic | Arachne comparte una pared interna en paredes de 3 líneas; Classic usa gap fill |
| paredes estrechas (narrow walls) | gap fill | Classic rellena el medio de paredes de 3 líneas con gap fill |
| Arachne | precisión de esquinas cóncavas | Classic puede ser mejor en piezas funcionales donde importa |
| capas sólidas superiores | altura de capa | a menor altura de capa, más capas sólidas para el mismo grosor |
| capas sólidas superiores | relleno interior | el relleno actúa de base; relleno bajo crea huecos y sag |
| capas sólidas superiores | under-extrusion | huecos persistentes tras más capas y más relleno indican under-extrusion |
| vase mode | pared única | un solo perímetro continuo, 0 % relleno, sin capas sólidas superiores |
| gap fill | paredes delgadas | rellena huecos entre perímetros y entre el perímetro interno y el relleno |
| gap fill | flow ratio | OrcaSlicer expone `gap_fill_flow_ratio` |
| small area flow compensation | letras estrechas | ajusta el flujo en pequeñas áreas de relleno sólido |
| precisión dimensional | encaje/tolerancias | las fuentes solo dan afirmaciones genéricas; no hay valores de holgura/interferencia |
| surface expansion | top surfaces | conecta superficies superiores interrumpidas por features |
| only one wall | superficies planas / letras | una sola pared para dar espacio al patrón de relleno superior |
