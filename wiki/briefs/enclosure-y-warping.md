# Brief — `enclosure-y-warping`

Fecha: 2026-10-08. Fase de ingesta, quinto tema. Modo: `ingest`.

## Decisión editorial

**Pregunta:** con una impresora cerrada (o un enclosure), ¿puerta cerrada o abierta, y qué
temperatura de cámara? Y cuándo el propio enclosure es **la causa** del fallo —heat
creep— en lugar de la solución al warping.

**Público:** quien tiene una impresora cerrada (Bambu X1/P1, Prusa con enclosure) o está
pensando en cerrarla, y ve warping, atascos o sub-extrusión.

**Alcance:** la decisión cerrar/abrir y la temperatura de cámara objetivo, por filamento y
chapa. **Quedan fuera:** el warping sin enclosure, la separación entre capas, la adhesión
de primera capa, el secado del filamento, y cualquier cifra que las fuentes no den con su
contexto.

**Decisión que el lector debe poder tomar:** cerrar o abrir, y qué temperatura de cámara
buscar, según su filamento, su chapa y la temperatura de su habitación; y reconocer el
heat creep cuando aparece.

**Producto principal:** matriz contextual —temperatura de cámara por filamento, con la
tabla oficial de Bambu— **más** diagnóstico diferencial entre los dos fallos opuestos que
salen de la misma puerta.

## Estructura

1. **Diferencial.** Los dos fallos opuestos: *warping* (esquinas levantadas, por frío o
   corrientes) frente a *heat creep* (sub-extrusión, atascos, filamento ablandado, por
   cámara caliente). `siNo` → `warping-pla`, que es el warping sin enclosure.
2. **Variables.** Propuesta: `material` (necesaria), `chapa`, `ambiente` y `cama`.
   `verify:guias` rechaza cualquier variable decorativa; el redactor quita la que no
   cambie el resultado en ningún montaje.
3. **Conocimiento.** Tabla de cámara por filamento (Bambu, oficial), temperaturas de
   reblandecimiento (PLA ≈45 °C, PETG ≈70 °C), mecanismo del heat creep, cámara **activa
   frente a pasiva** (contradicción 2), el matiz de cuatro partes de cerrar/abrir
   (contradicción 1), la X1E y su cámara calefactada, y las cifras de foro **marcadas como
   una sola fuente**.
4. **Reglas.** Cerrar o abrir según condición, temperatura de cámara por filamento, y
   abrir cuando la temperatura de cama alcanza la de reblandecimiento del filamento.
5. **Fuera de alcance.** Tres destinos: `warping-pla`, `separaciones-entre-capas` y
   `adhesion-primera-capa`.

## Campo del panel: ninguno

No hay campo reservado para este tema y no se inventa. La guía **lee** `material` y
`bedTemp` del G-code (`leeDelAnalisis: ['material', 'bedTemp']`) para precontestar y para
la barra «Tu archivo», y enlaza cada uno a la variable que lo declara. No declara `campos`
de panel: `bedTemp` como campo de panel pertenece a `temperatura-cama`.

## Fuentes

Todas ya están en `wiki/raw/`; no se descarga nada nuevo.

| Fuente | Fichero |
|---|---|
| Bambu Lab, temperatura de cámara (tabla por filamento y advertencia) | `wiki/raw/enclosure-y-warping-bambu-wiki-chamber-temperature.md` |
| Bambu Lab, heat creep (mecanismo y placas) | `wiki/raw/enclosure-y-warping-bambu-wiki-heat-creep.md` |
| Foro de Prusa, temperaturas de enclosure por filamento | `wiki/raw/enclosure-y-warping-prusa-forum-optimal-enclosure-temps.md` |
| Foro de Bambu, PLA en X1C | `wiki/raw/enclosure-y-warping-bambu-forum-pla-in-x1c.md` |
| Bambu Lab, warping (cerrar puerta y tapa para bloquear el aire) | `wiki/raw/warping-pla-bambu-wiki-warping-falling-off-collapsing.md` |

La última es **una fuente ya capturada para `warping-pla`** y reutilizada aquí: el material
cocinado la cita, y no se vuelve a descargar. Cocinar dos veces el mismo fichero no crea
dos fuentes.

## Gate específico de este tema

Además de las reglas del plan:

1. **La misma puerta tiene dos razones opuestas.** Cerrar bloquea corrientes y sube la
   temperatura; abrir evita que el filamento se ablande. El matiz se publica; no se elige
   un lado.
2. **Cámara activa no es cámara pasiva.** El «0 °C» de Bambu es «no calientes la cámara
   activamente», no «la cámara debe estar a 0». El «35–39 °C» del foro es la temperatura
   que alcanza la cama sin calefacción. No se equiparan.
3. **La chapa decide el riesgo de heat creep.** Cool Plate (~35 °C de cama) no calienta la
   cámara lo suficiente; Textured PEI y placas que piden más de 50 °C, sí.
4. **La temperatura ambiente decide el lado del problema.** Ambiente frío empuja a cerrar;
   ambiente alto, a abrir.
5. **El hotend matiza, no decide.** El V6 de Prusa es más propenso al heat creep por
   encima de 30 °C de ambiente; otros hotends son más permisivos. Es de foro, y se dice.
6. **Ninguna cifra de foro se publica como recomendación general.** Las seis del apartado
   «Sin respaldo» van marcadas como una sola fuente secundaria, sin corroborar.
7. **Ninguna cifra sin su alcance.** La `nota` de cada `cifra` dice a qué filamento, chapa
   o situación pertenece.
8. **El «y/o» no se traduce a conjunción.** «Abre la puerta y/o quita la tapa» no es «haz
   las dos cosas».

## Lo que esta guía NO debe ser

Una tabla de temperaturas de cámara sin decisión. El valor está en que la misma acción
—cerrar— resuelve un fallo y provoca el contrario, y en decir en qué situación estás antes
de tocar la puerta.

## Prueba de utilidad

Antes de aprobarla, debe responder o declarar fuera de alcance tres escenas:

1. PLA en Textured PEI a 60 °C de cama, en una habitación a 24 °C, con la puerta cerrada y
   la impresora atascándose.
2. ABS en una habitación a 16 °C, sin enclosure, con las esquinas levantadas.
3. PETG con una placa de terceros que pide 70 °C de cama, cámara cerrada, y la primera capa
   sale con huecos.

No se escriben las respuestas esperadas de antemano. Se comprueba que la página permita
decidir qué hacer, o que diga con claridad que no hay evidencia suficiente.
