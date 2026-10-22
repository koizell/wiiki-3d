# Revisión de flow-rate

**Veredicto: RECHAZADO** — 1 fallo.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 pérdidas |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Fallos, con dónde y qué hacer

### 1 · Importante · El acortamiento quitó un condicional y convirtió una opción en una cadena

**Dónde:** reglas[].porque, regla `bambu-fine`.

**Qué dice:** «Complete Calibration encadena gruesa y fina»

**Qué decía:** «Complete Calibration encadena gruesa y luego, opcionalmente, fina»

**Por qué falla:** El crudo dice lo contrario de lo que ahora afirma la guía: «It will first perform a coarse calibration, and then you can perform a fine calibration based on the results of the coarse calibration» y «If you are satisfied with the result, you can choose to skip the fine calibration, known as Calibration 2». Es decir: la fina **se puede saltar**. El material cocinado lo distingue en dos sitios, y el acortamiento se quedó con la versión que no lo dice. El texto anterior de la regla era el correcto.

**Qué hacer:** Devolver el «opcionalmente» al `porque` y arreglar la tarjeta `bambu-manual-notas`, que dice «Complete Calibration encadena coarse + fine» y arrastra el mismo problema desde antes de esta vuelta.

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `orca-maxvol-calc` | la torre de temperatura, la pista del brillo mate y la verificación en Preview | **PÉRDIDA REAL** | «Preview», «brillo» y las tres «torre» (que son de la torre hueca de Klipper) no aparecen en el `alcance` ni en ninguna tarjeta. El crudo: «Si se va a subir velocidad/flujo, conviene subir la temperatura de boquilla hacia el extremo alto del rango del filamento (torre de temperatura)». |
| `orca-yolo` | «línea mínima entre espiral interior y arcos exteriores» | **PÉRDIDA REAL** | «línea mínima» no aparece en la guía entera, y no hay ninguna tarjeta de YOLO: el criterio con el que se elige uno de los once bloques no está en ninguna parte. |
| `klipper-activar-pa` | «desactivar z-lift on retract» y el condicional «puede ser útil» | **PÉRDIDA REAL** | «z-lift» no aparece. El crudo dice «may still be useful» y «It is recommended to disable». Ahora dice «añade retracción», que convierte una sugerencia en una orden. |
| `marlin-kfactor-calib` | «bajar aceleración» y «acortar el bowden» | **PÉRDIDA REAL** | El `alcance` habla de las unidades de K, no de los remedios, y la tarjeta `k-calibracion` no los tiene. «Acortar el bowden» es un remedio físico que no aparece en ninguna otra parte. |
| `marlin-desactivar-presion` | «K = 0 desactiva el avance» | **PÉRDIDA REAL** | El crudo lo tiene literal: «K=0 means advance disabled.» `marlin-la-enable» dice «con LIN_ADVANCE_K a 0» con otro sentido. |
| `orca-adaptive-pa-calib` | «(perímetros exteriores, interiores y la feature más rápida)» | **PÉRDIDA REAL** | Es lo único que dice qué tres velocidades imprimir: sin eso, «3 velocidades por aceleración» no es accionable. |
| `marlin-la-enable` | las rutas de menú (Cura / Slic3r / Simplify3D) | **PÉRDIDA REAL** | No están en el `alcance` ni en ninguna tarjeta, y sin ellas la alternativa con `M900 Kxx` no se puede ejecutar. |
| `medir-preciso` | «de una sola pared de perímetro» | **PÉRDIDA REAL** | El crudo: «…may not be accurate enough to make reliable measurements of a single perimeter wall». «Las calibradoras baratas fallan» conserva el aviso pero pierde el cuándo, que es justo lo que mide el método de vaso. |
| `bambu-auto` | la sincronización desde el AMS y los pasos Next/guardado | **PÉRDIDA REAL** | «AMS», «Next» y «guardar» no aparecen en el fichero, y la tarjeta `bambu-auto-notas` no los tiene. Sin ellos la guía ya no dice cómo se termina la calibración. |
| `klipper-tuning-tower` | «dynamic acceleration control», «scarf joint» | **Redundancia** | Tarjeta `pa-ensayo-klipper`. |
| `klipper-tuning-tower` | «cuadrado hueco» | **Redundancia** | Tarjeta `pa-ensayo-klipper` («torre hueca (cuadrado hueco, square_tower.stl)»). |
| `klipper-tuning-tower` | «ante la duda, escoger la más baja» | **Redundancia** | Tarjeta `pa-alto`. |
| `orca-adaptive-pa-calib` | «para la aceleración mínima y la máxima» | **Redundancia** | Tarjeta `adaptive-pa-medidas`. |
| `orca-adaptive-pa-calib` | «o usar el valor de la prueba más rápida» | **Redundancia** | Tarjeta `adaptive-pa-medidas`. |
| `orca-pa-filamento` | la descripción del Adaptive PA (beta) | **Redundancia** | Tarjeta `pa-orca` y `alcance`. |
| `orca-yolo` | «se actualiza con…» | **Redundancia** | La primera cláusula del propio `porque`. |
| `orca-yolo` | «son métodos distintos y no intercambiables» | **Redundancia** | El `alcance`: «Uno suma/resta absoluto y el otro escala porcentualmente». |
| `marlin-kfactor-calib` | «desde un valor inicial hasta el final» | **Redundancia** | «El K sube por pasos». |
| `medir-preciso` | «repetir si hace falta» | **Redundancia** | Inferible de «Reimprime con el valor nuevo». |
| `marlin-la-enable` | «reflashear» | **Redundancia** | «Compila con #define LIN_ADVANCE…» y el crudo («set the K-Factor inside Configuration_adv.h and reflash the firmware»). |
| `orcaslicer-bambu` | «los perfiles» | **Mejora** | El cocinado sólo dice «su propio flujo de calibración»; lo que se quitó no lo sostenía. |

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
