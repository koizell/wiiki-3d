# Diseño: identidad visual, UI/UX y movimiento de wiiki-3d

Fecha: 2026-10-08
Estado: propuesto, pendiente de revisión
Origen: sesión de brainstorming con el autor del proyecto

---

## 1 · Contexto y objetivo

El sitio funciona y está verificado, pero su presentación tiene dos problemas
distintos que este trabajo ataca a la vez:

1. **No tiene identidad.** Tipografía del sistema, sin motivo propio, y
   animaciones repartidas por el CSS sin una norma que las gobierne.
2. **La UI/UX deja huecos.** El contenido flota en el centro de un lienzo que
   centra verticalmente lo que no debería, hay bloques descolgados y los
   resultados no se leen como resultados.

El objetivo es que el sitio **tenga una identidad reconocible y coherente en las
cuatro rutas** (Inicio, Taller, Wiki 3D, Proyectos) y que cada pantalla esté
**anclada, jerarquizada y sin bloques sueltos**, sin que nada de eso compita con
la lectura.

Se descarta el objetivo contrario: no se busca impresionar ni llenar la pantalla
de movimiento. La regla que gobierna el movimiento es que **sólo confirma una
acción del usuario**; nada se mueve solo.

## 2 · Decisiones cerradas

| # | Decisión | Valor |
|---|---|---|
| D1 | Carácter visual | Manual técnico / **plano de taller** |
| D2 | Tipografía | **IBM Plex Sans** (texto) + **IBM Plex Mono** (datos), autoalojadas |
| D3 | Movimiento de resultados | **Instrumento**: aparece en su sitio + trazo azul que se dibuja |
| D4 | Movimiento de controles | **Preciso**: 140 ms, `ease-out`, 6 px |
| D5 | Dependencias | Ninguna. CSS nativo + Web Animations API si hiciera falta |
| D6 | UI/UX | **Pasada sobre la estructura**: anclar, jerarquizar, convertir resultados en readouts y recolocar bloques sueltos. No cambian rutas ni lógica de dominio |
| D7 | Moneda | **USD estándar**: `$0.02`, punto decimal, coma = millares. Sólo en Taller |

D6 sustituye a una versión anterior de esta spec que congelaba la geometría. Se
cambió al ver las capturas del autor: el vacío de Taller y el bloque descolgado
de «Últimos análisis» no son piel, son estructura, y arreglarlos es parte del
encargo. Lo que **sí** se conserva de aquella decisión es la frontera: no se
tocan las rutas ni la lógica de dominio (salvo el formato de coste de D7).

## 3 · Fundamentos (tokens)

El proyecto **ya tiene** un sistema de tokens en el `:root` de `src/App.css`
(`--bg-dark`, `--bg-panel`, `--border`, `--text-primary`, `--text-secondary`,
`--accent`, `--accent-text`, `--success`, `--warning`, `--danger`), con los
contrastes WCAG razonados en los comentarios. **No se renombra ninguno**: eso
sería churn sin valor. La identidad **extiende** ese `:root` con los tokens que
faltan.

