# Revisión de separaciones-entre-capas — quinta vuelta, 2026-10-04

**Veredicto: APROBADO** — las cinco comprobaciones pasan. Quedan tres correcciones
menores, ninguna de ellas una afirmación técnica sin respaldo, y están en
«Correcciones menores pendientes».

Artículo: `src/content/wiki/separaciones-entre-capas.md` (502 líneas).
Cocinado: `wiki/cooked/separaciones-entre-capas.md`.
Brief: `wiki/briefs/separaciones-entre-capas-revision.md`.
Historial: `wiki/reviews/separaciones-entre-capas-revision-4.md` (sólo historial).

Se leyeron los **cuerpos** de las siete fuentes crudas y se	localizó en ellos cada
afirmación técnica, cada cita entrecomillada y cada cifra, por nombre propio y no sólo
por frase completa. El cooked se usó como lista de affair, nunca como prueba: una
afirmación que aparece a la vez en el artículo y en el cooked puede haber nacido en los
dos sitios y sólo `wiki/raw/` la desmiente. No se ha consultado internet ni modificado
artículo, cooked, `wiki/raw/` ni informes anteriores.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo en `wiki/raw/` | PASA — 61 datos y 26 citas localizados en el cuerpo de las siete fuentes |
| 2 | Contradicciones internas | PASA — ventilador, cama, boquilla y los tres rangos no se contradicen en ningún punto |
| 3 | Relleno y frases de IA | PASA — ningún párrafo sin dato; ninguna fórmula canónica |
| 4 | Longitud y estructura | PASA — 5.159 palabras, un H1, frontmatter completo, `slug` correcto, orden de secciones |
| 5 | Citas correctas y accesibles | PASA — 7 URLs únicas y verificadas contra `url:` de raw; atribución, exactitud y contexto correctos |

**Recuento de palabras.** Calculado sobre el fichero real con el método que declara el
informe 4: en JavaScript, sobre el cuerpo visible, sin frontmatter, sin URLs y sin
sintaxis Markdown (`!\[[^\]]*\]\([^)]*\)` y `\[[^\]]*\]\([^)]*\)` sevacían de URL
conservando la etiqueta de enlace; `\[[^\]]*\]` se sustituye por su texto visible), y con
`/[\p{L}\p{N}]+(?:[’'_-][\p{L}\p{N}]+)*/gu`. Conserva títulos, tablas, etiquetas de
enlaces y pie. **5.159 palabras.** Si además se cuentan los slugs de los `[[slug|texto]]`
—que en una transcripción estricta no serían visibles— son 5.166. El informe 4 declaraba
3.905: el artículo ha crecido ~1.250 palabras en esta vuelta, y el crecimiento es todo
material de las siete fuentes, ninguno nuevo sin respaldo (ver «Lo nuevo de esta vuelta»).

**Primera cita:** línea 47, dentro del primer 10 % del cuerpo.

## Trazabilidad: qué se comprobó y dónde

### Knowledge Base de Prusa — `layer-separation-and-splitting-fdm.md`

| Afirmación del artículo | Raw |
|---|---|
| «This refers to the de-lamination of the printed layers»; causas: preset o perfil mal puesto y/o demasiada refrigeración «from either the print fan or the surrounding environment» | `:11` |
| «old days» de camas sin calentar; raro en MK con presets de PrusaSlicer, sobre todo PLA y PETG | `:13` |
| Criterio de grieta: «Best way to identify cracked layers are the clean cuts that show a bit of an upward bend or warp» | `:15` |
| Mecanismo: «Warping forces exceed the layer adhesion strength and the layers separate» | `:17` |
| ABS y aire frío antes de enfriar del todo; «turning fans OFF for ABS prints completely»; cámara cerrada «even heated» | `:23`, `:25` |
| PETG «does not have the same tendency to crack/de-laminate»; ASA más dependiente del entorno; «You can check the material guides for choosing the best material for your print» | `:27` |
| «Depending on the brand, PLA is printed at a range between 195-220», **sin unidad**; incremento de 5 °C hasta buena adhesión | `:29` |
| Flow rate / extrusion multiplier en incrementos del 5 %; sólo en modo Advanced o Expert; remite a una calibración no descargada | `:33`, `:35` |

