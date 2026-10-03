---
titulo: "Material Temperatures"
url: https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html
sitio: www.orcaslicer.com
tipo: oficial
capturado: 2026-10-03
autor: OrcaSlicer (Li Jiang)
idioma: en
---

Material Temperatures

Set the temperatures for the selected material.

Tip
Check Temperature calibration to find the optimal nozzle temperature for your filament.

Standard Temperature Ranges

The following table lists the standard temperature ranges for common 3D printing materials.
Actual optimal temperatures may vary based on specific filament brands and printer models.
Always refer to the filament manufacturer's recommendations and calibrations for best results.

Material | Nozzle Temp (°C) | Bed Temp (°C) | Chamber Temp (°C)
PLA | 180-220 | 50-60 | Ambient
ABS | 230-250 | 90-100 | 50-70
ASA | 240-260 | 90-100 | 50-70
Nylon 6 | 230-260 | 90-110 | 70-100
Nylon 12 | 225-260 | 90-110 | 70-100
TPU | 220-245 | 40-60 | Ambient
PC | 270-310 | 100-120 | 80-100
PC-ABS | 260-280 | 95-110 | 60-80
HIPS | 220-250 | 90-110 | 50-70
PP | 220-270 | 80-105 | 40-70
Acetal (POM) | 210-240 | 100-130 | 70-100

Nozzle

Variables: nozzle_temperature_initial_layer, nozzle_temperature.
Type: Integer list.
CLI Example: --nozzle-temperature-initial-layer=1 (same pattern for the other variables above).

One of the most critical settings for successful 3D printing is the nozzle temperature.
The correct nozzle temperature ensures proper melting and extrusion of the filament, leading to good layer adhesion and overall print quality.
You can set a higher temperature for the first layer to improve bed adhesion but be cautious with deformations as elephant foot.

Bed

Variables: supertack_plate_temp_initial_layer, supertack_plate_temp, cool_plate_temp_initial_layer, cool_plate_temp, textured_cool_plate_temp_initial_layer, textured_cool_plate_temp, eng_plate_temp_initial_layer, eng_plate_temp, hot_plate_temp_initial_layer, hot_plate_temp, textured_plate_temp_initial_layer, textured_plate_temp.
Type: Integer list.
CLI Example: --supertack-plate-temp-initial-layer=1 (same pattern for the other variables above).

Set the bed temperature for the selected material for First Layer and Other Layers for each Bed type if Support multi bed types is enabled in printer settings.
Using a higher temperature for the first layer can help improve adhesion to the build surface but be cautious of potential deformations like elephant foot.
Bed temperature plays a crucial role in ensuring proper filament adhesion to the build surface, which directly impacts both print success and quality.
Most materials have a relatively broad optimal range for bed temperature (typically +/-5°C).
In general, following the manufacturer’s recommendations, maintaining a clean bed (free from oils or fingerprints), ensuring a stable chamber temperature, and having a properly leveled bed will produce reliable results.

- If the bed temperature is too low, the filament may fail to adhere properly, leading to warping, weak layer bonding, or complete detachment. In severe cases, the printed part may dislodge entirely and stick to the nozzle or other printer components, potentially causing mechanical damage.
- If the bed temperature is too high, the lower layers can overheat and soften excessively, resulting in deformation such as elephant foot.

Tip
As a general guideline, you can use the glass transition temperature (Tg) of the material and subtract 5–10 °C to estimate a safe upper limit for bed temperature.
See this article for a detailed explanation.

Note
For challenging prints involving materials with high shrinkage (e.g., nylons or polycarbonate) or geometries prone to warping, dialed-in settings are critical.
In these cases, chamber temperature becomes a major factor in preventing detachment and ensuring print success.

Print Chamber Temperature

Mode: Simple.
Variables: activate_chamber_temp_control, chamber_temperature, chamber_minimal_temperature.
Type: activate_chamber_temp_control (Boolean list), chamber_temperature (Integer list), chamber_minimal_temperature (Integer list).
CLI Example: --activate-chamber-temp-control=1 (activate_chamber_temp_control shown; other variables above follow their own type).

Chamber temperature can affect the print quality, especially for high-temperature filaments.
A heated chamber can help to maintain a consistent temperature throughout the print, reducing the risk of warping and improving layer adhesion. However, it is important to monitor the chamber temperature to ensure that it does not exceed the filament's deformation temperature.

