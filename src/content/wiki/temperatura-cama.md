---
title: "Temperatura de cama: por qué hay tres cifras y cuál es la tuya"
description: "El PLA admite tres cifras de cama según quién lo diga. La diferencia no es un error: es la chapa."
slug: temperatura-cama
date: 2026-10-03
updated: 2026-10-03
sources:
  - https://wiki.bambulab.com/en/general/filament-guide-material-table
  - https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html
  - https://help.prusa3d.com/filament-material-guide
  - https://help.prusa3d.com/article/first-layer-issues_1804
  - https://help.prusa3d.com/article/pla_2062
  - https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/
tags: [temperatura, cama, cama-calentada, adhesion, pla, chapas, slicer, limpieza, petg]
autor: wiiki-3d
# Los campos del panel que este artículo explica. `bedTemp` es opcional en
# ProjectMetadata, así que este artículo lleva la sección de por qué puede faltar.
campo: [bedTemp]
---

# Temperatura de cama: por qué hay tres cifras y cuál es la tuya

Si el panel te dice que tu G-code lleva la cama a 60 °C, lo primero que hay que saber
es qué chapa tienes encima. Para el PLA hay tres cifras de cama publicadas por tres
fabricantes, y ninguna está equivocada: cada una describe una chapa.

| Fuente | Cama para PLA | Lo que añade |
|---|---|---|
| **Bambu Lab** | 35 – 65 °C | Publica dos tablas distintas: una por pegamento y otra por chapa |
| **Bambu Lab** | 35 – 45 ℃ en Cool Plate | Es la segunda tabla, y es la que explica las demás cifras |
| **Prusa Research** | 50 – 60 °C | Tabla de materiales, sin columna de chapa utilizable |
| **Prusa Research** | 60 °C | Ficha del PLA, con la chapa recomendada escrita al lado |
| **OrcaSlicer** | 50 – 60 °C | Tabla de once materiales, con boquilla y cámara |

Las cinco filas caben a la vez ([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table),
[Prusa Research](https://help.prusa3d.com/filament-material-guide),
[OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).
Antes de copiar un número de cualquiera de ellas hay que leer una advertencia que
OrcaSlicer escribe justo antes de su tabla, y que es la única de las tres
fuentes que la dice: «Actual optimal temperatures may vary based on **specific filament
brands and printer models**. Always refer to the filament manufacturer’s recommendations
and calibrations for best results.» Las cifras que siguen son de catálogo, no de tu
bobina concreta.

## Por qué hay un rango y no una cifra

OrcaSlicer explica en una frase por qué las tablas dan intervalos, y es la única de las
seis fuentes de este artículo que lo dice: la mayoría de los materiales tienen un rango
óptimo bastante amplio para la temperatura de cama, típicamente **±5 °C**
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

Eso justifica un intervalo pequeño. No justifica el rango de treinta grados que da
Bambu para el PLA, y eso hay que decirlo: **nadie explica de dónde sale un rango tan
ancho**. Lo que sí hace Bambu, y ningún otro, es separar por chapa.

## La tabla que separa por chapa

Bambu publica dos tablas de cama en la misma página, y no son la misma
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)).
La primera es por filamento y pegamento: PLA y PLA-CF, **35 – 65 °C**. La segunda es por
filamento y **chapa**, y ahí está todo el asunto:

| Material | Cool Plate | Engineering Plate | Smooth / Textured PEI |
|---|---|---|---|
| PLA | **35 – 45 ℃** | 45 – 65 ℃ | 45 – 65 ℃ |
| PLA-CF | 45 – 65 ℃ | 45 – 65 ℃ | 45 – 65 ℃ |
| TPU | No recomendado | 30 – 35 ℃ | 35 – 45 ℃ |
| PETG | No recomendado | 60 – 80 ℃ | 60 – 80 ℃ |

Dos detalles de esa tabla que desaparecen si sólo se mira la primera. El **PLA-CF pide
45–65 ℃ ya en la Cool Plate**, mientras que el PLA puro pide 35–45: el relleno cambia la
fila. Y el **TPU sale «Not recommended» en Cool Plate**, con la celda escrita así y sin
explicar por qué.

En la columna de Engineering Plate el PLA viene con la condición pegada a la cifra:
«45 - 65 ℃ Glue Required». La página **no explica por qué**, y añade un matiz que sí
está: «The old Engineering Plates are not recommended for printing PLA». Eso es un dato,
no un argumento, y merece ser tratado como tal.

