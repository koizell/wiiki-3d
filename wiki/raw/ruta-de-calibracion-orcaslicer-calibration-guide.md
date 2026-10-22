---
titulo: "Calibration Guide"
url: https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide
sitio: github.com/OrcaSlicer
tipo: oficial
capturado: 2026-10-21
autor: OrcaSlicer contributors (OrcaSlicerBot)
idioma: en
---

# Calibration Guide

This guide offers a structured and comprehensive overview of the calibration process for OrcaSlicer.

It covers key aspects such as flow ratio, pressure advance, temperature towers, retraction tests, and advanced calibration techniques. Each section includes step-by-step instructions and visuals to help you better understand and carry out each calibration effectively.

To access the calibration features, you can find them in the **Calibration** section of the OrcaSlicer interface.

![calibration](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/calibration.png?raw=true)

Important

After completing the calibration process, remember to create a new project in order to exit the calibration mode.

Tip

**Recommended**

Filament Calibration Masterclass

Video by **Factorian Designs**, with consent.

The calibrations are split into two groups. Follow them in the order shown, as each test builds on the results of the ones before it.

Note

These tests assume the extruder itself is already calibrated in the printer firmware (E-steps or rotation distance). Most modern printers ship with this set correctly. Small differences between filaments are corrected later in the [Flow Ratio](flow_ratio_calib) step.

## Filament Calibration

Repeat these tests for each new filament.

1. **[Temperature](temp_calib):** Start by calibrating the nozzle temperature. This is crucial as it affects the viscosity of the filament, which in turn influences how well it flows through the nozzle and adheres to the print bed, so every following test depends on it. The test is quick, easy to read and works with any material on any printer. It is especially important for materials with a narrow temperature range.

   ![temp-tower](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/Temp-calib/temp-tower.jpg?raw=true)

2. **[Max Volumetric Speed](volumetric_speed_calib):** With the temperature set, find the maximum volumetric speed the hotend can reach with this filament. This sets a safe limit so the following tests don't under-extrude or clog the nozzle. Some manufacturers overstate this value, so don't rely on the one on the spool. Use a value 10–20% below the result as a safety margin.

   ![mvf_measurement_point](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/MVF/mvf_measurement_point.jpg?raw=true)

3. **[Pressure Advance](pressure_advance_calib):** Calibrate the pressure advance settings to improve print quality and reduce artifacts caused by pressure fluctuations in the nozzle. It is done before Flow Ratio because it is the value most often wrong (or never calibrated at all), while the flow ratio in most filament profiles is already close. A tuned pressure advance also gives cleaner line ends and corners, which makes the Flow Ratio test easier to read.

   ![pa-tower](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/pa/pa-tower.jpg?raw=true)

4. **[Flow Ratio](flow_ratio_calib):** Calibrate the flow ratio to ensure that the correct amount of filament is being extruded. This is important for achieving accurate dimensions and good layer adhesion. The test starts from the flow ratio of the selected filament profile, so it is usually a small correction.

   ![flowcalibration-example](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/Flow-Rate/flowcalibration-example.png?raw=true)

5. **[Retraction](retraction_calib):** Calibrate the retraction settings to minimize stringing and improve print quality. The default values usually work well, but if you calibrate them, do it after Pressure Advance and Flow Ratio, as both change the pressure in the nozzle. Retraction doesn't depend on the advanced tests below, so it is part of the filament calibration.

   ![retraction_test_print](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/retraction/retraction_test_print.jpg?raw=true)

Tip

Pressure advance and flow ratio affect each other slightly, so either can be calibrated first. If the flow ratio changed a lot in the Flow Ratio step, run a quick Pressure Advance test again.

## Advanced Calibration

These tests are optional. Most of them tune the printer rather than the filament, so they only need to be repeated after hardware changes. Do them after the filament calibration, as a badly tuned filament affects their results.

1. **[Cornering](cornering_calib):** Calibrate the Jerk/Junction Deviation settings to improve print quality and reduce artifacts caused by sharp corners and changes in direction. It is mainly used to raise cornering speed. Most printers don't need it, as their firmware already limits cornering: above that limit (especially in Klipper) a higher value doesn't make real prints any faster, and OrcaSlicer has no way to check it.

   ![jd_second_print_measure](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/JunctionDeviation/jd_second_print_measure.jpg?raw=true)

2. **[Input Shaping](input_shaping_calib):** Reduce ringing and improve print quality by compensating for mechanical vibrations in the printer. Most recent printers have their own automatic input shaping calibration, which is usually more accurate than this manual test, so use it when available.

   ![IS_damp_marlin_print_measure](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/InputShaping/IS_damp_marlin_print_measure.jpg?raw=true)

