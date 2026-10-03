# Diseño de Taller

## Decisiones

Los gramos no se teclean. Vienen del G-code. Si faltan, la calculadora lo dice y no
calcula nada. La regla es la de `JevService`: ante la duda, falla; nunca rellena. Si se
permitieran gramos tecleados, el resultado sería un coste sobre un número inventado,
presentado con el mismo peso visual que uno medido.

Se usa `filamentUsed`, no `filamentWeight`. Son campos distintos: el segundo es el peso
total declarado por el slicer, y la familia Orca no lo escribe. Si falta el primero, no
se mezclan.

El precio se teclea cada vez y no se guarda. Ni `localStorage`, ni `sessionStorage`, ni
IndexedDB. Guardarlo convertiría Taller — el único módulo no bloqueado — en un módulo
bloqueado por S3. Y el precio del filamento caduca: uno guardado en 2026 es un dato
falso en 2027.

El precio se pide en €/kg, no €/g. El filamento se vende por kilogramo y quien imprime
piensa en €/kg.

La aritmética es visible. Gramos × precio/kg = coste, con las tres cifras a la vista.

H-2.2 no se implementa. El coste de máquina necesita potencia y precio de la energía, y
ninguno está en el G-code. Sería una multiplicación con tres entradas tecleadas y
ninguna leída.

Vive dentro de `.canvas-area`, en la ruta `/taller`. El panel derecho no se toca: D8 dice
que el análisis sobrevive a la navegación.

Solo lee `metadata` de `useAnalysis()`. No añade nada al contexto.

## Los cinco estados, en este orden (no se pide el precio si no hay gramos que multiplicar)

| # | Estado | Qué se ve |
|---|---|---|
| 1 | Sin archivo | «Sube un G-code para calcular cuánto te cuesta.» |
| 2 | Archivo que no es G-code | «El visor 3D no lleva datos de impresión. Sube un G-code para calcular el coste.» |
| 3 | G-code sin gramos | «Tu slicer no escribió los gramos consumidos. Sin ese dato no se puede calcular el coste.» Y ningún número |
| 4 | Con gramos, sin precio | Campo para el precio. «Falta el precio por kilogramo.» Y ningún número |
| 5 | Con gramos y precio | 0,93 g × 25,00 €/kg = 0,02 € |

## Validación del precio

Acepta coma y punto en la entrada (`0,25` y `0.25`). Muestra coma en la salida.

Sin separador de miles.

Precio 0, negativo o no numérico → campo marcado como inválido, no se calcula nada, y el
resultado anterior desaparece.

El mensaje de gramos ausentes nombra el motivo («tu slicer no los escribió»), no «datos
insuficientes».

## Criterio de aceptación, medible

Con el fixture del repo (PLA, 0,93 g) y un precio de 25, el resultado es 0,02 €.

## Ficheros

- `src/lib/coste.ts` — la lógica pura: normalizar, validar, calcular.
- `src/routes/TallerRoute.tsx` — la vista y los cinco estados.
- `src/App.css` — estilos, en el estilo del resto del fichero.
