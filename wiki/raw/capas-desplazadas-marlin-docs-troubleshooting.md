---
titulo: "Troubleshooting Tips"
url: https://marlinfw.org/docs/basics/troubleshooting.html
sitio: marlinfw.org
tipo: oficial
capturado: 2026-10-16
autor: Marlin Firmware community
idioma: en
---

# Troubleshooting Tips

This page needs more content for completeness. Please contribute!

(Se incluyen a continuación los apartados relevantes para el layer shift; la página original contiene también otras secciones de solución de problemas del LCD, probing G29, calentamiento, EEPROM, PlatformIO, etc.)

## Trinamic Stepper Drivers

These tips are collected from various reports we have received. See [Trinamic troubleshooting](/docs/hardware/tmc_drivers.html#troubleshooting) for additional guidance.

- Some SilentStepSticks with variable 3-5V logic voltage (VIO) [might get damaged](//github.com/MarlinFirmware/Marlin/issues/10162#issuecomment-397844847) if only powered over USB.

- **SPI conflict with the SD card?** Solutions vary.

- **E Stepper won’t move when using Linear Advance with TMC drivers?**

  - “I ended up using the drivers in legacy mode and setting them to SpreadCycle using the OTP (One Time Programmer). Unfortunately trying to set individual drivers to SpreadCycle via UART by enabling HybridThreshhold and setting the threshold to 0 for the respective axes did not work.” See [#11825](//github.com/MarlinFirmware/Marlin/issues/11825).

- **Loud / grinding TMC2208?** Increase the current to ~1500mA and lower the Hybrid Threshold.

- **Unreliable printing, shifting layers?** Make sure the ‘rsense’ value is configured according to recommendations. See [#9368](//github.com/MarlinFirmware/Marlin/issues/9368).

- **TMC2208** uses **SoftwareSerial**, and this conflicts with **Endstop Interrupts**. Disable Endstop Interrupts to proceed.

- **Should I use `SOFTWARE_DRIVER_ENABLE`?** Not unless required by the hardware. See [#13326](//github.com/MarlinFirmware/Marlin/issues/13326).

## Random Halting

An under-powered PSU combined with heaters and high speed moves can lead to a frozen board. No kill, no watchdog, heaters stuck on. See [#17202](//github.com/MarlinFirmware/Marlin/issues/17202). To test for this:

- To test for this, enable the bed and extruder heaters and print at high speed to see if a hard freeze occurs. Try disabling heaters and/or slower printing to see if the problem goes away.

- Read the input voltage from PSU with a meter during fast moves. If you see a drop too far below your expected voltage (e.g., 12V or 24V) this indicates a problem.

## Notas del recolector

- Documentación oficial de Marlin. Se incluye el apartado sobre drivers Trinamic, que vincula explícitamente "shifting layers" con el valor `rsense` de los drivers TMC, y el apartado de fallos aleatorios por fuente insuficiente.
- Resto de la página (LCD, G29, calentamiento, EEPROM, PlatformIO) omitido por no ser relevante al tema; consultar la URL original.
- Original en inglés, sin traducción.
- Verificada por HTTP 200 el 2026-10-16.
---
