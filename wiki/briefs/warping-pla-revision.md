# Brief de revisión — `warping-pla`

Fecha: 2026-10-04. Fase P0. Modo: **revisión sobre material existente**, no Ingest.

## Rutas

| Papel | Ruta |
|---|---|
| Cocinado a corregir | `wiki/cooked/warping-pla.md` |
| Artículo a corregir | `src/content/wiki/warping-pla.md` |
| Informe que manda | `wiki/reviews/warping-pla-revision-6.md` |
| Lint del lote | `wiki/reviews/lint-pre-adsense-2026-10-04.md` |
| Fuentes | los nueve `wiki/raw/warping-pla-*.md` |

**El informe que manda es `warping-pla-revision-6.md`.** Sus 13 fallos son la lista de
trabajo. No hace falta volver a descubrir qué falla: hay que ir a cada número, leer la
fuente que el informe cita y corregir cooked y después artículo.

## Qué NO se hace

- No se empieza desde cero. Se conservan causación, diagnóstico, ajustes y pruebas de
  foro que el informe marca como trazabilidad que sí pasa. El artículo tiene 3.099
  palabras y plenty de material válido; el problema son 13 pasajes.
- No se edita `wiki/raw/`. Ni una errata. Una fuente nueva es un fichero nuevo, y aquí
  no hace falta ninguna: todos los defectos se resuelven **reduciendo** la afirmación.
- No se crean informes nuevos aquí. Escribe el revisor, y como
  `warping-pla-revision-6.md`, al número siguiente: 7.
- No se consulta internet.
- No se tocan `JevService.ts`, `types.ts`, `ParserService.ts`, `worker/`, CSS, ni
  `scripts/verify/barrido.mjs` ni `shots.mjs`.

## Reglas de este brief

1. **Una fuente oficial es la fuente de su recomendación, no una prueba.** La tabla de
   cama de Bambu publica un intervalo recomendado; no dice que salirse de él queme la
   chapa, y no dice que un caso se resolviera a 65 °C.
2. **Un caso de foro es un caso.** Diem escribe «unlikely», Naugh diagnostica sobre una
   foto de baja resolución, Zakalawe dice «seemed». Ninguno de esos verbos sobrevive
   como hecho.
3. **And/or sigue siendo and/or.** La alternativa de Bambu es alternativa.
4. **Una tabla de materiales es un ranking entre los materiales de esa tabla**, no una
   prevalencia de causas y no una comparación con los rígidos que no están.
5. **Un orden de pasos pertenece a su fuente.** Bambu enumera un orden; el foro otro.
   Compartir una causa no es compartir una prioridad.

## Reconciliación con los otros dos artículos

Las cuatro contradicciones del lint son de este artículo en tres de los casos:

- `warping-pla:235–236` presenta 65 °C como el valor del caso resuelto.
  `temperatura-cama:490–493` dice bien que no se informó. **Manda el hilo:** se corrige
  warping, y se usa la cautela de temperatura como redacción de referencia.
- `warping-pla:297` exige puerta **y** tapa; `temperatura-cama:386–387` conserva puerta
  **o** tapa. **Manda la fuente: and/or.** Se corrige warping.
- `warping-pla:113–124` mete «separaciones entre capas» en la categoría general de
  firmware/slicer. La columna de Neophyl es un caso concreto de huecos en juntas, y
  `separaciones-entre-capas` documenta causas térmicas, ventilación y flujo. Se acota
  la columna y no se renombra la categoría.

## Criterio de salida de la fase

Cocinado sin los 13 defectos, artículo sin los 13 defectos, informe 7 escrito y
aprobado. Si el informe 7 rechaza otra vez, este artículo queda BLOCKED: dos rechazos
consecutivos son la señal de parar, no de pedir un tercer artículo entero con el mismo
material.
