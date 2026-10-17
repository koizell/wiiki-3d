# Revisión de torre-temperatura

**Veredicto: RECHAZADO** — 12 fallos, de los cuales 4 bloqueantes.

Revisión completa de la versión actual de `src/content/guias/torre-temperatura.ts`, contrastada con `wiki/cooked/torre-temperatura.md`, los cinco `wiki/raw/torre-temperatura-*.md` y el registro `src/lib/guias.ts`. No se han consultado fuentes externas ni revisiones anteriores. Las ubicaciones de la guía corresponden a sus líneas actuales. No se ha modificado la guía ni ninguna fuente.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — exclusión diagnóstica injustificada, ajustes fuera de su material, hipótesis convertida en diagnóstico y ampliaciones no sostenidas por el original |
| 2 | Contradicciones internas | FALLA — ajustes normales frente a receta fija y autoescalado; grados de certeza incompatibles; recomendación visual sin el límite de temperatura baja |
| 3 | Relleno y frases de IA | PASA — contenido técnico concreto; sin las fórmulas de relleno señaladas; no se aplica mínimo de palabras |
| 4 | Cuatro etapas y funcionamiento | FALLA — falta filtrado por material y hay cifras operativas fuera de `valor` |
| 5 | Citas correctas y accesibles | FALLA — cita compuesta con el orden original invertido y atribuciones que no respaldan lo afirmado; las cinco URL y los enlaces internos sí existen en el corpus/registro |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · El diferencial descarta la temperatura cuando las fuentes la incluyen como causa

**Dónde:** `diferencial.comprobaciones`, líneas 29–37, especialmente `adhesion.no` y `lineas.si`.

**Qué dice:** «si hay huecos entre líneas, es un problema de flujo» y «Es sub o sobreextrusión: no es temperatura, es flow».

**Evidencia:** `wiki/raw/torre-temperatura-orcaslicer.md:28`: «Low temperature can lead to under-extrusion, poor layer adhesion, and stringing». `wiki/raw/torre-temperatura-3dprinterstuff.md:25`: «Print too cold, and you get weak layer adhesion and under-extrusion». `wiki/raw/torre-temperatura-creality.md:71` también advierte que las temperaturas bajas pueden producir subextrusión.

**Por qué falla:** las fuentes no sostienen esa exclusión; dicen expresamente que la temperatura puede causar subextrusión. Tampoco hay en el cocinado ni en los cinco originales una regla diagnóstica que identifique inequívocamente acumulación junto a perímetros con sobreextrusión y descarte temperatura. La propia tarjeta `creality-lectura` de la guía, línea 367, vuelve a admitir subextrusión por temperatura baja.

**Qué hacer:** no usar esos síntomas para excluir temperatura ni convertirlos en diagnóstico definitivo de flow. Formular la incertidumbre y las comprobaciones diferenciales únicamente con respaldo cocinado y crudo.

### 2 · Bloqueante · Ventilador y cama de PLA aparecen para cualquier material

**Dónde:** tarjeta `ajustes-impresion`, líneas 255–265; reglas `ajustes-impresion`, 586–593; `cama-normal`, 595–602; `ventilador`, 604–611.

**Qué dice/hace:** la tarjeta no tiene `cuando`; las tres reglas tampoco. Con `material: 'abs'`, `'petg'`, `'tpu'` u `'otro'` sigue apareciendo «Refrigeración al 100 % tras la capa 3», y la receta general repite ese ventilador. La regla de cama sigue mostrando el valor de 60 °C para PLA aunque el material elegido no sea PLA.

**Evidencia:** `wiki/raw/torre-temperatura-3dprinterstuff.md:95`: «Your normal PLA bed temp (60°C is standard). If you're testing PETG, check your […] PETG bed temp settings». Línea 97: «100% fan after layer 3 (normal PLA settings)». El marco de la receta es conservar los ajustes normales, línea 87, no extender la refrigeración de PLA a todos los materiales.

