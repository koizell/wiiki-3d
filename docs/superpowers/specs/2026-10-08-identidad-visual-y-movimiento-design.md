# Diseño: identidad visual y sistema de movimiento de wiiki-3d

Fecha: 2026-10-08
Estado: propuesto, pendiente de revisión
Origen: sesión de brainstorming con el autor del proyecto

---

## 1 · Contexto y objetivo

El sitio funciona y está verificado, pero su lenguaje visual es el de una
plantilla: tipografía del sistema, sin motivo propio, y animaciones repartidas
por el CSS sin una norma que las gobierne. El objetivo no es «añadir
animaciones», es que el sitio **tenga una identidad reconocible y coherente en
las cuatro rutas** (Inicio, Taller, Wiki 3D, Proyectos) sin que esa identidad
compita con la lectura.

Se descarta explícitamente el objetivo contrario: no se busca impresionar ni
llenar la pantalla de movimiento. La regla que gobierna todo el diseño es que
**el movimiento sólo confirma una acción del usuario**; nada se mueve solo.

## 2 · Decisiones cerradas

| # | Decisión | Valor |
|---|---|---|
| D1 | Carácter visual | Manual técnico / **plano de taller** |
| D2 | Tipografía | **IBM Plex Sans** (texto) + **IBM Plex Mono** (datos), autoalojadas |
| D3 | Movimiento de resultados | **Instrumento**: aparece en su sitio + trazo azul que se dibuja |
| D4 | Movimiento de controles | **Preciso**: 140 ms, `ease-out`, 6 px |
| D5 | Dependencias | Ninguna. CSS nativo + Web Animations API si hiciera falta |
| D6 | Alcance | Identidad completa en **lenguaje** (color, tipo, espacio, movimiento); la **geometría del layout no se mueve** |

D6 es una frontera deliberada: el layout está medido y verificado (`verify:layout`,
29 viewports). La identidad se aplica como piel y movimiento, no como
reestructuración. Tocar la geometría invalidaría esas mediciones.

## 3 · Fundamentos (tokens)

El proyecto **ya tiene** un sistema de tokens en el `:root` de `src/App.css`
(`--bg-dark`, `--bg-panel`, `--border`, `--text-primary`, `--text-secondary`,
`--accent`, `--accent-text`, `--success`, `--warning`, `--danger`), con los
contrastes WCAG razonados en los comentarios. **No se renombra ninguno**: eso
sería churn sin valor. La identidad **extiende** ese `:root` con los tokens que
faltan.

Se añaden, en el mismo `:root`:

```css
/* --- Tipografía --- */
--fuente-texto: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
--fuente-dato: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

/* --- Motivo de plano --- */
--plano-rejilla: #171c26;   /* rejilla de fondo, casi imperceptible */
--plano-paso: 18px;         /* separación de la rejilla */
--plano-linea: var(--border);
--plano-esquina: var(--accent-text);

/* --- Radios (hoy dispersos en el CSS) --- */
--radio-sm: 6px;
--radio-md: 10px;

/* --- Movimiento --- */
--dur-control: 140ms;
--dur-entrada: 160ms;
--dur-resultado: 180ms;
--dur-trazo: 220ms;
--curva-estandar: ease-out;
--curva-plano: cubic-bezier(0.22, 0.7, 0.3, 1);
```

No se introduce una escala tipográfica nueva: los tamaños del CSS actual se
conservan (ver §9, riesgos).

## 4 · Tipografía

- **IBM Plex Sans** 400 y 600 para texto; **IBM Plex Mono** 400 y 500 para datos,
  etiquetas y cifras.
- Autoalojadas en `public/fuentes/`, formato **woff2**, subset latin,
  `font-display: swap`, con `<link rel="preload">` para los dos pesos que se usan
  en la primera pantalla.
- La mono lleva `font-variant-numeric: tabular-nums` en todo dato numérico, para
  que las cifras no cambien de ancho al actualizarse.
- `body` pasa de `'Inter', …` a `var(--fuente-texto)`. La familia `Inter` estaba
  declarada pero **nunca se cargaba**, así que hoy se ve la del sistema: el
  cambio es real, no cosmético.

## 5 · El motivo de plano, y su frontera

**Aparece en:** el lienzo de trabajo (portada, visor, Taller, índice de la Wiki),
las cabeceras de sección y las zonas de acción (subida, visor, resultados).

**No aparece nunca en:** el cuerpo de lectura de las guías. La rejilla detrás de
800 palabras es exactamente la saturación que este diseño existe para evitar. La
frontera es la misma que ya separa `wiki/raw/` de `wiki/cooked/`: una cosa es la
estructura y otra el contenido, y no se mezclan.

Elementos del motivo:

| Elemento | Dónde | Cómo |
|---|---|---|
| Rejilla | Lienzo de trabajo | `background-image` con dos `linear-gradient`, paso `--plano-paso` |
| Marcas de esquina | Zonas de acción | Cuatro `div` con dos bordes, color `--plano-esquina` |
| Numeración `01 ·` | Cabeceras de sección | Componente `<SeccionPlano numero="01">` |
| Cota | Comparar valor con objetivo | Línea con extremos; se reutiliza en la guía y en Taller |

## 6 · Sistema de movimiento

Cuatro primitivas, y ninguna más. Cada una tiene un disparador explícito.

