---
titulo: Placas de impresión (build plates)
tema: placas
fuentes:
  - wiki/raw/placas-prusa-kb-flexible-steel-sheets-guidepost.md
  - wiki/raw/placas-bambu-wiki-introduction-build-plates.md
  - wiki/raw/placas-bambu-wiki-pei-plate-clean-guide.md
  - wiki/raw/placas-bambu-wiki-how-to-use-glue.md
  - wiki/raw/placas-prusa-kb-smooth-steel-sheet.md
  - wiki/raw/placas-prusa-kb-filament-material-guide.md
cocinado: 2026-10-16
---

# Placas de impresión (build plates)

## Afirmaciones

### Tipos oficiales — Prusa Research

- Prusa ofrece **seis tipos de chapa de acero flexible magnética**: Smooth (lisa), Textured (texturizada/powder-coated), Satin (satinada), PA Nylon, PP, HighTemp.
  — [Prusa Research, Flexible steel sheets (guidepost)](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Smooth**: adhesión excelente con la mayoría de filamentos y geometrías; TPU y PETG se adhieren demasiado y pueden dañar la chapa al despegar.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Textured (powder-coated)**: para entornos de producción con PETG y otros filamentos de alta adhesión.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Satin**: en textura y propiedades está entre la Smooth y la Textured.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **PA Nylon**: diseñada para poliamidas (nylon), porque su adhesión a las chapas PEI estándar es generalmente muy pobre. Compatible con la mayoría de poliamidas y con PETG; otros materiales pueden tener adhesión insuficiente y conviene imprimirlos en las chapas PEI estándar.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **PP**: adecuada sobre todo para polipropileno; la adhesión de otros materiales a esta superficie es muy pobre. Superficie ligeramente texturizada, similar a la Satin.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **HighTemp**: para materiales especiales de alta temperatura (PEEK, PEEK-CF, PEI, PEKK, PPSU), que de otro modo tendrían adhesión pobre o excesiva en chapas estándar. PLA y PETG básicos no adhieren muy bien, porque la chapa se desarrolló para materiales de alto rendimiento y alta temperatura. **Sólo para Prusa Pro HT90**.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Prusa Pro HT90** puede usar tres tipos de chapa: Textured, PP, PA Nylon y HighTemp.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- La chapa de acero flexible se sujeta magnéticamente al heatbed; en MK-series, MINI/+, XL y HT90 la parte superior tiene dos pines que encajan con una muesca de la chapa.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- Hay que asegurarse de que el heatbed esté limpio y libre de restos de filamento antes de colocar la chapa.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- En MK-series y MINI/+, hay que ignorar los dos agujeros de la chapa que estão en el lado opuesto a la muesca: son del proceso de fabricación y no sirven para alinear la chapa.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- Las chapas son **consumibles** y no están cubiertas por garantía: los recubrimientos disminuyen con el tiempo. Sólo las chapas defectuosas de llegada están cubiertas; el daño cosmético (arañazos, grietas, etc.) no.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195); [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)

### Tipos oficiales — Bambu Lab

