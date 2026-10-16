---
titulo: "Filament guide - Printer, Nozzle, AMS, Build Plate, Glue Compatibility and Required Parameters"
url: https://wiki.bambulab.com/en/general/filament-guide-material-table
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab
idioma: en
---

To ensure successful prints with Bambu Lab 3D printers, we have prepared recommendations for selecting the appropriate filaments based on different nozzles and build plates. Additionally, we provide printing and storage settings for various materials.

¶ Printer, Nozzle and AMS Compatibility

Refer to the table below to set up your printer parameters according to the type of filament and nozzle.

¶ 1. Printer

| Filament Type | Printing Requirements | Recommended Printer |
|---|---|---|
| ABS, ASA, PC, PA, and their CF/GF reinforced materials (e.g., ABS-GF, PC-CF, PA-CF/GF, PA6-CF/GF, PAHT-CF/GF, etc.) | Require higher heatbed and chamber temperatures to suppress warping and layer separation, and to ensure sufficient interlayer strength | Enclosed printer (Bambu H2 Series, X2D, P2S, X1, X1C, P1S, etc.) |
| PLA, PETG, TPU, and their CF/GF reinforced materials (e.g., PLA-CF/GF, PETG-CF/GF, etc.) | Not prone to warping; no mandatory temperature requirements | Open-frame or enclosed printer |

ℹ️ Note: For PETG and PETG-CF/GF, an enclosed printer is recommended to prevent low ambient temperatures from reducing the model's interlayer strength.

¶ 2. Nozzle

💡 Tip: Scroll the table to view more content.

| Filament | 0.2 mm Nozzle | 0.4 mm Nozzle | 0.6 mm Nozzle | 0.8 mm Nozzle | 0.4 mm High flow nozzle | 0.6 mm High flow nozzle | 0.8 mm High flow nozzle | Is it necessary to use hardened steel nozzles? (There are common materials for nozzles such as hardened steel, stainless steel and brass.) | Nozzle temperature /℃ ( ±10 °C) |
|---|---|---|---|---|---|---|---|---|---|
| PLA* | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 190 - 240 |
| PLA Metal | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 190 - 230 |
| PLA Wood | Not Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 190 - 240 |
| PLA Marble | Not Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 190 - 230 |
| PLA-CF/GF | Not Compatible | Bambu PLA-CF：Recommended | Compatible | Compatible | Not Recommended | Compatible | Compatible | Required | 210 - 240 |
| PLA Glow | Not Compatible | Bambu PLA Glow：Recommended | Compatible | Compatible | Compatible | Compatible | Compatible | Required | 210 - 240 |
| PVA, BVOH （Dry） | Not Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 190 - 240 |
| Support for PLA, Support for PLA/PETG | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 190 - 240 |
| PETG | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 240 - 270 |
| PETG HF | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 230 - 260 |
| PETG-CF | Not Compatible | Bambu PETG-CF：Recommended | Compatible | Compatible | Not Recommended | Compatible | Compatible | Required | 240 - 270 |
| PETG Translucent | Not Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 230 - 260 |
| TPU for AMS | Not Recommended | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 200 - 250 |
| TPU 95A HF | Not Recommended | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 200 - 250 |
| TPU 85A | Not Recommended | Compatible | Compatible | Compatible | Not Compatible | Not Recommended | Not Recommended | Not Required | 200 - 250 |
| TPU 90A | Not Recommended | Compatible | Compatible | Compatible | Not Recommended | Not Recommended | Not Recommended | Not Required | 200 - 250 |
| ABS | Compatible (For X2D printer: Main hotend Compatible, auxiliary hotend not recommended) | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 240 - 280 |
| ABS-GF | Not Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Required | 240 - 280 |
| ASA | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 240 - 280 |
| PC | Not Recommended | Compatible | Compatible | Compatible | Compatible | Compatible | Compatible | Not Required | 260 - 290 |
| PA-CF/GF PA6-CF/GF PAHT-CF/GF | Not Compatible | Compatible | Recommended | Compatible | Not Recommended | Compatible | Compatible | Required | 260 - 300 |
| PET-CF/GF | Not Compatible | Compatible | Recommended | Compatible | Not Recommended | Compatible | Compatible | Required | 260 - 300 |
| Support for PA/PET | Not Compatible | Compatible | Recommended | Compatible | Compatible | Compatible | Compatible | Required | 260 - 300 |
| PPA-CF/GF | Not Compatible | Compatible | Recommended | Compatible | Not Recommended | Compatible | Compatible | Required | 285 - 320 |
| PPS-CF/GF | Not Compatible | Compatible | Recommended | Compatible | Not Recommended | Compatible | Compatible | Required | 310 - 340 |

