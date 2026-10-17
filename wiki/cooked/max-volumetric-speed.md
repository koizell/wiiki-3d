---
titulo: Velocidad volumétrica máxima (MVS)
tema: max-volumetric-speed
fuentes:
  - wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md
  - wiki/raw/max-volumetric-speed-simplify3d-under-extrusion.md
  - wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md
  - wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md
  - wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md
  - wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md
cocinado: 2026-10-17
---

# Velocidad volumétrica máxima (MVS)

## Afirmaciones

### Qué es la velocidad volumétrica máxima

- El **volumetric flow rate** es la cantidad de filamento que el hotend puede empujar
  a través de la boquilla por segundo, medida en **mm³/s**. — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- En OrcaSlicer, el **Max Volumetric Speed** (`filament_max_volumetric_speed`) es el
  **volumen de filamento que se puede fundir y extruir por segundo**; la velocidad de
  impresión se limita a ese valor para evitar atascos, subextrusión o mala adhesión
  entre capas. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md`
- Cada perfil de material incluye el MVS. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md`
- El MVS **no puede ser cero**. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md`
- Modo **Advanced**, variable `filament_max_volumetric_speed`, tipo **Float list**, CLI
  `--filament-max-volumetric-speed=1`. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md`
- Prusament PLA High Speed tiene un MVS de **28 mm³/s en la CORE One+ a 220 °C**;
  el Prusament PLA normal tiene **24 mm³/s** (mismo hardware, para comparación).
  — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/),
  `wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`
- El MVS **varía con el hardware** (extrusor y cinemática) y con la **forma del modelo**;
  no es un número único por material. — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/),
  `wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`

### Cómo se mide y se calibra

