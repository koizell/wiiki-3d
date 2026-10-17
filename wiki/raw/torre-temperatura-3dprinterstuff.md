---
titulo: "How to Print and Read a Temperature Tower (Step by Step)"
url: https://www.3dprinterstuff.com/workshop/temperature-tower-calibration
sitio: 3dprinterstuff.com
tipo: oficial
capturado: 2026-10-17
autor: 3D Printer Stuff editorial team
idioma: en
---

[\</\>](/)

3D Printer StuffMaker Workshop

[Workshop](/workshop)[Printer DBNew](/tools/3d-printer-db)[Filament DB](/tools/filament-comparison-database)[Cost Calc](/tools/filament-cost-calculator)[Time Est.](/tools/print-time-estimator)[Contact](/contact)

[Workshop](/workshop)/How to Print and Read a Temperature Tower (Step by Step)

# How to Print and Read a Temperature Tower (Step by Step)

This article may contain affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. This helps us keep creating free content.

![How to Print and Read a Temperature Tower (Step by Step)](https://images.unsplash.com/photo-1741848137437-56fb14b7ba87?w=1200&h=630&fit=crop)

Every spool of filament has a temperature sweet spot. The label says "190-220°C" but that's a range, not an answer. Print too cold, and you get weak layer adhesion and under-extrusion. Print too hot, and you get stringing, oozing, and blobby surfaces. The temperature tower tells you exactly where your specific filament performs best, in about 45 minutes and a few grams of plastic.

Run a temp tower for every new spool, even for a brand you have printed before. Different colors from the same manufacturer can have different optimal temperatures by 5-10°C because the pigments affect the melt behavior. Here is the whole process, step by step.

## What a Temperature Tower Tests

A temperature tower is a single print with multiple sections, each printed at a different temperature. The model is designed so each section includes features that are sensitive to temperature changes:

![How to Print and Read a Temperature Tower (Step by Step) — practical guide overview](https://images.unsplash.com/photo-1642969164999-979483e21601?w=1200&h=630&fit=crop)

How to Print and Read a Temperature Tower (Step by Step)

- **Bridging**, horizontal spans between two points with no support underneath

- **Overhangs**, angled surfaces at 30°, 45°, and 60°

- **Stringing**, thin pillars with gaps that show [retraction](/workshop/retraction-settings-explained) performance at temperature

- **Fine detail**, small text or geometric features

- **Surface finish**, flat walls that reveal layer consistency

Each section is labeled with its temperature, so when the print finishes you can physically inspect each one and compare.

## Step 1: Download the Model

Search Thingiverse or Printables for "temperature tower", there are dozens. I recommend the "Smart Compact Temperature Tower" by gaaZolee on Printables. It's compact (uses minimal filament), includes bridging and overhang tests, and has clear temperature labels.

![How to Print and Read a Temperature Tower (Step by Step) — step-by-step visual example](https://images.unsplash.com/photo-1739169169463-450148af26ce?w=1200&h=630&fit=crop)

How to Print and Read a Temperature Tower (Step by Step)

For PLA, grab the version that covers 190-220°C in 5°C increments. That gives you 7 sections: 220, 215, 210, 205, 200, 195, 190\. Most PLA lands somewhere in the 200-215°C range, but you'd be surprised how often the "wrong" temperature is where a filament shines.

## Step 2: Set Up in Cura (Change at Z Method)

Here's the setup if you're using [Cura](/workshop/cura-best-settings-pla):

1. Import the temperature tower STL into Cura

2. Set your starting temperature to the highest value (220°C for PLA)

3. Go to **Extensions → Post Processing → Modify G-Code**

4. Click Add a script → ChangeAtZ

5. Set "Change Height" to the Z height where the second section starts (usually 8\.2 mm for most temp tower models, check the model description)

6. Set the new temperature to 215°C

7. Repeat: add another ChangeAtZ script for each section, 210°C at 16\.4 mm, 205°C at 24\.6 mm, etc.

The exact Z heights depend on your specific model. Each section is typically 8\.0-8.2 mm tall. Count the sections, check the [layer height](/workshop/layer-height-guide-012-vs-028), and calculate. With 0\.2 mm layers, each section is 40-41 layers.

![How to Print and Read a Temperature Tower (Step by Step) — helpful reference illustration](https://images.unsplash.com/photo-1603974739154-7b055aeec101?w=1200&h=630&fit=crop)

How to Print and Read a Temperature Tower (Step by Step)

**Pro tip:** In [PrusaSlicer](/workshop/prusaslicer-vs-cura), it's even easier. Right-click the layer slider on the right side, select "Add height range modifier," and set a new temperature for each range. No [post-processing](/workshop/how-to-waterproof-3d-prints-coatings-settings) script needed.

## Step 3: Print Settings

Use your normal print settings for everything except temperature. The point is to isolate temperature as the only variable:

- **Layer height:** 0\.2 mm (standard)

- **Speed:** 50-60 mm/s (your normal speed)

- **Retraction:** Keep your current settings, don't change them for this test

- **Bed temp:** Your normal PLA bed temp (60°C is standard). If you're testing PETG, check your [PETG bed temp settings](/workshop/the-perfect-bed-temperature-for-petg-3d-printing)

- **Cooling:** 100% fan after layer 3 (normal PLA settings)

- **Infill:** 10-15% is fine, this is a test, not a structural part

The print should take 35-50 minutes depending on your speed and the tower model. Use minimal filament, usually 8-15 grams.

## Step 4: Reading the Results

This is the critical part. Once the print finishes and cools, inspect each section systematically. Here's what to look for:

![How to Print and Read a Temperature Tower (Step by Step) — detailed close-up view](https://images.unsplash.com/photo-1733602860281-741b0608f00f?w=1200&h=630&fit=crop)

How to Print and Read a Temperature Tower (Step by Step)

### Bridging

Look at the horizontal bridge on each section. A good bridge is flat, with no drooping in the middle. Too hot and the middle sags visibly. Too cold and the filament doesn't stick to the anchor points and you get a messy gap. Pick the section where the bridge is flattest.

### Stringing

Check the gaps between the small pillars. You want zero strings (thin filament hairs) between them. Higher temperatures cause more stringing because the melted filament is less viscous and oozes during travel moves. If every section strings, your retraction settings also need tuning, but that's a different [calibration](/workshop/input-shaper-calibration-eliminate-ghosting-print-faster).

### Overhangs

Look at the angled surfaces. The 45° overhang should be clean at almost any temperature. The 60° overhang is the real test, too hot and it droops, too cold and the layers don't bond properly and you get curling. Find the temp where the 60° overhang is smoothest.

### Layer Adhesion

Try to snap each section by bending it. Higher temperatures produce better layer adhesion because the new layer bonds more thoroughly to the one below. If you're printing functional parts that need strength, prioritize the section that's hardest to break, even if the surface finish isn't quite as pretty.

### Surface Finish

Inspect the flat walls. Consistent, smooth layers with no blobbing or rough patches indicate good temperature. Too hot and you'll see shiny spots and blobs. Too cold and you'll see matte, slightly rough texture from incomplete inter-layer flow.

## Interpreting Conflicting Results

Here's the real-world scenario: 210°C gives the best bridging, but 215°C gives the best layer adhesion, and 205°C has the least stringing. Which do you pick?

For **functional parts** (brackets, mounts, tools): prioritize layer adhesion. Go with the higher temperature.

For **visual/display models** (figurines, decorative items): prioritize surface finish and minimal stringing. Go with the lower temperature.

For **general purpose**: pick the temperature in the middle of the range that performs well across all categories. Usually that's 5°C above the best stringing temperature.

**Watch out:** Don't skip this test just because "everyone uses 200°C for PLA." Optimal temperatures across PLA spools range from 195°C to 218°C. Your specific spool on your specific printer has its own sweet spot.

Once you find your temperature, write it on the spool with a marker. Seriously, future you will thank past you. And pair this with the right filament from [our PLA brands guide](/workshop/best-pla-filament-brands-2026) to get consistently excellent results.

Published by the 3D Printer Stuff editorial team. Published March 30, 2026. Updated September 12, 2026.

Editorial responsibility: see [Imprint](/imprint).

Spotted an error or have something to add? [corrections@3dprinterstuff.com](mailto:corrections@3dprinterstuff.com)

Share with fellow makers:[X](https://x.com/intent/tweet?text=How%20to%20Print%20and%20Read%20a%20Temperature%20Tower%20\(Step%20by%20Step\)&url=https%3A%2F%2Fwww.3dprinterstuff.com%2Fworkshop%2Ftemperature-tower-calibration "Share on X")[Telegram](https://t.me/share/url?url=https%3A%2F%2Fwww.3dprinterstuff.com%2Fworkshop%2Ftemperature-tower-calibration&text=How%20to%20Print%20and%20Read%20a%20Temperature%20Tower%20\(Step%20by%20Step\) "Share on Telegram")[E-Mail](mailto:?subject=How%20to%20Print%20and%20Read%20a%20Temperature%20Tower%20\(Step%20by%20Step\)&body=How%20to%20Print%20and%20Read%20a%20Temperature%20Tower%20\(Step%20by%20Step\)%0A%0Ahttps%3A%2F%2Fwww.3dprinterstuff.com%2Fworkshop%2Ftemperature-tower-calibration "Share on E-Mail")Link

calibrationtemperatureprint settingsguide

[](/workshop)

📖

Explore more

All articles on 3D Printer Stuff →

🔧

### Maker Tips, Delivered

New guides, filament tests, and project ideas — every week in your inbox.

🎁 Free bonus: 3D Printing Starter Checklist (PDF)

Join the Workshop

I agree to the [Privacy Policy](/privacy).

[🧭Part of our topic hub: Print Settings & Calibration→](/print-settings-calibration)

### You might also like

[](/workshop/the-perfect-bed-temperature-for-petg-3d-printing)

![The Perfect Bed Temperature for PETG 3D Printing](https://images.unsplash.com/photo-1741848137437-56fb14b7ba87?w=1200&h=630&fit=crop)

#### The Perfect Bed Temperature for PETG 3D Printing

PETG bed adhesion is a balancing act — too cold and it pops off, too hot and it fuses to the build plate. Here are the exact temperatures that work across surfaces.

[](/workshop/3d-printing-miniatures-resin-settings-perfect-detail)

![3D Printing Miniatures: Resin Settings for Perfect Detail](https://plus.unsplash.com/premium_photo-1739510199025-5316d5bb9e45?w=1200&h=630&fit=crop)

#### 3D Printing Miniatures: Resin Settings for Perfect Detail

Resin printers can produce tabletop miniatures with detail that rivals injection-molded models. Here are the exact exposure settings, support strategies, and post-processing steps for flawless minis.

[](/workshop/hepa-filtration-3d-printers-guide)

![HEPA Filtration for 3D Printers: Do You Need It?](https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&h=630&fit=crop)

#### HEPA Filtration for 3D Printers: Do You Need It?

3D printers emit ultrafine particles and VOCs, especially with ABS and resin. Here's what the research says about filtration, which setups actually work, and when you need one.

### Comments (0)

#### Leave a comment

Comments are reviewed before publishing.

Submit comment

🔧

### Maker Tips, Delivered

New guides, filament tests, and project ideas — every week in your inbox.

🎁 Free bonus: 3D Printing Starter Checklist (PDF)

Join the Workshop

I agree to the [Privacy Policy](/privacy).

\</\>3D Printer Stuff

Honest guides and maker tutorials for 3D printing enthusiasts. From first layer to finished project.

Navigate

[Workshop](/workshop)[About](/about)[Printer DatabaseNew](/tools/3d-printer-db)[Filament Database](/tools/filament-comparison-database)[Filament Calculator](/tools/filament-cost-calculator)[Print Time Estimator](/tools/print-time-estimator)[Contact](/contact)

© 2026 3D Printer Stuff

[Imprint](/imprint)[Privacy](/privacy)[Terms](/terms)

As an Amazon Associate we earn from qualifying purchases.

## Notas del recolector

- Guía completa con secciones de qué mide la torre (bridging, overhangs, stringing, layer adhesion, surface finish), cómo configurarla en Cura/PrusaSlicer, cómo leer resultados y cómo resolver resultados contradictorios (funcional vs visual).
- Incluye rango típico PLA 195-218 °C y aviso de que colores del mismo fabricante varían 5-10 °C.
- El texto original está en inglés. Se ha conservado tal cual, incluyendo navegación del sitio.