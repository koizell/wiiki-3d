---
titulo: "Adjusting settings for warping of PLA."
url: https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-03
autor: Zakalawe (hilo), Lichtjaeger, Peter M
idioma: en
---

Adjusting settings for warping of PLA.

Posted : 27/06/2019 10:52 am
Zakalawe (@zakalawe) — New Member

Pictures probably explains it best - I can't seem to stop this relatively simple
part (and similar ones) warping badly. (Print is stopped half way through, since
it was already loose from the bed at this point)

I've tried adding the brim, and decreasing the bed temperature down to 50 and then
40 degrees - this is with the Prusa PLA which prints fine in general. Even with the
brim, the part warps so much along the long axis, that it splits off from brim and
completely loses bed adhesion. (I can rock it back and forth on a flat surface)

Ambient temperature in the room is about 20 degrees.

In general my first layer adhesion is good - PEI smooth plate, cleaned before the
print with IPA - but larger solid parts like this often exhibit this kind of
warping.

Longer term I will setup an enclosure to keep the ambient temperature higher which
I suspect would make the most difference, but any other suggestions would help.
Google suggested a brim, lower bed temp, and slower print speed, none of which
helped so far.

(Using a three-layer raft did help, but that made for a nasty surface finish on the
part, and seems like rather overkill to fix this)

Reply

Posted : 27/06/2019 11:17 am
Lichtjaeger (@lichtjaeger) — Noble Member

RE: Adjusting settings for warping of PLA.

From the gaps in your brim, I can say you can go a bit lower with your first layer
height.

For a cleaned bed, the bed in your picture looks dirty. Try to wash it with soap
water and wipe it with acetone (once a month).

You should set your bed temperature higher and not lower (max 65°C).

Here some tips to reduce warping:

SLICER SETTING ADJUSTMENTS
The following are settings in your slicer that can be adjusted to help improve
adhesion.

1. Brim
A brim is an extra layer of print attached to the base of your object to increase
the surface area in contact with the bed, which improves adhesion.

2. Increase Layer Height
Increasing the thickness of your first layer has the effect of smoothing out any
inconsistency in the bed and is part of the object itself.

3. Increase Layer Width
Printing wider layers helps to ensure that there are no air gaps in between the
beads of plastic.

4. Reduce amount of Bottom Layers
Sometimes, a large amount of first layers can increase chance of warping as the
extra layers add more warp stress to the bottom layer.

5. Reduce Infill
Similar to reducing the amount of first layers, decreasing the amount of plastic
inside your print (infill) will reduce the warping stresses in the object.

6. Rounded Corners
Sharp angles can be more prone to warping. By adding a filleted edge (a rounded
corner) on the Z axis, you increase the amount of contact that the print has with
the surface, decreasing its chance of lifting from the bed.

7. Use a Raft
A raft acts as a base for the print, ideal if the print isn't adhering to the bed
surface. However rafts are not always easy to remove.

Reply

Posted : 27/06/2019 12:59 pm
Zakalawe (@zakalawe) — Topic starter

RE: Adjusting settings for warping of PLA.

Thanks, I increased the bed temperature and chamfered the edges of the shape in
Fusion, that seemed to make a big difference.

Reply

Posted : 28/06/2019 4:52 am
— (@) — Illustrious Member

RE: Adjusting settings for warping of PLA.

By the looks of the bed, soap and hot water is your best choice... but you might
want to do an alcohol scrub first to get the old PLA residue off.

Alcohol rinse: every few prints

Once in a while, an alcohol rinse is helpful to remove PLA residue. It does not
remove finger oils well.

Hot Water wash: often, as needed, and after any of the above

Handle the bed only by the edges.

Reply

Posted : 30/06/2019 7:05 am
Peter M (@peter-m) — Noble Member

RE: Adjusting settings for warping of PLA.

First layer must be perfect.

Cleaning is very important.

If still not good, use glue sick.

Use a brim attache to model

If i print a big square model i always use a glue stick.

first layer hotter.

## Notas del recolector

- Hilo del foro oficial de Prusa, en el subforo "How do I print this? (Printing
  help)". 5 posts, del 27/06/2019 al 30/06/2019.
- Es el hilo con el antes y el después más claro del lote: quien abrió el tema probó
  cama a 50 °C y luego a 40 °C y no funcionó; la respuesta dice lo contrario (más
  alta, máx. 65 °C) y quien abrió el tema confirma que subir la temperatura de cama
  y chaflanar las aristas fue lo que cambió el resultado. El raft de tres capas
  también le funcionó, con mala superficie.
- Contradice lo que recomienda la Knowledge Base de Prusa en el punto "Use the brim"
  y coincide con Bambu en "+5-10 °C de cama" y en esquinas redondeadas o
  chaflanadas.
- Un usuario usa como nombre un guion, no es un fallo de extracción.
- Se han dejado fuera la navegación del foro, los menús y las estadísticas. El
  texto de los posts sí es literal, con sus erratas ("glue sick", "brim attache").
- No se ha traducido nada.