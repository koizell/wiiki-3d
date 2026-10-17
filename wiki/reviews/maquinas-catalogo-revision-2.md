# Revisión de maquinas (catálogo) — revisión 2

**Veredicto: APROBADO** — los 6 fallos bloqueantes de la revisión anterior están resueltos y no se han introducido nuevos fallos por los cambios.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Los 6 bloqueantes de `maquinas-catalogo-revision-1.md` | RESUELTOS |
| 2 | No hay nuevos fallos introducidos por los cambios | PASA |
| 3 | Regla térmica coherente (`src/lib/maquinas.ts`) | PASA |
| 4 | `MaquinaSVG.tsx` no interpreta `null` como abierto | PASA |
| 5 | Rasgos retirados ausentes del código funcional | PASA |
| — | `npm run verify:maquinas` | VERDE (0 fallos) |
| — | `tsc --noEmit` | sin errores |

## Resolución de los 6 bloqueantes anteriores

1. **AD5X `tNozMax`/`tCamaMax`** — ahora `300` / `110`, origen `F`. Confirmado contra `wiki/raw/rasgos-visuales-ad5x-flashforge-oficial.md` («Max Extruder Temp: 300°C», «Max Bed Temp: 110°C») y el material cocinado (`wiki/cooked/rasgos-visuales-ad5x.md`, sección Extrusor).
2. **AD5X `extrusor`** — ahora `null`, origen `P`. El cocinado lo dejaba sin verificar; la ficha ya no lo afirma.
3. **AD5X `familia`** — sigue siendo `corexy-cerrada`, pero el origen pasa de `F` a `P`. El cerramiento sigue sin fuente (`cerrada: null`), y el origen ahora lo reconoce.
4. **Dimensiones de A1, P1S y MK4S** — rellenadas con origen `F`: A1 `[465, 410, 430]`, P1S `[389, 389, 458]`, MK4S `[500, 550, 400]`. Las tres coinciden con las fuentes oficiales archivadas (`rasgos-visuales-a1-bambulab-tech-specs.md`, `rasgos-visuales-p1s-bambulab-store-oficial.md`, `rasgos-visuales-mk4s-prusa-oficial.md`).
5. **Mars 5 Ultra `vol`** — ahora `null`, origen `P`. El cocinado descartaba el volumen de terceros; el catálogo ya no lo afirma.
6. **Mars 5 Ultra `cerrada`** — ahora `null`, origen `null`. La resina no declara cerramiento, y `verify:maquinas` lo acepta como «no aplica».

## Cambios importantes también verificados

- **Mars 5 Ultra `velMax`** — `null` con origen `null` (era `T` sin valor). Coherente: la velocidad publicada es 150 mm/h de resina, no una velocidad de desplazamiento FDM.
- **Mars 5 Ultra `dims`** — `null`, origen `P`. Coherente con el cocinado (dimensiones sin verificar).
- **`tipos.ts`** — `vol` admite `null` (`[number, number, number] | null`), y el rasgo retirado (`pantallaTactil`) ya no aparece como identificador en ningún fichero funcional; sólo se menciona como «rasgo retirado» en el comentario de `RasgosDibujo`. `RASGOS_DIBUJABLES` del verificador no lo incluye.
- **`MaquinaSVG.tsx`** — `null` se trata como «desconocido»: la descripción dice «(cerramiento sin verificar)» y `VistaCoreXY` recibe `abierta={undefined}`, con lo que no se dibujan ni los paneles de máquina cerrada ni los de máquina abierta. `!null` ya no se evalúa como `true`.

## Regla térmica

`estadoFilamento`, `rizaria` y `avisos` en `src/lib/maquinas.ts` siguen siendo coherentes con el material cocinado: resina → `resina`; ABS/ASA en máquina comprobada como abierta → `necesita-camara` y rizado; cerramiento sin verificar → `camara-desconocida` sin rizado; límite de boquilla independiente del cerramiento. El script comprueba los estados esperados para Ender SE/KE, A1, P1S, MK4S y Mars, y todos pasan.

## Rasgos retirados

`pantallaTactil` no aparece en `catalogo.ts`, `tipos.ts` (como campo), `maquinas.ts` ni `MaquinaSVG.tsx`. Sólo en el fichero de revisión anterior. `grep` sobre el código fuente no devuelve ocurrencias.

## Notas que no bloquean

- Las fuentes de origen `T` (gavler, MakerSpecs, ficha comercial de Flashforge) siguen sin estar archivadas en `wiki/raw/`; es el punto menor nº 11 de la revisión anterior y no se ha tocado en esta vuelta. Los datos marcados como `T` no pueden verificarse contra lo crudo mientras no se archiven.
- La AD5X deja `nivelacion: null` / `P` aunque el material cocinado afirma calibración automática por sensor de presión en la base; y `vol` se marca como `T` aunque la ficha oficial de Flashforge da 220 × 220 × 220 mm. Son promociones pendientes, no fallos del cambio.
- La CORE One sigue con `dims: null` / `P` por la misma razón que en la revisión anterior (el dato lo publicó un comentarista, no el cuerpo de la ficha de Prusa).
- La Mars 5 Ultra no lista la fuente oficial de Elegoo en su array `fuentes` aunque existe en `wiki/raw/`; añadirla como origen `F` queda para una vuelta posterior.