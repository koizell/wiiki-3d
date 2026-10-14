# Revisión de slicer (segunda vuelta)

**Veredicto: APROBADO** — 0 fallos.

Fecha: 2026-10-13

Guía revisada: `src/content/guias/slicer.ts` (419 líneas, slug `slicer`)
Material cocinado: `wiki/cooked/slicer.md`
Fuentes crudas: nueve en `wiki/raw/` — cinco `slicer-prusa-kb-*`
(`prusaslicer-general-info`, `first-print-with-prusaslicer`, `faq-prusaslicer`,
`binary-g-code`, `prusament-tpu-95a-material-guide`), dos `slicer-bambu-wiki-*`
(`slicing-parameters`, `view-slicing-information`),
`slicer-orcaslicer-wiki-g-code-output` y `slicer-cura-wiki-start-end-g-code`.

Vuelta anterior: `wiki/reviews/slicer-revision-1.md` — RECHAZADO con tres fallos
(uno bloqueante). Esta revisión parte de esos tres, no de cero.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA — 3 comprobaciones, 2 variables, 14 tarjetas, 10 reglas |
| 5 | Citas correctas y accesibles | PASA — 9 URLs, 6 citas literales, ninguna repetida |

`npm run verify:guias`: **296/296 comprobaciones aprobadas**, incluida la de
`slicer`. `npm run verify:fuentes`: las nueve URLs del lote responden, ninguna
rota.

## El encargo de esta vuelta, punto por punto

| # | Punto | Estado |
|---|---|---|
| 1 | `revisa-salida` con `fuente: 'Ultimaker Cura'`, y el analizador fuera de la documentación de impresora | **PASA** |
| 2 | Fuera «la única forma» | **PASA** |
| 3 | `recorrido` acotada a PrusaSlicer y el 15 % como relleno | **PASA** |
| 4 | `niveles` manifiesta el «Usually» | **PASA** |
| 5 | `binario`: el motivo es el tamaño, el hardware es el obstáculo | **PASA** |
| 6 | `sin-firma` sin «los demás valores se leen igual» | **PASA** |

### 1 · La regla partida, y el analizador remitido a su tarjeta — resuelto

La regla se llama ahora `revisa-salida` (`:257`), con `fuente: 'Ultimaker Cura'`
(`:261`) y un `porque` que **sólo** dice lo que dice Cura: los dos avisos de su
página de Start/End G-code. Comprobado contra
`wiki/raw/slicer-cura-wiki-start-end-g-code.md:27-28` —«Editing the G-Code
manually can damage your printer. Always check the G-Code output before sending it
to the printer»—, que es exactamente lo que la regla enuncia. La Cura de
`cura-plantillas` (`:305-313`) tampoco ha cambiado de alcance.

El terreno del analizador quedó entero en la tarjeta `sin-firma` (`:238-243`) y
en la regla del mismo nombre (`:325-333`), con `fuente: 'El analizador de esta
app'`. He recorrido una a una todas las apariciones de «analizador» y de «panel»
en la guía: **ninguna atribuye un comportamiento del parser a
documentación de impresora**, y las dos que lo hacen explícito lo dicen al revés
—`sin-firma`: «Eso es cosa del analizador de esta app, no de la documentación de
ningún fabricante»; `revisa-salida` en su `alcance`: «Cómo se lee esa cabecera en
esta app es cosa del analizador, no de Cura»—. El `alcance` de `revisa-salida`
además recupera el hueco, que es lo que el `porque` prometía y no podía sostener.

### 2 · «La única forma» — fuera

`grep` de `única forma|se leen igual|only way` sobre la guía: **cero**. Las dos
afirmaciones que la revisión anterior pedía quitar no están. Queda una frase en
el `porque` de `revisa-salida` («la única que ve el fichero real que va a
correr») que ya no es el fallo de entonces: no afirma que sea el único modo de
saber qué contiene el fichero, y no contradice a `bambu-visor` ni a `calcula`,
porque el `alcance` de `bambu-visor` («Lo que muestra el visor no es lo que está
escrito en el fichero») establece justo esa distinción. La apunto en las notas
porque sigue siendo un superlativo sin fuente.

### 3 · `recorrido` — acotada y con el 15 % en su sitio

