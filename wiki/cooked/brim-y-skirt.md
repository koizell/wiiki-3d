---
titulo: "Brim y skirt en OrcaSlicer"
tema: brim-y-skirt
fuentes:
  - wiki/raw/brim-y-skirt-orcaslicer-others-settings-skirt.md
  - wiki/raw/brim-y-skirt-orcaslicer-others-settings-brim.md
  - wiki/raw/brim-y-skirt-orcaslicer-prepare-brim-ears-painting.md
  - wiki/raw/brim-y-skirt-orcaslicer-quality-settings-precision.md
  - wiki/raw/brim-y-skirt-orcaslicer-support-settings-raft.md
  - wiki/raw/brim-y-skirt-orcaslicer-quality-settings-wall-and-surfaces.md
cocinado: 2026-10-16
---

## Afirmaciones

### Skirt: función y concepto

- Skirt: uno o más perímetros adicionales impresos alrededor del contorno del modelo en la(s) primera(s) capa(s). Sirve para purgar la boquilla (priming), estabilizar la extrusión antes de empezar la pieza y puede actuar como barrera básica de viento/corriente si se construye más alto. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- Set `skirt_loops = 0` desactiva el skirt. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- Por defecto suelen recomendarse 2 bucles; más bucles mejoran el purgado y dan mayor margen entre boquilla y pieza, a costa de más filamento y tiempo. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `skirt_type`: `combined` (una sola skirt alrededor de todos los objetos de la cama; recomendado uso general) o `perobject` (skirt separada por objeto; objetos cercanos con skirts que se solapan comparten una skirt). — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `perobject` se recomienda al imprimir por secuencia "by object". — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `min_skirt_length` (mm mínimos de filamento extruido al imprimir el skirt; 0 desactivado). Útil cuando la impresora está configurada para imprimir sin línea de purga (prime line). El número final de bucles no se considera al ordenar objetos ni validar distancias: en ese caso aumentar los bucles. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `skirt_distance`: distancia de la skirt al brim o al objeto. Aumentar ayuda a evitar colisiones con brims o soportes, pero aumenta la huella del skirt y el uso de filamento. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `skirt_start_angle`: ángulo inicial de la skirt relativo al centro del objeto. 0° es la posición más a la derecha (+X), los ángulos aumentan en sentido antihorario. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `skirt_speed` (mm/s): a 0 usa la velocidad "First layer infill" en la primera capa y la velocidad de "Support" en capas superiores. Las velocidades de skirt muy rápidas pueden no adherir bien, desprenderse y causar problemas con la pieza. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `skirt_height`: número de capas del skirt. Normalmente 1 capa para purgado; se aumenta si se quiere efecto de escudo/corriente más alto. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `draft_shield` habilitado imprime la skirt como escudo de corriente: una pared más alta alrededor de la pieza para proteger de corrientes y cambios bruscos de temperatura (especialmente ABS/ASA). Más útil en impresoras open-frame sin cerramiento. Con `enabled`, el escudo es tan alto como el modelo más alto de la cama; con `disabled`, el skirt usa `skirt_height`. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- El skirt se imprime a la "skirt distance" del brim, o del objeto si no tiene brim, de modo que el escudo de corriente no interseca con los brims. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16
- `single_loop_draft_shield`: cuando se habilita limita el skirt/escudo a una sola pared tras la primera capa (un solo bucle en capas siguientes). Reduce filamento y tiempo de impresión, pero hace el escudo menos robusto y más propenso a warping o cracking. — [OrcaSlicer Wiki, Skirt](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_skirt), capturado 2026-10-16

### Brim: función y concepto

- Brim: capa plana impresa alrededor de la base del modelo para mejorar la adhesión a la cama. Útil para modelos con poca superficie de apoyo o propensos a warping. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `brim_type` (choice) controla cómo se genera el brim en los lados exterior/interior del modelo: `auto_brim`, `brim_ears`, `painted`, `outer_only`, `inner_only`, `outer_and_inner`, `no_brim`, `leading_edge_only`. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

### Auto brim (cálculo)

