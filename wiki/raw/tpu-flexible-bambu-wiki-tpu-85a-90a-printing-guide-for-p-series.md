---
titulo: "TPU 85A&90A printing guide for P series | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series
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

TPU 85A and TPU 90A are two different hardness grades of thermoplastic polyurethane (TPU) filaments.

- Hardness: The hardness of TPU is usually represented by Shore A hardness. 85A and 90A indicate the hardness levels of these two materials, with 90A being harder than 85A.

- Elasticity and Flexibility: Both materials can stretch and bend over a wide range without cracking and have excellent shape recovery. This makes TPU 85A and TPU 90A perform well in applications requiring elasticity and flexibility.

- Abrasion Resistance: TPU filaments have good abrasion resistance, maintaining stable performance over long-term use.

In terms of applications, TPU 85A and TPU 90A can be used to manufacture shoe soles, sports equipment components, and other products that require elasticity and wear resistance. They can also be used for phone cases, smartwatch straps, and other electronic accessories. Overall, these two filaments are high-performance and widely used thermoplastic polyurethane materials. Their different hardness levels allow them to meet the needs of various application scenarios.

>

If you have TPU Feed Assist Module Assembly，please click here (/zh/general/manual/tpu-feed-assist-module).

>

## ¶ Printing Preparation

### ¶ Filament Drying

TPU is highly sensitive to moisture. Moist TPU can cause stringing, bubbles, and weak layer adhesion. Drying before printing is essential.

For detailed drying steps, please refer to: Filament Drying Recommendations (/en/filament-acc/filament/dry-filament).

During the drying process, TPU filament expands when heated, which can cause the spool to deform — the spool width may increase from 65.4 mm to approximately 69.4 mm. This is normal behavior. To minimize deformation, you can place a heat-resistant weight on top of the TPU spool during drying.

[imagen]

### ¶ Hardware Compatibility

#### ¶ Nozzle

- Special attention must be paid to nozzle selection when printing TPU filaments.

- It is not recommended to use 0.2mm nozzles or regular high-flow nozzles for printing. Specifically, 85A TPU filaments cannot be printed with 0.4mm nozzles.

- For printing TPU filaments, it is recommended to use brand new nozzles, or cold-pull old nozzles before printing. Please refer to the Cold Pull Guide for instructions.

