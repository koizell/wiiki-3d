# Revisión de slicer (primera vuelta)

**Veredicto: RECHAZADO** — 3 fallos, de los cuales 1 bloqueante.

Fecha: 2026-10-13

Guía revisada: `src/content/guias/slicer.ts` (417 líneas, slug `slicer`)
Material cocinado: `wiki/cooked/slicer.md`
Fuentes crudas: nueve en `wiki/raw/` — cinco `slicer-prusa-kb-*`
(`prusaslicer-general-info`, `first-print-with-prusaslicer`, `faq-prusaslicer`,
`binary-g-code`, `prusament-tpu-95a-material-guide`), dos `slicer-bambu-wiki-*`
(`slicing-parameters`, `view-slicing-information`),
`slicer-orcaslicer-wiki-g-code-output` y `slicer-cura-wiki-start-end-g-code`.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 2 sin respaldo (`cabecera`), 1 generalización de una sola fuente (`recorrido`), 1 paráfrasis que invierte la causalidad (`binario`) |
| 2 | Contradicciones internas | **FALLA** — `cabecera` contradice `bambu-visor` / `calcula` sobre si leer el fichero es la única forma de saber qué contiene |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | PASA |

## El encargo de esta vuelta, punto por punto

| # | Punto del encargo | Estado |
|---|---|---|
| 1 | Cifras de tarjetas y reglas respaldadas | **PASA** con 4 salvedades, todas abajo |
| 2 | Contradicciones declaradas con matiz | **PASA** — las cinco del cocinado están como tarjetas y ninguna se resuelve en silencio |
| 3 | El «aviso» del cocinado (nada de listas de comentarios inventadas) | **PASA** — no se coló nada |
| 4 | Reglas correctas y accionables | **FALLA** — `cabecera` incumple el punto 3 del encargo con su `fuente` |
| 5 | «Sin respaldo» como tal; nada de «Tirado» | **PASA**, con un matiz en el apartado del analizador |
| 6 | Nada inventado fuera de las fuentes | **FALLA** — 3 afirmaciones, ninguna de las tres en `wiki/raw/` |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · La regla `cabecera` atribuye a Cura una afirmación que es del analizador de esta app, y Cura no la sostiene

**Dónde:** `reglas[1]`, `cabecera`, líneas 256-264.

**Qué dice la guía:**

> «Los valores que el panel enseña —material, temperaturas, altura de capa— se leen de
> la cabecera del fichero, y el analizador aplica la tabla de claves de la familia del
> slicer que detecta ahí.»
> `fuente: 'Ultimaker Cura'`

**Por qué falla:** `wiki/raw/slicer-cura-wiki-start-end-g-code.md` no dice nada de eso.
La página de Cura documenta cuatro puntos de inserción y dos avisos; sobre el fichero
sólo dice *«Always check the G-Code output before sending it to the printer»* (`:27`).
Lo de la cabecera y las tablas de claves es un **dato interno del analizador**, y
`wiki/cooked/slicer.md:695-706` lo marca como tal:

> «Las claves concretas que lee el analizador de este proyecto. **[DATO INTERNO DE LA
> APLICACIÓN — no es de ninguna fuente del lote]** […] **Publicable sólo como dato
> interno del analizador, y nunca atribuido a documentación de impresora**».

La guía lo atribuye a documentación de impresora: el campo `fuente` dice «Ultimaker
Cura» y el `alcance`, que es donde iría el respaldo, sólo recupera los dos avisos de
Cura. El resultado es que una afirmación sobre el parser de esta wiki queda firmada por
Cura, que es exactamente lo que el cocinado prohíbe.

**Qué hacer:** la regla necesita partirse en dos, o cambiar de fuente.

- Si el objetivo es «revisa la salida», `fuente` se queda en `Ultimaker Cura` y el
  `porque` se limita a lo que Cura dice: los dos avisos y el hecho de que comprobar la
  salida antes de enviarla es la recomendación literal de la página.
- Si el objetivo es «lee la cabecera», `fuente` tiene que ser `'El analizador de esta
  app'`, igual que hace bien `sin-firma` (línea 328), y el `porque` se frasea como dato
  interno, no como recomendación de Cura.

De paso, la propia guía resuelve el caso dos reglas más abajo: `sin-firma` (`:323-331`)
ya existe, con `fuente: 'El analizador de esta app'`, y cubre el terreno del
analizador. `cabecera` está duplicando ese terreno con la atribución cambiada.

### 2 · Importante · «La única forma»: sin respaldo, y contradice las dos reglas de al lado

