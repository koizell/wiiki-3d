## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## El grafo del conocimiento: LLM Wiki

Este proyecto tiene un segundo grafo, distinto del de `graphify`: el de la Wiki 3D,
que se construye a partir de fuentes de internet y no de código. Las dos cosas se
llaman grafo y no tienen nada que ver.

Es el patrón de Karpathy: **en vez de recuperar fragmentos en tiempo de consulta,
el modelo compila el conocimiento una vez y lo mantiene**. No hay base de datos
vectorial, ni búsqueda semántica, ni servidor. Hay Markdown y cuatro agentes.

### Las tres capas, y su frontera

| Capa | Dónde | Quién escribe | Regla |
|---|---|---|---|
| **Fuentes crudas** | `wiki/raw/` | `recolector` | **Inmutable.** Un fichero escrito ahí no se toca jamás. |
| **Material cocinado** | `wiki/cooked/` | `cocinero` | Las afirmaciones ya extraídas, cada una con su fuente. |
| **La wiki** | `src/content/wiki/` | `redactor` | Los artículos que se leen, con frontmatter. |

La frontera es lo importante: **el redactor no lee `wiki/raw/`, lee `wiki/cooked/`.**
No escribe un dato que no esté cocinado, porque el cocinero es el que decide qué
está respaldado. Si el redactor pudiera llegar a las fuentes crudas, se saltaría el
filtro, y el filtro es la mitad del valor del patrón.

### Las tres operaciones

**Ingest.** Añadir una fuente es el ciclo completo: `recolector` la trae a
`wiki/raw/`, `cocinero` la procesa en `wiki/cooked/`, `redactor` escribe en
`src/content/wiki/`, y `revisor` verifica. Si el revisor rechaza, el artículo vuelve
al redactor con las notas; no se escribe otro desde cero.

**Query.** Para una pregunta sobre impresión 3D, primero `wiki/cooked/`, después
`src/content/wiki/`, y sólo si no hay nada `wiki/raw/`. Al revés que con `graphify`.

**Lint.** Cada cierto tiempo, el `revisor` recorre la wiki buscando afirmaciones sin
respaldo, contradicciones, páginas huérfanas y enlaces cruzados rotos. Es la misma
comprobación que hace sobre un artículo, pero sobre toda la wiki.

**Revisión.** Un tema ya publicado se vuelve a pasar por el ciclo entero. No es un
parche: es el mismo `Ingest` empezando por el `cocinero`, con las fuentes nuevas ya en
`wiki/raw/`, y termina con el `revisor` decidiendo otra vez.

Esto es una capacidad del diseño, no un remedio, y por dos razones:

- **`wiki/raw/` es la única capa inmutable.** Al re-procesar, el cocinero escribe
  **sobre** el material cocinado existente: conserva los apartados que siguen valiendo
  y corrige los que no. El redactor hace lo mismo sobre el artículo. Nadie empieza de
  cero, porque empezar de cero tiraría trabajo que sigue siendo cierto.
- **Los informes se acumulan y no se sobrescriben.** `wiki/reviews/` guarda una vuelta
  por número, con el motivo del rechazo. Un artículo que necesitó tres revisiones lo
  dice, y eso es información: un tema que se rechaza dos veces seguidas tiene un
  problema en las fuentes o en el material cocinado, y volver a pedir un cuarto intento
  sin mirar eso es perder el trabajo.

La razón por la que hace falta la vuelta es un fallo que la vuelta anterior no podía
ver: **el artículo y el material cocinado coinciden por construcción**, así que
compararlos sólo detecta que el redactor se inventara algo por su cuenta. Un error que
nace en el material cocinado aparece en las dos capas a la vez y ninguna revisión lo
ve. Para eso hace falta volver a mirar contra `wiki/raw/`, que es donde está la
verdad. En `warping-pla` aparecieron así cuatro afirmaciones falsas —entre ellas una
cita entrecomillada que no estaba en ninguna fuente— después de dos revisiones
aprobadas.

### Los cuatro agentes

Están en `.opencode/agents/`, y se versionan. Cada uno recibe **rutas de ficheros,
nunca el historial de conversación**, y devuelve **rutas de ficheros**, nunca
texto para las personas.

| Agente | Escribe | Devuelve |
|---|---|---|
| `recolector` | `wiki/raw/` | Rutas, y una línea por fuente |
| `cocinero` | `wiki/cooked/` | Rutas |
| `redactor` | `src/content/wiki/` | La ruta y el contador de palabras |
| `revisor` | Un informe | `APROBADO` o `RECHAZADO` con notas |

Se delegan con la herramienta `task`. No hay orquestación externa: el sistema
nativo de subagentes basta y no añade dependencias.

### Lo que no puede pasar

- **Un artículo sin fuentes reales.** Cada dato técnico lleva su cita, y la cita
  apunta a una URL que está en `wiki/raw/`. Sin eso el sitio no pasa revisión de
  contenido, y el patrón no sirve de nada.
- **Relleno.** Un párrafo sin ningún dato concreto sobra, por bien escrito que esté.
  La longitud es un mínimo de 800 palabras, no un objetivo a alcanzar.
- **Una contradicción resuelta por el redactor.** Si dos fuentes discrepan, el
  artículo explica el matiz. Elegir una y callar las demás es el fallo más grave de
  los tres.
- **Tocar `wiki/raw/`.** Ni para corregir una errata. Si el dato estaba mal, se
  escribe un fichero nuevo.
