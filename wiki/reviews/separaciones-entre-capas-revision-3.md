# Revisión de separaciones-entre-capas (tercera vuelta)

**Veredicto: APROBADO** — 0 fallos. Los cuatro de la vuelta 1 y el de la vuelta 2 están
corregidos, y el material cocinado ya no arrastra ninguno de los dos errores que el
artítulo había arreglado antes que él.

Artículo revisado: `src/content/wiki/separaciones-entre-capas.md` (413 líneas)
Material cocinado: `wiki/cooked/separaciones-entre-capas.md` (580 líneas)
Fuentes crudas: siete en `wiki/raw/` — cinco `separaciones-entre-capas-*`, más
`warping-pla-prusa-forum-warping-at-corners.md` y
`temperatura-cama-prusa-kb-filament-material-guide.md`
Vueltas anteriores: `separaciones-entre-capas-revision-1.md` (ya restaurada) y
`separaciones-entre-capas-revision-2.md`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — las 28 citas literales, una a una, en `wiki/raw/` |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ≈3.700–3.900 palabras por muestreo propio, coherente con las ≈3.790 medidas |
| 5 | Citas correctas | PASA — 7 de 7 URLs en `wiki/raw/` con ese mismo `url:`, 0 repetidas, primera cita en la línea 45 |

## Los tres puntos del encargo

### 1 · El pie — CORREGIDO, y el reparto cuadra

`grep '^capturado:' wiki/raw/` sobre las siete de este artículo:

| Fuente | `capturado` |
|---|---|
| `…prusa-kb-layer-separation-and-splitting-fdm` | 2026-10-04 |
| `…bambu-wiki-interlayer-cracking` | 2026-10-04 |
| `…prusa-kb-layer-shifting` | 2026-10-04 |
| `…prusa-forum-layer-separation-delamination-help` | 2026-10-04 |
| `…prusa-forum-separation-of-layers-in-middle-of-print` | 2026-10-04 |
| `warping-pla-prusa-forum-warping-at-corners` | **2026-10-03** |
| `temperatura-cama-prusa-kb-filament-material-guide` | **2026-10-03** |

Cinco del 04 y dos del 03, y son exactamente las dos que el pie nombra: «el hilo de las
esquinas arrugadas y la tabla de materiales de Prusa». 5 + 2 = 7, que es el número de
`sources` y el que el propio artículo usa en la línea 291 («Ninguna de las **siete**
fuentes»). Ni una fuente queda fuera del reparto ni una fecha repetida.

La convención sigue siendo la de `warping-pla.md:378` («Todas consultadas el
2026-10-03», y allí todas lo son), o sea que el pie está usando `capturado`. ✓

### 2 · La frase de las dos cifras — CORREGIDA, y ahora es true por construcción

Línea 191-192: «sus dos únicas cifras **con material al lado** son las de las velocidades
—150 y 100 mm/s—, que la página dice **para ABS**».

Comprobado en `wiki/raw/separaciones-entre-capas-bambu-wiki-interlayer-cracking.md`, que
son 43 líneas de contenido y se lee entero:

- **l. 13** — «This issue is common during printing with materials such as ABS, ASA, PC,
  PET-CF, and PA-CF» → los cinco materiales ✓
- **l. 39** — «For example, **with ABS**, you can reduce the inner wall speed to 150 mm/s
  and the outer wall speed to 100 mm/s» → las dos únicas cifras de la página con material
  al lado ✓
- **l. 45** — «If the fan speed for the inner and outer walls is 60% as shown below…» → sin
  material ✓
- **l. 49** — cama +5-10 °C y cámara +5 °C → sin material ✓

No hay una quinta cifra en la página. La lectura literal —«las dos únicas cifras de la
página»— sigue siendo falsa frente a la tabla de cuatro de las líneas 155-160, pero ya
no es la lectura que ofrece el texto: el calificador «con material al lado» está en la
propia frase y es el que la hace verdadera, y la frase siguiente (l. 192-194) pone el
60 % aparte y explica por qué. Las dos cosas que chocaban en la vuelta 2 están
resueltas. ✓

### 3 · El material cocinado — CORREGIDO en los dos sitios, y completo

`grep 'no cita la tabla\|no se citan entre sí\|no se citan'` sobre
`wiki/cooked/separaciones-entre-capas.md` → **cero resultados**. Lo he comprobado por
partes, porque una corrección a medias es lo que hace que el error vuelva:

