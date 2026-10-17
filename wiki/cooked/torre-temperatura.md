---
titulo: Torre de temperatura (nozzle)
tema: torre-temperatura
fuentes:
  - wiki/raw/torre-temperatura-creality.md
  - wiki/raw/torre-temperatura-prusa-forum.md
  - wiki/raw/torre-temperatura-orcaslicer.md
  - wiki/raw/torre-temperatura-3dprinterstuff.md
  - wiki/raw/torre-temperatura-bambu.md
cocinado: 2026-10-17
---

## Afirmaciones

### Qué mide y qué no

- La torre de temperatura es un modelo de calibración (torre vertical con varias secciones/bloques) para determinar la temperatura de boquilla ideal para un filamento específico; cada nivel se imprime a una temperatura distinta (ej. 240 °C en la base, luego 235 °C, 230 °C…).
  > Cita: "A temp tower is a calibration model used in 3D printing to determine the ideal nozzle temperature for a specific filament. It's printed in sections, with each level produced at a slightly different temperature — for example, 240 °C at the base, then 235 °C, 230 °C, and so on."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- La torre compara stringing, adhesión entre capas, deformación de voladizos (el original dice "warping (overhang)") y puenteado (bridging); se busca la temperatura que produce la mayor calidad con menos problemas. No equiparar esa mención de voladizos con un diagnóstico de warping en la cama.
  > Cita: "The optimal temperature is the one that produces the highest-quality print with the fewest issues, such as stringing, layer adhesion problems, warping (overhang), and poor bridging."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17; corroboración: [Bambu Lab Wiki](https://wiki.bambulab.com/en/bambu-studio/Calibration), capturado 2026-10-17 (`wiki/raw/torre-temperatura-bambu.md:38–39`).

- En el modelo descrito por 3D Printer Stuff, cada sección incluye características sensibles a la temperatura: puenteado (vanos horizontales sin soporte), voladizos (30°, 45°, 60°), stringing (pilares finos con huecos, muestra rendimiento de retracción a esa temperatura), detalle fino (texto pequeño/geometrías) y acabado superficial (paredes planas). **[UNA SOLA FUENTE — guía secundaria, geometría dependiente del modelo, sin corroborar]**
  > Cita: "- **Bridging**, horizontal spans between two points with no support underneath - **Overhangs**, angled surfaces at 30°, 45°, and 60° - **Stringing**, thin pillars with gaps that show retraction performance at temperature - **Fine detail**, small text or geometric features - **Surface finish**, flat walls that reveal layer consistency"
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Creality — criterios de lectura: adhesión entre capas (flexionar/romper), puenteado y voladizos (comba/curvatura), acabado superficial y detalle (blobs, zits, anillos en esquinas; temperaturas bajas = acabado nítido pero posible sub-extrusión; altas = flujo más suave pero blobs/brillo), stringing/oozing (líneas finas, excesivo a temperaturas altas), artefactos varios (comba en voladizos altos, detalle desgastado en paredes finas).
  > Cita: "Layer adhesion: Try flexing or snapping the printed pieces... Bridging and overhangs: Check the quality with which the printer bridged... Surface finish and detail: Inspect the sidewalls... Look for blobs, zits, or corner ringing... Stringing/oozing: Observe to determine whether there are thin lines... Miscellaneous artifacts: Look for slumping on tall overhangs or worn detail in thin walls."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- Para aislar la temperatura, 3D Printer Stuff pide conservar los ajustes normales de impresión para todo excepto la temperatura; es el objetivo del procedimiento, no una garantía de que no intervengan otros factores. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  > Cita: "Use your normal print settings for everything except temperature. The point is to isolate temperature as the only variable"
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- La torre compara temperaturas de boquilla, no sustituye las calibraciones de flow rate, pressure advance, retracción, velocidad volumétrica máxima y VFA que Bambu Lab documenta por separado. Que existan pruebas distintas NO permite excluir temperatura como causa de defectos de extrusión. En esta fuente la torre tampoco constituye una calibración de cama o ambiente.
  > Cita: "Flow Rate ... Pressure Advance ... Retraction Test ... Max Flowrate ... VFA (Vertical Fined Artifacts)..."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/bambu-studio/Calibration), capturado 2026-10-17

