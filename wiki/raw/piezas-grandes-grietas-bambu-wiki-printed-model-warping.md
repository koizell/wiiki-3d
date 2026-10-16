---
titulo: "Printed Model Warping: Causes and Solutions"
url: https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab
idioma: en
---

Printed model warping

In the example below, the corner of the model has warped

Related wiki links:

Model Warping, Falling Off, or Collapsing
Tips for using discs to preventing warping

Potential causes and solutions

1. Heatbed temperature set too low / Incorrect Plate Type

One of the most common mistakes that lead to models warping or getting loose from
the heatbed is having an incorrect heatbed temperature for your filament, or an
incorrectly selected plate type.

The same material is usually printed at different heatbed temperatures depending
on the build plate. Selecting the wrong build plate type may result in insufficient
adhesion, because the heatbed temperature used for printing is too low. In
addition, since the Textured PEI Plate has a granular surface, the printer lowers
the nozzle by 0.04 mm after heatbed leveling to ensure first-layer adhesion. If you
print on a Textured PEI Plate but select a different build plate type when slicing,
the nozzle height will be too high, which affects first-layer adhesion.

Selecting the correct plate type according to the filament used, while also
ensuring the plate is clean before starting a print will give you the best chances
of success when printing.

2. Part cooling fans set too high

Most of the time, PLA can benefit from as much cooling as possible when printing
fast. But there can be situations where too much cooling is applied to a model
leading to warping.

The Bambu Studio filament profiles are fine-tuned for best results for each type of
filament, and should work as expected.

If you encounter warping, we recommend double checking the Cooling tab, under the
Filament Settings:

One of the most important setting to change when it comes to warping is the No
cooling for the first X layers option. Ideally, you should have no cooling for the
first 3 layers on most common filaments (PLA, PETG, TPU, etc)

This will ensure the best adhesion and slow cooling of the printed layers to avoid
warping and a print failure.

We also recommend adjusting the Auxiliary part cooling fan if needed, by lowering
it to about 40-50%.

The filament which benefits the most from a higher Auxiliary part cooling fan speed
is PLA, but this mostly applies on small objects or models that have high
overhangs.

If you encounter warping of the printed models, lowering the fan speed of this
Auxiliary cooling fan could help.

3. Environmental temperature is too low

Common filaments that exhibit warping easier than PLA are PETG, ABS, ASA, PA, PC.

Most of the time, the warping appears due to the fast cooling of the printed layers
which generates stress forces between the layers.

These higher temperature materials are usually printed with less to no part cooling
in an enclosed 3D printer, for the environmental tempearture around the part to be
higher and allow slow cooling of the model.

If you print some of these filaments on a printer which is not enclosed, like the
A1, warping can be common because the temperature around the model will be the same
as your room temperature.

If the room where the printer is used is under 20C, warping issues occur even with
PLA and PETG filaments which are more forgiving.

In situations like this, it's best to ensure a higher heatbed temperature (+10C) to
give the model a better chance of success by slowing down the cooling between the
printed layers and ensure there are no drafts of air around the printer.

Air drafts can cool the model faster, increasing layer bonding tension and leading
to filament warping.

4. Large model size and high infill density

Large model size and high infill density - If the prints size is large and the
infill density is set high, e.g. 60% (default is 15%), and warping occurs, please
adjust it appropriately. In addition, the infill pattern with more straight lines is
more likely to shrink, you can change the infill pattern to Gyroid to reduce the
risk of shrinkage. For some of the structural parts with high requirements for
strength, you can set 5 layers of walls and about 25% fill density, and try to
avoid using more than 50% fill density to reduce the tendency of shrinkage; for
most of the non-structural parts with low requirements for strength, you can
directly choose the default 2 layers of walls and 15% fill density.

Gyroid infill:

End Notes

We hope the detailed guide provided has been helpful and informative.

If this guide does not solve your problem, please submit a technical ticket, we
will answer your questions and provide assistance.

If you have any suggestions or feedback on this Wiki, please leave a message in the
comment area. Thank you for your support and attention!

## Notas del recolector

- Página oficial de la wiki de Bambu Lab, sin autor firmado: se le atribuye la
  marca.
- El original conserva la errata "tempearture". No se ha corregido.
- Capturada para el sub-tema piezas-grandes-grietas; la misma URL ya existía bajo
  otros slugs y se reescribe aquí como fichero nuevo.
- No se ha traducido nada; el original está en inglés.
