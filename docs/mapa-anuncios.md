# Mapa de anuncios y despliegue de la monetización

> **Nada de este fichero está activo hoy.** Es el plan para pasos que vienen
> **después de la aprobación** de AdSense: consentimiento, script y colocación.
> Lo dejo escrito para que sirvir el primer anuncio sea rápido y no incumpla
> ninguna política —un fallo aquí sanciona más rápido que cualquier otra cosa.

## Estado actual (listo)

- `ads.txt` en la raíz: `google.com, pub-1976099124866284, DIRECT, f08c47fec0942fa0`.
- Meta `google-adsense-account` (ca-pub) en `index.html`.
- Propiedad verificada (propiedad de dominio `wiiki-3d.com` en Search Console).

## 1 · Consentimiento — obligatorio antes de anuncios personalizados (EEE/UK/Suiza)

1. En AdSense, activar el **mensaje de la normativa europea** (la CMP certificada
   de Google), o integrar una CMP certificada de la
   [lista oficial](https://support.google.com/adsense/answer/13554116) con **TCF v2.3**.
2. **Consent Mode v2** con los cuatro parámetros en `denied` por defecto, cargado
   **antes** del script de anuncios:

   ```html
   <script>
     gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied',
       ad_personalization: 'denied', analytics_storage: 'denied' });
   </script>
   ```

   La CMP los pone en `granted` al aceptar.

> Sin CMP certificada, el tráfico de la UE sólo es elegible para anuncios **no
> personalizados**; no se pierde la cuenta, se pierde personalización e ingresos.

## 2 · El script (una sola vez, tras aprobar)

En `<head>` (código exacto que da AdSense al aprobar):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1976099124866284" crossorigin="anonymous"></script>
```

> Ha de llegar **también al HTML estático exportado** (hoy las guías y la home se
> leen sin JavaScript): insertarlo en la plantilla que escribe
> `scripts/export-static.mjs`, no sólo en la app.

## 3 · Dónde SÍ colocar anuncios

| Pantalla | Cantidad | Dónde |
|---|---|---|
| Guías | 1–2 | Tras la **etapa 1** (diferencial) y **después de la etapa 4** (acciones). Es donde el lector ya obtuvo valor. |
| `/` y `/taller/` | 1 | Tras el bloque de contenido estático; **nunca** sobre la zona de subida ni el formulario. |

## 4 · Dónde NUNCA

| Pantalla / práctica | Motivo |
|---|---|
| `/historial`, `/proyectos` | Datos privados del visitante; no es contenido del editor. |
| `/404` y cualquier pantalla sin contenido | Política de *dead end* / *screens without publisher-content*. |
| Anuncios que solapen el menú, botones o el contenido | *Better Ads Standards* + política de anuncios que interfieren. |
| Pop-ups, intersticiales, *sticky* / *anchor* en móvil | Lo que más rompe la revisión y lo que peor retiene. |

## 5 · Runbook (orden al recibir la aprobación)

1. Activar la CMP (mensaje europeo de AdSense) + Consent Mode v2 (§1).
2. Insertar el script en la plantilla de la app **y** en la exportación estática (§2).
3. Colocar los emplazamientos del mapa (§3); ninguno en los prohibidos (§4).
4. Verificar con **Tag Assistant** / DebugView: sin anuncios que solapen navegación.
5. Actualizar la política de privacidad («publicidad activa») **antes** de publicar.
6. Publicar y medir (analítica sin cookies primero; GA4 con CMP ya en marcha).