**Y la lista de chapas es más larga que la tabla.** En la misma frase de la ficha del
PLA, Prusa escribe que «PLA is printable **not only on PEI surface, but also on glass,
Kapton tape, or using a glue stick**». O sea, el 60 °C de la cabecera es el valor para
PEI: fuera de esa superficie la cifra no se dice en ninguna parte de esa página, y quien
la aplique a cristal o a Kapton se la está inventando. Esa misma ficha da por
recomendada una chapa concreta —«Heatbed: Satin or Smooth PEI sheet will provide the
best adhesion»— sin decir a qué temperatura con ella
([Prusa Research](https://help.prusa3d.com/article/pla_2062)).

Ahora vuelve a las otras cifras. Los 50–60 °C de Prusa y de OrcaSlicer **están dentro
del 45–65** que pide la Textured PEI. El 60 °C de la ficha del PLA también. Y el 35 °C
del Cool Plate está en el otro extremo de la misma fila.

Es decir: **los cuatro números dicen lo mismo sobre un material y dicen cosas distintas
sobre una chapa.** Cuando alguien escribe *sube la cama a 65 °C* sin decir con qué chapa,
la afirmación no es falsa: es incompleta.

## Las mismas cifras, otros materiales

El desacuerdo del PLA no es el único. Al poner los tres fabricantes en fila se ve dónde
hay desacuerdo y dónde no
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table),
[Prusa Research](https://help.prusa3d.com/filament-material-guide),
[OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

| Material | Bambu Lab | Prusa Research | OrcaSlicer |
|---|---|---|---|
| PLA | 35 – 65 °C | 50 – 60 °C | 50 – 60 °C |
| PETG | 60 – 80 °C | 70 – 90 °C | no sale en su tabla |
| ABS | 90 – 100 °C | 95 – 110 °C | 90 – 100 °C |
| ASA | 90 – 100 °C | 90 – 110 °C | 90 – 100 °C |
| PC | 100 – 120 °C | 100 – 115 °C | 100 – 120 °C |
| TPU | 30 – 45 °C | Flex 40 – 85 °C | 40 – 60 °C |

La columna de Bambu es su tabla por pegamento, no la de chapa, y la última fila mezcla
materiales: Prusa no lista TPU, lista Flex.

Y hay un hueco, que no es un desacuerdo sino una ausencia: **la tabla de OrcaSlicer no
tiene fila de PETG**. Sus once materiales son PLA, ABS, ASA, Nylon 6, Nylon 12, TPU, PC,
PC-ABS, HIPS, PP y Acetal, y los dos fabricantes de al lado sí lo listan. Por eso la
celda de esa fila está vacía y no con un número. Cuando tu material no aparezca en una
tabla, la primera comprobación es si falta la fila, no que nadie la haya medido
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

Cuatro cosas se leen aquí. Para **ABS y ASA, Bambu y OrcaSlicer dicen exactamente lo
mismo** —los dos, 90–100— y Prusa se aparta por arriba: no hay misterio, hay tres
versiones de un rango bueno. En **PC el acuerdo de las dos columnas sigue siendo exacto**,
100–120 en las dos, pero Prusa se aparta al revés: su 100–115 se queda cinco grados por
debajo del techo de los otros, y es el único de los tres materiales donde Prusa es más
conservadora que Bambu. Para el **PETG, Prusa sube los dos extremos diez grados** —
70–90 donde el otro, Bambu, da 60–80—, y las ventanas sólo se tocan en 70–80. Y el
**TPU es la fila rareja**, con OrcaSlicer en 40–60 y Bambu en 30–45.

## Las filas que casi nadie mira

Las dos tablas tienen muchas más filas de las que se citan, y son las que sirven cuando
el material no es PLA, PETG ni ABS. Estas son todas las que no están en la tabla de
arriba
([Prusa Research](https://help.prusa3d.com/filament-material-guide),
[OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

| De la guía de Prusa | Cama | De la tabla de OrcaSlicer | Cama |
|---|---|---|---|
| PETG HT | 110 °C | Nylon 6 | 90 – 110 °C |
| Glow in the dark | 85 °C | Nylon 12 | 90 – 110 °C |
| CPE | 90 – 110 °C | PC-ABS | 95 – 110 °C |
| PVA / BVOH | 60 °C | HIPS | 90 – 110 °C |
| HIPS | 100 – 110 °C | PP | 80 – 105 °C |
| PP | 70 – 100 °C | Acetal (POM) | 100 – 130 °C |
| nGen | 90 °C | | |
| PA (Nylon) | 70 – 115 °C | | |
| Composite materials | 40 – 120 °C | | |
| Wood / metal filled | 60 – 100 °C | | |
| PVB | 75 °C | | |

Tres advertencias al leerlas, y la primera es la que más veces se malinterpreta.

**«Composite materials, 40 – 120 °C» no es un material.** Es una fila que **agrega**
composites distintos, y no se puede leer como «el filamento con fibra va a 120 °C» sin
más: el 120 es el extremo alto de una fila agregada, y por eso no dice nada de un
filamento concreto. La fila de al lado tampoco lo salva, porque Prusa la publica con
nombre propio e intervalo propio —**Wood / metal filled, 60 – 100 °C**—, y ese otro
material tampoco llega a 120.

**El 130 °C del Acetal es la cifra de cama más alta de las tres fuentes**, por encima
del 120 que Bambu da para el PC, el PA o el PET-CF. Y las cifras del PLA y del ABS que
se dan más arriba en este artículo no te sirven si tu material es Acetal.

Y hay una fila más en la guía de Prusa que **no sale en la tabla de arriba**: la del PEI, a
150 °C. Viene desalineada en el original —la celda de enclosure arrastra texto de las
columnas de propiedades físicas—, así que el número está en la fuente pero no se puede
leer con confianza. Quien necesite el dato del PEI, que vaya a la ficha del material.

Un detalle que aparece al cruzar las dos páginas de Bambu: **para el PA, el mismo
fabricante da dos cifras distintas**, 90–110 °C en la tabla de filamento y pegamento y
100–120 °C en las tres chapas de la segunda tabla, y la página no lo explica. Prusa, en su
fila de PA, da 70–115 °C: el rango más ancho de las tres casas y treinta grados más bajo
que el 100 con el que arranca el de Bambu en sus chapas. Ninguna de las tres explica de
dónde sale una ventana tan ancha, y eso vuelve a dejar el mismo sitio donde lo dejaba el
PLA.

## El PETG: tres cifras, y una de ellas es de otro material

El PETG es el material donde las tres fuentes se separan más, y donde el error más caro
está en una fila que se lee por encima.

Bambu da **60 – 80 °C**, y es coherente consigo mismo: sale lo mismo en su tabla de
filamento y pegamento y en las tres chapas de la segunda. Prusa da **70 – 90 °C**. Los
dos rangos se solapan entre 70 y 80 y no en ningún otro sitio, así que una chapa a 65 °C
está dentro del de Bambu y **fuera** del de Prusa, y una a 85 °C al revés. Es el mismo
caso que el del PLA —fabricantes distintos, materiales de familia parecidos— y se
escribe como contraste, no promediando.

Y luego está la fila que hay que mirar dos veces. En la misma tabla de Prusa, **una fila
por debajo de la del PETG**, pone: «PETG HT | No, No, No | 270 °C, **110 °C**». No es el
PETG de la fila de arriba: es una variante aparte, con su propio nombre y su propia
boquilla. Es exactamente el error que hace que alguien escriba «Prusa lleva el PETG
hasta 110 °C», y **no lo dice nadie en este lote**. El 110 es de PETG HT.

Lo que sí sale de las tres cifras del PETG es más útil que promediarlas: es el material
en el que **la fuente que manda es la del fabricante de tu bobina**, y ninguna de las
tres se parece a las otras dos en los dos extremos.

## Qué pasa si la cama está demasiado fría

OrcaSlicer lo describe con una progresión
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

> If the bed temperature is too low, the filament may fail to adhere properly, leading
> to warping, weak layer bonding, or complete detachment. In severe cases, the printed
> part may dislodge entirely and stick to the nozzle or other printer components,
> potentially causing mechanical damage.

Es decir, en orden: la pieza se despega, la unión entre capas se debilita y, en el caso
malo, la pieza sale despedida y se queda pegada a la boquilla. Ese último paso ya no es
un warping: es un daño mecánico.

La razón de fondo es la que cuenta [[warping-pla|Warping en PLA]]: el material se contrae
al enfriarse, y si la primera capa no se agarra a la cama, la contracción la levanta en
vez de repartirse. Por eso el warping y la temperatura de cama son el mismo problema
medido desde dos sitios.

## Qué pasa si está demasiado caliente

Aquí los efectos van en dos direcciones, y la segunda se olvida.

**En la pieza**, OrcaSlicer lo llama *elephant foot*: si la cama está demasiado caliente,
las capas inferiores se recalientan y reblandecen, y la base se deforma
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

**En la chapa**, y esto es lo que no sale en la mayoría de artículos. Prusa avisa de que
con PETG, ABS, ASA y materiales parecidos la adhesión puede ser **demasiado fuerte** y
puedes dañar la PEI lisa, y el remedio que propone en la misma frase es un agente
separador:

> PETG, ABS, ASA, XT, and CPH filaments are an exception - the adhesion may be too
> strong, and you can damage your Smooth PEI sheet. We recommend using a separating
> agent (e.g. a glue stick).

([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804))

Es decir: subir la cama para que se pegue bien puede ser la forma de que se pegue
*demasiado*, y entonces el problema deja de ser la pieza y pasa a ser la chapa.

Y hay un techo calculable. OrcaSlicer da la regla
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

> As a general guideline, you can use the glass transition temperature (Tg) of the
> material and subtract 5–10 °C to estimate a safe upper limit for bed temperature.

La justificación de por qué el techo es ese **no la tenemos**: la página enlaza a un
artículo que la explica, pero el destino del enlace no aparece en el texto que hemos
guardado, así que la regla se cita y el porqué no.

**Una advertencia sobre la fuente de Prusa.** La ficha del PLA también trae un 60 °C, y
es tentador leerlo como *no pases de 60 °C*. No es eso. Ahí el 60 °C se refiere **a la
pieza** —«it gets soft and deforms at temperatures over 60 °C»— y no a la cama. El mismo
número, dos afirmaciones distintas, y la segunda es la que importa: con la Textured PEI
de Bambu, 60 °C de cama está en mitad del rango que esa tabla da
([Prusa Research](https://help.prusa3d.com/article/pla_2062)).

## Las tres cosas sin las que la cama no basta

OrcaSlicer escribe, en su sección Bed, la frase que desarma la búsqueda de la cifra exacta
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

> In general, following the manufacturer’s recommendations, maintaining a clean bed (free
> from oils or fingerprints), ensuring a stable chamber temperature, and having a
> properly leveled bed will produce reliable results.

Tres cosas, y **ninguna es un número**: una cama sin aceite ni huellas, una temperatura de
cámara estable y una cama nivelada. Las tres se pueden tener con la temperatura que
tenga, y se pueden perder con la temperatura que sea.

La limpieza —una de las tres— tiene una página entera en la Knowledge Base de Prusa, y
empieza por una frase que explica por qué el aceite de la piel es el problema número uno:
«If you don't touch the print surface with your hands or dirty tools, then you don't have
to clean it before every print» ([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)).

Y el orden de los disolventes importa, porque cada uno quita una cosa distinta. El
primero es **alcohol isopropílico al 90 %**: «The best option when printing with ABS,
PLA, and many other materials is 90% Isopropyl alcohol», con el aviso de que las
soluciones de menor porcentaje «may contain unsuitable chemicals and oils» y de que un
producto dermal o cosmético «may contain additives like moisturizers and oils which are
not suitable». Y el IPA **no quita el aceite de los dedos**: la misma página reserva el
jabón para «some oils and sugars that gather over time and **that IPA does not
remove**» ([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)).
Quien sólo limpia con IPA tiene la capa de grasa de los dedos exactamente donde estaba.
El nivelado y esa capa de grasa son las dos cosas que el panel no te enseña.

## Limpieza: tres disolventes y tres contraindicaciones

El orden que acabamos de describir es una escala, y la escala de disolventes de Prusa
tiene tres escalones —el cuarto epígrafe de limpieza de esa página es el pegamento, que
no es un disolvente—. El tercero tiene condiciones, y hay que leerlas todas.

**Jabón de platos.** La frase entera trae las advertencias de golpe: «you can
clean the steel sheet with a few drops of dish soap and **warm water (not hot!)**. This
should **not be done often**, and **do not submerge the sheet completely in hot water**
[...] Make sure to use **only dish soap** and **dry the sheet well before using it**»
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)). Tres cosas
que se hacen mal sin querer: echarle agua demasiado caliente, dejarla en remojo, y
aclarar con un detergente de los de casa en lugar de jabón de platos.

Y aquí los dos fabricantes no dicen lo mismo. Bambu, para la limpieza de su placa, escribe
«Regularly clean the plate surface with dish soap and **hot water** to remove dust, grease,
and other residues that affect adhesion», y avisa con una advertencia **más fuerte** que
la de Prusa: «**Do not clean the plate with acetone**, as it may damage the surface»
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)).

O sea: para la misma operación, un fabricante dice «warm water (not hot!)» y el otro
«hot water», y Prusa además pone un paréntesis para que no se pueda leer de otra manera.
**No es un error tipográfico**: Bambu enlaza a su propia guía
de limpieza de la Textured PEI, que es donde acaba quien quiera el dato exacto de su
chapa, y esa guía no está entre las fuentes de este artículo. Lo que sí podemos decir es
que **agua tibia y jabón** es la lectura que no se equivoca ninguna de las dos, y que
meter la chapa en agua caliente por seguir a Bambu es exactamente lo que Prusa prohíbe por
escrito.

**Acetona.** Es el tercer escalón y no se entra por la puerta de limpiar mucho. La razón
que da Prusa es que «PEI can lose its adhesive powers after a couple of hundred hours», y
el gatillo es concreto: «**When you see models coming loose regularly**, wipe the surface
thoroughly with acetone to restore the adhesion». Las condiciones son tres, y las tres
juntas: «This should only be used in the **smooth PEI** sheet and only **around once per
month**», con un «Do not overuse acetone» al lado y el motivo —«Extended use makes PEI
surface brittle»—. La cuarta es una prohibición que se cuelga de la anterior: «Also, do
not use acetone before printing with PETG». Y para las otras dos chapas no hay
condiciones, hay una prohibición entera: «For the textured and the satin steel sheets,
do not use acetone at all!»
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)).

**Y la prohibición no acaba en la primera frase, y la segunda es la que cuesta dinero.**
Literal, en la misma línea y a continuación: «Other chemical solvents, like **Nail polish
remover or brake-cleaner, can also contain acetone (acetates)**».

Esto cambia el problema. No es el bote que pone «acetona» en la etiqueta: es cualquier
disolvente que **la lleve dentro sin decirlo**. Quien tenga un quitaesmalte y una chapa
texturizada no está usando acetona —está usando quitaesmalte— y la prohibición no le
llega, con el mismo daño. Y las dos advertencias van juntas en la misma línea de la
fuente: quédate con la primera y te llevas la mitad útil del aviso.

Y que Prusa prohíba el acetona en la chapa no significa que no lo recomiende en ninguna
parte. La misma Knowledge Base, en la ficha del PLA, lo da como pegamento: «Some of the
PLA filaments can be also partially dissolved and glued with **acetone** (or you can
simply glue it with superglue)» ([Prusa Research](https://help.prusa3d.com/article/pla_2062)).
**No es una contradicción**: la prohibición es sobre la *chapa*, y esto es sobre la
*pieza*. Pero las dos frases van a aparecer el mismo día en la misma búsqueda, y quien lea
la segunda sin la primera concluye que Prusa ha banido el acetona de la impresión 3D.

## Antes de soltar la pieza: hay que esperar a que se enfríe

De la sección **«Removing Prints»** de la página de Bambu hay tres instrucciones, y son
la otra mitad de la adhesión: una cama bien puesta no sirve de nada si la pieza se arranca
en caliente
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)).

**Esperar**, literal: «After printing, wait a few minutes until the plate and model have
fully cooled before removing the print. This makes removal easier and helps **avoid
scratching the plate or damaging the bottom of the model**». El motivo que da la fuente
está en la misma frase: rayar la chapa, o **dañar la base de la pieza**.

**Cómo se suelta**, una vez fría: «remove the build plate and **gently flex it** to release
the model **and the purge tower (if any)**». Y ese último detalle —**la torre de purga sale
con la pieza**, no se separa antes— es pequeño y es el que evita que quien busque su pieza
corte la base al intentar separarla.

Prusa no dice lo de esperar, y eso hay que decirlo porque es fácil dar por hecho que sí.
Lo que dice es lo otro, el gesto y el riesgo, y coincide: «When removing prints with a
large surface area, you may have to assist the process using a spatula. Be gentle when
flexing the sheet and removing the print as **the smooth PEI foil can tear**»
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)). Dos
fabricantes, el mismo gesto —flexionar con cuidado— y el mismo riesgo sobre la chapa. En
otra sección de esa misma página, la que abre con «How to prepare your print surface»,
está la regla de no tocar la superficie con las manos, y en el hilo de foro de Prusa otro
usuario la escribe como norma de taller: «Handle the bed only by the edges».

