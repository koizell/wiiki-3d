---
titulo: "Model Warping, Falling Off, or Collapsing"
url: https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab
idioma: en
---

Quick Fixes

Start here before reading anything else. Most failures are caused by one of three
things.

Corner lifting / Warping
✅ Clean the build plate (soap + water)
✅ Increase bed temperature by +5–10 °C
✅ Add a Brim or Brim Ears in the slicer

Model pops off mid-print
✅ Re-run Automatic Bed Levelling
✅ Check your Z-offset, first layer must be squished
✅ Confirm the correct plate type is selected in Bambu Studio

Collapsed model
✅ Reduce speed and acceleration by 20–30 %
✅ Enable supports for tall or thin models
✅ Check belt tension, belts should feel firm, not floppy

Step 1. Identify What Went Wrong

Before you change any settings, diagnose the failure type. Applying the wrong fix
wastes time and filament.

Failure Type 1. Corner Warping

What it looks like: Edges or corners curl upward off the bed, often mid-print. A
horizontal ripple line may appear on the side of the model where the nozzle re-hit
the lifted layer.

Root cause: Thermal shrinkage. The outer edges of the print cool faster than the
centre, creating tension that pulls corners up. This is more common with larger
prints, higher infill densities, and shrinkage-prone materials like ABS, ASA, PC,
PA, and PA-CF.

Pro Tip: Shrinkage-prone filaments listed in order of risk (highest to lowest):
PC → PA-CF → PA → ABS → ASA → PETG → PLA. When possible, choose PLA, PLA-CF, PETG,
or PETG-CF for large flat prints.

Note: Sometimes warping is so small that it's hard to notice, but it can still
cause visible defects on the side walls and top layers of a print. Because of this,
it's easy to mistake warping for an extrusion or flow problem, when the real issue
is the print lifting or warping slightly.

Failure Type 2. Bed Adhesion Failure

What it looks like: The entire model shifts, slides, or pops fully off the bed
partway through the print.

Root cause: Insufficient grip between the first layer and the build surface.
Common causes:

