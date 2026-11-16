# Revisión de escala-stl

**Veredicto: APROBADO**  
**Iteración:** 4, tras ajuste de alcance autorizado.  
**Fecha:** 2026-11-16

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | PASA — cumple el alcance ajustado y declara que no se ha verificado un recorrido completo |
| 2 | Afirmaciones con respaldo | PASA — datos y citas contrastados con las fuentes crudas |
| 3 | Atribución y grado de certeza | PASA — versiones, límites e inferencias identificados |
| 4 | Coherencia y cobertura | PASA — resuelta la contradicción de la revisión 3 |
| 5 | Enlaces, slugs y fechas | PASA |
| 6 | Valor original y relleno | PASA — comparación, conversión, factor y límites concretos |

## Resolución del fallo anterior

La regla `buscar-referencia` ya no afirma que sea imposible determinar la unidad pretendida sin una medida dimensional. Ahora dice: «Sin una medida de referencia no puedes comparar esa dimensión; podría existir otra evidencia independiente sobre las unidades pretendidas de las coordenadas». Esto distingue la falta de medida de la falta de evidencia, sin atribuir a A-001 una imposibilidad que `wiki/raw/escala-stl-shapr3d-3mf-2026-11-16.md`, líneas 20–23, no establece.

Para `unidad: desconocida`, `comparacion: imperial-pendiente` y `programa: prusa23`, aparecen tanto la búsqueda de referencia como la importación imperial acreditada; ya no se contradicen. La fuente `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`, líneas 24–28, respalda esa importación para coordenadas pretendidas en pulgadas y la posibilidad de revertirla.

## Notas que no bloquean

- En el motor, las opciones de `comparacion` son excluyentes: importación pendiente, nueva medición, coincidencia y cálculo de factor no activan entre sí recomendaciones incompatibles. El factor y la coincidencia requieren una referencia declarada; después de convertir o escalar se pide volver a medir y actualizar el estado. Esa actualización depende de la persona, no de una detección automática del programa.
- Se contrastaron las afirmaciones y las siete citas de las tarjetas con las fuentes crudas citadas; la equivalencia de 25,4 mm y ambos sentidos de conversión son correctos. El factor deseado/actual es una inferencia geométrica condicionada a la misma dimensión y unidad y a una medición actual positiva.
- Las alfas de Prusa están acotadas a su versión; las fuentes de OrcaSlicer, Simplify3D y Cura no se presentan como una versión concreta. Ni las inferencias ni la documentación parcial se ofrecen como prueba de un recorrido completo. El ajuste del brief no exige esa prueba.
- La guía no trata una oferta por tamaño como prueba de unidades ni promete que girar o cortar garantice que la pieza quepa o encaje. El ejemplo de pared es una posibilidad, no un umbral universal. `fueraDeAlcance` remite el encaje a la guía registrada y declara los demás límites.
- `escala-stl` y `tolerancias-y-encaje` constan en el registro; la autoría procede de `autor.ts`. La fecha coincide con el brief y el texto de la regla cambió respecto a la revisión 3. H-002 del cooked ya refleja el ajuste autorizado de alcance.
