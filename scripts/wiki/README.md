# El pipeline de la Wiki 3D

Cuatro agentes que convierten internet en artículos verificados. Sin backend, sin
base de datos vectorial, sin claves de API: Markdown y un LLM.

## Las tres capas

| Capa | Dónde | Quién escribe | Regla |
|---|---|---|---|
| Fuentes crudas | `wiki/raw/` | `recolector` | **Inmutable.** Un fichero escrito ahí no se toca jamás. |
| Material cocinado | `wiki/cooked/` | `cocinero` | Las afirmaciones extraídas, cada una con su fuente. |
| Las guías | `src/content/guias/<slug>.ts` | `redactor` | Un módulo tipado por tema. No es un artículo. |
| Los informes | `wiki/reviews/` | `revisor` | `APROBADO` o `RECHAZADO` con notas. |

**La frontera que importa:** el redactor no lee `wiki/raw/`, lee `wiki/cooked/`. No
es una preferencia de orden, es lo que evita que la wiki sea un vertedero: el
cocinero decide qué está respaldado, y si el redactor pudiera llegar a las fuentes
crudas se saltaría ese filtro.

## Los cuatro agentes

En `.opencode/agents/`, y versionados.

| Agente | Escribe | Devuelve |
|---|---|---|
| `recolector` | `wiki/raw/` | Rutas, y una línea por fuente |
| `cocinero` | `wiki/cooked/` | Rutas |
| `redactor` | `src/content/guias/<slug>.ts` | La ruta y el número de reglas, tarjetas y variables |
| `revisor` | `wiki/reviews/` | Veredicto con notas |

Cada uno recibe **rutas de ficheros, nunca el historial de conversación**, y
devuelve **rutas de ficheros, nunca texto para las personas**.

## Cómo se ejecuta

**Los agentes no se registran hasta que se reinicia la sesión.** El registro de
subagentes se construye al arrancar, así que un agente creado durante la sesión no
existe para `task` hasta la siguiente. Si creas un agente y no lo ves en la lista,
reinicia.

Con los cuatro registrados, un ciclo es:

```
task(recolector,  "el tema está en /ruta/al/tema.md")
task(cocinero,   "las fuentes están en estas rutas")
task(redactor,   "el material cocinado está en esta ruta")
task(revisor,    "revisa el artículo contra el material cocinado")
```

Si el revisor rechaza, el artículo vuelve al redactor **con las notas**. No se
escribe otro desde cero.

## Las tres operaciones

**Ingest.** El ciclo completo de arriba.

**Query.** Para una pregunta sobre impresión 3D: primero `wiki/cooked/`, después
`src/content/guias/`, y sólo si no hay nada, `wiki/raw/`. Al revés que con
`graphify`.

**Lint.** El mismo `revisor`, pero sobre la wiki entera, buscando afirmaciones sin
respaldo, contradicciones, páginas huérfanas y enlaces cruzados rotos.

## Lo que no puede pasar

- **Un artículo sin fuentes reales.** Cada dato técnico lleva su cita, y la cita
  apunta a una URL que está en `wiki/raw/`.
- **Relleno.** Un párrafo sin ningún dato concreto sobra, por bien escrito que esté.
  Los 800 palabras son un mínimo, no un objetivo a alcanzar.
- **Una contradicción resuelta por el redactor.** Si dos fuentes discrepan, el
  artículo explica el matiz. Elegir una y callar las demás es el fallo más grave.
- **Tocar `wiki/raw/`.** Ni para corregir una errata. Si el dato estaba mal, se
  escribe un fichero nuevo.

## El contrato del frontmatter

Lo que la vista lee de cada artículo, y lo que por tanto tiene que escribir el
redactor. Completo en `.opencode/agents/redactor.md`; aquí sólo la lista:

| Clave | Para qué |
|---|---|
| `title` | Título del artículo, y el `<h1>` de la pantalla |
| `description` | Una frase para el índice y la búsqueda. Sin ella se usa la primera del cuerpo, con la negrita puesta |
| `slug` | El nombre del fichero sin `.md` |
| `date`, `updated` | Lo que pinta el pie del artículo |
| `sources` | Las URLs, y **todas** tienen que estar en `wiki/raw/` |
| `tags` | Palabras sueltas para la búsqueda |
| `campo` | **A qué campo del panel de análisis explica este artículo** |

### `campo` es lo que hace distinta esta wiki

Cada artículo se ata a un campo de `ProjectMetadata` o `JevClassification` —los
nombres están en `src/services/types.ts`, no inventados— y el panel pone un enlace
al artículo que explica ese dato.

Es la diferencia entre una wiki de impresión 3D y esta: aquí el artículo de warping
no es un documento que se encuentra buscando «warping», es la explicación del 35 %
que el panel acaba de enseñar.

