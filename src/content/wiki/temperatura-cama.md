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
tags: [temperatura, cama, cama-calentada, adhesion, pla, chapas, slicer]
autor: wiiki-3d
# Los campos del panel que este artículo explica. `bedTemp` es opcional en
# ProjectMetadata, así que este artículo lleva la sección de por qué puede faltar.
campo: [bedTemp]
---

# Temperatura de cama: por qué hay tres cifras y cuál es la tuya

Si el panel te dice que tu G-code lleva la cama a 60 °C, lo primero que hay que
saber es que **60 °C puede ser correcto, estar justo y quedarse corto**, según qué
chapa tengas encima y de quién sea la cifra. Para el mismo PLA hay tres números
distintos publicados por tres fabricantes, y no es que uno de ellos se esté
equivocando.

Vamos a ponerlos en fila antes de explicarlos.

| Fuente | Cama para PLA | Lo que añade |
|---|---|---|
| **Bambu Lab** | 35 – 65 °C | Separa por chapa: 35–45 en Cool Plate, 45–65 en las otras tres |
| **Prusa Research** | 50 – 60 °C | Ficha de materiales, 18 materiales |
| **Prusa Research** | 60 °C | Ficha del PLA, con la chapa recomendada al lado |
| **OrcaSlicer** | 50 – 60 °C | Tabla de rangos estándar de 11 materiales |

Los cuatro caben a la vez. Lo verás abajo.

## Por qué hay un rango y no una cifra

Antes de las cifras, la razón por la que las tablas dan intervalos: OrcaSlicer lo dice
en una frase, y es la única de las cinco fuentes que lo dice. La mayoría de los
materiales tienen un rango óptimo bastante amplio para la temperatura de cama,
típicamente **±5 °C**
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)).

Eso justifica un intervalo pequeño. No justifica el rango de treinta grados que da
Bambu para el PLA, y eso hay que decirlo: **nadie explica de dónde sale un rango tan
ancho**. Lo que sí hace Bambu, y ningún otro, es separar por chapa.

## Las cifras, y por qué las tres son ciertas a la vez

Bambu publica dos tablas de cama en la misma página, y no son la misma
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)).
La primera es por filamento y pegamento: PLA y PLA-CF, **35 – 65 °C**. La segunda es
por filamento y **chapa**, y ahí está todo el asunto:

| Material | Cool Plate | Engineering Plate | Smooth / Textured PEI |
|---|---|---|---|
| PLA | **35 – 45 ℃** | 45 – 65 ℃ | 45 – 65 ℃ |
| TPU | No recomendado | 30 – 35 ℃ | 35 – 45 ℃ |
| PETG | No recomendado | 60 – 80 ℃ | 60 – 80 ℃ |

Ahora vuelve a las otras cifras. Los 50–60 °C de Prusa y de OrcaSlicer **están dentro
del 45–65** que pide la Textured PEI. El 60 °C de la ficha del PLA también. Y el 35 °C
del Cool Plate está en el otro extremo de la misma fila.

Es decir: **los cuatro números dicen lo mismo sobre un material y dicen cosas
distintas sobre una chapa.** Cuando alguien escribe «sube la cama a 65 °C» sin decir
con qué chapa, la afirmación no es falsa, es incompleta.

Y hay una diferencia de fondo entre los fabricantes que conviene ver. Bambu da treinta
grados de margen para el PLA; Prusa da diez. Los dos dan un rango, pero no el mismo
rango. Si vas a cambiar de fabricante de impresora, la cifra que te salga no será la
misma, y eso no es una contradicción: es que **las tablas se escribieron para máquinas
que tienen chapas distintas**.

## Qué pasa si la cama está demasiado fría

OrcaSlicer lo describe con una progresión
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

> If the bed temperature is too low, the filament may fail to adhere properly, leading
> to warping, weak layer bonding, or complete detachment. In severe cases, the printed
> part may dislodge entirely and stick to the nozzle or other printer components,
> potentially causing mechanical damage.

Es decir, en orden: la pieza se despega, la unión entre capas se debilita y, en el
caso malo, la pieza sale despedida y se queda pegada a la boquilla. Ese último paso
ya no es un warping: es un daño.

La razón de fondo es la que cuenta [[warping-pla|Warping en PLA]]: el material se
contrae al enfriarse, y si la primera capa no se agarra a la cama, la contracción la
levanta en vez de repartirse. Por eso el warping y la temperatura de cama son el mismo
problema medido desde dos sitios.

## Qué pasa si está demasiado caliente

Aquí los efectos van en dos direcciones, y la segunda se olvida.

**En la pieza**, OrcaSlicer lo llama *elephant foot*: si la cama está demasiado
caliente, las capas inferiores se recalientan y reblandecen, y la base se deforma
hacia fuera.

**En la chapa**, y esto es lo que no sale en la mayoría de artículos. Prusa avisa de
que con PETG, ABS, ASA y materiales parecidos la adhesión puede ser **demasiado
fuerte** y puedes dañar la PEI lisa
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)). Y en la
misma página: «IPA + PETG will cause the print to adhere very strongly to the sheet.
Removing it could be extremely difficult.»

