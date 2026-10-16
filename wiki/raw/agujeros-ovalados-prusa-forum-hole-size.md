---
titulo: "Foro Prusa3D – Hole size compensation (PrusaSlicer)"
url: https://forum.prusa3d.com/forum/prusaslicer/hole-size-compensation/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-16
autor: Varios (ed brakus, Diem, FoxRun3D, Golf League Tracker)
idioma: en
---

# Hole size compensation – PrusaSlicer – Prusa3D Forum

## ed brakus (@ed-brakus) — Member — Posted: 09/06/2023 3:57 pm

I have a lot of CAD designed items for printing. These interoperate with non-printed mechanical parts, so I need to keep the CAD designs true, rather than compensating in the CAD design for holes printing smaller than per-design.

I've tried hole compensation in other slicers and while I am able to dial in the size I need, doing so always introduces other artifacts that are problematic.

I tried the XY size compensation in Prusa Slicer but this seems to impact everything not just holes. There are other things to tweak in the print settings but I'm starting to suspect I'll pay a price for anything, and that this is just not the best layer in the workflow for hole size compensation.

Wondering if any of you have worked out a clever trick for this, like maybe some automated pre-processing step after CAD but before slicing.

I dont want to manually edit a second set of design docs every time a make a change, I would. bleed out on that.

Thanks.

## Diem (@diem) — Illustrious Member — Posted: 09/06/2023 11:51 pm

Just make the hole settings parametric and set a conditional for additive/subtractive implementation; then calibrate for the working values.

Cheerio,

## FoxRun3D (@foxrun3d) — Illustrious Member — Posted: 10/06/2023 12:59 am

There's no simply trick, just try and error. Too much dependent on geometry, printer tolerances, and material properties.

Formerly known on this forum as @fuchsr -- https://foxrun3d.com/

## ed brakus (@ed-brakus) — Topic starter — Posted: 10/06/2023 1:11 am

I had to dig into that a little bit since some of it was unfamiliar, but it was exactly the sort of thing I've been looking for. Thanks for the help, I really appreciate it.

Cheers

_E

## Golf League Tracker (@golf-league-tracker) — Member — Posted: 19/03/2024 2:25 pm

"Just make the hole settings parametric and set a conditional for additive/subtractive implementation; then calibrate for the working values."

The problem with this is that if you're designing a model to be uploaded to printables or thingiverse, you want your model to be dimensionally accurate, and not modeled for your specific printer setup. This needs to be an adjustment a user makes.

Or take the situation where you have two different printers which have different tolerances. Now you have to adjust the model to each printer. Not a good solution.

## Diem (@diem) — Posted: 20/03/2024 3:51 am

designing a model to be uploaded to printables or thingiverse,

It's no longer worth uploading, the effort required properly to test and document a part is wasted.

But if he calibrations are parametric the user can recalibrate...

two different printers which have different tolerances

Again, parametric recalibration addresses the issue.

Cheerio,

---

Related Topics:
- XY compensation: isn't it quite incomplete ? (6 years ago)

Topic Tags: hole compensation (2)

## Notas del recolector

- Hilo oficial del foro de Prusa (foro.prusa3d.com), sección PrusaSlicer. Seis respuestas entre el 09/06/2023 y el 20/03/2024.
- El hilo parte de una pregunta concreta: el usuario quiere mantener el CAD «fiel» y compensar solo en el slicer, porque no quiere duplicar documentos de diseño; y se queja de que el XY size compensation de PrusaSlicer «impacta todo, no solo los agujeros».
- Las respuestas convergen en que no hay un truco único: depende de la geometría, las tolerancias de la impresora y el material; la vía propuesta es calibrar con parámetros y condicionales en el CAD (enfoque aditivo/sustractivo).
- Hay un punto de tensión útil para el cocinero: diseñar el modelo con tolerancias «de impresora» penaliza a quien lo comparte o lo imprime en otra máquina; la compensación debe ser una decisión del usuario/imprimidor, no del modelo.
- El texto original está en inglés y no se ha traducido.
