---
titulo: Piezas curvadas en Z
tema: piezas-curvadas-z
fuentes:
  - wiki/raw/piezas-curvadas-z-simplify3d-print-quality.md
  - wiki/raw/piezas-curvadas-z-foro-prusa-warping-asa.md
  - wiki/raw/piezas-curvadas-z-orcaslicer-z-contouring.md
  - wiki/raw/piezas-curvadas-z-orcaslicer-layer-height.md
cocinado: 2026-10-17
---

## Afirmaciones

### Desalineación de capas (layer shifting)

- La mayoría de impresoras usan control en lazo abierto: no hay feedback de la posición real del cabezal. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Si el cabezal se mueve demasiado rápido, los motores pueden no alcanzar la posición deseada; se oye un clic y el resto de la impresión queda desalineado. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Para diagnosticar, reducir la velocidad de impresión en un 50% (Default Printing Speed y X/Y Axis Movement Speed). — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- También se puede bajar la aceleración en el firmware para una aceleración/desaceleración más gradual. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Tensión de belts inadecuada (demasiado floja → el belt se desliza sobre el pulley; demasiado apretada → fricción excesiva en los rodamientos) puede causar desalineación. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Los set-screws (grub screws) de los pulleys pueden aflojarse, haciendo que el pulley no gire con el eje del motor. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Corriente insuficiente a los motores o sobrecalentamiento del driver pueden hacer que los motores pierdan posición. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16

### Warping

