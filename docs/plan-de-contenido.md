# El plan de contenido de la wiki

Diez artículos: uno escrito, nueve por escribir. Cada uno va atado a un campo del
panel de análisis, y esa es la razón por la que esta wiki existe y no es una
enciclopedia de impresión 3D.

**Nada de este documento está generado.** Es la preparación para después del
reinicio de sesión, cuando los cuatro subagentes estén registrados.

## Las tres reglas que decidieron el contenido

| Regla | Qué significa | Por qué |
|---|---|---|
| **Un artículo, varios campos** | `warping-pla` cubre `warpingRisk` y `riskLevel` | Son el mismo dato en dos versiones: la categoría y el número. Que el panel enlace desde dos sitios al mismo artículo no es duplicación |
| **Un campo, un artículo** | Un campo no puede apuntar a dos | Ahí sí hay ambigüedad, y el panel no sabría a cuál mandar. `verify:wiki` lo comprueba |
| **El panel enlaza siempre** | Con dato o con «—» | El artículo explica el concepto, no esta instancia. Que el slicer no escribiera el campo es **una razón más para leerlo** |

Y una consecuencia de la tercera: **todo artículo atado a un campo opcional lleva
una sección que conteste por qué puede faltar.** Los siete opcionales de
`ProjectMetadata` son `hotendTemp`, `bedTemp`, `layerHeight`, `filamentUsed`,
`filamentWeight`, `hasOverhangs` y `overhangAngle`, y `verify:wiki` lo lee de
`src/services/types.ts` y lo exige.

`warping-pla` **no** la lleva, porque `warpingRisk` y `riskLevel` son obligatorios
en `JevClassification`.

## El orden de generación, y por qué es este

Un orden, dos criterios, y ninguno de los dos es la numeración.

**Primero, la red de enlaces cruzados ya escrita manda.** `warping-pla` nombra
tres páginas futuras con `[[…]]`, y cada artículo que escriba convierte rayas
punteadas en enlaces. Eso se mide:

| Artículo | Enlaces que enciende | Material cocinado que reutiliza |
|---|---|---|
| `separaciones-entre-capas` | **2** (el diagnóstico y el final) | Todo: la tabla diferencial y el issue 11914 ya están cocinados |
| `enclosure-y-warping` | 1 | La contradicción 3, ya cocinada y sin resolver |
| `adhesion-primera-capa` | 1 | Aceite, limpieza, brim, Live Adjust Z |
| `temperatura-cama` | 0 | La contradicción 1, la más grande |
| `material` | 0 | El orden de contracción PC → … → PLA |
| `voladizos-y-soportes` | 0 | Ventilador 10-20 % |
| `altura-capa` | 0 | Poco: 60 % frente a 15 % de relleno |
| `temperatura-hotend` | 0 | Temperatura de boquilla contra adhesión entre capas |
| `slicer` | 0 | Nada: todas sus fuentes son nuevas |

**Segundo, lo que `[[…]]` NO restringe.** Como los enlaces cruzados se degradan a
texto si la página no existe, **ningún artículo está bloqueado por el orden**. Se
puede escribir cualquiera antes que los demás, y su enlace se enciende solo. El
orden de arriba es por valor, no por dependencia: si sólo se puede escribir uno,
es el que más rayas punteadas convierte.

### Los lotes

| Lote | Artículos | Por qué juntos |
|---|---|---|
| **1** | `separaciones-entre-capas`, `temperatura-cama` | El primero enciende 2 enlaces con material ya cocinado; el segundo es el de más tráfico desde el panel y el de la contradicción más grande |
| **2** | `material`, `voladizos-y-soportes` | Los dos se apoyan en la tabla de materiales que está verificada y legible |
| **3** | `adhesion-primera-capa`, `enclosure-y-warping` | Los dos encienden un enlace cada uno, y el del enclosure es la contradicción que sigue sin resolver |
| **4** | `altura-capa`, `temperatura-hotend` | Los dos con menos material previo: necesitan las fuentes nuevas |
| **5** | `slicer` | Solo: es el único que no se apoya en nada cocinado |

## Las fuentes candidatas

**Todas están verificadas.** Cada URL se comprobó con `curl` y se leyó su `<title>`
antes de escribirla aquí. Dos no pasaron y están fuera:

- `wiki.bambulab.com/en/staging/build-plate-guide` → **403 Unauthorized**
- `help.prusa3d.com/article/mesh-bed-leveling_112363` → **404** (el bueno es `_112163`)