El artículo **no le pone unidad** al 195-220 y dice por qué en el texto, y **no da ninguna
cifra de cama** tomada de este KB: verificado, el fichero no contiene ninguna.

### Bambu Lab — `interlayer-cracking.md`

| Afirmación del artículo | Raw |
|---|---|
| «cracks may appear on the printed part along the Z direction»; materiales ABS, ASA, PC, PET-CF, PA-CF | `:13` |
| «A slight nozzle clog **may** prevent filament extrusion during a specific layer, manifesting similarly to cracking» | `:21` |
| Método 1 cold pull, tutoriales por modelo sin cifras | `:23–35` |
| Método 2 «Appropriately Increase Nozzle Temperature or Decrease Print Speed»; mecanismo de más tiempo para unirse a la capa de debajo; **velocidades 150 y 100 mm/s escritas «with ABS»** | `:37`, `:39` |
| Método 3 y el 60 % «Max fan speed», **sin material al lado** | `:43`, `:45` |
| Método 4: cama **+5-10 °C**, cámara **+5 °C** si hay calefacción activa | `:49` |

El artículo mantiene la diferencia de atribución que importa: **las velocidades llevan
ABS escrito; el 60 % no lleva material**, y lo dice como ejemplo de interfaz y no como
recomendación para el material del lector.

### `layer-shifting_2020.md`

| Afirmación del artículo | Raw |
|---|---|
| Definición de capa desplazada y desalineación a mitad de impresión por movimiento anormal de X e Y | `:11` |
| «wrong tension of the belts or pulleys not being secure» | `:15` |
| «it is crucial to recognize in which axis the layers shifted» | `:13` |
| Regla de la diagonal: movimiento inconsistente en diagonal → «the motor that controls that diagonal, or the pulley attached to it» | `:37` |
| **Encabezado `Prusa CORE One`**, dentro de «Check the XY axes movement and the belt tension», con la impresora fría y apagada y por las dos diagonales; aviso «do not lose alignment of the CoreXY» | `:23`, `:33`, `:35`, `:39` |
| Belt Status en `LCD Menu -> Support -> Belt Status` sólo en MK3/S/+; ~250 en X y ~275 en Y con ±15; aflojar bajo o cerca de 240, apretar sobre o cerca de 290 | `:110`, `:112`, `:116`, `:118` |
| «The value does not represent a physical quantity, but an arbitrary number inversely proportional to the motor load» | `:114` |
| Voladizos que suben, choque de boquilla, relleno muy bajo; prevención de **otra** cosa: subir ventilador o retracción | `:218`, `:220` |

**Alcance de modelo:** el artículo dice dos veces que la tabla de la diagonal es del árbol
del CORE One y que no vale como regla general, y que el alcance MK3/S/+ es el del Belt
Status. Es lo que el raw enuncia. El defecto 6 del informe 4 está cerrado.

### Foro 2026 — `layer-separation-delamination-help.md`

| Afirmación del artículo | Raw | Voz |
|---|---|---|
| «the separation's pretty bad as the model gets higher but there's even under-extrusion on the base of the temperature tower» | `:63` | **newgen** |
| «The photo doesn't have very high resolution, but this is what you can mainly see» | `:69` | **Naugh** |
| «a severe under-extrusion clog around 205°C before it could even attempt the 200°C layer» | `:71` | **Naugh** |
| Viscosidad, capas «spongy», puente roto; 205–210 °C con sagging y poor layer adhesion; poor nozzle wipe y «stray loops around the brim/bed» | `:73`, `:75`, `:77` | **Naugh** |
| «The sweet spot for this material at the current print speed is around 220°C–230°C» | `:79` | **Naugh** |
| «Adjusted the idler tension screws» | `:37` | **newgen** |
| «The issue still persists so I'll post it in the correct one» | `:87` | **newgen** |
| Elegoo PLA; los cinco posts; 205 y 200 como capas de la torre | `:19`, `:13–87` | — |

