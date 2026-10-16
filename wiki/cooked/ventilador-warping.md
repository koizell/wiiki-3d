---
titulo: Ventilador de capa y warping
tema: ventilador-warping
fuentes:
  - wiki/raw/ventilador-warping-prusa-kb-layer-separation-and-splitting-fdm.md
  - wiki/raw/ventilador-warping-bambu-wiki-warping-falling-off-collapsing.md
  - wiki/raw/ventilador-warping-prusa-kb-warping.md
  - wiki/raw/ventilador-warping-simplify3d-print-quality-warping.md
  - wiki/raw/ventilador-warping-creality-blog-warping.md
  - wiki/raw/ventilador-warping-orcaslicer-wiki-material-cooling.md
  - wiki/raw/ventilador-warping-bambu-wiki-overhang.md
  - wiki/raw/ventilador-warping-bambu-wiki-printed-model-warping.md
cocinado: 2026-10-16
---

## Afirmaciones

### Ventilador de capa vs. auxiliar

- El ventilador auxiliar (auxiliary part cooling fan) puede causar warping cuando enfría las paredes exteriores demasiado rápido, especialmente en objetos pequeños o con voladizos altos. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- El ventilador auxiliar se desactiva durante las primeras capas definidas por "No cooling for the first X layers". — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling), capturado 2026-10-16
- El ventilador auxiliar usa el comando G-code `M106 P2 S(0-255)`. — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling), capturado 2026-10-16
- Para mejorar voladizos en PLA, se puede bajar la boquilla a ~205 °C y subir el ventilador de overhang al 100 %. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang), capturado 2026-10-16

### Primeras capas sin ventilador

- Desactivar el ventilador de capa durante las primeras capas mejora la adhesión a la cama y reduce el warping temprano. — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling), capturado 2026-10-16
- Se recomienda "No cooling for the first X layers" = 3 para la mayoría de filamentos comunes (PLA, PETG, TPU). — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- En Bambu Studio, el ajuste "No cooling for first X layers" se encuentra en Filament Settings → Cooling tab. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16

### Velocidad del ventilador auxiliar

- Si hay warping, se recomienda bajar el ventilador auxiliar al 40–50 %. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- El filamento que más se beneficia de un ventilador auxiliar alto es PLA, pero principalmente en objetos pequeños o con voladizos altos. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16

### Corrientes de aire (air drafts)

