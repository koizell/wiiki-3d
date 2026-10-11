# Brief — `material`

Fecha: 2026-10-08. Fase de ingesta, sexto tema. Modo: `ingest`.

## Decisión editorial

**Pregunta:** qué cambia entre un filamento y otro —qué se contrae, cuál bebe humedad,
cuál pide cámara— y cuándo el material es la causa del problema y cuándo no.

**Público:** quien tiene una bobina y quiere saber qué esperar de ella antes de culpar al
slicer, o quien va a elegir material para una pieza y no sabe qué se juega.

**Alcance:** la **matriz de materiales** —contracción, humedad, temperaturas y para qué
sirve cada familia— y el material como causa de un fallo. **Quedan fuera:** la cifra de
cama concreta (→ `temperatura-cama`), el warping (→ `warping-pla`), la cámara y el
heat creep (→ `enclosure-y-warping`), y la temperatura de boquilla (→ `temperatura-hotend`,
todavía sin escribir).

**Decisión que el lector debe poder tomar:** si su problema es del material o de otra
cosa, y qué material le conviene para lo que va a imprimir.

**Producto principal:** matriz contextual —material → qué se contrae, si bebe humedad, qué
temperatura pide— **más** un diferencial que separa «es el material» de «es el ajuste».

## Estructura

1. **Diferencial.** El material frente al ajuste: una pieza que sale mal por humedad o por
   contracción frente a una que sale mal por cama o por extrusión. `siNo` → `warping-pla`.
2. **Variables.** Propuesta: `material` (necesaria) y una o dos más que de verdad cambien
   el resultado —`problema` y/o `pieza`—. `verify:guias` rechaza cualquiera que sea
   decorativa; el redactor quita la que no cambie nada.
3. **Conocimiento.** La matriz por familia (PLA, PETG, ABS/ASA, PC, PA, TPU), el orden de
   contracción, qué materiales beben humedad y cuáles no, y para qué sirve cada uno.
4. **Reglas.** Qué hacer según el material y el síntoma: secar, cambiar de material para
   una pieza grande, elegir uno u otro para una aplicación.
5. **Fuera de alcance.** Los cuatro destinos de arriba.

## Campo del panel: `material` (obligatorio)

`material` es **obligatorio** en `ProjectMetadata`, así que la guía **no** lleva sección de
«por qué puede faltar». Declara `campos: ['material']` y su entrada en `src/lib/wiki-campos.ts`
para que el panel enlace a ella. Es el único campo que esta guía explica.

## Fuentes

Cuatro candidatas, todas verificadas hoy (200 y con cuerpo real) y dentro de las rutas
permitidas de `wiki.bambulab.com`:

| URL | Qué trae |
|---|---|
| `https://wiki.bambulab.com/en/general/filament-guide-material-table` | La tabla de 26 filas: cama, boquilla y cámara por material |
| `https://wiki.bambulab.com/en/knowledge-sharing/filament-guide-beginners` | Qué es cada familia y para qué sirve |
| `https://wiki.bambulab.com/en/knowledge-sharing/3d-prints-shrinkage` | Contracción: causas y qué materiales se contraen |
| `https://wiki.bambulab.com/en/filament-acc/filament/dry-filament` | Secado: qué materiales beben humedad y cómo secarlos |

El recolector puede añadir alguna más de los **dos dominios registrados**
(`wiki.bambulab.com` y `help.prusa3d.com`); no de foros ni de otros sitios, que no están
en `wiki/policy/sources.json`.

## Gate específico de este tema

Además de las reglas del plan:

1. **El orden de contracción es una afirmación de ranking, no una ley.** Si la fuente lo da
   como orden, se publica como orden; no se convierte en porcentajes que nadie midió.
2. **«Bebe humedad» no es «está húmedo».** Un material higroscópico no está húmedo por
   serlo; hay que secarlo, y el síntoma es concreto (chasquidos, burbujas).
3. **Ninguna cifra de temperatura de cama se repite aquí.** Esa es de `temperatura-cama`;
   esta guía dice qué material pide cámara o secado, no el número de cama.
4. **Una familia no es un material.** ABS y ASA comparten fila en la tabla de Bambu; PLA y
   PLA-CF también. No se inventan diferencias que la fuente no da.
5. **Para qué sirve cada material es del fabricante, no nuestro.** Si la fuente no dice
   para qué sirve el PC, no se escribe.

## Lo que esta guía NO debe ser

Un catálogo de fichas de producto. El valor está en que la matriz permita **decidir** —qué
material para qué, y si el que tienes es la causa— no en repetir la tabla del fabricante.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. PETG recién sacado de la caja que hace chasquidos y sale con burbujas.
2. Una pieza grande y plana en ABS que se levanta por las esquinas.
3. Elegir entre PLA y PETG para una pieza que va a estar al sol.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir, o que diga con claridad que no hay evidencia suficiente.
