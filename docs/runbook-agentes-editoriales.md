# Runbook de los agentes editoriales

Este documento describe cómo se produce una guía y qué puede reclamar cada paso.
Los agentes viven en `.opencode/agents/` y se versionan con el repositorio.

## Principio

El pipeline no existe para escribir más rápido. Existe para que una afirmación
publicada se pueda rastrear hasta una fuente, y para que un error nacido en el
material intermedio no llegue al lector.

```
brief -> recolector -> wiki/raw/
                      -> cocinero -> wiki/cooked/
                                     -> redactor -> src/content/guias/<slug>.ts
                                                    -> revisor -> wiki/reviews/
```

`wiki/raw/` es inmutable. Los agentes pueden escribir en las demás capas, pero
ninguno puede modificar una fuente ya capturada.

## Antes de empezar: el brief

Sin brief no hay recolección. El brief se escribe en
`docs/briefs/<slug>.md` y contiene, como mínimo:

```markdown
Tema:
Pregunta que debe resolverse:
Decisión que debe permitir tomar:
Alcance (material, máquina, versión, idioma):
Exclusiones:
Fecha de la consulta:
Fecha de revisión (ISO) si se va a publicar:
Fuentes que ya existen:
Criterio de éxito:
```

La fecha de revisión se fija antes de redactar. No se pone la fecha del día
automáticamente: una guía sin cambios de fondo conserva su fecha anterior.

## Paso 1 · Recolector

**Entrada:** ruta del brief.

**Salida:** ficheros en `wiki/raw/`, una tabla de cobertura y los huecos.

**Qué se le exige:**

- comprobar que la página tiene cuerpo útil, no sólo un `200`;
- guardar la URL final y el texto literal;
- declarar fecha, vigencia y alcance de cada fuente;
- no usar agregadores de IA, resúmenes de vídeo ni listas de afiliados;
- devolver dos fuentes si sólo hay dos válidas, no inventar una tercera.

**Qué no puede hacer:** sintetizar, decidir qué es verdad, escribir la guía o
tocar una fuente existente.

## Paso 2 · Cocinero

**Entrada:** rutas del brief y de las fuentes crudas.

**Salida:** `wiki/cooked/<tema>.md`.

**Qué se le exige:**

- una afirmación por bloque, con ID `A-###`, cita, archivo, URL, localización,
  tipo, alcance, vigencia y confianza;
- separar hecho, observación de campo e inferencia;
- conservar las contradicciones con el alcance de cada versión;
- declarar los huecos que impiden escribir la guía;
- no resolver una contradicción por gusto.

**Qué no puede hacer:** buscar en internet, completar con conocimiento general,
borrar una afirmación incómoda o tocar `wiki/raw/`.

## Paso 3 · Redactor

**Entrada:** ruta del brief, del cooked y del registro de guías.

**Salida:** `src/content/guias/<archivo>.ts` y una línea en `src/lib/guias.ts`.

**Qué se le exige:**

- usar sólo el cooked, con trazas `// evidencia: A-###`;
- respetar las cuatro etapas y el contrato de `tipos.ts`;
- no inventar autoría, fechas, cifras, enlaces ni fuentes;
- ejecutar `npm run verify:guias`;
- devolver los huecos que no ha rellenado.

**Qué no puede hacer:** ir a internet, leer `wiki/raw/`, tocar el cooked o cambiar
componentes globales.

## Paso 4 · Revisor

**Entrada:** brief, guía, cooked y todas las fuentes crudas citadas.

**Salida:** `wiki/reviews/<slug>-<fecha>.md`.

**Qué se le exige:**

- comprobar cada afirmación técnica contra `wiki/raw/`, no sólo contra cooked;
- comprobar atribución, grado de certeza y contexto;
- comprobar enlaces, slugs y fecha de revisión;
- rechazar una guía genérica aunque sea toda cierta;
- no modificar la guía.

**Veredicto:** `APROBADO` sólo si pasan las seis comprobaciones. Dos iteraciones
como máximo; a la tercera, si siguen los mismos fallos, se cambia el brief o las
fuentes, no se vuelve a pedir lo mismo.

## Estratega, fuera del pipeline

`estratega` no publica. Convierte exports de Search Console y GA4 en briefs
priorizados. Si no hay export, puede proponer hipótesis, pero no puede presentar
volúmenes o CTR inventados.

Escribe en `docs/crecimiento/` y no toca `src/`, `wiki/` ni contenido.

## Cómo se lanzan

En una sesión de OpenCode:

```text
Usa el agente recolector con el brief docs/briefs/<slug>.md.
```

Después:

```text
Usa el agente cocinero con:
- brief: docs/briefs/<slug>.md
- fuentes: <rutas devueltas por el recolector>
```

Y así con los siguientes. Siempre se pasan rutas, no el historial de la
conversación.

Los agentes no fijan modelo: heredan el que esté seleccionado en la sesión. No
hay una dependencia de Gemini ni de un proveedor concreto.

## Permisos

Los agentes usan la sintaxis V2 de OpenCode: una lista ordenada de reglas
`{action, resource, effect}`. Gana la última regla que coincide.

| Agente | Puede escribir | Shell | Web |
|---|---|---|---|
| `recolector` | `wiki/raw/**` | no | sí |
| `cocinero` | `wiki/cooked/**` | no | no |
| `redactor` | `src/content/guias/**`, `src/lib/guias.ts` | sólo `npm run verify:guias` | no |
| `revisor` | `wiki/reviews/**` | no | no |
| `estratega` | `docs/crecimiento/**` | no | sí |

Los permisos de ruta no impiden reescribir un fichero dentro de la ruta permitida.
La inmutabilidad de una fuente ya escrita depende del prompt y de revisar
`git diff wiki/raw/` antes de publicar. No hay una regla de permisos que distinga
«crear» de «sobrescribir» dentro del mismo directorio.

## Comprobaciones antes de publicar

```bash
npm run lint
npm run build
npm run verify:contenido
npm run verify:dist
npm run verify:revision
git diff --check
git diff --stat wiki/raw/
```

`git diff --stat wiki/raw/` tiene que salir vacío. Si no sale vacío, alguien tocó
una fuente y no se publica hasta entender por qué.

## Qué no demuestra este pipeline

- No demuestra que AdSense vaya a aprobar el sitio.
- No demuestra que una página vaya a posicionar.
- No sustituye la revisión de una persona con acceso a la cuenta de AdSense,
  Search Console o GA4.
- No convierte una fuente secundaria en primaria.
- No arregla un brief mal planteado.

Una guía aprobada por el revisor es una guía con evidencia local comprobable, no
una garantía de resultado.
