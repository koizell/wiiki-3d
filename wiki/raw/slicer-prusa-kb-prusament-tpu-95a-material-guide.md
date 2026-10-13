---
titulo: "Prusament TPU 95A material guide | Prusa Knowledge Base"
url: https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653
sitio: help.prusa3d.com
tipo: fabricante
capturado: 2026-10-13
autor: Prusa Research
idioma: en
---

# Prusament TPU 95A material guide

Relevant for

XL
MK4
MK4S
CORE One
MK4 family

Prusament TPU 95A is a flexible material with high mechanical resistance and
print reliability. Although it's one of the easiest flexible materials to print,
it still requires some print preparations. This article sums up printer
requirements, recommended sheets, correct surface preparation, and some basic
troubleshooting.

Learn more about this material and its properties in the announcement article.

## Print settings

Nozzle temperature: 220-240 °C

Heatbed temperature: 55-75 °C

You can find print profiles for this material in PrusaSlicer.

## Printer requirements

All our printers with the Nextruder can be used with little to no tweaking. We
prepared profiles for Core One, XL, MK4S, MK4, and Prusa Pro HT90 (see profiles
in PrusaSlicer). Other printers (MK3S+ and older) are compatible as well,
however, print profiles may be missing and some tweaking (such as loosening the
idler) might be required.

When printing on the Original Prusa XL, you may struggle to feed the printer
with TPU through the filament sensor on the side. It is recommended to unplug
the PTFE tube from the sensor and feed the filament directly into the tube.

It may also be difficult to feed the filament through the PTFE tube on the Prusa
Core One. If you find any difficulties doing this, we recommend unplugging the
PTFE tube on the Nextruder side, pushing the filament through, then pushing it
manually through the filament sensor, and plugging the tube again.

If you print with a high flow nozzle in an enclosure, leave the enclosure door
open. Opening the ventilation grill on the Core One is sufficient.

It is recommended that you use a filament guide on your printer (MK4, MK4S) to
keep the filament slightly tightened during the print.

## Recommended sheets and correct print surface preparation

PA Nylon sheet: The most recommended print surface. Clean the surface with water
as described in the handbook or this article.

Satin sheet: The most recommended print surface. Clean the surface with IPA as
described in the handbook or this article. Larger models may require a brim
and a slightly raised nozzle and heatbed temperature.

PP sheet: Recommended print surface. The adhesion is slightly higher than with
the satin sheet. Clean the surface with IPA as described in the handbook or this
article.

Textured sheet: Recommended print surface. Clean the surface with IPA as
described in the handbook or this article. Note that adhesion to this print
sheet might be too strong. If you struggle to remove the model after printing,
you may heat the sheet to 40 °C and remove the model using a spatula.

Smooth PEI sheet: Not recommended. If you decide to print with this sheet, be
sure to apply a separation layer (glue stick). Otherwise, the adhesion is too
strong and removing the print will damage the sheet.

## Drying before printing

Drying is usually not necessary. However, under some conditions (typically poor
storage), material can eventually absorb moisture and print issues might occur.
In that case, we recommend drying for at least 4 hours at 60 °C and storing the
filament in a drybox.

## Troubleshooting

Filament entanglement: If the filament entangles and gets stuck in the gears,
try loosening the idler screws by 1,5 spins.

Stringing: If the stringing occurs, try drying the filament as described above.

Nozzle clogging: There may be several reasons for nozzle clogging. We suggest
making sure your nozzle is clean and filament dry. If the problem persists, you
may try loosening the idler, raising the temperature and lowering the fan speed.
Also, when the filament is loaded into the extruder for a long time between the
prints, it may eventually deform. Simple unloading and loading the filament
would resolve this issue.

Skipped layers: The nozzle got clogged at some point. Deal with it as you would
deal with a clogged nozzle.

Filament doesn't stick on the print surface: Degrease the print surface as
described in the handbook and here. If the problem persists, try printing with a
brim and consider increasing the heatbed temperature.

Bubbles in the filament: These are usually caused by the moisture inside the
filament. Dry the filament and check the nozzle temperature. If it's too high,
lower it a little.

Poor bridging performance: Try to increase dynamic overhang speed for 0%
overlap. This setting can be found in PrusaSlicer / Print Settings / Speed. This
is only visible when in PrusaSlicer Expert Mode.

## Notas del recolector

- **Comprobación:** HTTP 200, 1.183.234 bytes de HTML, 14.100 caracteres de
  texto extraído. No es una cáscara.
- **Errata mía, corregida:** al cortar la primera línea a 80 columnas partí
  «troubleshooting» y dejé la palabra ilegible. Está corregida. Se menciona
  aquí porque el corte a 80 columnas puede romper palabras y quien cocine
  conviene que lo sepa.
- Es la fuente del brief que sirve de puente con `material` y
  `temperatura-cama`. Las dos cifras que sostienen la conexión son literales:
  **boquilla 220-240 °C** y **cama 55-75 °C**.
- **Esto es relevante y hay que dejarlo claro:** el propio fabricante del
  filamento y del slicer remite al slicer para los valores
  («You can find print profiles for this material in PrusaSlicer»), es decir,
  la tabla del artículo y el perfil del slicer son el mismo dato en dos sitios.
  Si la guía habla de un temperatura concreta, esta fuente la respalda.
- Contradicción de rango frente a otras tablas del repo: las tablas de PLA de
  Bambu y Orca dan cama 50-60 °C, y esta guía de un material flexible da
  55-75 °C. No es la misma comparación (material distinto), pero quien cocine la
  sección de `material` tiene ambas.
- La ruta «PrusaSlicer / Print Settings / Speed» y la condición «only visible
  when in PrusaSlicer Expert Mode» son literales, y sostienen que la
  visibilidad de un parámetro depende del modo del slicer.
- He omitido el menú, el bloque de idiomas y los 14 comentarios. El enlace
  «in the announcement article» y los «as described in the handbook or this
  article» no dejan URL legible en el HTML servido; **no los he resuelto**.
- No se ha traducido nada.
