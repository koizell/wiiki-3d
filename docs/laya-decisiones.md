# Registro de decisiones de Laya

> **Qué es esto.** Cada vez que Laya (el clasificador System 1 que decide en este
> proyecto) contesta algo que influye en una decisión, se anota aquí: qué se le
> preguntó, qué contestó, con qué probabilidad y con qué confianza, y **si la
> respuesta se acepta o se descarta**.
>
> **Por qué existe.** Laya es útil en algunas cosas y una fuente de errores en
> otras, y sin registro no hay forma de saber cuál es cuál. La regla general
> está en el plan 60 (§3.2): **la política escrita gana siempre**.
>
> **Formato de una fila.** Ítem · la pregunta · lo que contestó Laya · `p` ·
> `conf` · **la regla que manda** · aceptado o descartado.
>
> **Cómo se llama.** `laya_predict` con el modelo `laya-multilingual`, contra el
> servidor local (`npx laya-system-one --port 8080`). Cada llamada tarda ~1,5 s.

---

## Las tres reglas

1. **La política escrita gana.** Si Laya contradice una regla del repo (la
   congelación de anuncios, la inmutabilidad de `wiki/raw/`, el pipeline de
   contenido), la regla manda y la contradicción se anota como *descartada por
   regla*.
2. **El estado es por ítem, nunca global.** El error más caro medido: un estado
   que menciona «esperar a la aprobación de AdSense» hace que Laya espere
   casi todo. Ver §El sesgo del marco.
3. **La confianza decide si se lee, no si se decide.** Ver §La confianza no es
   el acierto: es la corrección más importante de este registro.

---

## La confianza no es el acierto

**Es la corrección más importante de este registro, y salió de la segunda medición.**

La primera pasada dejó la regla «con `conf ≥ 0,6` la respuesta se usa como señal».
La segunda la desmontó. Estas son las respuestas con su confianza, y si son
ciertas:

| Respuesta | `conf` | ¿Cierta? |
|---|---:|---|
| C5 · rendimiento «roza la privacidad» → **sí** | **0,819** | **No.** Partir el bundle no cambia el tratamiento de datos de nadie |
| C3 · imágenes «roza la privacidad» → **no** | 0,659 | Sí |
| C1b · TPU «puede publicarse ya» → **no** | 0,591 | **No.** Escribir una guía no depende de ningún permiso |
| C6 · medición «puede publicarse ya» → **no** | 0,362 | **No.** Los eventos de GA4 no dependen de ningún permiso |
| C7 · Laya en producción «puede publicarse ya» → **sí** | 0,414 | **No:** depende de un VPS y de actualizar la privacidad antes |
| C1c · z-seam «puede publicarse ya» → **no** | 0,341 | **No** |

**La confianza más alta de la tabla es la que más se aleja de la realidad.** La
pregunta `¿puede publicarse ya?` falla en 5 de 7 ítems, y falla en las dos
direcciones: dice que no se puede publicar contenido (que no depende de nadie) y
que sí se puede publicar lo que depende de un servidor y de un cambio legal.

**Lo que cambia con esto.** La confianza ya no decide: decide **si se lee**. Con
`conf ≥ 0,6` la señal se lee y se contrasta con la regla escrita; con `conf < 0,6`
se lee sólo si hay una regla en juego. **Ninguna decisión sale de la confianza.**

Y hay una consecuencia práctica: la pregunta `¿puede publicarse ya?` **no se usa
para decidir**, ni siquiera con confianza alta. La congelación de la revisión
(F1) y la regla de privacidad (F5) son reglas escritas, y punto.

---

## Ciclo C1 · Segunda medición de la cola (2026-10-19, después de la primera guía)

Misma pregunta, misma estructura, estado por ítem. La cola había cambiado: ya
no era la del plan 60 al empezar, sino la que queda después de publicar
`secar-filamento`.

