---
title: "Warping en PLA: por qué se levantan las esquinas y qué cambiar"
description: "El PLA es el material rígido que menos se deforma, así que si sus esquinas suben el problema es de ajuste. Y la cama no tiene una cifra: tiene seis, y todas son ciertas."
slug: warping-pla
date: 2026-10-03
updated: 2026-10-03
sources:
  - https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing
  - https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping
  - https://wiki.bambulab.com/en/general/filament-guide-material-table
  - https://help.prusa3d.com/article/warping_2011
  - https://help.prusa3d.com/filament-material-guide
  - https://help.prusa3d.com/article/pla_2062
  - https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html
  - https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/
  - https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/
tags: [warping, pla, adhesion, temperatura, primera-capa, chapas]
autor: wiiki-3d
# Los campos del panel que este artículo explica. Con esto, cuando el panel dice
# "Riesgo de warping", el artículo que explica ese número está a un clic.
# `warpingRisk` y `riskLevel` son obligatorios en `JevClassification`, así que este
# artículo no lleva la sección de por qué puede faltar el dato.
campo: [warpingRisk, riskLevel]
---

# Warping en PLA: por qué se levantan las esquinas y qué cambiar

Si a tu PLA se le levantan las esquinas, lo primero que hay que tener claro es que
**PLA es el material rígido que menos se deforma**. Bambu Lab ordena los materiales
por riesgo de warping, de mayor a menor —**PC → PA-CF → PA → ABS → ASA → PETG →
PLA**— y el PLA es el último de los siete
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

Eso cambia el planteamiento. Si a un PLA se le levantan las esquinas, el problema
casi nunca es el filamento: es cómo está configurado. Y los ajustes que hay que
tocar son pocos, y en un orden que no es el que sugiere el sentido común.

## Por qué ocurre

