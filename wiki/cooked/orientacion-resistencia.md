---
titulo: Orientación y resistencia
tema: orientacion-resistencia
fuentes:
  - wiki/raw/orientacion-resistencia-polymaker-strength-testing.md
  - wiki/raw/orientacion-resistencia-simplify3d-layer-separation.md
  - wiki/raw/orientacion-resistencia-polymaker-warping.md
  - wiki/raw/orientacion-resistencia-orcaslicer-prepare-auto-orient.md
  - wiki/raw/orientacion-resistencia-bambu-interlayer-cracking.md
  - wiki/raw/orientacion-resistencia-orcaslicer-prepare-object-manipulation.md
cocinado: 2026-10-17
---

## Afirmaciones

### Anisotropía: la resistencia depende de la orientación

- Las características de resistencia de la pieza impresa pueden variar con la orientación debido a la adhesión entre capas. — [OrcaSlicer Wiki - Auto Orientation](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_auto_orient), capturado 2026-10-17
- Las grietas intercapa aparecen cuando la adhesión entre capas es insuficiente y la contracción del material es significativa; se manifiestan a lo largo del eje Z. — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17
- Warping y cracking son la acumulación de tensión interna creada durante la extrusión que supera la adhesión entre capas o con la cama. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17
- La adhesión entre capas se basa en el entrelazado de cadenas poliméricas cuando ambas capas están por encima de Tg. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17

### Materiales propensos a grietas intercapa

- Los materiales en los que las grietas intercapa son comunes: ABS, ASA, PC, PET-CF y PA-CF. — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17
- Los polímeros semicristalinos (Nylon) tienen un estrés adicional por cristalización; pueden warpear incluso con la cama a 45 °C. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17

### Cómo mejorar la adhesión entre capas (y por tanto la resistencia en Z)