- Warping en piezas grandes, particularmente con materiales de alta temperatura como ABS. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- ASA (Prusament): boquilla 260 °C, cama 105 °C; brim 8 mm; draft shield habilitado; enfriamiento deshabilitado; superficie satin sheet limpia con IPA; enclosure cerrado. Aun así las esquinas se levantan en piezas grandes y planas. — [foro Prusa, Aleksander Zieleniewski](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**
- Las tensiones internas del material son demasiado altas para piezas grandes y planas. — [foro Prusa, Aleksander Zieleniewski](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**
- Dejar que el enclosure se caliente antes de empezar; la cama calentadora se apaga automáticamente tras 30 min de inactividad. — [foro Prusa, UjinDesign](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**
- UjinDesign sugiere usar algún adhesivo de cama, aunque no lo ha probado con ASA. — [foro Prusa, UjinDesign](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**
- Aleksander probó precalentar el enclosure y no ayudó. — [foro Prusa, Aleksander Zieleniewski](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**
- Técnicas de diseño para aliviar tensiones: ribs verticales, indents, holes en paredes, redondear esquinas verticales, evitar chamfers/fillets en bordes inferiores, gyroid infill, menos infill. — [foro Prusa, Mike B](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**
- Estas sugerencias dependen de los requisitos de impresión; no todas las piezas pueden aprovecharlas. — [foro Prusa, Mike B](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16 **[UNA SOLA FUENTE — foro, sin corroborar]**

### Curling / esquinas

- Las esquinas de la impresión tienden a curvarse y deformarse después de imprimirse. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16

### Líneas en el lateral

- Las paredes laterales no son lisas; líneas visibles en el lateral. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16

### Vibraciones y ringing

- Vibraciones que causan oscilaciones en la superficie de la impresión ("ringing"). — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16

### Primera capa y adhesión

- La primera capa no se pega a la cama y la impresión falla rápidamente. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Una primera capa más gruesa mejora la adhesión a la cama y compensa imperfecciones de la superficie de construcción. Recomendado: 0,25 mm para boquilla 0,4 mm (62,5 % del diámetro). Máximo recomendado: 65 % del diámetro de boquilla. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16

### Altura de capa

- Tabla de altura de capa por tamaño de boquilla (min / max / primera capa): 0,2 mm → 0,04 / 0,16 / 0,12 mm; 0,3 mm → 0,06 / 0,24 / 0,18 mm; 0,4 mm → 0,08 / 0,32 / 0,25 mm; 0,5 mm → 0,10 / 0,40 / 0,30 mm; 0,6 mm → 0,12 / 0,48 / 0,35 mm; 0,8 mm → 0,16 / 0,64 / 0,45 mm; 1,0 mm → 0,20 / 0,80 / 0,55 mm. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Rango óptimo de altura de capa: entre el 20 % y el 80 % del diámetro de boquilla. Por debajo del 20 %: inconsistencias de flujo y patrones "fish scale", especialmente a altas velocidades. Por encima del 80 %: mayor riesgo de problemas de adhesión entre capas y calidad reducida. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Capas más pequeñas permiten voladizos más pronunciados (reducen la distancia no soportada entre capas); capas más grandes aumentan ese gap y provocan más sagging. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Usar capas más pequeñas aumenta el tiempo de impresión pero da: acabado más suave, líneas de capa menos visibles, mayor detalle en curvas, mejor rendimiento en voladizos. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- La altura de capa define el grosor vertical de cada capa y afecta tanto a la calidad como a la velocidad. Variables `layer_height`, `initial_layer_print_height` (Float). — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Existe la función Variable Layer Height. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16

### Z Contouring (ZAA)

- Z Contouring (ZAA) reduce el escalonado visible en superficies curvas y pendientes superiores ajustando la altura Z de puntos de extrusión individuales para que el toolpath siga mejor la superficie del modelo. Variable `zaa_enabled`, Boolean, modo Expert. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- La implementación actual sólo maneja superficies curvas/pendientes superiores; curvas hacia abajo o boca abajo no se manejan. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- Minimize wall height angle: default 35 grados; reduce la altura de perímetros de superficie superior para que coincidan mejor con el borde del modelo en pendientes más pronunciadas que ese ángulo. Afecta a perímetros internos y externos. 0 desactiva. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- Minimum z height: controla la altura mínima de capa permitida para toolpaths contorneados; valores más bajos permiten contouring más fuerte pero dejan menos grosor de capa mínimo. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- Don't alternate fill direction: mantener la dirección de relleno consistente capa a capa produce un patrón de superficie más consistente en superficies curvas superiores; sólo tiene efecto cuando Z contouring está habilitado para esa región. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16

## Contradicciones

### Warping en materiales de alta temperatura: ABS vs ASA

- "Particularmente con materiales de alta temperatura como ABS" — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- "Prusament ASA … las esquinas se levantan incluso con enclosure cerrado" — [foro Prusa, Aleksander Zieleniewski](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16

**Matiz, no contradicción.** Ambas fuentes hablan de warping en materiales de alta temperatura. La segunda añade que el enclosure no elimina el problema en piezas grandes y planas de ASA. El redactor debe explicar que ASA, aunque más estable que ABS, también warpea en geometrías grandes y planas, y que el enclosure por sí solo no basta.

### Enfriamiento para ASA: una sola fuente, no resoluble

- "Cooling: Disabled" para ASA — [foro Prusa, Aleksander Zieleniewski](https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/), capturado 2026-10-16
- Ninguna otra fuente del conjunto menciona enfriamiento.

**No se puede resolver con estas fuentes.** Una sola fuente afirma que el enfriamiento debe estar deshabilitado para ASA; no hay corroboración ni contradicción directa en el conjunto. El redactor no debe presentarlo como regla universal ni como causa de "enfriamiento desigual".

### Altura de capa pequeña + velocidad alta

- "Reducir la velocidad de impresión en un 50% para diagnosticar desalineación" — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- "Por debajo del 20 % del diámetro: inconsistencias de flujo y patrones fish scale, especialmente a altas velocidades" — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16

**Matiz, no contradicción.** Ambas fuentes coinciden en que la velocidad alta agrava los problemas; la segunda añade que las capas muy pequeñas a alta velocidad producen inconsistencias de flujo. El redactor debe explicar la interacción altura de capa × velocidad.

### Primera capa: grosor recomendado vs problema de adhesión

- "La primera capa no se pega a la cama y la impresión falla rápidamente" — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- "Una primera capa más gruesa mejora la adhesión a la cama" (0,25 mm para boquilla 0,4 mm) — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16

**Matiz, no contradicción.** La primera describe el síntoma (no adhiere); la segunda, una medida preventiva (grosor). Son complementarias, no opuestas. El redactor debe presentarlas como problema y solución.

### Z Contouring: sólo superficies superiores

- "Z Contouring reduce el escalonado visible en superficies curvas y pendientes superiores" — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- "Curvas hacia abajo o boca abajo no se manejan" — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16

**Matiz, no contradicción.** Es una limitación de la función, no un desacuerdo entre fuentes. El redactor debe advertir que Z Contouring no corrige curvas inferiores ni piezas curvadas en Z por warping mecánico.

## Sin respaldo

Todos los datos del foro Prusa son de una sola fuente secundaria (foro de comunidad, sin corroborar):

- Boquilla 260 °C y cama 105 °C para ASA. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Brim de 8 mm para ASA. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Draft shield habilitado, enfriamiento deshabilitado para ASA. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Superficie satin sheet limpia con IPA. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Enclosure cerrado durante toda la impresión. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Dejar que el enclosure se caliente antes de empezar; la cama calentadora se apaga tras 30 min de inactividad. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Uso de adhesivo de cama (no probado con ASA). **[UNA SOLA FUENTE — foro, sin corroborar]**
- Aleksander probó precalentar el enclosure y no ayudó. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Técnicas de diseño de Mike B (ribs, indents, holes, redondear esquinas, evitar chamfers/fillets en bordes inferiores, gyroid infill, menos infill). **[UNA SOLA FUENTE — foro, sin corroborar]**
- "Las tensiones internas del material son demasiado altas para piezas grandes y planas." **[UNA SOLA FUENTE — foro, sin corroborar]**

Las fuentes oficiales (Simplify3D, OrcaSlicer) no requieren marca de respaldo único.

## Tirado

- Secciones del índice de Simplify3D no relacionadas con piezas curvadas en Z: Under-Extrusion, Over-Extrusion, Stringing/Oozing, Clogged Extruder, Gaps in Top Layers, Weak Infill, Blobs and Zits, Scars on Top Surface, Dimensional Accuracy, Poor Bridging, Small Features Not Printed, Inconsistent Extrusion, Poor Surface Above Supports, Gaps in Floor Corners, Gaps in Thin Walls, Stops Extruding Mid Print, Grinding Filament, Not Extruding at Start of Print. Tirado por no relación con el tema.
- Instrucciones de UI de Simplify3D ("Edit Process Settings", pestaña Speeds) asociadas a la reducción de velocidad. Tirado por ser específico del slicer, no dato técnico generalizable.
- Repetido: "Warping" aparece en Simplify3D (general, ABS) y en el foro Prusa (ASA, con parámetros). Se conserva el foro por los valores concretos y Simplify3D como corroboración general.
- Repetido parcial: "Not Sticking to the Bed" (Simplify3D) y "primera capa más gruesa mejora adhesión" (OrcaSlicer). Se conservan ambos por complementariedad (problema vs solución).
- Navegación/migas de pan, anuncios, piezas de producto (tiendas, precios, enlaces de compra): no presentes en las fuentes.
- Cuestionarios/surveys y texto de foro alrededor de anuncios: no presentes.
- Notas del recolector de las 4 fuentes: meta, tirado.
- Temas nombrados por el encargo que **no** aparecen en estas 4 fuentes y no se han inventado afirmaciones para ellos: "Z-wobble", "acoplamiento rígido vs flexible", "backlash", "enfriamiento desigual" como causa nombrada, "primera capa aplastada" como fenómeno de squish, y "contracción por altura". Lo más cercano en estas fuentes son, respectivamente: la tensión de belts y los set-screws (layer shifting, Simplify3D); el warping y las tensiones internas del material (foro Prusa); el enfriamiento deshabilitado para ASA y el curling de esquinas (foro Prusa / Simplify3D); la altura de primera capa y la adhesión (OrcaSlicer / Simplify3D); y el warping por tensiones internas más el rango de altura de capa (foro Prusa / OrcaSlicer). Z-wobble y backlash se cubren en `tolerancias-y-encaje` (Slic3r), no aquí.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| piezas curvadas en Z | layer shifting (desalineación de capas) | la desalineación de capas produce escalones y geometría curva no deseada |
| piezas curvadas en Z | warping | la contracción del material levanta bordes y deforma la geometría |
| piezas curvadas en Z | altura de capa | capas más pequeñas suavizan curvas y mejoran detalle |
| piezas curvadas en Z | Z Contouring (ZAA) | suaviza superficies curvas superiores ajustando altura Z por punto |
| piezas curvadas en Z | tolerancias y encaje | Z-wobble y backlash (causas mecánicas de curvatura) se cubren en esa página, no aquí |
| layer shifting | tensión de belts | tensión inadecuada (floja o apretada) causa deslizamiento o fricción |
| layer shifting | set-screws de pulleys | si se aflojan, el pulley no gira con el motor |
| layer shifting | velocidad de impresión | velocidad alta puede superar la capacidad de los motores |
| layer shifting | aceleración (firmware) | bajar la aceleración suaviza la aceleración/desaceleración |
| layer shifting | corriente a motores / driver | insuficiente o sobrecalentamiento hace perder posición |
| warping | enclosure / temperatura ambiente | el enclosure no elimina el warping en ASA para piezas grandes y planas |
| warping | enfriamiento | cooling deshabilitado para ASA es afirmación de una sola fuente, no verificada |
| warping | diseño (stress relief) | ribs, gyroid infill y menos infill alivian tensiones internas |
| warping | material (ABS vs ASA) | ambos materiales de alta temperatura warpean en piezas grandes y planas |
| curling / esquinas | enfriamiento / contracción | las esquinas se curvan al deformarse tras imprimirse |
| altura de capa | velocidad de impresión | capas muy pequeñas a alta velocidad causan inconsistencias de flujo (fish scale) |
| altura de capa | voladizos | capas más pequeñas permiten voladizos más pronunciados |
| altura de capa | primera capa | una primera capa más gruesa mejora la adhesión y compensa imperfecciones |
| primera capa | adhesión a la cama | una primera capa más gruesa mejora la adhesión y compensa imperfecciones |
| Z Contouring | superficies superiores curvas | sólo maneja curvas/pendientes superiores; no curvas hacia abajo |
| Z Contouring | minimize wall height angle | default 35°; reduce altura de perímetros en pendientes pronunciadas |
| Z Contouring | minimum z height | controla grosor mínimo de capa contorneada y plano de slicing |