## La cama también calienta la cámara

Subir la cama no cambia una variable: cambia dos. Bambu lo pone junto a su tabla
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)):

> Filaments with a softening temperature below 60 ℃ (e.g., PLA, PVA, TPU), when the
> heatbed is set above 45 ℃: We recommend opening the front door and/or removing the
> upper glass cover plate to prevent excessive chamber heat from softening and
> deforming the filament.

Es decir: **con PLA, PVA o TPU y cama por encima de 45 °C, la recomendación es abrir la
puerta frontal o quitar la tapa de cristal.**

Para el PETG la misma página da **dos umbrales distintos y no explica por qué**. En la
prosa, el segundo caso es «Filaments with a softening temperature of 60–80 ℃ (e.g., PETG),
when the heatbed is set above 60 ℃». En la última columna de la tabla de chapas, las filas
de PETG dicen «If bed > 70 ℃, Recommended». Para el PLA los dos sitios coinciden en 45 °C;
para el PETG no.

**No es una progresión.** No hay un «luego»: son dos formulaciones de la misma decisión,
en dos formatos de la misma página, y la fuente no dice cuál mandar. Si tienes que
decidir con PETG, la lectura prudente es la más conservadora, **70 °C**, y conviene saber
que la otra mitad de la página bajaría el listón a 60.