```css
/* --- Tipografía --- */
--fuente-texto: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
--fuente-dato: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

/* --- Motivo de plano --- */
--plano-rejilla: #171c26;
--plano-paso: 18px;
--plano-linea: var(--border);
--plano-esquina: var(--accent-text);

/* --- Radios (hoy dispersos) --- */
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
conservan (ver §11, riesgos).

## 4 · Tipografía

- **IBM Plex Sans** 400 y 600 para texto; **IBM Plex Mono** 400 y 500 para datos,
  etiquetas y cifras.
- Autoalojadas en `public/fuentes/`, **woff2**, subset latin, `font-display:
  swap`, con `<link rel="preload">` para los pesos de la primera pantalla.
- La mono lleva `font-variant-numeric: tabular-nums` en todo dato numérico.
- `body` pasa de `'Inter', …` a `var(--fuente-texto)`. `Inter` estaba declarada
  pero **nunca se cargaba**: hoy se ve la del sistema. El cambio es real.

## 5 · El motivo de plano, y su frontera

**Aparece en:** el lienzo de trabajo (portada, visor, Taller, índice de la Wiki),
las cabeceras de sección y las zonas de acción.

**No aparece nunca en:** el cuerpo de lectura de las guías. La rejilla detrás de
800 palabras es la saturación que este diseño existe para evitar. Es la misma
frontera que separa `wiki/raw/` de `wiki/cooked/`: estructura y contenido no se
mezclan.

| Elemento | Dónde | Cómo |
|---|---|---|
| Rejilla | Lienzo de trabajo | Dos `linear-gradient`, paso `--plano-paso` |
| Marcas de esquina | Zonas de acción | Cuatro `div` con dos bordes, `--plano-esquina` |
| Numeración `01 ·` | Cabeceras de sección | Componente `<SeccionPlano numero="01">` |
| Cota | Comparar valor con objetivo | Línea con extremos; se reutiliza en guía y Taller |

## 6 · Sistema de movimiento

Cuatro primitivas, y ninguna más.

| Primitiva | Disparador | Implementación |
|---|---|---|
| `entrada-ruta` | Navegar a una ruta | Al montar: opacidad 0→1 y 4 px, `--dur-entrada`. Una vez |
| `confirmar` | Subir archivo, calcular, marcar variable | Aparece en su sitio (sin desplazamiento) + trazo azul con `scaleX`. `--dur-resultado` + `--dur-trazo` |
| `control` | `:hover`, `:focus-visible`, `:active` | 140 ms, 6 px, `--curva-estandar` |
| `progreso` | «Analizando…» | El **único** bucle permitido (`panel-pulse` ya existe) |

**Reglas duras, comprobables:**

1. Sin interacción, nada se anima (salvo `progreso`).
2. Sólo se animan `opacity` y `transform`. Ninguna propiedad de layout → CLS 0.
3. Con `prefers-reduced-motion: reduce`, todo se apaga sin perder información.
4. La animación nunca retrasa la lectura: el contenido es legible desde el primer
   fotograma.

## 7 · UI/UX: los arreglos concretos

Cada regla sale de un fallo visto en las capturas del autor.

1. **El lienzo deja de centrar.** `.canvas-area` hoy es `display:flex;
   align-items:center; justify-content:center`, y eso es lo que hace flotar a
   Taller en medio y lo que obligó a parchear el visor con `align-self: stretch`.
   Pasa a **anclar arriba**. El parche deja de ser necesario.
2. **Cada ruta abre con una cabecera de plano**: `01 · INICIO`, `02 · TALLER`, …
   más el título y el **estado** a la derecha («Sin archivo», «Con análisis»).
3. **Los resultados son readouts**, no párrafos: cifra grande en mono, la
   aritmética debajo, y el trazo de `confirmar`.
4. **Ningún bloque suelto.** «Últimos análisis» sale de `.viewer-container`
   —donde hoy acaba descolgado— y pasa a **sección a ancho completo**, anclada.
5. **El botón X deja de ser rojo saturado**: control fantasma. La acción
   principal vuelve a mandar.
6. **El carril de Taller deja de pintar las 8 guías.** Hoy pinta `RielWiki`
   porque Taller no está en `RUTAS_ANALISIS`. Pasa a explicar cómo se calcula.
   Es el cambio más discutible de la lista y el autor puede revertirlo.
7. **El visor sin previsualización** deja de ser una caja vacía: es un panel de
   estado con propósito, anclado arriba, no un vacío con dos líneas centradas.

Regla transversal: **todo bloque pertenece a una columna** (nav, lienzo o
carril). Un bloque que no pertenece a ninguna es el fallo de la captura 2.

## 8 · Moneda: USD

Taller pasa de `€/kg` a `$/kg` con formato **USD estándar**.

- **Salida:** `0.93 g × $25.00/kg = $0.02`. Punto decimal, símbolo delante.
- **Parseo:** `25` y `25.00` válidos; `1,234` = **mil doscientos treinta y
  cuatro** (hoy es 1,234); `0`, negativos, `abc` y `1.2.3` inválidos.
- **Afecta a:** `src/lib/coste.ts` (formato y parseo), `TallerRoute.tsx`
  (etiqueta y placeholder), `scripts/verify/taller.mjs` (las 180
  comprobaciones), `docs/taller.md` (diseño de Taller) y un comentario de
  `App.css`.

La razón por la que va aquí y no en un cambio aparte: se decide mientras se
rediseña esa pantalla, y `verify:taller` **falla solo** si se cambia la moneda
sin actualizarlo, así que no puede quedarse a medias en silencio.

## 9 · Arquitectura de ficheros

```
src/App.css                  # :root ampliado + UI/UX (§7); el resto, intacto
src/estilos/fuentes.css      # @font-face de Plex Sans y Plex Mono
src/estilos/plano.css        # rejilla, esquinas, numeración, cota
src/estilos/movimiento.css   # keyframes, clases utilitarias, reduced-motion
src/components/SeccionPlano.tsx   # cabecera numerada con marcas de esquina
src/lib/coste.ts             # formato y parseo en USD
src/routes/TallerRoute.tsx   # etiqueta, placeholder y readout
public/fuentes/*.woff2       # las fuentes autoalojadas
scripts/verify/animacion.mjs # la comprobación nueva
```

Los tres ficheros de `src/estilos/` se importan desde `src/main.tsx`. Sacarlos de
`App.css` (~3.800 líneas) sigue la regla que el proyecto ya aplica: un fichero,
una responsabilidad. No se mueve nada del CSS existente; sólo se añade.

Los componentes se animan con clases utilitarias y `data-anima="confirmar"`, no
con keyframes sueltos por componente.

## 10 · Verificación

**`scripts/verify/animacion.mjs`** (nuevo), con Playwright, sale con código 1 si
algo falla. Comprueba:

1. Con `emulateMedia({ reducedMotion: 'reduce' })`, `document.getAnimations()`
   no devuelve ninguna animación en curso, **salvo la excepción documentada de
   `DibujoSintoma`** (§11).
2. Sin interacción, ninguna animación activa salvo `progreso`.
3. **CLS ≈ 0** al cargar y tras cada interacción clave (`PerformanceObserver`
   sobre `layout-shift`).
4. Contraste ≥ 4,5:1 en los tokens de texto sobre sus fondos.
5. `tabular-nums` presente en los elementos marcados como dato.
6. `document.fonts.check()` para los cuatro pesos, y que la carga no cambia el
   ancho de una línea medida antes y después.

**`verify:taller`** se actualiza a USD, y **`verify:rutas`** gana la comprobación
de que cada ruta abre con su cabecera de plano y su estado.

## 11 · Riesgos y comprobaciones que no se pueden saltar

- **La tipografía cambia las métricas.** El proyecto midió la línea de lectura
  carácter a carácter (9,47 px) y fijó un suelo de 35 caracteres a 375 px y un
  rango de 45–75 en los demás anchos. IBM Plex Sans **no tiene las mismas
  métricas**, así que hay que **volver a medirlos**. `verify:layout` y la parte
  de lectura de `verify:wiki` son la red que lo detecta.
- **FOUT y CLS.** `font-display: swap` puede provocar un salto al cargar. El
  `preload` y la comprobación 6 de §10 existen para cazarlo.
- **El peso del subset.** Dos familias y cuatro pesos pueden pesar más que la
  fuente del sistema. Se subsetea a latin y se sirven sólo los pesos usados.
- **`DibujoSintoma` es informativo.** Sus animaciones no son decoración: explican
  un síntoma. `prefers-reduced-motion` no las elimina, las modera. La
  comprobación 1 de §10 debe respetar esa excepción.
- **La documentación de Taller miente si no se toca.** `docs/taller.md` dice
  `€/kg` con su razonamiento. Cambiar a USD sin actualizarlo deja un documento
  que contradice el código. Va en el mismo cambio.

## 12 · Fuera de alcance

- Cambiar las rutas o los puntos de ruptura.
- Tocar la lógica de dominio, salvo el formato de coste de D7 (`coste.ts`).
- Tocar el contenido de las guías (`src/content/guias/*.ts`).
- Añadir dependencias de animación.
- Rediseñar el visor 3D.

## 13 · Criterios de aceptación

1. `npm run verify:animacion` pasa, y **falla** si se quita el bloque
   `reduced-motion`, si se anima una propiedad de layout o si aparece un bucle no
   permitido (comprobado rompiéndolo a propósito, como ya se hizo con la barra
   «Tu archivo»).
2. `npm run verify:layout`, `verify:wiki`, `verify:guias`, `verify:taller`,
   `verify:rutas` y `verify:seo` siguen en verde, con `verify:taller` ya en USD.
3. Las cuatro rutas abren con cabecera de plano y estado, y ninguna guía tiene
   rejilla detrás del texto de lectura.
4. **Ninguna captura de las cuatro rutas muestra un bloque descolgado** ni el
   contenido flotando en el centro del lienzo.
5. La línea de lectura sigue dentro de rango con IBM Plex Sans, medido, no
   supuesto.
6. Sin interacción, ninguna animación en curso salvo el indicador de progreso.
7. `docs/taller.md` describe la moneda que el código usa.
