# Revisión de `z-seam` — segunda vuelta

**Veredicto: APROBADO** — 0 fallos. Los ocho fallos de la vuelta 1 están corregidos, uno a
uno, y las correcciones no han roto nada.

Guía: `src/content/guias/z-seam.ts` (794 líneas). Cocinado: `wiki/cooked/z-seam.md`
(corregido). Brief: `wiki/briefs/z-seam.md`. Fuentes crudas: las seis del lote, abiertas
**por su ruta real** — `z-seam-bambu-wiki-bambu-studio-seam.md`,
`z-seam-bambu-wiki-print-quality-seam.md`, `z-seam-bambu-wiki-retraction-parameter.md`,
`z-seam-prusa-kb-seam-position.md`, `z-seam-prusa-kb-seam-painting.md` y la reutilizada
`secar-filamento-bambu-wiki-common-print-quality-problem.md`.

**Comprobado contra `wiki/raw/`, no contra el cocinado.** Las seis fuentes se han leído
enteras y cada afirmación de la guía se ha contrastado con el cuerpo de la fuente de la que
sale. Los seis ficheros de este lote tienen el cuerpo en líneas largas —ninguno partido a
80 columnas— así que ninguna cita cruzó un salto de línea y no hubo que buscar por las dos
mitades. El aviso del recolector sobre el `<div hidden id="S:1">` del KB de Prusa **no afecta
a esta revisión**: el bloque completo de las cuatro posiciones, el *seam gap*, los *staggered
inner seams* y el *scarf joint* están en el fichero, en el DOM normal (`seam-position.md:22`-
`:111`), y es de ahí —no del fragmento oculto— de donde sale todo lo que la guía afirma de
Prusa.

**Lo que hay que decir primero, porque es lo bueno: los ocho fallos están corregidos y las
cinco trampas siguen intactas.** No hace falta ninguna fuente nueva, y no la heechado de
menos: la matriz de 26 reglas y 24 tarjetas se ha vuelto a recorrer entera contra las seis
fuentes, dato a dato, y **no ha aparecido ningún fallo nuevo**. Los ocho fallos eran de
notación y de acotado de condiciones, y el redactor los ha resuelto por esa vía.

No se ha modificado la guía, ni el cocinado, ni las fuentes crudas.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **PASA** — las 23 citas y las 30 comillas angulares de origen están en `wiki/raw/`; las 8 cifras de la guía, una a una, también; ninguna afirmación sin fuente |
| 2 | Contradicciones internas | **PASA** — las dos contradicciones de la vuelta 1 han desaparecido; los 180 montajes de las cuatro variables no producen ningún par contradictorio |
| 3 | Relleno y frases de IA | **PASA** — 5.999 palabras visibles, 77 párrafos de contenido, ninguno sin dato, cifra o fuente propia; ninguna fórmula canónica |
| 4 | Las cuatro etapas, y que hagan algo | **PASA** — 25 comprobaciones mecánicas replicadas a mano sobre el módulo (todas en verde); 26 reglas y 24 tarjetas, ninguna inalcanzable, ninguna variable decorativa, las 26 reglas con `alcance` |
| 5 | Citas correctas y accesibles | **PASA** — 23/23 literales greppables tal cual y con su atribución correcta; 6/6 URLs de `fuentes` en `wiki/raw/`, sin repetir; la primera cita en la primera tarjeta (19,4 % del fichero) |

## Los ocho fallos de la vuelta 1, uno a uno

