# Revisión de torre-temperatura · vuelta 2

**Veredicto: APROBADO** — las cinco comprobaciones pasan. Los 12 hallazgos de la revisión 1 están cerrados; no se detectan fallos nuevos.

## Alcance y recuento

Revisión documental de la versión actual de `src/content/guias/torre-temperatura.ts` (801 líneas), del cocinado corregido `wiki/cooked/torre-temperatura.md` y de sus cinco originales `wiki/raw/torre-temperatura-*.md`. Se ha leído `wiki/reviews/torre-temperatura-revision-1.md` para comprobar todos sus hallazgos, y el registro `src/lib/guias.ts` y las declaraciones de los cinco slugs enlazados para comprobar destinos. No se han consultado fuentes externas ni utilizado las notas interpretativas del recolector como prueba de hechos del foro.

Recuento por elementos declarados, no por estimación:

| Elemento | Cantidad |
|---|---:|
| Comprobaciones diferenciales | 3, todas con `si` y `no` (6 caras) |
| Variables | 3, todas con `para` |
| Opciones de variables | 13: 5 de material, 5 de slicer y 3 de uso |
| Tarjetas de conocimiento | 38: 16 condicionadas y 22 sin condición |
| Objetos `cita` | 37 |
| Reglas | 26: 17 condicionadas y 9 sin condición |
| Reglas con `valor` | 12 |
| Reglas con `alcance` | 26 |
| Casos fuera de alcance | 5 |
| Fuentes | 5 URL distintas |
| Referencias internas `guia` | 6 apariciones, 5 destinos distintos |

No se han ejecutado pruebas ni `verify:guias`, conforme al encargo: se ejecutan en la sesión principal. Los resultados siguientes son de inspección documental y de condiciones, no una afirmación de haber pasado un verificador automatizado. Sólo se crea este informe; no se modifica la guía, el cocinado, los originales ni la revisión 1.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA — datos contrastados con el cocinado y los originales; conservados alcance, atribución y cautelas |
| 2 | Contradicciones internas | PASA — resueltas receta/perfil/autoescalado y diferencias de certeza; conservados los límites de frío y calor |
| 3 | Relleno y frases de IA | PASA — contenido técnico concreto; sin las fórmulas de relleno señaladas; sin mínimo de palabras |
| 4 | Cuatro etapas y funcionamiento | PASA — diferencial completo, variables activas, reglas alcanzables, filtros materiales y cifras estructuradas |
| 5 | Citas correctas y accesibles | PASA — 37 citas cotejadas por fragmentos, 5 URL documentadas sin duplicados y 5 destinos internos existentes |

## Cierre de TODOS los hallazgos de la revisión 1

Las líneas de guía de esta tabla corresponden a la versión revisada en esta segunda vuelta. Las referencias de originales se abrevian por su nombre dentro de `wiki/raw/`.