Es decir: subir la cama para que se pegue bien puede ser la forma de que se pegue
*demasiado*, y entonces el problema es que no sale.

Y hay un techo calculable. OrcaSlicer da la regla
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):

> As a general guideline, you can use the glass transition temperature (Tg) of the
> material and subtract 5–10 °C to estimate a safe upper limit for bed temperature.

La temperatura de transición del material es el punto en que pasa de rígido a blando,
y la idea es no acercarse a él con la cama: lo que ocurre con una cama muy caliente es
que la base de la pieza empiece a reblandecerse todavía encima de ella.

> **Una advertencia sobre esa fuente.** La ficha del PLA de Prusa también trae un
> 60 °C, y es tentador leerlo como «no pases de 60 °C». No es eso. Ahí el 60 °C se
> refiere **a la pieza** —«it gets soft and deforms at temperatures over 60 °C»— no a
> la cama. El mismo número, dos afirmaciones distintas, y la segunda es la que
> importa.

## Cómo se sube, cuánto y cuándo

Prusa da el incremento, y es más pequeño de lo que se dice por ahí
([Prusa Research](https://help.prusa3d.com/article/first-layer-issues_1804)):

> If you are experimenting with new materials that don't adhere well, you can try to
> increase the heatbed temperature by 5-10 °C.

Dos cosas que hay que leer ahí. La primera: **son 5 a 10 grados, sobre el valor del
perfil**, no hasta el techo del rango. La segunda, en la misma página: PrusaSlicer
configura las temperaturas por el material seleccionado, así que normalmente no hay
nada que tocar en la impresora. El problema del límite de 60 °C tampoco es suyo: si
tu perfil trae 60 y tú lo subes a 75, ya has salido del rango del fabricante.

## El segundo efecto: la cama también calienta la cámara

Esto es lo que casi nadie menciona y es la razón por la que una cama bien caliente
puede darle la vuelta al resultado.

Bambu lo pone junto a su tabla
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)):

> Filaments with a softening temperature below 60 ℃ (e.g., PLA, PVA, TPU), when the
> heatbed is set above 45 ℃: We recommend opening the front door and/or removing the
> upper glass cover plate to prevent excessive chamber heat from softening and
> deforming the filament.

Es decir: **con PLA y cama por encima de 45 °C, hay que abrir la puerta frontal o
quitar la tapa de cristal.** El umbral sube a 60 °C y luego a 70 °C para el PETG.

Y OrcaSlicer avisa del otro extremo, y con una consecuencia más seria
([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)):
«Low temperature Filaments like PLA can clog the nozzle if the chamber temperature is
too high.» Para PLA, PETG, TPU y PVA, el control de cámara debería estar desactivado.

Los dos dicen lo mismo con palabras distintas: **una cámara templada que es buena
para el ABS es mala para el PLA**. Si tienes la impresora cerrada y subes la cama por
encima de 45 °C con PLA, estás cambiando una variable sin avisar de que hay otra.
Eso lo desarrolla [[enclosure-y-warping|Enclosure y warping]].

## La chapa también cambia la altura de la boquilla