| # | Fallo de la vuelta 1 | Dónde está ahora | Estado |
|---|---|---|---|
| 1 | **Bloqueante.** Ocho comillas angulares con traducción, que no se podían encontrar con `grep` en `wiki/raw/` | `retraccion-rigidos` `:321`, `scarf-que-es` `:354`, `pintado` `:404`, `girar-pieza` `:468`, `pintar-bambu` `:478`, `random-fuerza` `:542`, `bambu-temp-velocidad` `:593`, `scarf-bambu` `:656` | **CORREGIDO.** Las ocho llevan ahora el literal inglés dentro de las comillas y la glosa en español **fuera** de ellas, con el patrón que la guía ya usaba bien en `pos-back` («behind the model», «close to max Y (rear of the print bed)»). Comprobado con `grep` sobre las seis fuentes: **las ocho son literales**, y las dos que sólo tenían una cita —`bambu-temp-velocidad` y `pintar-bambu`— la siguen teniendo |
| 2 | **Importante.** «No uses Random» y «Elige Random» en la misma pantalla | `random-fuerza` `:540` | **CORREGIDO.** Ahora `cuando: { slicer: 'prusa', posicion: 'repartida', forma: 'curva' }`, que es la condición que Prusa misma pone («when printing cylindrical shapes without any sharp edges, the Random seam position is a viable option», `seam-position.md:43`). Comprobado con el motor sobre los 180 montajes: **`random-no-esquinas` y `random-fuerza` salen juntos en 0 montajes** |
| 3 | **Importante.** «Es invisible» y «será muy evidente» en la misma pantalla | `esquina-invisible` `:445` | **CORREGIDO.** Ahora `cuando: { posicion: 'esquina', forma: ['esquinas', 'mixta'] }`. **`esquina-invisible` y `curva-normal` salen juntos en 0 montajes**, y `esquina-invisible` y `random-curva` también en 0. El montaje `curva + esquina` deja de existir como camino, que es exactamente lo que pedía la vuelta 1 |
| 4 | **Importante.** Las cuatro condiciones del *spiral vase* atribuidas a las dos casas | `spiral-vase` `:392` y `spiral-vase-alcance` `:695` | **CORREGIDO.** Los dos sitios separan las fuentes: «El precio lo escribe **Bambu**, con cuatro condiciones: una sola pared exterior, sin relleno ni tapa superior, y sólo modelos simples… **Prusa** pone dos de esas condiciones: un solo perímetro y nada de relleno», y «**Bambu** le pone cuatro… y **Prusa** dos: un solo perímetro y nada de relleno». Comprobado en el crudo: Prusa publica exactamente dos (`seam-position.md:111`), y la «tapa superior» y la restricción a modelos simples sólo están en Bambu (`print-quality-seam.md:25`) |
| 5 | **Menor.** La búsqueda de candidatos de *Nearest* publicada como idéntica en las dos casas | `pos-nearest` `:207` | **CORREGIDO.** Ahora: «Los tres primeros niveles… son los mismos en las dos… **Bambu añade un cuarto, el vértice con voladizo, como último recurso; Prusa no lo publica** y su texto termina en el tercero». Es lo que dice el cocinado corregido, y lo que dicen las fuentes: Bambu publica cuatro niveles (`bambu-studio-seam.md:45`) y Prusa tres (`seam-position.md:28`) |
| 6 | **Menor.** Tres citas no greppables tal cual | `mecanismo` `:275`, `pos-nearest` `:210`, `spiral-vase` `:396` | **CORREGIDO.** `mecanismo` cita ahora sólo la frase («Enable this will force the retraction on layer changes.», `retraction-parameter.md:98`) y deja el nombre del parámetro en el cuerpo. `pos-nearest` cita la versión de Prusa, que es la que no lleva marcas de énfasis. `spiral-vase` empieza por «The model printed by this mode…», con mayúscula. **Las tres son ahora cadenas continuas en el fichero crudo** |
| 7 | **Menor.** La tarjeta de *Aligned* quita el «mostly» de la fuente | `pos-aligned` `:218` | **CORREGIDO.** Ahora: «de modo que la costura queda **casi siempre alineada** a lo largo de toda la pieza: se sabe más o menos dónde está». El «Es una línea continua de arriba abajo» ha desaparecido, y la cita sigue siendo la literal con su «mostly» |
| 8 | **Menor.** El `valor` de la regla de Prusa es un hecho, no un ajuste | `seam-gap-prusa` `:620` | **CORREGIDO.** La regla ya **no tiene `valor`**: su acción («Ajusta el seam gap: positivo interrumpe el lazo, negativo lo solapa») no lleva cifra, así que `verify:guias` no se lo exige, y el «Ponerlo a 0 desactiva la función» está en el `porque` `:624`, que es donde estaba el resto de la explicación del signo. El 0 se ve ahora en la tarjeta `seam-gap-prusa` `:262`, sin acción que ajustar, que era la alternativa que proponía la vuelta 1 |

