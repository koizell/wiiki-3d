---
titulo: "TPU 90A printing guide for A1 series | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-19
autor: Bambu Lab
idioma: en
---

>

⚠️ **Important**

- Store filament in a **cool, dry** place, out of direct sunlight and away from heat sources.

- Keep filament and any broken fragments **out of reach of infants, children, and pets** to prevent the risk of swallowing and choking.

- **TPU filaments are highly hygroscopic**. Place it immediately into **an airtight container** with **effective desiccant** after use, and **thoroughly dry before printing** at the temperature and duration specified in the guide.

- Operate the printer in a **well-ventilated area**, or install an effective air filtration or exhaust system.

- TPU are **NOT** food-contact grade. Do not use printed parts to hold or come into contact with food.

>

## ¶ Introduction

TPU 90A is a thermoplastic polyurethane (TPU) filament with a Shore hardness of 90A.

- Hardness: TPU filament hardness is typically measured in Shore A, with 90A representing the hardness level of this filament.

- Elasticity and Flexibility: TPU 90A can stretch and bend over a wide range without breaking, with strong recovery. This characteristic makes TPU 90A excel in applications requiring elasticity and flexibility.

- Wear Resistance: TPU filament offers good wear resistance, maintaining stable performance over prolonged use.

In terms of applications, TPU 90A can be used in products that require elasticity and wear resistance, such as shoe soles, sports equipment parts, mobile phone cases, and smartwatch bands. Overall, TPU 90A is a high-performance thermoplastic polyurethane filament with versatile applications, and different hardness levels allow it to meet the needs of various use cases.

## ¶ Pre-Print Preparation

### ¶ Filament Storage Environment

To ensure that TPU filament does not absorb moisture and affect print quality during the 3D printing process or while stored, it is recommended to keep the filament in an environment with humidity below 20% RH. It is advisable to store the filament in a storage box with a desiccant (silica gel desiccant is recommended).

[imagen]:收纳箱.jpeg

Please place silica gel desiccant in the storage box before storing the filament.

### ¶ Filament Drying

TPU filament has a high moisture absorption rate and easily absorbs moisture from the environment. If TPU with moisture is used directly in 3D printing, the moisture will rapidly vaporize when heated during printing, causing defects such as bubbles and holes in the printed product, which severely affects print quality and may even lead to print failure.

Therefore, TPU filaments must be dried before printing and properly sealed and stored after use.

There are two methods for drying filaments:

**1. Drying with AMS 2 Pro/AMS HT**

**2. Drying with a heated bed in an enclosed printer**

Due to the A1/A1mini being an open printer, it is not possible to dry the filament on a heatbed. If you have an enclosed X-series, P-series, or H2-series printer, you can use the heatbed of these printers for drying.

>

💡 For detailed drying procedures, please refer to Filament Drying Recommendations (/en/filament-acc/filament/dry-filament).

>

[imagen]:image-8.png

### ¶ Hotend

To ensure the best print quality and results with TPU filament, it is strongly recommended to use a new hotend or a dedicated hotend for printing TPU.

| Filament | 0.2 mm hotend | 0.4 mm hotend | 0.6 mm hotend | 0.8 mm hotend |
| TPU 90A | Not compatible | Recommended | Recommended | Recommended |

If the hotend is not new, check the hotend condition (whether there is residue; if there is, raise the temperature and perform cold pulling 2-3 times using PLA / PETG filament, but do not use fiber-reinforced filaments for cold pulling).

**Flushing Operation Steps (using PLA Matte as an example):**

- For ease of operation, first disconnect the PTFE tube from the toolhead.

- It is recommended to raise the hotend temperature to 250°C, then insert a segment of PLA Matte filament into the toolhead.

- Press the "Extrude Down" button on the interface and observe whether the filament is extruded continuously and evenly. (This step should be repeated 3-5 times.)

[imagen]:冲刷-en.gif

>

