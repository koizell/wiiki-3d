---
titulo: "Steel sheet profiles"
url: https://help.prusa3d.com/article/steel-sheet-profiles_1955
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-04
autor: Prusa Research
idioma: en
---

# Steel sheet profiles

Relevant for

MINI family

MK3 family

MK3.5 family

OLD PRODUCTS

62 comments

Article is also available in following languages

[imagen: English]

[imagen: Čeština]

[imagen: Polski]

[imagen: Deutsch]

[imagen: Français]

[imagen: Español]

[imagen: Italiano]

[imagen: 日本語]

The Magnetic heatbed enables you to use **flexible**, **removable steel sheets**. There are different properties and strengths of each sheet, but they also have different thickness which affects calibration.

[tip-callout]
For more details on the different flexible steel sheet and their properties, please see Flexible steel sheets (guidepost).
[/tip-callout]

We implemented **steel sheet profiles** for our printers that need first-layer calibration. The function allows you to create up to eight specialized profiles for your printer setup.

For each sheet, set the Live Z adjust value. Once the values for each sheet are stored on the printer, it is possible to quickly toggle bewteen sheet profiles. The printer will not remind you to change the steel sheet profile, as it **cannot sense which steel sheet is installed**.

### How it works (MK2.5/S & MK3/S/+)

There are currently eight sheet profiles available with predefined, but customizable names.

To set up the individual sheet profiles, please head to the *LCD Menu* -> *Settings -> HW setup -> Steel Sheets*:

[imagen: hw setup profiles]

For each sheet, the following settings are available:
- **Select** - confirms the selection of the sheet, which will then become the default
- **First layer calibration** - starts the First Layer Calibration (i3) process for the given profile
- **Rename** - enables you to change the name, by up to seven characters
- **Reset** - sets the values back to the factory defaults

#### Quick-toggle

As soon as two or more profiles are configured (by the First Layer Calibration), you will be able to quick-toggle between them directly from the main menu.

[imagen: hw profile 2]

[note-callout]
**Don't forget which profile you have attributed to which plate!** Always carefully watch your first layer and in case the nozzle is too high or too low, stop the print and fix it either by setting the correct profile or by modifying the Live adjust Z.
[/note-callout]

#### Renaming of the sheet

After selecting the **Rename** option in the sheet profile menu, you can change up to 7 characters of the profile name. The word "Sheet" cannot be changed; it is the "**Smooth1**", "**Textur1**" etc. that you can customize. There is no way to delete or erase a wrongly selected character, but you can always restart the renaming procedure.

You start from the left and move to the right. By turning the knob, you are changing the characters, and by clicking it, you confirm the current character and move to the next one. When a character position is redefined, a small chevron mark will appear underneath it.

### How it works (MINI/+, MK3.5/S)

To set up the individual sheet profiles, please head to the *LCD Menu -> Settings -> Hardware -> Steel Sheets*.

For each sheet, the following settings are available:
- **Select** - confirms the selection of the sheet, which will then become the default
- **First layer calibration** - starts the First Layer Calibration process for the given profile
- **Reset** - sets the values back to the factory defaults
- **Offset** - sets the Live Z adjust value for the given profile, without calibration

[TABLA DE MONTAJE: 2 IMAGENES, UNA EN CADA COLUMNA, SIN TEXTO]

Screenshots taken on the MK3.5. The same settings are available on the MINI/+.

#### Quick-toggle

As soon as two or more profiles are configured by the First Layer Calibration, you will be able to quick-toggle between them directly from the *Control* menu. The quick toggle is available in *LCD menu ->Control ->Sheet profile*.

[imagen:]

Screenshot taken on the MK3.5. The same toggle is available on the MINI/+.

## Notas del recolector

- **Aviso tecnico sobre la obtencion del cuerpo, igual que en `under-extrusion_2007`.** La
  conversion automatica a Markdown devuelve titulo, indice y pie, y deja el cuerpo vacio; el
  texto esta en el HTML servido, dentro del fragmento de carga de React
  (`<div hidden id="S:1">`). Estado 200, 1.514.187 bytes de HTML. **No es un aviso sin
  contenido.**
- **Que cierra el hueco.** `first-layer-calibration-i3` decia, sin explicar, «we have a
  convenient feature called Steel sheet profiles». Esta pagina es esa explicacion. Lo que
  anade, y es lo que importa para el diagnostico:
  - **Por que hay que recalibrar al cambiar de chapa:** «they also have different thickness
    which affects calibration». No da el grosor de cada chapa; lo remite a la guia
    «Flexible steel sheets (guidepost)», que no se ha descargado.
  - **Cuantos perfiles:** «up to eight specialized profiles» y «There are currently eight
    sheet profiles available».
  - **Que la impresora no avisa:** «The printer will not remind you to change the steel sheet
    profile, as it **cannot sense which steel sheet is installed**». Es el punto mas
    importante para el sintoma «la primera capa va bien con una chapa y mal con otra»: el
    fallo no se puede detectar solo, hay que saber que perfil esta activo.