## Lo que han cambiado las reatribuciones del cocinado, y si la guía las respeta

El cocinado corrigió el cuarto nivel de *Nearest* y marcó nueve afirmaciones más como
**de una sola casa**. La guía respeta las nueve. Comprobado una a una:

| Afirmación marcada en `wiki/cooked/z-seam.md` (apartado «Sin respaldo») | Cómo la publica la guía |
|---|---|
| El modo *Random* aumenta la resistencia total — **sólo Prusa** | `pos-random` `:238` («**Según Prusa**, además…»), `random-fuerza` `:539` (`fuente: 'Prusa Research'`) y `:545` («Es un dato de Prusa y sólo de Prusa») |
| Las costuras son puntos débiles — **sólo Prusa** | `resistencia` `:414`, `random-fuerza` `:542` |
| El scarf joint mejora la resistencia — **sólo Prusa** | `scarf-prusa` `:667` («según Prusa, mejora la resistencia») y `:670` |
| El scarf joint aumenta el tiempo de impresión — **sólo Prusa** | `scarf-contra` `:381` y `scarf-prusa` `:670` |
| No retraer antes de limpiar mejora el Z-seam — **sólo Bambu** | `no-retract-before-wipe` `:636` (`fuente: 'Bambu Lab'`), `:638` («Prusa no publica nada equivalente en este lote») |
| «Retract on layer change» — **sólo Bambu** | `mecanismo` `:275` (`fuente: 'Bambu Lab'`) |
| «Scarf around entire wall» y la mala adhesión — **sólo Bambu** | `scarf-contra` `:381` (atribuido a Bambu) |
| «Role-Based Wipe Speed» no descrito — **no publicable** | `wipe-speed` `:424`: la página lo nombra y la guía dice que **no describe qué hace**; no le pone ninguna función |
| La página de Prusa no habla de la resistencia **del material** | La guía no afirma en ningún sitio que la resistencia dependa del filamento; y lo dice al revés en `curva-normal` `:552` («ni que el filamento sea el culpable») |
| El cuarto nivel de *Nearest* — **sólo Bambu** | `pos-nearest` `:207` |
| «Sin tapa superior» y «sólo modelos simples» del *spiral vase* — **sólo Bambu** | `spiral-vase` `:392` y `spiral-vase-alcance` `:695` |
| «Rear» lleva la costura al fondo de la cama — **sólo Prusa** | `pos-back` `:228` y `mover-detras` `:461` |
| La lógica de colocación del pintado manual — **sólo Prusa** | `pintado` `:404` («esa lógica no la publica Bambu»), `pintar-bambu` `:481`, `pintar-prusa` `:492` |
| Las condiciones de uso del modo *Random* — **sólo Prusa** | `random-curva` `:514` («Las condiciones de uso del modo las publica sólo Prusa… Bambu no dice para qué formas conviene») y `random-no-esquinas` `:523` (`fuente: 'Prusa Research'`) |

## Las cinco trampas que avisó el material cocinado

