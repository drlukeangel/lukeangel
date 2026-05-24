---
title: "Pet IoT — An Engineer's Field Guide"
summary: "Atom got the first Whistle in October 2013. Joule, Boson, and Quark came later. Twelve years of every shipping pet device, every protocol shift, every vendor collapse and acquisition — kept the way an engineer keeps notebooks, in the order it happened."
accent: "#c87533"
cover: "../../assets/blog/pet-iot-field-guide-cover.svg"
coverAlt: "Pet IoT — An Engineer's Field Guide"
---

October 2013. Atom — an eight-week-old yellow Lab — comes home. Two months later, the first Whistle Activity Monitor goes on his collar. The first instrument in what becomes a twelve-year experiment that grows to include Joule (cat, 2014), Boson (cat, 2020), and Quark (Lab, 2022), and the connected-pet category that comes to exist around them.

The data is real. The patterns are only visible in long-arc. Cat IoT trailed the dog side by about three years on every axis — devices, vitals, multi-pet features — the dedicated cellular cat tracker gap closed in late 2022 with Tractive's GPS Cat Mini, and the health-vitals generation arrived with the CAT 6 Mini (April 2026, launched with Health Intelligence resting HR + respiratory rate monitoring).

| Years | What shipped | What broke |
|---|---|---|
| 2013-2017 | BLE + cellular fitness trackers, microchip doors | Single-pet assumption everywhere |
| 2018-2020 | LTE-M battery (Fi), early vitals, smart litter | Petnet's 9-day cloud outage |
| 2021-2024 | Vet-grade vitals (Whistle Health), AirTag, Halo Collar, GPS Cat Mini (late 2022 — first form-factor-right cellular cat tracker) | Mars Petcare owns the stack — food, clinics, collars, analytics |
| 2024-2025 | DIY ESP32 feeders, Find My pet trackers, Tractive DOG 6 vitals go independent | Mars divests Whistle to Tractive (July 2025); Whistle's cloud goes dark August 31 |
| 2025- | Tractive's Base Station ships an nRF52840 used as plain BLE; CAT 6 Mini launches April 2026 with Health Intelligence (resting HR + respiratory rate) | 2025 silicon, 2013 architecture — the radio is capable of more than the firmware uses |

Smart-pet-health tag threads from 2021 onward where consumer collars crossed into vet-grade telemetry.

Before buying anything in this category: real-world battery life, not claimed numbers. Device behavior when the vendor cloud is unreachable. Whether there's a no-subscription mode. Whether you can export the data. What else the vendor sells.
