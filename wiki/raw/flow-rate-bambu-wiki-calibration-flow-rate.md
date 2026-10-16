---
titulo: "Flow Rate Calibration | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-16
autor: Bambu Lab
idioma: en
---

# Flow Rate Calibration

## What is Flow Rate Calibration?

Flow rate refers to the amount of filament the printer's extruder pushes out of the nozzle, measured as a percentage or multiplier of the default amount. It controls the thickness of the extruded plastic. Adjusting it fine-tunes print quality. If the Flow Rate is too high, it causes overextrusion (blobs or lines that overlap too much), and if it's too low, it causes underextrusion (gaps in the printed lines).

Different 3D printing filaments require varying flow rates due to their differing viscosities and melting points. PLA flows easily, ABS and nylon are slightly thicker, PETG is sticky, TPU is flexible and viscous, polycarbonate is tough, and composites can be abrasive. Flow rates must match each filament's properties to ensure smooth extrusion for the expected print quality.

To use the same example as above, the flow rate can be compared to the speed at which the toothpaste comes out. If you gently squeeze the tube, the line is thin and neat. If you squeeze too hard, the line gets thick and messy.

## When Do You Need to Do Flow Rate Calibration?

Perfecting your prints involves several calibration steps that must be implemented correctly before proceeding with Flow Calibration. Not all defects in 3D printed objects are the result of inaccurate flow rates. In fact, when using high-quality printers like Bambulab and official Bambu filaments, mechanical tolerances are minimal, and the filament standard is extremely high. Therefore, any defects noticed in your prints may result from other calibration aspects that need addressing.

If you notice the following signs in your 3D prints and have already performed other calibrations, such as Flow Dynamics Calibration, but issues persist, then it might be time to consider a Flow Rate Calibration:

1. Over-Extrusion: If you see excess material on your printed object, forming blobs or zits, or the layers seem too thick, it could be a sign of over-extrusion.
2. Under-Extrusion: This is the opposite of over-extrusion. Signs include missing layers, weak infill, or gaps in the print. This could mean that your printer isn't extruding enough filament.
3. Poor Surface Quality: If the surface of your prints seems rough or uneven, this could be a result of an incorrect flow rate.
4. Weak Structural Integrity: If your prints break easily or don't seem as sturdy as they should be, this might be due to under-extrusion or poor layer adhesion, which can be improved by flow rate calibration.

Beyond fixing the noted printing defects, Flow Rate Calibration is crucial for foaming materials like LW-PLA used in RC planes. These materials expand greatly when heated, and calibration provides a useful reference flow rate to achieve good printing results with these special filaments.

## Is Flow Rate Calibration Reliable?

Auto Flow Rate Calibration utilizes Bambu Lab's Micro-Lidar technology, which directly measures the calibration patterns. However, please be advised that the efficacy and accuracy of this method may be compromised with specific types of materials. Particularly, filaments that are transparent or semi-transparent, sparkling particles, or have a high-reflective finish may not be suitable for this calibration and can produce less-than-desirable results.

The calibration results may vary between each calibration or filament. We continue to improve the accuracy and compatibility of this calibration through ongoing firmware updates. Manual calibration, on the other hand, can be accurate, but it’s important to follow the correct procedure.

## Modes of Calibration

Flow Rate calibration has two modes: Auto-Calibration and Manual Calibration.

Auto-Calibration: The user only needs to start the calibration, and the printer will return the calibration results after the printing is finished. Only X1 series support Auto calibration.

Manual Calibration: The user must judge which parameter to use by observing the quality of the calibration block on the print plate.

## Types of Manual Calibration

The manual mode includes two types: Coarse Calibration and Fine Calibration.

Coarse Calibration is based on the flow ratio value of the filament preset and prints the calibration blocks, with flow values in the range of 80% to 120% based on that value. The step size of coarse calibration is 5%. When you are unsure about the flow ratio of the filament, you can first use coarse calibration to obtain a better range and then use fine calibration to achieve a more accurate value.

Fine Calibration is based on a custom flow ratio value and prints calibration blocks that flow in the range of 91% to 100% based on that value. The step size of fine calibration is 1%. If you already know a reasonable range, and the margin of error is within 10%, you can directly use fine adjustment to get the more accurate value.

## Flow Rate Calibration Process

### Automatic Mode

Step 1: Open Bambu Studio and Select Auto-Calibration

After connecting your 3D printer and opening Bambu Studio, go to Calibration > Flow Rate > Auto-Calibration.

Step 2: Select the Nozzle, Plate Type, and Filament to be Calibrated

For the nozzle, we will select a 0.4 mm diameter, plate-type Smooth PEI Plate, and Bambu ABS filament in our case. If AMS is connected, you will see an option to synchronize filament list information from AMS. Select the filament you want to calibrate, and then select the filament preset for printing from the filament radio box. After finishing the settings, click Calibrate button. (Note: Calibration for different nozzle sizes requires support from the printer firmware.) For OTA version 01.06.00.00, only a 0.4mm nozzle is supported.

