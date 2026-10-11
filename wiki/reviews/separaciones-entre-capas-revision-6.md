# Revisión de separaciones-entre-capas — sexta vuelta, lint R0 2026-10-04

**Veredicto: APROBADO** — las cinco comprobaciones pasan. Quedan cinco notas, ninguna de
ellas una afirmación técnica sin respaldo.

Artículo: `src/content/wiki/separaciones-entre-capas.md` (512 líneas). Cocinado:
`wiki/cooked/separaciones-entre-capas.md`. Informe que manda:
`wiki/reviews/separaciones-entre-capas-revision-5.md`. Brief:
`wiki/briefs/separaciones-entre-capas-cierre.md`. Historial: revisiones 1 a 5.

Las siete fuentes se localizaron por el `url:` del frontmatter del artículo y por la lista
`fuentes:` del cocinado, **no por el slug del fichero**, y dos de ellas son compartidas:
`warping-pla-prusa-forum-warping-at-corners.md` y
`temperatura-cama-prusa-kb-filament-material-guide.md`, que abren por su ruta real y son a la
vez fuentes de los otros dos artículos. Se comprobó el cuerpo de cada una; las notas del
recolector se han distinguido del texto de la fuente en los dos casos en que aparecen
—la desalineación de las columnas de chapa y el rango «Eminent Member»—. No se ha consultado
internet ni se ha modificado artículo, cocinado, raw ni informes anteriores.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo en `wiki/raw/` | PASA — cada afirmación técnica y cada cita entrecomillada se ha localizado en el cuerpo de las siete fuentes; no se publica un recuento de items sin haberlo contado |
| 2 | Contradicciones internas | PASA — ventilador, cama, boquilla, los tres números y los tres fallos no se contradicen en ningún punto |
| 3 | Relleno y frases de IA | PASA — ningún párrafo sin dato; ninguna fórmula canónica |
| 4 | Longitud y estructura | PASA — recuento **no medido** (ver abajo); un solo H1, frontmatter completo, `slug` correcto, orden de secciones, `## Qué puede salir mal` con contenido real |
| 5 | Citas correctas y accesibles | PASA — 7 URLs únicas, verificadas contra el `url:` de raw; atribución, exactitud y contexto correctos |

### Recuento de palabras: no medido

Esta vuelta **no ha tenido shell**, así que no hay contador ejecutado sobre el fichero y
**no se publica ninguna cifra**. Los 5.159 del informe 5 y los 3.905 del informe 4 midieron
otras versiones del fichero y ninguno es vigente. Por inspección, el cuerpo visible (líneas
29–512) es de varios miles de palabras, muy por encima del mínimo de 800, y esa comprobación
no depende del número exacto.

## Las tres observaciones del brief: resueltas

| # | Brief `separaciones-entre-capas-cierre.md` | Estado en el artículo | Evidencia |
|---|---|---|---|
| 1 · El recuento de artículos con campo | **Resuelto** — `:17-20` dice ahora «**seis de los nueve** artículos, y los **tres** que no lo nombran son éste, `adhesion-primera-capa` y `enclosure-y-warping`» | `docs/plan-de-contenido.md` numera nueve entradas: con campo la 1 `bedTemp`, la 3 `material`, la 4 `hasOverhangs`/`overhangAngle`, la 7 `layerHeight`, la 8 `hotendTemp` y la 9 `slicer` — **seis**; sin él la 2 (este), la 5 y la 6 — **tres**. La regla que el comentario documenta («un campo, un artículo») sigue intacta y es correcta |
| 2 · La columna de warping sin procedencia | **Resuelto** — `:95-102` declara columna por columna de qué viene cada una: la de warping de `warping-pla` y «**no de las siete fuentes de este artículo**», la de capa desplazada de `layer-shifting_2020` con sus dos frases, y la de capa separada de las definiciones que abren el artículo. Cierra con «**Ninguna columna de esa tabla está respaldada por las siete fuentes a la vez**» | Los dos puntos de la columna de warping tienen respaldo real en el hermano: «Contracción térmica» es `warping-pla:55` («El warping es contracción térmica») y «A las esquinas y al brim» es su cuarto ajuste, `:369-374`. Ver la nota de abajo sobre cómo nombrarlo |
| 3a · «Prueba de tres movimientos» | **Resuelto en los dos sitios** — `:170-171` y `:458-461` dicen ahora «una prueba de **cuatro movimientos en tres direcciones** —X, Y y **las dos diagonales**—» | `layer-shifting.md:35`: «test both movements **along the X and Y axes**, and also **along both diagonals**». Cuatro movimientos, tres direcciones. Es exactamente la corrección que pedía el informe 5 |
| 3b · El caso de Naugh sin etiquetas | **Resuelto** — `:422-424` lleva ahora las tres: «el hilo de 2026 va justo al revés: Naugh atribuyó la pérdida de flujo a la viscosidad al bajar la temperatura. **Es un diagnóstico de foro, y el hilo se cierra sin resolver.**» | `layer-separation-delamination-help.md:73` para la viscosidad; `:87` para el cierre sin resolver. Coincide con las otras dos menciones del caso (`:138-144`, `:311-318`) |

