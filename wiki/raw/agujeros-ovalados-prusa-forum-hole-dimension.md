---
titulo: "Foro Prusa3D – hole dimension compensation (PrusaSlicer): agujeros pequeños, contracción y agujeros elípticos"
url: https://forum.prusa3d.com/forum/prusaslicer/hole-dimension-compensation/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-16
autor: Varios (VH, Diem, FoxRun3D, Swiss_Cheese, Sebastian, gigiga, Robin, george)
idioma: en
---

# hole dimension compensation – PrusaSlicer – Prusa3D Forum

## VH (@vh) — New Member — Posted: 29/07/2022 12:59 pm

How to compensate the diameter of the hole? A circular hole with a diameter of 10 mm has an actual dimension of 9.7 mm, and the smaller the hole, the greater the deviation of the actual diameter from the desired diameter. It is related to the volume of material extruded into the annulus, where the inner side of the annulus has a smaller volume than the outer side, which sticks to the previous filament trace and thus the inner side must have a smaller diameter.

VH

## Diem (@diem) — Illustrious Member — Posted: 29/07/2022 2:02 pm

That's right. If it matters, calibrate.

Cheerio,

## FoxRun3D (@foxrun3d) — Illustrious Member — Posted: 29/07/2022 2:19 pm

Or drill it out.

Formerly known on this forum as @fuchsr -- https://foxrun3d.com/

## Swiss_Cheese (@swiss_cheese) — Noble Member — Posted: 29/07/2022 3:34 pm

What these two gentlemen said, and Ill add, don't forget about shrinkage, and that will be different for different materials and how they are applied.

Hopefully not a spammer.

Swiss_Cheese

## Sebastian (kaT...) (@sebastian-katues) — New Member — Posted: 22/02/2023 1:00 pm

Material or printer calibration affects external dimensions, internal holes are still smaller by 0.2 or 0.3 mm, I tested it on different materials (Prusament, fiberlogy or Print-Me).

Drilling out is OK, but if I have holes to which I have to add example a round part during printing, it doesn't work. I have to project the enlarged dimension in the CAD.

SuperSilcer has a parametr that enables set hole compensation (hole_size_compensation) it works great, it would be nice to have this option in PrusaSilcer 🙂

## gigiga (@gigiga) — Active Member — Posted: 11/03/2024 7:02 am

Often wondered that myself if there isn't a "simple" hole size compensation like described in Super Slicer. Does it also make the holes round? Depending on orientation a circular hole always comes out as ellipsis. Drilling is a solution, but sometimes not as accurate.

## Robin (@robin) — Noble Member — Posted: 11/03/2024 12:24 pm

Posted by: @gigiga
Often wondered that myself if there isn't a "simple" hole size compensation like described in Super Slicer. Does it also make the holes round? Depending on orientation a circular hole always comes out as ellipsis. Drilling is a solution, but sometimes not as accurate.

Because it's not a simple problem. It's best to take care of designing the holes for 3d-printing from the beginning. Have a look at:

If at first you don't succeed, skydiving is not for you. Find out why this is pinned in the general section!

## george (@george-7) — Trusted Member — Posted: 11/03/2024 8:00 pm

Ran in to this the first time I printed something with a hole.

My "workaround" is to print a test piece with the size of the hole I want with increments added until I get the size I want.

Doing it now for an led light that has a very small edge on the face of the light. to big a hole and it would go right through.

The threaded part of the light measured at 5.72 mm's. The size of the hole that it actually fit thru was 6mm. Filament is pla.

## Notas del recolector

- Hilo oficial del foro de Prusa (foro.prusa3d.com), sección PrusaSlicer. Ocho respuestas entre el 29/07/2022 y el 11/03/2024.
- Es la fuente que aporta el dato cuantitativo más repetido: los agujeros internos salen 0.2–0.3 mm más pequeños tras calibrar la impresora y el material; el OP reporta 10 mm nominales → 9.7 mm reales, con mayor desviación cuanto más pequeño es el agujero.
- El OP ofrece una explicación física del fenómeno: el lado interior del anillo tiene menos volumen que el exterior y se pega a la huella previa, así que el diámetro interior sale menor.
- gigiga plantea la cuestión de la **elipse**: «según la orientación, un agujero circular siempre sale elíptico», lo que conecta la orientación con la exactitud del agujero; Robin responde que no es un problema simple y que conviene diseñar los agujeros para impresión 3D desde el principio.
- Sebastian cita que SuperSlicer tiene un parámetro específico de compensación de agujeros (`hole_size_compensation`) y que echa de menos ese ajuste en PrusaSlicer; también da el ejemplo práctico de un tornillo roscado de 5.72 mm que encaja en un agujero impreso de 6 mm (PLA).
- El texto original está en inglés y no se ha traducido.
