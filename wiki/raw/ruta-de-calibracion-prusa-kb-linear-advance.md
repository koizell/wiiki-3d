---
titulo: "Linear Advance"
url: https://help.prusa3d.com/article/linear-advance_2252
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-21
autor: Prusa Research a.s.
idioma: en
---

# Linear Advance

Relevant for MK2.5 MK2.5S MK3 MK3S MMU2S

Article is also available in following languages

This is an advanced calibration for MK3-family and MK2-family printers. It is replaced by Pressure Advance on MK4-family, XL, MINI/+ from firmware 5.0.0, and successive printer models.

Linear Advance (LA) is a technology that predicts the pressure build-up in the extruder when printing at higher speeds. The firmware of the printer uses that prediction to decrease the amount of filament extruded just before stopping and decelerating, which prevents blobs or artifacts at the sharp corners. What is referred to as 'K-values' are the parameters determining how much Linear Advance affects the print.

With firmware 3.9.0, we introduced Linear Advance 1.5 for the Original Prusa MK3S, MK3, MK2.5S, and MK2.5, which was further improved upon with FW 3.9.1, addressing print artifacts found in specific scenarios and geometries. Linear Advance 1.5 is also backward compatible with version 1.0. In case you have a G-code with Linear Advance 1.0, the printer will analyze the code and convert the values automatically.

Print profiles for the Original Prusa MINI are well-tuned. Additionally, there has never been LA1.0 on the MINI, so no conversion (to LA1.5) is required.

## Configuration

These values are part of our PrusaSlicer configurations and filament presets. No need to adjust if you are using these. However, if you are using filaments not present or wish to play around with the presets, we have developed a K-factor calibration print together with the community, to find the perfect K-values for your material and printing temperatures. These are based on the various quality and layer height presets found in PrusaSlicer.

This article mainly refers to the printer use with a 0.4 mm brass nozzle. Other nozzle sizes or materials could result in different K-values.

It will print a series of lines with different K-values affecting the speed and flow across the accelerated distance. The examples below show how the lines are affected by their K-value. The first and last 25 mm are printed slowly, and between the marked locations (red squares) 100mm is printed fast. Look closely at the transition from slow to fast and fast to slow. You see the line can be irregular to broken entirely when the value is not optimal, most visible on the top lines (red squares), but present on all except those with the optimal K-factor. You also see big differences between different materials and how much difference it can make to have this dialed in.

Calibration G-code printed with PLA at 215 °C. Most consistent line achieved with K-value 0.05 (green square).

Calibration G-code printed with ABS at 255 °C. Most consistent line achieved with K-value 0.04 (green square).

Calibration G-code printed with PETG at 240 °C. Most consistent line achieved with K-value 0.08 (green square).

## Download calibration G-code

You can download the K-factor calibration G-code from our print depository or directly from the table below. These are for a 0.4 mm brass nozzle. Load the correct filament type for the G-code and start the print as any other.

| Material | Layer height | Fastest speed | PrusaSlicer profile |
|---|---|---|---|
| | 0.2mm | 45mm/s | QUALITY |
| | 0.2mm | 60mm/s | SPEED |
| | 0.3mm | 50mm/s | DRAFT |
| PLA | Download | Download | Download |
| PETG | Download | Download | Download |
| ASA | Download | Download | Download |
| PC | Download | Download | Download |
| NYLON | Download | Download | Download |
| ABS | Download | Download | Download |
| HIPS | Download | Download | Download |

These files have pre-set temperatures (e.g., PLA 215°C). If your filament requires a different temperature, it is necessary to edit the G-code manually.

To do so, open the G-Code in a text editor. Inside the text editor, use the find function (e.g., CTLR+F) to find the block of commands, similar to the one shown in the example below, that starts with M104. The example below is taken from a pre-set PLA G-code.

Where needed, change the "S" values, which represent the temperature in Celsius:

```
M104 S215 ; Set nozzle temperature (no wait)
M140 S60 ; set bed temp
M190 S60 ; wait for bed temp
M109 S215 ; Wait for nozzle temp
```

