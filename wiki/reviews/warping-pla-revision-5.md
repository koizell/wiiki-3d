# Revisión de warping-pla, quinta vuelta

**Veredicto: APROBADO.**

Artículo revisado: `src/content/wiki/warping-pla.md`
Fuentes cocinadas: `wiki/cooked/warping-pla.md`
Informes anteriores: `wiki/reviews/warping-pla-revision-1.md`, `-2.md`, `-3.md`, `-4.md`

Los tres encargados de la revisión 4 están hechos y bien hechos. Las dos reglas nuevas
se han aplicado tal como están escritas en `.opencode/agents/revisor.md`, y con ellas
el artículo pasa entero. No he encontrado nada que rejectar, y no he rebajado el listón
para que pasara.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **PASA** — 49 datos técnicos contrastados uno a uno |
| 2 | Contradicciones internas | **PASA** |
| 3 | Relleno y frases de IA | **PASA** |
| 4 | Longitud y estructura | **PASA** — 2.868 palabras propias, ~2.950 con las etiquetas de los enlaces |
| 5 | Citas correctas | **PASA** — 16 citas textuales literales en `wiki/raw/`, 9 URLs correctas, ninguna repetida |

## Los tres encargados de la revisión 4

| # | Encargo | Estado | Dónde y con qué comprobación |
|---|---|---|---|
| 1 | La cita «it bows upwards from the bed» literal | **CORREGIDO** | Línea 105. El crudo dice «Warping corners is when **it bows upwards from the bed** as Diem describes» (`warping-pla-prusa-forum-warping-at-corners.md:57`). La «s» está. `grep -F "it bows upwards from the bed"` → 1 resultado. Es la cita completa y literal, con el «it» que la revisión 4 pidió. |
| 2 | El punto 6 de «lo que no te va a resolver» | **CORREGIDO** | Líneas 356-357. Era «Una cifra de coste. Nada de esto lleva a la cuenta de material», que afirmaba algo sobre lo que las fuentes cubren sin fuente. Ahora es «No vamos a entrar en coste por gramo: hasta aquí sólo han entrado temperaturas, porcentajes y milímetros»: una frase sobre el alcance del artículo, que es exactamente lo que pidió la revisión 4. `grep` de la frase antigua en el artículo: cero resultados. |
| 3 | Zakalawe nombrado en los dos sitios | **CORREGIDO** | Las dos apariciones. Línea 81: «Quien cerró el caso de 2019 —**Zakalawe (@zakalawe)**, el mismo que abrió el hilo—». Línea 298: «**Zakalawe (@zakalawe)** abrió ese hilo probando cama a 50 °C y luego a 40 °C». El nombre y el handle coinciden con el frontmatter del crudo (`adjusting-settings-warping-pla.md:14`, «Zakalawe (@zakalawe) — New Member»). Ya no se lee como si fueran dos personas. |

Los cuatro fallos de fondo de las revisiones 1 a 3 siguen corregidos y no han vuelto:
el chaflán está atribuido a Fusion 360 y no al laminador, los radios de 3 mm van
separados y atribuidos a Elias Spors, el enclosure «sin tapa con espuma» no aparece
(`grep` de «espuma», «foam», «sin tapa»: cero resultados), y la cita «zero warping» no
aparece ni en el artículo ni en ningún crudo.

## La regla nueva de las citas: las dieciséis, una a una

Las he buscado todas en `wiki/raw/` por fragmento literal. **Las dieciséis están.**
Tres de ellas cruzan un salto de línea en el crudo, porque los ficheros parten a 80
columnas; en esos casos el `grep` del fragmento entero falla y hay que buscar por las
dos mitades. Lo dejo escrito porque es la forma en que un `grep` mal usado produce un
rechazo falso:

| Cita del artículo | Fichero crudo y línea | Literal |
|---|---|---|
| «Sharp angles can be more prone to warping» (75) | `adjusting-settings…:81` | sí |
| «I increased the bed temperature and chamfered the edges of the shape in Fusion, that seemed to make a big difference» (82) | `adjusting-settings…:96` + `:97` | sí, cruza línea |
| «seemed to» (87) | `adjusting-settings…:97` | sí |
| «I tried to round off the 90°-corners with 3mm radii but the crinkles remained» (92) | `warping-at-corners…:20` + `:21` | sí, cruza línea |
| «it bows upwards from the bed» (105) | `warping-at-corners…:57` | sí |
| «a rough surface on the top» (106) | `warping-at-corners…:58` | sí |
| «Those pics just look like the under extrusion and gaps at the seams caused by the recent firmware/prusa slicer changes» (116) | `warping-at-corners…:61` + `:62` | sí, cruza línea |
| «These three steps resolve approximately 80 % of all warping and adhesion failures» (130) | `bambu-wiki-warping…:105` | sí |
| «skin oils are the #1 cause» (136) | `bambu-wiki-warping…:64` | sí |
| «Wash with warm water and dish soap. Rinse thoroughly and air-dry» (137) | `bambu-wiki-warping…:109` | sí |
| «One of the most important setting to change when it comes to warping is the No cooling for the first X layers option» (145) | `bambu-wiki-printed-model-warping…:53` + `:54` | sí, cruza línea |
| «You should set your bed temperature higher and not lower (max 65°C)» (169) | `adjusting-settings…:52` | sí |
| «From the gaps in your brim, I can say you can go a bit lower with your first layer height» (247) | `adjusting-settings…:46` + `:47` | sí, cruza línea |
| «Printing PLA or PETG in an enclosure might not be a good idea» (271) | `prusa-knowledge-base-warping…:77` + `:78` | sí, cruza línea |
| «opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament» (288) | `temperatura-cama-bambu-wiki…:85` y `:90` | sí |
| «warping is so small that it's hard to notice» (337) | `bambu-wiki-warping…:51` | sí |

