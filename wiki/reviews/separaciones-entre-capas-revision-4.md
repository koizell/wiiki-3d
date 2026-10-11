# Revisión de separaciones-entre-capas — cuarta vuelta, lint 2026-10-04

**Veredicto: RECHAZADO** — 7 fallos agrupados, 4 bloqueantes.

Artículo: `src/content/wiki/separaciones-entre-capas.md`. Cocinado: `wiki/cooked/separaciones-entre-capas.md`.
Referencia histórica: `wiki/reviews/separaciones-entre-capas-revision-3.md`.

Se han leído las siete fuentes crudas correspondientes y buscado por fragmentos las citas, números y nombres propios. El diagnóstico de una foto y las notas del recolector no se han tratado como una prueba independiente. No se ha consultado internet ni modificado las capas de contenido.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — protocolo, diagnóstico y herramienta mecánica cambiados; inferencias no marcadas |
| 2 | Contradicciones internas | FALLA — temperatura excluida para flujo pese al caso térmico citado; ventilador «primero» frente a tabla |
| 3 | Relleno y frases de IA | PASA — comparaciones/definiciones aportan contenido; ninguna frase canónica encontrada |
| 4 | Longitud y estructura | PASA — 3.905 palabras, un H1, frontmatter completo y slug correcto |
| 5 | Citas correctas | FALLA — citas presentes, pero paráfrasis alteran atribución, exactitud y contexto; 7 URLs válidas y únicas |

Recuento calculado en JavaScript sobre transcripción del cuerpo visible, con `/[\p{L}\p{N}]+(?:[’'_-][\p{L}\p{N}]+)*/gu`. Excluye frontmatter, URLs y sintaxis Markdown; conserva títulos, tablas, etiquetas visibles y pie. No se reutiliza la estimación por muestreo de la vuelta anterior.

Orden funcional: problema, definición/mecanismo, diagnóstico, protocolos, números y pruebas de foro. Existe `## Qué puede salir mal`, con casos reales. La primera cita aparece en la línea 45, en la primera mitad.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Se excluye la temperatura para flujo cuando el propio caso la relaciona

**Dónde:** líneas 91–100, 334–335 y 339–342.
**Qué dice:** «el ajuste no es térmico: es la boquilla» y «Si el problema es flujo, la temperatura no lo arregla nunca».
**Por qué falla:** Bambu `separaciones-entre-capas-bambu-wiki-interlayer-cracking.md:21–25` dice que un atasco **puede parecerse** a una grieta y propone cold pull; no dice que toda falta de flujo sea un atasco ni que la temperatura nunca ayude. En el hilo `separaciones-entre-capas-prusa-forum-layer-separation-delamination-help.md:71–79`, Naugh atribuye pérdida de flujo a la viscosidad al bajar temperatura y recomienda 220–230 °C para aquel caso. El artículo reproduce ese diagnóstico y luego establece una imposibilidad incompatible con él. Prusa `layer-separation-and-splitting-fdm.md:15` aporta el corte limpio/curvado, pero no la regla complementaria «corte rugoso = boquilla, nunca térmico». Tampoco el comentario de Neophyl sobre juntas prueba que subir la boquilla no pueda afectar al resultado de todos los casos tras actualizar.
**Qué hacer:** mantener una comprobación de obstrucción y un diagnóstico de causas posibles, sin identificar cualquier falta de material con un atasco ni prohibir la vía térmica. Recocinar las negaciones absolutas de cooked `:101–106,555–556`.

### 2 · Bloqueante · «Ventilador primero» no es un orden compartido por las tres fuentes

**Dónde:** líneas 150–175 y 183–187.
**Qué dice:** las fuentes comparten «el ventilador primero».
**Por qué falla:** Bambu enumera **desatascar**, **boquilla más caliente o menos velocidad**, **reducir ventilador**, **cama/cámara** en `interlayer-cracking.md:23–49`. El ventilador es tercero, después de un método térmico. Prusa `layer-separation-and-splitting-fdm.md:11,29–35` identifica refrigeración como causa, pero no prescribe ese orden general. Sólo bobstro `separation-of-layers-in-middle-of-print.md:29` dice «Try reducing cooling first». La tabla del propio artículo conserva bien el orden de Bambu y contradice la generalización posterior. Cooked `:359–367,561` ya fabrica ese consenso.
**Qué hacer:** atribuir «primero» a bobstro y presentar cada protocolo con su orden real. No convertir una causa compartida en una prioridad compartida.

### 3 · Bloqueante · Dos voces y dos observaciones se convierten en causa confirmada en la base

