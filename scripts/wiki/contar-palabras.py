#!/usr/bin/env python3
"""Cuenta palabras de un artículo de la wiki, de forma reproducible.

El método está escrito porque el revisor cita un número en su informe y ese
número tiene que poder comprobarlo cualquiera. Las reglas son:

  1. Se quita el frontmatter. No es prosa, es configuración.
  2. Se quitan las URLs de los enlaces: `](https://…)` pasa a `]`. Un enlace no se
     lee, y contar `https://wiki.bambulab.com/en/filament-acc/…` como palabras
     inflaría el número en decenas.
  3. Se cuentan secuencias de letras, con acentos y apostrophes.

Uso: python3 contar-palabras.py <fichero.md>
"""
import re
import sys

ruta = sys.argv[1]
texto = open(ruta, encoding="utf-8").read()

texto = re.sub(r"\A---\n.*?\n---\n", "", texto, flags=re.S)
texto = re.sub(r"\]\([^)]*\)", "]", texto)
texto = re.sub(r"https?://\S+", " ", texto)
texto = re.sub(r"`[^`]*`", " ", texto)

palabras = re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ’']+", texto)
print(f"{len(palabras)} palabras")