Step 3: Calibration Printing in Progress

After printing is finished, you can click the Next button to proceed to the next step.

Step 4: Save Calibration Results

After printing is finished, a flow ratio value that the machine determines to be optimal will be returned. You can save this flow value to a new filament preset. If you modify the name to match the original filament preset name used for calibration, you can also overwrite the original filament preset.

### Manual Mode

Step 1: Select Manual Calibration

Go to Calibration > Flow Rate > Manual Calibration.

Step 2: Select the Calibration Type

There are two types of manual calibration:

Complete Calibration

Fine Calibration based on Flow Ratio

Complete Calibration: It will first perform a coarse calibration, and then you can perform a fine calibration based on the results of the coarse calibration.

Fine Calibration based on Flow Ratio: It will perform a fine calibration directly based on the flow ratio you set.

Other steps are the same as the automatic mode. Once you have entered the required information, you can begin the calibration by pressing the "Calibration" button.

Step 3: Complete Calibration in Progress

After the first stage of the Complete Calibration print is done, it's time to visually determine which one of the printed samples has the smoothest finish.

Judging the print result below, choosing one of the top three samples is not recommended because the flow rate is too high, resulting in overlapping printed lines. The bottom three samples are under-extruded, and there are gaps between the lines, so we are left to comparing the middle options to choose between 5 and 0 as -5 is under-extruded.

Between the two samples, the one with value 5 is the smoothest. The lines are smooth throughout the print, whereas the sample with a value of 0 exhibits some under-extrusion. At this point, it's time to select the best sample in Bambu Studio (5, based on our test), which will show the best flow rate to use, in this case, 0.997500.

If you are satisfied with the result, you can choose to skip the fine calibration, known as Calibration 2. But if you wish to fine-tune the flow rate, simply click Calibrate. The printer will generate a new set of test samples to generate a finer selection of the flow rate.

Important! The printer will send the new test samples right after you click the Calibrate button. Ensure the plate is clean and installed in the printer before clicking the button.

As expected, the printer will start printing another set of test samples, to help you better determine the best flow rate value. Simply wait for the print to be completed, then move to the next step. Just like before, you need to compare the test results, and find the smoothest test sample. This time, it might be a bit more challenging, as some of the test samples will have very minor differences between them. Try to view them with the light coming from the left side and position the samples similarly to the image below. Pay close attention to the middle section of the test sample rectangles, as it will show any sign of under-extrusion. The start and end of the printed lines might show slight signs of over-extrusion, but that is considered normal.

It can be observed that most of the negative samples (-2 to -7) have slight under-extrusion, as there are gaps between the printed lines. The -1 sample seems to be OK at first glance, but looking closer, you can see some very faint signs of under-extrusion between the printed lines. Due to this, it is recommended to avoid using the -1 value, confirming that 0 is the correct result.

Important! Avoid selecting the sample which shows slight signs of under-extrusion. For larger prints, this slight under-extrusion can increase, leading to potential gaps between the printed lines.

In Bambu Studio, select the sample which is the smoothest, in this case 0, then set the name for the filament preset. The calibration process is completed by clicking the Finish button. Your newly calibrated profile will have the new flow ratio applied.

## Important Notes

When considering the Flow Dynamics and Flow Rate calibration, it’s critical to pay close attention to the following details to achieve optimal results:

For the most accurate calibration results, ensure the filament is thoroughly dried before beginning the calibration process and remains dry afterward. Variations in filament humidity, even after calibration, can have a small impact on the consistency and reliability of the results.

Always verify that the hotend is clean, both internally and externally, before proceeding with calibration. If you observe a decline in print quality (such as under-extrusion, over-extrusion, or minor stringing) it’s advisable to perform several cold pulls for the nozzle to clear any potential partial clogs that could interfere with smooth filament extrusion. Alternatively, using a new nozzle can confirm if the issue is related to the nozzle, or to calibration.

Ensure the extruder is clean, to prevent issues caused by contaminants. Small particles, such as filament dust or residue buildup on the gears, can compromise extrusion quality. If you notice any changes in print quality, prioritize cleaning the extruder and nozzle before considering recalibration to ensure consistent results.

Avoid calibrating with a dirty extruder or a nozzle that is partially clogged, as these conditions can significantly skew the calibration process, leading to unreliable and inaccurate results.

The build plate needs to be washed before starting the process, to ensure the printed models will adhere as expected, as it can impact the calibration result if the first layer is not attached well to the plate.

## Notas del recolector

- Fuente oficial Bambu Lab Wiki, capturada como Markdown integral. Cubre la definición de flow rate, síntomas de sobre/subextrusión, fiabilidad del Auto Flow (Micro-Lidar), modos automático/manual, calibración gruesa (80-120%, paso 5%) y fina (91-100%, paso 1%), y notas sobre boquilla, extrusor y humedad.
- El cuerpo original está en inglés y no se ha traducido.
- Estado HTTP 200 verificado en la captura. No es una cáscara.
