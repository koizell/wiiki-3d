# Revisión de warping-pla, cuarta vuelta

**Veredicto: RECHAZADO** — 3 fallos, ninguno del tipo de las tres veces anteriores.

Artículo revisado: `src/content/wiki/warping-pla.md`
Fuentes cocinadas: `wiki/cooked/warping-pla.md`
Informes anteriores: `wiki/reviews/warping-pla-revision-1.md`, `-2.md`, `-3.md`

**Cómo se cuenta.** El frontmatter no cuenta, las URLs de los enlaces tampoco, y se
cuentan secuencias de letras y cifras. Con esa convención el artículo da **unas
3.000 palabras**. La revisión 3 contaba 2.418 con una convención más estricta que
no contaba números ni unidades; con cualquiera de las dos duplica el mínimo de 800.

## Las cuatro afirmaciones encargadas: las cuatro están corregidas

Las comprobé una a una contra el fichero crudo, con `grep` de la frase literal.

| # | Encargo | Estado | Dónde está ahora, y en qué línea del crudo |
|---|---|---|---|
| 1 | El chaflán de arista | **CORREGIDO** | «se hizo en el modelo, en Fusion 360, antes de exportar; **no en el laminador**» (líneas 85-86), y «El chaflán que resolvió aquel caso se hizo en Fusion 360, sobre el modelo, antes de exportar» (304-305). Crudo: `adjusting-settings-warping-pla.md:96-97`, «chamfered the edges of the shape in Fusion». La palabra «laminador» sólo aparece ya en las dos frases que niegan el chaflán en el laminador. |
| 2 | Los radios de 3 mm | **CORREGIDO** | «En «Warping at corners», un hilo de 2024 —cinco años y otro autor después—, quien abrió el tema» y la cita atribuida a **Elias Spors** (90-94). Crudo: `warping-at-corners.md:14` (Elias Spors, Member, 29/11/2024) y `:20-21`, la frase literal. **La cadena causal ha desaparecido**: ahora dice «**Ningún caso prueba que los radios fallen y el chaflán funcione**, porque no están en la misma conversación ni en la misma pieza», y marca la inferencia como propia («aquí lo decimos como inferencia nuestra, no como dato de ninguna fuente»). Añadido además el aviso en «Qué puede salir mal»: «Encadenar dos hilos distintos como si fueran una comparación». |
| 3 | El enclosure sin tapa con espuma | **DESAPARECIDO** | `grep` de «espuma», «foam», «sin tapa» en el artículo: **cero resultados**. El cooked lo marcó en `## Tirado` como fabricado, y el artículo ya no lo reproduce. Lo que queda sobre la tapa («la puerta abierta y la tapa fuera») es la instrucción real de Bambu, verificada abajo. |
| 4 | La cita «zero warping» y la placa de vidrio | **DESAPARECIDO** | `grep` de «zero warping», «vidrio» y «glass plate» en `wiki/raw/`: **cero resultados**, así que nunca existió. En el artículo tampoco. En su lugar está la frase de Zakalawe, que sí es literal (ver cita 2). |

Las cuatro correcciones están bien hechas y las cuatro se han respetado hasta el
detalle de la atribución. Éste es el mejor indicio de que el método —abrir el crudo y
buscar la frase literal— funciona.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 1 de 16 citas textuales no es literal, y sigue una línea sin fuente |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ~3.000 palabras, un solo `<h1>`, esquema completo, frontmatter con los cinco campos y `slug` coincidente |
| 5 | Citas correctas | **FALLA** — 4 wikilinks a 3 páginas que no existen, por tercera revisión consecutiva |

## Las dieciséis citas textuales, una a una

Las he buscado todas en `wiki/raw/` por fragmento, porque los ficheros crudos parten las
líneas a 80 columnas y una cita puede cruzar dos. Quince están literales.