## Optimal K-values and how to adjust

The optimal values we found in our testing are listed in the tables below. These can be implemented into any slicer. Please note that different brands and colors of the same material may require a slightly different K value when printing at extreme speeds, however, our presets should be fine with all of them.

**0.4 mm nozzle**

| Material | K-value |
|---|---|
| PLA | 0.05 |
| PETG | 0.08 |
| CPE | 0.07 |
| PC Blend | 0.07 |
| ASA/ABS | 0.04 |
| HIPS | 0.04 (some brands may need a higher K-value) |
| Nylon Taulman | 0.08 |
| Nylon FX256 | 0.1 |

**0.6 mm nozzle**

| Material | K-value |
|---|---|
| PLA | 0.04 |
| PETG | 0.04 - 0.05 |
| PC Blend | 0.04 |
| ASA/ABS | 0.02 - 0.03 |
| HIPS | 0.03 (some brands may need a higher K-value) |

Be careful when setting new K-values. Changing them is recommended only for experienced users. Back up your settings before you adjust them.

### PrusaSlicer

As mentioned, the K-values for all filaments are already implemented into PrusaSlicer's presets. If you need to adjust these settings due to some exotic filament or a specific application, the K-value is set in the custom G-code section in the Filament Settings tab, NOT under the printer-specific custom G-code.

The blue arrow and box show the number to change for a 0.6 mm nozzle.

The green arrow and box show the number to change for a 0.4mm nozzle.

### Other slicers

If you are using a different slicer than our PrusaSlicer, you must manually change the settings in the G-code script of your slicer.

Simplify3D, Cura, etc. users just need to add "M900 Kxx" into the starting G-code script. Keep in mind you need to manually change that for different filament materials. Only PrusaSlicer has a custom G-code for each filament preset and therefore the K value is changed automatically. Set the desired speed and print something (large enough for speed to show up). If sharp corners have blobs, increase the K value. If you see missing filament, decrease the K value.

Users of Simplify3D, Cura, etc. should change their LA adjustments in their slicer when they install firmware 3.9.0 or newer!

If you are interested in a more in-depth explanation of how Linear Advance works, check out the Prusa firmware changelog on GitHub or vanilla Marlin's pages.

## Topics

Calibration
Advanced calibration
Manual temperature calibration
Linear Advance
Extruder linearity correction calibration
Extrusion multiplier calibration
PID tuning
Bed Level Correction
Basic calibration
Calibration Error Messages

## Comentarios de usuarios (no son documentación oficial de Prusa)

+80 comments

antionion•Would really appreciate calibration files for the MK4 with input shaper. I'm having issues at seams with a third-party filament.

Replyantionion•Found this :-)https://www.printables.com/model/641490-prusa-slicer-pressure-advance-testReplyVeggysaurus•XL please?ReplyDavid B.•Hi! Original Prusa XL uses Pressure Advance instead of Linear Advance feature. If you wish to calibrate Pressure Advance, for example to use an exotic type of filament, you might want to have a look at this page:https://garethky.github.io/PrusaSlicerPressureAdvanceCalibration/ReplyChristian•Hi David,thank you for the link. Helped me a lot to adjust my XL. It would be great to have this tool integrated in the slicer software.The settings for PLA (M572) in Slicer 2.8.1 had to be adjusted for better results with my printer.For 0,4 mm nozzle: 0,045 (old value: 0,036)For 0,6 mm HF nozzle: 0,03 (old value: 0,02)ReplyMatthias U•Hi I am using Polymaker Matte PLA Filament 1.75mm Brown https://www.amazon.com/dp/B094FJ2NYL?psc=1&ref=ppx_yo2ov_dt_b_product_detailsIn the Amazon About this item, it says "【Printing Settings】 - Nozzle: 210˚C, Bed: 50˚C, Speed: 60 mm/s. Selected diameter: PolyTerra PLA filament 1.75mm Brown ( PLA filament Chocolate Brown )" So I used 215˚C for the First Layer and Other Layers 210˚C. For the bed I used 50˚C1. Do you think read the Amazon Item text correctly (I mean 210˚C for the First Layer and Other Layers and 50˚C for the bed)?2. I don't see a first lay and other layer in the K-factor calibration G-codeSo for my test of PolyTerra PLA I should change these lines in the K-factor calibration G-code to:; Nozzle Temperature = 210 °CM104 S210 ; Set nozzle temperatureM104 S210 ; Set nozzle temperature; Bed Temperature = 50 °CM140 S60 ; set bed tempM190 S60 ; wait for bed tempWhile I'm here. Anyone who used "Polymaker Matte PLA Filament" that has some suggested setting? I have a stock MK3S+, and I'm using 0.2mm QUALITYReplysmiledemons•Would really appreciate calibration files for the MK4, both more M900 and M572 for input shaper. I'm having issues at corners even with Prusament and default profilesReply

