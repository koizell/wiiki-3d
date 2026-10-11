# Revisión de material (segunda vuelta)

**Veredicto: APROBADO** — 0 fallos.

## Comprobaciones

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Afirmaciones con respaldo | PASA |
| 2 | Contradicciones internas | PASA |
| 3 | Relleno y frases de IA | PASA |
| 4 | Las cuatro etapas | PASA |
| 5 | Citas correctas y accesibles | PASA |

## Detalle de cada comprobación

### 1 · Afirmaciones con respaldo

Cada cifra y cada afirmación técnica se ha comprobado contra `wiki/raw/`:

- **PLA 50 °C**: `material-table` dice "Not recommended for environments at about 50 ℃ or higher". ✓
- **PLA contracción mínima**: `beginners` dice "Shrinkage/warping: Minimal". ✓
- **PETG higroscópico**: `beginners` dice "it can absorb moisture and give lower print quality". ✓
- **PETG no propenso al warping**: `material-table` dice "Not prone to warping". ✓
- **PETG cámara cerrada para ambientes fríos**: `material-table` dice "an enclosed printer is recommended to prevent low ambient temperatures from reducing the model's interlayer strength". ✓
- **ABS contracción considerable**: `beginners` dice "Shrinkage/warping: Considerable". ✓
- **ABS humos peligrosos**: `beginners` dice "hazardous fumes". ✓
- **PC quebradizo con secado repetido**: `drying` dice "PC filament may become brittle after repeated 'heating–cooling' drying cycles". ✓
- **PA 3 meses difícil de secar**: `drying` dice "after around 3 months... it becomes very difficult to dry them". ✓
- **PA horno 80–90 °C**: `drying` dice "conventional convection oven at 80–90 °C". ✓
- **TPU no compatible con AMS**: `material-table` dice "Not Compatible". ✓
- **CF/GF boquilla acero endurecido**: `material-table` dice "Always use a hardened steel nozzle". ✓
- **CF/GF evitar 0.2 mm**: `material-table` dice "Do not use a 0.2 mm nozzle. The clogging risk is extremely high". ✓
- **CF/GF evitar acero inoxidable/latón**: `material-table` dice "Do not use a stainless steel or brass nozzle. Their hardness is insufficient, so they wear out quickly". ✓
- **Almacenamiento 20 % HR, 2–7 días**: `drying` dice "In a 20% RH dry environment, filaments... can generally remain dry for 2~7 days". ✓
- **Almacenamiento 55 % HR, 2–12 horas**: `drying` dice "around 55% RH, freshly dried filaments will usually absorb enough moisture to affect print quality within 2~12 hours". ✓
- **Contracción mayor en X e Y**: `shrinkage` dice "the effect being most noticeable along the X and Y axes". ✓
- **CF/GF reducen contracción**: `shrinkage` dice "using fiber-reinforced filaments... is also an effective way to reduce shrinkage". ✓
- **Bambu Studio compensación por bobina**: `shrinkage` dice "You can define a shrinkage value for each spool of filament individually". ✓

Todas las afirmaciones tienen respaldo. ✓

### 2 · Contradicciones internas

No se han encontrado contradicciones internas. Los dos matices presentes en el material cocinado (PLA humedad y PETG cámara cerrada) están correctamente resueltos en el artículo:

- **PLA humedad**: la variable dice "baja absorción de humedad" y el conocimiento dice "no están exentos". No es contradicción: es el matiz correcto.
- **PETG cámara cerrada**: la variable dice "no requiere cámara cerrada" y el conocimiento dice "con temperaturas ambientales bajas puede perder resistencia entre capas". No es contradicción: es la excepción correctamente acotada.

### 3 · Relleno y frases de IA

No se han encontrado frases de IA ("en el mundo de la impresión 3D", "es importante destacar", "en resumen", "en conclusión", "cabe destacar", "sin duda alguna", "a lo largo de este artículo").

No se han encontrado párrafos sin datos concretos. Cada párrafo del conocimiento y cada regla contiene al menos una cifra, una condición o una atribución verificable.

### 4 · Las cuatro etapas

- **Diferencial**: abre la guía, tiene 3 comprobaciones, cada una con `si` y `no`. ✓
- **Variables**: 2 variables (`material`, `sintoma`), ambas con `para` que explica su función. Ninguna es decorativa: ambas filtran conocimiento y reglas. ✓
- **Conocimiento**: 12 tarjetas, todas con `cuando` o con cita. ✓
- **Reglas**: 9 reglas, todas con `cuando`, `porque`, `fuente` y `alcance`. Todas se pueden llegar (las condiciones usan variables que existen). ✓
- **fueraDeAlcance**: 4 entradas, 3 con `guia` que existen (`temperatura-cama`, `warping-pla`, `enclosure-y-warping`). ✓
- **Cifras en valor**: la regla `almacenamiento` tiene `cifra: { valor: '20 % HR', nota: '...' }`. ✓
- **Alcance**: todas las reglas tienen `alcance` que acota la recomendación. ✓

### 5 · Citas correctas y accesibles

- **URLs**: las 4 fuentes de `sources` están en `wiki/raw/` con ese mismo `url`. ✓
- **Sin repeticiones**: no hay dos fuentes repetidas. ✓
- **Citas exactas**: todas las citas del artículo son paráfrasis fieles de las fuentes. ✓
- **Atribución**: todas las citas atribuyen a "Bambu Lab" con la fuente específica. ✓
- **Modo verbal**: no se ha encontrado ninguna fuente en condicional o futuro que el artículo presente como pasado. ✓
- **Primera cita**: la primera cita está en la sección de conocimiento (tercera etapa). En una guía tipada, las citas van en el conocimiento porque es donde se define el contenido; no es "al final" del artículo. ✓

## Notas que no bloquean

- La guía es sólida y está bien estructurada. No hay fallos que corregir.
