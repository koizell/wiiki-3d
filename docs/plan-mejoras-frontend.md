# Plan de mejora del frontend

Fecha: 2026-10-14. Estado: **borrador para revisión**, no empezado.

Predecesor: [`auditoria-frontend-2026-10-14.md`](auditoria-frontend-2026-10-14.md),
que fija lo que cumple y lo que no. Este plan sólo cubre lo que esa auditoría
dejó pendiente; no repite lo ya corregido.

---

## 1. Intención, y por qué

La auditoría encontró **dos bloqueos de verdad** y un conjunto de fallos de
prioridad media. Los dos bloqueos son los que el plan ataca primero, porque son
los que hacen que la página no cumpla lo que promete:

1. **Las ilustraciones no distinguen modelos.** La Ender 3 V3 SE y la KE se
   dibujan iguales, y el catálogo existe precisamente para contar que no lo son.
   Mientras el dibujo no distinga, la ficha y la ilustración se contradicen.
2. **Los datos del catálogo no están revisados.** Hay reglas de compatibilidad
   actuando sobre cifras cuya fuente no se ha comprobado. La interfaz ya no
   promete compatibilidad completa, pero eso no convierte los datos en ciertos.

El resto —jerarquía del inicio, respuesta de las guías, densidad del catálogo—
son mejoras de prioridad media que no bloquean nada.

**No objetivos:** reescribir el diseño; cambiar el stack; tocar la sección de
anuncios ni la privacidad; añadir dependencias; perseguir el 100 % de WCAG en
esta vuelta.

---

## 2. Cómo se mide el éxito

| Objetivo | Prueba que lo demuestra |
|---|---|
| Cada modelo se distingue en el dibujo | Dos máquinas de la misma familia no comparten la firma del SVG (`verify:maquinas`) |
| La mecánica se mueve junta | La trayectoria del filamento acompaña al cabezal medido a lo largo del ciclo (`verify:maquinas`) |
| Ninguna cifra sin respaldo | `verify:maquinas` reclama fuente por campo, y el informe de revisión dice cuáles quedaron pendientes |
| El inicio explica antes de pedir | Con `prefers-reduced-motion` y a 375 px, el h1 y la propuesta de valor están por encima del primer gesto |
| La guía responde al cambiar una variable | El contador de acciones se actualiza y se anuncia (`aria-live`) |
| Nada se rompe entre fases | `npm run build`, `verify:teclado`, `verify:guias`, `verify:maquinas`, `verify:taller` en verde |

**Regla de cierre:** ninguna tarjeta se cierra sin el comando ejecutado y su
salida en el mensaje de commit. Es la regla 2 del
[`kanban.md`](kanban.md), y esta vuelta la respeta.

---

## 3. Decisiones tomadas (con su razón)

| Decisión | Elección | Razón |
|---|---|---|
| Dónde se valida el catálogo | Las fuentes entran por `wiki/raw/` y la revisión se archiva en `wiki/reviews/` | Es la frontera que ya existe: nadie escribe una cifra que no haya pasado por el cocinero. Abrir una segunda vía "sólo para máquinas" rompería el filtro que sostiene la honestidad del sitio. |
| Cómo se distingue cada modelo | Por datos, no por ramas de código: un mapa de rasgos por modelo que `MaquinaSVG` interpreta | Ocho `if` dentro del SVG es el camino a un componente de 900 líneas que nadie vuelve a tocar. |
| Cuánta fidelidad | Silueta y rasgos distintivos verificables; **no** fotorrealismo ni medidas externas | El plan anterior ya descartó el fotorrealismo, y una medida sin fuente es peor que un esquema. |
| `/maquinas` como destino | Se mantiene fuera de la barra de 4; se refuerza su entrada desde Inicio y el pie | La barra de 4 es una decisión del proyecto. Añadir un quinto destino cambia la navegación de todo el sitio y no lo pide esta auditoría. |
| Orden | Primero lo que bloquea (datos y dibujo), después la prioridad media | Un catálogo bonito sobre datos falsos sigue siendo un catálogo falso. |

