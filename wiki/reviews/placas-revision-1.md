# Revisión de placas

**Veredicto: RECHAZADO** — 4 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 4 pérdidas |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas, y que hagan algo | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Fallos, con dónde y qué hacer

### 1 · Importante · El grosor del glue y el «más allá de cuatro disminuye»

**Dónde:** reglas[].porque, regla `glue-curacion`.

**Qué dice:** «… Cuatro capas: la mejor adhesión.» (con `valor: '4 capas como óptimo'`)

**Qué decía:** «Una capa gruesa proporciona adhesión significativamente mayor que una delgada; 4 capas dan la mejor adhesión, y más allá de cuatro la adhesión disminuye.»

**Por qué falla:** Las dos mitades estaban en `wiki/raw/placas-bambu-wiki-how-to-use-glue.md` — «a thick coat provides significantly stronger adhesion than a thin coat» y «Four coats provide the best adhesion (beyond four coats, adhesion actually decreases)»— y en `wiki/cooked/placas.md`. No están en ninguna otra parte de la guía: el `alcance` sólo dice que «la mejor adhesión no la da más secado sino cómo se aplica». Con el `valor` «4 capas como óptimo» quien lee sabe que cuatro es el máximo, pero no que pasarse empeora.

**Qué hacer:** Devolver el par al `porque`, o —si el presupuesto de 200 caracteres no da— dejar en el `porque` que la clave es el grosor y pasar «más allá de cuatro disminuye» al `alcance`.

### 2 · Importante · El PETG se limpia con agua

**Dónde:** reglas[].porque, regla `smooth-prusa-petg-glue`.

**Qué dice:** «… puede hacer falta una capa de gluestick: alto riesgo de daño al despegar.»

**Qué decía:** «… una capa protectora de gluestick (alto riesgo de daño al despegar). PETG también «cleaned with water».»

**Por qué falla:** Estaba en `wiki/raw/placas-prusa-kb-filament-material-guide.md` (fila PETG: «with glue stick (Textured/Smooth/Satin as applicable); Cleaned with water») y en `wiki/cooked/placas.md`. Ya no está en ninguna guía del sitio. Y no es redundancia: la otra regla de limpieza, `limpia-smooth-prusa`, dice «Limpia la Smooth PEI de Prusa con IPA en frío» sin excepción; la nota del PETG era la única excepción publicada. Quien tenga PETG sobre Smooth PEI ahora no sabe que la fuente lo pide con agua.

**Qué hacer:** Devolver «PETG también «cleaned with water»» al `porque`, o al `alcance` de `limpia-smooth-prusa`. Y decirlo con la cautela que hace falta: el propio material cocinado avisa de que el reparto por chapa de esa tabla «no asignable con seguridad».

### 3 · Importante · Dónde se guarda el glue

**Dónde:** reglas[].porque, regla `limpieza-glue`.

**Qué dice:** no dice nada del almacenamiento

**Qué decía:** «… El glue se almacena en lugar fresco y seco, sin luz solar directa.»

**Por qué falla:** Está en `wiki/raw/placas-bambu-wiki-how-to-use-glue.md` («Please store unused glue in a cool and dry place away from direct sunlight to extend its shelf life») y ya no está en ninguna guía. Además hay una inconsistencia interna: la entrada de `fuentes` de esta guía sigue prometiendo esa parte —«Glue: por material y por chapa, curado, número de capas, limpieza y almacenamiento»— es decir, la ficha de fuentes anuncia un contenido que la guía ya no publica.

**Qué hacer:** O devolver la frase, o quitar «almacenamiento» de la descripción de la fuente. Si la regla es sólo de limpieza, el dato necesita su sitio (una tarjeta), no desaparecer.

### 4 · Importante · «En vez de apalancar sobre superficie plana»

**Dónde:** reglas[].porque, regla `despega-recalentando-prusa`.

**Qué dice:** «Con espátula, doblar la chapa e insertar debajo del modelo.»

**Qué decía:** «Con espátula, doblar ligeramente la chapa e insertar por debajo del modelo en vez de apalancar sobre superficie plana.»

**Por qué falla:** El contraste y su razón (no rayar la chapa) están en `wiki/raw/placas-prusa-kb-flexible-steel-sheets-guidepost.md` («Bend the sheet slightly and insert the spatula under the model whenever possible, instead of digging under the model on a flat surface») y en `wiki/cooked/placas.md`. No están en ninguna otra tarjeta ni regla. Lo que queda se puede leer al revés de lo que dice la fuente: la fuente dice insertar por debajo cuando sea posible, en vez de forzar por debajo contra la superficie plana.

