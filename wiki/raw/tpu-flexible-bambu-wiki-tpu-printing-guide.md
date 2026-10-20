---
titulo: "TPU Printing Guide | Bambu Lab Wiki"
url: https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide
sitio: wiki.bambulab.com
tipo: oficial
capturado: 2026-10-19
autor: Bambu Lab
idioma: en
---

## ¶ Introduction

TPU (Thermoplastic Polyurethane) is a flexible filament with high elasticity.

It can be stretched and will return to its original shape after deformation.

TPU is commonly used to print soft and flexible parts, such as phone cases, shoe soles, and toy components.

TPU hardness is defined using Shore Hardness. The most common scales are Shore A (softer) and Shore D (harder).

Hardness is typically written as a number followed by a letter, such as 90A, 95A, or 77D. A higher value means the filament is harder and less flexible.

General hardness order (from hardest to softest): 77D > 70D > 68D > 55D > 95A > 90A > 85A > 83A > 80A > 75A > 70A

For stable printing, TPU with a hardness of 85A or higher is recommended. Softer TPU (such as 83A or 80A) bends easily during feeding, which can cause filament buckling, tangling, or unstable extrusion. *Bambu Lab printers do not currently support printing with TPU filaments rated below 85A hardness.*

For more details, please visit the product details page: TPU (https://us.store.bambulab.com/collections/bambu-lab-3d-printer-filament?skr=yes&By+Material=TPU)

[imagen]:tpu指南-头图en.png

>

⚠️ **Important**

- Store filament in a **cool, dry** place, out of direct sunlight and away from heat sources.

- Keep filament and any broken fragments **out of reach of infants, children, and pets** to prevent the risk of swallowing and choking.

- **TPU filaments are highly hygroscopic**. Place it immediately into **an airtight container** with **effective desiccant** after use, and **thoroughly dry before printing** at the temperature and duration specified in the guide.

- Operate the printer in a **well-ventilated area**, or install an effective air filtration or exhaust system.

- TPU are **NOT** food-contact grade. Do not use printed parts to hold or come into contact with food.

>

## ¶ Printing Preparation

### ¶ Hardware Compatibility

#### ¶ Printer

|  | TPU 85A | TPU 90A | TPU 95A HF | TPU for AMS |
| H2，X1，P series | ✅ | ✅ | ✅ | ✅ |
| A1 series | ❌Incompatible | ✅ | ✅ | ✅ |
| A2L | ✅ | ✅ | ✅ | ✅ |

#### ¶ Nozzle

-

**Special attention must be paid to nozzle selection when printing TPU filaments.**

-

It is not recommended to use 0.2mm nozzles or regular high-flow nozzles for printing. Specifically, 85A TPU filaments cannot be printed with 0.4mm nozzles.

-

For printing TPU filaments, **it is recommended to use brand new nozzles, or cold-pull old nozzles before printing.** Please refer to the Cold Pull Guide (/en/p1/manual/p1s-cold-pull) for instructions.

-

Nozzle history matters. If the Nozzle was previously used with carbon fiber or glass fiber filaments, residual fibers may increase resistance when printing TPU. Perform several cold pull cleanings before printing TPU.

📌 Please refer to the table below to select the appropriate nozzle for printing:

| TPU 85A | Compatible： 0.6/ 0.8 mm / TPU high-flow hotend Not recommended: High-flow 0.6/ 0.8 mm Not compatible： 0.2/ 0.4 mm / High-flow 0.4 mm |
| TPU 90A | Compatible： 0.4/ 0.6/ 0.8 mm / TPU high-flow hotend Not recommended: High-flow hotend Not compatible： 0.2 mm |
| TPU 95A HF | Compatible： 0.4/ 0.6/ 0.8 mm / high-flow hotend / TPU high-flow hotend Not compatible : 0.2 mm |
| TPU for AMS | Compatible： 0.4/ 0.6/ 0.8 mm / high-flow hotend Not compatible: 0.2 mm |

>

🔗 For the full introduction and usage guide of the TPU high-flow hotend, please click here (/en/h2d/manual/tpu-high-flow-hotend) for details.

[imagen]:induction

>

#### ¶ Build Plate

**Except for the Cool Plate SuperTack,** all other types of plates are compatible with TPU filaments.

#### ¶ AMS Seires

Among the AMS series, only the AMS HT supports printing with TPU filament. When printing with TPU, the AMS HT functions solely as a sealed enclosure — its standard outlet and automatic feeding functionality cannot be used. Instead, the filament must be fed through the dedicated TPU outlet located on the back of the unit.

[imagen]:tpu指南-出料口en.png

Other AMS models (AMS / AMS Lite / AMS 2 Pro) are not compatible with TPU filament.

Additionally, TPU for AMS filament is compatible with the standard feeding functionality of all AMS series models for loading and printing.

#### ¶ TPU Feed Assist Module

TPU Feed Assist Module is an upgrade designed for H/X/P series printers to improve flexible-filament feeding. It reduces TPU feeding resistance in any spool orientation, eliminates jams and breaks, and greatly boosts TPU print reliability and success rates. The module also streamlines TPU loading, cuts pre-print prep, supports enclosed-chamber printing, and lets you feed directly through the dedicated TPU inlet for faster, simpler operation. For the full overview, click here (/en/general/manual/tpu-feed-assist-module).

[imagen]

### ¶ Drying the Filament

TPU is highly sensitive to moisture. Moist TPU can cause stringing, bubbles, and weak layer adhesion. **Drying before printing is essential**.

There are two methods for drying the Filament:

-

Use the drying function of **AMS 2 Pro and AMS HT**;

-

Use the **heatbed** of the sealed X-series, P-series, and H2-series printers.

>

📌 When using the AMS 2 Pro for drying, a power adapter may be required depending on the printer model and the number of AMS units connected. For certain printer models, a single AMS 2 Pro can operate without a power adapter. When using the AMS HT for drying, a power cable must be connected. **For detailed drying steps, please refer to: Filament Drying Recommendations (/en/filament-acc/filament/dry-filament)**

>

>

**Note**: The Switching Adapter for AMS 2 Pro is rated at 24V 4A. To ensure safe and proper operation, **please use official accessories only. Using a third-party adapter may damage the device and affect your warranty coverage**.

>

[imagen]:image-8.png

### ¶ Container Preparation

TPU filaments, due to their elasticity and viscosity, require a special loading method to reduce loading resistance and avoid "feeding difficulties" or "slippage," which can lead to print failures. Therefore, choosing a suitable container is crucial for printing with TPU filaments.

Due to the highly hygroscopic nature of TPU filament, the storage container used during printing must provide excellent airtightness.

Thus, we recommend using **AMS HT** or **filament dry box** for printing with TPU filaments.

Introduction to the two containers and filament loading methods are as follows:

#### ¶ **1. AMS HT**

When **printing** with TPU filament, the AMS HT functions **only** as a sealed and drying chamber — its **feeding function should not be used**.

The TPU filament must be fed through the dedicated **TPU Filament outlet**, not the default outlet.

*

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

#### ¶ **2. Filament dry box**

-

The filament dry box provides a sealed, low-resistance environment for filament feeding.

-

If using a filament box for loading, be sure to use the spool holder to ensure smooth rotation of the filament. Click the link below to download and print the holder.

*5.8L sealed filament box holder (https://makerworld.com/en/models/216532-drybox-cereal-box-hygrometer-desiccant#profileId-235628)*

-

Additionally, to reduce loading resistance, please open the side opening of the filament box.

|  |  |
| [imagen]:料桶侧边开孔.jpeg Use the side outlet of the dry box | [imagen]:耗材正常旋转.gif Ensure the filament unwinds smoothly |

---

>

💡 **Note:**

- When printing with TPU, it is recommended to elevate the container to ensure smooth feeding and prevent excess filament from being scraped by the heated bed or nozzle.

- You can use items such as a small stool or box to elevate the container. Alternatively, if time permits, you can print the TPU filament spool rack (https://makerworld.com/en/models/1155832-tpu-filament-spool-rack?from=search#profileId-1160985) model from MakerWorld for this purpose.

[imagen]

>

## ¶ How to Feed TPU

Different models have different feeding operation procedures. Please refer to the corresponding tutorial according to your model.

  类似格式展示

      [imagen]:H2 系列

H2 Series (/en/h2/h2d-tpu-printing-guide)

      [imagen]:X1 系列

X1 Series (/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-x-series)

      [imagen]:P1 系列

P Series (/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-p-series)

      [imagen]:A1

A1 Series (/en/filament-acc/filament/tpu-85a-90a-printing-guide-for-a-series)

  [imagen]:A2L

A2L (/en/a2l/manual/tpu-printing-guide)

      [imagen]:X2D

X2D (/en/x2d/manual/tpu-printing-guide)

>

📌**Note**

-

Before TPU printing, please turn off the flow dynamics calibration. For details, please see Flow Dynamics Calibration (/en/software/bambu-studio/calibration_pa)

-

[imagen]:关闭校准_en.png

>

## ¶ Filament Storage

Since TPU filament is highly **moisture-absorbent**, exposure to humidity can lead to degraded print quality (such as bubbles, stringing, or poor layer adhesion).

It is recommended to seal the filament immediately after printing. Store it with desiccant in an environment below 20% RH.

**Recommended storage options:**

- Airtight storage boxes with desiccant

- AMS HT for sealed storage

If TPU has been stored for a long time, dry it again before reuse.

*

[imagen]:image18.jpeg

## ¶ FAQ

### ¶ How to resolve stringing / oozing?

If you encounter stringing or oozing issues when printing with TPU, consider the following solutions:

[imagen]:image19.png

- **Print sequence By object**:If you have placed multiple models or are printing complex ones, try to minimize excessive travel moves during printing. It is recommended to use the “Print sequence By object” mode, or place fewer models and enable this option.For models with large idle travel distances, consider simplifying the model before starting the print.

| [imagen] It is not recommended to place multiple models on one plate and use the print by layer mode, as this will cause excessive travel between models and their supports, leading to severe stringing. | [imagen] It is recommended to use the print one at a time mode to reduce travel distance. |

- **Lower the nozzle temperature:** Since TPU has high fluidity, excessive nozzle temperature may cause oozing. You can slightly reduce the nozzle temperature (by about 5 °C from the original setting) to decrease filament flow. After lowering the temperature, it is also recommended to reduce the print speed accordingly (decrease the maximum volumetric flow rate by 0.4 mm³/s).

[imagen]:tpu指南-耗材丝设置en.png

- **Adjust Retraction:** After each layer, a retraction movement is performed to prevent oozing. If severe leaking occurs, try increasing the retraction distance by 0.2 mm from the original value.

[imagen]:tpu指南-耗材参数覆盖en.png

- **Ensure the Filament Is Fully Dried:** Stringing or oozing may also occur if the filament is not completely dried. It is recommended to follow the full procedure described in the  Filament Drying Guide (/en/filament-acc/filament/dry-filament) before printing

### ¶ How to resolve under-extrusion?

If you encounter under-extrusion or missing sections in your printed model, refer to the following suggestions to resolve the issue:

[imagen]:image24.jpeg

- Reduce Printing Speed:A lower printing speed allows the filament to melt more thoroughly, which helps reduce the likelihood of under-extrusion.

[imagen]:tpu指南-速度设置1en.png

-

Check for Feeding Resistance:Excessive feeding resistance may also cause under-extrusion. You can refer to the Reducing Feeding Resistance Guide (/en/knowledge-sharing/tpu-printing-guide#reducing-feeding-resistance-comparison-across-models) in this section for more details.

-

Check the Filament’s Dryness:Under-extrusion can also be a sign of filament moisture absorption. Make sure the filament is fully dried before printing.

-

Inspect the Hotend for Residue:If the hotend has previously been used with harder or high-temperature filaments, residue may remain inside. Perform a cold pull before starting a new print to ensure a clean nozzle.

### ¶ How to remove PLA support

To remove PLA support interfaces:

- Gently open a small gap at the edge

- Spray alcohol into the joint

- Wait for penetration

- Separate slowly and carefully

📌 Caution: Forcing support removal may damage the model.

[imagen]:tpu_喷酒精拆除支撑.gif

>

💡 **Tip:「Choosing Support Filament」**

-

**When printing TPU, PLA is recommended as the support filament.** When printing TPU, using the TPU itself as a support is often difficult to remove, easily causing surface scratches or deformation. PLA is recommended as the support material, as it ensures printing stability and facilitates later removal.

-

**Recommended support filament colors**：For best results, use light-colored PLA (such as white) or a color similar to the model to reduce staining risk.

>

### ¶ How to remove a TPU print that is difficult to detach from the build plate?

How to remove a print that is stuck to the build plate?

TPU generally adheres strongly to the build plate, which can make models with large bottom surfaces difficult to remove. In such cases, do not use excessive force, as this may damage the model or the build plate. Instead, **gently lift one corner of the model to create a small gap, spray isopropyl alcohol into the gap, and then slowly peel the model away from the build plate.**

---

*If the printing issue you encounter is not listed above, please refer to the following link to identify and resolve the problem based on the illustrated examples: Print Quality and Troubleshooting Guide (/en/filament-acc/filament/print-quality).*

## ¶ End Notes

>

We hope this guide has provided clear and practical support.

If the issue remains unresolved, please submit a support

ticket (https://bambulab.com/en/my/support/tickets/create) and include yourrecent printer logs and additional pictures or other details. Our technical team will review your requestand provide detailed assistance.

You can also visit Bambu AI (https://support.bambulab.com/en?from=6&lang=en-us),which can instantly answer common questions and provide you with operational guidance.

>

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el wiki de Bambu Lab se sirve como
  aplicación Vue y el artículo llega renderizado en el servidor dentro de
  `<template slot="contents">`. El cuerpo de este fichero está extraído de ese
  fragmento. Los anclajes de encabezado (`#introduction`, `#nozzle`, …) se han
  eliminado; el texto es el del original. Los enlaces se conservan con su URL entre
  paréntesis, y **no se ha descargado ninguno de ellos**: sólo las cinco páginas de
  este lote.

- **Ésta es la fuente que el brief pedía como pieza central de Bambu.** Aporta, en
  texto literal:
  - La definición de la escala Shore y la **ordenación de durezas**
    (77D > 70D > 68D > 55D > 95A > 90A > 85A > 83A > 80A > 75A > 70A), con la regla
    de que un número más alto significa material más duro y menos flexible.
  - El **umbral de 85A** y la afirmación literal de que «Bambu Lab printers do not
    currently support printing with TPU filaments rated below 85A hardness», con su
    causa: el TPU más blando se dobla en la alimentación y produce buckling, tangling
    o extrusión inestable.
  - La **tabla de compatibilidad por impresora** (H2/X1/P series, A1 series, A2L)
    cruzada con las cuatro variantes (TPU 85A, TPU 90A, TPU 95A HF, TPU for AMS).
    La única incompatibilidad explícita es **A1 series + TPU 85A**.
  - La **tabla de boquillas por variante**, con el 0.2 mm nunca compatible y el 0.4 mm
    no compatible con 85A.
  - La **sección «AMS Seires»**, que es la respuesta a la escena 3 de la prueba de
    utilidad: sólo el AMS HT admite TPU, y **su función de alimentación no se usa**
    (sirve de cámara estanca y de secado; el filamento entra por la salida TPU
    dedicada). AMS / AMS Lite / AMS 2 Pro no son compatibles con TPU.
  - La **descripción del TPU Feed Assist Module** como accesorio de mejora para
    H/X/P series: reduce la resistencia de alimentación, elimina atascos y roturas.
  - El FAQ: ajuste de retracción (+0,2 mm) y de temperatura (−5 °C) para el goteo, y
    las cuatro causas de infraextrusión (velocidad, resistencia de alimentación,
    humedad, residuo en el hotend).
  - La instrucción de **desactivar la calibración de dinámica de flujo** antes de
    imprimir TPU.

- **Contradicción con la tabla de materiales de Bambu que ya está en `wiki/raw/`**:
  la tabla (`material-bambulab-material-table.md`) dice, para la fila «TPU», que es
  **«Not Compatible»** con el AMS / AMS lite, y en el apartado de la boquilla lista
  «TPU for AMS», «TPU 95A HF», «TPU 85A» y «TPU 90A» como variantes separadas con
  200-250 °C. Esta guía dice que **el AMS HT sí sirve con TPU** (como cámara estanca,
  no como alimentador) y que **«TPU for AMS» sí es compatible con la alimentación
  normal de todos los AMS**. No son la misma cosa: la tabla habla de la fila «TPU» y
  del AMS/AMS lite; esta guía habla del AMS HT y de una variante «TPU for AMS»
  que es un producto distinto. **El cocinero debe explicitar el matiz, no elegir
  una de las dos.** Nótese además que la tabla de materiales **no menciona el AMS HT**
  en ninguna fila.

- **Cifras de esta fuente que no son de esta guía** y que van a otras: el secado
  (→ `secar-filamento`), la humedad de almacenamiento (20 % RH) y las cifras de cama
  (no las da esta página; las dan las guías por serie y la tabla de materiales).

- **Erratas y rarezas del original, conservadas:** el encabezado «AMS Seires» (typo
  de «Series»), los «printsequenceByobject» pegados, «include yourrecent printer
  logs» y «yourrequestand provide», «Bambu AI,which», y un fragmento en chino sin
  traducir («类似格式展示», «H2 系列», «X1 系列», «P1 系列», «A2L», «X2D»,
  «tpu指南-头图en.png», «关闭校准_en.png», «料桶侧边开孔.jpeg», «耗材正常旋转.gif»,
  «tpu_喷酒精拆除支撑.gif») que corresponde a la maquetación interna del wiki.
  No se ha corregido ni traducido nada.

- La página se actualizó por última vez el 2026-09-17 y firma como autor «Newt».
- El texto original está en inglés y no lo he traducido.