- Nozzle history matters. If the Nozzle was previously used with carbon fiber or glass fiber filaments, residual fibers may increase resistance when printing TPU. Perform several cold pull cleanings (/en/x1/troubleshooting/nozzle-clog#cold-pull-method) before printing TPU.

📌 Please refer to the table below to select the appropriate nozzle for printing:

| TPU 85A | Compatible： 0.6 mm / 0.8 mm /TPU high-flow hotend Not recommended： 0.6 mm high-flow hotend / 0.8 mm high-flow hotend Not compatible： 0.2 mm / 0.4 mm / high-flow 0.4 mm |
| TPU 90A | Compatible： 0.4 mm / 0.6 mm / 0.8 mm / TPU high-flow hotend Not recommended： 0.4 mm high-flow hotend / 0.6 mm high-flow hotend/ 0.8 mm high-flow hotend Not compatible： 0.2 mm |

If the hotend is not new, check the hotend condition (whether there is residue; if there is, raise the temperature and perform cold pulling 2-3 times using PLA / PETG filament, but do not use fiber-reinforced filaments for cold pulling).

**Flushing Operation Steps (using PLA Matte as an example):**

- For ease of operation, first disconnect the PTFE tube from the toolhead.

- It is recommended to raise the hotend temperature to 250°C, then insert a segment of PLA Matte filament into the toolhead.

- Press the "Extrude Down" button on the interface and observe whether the filament is extruded continuously and evenly. (This step should be repeated 3-5 times.)

[imagen]:冲刷-en.gif

#### ¶ Filament Storage Environment

It is recommended to keep the filament in an environment with humidity below 20% RH. It is advisable to store the filament in a storage box with a desiccant (silica gel desiccant is recommended).

[imagen]:收纳箱.jpeg

Please place silica gel desiccant in the storage box before storing the filament.

### ¶ General Machine Preparation

#### ¶ Build Plate

**Except for the Cool Plate SuperTack,** all other types of plates are compatible with TPU filaments.

### ¶ Container Preparation

We recommend using AMS HT or filament dry box for printing with TPU filaments.

Introduction to the two containers and filament loading methods are as follows:

#### ¶ AMS HT

When **printing** with TPU filament, the AMS HT functions **only** as a sealed and drying chamber — its **feeding function should not be used**.

The TPU filament must be fed through the dedicated **TPU Filament outlet**, not the default outlet.

[imagen]:tpu指南-出料口en.png

You can follow the steps below for installation:

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

#### ¶ Filament dry box

-

The filament dry box provides a sealed, low-resistance environment for filament feeding.

-

If using a filament box for loading, be sure to use the spool holder to ensure smooth rotation of the filament. Click the link below to download and print the holder.

*5.8L sealed filament box holder (https://makerworld.com.cn/zh/models/437644?from=search#profileId-353897)*

-

Additionally, to reduce loading resistance, please open the side opening of the filament box.

|  |  |
| [imagen] | [imagen] |

## ¶ P2S Loading and Unloading

    *

## ¶ P1 Series Loading and Unloading

- When printing with TPU, it is recommended to elevate the container to ensure smooth feeding and prevent excess filament from being scraped by the heated bed or nozzle.

- You can use items such as a small stool or box to elevate the container. Alternatively, if time permits, you can print the TPU filament spool rack (https://makerworld.com/zh/models/1155832-tpu-filament-spool-rack?from=search#profileId-1160985) model from MakerWorld for this purpose.

[imagen]

### ¶ Loading TPU 85A

- Remove the glass cover plate in advance, detach the PTFE tube connected to the toolhead, and secure the PTFE tube.

[imagen]:取下上盖玻璃.jpg

- Place the spool holder next to the printer, ensuring the filament discharge port is higher than the printer.

[imagen]:料架放置示意.jpg

- When loading, it is recommended to heat the hotend to 250 ℃. Load the filament directly from above the printer into the extruder (loading through the PTFE tube is not supported). Then, slowly click the "load" button to ensure the filament is extruded smoothly and evenly.

[imagen]:升温进料-en.gif

**Notes:**

- When clicking the extrusion button, do not click continuously, as this could cause the TPU to get caught in the extruder gears, leading to a clog.

- Once the extruder gears have engaged with the TPU filament, slowly click the extrusion button to ensure the filament extrudes smoothly and evenly from the hotend before starting the print.

### ¶ Loading TPU 90A

-

Place the spool holder next to the printer, ensuring the filament discharge port is higher than the printer.

-

Connect the PTFE tube to the sealed box opening, allowing the filament to enter the toolhead through the PTFE tube.

[imagen]:90a料架放置示意.jpeg

-

First, disconnect the PTFE tube from the toolhead, gently push the TPU 90A filament through the PTFE tube. Once the front end of the filament passes through the PTFE tube opening, grip the front end of the filament and pull out a certain length.

-

After heating the hotend (recommended 250℃), grip the front end of the filament, insert it into the toolhead, and slowly click the load button until the filament extrudes smoothly and evenly. Finally, reconnect the PTFE tube.

[imagen]:90a进料-en.gif

**Notes:**

- When loading through the PTFE tube, if you notice excessive resistance, please check whether the filament inside the sealed box rotates smoothly and whether the PTFE tube has any sharp bends.

- Once the extruder gears have engaged with the TPU filament, slowly press the extrusion button to ensure the filament extrudes smoothly from the hotend. This helps prevent the filament from getting caught in the extruder gears, which could cause a clog.

### ¶ Unloading

After printing TPU 85A & TPU 90A with the P series printer, manual unloading is required after heating.

**Automatic unloading with a cutter is not supported.**

**TPU 85A:**

- It is recommended to heat the hotend to 250°C.

- Slowly press the extruder unload button and gently pull the filament out of the toolhead as the extruder gears rotate back.

[imagen]:退料-en.gif

**TPU 90A:**

- It is recommended to heat the hotend to 250°C.

- Disconnect the PTFE tube from the toolhead, then grip the filament.

- Slowly press the extruder unload button and gently pull the filament out of the toolhead as the extruder gears rotate back.

- After unloading is complete, reconnect the PTFE tube to the toolhead.

[imagen]:90a退料-en.gif

### ¶ Parameter Settings

In addition to the preset parameters, specific parameter settings should be adjusted according to the characteristics of the model.

- The recommended printing temperature for TPU 85A & 90A is 225°C, and the heatbed temperature should be between 30-35°C.

- Please keep the default volumetric speed limit during printing, and it is not recommended to increase the print speed.

- When printing with TPU 90A filament, it is recommended to place the model in the middle towards the front of the heatbed to reduce friction between the filament and the PTFE tube.

[imagen]:90a摆放.png

## ¶ Filament Storage

Since TPU filament is highly **moisture-absorbent**, exposure to humidity can lead to degraded print quality (such as bubbles, stringing, or poor layer adhesion).

It is recommended to seal the filament immediately after printing. Store it with desiccant in an environment below 20% RH.

**Recommended storage options:**

- Airtight storage boxes with desiccant

- AMS HT for sealed storage

[imagen]:image18.jpeg

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
  encabezado (`#introduction`, `#loading-tpu-85a`, …) se han eliminado; el texto es el
  del original. Los enlaces se conservan con su URL entre paréntesis y **no se ha
  descargado ninguno de ellos**.

- **Qué aporta esta fuente:** es la guía de TPU **85A y 90A para la serie P** (P1/P1S y
  P2S). Aporta el detalle de **variante** que la guía general de TPU no da:
  - **85A y 90A son dos grados de dureza** y el texto lo dice sin ambigüedad: «85A and
    90A indicate the hardness levels of these two materials, **with 90A being harder
    than 85A**».
  - **La carga de 85A y la de 90A son procedimientos distintos**: el **85A no se puede
    cargar por el tubo PTFE** («loading through the PTFE tube is not supported»: hay
    que quitar la tapa de cristal y entrar directamente por arriba al extrusor), y el
    **90A sí** (se empuja por el PTFE y luego se introduce a mano en el cabezal). Es
    una diferencia de trazado de filamento, no de ajuste.
  - **La unload es manual**: «Automatic unloading with a cutter is not supported»,
    con hotend a 250 °C. Es una limitación de la **máquina** con este material.
  - **La tabla de boquillas por variante**: 85A incompatible con 0.2 y **0.4 mm**;
    90A sólo con 0.2 mm no compatible. Coincide con la guía general.
  - **Ajustes concretos**: boquilla **225 °C**, cama **30-35 °C**, «keep the default
    volumetric speed limit… it is not recommended to increase the print speed», y
    colocar el modelo hacia el frente de la cama con 90A para reducir la fricción
    entre filamento y tubo PTFE.
  - **El carrete se deforma al secar**: de 65,4 mm a unos 69,4 mm de ancho.
  - **La lista de problemas propios del material**: infraextrusión (obstrucción de
    boquilla, resistencia de carga, deslizamiento del filamento), **atasco del
    extrusor por flexión del filamento**, y goteo/hilos.

- **Relación con la tabla de materiales de Bambu que ya está en `wiki/raw/`:** esta
  página da **cama 30-35 °C** para TPU 85A/90A; la tabla de materiales da **TPU
  30-45 °C** para la fila genérica «TPU» y, en la tabla de placas, **30-35 °C** en
  Engineering Plate y **35-45 °C** en Smooth PEI / Textured. No es la misma
  comparación (variante y máquina concretas frente a fila genérica), pero **el
  cocinero tiene las dos cifras y no debe fundirlas**. La cifra de cama de esta guía
  pertenece a `temperatura-cama`, no a esta guía.

- **Contradicción con la guía de Prusament TPU 95A (ya en `wiki/raw/`):** Prusa da
  **boquilla 220-240 °C y cama 55-75 °C** para su TPU 95A; Bambu da **225 °C y
  30-35 °C** para 85A/90A. Materiales y máquinas distintas; el punto para el
  cocinero es que **la cifra de cama de un TPU cambia de un fabricante a otro** y
  no es un valor único del material.

- **Sobre el AMS:** esta página **no dice** que el AMS/AMS lite rechacen el TPU; sólo
  recomienda AMS HT o caja estanca y repite que el AMS HT se usa **sólo como cámara
  estanca y de secado**, con la salida TPU dedicada. La incompatibilidad explícita del
  AMS / AMS lite / AMS 2 Pro está en la guía general de TPU de Bambu (también en este
  lote) y en la tabla de materiales que ya estaba en `wiki/raw/`. **No atribuir esa
  incompatibilidad a esta página.**

- **Lo que esta fuente NO dice:** no habla de **extrusores bowden** en ningún
  momento, ni de ruido de extrusor, ni de cómo se afloja el idler. La regla de
  máquina equivalente (aflojar el idler para que los engranajes no enreden el
  filamento) está en el artículo de Prusa de este mismo lote. La diferencia entre
  uno y otro: Bambu no habla de idler, habla de **engranajes que no muerden** el
  filamento y de **módulo de asistencia**.

- **Detalles de maquetación que el cocinero debe saber:**
  - La sección «**P2S Loading and Unloading**» está **vacía**: sólo queda un `*`
    (un vídeo incrustado que no se ha descargado). El procedimiento de carga que
    hay en la página es el de la **P1 series**.
  - El enlace al módulo de asistencia apunta a la ruta **en chino**
    `/zh/general/manual/tpu-feed-assist-module`, que además **no está bajo los
    prefijos permitidos** (`/en/general/`, `/en/knowledge-sharing/`, `/en/filament-acc/`,
    `/en/software/`). No se ha descargado y no debe citarse nada de él.
  - Los dos enlaces de MakerWorld apuntan a `makerworld.com.cn` (dominio chino), no
    a `makerworld.com`, que es el que usa la guía general. Se conservan tal cual.
  - Los `[imagen]` son capturas del original; el texto alternativo de algunas está
    **en chino** (nombres de archivo como `冲刷-en.gif`, `取下上盖玻璃.jpg`,
    `料架放置示意.jpg`, `90a摆放.png`, `收纳箱.jpeg`, `tpu指南-出料口en.png`).

- **Erratas y rarezas del original, conservadas:** la coma china en «TPU Feed Assist
  Module Assembly，please click here», los dos puntos de las viñetas sueltas
  («- Special attention…», «- For printing TPU filaments…»), el salto de línea dentro
  de la tabla de boquillas (cada fila es una tabla de una sola línea) y la tabla de
  dos imágenes con las celdas de texto vacías en «Filament dry box». No se ha
  corregido nada.
- El texto original está en inglés y no lo he traducido.
