# Arranque y continuidad con Space Bunny Free max

Plan obligatorio: [plan-scraping-conocimiento.md](plan-scraping-conocimiento.md).
Estado: planificación lista; la adquisición ampliada todavía no está implementada.

## Modelo

Seleccionar en la sesión **Space Bunny Free**, proveedor **OpenCode Zen** y
variante **max**: `opencode/space-bunny-free#max`.
Si la cuenta usa OpenCode Go, la referencia disponible es
`opencode-go/space-bunny-free#max`; no cambiar de proveedor sin comprobar acceso.
No configurar sólo `model: "...#max"` en la raíz y suponer que conserva la variante.
Comprobar la selección de la sesión y el modelo heredado/fijado de los subagentes.

## Prompt de ejecución para pegar después del cambio

```text
Lee AGENTS.md, docs/plan-scraping-conocimiento.md y docs/ejecucion-space-bunny.md.
Ejecuta únicamente P0 del plan y su comprobación P10. No empieces scraping masivo
ni nuevas páginas, ni cambies la arquitectura antes de estabilizar la base actual.

Antes de editar: git status --short, inventario de cambios preexistentes y hashes
de todos los raw existentes, incluidos los no rastreados. No borres ni reviertas
trabajo previo. Los tres artículos actuales están RECHAZADOS por el último lint.
Lee wiki/reviews/lint-pre-adsense-2026-10-04.md y los tres informes que referencia.

Corrige usando cocinero -> redactor -> revisor, sobre los archivos existentes,
pasando rutas de archivos y notas, nunca el historial de conversación. Revisor
comprueba contra raw, no sólo coincidencia con cooked. No sobrescribas informes
ni raw. Modelo de ejecución: Space Bunny Free max; no fallback de pago.

Mantén intactas las zonas protegidas del plan. No push, despliegue ni AdSense.
Si hay dos rechazos consecutivos o falta evidencia, termina BLOCKED con el motivo;
no rellenes ni generes un tercer intento ciego. Respeta permisos y no los eludas.

Registra avances en .local/wiki/estado-ejecucion.md. Al terminar entrega:
estado de P0, rutas cambiadas, revisiones, pruebas realmente ejecutadas y pendientes.
Escribe docs/hallazgos-pre-adsense.md. Distingue resultado local de sitio publicado.
Después detente y solicita autorización para P1.
```

## Prompt para las fases posteriores

```text
Lee el plan y .local/wiki/estado-ejecucion.md. Ejecuta solamente la siguiente fase
autorizada, verificando que la anterior cumplió sus criterios de salida. Conserva
artefactos y trabajo previo. No interpretes una respuesta del modelo como prueba
de éxito: verifica archivos, contratos y tests. Si falta una dependencia, para.
Actualiza el checkpoint y termina con resultado, evidencia y siguiente fase.
```

No hay que lanzar la API para empezar P0. La delegación nativa de OpenCode basta;
el cliente API de P9 sólo se implementa si sigue haciendo falta después del piloto.
