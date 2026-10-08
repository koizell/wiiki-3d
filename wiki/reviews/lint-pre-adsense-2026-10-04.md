# Lint previo a AdSense — 2026-10-04

**Veredicto del lote: RECHAZADO.** Los tres artículos necesitan una nueva vuelta de contenido antes de dar este lint por superado. No es un veredicto sobre elegibilidad o aprobación de AdSense.

## Alcance y resultados

Se revisaron los tres artículos existentes contra sus tres cooked y las 15 fuentes raw distintas referenciadas. Las revisiones anteriores sirvieron sólo como historial. No se consultaron nuevas fuentes, internet o código del analizador; tampoco se ejecutó `npm run verify:wiki` ni se comprobó disponibilidad HTTP actual.

| Artículo | Informe nuevo | Palabras contadas | Veredicto | Fallos agrupados / bloqueantes |
|---|---|---:|---|---:|
| `warping-pla` | `warping-pla-revision-6.md` | 3.099 | RECHAZADO | 13 / 6 |
| `temperatura-cama` | `temperatura-cama-revision-7.md` | 6.465 | RECHAZADO | 12 / 5 |
| `separaciones-entre-capas` | `separaciones-entre-capas-revision-4.md` | 3.905 | RECHAZADO | 7 / 4 |

Los fallos se cuentan por grupos de corrección, no por cada aparición repetida ni por cada comprobación afectada. Un mismo defecto puede hacer fallar respaldo, contradicciones y citas sin contarse tres veces. Recuento léxico en JavaScript sobre transcripción visible del cuerpo: sin frontmatter, URLs ni sintaxis Markdown; con títulos, tablas, etiquetas de enlaces y pie. Las imágenes/alt no se incluyen.

## Respaldo

### Lo que se ha podido corroborar

- **Todas las URLs de `sources`** —9, 6 y 7 por artículo, con solapamiento— están en raw con el mismo `url:`. No hay fuentes duplicadas dentro de una lista.
- Las cifras tabulares de cama por material/chapa, los incrementos de protocolos, offset 0,04 mm, brim 8–10 mm, regla de foro del 80 % y cifras de Belt Status están en los cuerpos de las fuentes.
- Las citas sustanciales en inglés existen; se comprobaron por partes las que cruzan saltos de línea. No se rechaza una cita por un falso negativo de `grep` de una frase partida.
- Los hilos de separación de 2020 y 2026 no muestran una resolución; el artículo mantiene correctamente ese estado para las recomendaciones 220–230 y bajar velocidad.

### Lo que no puede aprobarse por coincidir con cooked

| Error de contenido | Dónde nace o se reproduce | Evidencia que impide aprobarlo |
|---|---|---|
| 80 % aplicado a limpiar/apagar ventilador/subir cama | cooked y artículo de warping | Raw lo aplica a limpiar/nivelar/comprobar instalación de boquilla |
| Laminador sin chaflán de arista | cooked y artículo de warping | El hilo sólo menciona que Zakalawe usó Fusion |
| Cool Plate «quemada» a 65 °C | cooked y artículo de warping | La tabla sólo publica un intervalo recomendado 35–45 |
| Caso resuelto a 65 °C | cooked y artículo de warping | El usuario no da temperatura final y cambia también geometría |
| IPA no elimina nada de grasa de dedos | interpretación de cooked y artículo de temperatura | Raw habla de algunos aceites; el foro dice que no elimina **bien** |
| Químicos contienen acetona sin etiqueta y «limpiaparabrisas» | cooked/paráfrasis del artículo de temperatura | Raw dice **pueden** contenerla y menciona **limpiador de frenos** |
| Torre de purga unida a pieza/soltar juntas/no cortar | cooked y artículo de temperatura | Raw dice liberar ambos elementos flexionando la chapa, no que estén unidos |
| 70 °C como umbral más preventivo frente a 60 | cooked y artículo de temperatura | Retrasa abrir/quitar tapa; la fuente no resuelve la discrepancia |
| Ventilador primero en todos los protocolos | cooked y artículo de separación | Bambu lo pone tercero, después de boquilla/velocidad; sólo el foro prescribe «first» |
| Causa confirmada abajo de la torre | notas del recolector, cooked y artículo de separación | Observación de newgen + interpretación de Naugh sobre foto de baja resolución; caso sin resolver |
| «Tornillos de inercia» | notas del recolector, cooked y artículo de separación | La intervención dice `idler tension screws` |

Además hay ampliaciones no cocinadas sobre dinero, comportamiento de 0/ausencia en el panel y detalles de orientación/diagnóstico. Los informes individuales indican las líneas y qué retirar, matizar o documentar antes de una nueva redacción.

## Contradicciones

### Dentro de cada artículo

