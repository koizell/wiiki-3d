---
titulo: "Elephant foot compensation"
url: https://wiki.bambulab.com/en/software/bambu-studio/parameter/elephant-foot
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab (Guacamole)
idioma: en
---

Elephant foot compensation | Bambu Lab Wiki

[imagen — primeras imágenes del artículo: elefante diagramas]

## ¶ Elephant Foot

Elephant foot is a common first-layer flare in FDM 3D printing: the bottom of the model (usually layer 1, and sometimes the first few layers) is wider than the layers above it, forming a protruding rim that looks like an elephant’s foot.

In FDM 3D printing, filament is extruded through the nozzle and stacked layer by layer to build the model. During printing, the first layer is affected by two factors at the same time:

- Heat from the bed: The first layer is pressed onto the heatbed. It has not fully cooled and is still soft, so it deforms more easily.
- Weight from upper layers: Later layers keep pressing down on a base that has not fully set. Larger models and wider bases usually show a more noticeable elephant foot.

Under these combined effects, the first layer may spread outward and form a clear protruding edge. This is called elephant foot.

On most appearance parts, a slight elephant foot can be ignored. On tolerance-critical parts such as assemblies, snaps, rails, and shaft holes, the flared base directly affects fit. When the first-layer elephant foot is large, assembly becomes less smooth and may fail completely.

[imagen — elephant foot diagram 1 / diagram 2]

## ¶ Elephant Foot Compensation

Elephant foot compensation is a Bambu Studio parameter used to offset first-layer flare. After you enable it, the slicer intentionally shrinks the first-layer contour so the printed first layer aligns with the layers above, reducing the need for sanding afterward.

For general models that do not need high dimensional accuracy, the system default is fine. For high-accuracy models, continue to the next section.

Setting path: Go to Process → Quality → Precision → Elephant foot compensation.

[imagen — apply-compensation-value_en.png]

The images below compare the sliced result before and after elephant foot compensation is enabled:

[imagen — 象脚补偿0en.png (deshabilitado) / 象脚补偿0.2en.png (0.2 mm)]

## ¶ Calculating the Elephant Foot Compensation Value

If you need high accuracy and tight tolerances—for example assemblies, snaps, rails, or shaft holes—follow the steps in this section. Print a test model, measure and calculate the elephant foot compensation value, then apply that value to the model you want to print.

### 1. Preparation

- Before printing, clean the build plate with warm water and dish soap. For detailed steps, see this wiki: PEI Plate Cleaning Guide .
- Run a full Auto Bed Leveling and Flow Dynamics Calibration. Follow the steps below:
  1. On the printer screen, go to Settings → Calibration → Print Calibration, select Auto Bed Leveling, and tap Start, as shown below.
  2. Follow this wiki: Flow Dynamics Calibration to perform Flow Dynamics Calibration.

[imagen — clean-build-plate.webp / ppritn.png]

### 2. Print the Test Model

Step 1. Choose and prepare a test model

Two test models are provided. Print either one. This tutorial uses Model 2 as the example. The measurement method for Model 1 is the same.

Model 1: Built-in cube in Bambu Studio
[imagen — test-model-1-cube.jpg]

Setup: In Bambu Studio, right-click the build plate, choose Add Primitive → Cube, select the cube, choose Scale, turn off Uniform scale, and set the size to 25 × 25 × 10 mm

[imagen — add-primitive-cube_en.png / scale-cube-25x25x10_en.png]

Model 2: Elephant foot gauge block
Download the test model and open it in Bambu Studio: Download .stl

[imagen — test-model-2-gauge-block.jpg]

Step 2. Set the following parameters

- Go to Process → Quality → Precision → Elephant foot compensation and set the value to 0
- Go to Process → Others → Brim type and set it to No-brim

[imagen — set-compensation-to-0_en.png / set-brim-type-none_en.png]

Step 3. Start the print and wait until it finishes

Note: After printing finishes, wait until the heatbed cools fully to room temperature before removing the model. Forcing it off while hot can deform the part.

[imagen — printed-test-model.jpg]