**Dónde:** `reglas[1]`, `cabecera`, línea 260.

**Qué dice:** «Es además **la única forma** de saber qué escribirá el fichero que vas a
imprimir, porque el programa no te lo cuenta por su cuenta.»

**Por qué falla, y por partida doble:**

* **No está en las fuentes.** `grep` de `only way|única` en las nueve fuentes: cero.
  Lo más cerca es el aviso de Cura *«Always check the G-Code output before sending it
  to the printer»* (`cura…:27`), que es una recomendación de comprobar, no una
  afirmación de que no haya otra manera.
* **Se contradice con el resto de la guía.** `bambu-visor` (`:293-301`) dice que
  inspeccionando la ruta capa a capa «se comprueba si el G-code se ha generado como se
  esperaba», y la tarjeta `calcula` (`:180-189`) dice lo mismo. Según `cabecera` eso no
  serviría para saber qué hay escrito; según las otras dos, sí. Y tiene un tercer
  problema: la propia guía declara en `hueco` (`:174-177`) que **ninguna de las nueve
  fuentes enumera la cabecera real ni un comentario concreto**, así que el `porque` de
  `cabecera` en realidad no promete nada que el lector pueda verificar.

**Qué hacer:** quitar «la única forma». Algo como «es la comprobación que ninguna otra
te da: lo que hay escrito dentro, no lo que el programa muestra en pantalla». Y si se
mantiene la acción «lee su cabecera», el `alcance` debe decir lo que dice el `alcance`
de `hueco`: que ninguna de las nueve fuentes enumera esos comentarios, así que la
lectura es para buscar la firma, no para confirmar una lista.

### 3 · Menor · Tres afirmaciones de tarjeta que pasan la revisión pero conviene apuntar

**3a · `recorrido` (línea 141) — «la cifra que la fuente da como orientación está en el
apartado de relleno».**

El 15 % está en el crudo —`wiki/raw/slicer-prusa-kb-first-print-with-prusaslicer.md:88`,
*«Generally, values around 15% work well.»*— pero **no en la guía**: el `cifra` de esta
tarjeta es `0,15–0,20 mm`, de altura de capa, y no hay ningún otro sitio donde aparezca
el 15 %. La frase apunta a un apartado que esta página no tiene. Se arregla añadiendo la
cifra al `cifra` o al cuerpo, o borrando la cláusula.

**3b · `recorrido` (línea 141) — «El orden no cambia entre casas».**

El recorrido descrito es el de PrusaSlicer
(`first-print-with-prusaslicer.md:29-121`: importar, orientar, impresora, material,
perfil/altura, soportes, relleno, brim, previsualizar, exportar). Ninguna de las nueve
fuentes dice que el orden sea el mismo en las otras tres casas: `grep` de
`order|same steps` en `wiki/raw/` da cero. Es una generalización a partir de una sola
fuente. Se arregla con «El recorrido que Prusa documenta» o «El orden, en el recorrido
que Prusa describe».

**3c · `niveles` (línea 208) — pierde el «Usually» de la fuente.**

El crudo dice *«**Usually**, if the same parameter is set in multiple levels at
different values, the value from the smallest level will be used»*
(`slicing-parameters.md:85-87`). La guía lo enuncia como regla sin excepciones. No
cambia ninguna cifra, pero la palabra está en la fuente y en la cita de la propia
tarjeta, que sí la conserva.

**3d · `binario` (línea 234) — la causalidad está invertida.**

La guía: «El `.bgcode` es un formato pensado para codificar y comprimir el G-code
ASCII, **porque el texto ocupa mucho y las impresoras corren en hardware limitado**.»

El crudo (`binary-g-code.md:21-26`) dice dos cosas distintas:

> «G-code files are easy to read and interpret, but their downside is that the data is
> not saved efficiently, and the file size is often large. **Compression of the file is
> problematic because** the printers usually run on limited hardware and may not have
> enough memory and/or CPU power to decompress it.»

La motivación del formato es el tamaño del texto. El hardware limitado es, en la
fuente, el **obstáculo** que hace difícil comprimir, no el motivo del formato. La guía
convierte una dificultad en una razón. Se arregla así: «pensado para codificar y
comprimir el G-code ASCII, porque el texto ocupa mucho; que se pueda comprimir es otra
cosa, y la fuente lo explica: las impresoras corren en hardware limitado y pueden no
tener memoria ni CPU para descomprimirlo».

## Lo que he comprobado y sale bien, para que no haya que rehacerlo

### El «aviso» del cocinado: obedecido