| Ítem | `puede_publicarse_ya` | `conf` | `roza_privacidad` | `conf` | La regla que manda | Decisión |
|---|---|---:|---|---:|---|---|
| C1b · TPU | no (0,918) | 0,591 | no (0,614) | 0,038 | No depende de ningún permiso | **Descartada** |
| C1c · z-seam | no (0,829) | 0,341 | sí (0,570) | 0,014 | No depende de ningún permiso | **Descartada** |
| C2 · profundizar 4 guías | sí (0,604) | 0,032 | sí (0,832) | 0,346 | No depende de ningún permiso | **Descartada** |
| C3 · imágenes | no (0,627) | 0,047 | no (0,936) | 0,659 | No dependen de ningún permiso | **Descartada** |
| C5 · rendimiento | sí (0,881) | 0,475 | **sí (0,973)** | **0,819** | No cambia el tratamiento de datos | **Descartada.** La más confidentemente equivocada |
| C6 · medición | no (0,838) | 0,362 | no (0,618) | 0,041 | No depende de ningún permiso | **Descartada** |
| C7 · Laya en producción | **sí (0,859)** | 0,414 | sí (0,909) | 0,561 | Depende de un VPS **y** de la privacidad | **Descartada.** Falso positivo en las dos preguntas |

**Siete de siete descartadas.** Ninguna decisión de este ciclo salió de Laya, y
ninguna habría salido bien si hubiera salido: la regla escrita es la que ha
decidido el orden del lote.

Lo que sí queda de Laya en este ciclo: la **pregunta por la privacidad** acierta
cuando la respuesta es «no» y el trabajo es claramente interno (C3, con 0,659), y
por eso esa señal se usa para **marcar** los ciclos C5 y C7 como «a mirar», no
para clasificarlos.

---

## Ciclo C0 · Re-clasificación de la cola (2026-10-19)

La cola de ciclos del plan 60 (§4) re-clasificada al empezar C0. Cada ítem con
su propia regla y su propio estado, sin marco global.

| Ítem | Pregunta | Laya | `p` | `conf` | La regla que manda | Decisión |
|---|---|---|---|---|---|---|
| C1 · contenido (2–3 guías) | ¿puede publicarse ya? | **no** | 0,846 | 0,381 | No depende de ningún permiso externo | **Descartada.** Escribir contenido no espera a nadie |
| C1 · contenido | ¿roza la privacidad? | sí | 0,854 | 0,400 | No cambian datos ni tratamiento | **Descartada.** Publicar una guía no manda datos |
| C2 · profundizar 4 guías | ¿puede publicarse ya? | sí | 0,844 | 0,375 | Ídem | Aceptada |
| C2 · profundizar | ¿roza la privacidad? | sí | 0,539 | 0,004 | Ídem | **Descartada.** `conf` 0,004: no es información |
| C3 · imágenes | ¿puede publicarse ya? | sí | 0,887 | 0,491 | Las ilustraciones no dependen de permisos | Aceptada |
| C3 · imágenes | ¿roza la privacidad? | no | 0,851 | 0,392 | Ídem | Aceptada |
| C4 · calidad y deuda técnica | ¿puede publicarse ya? | **no** | 0,927 | **0,624** | Una auditoría de accesibilidad no depende de permisos | **Descartada.** Error con confianza alta |
| C5 · rendimiento | ¿cambia lo que carga? | no | 0,609 | 0,035 | Sí: cambia el peso de la primera carga | **Descartada.** `conf` 0,035 |
| C5 · rendimiento | ¿roza la privacidad? | sí | 0,902 | 0,538 | No: cargar menos peso no cambia el tratamiento de datos | **Descartada.** Falso positivo |
| C6 · medición (GA4) | ¿puede publicarse ya? | sí | 0,811 | 0,301 | GA4 ya está en modo consentido denegado | Aceptada |
| C6 · medición | ¿roza la privacidad? | sí | 0,867 | 0,435 | No: los eventos no cambian el tratamiento | **Descartada.** Laya se contradice (ver abajo) |
| C7 · Laya en producción | ¿puede publicarse ya? | no | 0,779 | 0,238 | Depende de un VPS y de actualizar la privacidad | Aceptada |
| C7 · Laya en producción | ¿roza la privacidad? | **no** | 0,878 | 0,464 | **Sí**: mandar el archivo a un servidor propio cambia el tratamiento | **Descartada.** Falso negativo en la pregunta clave |
| C8 · monetización | ¿puede publicarse ya? | **sí** | 0,887 | 0,490 | **No**: los anuncios esperan a la aprobación (F1) | **Descartada.** Es el error más grave de la tabla |
| C8 · monetización | ¿roza la privacidad? | sí | 0,909 | 0,560 | Sí: la privacidad tiene que declarar publicidad activa | Aceptada |