- Bambu Lab ofrece principalmente: **Textured PEI Plate**, **Smooth PEI Plate**, **Dual-Texture PEI Plate**, **Engineering Plate**, **Cool Plate SuperTack** y **3D Effect Sheet** (film adhesivo sobre plancha de acero).
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Textured PEI Plate**: fabricada rociando polvo de PEI sobre ambos lados de una lámina de acero inoxidable. Superficie texturizada. Suele dar adhesión excelente sin adhesivo. Recubrimiento duradero y robusto.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Smooth PEI Plate**: chapa de PEI seleccionada adherida a acero de muelles con adhesivo 3M resistente al calor. Superficie plana. Apta para escenarios que exigen base nivelada. El acero de muelles de 0,5 mm ayuda a reducir el riesgo de deformación de la propia placa.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Dual-Texture PEI Plate**: acero inoxidable con recubrimiento doble cara, un lado texturizado y el otro liso; el usuario elige textura para el acabado inferior de la pieza.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Engineering Plate**: recubrimiento reforzado resistente a corrosión, optimizado para ABS, ASA, PC y PA. Mayor resistencia a altas temperaturas, arañazos y corrosión; textura fina y uniforme; acabado inferior casi brillante.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Cool Plate SuperTack**: textura fina casi lisa/brillante; orientada a principiantes; adhesión muy fuerte para PLA y PETG sin glue incluso a baja temperatura (PLA a sólo 40 °C). Reduce energía de calentamiento, riesgo de atasco al imprimir PLA/PETG, consumo eléctrico. **Sólo PLA y PETG**: otros materiales pueden dañar el recubrimiento.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **3D Effect Sheet**: film con texturas ópticas (diamante, estrellado, galaxia, fibra de carbono) transferidas a la base de la pieza. Se recomienda usar PLA y TPU. Debe aplicarse sólo sobre la plancha de acero oficial Bambu Lab. El tipo de placa debe configurarse como Smooth PEI/High Temp Plate. La calibración por LIDAR del X1 no funciona con estos films; conviene omitirla o calibrar con una placa normal. Son consumibles.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- La Textured PEI Plate se despega sola al enfriar: *«Prints come off easily when the temperature of the heatbed reaches room temperature, and we always recommend waiting until it reaches 35 ℃ or lower»*.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Compatibilidad de filamentos por placa Textured PEI: PLA, TPU, PETG y materiales de alta temperatura como ABS y Nylon. Para imprimir PC/PA/ABS/ASA en Textured PEI puede ser necesario aplicar una capa de glue stick.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Smooth PEI Plate: sólo PLA no necesita glue; **todos los demás filamentos requieren glue** para evitar que el sheet de PEI se rasgue.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Engineering Plate: antes de imprimir **con cualquier filamento**, aplicar glue (barra o líquido, según material y condiciones). Si el modelo se adhiere demasiado, aplicar alcohol en la zona de contacto para facilitar la extracción; evitar fuerza excesiva.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Cool Plate SuperTack: para PLA y PETG. A baja temperatura de cama (40 °C con PLA) adhiere firmemente. En 2.ª generación PETG sólo necesita 55–60 °C. Algunos modelos aún usan parámetros compartidos para 1.ª y 2.ª generación; en X/P series la temperatura recomendada de PETG puede seguir siendo ~65 °C, lo que ayuda a reducir warping y defectos de superficie como *elephant foot* en modelos grandes.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Recubrimiento del Cool Plate SuperTack es algo más blando que el de la Textured PEI, por eso es más susceptible a arañazos de espátula. Los arañazos menores no afectan significativamente a la adhesión.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Larga vida del Cool Plate SuperTack: *«less than 20 % adhesion loss after 300 prints»*. Los datos de prueba se obtuvieron con PLA Basic en una impresora A1.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Antes de usar espátula en Cool Plate, humedecer la zona de contacto con alcohol; eso reduce la dificultad de despegue y el riesgo de daño en superficie.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Si el modelo del Cool Plate queda demasiado adherido: recolocar la placa en la cama caliente a ~50 °C y reintentar; o aplicar alcohol por debajo y hacer palanca con espátula. Para futuros prints bajar ligeramente la temperatura de cama.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Modelos con soportes arbóreos o brims extensos, o grandes paneles planos de pocas capas (litofanías), generalmente no son aptos para despegue flexionando la placa; conviene usar métodos asistidos por espátula.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Marcas residuales normales en Cool Plate: la mayoría se eliminan con toallitas de alcohol o detergente y agua; algunas manchas persistentes no afectan al uso a largo plazo.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)

### Dimensiones y generaciones (Bambu)