El cuerpo empieza por «El recorrido **en PrusaSlicer** es» (`:141`), y la
generalización a las otras tres casas no aparece. El 15 % está presentado como
relleno —«su ejemplo de partida está en torno a un 15 % de relleno»—, respaldado
en `first-print-with-prusaslicer.md:87-88` («Generally, values around 15% work
well»), y el `cifra` de la tarjeta sigue siendo `0,15–0,20 mm` con su nota de
altura de capa (`:142`), respaldada en `:66-67`. Las dos cosas ya no se pisan.

### 4 · `niveles` — el matiz manifiesto

«La regla general es que, si el mismo parámetro está a valores distintos en
varios niveles, se usa el del nivel más pequeño» (`:208`), y la cita conserva el
«Usually» literal (`:210-214`; `slicing-parameters.md:85-86`). El `cifra`
`5 % → 20 %` con su nota de ejemplo (`:209`) está en `:92-106`.

### 5 · `binario` — la causalidad enderezada

«la razón es el tamaño, porque el texto ocupa mucho. No es una compresión
cualquiera —las impresoras corren en hardware limitado, y por eso comprimir no es
trivial—, pero el origen del formato es el peso del fichero, no la limitación del
hardware» (`:234`). Es la lectura correcta de `binary-g-code.md:22-26`: el texto
«no se guarda de forma eficiente» y el hardware limitado es el **obstáculo** de
la compresión, no su motivo. Versiones, rutas y la cifra del 70 % siguen
literales.

### 6 · `sin-firma` — la afirmación no verificable, fuera

La tarjeta ya no dice que los demás valores se lean igual. Se queda con lo que
sí sostiene: que el campo se lee de una línea de firma, que la app deduce el
programa de ella y no atribuye el archivo a un programa que no lo generó, que
agrupa por familias, y que sin firma nada del panel se puede atribuir a la tabla
de claves de una casa concreta (`:242`).

De paso, la nota no bloqueante de la vuelta anterior también quedó resuelta:
`relaminar` ha recuperado su `alcance` (`:280`).

## Lo que he comprobado y sale bien, para no rehacerlo

### Las cinco contradicciones del cocinado, declaradas y sin resolverse

| Contradicción | Dónde | Estado |
|---|---|---|
| 1. Frontera de las tres categorías | `frontera` (`:162-165`) | PASA — retracción en Printers (Prusa) frente a flow ratio en filamento (Bambu), y «ninguna de las dos fuentes declara la equivalencia» |
| 2. Dónde vive el metadato | `metadato` (`:168-171`) | PASA — tres modelos (booleano de Orca, marcadores de Cura, nombre de fichero), «ninguna vale para las otras dos» |
| 3. Temperatura por capa | `temperatura-capa` (`:191-195`) | PASA — la constante acotada a un filamento y al visor, y el M104 S250 de la misma página como caso contrario |
| 4. Soportes de árbol | `soportes` (`:198-202`) | PASA — el «at least for the time being» con su matiz temporal y la advertencia de no generalizar el «no» |
| 5. Qué se guarda o ni se ve | `visibilidad` (`:217-220`) | PASA — tres caminos (aplicabilidad, modo de interfaz, nivel de visibilidad) y «un ajuste que no aparece no significa que el slicer no lo aplique» |

### El «aviso» del cocinado: obedecido

`grep` de `; generated by|filament_type|layer_height|;TIME|;Material` sobre la
guía: **cero**. Ningún comentario de cabecera inventado. Lo que hay es lo
permitido: el booleano `gcode_comments` / Verbose G-code de Orca con su coste
(`metadato`, `orca-verbose`), los marcadores de Cura con la distinción correcta
de que el valor acaba en la instrucción (`M140 S50.0`) y no en un comentario
(`metadato`, `cura-plantillas`), y los tres huecos declarados como huecos
(`hueco`, y la cuarta entrada de `fueraDeAlcance`).

### Las cifras, una a una, contra el crudo

| Cifra | Dónde | Crudo |
|---|---|---|
| `0,15–0,20 mm` | `recorrido` (`:142`) | `first-print…:66-67` |
| `15 %` | `recorrido`, cuerpo (`:141`) | `first-print…:87-88` |
| `5 % → 20 %` | `niveles` (`:209`) | `slicing-parameters…:92-106` |
| `< 1 min` | `estimacion` (`:227`) | `faq-prusaslicer…:77-80`, con la condición del perfil correcto |
| `~70 %` | `binario` (`:235`) | `binary-g-code…:35-36` |
| `--gcode-comments=1` | `orca-verbose`, en `valor` (`:286`) | `orcaslicer…:47` |
| `2.7.0` / `5.1.0` | `binario` (`:234`) | `binary-g-code…:43-44`, `:56-57` |
| `M104 S250` | `temperatura-capa` (`:194`) | `view-slicing…:110-111` |

