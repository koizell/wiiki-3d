---
titulo: "Stringing or Oozing – Print Quality Troubleshooting Guide"
url: https://www.simplify3d.com/support/print-quality-troubleshooting/stringing-or-oozing/
sitio: simplify3d.com
tipo: oficial
capturado: 2026-10-18
autor: Simplify3D
idioma: en
---

# Stringing or Oozing

Stringing (otherwise known as oozing, whiskers, or "hairy" prints) occurs when small strings of plastic are left behind on a 3D printed model. This is typically due to plastic oozing out of the nozzle while the extruder is moving to a new location. Thankfully, there are several settings within Simplify3D that can help with this issue. The most common setting that is used to combat excessive stringing is something that is known as retraction. If retraction is enabled, when the extruder is done printing one section of your model, the filament will be pulled backwards into the nozzle to act as a countermeasure against oozing. When it is time to begin printing again, the filament will be pushed back into the nozzle so that plastic once again begins extruding from the tip. To ensure retraction is enabled, click "Edit Process Settings" and click on the Extruder tab. Ensure that the retraction option is enabled for each of your extruders. In the sections below, we will discuss the important retraction settings as well as several other settings that can be used to combat stringing, such as the extruder temperature settings.

## Common Solutions

### Retraction distance

The most important retraction setting is the retraction distance. This determines how much plastic is pulled out of the nozzle. In general, the more plastic that is retracted from the nozzle, the less likely the nozzle is to ooze while moving. Most direct-drive extruders only require a retraction distance of 0.5-2.0mm, while some Bowden extruders may require a retraction distance as high as 15mm due to the longer distance between the extruder drive gear and the heated nozzle. If you encounter stringing with your prints, try increasing the retraction distance by 1mm and test again to see if the performance improves.

### Retraction speed

The next retraction setting that you should check is the retraction speed. This determines how fast the filament is retracted from the nozzle. If you retract too slowly, the plastic will slowly ooze down through the nozzle and may start leaking before the extruder is done moving to its new destination. If you retract too quickly, the filament may separate from the hot plastic inside the nozzle, or the quick movement of the drive gear may even grind away pieces of your filament. There is usually a sweet spot somewhere between 1200-6000 mm/min (20-100 mm/s) where retraction performs best. Thankfully, Simplify3D has already provided many pre-configured profiles that can give you a starting point for what retraction speed works best, but the ideal value can vary depending on the material that you are using, so you may want to experiment to see if different speeds decrease the amount of stringing that you see.

### Temperature is too high

Once you have checked your retraction settings, the next most common cause for excessive stringing is the extruder temperature. If the temperature is too high, the plastic inside the nozzle will become less viscous and will leak out of the nozzle much more easily. However, if the temperature is too low, the plastic will still be somewhat solid and will have difficulty extruding from the nozzle. If you feel you have the correct retraction settings, but you are still encountering these issues, try decreasing your extruder temperature by 5-10 degrees. This can have a significant impact on the final print quality. You can adjust these settings by clicking "Edit Process Settings" and selecting the Temperature tab. Select your extruder from the list on the left, and then double-click on the temperature setpoint you wish to edit.

### Long movements over open spaces

As we discussed above, stringing occurs when the extruder is moving between two different locations, and during that move, plastic starts to ooze out of the nozzle. The length of this movement can have a large impact on how much oozing takes place. Short moves may be quick enough that the plastic does not have time to ooze out of the nozzle. However, long movements are much more likely to create strings. Thankfully, Simplify3D includes an extremely useful feature that can help minimize the length of these movements. The software is smart enough that it can automatically adjust the travel path to make sure that nozzle has a very short distance to travel over an open space. In fact, in many cases, the software may be able to find a travel path that avoids crossing an open space all together! This means that there is no possibility to create a string, because the nozzle will always be on top of the solid plastic and will never travel outside the part. To use this feature, click on the Advanced tab and enable the "Avoid crossing outline for travel movement" option.

### Movement Speed

Finally, you may also find that increasing the movement speed of your machine can also reduce the amount of time that the extruder can ooze when moving between parts. You can verify what movement speeds your machine is using by clicking on the Speeds tab of your process settings. The X/Y Axis Movement Speed represents the side-to-side travel speed, and is frequently directly related to the amount of time your extruder spends moving over open air. If your machine can handle moving at higher speeds, you may find that increasing this settings can also reduce stringing between parts.

## Notas del recolector

- Guía oficial de Simplify3D para diagnosticar stringing/oozing.
- Proporciona valores concretos: retracción 0.5-2.0mm (direct drive), hasta 15mm (Bowden); velocidad de retracción 1200-6000 mm/min (20-100 mm/s); reducir temperatura 5-10 °C.
- Menciona la opción "Avoid crossing outline for travel movement" y el aumento de velocidad de travel como estrategias adicionales.
- No menciona coasting ni wipe explícitamente; se centra en retracción, temperatura y velocidad de movimiento.
