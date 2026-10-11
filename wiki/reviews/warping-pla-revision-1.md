# Revisión de warping-pla

**Veredicto: RECHAZADO** — 3 fallos, de los cuales 1 bloqueante.

Artículo revisado: `src/content/wiki/warping-pla.md`
Fuentes cocinadas: `wiki/cooked/warping-pla.md`

**Cómo se cuenta.** El frontmatter no cuenta, porque es configuración. Las URLs de
los enlaces tampoco, porque un enlace no se lee y contarlas inflaría el número en
decenas. Se cuentan secuencias de letras con acentos. La primera versión de este
informe decía 1 946 porque contaba también las URLs; corregido a 1 886, que es lo
que da el método.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | **FALLA** — 2 afirmaciones sin respaldo en `wiki/cooked/` |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — 1 886 palabras |
| 5 | Citas correctas | **FALLA** — 1 enlace a página inexistente |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Afirmación sin respaldo

**Dónde:** sección «Qué puede salir mal», primer punto.

**Qué dice:** «Bajar la temperatura de cama "para espantar las esquinas". Es el
error más frecuente, y está documentado con nombre y apellidos».

**Por qué falla:** la parte de «está documentado con nombre y apellidos» sí está
respaldada. `wiki/cooked/warping-pla.md` recoge el antes y el después del hilo de
Prusa: cama a 50 °C y luego a 40 °C, la respuesta de subir hasta 65 °C, y el
«zero warping» final.

Lo que no está respaldado es **«el error más frecuente»**. Esa cuantificación no la
dice ninguna de las cinco fuentes. Es una afirmación sobre la frecuencia del error,
y el artículo la presenta con el tono de un dato medido.

**Qué hacer:** dejar el caso documentado y quitar la cuantificación. Un hilo es un
caso, no una estadística.

### 2 · Importante · Afirmación usada fuera del apartado que la respalda

**Dónde:** sección «Lo que este artículo no te va a resolver», punto de la humedad.

**Qué dice:** que si al imprimir suenan chasquidos o la superficie sale rugosa, con
burbujas o filamentos sueltos, el filamento ha absorbido humedad.

**Por qué falla:** la afirmación es correcta y la fuente la respalda —Bambu describe
exactamente *crackling*, *popping*, *rough*, *bubbly* y *stringy*—, pero en
`wiki/cooked/warping-pla.md` está como fila suelta en la tabla de `## Relaciones`.
No está en `## Afirmaciones` ni en `## Contradicciones`, que son los apartados que
declaran qué es citable.

El redactor la usó porque es buena y está en el fichero, pero esa tabla no es una
lista de afirmaciones: es un índice de conceptos. Es justo el salto que la frontera
entre capas debería impedir, y que se coló por la puerta de atrás.

**Qué hacer:** el cocinero tiene que mover esa afirmación a `## Afirmaciones` con
su fuente. El artículo puede dejarla como está una vez que esté citable.

### 3 · Menor · Enlaces a páginas que no existen

**Dónde:** sección «Si te interesa».

**Qué hace:** enlaza a `/wiki/enclosure-y-warping` y a `/wiki/primer-capa`, que no
están escritas. El artículo menciona «separaciones entre capas» en prosa **sin**
enlace, y eso está bien hecho: es la forma correcta de nombrar una página que
todavía no existe.

**Por qué falla:** las reglas del redactor dicen que sólo se enlaza a páginas que
existen. Las dos primeras rompen esa regla; la tercera la cumple.

**Qué hacer:** quitar el enlace a las dos páginas que no existen y dejarlas como
texto.

## Notas que no bloquean

- **La contradicción del ventilador está bien resuelta.** El artículo explica que
  Bambu habla de las primeras capas y del ventilador auxiliar, y Prusa del
  ventilador general durante el resto de la pieza, y avisa del mismo techo. Eso es
  exactamente lo que pedía el apartado de contradicciones. Ningún sitio elige un
  valor por encima del otro.
- **La del enclosure está bien resuelta, y es la que más aporta.** Explica que un
  enclosure mantiene el aire estable y limita el enfriamiento, y que con PLA gana
  el primer efecto si se deja fuera la tapa. Es el matiz que el artículo promete.
- **La salvedad sobre la tabla de Prusa está bien puesta.** El artículo dice que la
  tabla de materiales sale aplastada y que no la usa. Es honesto, y es lo que el
  apartado de descarte pedía.
- **El diagnóstico diferencial es un añadido de verdad.** El artículo distingue
  warping de separaciones entre capas con una tabla de tres filas, y eso no está
  copiado de ninguna fuente: es síntesis. Es la parte que más valor da y la menos
  parecida a lo demás que habrá en la wiki.
- **No hay frases de IA.** He buscado la lista completa de las prohibidas y no
  aparece ninguna. Hay dos momentos en que la prosa se calibra un poco —«lo dejamos
  dicho», «queremos ser claros sobre eso»— y son aceptables en un texto en primera
  persona.
- **«Qué puede salir mal» tiene contenido real**: seis casos, todos con fuente
  salvo el primero, que es el fallo bloqueante.

## Resumen para el redactor

Tres cambios, ninguno de ellos reescribir el artículo:

1. Quitar «el error más frecuente» del primer punto de «Qué puede salir mal».
2. Pedir al cocinero que mueva la afirmación de humedad a `## Afirmaciones`, con su
   fuente. El artículo puede dejarla como está.
3. Quitar el enlace a `/wiki/enclosure-y-warping` y a `/wiki/primer-capa`, y
   dejarlos como texto.

Después de esos tres, el artículo vuelve a revisión sin reescribirse.