| Primitiva | Disparador | Implementación |
|---|---|---|
| `entrada-ruta` | Navegar a una ruta | Al montar: opacidad 0→1 y 4 px, `--dur-entrada`. Una vez |
| `confirmar` | Subir archivo, calcular coste, marcar variable | El contenido aparece en su sitio (sin desplazamiento) + un trazo azul con `scaleX` que se dibuja. `--dur-resultado` + `--dur-trazo` |
| `control` | `:hover`, `:focus-visible`, `:active` en controles | 140 ms, 6 px, `--curva-estandar` |
| `progreso` | «Analizando…» | El **único** bucle permitido (`panel-pulse` ya existe) |

**Reglas duras, comprobables:**

1. Sin interacción, nada se anima (salvo `progreso`).
2. Sólo se animan `opacity` y `transform`. Ninguna propiedad de layout
   (`width`, `height`, `top`, `left`, `margin`) se anima → CLS 0 por diseño.
3. Con `prefers-reduced-motion: reduce`, todas las primitivas se apagan y **no se
   pierde información**: el contenido queda visible y en su sitio. Es la misma
   regla que ya sigue `DibujoSintoma`, donde el dibujo es informativo y por eso
   no se apaga del todo (§9).
4. La animación nunca retrasa la lectura: el contenido es legible desde el primer
   fotograma aunque la animación no haya terminado.

## 7 · Arquitectura de ficheros

```
src/App.css                  # :root ampliado; el resto del CSS actual, intacto
src/estilos/fuentes.css      # @font-face de Plex Sans y Plex Mono
src/estilos/plano.css        # rejilla, esquinas, numeración, cota
src/estilos/movimiento.css   # keyframes, clases utilitarias, reduced-motion
src/components/SeccionPlano.tsx   # cabecera numerada con marcas de esquina
public/fuentes/*.woff2       # las fuentes autoalojadas
scripts/verify/animacion.mjs # la comprobación nueva
```

Los tres ficheros de `src/estilos/` se importan desde `src/main.tsx`. El motivo de
sacarlos de `App.css` (que ya tiene ~3.800 líneas) es el mismo que el proyecto ya
aplica en el código: un fichero, una responsabilidad. No se mueve nada del CSS
existente; sólo se añade.

Los componentes se animan con clases utilitarias y `data-anima="confirmar"`, no
con keyframes sueltos por componente. Así hay un único sitio donde vive cada
primitiva.

## 8 · Verificación (`scripts/verify/animacion.mjs`)

Un script más de la familia `verify:*`, con Playwright, que sale con código 1 si
algo falla. Comprueba:

1. **`reduced-motion`**: con `emulateMedia({ reducedMotion: 'reduce' })`,
   `document.getAnimations()` no devuelve ninguna animación en curso (salvo las
   que ya estuvieran permitidas y documentadas).
2. **Sin interacción no hay movimiento**: tras cargar y esperar, ninguna
   animación activa salvo `progreso`.
3. **CLS ≈ 0** al cargar y tras cada interacción clave, medido con
   `PerformanceObserver` sobre `layout-shift`.
4. **Contraste**: los tokens de texto (`--text-primary`, `--text-secondary`,
   `--accent-text`, `--warning`, `--danger`) dan ≥ 4,5:1 sobre sus fondos.
5. **`tabular-nums`** presente en los elementos marcados como dato.
6. **Fuentes cargadas**: `document.fonts.check()` para los cuatro pesos, y que la
   carga no cambia el ancho de una línea medida antes y después (sin salto).

## 9 · Riesgos y comprobaciones que no se pueden saltar

- **La tipografía cambia las métricas.** El proyecto midió la línea de lectura
  carácter a carácter (9,47 px) y fijó un suelo de 35 caracteres a 375 px y un
  rango de 45–75 en los demás anchos. IBM Plex Sans **no tiene las mismas
  métricas que la fuente del sistema**, así que esos números hay que
  **volver a medirlos** con la fuente nueva. Si la línea se sale del rango, se
  ajusta el tamaño o la columna; no se da por hecho que sigue igual. `verify:layout`
  y la parte de lectura de `verify:wiki` son la red que lo detecta.
- **FOUT y CLS.** `font-display: swap` puede provocar un salto al cargar. El
  `preload` y la comprobación 6 de §8 existen para cazarlo.
- **El peso del subset.** Dos familias y cuatro pesos pueden pesar más que la
  fuente del sistema. Se subsetea a latin y se sirven sólo los pesos usados.
- **`DibujoSintoma` es informativo.** Sus animaciones no son decoración: explican
  un síntoma. `prefers-reduced-motion` no las elimina, las modera. La
  comprobación 1 de §8 debe respetar esa excepción en vez de exigir cero
  animaciones absoluto.

## 10 · Fuera de alcance

- Cambiar la geometría del layout o los puntos de ruptura.
- Tocar la lógica (`JevService`, `coste.ts`, `ParserService`, `AnalysisContext`).
- Tocar el contenido de las guías (`src/content/guias/*.ts`).
- Añadir dependencias de animación.
- Rediseñar el visor 3D.

## 11 · Criterios de aceptación

1. `npm run verify:animacion` pasa, y **falla** si se quita el bloque
   `reduced-motion`, si se anima una propiedad de layout o si aparece un bucle no
   permitido (comprobado rompiéndolo a propósito, como ya se hizo con la barra
   «Tu archivo»).
2. `npm run verify:layout`, `verify:wiki`, `verify:guias`, `verify:taller`,
   `verify:rutas` y `verify:seo` siguen en verde.
3. Las cuatro rutas se ven con la identidad nueva y ninguna guía tiene rejilla
   detrás del texto de lectura.
4. La línea de lectura sigue dentro de rango con IBM Plex Sans, medido, no
   supuesto.
5. Sin interacción, ninguna animación en curso salvo el indicador de progreso.
