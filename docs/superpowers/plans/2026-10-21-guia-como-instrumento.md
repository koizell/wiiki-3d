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

## La vuelta de texto, y lo que encontró

**El problema.** La etapa 4 de la guía —«qué cambiar»— pintaba el `porque` de cada
acción como un párrafo. De 583 reglas, **213 lo tenían de más de 200 caracteres**,
y el `resumen` de la cabecera, que el contrato dice que es «una frase», era de
media 164 caracteres y en 19 guías tenía más de una.

**Lo que se hizo, por el pipeline de siempre.** Seis tandas del **redactor**, que
acortó los `porque` a 200 caracteres sin tocar `accion`, `valor`, `alcance`,
`fuente` ni `cuando`; y el **revisor** sobre cada tanda, con las reglas que el
redactor había señalado una por una.

**Las dos mitades de la comprobación**, porque una vuelta de contenido escrita por
agentes necesita las dos:

| | Qué comprueba | Resultado |
|---|---|---|
| `verify:recorte` (mecánica) | Que **fuera del `porque` no ha cambiado nada**, campo por campo, con el AST de TypeScript | 24 guías, 213 reglas, **todo lo demás idéntico** |
| El revisor (editorial) | Que el matiz perdido siga en el `alcance`, en la condición o en una tarjeta | De las 51 reglas señaladas, **49 eran redundancia**, 1 equivalencia y **1 pérdida real** |

**La pérdida real** estaba en `agujeros-ovalados/usar-hole-compensation`: al
acortar se cayó «aumenta o disminuye el tamaño XY», y el revisor lo buscó en el
`alcance`, en la `cuando` y en las tarjetas antes de darlo por perdido. No estaba
en ninguna parte. Devuelta.

**Dos bugs preexistentes** que la revisión encontró de paso y que también van al
redactor:

- `esquinas-petg/recinto-abrir` explica una cosa y se dispara en otra. La fuente
  de Bambu tiene dos filas: la de PLA/PVA/TPU dice cama por encima de 45 °C y la
  de **PETG** —esta guía— dice por encima de 60 °C. La regla tomó la fila
  equivocada, y su condición hace que no se dispare en el rango recomendado del
  PETG.
- `elephant-foot/enfriamiento`: el `valor` dice «desde capa 2–3» y el `porque`
  «Con PLA desde el inicio». Dos cifras para el mismo ajuste.

**El freno.** `verify:texto` mide la deuda y **sólo puede bajar**: si crece,
falla; y si baja, también falla, porque un freno que no se actualiza deja de avisar
de las subidas siguientes.

## El hueco de contenido que salió de la investigación

La investigación de [Control3D](../investigacion-control3d-2026-10-21.md) —César
Galera, arquitecto, canal desde 2017, +17.000 alumnos— dejó claro un hueco que no
era de un test suelto:

Sus siete tests de calibración son **nuestras guías**, una a una. Lo que falta es
**la entrada por la puerta de atrás**: wiiki-3d está organizado por síntoma, y
quien no tiene un síntoma —quien quiere una impresora bien calibrada— no tiene
dónde empezar. Falta una guía que **enrute** a las que sí diagnostican y explique
por qué ese orden, que es lo que casi nadie dice. Y falta el paso 8: la **pieza
final de comprobación**.

La investigación también ha dejado los **modelos de test gratuitos** con su
licencia, y la advertencia de que una calibración automática puede variar entre
trabajos: un perfil calibrado a mano es **una referencia con la que comparar**,
que es lo que sostiene el `alcance` de nuestras reglas.

## La ruta de calibración, que salió de la investigación

La investigación de Control3D no dejó una idea: dejó una **guía**.

Los siete tests de calibración **ya eran** siete guías de este sitio. Lo que no
existía era la entrada por la puerta de atrás: wiiki-3d está organizado **por
síntoma**, y quien no tiene un síntoma —quien quiere una impresora bien calibrada,
o recalibra porque ha cambiado de bobina— no tiene dónde empezar.

La guía nueva se llama `ruta-de-calibracion` y **enruta** en vez de diagnosticar:

| | |
|---|---|
| **Diez de sus doce reglas** | llevan `enlaza` a la guía que las desarrolla, con el campo nuevo `Regla.enlaza` |
| **Cuatro reglas que no son tests** | cambiar de bobina, cambiar de boquilla, qué ajustes rehacer, y qué hacer si no has cambiado nada |
| **Dieciséis tarjetas** | y la mayoría son contradicciones **declaradas, no resueltas** |

Lo que la guía dice, y es lo que nadie más tenía:

- **El orden no es un dato de fabricante, es un método.** Hay tres que se
  contradicen —el de Control3D, el de OrcaSlicer y el de Duet3D— y **Prusa y
  Bambu no publican ninguno**. La guía declara las tres y **no dice cuál es el
  bueno**; dice cuál usa ella, que es el de Control3D, y por qué.
- **La dirección del síntoma del Pressure Advance**: el material cocinado corrigió
  lo que se le había dicho. Bambu, Prusa y Duet3D **coinciden** en que el abombado
  está en el lado bajo; el desacuerdo real es el vocabulario y el punto de
  observación, y un choque frontal con **Klipper**, que llama «rounded corners» al
  PA **alto** mientras Bambu llama «esquina redondeada» al K **bajo**.
- **La escala del K no es la misma en cinco firmwares**, y no se traduce ni se
  compara.
- **La retracción en Bowden tiene tres valores** según quién los da.

Las cifras de Control3D van marcadas como **el método de un autor**, y su
atribución dice que es una academia comercial.

## La comprobación que faltaba: los campos protegidos

`verify:recorte` compara una vuelta de acortamiento contra `HEAD`, y en cuanto
se commitea **se queda vacío**: en el CI no comprobaría nada.

Lo que lo sustituye es `verify:protegidos`, con una **base de las huellas** de
los campos que no pueden cambiar en silencio —el `accion`, el `valor`, el
`alcance`, la `fuente` y el `cuando` de cada regla, y el `titulo`, el `cuerpo` y
la `cita` de cada tarjeta—. La regla que impone es del propio repositorio: un
cambio en un campo protegido **tiene que actualizar la fecha de la guía**, porque
una fecha que no se toca es una fecha decorativa.

Es lo que esta vuelta necesitaba y no tenía: veinte y cuatro ficheros escritos
por agentes, donde un `alcance` que se mueve o una `fuente` que cambia de nombre
**no se ven leyendo**.

## Lo que encontró el último repaso

El trabajo estaba verde y aun así no estaba bien. Dos cosas que **ningún
verificador miraba**, y que aparecieron al leer el resultado en vez de al pasarlo.

### Los puntos de las tarjetas no eran frases

El troceado del `cuerpo` en puntos partía por comas y dos puntos cuando la frase
era larga, y dejaba el separador pegado al punto final:

> «… cada capa se apoya sobre la anterior**,.**»

**351 puntos de las 537 tarjetas** tienen ese final. El `cuerpo` nunca se tocó: el
cotejo lo demuestra. El fallo era del script, y por eso **no lo veía nadie**: la
comprobación de longitud dice que un punto cabe en 140 caracteres, y un punto de
140 con una coma y un punto **sí cabe**.

La moraleja es la de siempre, pero con un matiz que no se había visto: **un
verificador que mide la forma no mide la lectura**. `verify:guias` comprueba que
los puntos existen, que caben y que no repiten. Que se lean como frases es otra
cosa, y no la comprobaba nadie.

La regla que salió de ahí, y que ya está en el script:

| Regla | Por qué |
|---|---|
| Primero se corta por **frases**, y una frase que empieza por negrita («**Demasiado alto:** la línea…») es una frase nueva | Sin eso, dos frases se pegaban y el punto medía 185 |
| Cada trozo **termina en punto** y el siguiente **empieza en mayúscula** | En el cuerpo ya no es una continuación, es una frase propia |
| **Dos cortes tienen que estar separados por 40 caracteres** | Sin esa regla el troceado se va a mil cortes de tres caracteres y el reenganche acaba partiendo en «…al enfriarse— y.» |
| El límite del contenido es **139**, no 140 | Un trozo que se corta por cláusula acaba con un punto final que no estaba, y ese punto cuenta |

### El texto estaba corrupto desde el principio