- Aumentar el tiempo por encima de Tg: subir la temperatura de extrusión, subir la temperatura de cámara, reducir el enfriamiento. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17
- Aumentar la superficie de contacto entre capas aumentando el ancho de extrusión. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17
- Reducir la creación de tensión: aumentar el tamaño de boquilla, reducir la tasa de extrusión, aumentar la temperatura de impresión, recubrir la superficie interna de la boquilla. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17
- La altura de capa debe ser un 20 % menor que el diámetro de boquilla; con boquilla de 0,4 mm no pasar de 0,32 mm, o las capas no se adhieren bien. — [Simplify3D - Layer Separation](https://www.simplify3d.com/resources/print-quality-troubleshooting/layer-separation-and-splitting/), capturado 2026-10-17
- El plástico caliente adhiere mejor que el frío. — [Simplify3D - Layer Separation](https://www.simplify3d.com/resources/print-quality-troubleshooting/layer-separation-and-splitting/), capturado 2026-10-17
- ABS típicamente necesita 220-235 °C para una buena adhesión entre capas. — [Simplify3D - Layer Separation](https://www.simplify3d.com/resources/print-quality-troubleshooting/layer-separation-and-splitting/), capturado 2026-10-17

### Métodos de mejora de grietas intercapa (Bambu Lab)

- Desatascar la boquilla (cold pull). — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17
- Aumentar la temperatura de boquilla o reducir la velocidad de impresión, para dar más tiempo al filamento para adherirse a la capa inferior. Con ABS: velocidad de pared interior 150 mm/s y exterior 100 mm/s. — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17
- Reducir la velocidad del ventilador de capa. — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17
- Subir la temperatura de cama 5-10 °C; si el equipo tiene calefacción activa de cámara, subir la cámara 5 °C. — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17

### Cómo orientar en el slicer

- Auto Orientation analiza la geometría del mesh (normales y áreas de caras), genera orientaciones candidatas, evalúa cada una por área de voladizo, contacto inferior, interfaz de soporte y complejidad de contorno, y selecciona la de menor puntuación de "unprintability". — [OrcaSlicer Wiki - Auto Orientation](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_auto_orient), capturado 2026-10-17
- Auto Orientation puede no encontrar la mejor orientación en modelos complejos; siempre revisar la orientación sugerida. — [OrcaSlicer Wiki - Auto Orientation](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_auto_orient), capturado 2026-10-17
- Lay on Face permite orientar rápidamente una pieza seleccionando una cara para que quede plana sobre la cama. — [OrcaSlicer Wiki - Object Manipulation](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_object_manipulation), capturado 2026-10-17

### Pruebas de resistencia: cómo se mide (Polymaker)

- Tres ensayos mecánicos principales: tracción (tensile), impacto Charpy y flexión en tres puntos. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Ensayo de tracción: somete la probeta a tensión hasta la rotura; determina tensile strength, Young's modulus y elongación a rotura. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Tensile strength: estrés máximo para estirar la probeta hasta que cede o rompe. Tensile strength at yield (punto de cedencia, "necking"), at break (rotura) y ultimate (máximo de ambos). — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Elongación a rotura: ratio de deformación entre la longitud inicial y la longitud justo antes de la rotura. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Young's modulus: resistencia del polímero a la deformación bajo estrés a lo largo de un solo eje; sirve para estimar la rigidez de estructuras. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Ensayo Charpy: mide la energía de impacto (kJ/m²) necesaria para fracturar la probeta, soltando un péndulo de masa y altura fijas. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Ensayo de flexión en tres puntos: mide la resistencia a la deformación bajo carga gradual; determina bending strength y bending modulus. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Bending modulus: ratio de estrés a deformación en flexión; análogo a Young's modulus. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Bending strength: estrés máximo experimentado en el punto de cedencia o rotura. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Heat deflection temperature (HDT): temperatura a la que el polímero se deforma una cantidad dada, bajo carga específica, aumentando la temperatura 2 °C/min hasta que el sensor de contacto desplaza 10 mm. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Vicat softening temperature: temperatura a la que el material se ablanda lo suficiente para que un objeto externo bajo presión fija penetre 1 mm en la superficie. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17
- Melt index: caracteriza el flujo del polímero bajo presión y temperatura fijas, extruyendo y pesando el extrudado en un tiempo dado; más material extruido implica menor viscosidad. — [Polymaker Wiki - Strength Testing](https://wiki.polymaker.com/printing-tips/material-science/strength-testing.md), capturado 2026-10-17

## Contradicciones

### 1. Auto-orientación optimiza soportes, no resistencia

- OrcaSlicer Auto Orientation selecciona la orientación de menor "unprintability" (voladizos, soportes, contacto con cama, contorno). — [OrcaSlicer Wiki - Auto Orientation](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_auto_orient), capturado 2026-10-17
- La misma página advierte que las características de resistencia varían con la orientación por la adhesión entre capas. — [OrcaSlicer Wiki - Auto Orientation](https://github.com/OrcaSlicer/OrcaSlicer/wiki/prepare_auto_orient), capturado 2026-10-17

**Matiz.** Auto-orientación optimiza un objetivo (minimizar soportes y mejorar calidad de impresión), y la resistencia es otro objetivo distinto. La orientación que minimiza soportes no es necesariamente la que maximiza la resistencia, porque el eje Z (adhesión entre capas) es el eslabón débil y cambiar la orientación cambia qué eje soporta la carga. **El redactor tiene que explicar que son objetivos distintos y que el usuario debe decidir cuál priorizar; Auto Orientation no lo hace por él.**

### 2. Altura de capa vs. ancho de extrusión para mejorar la adhesión

- Simplify3D: la altura de capa debe ser un 20 % menor que el diámetro de boquilla (máx. 0,32 mm con boquilla de 0,4 mm) para que las capas se adhieran bien. — [Simplify3D - Layer Separation](https://www.simplify3d.com/resources/print-quality-troubleshooting/layer-separation-and-splitting/), capturado 2026-10-17
- Polymaker: aumentar la superficie de contacto entre capas aumentando el ancho de extrusión mejora la adhesión. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17

**Matiz.** No se contradicen: son dos parámetros distintos (altura de capa vs. ancho de extrusión) que afectan la sección y la superficie de contacto de la extrusión. La altura de capa excesiva reduce el aplastamiento y el contacto; el ancho de extrusión aumenta la superficie de entrelazado. **El redactor puede presentarlos como complementarios, no como alternativas.**

### 3. Bambu sube la cama/cámara; Polymaker sube temperatura/extrusión

- Bambu Lab: para grietas intercapa, subir la temperatura de cama 5-10 °C y la cámara 5 °C (si hay calefacción activa), además de boquilla/velocidad y ventilador. — [Bambu Lab Wiki - Interlayer Cracking](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-17
- Polymaker: mejorar la adhesión aumentando el tiempo por encima de Tg (temperatura de extrusión, temperatura de cámara, reducir enfriamiento) y aumentando el ancho de extrusión. — [Polymaker Wiki - Warping](https://wiki.polymaker.com/printing-tips/material-science/warping.md), capturado 2026-10-17

**Matiz.** Ambas son rutas oficiales hacia el mismo objetivo (más adhesión entre capas) pero por parámetros distintos: Bambu enfatiza cama y cámara; Polymaker enfatiza temperatura de extrusión y ancho. **No hay un orden compartido ni una prioridad única; el redactor debe listar ambas con su atribución.**

## Sin respaldo

- Que la orientación que minimiza soportes sea también la que maximiza la resistencia mecánica: **no lo afirma ninguna fuente**; es una inferencia nuestra. **[INFERENCIA NUESTRA — sin respaldo en las fuentes]**
- Que "Lay on Face" sirva para orientar una pieza pensando en su resistencia: la fuente sólo dice que es la forma rápida de orientar para imprimir; no menciona resistencia ni anisotropía. **[UNA SOLA FUENTE — OrcaSlicer, sin mención de resistencia]**
- Que el eje Z sea "el eslabón débil" en términos absolutos: las fuentes dicen que la resistencia varía con la orientación por la adhesión entre capas (OrcaSlicer) y que las grietas se manifiestan a lo largo de Z (Bambu). La etiqueta "eslabón débil" es nuestra síntesis, no una cita. **[SÍNTESIS NUESTRA — concepto respaldado por OrcaSlicer y Bambu, etiqueta no]**

## Tirado

- **Notas del recolector** de los seis ficheros raw: son metadatos del proceso (alcance, idioma, observaciones del recolector), no afirmaciones. Tiradas, pero informan el alcance.
- **Polymaker - Strength Testing**: no trata la orientación directamente; se incluyen las definiciones de ensayos como contexto de cómo se mide la resistencia de un material impreso. Las definiciones de extrusión (temperatura/rate de extrusión) de la página de Warping se incluyen sólo donde tocan la adhesión.
- **OrcaSlicer - Auto Orientation**: el algoritmo de minimización de soportes (pasos 1-4) no es de resistencia; se queda únicamente la nota final sobre variación de resistencia con orientación y el aviso de revisar la orientación sugerida.
- **OrcaSlicer - Object Manipulation**: Move, Rotate y Scale no contienen datos de resistencia; sólo Lay on Face es relevante para orientación. El resto se tira como navegación del slicer.
- **Bambu Lab - Interlayer Cracking**: los enlaces a los tutoriales de desatasascado por modelo (H2D, H2C, H2S, serie A, X1/P1) no están descargados; son navegación interna de la wiki. Los "End Notes" (ticket de soporte, Bambu AI) son boilerplate.
- **Simplify3D - Layer Separation**: la imagen referenciada y el resto del artículo de calidad de impresión no aportan datos adicionales para este tema. La recomendación de ventilador apagado para ABS y cámara cerrada con calefacción no aparece en este raw (sólo altura de capa y temperatura 220-235 °C para ABS); viene de otra fuente y no se incluye aquí.
- **Repeticiones**: la idea de que el plástico caliente adhiere mejor aparece en Simplify3D y Polymaker; se queda la formulación de Simplify3D (más directa) y la de Polymaker se cita como corroboración del mecanismo (entrelazado por encima de Tg).

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| anisotropía en FDM | adhesión entre capas | la resistencia varía con la orientación porque el eje Z depende de la adhesión entre capas |
| anisotropía en FDM | orientación de la pieza | cambiar la orientación cambia qué eje soporta la carga |
| Z como eslabón débil | grietas intercapa | las grietas se manifiestan a lo largo del eje Z cuando la adhesión es insuficiente |
| Z como eslabón débil | warping | el warping acumula tensión que supera la adhesión entre capas |
| orientación óptima para resistencia | auto-orientación del slicer | Auto Orientation optimiza soportes, no resistencia; son objetivos distintos |
| orientación en slicer | Lay on Face | herramienta rápida para poner una cara plana sobre la cama, útil como primer paso |
| altura de capa | adhesión entre capas | por encima del 80 % del diámetro de boquilla aumenta el riesgo de mala adhesión |
| ancho de extrusión | adhesión entre capas | mayor ancho aumenta la superficie de contacto y el entrelazado |
| temperatura de extrusión | adhesión entre capas | más tiempo por encima de Tg permite más entrelazado de cadenas |
| polímeros semicristalinos (Nylon) | warping | estrés adicional por cristalización; warpean incluso con cama a 45 °C |
| ensayos mecánicos | resistencia del material | tracción, Charpy y flexión en tres puntos definen cómo se mide la "resistencia" |
| grietas intercapa | materiales | más comunes en ABS, ASA, PC, PET-CF y PA-CF |
| grietas intercapa | temperatura de cama | subir 5-10 °C ayuda a la adhesión |
| grietas intercapa | ventilador de capa | reducir la velocidad del ventilador mejora la adhesión |
</content>,