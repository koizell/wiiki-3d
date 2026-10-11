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
| **Las guías** | `src/content/guias/<slug>.ts` | `redactor` | Un módulo tipado por tema. **No es un artículo.** |

La frontera es lo importante: **el redactor no lee `wiki/raw/`, lee `wiki/cooked/`.**
No escribe un dato que no esté cocinado, porque el cocinero es el que decide qué
está respaldado. Si el redactor pudiera llegar a las fuentes crudas, se saltaría el
filtro, y el filtro es la mitad del valor del patrón.

### Por qué la tercera capa es TypeScript y no Markdown

Porque una guía **calcula**. Su última etapa es una lista de acciones que depende de
lo que quien lee ha declarado, y eso no se puede escribir como prosa: en Markdown, «si
usas la Cool Plate, sube la cama a 35–45 °C» son tres párrafos que hay que leer los
tres para saber cuál es el tuyo. En un módulo de TypeScript es una línea con una
condición, y el compilador avisa si la condición apunta a una variable que no existe.

El contrato está en `src/content/guias/tipos.ts` y **tiene cuatro etapas, en este
orden**: `diferencial` —las preguntas que distinguen este problema del de al lado, con
salida a la otra guía—, `variables` —lo que declara quien lee—, `conocimiento` —las
tarjetas que sus variables hacen pertinentes— y `reglas` —las acciones, calculadas—.

El motivo por el que una guía **deja de ser un artículo largo** es que su contenido
es casi todo estructura: «estas cuatro cosas no son warping», «estas dos fuentes se
contradicen en X», «esto no lo resuelve la capa Y». En un muro de texto esa estructura
desaparece; en una tarjeta es su forma natural.

El plan completo está en [`docs/plan-guias.md`](docs/plan-guias.md).

### Las tres operaciones

**Ingest.** Añadir una fuente es el ciclo completo: `recolector` la trae a
`wiki/raw/`, `cocinero` la procesa en `wiki/cooked/`, `redactor` escribe en
`src/content/guias/<slug>.ts`, y `revisor` verifica. Si el revisor rechaza, la guía
vuelve al redactor con las notas; no se escribe otra desde cero.

**Query.** Para una pregunta sobre impresión 3D, primero `wiki/cooked/`, después
`src/content/guias/`, y sólo si no hay nada `wiki/raw/`. Al revés que con `graphify`.

**Lint.** Cada cierto tiempo, el `revisor` recorre la wiki buscando afirmaciones sin
respaldo, contradicciones, páginas huérfanas y enlaces cruzados rotos. Es la misma
comprobación que hace sobre un artículo, pero sobre toda la wiki.

**Revisión.** Un tema ya publicado se vuelve a pasar por el ciclo entero. No es un
parche: es el mismo `Ingest` empezando por el `cocinero`, con las fuentes nuevas ya en
`wiki/raw/`, y termina con el `revisor` decidiendo otra vez.

Esto es una capacidad del diseño, no un remedio, y por dos razones:

- **`wiki/raw/` es la única capa inmutable.** Al re-procesar, el cocinero escribe
  **sobre** el material cocinado existente: conserva los apartados que siguen valiendo
  y corrige los que no. El redactor hace lo mismo sobre la guía. Nadie empieza de
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
| `redactor` | `src/content/guias/<slug>.ts` | La ruta y el número de reglas, tarjetas y variables |
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

  Y aquí hay que ser exacto sobre **qué sostiene esa regla**, porque no es lo que
  parece. **No son las herramientas.** Se probó la configuración fina que debería
  conceder `write` y denegar `edit` por separado:

  ```yaml
  permission:
    edit: { "write": allow, "edit": deny }
  ```

  y **el `deny` no se aplicó**: el cocinero editó un fichero sin ninguna
  denegación, con la misma naturalidad con la que escribe uno nuevo. La forma
  cortafija `bash: deny` sí se respeta, así que el fallo es de la forma anidada, no
  del sistema de permisos. Y como la clave `edit` protege `write`, `edit` y
  `apply_patch` a la vez, **no hay ninguna configuración que conceda escribir sin
  poder reescribir**. Los cuatro agentes van con `edit: allow`, y la diferencia la
  hace el prompt de cada uno.

  Lo que sostiene la inmutabilidad son dos cosas y ninguna es una herramienta: **el
  prompt** de cada agente, que dice qué no toca, y **`git diff wiki/raw/`**, que hay
  que mirar antes de cada commit. Si alguna vez un `git status` muestra un fichero de
  `wiki/raw/` modificado, la causa es un agente que desobedeció, no un fallo de la
  configuración. No hay nada debajo que la sujete.