| Cita del artículo | Crudo | Literal |
|---|---|---|
| «Sharp angles can be more prone to warping» | `adjusting-settings…:81` (Lichtjaeger, 27/06/2019) | sí |
| «I increased the bed temperature and chamfered the edges of the shape in Fusion, that seemed to make a big difference» | `adjusting-settings…:96-97` (Zakalawe) | sí |
| «seemed to» | `adjusting-settings…:97` | sí |
| «I tried to round off the 90°-corners with 3mm radii but the crinkles remained» | `warping-at-corners…:20-21` (Elias Spors) | sí |
| «bow upwards from the bed» | `warping-at-corners…:57` dice **bows** | **NO** |
| «a rough surface on the top» | `warping-at-corners…:58` (Neophyl) | sí |
| «Those pics just look like the under extrusion and gaps at the seams caused by the recent firmware/prusa slicer changes» | `warping-at-corners…:61-62` | sí |
| «These three steps resolve approximately 80 % of all warping and adhesion failures» | `bambu-wiki-warping…:105` | sí |
| «skin oils are the #1 cause» | `bambu-wiki-warping…:64` | sí |
| «Wash with warm water and dish soap. Rinse thoroughly and air-dry» | `bambu-wiki-warping…:109` | sí |
| «One of the most important setting to change when it comes to warping is the No cooling for the first X layers option» | `bambu-wiki-printed-model-warping…:53-54` | sí |
| «You should set your bed temperature higher and not lower (max 65°C)» | `adjusting-settings…:52` | sí |
| «From the gaps in your brim, I can say you can go a bit lower with your first layer height» | `adjusting-settings…:46-47` | sí |
| «Printing PLA or PETG in an enclosure might not be a good idea» | `prusa-kb-warping…:77-78` | sí |
| «opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament» | `temperatura-cama-bambu-wiki…:85` y `:90` | sí |
| «warping is so small that it's hard to notice» | `bambu-wiki-warping…:51` | sí |

Las otras cuatro apariciones de «» no son citas de fuente: el nombre del hilo
«Warping at corners» (que es el título literal, `warping-at-corners…:11`), la palabra
«techo» y «para espantar las esquinas», que son las del propio artículo.

**Las nueve URLs de `sources`:** las nueve están en `wiki/raw/` con el mismo `url` en
el frontmatter del fichero correspondiente, y ninguna repetida. En el cuerpo hay una URL
que no es fuente: el issue 11914 de PrusaSlicer (línea 119). Sigue siendo un puntero
—aparece dentro del crudo ya capturado, `warping-at-corners…:68`, porque es lo que
Neophyl escribió— y no está en `sources`, que es donde no debería estar.

## Fallos, con dónde y qué hacer

### 1 · Importante · Una cita entrecomillada que no es literal

**Dónde:** sección «Antes de tocar nada», línea 105.

**Qué dice:** el warping real *«bow upwards from the bed»*.

**Por qué falla:** el crudo dice **«it bows upwards from the bed as Diem
describes»** (`wiki/raw/warping-pla-prusa-forum-warping-at-corners.md`, línea 57). La
cita del artículo no aparece en ningún fichero crudo: le falta una «s». Por la regla
que me has dado, esto basta para rechazar, y basta. **Lo etiqueto de «importante» y no
de «bloqueante» a propósito**, porque el alcance es una letra y no un caso inventado: no
hay ninguna frase falsa detrás, ni una persona cambiada, ni un hilo fusionado. Los tres
fallos de la revisión 3 eran otra cosa y mezclarlos aquí enseñaría la lección
equivocada. Lo que no debe pasar es que se normalice: una cita entrecomillada es una
transcripción, y transcribir no es parafrasear.

**Qué hacer:** escribir «bows upwards from the bed», o cortar la cita donde no haya que
conjugar: *«bow… upwards from the bed»* no sirve; mejor «it bows upwards from the bed»
o «bows upwards from the bed».

De paso, la misma frase da una afirmación que las fuentes no hacen: el artículo dice que
«quien responde lo pone así», y en el crudo Neophyl está **citando a Diem**
(«as Diem describes»). No es un error —las palabras son suyas y la atribución a Neophyl
es correcta—, pero si se completa la cita hasta el final aparece el matiz, y el matiz
convence más que la paráfrasis.

### 2 · Importante · Cuatro wikilinks a páginas que no existen, por tercera vez

