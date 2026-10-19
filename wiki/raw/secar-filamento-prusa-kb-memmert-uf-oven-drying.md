---
titulo: "Drying filament in Memmert UF-series universal oven"
url: https://help.prusa3d.com/article/drying-filament-in-memmert-uf-series-universal-oven_913458
sitio: help.prusa3d.com
tipo: oficial
capturado: 2026-10-19
autor: Prusa Research
idioma: en
---

# Drying filament in Memmert UF-series universal oven

Drying filament before printing is a critical step when working with high-performance materials. The Memmert UF-series ovens offer precise temperature control, active ventilation, and adjustable humidity exhaust, making them ideal for drying hygroscopic filaments before use. Unlike passive storage solutions, a **drying oven actively removes moisture already present inside the filament**.

[tip-callout]
To maintain low humidity during printing, we recommend using the Prusa Pro Filament Drybox.
[/callout]

[imagen:]

We offer two models: **UF30** and **UF55**. Both provide identical functionality, with the only difference being internal volume. Both models are available on our eshop at prusa3d.com.

## Product specifications

| **Model** | **Internal volume** | **Max temperature** | **External dimensions (W x D x H)** | **Power** |
| **UF30** | 32 liters | 300 °C | 585 x 510 x 705 mm | 1.6 kW |
| **UF55** | 53 liters | 300 °C | 745 x 584 x 864 mm | 2.1 kW |

**Oven features:**

- precise temperature control up to 300 °C

- adjustable exhaust flap for controlled humidity removal

- controllable fan speed for optimized airflow

**Official Memmert user manuals and quick start guides**

[note-callout]
Please note: The Memmert UF-series drying oven is a product of Memmert GmbH + Co. KG and is not manufactured by Prusa Research.
[/callout]

We recommend **reviewing the official Memmert documentation before using the oven for drying filament**. The manuals include safety information, installation, interface instructions, maintenance, and advanced configuration options. All the manuals are available on the official memmert.com.

## Inserting filament

You can place **up to four Prusament spools** upright inside the oven for batch drying. Ensure there is space between spools and that they do **not touch the heating surfaces** (left, right, top, and bottom sides).

For drying a single spool, you may also lay it flat on the wire shelf. The shelf height can be adjusted to fit various spool sizes.

[callout]
Only insert **unwrapped filament spools**. Do not dry filament in its original packaging.
[/callout]

[callout]
Do not insert multiple different materials simultaneously, as **each material requires different drying settings**.
[/callout]

| [imagen:] | [imagen:] |

### Exhaust flap settings

The exhaust flap, located at the rear of the Memmert oven, regulates the exhaust airflow and influences how much moist air is removed from the chamber. Fresh air is drawn in passively through intake vents, preheated in a separate channel, and introduced into the chamber. The flap position determines the overall air exchange rate, which impacts both drying performance and temperature stability.

The flap can be adjusted from **0% (closed)** to **100% (fully open)** in 10% increments using the control display.

[callout]
Do not attempt to force or adjust the flap position manually.
[/callout]

**Flap positions**

- 0% (closed): The exhaust flap is fully closed. Moist air is retained longer in the chamber, and fresh air intake is minimal. This setting favors stable internal temperature but reduces moisture removal.

- 50% (partially open): At 50%, the flap is partially open, angled at 45 degrees. This position allows for a balanced air exchange, introducing some fresh air while still maintaining a controlled environment. It is suitable for most drying processes.

- 100% (fully open): When the flap is fully open, the oven operates in fresh air mode. This position allows for maximum air exchange, introducing a significant amount of fresh air and removing exhaust air.

| [imagen:] | [imagen:] |

### Recommended settings for drying

A fan speed of **70 %** and flap position of **30 %** is a commonly used setting that balances airflow and temperature stability. These values are not mandatory but have worked well in our internal testing. Exact settings may vary depending on material and oven load.

For a comprehensive list of recommended drying temperatures and times for various filament types, consult our dedicated Drying filament article.

## Material handling process

[callout]
**Do not open the oven during operation**. Internal components such as shelves, walls, and air outlets may reach high temperatures and can cause burns. **Always wear heat-resistant gloves when opening the oven** or handling any parts inside.
[/callout]

