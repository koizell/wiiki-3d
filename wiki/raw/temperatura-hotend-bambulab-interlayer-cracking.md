---
titulo: "Model interlayer cracking | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-08
autor: Bambu Lab
idioma: en
---

# Model interlayer cracking | Bambu Lab Wiki

¶ Interlayer Cracking
When the interlayer adhesion of a model is insufficient and the material shrinkage is significant, cracks may appear on the printed part along the Z direction. This issue is common during printing with materials such as ABS, ASA, PC, PET-CF, and PA-CF, as shown in the figure below:

¶ Improvement Methods
¶ Unclog the Nozzle
A slight nozzle clog may prevent filament extrusion during a specific layer, manifesting similarly to cracking.


Unclog the Nozzle
Refer to the nozzle unclogging tutorials for cold pull maintenance.
H2D Nozzle Unclogging Tutorial
H2C Nozzle Unclogging Tutorial
H2S Nozzle Unclogging Tutorial
A Series Nozzle Unclogging Tutorial
X1/P1 Nozzle Unclogging Tutorial


Appropriately Increase Nozzle Temperature or Decrease Print Speed
This method allows the extruded filament more time to bond with the layer below, thereby improving interlayer adhesion. For example, with ABS, you can reduce the inner wall speed to 150 mm/s and the outer wall speed to 100 mm/s.



Reduce the Part Cooling Fan Speed
Preview the fan speed after slicing the model. If the fan speed for the inner and outer walls is 60% as shown below, reduce the "Max fan speed".


Appropriately Increase the Heatbed Temperature by 5-10°C. If the device has active chamber heating, increase the chamber temperature by 5°C.



¶ End Notes

We hope this guide has provided clear and practical support.
If the issue remains unresolved, please submit a support ticket and include your recent printer logs and additional pictures or other details. Our technical team will review your request and provide detailed assistance.
You can also visit Bambu AI, which can instantly answer common questions and provide you with operational guidance.

## Notas del recolector

- El artículo está dentro del dominio autorizado (`/en/filament-acc/`).
- Es la fuente más relevante para el tema: da el efecto de la temperatura de boquilla en la unión entre capas con un ejemplo concreto (ABS, velocidades de 150/100 mm/s).
- El artículo menciona que "When the interlayer adhesion of a model is insufficient and the material shrinkage is significant, cracks may appear on the printed part along the Z direction", lo cual es útil para el diferencial de la guía.
- El artículo también menciona otras causas de cracking intercapa (nozzle clog, part cooling fan, heatbed temperature), lo cual es útil para el diferencial.
- El texto original está en inglés y no ha sido traducido.
- El artículo no da un rango de temperatura numérico para la boquilla; solo dice "Appropriately Increase Nozzle Temperature".