El principio detrás de esos umbrales lo escribe otra casa, y es general: «It is important
to monitor the chamber temperature to ensure that it does not exceed **the filament’s
deformation temperature**» ([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).
Bambu publica el umbral ya calculado por material —45 °C para el PLA— y esta frase es la
regla que los produce. No hay que elegir entre las dos: la una es el principio y la otra
la tabla.

Del lado contrario, OrcaSlicer avisa de lo que pasa si la cámara se calienta de más:
«Low temperature Filaments like PLA can clog the nozzle if the chamber temperature is too
high.» Y para PLA, PETG, TPU, PVA y otros materiales de baja temperatura el control de
cámara «should be disabled (set to 0)»
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

Los dos dicen lo mismo con palabras distintas: **una cámara templada que es buena para el
ABS es mala para el PLA**. Y hay dos consecuencias más que la tabla no enseña. La
primera es que, para los materiales que se contraen mucho, **la cámara es el factor y no
la cama**: «For challenging prints involving materials with **high shrinkage (e.g.,
nylons or polycarbonate)** [...] chamber temperature becomes a major factor in preventing
detachment». La segunda es lo que cuesta esa cámara caliente: «a higher chamber
temperature will **reduce the efficiency of air filtration for ABS and ASA**». Filtra
peor quien más la necesita.

Si tienes la impresora cerrada y subes la cama por encima de 45 °C con PLA, estás
cambiando una variable sin avisar de que hay otra. Eso lo desarrolla
[[enclosure-y-warping|Enclosure y warping]].

## La primera capa tiene su propia temperatura

Es una decisión aparte, y las fuentes la separan de la temperatura de la cama. En la
sección Bed de la wiki de OrcaSlicer, después de la lista de variables, la instrucción
es: «Set the bed temperature for the selected material for **First Layer and Other
Layers** for each Bed type», y la razón para tratarlas aparte está en la frase
siguiente: «Using a higher temperature for **the first layer** can help improve adhesion
to the build surface but be cautious of potential deformations like elephant foot»
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

O sea: **subir sólo la primera capa es un ajuste distinto de subir la cama entera**, y el
mismo OrcaSlicer que avisa del *elephant foot* en la cama lo avisa en la primera capa. Eso
es lo que explican las doce variables del apartado de abajo: **dos por chapa**, no una.

## Cómo se sube, cuánto y cuándo

Prusa da el incremento, y es más pequeño de lo que se dice por ahí
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)):

