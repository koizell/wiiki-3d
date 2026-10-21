# La guía como instrumento — Plan de implementación

> **Para agentes:** sub-skill obligatoria `superpowers:executing-plans`. Tareas con
> casillas (`- [ ]`) para seguimiento.

**Objetivo:** que las 33 guías dejen de ser muros de texto. Cada elemento lleva
indicador, cifra o veredicto; el recorrido se convierte en un instrumento con
estado en vez de un scroll largo.

**Arquitectura:** el contrato de `src/content/guias/tipos.ts` crece con lo que
hace falta para pintar indicadores; la vista de `GuiaRoute` se rehace con
componentes propios; `motion` (motiondivision) implementa las cuatro primitivas
de la spec §6 sobre las que ya están escritas las duraciones y las curvas.

**Stack:** React 19, TypeScript, Vite, CSS, `motion` 14, verificadores Node/Playwright.

**Diseño:** [wiiki-3d · design system](https://www.figma.com/design/DTXR8LOlujQXdC6vv4ks3Y)
— página `02 · Guía rediseñada` (escritorio 1440 y móvil 375) y página
`01 · Fundamentos` (tokens, frontera y los seis componentes nuevos).

**Spec:** [`2026-10-08-identidad-visual-y-movimiento-design.md`](../specs/2026-10-08-identidad-visual-y-movimiento-design.md).
Este plan **cambia dos decisiones de esa spec**, y por eso van escritas aquí y
no enterradas en el código:

| Decisión | Antes | Ahora | Por qué |
|---|---|---|---|
| §2 **D5** — dependencias | «Ninguna. CSS nativo + Web Animations API si hiciera falta» | **Se admite `motion`** para lo que CSS no cubre: salida, gestos y valores continuos | El CSS no tiene estado de salida ni `AnimatePresence`. Una etapa que *desaparece* no se puede hacer con `@keyframes` |
| §5 — la rejilla | «No aparece nunca en el cuerpo de lectura de las guías» | Aparece en las **tarjetas de instrumento** (comprobación, variable, readout), **nunca detrás de un párrafo** | La frontera de la spec era «estructura vs contenido», y esas tarjetas son estructura |

## Restricciones globales

- Nada de lo que hay comprobaciones se relaja. `verify:layout`, `verify:wiki`,
  `verify:guias`, `verify:ui`, `verify:rutas` y `verify:seo` siguen en verde.
- Sólo se animan `transform` y `opacity`. Ninguna propiedad de layout → CLS 0.
- Con `prefers-reduced-motion: reduce` todo se apaga sin perder información.
- El chunk de entrada no crece. `motion` entra por rutas que ya son `lazy`.
- `wiki/raw/` no se toca. Ningún dato se inventa: lo que no está cocinado no se escribe.
- Cada cambio se mide y se publica en `docs/kanban.md` con su cifra.

## Tarea 1 · El contrato del contenido

**Ficheros:** `src/content/guias/tipos.ts`, `scripts/verify/guias.mjs`,
`src/components/guia/Indicador.tsx`.

**Interfaces:**

```ts
/** El indicador visual de un elemento de la guía. */
export type Indicador =
  | 'temperatura' | 'material' | 'altura' | 'velocidad' | 'limpieza'
  | 'subir' | 'bajar' | 'mantener' | 'cambiar' | 'medir' | 'recalibrar' | 'esperar';

export interface Conocimiento {
  /** El cuerpo, en puntos de una línea. Si no está, se usa `cuerpo` como un punto. */
  puntos?: string[];
  /** El indicador visual de la tarjeta. */
  indicador?: Indicador;
}

export interface Variable {
  /** El indicador visual de lo que se declara. */
  indicador?: Indicador;
}

export interface Regla {
  /** El indicador visual de la acción: qué hay que hacer con ella. */
  indicador?: Indicador;
}
```

- [x] Escribir las comprobaciones nuevas en `verify:guias`: `indicador` válido si
      está; `puntos` de una línea; `porque` de la regla de ≤ 200 caracteres; y el
      `resumen` con una sola frase.
- [x] Ejecutar `verify:guias` y ver **fallar** por las guías que aún no comply.
- [x] Añadir los tipos. Ejecutar `verify:guias` y ver **fallar** sólo por lo que
      falta de migrar, no por el contrato.
- [x] `verify:guias` **acumula** los fallos en vez de abortar en el primero, como
      `verify:ui` y `verify:wiki`: con una migración de 520 tarjetas, un fallo por
      vuelta serían 520 vueltas.

## Tarea 2 · Migrar el contenido sin perder una palabra

**Ficheros:** `scripts/wiki/migrar-puntos.mjs` (nuevo, corre sobre `src/content/guias/`).

- [x] El script trocea `cuerpo` en puntos por frase y por cláusula, **sin
      reescribir**: el texto de la guía es el producto y no se toca a mano sin
      revisión. Usa el AST de TypeScript, no una expresión regular.
- [x] Comprobación: **29.706 palabras de cuerpo antes y 29.706 después**, 520
      tarjetas cotejadas una a una contra `HEAD`, cero diferencias.
- [x] `verify:guias` en verde con la deuda declarada (guías con `porque` largo:
      213 de 583, y el número sólo puede bajar).

## Tarea 3 · Motion

**Ficheros:** `src/lib/movimiento.ts` (nuevo), `scripts/verify/animacion.mjs` (nuevo),
`package.json`.

- [x] `scripts/verify/animacion.mjs`, según §10 de la spec: con `reduced-motion`
      no hay ninguna animación en curso salvo la excepción documentada de los
      dibujos; sin interacción no hay ninguna salvo `progreso`; CLS ≈ 0;
      `tabular-nums` en los datos; las cuatro fuentes cargan.
- [x] Escribir el script y ver **fallar**: el CLS era de **0,586**, y la causa no
      era la animación sino que **faltaba el `preload` de las fuentes** que la
      spec §4 ya mandaba. Con él, el CLS es de cero.
- [x] `src/lib/movimiento.ts`: las cuatro primitivas de §6, `useReducedMotion` y
      un contexto que desactiva el movimiento en la exportación estática —si no,
      el HTML publicado saldría con el texto invisible.
- [x] `verify:animacion` en verde: 18/18.

## Tarea 4 · La vista

**Ficheros:** `src/routes/GuiaRoute.tsx`, `src/components/guia/` (nuevo),
`src/estilos/guia.css` (nuevo).

- [x] Cabecera de plano con estado (§7.2, que estaba pendiente en las guías).
- [x] `StepperEtapas` — las cuatro etapas con contador en vivo, **enlaces** con
      ancla para que el enlace profundo siga funcionando.
- [x] `Comprobacion` — la pregunta manda; el veredicto aparece al contestar.
- [x] `TarjetaVariable` — opciones-tarjeta con el trazo azul al marcar.
- [x] `TarjetaConocimiento` — la cifra manda; la cita baja a una línea.
- [x] `ReadoutAccion` — la cifra grande, el porqué en una línea, la fuente al lado.
- [x] El riel sigue igual: el contador, la barra y «tu archivo» ya estaban.
- [x] Sin JavaScript, la guía sigue leyéndose entera: cada etapa con su `<h2>`,
      el diferencial con sus dos caras, las reglas con su condición. **Comprobado:
      el HTML exportado no tiene ni un `opacity: 0`.**

## Tarea 5 · El piloto

**Ficheros:** `src/content/guias/warping-pla.ts`.

- [x] Los 32 ficheros migrados con `puntos` e `indicador`, y el `resumen` partido
      en `resumen` + `resumenExtra`.
- [x] Medido: **29.706 palabras de cuerpo antes y después**, **952 palabras de
      resumen antes y después**, cero diferencias de `id`, `titulo`, `cuerpo`,
      `cita`, `cifra`, variables, reglas, fuentes y «lo que no resuelve».
- [ ] Queda para la vuelta del redactor: los **213 `porque` de más de 200
      caracteres**, que son la deuda que queda del texto largo.

## Tarea 6 · El redactor escribe en el formato nuevo

**Ficheros:** `.opencode/agents/redactor.md`.

- [ ] El prompt del redactor dice qué es `puntos`, qué es `indicador`, qué es
      `resumenExtra` y por qué `porque` es de una línea.
- [ ] `wiki/reviews/` deja constancia de la vuelta.

## Fuera de alcance

- Reescribir a mano las 32 guías restantes: la migración de la tarea 2 es
  mecánica y el texto se revisa en el ciclo del redactor.
- El visor 3D con la trayectoria del G-code (`docs/superpowers/plans/` nuevo).
- Tocar `wiki/raw/` y `wiki/cooked/`.
