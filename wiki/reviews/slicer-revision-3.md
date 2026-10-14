# Revisión de slicer (tercera vuelta)

**Veredicto: APROBADO** — 0 fallos.

Fecha: 2026-10-13

Guía revisada: `src/content/guias/slicer.ts` (420 líneas, slug `slicer`)
Material cocinado: `wiki/cooked/slicer.md`
Fuentes crudas: nueve en `wiki/raw/` — cinco `slicer-prusa-kb-*`
(`prusaslicer-general-info`, `first-print-with-prusaslicer`, `faq-prusaslicer`,
`binary-g-code`, `prusament-tpu-95a-material-guide`), dos `slicer-bambu-wiki-*`
(`slicing-parameters`, `view-slicing-information`),
`slicer-orcaslicer-wiki-g-code-output` y `slicer-cura-wiki-start-end-g-code`.

Vueltas anteriores: `wiki/reviews/slicer-revision-1.md` — RECHAZADO con tres
fallos (uno bloqueante), y `wiki/reviews/slicer-revision-2.md` — APROBADO con
cero. Esta revisión arranca de las notas de la segunda y del encargo concreto de
esta vuelta: **verificar que las dos correcciones sobre el analizador son ciertas
contra el código**, y que ninguna de las nueve fuentes lista la cabecera real ni
los comentarios concretos de un G-code.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA — 3 comprobaciones, 2 variables, 14 tarjetas, 10 reglas |
| 5 | Citas correctas y accesibles | PASA — 9 URLs, 6 citas, ninguna repetida |

`npm run verify:guias`: **296/296 comprobaciones aprobadas**, incluida la de
`slicer`. El árbol de trabajo está limpio: la guía en disco es la committeada
(`c0ae08f`).

## El encargo de esta vuelta, punto por punto

| # | Punto | Estado |
|---|---|---|
| 1 | `parseGcode` lanza `NO_METADATA_MESSAGE` sin firma | **PASA** — cierto, ver abajo |
| 2 | No se construye metadata con `slicer: 'unknown'` | **PASA** — cierto, ver abajo |
| 3 | La corrección es fiel al código | **PASA** — la tarjeta `sin-firma` dice lo que el código hace, y ni más ni menos |
| 4 | Ninguna afirmación sobre comentarios concretos de cabecera fuera de las fuentes | **PASA** — no aparece ni uno |
| 5 | Cada afirmación técnica está en el cocinado con su fuente | **PASA** |
| 6 | Cada URL de `sources` está en `wiki/raw/` con esa misma URL | **PASA** — las nueve, una a una |
| 7 | Las contradicciones se declaran con su matiz | **PASA** — las cinco del cocinado |
| 8 | Nada de relleno | **PASA** |

### 1 y 2 · Las dos afirmaciones sobre el analizador, contra el código

Lo que la guía afirma en la tarjeta `sin-firma`
(`src/content/guias/slicer.ts:238-243`):

> «Esta app lee la cabecera del fichero y busca la firma de una de las tres
> familias que sabe leer; si no aparece ninguna, el análisis se detiene y el
> panel pide volver a exportar el G-code desde el slicer para que incluya la
> cabecera con los ajustes. Las dos causas que el analizador admite son un
> fichero truncado y un programa que no escribe cabecera. El analizador también
> agrupa por familias: OrcaSlicer, Bambu Studio y los forks de Creality comparten
> convención y no se distinguen entre sí, igual que PrusaSlicer y SuperSlicer.»

**Afirmación A — «el análisis se detiene» sin firma.** Cierta.

`detectSlicer()` (`src/services/ParserService.ts:281-287`) recorre las tres
tablas de `SIGNALS_BY_SLICER` y, si ninguna casa, `return 'unknown'`. En
`parseGcode` (`:355-365`) el `switch` entra en `case 'unknown': break;`, cae al
final de la función y ejecuta `throw new Error(NO_METADATA_MESSAGE)`. No hay
camino que continúe. El mensaje literal (`:296-297`):

> «No se han encontrado metadatos de impresión en la cabecera del archivo.
> Puede que el G-code esté truncado o que el slicer no escriba cabecera.»

**Las dos causas que la guía nombra —fichero truncado y programa que no escribe
cabecera— son literalmente las dos del mensaje.** No hay una tercera inventada.

**Afirmación B — «el panel pide volver a exportar el G-code desde el slicer».**
Cierta en la sustancia.