- Dimensiones por modelo: 350 × 320 mm (H2D/H2S); 330 × 320 mm (H2C/A2L); 256 × 256 mm (X2D/P2S/P1/X1/A1); 180 × 180 mm (A1 mini).
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Las chapas Textured PEI, Smooth PEI y Cool Plate SuperTack en 256 × 256 mm existen en **dos generaciones**: la 1.ª es compatible con A1 y X1/P1; la 2.ª es compatible con P2S/X2D. La diferencia principal es el código QR actualizado.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- ⚠️ Las chapas de 1.ª generación **no soportan el reconocimiento de placa** de impresoras de 2.ª generación (P2S y posteriores).
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- P2S/X2D pueden usar físicamente chapas de 1.ª generación, pero el tipo de placa no se reconocerá automáticamente; si aparece «Build plate not recognized», seleccionar «Resolved» o desactivar la detección de placa.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- X1 puede usar chapas de 2.ª generación, pero no se identificarán automáticamente; elegir «Resolved» o desactivar la detección de placa.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- A1 y P1 son totalmente compatibles con chapas de 2.ª generación.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)

### Compatibilidad material → chapa y temperaturas de cama

#### Tabla A — Adhesión por superficie y material (directo vs glue)

| Chapa | Adhesión directa (sin glue) | Requiere / recomienda glue |
|---|---|---|
| Prusa Smooth PEI | PLA, HIPS, ABS/ASA, compuestos (metálicos/madera). Prints con esquinas vivas o pequeña área de primera capa se despegan menos. | Para PETG, ASA, ABS y PC Blend **puede** hacer falta una capa protectora de gluestick (alto riesgo de daño al despegar). |
| Prusa Textured (powder-coated) | Producción con PETG y filamentos de alta adhesión; mejor despegue que en lisa. | No se afirma «sin glue» de forma categórica en la guía; Prusa remite a la tabla de materiales para cada combinación. |
| Prusa Satin | Rango medio entre lisa y texturizada. | Idem. |
| Prusa PA Nylon | Poliamidas y PETG. | Otros materiales pueden tener adhesión insuficiente y deben ir en chapas PEI estándar. |
| Prusa PP | Polipropileno (especialmente Prusament PP Carbon Fiber Black). | Otros materiales tienen baja adhesión. |
| Prusa HighTemp | PEEK, PEEK-CF, PEI, PEKK, PPSU. | PLA y PETG básicos adhieren mal; chapa sólo para HT90. |
| Bambu Textured PEI | PLA, TPU, PETG en la mayoría de los casos. | PC/PA/ABS/ASA pueden requerir glue stick. Para PETG de alta adherencia, aplicar glue reduce la adhesión y evita daño al despegar. |
| Bambu Smooth PEI | Sólo PLA sin glue. | Todos los demás filamentos requieren glue (evita rasgar el sheet PEI). |
| Bambu Engineering | (ninguno sin glue) — glue antes de cualquier filamento. | Todos los filamentos. |
| Bambu Cool Plate SuperTack | PLA y PETG sin glue. | No aplicable (diseñada sólo para esos dos). |
| Bambu Cool Plate (descatalogada) | PLA con glue aplicado antes. | Otros filamentos (PETG, ABS) causan abultamiento y pegado. |
| Bambu High Temperature Plate (descatalogada) | PLA. | Otros que PLA deben usar glue. |
| Bambu 3D Effect (film) | Recomendado PLA y TPU (establecer tipo de placa Smooth PEI/High Temp). | — |

— [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195); [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550); [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates); [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)

#### Tabla B — Pegamento por material (Bambu Lab)

| Tipo de glue | Filamentos que declara | Uso según placa |
|---|---|---|
| Glue Stick para build plate | PC, PA, ASA-CF, PPA-CF, PPS-CF, PET-CF, PA6-GF. También regular glue stick para facilitar la extracción de filamentos de alta adhesión. | Ver filas de placa. |
| Liquid Glue para build plate | PLA, ABS, PETG, TPU. | Ver filas de placa. |

— [Bambu Lab, How to use Bambu Lab glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)

#### Temperaturas de cama documentadas en estas fuentes

