# El pipeline de la Wiki 3D

Cuatro agentes que convierten internet en artículos verificados. Sin backend, sin
base de datos vectorial, sin claves de API: Markdown y un LLM.

## Las tres capas

| Capa | Dónde | Quién escribe | Regla |
|---|---|---|---|
| Fuentes crudas | `wiki/raw/` | `recolector` | **Inmutable.** Un fichero escrito ahí no se toca jamás. |
| Material cocinado | `wiki/cooked/` | `cocinero` | Las afirmaciones extraídas, cada una con su fuente. |
| La wiki | `src/content/wiki/` | `redactor` | Los artículos, con frontmatter. |
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
| `redactor` | `src/content/wiki/` | La ruta y el contador de palabras |
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
`src/content/wiki/`, y sólo si no hay nada, `wiki/raw/`. Al revés que con
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

## Contar palabras

```bash
python3 scripts/wiki/contar-palabras.py src/content/wiki/<slug>.md
```

El frontmatter no cuenta, porque es configuración. Las URLs de los enlaces tampoco,
porque un enlace no se lee y contarlas inflaría el número en decenas. El método
está escrito en el propio script para que el número que cita el revisor sea
reproducible.

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