La cadena real es: `parseGcode` lanza → `AnalysisContext` captura
(`src/state/AnalysisContext.tsx:120-124`), llama a `toErrorMessage(error)` y
guarda `setAnalysisStatus('error')` → `AnalysisPanel`, en `status === 'error'`
(`src/components/AnalysisPanel.tsx:119-125`), pinta **el texto de la excepción**,
que es la misma cadena que `UNSUPPORTED_MESSAGE.gcode` (`:81-83`, «Vuelve a
exportarlo desde el slicer para que incluya la cabecera con los ajustes»). Y lo
dice el propio código donde importa: `NO_METADATA_MESSAGE` está documentada como
*«Es el mismo texto que usa el panel en su estado `unsupported` para el caso "es
un G-code pero sin metadatos": el usuario ve el mismo motivo se detects o no la
cabecera»* (`ParserService.ts:289-294`).

La guía dice «el análisis se detiene y el panel pide volver a exportar», y eso es
exactamente lo que ocurre. La diferencia de estado interno (`error` frente a
`unsupported`) no cambia el texto ni la indicación.

**Afirmación C — «no se construye metadata con `slicer: 'unknown'`». Cierta**, y
es la que la vuelta anterior no pudo verificar del todo.

Los dos sitios donde se construye un `ProjectMetadata` son `extractCura` y
`extractPrusaOrca` (`ParserService.ts:410-432` y `:444-463`). El primero escribe
`slicer: 'cura'` (`:424`) a mano; el segundo escribe `slicer: detectSlicer(header)`
(`:454`), que dentro de esa rama sólo puede devolver `'cura'`, `'prusa'` u
`'orca'`. **En ningún camino se construye un objeto con `slicer: 'unknown'`.**
`'unknown'` existe en `SlicerKind` (`src/services/types.ts:29`) y en
`SLICER_LABEL` (`src/lib/tu-archivo.ts:139`) como *«un valor real y persistente»*
del contrato, pero no como salida del parser.

**Resultado: las dos correcciones son ciertas, y la tarjeta que las recoge es
fiel al código.** La guía ya no dice que «los demás valores se leen igual» ni que
«el analizador escribe Desconocido» —ninguna de las dos era cierta, y ahora no
están—. Se queda con lo que sí sostiene: que el análisis se detiene, que el panel
pide re-exportar, que hay dos causas, y que el agrupamiento por familias es cosa
del analizador.

**Sobre el agrupamiento por familias**: `ORCA_SIGNALS` lleva las firmas de
OrcaSlicer, BambuStudio **y** Creality Print, y las tres caen en el mismo
`case 'orca'` del `switch`; `PRUSA_SIGNALS` lleva PrusaSlicer y SuperSlicer, y
las dos caen en `case 'prusa'`. Es exactamente lo que la guía describe. Y
`SlicerKind` no tiene `'bambu'`, así que la opción `bambu` de la variable sólo
puede marcarse a mano, nunca venir precontestada: la guía no promete lo contrario.

### 2 · El hueco del cocinado, obedecido al pie de la letra

`wiki/cooked/slicer.md:19-28` prohíbe, con el aviso que condiciona todo el
apartado, que aparezca *«una lista de comentarios de cabecera tipo
`; generated by ...`, `; filament_type` o `; layer_height` atribuida a ninguno de
los tres slicers»*. Y `## Tirado` (`:743-746`) repite que «OrcaSlicer escribe en
la cabecera comentarios como…» se tiró porque no está en ninguna de las nueve.

**`grep` sobre la guía de `; generated`, `filament_type`, `layer_height`, `;TIME`,
`;Material`, `PRINT_TEMPERATURE`, `BED_TEMPERATURE`, `;Support`, `EXCLUDE`,
`total filament` y `nozzle_temperatur`: cero resultados.** No se coló ninguno.

Lo que sí hay, y es lo permitido:

- el booleano `gcode_comments` / «Verbose G-code» de Orca, con su coste
  declarado, en `metadato` (`:172`), `orca-verbose` (`:285-294`) y `visibilidad`
  (`:221`);
- los marcadores de posición de Cura, con la distinción correcta de que el valor
  acaba en la **instrucción** (`M140 S50.0`) y no en un comentario, y que el
  comentario del ejemplo lo escribe quien configura el perfil (`metadato`,
  `cura-plantillas`, `:312-313`);
- la plantilla de nombre de fichero de Orca con su ejemplo literal
  `OrcaCube_PLA_1h15m.gcode` (`:172`);
