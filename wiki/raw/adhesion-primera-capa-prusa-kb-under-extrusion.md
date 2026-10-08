---
titulo: "Under-extrusion"
url: https://help.prusa3d.com/article/under-extrusion_2007
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

# Under-extrusion

Relevant for

MK2.5

MK2.5S

MK3

MK3S

MK3.5

+

21 comments

Article is also available in following languages

[imagen: English]

[imagen: Čeština]

[imagen: Polski]

[imagen: Deutsch]

[imagen: Français]

[imagen: Español]

[imagen: Italiano]

[imagen: 日本語]

You can recognize under extrusion when there is material missing in your print’s layers. Printed objects with under extruded layers can be fragile and tend to break apart. There could be several causes to under-extrusion and you should also think if you recently did any changes to your printer (or perhaps no maintenance for a long period), as you might find the culprit there.

*[imagen:] Example of severe under extrusion (left cube) and a normal print (right cube).*

**Common factors in under extrusions are:**
- First layer calibration too close
- Slicer settings
- Nozzle
- Extruder gears
- Insufficient hotend cooling
- Filament

### First layer calibration too close

Make sure you have performed the First Layer Calibration correctly. Avoid compensating for a lack of adhesion by squishing the first layer too much. If the nozzle is too close to the build plate, the filament can be obstructed from pushing through. We recommend running the first layer calibration every time you move the printer to a different location or do maintenance on the hotend, like changing the nozzle. Moreover, when you swap the steel sheet from the textured one to the smooth one you must recalibrate due to the sheet's different thickness. That is why we introduced the Steel sheet profiles.

### Slicer settings

Each profile in the PrusaSlicer contains settings that determine temperature, speeds, and how much filament the 3D printer should extrude. The printer does not provide any feedback on how much filament actually leaves the nozzle. It can be that less filament is extruded than the firmware expects. If that happens, you may notice gaps in and/or in between printed layers.

Make sure you have set up your printer in PrusaSlicer by running the Configuration Wizard and as a starting point you should use the stock filament profiles which are tailored for your machine, filament type, and nozzle size.

### Nozzle

If you had the nozzle removed from the hotend at some point, make sure it has been correctly reinstalled. Please see the dedicated guide for your hotend:
- Changing or replacing the nozzle (MK2.5/S, MK3/S/+, MK3.5/S)
- Changing/replacing the nozzle (MINI)

Incorrect installation can cause both clogging and leaks. The nozzle must be tightened when heated and there must be a gap between the nozzle and the heater block. Also, inspect the extruder and hotend for any damage, like the heater element or thermistor's wires or a bent heatbreak (only on V6 hotend).

[imagen:]

[tip-callout]
If the installation of the nozzle is correct, then performing a **Cold pull** will often resolve a clog.
[/tip-callout]

#### Using specialty nozzles

If you are using specialty nozzles like hardened steel or stainless steel, etc., you may have to increase the nozzle temperature when printing, usually within a range of 5-10 °C. Steel has different thermal properties compared to a brass nozzle, which can affect print results, mainly the inter-layer adhesion. But remember that higher temperatures can also lead to increased stringing. If the issue persists, try replacing the nozzle with the original 0.4mm brass nozzle and see if it makes a difference.

Furthermore, not all nozzle sizes will be suitable for all filaments. Filament that contains particles of wood or metal will most often be unsuitable for nozzles with a diameter below 0.4, and some will require an even larger nozzle, like 0.6 mm or 0.8 mm. For more information, please see Different nozzle types.

[note-callout]
**A 0.1 mm nozzle can be considered experimental**; Its small diameter will not work with all filaments, the tolerances required in its manufacturing are hard to guarantee and the excessive printing time it requires can be beyond reasonable. For these fine resolutions, you may want to consider SLA printing.
[/note-callout]

### Extruder gears