Hay un segundo sitio con esa correspondencia: `src/lib/wiki-campos.ts`. Está escrito
a mano y **no puede derivarse del contenido** sin meter todos los artículos en el
chunk inicial de la aplicación. `scripts/verify/wiki.mjs` lo comprueba contra el
frontmatter real, así que si se desfasan, rompe la verificación en vez de dejar un
enlace roto en el panel.

### Los enlaces cruzados

`[[slug|texto visible]]` en el Markdown. Si la página existe, es un enlace; si no,
sale el texto con una marca punteada. Los artículos se escriben en cualquier orden
y el enlace se enciende solo cuando la otra página aparece.

## Medir una guía

Ya no se cuentan palabras, porque una guía no tiene extensión: tiene **cuántas reglas,
cuántas tarjetas y cuántas variables**, y si cada una de ellas hace algo.

```bash
npm run verify:guias
```

Son 49 comprobaciones sobre el motor y las guías, sin navegador. Devuelven en el
mensaje el número que hay que mirar, que es la forma de detectar lo que una revisión
manual no ve: una condición que apunta a una variable inexistente, un valor de
condición imposible, una regla sin fuente, una acción con cifras y sin `valor`, un
enlace a una guía que no existe, y **una variable decorativa** —se pregunta algo que no
cambia nada en ninguna combinación—.

Las dos últimas se anotan aparte, porque son las que más veces han saltsado:

- **Una variable decorativa** hace que quien marca la casilla vea que la lista no se
  mueve, y piense que la guía no reacciona. Ha encontrado variables muertas en dos
  borradores.
- **Un enlace a una guía inexistente** es un 404 en una página que ha pasado revisión.
  Antes el formato viejo lo resolvía con un subrayado discontinuo y texto sin enlace;
  ahora, si la otra guía no está escrita, el enlace **no se pone** y la mención va en
  `fueraDeAlcance` como texto. La justificación del método está en el propio script
reproducible.

## Comprobar lo que se ha escrito

```bash
npm run verify:wiki
```

Son 77 comprobaciones en el navegador: la búsqueda, la tabla de contenidos, el ancho
de línea medido en caracteres reales, las animaciones con
`prefers-reduced-motion`, los enlaces cruzados que no existen, y que la tabla de
campos apunta a artículos que existen y declaran ese campo.

Es el puente entre el pipeline y la vista. Un artículo puede estar perfectamente
cocinado y aun así tener una cita sin fuente, un enlace a una página que no existe
o un `campo` mal escrito: eso lo ve el revisor, y lo ve el navegador.

## Control de idioma

```bash
python3 scripts/wiki/idiomacheck.py <fichero> [...]
python3 scripts/wiki/idiomacheck.py --mensaje <fichero>
```

Dos capas:

1. **Alfabetos que no tienen nada que buscar aquí.** Rango Unicode con `\x{...}`.
2. **Una lista de regresión** de palabras que de verdad se han colado en este
   repo: `Inbound`, `raises`, `Symptoms`, `situation`, `pièces`, `prayed`, y
   fragmentos en chino y ruso.

La segunda capa no intenta detectar inglés en general, y a propósito: `has` y `esta`
son también español, y una lista amplia producía tantos falsos positivos que
dejaba de servir. Cada entrada de la lista es un fallo que ocurrió de verdad.

Dos reglas que evitan los falsos positivos habituales:

- **Una palabra entre acentos graves, o dentro de un enlace, es código o cita, no
  prosa.** Se quita y se vuelve a mirar. Eso cubre las claves del frontmatter, las
  fuentes en inglés citadas textualmente, y la lista de esta propia sección, que
  menciona palabras prohibidas.
- **No mira `wiki/raw/` en la segunda capa**: es la fuente cruda, en su idioma
  original por definición, y ahí sólo hay texto citado.

## Lo que este repositorio no puede traer

**Reddit.** Devuelve la cáscara vacía: ni `reddit.com` ni `old.reddit.com` dan el
texto de los hilos. Está comprobado, no supuesto. Por eso dos de las cinco fuentes
del primer artículo son hilos del foro de Prusa.

**Un servidor MCP de scraping.** Los dos candidatos existen en PyPI —`smart-webfetch-mcp`
0.3.0 y `wafle-scraper` 0.1.0— pero no hacen falta: las herramientas integradas
`websearch` y `webfetch` devuelven el contenido completo de la wiki de Bambu Lab y
de los hilos del foro de Prusa, con fechas y autores. El único hueco que cubren
sería Reddit, que es la fuente más difícil de citar y la menos útil para un
artículo que tiene que pasar revisión de contenido.