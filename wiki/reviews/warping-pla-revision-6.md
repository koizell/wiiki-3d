# Revisión de warping-pla — sexta vuelta, lint 2026-10-04

**Veredicto: RECHAZADO** — 13 fallos agrupados, 6 bloqueantes.

Artículo: `src/content/wiki/warping-pla.md`. Cocinado: `wiki/cooked/warping-pla.md`.
Referencia histórica: `wiki/reviews/warping-pla-revision-5.md`; su aprobación no se ha reutilizado como evidencia.

Se han leído las nueve fuentes crudas correspondientes, buscado los datos y citas por fragmentos con `grep` y comprobado las intervenciones y el contexto. Las notas del recolector no se han confundido con el texto de la fuente. No se ha consultado internet ni modificado artículo, cooked o raw.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — coincidencias con cooked que no están respaldadas por el cuerpo de raw; también hay extrapolaciones del artículo |
| 2 | Contradicciones internas | FALLA — resultado del chaflán, ventilador y puerta/tapa cambian de alcance dentro del texto |
| 3 | Relleno y frases de IA | FALLA — párrafo vacío de dato en línea 273; ninguna frase canónica de IA encontrada |
| 4 | Longitud y estructura | PASA — 3.099 palabras; un H1, frontmatter completo y slug correcto |
| 5 | Citas correctas | FALLA — las citas inglesas existen, pero algunas paráfrasis cambian contexto o certeza; 9 URLs válidas y únicas |

Recuento calculado en JavaScript sobre una transcripción del cuerpo visible: secuencias Unicode de letras/cifras, conservando apóstrofos, guiones ASCII y guiones bajos internos (`/[\p{L}\p{N}]+(?:[’'_-][\p{L}\p{N}]+)*/gu`). Excluye frontmatter, URLs, marcas Markdown y texto alternativo de las imágenes; incluye títulos, tablas, etiquetas de enlaces y pie. No es una estimación por densidad de líneas.

El problema está en la introducción; siguen causa, diagnóstico, ajustes y pruebas de foro. Existe `## Qué puede salir mal`, con casos concretos. La primera referencia está en la línea 34, en la primera mitad.

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Ranking convertido en prevalencia del diagnóstico

**Dónde:** líneas 30–38; también descripción del frontmatter.
**Qué dice:** «PLA es el material rígido que menos se deforma» y «el problema casi nunca es el filamento: es cómo está configurado».
**Por qué falla:** `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md:47–49` ordena siete materiales por riesgo de warping. No mide la frecuencia de las causas del warping en PLA ni compara todos los materiales rígidos. Cooked `:31–34` ya convierte el ranking en un diagnóstico del ajuste, sin evidencia adicional.
**Qué hacer:** limitar el ranking a esos siete materiales y retirar la frecuencia «casi nunca» y el diagnóstico automático, o incorporar evidencia nueva al pipeline.

### 2 · Bloqueante · El 80 % corresponde a otros tres pasos

**Dónde:** líneas 132–136 y lista de pasos 1–3.
**Qué dice:** que limpiar, apagar el ventilador y subir la cama resuelven aproximadamente el 80 %.
**Por qué falla:** la cita es literal, pero `warping-pla-bambu-wiki-warping-falling-off-collapsing.md:103–117` la aplica a **limpiar, ejecutar el nivelado automático y comprobar la instalación de la boquilla**. El artículo sustituye dos de los tres pasos. El mismo error está en cooked `:80–95`.
**Qué hacer:** atribuir la cifra a la lista real de Bambu; no mantenerla pegada a otra lista de ajustes.

### 3 · Bloqueante · Capacidades del laminador sin fuente

**Dónde:** líneas 89–92 y 308–310.
**Qué dice:** que el laminador sólo permite chaflán de esquina, no de arista, y que la operación no existe allí.
**Por qué falla:** `warping-pla-prusa-forum-adjusting-settings-warping-pla.md:96–97` sólo dice que Zakalawe chaflanó en **Fusion**. Ninguna fuente describe las capacidades o limitaciones de un laminador concreto. Cooked `:42–46` añade esa limitación. La revisión 5 la detectó, pero la dejó pasar porque estaba cocinada: ese criterio no cumple la comprobación contra raw.
**Qué hacer:** conservar dónde hizo el chaflán ese usuario; retirar la afirmación universal sobre el laminador o traer documentación específica. Tampoco presentar «antes de exportar» como un paso documentado en el hilo.

### 4 · Bloqueante · «Quemar la placa» no está documentado

