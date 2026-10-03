---
titulo: Temperatura de cama
tema: temperatura-cama
fuentes:
  - wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md
  - wiki/raw/temperatura-cama-orcaslicer-wiki-material-temperatures.md
  - wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md
  - wiki/raw/temperatura-cama-prusa-kb-first-layer-issues.md
  - wiki/raw/temperatura-cama-prusa-kb-pla.md
cocinado: 2026-10-03
---

# Temperatura de cama

## Afirmaciones

### Las cifras, por material y por fabricante

Tres fabricantes dan cifras de cama, y para el PLA **no coinciden**. Eso no es un
problema de las fuentes: es el contenido del artículo.

- **Bambu Lab**, por filamento y pegamento: PLA y PLA-CF **35 – 65 °C**. PETG 60–80.
  ABS y ASA 90–100. TPU 30–45. PET-CF/GF 80–100. PC 100–120. PA y variantes 90–110.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Bambu Lab**, por filamento y **chapa**, que es una segunda tabla de la misma página y
  no la misma: con la **Cool Plate el PLA pide 35 – 45 ℃** y con la Engineering Plate,
  la Smooth PEI y la Textured PEI pide **45 – 65 ℃**. El TPU baja a 30–35 ℃ en
  Engineering Plate y sube a 35–45 ℃ en las otras dos.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Prusa Research**, en su tabla de materiales: PLA **50 – 60 °C**. PETG 70–90.
  ASA 90–110. ABS 95–110. PC 100–115. Flex 40–85. nGen 90. PVB 75.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Prusa Research**, en la ficha del PLA: «Recommended bed temperature: **60 °C**»,
  con «Heatbed: Satin or Smooth PEI sheet will provide the best adhesion».
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- **OrcaSlicer**, en su tabla de rangos estándar: PLA **50 – 60 °C** de cama, cámara
  ambiente. ABS 90–100, ASA 90–100, PC 100–120, TPU 40–60.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Por qué hay un rango y no una cifra

- «Most materials have a relatively broad optimal range for bed temperature
  (typically **+/-5°C**)». Es la frase que explica por qué las tablas dan intervalos, y
  no sale en ninguna de las otras fuentes.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Qué pasa si la cama está demasiado fría

- «If the bed temperature is too low, the filament may fail to adhere properly, leading
  to **warping, weak layer bonding, or complete detachment**. In severe cases, the
  printed part may dislodge entirely and stick to the nozzle or other printer
  components, potentially causing mechanical damage.»
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Qué pasa si está demasiado caliente

- «If the bed temperature is too high, the lower layers can overheat and soften
  excessively, resulting in deformation such as **elephant foot**».
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)
- El daño no es sólo en la pieza: «PETG, ABS, ASA, XT, and CPH filaments are an
  exception - the adhesion may be too strong, and you can damage your **Smooth PEI
  sheet**». Y: «IPA + PETG will cause the print to adhere very strongly to the sheet.
  Removing it could be extremely difficult.»
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- **Hay un techo, y se puede calcular**: «As a general guideline, you can use the glass
  transition temperature (Tg) of the material and **subtract 5–10 °C** to estimate a safe
  upper limit for bed temperature.»
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Cómo se sube, y cuánto

- «If you are experimenting with new materials that don't adhere well, you can try to
  **increase the heatbed temperature by 5-10 °C**. This way the plastic will stick a bit
  better.» Ojo: es un incremento **sobre el valor del perfil**, no el valor del
  fabricante.
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- La misma fuente dice que «PrusaSlicer will configure them correctly based on the
  selected material, so you don't need to adjust the temperatures manually on the
  printer itself».
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)

### La chapa cambia la cifra, y no es un detalle

- La tabla por chapa de Bambu: el PLA pide 35–45 ℃ en Cool Plate y 45–65 ℃ en las
  otras tres. El TPU sale «**Not recommended**» en Cool Plate, y el PETG igual.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- La chapa también cambia la **altura**: «With a powder-coated sheet, you should move
  your **live-Z lower**: Filament must fill in the sheet texture. However, you need to be
  careful and not move the nozzle too low, or you will damage your sheet!» Y la lisa
  «works better for printing parts that have a small contact area with the print
  surface».
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)

### Subir la cama tiene un segundo efecto: la cámara

- «Filaments with a softening temperature below 60 ℃ (e.g., **PLA**, PVA, TPU), when
  the heatbed is set above **45 ℃**: We recommend **opening the front door and/or removing
  the upper glass cover plate** to prevent excessive chamber heat from softening and
  deforming the filament.» El umbral sube a 60 ℃ y a 70 ℃ para el PETG.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- Del lado contrario: «**Low temperature Filaments like PLA can clog the nozzle if the
  chamber temperature is too high.**» Y para PLA, PETG, TPU, PVA y otros materiales de
  baja temperatura, el control de cámara «should be disabled (set to 0)».
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Por qué el campo puede venir vacío

