# El plan de contenido de la wiki

Diez artículos: uno escrito, nueve por escribir. Cada uno va atado a un campo del
panel de análisis, y esa es la razón por la que esta wiki existe y no es una
enciclopedia de impresión 3D.

## La regla que decide el orden

1. **Primero los atados a un campo.** Un artículo atado a `bedTemp` responde a una
   pregunta que la aplicación ya le ha hecho al usuario: ha subido un G-code, el
   panel le ha enseñado «Temp. cama: 60 °C» y no sabe si eso está bien.
2. **Después los que ya están nombrados.** Los tres que cita `warping-pla.md` con
   `[[…]]`. Están escritos en el artículo como páginas futuras, así que si no se
   escriben, quedan tres rayas punteadas visibles para el lector.
3. **Nunca un artículo sin campo ni enlace.** Un artículo que no ata a un campo
   del panel ni aparece enlazado desde otro no se encuentra: ni por el filtro, ni
   por lectura. No vale la pena escribirlo, y por eso no hay un «artículo general».

## Los nueve

En la tabla, «campo» es la clave del `campo:` del frontmatter, que es lo que hace
que el artículo aparezca en el filtro y en el panel.

| # | slug | campo | qué responde |
|---|---|---|---|
| 1 | `temperatura-cama` | `bedTemp` | Por qué la cama se calienta y qué pasa si no lo está |
| 2 | `altura-capa` | `layerHeight` | Qué cambia al subir o bajar la altura de capa |
| 3 | `voladizos-y-soportes` | `hasOverhangs`, `overhangAngle` | A partir de qué ángulo hace falta soporte |
| 4 | `material` | `material` | Qué cambia entre PLA, PETG, ABS y ASA |
| 5 | `adhesion-primera-capa` | `bedTemp` | Por qué la primera capa no se pega |
| 6 | `temperatura-hotend` | `hotendTemp` | Qué hace la temperatura de la boquilla |
| 7 | `slicer` | `slicer` | Por qué algunos campos no están, según quién generó el G-code |
| 8 | `separaciones-entre-capas` | — | El fallo que se confunde con warping |
| 9 | `enclosure-y-warping` | — | Enclosure con o sin tapa, con frío o con calor |

El orden 1-3 es el que más rinde: los tres atados más consultados y los que más
contradicción de fuentes tienen. El 8 y el 9 van juntos porque las contradicciones
de `wiki/cooked/warping-pla.md` son justo las suyas, y el material cocinado ya
está hecho.

## Las fuentes de cada uno

**Lo que hay verificado.** Sólo cinco URLs, y son las únicas que se pueden citar
sin comprobar:

- `wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing`
- `wiki.bambulab.com/en/knowledge-sharing/printed-model-warping`
- `help.prusa3d.com/article/warping_2011`
- `forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-how-do-i-print-this-printing-help/adjusting-settings-for-warping-of-pla/`
- `forum.prusa3d.com/forum/how-do-i-print-this-printing-help/warping-at-corners/`

**Lo que falta y hay que buscar.** Esto es un plan, no un inventario: nadie ha
visitado estas páginas todavía, así que **no hay ninguna URL escrita aquí a
propósito**. Escribirla sería inventarla, y una cita inventada en una política de
calidad es el peor fallo posible.

| # | dónde buscar | qué buscar en concreto |
|---|---|---|
| 1 | Bambu y Prusa | tabla de temperatura de cama por material y por chapa. Las tres páginas de wiki de Bambu que hay son de warping, así que para la cama hay que ir a la guía del material |
| 2 | Bambu, Prusa, All3DP | altura de capa y resistencia mecánica; aquí All3DP suele ser la única fuente con números |
| 3 | Prusa Knowledge Base | ángulo de voladizo y soportes; es la página que mejor lo explica de las dos que hay |
| 4 | Bambu, Prusa | guía de materiales; el orden de riesgo de contracción ya está cocinado en `warping-pla.md` |
| 5 | Bambu, Prusa | nivelación de primera capa, `Live Adjust Z`, glue stick |
| 6 | Bambu, Prusa | temperatura de boquilla por material y efecto en la adhesión entre capas |
| 7 | Wiki de Prusa, foro | qué escribe cada slicer en la cabecera; `ParserService.ts` ya dice qué clave usa cada familia |
| 8 | foro de Prusa | el issue 11914 y los hilos sobre juntas abiertas |
| 9 | Bambu, Prusa | enclosure con y sin tapa; la contradicción ya está cocinada |

**Los dos sitios que no sirven**, ya comprobados y anotados en `## Tirado` del
material cocinado: Reddit devuelve la cáscara vacía ni con `old.reddit.com`, y
All3DP carga pero su HTML no trae el texto del artículo, ni en `/amp/`.

## Los enlaces cruzados

La red que sale de los nueve. `→` es dependencia de lectura: quien lea el de la
izquierda va a necesitar el de la derecha.

```
warping-pla ──┬─→ temperatura-cama          (el warping se explica con la cama)
              ├─→ adhesion-primera-capa    (sin adhesión no hay warping)
              ├─→ separaciones-entre-capas (el diagnóstico diferencial)
              └─→ enclosure-y-warping      (la contradicción de fuentes)

temperatura-cama ──→ material            (cada material con su cifra)
altura-capa ───────→ separaciones-entre-capas
voladizos-y-soportes → material
material ──────────→ temperatura-cama
material ──────────→ temperatura-hotend
temperatura-hotend ─→ separaciones-entre-capas
slicer ────────────→ material
```

Los enlaces se escriben `[[slug|texto visible]]` en el Markdown, y el renderizador
los degrada a texto si la página no existe todavía. Con eso, escribir un artículo
no obliga a revisar los que ya estaban, y el revisor deja de comprobar que no
haya enlaces rotos.

## Dos cosas que hay que decidir antes de escribir el primero

1. **Si un artículo atado a un campo puede ser el mismo para dos campos.** Hoy
   `warping-pla` cubre `warpingRisk` y `riskLevel`, que son el mismo dato dicho de
   dos maneras, y por eso el enlace del panel aparece dos veces. Si los siete
   atados repiten eso, el panel va a quedar lleno de enlaces duplicados. Merece una
   decisión y no un acuerdo informal.

2. **Qué pasa cuando un campo llega sin dato.** El panel pinta «—» y es correcto,
   pero un artículo que explica ese campo no tiene a qué atenerse: no hay cifra que
   discutir. La respuesta obvia es que el artículo abra con el caso «no medido», y
   conviene decidirlo una vez y no nueve.

## Lo que este plan no dice

- **Cuántas palabras.** El mínimo del redactor son 800 y es un suelo, no un objetivo.
- **Cuándo se escribe cada uno.** Esto es qué escribirlos, no cuándo. El orden de
  arriba es por valor, no por calendario.
- **Nada de imágenes.** El redactor no las trae y el renderizador no las pinta. Si
  algún día hacen falta, es otro formato y otra decisión.