- **Respaldo para un diferencial no categórico:** una temperatura baja puede producir subextrusión, mala adhesión entre capas y stringing. Por tanto, huecos o falta de material no bastan para afirmar «es flow, no temperatura»; las fuentes no ofrecen esa regla de exclusión ni una identificación inequívoca de sobreextrusión por acumulación junto a perímetros.
  > Cita: "Low temperature can lead to under-extrusion, poor layer adhesion, and stringing."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17 (`wiki/raw/torre-temperatura-orcaslicer.md:28`). Corroboración: [Creality](https://www.creality.com/blog/temperature-tower), "Lower temps produce a crisp finish but may produce under-extrusion" (`wiki/raw/torre-temperatura-creality.md:71`), y [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), "Print too cold, and you get weak layer adhesion and under-extrusion" (`wiki/raw/torre-temperatura-3dprinterstuff.md:25`), capturados 2026-10-17. **No convertir esta posibilidad en diagnóstico automático de temperatura baja.**

- Cada material (PLA, ABS, PETG, TPU…) requiere su propia torre, porque cada material funde y se adhiere de forma distinta.
  > Cita: "No, each filament type — such as PLA, ABS, PETG, or TPU — requires its own temperature tower because every material melts and bonds differently."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- Rangos orientativos por material (FAQ Creality), no valores absolutos: PLA suele estar entre 190–220 °C; ABS entre 230–260 °C; PETG entre 220–250 °C. Varían según marca, color y configuración de impresora.
  > Cita: "The best temperature for PLA usually falls between 190 °C and 220 °C, but it varies depending on the filament brand, color, and printer setup... ABS typically prints between 230 °C and 260 °C, while PETG performs best between 220 °C and 250 °C."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

### Configuración

- Versión PLA del modelo propuesto por 3D Printer Stuff: rango 190–220 °C en incrementos de 5 °C → 7 secciones: 220, 215, 210, 205, 200, 195, 190. **[UNA SOLA FUENTE — guía secundaria, modelo concreto, sin corroborar la secuencia]**
  > Cita: "For PLA, grab the version that covers 190-220°C in 5°C increments. That gives you 7 sections: 220, 215, 210, 205, 200, 195, 190."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Modelo que recomienda 3D Printer Stuff: "Smart Compact Temperature Tower" de gaaZolee en Printables (lo describe como compacto, con puenteado/voladizos y etiquetas claras). **[UNA SOLA FUENTE — guía secundaria, sin corroborar]** Es contexto del ejemplo, no recomendación independiente verificada ni requisito para usar una torre.
  > Cita: "I recommend the 'Smart Compact Temperature Tower' by gaaZolee on Printables."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Creality Print: botón "Filament" y luego icono de pincel para fijar la temperatura del extrusor a alturas de capa exactas, coincidiendo con cada nivel de la torre.
  > Cita: "press the 'Filament' button and afterward the brush icon to set the extruder temperature to exact layer heights, matching each level of the tower."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- Cura (Change at Z / ChangeAtZ): por cada sección añadir un script con su altura Z y temperatura. En el ejemplo PLA de 3D Printer Stuff se empieza a 220 °C, luego 215 °C a 8,2 mm, 210 °C a 16,4 mm y 205 °C a 24,6 mm. **[UNA SOLA FUENTE — guía secundaria, secuencia PLA y alturas dependientes del modelo, sin corroborar]** El mecanismo es general; esas temperaturas no son una receta para ABS/PETG/TPU y esas alturas no se trasladan a otro modelo sin comprobarlas.
  > Cita: "Set your starting temperature to the highest value (220°C for PLA)... Set 'Change Height' to the Z height where the second section starts (usually 8.2 mm)... Set the new temperature to 215°C... Repeat: add another ChangeAtZ script for each section, 210°C at 16.4 mm, 205°C at 24.6 mm, etc."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Cura (Creality): Extensions > Post Processing > Modify G-Code > Add a script > Change at Height; altura Z y nueva temperatura por sección; previsualizar el G-code. Cálculo de alturas: grosor de capa × capas por sección (ej. 0,2 mm × 50 capas = 10 mm).
  > Cita: "Go to Extensions > Post Processing > Modify G-Code. Click Add a script and select Change at Height... Tip: For Z height calculations, multiply layer thickness (e.g., 0.2mm) by layers per section (e.g., 50 layers = 10mm)."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- PrusaSlicer, según 3D Printer Stuff: clic derecho en el deslizador de capas → "Add height range modifier" → nueva temperatura por rango; sin script de post-procesado. **[UNA SOLA FUENTE — guía secundaria, sin corroboración oficial ni prueba del programa en este corpus]**
  > Cita: "Right-click the layer slider on the right side, select 'Add height range modifier,' and set a new temperature for each range. No post-processing script needed."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- OrcaSlicer — auto-escalado por boquilla: el modelo de referencia está diseñado para boquilla de 0,4 mm a 0,2 mm de altura de capa; con la opción activa (por defecto) la torre se escala al diámetro de boquilla y la altura de capa se fija a la mitad de este, para que las características se mantengan visibles; desactivar solo para imprimir el modelo original a 0,4 mm.
  > Cita: "'Auto-scale for nozzle' is enabled by default in the test dialog. The reference model is designed around a 0.4 mm nozzle at 0.2 mm layer height; with the option enabled, the tower is scaled to your nozzle diameter and the layer height is set to half of it, so all of its features stay properly scaled and visible regardless of the nozzle size you use."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17

- Impresora de banda (belt): selección de modelo de prueba Standard (torre seccionada) vs Overhang (piezas en L invertida para evaluar voladizos por temperatura).
  > Cita: "On a belt printer, the test dialog includes a Test model selection. Standard prints a sectioned tower, while Overhang prints test pieces shaped like an inverted L to assess overhang quality at each temperature."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17

- Ejemplo de ajustes de 3D Printer Stuff, subordinado a conservar el perfil habitual: capa 0,2 mm, velocidad 50–60 mm/s y relleno 10–15 %; mantener la retracción actual. **[UNA SOLA FUENTE — guía secundaria, ejemplo de perfil/modelo, no receta universal, sin corroborar los valores]** No ordenar cambiar una velocidad habitual distinta a 50–60 mm/s. En OrcaSlicer con autoescalado activo rige su capa calculada (mitad del diámetro), NO una imposición de 0,2 mm; 0,2 mm corresponde a su referencia de boquilla de 0,4 mm.
  > Cita: "**Layer height:** 0.2 mm (standard) ... **Speed:** 50-60 mm/s (your normal speed) ... **Retraction:** Keep your current settings... **Infill:** 10-15% is fine"
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- **Sólo PLA, ejemplo de ese perfil:** cama habitual de PLA (la fuente cita 60 °C como estándar) y ventilador al 100 % tras la capa 3, que el original llama "normal PLA settings". **[UNA SOLA FUENTE — guía secundaria, sin corroborar]** No aplicar esas cifras a ABS, PETG, TPU u otro material, ni ofrecerlas como sustitución obligatoria de cualquier perfil PLA. El corpus no da aquí cifras equivalentes para los demás materiales.
  > Cita: "Your normal PLA bed temp (60°C is standard)." / "100% fan after layer 3 (normal PLA settings)"
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17 (`wiki/raw/torre-temperatura-3dprinterstuff.md:95–97`).

- Para ese ejemplo, la fuente estima 35–50 min según velocidad y modelo de torre, y habitualmente 8–15 g de filamento. **[UNA SOLA FUENTE — guía secundaria, estimaciones dependientes de configuración/modelo, sin corroborar]** No son duración ni consumo garantizados para cualquier torre o autoescalado.
  > Cita: "The print should take 35-50 minutes depending on your speed and the tower model. Use minimal filament, usually 8-15 grams."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17 (`wiki/raw/torre-temperatura-3dprinterstuff.md:101`).

- Cada sección mide típicamente 8,0–8,2 mm; con capas de 0,2 mm son 40–41 capas por sección. **[UNA SOLA FUENTE — guía secundaria, modelo-dependiente, sin corroborar]**
  > Cita: "Each section is typically 8.0-8.2 mm tall... With 0.2 mm layers, each section is 40-41 layers."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Buscar un modelo con niveles claramente espaciados y visibles.
  > Cita: "Look for a model with clearly spaced and visible levels."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

### Interpretación

- OrcaSlicer: si un rango de temperaturas se ve bien, usar el medio del rango como óptimo; si se planea imprimir a mayor velocidad o mayor flujo, considerar el extremo alto del rango.
  > Cita: "If a range of temperatures looks good, use the middle of that range as the optimal temperature. If you plan to print at higher speeds or flow rates, consider using the higher end of that range."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17

- Puenteado (bridging), lectura de 3D Printer Stuff: buen puente = plano sin caída en el centro; demasiado caliente → el centro se comba; demasiado frío → el filamento no se adhiere a los anclajes y queda un hueco desordenado; elegir la sección con el puente más plano. **[UNA SOLA FUENTE — guía secundaria, sin corroborar el criterio detallado de anclajes/selección]** Orca corrobora la tendencia al combado por exceso de temperatura, no un diagnóstico exclusivo por la forma del puente.
  > Cita: "A good bridge is flat, with no drooping in the middle. Too hot and the middle sags visibly. Too cold and the filament doesn't stick to the anchor points and you get a messy gap. Pick the section where the bridge is flattest."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Stringing, según 3D Printer Stuff: observar huecos entre pilares y buscar cero hilos; atribuye más stringing a mayor temperatura por fundido menos viscoso que rezuma en viajes. La tendencia general también aparece en Creality, pero NO implica que bajar siempre mejore (véase OrcaSlicer a continuación). Si todas las secciones tienen hilos, propone ajustar retracción aparte. **[UNA SOLA FUENTE — guía secundaria, sin corroborar el mecanismo detallado ni la inferencia sobre todas las secciones; no diagnóstico exclusivo]**
  > Cita: "You want zero strings (thin filament hairs) between them. Higher temperatures cause more stringing because the melted filament is less viscous and oozes during travel moves. If every section strings, your retraction settings also need tuning, but that's a different calibration."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- OrcaSlicer: stringing — las temperaturas bajas suelen reducir el stringing, pero bajar demasiado también puede causarlo.
  > Cita: "Stringing: lower temperatures typically reduce stringing, but going too low can cause it too."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17

- Voladizos (overhangs), en el modelo de 3D Printer Stuff: la guía dice que el de 45° debería salir limpio en casi cualquier temperatura y usa el de 60° para comparar; demasiado caliente → se comba; demasiado frío → las capas no se adhieren y se curvan; propone elegir el 60° más suave. **[UNA SOLA FUENTE — guía secundaria, criterio dependiente del modelo, sin corroborar]** No garantizar limpieza universal a 45° ni que cualquier torre incluya esos ángulos.
  > Cita: "The 45° overhang should be clean at almost any temperature. The 60° overhang is the real test, too hot and it droops, too cold and the layers don't bond properly and you get curling. Find the temp where the 60° overhang is smoothest."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Adhesión entre capas: comparar por flexión/rotura (también propuesto por Creality). 3D Printer Stuff recomienda para piezas funcionales priorizar la sección más difícil de romper aunque el acabado no sea el más bonito. **[UNA SOLA FUENTE — guía secundaria, sin corroborar esa prioridad de selección funcional]** Separar esa recomendación de la tendencia general de OrcaSlicer (mayor temperatura suele mejorar adhesión), que no es una garantía monotónica ni una medición normalizada de resistencia.
  > Cita: "Try to snap each section by bending it. Higher temperatures produce better layer adhesion because the new layer bonds more thoroughly to the one below. If you're printing functional parts that need strength, prioritize the section that's hardest to break, even if the surface finish isn't quite as pretty."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- OrcaSlicer: adhesión/resistencia — las temperaturas más altas generalmente mejoran la adhesión.
  > Cita: "Layer adhesion / strength: higher temperatures generally improve adhesion."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17

- Acabado superficial, según 3D Printer Stuff: paredes planas consistentes y suaves; demasiado caliente → brillos y blobs (corroborado por Creality); demasiado frío → textura mate/ligeramente rugosa por flujo intercapa incompleto. **[UNA SOLA FUENTE — guía secundaria, sin corroborar la explicación de textura en frío]** No derivar una regla de que bajar siempre mejora el acabado.
  > Cita: "Consistent, smooth layers with no blobbing or rough patches indicate good temperature. Too hot and you'll see shiny spots and blobs. Too cold and you'll see matte, slightly rough texture from incomplete inter-layer flow."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- OrcaSlicer: voladizos/puenteado — temperaturas más altas ayudan al flujo, pero demasiado alto causa combado.
  > Cita: "Overhangs / bridging: higher temperatures can help flow, but too high causes sagging."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17

### Limitaciones

- **Caso antes/después, útil pero no ensayo causal:** samuel.jimenez consideró mejor el nivel a 180 °C de su torre PLA de 180 a 250 °C; al intentar imprimir a 180 °C, la impresora dejó de imprimir. El autor SOSPECHÓ una obstrucción, sin confirmarla. Después informó de que retiró/reintrodujo el filamento, calentó a 250 °C y volvió a extruir; pudo imprimir una figura, pero describió falta de material en parte de ella. No documenta una causa única ni que el resto de la figura se imprimiera a 250 °C. **[UNA SOLA FUENTE — testimonio de foro, sin corroborar]**
  > Cita: "the 3d stopped printing. I feel like the nozzle got cloaked, I'm checking it up now." / "I removed and put the filament again and heat it up to 250º and it started to extrude. Then, I tried to print a 3d figure again and it worked."
  — [foro Prusa, samuel.jimenez](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 03/07/2024 (`wiki/raw/torre-temperatura-prusa-forum.md:35–61`). **NO pasar a la guía como «180 °C atascó la boquilla», ni como evidencia de obstrucción parcial o disipación deficiente.**

- Filamento "nuevo" no significa "seco": Diem señala la posibilidad de humedad durante almacén/transporte y pregunta si se ha probado a secar. **[UNA SOLA FUENTE — foro, sin corroborar esta explicación del estado de un carrete nuevo]** No se confirma humedad de ese carrete ni se registra un ensayo de secado. No sostiene independencia causal respecto de la temperatura.
  > Cita: "New does not mean dry. It was packed dry and often with dessicant but you have no way of knowing how long it sat in the wholesale warehouse, how long at the retailer, how it was treated there and in transit. It is very common for new filament already to be damp."
  — [foro Prusa, Diem](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 04/07/2024

- Bambu Lab recomienda secar filamento y comprobar instalación sin fugas de boquilla si persiste mucho stringing en lo alto de una **torre de retracción**. Es corroboración de una comprobación posible ante hilos persistentes, no diagnóstico de humedad de la torre del foro ni receta específica para toda torre de temperatura.
  > Cita: "if there is still a lot of stringing at the top of the tower, it is recommended to dry your filament and ensure that your nozzle is properly installed without any leaks."
  — [Bambu Lab Wiki](https://wiki.bambulab.com/en/bambu-studio/Calibration), capturado 2026-10-17 (`wiki/raw/torre-temperatura-bambu.md:81–86`).

- **Antes/después del mismo caso:** el autor del foro informa más tarde de ausencia de stringing al bajar a 200 °C, sin haber comunicado una prueba de secado. **[UNA SOLA FUENTE — testimonio de foro, sin corroborar]** No prueba que estuviera seco ni que la temperatura sea la única causa; impide presentar el consejo de secado como diagnóstico demostrado de aquel caso.
  > Cita: "Now, lowering the printing temperature helps with filaments around (stringing) (they are not more anymore, using a 200º temperature)"
  — [foro Prusa, samuel.jimenez](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 04/07/2024 (`wiki/raw/torre-temperatura-prusa-forum.md:105`).

- Colores del mismo fabricante pueden tener temperaturas óptimas que difieren 5–10 °C porque los pigmentos afectan el comportamiento de fusión. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  > Cita: "Different colors from the same manufacturer can have different optimal temperatures by 5-10°C because the pigments affect the melt behavior."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Las temperaturas óptimas entre carretes de PLA varían entre 195 y 218 °C; no asumir "todos usan 200 °C". **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  > Cita: "Don't skip this test just because \"everyone uses 200°C for PLA.\" Optimal temperatures across PLA spools range from 195°C to 218°C. Your specific spool on your specific printer has its own sweet spot."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Temperatura ambiente y corrientes: pueden afectar los resultados; una caída brusca enfría el filamento demasiado rápido (uniones frágiles); una habitación muy caliente o con corrientes → enfriamiento no uniforme.
  > Cita: "Room temperature and drafts can impact print results. The abrupt drop in ambient temperature can cool filament too fast, causing layer bonds to be brittle. Conversely, an extremely hot or drafty room can lead to non-uniform cooling."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- La mayoría de STL de torre estándar no llevan indicadores de temperatura impresos → difícil recordar qué temperatura corresponde a cada nivel; usar un modelo ajustable con cada paso marcado.
  > Cita: "Most standard tower STLs lack printed temperature indicators, so it's harder to review the result... use a adjustable tower model where every step is marked with its temperature or height."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

- Alturas Z incorrectas en el script → el cambio de temperatura se aplica demasiado pronto, demasiado tarde o no se aplica.
  > Cita: "If your temperature change triggers are set at the incorrect layer height, the script may apply the new temperature too early, too late, or not at all."
  — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

### Resolución de resultados contradictorios

- 3D Printer Stuff — ejemplo comparativo: si 210 °C da mejor puenteado, 215 °C mejor adhesión y 205 °C menos stringing. **[UNA SOLA FUENTE — guía secundaria, sin corroborar las prioridades de uso y margen numérico]**:
  - Piezas funcionales (soportes, montajes, herramientas): priorizar adhesión entre capas → temperatura más alta.
  - Modelos visuales/decorativos (figurinas): priorizar acabado superficial y mínimo stringing → temperatura más baja.
  - Uso general: elegir la temperatura en el medio del rango que funcione bien en todas las categorías; normalmente 5 °C por encima de la mejor temperatura de stringing. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  > Cita: "For functional parts (brackets, mounts, tools): prioritize layer adhesion. Go with the higher temperature. For visual/display models (figurines, decorative items): prioritize surface finish and minimal stringing. Go with the lower temperature. For general purpose: pick the temperature in the middle of the range that performs well across all categories. Usually that's 5°C above the best stringing temperature."
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17
  **Límite para la guía:** comparar resultados observados dentro de un rango que imprima correctamente; «más baja para visual» no significa bajar sin límite. Mantener la cautela de fuente única también al recomendar selección por rotura para uso funcional; Orca sólo corrobora la tendencia general de adhesión.

- OrcaSlicer pide equilibrar los factores según velocidad y resistencia previstas; su criterio de considerar el extremo alto para más velocidad/flujo consta arriba. **Atribuir este criterio a Orca, no al foro.** El hilo no documenta dimensiones, velocidades ni caudales comparativos de torre y figura.
  > Cita: "Choose a temperature that balances these factors for your intended print speed and strength."
  — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17 (`wiki/raw/torre-temperatura-orcaslicer.md:36,56`).

## Contradicciones

### Stringing vs. temperatura

- Temperaturas bajas pueden causar stringing (además de sub-extrusión y mala adhesión) — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17
- Temperaturas más altas causan más stringing (fundido menos viscoso que rezuma en viajes) — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17; [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17

**Tensión de alcance, no dos leyes universales incompatibles.** Orca admite stringing en ambos extremos y dice que bajar suele reducirlo; 3D Printer Stuff y Creality destacan el exceso de temperatura. El corpus no explica el mecanismo del stringing a temperatura demasiado baja: no inventar rezume irregular, obstrucción o disipación para resolverlo. **El redactor debe conservar ambas advertencias: bajar suele ayudar, pero demasiado frío también puede causar stringing y subextrusión; no recomendar siempre el mínimo.**

### Temperatura "óptima" sugerida por la torre vs. imprimibilidad real

- La mejor sección de la torre indica la temperatura óptima — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), [Creality](https://www.creality.com/blog/temperature-tower), [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), [Bambu Lab Wiki](https://wiki.bambulab.com/en/bambu-studio/Calibration), capturado 2026-10-17
- El autor consideró mejor el nivel a 180 °C, pero al intentar imprimir a ese ajuste la impresora dejó de imprimir; sospechó obstrucción, sin confirmarla — [foro Prusa, samuel.jimenez](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 03/07/2024. **[UNA SOLA FUENTE — testimonio de foro, sin corroborar]**

**Límite práctico del criterio visual, no refutación controlada de la torre.** El testimonio contrapone una preferencia visual y un paro posterior, sin aislar su causa. No documenta una torre pequeña/lenta, ni un atasco confirmado. **El redactor no debe presentar la preferencia visual como garantía de imprimibilidad ni atribuir al foro un contexto de velocidad/flujo ausente.** Para adaptar la elección a velocidad/flujo previstos, usar el criterio explícito de [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib) (`wiki/raw/torre-temperatura-orcaslicer.md:36,56`), capturado 2026-10-17, sin convertirlo en una prueba realizada en aquel hilo.

### "Filamento nuevo = seco"

- El usuario afirma que el filamento era totalmente nuevo, recién abierto del envase — [foro Prusa, samuel.jimenez](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 04/07/2024. **[UNA SOLA FUENTE — foro, sin corroborar]**
- "Nuevo no significa seco": puede haber estado húmedo en almacén/transporte — [foro Prusa, Diem](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 04/07/2024. **[UNA SOLA FUENTE — foro, sin corroborar]**

**No son hechos incompatibles:** el usuario describe que el carrete era nuevo y Diem cuestiona la inferencia «por tanto está seco». La humedad de ese carrete no se confirma ni se ensaya el secado; el autor sí informa de desaparición de hilos a 200 °C (`wiki/raw/torre-temperatura-prusa-forum.md:105`). **El redactor debe mantener la posibilidad y el consejo atribuidos, no declarar humedad diagnosticada, secado exitoso ni causalidad independiente de la temperatura.** Bambu recomienda secar ante hilos persistentes en su prueba de retracción; ese contexto distinto no resuelve el caso del foro.

### Rango de temperatura para PLA

- 190–220 °C — [Creality](https://www.creality.com/blog/temperature-tower), capturado 2026-10-17
- 195–218 °C entre carretes (torre PLA 190–220 °C) — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
- 205–215 °C — [foro Prusa, Avinash](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 03/07/2024. **[UNA SOLA FUENTE — foro, sin corroborar]**

**Discrepancia de alcance y generalización, no elegir ni promediar.** Creality da un rango general condicionado por marca/color/impresora; 3D Printer Stuff afirma un rango entre carretes sin aportar aquí su método o muestra; Avinash dice «In my experience» y lo extiende a todas las marcas, sin demostrarlo. Los dos últimos son datos secundarios de una sola fuente, no rangos universales. **Si el redactor incluye los tres, debe conservar atribución y cautelas, no llamar al del foro una recomendación oficial ni tratar 195–218 °C como ensayo documentado.**

### Ajustes normales, receta de ejemplo y autoescalado

- Conservar ajustes normales; ejemplo de capa 0,2 mm y velocidad 50–60 mm/s; cama 60 °C y ventilador 100 % tras capa 3 expresamente en contexto PLA — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17 (`wiki/raw/torre-temperatura-3dprinterstuff.md:87–101`). **[UNA SOLA FUENTE — guía secundaria, sin corroborar los valores]**
- Autoescalado activo por defecto: capa igual a la mitad del diámetro de boquilla; 0,4/0,2 mm es sólo la referencia — [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp_calib), capturado 2026-10-17 (`wiki/raw/torre-temperatura-orcaslicer.md:40`).

**No hay una receta universal compatible con todos los contextos.** Imponer siempre 0,2 mm contradiría el autoescalado para otras boquillas; imponer 50–60 mm/s contradiría conservar un perfil cuya velocidad habitual sea otra. **El redactor debe explicar el alcance:** valores de ejemplo de una guía secundaria frente al comportamiento explícito del generador Orca; no desactivar o sobrescribir ese comportamiento para forzar el ejemplo. Las cifras PLA no deben convertirse en acciones visibles para otros materiales, y la secuencia numérica PLA de Cura tampoco.

## Sin respaldo

- Avinash opina, según su experiencia, que PLA imprime mejor a 205–215 °C y que 250 °C es muy alto; propone burbujeo por calor como posible explicación de capas con poco material. **[UNA SOLA FUENTE — foro, sin corroborar; no diagnóstico confirmado ni rango universal]**
  — [foro Prusa, Avinash](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 03/07/2024

- Filamento "nuevo" puede estar húmedo (new does not mean dry). **[UNA SOLA FUENTE — foro, sin corroborar]**
  — [foro Prusa, Diem](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 04/07/2024

- Colores del mismo fabricante varían 5–10 °C en temperatura óptima. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Rango afirmado entre carretes de PLA: 195–218 °C, sin muestra ni método de ensayo en este texto. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Resolución de resultados contradictorios: funcional → temperatura más alta; visual → más baja; uso general → medio, normalmente 5 °C por encima del mejor stringing. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Alturas de sección 8,0–8,2 mm (40–41 capas a 0,2 mm) y alturas Z de ejemplo 8,2 / 16,4 / 24,6 mm. **[UNA SOLA FUENTE — guía secundaria, modelo-dependiente, sin corroborar]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Tiempo de impresión 35–50 min y consumo 8–15 g de filamento. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17
  Alcance: estimaciones según modelo/velocidad, no garantías para cualquier configuración.

- Recomendación de modelo STL "Smart Compact Temperature Tower" de gaaZolee. **[UNA SOLA FUENTE — guía secundaria, sin corroborar]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17

- Testimonio de paro tras elegir 180 °C, recuperación tras reinsertar filamento/calentar a 250 °C y posterior ausencia de hilos a 200 °C. **[UNA SOLA FUENTE — foro, sin corroborar]** Son observaciones relatadas, no ensayo causal ni confirmación de atasco.
  — [foro Prusa, samuel.jimenez](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/temperature-tower-3/), 03–04/07/2024 (`wiki/raw/torre-temperatura-prusa-forum.md:35–61,105`).

- Los procedimientos y detalles secundarios marcados en `Afirmaciones` (PrusaSlicer sin verificación oficial, secuencia PLA de Cura, receta de perfil, geometrías y criterios detallados de lectura) conservan su marca al pasar a tarjetas o acciones; el rótulo `tipo: oficial` del raw de 3D Printer Stuff no lo convierte en documentación primaria de los programas. **[UNA SOLA FUENTE — guía secundaria, sin corroborar en los aspectos señalados]**
  — [3D Printer Stuff](https://www.3dprinterstuff.com/workshop/temperature-tower-calibration), capturado 2026-10-17 (`wiki/raw/torre-temperatura-3dprinterstuff.md:37–139`). No degradar a dudosa la tendencia general respaldada por Orca ni elevar a corroborado todo el procedimiento secundario por esa coincidencia parcial.

## Tirado

- **Navegación, menús, migas de pan, compartir, newsletter y promoción comercial** capturados en Creality y 3D Printer Stuff — no aportan datos de la calibración. Índice y enlaces de navegación de Orca sin el contenido enlazado — no se tratan como fuentes adicionales.
- **Imágenes** (fotos de Unsplash y avatares del foro) — no son afirmaciones.
- **Piezas de producto/tienda** de Creality y avisos de afiliación/Amazon de 3D Printer Stuff — fuera del alcance; el aviso no equivale a haber consultado productos enlazados.
- **Formulario de comentarios "Leave a comment" y suscripciones** de 3D Printer Stuff — relleno. No se han localizado cuestionarios o surveys en los cinco textos; se retira esa atribución genérica del cooked anterior.
- **Repetidos**: se conserva definición de Creality y criterio de evaluación de Orca, con Bambu como corroboración; se retiran la ficha duplicada de evaluación Bambu, la segunda lista de lectura Creality y las repeticiones de tiempo/consumo y retracción. No se afirma que el foro formule la misma definición técnica.
- **Texto de navegación de wiki** ("Related Post: PLA Print Temperature Guide" en Creality) sin el contenido enlazado — relleno.
- **Fuera de alcance → otros temas**:
  - Flow rate / flow ratio calibration, pressure advance (PA tower/line/pattern), retraction test, max flowrate, VFA — [Bambu Lab Wiki] → `flow-rate`, `max-volumetric-speed` (y retracción si existe).
  - Secado y almacenamiento de filamento — → `material`.
  - Calibración completa de temperatura de cama — → `temperatura-cama`; aquí sólo se conserva el contexto del ejemplo PLA.
  - Elección general de altura de capa — → `altura-capa`; aquí se conserva la distinción ejemplo/autoescalado, no una altura universal.
  - Voladizos y soportes como tema completo — → `voladizos-y-soportes`.
- **Promoción del modelo de STL** (gaaZolee) — se descarta como mandato o aval independiente; sólo se conserva la recomendación atribuida como contexto del ejemplo.
- **Comentarios de foro off-topic** (superficie, "menos distancia entre capas") — relleno.
- **Navegación de foro** (notificaciones, RSS, avatares, rangos de miembros) — relleno.
- **Correcciones sobre el cooked existente por revisión 1; NO deben pasar a la guía:**
  - «Imprimir a 180 °C atascó la boquilla» / «clog a 180 °C»: retirados como hechos. El original dice «I feel like», hipótesis aún en comprobación (`wiki/raw/torre-temperatura-prusa-forum.md:39`). Las notas del recolector 129–130 no la confirman.
  - «Obstrucción parcial o disipación deficiente falsean la torre» y disipación como causa de stringing: eliminados de afirmaciones y de `Sin respaldo`. Ninguno de los cinco textos aporta esa afirmación; **no es una afirmación de fuente única, es una ampliación sin fuente**.
  - «Humedad causa stringing independientemente de la temperatura», humedad diagnosticada o secado exitoso de ese carrete: eliminados. El foro contiene posibilidad/consejo, no esa causalidad ni un antes/después de secado; Bambu habla de otra prueba.
  - «Modelo pequeño y relativamente lento»: eliminado por no estar documentado en el hilo. Velocidad/flujo se atribuyen a Orca; no a las notas interpretativas del recolector.
  - Exclusión «huecos = flow, no temperatura» y diagnóstico inequívoco por acumulación junto a perímetros: no están respaldados; Orca, Creality y 3D Printer Stuff admiten subextrusión por frío. Tampoco invertirlo en «huecos = temperatura».
  - Receta universal de 0,2 mm, 50–60 mm/s, cama de 60 °C o ventilador 100 % tras capa 3: retirada como mandato general. Se conservan sólo ejemplos y límites; las cifras de cama/ventilador y temperaturas de la serie Cura son PLA. Sin cifras nuevas para otros materiales.
  - Cita de carretes invertida: corregido el orden conforme a `wiki/raw/torre-temperatura-3dprinterstuff.md:141`; puntos suspensivos no autorizan reordenar frases.
  - «Bajar siempre mejora acabado e hilos» y «más caliente siempre da más resistencia»: no son reglas absolutas respaldadas. Preservar límites y la marca secundaria de prioridades funcional/visual donde se usen.
- **Límites de esta vuelta:** sólo se reprocesa este cooked con los cinco raw y los hallazgos de `wiki/reviews/torre-temperatura-revision-1.md`. Ese informe localiza errores, no es una sexta fuente técnica. No hay comprobación en los programas ni investigación externa. No convertir notas del recolector, inferencias o afirmaciones excluidas en evidencia utilizable.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| torre de temperatura | temperatura de hotend | la torre determina la temperatura de boquilla óptima para un filamento específico |
| torre de temperatura | material | cada material (PLA, ABS, PETG, TPU) requiere su propia torre; rangos PLA 190–220, ABS 230–260, PETG 220–250 °C |
| torre de temperatura | temperatura de cama | conservar perfil habitual; 60 °C es el ejemplo PLA de la guía secundaria, no receta para todos los materiales |
| torre de temperatura | altura de capa | Orca calcula mitad del diámetro con autoescalado; 0,4/0,2 mm es su referencia, no altura universal |
| torre de temperatura | voladizos y soportes | compara voladizos/puentes; 30/45/60° son geometrías del modelo de la guía secundaria |
| torre de temperatura | separaciones entre capas | comparar flexión/rotura; Orca dice que mayor temperatura generalmente mejora adhesión, sin garantía absoluta |
| torre de temperatura | flow rate | calibraciones distintas no excluyen temperatura como causa de subextrusión; Orca considera el extremo alto para mayor velocidad/flujo |
| torre de temperatura | max volumetric speed | la torre no mide velocidad volumétrica máxima; es una prueba distinta (Bambu Lab) |
| torre de temperatura | humedad del filamento | Diem recuerda que nuevo no garantiza seco; humedad del carrete no confirmada y sin prueba de secado en el hilo |
| torre de temperatura | ventilador-warping | conservar ajustes habituales; 100 % tras capa 3 es sólo el ejemplo PLA de la guía secundaria |
| torre de temperatura | adhesion-primera-capa | Orca relaciona temperatura de boquilla con flujo y adhesión a la cama (raw Orca:26), sin dar diagnóstico diferencial exclusivo ni calibración de cama |