---

## 4. Tareas

Las 17 tarjetas están en el tablero vivo
([`kanban.md`](kanban.md), Sprint 5) con la prueba que cierra cada una; aquí
queda el detalle de cada una y por qué está ordenada así.

### Fase 0 · Cerrar lo que la auditoría dejó a medias

#### T0.1 — `verify:taller` muere al cerrar el servidor

**Descripción.** El script hace `preview?.kill()`, pero `startPreview()`
devuelve una URL o `null`, no un proceso: la cadena no tiene `kill`. La
verificación **fallaba al terminar**, después de comprobar todo. Se descubrió
esta semana ejecutando `npm run verify:taller` sin `BASE_URL`.

**Criterios de aceptación**
- `npm run verify:taller` termina con «TODAS LAS COMPROBACIONES PASAN (180)» y
  código de salida 0, arrancando su propio `vite preview`.
- Con `BASE_URL` puesto sigue funcionando igual (se mide contra el servidor
  vivo y no se mata ningún proceso ajeno).
- El cierre no deja `vite preview` huérfanos si el script los arrancó.

**Verificación**
- [ ] `npm run verify:taller` → 180 ok, código 0
- [ ] `BASE_URL=http://127.0.0.1:5199 npm run verify:taller` → 180 ok, código 0

**Dependencias:** ninguna. **Ámbito:** pequeño (1 fichero).

---

#### T0.2 — Registrar la comprobación de la subida

**Descripción.** `scripts/verify/subida-ui.mjs` se escribió esta semana —vista
fallar antes del arreglo— pero no está en `package.json`, así que nadie la
ejecuta salvo a mano. Se registra como `verify:subida`.

**Criterios de aceptación**
- `npm run verify:subida` existe y pasa.
- El script falla si se rompe el arrastre: probado revirtiendo los handlers un
  momento (o equivalente, la prueba tiene que poder ponerse en rojo).

**Verificación**
- [ ] `npm run verify:subida` → OK, código 0
- [ ] `npm run build` → correcto

**Dependencias:** T0.1 no hace falta, pero van juntas en el mismo commit de
verificación. **Ámbito:** pequeño (1 fichero).

---

#### T0.3 — La auditoría repetible: `verify:ui`

**Descripción.** Las 33 comprobaciones de esta semana se hicieron a mano con
Playwright en un script de un solo uso. Eso significa que **la próxima regresión
no la verá nadie**. El script queda en el repo y mide lo que la auditoría midió:
las 11 rutas en 375/768/1440, un solo `h1` por ruta, sin desbordamiento
horizontal, sin excepciones de página, fichas dentro de su tarjeta, ocho
ilustraciones con nombre accesible, contraste de los tokens clave, y
`prefers-reduced-motion` apagando la animación.

**Criterios de aceptación**
- `npm run verify:ui` corre contra `BASE_URL` (por defecto arranca su servidor,
- como el resto de `scripts/verify/`).
- Enumera cada comprobación con su resultado, y sale con código 1 si alguna falla.
- No mide píxeles de captura: mide DOM, estilos computados y árbol de
  accesibilidad, que es lo que se puede volver a ejecutar sin discusión.

**Verificación**
- [ ] `npm run verify:ui` → todas ok, código 0
- [ ] Romper una cosa a propósito (p. ej. quitar el `<title>` del SVG) y ver que
  el script lo detecta

**Dependencias:** ninguna. **Ámbito:** medio (1 fichero nuevo + `package.json`).

**Punto de control · Fase 0**
- [ ] `npm run build` correcto
- [ ] `verify:subida`, `verify:ui`, `verify:taller` en verde

---

### Fase 1 · Que cada máquina se distinga (bloqueo 1)

#### T1.1 — Material de referencia por modelo, con fuente

