---
titulo: "First Layer Calibration (i3)"
url: https://help.prusa3d.com/article/first-layer-calibration-i3_112364
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

# First Layer Calibration (i3)

Relevant for
MMU family

MK3 family

MK3.5 family

OLD PRODUCTS

200 comments

Article is also available in following languages
[imagen: English]

[imagen: Čeština]

[imagen: Polski]

[imagen: Deutsch]

[imagen: Français]

[imagen: Español]

[imagen: Italiano]

[imagen: 日本語]

The First Layer Calibration is used to calibrate the distance between the tip of the nozzle and the print surface. The aim is to adjust the nozzle height until the extruded plastic sticks nicely to the bed and you can see that it is being slightly squished.

The printers assembled in the Prusa factory are already fine-tuned and this calibration is needed only in case you build the kit version at home or change the nozzle. The First Layer Calibration is part of the Wizard (last step of the XYZ-Calibration). You can also recalibrate the first layer later on from the LCD-menu - Calibration - First Layer Calibration . During this process, rotate the knob to manually adjust the distance between the nozzle and the bed, while the printer is printing a zig-zag pattern.

As each type of sheet (smooth, satin, and textured) has a different thickness you must use a different First layer calibration for each of them. For this, we have a convenient feature called Steel sheet profiles .

With a newly assembled printer, you will start at zero and move into a negative (-) value, reducing the distance between nozzle and heat bed. The initial zero-value is set by the P.I.N.D.A./SuperPINDA. position. Turn the knob counter-clockwise to bring the nozzle closer to the bed and moving the value away from zero. The value is unique to each printer and it may also slightly change with time and use. You must, therefore, check visually when adjusting the height, not by a set value.

[imagen: ]

The first layer calibration being set incorrectly can lead to various issues. With the nozzle too far from the print surface, you risk your print not sticking properly, which can result in a blob . On the other side, if set too close, you can experience extrusion problems and clogging and poor print quality, or even damage to the hardware, like the Flexible steel sheet due to the print sticking too much. It is therefore important to get this right.

[imagen: ]

Before you proceed, make sure that the print surface (satin, smooth, or textured steel-sheet) is clean. You can find information on how to clean it in PEI print surface preparation . There are some small differences between how it should look on the textured and smooth steel sheet. We will, therefore, present pictures and guidelines for both, starting with the smooth sheet.

Turn the knob counter-clockwise to bring the nozzle closer to the bed.

## Smooth sheet

## Too high

You want the line flattened, but not squished. On the square at the end of the test line, you do not want any gaps between the lines ( left picture ), which means it is too high. In that case, the value will be too close to zero

## Too low

If the nozzle is set too low ( right picture ) you will see the line squished completely flat and the end square will have ridges between the lines, which is a clear sign it is set too low and the value will be too far away from zero. When it is too low, the edges of the square can also start curling upwards. In the extreme, the filament will be spread so thin you will be able to see through the printed filament, leading to clogging of your hotend.

Having the nozzle too low can cause the nozzle to damage your steel sheet. This is not covered by Warranty .

## Just right

A correct adjustment will show you an even surface ( center picture ), with no gaps between lines, nor ridges. As stated, the numeric value depends on the exact position of the P.I.N.D.A./SuperPINDA sensor, which will be unique to each machine and means nothing without a visual reference. However, a common range is from -0.400 to -1.500.

[imagen: ]

Adjusting it closer can in some cases improve adhesion. However, if you are having problems with adhesion, but your first layer calibration looks like the 'good' picture ( center picture ), your problem lies somewhere else, like a dirty/greasy sheet, print-settings, bed leveling/XYZ calibration, or under-extrusion.

[imagen: ]

You can not use the same first layer calibration if you swap between the Smooth and the textured sheet! For more information, please see Steel sheet profiles .

## Textured sheet

The textured sheets are thinner than the sheets with smooth PEI, therefore you need to move the nozzle bit closer, but you are seeking the same results as with the smooth sheet. Again, if it is set too low ( right picture ) the filament can start curling up around the edges like it is not adhering. The numeric value will be too far from zero and must be adjusted back.

