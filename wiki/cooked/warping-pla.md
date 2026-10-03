---
titulo: Warping en PLA
tema: warping-pla
fuentes:
  - wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/warping-pla-bambu-wiki-printed-model-warping.md
  - wiki/raw/warping-pla-prusa-knowledge-base-warping.md
  - wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-pla.md
  - wiki/raw/warping-pla-prusa-forum-warping-at-corners.md
  - wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md
  - wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md
cocinado: 2026-10-03
---

# Warping en PLA

## Afirmaciones

### Causa

- El warping es contracción térmica. Los bordes exteriores de la pieza se enfrían
  antes que el centro, y esa diferencia genera una tensión que levanta las esquinas.
  — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La causa inmediata son las contracciones de las tiradas largas de filamento.
  — [Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
- Es un choque térmico entre la temperatura de fusión de la boquilla y la
  ambiente. — [Prusa Research, Knowledge Base](https://help.prusa3d.com/article/warping_2011)

### De qué depende

- Los materiales se ordenan por riesgo de warping, de mayor a menor:
  **PC → PA-CF → PA → ABS → ASA → PETG → PLA**. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
  Esto significa que PLA es **el material rígido más estable de los siete**, y que
  un PLA que se levanta suele ser un problema de ajuste, no de material.
- El tamaño cuenta: los warping aparecen más en piezas grandes.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La geometría cuenta: las esquinas vivas de 90° concentran más tensión que las
  redondeadas. En el hilo de Prusa, el consejo es textual: *«Sharp angles can be more
  prone to warping»*, y la solución que propone es añadir un **redondeo
  (filleted edge) en el eje Z**, que aumenta el contacto con la cama.
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **El chaflán se hace en el modelo, en el CAD, antes de exportar.** Quien cerró el
  caso de 2019 lo dice literal: *«I increased the bed temperature and **chamfered the
  edges of the shape in Fusion**»*. Fusion es Fusion 360. **No es una operación del
  laminador**, que además sólo trae chaflán de esquina y no de arista: quien intente
  replicarlo allí no puede.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- **Radios de 3 mm: son de otro hilo y de otra persona.** En «Warping at corners»
  (2024, cinco años y un hilo después) quien abrió el tema cuenta: *«I tried to round
  off the 90°-corners with 3mm radii **but the crinkles remained**»*, más perímetros
  extra, sin efecto. **Ningún caso prueba que los radios fallen y el chaflán funcione**,
  porque no están en la misma conversación ni en la misma pieza.
  — [Elias Spors, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
  **INFERENCIA, si al redactor le sirve:** chaflán y radio atacan la misma esquina
  por el mismo mecanismo, así que es razonable esperar resultados parecidos. Es una
  deducción a partir de las dos afirmaciones, **no un dato que diga ninguna fuente**, y
  las dos van además sobre piezas y geometrías distintas. Si se usa, va marcada.
- Por debajo de **20 °C de ambiente**, el warping aparece incluso con PLA y PETG,
  que son los materiales más indulgentes. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- Una corriente de aire enfría un lado más que otro. Basta una ventana abierta, un
  aire acondicionado o un ventilador de mesa. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), [Prusa Research](https://help.prusa3d.com/article/warping_2011)

### Cómo distinguirlo de otro fallo

Esto es lo que más se confunde, y hay un criterio concreto:

- El warping real **arquea la pieza hacia arriba desde la cama** y deja superficie
  rugosa en la cara superior, porque las capas quedan comprimidas.
  — [Neophyl y Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)
- Hay un fallo **parecido pero distinto**: separaciones en las juntas de las capas
  por cambios de firmware o de PrusaSlicer, que afectan también a PLA que antes no
  daba problemas. No es warping. Se reporta en el issue
  [PrusaSlicer #11914](https://github.com/prusa3d/PrusaSlicer/issues/11914).
  — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)

### Qué se ha probado y funciona

El orden importa, y no es el que sugiere el sentido común.

1. **Limpiar la chapa con agua templada y jabón.** El aceite de la piel es la causa
   número uno de fallo de adhesión según Bambu, y el primer paso del Tier 1.
   — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
2. **No cooling durante las 3 primeras capas.** Es el ajuste que Bambu señala como
   el más importante para el warping: asegura la adhesión de la primera capa y
   ralentiza el enfriamiento. — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
3. **Subir la temperatura de cama.** La dirección la dan todas las fuentes; la cifra
   depende de la chapa y del fabricante, y está en las dos tablas de abajo y en la
   contradicción 1.
4. **Añadir un brim**, de 8 a 10 mm de ancho, o mejor **brim ears** dirigidos
   sólo a las esquinas que se levantan. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
5. **Cambiar el patrón de relleno a Gyroid** por debajo del 25 % de densidad. Grid y
   Triangle crean tensión lineal interna. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

Los tres primeros resuelven aproximadamente el **80 %** de los fallos de warping y
adhesión, según el propio Bambu. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### La temperatura de cama que dan los fabricantes

Estas cifras no estaban en las cinco fuentes de este tema. Vienen de las tablas de
materiales, que estaban en `wiki/raw/` y se leían bien. Ver `wiki/cooked/temperatura-cama.md`.

- **Prusa Research** da para el PLA **50–60 °C de cama** y 185–235 °C de boquilla, sin
  pedir enclosure, drybox ni boquilla endurecida. — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Bambu Lab**, por filamento y pegamento: PLA y PLA-CF **35 – 65 °C**.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **Bambu Lab**, por filamento y **chapa**, que es una segunda tabla de la misma página:
  el PLA pide **35 – 45 ℃** en la Cool Plate y **45 – 65 ℃** en la Engineering Plate, la
  Smooth PEI y la Textured PEI. La diferencia entre chapas para el mismo material es de
  20 grados.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- La tabla de Prusa **no desglosa por chapa**. Ni el PETG, el ABS ni el PC vienen
  separados por chapa, así que la columna de chapa no existe en ella.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- Los rangos **no llevan tolerancia** en Prusa; Bambu sí pone ±10 °C en la tabla de
  boquilla. La diferencia de notación es de la fuente, no del material.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide), [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)

Y el fallo de chapa no se paga sólo en temperatura. Si se laminó para la Cool Plate
(35 °C) y se imprime en la Textured PEI, la adhesión sale demasiado fría; y la Textured
PEI **baja la boquilla 0,04 mm automáticamente al nivelar**, así que elegir el tipo de
chapa equivocado en el slicer desactiva ese offset y deja la primera capa demasiado
alta. Son los dos síntomas del mismo error de una línea.
— [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### Filamento húmedo no es warping

- Si durante la impresión se oyen chasquidos o chisporroteo, o la superficie sale
  rugosa, con burbujas o filamentos sueltos, el filamento ha absorbido humedad del
  aire. Se seca y se vuelve a imprimir; cambiar la temperatura no lo arregla.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### El caso del antes y del después

Hay un hilo en el que está documentado el ciclo completo, y es el más útil del
lote porque muestra **qué no funcionó**:

- Con cama a **50 °C** y luego a **40 °C**, más brim, la pieza se curvaba tanto que
  se separaba del brim. Ambiente a unos 20 °C. PEI lisa.
- La respuesta: **la cama va más alta, no más baja**, hasta 65 °C como máximo. Y
  desde los huecos del brim se deduce que la primera capa iba demasiado alta.
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- El desenlace, textual: *«Thanks, **I increased the bed temperature and chamfered the
  edges of the shape in Fusion**, that seemed to make a big difference»*. El chaflán es
  **en el modelo, en Fusion 360**, no en el laminador. Y el propio autor lo dice como
  sospecha, con su *«seemed to»*: no hay detrás ninguna medición ni una segunda
  impresión de control.
  — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)

Bajar la temperatura de cama, que es lo que recomienda la mitad de internet, es
justo lo que se probó primero y no funcionó.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar
el matiz en el artículo en vez de elegir un número.

### 1. La temperatura de cama: el objetivo depende de la chapa, no del material

Aquí **no hay discrepancia entre fuentes de Bambu: hay una variable que faltaba**, y
era la chapa. Los dos números que parecían discrepar son los dos extremos de la misma
fila, leídos por columnas distintas.

- **Subir +5 a +10 °C, objetivo 55–65 °C en Textured PEI.** Y, en la misma página,
  **35 °C para el PLA en Cool Plate**. Los dos son de Bambu y los dos son ciertos.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- La tabla por chapa de la wiki de Bambu lo confirma y lo explica: la fila del PLA es
  `35–45 | 45–65 | 45–65 | 45–65` para Cool Plate, Engineering Plate, Smooth PEI y
  Textured PEI. El **35 °C de la Cool Plate** es un extremo; el **65 °C de la Textured
  PEI** es el otro.
  — [Bambu Lab](https://wiki.bambulab.com/en/general/filament-guide-material-table)
- **50–60 °C**, en la tabla de materiales de Prusa, sin desglosar por chapa.
  — [Prusa Research](https://help.prusa3d.com/filament-material-guide)
- **Subir, nunca bajar, con 65 °C como techo.**
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- La Knowledge Base de Prusa habla de Live Adjust Z y de brim para el warping, pero
  **no da una cifra de temperatura de cama para PLA**. La cifra de Prusa sale de su
  tabla de materiales, que es otro documento.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)

**El matiz, en tres partes.**

1. **Entre las dos cifras de Bambu no hay contradicción.** La fuente de warping las da
   por chapa; la tabla de materiales confirma que son la misma fila. Cualquiera de las
   dos está bien si la chapa es la que le corresponde.
2. **El 50–60 de Prusa es una tercera postura, y no encaja del todo con el 65 del
   foro.** Prusa da 50–60 para el PLA sin mirar la chapa; el hilo de Prusa sube a 65.
   Los dos son de "la casa Prusa" y no dicen lo mismo. El 50–60 cae **dentro** del
   45–65 que Bambu pide para la Textured PEI, así que no se contradicen: son el mismo
   rango leído con distinta anchura.
3. **"Sube la cama" es correcto en la dirección y está incompleto en el número.** El
   artículo tiene que decir "a la temperatura que corresponda a tu chapa", y sólo
   entonces las cifras. Una persona con la Cool Plate que siga el 65 °C está quemando
   la placa; una con Textured PEI que se quede en 35 °C es la razón de que las esquinas
   se levanten.

Y el 65 °C del foro no es un error: es el extremo alto del rango de la Textured PEI. Es
la postura de quien ya tiene un warping y sube hasta que para, no el valor de partida
de un fabricante.

### 2. El ventilador: no cooling al principio, enfriamiento después

- **Demasiado enfriamiento provoca warping.** Sin cooling las 3 primeras capas,
  y bajar el ventilador auxiliar a 40–50 %.
  — [Bambu Lab, printed-model-warping](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping)
- **PLA necesita mucha refrigeración; si se levantan las esquinas, sube el
  ventilador.** Si las piezas pequeñas o los voladizos se curvan, conviene encajar
  el ventilador al 10–20 % incluso en materiales que no lo necesitan.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)

**El matiz:** no se contradicen, hablan de tramos distintos del mismo ajuste. Bambu
habla de las **primeras capas** y del ventilador **auxiliar**; Prusa habla del
ventilador **general** durante el resto de la pieza. Y las dos avisan del mismo
límite: demasiado ventilador levanta la pieza entera y **baja la adhesión entre
capas**, lo que Prusa Compensa subiendo la temperatura de boquilla.

### 3. El enclosure: ayuda con el ambiente, estorba con el enfriamiento

- **Imprimir PLA dentro de un enclosure puede ser mala idea.** PLA necesita mucha
  refrigeración, y con temperatura ambiente alta es más difícil conseguirla.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)
- **El ambiente estable y por encima de 20 °C importa**, y por debajo de 20 °C hay
  warping incluso con PLA. Si la impresora es de estructura abierta, +10 °C de cama
  para compensar. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Con PLA, si el enclosure es cerrado, hay que abrirlo**: Bambu recomienda abrir la
  puerta delantera o quitar la tapa de cristal, porque el calor de la cámara ablanda y
  deforma el filamento. — [Bambu Lab, tabla de materiales](https://wiki.bambulab.com/en/general/filament-guide-material-table)

**El matiz:** no se contradicen si se separan las dos funciones. Un enclosure cerrado
**estorba** al enfriamiento del PLA; uno abierto o sin tapa **ayuda** a mantener el
ambiente estable y por encima de 20 °C. No son recomendaciones opuestas: son la misma
recomendación con dos restricciones que se excluyen.

**El hilo del foro no aporta un tercer dato aquí.** El de 2019 dice sólo *"Longer term
I will setup an enclosure…"*: un plan, en futuro y sospechando. **No dice que lo
montara, ni que fuera sin tapa, ni que llevara espuma.** Ese caso no existe en el
material cocinado y no se escribe.

### 4. El patrón de relleno: Gyroid gana a Grid en las dos fuentes, cubic no está claro

- **Gyroid ≤25 %.** Grid y Triangle crean tensión lineal interna.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Grid es de los peores; probaría cubic, si falla gyroid, o mejor 3D Honeycomb.**
  — [Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)

**El matiz:** las dos coinciden en que Grid es mala idea y en que Gyroid es mejor
que Grid. Difieren en la cabeza de la lista: Bambu pone Gyroid la primera,
Diem pondría cubic por delante. Gyroid tiene fuente oficial y cubic no, así que el
redactor debería recomendar Gyroid y **mencionar que hay quien prefiere cubic por
encima**, sin decidir quién tiene razón.

## Sin respaldo

Una sola fuente secundaria, sin corroboración. El redactor puede usarlas
marcadas como lo que son. La primera es el caso raro de esta vuelta: la cifra ha
dejado de ser sólo de foro, pero el papel que le da el foro —el de «techo»— sigue sin
respaldo, y por eso sigue aquí.

- **El techo de 65 °C de cama.** **[YA NO ES SÓLO FORO — CORROBORADO POR
  FABRICANTE, con un matiz]** El 65 °C es **el extremo alto del rango que Bambu da
  para el PLA en Textured PEI** (45–65 ℃), así que la cifra está respaldada por un
  fabricante y no es sólo de un usuario. Lo que sigue siendo del foro, y lo único que
  no hay que publicar como regla general, es la idea de **"techo"**: que 65 sea
  **el máximo**. Ningún fabricante en este lote dice que no se pueda pasar de ahí; la
  tabla de Prusa se queda en 50–60 °C para el PLA, y ése es el único número que él da.
  El redactor puede decir que 65 °C es el valor con el que se ha resuelto un caso real,
  apoyándose en la tabla de Bambu, pero **no debe presentarlo como un límite
  establecido por Prusa**.
- **Cubic por encima de Gyroid**, y **3D Honeycomb** como tercera opción.
  **[UNA SOLA FUENTE — foro]**
- **Abrir huecos decorativos en la pieza** para romper las tiradas largas y dar
  puntos de expansión. **[UNA SOLA FUENTE — foro]**
- **Mouse-ears** como alternativa al brim. **[UNA SOLA FUENTE — foro]**
- **Que no es un problema de filamento ni de temperatura** cuando aparecen síntomas
  de separación en las juntas. Lo afirma Diem en un caso concreto, no como regla
  general. **[UNA SOLA FUENTE — foro]**
- **Lavar la chapa con agua caliente y jabón a menudo, y con alcohol cada pocas
  impresiones**, por separado. Prusa sí recomienda limpiar, pero no da esta
  cadencia. **[UNA SOLA FUENTE — foro]**
- **Reducir la velocidad de impresión para el warping en PLA.** Bambu la menciona
  para materiales de alta temperatura y para el colapso de piezas altas, y Prusa
  la menciona para Prusament PC-Blend. **Ninguna fuente la aplica a PLA contra
  warping de esquinas.** **[AFIRMACIÓN QUE SE HA IDO MÁS ALLÁ DE SUS FUENTES —
  no debe usarse sin marcarla]**

### Regla que sale de este fichero: comprueba el foro contra el crudo, no contra lo cocinado

Las tres afirmaciones encargadas corregir eran de hilos de foro, y al abrirlas contra
el crudo ninguna salió como estaba escrita: dos no estaban en su fuente (el chaflán en
el laminador, el enclosure sin tapa con espuma) y una era real pero de **otro hilo y
otro autor** (los radios de 3 mm). Al comprobarlas apareció una cuarta, una cita
entera que tampoco estaba en ningún fichero de `wiki/raw/`.

Lo que lo hizo pasar es que **el artículo y el material cocinado coinciden**: cuando
los dos dicen lo mismo, revisar el artículo contra lo cocinado **no puede ver un error
que nació en lo cocinado**, porque los dos están mal a la vez. Estas afirmaciones
llevaban dos revisiones aprobadas encima.

Un hilo de foro es además el peor caso: es conversación, con acentos, con gente que
cuenta planes y con alguien que corrige a otro. **Lo que dice una persona sobre lo que
va a hacer no es lo que hizo**, y lo que responde una persona en un hilo no es lo que
probó quien abrió el hilo.

Regla práctica: **una afirmación de foro se abre en `wiki/raw/` y se cita la línea.**
Si la cita literal no aparece en el fichero crudo, la afirmación no se escribe. Cuando
la cifra venga de dos hilos distintos, se separan y **no se encadenan**: que una cosa
fallara y la otra saliera bien es una inferencia y va marcada como inferencia.

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **El caso del foro con enclosure sin tapa y espuma** de la contradicción 3.
  **Fabricado en este fichero, no estaba en la fuente.** El hilo sólo dice *"Longer
  term I will setup an enclosure…"*: un plan en futuro y en condicional. De ahí no
  salen ni que lo montara, ni que fuera sin tapa, ni que hubiera espuma. **No se
  cita como caso resuelto**, y el redactor no debe reintroducirlo. La contradicción 3
  se sostiene sin él, con Prusa y Bambu.
- **La cita *"Zero warping… none on the bed"* y la prueba sobre placa de vidrio**, del
  apartado «el caso del antes y del después». **No están en `wiki/raw/`.** Se han
  sustituido por la frase que sí está en el crudo, la de Zakalawe. La primera capa, la
  cama a 50 y 40 °C, el ambiente a 20 °C y el consejo de subir la cama hasta 65 °C
  **sí están y se quedan**.
- **Reddit.** No hay contenido. Ni `reddit.com` ni `old.reddit.com` devuelven el
  texto de los hilos: sale la estructura del sitio y nada más. Está comprobado, no
  supuesto. Por eso dos de las cinco fuentes de warping son hilos de foro de Prusa.
- **All3DP.** La página carga pero su HTML no contiene el texto del artículo, ni en
  la versión normal ni en `/amp/`. No es citable desde aquí.
- **Tabla de materiales de Prusa** (`help.prusa3d.com/filament-material-guide`).
  **Corrección de una vuelta anterior.** Este apartado decía que la tabla «sale
  **aplastada en texto plano** y no es usable», y la descartaba. **Es falso, y la
  fuente ya estaba en `wiki/raw/`.** Lo cierto es otra cosa: la página **no trae ni
  una etiqueta `<table>`**, son cero, porque la monta con `div` y atributos de ARIA. Se
  lee sacando las celdas por `role="cell"` —20 `role="row"` y 309 `role="cell"` en el
  HTML servido—, y así salen las **18 filas de material** con sus tres columnas. Para el
  PLA queda `PLA | No, -, No | 185-235 °C, 50-60 °C`, y las cifras concuerdan con las que
  devuelve la búsqueda de la página.

  **«No hay etiquetas `<table>`» y «la tabla no se puede leer» son afirmaciones
  distintas, y aquí sólo la segunda era falsa.** Confundirlas costó una cifra oficial
  entera.

  — la tabla está subida en `wiki/raw/temperatura-cama-prusa-kb-filament-material-guide.md`
  y ya está cocinada en `## Afirmaciones`. La nota del recolector en
  `wiki/raw/warping-pla-prusa-knowledge-base-warping.md` conserva el mismo error, pero
  ese fichero es inmutable y no se toca.
- **Las columnas de chapa de la tabla de Prusa**, que se descartan aparte por
  desalineación en el original, no por dificultad de lectura.
- **Comentarios en checo** de la Knowledge Base de Prusa.
- **Navegación, menús, estadísticas, etiquetas y posts relacionados** de los foros.
- **Imágenes y vídeo** de la wiki de Bambu: sólo queda la marca de posición.
- **Cierres de las páginas de Bambu** ("envía un ticket técnico"), que no son
  contenido.
- **Enlaces de tienda y precios** que aparecen en los comentarios del foro.
- **El consejo de bajar la velocidad con Prusament PC-Blend** de la Knowledge Base
  de Prusa: es específico de ese filamento y no aplica a PLA.
- **"Use a skirt and print more objects at once"** de la Knowledge Base de Prusa:
  va dirigido a materiales de alta temperatura.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| warping en PLA | adhesión a la cama | sin adhesión, la contracción levanta la pieza desde el borde |
| warping en PLA | temperatura ambiente | por debajo de 20 °C ocurre incluso con PLA |
| warping en PLA | enfriamiento de la primera capa | sin cooling 3 capas, la primera capa se enfría demasiado rápido |
| warping en PLA | [[temperatura-cama\|Temperatura de cama]] | **este artículo usó sus cifras**: la contradicción 1 no se entiende sin la tabla por chapa de Bambu, y el 50–60 °C de Prusa sale de su tabla de materiales |
| warping en PLA | tipo de chapa | 35–45 ℃ en Cool Plate frente a 45–65 ℃ en las otras tres chapas, para el mismo PLA. Son los dos extremos de la misma fila, no dos cifras que se pelean |
| warping en PLA | altura de la primera capa | la Textured PEI baja la boquilla 0,04 mm al nivelar; elegir mal la chapa en el slicer desactiva ese offset y la primera capa queda demasiado alta |
| warping en PLA | patrón y densidad de relleno | Grid y Triangle crean tensión lineal; Gyroid reparte |
| warping en PLA | geometría de las esquinas | aristas vivas concentran tensión; redondear o chaflanar las reparte. **El chaflán es en el CAD, en Fusion, antes de exportar** —no en el laminador—; el redondeo en eje Z es lo que propone el foro |
| warping | separaciones entre capas | **son fallos distintos**, y confundirlos lleva a cambiar lo que no toca |
| warping en PLA | enclosure | con PLA y cerrado estorba al enfriamiento (Prusa) y Bambu manda abrir la puerta o quitar la tapa de cristal para que el filamento no se ablande. Eso, y no ningún caso de foro |
| warping en PLA | humedad del filamento | chasquidos o superficie rugosa y con burbujas son otro problema, no warping |

**Página propia que este tema sugiere:** *enclosure y warping*, porque es donde las
fuentes se contradicen de forma aparente y el matiz es el contenido del artículo.