Sin esa comprobación, el plan habría enviado al recolector a una URL muerta y yo
habría puesto en un documento URLs que no existen. Verificar cuesta un minuto;
inventar cuesta un artículo entero.

Una URL aquí es **un sitio al que ir**, no una cita. Sólo pasa a ser cita cuando el
recolector la descarga, el contenido está y queda en `wiki/raw/`.

### 1 · `temperatura-cama` — campo `bedTemp` (opcional → necesita sección)

- `https://wiki.bambulab.com/en/general/filament-guide-material-table` — **200**, «Filament guide». Ver más abajo: trae la tabla de cama
- `https://wiki.bambulab.com/en/general/build-plate` — **200**, «Bambu Lab Build Plates Overview»
- `https://help.prusa3d.com/article/bed-level-correction_2267` — **200**
- El hilo del foro ya recogido en `wiki/raw/`, que es donde está el «máximo 65 °C»

### 2 · `separaciones-entre-capas`

- `https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806` — **200**, «Layer separation and splitting FDM». **Fuente oficial directa**, y no estaba en el plan anterior
- `https://wiki.bambulab.com/en/filament-acc/filament/print-quality/interlayer-cracking` — **200**, «Model interlayer cracking»
- `https://help.prusa3d.com/article/layer-shifting_2020` — **200**
- `https://help.prusa3d.com/article/warping_2011` — **200**, ya en `wiki/raw/`

### 3 · `material` — campo `material` (obligatorio → sin sección)

- `https://wiki.bambulab.com/en/general/filament-guide-material-table` — **200**. Tabla de 26 filas, legible
- `https://wiki.bambulab.com/en/knowledge-sharing/filament-guide-beginners` — **200**
- `https://wiki.bambulab.com/en/knowledge-sharing/3d-prints-shrinkage` — **200**
- `https://wiki.bambulab.com/en/filament-acc/filament/dry-filament` — **200**

### 4 · `voladizos-y-soportes` — campos `hasOverhangs`, `overhangAngle` (opcionales → sección)

- `https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang` — **200**, «How to Print Overhangs»
- `https://help.prusa3d.com/article/failing-supports_1807` — **200**
- `https://help.prusa3d.com/article/bad-looking-surface-above-supports_1803` — **200**
- `https://help.prusa3d.com/article/skirt-and-brim_133969` — **200**

### 5 · `adhesion-primera-capa` — campo `bedTemp`

- `https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking` — **200**, «First Layer Not Sticking: Causes and Solutions»
- `https://help.prusa3d.com/article/first-layer-issues_1804` — **200**
- `https://help.prusa3d.com/article/first-layer-calibration-i3_112364` — **200**
- `https://help.prusa3d.com/article/mesh-bed-leveling_112163` — **200**
- `https://help.prusa3d.com/article/skirt-and-brim_133969` — **200**

### 6 · `enclosure-y-warping` (sin campo)

- `https://wiki.bambulab.com/en/general/filament-guide-material-table` — **200**. Sección «Chamber Temperature Control». Ver más abajo
- `https://help.prusa3d.com/article/ambient-temperature-check-mk3-mk3s_161230` — **200**
- Las dos páginas de warping de Bambu y la de Prusa, ya en `wiki/raw/`

### 7 · `altura-capa` — campo `layerHeight` (opcional → sección)

- `https://wiki.bambulab.com/en/software/bambu-studio/layer-height` — **200**
- `https://help.prusa3d.com/article/layers-and-perimeters_1748` — **200**
- `https://help.prusa3d.com/article/variable-layer-height-function_1750` — **200**
- All3DP es el único sitio con cifras de resistencia, y **no sirve**: su HTML no trae el texto del artículo, ni en `/amp/`. Queda como hueco declarado

### 8 · `temperatura-hotend` — campo `hotendTemp` (opcional → sección)

- `https://wiki.bambulab.com/en/general/filament-guide-material-table` — **200**. Tabla de 26 filas con temperatura de boquilla por material. Ver más abajo
- `https://wiki.bambulab.com/en/filament-acc/filament/slice-param` — **200**
- `https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806` — **200**

### 9 · `slicer` — campo `slicer` (obligatorio → sin sección)

- `https://help.prusa3d.com/article/first-print-with-prusaslicer_1753` — **200**
- `https://help.prusa3d.com/article/faq-prusaslicer_1789` — **200**
- `https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653` — **200**, como ejemplo de cómo publica un fabricante su tabla de material

## Lo que encontró la búsqueda y cambia el plan

