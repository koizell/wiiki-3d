---
titulo: Stringing y retracción
tema: stringing-retraccion
fuentes:
  - wiki/raw/stringing-simplify3d-print-quality.md
  - wiki/raw/stringing-orcaslicer-retraction-calib.md
  - wiki/raw/stringing-orcaslicer-retraction-settings.md
cocinado: 2026-10-18
---

## Afirmaciones

### Síntomas

- El stringing (también llamado oozing, whiskers o "hairy" prints) ocurre cuando pequeños hilos de plástico quedan sobre el modelo impreso. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- El stringing es causado por plástico que gotea de la boquilla mientras el extrusor se mueve a una nueva ubicación. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

### Causas principales

- **Temperatura demasiado alta:** si la temperatura es demasiado alta, el plástico dentro de la boquilla se vuelve menos viscoso y gotea más fácilmente. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- **Humedad en el filamento:** si hay mucho stringing en la parte superior de la torre de calibración, se recomienda secar el filamento y comprobar que la boquilla esté correctamente instalada sin fugas. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib), capturado 2026-10-18

- **Retracción insuficiente:** si la longitud de retracción es demasiado corta, no previene eficazmente el goteo. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Retracción excesiva:** si la longitud de retracción es demasiado larga, puede provocar obstrucciones o sub-extrusión. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Velocidad de travel baja:** aumentar la velocidad de movimiento reduce el tiempo que el extrusor tiene para gotear entre piezas. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- **Movimientos largos sobre espacios abiertos:** los movimientos cortos pueden ser lo suficientemente rápidos para que el plástico no tenga tiempo de gotear; los movimientos largos tienen más probabilidades de crear hilos. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

### Valores de retracción por tipo de extrusor

- **Direct drive:** 0.5–2.0 mm de distancia de retracción. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- **Bowden:** hasta 15 mm de distancia de retracción, debido a la mayor distancia entre el engranaje del extrusor y la boquilla caliente. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- **OrcaSlicer direct drive (por defecto):** 0–2 mm con paso de 0.1 mm. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib), capturado 2026-10-18

- **OrcaSlicer Bowden (recomendado):** 1–6 mm con paso de 0.2 mm. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib), capturado 2026-10-18

- **PLA/ABS con stringing mínimo:** 0.2–0.4 mm puede ser suficiente. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib), capturado 2026-10-18

### Velocidad de retracción

- Rango óptimo: 1200–6000 mm/min (20–100 mm/s). — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- Si la velocidad de retracción es demasiado lenta, el plástico goteará lentamente a través de la boquilla y puede empezar a fugarse antes de que el extrusor termine de moverse. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- Si la velocidad de retracción es demasiado rápida, el filamento puede separarse del plástico caliente dentro de la boquilla, o el engranaje puede desgastar trozos del filamento. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

### Diferencias entre materiales

- **PETG y TPU** son más propensos al stringing que PLA o ABS, y pueden requerir longitudes de retracción más largas. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **PLA y ABS** tienen un goteo mínimo; la torre de retracción puede parecer limpia desde el principio. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib), capturado 2026-10-18

### Ajustes de wipe (OrcaSlicer)

- **Wipe while retracting:** mueve la boquilla a lo largo del último camino de extracción al retraer para limpiar el material fugado de la boquilla. Puede minimizar blobs al imprimir una nueva pieza después de un travel. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Wipe distance:** describe cuánto se mueve la boquilla a lo largo del último camino al retraer. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Retract amount before wipe:** longitud de retracción rápida antes del wipe, relativa a la longitud de retracción total. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Retract amount after wipe:** longitud de retracción rápida después del wipe, relativa a la longitud de retracción total. Permite dividir la retracción a través del wipe: algo antes, algo después, y el resto durante el movimiento de wipe. Disponible en versiones > 2.4.2. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

### Otros ajustes de retracción (OrcaSlicer)

- **Travel distance threshold:** solo activa la retracción cuando la distancia de travel supera este umbral. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Retract on layer change:** fuerza una retracción en cada cambio de capa. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Extra length on restart:** cantidad adicional de filamento empujado tras la retracción (para compensar el filamento perdido). — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