El warping es contracción térmica. El filamento sale de la boquilla fundido —Prusa
da **185–235 °C** de boquilla y **50–60 °C** de cama para el PLA, sin pedir
enclosure, drybox ni boquilla endurecida— y llega a la pieza ya frío. Ese salto es
un choque térmico, y lo que se busca es minimizarlo
([Prusa, tabla de materiales](https://help.prusa3d.com/filament-material-guide),
[Prusa Research](https://help.prusa3d.com/article/warping_2011)). Durante el
enfriamiento el plástico se contrae.

El problema es **dónde** se contrae. Los bordes exteriores de la pieza se enfrían
antes que el centro, y esa diferencia genera una tensión que tira de las esquinas
hacia arriba
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
En el foro de Prusa describen el mismo mecanismo con otras palabras: la causa
inmediata son las contracciones de las tiradas largas de filamento
([Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).

Mientras la pieza está pegada a la cama, la adhesión aguanta esa tensión. Cuando la
adhesión no llega, la esquina se levanta.

Y hay tres cosas que deciden cuánto se contrae, y ninguna de ellas es el material.

**La temperatura ambiente.** Por debajo de **20 °C** el warping aparece incluso con
PLA y PETG, que son los materiales más indulgentes
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Y una corriente de aire basta para enfriarte un lado más que otro: una ventana
abierta, un aire acondicionado o un ventilador de mesa
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing),
[Prusa Research](https://help.prusa3d.com/article/warping_2011)).

**El tamaño.** El warping aparece más en piezas grandes
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Si a tu PLA sólo se le levantan las piezas grandes, el tamaño no es la variable que
estás tocando.

**La geometría.** Las esquinas vivas de 90° concentran más tensión que las
redondeadas. En el hilo de Prusa el consejo es textual: *«Sharp angles can be more
prone to warping»*, y lo que propone es añadir un **redondeo (filleted edge) en el
eje Z**, que aumenta el contacto con la cama
([Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).

Y el chaflán de arista tiene una trampa, porque se hizo en un sitio del que casi
nadie mira. Quien cerró el caso de 2019 —**Zakalawe (@zakalawe)**, el mismo que
abrió el hilo— lo dice literal: *«I increased the bed temperature and chamfered the
edges of the shape in Fusion, that seemed to make a big difference»*
([Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).
**El chaflán se hizo en el modelo, en Fusion 360, antes de exportar; no en el
laminador**, que además sólo trae chaflán de esquina y no de arista. Quien intente
replicarlo allí no puede. Y fíjate en el «seemed to»: lo dice como sospecha, sin
ninguna medición detrás ni una segunda impresión de control.

Los radios de 3 mm son otra historia, y conviene no pegarlos a la anterior. En
«Warping at corners», un hilo de 2024 —cinco años y otro autor después—, quien
abrió el tema cuenta: *«I tried to round off the 90°-corners with 3mm radii but the
crinkles remained»*, más perímetros extra, sin efecto
([Elias Spors, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).
**Ningún caso prueba que los radios fallen y el chaflán funcione**, porque no están
en la misma conversación ni en la misma pieza. Lo que sí es razonable esperar —y
aquí lo decimos como inferencia nuestra, no como dato de ninguna fuente— es que
chaflán y radio ataquen la misma esquina por el mismo mecanismo, y por eso den
resultados parecidos.

## Antes de tocar nada: comprueba que es warping

Este es el fallo que más se confunde con otro, y hay un criterio concreto. En el
hilo donde alguien subió las fotos de sus esquinas arrugadas, quien responde lo
pone así: el warping real *«it bows upwards from the bed»*, eso comprime las capas
y suele dejar *«a rough surface on the top»*
([Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).

| | Warping real | Separaciones entre capas |
|---|---|---|
| Forma de la pieza | **Arquea hacia arriba** desde la cama | Se queda plana en la base |
| Superficie superior | **Rugosa**, porque las capas quedan comprimidas | Normal |
| Qué lo produce | Contracción térmica | Cambio de firmware o de PrusaSlicer |

La columna de la derecha es un fallo **parecido pero distinto**, y quien lo
describió fue más lejos: *«Those pics just look like the under extrusion and gaps at
the seams caused by the recent firmware/prusa slicer changes»*. Es un problema que
afecta también a PLA que antes no daba problemas, y se reporta en el
[issue 11914 de PrusaSlicer](https://github.com/prusa3d/PrusaSlicer/issues/11914)
([Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).

Si las capas se sueltan por dentro y la base está plana, no sigas leyendo este
artículo: es otro problema, y está en [[separaciones-entre-capas|separaciones entre
capas]]. Warping y separación se parecen en la foto y no se arreglan con lo mismo.

## Qué cambiar, y en qué orden

El orden importa, y no es el que sugiere el sentido común. Bambu estima que los tres
primeros puntos resuelven alrededor del **80 %** de los fallos de warping y adhesión,
y lo dice con su propia fórmula: *«These three steps resolve approximately 80 % of
all warping and adhesion failures»*
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

### 1. Limpia la chapa con agua templada y jabón

Según Bambu, el aceite de la piel es la causa número uno de fallo de adhesión —*«skin
oils are the #1 cause»*— y es el primer punto de su lista: *«Wash with warm water
and dish soap. Rinse thoroughly and air-dry»*. Enjuaga, deja secar al aire, y a
partir de ahí no toques la superficie con las manos desnudas
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

### 2. Apaga el ventilador durante las 3 primeras capas

Es el ajuste que Bambu señala como el más importante para el warping, y lo dice en
ese orden: *«One of the most important setting to change when it comes to warping is
the No cooling for the first X layers option»*, con las tres primeras capas sin
enfriamiento en los filamentos habituales
([Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)).
Sin cooling en esas tres capas la primera capa se enfría más despacio y se pega
mejor.

Y aquí hay una contradicción que parece real y no lo es. Bambu habla de **las
primeras capas** y del ventilador **auxiliar**, que propone bajar al 40–50 %. Prusa
habla del ventilador **general** durante el resto de la pieza, y dice que PLA necesita
mucha refrigeración: si las esquinas se levantan, conviene subirlo, y si lo que se
curva son piezas pequeñas o voladizos, encajarlo al 10–20 % incluso en materiales que
no lo necesitan
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

Hablan de tramos distintos del mismo ajuste. Las dos avisan del mismo límite, que es
lo importante: demasiado ventilador levanta la pieza entera y **baja la adhesión
entre capas**. Cuando eso ocurre, la respuesta no es bajar el ventilador sino subir la
temperatura de boquilla para recuperar la unión
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

### 3. Sube la temperatura de cama, a la cifra que toca para tu chapa

La dirección no tiene discusión: hay que **subir**. En el hilo donde está documentado
el ciclo completo de un warping, la respuesta es literal: *«You should set your bed
temperature higher and not lower (max 65°C)»*. Bambu lo cuantifica en **+5 a +10 °C**
([Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/),
[Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

El número sí tiene discusión, y lo que sigue es la parte de este artículo que no
queremos resumir en una línea. Estas son todas las cifras de cama que hemos
encontrado para el PLA, con la tabla de la que sale cada una:

| De dónde sale la cifra | Cama para el PLA |
|---|---|
| Bambu, tabla por filamento y pegamento | **35 – 65 °C** |
| Bambu, tabla por chapa, Cool Plate | **35 – 45 ℃** |
| Bambu, tabla por chapa, Engineering Plate, Smooth PEI y Textured PEI | **45 – 65 ℃** |
| Prusa, tabla de materiales | **50 – 60 °C** |
| Prusa, ficha del PLA | **60 °C** |
| OrcaSlicer, tabla de rangos estándar | **50 – 60 °C** |

([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table),
[Prusa, tabla de materiales](https://help.prusa3d.com/filament-material-guide),
[Prusa, ficha del PLA](https://help.prusa3d.com/article/pla_2062),
[OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html))

**La variable que faltaba era la chapa.** El 35 °C y el 55–65 °C que da la página de
warping de Bambu no son dos afirmaciones que se pelean: son los dos extremos de la
misma fila de la tabla por chapa, leídos por columnas distintas. Los 35 °C son para la
Cool Plate; los 65 °C, para la Textured PEI
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
La diferencia entre chapas para el mismo filamento es de veinte grados.

Ese orden importa cuando eliges el número, y va en las dos direcciones: con la Cool
Plate, seguir el 65 °C es quemar la placa; con la Textured PEI, quedarse en 35 °C es
tener las esquinas levantadas por lo que las levanta.

Los 50–60 °C de Prusa y los 50–60 °C de OrcaSlicer no se contradicen con nada de lo
anterior: **están dentro** del 45–65 que pide la Textured PEI, y el 60 °C de la ficha
del PLA también. Son el mismo rango leído con distinta anchura. Lo que cambia entre
fabricantes es el margen: Bambu da treinta grados para el PLA y Prusa da diez
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table),
[Prusa, tabla de materiales](https://help.prusa3d.com/filament-material-guide)). Los
rangos de Prusa no llevan tolerancia; Bambu sí pone ±10 °C en la tabla de boquilla. La
diferencia de notación es de la fuente, no del material.

Y un detalle que parece menor y no lo es: la Knowledge Base de warping de Prusa **no
da ninguna cifra de cama para PLA**. Habla de Live Adjust Z y de brim
([Prusa Research](https://help.prusa3d.com/article/warping_2011)). La cifra de Prusa
sale de su tabla de materiales, que es otro documento, y por eso mucha gente la busca
donde no está.

Hay otro efecto de la chapa que no es de temperatura. La Textured PEI **baja la boquilla
0,04 mm automáticamente al nivelar**, para asegurar la primera capa. Si laminaste para la
Cool Plate y imprimes en la Textured PEI, ese descenso no se aplica, la boquilla queda
demasiado alta y la primera capa no se pega
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Son los dos síntomas del mismo error de una línea.

Y sobre el 65 °C del hilo, con su matiz. La cifra **sí** está respaldada por un
fabricante: es el extremo alto del rango que Bambu da para el PLA en Textured PEI. Lo
que no tiene respaldo es la palabra «techo». De las fuentes que hemos revisado,
**ningún fabricante dice que no se pueda pasar de ahí**, y la tabla de Prusa para PLA
se queda en 50–60 °C
([Prusa, tabla de materiales](https://help.prusa3d.com/filament-material-guide)). Así
que 65 °C es el valor con el que se resolvió un caso real, y ese caso venía ya roto; no
es un límite que puedas escribir en el perfil y olvidar.

Lo que la subida de la cama le hace a la cámara es otro artículo, y está en
[[temperatura-cama|Temperatura de cama]].

### 4. Añade un brim, o mejor, brim ears

Un brim de **8 a 10 mm** de ancho aumenta la superficie en contacto con la cama
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Si sólo se levantan dos esquinas, Bambu propone algo mejor: **brim ears** dirigidos
únicamente a las esquinas que suben.

Y ojo al brim, porque también es un diagnóstico. En el mismo hilo donde está
documentado el ciclo completo de un warping, la pieza se curvaba tanto que **se
separaba del brim**, y los huecos que dejaba se leyeron como la señal de que la
primera capa iba demasiado alta: *«From the gaps in your brim, I can say you can go a
bit lower with your first layer height»*. Un brim que se despega del cuerpo de la
pieza no está perdiendo su función: está diciendo otra cosa
([Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).

### 5. Cambia el relleno a Gyroid por debajo del 25 %

Grid y Triangle crean tensión lineal interna, y el Gyroid se contrae por igual en todas
las direcciones. Bambu lo pone como opción por debajo del **25 %** de densidad
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

Sobre qué relleno va primero hay opiniones y lo dejamos dicho: en el foro de Prusa se
prefiere **cubic**, y detrás gyroid y 3D Honeycomb
([Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)),
y ahí mismo se propone abrir huecos decorativos para romper las tiradas largas. Las dos
fuentes coinciden en que Grid es mala idea y en que Gyroid mejora. Gyroid tiene
respaldo oficial; cubic, 3D Honeycomb y los huecos decorativos tienen **una sola
fuente, un foro**, así que si ya los has probado y te funcionan, sigue con ellos. Eso
sí, para empezar, Gyroid.

## El enclosure: por qué las dos fuentes parecen contradecirse

Es la contradicción más desconcertante de este tema, y tiene una explicación.

Prusa dice que **imprimir PLA dentro de un enclosure puede ser mala idea**: *«Printing
PLA or PETG in an enclosure might not be a good idea»*, porque estos materiales
necesitan mucha refrigeración, y con la temperatura ambiente alta es más difícil
conseguirla ([Prusa Research](https://help.prusa3d.com/article/warping_2011)). Es
cierto.

Y Bambu dice que el ambiente estable **importa**, y que por debajo de 20 °C hay warping
incluso con PLA; en una impresora de estructura abierta toca compensar con **+10 °C**
de cama
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
También es cierto.

No son recomendaciones opuestas: un enclosure hace dos cosas que se estorban, mantener
el aire estable y caliente, y limitar el enfriamiento. Separadas las dos funciones, el
enclosure **ayuda** con el ambiente y **estorba** al enfriamiento del PLA. Con PLA gana
el segundo efecto, y por eso Bambu da una instrucción concreta en su tabla de
materiales: para filamentos con temperatura de reblandecimiento por debajo de 60 ℃
—PLA, PVA, TPU— y cama por encima de **45 ℃**, *«opening the front door and/or
removing the upper glass cover plate to prevent excessive chamber heat from softening
and deforming the filament»*
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)).
Es decir: subir la cama es también una decisión sobre la tapa. Con PLA y cama por
encima de 45 °C, la puerta abierta y la tapa fuera; ese es el trato que hace Bambu.

## Qué puede salir mal

**Bajar la temperatura de cama «para espantar las esquinas».** Es un error documentado
con nombre y apellidos: **Zakalawe (@zakalawe)** abrió ese hilo probando cama a
**50 °C** y luego a **40 °C**, con brim, y la pieza se curvaba tanto que se separaba
del brim. La respuesta fue justo la contraria
([Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).
Bajar la cama es lo que se probó primero en ese hilo, y no funcionó.

**Buscar el chaflán de arista en el laminador.** El chaflán que resolvió aquel caso se
hizo en Fusion 360, sobre el modelo, antes de exportar. El laminador sólo trae chaflán
de esquina, así que la operación que buscas directamente no existe ahí.

**Encadenar dos hilos distintos como si fueran una comparación.** Los radios de 3 mm que
no quitaron el arrugado y el chaflán que sí parece haberlo quitado están en
conversaciones diferentes, con cinco años de diferencia, y en piezas diferentes. De ahí
no sale que el radio falle y el chaflán funcione; salen dos casos, y ninguno midió nada.

**Copiar la cifra de cama de otro fabricante.** La diferencia entre chapas es de veinte
grados y el error va en las dos direcciones: el número de la Textured PEI en una Cool
Plate quema la placa, y el de la Cool Plate en una Textured PEI deja las esquinas
levantadas.

**Escribir 65 °C como si fuera un techo.** La cifra es buena —es el extremo alto del
rango de Bambu para la Textured PEI—, pero presentarla como un límite que ningún
fabricante pone no tiene respaldo. Si tu perfil lleva 65 °C, sabes que estás en el
borde del rango, no que se acabó.

**Elegir mal la chapa en el slicer.** La Textured PEI baja la boquilla 0,04 mm al
nivelar. Si el perfil está configurado para la Cool Plate y la máquina tiene la PEI
texturizada, ese descenso no se aplica y la primera capa sale demasiado alta. El
síntoma no dice nada del material.

**Subir el ventilador para arreglarlo.** Cuando ya sube la pieza entera, el efecto
secundario es peor: la adhesión entre capas baja
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

**Confundir un problema de humedad con warping.** Si al imprimir suenan chasquidos o
la superficie sale rugosa, con burbujas o filamentos sueltos, el filamento ha absorbido
humedad del aire. Se seca y se reimprime; cambiar la temperatura no lo arregla
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

**Darte por bueno con un warping pequeño.** Bambu avisa de que *«warping is so small
that it's hard to notice»* y aun así deja defectos visibles en las paredes laterales y
en las capas superiores
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Una esquina que sube un milímetro y se nota al pasar el dedo es un warping, no un
detalle de acabado.

## Lo que este artículo no te va a resolver

**Los voladizos.** Un voladizo que se curva hacia abajo por enfriamiento es otro
problema, con su propio ajuste: Prusa recomienda un 10–20 % de ventilador incluso en
materiales que no lo necesitan
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

**El colapso de piezas altas y finas.** Es otra falla —vibración, no contracción—. Bambu
menciona bajar velocidad y aceleración y añadir soportes para las piezas altas, y Prusa
lo dice para su Prusament PC-Blend, pero **ninguna de las dos fuentes lo aplica al
warping de esquinas en PLA**, así que aquí no te lo vamos a recomendar.

**Una cifra de coste.** No vamos a entrar en coste por gramo: hasta aquí sólo han
entrado temperaturas, porcentajes y milímetros.

**Si tu problema es el material.** En un caso concreto se descartó que fuera
filamento, y hay que decirlo como lo que es: un caso, no una regla general
([Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).
PLA sigue siendo el material que menos se deforma. Si has hecho los cinco pasos y sigue
igual, el problema probablemente esté en otro sitio.

## Si te interesa

- [[temperatura-cama|Temperatura de cama]] — las seis cifras de la tabla, y por qué
  existen todas a la vez.
- [[enclosure-y-warping|Enclosure y warping]] — es donde las fuentes se contradicen de
  forma aparente, y el matiz es todo el contenido.
- [[separaciones-entre-capas|Separaciones entre capas]] — el fallo que se confunde con
  warping, y que tiene otra causa y otra solución.
- [[adhesion-primera-capa|Adhesión en la primera capa]] — que es la mitad de este
  artículo, pero merece su propia página.

---

*Fuentes en el `frontmatter` de este artículo. Todas consultadas el 2026-10-03.*
