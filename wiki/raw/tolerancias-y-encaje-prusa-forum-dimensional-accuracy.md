---
titulo: "Dimensional Accuracy – Prusa Forum (Original Prusa i3 MK3/MK3S Improvements Archive)"
url: https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-improvements-archive/dimensional-accuracy/
sitio: forum.prusa3d.com
tipo: foro
capturado: 2026-10-17
autor: varios usuarios (SPCAS, ayourk, David T., Carsten, david.b14)
idioma: en
---

# Dimensional Accuracy

Hilo del foro de Prusa3D en la sección "Improvements (Archive)" del Original Prusa i3 MK3 & MK3S & MK3S+. Varios usuarios discuten la exactitud dimensional de las piezas impresas en FDM.

## SPCAS (05/02/2017)

So I have my MK2 build and Printing and I love this machine. First Calibration went well with no issues.

Other than some issues with either models Sticking to the bed and being almost impossible to move or occasionally one not sticking and turning into a nice PLA Hair ball its going well.

My question is model accuracy. I have a model of a cube, 1" with a .5 hole, .375 hole, and a .25 hole. The holes on average are .1 smaller than the model. My Z dimension is slightly bigger than 1.0 and my x/y is close but slightly smaller. Is this normal to expect from the MK2?

Is there an adjustment in the printer to adjust the prints so that I don't have to change the models? I have several models that I have machined into various parts on our Mill and would like to print some of the smaller ones rather than machine them.

Using Sli3r Prusa edition, PLA 1.75mm, .15 Optimal, changed to 70% fill (Not sure if this effects the model much). Also using OctoPrint as an interface as I like the network ability it gives so I'm not always moving memory cards around.

A point in the right direction would be much appreciated.

Chris

## ayourk (06/02/2017)

Check out this item on Thingiverse.

and an 8 inch (200mm) or greater caliper is recommended.

## SPCAS (06/02/2017)

Thank you Ayourk. I am going to give that a try.

## SPCAS (06/02/2017)

So any advice on holes in parts? My cube is correct within .001 or so but the holes printed in it are all undersized by .015. And since the holes are on three different sides it would be a product of x/y and Z and not just one Axis.

## David T. (06/02/2017)

Holes come out a bit smaller almost every time (with FDM process). As time went on I learned to design all holes a bit larger to fit required exact dimensions.

## Carsten (06/02/2017)

Getting holes and dimensions in FDM correct is like making a technical drawing with a 2 inch brush. The extrusion widths are always a bit off. I have not found a better solution as mentioned to know your printer and construct around its limitations...

Also shrinking after printing needs to be accounted.

For parts with holes that need to be correct I construct holes in a way that I can ream them to the exact size and fit.

Carsten

My Prints: https://www.prusaprinters.org/social/15695-carsten/prints
My Employer: https://make-magazin.de

## SPCAS (06/02/2017)

Thank you all for the input. I will proceed on with more knowledge and just design my holes .01 bigger.

## david.b14 (07/02/2017)

I print the object and kill it after it has done 4 layers. Then you can take the outline it has made and place it in the real world. You can make 3 templates by slicing the object on the bed laying on each of the axis. It is fast and you see things you would not have seen while rendering the object in a CAD program.

## Notas del recolector

- Hilo antiguo (2017) del foro oficial de Prusa. Aporta datos concretos de un usuario: cubo de 1" con agujeros de 0.5", 0.375" y 0.25", todos impresos ~0.1" (≈2.5 mm) más pequeños que el modelo; Z ligeramente mayor de 1.0" y X/Y ligeramente menores. Recomendaciones de la comunidad: diseñar los agujeros un poco más grandes, tener en cuenta el encogimiento, ream/taladrar los agujeros a medida exacta, y un método de plantilla imprimiendo solo 4 capas para verificar el contorno en cada eje.
- Texto original en inglés, no traducido.
- El hilo tiene pocas respuestas y es de 2017 (MK2/MK3), pero los principios (agujeros infra-dimensionados en FDM, reamado, compensación por diseño) siguen vigentes. Se ha incluido como fuente de foro con datos concretos.
