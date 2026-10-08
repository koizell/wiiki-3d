---
titulo: "Bambu Studio chamber temperature setting | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-08
autor: Bambu Lab
idioma: en
---

# Bambu Studio chamber temperature setting | Bambu Lab Wiki

¶ 1. Introduction
X1E offers an additional chamber temperature heating control feature, with a max chamber temperature of 60 ℃. Higher chamber temperatures can suppress the warping of certain high-temperature filaments' prints and provide higher interlayer strength (layer adhesion) of some prints. When printing high-temperature filaments such as PC, PA-CF, PAHT-CF, PET-CF, PPA-CF, PPS and PPS-CF, selecting X1E and enabling a chamber temperature of 60 °C can result in improved dimensional accuracy and visual quality of some prints. Furthermore, when printing the aforementioned high-temperature filaments, selecting X1E and enabling a chamber temperature of 60 ℃ can enhance the strength, especially the interlayer strength, of some prints.
Warning: It is strongly recommended not to enable high chamber temperature when printing PLA, PETG, TPU, PVA and other low-temperature filaments. Enabling high chamber temperature may cause these filaments to soften and become lodged in the extruder, resulting in clogging issues. When printing such low-temperature filaments, it is advised to set the chamber temperature to 0 °C (i.e., disable chamber temperature control).
¶ 2. Recommended chamber temperatures for various filaments
(1) PLA, PETG, TPU, PVA, PLA's supports and other low-temperature filaments:
Chamber temperature setting: The default chamber temperature setting is off (0 °C).
Tips: To prevent cloggings, avoiding high chamber temperatures and set the chamber temperature to 0 °C when printing low-temperature filaments is highly recommended. . Additionally, when the bed temperature is equal to or greater than the filament's softening temperature, it is advised to open the front door and remove the top cover of the printer. When the ambient temperature is high, the actual chamber temperature may be higher, and the need to open the front door and/or removethe top cover is stronger; conversely, when the ambient temperature is low, the actual chamber temperature is usually relatively low, and the need to open the front door and/or remove the top cover is weaker. For example, the softening temperatures of most kinds of PLA and PETG are about 45 °C and 70 °C respectively.
(2) ASA, ABS:
Chamber temperature setting: The default chamber temperature setting is off (0 °C).
Tips: When the chamber temperature is enabled, some models with lager size and/or higher infill density can experience reduced warping, resulting in improved print quality and dimensional accuracy. Additionally, the interlayer strength of some models can be enhanced. However, the preparation time before printing will get longer, and the air filtration will get worse. In order to obtain better air filtration effect, we choose to disable the chamber temperature by default. Please decide whether to turn on the chamber temperature based on the actual situation. Our suggestion is that for those prints that are prone to warping, that is, those with larger sizes and/or higher infill density, or those with higher strength requirements, please enable the chamber temperature to be 60°C, while for other normal prints, it is recommended not to enable it. 
(3) PC, PA, PA-CF, PAHT-CF, PA6-CF, PET-CF, PPA-CF, PPA-GF, PPS, PPS-CF and other high-temperature filaments:
Chamber temperature setting: The default chamber temperature setting is on (60 °C).
Tips: With high chamber temperatures, some models with lager size and/or higher infill density can experience reduced warping, improving quality and dimensional accuracy. Additionally, the interlayer strength of some models can be enhanced.
¶ 3. Chamber Temperature Setting Instructions
¶ 3.1 Setting Chamber Temperature (Recommended) in Bambu Studio
¶ Step 1: Select the X1E model.
¶ Step 2: Select the desired filament type.
¶ Step 3: Click on the filament parameter editing button.
¶ Step 4: Locate the chamber temperature setting field.

The chamber temperature can be set within the range of 0 °C to 60 °C (the chamber temperature heating control module only operates within the range of 40 °C to 60 °C).
Setting the chamber temperature to 0 °C represents disabling the chamber temperature heating control.
When the chamber temperature is set below 40 °C, the chamber temperature heating control will not take effect. In other words, setting the chamber temperature between 0 °C and 40 °C (including 0°C but not including 40 °C) will result in the same practical effect.
For a low-temperature filaments, to prevent clogging, it is recommended to set the chamber temperature below the designated safe temperature. If the chamber temperature is set above the safe temperature, a pop-up prompt will appear to alert the user.

In the case of multi-color printing, the actual chamber temperature will be the highest chamber temperature set among the multiple filaments being used. Thus, to avoid cloggings of any filaments that are actually being used, make sure that the highest chamber temperature is safe enough for all of them before starting.
Note: With firmware updates, the user interface (UI) may undergo slight changes.

## Notas del recolector

- El artículo trata sobre temperatura de cámara (chamber temperature), no de boquilla. Está dentro del dominio autorizado (`/software/`).
- Es relevante para el tema porque menciona explícitamente el efecto de la temperatura en la unión entre capas: "Higher chamber temperatures can... provide higher interlayer strength (layer adhesion) of some prints" y "can enhance the strength, especially the interlayer strength".
- El artículo menciona las temperaturas de ablandamiento de PLA (~45 °C) y PETG (~70 °C), lo cual es útil para entender por qué la cámara no debe calentarse con estos materiales.
- El texto original está en inglés y no ha sido traducido.
- Este artículo es sobre temperatura de cámara, no de boquilla. El cocinero debe decidir si es relevante para la guía o si queda fuera de alcance (el brief menciona que la temperatura de cama queda fuera, pero no la de cámara explícitamente).