**Dónde:** líneas 102–106 y 351–356; compare el matiz de líneas 311–317.
**Qué dice:** que la separación crecía con la altura «mientras la causa estaba abajo del todo», atribuido a Naugh; usa el caso para afirmar que el warping no explica nada.
**Por qué falla:** newgen, no Naugh, observa que empeora hacia arriba y que hay subextrusión también en la base (`delamination-help.md:59–63`). Naugh interpreta una foto de baja resolución (`:69`) y atribuye el tapón a unos 205 °C, antes de alcanzar el tramo 200 (`:71–75`); no afirma que ese tapón estuviera «abajo del todo» ni verifica una causa única. El hilo termina **sin resolver** (`:85–87`). Cooked `:109–122,418–422` sigue la extrapolación de las notas del recolector en vez de las intervenciones. La cautela aparece después en el artículo, pero no acompaña la primera afirmación causal ni el uso como contraejemplo demostrado.
**Qué hacer:** separar observación de newgen e interpretación de Naugh, eliminar la ubicación causal no demostrada y mantener en todas las menciones «diagnóstico de foro sobre foto de baja resolución, caso sin resolver».

### 4 · Bloqueante · Nombre de ajuste mecánico cambiado

**Dónde:** líneas 303–306.
**Qué dice:** que newgen ajustó «los tornillos de inercia».
**Por qué falla:** `delamination-help.md:37` escribe **«Adjusted the idler tension screws»**. No son tornillos de inercia. El término incorrecto sólo reaparece en las notas del recolector y en cooked `:301`, no en el cuerpo de la intervención. Cambiar el nombre cambia qué pieza debe buscar el lector.
**Qué hacer:** conservar el nombre correcto del ajuste de tensión del idler, sin atribuirle una función de inercia ni inventar una pieza.

### 5 · Importante · Diagnóstico excluyente y geometría no acreditados

**Dónde:** introducción `:31–33`, líneas 47–64, tabla `:75–80` y salida del diagnóstico `:109–111`.
**Qué dice:** que separación implica base plana, grieta perpendicular al plano y ajustes contrarios al warping; manda salir del artículo si la pieza se arquea desde la base.
**Por qué falla:** Bambu `interlayer-cracking.md:13` dice «cracks may appear [...] along the Z direction», pero no establece base plana ni una prohibición de coexistencia con deformación de la base. Prusa `layer-separation-and-splitting-fdm.md:15–17` identifica cortes con curvatura y fuerzas de warping que superan la adhesión. El propio artículo lo cita en `:57–64,88–93`, de modo que el aspecto no permite excluir automáticamente el mecanismo o la combinación de fallos. El protocolo de Bambu incluye subir cama, que también se recomienda en el artículo de warping: no todos los ajustes son contrarios. La marca «inferencia nuestra» de `:82–86` sólo cubre la conservación de unión de capas desplazadas, no estas otras reglas universales.
**Qué hacer:** distinguir síntomas sin hacerlos mutuamente excluyentes. Si se quiere derivar orientación geométrica o condición de base a partir de una frase ambigua de raw, marcar la inferencia o traer una fuente que lo explique; no atribuir a Bambu detalles que no declara.

### 6 · Importante · La regla de movimiento diagonal pierde el modelo al que pertenece

**Dónde:** líneas 124–127.
**Qué dice:** movimiento inconsistente en diagonal apunta al motor de esa diagonal o su polea, como regla general.
**Por qué falla:** `separaciones-entre-capas-prusa-kb-layer-shifting.md:23–39` enuncia esa comprobación bajo **Prusa CORE One**, y avisa de mantener la alineación CoreXY. El artículo conserva el alcance MK3/S/+ para Belt Status, pero omite el alcance CORE One de la comprobación anterior. Cooked `:149–153` ya la extrae sin ese contexto.
**Qué hacer:** acotar la regla a la sección/modelo/CoreXY descrito por Prusa, en vez de presentarla como diagnóstico universal de cualquier impresora.

### 7 · Importante · Dos rangos genéricos se convierten en rangos de uso y diagnóstico oficiales

**Dónde:** líneas 221–243.
**Qué dice:** que 185–235 es dónde el PLA imprime bien y 195–220 es específicamente «dónde mirar cuando el síntoma es la separación»; lo usa como explicación de la discrepancia.
**Por qué falla:** la tabla cruda `temperatura-cama-prusa-kb-filament-material-guide.md:13–14` da temperaturas de boquilla/cama. El KB `layer-separation-and-splitting-fdm.md:29` dice que, **según marca**, el PLA se imprime entre 195–220 y que se pruebe incrementar 5 °C si falla la unión. No define un rango distinto reservado al diagnóstico ni garantiza que todo PLA imprima bien a 185. Cooked `:229–243,394–407` introduce esa taxonomía y no la marca como interpretación editorial. El título del documento no basta para demostrar que los números responden a criterios distintos.
**Qué hacer:** atribuir ambos rangos como recomendaciones de documentos distintos, con el matiz de marca y sin seleccionar uno. Si se mantiene una explicación interpretativa de la diferencia, declararla como tal, no como propósito confirmado por Prusa.