Check both Bondtech gears for any dirt or misalignment so they are able to push filament through. Please see Checking/re-aligning the Bondtech gear (MK3S/MK2.5S) for details.

Additionally, make sure that your printer’s extruder idler is at the correct tension. Having the idler screw too loose or too tight can cause under extrusion.

[TABLA DE DOS COLUMNAS: UNA IMAGEN EN CADA COLUMNA, SIN TEXTO]

### Insufficient hotend cooling

Controlling the "melt-zone" of the filament is very important. With insufficient cooling, the filament can start melting too far away from the nozzle. Check that your extruder fan is installed in the correct orientation and whether the fan is blocked by a piece of filament or some other debris.

[note-callout]
Unless you have turned off "Fan check", the printer will give an error if it detects if either fan is not spinning when it should (hotend fan or print fan).
[/note-callout]

If you are using your printer in an enclosure, make sure the temperature inside is not too hot, as overheating can result in Heat creep, where the filament will start melting before it reaches the nozzle

*[imagen:]*

*Example of a blocked fan by a strand of filament.*

[tip-callout]
The hotend fan will always spin if the nozzle is heated above 50 °C.
[/tip-callout]

### Filament

Too low or too high printing temperature can cause print issues as well. If your filament brand and type is not listed in PrusaSlicer, you can try to adjust the print temperature by +/- 5-15°C to see if this resolves the issue.

Some specialty materials, like Flexible materials, may require many adjustments and tweaks to print them successfully. Composite materials, like Woodfill filament, may require at minimum a 0.6 mm nozzle, and 0.2 mm layer height to prevent clogging. If there are composite materials like kevlar or carbon fiber, a hardened nozzle is required.

[tip-callout]
Be sure to see our extensive material table, where most types of filament and their considerations are covered.
[/tip-callout]

Some filaments can also have a varying thickness, due to quality or infused materials like wood, which will cause unexpected changes in the volume of extruded filament. The industry standard of variations in diameter is +/- 0.05 mm.

Keep your filament dry, free of moisture because damp filaments have a negative impact on printing, especially soluble filament, PETG, and ABS. We highly recommend putting spools back inside their original bag when it’s not in use, along with a silica gel. We recommend storing your filaments in a dry area or ideally in a “dry box”.

#### Incorrect loading/unloading

When loading a new filament with a lower specified temperature, preheat the nozzle to the temperature required by the previous filament type you have used. In other words, always the highest temperature filament, as its remnants are most likely still in the hotend. For example, **if you have printed with ABS or PETG and want to print with PLA now, load the PLA filament at the ABS or PETG temperature.** This way, the newly introduced filament can push the old one out.

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo, porque afecta a las otras dos páginas de
  este lote.** La conversión automática a Markdown de esta URL devuelve el titulo, el indice
  de contenidos y el pie, pero **el cuerpo del articulo sale vacio**. No es que la
  pagina sea un aviso sin contenido: el HTML servido si lleva el texto entero, dentro de un
  fragmento con la carga de datos de React (`<div hidden id="S:1">`), que el conversor
  descarta porque no forma parte del arbol renderizado. El texto de arriba se ha extraido de
  ahi. Las tres URLs de este lote responden 200 con cuerpo real; conviene no confiar en una
  conversion vacia como prueba de pagina vacia.
- **Alcance respecto al brief.** De los seis factores que enumera la pagina, **solo el
  primero es del tema `adhesion-primera-capa`**: «First layer calibration too close». Los
  otros cinco (ajustes del slicer, boquilla, engranajes del extrusor, refrigeracion del
  hotend y filamento) son fallos de extrusion, y el brief deja los fallos de extrusion
  general **fuera de alcance**. Se conservan integros porque la pagina es la que enlaza el
  caso de adhesion con el resto, y porque el indice es util para el diagnostico diferencial.