Fingerprints or grease on the plate (skin oils are the #1 cause)

Wrong plate type selected in the slicer (e.g., sliced for Cool Plate but printed on
Textured PEI Plate)

Z-offset too high, the nozzle is too far from the bed, during the first layer.

Pro Tip — Bambu Lab plate types matter: If you slice for the Cool Plate (35 °C for
PLA) but print on the Textured PEI Plate (needs 55–65 °C for PLA), the adhesion
temperature will be far too low. Always match the Plate Type in Bambu Studio to the
physical sheet on your printer. Additionally, the Textured PEI Plate lowers the
nozzle by 0.04 mm automatically during levelling, selecting the wrong type in the
slicer disables this offset and causes the first layer to be too high.

Failure Type 3. Structural Collapse

What it looks like: The upper portion of the print looks like a bird's nest of
filament, or the top layers are shifted sideways relative to the base.

Root cause: Either mechanical or adhesion based:

The nozzle physically knocked a tall, thin model over due to vibration at high
speed

Crossover infill patterns (e.g., Grid, Triangles) might build small bumps within a
single layer that the nozzle clips on the next pass

Loose belts causing mechanical "slop" in the toolhead motion

Pro Tip — Listen for clicking or rattling: If you hear irregular clicking from the
X or Y axis while printing, your belts are likely loose. A properly tensioned belt
feels like a guitar string — firm, with a slight spring.

Step 2. Debugging Strategy

Tier 1. The Basics

These three steps resolve approximately 80 % of all warping and adhesion failures.
Do all three before touching any slicer settings.

1. Clean the build plate
Wash with warm water and dish soap. Rinse thoroughly and air-dry. Follow the
dedicated Wiki page. Never touch the print surface with bare hands after cleaning.

2. Run Automatic Bed Levelling
Run the full calibration, especially after moving the printer, maintenance or
firmware updates.

3. Check if the nozzle is installed correctly.
The clips must be fastened in the correct way to ensure they are not loose.

Tier 2. Bambu Studio Adjustments

Bed Adhesion

Corners lifting — PLA

Setting to change: Bed temperature
Recommended direction: Increase by + 5 to 10 °C
Notes: Target 55 – 65 °C on Textured PEI. Also add a Brim (8–10 mm wide).

Corners lifting — ABS / ASA

Setting to change: Bed temp + enclosure
Recommended direction: Increase by +10–15 °C
Notes: Close all doors and top cover. Chamber should reach 40 °C+.

First layer not sticking

Setting to change: Part cooling fan
Recommended direction: Disable for first 3 layers
Notes: Set "No cooling for first X layers" to 3 in Filament Settings → Cooling tab.

Sharp corners popping up

Setting to change: Brim / Brim Ears
Recommended direction: Add targeted Brim Ears
Notes: In Bambu Studio: set Brim type to Painted, then use the Brim Ears tool.
Target only the corners that lift.

Stability

Tall thin model collapse

Setting to change: Print speed + acceleration
Recommended direction: Reduce by 20–30 %
Notes: Also enable Supports. Consider reorienting the model to lie flat.

Warping

Large flat model warping

Setting to change: Infill pattern + density
Recommended direction: Switch to Gyroid at ≤25 %
Notes: Grid and Triangle patterns create internal linear tension. Gyroid shrinks
more evenly in all directions.

Auxiliary fan causing warp

Setting to change: Auxiliary part cooling fan
Recommended direction: Reduce around 20 to 30 %
Notes: Mostly applies to small objects or high overhang areas. High auxiliary fan
speed cools outer walls too fast.

Nozzle Issues

Nozzle hitting / scraping the print

Setting to change: Infill speed + pattern
Recommended direction: Slow infill speed; switch to Line, Rectilinear, Gyroid, or
Concentric
Notes: Grid and Triangle infill patterns cross in a single layer, building a small
bump that the nozzle clips on the next pass.

Tier 3. Environmental and Material Factors

These factors are often overlooked by beginners but can completely undo every Tier
1 and Tier 2 fix.

Air Drafts
Even a nearby open window, air conditioning vent, or desk fan can cool one side of
a print faster than the other, causing uneven warping. Block airflow around the
printer during printing. Close the front door and top cover on enclosed printers.

Ambient Room Temperature
If the room is below 20 °C, warping can occur even with PLA and PETG — materials that
are normally very forgiving. For materials like ABS, ASA, PA, and PC, an enclosed
printer with heated chamber is essential. If your printer is open-frame (e.g., Bambu
A1), increase bed temperature by an additional +10 °C to compensate.

Wet (Moisture-Absorbed) Filament
If you hear crackling or popping sounds during printing, or see rough, bubbly, or
stringy surfaces, your filament has absorbed moisture from the air. Dry the filament
before retrying.

Pro Tip: Store unused filament in sealed bags or airtight containers with silica gel
desiccant packets. Nylon and PC absorb moisture within hours in a humid environment
— never leave them on the spool holder overnight.

Wrong Filament for the Job
Large flat models printed in ABS, ASA, or PC will almost always warp without an
enclosure. If an enclosure is not available, switch to PLA, PLA-CF, PETG, or PETG-CF
for large prints.

Step 3. Hardware Tips: Build Surfaces

Build Plate - Using the correct surface
Choosing the right build surface for your filament makes a significant difference.

Glue Stick - The Emergency Adhesion Booster
A standard glue stick applied in a thin, even layer over the build plate
dramatically improves adhesion for stubborn filaments, especially ABS, ASA, PA, and
PC.

Apply a thin, even layer. Thick blobs cause an uneven first layer.
Dissolves easily with water for cleanup.

Step 4. Preventative Maintenance Checklist

Treat your printer like a precision tool. A poorly maintained printer will warp and
shift prints even with perfect slicer settings.

Regulary check:
✅ Wash the build plate with soap and water; dry completely before use
✅ Check for filament residue or debris around the extruder gear
✅ Inspect the PTFE tube for cracks, yellowing, or blockages
✅ Confirm the print head moves freely on all axes (X, Y, Z) with no catching or
grinding

## Notas del recolector

- Página oficial de la wiki de Bambu Lab, sin autor firmado; se le atribuye la
  marca.
- Es la entrada que mejor distingue los tres síntomas que interesan aquí: corner
  warping (warping real), bed adhesion failure (pieza que salta de la cama) y
  structural collapse (Bird's nest / desplazamiento).
- Cifras que da: 35 °C de cama para PLA en Cool Plate; 55–65 °C para PLA en
  Textured PEI; descenso de boquilla de 0,04 mm en Textured PEI; +5–10 °C de cama
  para PLA que levanta esquinas; brim de 8–10 mm; sin ventilador las primeras 3
  capas; Gyroid a ≤25 % de relleno; descenso del ventilador auxiliar del 20–30 %;
  entorno bajo 20 °C provoca warping incluso con PLA y PETG; cama adicional +10 °C
  en impresoras abiertas.
- El procedimiento Tier 1 (lavar, nivelar cama, revisar boquilla) afirma que
  resuelve el 80 % de los fallos de warping y adhesión.
- Capturada para el sub-tema piezas-grandes-grietas; la misma URL ya existía bajo
  otros slugs y se reescribe aquí como fichero nuevo.
- El texto original está en inglés y no se ha traducido.