| # anterior | Estado | Comprobación del cierre y evidencia original |
|---|---|---|
| 1 · Exclusión diagnóstica de temperatura | CERRADO | `adhesion` y `lineas`, guía 29–37, ya no excluyen temperatura ni diagnostican flow por descarte. `lineas.si` dice «Son compatibles con subextrusión, que también puede aparecer por temperatura baja». Orca 28 dice «Low temperature can lead to under-extrusion, poor layer adhesion, and stringing»; Creality 71 y 3D Printer Stuff 25 coinciden en la posibilidad de subextrusión por frío. La salida `siNo` se presenta como otra calibración, no como diagnóstico automático. |
| 2 · Cama y ventilador PLA para cualquier material | CERRADO | `perfil-pla`, guía 280–289, tiene `cuando: { material: 'pla' }`. Lo mismo ocurre en `cama-normal` y `ventilador`, 622–639. Los valores quedan expresamente como ejemplos PLA, no sustituciones obligatorias del perfil. La tarjeta general `ajustes-impresion`, 268–277, ya no contiene esas cifras de cama/ventilador. 3D Printer Stuff 95 dice «Your normal PLA bed temp (60°C is standard)» y 97 «100% fan after layer 3 (normal PLA settings)». |
| 3 · Secuencia Cura PLA aplicada a otros materiales | CERRADO | Se separan procedimiento general (`cura`, 208–217; `cura-changeatz`, 575–581) y ejemplo (`cura-ejemplo-pla`, 220–229 y 584–591). Ambos ejemplos exigen conjuntamente `slicer: 'cura'` y `material: 'pla'`, y conservan la advertencia de fuente secundaria, modelo/capa y falta de corroboración. 3D Printer Stuff 65 inicia con «220°C for PLA»; 71–77 contienen 8,2/16,4/24,6 mm y 215/210/205 °C, con dependencia del modelo. Creality 56–62 documenta el mecanismo general sin imponer esa serie. |
| 4 · Receta fija frente a perfil habitual y autoescalado | CERRADO | `ajustes-impresion`, 268–277, presenta 0,2 mm, 50–60 mm/s, 10–15 %, 35–50 min y 8–15 g como ejemplo secundario, no órdenes ni garantías. `aislar`, 115–122 y 512–517, y `orca-auto-scale`, 603–610, respetan la capa calculada por Orca. Fuera de alcance, 764–766, niega una altura universal. 3D Printer Stuff 87–101 subordina la receta al perfil habitual y el tiempo a velocidad/modelo; Orca 40 establece capa igual a la mitad del diámetro y 0,4/0,2 mm sólo como referencia. |
| 5 · Sospecha de atasco convertida en diagnóstico | CERRADO | `no-ultima-palabra`, 423–432, relata un paro y una sospecha «sin confirmarla», y la recuperación sin causa aislada. `validar-real.alcance`, 716, y la descripción del foro, 798, mantienen esa incertidumbre. Samuel escribe «I feel like the nozzle got cloaked, I'm checking it up now» en el foro 39; en 59 relata reinsertar filamento, calentar y volver a extruir. No se vuelve a presentar 180 °C como causa confirmada de atasco. |
| 6 · Obstrucción parcial/disipación sin fuente | CERRADO | No existe ya la tarjeta `boquilla-obstruida` ni aparece disipación como explicación de stringing. `stringing-bajo`, 325–332, se limita a los avisos de Orca 28 y 48. El foro 39 sólo contiene la sospecha indicada en el punto anterior: no se reutiliza para afirmar obstrucción parcial o disipación deficiente. |
| 7 · Causalidad de humedad más fuerte que el foro | CERRADO | `filamento-seco`, 435–443, y `seco`, 642–647, hablan de posibilidad y consejo, sin diagnosticar humedad ni afirmar independencia causal o secado exitoso. Incluyen el relato posterior de mejora al bajar temperatura. Diem pregunta «Have you tried drying your filament yet?» en foro 89 y dice «New does not mean dry» en 119, con almacén/transporte en 121. Samuel relata desaparición de hilos a 200 °C en 105. La guía no traslada como resolución del caso el consejo de otra prueba de Bambu 86. |
| 8 · Velocidad/tamaño inventados para el caso del foro | CERRADO | `no-ultima-palabra`, 426, ya no caracteriza la torre como pequeña/lenta. `validar-real`, 712–717, atribuye el criterio de velocidad/flujo/resistencia a Orca y declara que el foro no documenta esas comparaciones. Orca 36 dice «consider using the higher end of that range» para más velocidad/flujo, y 56 «for your intended print speed and strength». No se usa la nota del recolector del foro 130 como observación del participante. |
| 9 · Prioridad funcional dudosa y cierta a la vez | CERRADO | `adhesion-capas`, 346–354, y `leer-adhesion`, 675–681, conservan explícitamente que la prioridad por rotura es secundaria y sin corroborar, igual que `resolucion-contradictoria`, 411–420. 3D Printer Stuff 125 dice «prioritize the section that's hardest to break» y 135 prioriza adhesión para uso funcional. La tendencia general de Orca 50 («generally improve adhesion») se distingue de ese procedimiento, sin prometer mejora monotónica ni ensayo normalizado. |
| 10 · Bajar siempre mejora acabado e hilos | CERRADO | `leer-visual`, 684–690, prioriza resultados observados dentro de un rango que imprima correctamente y advierte de hilos, subextrusión y peor acabado por demasiado frío. Concuerda con `stringing-bajo`, 328, y `acabado`, 370. Orca 48 dice «but going too low can cause it too»; 3D Printer Stuff 129 describe textura mate/rugosa por frío, y 133–137 sitúa la prioridad visual dentro de una comparación de resultados, no de una ley ilimitada. |
| 11 · Cifras operativas fuera de `valor` | CERRADO | Comprobados sus seis subcasos, detallados debajo. Las 12 reglas que muestran cifras operativas tienen `valor` y `alcance`; no se han dejado otras cifras operativas sólo en el porqué. |
| 12 · Orden invertido de la cita de carretes | CERRADO | `carretes-pla.cita.texto`, 462–465, ahora contiene sólo «Optimal temperatures across PLA spools range from 195°C to 218°C.», que aparece literalmente en 3D Printer Stuff 141. Se ha quitado la composición que trasladaba después una frase anterior; no queda inversión ni falsa continuidad. |

