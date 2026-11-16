# Medidas de la pieza y encaje en la impresora

**Estado:** pendiente de aprobación

## Qué se quiere y por qué

Hoy el informe de un STL dice cuántas caras y vértices tiene y si la malla está
cerrada, pero no dice **cuánto mide la pieza** ni **si cabe en la impresora de
quien la ha subido**. Son las dos preguntas que se hace cualquiera que va a
imprimir: lo primero que hace un laminador al recibir un archivo es mirar sus
dimensiones.

Las dos respuestas ya existen medio escondidas. El motor de malla devuelve
`dimX`, `dimY`, `dimZ`, superficie y volumen, y nadie los usa. Y la comparación
con el volumen de cama ya está escrita para el G-code, pero exige metadatos de
un archivo que un STL no tiene.

Esta fase las saca a la luz, sin cambiar lo que ya funciona.

## Objetivos

- Mostrar ancho, fondo y alto de la pieza en milímetros, con el eje del
  archivo (Z arriba, la convención de los laminadores).
- Decir con honestidad que un STL **no declara unidades** y que el sitio
  asume milímetros.
- Avisar cuando el tamaño hace sospechar que el archivo viene en pulgadas o
  mal escalado, dando la conversión.
- Decir si la pieza **cabe** en la impresora elegida, si cabe girada o si no
  cabe, y decirlo también cuando no se puede determinar.
- Compartir una sola selección de máquina entre el G-code y el STL.

## No objetivos

- No decidir orientación, soportes ni calidad de impresión.
- No recortar, reescalar ni modificar el archivo.
- No crear guías nuevas de la wiki: la guía de escala y encaje es un trabajo
  aparte, con su propio ciclo.
- No cubrir 3MF ni OBJ con dimensiones: el motor de malla no lee 3MF y el OBJ
  no tiene análisis. Queda anotado como extensión.

## Anti-objetivos

- No presentar el volumen de una malla abierta como si fuera el volumen real
  de material: solo se muestra si la malla está cerrada.
- No afirmar que la pieza «cabe» solo porque su caja bounding cabe: es una
  estimación y se dice.
- No enlazar a una guía que no trata del tema: hoy el aviso de «no cabe» del
  G-code apunta a `voladizos-y-soportes`, que no es lo suyo, y se corrige.

## Enfoques considerados

- **A. Medidas primero.** Añadir las dimensiones al bloque «Datos de la malla».
  Es un cambio pequeño, sin dependencias y con un dato que el visitante nota
  de inmediato.
- **B. A + encaje.** Lo anterior, más el selector de máquina aplicado a mallas.
  Exige extraer la comparación a una función pura y compartir el selector.
- **C. B + guías nuevas de escala y encaje.** El camino más completo y el más
  caro: cada guía exige el ciclo completo de la wiki.

**Elegido: A y después B**, con la guía como trabajo aparte. Motivo: son las
dos preguntas que el visitante se hace en el primer minuto, y el aviso de
«no cabe» necesita su guía antes que la función.

## Restricciones

- La lógica va en funciones puras fuera de React para poder verificarse en
  Node (`scripts/verify/maquinas.mjs`).
- El export estático renderiza en Node: nada de `window`, `localStorage` ni
  `Worker` durante el render. El acceso a `localStorage` va en `try/catch`, como
  ya hace `Preflight.tsx`.
- `wiki/raw/` es inmutable y no se toca. No se añaden campos a `CAMPOS_WIKI` ni
  a `CAMPOS` en esta fase.
- No se versionan `opencode.json` ni los directorios sin seguimiento de
  `public/wiki/`.
- El trabajo va en una rama propia y no se fusiona sin autorización.

## Cómo se construye

### 1. Las medidas, en el bloque que ya existe

El análisis de la malla ya trae `dimX`, `dimY` y `dimZ` en milímetros, y los
bordes de la caja. Se añaden al bloque «Datos de la malla»:

- **Ancho × fondo × alto**: los ejes del archivo, con Z arriba. El visor gira
  la malla al dibujarla, así que las medidas se leen del análisis, no de la caja
  en pantalla.
- **Volumen**: solo cuando la malla está cerrada. Con una abertura abierta el
  número no significa nada, y se dice en vez de mostrarlo.

Debajo va una nota fija: el STL no declara unidades y se asumen milímetros.

El aviso de escala sospechosa tiene **dos reglas**, porque hay dos fallos
opuestos y cada uno se corrige en un sentido:

- **Números demasiado pequeños** (mayor dimensión por debajo de 5 mm): una
  pieza así no es imprimible, y la explicación más probable es que el archivo
  venga en pulgadas. Si es así, el tamaño real es **25,4 veces mayor** que el
  que se ve.
- **Números demasiado grandes** (mayor dimensión por encima de 350 mm): superar
  la cama de casi todas las impresoras de la casa. Si el archivo está en
  pulgadas, el tamaño real sería **25,4 veces menor** que el que se ve.

Cada aviso da su conversión en el sentido correcto y dice que la web no puede
saberlo. Son hipótesis, no veredictos: ofrecen una explicación.

### 2. El encaje, como función pura

