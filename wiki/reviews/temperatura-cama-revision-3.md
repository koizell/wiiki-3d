# Revisión de temperatura-cama (tercera vuelta)

**Veredicto: RECHAZADO** — 3 fallos, de los cuales 1 bloqueante. Los tres son una línea
cada uno. **Las cuatro correcciones que pidió la vuelta anterior están las cuatro
hechas**, y el trabajo de fondo sigue en pie: no hay ninguna cita inventada, el hilo de
foro conserva sus tres límites y la contradicción interna de la página de Bambu sigue
explicada en vez de resuelta.

Artículo revisado: `src/content/wiki/temperatura-cama.md`
Material cocinado: `wiki/cooked/temperatura-cama.md`
Fuentes crudas: seis en `wiki/raw/` — cinco `temperatura-cama-*` y una
`warping-pla-prusa-forum-*`, que es el hilo de foro
Revisión anterior: `wiki/reviews/temperatura-cama-revision-2.md`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 sin respaldo (PETG) y 1 inexacta (PC) |
| 2 | Contradicciones internas | FALLA — 2 |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ≈3 800 palabras (mínimo 800) |
| 5 | Citas correctas | PASA — 6 de 6 URLs, 0 repetidas, 0 citas inventadas |

## Las cuatro correcciones, una a una

Las cuatro están. Ninguna a medias, y ninguna ha cambiado nada de lo que había
alrededor.

**1 · La escala de limpieza (líneas 163-177).** Ahora es la de la fuente: **IPA al 90 %
→ jabón y agua templada → acetona**, y dice en voz alta que el orden es lo que decide.
Los tres fragmentos son literales de `first-layer-issues` línea 23, línea 31 y línea 35.
El IPA aparece con su condición —«The best option when printing with ABS, PLA, and many
other materials is 90% Isopropyl alcohol»—, y el artículo ya no lo generaliza: la
conclusión de la línea 176 dice que «limpiar a diario en PLA es el caso del primer
escalón», que es justo lo contrario de lo que decía la versión rechazada. El segundo
escalón conserva su condición —«If the adhesion seems to decrease over time even when
using IPA»— y su «agua templada, no caliente», que es el «(not hot!)» de la fuente. Y el
tercero conserva las tres condiciones, las tres entrecomilladas: «When you see models
coming loose regularly», «This should only be used in the smooth PEI sheet and only around
once per month» y el «Do not overuse acetone» de al lado. **Pasa.**

Con esto desaparece además la contradicción interna que la vuelta anterior señalaba
entre la línea 162 y la 351: las dos frases ya dicen lo mismo.

**2 · El 65 y el 70 (líneas 206-214).** El enunciado está partido como pedía la
revisión: «El **65 es exactamente el extremo alto** del 45–65 que da Bambu para tres de
sus chapas, y el **70 se sale de ahí**». La aritmética es correcta —60+5=65, 60+10=70— y
el hallazgo nuevo está: «la recomendación de Prusa, aplicada sobre el 60 °C de Prusa,
acaba fuera del rango que publica otro fabricante». **Pasa el encargo.**

Lo que sí queda mal en este párrafo, y es el fallo 2 de abajo, es la frase siguiente.
Nota aparte: la línea 176 ya no es un bloque `>` sino prosa en negrita, como pedía la
revisión anterior. Ese tropiezo está arreglado.

**3 · «De la misma página» (línea 316).** Dice «La ficha del PLA de Prusa dice, **en la
misma página en la que recomienda 60 °C**, que…». Es lo que dice el cocinado y lo que
dice la fuente: el 60 °C está en «Basic info» y el «does not require a heated bed» en
«Description», en secciones distintas de la misma página. **Pasa.**

**4 · El dato de seguridad del acetona.** Ya está dentro de la cita, con su
caracterización —«la que es de seguridad y no de chapa»— y su clasificación aparte de la
prohibición de chapa: «Also, do not use acetone before printing with PETG». Una nota
sobre el método: el aviso de la vuelta anterior sobre el salto de línea de 80 columnas
**no llega a aplicar aquí**. El cuerpo de `first-layer-issues` va sin partir —la línea 35
es una sola línea larga de más de 400 caracteres—, y la frase sale entera de un `grep`
normal. Los que sí están partidos a 80 columnas son los comentarios del recolector. Lo
digo porque es el tipo de detalle que hace perder una revisión entera si se da por
supuesto en el sentido contrario.

**Y el bloque `>` de la línea 176 de la versión anterior ya no existe**: el párrafo sobre
el 60 °C de la ficha del PLA es ahora prosa en negrita (líneas 190-195), con la cita y
el enlace debajo. Era lo que pedía la revisión anterior.

## Las dos citas de voz propia

Las dos están en cursiva y se distinguen de un vistazo:

- Línea 78: «Cuando alguien escribe ***sube la cama a 65 °C*** sin decir con qué chapa, la
  afirmación no es falsa: es incompleta.» Introducida por «cuando alguien escribe»,
  sin nombre, y en un párrafo que no remite al hilo.
