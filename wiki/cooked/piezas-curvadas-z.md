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

### Altura de capa y curvas (OrcaSlicer Wiki - Layer Height)

- La altura de capa define el grosor vertical de cada capa impresa y afecta tanto la calidad como la velocidad de impresión. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Usar alturas de capa menores aumenta el tiempo de impresión pero da: acabado de superficie más suave, líneas de capa menos visibles, más detalle en curvas y mejor rendimiento en voladizos. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- El rango óptimo de altura de capa está entre el 20 % y el 80 % del diámetro de boquilla. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Por debajo del 20 %: pueden aparecer inconsistencias de flujo y patrones "escama de pez", especialmente a altas velocidades. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Por encima del 80 %: mayor riesgo de problemas de adhesión entre capas y reducción de calidad de impresión. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Tabla Quick Reference (min / max / primera capa): 0.2 mm → 0.04 / 0.16 / 0.12 mm; 0.3 mm → 0.06 / 0.24 / 0.18 mm; 0.4 mm → 0.08 / 0.32 / 0.25 mm; 0.5 mm → 0.10 / 0.40 / 0.30 mm; 0.6 mm → 0.12 / 0.48 / 0.35 mm; 0.8 mm → 0.16 / 0.64 / 0.45 mm; 1.0 mm → 0.20 / 0.80 / 0.55 mm. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Las alturas de capa menores permiten voladizos más pronunciados al reducir la distancia no soportada entre capas; las mayores aumentan esa distancia, provocando más sagging y necesidad de soportes a ángulos menores. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16

### Primera capa (OrcaSlicer Wiki - Layer Height)

- La altura de primera capa controla el grosor de la capa inicial; una primera capa más gruesa mejora la adhesión a la cama y compensa imperfecciones de la superficie de construcción. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Recomendado: 0.25 mm para boquilla de 0.4 mm (62.5 % del diámetro de boquilla). — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16
- Máximo recomendado: 65 % del diámetro de boquilla. — [OrcaSlicer Wiki - Layer Height](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_layer_height), capturado 2026-10-16

### Z Contouring / ZAA (OrcaSlicer Wiki - Z Contouring)