- El MVS depende de **material, máquina, diámetro de boquilla y montaje del extrusor**;
  hay que calibrarlo por impresora y por filamento. Incluso dentro del mismo tipo
  (PLA), **marca y color** afectan de forma significativa. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- Si se va a subir velocidad o flujo, conviene **subir la temperatura de boquilla hacia
  el extremo alto del rango del filamento** (usar una torre de temperatura para
  encontrarlo). — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- Procedimiento OrcaSlicer: valores por defecto **5 mm³/s de inicio, 20 mm³/s de fin,
  paso 0,5**. Imprimir, anotar dónde empiezan a fallar las capas y dónde baja la
  calidad; un **cambio de brillo (brillante ↔ mate)** es pista visual de degradación
  del material o mala adhesión. Medir con calibre o regla la **altura justo antes de
  los defectos**. Fórmula: **MVS = inicio + (altura medida × paso)**. Ejemplo con
  19 mm: 5 + (19 × 0,5) = **14,5 mm³/s**. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- Verificación cruzada en la pestaña **Preview** del slicer, esquema de color
  **"flow"**, bajando hasta la altura medida y deslizando el cabezal; el valor se
  fija después en los ajustes del filamento. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- La prueba es el **mejor caso**: no tiene en cuenta retracciones ni otros ajustes que
  pueden aumentar atascos o subextrusión. Se recomienda **reducir el valor un
  10–20 %** (o más) por seguridad de calidad/resistencia. Imprimir a alto caudal puede
  dar mala adhesión entre capas o atascos en la boquilla.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- **Adaptive volumetric speed** (modo **Developer**, `filament_adaptive_volumetric_speed`,
  boolean, CLI `--filament-adaptive-volumetric-speed=1`) es experimental e incompleto
  (importado de BBS) y funcional sólo para algunos perfiles. Con él habilitado, el flujo
  se limita por el **menor** entre el valor ajustado (calculado desde ancho de línea y
  altura de capa) y el máximo definido por el usuario; deshabilitado, sólo se aplica
  el máximo del usuario. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md`

### Cómo se configura

- OrcaSlicer: `filament_max_volumetric_speed` (Advanced, Float list) y
  `filament_adaptive_volumetric_speed` (Developer, boolean), con sus CLI overrides.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation),
  `wiki/raw/max-volumetric-speed-orcaslicer-material-volumetric-speed-limitation.md`
- Para aprovechar un hotend/nozzle de alto flujo hay que: **subir las velocidades de
  impresión en el perfil de filamento**, **subir el MVS en el slicer** y,
  potencialmente, **aumentar la altura de capa o el ancho de línea**. Sin esos
  cambios, es "conducir un coche más rápido con el mismo límite de velocidad".
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- Simplify3D: el **extrusion multiplier** (flow rate) se ajusta por extrusor en la
  pestaña Extruder; valores típicos ~0,9 para PLA y ~1,0 para ABS; aumentar un 5 % y
  reimprimir el cubo de prueba. El diámetro de filamento se fija en la pestaña Other
  (valores comunes 1,75 y 2,85 mm). — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/under-extrusion/),
  `wiki/raw/max-volumetric-speed-simplify3d-under-extrusion.md`
- Test de subextrusión (Simplify3D): cubo de 20 mm con al menos 3 perímetros; si hay
  gaps entre los 3 perímetros en la parte superior, hay subextrusión. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/under-extrusion/),
  `wiki/raw/max-volumetric-speed-simplify3d-under-extrusion.md`

### Efecto en la calidad

- Hotend de alto flujo (geometría interna de 4 canales): fusión más uniforme → salida
  a temperatura/viscosidad más consistentes → **mejor adhesión entre capas** (vínculo
  entre capas típicamente **3× más fuerte** y más consistente) y **paredes exteriores
  más lisas** (menos artefactos superficiales). — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- A velocidades altas, el hotend stock puede no mantener el filamento totalmente
  fundido → **subextrusión**, caída notable de calidad y, en el peor caso, fallos
  totales de impresión; las variantes high flow lo manejan de forma consistente.
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- Imprimir a alto caudal volumétrico puede dar **mala adhesión entre capas o atascos**
  en la boquilla. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- OrcaSlicer: un **cambio de brillo (glossy vs mate)** es pista visual de degradación
  del material o mala adhesión. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- Simplify3D: la subextrusión se manifiesta como **gaps entre extrusiones adyacentes**
  de cada capa. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/under-extrusion/),
  `wiki/raw/max-volumetric-speed-simplify3d-under-extrusion.md`
- Prusament PLA High Speed: mejor resistencia mecánica por mejor adhesión capa a capa;
  superficie **más brillante (glossy)** que enfatiza imperfecciones; mejores
  voladizos incluso a temperaturas ambiente más altas gracias a la solidificación
  rápida. — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/),
  `wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`
- Prusa: coeficiente de anisotropía de resistencia a tracción **r = σz/σxy** (relación
  entre resistencia en Z y en XY); PLA High Speed **r = 0,60** (segundo más alto de
  sus materiales); PLA y PC Blend r = 0,33; PETG r = 0,38; r = 1 sería igual en todas
  las direcciones. — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/),
  `wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`

### High flow vs high speed

- **High flow y high speed no son lo mismo**: están relacionados, pero no son
  intercambiables. — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- Escenarios donde el flow es el cuello de botella (mayores ganancias): **impresiones
  grandes y voluminosas con infill continuo** (cajas, carcasas estructurales, terrenos;
  probar infill cúbico); **vase mode** (sin retracciones, paredes continuas, mínimos
  cambios de dirección; el sistema de movimiento va a su velocidad máxima y el hotend
  debe seguir); modos **"Ludicrous" y "Sport"** más fiables con hotend high flow.
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- Donde **no** se ve diferencia: modelos pequeños y detallados (el slicer impone un
  **tiempo mínimo de capa** para enfriamiento); puentes, voladizos y detalle fino (el
  cuello de botella es la física, no el hotend). — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- El movimiento de la boquilla se rige por **velocidad, aceleración y jerk**; cada
  máquina tiene límites duros en los tres y todos interactúan. Aunque el hotend
  pudiera empujar el doble, el sistema de movimiento puede no moverse lo suficientemente
  rápido. En la mayoría de perfiles estándar, el **sistema de movimiento (no el hotend)
  ya es el cuello de botella**. Actualizar el hotend no elimina ese cuello sin
  actualizar también los perfiles del slicer. — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- Otras limitaciones que frenan el efecto del high flow: **fuerza del extrusor** y
  **tasa de enfriamiento del ventilador**. Si el extrusor no puede empujar y el
  ventilador no enfría suficientemente rápido → impresiones lentas y de mala calidad.
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`
- Beneficios del high flow **más allá de la velocidad**: adhesión entre capas más fuerte
  y paredes más lisas incluso sin tocar los ajustes de velocidad. — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  `wiki/raw/max-volumetric-speed-e3d-high-flow-vs-speed.md`

### Material y filamento

