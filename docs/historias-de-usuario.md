# Historias de usuario — wiiki-3d

> **Estado: borrador con supuestos.** Este documento **no describe el producto**:
> lo que existe hoy es un analizador de un solo fichero. Describe lo que los
> módulos necesitarían para ser construidos, y cada afirmación que no está
> verificada va marcada. Los supuestos son **propuestas**, no decisiones, y cada
> uno dice explícitamente qué cambia si es falso.
>
> La sección que más importa es [Por qué dos de los cuatro módulos dependen de una
> decisión sin tomar](#por-qué-dos-de-los-cuatro-módulos-dependen-de-una-decisión-sin-tomar).
> No es una salvedad al final: es la restricción que decide el orden de trabajo.

---

## Qué es la app

**wiiki-3d es una herramienta para quien fabrica piezas con impresoras 3D en
casa y quiere saber si el laminado que ha elegido va a salir bien antes de
gastarse el filamento.** Sube un G-code exportado del slicer, y la app lee la
cabecera que el slicer escribió (material, temperaturas, altura de capa, tiempo,
gramos) y devuelve un diagnóstico de riesgo: nivel de riesgo, probabilidad de
warping, y si la pieza necesita soportes. Los formatos STL y 3MF se ven en un
visor 3D con órbita; los G-code no se renderizan todavía.

**Estado real de esa frase:** el analizador y el visor 3D existen y funcionan. El
diagnóstico de riesgo sale de una **heurística local** (ver ⚠️ S5). Los cuatro
items de navegación tienen ruta desde el enrutado (`/`, `/taller`, `/wiki`,
`/proyectos`), pero **tres de las cuatro pantallas están vacías**: cada una dice
qué módulo va a ser y que no está implementado. Este documento es sobre esos
cuatro módulos, no sobre lo que ya funciona.

---

## Los cuatro supuestos

Se usan en todo el documento. Cada historia affected indica cuáles la condicionan.

### ⚠️ SUPUESTO S1 — Sin backend. Todo vive en el navegador.

No hay API, no hay servidor, no hay base de datos. Lo único que la app tiene es
un fichero en memoria.

**Si es falso**, y hay una API, entonces H-3.2, H-3.3 y H-4.1 cambian por
completo (ver [Qué cambia si hay backend](#qué-cambia-si-hay-backend)) y
desaparece el límite de cuota que impone [S3](#-supuesto-s3--persistencia-en-indexeddb-no-en-localstorage).
También cambia el diseño de "Inicio" (H-3.1), que pasa de ser local a ser una
vista de datos remotos.

### ⚠️ SUPUESTO S2 — Sin cuentas.

No hay proveedor de identidad, ni registro, ni recuperación de contraseña. Que no
haya cuentas es un **supuesto**; que el botón "Iniciar Sesión" se retire es una
**decisión ya tomada**.

**Decidido:** el botón sale de la interfaz. No se deja deshabilitado, y el motivo
es de accesibilidad, no de gusto. Un botón deshabilitado no llega al orden de
tabulación, así que para quien navega con teclado sería indistinguible de que no
existe; mientras que para quien usa ratón seguiría pareciendo una acción que se
puede pulsar. Ninguna de las dos lecturas es buena. Si algún día hay cuentas, el
botón vuelve con el proveedor detrás.

**Si es falso**, y hay cuentas, aparece un requisito transversal que **ninguna de
las ocho historias de este documento contempla**: qué se puede hacer sin sesión, y
qué pasa con los datos de un usuario que cierra sesión. Eso no es un añadido
pequeño, es un cambio de modelo. Habría que reescribir el documento.

### ⚠️ SUPUESTO S3 — Persistencia en IndexedDB, no en `localStorage`.

Porque un G-code pesa entre 1 y 200 MB, y `localStorage` tiene ~5 MB de cuota.
IndexedDB da cuotas del orden de cientos de MB y las gestiona el navegador.

**Si fuera `localStorage`**, sólo se podrían guardar los **metadatos** del análisis
(unos cientos de bytes: material, gramos, horas), nunca el archivo. Y si fuera
IndexedDB y el límite real de cuota resultara ser más bajo de lo que esperamos,
H-4.1 necesitaría una política de purga que hoy no está diseñada.

Lo primero ya no es hipotético: guardar el análisis y no el archivo **es la
decisión P2**. La razón por la que se ha tomado es justamente esta: el archivo no
cabe, el análisis sí. La consecuencia —que un análisis guardado no se puede volver
a abrir en el visor— está escrita en H-4.1 y hay que enseñarla en la interfaz.

**Con S1 + S3 juntos**, los datos viven en la máquina del usuario: se pierden al
limpiar datos del navegador, no sobreviven a un cambio de dispositivo y no se
pueden compartir. Esto es asumible para un análisis de una pieza propia, y no lo
es para un taller.

### ⚠️ SUPUESTO S4 — El alcance realista son 2 módulos, no 4.

**Taller** (calculadora) y **Wiki 3D** (contenido estático) no necesitan
persistencia y se pueden construir con S1. **Proyectos** (biblioteca de archivos)
e **Inicio** (análisis recientes) dependen de S1 y S3, y con S1 cierto tienen un
límite de cuota que hay que decidir antes de prometerlos.

**Si S4 se acepta**, el enrutado tiene sentido ahora mismo —permite tener cuatro
pantallas vacías verificables y navegación real— pero **llenar los módulos no**.
Construir enrutado primero es trabajo que no se tira: es la condición para que
Taller y Wiki 3D existan, y es lo que arregla el bug de navegación por teclado
(los items son hoy `<li>` sin `tabindex`, sin `role` y sin `href`, así que no son
alcanzables con teclado).

### ⚠️ SUPUESTO S5 — El diagnóstico de riesgo es heurístico, no de un modelo.

**Nota de contexto, no un supuesto a decidir.** `JevService` tiene dos rutas: una
real contra un Worker de Cloudflare, y una heurística local que se activa con
`VITE_JEV_USE_MOCK=true`. **La que está activa en desarrollo es la heurística**
(está en `.env`). El propio código documenta que la ruta real nunca ha devolvido
un `200`: la cuenta de Jev está sin crédito.

Ninguna historia de este documento depende de que el diagnóstico sea de Jev o
heurístico, pero **el usuario final no debería leer una heurística local como si
fuera el veredicto de un modelo entrenado**, y eso es una decisión de producto que
no está tomada (ver [Preguntas abiertas](#preguntas-abiertas), P10).

---

## Inicio

> **Lectura de este módulo (supuesto):** la pantalla de subida que ya existe, más
> una lista de análisis recientes si S3 sale adelante. No es un panel de
> bienvenida ni un dashboard. Si "Inicio" fuera otra cosa, todo lo de abajo cambia.

⚠️ SUPUESTO S1 y S3 condicionan H-3.1 en adelante.

### H-3.1 · Como persona que vuelve a la app, quiero ver mis análisis recientes, para no tener que volver a subir el mismo archivo

**Criterios de aceptación**

- Al abrir la app, si hay análisis guardados, aparece una lista con al menos:
  nombre del archivo, fecha, material y nivel de riesgo.
- La lista ordena por fecha descendente.
- Pulsar una entrada vuelve a mostrar el análisis completo (los 9 campos de
  metadatos y el diagnóstico), **sin necesidad de volver a subir el archivo**.
- Si no hay nada guardado, la pantalla de subida ocupa el lugar entero, sin
  mensaje de error ni estado vacío con adornos.
- La lista es usable a 375 px de ancho: los nombres largos de archivo se rompen
  en varias líneas, no se recortan en silencio ni desbordan.

### H-3.2 · Como persona, quiero borrar un análisis de mi historial, para no acumular datos que ya no necesito

**Criterios de aceptación**

- Cada entrada de la lista tiene una acción de borrado.
- El borrado pide confirmación: el nombre del archivo y el hecho de que no se
  puede deshacer.
- Tras confirmar, la entrada desaparece de la lista y sus datos se borran del
  almacenamiento. No queda un registro fantasma.
- Si el borrado falla, la entrada sigue en la lista y se muestra un error. La
  interfaz no dice que se borró algo que sigue ahí.

### H-3.3 · Como persona, quiero vaciar todo el historial de una vez, para no tener que ir borrando uno a uno

**Criterios de aceptación**

- Hay una acción de "vaciar todo", distinta del borrado individual y más difícil
  de pulsar por accidente.
- Pide confirmación explícita que dice **cuántos** análisis se van a borrar.
- Después de vaciar, la app vuelve al estado de primera vez: pantalla de subida,
  historial vacío.
- El borrado de datos es una operación local, así que **no necesita confirmación
  de red** y funciona sin conexión.

---

## Taller

> **Lectura de este módulo (supuesto):** calculadora de coste y tiempo a partir de
> los metadatos que el parser ya extrae —material, gramos, horas—, para responder
> "¿cuánto me cuesta esta pieza?". Sin persistencia, sin backend, sin cuentas.
> **Es el único módulo cuyo alcance se puede escribir hoy con los datos que ya
> tenemos.**
>
> Si "Taller" fuera un editor de perfiles de laminado o un comparador de
> slicers, esto no aplica.

⚠️ Ningún supuesto lo bloquea. Es el módulo con menor incertidumbre.

### H-2.1 · Como persona que imprime mucho, quiero calcular cuánto me cuesta una pieza, para decidir si merece la pena imprimirla

**Criterios de aceptación**

- Dados los metadatos de un análisis (material, gramos, tiempo, peso total),
  la calculadora devuelve un coste en euros.
- **El precio por gramo del filamento es un dato que mete la persona**, no uno
  que la app conoce: el parser no extrae precios y no hay backend (S1).
- Si falta el precio del material, la calculadora lo dice y no devuelve un
  número inventado. Es la misma regla que ya aplica `JevService`: **ante la
  duda, falla; nunca rellena**.
- Si faltan los gramos o el tiempo del G-code, ocurre lo mismo.
- El resultado indica de dónde sale cada número: se ven los gramos, el precio por
  gramo y el coste calculado.

### H-2.2 · Como persona, quiero ver el coste desglosado, para entender qué parte es material y qué parte es máquina

**Criterios de aceptación**

- El coste se separa en coste de filamento y coste de máquina.
- El de filamento sale de gramos × precio. El de máquina requiere la potencia y
  el precio de la energía, que son **datos de configuración de la persona**, no
  del G-code.
- Con sólo los datos del G-code, se puede calcular el coste de filamento. El de
  máquina necesita configuración que la app no tiene.

**Nota de alcance:** el reparto entre filamento y máquina es una decisión de
producto pendiente (ver P4). Puede que la app no deba calcularlo y basarse con
mostrar el coste de material.

---

## Wiki 3D

> **Lectura de este módulo (supuesto):** contenido propio dentro de la app, en
> Markdown, versionado con el código. Si "Wiki 3D" fuera una wiki externa, esto no
> es un módulo sino un conjunto de enlaces, y la decisión de producto sería si
> abrir enlaces externos o no.

⚠️ SUPUESTO S1 lo condiciona: sin backend, el contenido es un fichero en el
repositorio, no algo que se pueda editar desde la app.

### H-1.1 · Como persona que está aprendiendo a imprimir, quiero leer guías dentro de la app, para no tener que salir a buscar

**Criterios de aceptación**

- Hay un índice navegable de artículos.
- Cada artículo se puede leer sin conexión (S1: el contenido va en el bundle).
- La lectura es usable a 375 px, que es donde se va a leer la mayoría de las
  veces.
- **No hay editor.** El contenido es de sólo lectura. Esto es consecuencia de S1,
  no una decisión de producto tomada.
- El contenido se renderiza desde Markdown, no desde HTML arbitrario: no hay
  superficie de inyección.

### H-1.2 · Como persona, quiero buscar entre los artículos, para encontrar algo concreto sin recorrerlos todos

**Criterios de aceptación**

- Hay un campo de búsqueda en el índice.
- La búsqueda cubre título y cuerpo del artículo.
- Funciona sin conexión.

**Nota de alcance:** la búsqueda sobre el contenido del bundle implica un índice.
Con pocos artículos, un `includes()` sobre un array en memoria basta; con
muchos, no. **No está decidido cuál**, y depende de cuántos artículos haya
(ver P3).

---

## Proyectos

> **Lectura de este módulo (supuesto):** biblioteca de los análisis ya hechos,
> consultables sin volver a subir el archivo. Depende de S1 y S3. Con P2 resuelto
> —se guarda el análisis, no el archivo— deja de ser el módulo con más
> incertidumbre de los cuatro: la cuota ya no es su punto de bloqueo.

⚠️ SUPUESTO S1 + S3 condicionan toda esta sección.

### H-4.1 · Como persona, quiero guardar un análisis, para volver a consultarlo sin volver a subir el archivo

**Criterios de aceptación**

- Un análisis se puede guardar. Se guarda **el análisis, no el archivo** (P2).
- Al volver a él, se ve el mismo análisis: material, gramos, horas y el
  diagnóstico. No hace falta el archivo para eso.
- Los proyectos se listan y se pueden borrar.
- **El espacio ocupado por los proyectos es visible**: cuánto usa y cuánto
  queda.
- Al llegar a un umbral de cuota, la interfaz dice cuál es el límite **antes** de
  fallar, no después.

**Lo que este criterio no resuelve:** nada de cuota. P1 está resuelta y medida: un
análisis ocupa entre 397 y 651 B, así que en el `localStorage` más pequeño que se
ha medido caben 8 053 ([el método](#el-tamaño-real-de-un-análisis)). El aviso de
umbral sigue teniendo sentido, porque es una precaución honesta, pero ya no es el
criterio que bloquea el módulo.

**Lo que este criterio no puede dar, y hay que decirlo en la interfaz:** sin el
archivo no se puede volver a abrir en el visor 3D ni volver a analizar. El
formato del archivo y su nombre sí se guardan, para poder describir el análisis,
pero no su contenido. Si esa limitación molesta, es la señal de que P2 debe
reabrirse.

---

## Fuera de alcance

Explícitamente. No es que se haga más tarde: es que no se hace.

- **Renderizado de G-code en 3D.** El aviso del canvas dice que no está
  disponible. Interpretar un G-code como malla es un proyecto aparte, con su
  investigación.
- **Soporte de `.obj` en el visor.** El parser acepta el formato y el visor no.
  Hoy sale un aviso lo dice explícitamente.
- **Edición de contenido de la Wiki 3D desde la app.** Consecuencia de S1.
- **Multi-usuario, compartir proyectos, colaboración.** Con S2 no hay cuentas; con
  S1 no hay servidor. Las dos cosas caen a la vez.
- **Exportar el informe.** Ni PDF, ni CSV, ni imagen. No está pedido en ningún
  sitio.
- **Comparar dos laminados.** H-2.1 calcula el coste de una pieza; no
  hay comparación entre dos configuraciones.
- **Historial de cambios de un mismo G-code.** Cada análisis es independiente.
- **Integración real con Jev.** Depende de que la cuenta de Jev tenga crédito. Ver
  S5.

---

## Preguntas abiertas

Cada una bloquea algo concreto. Las marcadas **RESUELTA** ya no bloquean: están
aquí con su respuesta, para que se vea qué se decidió y con qué datos.

**Estado:** once preguntas, tres resueltas —P1, P2 y la parte de P6 que decía si
"Inicio" es la pantalla de subida—. Quedan **ocho** por responder.

### Bloqueantes

**P1 · ¿Cuánto espacio hay en `localStorage` e IndexedDB en la práctica, y
cuántos análisis caben? — RESUELTA. La cuota no es una restricción.**

Medido, no estimado. El método, para que el número sea repetible, está en
[El tamaño real de un análisis](#el-tamaño-real-de-un-análisis). La cifra:

| Criterio | Valor |
|---|---|
| Tamaño de un análisis | **397–651 B** (JSON UTF-8) |
| Peor caso con 20 000 análisis | **12,42 MB** |
| En `localStorage` de 5 MB, la cota más baja medida | **8 053 análisis** |
| En IndexedDB de 100 MB, cota conservadora | **161 071 análisis** |
| Respecto al G-code | el análisis es el **0,20 %** del archivo |

**La pregunta dejó de ser bloqueante.** Cuando P1 era relevante —guardando el
archivo— los G-code reales iban de 200 KB a 200 MB y la cuota era el muro. Con P2
resuelto el único dato que se guarda es el análisis, y 651 B no son un problema de
espacio en ningún almacenamiento de navegador.

**Lo que queda no es una cifra que medir, sino una promesa que cumplir.** Con P2
resuelto, el único límite real de "Proyectos" es que un análisis guardado **no se
puede volver a abrir en el visor 3D**: sin el archivo no hay malla que mostrar ni
G-code que volver a analizar. Eso es de producto —qué se le promete a quien
guarda— y no de almacenamiento. Si algún día se quiere guardar también el
archivo, P1 vuelve a ser relevante con el archivo de vuelta en la ecuación, y con
él una política de purga que hoy no está diseñada.

**P2 · ¿Debe Proyectos guardar el archivo o sólo el análisis? — RESUELTA.
Sólo el análisis.**

Decidido en producto, y medido: un análisis ocupa entre 397 y 651 B
([el método](#el-tamaño-real-de-un-análisis)), así que la cuota deja de ser el
problema central de este módulo y P1 deja de bloquearlo entero.

Lo que **no** se resuelve con esto, y hay que decirlo claro: un análisis guardado
sin su archivo **no se puede volver a abrir en el visor 3D**. H-4.1 lo tenía como
criterio de aceptación, y ese criterio se ha retirado. Ese límite es de producto,
no de almacenamiento.

**P3 · ¿Cuántos artículos va a tener la Wiki 3D y quién los escribe?** Si son
veinte y los escribe quien mantiene el repo, basta un array en memoria. Si son
cientos y hay varias personas, hace falta un índice de búsqueda de verdad.

### De alcance

**P4 · ¿Cómo se desglosa el coste en la calculadora?** Sólo material, o material
+ máquina. Si el desglose necesita potencia y precio de la energía, hay que
decidir si la app se los pide a la persona.

**P5 · ¿Cuál es el primero de los cuatro?** Con S4, la respuesta natural es
Taller (no bloqueado) o Taller y Wiki 3D. El orden sale de la respuesta, no al
revés.

**P6 · ¿"Inicio" es la pantalla de subida con historial, o es otra cosa? —
RESUELTA en parte: la raíz `/` es la pantalla de subida.**

Decidido por condicionamiento técnico, no por preferencia: los cuatro scripts de
`scripts/verify/` cargan ficheros sobre la raíz en 29 viewports y tres estados, y
mover la subida a otra ruta los rompería.

Lo que **no** se decide con esto es dónde vive el historial de H-3.1. Si "Inicio"
es la subida **más** su historial, Inicio y Proyectos se distinguen porque uno
muestra lo reciente y el otro, lo guardado. Si el historial va sólo en Proyectos,
Inicio se queda en una pantalla de subida con cuatro módulos de navegación y poco
más. Esa parte sigue abierta.

### De identidad

**P7 · ¿Qué hace "Iniciar Sesión"? — RESUELTA. Se retira el botón.**

Decidido en producto, junto con S2: el botón sale de la interfaz. El motivo está
en S2 y es de accesibilidad, no de gusto.

Lo que **sigue sin decidirse** es si habrá cuentas algún día (P9). Si las hay,
esta pregunta vuelve a abrirse con contenido nuevo: ¿guardar proyectos en la
nube? ¿identidad entre dispositivos? Hoy no se puede contestar porque no hay
proveedor de identidad elegido.

**P8 · ¿Puede usarse la app sin sesión, y qué se pierde?** Necesario para
escribir los criterios de aceptación de cualquier historia que toque datos
persistentes.

**P9 · ¿Es multi-usuario?** Si sí, S1 y S2 caen los dos, y este documento hay que
reescribirlo entero.

### De lo que ya funciona

**P10 · ¿Se cambia algo de lo actual antes de añadir nada?** Los formatos
soportados, el visor de G-code no implementado, y la ruta real de Jev (S5) son
decisiones abiertas.

**P11 · ¿Se puede tocar `JevService.ts`?** Está marcado como cerrado. Entender
su contrato hace falta para el módulo de Taller (H-2.1), que consume sus
metadatos.

---

## El tamaño real de un análisis

La medición que responde [P1](#preguntas-abiertas). Va aquí, y no dentro de la
pregunta, porque es un dato que se puede repetir.

### El número

Con los datos del fixture real del repo —
`test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode` — pasado por `parseGcode` y
por `classifyWithJev`:

| Objeto | Bytes |
|---|---|
| `metadata` (`ProjectMetadata`) | 192 |
| `classification` (`JevClassification`) | 174 |
| Los dos juntos | **397** |

Y el rango, que es lo que hace que la cifra signifique algo. Un solo G-code da un
solo número, y ese número no generaliza. Dos cabeceras sintéticas en el formato
`; clave = valor` de la familia Prusa/Orca —el único que el parser acepta—
pasadas por el mismo parser y el mismo clasificador:

| Caso | Bytes |
|---|---|
| Fixture real | **397** |
| Mínimo sintético: sólo las dos claves obligatorias, nombre corto | 469 |
| Máximo sintético: todas las claves del parser, nombre de 118 caracteres | **651** |

**El rango es 397–651 B, y la variación entre el peor y el mejor caso es de 1,64
veces.** El mínimo lo da el fixture, no la cabecera sintética: su nombre de archivo
y su cadena de material son más cortos que los del caso mínimo a propósito. Lo que
más pesa en el peor caso no son los números, sino el nombre del archivo y la cadena
del material.

### Por qué el tamaño no depende del archivo

El análisis sale de la cabecera que escribió el slicer, no del contenido. Un G-code
de 197 KB y uno de 200 MB dan un análisis del mismo tamaño. **El tamaño del archivo
no entra en la cuenta.**

### Cuántos caben

Calculado con el **peor** caso, 651 B. Si el módulo aguanta con el peor caso,
aguanta siempre.

| Almacenamiento | Análisis |
|---|---|
| `localStorage`, 5 MB, la cota más baja medida | **8 053** |
| `localStorage`, 10 MB, Chrome y Firefox actuales | 16 107 |
| IndexedDB, 100 MB, cota conservadora | 161 071 |
| IndexedDB, 1 GB | 1 649 373 |

Y las dos referencias que lo enmarcan:

- El análisis es el **0,20 %** del tamaño del G-code del fixture: 498 veces más
  pequeño.
- 20 000 análisis ocupan **12,42 MB** en el peor caso.

**Conclusión: la cuota no es una restricción.** Incluso en el `localStorage` más
pequeño que se ha medido caben más de 8 000 análisis, y el caso de uso de la app
es el de una persona que analiza sus propias piezas.

### Cómo se midió, para que se pueda repetir

- El parser y el clasificador se empaquetaron con **rolldown**, que es lo que usa
  Vite 8, desde los ficheros reales del proyecto. No se copiaron a mano: una copia
  escrita a mano mediría la copia, no el código que corre en producción.
- `import.meta.env` se sustituyó por los valores leídos del `.env` del repo, que
  es exactamente la sustitución que hace Vite al construir. El script se niega a
  seguir si queda un solo `import.meta.env` sin sustituir.
- La ruta simulada es la que hay activa en `.env`, `VITE_JEV_USE_MOCK=true`, así
  que la clasificación medida es la de `mockClassify`, la heurística local. Con la
  ruta real el texto de la recomendación sería el de Jev, y el tamaño del análisis
  sería el mismo orden, porque depende de la longitud de una frase.
- `src/services/` **no se ha modificado**. Es una transformación de tiempo de
  compilación sobre una copia, como la que hace Vite.

### Lo que esta medición no dice

No dice cuánto crece una biblioteca de análisis con el tiempo, ni qué pasa cuando
la persona guarda cientos. Eso no es una pregunta de bytes: es de diseño de
interfaz, qué se lista, cómo se ordena y cómo se borra. Son las historias H-3.2 y
H-3.3, y no dependen de esta cifra.

---

## Por qué dos de los cuatro módulos dependen de una decisión sin tomar

Esta es la restricción que decide el orden de trabajo, y conviene tenerla delante
antes de elegir módulo.

> **Actualizado con P1 y P2.** La aritmética de abajo está escrita para el caso
> peor —guardar el archivo— y ése ya no es el caso. Un análisis son 397–651 B
> ([medido](#el-tamaño-real-de-un-análisis)), así que **la cuota deja de ser el
> muro**. Lo que queda en pie son las otras dos condiciones: los datos se pierden
> al limpiar el navegador, y no sobreviven a un cambio de dispositivo.

**La aritmética, para guardar el archivo.** Un G-code pesa entre 200 KB y 200 MB.
El fixture del repo —un G-code real de Creality Print, una medalla— pesa **197
KB**, y un G-code laminado de verdad lleva escenas de 700 KB y moves de miles de
millones de líneas. `localStorage` tiene ~5 MB de cuota **compartidos por todo el
origen**, así que caben entre 20 y 25 archivos como el del fixture, y ninguno
grande.

IndexedDB sí tiene cuotas del orden de cientos de MB. Pero:

- La cuota depende del navegador y del espacio en disco. **No hay una cifra que
  pueda ponerse en la interfaz sin medirla en el dispositivo del usuario.**
- Los datos se pierden al limpiar datos del navegador. Una biblioteca de
  proyectos que el usuario borra sin querer, y que no está en ningún servidor, no
  es una biblioteca: es una caché que el usuario no sabe que tiene.
- No sobrevive a un cambio de dispositivo ni a un navegador distinto.

**Y con P1 y P2 resueltos.** Guardar el análisis en vez del archivo baja el coste
de cada entrada de cientos de megabytes a 397–651 B, y con eso cae la primera de
las tres condiciones. Quedan dos, y **ninguna depende del tamaño**: los datos se
siguen perdiendo al limpiar el navegador, y no sobreviven a un cambio de
dispositivo. El número está medido en
[El tamaño real de un análisis](#el-tamaño-real-de-un-análisis).

**Qué significa esto.** Inicio (H-3.1 a H-3.3) y Proyectos (H-4.1) son módulos de
almacenamiento local. Si el usuario pierde los datos, ha perdido el módulo
entero. Para una herramienta de análisis de una pieza propia, eso es aceptable.
Para un taller que lleva tres años de laminados, no.

Lo que cambia con P2 es **para qué se puede usar** lo guardado. Sin el archivo, un
análisis guardado sirve para consultarlo y compararlo, pero no para volver a
abrirlo en el visor ni volver a analizarlo. Es una biblioteca de resultados, no de
piezas.

**Y por eso la única ayuda es dejar de decidir esto por código.** Si mañana hay
una API (S1 falso), la sección [Qué cambia si hay backend](#qué-cambia-si-hay-backend)
aplica tal cual y el problema desaparece. Si no la hay, la decisión correcta
probablemente es no construir H-3.1 a H-3.3 ni H-4.1, y criar sólo Taller y Wiki
3D, que funcionan sin persistencia.

---

## Qué cambia si hay backend

Por si aparece una API. El objetivo es que añadirla no obligue a reescribir este
documento, sólo a reemplazar las historias afectadas.

### Qué se resuelve solo

- **P1 (cuota).** Ya está resuelta, así que aquí no se resuelve nada: el límite
  simplemente deja de ser el del navegador y pasa a ser el del servidor. Los
  criterios de H-4.1 sobre espacio usado y umbral siguen aplicando, pero por
  otra razón, y se sustituyen por los de permisos.
- **H-3.2 y H-3.3 (borrado).** Necesitan confirmación de red y manejo de error
  de red. Si el borrado falla en el servidor, la entrada **no** debe desaparecer
  de la lista.
- **H-2.1 (precio del filamento).** El precio puede venir del servidor, con su
  fecha, en vez de teclearlo cada vez. H-2.1 no cambia de propósito: cambian sus
  criterios de aceptación.

### Qué cambia de forma sustancial

**H-3.1 · Inicio pasa a ser una vista remota.** "Mis análisis recientes" ya no
salen del navegador, sino de una consulta. Los estados que hay que diseñar son
distintos: carga, error de red, y sesión caducada. **El estado de sesión
caducada no existe hoy en ninguna historia, y con S2 falso es imprescindible.**

**H-4.1 · Proyectos se vuelve compartible.** La historia "borrar" pasa
de ser local a necesitar permisos. Aparece una pregunta que hoy no existe: si un
proyecto se puede compartir con otra persona, ¿quién puede borrarlo? Eso ya es
multi-usuario, que es P9.

### Qué no cambia

- **Wiki 3D.** Sigue siendo contenido estático. Un backend no mejora unos
  artículos que se leen.
- **Taller.** Sigue sin necesitar identidad. Con o sin backend, es una
  calculadora sobre datos que ya tenemos.

### Y qué hay que decidir antes

Con S1 falso, **S2 también cae**: una API sin cuentas no tiene proprietors, y
entonces cualquiera puede ver los proyectos de cualquiera. Eso es una decisión de
seguridad que no se puede tomar por omisión. Hay que elegir entre cuentas, o un
modelo de "un usuario por instalación" donde el servidor no sabe quién eres.

---

## Lo que este documento no sabe

Si algo de aquí se lee como un hecho y no lo es, es porque está marcado con ⚠️ y
tiene su supuesto con su "qué cambia si es falso". **Si ves algo que parece un
hecho y no lleva marca, es un error de este documento**: no hay nada verificado
aquí que no venga de leer el código.

Lo único verificado contra el código es:

- Los metadatos que extrae el parser: material, temperatura hotend y cama, altura
  de capa, tiempo, gramos, peso, voladijos y ángulo. Nueve campos.
- Las rutas de `JevService`: real contra un Worker, y heurística local con
  `VITE_JEV_USE_MOCK`. La activa en desarrollo es la segunda.
- Que el fixture del repo es un Creality Print real con cabecera completa.
- Que el tamaño del G-code del fixture es 197 KB.
- Que un análisis serializado ocupa entre 397 y 651 B, y que en el `localStorage`
  más pequeño medido caben 8 053. El método, con el empaquetado y la sustitución
  de `import.meta.env`, está en
  [El tamaño real de un análisis](#el-tamaño-real-de-un-análisis).
- Que los cuatro items de navegación eran `<li>` sin ruta, sin `role` y sin
  `tabindex`, y que desde el enrutado son `<a href>` con `aria-current="page"` en
  el de la ruta activa. Medido con `npm run verify:rutas`, que además comprueba
  que los cuatro son alcanzables con Tab y navegables con Enter.

**Preguntas resueltas desde la última versión:** P1 (la cuota no es una
restricción, medido), P2 (Proyectos guarda el análisis, no el archivo), P7 (el
botón "Iniciar Sesión" se retira) y la parte de P6 que decía si "Inicio" es la
pantalla de subida — lo es, la raíz `/`. P6 sigue abierta en lo que queda: dónde
vive el historial de H-3.1.