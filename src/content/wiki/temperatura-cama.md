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
tags: [temperatura, cama, cama-calentada, adhesion, pla, chapas, slicer]
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

Las cinco filas caben a la vez. Lo verás en las dos tablas siguientes.

## Por qué hay un rango y no una cifra

Antes de las cifras, la razón por la que las tablas dan intervalos. OrcaSlicer lo dice en
una frase, y es la única de las seis fuentes de este artículo que lo dice: la mayoría de
los materiales tienen un rango óptimo bastante amplio para la temperatura de cama,
típicamente **±5 °C**
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

El PLA es la fila donde las tres cifras se separan de verdad, y es también la única donde
un fabricante publica una segunda tabla que explica por qué. En los demás materiales el
desacuerdo se parece a un rango más ancho o más estrecho según quién lo escriba, sin nada
detrás que lo justifique.

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
las capas inferiores se recalientan y reblandecen, y la base se deforma hacia fuera
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

Y aquí viene el dato que casi siempre damos por hecho sin saber de dónde sale: **el
disolvente que recupera la adhesión es el acetona, no el IPA.** La misma página de Prusa
lo dice. La PEI lisa «can lose its adhesive powers after a couple of hundred hours», y
entonces toca «wipe the surface thoroughly with acetone to restore the adhesion», «only
around once per month», porque «Extended use makes PEI surface brittle». Y con dos
prohibiciones explícitas al lado: «For the textured and the satin steel sheets, do not use
acetone at all!», y la que es de seguridad y no de chapa, «Also, do not use acetone before
printing with PETG»
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)).

La escala de esa página tiene tres escalones y el orden es lo que decide. El primero es
**alcohol isopropílico al 90 %**, que es «The best option when printing with ABS, PLA, and
many other materials is 90% Isopropyl alcohol»: si limpias a diario con PLA, eso es
exactamente lo que te pide.
El segundo sólo aparece cuando el IPA se queda corto —«If the adhesion seems to decrease
over time even when using IPA»— y es **jabón de platos con agua templada**, no caliente,
que disuelve «some oils and sugars that gather over time and that IPA does not remove». El
tercero es el acetona, y no se entra por la puerta de limpiar mucho: la fuente lo acota
con tres condiciones y hay que leerlas las tres. **«When you see models coming loose
regularly»**, que es cuando la pieza se suelta una y otra vez, no de vez en cuando. Y
**«This should only be used in the smooth PEI sheet and only around once per month»**,
que son las otras dos de golpe: sólo la PEI lisa —justo la chapa de la que habla el
pasaje anterior— y no más de una vez al mes, con un «Do not overuse acetone» al lado.
Limpiar a diario en PLA es el caso del primer escalón, y el acetona es el tercero: quien
sólo limpia y no ve piezas sueltas no tiene por qué pagar el coste del tercero.

Y hay un techo calculable. OrcaSlicer da la regla
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

> As a general guideline, you can use the glass transition temperature (Tg) of the
> material and subtract 5–10 °C to estimate a safe upper limit for bed temperature.

La justificación de por qué el techo es ese **no la tenemos**: la página enlaza a un
artículo que la explica, pero el destino del enlace no aparece en el texto que hemos
guardado, así que la regla se cita y el porqué no. La idea de que la temperatura de
transición es el punto en que el material pasa de rígido a blando la ponemos nosotros.