Rutas y nombres propios, todos literales: `Printers → General → Support binary
G-code`, `File → Convert`, `Configuration → Preferences → Other`
(`binary-g-code…:42-51`); `Preferences → Configure Cura… → Printers → Machine
Settings` (`cura…:32-37`); los cuatro puntos de inserción y los avisos con ⚠️
(`cura…:18-28`, `:39-41`); `gcode_add_line_number` como Developer
(`orcaslicer…:32-37`); `Only visible when in PrusaSlicer Expert Mode`
(`prusament-tpu-95a…:114-116`).

### Las seis citas literales

Las seis están en `wiki/raw/`, y los ficheros de este lote están partidos a 80
columnas, así que las he buscado por mitades cuando hacía falta:

1. «To start printing, you need to convert your model to layer-by-layer
   instructions for the printer with a slicer.» → `prusaslicer-general-info…:17-19` ✓
2. «offer very good print quality at reasonable print times» → `first-print…:66-67` ✓
3. «These parameters are divided into three categories: printer, filament and
   process» → `slicing-parameters…:16-17` ✓
4. «Usually, if the same parameter is set in multiple levels at different values,
   the value from the smallest level will be used.» → `slicing-parameters…:85-86` ✓
5. «Maximum volumetric flow rate = cross-sectional area of extruded line * maximum
   printing speed» → `view-slicing…:59-61` ✓
6. «at least for the time being» → `faq-prusaslicer…:72-73` ✓

Atribución, exactitud y contexto: ninguna está en boca de quien no la dijo,
ninguna convierte un condicional o un futuro en un resultado —el soporte de
árbol de la FAQ es un «no» con matiz temporal y se da como tal, y el «Usually» de
los niveles se conserva—, y los nombres propios son los de la fuente. Las tres
preguntas pasan.

### Las `fuentes` y la estructura

Las nueve URLs de `fuentes` (`:372-418`) son el `url:` de frontmatter de los
nueve crudos, sin una repetida. La primera cita del artículo está en la línea
131, en la primera mitad. Diferencial con tres comprobaciones, todas con `si` y
`no`, y `siNo` a `warping-pla`. Las dos variables tienen `para` y ninguna es
decorativa: `slicer` dispara cinco reglas y `formato` dispara una regla y una
tarjeta. Las diez reglas tienen `porque`, `fuente` y `alcance`, y las seis
condicionadas apuntan sólo a opciones que existen, así que no hay ninguna regla
muerta. `fueraDeAlcance` tiene cuatro entradas concretas; las tres primeras
llevan `guia` y los tres slugs existen en `src/lib/guias.ts`
(`warping-pla`, `separaciones-entre-capas`, `adhesion-primera-capa`), y la
cuarta nombra el caso sin `guia`, que es la forma correcta. Los cinco `enlaza`
(`altura-capa`, `material`, `temperatura-hotend`, `voladizos-y-soportes`) y el
`siNo` apuntan a slugs existentes; no hay ningún enlace roto ni sintaxis
`[[slug]]` del formato viejo. Ninguna de las seis frases canónicas de IA
aparece, y ninguna tarjeta ni regla existe sin datos.

### Nada de «Tirado»

Los siete apartados de `## Tirado` (`wiki/cooked/slicer.md:739-768`) siguen
fuera. Ninguna lista de comentarios de cabecera; «Cura documenta sus metadatos
como comentarios» no está, la guía dice lo contrario; el `.bgcode` y sus
metadatos se declara que ninguna fuente lo dice (`hueco`, y el `alcance` de
`binario-convertir`, `:342`); el nombre del tag no está nombrado; el perfil de
calidad dentro del fichero no está; la taxonomía común de las tres categorías
está descartada en `frontera`; y los dos matices (soportes de árbol,
temperatura constante) van con su acotación. Las tablas de «Revisado y no
incorporado» también se respetan.

## Notas que no bloquean

- **Dos frases sin fuente en `revisa-salida`** (`:260`): «Es la comprobación que
  casi nadie hace» es una afirmación sobre la conducta de la gente, y «la única
  que ve el fichero real que va a correr» un superlativo. Ninguna de las nueve
  fuentes las sostiene. No reintroducen el fallo de la vuelta anterior —no
  afirman que sea el único modo de saber qué contiene el fichero, y no
  contradicen a `bambu-visor`—, pero se podría dejar en «es la comprobación que
  ninguna otra te da: lo que hay escrito dentro, no lo que el programa muestra
  en pantalla», que es la idea y no necesita fuente.