- Línea 341: «eso se confunde fácil con ***el campo no está***». Vocabulario del panel,
  nuestro.

Ninguna de las dos está pegada a una cita real que diga otra cosa. La de la línea 78 está
a cuatro líneas de dos citas literales de Bambu, pero de otra materia —la celda
«45 - 65 ℃ Glue Required» y la nota sobre las Engineering Plates antiguas—, y la
hipótesis va con su verbo: «cuando alguien escribe». La de la línea 341 está a veintitrés
líneas de la última cita real de la sección.

**La salvedad de la vuelta anterior sobre la línea 78 queda resuelta sin tocar la frase.**
Era el punto débil: «sube la cama a 65 °C» leído después de pasar por el hilo podía
confundirse con una traducción de «max 65°C». El artículo ya no deja que eso ocurra,
porque en las líneas 243-247 dice que el hilo **no dice a qué temperatura subió**, y en
las 252-256 separa la cifra —corroborada por Bambu— de la palabra «techo», que es lo
único que sigue siendo de un usuario. La hipótesis y el dato ya no setocan. Y la línea
240-241 sigue transcribiendo el «chamfered the edges of the shape in Fusion» **sin**
convertir Fusion en el laminador, que era el error de `warping-pla`.

## Los tres fallos

### 1 · Bloqueante · Una cifra de PETG atribuida a la tabla que no la tiene

**Dónde:** línea 104, sección «Las mismas cifras, otros materiales».

**Qué dice:** «Para el **PETG, Prusa sube los dos extremos diez grados** — 70–90 donde
**los otros dos dan 60–80**—, y las ventanas sólo se tocan en 70–80.»

**Por qué falla:** los «otros dos» son Bambu y OrcaSlicer, que son las dos columnas
restantes de la tabla de tres de las líneas 89-96. Y **la tabla de OrcaSlicer no tiene
fila de PETG**: en `temperatura-cama-orcaslicer-wiki-material-temperatures.md` las
líneas 25-35 son PLA, ABS, ASA, Nylon 6, Nylon 12, TPU, PC, PC-ABS, HIPS, PP y Acetal.
Once filas y ninguna de PETG. De 60–80 para PETG sólo hay una fuente en todo el lote:
Bambu, y en sus dos tablas.

**Contradicción interna, y del propio artículo:** doce líneas más arriba, en la misma
tabla, la celda de OrcaSlicer para PETG dice literalmente «**no sale en su tabla**»
(línea 92). El artículo afirma y desmiente lo mismo sobre la misma fuente en la misma
sección. Es la clase de fallo que sobrevive dos revisiones porque la cifra es correcta y
el número sale bien: 70−60 = 10 y 90−80 = 10, que es verdad, y el 70–80 del solapamiento
también. Lo único falso es de dónde sale el segundo 60–80.

**Qué hacer:** cambiar «los otros dos» por «el otro» —Bambu—, que es lo que da el
cocinado y lo que da la fuente. La frase entonces dice exactamente lo que dice la tabla:
Prusa sube los dos extremos diez grados respecto de Bambu, y las dos ventanas sólo se
tocan en 70–80. Si se quiere mantener la enumeration de tres, hay que decirlo de otra
forma: que OrcaSlicer no aporta nada en esta fila porque no tiene PETG.

### 2 · Importante · La conclusión de la aritmética está invertida

**Dónde:** línea 213, sección «Cómo se sube, cuánto y cuándo», tercera frase.

**Qué dice:** «Subir por la vía documentada es salirse del rango de otro fabricante antes
de haber salido del tuyo.»

**Por qué falla:** la frase anterior —que es correcta— dice ya que «los dos valores quedan
por encima del 50–60 que esa misma casa da para el mismo material». Si el 65 y el 70
están por encima del 50–60 de Prusa, entonces **lo propio se sale antes que lo ajeno**:
el rango de Prusa se abandona en el 61 y el de Bambu en el 66. La frase dice al revés, y
contradice la línea 210-212 del mismo párrafo.

**La otra lectura posible, y por qué no la salva:** «el tuyo» podría ser el rango de la
chapa que tiene el lector, que en la Cool Plate es 35–45 y se abandona en el 46, mucho
antes. Ahí la frase sería cierta. Pero el antecedente inmediato es «otro fabricante»,
y el párrafo lleva cuatro líneas hablando de «esa misma casa», que es Prusa: leer «lo
tuyo» como el 50–60 de Prusa es la lectura que el texto prepara, y es la que es falsa.

**Qué hacer:** quitar el «antes» y dejarlo en lo que ya está probado, o hacerlo
inequívoco. Por ejemplo: «Subir por la vía documentada de Prusa te saca del rango que
publica Prusa antes que del que publica otro fabricante». Si lo que se quiere decir es la
chapa, hay que nombrarla: «antes de haber salido del rango de tu propia chapa».

