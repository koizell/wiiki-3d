# Medidas y encaje en la impresora: plan de implementación

> **Para agentes:** REQUIRED SUB-SKILL: usar `subagent-driven-development` (recomendado) o `executing-plans`. Los pasos usan casillas `- [ ]`.

**Goal:** El informe STL dice cuánto mide la pieza, avisa si la escala parece equivocada y dice si cabe en la impresora elegida.

**Architecture:** Una función pura en `src/lib/maquinas.ts` decide el encaje y la comparten el aviso de G-code y el informe de malla. Un hook compartido guarda la máquina seleccionada. La interfaz STL lee las medidas del análisis que ya devuelve el motor.

**Tech Stack:** React, TypeScript, Playwright (verificadores existentes).

**Spec:** `docs/superpowers/specs/2026-11-15-medidas-y-encaje-design.md`.

## Global Constraints

- Trabajar en una rama nueva `feat/medidas-y-encaje` creada desde `main`; no fusionar ni publicar sin autorización.
- No tocar `wiki/raw/`, `opencode.json` ni los directorios `public/wiki/` sin seguimiento.
- Lógica de encaje y de escala en funciones puras verificables en Node; nada de `window`, `localStorage` ni `Worker` en render estático.
- El aviso de G-code conserva su comportamiento: bloqueante, sin giros, y sin aviso si la máquina no tiene volumen conocido.
- Sin guías nuevas en esta fase; quitar el enlace a `voladizos-y-soportes` del aviso de G-code.
- Las comparaciones van en milímetros sin redondear; el redondeo es solo de presentación.

## Review Focus

- Pieza de 250,4 mm en cama de 250 mm: no cabe (comparación sin redondear).
- Máquina sin volumen conocido (resina, `vol: null`): «no se puede determinar», nunca «cabe» ni «no cabe».
- Pieza de 8 mm (posible pulgadas): aviso de escala y **ningún** veredicto de encaje contradictorio.
- STL sano sin máquina elegida: selector visible y ninguna afirmación de encaje.
- Cambio de archivo: el veredicto y las medidas son los del archivo nuevo, nunca los del anterior.

---

### Task 1: Función pura de encaje

**Files:**
- Modify: `src/lib/maquinas.ts`
- Modify: `src/lib/preflight.ts` (aviso `area-maquina`, líneas ~234-248)
- Test: `scripts/verify/maquinas.mjs`

**Interfaces:**
- Produces: `export type Encaje = 'cabe' | 'cabe-girada' | 'no-cabe' | 'indeterminado';`
- Produces: `export function cabeEnLaMaquina(caja: [number, number, number], maquina: Maquina | null, opciones?: { permitirGiro?: boolean }): { estado: Encaje; orientacion?: 'xyz' | 'yxz' | 'xzy' }`
  - `caja` en mm (X ancho, Y fondo, Z alto) sin redondear.
  - `maquina` `null` o con `vol: null` → `{ estado: 'indeterminado' }`.
  - `permitirGiro` por defecto `true`: con giro, prueba las tres orientaciones (`xyz`, `yxz`, `xzy`) y devuelve la primera que cabe, con `orientacion`; sin giro, compara solo `xyz` y devuelve `orientacion: 'xyz'`.
  - Una dimensión cabe si es `<=` que la de la cama, con los valores crudos.

- [ ] **Step 1: Escribir las pruebas que fallan** en `scripts/verify/maquinas.mjs`: `cabe` exacta, `cabe-girada` (pieza 300×100×100 en cama 250×250×250 → no cabe en `xyz` pero sí girada), `no-cabe`, `indeterminado` con máquina `null` y con `vol: null`, y el borde de 250,4 mm en cama de 250 mm → `no-cabe`.
- [ ] **Step 2: Ejecutar y ver el fallo**: `npm run verify:maquinas` → falla por `cabeEnLaMaquina` no definida.
- [ ] **Step 3: Implementar** `cabeEnLaMaquina` y el tipo `Encaje` en `src/lib/maquinas.ts` con la firma exacta de arriba.
- [ ] **Step 4: Ejecutar** `npm run verify:maquinas` → pasa.
- [ ] **Step 5: Cablear el aviso de G-code** en `src/lib/preflight.ts`: el check `area-maquina` llama a `cabeEnLaMaquina(caja, maquina, { permitirGiro: false })`; si el estado es `no-cabe` mantiene el nivel bloqueante y el texto actual; si es `indeterminado` no se emite aviso; **elimina** la propiedad `guia: 'voladizos-y-soportes'`.
- [ ] **Step 6: Añadir la regresión del G-code** en `scripts/verify/maquinas.mjs`: el aviso de G-code sigue bloqueante cuando no cabe, sigue ausente con `vol: null` y ya no enlaza a `voladizos-y-soportes`.
- [ ] **Step 7: Ejecutar** `npm run verify:maquinas` y `npm run lint` → pasan.
- [ ] **Step 8: Commit**: `git add src/lib/maquinas.ts src/lib/preflight.ts scripts/verify/maquinas.mjs && git commit -m "Añade veredicto de encaje reutilizable"`.