En `src/lib/maquinas.ts`, junto al resto de lógica de máquina, una función
`cabeEnLaMaquina(caja, maquina)` que compara una caja `[X, Y, Z]` en
**milímetros sin redondear** con `maquina.vol` y devuelve un veredicto con su
razón:

- **cabe**: la caja entra en la cama sin girar.
- **cabe girada**: entra si se gira 90° en cualquiera de los dos ejes, y se dice
  en qué orientación.
- **no cabe**: no entra en ninguna de las tres orientaciones.
- **no se puede determinar**: no hay máquina elegida, o la máquina no tiene
  volumen útil fichado (la de resina no lo tiene). La ausencia de un dato no
  es un cero.

La comparación es entre cajas envolventes: una pieza puede entrar en la cama
aunque su caja no, porque cabe en diagonal o porque el recorte real es menor.
El mensaje del sitio lo dice, para que nadie tome el veredicto por una
medición exacta.

**El G-code usa la misma comparación, pero sin giros.** Un G-code ya está
teselado en coordenadas de cama: girar la pieza es una decisión del laminador
que ocurre después, así que el aviso sigue siendo bloqueante y compara solo la
orientación tal cual, exactamente como hoy. Si la máquina no tiene volumen útil
fichado, el G-code **no dispara aviso**, igual que ahora: la ausencia de un
dato no es un cero.

### 3. Una sola máquina seleccionada

Hoy la máquina vive dentro de `Preflight.tsx` y se guarda en `localStorage`.
Para que el STL use la misma preferencia, esa lectura y escritura salen a un
hook (`useMaquinaSeleccionada`) que ambos componentes consumen: si se cambia
en un sitio, cambia en el otro, y se sigue persistiendo igual.

El selector se pinta en el informe del STL con el mismo aspecto y las mismas
opciones que el del G-code.

### 4. Lo que ve la persona

En el informe de un STL, después de «Datos de la malla», una sección **«En mi
impresora»** con el selector y el veredicto en una frase: «Cabe en la cama de
tu Prusa MK4S (250 × 210 × 220 mm)», «Cabe girada 90°», «No cabe: mide 300 ×
300 mm y la cama es 250 × 210 mm» o «Elige tu impresora para saber si cabe».

Si no hay máquina elegida, el texto pide elegirla; no se oculta la sección
ni se supone una impresora.

**De dónde salen las medidas y el veredicto.** Del análisis de la copia
reparada cuando existe, igual que el resto del bloque «Datos de la malla»: lo
que se imprime es la copia. Cuando el veredicto cambia al reparar —porque la
reparación quitó caras sueltas y la caja quedó distinta— se dice en una línea:
«tras reparar, la copia sí cabe; antes no».

**Si salta el aviso de escala, no hay veredicto de encaje.** Con los números
inflados, «no cabe» sería un verdad a medias, y se contradiría con el aviso.
En ese caso la sección dice que no se puede saber hasta resolver las unidades,
y el selector sigue ahí.

## Cómo se comprueba

- **Función pura** (`scripts/verify/maquinas.mjs`, en Node): cabe, cabe girada,
  no cabe, máquina sin volumen útil y máquina no elegida.
- **Interfaz** (`scripts/verify/reparacion-stl.mjs`, con navegador): las medidas
  aparecen con los valores de un STL conocido; el volumen solo se muestra con
  la malla cerrada; el aviso de escala salta con un archivo demasiado grande y
  con uno demasiado pequeño, y no salta con uno normal; cuando salta, la
  sección no da veredicto de encaje; los cuatro veredictos de encaje se ven; el
  selector persiste y se sincroniza entre el G-code y el STL.
- **Regresión**: el aviso de G-code sigue comparando igual que antes, con su
  redondeo actual (`Math.round` sobre las dimensiones de la trayectoria), sigue
  siendo bloqueante y ya no enlaza a la guía equivocada. La función pura
  redondea en el texto que muestra, nunca en la comparación: una pieza de
  250,4 mm en una cama de 250 mm no cabe.

## Riesgos, dichos antes de empezar

- **El umbral de 350 mm es una heurística.** Una pieza de 400 mm es posible en
  una impresora grande. Por eso el aviso ofrece una explicación y no un
  bloqueo.
- **Los umbrales son heurísticos y van en los dos sentidos.** 5 mm y 350 mm son
  órdenes de magnitud, no medidas. Un archivo de 4 mm puede ser una pieza
  diminuta de verdad, y uno de 360 mm puede venir en pulgadas.
- **Comparar cajas envolventes es conservador.** Dice «no cabe» en casos en
  que la pieza sí entraría. El mensaje lo explica.
- **El volumen de la malla cerrada puede no ser el volumen de material** si el
  modelo tiene cavidades internas. Por eso se rotula como volumen de la malla,
  no de material.
- **El 3MF queda fuera** y no hay una explicación para quien lo sube: es el
  límite conocido de esta fase.

## Lo que queda al constructor

- Los nombres exactos de los campos del veredicto y del texto de cada aviso.
- Si el aviso de escala se pinta junto a las medidas o como nota aparte.
- El aspecto del selector de máquina dentro del informe del STL, siguiendo el
  que ya existe en `Preflight.tsx`.
- El orden entre «Datos de la malla» y «En mi impresora» en pantallas estrechas.
