---
titulo: "Optimal enclosure temps for PLA, PETG, ABS?"
url: https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-06
autor: Jeremy Laurenson (y otros)
idioma: en
---

# Optimal enclosure temps for PLA, PETG, ABS?

**Jeremy Laurenson** (Active Member):
I have a PWM controller coming from Adafruit what I can control via python on a raspberry Pi 4 running Octoprint. Id like to set the optimal temps for each type of filament when I switch spools in filament manager...

What are the optimal environmental (enclosure) temps for each?

**Diem** (Illustrious Member):
Generally a little below bed temperature.

https://help.prusa3d.com/en/materials

But smaller, thinner models need less as rising air from the heated bed is sufficient.

**BogdanH** (Honorable Member):
I kindly disagree with that answer. I mean, how much is a "little below"?

Recommended bed temperature for PLA is about 60°C, however it's perfectly printable at room temperature (~22°C). PETG, which needs about 80°C for bed, will again print fine at room temperature. Ok, in case of PETG, for certain larger object it's prefered that we increase ambient temperature for about 10°C, to prevent warping. But in general, increasing temperature inside enclosure won't make prints better or make printing easier -it's enough that we ensure there's no draft.

Similar for high temperature filaments (ABS, ASA,...), where bed temperature above 90°C is needed. Temperature of about 40-50°C is just enough to prevent warping. If we go much higher than that, then there's a danger that printer's printed parts (made of PETG) will deform.

**Neophyl** (Illustrious Member):
I also disagree with the bed temp answer. Especially for PLA.

The hotend on the Prusa is a V6, is air cooled. Rated to around 40 degrees C. If your enclosure is too warm then that will badly degrade the cooling. However personal experience has shown that above 30 degrees ambient the hotend is more likely to suffer from heatcreep and therefore jams, especially with models that have lots of retractions. The filament just gets too soft to feed properly in some cases.

Now this wont be a problem with other filaments like ABS and controlling the temp for those make sense but for PLA you want it cool, 20-25c.

There are mods Ive seen that make the extruder fan air feed come from outside the enclosure but you are then venting it inside unless you also have an outlet pipe so thats a little messy.

Bogdans point about the printer parts being made of petg also softening is a good one too. Users who do a lot of high temp printing tend to reprint and rebuild their printers with higher temp materials.

**JustMe3D** (Honorable Member):
I don´t think this is correct as an overall advice, particularly since ABS is much much more difficult to print than ASA. Bed temp for ASA is max 60 degrees in an enclosure for industry-grade Spectrum ASA 275, and I get perfect surfaces with no warping whatsoever on the satin sheet. Higher temp will in my experience result in warping.

**Neophyl** (Illustrious Member):
None. My lack enclosure is heated by the bed. Its there to keep drafts away from the prints and keep dust away when not in use. For printing PLA the doors are open. I do have a thermometer/hygrometer and when printing in the winter its around 23-24c, in the summer its around 30c. For PETG I will close the doors and it will get up to around 30C now and in summer even when printing petg I will still crack the doors open a bit to keep it around that temp for the air cooling on the hotend.

**BogdanH** (Honorable Member):
There's no special settings needed if you print inside enclosure. That is, recommended settings given by filament manufacturer are still perfectly valid. In short: you use same settings (which depend on filament and print object) as you do without enclosure.

Why an enclosure then? Because temperature inside enclosure (ambient) will increase slightly (bed will warm-up surrounding air) and you also prevent draft, which will prevent warping (or layer separation). And that's pretty much all.

Having an enclosure is of great benefit if your room temperature (in winter) is kinda low (below 20°C). However, it can also make troubles in hot summer, because we need to properly cool printed layers during printing -and that can be problematic if temperature inside enclosure is too high.

**Ondrej Liptak** (Member):
I use K1 and mostly PETG with bed temperature at 70degC. I set the back fan /enclosure exhaust/ to start at 45degC temp. Seems to works good. The print needs around an hour to reach this enclosure temperature. Therefore I would recommend at least 20degC less than the bed.

**Artur5** (Honorable Member):
Using a Lack style enclosure, heated only by the bed, its very unlikely that you get temperatures above 45-50C, unless the room temp. is absurdly high to begin with.

For ASA, ABS, PC or PA, the higher the temperature inside the enclosure the better. For PLA, I agree with the advices in this thread, not below 20C but not above 30C either, specially with the Prusa stock heatbreak. Other hotends are more permissive (i.e. less prone to heat creep). For PETg I'd say anything between 20-40C is fine.

## Notas del recolector

- El hilo tiene 8 respuestas de varios usuarios con experiencia en enclosures.
- La respuesta de BogdanH (09/02/2022) es la más detallada: recomienda 40-50 °C para ABS/ASA, y menciona que para PETG se puede aumentar la temperatura ambiente unos 10 °C para prevenir warping.
- La respuesta de Neophyl (09/02/2022) es especialmente útil para PLA: recomienda 20-25 °C, y menciona que por encima de 30 °C el hotend V6 de Prusa sufre heat creep.
- La respuesta de Artur5 (25/03/2024) resume bien: para PLA no menos de 20 °C ni más de 30 °C, para PETG 20-40 °C, y para ABS/ASA/PC/PA cuanto más alto mejor.
- El texto original está en inglés y no lo he traducido.
