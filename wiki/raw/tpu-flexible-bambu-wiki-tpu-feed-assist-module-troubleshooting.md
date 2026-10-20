---
titulo: "TPU Feed Assist Module - Common troubleshooting Steps | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/general/troubleshooting/tpu-feed-assist-module
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-19
autor: Bambu Lab
idioma: en
---

>

For instructions on how to assemble and use the TPU feed assist Module, refer to the dedicated Wiki page: TPU Feed Assist Module Assembly & Usage Guide (/en/general/manual/tpu-feed-assist-module)

>

## ¶ 1. When the TPU is loaded, it has entered the TPU feed assist module, but no filament is extruded at the nozzle

### ¶ a. Residual filament at the hotend inlet is preventing the TPU from being loaded

🔎 **Possible causes:**

The filament was not completely removed / clean after the previous printing, and there is filament remaining at the inlet of the hotend.

TPU isn't stiff enough to push the previous filament out the nozzle, so it jams.

[imagen]

✅ **Solution:**

**1.** Remove the hotend and take out the remaining filament, a manual cold pull is the best way to clear the hotend, click here to follow the steps. (/en/h2s/maintenance/nozzle-cold-pull-maintenance-and-cleaning#unclogging-with-hot-hex-wrench-for-cold-end-clogging)

**2.** Check the filament loaded in the TPU power module, if there is deformation or bending, the deformed part needs to be cut off;

**3.** Replace the TPU filament with a new one and try to feed it again.

### ¶ b. The extrusion resistance of the hotend is too high, filament cannot be extruder

🔎 **Possible causes:**

The hotend is slightly blocked or clogged, or the temperature of the hotend is not sufficient, resulting in excessive extrusion resistance and the filament cannot be extruded from the nozzle smoothly.

✅ **Solution:**

**1.** Before feeding, the hotend needs to be cleared with a cold pull, click here to follow the exact steps (/en/h2s/maintenance/nozzle-cold-pull-maintenance-and-cleaning)

**2.** Make sure the hotend temperature is 250°C (standard temperature for loading TPU), and then try to feed it again.

**3.** If there is still resistance after performing the cold pull, check whether the nozzle is blocked and clean the nozzle if necessary.

[imagen]

### ¶ c. The hardness of the filament is not up to standard, and the extruder cannot be extruded normally

TPU filament used is less than 85A hard, and the material is too soft to be properly engaged by the extruder gears, resulting in extrusion failure.

TPU with a hardness below 85A needs to be replaced, and the official bambu Lab filament should be used to ensure reliable feeding.

[imagen]

### ¶ d. Excessive PTFE tube resistance hinders filament feeding, causing the filament to get stuck in the tube and fail to enter the toolhead

🔎 **Possible Causes**: Dents, deformation or accumulated filament dust inside the PTFE tube leading to increased resistance.

[imagen]:PTFE Tube

✅**Solutions**:

- Try increasing the gear level of the feed assist module.

- Try replacing with a new PTFE tube and ensure its length is consistent with the original one. Please refer to the document: TPU Feed Assist Module Assembly & User Guide (/en/general/manual/tpu-feed-assist-module).

## ¶ 2. After turning on the feeding mode, it will automatically exit for a period of time, resulting in printing failure

The TPU feed assist module automatically exits the feeding mode after running for a period of time (about 135 seconds), triggering the feeding timeout logic of the module

The assist module is equipped with a dry-extrusion protection feature. When abnormal scenarios occur—such as extruder gear slippage, disconnected tubing, or filament run-out—causing the sensor to fail to detect the expected thrust (i.e., the deformation of the spring plate falls below a specific threshold), the system will identify the module as being in a dry-extrusion state. A protective shutdown will be triggered if this condition persists for more than 135 seconds.

### ¶ a. Improper placement of the external filament spool and excessive feeding resistance will cause the gear to slip

Check the position of the filament spool to confirm whether it is tilted or stuck, or whether the filament is pulled or bent, resulting in excessive resistance when it enter the assist module, and the extrusion gear cannot effectively bite the filament, resulting in slippage.

[imagen]

### ¶ b. The diameter of the TPU filament is too thin, and the gears cannot bite normally

Check the wire diameter of the TPU filament, if the diameter is obviously thin, it will cause the extruder gear to fail to engage the material line normally, and there will be continuous slippage, triggering the timeout logic.

### ¶ c.Confirm that the filament rotation direction is as shown in the figure below

Confirm that the filament rotation direction is consistent with the outlet direction to avoid additional resistance.

[imagen]

### ¶ d.There is debris or foreign matter inside the extruder

**Disassembly Tutorial**

Loosen the 8 fixing screws on the housing.

[imagen]

[imagen]

[imagen]

Remove the housing.

[imagen]

Loosen the 2 fixing screws on the circuit board.

[imagen]

Disconnect the motor cable.

[imagen]

[imagen]

Loosen the 2 screws on the extruder mounting block.

[imagen]

Then press the anti-loosening latch on the top of the connector to disconnect the Hall sensor cable.

[imagen]

Remove the extruder assembly.

[imagen]

**Cleaning Tutorial**

Loosen the 2 fixing screws on the filament outlet.

[imagen]

Remove the filament outlet.

[imagen]

Loosen the 3 fixing screws of the extruder, then remove the extruder.

[imagen]

Loosen the 4 fixing screws on the back cover of the extruder, then loosen the side clamping screws a few turns.

[imagen]

[imagen]

After removing the extruder back cover, clean any debris or foreign objects present on the gears.

[imagen]

[imagen]

[imagen]

**Installation Tutorial**

Adjust the positions of the shims and springs. Incorrect installation will prevent the module from feeding filament properly.

[imagen]

Install the extruder driven gear.

[imagen]

Then install the carburized steel drive gear and toolhead rear cover, and tighten the 4 fixing screws.

[imagen]

Place the extruder into the extruder bracket and tighten the 3 fixing screws.

[imagen]

[imagen]

Finally, install the TPU filament outlet.

[imagen]

For subsequent steps, please refer to the TPU Feed Assist Module Assembly & Usage Guide (/en/general/manual/tpu-feed-assist-module) to install the printed housing.

## ¶ 3. The assist module is unable to feed filament

TPU filaments are deformed and accumulated at the outlet and shrapnel of the assist module, resulting in the filaments being blocked and unable to be fed normally.

[imagen]

✅ **Solution:**

**1.** First, click the feed button to turn off the feed mode, and then click the unload button to turn on the unload mode to completely exit the deformed and clogged filaments in the module.

**2.** Replace the new TPU filament segment and recalibrate the module according to the Assist Module Calibration (/en/general/manual/tpu-feed-assist-module#tpu-feed-assist-module-calibration) steps.

**3.** After the calibration is completed, refer to the button instructions (/en/general/manual/tpu-feed-assist-module#description-of-key-functions) to reduce the assist gear in the feed mode to avoid the deformation of the filament due to excessive assistance.

## ¶ End Notes

>

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support ticket (https://bambulab.com/en/my/support/tickets/create) and include your recent printer logs and additional pictures or other details. Our technical team will review your request and provide detailed assistance.

You can also visit Bambu AI (https://support.bambulab.com/en?from=6&lang=en-us), which can instantly answer common questions and provide you with operational guidance.

>

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** wiki de Bambu Lab, aplicación Vue;
  el texto sale del `<template slot="contents">` del HTML servido. Los anclajes de
  encabezado (`#h-1-...`) se han eliminado; el texto es el del original. Los enlaces se
  conservan con su URL entre paréntesis y **no se ha descargado ninguno**.

- **Qué aporta esta fuente que las demás no tienen:** es la fuente del **síntoma de
  atasco**, y separa con claridad las tres causas que se confunden entre sí:
  1. **Causa de material**: «TPU isn't stiff enough to push the previous filament out
     the nozzle, so it jams» — un resto de filamento en la entrada del hotend no lo
     expulsa un TPU porque es demasiado blando. Y el caso explícito de
     **dureza insuficiente**: «TPU filament used is less than 85A hard, and the material
     is too soft to be properly engaged by the extruder gears, resulting in extrusion
     failure». Aquí el **85A es un umbral de engranaje**, no un número de temperatura.
  2. **Causa de máquina**: resistencia de extrusión excesiva por hotend obstruido o
     temperatura insuficiente; **resistencia en el tubo PTFE** por abolladuras,
     deformación o polvo de filamento acumulado (y el remedio: subir el nivel de
     engranaje del módulo o cambiar el tubo PTFE manteniendo su longitud); y
     **deslizamiento de engranajes** por carrete mal colocado, tirantez o diámetro
     de filamento demasiado fino.
  3. **Causa de ajuste/proceso**: la **protección de extrusión en seco** del módulo
     (apagado de seguridad a los **135 segundos**) y sus cuatro disparos: deslizamiento
     de engranaje, tubería desconectada, filamento agotado o dirección de rotación
     del carrete incorrecta.

- **Cifra de temperatura que aparece aquí y hay que citar con su fuente:** los
  **250 °C** como «standard temperature for loading TPU» (hotend a 250 °C para
  **cargar**, no para imprimir). No es una temperatura de impresión: es un requisito
  del proceso de carga. Conviene no mezclarla con la temperatura de impresión de
  TPU, que en las guías por serie es 225 °C.

- **Relación con la guía de TPU de Bambu (también en este lote):** esta página explica
  el **módulo TPU Feed Assist**, que la guía de TPU presenta como accesorio de mejora
  para H/X/P series. Aquí está el lado de los fallos. La guía de TPU dice que el
  módulo «reduces TPU feeding resistance… eliminates jams and breaks»; esta página
  dice que el módulo **también puede proteger el filamento de la deformación** y que
  hay que **reducir el engranaje del módulo en modo de alimentación** tras la
  calibración, precisamente para no deformarlo.

- **Lo que esta fuente NO dice:** no habla de la **dureza** más allá del umbral de
  85A, no da **temperatura de impresión**, no habla de **velocidad**, y no menciona
  el AMS. Todo eso está en las otras tres fuentes de Bambu de este lote.

- **La página enlaza a `/en/general/manual/tpu-feed-assist-module`**, que **sí** está
  bajo un prefijo permitido (`/en/general/`) pero **no se ha descargado**: este lote
  trae cinco páginas y ésa es una sexta. Si el cocinero necesita el procedimiento de
  montaje y las funciones del módulo (incluida la calibración a la que se remite dos
  veces aquí), hace falta un nuevo fichero del recolector. Queda pendiente.

- **Erratas y rarezas del original, conservadas:** «filament cannot be extruder»
  (falta la d), «when it enter the assist module» (en inglés sería "enters"), «The TPU
  power module» (por «feed assist»), «the official bambu Lab filament» con «bambu» en
  minúscula, y los `**` sueltos de «✅**Solutions**:». No se ha corregido nada.
- El texto original está en inglés y no lo he traducido.
