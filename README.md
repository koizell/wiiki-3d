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
```

`verify:layout` sale con código 1 si el layout se rompe, así que vale como paso
de CI. Necesita el Chromium de Playwright (`npx playwright install chromium`) y
las librerías de sistema que él imply; si tu imagen no las trae, el README de
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

Se ignoran `.opencode/skills/`, `.opencode/agents/` y `.opencode/commands/` por
subdirectorio, no el directorio entero, por si algún día hay config de OpenCode
del proyecto que sí deba versionarse.

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
