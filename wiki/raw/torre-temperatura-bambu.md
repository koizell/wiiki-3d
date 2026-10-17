---
titulo: "Calibration for 3rd Party Printer"
url: https://wiki.bambulab.com/en/bambu-studio/Calibration
sitio: wiki.bambulab.com
tipo: fabricante
capturado: 2026-10-17
autor: Bambu Lab
idioma: en
---

Calibration for 3rd Party Printer | Bambu Lab Wiki

This article mainly introduces how to perform a series of calibrations when selecting a third-party printer in Bambu Studio, and it is intended for advanced users, not beginners.
Partially inspired by Orca Slicer, Thanks!

NOTE:

Third-party printers or nozzles should be created in advance. Please refer to this wiki.
After completing the calibration process, remember to create a new project to exit the calibration mode.

🛠️ How to Enable Developer Mode in Bambu Studio
Enabling Developer Mode is essential to unlock the calibration features explained in this page.

Enable Developer Mode - Click here to expand the step-by-step instructions
Step 1 - Go to Preferences
Click on the small arrow (1) menu in the top navigation bar, then select Preferences (2).

Step 2 - Enable Developer Mode
In the Preferences window, scroll down to the Developer Mode section (3). Toggle on the check box.

Step 3 - The Calibration options will show instantly
Developer mode is now active, you'll notice the calibration options appearing in the top bar.

✅ Done! Disable it anytime by repeating these steps and toggling it off.

Temperature

The temperature tower is a model used to test the print temperature of a printer, presented as a vertical tower containing multiple internal blocks, each with a different print temperature.
Select the Temperature model in the Calibration to print. After printing, an inspection of each block within the tower determines the optimal print temperature for that filament, i.e., the print temperature that produces the highest quality prints with the least number of problems (e.g., stringing, layer adhesion, warping, and bridging).

Flow Rate
Regarding the flow ratio calibration of Bambu official printers and the impact of flow ratio calibration on printing, you can refer to the wiki: Flow Rate Calibration | Bambu Lab Wiki.

Rough Calibration

Select Pass 1 in the Flow rate. A new project consisting of nine blocks will be created, each with a different flow rate modifier. Slice and print the project. When printing is complete, check the smoothness of the top surface of each block to determine the optimum flow rate for this filament.

Use the following formula to calculate the flow rate in the filament setup:
Initial flow rate × (100 + modifier)/100
For example, if the previous flow rate was 0.98 and the flow modifier for the smoothest block was +5, the new flow rate would be: 0.98 x (100 + 5) / 100 = 1.029

Note: Remember to save the flow rate to the filament setting.

Precise Calibration

Select Pass 2 in the Flow rate. A new project consisting of ten blocks will be created, each with a different flow rate modifier. The flow rate modifiers for this project range from -9 to 0.
When printing is complete, check the smoothness of the top surface of each block to determine the optimum flow rate for this filament.

In this case, if the previous flow ratio was 1.029 and you selected the block with a flow rate modifier of -6, the new value should be: 1.029x(100-6)/100 = 0.96726

Note: Remember to save the flow rate to the filament setting.

Pressure Advance
PA Tower

Select the PA Tower in Pressure Advance test. Once the print is complete, you can look at each corner of the print and mark the height where the overall result is best.

The PA value for this test will be increased by 0.002 for every 1 mm increase in height.
In this case, the height at which the best overall result is achieved is 15 mm, so the pressure advance value should be calculated as 0.002 x 15 = 0.03

PA Line

Select the PA line model in Pressure Advance test.The accuracy of the PA line test is highly dependent on the quality of the first layer, and it is recommended that the hotbed leveling be turned on during the test.
When printing is complete, you can observe the change in speed of each line on the print. Select the value for the most uniform line and update the PA value in the filament setup.

PA Pattern

Select the PA pattern model in Pressure Advance test. After printing, you can observe the corner of the print, select a line that extrudes full but not excessive, and update the PA value in the filament settings.
For this test, the optimal PA value for the filament is 0.03.

Retraction Test
Retraction test will generate a retraction tower automatically. The retraction tower is a vertical structure with multiple notches, each printed at a different retraction length.

Select the Retraction Test in Calibration to print. Once the print is complete, note where the layers begin to fail, where the quality begins to degrade, and the change in gloss of the print as a means of determining the shortest retraction length that produces the neatest tower, i.e., the optimum retraction length for the filament.

Note: When testing filaments such as PLA or ABS that have minimal oozing, the retraction settings can be highly effective. You may find that the retraction tower appears clean right from the start. In such situations, setting the retraction length to 0.2mm - 0.4mm. On the other hand, if there is still a lot of stringing at the top of the tower, it is recommended to dry your filament and ensure that your nozzle is properly installed without any leaks.

Max Flowrate
The generic or 3rd party filament types may not have the correct max flowrate set in the filament. This test will help you to find the maximum volumetric speed of the filament.

Select the Max Flowrate model in the Calibration to print. Once the print is complete, observe where the layers start to fail, where the quality starts to drop, and how the gloss of the print changes.
Use the following method to determine the maximum flow rate of the filament:

Measure the print height at that point using calipers or a straightedge and use the maximum flow rate calculation: Start Volumetric speed + (Measured height × Step)
For example, with a start volumetric speed of 10 and a value step of 1, the print quality starts to drop at the 14 mm, so the maximum flow rate of the filament would be: 10 + (14 × 1) = 24

Return to the Preview page and select the flow of color scheme. Scroll down to the measured layer height of 14mm and click on the toolhead slider, which will display a maximum flow rate of 24 for the filament.

NOTE: You may also choose to conservatively reduce the flow by 5-10% to ensure print quality.

VFA

VFA (Vertical Fined Artifacts) are continuous motor motion vibration patterns that are related to filament conditions, print speed, and extrusion calibration, etc. VFA calibrations are used to test the visibility of VFA vibration patterns in printers at different print speeds.

End Notes

We hope the detailed guide provided has been helpful and informative.
To ensure a safe and effective execution, if you have any concerns or questions about the process described in this article, we recommend submitting a technical ticket regarding your issue. Please include a picture or video illustrating the problem, as well as any additional information related to your inquiry.

## Notas del recolector

- Documentación oficial de Bambu Lab (Bambu Studio). Define la torre de temperatura como torre vertical con bloques a distintas temperaturas; la inspección de cada bloque determina la temperatura óptima (stringing, layer adhesion, warping, bridging).
- Menciona también retraction test, max flowrate y VFA, y nota sobre secado de filamento si hay stringing.
- Texto original en inglés.