- **El aviso que Prusa hace explicito es de la propia pagina,** en el recuadro de nota:
  «Don't forget which profile you have attributed to which plate!» seguido de «Always
  carefully watch your first layer and in case the nozzle is too high or too low, stop the
  print». O sea: la pagina **no** dice que el perfil se detecte, dice que hay que vigilar la
  primera capa. Es el mismo criterio que ya da `first-layer-calibration-i3`.
- **Los dos menus no son iguales y las listas de opciones tampoco.** Para MK2.5/S y MK3/S/+:
  `Settings -> HW setup -> Steel Sheets`, con Select, First layer calibration, **Rename** y
  Reset. Para MINI/+ y MK3.5/S: `Settings -> Hardware -> Steel Sheets`, con Select, First
  layer calibration, Reset y **Offset**. La ruta de la segunda esta escrita en el original
  como una sola cadena (`*LCD Menu -> Settings -> Hardware -> Steel Sheets*`), sin los
  asteriscos intermedios de la primera; se ha conservado asi. En la segunda maquina el ajuste
  del valor se llama **Offset** y **no requiere calibracion** («without calibration»), cosa
  que en la primera maquina no aparece. El quick-toggle tampoco esta en el mismo sitio: menu
  principal en la primera, `Control -> Sheet profile` en la segunda.
- **«Live Z adjust» es el termino de la pagina,** y lo repite en tres sitios distintos
  (introduccion, opcion Offset y el recuadro de nota, donde escribe «Live adjust Z», sin la
  Z mayuscula). El brief avisa de que Z-level, Live Adjust Z y Z-compensation no son lo mismo;
  esta pagina **solo** usa «Live Z adjust» / «Live adjust Z» y no menciona Z-level ni
  Z-compensation. No se ha normalizado a ningun otro termino.
- **Cifras:** «up to eight specialized profiles», «eight sheet profiles available», «up to
  seven characters» y, en el mismo parrafo, «up to 7 characters». La pagina da la palabra
  «Sheet» como parte no editable del nombre, y los nombres por defecto como «Smooth1»,
  «Textur1». **No da ningun valor en milimetros, ni grosores de chapa, ni valores de Z.**
- **Erratas del original, conservadas:** «bewteen» (por «between») y «the different flexible
  steel sheet» en singular dentro del recuadro. Tambien hay espacios dobles al final de dos
  parrafos del principio, que no se han marcado.
- **Una tabla que no es una tabla de datos:** en la seccion de MINI/+ y MK3.5/S hay un
  `<table>` de dos columnas con una captura en cada celda y ningun texto. Es montaje de dos
  capturas en paralelo, y el parrafo siguiente las identifica («Screenshots taken on the
  MK3.5»).
- **Solo hay una tabla en toda la pagina, y es esa de montaje.** Las opciones de cada perfil
  son listas, no tablas: no hay ninguna tabla de valores que extraer.
- **Alcance:** la pagina es de Profiles de chapa en el firmware, no de adhesion en si. Lo
  que aporta al brief es el motivo del recalibrado y el aviso de que la impresora no puede
  detectar la chapa. El resto (renombrar perfiles, el menu de nombres, el chevron) queda fuera
  del alcance y se conserva sin recortar.
- Los enlaces se han reducido a su texto: la pagina enlaza a la guia «Flexible steel sheets
  (guidepost)» y al «First Layer Calibration (i3)». El primero **no** esta en `wiki/raw/`
  todavia; el segundo si, como `adhesion-primera-capa-prusa-kb-first-layer-calibration-i3.md`.
  Los destinos no sobreviven en el fichero.
- La cabecera «Relevant for» es MINI family, MK3 family, MK3.5 family y OLD PRODUCTS. No
  incluye MK4, MK4S, XL ni CORE One, aunque los dos apartados cubren MK2.5/S y MK3/S/+.
- Los recuadros van etiquetados `[tip-callout]` y `[note-callout]` con la etiqueta exacta del
  atributo `type` del original. Los 62 comentarios no se han capturado. Las imagenes sin `alt`
  van como `[imagen:]`.
- El texto original esta en ingles y yo no lo he traducido.