En `separaciones.ts` había tres cosas rotas: **«ambosacted»** por «ambos actúan»,
**«sin-improvement»** por «sin mejoría» y **«Oídos así»** por «Leídos así».

La primera vez que aparecen es en `6ddd56e`, la conversión del artículo a guía
tipada: **venían del artículo original**. El `cuerpo` las arrastró y la migración
las copió a los `puntos`.

Nadie las había visto porque `verify:guias` comprueba la estructura del contrato,
no la ortografía. Y no hay forma de que un verificador estructural detecte que una
palabra está pegada a otra sin un diccionario y una lista de excepciones — que es
un problema distinto del que se puede resolver en un script.

### El CI no miraba la wiki

El pipeline ejecutaba `eslint`, el build y `verify:revision`. Se acabó ahí.

El compilador **no sabe leer la wiki**. Una guía puede tener un `puntos` de 300
caracteres, un `porque` que se ha comido un dato o un `resumen` que dice lo
contrario que la tarjeta de al lado: TypeScript lo compila igual, la página se
publica igual, y el sitio sale mal. De las 1091 comprobaciones del motor de
guías, el CI no ejecutaba ninguna.

Ahora el pipeline tiene tres capas, y las dos primeras van **antes** del build
porque no necesitan red ni navegador: si el contenido está mal, se falla en
segundos en vez de en dos minutos.

| Capa | Qué corre | Cuándo |
|---|---|---|
| `verify:revision` | toda guía escrita tiene que estar registrada | antes del build |
| `verify:contenido` | el motor de guías, el texto y el contraste con `wiki/raw/` | antes del build |
| `verify:dist` | los enlaces internos que no dan 200 y el `description` de cada guía | con el sitio construido |

Las que quedan fuera a propósito son las que dependen de la red:
`verify:fuentes` mira si las URLs externas responden, y un 403 de un servidor que
bloquea bots —no una fuente muerta— tumbaría un despliegue por un fallo ajeno.

### Lo que el pipeline enseña cuando se ejecuta de verdad

Las comprobaciones se escriben y se pasan en local, y **el pipeline es donde
descubren que no están escritas para el sitio donde van a correr**. Cuatro
cosas, todas de la misma familia: el entorno las da por buenas y no lo son.

| Lo que pasó | Lo que era |
|---|---|
| `verify:wiki` moría en el primer segundo, sin imprimir nada | El navegador de Playwright no estaba instalado: `npm ci` instala el **paquete**, no el **navegador** |
| `verify:seo` se colgaba esperando la red | La página carga AdSense y Analytics de Google, y `networkidle` espera a que **la red** se quede quieta. En el runner esas peticiones no se resuelven |
| El preview no arrancaba | `vite preview` tenía **doce segundos** para levantar. En un portátil, de sobra; en un runner, no |
| Las páginas se caían por timeout | Playwright espera **30 segundos** por página. Un timeout de infraestructura se presenta como un fallo del sitio |

La regla que sale de las cuatro: **un timeout no es un fallo de lo que se
mide**, y una comprobación que depende del reloj de la máquina necesita un
margen que la máquina más lenta del mundo pueda cumplir.

Y una cosa que no se puede arreglar desde aquí: `verify:wiki` falla **a veces**
en el runner, en el primer segundo, con tres reintentos igual, y en un
contenedor limpio con Node 22 y `npm ci` pasa las 220. El log de un job sólo lo
lee quien tenga permisos de administrador, así que el motivo no se puede ver.

Por eso **informa y no bloquea**. Un portón que da falso a veces es peor que no
tenerlo: entrena al que lo mira a ignorar las luces, y bloquea despliegues que
están bien. El despliegue lo cierran las cuatro comprobaciones que sí son
fiables —la revisión, el contenido, los enlaces y el SEO— y la wiki renderizada
sigue corriendo, con su salida en el resumen del job.

## Fuera de alcance

- Reescribir a mano las 32 guías restantes: la migración de la tarea 2 es
  mecánica y el texto se revisa en el ciclo del redactor.
- El visor 3D con la trayectoria del G-code (`docs/superpowers/plans/` nuevo).
- Tocar `wiki/raw/` y `wiki/cooked/`.
