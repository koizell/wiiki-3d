# AdSense, agentes editoriales y crecimiento

Fecha de trabajo: 2026-11-12. Encargo: priorizar la aprobación de AdSense,
ejecutar sin consultas intermedias, revisar GA4, Search Console y sitemap,
investigar competencia y reemplazar los agentes editoriales deficientes.

## Decisión de implementación

Conservar React/Vite, exportación HTML y las guías TypeScript. Corregir fallos
demostrados y validar un ciclo editorial antes de ampliar contenido. Es una
decisión técnica del ejecutor, no una elección atribuida al propietario.

Alternativas consideradas: reescribir el sitio (pierde funcionalidad sin resolver
la calidad), producir artículos en masa (agrava el riesgo de contenido de escaso
valor) o mejorar el sistema y sus páginas existentes (elegida).

## Entregables y límites

- Investigación fechada con políticas oficiales actuales y tácticas observadas
  en competidores; separar observación de hipótesis y métricas desconocidas.
- Agentes especializados con entradas por rutas, evidencia local trazable,
  revisión independiente contra fuentes originales, límites de alcance y salida
  reanudable. Sin modelo fijado ni dependencia nueva de Gemini.
- Plan vigente único para esta intervención; conservar documentos antiguos como
  historial, sin tratarlos como evidencia del estado actual de las cuentas.
- Corregir los defectos reproducidos de indexación/medición que permita el código.
- Probar los agentes sobre una guía existente y registrar rechazos reales.
- Verificar compilación, contenido, SEO, enlaces y restricciones de revisión.
- Plan de tráfico con hipótesis, indicadores y tareas priorizadas por utilidad.

No inventar autoría humana, pruebas físicas, cifras de tráfico, credenciales,
fechas de actualización ni aprobación de Google. No cambiar identificadores
reales de Google ni DNS sin necesidad verificada. No desplegar cambios ajenos ni
confundir código preparado con cuenta activada o producción publicada.

`wiki/raw/` es inmutable: nuevas capturas en nuevos archivos. Redactor sólo usa
`wiki/cooked/`; revisor puede cotejar ambas capas contra raw. Respetar trabajo
previo en `opencode.json` y las carpetas de imágenes no versionadas.

## Criterios de aceptación

Los contratos eliminan instrucciones contradictorias; el piloto produce un
informe con evidencia y no una aprobación automática. Los checks pertinentes
pasan sobre un build fresco. El informe final distingue resultados locales,
observación pública y estado privado desconocido. AdSense aprobado y aumento de
tráfico son resultados externos pendientes de Google y de mediciones posteriores.