`wiki/cooked/slicer.md:19-28` pide que no aparezca ninguna lista inventada de
comentarios de cabecera (`; generated by`, `; filament_type`, `; layer_height`).
`grep` de esos patrones sobre la guía: **cero resultados**. Lo que hay es lo permitido:

- el booleano `gcode_comments` / Verbose G-code de Orca, con su coste, en
  `orca-verbose` (`:282-291`) y en la tarjeta `metadato` (`:168-171`);
- los marcadores de posición de Cura, con la distinción correcta de que el valor acaba
  en la instrucción (`M140 S50.0`) y no en un comentario (`metadato`, `cura-plantillas`);
- los tres huecos declarados como huecos en la tarjeta `hueco` (`:174-177`): la
  cabecera real, el nombre literal del tag del diálogo de guardado, y si un `.bgcode`
  conserva los mismos metadatos que el ASCII.

La tarjeta `hueco` y la cuarta entrada de `fueraDeAlcance` (`:363-367`, sin `guia`,
como manda la regla de las guías que todavía no existen) sostienen eso mismo. Es la
parte más cuidada de la guía.

### Las cinco contradicciones del cocinado, declaradas y no resueltas

| Contradicción | Dónde está en la guía | Estado |
|---|---|---|
| 1. La frontera de las tres categorías | `frontera` (`:162-165`) | PASA — retracción en Printers (Prusa) frente a flow ratio en filamento (Bambu), y «ninguna de las dos fuentes declara la equivalencia» |
| 2. Dónde vive el metadato | `metadato` (`:168-171`) | PASA — tres modelos (booleano de Orca, marcadores de Cura, nombre de fichero) y «ninguna vale para las otras dos» |
| 3. Temperatura por capa | `temperatura-capa` (`:191-195`) | PASA — la frase de la constante va acotada a un filamento y al visor, y el M104 S250 de la misma página como caso contrario |
| 4. Soportes de árbol | `soportes` (`:198-202`) | PASA — el «at least for the time being» con su matiz temporal, y la advertencia de no generalizar el «no» |
| 5. Qué se puede guardar o ni ver | `visibilidad` (`:217-220`) | PASA — tres caminos (aplicabilidad, modo de interfaz, nivel de visibilidad) y «un ajuste que no aparece no significa que el slicer no lo aplique» |

### Nada de «Tirado»

He repasado los siete apartados de `## Tirado` (`wiki/cooked/slicer.md:739-768`).
Ninguno se incorporó:

- la lista de comentarios de cabecera — no está;
- «Cura documenta sus metadatos como comentarios» — no está; la guía dice lo contrario;
- «un `.bgcode` no lleva / lleva los comentarios» — no está; se declara que ninguna
  fuente lo dice (`hueco`, y `alcance` de `binario-convertir`, `:339-340`);
- el nombre del tag (`print_time`) — no está nombrado, se declara como hueco;
- «el slicer guarda el nombre del perfil de calidad dentro del fichero» — no está;
- «las tres categorías son máquina, material y trabajo» como taxonomía común — no
  está; `frontera` lo descarta explícitamente;
- «PrusaSlicer no tiene soportes automáticos» y «la temperatura es constante» — no
  están; los dos van con su matiz.

Las dos tablas de «Revisado y no incorporado» también se respetan: las cifras de TPU
(220-240 °C, 55-75 °C), el secado, las rutas de `snapshots` una a una y las variables
`initial_layer_bb_*` / `total_bb_*` una por una no aparecen. La fuente de TPU sólo se
usa para lo que le toca: *«This is only visible when in PrusaSlicer Expert Mode»*
(`prusament-tpu-95a…:116`), que es lo que sostiene el filtro por modo de `visibilidad`.

### Las cifras, una a una, contra el crudo

| Cifra | Dónde en la guía | Crudo |
|---|---|---|
| `0,15–0,20 mm` | `recorrido` (`:142`) | `first-print…:66-67`, *«we suggest using 0.15 or 0.2 mm layers as they offer very good print quality at reasonable print times»* |
| `5 % → 20 %` | `niveles` (`:209`) | `slicing-parameters…:92-106`, global 5 %, objeto 20 % |
| `< 1 min` | `estimacion` (`:227`) | `faq-prusaslicer…:77-78`, *«less than a minute difference on a print that takes 10+ hours»*, con la condición del perfil correcto (`:78-80`) |
| `~70 %` | `binario` (`:235`) | `binary-g-code…:35-36`, *«reduces the average size by about 70%»* |
| `--gcode-comments=1` | `orca-verbose` (`:284`) | `orcaslicer…:47`, *«CLI Example: --gcode-comments=1»* |