Show older comments

Leave a comment

## Notas del recolector

- Documentación oficial de Prusa Research. Es la fuente de Prusa sobre cómo llama a la función: **«Linear Advance»** en la familia MK2/MK3 (con K-value) y **«Pressure Advance»** a partir de MK4, XL y MINI/+ con firmware 5.0.0. Es exactamente el punto 3 del encargo (la función es específica del firmware y no se porta entre firmwares): aquí la prueba es que un K-value de MK3 no es lo mismo que el PA de MK4.
- Cifras del fabricante que sí están en la fuente: K-values óptimos de Prusa para 0,4 mm (PLA 0,05; PETG 0,08; CPE 0,07; PC Blend 0,07; ASA/ABS 0,04; HIPS 0,04; Nylon Taulman 0,08; Nylon FX256 0,1) y para 0,6 mm (PLA 0,04; PETG 0,04–0,05; PC Blend 0,04; ASA/ABS 0,02–0,03; HIPS 0,03). Temperaturas de los G-code de calibración: PLA 215 °C, ABS 255 °C, PETG 240 °C. Geometría del patrón: primeros y últimos 25 mm lentos y 100 mm rápidos entre las marcas.
- **Síntomas de un K mal puesto, tal como los describe Prusa:** «If sharp corners have blobs, increase the K value. If you see missing filament, decrease the K value.» Es la misma pareja de síntomas que da Marlin (línea starving / overshoot) pero con otro vocabulario.
- differences de nomenclatura por firmware que aparecen explícitas en la fuente: `M900 Kxx` es el comando de Linear Advance (Marlin y PrusaSlicer en MK3); `M572` es el de Pressure Advance (RepRap/Duet y el firmware de las MK4 de Prusa) y sólo aparece en los comentarios de usuarios de esta página, no en el cuerpo del artículo. El cuerpo del artículo sólo menciona M900.
- La tabla de descargas se reproduce con el texto «Download» porque las URL de los ficheros G-code no aparecían en la extracción; no se han descargado los G-code.
- **Los comentarios de usuario están separados del cuerpo del artículo y marcados como tales**: no son documentación de Prusa. Aportan el dato de que la XL usa Pressure Advance con `M572` y dos valores de usuario para PLA (0,4 mm → 0,045; 0,6 mm HF → 0,03), que es información no oficial y no debe usarse como cifra de fabricante.
- El artículo **no da un orden de calibración**: es una de las piezas sueltas de la categoría «Advanced calibration» de Prusa. La lista completa de esa categoría (Extrusion multiplier calibration, Bed Level Correction, Linear Advance, Squaring your MINI, PID tuning, Extruder linearity correction, Phase Stepping, Manual temperature calibration) se ha visto en `https://help.prusa3d.com/category/advanced-calibration_229`, que no se ha capturado como fichero aparte.
- El artículo remite a Marlin («vanilla Marlin's pages») para la explicación en profundidad. La fuente de Marlin ya está en `wiki/raw/flow-rate-marlin-linear-advance.md`, y la de Klipper en `wiki/raw/flow-rate-klipper-pressure-advance.md`; no se han vuelto a traer.
- Se ha eliminado el cromado del sitio (menús, banners, blog, pie de página) y la tabla de precios/«Was this article helpful?». Texto original en inglés, no traducido.
