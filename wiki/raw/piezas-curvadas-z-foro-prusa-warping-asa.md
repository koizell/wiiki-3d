---
titulo: "Persistent warping with large ASA prints – what else can I try?"
url: https://forum.prusa3d.com/forum/english-forum-original-prusa-i3-mk4s-how-do-i-print-this/persistent-warping-with-large-asa-prints-what-else-can-i-try/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-16
autor: Aleksander Zieleniewski
idioma: en
---

# Persistent warping with large ASA prints – what else can I try?

**Aleksander Zieleniewski** (Member):

Hi everyone,

I'm having a recurring issue with warping when printing large objects using Prusament ASA on my Prusa printer MK4. Even though the printer is inside an enclosure (which I keep closed throughout the entire print), the corners of my prints consistently lift, ruining the geometry of the part.

My current setup:

Material: Prusament ASA.

Environment: Enclosed in a cabinet (no drafts).

Settings: *Nozzle: 260°C, Bed: 105°C.

Brim: 8 mm.

Draft Shield: Enabled.

Cooling: Disabled.

Surface: Satin sheet cleaned with IPA.

Despite these precautions, the internal stresses in the material are too high for large, flat parts, and the corners lift off the bed.

Do you have any proven tips for managing ASA shrinkage? Should I increase the brim size, or are there other adjustments I should consider?

Any advice would be greatly appreciated!

---

**UjinDesign** (Reputable Member):

You could try letting the enclosure heat up a bit first before starting the print, so the chamber temperature is higher. If you're doing this with the heated bed, remember that it automatically shuts off after 30 mins of inactivity to save power.

You could also use some sort of bed adhesive, although I haven't tried this with ASA myself.

---

**Aleksander Zieleniewski** (Member):

I tried and didn't help. Any ideas?

---

**Mike B** (Estimable Member):

Can you introduce stress relief features into your design? For a long straight wall, vertical "ribs" or "indents", or holes in the wall, can provide a way to relieve the stresses. Rounding vertical corners also appears to help, and avoiding chamfers/fillets on bottom edges helps too. Gyroid infill is less prone to warping, and less infill is better for this too.

All of these suggestions depend on your print requirements though. Not all prints can take advantage of these.

Prusa MK4 since Jan 2024, MK4S/MMU3 since Jan 2025, Printables: @MikeB_1505898

---

**Aleksander Zieleniewski** (Member):

Maybe it will help i wanted print this model.

[Image: model]

## Notas del recolector

- El hilo tiene 4 respuestas. La de Mike B (04/03/2026) es la más útil: describe técnicas de diseño para aliviar tensiones internas (ribs, indents, holes, rounding corners, avoiding chamfers/fillets on bottom edges, gyroid infill, less infill).
- El hilo trata sobre warping en ASA, no específicamente sobre Z-wobble, pero las técnicas de alivio de tensiones son relevantes para piezas curvadas en Z.
- El texto original está en inglés y no ha sido traducido.
- Foro oficial de Prusa, fuente primaria de la comunidad.