## Los siete defectos del informe 4: sin regresiones

El brief dice que no se toque nada más, así que se han comprobado uno a uno.

| # | Defecto del informe 4 | Estado |
|---|---|---|
| 1 | Prohibía la vía térmica para los problemas de flujo | Resuelto — `:120-128` cita a Bambu con su modal *may*; `:389-394` presenta el caso de Naugh como el caso térmico que va en sentido contrario, y `:417-425` dice dos veces que ninguna de las siete fuentes dice que la temperatura no arregle un problema de flujo |
| 2 | «Ventilador primero» como orden compartido | Resuelto — `:238-243` atribuye «first» a bobstro y a su «A few possible causes»; `:245-249` deja el orden real de Bambu, con el ventilador en el paso 3 |
| 3 | Observación e interpretación fundidas en causa confirmada | Resuelto — `:131-139` separa a newgen (observación) de Naugh (interpretación), dice que 205 y 200 °C son capas de la torre y que nadie del hilo sitúa la causa en un lugar del objeto. El hilo de 2026 se conserva **sin resolver** en los tres sitios en que aparece |
| 4 | «Tornillos de inercia» | Resuelto — `:374-375` «**ajustar los tornillos de tensión del idler**», con la cita literal «Adjusted the idler tension screws» y la advertencia de no atribuirle función. `layer-separation-delamination-help.md:37` |
| 5 | Diagnóstico excluyente y geometría no acreditados | Resuelto — `:53-55` marca «along the Z direction» como lectura nuestra y dice que **no dice que la base tenga que quedarse plana**; `:434-440` dice que una base arqueada no expulsa la separación |
| 6 | Regla diagonal sin modelo | Resuelto — `:168-178` y `:458-464`: encabezado `Prusa CORE One`, geometría CoreXY, «do not lose alignment of the CoreXY», y el alcance MK3/S/+ separado del del Belt Status. `layer-shifting.md:23, 33, 35, 37, 39, 110` |
| 7 | 185-235 como rango de trabajo y 195-220 como de diagnóstico | Resuelto — `:283-333`: los tres números en tabla con su documento, la lectura editorial declarada como nuestra, y `:466-470` con el punto entero contra elegir |

## Trazabilidad: qué se comprobó y dónde

### Knowledge Base de Prusa — `layer-separation-and-splitting-fdm.md`

| Afirmación del artículo | Raw |
|---|---|
| «This refers to the de-lamination of the printed layers»; preset mal puesto y/o demasiada refrigeración «from either the print fan or the surrounding environment» | `:11` |
| «old days» de camas sin calentar; raro en MK con presets, sobre todo PLA y PETG | `:13` |
| Criterio de grieta: «Best way to identify cracked layers are the clean cuts that show a bit of an upward bend or warp» | `:15` |
| Mecanismo: «Warping forces exceed the layer adhesion strength and the layers separate» | `:17` |
| ABS y aire frío antes de enfriar del todo; ventilador a cero del todo; cámara cerrada «even heated» | `:23`, `:25` |
| PETG «does not have the same tendency to crack/de-laminate»; ASA más dependiente del entorno; «You can check the material guides…» | `:27` |
| «Depending on the brand, PLA is printed at a range between 195-220», **sin unidad**; incremento de 5 °C | `:29` |
| Flow rate / extrusion multiplier en incrementos del 5 %; sólo en modo Advanced o Expert | `:33`, `:35` |

