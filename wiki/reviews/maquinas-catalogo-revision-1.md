# Revisión de maquinas (catálogo y material cocinado)

**Veredicto: RECHAZADO** — 11 fallos, de los cuales 6 bloqueantes.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — datos con origen F/T sin fuente real o contradichos por cooked/raw |
| 2 | Contradicciones internas | FALLA — 5 contradicciones sin declarar entre catálogo y cooked |
| 3 | Relleno y frases de IA | PASA — no aplica al catálogo |
| 4 | Campos P, regla térmica y uso de `cerrada` | FALLA — `null` se interpreta como abierto en la UI; `cerrada: true` sin origen en la Mars |
| 5 | Citas correctas y accesibles | FALLA — las fuentes de origen T (gavler, MakerSpecs, ficha comercial de Flashforge) no están archivadas en `wiki/raw/` |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Temperatura de boquilla/cama de la AD5X declarada pendiente pese a fuente oficial

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `ad5x`, campos `tNozMax` y `tCamaMax`.

**Qué dice:** `tNozMax: null`, `tCamaMax: null`, con origen `P`.

**Por qué falla:** la ficha oficial de Flashforge (`wiki/raw/rasgos-visuales-ad5x-flashforge-oficial.md`, especificaciones) afirma `Max Extruder Temp: 300 °C` y `Max Bed Temp: 110 °C`, y el material cocinado (`wiki/cooked/rasgos-visuales-ad5x.md`, sección Extrusor) recoge «Temperatura máxima de extrusor 300 °C». El comentario del catálogo justifica la pendiente con los 350 °C de zmod (firmware modificado), pero ignora los 300 °C oficiales. Consecuencia: la AD5X queda sin compatibilidad evaluable con ABS/ASA cuando la fuente sí da el techo.

**Qué hacer:** poner `tNozMax: 300`, `tCamaMax: 110` y cambiar su origen a `F`, citando la ficha oficial de Flashforge.

### 2 · Bloqueante · Extrusor de la AD5X afirmado como «Directo» sin respaldo

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `ad5x`, campo `extrusor: 'Directo'` con origen `T`.

**Qué dice:** `extrusor: 'Directo'`.

**Por qué falla:** el material cocinado (`wiki/cooked/rasgos-visuales-ad5x.md`, sección Extrusor) dice explícitamente «Si el extrusor es directo o bowden: sin verificar», y ninguna de las dos fuentes oficiales de Flashforge describe el tipo de extrusor. El catálogo afirma un dato que el cocinado marca como no verificado.

**Qué hacer:** poner `extrusor: null` y origen `P`, o aportar una fuente que lo afirme y archivarla en `wiki/raw/`.

### 3 · Bloqueante · Familia `corexy-cerrada` de la AD5X afirmada con origen F sin fuente que diga «cerrada»

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `ad5x`, `familia: 'corexy-cerrada'` con origen `F`.

**Qué dice:** la máquina es CoreXY cerrada.

**Por qué falla:** ninguna fuente afirma el cerramiento: la ficha oficial lista un «Enclosure kit» como accesorio y el material cocinado (`wiki/cooked/rasgos-visuales-ad5x.md`, `## Sin verificar`) deja «Si la máquina es abierta o cerrada de fábrica» sin verificar. El comentario del catálogo reconoce que es una inferencia («La familia dice cerrada porque el cerramiento es su modo completo»). Marcarla como `F` contradice la regla del origen.

**Qué hacer:** o bien reclasificar la familia a un valor neutro con origen `P` (y `cerrada: null` ya lo está), o aportar una fuente que afirme el cerramiento. Mientras tanto, no puede ir con origen `F`.

### 4 · Bloqueante · Dimensiones de A1, P1S y MK4S pendientes pese a tener fuente oficial

**Dónde:** `src/content/maquinas/catalogo.ts`, entradas `bambu-a1`, `bambu-p1s` y `prusa-mk4s`, campo `dims: null` con origen `P`.

**Qué dice:** dimensiones sin fichar.

**Por qué falla:** las tres tienen fuente oficial que las da: Bambu A1 `465 × 410 × 430 mm` (`wiki/raw/rasgos-visuales-a1-bambulab-tech-specs.md`), Bambu P1S `389 × 389 × 458 mm` (`wiki/raw/rasgos-visuales-p1s-bambulab-store-oficial.md`) y Prusa MK4S `500 × 550 × 400 mm` (`wiki/raw/rasgos-visuales-mk4s-prusa-oficial.md`). El material cocinado recoge las tres. El catálogo las deja pendientes.

**Qué hacer:** rellenar `dims` con esas cifras y cambiar el origen a `F`.

### 5 · Bloqueante · Volumen de impresión de la Mars 5 Ultra afirmado con origen T frente a cooked que lo marca sin verificar

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `elegoo-mars-5-ultra`, `vol: [153, 77, 165]` con origen `T`.

**Qué dice:** volumen útil de 153 × 77 × 165 mm.

**Por qué falla:** el material cocinado (`wiki/cooked/rasgos-visuales-mars5-ultra.md`, sección Estructura y `## Descartado`) descarta todo el volumen de impresión como proveniente de reviews de terceros borradas, y deja «Volumen de impresión y dimensiones externas: sin verificar». El catálogo lo afirma con origen T (gavler) sin fuente archivada en `wiki/raw/`.

**Qué hacer:** poner `vol` pendiente o aportar y archivar la fuente de gavler en `wiki/raw/`. Mientras no exista fichero crudo, no puede ir como T.

### 6 · Bloqueante · `cerrada: true` en la Mars 5 Ultra sin origen declarado

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `elegoo-mars-5-ultra`, `cerrada: true` con `origen.cerrada: null`.