**Descripción.** Ocho fichas sin una sola foto ni plano de referencia no pueden
sostener un dibujo distintivo: lo que se dibujaría sería lo que el autor
*recuerda* de cada impresora. Esta tarea reúne, por modelo, los rasgos que la
distinguen **de las otras del catálogo** (silueta, puerta, pantalla, soporte de
bobina, extrusor, posición de la rejilla) con la fuente de cada uno. Es trabajo
del `recolector` + `cocinero`, no de esta sesión.

**Criterios de aceptación**
- Un fichero en `wiki/raw/` por fuente, y el material cocinado en
  `wiki/cooked/` con una afirmación por rasgo.
- Cada uno de los 8 modelos tiene al menos **tres** rasgos distintivos con
  fuente, o queda marcado como «sin rasgo verificado».
- Ninguna fuente es una imagen generada ni una captura de la app.

**Verificación**
- [ ] `git diff wiki/raw/` sólo añade ficheros, no modifica ninguno
- [ ] `npm run verify:fuentes` sigue en verde

**Dependencias:** ninguna. **Ámbito:** grande (8 modelos × fuentes).

---

#### T1.2 — Rasgos por modelo interpretados por `MaquinaSVG`

**Descripción.** El mapa de rasgos (`src/content/maquinas/rasgos.ts`) que
`MaquinaSVG` lee, una vez que T1.1 haya dicho qué rasgos son verdaderos. La
ilustración pasa de «tres familias» a «tres familias con variaciones por
modelo». Donde no hay rasgo verificado, el rasgo se queda en el valor neutro de
la familia y **no se inventa**.

**Criterios de aceptación**
- Dos modelos de la misma familia (SE / KE, o P1S / CORE One) no producen la
  misma firma de SVG.
- La firma se mide con marcadores estructurales (`data-rasgo`), no contando
  nodos ni píxeles.
- `MaquinaSVG.tsx` no crece más de ~80 líneas: si crece más, los rasgos salen a
  su propio componente.
- El `<title>` sigue siendo el primer hijo del `<svg>` (regresión ya corregida
  una vez).

**Verificación**
- [ ] `npm run verify:maquinas` con las comprobaciones nuevas de rasgos
- [ ] `npm run verify:ui` → las ocho ilustraciones siguen con nombre accesible
- [ ] Comprobación visual a 375 y 1440 px

**Dependencias:** T1.1 (sin rasgos verificados no hay nada que dibujar).
**Ámbito:** medio.

**Punto de control · Fase 1 (parcial)**
- [ ] Revisar con el propietario antes de seguir: el dibujo es gusto, y un
      rasgo mal puesto se ve antes que ninguna otra cosa.

---

#### T1.3 — La mecánica se mueve junta

**Descripción.** Dos pendientes conocidos de la auditoría, ambos de la
ilustración: la trayectoria del filamento es fija y no acompaña al cabezal, y
falta comprobar el movimiento relativo de cama y pórtico medido **respecto al
cabezal**, no respecto a la pantalla.

**Criterios de aceptación**
- El extremo del filamento sigue al cabezal durante el ciclo, medido en
  coordenadas del SVG a lo largo de la animación (no en un fotograma suelto).
- Cama y pórtico mantienen su unión con el cabezal en todos los fotogramas.
- `prefers-reduced-motion` deja la ilustración en un estado final coherente.

**Verificación**
- [ ] Comprobación nueva en `verify:maquinas` que recorra el ciclo y mida
- [ ] `npm run verify:ui` → movimiento reducido ok

**Dependencias:** T1.2 toca el mismo fichero; conviene ir después para no
encadenar conflictos, aunque son cambios disjuntos. **Ámbito:** medio.

---

#### T1.4 — La copia dice lo que el dibujo es

**Descripción.** Hoy la página advierte que las ilustraciones son esquemas por
familia. Cuando T1.2 aterrice, ese texto tiene que decir la verdad nueva:
qué se representa exactamente y qué no. Es una tarea de texto, no de código.

