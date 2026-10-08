---
titulo: Enclosure y warping
tema: enclosure-y-warping
fuentes:
  - wiki/raw/enclosure-y-warping-bambu-wiki-chamber-temperature.md
  - wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md
  - wiki/raw/enclosure-y-warping-prusa-forum-optimal-enclosure-temps.md
  - wiki/raw/enclosure-y-warping-bambu-forum-pla-in-x1c.md
cocinado: 2026-10-06
---

# Enclosure y warping

## Afirmaciones

### Qué es el enclosure y por qué existe

- El enclosure sirve para **prevenir corrientes de aire** que enfrían un lado de la pieza más que otro, y para **elevar ligeramente la temperatura ambiente** alrededor de la pieza. — [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- Bambu Lab recomienda **cerrar la puerta frontal y la cubierta superior** en impresoras cerradas para bloquear el flujo de aire durante la impresión. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)

### Temperatura de cámara recomendada por filamento (Bambu Lab, oficial)

| Filamento | Temperatura de cámara recomendada |
|---|---|
| PLA | 0 °C (desactivar calefacción de cámara) |
| PETG | 0 °C (desactivar calefacción de cámara) |
| TPU | 0 °C (desactivar calefacción de cámara) |
| PVA | 0 °C (desactivar calefacción de cámara) |
| ABS | 40–50 °C |
| ASA | 40–50 °C |
| PC | 50–60 °C |
| PA-CF | 50–60 °C |
| PAHT-CF | 50–60 °C |
| PET-CF | 50–60 °C |
| PPA-CF | 50–60 °C |
| PPS | 50–60 °C |
| PPS-CF | 50–60 °C |

— [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

- **ADVERTENCIA oficial de Bambu Lab:** no habilitar temperatura de cámara alta cuando se imprime PLA, PETG, TPU, PVA u otros filamentos de baja temperatura. Habilitar temperatura de cámara alta puede causar que estos filamentos se ablanden y se alojen en el extrusor, resultando en problemas de obstrucción. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

### Temperatura de reblandecimiento y cuándo abrir la puerta

- La temperatura de reblandecimiento de la mayoría de los PLA es de aproximadamente **45 °C**, y la del PETG es de aproximadamente **70 °C**. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- Cuando la temperatura de la cama es **igual o mayor que la temperatura de reblandecimiento del filamento**, Bambu Lab recomienda **abrir la puerta frontal y/o quitar la cubierta superior** para evitar que el calor excesivo de la cámara ablande y deforme el filamento. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- Cuando la temperatura ambiente es alta, la temperatura de cámara real es más alta y la necesidad de abrir la puerta y/o quitar la cubierta es **más fuerte**; cuando la temperatura ambiente es baja, es **menos necesaria**. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

### Heat creep: el mecanismo que conecta enclosure y obstrucción

- **Heat creep** es un fenómeno en el que el calor del bloque caliente viaja hacia arriba por el tubo de calor (heatbreak) y calienta el filamento por encima de su temperatura de ablandamiento antes de que entre en el bloque caliente. Esto causa que el filamento se ablande y se expanda, provocando obstrucciones y sub-extrusión. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
- La **Cool Plate** está diseñada específicamente para ofrecer buena adhesión para PLA a una temperatura de cama de ~35 °C. Con la Cool Plate, la temperatura de cámara dentro de la impresora **no alcanza un valor lo suficientemente alto** como para causar el ablandamiento del filamento PLA. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
- Cuando se imprime PLA con la **Textured PEI Plate** o la **High-Temperature PEI Plate**, se recomienda imprimir con la **puerta frontal abierta y/o la cubierta superior retirada** para ayudar a mantener baja la temperatura de la cámara, minimizando las posibilidades de obstrucción del extrusor o hotend. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
- Las placas de terceros que requieren una temperatura de cama **superior a 50 °C** para funcionar de manera fiable también necesitan la puerta frontal abierta y/o la cubierta superior retirada para evitar obstrucciones del extrusor o hotend. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)