**Por qué falla:** el cocinado recoge esas cifras, pero el original acota explícitamente cama y refrigeración a PLA. Mencionar PLA en el porqué o en el valor no sustituye el filtro de la acción. En ventilador, además, el `alcance` omite justamente la restricción de material. La existencia de una variable `material` hace verificable el fallo: las instrucciones no desaparecen al elegir ABS.

**Qué hacer:** separar el consejo general de conservar cama/refrigeración habituales de las cifras específicas de PLA; filtrar estas últimas por material en tarjetas y reglas y conservar la restricción en `alcance`.

### 3 · Importante · La secuencia numérica de Cura es la de PLA, pero se entrega también para ABS/PETG/TPU

**Dónde:** tarjeta `cura`, líneas 208–216, y regla `cura-changeatz`, 549–557.

**Qué dice/hace:** con cualquier material y `slicer: 'cura'`, el valor de la acción sigue siendo «215 °C a 8,2 mm, 210 °C a 16,4 mm…». El filtro sólo pregunta por slicer. El alcance limita las alturas por modelo/capa, pero no las temperaturas por material.

**Evidencia:** `wiki/raw/torre-temperatura-3dprinterstuff.md:57` presenta el modelo PLA de 220 a 190 °C. La secuencia de Cura empieza con «220°C for PLA» en la línea 65; continúa con 215 °C en 73 y 210/205 °C en 75. Las alturas dependen del modelo, líneas 71 y 77. Frente a ello, `wiki/raw/torre-temperatura-creality.md:93` da ABS 230–260 °C y PETG 220–250 °C.

**Por qué falla:** una explicación del mecanismo ChangeAtZ es general; esa serie concreta no lo es. El texto de tarjeta llama a las alturas un ejemplo, pero el `valor` de la regla sigue siendo una serie de temperaturas de PLA ofrecida para otros materiales. Además, el cocinado, líneas 242–243, marca esas alturas de ejemplo como modelo-dependientes y sin corroborar; la tarjeta y la regla no conservan esta última advertencia, aunque `seccion-altura` sí la conserva.

**Qué hacer:** mantener el procedimiento general sin imponer temperaturas ajenas al material; condicionar el ejemplo numérico a PLA y explicitar su carácter de ejemplo de modelo, de una sola fuente.

### 4 · Importante · La receta fija contradice conservar ajustes normales y la altura calculada por OrcaSlicer

**Dónde:** `aislar`, tarjeta 115–121 y regla 486–492; `ajustes-impresion`, tarjeta 255–264 y regla 586–593; `orca`, 232–240 y regla 568–575; `fueraDeAlcance` sobre altura de capa, 731–734.

**Qué dice:** primero se ordena no cambiar nada salvo temperatura; después se ordena imprimir a 0,2 mm y 50–60 mm/s sin comprobar que sean los valores normales. Para Orca se exige dejar el autoescalado, que calcula la capa como la mitad del diámetro, y a la vez se impone 0,2 mm. Fuera de alcance remata que «La torre asume altura de capa estándar (0,2 mm)».

**Evidencia:** `wiki/raw/torre-temperatura-3dprinterstuff.md:87–91` subordina los valores a los ajustes normales. `wiki/raw/torre-temperatura-orcaslicer.md:40` establece la mitad del diámetro para la capa y limita 0,4/0,2 mm al modelo de referencia. Por tanto, para una boquilla distinta, ambas instrucciones de la guía no pueden cumplirse a la vez.

**Por qué falla:** falta explicar cuándo rige la receta secundaria y cuándo el autoescalado. La afirmación universal sobre 0,2 mm tampoco está respaldada por Orca. El alcance «50–60 mm/s es tu velocidad normal» no comprueba ni condiciona que lo sea para la persona que lee. En la misma receta se pierden las condiciones de tiempo: el original, línea 101, dice «depending on your speed and the tower model», no garantiza 35–50 minutos para cualquier configuración.

**Qué hacer:** presentar los valores como el ejemplo acotado que son, no como sustitución obligatoria de cualquier perfil. Resolver expresamente la precedencia del autoescalado y retirar la supuesta altura universal; mantener la dependencia de modelo/velocidad para tiempo y consumo estimados.

### 5 · Bloqueante · Una sospecha de atasco del foro se cuenta como diagnóstico confirmado

