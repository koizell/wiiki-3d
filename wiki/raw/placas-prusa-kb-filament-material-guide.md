---
titulo: "Filament Material Guide (Prusa Knowledge Base)"
url: https://help.prusa3d.com/materials
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-16
autor: Prusa Research
idioma: en
---

# Filament Material Guide (Prusa Knowledge Base)

Web-based interactive table (Prusa 3D). Export to PDF. Columns: Material; Hardware (Enclosure, Drybox, Hardened nozzle, Nozzle, Bed); Temperatures (Nozzle, Bed); Sheets (Textured, Smooth PEI, Satin, Special — PA Nylon, PP, HT / HighTemp); Physical features (Easily soluble, Heat deflection, Impact resistance, Tensile strength). The values below were captured from the rendered page in text (the interactive interface did not convert the whole table to Markdown).

Filters present on the page: All; Food safe; Suitable for tiny parts; Low warping; High tenacity; Heatbed not required; Impact resistance; Chemical resistance; Suitable for mechanical parts; Temperature resistance; Composite; Dissolvable; UV resistance; Flexible or bendable; Support material.

### Table (text extracted from the rendered page)

MATERIAL | HARDWARE | TEMPERATURES | SHEETS | PHYSICAL FEATURES
Enclosure | Drybox | Hardened nozzle | Nozzle | Bed | Textured | Smooth PEI | Satin | Special PA Nylon | PP | HT

PLA: Heatbed not? (columns: No / - / No) ; 185-235 °C ; 50-60 °C ; First, print with PP (for PP sheet), otherwise unspecified.

PETG: No / No / No ; 215-270 °C ; 70-90 °C ; with glue stick (Textured/Smooth/Satin as applicable); Cleaned with water.

PETG HT: No / No / No ; 270 °C ; 110 °C ; with glue stick; Cleaned with water.

Glow in the dark: No / No / Yes ; 260 °C ; 85 °C ; with glue stick.

ASA: Recommended / No / No ; 220-275 °C ; 90-110 °C ; with glue stick (Smooth); with glue stick (Satin).

ABS: Recommended / No / No ; 230-255 °C ; 95-110 °C ; with glue stick; with glue stick.

PC (Polycarbonate): Recommended / No / No ; 270-275 °C ; 100-115 °C ; with glue stick; with glue stick.

CPE: No / Yes / No ; 275 °C ; 90-110 °C ; with glue stick.

PVA / BVOH: No / Yes / No ; 195-215 °C ; 60 °C.

HIPS: No / No / No ; 225-255 °C ; 100-110 °C.

PP (Polypropylene): - / No / No ; 220-245 °C ; 70-100 °C ; with PP tape.

Flex: No / - / No ; 220-260 °C ; 40-85 °C ; with glue stick.

nGen: No / No / No ; 240 °C ; 90 °C ; with glue stick.

PA (Nylon): Recommended / Yes / No ; 240-285 °C ; 70-115 °C ; with glue stick (Smooth); with glue stick (Satin).

Composite materials: - / - / Yes ; 225-290 °C ; 40-120 °C.

Wood / metal filled: No / No / - ; 190-270 °C ; 60-100 °C.

PVB: No / No / No ; 215 °C ; 75 °C.

PEI (filament): Yes / Necessary / - ; 90-190 °C (bed?)/ 430 °C nozzle? ; 150 °C bed ; with MagiGoo HT.

Notes from the rendered page: PLA bed 50-60 °C and sheet guidance «First, print with PP» (PP sheet); PETG/PETG HT/ABS/ASA/PC/CPE require glue stick on Smooth/Satin; Textured generally does not mention glue except specific cases; PA nylon sheet requires glue stick except for polyamides; PP sheet uses PP tape.

(The table above is a best-effort textual reconstruction of the rendered interactive grid; the original columns and ordering live on the URL. Values such as "First, print with PP" and "Cleaned with water" were preserved verbatim from the rendered text.)

## Notas del recolector

- Capturado con `webfetch` en modo `text` y complementado con `markdown`; la página es una matriz interactiva y el contenido de la tabla sólo se pudo obtener como texto plano aplanado. La calidad de la conversión a tabla Markdown aquí es manual (reconstrucción); se avisa de ello.
- Fuente oficial Prusa: matriz de compatibilidad filamento ↔ chapa y temperaturas de tobera/cama para cada familia de material, además de necesidad de glue stick/PP tape/MagiGoo HT según chapa. Da cifras para ~20 familias de material (PLA 185-235 °C nozzle / 50-60 °C cama; PETG 215-270 / 70-90; ABS 230-255 / 95-110; ASA 220-275 / 90-110; PC 270-275 / 100-115; PA 240-285 / 70-115; PC-HighTemp etc.).
- Crucial para el tema "placas": en Prusa la chapa Textured apenas requiere glue, la Smooth PEI exige glue para todo excepto PLA y la PA Nylon/PP son específicas.
- Se descartaron los menús, banners y newsletter del sitio; sólo se conservó la tabla y su explicación. Texto original en inglés sin traducir.