**Qué dice:** la máquina está cerrada.

**Por qué falla:** el material cocinado no afirma ni el cerramiento ni el chasis («Forma del chasis, tapa, patas, color, dimensiones externas y volumen de impresión: sin verificar»). Un booleano sin origen es una afirmación disfrazada de dato, que es exactamente lo que el tipo `Maquina` prohíbe para `cerrada`. El script `verify:maquinas` lo deja pasar por la excepción de resina, pero el dato sigue sin fuente.

**Qué hacer:** poner `cerrada: null` (pendiente) hasta tener fuente, o añadir origen `F`/`T` con fuente archivada.

### 7 · Bloqueante · `null` se interpreta como «abierta» en la UI

**Dónde:** `src/components/MaquinaSVG.tsx`, líneas 440 y 471.

**Qué dice:** la descripción del SVG usa `maquina.cerrada ? 'cerrada con puerta de cristal' : 'abierta'`, y `VistaCoreXY` recibe `abierta={!maquina.cerrada}`.

**Por qué falla:** con `cerrada === null` (AD5X, A1, KE, SE), `!null` es `true`, así que la máquina se dibuja y se describe como abierta. Eso contradice el contrato del tipo (`null` = no verificado, no `false`) y la regla de `src/lib/maquinas.ts`, que distingue `=== null` de `=== false`. La AD5X, cuya familia es `corexy-cerrada` y cuyo cerramiento no está verificado, se dibuja abierta.

**Qué hacer:** tratar `null` como «desconocido» en el SVG: descripción neutra («CoreXY, husillos y cama que sube») y `abierta` indefinido que no dibuje paneles ni los omita como si fuera abierta.

### 8 · Importante · `velMax` de la Mars con origen T pero valor `null`

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `elegoo-mars-5-ultra`, `velMax: null` con origen `T`.

**Qué dice:** origen T sin valor.

**Por qué falla:** un campo con origen `T` afirma que está verificado, pero `null` es «no aplica/pendiente». La fuente oficial da 150 mm/h, que no es una velocidad de desplazamiento FDM; el catálogo no debería marcarlo como T sin valor.

**Qué hacer:** poner `velMax: null` con origen `null` (no aplica, es resina) y quitar el origen T.

### 9 · Importante · Dimensiones de la CORE One atribuidas a un comentarista

**Dónde:** `src/content/maquinas/catalogo.ts`, entrada `prusa-core-one`, `dims: null` con origen `P`.

**Qué dice:** dimensiones pendientes.

**Por qué falla (matiz):** el material cocinado (`wiki/cooked/rasgos-visuales-core-one.md`) sí recoge `415 × 444 × 555 mm`, pero anota que las publicó un comentarista del hilo, no el cuerpo del texto de Prusa. El catálogo las deja pendientes, lo cual es coherente con no tener fuente primaria, pero conviene declarar el matiz: hay un dato secundario no verificado que podría promoverse a `T` si se archiva la fuente.

**Qué hacer:** mantener pendiente o, si se quiere usarlo, archivar el hilo como fuente T y rellenar `dims` con origen `T`.

### 10 · Menor · `pantallaTactil` sólo aparece en un comentario de `tipos.ts`

**Dónde:** `src/content/maquinas/tipos.ts`, línea 122 (comentario).

**Qué dice:** el comentario menciona el rasgo retirado.

**Por qué falla:** el requisito era que el rasgo retirado no apareciera en ningún fichero. Aparece únicamente en ese comentario explicativo, no como campo, rasgo ni uso funcional. No bloquea, pero conviene borrar la mención literal si se quiere cumplir al pie de la letra.

**Qué hacer:** reformular el comentario sin escribir el identificador del rasgo retirado.

### 11 · Menor · Fuentes de origen T no archivadas en `wiki/raw/`

**Dónde:** `src/content/maquinas/catalogo.ts`, array `fuentes` de todas las máquinas con origen T (Ender 3 V3 SE/KE, AD5X, Mars 5 Ultra).

**Qué dice:** URLs de gavler.com, makerspecs.com y la ficha comercial de Flashforge.

**Por qué falla:** ninguna de esas URLs aparece en `wiki/raw/` (sólo están las fuentes oficiales). El revisor no puede verificar contra lo crudo los datos marcados como T, incluidos los que el catálogo afirma (velocidades, volúmenes, extrusor).

**Qué hacer:** o bien archivar esas fuentes en `wiki/raw/` (tarea del recolector) o rebajar los datos a `P` hasta tenerlas.

## Notas que no bloquean

- La regla térmica de `src/lib/maquinas.ts` (`estadoFilamento`, `rizaria`, `avisos`) es coherente con el material cocinado: ABS/ASA requieren cámara cerrada y el código distingue `=== null` de `=== false`. Los comentarios no afirman más que las fuentes («warping casi seguro» es una formulación más débil que «requiere cámara cerrada»).
- Los rasgos declarados en `rasgos` (ventiladoresDobles, carrilLinealX, ifsBobinas, zTriple, filtroCarbon, bobinaLateral) están respaldados por el material cocinado correspondiente y éste cita la fuente cruda.
- `pantallaTactil` no se usa como campo ni rasgo en ningún fichero funcional; sólo en el comentario de `tipos.ts`.
- El campo `cerrada` se usa correctamente en `src/lib/maquinas.ts` (`=== null` / `=== false`); el único punto que lo trata como booleano truthy es `MaquinaSVG.tsx` (fallo 7).
- `verify:maquinas` pasa las comprobaciones de origen por máquina, pero no detecta los fallos 1–6 ni 8 porque sólo comprueba coherencia interna, no veracidad contra `wiki/cooked/`/`wiki/raw/`.