### 3 · Menor · Una dirección que no vale para uno de los tres materiales

**Dónde:** línea 101-103, sección «Las mismas cifras, otros materiales».

**Qué dice:** «Para **ABS, ASA y PC, Bambu y OrcaSlicer dicen exactamente lo mismo** y
**Prusa se aparta hacia arriba**».

**La primera mitad es cierta**, y la he comprobado material a material: ABS 90–100 en
Bambu y 90–100 en Orca; ASA 90–100 y 90–100; PC 100–120 y 100–120. Las tres parejas
coinciden exactamente.

**La dirección no vale para los tres.** Prusa da ABS 95–110 y ASA 90–110, los dos por
encima del 90–100 de los otros. Pero para PC Prusa da **100–115 °C**, cuyo extremo alto
está **cinco grados por debajo** del 100–120 de Bambu y del de OrcaSlicer. Para el PC
Prusa se aparta, pero hacia abajo.

**Qué hacer:** «Prusa se aparta» a secas, o «se aparta por arriba en ABS y ASA, y con un
techo cinco grados más bajo en PC». Es media línea, y el matiz es bueno: es el único
material de los tres donde Prusa es más conservadora que Bambu.

## Notas que no bloquean

- **Siguen pendientes cuatro enlaces cruzados**, los mismos de las dos vueltas
  anteriores: `[[material]]`, `[[enclosure-y-warping]]`,
  `[[separaciones-entre-capas]] y `[[adhesion-primera-capa]]`. Van en sintaxis
  `[[slug|texto]]`, así que el renderizador los resuelve y no son enlaces rotos. Se anota
  sólo para que quede la cuenta.

- **El bloque `>` de la línea 329** (el del dato interno `bed_temperature`) sí es
  comentario del artículo y usa el marcador de cita. Ya no lleva dentro ninguna cita de
  fuente ni ningún enlace, y se autodeclara con «Lo que aquí no te vamos a contar» y «Es
  dato interno nuestro y no lo vamos a disfrazar de fuente», así que no se va a leer como
  una cita. Aun así, en un artículo en el que los otros ocho bloques `>` son literales,
  reserving el marcador para lo que es del artículo daría más contraste. Es cuestión de
  forma, no de fondo.

- **Quedan dos entrecomillados en español**, que no son cita de nada porque en este
  artículo todas las citas literales están en inglés: «la palabra «techo»» (línea 254) y
  «no se limpie con acetona» (línea 368). Los dos son voz propia y los dos son
  traducciones de algo que sí está citado literal al lado —«max 65°C» y «Do not clean the
  plate with acetone»—, así que no hay engaño. Por coherencia con lo hecho en las líneas
  78 y 341, en cursiva quedarían mejor.

- **Una들도 sin tocar**: «La PEI lisa «can lose its adhesive powers after a couple of
  hundred hours»» (línea 155). La fuente dice «PEI can lose its adhesive powers…», en
  general, y el artículo lo estrecha a la lisa. En el contexto —el pasaje entero es el del
  acetona, que la fuente limita a la smooth PEI— la lectura es la correcta, pero es el
  único sitio donde el artículo añade el sujeto que la frase no lleva.

- **La aritmética del 65 y del 70 se ha comprobado con el cocinado delante**, que es lo
  que pedía la vuelta anterior, y sale. También he vuelto a pasar las veintiún cadenas
  entrecomilladas del artículo una a una por `wiki/raw/`: las diecinueve literales están
  literalmente, incluidas las siete más largas, y las dos de voz propia ya no llevan
  comillas. Ninguna cita inventada, que sigue siendo lo más difícil de conseguir.

## Resumen

La vuelta anterior compró tres cosas y las tres siguen: la cita inventada no ha vuelto,
la paráfrasis del hilo está reescrita con sus tres límites —incluido el chaflán en Fusion,
que esta vez no se convierte en laminador—, y la contradicción interna de la página de
Bambu se sigue explica y no se resuelve. Las cuatro correcciones pedidas están las cuatro
hechas, y dos de ellas han mejorado el artículo: la escala de limpieza ahora es la de la
fuente y el 65 contra el 70 ha dado un hallazgo que antes no estaba.

Lo que queda es de la misma clase que lo de la vuelta anterior, y también de una línea:
afirmaciones sobre lo que dice una tabla, hechas al resumir. La del PETG es la que
importa, porque el artículo desmiente esa misma atribución doce líneas antes; es también
la más rápida de arreglar, y de paso el artículo gana algo: puede decir en voz alta que
OrcaSlicer no tiene fila de PETG, que es un hueco real de la fuente y no un fallo del
redactor. La de la línea 213 es la misma aritmética del 65 y el 70, que ya quedó bien
escrita, se ha desbordado a la frase siguiente. Y la del PC «hacia arriba» es media
línea.

Ninguno de los tres pide reescribir nada. Vuelve al redactor y no hay que empezar de cero.