**Dónde:** tarjeta `no-ultima-palabra`, línea 401; `reglas.validar-real.alcance`, línea 687; descripción de la fuente del foro, línea 766.

**Qué dice:** «imprimir a 180 °C atascó la boquilla», «caso a 180 °C que atascó la boquilla» y «clog a 180 °C».

**Evidencia:** `wiki/raw/torre-temperatura-prusa-forum.md:39`, intervención de samuel.jimenez: «the 3d stopped printing. I feel like the nozzle got cloaked, I'm checking it up now». La actualización del mismo autor, línea 59, dice que retiró/reintrodujo el filamento, calentó a 250 °C y volvió a extruir; no confirma el diagnóstico ni demuestra una causa única.

**Por qué falla:** «I feel like» es una hipótesis en comprobación, no un atasco confirmado causado por 180 °C. La cita de la propia tarjeta conserva el modo dubitativo, pero su cuerpo lo convierte en hecho. Las notas del recolector, línea 129, y el cocinado repiten la conclusión más fuerte: eso no sustituye lo que escribió el participante.

**Qué hacer:** contar el paro observado y atribuir al autor la sospecha de obstrucción, sin confirmarla ni establecer causalidad. Conservar el mismo grado de certeza en cuerpo, regla y descripción de fuente.

### 6 · Bloqueante · Obstrucción parcial y disipación deficiente no están en la intervención citada

**Dónde:** tarjeta `boquilla-obstruida`, líneas 475–481; también la inclusión de «disipación de calor» entre causas de stringing en `stringing-bajo`, línea 304.

**Qué dice:** «Una boquilla parcialmente obstruida o una disipación de calor deficiente pueden falsear el resultado de la torre».

**Evidencia:** la cita utilizada es `wiki/raw/torre-temperatura-prusa-forum.md:39`, «the 3d stopped printing. I feel like the nozzle got cloaked». No dice obstrucción *parcial*, no habla de disipación, y describe un paro al imprimir después de la torre, no una comprobación de factores que falsearan la torre. Las búsquedas por partes de obstrucción parcial/disipación en los cinco originales no aportan ese respaldo. Orca, líneas 28–30, trata temperatura y posibles defectos; no sostiene esta afirmación sobre disipación.

**Por qué falla:** el dato está en el cocinado, incluso en `Sin respaldo` (líneas 251–252), pero la cita cruda no contiene ni demuestra las ampliaciones técnicas. Añadir «una sola fuente, sin corroborar» no convierte una fuente que no lo dice en respaldo. La atribución a samuel.jimenez es incorrecta para estas afirmaciones.

**Qué hacer:** retirar las ampliaciones o tramitar fuentes que realmente las sostengan por el cocinado antes de incorporarlas. No reutilizar el paro posterior como evidencia de un problema previo de la torre.

### 7 · Importante · Se atribuye al foro una causalidad de humedad más fuerte de la que documenta

**Dónde:** tarjeta `filamento-seco`, línea 412; regla `seco`, líneas 614–619.

**Qué dice:** «la humedad causa stringing independientemente de la temperatura», presentado como explicación técnica de la recomendación y atribuido a Diem.

**Evidencia:** `wiki/raw/torre-temperatura-prusa-forum.md:89` pregunta si se ha probado a secar. Líneas 119–121: «New does not mean dry» y posibilidad de humedad por almacén/transporte. No hay ensayo de secado, confirmación de humedad de ese carrete ni afirmación de independencia respecto de la temperatura. El propio usuario, línea 105, informa de que bajar a 200 °C eliminó sus hilos. `wiki/raw/torre-temperatura-bambu.md:86` recomienda secar ante stringing persistente en una prueba de retracción, pero tampoco formula esa independencia absoluta.

**Por qué falla:** el recordatorio «nuevo no significa seco» y la sugerencia de secar sí están respaldados; la explicación causal absoluta añadida por el cocinado no lo está. El rótulo de fuente única no soluciona la ampliación.

**Qué hacer:** mantener la humedad como posibilidad no confirmada en ese caso, con su recomendación atribuida, y no afirmar una independencia causal que no documentan las fuentes disponibles.

