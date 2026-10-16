---
titulo: "TMC drivers"
url: https://www.klipper3d.org/TMC_Drivers.html
sitio: www.klipper3d.org
tipo: oficial
capturado: 2026-10-16
autor: Klipper project
idioma: en
---

# TMC drivers

This document provides information on using Trinamic stepper motor drivers in SPI/UART mode on Klipper.

Klipper can also use Trinamic drivers in their "standalone mode". However, when the drivers are in this mode, no special Klipper configuration is needed and the advanced Klipper features discussed in this document are not available.

In addition to this document, be sure to review the [TMC driver config reference](Config_Reference.html#tmc-stepper-driver-configuration).

## Tuning motor current

A higher driver current increases positional accuracy and torque. However, a higher current also increases the heat produced by the stepper motor and the stepper motor driver. If the stepper motor driver gets too hot it will disable itself and Klipper will report an error. If the stepper motor gets too hot, it loses torque and positional accuracy. (If it gets very hot it may also melt plastic parts attached to it or near it.)

As a general tuning tip, prefer higher current values as long as the stepper motor does not get too hot and the stepper motor driver does not report warnings or errors. In general, it is okay for the stepper motor to feel warm, but it should not become so hot that it is painful to touch.

## Prefer to not specify a hold_current

If one configures a `hold_current` then the TMC driver can reduce current to the stepper motor when it detects that the stepper is not moving. However, changing motor current may itself introduce motor movement. This may occur due to "detent forces" within the stepper motor (the permanent magnet in the rotor pulls towards the iron teeth in the stator) or due to external forces on the axis carriage.

Most stepper motors will not obtain a significant benefit to reducing current during normal prints, because few printing moves will leave a stepper motor idle for sufficiently long to activate the `hold_current` feature. And, it is unlikely that one would want to introduce subtle print artifacts to the few printing moves that do leave a stepper idle sufficiently long.

If one wishes to reduce current to motors during print start routines, then consider issuing [SET_TMC_CURRENT](G-Codes.html#set_tmc_current) commands in a [START_PRINT macro](Slicers.html#klipper-gcode_macro) to adjust the current before and after normal printing moves.

Some printers with dedicated Z motors that are idle during normal printing moves (no bed_mesh, no bed_tilt, no Z skew_correction, no "vase mode" prints, etc.) may find that Z motors do run cooler with a `hold_current`. If implementing this then be sure to take into account this type of uncommanded Z axis movement during bed leveling, bed probing, probe calibration, and similar. The `driver_TPOWERDOWN` and `driver_IHOLDDELAY` should also be calibrated accordingly. If unsure, prefer to not specify a `hold_current`.

## Setting "spreadCycle" vs "stealthChop" Mode

By default, Klipper places the TMC drivers in "spreadCycle" mode. If the driver supports "stealthChop" then it can be enabled by adding `stealthchop_threshold: 999999` to the TMC config section.

In general, spreadCycle mode provides greater torque and greater positional accuracy than stealthChop mode. However, stealthChop mode may produce significantly lower audible noise on some printers.

Tests comparing modes have shown an increased "positional lag" of around 75% of a full-step during constant velocity moves when using stealthChop mode (for example, on a printer with 40mm rotation_distance and 200 steps_per_rotation, position deviation of constant speed moves increased by ~0.150mm). However, this "delay in obtaining the requested position" may not manifest as a significant print defect and one may prefer the quieter behavior of stealthChop mode.

It is recommended to always use "spreadCycle" mode (by not specifying `stealthchop_threshold`) or to always use "stealthChop" mode (by setting `stealthchop_threshold` to 999999). Unfortunately, the drivers often produce poor and confusing results if the mode changes while the motor is at a non-zero velocity.

Note that the `stealthchop_threshold` config option does not impact sensorless homing as Klipper automatically switches the TMC driver to an appropriate mode during sensorless homing operations.

## TMC interpolate setting introduces small position deviation

The TMC driver `interpolate` setting may reduce the audible noise of printer movement at the cost of introducing a small systemic positional error. This systemic positional error results from the driver's delay in executing "steps" that Klipper sends it. During constant velocity moves, this delay results in a positional error of nearly half a configured microstep (more precisely, the error is half a microstep distance minus a 512th of a full step distance). For example, on an axis with a 40mm rotation_distance, 200 steps_per_rotation, and 16 microsteps, the systemic error introduced during constant velocity moves is ~0.006mm.

For best positional accuracy consider using spreadCycle mode and disable interpolation (set `interpolate: False` in the TMC driver config). When configured this way, one may increase the `microstep` setting to reduce audible noise during stepper movement. Typically, a microstep setting of `64` or `128` will have similar audible noise as interpolation, and do so without introducing a systemic positional error.

If using stealthChop mode then the positional inaccuracy from interpolation is small relative to the positional inaccuracy introduced from stealthChop mode. Therefore tuning interpolation is not considered useful when in stealthChop mode, and one can leave interpolation in its default state.

## Common Questions

### Why did I get a "TMC reports error: ..." error?

This type of error indicates the TMC driver detected a problem and has disabled itself. That is, the driver stopped holding its position and ignored movement commands. If Klipper detects that an active driver has disabled itself, it will transition the printer into a "shutdown" state.

Some common errors and tips for diagnosing them:

#### TMC reports error: `... ot=1(OvertempError!)`

This indicates the motor driver disabled itself because it became too hot. Typical solutions are to decrease the stepper motor current, increase cooling on the stepper motor driver, and/or increase cooling on the stepper motor.

#### TMC reports error: `... ShortToGND` OR `ShortToSupply`

This indicates the driver has disabled itself because it detected very high current passing through the driver. This may indicate a loose or shorted wire to the stepper motor or within the stepper motor itself.

This error may also occur if using stealthChop mode and the TMC driver is not able to accurately predict the mechanical load of the motor. (If the driver makes a poor prediction then it may send too much current through the motor and trigger its own over-current detection.) To test this, disable stealthChop mode and check if the errors continue to occur.

#### TMC reports error: `... reset=1(Reset)` OR `CS_ACTUAL=0(Reset?)` OR `SE=0(Reset?)`

This indicates that the driver has reset itself mid-print. This may be due to voltage or wiring issues.

#### TMC reports error: `... uv_cp=1(Undervoltage!)`

This indicates the driver has detected a low-voltage event and has disabled itself. This may be due to wiring or power supply issues.

## Notas del recolector

- Documentación oficial de Klipper sobre drivers Trinamic (TMC), incluida por su sección de calibración de corriente de motor, modos spreadCycle/stealthChop y errores de driver, todos relevantes para layer shift por pérdida de pasos.
- Se han omitido las secciones de sensorless homing (homing sin finales de carrera) y configuración de campos `driver_XXX`, por no aportar a la causa mecánica de desplazamiento, con el fin de mantener el fichero manejable. Lo omitido no se ha resumido; remitir a la URL original.
- Original en inglés, sin traducción.
- Verificada por HTTP 200 el 2026-10-16.
---
