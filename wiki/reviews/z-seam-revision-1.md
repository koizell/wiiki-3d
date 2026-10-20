# Revisión de `z-seam` — primera vuelta

**Veredicto: RECHAZADO** — 8 fallos, de los cuales 1 bloqueante.

Guía: `src/content/guias/z-seam.ts` (790 líneas). Cocinado: `wiki/cooked/z-seam.md`. Brief:
`wiki/briefs/z-seam.md`.
Fuentes crudas: las seis del lote, abiertas **por su ruta real** y no por el nombre del
fichero (`secar-filamento-bambu-wiki-common-print-quality-problem.md` es la reutilizada, y
las otras cinco llevan el prefijo `z-seam-`).

**Comprobado contra `wiki/raw/`, no contra el cocinado.** Cada cifra, cada cita y cada
atribución de esta guía se ha contrastado con el cuerpo de la fuente de la que sale, no con
`wiki/cooked/z-seam.md`. La razón es la de siempre: el artículo y el cocinado coinciden por
construcción, así que compararlos sólo detectaría lo que el redactor se inventó por su
cuenta, que no es el error que más ha pasado. Los seis ficheros de Prusa y de Bambu de este
lote tienen el cuerpo en líneas largas y se han leído enteros —no hay citas partidas por
salto de línea— y el aviso del recolector sobre el `<div hidden id="S:1">` del KB de Prusa
**no afecta a esta revisión**: el bloque completo de las cuatro posiciones, el *seam gap*,
los *staggered inner seams* y el *scarf joint* están en el fichero, en el DOM normal, y es
de ahí —no del fragmento oculto— de donde sale todo lo que la guía afirma de Prusa.

**Lo que hay que decir primero, porque es lo bueno: las cinco trampas que avisó el material
cocinado están bien tratadas, y las cinco.** La costura se publica como normal e
inevitable, con la cita literal de las dos casas; *Back* y *Rear* salen por separado y con
la diferencia escrita; el 15 % de Bambu y la distancia con signo de Prusa no se funden en
ninguna cifra; los dos datos de resistencia se atribuyen a Prusa y se dice explícitamente
que Bambu no dice nada; y el *spiral vase* sale con sus condiciones, sin presentarse como
solución general. **Ninguno de los ocho fallos toca las cinco trampas ni la matriz**: son
ocho correcciones de cita y de acotado de condiciones, no de investigación. No hace falta
ninguna fuente nueva.

No se ha modificado la guía, ni el cocinado, ni las fuentes crudas.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — ocho comillas angulares con traducción que **no están en `wiki/raw/`**; las cuatro condiciones del *spiral vase* atribuidas a las dos casas cuando dos son sólo de Bambu; la búsqueda de candidatos de *Nearest* publicada como idéntica en las dos casas |
| 2 | Contradicciones internas | **FALLA** — dos caminos declarados sacan reglas opuestas: `random-no-esquinas` contra `random-fuerza`, y `esquina-invisible` contra `curva-normal` y `random-curva` |
| 3 | Relleno y frases de IA | PASA — ninguna fórmula canónica («en resumen», «cabe destacar», «en el mundo de la impresión 3D»…); 5.675 palabras visibles y ningún párrafo sin dato, cifra o fuente propia |
| 4 | Las cuatro etapas, y que hagan algo | PASA — diferencial con 3 comprobaciones de dos caras, 4 variables justificadas y ninguna decorativa, 26 reglas y 24 tarjetas, 8 destinos de `fueraDeAlcance`; las comprobaciones mecánicas de `verify:guias` replicadas a mano: **todas en verde** (872/872) |
| 5 | Citas correctas y accesibles | **FALLA** — las 24 `cita` están en `wiki/raw/` y con su atribución correcta, pero tres no son greppables tal cual; las 6 URLs de `fuentes` sí están en `wiki/raw/` con ese mismo `url` y no hay ninguna repetida |

### Comprobación 4 en detalle

`z-seam` **todavía no está en el registro `GUIAS`** (`src/lib/guias.ts:81`), así que
`npm run verify:guias` **no la ha mirado**: el contador sale en 845/845 sin haber contado
esta guía. Se han replicado sus comprobaciones sobre el módulo en
`/tmp/opencode/check-z-seam.mjs` (sin tocar el repositorio): **pasan todas**, 872/872 con la
guía añadida al registro.