### 3. Measurement and Calculation

Required tools: A digital caliper or micrometer with resolution of at least 0.01 mm

Measurement notes:

- The four corners of the model may be affected by Flow Dynamics, so avoid the corners. Measure at the middle of each side.
- Elephant foot is on the first layer. When measuring the bottom, let the caliper jaws lightly touch the flared first-layer edge. Too much pressure can deform the first layer and give a reading that is too small.

[imagen — measure-notes.jpg]

Measurement steps:

1. Reference dimension: Measure the actual X and Y dimensions at the top of the model (away from the elephant foot area) and record the values;

[imagen — measure-reference-x.jpg / measure-reference-y.jpg]

2. Elephant foot dimension: Measure the X and Y dimensions at the bottom of the model, on the face that contacted the build plate, and record the values.

[imagen — measure-elephant-foot-x.jpg / measure-elephant-foot-y.jpg]

Calculate the elephant foot compensation value:

- X-axis elephant foot deviation: Elephant foot size X − Reference size X = X deviation
- Y-axis elephant foot deviation: Elephant foot size Y − Reference size Y = Y deviation
- Elephant foot compensation value: (X deviation + Y deviation) / 2 = Elephant foot compensation value

Example:

- X-axis elephant foot deviation: 25.07 − 24.98 = 0.09
- Y-axis elephant foot deviation: 25.11 − 25.00 = 0.11
- Elephant foot compensation value: (0.09 + 0.11) / 2 = 0.10

You can then apply the measured elephant foot compensation value to assembly models that need high-accuracy printing.

Setting path: Process → Quality → Precision → Elephant foot compensation, then enter the elephant foot compensation value.

Note: The elephant foot compensation value can vary between different types of build plates, so values are not interchangeable. After changing the build plate, measure and calculate the compensation value again.

[imagen — apply-compensation-value_en.png]

## ¶ Notes

After elephant foot compensation is enabled, the Brim may not fully touch the model in the preview. This is normal. Elephant foot compensation shrinks the first layer, and the preview does not simulate the real first-layer squish and flare. During actual printing, that gap is usually filled by the squished material.

If Brim-object gap is already set to 0 mm and a gap still appears in the preview, elephant foot compensation is usually the cause. If you want the Brim to fully touch the model in the preview, set elephant foot compensation to 0.

Note: What is Brim: A brim is an extra ring of flat outline printed around the first layer of the model, connected to its base like a hat brim. It increases the contact area between the model and the build plate, improving adhesion and preventing warping. See About Brim for details.

[imagen — brim comparison]

## ¶ End Notes

We hope this guide has provided clear and practical support.
If the issue remains unresolved, please submit a support ticket and include your recent printer logs and additional pictures or other details. Our customer support team will review your request and provide detailed assistance.
You can also visit Bambu AI, which can instantly answer common questions and provide you with operational guidance.

## Notas del recolector

- URL comprobada: 200. Página SPA de Bambu Wiki; el cuerpo se ha extraído del bloque `<template slot="contents">` del HTML renderizado, no del markdown plano devuelto por el fetcher.
- Fuente rica y accionable sobre todo por el procedimiento de calibración medido (calibre 0,01 mm, valores de ejemplo 0,10 mm de compensación, deshabilitar brim en el modelo de prueba, esperar enfriado a temperatura ambiente).
- Dos causas físicas que nombra el artículo: calor residual de la cama (primera capa blanda, se deforma) y peso/carga de las capas superiores sobre una base que no ha fraguado. No nombra z-offset, temperatura de cama ni velocidad explícitamente dentro del cuerpo, aunque remite a limpieza de placa y Flow Dynamics.
- Dato importante: el valor de compensación no es intercambiable entre tipos de placa.
- El párrafo «Notes» explica por qué el brim se ve desconectado en la previsualización, que es exactamente la confusión brim vs elephant foot mencionada en el encargo.
- Texto original en inglés, no traducido. Las imágenes se han sustituido por su nombre/archivo descriptivo. Autor de la página según el frontmatter del CMS: "Guacamole"; fecha de actualización 2026-08-14.