Las otras tres apariciones de «» no son citas de fuente: el título del hilo «Warping at
corners» (literal, `warping-at-corners…:11`), y las palabras «techo» y «para espantar
las esquinas», que son del propio artículo.

**Las nueve URLs de `sources`** están las nueve en `wiki/raw/` con el mismo `url` en el
frontmatter del fichero correspondiente, y ninguna repetida. La primera cita está en la
línea 32, y la mitad del cuerpo está en la línea 202: va en la primera mitad, como debe.

## La regla nueva de los `[[slug]]`

Los seis enlaces internos del artículo son `[[slug|texto]]`: `temperatura-cama` (dos
veces, y esa página existe), `separaciones-entre-capas` (dos), `enclosure-y-warping` y
`adhesion-primera-capa`. Por la regla nueva, **ninguno es un fallo**, y no los cuento.

Además, `grep` de `](/wiki/` en el artículo: **cero resultados**. No hay ni un solo
enlace de Markdown normal a una página interna, así que el único tipo de enlace roto que
la regla marca como fallo no aparece. La revisión 4 hallaba cuatro enlaces de este
tipo; se resuelve solo con la regla nueva, y no hace falta tocar el artículo.

De las cuatro páginas nombradas, tres las propone el material cocinado —«warping |
separaciones entre capas» y «Página propia que este tema sugiere: *enclosure y
warping*» en `## Relaciones`, y `[[temperatura-cama|Temperatura de cama]]` en la propia
tabla de la contradicción 1—, que es justo lo que la regla pide. La cuarta,
`adhesion-primera-capa`, no sale del cooked, pero el artículo la justifica en la misma
línea («que es la mitad de este artículo, pero merece su propia página»), y nombrarla
no es un fallo.

## Comprobación 1 · Los datos, uno a uno

Cuarenta y nueve cifras y afirmaciones técnicas. Las que son las que fallan cuando
fallan, o sea las que vienen de hilos de foro, están todas literales; el resto está en
`wiki/cooked/` y se ha vuelto a abrir en el crudo para no comprobar dos veces lo mismo:

- **Las seis cifras de cama de la tabla**, cada una en su fichero: `35 - 65 °C` para PLA
  por filamento y pegamento (`temperatura-cama-bambu…:67`), la fila por chapa
  `35 - 45 ℃ | 45 - 65 ℃ | 45 - 65 ℃ | 45 - 65 ℃` (`:97`), `PLA | No, -, No | 185-235 °C,
  50-60 °C` (`temperatura-cama-prusa-kb-filament-material-guide…:14`), `Recommended bed
  temperature: 60 °C` (`temperatura-cama-prusa-kb-pla…:18`) y `PLA | 180-220 | 50-60 |
  Ambient` (`temperatura-cama-orcaslicer…:25`). La columna de hardware de Prusa se llama
  literalmente `HARDWARE (Enclosure, Drybox, Hardened nozzle)` y el PLA es `No, -, No`:
  lo de «sin pedir enclosure, drybox ni boquilla endurecida» es exacto.
- **La afirmación negativa más incómoda de comprobar, y sale bien**: la Knowledge Base
  de warping de Prusa habla de Live Adjust Z (`:48`) y de brim, y **no contiene ninguna
  cifra de temperatura de cama**. `grep` de «bed temp» en ese fichero: cero resultados.
- **La afirmación que el cooked marca como no extrapolable**, y que el artículo trata
  bien: «Reduce speed and acceleration by 20–30 %» y «Enable
  supports for tall or thin models» (`bambu-wiki-warping…:27` y `:28`), y el PC-Blend de
  Prusa con bajar velocidad (`prusa-knowledge-base-warping…:86-91`). El artículo nombra
  las tres y se niega a aplicarlas al PLA, que es justo lo que pide
  `## Sin respaldo` del cooked («AFIRMACIÓN QUE SE HA IDO MÁS ALLÁ DE SUS FUENTES»).
- **El «0,04 mm»** está dos veces en el crudo, y el artículo lo repite en dos sitios
  coherentes entre sí (`bambu-wiki-warping…:75`,
  `bambu-wiki-printed-model-warping…:33`).