| Trampa | Estado | Comprobación |
|---|---|---|
| **La costura es normal e inevitable** | **BIEN TRATADA** | La tarjeta `no-es-defecto` `:186` publica las dos formulaciones literales («it is not possible to eliminate the seam…» de Prusa, «unavoidable in FDM 3D printing» de Bambu) y la regla `costura-normal` `:434` lo dice como marco, sin condición, con su `alcance` («Vale para cualquier material, cualquier forma y cualquier ajuste»). El *spiral vase* queda acotado a la pared exterior: `spiral-vase` `:392` («las costuras sólo quedan en las capas del fondo») y `spiral-vase-alcance` `:698` («No elimina la costura de la pieza»). **Ninguna regla promete borrar la costura** |
| **Bambu dice *Back* y Prusa dice *Rear*** | **BIEN TRATADA** | No hay ningún menú común. La variable `slicer` `:141`-`:142` publica los dos juegos con su casa («Nearest · Aligned · Back · Random» / «Nearest · Aligned · Rear · Random»), la tarjeta `pos-back` `:228` dice que «no hacen lo mismo» y expone las dos definiciones, y la regla `mover-detras` `:455` lleva `valor: 'Back (Bambu Studio) · Rear (PrusaSlicer)'` con el `alcance` que aclara que el *Rear* va al fondo de la cama y no detrás de la pieza. Los tipos de bufanda igual: `None / Contour / Contour and Hole` frente a `Nowhere / Contour / Everywhere`, con `scarf-tipos` `:364` diciendo que no hay equivalencia |
| **El 15 % de Bambu y la distancia con signo de Prusa no se funden** | **BIEN TRATADA** | Dos tarjetas (`seam-gap` `:245` y `seam-gap-prusa` `:259`) y dos reglas (`seam-gap-bambu` `:609` y `seam-gap-prusa` `:620`). El 15 % aparece como **porcentaje del diámetro actual de la boquilla** y como **valor por defecto**, con su nota de alcance; el 0 de Prusa es el que desactiva, y el `alcance` `:627` dice que Prusa no publica default. Las dos tarjetas y las dos reglas dicen explícitamente que no se traducen entre sí. **No hay ninguna cifra fundada en ninguna parte de la guía** |
| **La resistencia es sólo de Prusa** | **BIEN TRATADA** | La tarjeta `resistencia` `:414` abre con «Prusa es la única de las dos que habla de resistencia» y cierra con «Bambu **no publica nada de resistencia de la pieza en su apartado de costura** —ni en la página de ajustes de costura, ni en la de calidad de impresión, ni en el apartado de costura de la página de problemas comunes—». Comprobado: `grep` de `strength` en las tres páginas de Bambu del lote no devuelve nada de resistencia de la pieza; lo único parecido es el «to weaken the seam» de la bufanda, que es de visibilidad. Las reglas `random-fuerza`, `random-ya-activo`, `random-curva` y `scarf-prusa` repiten «según Prusa» o «sólo de Prusa» |
| **El *spiral vase* está acotado a la pared exterior y a los modelos simples** | **BIEN TRATADA** | Las cuatro condiciones están escritas y atribuidas a Bambu, las dos de Prusa separadas (`spiral-vase` `:392`, `spiral-vase-alcance` `:695`). La guía **no** lo presenta como solución general: el título de la tarjeta es «el único modo que quita la costura **de la pared**», la acción de la regla es «**No cuentes con** el modo Spiral vase para quitar la costura» y el `alcance` dice «No elimina la costura de la pieza: en Bambu las capas del fondo la siguen teniendo». El modo se remite a `relleno-patrones` |

## Las 26 reglas y las 24 tarjetas, contra las fuentes

Recorridas una a una. **Ninguna afirmación sin respaldo, ninguna contradicción, ningún
problema de atribución.** Resumen de lo que hay detrás de cada bloque:

| Bloque | Reglas | Fuente y comprobación |
|---|---|---|
| Marco | `costura-normal` | Bambu `:13` + Prusa `:107`. Sin condición, con `alcance` que explica por qué |
| Modo de posición | `esquina-invisible`, `nearest`, `mover-detras`, `girar-pieza`, `random-curva`, `random-no-esquinas`, `random-ya-activo`, `random-fuerza`, `curva-normal`, `mixta-dos-zonas` | Bambu `:45`-`:73` y Prusa `:26`-`:49`. Cada una con su casa: *Nearest* invisible (Bambu `:47`, Prusa `:26`), *Back* detrás (Bambu `:65`), *Rear* al fondo de la cama (Prusa `:49`), *Random* con zits (Bambu `:73`, Prusa `:41`) y con zits repartidos (Prusa `:41`) |
| Pintado | `pintar-bambu`, `pintar-prusa` | Bambu `:93` y Prusa `seam-painting.md:11`-`:19`. Cada una con su casa |
| Métodos de Bambu | `bambu-perimetros`, `bambu-una-pieza`, `bambu-temp-velocidad` | `print-quality-seam.md:19`, `:21`, `:23`. Los tres en la lista de cuatro, y el 3 es el único número de los cuatro |
| Métodos de Prusa | `prusa-flow` | `seam-position.md:109`. Sin cifras |
| Seam gap | `seam-gap-bambu`, `seam-gap-prusa` | Bambu `:81` (15 %) y Prusa `:53` (signo, 0 desactiva) |
| Retracción | `no-retract-before-wipe`, `no-retract-tpu` | `retraction-parameter.md:118` y `:124`. Sólo Bambu, y la regla lo dice |
| Bufanda | `scarf-bambu`, `scarf-prusa`, `scarf-no-angulos`, `scarf-no-voladizos` | Bambu `:103`, `:113`, `:169`, `:173`, `:179`, `:193` y Prusa `:63`, `:65`, `:83`. Cada contraindicación con su casa |
| Spiral vase | `spiral-vase-alcance` | Bambu `print-quality-seam.md:25` y Prusa `seam-position.md:111`, separadas |

## Las cuatro etapas, y que hagan algo

`z-seam` **sigue sin estar en el registro `GUIAS`** (`src/lib/guias.ts:81`), así que
`npm run verify:guias` no la ha mirado: el contador sale en 845/845 sin haber contado esta
guía. Sus comprobaciones se han replicado sobre el módulo en `/tmp/opencode/check-z-seam-2.mjs`
(sin tocar el repositorio): **pasan todas, 25/25** con la guía añadida al registro. `tsc -b`
compila sin errores y `verify:wiki` sigue en 208/208.

- **El diferencial abre la guía** y sus tres comprobaciones tienen las dos caras: `si` y `no`
  en las tres, y cada `si` es accionable. El `siNo` va a `elephant-foot`, que existe.
- **Ninguna variable es decorativa**, y las cuatro cambian el resultado de verdad: `forma`
  (6 diferencias de resultado), `posicion` (12), `slicer` (6) y `material` (14). Las dos
  marcadas `necesaria` (`forma` y `posicion`) van primero.
- **Ninguna regla ni ninguna tarjeta es inalcanzable**: los 180 montajes de las cuatro
  variables (3 × 4 × 3 × 5) se han recorrido, y las 26 reglas y las 24 tarjetas salen en al
  menos uno. El reparto es de 4 a 15 reglas por montaje.
- **Ninguna regla muerta**: toda variable que aparece en una condición está declarada, es
  rellenable y tiene un valor válido. Ningún valor de condición es imposible.
- **Las 26 reglas tienen `alcance`**, incluidas las tres sin condición (`costura-normal`,
  `scarf-no-voladizos`, `spiral-vase-alcance`), que lo usan para explicar por qué no pueden
  condicionarse. `verify:guias` lo avisa, no lo falla, y las tres lo explican.
- **Toda acción con una cifra la lleva en `valor`**: `3 perímetros`, `15 %`, `0 %`,
  `Nearest (las dos casas)`, `Random (las dos casas)`, `None · Contour · Contour and Hole`,
  `Nowhere · Contour · Everywhere`, `Back (Bambu Studio) · Rear (PrusaSlicer)` y
  `Seam enforcers · Seam blockers (PrusaSlicer 2.3+)`. Ninguna cifra enterrada en el `porque`.
- **Las dos cifras de tarjeta llevan su nota de alcance** (`seam-gap` y
  `no-retract-before-wipe`), y son de valor distinto, así que no hay dos cifras iguales con
  alcances distintos.
- **`fueraDeAlcance` tiene los ocho destinos del brief**, y cada uno dice qué caso no entra,
  por qué y a dónde llevarlo. Los doce destinos de enlace (un `siNo`, tres `enlaza` y ocho
  `fueraDeAlcance`) existen **por su `slug`**: `elephant-foot`, `warping-pla`,
  `separaciones-entre-capas`, `stringing`, `flow-rate`, `paredes-y-perimetros`,
  `relleno-patrones` y `orientacion-resistencia`. **Cero enlaces `[[slug]]`**: el mecanismo
  viejo ya no existe y no se usa.