> If you are experimenting with new materials that don't adhere well, you can try to
> increase the heatbed temperature by 5-10 °C. This way the plastic will stick a bit
> better.

Dos cosas que hay que leer ahí. La primera: **son 5 a 10 grados, y el incremento va
sobre el valor del perfil**, no hasta el techo de lo que publica el fabricante. Sumado a
los 60 °C que da Prusa para el PLA, el incremento da 65 o 70. El **65 es exactamente el
extremo alto** del 45–65 que da Bambu para tres de sus chapas, y el **70 se sale de
ahí**. Los dos valores quedan por encima del 50–60 que esa misma casa da para el mismo
material, y el segundo por encima también del 45–65 de Bambu: **la recomendación de
Prusa, aplicada sobre el 60 °C de Prusa, acaba fuera del rango que publica otro
fabricante.** Subir por la vía documentada de Prusa te saca del rango que publica Prusa
antes que del que publica otro fabricante: del 50–60 sales en el 61, y del 45–65 de
Bambu, en el 66. La segunda, en la misma página: PrusaSlicer configura las
temperaturas a partir del material seleccionado, así que normalmente no hay nada que
tocar en la impresora.

## El hilo de foro: qué pasó y qué no se puede concluir de él

Es el único antes y después que tenemos, y por eso merece escribirse con sus límites.