### 8 · Importante · Se añade al caso del foro un contexto de velocidad/tamaño no documentado

**Dónde:** `no-ultima-palabra.cuerpo`, línea 401; `validar-real.porque` y `.fuente`, líneas 686–688.

**Qué dice:** «La torre evalúa calidad en un modelo pequeño y relativamente lento», como fundamento del consejo de validar a la velocidad/flujo reales y con `fuente: 'foro Prusa'`.

**Evidencia:** las intervenciones del foro, `wiki/raw/torre-temperatura-prusa-forum.md:35–121`, no dan la velocidad de la torre, la de la figura ni sus caudales o dimensiones. La referencia a velocidad/flujo en la línea 130 pertenece a las **notas del recolector**, no a los participantes. `wiki/raw/torre-temperatura-orcaslicer.md:36,56` sí pide considerar velocidad/flujo y elegir según velocidad y resistencia previstas. `3dprinterstuff:87–91` pide velocidad normal, no necesariamente una menor que la de la pieza real.

**Por qué falla:** el consejo general tiene apoyo en Orca, pero su atribución al foro y la descripción del caso como relativamente lento carecen de ese apoyo. La coincidencia con el cocinado no prueba que el contexto fuera observado.

**Qué hacer:** atribuir el criterio de velocidad/flujo a la fuente que lo formula y eliminar la caracterización no documentada del caso. No presentar las notas del recolector como testimonio del hilo.

### 9 · Importante · La misma prioridad funcional aparece como dudosa y como cierta

**Dónde:** `resolucion-contradictoria`, línea 390, frente a `adhesion-capas`, línea 325, y regla `leer-adhesion`, líneas 646–652.

**Qué dice/hace:** la tarjeta de resolución identifica como «una sola fuente, guía secundaria, sin corroborar» la prioridad de elegir mayor adhesión para piezas funcionales. La tarjeta de adhesión y su regla repiten la prioridad —escoger la sección más difícil de romper aunque el acabado sea peor— sin conservar esa cautela.

**Evidencia:** `wiki/raw/torre-temperatura-3dprinterstuff.md:125,135` sostiene la recomendación. Sin embargo, `wiki/cooked/torre-temperatura.md:239–240` incluye expresamente «funcional → temperatura más alta» en `Sin respaldo`. Orca, raw 50, corrobora que temperaturas mayores *generalmente* mejoran la adhesión, pero no ese procedimiento de selección por rotura ni toda la prioridad funcional descrita.

**Por qué falla:** no se está inventando la cita de 3D Printer Stuff; se está usando con dos grados de certeza diferentes dentro de la guía un criterio que el cocinado marca como no corroborado. El `alcance` de `leer-adhesion` sólo dice «criterio de adhesión entre capas».

**Qué hacer:** distinguir la tendencia general corroborada de la recomendación de esa guía secundaria y conservar la cautela donde se use la segunda, también en la acción calculada.

### 10 · Importante · La recomendación visual pierde el límite de bajar demasiado

**Dónde:** regla `leer-visual.porque`, línea 658, frente a `acabado`, línea 346, y `stringing-bajo`, línea 304.

**Qué dice:** «Temperatura más baja da mejor acabado superficial y menos hilos».

**Evidencia:** `wiki/raw/torre-temperatura-orcaslicer.md:48`: «lower temperatures typically reduce stringing, but going too low can cause it too». `wiki/raw/torre-temperatura-3dprinterstuff.md:129` advierte de textura mate/rugosa por demasiado frío. Su consejo «Go with the lower temperature», línea 137, pertenece a la comparación de resultados de 210/215/205 °C de la línea 133, no a una ley de que bajar siempre mejora ambas cosas.

**Por qué falla:** las tarjetas recogen el límite, pero el porqué de la regla personalizada vuelve a expresar una relación incondicional. El cocinado, líneas 198–201, exige precisamente no elegir un extremo sin explicar ese matiz.

**Qué hacer:** recomendar priorizar los resultados observados de acabado/hilos dentro de un rango que imprima correctamente, conservando el aviso sobre exceso de frío; no garantizar mejora por bajar la temperatura.