- **El panel**: `campos: []` en la guía y `leeDelAnalisis: ['material']`, con la variable
  `material` declarando `campos: ['material']` — el mismo mecanismo que `secar-filamento` y
  `tpu-flexible`. El campo `material` ya tiene dueño en la guía `material`, así que
  `CAMPOS_WIKI` no se toca.

## Las 23 citas, una a una

Las 23 son **cadenas continuas en `wiki/raw/`**, sin una sola excepción, y cada una está
atribuida a la casa que la dice:

| # | Tarjeta | Literal | Fichero crudo |
|---|---|---|---|
| 1 | `que-es` | The seam is a kind of gap between the start and end points of each perimeter of the layer | `bambu-studio-seam.md:13` |
| 2 | `no-es-defecto` | it is not possible to eliminate the seam. It will always be somewhat visible | `seam-position.md:107` |
| 3 | `forma-pieza` | some models with circular surfaces (such as cylinders) will not be able to hide the seams, which will be very obvious | `bambu-studio-seam.md:15` |
| 4 | `pos-nearest` | this will try to choose a concave non-overhang vertex so that the seam is hidden inside the concave angle | `seam-position.md:28` |
| 5 | `pos-aligned` | This will ensure the seam is mostly aligned throughout the whole object | `bambu-studio-seam.md:57` (idéntico en Prusa `:34`) |
| 6 | `pos-back` | The seam will be set behind the model | `bambu-studio-seam.md:65` |
| 7 | `pos-random` | making the seams look less uniform and less obvious than "aligned" or "back" | `bambu-studio-seam.md:73` |
| 8 | `seam-gap` | The default value is 15%. | `bambu-studio-seam.md:81` |
| 9 | `seam-gap-prusa` | Positive values will shorten and interrupt the loop slightly to reduce the seam. Negative values will extend the loop | `seam-position.md:53` |
| 10 | `mecanismo` | Enable this will force the retraction on layer changes. | `retraction-parameter.md:98` |
| 11 | `retraccion-alcance` | the retraction is to prevent stringing and oozing from affecting the appearance of the model | `retraction-parameter.md:88` |
| 12 | `no-retract-before-wipe` | If it doesn't retract before wiping, the Z-seam effect on the outer wall will be better | `retraction-parameter.md:118` |
| 13 | `retraccion-flexible` | may affect the diameter of the filament and cause it to shrink, leading to clogging and other extrusion problems | `retraction-parameter.md:124` |
| 14 | `retraccion-rigidos` | for all other materials such as PLA, ABS, and PETG, the printing effect is better when the retraction is enabled | `retraction-parameter.md:124` |
| 15 | `bambu-metodos` | Appropriately raise the nozzle temperature and reduce the printing speed of the outer wall | `print-quality-seam.md:23` |
| 16 | `prusa-metodos` | you can try lowering the extrusion multiplier and calibrating the linear advance value to lower the visibility of the seam | `seam-position.md:109` |
| 17 | `scarf-que-es` | The Scarf seams overlap extrusions at the end and start of the perimeter loop | `seam-position.md:61` |
| 18 | `scarf-cuando` | The Scarf joint is not applied on non-smooth surfaces as the seam can be hidden on curves and corners of the object. | `seam-position.md:83` |
| 19 | `scarf-contra` | Note that using scarf seams increases print time, and is less effective in sharp corners and overhangs. | `seam-position.md:65` |
| 20 | `spiral-vase` | The model printed by this mode has only a single outer wall, no infill and top shell, and only applies to some simple models | `print-quality-seam.md:25` |
| 21 | `pintado` | The Nearest, Rear, and Random Seam position options are still respected. | `seam-painting.md:19` |
| 22 | `resistencia` | the seams are weak spots for the prints | `seam-position.md:57` |
| 23 | `wipe-speed` | setting the wiping speed to 80% means that the wiping speed = the traveling speed * 80% | `bambu-studio-seam.md:87` |

