---
titulo: "Elephant foot compensation"
url: https://help.prusa3d.com/article/elephant-foot-compensation_114487
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-16
autor: Prusa Research
idioma: en
---

Elephant foot compensation

# ¶ Elephant foot compensation

[imagen — elephant_foot_compensation.png]

## Contents

- Adaptive elephant foot compensation

This option is not available when PrusaSlicer is in Simple mode.

When printing the first layer is squished against the heated print bed and as a result, it's usually a bit wider than it should be.

For many applications, this might not be an issue. But if you have something that really needs to have precise dimensions or fit together with very tight tolerances, it can be a problem.

[imagen — elephant_foot.png — Without the Elephant foot compensation, the first layer may be wider than expected]

### Adaptive elephant foot compensation

Instead of having to sand this slight edge off, this setting will scale/shrink the first layer.

You'll find it under Print settings - Advanced - Elephant foot compensation. To access this setting, PrusaSlicer must be in Advanced or Expert mode.

[imagen — elephant_settig.png]

Values around 0.2 mm usually work well for the default 0.4 mm nozzle.

PrusaSlicer automatically detects thin lines in the first layer and makes sure not to over shrink them. This detection is present in PrusaSlicer 2.2 and newer.

[imagen — version_comparison.png]

Official Prusa profiles have this setting turned on by default.

#### Brim doesn't connect to the model with Elephant foot compensation turned on

This is on purpose. The elephant foot compensation compensates for the squish, which is not visualized in the preview. In reality, the gap will be filled in by the squished-out material. Though it is true, that the brim will have a weaker connection to the model with the elephant foot compensation turned on.

If the brim doesn't connect to the part when printed, you likely have Elephant foot compensation set too high.

#### The first layer seems deformed in the preview

A side effect of the Adaptive elephant foot compensation is a possible distortion in spots where thin features connect to bigger parts of the model. This distortion is mainly pronounced in the preview (in reality, the squish of the first layer will fill more area than shown) and only affects the first layer. Still, if this is an issue for you, turn the Elephant compensation off (turn it to 0).

[imagen — deformation.png]

## Notas del recolector

- URL comprobada: 200. Página oficial de Prusa Knowledge Base; el cuerpo llega en el HTML renderizado (Next.js), no en el markdown plano.
- La fuente es corta y densa en una sola idea: la causa física (primera capa aplastada contra la cama caliente) y el remedio del slicer (escalar/achicar la primera capa). Da un valor de partida concreto: ~0,2 mm para boquilla de 0,4 mm por defecto.
- Avisa de dos efectos secundarios que importan al aplicarlo: (1) el brim se ve desconectado en la vista previa, (2) distorsión en geometrías finas de la primera capa.
- Mentiza explícitamente dos cosas que no hay que perder: no está disponible en modo Simple; y detecta thin lines desde PrusaSlicer 2.2.
- El perfil oficial Prusa lo trae activado por defecto, así que no sirve como «fix manual» único.
- Texto original en inglés, no traducido. Imágenes sustituidas por su nombre de archivo.