- **Prusa**: PLA → cama **50–60 °C**, nozzle 185–235 °C. La tabla tiene también columna de chapas (Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT), pero **no se publican valores por chapa en este material cocinado** por desalineación en la reconstrucción.
  — [Prusa Research, Filament Material Guide](https://help.prusa3d.com/materials)
- **Prusa**: PETG → 70–90 °C de cama; PETG HT → 110 °C; ASA → 90–110 °C; ABS → 95–110 °C; PC → 100–115 °C; CPE → 90–110 °C; PVA/BVOH → 60 °C; HIPS → 100–110 °C; PP → 70–100 °C; Flex → 40–85 °C; nGen → 90 °C; PA (nylon) → 70–115 °C; wood/metal filled → 60–100 °C; PVB → 75 °C; PA6-GF/referencias composite → 40–120 °C; PEI (filamento) → cama 150 °C (con MagiGoo HT); glow-in-the-dark → 85 °C.
  — [Prusa Research, Filament Material Guide](https://help.prusa3d.com/materials)
- Las filas PETG, PETG HT, ABS, ASA, PC, CPE, PA (excepto poliamidas en PA Nylon) en Smooth y/o Satin **requieren gluestick** según la tabla Prusa; PETG también «Cleaned with water».
  — [Prusa Research, Filament Material Guide](https://help.prusa3d.com/materials)
- **Bambu Cool Plate SuperTack**: PLA incluso a 40 °C; PETG 55–60 °C (2.ª generación); ~65 °C en X/P series por parámetros compartidos.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Bambu (test de adhesión de cama)**: si la fuerza de adhesión es insuficiente en Textured PEI, **subir ligeramente** la temperatura de cama; temperaturas excesivamente altas con PLA/PETG pueden causar atasco y *elephant foot*.
  — [Bambu Lab, Textured PEI Plate Cleaning Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)

### Limpieza de placas

#### Textured PEI (Bambu)

- No limpiar la Textured PEI con **acetona**: daña la superficie PEI.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- El detergente usado no debe contener aceites ni cremas hidratantes; pueden quedarse en la placa e impactar la adhesión.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Alcohol puede simplemente dispersar los aceites en lugar de eliminarlos; el detergente actúa como desengrasante y con esponja/cepillo penetra en las texturas.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Procedimiento: mojar la placa; aplicar detergente de cocina uniformemente; frotar con esponja básica o cepillo/pad abrasivo para que el detergente entre en las ranuras; enjuagar con agua; secar. Evitar tocar la superficie de impresión con los dedos; sujetar por los bordes.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Desgastar la superficie con lija fina o lana de acero crea una superficie nueva y limpia que mejora la adhesión; limpiar el polvo de lijado después.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Diagnóstico por flujo de agua: si el agua baja en hilos/gotas → mala adhesión (sucia); si forma una lámina fina → buena adhesión (limpia).
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Los aceites naturales de las manos transfieren a la superficie y reducen la adhesión; las huellas se ven durante la primera capa.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Marcas residuales en placa: la mayoría se eliminan con detergente y agua o alcohol. Las manchas persistentes no afectan al rendimiento a largo plazo. El blanqueo en la base de la pieza suele deberse a solidificación de residuos de glue; limpiar con agente de limpieza o alcohol.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates); [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)

#### Smooth PEI (Prusa)

- Limpiar con IPA ~90 % o alcohol desnaturalizado **en frío**, aplicado con toallita sin perfume; **no usar productos para la piel** (pueden contener aceites que arruinan la adhesión).
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Acetona puede usarse 1–2 veces al mes si la limpieza con IPA no es suficiente.
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Tras 1–2 años de uso la superficie puede pulirse más y afectar la adhesión; se puede **revivir** con lija de grano alto (600–1000), lijando suavemente para traer PEI fresco a la superficie (queda con textura muy ligera).
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- El film de PEI liso sobre la chapa de acero se puede **reemplazar** en caso de daño extensivo.
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Burbujas bajo el PEI: normales, suelen desaparecer en días/semanas. Aceleran el recuperado: usar el otro lado de la chapa; variar la colocación de las piezas (no imprimir siempre en el mismo punto, p. ej. el centro).
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Abolladura (dimple) en el PEI al desembalar: dar la vuelta y usar el otro lado; con el calor de la cama desaparece sola en ~1–2 días de tiempo de impresión.
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- La chapa lisa es **más gruesa** que la texturizada y la satinada.
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Color/patrón: no garantizar el patrón dejado en las piezas ni el ajuste cosmético de chapa a chapa; las especificaciones se centran en adhesión y durabilidad para ciertos materiales.
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)

#### General

- Antes de imprimir, el nozzle se limpia en un nozzle wiper y luego se frota en una **zona de wipe** de la propia chapa. En X1C, P1S/P1P y A1 (contacto directo nozzle-placa) puede haber «desgaste» en esa zona pero no afecta a la función de nozzle ni de placa. En A1 mini el wipe zone está en el heatbed y no se desgasta la placa.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Antes de pegar, la superficie debe estar limpia, seca y sin grasa; aplicar glue de forma uniforme con presión adecuada.
  — [Bambu Lab, How to use Bambu Lab glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)

### Dimensiones, reconocimiento y particularidades de diseño

- Antes de poner la chapa, limpiar el heatbed y los restos de filamento.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- Cada tipo de chapa tiene **espesor ligeramente distinto**; en impresoras sin loadcell, cambiar de chapa requiere reclibrar la primera capa (First Layer Calibration en i3) o usar perfiles de chapa distintos.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195); [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- La chapa lisa tiene un Live-Z que hay que reajustar al cambiar de chapa en impresoras con PINDA (ver Steel sheet profiles).
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Chips de alineación: en MK/XL/MINI/HT90 los pines encajan con la muesca de la chapa.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)

