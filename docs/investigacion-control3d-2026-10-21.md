# Control3D y César Galera: qué aporta y qué nos falta

**Fecha:** 21 de octubre de 2026
**Motivo:** una pregunta del autor del proyecto: «¿puede ser útil para el
contenido?».

## Quién es

**César Galera**, arquitecto (nacido en 1992 en Madrid). Abrió su canal de YouTube en
julio de 2017 y de ahí salió **Control3D**, una academia online de impresión 3D y
diseño 3D: cursos de impresión 3D, Klipper, Marlin, resina, postprocesado y Fusion
360, directos semanales y +17.000 alumnos. El equipo es pequeño: Laura (project
manager), Nayra (tutora), Dani (técnico), Álvaro (editor) y Aries (personas).

## Lo que hace bien, y por qué nos interesa

Su método declarado es, textualmente, «**te enseñaré a que seas capaz de identificar
cualquier problema en tu máquina**».

Eso es exactamente lo que hace la etapa 1 de una guía de wiiki-3d —el diferencial,
con sus comprobaciones y su salida— y exactamente lo que justificaba el orden
`diferencial → variables → conocimiento → reglas` que fijó la spec de contenido. No
copiamos su método: **lo validamos**. Una validación externa vale, y es lo que hay
que dejar escrito cuando se decide algo así.

## Los siete tests de calibración

Es el artículo más útil para nosotros: «Cómo calibrar una impresora 3D: los 7 tests
imprescindibles» (24-07-2026). El orden que recomienda es:

1. Temperatura
2. Flujo
3. Pressure Advance
4. Velocidad volumétrica máxima
5. Retracciones
6. Tolerancias
7. Voladizos y puentes

y una pieza final de comprobación.

## El análisis de huecos, test por test

| Test de César | ¿Lo tenemos? | Dónde |
|---|---|---|
| 1 · Torre de temperatura | ✅ | `torre-temperatura` (guía entera, con el esquema de la torre) |
| 2 · Flujo | ✅ | `flow-rate` |
| 3 · Pressure Advance | ⚠️ dentro de `flow-rate`, sin guía propia | `flow-rate` lo tiene como variable y como acción; no es un tema por sí solo |
| 4 · Velocidad volumétrica máxima | ✅ | `max-volumetric-speed` |
| 5 · Retracciones | ✅ | `stringing` |
| 6 · Tolerancias | ✅ | `tolerancias-y-encaje`, `agujeros-ovalados` |
| 7 · Voladizos y puentes | ✅ | `voladizos-y-soportes` |
| Pieza final de comprobación | ❌ | no existe |

### El hueco real no es un test: es la entrada por la puerta de atrás

wiiki-3d está organizado **por síntoma**: «las esquinas se levantan», «la base no se
pega». Quien tiene un síntoma encuentra su guía. Pero quien **no tiene un síntoma** y
quiere una impresora bien calibrada —o quiere recalibrar porque ha cambiado de
bobina— no tiene dónde empezar: el índice son treinta problemas cubiertos, y su
problema es que no hay ninguno.

Y los siete tests de César son, uno a uno, **nuestras guías**:

    temperatura  →  torre-temperatura
    flujo        →  flow-rate
    caudal       →  max-volumetric-speed
    retracciones →  stringing
    tolerancias  →  tolerancias-y-encaje
    voladizos    →  voladizos-y-soportes

Lo que falta es **el orden y la puerta**. Es exactamente el tipo de guía que la
arquitectura del wiki puede hacer bien y que un foro no: una guía que no diagnostica
un síntoma sino que **enruta** a las que sí lo hacen, y que explica por qué ese orden
—que es lo que casi nadie dice—.

## Lo que nos regala, y con qué reservas

**Los modelos de test, gratuitos y con licencia de reimpresión:** test de
retracciones, de tolerancias, de velocidad, de voladizos y Cali Nozzle, en Printables
y MakerWorld. Son un regalo real para quien lee la wiki: puede imprimir la pieza que
comprueba lo que la guía le dice.

**La advertencia de las calibraciones automáticas**: que una calibración automática
puede variar entre trabajos, y que un perfil calibrado a mano es una referencia con
la que comparar. Esa idea —**tener un valor con el que comparar, no un ajuste que
se aplica a ciegas**— es la que sostiene el `alcance` de nuestras reglas.

**Las reservas, que son las del wiki y no las de él:**

- El **orden** de los siete tests y los **intervalos** que recomienda (0,2 mm al
  retroceder la retracción; 2 mm en extrusión directa y 6–7 mm en Bowden) son **el
  método de un autor**, no un dato de fabricante. Si se usan, van marcados como lo
  que son: una fuente única, sin corroborar. En el wiki eso es `## Sin respaldo`.
- Lo que sí tenemos con respaldo de fabricante es lo demás: el EM de Prusa, los
ajustes de Orca y las calibraciones de Bambu, que ya están en `wiki/raw/`.
- Su artículo es de una academia **comercial**: es una fuente legítima si se cita
  con su URL y su autor, y no lo es si se copia su contenido. Las cifras que
  tomemos, tienen que estar también en la documentación del fabricante.

## Qué se decide hacer

1. **Una guía «ruta de calibración»** que enrute a las siete que ya existen y
   explique el orden. Se escribe desde `wiki/raw/`, como cualquier otra: el
   Control3D entra como **una** fuente más, y las cifras de fabricante, de las que
   ya tenemos.
2. **Los modelos de test enlazados** desde esa guía, con la licencia de cada uno
   dicha.
3. **Pressure Advance** deja de estar escondido dentro de `flow-rate` y sale con
   su propia guía, si el material cocinado lo sostiene.
4. La **pieza final de comprobación** entra como el paso 8 del recorrido, que es lo
   que hace que los siete tests sirvan de algo.

Nada de esto se escribe copiando: entra por el pipeline de siempre —`recolector`,
`cocinero`, `redactor`, `revisor`— y con las mismas reglas que las demás guías.