**Dónde:** línea 123 (`[[separaciones-entre-capas|separaciones entre capas]]`), línea 368
(`[[enclosure-y-warping|Enclosure y warping]]`), línea 370
(`[[separaciones-entre-capas|Separaciones entre capas]]`), línea 372
(`[[adhesion-primera-capa|Adhesión en la primera capa]]`).

**Por qué falla:** en `src/content/wiki/` sólo hay `warping-pla.md` y
`temperatura-cama.md`. Las tres páginas destino no existen. Y el cooked relaciona este
tema con dos de ellas —«warping | separaciones entre capas» en `## Relaciones`, y
«Página propia que este tema sugiere: *enclosure y warping*»—, así que el enlace está
puesto justo donde la regla dice que no debe estar. `adhesion-primera-capa` ni siquiera
aparece en el cooked: es una página inventada aquí.

**Es la tercera revisión consecutiva que bloquea por esto.** La 1 lo pidió, la 2 lo dio
por arreglado («las tres páginas futuras se nombran como texto y las tres llevan detrás
“Todavía no escrita”»), y la 3 lo encontró otra vez, y esta es la cuarta vez que sigue
puesto. La marca de «todavía no escrita», que la revisión 2 había visto, ya no está en
ninguno de los cuatro sitios.

**Qué hacer:** quitar los cuatro y dejarlos como texto, o escribir las tres páginas antes
de volver a enlazar. Y si de verdad la norma ha cambiado y los wikilinks a páginas
planificadas están permitidos, cambiarlo por escrito y fuera de un informe de revisión,
como ya sugirió la revisión 3: `temperatura-cama.md` hace lo mismo con cuatro
enlaces, así que hoy los dos archivos tienen el mismo fallo.

### 3 · Menor · «Nada de esto lleva a la cuenta de material», sin corregir

**Dónde:** «Lo que este artículo no te va a resolver», línea 356.

**Qué dice:** «**Una cifra de coste.** Nada de esto lleva a la cuenta de material.»

**Por qué falla:** es el punto 6 de la revisión 3, íntegro. No está en
`wiki/cooked/warping-pla.md`, ni en `## Afirmaciones` ni en `## Sin respaldo`. Es una
afirmación sobre lo que las fuentes cubren, hecha sin ninguna fuente, y va en una
sección cuya función es justamente decir qué queda fuera.

**Qué hacer:** quitar la segunda frase, o dejarla como alcance del artículo y no como
algo que las fuentes digan: «aquí no vamos a calcular coste por gramo».

## Notas que no bloquean

- **Las cifras del artículo, todas.** Las he vuelto a abrir una a una en el crudo y todas
  están donde deben: `+5–10 °C` y «Add a Brim or Brim Ears» (`bambu-wiki-warping:18-19`),
  «Cool Plate (35 °C for PLA)» y «Textured PEI Plate (needs 55–65 °C for PLA)»
  (`:71-72`), «0.04 mm automatically during levelling» (`:75`), «Target 55 – 65 °C on
  Textured PEI. Also add a Brim (8–10 mm wide)» (`:133`), «Switch to Gyroid at ≤25 %»
  (`:167`), «If the room is below 20 °C… even with PLA and PETG» (`:199`), «increase bed
  temperature by an additional +10 °C» (`:202`), «Enable supports for tall or thin
  models» (`:28`), «skin oils are the #1 cause» (`:64`), cama a 50 y luego 40 °C y
  ambiente a unos 20 °C (`adjusting-settings:20-25`), y en la Knowledge Base de Prusa el
  10-20 % de ventilador (`:60`), el aviso de que demasiado ventilador levanta la pieza
  entera (`:63`) y el PC-Blend con bajar velocidad (`:88-89`). La tabla por chapa de
  Bambu da `35 - 45 ℃ | 45 - 65 ℃ | 45 - 65 ℃ | 45 - 65 ℃` y el umbral de 45 ℃ para
  abrir la puerta (`temperatura-cama-bambu-wiki:97` y `:84`), que es lo que el artículo
  dice. Y la afirmación negativa más incómoda de comprobar también sale: la Knowledge
  Base de warping de Prusa habla de Live Adjust Z (`:48`) y de brim, y **no** contiene
  ninguna cifra de temperatura de cama.