- Z contouring (ZAA) reduce el escalonado visible en superficies curvas y pendientes superiores ajustando la altura Z de puntos de extrusión individuales para seguir mejor la superficie original del modelo, sin cambiar la altura de capa nominal del resto de la pieza. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- La implementación actual apunta a superficies curvas o pendientes orientadas hacia arriba (top-facing). Las curvas orientadas hacia abajo o invertidas no se gestionan. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- "Minimize wall height angle": reduce la altura de los perímetros de superficie superior para ajustarse mejor al borde del modelo en pendientes más pronunciadas que ese ángulo; afecta a perímetros internos y externos. Poner 0 para desactivar. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- El valor por defecto de 35 grados es un punto de partida razonable. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- "Minimum z height": valores menores permiten un contouring más fuerte pero dejan menos grosor mínimo de capa; valores mayores mueven el plano de corte hacia arriba (a esa distancia por encima del fondo de la capa), los recorridos nunca se bajan por debajo de él, el infill de superficie superior puede subir hasta esa cantidad por encima de la altura nominal y las paredes nunca se suben. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16
- "Don't alternate fill direction": mantiene la dirección de relleno consistente de capa a capa; ayuda a un patrón de superficie más consistente en superficies superiores curvas. Sólo tiene efecto cuando Z contouring está habilitado para esa región. — [OrcaSlicer Wiki - Z Contouring](https://github.com/SoftFever/OrcaSlicer/wiki/quality_settings_z_contouring), capturado 2026-10-16

### Desalineación de capas / Layer Shifting (Simplify3D Print Quality)

- Las impresoras 3D usan control en lazo abierto: no hay realimentación de la posición real del cabezal; si algo se desvía, la impresión sigue como si nada. — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Si el cabezal se mueve demasiado rápido, los motores pueden no seguir el ritmo (se oye un clic al fallar la posición) y el resto de la impresión queda desalineado con todo lo anterior. — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Prueba: reducir la velocidad de impresión en un 50 %; ajustar "Default Printing Speed" (movimientos con extrusión) y "X/Y Axis Movement Speed" (movimientos rápidos sin extrusión). — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Bajar la aceleración en el firmware para una aceleración/desaceleración más gradual. — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Las correas de goma se estiran con el tiempo; tensión demasiado floja → la correa patina sobre la polea; demasiado apretada → fricción excesiva en los rodamientos. Ideal: algo tensa, sin exceso. — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Los set-screws (grub screws) anclan la polea al eje del motor; si se aflojan, la polea deja de girar con el motor y el cabezal no alcanza la posición deseada. — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16
- Problemas eléctricos: corriente insuficiente a los motores; sobrecalentamiento del driver del motor que detiene temporalmente el motor hasta que se enfría. — [Simplify3D Print Quality Troubleshooting](https://www.simplify3d.com/support/print-quality-troubleshooting/), capturado 2026-10-16

## Contradicciones

No se encontraron contradicciones directas entre las cuatro fuentes procesadas. Las tensiones aparentes son matices de alcance, no discrepancias:

- **Z contouring vs. menor altura de capa para curvas.** Ambas mejoran superficies curvas, pero por vías distintas: Z contouring ajusta la altura Z de puntos individuales en superficies superiores curvas/pendientes sin cambiar la altura de capa nominal; la menor altura de capa mejora el detalle en curvas de forma general. Además, Z contouring sólo gestiona superficies orientadas hacia arriba; las curvas invertidas (hacia abajo) no se manejan. El redactor debe explicar que son complementarias, no alternativas.
- **"Cooling desactivado" en el caso ASA (foro).** Es una elección del usuario para ese material/enclosure; ninguna de las otras fuentes recomienda cooling activo ni desactivado para ASA, así que no hay contradicción, pero tampoco respaldo cruzado.

## Sin respaldo

Afirmaciones que aparecen en una sola fuente secundaria (foro Prusa) y no están corroboradas por documentación de fabricante/slicer:

- Caso reportado: Prusament ASA en Prusa MK4, enclosure cerrado, nozzle 260 °C, cama 105 °C, brim 8 mm, draft shield activado, cooling desactivado, lámina satinada limpia con IPA; las esquinas se levantan en piezas grandes y planas. **[UNA SOLA FUENTE — foro, sin corroborar]**
- UjinDesign: dejar que el enclosure se caliente antes de empezar la impresión; la cama caliente se apaga automáticamente tras 30 min de inactividad para ahorrar energía. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Mike B: técnicas de alivio de tensiones en el diseño: ribs/indents verticales, agujeros en la pared, redondear esquinas verticales, evitar chaflanes/filletes en aristas inferiores, infill gyroid (menos propenso a warping), usar menos infill. **[UNA SOLA FUENTE — foro, sin corroborar]**

## Tirado

- **Índice de problemas de Simplify3D** (secciones Warping, Curling or Rough Corners, Lines on the Side of Print, Vibrations and Ringing, Not Sticking to the Bed, etc.): son títulos de una línea sin contenido desarrollado; se tiran como navegación/índice sin datos aprovechables. Sólo la sección "Layer Shifting" tiene desarrollo utilizable.
- **Imagen "[Image: model]"** del hilo del foro Prusa: no aporta datos; tirada.
- **Respuesta corta de Aleksander** ("I tried and didn't help. Any ideas?"): sin información técnica; tirada.
- **Notas del recolector** de los cuatro ficheros raw: son metadatos del proceso, no afirmaciones; tiradas (pero informan el alcance).
- **Subtemas solicitados no cubiertos por las fuentes procesadas** (no se inventaron afirmaciones): Z-wobble, acoplamiento rígido vs. flexible, backlash, enfriamiento desigual, primera capa aplastada (squish), contracción por altura. Las fuentes no los mencionan; sólo se cubre la altura de primera capa (OrcaSlicer) y el desalineamiento de capas por causas mecánicas/eléctricas (Simplify3D), que son temas adyacentes, no equivalentes.
- **Alcance de Simplify3D "Layer Shifting"**: describe desalineamiento en X/Y (belts, set-screws, corriente, velocidad), no wobble específico del eje Z ni del husillo roscado; se mantiene como afirmación adyacente con esa salvedad.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| altura de capa | superficie curva | menor altura de capa aumenta el detalle en curvas y suaviza el acabado |
| altura de capa | voladizos | menor altura reduce la distancia no soportada entre capas, permitiendo voladizos más pronunciados |
| altura de capa | adhesión entre capas | por encima del 80 % del diámetro de boquilla aumenta el riesgo de mala adhesión |
| primera capa | adhesión a la cama | una primera capa más gruesa (0.25 mm en boquilla 0.4 mm) mejora la adhesión y compensa imperfecciones de la cama |
| Z contouring (ZAA) | escalonado en curvas | suaviza superficies superiores curvas/pendientes ajustando la altura Z de puntos individuales, sin cambiar la altura de capa nominal |
| Z contouring (ZAA) | superficies invertidas | no gestiona curvas orientadas hacia abajo; límite de la función |
| desalineación de capas | velocidad de impresión | velocidad excesiva puede provocar que los motores pierdan posición (clic) y desalineen el resto de la pieza |
| desalineación de capas | tensión de correa | correa floja patina sobre la polea; correa demasiado apretada genera fricción excesiva |
| desalineación de capas | set-screws (grub screws) | si se aflojan, la polea deja de girar con el motor |
| warping en ASA | diseño de la pieza | ribs/indents verticales, agujeros, redondear esquinas verticales, evitar chaflanes/filletes en aristas inferiores, infill gyroid y menos infill alivian tensiones |
| warping en ASA | enclosure | dejar que el enclosure se caliente antes de empezar; la cama caliente se apaga tras 30 min de inactividad |
| warping en ASA | adhesión a la cama | lámina satinada + IPA, brim 8 mm, draft shield, cooling desactivado (caso reportado, sin corroborar) |
