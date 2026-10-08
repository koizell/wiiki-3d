# Revisión de separaciones-entre-capas (segunda vuelta)

**Veredicto: RECHAZADO** — 1 fallo, ninguno bloqueante. Los cuatro de la vuelta 1
están corregidos y bien corregidos; lo único que queda es una línea del pie.

Artículo revisado: `src/content/wiki/separaciones-entre-capas.md` (412 líneas)
Material cocinado: `wiki/cooked/separaciones-entre-capas.md`
Fuentes crudas: siete en `wiki/raw/` — cinco `separaciones-entre-capas-*`, más
`warping-pla-prusa-forum-warping-at-corners.md` y
`temperatura-cama-prusa-kb-filament-material-guide.md`
Revisión anterior: **no está en `wiki/reviews/`.** No hay ningún
`separaciones-entre-capas-revision-1.md` ni ningún otro fichero de este tema en esa
carpeta, así que los cuatro fallos los he comprobado contra la descripción que me
llega y no contra el informe. Lo dejo escrito porque el número de vuelta queda con un
hueco y porque quien vuelva a este tema tiene que saber que la vuelta 1 no está en
disco.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 sin respaldo: el reparto de fechas del pie |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Longitud y estructura | PASA — ≈ 3 800 palabras, un solo `<h1>` (línea 29), secciones en orden, `## Qué puede salir mal` con 9 casos, frontmatter completo y `slug` igual al nombre del fichero |
| 5 | Citas correctas | PASA — 7 de 7 URLs en `wiki/raw/` con ese mismo `url`, 0 repetidas, primera cita en la línea 45, 11914 fuera de `sources` |

## Los cuatro fallos de la vuelta 1

### 1 · La afirmación que el crudo contradecía — CORREGIDA, y no quedan restos

El crudo, `…prusa-kb-layer-separation-and-splitting-fdm.md:27`, cierra su párrafo de
ABS con `You can check the material guides for choosing the best material for your
print.`

Lo que hay ahora (líneas 232-236): «el KB da su propio rango para el PLA y no lo toma
de la tabla. Lo único que hace es remitir a las guías de material, y lo hace en el
párrafo del ABS, para elegir con qué material imprimir. La otra mitad sí es cierto al
revés: la tabla de materiales no menciona la separación entre capas.»

Comprobado, dato por dato:

- El KB da su propio rango: raw l. 29, `Depending on the brand, PLA is printed at a
  range between 195-220`. No hay ningún «véase la tabla» ni el 185-235 en ese KB. ✓
- La única remisión a las guías de material de todo el KB es la de la l. 27, y es
  para elegir con qué material imprimir. ✓
- La tabla de materiales no menciona la separación entre capas: son 88 líneas, 18
  filas de material y notas del recolector, y no aparece. ✓

**Restos del motivo viejo: ninguno.** `grep "citan entre sí"` en el artículo da cero. El
artículo no tiene sección `## Relaciones`; sus dos tablas —la diagnóstica (l. 75-80) y
la de cifras de boquilla (l. 220-224)— no hablan de la relación entre los dos
documentos. La única frase que la toca es la de las l. 238-242 («el KB nunca dice que
185 °C sea demasiado poco» / «no hay una versión corregida del otro»), y es coherente
con lo nuevo. ✓

Matiz que no es fallo: la remisión a las guías está al final del párrafo que compara
ABS con PETG y ASA (raw l. 27), no en el párrafo «ABS is highly susceptible…» (raw
l. 23). «El párrafo del ABS» se entiende, pero el párrafo es el de ABS→PETG/ASA.

### 2 · Los recuentos — CORREGIDOS, y contados desde las fuentes

- `sources` del frontmatter: **7** URLs, todas distintas. `fuentes` del cocinado: **7**
  rutas. El artículo dice «Ninguna de las siete fuentes de este artículo» (l. 290). ✓
- El pie ya no descuadra con ese siete: 6 + 1 = 7. (Las fechas sí están mal; es el
  fallo de este informe.)
- «Los dos hilos que cuentan un caso de separación de principio a fin son los únicos
  que lo hacen» (l. 297), y la frase siguiente dice dónde está el tercero: el de las
  esquinas arrugadas, que es de otro fallo —raw l. 11-22, «weird corner warping», de
  Elias Spors— y del que aquí sólo se usan las juntas. ✓