### Desprendimiento (removal) y recuperación

- Esperar siempre a que la chapa enfríe a temperatura ambiente antes de despegar; flexionar la chapa hacia dentro y fuera; se puede usar espátula para no dañar. Para PETG, ASA, ABS, PC Blend y/o prints con gran superficie de primera capa puede hacer falta una capa de separación en forma de gluestick.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- Si aun así es difícil o la superficie se dañó al despegar, puede que el tipo de filamento no sea adecuado para esa chapa o que la superficie no se preparó bien: consultar la tabla de materiales.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- Con espátula, doblar ligeramente la chapa e insertar por debajo del modelo cuando sea posible, en vez de apalancar sobre superficie plana. Para prints atascados, recalentar la cama unos minutos a la temperatura original y dejar enfriar de nuevo.
  — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- Smooth PEI Prusa: arañazos cosméticos pueden aparecer; se puede usar espátula metálica pero con cuidado.
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- Bambu Smooth/Textured/Engineering: si el modelo queda demasiado adherido, calentar la cama a ~50 °C y reintentar, o aplicar alcohol bajo la placa y hacer palanca con espátula.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)

### Manejo del pegamento (Bambu) — curado, limpieza y almacenamiento

- Aplicar glue **antes** de imprimir. Esperar a que la placa enfríe antes de extraer el modelo reduce el riesgo de daño.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Si hay mucho residuo de glue, limpiar la placa antes del siguiente print para asegurar buena adhesión.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Glue líquido debe secarse hasta formar film que ya no forme hilos; el precalentamiento de la cama al iniciar la impresión es suficiente para secarlo del todo.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Tiempos de curado del glue líquido: ~1 h a temperatura ambiente (24 °C); ~45 s con cama a 90 °C; ~2 min con cama a 70 °C.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Un secado más completo **no garantiza** mejor adhesión: la clave es cómo se aplica. Una capa gruesa proporciona adhesión significativamente mayor que una delgada. Consejo: aplicar de forma uniforme y moderadamente gruesa; **4 capas dan la mejor adhesión**; más allá de cuatro la adhesión disminuye.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Engineering Plate: aplicar solid glue puede facilitar la extracción, pero por su espesor y dificultad de aplicación uniforme, estabilidad y calidad de primera capa son peores que con liquid glue. Liquid glue puede dificultar la extracción. Elegir según filamento, entorno y condiciones.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Textured PEI con glue: generalmente no se necesita; aplicarlo reduce la adhesión (útil en PETG para no dañar al despegar). También reduce blanqueo en la base si se fuerza la extracción.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Smooth PEI Bambu: filamentos de alta temperatura y todos excepto PLA requieren glue para aumentar tasa de éxito y evitar daño al extraer el modelo (ej. PA6-GF).
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Cool Plate (descatalogada): sólo PLA; aplicar glue antes de imprimir; otros filamentos (PETG, ABS) causan abultamiento y pegado.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- High Temp Plate (descatalogada): mejor resistencia térmica que la Cool Plate; para filamentos distintos de PLA usar glue para asegurar adhesión y reducir riesgo de rasgar la spare sheet.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Cool Plate SuperTack: **sin glue**.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Limpieza de glue stick: agua y jabón; si está seco, dejar la placa en remojo ~30 s antes de lavar.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Residuo de liquid glue: enjuagar con agua y frotar con paño no tejido hasta eliminarlo por completo.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Almacenamiento de glue: lugar fresco y seco, sin luz solar directa.
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Third-party glues are strongly discouraged and may damage the plate.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)

