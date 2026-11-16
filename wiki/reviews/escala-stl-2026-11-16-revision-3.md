# Revisión de escala-stl

**Veredicto: RECHAZADO** — 1 fallo bloqueante.  
**Iteración:** 3, tras ajuste de alcance autorizado.  
**Fecha:** 2026-11-16

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | PASA — se declara la falta de recorrido completo y no se exige con el brief ajustado |
| 2 | Afirmaciones con respaldo | FALLA — se afirma sin respaldo que una referencia dimensional es imprescindible para determinar la unidad pretendida |
| 3 | Atribución y grado de certeza | FALLA — un hueco documental se convierte en imposibilidad categórica |
| 4 | Coherencia y cobertura | FALLA — la imposibilidad categórica contradice una combinación permitida por la propia guía |
| 5 | Enlaces, slugs y fechas | PASA |
| 6 | Valor original y relleno | PASA — comparación, factor y limitaciones aportan contenido concreto |

## Evolución de las revisiones anteriores

- **Revisión 1, importación por unidad de referencia:** resuelto. `importar-prusa` ya no depende de conocer una referencia en pulgadas, sino de declarar evidencia independiente de coordenadas en pulgadas sin conversión previa y usar la alfa correspondiente.
- **Revisión 2, recorrido completo:** el hueco técnico permanece, pero el ajuste autorizado del brief ya no exige un recorrido completo ejecutado en una versión actual. La entrada, OrcaSlicer y `fueraDeAlcance` indican sus límites; no se rechaza por esa falta.
- **Revisión 2, doble conversión y estados incompatibles:** las acciones de importación, escala y nueva medición usan ahora opciones mutuamente excluyentes de `comparacion`. La escala por discrepancia requiere además una unidad de referencia conocida. Tras convertir o escalar, la guía pide actualizar el estado y volver a medir. La aplicación depende de que la persona actualice esa declaración; no se afirma que el motor detecte automáticamente cambios externos.

## Fallos

### 1 · Bloqueante · Se convierte un hueco documental en una imposibilidad absoluta

**Dónde:** `buscar-referencia`, campo `alcance`, línea 170; variable `unidad`, opción `desconocida`, y variable `comparacion`, opción `imperial-pendiente`.

**Dice:** «Sin una referencia no se puede determinar la unidad pretendida del archivo».

**Fuente declarada:** A-001, `wiki/raw/escala-stl-shapr3d-3mf-2026-11-16.md`, líneas 20–23, dice que el STL almacena geometría sin unidades de medida; no dice que una medida de referencia sea la única evidencia externa posible. H-001 del cooked declara que no se aportó un procedimiento documentado para recuperar la intención sin referencia, lo cual es más limitado que una imposibilidad general.

**Por qué falla:** el formato no declarar unidades no excluye evidencia independiente, por ejemplo una declaración del autor sobre las coordenadas. La propia guía permite seleccionar simultáneamente «No conozco una medida de referencia» y «Tengo evidencia de coordenadas en pulgadas y aún no he convertido el STL». Con `programa: prusa23`, el motor muestra a la vez la imposibilidad categórica y la importación para coordenadas acreditadas en pulgadas. Esa combinación contradice la distinción entre referencia y coordenadas exigida por el alcance ajustado.

**Qué hacer:** limitar la afirmación a lo que la fuente y H-001 sostienen, distinguiendo ausencia de referencia dimensional de ausencia de toda evidencia sobre las coordenadas. Revisar esa combinación sin eliminar la precaución de que tamaño, avisos o unidad de la referencia no prueban la intención del archivo.

## Notas que no bloquean

- Se contrastaron las afirmaciones usadas por la guía con las nueve fuentes crudas correspondientes y se revisaron los cinco nuevos extractos 2.9.4 citados en el cooked. Las siete citas textuales de tarjetas aparecen en las fuentes atribuidas. El caso de foro adicional no está citado por la guía ni por el cooked y no se usa como respaldo.
- I-003 e I-004 son razonamientos condicionales, no pruebas de un recorrido: el cociente deseada/actual y su porcentaje son correctos si se trata de la misma dimensión y unidad y la medida actual es positiva. La guía no presenta la oferta automática por tamaño como detección de unidades, ni promete que girar o cortar garantice encaje.
- Las condiciones de las reglas corresponden a opciones existentes y alcanzables; todas las variables afectan al resultado. Además del caso bloqueante, se revisaron `imperial-pendiente`, `volver-a-medir`, `coincide`, `difiere-escalar` y `sin-decision` frente a las tres opciones de `unidad` y los programas: no aparecen simultáneamente las reglas de importación imperial y factor, ni las de coincidencia y factor.
- Las alfas de Prusa se identifican como históricas; OrcaSlicer, Simplify3D y Cura no se atribuyen a una versión identificada. `tolerancias-y-encaje` existe en `GUIAS`, la guía está registrada y la autoría usa `autor.ts`. La fecha coincide con el brief y existen cambios sustanciales respecto a la revisión previa.
- H-002 del cooked aún dice que el recorrido completo es «exigido por el brief»; esa frase no refleja el ajuste autorizado. Es una nota de mantenimiento del cooked, no una afirmación reproducida por la guía ni el motivo del rechazo.