**Dónde:** líneas 203–205 y 317–320.
**Qué dice:** que 65 °C en Cool Plate quema la placa.
**Por qué falla:** `temperatura-cama-bambu-wiki-filament-guide-material-table.md:97` recomienda 35–45 ℃ para PLA en Cool Plate. No dice que 65 °C queme esa chapa. Las búsquedas de `burn`, `scorch` y `quem…` no aportan una fuente. Cooked `:190–194` convirtió salir de un rango recomendado en daño garantizado.
**Qué hacer:** describir que 65 °C está fuera de la recomendación de esa fila, sin inventar un mecanismo o resultado de daño.

### 5 · Bloqueante · Temperatura final y solución que el caso no demuestra

**Dónde:** líneas 229–236 y 308–309.
**Qué dice:** «65 °C es el valor con el que se resolvió un caso real» y «el chaflán que resolvió aquel caso».
**Por qué falla:** en el hilo `adjusting-settings-warping-pla.md:52`, 65 °C es el máximo **aconsejado por Lichtjaeger**. Zakalawe `:96–97` dice que subió la cama y chaflanó, sin temperatura final, y que aquello «seemed to make a big difference». No demuestra una resolución aislada ni una prueba a 65 °C. El artículo conserva correctamente la cautela en `:91–92` y luego la abandona. Cooked `:265–267` también autoriza indebidamente ese resultado.
**Qué hacer:** mantener en todas las menciones que cambió dos variables, que no indicó el valor final y que comunicó una impresión de mejora, no un resultado medido.

### 6 · Importante · Diferencia entre chapas sin definir la comparación

**Dónde:** líneas 196–201 y 317–318.
**Qué dice:** tras mencionar 35 y 65 °C, «la diferencia [...] es de veinte grados».
**Por qué falla:** 65−35 son **30** grados. La fila cruda `filament-guide-material-table.md:97` contiene intervalos 35–45 y 45–65: difieren 10 grados en el extremo inferior y 20 en el superior. No hay un desplazamiento fijo de 20 grados. La página de warping `:71–76` da además 55–65 para Textured PEI, no el mismo intervalo 45–65 de la tabla general.
**Qué hacer:** definir qué extremos se comparan y distinguir el objetivo de troubleshooting 55–65 del intervalo general 45–65. No reducirlo a una diferencia constante.

### 7 · Bloqueante · Un candidato de foro se convierte en definición general

**Dónde:** tabla de líneas 113–124 y derivación de líneas 126–128.
**Qué dice:** que las «separaciones entre capas» tienen base plana, superficie superior normal y las produce un cambio de firmware o PrusaSlicer.
**Por qué falla:** `warping-pla-prusa-forum-warping-at-corners.md:56–68` interpreta **unas fotos concretas** como posibles huecos de subextrusión en las juntas; «just look like» no es una definición general de deslaminación. El hilo tampoco establece «superficie superior normal» como criterio universal. Cooked `:63–74` ya mezcla ese caso con la categoría general.
**Qué hacer:** identificar esa columna como el caso de huecos en juntas descrito por Neophyl, no como todas las separaciones entre capas; no convertir una apariencia de foto en causa confirmada.

### 8 · Importante · Ventilador: se añade una exclusión que las fuentes no hacen

**Dónde:** líneas 156–168 y 332–334.
**Qué dice:** «la respuesta no es bajar el ventilador sino subir la temperatura de boquilla».
**Por qué falla:** `warping-pla-prusa-knowledge-base-warping.md:63–69` dice que demasiado ventilador **puede** levantar la pieza y reducir la unión, y que se **pruebe** subir la boquilla si disminuye la adhesión tras subirlo. No descarta bajar el ventilador. `warping-pla-bambu-wiki-printed-model-warping.md:60–68` propone precisamente reducir el auxiliar. El artículo presenta esa reducción y luego la excluye categóricamente; tampoco está documentado que la recomendación de Prusa se restrinja expresamente al «resto de la pieza».
**Qué hacer:** conservar el carácter de prueba y distinguir ventilador auxiliar/general, sin inventar una exclusión o un tramo que la fuente no especifica.

### 9 · Importante · «Y/o» convertido en dos acciones obligatorias

**Dónde:** líneas 291–297.
**Qué dice:** cita «opening [...] and/or removing [...]» y concluye «la puerta abierta y la tapa fuera».
**Por qué falla:** `temperatura-cama-bambu-wiki-filament-guide-material-table.md:84–87` recomienda abrir puerta **y/o** retirar tapa, con matices sobre la temperatura ambiente. La paráfrasis exige las dos, incluso aunque la cita permite una.
**Qué hacer:** conservar la alternativa y el carácter de recomendación; no atribuir a Bambu una exigencia conjunta.

### 10 · Importante · La sospecha sobre filamento pasa a ser descarte

**Dónde:** líneas 363–365.
**Qué dice:** «se descartó que fuera filamento».
**Por qué falla:** Diem escribe «It is **unlikely** to be filament or temperature related» en `warping-at-corners.md:96`, después de proponer reimprimir más despacio y reconocer otros factores (`:88–94`). Es una opinión de probabilidad, no una prueba de descarte. Las notas del recolector y cooked debilitan ese matiz.
**Qué hacer:** atribuirlo como sospecha/opinión del usuario sobre ese caso.