- el `M104 S250` de Bambu como **instrucción** concreta, no como comentario
  (`temperatura-capa`, `:195`).

Ninguno de los cuatro es un comentario de cabecera atribuido a un slicer. Los
cuatro están en `wiki/raw/`:
`M140 S50.0` en `slicer-cura-wiki-start-end-g-code.md:72`;
`OrcaCube_PLA_1h15m.gcode` en `slicer-orcaslicer-wiki-g-code-output.md:93`;
`M104 S250` en `slicer-bambu-wiki-view-slicing-information.md:110`;
`--gcode-comments=1` en `slicer-orcaslicer-wiki-g-code-output.md:37`.

La tarjeta `hueco` (`:175-178`) declara los tres huecos como huecos —la cabecera
real, el nombre literal del tag del diálogo de guardado, y si un `.bgcode`
conserva los mismos metadatos que el ASCII— y la cuarta entrada de
`fueraDeAlcance` (`:366-370`) sostiene lo mismo sin `guia`, que es la forma
correcta de mencionar un caso que no tiene página.

### 3 · Cada afirmación técnica, contra el crudo

Las cifras, una a una:

| Cifra | Dónde | Crudo |
|---|---|---|
| `0,15–0,20 mm` | `recorrido` (`:143`) | `first-print…:66-67`, *«we suggest using 0.15 or 0.2 mm layers»* |
| `15 %` | `recorrido`, cuerpo (`:142`) | `first-print…:87-88`, *«Generally, values around 15% work well.»* |
| STL, STEP, 3MF, OBJ, AMF | `recorrido` (`:142`) | `first-print…:35`, literal |
| `Everywhere` / `On build plate only` | `soportes` (`:202`) | `first-print…:75-76`, literal |
| `5 % → 20 %` | `niveles` (`:210`) | `slicing-parameters…:92-106` |
| `< 1 min` | `estimacion` (`:228`) | `faq-prusaslicer…:77-80`, con la condición del perfil correcto |
| `~70 %` | `binario` (`:236`) | `binary-g-code…:35-36`, *«reduces the average size by about 70%»* |
| `--gcode-comments=1` | `orca-verbose`, en `valor` (`:287`) | `orcaslicer…:37`, *«CLI Example»* |
| `2.7.0` / `5.1.0` | `binario` (`:235`) | `binary-g-code…:43-44` y `:56-57` |

Versiones, rutas y nombres propios, todos literales:
`Printers → General → Support binary G-code`, `File → Convert`,
`Configuration → Preferences → Other` (`binary-g-code…:42-51`);
`Preferences → Configure Cura… → Printers → Machine Settings`
(`cura…:32-33`); los cuatro puntos de inserción y los dos avisos con ⚠️
(`cura…:18-28`, `:39-41`); los modos Advanced / Developer de Orca
(`orcaslicer…:19`, `:34`, `:44-45`); *«This is only visible when in PrusaSlicer
Expert Mode»* (`prusament-tpu-95a…:116`); *«Because each layer rests on top of
the previous one…»* (`first-print…:71-73`); la carpeta `snapshots`
(`faq-prusaslicer…:47-52`).

Y los cuatro grandes bloques, cada uno contra su fuente:

- **`que-es`** — definición y producto del slicer, contra
  `prusaslicer-general-info…:17-19` y `first-print…:21-22`; gratuito y
  open-source, contra `faq-prusaslicer…:23`; la comunidad y los perfiles
  importados a mano, contra `faq-prusaslicer…:28-32`.
- **`perfiles` / `frontera`** — las tres categorías y el contenido de cada
  preset, contra `slicing-parameters…:15-47`; las tres pestañas de Prusa, contra
  `prusaslicer-general-info…:40-46`; la retracción en Printers y el flow ratio en
  filamento, contra `:45` y `slicing-parameters…:40`. **La retracción no aparece
  en ninguna de las tres listas de Bambu**: `grep -ic "retract"` sobre
  `slicer-bambu-wiki-slicing-parameters.md` da **0**.
- **`calcula`** — lo que muestra el visor capa a capa, contra
  `view-slicing…:13-16`, `:20-79`; altura de capa como resolución vertical
  (`:38-41`); ancho de línea (`:47-49`); caudal y su fórmula (`:57-61`); pausas
  y G-code propio por capa (`:14-16`, `:100-113`).
