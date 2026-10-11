---
titulo: "Mesh bed leveling"
url: https://help.prusa3d.com/article/mesh-bed-leveling_112163
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

# Mesh bed leveling

Relevant for
MK4 family

XL family

MMU family

MINI family

MK3 family

+

50 comments

Article is also available in following languages
[imagen: English]

[imagen: Čeština]

[imagen: Polski]

[imagen: Deutsch]

[imagen: Français]

[imagen: Español]

[imagen: Italiano]

[imagen: 日本語]

The Original Prusa FDM printers have a sensor to detect distance from the print surface. During a calibration, and before each print, the sensor will go through a number of points, in a grid pattern, spread across the build-plate (whether it is a powder-coated or smooth PEI sheet does not matter), and measures the distance to the sheet. These points are interpolated and used to create a virtual mesh of the bed. During printing, if the bed is slightly warped, the sensor will still precisely follow the surface according to its measured mesh

[imagen: ]

## Original Prusa MK2/S, MK2.5/S, MK3/S/+

These printer models up to MK3S are equipped with a PINDA sensor, while the MK3S+ and MK3.5/S are equipped with a SuperPINDA sensor.

The StallGuard for the Z-axis is active during the mesh bed leveling. In case the nozzle crashes into the bed before the PINDA/SuperPINDA sensor triggers, the calibration process is interrupted and the user is asked to check the nozzle for any kind of debris.

## Mesh bed leveling settings

This feature is available starting from firmware 3.7.0.

The Mesh bed leveling settings can be found within Settings - Mesh bed Leveling , on the LCD menu. There you have the following options:

- Mesh (3x3 - 7x7)

- Z-probe nr. (1 - 3 - 5)

- Magnet comp. (ON / OFF)

Mesh: The default grid density is 3x3 (9 points). However, if you still experience uneven first layer adhesion, you can increase the density in Settings - Mesh bed leveling - Mesh to 7x7 (49 points).

Z-probe nr.: Changing the Z-sensor nr. you change how many times will each point be measured. We suggest either 3 or 5 measurements per point since the final value is calculated as an average value. Changing these settings affects how long will the Mesh bed leveling procedure takes to complete.

Magnet comp.: With 7x7 Mesh bed leveling, you can choose whether or not to use Magnets compensation. 3 of the 49 points are so close to magnets, that the reading can be off by as much as 80μm (microns). Magnet compensation ignores readings from these 3 points and calculates them from the surrounding points. We suggest leaving this function on.

## Enforcing the Z-calibration

If the mesh bed leveling is interrupted during the procedure, before a print, a message will appear on the screen stating "Enforcing the Z-calibration" and the printer will re-home and run through the procedure again. This can occur if there is debris on the nozzle pushing the bed down when probing, or if you touch and press the bed while it is probing. This will bring the deviance above a certain threshold and it will simply make another attempt to run the Mesh Bed Leveling. This is to avoid starting it from the menu again if the problem was simply an accident. If the problem remains, it will repeat this procedure three times before canceling the print.

## Troubleshooting

Please see our dedicated article P.I.N.D.A./SuperPINDA Sensor testing to resolve any issue.

## Original Prusa MINI/+

The Original Prusa MINI is equipped with a M.I.N.D.A. sensor, while the Original Prusa MINI+ is equipped with a SuperPINDA sensor. The grid density is 4x4.

## Troubleshooting

Please see our dedicated article M.I.N.D.A./SuperPINDA sensor testing (MINI/MINI+) to resolve any issue.

## Original Prusa MK4/S, MK3.9/S, XL

The Original Prusa MK4/S , MK3.9/S , and XL are equipped with a LoadCell , to detect that the nozzle is close enough to the steel sheet for printing, and to avoid damage that would be caused by the nozzle digging into the steel sheet.

Before a print, the nozzle will check the distance to the print sheet in several places to create a virtual height map of the surface. The points are measured within the area of the chosen print.

## Notas del recolector

- **Una sola página, tres máquinas distintas**, con tres mecanismos que no son el mismo:
  PINDA/SuperPINDA (MK2/S a MK3.5), M.I.N.D.A./SuperPINDA en MINI (rejilla 4x4) y
  **LoadCell** en MK4/MK3.9/XL. Los apartados «Mesh bed leveling settings» y «Enforcing the
  Z-calibration» están dentro del bloque de los modelos con PINDA, y el bloque de LoadCell
  **no da ruta de menú ni opciones**: describe otro sistema. Quien cocine esto tiene que
  decidir a qué máquina aplica cada cifra; la página no lo separa de otra manera.
- **Cifras y valores que da:** rejilla por defecto 3x3 (9 puntos), opción hasta 7x7 (49
  puntos), Z-probe nr. 1 / 3 / 5, lectura desviada hasta **80μm** en 3 de los 49 puntos por
  los imanes, rejilla 4x4 en MINI, firmware 3.7.0 como mínimo para los ajustes de malla.
- **La afirmación directamente aplicable al tema es una sola**: «if you still experience
  uneven first layer adhesion, you can increase the density […] to 7x7 (49 points)». Es un
  recurso cuando el WL adhesion es **irregular**, no cuando la pieza se levanta por una
  esquina. La distinción importa y la hace el texto.
- Da una **causa concreta de calibración fallida**: residuo en la boquilla que empuja la
  cama al sondear. Los dos sitios donde lo dice son el apartado del PINDA (StallGuard
  interrumpe y pide revisar la boquilla) y «Enforcing the Z-calibration», que además
  explica el otro disparador: **tocar y presionar la cama durante el sondeo**, y que el
  procedimiento se repite hasta tres veces antes de cancelar la impresión.
- **No aparece por ningún lado Z-level, Live Adjust Z ni First Layer Calibration.** Para
  eso esta página remite a artículos que no se han descargado («P.I.N.D.A./SuperPINDA
  Sensor testing», «M.I.N.D.A./SuperPINDA sensor testing (MINI/MINI+)», y desde la otra
  página Bed Level Correction). Los enlaces quedan como texto.
- El único warp de cama que aparece es el del primer párrafo, «if the bed is slightly
  warped, the sensor will still precisely follow the surface according to its measured
  mesh». Eso es **warping**, y queda fuera del alcance del brief. No se ha recortado nada.
- La cabecera («Relevant for», «50 comments», «Article is also available in following
  languages») es mobiliario de página. Se conserva, y para que el cocinero sepa que puede
  tirarla. La lista de comentarios no se ha capturado.
- El texto original está en inglés y yo no lo he traducido.