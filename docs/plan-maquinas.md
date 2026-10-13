# Plan: el catálogo de máquinas y el simulador

Fecha: 2026-10-12. Estado: **plan aprobado en conversación**, pendiente de
prototipo. Se conversó con el propietario entre el 12 y el 12 de octubre de 2026.

Predecesor: [`plan-guias.md`](plan-guias.md), que describe el formato guía y sus
verificaciones; este plan no lo sustituye, lo usa. La pista de archivos es el
plan C1-C4 expuesto en la misma conversación y se recoge aquí íntegro.

---

## 1. Intención, y por qué

La wiki tiene nueve guías escritas por síntoma y todas comparten una suposición
no declarada: que quien lee tiene una FDM cartesiana de cama móvil con una chapa
concreta. La realidad es que **la máquina es una de las variables que deciden el
problema**, y hoy no está en ninguna parte.

El caso que lo demostró, con datos reales de dos modelos de la misma marca:

| Dato | Ender 3 V3 KE | Ender 3 V3 SE |
|---|---|---|
| Velocidad máxima | 500 mm/s | 250 mm/s |
| Temperatura boquilla máx | 300 °C | 260 °C |
| Altura Z | 240 mm | 250 mm (la barata tiene más) |
| Sensor de filamento | Sí | No |
| Klipper nativo + input shaper | Sí | No |
| Firmware | Creality OS (Klipper) | Marlin propio |
| Precio | 299 € | 175 € |

Un ABS necesita más de 260 °C de boquilla. En la SE va al límite; en la KE no.
La máquina no es contexto del problema: **es una de sus causas**, y la página no
puede seguir dando consejos como si todas fueran iguales.

La segunda intención es que la web deje de ser estática: una simulación donde
quien visita ve **su** máquina imprimir, con **su** filamento, y el resultado que
esa combinación produce de verdad.

## 2. Objetivos

1. Un catálogo de máquinas **por modelo**, no por familia: cada ficha con su
   marca, modelo, cinemática, límites y arquitectura, cada cifra con su fuente.
2. Un simulador en `/maquinas/` que represente la máquina elegida y simule la
   impresión con los parámetros de su ficha.
3. El filamento (genérico o de marca) como segunda elección, filtrado por los
   límites reales de la máquina.
4. Una guía de máquinas vía pipeline que explique por qué existen máquinas
   distintas y qué determina cada una.
5. El plan de compatibilidad por archivo (C1-C4 de §7), con el puente hacia el
   simulador.

**No objetivos:** no es comparativa de compra, no asesoramiento de compra, no
catálogo completo del mercado, no fotorealismo.

**Antí-objetivos:** datos sin fuente; un simulador que afirme lo que la ficha
no respalda; catálogos que se pudren sin fuentes; tocar la sección de anuncios.

## 3. Decisiones tomadas (con su razón)

| Decisión | Elección | Razón |
|---|---|---|
| Unidad del catálogo | **Modelo**, no familia | KE y SE comparten chasis y difieren en velocidad, temperatura y Z |
| Dónde vive el simulador | Ruta propia `/maquinas/`, enlazada desde el inicio | La portada se mantiene ligera; el simulador necesita espacio para crecer |
| Representación | 3D procedimental (Three.js) configurado por la ficha | Three.js ya se carga en diferido en la app (`Viewer3D`); se promete **representación reconocible**, nunca "igual que la tuya" |
| Filamento | Genérico por familia + 2-3 marcas | La marca sí cambia la temperatura de boquilla, multiplica el scraping |
| Qué modelos primero | 7 modelos, 4 marcas, 3 cinemáticas | Ver §4: lo mandan las señales de ventas y uso |
| Contenido de máquinas | Pipeline completo (`recolector → cocinero → redactor → revisor`) | Regla del repo: nada escrito a mano |

## 4. La estadística que ordena el catálogo

No existen cifras públicas de unidades vendidas por modelo. Sí hay tres señales
defendibles, y cada una mide una cosa distinta:

