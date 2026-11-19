# Revisión de warping — enlaces contextuales

**Veredicto: APROBADO** — exclusivamente los dos campos `enlaza` del brief; sin fallos editoriales en ese alcance.
**Iteración:** 1 de 2
**Fecha:** 2026-11-19

## Alcance y evidencia del cambio

Brief: `.superpowers/enlaces-warping-brief.md:9-31`.
Diff frente a HEAD facilitado por el orquestador y leído por el revisor: `/tmp/opencode/warping-enlaces-2026-11-19.diff`.
Contrastado con los campos actuales de `src/content/guias/warping.ts:309,425`:

```ts
enlaza: { guia: 'placas', etiqueta: 'Ver la limpieza según tu chapa' },
enlaza: { guia: 'enclosure-y-warping', etiqueta: 'Ver cuándo abrir o cerrar el enclosure' },
```

El diff contiene esas dos incorporaciones y la adición de un salto de línea al final del fichero. No cambia condiciones, cifras, fuentes, fecha ni autoría. Esta revisión no certifica el resto de `warping`, ni las guías de destino completas. Tampoco incluye pruebas técnicas, render o publicación: corresponden al orquestador.

## Comprobaciones

Resultados limitados al cambio anterior, no a las guías completas.

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | PASA — destinos y etiquetas coinciden con el brief; no se añade recomendación técnica ni se actualiza su vigencia |
| 2 | Afirmaciones con respaldo | PASA — la relación entre cada acción y su destino está respaldada en los pasajes raw citados abajo |
| 3 | Atribución y grado de certeza | PASA — las etiquetas no atribuyen resultados ni convierten recomendaciones en garantías |
| 4 | Coherencia y cobertura | PASA — los enlaces desarrollan sus acciones; no introducen variables, condiciones ni reglas |
| 5 | Enlaces, slugs y fechas | PASA — ambos destinos están incorporados al registro; fecha y autoría no cambian |
| 6 | Valor original y relleno | PASA — navegación específica hacia limpieza por superficie y decisión sobre la puerta, sin repetir instrucciones |

## Contraste editorial y citas exactas

### 1 · `limpiar` → `placas`

**Ubicación:** `src/content/guias/warping.ts:301-309`.
**Etiqueta:** «Ver la limpieza según tu chapa».

La acción de origen es «Limpia la chapa con agua templada y jabón». El destino desarrolla precisamente las diferencias por superficie: `src/content/guias/placas.ts:122-157` y reglas `limpia-textured-bambu` / `limpia-smooth-prusa`, líneas 433-452. Sus acciones dicen «Lava la Textured PEI con agua y detergente (sin acetona)» y «Limpia la Smooth PEI de Prusa con IPA en frío». La etiqueta no promete un método universal.

**Trazabilidad cooked:** `wiki/cooked/warping-pla.md:135-140` → limpieza; `wiki/cooked/placas.md:143-169` → Textured PEI Bambu y Smooth PEI Prusa. Estos pasajes no tienen identificadores `A-###`; se localizan por sección y líneas.

**Raw comprobado:**

- `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md:108-110`, Bambu Lab:
  > Wash with warm water and dish soap. Rinse thoroughly and air-dry. Follow the
  > dedicated Wiki page. Never touch the print surface with bare hands after cleaning.
- `wiki/raw/placas-bambu-wiki-pei-plate-clean-guide.md:32-36`, Bambu Lab:
  > Do not clean the Textured PEI with Acetone, as it will damage the PEI surface.
  >
  > The reason why we recommend detergent for cleaning the textured plate is due to its textured surface. Alcohol might just spread the oils on the print surface instead of removing it.
- `wiki/raw/placas-prusa-kb-smooth-steel-sheet.md:52-53`, Prusa Research:
  > Clean with ~90% IPA (isopropyl alcohol) or denatured alcohol when cold. Apply on an unscented paper towel and rub the sheet down. Do not use anything made for skin! It can contain oils that ruin adhesion!
  >
  > 1-2 times a month, it can be cleaned the same way with acetone if IPA cleaning is not sufficient.