When printing carbon fiber or glass fiber-reinforced materials, or particle-filled materials (e.g., PLA-CF/GF, PETG-CF/GF, ABS-CF/GF, PA-CF/GF, PAHT-CF/GF, PET-CF/GF, PLA Marble, PLA Sparkle, PLA Glow, etc.), please follow the nozzle guidelines below:
❌ Avoid:
- Do not use a 0.2 mm nozzle. The clogging risk is extremely high.
- Do not use a stainless steel or brass nozzle. Their hardness is insufficient, so they wear out quickly, affecting print quality and nozzle life.
✅ Recommended:
- Nozzle type: Always use a hardened steel nozzle, which ensures stable printing and longer nozzle life.
- First choice — 0.6 mm hardened steel nozzle: It has a lower clogging risk and suits most printing scenarios.
- Second choice — 0.4 mm hardened steel nozzle: It improves detail and surface quality while still reducing the clogging risk. (Recommended layer height: 0.15–0.3 mm; maximum speed approx. 100 mm/s.)
- For specially designed Bambu filaments (e.g., Bambu PLA-CF, Bambu PETG-CF, Bambu PLA Marble, Bambu PLA Sparkle, Bambu PLA Glow, etc.), a 0.4 mm hardened steel nozzle is highly recommended as the first choice for smoother printing and better surface quality.
- Maintenance frequency: The nozzle and extruder gears require more frequent maintenance.

📌 Note: As the diameter increases (0.4 mm → 0.6 mm → 0.8 mm), print detail decreases, but the clogging risk also decreases accordingly.

Before using these materials, we recommend the following to reduce the clogging risk:
- Set the nozzle temperature to 280 °C.
- Use an Allen key and a needle to clean the inside of the nozzle, removing any residue.

If clogging occurs during printing, clean the nozzle using the same method, and make sure it is clean before resuming. For detailed instructions, refer to the guides below:
- X1/P1 Nozzle Unclogging Procedure
- H2D Nozzle Unclogging Procedure
- H2S Nozzle Unclogging Procedure
- H2C Nozzle Unclogging Procedure
- P2S Nozzle Unclogging Procedure
- X2D Nozzle Unclogging Procedure
- A2L Nozzle Unclogging Procedure

¶ 3. AMS & AMS lite

AMS and AMS lite have specific requirements for the physical properties of filaments. The following three types of filaments are not recommended:

❌ Too soft (e.g., TPU 95A/85A/83A/80A, damp PVA or BVOH): These cannot pass smoothly through the AMS / AMS lite channel, and can easily cause loading/unloading failures, clogging, and other issues.

❌ Too brittle (e.g., certain brands of PET-CF, PLA Wood, PA-CF/GF, PAHT-CF/GF): These can easily break inside the AMS / AMS lite channel.

❌ Too hard and rough (e.g., certain brands of PET-CF, PA-CF/GF, PAHT-CF/GF, PLA-CF/GF): These can easily wear down the internal feed channel of the AMS.

In addition, compared with the AMS lite, the AMS has an extra transmission gear that works together with the extruder gear to provide stronger feeding force. This helps overcome greater feeding resistance, so the AMS can handle some softer or rougher filaments.

The AMS lite lacks this extra feeding mechanism, making loading/unloading failures likely with such filaments. Therefore, PETG-CF and PLA Wood filaments are compatible with the AMS but not recommended for the AMS lite.

💡 Note: Before using engineering materials, dry the filament first.