- Ninguna condición apunta a una variable inexistente, y ningún valor de condición es
  imposible (las 26 reglas y las 24 tarjetas).
- Toda acción con cifra (`°C`, `mm`, `%`) la lleva en `valor`; ninguna la entierra en el
  `porque`.
- **Las 26 reglas tienen `alcance`**, incluidas las que llevan cifra, que es lo que pide la
  regla de la wiki cuando la fuente acota.
- Ninguna variable es decorativa y **cada una cambia el resultado en algún montaje** (la
  comprobación de alcanzabilidad, con todas las combinaciones de las variables vecinas).
- Ninguna regla con condición sale sin contestaciones; las tres reglas sin condición
  (`costura-normal`, `scarf-no-voladizos`, `spiral-vase-alcance`) lo explican en su
  `alcance`.
- Los doce destinos de enlace (`siNo`, tres `enlaza` y ocho `fueraDeAlcance`) existen **por
  su `slug`**, no por su nombre de fichero: `elephant-foot`, `warping-pla`,
  `separaciones-entre-capas`, `stringing`, `flow-rate`, `paredes-y-perimetros`,
  `relleno-patrones` y `orientacion-resistencia` están todos en el registro.
- Negritas equilibradas y ningún `**` en un campo que se pinta como texto plano.
- El `campos` del panel no está en la guía: `campos: []` y `leeDelAnalisis: ['material']`,
  como `secar-filamento` y `tpu-flexible`. La variable `material` declara
  `campos: ['material']`, así que la barra «Tu archivo» enseña el material del G-code y lo
  lleva a la casilla. El `material` ya tiene dueño en la guía `material`.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Ocho comillas angulares con traducción, que no están en `wiki/raw/`

**Dónde:** reglas `girar-pieza` (`:463`), `pintar-bambu` (`:473`), `random-fuerza` (`:537`),
`bambu-temp-velocidad` (`:588`), `scarf-bambu` (`:652`); tarjetas `retraccion-rigidos`
(`:316`), `scarf-que-es` (`:349`), `pintado` (`:399`).

**Qué dicen:** ocho pasajes entre comillas angulares que **no se pueden encontrar con `grep`
en `wiki/raw/`**, porque están traducidos al español. La guía usa « » de dos maneras a la
vez: en unas frases para el **literal en inglés** de la fuente (`:182` «it is not possible to
eliminate the seam…», `:223` «behind the model», «close to max Y (rear of the print bed)»)
y en otras para **una traducción**. El lector no puede distinguir una cosa de otra, y en la
siguiente vuelta no hay forma de comprobar las ocho.

| Dónde | Lo que la guía escribe entrecomillado | El literal en `wiki/raw/` |
|---|---|---|
| `:316` `retraccion-rigidos` | «todos los demás materiales, como PLA, ABS y PETG, el resultado de impresión es mejor cuando la retracción está activada» | `retraction-parameter.md:124` — «for all other materials such as PLA, ABS, and PETG, the printing effect is better when the retraction is enabled» |
| `:349` `scarf-que-es` | «en la mayoría de los casos» | `bambu-studio-seam.md:103` — «which in most cases can reduce the visibility of seams» |
| `:399` `pintado` y `:473` `pintar-bambu` | «a veces la posición automática no es ideal, puedes personalizar la posición de la costura pintando el método a mano» | `bambu-studio-seam.md:93` — «Sometimes the auto seam position may be not ideal, you can customize the seam position by manually painting the method» |
| `:463` `girar-pieza` | «una superficie lisa en la cara que se mira» | `bambu-studio-seam.md:65` — «If you want to get a smooth surface in the front» |
| `:463` `girar-pieza` | «para objetos que se muestran con una orientación concreta» | `seam-position.md:49` — «This option is useful for objects that will be displayed with a specific orientation» |
| `:537` `random-fuerza` | «aumenta la resistencia total de la impresión» | `seam-position.md:41` — «This option increases the overall strength of the print» |
| `:588` `bambu-temp-velocidad` | «subir adecuadamente la temperatura de la boquilla y reducir la velocidad de impresión de la pared exterior» | `print-quality-seam.md:23` — «Appropriately raise the nozzle temperature and reduce the printing speed of the outer wall» |
| `:652` `scarf-bambu` | «como una bufanda» | `bambu-studio-seam.md:103` — «making it overlap like a scarf» |