## Generación de imágenes para la wiki

Hay dos herramientas, y son complementarias. Ninguna clave va al bundle: viven en la
configuración de cada herramienta, no en el repositorio.

| | Herramienta | De dónde sale |
|---|---|---|
| Diagramas, ilustraciones, editar | `nanobanana.*` | Plugin local, `~/.opencode/plugins/nanobanana-v2/` |
| Portadas, iconos, variantes responsive | `cloudflare-image.*` | MCP de Workers AI, `flux-1-schnell` por defecto |

**Los dos plugins se llaman `generate_image` y `edit_image`.** Por eso el de
Nano Banana va con namespace: `nanobanana.generate_image` y
`cloudflare-image.generate_image` son herramientas distintas. Sin el namespace una
pisa a la otra.

### El prefijo de estilo, y por qué lleva una palabra en inglés

Toda imagen empieza por este prefijo, delante del prompt:

> Ilustración técnica estilo flat design, paleta limitada a #0f1115, #161a20,
> #2563eb, #60a5fa, #e8ecf1. Líneas limpias, sin degradados, fondo oscuro. Estilo de
> manual técnico moderno, no realista. Sin texto en la imagen. High detail.

**`High detail` está ahí a propósito, y no es estilo.** El MCP de Cloudflare
reescribe cualquier prompt que no tenga un marcador de calidad: le añade
`Ultra-wide cinematic … professional photography, premium lighting, photorealistic,
8K quality, marketing photography`. Sin esa palabra, las dos instrucciones se
contradicen —«sin degradados» contra `premium lighting`, «no realista» contra
`photorealistic`— y gana la segunda, porque va al final. Los ocho marcadores que
libran al prompt están en `dist/utils/promptEnhance.js`; `high detail` es uno de
ellos. **Nano Banana no reescribe nada**: pasa el prompt tal cual, así que la palabra
no estorba y el prefijo sirve para las dos.

### Qué herramienta para qué

| Necesidad | Herramienta | Cómo |
|---|---|---|
| Portada de artículo | `cloudflare-image.generate_image` | preset `hero` |
| Variantes responsive | `cloudflare-image.generate_image` | preset `banner` — genera desktop, tablet y mobile |
| Ilustración de concepto | `cloudflare-image.generate_image` | preset `square` |
| Icono de sección | `cloudflare-image.generate_image` | preset `thumbnail` |
| Diagrama técnico | `nanobanana.generate_image` | con la estructura descrita en el prompt |
| Editar una imagen | `nanobanana.edit_image` | — |

**`cloudflare-image.edit_image` no hace nada.** Los cuatro modelos de Cloudflare
declaran `editing: no` y la herramienta responde que no aceptan imagen de entrada.
Para editar, `nanobanana.edit_image`.

### Los diagramas con `format: "mermaid"` son de mentira

`nanobanana.generate_architecture_diagram` y `generate_sequence_diagram` aceptan un
`format`. Con `png`, el default, llaman al modelo y sale una imagen de verdad. Con
`"mermaid"`, **no llaman a nada**: devuelven una plantilla fija
(`A[Component A] --> B[Component B] --> C[Component C]`) con la descripción pegada en
un comentario `%% Customize based on:`, y responden `success: true`. Un diagrama de
esos en `public/wiki/` es un error que parece un acierto. **Para diagramas, `png`.**

### Dónde van, y qué no va con ellas

`public/wiki/<slug>/`, una carpeta por artículo, referenciadas desde el Markdown con
rutas relativas. En `public/` y no en el bundle: una imagen en `src/` entra en el
chunk inicial y el visitante que nunca abre la wiki la paga igual.

Cada imagen de Cloudflare lleva su `.json` sidecar con el prompt original. Es lo que
permite saber después qué se pidió, que es la mitad del valor de generarlas.

Y tres reglas:

- **Sin texto en las imágenes.** Si un diagrama necesita etiquetas, se compone en
  HTML/CSS encima. Los modelos escriben mal el texto y no hay forma de corregirlo
  después.
- **Las cifras técnicas no salen de una imagen.** Una imagen no es una fuente: no
  entra en `sources` ni respalda ninguna afirmación del artículo. Un diagrama
  ilustra, no demuestra.
- **Antes de integrar una imagen, mirar el ancho de lectura.** Una imagen más ancha
  que la columna rompe los 45–75 caracteres. Va en `max-width: 100%`.
