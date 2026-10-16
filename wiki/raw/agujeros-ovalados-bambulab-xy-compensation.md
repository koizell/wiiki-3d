---
titulo: "Bambu Lab Wiki – XY Hole / Contour compensation"
url: https://wiki.bambulab.com/en/software/bambu-studio/xy-hole-contour-compensation
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab
idioma: en
---

# XY Hole / Contour compensation

## How Do You Know If You Need It?

You may need XY compensation if:

- Screws or bolts do not fit into printed holes.
- Pins or shafts feel too tight.
- Assembled parts require sanding or force to fit.
- Measured hole diameters are smaller than the designed values.

This can lead to frustration, let's explore how to improve part precision!

## What is XY Hole and Contour Compensation?

XY compensation is a feature in Bambu Studio that helps correct part dimensions.
It has two separate settings, both are used to improve fit and dimensional accuracy:

**XY Hole Compensation**
Adjusts the size of holes (closed, hollow areas) in each layer.
It only affects holes and does not change the outer size of the model.

**XY Contour Compensation**
Adjusts the outer contour of the model.
It increases or decreases the overall XY size while keeping hole sizes unchanged.

## When to use?

Use XY Hole Compensation and XY Contour Compensation when a model requires accurate fitting with other components, such as screws, pins, magnets, or other printed parts. These settings allow you to fine-tune dimensions to achieve proper and reliable fits.

## Related issues with similar symptoms

Other factors can affect model dimensional accuracy. Check and correct these issues before adjusting XY Hole Compensation or XY Contour Compensation.

- Material shrinkage, filament contracts as it cools. This can make holes smaller.
- Elephant's foot from excessive first-layer squish on the Build Plate.
- Moist filament causing inconsistent extrusion.
- Flow dynamics not properly tuned.
- Hole diameters close to the Nozzle size, holes below 1 mm can be challenging to tune.
- Lack of chamfers or lead-in features on holes.
- Seam, this feature can affect hole precision.

## How to Calibrate XY Hole Compensation

### Step 1. Print a Test Model

Use a calibration model with multiple known hole sizes.
There are hundreds of test models on Makerworld. Most require calipers to measure and correct.
This model by Lebadjuras uses a known metric screw size, which are standard across the world to test the hole sizes. You can use an M3, M4, M5 or M6, depending on what you may have available.

Note: Print the model using the same Process profile and Filament you plan to use for your final part.
This calibration is specific to each filament and should be repeated when changing materials.

Open the model in Bambu Studio (1) and print it, using your desired filament and print profile.

In this example, an M6 screw is used. Larger screws produce more accurate calibration results, so using an M6 screw is recommended.

Note: An M6 screw has a nominal size of 6.0 mm, but the actual diameter is usually smaller due to manufacturing tolerances.
Most M6 screws follow the ISO 6g standard, which intentionally makes the thread slightly smaller to ensure easy assembly. In practice, the diameter is typically around 5.9 mm.

Set XY Hole Compensation to 0 mm, and print the model.
Notice that the M6 hole measures 5.9 mm, which matches the screw diameter. The screw should fit very tightly.

### Step 2. Test the Holes

Using your available screw size, test which hole fits the screw snugly. It shouldn't have any wobble.

After checking which hole fits ensures a precise fit, register the number. In this case, + 0.15.

### Step 3. Apply the Setting in Bambu Studio

Go to Process → Quality → Precision
Enter the registered value in XY Hole Compensation
The hole diameter will increase by twice the compensation value, as shown in the image below.

Click the Save icon (1) and rename the Process Profile for easy reference (2).
Then click OK (3).
This saved profile can be reused as your custom precision fit profile.

### Step 4. Validate

Reprint with the modified print process and test again.
This time the screw should fit the correct Metric size (M3, M4, M5 or M6).

### Step 5. Iterate if needed

If for some reason the screw doesn't fit the correct Metric size hole, identify what hole it fits in. Add the new hole value to the previously registered value in Bambu Studio.

