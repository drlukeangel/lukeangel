---
title: "2022 review — Matter shipped, LoRa garden worked"
date: 2022-12-27T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 43
excerpt: "Matter 1.0 ratified, LoRa garden automation working, Frigate matured. House sale process started — we're building."
pullquote: "Looking back: 5.5/8 on 2021's forecasts, ~70%. Matter hit on schedule, ESPHome exploded as predicted, HA Yellow shipped. The miss: Tesla Powerwall didn't happen — going natural-gas for backup power in the new build."
cover: "../../assets/blog/2022-in-review-and-2023-forecast-cover.png"
coverAlt: "2022 review — Matter shipped, LoRa garden worked"
---

## Scoring the 2021 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Matter 1.0 ships | 75% | Yes — October ratification | ✓ |
| Frigate 0.12 face recognition | 65% | 0.12 shipped but face-rec is OpenAI-via-DoubleTake, not native | ✗ (partial) |
| New-house build planning | 90% | Plans drawn, lot purchased, build starts Q2 2023 | ✓ |
| ESPHome continues exploding | 95% | 22 ESP devices now (was 14) | ✓ |
| Aqara Matter bridge | 70% | M2 hub shipped, Matter via firmware Q4 | ✓ |
| Home Assistant Yellow | 80% | Shipped August | ✓ |
| Weather station DIY | 60% | Half-built; not done | ✗ (partial) |
| Tesla Powerwall in new build | 50% | Decided against — going natural-gas generator | ✗ |

5.5/8 = **70%**. Solid.

## What got added this year

- **LoRa garden irrigation** + 8 RAK soil sensors + 3 B-Hyve valves.
- **22× ESPHome devices** total (added 8 this year): outdoor temp/humidity, plant moisture, garage door reed switch, mailbox open detector.
- **Aqara M2 hub** as the Thread Border Router (December).
- **Home Assistant Yellow** with HA OS — replaced the Pi 4 as the primary HA host.
- **Second Coral USB** (December) for the Frigate Pi.

## The big news: we're building

Bought a lot in October. Construction starts Q2 2023. Custom build = first time I'm designing a connected home from the wires up. Every wall stud is an opportunity to run Cat6.

## Forecast for 2023

**1. New-house construction. (Confidence: 95%)** Q2 - Q4 2023.

**2. Structured wiring + PoE backbone designed. (Confidence: 100%)** Every room gets ≥ 2 Cat6 drops. Garage and outdoor zones get PoE conduit. This is the buildable-once decision.

**3. Samsung Bespoke kitchen suite. (Confidence: 90%)** Fridge + oven + dishwasher + washer/dryer in matching panels. The Family Hub fridge gets the touchscreen.

**4. First Matter devices on the network. (Confidence: 85%)** A few Eve Matter sensors, a Nanoleaf Matter bulb, maybe a thermostat.

**5. Frame TV in the great room. (Confidence: 80%)** Doubles as art frame + Samsung SmartThings hub.

**6. HA migrates to the new house Q4 2023. (Confidence: 95%)** Plan: physical move of HA Yellow + Z-Stick + Sonoff dongle. Some sensors stay; most get re-installed.

**7. A wall-mounted touchscreen in every floor's main room. (Confidence: 80%)** Three iPad-mini dashboards minimum.

**8. The current house's smart-home gear migrates. (Confidence: 100%)** Most devices come with us; the wiring obviously doesn't.

## What I'm buying in 2023

- Lots of Cat6 (1000 ft box).
- 8 PoE cameras for the new place (5 currently, adding 3 more zones).
- Samsung Bespoke kitchen (fridge, oven, dishwasher, washer/dryer).
- A Frame TV (65" in the great room).
- 8-10 in-wall structured wiring keystones.
- A 24-port managed PoE switch (Cisco SG350-28P or UniFi 24-port-PoE-Pro).
