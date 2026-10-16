---
titulo: "Frequently Asked Questions"
url: https://www.klipper3d.org/FAQ.html
sitio: www.klipper3d.org
tipo: oficial
capturado: 2026-10-16
autor: Klipper project
idioma: en
---

# Frequently Asked Questions

(Página completa de preguntas frecuentes del proyecto Klipper. Se incluyen a continuación los apartados relevantes para la pérdida de pasos y el layer shift; el resto de la página cubre instalación, puertos serie, configuración y otros temas.)

## My TMC motor driver turns off in the middle of a print

If using the TMC2208 (or TMC2224) driver in "standalone mode" then make sure to use the [latest version of Klipper](#how-do-i-upgrade-to-the-latest-software). A workaround for a TMC2208 "stealthchop" driver problem was added to Klipper in mid-March of 2020.

## I keep getting random "Lost communication with MCU" errors

This is commonly caused by hardware errors on the USB connection between the host machine and the micro-controller. Things to look for:

- Use a good quality USB cable between the host machine and micro-controller. Make sure the plugs are secure.

- If using a Raspberry Pi, use a [good quality power supply](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply) for the Raspberry Pi and use a [good quality USB cable](https://forums.raspberrypi.com/viewtopic.php?p=589877#p589877) to connect that power supply to the Pi. If you get "under voltage" warnings from OctoPrint, this is related to the power supply and it must be fixed.

- Make sure the printer's power supply is not being overloaded. (Power fluctuations to the micro-controller's USB chip may result in resets of that chip.)

- Verify stepper, heater, and other printer wires are not crimped or frayed. (Printer movement may place stress on a faulty wire causing it to lose contact, briefly short, or generate excessive noise.)

- There have been reports of high USB noise when both the printer's power supply and the host's 5V power supply are mixed. (If you find that the micro-controller powers on when either the printer's power supply is on or the USB cable is plugged in, then it indicates the 5V power supplies are being mixed.) It may help to configure the micro-controller to use power from only one source. (Alternatively, if the micro-controller board can not configure its power source, one may modify a USB cable so that it does not carry 5V power between the host and micro-controller.)

## My Raspberry Pi keeps rebooting during prints

This is most likely do to voltage fluctuations. Follow the same troubleshooting steps for a ["Lost communication with MCU"](#i-keep-getting-random-lost-communication-with-mcu-errors) error.

## Can I find out whether the printer has lost steps?

In a way, yes. Home the printer, issue a `GET_POSITION` command, run your print, home again and issue another `GET_POSITION`. Then compare the values in the `mcu:` line.

This might be helpful to tune settings like stepper motor currents, accelerations and speeds without needing to actually print something and waste filament: just run some high-speed moves in between the `GET_POSITION` commands.

Note that endstop switches themselves tend to trigger at slightly different positions, so a difference of a couple of microsteps is likely the result of endstop inaccuracies. A stepper motor itself can only lose steps in increments of 4 full steps. (So, if one is using 16 microsteps, then a lost step on the stepper would result in the "mcu:" step counter being off by a multiple of 64 microsteps.)

## Notas del recolector

- Documentación oficial de Klipper, página de preguntas frecuentes. Se incluyen los apartados relevantes para capas desplazadas: driver TMC que se apaga, comunicación perdida con la MCU (cables/alimentación), reinicios del host por voltaje y el método GET_POSITION para detectar pasos perdidos.
- El resto de la página (instalación, puertos, conceptos varios) se ha omitido por no aportar a la causa root de layer shift; consultar la URL original para el texto completo.
- Original en inglés, sin traducción.
- Verificada por HTTP 200 el 2026-10-16.
---
