---
titulo: Temperatura de hotend
tema: temperatura-hotend
fuentes:
  - wiki/raw/temperatura-hotend-bambulab-slice-param.md
  - wiki/raw/temperatura-hotend-prusa-stringing-and-oozing.md
  - wiki/raw/temperatura-hotend-bambulab-interlayer-cracking.md
  - wiki/raw/material-bambulab-material-table.md
  - wiki/raw/separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md
cocinado: 2026-10-08
---

## Afirmaciones

### Temperatura de boquilla por material (tabla Bambu Lab)

- PLA: 190–240 °C (±10 °C).
  > Cita: "190 - 240"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- PETG: 240–270 °C (±10 °C).
  > Cita: "240 - 270"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- ABS: 240–280 °C (±10 °C).
  > Cita: "240 - 280"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- ASA: 240–280 °C (±10 °C).
  > Cita: "240 - 280"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- PC: 260–290 °C (±10 °C).
  > Cita: "260 - 290"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- PA-CF/GF, PA6-CF/GF, PAHT-CF/GF: 260–300 °C (±10 °C).
  > Cita: "260 - 300"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- PET-CF/GF: 260–300 °C (±10 °C).
  > Cita: "260 - 300"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- PPA-CF/GF: 285–320 °C (±10 °C).
  > Cita: "285 - 320"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- PPS-CF/GF: 310–340 °C (±10 °C).
  > Cita: "310 - 340"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

- TPU: 200–250 °C (±10 °C).
  > Cita: "200 - 250"
  — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08

### Efecto de la temperatura en el stringing

- Bajar la temperatura de boquilla en 5–10 °C disminuye la ocurrencia de hilos.
  > Cita: "Lowering the temperature decreases the occurrence of strings. Try decreasing the nozzle temperature by 5 – 10°C and check whether there's less stringing."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-08

- El stringing es causado por temperaturas de impresión muy altas y/o ajustes de retracción incorrectos.
  > Cita: "This issue is caused by very high printing temperatures and/or using incorrect retraction settings."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-08

- A velocidad de impresión muy baja con temperatura de boquilla alta, el filamento permanece más tiempo en la boquilla y puede causar stringing y leakage.
  > Cita: "when decreasing the print speed to a very low level, the filament will stay in the nozzle for a longer duration, causing the filament to melt more fully, potentially leading to issues such as stringing and leakage"
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- La humedad en el filamento causa stringing independientemente de la temperatura de boquilla.
  > Cita: "The filament might have gathered moisture, which will cause a lot of stringing."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-08

- Un problema de disipación de calor en la boquilla puede causar stringing incluso con la temperatura correcta.
  > Cita: "Stringing in the nozzle might be caused by a heat dissipation issue in the nozzle."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-08

### Efecto de la temperatura en la unión entre capas

- Aumentar la temperatura de boquilla o disminuir la velocidad de impresión permite al filamento extruido más tiempo para unirse con la capa inferior, mejorando la adhesión intercapa.
  > Cita: "This method allows the extruded filament more time to bond with the layer below, thereby improving interlayer adhesion."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-08

- Cuando la adhesión intercapa es insuficiente y la contracción del material es significativa, pueden aparecer grietas a lo largo de la dirección Z.
  > Cita: "When the interlayer adhesion of a model is insufficient and the material shrinkage is significant, cracks may appear on the printed part along the Z direction."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-08

- La separación entre capas ocurre cuando las fuerzas de contracción superan la resistencia de adhesión entre capas.
  > Cita: "Layer separation occurs when the object cracks due to forces exerted on the print when layers cool down at different rates. Warping forces exceed the layer adhesion strength and the layers separate."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-04

- La resistencia intercapa de un modelo es usualmente significativamente menor que la resistencia perpendicular a la intercapa (dirección Z < direcciones X e Y).
  > Cita: "the interlayer strength of a model is usually significantly lower than the strength vertical to the interlayer, meaning that the strength in the Z direction is usually significantly lower than the strength in the X and Y directions"
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- PLA con temperatura insuficiente puede sufrir cracking y separación de capas; Prusa recomienda aumentar la temperatura en incrementos de 5 °C hasta lograr buena adhesión.
  > Cita: "PLA may suffer from cracking and layer separation problems if you're printing with insufficient temperature. Depending on the brand, PLA is printed at a range between 195-220. If you are having issues, try increasing the printing temperature in 5°C increments, until you get a good layer adhesion."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-04

### Relación velocidad-temperatura

