---
titulo: "M906 - Stepper Motor Current"
url: https://marlinfw.org/docs/gcode/M906.html
sitio: marlinfw.org
tipo: oficial
capturado: 2026-10-16
autor: Marlin Firmware community
idioma: en
---

# M906 - Stepper Motor Current

Set the motor current (in milliamps) TMC2130|TMC2208|TMC2660|L64xx

Related codes: [M907](/docs/gcode/M907.html)

## Description

Set stepper motor currents in milliamps units. Send `M906` with no parameters to report all stepper motor currents.

## Notes

Requires one or more Trinamic stepper drivers.

Versions of Marlin before 2.1.2 also support L64xx stepper drivers.

Stepper drivers with i2c trimpots should use [M907](/docs/gcode/M907.html) instead.

## Usage

` M906 [E<mA>] I<index> [T<index>] [X<mA>] [Y<mA>] [Z<mA>]  `

### Parameters

| `[E<mA>]` | Current for the E0 stepper |
| --- | --- |
| `I<index>` 1.1.9 | Index for multiple steppers. (i.e., `I1` for X2, Y2, Z2; `I2` for Z3; `I3` for Z4). |
| `[T<index>]` 1.1.9 | Index (tool) number for the E axis. If not specified, the E0 extruder. |
| `[X<mA>]` | Current for the X stepper |
| `[Y<mA>]` | Current for the Y stepper |
| `[Z<mA>]` | Current for the Z stepper |

### Examples

Set the XYZ motor currents to 5mA

```gcode
M906 X5 Y5 Z5
```

Set the E1 motor current to 10mA

```gcode
M906 T1 E10
```

Set the X2 motor current to 5mA

```gcode
M906 I1 X5
```

## Notas del recolector

- Documentación oficial de Marlin del comando `M906` para ajustar la corriente de los motores paso a paso (mA) en drivers Trinamic. Relevante para capas desplazadas por corriente insuficiente/excesiva y sobrecalentamiento.
- Página corta; se ha transcrito en su totalidad.
- Original en inglés, sin traducción.
- Verificada por HTTP 200 el 2026-10-16.
---