- **La inferencia sobre chaflán y radio va marcada como inferencia** (líneas 96-99:
  «aquí lo decimos como inferencia nuestra, no como dato de ninguna fuente»), que es lo
  que el cooked exigía. Y los dos hilos **no** se encadenan: hay dos párrafos y dos
  advertencias separados diciendo que no son una comparación.

## Comprobación 2 · Contradicciones internas

Pasa, y no por poco: es la parte mejor resuelta del artículo. Ningún parámetro aparece
con dos valores. La tabla de cama lista seis cifras, cada una con su origen, y el texto
no elige ninguna: explica que 35 y 55–65 son los dos extremos de la misma fila, que el
50–60 de Prusa y OrcaSlicer cae dentro del 45–65 de la Textured PEI, y que el 65 del
foro es el extremo alto del rango de Bambu pero **no** un techo. El ventilador se
resuelve diciendo que Bambu habla de las primeras capas y del auxiliar, y Prusa del
general durante el resto de la pieza. El enclosure se resuelve separando las dos
funciones que se estorban. El relleno se resuelve diciendo qué tiene respaldo oficial y
qué es una sola fuente de foro.

El único sitio donde una misma cifra podría leerse como dos attitude distintas —el 60 °C
de la ficha del PLA frente al 50–60 °C de la tabla de materiales— está resuelto en las
líneas 203-205, y además el artículo explica por qué conviven: «Son el mismo rango
leído con distinta anchura».

## Comprobación 3 · Relleno y frases de IA

Pasa. `grep` de las seis frases prohibidas: cero resultados. Ningún párrafo existe sólo
para llenar: el más corto con contenido, «Y hay tres cosas que deciden cuánto se
contrae» (línea 59), anuncia las tres que vienen detrás con sus tres cifras. Los
párrafos de transición son de una línea y están haciendo trabajo estructural.

## Comprobación 4 · Longitud y estructura

**2.868 palabras** con la convención de la revisión 4 (secuencias de letras y cifras,
sin el frontmatter y sin las URLs de los enlaces; ~2.950 si se cuentan también las
etiquetas visibles de los enlaces, y 2.418 con la convención más estricta de la
revisión 3). Triplica el mínimo de 800 con cualquiera de las tres.

Un solo `<h1>`, el de la línea 26, que es el título. Los `#` de las líneas 19-22 son
comentarios del frontmatter, no títulos. Orden correcto: problema → por qué ocurre →
cómo se resuelve → qué probar. `## Qué puede salir mal` existe y tiene nueve casos con
contenido real, ocho con cifras, y dos de ellos son avisos sobre los errores de este
mismo artículo. Frontmatter con `title`, `slug`, `date`, `sources` y `tags`, y
`slug: warping-pla` coincide con el nombre del fichero.

## Notas que no bloquean

- **«El laminador sólo trae chaflán de esquina y no de arista»** (líneas 86 y 305) sigue
  sin fuente en `wiki/raw/`. Viene de `wiki/cooked/warping-pla.md:44-46`, y como está
  cocinado la comprobación 1 se cumple, así que no es fallo. Pero es la única
  afirmación técnica del artículo que no tiene una línea cruda detrás, y es una
  afirmación sobre la interfaz de Bambu Studio. Cuando se vuelva a cocinar el tema,
  merece una fuente; si no, algún día habrá que bajarla del artículo.
- **El matiz de «as Diem describes».** La cita de la línea 105 es literal y la
  atribución a Neophyl es correcta —son sus palabras—, pero en el crudo Neophyl está
  citando a Diem. Si algún día se quiere el matiz completo, la propia cita da para
  él: basta con no cortar antes. No urge: hoy no dice nada falso.
- **El punto «Una cifra de coste»** dice «hasta aquí sólo han entrado temperaturas,
  porcentajes y milímetros», y en el artículo también hay años (2019, 2024) y una
  diferencia en grados. Es una enumeración retórica sobre el alcance del artículo, no
  una afirmación técnica, y no la cuento como imprecisión. Lo dejo anotado sólo porque
  es lo único que un lector meticuloso podría marcar.
- **Lo que ya no hay que hacer.** Este artículo no necesita otra vuelta de revisión por
  enlaces cruzados, que es lo que han bloqueado las revisiones 2, 3 y 4. Con la regla
  nueva esa comprobación ya no aplica a los `[[slug]]`, y el artículo no tiene ni un
  enlace de Markdown normal a una página interna.

## Conclusión

**APROBADO.** Las cinco comprobaciones pasan. Los tres encargados de la revisión 4
están hechos, y las dieciséis citas textuales son literales contra `wiki/raw/`, que es
la comprobación que más ha costado en este artículo y la que se ha hecho bien. La
resolución de las tres contradicciones —cama, ventilador, enclosure— sigue siendo lo
mejor del texto: no elige un número en ningún sitio y explica por qué todos existen a la
vez.