For example, in Step 3 you set XY Hole Compensation to 0.2 mm. After printing the calibration model again, the screw fits correctly in the +0.1 mm hole. In this case, add the values together:

0.2 mm + 0.1 mm = 0.3 mm
Set XY Hole Compensation to 0.3 mm.

Repeat this process as needed until the desired fit is achieved.
If all holes become noticeably too large at any point, restart the calibration process and return to Step 1.

## How to Calibrate XY Contour Compensation

### Step 1. Print a Test Model

Use a calibration model with multiple known outer sizes. There are hundreds of test models on Makerworld. Most require calipers to measure and correct.
This model by Lebadjuras uses a known reference size that is available to most users: an original Bambu Lab Reusable Spool.
For accurate calibration, an original Bambu Lab Reusable Spool must be used.
⚠️ 3D printed spools are not suitable, as their dimensions may vary and affect the results! ⚠️

### Step 2. Test the Fitting in a Bambu Lab Spool

After the model has been printed, try to fit it inside the middle of the Bambu Lab Spool.

It should fit tightly, without any play. It should also hold in place and not fall inside the spool center hole:

Below you can find two examples of poor fittings:

If you have a set of calipers, this job is much quicker:

Measure the part diameter and register the measured value.
Subtract ( 55 - [Measured value] ), then divide by 2, the resulting value should be inserted into the XY Contour Compensation.

Skip to Step 4.

If you don't have a set of calipers, don't worry, follow the next Step.

### Step 3. Iterate the Fitting

Without an accurate measuring tool, we will have to iterate the XY Contour value and reprint the part until we achieve the desired fit.

If the part is too loose in the spool center, you will need to increase the value, try increments of 0.1 mm until the right fit is achieved.
If the part doesn't fit in the spool center, you will need to decrease the value, try increments of -0.1 mm until the right fit is achieved.

### Step 4. Save the profile

Once the desired fit is achieved. Click the Save icon (1) and rename the Process Profile for easy reference (2).
Then click OK (3).
This saved profile can be reused as your custom precision fit profile.

## Limitations

X-Y Hole Compensation only applies to closed paths. If the model has openings on its sides, resulting in unclosed paths within a single layer, the X-Y Hole Compensation function cannot be used.

Take the model in the image below as an example. It has several holes on its side, which cause some intermediate layers to be unclosed. Therefore, these layers do not have holes (as seen in layer 74 in the right image) and will not be affected by X-Y Hole Compensation. Only X-Y Contour Compensation can be applied to them.

If X-Y Hole Compensation is applied to a model with unclosed paths, noticeable layer separation will occur at the hole locations.

## End Notes

We hope the detailed guide provided has been helpful and informative.
If this guide does not solve your problem, please submit a technical ticket, we will answer your questions and provide assistance.
If you have any suggestions or feedback on this Wiki, please leave a message in the comment area. Thank you for your support and attention!

## Notas del recolector

- Es la wiki oficial de Bambu Lab, en inglés. Documenta los dos ajustes por separado (Hole y Contour) y la fórmula de calibración con tornillos métricos (M3–M6) y con el carrete de Bambu Lab.
- Aporta datos concretos: la compensación del agujero se aplica por radio («el diámetro del agujero aumentará el doble del valor de compensación»), el M6 nominal mide ~5.9 mm por la norma ISO 6g, y la fórmula del contour es (55 − medido) / 2.
- Enumera causas previas a revisar antes de tocar la compensación: contracción del material, pie de elefante, filamento húmedo, flujo, agujeros menores de 1 mm, falta de chaflanes y costura (seam). Muy útil para el apartado de «no es compensación».
- Documenta una limitación técnica clara: la compensación de agujeros solo actúa sobre caminos cerrados; en capas con aberturas laterales no aplica y puede producir separación de capa.
- El texto original está en inglés y no se ha traducido.