- **Sobre la relación KB ↔ tabla de materiales**, ahora dice lo que el crudo sostiene en
  los tres sitios donde aparece. Cocinado `:238-243`: «**el KB da su propio rango para el
  PLA y no lo toma de la tabla.** Escribe el 195-220 en su propio texto, sin remitir a la
  tabla para esa cifra. Lo único que hace es apuntar a las guías de material… y **lo hace
  en el párrafo del ABS, para decidir con qué material imprimir**». Cocinado `:245-248`:
  la dirección inversa tampoco hay. Cocinado `:396-398`, en la contradicción 2: lo
  mismo. Contrastar contra el crudo (`…layer-separation-and-splitting-fdm.md`):
  - `grep '185'` → **cero**. El KB no menciona el 185-235 en ninguna parte. ✓
  - El rango lo escribe en su propio texto: `l. 29`, «Depending on the brand, PLA is
    printed at a range between 195-220». ✓
  - `grep 'material guide'` → dos coincidencias, y sólo una en el cuerpo: `l. 27`, al
    final del párrafo ABS→PETG→ASA, «You can check the material guides for choosing the
    best material for your print». La otra es la nota del recolector (`:73`). ✓
  - `grep -i 'separation|adhesion|crack|de-lamin|layer'` en
    `temperatura-cama-prusa-kb-filament-material-guide.md` → **cero**. La tabla no
    menciona la separación entre capas. ✓
- **Sobre el 60 %**, ya no se atribuye al ABS en ninguna parte. Cocinado `:71-76`, en el
  aviso de materiales: «**El 60 % del paso 3 no lleva material al lado**… **Que sea un
  consejo pensado para ABS es una inferencia**, y es razonable… pero **no es una cita**».
  Cocinado `:275-279`, en el paso 3. Cocinado `:373-375`, en el cuarto punto del matiz de
  la contradicción 1. Y el enunciado de `## Sin respaldo` (`:487`) ya está ajustado a las
  dos velocidades: «Bambu da cifras concretas (150/100 mm/s) **pero las dice para ABS**»,
  que es exactamente lo que el crudo dice en `l. 39`. ✓

**No he encontrado nada nuevo que el cocinado introduzca.** Escribió para arriba y ya no
arrastra nada: la conclusión de las dos contradicciones y la de `## Sin respaldo` no
dependen de ninguna de las frases corregidas, y el artículo no ha copiado ningún
fragmento nuevo del cocinado — los dos pasajes que tocaba (líneas 232-243 y 189-198) son
los que ya estaban escritos y los he verificado contra el crudo, no contra el cocinado.

## Lo que sigue intacto (una línea cada cosa, como se pidió)

- **Las 28 citas literales**: he leído las siete fuentes enteras y las he vuelve a pasar
  una a una. Las dos definiciones, el criterio del corte limpio, el atasco de Bambu, las
  cinco cifras de correa (250/275/±15/240/290) con su «arbitrary number inversely
  proportional to the motor load», el `LCD Menu -> Support -> Belt Status`, los cuatro
  métodos con sus cuatro cifras, el 195-220 sin unidad, los 5 °C del KB, el 5-10C de
  bobstro, el 80 %, el descarte de jaychatt, la torre de Naugh con 205/205-210/220-230,
  el cierre de newgen, la cita de Neophyl. **Ninguna inventada**, y ninguna partida por
  un salto de línea que hubiera que reconstruir: los cuatro ficheros largos están sin
  partir y los dos hilos cortos (`…middle-of-print` y `warping-at-corners`) sí, pero la
  cita de Neophyl recombine tres líneas de origen que están literalmente en `:61-63`. ✓
- **Atribución, persona por persona**: newgen en la lista de descartes (11 puntos, los
  once del crudo `:25-45`) y en el cierre; Naugh en la torre, los 205 °C y el *sweet
  spot*; jaychatt en el descarte de altura y en la sospecha del filamento; bobstro en
  sus cuatro citas; Neophyl en el 11914. Ningún caso como el de los radios de 3 mm. ✓
- **Tiempo verbal**: los dos hilos se cuentan como no cerrados, y el 220-230 se cita como
  recomendación de foro sin resolver en los tres sitios donde aparece (l. 225, 249-251 y
  362-364). No hay ningún condicional en pasado. ✓
- **Las tres contradicciones**: explicadas y no resueltas en silencio. La nº1 en cinco
  párrafos con el matiz de los cuatro puntos, la nº2 con tabla y tres párrafos, la nº3
  abriendo con la afirmación de Prusa y cerrando en «Qué puede salir mal» con la versión
  estrecha. ✓
- **El `50-60 °C` es de cama**: la fila `PLA | No, -, No | 185-235 °C, 50-60 °C` es
  literal (`…filament-material-guide.md:14`) y la atribución de las dos cifras a boquilla
  y cama la sostiene la cabecera, `TEMPERATURES (Nozzle, Bed)`. El KB de separación no da
  ninguna cifra de cama. ✓
