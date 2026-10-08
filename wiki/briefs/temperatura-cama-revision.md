# Brief de revisión — `temperatura-cama`

Fecha: 2026-10-04. Fase P0. Modo: **revisión sobre material existente**, no Ingest.

## Rutas

| Papel | Ruta |
|---|---|
| Cocinado a corregir | `wiki/cooked/temperatura-cama.md` |
| Artículo a corregir | `src/content/wiki/temperatura-cama.md` |
| Informe que manda | `wiki/reviews/temperatura-cama-revision-7.md` |
| Lint del lote | `wiki/reviews/lint-pre-adsense-2026-10-04.md` |
| Fuentes | los seis `wiki/raw/temperatura-cama-*.md` |

**El informe que manda es `temperatura-cama-revision-7.md`.** Sus 12 fallos son la lista
de trabajo. El artículo tiene 6.465 palabras y el informe aprueba su trazabilidad: el
trabajo es corregir 12 pasajes, no reescribir.

## Fallo 6 ya decidido: comportamiento interno del analizador

El informe pedía comprobar el código antes de mantener o retirar las afirmaciones sobre
`0` y ausencia. Ya está comprobado, leyendo el código y **sin modificarlo**:

- `src/components/AnalysisPanel.tsx:296–303` — `formatCelsius` y `formatMillimetres`
  devuelven guion sólo cuando el valor es `undefined`. Un `0` se pinta como `0 °C`.
- `src/services/ParserService.ts:474–480` — `BED_TEMPERATURE_KEYS` prueba cinco claves
  en orden y gana el primer valor presente, el `0` incluido.

Decisión, para que ni el cocinero ni el redactor lo vuelvan a discutir:

1. **Se retira** «el panel trata 0 y ausencia igual». Es falso contra el código.
2. **Se retira** «algunos slicers escriben 0 en la cabecera para indicar que no usan
   cama». Ninguna fuente lo dice. Bambu habla del **preset** de filamento, no del
   G-code, y lo que dice es que un `0` ahí impide laminar hasta poner un valor no nulo.
   Se conserva ese aviso como lo que es: un comportamiento del software de laminado.
3. Donde haga falta explicar qué ve el lector, la afirmación admitida es **exactamente**
   esta, marcada como dato interno de la aplicación y no atribuida a ninguna
   documentación de impresora: *la clave se busca entre cinco alias y gana el primer
   valor presente; si no hay ninguno, el campo queda vacío y se pinta con un guion, y un
   `0` se pinta como `0 °C`*. Sin causas, sin advertencias sobre soportes o voladizos que
   el panel no emite.
4. `bed_temperature` sigue declarado como dato interno no respaldado por las fuentes, y
   `bed_temperature_initial_layer_single` como no verificado. Eso no cambia.

## Qué NO se hace

- No se empieza desde cero. Las tablas de los tres fabricantes, el recorrido de
  limpieza, el bloque de variables de Orca y la sección de casos de foro se
  conservan: el informe los aprueba.
- No se edita `wiki/raw/`. Todos los defectos se resuelven reduciendo o delimitando la
  afirmación.
- No se escribe el informe: el revisor lo hace, y le toca el número 8.
- No se consulta internet ni se edita código protegido. `ParserService.ts` y
  `AnalysisPanel.tsx` son sólo lectura.

## Reglas de este brief

1. **El alcance de cada cifra es el que tiene su fuente.** La ficha del PLA de Prusa
   recomienda 60 °C y menciona vidrio y Kapton; no restringe el 60 a PEI. Que un rango
   esté contenido en otro no demuestra que la chapa explique la diferencia entre
   fabricantes.
2. **«No elimina bien» no es «no elimina».** Y **«puede contener acetona» no es «lleva
   acetona»**, y brake-cleaner es limpiador de frenos, no limpiaparabrisas. Es un aviso
   de seguridad: el error no es de estilo.
3. **«Y/o» y «posibles» se conservan.** Enumerar posibles efectos de cama fría con «or»
   no es una progresión inevitable, y «door and/or lid» no son dos pasos obligatorios.
4. **Sin umbral invented.** Bambu da 60 °C en un sitio y 70 °C en otro: se publica la
   discrepancia, no se resuelve eligiendo uno y llamándolo prudente.
5. **Sin cálculo económico.** Afirmar qué cuesta o qué no cuesta es un dato, y este
   artículo no tiene fuente para eso.

## Reconciliación con los otros dos artículos

- `temperatura-cama:640–643` excluye la cama para capas sueltas, y esa exclusión choca
  con la cita de Orca sobre *weak layer bonding*, con el propio apartado de cama fría de
  este artículo y con el protocolo oficial de `separaciones-entre-capas:155–160`, que
  **sube** cama y cámara. Se retira la exclusión y se remite al diagnóstico de capas.
- `temperatura-cama:386–387` es la redacción correcta de puerta/tapa. Se usa como
  referencia para corregir `warping-pla`, que la convierte en dos acciones obligatorias.
- `temperatura-cama:490–493` es la redacción correcta del caso Zakalawe: sin temperatura
  final, dos variables a la vez, «seemed». Se transplanta a warping.

## Cobertura de relaciones

El cocinado promete `[[slicer|Qué slicer escribió esto]]` y el artículo no la nombra.
Opciones, y sólo dos: nombrar la página con sintaxis wiki en la lista final, o dejar
constancia en cocinado de que la relación se descarta. Inventar una página `slicer`
no es una opción.

## Criterio de salida de la fase

Cocinado sin los 12 defectos, artículo sin los 12 defectos, informe 8 escrito y aprobado.
Si el informe 8 rechaza otra vez, este artículo queda BLOCKED.