No es un extra: es el mismo ajuste visto desde otro lado. La ficha del PLA de Prusa
avisa de que con chapa powder-coated hay que **bajar el live-Z**, porque el filamento
tiene que rellenar la textura; y que la chapa lisa «works better for printing parts
that have a small contact area with the print surface»
([Prusa Research](https://help.prusa3d.com/article/pla_2062)).

Traducido: **cambiar de chapa cambia la cifra y también dónde tiene que estar la
boquilla.** Si subes la temperatura y además has cambiado la chapa, no sabes qué de
las dos cosas ha arreglado lo que se ha arreglado.

El mismo efecto, visto desde el otro fabricante, está en la tabla de Bambu: el TPU
sale «Not recommended» en Cool Plate. Dos fabricantes llegando a un aviso parecido por
caminos distintos.

## Por qué tu slicer puede no escribir este dato

`bedTemp` es un campo opcional, y hay cuatro razones distintas por las que no
aparece. None es un fallo del analizador.

**1 · El slicer pone la temperatura solo y no la escribe.** Es el caso normal.
PrusaSlicer la configura a partir del material seleccionado, así que muchos G-code no
llevan nada en la cabecera, o llevan el valor por defecto del perfil sin comentar. Si
no hay número, no es que la cama esté mal: es que nadie te dijo a qué iba.

**2 · El material no la necesita.** La ficha del PLA de Prusa dice, en la misma frase
en la que recomienda 60 °C, que «PLA **does not require a heated bed**»
([Prusa Research](https://help.prusa3d.com/article/pla_2062)). Es decir: los 60 °C son
una recomendación, no una exigencia del material. Un slicer configurado para no
calentar la cama en PLA está haciendo algo razonable.

**3 · El nombre de la clave depende del slicer.** Este es el motivo real de que el
campo sea opcional. La variable cambia de nombre según el programa que generó el
archivo, y con ella la clave que hay que buscar en la cabecera.

> **Lo que aquí no te vamos a contar.** El analizador de esta aplicación sabe qué claves
> mirar, y hay tres fuentes que lo confirman parcialmente: OrcaSlicer nombra
> literalmente `hot_plate_temp` y `cool_plate_temp`, con sus variantes para primera capa
> ([OrcaSlicer](https://www.orcaslicer.com/wiki/material_settings/filament/material_temperatures.html)),
> que son justo las que usan los forks de Creality. **Pero ninguna de las cinco fuentes
> de este artículo nombra `bed_temperature` a secas**, que es la que escribe la familia
> Prusa/Orca. Esa parte es dato interno nuestro, de `src/services/types.ts`, y no la
> vamos a disfrazar de fuente.

**4 · Un 0 en la cabecera es un valor puesto, no un hueco.** Bambu Studio avisa en el
otro sentido: si la temperatura de cama del perfil es 0 °C, el programa declara el
filamento incompatible con el laminado
([Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)). Es
decir: hay slicers que **escriben un 0 para decir que no usan cama**, y eso se
confunde fácil con «el campo no está». Son cosas distintas y la diferencia se nota en
la práctica: un 0 es una decisión, un hueco es que nadie preguntó.

## Qué puede salir mal

**Subir hasta el techo del rango porque un hilo de foro lo decía.** El caso está
documentado: alguien probó cama a 50 °C y luego a 40 °C con brim y la pieza se curvaba
hasta separarse del brim; la respuesta fue subir, «up to 65 °C as a maximum»
([foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)).
Los 65 °C son válidos para la Textured PEI de Bambu y por encima del rango que da Prusa
para PLA, que es 50–60 °C. **El hilo y la tabla no se contradicen: uno responde a un
problema que ya tenías y la otra al valor de partida.** Si copias el 65 a una Cool
Plate, estás fuera de rango por el otro extremo.

**Dejar la tapa puesta al subir la cama con PLA.** Con cama por encima de 45 °C, Bambu
recomienda abrir la puerta frontal o quitar la tapa de cristal, porque el calor de la
cámara reblandece el filamento dentro del extrusor. El riesgo no es sólo la pieza: con
PLA y cámara alta, OrcaSlicer avisa de que **se atasca la boquilla**.

**Creer que subir la cama arregla una capa sucia.** El aceite de la piel es la causa
más común de que la primera capa no se pegue, y ningún grado lo arregla. Los dos
fabricantes lo dicen: Bambu recomienda limpiar con jabón y agua caliente para quitar
«dust, grease, and other residues that affect adhesion», y avisa de que **no se limpie
con acetona** porque daña la superficie. Prusa recomienda alcohol isopropílico al 90 %,
insiste en que los productos de grado cosmético llevan hidratantes y aceites que no
valen, y reserva el acetona para la PEI lisa y «around once per month», porque su uso
prolongado hace la superficie frágil. Cambiar de chapa y no limpiarla cambia el
síntoma, no la causa.

**Pegar demasiado fuerte con PETG o ABS.** Es el reverso del error anterior y sale de
subir la cama sin mirar el material. Con esos materiales la adhesión puede pasarse y
dañar la PEI lisa, y quitar la pieza después es un problema aparte del cálculo.

**Confundir un 0 con un campo vacío.** Ya está explicado arriba: uno es una decisión
del slicer y el otro es que nadie preguntó. El panel los trata igual —«—»— y no es
cuestión de la vista: es que desde fuera son el mismo hueco.

**Cambiar la chapa y subir la temperatura a ciegas.** La chapa mueve las dos cosas a
la vez, la temperatura y el live-Z. Si cambias las dos, no sabes cuál ha arreglado
qué, y la siguiente vez que falle no sabrás por dónde empezar.

## Lo que este artículo no te va a resolver

**Un precio por kilo.** La temperatura de cama no cuesta dinero por sí sola. Lo que
cuesta es el filamento que se gasta, y eso es otro artículo
([[material|qué cambia entre materiales]]), y su coste, otro más.

**Los voladizos y los soportes.** El panel avisa de si la pieza los necesita, y eso
tiene su propia historia con el ángulo de la arista. Está en su sitio, no aquí.

**Por qué tu G-code concreto se separó en capas.** Eso no es temperatura de cama, es
[[separaciones-entre-capas|separaciones entre capas]], que es un fallo distinto con
causa distinta. Si la base está plana y las capas se sueltan por dentro, esta página no
te va a servir: mira aquélla.

## Si te interesa

- [[warping-pla|Warping en PLA]] — por qué se levantan las esquinas, que es la
  consecuencia de todo esto.
- [[adhesion-primera-capa|Adhesión en la primera capa]] — la otra mitad del problema,
  que no se arregla con grados.
- [[enclosure-y-warping|Enclosure y warping]] — por qué subir la cama te obliga a abrir
  la tapa.
- [[material|Qué cambia entre materiales]] — las cifras de esta página son por
  material.

---

*Fuentes en el `frontmatter` de este artículo. Todas consultadas el 2026-10-03.*