**Éste es el corazón del encargo.** Las tres piezas que se habían fundido antes están
separadas y con nombre: la observación es de newgen, la interpretación de la foto es de
Naugh, y el artículo dice expresamente que «205 °C y 200 °C son capas de la torre de
temperaturas» y que **nadie del hilo sitúa la causa en un lugar del objeto**. No aparece
ni el nombre «tornillos de inercia» ni ninguna afirmación de que la causa estuviera abajo
del todo. Verificado también por el otro lado: las notas del recolector de `:106–113` sí
afirman eso («la causa real estaba abajo del todo, en la base») y **el artículo no lo
reproduce**. Es exactamente el movimiento que la vuelta anterior no hizo.

### Foro 2020 — `separation-of-layers-in-middle-of-print.md`

| Afirmación del artículo | Raw | Voz |
|---|---|---|
| «A few possible causes» + «Excessive cooling/insufficient heat. Try reducing cooling first… adding 5-10C may help» | `:23`, `:29` | **bobstro** |
| Regla del 80 % del diámetro de boquilla, literal y completa | `:25` | **bobstro** |
| «under-extrusion on long straight extrusions» | `:27` | **bobstro** |
| «I don't think it was a layer size issue, since I was doing 0.2mm layers with a 0.4mm nozzle»; «I also suspect the filament…» | `:44` | **jaychatt** |

Las dos cuentas del artículo son correctas: 0,4 × 0,8 = 0,32 mm de techo y 0,2 / 0,4 = 50 %.
El artículo marca que el caso **no confirma ni refuta** el 80 % porque nadie midió el
laminado, y que el hilo se quedó sin resultado. Correcto.

### Foro 2024 — `warping-at-corners.md`

| Afirmación del artículo | Raw | Voz |
|---|---|---|
| «those pics just look like the under extrusion and gaps at the seams caused by the recent firmware/prusa slicer changes that many have reported and been complaining about» | `:61–63` | **Neophyl** |

**Esta cita está partida a lo ancho de columna**: el `grep` del fragmento entero no la
encuentra y sí la encuentra partida en `:61–62` + `:63`. Comprobado por mitades antes de
juzgar, que es la trampa que produce rechazos falsos.

El artículo acota el caso a lo que la fuente acota —fallos en las juntas, coincidentes con
un cambio de versión— y avisa en «Qué puede salir mal» de no convertir el issue 11914 en
un comodín. La URL de GitHub **no** está en `sources` ni enlazada; el cuerpo del hilo sí.

### Tabla de materiales — `filament-material-guide.md`

`PLA | No, -, No | 185-235 °C, 50-60 °C` en la columna `TEMPERATURES (Nozzle, Bed)`:
literal, `:13–14`. El artículo reproduce la fila con sus pipes, separa boquilla de cama, dice
que el 50-60 °C es cama y **no** es un ajuste de este artículo, y saca de la columna de
hardware el `No, -, No` como corroboración con el «old days» del KB. Comprobado que el
fichero no contiene las palabras separación, adhesión, grieta ni deslaminado, que es lo que
el artículo afirma.

## Los dos rangos: recomendación de dos documentos, sin elegir

Es lo que pedía el defecto 7, y está resuelto de la forma correcta:

- Los tres números van en tabla con su documento de origen, no con un propósito inventado.
- El artículo **declara** que su lectura —tabla de conjunto frente a artículo escrito desde
  el fallo— es suya: «nuestra lectura, y la declaramos como interpretación nuestra porque
  Prusa no la escribe».