### Task 2: Máquina seleccionada compartida

**Files:**
- Create: `src/state/useMaquinaSeleccionada.ts`
- Modify: `src/components/Preflight.tsx` (usar el hook; conservar el id `preflight-maquina`)
- Test: `scripts/verify/e2e.mjs` (usa `#preflight-maquina`: no debe romperse)

**Interfaces:**
- Produces: `export function useMaquinaSeleccionada(): { slug: string; maquina: Maquina | null; setSlug: (slug: string) => void }` en `src/state/useMaquinaSeleccionada.ts`.
  - Lee `localStorage['wiiki-maquina']` en `try/catch` (render estático seguro), escribe igual en `try/catch` y despacha `window.dispatchEvent(new CustomEvent('wiiki-maquina-cambio', { detail: slug }))` en cada cambio; escucha ese evento para actualizarse.
  - `maquina` es `maquinaPorSlug(slug)` o `null` si no hay slug o no existe.

- [ ] **Step 1: Escribir la prueba que falla**: en `scripts/verify/e2e.mjs`, comprobar que tras elegir máquina en el selector del G-code y recargar la página, la selección sigue; y que el valor elegido se refleja en `localStorage['wiiki-maquina']`.
- [ ] **Step 2: Ejecutar y ver el fallo**: `npm run verify:e2e` → falla (no existe el hook / no hay sincronía).
- [ ] **Step 3: Implementar** el hook en `src/state/useMaquinaSeleccionada.ts` y refactorizar `Preflight.tsx` para usarlo, **conservando** el `id="preflight-maquina"` y el `name` de la etiqueta.
- [ ] **Step 4: Ejecutar** `npm run verify:e2e` → pasa.
- [ ] **Step 5: Ejecutar** `npm run lint` y `npm run build` → pasan.
- [ ] **Step 6: Commit**: `git add src/state/useMaquinaSeleccionada.ts src/components/Preflight.tsx scripts/verify/e2e.mjs && git commit -m "Comparte la máquina seleccionada entre flujos"`.

### Task 3: Medidas, aviso de escala y sección «En mi impresora»

**Files:**
- Modify: `src/components/RevisionMalla.tsx`
- Modify: `src/components/revision-malla.css`
- Test: `scripts/verify/reparacion-stl.mjs`

**Interfaces:**
- Consumes: `cabeEnLaMaquina` de la Task 1 y `useMaquinaSeleccionada` de la Task 2.
- Consumes: `revision.analisis` / `revision.resumen?.analisis` (ya existentes), con `dimX`, `dimY`, `dimZ`, `volume`, `isWatertight`.

- [ ] **Step 1: Escribir las pruebas que fallan** en `scripts/verify/reparacion-stl.mjs` (STL sintéticos con tamaño controlado):
  - las medidas aparecen como ancho × fondo × alto en mm, con Z del archivo como alto;
  - el volumen de la malla solo se muestra si la malla está cerrada;
  - la nota «el STL no declara unidades» está siempre;
  - un STL de 8 mm muestra el aviso de escala y **no** muestra veredicto de encaje;
  - un STL de 400 mm muestra el aviso de escala con la conversión ÷25,4;
  - sin máquina elegida se ve el selector y ningún veredicto;
  - con máquina `vol: null` el veredicto es «no se puede determinar»;
  - con máquina elegida, un cubo de 100 mm da un veredicto concreto.
- [ ] **Step 2: Ejecutar y ver el fallo**: `npm run verify:reparacion-stl` → falla (no hay medidas ni sección).
- [ ] **Step 3: Implementar** en `RevisionMalla.tsx`: fila «Medidas» en «Datos de la malla» con `dimX × dimY × dimZ` en mm (Z del archivo = alto) y volumen solo con `isWatertight`; nota fija de unidades; aviso de escala con las dos reglas: mayor dimensión `< 5` mm → «si está en pulgadas, el tamaño real sería ×25,4»; mayor dimensión `> 350` mm → «el tamaño real sería ÷25,4».
- [ ] **Step 4: Implementar** la sección «En mi impresora» en `RevisionMalla.tsx`: selector con el hook de la Task 2 (`id="revision-maquina"`), y veredicto de `cabeEnLaMaquina` sobre el análisis vigente (la copia reparada si existe, si no el inicial). Si hay aviso de escala, la sección dice que no se puede saber hasta resolver las unidades y **no** muestra veredicto. Si el veredicto del inicial y el de la copia difieren, una línea lo dice («tras reparar, la copia sí cabe; antes no»).
- [ ] **Step 5: Ejecutar** `npm run verify:reparacion-stl` → pasa.
- [ ] **Step 6: Ejecutar** `npm run lint`, `npm run build`, `npm run verify:e2e`, `npm run verify:maquinas`, `npm run verify:teclado`, `npm run verify:dist` → pasan.
- [ ] **Step 7: Capturas** de escritorio y móvil de la sección nueva.
- [ ] **Step 8: Commit**: `git add src/components/RevisionMalla.tsx src/components/revision-malla.css scripts/verify/reparacion-stl.mjs && git commit -m "Añade medidas, aviso de escala y encaje al informe STL"`.
