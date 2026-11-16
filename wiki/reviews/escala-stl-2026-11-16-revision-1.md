# Revisión de escala-stl

**Veredicto: RECHAZADO** — 1 fallo bloqueante y 1 importante.
**Iteración:** 1 de 2  
**Fecha:** 2026-11-16

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | FALLA — se confunde la unidad de referencia con la del archivo y falta un procedimiento de decisión para programas actuales |
| 2 | Afirmaciones con respaldo | FALLA — una condición de aplicación excede la fuente |
| 3 | Atribución y grado de certeza | PASA |
| 4 | Coherencia y cobertura | FALLA — una regla se activa sin haber declarado su requisito |
| 5 | Enlaces, slugs y fechas | PASA — registro y autor comprobados; sin versión anterior aportada para comparar contenido |
| 6 | Valor original y relleno | PASA — tarjetas y cálculos específicos, aunque la cobertura práctica sea insuficiente |

## Fallos

### 1 · Bloqueante · La unidad de una referencia no determina la unidad de las coordenadas

**Dónde:** variable `unidad`, opción `pulgadas`, y regla `importar-prusa`, condición `cuando`.

**Dice:** «Conozco la medida en pulgadas» activa «Usa la importación imperial sólo si conoces la unidad» para `prusa23`. La regla convierte el STL al importar.

**Fuente declarada:** A-004, `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`, líneas 24–28: «Importing STLs saved in inches»; la fuente distingue además la reversión cuando se importó como imperial un objeto en mm.

**Por qué falla:** conocer una medida externa en pulgadas no significa que el archivo tenga coordenadas pretendidas en pulgadas. Por ejemplo, una pieza de referencia de 1 pulgada puede estar correctamente representada por 25,4 unidades pensadas como mm. La condición cumple la regla aun en ese caso y ofrece una importación que multiplicaría innecesariamente su tamaño. Contradice la cautela de A-001 y de la propia guía sobre no inferir unidades automáticamente.

**Qué hacer:** separar la unidad de la medida de referencia de la interpretación comprobada de las coordenadas del archivo; condicionar la importación imperial a esta última y explicar cómo comparar antes de convertir, sin acumular conversiones.

### 2 · Importante · El recorrido habitual no permite completar la decisión del brief

**Dónde:** opciones `programa: otro` y `programa: cura`; reglas `pulgadas-a-mm`, `mm-a-pulgadas` y `comprobar-espacio`; `fueraDeAlcance`.

**Dice:** el objetivo es «comprueba su tamaño frente al espacio disponible», pero para `otro` no aparece ninguna regla de medición o comprobación del espacio; para Cura sólo aparece la comprobación del espacio. Las conversiones convierten la referencia, sin explicar cómo contrastarla con la medida mostrada ni qué decisión tomar cuando coincide o difiere. Las instrucciones de Prusa se limitan a dos alfas históricas.

**Fuente declarada:** A-007/A-011/A-013; `wiki/cooked/escala-stl.md`, huecos H-002 y H-003. Las fuentes crudas correspondientes describen capacidades concretas, no una secuencia comprobada para programas actuales en general.

**Por qué falla:** el brief pide una guía práctica que ayude a interpretar el STL y decidir si cabe, con instrucciones específicas de versión. Declarar el hueco evita inventar controles, pero no proporciona un recorrido verificable para quien usa otro programa o una versión actual. Tampoco se explica cómo pasar de la comparación de una medida a una decisión de escala sin asumir la unidad.

**Qué hacer:** aportar y cocinar documentación local verificable de un programa y versión actuales para medición y escala, o acordar un alcance más estrecho en el brief; describir la comparación de la misma dimensión y la decisión sin presentar una heurística como prueba. Mantener explícito que giro y corte no garantizan encaje.

## Notas que no bloquean

- Se han contrastado las siete fuentes crudas citadas por el cooked. Las seis citas textuales de las tarjetas aparecen en las fuentes y están correctamente atribuidas. Las equivalencias de longitud y sus sentidos de conversión son correctos; la reducción uniforme de espesores es una inferencia geométrica identificada en I-002.
- La oferta por tamaño de PrusaSlicer se presenta como oferta histórica, no como prueba; no se inventan umbrales de la herramienta. El corte no se presenta como garantía, ni se atribuye a la rotación del plano de corte una rotación general del objeto.
- Las condiciones usan opciones existentes y son alcanzables; las tres variables modifican la selección. `tolerancias-y-encaje` existe en el registro, y la guía usa `AUTOR`. No se ha encontrado revisión anterior de este slug ni se dispone aquí de una versión anterior del contenido para verificar por comparación el cambio de fecha.
- Los límites de Simplify3D sin versión y Cura sin versión se reconocen; las dos alfas se identifican como históricas. Los casos fuera de alcance explican sus límites, aunque los que no tienen guía de destino tampoco ofrecen una alternativa concreta.
