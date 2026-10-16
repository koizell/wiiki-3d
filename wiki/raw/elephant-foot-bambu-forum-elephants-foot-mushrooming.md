---
titulo: "Elephant's foot? Mushrooming?"
url: https://forum.bambulab.com/t/elephants-foot-mushrooming/110247
sitio: forum.bambulab.com
tipo: foro
capturado: 2026-10-16
autor: C_G_Creations (hilo) + respuestas de la comunidad Bambu Lab
idioma: en
---

Elephant's foot? Mushrooming? - Troubleshooting - Bambu Lab Community Forum

I am trying to print a round, 2.5" medallion, 1/4" thick. It looks great except for the top and bottom sides are swelled out, as in the picture. I am thinking there is an easy fix, but I am drawing a blank.

Printer: P1S, doors and vents open.
Filament: EPAX High Speed PLA, color is Burnt Titanium (glittery).
Settings: 0.20mm Standard Preset

EDIT: I missed a couple changes to the preset I will put those changes below. I should have mentioned temps and build plate prep.

Bed Prep: Dawn Dish Soap under hot water, after the print dries on PEI High Temp build plate.

No brim used.

I dried this for 6 hours at 45°C with Desiccant inside.

I used Arachne wall generator. Outer wall set for 3x. Speeds: Outer Wall 200 mm/s, Inner Wall 200 mm/s, MAX Volumetric speed 23 mm³/s. Temp tower said 215°C for heat bed was set for 55 °C across the board. PLA bought and opened 3/2024 and kept in filament dry box.

## Respuestas del hilo (resumen de los posts tal como aparecen en la página)

Reply #2 — ElektroQuark (likes 3):
It looks like you have warping and as the external perimeter of the medallion goes up there is a build up of material in the top perimeter.

Reply #3 — SailDesign (likes 1):
Try printing it solid, so there is no difference between the ends and the middle. I think you have differential shrinkage because of the infill versus solid top and bottom.
If it doesn't help, then at least you've eliminated one possibility.

Reply #4 — JonRaymond (likes 1):
Second vote for warping being the issue. You can visually see the part lifting off of the bed in your picture. Start with thoroughly cleaning your build plate with dish soap and hot water.

Reply #5 — C_G_Creations:
I was trying to avoid a Brim, as to its cleanup. As to both your reply and @JonRaymond I had cleaned with dish soap and water, and have currently tried IPA. I wonder if moving the bed temp (this was at 55 across the board) up or down would have an effect so I will try 60 °C and see if it helps at least...

Reply #6 — C_G_Creations:
So is your suggestion to take off the top and bottom layers as an experiment?

Reply #7 — C_G_Creations:
I edited the OP to reflect changes I missed/forgot to add.

Reply #8 — SailDesign:
No - go with solid (100%) infill.

Reply #9 — EnoTheThracian (likes 2):
Yeah, that looks like warping.
[...] (about drying) That is neither long nor warm enough. Give it more time and heat. Warping/Curling is one of the nastier moist filament indicators. (Filament Drying Recommendations | Bambu Lab Wiki)
(about bed temp / high speed PLA) ...

Reply #10 — SailDesign (likes 1):
Here's a 2" x 1/4" disc, printed using what was on the machine (BL Matte Dark Red) that has been there for a week, humidity around 65% in the room right now although it was higher during the day...
0.2mm standard, concentric solid infill, top and bottom rectilinear as always. I see no distortion.

Reply #12 — NestoriusBIG:
Hi there,
I am trying to improve a similar issue. My part is a half cylinder shell with covers on the top and bottom and a horizontal wall in the middle.

It seems to me like when a layer comes along that takes longer to print the previous layer(s) cool and shrink more creating an even shift across the whole part, so the newer layers end up larger than the previous ones by around 0.2mm.

Reply #13 — NestoriusBIG:
Following up with a couple of pictures that show the issue, any suggestions are highly appreciated.

Reply #14 — TheMistic12:
Hi there. Have you designed that model yourself?

Reply #15 — C_G_Creations:
Sorry didn't see this, are you asking of my specific issue in the OP, or the second one from @NestoriusBIG?
Unlike several folks on various forums, I have no issue with a "hijack" ... In fact I not only welcome it, but I appreciate it. We come here to learn.

Reply #16 — WSDesEng:
What Firmware version you are running?
I had equal problems out of nowhere after upgrade to 01.07.00.00
Then I worked out all I could, but could not fix it. Some parts were fine, some not (always the same issue like you). I then downgraded back to 01.06... the latest one before the 07.

## Notas del recolector

- URL comprobada: 200. Foro Discourse de Bambu Lab; la página renderiza client-side pero incluye el contenido de los posts en el bloque JSON-LD (QAPage) y en el HTML inicial. Se ha extraído de ahí, no se ha intentado "navegar" el foro.
- Hilo útil sobre todo por los matices: la tumefacción lateral del borde (“top and bottom swelled”) se confunde visualmente con elephant foot + warping + contracción diferencial por infill vs capas sólidas. Tres usuarios distintos atribuyen el problema a warping/acabado por humedad y encogimiento diferencial, no a compresión de primera capa.
- Aporta un dato numérico: el autor midió desplazamiento de ~0,2 mm en capas posteriores por enfriamiento/encogimiento; y un ejemplo con cama a 55 °C (que pensó subir a 60 °C) —un experimento en la dirección contraria a bajar la cama, y por eso vale como contrapunto.
- Menciona cambios de firmware (01.07.00.00 introduciendo el defecto, reversión a 01.06.x) como causa posible—no es una causa de elefante foot pero sí de primera capa inconsistente.
- Varios posts elogian limpieza de placa con agua y jabón y secado de filamento; relevante porque el hilo mismo dice que el problema no se resolvió solo por eso.
- Sólo las primeras respuestas son visibles sin login y el hilo es largo (16 respuestas visibles en el JSON-LD); se ha capturado lo que cargó en el HTML inicial, que son todas las respuestas del bloque structured-data.
- El texto original está en inglés y yo no lo he traducido.
- Imágenes del hilo no se han descargado; se menciona su existencia.