- El tercer sitio (l. 394) ✓.
- Los demás recuentos que comprobé: cuatro métodos de Bambu (raw l. 23-49), cinco
  materiales propuestos (ABS, ASA, PC, PET-CF, PA-CF), dos cifras de velocidad, tres
  cifras de boquilla, cinco posts en el hilo de 2026 (newgen, Naugh, newgen, Naugh,
  newgen), tres posts en el de 2020, dos `[[warping-pla]]`. ✓

Nota menor, no la cuento como fallo: «El de 2020 tiene tres posts y una respuesta»
(l. 318) se puede leer como 3 + 1. El hilo tiene tres posts y el último es la respuesta
de jaychatt. «Tres posts, el último respuesta» no dejaría duda.

### 3 · El «dos veces» — CORREGIDO

Ahora (l. 315-316): «es la lectura de una imagen que el propio autor califica de baja
resolución». Sin número, y el crudo lo confirma: `grep "resolution" wiki/raw/*.md` da
**una** coincidencia en todo el lote, la l. 69 del hilo de 2026 («The photo doesn't have
very high resolution»).

El «dice dos veces» venía del cocinado (l. 442-443) y de las notas del recolector del
propio crudo (l. 127-129), y ninguno de los dos se sostenía: el hilo lo dice una vez.
El artículo ya no lo afirma y no queda ninguna otra versión del «dos veces». ✓

### 4 · Las citas — CORREGIDO, y el apóstrofo recto es correcto

`grep "’"` → 3, y los tres son curly en el crudo también: `printer’s` (KB l. 33),
`there’s` (KB l. 23), `I’ll` (hilo de 2026, l. 87). ✓

Los rectos dan 4 coincidencias, y ninguna es un apóstrofo rectificado:

- l. 200, `'old days'`: comillas simples dentro de «», por convención española al citar
  un original que usa dobles. **No es un fallo** y me parece la convención correcta; lo
  dejo anotado, no marcado.
- l. 284 `don't`, l. 320 `I've`, l. 321 `haven't`: el hilo de 2020 **trae apóstrofos
  rectos**. `grep "'" …separation-of-layers-in-middle-of-print.md` → 5 coincidencias,
  todas rectas (l. 15, 25, 44, 67, 72). El artículo reproduce el original tal cual. ✓

O sea que sí: el cuarto apóstrofo recto está bien puesto. Marcarlo como fallo habría
sido un rechazo falso.

## El fallo que queda

### 1 · Menor · El reparto de fechas del pie no cuadra con `capturado`

**Dónde:** pie, líneas 411-412.

**Qué dice:** «Seis consultadas el 2026-10-04; la tabla de materiales de Prusa, el
2026-10-03.»

**Por qué falla:** de las siete fuentes, cinco tienen `capturado: 2026-10-04` y **dos**
tienen `capturado: 2026-10-03`: la tabla de materiales y también
`warping-pla-prusa-forum-warping-at-corners.md`, que vino del lote de warping-pla y se
cruzó aquí para el 11914. `grep "capturado:" wiki/raw/` lo dice sin discusión.

El pie es justamente el sitio donde se declara de qué lote vino cada fuente, así que el
error va en la mitad de la frase que sirve para eso. Y la convención está confirmada
por `warping-pla.md:378` («Todas consultadas el 2026-10-03»), donde todas sus fuentes
son de ese día: el pie está usando `capturado`, y por eso el reparto tiene que ser
5 + 2.

**Qué hacer:** «Cinco consultadas el 2026-10-04; el hilo de las esquinas arrugadas y la
tabla de materiales de Prusa, el 2026-10-03.»

Es una línea, y con ella el artículo queda aprobable sin tocar nada más.

## Lo que volví a mirar y estaba bien

- **Los «5 °C no resolvieron aquel caso»: no queda ninguno.** `grep "5 °C"` devuelve la
  cita del KB (l. 168), la de bobstro (l. 276) y la l. 246, que es la frase correcta:
  «Nadie cuenta en ese hilo haber seguido los pasos de 5 °C: la lista de lo que se
  probó no los incluye». Lo que pone ahora es lo que el hilo sostiene: la lista de
  descartes de newgen (raw l. 25-45) no incluye ningún incremento de temperatura, y el
  hilo se cierra sin resultado. En «Qué puede salir mal» ya no está. ✓