- **«Dos avisos» nombra dos cosas distintas en la misma guía.** En
  `revisa-salida` (`:260`) son las dos cláusulas del único ⚠️ de Cura sobre
  editar («Editing the G-Code manually… / Always check the G-Code output…»); en
  `cura-plantillas` (`:308`) son los dos bloques ⚠️ de la página (ése y el de
  los comandos propios de los fabricantes). Las dos lecturas son correctas
  respecto al crudo, pero contar con el mismo número cosas distintas en una
  página invita a la confusión. Conviene armonizarlo.
- **La afirmación del analizador sobre «Desconocido» sigue sin verificar del
  todo, y ahora tengo los datos.** A favor: `SLICER_LABEL` tiene
  `unknown: 'Desconocido'` (`src/lib/tu-archivo.ts:139`), `SlicerKind` documenta
  `unknown` como «un valor real y persistente»
  (`src/services/types.ts:24-28`) y el comentario de la fila del panel dice que
  «lo que puede es "Desconocido"» (`src/components/AnalysisPanel.tsx:167-172`).
  En contra: `parseGcode` **lanza** `NO_METADATA_MESSAGE` en el caso `'unknown'`
  (`src/services/ParserService.ts:361-365`), así que en la ruta real el panel
  entra en estado `error` y no pinta ninguna fila. Es una contradicción del
  código, no de la guía, pero la guía la cuenta como hecho. Mientras el dueño
  del código no aclare cuál de las dos es la vigente, lo seguro es lo que la
  tarjeta ya dice en su última frase: que sin firma los valores no se pueden
  atribuir a una casa concreta.
- **El agrupamiento de familias se menciona pero no se explica.** La tarjeta
  `sin-firma` dice «También agrupa por familias» (`:242`), y el código etiqueta
  la familia `orca` como «Orca / Bambu Studio» porque el analizador no puede
  distinguirlos (`tu-archivo.ts:127-138`). Quien marca «Bambu Studio» en la
  variable y ve «Orca / Bambu Studio» en la fila del panel no sabe por qué. Una
  frase en la tarjeta lo cerraría. Relacionado: la opción `bambu` de la variable
  no puede venir precontestada del análisis, porque `SlicerKind` no tiene
  `'bambu'` — es una opción que sólo se marca a mano, y eso es correcto, pero
  conviene saberlo.
- **El comentario de cabecera de la guía cuenta mal las reglas** (`:36-37`):
  dice «sin la variable, cuatro de las seis reglas condicionadas no podrían
  existir». Las condicionadas son seis y cinco dependen de `slicer`
  (`orca-verbose`, `bambu-visor`, `cura-plantillas`, `prusa-snapshots` y
  `sin-firma`), no cuatro. Es un comentario de desarrollo, no se renderiza, pero
  si alguien lo usa como documentación se lleva un número que no cuadra.
- **`que-es` generaliza atributos de PrusaSlicer** (`:130`): «Es gratuito, de
  código abierto, y no está atado a una marca de impresora» sale de la FAQ, que
  habla de PrusaSlicer, y la tarjeta habla de «un slicer» en general. Cierto
  para los cuatro del lote, pero la fuente sólo lo afirma de uno.
- **Para el pipeline, no para la guía:** dos de las URLs de Prusa KB del lote
  han cambiado de tamaño desde la captura (`verify:fuentes` las marca como
  cambiadas según la ejecución). Siguen vivas y el contenido que sostiene las
  afirmaciones de la guía está intacto; si en algún barrido quedan marcadas, es
  motivo de reprocesar por el cocinero, no de tocar la guía.

## Conclusión

Los tres fallos de la vuelta anterior están resueltos, y resueltos donde tocaba:
el bloqueante partiendo la regla y mandando el dato del analizador a su propia
tarjeta con su propia fuente, y los dos de tarjeta con una frase cada uno —el
recorrido acotado a PrusaSlicer, el 15 % en el sitio del relleno, el «Usually»
de los niveles manifiesto, la causalidad del `.bgcode` enderezada y la
afirmación no verificable del analizador fuera—. `verify:guias` pasa entero y las
nueve fuentes responden.

Lo que queda son siete apuntes, seis de redacción y uno del pipeline, y ninguno
de ellos cambia una cifra ni atribuye nada a quien no lo dijo. **APROBADO.**