**Por qué es bloqueante y no una nota de estilo:** el contenido de las ocho es **correcto**;
el problema es la notación, y la notación es lo que hace que la cita sea una cita. El
protocolo de la wiki está escrito: *«una cita entrecomillada que no existe en la fuente es,
por protocolo, motivo de rechazo aunque la frase signifique lo que dice»*
(`wiki/reviews/secar-filamento-revision-1.md:130`), y se aplicó igual en la revisión de
`tpu-flexible` (`:98`). Además, en las cinco reglas la comilla es **la única cita que hay**,
porque `Regla` no tiene campo `cita`: ahí no hay ninguna otra prueba de que el texto sea de
la fuente. Y en `:588` la frase introduce la comilla con «la página lo dice sin cifras:»,
que es exactamente la sintaxis de una cita textual.

**Qué hacer:** las ocho en el literal inglés, dentro de las comillas, con la glosa en español
fuera de ellas —el patrón que la propia guía ya usa bien en `:223` («behind the model»,
«detrás de la pieza»)—, o sin comillas y atribuidas («Bambu dice que la visibilidad baja en
la mayoría de los casos»). En `:652`, «como una bufanda» es una glosa de la metáfora
—«making it overlap like a scarf»—: o entra el literal, o la palabra se queda sin
comillas.

### 2 · Importante · «No uses Random» y «Elige Random» en la misma pantalla

**Dónde:** reglas `random-no-esquinas` (`:512`, `cuando: { forma: ['esquinas', 'mixta'] }`) y
`random-fuerza` (`:533`, `cuando: { slicer: 'prusa', posicion: 'repartida' }`).

**Qué pasa:** con `forma: esquinas` (o `mixta`), `posicion: repartida` y `slicer: prusa` —
comprobado con el motor— salen a la vez las tres:

```
REGLA random-no-esquinas | No uses Random si la pieza tiene esquinas: usa Nearest o Aligned
REGLA random-ya-activo   | Lo que ves es el modo Random funcionando, no un fallo
REGLA random-fuerza      | Elige Random: según Prusa, refuerza la pieza
```

La primera dice que no se use *Random*; la tercera dice que se elija *Random*. Y las dos son
de Prusa, así que **no es una fusión entre casas**: es que la guía no ha acotado la regla de
resistencia a la forma de la pieza, que es la condición que Prusa misma pone.

**Por qué falla:** Prusa dice las dos cosas, pero en dos sitios distintos y con dos
condiciones distintas. La primera está en la ficha de *Random*:
*«It makes little sense to use Random seam position on models with corners/sharp edges; it's
much better to use Nearest or Aligned in such cases»* (`seam-position.md:43`). La segunda es
una propiedad general del modo: *«This option increases the overall strength of the print»*
(`seam-position.md:41`). Y la página de Prusa acota el *Random* a las piezas sin aristas
vivas: *«when printing cylindrical shapes without any sharp edges, the Random seam position
is a viable option»* (misma línea). La regla `random-fuerza` no recoge ninguna de las dos
condiciones, y por eso contradice a `random-no-esquinas` en el camino en el que se da de
carne.

**Qué hacer:** acotar `random-fuerza` a la forma que la fuente sí soporta: `cuando: { slicer:
'prusa', posicion: 'repartida', forma: 'curva' }`. Con eso, el camino `esquinas|repartida|
prusa` deja de sacar «Elige Random» y queda con «No uses Random» + el diagnóstico, que es
lo que quiere decir la fuente. La alternativa es quitarle el `cuando` de `forma` a
`random-no-esquinas` y meterle la excepción en su `alcance`, pero la primera es más limpia:
las dos reglas nunca coexisten.

### 3 · Importante · «Es invisible» y «será muy evidente» en la misma pantalla

**Dónde:** reglas `esquina-invisible` (`:438`, `cuando: { posicion: 'esquina' }`),
`curva-normal` (`:543`, `cuando: { forma: 'curva' }`) y `random-curva` (`:501`,
`cuando: { forma: 'curva' }`).

**Qué pasa:** con `forma: curva` y `posicion: esquina` salen a la vez:

```
REGLA esquina-invisible | No cambies nada: en una esquina la costura es invisible
REGLA curva-normal      | Acepta que se vea: en una superficie curva no se puede esconder
REGLA random-curva      | Prueba el modo Random
```

