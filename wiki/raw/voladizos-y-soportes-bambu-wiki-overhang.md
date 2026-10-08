---
titulo: "How to Print Overhangs"
url: https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-08
autor: Bambu Lab
idioma: en
---

## What is an Overhang?

When part of a model extends outward without solid material beneath to support it, this portion is considered an **overhang**. Since FDM 3D printing builds objects layer by layer, material without support beneath tends to sag or deform due to gravity.

During printing, **supports** act like a safety net beneath overhangs, providing stability for the upper layers.

## Common Types of Overhangs

Overhangs usually refer to inclined surfaces or unsupported features of a model in the vertical direction, as shown below. Both cases are considered typical overhang structures.

## Causes of Overhang Print Failures

**Cause: When printing the overhanging surface, the extruded filament is not cooled in time and bonds to the specified position, resulting in dropping, which is usually shown as follows:**

**Left: poor overhang quality; Right: Good overhang quality**

## Solutions

In 3D printing, **Self-supporting Overhang** refers to an overhang structure that can be formed without the need for additional supports, relying solely on its own geometry or layer-by-layer stacking to maintain stability.

Such overhangs take advantage of the self-supporting characteristics of the material during layer deposition, preventing significant collapse or deformation.

When **Excessive Overhang** occurs — for example, when the nozzle is required to print outward into free space beyond a certain angle without adequate support — we recommend that you try the following methods to improve it:

First, observe the overhang tilt angle of the model to determine whether it is too small.

Generally, when the overhang tilt angle is smaller than 45°, it is recommended to add supports; when it is larger than 45°, no support is needed. You can try to optimize the parameters according to the subsequent steps to improve the overhang quality.

> **Note:**
>
> - **The overhang angle** mentioned here refers to the angle formed between the inclined surface of the model and the heatbed surface.
> - In contrast, **the overhang threshold** refers to the proportion of unsupported extrusion width within an extrusion line, which is not the same concept.
> - The illustration below shows a comparison of support generation in Bambu Studio when the support threshold angle is set to 5° and 85°. The larger the input angle, the more supports will be generated.

### Enable Supports

If the model's overhang angle is not large (e.g., less than 45°), it is recommended to **enable supports** in Bambu Studio to improve print quality. For more details on support settings, please refer to the Guide to Support Materials and Functions.

### Lower Nozzle Temperature

**If the model's overhang angle is steep (more than 45°), you can try slightly lowering the nozzle temperature.**

When the printing speed for overhang areas is relatively slow, lowering the nozzle temperature helps reduce the need for cooling.

- For **PLA**, you can lower the **other layers'** nozzle temperature to around **205 °C**, while increasing the **overhang cooling fan speed** to **100%**.
- For other official filaments, you can check the Filament Guide for **compatibility and recommended parameters across printer models, nozzles, AMS, build plates, and adhesives**. Make sure the temperature stays within the recommended range, and lower it by about 5–10 °C if needed.
- For third-party filaments, it's recommended to print a **temperature tower** to determine the optimal temperature. For instructions, see the Third-Party Filament Calibration Guide.

### Enable Overhang Slowing

**Reduce the overall print speed, or enable Overhang Slowing to decrease print speed specifically for overhang regions.** If necessary, you can further lower the overhang speed. Overhang speeds are generally set between **10–60 mm/s**. The larger the overhang threshold, the greater the unsupported area—typically requiring slower speeds to ensure quality. For more details, see the Overhang Slowing Guide.

### Increase Cooling Fan Speed

**Increase the percentage of the part cooling fan and auxiliary cooling fan as needed.** If overhang quality remains poor, check whether the **part cooling fan** and **auxiliary cooling fan** are working properly during printing. You can toggle them on/off and adjust fan speed percentages in Bambu Studio (example shown with H2D below).

### Improve Heat Dissipation

**Opening the printer's front door and glass lid** can improve cooling performance (recommended only for materials like **PLA, PETG, TPU**. For high-temperature filaments, this may cause warping or poor layer adhesion due to low chamber temperatures).

## Print Quality Comparison

Below is a comparison of models printed **before and after parameter adjustments**.

## End Notes

> We hope the detailed guide provided has been helpful and informative.
>
> If this guide does not solve your problem, *please submit a technical ticket*, we will answer your questions and provide assistance.
> If you have any suggestions or feedback on this Wiki, please leave a message in the comment area. Thank you for your support and attention!

## Notas del recolector

- El artículo está en inglés y no se ha traducido.
- El ángulo de referencia es 45° medido entre la superficie inclinada y la cama caliente (heatbed). La fuente distingue explícitamente entre "overhang angle" y "overhang threshold" (proporción de ancho de extrusión sin soporte dentro de una línea de extrusión).
- La fuente da el ángulo de 45° como regla general sin especificar boquilla ni material concreto para ese umbral; las temperaturas y velocidades que menciona (205 °C para PLA, 10–60 mm/s) son para optimizar voladizos que ya pasan el umbral, no para definir el umbral mismo.
- El artículo no distingue entre voladizo y puente (bridge); usa "overhang" como concepto general.
- El artículo no habla de la calidad de la cara que apoya sobre soportes; solo menciona que los soportes actúan como "red de seguridad".
- Las imágenes del artículo están alojadas en el CDN de Bambu Lab y no se han descargado.
