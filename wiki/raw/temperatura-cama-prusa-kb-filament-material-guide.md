---
titulo: "Filament Material Guide"
url: https://help.prusa3d.com/filament-material-guide
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-03
autor: Prusa Research
idioma: en
---

Filament Material Guide

MATERIAL | HARDWARE (Enclosure, Drybox, Hardened nozzle) | TEMPERATURES (Nozzle, Bed)
PLA | No, -, No | 185-235 °C, 50-60 °C
PETG | No, No, No | 215-270 °C, 70-90 °C
PETG HT | No, No, No | 270 °C, 110 °C
Glow in the dark | No, No, Yes | 260 °C, 85 °C
ASA | Recommended, No, No | 220-275 °C, 90-110 °C
ABS | Recommended, No, No | 230-255 °C, 95-110 °C
PC (Polycarbonate) | Recommended, No, No | 270-275 °C, 100-115 °C
CPE | No, Yes, No | 275 °C, 90-110 °C
PVA / BVOH | No, Yes, No | 195-215 °C, 60 °C
HIPS | No, No, No | 225-255 °C, 100-110 °C
PP (Polypropylene) | -, No, No | 220-245 °C, 70-100 °C
Flex | No, -, No | 220-260 °C, 40-85 °C
nGen | No, No, No | 240 °C, 90 °C
PA (Nylon) | Recommended, Yes, No | 240-285 °C, 70-115 °C
Composite materials | -, -, Yes | 225-290 °C, 40-120 °C
Wood / metal filled | No, No, - | 190-270 °C, 60-100 °C
PVB | No, No, No | 215 °C, 75 °C
PEI | Yes Necessary 90-190 °C, Yes Necessary, No | 430 °C, 150 °C

The table also has a SHEETS group of six columns and a PHYSICAL FEATURES group of four.
The SHEETS column headers are: Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT.

## Notas del recolector

- URL comprobada: 200. Título: «Filament Material Guide | Prusa Knowledge Base».

- **Segunda fuente con cifras de cama de un fabricante distinto de Bambu**, que es lo
  que pedía el punto 1 del encargo. Contrasta material a material:

  | Material | Bambu | Prusa | OrcaSlicer |
  |---|---|---|---|
  | PLA | 35–65 °C | **50–60 °C** | 50–60 °C |
  | PETG | 60–80 °C | 70–90 °C | — |
  | ASA | 90–100 °C | 90–110 °C | 90–100 °C |
  | ABS | 90–100 °C | 95–110 °C | 90–100 °C |
  | PC | 100–120 °C | 100–115 °C | 100–120 °C |

  Para el artículo esto es tabla de contraste, no tabla para copiar. **Y hay un dato
  que corrige lo escrito antes en este repositorio**: `wiki/cooked/warping-pla.md`
  afirma en su apartado `## Tirado` que esta tabla «sale **aplastada en texto plano** y
  no es usable». No es cierto. Se lee.

- **Cómo se lee, porque el método es lo que hay que dejar escrito.** La página **no
  trae ni una etiqueta `<table>`**: son 0. La monta con `div` y atributos de ARIA, y
  las celdas se sacan por `role="cell"`. En el HTML servido hay 20 `role="row"` y 309
  `role="cell"`. Extrayendo celda a celda por ese atributo salen las 18 filas de
  material, y los valores concuerdan con los que devuelve la búsqueda.

  Por eso «no hay tabla en el HTML» y «la tabla no se puede leer» son cosas distintas,
  y la primera es cierta aquí.

- **Las columnas SHEETS no las he transcrito, y es una decisión, no un descuido.** En
  varias filas los valores se desalinean respecto a su cabecera: en PETG, «with glue
  stick» cae bajo Smooth PEI pero «Cleaned with water» no queda claro si es Satin o
  Special PA Nylon. Publicarlas mal atribuidas es peor que no publicarlas. Quien
  necesite la columna de chapa debe ir a la ficha del material, no a esta tabla.

- La fila de PEI viene **desalignada en el original**: la celda de enclosure arrastra
  el texto «Yes Necessary 90-190 °C», que parece una celda fundida de las columnas de
  propiedades físicas. Está así en la página y lo he dejado tal cual.

- Los rangos **no llevan tolerancia**. Esta tabla da cama y boquilla como rango y sin
  «±», al contrario que Bambu, que pone ±10 °C en boquilla. Quien compare las dos
  tablas tiene que saber que la diferencia de notación es de la fuente.

- La página **no tiene prosa alrededor de la tabla** que explique el porqué: es una
  tabla con botones de filtro y nada más. Para el punto 2 del encargo —por qué hay un
  rango y no una cifra— el material útil está en la wiki de OrcaSlicer.

- Relacionada con `wiki/raw/warping-pla-prusa-forum-adjusting-settings-warping-of-pla.md`,
  que da para PLA un techo de 65 °C. Esta tabla lo sitúa en 50–60 °C, así que el hilo
  y la tabla no dicen lo mismo y quien cocine tiene que dejarlo anotado como
  discrepancia entre un usuario y un fabricante, no como una cifra.

- No he traducido nada.