⚠️ Warning! While a filament might load and unload smoothly at first, its physical texture plays a major role in the long-term health of your AMS inner PTFE tubes (which are replaceable). Rough or abrasive materials, such as carbon fiber or glow filaments, can eventually grind down the internal PTFE feed channels. To avoid PTFE damage, you should always verify if a material is too abrasive for the AMS before committing to long-term use.

| Filament | Open-frame printer (A Series, P1P, etc.) | Enclosed printer (H2 Series, X2D, P2S, X1 Series, P1S, etc.) | AMS / AMS lite Compatibility |
|---|---|---|---|
| PLA* | Compatible | Compatible | Compatible |
| PLA Metal / Wood / Marble | Compatible | Compatible | Compatible |
| PLA-CF/GF | Compatible | Compatible | Bambu PLA-CF: Compatible |
| PLA Glow | Compatible | Compatible | Not Recommended |
| PVA, BVOH （Dry） | Compatible | Compatible | Compatible |
| Support for PLA, Support for PLA/PETG | Compatible | Compatible | Compatible |
| PETG | Compatible | Compatible | Compatible |
| PETG HF | Compatible | Compatible | Compatible |
| PETG-CF | Compatible | Recommended | AMS: Compatible AMS lite: Not Recommended |
| PETG Translucent | Compatible | Compatible | Compatible |
| TPU | Compatible | Compatible | Not Compatible |
| ABS | Not Recommended | Recommended | AMS: Compatible AMS lite: Not Recommended |
| ABS-GF | Not Recommended | Recommended | AMS: Compatible AMS lite: Not Recommended |
| ASA | Not Recommended | Recommended | Compatible |
| PC | Not Recommended | Recommended | Compatible |
| PA-CF/GF PA6-CF/GF PAHT-CF/GF | Not Recommended | Recommended | Bambu PA-CF, PAHT-CF Compatible |
| PET-CF/GF | Not Recommended | Recommended | Not Compatible |
| Support for PA/PET | Not Recommended | Recommended | Compatible |
| PPA-CF/GF | Not Recommended | Recommended | Not Compatible |
| PPS-CF/GF | Not Recommended | H2 Series and X1E Compatible; Not applicable to other models | Not Compatible |

Table Notes:
① This table only explains the compatibility between filaments and the AMS / AMS lite from the perspective of filament loading and unloading. For long-term use, you should also check whether the roughness of the filament may wear down the internal feed channel of the AMS.
② "PLA" here refers to standard PLA—that is, PLA that does not contain hard, large-particle fillers such as carbon fiber (CF), glass fiber (GF), or other metallic or inorganic non-metallic fillers. This includes PLA Basic, PLA Matte, PLA Tough, PLA Metal, PLA Silk, PLA Aero, PLA Dynamic, etc., but excludes modified types such as PLA-CF, PLA-GF, PLA Sparkle, and PLA Marble.

¶ Build Plate Settings

¶ 1. Recommended Bed Temperatures for Different Filament & Glue Combinations

We recommend applying glue stick or liquid glue to the build plate. This improves model adhesion, makes prints easier to remove after printing, and helps protect the plate surface. The protective effect is especially noticeable when using the Bambu Engineering Plate. For instruction, please see: How to use Bambu Lab glue.

Use Bambu Lab Glue Stick for ASA-CF, PA6-GF/CF, PPA-CF, PPS-CF, PET-CF, and PAHT-CF printing.
Use Bambu Lab Liquid Glue for ABS-GF printing.

The recommended bed temperatures for different filament and glue combinations are as follows:

| Filament | Glue Stick | Liquid Glue |
|---|---|---|
| PLA / PLA-CF | 35 - 65 °C | 35 - 65 °C |
| PETG / PETG-CF / PETG HF / PETG Translucent | 60 - 80 °C | 60 - 80 °C |
| ABS | 90 - 100 °C | 90 - 100 °C |
| ASA | 90 - 100 °C | 90 - 100 °C |
| TPU | 30 - 45 °C | 30 - 45 °C |
| PET-CF/GF | 80 - 100 °C | Not Compatible |
| PC | 100 - 120 °C | Not Recommended |
| PA / PA-CF/GF / PAHT-CF/GF | 90 - 110 °C | Not Recommended |