- Al aumentar la velocidad de impresión, se necesita más filamento fundido simultáneamente, lo que requiere un aumento de la temperatura de boquilla para proporcionar calor adicional.
  > Cita: "When you increase the print speed, more filament needs to be melted simultaneously, requiring an increase in nozzle temperature to provide additional heat."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- Al activar modos de alta velocidad (Sport Mode o Ludicrous Mode), la velocidad de impresión aumenta y la temperatura de boquilla debe elevarse para evitar la fusión insuficiente del filamento.
  > Cita: "when turning on the Sport Mode or Ludicrous Mode, the print speed is increased, and the nozzle temperature needs to be raised to avoid insufficient filament melting causing a lack of materials"
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- A mayor velocidad de impresión, mayor presión del filamento fundido desde la boquilla; la superficie se vuelve más propensa al cracking y exhibe fluidez anormal.
  > Cita: "The higher the print speed, the higher the pressure of the filament melt from the nozzle. As the speed increases, the surface becomes more prone to cracking and exhibits abnormal fluidity."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- Con velocidad de impresión baja y temperatura de boquilla alta, la superficie impresa suele ser más lisa, más delicada y con mayor brillo.
  > Cita: "printing at low speeds, especially when printing at low speeds together with high nozzle temperatures, usually leads to smoother and more delicate print surfaces which show higher gloss and clearer details"
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- Con velocidad de impresión alta, la superficie tiende a ser más rugosa, menos delicada, con bajo brillo y puede perder detalles finos.
  > Cita: "printing at high speeds tends to lead to relatively rough and less delicate surfaces, exhibits low gloss, and may even lose some fine details"
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- Después de aumentar la temperatura de boquilla, se puede configurar una velocidad volumétrica más alta para boquillas grandes (0.6 y 0.8 mm), reduciendo el tiempo de impresión pero con posible menor calidad.
  > Cita: "After increasing the nozzle temperature, you can set a higher volumetric speed for larger nozzles( 0.6 and 0.8 mm nozzles), which further reduces the printing time. Nevertheless, it is important to note that this may result in lower print quality."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

### Materiales de alta temperatura y warping

- Los materiales de alta temperatura (ABS, ASA, PC, PA, PA-CF) son más propensos al warping, especialmente cuando la temperatura de cámara es baja.
  > Cita: "High-temperature filaments such as ABS, ASA, PC, PA, PA-CF, etc. are prones to warp more, especially when the chamber temperature is low."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08

- ABS es altamente susceptible a la separación de capas cuando hay aire frío soplando sobre la impresión antes de que se enfríe completamente.
  > Cita: "ABS is highly susceptible to layer separation when there's any sort of cold air blowing on the print before it has cooled down fully."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-04

- PETG tiene ventajas similares a ABS pero es mucho mejor para imprimir objetos grandes y no tiene la misma tendency a crackear/delaminar.
  > Cita: "PETG has similar advantages ABS, but it's much better for printing large objects and it does not have the same tendency to crack/de-laminate."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-04

### Interlayer cracking: otras causas además de la temperatura

- Una ligera obstrucción de la boquilla puede evitar la extrusión durante una capa específica, manifestándose de forma similar al cracking.
  > Cita: "A slight nozzle clog may prevent filament extrusion during a specific layer, manifesting similarly to cracking."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-08

- Reducir la velocidad del ventilador de enfriamiento de la pieza puede mejorar la adhesión intercapa.
  > Cita: "Preview the fan speed after slicing the model. If the fan speed for the inner and outer walls is 60% as shown below, reduce the 'Max fan speed'."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-08

- Aumentar la temperatura de la cama en 5–10 °C puede ayudar a prevenir el cracking intercapa.
  > Cita: "Appropriately Increase the Heatbed Temperature by 5-10°C. If the device has active chamber heating, increase the chamber temperature by 5°C."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-08

- Como ejemplo concreto de reducción de velocidad para mejorar la adhesión: con ABS, reducir la velocidad de pared interior a 150 mm/s y la de pared exterior a 100 mm/s.
  > Cita: "For example, with ABS, you can reduce the inner wall speed to 150 mm/s and the outer wall speed to 100 mm/s."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking), capturado 2026-10-08

### Criterio diagnóstico

