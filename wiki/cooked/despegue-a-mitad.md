---
titulo: Despegue a mitad de impresión (warping, despegue de cama y colapso)
tema: despegue-a-mitad
fuentes:
  - wiki/raw/despegue-a-mitad-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/despegue-a-mitad-bambu-wiki-printed-model-warping.md
  - wiki/raw/despegue-a-mitad-prusa-knowledge-base-warping.md
  - wiki/raw/despegue-a-mitad-prusa-forum-adjusting-settings-warping-of-pla.md
  - wiki/raw/despegue-a-mitad-simplify3d-print-quality-warping.md
  - wiki/raw/despegue-a-mitad-simplify3d-print-quality-not-sticking-to-the-bed.md
cocinado: 2026-10-16
---

## Afirmaciones

### Distinguir el síntoma (Bambu)

- **Corner lifting / warping**: las esquinas o bordes se curvan hacia arriba fuera de la cama, a veces a mitad de la impresión; se puede ver una línea horizontal ondulada en el lateral donde la boquilla volvió a golpear la capa levantada. Causa raíz: contracción térmica; los bordes exteriores se enfrían más rápido que el centro y la tensión levanta las esquinas. Más común en impresiones grandes, mayor densidad de relleno y materiales con contracción: ABS, ASA, PC, PA y PA-CF. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Orden de riesgo de contracción (mayor a menor): PC → PA-CF → PA → ABS → ASA → PETG → PLA. Para impresiones grandes y planas, cuando sea posible usar PLA, PLA-CF, PETG o PETG-CF. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- **Bed adhesion failure**: el modelo completo se desplaza, desliza o salta de la cama a mitad de la impresión. Causa raíz: agarre insuficiente entre la primera capa y la superficie. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Causas comunes de fallo de adhesión: huellas o grasa en la placa (aceites de la piel son la causa #1); tipo de placa mal seleccionado en el slicer; Z-offset demasiado alto, boquilla demasiado lejos de la cama en la primera capa. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- **Structural collapse**: la parte superior parece un nido de pájaro o las capas superiores quedan desplazadas lateralmente respecto a la base. Causa mecánica o de adhesión: la boquilla derribó un modelo alto y delgado por vibración a alta velocidad; patrones de relleno que cruzan (Grid, Triangles) generan pequeños bultos dentro de una capa que la boquilla engancha en el siguiente pase; correas flojas que dan "slop" mecánico. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Warping mínimo puede pasar desapercibido pero aún así dejar defectos visibles en las paredes laterales y las capas superiores; es fácil confundirlo con un problema de extrusión o de flujo. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Correa floja produce un clic/traqueteo irregular en los ejes X o Y durante la impresión; una correa bien tensada se siente firme, como una cuerda de guitarra, con ligero rebote. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16

### Placas, offset y temperaturas de cama

- Placa Cool Plate: PLA a 35 °C. Placa Textured PEI: PLA a 55–65 °C. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing) y [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), ambos capturados 2026-10-16
- La placa Textured PEI tiene superficie granular y el firmware baja la boquilla 0,04 mm tras nivelar la cama para asegurar la adhesión de la primera capa. Si se imprime en Textured PEI pero se selecciona otro tipo de placa al laminar, la altura de la boquilla queda demasiado alta y empeora la adhesión del primer layer. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing) y [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturados 2026-10-16
- PLA tiende a adherir bien en cama calentada a 60–70 °C; ABS suele ir mejor a 100–120 °C. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16
- Una pieza de ABS de 100 mm que enfría de 230 °C a 30 °C se encoge casi 1,5 mm; el ABS se contrae casi un 1,5 % al pasar de 230 °C a temperatura ambiente. — [Simplify3D, "Warping"](https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/) y [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturados 2026-10-16
- Para ABS, cama calentada a 100–120 °C reduce de forma significativa la contracción de las capas inferiores. — [Simplify3D, "Warping"](https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/), capturado 2026-10-16
- En Simplify3D el Z-Axis global G-Code Offset permite ajustes finos: por ejemplo, −0,05 mm acerca la boquilla 0,05 mm. Cada layer suele ser de unos 0,2 mm de espesor, de modo que un ajuste pequeño tiene gran efecto. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16

### Enfriamiento y ventiladores

- PLA se beneficia de todo el cooling posible cuando se imprime rápido, pero puede haber situaciones en las que un cooling excesivo provoque warping. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- "No cooling for the first X layers": idealmente sin cooling las primeras 3 capas en los filamentos más comunes (PLA, PETG, TPU, etc.), para mejorar la adhesión y el enfriamiento lento de las capas impresas y evitar warping y fallos. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping) y [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturados 2026-10-16
- Para "first layer not sticking", deshabilitar el part cooling fan en las primeras 3 capas ("No cooling for first X layers" = 3 en Filament Settings → Cooling). — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Ajustar el Auxiliary part cooling fan bajándolo a unos 40–50 % cuando hay warping. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- El filamento que más se beneficia de un Auxiliary part cooling fan alto es el PLA, sobre todo en objetos pequeños o modelos con high overhangs. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- El Auxiliary part cooling fan a alta velocidad enfría las paredes exteriores demasiado rápido; reducirlo un 20–30 % ayuda en warping, sobre todo en objetos pequeños o con high overhang. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- PLA y PETG necesitan mucho cooling. Si las esquinas se levantan, revisar que el ventilador de capa esté activo y probar aumentar su velocidad; verificar que funciona y que el shroud no esté obstruido o fundido. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Si steep overhangs o piezas pequeñas warpean, activar el ventilador de capa a baja velocidad (10–20 %) incluso para materiales que no requieren cooling, como ABS o PC-Blend. Demasiada velocidad puede warpear y levantar el objeto completo y reducir la adhesión capa a capa; el objetivo es enfriar ni demasiado rápido ni demasiado lento. Si al subir la velocidad baja la adhesión entre capas o aparecen grietas, subir la temperatura de la boquilla para recuperar el bonding. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Para ABS, es común deshabilitar el cooling fan durante toda la impresión; para otros casos, setpoints típicos: layer 1 al 0 % y layer 5 al 100 %. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16
- Si se imprime en ambiente con corrientes de aire, aislar la impresora para alejar el viento de la pieza. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16

### Temperatura ambiente, corrientes y recinto

- Si la habitación está por debajo de 20 °C, aparecen problemas de warping incluso con PLA y PETG. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping) y [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturados 2026-10-16
- Corrientes de aire (ventana abierta, salida de aire acondicionado, ventilador de mesa) enfrían un lado de la impresión más rápido que el otro y causan warping desigual. Bloquear el flujo de aire alrededor de la impresora y cerrar puerta y tapa superior en impresoras cerradas. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Para ABS, ASA, PA y PC, la impresora cerrada con cámara calentada es esencial; en impresoras open-frame (p. ej. Bambu A1) conviene aumentar la temperatura de cama otros +10 °C para compensar cuando hace frío. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- AB/ASA/PC de gran tamaño planas warpean casi siempre sin enclosure; si no hay enclosure, cambiar a PLA, PLA-CF, PETG o PETG-CF para impresiones grandes. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing) y [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturados 2026-10-16
- Las ventanas o el aire acondicionado cerca de la impresora aumentan la aparición de warps en materiales de alta temperatura, que requieren una temperatura ambiente estable y más alta. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Para materiales de alta temperatura se recomienda recinto; imprimir PLA o PETG en recinto puede no ser buena idea, porque necesitan mucho cooling y es más difícil conseguirlo con una temperatura ambiente alta. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

### Relleno, geometría y velocidad

- En entorno frío (habitación bajo 20 °C) conviene aumentar la temperatura de cama +10 °C para frenar el enfriamiento entre capas y asegurar que no haya corrientes de aire. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Relleno por defecto 15 %; ejemplo de infill alto que provoca warping: 60 %. Evitar más de 50 % de relleno; para piezas estructurales usar 5 paredes y unos 25 % de relleno; para piezas no estructurales, 2 paredes y 15 %. Los patrones con líneas rectas (Grid, Triangles) se contraen más; cambiar a Gyroid reduce el riesgo porque se contrae de forma más uniforme en todas direcciones. — [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Para warping en modelos grandes y planos: cambiar el patrón de relleno a Gyroid con densidad ≤25 %; Grid y Triangle generan tensión lineal interna. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Para "tall thin model collapse": reducir velocidad de impresión y aceleración en 20–30 %; activar supports; considerar reorientar el modelo para que quede tumbado. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Reducir velocidad de impresión puede ayudar mucho en materiales de alta propensión al warping, haciendo que el conjunto se asiente y las capas se fundan correctamente; el PC-Blend de Prusament es de bajo warping comparado con otros, pero bajar velocidad igual ayuda. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Brim de 8–10 mm para PLA que levanta esquinas (además del brim). Esquinas afiladas que se levantan: usar Brim Ears del tipo Painted en Bambu Studio, dirigido solo a las esquinas que se levantan. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- El brim aumenta la adhesión a la superficie de impresión; si no basta, añadir una pequeña geometría (p. ej. un cilindro) en la zona problemática. También usar pollera/skirt (draft shield) para retener calor en y alrededor del objeto en materiales de alta temperatura como PC-Blend, ASA o ABS; imprimir más objetos a la vez. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- El brim o el raft ayudan a sujetar los bordes; son útiles si las piezas siguen curvándose más adelante; por su altura (pocas capas) warpean menos. — [Simplify3D, "Warping"](https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/), capturado 2026-10-16
- Para piezas pequeñas sin superficie suficiente de apoyo, usar brim o raft para aumentar el área de contacto con la cama. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16
- La boquilla al golpear/raza el modelo: bajar la velocidad de relleno y usar patrones Line, Rectilinear, Gyroid o Concentric (Grid y Triangle cruzan en una sola capa y generan un bulto mínimo que la boquilla engancha en el siguiente pase). — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16

### Adhesión de primer layer, nivelación y offset

- Ejecutar ABL (Automatic Bed Levelling) tras mover la impresora, mantenimiento o actualizaciones de firmware. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Comprobar que la boquilla esté instalada correctamente, con los clips bien fijados. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- La primera capa debe quedar ligeramente aplastada en la cama, no flotando. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- La placa debe estar nivelada; una boquilla que empieza demasiado lejos o demasiado cerca empeora la adhesión; imprimir el primer layer más despacio (p. ej. 50 %) ayuda a que el plástico se pegue antes de la siguiente capa. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16
- Bajar un poco el Live Adjust Z aumenta la adhesión, pero sin sobrecosquiar la primera capa. Con PETG o PC la adhesión puede ser excesiva y dañar la superficie PEI. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

### Limpieza de la placa

- Lavar la placa con agua tibia y jabón (friega), enjuagar y secar al aire; nunca tocar la superficie con las manos desnudas después de limpiar. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Antes de imprimir, limpiar la superficie con IPA al 90 %+ (libre de grasa). — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Eliminar polvo, grasa o aceites de la placa con agua o alcohol isopropílico. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16

### Adhesivos, cintas y superficies

- Glue stick como booster de emergencia para filamentos tozudos, sobre todo ABS, ASA, PA y PC; aplicar una capa fina y uniforme; se disuelve fácilmente con agua. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Una capa fina de glue stick aplicada con la placa fría puede ayudar a la adhesión y actuar como capa de separación, protegiendo la chapa del desgaste. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- PLA suele pegar bien sobre cinta de pintor azul; ABS, sobre Kapton/Polyimide film; BuildTak suele sujetar bien PLA; el vidrio borosilicato va bien con ABS caliente. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16
- Spray de cabello, glue sticks y otras sustancias pegajosas funcionan bien si todo lo demás falla. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16

### Químicos y degradación mencionados

- Absorción de humedad: si se oyen crujidos/petardeos al imprimir o se ven superficies ásperas, burbujeantes o stringy, el filamento ha absorbido humedad; secar antes de reintentar. Guardar el filamento no usado en bolsas selladas o contenedores herméticos con gel de sílice; Nylon y PC absorben humedad en pocas horas en ambiente húmedo, no dejar en el portabobinas durante la noche. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Mantenimiento: revisar residuos en el piñón del extrusor; inspeccionar el tubo PTFE por grietas, amarilleo o bloqueos; confirmar que el cabezal se mueve libremente en X, Y, Z sin tirones ni rozaduras. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Superficie PEI: con PETG o PC la adhesión puede ser excesiva y dañar la chapa (riesgo mecánico/químico de la superficie por adherencia excesiva). — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

## Contradicciones

### Temperatura de cama para PLA

- 35 °C (Cool Plate) — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- 55–65 °C (Textured PEI) — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- 60–70 °C — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16
- "debes subir (no bajar) la temperatura, máximo 65 °C" — [foro Prusa, respuesta de Lichtjaeger, 27/06/2019](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)

**Se contradicen en el número**, pero la causa habitual es la **superficie** y el contexto: Bambu separa Cool Plate (35 °C) de Textured PEI (55–65 °C); Simplify3D da un rango genérico de 60–70 °C; el foro aplica a chapa PEI lisa Prusa con un techo de 65 °C. El redactor tiene que explicar que el número depende del tipo de placa, no elegir un único valor.

### Cooling por ventilador en warping de PLA

- Reducir el Auxiliary part cooling fan un 20–30 % y deshabilitar el cooling las primeras 3 capas para evitar que el enfriamiento excesivo curve las esquinas. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing) y [Bambu Lab Wiki, "Printed Model Warping"](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturados 2026-10-16
- PLA y PETG necesitan mucho cooling; si las esquinas se levantan, revisar que el ventilador de capa esté activo y probar a **aumentar** su velocidad; demasiada velocidad puede levantar el objeto entero y reducir la adhesión entre capas. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

**Se contradicen en la dirección del ajuste**, y el matiz es real: Bambu parte de que un cooling excesivo (sobre todo el auxiliar) desencadena el warping de esquinas; Prusa parte de que PLA necesita mucho cooling y que un ventilador parado o insuficiente levanta las esquinas. Ambas coinciden en los extremos (cooling de 0 en ABS; cooling completo demasiado pronto perjudica a ABS). El redactor debe exponer ambos marcos en lugar de elegir uno.

### Recinto (enclosure) para PLA y PETG

- Para ABS/ASA/PA/PC el recinto con cámara calentada es esencial; las guías Bambu se centran en estos materiales y, en impresoras open-frame (p. ej. A1), compensan con +10 °C de cama. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Imprimir PLA o PETG en recinto **puede no ser buena idea**, porque necesitan mucho cooling y es más difícil lograrlo con temperatura ambiente alta. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

**Matiz, no contradicción total**: Bambu no prohíbe el recinto con PLA, pero toda su guía de recinto va dirigida a materiales de alta temperatura; Prusa lo desaconseja explícitamente para PLA/PETG. El redactor debe presentar la cautela de Prusa sin borrar la recomendación de Bambu para altas temperaturas.

### Limpieza de la placa (rutinas)

- Agua tibia y jabón, enjuagar y secar al aire; no tocar con las manos desnudas. — [Bambu Lab Wiki, "Model Warping, Falling Off, or Collapsing"](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Limpiar con IPA al 90 %+ antes de imprimir. — [Prusa Knowledge Base, "Warping"](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Enjuague con alcohol cada pocos prints; lavado con agua caliente a menudo; acetona una vez al mes; manejar la placa solo por los bordes. — [foro Prusa, respuesta de @illustrious member, 28/06/2019](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/)
- Agua o alcohol isopropílico para retirar polvo, grasa o aceites. — [Simplify3D, "Not Sticking to the Bed"](https://www.simplify3d.com/resources/print-quality-troubleshooting/not-sticking-to-the-bed/), capturado 2026-10-16

**No se excluyen entre sí**, pero las rutinas y las prioridades difieren según fabricante y superficie (Bambu prioriza agua+jabón como limpieza principal; Prusa combina IPA y acetona periódica; Simplify3D acepta agua o IPA). El redactor debe presentarlas como alternativas complementarias y señalar que acetona mensual sólo aparece en el foro de Prusa.

## Sin respaldo

- "Bajar la temperatura de cama a 50 °C y luego a 40 °C no ayudó; subir la temperatura y chaflanar las aristas del modelo marcó una gran diferencia" (antes/después reportado por quien abrió el hilo). **[UNA SOLA FUENTE — foro, sin corroborar]**
- "Un raft de tres capas ayudó, pero dejó una superficie fea; se consideró excesivo." **[UNA SOLA FUENTE — foro, sin corroborar]**
- "Por los huecos del brim, se puede bajar un poco la altura de la primera capa." **[UNA SOLA FUENTE — foro, sin corroborar]**
- Rutina de limpieza del foro: enjuague con alcohol cada pocos prints, lavado con agua caliente a menudo, acetona una vez al mes, manipular la placa solo por los bordes. **[UNA SOLA FUENTE — foro, sin corroborar]**
- Ajustes de slicer sugeridos en el foro por Lichtjaeger: aumentar la altura de la primera capa, aumentar el ancho de layer, reducir el número de capas inferiores (bottom layers) y redondear/chaflanar las esquinas. **[UNA SOLA FUENTE — foro, sin corroborar]**
- "primera capa debe ser perfecta; si aún no va bien, glue stick; imprimir un modelo cuadrado grande con glue stick." **[UNA SOLA FUENTE — foro, sin corroborar]**
- Adaptación de filament (no hay cita): que el PLA se beneficia de una cama a +10 °C en impresoras open-frame no se contradice, pero la cifra exacta de "máximo 65 °C" para PLA viene sólo del foro. **[UNA SOLA FUENTE — foro, sin corroborar]**

## Tirado

- Navegación "Related wiki links" de la página "Printed Model Warping" (enlaces a "Model Warping, Falling Off, or Collapsing" y "Tips for using discs…") sin el contenido enlazado. — eliminado.
- Notas del recolector de los seis ficheros (metadatos de captura, sesgos, observaciones sobre duplicación) — eliminadas del material cocinado; solo se conservan las afirmaciones.
- Texto promocional "We hope the detailed guide provided has been helpful and informative" y secciones de cierre sin contenido técnico. — eliminado.
- Repetición entre las dos páginas de Bambu (warping en general y "Printed Model Warping") sobre cama, cooling, ambiente e infill: se consolidó en una sola afirmación por dato y se citan ambas como corroboración. — deduplicado.
- Contenido del foro que era conversación de soporte (fotos faltantes, presentaciones, "thanks" del topic starter) — descartado; solo se conservaron los tips y el antes/después.
- Guías hermanas de Simplify3D (Layer Separation, Under-Extrusion, etc.) referenciadas pero no descargadas en las fuentes disponibles; no se afirman sus contenidos. — fuera de alcance.
- Diagnósticos generales (\"La impresión 3D ha revolucionado...\") no presentes. — n/a.
- Las erratas del original ("tempearture") no se propagaron.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| corner warping (PLA) | adhesión a la cama | sin agarre inicial, la contracción levanta la pieza desde el borde y puede terminar en despegue total |
| corner warping (PLA) | temperatura ambiente | por debajo de 20 °C ocurre incluso con PLA y PETG |
| cooling excesivo (PLA) | warping de esquinas | el aire del auxiliar enfría las paredes exteriores demasiado rápido |
| cooling insuficiente (PLA) | warping de esquinas | ventilador parado o lento deja enfriar mal las capas y puede levantar esquinas según Prusa |
| infill Grid/Triangles | nozzle scraping / collapse | cruzan en una sola capa y generan un bulto que la boquilla golpea al siguiente pase |
| infill Gyroid ≤25 % | reducción de warping | se contrae de forma más uniforme en todas direcciones |
| brim 8–10 mm / Brim Ears | corner warping (PLA) | aumenta el área de contacto en las esquinas que se levantan |
| Textured PEI Plate | Z-offset -0,04 mm auto | seleccionar mal la placa en el slicer desactiva el offset y deja el first layer alto |
| glue stick | adhesión en ABS/ASA/PA/PC | booster de emergencia; capa fina y uniforme; además protege la chapa como capa de separación |
| first layer speed lento | bed adhesion | da tiempo a que el plástico se adhiera a la placa |
| ambient <20 °C | PLA/PETG warping | incluso materiales tolerantes warpean en frío |
| PLA en recinto | cooling | PLA y PETG necesitan mucho cooling, que es difícil en ambiente caliente (Prusa) |
| humedad en filamento | adhesión superficial | crackling/burbujas/streaming; secar y guardar con desecante |
| correas flojas | structural collapse | clicking/traqueteo; correa bien tensada como cuerda de guitarra |
| raft de 3 capas | warping | ayuda a sujetar pero empeora el acabado superficial (foro, sin corroborar) |