### Elephant foot y temperaturas de cama por chapa (según estas fuentes)

- Con PLA/PETG, temperaturas de cama excesivamente altas pueden causar atasco y *elephant foot*.
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Con Cool Plate SuperTack, mantener una temperatura baja para PLA (40 °C) y PETG (55–60 °C; ~65 °C en máquinas con parámetros compartidos) ayuda a reducir warping y defectos de superficie como *elephant foot*, especialmente en modelos grandes.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- El residuo de glue solidificado al calentarse causa blanqueo en la base; se elimina con agente de limpieza o alcohol.
  — [Bambu Lab, Introduction to Build Plates](https://wiki.bambulab.com/en/filament-acc/acc/plates)

## Contradicciones

No se resuelven aquí; se anotan con su matiz.

### Acetona: daña una chapa y revive la otra

- **No usar acetona** en Textured PEI Bambu: daña la superficie PEI. — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- La Smooth PEI de Prusa **puede** limpiarse con acetona 1–2 veces al mes si IPA no es suficiente. — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- **Matiz**: son superficies y procesos distintos (PEI en polvo sobre acero inox vs. film de PEI pegado con adhesivo 3M). La restricción es específica de la Textured PEI; el permiso es específico de la Smooth PEI de Prusa, y además «no usar en exceso». No generalizar el permiso ni la prohibición a «todas las placas».

### Alcohol vs detergente

- En la Textured PEI Bambu el alcohol puede **dispersar** los aceites; se recomienda detergente + agua tibia + frotado. — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- En la Smooth PEI Prusa el limpiador principal es **IPA ~90 % (o alcohol desnaturalizado) en frío**, con toallita sin perfume; acetona sólo de forma ocasional. — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550)
- **Matiz**: plataformas distintas prefieren un químico distinto; el tipo de chapa (texturizada vs lisa) determina si el alcohol es la primera opción o la segunda.

### Glue: obligatorio, opcional o prohibido según la chapa

