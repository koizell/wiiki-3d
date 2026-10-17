---
titulo: "Layer Separation and Splitting"
url: https://www.simplify3d.com/resources/print-quality-troubleshooting/layer-separation-and-splitting/
sitio: simplify3d.com
tipo: oficial
capturado: 2026-10-17
autor: Simplify3D
idioma: en
---

Layer Separation and Splitting

3D printing works by building the object one layer at a time. Each successive layer is printed on top of the previous layer, and in the end this creates the desired 3D shape. However, for the final part to be strong and reliable, you need to make sure that each layer adequately bonds to the layer below it. If the layers do not bond together well enough, the final part may split or separate. We will examine several typical causes for this below and provide suggestions for resolving each one.

Common Solutions

Layer height is too large

Most 3D printing nozzles have a diameter between 0.3-0.5mm. The plastic squeezes through this tiny opening to create a very thin extrusion that can produce extremely detailed parts. However, these small nozzles also create some limitations for what layer heights can be used. When you print one layer of plastic on top of another, you want to make sure that the new layer is being pressed against the layer below it so that the two layers will bond together. As a general rule of thumb, you want to make sure that the layer height you select is 20% smaller than your nozzle diameter. For example, if you have a 0.4mm nozzle, you can't go too far past a layer height of 0.32mm, or each layer of plastic will not be able to properly bond to the layer beneath it. So if you notice that your prints are separating and the layers are not sticking together, the first thing you should check is your layer height compared to the size of your nozzle. Try reducing the layer height to see if it helps the layers bond together better. You can do this by clicking "Edit Process Settings" and selecting the Layer tab.

Print temperature is too low

Warm plastic will always bond together much better than cold plastic. If you notice that your layers aren't bonding together and you are certain that your layer height isn't too large, then it is possible that your filament needs to be printed at a higher temperature to create a strong bond. For example, if you tried to print ABS plastic at 190C, you would likely find that the layers of your part will easily break apart. This is because ABS typically needs to be printed around 220-235C to create a strong bond between the layers of your print. So if you feel this may be the problem, verify that you are using the correct temperature for the filament you have purchased. Try increasing the temperature by 10 degrees to see if the adhesion improves. You can do this by clicking "Edit Process Settings" and selecting the Temperature tab. Simply double-click the temperature setpoint you wish to change.

## Notas del recolector

- Página oficial de la guía de calidad de Simplify3D. Explica la separación
  entre capas como fallo de adhesión entre capas sucesivas.
- Causas y soluciones: altura de capa demasiado grande (regla: altura de capa
  un 20 % menor que el diámetro de boquilla; ejemplo 0,4 mm -> no pasar de
  0,32 mm), y temperatura de impresión demasiado baja (el plástico caliente
  adhiere mejor; ABS normalmente 220-235 °C).
- Relevante para anisotropía: la adhesión entre capas (eje Z) es el eslabón
  débil; la orientación de la pieza determina qué eje soporta la carga.
- Texto original en inglés, no traducido.