Las dos primeras se contradicen en la misma pantalla: una dice que la costura **es
invisible** y la otra que **no se puede esconder y será muy evidente**. Y la tercera dice
«prueba», donde la primera dice «no cambies nada».

**Por qué falla:** el `porque` de `random-curva` empieza por «En una pieza cilíndrica **sin
esquinas** la costura no se puede esconder en ninguna parte» —la propia regla escribe su
premisa con la condición dentro—, y esa condición es la que `esquina-invisible` da por
cumplida. Las dos reglas son certas por separado y son falsas juntas: `esquina-invisible` no
pregunta por la forma, y `curva-normal` no pregunta por la posición.

**Qué hacer:** lo mismo que en el fallo 2, y por el mismo motivo. Acotar `esquina-invisible`
a las formas que de verdad tienen vértices: `cuando: { posicion: 'esquina', forma: ['esquinas',
'mixta'] }`. Con eso, `curva|esquina` deja de existir como camino con contradicción (es
una declaración que la propia variable `forma` hace imposible: una pieza «redonda o
cilíndrica» no tiene esquinas donde esconder la costura).

### 4 · Importante · Las cuatro condiciones del *spiral vase* no son de las dos casas

**Dónde:** tarjeta `spiral-vase` (`:384`, cuerpo `:387`) y regla `spiral-vase-alcance`
(`:688`, `porque` `:691`), las dos con `fuente: 'Bambu Lab, Prusa Research'`.

**Qué dicen:**

> «El precio está escrito en las dos fuentes: **una sola pared exterior, sin relleno y sin
> tapa superior**, y **sólo modelos simples**, porque los complejos no se pueden imprimir con
> una sola línea.»

> «…las dos fuentes le ponen condiciones: una sola pared exterior, sin relleno y sin tapa
> superior, y sólo modelos simples, porque los complejos no se pueden imprimir con una sola
> línea.»

**Por qué falla:** de las cuatro condiciones, **dos son de Bambu y no de Prusa**. La fuente
de Prusa es una sola frase (`seam-position.md:111`):

> «You can use the Vase mode to avoid the seam, but then you'll be limited to using only one
> perimeter and no infill.»

Es decir: Prusa publica **un perímetro y nada de relleno**. Ni la **tapa superior** ni la
restricción a **modelos simples** —ni la explicación de que los complejos no se pueden
imprimir con una sola línea— están en Prusa: están en la página de Bambu
(`print-quality-seam.md:25`, «only a single outer wall, no infill and top shell, and only
applies to some simple models (complex models cannot be completed with a single line…)»).
La guía lo publica como si las dos casas dieran las cuatro, y lo hace en el sitio donde el
brief pone la puerta (gate 4). La `cita` de la tarjeta es correcta y es de Bambu, que es la
casa que sí las dice: lo que falla es la frase que dice que las dan las dos.

**Por qué es importante y no menor:** el resto de la guía es escrupulosa con la
asimetría entre casas —la resistencia, el *Random*, el *seam gap*, los tipos de bufanda— y
aquí se mezcla. Es el mismo defecto que el fallo 6 de `tpu-flexible`: una lista de fuentes
(o de `alcance`) que atribuye a una página algo que esa página no tiene.

**Qué hacer:** separar las dos fuentes, como se hace en la tarjeta `resistencia`. Por
ejemplo: «El precio lo escribe Bambu: una sola pared exterior, sin relleno ni tapa superior, y
sólo modelos simples, porque los complejos no se pueden imprimir con una sola línea. Prusa
pone dos de esas condiciones: un solo perímetro y nada de relleno.» Y en el `porque` de la
regla, lo mismo: «Bambu le pone cuatro condiciones…; Prusa, dos: un perímetro y sin relleno».

### 5 · Menor · La búsqueda de candidatos de *Nearest* no es la misma en las dos casas

**Dónde:** tarjeta `pos-nearest` (`:200`, cuerpo `:203`).

**Qué dice:**

> «La búsqueda de candidatos es la misma en las dos: primero los vértices cóncavos sin
> voladizo, después los convexos sin voladizo, después cualquier vértice sin voladizo, **y
> sólo al final uno con voladizo**.»