**Qué hacer:** Recuperar «ligeramente» y el «en vez de apalancar sobre superficie plana», o «cuando sea posible, insertar por debajo en vez de forzar contra la superficie plana».

## Las reglas acortadas, una por una

El `porque` de estas reglas perdió algo al acortarse. La pregunta es si el
matiz **sobrevive** en el `alcance`, en la condición o en una tarjeta, o si de
verdad se ha ido.

| Regla | Lo que se ha ido | Veredicto | Por qué |
|---|---|---|---|
| `scarf-bambu` | «Desde la 1.10 se puede decidir por filamento» | **Redundancia** | Sigue en la tarjeta `scarf-tipos`. |
| `seam-gap-prusa` | la definición del parámetro y «los extremos se solapan» | **Redundancia** | La definición está en la tarjeta `seam-gap` y el matiz del solape en la propia tarjeta `seam-gap-prusa`. |
| `no-retract-tpu` | «afectar al diámetro del filamento» | **Redundancia** | La tarjeta `retraccion-flexible` lo dice literal y con su cita. |
| `scarf-no-voladizos` | «de los voladizos» | **Redundancia** | El `accion` dice «voladizos» y la tarjeta `scarf-contra` lo repite. |
| `spiral-vase-alcance` | «porque los complejos no se pueden imprimir con una sola línea» | **Redundancia** | La tarjeta `spiral-vase` conserva la razón. |
| `cama-pla-cf` | «tapar con la caja de embalaje o una tapa de PC» y «coinciden en las 12 horas» | **Redundancia** | La tapa, en la tarjeta `cama-metodo`; las 12 h, en el `valor` de `cama-pla`. |
| `guardar-sellado` | «una caja con desecante» y «en un ambiente normal» | **Redundancia** | La tarjeta `almacenamiento` dice «un espacio cerrado con desecante» y «en un interior de unos 55 % RH». |
| `carrete-limite` | «de Prusa» y «el cartón se queda expandido» | **PÉRDIDA REAL** | La atribución está en `fuente` y en otras tres reglas, pero el mecanismo completo no. Además el `porque` ha **alterado** la afirmación: dice «el plástico se expande y el cartón queda flojo al enfriar», y el crudo dice que el plástico se encoge, el cartón se queda expandido y lo que queda flojo es el carrete. La tarjeta `carrete` lo conserva bien, así que no es una pérdida de información: es una alteración. |
| `sin-aparato` | «de tiempo ni de temperatura» | **Redundancia** | «Ninguna fuente les da cifras» es más general que lo que se quitó. |
| `horno-pla` | «el de cocina está descartado por su reparto irregular de calor» | **Redundancia** | La tarjeta `horno-cocina` lo dice entero, con su cita. |
| `textured-bambu-petg-glue-reduce` | «(y materiales de alta adherencia)» | **Redundancia** | La regla está condicionada a PETG y el crudo lo dice igual. |
| `despega-enfriando-textured` | «También se puede usar espátula para no dañar» y «(litofanías)» | **Redundancia parcial** | La espátula queda; el ejemplo «litofanías» se pierde. |
| `despega-recalentando-cool-supertack` | «Antes de usar espátula, humedecer la zona de contacto con alcohol reduce la dificultad de despegue» | **Redundancia** | La razón queda en la regla hermana `despega-general`, que sale para el mismo problema en cualquier chapa. |
| `recalibrar-al-cambiar` | «ligeramente» y «de Prusa» | **Redundancia** | Ambos en la tarjeta `espesor-recalibrar». |

## Notas que no bloquean

- `despega-enfriando-textured`: lo que queda tras el acortamiento —«Con soportes arbóreos, brims o paneles grandes, mejor espátula»— sale del FAQ del Cool Plate SuperTack, no de la sección de la Textured PEI, donde Bambu dice lo contrario. Preexistente, no lo introduce esta vuelta, pero sobrevive en un `porque` que se ha tocado.

- `z-seam/girar-pieza`: las dos citas literales se sustituieron por paráfrasis. Comprobadas una por una en `wiki/raw/`, las dos paráfrasis son exactas y la atribución es correcta, así que **no es motivo de rechazo**. El aviso es de otro tipo: ninguna guía del sitio muestra ya esas dos frases literales. Si el presupuesto de 200 caracteres lo permite, una de las dos comillas literales cabe; si no, el sitio de la prueba es la tarjeta `pos-back`.

---

Esta vuelta es una revisión de contenido por acortamiento: sólo se han
acortado los `porque` de más de 200 caracteres. El contenido no ha cambiado ni
en una palabra: lo comprueba `verify:recorte`, campo por campo.