### Lo que la tabla deja claro

1. **La pregunta `¿puede publicarse ya?` es la que peor se comporta justo donde
   importa.** Contesta «no» al contenido (que no espera a nadie) y «sí» a los
   anuncios (que esperan a una aprobación). La regla escrita corrige los dos
   casos, pero el aviso importa: **ninguna decisión de este proyecto puede
   depender de esa pregunta**.
2. **La confianza no salvó el caso de C4.** `conf` 0,624 —la más alta de la
   tabla— sobre una respuesta equivocada. La confianza de Laya mide su
   coherencia interna, no su acierto: para eso hay que compararla con la
   verdad, que en este repo son las reglas escritas.
3. **Laya se contradice entre pasadas.** Sobre C6 (`GA4-RETAIN`) la pregunta
   `¿roza la privacidad?` dio **no** con `conf` 0,752 en la clasificación del
   19 de octubre del plan 60, y **sí** con `conf` 0,435 aquí. Misma pregunta,
   mismo ítem, dos respuestas. Cuando dos pasadas se contradicen, gana la regla.

### El sesgo del marco

La primera clasificación del plan 60 (16 ítems, marco explícito de «revisión de
AdSense en marcha») devolvió «esperar» en 8 de 16, incluidos dos casos que no
dependen de AdSense:

| Ítem | Respuesta con marco | `p` | `conf` | Realidad |
|---|---|---|---|---|
| `GUIA-LOTE` | esperar | 0,758 | 0,410 | Escribir contenido no depende de ningún permiso |
| `GUIA-PROFUNDIZAR` | esperar | 0,771 | 0,431 | Ídem |
| `GA4-RETAIN` | esperar | 0,616 | 0,219 | Los eventos de GA4 no cambian la privacidad |

La causa no es el modelo: es que el estado llevaba el marco. **Por eso el
protocolo manda estados por ítem con su propia regla**, y por eso la pregunta
de orden entre ciclos (`¿qué ciclo va primero?`, 7 opciones, estado neutro) dio
una confianza de 0,136 y 0,174 con la distribución plana: no discrimina. El
orden de los ciclos lo pone la dependencia y el riesgo, no Laya.

---

## Qué sí es útil de Laya

Medido en 5 llamadas con 16 ítems: sirve cuando la pregunta es **binaria**, el
estado es **del ítem**, y la respuesta se **contrasta con una regla escrita**.
Las señales que se aceptaron sin más (todas con `conf ≥ 0,6` y coherentes con
la regla):

| Señal | `conf` | Uso en el plan 60 |
|---|---|---|
| Las imágenes no cambian lo que ve el visitante | 0,399–0,710 | C3 se puede hacer ya |
| Las fotos propias no dependen de ningún permiso | 0,751 | C3 |
| El bundle se puede tocar | 0,727 | C5, con medición antes/después |
| Los metadatos estructurados son cambio visible | 0,862 | Se miden, no se viven |
| Leer las consultas de GSC es decisión de contenido | 0,696 | C6 |
| Los eventos de GA4 con consentimiento denegado no tocan la privacidad | 0,752 | C6 |

---

## Cómo se rellena este fichero

Al empezar cada ciclo:

1. Se re-clasifica la cola con `laya_predict`, estado por ítem.
2. Se anota la tabla de arriba con `p`, `conf` y la decisión.
3. Cada decisión que se descarte dice **qué regla** la descartó.

Al terminar cada ciclo:

4. Una fila más con lo que cambió: qué se hizo, qué se movió de sitio en la
   cola, y si alguna respuesta de Laya dejó de servir.
