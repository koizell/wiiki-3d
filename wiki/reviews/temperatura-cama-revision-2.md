# Revisión de temperatura-cama (segunda vuelta)

**Veredicto: RECHAZADO** — 3 fallos, de los cuales 2 bloqueantes. Los tres son de una
o dos frases y ninguno pide reescribir el artículo: el trabajo de fondo de la vuelta
anterior está hecho y bien hecho.

Artículo revisado: `src/content/wiki/temperatura-cama.md`
Material cocinado: `wiki/cooked/temperatura-cama.md`
Fuentes crudas: seis en `wiki/raw/` — cinco `temperatura-cama-*` y una
`warping-pla-prusa-forum-*`, que es el hilo de foro
Revisión anterior: `wiki/reviews/temperatura-cama-revision-1.md`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 3 sin respaldo |
| 2 | Contradicciones internas | FALLA — 2 |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ≈3 750 palabras |
| 5 | Citas correctas | PASA — 6 de 6 URLs, 0 citas inventadas |

## Lo que se pidió comprobar, punto por punto

**1 · Las dos fabricaciones desaparecieron y no hay ninguna cita nueva inventada.**
Confirmado con `grep`: `IPA + PETG`, `adhere very strongly`, `Removing it could`,
`up to 65` y `as a maximum` dan cero en el artículo. Las **veintidós** cadenas entre
comillas del artículo se han ido una a una a `wiki/raw/`, y todas las que son cita de
fuente están literalmente, incluidas las seis más largas: la de OrcaSlicer sobre la
cama fría, la de Prusa sobre la adhesión excesiva, la de Prusa sobre el acetona, la de
OrcaSlicer sobre el Tg, la de Bambu sobre la cámara y las tres del hilo de foro. **Ni
una sola cita fabricada.** Es lo que más cuesta conseguir y aquí está conseguido.

**2 · El 65 °C conserva su estado real.** Correcto, y en cuatro sitios distintos, que es
como debe ser. La línea 215 transcribe el hilo literal —«You should set your bed
temperature higher and not lower (max 65°C)»—; la 217 dice que es «de un usuario» y que
«no es la recomendación de Prusa»; la 225-229 pone los tres límites del desenlace; la
234-238 separa las dos cosas que la vuelta anterior mezclaba: «La cifra está
**corroborada por un fabricante**» y «Lo que sigue siendo sólo de un usuario es **la
palabra «techo»**». Y `## Qué puede salir mal` lo repite. En ningún punto se presenta
como un límite. **Pasa.**

**3 · La contradicción 4 está explicada, no resuelta.** Líneas 253-262. Dice las dos
cifras, dice dónde está cada una —«En la prosa» / «En la última columna de la tabla de
chapas»—, dice que la página no explica por qué, y dice la frase exacta que el material
cocinado pedía: «**No es una progresión.** No hay un «luego»». Es el texto del
cocinero, sin edulcorarlo. **Pasa.**

**4 · Ninguna afirmación técnica sale del material cocinado.** Casi todas. Se cuelan
tres, y son los tres fallos de abajo.

## Los tres fallos

### 1 · Bloqueante · Lo que la fuente pide para la limpieza diaria

**Dónde:** línea 162, sección "Qué pasa si está demasiado caliente", párrafo suelto
después de la cita del acetona.

**Qué dice:** «Quien limpia a diario con IPA y nunca ha leído esa página está usando el
disolvente suave donde la fuente pide el fuerte.»

**Por qué falla:** contra la fuente, dos veces. En `first-layer-issues` línea 23, la
fuente dice literalmente que *«The best option when printing with ABS, PLA, and many
other materials is 90% Isopropyl alcohol»*, y el acetona está en la línea 35 con dos
condiciones que el artículo no ha traslado: **«When you see models coming loose
regularly»** y **«only around once per month»**. Para quien limpia a diario con IPA en
PLA, la fuente pide IPA. La frase afirma lo contrario.

Y hay una segunda mitad en el mismo fichero, más arriba: la línea 31 pone **jabón y
agua templada en el escalón intermedio** —«If the adhesion seems to decrease over time
even when using IPA»—. La escala de la fuente es IPA → jabón → acetona, no
IPA → acetona. El artículo borra el escalón que hace que el acetona sea el tercero, y
por eso el párrafo suena más tajante de lo que la fuente es.

**Contradicción interna:** el artículo dice en la línea 351 que «Prusa recomienda
alcohol isopropílico al 90 % como la mejor opción para ABS, PLA y muchos otros». Las dos
frases no pueden ser ciertas.