El artículo **no le pone unidad** al 195-220 y dice por qué, y **no da ninguna cifra de
cama** tomada de este KB: comprobado, el fichero no contiene ninguna (lo dice también el
propio artículo en `:322-325`).

### Bambu Lab — `interlayer-cracking.md`

| Afirmación del artículo | Raw |
|---|---|
| «cracks may appear on the printed part along the Z direction»; ABS, ASA, PC, PET-CF, PA-CF | `:13` |
| «A slight nozzle clog **may** prevent filament extrusion during a specific layer, manifesting similarly to cracking» | `:21` |
| Método 1 cold pull, tutoriales por modelo sin cifras | `:23-35` |
| Método 2 «Appropriately Increase Nozzle Temperature or Decrease Print Speed»; **velocidades 150 y 100 mm/s escritas «with ABS»** | `:37`, `:39` |
| Método 3 y el 60 % «Max fan speed», **sin material al lado** | `:43`, `:45` |
| Método 4: cama **+5-10 °C**, cámara **+5 °C** si hay calefacción activa | `:49` |

El artículo mantiene la diferencia de atribución que importa: **las velocidades llevan ABS
escrito y el 60 % no lleva material**, y lo dice como ejemplo de interfaz y no como
recomendación para el material del lector (`:255-264`).

### `layer-shifting.md`

| Afirmación del artículo | Raw |
|---|---|
| Definición de capa desplazada y desalineación a mitad de impresión por movimiento anormal de X e Y | `:11` |
| «it is crucial to recognize in which axis the layers shifted» | `:13` |
| «wrong tension of the belts or pulleys not being secure» | `:15` |
| Regla de la diagonal: movimiento inconsistente en diagonal → «the motor that controls that diagonal, or the pulley attached to it» | `:37` |
| **Encabezado `Prusa CORE One`**, dentro de «Check the XY axes movement and the belt tension»; por menú y a mano con la impresora fría; X, Y y **las dos diagonales**; «do not lose alignment of the CoreXY» | `:23`, `:33`, `:35`, `:39` |
| Belt Status en `LCD Menu -> Support -> Belt Status` sólo en MK3/S/+; ~250 en X y ~275 en Y con ±15; aflojar bajo o cerca de 240, apretar sobre o cerca de 290 | `:110`, `:112`, `:116`, `:118` |
| «The value does not represent a physical quantity, but an arbitrary number inversely proportional to the motor load» | `:114` |
| Voladizos que suben, choque de boquilla, relleno muy bajo; prevención de **otra** cosa: subir ventilador o retracción | `:218`, `:220` |

### Foro 2026 — `layer-separation-delamination-help.md`

| Afirmación del artículo | Raw | Voz |
|---|---|---|
| «the separation's pretty bad as the model gets higher but there's even under-extrusion on the base of the temperature tower» | `:63` | **newgen** |
| «The photo doesn't have very high resolution, but this is what you can mainly see» | `:69` | **Naugh** |
| «a severe under-extrusion clog around 205°C before it could even attempt the 200°C layer» | `:71` | **Naugh** |
| Viscosidad, capas «spongy», puente roto; 205–210 °C con sagging y poor layer adhesion; poor nozzle wipe y «stray loops around the brim/bed» | `:73`, `:75`, `:77` | **Naugh** |
| «The sweet spot for this material at the current print speed is around 220°C–230°C» | `:79` | **Naugh** |
| «Adjusted the idler tension screws» | `:37` | **newgen** |
| «The issue still persists so I’ll post it in the correct one» | `:87` | **newgen** |
| Elegoo PLA; los cinco posts; 205 y 200 como capas de la torre | `:19`, `:13-87` | — |

Las tres piezas siguen separadas con nombre, y el artículo dice expresamente que **205 °C y
200 °C son capas de la torre de temperaturas** y que nadie del hilo sitúa la causa en un
lugar del objeto. Verificado por el otro lado: las notas del recolector de `:106-113` sí
afirman que «la causa real estaba abajo del todo, en la base», y el artículo **no lo
reproduce**. Es el movimiento que la vuelta anterior hizo y que sigue hecho.