Important
Low temperature Filaments like PLA can clog the nozzle if the chamber temperature is too high.

This option activates the emitting of an M191 command before the "machine_start_gcode" which sets the chamber temperature and waits until it is reached.
In addition, it emits an M141 command at the end of the print to turn off the chamber heater, if present.
This option relies on the firmware supporting the M191 and M141 commands either via macros or natively and is usually used when an active chamber heater is installed.

Note
Check Support control chamber temperature in your printer settings to enable chamber temperature control.
For high-temperature materials like ABS, ASA, PC, and PA, a higher chamber temperature can help suppress or reduce warping and potentially lead to higher interlayer bonding strength. However, at the same time, a higher chamber temperature will reduce the efficiency of air filtration for ABS and ASA.
For PLA, PETG, TPU, PVA, and other low-temperature materials, this option should be disabled (set to 0) as the chamber temperature should be low to avoid extruder clogging caused by material softening at the heat break.
If enabled, this parameter also sets a G-code variable named chamber_temperature, which can be used to pass the desired chamber temperature to your print start macro, or a heat soak macro like this:

    PRINT_START (other variables) CHAMBER_TEMP=[chamber_temperature]

This may be useful if your printer does not support M141/M191 commands, or if you desire to handle heat soaking in the print start macro if no active chamber heater is installed.

## Notas del recolector

- URL comprobada: 200. El servidor responde también en la ruta sin `.html`
  (`https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures`), que
  devuelve el título canónico. Título: «Material Temperatures - OrcaSlicer Wiki».

- **Es la fuente que cubre más puntos del encargo**, y conviene que quien cocine lo
  sepa de entrada:
  - Punto 2, por qué un rango: «Most materials have a relatively broad optimal range for
    bed temperature (typically +/-5°C)». Es la frase que explica por qué hay un
    intervalo y no una cifra, y no sale en ninguna de las otras fuentes.
  - Punto 3, demasiado baja: la primera viñeta, con warping, capa débil y despegue
    total.
  - Punto 4, demasiado alta: la segunda viñeta, «elephant foot».
  - Punto 7, las claves en la cabecera: la línea «Variables:» de la sección Bed.

- **Sobre el punto 7, con precisión, porque aquí hay un riesgo de inventar.** En esta
  página salen **de forma literal** `hot_plate_temp` y `cool_plate_temp`, que son las
  que el proyecto conoce de los forks de Creality, y además `supertack_plate_temp`,
  `textured_cool_plate_temp`, `eng_plate_temp` y `textured_plate_temp`, todas con su
  gemela `_initial_layer`.

  Lo que **no** sale es `bed_temperature` a secas. La ruta
  `https://www.orcaslicer.com/wiki/developer_reference/placeholders_variables.html`
  devuelve 404, y en la página de Machine G-code de esta misma wiki sólo aparece
  `bed_temperature_initial_layer_single`. **Quien cocine tiene que marcar `bed_temperature`
  como dato del proyecto y no como dato de fuente**, salvo que aparezca otra cita.

- La tabla «Standard Temperature Ranges» es una sola etiqueta `<table>` de 12 filas y se
  lee sin problema, con tres columnas. Los valores son literales.

- Se han eliminado el menú lateral y el árbol de navegación, que ocupaban más de la
  mitad del texto extraído. El cuerpo de las cuatro secciones está literal.

- El aviso de «elephant foot» aparece **tres veces** en la página: dos en el cuerpo
  legible y una en el pie del menú lateral. Es un duplicado de la fuente, no mío.

- La página enlaza «See this article for a detailed explanation» sobre la regla de
  Tg menos 5–10 °C, pero el destino no aparece como URL legible en el HTML servido
  y **no lo he inventado**. Queda una fuente sin resolver: la explicación de por qué
  el techo es Tg menos 5–10 °C.

- La sección de cámara avisa de lo contrario de lo que se esperaría: con PLA y cámara
  alta, la boquilla se atasca. Y dice que para PLA, PETG, TPU y PVA el control de
  cámara debería estar desactivado. Eso contradice la lectura fácil de «cámara
  templada evita el warping», y es contenido de verdad.

- No he traducido nada.