- Para aumentar el caudal volumétrico máximo hay que **aumentar la transferencia de
  calor al filamento**; a mayor flujo, menos tiempo para introducir el calor. Dos
  opciones: (1) mantener la sección circular y **aumentar la longitud del meltzone**;
  (2) **cambiar la forma de la sección transversal** (aumentar superficie).
  — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- Historia: **Volcano (2014)** — meltzone casi el doble que el V6; cartucho calefactor
  rotado paralelo al eje y más cerca de la boquilla. **SuperVolcano (2019)** — hasta
  **11× el throughput volumétrico** de la boquilla V6 líder del mercado. **High Flow
  (2023)** para boquillas Revo: diseño de **4 canales** que dividen el filamento;
  extendido a Prusa Nextruder, Bambu Lab H2/P2/X2 HotEnds, Creality Unicorn y K2 Plus.
  — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- **FUGE** (futuro, no lanzado): un único path de filamento de longitud estándar
  aplanado; gran superficie y pequeña distancia entre exterior e interior del filamento
  para introducir más calor en formatos cortos. — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- E3D usa **PLA para todo el testing** (más difícil obtener alto flujo que con PETG o
  ASA; el más usado). **Prusament Jet Black PLA** para testing de flujo (precisión
  dimensional y reproducibilidad entre lotes). Miden la fuerza de extrusión a flujos
  crecientes; las boquillas deben resistir extrusión en frío sin dañarse.
  — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- E3D afirma que los valores de flow rate declarados por otros hotends a menudo se
  reducen a la mitad bajo su procedimiento de test; testean en condiciones de uso
  normal y proporcionan flow rate por tamaño de boquilla. — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- Tabla PETG (Bambu Lab Hardened Steel vs E3D High Flow ObXiDian 500): 0,4 mm
  **35 vs 65 mm³/s**; 0,6 mm **39 vs 63 mm³/s**. — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- Tabla PLA: 0,4 mm **30 vs 35 mm³/s**; 0,6 mm **30 vs 51 mm³/s**.
  — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology),
  `wiki/raw/max-volumetric-speed-e3d-evolution-high-flow.md`
- Prusament PLA High Speed: **MFI más alto y shear-thinning** (la viscosidad baja al
  empujar más rápido); absorción rápida de calor en el hotend y enfriamiento optimizado
  para solidificación instantánea; permite empujar el printer a sus límites sin clogs
  ni hardware especializado. El MVS depende del hardware y la forma del modelo.
  — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/),
  `wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`
- OrcaSlicer: el MVS varía por material, máquina, boquilla y extrusor; marca y color
  afectan incluso dentro del mismo tipo. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib),
  `wiki/raw/max-volumetric-speed-orcaslicer-volumetric-speed-calib.md`
- Prusament PLA High Speed: superficie **satinada a brillante homogénea**; el acabado
  glossy enfatiza imperfecciones; diseñado para prototipado rápido; no reemplaza al
  PLA clásico (características visuales y mecánicas distintas). — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/),
  `wiki/raw/max-volumetric-speed-prusa-pla-high-speed.md`

## Contradicciones

**No se resuelven aquí.** Se anotan con matiz; el redactor debe explicar el matiz.

### 1. Alto caudal: mejora la adhesión (E3D) vs. puede dañarla (OrcaSlicer)

- E3D: el hotend high flow (4 canales) da fusión más uniforme → adhesión entre capas
  típicamente 3× más fuerte, **incluso sin cambiar velocidades**.
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing)
- OrcaSlicer: imprimir a alto caudal volumétrico puede dar **mala adhesión entre
  capas o atascos**; recomienda reducir el valor medido un 10–20 %.
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib)
- **Matiz**: E3D habla de la **geometría del hotend** (mejor fusión consistente),
  OrcaSlicer del **ajuste de velocidad** (empujar material demasiado rápido). Son
  variables distintas: hardware de alto flujo vs. límite de velocidad. Ambas pueden ser
  ciertas a la vez; el redactor debe distinguir "hotend que funde mejor" de "imprimir
  demasiado rápido".

### 2. El claim del "60 % más de flow" y "valores a la mitad" vs. las propias tablas de E3D

- E3D afirma "over 60 % more volumetric flow" frente a un setup stock y que los valores
  declarados por otros hotends "se reducen a la mitad" bajo su test.
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing),
  [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology)
- Las tablas del mismo fabricante (ObXiDian 500 vs Bambu Lab Hardened Steel) muestran
  deltas mucho menores que "la mitad" en varios casos (PLA 0,4 mm: 30 vs 35 mm³/s,
  +17 %).
  — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology)
