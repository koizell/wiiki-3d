---
titulo: "Binary G-code | Prusa Knowledge Base"
url: https://help.prusa3d.com/article/binary-g-code_646763
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-13
autor: Prusa Research
idioma: en
---

# Binary G-code

Relevant for

MK4 family
XL family
MINI family
MK3.9 family
SOFTWARE

Binary G-code is a new standard for encoding and compressing ASCII G-code
files. G-code files are easy to read and interpret, but their downside is that
the data is not saved efficiently, and the file size is often large.
Compression of the file is problematic because the printers usually run on
limited hardware and may not have enough memory and/or CPU power to decompress
it.

## Binary G-code

The binary G-code format is flexible and the encoding and compression of
individual blocks is variable. We also provide libbgcode library which contains
the routines to convert ASCII G-codes to binary and vice versa. The library is
written in C++ and the repository includes bindings for Python.

Our testing shows that using binary G-code reduces the average size by about
70%.

## Slicer requirements

The support for the .bgcode file format is implemented in PrusaSlicer,
including its export, loading configs, and previewing G-code or file
associations. Exporting binary G-code can be enabled in the Printers tab in
General -> Support binary G-code. This option is enabled by default starting
from the PrusaSlicer version 2.7.0. An option to convert ASCII G-code to binary
(or the opposite) can be found at File -> Convert.

## Disabling binary G-code export for all profiles

You can disable the use of binary G-code even globally for all profiles in the
Configuration -> Preferences -> Other -> Use binary G-code when the printer
supports it.

## Firmware requirements

To print a binary G-code, it has to be supported by the firmware of the printer.
For Original Prusa MINI, MK4, and XL printers, it is supported starting from
firmware 5.1.0. It is necessary to update the printer firmware before using the
binary G-code format.

## Compatibility issues

Some external printer control programs like Octoprint might have an issue with
the binary G-code. In this case, disable the binary G-code feature in
PrusaSlicer.

## Notas del recolector

- **Comprobación:** HTTP 200, 1.162.411 bytes de HTML, 10.551 caracteres de
  texto extraído. No es una cáscara.
- **Es la fuente que sostiene que «el G-code es texto» y que ese texto tiene un
  coste.** La frase literal que importa: «G-code files are easy to read and
  interpret, but their downside is that the data is not saved efficiently». Es
  la razón por la que existe un formato binario, y es la razón por la que un
  panel que lee metadatos puede leer un `.gcode` y no un `.bgcode`.
- Cifra literal: reducir el tamaño **un 70% de media**.
- Versiones literales: PrusaSlicer 2.7.0 (binary por defecto), firmware 5.1.0
  (MINI, MK4, XL).
- **Riesgo concreto de sobre-lectura:** el artículo dice que el binario es
  compresión y codificación de bloques, pero **no dice que los metadatos
  desaparezcan**. Quien cocine no debe concluir de aquí que un `.bgcode` no
  lleva los mismos comentarios; este documento no lo afirma.
- El nombre de la librería y que tiene bindings de Python es literal, y es
  relevante si la guía explica cómo se lee un fichero.
- Lo que **no** hay: ningún ejemplo de comentario concreto dentro de un
  `.gcode` ni de un `.bgcode`. Para eso, las fuentes de OrcaSlicer y Cura.
- He omitido el menú, el bloque de idiomas y los 14 comentarios.
- No se ha traducido nada.
