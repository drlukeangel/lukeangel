---
title: "2021 in review — cameras everywhere, Coral landed. 2022 forecast."
date: 2021-12-28T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 39
excerpt: "Five PoE cameras + one WiFi cam, all routing through Frigate + Coral. The doorbell experience finally landed. Wink folded for real."
pullquote: "Looking back: 6/8 on 2020's forecasts, ~75%. Cameras hit, ESP DIY hit, Wink hit, Matter still vapor. The miss: voice-assistant fatigue formalization (Amazon/Google did nothing about it — Echo/Google Home stay muted in our house)."
---

End of year.

## Scoring the 2020 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Frigate + multi-camera person-tracking | 80% | Frigate 0.11 added tentative re-id; works ~60% | ✓ (partial) |
| Matter / CHIP first dev spec | 80% | Spec drafts circulating, no consumer products yet | ✓ (partial) |
| Aqara hub replacement story | 65% | Aqara M2 hub shipped — Matter-ready hardware | ✓ |
| ESPHome on a dozen DIY devices | 90% | 14 ESP-based sensors deployed | ✓ |
| Aeotec Garage Door Controller | 75% | Installed October | ✓ |
| Second + fourth PoE cameras | 85% | 5 PoE + 1 WiFi cameras now | ✓ |
| Voice assistant fatigue formalized | 60% | Amazon/Google did nothing | ✗ |
| Wink folds for real | 70% | Yes — service shut down July | ✓ |

6/8 + 2 partials = ~75%. Decent year.

## What got added

- **5× PoE cameras** (Reolink RLC-820A + RVD doorbell + RLC-822A): porch, backyard, side yard, driveway, doorbell.
- **1× WiFi camera** (Reolink Argus 3 Pro): garage.
- **Coral USB Accelerator** + Frigate 0.10 → 0.11.
- **Aeotec Garage Door Controller** (Z-Wave, October).
- **14× ESP-based DIY sensors** (ESPHome firmware): SHT31 temp/humidity in 4 bathrooms + kitchen, PIR motion in 3 corner-rooms, plant moisture in 6 indoor planters.
- **Sonoff ZBDongle-E** (December) — newer Zigbee coordinator, +50% range vs the ZBDongle-P. Migration planned for January.

## Forecast for 2022

**1. Matter 1.0 ships, first products by Q4. (Confidence: 75%)** CSA's been steady. Q3-Q4 launch.

**2. Frigate 0.12+ with proper face recognition. (Confidence: 65%)** Optional, opt-in. Useful for "the kids are home from school" without GPS.

**3. New-house build planning starts. (Confidence: 90%)** We're outgrowing the current house. Going to plan a connected-from-the-walls-up build in 2022 with construction in 2023.

**4. ESPHome continues exploding. (Confidence: 95%)** 20+ DIY sensors by end of year.

**5. Aqara Matter-bridge for existing Zigbee devices. (Confidence: 70%)** Aqara has telegraphed it.

**6. Home Assistant Yellow ships. (Confidence: 80%)** HA-branded hardware. Buying one.

**7. A "weather station" DIY project. (Confidence: 60%)** ESP-based + a bunch of sensors. Outdoor temp / humidity / pressure / wind / rain. Replacement for the increasingly-unreliable home weather station I bought 5 years ago.

**8. Tesla Powerwall integration. (Confidence: 50%)** Considering solar + Powerwall for next house. If so, the Powerwall has a (semi-)open API that integrates with HA.

## What I'm buying in 2022

- HA Yellow ($150).
- Another Coral USB if Frigate face recognition shipping.
- 6-10 more ESPHome boards + sensors.
- A real solar/wind/rain weather station if I can't DIY it well enough.