### Cuándo cerrar el enclosure para PLA (Bambu Lab, oficial)

- Cuando se imprimen filamentos con temperaturas de ablandamiento bajas, si la temperatura ambiente es **extremadamente baja (ej. 5–10 °C)**, se puede **cerrar la puerta frontal e instalar la cubierta superior** para elevar la temperatura de la cámara, lo que también puede prevenir el warping. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
- Si el extrusor o hotend se obstruye después de seguir este procedimiento, **abrir la puerta ligeramente** permite que el aire caliente interno circule con el aire externo más frío, lo que ayuda a bajar la temperatura de la cámara y estabilizar la distribución de temperatura. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)

### X1E: enclosure calentado para filamentos de alta temperatura

- La X1E ofrece un control de calefacción de cámara adicional, con una temperatura de cámara máxima de **60 °C**. Temperaturas de cámara más altas pueden **suprimir el warping** de ciertas impresiones de filamentos de alta temperatura y proporcionar mayor resistencia entre capas. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- Cuando se imprimen filamentos de alta temperatura como PC, PA-CF, PAHT-CF, PET-CF, PPA-CF, PPS y PPS-CF, seleccionar X1E y habilitar una temperatura de cámara de 60 °C puede resultar en **mejor precisión dimensional y calidad visual**. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

### Foro de Prusa: temperaturas de enclosure por filamento