- **Matiz**: el 60 % se mide frente a un setup stock (no frente a Bambu hardened steel);
  las tablas comparan contra un hotend ya de alto flujo. Además, E3D no publica la
  metodología de su test. El redactor no debe presentar el claim como hecho verificado.

### 3. PLA: "más difícil de obtener alto flujo" (E3D) vs. PLA High Speed a 28 mm³/s (Prusa)

- E3D: PLA es más difícil de llevar a alto flujo que PETG o ASA; sus tablas muestran
  PLA muy por debajo de PETG para el mismo hotend. — [E3D](https://e3d-online.com/blogs/news/the-evolution-of-e3d-s-high-flow-technology)
- Prusa: Prusament PLA High Speed alcanza 28 mm³/s en CORE One+ y "push to limits
  without clogs or specialized hardware", gracias a MFI alto y shear-thinning.
  — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/)
- **Matiz**: los límites absolutos dependen del hotend, el extrusor y la cinemática;
  comparar números entre fabricantes/hardware no es válido. E3D habla del material base
  en su hotend; Prusa cambia la formulación del filamento. Ambas pueden ser ciertas.

### 4. Actualizar hotend no acelera (E3D) vs. ahorro del 20–40 % sin hardware (Prusa)

- E3D: en la mayoría de perfiles estándar el sistema de movimiento (no el hotend) es
  el cuello de botella; actualizar el hotend no acelera sin actualizar perfiles.
  — [E3D](https://e3d-online.com/blogs/news/why-high-flow-printing-doesnt-always-mean-high-speed-printing)
- Prusa: PLA High Speed ahorra hasta 20–40 % de tiempo de impresión dependiendo de la
  forma y tamaño del modelo, sin hardware especializado. — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/)
- **Matiz**: E3D habla de actualizar el **hotend**; Prusa cambia el **material**
  (MFI/shear-thinning). Son cuellos distintos (hardware vs formulación). El ahorro real
  depende del modelo y del hardware; Prusa lo acota con "dependiendo de la forma y tamaño".

### 5. Temperatura de referencia: 220 °C (Prusa) vs. "subir hacia el extremo alto" (OrcaSlicer)

- Prusa da el MVS de PLA High Speed a **220 °C** como dato de ensayo.
  — [Prusa Research](https://blog.prusa3d.com/prusament-pla-high-speed-a-perfect-choice-for-rapid-prototyping_137192/)
- OrcaSlicer recomienda **subir la temperatura de boquilla hacia el extremo alto del
  rango** del filamento al aumentar velocidad/flujo. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric_speed_calib)
- **Matiz**: el número de Prusa es la temperatura de su ensayo, no una recomendación
  universal; OrcaSlicer recomienda ajustar. No son incompatibles, pero el valor de
  Prusa no debe tomarse como fijo para otros filamentos/hardware.

### 6. "Extrusion multiplier" (Simplify3D) vs. MVS (mm³/s) (OrcaSlicer)

- Simplify3D usa **extrusion multiplier** (factor del flujo esperado, ~0,9 PLA) como
  control de flow. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/under-extrusion/)
- OrcaSlicer define el MVS como **volumen por segundo** (mm³/s) que limita la
  velocidad. — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_volumetric_speed_limitation)
- **Matiz**: son conceptos distintos con nombre parecido. El extrusion multiplier
  ajusta cuánto sale (factor); el MVS pone un techo de velocidad por capacidad de
  fusión. No confundirlos ni sumarlos.

## Sin respaldo

Afirmaciones que aparecen en una sola fuente y no están corroboradas por otra del lote.
Las de origen fabricante se marcan como tales.

- **"Over 60 % more volumetric flow"** frente a un setup stock. — sólo E3D
  (fabricante, sin corroborar).
- **Adhesión entre capas "típicamente 3× más fuerte"** con hotend high flow.
  — sólo E3D (fabricante, sin corroborar).
- Que los valores declarados por otros hotends "se reducen a la mitad" bajo el test de
  E3D. — sólo E3D (fabricante, sin metodología publicada).
- **Ahorro de 20–40 % de tiempo de impresión** con PLA High Speed. — sólo Prusa
  (fabricante, depende de forma y tamaño).
- **Coeficiente de anisotropía r = 0,60** (y comparativas r = 0,33 / 0,38) con
  metodología propia sin norma ISO. — sólo Prusa (fabricante, metodología propia).