3. **[VFA](vfa_calib):** A VFA speed test is available to find resonance speeds. Do it after Input Shaping to find the Vertical Fine Artifacts that input shaping didn't remove.

   ![vfa_test_print](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/vfa/vfa_test_print.jpg?raw=true)

4. **[Adaptive Pressure Advance](adaptive_pressure_advance_calib):** Adjusts the pressure advance value for different flow rates and accelerations. It needs a calibrated Pressure Advance and Flow Ratio, and its tests should not go above the acceleration limit found with Input Shaping.

   ![apa-expected-results](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/pa/apa-expected-results.jpg?raw=true)

---

**[Tolerance](tolerance_calib):** Calibrate the tolerances of your printer to ensure that it can accurately reproduce the dimensions of the model being printed. This is important for achieving a good fit between parts and for ensuring that the final print meets the desired specifications. Do it last, as the result depends on every calibration above.

![OrcaToleranceTes_m6](https://github.com/OrcaSlicer/OrcaSlicer_WIKI/raw/main/images/Tolerance/OrcaToleranceTes_m6.jpg?raw=true)

---

*Credits:*

- *The Flow test and retraction test is inspired by [SuperSlicer](https://github.com/supermerill/SuperSlicer).*

- *The PA Line method is inspired by [K-factor Calibration Pattern](https://marlinfw.org/tools/lin_advance/k-factor.html).*

- *The PA Tower method is inspired by [Klipper](https://www.klipper3d.org/Pressure_Advance.html).*

- *The temp tower model is remixed from [Smart compact temperature calibration tower](https://www.thingiverse.com/thing:2729076).*

- *The max flowrate test was inspired by Stefan (CNC Kitchen), and the model used in the test is a remix of his [Extrusion Test Structure](https://www.printables.com/model/342075-extrusion-test-structure).*

- *ZV Input Shaping is inspired by [Marlin Input Shaping](https://marlinfw.org/docs/features/input_shaping.html) and [Ringing Tower 3D STL](https://marlinfw.org/assets/stl/ringing_tower.stl).*

## Notas del recolector

- Documentación oficial de OrcaSlicer (wiki del proyecto, página editada por OrcaSlicerBot el 13/10/2026). Es la fuente que **sí razona el orden**: cada paso explica de qué depende el siguiente («so every following test depends on it», «This sets a safe limit so the following tests don't under-extrude», «Do them after the filament calibration, as a badly tuned filament affects their results»).
- **El orden oficial de OrcaSlicer NO es el de Control3D.** OrcaSlicer: 1) Temperature, 2) Max Volumetric Speed, 3) Pressure Advance, 4) Flow Ratio, 5) Retraction → luego Advanced (Cornering, Input Shaping, VFA, Adaptive PA) → y Tolerance **al final**. Control3D pone Flujo en el 2 y Velocidad volumétrica en el 4, y pone Tolerancias en el 6. Los dos órdenes están en `wiki/raw/`; no se han unificado ni se ha elegido uno.
- La única cifra explícita de este documento es el margen de seguridad del 10–20 % por debajo del resultado del test de velocidad volumétrica máxima, y el aviso de que el valor de la bobina puede estar sobrevalorado por el fabricante.
- Datos de orden que aporta y no están en Control3D: PA antes que Flow Ratio (porque el PA es lo que más mal suele estar y porque un PA afinado hace el test de flujo más legible), retracciones después de PA y flujo (porque ambos cambian la presión en la boquilla), Input Shaping antes de VFA, Tolerance al final porque depende de todo lo anterior.
- Matiz que matiza la contradicción: OrcaSlicer admite que PA y flow ratio se influyen mutuamente y que «either can be calibrated first», con la recomendación de repetir un test rápido de PA si el flow ratio cambió mucho.
- El documento no cubre tolts: no hay test de voladizos/puentes en el orden de OrcaSlicer, y no hay pieza final de comprobación equivalente a Benchy/Cali Cat.
- Enlaces internos a páginas del wiki (temp_calib, volumetric_speed_calib, pressure_advance_calib, flow_ratio_calib, retraction_calib, cornering_calib, input_shaping_calib, vfa_calib, adaptive_pressure_advance_calib, tolerance_calib) conservados tal cual; esas páginas ya existen en `wiki/raw/` con otro nombre de fichero.
- Se ha eliminado el cromado de GitHub (menú lateral, breadcrumbs, lista de las 167 páginas del wiki, pie de página) y se han conservado las URL de las imágenes. Texto original en inglés, no traducido.
