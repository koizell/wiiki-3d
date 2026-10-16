---
titulo: "M221 - Set Flow Percentage"
url: https://marlinfw.org/docs/gcode/M221.html
sitio: marlinfw.org
tipo: oficial
capturado: 2026-10-16
autor: Marlin Firmware
idioma: en
---

# M221 - Set Flow Percentage

motion Set the flow percentage, which applies to all E moves.

## Description

Set the flow percentage, which applies to all E moves added to the planner.

## Usage

`M221 S<percent> [T<index>]`

#### Parameters

| `S<percent>` | Flow percentage |
| `[T<index>]` | Target extruder (requires multi-extruder). Default is the active extruder. |

## Example

Set the flow rate to 150%.

```gcode
M221 S150
```

## Notas del recolector

- Fuente oficial Marlin Firmware. Define el comando M221 que fija el porcentaje de flujo (flow percentage) que se aplica a todos los movimientos del extrusor; es el mismo valor que Prusa llama «Flow rate» en el menú Tune del firmware. Ejemplo del original: `M221 S150` fija el flujo al 150%.
- Esta página es muy breve; no describe calibración, sólo el comando y sus parámetros.
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
