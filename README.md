# wiiki-3d

## Estado actual: la clasificación funciona en modo simulado

**La API de Jev es de pago y la cuenta de TypeSafe AI que usa este proyecto está en $0.00 de
saldo.** Por eso su API rechaza la key con `401 {"code":-1,"message":"Invalid or missing Jev API key"}`.
No es un fallo del código ni del Worker de Cloudflare: el secret `JEV_API_KEY` sigue configurado
en el Worker y el proxy reenvía la petición correctamente.

Mientras tanto, la app funciona con datos simulados, sin tocar la red:

```bash
# .env
VITE_JEV_USE_MOCK=true
```

Con ese flag, `classifyWithJev` (`src/services/JevService.ts`) usa una heurística local en lugar de
llamar a Jev, y el Worker queda sin usar. La heurística no es una predicción de Jev: es una
estimación declarada en el propio cliente, pensada para que el panel de análisis se pueda seguir
desarrollando y demostrar.

### Cómo volver a la API real

1. Cargar crédito en la cuenta de TypeSafe AI.
2. Poner `VITE_JEV_USE_MOCK=false` en `.env`.
3. Reiniciar `npm run dev` (Vite solo lee el `.env` al arrancar).

Ojo al invertir el flag: se compara contra la cadena exacta `"true"`, porque en Vite las variables
llegan como texto y `"false"` sería truthy. Un `VITE_JEV_USE_MOCK=0` dejaría activa la ruta real.

### El contrato de la respuesta de Jev

Viene de la documentación de `https://www.jevai.org/docs`, **no** de una captura real.

**Confirmado** (por documentación y por el comportamiento del playground):

- La envoltura es `{ code, message, data }` y **`code 0` es el único código de éxito**. `code: -1` es
  lo que Jev devuelve en todos sus errores de validación.