### 11 · Importante · Recomendación de secado convertida en imposibilidad térmica

**Dónde:** líneas 336–339.
**Qué dice:** «cambiar la temperatura no lo arregla».
**Por qué falla:** `warping-pla-bambu-wiki-warping-falling-off-collapsing.md:204–207` describe síntomas de humedad y recomienda secar antes de repetir. No enuncia esa imposibilidad. Cooked `:127–130` ya añade la negación categórica.
**Qué hacer:** limitarse al síntoma y a la acción de secado respaldados; no añadir que ningún cambio térmico puede afectar al resultado.

### 12 · Importante · Voladizos y PC-Blend: detalles y atribución añadidos

**Dónde:** líneas 350–358.
**Qué dice:** voladizo «hacia abajo por enfriamiento» y que Prusa «lo dice» para PC-Blend tras mencionar velocidad, aceleración y soportes de piezas altas.
**Por qué falla:** `warping-pla-prusa-knowledge-base-warping.md:59–61` sólo dice que voladizos/piezas pequeñas se deforman; no especifica ese sentido o causa. En `:86–91`, Prusa habla de reducir **velocidad** para PC-Blend, no de aceleración, soportes ni colapso de piezas altas. Esos últimos elementos son de Bambu `warping-falling-off-collapsing.md:27–28,156–160`.
**Qué hacer:** retirar el detalle no cocinado del sentido/causa y separar las dos atribuciones, sin encadenar el protocolo de Bambu como si Prusa lo corroborara entero.

### 13 · Menor · Párrafo de relleno

**Dónde:** línea 273.
**Qué dice:** «Es la contradicción más desconcertante de este tema, y tiene una explicación».
**Por qué falla:** no aporta dato, condición, comparación o resultado; el título y los párrafos siguientes ya anuncian y explican esa oposición.
**Qué hacer:** retirarlo. No es necesario compensarlo para alcanzar las 800 palabras.

## Trazabilidad que sí pasa

- Causa térmica, bordes/centro, tamaño, ranking acotado, ambiente <20 °C, corrientes, offset 0,04 mm, brim 8–10 mm y Gyroid ≤25 %: `warping-pla-bambu-wiki-warping-falling-off-collapsing.md:42–49,71–76,129–152,164–169,193–207`.
- No cooling tres capas y auxiliar 40–50 %: `warping-pla-bambu-wiki-printed-model-warping.md:53–68`.
- Cifras de cama de la tabla: Bambu `filament-guide-material-table.md:67,97`; Prusa `filament-material-guide.md:13–14`; ficha `pla.md:18`; Orca `material-temperatures.md:24–25`. Las cifras están; las deducciones señaladas arriba no quedan demostradas por ellas.
- Zakalawe/Fusion y Elias Spors/radios 3 mm son autores y casos distintos correctamente separados: `adjusting-settings-warping-pla.md:14,92–97` y `warping-at-corners.md:13–24`.
- Las 16 citas inglesas sustanciales existen. Las que cruzan líneas se comprobaron por mitades: Fusion `:96–97`, radios `:20–21`, Neophyl `:61–63`, no cooling `:53–55`, brim `:46–47` y enclosure Prusa `:77–79`. La literalidad no salva las atribuciones/contextos de los fallos 2, 5, 7, 8 y 9.

## Cobertura y notas que no bloquean

- Las nueve URLs de `sources` coinciden exactamente con `url:` de raw y no están repetidas. No se ha comprobado disponibilidad HTTP actual; el alcance es el corpus guardado.
- Enlaces a artículos existentes: `temperatura-cama` y `separaciones-entre-capas`. Pendientes: `enclosure-y-warping` y `adhesion-primera-capa`, escritos como `[[slug|texto]]`: **no son enlaces rotos ni motivo de rechazo**.
- El enlace inline a PrusaSlicer #11914 está documentado en raw `warping-at-corners.md:68`; no se presenta como fuente descargada en `sources`.
- Las dos rutas Markdown `/wiki/warping-pla/*.svg` son **imágenes**, no enlaces a páginas pendientes. Ambas existen. `imagenes.json` las declara conceptuales y `technicalSource: false`; no se usaron para respaldar datos técnicos. Los SVG no contienen texto técnico ni medidas de impresión. No se ha auditado el render responsive en navegador.
- La revisión 5 dejó una afirmación sin raw como «nota que no bloquea». Bajo la regla actual sí bloquea. Otros errores proceden de cooked; antes de pedir otra redacción, hay que recocinar los pasajes indicados. Raw permanece inmutable.