- **Lo que dice la seccion de adhesion, y es la parte que cierra el hueco:** la pagina
  advierte de compensar la falta de adhesion «squishing the first layer too much», y de que
  con la boquilla demasiado cerca «the filament can be obstructed from pushing through». Es
  decir:_prusa_ presenta una adhesion mala puede **no** ser un problema de adhesion, sino una
  primera capa apretada de mas. Tambien recomienda recalibrar al mover la impresora o al
  hacer mantenimiento del hotend, y al cambiar de chapa texturizada a lisa.
- **El orden es de la fuente y es un orden, no una equivalencia:** la adhesion va primera en
  la lista de «Common factors», pero la lista se titula «common factors», no «first check
  this». La pagina no dice que haya que comprobar la adhesion antes que el resto.
- **Los enlaces se han reducido a su texto.** La pagina enlaza, entre otros, a
  `/article/steel-sheet-profiles_1955` («Steel sheet profiles»),
  `/article/configuration-wizard_1754`, `/article/different-nozzle-types_2193`,
  `/article/idler-screw-tension_177367`, `/article/cold-pull-mk3-s-mk2-5-s-mk3-5-s_2075` y
  las dos guias de cambio de boquilla. Los destinos no sobreviven en el fichero; el texto
  visible si.
- **Los recuadros van etiquetados `[tip-callout]` y `[note-callout]`,** con la etiqueta
  exacta que lleva el atributo `type` del elemento en el original. Distinguir «tip» de
  «note» es parte del texto de Prusa, no una decision mia. El texto del recuadro va entre
  `[...]` y `[/...]`.
- **Hay una tabla que no es una tabla de datos.** Entre «Extruder gears» y «Insufficient
  hotend cooling» hay un `<table>` de dos columnas, con una imagen en cada celda y ningun
  texto; es montaje de dos capturas en paralelo. Las dos celdas ocupan 48,799 % cada una.
  Las imagenes no tienen `alt`, asi que se marca el hueco en vez de inventar una descripcion.
- **Erratas y rarezas del original, conservadas:**
  - «Common factors in under extru» + «sions are:» viene partido en dos etiquetas `<strong>`
    en el HTML. El texto renderizado es «under extrusions» y asi se ha escrito.
  - «print's layers» y «thermistor's wires» llevan apostrofo recto en el HTML original
    (`&#x27;`), mientras que el resto del texto usa comilla tipográfica (`’`). Se han
    dejado tal cual.
  - «in and/or in between printed layers» repite «in».
  - La frase sobre el enclosure termina **sin punto**: «...before it reaches the nozzle».
- **Cifras, con su unidad tal cual viene (el original es inconsistente en el espacio):**
  - «a range of 5-10 °C» (boquillas de acero endurecido o inoxidable).
  - «the original 0.4mm brass nozzle» — **sin espacio**; y en la frase siguiente,
    «a diameter below 0.4», **otra vez sin espacio y sin unidad**.
  - «0.6 mm or 0.8 mm», «a 0.6 mm nozzle, and 0.2 mm layer height».
  - «+/- 5-15°C» (sin espacio y con el signo mas separado) y «+/- 0.05 mm».
  - «The hotend fan will always spin if the nozzle is heated above 50 °C».
  - «A 0.1 mm nozzle can be considered experimental».
- **La cabecera «Relevant for» es una lista de productos antiguos:** MK2.5, MK2.5S, MK3,
  MK3S, MK3.5 y «+». No incluye MK4, MK4S, XL ni CORE One. La pagina esta en la categoria
  «Print Quality Troubleshooting». Que no liste las maquinas actuales no significa que no
  aplique a ellas: solo significa que la etiqueta no se ha actualizado.
- Los recuadros y la tabla son las únicas zonas donde he marcado la estructura; el resto es
  el texto tal cual.
- La lista de los 21 comentarios no se ha capturado. Las imagenes no tienen `alt` y van como
  `[imagen:]`.
- El texto original esta en ingles y yo no lo he traducido.
