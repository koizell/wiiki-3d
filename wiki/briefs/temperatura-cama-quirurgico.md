# Brief quirúrgico — `temperatura-cama`

Fecha: 2026-10-04. Fase **R0**. No es una redacción nueva: son cinco pasajes.

## Rutas

| Papel | Ruta |
|---|---|
| Informe que manda | `wiki/reviews/temperatura-cama-revision-8.md` |
| Cocinado | `wiki/cooked/temperatura-cama.md` |
| Artículo | `src/content/wiki/temperatura-cama.md` |
| Fuentes | los seis `wiki/raw/temperatura-cama-*.md` y `warping-pla-prusa-forum-adjusting-settings-warping-pla.md` |

## Los cinco defectos, y sólo cinco

1. **Líneas 257–261, bloqueante.** «`first-layer-issues` no publica ninguna cifra de cama en
   todo el lote». Falso: `:66` publica «increase the heatbed temperature by 5-10 °C», y el
   propio artículo la cita cinco secciones después. Conserva la mitad correcta —no publica
   temperatura recomendada por material ni por chapa— y sustituye la segunda por la forma que
   sí se sostiene: su único número de cama es el incremento de +5–10 °C sobre el valor del
   perfil.
2. **Líneas 196–197 y 215–217, importante.** «las **tres** fuentes» del PETG. Para el PETG
   hay **dos** rangos: Bambu 60–80 (`:68`, `:102`) y Prusa 70–90 (`filament-material-guide:15`).
   El 110 es del PETG HT, otro material, como ya dice el artículo. La segunda frase —«ninguna
   de las tres se parece a las otras dos»— no tiene a qué referirse. Si mantienes la idea de
   «el material donde las fuentes se separan más», sostenla con las dos que lo listan. Nace en
   `wiki/cooked/temperatura-cama.md:614–617`: corrige también ahí.
3. **Líneas 429–435, importante.** La discrepancia 60/70 °C se publica sin resolver —bien—,
   pero mal ubicada. Con la prosa (`>60 ℃`: abrir puerta y/o quitar tapa) y la tabla
   (`>70`: Recommended), **por encima de 70 las dos mitades recomiendan lo mismo**; la banda
   de contradicción es **de 60 a 70 °C**. Corrige dónde está el desacuerdo y sigue sin
   decidir cuál manda. Nace en `wiki/cooked/temperatura-cama.md:579–580`.
4. **Líneas 336–338, menor.** «meter la chapa en agua caliente por seguir a Bambu es
   exactamente lo que Prusa prohíbe por escrito». Lo que Prusa prohíbe es **sumerger**
   (`first-layer-issues.md:31`, «do not submerge the sheet completely in hot water»); lo que
   Bambu manda es **limpiar la superficie** con agua caliente
   (`filament-guide-material-table.md:120`). Son dos acciones distintas y ninguna fuente las
   equipara.
5. **Líneas 469–471, menor.** La cita de OrcaSlicer se cierra sin puntos suspensivos donde
   estaba la condición: en `material-temperatures.md:53` sigue «…for each Bed type **if
   Support multi bed types is enabled in printer settings**». Añade la condición o córtala con
   puntos suspensivos y di que va condicionada.

## Reglas

- Los doce defectos del informe 7 están resueltos y comprobados, y los cinco puntos que el
  brief anterior fijaba se cumplen. **No los toques.**
- El apartado sobre el campo opcional se titula «Por qué este dato puede no aparecer» y lo
  necesita así: `verify:wiki` comprueba ese contrato (`scripts/verify/wiki.mjs:1039`). No lo
  renombres.
- La tabla de `:278–282` del artículo hermano usa comillas en vez de barras verticales
  porque el renderizador parte las celdas por `|` sin reconocer escapes. Si tocas una tabla,
  mismo cuidado: **ninguna barra vertical dentro de una celda**, ni dentro de un fragmento de
  código.
- Edita sólo los pasajes de arriba y lo que dependa de ellos. `wiki/raw/` no se edita, ni los
  informes previos.
- Salida: cocina y redacta sobre los ficheros existentes, escribe el informe 9, y si
  rechaza, termina BLOCKED sin otra vuelta.

## Nota sobre el conteo de palabras

El recuento por tokens manual del informe 8 es aproximado. Ningún informe nuevo debe
publicar un recuento sin ejecutarlo sobre el fichero.
