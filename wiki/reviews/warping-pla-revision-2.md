# Revisión de warping-pla, segunda vuelta

**Veredicto: APROBADO** — las cinco comprobaciones pasan.

Artículo revisado: `src/content/wiki/warping-pla.md`
Fuentes cocinadas: `wiki/cooked/warping-pla.md`
Informe anterior: `wiki/reviews/warping-pla-revision-1.md`

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — 1 891 palabras |
| 5 | Citas correctas | PASA |

## Los tres fallos del informe anterior

**1 · La cuantificación inventada.** Corregido. Ya no dice «el error más frecuente».
Ahora dice «es un error documentado con nombre y apellidos», que es lo que
sostienen las fuentes: un hilo, con sus cifras y su antes y su después.

**2 · La afirmación de humedad fuera del apartado que la respalda.** Corregido, y
en la capa correcta. `wiki/cooked/warping-pla.md` la ha movido el cocinero a
`## Afirmaciones`, con su fuente, y sigue apareciendo en la tabla de `## Relaciones`
como concepto. El artículo no ha cambiado: podía usar el dato porque ahora es
citable de verdad.

**3 · Los enlaces a páginas inexistentes.** Corregido. Las tres páginas futuras se
nombran como texto y las tres llevan detrás «Todavía no escrita». La tercera ya lo
estaba y sigue igual: es la forma correcta de nombrar algo que aún no existe.

## Comprobado esta vez, dato a dato

- Las cinco URLs de `sources` están en `wiki/raw/` con ese mismo `url`.
- Cada cifra del artículo aparece en `wiki/cooked/warping-pla.md`: los 20 °C, los
  +5 a +10 °C, los 55–65 °C de la Textured PEI, los 35 °C de la Cool Plate, el
  0,04 mm, las 3 primeras capas sin cooling, el 40-50 % del auxiliar, los 8-10 mm
  de brim, el 25 % de relleno, el 60 % frente al 15 %, los 10-20 % de ventilador, y
  el orden PC → PA-CF → PA → ABS → ASA → PETG → PLA.
- Las dos contradicciones están explicadas, no resueltas: no hay ningún sitio del
  artículo donde se elija una cifra por encima de la otra sin decir por qué.
- Las dos afirmaciones marcadas como de una sola fuente —el techo de 65 °C y el
  cubic por delante de gyroid— aparecen con ese matiz, no como hechos.
- Un solo `<h1>`. Las secciones van en el orden del esquema. Existe
  `## Qué puede salir mal` con seis casos.
- Ninguna de las frases prohibidas.

## Nota para el lint

La tabla de `## Relaciones` de `wiki/cooked/warping-pla.md` nombra una página que
esta vez **sí** tiene nombre: *enclosure y warping*. Es el tema donde las fuentes
se contradicen de forma aparente y el matiz es el contenido entero. Está escrito
en el artículo como página futura, no enlazada.

Ese es el patrón que conviene repetir: cuando dos fuentes discrepan y el
porqué de la discrepancia es lo que aporta valor, eso merece página propia.
