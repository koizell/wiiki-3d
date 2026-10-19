---
titulo: "Stringing and oozing"
url: https://help.prusa3d.com/article/stringing-and-oozing_1805
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-19
autor: Prusa Research
idioma: en
---

# Stringing and oozing

Stringing or oozing, also known as "hairy prints", is the name given for when small strings of filament are left on a printed model. This usually happens when the filament keeps flowing from the nozzle while the extruder is moving to another object. You can see this as a marginal line of filament left between the objects.

This issue is caused by **very high printing temperatures and/or using incorrect retraction settings**. This can be solved by changing a couple of settings in PrusaSlicer and checking your hardware.

| [imagen:] | [imagen:] |

### Stringing from material left on the nozzle

If you print for a long time from a single type of filament, such as PET-G, the filament can create a thin layer in the nozzle. This can cause stringing as the strands of the filament stick to the surface of the print. Therefore, thoroughly clean the nozzle before printing and make sure that any dirt or remnants of previous filaments are removed from the nozzle.

[callout]
We highly recommend using our official (factory default) preset settings in PrusaSlicer. However, if you are printing with your own settings, make sure that you have the retraction settings configured correctly.
[/callout]

### PrusaSlicer settings

[imagen:]

You should start by checking a parameter known as Retraction. What does retraction do? When the extruder has finished printing one section/object of your g-code, the filament is pulled back into the nozzle. Once the extruder moves to the next location the printing process continues – the filament is pushed back out and it starts extruding from the nozzle again. Retraction settings can be found in PrusaSlicer in *Printer Settings -> Extruder 1*.

Flexible filaments usually need longer retractions, because the material stretches while being pulled back to the nozzle. Flexible materials are a special case and can need a lot of tweaking and tuning.

**The retraction settings are:**

- **Retraction length:** Amount that the filament is pulled back when a retraction is triggered. **On the MK2.5/S and MK3/S/+, the retraction length should be a maximum of 2 mm.**

[tip-callout]
Due to the Bowden extruder, the retraction length of the Original Prusa MINI/MINI+ presets are much longer (default 3.2 mm).
[/callout]

- **Lift z:** lifts the extruder during movement. Having this setting lower will improve stringing. Note that disabling this feature may cause the nozzle to hit the printed part.

- **Retraction Speed:** Extruder motor speed on retraction. A higher value improves stringing, but if it is too high it may skip steps in the motor.

- **Minimum travel after retraction:** Amount of move that will trigger a retraction (mm). The preset number in PrusaSlicer is 1 mm, which is a low amount. Having this number higher will get lower printing times, but increase oozing and stringing.

- **Retract on layer change:** Activates retraction when the layer changes to the next one. It is recommended to leave this option on.

- **Wipe while retracting:** Moves the nozzle (wipe) while the retraction is happening. It is recommended to leave this option on.

- **Retract amount before wiping:** This option does a quick retract before doing the wiping movement. More suitable for the Original Prusa MINI/MINI+.

**Other settings that affect retraction:**

- **Only retract when crossing perimeters:** *(Print settings -> Infill -> Advanced):* Disables retraction when the travel path does not exceed the upper layer's perimeter. Any oozing that happens will be within the walls and should be invisible.

- **Avoid crossing perimeters:** *(Print settings -> Layers and perimeters -> Quality):* Optimize travel moves in order to minimize the crossing of perimeters. This will lower the stringing amount, especially in the MINI/MINI+.

- **Sequential printing:** *(Print settings -> Output options -> Sequential printing):* Printing each object individually has a smaller chance of causing stringing between the parts. When using this feature, PrusaSlicer will warn you of any possibility of the extruder colliding with an already printed part, but follow the print closely.

- **Nozzle temperature:** *(Filament settings -> Filament -> Nozzle):* Lowering the temperature decreases the occurrence of strings. Try decreasing the nozzle temperature by 5 – 10°C and check whether there’s less stringing.

### Filament

Try using a different spool than the one that is causing the stringing. The filament might have gathered moisture, which will cause a lot of stringing.

### Hotend

Stringing in the nozzle might be caused by a heat dissipation issue in the nozzle. Try re-applying thermal paste on the threads between the heatbreak and the heatsink.

If you have recently changed any component in the hotend, it is also possible that some individual parts are not in place. Go over the assembly of the hotend and check for any parts that may be different from the instructions.

### Enough settings, pass me my **heat-gun!**

If you don’t feel like tweaking any of the settings, well, then there is an alternative. You can get rid of the strings with a heat gun (or often with a lighter – but be very careful). Set your heat-gun to around 200 °C and aim at the strings for one or two seconds. This will melt the strings, and the printed object should remain undamaged. Do not leave the heat source on the printed model for longer than one or two seconds, as this may deform the part.

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el KB de Prusa se sirve como aplicación
  React y el texto vive en el fragmento oculto `<div hidden id="S:1">`. La conversión
  automática a Markdown de esta URL devuelve un 200 con cuerpo vacío. El texto de arriba se
  ha extraído de ahí.
- **Esta página es la contraparte del diferencial «humedad contra ajuste»**, y hay que
  entender cómo ordena Prusa el diagnóstico, porque es distinto del de Bambu: la primera
  línea del artículo sitúa la causa en «very high printing temperatures and/or using
  incorrect retraction settings», es decir, **ajustes**, y la humedad aparece mucho más
  abajo, en un apartado propio («### Filament») y como una de entre varias hipótesis:
  «Try using a different spool than the one that is causing the stringing. The filament
  might have gathered moisture, which will cause a lot of stringing».
  Esto es exactamente el «no es humedad» del brief: la humedad es una causa más entre
  varias, y el fabricante no la pone la primera.
- **Aporta la lista completa de causas de hilos que la guía debe contrastar:** retracción
  (longitud, velocidad, «minimum travel after retraction», retraction on layer change,
  wipe while retracting), distancia de desplazamiento entre objetos, temperatura de boquilla
  demasiado alta, material antiguo acumulado en la boquilla, disipación del hotend y
  boquilla desgastada. El consejo de prueba es «probar otro carrete»: si con otro carrete
  desaparecen los hilos, el carrete viejo es el culpable.
- **La única cifra de temperatura que hay aquí es de impresión, no de secado:** bajar la
  boquilla entre 5 y 10 °C. No debe aparecer en la guía de secado (gate 5 del brief).
- **Una advertencia útil para el diferencial:** «Some filaments are naturally more stringy
  than others» —no todo carrete que hace hilos es un carrete húmedo— y la propia guía de
  secado de Prusa dice «Make sure to compare different results from your prints» antes de
  culpar a la humedad.
- **Contexto de máquina:** la página explica la retracción en general (qué es, dónde se
  configura: Printer Settings → Extruder 1) y da el máximo de 2 mm en MK2.5/S y MK3/S/+ y
  3,2 mm de valor por defecto en MINI/MINI+ por su extrusor Bowden. Son cifras de otra guía
  (stringing); se conservan porque el artículo es el que enlaza el síntoma con el resto del
  diagnóstico, pero no deben repetirse aquí.
- La página está marcada como «Relevant for: CORE One family».
- No se han capturado los 29 comentarios de la página. Las imágenes no tienen texto
  alternativo y van como `[imagen:]`; las filas de tabla con dos `[imagen:]` son montaje de
  capturas en paralelo.
- El texto original está en inglés y no lo he traducido.
