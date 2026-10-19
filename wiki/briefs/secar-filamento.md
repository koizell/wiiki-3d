# Brief — `secar-filamento`

Fecha: 2026-10-19. Fase de ingesta, lote 1 del ciclo C1. Modo: `ingest`.

## Decisión editorial

**Pregunta:** cuándo hay que secar el filamento, cómo se seca, con qué método y a qué
temperatura — y cómo se distingue «mi filamento está húmedo» de «mis ajustes están
mal».

**Público:** quien imprime PETG, PA, TPU o ABS y ve burbujas, chasquidos, hilos, una
superficie rugosa o una pieza más débil de lo esperado; o quien tiene la bobina abierta
desde hace meses y no sabe si eso importa.

**Alcance:** el secado —**cuándo**, **con qué método**, **a qué temperatura**, **cuánto
tiempo**— y **cómo se reconoce la humedad**. **Quedan fuera:** el material en sí y su
matriz (→ `material`), la retracción y los hilos (→ `stringing`), el flujo y la
subextrusión (→ `flow-rate`), la temperatura de boquilla (→ `temperatura-hotend`), la
temperatura de cama (→ `temperatura-cama`) y la warping (→ `warping-pla`).

**Decisión que el lector debe poder tomar:** si secar el filamento le va a resolver el
síntoma que ve, y con qué método y a qué temperatura concrete. Y si el síntoma no es
humedad, que se vaya a otra guía sin perder el tiempo.

**Producto principal:** una matriz **material → método y temperatura de secado**, más un
diferencial que separa «está húmedo» de «está mal ajustado».

## Estructura

1. **Diferencial.** Humedad contra ajuste: una pieza con burbujas y chasquidos frente a
   una con líneas finas y huecos. `siNo` → `flow-rate` (si el síntoma son huecos) o
   → `stringing` (si son hilos).
2. **Variables.** Propuesta: `material` (necesaria) y `sintoma` (qué se ve: burbujas,
   chasquidos, hilos, superficie rugosa). `verify:guias` rechaza cualquiera que sea
   decorativa: si una variable no cambia ninguna regla, no se declara.
3. **Conocimiento.** Qué materiales absorben humedad y a qué velocidad; qué hace la
   humedad dentro de la boquilla (vaporiza y expande el filamento); la tabla de
   temperatura y tiempo de secado por material y por método (AMS, horno, secadora);
   y cómo se guarda el filamento para que no vuelva a cogerl.
4. **Reglas.** Qué hacer según el material y el síntoma: secar o no, con qué método, a
   qué temperatura, cuánto tiempo, y qué comprobar después.
5. **Fuera de alcance.** Los seis destinos de arriba.

## Campo del panel: ninguno, y una variable que lee `material`

`material` **ya está tomado** por la guía `material` en `src/lib/wiki-campos.ts`, y un
campo no puede apuntar a dos guías (`verify:wiki` lo comprueba). Esta guía **no** entra
en `CAMPOS_WIKI`.

Lo que sí hace es **leer el material del archivo**: su variable `material` declara
`leeDelAnalisis: ['material']` y `campos: ['material']`, con lo que la barra «Tu
archivo» enseña el material de tu G-code y lo lleva a la explicación de esta guía. Es el
mismo mecanismo que usa `temperatura-cama` con `material`.

## Fuentes

**Una reutilizada**, que ya está en `wiki/raw/` y **no se vuelve a descargar**:

| URL | Estado | Qué trae |
|---|---|---|
| `https://wiki.bambulab.com/en/filament-acc/filament/dry-filament` | Ya en `wiki/raw/` (`material-bambulab-drying.md`) | Qué pasa cuando la humedad se vaporiza en la boquilla; la tabla de temperatura y tiempo por material; los tres métodos (AMS HT, AMS 2 Pro, horno) y sus límites; el protocolo del horno y del secado en cama; los avisos de seguridad; y que los materiales PA se beben humedad «en unos 3 meses» |

El recolector debe **buscar más** dentro de los dos dominios registrados
(`wiki.bambulab.com` y `help.prusa3d.com`) hasta llegar a **3–5 fuentes nuevas**, y
buscarlas sobre todo:

- Una fuente de **Prusa** sobre secado (el KB de Prusa tiene material de filamento:
  qué materiales se secan, a qué temperatura y cuánto tiempo).
- Una fuente que diga **qué materiales no necesitan secado** o los secan a una
  temperatura distinta, para que la tabla no sea «todo se seca igual».
- Si aparece, una fuente sobre **cómo se guarda** el filamento después de secarlo
  (bolsa al vacío, desecante), que es la mitad del problema y la que más se olvida.

Las candidatas URLs hay que **verificarlas antes**: un 200 con cuerpo vacío no es una
página (el KB de Prusa se sirve como aplicación React y su texto vive en un
`<div hidden id="S:1">`; mirar el HTML servido antes de dar una fuente por vacía).

## Gate específico de este tema

Además de las reglas del plan:

1. **La temperatura de secado no es la temperatura de impresión.** Son dos números
   distintos con dos fuentes distintas, y confundirlos es el error más fácil de
   cometer. Si un material se imprime a 240 °C y se seca a 55 °C, se publica así.
2. **«Higroscópico» no es «está húmedo».** Un material que puede beberse humedad no
   está húmedo por serlo. La guía dice qué material puede cogerl y cómo se nota; no
   afirma que el filamento de quien lee lo está.
3. **El tiempo de secado sólo se publica si la fuente lo da.** Si la fuente da
   temperatura y no tiempo, se publica la temperatura y se dice que el tiempo depende
   del método. No se rellena con un número plausible.
4. **Un límite de un dispositivo no es una propiedad del material.** «El AMS 2 Pro no
   seca el ABS» se publica como lo que es: el dispositivo no llega a 65 °C. No como
   «el ABS no se puede secar».
5. **Ninguna cifra de cama ni de boquilla de impresión se repite aquí**, salvo la
   temperatura de secado, que es de este tema.
6. **La humedad no explica el warping.** Si una fuente relaciona los dos, se publica el
   matiz; no se insinúa que secar la bobina arregla las esquinas levantadas.

## Lo que esta guía NO debe ser

Un recetario de horno. El valor está en **decidir**: ¿esto es humedad?, ¿hay que
secarlo?, ¿con qué método y a qué temperatura?, y si la respuesta es «no es humedad»,
que la guía te diga a dónde ir.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. PETG recién salido de la caja con burbujas y chasquidos en la boquilla.
2. PA (nylon) abierto desde hace cuatro meses, con una pieza que saleraisingarda y con
   hilos.
3. Una bobina de PLA de hace un mes, sellada en su bolsa, con una pieza que sale con
   líneas finas y huecos.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir, o que diga con claridad que no hay evidencia suficiente.
