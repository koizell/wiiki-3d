---
titulo: "3D Prints Shrinkage: Causes and Solutions"
url: https://wiki.bambulab.com/en/knowledge-sharing/3d-prints-shrinkage
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-08
autor: Bambu Lab
idioma: en
---

¶ Overview

When designing functional parts, even small dimensional errors can cause poor fit or assembly failure. This is especially true for mechanical parts and interlocking structures.

This happens because filament naturally shrinks during 3D printing due to a physical property called thermal contraction. The process works as follows:

1. The filament is extruded from the hot nozzle and deposited at a high temperature.
2. After deposition, it gradually cools and solidifies.
3. During cooling, the material shrinks slightly. This makes the finished part smaller overall, with the effect being most noticeable along the X and Y axes.

Different filaments shrink by different amounts. To solve this problem, Bambu Studio provides a shrinkage compensation setting. It adjusts or scales the model to offset the shrinkage that occurs as the filament cools.

¶ Filament Shrinkage Settings in Bambu Studio

Bambu Studio provides shrinkage compensation settings in the filament profile. You can define a shrinkage value for each spool of filament individually.

Follow these steps:

1. Open Bambu Studio and select the filament used in your project.
2. Click the "···" icon to the right of the filament, then click "Edit" to open the settings.
3. Go to "Filament Settings → Basic Information" and find "Shrinkage". Enter your value here.

Note: This setting applies to a single filament only. It is not a global adjustment. Please set the shrinkage value for each filament in your project separately.

Shrinkage compensation is shown as a percentage (%). The default value is 100%. When you keep the default value, no scaling is applied. The model prints at its original size in the slicer.

¶ Shrinkage Compensation Calculation

To know the value to put in the Shrinkage section, use this formula to calculate the shrinkage rate:

**Shrinkage Compensation (%) = (Measured Size / Designed Size) × 100%**

| Parameter | Description |
|---|---|
| Measured Size | The actual size of the printed part, measured with calipers |
| Designed Size | The original size of the 3D model |

Example:
Suppose you design a cube with a side length of 20 mm. After printing and measuring, you find the actual size is 18 mm. Then:
- Shrinkage rate = (18 / 20) × 100% = 90%
- After you enter 90% in the shrinkage section, the system will automatically scale up future models.

ℹ️ Note: After making changes, be sure to click the save icon in the top-right corner to save the profile.

¶ Shrinkage Rate Test

You do not need to print a complex model for the test. Just print a standard cube (for example, 20 × 20 × 20 mm or 100 × 100 × 100 mm).

Steps:
1. Right-click the workspace in Bambu Studio.
2. Click "Add Primitive" and select "Cube".
3. To set a specific size, click the "Scale" tool and enter the X, Y, and Z values in the size section.

ℹ️ The default cube side length may not be a whole number. Setting whole-number sizes makes calculation and measurement easier. If you apply uniform scale, you only need to enter one value, and the rest will adjust automatically.

4. Slice and print the model. After it cools to room temperature, measure its size with calipers.

Test Example:
We printed a 20 × 20 × 20 mm cube. After measuring, all directions came out to 18.5 mm.

Using the formula:
- Shrinkage rate = (18.5 / 20) × 100% = 92.5%
- Enter 92.5% in the filament shrinkage section in Bambu Studio.

After saving the settings, slice and print the same cube again. This time, the measured size was 19.7 mm. The difference from the target size is very small and meets most needs.

You can take further action depending on your requirements:
- For higher accuracy: You can make another adjustment.
- For high assembly requirements: We recommend calibrating the error for each model separately, because different structures show different errors.
- For parts without strict assembly needs: You can use the default values directly, or make one simple adjustment.

ℹ️ Note: The "Shrinkage" setting only adjusts the scaling of the model's outer dimensions (X and Y axes). It does not affect the size of internal features (such as holes and contours). To correct internal sizes, please use the "X-Y Hole/Contour Compensation" and "Auto-Circle Holes Compensation" settings.

¶ X-Y Hole/Contour Compensation

The X-Y Hole/Contour Compensation feature lets you fine-tune part sizes after shrinkage compensation is calibrated.

To learn how it works, please see this wiki: X-Y Hole/Contour Compensation.

¶ Auto Circle Contour-Hole Compensation

This feature is designed to improve the dimensional accuracy of circular holes in 3D printing. It is especially useful for assembly purposes.

It works by standardizing the print speed and applying a specific compensation value based on the material used. This offsets the shrinkage that naturally occurs during printing.

Best for: Circular holes or shafts on a horizontal plane with a diameter no larger than 50 mm.

How to enable: In Bambu Studio, go to "Quality → Precision" and turn on the "auto circle contour-hole compensation" option.

Then select the correct filament profile, slice the model, and print. This feature improves the dimensional accuracy of circular holes and shafts. It helps them fit tightly with standard components like bearings or with other 3D-printed parts.

Note: "Automatic Circular Hole/Shaft Compensation" is mainly optimized for the H2D and certain supported filaments. For other printers, this feature uses general compensation settings. This may still improve accuracy, but it may not give the best results. In this case, you do not need to enable the feature.

For more details, please see this wiki: Automatic Circular Hole/Contour Compensation.

ℹ️ Note: Besides adjusting compensation values, using fiber-reinforced filaments (such as carbon fiber or glass fiber reinforced materials) is also an effective way to reduce shrinkage. These filaments usually add fibers to a base polymer like PLA, PETG, or nylon. The fibers limit the shrinkage of the base material and improve dimensional stability during printing and cooling. Regular thermoplastics shrink noticeably when they cool, but the fibers act as reinforcement and help control the shrinkage of the filament base.

¶ End Notes

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support ticket and include your recent printer logs and additional pictures or other details. Our technical team will review your request and provide detailed assistance.

You can also visit Bambu AI, which can instantly answer common questions and provide you with operational guidance.

## Notas del recolector

- La página explica la contracción térmica y cómo compensarla en Bambu Studio, pero no da un ranking de qué materiales se contraen más. Solo dice "Different filaments shrink by different amounts" y que los materiales reforzados con fibra se contraen menos.
- El ejemplo del cubo (20 mm → 18.5 mm → 19.7 mm) es útil para entender cómo funciona la compensación, pero no es un dato de contracción por material.
- La nota sobre los materiales reforzados con fibra es relevante para la guía: es una forma de reducir la contracción sin cambiar de material.
- El texto original está en inglés y no lo he traducido.