- Y dice en las dos direcciones que ningún documento se remite al otro para esa cifra, con
  la cita exacta del único sitio donde el KB sí remite a las guías de material (el párrafo
  del ABS, `:27`).
- El tercer número, el 220-230 °C, va con autor, con «hilo sin resolver», con «Elegoo PLA» y
  con la advertencia de que explicar por qué puede coexistir **no es respaldarlo**.
- En «Qué puede salir mal» hay un punto entero contra elegir entre 185-235 y 195-220, que
  es exactamente el error anterior.

## Estado de los siete defectos del informe 4

| # | Defecto del informe 4 | Estado |
|---|---|---|
| 1 | Prohibía la vía térmica para los problemas de flujo | **Corregido.** Bambu y su paso 2 se citan con su modal *may*; Naugh se cita como el caso térmico que va en sentido contrario; dos veces se dice que ninguna fuente cierra ninguna vía. |
| 2 | «Ventilador primero» como orden compartido | **Corregido.** El artículo atribuye «primero» a bobstro y a su lista de «a few possible causes», y conserva el orden real de Bambu con el ventilador tercero. |
| 3 | Observación e interpretación fundidas en causa confirmada | **Corregido.** Ver la tabla del foro 2026. |
| 4 | «Tornillos de inercia» | **Corregido.** «Ajustar los tornillos de tensión del idler», con la cita literal del post y la advertencia de no atribuirle función. |
| 5 | Diagnóstico excluyente y geometría no acreditados | **Corregido.** «along the Z direction» va marcado como lectura nuestra; la base arqueada no expulsa la separación; y se dice que subir la cama es también el tercer ajuste de `warping-pla`. |
| 6 | Regla diagonal sin modelo | **Corregido.** CORE One, geometría CoreXY, dos veces. |
| 7 | 185-235 como rango de trabajo y 195-220 como de diagnóstico | **Corregido.** Ver la sección anterior. |

## La promesa del enlace a `temperatura-cama`

El informe 4 y el lint marcaron que el enlace prometía explicar el **+5 °C de cámara** y que
ese incremento no está en el destino. La descripción del enlace se ha reescrito y ahora es
fiel: `temperatura-cama` `:410–464` documenta las tres cifras por chapa y por casa, qué pasa
con la cámara por encima de 45 °C con PLA y qué avisa OrcaSlicer; **no contiene el +5 °C de
cámara** en ningún sitio, y el artículo lo dice y atribuye el incremento a su propia tabla de
los cuatro métodos, que viene de `interlayer-cracking:49`. Promesa cumplida.

De paso queda cerrada la contradicción 3 del lint en el lado de este artículo:
`temperatura-cama:692–698` ya no excluye la cama para las capas sueltas y remite a esta
página, y aquí la cama se presenta como paso 4 de un protocolo oficial y como ajuste
compartido con `warping-pla`.

## Comprobaciones cruzadas con las otras dos páginas

| Afirmación de este artículo | Destino | Estado |
|---|---|---|
| «subir la cama es también el tercer ajuste de [[warping-pla]]» | `warping-pla:241` — «### 3. Sube la temperatura de cama» | Correcto, literal |
| «el árbol de causas de la deformación» | `warping-pla:53` — «## Por qué ocurre» | Correcto |
| «[[temperatura-cama]]» para cifras por chapa y por casa, y para la cámara por encima de 45 °C | `temperatura-cama:31–35`, `:60–67`, `:117`, `:410–464` | Correcto |
| La columna de warping de la tabla («Contracción térmica», «esquinas y brim») | `warping-pla:55`, `:357` | Respaldo en la página hermana, **no** en las siete fuentes de este artículo — ver corrección menor 2 |

## Lo nuevo de esta vuelta

El artículo ha crecido unas 1.250 palabras respecto al que contaba 3.905. Se ha ido sección
por sección buscando relleno y ampliación sin respaldo, y el crecimiento es de dos cosas:

1. **Material nuevo tomado de las siete fuentes y verificado:** la fila de la tabla de
   materiales con su corroboración de hardware, la comparación de los tres números de boquilla
   con su documento de origen, el aviso de alcance sobre el PLA y el 60 %, la regla de
   lectura del 80 % con sus dos cuentas, el recuento de los descartes de newgen y el nombre
   literal del ajuste del idler, y el apartado del tercer frente con el issue 11914 acotado.
2. **Los siete defectos corregidos**, que exigen sitio para decir quién dijo qué, con qué
   modal y con qué estado.

No hay ningún párrafo nuevo sin dato, ni ninguna cifra nueva que no esté en el cuerpo de una
fuente. **No he encontrado relleno ni ampliación sin respaldo en lo añadido.**

## Correcciones menores pendientes

Ninguna de las tres hace caer una de las cinco comprobaciones, y por eso el veredicto no las
convierte en rechazo. Las tres están localizadas y son fáciles de arreglar.

### 1 · Menor · El recuento de artículos con campo del frontmatter es incorrecto

**Dónde:** líneas 18–19, dentro del bloque de comentarios del `frontmatter`.

**Qué dice:** «El plan de contenido sólo nombra campo en siete de los nueve artículos, y los
dos que no lo nombran son éste y `enclosure-y-warping`».

**Por qué no bloquea:** no es una afirmación técnica de impresión, no se renderiza (es un
comentario YAML) y la regla que el comentario documenta es correcta: `layerHeight` es de
`altura-capa` (`plan-de-contenido.md:154`), separación no necesita campo
(`plan-scraping-conocimiento.md:63`) y `warpingRisk`/`riskLevel` son de `warping-pla`
(`plan-de-contenido.md:14`). Lo que falla es la enumeración.

**Por qué está mal, exacto:** `docs/plan-de-contenido.md` numera nueve entradas, y las que
nombran campo son la 1 `bedTemp`, la 3 `material`, la 4 `hasOverhangs`/`overhangAngle`, la 7
`layerHeight`, la 8 `hotendTemp` y la 9 `slicer`: **seis**. Las que no lo nombran son la 2
(este artículo), la 5 —`### 5 · adhesion-primera-capa — sin campo`— y la 6
`enclosure-y-warping (sin campo)`: **tres, no dos**.

**Qué hacer:** escribir «seis de los nueve» y «los tres que no lo nombran son éste,
`adhesion-primera-capa` y `enclosure-y-warping`»; o borrar el recuento y dejar sólo la
razón, que es lo que importa.

### 2 · Menor · La columna de warping de la tabla no lleva su procedencia

**Dónde:** tabla de las líneas 81–86, celdas «Contracción térmica» y «A las esquinas y al
brim»; explicación en las líneas 88–93.

**Qué dice:** la tabla presenta el warping como el otro fallo, con su causa y con dónde
mirar, sin ninguna marca de procedencia.

**Por qué no bloquea:** el párrafo siguiente declara que «esa tabla mezcla fuente e
inferencia», y las dos celdas tienen respaldo real en `warping-pla` (`:55` y `:357`), que
esta misma línea enlaza. Lo único que falta es decirlo, porque las otras dos filas sí se
pueden atar a las definiciones de Prusa que este artículo cita.

**Qué hacer:** una frase más en el párrafo de las líneas 88–93: que las dos celdas de la
columna de warping vienen de `warping-pla` y no de las siete fuentes de aquí.

### 3 · Menor · Dos precisiones de redacción

**a) «una prueba de tres movimientos»** (línea 161, repetido en 451). El raw enumera X, Y y
**las dos diagonales**: son cuatro movimientos en tres categorías. No cambia lo que el
lector tiene que hacer, pero el número no está en la fuente.