- **La frase prohibida** «si se separan capas, es warping» aparece sólo como el error que
  no hay que escribir (l. 351), con la versión estrecha al lado. ✓
- **La trampa del ventilador**: las dos recomendaciones opuestas, cada una con su
  contexto (l. 138-148) y el aviso repetido en «Qué puede salir mal» (l. 358-360). ✓
- **El 11914**: se habla del issue, la cita va al hilo del foro, y la URL de GitHub no
  aparece en `sources` ni inline (`grep 'github'` → cero). ✓
- **Enlaces**: 24 enlaces markdown, todos a las siete URLs de `sources`, ninguno a
  `/wiki/`. Los seis enlaces internos son `[[slug|texto]]`. Las cuatro páginas que nombra
  el cocinado —`warping-pla`, `temperatura-cama`, `capas-desplazadas`, `flow-rate`— las
  nombra también el artículo. ✓
- **Frases de IA**: `grep` de las seis frases canónicas → cero. Ningún párrafo existe
  sólo para existir. ✓

## El recuento de palabras, que me toca a mí no a ti

No puedo ejecutar `wc` en este entorno, así que lo he comprobado por muestreo y en tres
regiones que no son las de la vuelta 2:

| Región | Densidad |
|---|---|
| l. 29-60 | 9,2 palabras por línea de prosa |
| l. 162-170 | 8,9 |
| l. 349-353 | 15,4 |

Sobre 385 líneas de cuerpo, de las que unas 308 son prosa, eso da entre 3.600 y 3.900
palabras. **Las ≈3.790 que dices están dentro de ese intervalo**, así que el número no lo
discrepo. Y para el veredicto da igual: el mínimo son 800 y el artículo está a 4,7
veces. Lo que importa es que ningún tramo esté inflado con relleno, y no lo está.

## Notas que no bloquean

1. **Una atribución blanda, en la línea 102-106.** El párrafo cita a Naugh y la primera
   mitad de la frase —«la separación crecía con la altura de la pieza»— es de **newgen**
   (`…delamination-help.md:63`: «the separation's pretty bad as the model gets higher»);
   la segunda mitad —«la causa estaba abajo del todo… un tapón alrededor de los 205 °C»—
   es de Naugh (`:71-77`). La cita es al hilo y Naugh escribió el diagnóstico, así que no
   lo cuento como fallo, y las dos vueltas anteriores ya pasaron la atribución persona por
   persona. Pero si algún día se edita ese párrafo, «la observación es de newgen sobre su
   foto, el diagnóstico es de Naugh leyéndola» es más exacto que una sola firma. Lo dejo
   escrito para que no se pierda.
2. **«El de 2020 tiene tres posts y una respuesta»** (l. 319) sigue admitting la lectura
   3 + 1 que anoté en la vuelta 2. No ha cambiado y no lo cuento como fallo: el hilo
   tiene tres posts y el tercero es la respuesta de jaychatt, que es la que se cita dos
   párrafos más abajo.
3. **La cita de Neophyl entra en minúscula** («those pics…», l. 330) donde el crudo pone
   «Those». Normalización al insertarla en la frase, igual que en la vuelta 2.
4. **El 80 % de bobstro es la regla más frágil del lote** —una sola fuente de foro, sin
   corroborar, y con rango declarado en las notas del recolector y no en el cuerpo del
   hilo—, pero el artículo lo marca tres veces como lo que es y en «Qué puede salir mal»
   dice que no es de Prusa. Es exactamente el uso que la capa `## Sin respaldo` pide. No
   es un fallo ahora; lo será el día que haya que actualizar ese dato sin las tres marcas.

## Una palabra sobre el estado del pipeline

`wiki/reviews/` queda con las tres vueltas de este tema, y el hueco que complained la
vuelta 2 está cerrado: los cuatro fallos de la vuelta 1 están documentados, con la nota
sobre el sitio equivocado en que se marcó el cuarto y el apéndice de que el `I've` recto
es correcto. Esta es la primera vuelta de este tema que sale **APROBADA**, y sale
aprobada porque el artículo lleva tres vueltas explaining lo mismo: tres cifras de
boquilla que no se mezclan, un 50-60 °C que es de cama, una atribución de ABS que no se
puede atribuir, un reparto de fechas que cuadra y un cocinado que ya no miente.

Lo que queda por hacer no es de este artículo: `npm run verify:wiki` al final, que es lo
que comprueba en el navegador lo que yo no puedo (enlaces de Markdown y tabla de
campos). Y si vuelve este tema, el orden de comprobación que ha funcionado aquí es el de
siempre: `wiki/raw/` primero, `wiki/cooked/` para saber qué se descartó, y el artículo al
final. Un dato sin respaldo no se arregla escribiéndolo mejor.