# Revisión de material

**Veredicto: RECHAZADO** — 2 fallos, de los cuales 1 bloqueante.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | FALLA — 1 afirmación sin respaldo |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Estructura de las cuatro etapas | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Fallos, con dónde y qué hacer

### 1 · Bloqueante · Afirmación sin respaldo en regla `compensar-contraccion`

**Dónde:** regla `compensar-contraccion`, campo `porque`.

**Qué dice:** "ABS, PC y PA se contraen considerablemente."

**Por qué falla:** En `wiki/raw/material-bambulab-beginners.md` solo ABS tiene "Shrinkage/warping: Considerable". PC y PA no aparecen en esa fuente. En `wiki/raw/material-bambulab-material-table.md` no hay datos de contracción. En `wiki/raw/material-bambulab-shrinkage.md` no hay ranking por material. En `wiki/raw/material-bambulab-drying.md` no hay datos de contracción. La afirmación "PC y PA se contraen considerablemente" no tiene respaldo en ninguna de las cuatro fuentes citadas.

**Qué hacer:** O bien traer la fuente que respalde la contracción de PC y PA a `wiki/cooked/` antes de escribir la regla, o bien limitar la afirmación a "ABS se contraen considerablemente" y dejar PC y PA fuera de la regla hasta que haya respaldo.

### 2 · Importante · Paráfrasis que exagera en regla `secar-pa-largo`

**Dónde:** regla `secar-pa-largo`, campo `porque`.

**Qué dice:** "Puede requerir ciclos de secado más largos."

**Por qué falla:** `wiki/raw/material-bambulab-drying.md` dice que después de ~3 meses expuesto al aire, el PA "becomes very difficult to dry them using a conventional convection oven at 80–90 °C". La fuente habla de dificultad con un horno de convección a 80-90 °C, no de ciclos más largos. La guía convierte una dificultad en una recomendación de tiempo.

**Qué hacer:** Cambiar "Puede requerir ciclos de secado más largos" por algo como "Es muy difícil de secar con un horno de convección convencional" o "Puede no secarse completamente con un horno de convección a 80-90 °C".

## Notas que no bloquean

- La regla `compensar-contraccion` tiene `cuando: { material: ['abs', 'pc', 'pa'], sintoma: 'contraccion' }`. Si se corrige el `porque` para limitarse a ABS, el `cuando` debería limitarse a `{ material: 'abs', sintoma: 'contraccion' }` para ser coherente.
- La guía explica bien las dos contradicciones del cocinado (PLA/humedad y PETG/cámara cerrada) con su matiz, no con un número elegido.
- Las cuatro guías enlazadas (`warping-pla`, `temperatura-cama`, `enclosure-y-warping`) existen.
- La primera cita está en la primera mitad del artículo (conocimiento `pla`).
- No hay frases de IA ni párrafos de relleno.