**Por qué falla:** el cuarto nivel —el vértice **con** voladizo— es de Bambu
(`bambu-studio-seam.md:45`: «concave non-overhang vertex > convex non-overhang vertex > a
non-overhang vertex > overhang vertex»). El de Prusa tiene **tres** niveles
(`seam-position.md:28`): cóncavo sin voladizo > convexo sin voladizo > cualquier vértice sin
voladizo, y a partir de ahí el desempate es otro («the start point is the nearest to the
previous extruder position», frente al «closest to the end of the previous print path» de
Bambu). La frase publica el cuarto nivel como si fuera de las dos casas.

**De dónde viene:** del cocinado, literalmente: *«la misma búsqueda de candidatos en las
dos casas: primero un vértice cóncavo sin voladizo, luego uno convexo sin voladizo, luego
cualquier vértice sin voladizo, y por último uno con voladizo»* (`wiki/cooked/z-seam.md:34`).
**Ojo: si se corrige sólo en la guía, vuelve por la misma puerta en la siguiente vuelta.** Lo
que hay que corregir es el cocinado, y después la frase de la guía.

**Qué hacer:** «Los tres niveles son los mismos en las dos casas: cóncavo sin voladizo,
convejo sin voladizo y cualquier vértice sin voladizo. Bambu añade un cuarto, el vértice con
voladizo, como último recurso.» El desempate ya está publicado en la misma tarjeta
(`:203`, «Bambu añade que el modo optimiza el camino de viaje… Prusa, que está pensado para
velocidad, poco desplazamiento…»), así que la tarjeta no pierde nada.

### 6 · Menor · Tres citas de las tarjetas no son greppables tal cual

**Dónde:** tarjetas `mecanismo` (`:270`), `pos-nearest` (`:205`) y `spiral-vase` (`:391`).