Las **30 comillas angulares** que no son campo `cita` se han comprobado con el mismo método:
**todas las que son cita de una fuente son literales greppables**. Las siete que no aparecen
en el crudo son del propio texto de la guía y no se presentan como cita de nadie: «el
problema a corregir» (`:14`, en el comentario de cabecera), «Tu archivo» (`:57` y `:155`, la
etiqueta de la interfaz), «Se nota más» / «está mal» (`:77`-`:78`, la fórmula del gate 2 del
brief) y «tienes un problema» / «es normal y la forma es la que lo decide» (`:78`-`:79`, la
prosa del comentario del diferencial).

**Las 6 URLs de `fuentes` están en `wiki/raw/` con ese mismo `url`**, una cada una, y no hay
ninguna repetida. La fuente reutilizada está declarada como lo que es —«se cita como
corroboración, no como fuente independiente»—, que es exactamente lo que dice el cocinado.

## Los gates 1 a 6 del brief

| Gate | Estado | Comprobación |
|---|---|---|
| **1 · La costura no es un defecto** | **CUMPLE** | `no-es-defecto` `:186` con las dos literales, `costura-normal` `:434` como marco sin condición, y ninguna regla que prometa borrar la costura |
| **2 · «Se nota más» no es «está mal»** | **CUMPLE** | El mecanismo se publica con su fuente: `mecanismo` `:273` explica que el filamento se recarga en el hotend al final del desplazamiento, «justo donde acaba una capa y empieza la siguiente», y cita «Enable this will force the retraction on layer changes.» La resistencia no se afirma sin dato: sale con el literal de Prusa y con la casa escrita |
| **3 · Un límite del aparato no es una propiedad del material** | **CUMPLE** | El 15 % es «el valor por defecto de **Bambu Studio**»; el «Retract amount before wipe» lleva en su `alcance` «**no es una propiedad del material**»; el 0 de Prusa es un parámetro de slicer y no una medida |
| **4 · El *spiral vase* no es la solución general** | **CUMPLE** | Condiciones separadas por casa, alcance explícito de que no elimina la costura de la pieza, acción «No cuentes con…», y remisión a `relleno-patrones` |
| **5 · Ninguna cifra de retracción, de cama ni de altura de capa** | **CUMPLE** | **Cero** cifras de temperatura o de longitud en toda la guía. El 0 % es un *default* de un parámetro, no una longitud de retracción; el 15 % es un porcentaje del diámetro de boquilla, no un milímetro. El 80 % es el ejemplo de la página y la guía lo dice («no un valor recomendado») |
| **6 · No se generaliza a partir de un solo fabricante** | **CUMPLE** | Cada dato lleva su casa. Las cinco reglas de una sola casa (`pintar-bambu`, `bambu-perimetros`, `bambu-una-pieza`, `bambu-temp-velocidad`, `seam-gap-bambu`, `no-retract-before-wipe`, `scarf-bambu`; y al revés `random-no-esquinas`, `random-fuerza`, `prusa-flow`, `seam-gap-prusa`, `scarf-prusa`, `pintar-prusa`) declaran `fuente` con una sola casa, y las de las dos casas llevan el matiz en el `alcance` |

## Las tres escenas de la prueba de utilidad

| Escena | ¿Decidible? | Por dónde |
|---|---|---|
| **Una pieza cilíndrica con una línea vertical visible a lo largo de toda la pared** | **Sí** | `forma: curva` + `posicion: pared` → `curva-normal` («acepta que se ve»), `random-curva` («prueba el modo Random») y `mover-detras` («aleja la costura de la cara que se mira», con `Back`/`Rear` separados). Las tarjetas que lo explican: `forma-pieza`, `pos-random`, `no-es-defecto` |
| **Un bulto en la base, justo donde empieza la primera capa** | **Sí, y sale de la guía** | La primera comprobación del diferencial lo separa: «No: si lo que hay es un anillo o un bulto en la base, es pie de elefante», y el `siNo` lleva a `elephant-foot` |
| **Una pieza cuya costura cae en la cara que se va a ver y no la puede girar** | **Sí** | `posicion: cara-visible` → `girar-pieza` `:464`, y según el slicer `pintar-bambu` `:474` o `pintar-prusa` `:484`. El `alcance` de `girar-pieza` avisa de que si la cara visible no tiene esquinas, girar no basta |

