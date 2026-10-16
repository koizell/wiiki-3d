---
titulo: "Jerk XY"
url: https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html
sitio: www.orcaslicer.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Jerk XY

In printer firmware, **Jerk** is the maximum speed change (in mm/s) the printer can make instantly, without accelerating. It controls direction changes and velocity transitions during movement.

- [Key Effects](#key-effects)
- [Cornering Control Types](#cornering-control-types)
  - [Junction Deviation](#junction-deviation)
- [Default](#default)
  - [Outer wall](#outer-wall)
  - [Inner wall](#inner-wall)
  - [Infill](#infill)
  - [Top surface](#top-surface)
  - [Initial layer](#initial-layer)
  - [Initial layer travel](#initial-layer-travel)
  - [Travel](#travel)
- [Useful links](#useful-links)

## Key Effects

- **Corner Control**:
  - Lower values = smoother corners, better quality.
  - Higher values = faster cornering, potential artifacts.
- **Print Speed**: Higher jerk reduces deceleration at direction changes, increasing overall speed.
- **Surface Quality**: Lower jerk minimizes vibrations and ringing, especially important for outer walls.

This setting overrides firmware jerk values when different motion types need specific settings. Orca limits jerk to not exceed the Printer's Motion Ability settings.

Tip

Jerk can work in conjunction with [Pressure Advance](https://www.orcaslicer.com/wiki/calibration/pressure_advance_calib.html), [Adaptive Pressure Advance](https://www.orcaslicer.com/wiki/calibration/adaptive_pressure_advance_calib.html), and [Input Shaping](https://www.orcaslicer.com/wiki/calibration/input_shaping_calib.html) to optimize print quality and speed.
It's recommended to follow the [calibration guide](https://www.orcaslicer.com/wiki/guides/calibration_guide.html) order for best results.

## Cornering Control Types

- **Jerk**: Traditional method, sets a maximum speed for direction changes.
  - Klipper: [Square corner velocity](https://www.klipper3d.org/Config_Reference.html#printer)
  - RepRapFirmware: [Maximum instantaneous speed changes](https://docs.duet3d.com/User_manual/Reference/Gcodes#m566-set-allowable-instantaneous-speed-change)
  - Marlin 2: [Classic Jerk](https://marlinfw.org/docs/configuration/configuration.html#jerk-) (deprecated in favor of [Junction Deviation](https://marlinfw.org/docs/configuration/configuration.html#junction-deviation-), but can still be used).
  - Marlin Legacy: [Classic Jerk](https://marlinfw.org/docs/configuration/configuration.html#jerk-).
- **[Junction Deviation](#junction-deviation)**: Modern method, calculates cornering speed based on acceleration.

Tip

Calibrate your cornering values using the [Cornering Calibration guide](https://www.orcaslicer.com/wiki/calibration/cornering_calib.html).

### Junction Deviation

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `default_junction_deviation`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--default-junction-deviation=1`.
Alternative to Jerk, Junction Deviation is the default method for controlling cornering speed in Marlin 2 printers.
Instead of setting a cornering speed for each line type, it calculates the cornering speed from [each line's acceleration](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_acceleration.html) and the corner angle. A Junction Deviation equivalent to a given jerk value can be estimated with the formula:

\[ JD = 0.4 \cdot \frac{\text{Jerk}^2}{\text{Accel.}} \]

Higher values result in faster and more aggressive cornering speeds, while lower values produce smoother, more controlled cornering.

Note

Classic Jerk can still be used in Marlin 2, but it is deprecated in favor of Junction Deviation.
If your printer uses Classic Jerk, set [Maximum Junction Deviation](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html#maximum-junction-deviation) to `0` in the printer settings to enable the Jerk settings.

This value is limited by [Printer settings > Motion ability > Maximum Junction Deviation](https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html#maximum-junction-deviation).

## Default

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `default_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--default-jerk=1`.
Default Jerk value.

Note

If this value is set to 0, the jerk will be set to the printer's default jerk.

### Outer wall

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `outer_wall_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--outer-wall-jerk=1`.
Jerk for outer wall printing. This is usually set to a lower value than normal printing to ensure better quality.

### Inner wall

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `inner_wall_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--inner-wall-jerk=1`.
Jerk for inner wall printing. This is usually set to a moderately higher value than outer wall jerk to improve speed.

### Infill

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `infill_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--infill-jerk=1`.
Jerk for infill printing. This is usually set to a value higher than inner wall printing to improve speed.

### Top surface

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `top_surface_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--top-surface-jerk=1`.
Jerk for top surface printing. This is usually set to a lower value than infill to ensure better quality.

### Initial layer

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `initial_layer_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--initial-layer-jerk=1`.
Jerk for initial layer printing. This is usually set to a lower value than top surface to improve adhesion.

### Initial layer travel

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `initial_layer_travel_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float or Percentage list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--initial-layer-travel-jerk=20%`.
Jerk for initial layer travel. Using a lower value can improve build plate adhesion. If the value is expressed as a percentage (e.g. 50%), it will be calculated based on the [Travel Jerk](#travel).

### Travel

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `travel_jerk`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--travel-jerk=1`.
Jerk for travel moves. This is usually set to a higher value than infill to reduce travel time.

## Useful links

- [Klipper Kinematics](https://www.klipper3d.org/Kinematics.html?h=accelerat#acceleration)
- [Marlin Junction Deviation](https://marlinfw.org/docs/configuration/configuration.html#junction-deviation-)
- [JD Explained and Visualized, by Paul Wanamaker](https://reprap.org/forum/read.php?1,739819)
- [Computing JD for Marlin Firmware](https://blog.kyneticcnc.com/2018/10/computing-junction-deviation-for-marlin.html)
- [Improving GRBL: Cornering Algorithm](https://onehossshay.wordpress.com/2011/09/24/improving_grbl_cornering_algorithm/)
- [Pressure Advance Calibration](https://www.orcaslicer.com/wiki/calibration/pressure_advance_calib.html)
- [Adaptive Pressure Advance](https://www.orcaslicer.com/wiki/calibration/adaptive_pressure_advance_calib.html)

## Notas del recolector

- Página del wiki oficial de OrcaSlicer sobre jerk (XY) y control de esquinas, relevante para layer shift por cambios bruscos de velocidad/dirección.
- Texto completo del artículo.
- Original en inglés, sin traducción.
- Verificada por HTTP 200 el 2026-10-16.
---