- **`binario`** — qué es el binario y por qué existe (causalidad ya enderezada en
  la vuelta anterior: el origen es el peso del fichero, la limitación del
  hardware es el obstáculo), contra `binary-g-code…:21-26`.

### 4 · Las cinco contradicciones del cocinado, declaradas y sin resolverse

| Contradicción | Dónde | Estado |
|---|---|---|
| 1. La frontera de las tres categorías | `frontera` (`:163-166`) | PASA — retracción en Printers (Prusa) frente a flow ratio en filamento (Bambu), y «ninguna de las dos fuentes declara la equivalencia»; se descarta expresamente la taxonomía compartida |
| 2. Dónde vive el metadato | `metadato` (`:169-172`) | PASA — tres modelos (booleano de Orca, marcadores de Cura, nombre de fichero) y «ninguna vale para las otras dos» |
| 3. Temperatura de boquilla por capa | `temperatura-capa` (`:192-195`) | PASA — la constante acotada a un filamento y al visor, y el `M104 S250` de la misma página como caso contrario |
| 4. Soportes automáticos sí, de árbol no | `soportes` (`:199-202`) | PASA — el «at least for the time being» con su matiz temporal y la advertencia de no generalizar el «no» |
| 5. Qué se puede guardar o ni ver | `niveles` + `visibilidad` (`:206-221`) | PASA — tres caminos (aplicabilidad, modo de interfaz, nivel de visibilidad) y «un ajuste que no aparece no significa que el slicer no lo aplique» |

Ninguna se resuelve eligiendo una fuente en silencio: las cinco llevan su matiz
en el cuerpo de la tarjeta, y `visibilidad` (`:221`) lleva la negrita sobre la
conclusión. Las dos notas de recolector que se contradicen mutuamente en la
contradicción 1 —la de Prusa llamándolo «equivalente exacto» y la de Bambu
diciendo que la frontera no cae en el mismo sitio— están recogidas en el cocinado
como *«las dos notas están en `wiki/raw/` y se contradicen»*, y la guía no
presenta ninguna de las dos como resuelta.

### 5 · Las seis citas literales, contra el crudo

Los ficheros de este lote están partidos a 80 columnas, así que cada cita se ha
buscado **por mitades**; las seis cruzan un salto de línea y ninguna aparece con
un `grep` del fragmento entero:

1. «To start printing, you need to convert your model to layer-by-layer
   instructions for the printer with a slicer.» → `prusaslicer-general-info…:17-18`
2. «offer very good print quality at reasonable print times» → `first-print…:66-67`
3. «These parameters are divided into three categories: printer, filament and
   process» → `slicing-parameters…:16-17`
4. «Usually, if the same parameter is set in multiple levels at different values,
   the value from the smallest level will be used.» → `slicing-parameters…:85-86`
5. «Maximum volumetric flow rate = cross-sectional area of extruded line *
   maximum printing speed» → `view-slicing…:59-61`
6. «at least for the time being» → `faq-prusaslicer…:72-73`

Atribución, exactitud y contexto, una por una. **Atribución**: la 1 y la 2 son de
Prusa, la 3, 4 y 5 de Bambu, la 6 de la FAQ de Prusa; cada una está en la
intervención de la casa que se le atribuye. **Exactitud**: ninguna convierte un
condicional en resultado —la 4 conserva el «Usually» tanto en el cuerpo («la
regla general es que…») como en la cita, y la 6 se da como «no con matiz
temporal», que es lo que dice la fuente. **Contexto**: los nombres propios son
los de la fuente —`gcode_comments`, `gcode_add_line_number`, `M104 S250`,
`M140 S50.0`, `OrcaCube_PLA_1h15m.gcode`, `snapshots`— y ninguno está cambiado de
herramienta ni de casa. Las tres preguntas pasan.

### 6 · Los `sources` y la estructura

Las nueve URLs de `fuentes` (`:373-418`) son, una a una, el `url:` de frontmatter
de los nueve crudos, sin una repetida:

| URL de la guía | Fichero crudo |
|---|---|
| `help.prusa3d.com/article/prusaslicer-general-info_1910` | `slicer-prusa-kb-prusaslicer-general-info.md` |
| `help.prusa3d.com/article/first-print-with-prusaslicer_1753` | `slicer-prusa-kb-first-print-with-prusaslicer.md` |
| `help.prusa3d.com/article/faq-prusaslicer_1789` | `slicer-prusa-kb-faq-prusaslicer.md` |
| `help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653` | `slicer-prusa-kb-prusament-tpu-95a-material-guide.md` |
| `help.prusa3d.com/article/binary-g-code_646763` | `slicer-prusa-kb-binary-g-code.md` |
| `wiki.bambulab.com/en/software/bambu-studio/how-to-set-slicing-parameters` | `slicer-bambu-wiki-slicing-parameters.md` |
| `wiki.bambulab.com/en/software/bambu-studio/view-slicing-information` | `slicer-bambu-wiki-view-slicing-information.md` |
| `www.orcaslicer.com/wiki/print_settings/others/others_settings_g_code_output.html` | `slicer-orcaslicer-wiki-g-code-output.md` |
| `github.com/Ultimaker/Cura/wiki/Start-End-G%E2%80%90Code` | `slicer-cura-wiki-start-end-g-code.md` |

`quien` y `que` describen cada documento correctamente. La primera cita está en
la línea 132, en la primera mitad del fichero.

- **Diferencial**: abre la guía, tres comprobaciones (`origen`,
  `previsualizacion`, `perfil`), cada una con `si` y `no` —ninguna de una sola
  cara— y salida a `warping-pla`. Las tres se contestan mirando, sin tocar ajustes.
- **Variables**: `slicer` (necesaria) y `formato`, las dos con `para`. Ninguna
  decorativa: `slicer` dispara cinco reglas (`orca-verbose`, `bambu-visor`,
  `cura-plantillas`, `prusa-snapshots`, `sin-firma`) y una tarjeta; `formato`
  dispara una regla y una tarjeta (`binario`, `binario-convertir`).
- **Reglas**: diez, todas con `porque`, `fuente` y `alcance`. Las seis
  condicionadas apuntan sólo a opciones que existen, así que no hay ninguna regla
  muerta. `orca-verbose` lleva su cifra en `valor`. Las reglas con número llevan
  su `alcance`.
- **Conocimiento filtrado por variables**: `binario` con
  `cuando: { formato: 'binario' }` y `sin-firma` con
  `cuando: { slicer: 'desconocido' }`. Las tarjetas de metadato hablan de las
  tres casas a la vez y por eso no llevan filtro, que es lo correcto: filtrarlas
  dejaría sin explicación las dos casas que no están marcadas.
- **`fueraDeAlcance`**: cuatro entradas concretas, con qué caso no entra, por qué
  y a dónde llevarlo. Las tres primeras llevan `guia` y los tres slugs existen
  (`warping-pla`, `separaciones-entre-capas`, `adhesion-primera-capa`); la cuarta
  nombra el caso sin `guia`, que es la forma correcta.
- **Enlaces**: los cinco `enlaza` (`altura-capa`, `material`,
  `temperatura-hotend`, `voladizos-y-soportes`) y el `siNo` apuntan a slugs
  existentes. Ninguno apunta al nombre del fichero. No hay sintaxis `[[slug]]`
  del formato viejo.
- **Relleno y frases de IA**: `grep` de las seis frases canónicas, cero. Ninguna
  tarjeta ni ninguna regla existe sin datos: todas llevan cifra, cita, versión,
  ruta o atribución nombrada. `entrada` es un párrafo con dato, no un titular.
- **`campos: ['slicer']`** a nivel de guía y de variable es el patrón que ya
  usan `material`, `altura-capa` y `temperatura-hotend`, y no apunta a dos sitios
  distintos.

### Nada de «Tirado»

Los siete apartados de `## Tirado` (`wiki/cooked/slicer.md:743-768`) siguen
fuera: la lista de comentarios de cabecera, «Cura documenta sus metadatos como
comentarios», «un `.bgcode` no lleva / lleva los comentarios», el nombre del tag,
el perfil de calidad dentro del fichero, la taxonomía común de las tres
categorías, «PrusaSlicer no tiene soportes automáticos» y «la temperatura es
constante». Las dos tablas de «Revisado y no incorporado» también se respetan:
las cifras de TPU (220-240 °C, 55-75 °C), el secado, las rutas de `snapshots`
una a una y las variables `initial_layer_bb_*` / `total_bb_*` una por una no
aparecen.

## Notas que no bloquean

- **El comentario de cabecera de la guía sigue contando mal las reglas**
  (`:36-38`): dice «sin la variable, cuatro de las seis reglas condicionadas no
  podrían existir». Las condicionadas son seis y **cinco** dependen de `slicer`
  (`orca-verbose`, `bambu-visor`, `cura-plantillas`, `prusa-snapshots` y
  `sin-firma`), no cuatro. Es un comentario de desarrollo, no se renderiza, pero
  si alguien lo usa como documentación se lleva un número que no cuadra. Apuntado
  ya en la vuelta anterior.