If set too high, you will see the line being round, and have gaps between the lines of the end-square. In this case, the value will be too close to zero.

[imagen: ]

## Have a look at the nozzle

A single layer is about 0.2 mm / 0.00787402 inch. Having a look at the nozzle and its distance to the sheet can also be helpful. However, measuring the printed layer with calipers is not a recommended method to calibrate the first layer.

[imagen: ]

## When to run the First layer calibration

Generally, the first layer calibration should be performed every time there is a major change in the assembly. This includes changing the nozzle, extruder upgrades, or other updates to any axis. You should also run all calibrations if you move the printer to a different location.

For First Layer Calibrations with other nozzle diameters than 0.4 mm, please see this article

## Other issues

- If the width of the line varies across its length, you may have to do some Bed Level Correction .

- If the nozzle comes in contact with the bed, the SuperPINDA/P.I.N.D.A. leveling sensor is not being triggered by the flexible steel sheet and must be physically moved lower in its holder. This will bring it closer to the level of the nozzle tip. You should make sure it is adjusted as instructed in the Preflight check in the Assembly manual. If you move the leveling sensor you must redo the First layer calibration.

## Notas del recolector

- **Es la guía del i3 (MK3/MK3S/MK3.5), no de los modelos actuales.** El campo
  «Relevant for» sólo lista MMU family, MK3 family, MK3.5 family y OLD PRODUCTS. El
  procedimiento que describe es girar una **perilla en el LCD** mientras la impresora
  imprime un zigzag, y no existe en MK4, MK3.9, XL ni CORE One. Este dato no lo da la
  página: sale de leer la lista de modelos y de leer 91 comentarios del pie, entre ellos
  uno que dice literalmente «"First Layer Calibration" does not exist on CoreOne». Quien
  cocine esto tiene que decidir si eso entra o no, porque el artículo del wiki no lo dice.
- **El diagnóstico es visual sobre una línea de prueba, no un ajuste.** Los tres estados
  (too high / too low / just right) se distinguen por la línea y por el cuadrado del final:
  sin huecos entre líneas, con surcos entre líneas, o superficie lisa. La página da
  rangos (de -0.400 a -1.500) sólo como referencia y avisa dos veces de que el valor es
  único por máquina y que hay que mirar, no fijar un número.
- **Cifras:** rango común de -0.400 a -1.500; una capa «about 0.2 mm / 0.00787402 inch»;
  boquilla de 0,4 mm como diámetro por defecto. **Prohíbe explícitamente calibrar la
  primera capa midiendo con calibre.** No da ninguna temperatura.
- **La frase más útil para el tema es la del párrafo «Adjusting it closer…»**: si la
  calibración de primera capa se ve correcta y aun así no pega, la propia Prusa dice que
  el problema está en otro sitio y enumera cuatro: hoja sucia/con grasa, print-settings,
  bed leveling / calibración XYZ, o under-extrusion. Es una lista de derivación, no un
  orden.
- **«Print-settings» y «under-extrusion» quedan fuera del alcance del brief** y esta página
  no los desarrolla: enlaza a otras, que no se han descargado.
- Menciona también el caso de la boquilla tan baja que **el curl de los bordes «can also
  start curling upwards»**, que es un síntoma distinto del lift de una esquina.
- Los enlaces internos (Steel sheet profiles, PEI print surface preparation, Bed Level
  Correction, Warranty, Preflight check) **no se han descargado**: quedan como texto.
- Las imágenes no tienen `alt`, así que van como `[imagen:]` sin descripción. Eso deja sin
  resolver las referencias del texto a «left picture», «center picture» y «right picture»:
  **el artículo es incomprobable sin sus fotos**, y su valor está en ellas.
- La cabecera («Relevant for», «200 comments», «Article is also available in following
  languages») es mobiliario de página, no contenido. Se conserva porque es lo que extrae la
  página, y para que el cocinero sepa que puede tirarla.
- **Los 200 comentarios del pie no se han capturado**: el cuerpo extraído termina en el
  formulario de valoración. Los comentarios visibles son ruido y ninguno tiene datos
  verificables.
- El texto original está en inglés y yo no lo he traducido.