## Notas que no bloquean

Son tres, y ninguna es motivo de rechazo. Las dos primeras son de la vuelta 1 y siguen
abiertas a propósito; la tercera es de esta vuelta.

1. **La guía todavía no está en el registro `GUIAS`** (`src/lib/guias.ts:81`). Es un paso de
   publicación, no un defecto del contenido: cuando se añada, `verify:guias` la mirará y
   **las comprobaciones mecánicas ya pasan** (25/25 replicadas), así que lo que saldrá es un
   **AVISO** por las tres reglas sin condición (`costura-normal`, `scarf-no-voladizos`,
   `spiral-vase-alcance`), y las tres lo explican en su `alcance`, que es lo que pide el
   aviso. La guía tiene ya `slug: 'z-seam'`. Lo mismo pasa con `tpu-flexible`, que tampoco
   está registrada.

2. **`mixta-dos-zonas` es una lectura editorial, no una recomendación de la fuente** —combina
   *Nearest* en los vértices con el *scarf* en las zonas lisas—, y su `alcance` lo dice: «
   Ninguna fuente da un procedimiento para combinar los dos modos». Está bien publicado, pero
   conviene que el lector sepa que la combinación es de la guía. **Sigue así, y es lo
   correcto.**

3. **Dos compresiones que se pueden afinar, sin que sean un fallo.** La primera: la tarjeta
   `pos-back` `:228` y la regla `mover-detras` `:458` dicen que «las dos casas la justifican
   por lo mismo: dejar una superficie lisa en la cara que se mira», y «superficie lisa» es la
   fórmula literal de Bambu («If you want to get a smooth surface in the front»); la de Prusa
   es «useful for objects that will be displayed with a specific orientation». La guía **sí
   da las dos literales por separado** en `girar-pieza` `:468`, y el `alcance` de
   `mover-detras` `:461` explica la diferencia operativa, así que la distinción está a la
   vista; sólo la frase de resumen es más fuerte que la fuente de Prusa. La segunda: la
   tarjeta `random-curva` `:511` dice que al cambiar de punto en cada capa «la marca deja de
   ser una línea continua», que es una paráfrasis de «making the seams look less uniform» y
   de los «small zits scattered across the surface», no una frase de ninguna fuente. Ninguna
   de las dos inventa un dato; son lecturas, y como tales se pueden marcar como tales en la
   siguiente vuelta si se quiere.

## Lo que dijo la vuelta 1 y esta vuelta confirma

- **Las cinco trampas del cocinado siguen bien tratadas**, y ahora además están **atribuidas
  casa por casa** en los cinco sitios donde la vuelta 1 hubiera podido encontrar una fusión.
- **La matriz de 26 reglas y 24 tarjetas no ha cambiado en su estructura**: sólo se han
  movido tres condiciones (`random-fuerza`, `esquina-invisible`, `random-curva`) y se han
  reatribuido cuatro tarjetas (`pos-nearest`, `pos-aligned`, `spiral-vase`, `resistencia`).
  Recorrida entera contra las seis fuentes: **ningún fallo nuevo**.
- **Las seis URLs y las 23 citas**, otra vez, una por una.

## Para la siguiente vuelta

1. **Publicar la guía** (añadirla a `GUIAS`): es lo único que queda pendiente de este tema.
2. **Si se quiere cerrar del todo la compresión de `pos-back`**, la frase de las dos casas
   puede pasar a ser «Bambu lo justifica por la superficie lisa de la cara que se mira y Prusa
   por la orientación en la que se muestra la pieza», que es lo que dicen las dos fuentes.
   No es un fallo: es una mejora de precisión.
3. **Raw no se ha tocado y no hay que tocarlo.** Los ocho fallos se han resuelto en la
   redacción y en el cocinado, y **no hace falta ninguna fuente nueva**: las seis del lote
   cubren el tema entero.
