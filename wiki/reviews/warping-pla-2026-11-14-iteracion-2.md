# Revisión de warping-pla — iteración 2

**Veredicto: APROBADO** — 0 fallos bloqueantes, 1 deuda declarada.
**Iteración:** 2 de 2
**Fecha:** 2026-11-14
**Informe anterior:** `wiki/reviews/warping-pla-2026-11-14.md` (iteración 1, RECHAZADO)

## Qué se corrigió

| Fallo de la iteración 1 | Corrección | Comprobación |
|---|---|---|
| B1 · Cita del mecanismo no literal | Cita sustituida por la frase exacta de la fuente | La cadena aparece en `warping-pla-bambu-wiki-warping-falling-off-collapsing.md` |
| B2 · Cita de la tabla de cama no literal | Cita sustituida por la fila literal de la tabla | La fila `PLA \| 35 - 45 ℃ \| 45 - 65 ℃ Glue Required …` aparece en la fuente |
| B3 · Regla `abierta` aplicable a ABS/PC y causa invertida | Condición restringida a `pla` y `pla-cf`; acción en «o»; `porque` corregido | La regla ya no sale para ABS, ASA, PC ni PA; el motivo coincide con la fuente |
| I1 · Cuatro fuentes omitidas | Añadidas a `fuentes` con URL y descripción | 9 fuentes en la guía, todas con URL |
| I2 · Autoenlace en `fueraDeAlcance` | Eliminado el `guia: 'warping-pla'` | El campo es opcional y ya no se enlaza a sí mismo |
| I3 · Cooked sin `A-###` | No se ha fingido: queda declarado | Deuda de la próxima actualización de fondo |

## Las seis comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Alcance, vigencia y pregunta | PASA |
| 2 | Afirmaciones con respaldo localizable | PASA — las 19 afirmaciones de la tabla de cobertura se localizan en raw |
| 3 | Atribución y grado de certeza | PASA — las dos citas son literales; la regla ya no invierte la causa |
| 4 | Coherencia y cobertura | PASA — la regla de cámara sólo sale para PLA/PLA-CF |
| 5 | Enlaces, slugs y fechas | PASA — sin autoenlaces; `actualizado: 2026-11-14` por cambio real |
| 6 | Valor original y relleno | PASA |

## Verificación ejecutada

- `npm run verify:guias`: 1124/1124.
- `npm run verify:contenido`: todas las comprobaciones pasan, incluido el freno de porqués largos.
- `npm run build`: 43 páginas exportadas, 41 URLs, 2 noindex.
- `npm run verify:seo`: 467/467.
- `npm run verify:dist`: 220/220.
- `npm run verify:revision`: 16/16.
- `npm run lint`: sin errores.
- JSON-LD de la guía: `dateModified: 2026-11-14`, sin `datePublished`.

## Deuda que queda

**I3 · `wiki/cooked/warping-pla.md` no tiene IDs `A-###`.** Es anterior al contrato.
La guía se ha podido verificar contra `wiki/raw/`, pero el pipeline nuevo no puede
reutilizar ese cooked sin retrofitearlo. En la próxima actualización de fondo, el
cocinero añade identificadores y localización; el redactor deja la traza
`// evidencia: A-###`.

## Límite de esta aprobación

La corrección y la segunda revisión se han hecho en la misma sesión porque el
subagente revisor no pudo arrancar por el límite de uso del proveedor. **Esta
aprobación no sustituye una revisión independiente de otra persona**: certifica que
las afirmaciones comprobadas están en `wiki/raw/` y que las comprobaciones mecánicas
pasan. No certifica que AdSense vaya a aprobar el sitio ni que la guía posicione.