**Note:** If you want to further clean the hotend to achieve better print quality, cold pull method is recommended. Please refer to this wiki: A1 mini Nozzle Unclogging Guide (/en/a1-mini/troubleshooting/nozzle-clog#h-2-unclogging-with-a-pin-tool-and-cold-pull).

>

### ¶ Build Plate

The textured PEI plate may become overly sticky after applying adhesive, so it is not recommended to use adhesive when printing with a textured PEI plate.

For other build plates, adhesive must be applied to prevent issues such as poor first layer quality, lack of adhesion, or even print failure.

**Using a cool plate supertack to print TPU may result in overly strong adhesion, so cool plate supertack should not be used.**

| Filament | Cool plate | Engineering plate | High Temperature/Smooth PEI Plate | Cool plate supertack | Whether to apply adhesive |
| TPU 90A | Recommended | Recommended | Recommended | Not compatible | Yes (except for the Textured PEI plate) |

### ¶ Extruder

Before printing, refer to the tutorial A1 series extruder cleaning tutorial (/en/a1-mini/troubleshooting/extruder-clog) to check and maintain the extruder (if there are foreign objects or filament residue, disassemble and wipe it clean). If the extruder gear is worn, it needs to be replaced (Otherwise, there may be issues with filament slipping).

## ¶ Operating Steps

### ¶ Spool Setup

There are two ways to set up TPU filament spool for printing: using AMS HT or using a filament dryer box.

#### ¶ 1. AMS HT

When **printing** with TPU filament, the AMS HT can function as a sealed and drying chamber, but its **feeding function should not be used**.

The TPU filament must be fed through the dedicated **TPU Filament outlet**, not the default outlet.

[imagen]:tpu指南-出料口en.png

**You can follow the steps below for setting up TPU in the AMS HT:**

**Step 1:**

Cut a 50 mm long PTFE tube and slightly bend it to maintain a curved shape, which will make filament feeding easier later.

Then, remove the silicone plug at the back of the AMS HT, insert the PTFE tube with the raised side facing upward into the small hole of the silicone plug, and make sure about 5 mm of the tube is inserted into the AMS HT.

| [imagen] 50mm long PTFE tube | [imagen] Insert AMS HT |

**Step 2:**

Check the filament direction, place the filament spool into the AMS HT, and feed the filament upward through the PTFE tube.

| [imagen] Check the filament direction | [imagen] Feed the filament upward through the PTFE tube |

**Step 3:**

Secure the AMS HT cover, and the installation is complete.

| [imagen] TPU filament outlet | [imagen] Filament feeding direction |

#### ¶ 2. Filament Box

The filament dryer box provides a sealed, low-resistance environment for filament feeding.

The 4L dryer box supports spools with a maximum width of approximately 67.5 mm for smooth rotation, while the 5.8L dryer box supports spools up to approximately 108.5 mm wide.

Since TPU filament can expand after drying due to heat absorption, the spool's outer width may increase from approximately 65.4 mm to 69.4 mm. This expansion can cause the spool to rub against the inner walls of a 4L dryer box, resulting in feeding resistance.

**Therefore, we strongly recommend using the 5.8L dryer box for TPU printing to ensure smooth and reliable filament feeding.**

|  |  |
| [imagen]:烘烤前后对比.png The right side filament spool is the expanded spool after drying | [imagen]:料桶对比.png 4L and 5.8L Sealed Boxes |
| [imagen]:5.8l料桶.png The maximum width limit of the 5.8L sealed box is approximately 108.5 mm | [imagen]:4升料桶.jpeg The maximum width limit of the 4L sealed box is approximately 67.5 mm |

---

**Note:**

- If using a filament box for loading, be sure to use **the spool holder** to ensure smooth rotation of the filament. Click the link below to download and print the holder.

4L sealed filament box holder (https://makerworld.com.cn/zh/models/807064?from=search#profileId-784185)

5.8L sealed filament box holder (https://makerworld.com.cn/zh/models/437644?from=search#profileId-353897)

- Additionally, to reduce loading resistance, **please open the side opening of the filament box.**

| [imagen] Side opening of the filament box | [imagen] Ensure smooth rotation of the filament |

- All filaments must have the spool elevated (the spool's discharge port should be higher than the toolhead's load port) to ensure smooth loading.

Therefore, whether feeding filament from the AMS HT or a filament dry box, **we recommend printing a TPU filament spool rack (https://makerworld.com/zh/models/1155832-tpu-filament-spool-rack?from=search#profileId-1160985) to elevate the filament container (AMS HT or dryer box)**. This helps ensure smooth filament feeding and prevents excess filament from being scratched or caught by the heated bed or nozzle.

|  |  |
| [imagen]:耗材架.jpg With filament box | [imagen] With AMS HT |

### ¶ Loading Steps

This section demonstrates the steps for setting up TPU with **a filament dry box.**

**Pre-loading Reminders:**

- Ensure the filament is fully dried before loading.

- When using a filament spool for loading, load the filament through the side opening.

**Pre-loading Preparation:**

- Remove one of the PTFE tubes connected to the toolhead, and make sure there is no other filament inside the extruder.

- Place the spool holder next to the printer, ensuring the filament discharge port is positioned higher than the extruder inlet.

|  |  |
| [imagen]:断开_ptfe_管.jpg | [imagen]:耗材插入五通.jpg |

**Loading Steps:**

- It is recommended to preheat the hotend to 250℃.

- Pull the filament from the spool and directly insert it into the extruder inlet.

- Slowly and intermittently click the "Down Arrow" button to load the filament until it extrudes smoothly and continuously from the hotend.

[imagen]:升温点进料-en.gif

**TPU 90A Loading Precautions:**

- During filament loading through the toolhead, if you notice significant resistance, please check whether the filament spool rotates smoothly inside the filament container.

- Once the extruder gear has gripped the TPU filament, slowly click the extrude button to ensure the filament extrudes smoothly from the hotend, avoiding loading failures.

### ¶ Unloading Steps

For A1 series printers, manual unloading is required after heating up the hotend. Automatic unloading using the cutter is not supported.

Unloading Steps:

- Preheat the hotend to 250℃.

- Slowly click the "Up Arrow" button to reverse the extruder gear, while gently pulling the filament out of the toolhead.

[imagen]:退料-en.gif

### ¶ Parameter Settings

In addition to the preset parameters, specific parameter settings should be adjusted according to the characteristics of the model.

- The recommended printing temperature for TPU 90A is 225℃, with a heatbed temperature of 30 - 35℃.

- Please keep the default max volumetric speed limit during printing, and avoid increasing the print speed.

- When printing TPU 90A, please disable flow dynamic calibration.

|  |  |  |
| [imagen]:动态流量校准-屏幕-en.png | [imagen]:动态流量校准-studio-en.png | [imagen]:动态流量校准-handy-en.jpg |

- It is not recommended to print tall and thin models, as TPU filament is relatively soft. When the printed model reaches a certain height, it may wobble, leading to print failure.

## ¶ Common Printing Issues

**TPU filament is prone to the following problems:**

- Under extrusion (Nozzle clogging, loading resistance, filament slipping)

- Extruder clogging (Filament bending, causing a clog in the extruder gear; disassemble the extruder and remove the clogged filament)

- Stringing and oozing (You can use a larger diameter hotend, fine-tune the retraction settings, further dry the filament, and apply post-processing to the model)

For detailed troubleshooting and solutions, please refer to this wiki: Common print quality problems and solutions (/en/knowledge-sharing/common-print-quality-problem).

## ¶ End Notes

>

We hope the detailed guide provided has been helpful and informative.

If the guide does not solve your problem, *please submit a technical ticket (https://bambulab.com/en/my/support/tickets/create?from=5)*, we will answer your questions and provide assistance.

If you have any suggestions or feedback on this Wiki, please leave a message in the comment area. Thank you for your support and attention!

>

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** wiki de Bambu Lab, aplicación Vue;
  el texto sale del `<template slot="contents">` del HTML servido. Los anclajes de
  encabezado (`#introduction`, `#hotend`, …) se han eliminado; el texto es el del
  original. Los enlaces se conservan con su URL entre paréntesis y **no se ha
  descargado ninguno de ellos**.

- **Qué aporta esta fuente:** es la guía de **TPU 90A para la serie A1** (A1/A1mini).
  Aporta cuatro cosas que ninguna otra fuente de este lote da:
  1. **Una limitación de la máquina, no del material**: «**Due to the A1/A1mini being an
     open printer, it is not possible to dry the filament on a heatbed**». La A1 es
     abierta, así que el método de secado con la cama caliente (el que sí recomiendan
     la guía general y la de la serie P para X/P/H2) **no es posible en la A1**: ahí
     hace falta AMS 2 Pro o AMS HT.
  2. **El hotend como pieza de desgaste**: «it is strongly recommended to use a **new
     hotend or a dedicated hotend** for printing TPU», con la tabla de boquillas
     (0.2 mm no compatible; 0.4/0.6/0.8 mm recomendadas) y el procedimiento de
     purgado con PLA Matte a 250 °C.
  3. **El extrusor como pieza de desgaste**: «If the extruder gear is worn, it needs to
     be replaced (Otherwise, there may be issues with **filament slipping**)». El
     desgaste del engranaje explica el deslizamiento del filamento, que es uno de los
     tres problemas que la propia página lista.
  4. **La tabla de cama con el requisito de adhesivo**: Cool plate, Engineering
     plate y HT/Smooth PEI **recomendadas**; **Cool plate supertack no compatible**
     (adhesión demasiado fuerte); y **hay que aplicar adhesivo salvo en la Textured
     PEI**, que se vuelve demasiado pegajosa. Esto matiza la regla general de la
     wiki («excepto la Cool Plate SuperTack, todas las demás placas son
     compatibles»): para la A1 con 90A hay además una **excepción de primera capa**.
  - Además: **descarga manual obligatoria** («Automatic unloading using the cutter is
    not supported»), **ajustes de 225 °C y cama 30-35 °C**, «keep the default max
    volumetric speed limit… avoid increasing the print speed», **desactivar la
    calibración de dinámica de flujo**, y el aviso de que **no se recomiendan modelos
    altos y finos** porque el TPU es blando y la pieza **puede oscilar** y fallar.

- **Variante:** esta guía es **sólo de 90A** para A1. La incompatibilidad de **TPU
  85A con la serie A1** está en la tabla de compatibilidad de la guía general de TPU
  (también en este lote), **no** en esta página. Lo mismo con la incompatibilidad del
  AMS/AMS lite/AMS 2 Pro, que tampoco aparece aquí: aquí el AMS HT aparece sólo como
  cámara estanca y de secado, con la salida TPU dedicada.

- **Cifras que no son de esta guía:** la temperatura de cama (30-35 °C) va a
  `temperatura-cama` y el secado a `secar-filamento`; aquí sólo se deja constancia
  de que el método de secado con cama caliente **no existe en la A1** por ser abierta,
  que es un dato de **máquina**.

- **Un detalle que no debe pasar inadvertido:** el carrete de TPU **se ensancha al
  secar**, de ~65,4 mm a ~69,4 mm, y por eso la caja de 4 L (67,5 mm máximos) se
  queda corta y la de 5,8 L (108,5 mm) es la recomendada. Es un número de **accesorio
  de alimentación**, no un ajuste de impresión, pero explica atascos de alimentación
  que no son ni del filamento ni del ajuste.

- **Enlaces que NO se han descargado y de los que no debe citarse nada:** los dos
  modelos de portacarretes y el portacarretes de TPU apuntan a `makerworld.com.cn`
  (dominio chino) y `makerworld.com`, ninguno bajo los prefijos permitidos; los
  tutoriales a los que se enlaza en el texto (`/en/a1-mini/troubleshooting/...`,
  `/en/filament-acc/filament/dry-filament`,
  `/en/knowledge-sharing/common-print-quality-problem`) **sí** están bajo prefijos
  permitidos, pero no se han descargado: este lote trae cinco páginas.

- **Erratas y rarezas del original, conservadas:** «recommended» aparece con «r»
  doble en dos sitios, «tutorial A1 series extruder cleaning tutorial» con la
  palabra «tutorial» repetida, el paréntesis de «If the extruder gear is worn, it
  needs to be replaced (Otherwise, there may be issues with filament slipping)» sin
  cerrar antes del punto, y la coma china «，» de la guía de la serie P. No se ha
  corregido nada.
- El texto original está en inglés y no lo he traducido.
