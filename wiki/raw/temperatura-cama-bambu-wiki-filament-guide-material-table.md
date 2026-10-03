---
titulo: "Filament guide - Printer, Nozzle, AMS, Build Plate, Glue Compatibility and Required Parameters"
url: https://wiki.bambulab.com/en/general/filament-guide-material-table
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-03
autor: Bambu Lab
idioma: en
---

Printer, Nozzle and AMS Compatibility

Refer to the table below to set up your printer parameters according to the type of filament and nozzle.

1. Printer

Filament Type | Printing Requirements | Recommended Printer
ABS, ASA, PC, PA, and their CF/GF reinforced materials (e.g., ABS-GF, PC-CF, PA-CF/GF, PA6-CF/GF, PAHT-CF/GF, etc.) | Require higher heatbed and chamber temperatures to suppress warping and layer separation, and to ensure sufficient interlayer strength | Enclosed printer (Bambu H2 Series, X2D, P2S, X1, X1C, P1S, etc.)
PLA, PETG, TPU, and their CF/GF reinforced materials (e.g., PLA-CF/GF, PETG-CF/GF, etc.) | Not prone to warping; no mandatory temperature requirements | Open-frame or enclosed printer

ℹ️ Note: For PETG and PETG-CF/GF, an enclosed printer is recommended to prevent low ambient temperatures from reducing the model's interlayer strength.

2. Nozzle

The following is the "Nozzle temperature /℃ (±10 °C)" column of the page's nozzle table, which
otherwise has one column per nozzle diameter. That column heading is reproduced above.

Filament | Nozzle temperature /℃ (±10 °C)
PLA* | 190 - 240
PLA Metal | 190 - 230
PLA Wood | 190 - 240
PLA Marble | 190 - 230
PLA-CF/GF | 210 - 240
PLA Glow | 210 - 240
PVA, BVOH (Dry) | 190 - 240
Support for PLA, Support for PLA/PETG | 190 - 240
PETG | 240 - 270
PETG HF | 230 - 260
PETG-CF | 240 - 270
PETG Translucent | 230 - 260
TPU for AMS | 200 - 250
TPU 95A HF | 200 - 250
TPU 85A | 200 - 250
TPU 90A | 200 - 250
ABS | 240 - 280
ABS-GF | 240 - 280
ASA | 240 - 280
PC | 260 - 290
PA-CF/GF, PA6-CF/GF, PAHT-CF/GF | 260 - 300
PET-CF/GF | 260 - 300
Support for PA/PET | 260 - 300
PPA-CF/GF | 285 - 320
PPS-CF/GF | 310 - 340

Build Plate Settings

1. Recommended Bed Temperatures for Different Filament & Glue Combinations

We recommend applying glue stick or liquid glue to the build plate. This improves model adhesion, makes prints easier to remove after printing, and helps protect the plate surface. The protective effect is especially noticeable when using the Bambu Engineering Plate. For instruction, please see: How to use Bambu Lab glue.

- Use Bambu Lab Glue Stick for ASA-CF, PA6-GF/CF, PPA-CF, PPS-CF, PET-CF, and PAHT-CF printing.
- Use Bambu Lab Liquid Glue for ABS-GF printing.

The recommended bed temperatures for different filament and glue combinations are as follows:

Filament | Glue Stick | Liquid Glue
PLA / PLA-CF | 35 - 65 °C | 35 - 65 °C
PETG / PETG-CF, PETG HF / PETG Translucent | 60 - 80 °C | 60 - 80 °C
ABS | 90 - 100 °C | 90 - 100 °C
ASA | 90 - 100 °C | 90 - 100 °C
TPU | 30 - 45 °C | 30 - 45 °C
PET-CF/GF | 80 - 100 °C | Not Compatible
PC | 100 - 120 °C | Not Recommended
PA / PA-CF/GF / PAHT-CF/GF | 90 - 110 °C | Not Recommended

2. Removing Prints

After printing, wait a few minutes until the plate and model have fully cooled before removing the print. This makes removal easier and helps avoid scratching the plate or damaging the bottom of the model. Once cooled, remove the build plate and gently flex it to release the model and the purge tower (if any).

3. Chamber Temperature Control Based on Filament Softening Temperature

A filament's softening temperature is the temperature at which it begins to soften and deform. To prevent filament from softening and deforming prematurely inside the extruder—which can cause abnormal extrusion or clogging—control the chamber temperature of enclosed printers as follows:

① Filaments with a softening temperature below 60 ℃ (e.g., PLA, PVA, TPU), when the heatbed is set above 45 ℃:
- We recommend opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament.
- When the ambient temperature is high, the chamber temperature may rise higher, making this more necessary.
- When the ambient temperature is low, the chamber temperature is usually lower, making this less necessary.

② Filaments with a softening temperature of 60–80 ℃ (e.g., PETG), when the heatbed is set above 60 ℃:
- We recommend opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament.
- When the ambient temperature is high, the chamber temperature may rise higher, making this more necessary.
- When the ambient temperature is low, the chamber temperature is usually lower, making this less necessary.

The table below shows the compatible build plates and bed temperatures for different filaments:

Material | Bambu Cool Plate / PLA Plate | Bambu Engineering Plate | Bambu Smooth PEI / High-Temperature Plate | Bambu Textured PEI Plate | Upper Glass Cover Plate Removal?
PLA | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended
PLA Metal / Wood / Marble | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended
PLA-CF | 45 - 65 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended
PVA | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended
TPU | Not recommended | 30 - 35 ℃ | 35 - 45 ℃ | 35 - 45 ℃ | If bed > 45 ℃, Recommended
PETG / PETG HF / PETG Translucent | Not recommended | 60 - 80 ℃ | 60 - 80 ℃ | 60 - 80 ℃ | If bed > 70 ℃, Recommended
PETG-CF | Not recommended | 60 - 80 ℃ | 60 - 80 ℃ | 60 - 80 ℃ | If bed > 70 ℃, Recommended
ABS | Not recommended | 90 - 100 ℃ | 90 - 100 ℃ | 90 - 100 ℃ | NO
ASA | Not recommended | 90 - 100 ℃ | 90 - 100 ℃ | 90 - 100 ℃ | NO
PC | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO
PA | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO
PA-CF/GF, PA6-CF/GF, PAHT-CF/GF | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO
PET-CF/GF | Not recommended | 80 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO
PPA-CF/GF | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO
PPS | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO
PPS-CF/GF | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO

📌 Notes:
- In Bambu Studio, if a heatbed temperature in the filament preset is set to 0 ℃, the software will report that the filament is incompatible with slicing. Manually change the bed temperature to a non-zero value, and the prompt will disappear; slicing will then proceed according to your setting.
- The old Engineering Plates are not recommended for printing PLA. All engineering plates currently sold are the new version and can be used with glue.

4. Cleaning and Maintenance

Regularly clean the plate surface with dish soap and hot water to remove dust, grease, and other residues that affect adhesion, ensuring good first-layer bonding. For instruction, please see this wiki: Bambu Lab Textured PEI Plate Cleaning Guide.

⚠️ Caution: Do not clean the plate with acetone, as it may damage the surface.

## Notas del recolector

- URL comprobada: 200. Título: «Filament guide - Printer, Nozzle, AMS, Build Plate, Glue
  Compatibility and Required Parameters | Bambu Lab Wiki».

- **Las tablas se leen como tabla.** El encargo pedía comprobarlo, y es lo que
  hace la diferencia con este lote: la página trae 6 etiquetas `<table>` y 91 `<tr>` en
  el HTML servido. Se han transcrito celda a celda, sin aplanar.

- **Hay dos tablas de cama, y no son la misma cosa.** La primera es por filamento y
  pegamento, y da PLA 35–65 °C. La segunda es por filamento y **chapa**, y ahí está
  lo que el encargo pedía en el punto 5: con la Cool Plate el PLA pide **35–45 ℃**,
  y con las otras tres chapas pide **45–65 ℃**. El TPU baja a 30–35 ℃ en Engineering
  Plate y sube a 35–45 ℃ en Smooth y Textured PEI.

  Esto importa mucho: significa que **los dos números que en la fuente de warping
  parecían discrepar —«55–65 °C en Textured PEI» y «35 °C en Cool Plate»— son los
  dos extremos de la misma fila, leídos por columnas distintas.** La fila del PLA de
  esta tabla es `35 - 45 | 45 - 65 | 45 - 65 | 45 - 65`, y la fuente de warping da
  35 para la Cool Plate y 55–65 para la Textured PEI.

- La columna final de la segunda tabla dice si hay que quitar la tapa de cristal, con
  un umbral por material: con PLA y cama por encima de 45 ℃, recomendado. Eso es lo
  que convierte «sube la cama» en un consejo con dos efectos, no en uno.

- La sección de cámara explica **el otro lado** de subir la cama: por encima de 45 °C
  con PLA, PVA o TPU hay que abrir la puerta. Interesa al artículo, pero no es
  temperatura de cama, así que no lo he tratado como una tabla más.

- **De la tabla de boquilla sólo he transcrito la última columna**, la de temperatura.
  Las otras ocho son una por diámetro de boquilla y no son del tema. Lo digo justo
  encima de la tabla para que no parezca que se ha perdido nada. El asterisco de
  «PLA*» remite a una nota al pie que no viene en el HTML servido.

- **Las cifras usan dos estilos distintos dentro de la misma página**: la primera tabla
  usa «°C» y las dos siguientes «℃». No lo he unificado, porque el texto es tal cual.

- Fuera de aquí he dejado «Storage and Material Specifications» y «End Notes»: son
  secado, humedad y propiedades mecánicas, no temperatura de cama. El logo, los
  enlaces internos y los iconos de «scroll the table» quedan como texto suelto.

- La página `https://wiki.bambulab.com/en/general/build-plate` que estaba en la lista
  de candidatas **responde 200 pero es un stub**: 551 caracteres de cuerpo y todo el
  texto es «Please get more information from the Wiki Introduction to the Build
  Plates». No aporta nada. Queda como fuente descartada.

- No he traducido nada.