- «PLA **does not require a heated bed**, can be printed fast and with low temperatures
  (melting point is somewhere around 175 °C)». Los 60 °C de la misma página son una
  recomendación, no una exigencia del material.
  — [Prusa Research](https://help.prusa3d.com/article/pla_2062)
- Bambu Studio avisa en el otro sentido: «if a heatbed temperature in the filament
  preset is set to **0 ℃**, the software will report that the filament is incompatible
  with slicing». O sea, un 0 en la cabecera es un valor puesto, no un campo ausente.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- Los nombres literales de las variables que **sí** salen en la fuente de OrcaSlicer:
  `supertack_plate_temp`, `cool_plate_temp`, `textured_cool_plate_temp`,
  `eng_plate_temp`, `hot_plate_temp`, `textured_plate_temp`, y la gemela
  `_initial_layer` de cada una.
  — [OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)

### Limpieza, porque es la otra mitad

- La mejor opción para ABS, PLA y muchos otros es **alcohol isopropílico al 90 %**; los
  productos de grado cosmético o dérmico llevan hidratantes y aceites que no valen.
  Con agua templada y jabón se disuelven «some oils and sugars that gather over time and
  that IPA does not remove». El acetono sólo en la PEI lisa, y «around once per month»,
  porque su uso prolongado «makes PEI surface brittle».
  — [Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)
- Bambu dice lo mismo con otras palabras y una advertencia más: «Regularly clean the
  plate surface with dish soap and hot water to remove dust, grease, and other residues
  that affect adhesion» y «**Do not clean the plate with acetone**, as it may damage the
  surface».
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor explica el matiz en
vez de elegir un número.

### 1. Para el mismo PLA hay tres cifras distintas: 35–65, 50–60 y 60

- Bambu: **35 – 65 °C**, y por chapa **35 – 45** en Cool Plate frente a **45 – 65** en
  las otras tres.
- Prusa (tabla de materiales): **50 – 60 °C**.
- Prusa (ficha del PLA): **60 °C**.
- OrcaSlicer: **50 – 60 °C**.

**El matiz.** No es que un fabricante se equivoque y los otros dos no. Los cuatro
números encajan con la tabla de Bambu por chapa: 50–60 está **dentro** de 45–65,
que es lo que pide la Textured PEI, y el 35 del Cool Plate está en el otro extremo de
la fila. Lo que cambia entre las cifras es **la chapa**, y Bambu es el único de los tres
que lo dice con una tabla.

Y hay un segundo matiz, que es el de las tolerancias: Bambu da un rango de 30 grados
para el PLA; Prusa da uno de 10. OrcaSlicer explica por qué existen los rangos —±5 °C
de margen típico alrededor del óptimo— pero eso justifica un intervalo pequeño, no
uno de treinta grados. **Nadie explica de dónde sale un rango tan ancho**, así que la
tabla de Bambu hay que presentarla como lo que es: el rango más fiel que ha
publicado un fabricante, y el único que separa por chapa.

La conclusión que el artículo tiene que escribir es que **«60 °C está bien» es una
respuesta correcta y también incompleta**: depende de qué chapa tengas encima.

### 2. El techo de 65 °C para PLA: un foro contra dos fabricantes

- Un usuario del foro de Prusa, con la cama a 50 °C y luego a 40 °C y la pieza curvada:
  la respuesta es «the bed goes higher, not lower, up to 65 °C as a maximum».
  — [foro de Prusa, en wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-of-pla.md](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- La tabla de Prusa para PLA dice 50–60 °C, y la ficha del PLA 60 °C.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)

**El matiz.** El 65 °C del foro está dentro del rango de Bambu para la Textured PEI, y
un poco por encima del de Prusa. **Ninguno de los dos se equivoca**: el hilo habla de
salir de un warping real, donde subir más de lo recomendado es defendible; la tabla
habla del valor de partida. Son dos preguntas distintas con dos respuestas distintas, y
el artículo tiene que mantenerlas separadas en vez de promediarlas.

### 3. El 60 °C como techo del PLA aparece dos veces y significa dos cosas

- La ficha del PLA: «It doesn't resist high temperatures (it **gets soft and deforms at
  temperatures over 60 °C**)». Ahí el 60 °C se refiere **a la pieza**, no a la cama.
- La tabla de Bambu: la Cool Plate pide 35–45 ℃ y las otras chapas 45–65 ℃, así que
  60 °C de cama está en mitad de rango.

**El matiz.** El mismo número aparece como techo de la pieza y como valor legítimo de
cama. **No se pueden citar como la misma afirmación.** El techo de la cama es el de la
temperatura de transición del material menos 5–10 °C, y esa regla la da OrcaSlicer, no
esta página. Quien las mezcle va a decir que el PLA no puede ir a 60 °C de cama, y la
tabla de Bambu dice justo lo contrario para tres de sus cuatro chapas.

## Sin respaldo

Una sola fuente, o ninguna. El redactor puede usarlas marcadas como lo que son.

- **El 65 °C de techo para PLA.** **[UNA SOLA FUENTE — foro, sin corroborar por
  fabricante]** Las tablas de Prusa lo sitúan en 50–60. Que el hilo se aparte no lo hace
  falso: lo hace usuario.