**Criterios de aceptación**
- El texto de `/maquinas` describe el nivel de fidelidad real alcanzado.
- No aparece la palabra «simulación» ni «resultado» referida a la ilustración.

**Verificación**
- [ ] Lectura en `/maquinas` a 1440 px

**Dependencias:** T1.2. **Ámbito:** pequeño.

---

### Fase 2 · Que los datos aguanten (bloqueo 2)

#### T2.1 — Revisión técnica del catálogo

**Descripción.** Las 8 fichas, campo por campo, contra las fuentes de T1.1. Lo
que no cuadre se marca `P` (pendiente) aunque sea un dato que «suena» bien. La
auditoría ya detectó errores que siguen en los datos: la A1 clasificada como
CoreXY cuando su cinemática no lo es, la AD5X con 350 °C derivados de un
firmware modificado, y camas de CoreXY que suben durante la impresión.

**Criterios de aceptación**
- Cada campo con origen `F`/`T` tiene una fuente que lo respalda, y la
  comprobación es automática (ya existe en `verify:maquinas`).
- Los campos que no cuadran pasan a `P` con `valorCampo` mostrando «—».
- Un informe en `wiki/reviews/` dice qué se cambió y qué quedó pendiente.

**Verificación**
- [ ] `npm run verify:maquinas` → 0 fallos, y el número de campos `P` es el
      esperado (se anota cuántos eran antes)
- [ ] `npm run verify:ui` → ninguna ficha muestra «pendiente» donde el valor
      debería estar

**Dependencias:** T1.1. **Ámbito:** grande.

---

#### T2.2 — Revisar las reglas, no sólo los números

**Descripción.** Dos reglas gobiernan el veredicto: el techo de boquilla y la
necesidad de cámara. La auditoría detectó que **superar el extremo alto de un
rango térmico se trata como incompatibilidad absoluta**, y que eso no está
demostrado. Hay que escribir la base física de cada regla, decir hasta dónde
llega, y ajustar los textos a lo que la regla sostiene de verdad.

**Criterios de aceptación**
- Cada regla tiene su documentación en `src/lib/maquinas.ts`: qué compara, de
  dónde sale el umbral y qué **no** afirma.
- El texto del veredicto no promete ni niega compatibilidad más allá de la
  regla.
- Las comprobaciones de `verify:maquinas` prueban la regla, y ninguna afirma
  viabilidad real de una combinación.

**Verificación**
- [ ] `npm run verify:maquinas` → 0 fallos con las reglas ajustadas
- [ ] Lectura de los veredictos en `/maquinas` con ABS y con PLA

**Dependencias:** T2.1 (no se revisan reglas sobre datos sin revisar).
**Ámbito:** medio.

---

#### T2.3 — Que la verificación no afirme más de lo que prueba

**Descripción.** Los mensajes de commit y los scripts hablan de «40
comprobaciones, cada una vista fallar». De esta sesión consta que NO se hizo
ese procedimiento completo: las pruebas verdes no demostraban validez física.
Hay que limpiar esas afirmaciones del repo.

**Criterios de aceptación**
- `grep -rn "cada una vista fallar\|40 comprobaciones"` no devuelve nada en
  `scripts/`, `docs/` ni mensajes de commit futuros.
- Lo que cada script comprueba está escrito en su cabecera, y lo que no
  comprueba también.

**Verificación**
- [ ] El grep de arriba no devuelve resultados
- [ ] `npm run verify:maquinas` sigue en verde

**Dependencias:** T2.2. **Ámbito:** pequeño.

**Punto de control · Fase 2**
- [ ] El propietario revisa el informe de `wiki/reviews/`
- [ ] Todos los verify en verde

---

### Fase 3 · Inicio y guías (prioridad media)

#### T3.1 — El inicio explica antes de pedir