- Place filament spool(s) in the chamber as described and close the door.

- Select the Temperature on the control display and turning the knob to adjust the temperature to target value. Press the rotary knob to confirm.

| [imagen:] | [imagen:] |

[note-callout]
For details on how to operate the control display and its capacitive buttons, please refer to section *6.4 Operating the Appliance* in the official Memmert *User manual*.
[/callout]

- Set the Fan speed. Press the rotary knob to confirm.

- Set the Flap position. Press the rotary knob to confirm.

- Set the desired time on the Timer. The timer will start immediately after confirmation by pressing the knob.

[tip-callout]
Keep the timer set to start once the target temperature is reached (default setting). This ensures accurate drying time. For details, see section *8.3.5 Timer Mode* in the official Memmert *User manual*.
[/callout]

- The oven will now begin the drying process.

- After drying, immediately transfer the filament spool into the filament dry box and close it to prevent reabsorption of moisture.

[note-callout]
Note: The humidity display on the LCD will spike when the dry box is opened. **It's critical for it to return to 10% after closing**. If it doesn't, you'll need to replace the desiccant. To do this, refer to the How to replace the desiccant' guide for the Prusa Pro Filament Drybox.
[/callout]

- Connect the dry box to the printer and begin printing.

Ensure that the filament path between the dry box and printer is not exposed to ambient humidity, to prevent reabsorption of moisture after drying.

## Notas del recolector

- **Aviso técnico sobre cómo se obtuvo el cuerpo:** el KB de Prusa se sirve como aplicación
  React y el texto vive en el fragmento oculto `<div hidden id="S:1">`. La conversión
  automática a Markdown de esta URL devuelve un 200 con cuerpo vacío. El texto de arriba se
  ha extraído de ahí.
- **Esta página NO da temperaturas de secado de filamento.** Es la guía de uso del horno
  Memmert UF-series (UF30 y UF55), que Prusa vende en su tienda pero **no fabrica**: la propia
  página lo dice en un recuadro («is a product of Memmert GmbH + Co. KG and is not
  manufactured by Prusa Research»). Las únicas cifras de temperatura que aparecen son las
  del horno (300 °C máximo, 32 y 53 litros de volumen interno) y los ajustes de trabajo
  (velocidad de ventilador 70 %, posición de la compuerta de extracción 30 %). **Ninguna de
  esas cifras es una temperatura de secado de filamento** (gate 1 del brief).
- **La tabla de temperaturas por material NO está aquí:** la página remite explícitamente a
  su artículo «Drying filament», que es la otra fuente de este lote. Por eso las dos van
  juntas: esta explica el procedimiento y la otra los números.
- **Aporta la parte de almacenamiento tras el secado, que es el hueco que cubre el brief:**
  «After drying, immediately transfer the filament spool into the filament dry box and close
  it to prevent reabsorption of moisture»; después, «Ensure that the filament path between
  the dry box and printer is not exposed to ambient humidity».
- **Aporta un criterio de cambio del desecante** que no aparece en la página de Prusament:
  el display de humedad de la caja debe volver al 10 % al cerrarla; si no vuelve, hay que
  cambiar el desecante. Ese 10 % es el criterio del dispositivo, no una propiedad del
  filamento (gate 4).
- **Aporta el procedimiento de horno con sus límites**, que es lo que separa «secar con
  horno» de «secar mal»: no abrir el horno durante la operación, guantes resistentes al
  calor, insertar solo carretes sin su embalaje original («Do not dry filament in its
  original packaging») y no mezclar materiales en la misma tanda («each material requires
  different drying settings»). El temporizador debe arrancar cuando se alcanza la
  temperatura objetivo, no cuando se enciende el horno.
- **Contexto de seguridad útil:** la cámara puede alcanzar temperaturas que causan
  quemaduras, y los carretes no deben tocar las superficies calientes.
- La página está marcada como «Relevant for: HT90, MK4 family».
- No se han capturado los comentarios. Las imágenes no tienen texto alternativo y van como
  `[imagen:]`; las tablas de dos columnas sin texto son montaje de capturas en paralelo.
- El texto original está en inglés y no lo he traducido.