- **Para PLA:** Neophyl recomienda **20–25 °C** de ambiente. Por encima de 30 °C ambiente, el hotend V6 de Prusa es más propenso a sufrir heat creep y por tanto a obstruirse, especialmente con modelos que tienen muchas retracciones. — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Para PLA:** Artur5 recomienda **no menos de 20 °C ni más de 30 °C**, especialmente con el heatbreak de stock de Prusa. Otros hotends son más permisivos (menos propensos al heat creep). — [Artur5, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Para PETG:** BogdanH recomienda aumentar la temperatura ambiente unos **10 °C** para prevenir warping en objetos grandes. Artur5 recomienda **20–40 °C**. — [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), [Artur5, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Para ABS/ASA:** BogdanH recomienda **40–50 °C** para prevenir warping. Si se supera ese rango, hay peligro de que las piezas impresas de la impresora (hechas de PETG) se deformen. — [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Para ABS/ASA/PC/PA:** Artur5 recomienda **cuanto más alta sea la temperatura dentro del enclosure, mejor**. — [Artur5, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Para PETG con K1:** Ondrej Liptak usa cama a 70 °C y configura el ventilador de escape del enclosure para que arranque a **45 °C** de temperatura de cámara. Recomienda al menos **20 °C menos que la cama**. — [Ondrej Liptak, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Enclosure Lack sin calefacción:** Artur5 indica que es muy poco probable que se superen **45–50 °C** en un enclosure Lack calentado solo por la cama, a menos que la temperatura ambiente sea absurdamente alta. — [Artur5, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)

### Foro de Prusa: cuándo abrir vs cerrar según filamento

- **Neophyl:** Su enclosure Lack se calienta solo por la cama. Está ahí para **mantener las corrientes de aire alejadas** de las impresiones y el polvo fuera cuando no está en uso. **Para imprimir PLA las puertas están abiertas.** En invierno el ambiente es de 23–24 °C, en verano de 30 °C. Para PETG cierra las puertas y llega a unos 30 °C; en verano incluso para PETG abre las puertas un poco para mantener esa temperatura por la refrigeración del hotend. — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **BogdanH:** No se necesitan ajustes especiales si se imprime dentro de un enclosure. Los ajustes recomendados por el fabricante del filamento siguen siendo perfectamente válidos. El enclosure sirve para que la temperatura ambiente aumente ligeramente (la cama calienta el aire circundante) y para **prevenir corrientes de aire**, lo que previene el warping (o la separación de capas). — [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **BogdanH:** Tener un enclosure es de gran beneficio si la temperatura de la habitación (en invierno) es baja (**por debajo de 20 °C**). Sin embargo, también puede causar problemas en verano, porque hay que enfriar las capas impresas adecuadamente durante la impresión, y eso puede ser problemático si la temperatura dentro del enclosure es demasiado alta. — [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)

### Foro de Bambu: PLA en X1C

- **Eno:** Una cámara cálida ayuda contra el curling y el warping en PLA. Normalmente objetivo **35–39 °C** de temperatura de cámara con puerta y tapa cerradas. — [Eno, foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
- **Excepciones de Eno:** (1) Cuando se imprime con la **Textured PEI plate** (que requiere temperaturas de cama más altas), necesita abrir la puerta para prevenir heat creep. (2) Cuando la temperatura ambiente es alta (verano), necesita abrir la puerta para evitar que la cámara se caliente demasiado. — [Eno, foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
- **Otro usuario:** Su X1C está en un armario (con la puerta del armario quitada) y siempre imprime PLA con la puerta cerrada y la tapa de vidrio en su sitio (con el AMS encima). Como la casa se mantiene a una temperatura confortable para humanos, la temperatura de cámara **rara vez supera los 33 °C** y no ha tenido obstrucciones de boquilla. — [Foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
- **Otro usuario:** Depende de la temperatura ambiente de la habitación. Su sótano, donde está la impresora, suele estar a **18 °C**. Deja la unidad cerrada para que las corrientes no levanten las esquinas. Si fuera verano y arriba, las temperaturas pueden llegar a **26 °C**, así que la abre. — [Foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
- **Otro usuario:** Inicialmente imprimía con la puerta y la tapa cerradas, pero consigue **mejor calidad de impresión con ellas abiertas** cuando imprime PLA y PETG HF. Imprime a altas velocidades y en buena calidad durante el verano australiano, donde las temperaturas donde está la impresora pueden llegar a **40 °C** algunos días. Todos sus problemas de heat creep y bloqueos del extrusor terminaron cuando instaló un hotend Obxidian. — [Foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)

## Contradicciones

**No se resuelven aquí.** Se anotan con su matiz, y el redactor tiene que explicar el matiz en el artículo en vez de elegir un número.

### 1. Enclosure cerrado vs abierto para PLA: la contradicción central

- **Prusa (foro):** Para PLA se quiere **frío, 20–25 °C**. Las puertas del enclosure **abiertas** para PLA. — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **Bambu (wiki, oficial):** Para PLA con **Textured PEI Plate**, se recomienda imprimir con la **puerta abierta y/o la tapa retirada** para mantener baja la temperatura de la cámara. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
- **Bambu (wiki, oficial):** Para PLA con **Cool Plate** (~35 °C de cama), la temperatura de cámara **no alcanza un valor lo suficientemente alto** como para causar ablandamiento del filamento, y se puede imprimir con puerta y tapa cerradas. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
- **Bambu (foro):** Eno recomienda **35–39 °C de cámara con puerta y tapa cerradas** para PLA. — [Eno, foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
- **Bambu (wiki, oficial):** Cuando la temperatura ambiente es **extremadamente baja (5–10 °C)**, se puede **cerrar la puerta e instalar la cubierta** para elevar la temperatura de la cámara y prevenir el warping. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)

**Se contradicen.** Las tres pueden ser correctas según la situación: la primera habla del rango general para PLA con hotend V6 de Prusa, la segunda de un caso con Textured PEI (cama alta), la tercera de qué hacer cuando el ambiente es muy frío. **El redactor tiene que explicar el matiz, no elegir un número.**

**El matiz, en cuatro partes:**

1. **La chapa decide.** Con Cool Plate (cama ~35 °C), la cámara no se calienta lo suficiente como para causar heat creep, y se puede cerrar. Con Textured PEI (cama 55–65 °C), la cámara se calienta más y hay que abrir. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
2. **La temperatura ambiente decide.** Con ambiente frío (5–10 °C), cerrar ayuda a prevenir warping. Con ambiente alto (verano, 26–40 °C), abrir es necesario para evitar heat creep. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep), [Foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
3. **El hotend decide.** El hotend V6 de Prusa es más propenso al heat creep por encima de 30 °C ambiente. Otros hotends (como el Obxidian) son más permisivos. — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs), [Foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
4. **La temperatura de cama decide.** Cuando la cama supera la temperatura de reblandecimiento del filamento (45 °C para PLA), Bambu recomienda abrir la puerta y/o quitar la tapa. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

### 2. Temperatura de cámara para PLA: 0 °C vs 35–39 °C

- **Bambu (wiki, oficial):** La temperatura de cámara recomendada para PLA es **0 °C** (desactivar calefacción de cámara). — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
- **Bambu (foro):** Eno recomienda **35–39 °C** de temperatura de cámara para PLA. — [Eno, foro of Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)

**Se contradicen.** La fuente oficial dice 0 °C (desactivar), el foro recomienda 35–39 °C. **El redactor tiene que explicar el matiz, no elegir un número.**

**El matiz, en tres partes:**

1. **0 °C es la recomendación para la calefacción activa de cámara.** Bambu recomienda no habilitar la calefacción de cámara para PLA. Esto no significa que la cámara deba estar a 0 °C, sino que no se debe calentar activamente. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)
2. **35–39 °C es la temperatura de cámara real que se alcanza con la cama caliente y la puerta cerrada.** Eno no está calentando activamente la cámara; está dejando que la cama la caliente pasivamente. — [Eno, foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
3. **La diferencia entre "temperatura de cámara activa" y "temperatura de cámara pasiva" es clave.** Bambu habla de no calentar activamente; Eno habla de la temperatura que se alcanza sin calefacción activa. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature), [Eno, foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)

### 3. Corrientes de aire vs calor de cámara: dos razones opuestas para la misma puerta

- **Bambu (wiki, oficial):** Cerrar la puerta frontal y la cubierta superior para **bloquear el flujo de aire** durante la impresión. — [Bambu Lab, warping-falling-off-collapsing](https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing)
- **Bambu (wiki, oficial):** Cuando la cama supera la temperatura de reblandecimiento del filamento, **abrir la puerta y/o quitar la tapa** para evitar que el calor excesivo de la cámara ablande el filamento. — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature)

**Se contradicen.** La misma puerta se cierra para prevenir corrientes de aire y se abre para prevenir calor excesivo. **El redactor tiene que explicar el matiz, no elegir un número.**

**El matiz, en tres partes:**

1. **Depende de la temperatura de cama.** Con cama baja (Cool Plate, ~35 °C), la cámara no se calienta demasiado y se puede cerrar para prevenir corrientes. Con cama alta (Textured PEI, 55–65 °C), la cámara se calienta más y hay que abrir para prevenir heat creep. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep)
2. **Depende de la temperatura ambiente.** Con ambiente frío, cerrar ayuda a mantener la temperatura. Con ambiente alto, abrir ayuda a enfriar. — [Bambu Lab, heat creep](https://wiki.bambulab.com/en/filament-acc/filament/heat-creep), [Foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
3. **Depende del filamento.** Para PLA, el riesgo principal es el heat creep (abrir). Para ABS/ASA, el riesgo principal es el warping (cerrar). — [Bambu Lab, chamber temperature setting](https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature), [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)

## Sin respaldo

Una sola fuente secundaria, sin corroboración; o una fuente oficial a la que se le ha pedido más de lo que dice. El redactor puede usarlas **marcadas como lo que son**, no como reglas generales.

- **35–39 °C de cámara para PLA.** **[UNA SOLA FUENTE — foro de Bambu, sin corroborar]** Eno recomienda 35–39 °C con puerta y tapa cerradas. La fuente oficial de Bambu recomienda 0 °C (desactivar calefacción activa). — [Eno, foro de Bambu](https://forum.bambulab.com/t/pla-in-x1c/144237)
- **20–25 °C de ambiente para PLA.** **[UNA SOLA FUENTE — foro de Prusa, sin corroborar]** Neophyl recomienda 20–25 °C. Artur5 recomienda 20–30 °C. Son dos usuarios del mismo foro, pero sin corroboración de fuente oficial. — [Neophyl, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **40–50 °C para ABS/ASA.** **[UNA SOLA FUENTE — foro de Prusa, sin corroborar]** BogdanH recomienda 40–50 °C. Artur5 recomienda "cuanto más alto mejor". — [BogdanH, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **20–40 °C para PETG.** **[UNA SOLA FUENTE — foro de Prusa, sin corroborar]** Artur5 recomienda 20–40 °C. BogdanH recomienda +10 °C sobre ambiente. — [Artur5, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **45 °C de cámara para arrancar el ventilador de escape.** **[UNA SOLA FUENTE — foro de Prusa, sin corroborar]** Ondrej Liptak recomienda arrancar el ventilador de escape a 45 °C con cama a 70 °C. — [Ondrej Liptak, foro of Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)
- **45–50 °C máximo en enclosure Lack sin calefacción.** **[UNA SOLA FUENTE — foro de Prusa, sin corroborar]** Artur5 indica que es muy poco probable superar 45–50 °C en un enclosure Lack calentado solo por la cama. — [Artur5, foro de Prusa](https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-user-mods-octoprint-enclosures-nozzles/optimal-enclosure-temps-for-pla-petg-abs)

## Tirado

Qué se ha eliminado y por qué. El redactor no usa nada de esto.

- **Navegación, menús, migas de pan, "compartir", "suscríbete".** Estándar en todas las fuentes.
- **Anuncios y banners.** No presentes en estas fuentes, pero se excluyen por defecto.
- **Piezas de producto: tiendas, precios, enlaces de compra.** No presentes en estas fuentes.
- **Cuestionarios, surveys.** No presentes en estas fuentes.
- **Repetidos:** Si tres fuentes dicen lo mismo con otras palabras, se queda **una**, la mejor, y las otras dos quedan citadas como corroboración. No ha sido necesario en este lote; cada fuente aporta datos distintos.
- **Texto de navegación de wiki ("Related wiki links") sin el contenido enlazado.** No presente en estas fuentes.

## Relaciones

| Concepto | Se relaciona con | Cómo |
|---|---|---|
| enclosure y warping | warping en PLA | sin enclosure, las corrientes de aire enfrían un lado más que otro y levantan las esquinas |
| enclosure y warping | temperatura de cama | con cama alta (Textured PEI), la cámara se calienta más y hay que abrir para prevenir heat creep |
| enclosure y warping | temperatura ambiente | con ambiente frío (5–10 °C), cerrar ayuda a prevenir warping; con ambiente alto, abrir es necesario |
| enclosure y warping | tipo de chapa | con Cool Plate (cama ~35 °C), se puede cerrar; con Textured PEI (cama 55–65 °C), hay que abrir |
| enclosure y warping | tipo de filamento | para PLA, el riesgo principal es el heat creep (abrir); para ABS/ASA, el riesgo principal es el warping (cerrar) |
| enclosure y warping | tipo de hotend | el hotend V6 de Prusa es más propenso al heat creep; otros hotends son más permisivos |
| heat creep | enclosure | con la cámara cerrada y cama alta, el calor ablanda el filamento antes de que entre en el bloque caliente |
| heat creep | temperatura de cama | cuando la cama supera la temperatura de reblandecimiento del filamento, el riesgo de heat creep aumenta |
| heat creep | temperatura ambiente | con ambiente alto, la cámara se calienta más y el riesgo de heat creep aumenta |
| warping en PLA | enclosure | el enclosure puede prevenir warping al bloquear corrientes de aire, pero también puede causar heat creep si se calienta demasiado |
