---
titulo: "PrusaSlicer 2.6.0-alpha2 — Measurement tool and Cut tool"
url: https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2
url_final: https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.6.0-alpha2
sitio: github.com
tipo: oficial
autor: "Prusa Research"
idioma: en
publicado: 2023-01-31
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "Notas históricas de PrusaSlicer 2.6.0-alpha2; medición y corte"
estado: parcial
---

## Measurement tool [#3651](https://github.com/prusa3d/PrusaSlicer/issues/3651)

Measurement tool is another feature long demanded by our community. The tool utilizes a geometry detection algorithm that recognizes points (vertices), edges, circles and planes. Users can check model sizes and angles directly in the slicer, so there is no need to open 3rd party software anymore for this purpose. At the moment, it is possible to measure between parts to simplify their better manipulation and organization inside objects (but not between separate objects). Last but not least, the tool allows to uniformly scale the object to the required length by clicking a button in the scene.

One of the current limitations of this tool is its behavior on objects with overlapping parts. In such cases, the parts are considered individually, meaning that edges created by the intersections are not detected, and planes hidden inside other parts are. The tool also does not work well with negative volumes, which are considered as parts.

[![](https://user-images.githubusercontent.com/33929324/214780664-b718d015-4a9e-4c27-9379-a7229eee6d96.gif)](https://user-images.githubusercontent.com/33929324/214780664-b718d015-4a9e-4c27-9379-a7229eee6d96.gif)

## Cut tool update

The Planar Cut tool has been available in PrusaSlicer for a long time. It is handy for preprocessing huge models that don't fit the build volume, are too complicated to print in one piece, or models where only a part is valuable for the user. With this release, we decided to extend its functionality.

The model can newly be cut by a generally oriented plane ([#4368](https://github.com/prusa3d/PrusaSlicer/issues/4368), [#5706](https://github.com/prusa3d/PrusaSlicer/issues/5706)). For cut plane manipulation purposes, the tool enables movement and rotation to an appropriate position. Z positioning is also possible to manage by numerical input value \[mm\]. Rotation around the X and Y axis is set up by a gizmo enhanced with 5 degrees snipping ability. Alternatively, the plane could be defined by selecting two points on an object or in space around it. To use this feature, press Shift and draw the requested cutting plane in the scene using the left mouse button.

Also, we understand how important it is for users to assemble final parts to a single object with an emphasis on precision and simplicity. That's why we added an option to define various types of connectors ([#803](https://github.com/prusa3d/PrusaSlicer/issues/803), [#8656](https://github.com/prusa3d/PrusaSlicer/issues/8656), [#5553](https://github.com/prusa3d/PrusaSlicer/issues/5553), [#1857](https://github.com/prusa3d/PrusaSlicer/issues/1857)). The user can enter editing mode for placing the connectors by pressing a button in the Cut panel. There are several shapes and styles of connectors to choose from. Users can also control the depth, size, and tolerances of each connector member and negative hole.

"Lay down" options help automatically place removed parts straight after the cut performs ([#3154](https://github.com/prusa3d/PrusaSlicer/issues/3154)).

After the cut is performed, the resulting objects "remember" that they belong together and certain operations are not permitted. For example, one cannot scale one object and not the other, as that would make the parts not match. The information is visible in the Object List and is also saved into a 3MF. It is of course possible to break this correspondence and manipulate the objects without limitations.

[![](https://user-images.githubusercontent.com/33929324/214780846-9db779d1-8476-41e1-84cc-d70be4303346.gif)](https://user-images.githubusercontent.com/33929324/214780846-9db779d1-8476-41e1-84cc-d70be4303346.gif)

## Notas del recolector

- Captura parcial: se conservan dos secciones íntegras del registro; se omiten las secciones sobre otras funciones.
- Es una versión alfa histórica: no se presupone que los controles o limitaciones sean iguales en versiones posteriores. La fecha de publicación procede de la ficha indexada de la release.
- Describe rotación del plano de corte, no la rotación general de un objeto. No cuantifica la holgura apropiada para un encaje.
