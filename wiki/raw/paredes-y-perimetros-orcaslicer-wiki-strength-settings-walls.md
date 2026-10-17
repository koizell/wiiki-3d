---
titulo: "Walls | OrcaSlicer Wiki"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/strength_settings_walls
sitio: github.com/OrcaSlicer
tipo: oficial
capturado: 2026-10-17
autor: OrcaSlicerBot
idioma: en
---

# Walls

In 3D printing, "walls" refer to the outer layers of a printed object that provide its shape and structural integrity.
Adjusting wall settings can significantly affect layer adhesion, strength, appearance and print time of your model.

![walls](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/walls/walls.png?raw=true)

- [Wall loops](#wall-loops)
- [Alternate extra wall](#alternate-extra-wall)
- [Detect thin wall](#detect-thin-wall)

Tip

**Recommended**

Advanced tips on improving strength.

[ ![makers-muse-walls-strength](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/video/makers-muse-walls-strength.png?raw=true)](https://www.youtube.com/watch?v=c7CI6yBTKMc)

Video by **Maker's Muse**, with consent.

## Wall loops

[Mode](option_mode): `Simple`.
[Variable](built_in_placeholders_variables): `wall_loops`.
[Type](option_type#integer-float-percentage): `Integer`.
[CLI Example](cli_mode#setting-overrides): `--wall-loops=1`.
"Wall loops" is the number of walls printed on each layer.
Increasing the wall loops will:

- Enhance:
  - Layer adhesion
  - Strength
  - Rigidity
- Reduce infill ghosting
- Increase print time

## Alternate extra wall

[Mode](option_mode): `Advanced`.
[Variable](built_in_placeholders_variables): `alternate_extra_wall`.
[Type](option_type#boolean): `Boolean`.
[CLI Example](cli_mode#setting-overrides): `--alternate-extra-wall=1`.
This setting adds an extra wall to every other layer. This way the infill gets wedged vertically between the walls, resulting in stronger prints.
This option doesn't work well when Ensure vertical shell thickness is set to **All**; when both are enabled, OrcaSlicer offers to change it to **Moderate**.

Warning

It's not recommended to use this option with:

- [Lightning infill](strength_settings_patterns#lightning) as there is limited infill to anchor the extra perimeters to.
- **[Ensure vertical shell thickness: All](strength_settings_advanced#ensure-vertical-shell-thickness)**

## Detect thin wall

[Mode](option_mode): `Advanced`.
[Variable](built_in_placeholders_variables): `detect_thin_wall`.
[Type](option_type#boolean): `Boolean`.
[CLI Example](cli_mode#setting-overrides): `--detect-thin-wall=1`.
By default, walls are printed as closed loops. When a wall is too thin to contain two line widths, enabling "Detect thin walls" prints it as a single extrusion line.
Thin walls printed this way may have reduced surface quality and strength because they are not closed loops.

Tip

It is usually recommended to use the [Arachne wall generator](quality_settings_wall_generator#arachne), which disables "Detect thin walls" because it uses a different approach to wall generation.

- In small details, it can generate features that wouldn't be possible with traditional wall generation methods.
![walls-small-detect-thin-off](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/walls/walls-small-detect-thin-off.png?raw=true) ![walls-small-detect-thin-on](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/walls/walls-small-detect-thin-on.png?raw=true)

- In large prints, it can generate defects more easily due to the reduced wall thickness. ![walls-big-detect-thin-off-on](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/walls/walls-big-detect-thin-off-on.png?raw=true)

## Notas del recolector

- Fuente oficial de OrcaSlicer (wiki de GitHub). Página "Walls" de los ajustes de resistencia.
- Define los muros como las capas exteriores del objeto que dan forma e integridad estructural; el ajuste `wall_loops` es el número de paredes por capa.
- Aumentar `wall_loops` mejora adherencia de capa, resistencia y rigidez, reduce el ghosting del relleno y aumenta el tiempo de impresión.
- `alternate_extra_wall` añade una pared extra cada dos capas para que el relleno quede encajado verticalmente entre paredes; incompatible con "Ensure vertical shell thickness: All".
- `detect_thin_wall` imprime paredes delgadas como una sola línea de extrusión cuando no caben dos anchos de línea; reduce calidad superficial y resistencia por no ser bucles cerrados.
- Idioma original: inglés. No traducido.
- Imágenes referenciadas por URL, no descargadas.
path: wiki/raw/paredes-y-perimetros-orcaslicer-wiki-strength-settings-walls.md