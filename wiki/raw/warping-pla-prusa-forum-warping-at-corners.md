---
titulo: "Warping at corners"
url: https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-03
autor: Elias Spors (hilo), Diem, Neophyl, RoboTrooper
idioma: en
---

Warping at corners

Posted : 29/11/2024 9:04 am
Elias Spors (@elias-spors) — Member

Hey!

Does anyone happen to know what is causing this weird corner warping on my prints?
I'm using a Prusa Mini with standard PLA. The settings are mostly standard, except
the bottom layer infill overlap is at 35% and infill is at 20%. I tried to round off
the 90°-corners with 3mm radii but the crinkles remained. This printer used to work
just fine on features like this.

I also tried to increasing the perimeter count, also with no effect.

Thanks in advance!

Reply

Posted : 29/11/2024 11:13 am
Diem (@diem) — Illustrious Member

RE: Warping at corners

The imediate cause of warping is thermal contraction of long runs of filament so
first protect your printer from drafts. (and beware aircon outlets)

Lowered adhesion also contributes so make sure the print sheet is scrupulously
clean and consider adding brim or mouse-ears.

Directed stresses from long runs of infill are another source - grid is one of the
worst; I would try cubic fill, failing that gyroid, or better 'though it will shake
the printer - 3D Honeycomb.

With larger prints than yours it can pay to insert voids in the prints to break the
run, or 'decorative' slots to make expansion breaks -----^----- like this; they may
need to be staggered to reduce weakpoints.

Reply

Posted : 29/11/2024 5:00 pm
Neophyl (@neophyl) — Illustrious Member

RE: Warping at corners

Except from those pics it doesnt look like what we would call warping. Warping
corners is when it bows upwards from the bed as Diem describes. This causes
compression of the layers and usually a rough surface on the top where its warped
up.

Those pics just look like the under extrusion and gaps at the seams caused by the
recent firmware/prusa slicer changes that many have reported and been complaining
about.

There are plenty of existing posts about it on here for example
https://forum.prusa3d.com/forum/input-shaper-mini/under-extrusion-or-gaps-at-seams-with-input-shaper-settings-and-5-x-firmware/
and the github issue reporting it with many people posting
https://github.com/prusa3d/PrusaSlicer/issues/11914

Reply

Posted : 29/11/2024 6:59 pm
Elias Spors (@elias-spors) — Topic starter

RE: Warping at corners

The weird thing is that I had lots of prints with no issues similar to this one
recently. So I figured it would be about the model itself or the new PLA spool I
used. Could it be something about the filament or nozzle temperature?

Reply

Posted : 30/11/2024 12:21 pm
Diem (@diem) — Illustrious Member

RE:

I wondered about that too @neophyl, there is very little first-layer corner
distortion (drop a pic into a graphics prog and offer up a straight line, there is
slight deviation) - however there is enough top surface effect to suggest some
warping is involved, perhaps with print sheet lifting. It may well be compounded by
other factors. It may be worth the OP's while to reprint at a much lower speed to
rule out some of the effects that accompany some of the tweaks for high-speed
presets.

It is unlikely to be filament or temperature related.

Reply

Posted : 24/03/2025 4:40 pm
RoboTrooper (@robotrooper) — Member

RE: Warping at corners

You may also want to consider enabling brim, unless you've already tried that.

## Notas del recolector

- Hilo del foro oficial de Prusa, 6 posts, del 29/11/2024 al 24/03/2025.
- Es el hilo más directamente sobre "PLA que se levanta por las esquinas", y aporta
  el matiz de Neophyl: lo que parecía warping en este caso concreto era
  under-extrusion y juntas por los cambios de firmware y PrusaSlicer, con un enlace
  a la issue de PrusaSlicer #11914. La respuesta de Diem explica cómo distinguirlo:
  el warping real levanta la pieza en arco y deja superficie rugosa arriba.
- Datos concretos de quien abrió el tema: Prusa MINI, PLA estándar, solape de
  infill del 35 % en la capa inferior, infill al 20 %, radios de 3 mm en las esquinas
  de 90° probados sin éxito, más perímetros extra sin efecto. Diem descarta que sea
  filamento o temperatura.
- Propone mouse-ears y patrones de relleno cubic, gyroid o 3D Honeycomb, y abrir
  huecos decorativos para romper tiradas largas. Nada de esto coincide con lo que
  dice Bambu, que sí recomienda Gyroid; el redactor tendrá que explicar el matiz en
  vez de elegir uno.
- Se han dejado fuera la navegación del foro, el panel de posts recientes y las
  estadísticas. El texto de los posts sí es literal, con sus erratas ("imediate",
  "doesnt").
- No se ha traducido nada.