- Bambu **Engineering Plate**: glue obligatorio antes de cualquier filamento (barra o líquido). — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates); [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Bambu **Textured PEI**: generalmente no necesita glue; para PETG de fuerte adhesión se aplica glue para **reducir** la adhesión. — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates); [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Bambu **Smooth PEI**: todos excepto PLA requieren glue (para evitar rasgar el sheet). — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Bambu **Cool Plate SuperTack**: sin glue. — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Prusa **Smooth PEI**: ideal para PLA/HIPS/ABS-ASA/compuestos directo; PETG, ASA, ABS y PC Blend **pueden** requerir gluestick. — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550); [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Matiz**: «glue» no es una operación única. En Textured PEI Bambu el glue puede usarse para **bajar** la adhesión (PETG); en Smooth PEI para **subir** la tasa de éxito y proteger el sheet; en Engineering es obligatorio siempre; en Cool Plate SuperTack está prohibido. La función del glue depende de la placa, no del material solo.

### Despegue por enfriamiento vs recalentado

- Textured PEI Bambu se despega sola al enfriar a ≤35 °C; si queda adherido, recalentar la cama a ~50 °C y reintentar o usar alcohol + espátula. — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Prusa: para prints atascados, recalentar la cama a la temperatura original unos minutos y dejar enfriar de nuevo; esperar a temperatura ambiente antes de despegar flexionando. — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Matiz**: una placa se despega con enfriamiento (efecto térmico del PEI) y la otra se afloja con recalentado (reactivación de la adhesión para luego enfriar). Son dos estrategias distintas para dos superficies; no mezclarlas como si fueran el mismo mecanismo.

### Temperatura de cama compartida (Cool Plate SuperTack)

- 2.ª generación PETG: 55–60 °C. Algunos modelos aún usan parámetros compartidos de 1.ª/2.ª generación, por lo que en X/P series la temperatura recomendada puede seguir siendo ~65 °C. — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- **Matiz**: no es contradicción entre fuentes, sino entre generaciones/máquinas. Hay que mirar la generación de la placa y el modelo de impresora antes de fijar un número.

### Degradación: datos de una sola placa

- Sólo el Cool Plate SuperTack tiene dato cuantitativo de pérdida de adhesión (<20 % tras 300 impresiones, con PLA Basic en A1). — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Prusa declara las chapas como consumibles sin garantía, sin dar porcentaje ni nº de impresiones. — [Prusa Research, guidepost](https://help.prusa3d.com/article/flexible-steel-sheets-guidepost_2195)
- **Matiz**: la cifra de durabilidad **no es transferible** a Textured PEI, Smooth PEI ni PA/PP/HighTemp.

## Sin respaldo

No hay fuentes secundarias (foros) en este lote: todas son documentación oficial de Prusa Research o Bambu Lab. Aun así, las siguientes afirmaciones salen de **una sola fuente oficial** y no están corroboradas por otra fuente del conjunto; conviene marcarlas como tales en el artículo.

- Curado del glue líquido: 1 h a 24 °C / ~45 s a 90 °C / ~2 min a 70 °C; 4 capas como óptimo; capa gruesa > delgada; más secado no es mejor. **[UNA SOLA FUENTE — Bambu, sin corroborar]**
  — [Bambu Lab, How to use glue](https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue)
- Cool Plate SuperTack: <20 % de pérdida de adhesión tras 300 impresiones (sólo PLA Basic en A1). **[UNA SOLA FUENTE — Bambu, condición de prueba limitada]**
  — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Recalentado a ~50 °C para despegar un modelo demasiado adherido en Cool Plate SuperTack. **[UNA SOLA FUENTE — Bambu]**
  — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Recuperación de Smooth PEI Prusa con lija 600–1000 tras 1–2 años; acetona 1–2 veces/mes; burbujas en días/semanas; abolladuras que desaparecen en 1–2 días de impresión; chapa Smooth PEI Bambu con acero de muelles de 0,5 mm que ayuda a reducir la deformación de la propia placa. **[UNA SOLA FUENTE — Prusa/Bambu, sin segunda fuente]**
  — [Prusa Research, Smooth Steel Sheet](https://help.prusa3d.com/article/smooth-steel-sheet_196550); [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Textured PEI: diagnóstico por flujo de agua (hilos/gotas vs lámina); lija fina o lana de acero para recrear superficie. **[UNA SOLA FUENTE — Bambu]**
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- Rescate de primera capa: 0,5 mm de ancho de línea y 0,25 mm de alto de capa para la Textured PEI. **[UNA SOLA FUENTE — Bambu]**
  — [Bambu Lab, PEI Plate Clean Guide](https://wiki.bambulab.com/en/filament-acc/acc/pei-plate-clean-guide)
- 3D Effect Sheet: LIDAR del X1 no funciona; consumible; sólo PLA y TPU recomendados. **[UNA SOLA FUENTE — Bambu]**
  — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)
- Nylon y PC absorben humedad en horas (fuera del alcance de «placas»; no se extrae adhesión, pero afecta al proceso). Aparece en el contexto de warping, no de placas. **[NO SE USA AQUÍ]**
- El motivo «PC/PA/ABS/ASA may be necessary glue on Textured PEI» aparece en una sola página. **[UNA SOLA FUENTE — Bambu]**
  — [Bambu Lab, Introduction](https://wiki.bambulab.com/en/filament-acc/acc/plates)

## Tirado

Qué se ha eliminado y por qué.

- Navegación, migas de pan, pies, «Was this article helpful?», selectores de idioma, menús, newsletters, comentarios de 31 usuarios del centro de ayuda de Prusa. Los comentarios no son fuente verificable.
- Vídeo incrustado de «How to use Bambu Lab glue»: no transcrito; sólo mención.
- Enlaces de compra («Purchase link: Glue Stick…», «Liquid Glue…», «Factory second», enlaces a further reading) y banners.
- Imágenes del HTML de Prusa: la guía `flexible steel sheets` las tenía como montaje sin texto alternativo útil; se han conservado sólo encabezados textuales (Smooth/Textured/Satin/PA/PP/HighTemp). Primer plano de_UNSUPPORTED no informa nada medible.
- Tablas de imágenes de «Bambu 3D Effect» y capturas de flujo de agua: sin texto, se conserva sólo la indicación textual del fenómeno.
- «Related wiki links» y referencias cruzadas no citables en este lote (Bambu Cool Plate SuperTack dedicated page, troubleshooting de Smooth PEI, How to Replace build plate sheet) no traen contenido adicional verificable.
- Columnas de compatibilidad chapa-material de la tabla Prusa `help.prusa3d.com/materials`: se han **descartado los valores por chapa** de esa tabla porque en la reconstrucción texto-plano quedaron desalineados respecto a sus cabeceras (p. ej., «with glue stick»/«Cleaned with water» no asignables con seguridad). Se conserva la columna de temperaturas de cama y las notas generales; el mapeo por chapa se toma del guidepost y del artículo Smooth, que sí son claros.
  — fuente del problema: notes del recolector en `wiki/raw/placas-prusa-kb-filament-material-guide.md` (:65-69)
- Compatibilidad detallada de Bambu placa×filamento fuera de lo declarado en la introducción: la wiki remite a una «Filament Guide» que **no está en este lote** de raw, así que no se inventa esa matriz. Sólo se afirman los emparejamientos explícitos de Introducción/Glue.
- Costes, durabilidad métrica para chopas distintas de la Cool Plate SuperTack, grosores exactos (excepto Smooth PEI Bambu 0,5 mm), tolerancias dimensionales, firmware de detección de placa más allá de lo indicado, procedimiento de reemplazo del sheet y curvas de envejecimiento: no aparecen en estas fuentes.
- Raw no se ha modificado.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| Smooth PEI (Prusa/Bambu) | Live-Z / calibración de primera capa | espesores distintos al cambiar de chapa; recalibración o Steel sheet profiles |
| Textured PEI (Bambu) | autodesprendimiento | enfriar a ≤35 °C y flexionar la placa; grandes planos/tree supports no son aptos para flexión |
| pegamento Bambu | tipo de chapa | obligatorio en Engineering; opcional/reductor de adhesión en Textured (PETG); prohibido en Cool Plate SuperTack; obligatorio en Smooth salvo PLA |
| acetona | tipo de chapa | prohibida en Textured PEI Bambu; permitida 1–2 veces/mes en Smooth PEI Prusa |
| Cool Plate SuperTack | temperatura de cama | PLA 40 °C; PETG 55–60 °C (2.ª gen) o ~65 °C en máquinas con parámetros compartidos |
| Smooth PEI Prusa | envejecimiento/recuperación | adhesión baja tras 1–2 años; se revive con lija 600–1000; burbujas/abolladuras se recuperan por calor o cambio de lado |
| chapas Bambu gen1/gen2 | detección de placa | QR actualizado; incompatibilidad de reconocimiento en P2S/X2D con gen1 y en X1 con gen2 |
| zona de wipe | desgaste cosmético | normal y sin efecto en función en X1C/P1S/P1P/A1; A1 mini la zona está en el heatbed |
| superficie de PEI | contaminación (aceite) | principal causa de pérdida de adhesión; se diagnostica por flujo de agua en Textured PEI |