**Qué hacer:** devolverle el alcance. La idea buena —el disolvente que *recupera* la
adhesión es el acetona— ya está bien escrita en la línea 153 y no hay que tocarla. Lo
que hay que arreglar es la generalización de la 162: hablar del caso que la fuente
describe, que es «la pieza se suelta con frecuencia», y no del que limpia a diario. Y
de paso, mencionar el escalón de la línea 31, que es el que explica por qué el acetona
aparece donde aparece.

### 2 · Bloqueante · Un rango que no contiene uno de los dos valores que se le atribuyen

**Dónde:** línea 194, sección "Cómo se sube, cuánto y cuándo".

**Qué dice:** «Sumado a los 60 °C que da Prusa para el PLA, el incremento se queda en 65
o en 70: por encima del 50–60 que esa casa publica para el mismo material, **y dentro
del 45–65 que da Bambu para tres de sus chapas**.»

**Por qué falla:** 60 + 5 = 65 y 60 + 10 = 70. El 65 es el extremo alto exacto del
45–65 de Bambu. El 70 se sale. La frase afirma la contención para los dos valores que
nombra, y para uno es falsa.

**Contradicción interna:** contra la tabla de Bambu de la línea 58-59, que es del mismo
artículo, y contra su propia viñeta de la línea 334 —«**Copiar el 65 °C a cualquier
chapa.** Es el extremo alto del rango que Bambu da para tres de sus chapas»—. Un 70
dentro de un 45–65 es exactamente el error que el artículo previene tres pantallas más
abajo.

**Por qué no es menor aunque la aritmética sea del redactor:** el 60 y el 5-10 están
bien y sumarlos es legítimo. Lo que no sale de la fuente es la conclusión. Y la
conclusión corregida es **mejor artículo**: la propia recomendación de Prusa, aplicada
al propio 60 °C de Prusa, se sale por encima del extremo alto que da Bambu para tres de
sus chapas. Eso es un hallazgo, y estaba a una coma de distancia.

**Qué hacer:** partir el enunciado. El 65 es el extremo alto del rango de Bambu; el 70
queda fuera, y por eso subir por la vía de Prusa acaba antes o después fuera de lo que
publica un fabricante.

### 3 · Importante · «En la misma frase» no es lo que dice la fuente

**Dónde:** línea 299, sección "Por qué tu slicer puede no escribir este dato", punto 2.

**Qué dice:** «La ficha del PLA de Prusa dice, **en la misma frase en la que recomienda
60 °C**, que «PLA does not require a heated bed, can be printed fast and with low
temperatures».»

**Por qué falla:** no están en la misma frase. En `temperatura-cama-prusa-kb-pla.md` el
«Recommended bed temperature: 60 °C» es la línea 18, dentro de «Basic info», y es una
entrada de lista; el «PLA does not require a heated bed…» está en la línea 23, dentro de
«Description», y es la primera frase de un párrafo. Son sitios distintos de la página y
ni siquiera están en la misma sección.

**Por qué importa más de lo que parece:** el material cocinado lo decía bien —«Los 60 °C
de la **misma página** son una recomendación, no una exigencia del material»—. El
redactor ha endurecido «de la misma página» a «en la misma frase», y con eso ha
convertido una tensión real de la fuente en una cita que la fuente no contiene. Es la
misma operación que los cuatro casos de `warping-pla`: una paráfrasis que exageró, del
tipo que una regla sobre citas no habría visto nunca.

La sustancia sobrevive: la página sí recomienda 60 °C y sí dice que el PLA no necesita
cama caliente. Lo único falso es el «en la misma frase».

**Qué hacer:** «en la misma página», que es lo que dice el cocinado. La construcción
repetida en la línea 142 —«el remedio que propone en la misma frase»— es el mismo
tropiezo, pero allí es decorativo y la cita entera va justo debajo, así que no hace
falda tocarla.

## La pregunta que había que juzgar

**Las acepto. Las dos, y no son motivo de rechazo.** Y el motivo de fondo es que la
línea que separa una cosa de la otra no es el tipo de comillas, es **la atribución**:

| | Qué es | Veredicto |
|---|---|---|
| L78 «sube la cama a 65 °C» | Ilustración hipotética. Dice «cuando alguien escribe», sin nombre, y está **antes** de que el hilo aparezca en el artículo (se presenta en la línea 200) | Aceptada |
| L324 «el campo no está» | Nombre del artículo para un estado del panel. La palabra «campo» no sale de ninguna de las seis fuentes: es vocabulario nuestro | Aceptada |