Recoger las URL candidatas salió de los sitemaps de Bambu (7,9 MB) y Prusa
(23 MB) en lugar de buscarlas una a una, y eso salió mejor de lo previsto: no sólo
aparecieron las URL, sino **cifras que el material cocinado no tenía**.

### La tabla de materiales de Bambu sí se lee

`wiki/cooked/warping-pla.md` Anota en `## Tirado` que la tabla de materiales de
Prusa «sale aplastada en texto plano». Es cierto, y sigue siéndolo. **La de Bambu
no**: son seis tablas `<table>` de verdad, con cabeceras y filas.

Trae, entre otras cosas:

| Filamento | Cama |
|---|---|
| PLA / PLA-CF | **35 – 65 °C** |
| PETG y variantes | 60 – 80 °C |
| ABS | 90 – 100 °C |
| ASA | 90 – 100 °C |
| TPU | 30 – 45 °C |
| PC | 100 – 120 °C |
| PA y variantes | 90 – 110 °C |

**Esto toca una contradicción que el material cocinado dejó sin resolver.** La
contradicción 1 de `wiki/cooked/warping-pla.md` dice, textualmente, que Bambu da
«+5 a +10 °C, objetivo 55–65 °C en Textured PEI» y «la Cool Plate para PLA es 35 °C»,
y lo marca como dos cifras que parecen contradictorias. En la tabla de materiales
**35–65 °C es un único rango por material**, y los dos números del artículo son sus
extremos: el 35 es la Cool Plate y el 65 la Textured PEI. No es una discrepancia,
es un rango leído por partes.

Y el techo de 65 °C, que el material cocinado marca como «una sola fuente, de
foro», pasa a estar en la tabla oficial de Bambu. Deja de ser una opinión de un
usuario.

**Esto no lo he aplicado.** `wiki/cooked/` es salida del pipeline y el artículo ya
pasó revisión; tocarlo aquí sería saltarme al cocinero y al revisor. Queda
anotado para que lo haga el pipeline, y es un argumento de más para que `temperatura-cama`
sea el primer artículo del lote 1.

### La contradicción del enclosure tiene respuesta oficial

La 3, sobre el enclosure: Prusa dice que imprimir PLA dentro de un enclosure «puede
ser mala idea» porque PLA necesita refrigeración, y Bambu dice que el ambiente estable
importa. El material cocinado la deja como contradicción sin resolver, con el matiz
de que un enclosure **sin tapa** es lo que gana.

La sección «Chamber Temperature Control Based on Filament Softening Temperature» de la
misma tabla de Bambu dice, para filamentos con temperatura de reblandecimiento por
debajo de 60 °C —y nombra al PLA— cuando la cama está por encima de 45 °C:
**abrir la puerta frontal y/o quitar la tapa de cristal superior** para que el calor
de la cámara no reblandezca el filamento.

O sea: **los dos fabricantes llegan a lo mismo desde lados opuestos.** Prusa lo dice
como «no cierres», Bambu como «abre». La contradicción 3 se resuelve, y el artículo
de `enclosure-y-warping` tiene ya su contenido.

### La temperatura de boquilla para PLA está verificada

La segunda tabla del documento da la temperatura de boquilla por material:
**PLA 190 – 240 °C, ±10 °C**. Con eso `temperatura-hotend` deja de depender de que
alguien encuentre una tabla legible.

## Los comandos

Cada artículo es un ciclo de cuatro pasos con `task`. El agente recibe **rutas de
ficheros**, nunca historial, y devuelve **rutas**, nunca texto para las personas.

**El registro de subagentes se construye al arrancar la sesión.** Los cuatro
agentes de `.opencode/agents/` no existen para `task` hasta que se reinicia. Antes
de esto hay que comprobarlo: si `task(recolector, …)` devuelve en vez de buscar,
no hay que seguir, porque los tres pasos siguientes escribirían sobre ficheros que
no existen.

### El ciclo, con las rutas del lote 1

```bash
# 1. Traer las fuentes crudas. El prompt sólo lleva el tema y las candidatas.
task(recolector,
  "El tema está en /tmp/opencode/pipeline/separaciones-entre-capas.md. " +
  "Estas URLs están verificadas con 200 y su título leído; úsalas como puntos " +
  "de partida y busca más, sobre todo foro de Prusa. Reddit y All3DP no sirven: " +
  "la primera devuelve la cáscara vacía y el segundo no trae el texto del artículo.")

# 2. Cocinar. El cocinero lee las rutas que devolvió el recolector.
task(cocinero,
  "Las fuentes están en las rutas que devolvió el recolector.")

# 3. Escribir. El redactor sólo lee wiki/cooked/, nunca wiki/raw/.
task(redactor,
  "El material cocinado está en wiki/cooked/separaciones-entre-capas.md.")

# 4. Revisar. Devuelve APROBADO o RECHAZADO con notas. No modifica el artículo.
task(revisor,
  "Revisa src/content/wiki/separaciones-entre-capas.md contra " +
  "wiki/cooked/separaciones-entre-capas.md.")
```