¶ 2. Removing Prints

After printing, wait a few minutes until the plate and model have fully cooled before removing the print. This makes removal easier and helps avoid scratching the plate or damaging the bottom of the model. Once cooled, remove the build plate and gently flex it to release the model and the purge tower (if any).

¶ 3. Chamber Temperature Control Based on Filament Softening Temperature

A filament's softening temperature is the temperature at which it begins to soften and deform. To prevent filament from softening and deforming prematurely inside the extruder—which can cause abnormal extrusion or clogging—control the chamber temperature of enclosed printers as follows:

① Filaments with a softening temperature below 60 ℃ (e.g., PLA, PVA, TPU), when the heatbed is set above 45 ℃:
We recommend opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament.
When the ambient temperature is high, the chamber temperature may rise higher, making this more necessary.
When the ambient temperature is low, the chamber temperature is usually lower, making this less necessary.

② Filaments with a softening temperature of 60–80 ℃ (e.g., PETG), when the heatbed is set above 60 ℃:
We recommend opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament.
When the ambient temperature is high, the chamber temperature may rise higher, making this more necessary.
When the ambient temperature is low, the chamber temperature is usually lower, making this less necessary.

The table below shows the compatible build plates and bed temperatures for different filaments:

| Material | Bambu Cool Plate / PLA Plate | Bambu Engineering Plate | Bambu Smooth PEI / High-Temperature Plate | Bambu Textured PEI Plate | Upper Glass Cover Plate Removal? |
|---|---|---|---|---|---|
| PLA | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended |
| PLA Metal / Wood / Marble | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended |
| PLA-CF | 45 - 65 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended |
| PVA | 35 - 45 ℃ | 45 - 65 ℃ Glue Required | 45 - 65 ℃ | 45 - 65 ℃ | If bed > 45 ℃, Recommended |
| TPU | Not recommended | 30 - 35 ℃ | 35 - 45 ℃ | 35 - 45 ℃ | If bed > 45 ℃, Recommended |
| PETG / PETG HF / PETG Translucent | Not recommended | 60 - 80 ℃ | 60 - 80 ℃ | 60 - 80 ℃ | If bed > 70 ℃, Recommended |
| PETG-CF | Not recommended | 60 - 80 ℃ | 60 - 80 ℃ | 60 - 80 ℃ | If bed > 70 ℃, Recommended |
| ABS | Not recommended | 90 - 100 ℃ | 90 - 100 ℃ | 90 - 100 ℃ | NO |
| ASA | Not recommended | 90 - 100 ℃ | 90 - 100 ℃ | 90 - 100 ℃ | NO |
| PC | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |
| PA | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |
| PA-CF/GF, PA6-CF/GF PAHT-CF/GF | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |
| PET-CF/GF | Not recommended | 80 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |
| PPA-CF/GF | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |
| PPS | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |
| PPS-CF/GF | Not recommended | 100 - 120 ℃ | 100 - 120 ℃ | 100 - 120 ℃ | NO |

📌 Notes:
- In Bambu Studio, if a heatbed temperature in the filament preset is set to 0 ℃, the software will report that the filament is incompatible with slicing. Manually change the bed temperature to a non-zero value, and the prompt will disappear; slicing will then proceed according to your setting.
- The old Engineering Plates are not recommended for printing PLA. All engineering plates currently sold are the new version and can be used with glue.

¶ 4. Cleaning and Maintenance

Regularly clean the plate surface with dish soap and hot water to remove dust, grease, and other residues that affect adhesion, ensuring good first-layer bonding. For instruction, please see this wiki: Bambu Lab Textured PEI Plate Cleaning Guide.

⚠️ Caution: Do not clean the plate with acetone, as it may damage the surface.

¶ Storage and Material Specifications

The storage condition of filament has a crucial impact on print quality—especially for moisture-sensitive filaments.