- **Warping:** una mejora sospechada pasa a chaflán que «resolvió»; una cita con puerta y/o tapa termina en ambas obligatorias; el consejo de reducir ventilador se convierte después en «no es bajar».
- **Temperatura:** 130 °C como máximo de las fuentes convive con 150 dudoso sin limitar el superlativo; la cita de cama fría incluye unión débil entre capas pero al final se excluye la cama para separación; 0 y ausencia se distinguen y después se afirma que el panel los trata igual sin respaldo.
- **Separación:** la tabla conserva ventilador tercero pero el texto lo llama primero en las tres fuentes; se relata pérdida de flujo por enfriamiento y a continuación se afirma que la temperatura nunca arregla flujo; el diagnóstico de base siempre plana se usa como frontera excluyente pese al mecanismo y curvatura citados.

### Entre artículos

1. `temperatura-cama:490–493` dice correctamente que Zakalawe no informó la temperatura final y no probó 65 °C; `warping-pla:235–236` lo presenta como valor del caso resuelto. Conciliar usando el hilo, no el texto más convincente.
2. `warping-pla:113–124` atribuye la categoría general «separaciones entre capas» a firmware/slicer; `separaciones-entre-capas` documenta causas térmicas, ventilación y flujo. La categoría general no es el caso concreto de huecos en juntas.
3. `temperatura-cama:640–643` excluye la cama para capas sueltas, pero `separaciones-entre-capas:155–160` cita un protocolo oficial que sube cama/cámara, y la propia fuente Orca de temperatura menciona unión débil con cama fría.
4. `warping-pla:297` exige puerta **y** tapa; `temperatura-cama:386–387` conserva puerta **o** tapa. La fuente usa **and/or**.

## Cobertura y enlaces pendientes

| Destino | Artículos que lo nombran | Estado en este lote |
|---|---|---|
| `warping-pla` | temperatura, separación | Existe |
| `temperatura-cama` | warping, separación | Existe; revisar la promesa del incremento +5 °C de cámara |
| `separaciones-entre-capas` | warping, temperatura | Existe |
| `adhesion-primera-capa` | warping, temperatura | Pendiente; referencia wiki válida |
| `enclosure-y-warping` | warping, temperatura | Pendiente; referencia wiki válida |
| `material` | temperatura | Pendiente; referencia wiki válida |
| `capas-desplazadas` | separación | Pendiente; referencia wiki válida |
| `flow-rate` | separación | Pendiente; referencia wiki válida; faltan fuentes de calibración |
| `slicer` | relación en cooked de temperatura, no página nombrada en su artículo | Relación prometida sin cubrir; conciliar cooked/artículo |
| `altura-capa` / regla de altura de capa | necesidad editorial anotada en cooked de separación | Falta respaldo oficial de la regla de foro; no es un enlace roto del cuerpo |

Las páginas pendientes escritas como `[[slug|texto]]` **no se anotan como enlaces rotos**. Los tres artículos se enlazan entre sí; ninguno queda huérfano dentro de este lote de tres. No se ha comprobado navegación externa al lote.

No se encontraron enlaces Markdown normales a **páginas** internas inexistentes. Las dos rutas Markdown a `/wiki/warping-pla/*.svg` son imágenes y existen. La URL inline de PrusaSlicer #11914 está presente en el cuerpo de un raw; no se confunde con una fuente descargada en `sources`.

**Promesa de destino que falta:** `separaciones-entre-capas:402–404` remite a temperatura para explicar +5 °C de cámara. Ese incremento procede de `interlayer-cracking`; `temperatura-cama` no incluye esa fuente ni ese ajuste. Un destino existente puede estar enlazado con una descripción incorrecta: corregir la promesa o completar el destino mediante cooked y fuentes.

## Imágenes nuevas

Se leyeron `public/wiki/warping-pla/portada.svg`, `diagrama.svg` e `imagenes.json`.

- Los SVG son dibujos conceptuales sin texto técnico y coinciden con las dimensiones declaradas 960×540 y 960×400.
- El artículo los llama conceptuales en el texto alternativo. El sidecar declara creación SVG en código y `technicalSource: false`.
- No entran en `sources`, no proporcionan cifras de impresión y **no cuentan como respaldo** de ninguna afirmación.
- Este lint no valida apariencia, ancho de lectura, funcionamiento de accesibilidad en navegador o layout responsive.

## Siguiente vuelta

1. Recocinar los pasajes cuyo error ya estaba en cooked, usando las intervenciones/cuerpos raw indicados. No editar raw.
2. Redactar sobre los artículos existentes conservando datos válidos y corrigiendo las ampliaciones señaladas; no sustituirlos desde cero.
3. Revisar otra vez las cinco comprobaciones y conservar todos los informes históricos. Las aprobaciones anteriores no prevalecen sobre una afirmación sin fuente.
4. Ejecutar por separado `npm run verify:wiki` y la verificación en navegador. Este informe no afirma que hayan pasado ni que la solicitud de AdSense vaya a aprobarse.

Se escribieron únicamente estos cuatro informes nuevos; no se modificaron artículos, cooked, raw ni imágenes.
