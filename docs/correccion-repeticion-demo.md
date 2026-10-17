# Corrección de repetición y presentación demo

## Alcance · 17 de octubre de 2026

Dos correcciones autorizadas tras contrastar las políticas de contenido de Google.
No son una certificación de cumplimiento ni una garantía de aprobación de AdSense.

### Una acción, una aparición

El recetario sin JavaScript repetía una regla por cada variable que la condicionaba.
Ahora recorre las reglas una vez en orden editorial y publica junto a cada una:

- Sus cifras, explicación, alcance y fuente originales.
- Todas las condiciones necesarias: **Y** entre variables, **O** entre opciones de una variable.
- La indicación «Se aplica siempre» cuando no hay condiciones.

Ejemplos de bloques antes → después: despegue a mitad **92 → 40**, piezas grandes
y grietas **66 → 41**, elephant foot **43 → 26**, placas **36 → 21**.
No se ha eliminado ninguna regla ni modificado el motor interactivo.

`verify:seo` detectó primero el fallo real **92 ≠ 40**. Ahora exige una aparición
por ID en el orden del registro, contenido completo y todas las condiciones con sus
opciones. Ya no calcula el esperado con el mismo helper de agrupación del renderer.
Se mantiene el mínimo previo de **900 palabras**, sin rellenar ni rebajar el umbral.

### La demo no es Jev ni una probabilidad validada

El panel recibe explícitamente el modo de clasificación desde ambos lugares donde
se monta. En demo muestra un aviso visible, «Estimación local (demo)», un índice
orientativo como **35/100** y soportes **No verificados**. La carga no dice que
consulte Jev. El índice no acredita calibración ni capacidad de predecir un fallo.

La barra de la wiki usa el mismo formato y explica el límite. Portada y Acerca de
distinguen la demostración local del servicio real. La presentación del modo real
se conserva; no se ha activado ningún backend ni se ha migrado a Laya.

## Verificación local

- Build correcto: 38 páginas exportadas.
- Demo **19/19**, guías **791/791**, wiki **204/204**, SEO **398/398**,
  enlaces **258/258**, esquema **44/44**, historial **114/114**, UI **170/170**.
- Rutas y teclado correctos. Lint: cero errores y tres avisos previos de prototipos.
  Persiste el aviso previo de chunks grandes del build.
- La comprobación de historial que exigía el encabezado Jev también para la demo
  falló y se sustituyó por una más precisa: identidad del modo y advertencia visible.
- Revisión independiente sin bloqueantes; incorporados ajuste de comentario y caso
  de soportes positivos en demo/real.
- Capturas revisadas: `scripts/verify/out/condiciones-{375,1440}.png`,
  `demo-{375,1440}.png` y `demo-guia-{375,1440}.png`.

Para repetir en producción demo:

```bash
BASE_URL=https://wiiki-3d.com npm run verify:demo
BASE_URL=https://wiiki-3d.com npm run verify:enlaces
```

Las fuentes técnicas, autoría, máquinas, CMP y configuración de AdSense no se han
modificado. La solicitud de revisión sigue siendo una decisión del propietario.