- **Deretraction speed:** velocidad de recarga del filamento en la boquilla. Cero significa la misma velocidad que la retracción. — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/printer_extruder_retraction), capturado 2026-10-18

### Estrategias adicionales (Simplify3D)

- **Avoid crossing outline for travel movement:** ajusta automáticamente la ruta de travel para que la boquilla tenga una distancia muy corta sobre espacios abiertos, o incluso evitar cruzar espacios abiertos por completo. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- **Aumentar movement speed:** aumentar la velocidad de movimiento X/Y reduce el tiempo que el extrusor pasa moviéndose sobre aire libre. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

- **Reducir temperatura:** bajar la temperatura de la boquilla 5–10 °C puede tener un impacto significativo en la calidad de impresión. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

### Orden de ajustes recomendado

1. **Retraction distance:** aumentar en 1 mm y probar. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18
2. **Retraction speed:** ajustar dentro del rango 1200–6000 mm/min. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18
3. **Temperatura:** bajar 5–10 °C si los ajustes de retracción no son suficientes. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18
4. **Avoid crossing outline:** habilitar para minimizar la distancia de travel sobre espacios abiertos. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18
5. **Movement speed:** aumentar si la impresora puede manejar velocidades más altas. — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18

## Contradicciones

### Rango de retracción para Bowden

- Simplify3D: hasta 15 mm — [Simplify3D](https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/), capturado 2026-10-18
- OrcaSlicer: 1–6 mm — [OrcaSlicer Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/retraction_calib), capturado 2026-10-18

**Se contradicen parcialmente.** Simplify3D da un máximo de 15 mm para Bowden, mientras que OrcaSlicer recomienda 1–6 mm. La diferencia puede deberse a que Simplify3D habla del máximo teórico necesario en casos extremos, mientras que OrcaSlicer da un rango práctico para la mayoría de configuraciones Bowden. **El redactor tiene que publicar ambos rangos con su fuente, no elegir uno.**

## Sin respaldo

Ninguna. Las tres fuentes son documentación oficial de fabricante/software (Simplify3D y OrcaSlicer), que son fuentes primarias y no necesitan marca de respaldo.

## Tirado

- **Navegación, menús, migas de pan, anuncios, banners:** relleno estándar.
- **Imágenes:** marcadas como "(imagen)" porque el webfetch no las descarga; no son afirmaciones.
- **Configuración de impresora específica:** instrucciones de menú de Simplify3D (clic en "Edit Process Settings", pestaña Extruder, etc.) son navegación de software, no afirmaciones técnicas.
- **Material Setting Overrides de OrcaSlicer:** la mención de que se pueden anular los ajustes de retracción por filamento es una característica del software, no una afirmación técnica sobre stringing.
- **Long retraction when cut (beta):** característica experimental de OrcaSlicer para cortar el filamento durante cambios de material; no es relevante para la mayoría de usuarios y no tiene respaldo en otras fuentes.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| stringing/oozing | temperatura de boquilla | temperatura demasiado alta → plástico menos viscoso → gotea más fácil |
| stringing/oozing | humedad del filamento | filamento húmedo causa stringing independientemente de la temperatura |
| stringing/oozing | velocidad de travel | mayor velocidad de travel = menos tiempo para gotear |
| stringing/oozing | distancia de travel | movimientos largos sobre espacios abiertos tienen más probabilidades de crear hilos |
| stringing/oozing | tipo de extrusor | Bowden necesita más distancia de retracción que direct drive |
| stringing/oozing | tipo de material | PETG y TPU son más propensos al stringing que PLA o ABS |
| retracción | wipe | el wipe limpia la boquilla durante la retracción para minimizar blobs |
| retracción | travel distance threshold | la retracción solo se activa cuando el travel supera el umbral |
| retracción | retract on layer change | fuerza retracción en cada cambio de capa |
| retracción | deretraction speed | velocidad de recarga del filamento tras la retracción |
| temperatura de boquilla | stringing | bajar 5–10 °C reduce los hilos, pero puede empeorar la unión entre capas |
| avoid crossing outline | stringing | minimiza la distancia de travel sobre espacios abiertos |