- **La explicación de por qué el techo es Tg menos 5–10 °C.** OrcaSlicer da la regla y
  enlaza a un artículo que explica el porqué, pero **el destino del enlace no aparece
  como URL legible en el HTML servido**. La regla se cita; la justificación, no.
- **Que `bed_temperature` sea la clave que escribe la familia Prusa/Orca.**
  **[DATO DEL PROYECTO, NO DE FUENTE — no debe citarse como si fuera de Prusa]**
  Está documentado en `src/services/types.ts` y es cierto, pero en estas cinco fuentes
  **no sale ese nombre a secas**. Lo que sale, literalmente, es
  `bed_temperature_initial_layer_single` en la página de Machine G-code de OrcaSlicer, y
  los nombres `hot_plate_temp` y `cool_plate_temp` en la sección Bed. Quien lo escriba
  tiene que marcarlo como dato interno del analizador.
- **Que Bambu exige pegamento para el PLA en Engineering Plate.** La tabla lo dice con
  dos palabras en la celda —«45 - 65 ℃ Glue Required»— pero **no explica por qué**, y no
  hay ninguna frase de la página que lo desarrolle. Es un dato, no un argumento.
- **Los 190 – 240 °C de boquilla para PLA de Bambu, con su ±10 °C.** Están en la
  segunda tabla de la misma página. Es de otro campo —el de hotend— y entra aquí sólo
  porque comparte documento. **[FUENTE PARA OTRO ARTÍCULO]**

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Las columnas de chapa de la tabla de materiales de Prusa.** No por dificultad sino
  por error: en varias filas los valores se desalinean respecto a su cabecera —en PETG,
  «with glue stick» cae bajo Smooth PEI pero «Cleaned with water» no queda claro si es
  Satin o Special PA Nylon—. Publicarlas mal atribuidas es peor que no publicarlas.
  Quien necesite la columna de chapa, que vaya a la ficha del material.
- **La fila de PEI de esa tabla.** Viene desalineada en el original: la celda de
  enclosure arrastra texto de las columnas de propiedades físicas. Se deja tal cual y
  fuera.
- **«Storage and Material Specifications» y «End Notes» de la página de Bambu.** Son
  secado, humedad y propiedades mecánicas. Ninguna de las tres cosas es temperatura de
  cama.
- **Las ocho columnas de diámetro de boquilla de Bambu.** Una tabla de cama con nueve
  columnas de las que ocho son de boquilla ocupa el artículo entero si no se
  recorta, y aquí no toca.
- **`https://wiki.bambulab.com/en/general/build-plate`.** Venía en la lista de
  candidatas verificadas y **responde 200 pero es un stub**: 551 caracteres de cuerpo y
  todo el texto es «Please get more information from the Wiki Introduction to the Build
  Plates». Una URL que responde 200 puede no servir para nada, que es un motivo más para
  abrir lo que se cita.
- **`mesh-bed-leveling_112163` y `bed-level-correction_2267`.** Las dos dan 200 y las
  dos son inútiles para este tema: cero apariciones de «bed temperature» y cero de «°C»
  en el texto servido. Son nivelación, no temperatura.
- **`https://www.orcaslicer.com/wiki/developer_reference/placeholders_variables.html`**
  → 404. Es donde estaría la lista de variables del G-code, y no existe.
- **`prusaslicer-custom-gcode_2115` y `g-code-variables_2256`** → 404. Con lo que no se
  ha encontrado documentación oficial que nombre `bed_temperature`.
- **`prusament.com/materials/petg` y `/asa`** → 404. Sólo existe `/materials/pla/`, que
  daría cama 40–60 °C con «Heated Bed Optional». **No se ha traído**: es una sexta fuente
  y el lote es de cinco, y además solapa casi todo con lo recogido. Queda anotada por si
  el redactor la necesita para una cifra de fabricante de filamento.
- **Reddit.** Devuelve la cáscara vacía, comprobado antes.
- **All3DP.** Carga pero su HTML no trae el texto del artículo, ni en `/amp/`.
- **Las erratas del original.** Se conservan en `first-layer-issues`. Corregirlas sería
  reescribir la fuente.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| temperatura de cama | [[warping-pla\|Warping en PLA]] | El warping es la consecuencia de una cama fría; y la contradicción 1 de aquel artículo se explica con la tabla de Bambu por chapa |
| temperatura de cama | [[adhesion-primera-capa\|Adhesión en la primera capa]] | La otra mitad del problema: la limpieza pesa tanto como la cifra |
| temperatura de cama | [[material\|Qué cambia entre materiales]] | Las cifras de esta página son por material; comparar PLA con PC es otro artículo |
| temperatura de cama | [[enclosure-y-warping\|Enclosure y warping]] | Subir la cama por encima de 45 °C con PLA obliga a abrir la tapa |
| temperatura de cama | [[slicer\|Qué slicer escribió esto]] | El perfil pone la temperatura solo, y el nombre de la clave decide si el dato llega |
| bedTemp | limpieza de la chapa | El aceite de la piel es la causa número uno de fallo de adhesión, y no se arregla con grados |
| bedTemp | live-Z | Cambiar de chapa cambia también la altura de la boquilla, no sólo la temperatura |