| Dónde | La cita | Por qué no aparece tal cual en `wiki/raw/` |
|---|---|---|
| `:270` `mecanismo` | `Retract on layer change — Enable this will force the retraction on layer changes.` | La fuente tiene el titular en una línea (`retraction-parameter.md:96`, «### ¶ Retract on layer change») y la frase en otra (`:98`): **el guion largo no está en la fuente**, es una unión del redactor. Es la **única** cita de todo el repositorio con esa forma (`grep -rh "texto: '[^']* — [^']*'"` → 1) |
| `:205` `pos-nearest` | `If your model has sharp corners, this will make the seam effectively invisible` | La fuente la lleva con las marcas de énfasis del extractor: «this will make the seam effectively **invisible**» (`seam-position.md:26`). El texto es idéntico; los asteriscos son lo único que impide el `grep` |
| `:391` `spiral-vase` | `the model printed by this mode has only a single outer wall, no infill and top shell, and only applies to some simple models` | La fuente empieza con mayúscula: «**The** model printed by this mode has only a single outer wall…» (`print-quality-seam.md:25`). La guía la baja porque la cita va embebida en la frase |

**Por qué falla:** el criterio de la wiki es que una cita se pueda encontrar con `grep`. Las
tres son literales en el fondo y las tres se pueden arreglar en un minuto, pero mientras
tanto no son comprobables por la máquina.

**Qué hacer:** en `:270`, citar sólo la frase («Enable this will force the retraction on layer
changes») y dejar el nombre del parámetro en el cuerpo de la tarjeta, que ya lo tiene. En
`:205`, nada: es una diferencia de las marcas de énfasis del extractor, y el texto es
idéntico — pero conviene saberlo para no perseguirlo. En `:391`, empezar por «The model
printed by this mode…» con la mayúscula, o cortar la cita antes de esa palabra.

### 7 · Menor · La tarjeta de *Aligned* quita el «mostly» de la fuente

**Dónde:** tarjeta `pos-aligned` (`:210`, cuerpo `:213`).

**Qué dice:** «…de modo que la costura queda **alineada a lo largo de toda la pieza**. Es una
línea continua de arriba abajo: se sabe dónde está…»

**Por qué falla:** las dos casas dicen *«This will ensure the seam is **mostly** aligned
throughout the whole object»* (`bambu-studio-seam.md:57` y `seam-position.md:34`). La
condición es la misma en las dos, así que la cita de la tarjeta está bien; lo que falla es
el cuerpo, que pasa de «mostly aligned» a «alineada» y añade «Es una línea continua», que
ninguna fuente dice. El propio Prusa matiza en *Random* que el modo produce *zits* y una
superficie menos suave, y eso también alcanza a un *Aligned* en las piezas difíciles.

**Qué hacer:** «de modo que la costura queda **casi siempre alineada** a lo largo de toda la
pieza» y quitar el «Es una línea continua de arriba abajo», que no está en ninguna fuente.

### 8 · Menor · El `valor` de la regla de Prusa es un hecho, no un ajuste

**Dónde:** regla `seam-gap-prusa` (`:615`, `valor` en `:617`).

**Qué dice:** `valor: '0 desactiva la función'`, con un `alcance` que dice «Prusa **no publica
un valor por defecto**, así que aquí no se da ninguno.»

**Por qué falla:** el `valor` es la cifra que se pinta grande y en color de acento; el
`alcance` es el texto de debajo. Con esta combinación, quien declare `slicer: prusa` ve un
**0** destacado en una regla que dice «Ajusta el seam gap», y un 0 en el *seam gap*
**desactiva la función** —justo lo contrario de lo que la regla quiere. Y la propia regla
dice en su `alcance` que no se da ningún valor por defecto, que es lo que el `valor`
promete a la vista. El `valor` debería llevar el número que hay que poner, no un dato sobre
el 0.

**Qué hacer:** quitar el `valor` de esa regla (su acción no lleva cifra, así que
`verify:guias` no lo exige) y dejar el «Ponerlo a 0 desactiva la función» en el `porque`, que
es donde ya está el resto de la explicación del signo. Si se quiere que el 0 se vea, que
sea en la tarjeta `seam-gap-prusa` (`:254`), donde el cuerpo ya lo dice y donde no hay
ninguna acción que ajustar.

## Las cinco trampas que avisó el material cocinado

| Trampa | Estado | Comprobación |
|---|---|---|
| **La costura no se puede eliminar en ninguna de las dos casas** | **BIEN TRATADA** | La tarjeta `no-es-defecto` (`:179`) publica las dos formulaciones literales («it is not possible to eliminate the seam…» de Prusa, «unavoidable in FDM 3D printing» de Bambu) y la regla `costura-normal` (`:429`) lo dice como marco, sin condición, con su `alcance` («Vale para cualquier material, cualquier forma y cualquier ajuste»). El *spiral vase* queda acotado a la pared exterior: tarjeta `spiral-vase` («las costuras sólo quedan en las capas del fondo») y regla `spiral-vase-alcance` («No elimina la costura de la pieza»). **Ninguna regla promete borrar la costura** |
| **Bambu dice *Back* y Prusa dice *Rear*** | **BIEN TRATADA** | No hay ningún menú común. La variable `slicer` (`:133`) publica los dos juegos con su casa («Nearest · Aligned · Back · Random» / «Nearest · Aligned · Rear · Random»), la tarjeta `pos-back` (`:220`) dice que «no es exactamente lo mismo» y expone las dos definiciones, y la regla `mover-detras` (`:448`) lleva `valor: 'Back (Bambu Studio) · Rear (PrusaSlicer)'` con el `alcance` que aclara que el *Rear* va al fondo de la cama y no detrás de la pieza. Los tipos de bufanda igual: `None / Contour / Contour and Hole` frente a `Nowhere / Contour / Everywhere`, con la tarjeta `scarf-tipos` (`:356`) diciendo que no hay equivalencia |
| **El 15 % de Bambu y la distancia con signo de Prusa no se funden** | **BIEN TRATADA** | Dos tarjetas (`seam-gap` `:240` y `seam-gap-prusa` `:254`) y dos reglas (`seam-gap-bambu` `:604`, `seam-gap-prusa` `:615`). El 15 % aparece como **porcentaje del diámetro actual de la boquilla** y como **valor por defecto**, con su nota de alcance; el 0 de Prusa es el que desactiva, y el `alcance` dice que Prusa no publica default. Las dos tarjetas y las dos reglas dicen explícitamente que no se traducen entre sí. **No hay ninguna cifra fundada en ninguna parte de la guía** |
| **El dato de resistencia es sólo de Prusa** | **BIEN TRATADA** | La tarjeta `resistencia` (`:406`) abre con «Prusa es la única de las dos que habla de resistencia» y cierra con «Bambu **no dice nada de resistencia** en ninguna de sus tres páginas de costura» (comprobado: `grep` de `strength` en las tres páginas de Bambu del lote no devuelve nada de resistencia de la pieza; lo único parecido es el «to weaken the seam» de la bufanda, que es de visibilidad). Las reglas `random-fuerza` y `random-ya-activo` y `random-curva` repiten «El aumento de resistencia es un dato **sólo de Prusa**», y `random-fuerza` lleva «según Prusa» en la propia acción. Comprobado también que la página de Prusa no dice nada de la resistencia **del material** |
| **El *spiral vase* sólo aplica a modelos simples, una pared, sin relleno ni tapa** | **BIEN TRATADA EN EL FONDO, CON UN FALLO DE ATRIBUCIÓN** | Las cuatro condiciones están escritas, y la `cita` es literal y es de Bambu. Lo que falla es que la frase las atribuya a las dos casas (fallo 4). La guía **no** lo presenta como solución general: el título de la tarjeta es «el único modo que quita la costura **de la pared**», la acción de la regla es «**No cuentes con** el modo Spiral vase para quitar la costura» y el `alcance` dice «No elimina la costura de la pieza: en Bambu las capas del fondo la siguen teniendo». El modo se remite a `relleno-patrones` |

## Las tres escenas de la prueba de utilidad del brief

| Escena | ¿Decidible? | Por dónde |
|---|---|---|
| **Una pieza cilíndrica con una línea vertical visible a lo largo de toda la pared** | **Sí** | `forma: curva` → `curva-normal` («acepta que se ve»), `random-curva` («prueba el modo Random») y `mover-detras` si la costura está en la pared. Las tres tarjetas que lo explican: `forma-pieza`, `pos-random`, `no-es-defecto` |
| **Un bulto en la base, justo donde empieza la primera capa** | **Sí, y sale de la guía** | La primera comprobación del diferencial (`:87`) lo separa: «No: si lo que hay es un anillo o un bulto en la base, es pie de elefante», y el `siNo` (`:105`) lleva a `elephant-foot` |
| **Una pieza cuya costura cae en la cara que se va a ver y no la puede girar** | **Sí** | `posicion: cara-visible` → `girar-pieza` (`:459`), y según el slicer `pintar-bambu` (`:469`) o `pintar-prusa` (`:479`). El `alcance` de `girar-pieza` avisa de que si la cara visible no tiene esquinas, girar no basta |

## Lo que sí pasa, comprobado

- **Las 24 citas de las tarjetas están en `wiki/raw/` con su atribución correcta** y ninguna
  cruza un salto de línea. La primera cita está en la primera tarjeta (`que-es`), no al
  final. Las únicas tres que no son greppables tal cual son el fallo 6.
- **Las 6 URLs de `fuentes` están en `wiki/raw/`** con ese mismo `url`, y no hay ninguna
  repetida. La fuente reutilizada
  (`https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem`) está
  declarada como lo que es —«se cita como corroboración, no como fuente independiente»—, que
  es exactamente lo que dice el cocinado: su apartado «Seam» es párrafo por párrafo el mismo
  texto que `z-seam-bambu-wiki-print-quality-seam.md`.
- **El diferencial abre la guía y sus tres comprobaciones tienen las dos caras.** `si` y `no`
  en las tres, y cada `si` es accionable.
- **Ninguna variable es decorativa**, y las cuatro cambian el resultado de verdad: `forma`
  (3 formas), `posicion` (4 posiciones), `slicer` (3 programas) y `material` (5
  materiales). Las dos marcadas `necesaria` (`forma` y `posicion`) van primero.
- **`fueraDeAlcance` tiene los ocho destinos del brief**, y cada uno dice qué caso no entra,
  por qué y a dónde llevarlo.
- **La cifra va en `valor` y el porqué debajo**, en las 26 reglas, y **las 26 reglas tienen
  `alcance`**.
- **No hay ninguna cifra de retracción, de temperatura de cama ni de altura de capa
  repetida.** El 0 % de «Retract amount before wipe» es un *default* de un parámetro, no una
  longitud de retracción; el 15 % es un porcentaje del diámetro de boquilla, no un
  milímetro; y las cifras de temperatura de boquilla y de velocidad de pared exterior no
  aparecen, con el `alcance` diciendo que no se inventan.

## Notas que no bloquean

- **La guía todavía no está en el registro `GUIAS`** (`src/lib/guias.ts:81`). Al publicarla
  hay que añadirla, y entonces `verify:guias` la mirará: **las comprobaciones mecánicas ya
  pasan** (ver «Comprobación 4 en detalle»), así que lo que saldrá será un **AVISO** por las
  tres reglas sin condición (`costura-normal`, `scarf-no-voladizos`, `spiral-vase-alcance`),
  y las tres lo explican en su `alcance`, que es lo que pide el aviso. La guía tiene ya
  `slug: 'z-seam'`.
- **`random-curva` y `random-ya-activo` se solapan** cuando `forma: curva` y `posicion:
  repartida`: sale «Prueba el modo Random» al lado de «Lo que ves es el modo Random
  funcionando, no un fallo». No se contradicen (una es la acción y la otra el
  diagnóstico), pero «prueba» y «lo que ves es que ya lo tienes» en la misma pantalla se
  puede leer como una contradicción de recomendación. La regla `random-curva` podría
  llevar `posicion: ['pared', 'cara-visible']` en su `cuando`, que es donde «prueba» sí
  significa «prueba».
- **`mixta-dos-zonas` (`:553`) es una lectura editorial, no una recomendación de la
  fuente** —la combina *Nearest* en los vértices con el *scarf* en las zonas lisas—, y su
  `alcance` lo dice: «Ninguna fuente da un procedimiento para combinar los dos modos». Está
  bien publicado, pero conviene que el lector sepa que la combinación es de la guía.
- **La tarjeta `wipe-speed` dice «eso no se publica» y lo publica**: el nombre del «Role-Based
  Wipe Speed» está en el cuerpo (`:419`). Lo que no se publica es lo que hace —que es
  justamente lo que no dice la fuente—, así que la frase es cierta; sólo suena rara.
- **`retraccion-rigidos` (`:312`) se le enseña a quien imprime ASA**, porque la opción
  `abs` de la variable `material` es «ABS o ASA» y su `cuando` es
  `{ material: ['pla', 'petg', 'abs'] }`. El título dice «Con PLA, ABS y PETG» y no menciona
  ASA. La afirmación es cierta para ASA (la fuente dice «for **all other** materials such as
  PLA, ABS, and PETG»), pero el título puede dejar al usuario de ASA sin ver su material.
  La solución no es añadir «ASA» al título —la fuente no lo nombra—, sino decirlo en el
  cuerpo: «…y, por la misma frase, en el resto de materiales rígidos».
- **La tarjeta `resistencia` (`:406`) dice «en ninguna de sus tres páginas de costura»**,
  y la tercera de esas tres (`common-print-quality-problem`) sí habla de resistencia en
  otros apartados (warping, flujo). La afirmación es cierta si se entiende «en el apartado
  de costura», que es como está declarada la fuente; con esas dos palabras más, no hay
  nada que objetar.

## Para la siguiente vuelta

1. **Las ocho comillas con traducción, en literal inglés** (**fallo 1**). Es la línea más
   fácil de arreglar de toda la lista: ocho cadenas, y la tabla de arriba trae el literal de
   cada una con su fichero y su línea.
2. **Acotar `random-fuerza` a `forma: 'curva'`** (**fallo 2**) y **acotar `esquina-invisible`
   a `forma: ['esquinas', 'mixta']`** (**fallo 3**). Son dos condiciones, y con ellas
   desaparecen las dos contradicciones de la misma pantalla.
3. **Separar las condiciones del *spiral vase* por casa** (**fallo 4**): cuatro de Bambu, dos
   de Prusa.
4. Los cinco menores (fallos 5 a 8) son de una línea cada uno y pueden ir en la misma pasada.
   El 5 tiene que corregirse **también en `wiki/cooked/z-seam.md`**, o vuelve.
5. Raw no se ha tocado y no hace falta tocarlo: **los ocho fallos se resuelven en la
   redacción**; no hace falta ninguna fuente nueva.

**La matriz de la guía —que es lo difícil— no hay que tocarla.** Las cinco trampas del
material cocinado están bien tratadas, las 24 citas están en las fuentes con su atribución,
las seis URLs están en `wiki/raw/` y las comprobaciones mecánicas pasan enteras. Lo que
queda son ocho correcciones de notación y de acotado de condiciones: son correcciones de
texto, no de investigación.