**El paso 3 tiene una condición que no es opcional.** Al terminar, hay que añadir la
entrada del campo en `src/lib/wiki-campos.ts` y comprobar con `npm run verify:wiki`.
Sin eso el artículo existe y es invisible desde el panel: el filtro de campos no lo
enseña, y el enlace del panel no aparece.

## Los criterios de aceptación de cada artículo

Todos medibles, y todos comprobables por alguien que no sea quien lo escribió.

| # | Criterio | Cómo se comprueba |
|---|---|---|
| 1 | ≥ 800 palabras | `python3 scripts/wiki/contar-palabras.py src/content/wiki/<slug>.md` |
| 2 | Un solo `<h1>`, y el `<h1>` es el título del frontmatter | `npm run verify:rutas` |
| 3 | `## Qué puede salir mal` existe y tiene casos reales de las fuentes | Revisión del revisor |
| 4 | Si su campo es opcional en `ProjectMetadata`, tiene sección de «por qué puede faltar» | `npm run verify:wiki` |
| 5 | Toda cifra técnica aparece también en `wiki/cooked/` | Revisión del revisor |
| 6 | Toda URL de `sources` está en `wiki/raw/` con ese mismo `url` | Revisión del revisor |
| 7 | Sin enlaces a páginas que no existen: `[[…]]` para las futuras | `npm run verify:wiki` |
| 8 | Su entrada en `wiki-campos.ts` apunta a un artículo que declara ese `campo` | `npm run verify:wiki` |
| 9 | El revisor da **APROBADO** | `wiki/reviews/` |
| 10 | Las cuatro verificaciones siguen verde | `verify:layout`, `verify:teclado`, `verify:rutas`, `verify:wiki` |
| 11 | `python3 scripts/wiki/idiomacheck.py` limpio sobre el artículo | El control |

El 9 es el único que no se puede automatizar, y por eso el 10 va después: un artículo
puede pasar todo lo medible y aun así no ser approved.

## Advertencia: por qué van en lotes de dos o tres

**Publicar nueve artículos generados de golpe es exactamente el patrón que la
revisión de contenido de AdSense marca como contenido a escala.** No porque sean
falsos —cada uno tiene sus fuentes y su revisión— sino porque nueve textos que
aparecen el mismo día, con la misma estructura, la misma longitud y la misma voz, se
leen como producción en serie. La revisión de calidad no mira sólo si una página es
cierta: mira si el sitio tiene algo que contar.

Y aquí hay un riesgo concreto que no es teórico: **el pipeline está diseñado para
producir artículos que suenan igual**, y es lo que hace bien. Redactor, revisor,
cocinero: los cuatro están escritos para que la salida sea homogénea. Esa
homogeneidad es una virtud para un artículo y un problema para nueve el mismo día.

La regla del plan:

- **Un lote de dos o tres.** Entre revisado y revisado, un día o más.
- **El primero del lote se escribe y se revisa entero antes de tocar el segundo.**
  Si el revisor lo rechaza dos veces, el lote se para y se mira qué falla en el
  pipeline, no en el artículo.
- **Si el primero no convence, no se genera el segundo.** No «se corrige después»:
  un artículo que no convence es información sobre el pipeline, y esa información se
  pierde si se sigue adelante.
- **Los lotes no se publican el mismo día.** El orden del wiki se escribe a mano y
  se va rellenando.

Con eso, diez artículos tardan semanas y se ven como lo que son: diez cosas que
alguien escribió con fuentes encima.

## Lo que este plan no dice

- **Cuándo se escribe cada lote.** Esto es qué y en qué orden, no cuándo.
- **Nada de imágenes.** El redactor no las trae y el renderizador no las pinta. Si
  algún día hacen falta, es otro formato y otra decisión.
- **Que las cifras de la tabla de Bambu basten para escribir los nueve.** Son
  verificadas y legibles, pero un artículo que se apoya en la tabla de un
  fabricante y no en la de otro es un artículo con una fuente. El contraste entre
  fabricantes sigue siendo trabajo del recolector.