### Los seis subcasos del hallazgo 11

| Regla anterior | Cierre actual |
|---|---|
| `secciones-pla` | `valor`, guía 550: incluye 7 secciones, pasos de 5 °C y la serie completa; original 3D Printer Stuff 57. |
| `orca-auto-scale` | `valor`, 605: mitad del diámetro y referencia boquilla 0,4 mm/capa 0,2 mm; original Orca 40. El porqué ya no es el único lugar del tamaño de referencia. |
| `ajustes-impresion` | Eliminada como regla prescriptiva. La tarjeta 268–277 conserva el ejemplo acotado sin refrigeración PLA generalizada. Ventilador aparece en su regla PLA, con `valor` en 634 y `alcance` en 637; original 3D Printer Stuff 97. |
| `leer-voladizo` | `valor`, 660: «60° frente a 45° en el modelo descrito»; original 3D Printer Stuff 121. |
| `colores` | `valor`, 730: diferencia posible de 5–10 °C, sin compensación automática; original 3D Printer Stuff 27. |
| `recalibrar` | `valor`, 739: rango afirmado de 195–218 °C; no queda la referencia numérica a 200 °C escondida en su porqué. Original 3D Printer Stuff 141. |

## Comprobación completa de respaldo y citas

Se han buscado fragmentos de afirmaciones y citas en los cinco originales y leído su contexto. Se han contemplado escapes Markdown (`190\.`, `8\.2`, `0\.4`), enlaces, negritas y citas abreviadas por omisión. No se exige que una cita compuesta aparezca concatenada en una sola cadena; sí que existan sus partes, mantengan el orden y no alteren atribución o sentido.

La siguiente trazabilidad cubre las 38 tarjetas, incluidas las afirmaciones que exceden su cita breve. Las reglas reutilizan estos mismos datos; su aplicación, sus valores y sus alcances se han comprobado aparte en el apartado de estructura y en el cierre anterior.