- **Dos frases sin fuente en `revisa-salida`** (`:261`): «Es la comprobación que
  casi nadie hace» es una afirmación sobre la conducta de la gente, y «la única
  que ve el fichero real que va a correr» un superlativo. Ninguna de las nueve
  fuentes las sostiene. No reintroducen el fallo de la primera vuelta —no afirman
  que sea el único modo de saber qué contiene el fichero, y no contradicen a
  `bambu-visor`, cuyo `alcance` establece la distinción—, pero podrían quedar en
  «es la comprobación que ninguna otra te da: lo que hay escrito dentro, no lo
  que el programa muestra en pantalla».
- **`que-es` generaliza atributos de PrusaSlicer** (`:131`): «Es gratuito, de
  código abierto, y no está atado a una marca de impresora» sale de la FAQ, que
  habla de PrusaSlicer, y la tarjeta habla de «un slicer» en general. Cierto para
  los cuatro del lote, pero la fuente sólo lo afirma de uno.
- **«Dos avisos» nombra dos cosas distintas en la misma guía**: en `revisa-salida`
  (`:260`) son las dos cláusulas del único ⚠️ de Cura sobre editar; en
  `cura-plantillas` (`:308`), los dos bloques ⚠️ de la página. Las dos lecturas
  son correctas respecto al crudo, pero contar con el mismo número cosas
  distintas invita a la confusión.
- **`estimacion` en `perfil-aplicado`** (`:252`): «que es de lo más preciso del
  programa» es un superlativo que la fuente no contiene —dice «Very accurate»—,
  aunque la condición del perfil correcto sí está.
- **`recorrido` da la cifra de altura de capa como rango** («0,15–0,20 mm`, `:143`)
  cuando la fuente da dos valores concretos y separados («0.15 or 0.2 mm»). No es
  una invención —los dos extremos son literales— pero el guion sugiere un continuo
  que la fuente no afirma.
- **Para el pipeline, no para la guía:** si en algún barrido `verify:fuentes` marca
  las dos URLs de Prusa KB como cambiadas de tamaño, es motivo de reprocesar por
  el cocinero, no de tocar la guía: el contenido que sostiene las afirmaciones
  está intacto.

## Conclusión

Las dos correcciones sobre el analizador que pedía esta vuelta son ciertas, y las
he comprobado contra el código y no contra el cocinado: `parseGcode` lanza
`NO_METADATA_MESSAGE` cuando `detectSlicer` devuelve `'unknown'` —el `switch` cae
en `break` y la función acaba en `throw`—, y ningún camino construye un
`ProjectMetadata` con `slicer: 'unknown'`; el analizador escribe `'cura'` a mano
en un extractor y `detectSlicer(header)` en el otro, donde esa llamada sólo puede
devolver uno de los tres valores conocidos. La tarjeta `sin-firma` cuenta
exactamente eso y nada más, y el matiz del estado del panel (`error` frente a
`unsupported`) no cambia el texto que ve quien lee.

El hueco más caro del lote se obedece: **ni un comentario de cabecera inventado**.
Los únicos fragmentos de G-code que nombra la guía son los cuatro que están
literalmente en las fuentes —`M140 S50.0`, `M104 S250`,
`OrcaCube_PLA_1h15m.gcode` y `--gcode-comments=1`—, todos ellos instrucciones,
plantillas de nombre o una opción de CLI, nunca una cabecera. Los tres huecos se
declaran como huecos en `hueco` y en la cuarta entrada de `fueraDeAlcance`.

Las cinco contradicciones del cocinado van como tarjetas con su matiz y ninguna
se resuelve eligiendo una fuente. Las nueve URLs son las de los crudos. Las seis
citas están en `wiki/raw/` y pasan atribución, exactitud y contexto.
`verify:guias` pasa entero, 296/296.

Lo que queda son siete apuntes de redacción y uno del pipeline, y ninguno cambia
una cifra ni atribuye nada a quien no lo dijo. **APROBADO.**

---

## Nota sobre esta revisión

El veredicto es sobre el fichero tal y como estaba el 2026-10-13, con el árbol de
trabajo limpio y la guía committeada en `c0ae08f`.