### Foro 2020 — `separation-of-layers-in-middle-of-print.md`

| Afirmación del artículo | Raw | Voz |
|---|---|---|
| «A few possible causes» + «Excessive cooling/insufficient heat. Try reducing cooling first… adding 5-10C may help» | `:23`, `:29` | **bobstro** |
| Regla del 80 % del diámetro de boquilla, literal y completa | `:25` | **bobstro** |
| «under-extrusion on long straight extrusions» | `:27` | **bobstro** |
| «I don't think it was a layer size issue, since I was doing 0.2mm layers with a 0.4mm nozzle»; «I also suspect the filament…» | `:44` | **jaychatt** |

Las dos cuentas del artículo son correctas: 0,4 × 0,8 = 0,32 mm de techo y 0,2 / 0,4 = 50 %.
El artículo marca que el caso **no confirma ni refuta** el 80 % porque nadie midió el laminado,
y que el hilo se quedó sin resultado. Correcto.

### Foro 2024 — `warping-at-corners.md`

«those pics just look like the under extrusion and gaps at the seams caused by the recent
firmware/prusa slicer changes that many have reported and been complaining about», de
**Neophyl** (`warping-at-corners.md:61-63`). **Esta cita está partida a lo ancho de columna**:
el `grep` del fragmento entero no la encuentra y sí la encuentra partida en `:61-62` + `:63`.
Comprobado por mitades antes de juzgar, que es la trampa que produce rechazos falsos. La URL
de GitHub **no** está en `sources` ni enlazada como fuente; el cuerpo del hilo sí la trae.

### Tabla de materiales — `filament-material-guide.md`

`PLA | No, -, No | 185-235 °C, 50-60 °C` en la columna `TEMPERATURES (Nozzle, Bed)`:
literal, `:13-14`. El artículo reproduce la fila con sus pipes, separa boquilla de cama, dice
que el 50-60 °C es cama y **no** es un ajuste de este artículo, y saca de la columna de
hardware el `No, -, No` como corroboración con el «old days» del KB. Comprobado que el
fichero no contiene las palabras separación, adhesión, grieta ni deslaminado, que es lo que
el artículo afirma.

## Comprobaciones cruzadas con las otras dos páginas

| Afirmación de este artículo | Destino | Estado |
|---|---|---|
| «subir la cama es también el tercer ajuste de [[warping-pla]]» | `warping-pla:245` — «### 3. Sube la temperatura de cama» | Correcto, literal. Sigue siendo el tercer ajuste: la lista numerada es 1 chapa, 2 ventilador, 3 cama, 4 brim, 5 relleno |
| «el árbol de causas de la deformación» | `warping-pla:53` — «## Por qué ocurre» | Correcto |
| La columna de warping («Contracción térmica», «esquinas y brim») | `warping-pla:55`, `:369-374` | Respaldo real en el hermano, **no** en las siete fuentes de aquí, y ahora declarado. Ver nota |
| `[[temperatura-cama]]` para cifras por chapa y por casa, y para la cámara por encima de 45 °C | `temperatura-cama:58-80`, `:417-434` | Correcto. La promesa del enlace (`:500-503`) dice además que los +5-10 °C de cama y los +5 °C de cámara **no** salen de ahí, y es cierto: vienen de `interlayer-cracking:49`, que es fuente de este artículo |
| «una base arqueada no expulsa la separación» frente a la columna de Neophyl | `warping-pla:135-151` | Coherente: el hermano acota la columna de Neophyl a sus fotos concretas |

## Notas que no bloquean

- **La columna de warping se apoya en el artículo hermano, y el hermano no es una fuente.**
  `:95-102` lo declara, que es lo que pedía el brief, y la evidencia primaria de las dos celdas
  **sí está en `wiki/raw/`** (`warping-pla-bambu-wiki-warping-falling-off-collapsing.md:42-45`
  para la contracción térmica y `:129-133` para el brim y las esquinas), así que no se está
  sustituyendo una prueba por un enlace cruzado. Aun así, el lector que abra este artículo no
  tiene la fuente a la vista: nombrar la página de Bambu en lugar del artículo hermano sería
  un cierre, no una corrección.
