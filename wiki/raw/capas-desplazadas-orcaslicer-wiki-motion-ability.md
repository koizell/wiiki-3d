---
titulo: "Motion Ability"
url: https://www.orcaslicer.com/wiki/printer_settings/motion%20ability/printer_motion_ability.html
sitio: www.orcaslicer.com
tipo: oficial
capturado: 2026-10-16
autor: OrcaSlicer project
idioma: en
---

# Motion Ability

Settings related to the motion capabilities of the printer.

- [Emit limits to G-code](#emit-limits-to-g-code)
- [Resonance Compensation](#resonance-compensation)
  - [Resonance Avoidance](#resonance-avoidance)
  - [Input Shaping](#input-shaping)
    - [Input Shaping Type](#input-shaping-type)
      - [Default](#default)
      - [Version Table](#version-table)
        - [Fixed-Time Motion](#fixed-time-motion)
- [Speed limitation](#speed-limitation)
- [Acceleration limitation](#acceleration-limitation)
- [Jerk limitation](#jerk-limitation)
  - [Maximum Jerk](#maximum-jerk)
  - [Maximum Junction Deviation](#maximum-junction-deviation)

## Emit limits to G-code

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `emit_machine_limits_to_gcode`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#boolean): `Boolean`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--emit-machine-limits-to-gcode=1`.
If enabled, the machine limits will be emitted to G-code file. This option will be ignored if the G-code flavor is set to Klipper.

## Resonance Compensation

Resonance Compensations are the methods used to reduce the vibrations of the printer during high-speed movements, which can cause ringing on the surface of the model.

### Resonance Avoidance

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variables](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `resonance_avoidance`, `min_resonance_avoidance_speed`, `max_resonance_avoidance_speed`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html): `resonance_avoidance` (Boolean), `min_resonance_avoidance_speed` (Float), `max_resonance_avoidance_speed` (Float).
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--resonance-avoidance=1` (`resonance_avoidance` shown; other variables above follow their own type).
By reducing the speed of the outer wall to avoid the resonance zone of the printer, ringing on the surface of the model are avoided.

Tip

Check the [VFA Calibration](https://www.orcaslicer.com/wiki/calibration/vfa_calib.html).

### Input Shaping

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Expert`.
[Variables](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `input_shaping_emit`, `input_shaping_freq_x`, `input_shaping_freq_y`, `input_shaping_damp_x`, `input_shaping_damp_y`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html): `input_shaping_emit` (Boolean), `input_shaping_freq_x` (Float), `input_shaping_freq_y` (Float), `input_shaping_damp_x` (Float), `input_shaping_damp_y` (Float).
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--input-shaping-emit=1` (`input_shaping_emit` shown; other variables above follow their own type).
During high-speed movements, vibrations can cause a phenomenon called "ringing," where periodic ripples appear on the print surface. Input Shaping provides an effective solution by counteracting these vibrations, improving print quality and reducing wear on components without needing to significantly lower print speeds.

Note

Some Printers have built-in accelerometers that can be used to **automatically** measure the resonant frequencies of the printer.
If your printer has one, consider using it as it can provide more accurate results in less time and usually is autosaved into the printer firmware.

Tip

It's usually recommended to perform [Input Shaping calibration](https://www.orcaslicer.com/wiki/calibration/input_shaping_calib.html) once a year or after any mechanical or structural changes such as relocation, changing the support surface, new belts, motors, frame, etc.

## Speed limitation

Safeguard maximum speeds for all axes. This will cap the speed set by the process if it exceeds these values.

## Acceleration limitation

[Modes](https://www.orcaslicer.com/wiki/general_settings/option_mode.html):
`Simple` [Variables](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `machine_max_acceleration_x`, `machine_max_acceleration_y`, `machine_max_acceleration_z`, `machine_max_acceleration_e`, `machine_max_acceleration_extruding`, `machine_max_acceleration_retracting`.
`Advanced` [Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `machine_max_acceleration_travel`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--machine-max-acceleration-x=1` (same pattern for the other variables above).
Safeguard maximum accelerations for all axes. This will cap the acceleration set by the process if it exceeds these values.

## Jerk limitation

Safeguard maximum jerks for all axes.

Tip

Check the [Cornering Calibration](https://www.orcaslicer.com/wiki/calibration/cornering_calib.html).

### Maximum Jerk

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Simple`.
[Variables](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `machine_max_jerk_x`, `machine_max_jerk_y`, `machine_max_jerk_z`, `machine_max_jerk_e`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--machine-max-jerk-x=1` (same pattern for the other variables above).
Maximum [jerk](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html) for each axis (M205 X, Y, Z, E, only apply if JD = 0 for Marlin 2 Firmware)

### Maximum Junction Deviation

[Mode](https://www.orcaslicer.com/wiki/general_settings/option_mode.html): `Advanced`.
[Variable](https://www.orcaslicer.com/wiki/developer_reference/built_in_placeholders_variables.html): `machine_max_junction_deviation`.
[Type](https://www.orcaslicer.com/wiki/general_settings/option_type.html#list-types): `Float list`.
[CLI Example](https://www.orcaslicer.com/wiki/cli/cli_mode.html#setting-overrides): `--machine-max-junction-deviation=1`.
Maximum [junction deviation](https://www.orcaslicer.com/wiki/print_settings/speed/speed_settings_jerk_xy.html#junction-deviation) (M205 J, only apply if JD > 0 for Marlin Firmware. If your Marlin 2 printer uses Classic Jerk set this value to 0.)

## Notas del recolector

- Página de referencia del wiki oficial de OrcaSlicer sobre las capacidades de movimiento de la impresora, incluida en este lote por su sección de limitación de aceleración y jerk, proceso directamente con layer shift por pérdida de pasos.
- Se ha conservado el cuerpo principal de la página; se han omitido la tabla de compatibilidad de tipos de input shaping y el árbol de navegación del sitio.
- Original en inglés, sin traducción.
- Fuente verificada por HTTP (200) el 2026-10-16.
