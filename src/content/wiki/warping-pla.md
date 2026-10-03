---
title: "Warping en PLA: por qué se levantan las esquinas y qué cambiar"
slug: warping-pla
date: 2026-10-03
updated: 2026-10-03
sources:
  - https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing
  - https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping
  - https://help.prusa3d.com/article/warping_2011
  - https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/
  - https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/
tags: [warping, pla, adhesion, temperatura, primera-capa]
autor: wiiki-3d
# Los campos del panel que este artículo explica. Con esto, cuando el panel dice
# "Riesgo de warping", el artículo que explica ese número está a un clic.
campo: [warpingRisk, riskLevel]
---

# Warping en PLA: por qué se levantan las esquinas y qué cambiar

Si tu PLA se levanta por las esquinas, lo primero que hay que tener claro es que
**PLA es el material rígido que menos se deforma**. Bambu Lab ordena los materiales
por riesgo de contracción, de mayor a menor, y PLA está el último: por debajo sólo
queda el PETG, que está por encima
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

Eso cambia el planteamiento. Si a PLA se le levantan las esquinas, el problema no
es el filamento: es cómo está configurado. Y los ajustes que hay que tocar son pocos.

## Por qué ocurre

El warping es contracción térmica, y ocurre en tres pasos.

El filamento sale de la boquilla a unos 200 °C y llega a la pieza ya frío. Ese
salto de temperatura es un choque térmico, y lo que buscamos es minimizarlo
([Prusa Research](https://help.prusa3d.com/article/warping_2011)). Durante el
enfriamiento el plástico se contrae.

El problema es **dónde** se contrae. Los bordes exteriores de la pieza se enfrían
antes que el centro, y esa diferencia genera una tensión que tira de las esquinas
hacia arriba
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
En el foro de Prusa describen el mismo mecanismo con otras palabras: la causa
inmediata son las contracciones de las tiradas largas de filamento
([Diem](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).

Mientras la pieza está pegada a la cama, la adhesión aguanta esa tensión. Cuando la
adhesión no llega, la esquina se levanta.

Hay tres factores que decidir cuánto se contrae, y ninguno es el material:

**La temperatura ambiente.** Por debajo de **20 °C** el warping aparece incluso con
PLA y PETG, que son los materiales más indulgentes
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Y una corriente de aire basta para enfriarte un lado más que otro: una ventana
abierta, un aire acondicionado o un ventilador de mesa. Prusa lo dice en los mismos
términos: una ventana abierta o un aire acondicionado cerca de la impresora
aumentan la aparición de warps
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

**El tamaño y el relleno.** Las piezas grandes se deforman más, y un relleno denso
con patrón lineal acumula más tensión interna. Bambu pone el ejemplo: 60 % de
relleno, cuando el valor por defecto es 15 %
([Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)).

**La geometría.** Las esquinas vivas de 90° concentran la tensión. Chaflanar o
redondear el borde reparte la contracción en lugar de concentrarla.

## Antes de tocar nada: comprueba que es warping

Aquí está el fallo que más nos ha costado el diagnóstico a nosotros mismos, y Bambu lo
advierte explícitamente: un warping pequeño es fácil de confundir con un problema
de flujo
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

Hay un criterio claro, y viene del foro de Prusa
([Neophyl](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)):

| | Warping real | Separaciones entre capas |
|---|---|---|
| Forma de la pieza | **Arquea hacia arriba** desde la cama | Se queda plana en la base |
| Superficie superior | **Rugosa** | Normal |
| Causa | Contracción térmica | Cambio de firmware o de PrusaSlicer |

Ese segundo caso nos pasó: en un hilo del foro, unas juntas abiertas en PLA que
antes imprimía bien resultaron ser un efecto de los cambios recientes de
PrusaSlicer, reportado en el
[issue 11914](https://github.com/prusa3d/PrusaSlicer/issues/11914). Es un problema
distinto, con otra solución, y en ese hilo el diagnóstico fue que **no** era
filamento ni temperatura
([Diem](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).

Si las capas se separan y la base está plana, no sigas leyendo este artículo. Es otro
problema, y está en [[separaciones-entre-capas|separaciones entre capas]]. Cambia la
velocidad de impresión a un valor bajo y vuelve a imprimir: si el efecto desaparece,
es velocidad.

## Qué cambiar, y en qué orden

El orden importa, y no es el que sugiere el sentido común. Bambu estima que los
tres primeros puntos resuelven alrededor del **80 %** de los fallos de warping y
adhesión
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

### 1. Limpia la chapa con agua templada y jabón

No es un paso menor: según Bambu, el aceite de la piel es la causa número uno de
fallo de adhesión
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Lava, enjuaga y deja secar al aire. Y a partir de ahí, no toques la superficie con
las manos desnudas.

### 2. Apaga el ventilador durante las 3 primeras capas

Es el ajuste que Bambu señala como el más importante para el warping
([Bambu Lab](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)).
Sin enfriamiento en las tres primeras capas, la primera capa se enfría más despacio
y se pega mejor.

Y aquí está la contradicción que más despista, porque parece que las fuentes se
discrepan. No se discrepan: hablan de tramos distintos.

Bambu habla de **las primeras capas**, y también del ventilador **auxiliar**, que
propone bajar al 40-50 %. Prusa habla del ventilador **general** durante el resto
de la pieza, y dice que PLA necesita mucha refrigeración, así que si las esquinas se
levantan conviene **subirlo**
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

Las dos tienen razón. Lo que no hay que hacer es pasarse, y las dos avisan del
mismo techo: demasiado ventilador levanta la pieza entera y **baja la adhesión
entre capas**. Si te pasa eso, la respuesta no es bajar el ventilador sino subir la
temperatura de boquilla para recuperar la unión entre capas
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

### 3. Sube la temperatura de cama, a la cifra que toca para tu chapa

Aquí el consejo widespread es correcto en la dirección y está mal en el número, y
queremos ser claros sobre eso.

Las dos fuentes coinciden en que hay que **subir**, y una de ellas es explícita:
"la cama va más alta, no más baja"
([Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).
Bambu lo cuantifica: **+5 a +10 °C**.

Pero el objetivo depende de la chapa, no del material. En la gama de Bambu, la
Cool Plate para PLA es de **35 °C** y la Textured PEI es de **55 a 65 °C**
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Son 20 grados de diferencia para el mismo filamento. Si lees "sube a 65 °C" y
tienes la Cool Plate, estás quemando la placa.

Hay un detalle técnico detrás de esa diferencia, y explica por qué importa elegir
la chapa bien en el laminador: la Textured PEI tiene superficie granular, así que
la impresora baja la boquilla **0,04 mm** después de nivelar para asegurar la
primera capa. Si laminas para la Cool Plate pero imprimes en la Textured PEI, ese
desnivel no se aplica, la boquilla queda demasiado alta y la primera capa no se
pega
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

Un detalle sobre la fuente de Prusa: su Knowledge Base habla de Live Adjust Z y de
brim para el warping, pero **no da una cifra de temperatura de cama para PLA**
([Prusa Research](https://help.prusa3d.com/article/warping_2011)). Existe una tabla
de materiales que la pondría, pero el texto sale aplastado y no la hemos podido
leer confiabilidad, así que no la usamos.

### 4. Añade un brim, o mejor, brim ears

Un brim de **8 a 10 mm** de ancho aumenta la superficie en contacto con la cama
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
Si sólo se levantan dos esquinas, Bambu propone algo mejor: **brim ears**
dirigidos, con el brim en modo pintado y la herramienta de ears apuntando
únicamente a las esquinas que suben.

Un brim no es una solución universal. Si con brim la pieza se separa de la cama a
lo largo del eje largo, el brim no es el problema: es que la primera capa se contrajo
demasiado
([Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).

### 5. Cambia el relleno a Gyroid por debajo del 25 %

Grid y Triangle crean tensión lineal interna porque las líneas se cruzan. Gyroid se
contrae por igual en todas las direcciones
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

Sobre qué relleno va primero hay opiniones divergentes, y lo dejamos dicho: en el foro de
Prusa se prefiere **cubic**, y después gyroid y 3D Honeycomb
([Diem](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)).
Los dos coinciden en que Grid es mala idea y en que Gyroid mejora. Gyroid tiene
respaldo oficial; cubic no lo tiene en este lote, así que si has probado cubic y te
funciona, sigue con él.

## El enclosure: por qué las dos fuentes parecen contradecirse

Es la contradicción más desconcertante de este tema, y tiene una explicación.

Prusa dice que **imprimir PLA dentro de un enclosure puede ser mala idea**, porque
PLA necesita mucha refrigeración y con temperatura ambiente alta es más difícil
conseguirla
([Prusa Research](https://help.prusa3d.com/article/warping_2011)). Es cierto.

Y Bambu dice que el ambiente estable **importa**, y que por debajo de 20 °C hay
warping incluso con PLA; en una impresora de estructura abierta toca compensar con
con +10 °C de cama
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).
También es cierto.

No son recomendaciones opuestas. Un enclosure hace dos cosas que se estorban
mutuamente: mantiene el aire estable y caliente, y limita el enfriamiento. Con PLA
gana el primer efecto si **dejas fuera la tapa**. Quien resolvió su caso en el
foro de Prusa lo hizo con un enclosure **sin tapa**, con espuma de embalaje pegada
([Zakalawe](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).

## Qué puede salir mal

**Bajar la temperatura de cama "para espantar las esquinas".** Es un error
documentado con nombre y apellidos: quien abrió aquel hilo probó
cama a 50 °C y luego a 40 °C, con brim, y la pieza se curvaba tanto que se separaba
del brim. La respuesta fue justo la contraria, subir hasta 65 °C como techo
([Lichtjaeger y Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).
En ese mismo hilo, la actualización final: cama subida y aristas chaflanadas en el
laminador, resultado **"zero warping"**, comprobado también sobre una placa de
vidrio.

**Copiar la cifra de cama de otro fabricante.** La diferencia entre chapas es de 20
grados, y el error va en las dos direcciones.

**Redondear las esquinas y esperar que baste.** En el hilo de las esquinas,
alguien ya probó radios de 3 mm en ángulos de 90° y el arrugado siguió igual, con
independencia de solape de relleno al 35 % y relleno al 20 %. Chaflanar la arista
**en el laminador** fue lo que funcionó.

**Subir el ventilador para arreglarlo.** Cuando ya sube la pieza entera, el efecto
secundario es peor: la adhesión entre capas baja, y en casos extremos la pieza se
agrieta
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

**Confundir un problema de humedad con warping.** Si al imprimir suenan chasquidos
o la superficie sale rugosa, con burbujas o filamentos sueltos, el filamento ha
absorbido humedad. Se seca y se reimprime; cambiar la temperatura no lo arregla
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

**Limpiar y volver a ensuciar.** Limpiar bien es el paso 1, y no tocar la superficie
con las manos después es la mitad del trabajo. En ese mismo hilo, el aceite de la
piel se señala como la causa número uno.

## Lo que este artículo no te va a resolver

**Una cifra de coste.** Nada de esto lleva a la cuenta de material; si lo que
necesitas es saber cuánto te cuesta la pieza en euros, eso es cosa de otro sitio.

**Los voladizos.** Un voladizo que se curva hacia abajo por enfriamiento es otro
problema, con su propio ajuste: la Prusa recomienda un 10-20 % de ventilador incluso
en materiales que no lo necesitan
([Prusa Research](https://help.prusa3d.com/article/warping_2011)).

**El colapso de piezas altas y finas.** Eso es otra falla —vibración, no
contracción— y se resuelve bajando velocidad y aceleración un 20-30 %, con soportes
y orientando la pieza
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

**Si tu problema es el material.** Aunque en un caso concreto se descartó que fuera
filamento ([Diem](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)),
PLA sigue siendo el material que menos se deforma. Si has hecho los cinco pasos y
sigue igual, el siguiente sospechoso es la MECÁNICA: las correas. Suenan a cuerda
de guitarra cuando están bien tensadas, flojas cuando chasquean
([Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)).

## Si te interesa

- [[enclosure-y-warping|Enclosure y warping]] — es donde las fuentes se contradicen
  de forma aparente, y el matiz es todo el contenido.
- [[separaciones-entre-capas|Separaciones entre capas]] — el fallo que se confunde con
  warping, y que tiene otra causa y otra solución.
- [[adhesion-primera-capa|Adhesión en la primera capa]] — que es la mitad de este
  artículo, pero merece su propia página.

---

*Fuentes en el `frontmatter` de este artículo. Todas consultadas el 2026-10-03.*