| Tarjeta(s) | Original comprobado y datos |
|---|---|
| `que-es` | Creality 17: modelo de calibración, filamento concreto, niveles y ejemplo 240/235/230 °C. |
| `que-evalua` | Orca 32: stringing, adhesión, «warping (overhang)» y puenteado; no se convierte el paréntesis en diagnóstico de despegue de cama. |
| `que-no-mide` | Bambu 36–39, 41, 63, 81–89, 101–103: pruebas separadas de temperatura, flow, PA, retracción, caudal máximo y VFA. La cita compuesta conserva el orden. No se usa esa separación para excluir temperatura como causa de subextrusión. |
| `aislar` | 3D Printer Stuff 87 y 93–97: perfil habitual, temperatura como variable y retracción conservada; identificado como procedimiento secundario no corroborado. |
| `por-material` | Creality 93: PLA/ABS/PETG/TPU y distinta fusión/unión por material. |
| `rango-pla`, `rango-abs`, `rango-petg` | Creality 91–93: 190–220, 230–260 y 220–250 °C; tratados como orientaciones, con variación de contexto, no temperaturas universales. |
| `secciones-pla` | 3D Printer Stuff 57: 190–220 °C, siete secciones, pasos de 5 °C y secuencia exacta; ejemplo PLA secundario. |
| `caracteristicas` | 3D Printer Stuff 37–45: puentes, 30/45/60°, pilares, detalle fino y paredes; geometría dependiente del modelo. |
| `creality-print` | Creality 41 y 45: niveles visibles, botón Filament, pincel, temperatura y alturas de los niveles. |
| `cura` | Creality 56–62: ruta de menú, Z y temperatura por cambio, previsualización y cálculo mediante grosor/capas. |
| `cura-ejemplo-pla` | 3D Printer Stuff 51, 65–77: nombre Smart Compact Temperature Tower, autor gaaZolee, 220/215/210/205 °C y 8,2/16,4/24,6 mm. Se mantiene como contexto del ejemplo, no aval independiente o modelo obligatorio. |
| `prusa` | 3D Printer Stuff 83: «Add height range modifier» y temperatura por rango. La guía lo presenta como límite documental, sin afirmar haber probado el programa ni verificar oficialmente esa interfaz. |
| `orca` | Orca 40: opción activa por defecto, referencia 0,4/0,2 mm, escalado y capa mitad del diámetro, excepción para modelo original. |
| `orca-belt` | Orca 44: impresora de banda, Standard, Overhang y L invertida. La cita omite formato/enlaces, no contenido ni condición. |
| `ajustes-impresion` | 3D Printer Stuff 87–101: 0,2 mm, 50–60 mm/s, 10–15 %, 35–50 min y 8–15 g. Se conservan subordinación al perfil, dependencia de modelo/configuración y precedencia del autoescalado Orca 40. |
| `perfil-pla` | 3D Printer Stuff 95–97: 60 °C y 100 % tras capa 3 expresamente PLA, ejemplos no obligatorios. |
| `seccion-altura` | 3D Printer Stuff 77: 8,0–8,2 mm y 40–41 capas con 0,2 mm, según modelo. Los dos fragmentos de la cita están en el orden original. |
| `puenteado` | 3D Printer Stuff 113: puente plano, comba por calor y anclajes por frío; criterio secundario no exclusivo. Orca 52 corrobora combado por exceso de temperatura, no todo el diagnóstico de anclajes. |
| `stringing` | 3D Printer Stuff 117: cero hilos, viscosidad/rezume y revisión separada de retracción si persisten en todas las secciones; mecanismo e inferencia señalados como secundarios no corroborados. |
| `stringing-bajo` | Orca 28 y 48: bajar suele ayudar, pero exceso de frío también produce hilos y puede producir subextrusión/mala adhesión. |
| `voladizos` | 3D Printer Stuff 121: comparación 45/60°, suavidad, comba y curvatura; no se garantiza limpieza universal a 45°. |
| `adhesion-capas` | Creality 67 y 3D Printer Stuff 125: flexión/rotura frente a prioridad funcional por la sección difícil de romper, con sus distintos grados de respaldo. |
| `adhesion-orca` | Orca 50: mejora general de adhesión con mayor temperatura, no garantía para cada aumento. |
| `acabado` | 3D Printer Stuff 129 y Creality 71: paredes, brillos/blobs y textura en frío; se identifica qué explicación sólo aporta la secundaria y no se promete mejora ilimitada al bajar. |
| `overhangs-orca` | Orca 52: temperatura más alta puede ayudar al flujo; exceso provoca comba. |
| `creality-lectura` | Creality 67–75: flexión/rotura, puentes/voladizos, acabado/detalle, hilos, anillos en esquinas y desgaste de detalle. Las partes de la cita abreviada siguen ese orden. |
| `orca-rango-medio` | Orca 36: medio del rango bueno y considerar extremo alto para más velocidad/flujo. |
| `resolucion-contradictoria` | 3D Printer Stuff 133–139: ejemplo 210/215/205 °C, prioridades funcional/visual/general y margen de 5 °C; presentados como propuestas secundarias no corroboradas dentro de un rango imprimible. |
| `no-ultima-palabra` | Foro 35–39 y 59: Samuel, PLA 180–250 °C, preferencia visual por 180 °C, paro, sospecha y recuperación relatada. No se confirma atasco ni causa única, ni se inventa contexto de tamaño/velocidad. |
| `filamento-seco` | Foro 89, 105, 119–121: consejo y posibilidad de Diem, relato de Samuel a 200 °C; sin humedad confirmada ni ensayo de secado. Las voces no se intercambian. |
| `colores` | 3D Printer Stuff 27: 5–10 °C y pigmentos; fuente única y explicación no corroborada. |
| `carretes-pla` | 3D Printer Stuff 141: 195–218 °C; sin presentar muestra/método no documentados ni invertir el literal. |
| `ambiente` | Creality 87: corrientes, caída brusca, uniones frágiles y enfriamiento no uniforme. |
| `sin-indicadores` | Creality 84: mayoría sin indicadores y modelo ajustable marcado; cita abreviada en orden. No contradice que el modelo concreto de la secundaria sí lleve etiquetas. |
| `alturas-z` | Creality 81: cambio demasiado pronto/tarde o ausente por altura incorrecta. |
| `opinion-pla-foro` | Foro 69–79: Avinash dice «In my experience» y 205–215. La tarjeta sin objeto `cita` mantiene atribución, fuente única y falta de universalidad; no se trata como dato oficial. |

