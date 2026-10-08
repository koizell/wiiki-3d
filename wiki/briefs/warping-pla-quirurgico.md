# Brief quirúrgico — `warping-pla`

Fecha: 2026-10-04. Fase **R0**. No es una redacción nueva: son tres pasajes.

## Rutas

| Papel | Ruta |
|---|---|
| Informe que manda | `wiki/reviews/warping-pla-revision-7.md` |
| Cocinado | `wiki/cooked/warping-pla.md` |
| Artículo | `src/content/wiki/warping-pla.md` |
| Fuentes | los nueve `wiki/raw/warping-pla-*.md` |
| Cocinado hermano, para no contradecirlo | `wiki/cooked/temperatura-cama.md:491–493` |

## Los tres defectos, y sólo tres

1. **Línea 308–310, bloqueante.** Dice que la tabla de Prusa «no desglosa por chapa» y que
   «la columna de chapa no existe en ella». La fuente dice lo contrario
   (`temperatura-cama-prusa-kb-filament-material-guide.md:33–34`): la tabla **tiene** un grupo
   SHEETS de seis columnas (Textured, Smooth PEI, Satin, Special PA Nylon, PP, HT). Lo que
   no se puede publicar es su **contenido**, porque en el original está desaliñado respecto a
   su cabecera. Corrige el sentido de la frase y **conserva la conclusión** que el párrafo
   quiere sostener —no se puede justificar a Prusa por chapa desde esa tabla—, cambiando el
   motivo. Haz el mismo arreglo en `wiki/cooked/warping-pla.md:194–195`, o el redactor lo
   repetirá. Debe coincidir con `wiki/cooked/temperatura-cama.md:491–493`, que ya lo tiene
   bien: dos artículos no pueden decir cosas distintas sobre la misma tabla.
2. **Líneas 246 y 364, importante.** «el hilo donde está documentado el **ciclo completo** de
   un warping». El propio artículo declara tres veces que nadie midió cuál de las dos
   variables hizo el trabajo ni con qué temperatura acabó. Sustituye el nombre del caso por
   uno que no afirme resolución: «el hilo donde está documentado el antes y el intento de
   después», «el hilo de 2019» o «ese hilo». No toques las cifras: ya están bien.
3. **Líneas 88–89, menor.** «si a tu PLA sólo se le levantan las piezas grandes… **el ajuste
   va en otro lado**» es una conclusión tuya que además apunta en contra de la tabla de
   Bambu, que da ajustes precisamente para ese caso (infill Gyroid ≤25 %, cama +5–10 °C,
   `warping-pla-bambu-wiki-warping-falling-off-collapsing.md:129–133,162–169`). Márcalo como
   criterio del artículo, igual que se marcaron la hipótesis de chaflán y radio, o quita la
   segunda cláusula. Si se deja el razonamiento, no debe empujar al lector a saltarse el
   paso 3.

## Reglas

- Los trece defectos del informe 6 están resueltos y comprobados. **No los toques** y no
  introduzcas regresiones en ellos.
- Edita sólo los pasajes de arriba y lo que dependa de ellos. Nada más.
- `wiki/raw/` no se edita. Los informes previos tampoco.
- Actualiza `updated:` sólo si de verdad cambia el contenido, y con la fecha de hoy.
- Salida: cocina y redacta sobre los ficheros existentes, escribe el informe 8, y si
  rechaza, termina BLOCKED sin otra vuelta.

## Nota sobre el conteo de palabras

El recuento por tokens manual del informe 7 es aproximado. Ninguna cifra de recuento entra
en el artículo, y ningún informe nuevo debe publicar un recuento sin ejecutarlo sobre el
fichero.