- Auto brim calcula la anchura óptima evaluando propiedades del material, geometría de la pieza, velocidad de impresión y características térmicas. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- Geometría usada: altura del modelo y forma de la primera capa; la relación altura-área se calcula a partir de la altura del modelo y el segundo momento de área de la primera capa. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- Tiempo de impresión: a mayores velocidades máximas de impresión, generalmente se recomienda mayor anchura de brim. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- Longitud térmica: diagonal de la base del modelo. Longitudes de referencia material-specific: ABS, PA-CF, PET-CF: 100; PC: 40; TPU: 1000. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- Coeficiente de adhesión del material: por defecto 1; PETG/PCTG: 2; TPU: 0.5. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- La anchura computada de auto brim queda capada a 18 mm y a 1,5× la longitud térmica. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- Si la anchura final queda por debajo de 5 mm y además por debajo de 1,5× la longitud térmica, no se genera brim (anchura = 0). — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

### Brim manual: tipos outer/inner

- `outer_only`: brim alrededor del perímetro externo del modelo; más fácil de remover que el inner, pero puede afectar al aspecto si no se remueve limpiamente. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `inner_only`: brim alrededor de perímetros internos; más difícil de remover y menos efectivo que el outer; puede ocultar detalles finos internos, pero puede ocultar la costura de remoción del brim. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `outer_and_inner`: brim en ambos perímetros externo e interno. Combina las desventajas de ambos tipos: más difícil de remover y puede ocultar detalles, pero mejora la adhesión global. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- Sugerencia asociada a `outer_and_inner`: considerar usar un raft en modelos complejos/materiales exigentes. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

### Mouse ears (brim_ears)

- Mouse ears: extensiones locales del brim (típicamente cerca de esquinas y features afiladas) que mejoran la adhesión a la cama y reducen warping usando menos material que un brim completo. El análisis de geometría selecciona candidatos según umbral de ángulo y radio de detección. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `brim_ears_max_angle` (°): umbral para decidir dónde poner mouse ears. 0° = desactivado (no se generan); entre 0° y 180° = orejas en features con ángulo local más afilado (menor) que el umbral; 180° = orejas permitidas en casi cualquier feature no recto. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `brim_ears_detection_length`: la geometría se decima antes de detectar ángulos agudos; este parámetro fija la mínima longitud de desviación usada en la decimación. 0 = desactivado. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `brim_ears_outer_only` (boolean, feature nightly / releases > 2.4.2): cuando está habilitado, los brim ears se generan solo en el contorno externo del modelo; se excluyen las orejas que se colocarían en agujeros o secciones cerradas. Disponible para Mouse Ears y Painted. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

### Painted brim

- `painted`: genera un brim solo en las áreas pintadas en la pestaña Prepare (ver herramienta "Brim ears Painting"). — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- La herramienta "Brim ears Painting" permite pintar brim ears en la base del modelo. Incluye Auto-generate, que detecta y aplica brim ears automáticamente en áreas adecuadas. — [OrcaSlicer Wiki, Brim ears Painting](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_brim_ears_painting), capturado 2026-10-16
- Parámetros de la herramienta: Brim ear radius (radio de orejas manuales/Autogenerate; de 0,1 mm a 100 mm); Max angle (máximo ángulo al que se aplican orejas con Autogenerate); Detection radius (valores menores detectan más candidatos, usando Ramer-Douglas-Peucker); Section view (ajusta la altura de la vista seccional). — [OrcaSlicer Wiki, Brim ears Painting](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_brim_ears_painting), capturado 2026-10-16
- Cuando Brim type = Painted, conviene habilitar "Brim ears outer only" (Process > Others > Brim) para excluir orejas pintadas en agujeros o secciones cerradas al slicer; el control se renombró "Brim ear radius" y acepta 0,1–100 mm (nightly / releases > 2.4.2). — [OrcaSlicer Wiki, Brim ears Painting](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_brim_ears_painting), capturado 2026-10-16

### Otras opciones de brim

- `no_brim`: no imprime brim alrededor del modelo. Los brims de objetos vecinos se mantienen a una línea de brim de distancia, sin tocarlo. Útil como setting por objeto para saltarse el brim en piezas que no lo necesitan; los demás ajustes de brim se desactivan. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `leading_edge_only` (nuevo feature, nightly / releases > 2.4.2): solo impresoras belt. Genera brim en y por delante del primer contacto con la banda, sin extenderse por todo el objeto. En impresoras sin banda este tipo se imprime como brim Outer. Se usa con `Leading length` para anclar el leading edge sin imprimir brim a lo largo de toda la pieza. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `brim_width`: distancia entre el modelo y la línea de brim más externa. Aumentarlo ensancha el brim (mejora adhesión, más material). — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
  - En impresora belt: la anchura se mide en la superficie de la banda y aplica a todos los tipos de brim. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
  - Cuando Brim type = Mouse ear, este ajuste se etiqueta "Brim ear radius" (nightly / releases > 2.4.2) y su valor fija el radio de cada oreja autogenerada. Cuando Brim type = Painted, el tamaño de las orejas se controla en "Brim ears Painting tool". — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `combine_brims` (boolean): combina brims adyacentes en un solo brim continuo cuando se tocan. Desactivado: cada brim se genera e imprime por separado; cada brim termina antes de su objeto. Activado: brims que tocan se fusionan y se imprimen como loops continuos más largos, lo que puede mejorar la adhesión de objetos pequeños o muy juntos. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `brim_object_gap`: espacio entre la línea de brim más interna y el objeto. Aumentarlo facilita remover el brim pero reduce su beneficio de adhesión; gaps muy grandes pueden eliminar el contacto y negar el propósito del brim. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