### 11 · Importante · Faltan cifras operativas en `valor`

**Dónde y qué falta:**

| Regla | Líneas | Problema |
|---|---|---|
| `secciones-pla` | 524–527 | `valor` enumera temperaturas, pero deja fuera «7 secciones» y el paso de «5 °C» que prescribe la acción |
| `orca-auto-scale` | 570–573 | La indicación numérica sobre el modelo original de 0,4 mm queda en `porque`; no hay `valor` |
| `ajustes-impresion` | 588–591 | Tiene `valor` para capa/velocidad/relleno, pero el ventilador 100 % tras capa 3 queda sólo en el porqué de esta regla |
| `leer-voladizo` | 631–634 | La acción prescribe evaluar 60° y el porqué compara 45°/60°; no hay `valor` |
| `colores` | 700–703 | La diferencia de 5–10 °C queda únicamente en `porque`; no hay `valor` |
| `recalibrar` | 708–711 | 195–218 °C y la referencia a 200 °C quedan únicamente en `porque`; no hay `valor` |

**Evidencia:** las cantidades proceden de `wiki/raw/torre-temperatura-3dprinterstuff.md:27,57,97,121,141` y `wiki/raw/torre-temperatura-orcaslicer.md:40`. El problema de este apartado no es inventar esas cantidades, sino incumplir su ubicación estructurada.

**Por qué falla:** tener un `valor` con algunas cifras no resuelve otras cifras operativas enterradas en el porqué. Que exista una regla independiente de ventilador tampoco arregla la repetición numérica escondida en `ajustes-impresion`.

**Qué hacer:** llevar las cifras pertinentes a `valor`, completar los valores parciales o eliminar las repeticiones numéricas innecesarias del porqué, sin perder los límites de fuente y material.

### 12 · Importante · Los puntos suspensivos disimulan una inversión del orden de una cita

**Dónde:** `carretes-pla.cita.texto`, línea 437.

**Qué dice:** «Optimal temperatures across PLA spools range from 195°C to 218°C... Don't skip this test just because 'everyone uses 200°C for PLA.'».

**Evidencia:** `wiki/raw/torre-temperatura-3dprinterstuff.md:141` presenta el orden contrario: «Don't skip this test just because "everyone uses 200°C for PLA." Optimal temperatures across PLA spools range from 195°C to 218°C. Your specific spool on your specific printer has its own sweet spot».

**Por qué falla:** las dos afirmaciones y sus números existen, pero los puntos suspensivos sólo pueden señalar una omisión, no hacer que una frase anterior pase a ser posterior dentro de un único literal. El cocinado, línea 160, ya trae la composición invertida. No se rechaza porque una búsqueda de la cadena completa no coincida: se han localizado y cotejado ambas partes y su orden.

**Qué hacer:** conservar el orden original, citar por separado los fragmentos o convertir el conjunto en paráfrasis atribuida, sin presentarlo como un literal continuo abreviado.

## Verificaciones realizadas que no constituyen fallos