El **antes**. Zakalawe, en el foro de Prusa el 27 de junio de 2019, imprimiendo PLA que por
lo demás se pegaba bien, probó a bajar la cama y a añadir brim, y la pieza empeoró:

> I've tried adding the brim, and decreasing the bed temperature down to 50 and then 40
> degrees [...] the part warps so much along the long axis, that it splits off from brim
> and completely loses bed adhesion.

Con la habitación a unos 20 °C y sobre PEI lisa. La respuesta fueron tres cosas, no una,
y las dio **Lichtjaeger** en el mismo hilo: bajar la altura de primera capa por los huecos
que se veían en el brim —«From the gaps in your brim, I can say you can go a bit lower
with your first layer height»—, **lavar la cama porque en la foto se veía sucia** —«the
bed in your picture looks dirty. Try to wash it with soap water and wipe it with acetone
(once a month)»— y esto:

> You should set your bed temperature higher and not lower (max 65°C).

Fíjate en la forma de la frase: un paréntesis y un «max 65°C», y de un usuario del foro.
No es la recomendación de Prusa, y el artículo no puede presentarla como si lo fuera.

El **después**:

> Thanks, I increased the bed temperature and chamfered the edges of the shape in Fusion,
> that seemed to make a big difference.

Y aquí es donde no se puede leer más de lo que dice. **Subió dos cosas a la vez** —cama y
chaflán—, así que el hilo no aísla la cama. **No dice a qué temperatura subió**, de modo
que el 65 °C no llega a aparecer como algo probado. Y lo dice **con «seemed to»**, que
es una impresión del autor y no una medición
([Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).

Lo único que el hilo deja firme es que **bajar la cama a 50 y luego a 40 °C no funcionó**:
la pieza se separó del brim y perdió la adhesión del todo. Eso sí se puede escribir.

**Y lo que también probó y falló, que es del mismo tipo de dato.** Del primer post: «Google
suggested a brim, lower bed temp, and **slower print speed, none of which helped so far**».
El «so far» es suyo y hay que conservarlo: es un fallo declarado por quien lo probó, no
una opinión. Lo que sí funcionó, en el mismo post y con su precio: «Using a **three-layer
raft did help**, but that made for a nasty surface finish on the part, and seems like
rather overkill to fix this». Un raft que arregla el despegue arruinando la superficie:
es el mismo patrón que el +5–10 °C, cambiar una cosa por otra.

**Un cuarto post del hilo, de otro usuario, habla de limpieza y no de temperatura**, y
monta una rutina completa: «By the looks of the bed, **soap and hot water** is your best
choice... but you might want to do an alcohol scrub first to get the old PLA residue
off», «**Alcohol rinse: every few prints**», «Once in a while, an alcohol rinse is helpful
to remove PLA residue. **It does not remove finger oils well**», «**Hot Water wash:
often, as needed**» y «**Handle the bed only by the edges**»
([foro de Prusa, post del 28/06/2019](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).

Dos de esas tienen respaldo de fábrica, y una es la que explica el diagnóstico de la cama
sucia. «It does not remove finger oils well» es exactamente lo que dice la Knowledge Base
al recomendar jabón para «some oils and sugars that gather over time and that IPA does not
remove». Y «no toques la superficie con las manos» es la primera frase de la primera
sección de esa misma página. **La frecuencia —«every few prints»— es sólo del foro y no
la corrobora nadie.**

Y ojo con una cosa: este usuario también dice **hot water**, que es lo que dice Bambu y lo
que Prusa prohíbe por escrito con un paréntesis. En este punto el lote no está dividido
en dos: está dividido en tres, y sólo uno de los tres pone el aviso.

El 65 °C, por separado, porque son dos cosas. La cifra está **corroborada por un
fabricante**: es el extremo alto del 45–65 ℃ que Bambu da para el PLA en Textured PEI,
Smooth PEI y Engineering Plate. Lo que sigue siendo sólo de un usuario es **la palabra
«techo»**: ningún fabricante de este lote pone un máximo al PLA, y Prusa se queda en
50–60 °C. La cifra es pública y el límite no.

## Por qué tu slicer puede no escribir este dato

`bedTemp` es un campo opcional, y hay cuatro razones distintas por las que no aparece.
Ninguna es un fallo del analizador.

**1 · El slicer pone la temperatura solo.** Es el caso normal. PrusaSlicer la configura
a partir del material seleccionado, así que no hay nada que tocar en la impresora. Lo
que puede faltar es el dato en el archivo, y eso ya no lo explica ninguna de las seis
fuentes: qué clave escribe el G-code y dónde la busca el analizador es cosa nuestra, y
está declarado más abajo.

**2 · El material no la necesita.** La ficha del PLA de Prusa dice, en la misma página en
la que recomienda 60 °C, que «PLA **does not require a heated bed**, can be printed fast
and with low temperatures» ([Prusa Research](https://help.prusa3d.com/article/pla_2062)).
Es decir: los 60 °C son una recomendación, no una exigencia del material. Un slicer
configurado para no calentar la cama en PLA está haciendo algo razonable.

**3 · El nombre de la clave depende del slicer.** Este es el motivo real de que el campo
sea opcional. La sección Bed de la wiki de OrcaSlicer nombra, literalmente, seis variables
de cama: `supertack_plate_temp`, `cool_plate_temp`, `textured_cool_plate_temp`,
`eng_plate_temp`, `hot_plate_temp` y `textured_plate_temp`, cada una con su gemela
`_initial_layer`
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).
Son doce, y las doce son las dos temperaturas por chapa del apartado anterior: la de la
primera capa y la del resto van en variables distintas.

> **Lo que aquí no te vamos a contar.** El analizador de esta aplicación mira una clave
> más: `bed_temperature`, que es la que escribe la familia Prusa/Orca. **Ninguna de las
> seis fuentes de este artículo nombra esa clave a secas**; sale documentada en
> `src/services/types.ts`. Es dato interno nuestro y no lo vamos a disfrazar de fuente.
> El nombre `bed_temperature_initial_layer_single` aparece citado en las notas del
> recolector, pero no en ningún fichero de fuente, así que tampoco lo damos por
> verificado.

**4 · Un 0 en la cabecera es un valor puesto, no un hueco.** Bambu Studio avisa en el otro
sentido: si la temperatura de cama del perfil es 0 °C, el programa declara el filamento
incompatible con el laminado
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)). Es
decir: hay slicers que **escriben un 0 para decir que no usan cama**, y eso se confunde
fácil con *el campo no está*. Son cosas distintas: un 0 es una decisión, un hueco es que
nadie preguntó.

## Qué puede salir mal

**Bajar la cama para intentar arreglar un warping.** Está documentado en el hilo de
Prusa: 50 °C, después 40 °C, con brim, y la pieza se separaba del brim y perdía la
adhesión. La respuesta fue al revés, subirla. Si tu caso se parece, es lo primero que
hay que descartar.

**Copiar el 65 °C a cualquier chapa.** Es el extremo alto del rango que Bambu da para tres
de sus chapas. En la Cool Plate el PLA pide 35–45 ℃: el mismo número se sale por el otro
extremo de la fila.

**Leer el 60 °C de la ficha del PLA como un tope de cama.** Ahí el 60 °C es la
temperatura a la que la pieza se reblandece. El tope de la cama es otra regla, la de Tg
menos 5–10 °C, y sale de otra fuente.

**Llevar el 110 °C del PETG al PETG.** Es la fila de PETG HT, que es otro material con
otro nombre y su propia boquilla. El PETG de Prusa es 70–90 °C, y ahí el 110 no aparece.

**Dejar la tapa puesta al subir la cama con PLA.** Por encima de 45 °C, Bambu recomienda
abrir la puerta frontal o quitar la tapa de cristal, porque el calor de la cámara
reblandece el filamento dentro del extrusor. Y el riesgo no es sólo la pieza: con PLA y
cámara alta, OrcaSlicer avisa de que **se atasca la boquilla**.

**Subir la cama cuando lo que hay es una cama sucia.** En el mismo hilo, la primera
reacción a la foto fue lavarla. Y hay algo que las cifras no arreglan: el alcohol
isopropílico, que es el primer escalón de limpieza, **no quita el aceite de los dedos**,
y por eso Prusa reserva el jabón para lo que el IPA no llega a quitar.

**Limpiar con acetona donde no toca.** En la página de Prusa la recomendación viene
acotada por los tres lados: nada de acetona en la chapa satin ni en la texturizada, nada
de abusar de ella en la lisa porque el uso prolongado hace la superficie frágil, y nada
de acetona antes de imprimir con PETG.

**Usar quitaesmalte o limpiaparabrisas como si no fueran acetona.** Llevan acetona
dentro y la etiqueta no lo dice, así que la prohibición de la chapa texturizada no te
llega. Si el bote no pone «acetona», no es que no la lleve.

**Meter la chapa en agua caliente.** Un fabricante lo recomienda y el otro lo prohíbe por
escrito, con paréntesis. El agua tibia con jabón no te hace perder nada de lo que
buscas.

**Arrancar la pieza en caliente, o tirar de ella.** La instrucción de Bambu es esperar a
que la chapa y la pieza enfríen, y el motivo que da son dos: rayar la chapa y **dañar la
base de la pieza**. Prusa coincide en el gesto —flexionar con cuidado, espátula si hace
falta— y avisa de que la lámina de PEI lisa se puede romper.

**Cortar la base de la pieza para separarla de la torre de purga.** No hay nada que
separar: la instrucción de Bambu es soltar las dos cosas juntas, y quien busca su pieza y
empieza a cortar por la base está cortando la pieza.

**Confundir un 0 con un campo vacío.** Ya está explicado arriba: uno es una decisión del
slicer y el otro es que nadie preguntó. El panel los trata igual y no es cuestión de la
vista: desde fuera son el mismo hueco.

**Cambiar la chapa y subir la temperatura a ciegas.** La chapa mueve las dos cosas a la
vez, la temperatura y el live-Z, y si cambias las dos no sabes cuál ha arreglado qué.

## Lo que este artículo no te va a resolver

**Un precio por kilo.** La temperatura de cama no cuesta dinero por sí sola. Lo que
cuesta es el filamento que se gasta, y eso es otro artículo
([[material|qué cambia entre materiales]]), y su coste, otro más.

**Los voladizos y los soportes.** El panel avisa de si la pieza los necesita, y eso tiene
su propia historia con el ángulo de la arista. Está en su sitio, no aquí.

**Por qué tu G-code concreto se separó en capas.** Eso no es temperatura de cama, es
[[separaciones-entre-capas|separaciones entre capas]], que es un fallo distinto con causa
distinta. Si la base está plana y las capas se sueltan por dentro, esta página no te va
a servir: mira aquélla.

## Si te interesa

- [[warping-pla|Warping en PLA]] — por qué se levantan las esquinas, que es la
  consecuencia de todo esto.
- [[adhesion-primera-capa|Adhesión en la primera capa]] — la otra mitad del problema,
  que no se arregla con grados.
- [[enclosure-y-warping|Enclosure y warping]] — por qué subir la cama te obliga a abrir
  la tapa.
- [[material|Qué cambia entre materiales]] — las cifras de esta página son por material.

---

*Fuentes en el `frontmatter` de este artículo. Todas consultadas el 2026-10-03.*