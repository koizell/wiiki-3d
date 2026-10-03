---
titulo: Warping en PLA
tema: warping-pla
fuentes:
  - wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/warping-pla-bambu-wiki-printed-model-warping.md
  - wiki/raw/warping-pla-prusa-knowledge-base-warping.md
  - wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-pla.md
  - wiki/raw/warping-pla-prusa-forum-warping-at-corners.md
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
  redondeadas. Quien abrió el hilo de Prusa probó radios de 3 mm en las esquinas y
  **no le bastó**; quien lo probó chaflanando la arista en el laminador, sí.
  — [Lichtjaeger y Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
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
3. **Subir la temperatura de cama.** Ver la contradicción de abajo: el objetivo
   depende de la chapa, no del material solo.
4. **Añadir un brim**, de 8 a 10 mm de ancho, o mejor **brim ears** dirigidos
   sólo a las esquinas que se levantan. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
5. **Cambiar el patrón de relleno a Gyroid** por debajo del 25 % de densidad. Grid y
   Triangle crean tensión lineal interna. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

Los tres primeros resuelven aproximadamente el **80 %** de los fallos de warping y
adhesión, según el propio Bambu. — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

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
- El resultado tras subir la temperatura de cama y chaflanar las aristas:
  *"Zero warping... none on the bed"*, comprobado también sobre una placa de vidrio
  para descartar que la pieza bailara.
  — [Lichtjaeger y Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)

Bajar la temperatura de cama, que es lo que recomienda la mitad de internet, es
justo lo que se probó primero y no funcionó.

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar
el matiz en el artículo en vez de elegir un número.

### 1. La temperatura de cama: el objetivo depende de la chapa, no del material

- **Subir +5 a +10 °C, objetivo 55–65 °C en Textured PEI.** La Cool Plate de Bambu
  para PLA es **35 °C**.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Subir, nunca bajar, con 65 °C como techo.**
  — [Lichtjaeger, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- La Knowledge Base de Prusa habla de Live Adjust Z y de brim para el warping, pero
  **no da una cifra de temperatura de cama para PLA**.
  — [Prusa Research](https://help.prusa3d.com/article/warping_2011)

**El matiz:** "sube la cama" es correcto en la dirección y está mal en el número.
Las dos fuentes coinciden en que hay que subir. Difieren en el objetivo porque
Bambu da cifras **por chapa**, y la diferencia entre su Cool Plate (35 °C) y su
Textured PEI (55–65 °C) es de 20 grados. Una persona con la Cool Plate que siga el
número de 65 °C está quemando la placa. El artículo tiene que decir "a la
temperatura que corresponda a tu chapa", y sólo entonces las cifras.

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
- Quien abrió el hilo de Prusa resolvió su caso con un enclosure **sin tapa**, con
  espuma. — [Zakalawe, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)

**El matiz:** los tres tienen razón a la vez si se separan las dos funciones. Un
enclosure cerrado **estorba** al enfriamiento del PLA; uno abierto o sin tapa
**ayuda** a mantener el ambiente estable y por encima de 20 °C. No son
recomendaciones opuestas: son la misma recomendación con dos restricciones que se
excluyen.

### 4. El patrón de relleno: Gyroid gana a Grid en las dos fuentes, cubic no está claro

- **Gyroid ≤25 %.** Grid y Triangle crean tensión lineal interna.
  — [Bambu Lab](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Grid es de los peores; probaría cubic, si falla gyroid, o mejor 3D Honeycomb.**
  — [Diem, foro de Prusa](https://forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/)

**El matiz:** las dos coinciden en que Grid es mala idea y en que Gyroid es mejor
que Grid. Difieren en la cabeza de la lista: Bambu pone Gyroid la primera,
Diem pondría cubic por delante. Gyroid tiene fuente oficial y cubic no, así que el
redactor debería recomendar Gyroid y **mencionar que hay quien prefiere cubic por
encima**, sin decide quién tiene razón.

## Sin respaldo

Una sola fuente secundaria, sin corroboración. El redactor puede usarlas
marcadas como lo que son.

- **El techo de 65 °C de cama.** Lo dice un usuario del foro de Prusa, y concuerda
  con el límite superior del rango de Bambu, pero ninguna fuente oficial lo
  declara. **[UNA SOLA FUENTE — foro]**
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

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Reddit.** No hay contenido. Ni `reddit.com` ni `old.reddit.com` devuelven el
  texto de los hilos: sale la estructura del sitio y nada más. Está comprobado, no
  supuesto. Por eso dos de las cinco fuentes son hilos de foro de Prusa.
- **All3DP.** La página carga pero su HTML no contiene el texto del artículo, ni en
  la versión normal ni en `/amp/`. No es citable desde aquí.
- **Tabla de materiales de Prusa** (`help.prusa3d.com/filament-material-guide`).
  Da PLA con boquilla 185–235 °C y cama 50–60 °C, marcado "Low warping", pero la
  tabla sale **aplastada en texto plano** y no es usable. Es la cifra de cama que
  más echo tiene, y este lote **no puede confirmarla**. Si el artículo la usa, tiene
  que decirlo así.
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
| warping en PLA | tipo de chapa | 35 °C en Cool Plate frente a 55–65 °C en Textured PEI, para el mismo material |
| warping en PLA | patrón y densidad de relleno | Grid y Triangle crean tensión lineal; Gyroid reparte |
| warping en PLA | geometría de las esquinas | aristas vivas concentran tensión; chaflanar o redondear reparte |
| warping | separaciones entre capas | **son fallos distintos**, y confundirlos lleva a cambiar lo que no toca |
| warping en PLA | enclosure | ayuda al ambiente y estorba al enfriamiento, según tenga tapa o no |
| warping en PLA | humedad del filamento | chasquidos o superficie rugosa y con burbujas son otro problema, no warping |

**Página propia que este tema sugiere:** *enclosure y warping*, porque es donde las
fuentes se contradicen de forma aparente y el matiz es el contenido del artículo.