- Los resultados de cada pregunta van en `data.answers`, indexados por el ID que se envió.
- `choice` devuelve `choice` + `probabilities` + `confidence`.
- `score` devuelve `score` + `probabilities` + `legend` opcional. **El score es 0-based**: el
  playground lo dice al construir una pregunta de score ("Fill in 2–10 levels, ordered low to high.
  Scores start at 0"), así que el índice más bajo es 0 y el más alto es `levels - 1`. No es una
  suposición y el código lo trata así.
- `noul` devuelve la probabilidad de «sí» entre 0 y 1.
- Las opciones de un `choice` y los niveles de un `score` van en **`criteria`**, y la forma cambia
  según el tipo: un **objeto** indexado por ID para `choice`, un **array** de etiquetas ordenadas
  para `score`. `noul` no lleva `criteria`.

**Sin verificar** (lo único que queda pendiente de verdad):

- No se ha observado ninguna respuesta `200` real: la cuenta está sin crédito y la API rechaza la
  key antes incluso de validar el payload (un 401 arranca antes que un 400). La forma exacta del
  `data` de éxito viene de la doc, no de una captura. Si al conectar de verdad el parseo falla, es
  aquí donde hay que ajustar, y `toClassification` es el único sitio que hay que tocar **mientras
  las respuestas de Jev sean completas**. Si resulta que admite respuestas parciales, hay que tocar
  además `JevClassification` (`src/services/types.ts`) y `AnalysisPanel.tsx`, que ya sabe pintar
  «—» para un dato ausente.
- Qué `model` usar. La documentación solo admite identificadores de Jev, como `typesafe-ai/jev`.

### Ante la duda, el parseo falla; nunca rellena

`parseJevResponse` exige `code === 0`, exige que estén las tres respuestas y no admite lecturas
alternativas: no busca campos por nombre en la raíz de `data`. Si falta una respuesta, si llega una
etiqueta de riesgo que no reconoce, si un score cae fuera de rango o si una probabilidad se sale de
`[0, 1]`, lanza un error en vez de devolver un valor por defecto.

La razón es que el panel pinta esos campos con la misma autoridad sea cual sea su origen: un
"riesgo de warping: 0 %" o un "Moderado" inventados aparecerían como si fueran mediciones, sin
ninguna marca que los delate, y un diagnóstico que miente es peor que un diagnóstico que no sale.

La solución de fondo sería distinguir "no medido" de cero en el tipo (`JevClassification` admitiendo
`undefined`), pero requiere saber si Jev puede devolver respuestas parciales, y eso no se sabrá
hasta ver un `200` real. Está anotado en el propio `JevClassification`, en `src/services/types.ts`,
que es donde hay que ir para aflojarlo, no implementada.

---

# Verificar el layout

Los valores del layout responsivo se eligieron midiendo el DOM en un navegador
real, no leyendo el CSS. Los scripts que lo hacen están en `scripts/verify/` y
se documentan en [`scripts/verify/README.md`](scripts/verify/README.md).

```bash
npm run build            # los scripts miden dist/, no el código fuente
npm run verify:layout    # 29 viewports x 3 estados, con aserciones
npm run verify:teclado   # ¿las acciones son alcanzables con teclado?
npm run verify:rutas     # las cuatro rutas x los cuatro tramos de ancho
```

Los tres salen con código 1 si algo falla, así que valen como paso de CI.
Necesitan el Chromium de Playwright (`npx playwright install chromium`) y las
librerías de sistema que él implica; si tu imagen no las trae, el README de
`scripts/verify/` explica cómo resolverlo sin `sudo`.

Si tocas `src/components/Viewer3D.tsx`, mira `modelPixels()` en
`scripts/verify/probe.mjs`: replica su aritmética de encuadre, y si no se
actualiza a la vez, el barrido comparará números viejos sin avisar.

## Herramientas de apoyo

Las skills de UX que se usaron para el layout (patrones de navegación,
responsive, accesibilidad) vienen de `ux-toolkit` y **no se versionan**. Para
recuperarlas en otra máquina:

```bash
npx ux-toolkit install --project
```

Se ignoran `.opencode/skills/`, `.opencode/agents/`, `.opencode/commands/` y
`.opencode/plugins/` por subdirectorio, no el directorio entero, por si algún día
hay config de OpenCode del proyecto ahí que sí deba versionarse.

## El grafo de conocimiento

Hay un [Graphify](https://github.com/Graphify-Labs/graphify) instalado que
construye un grafo del repo en `graphify-out/`. `AGENTS.md` le dice al agente que
lo consulte antes de ir grepeando.

### Instalación

Son tres comandos, y **los tres hacen falta**:

```bash
# 1. El CLI. El paquete de PyPI se llama graphifyy con doble y;
#    el binario se llama graphify con una sola. Sin pipx, con uv:
uv tool install graphifyy

# 2. El skill de usuario, en ~/.config/opencode/skills/graphify/.
#    Sin esto el comando /graphify no existe.
graphify install --platform opencode

# 3. Construir el grafo
graphify . --project --code-only
```

El paso 2 no es opcional aunque parezca redundante. `graphify opencode install`
es otro comando, y sólo escribe `AGENTS.md` y el plugin: **no instala el skill**.
Verificado en la 0.9.74.

### El plugin no se instala, y es una decisión

Graphify además intenta instalar un plugin en `.opencode/plugins/graphify.js`.
**No funciona, y no se versiona.**

Está escrito con la API de plugins de OpenCode v1: exporta una función que
devuelve un objeto con `"tool.execute.before"`. OpenCode 2.0.22 lo carga, falla y
lo registra como aviso en cada arranque:

```
message="failed to load plugin" target=…/.opencode/plugins/graphify.js
cause=PluginModule.LoadError: Plugin must export a default definition with an id
 and an effect or setup function.
```

Lo que hace ese plugin, si funcionara, es inyectar un `echo "[graphify] knowledge
graph at…"` en el primer comando de shell de la sesión. Es un recordatorio, no una
consulta: no lee el grafo, no responde preguntas y no dispara el skill. La
integración funciona por `AGENTS.md` y por el skill, y está comprobada: en la
transcripción de una sesión real, las cuatro primeras llamadas del agente fueron al
grafo antes de tocar ningún fichero.

Por eso:

- `.opencode/plugins/` está en el `.gitignore`.
- `.opencode/opencode.json` **no se versiona**, porque su única clave era `plugin`.
  Versionar el registro de un plugin que no existe sólo daría un aviso más en cada
  arranque.
- `AGENTS.md` **sí se versiona**, porque es lo que hace que la integración funcione.

Si algún día hace falta el recordatorio automático, portarlo son quince líneas
(`Plugin.define`, `ctx.tool.hook`, y la clave `plugin` → `plugins`) más una
dependencia de `@opencode/plugin` que hay que revisar con cada versión de OpenCode.

### Qué cubre y qué no

`--code-only` indexa los 39 ficheros de código con el AST local, sin clave de API.
Sin esa bandera, Graphify pide una clave (`GEMINI_API_KEY`, `ANTHROPIC_API_KEY`,
`OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `MOONSHOT_API_KEY`) para extraer los ficheros
no-código, y aquí no hay ninguna.

Lo que **no** cubre, y conviene saberlo antes de confiar en una respuesta:

- **Ni el CSS ni el Markdown.** Los extractores que trae son de C, C++, C#, Go,
  Java, JavaScript, TypeScript, Python, Ruby, Rust, PHP, Scala, Swift, Zig, Lua,
  Julia, PowerShell, Groovy, Elixir, Fortran, Objective-C, Verilog, JSON y
  Bash. **No hay extractor de CSS, HTML ni Markdown.** `App.css` e `index.css`
  no son nodos del grafo, así que ninguna pregunta sobre estilos se puede
  responder con él.
- **Las relaciones escritas en prosa, no en el código.** Hay **0 aristas** entre
  `src/` y `scripts/verify/`, porque la relación entre `Viewer3D.tsx` y
  `probe.mjs` es una duplicación a mano documentada en el README, no un import.
  El grafo ve los dos símbolos con fichero y línea exactos
  (`frameCamera()` en L248, `modelPixels()` en L148), pero no que sean el mismo
  cálculo. Eso se sigue leyendo el README.
- **El `query` en lenguaje natural es poco fiable.** En las pruebas de este
  repo, "¿Qué ficheros dependen de App.css?" emparejó con la palabra
  `dependencies` de `package.json` y devolvió 54 nodos de ruido JSON.
  `graphify explain "<símbolo>"` sí es preciso y da las conexiones con
  fichero:línea.

### Frescura

**El grafo es una foto, y se caduca.** Es un artefacto más del árbol de trabajo y
no se entera de los commits. Si cambia el código y no se reconstruye, el agente
toma decisiones sobre una foto vieja, y no avisa: los comandos no fallan, devuelven
una respuesta que era correcta antes.

```bash
graphify update .          # tras cambiar código, antes de dar por buena una respuesta
graphify cluster-only .    # si cambia el informe y quieres reetiquetar comunidades
```

Con 23 comunidades y sin clave de API, las etiquetas salen como `Community N`
— es lo que dice `graphify cluster-only .`: *"no LLM backend configured; keeping
Community N placeholders"*. Se pueden leer, pero no describen nada; el grafo sigue
siendo útil por los nodos y las aristas.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