**b) Las etiquetas del caso de Naugh no están en todas las menciones** (líneas 413–414, en
«Qué puede salir mal»). El resto de las menciones sí lleva autor y estado; esa dice sólo
«el hilo de 2026 va justo al revés: Naugh atribuyó la pérdida de flujo a la viscosidad al
bajar la temperatura». La afirmación que sostiene es una negación sobre lo que dicen las
fuentes, no una dependencia del diagnóstico, así que el riesgo es bajo; pero el brief pedía
que las etiquetas acompañaran cada mención, y aquí basta con añadir «de foro» y «sin
resolver» para cerrarlo.

## Notas que no bloquean

- **«decide» en la entrada.** La descripción y la línea 39 dicen que hay «una comprobación
  que decide el ajuste», y las líneas 105–109 dicen que ninguna fuente da la regla
  complementaria y que lo que hay son causas posibles. No es una contradicción plana: el
  criterio de Prusa (corte limpio y curvo = grieta) sí decide grieta frente a capa que falta,
  y eso es lo que el cuerpo desarrolla. Aun así, «orienta» sería más fiel que «decide» en
  las dos primeras frases, porque es lo que el artículo sostiene después.
- **El rango «Eminent Member»** de la línea 442 sale de las notas del recolector del hilo de
  2020 (`:49–50`), no de un post. Es un dato de perfil del usuario, no una afirmación técnica,
  y no se puede volver a comprobar contra el cuerpo; conviene saber de dónde viene.
- **Ninguna negación térmica absoluta.** Revisadas todas las apariciones de «nunca»,
  «siempre», «jamás» y «decide»: las cuatro negaciones que hay son correctas («nadie escribe
  que un corte con material que falte sea siempre boquilla», «el KB nunca dice que 185 °C sea
  demasiado poco», «la dirección de la grieta no decide nada por sí sola», «ninguna fuente
  cierra ninguna vía»).
- **Enlaces.** No hay ni un enlace Markdown normal a una página interna. Las cuatro páginas
  nombradas en «Si te interesa» están las cuatro nombradas; `capas-desplazadas` y `flow-rate`
  van como `[[slug|texto]]`, que es la sintaxis correcta para páginas pendientes. `warping-pla`
  y `temperatura-cama` existen.
- **Fuentes.** Las siete URLs de `sources` están en `wiki/raw/` con ese mismo `url:`, sin
  duplicados y en el orden correcto. No se ha comprobado disponibilidad HTTP actual.
- **Pie.** «Cinco consultadas el 2026-10-04; el hilo de las esquinas arrugadas y la tabla de
  materiales de Prusa, el 2026-10-03» coincide con los campos `capturado` de los siete
  ficheros. `date` y `updated` son ambos 2026-10-04, coherente con un artículo creado y
  revisado el mismo día.
- **Campo del panel.** El artículo admite que ninguna de las siete fuentes dice qué claves
  escribe un laminador: comprobado, no hay `layerHeight`, `bedTemp`, `hotendTemp` ni
  `nozzle_diameter` en el cuerpo de ninguna de las siete. La regla del 80 % sale de un único
  post de foro y el artículo lo dice cada vez que la usa.

## Cobertura pendiente fuera de este artículo

- `capas-desplazadas` y `flow-rate`: páginas nombradas, sin escribir. `flow-rate` sigue sin
  fuente de calibración en `wiki/raw/`; el KB de separación la menciona y no la trae.
- `altura-capa` y una fuente oficial de la regla de altura: la regla del 80 % es de foro y
  no hay respaldo oficial en el lote. No es un enlace roto; es una necesidad editorial
  declarada en el cooked.
- `warping-pla:120–134` ya no atribuye la categoría general «separaciones entre capas» al
  firmware: lo acota a las fotos de aquel caso, que es lo que pide este artículo. La
  contradicción cruzada 2 del lint queda cerrada en los dos lados.
- No se ha ejecutado `npm run verify:wiki` ni se ha comprobado nada en navegador; este
  informe no afirma que hayan pasado.