- **Dos atribuciones que podrían parecer cambiadas y no lo están.** El «It is unlikely
  to be filament or temperature related» es de **Diem**, no de quien abrió el hilo
  (`warping-at-corners:96`, post del 30/11/2024), y así se atribuye en la línea 360. Y el
  «The imediate cause of warping is thermal contraction of long runs of filament» también
  es suyo (`:35`). Ambas correctas.
- **Un nombre que aparece dos veces sin nombrarlo.** Quien «cerró el caso de 2019» con el
  chaflán (línea 81) y quien «abrió aquel hilo» y probó la cama a 50 y 40 °C (línea 298)
  son la misma persona, Zakalawe. Ninguna de las dos frases es falsa, pero como el
  artículo no lo nombra en ninguna de las dos, se lee como si fueran dos. Conviene o
  nombrarlo las dos veces o decir «en el mismo hilo, el mismo autor».
- **El chaflán del laminador es la única afirmación técnica del artículo que no he
  podido encontrar en ningún crudo.** «el laminador sólo trae chaflán de esquina y no de
  arista» (líneas 86 y 305) viene de `wiki/cooked/warping-pla.md:44-46`, pero en
  `wiki/raw/` no hay ni una línea que hable de las herramientas del laminador: las cinco
  fuentes son dos hilos de foro y tres páginas de wiki. No lo cuento como fallo porque la
  comprobación 1 se cumple —está cocinado—, pero es una afirmación sobre la interfaz de
  Bambu Studio que hoy no tiene fuente que la sostenga. Cuando se vuelva a cocinar, merece
  una.
- **La resolución de la temperatura de cama sigue siendo lo mejor del artículo**, con la
  tabla de las seis cifras y su columna de origen, la chapa como variable que faltaba,
  el error explicado en las dos direcciones, el margen que cambia entre fabricantes y el
  65 °C del foro marcado como cifra respaldada por un fabricante pero **no** como techo.
  Ningún sitio elige un valor por encima de otro. Las otras dos contradicciones —ventilador
  y relleno— también están resueltas con matiz.
- **El diagnóstico diferencial** (la tabla que separa warping de separaciones entre
  capas) sigue sin estar copiada de ninguna fuente: es síntesis, y es la parte que más
  valor da.
- **«Qué puede salir mal» tiene contenido real** y ha crecido otra vez: nueve casos, ocho
  con cifras, y ahora dos de ellos son avisos sobre los errores de este mismo artículo
  («Buscar el chaflán de arista en el laminador», «Encadenar dos hilos distintos»). Es
  exactamente lo que hace que esta vuelta aclare el chaflán sin ambigüedad.
- **Ninguna frase prohibida.** No hay «en resumen», «es importante destacar», «cabe
  destacar» ni nada parecido. La prosa se calibra en dos momentos («lo dejamos dicho»,
  «no queremos resumir en una línea») y son aceptables. Ningún párrafo sin dato.
- **Estructura:** un solo `<h1>` (el de la línea 26; los `#` de las líneas 19-22 son
  comentarios del frontmatter, no títulos). Orden correcto: problema → por qué ocurre →
  cómo se resuelve → qué probar. `slug: warping-pla` coincide con el nombre del fichero.
  Los `campo: [warpingRisk, riskLevel]` del panel siguen bien puestos.

## Resumen para el redactor

Los cuatro encargados están hechos y bien hechos. Lo que queda son tres cosas, y sólo
una es de fondo:

1. **Importante.** La cita de la línea 105 no es literal: el crudo dice «bows upwards
   from the bed». Cita literal o cita cortada donde no haya que conjugar.
2. **Importante.** Quitar los cuatro wikilinks a `separaciones-entre-capas`,
   `enclosure-y-warping` y `adhesion-primera-capa` (líneas 123, 368, 370 y 372), o
   escribir esas páginas antes. Es la tercera revisión que lo dice.
3. **Menor.** Quitar «Nada de esto lleva a la cuenta de material» (línea 356), o
   reformularlo como alcance del artículo.

Nada de esto son ya las tres afirmaciones falsas: ninguna cita inventada, ninguna
persona cambiada, ningún hilo fundido. El artículo está a un paso de pasar.