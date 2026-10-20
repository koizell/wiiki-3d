# Brief — `tpu-flexible`

Fecha: 2026-10-19. Fase de ingesta, lote 1 del ciclo C1, **segunda guía del lote**.
Modo: `ingest`.

## Decisión editorial

**Pregunta:** qué cambia cuando el filamento es flexible —qué impresora sirve, qué
ajustes hay que cambiar y qué falla de otra manera— y cuándo un TPU no se puede
imprimir en la máquina que se tiene.

**Público:** quien ha comprado un TPU, ha visto al extrusor hacer ruidos raros o ha
tenido atascos, o tiene una impresora de husillo (bowden) y no sabe si su máquina
puede con el filamento flexible.

**Alcance:** los filamentos flexibles —TPU 95A, 85A, 90A y sus diferencias—: **requisitos
de la máquina**, **ajustes** y **síntomas propios del material**. **Quedan fuera:** el
material en su conjunto (→ `material`), el secado (→ `secar-filamento`), la retracción en
general (→ `stringing`), el flujo (→ `flow-rate`), el warping (→ `warping-pla`) y las
juntas entre capas (→ `separaciones-entre-capas`).

**Decisión que el lector debe poder tomar:** si su impresora puede imprimir TPU, y qué
tiene que cambiar de la máquina y del perfil para que salga bien.

**Producto principal:** una matriz **variante de TPU ↔ máquina y ajustes**, más un
diferencial que separa «es el TPU» de «es el ajuste» o «es la máquina».

## Estructura

1. **Diferencial.** El material frente al ajuste: una pieza flexible que sale con capas
   separadas frente a una que sale con flujo irregular. `siNo` → `secar-filamento` (si
   sospechas de humedad) o → `stringing` (si el problema son los hilos).
2. **Variables.** Propuesta: `maquina` (bowden o extrusor directo) y `sintoma` (el ruido
   del extrusor, el atasco, la pieza blanda o con capas separadas). `verify:guias`
   rechaza cualquiera que sea decorativa: si una variable no cambia ninguna regla, no
   se declara.
3. **Conocimiento.** Qué es un TPU y qué lo distingue (flexibilidad, dureza, Shore);
   las variantes y lo que cambia entre ellas; **qué impresora necesita** cada una y
   por qué (trazado del filamento, engranajes, separación); los ajustes que el material
   pide (velocidad, retracción, temperatura) y los que no.
4. **Reglas.** Qué hacer según la máquina y el síntoma: qué ajuste bajar, cuándo el
   atasco es del material y cuándo es de la máquina, y cuándo la respuesta es que ese
   TPU no es para esa impresora.
5. **Fuera de alcance.** Los seis destinos de arriba.

## Campo del panel: ninguno, y una variable que lee `material`

`material` **ya está tomado** por la guía `material` en `src/lib/wiki-campos.ts`, y un
campo no puede apuntar a dos guías (`verify:wiki` lo comprueba). Esta guía **no** entra
en `CAMPOS_WIKI`.

Como `secar-filamento`, su variable `material` declara `leeDelAnalisis: ['material']` y
`campos: ['material']`, con lo que la barra «Tu archivo» enseña el material del G-code
y lo lleva a la explicación de esta guía.

## Fuentes

**Dos reutilizadas**, que ya están en `wiki/raw/` y **no se vuelven a descargar**:

| URL | Estado | Qué trae |
|---|---|---|
| `https://help.prusa3d.com/article/prusament-tpu-95a-material-guide_899653` | Ya en `wiki/raw/` (`slicer-prusa-kb-prusament-tpu-95a-material-guide.md`) | Requisitos de impresora, hojas de superficie recomendadas, preparación de la superficie y resolución de problemas del TPU 95A de Prusament |
| `https://wiki.bambulab.com/en/general/filament-guide-material-table` | Ya en `wiki/raw/` (`material-bambulab-material-table.md`) | Las filas de TPU 95A / 85A / 90A / TPU para AMS: compatibilidad con el AMS, con la cámara y con el extrusor directo, y la temperatura de boquilla 200–250 °C |

El recolector debe **buscar más** dentro de los dos dominios registrados
(`wiki.bambulab.com` y `help.prusa3d.com`) hasta llegar a **3–5 fuentes nuevas**, y
buscarlas sobre todo:

- Una fuente del KB de Prusa sobre **materiales flexibles en general** o sobre otro
  TPU, con sus ajustes concretos.
- Una fuente de Bambu sobre **TPU y su AMS**, o sobre los **materiales flexibles** y
  qué limitaciones tienen en un equipo de Bambu.
- Si aparece, una fuente que diga **qué materiales no se pueden usar con el AMS** y
  por qué, que es una limitación de la máquina y no del filamento.

Las candidatas URLs hay que **verificarlas antes**: un 200 con cuerpo vacío no es una
página (el KB de Prusa se sirve como aplicación React y su texto vive en un
`<div hidden id="S:1">`; mirar el HTML servido antes de dar una fuente por vacía).

## Gate específico de este tema

Además de las reglas del plan:

1. **El TPU no es un material con otros números: es un material con otras
   exigencias.** Lo que hay que publicar es el requisito de máquina (trazado,
   engranajes, extrusor directo) y no un ajuste de temperatura más.
2. **«Shore» es una cifra con significación propia.** Si una fuente da 95A, 85A o 90A,
   se publica con su fuente y se explica qué significa; no se convierte en «más
   flexible» sin más.
3. **Una limitación del AMS no es una limitación del TPU.** Que el AMS no funcione con
   TPU es una limitación del aparato. Lo mismo con un límite de temperatura del
   carrete o del engranaje.
4. **La retracción con material flexible es un caso aparte, no un número menor.**
   Si una fuente dice que hay que desactivar la retracción, se publica así; no se
   publica «baja la retracción a 0,2 mm».
5. **Ninguna cifra de cama, de boquilla de impresión ni de secado se repite aquí**
   sin su fuente: la temperatura de boquilla 200–250 °C sale de la tabla de Bambu y
   se publica con ella; el secado va a `secar-filamento`.
6. **No se generaliza a partir de un solo material.** Si las fuentes sólo hablan del
   Prusament TPU 95A, eso es lo que se publica, y lo que no se sabe de las demás
   variantes se declara.

## Lo que esta guía NO debe ser

Una tabla de temperaturas del TPU. El valor está en **decidir**: ¿mi impresora puede
con este filamento?, ¿qué le tengo que cambiar?, y si el fallo es del material o del
ajuste.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. Una TPU 95A en una impresora con extrusor bowden que se atasca en la primera capa.
2. Un TPU que se imprime con un ruido de extrusor y sale con las capas separadas.
3. Alguien con un AMS que mete TPU y la máquina no lo acepta.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página
permita decidir, o que diga con claridad que no hay evidencia suficiente.