**Descripción.** El h2 «Arrastra tu archivo aquí» llega antes que el h1, y la
propuesta de valor va debajo de la caja. La auditoría lo marcó como jerarquía
invertida: quien llega no sabe qué va a recibir antes de decidir si suelta el
archivo.

**Criterios de aceptación**
- El h1 y una propuesta de valor de una o dos líneas están por encima de la
  zona de subida, a 375 px y sin desplazamiento.
- Se distinguen las dos promesas: G-code → diagnóstico; STL/3MF → visor.
- La zona de subida mantiene su botón alcanzable con teclado
  (`verify:teclado`).

**Verificación**
- [ ] `npm run verify:teclado` → ok
- [ ] `npm run verify:ui` → sigue habiendo un solo h1 y sin desbordamiento

**Dependencias:** ninguna. **Ámbito:** pequeño.

---

#### T3.2 — La guía responde al cambiar una variable

**Descripción.** Marcar una variable en la guía cambia las tarjetas, pero el
recuento de acciones no se anuncia y el resultado no se enlaza desde arriba.
Quien usa el móvil tiene que recorrer la guía para descubrir si cambió algo.

**Criterios de aceptación**
- Un resumen anunciado (`role="status"`) con el número de acciones aplicables,
  que se actualiza al marcar.
- Ese resumen enlaza a la etapa de acciones.
- El texto del recuento de tarjetas sigue siendo correcto (ya corregido).

**Verificación**
- [ ] Comprobación nueva en `verify:guias`
- [ ] `npm run verify:ui` → sin desbordamiento a 375 px

**Dependencias:** ninguna. **Ámbito:** pequeño.

---

#### T3.3 — El resultado se ve antes en móvil

**Descripción.** En `/wiki/warping-pla` a 375 px, el diferencial ocupa casi una
pantalla antes del primer contenido útil.

**Criterios de aceptación**
- A 375 px, el bloque de preguntas cabe en una pantalla o se despliega sin
  esconder el h1.
- La etapa de acciones es alcanzable con un enlace desde el principio.

**Verificación**
- [ ] `npm run verify:ui` a 375 px
- [ ] Captura antes/después

**Dependencias:** T3.2 (comparten el mismo recorrido). **Ámbito:** medio.

**Punto de control · Fase 3**
- [ ] Revisión visual con el propietario de `/`, `/wiki/warping-pla`

---

### Fase 4 · Densidad y orientación (baja)

#### T4.1 — La ficha no enseña todo de golpe

**Descripción.** Las ocho fichas completas obligan a mucho desplazamiento y
repiten la etiqueta de procedencia en cada fila.

**Criterios de aceptación**
- Los campos clave (cinemática, volumen, boquilla, cama) visibles; el resto en
  un desplegable.
- Las fuentes siguen accesibles en un clic.
- El origen se sigue viendo: no se esconde el «pendiente».

**Verificación**
- [ ] `npm run verify:ui` → las fichas caben dentro de la tarjeta a 320 px
- [ ] `npm run verify:maquinas` → ok

**Dependencias:** ninguna. **Ámbito:** medio.

---

#### T4.2 — Estados vacíos con salida

**Descripción.** Proyectos e Historial explican que no hay nada, pero no
ofrecen ninguna acción local.

**Criterios de aceptación**
- Un botón que lleve a donde se puede empezar (subir archivo o ver la wiki).
- Los dos estados vacíos caben a 375 px.

**Verificación**
- [ ] `npm run verify:ui`
- [ ] Captura de `/proyectos` y `/historial` a 375 px

**Dependencias:** ninguna. **Ámbito:** pequeño.

---

#### T4.3 — Orientación dentro de `/maquinas`

**Descripción.** En `/maquinas` no queda ningún destino de la barra activo, y la
miga es la única orientación.

**Criterios de aceptación**
- Se ve dónde se está: o un destino activo, o una ubicación clara en la cabecera.
- No se añade un quinto destino a la barra salvo decisión del propietario
  (ver preguntas abiertas).

