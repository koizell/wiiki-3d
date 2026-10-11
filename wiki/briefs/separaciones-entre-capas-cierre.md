# Brief de cierre — `separaciones-entre-capas`

Fecha: 2026-10-04. Fase **R0**. Este artículo está **APROBADO**
(`wiki/reviews/separaciones-entre-capas-revision-5.md`). Tocarlo obliga a revisarlo otra vez.

## Rutas

| Papel | Ruta |
|---|---|
| Informe | `wiki/reviews/separaciones-entre-capas-revision-5.md` |
| Cocinado | `wiki/cooked/separaciones-entre-capas.md` |
| Artículo | `src/content/wiki/separaciones-entre-capas.md` |
| Plan de contenido, para el punto 1 | `docs/plan-de-contenido.md:109,137,148` |

## Las tres observaciones pendientes

1. **Comentario del frontmatter `:17–20`.** Dice «siete de los nueve artículos» con campo y
   que «los dos que no lo nombran» son éste y `enclosure-y-warping`. El plan tiene **seis**
   con campo y **tres** sin él; falta `adhesion-primera-capa`. Corrige los números del
   comentario. La regla que documenta —un campo, un artículo— sí es correcta y se queda.
2. **Tabla `:81–86` y su párrafo.** Las celdas de la columna de warping («Contracción
   térmica», «esquinas y brim») se apoyan en `warping-pla`, fuera de las siete fuentes de este
   artículo. El párrafo ya declara que la tabla mezcla fuente e inferencia: di **qué columnas**
   vienen de dónde, para que la mezcla sea visible y no se lea como si las siete fuentes
   respaldaran las tres columnas.
3. **Dos precisiones.** «Prueba de tres movimientos» cuando el raw enumera X, Y y las dos
   diagonales (`layer-shifting.md:23–39`); y una mención del caso de Naugh sin las etiquetas
   de foro y sin resolver, que en el resto del artículo sí aparecen.

## Reglas

- **No toques nada más.** Los siete defectos del informe 4 están resueltos y comprobados.
- Si un cambio altera una afirmación técnica, necesita su fuente localizable en raw; si no la
  tiene, no se hace.
- `wiki/raw/` no se edita, ni los informes previos.
- Salida: informe **6** en `wiki/reviews/separaciones-entre-capas-revision-6.md`, que confirme
  que las tres observaciones están resueltas y que nada más cambió. Si el informe 6 rechaza,
  termina BLOCKED.

## Contexto de lo que ya se corrigió a mano

Dos arreglos mecánicos post-aprobación, ya aplicados y verificados por `verify:wiki`
(112/112): la celda con barras verticales de la tabla `:278–282` y nada más. Si el informe 6
describe el fichero, que sea sobre el estado actual.
