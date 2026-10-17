# Atribuciones y enlaces antes de AdSense · 17 de octubre de 2026

## Fallo y corrección

La interfaz usaba `cita.fuente` como `href`, aunque es una atribución textual
(por ejemplo, «Creality» o «wiki.bambulab.com»). El navegador lo convertía en
una ruta de la propia guía y producía 404. Las URLs reales de la bibliografía
estaban bien almacenadas en `Guia.fuentes`.

Se conserva la atribución como texto y se añade el enlace explícito **Ver fuentes
de la guía** a `#fuentes`. La bibliografía mantiene sus documentos y URLs originales.
No se ha elegido automáticamente un documento por su editor: varias guías citan
más de una página del mismo editor y algunas atribuciones combinan fuentes.
Este cambio arregla la navegación, no establece una correspondencia documental
exacta para cada cita ni es una nueva revisión factual del contenido.

## Evidencia local

- Regresión observada antes del cambio: `altura-capa` publicaba `href="Bambu Lab Wiki"`, no un destino válido a las fuentes.
- `npm run build`: correcto, 38 páginas exportadas.
- `npm run verify:enlaces`: **258/258**, 340 atribuciones inspeccionadas entre los modos con/sin JavaScript y 66 destinos internos HTTP 200; anclas verificadas en ambos modos.
- Guías **791/791**, wiki **204/204**, SEO **397/397**, esquema **44/44** y rutas correctas.
- Lint: cero errores y tres avisos preexistentes en prototipos Three. Persiste el aviso de chunks de más de 500 kB, sin relajar umbrales.
- Revisión independiente: sin defectos bloqueantes. Incorporadas sus dos mejoras menores al test: atribución exacta y visible, y conservar el modo al comprobar anclas entre páginas.
- Capturas locales móvil/escritorio: `scripts/verify/out/citas-{375,1440}.png` y `fuentes-{375,1440}.png`.

Hubo timeouts intermitentes esperando `networkidle` en primeras ejecuciones de
enlaces/wiki/rutas. Las repeticiones completas pasaron, sin cambiar sus aserciones
ni aumentar sus plazos. Una inspección de red observó peticiones de Google
Analytics abortadas y una petición CSP externa bloqueada; no demuestra por sí
sola la causa de todos los timeouts. El nuevo barrido bloquea servicios externos
para no depender de publicidad o analítica.

## Alcance y siguiente paso

`BASE_URL=https://wiiki-3d.com npm run verify:enlaces` repite el barrido contra
la web publicada, sin usar el HTML local como sustituto del remoto.
El resultado de publicación debe confirmarse después del despliegue.

Este barrido comprueba destinos internos y preservación de las URLs de fuentes;
**no comprueba la disponibilidad remota de todos los sitios citados**.
Tampoco acredita aprobación de AdSense. No se envía ninguna solicitud, se borra
la ficha existente ni se cambia CMP, GSC, privacidad, autoría o máquinas.