**Verificación**
- [ ] `npm run verify:ui`
- [ ] `npm run verify:teclado`

**Dependencias:** T4.1 si se toca la cabecera. **Ámbito:** pequeño.

---

#### T4.4 — Sin JavaScript, la ficha se lee

**Descripción.** La exportación estática sirve las ocho fichas y los SVG, pero
la comparación y la pausa necesitan JavaScript.

**Criterios de aceptación**
- O la página exportada muestra un estado de sólo lectura honesto, o el límite
  se dice en la interfaz.
- `verify:ui` (o `verify:seo`) comprueba que el HTML exportado contiene las
  fichas.

**Verificación**
- [ ] `npm run build` y lectura de `dist/maquinas/index.html` con JS desactivado

**Dependencias:** T4.1. **Ámbito:** pequeño.

**Punto de control · Fase 4**
- [ ] Todos los verify en verde
- [ ] Revisión del propietario

---

## 5. Orden y dependencias

```
Fase 0 (verify)          ── independiente, va primero: protege todo lo demás
   │
Fase 1 ─ T1.1 ─┬─ T1.2 ─ T1.3 ─ T1.4
   │           └─ T2.1 ─ T2.2 ─ T2.3
   │
Fase 3 (T3.1-T3.3)       ── independiente de 1 y 2, puede ir en paralelo
Fase 4 (T4.1-T4.4)       ── independiente salvo T4.4 → T4.1
```

**Lo que puede ir en paralelo:** Fase 3 y Fase 4 entre sí, y Fase 0 con
cualquiera. **Lo que no:** T1.2 y T1.3 tocan el mismo fichero; T2.x depende de
T1.1.

---

## 6. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| No se encuentran fuentes suficientes para distinguir los 8 modelos | Alto: T1.2 se dibujaría de memoria | T1.1 exige fuente por rasgo; sin fuente, el rasgo se queda neutro y se dice en la copia |
| La revisión invalida cifras ya publicadas | Medio: la ficha pierde números | Un `P` es honesto y la ficha ya sabe mostrarlo; el informe de `wiki/reviews/` lo explica |
| Esta sesión y la de anuncios/privacidad pisan los mismos ficheros | Medio: conflictos | Commits atómicos por tarea, nunca `git add -A`; `git diff` revisado antes de cada commit |
| El plan crece más que el código | Medio: nadie lo lee | Cada tarea toca como máximo 3-4 ficheros; si una tarea se pasa de medio, se parte |
| `verify:ui` se escribe para pasar | Alto: falsa red de seguridad | T0.3 exige verlo fallar rompiendo algo a propósito |

---

## 7. Preguntas abiertas

1. **¿El catálogo se valida por el pipeline de la wiki?** La recomendación del
   plan es sí (`wiki/raw/` + `wiki/cooked/` + informe en `wiki/reviews/`), porque
   es la frontera que ya sostiene la honestidad del sitio. Confirmarlo antes de
   T1.1.
2. **¿`/maquinas` entra en la barra de 4?** El plan asume que no. Si el
   propietario quiere verlo como destino principal, T4.3 cambia y hay que
   revisar la barra móvil.
3. **¿Hasta dónde llega la fidelidad?** Silueta y rasgos verificables (lo que
   pide el plan) frente a detalles menores (pantalla inclinada, logos,
   colores de chapa). Los logos de marca quedan fuera: son marca registrada.

---

## 8. Lo que este plan no cubre

- Las otras dos limitaciones que la auditoría **no** pudo verificar: los
  límites de almacenamiento (los datos viven en el navegador) y que un análisis
  guardado no se reabre en el visor. Son de tamaño mayor y necesitan su propio
  plan.
- Accesibilidad más allá de lo medido: no se ha probado con lector de pantalla
  real, y este plan no lo incluye.
- El contenido editorial de la wiki: va por el pipeline,no por aquí.