- **La atribución del 60 %:** correcta y ahora bien explicada. `bambu…:45` es el 60 % y
  no lleva material junto; el «with ABS» de `bambu…:39` es el de las dos velocidades.
  El artículo lo dice (l. 191-194) y su tabla (l. 159) no le pone material. ✓
- Las tres cifras de boquilla y su tabla: intactas, con el 195-220 sin unidad. ✓
- El `50-60 °C` como temperatura de cama, con el aviso de que el KB de separación no da
  ninguna cifra de cama. ✓
- La frase prohibida «si se separan capas, es warping» aparece sólo como el error que no
  se permite, en «Qué puede salir mal» (l. 350). ✓
- La trampa del ventilador: las dos recomendaciones opuestas, cada una con su contexto
  (l. 138-148), y el aviso repetido en «Qué puede salir mal» (l. 357-359). ✓
- El 11914: se habla del issue y la cita va al hilo del foro; la URL de GitHub no está
  en `sources`. ✓
- La ausencia de `campo`: el bloque de comentario del frontmatter lo justifica y
  existe la sección «Por qué tu slicer puede no escribir este dato». ✓
- Atribución persona por persona: newgen (los descartes, «The issue still persists…»),
  Naugh (la torre, los 205 °C, el *sweet spot*), jaychatt (descarta la altura de capa,
  sospecha del filamento), bobstro (el 80 %, «ventilador primero», under-extrusión en
  tiradas largas, rango «Eminent Member»), Neophyl (las juntas y el issue). Cada uno en
  su intervención. ✓
- Todas las citas del KB, de Bambu y de los dos hilos, comprobadas una a una contra
  `wiki/raw/`. Ninguna inventada.

## Notas que no bloquean

1. **«y sus dos únicas cifras son las de las velocidades» (l. 191)** es la frase que
   salió de la corrección del 60 %, y admite dos lecturas. Con la lectura literal —«las
   dos únicas cifras de la página son las velocidades»— choca con su propia tabla de las
   l. 155-160, que le da cuatro cifras a esa misma página (150 y 100 mm/s, 60 %,
   +5-10 °C y +5 °C), y con la frase siguiente, que presenta el 60 % como otra cifra de
   la página. Con la lectura que quiere el redactor —«las dos únicas cifras que la
   página da **con un material al lado**»— es cierto y todo encaja. No lo cuento como
   fallo porque hay lectura verdadera y ningún dato está mal, pero dos palabras menos
   de ambigüedad lo dejarían tieso.
2. **La cita de Neophyl entra en minúscula** («those pics just look like…», l. 329)
   donde el crudo pone «Those». Es normalización tipográfica al insertarla en la frase,
   no cambia nada; lo apunto sólo para que conste.
3. **«las seis cifras que existen a la vez»** en la línea de `[[temperatura-cama]]`
   (l. 402) no aparece como tal en `wiki/cooked/temperatura-cama.md`. Se puede contar
   —35–65, 35–45, 45–65, 50–60, 60 y 65 son seis cifras de cama para PLA— y la
   conclusión de aquel artículo («depende de qué chapa tengas encima») es la que la
   frase resume. No lo cuento como fallo; lo digo porque es el único número del
   artículo que no sale de una fuente de este lote.
4. **El cocinado sigue teniendo los dos errores que este artículo ya no tiene**, y por
   eso hay que arreglarlo arriba o el problema vuelve en la próxima reescritura:
   `wiki/cooked/separaciones-entre-capas.md:228-231` y `:373-375` («El KB de separación
   entre capas no cita la tabla de materiales» / «no se citan entre sí»), y `:66-68` y
   `:352-353` (el 60 % «dicha para ABS», que el crudo desmiente). El artículo los ha
   corregido sin permiso, que era lo que tocaba; lo que no era suyo era el cocinado.

## Nota de método

El recuento de palabras es un conteo manual por bloques: 294 palabras en las líneas
29-60 y 566 en las 216-266, sobre 380 líneas de cuerpo. Da ≈ 3 800 palabras, muy por
encima del mínimo de 800; da igual para el veredicto, porque el margen es de cuatro
veces.