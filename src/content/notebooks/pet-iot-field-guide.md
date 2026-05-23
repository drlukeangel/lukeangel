---
title: "Pet IoT — An Engineer's Field Guide"
summary: "Twelve years of connected pet devices. Whistle 2013, Petnet's 2020 cloud collapse, smart litter, the AirTag-on-pet question, Halo Collar, Mars Petcare consolidation, DIY local-first."
accent: "#c87533"
---

Atom (Lab, 2013-2024). Joule (cat, 2014-). Boson (cat, 2020-). Quark (Lab, 2022-). Dogs got tracked first because Whistle shipped dogs first. Cat IoT trailed the dog side by ~3 years on every axis — devices, vitals, multi-pet features.

| Years | What shipped | What broke |
|---|---|---|
| 2013-2017 | BLE + cellular fitness trackers, microchip doors | Single-pet assumption everywhere |
| 2018-2020 | LTE-M battery (Fi), early vitals, smart litter | Petnet's 9-day cloud outage |
| 2021-2024 | Vet-grade vitals (Whistle Health), AirTag, Halo Collar | Mars Petcare owns the stack — food, clinics, collars, analytics |
| 2024-2025 | DIY ESP32 feeders, Find My pet trackers, Tractive's CAT 6 Mini fills the 12-year cat-tracker gap | Mars divests Whistle to Tractive (July 2025); Whistle's cloud goes dark August 31 |
| 2025- | Tractive's Base Station ships an nRF52840 used as plain BLE | 2025 silicon, 2013 architecture — the radio is capable of more than the firmware uses |

Smart-pet-health tag threads from 2021 onward where consumer collars crossed into vet-grade telemetry.

Before buying anything in this category: real-world battery life, not claimed numbers. Device behavior when the vendor cloud is unreachable. Whether there's a no-subscription mode. Whether you can export the data. What else the vendor sells.