- **Diferencial:** abre la estructura y contiene tres comprobaciones, cada una con `si` y `no`. Su problema es el contenido diagnóstico indicado en el fallo 1, no la ausencia de caras.
- **Variables:** `material`, `slicer` y `uso` tienen `para`. Las tres cambian tarjetas o reglas. Todas las condiciones declaradas usan opciones existentes; no se han encontrado reglas muertas. TPU/otro carecen de rango absoluto numérico propio, pero las fuentes no lo ofrecen: no se inventa uno ni se rechaza por esa ausencia.
- **Fuera de alcance:** está poblado y explica los temas excluidos. La afirmación de altura universal se señala en el fallo 4.
- **Rangos y lectura:** se localizaron definición y ejemplo 240/235/230 °C en Creality 17; rangos PLA/ABS/PETG en 91–93; modelo PLA de siete secciones en 3D Printer Stuff 57; geometrías 30/45/60° en 37–45; alturas 8,0–8,2 mm y 40–41 capas en 77; puenteado/stringing/voladizos/adhesión/acabado en 113–129; ejemplo de conflicto 210/215/205 °C y margen de 5 °C en 133–139. Los fallos anteriores afectan a cómo se aplican o matizan, no a la existencia de esos números.
- **Rangos discrepantes de PLA:** la guía conserva 190–220 °C con variación por marca/color/impresora, 195–218 °C como dato de una guía secundaria y 205–215 °C como opinión de un miembro del foro con cautela. Avinash escribe «In my experience» en raw del foro 77. No se ha promediado artificialmente a un único valor.
- **Creality Print:** botón Filament e icono de pincel constan en `torre-temperatura-creality.md:45`; no son una invención del redactor dentro del corpus disponible.
- **PrusaSlicer:** el procedimiento de clic derecho en deslizador → «Add height range modifier» → temperatura por rango, sin postprocesado, consta expresamente en `torre-temperatura-3dprinterstuff.md:83` y en cooked 75–77. Se ha comprobado el nombre de la herramienta y cada fragmento. **No se declara falso con conocimiento externo ni se afirma haberlo probado en PrusaSlicer.** Dentro del alcance documental de esta revisión tiene respaldo; sigue siendo una instrucción procedente de una guía secundaria, no verificación oficial del programa.
- **OrcaSlicer:** autoescalado, referencia 0,4/0,2 mm y mitad del diámetro constan en raw 40; Standard/Overhang y L invertida para banda en 44; rango medio y consideración del extremo alto a mayor velocidad/flujo en 36. La selección de banda queda expresamente limitada en el texto y en el alcance, aunque no haya una variable de tipo de impresora.
- **Literales compuestos:** se comprobaron por fragmentos los de Bambu (`que-no-mide`), Cura, ajustes de impresión, altura de sección, criterios Creality, caso del foro y torre sin etiquetas. Sus fragmentos existen en los originales y los puntos suspensivos pueden corresponder a omisiones en el orden original. No se marcan como inventados por no aparecer concatenados. Se han tenido en cuenta enlaces, negritas, saltos y escapes Markdown como `8\.2` y `0\.2`. La inversión concreta que sí falla es la del apartado 12.
- **Atribución a Diem:** «New does not mean dry» y el párrafo sobre almacén/transporte están efectivamente en su intervención, raw del foro 109–121; unirlos omitiendo el salto de párrafo no fabrica una cita. El fallo 7 es la ampliación causal del cuerpo, no la autoría de ese literal.
- **URL de fuentes:** las cinco URL de `fuentes`, líneas 744–764, coinciden con el `url` de la línea 3 de cada uno de los cinco raw; no hay duplicados. La primera cita está en la línea 87, antes de la mitad de la guía. Se verifica la correspondencia documental, no disponibilidad HTTP en vivo.
- **Enlaces internos:** `flow-rate`, `temperatura-cama`, `temperatura-hotend`, `altura-capa` y `voladizos-y-soportes` corresponden a módulos importados e incluidos en `GUIAS` (`src/lib/guias.ts:18,23,29–32,78`), con esos `slug` comprobados en sus declaraciones, no inferidos de sus nombres de archivo. No hay un rechazo por enlace inexistente.

## Notas que no bloquean por sí solas

- Conviene colocar la preparación del filamento antes de las instrucciones de impresión para facilitar una lectura de procedimiento; no se cuenta esto como una regla inalcanzable.
- No se ha ejecutado `npm run verify:guias`: esta sesión no dispone de herramienta de ejecución de comandos. El análisis de condiciones, valores y enlaces indicado arriba es inspección documental, no una afirmación de que el verificador automatizado haya pasado o fallado.
- Las deficiencias que nacen en el cocinado requieren corregir ese nivel mediante su agente antes de una nueva redacción. Repetir la misma fuente en el artículo no las valida.

**Conclusión:** la estructura básica es utilizable y varias instrucciones sí están fielmente documentadas, incluido el procedimiento de PrusaSlicer dentro de este corpus. El rechazo se debe a los fallos concretos de alcance, respaldo, coherencia y literalidad enumerados, no a la longitud ni a la intención de la guía.