Un entrecomillado es una cita cuando remite a algo fuera del artículo. Estas dos
remiten al artículo. Reescribirlas en cursiva o sin comillas lo haría más claro para el
próximo revisor, y lo recomiendo, pero no es un fallo.

**Con una salvedad sobre la línea 78, que sí quiero dejar escrita.** «Sube la cama a
65 °C» es una hipótesis, y como hipótesis no tiene problema. El problema es lo cerca que
está de la cita real del hilo, que dice otra cosa: un **techo** en un paréntesis, no un
valor al que subir. El artículo lo reconoce en la línea 217 —«Fíjate en la forma de la
frase»—, pero a la línea 78 todavía no ha llegado. Si alguien lee ese párrafo después
de haber pasado por el hilo, puede leer «alguien escribe sube la cama a 65 °C» como
«Lichtjaeger escribió *max 65°C*» con dos traducciones de por medio, que es exactamente
la forma que tienen las cuatro fabricaciones de `warping-pla`. **No es un fallo hoy.
Es el sitio donde este artículo volvería a romperse si alguien lo tocara sin mirar.**

## Notas que no bloquean

- **Hay dos entrecomillados más que no son de fuente, y no estaban en la lista.** La
  línea 177, «no pases de 60 °C», y —peor— **la línea 176 abre un bloque `>` que no es
  una cita**: es comentario del artículo sobre la fuente, con una cita de la fuente
  dentro y el enlace al final. Los otros cinco bloques `>` del artículo sí son literales.
  Ese bloque debería ser una llamada en negrita, no una cita, porque se va a leer como
  una. La línea 237 lleva un cuarto caso, «techo», que es la traducción de «max» hecha
  por el artículo: en este caso no molesta, porque la palabra inglesa está citada
  literal en la línea 217, pero es el mismo patrón.

- **Falta un dato de seguridad en una cita que el artículo reproduce entera.** La línea
  35 de `first-layer-issues` termina el pasaje del acetona con «**Also, do not use
  acetone before printing with PETG**», y el artículo cita esa frase larga, con sus tres
  comillas y su prohibición de arriba, y deja fuera esa. En un artículo que dedica media
  pantalla a la fricción PETG/chapa, es justo la parte que más falta hace.

- **Los cuatro enlaces cruzados siguen pendientes.** `[[material]]`,
  `[[enclosure-y-warping]]`, `[[separaciones-entre-capas]]` y
  `[[adhesion-primera-capa]]` no existen. No es un fallo y no lo anoto como tal; lo
  escribo para que quede la cuenta, como en la vuelta anterior.

- **«Qué probar» no tiene sección propia.** El esquema es problema → por qué ocurre →
  cómo se resuelve → qué probar, y los tres primeros golpes están. El cuarto lo hace el
  hilo de foro, que es el único antes y después del lote, más `## Qué puede salir mal`.
  Lo doy por cumplido en sustancia. Sólo lo dejo dicho porque es el cuarto golpe del
  esquema y alguien lo va a volver a preguntar.

- **El dato interno del analizador está bien marcado.** `bed_temperature` no sale en
  ninguna de las seis fuentes, sale en `src/services/ParserService.ts` línea 475 y en un
  comentario de `types.ts` línea 53, y el artículo lo declara como dato nuestro en un
  bloque propio en vez de disfrazarlo de fuente. Es lo que pidió el cocinado y lo que
  hizo falta para que un revisor externo no lo tomara por una cita.

## Resumen

La vuelta anterior compró tres cosas y las tres están: la cita inventada ya no está, la
paráfrasis del hilo está reescrita con sus tres límites, y la contradicción interna de
la página de Bambu está explicada y no resuelta. De las veintidós cadenas entrecomilladas
del artículo, dieciocho son literales de `wiki/raw/` y cuatro son voz propia —que es lo
que hay que poder distinguir, y aquí se distingue.

Los tres fallos que quedan son todos de la misma clase y ninguno es una fabricación: son
afirmaciones sobre lo que la fuente dice o sobre dónde está un número, hechas al
comprimir. La más fácil de arreglar es la línea 299. La que más vale la pena arreglar es
la 194, porque al corregirla el artículo gana el mejor dato que tenía a mano y estaba a
una coma de encontrarlo. Y la 162 es la que más cuidado pide: el artículo acierta al
decir que el disolvente que recupera la adhesión es el acetona, y falla al extenderlo a
la limpieza diaria, que es justo el caso en el que la fuente dice lo contrario.