| Señal | Fuente | Qué mide | Hallazgo |
|---|---|---|---|
| Cuota de mercado | Context (vía Tom's Hardware / All3DP / 3druck) | Envíos, no parque | Bambu superó a Creality en 2025 (37 % del segmento <2.500 $); en los 4 primeros meses de 2026 ~la mitad de ventas era Bambu y 1 de 4 Creality; Bambu pasó del millón de impresoras enviadas |
| Voto de comunidad | Gavler (337 votos, oct. 2026) | Popularidad, no propiedad | P2S 42 votos, P1S 38, Mars 5 Ultra 36, CORE One 35, **Ender 3 V3 SE 39** |
| Legado instalado | Antigüedad + foros | Parque real en casas | La familia Ender 3 (desde 2018) es históricamente la máquina más presente |

Lectura: Bambu manda en ventas nuevas, el Ender 3 manda en máquinas ya en uso.
Para una wiki de problemas importan las dos cosas. **Regla: cada ranking lleva
su señal etiquetada y no se promedian.**

### Catálogo de arranque (7 modelos)

| # | Máquina | Precio ref. | Cinemática | Motivo |
|---|---|---|---|---|
| 1 | Creality Ender 3 V3 SE | 199 $ | Bed-slinger | La más votada y el legado instalado más grande |
| 2 | Creality Ender 3 V3 KE | 299 $ | Bed-slinger | El caso real de "misma marca, otra ficha" |
| 3 | Bambu Lab A1 | ~350 $ | CoreXY abierta | Líder de ventas nuevo, gama de entrada |
| 4 | Bambu Lab P1S | 399 $ | CoreXY **cerrada** | El contraste abierta/cerrada: el eje warping |
| 5 | Prusa MK4S | ~800 $ | Bed-slinger | El estándar de calidad; documentación pública fiable |
| 6 | Prusa CORE One | 1.299 $ | CoreXY | Cámara activa hasta 55 °C; gama alta |
| 7 | Elegoo Mars 5 Ultra | 300 $ | Resina SLA | Tercera familia física; 36 votos |

Después, por demanda real: Ender-3 V4 Combo, P2S, XL, Anycubic Kobra 3 /
Photon M7 Pro, QIDI.

## 5. Las piezas

### 5.1 Catálogo de máquinas

`src/content/maquinas/<slug>.ts`, tipado, paralelo a las guías pero **datos, no
prosa**:

```
marca · modelo · anio · precio_ref
cinematica · volumen · dimensiones · peso · potencia
velocidad_max · temp_boquilla_max · temp_cama_max
cerrada · extrusion (directa|bowden) · boquilla · nivelacion
klipper_nativo · input_shaper · sensor_filamento · firmware
materiales · filamentos (marca o generico) · fuentes[]
```

Regla heredada de las guías: ninguna cifra sin fuente; discrepancia entre
fabricante y tercero se declara, no se promedia.

### 5.2 Simulador (`/maquinas/`)

Constructor 3D procedimental: un plano por familia cinemática (bed-slinger,
CoreXY, delta si entra más adelante, resina) **configurado con los datos de la
ficha** —proporciones reales, color, cerrada o abierta, pantalla, extrusor—. La
ficha gobierna la simulación:

- velocidad máxima → ritmo de la animación (500 vs 250 mm/s se nota),
- temp. boquilla máx → qué filamentos caben (260 °C marca el ABS),
- cámara cerrada → el resultado (esquinas levantadas o no),
- altura Z y volumen → la pieza que cabe.

Recorrido del usuario:

1. Portada → sección «¿Con qué máquina imprimes?» con la galería.
2. `/maquinas/` → elige su modelo; ve la máquina en 3D con su ficha al lado.
3. Elige filamento (genérico o de marca); la máquina filtra lo que no admite.
4. «Imprimir» → la simulación corre con los parámetros reales.
5. El resultado enlaza la guía que lo explica, con máquina y filamento ya
   declarados (mecanismo `precontestar` que ya existe).
6. Sin JavaScript: galería y fichas como tabla; la simulación es la capa de
   encima. El valor SEO se lo lleva el catálogo.

### 5.3 Guía de máquinas

Tema nuevo por el ciclo entero. Explica por qué existen máquinas distintas, qué
determina cada una y **qué significan las señales de §4** (más vendida ≠ más
antigua). Conecta con `warping`, `adhesion-primera-capa`, `enclosure-y-warping`
y `separaciones` desde `fueraDeAlcance`.

### 5.4 Filamento

Genérico por familia (PLA, PETG, ABS, ASA, TPU, PC, PA) + 2-3 marcas donde el
fabricante publica temperatura oficial. La boquilla de la máquina filtra; el
perfil de marca ajusta la temperatura.

## 6. Restricciones

1. **`wiki/raw/` es inmutable.** Si un dato estaba mal, se escribe un fichero
   nuevo.
2. **Nada decorativo**: cada número de la ficha mueve algo en la simulación o
   la guía. Si no cambia nada, no se publica.
3. **Nada sin fuente**: cada cifra lleva su URL; ninguna imagen respalda una
   afirmación (regla del repo).
4. **Sin dependencias nuevas**: Three.js ya está; el simulador se carga en
   diferido como `Viewer3D`.
5. **La otra sección (anuncios/AdSense) no se toca**: ni `index.html`, ni la
   colocación de `docs/mapa-anuncios.md`. El simulador no invade la zona de
   subida.
6. **Ausencia ≠ cero**: un dato que la ficha no declara se dice ausente.
7. `verify:layout` sigue fallando a 640×360 (deuda anterior); este plan no la
   toca y ninguna métrica nueva debe depender de ella.

## 7. Compatibilidad por archivo (C1-C4)

Lo que se descubrió del código, y lo que hay que hacer:

| Archivo | Qué es | Hoy | Se puede sacar |
|---|---|---|---|
| `.gcode` / `.gco` | Salida del laminador | Cabeza+cola, detecta Cura/Prusa/Orca | material, temperaturas, capa, tiempo, gramos, soportes. **Falta: `printer_model`, `nozzle_diameter`** |
| `.stl` | Malla | Visor 3D | Geometría: volumen → gramos estimados (declarados) |
| `.obj` | Malla | "Visor no disponible" | Igual que STL; hoy es una disculpa, no información |
| `.3mf` | Modelo **o** proyecto del laminador (ZIP con malla + perfiles) | Visor 3D de la malla | **No se lee la configuración**: impresora, filamento, temperaturas |
| desconocido | — | Mensaje por extensión | Identificar por contenido (bytes mágicos) |
| proyectos (app) | Análisis guardado con nombre, no es archivo | `/proyectos/` funciona | Coexiste con el "proyecto" del laminador sin que la página distinga las dos acepciones |

Tareas:

| # | Tarea | Aceptación |
|---|---|---|
| C1 | Oler contenido (ZIP `PK`, `solid`, cabecera 80 B, `;`+`G1`, `#`/`v `); si extensión y contenido discrepan, gana el contenido y se dice | Un STL renombrado a `.gcode` responde "es una malla, no un programa" |
| C2 | Matriz de extracción por tipo (G-code + pistas de impresora; 3MF proyecto con sus perfiles; STL/OBJ con volumen → gramos **estimados**) | Cada tipo responde lo suyo y lo demás como «—», nunca un 0 inventado |
| C3 | «Si es proyecto»: detectar 3MF con perfiles, pre-seleccionar máquina del simulador (patrón `precontestar`/`leeDelAnalisis`) | Un `.3mf` de Bambu abre `/maquinas/` con su máquina |
| C4 | `verify:formatos` con fixtures reales (G-code de cada familia, STL binario/ASCII, OBJ, 3MF modelo, 3MF proyecto, renombrados, truncado), cada comprobación **vista fallar** | Suite en verde |

## 8. Verificación

| Comprobación | Qué mira |
|---|---|
| Catálogo completo | 7 modelos con todos los campos y al menos una fuente por cifra |
| Ficha → simulación | Cada parámetro de la ficha se usa (velocidad, temperaturas, cámara, volumen); una ficha sin parámetros usados falla |
| Consistencia cinemática | Familia y movimiento del modelo coinciden (bed-slinger mueve la cama; CoreXY no) |
| Filamento filtrado | ABS sobre 260 °C máx aparece marcado; no se permite elegirlo sin aviso |
| Fuentes vivas | Cada URL del catálogo responde; una fuente caída rompe la suite |
| Guía ↔ catálogo | Cada guía que enlaza una máquina apunta a una que existe |
| Estático | Sin JS, `/maquinas/` exporta galería y fichas; el visor 3D no aparece en `dist/` |

## 9. Orden de trabajo

1. `recolector`: fichas oficiales de las 7 máquinas + 3 marcas de filamento
   (es el plazo largo; va primero).
2. `cocinero`: extrae y cruza; declara contradicciones.
3. Catálogo tipado + guía de máquinas (redactor → revisor).
4. Prototipo del simulador con las tres cinemáticas → prueba local → revisión
   visual → implementación.
5. Archivos C1-C4 con su `verify:formatos`.
6. «Máquina» como variable en las guías existentes, **sólo** donde el material
   cocinado lo respalde.

## 10. Decisión de formato: se descarta el 3D, va la previsualización 2D

**Fecha: 2026-10-13.** Tras construir un prototipo 3D de la AD5X
(extrusiones, husillos con rosca, correas, paneles ventilados, cama enroscada),
el propietario **descarta el emulador 3D** y pide **previsualización 2D de la
máquina**. Tres razones que el propio proceso sacó a la luz:

1. **Fiabilidad**: la escena 3D depende de WebGL. La ventana que el propietario
   abrió se quedó negra (el módulo no llegó a ejecutarse) y sólo se detectó
   porque él la miró. Un SVG en línea no tiene ese modo de fallo.
2. **Peso y alcance**: el 3D arrastra Three.js y un modelo por máquina; el
   catálogo entero serían megas y mantenimiento por modelo.
3. **Lo que se vio del 3D** oscilaba entre horas de modelado y "caja oscura":
   las máquinas cerradas no se leían por dentro.

### 10.1 Qué es la previsualización 2D

**Ilustración técnica en SVG en línea por modelo**, animada con CSS, con el
mismo lenguaje visual que los dibujos de síntoma del repo (`DibujoSintoma`):
trazo `currentColor`, acento para lo que se mueve, sin texto dentro del SVG,
`prefers-reduced-motion` respetado por CSS.

- **Cada máquina es su silueta real**: armazón con perfil y ranuras, paneles
  ventilados, puerta de cristal, husillos, cama con su chapa, cabezal con su
  cubierta, bobina o hub. Se reconoce el modelo, no es un cubo genérico.
- **La animación sale de la ficha**: qué se mueve y a qué velocidad lo dictan
  los parámetros reales (cinemática, velocidad máxima, paso del husillo).
- **Funciona sin JavaScript**: la animación es CSS; la exportación estática
  pinta la máquina y el catálogo. La interacción es la capa de encima.
- **Un solo modo de fallo aceptable**: si algo falla, queda la ficha en HTML.

### 10.2 Cómo se define cada máquina

Misma idea que el emulador, render distinto: la definición de máquina alimenta
un generador de SVG por familia:

| Familia | Vista | Partes móviles |
|---|---|---|
| Bed-slinger (Ender, MK4S) | Frontal | Carro en X sobre el pórtico, cama deslizando, boquilla trazando |
| CoreXY cerrada (AD5X, P1S) | Frontal con puerta | Cabezal en X e Y, cama subiendo por husillos, husillos girando |
| CoreXY abierta (A1) | Frontal | Igual, sin cerramiento |
| Resina (Mars) | Lateral | Plataforma subiendo, capa curándose entera, sin boquilla |

### 10.1 Lo que se investigó en GitHub

| Proyecto | ★ | Qué es | Veredicto |
|---|---|---|---|
| `buserror/simreprap` | 39 | Emulador completo de una RepRap con firmware Marlin real | No es visual; **es la referencia de física** (motion planner real) |
| `spark3dp/print-simulator` | 33 | Impresora virtual para probar la API Forge de Autodesk | Emula una API, no una máquina |
| `rsamwilson…/3d-printer-gcode-simulat` | 5 | Simulador de G-code en Three.js | El mismo enfoque de cubos que se descartó |
| `iXce/Printator` | 9 | Puerto serie virtual para Printrun | Sin visual |
| `arielmiki/phyx3d` | 3 | Física de impresión (estabilidad) para Bambu | Física del proceso, no de la máquina |
| `ghzserg/zmod` | 454 | Mod para Adventurer 5M / **AD5X** | **No es simulador, pero contiene la configuración real de la máquina** |

**Conclusión: no existe un emulador de impresora real hecho.** Se construye el
nuestro, y de `zmod` salen los parámetros reales de la AD5X (su config Klipper):
`stepper_z rotation_distance 8` (husillo de 8 mm), `stepper_x/y rotation_distance
40` (correa con polea de 20 dientes), `position_max 225·232·230`, input shaper
`60,4 / 46,2 Hz`, boquilla 0,4 y 350 °C.

### 10.2 La arquitectura

```
definición de máquina (parámetros reales)  ──►  núcleo de física  ──►  escena
  travel, rotation_distance, lead,            cinemática real,          estructura
  velocidad, aceleración, shaper              estados acoplados          (biblioteca)
```

Tres piezas, ninguna de las cuales es "una caja":

1. **Definición de máquina**: los parámetros reales. De la definición salen
   *ambas* cosas: el movimiento y la estructura.
2. **Núcleo de física**: estado cinemático acoplado. El husillo gira lo que la
   cama sube (radianes = Z / paso × 2π), las poleas giran lo que la correa
   recorre, la cama se enrosca a los tornillos. Nada se anima "a mano".
3. **Biblioteca estructural**: extrusión con ranura, husillo con rosca
   helicoidal del paso real, polea dentada con bridas, panel con rejilla,
   ventilador con aspas, puerta de cristal con canto, cama con tuercas,
   cabezal con cubierta y disipador, hub IFS con sus tubos de color.

### 10.3 Lo que se hereda del prototipo 3D

- La **física acoplada**: la velocidad de animación sale de la ficha (500 vs
  250 mm/s se nota), el husillo gira lo que la cama sube (8 mm por vuelta), y
  con la cama a 3,4 mm el contador marca 0,43 vueltas, no un adorno.
- La **verificación con píxeles**: cada entrega se comprueba con capturas y
  conteos, no con el ojo (tres veces me engañó la miniatura comprimida).
- La **regla de oro nueva**: la comprobación se hace en el navegador que el
  propietario tiene delante, no sólo en el de fondo.
- El **formato de definición** (parámetros reales por máquina) y los datos de
  la AD5X que ya se verificaron contra su configuración Klipper.

### 10.4 Orden de construcción (2D)

1. **Ilustración por familia con silueta real**: bed-slinger, CoreXY cerrada,
   CoreXY abierta, resina. La AD5X es el primer modelo detallado.
2. **Animación desde la ficha**: cinemática, velocidad de la ficha, paso del
   husillo, capas, resultado (rizado en abierta + ABS/ASA).
3. **Selector de máquina y filamento** con los límites reales (boquilla, cámara).
4. **Degradación honesta**: sin JavaScript la animación corre igual (CSS); si
   el SVG no carga, queda la ficha. Sin WebGL ya no hay nada que perder.
5. **Verificación**: capturas + conteo de píxeles + comprobación en la ventana
   del propietario, no sólo en el navegador de fondo.
6. **G-code real** como fuente del recorrido (ya no del perímetro de prueba).

## 11. Lo que queda para quien construya

- El buncha exacta de la palanca: qué perfiles de filamento de marca entran
  primero (propuesta: Bambu Basic, Prusament, eSUN).
- Si la galería de la portada enseña miniaturas 3D o fichas con silueta SVG.
- El punto de corte visual del 3D: qué detalle mínimo hace reconocible una
  máquina (prueba local dirá).