- Una ventana abierta, aire acondicionado o ventilador de mesa cerca puede enfriar un lado de la pieza más rápido que el otro, causando warping asimétrico. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Las corrientes de aire enfrían el modelo más rápido, aumentando la tensión entre capas y provocando warping. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Una ventana abierta o AC cerca de la impresora aumenta la ocurrencia de warps, especialmente en materiales de alta temperatura. — [Prusa Research](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Ventiladores fuertes o ventanas abiertas crean enfriamiento desigual, especialmente en ABS y Nylon. — [Creality Blog](https://www.creality.com/blog/3d-print-warping), capturado 2026-10-16
- Abrir la puerta y la cubierta de la impresora mejora la refrigeración, pero solo es recomendable para PLA, PETG y TPU; en filamentos de alta temperatura puede causar warping o mala adhesión entre capas. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang), capturado 2026-10-16

### ABS / PLA / PETG y ventilador

- ABS es altamente susceptible a la separación de capas cuando sopla aire frío sobre la pieza antes de que se enfríe por completo; se recomienda apagar los ventiladores por completo. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-16
- Para ABS, es común desactivar cualquier ventilador externo para que las capas se mantengan calientes más tiempo. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/), capturado 2026-10-16
- PLA y PETG necesitan mucha refrigeración; si las esquinas se levantan, se debe verificar que el ventilador funciona y aumentar su velocidad. — [Prusa Research](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Para overhangs abruptos en materiales que no requieren mucha refrigeración (ABS, PC-Blend), se puede habilitar el ventilador al 10–20 %. — [Prusa Research](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Demasiada velocidad del ventilador puede deformar y levantar todo el objeto, y disminuir la adhesión entre capas. — [Prusa Research](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- PLA: "moderate fan speed"; PETG: "Avoid strong cooling fans". — [Creality Blog](https://www.creality.com/blog/3d-print-warping), capturado 2026-10-16
- Materiales de alta temperatura (PETG, ABS, ASA, PA, PC) se imprimen con poca o ninguna refrigeración en impresora cerrada para que el ambiente esté más caliente y permita enfriamiento lento. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16

### Cuándo el ventilador provoca warping

- El ventilador de capa puede causar warping cuando se aplica demasiado enfriamiento a un modelo, especialmente en las primeras capas o en piezas grandes. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16
- Reducir el ventilador de puentes internos puede ayudar a reducir el warping causado por enfriamiento excesivo sobre una superficie grande durante un período prolongado. — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling), capturado 2026-10-16
- Forzar refrigeración en voladizos y puentes puede mejorar la calidad de impresión y reducir el warping. — [OrcaSlicer Wiki](https://github.com/OrcaSlicer/OrcaSlicer/wiki/material_cooling), capturado 2026-10-16
- La separación de capas ocurre cuando las capas enfrían a ritmos distintos y las fuerzas de warping superan la adhesión entre capas. — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-16

### Temperaturas de cama por material

- PLA: cama 55–65 °C en Textured PEI Plate. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- ABS/ASA: aumentar cama +10–15 °C y usar cerramiento; la cámara debe alcanzar 40 °C+. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- ABS: cama 100–120 °C. — [Simplify3D](https://www.simplify3d.com/resources/print-quality-troubleshooting/warping/), capturado 2026-10-16
- Si la habitación está por debajo de 20 °C, el warping puede ocurrir incluso con PLA y PETG. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- En impresoras abiertas (ej. Bambu A1), aumentar la cama +10 °C para compensar el ambiente frío. — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16

### Velocidad de primeras capas

- Primera capa a 20–30 mm/s para dar tiempo al filamento a fundirse en la cama. — [Creality Blog](https://www.creality.com/blog/3d-print-warping), capturado 2026-10-16
- Primeras capas a 40–50 mm/s para mejor control de enfriamiento. — [Creality Blog](https://www.creality.com/blog/3d-print-warping), capturado 2026-10-16

## Contradicciones

### Velocidad del ventilador auxiliar para evitar warping

- Reducir un 20–30 % — [Bambu Lab Wiki](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing), capturado 2026-10-16
- Bajar al 40–50 % — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16

**Se contradicen.** Ambas son páginas oficiales de Bambu Lab. La primera (página de filament-acc) habla de reducir el ventilador auxiliar un 20–30 % cuando ya hay warping. La segunda (página de knowledge-sharing) recomienda bajarlo al 40–50 % de forma preventiva. **El redactor tiene que explicar el matiz: una es correctiva (reducir 20–30 % del valor actual) y la otra es un valor objetivo (40–50 % del máximo). No son lo mismo, pero ambas deben aparecer.**

### ABS: ¿ventilador apagado o al 10–20 %?

- Apagar ventiladores por completo para ABS — [Prusa Research](https://help.prusa3d.com/article/layer-separation-and-splitting-fdm_1806), capturado 2026-10-16
- Habilitar ventilador al 10–20 % para overhangs incluso en ABS/PC-Blend — [Prusa Research](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16

**Se contradicen.** La primera fuente (separación de capas) dice apagar el ventilador por completo en ABS. La segunda (warping) recomienda un 10–20 % para overhangs abruptos incluso en ABS. **El redactor tiene que explicar el matiz: el ventilador apagado es la regla general para ABS; el 10–20 % es una excepción específica para overhangs donde el ventilador es necesario para la calidad del voladizo, no para el warping.**

### PLA: ¿mucho ventilador o cuidado con el exceso?

- PLA y PETG necesitan mucha refrigeración; aumentar el ventilador si las esquinas se levantan — [Prusa Research](https://help.prusa3d.com/article/warping_2011), capturado 2026-10-16
- Demasiado enfriamiento en PLA puede causar warping — [Bambu Lab Wiki](https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping), capturado 2026-10-16

**Se contradicen.** Prusa dice que PLA necesita mucho ventilador y que si hay que levantar esquinas hay que aumentar el ventilador. Bambu dice que demasiado enfriamiento en PLA puede causar warping. **El redactor tiene que explicar el matiz: el ventilador ayuda a la adhesión de la primera capa y a la calidad de los voladizos, pero un exceso de enfriamiento en las primeras capas o en piezas grandes puede causar warping. La clave está en el equilibrio y en el número de capas iniciales sin ventilador.**

## Sin respaldo

- PLA: cama 50–60 °C. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- ABS: cama 90–110 °C. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- PETG: cama 70 °C. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- Nylon: cama 100–110 °C. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- Primera capa a 20–30 mm/s. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- Primeras capas a 40–50 mm/s. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- PLA: bajar boquilla a 205 °C y fan al 100 % para overhangs. **[UNA SOLA FUENTE — Bambu Lab Wiki (overhang), sin corroborar]**
- Overhang speed: 10–60 mm/s. **[UNA SOLA FUENTE — Bambu Lab Wiki (overhang), sin corroborar]**
- Habitación estable a 20–25 °C con baja humedad. **[UNA SOLA FUENTE — Creality Blog, sin corroborar]**
- ABS se encoge casi 1,5 % al pasar de 230 °C al ambiente. **[UNA SOLA FUENTE — Simplify3D, sin corroborar]**

## Tirado

- **Navegación y menús:** todos los ficheros contenían menús de navegación, migas de pan, "Related wiki links" sin contenido, y pies de página. Eliminados.
- **Anuncios y banners:** Creality Blog tiene tono de tutorial SEO con frases de relleno ("As an expert, I've narrowed down..."). Eliminado.
- **FAQs de Creality:** las preguntas y respuestas del blog de Creality son texto de relleno sin datos técnicos accionables. Eliminado.
- **"Wrapping Up" de Creality:** párrafo final sin contenido técnico. Eliminado.
- **Notas del recolector:** las notas al final de cada fichero raw son para el cocinero, no para el artículo. Eliminadas.
- **Imágenes:** todas las fuentes referencian imágenes en CDN que no se han descargado. No se han incluido.
- **Tabla de materiales de Creality:** la tabla de "Specific Filament Types to Avoid Warping" contiene cifras sin respaldo (ver apartado "Sin respaldo"). Solo se han extraído las cifras únicas.
- **Ajustes de slicer sin relación con ventilador/warping:** OrcaSlicer contiene muchos ajustes de refrigeración (ironing fan speed, support interface fan speed, exhaust fan, etc.) que no están directamente relacionados con el warping. Solo se han incluido los que sí lo están.
- **Flow-rate / extrusion multiplier:** Prusa menciona aumentar el extrusion multiplier en incrementos del 5 % para mejorar la adhesión entre capas, pero no está relacionado con el ventilador. Eliminado de este fichero.
- **Soportes y reorientación de modelos:** Bambu menciona añadir soportes y reorientar modelos para evitar colapsos, pero no está relacionado con el ventilador. Eliminado de este fichero.
- **Limpieza de la cama y nivelación:** aunque son importantes para evitar warping, no están relacionadas con el ventilador. Eliminado de este fichero.
- **Humedad del filamento:** Bambu menciona que el filamento húmedo puede causar problemas, pero no está relacionado con el ventilador. Eliminado de este fichero.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| Ventilador de capa | Warping | Demasiado enfriamiento en las primeras capas o en piezas grandes puede causar warping |
| Ventilador de capa | Adhesión a la cama | Sin ventilador en las primeras 3 capas, la primera capa se adhiere mejor |
| Ventilador auxiliar | Warping | Enfría las paredes exteriores demasiado rápido, especialmente en objetos pequeños |
| Ventilador auxiliar | Voladizos | Necesario para calidad de voladizos, pero puede causar warping si es demasiado alto |
| Corrientes de aire | Warping | Enfrian un lado de la pieza más rápido, causando warping asimétrico |
| Temperatura ambiente | Warping | Por debajo de 20 °C, el warping ocurre incluso con PLA y PETG |
| Temperatura de cama | Warping | Una cama demasiado fría reduce la adhesión y aumenta el warping |
| ABS | Ventilador | ABS requiere ventilador apagado (regla general) o 10–20 % (excepción para overhangs) |
| PLA | Ventilador | PLA necesita mucho ventilador, pero demasiado puede causar warping |
| PETG | Ventilador | PETG requiere evitar ventiladores fuertes |
| Separación de capas | Ventilador | Capas que enfrían a ritmos distintos → fuerzas de warping → grieta |
| Infill pattern | Warping | Gyroid se encoge más uniformemente que Grid o Triangles |