**Resultado:** pertinente. La diferencia de limpieza entre esas superficies existe en las fuentes originales y en el destino; «según tu chapa» describe correctamente la ampliación.

### 2 · `abierta` → `enclosure-y-warping`

**Ubicación:** `src/content/guias/warping.ts:417-425`.
**Etiqueta:** «Ver cuándo abrir o cerrar el enclosure».

La acción de origen es «Abre la puerta frontal o quita la tapa superior», con `cuando: { camara: 'cerrada', cama: 'alta', material: ['pla', 'pla-cf'] }`. El enlace no cambia ese ámbito ni presenta el cierre como sustituto automático. El destino aborda la decisión anunciada: `src/content/guias/enclosure-y-warping.ts:7`, tarjeta `reblandecimiento` (109-120) y reglas `cerrar-pla-frio` / `abrir-pla-textured` (218-232).

**Trazabilidad cooked:** `wiki/cooked/warping-pla.md:457-463` → recomendación de apertura con cama alta; `wiki/cooked/enclosure-y-warping.md:43-59` → temperatura, chapa y excepción de ambiente extremadamente frío. Tampoco tienen identificadores `A-###` en esos pasajes.

**Raw comprobado:**

- `wiki/raw/temperatura-cama-bambu-wiki-filament-guide-material-table.md:84-87`, Bambu Lab:
  > ① Filaments with a softening temperature below 60 ℃ (e.g., PLA, PVA, TPU), when the heatbed is set above 45 ℃:
  > - We recommend opening the front door and/or removing the upper glass cover plate to prevent excessive chamber heat from softening and deforming the filament.
  > - When the ambient temperature is high, the chamber temperature may rise higher, making this more necessary.
  > - When the ambient temperature is low, the chamber temperature is usually lower, making this less necessary.
- `wiki/raw/enclosure-y-warping-bambu-wiki-chamber-temperature.md:17`, Bambu Lab:
  > When the ambient temperature is high, the actual chamber temperature is usually relatively high, and the need to open the front door and/or remove the top cover is stronger; conversely, when the ambient temperature is low, the actual chamber temperature is usually relatively low, and the need to open the front door and/or remove the top cover is weaker.
- `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md:22`, Bambu Lab, sección «How to prevent heat creep when printing PLA»:
  > When printing PLA with the default Textured PEI Plate or High-Temperature PEI Plate, it is recommended to print with the front door open and/or the top cover removed to help keep the chamber temperature low, thus minimizing the chances of getting an extruder or hotend clog.
- El mismo raw, línea 28, sección «When to close the enclosure for PLA»:
  > When printing filaments with low softening temperatures, if the ambient temperature is extremely low (e.g., 5°C-10°C), you can close the front door and install the top cover to raise the chamber temperature, which can also prevent warpage.

**Resultado:** pertinente. Hay respaldo local para que la ampliación trate ambas opciones según el contexto. La etiqueta no añade umbrales ni afirma que abrir y cerrar sean intercambiables.

## Comprobación del registro

`src/lib/guias.ts:22,25` importa `placas` y `enclosureYWarping`; ambas están en `GUIAS` y, por tanto, en `POR_SLUG` (línea 85). Sus módulos registrados declaran respectivamente `slug: 'placas'` y `slug: 'enclosure-y-warping'` (línea 5 de cada módulo). `guiaPorSlug` consulta ese mapa (88-89). No se ha deducido la existencia de los destinos únicamente por sus nombres de fichero.

El uso corresponde al contrato de `Regla.enlaza`, `src/content/guias/tipos.ts:314-324`: «La guía que desarrolla esta acción».

## Fallos

Ninguno en los dos enlaces revisados.

## Notas que no bloquean

- El diff incluye un salto de línea final adicional: no es un tercer cambio editorial, pero queda señalado para no describirlo como un diff literalmente limitado a dos líneas.
- Las fuentes se han contrastado en sus capturas locales; no se ha comprobado su vigencia en internet ni se ha certificado el conjunto de afirmaciones o reglas de las guías de destino.
- No se ha modificado guía, raw, cooked ni registro. La única escritura de esta revisión es este informe. Sin commit ni push.