Versiones y rutas, todas literales: `2.7.0` para el binario por defecto y `5.1.0` para
el firmware de MINI/MK4/XL (`binary-g-code…:43-44` y `:56-57`); `Printers → General →
Support binary G-code`, `File → Convert` y `Configuration → Preferences → Other`
(`:42-45`, `:49-51`); `Preferences → Configure Cura… → Printers → Machine Settings`
(`cura…:32-37`); los cuatro puntos de inserción y los dos avisos con ⚠️
(`cura…:18-28`, `:39-41`).

### Las seis citas literales

Las seis están en `wiki/raw/`, y ninguna cruza un salto de línea problemático (los
ficheros crudos de este lote están partidos a 80 columnas; he buscado cada cita por
mitades cuando hacía falta):

1. `To start printing, you need to convert your model to layer-by-layer instructions for
   the printer with a slicer.` → `prusaslicer-general-info…:17-18` ✓
2. `offer very good print quality at reasonable print times` → `first-print…:66-67` ✓
3. `These parameters are divided into three categories: printer, filament and process` →
   `slicing-parameters…:16-17` ✓
4. `Usually, if the same parameter is set in multiple levels at different values, the
   value from the smallest level will be used.` → `slicing-parameters…:85-87` ✓
5. `Maximum volumetric flow rate = cross-sectional area of extruded line * maximum
   printing speed` → `view-slicing…:59-61` ✓
6. `at least for the time being` → `faq-prusaslicer…:72-73` ✓

Atribución, exactitud y contexto, una por una: ninguna de las seis está en boca de
quien no la dijo, ninguna convierte un condicional en pasado (el soporte de árbol de la
FAQ es un «no» con matiz temporal y se da como tal), y los nombres propios son los de
la fuente —`gcode_comments`, `gcode_add_line_number`, `M104 S250`, `M140 S50.0`,
`OrcaCube_PLA_1h15m.gcode`, `snapshots`—. Las tres preguntas pasan.

### Las `fuentes`

Las nueve URLs de `fuentes` (`:370-416`) están como `url:` de frontmatter en los nueve
ficheros crudos, sin una repetida. Las tres `fuente` de tarjeta (`help.prusa3d.com`,
`wiki.bambulab.com`) son el `sitio:` de sus crudos.

### Estructura

- **Diferencial**: abre la guía, tres comprobaciones (`origen`, `previsualizacion`,
  `perfil`), cada una con `si` y `no`. ✓
- **Variables**: `slicer` y `formato`, las dos con `para`. Ninguna decorativa: `slicer`
  dispara cuatro reglas (`orca-verbose`, `bambu-visor`, `cura-plantillas`,
  `prusa-snapshots`) y `formato` dispara una regla y una tarjeta (`binario`,
  `binario-convertir`). La quinta opción, `desconocido`, no es decorativa tampoco:
  tiene su tarjeta (`sin-firma`) y su regla.
- **Reglas**: once, todas con `porque` y `fuente`. Las condiciones sólo apuntan a
  opciones que existen (`orca`, `bambu`, `cura`, `prusa`, `desconocido`, `binario`), así
  que no hay ninguna regla muerta. `orca-verbose` lleva su cifra en `valor`.
- **Conocimiento filtrado por variables**: `binario` con `cuando: { formato: 'binario' }`
  y `sin-firma` con `cuando: { slicer: 'desconocido' }`. Las tarjetas de metadato
  hablan de las tres casas a la vez y por eso no llevan filtro, que es lo correcto.
- **`fueraDeAlcance`**: cuatro entradas concretas. Las tres primeras llevan `guia` y los
  cuatro slugs existen en `src/lib/guias.ts` (`warping-pla`, `separaciones-entre-capas`,
  `adhesion-primera-capa`); la cuarta nombra el caso sin `guia`, que es la forma
  correcta de mencionar una guía que todavía no existe.
- **Enlaces**: los cinco `enlaza` (`altura-capa`, `material`, `temperatura-hotend`,
  `voladizos-y-soportes`) y el `siNo` (`warping-pla`) apuntan a slugs que existen.
  Ningún enlace roto.
- **`campos: ['slicer']`** a nivel de guía y a nivel de variable es el patrón que ya
  usan `material`, `altura-capa` y `temperatura-hotend`, y `tipos.ts:69-70` avisa de que
  `verify:guias` comprueba que un campo no esté declarado dos veces en *sitios
  distintos* de la misma guía: aquí son el sitio correcto.
