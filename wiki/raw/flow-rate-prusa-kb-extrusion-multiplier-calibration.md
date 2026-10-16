---
titulo: "Extrusion multiplier calibration"
url: https://help.prusa3d.com/article/extrusion-multiplier-calibration_2257
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-16
autor: Prusa Research
idioma: en
---

# Extrusion multiplier calibration

Relevant for

MK4 family

MINI family

MK3 family

MK3.5 family

MK3.9 family

+

113 comments

This is an **advanced calibration**, recommended only to **experienced users**.

The Extrusion Multiplier allows the fine-tuning of the extrusion flow rate - simply described as **how much filament comes out of the nozzle**. In other words, the **Extrusion Multiplier** setting in PrusaSlicer and the **Flow rate** setting in printer firmware are two ways to adjust the same thing, however, adjusting one of those two settings will not influence the value of the other.

**This procedure is not necessary with a new printer coming from the factory**, but rather applies for specific applications and filaments. The ideal value is different for every type of material and every color. It can even differ from spool to spool. Bear this in mind if you change type and brand of filament often or use cheap no-name brands.

Total flow rate = **Flow multiplier** in firmware (M221) x **Extrusion multiplier** in PrusaSlicer. For those interested in diving deeper, PrusaSlicer uses the same Flow math as Slic3r.

### How to spot an issue

This calibration is used to fix two common problems:
- **Overextrusion** - Too much material is extruded (flow is too high). It causes scarring of bottom layers and unnecessary material buildup on top layers.
- **Minor under extrusion** - Not enough material is extruded (flow is too low). It causes small gaps that appear between layer lines or perimeters.

Overextrusion is a common problem with many filament brands. It's especially problematic when you're trying to glue two parts of the model. If the top layer is over extruded, you'll end up with an uneven surface that will prevent a seamless connection between the two pieces.

### How to do the calibration

In PrusaSlicer, navigate to Filament Settings and look for Extrusion Multiplier. The default setting (for PLA) is 1, this value represents a percentage, 1 = 100%, 0.95 = 95% etc. Usually, the adjusted values can be between 0.9 and 1.1. To adjust it, simply rewrite the value.

In the printer menu, during a print, go to the Tune menu and then choose Flow. Again, the usual values can range between 90 and 110, although that does not mean you can't go above or below that.

#### Which method should I use?

There are two methods you can use to calibrate the Extrusion Multiplier, and we'll cover both of them in this article:
- **Precise Method** - using precision tools such as calipers or micrometers.
- **Visual Method** - an easy method based on observing the visual properties of your models.

The choice of the method depends entirely on your preferences; in the end, both yield similar results. Even the visual method will enable you to have perfectly fitting parts with smooth & flat top layers.

#### Precise Method

Please note that the following guide is based on **default** PrusaSlicer 0.4 nozzle profiles, with a layer height of 0.1mm - 0.2mm. This means that:
- Nozzle size = 0.4
- Extrusion width = 0.45
- Basic materials (PLA, ABS, PETG) Extrusion Multiplier = 1

If you wish to calibrate the printer with a bigger/smaller nozzle or layer heights above 0.2, then you will need to adjust these values as well.

- Download the Precision Method Cube STL.
- Slice it using the Vase Mode and your most-often used layer height and print it. You can find Vase mode (Print Settings → Layers and perimeters → Spiral vase).
- Make three or more measurements in the middle of each wall and calculate the overall average thickness.
- Calculate the extrusion multiplier using the following formula: **Extrusion multiplier = (Extrusion width (0.45) / Average measured wall thickness)**.
- Adjust the Extrusion Multiplier in Filament Settings → Filament
- Re-print the cube with new settings and go back to step 3 if necessary.

Please note that cheap digital calipers may not be accurate enough to make reliable measurements of a single perimeter wall.

#### Visual Method

This method does not require any tools, only your sight. The point is to make sure your top layers are **smooth**, **shiny**, and without **scarring or filament buildup** near the perimeters.

- Download the Visual Method Cube.stl
- Slice it using the default Prusa PLA presets at 0.20mm layer height and print it.
- Inspect the top layer of your cube visually and with the tip of the finger.
- If the top is under extruded or not smooth, then re-adjust the Extrusion Multiplier accordingly by 1-2%.
- Repeat the steps above as long as needed.

If there is **too much material** near the perimeters, **decrease** the Extrusion Multiplier value.

If there are **visible gaps** between layer lines, **increase** the Extrusion Multiplier value. (Microscopic gaps near the perimeters are OK.)

## Notas del recolector

- Fuente oficial Prusa Knowledge Base, capturada como Markdown integral. Cubre el método preciso (cubo en modo vaso, fórmula con ancho de extrusión 0.45) y el visual (capa superior), además de la relación multiplicativa entre Flow en firmware (M221) y Extrusion Multiplier del slicer. La fuente está marcada como calibración avanzada, no necesaria en una impresora recién salida de fábrica.
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
- Imágenes y STL referenciados no se han descargado.
