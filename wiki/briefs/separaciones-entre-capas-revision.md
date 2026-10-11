# Brief de revisión — `separaciones-entre-capas`

Fecha: 2026-10-04. Fase P0. Modo: **revisión sobre material existente**, no Ingest.

## Rutas

| Papel | Ruta |
|---|---|
| Cocinado a corregir | `wiki/cooked/separaciones-entre-capas.md` |
| Artículo a corregir | `src/content/wiki/separaciones-entre-capas.md` |
| Informe que manda | `wiki/reviews/separaciones-entre-capas-revision-4.md` |
| Lint del lote | `wiki/reviews/lint-pre-adsense-2026-10-04.md` |
| Fuentes | los siete ficheros listados en `sources` del artículo |

**El informe que manda es `separaciones-entre-capas-revision-4.md`.** Sus 7 fallos son la
lista de trabajo. El artículo tiene 3.905 palabras, el informe aprueba su longitud y su
relleno, y aprueba la trazabilidad de casi todos los datos: el trabajo es corregir 7
pasajes.

## Fallo 4 ya decidido: nombre de la pieza

`newgen` escribió **«Adjusted the idler tension screws»** en
`separaciones-entre-capas-prusa-forum-layer-separation-delamination-help.md:37`. El
término «tornillos de inercia» sólo existe en las notas del recolector y en cocinado.
Se escribe el nombre del ajuste tal como aparece en la intervención —tensores del
idler— y no se le atribuye una función de inercia ni se le inventa una pieza.

## Qué NO se hace

- No se empieza desde cero. La tabla comparativa de los cuatro métodos de Bambu, los
  rangos con su matiz de marca, los números de Belt Status y la regla de foro del 80 %
  se conservan: el informe los aprueba, incluida la regla de que el límite es «por
  debajo» del 80 %.
- No se edita `wiki/raw/`. Todos los defectos se resuelven reduciendo o delimitando la
  afirmación.
- No se escribe el informe: el revisor lo hace, y le toca el número 5.
- No se consulta internet.

## Reglas de este brief

1. **Una causa compartida no es una prioridad compartida.** Bambu pone el ventilador
   tercero, después de un método térmico; sólo bobstro dice «try reducing cooling
   first». Cada protocolo conserva su orden y «primero» se atribuye a quien lo dice.
2. **Observación e interpretación van separadas y con autor.** newgen observa el
   empeoramiento hacia arriba; Naugh interpreta una foto de baja resolución. El hilo
   termina sin resolver, y eso se dice cada vez que se use el caso.
3. **Una falta de material no es un atasco, y nada thermal queda prohibido por
   defecto.** Bambu dice que un atasco *puede parecerse* a una grieta y propone cold
   pull; Naugh atribuye pérdida de flujo a la viscosidad al bajar la temperatura y
   recomienda 220–230 °C para su caso. El artículo no puede reproducir ese diagnóstico y
   luego negar la vía térmica.
4. **Los síntomas no son mutuamente excluyentes.** Prusa describe cortes con curvatura
   y fuerzas de warping por encima de la adhesión, y el propio artículo lo cita: una
   pieza arqueada desde la base no expulsa el mecanismo. Si se deriva una orientación
   geométrica de una frase ambigua, se marca como inferencia.
5. **Cada comprobación conserva su alcance de modelo.** La regla de movimiento diagonal
   está bajo Prusa CORE One, con CoreXY; el alcance MK3/S/+ es el de Belt Status. No es
   un diagnóstico universal de cualquier impresora.
6. **Los rangos son de documentos distintos.** 185–235 viene de la tabla de materiales;
   195–220, del KB de separación y con matiz de marca. No hay un rango reservado al
   diagnóstico, y el título del documento no demuestra que los números respondan a
   criterios distintos.

## Reconciliación con los otros dos artículos

- `separaciones-entre-capas:402–404` promete que `temperatura-cama` explica de dónde sale
  el **+5 °C de cámara**, pero ese incremento viene de
  `separaciones-entre-capas-bambu-wiki-interlayer-cracking.md`, que `temperatura-cama` no
  cita. Dos salidas: corregir la descripción del enlace para que diga lo que el destino sí
  contiene, o completar el destino por cocinado y fuentes. **Preferir la primera**: no
  obliga a tocar el otro artículo dentro de esta fase.
- `temperatura-cama:640–643` excluye la cama de las capas sueltas y este artículo cita un
  protocolo oficial que sube cama y cámara. Al corregir temperatura, la exclusión se
  retira; aquí no hay nada que cambiar, pero tampoco se debe usar ese artículo como
  autoridad para excluir la cama.

## Cobertura de relaciones

`capas-desplazadas` y `flow-rate` están pendientes y se nombran como referencias
`[[slug|texto]]`: no son enlaces rotos y no se inventan. `layerHeight` se admite como campo
interno sin respaldo externo; no se amplía.

## Criterio de salida de la fase

Cocinado sin los 7 defectos, artículo sin los 7 defectos, informe 5 escrito y aprobado.
Si el informe 5 rechaza otra vez, este artículo queda BLOCKED.
