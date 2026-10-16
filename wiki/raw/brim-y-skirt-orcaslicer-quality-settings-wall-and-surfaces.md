---
titulo: "Wall and surfaces"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/quality_settings_wall_and_surfaces
sitio: github.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Wall and surfaces

## Surface flow ratio

[Mode](option_mode): `Advanced`.
[Variables](built_in_placeholders_variables): `print_flow_ratio`, `top_solid_infill_flow_ratio`, `bottom_solid_infill_flow_ratio`, `set_other_flow_ratios`, `first_layer_flow_ratio`, `outer_wall_flow_ratio`, `inner_wall_flow_ratio`, `overhang_flow_ratio`, `sparse_infill_flow_ratio`, `internal_solid_infill_flow_ratio`, `gap_fill_flow_ratio`, `support_flow_ratio`, `support_interface_flow_ratio`.
[Type](option_type#integer-float-percentage): `Float` — every variable above except `set_other_flow_ratios`, which is a [Boolean](option_type#boolean) enable toggle for all the others (`--set-other-flow-ratios=1`).
[CLI Example](cli_mode#setting-overrides): `--print-flow-ratio=1` (same pattern for the other Float variables above).
The Flow ratio (`print_flow_ratio`) scales all extrusion flow of the object proportionally.

The top and bottom surface flow ratios affect the amount of material for top or bottom solid infill. You can decrease them slightly to get a smoother surface finish.
The actual top or bottom surface flow used is calculated by multiplying this value by the [filament flow ratio](material_flow_ratio_and_pressure_advance#flow-ratio), and if set, the object's flow ratio.

Other flow ratios, such as ratios for the first layer (does not affect brims and skirts), outer and inner walls, overhang perimeters, sparse infill, internal solid infill, gap fill, support, and support interfaces, can also be adjusted after enabling the "Set other flow ratios" option.

Tip

Before using a value other than 1, it is recommended to [calibrate the flow ratio](flow_ratio_calib) to ensure that the flow ratio is set correctly for your printer and filament.

## Notas del recolector

- Fuente oficial del wiki de OrcaSlicer. Aporta el matiz accionable de que el flow ratio de primera capa (first_layer_flow_ratio) **no afecta a brims y skirts**; sólo al resto de la primera capa.
- Se conserva el listado de variables de flow ratio y la indicación de calibrar antes de usar valores distintos de 1.
- Texto original en inglés, no traducido.