**Una advertencia sobre la fuente de Prusa.** La ficha del PLA también trae un 60 °C, y
es tentador leerlo como *no pases de 60 °C*. No es eso. Ahí el 60 °C se refiere **a la
pieza** —«it gets soft and deforms at temperatures over 60 °C»— y no a la cama. El mismo
número, dos afirmaciones distintas, y la segunda es la que importa: con la Textured PEI de
Bambu, 60 °C de cama está en mitad del rango que esa tabla da
([Prusa Research](https://help.prusa3d.com/article/pla_2062)).

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
fabricante.** Subir por la vía documentada de Prusa te saca del rango que publica Prusa antes
que del que publica otro fabricante: del 50–60 sales en el 61, y del 45–65 de Bambu, en
el 66. La segunda, en la misma página: PrusaSlicer configura las
temperaturas a partir del material seleccionado, así que normalmente no hay nada que
tocar en la impresora.

## El hilo de foro: qué pasó y qué no se puede concluir de él

Es el único antes y después que tenemos, y por eso merece escribirse con sus límites.

El **antes**. Alguien del foro de Prusa, en 2019, imprimiendo PLA que por lo demás se
pegaba bien, probó a bajar la cama y a añadir brim, y la pieza empeoró:

> I've tried adding the brim, and decreasing the bed temperature down to 50 and then 40
> degrees [...] the part warps so much along the long axis, that it splits off from brim
> and completely loses bed adhesion.

Con la habitación a unos 20 °C y sobre PEI lisa. La respuesta fueron tres cosas, no una:
bajar la altura de primera capa por los huecos que se veían en el brim, **lavar la cama
porque en la foto se veía sucia**, y esto:

> You should set your bed temperature higher and not lower (max 65°C).

Fíjate en la forma de la frase: un paréntesis y un «max 65°C», de un usuario. No es la
recomendación de Prusa, y el artículo no puede presentarla como si lo fuera.

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

Y el 65 °C, por separado, porque son dos cosas. La cifra está **corroborada por un
fabricante**: es el extremo alto del 45–65 ℃ que Bambu da para el PLA en Textured PEI,
Smooth PEI y Engineering Plate. Lo que sigue siendo sólo de un usuario es **la palabra
«techo»**: ningún fabricante de este lote pone un máximo al PLA, y Prusa se queda en
50–60 °C. La cifra es pública y el límite no.

## La cama también calienta la cámara

Bambu lo pone junto a su tabla
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

Del lado contrario, OrcaSlicer avisa de lo que pasa si la cámara se calienta de más:
«Low temperature Filaments like PLA can clog the nozzle if the chamber temperature is too
high.» Y para PLA, PETG, TPU, PVA y otros materiales de baja temperatura el control de
cámara «should be disabled (set to 0)»
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

Los dos dicen lo mismo con palabras distintas: **una cámara templada que es buena para el
ABS es mala para el PLA**. Si tienes la impresora cerrada y subes la cama por encima de
45 °C con PLA, estás cambiando una variable sin avisar de que hay otra. Eso lo desarrolla
[[enclosure-y-warping|Enclosure y warping]].

## La chapa también cambia la altura de la boquilla

No es un extra: es el mismo ajuste visto desde otro lado. La ficha del PLA de Prusa avisa
de que con chapa powder-coated hay que **bajar el live-Z**, porque el filamento tiene que
rellenar la textura —«you need to be careful and not move the nozzle too low, or you will
damage your sheet!»— y que la chapa lisa «works better for printing parts that have a
small contact area with the print surface»
([Prusa Research](https://help.prusa3d.com/article/pla_2062)).

Traducido: **cambiar de chapa cambia la cifra y también dónde tiene que estar la boquilla.**
Si subes la temperatura y además has cambiado la chapa, no sabes cuál de las dos cosas ha
arreglado lo que se ha arreglado.

## Por qué tu slicer puede no escribir este dato

`bedTemp` es un campo opcional, y hay cuatro razones distintas por las que no aparece.
Ninguna es un fallo del analizador.

**1 · El slicer pone la temperatura solo y no la escribe.** Es el caso normal. PrusaSlicer
la configura a partir del material seleccionado, así que muchos G-code no llevan nada en
la cabecera, o llevan el valor del perfil sin comentar. Si no hay número, no es que la
cama esté mal: es que nadie te dijo a qué iba.

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

**Dejar la tapa puesta al subir la cama con PLA.** Por encima de 45 °C, Bambu recomienda
abrir la puerta frontal o quitar la tapa de cristal, porque el calor de la cámara
reblandece el filamento dentro del extrusor. Y el riesgo no es sólo la pieza: con PLA y
cámara alta, OrcaSlicer avisa de que **se atasca la boquilla**.

**Subir la cama cuando lo que hay es una cama sucia.** En el mismo hilo, la primera
reacción a la foto fue lavarla. Los dos fabricantes lo dicen: Bambu recomienda limpiar
con jabón y agua caliente para quitar «dust, grease, and other residues that affect
adhesion» y avisa de que **no se limpie con acetona** porque daña la superficie; Prusa
recomienda alcohol isopropílico al 90 % como la mejor opción para ABS, PLA y muchos
otros, avisa de que los productos de grado cosmético o dérmico llevan hidratantes y
aceites que no valen, y añade que con agua templada y jabón se disuelven «some oils and
sugars that gather over time and that IPA does not remove». Sobre el disolvente fuerte
los dos no están de acuerdo: si sigues a Prusa, acetona sólo en la PEI lisa; si sigues a
Bambu, nada de acetona
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804),
[Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)).

**Limpiar con acetona donde no toca.** En la página de Prusa la recomendación viene
acotada por los tres lados: nada de acetona en la chapa satin ni en la texturizada, nada
de abusar de ella en la lisa porque el uso prolongado hace la superficie frágil, y agua
templada en lugar de agua caliente. Y al retirar una pieza de gran superficie hay que
hacerlo con espátula y sin forzar la chapa, «as the smooth PEI foil can tear».

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