- La mejor forma de identificar capas agrietadas es por los cortes limpios que muestran una ligera curvatura hacia arriba o warp.
  > Cita: "Best way to identify cracked layers are the clean cuts that show a bit of an upward bend or warp."
  — [Prusa Knowledge Base](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-04

## Contradicciones

### Rango de temperatura de PLA

- Bambu Lab: 190–240 °C — [Bambu Lab material table](https://wiki.bambulab.com/en/general/filament-guide-material-table), capturado 2026-10-08
- Prusa: 195–220 °C — [Prusa Knowledge Base](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-04

**Se contradicen parcialmente.** El rango de Bambu (190–240 °C) es más amplio que el de Prusa (195–220 °C). No se promedian: cada fabricante da su propio rango. La diferencia puede deberse a que Bambu cubre múltiples marcas y formulaciones de PLA (incluyendo PLA-CF a 210–240 °C), mientras que Prusa habla específicamente de su PLA estándar. **El redactor tiene que publicar ambos rangos con su fuente, no elegir uno.**

### Temperatura de boquilla vs. calidad superficial

- Bambu: "printing at low speeds, especially when printing at low speeds together with high nozzle temperatures, usually leads to smoother and more delicate print surfaces which show higher gloss and clearer details" — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/slice-param), capturado 2026-10-08
- Prusa (stringing): "Lowering the temperature decreases the occurrence of strings." — [Prusa Knowledge Base](https://help.prusa3d.com/article/stringing-and-oozing_1805), capturado 2026-10-08

**Tensión real.** Bambu dice que baja velocidad + alta temperatura = mejor superficie. Prusa dice que bajar la temperatura = menos hilos. Ambas son correctas según la situación: Bambu habla del acabado superficial, Prusa habla del stringing. El matiz es que subir la temperatura mejora la unión y el acabado pero empeora el stringing; bajarla mejora el stringing pero empeora la unión. **El redactor tiene que explicar el trueque, no elegir un extremo.**

## Sin respaldo

Ninguna. Las cinco fuentes son documentación oficial de fabricante (Bambu Lab y Prusa Research), que son fuentes primarias y no necesitan marca de respaldo.

## Tirado

- **Temperaturas de cama:** la tabla de temperaturas de cama por material (PLA 35–65 °C, PETG 60–80 °C, ABS 90–100 °C, etc.) está fuera del alcance de esta guía → `temperatura-cama`.
- **Altura de capa:** cualquier mención a altura de capa, resolución vertical o tiempo de impresión relacionado con altura de capa está fuera de alcance → `altura-capa`.
- **Voladizos y soportes:** cualquier mención a voladizos, soportes orgánicos o disposición de modelos en la placa está fuera de alcance → `voladizos-y-soportes`.
- **Materiales:** la selección de material como tema (qué material elegir para qué aplicación) está fuera de alcance → `material`.
- **Separación entre capas como fallo completo:** la separación entre capas como fenómeno diagnóstico completo (diferencia entre separación y grieta, cómo identificarla) está fuera de alcance → `separaciones-entre-capas`.
- **Temperatura de cámara:** la temperatura de cámara y su relación con el warping está fuera de alcance → `temperatura-camara` (nota: la fuente `temperatura-hotend-bambulab-chamber-temperature.md` fue excluida del encargo).
- **AMS y compatibilidad de filamentos:** la compatibilidad de filamentos con AMS/AMS lite no es temperatura de boquilla.
- **Secado de filamentos:** las instrucciones de secado y almacenamiento no son temperatura de boquilla.
- **Placas de impresión:** tipos de placa, limpieza y mantenimiento no son temperatura de boquilla.
- **Retracción y stringing como ajuste de slicer:** aunque el stringing se menciona como síntoma relacionado con temperatura, los ajustes específicos de retracción (longitud, velocidad, lift z) son un tema aparte.
- **Extrusion multiplier / flow rate:** Prusa menciona aumentar el flow rate en incrementos del 5 % para mejorar la unión entre capas, pero esto es un ajuste de extrusión, no de temperatura. Se mencionó en el contexto pero no como afirmación de temperatura.
- **Navegación, menús, migas de pan, anuncios, banners:** relleno estándar.
- **Imágenes:** marcadas como "(imagen)" porque el webfetch no las descarga; no son afirmaciones.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| temperatura de hotend | unión entre capas | subir la temperatura o bajar la velocidad da más tiempo al filamento para unirse con la capa inferior |
| temperatura de hotend | stringing/oozing | bajar la temperatura 5–10 °C reduce los hilos, pero puede empeorar la unión |
| temperatura de hotend | calidad superficial | baja velocidad + alta temperatura = más brillo y detalle; alta velocidad = más rugosidad |
| temperatura de hotend | velocidad de impresión | a mayor velocidad, se necesita mayor temperatura para fundir más filamento simultáneamente |
| temperatura de hotend | material (tipo) | cada material tiene su rango: PLA 190–240, PETG 240–270, ABS 240–280, PC 260–290, PA-CF 260–300 |
| temperatura de hotend | warping | los materiales de alta temperatura (ABS, ASA, PC, PA) son más propensos al warping con cámara fría |
| temperatura de hotend | separación entre capas | temperatura insuficiente → unión débil → separación; Prusa: PLA 195–220, subir 5 °C |
| temperatura de hotend | cracking intercapa | adhesión insuficiente + contracción → grietas en Z; Bambu: subir temperatura o bajar velocidad |
| temperatura de hotend | humedad del filamento | la humedad causa stringing independientemente de la temperatura de boquilla |
| temperatura de hotend | disipación de calor | un problema de disipación en la boquilla puede causar stringing incluso con temperatura correcta |
| temperatura de hotend | diámetro de boquilla | boquilla más grande permite mayor velocidad volumétrica tras subir la temperatura |