- **«decide» en la entrada.** La descripción (`:3`) y `:39` dicen que hay «una comprobación
  que **decide** el ajuste», y `:114-118` dice que ninguna fuente da la regla complementaria y
  que lo que hay son causas posibles. No es una contradicción plana —el corte limpio y curvo sí
  decide grieta frente a capa que falta, y eso es lo que el cuerpo desarrolla— pero «orienta»
  sería más fiel en las dos primeras frases. Nota del informe 5, sin cambios.
- **El rango «Eminent Member»** de `:451` sale de las notas del recolector del hilo de 2020
  (`:49-50`) y del frontmatter del fichero, no de un post. Es un dato de perfil de usuario, no
  una afirmación técnica, y no se puede volver a comprobar contra el cuerpo. Nota del informe
  5, sin cambios.
- **«Los tres hilos»** — `:364-366` habla de «los dos hilos» y luego de «el tercer hilo de foro
  del lote». Los tres son los que están en `sources` más el de `warping-at-corners`, que es
  fuente compartida con el hermano; la frase es correcta y se entiende.
- **Ninguna negación térmica absoluta.** Revisadas las apariciones de «nunca», «siempre»,
  «jamás» y «decide»: las negaciones que hay son correctas («nadie escribe que un corte con
  material que falte sea siempre boquilla», «el KB nunca dice que 185 °C sea demasiado poco»,
  «la dirección de la grieta no decide nada por sí sola», «ninguna fuente cierra ninguna vía»).
- **Enlaces.** No hay ni un enlace Markdown normal a una página interna. Las cuatro páginas de
  «Si te interesa» están las cuatro nombradas; `capas-desplazadas` y `flow-rate` van como
  `[[slug|texto]]`, que es la sintaxis correcta para páginas pendientes. `warping-pla` y
  `temperatura-cama` existen.
- **Fuentes.** Las siete URLs de `sources` están en `wiki/raw/` con ese mismo `url:`, sin
  duplicados. No se ha comprobado disponibilidad HTTP actual.
- **Pie.** «Cinco consultadas el 2026-10-04; el hilo de las esquinas arrugadas y la tabla de
  materiales de Prusa, el 2026-10-03» coincide con los campos `capturado` de los siete
  ficheros. `date` y `updated` son ambos 2026-10-04.
- **Campo del panel.** El artículo admite que ninguna de las siete fuentes dice qué claves
  escribe un laminador: comprobado, no hay `layerHeight`, `bedTemp`, `hotendTemp` ni
  `nozzle_diameter` en el cuerpo de ninguna de las siete. La regla del 80 % sale de un único
  post de foro y el artículo lo dice cada vez que la usa.
- **Estado de la regla de los dos arreglos mecánicos.** El brief menciona un arreglo
  post-aprobación en la tabla de `:278-282` de `temperatura-cama` —la celda con barras
  verticales—, verificado por `verify:wiki` (112/112). En **este** fichero no hay ninguna barra
  vertical dentro de una celda: las tres tablas del cuerpo (`:81-86`, `:207-212`, `:287-291`)
  están limpias. No se ha ejecutado `npm run verify:wiki` en esta vuelta y este informe no
  afirma que haya pasado.

## Cobertura pendiente fuera de este artículo

- `capas-desplazadas` y `flow-rate`: páginas nombradas, sin escribir. `flow-rate` sigue sin
  fuente de calibración en `wiki/raw/`; el KB de separación la menciona y no la trae.
- `altura-capa` y una fuente oficial de la regla de altura: la regla del 80 % es de foro y no
  hay respaldo oficial en el lote. No es un enlace roto; es una necesidad editorial declarada
  en el cocinado.
- Las contradicciones cruzadas 1 a 4 del lint previo siguen cerradas en los tres artículos, y
  la quinta —la columna de chapa de la tabla de Prusa— está en
  `wiki/reviews/lint-r0-2026-10-04.md`, con su lado bueno y su lado pendiente.