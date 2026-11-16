---
titulo: "PrusaSlicer 2.3.0-alpha1 — Support for imperial units"
url: https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.3.0-alpha1
url_final: https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.3.0-alpha1
sitio: github.com
tipo: oficial
autor: "Prusa Research"
idioma: en
publicado: 2020-10-17
actualizado: "sin fecha visible"
capturado: 2026-11-16
alcance: "PrusaSlicer 2.3.0-alpha1: importación de STL y visualización de unidades"
estado: parcial
---

## Support for imperial units [#1041](https://github.com/prusa3d/PrusaSlicer/issues/1041) [#1407](https://github.com/prusa3d/PrusaSlicer/issues/1407) [#1463](https://github.com/prusa3d/PrusaSlicer/issues/1463) [#1811](https://github.com/prusa3d/PrusaSlicer/issues/1811) [#2570](https://github.com/prusa3d/PrusaSlicer/issues/2570)

We newly provide support for imperial units for our US customers. PrusaSlicer uses metric system internally, namely all internal dimensions (model sizes, model positions, print & printer profiles and G-code) are measured in millimeters. To make the life easier to our US customers, we newly support imperial units in the following way:

-   The "Object manipulation" panel newly offers an "Inches" check box. If enabled, the object position and scaling is presented and accepted in inches. PrusaSlicer still keeps the internal dimensions in mm, however they are converted from/to inches when presented to the user.
-   The state of the "Inches" checkbox at the "Object manipulation" panel persists in application preferences as "use\_inches" option. Initial state of the "Inches" checkbox is set at the last page of the application configuration wizard.
-   The filament usage is shown in inches if the "Inches" mode is enabled.

The models are still imported / exported in millimeters by default, as most of the models available are in millimeters. However, we newly support the following:

-   Importing STLs saved in inches by menu File->Import->Import STL (Imperial Units). STLs are converted from inches to millimeters on import.
-   Object and Volume context menu newly contain "Convert from Imperial Unit" to scale from inches to millimeters after an object with dimensions in inches was loaded as in millimeters.
-   Object and Volume context menu newly contain "Revert conversion from Imperial Unit" to revert the above, or if the user loaded an object in mm through "Import STL (Imperial Units)".
-   If the model loaded is very small, a conversion from inches to millimeters is newly offered [#4521](https://github.com/prusa3d/PrusaSlicer/issues/4521).

## Notas del recolector

- Se reproduce la sección completa sobre unidades; el resto del registro no se incluye.
- Versión alfa histórica: la secuencia y los nombres se documentan para 2.3.0-alpha1, no se verificaron en versiones actuales.
- La oferta para modelos pequeños aparece como oferta, no como prueba de la unidad original.
