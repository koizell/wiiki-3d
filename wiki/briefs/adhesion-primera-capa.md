# Brief — `adhesion-primera-capa`

Fecha: 2026-10-04. Fase de ingesta, primer tema del piloto. Modo: `ingest`.

## Decisión editorial

**Pregunta:** la primera capa no se pega. Que se compruebe, en que orden, y que no se
puede concluir de la imagen.

**Publico:** alguien que acaba de imprimir su primera pieza, ve la base levantada o
pegada, y quiere saber que mirar antes de volver a imprimir.

**Alcance:** adhesion de la primera capa a la cama. **Quedan fuera:** separacion entre
capas a altura, warping de esquinas, fallos de extrusion en general, y cualquier ajuste de
slicer que las fuentes no documenten.

**Decision que el lector debe poder tomar:** que comprobar primero y que descartar con
evidencia, no con suposiciones.

**Producto principal:** diagnostico diferencial. Sintoma, comprobacion, resultado
esperado, siguiente paso.

## Campo del panel: ninguno

`bedTemp` pertenece exclusivamente a `temperatura-cama`. Este articulo **no declara
campo**, y su comentario de frontmatter debe decirlo. La regla es «un campo, un
articulo»: `layerHeight` es de `altura-capa` y `hotendTemp` de `temperatura-hotend`.

## Fuentes

Una ya esta en `wiki/raw/` y **no se vuelve a descargar**:

- `wiki/raw/temperatura-cama-prusa-kb-first-layer-issues.md` (`first-layer-issues_1804`).
  Es la misma pagina que usa `temperatura-cama` para limpieza y quimicos. Cocinar dos
  veces el mismo fichero no crea dos fuentes.

Cuatro verificadas en vivo el 2026-10-04, todas con estado 200 y contenido real:

| URL | Comprobacion |
|---|---|
| `wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking` | 200, 49.633 bytes, «First Layer Not Sticking: Causes and Solutions» |
| `help.prusa3d.com/article/first-layer-calibration-i3_112364` | 200, 1.555.748 bytes, «First Layer Calibration (i3)» |
| `help.prusa3d.com/article/mesh-bed-leveling_112163` | 200, 1.492.152 bytes, «Mesh bed leveling» |
| `help.prusa3d.com/article/skirt-and-brim_133969` | 200, 1.486.137 bytes, «Skirt and Brim» |

Descarga autorizada bajo `wiki/policy/sources.json`: solo `wiki.bambulab.com` y
`help.prusa3d.com`, sin salir de las rutas permitidas y sin eludir login, CAPTCHA ni
paywall.

**Los dos casos ya conocidos en este proyecto:**

- Una pagina puede devolver 200 y ser un aviso sin contenido. Si el cuerpo extraido es
  trivial, se registra como `empty` y no se cocina.
- `mesh-bed-leveling_112363` esta muerta; la buena es `_112163`. Ya comprobado.

## Material reutilizable

De `wiki/cooked/temperatura-cama.md`, y solo con su alcance intacto: limpieza con IPA al
90 %; «no quita bien» los aceites de los dedos, no «no quita ninguno»; acetona solo en
PEI lisa y alrededor de una vez al mes; la torre de purga se libera **flexionando la
chapa**, sin unirla a la pieza ni cortarla; el Warm Tower no se aplica a material poroso.
El incremento de +5 a +10 °C de cama de `first-layer-issues` ya esta cocinado ahi.

## Reglas del gate

Ademas de las reglas del plan, para este tema:

1. **Una marca de calibracion no es un ajuste.** Un video o un dibujo de primera capa
   perfecta prueba el procedimiento, no que tu impresora este bien.
2. **Un orden de pasos es de su fuente.** Si dos fuentes ordenan distinto, se publica el
   orden de cada una y no se inventa un consenso.
3. **Z-level, Live Adjust Z y o Z-compensation son cosas distintas.** La fuente dice lo
   que dice; no se equiparan.
4. **Limpieza: lo que Prusa prohibe y lo que Bambu manda son dos acciones distintas.**
5. **Ninguna cifra sin unidad ni pagina.** Si la fuente no da unidades, no las pongas.
6. **Nada de presets universales**, ni de «esto funciona siempre».
7. **El aceite de los dedos no se quita con IPA:** es la version corta de lo que ya esta
   cocinado, y se cita la fuente, no se reescribe.

## Lo que este articulo NO debe ser

Una lista de «soluciones» ordenadas sin jerarquia. El valor esta en distinguir el sintoma
que si se puede diagnosticar del que no, y en decir explicitamente cuando la respuesta es
«hace falta otro dato».

## Prueba de utilidad

Antes de aprobarlo, debe responder o declarar fuera de alcance tres escenas:

1. La pieza se despega solo por una esquina, con material por defecto y cama a la
   temperatura de fabrica.
2. La primera capa se ve arrugada pero el centro esta bien pegado.
3. El usuario ya limpio, nivelo y cambio de material, y sigue igual.

No se escriben las respuestas esperadas de antemano. Se comprueba que la pagina permita
decidir que comprobar, o que diga con claridad que no hay evidencia suficiente.