## Trazabilidad que sí pasa

| Afirmaciones/citas | Evidencia cruda comprobada |
|---|---|
| Deslaminación, causas térmicas/refrigeración, rareza en MK con presets, criterio de corte y mecanismo | `separaciones-entre-capas-prusa-kb-layer-separation-and-splitting-fdm.md:11–17` |
| ABS sensible al aire frío, cámara cerrada, alternativas PETG/ASA | mismo fichero `:23–27` |
| 195–220 sin unidad original, incrementos 5 °C y flow/extrusion multiplier +5 %, Advanced/Expert | mismo fichero `:29–35` |
| Materiales propensos de Bambu y cuatro métodos | `separaciones-entre-capas-bambu-wiki-interlayer-cracking.md:13,23–49` |
| Velocidades 150/100 mm/s expresamente para ABS; 60 % sólo como ejemplo, cama +5–10 y cámara +5 si activa | mismo fichero `:39,45,49` |
| Layer shifting, correas/poleas y Belt Status MK3/S/+ 250/275 ±15, aflojar <240/apretar >290, magnitud arbitraria | `separaciones-entre-capas-prusa-kb-layer-shifting.md:11–15,110–120` |
| Voladizos que suben, choques, relleno muy bajo y prevención de otra cosa | mismo fichero `:218–220` |
| Naugh 205, 205–210 y recomendación 220–230, Elegoo PLA y hilo no cerrado | `separaciones-entre-capas-prusa-forum-layer-separation-delamination-help.md:19,63–87`, conservando su incertidumbre |
| Regla de foro <80 %, 0,2/0,4 declarados por jaychatt, refrigeración y 5–10C de bobstro, intención sin resultado | `separaciones-entre-capas-prusa-forum-separation-of-layers-in-middle-of-print.md:25–29,44` |
| Opinión de Neophyl y URL del issue 11914 | `warping-pla-prusa-forum-warping-at-corners.md:56–68` |
| Fila PLA 185–235/50–60 y hardware `No, -, No` | `temperatura-cama-prusa-kb-filament-material-guide.md:13–14` |

Las citas inglesas sustanciales aparecen en las intervenciones o cuerpos correctos. Se comprobaron por mitades las de Neophyl en `warping-at-corners.md:61–63`. Las normalizaciones de mayúscula inicial, énfasis y comillas tipográficas no se han contado como invenciones. Las cuentas 0,4×0,8=0,32 y 0,2/0,4=50 % son correctas; la regla original exige **por debajo** del 80 %, no incluye exactamente el límite.

## Cobertura y notas que no bloquean

- Las siete URLs de `sources` coinciden con `url:` de raw, sin duplicados. Disponibilidad HTTP actual no comprobada.
- Las fechas del pie corresponden a cinco capturas del 04 y dos del 03. Los siete documentos se identifican correctamente.
- Existen `warping-pla` y `temperatura-cama`. `capas-desplazadas` y `flow-rate` están pendientes y se nombran como referencias `[[slug|texto]]`: no son enlaces rotos. Las cuatro páginas prometidas como relaciones principales están nombradas en el artículo.
- **Cobertura cruzada pendiente:** líneas 402–404 prometen que `temperatura-cama` explica de dónde salen **+5 °C de cámara**. El destino actual no cita `interlayer-cracking`, que es el documento que da ese incremento; sólo enumera otros umbrales y reglas de cámara. El enlace existe, pero su descripción promete contenido que el destino no contiene. Conciliar el texto de la referencia o ampliar el destino a través del pipeline.
- `layerHeight` se presenta como campo interno y se admite que las fuentes no explican su ausencia en un archivo. No se ha verificado código del analizador; no se concede respaldo externo a esa declaración. Una página específica `altura-capa` y documentación oficial de la regla de altura siguen siendo cobertura pendiente, no un enlace roto aquí.
- El carácter de foro/no oficial del 80 % y el caso sin resolver de 220–230 °C están bien señalados. Mantener ese cuidado y extenderlo al diagnóstico causal de Naugh.
- La revisión 3 ya anotó la atribución conjunta newgen/Naugh pero no la consideró fallo. En esta revisión se verifica además la ubicación del tapón y la certeza del diagnóstico: raw no demuestra «causa abajo del todo». La coincidencia con cooked no salva esa ampliación.
