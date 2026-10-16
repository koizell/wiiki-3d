---
titulo: "Acceleration"
url: https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html
sitio: www.orcaslicer.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Acceleration

Acceleration in 3D printing is usually set in the printer's firmware.
These settings override the firmware acceleration when the [normal printing acceleration](#normal-printing) is greater than 0.
Orca limits the acceleration so it doesn't exceed the maximum set in the printer's Motion Ability settings.

- [Normal printing](#normal-printing)
- [Outer wall](#outer-wall)
- [Inner wall](#inner-wall)
- [Bridge](#bridge)
- [Sparse infill](#sparse-infill)
- [Internal solid infill](#internal-solid-infill)
- [Initial layer](#initial-layer)
- [Initial layer travel](#initial-layer-travel)
- [Top surface](#top-surface)
- [Travel](#travel)
- [Enable accel to decel](#enable-accel-to-decel)
  - [Accel to decel](#accel-to-decel)

## Normal printing

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `default_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--default-acceleration=1`.
The default acceleration for both normal printing and travel after the first layer.

Note

If this value is set to 0, Orca doesn't send acceleration commands, so the printer's own acceleration is used and the other acceleration settings are disabled.

## Outer wall

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `outer_wall_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--outer-wall-acceleration=1`.
Acceleration for [outer wall](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_other_layers_speed.html#outer-wall) printing. This is usually set to a lower value than normal printing to ensure better quality.

## Inner wall

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `inner_wall_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--inner-wall-acceleration=1`.
Acceleration for [inner wall](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_other_layers_speed.html#inner-wall) printing. This is usually set to a higher value than outer wall printing to improve speed.

## Bridge

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `bridge_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float or Percentage list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--bridge-acceleration=20%`.
Acceleration of [bridges](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_overhang_speed.html#bridge-speed). If the value is expressed as a percentage (e.g. 50%), it will be calculated based on the outer wall acceleration.

## Sparse infill

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `sparse_infill_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float or Percentage list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--sparse-infill-acceleration=20%`.
Acceleration of [sparse infill](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_other_layers_speed.html#sparse-infill). If the value is expressed as a percentage (e.g. 100%), it will be calculated based on the default acceleration.

## Internal solid infill

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `internal_solid_infill_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float or Percentage list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--internal-solid-infill-acceleration=20%`.
Acceleration of [internal solid infill](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_other_layers_speed.html#internal-solid-infill). If the value is expressed as a percentage (e.g. 100%), it will be calculated based on the default acceleration.

## Initial layer

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `initial_layer_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--initial-layer-acceleration=1`.
Acceleration of [initial layer](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_initial_layer_speed.html). Using a lower value can improve build plate adhesion.

## Initial layer travel

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `initial_layer_travel_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float or Percentage list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--initial-layer-travel-acceleration=20%`.
Acceleration of [initial layer travel](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_initial_layer_speed.html#initial-layer-travel-speed). Using a lower value can improve build plate adhesion. If the value is expressed as a percentage (e.g. 50%), it will be calculated based on the [Travel Acceleration](#travel).

## Top surface

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `top_surface_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--top-surface-acceleration=1`.
Acceleration of [top surface infill](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_other_layers_speed.html#top-surface). Using a lower value may improve top surface quality.
A value similar to the [outer wall acceleration](#outer-wall) is recommended.

## Travel

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `travel_acceleration`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--travel-acceleration=1`.
Acceleration of [travel](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_travel.html) moves. This is usually set to a higher value than normal printing to reduce travel time.

## Enable accel to decel

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `accel_to_decel_enable`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#boolean): `Boolean`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--accel-to-decel-enable=1`.
Adjusts Klipper's `max_accel_to_decel` automatically. Each time Orca sets the acceleration with `SET_VELOCITY_LIMIT ACCEL=`, it adds `ACCEL_TO_DECEL=` at the [accel to decel](#accel-to-decel) percentage of that acceleration. When disabled, `ACCEL_TO_DECEL` is not sent.
This option is only shown when the [G-code flavor](https://www.orcaslicer.com/wiki/printer_settings/basic%20information/printer_basic_information_advanced.html#g-code-flavor) is Klipper, and it is enabled by default.

### Accel to decel

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `accel_to_decel_factor`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#integer-float-percentage): `Percentage`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--accel-to-decel-factor=20%`.
Percentage of the acceleration that Klipper's `max_accel_to_decel` is set to, from 1% to 100% (default 50%).
For example, at 5000 mm/s² and 50%, Orca sends `SET_VELOCITY_LIMIT ACCEL=5000 ACCEL_TO_DECEL=2500`. It can only be edited when [Enable accel to decel](#enable-accel-to-decel) is checked.

## Notas del recolector

- Página del wiki oficial de OrcaSlicer sobre los parámetros de aceleración del proceso de impresión, incluida porque explica cómo el slicer impone/cambia aceleraciones y cuándo queda la del firmware.
- Texto completo del artículo, sin resumir.
- Original en inglés, sin traducción.
- Verificada por HTTP 200 el 2026-10-16.
---
