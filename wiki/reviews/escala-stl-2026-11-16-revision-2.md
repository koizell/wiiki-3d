# Revisión de escala-stl

**Veredicto: RECHAZADO** — 1 fallo bloqueante y 1 importante.  
**Iteración:** 2 de 2  
**Fecha:** 2026-11-16

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | FALLA — sigue faltando un recorrido verificable en una versión actual para la decisión pedida |
| 2 | Afirmaciones con respaldo | PASA — las capacidades y las inferencias revisadas se distinguen de un procedimiento documentado |
| 3 | Atribución y grado de certeza | PASA |
| 4 | Coherencia y cobertura | FALLA — condiciones independientes pueden mostrar instrucciones incompatibles |
| 5 | Enlaces, slugs y fechas | PASA |
| 6 | Valor original y relleno | PASA — la comparación y el factor aportan valor concreto, aunque no completan el recorrido |

## Evolución de los hallazgos anteriores

- **Importación imperial por conocer la referencia en pulgadas: resuelto.** `importar-prusa` exige ahora `coordenadas: pulgadas-sin-convertir`, además de la alfa correspondiente. Una referencia expresada en pulgadas ya no activa por sí sola esa importación. A-004 coincide con `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`, líneas 24–28.
- **Recorrido práctico insuficiente: persiste.** Hay comparación y cálculo nuevos, pero falta la evidencia de versión y el procedimiento identificados en el segundo hallazgo previo. Ese defecto impide cumplir el brief y es bloqueante para esta aprobación, aunque antes se clasificara como importante.

## Fallos

### 1 · Bloqueante · No hay un recorrido verificable para una versión actual

**Dónde:** `medir-orca`, `orca-capacidades`, `comparar-referencia`, `factor-uniforme` y `fueraDeAlcance`; también los casos `programa: otro` y `programa: cura`.

**Dice:** «Mide la distancia correspondiente en el modelo» y «Calcula el factor de escala uniforme»; la propia guía advierte «Documentación sin versión ni secuencia completa» y excluye el «Procedimiento para una versión actual identificada».

**Fuente declarada:** A-018–A-020, `wiki/raw/escala-stl-orcaslicer-medicion-2026-11-16.md`, líneas 40–50, y `wiki/raw/escala-stl-orcaslicer-manipulacion-2026-11-16.md`, líneas 41–49 y 58–62. Ambas páginas carecen de versión; describen funciones, no una secuencia completa de selección, comparación y aplicación del factor a una medida interna. H-002 y H-008 del cooked reconocen expresamente la falta.

**Por qué falla:** el brief pide una guía práctica con medición y escala verificables y específicas de versión, además de comprobar si el objeto cabe. Las nuevas inferencias explican qué comparar y cómo calcular, pero no documentan cómo completar el recorrido en un slicer actual identificado. Para `otro` sigue sin haber una comprobación específica del espacio, y para Cura sólo se ofrece revisar el perfil sin una secuencia de medición y escala documentada. Reconocer el hueco es correcto, pero excluirlo no satisface esa parte central del brief.

**Qué hacer:** aportar una fuente local o un caso comprobado para una versión actual identificada que cubra selección, medición, comparación, aplicación de escala y comprobación del espacio; cocinar sus límites antes de redactar. Como alternativa, decidir y aprobar un cambio explícito del brief que reduzca el alcance. No presentar I-003/I-004 como procedimiento probado.

### 2 · Importante · Las declaraciones independientes pueden activar recomendaciones incompatibles

**Dónde:** variables `unidad`, `coordenadas` y `comparacion`; reglas `buscar-referencia`, `coincide`, `importar-prusa` y `factor-uniforme`.

**Dice:** `unidad: desconocida` significa «No conozco una medida de referencia», mientras `comparacion: coincide` declara «Coincide con la referencia en la misma unidad». Ambas opciones pueden seleccionarse a la vez, mostrando «Busca una medida de referencia» y «Mantén la escala por esa medida». También pueden coincidir `coordenadas: pulgadas-sin-convertir` y `comparacion: difiere-escalar`, mostrando tanto la importación imperial como el cálculo de un factor.

**Fuente declarada:** I-003/I-004 y A-004; `wiki/raw/escala-stl-prusaslicer-23-unidades-2026-11-16.md`, líneas 24–28. La importación imperial ya convierte las coordenadas; I-004 exige no acumular el factor con una conversión ya aplicada.

**Por qué falla:** el motor exige coincidencia sólo de los campos presentes en cada condición (`src/lib/guias.ts`, `seCumple` y `reglasQueSalen`), sin verificar coherencia entre respuestas. El texto advierte contra la doble conversión, pero permite mostrar simultáneamente ambas acciones sin indicar cuál debe ejecutarse primero ni exigir volver a medir. Las selecciones contradictorias también pueden generar una decisión de escala basada en una referencia que se declara inexistente.

**Qué hacer:** definir condiciones o estados mutuamente coherentes y una secuencia que evite ofrecer ambas operaciones sobre la misma medición; tras una conversión, exigir nueva comparación antes de calcular otro ajuste. Cubrir también la ausencia de referencia.

## Notas que no bloquean

- I-003 distingue correctamente la unidad de la referencia de la intención de las coordenadas. I-004 es matemáticamente correcto para una longitud actual positiva y una longitud deseada de la misma dimensión y unidad: factor = deseada/actual; porcentaje = factor × 100. La guía marca ambos razonamientos como inferencias y no los presenta como diagnóstico de unidades ni como secuencia probada.
- Se han contrastado las nueve fuentes crudas citadas por el cooked. Las siete citas textuales de las tarjetas figuran en sus fuentes; la nueva cita de OrcaSlicer corresponde a `escala-stl-orcaslicer-manipulacion-2026-11-16.md`, línea 49. Las versiones históricas se identifican; OrcaSlicer, Simplify3D y Cura se mantienen sin versión atribuida.
- La oferta por tamaño no se presenta como prueba de unidades; girar o cortar no se promete como garantía de que la pieza quepa o encaje. El ejemplo de paredes sigue siendo una posibilidad, no un mínimo universal.
- Las condiciones referencian opciones existentes y las cinco variables cambian lo visible. `tolerancias-y-encaje` y `escala-stl` constan en `GUIAS`; el autor procede de `autor.ts`. La fecha coincide con el brief y el contenido ha cambiado respecto a la primera revisión, cuya descripción permite verificar cambios sustanciales.
- Al ser la segunda revisión y persistir el problema de cobertura, no procede otra vuelta con el mismo material: falta una fuente o caso comprobado y su cocinado, o una decisión aprobada de cambio de alcance.