- **Relleno y frases de IA**: `grep` de las seis frases canónicas, cero. Ninguna tarjeta
  ni ninguna regla existe sin datos: todas llevan cifra, cita, versión, ruta o atribución
  nombrada.
- **Primera cita** en la línea 131, dentro de la primera mitad de la guía.

## Notas que no bloquean

- **La opción `orca` dice «OrcaSlicer» y el panel dice otra cosa.**
  `src/lib/tu-archivo.ts:135-140` etiqueta la familia `orca` como
  **«Orca / Bambu Studio»**, y el comentario de esa función (`:127-133`) dice
  explícitamente que «la guía de `slicer` explica el agrupamiento». La guía lo menciona
  de pasada («También agrupa por familias», `:242`) pero no explica que el analizador
  **no puede distinguir** OrcaSlicer de Bambu Studio. Quien marca «Bambu Studio» en la
  variable y ve «Orca / Bambu Studio» en la fila del panel no sabe por qué. Una frase
  en `sin-firma` lo cerraría.
- **La afirmación del comentario de cabecera sobre el campo del slicer.**
  `src/content/guias/slicer.ts:17-21` dice que `slicer` no es opcional y que «no hay
  G-code analizado sin un valor en esa fila», y que «lo que sí puede es valer
  "desconocido"». El tipo efectivamente lo declara obligatorio
  (`src/services/types.ts:32-36`), y `SlicerKind` incluye `'unknown'`
  (`:24-29`). Lo que no encontraba respaldo en el código es lo otro —ver siguiente
  nota—, así que el comentario queda a medias.
- **Las dos afirmaciones sobre el analizador que no he podido verificar y que el redactor
  debería comprobar.** No son de las nueve fuentes, así que no las reviso contra
  `wiki/raw/`, pero están escritas como hechos y conviene dejarlo dicho:
  - `sin-firma` (`:242`) dice que con un fichero sin firma «los demás valores se leen
    igual». En `src/services/ParserService.ts:355-365`, `detectSlicer` devuelve
    `'unknown'` y el caso **lanza** `NO_METADATA_MESSAGE`: no se devuelve ningún valor.
  - `sin-firma` (`:326`) dice que «el analizador escribe "desconocido"».
    `SLICER_LABEL` (`tu-archivo.ts:139`) sí tiene `unknown: 'Desconocido'`, pero
    `parseGcode` no construye ningún metadata con ese valor.
  Si el redactor sabe de alguna ruta que sí lo hace, que lo escriba; si no, las dos
  frases sobran y la tarjeta se queda con lo que sí es cierto: que un fichero sin firma
  no se puede atribuir a una casa concreta.
- **`relaminar` (`:275-280`) se ha quedado sin `alcance`.** No es un fallo —el tipo lo
  tiene opcional y la fuente lo dice de cualquier parámetro y de cualquier modelo
  (`view-slicing…:95`)—, pero la vuelta anterior lo llevaba y era buena costumbre.

## Conclusión

La parte difícil de este encargo está bien. Las cinco contradicciones del cocinado van
como tarjetas con su matiz y ninguna se resuelve en silencio, que es el fallo más grave
que podía cometer esta guía. Y el aviso del cocinero se obedece al pie de la letra: no
hay ni un comentario de cabecera inventado, los tres huecos se declaran como huecos y
la tarjeta `hueco` los sostiene.

Lo que no aguanta son tres afirmaciones que no están en `wiki/raw/`, y dos de ellas en
la misma regla. `cabecera` atribuye a Cura algo que es del parser de esta wiki, cuando
el cocinado lo prohíbe por su nombre, y encima lo llama «la única forma» de saber qué
hay en el fichero, que ninguno de los nueve documentos dice y que las reglas
`bambu-visor` y `calcula` de esta misma guía desmienten. Las otras dos son de tarjeta y
se arreglan con una frase: el 15 % que se anuncia y no está, y el «el orden no cambia
entre casas», que sólo documenta una casa de las cuatro.

Cuando vuelvan, hay que mirar esas tres contra `wiki/raw/` y una contra
`src/services/ParserService.ts`. Nada de lo demás hace falta tocarlo.

---

## Nota sobre esta revisión

El veredicto es sobre el fichero tal y como estaba el 2026-10-13. Si la guía se corrige,
la siguiente vuelta se numera `slicer-revision-2.md` y parte de estos tres fallos, no de
cero: los tres son de afirmaciones, y las afirmaciones se heredan.
