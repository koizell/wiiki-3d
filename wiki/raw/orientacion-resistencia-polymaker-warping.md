---
titulo: "Warping"
url: https://wiki.polymaker.com/printing-tips/material-science/warping.md
sitio: wiki.polymaker.com
tipo: fabricante
capturado: 2026-10-17
autor: Polymaker
idioma: en
---

Warping

Before jumping into these phenomena, we need to clarify an important point regarding printing speed and printing temperature.

Usually printing temperature is defined as the heat block temperature (in ˚C) and the printing speed will always define the print head speed when printing (in mm/s).

In this page we will refer to more useful factors for us such as the extrusion temperature and the extrusion rate:

Extrusion Temperature: The temperature at which the plastic exits the nozzle (in ˚C)

Extrusion Rate: The rate at which the plastic is extruded from the nozzle (in mm3/s)

The extrusion temperature can be increased using different factors:

Increase the printing temperature, reduce the printing speed, reduce the layer height, or increase the nozzle heated chamber length.

The extrusion rate can be decreased using different factors:

Reduce the printing speed, reduce the layer height, or reduce extrusion thickness.

Warping

In 3D printing, occasionally we will encounter a part that deforms on the printer, curls or lifts up from the bed because of what is known as warping. This is caused by the accumulation of stress created by the 3d printing process.

The origin of the internal stress is still under debate, and depending on your 3D printer configuration, many factors may be contributing to the as-built internal stress. Here is one hypothesis which should be considered for all FDM machines:

During the extrusion process the polymer is forced through a die (small hole/nozzle), and during this step the polymer chains will be stretched to a stress state, then stuck to the build plate or a previous layer of plastic. This stress will slowly be released over time, however if the temperature does not allow the polymer to freely move enough to release the stress, or if the layer is not well stuck to the bed or the build plate, the accumulation of this stress throughout the layers will force the part to macroscopically deform.

Warping and cracking is always representative of this accumulation of stress exceeding the bond between the bed or layer adhesion.

As a result, we have three ways to prevent warping/cracking:

1. Give polymers enough energy to move freely and release their internal stress.

Most of the stress release happens right after the extrusion, indeed the material will be extruded at a high temperature then cooled down below Tg. It is during this time above Tg that the polymer will release most of its internal stress, however if this time is too short, it will not have time to reach equilibrium. Increasing this time period is a way to reduce warping.

This time period can be increased with the following ways:

Increasing the extrusion temperature (PT):

Increasing the room or chamber temperature (RT):

Decreasing the cooling rate:

2. Improve bed or layer adhesion

The accumulation of stress will tend to lift up the layer from another layer (delamination) or the bed (warping). However, if the bed/layer adhesion is strong enough to resist the deformation, the polymer will be able to release its stress without deforming the part. The bed adhesion can be improved by using adequate bed surfaces and coating.

Before talking about how to improve layer adhesion, let us have a look at what layer adhesion is:

Layer adhesion is possible thanks to the entanglement between polymer chains from one layer to another.

This entanglement is possible when both layers are heated up above Tg and both layers have their polymer chains moving freely, and through this movement the chains entangle with each other.

To improve the layer adhesion, we have to increase the number of entanglements between the polymer chains at the layer interface. The number of entanglements can be increased by increasing the time where both layers are in contact with each other with a temperature above Tg. As we can see this is the same solution as number 1. However, an extra factor which can improve the layer adhesion is increasing the contact surface between the layers by increasing the extrusion width.

3. Reduce stress creation

This third solution to solve warping relies on reducing the root cause of warping: internal stress.

As mentioned earlier the stress is created by forcing the material through a die which will created a velocity curve which will stretch and oriented the polymer chains. Reducing the stress creation rely on flattening this velocity profile. This velocity profile can be flattened by increasing the nozzle size, reducing the extrusion rate, decreasing material viscosity (by increasing the printing temperature) or coating the internal nozzle surface with low flow resistant surface.

The above explanation of warping can be applied to amorphous and semi-crystalline polymers. However, semi-crystalline polymers face an additional source of stress: crystallization.

Indeed, when printing, the part will undergo crystallization when cooling down creating small crystals which, as ordered structure, take less space and will force the part to shrink. This is why Nylon materials will warp even though the build plate may only be 45 degrees. If the crystals are formed too quickly, each layer will have small crystals creating a lot of stress per layers and the accumulation of this stress will macroscopically deform the part.

## Notas del recolector

- Página oficial de la wiki de Polymaker (fabricante de filamento). Explica el
  warping/cracking como acumulación de tensión interna creada durante la
  extrusión, que supera la adhesión entre capas.
- Mecanismo: las cadenas poliméricas se estiran al pasar por la boquilla y se
  adhieren a la capa anterior; la adhesión entre capas se basa en el
  entrelazado de cadenas por encima de Tg. Mejorarla: aumentar tiempo por
  encima de Tg (temperatura de extrusión, temperatura de cámara, reducir
  enfriamiento), aumentar superficie de contacto (ancho de extrusión).
- Polímeros semicristalinos (Nylon) tienen estrés adicional por cristalización.
- Relevante para anisotropía/orientación: la adhesión entre capas (eje Z) es
  el eslabón débil; la orientación determina qué eje soporta la carga.
- Texto original en inglés, no traducido.
