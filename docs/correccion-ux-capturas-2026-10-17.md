# Corrección de las capturas UI/UX

## Problemas reproducidos

- Wiki con `max-width: 52rem`, alineada a la izquierda y espacio desaprovechado a la derecha.
- Dos columnas de análisis igualadas en alto, con diez filas de datos frente a tres de estimación.
- Scroll del área central más scroll de documento para acceder al pie.
- Declaración `PLA;ABS;ABS…` mostrada en cada tarjeta y tratada como un material único.

## Cambios y límites

El catálogo se centra con un ancho máximo de 76rem y adapta las tarjetas a una,
dos o tres columnas. Los párrafos conservan medida de lectura. El archivo y sus
materiales declarados aparecen una vez; no se presentan como compatibilidad de
cada guía ni como un filtro ya aplicado.

El resultado presenta primero una estimación compacta y después una rejilla de
metadatos. El aviso demo sigue visible y distingue índice de probabilidad. Sólo
las pantallas sin panel lateral usan scroll del documento; el pie sigue accesible.
La navegación sin hash vuelve al principio para no heredar el scroll anterior;
los enlaces con ancla siguen llegando a su destino. Visor y carril de guías
conservan sus modelos de layout.

Los materiales por ranura se deduplican para presentación, conservando el valor
original en los metadatos. No se infiere qué ranuras se usan. Si hay familias
distintas, se conserva la lectura pero **no se calcula un riesgo único ni se
precontesta material en la guía**. El coste sigue accesible si hay gramos.
Una declaración repetida del mismo material, como `ABS;ABS`, no se evalúa como PLA.

Las nuevas lecturas ambiguas no crean un análisis guardado sin clasificación:
se explica en el aviso. Las entradas antiguas no se borran ni se migran; se
presentan sin su valoración inválida en Recientes, Historial, Proyectos y panel.
No se ha modificado el contrato del backend ni se han inventado puntuaciones
«neutras» para simular una evaluación que no existe.

## Evidencia local

- Fallos observados antes de corregir: selección automática ABS para lista mixta;
  entrada antigua mostraba «Bajo»; scroll interno `auto`; regreso desde el pie con
  el título de Inicio fuera de pantalla. Regresiones añadidas antes de corregir.
- Build: 38 páginas exportadas, sin errores.
- Composición **45/45**, multimaterial **12/12**, demo **19/19**, guías **791/791**,
  wiki **204/204**, SEO **398/398**, enlaces **258/258**, esquema **44/44**,
  historial **114/114**, taller **180/180**, UI **170/170**, UX por tareas **14/14**.
- Rutas, teclado y overlay correctos; se comprueban zoom/giro/encuadre y tamaño
  del visor en el recorrido UX. Lint sin errores y tres avisos previos de prototipos.
  Persiste el aviso anterior de chunks grandes, sin modificar umbrales.
- Una prueba UX dependía de que el primer enlace del panel fuera el material.
  Ahora selecciona explícitamente ese campo, conservando la exigencia de llegar
  a su variable concreta; el resumen ocupa antes su sitio aprobado en el DOM.
- Revisión independiente sin bloqueantes. Incorporadas sus sugerencias: comprobar
  persistencia tras cargar primero un archivo válido y el tramo de dos columnas,
  además de medir directamente que la estimación no se estire.
- Capturas: `scripts/verify/out/wiki-composicion-*.png` y
  `scripts/verify/out/resultado-composicion-*.png` en los cinco anchos.

Las pruebas de navegador usan perfiles aislados y bloquean servicios externos.
Los comandos nuevos admiten `BASE_URL` para repetir el recorrido contra producción.
No se han cambiado fuentes de la wiki, autoría, CMP, máquinas ni AdSense; no se
solicita revisión automáticamente y estas correcciones no garantizan aprobación.
