---
titulo: "First Layer Not Sticking: Causes and Solutions"
url: https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-04
autor: Bambu Lab
idioma: en
---

# First Layer Not Sticking: Causes and Solutions

## ¶ First layer not sticking to the plate

[imagen — first_layer_not_sticking_to_the_plate.jpg]

[imagen — fingerprints.jpg]

## ¶ Potential causes and solutions

## ¶ 1. Incorrect plate type selected

First layer adhesion issues could be related to incorrectly selecting the plate type in Bambu Studio.

The same material is usually printed at different heatbed temperatures depending on the build plate. Selecting the wrong build plate type may result in insufficient adhesion, because the heatbed temperature used for printing is too low. In addition, since the Textured PEI Plate has a granular surface, the printer lowers the nozzle by 0.04 mm after heatbed leveling to ensure first-layer adhesion. If you print on a Textured PEI Plate but select a different build plate type when slicing, the nozzle height will be too high, which affects first-layer adhesion.

Selecting the correct plate type according to the filament used, while also ensuring the plate is clean before starting a print will give you the best chances of success when printing.

[imagen: change_build_plate_bambu_studio.gif — change_build_plate_bambu_studio.gif]

## ¶ 2. Plate has not been washed before starting a print

We strongly recommend to wash the plates with hot water and detergent before printing to remove any debris or contaminants, and avoid touching the surface.

This solution solves most issues related to adhesion, as long as the right settings are used for the materials you are trying to print, and the correct plate type has been selected in the slicer.

In some cases, applying Bambu Lab Glue to the build plate is recommended to improve adhesion and increase print success, such as when printing non-PLA materials on the Smooth PEI build plate. For more details on using glue, please refer to: How to Use Bambu Lab Glue .

## ¶ 3. Bed leveling calibration has not been performed

In some rare cases, the bed leveling from previous calibrations might be inaccurate leading to inconsistent adhesion to the plate.

If you encounter issues with the quality of the first layer, we recommend performing a bed leveling calibration from the calibration menu after ensuring the nozzle tip is clean and free of any debris.

We also strongly recommend to keep the Bed Leveling Calibration option turned on when starting a print, for the highest chances of success.

[imagen — bed_leveling_turned_on.png]

## ¶ End Notes

We hope that the detailed guide we shared with you was helpful and informative.

If you have any concerns or questions regarding the process described in this article, we encourage you to reach out to our friendly customer service team before starting the operation. Our team is always ready to help you and answer any questions you may have.

Click here to open a new ticket in our Support Page - We will do our best to respond promptly and provide you with the assistance you need.

## Notas del recolector

- Es una lista de **tres causas numeradas**, no un árbol de diagnóstico. El artículo no
  dice en qué orden comprobar, ni qué resultado esperado tiene cada comprobación. El
  orden 1-2-3 es el orden de la lista, y no hay nada en la página que indique que sea un
  orden de trabajo.
- La sección «First layer not sticking to the plate» **no tiene texto**: sólo las dos
  imágenes. Lo que se ve en ellas es el síntoma del que habla el artículo.
- **Cifras que da:** sólo el descenso de 0,04 mm de la boquilla en la Textured PEI Plate
  tras el bed leveling. **No da ninguna temperatura**, ni de cama ni de hotend, ni ningún
  valor de Z-offset, ni de caudal. La afirmación «the same material is usually printed at
  different heatbed temperatures depending on the build plate» va sin cifras.
- Dice que lavar la placa «solves most issues related to adhesion», **condicionado** a que
  los ajustes sean los correctos y el tipo de placa esté bien elegido. La condición es
  parte de la frase y no se puede citesar la primera mitad sola.
- Menciona el Bambu Lab Glue sólo para «non-PLA materials on the Smooth PEI build plate».
  Remite a otra página («How to Use Bambu Lab Glue») que no se ha descargado.
- No aparece autor individual ni fecha de última actualización en el cuerpo extraído.
- El símbolo `¶` delante de cada título es un artefacto del CMS de la wiki de Bambu
  (ancla de encabezado). Se conserva tal cual, no es parte del texto.
- Las imágenes se han sustituido por su nombre de archivo. El artículo es visual: casi
  todo el valor está en las fotos, y eso no se puede citar.
- El texto original está en inglés y yo no lo he traducido.