### Brim — Flow ratio

- `brim_flow_ratio`: factor que afecta la cantidad de material de los brims. Un valor ligeramente mayor que 1,0 puede ayudar al brim a sujetar la impresión sobre la placa, pero también puede dificultar la remoción. Flow brim real = `brim_flow_ratio` × flow ratio del filamento (y si procede, flow ratio del objeto). El resultado no se ve afectado por el first-layer flow ratio. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
  - Relacionado: el flow ratio de primera capa (`first_layer_flow_ratio`) no afecta a brims ni skirts; solo al resto de la primera capa. — [OrcaSlicer Wiki, Wall and surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-16
  - El flow ratio de impresión (`print_flow_ratio`) escala todas las extrusiones del objeto proporcionalmente; los top/bottom surface flow ratios afectan la cantidad de material del infill sólido superior/inferior. El flujo real se calcula multiplicando por el flow ratio del filamento y, si está, el flow ratio del objeto. — [OrcaSlicer Wiki, Wall and surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-16
  - Recomendación: calibrar el flow ratio antes de usar un valor distinto de 1. — [OrcaSlicer Wiki, Wall and surfaces](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces), capturado 2026-10-16

### Brim y Elephant Foot Compensation (EFC)

- `brim_use_efc_outline` (boolean): cuando se habilita, el brim se alinea con la geometría del perímetro de la primera capa después de aplicar Elephant Foot Compensation. Pensado para casos donde EFC altera significativamente la huella de la primera capa. Si el setup ya funciona bien, habilitarlo puede ser innecesario y hacer que el brim se fusione con capas superiores. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- EFC: compensa "elephant foot" del primeras capas más anchas (causa: peso del material sobre ellas, expansión térmica, cama demasiado caliente, nivelado inexacto). Se encoge la primera capa por una distancia positiva que decrece linealmente a lo largo del número de capas. — [OrcaSlicer Wiki, Precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16
- EFC solo se aplica cuando el objeto se imprime directamente sobre la placa de construcción; se omite cuando se usa raft (el objeto no está sobre la placa). — [OrcaSlicer Wiki, Precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16
- Con EFC alta, el brim puede verse desconectado del objeto en la previsualización, pero en la impresión final queda correctamente anexado (si la compensación está bien calibrada). Si el valor de EFC es alto, conviene habilitar "Brim use EFC outline". — [OrcaSlicer Wiki, Precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16
- `elefant_foot_compensation` (Float) y `elefant_foot_compensation_layers` (Integer) controlan distancia/decadencia. — [OrcaSlicer Wiki, Precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16
- `elefant_foot_layers_density` (Expert, %, rango 50–100%, por defecto 100% = feature desactivada): controla la densidad de infill sólido interno en las capas de EFC sobre la capa base. Ayuda a reducir acumulación de material / ondas / roces de boquilla en capas sólidas tempranas con squish alto de primera capa. Solo afecta infill sólido interno dentro de la zona de compensación; no cambia sparse infill, superficies superiores ni la capa base. Empezar con 80–90% y 1–2 capas de compensación y ajustar según ondas/roces visibles. — [OrcaSlicer Wiki, Precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16

### Brim en impresoras belt

- En belt: el objeto toca la banda a lo largo de una tira estrecha por capa; el brim se imprime en la superficie inclinada de la banda, una tira a la vez, en todas las capas que alcanzan la banda. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- En belt: Outer/Inner/Outer and Inner/Leading edge only funcionan como se describe; Auto/Mouse Ears/Painted se imprimen como Outer brim usando `brim_width`. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- En belt: disponibles `leading_length` y `extra_width`; `brim_use_efc_outline` y `combine_brims` desactivados (solo primera capa plana); el brim no es compatible con Spiral vase. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- El brim solo se genera si la inclinación de la banda está entre 1 y 85 grados. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `leading_brim_length` (belt, nightly / releases > 2.4.2): extiende el brim por la banda delante de cada leading edge del área de contacto del objeto (primer contacto y cualquier isla que contacta más tarde). "Aprón" impreso antes del leading edge, ya anclado a la banda. Longitud medida en superficie de banda y sumada a `brim_width`: brim se extiende `Brim-object gap + Leading length + Width` por delante del objeto. Poner `brim_object_gap = 0` para que el aprón toque el borde anclado. En banda inclinada cada capa aporta un strip; el espesor del sheet se determina por flow, no por altura de capa. Usar `brim_flow_ratio` para ajustar. 0 = desactivado. Auto arrange no reserva espacio para el leading brim; dejar hueco suficiente entre objetos a lo largo de la banda. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `extra_brim_width` (belt, nightly / releases > 2.4.2): ensancha el brim a lo ancho de la banda sin avanzarlo más adelante ni atrás. Para piezas que necesitan más adhesión a lo largo que con `brim_width` sola. Se suma a `brim_width`: brim se extiende `Brim-object gap + Width + Extra width` a cada lado. 0 = desactivado. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

### Cuándo NO conviene brim: alternativa raft

- Raft: plataforma de soporte material impresa bajo el objeto; la pieza se imprime sobre el raft y este se retira después. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- Raft ayuda cuando: el material tiende a warpear/levantar esquinas (ABS, ASA, PC, Nylon); la pieza toca la cama con área pequeña, features finas o bordes agudos; o la placa está desigual/desgastada (el raft absorbe pequeñas variaciones de altura). — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- A cambio, el fondo de la pieza queda más rugoso, la impresión tarda más y gasta más material, y hay que retirar el raft. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- Si el problema es solo adhesión o warping, probar antes con brim: es más rápido, usa menos material y deja la superficie inferior limpia. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- Raft no se puede imprimir en impresoras belt. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- EFC no se aplica con raft, porque la pieza no se imprime sobre la placa. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- Todos los objetos de la placa deben usar el mismo número de capas de raft si hay prime tower. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- Rafts de objetos vecinos no se fusionan; con varios objetos con raft en placa, poner espaciado de Auto Arrange de al menos 2× el alcance del raft para que no se solapen. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16

### Raft: construcción (resumen accionable)

- Un raft lo genera el support generator y se imprime con settings/filamento de soporte incluso con supports desactivados; con supports activados, también se extiende bajo los soportes plantados sobre la placa. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- `raft_layers` (integer; 0 = desactivado). Mitad redondeada hacia arriba son interface; el resto base. Con 2+ capas, la primera cuenta como base.
  - 1 capa = 0 base + 1 interface (se imprime como first layer)
  - 2 = 1 base + 1 iface
  - 3 = 1 base + 2 iface
  - 4 = 2 base + 2 iface
  - 5 = 2 base + 3 iface
- Excepto la primera capa, las capas de raft se imprimen a al menos 75% del diámetro de boquilla de grosor, o la layer height si fuera mayor. La first layer height aplica al raft; la primera capa del objeto se imprime a altura normal.
- Recomendación: 2–4 capas para la mayoría; más capas cuando la placa esté desigual o el material deforme mucho.
- `raft_contact_distance`: gap vertical entre el top del raft y el bottom del objeto. Gap mayor = raft más fácil de remover pero fondo más rugoso (la primera capa del objeto se imprime sobre el gap); gap menor = fondo más suave pero raft más difícil de remover. El valor se redondea a múltiplo de layer height salvo que se active "Independent support layer height". Se oculta/ignora cuando el support top Z distance = 0 (soportes solubles); entonces el objeto se imprime directamente sobre el raft sin gap. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16
- `raft_expansion` (float, nightly / releases > 2.4.2): expande cada capa de raft en XY alrededor de la primera capa del objeto. Un raft más ancho distribuye las fuerzas de warping en más área y da base más estable, a costa de más material/tiempo/espacio. Se muestra solo con `raft_layers` > 0. Tree Slim/Strong/Hybrid ignoran este ajuste (dimensionan raft solo con initial layer expansion) y lo dejan desactivado. Con más de una capa, la primera del raft se ensancha además con Initial layer expansion: con valores por defecto alcanza 1,5 mm + 2 mm = 3,5 mm más allá del objeto.
- Support ironing puede activarse con raft incluso con supports desactivados, para suavizar el top del raft; ironing también hace sólidas las capas de interfaz del raft. — [OrcaSlicer Wiki, Raft](https://github.com/OrcaSlicer/OrcaSlicer/wiki/support_settings_raft), capturado 2026-10-16

### Criterios de medición / primeras capas (afirmaciones presentes en fuentes)

- `brim_object_gap` vincula directamente la remoción vs adhesión (gap excesivo elimina contacto). [Brim]
- Distancia efectiva del brim en belt: `Brim-object gap + Leading length + Width` (adelante del objeto) y `Brim-object gap + Width + Extra width` (a cada lado). [Brim]
- Auto brim: anchura capada a 18 mm y 1,5× longitud térmica; mínimo efectivo 5 mm o se desactiva. [Brim]
- Priming "mínimo": `min_skirt_length` permite ajustar purgado cuando no hay prime line. [Skirt]
- Pantalla de corriente: skirt impresa a `skirt_distance` del brim/objeto. [Skirt]
- EFC: shrink positivo en la primera capa que decrece linealmente a lo largo de N capas. [Precision]
- `elefant_foot_layers_density` 50–100 %, por defecto 100 % (desactivado); guía de arranque 80–90 % y 1–2 capas. [Precision]
- `brim_flow_ratio` real excluye el `first_layer_flow_ratio`. [Brim] + [Wall and surfaces]
- Señal visual: con EFC alto, brim puede verse despegado en preview; si está bien calibrado queda unido en la impresión. [Precision]
- Detección de mouse ears: umbral de ángulo 0/0-180/180 y radio de decimación (`brim_ears_detection_length`; 0 = desactivado). [Brim]
- Rango de brim ears pintados: 0,1–100 mm de radio. [Brim ears Painting]

## Contradicciones

### `brim_use_efc_outline`: útil pero puede fundir con capas superiores

- Habilitar `brim_use_efc_outline` se recomienda cuando EFC altera mucho la huella y/o cuando EFC es alto (para asegurar anexión del brim). — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim) + [Precision](https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_precision), capturado 2026-10-16
- En la misma fuente se afirma: si el setup actual ya funciona bien, habilitarlo puede ser innecesario y hacer que el brim se fusione con capas superiores. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16

**Se contradicen (tensión operativa).** La activación ayuda a la anexión de brim con EFC alta, pero un setup ya calibrado puede no necesita el flag y corre riesgo de fusión. **El redactor debe explicar el matiz (activar solo si EFC significativa/alta o preview muestra brim despegado), no elegir un valor.**

### Facilidad de remoción vs efectividad (outer vs inner)

- `outer_only`: más fácil de remover, puede afectar al aspecto si no se remueve limpiamente. — [OrcaSlicer Wiki, Brim](https://github.com/OrcaSlicer/OrcaSlicer/wiki/others_settings_brim), capturado 2026-10-16
- `inner_only`: más difícil de remover y menos efectivo que el outer, oculta costura de remoción pero puede ocultar detalles finos. — misma [OrcaSlicer Wiki, Brim] capturado 2026-10-16
- `outer_and_inner`: combina las desventajas de ambos (más difícil de remover, oculta detalles) pero mejora la adhesión global. — misma fuente

**No es una contradicción factual entre fuentes, pero un mismo objetivo (adhesión) pide tipos cuyos costes se contraponen; el redactor debe presentarlos como trade-off, no como opción "correcta".** Anotado porque el valor recomendado depende del caso (limpieza visual vs máxima adhesión).

### EFC en preview vs impresión final

- Con EFC alta el brim puede verse desconectado en la previsualización, pero en la impresión final queda correcto si está calibrado. — [OrcaSlicer Wiki, Precision], capturado 2026-10-16
- `no_brim` y la separación "los brims vecinos se mantienen a una línea de distancia" implica que un brim puede parecer aislado sin ser error. — [OrcaSlicer Wiki, Brim], capturado 2026-10-16

**Tensión visual:** una imagen de preview con brim despegado puede ser esperable/normal. **El redactor debe avisar de que no es síntoma automático de fallo y cómo distinguirlo.**

### Escudo de corriente vs bucle único

- Escudo (draft_shield) tay alto como el modelo más alto maximiza protección térmica. — [Skirt]
- `single_loop_draft_shield` reduce material/tiempo haciendo shield de una sola pared, pero "más propenso a warping o cracking". — [Skirt]

**Se contradicen en el objetivo (protección vs ahorro).** Anotado como trade-off intencional, no como error: el redactor debe exponer ambos costes.

## Sin respaldo

Ninguna afirmación proviene de una única fuente secundaria: las seis fuentes de este tema son documentación oficial de OrcaSlicer (fuentes primarias) y por tanto no requieren marca de "una sola fuente". Las ideas que aparecen en un único documento (p. ej. la nota de "brim speed muy rápido puede desprenderse") son primarias igualmente y no se marcan.

## Tirado

- Menús de navegación, índice (TOC) de cada página, enlaces internos del wiki OrcaSlicer (option_mode, cli_mode, belt_printing, etc.) y pie de página: descartados por ser navegación sin contenido enlazado. — en los 6 raw.
- Las secciones "Notas del recolector" de cada raw: son metadatos del proceso de recolección, no contenido técnico de OrcaSlicer; descartadas como material para el artículo.
- De `quality_settings_precision`: se descartó lo irrelevante para brim/skirt/primeras capas (Slice gap closing radius, Resolution, Arc fitting, X-Y Compensation, Precise wall, Precise Z Height, Polyholes) por no tener relación directa con el tema.
- De `quality_settings_wall_and_surfaces`: solo se conservó la sección "Surface flow ratio"; el resto del listado de variables de flow se condensó en una sola afirmación relevante (el first-layer flow ratio no afecta brims/skirts).
- Anuncios/productos/tiendas/precios: no existen en las fuentes (todas son docs oficiales); nada que tirar por esa causa.
- Equivalencias de estilo: frases genéricas del tipo "feature nuevo de nightly" se conservaron junto a la condición de versión, pero se omitieron textos de advertencia redundantes sobre "NEW FEATURE" salvo cuando aportaban condición accionable (versión/disponibilidad).
- Repetidos: la idea "brim mejora adhesión" estaba en varias páginas; se conserva una redacción y las demás se tratan como corroboración (Brim + Auto + Outer/inner + raft tip + painted tool).

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| skirt | primado/purga de hotend | perímetros adicionales que estabilizan la extrusión antes del modelo |
| skirt | warping | draft shield alto protege de corrientes (útil ABS/ASA en open-frame) |
| skirt | brim | skirt se imprime a `skirt_distance` del brim u objeto; evita colisión con brims |
| skirt | velocidad de primera capa | `skirt_speed = 0` hereda "First layer infill" / "Support" |
| skirt (single loop) | warping/cracking | una pared única tras la primera capa ahorra material pero es menos robusta |
| brim (outer/inner/etc) | adhesión a la cama | capa plana alrededor de la base del modelo contra warping/footprints pequeños |
| auto brim | material (coeficiente de adhesión) | PETG/PCTG coef. 2; TPU 0,5; resto 1; TPU térmica 1000, PC 40 |
| auto brim | altura-diagonal (long. térmica) | cap 18 mm / 1,5× long. térmica; si <5 mm y <1,5×, no se genera |
| brim use EFC outline | elephant foot compensation | alinea brim con perímetro tras EFC; riesgo de fusión si se activa sin necesidad |
| elephant foot compensation | raft | EFC se omite con raft (la pieza no está sobre la placa) |
| brim flow ratio | filament flow ratio | `brim_flow_ratio × flow_ratio_filamento` (y flow del objeto); el first-layer flow NO afecta brims/skirts |
| no-brim | brims vecinos | los brims de objetos vecinos se mantienen a una línea de distancia |
| mouse ears | brim completo | menos material, adhesión local en esquinas/features afiladas |
| painted brim | prepare (pintado manual) | orejas pintadas en Prepare; Auto-generate; radio 0,1–100 mm |
| raft | brim | si el problema es solo adhesión/warping, brim primero (más rápido, menos material, bottom limpio) |
| raft | belt printer | raft no imprimible en belt; brim con leading/extrawidth en su lugar |
| raft | prime tower | todos los objetos de la placa mismo nº de capas de raft |
| brim (leading edge) | belt printer | `Brim-object gap + Leading length + Width` por delante del objeto |
| raft expansion | initial layer expansion | con >1 capa: 1,5 mm + 2 mm = 3,5 mm más allá del objeto (valores por defecto) |
| draft shield | ABS/ASA open-frame | shield tan alto como el modelo más alto de la cama |
