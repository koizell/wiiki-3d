#!/usr/bin/env python3
"""
Control de idioma para la prosa del repo.

Tres capas, con precisiones distintas y por eso reglas distintas.

CAPA 1 — Alfabetos que no tienen aquí nada que buscar: chino, japonés, coreano,
cirílico, griego, árabe, hebreo, devanagari, tamil, tailandés, armenio, georgiano.
Se resuelve por rangos de punto de código, no por rango de caracteres literales,
porque los literales se descabalan al pasar por bash.

CAPA 2 — Una lista de regresión de palabras que **de verdad** se han colado en este
repo. No se intenta detectar inglés en general: con una lista amplia el ratio de
falsos positivos sube tanto que deja de servir, porque `has` y `esta` también son
español. Cada entrada de la lista es un fallo que ocurrió de verdad.

CAPA 3 — Alfabetos dentro de la lista de la capa 2, para que un fragmento en
chino o ruso escrito en el sitio de una palabra listada también salte.

Regla general que resuelve la mayoría de los falsos positivos: una palabra entre
acentos graves, o dentro de un enlace Markdown, es código o cita literal, no
prosa propia. Se quita y se vuelve a mirar; si el hallazgo desaparece, no cuenta.
Eso cubre las claves del frontmatter, las fuentes en inglés citadas textualmente,
y la propia lista de este script, que documenta palabras prohibidas.

`wiki/raw/` queda fuera de las capas 2 y 3: es la fuente cruda, en su idioma
original por definición, y ahí sólo hay texto citado.

Uso:
    idiomacheck.py <fichero> [<fichero> ...]
    idiomacheck.py --mensaje <fichero>
Sale con código 1 si hay hallazgos.
"""

import re
import sys
import unicodedata

ALFABETOS = (
    "CJK", "IDEOGRAPHIC", "HIRAGANA", "KATAKANA", "HANGUL", "THAI", "CYRILLIC",
    "GREEK", "ARABIC", "HEBREW", "DEVANAGARI", "TAMIL", "ARMENIAN", "GEORGIAN",
)

# Lista de regresión. Una entrada por fallo real en este repo.
COLADOS = re.compile(
    r"\b(Inbound|raises|Symptoms|symptom|bubby|situation|pièces|prayed|"
    r"esITING|appeared|malzada)\b"
)

# Se quita antes de mirar: acentos graves, enlaces Markdown, URLs, claves de
# frontmatter y cabeceras de tabla.
QUITAR = [
    re.compile(r"`[^`]*`"),
    re.compile(r"\]\([^)]*\)"),
    re.compile(r"https?://\S+"),
    re.compile(r"^\s*[-*>#|]*\s*[A-Za-z_-]+:\s"),
    re.compile(r"^\s*[-*=|:#\s]+$"),
]


def es_wiki_raw(ruta: str) -> bool:
    return "/wiki/raw/" in ruta or ruta.startswith("wiki/raw/")


def limpiar(linea: str) -> str:
    for patron in QUITAR:
        linea = patron.sub(" ", linea)
    return linea


def revisar(ruta: str) -> list[str]:
    hallazgos: list[str] = []
    # Un fichero sin extensión es un nombre de ruta, no prosa.
    if "." not in ruta.split("/")[-1]:
        return []

    with open(ruta, encoding="utf-8") as fh:
        for n, linea in enumerate(fh, 1):
            # Capa 1: alfabetos, en la línea entera, Included en código y citas.
            for ch in linea:
                if ord(ch) < 128:
                    continue
                nombre = unicodedata.name(ch, "?")
                if any(a in nombre for a in ALFABETOS):
                    hallazgos.append(
                        f"  ESCRITURA NO LATINA  linea {n}: {nombre} (U+{ord(ch):04X})"
                    )

            # Capas 2 y 3: sólo en la prosa.
            if es_wiki_raw(ruta):
                continue
            if COLADOS.search(limpiar(linea)):
                hallazgos.append(f"  PALABRA QUE YA SE HA COLADO  linea {n}: {linea.strip()[:80]}")

    return hallazgos


def main() -> None:
    args = sys.argv[1:]
    etiqueta = "el mensaje de commit"
    if args and args[0] == "--mensaje":
        args = args[1:]
    else:
        etiqueta = "los ficheros"

    todos: list[str] = []
    for ruta in args:
        h = revisar(ruta)
        if h:
            todos.append(f"*** {ruta} ***")
            todos.extend(h)

    if todos:
        print("\n".join(todos))
        print(f"\n{sum(1 for x in todos if not x.startswith('***'))} hallazgo(s) en {etiqueta}")
        print("revisar antes de commitear")
        sys.exit(1)

    print(f"idioma: {etiqueta} limpio")


if __name__ == "__main__":
    main()