All filaments absorb moisture from the air to some degree. When damp filament is printed, the absorbed moisture rapidly vaporizes inside the high-temperature nozzle. This causes the molten filament to expand, flow faster, and form air bubbles. As a result, prints may suffer from stringing, under-extrusion, holes, rough surfaces, and reduced strength. The higher the humidity and the longer the filament is exposed to air, the more moisture it absorbs—and the more severe these defects become.

Therefore, we strongly recommend the following—especially for models with high appearance or strength requirements:
- Before printing: If you are unsure whether the filament is fully dry, dry it first.
- During printing: Keep the filament sealed and protected with desiccant.

📚 For detailed drying instructions, see the Filament Drying Guide.

Understanding material properties also helps you choose the right filament for your application:
- PLA: Not recommended for environments at about 50 ℃ or higher, as it may slowly degrade, soften, and deform.
- PETG, ABS, ASA, PC, PA-CF/GF, PET-CF/GF: Offer better heat resistance and are ideal choices for high-temperature applications.

| Material | Drying Requirement before Use | Drying Condition (Blast Drying Oven) | Drying Condition （AMS 2 Pro） | Drying Condition （AMS HT） | Requirement of Protecting Filament with Desiccant during Use | Heat Deflection Temperature Level | Impact Resistance | Tensile Strength |
|---|---|---|---|---|---|---|---|---|
| PLA | Recommended | 55 ℃ for 8 h | 45 ℃ for 12 h | 45 ℃ for 12 h | Optional | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| PLA Metal / Wood / Marble | Recommended | 55 ℃ for 8 h | 45 ℃ for 12 h | 45 ℃ for 12 h | Optional | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| PLA-CF | Recommended | 55 ℃ for 8 h | 45 ℃ for 12 h | 45 ℃ for 12 h | Optional | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| PVA | Required | 55 ℃ for 8 h | Not recommended | 85 ℃ for 18 h | Required | ⭐ | ⭐ | ⭐ |
| PETG | Recommended | 70 ℃ for 8 h | 65 ℃ for 12 h | 65 ℃ for 12 h | Optional | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| PETG HF / PETG Translucent | Required | 65 ℃ for 8 h | 65 ℃ for 12 h | 65 ℃ for 8 h | Required | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| PETG-CF | Recommended | 70 ℃ for 8 h | 65 ℃ for 12 h | 65 ℃ for 12 h | Optional | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| ABS | Recommended | 80 ℃ for 8 h | Not recommended | 80 ℃ for 8 h | Optional | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| ASA | Recommended | 80 ℃ for 8 h | Not recommended | 80 ℃ for 8 h | Optional | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| PC | Required | 80 ℃ for 8 h | Not recommended | 80 ℃ for 8 h | Required | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| PA | Required | 80 ℃ for 8 - 12 h | Not recommended | 85 ℃ for 12 h | Required | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| PA-CF/GF PAHT-CF/GF | Required | 80 ℃ for 8 - 12 h | Not recommended | 85 ℃ for 12 h | Required | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| PET-CF/GF | Required | 80 ℃ for 8 - 12 h | Not recommended | 80 ℃ for 12 h | Required | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| TPU | Required | 70 ℃ for 8 h | Not recommended | 75 ℃ for 12 h | Required | ⭐ | ⭐⭐⭐⭐⭐ | ⭐ |

¶ End Notes

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support ticket and include your recent printer logs and additional pictures or other details. Our technical team will review your request and provide detailed assistance.

You can also visit Bambu AI, which can instantly answer common questions and provide you with operational guidance.

## Notas del recolector

- Página oficial de Bambu. La parte relevante para esquinas levantadas en PETG es
  la línea de “not prone to warping; no mandatory temperature requirements” junto
  con el matices que la propia guía pone: PETG y PETG-CF requieren cámara cerrada
  cuando la temperatura ambiente es baja para no perder resistencia entre capas, y
  la tabla de cama da 60–80 °C para PETG (Cool Plate no recomendada).
- También aporta la tabla de secado (70 °C, 8 h en horno; 65 °C, 12 h en AMS) y
  el aviso general de humedad, que es un causa de warping secundaria en PETG.
- El texto original está en inglés y no se ha traducido.