Las afirmaciones de entrada y diferencial se contrastaron asimismo con Creality 17, 67–73; Orca 28–32, 48–52; Bambu 36–89 y el caso de foro 35–59. No prometen una causa exclusiva por aspecto ni garantía de imprimibilidad. Los cinco casos fuera de alcance delimitan las calibraciones separadas recogidas en el cocinado; no añaden cifras nuevas ni contradicen la capa de Orca.

## Coherencia, estructura y funcionamiento

- **Orden:** `diferencial` precede a `variables`, `conocimiento` y `reglas`. Tiene tres comprobaciones completas; la salida a flow no se usa como descarte automático.
- **Variables activas:** `material` cambia rangos, ejemplos y acciones PLA/ABS/PETG; `slicer` cambia tarjetas y acciones de configuración; `uso` selecciona las tres prioridades funcional/visual/general. Todas declaran `para`. No se exige inventar rangos propios para TPU/otro cuando el corpus no los aporta.
- **Alcanzabilidad:** las 17 condiciones de reglas usan exclusivamente opciones declaradas de `material`, `slicer` y `uso`; la condición conjunta Cura+PLA se puede completar. Las 9 reglas generales no exigen una variable inexistente. No hay reglas muertas ni condiciones imposibles.
- **Filtrado:** cama y ventilador numéricos sólo PLA; serie de Cura sólo Cura+PLA; rangos sólo su material. Los ejemplos generales de geometría/perfil se explican como dependientes del modelo y no como obligaciones universales. Banda está limitada expresamente en texto y alcance aunque no haya una variable de tipo de impresora.
- **Acciones:** las cifras operativas están en los 12 `valor`, con sus alcances; ninguna cifra operativa queda únicamente enterrada en el porqué. Las 26 reglas tienen `alcance`, también las que no requieren números.
- **Orden de reglas:** preparación/perfil y rango/modelo preceden a configuración por slicer y lectura/selección. La sugerencia de secado aparece antes de las reglas de lectura; no introduce una dependencia de estado que impida llegar a las demás.
- **Certeza y contradicciones:** las recomendaciones secundarias mantienen su cautela en tarjetas y reglas. El ejemplo de perfil no desplaza el autoescalado; frío y calor tienen sus límites; prioridad funcional no equivale a mejora monotónica; prioridad visual no equivale a bajar siempre. Los rangos PLA general, entre carretes y de opinión se conservan con fuentes y alcances diferentes, sin promediarlos.
- **Sin relleno:** no se encuentran las fórmulas de IA indicadas. Las tarjetas sin cifras aportan comparaciones, operaciones, límites de diagnóstico o condiciones concretas; no se rechazan por carecer de números ni se impone mínimo de palabras.
- **Fuera de alcance:** cinco entradas, con caso, motivo y destino; la altura de capa deja de declararse universal y el apartado de humedad mantiene incertidumbre.

## URL, atribución y enlaces

- Las cinco URL de `fuentes`, guía 776, 781, 786, 791 y 796, coinciden exactamente con el `url` de la línea 3 de cada original correspondiente. No hay duplicados. Se comprueba correspondencia documental; no disponibilidad HTTP en vivo.
- Se han cotejado los 37 objetos `cita`, incluyendo literales breves, listas abreviadas y citas con formato retirado. La primera cita está en 87–91, antes de la mitad de las 801 líneas y dentro de la primera tarjeta. No hay una cita compuesta con el orden invertido.
- En el foro, la sospecha y actualizaciones son de samuel.jimenez, 35–61 y 105; el rango de experiencia es de Avinash, 77; secado y «New does not mean dry» son de Diem, 89 y 119–121. No se confunden propuestas, resultados y notas del recolector.
- `flow-rate`, `temperatura-cama`, `temperatura-hotend`, `altura-capa` y `voladizos-y-soportes` están importados y registrados en `src/lib/guias.ts:18,23,29–32,78`; se han comprobado sus declaraciones `slug` en los módulos correspondientes, no inferido los slugs del nombre de archivo. Las seis referencias resuelven a esos cinco destinos existentes.

## Fallos y notas no bloqueantes

**Ningún fallo pendiente ni nuevo.** No se requiere corregir la guía por esta revisión documental. La aprobación no sustituye las pruebas automatizadas previstas en la sesión principal.