- **Extrusion multiplier ~0,9 para PLA y ~1,0 para ABS** en Simplify3D.
  — sólo Simplify3D (fabricante de slicer, sin corroborar).
- **FUGE** como concepto futuro de alto flujo. — sólo E3D (fabricante, producto no
  lanzado).
- **Adaptive volumetric speed** experimental e incompleto (importado de BBS).
  — sólo OrcaSlicer (proyecto oficial, funcional sólo para algunos perfiles).
- Que la prueba de MVS es el "mejor caso" y la recomendación de **reducir 10–20 %**
  el valor medido. — sólo OrcaSlicer.
- Que **marca y color** afectan significativamente al MVS dentro del mismo tipo de
  material. — sólo OrcaSlicer.
- Que subir la temperatura de boquilla hacia el extremo alto del rango es recomendable
  al aumentar flujo. — sólo OrcaSlicer.
- Los valores numéricos de las tablas (35/65, 39/63, 30/35, 30/51 mm³/s) y los
  28/24 mm³/s de Prusa. — sólo sus respectivas fuentes; no comparables entre
  hardware.

## Tirado

Qué se eliminó y por qué (el redactor no usa nada de esto).

- **Navegación del wiki**, migas de pan, enlaces de soporte y pie de página de cada
  artículo. — no son datos técnicos.
- **Notas del recolector** (`## Notas del recolector`) que recapitulan el contenido;
  se usaron como guía de lectura, no se copiaron como afirmaciones.
- **Imágenes referenciadas** en el ensayo de OrcaSlicer (mvf_measurement_point,
  mvf_caliper_sample_mvf, mvf_gui_flow, mvf_material_settings) y las figuras del blog
  de E3D. — no son citables como datos; se conserva la descripción textual.
- **Prosa de marketing y anecdótica** de los blogs de E3D y Prusa ("we've never been
  ones to just go with the flow", etc.). — relleno, sin dato comprobable.
- **Datos de producto** de Prusa PLA High Speed: colores (5 iniciales), precio
  (29,90 USD / 32,90 EUR por kg) y "más colores próximamente". — detalle comercial,
  no técnico.
- **"Related Topics"** de Simplify3D (gaps en capas superiores, extrusor atascado,
  etc.). — navegación, no contenido.
- **Repetidos condensados**: la definición de flow rate como "cantidad que sale de la
  boquilla" aparece en E3D y Simplify3D; se quedó la de E3D (mm³/s) y la de
  Simplify3D se cita como corroboración del concepto de flow rate como factor. La
  calibración de MVS de OrcaSlicer se resume una sola vez (el mismo procedimiento
  aparece en la fuente `flow-rate-orcaslicer-*` del tema flow-rate, que no se procesa
  aquí).
- **Capturas de menú y secuencias de pulsación** (Calibration > Flow Rate > …) de
  Simplify3D/OrcaSlicer. — specifics de versión, pueden cambiar.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| Velocidad volumétrica máxima (MVS) | Velocidad de impresión | la velocidad de impresión no puede superar el MVS del filamento |
| MVS | Material / filamento | varía por material, marca, color, boquilla y extrusor |
| MVS | Temperatura de boquilla | conviene subir la temperatura hacia el extremo alto del rango al aumentar flujo |
| MVS | Adhesión entre capas | imprimir por encima del MVS puede dar mala adhesión o atascos |
| High flow (hotend) | High speed (impresión) | relacionados pero no intercambiables; el hotend no es siempre el cuello de botella |
| High flow (hotend) | Sistema de movimiento (speed/accel/jerk) | en perfiles estándar el movimiento, no el hotend, suele ser el cuello |
| High flow (hotend) | Ventilador / enfriamiento | si el ventilador no enfría suficientemente rápido, el flujo alto no se aprovecha |
| Extrusion multiplier (Simplify3D) | MVS (mm³/s) | factor de flujo vs. techo de velocidad por capacidad de fusión; no confundir |
| PLA High Speed (Prusa) | MVS | 28 mm³/s en CORE One+ a 220 °C vs 24 mm³/s del PLA normal |
| MVS | Calibración por altura medida | fórmula inicio + altura × paso; luego reducir 10–20 % por seguridad |
| MVS | Under-extrusion | empujar por encima del MVS produce subextrusión y atascos |
| MVS | Layer adhesion | hotend high flow mejora la fusión; velocidad excesiva la empeora |
