---
title: "2019 review — local-first arrives, security maturing"
date: 2019-12-29T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 31
excerpt: "BLE presence finally works. Glass-break sensors caught the failure mode contact sensors miss. The kid's bedroom dashboard joined the kitchen."
pullquote: "Looking back: 5.5/8 on 2018's forecasts. ~73%. The miss was Frigate's maturity — running on a Pi without a Coral, the detection was too slow."
cover: "../../assets/blog/2019-in-review-and-2020-forecast-cover.png"
coverAlt: "2019 review — local-first arrives, security maturing"
---

End of year. Pattern.

## Scoring the 2018 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Wink platform collapses | 70% | Still limping — investor injections kept them alive | ✗ |
| Glass-break / vibration sensors | 85% | Two Ecolinks + 6 Aqara DJT11LM installed | ✓ |
| HA Companion App fixes BLE presence | 75% | iOS 12.2 + Companion 2.0 → works | ✓ |
| Frigate object detection lands | 60% | Project alive, but RPi-only is slow; Coral USB helps but I haven't bought one | ✗ (partial) |
| Smart lock | 80% | Not yet — kept punting | ✗ |
| Matter still vapor | 50% | Project CHIP announced Dec — rumored, no products | ✓ (it's vapor, as predicted) |
| Second wall dashboard | 70% | Kid's room dashboard installed July | ✓ |
| Aqara outdoor sensors | 60% | Aqara T1 outdoor motion shipped in China; no US distribution yet | ✗ (partial) |

5.5/8 = **73%**. Frigate underperformed; smart lock was just a procrastination problem. The Wink miss is starting to look like "they have nine lives."

## What got added this year

- **8× Aqara DJT11LM vibration sensors** on critical windows + doors (August).
- **2× Ecolink GBHA1 glass-break detectors** (August).
- **DIY SHT31 sensors** in 4 rooms (October-December). MQTT to HA.
- **Aeotec Doorbell 6** as in-house siren (May).
- **Second iPad mini wall dashboard** in master bedroom (July).
- **Roomba 980** (October). Vacuum joined the family. iRobot's HA integration works (HA → iRobot cloud → Roomba), latency 2-5s for "start vacuuming" command.

## Forecast for 2020

**1. Matter / Project CHIP makes serious progress but no products. (Confidence: 60%)** First spec draft mid-2020. Devices 2021+.

**2. Apple Watch as a smart-home control surface. (Confidence: 70%)** With watchOS adding more first-party complications + HA Companion App watch support, the wrist becomes useful for "is the front door locked" glances.

**3. Smart lock finally happens. (Confidence: 90%)** Yale Assure Z-Wave. This year for real.

**4. Frigate matures with a Coral. (Confidence: 75%)** Buying a Coral USB. Frigate's gotten plugin-mature; expect daily-driver-quality object detection on the cams by mid-year.

**5. HA's z-wave integration overhaul. (Confidence: 80%)** The OpenZWave-based HA Z-Wave integration is creaking. The community-rumored Z-Wave JS rewrite would be a major reliability + ergonomic upgrade.

**6. Z-Wave 700-series in real products. (Confidence: 65%)** Aeotec, Zooz both teased 700-series devices for 2020. Lower power, better range, slightly different chip.

**7. Wink either folds or pivots to monthly subscription. (Confidence: 60%)** They're financially desperate. Expect drama.

**8. A coordinated work-from-home automation set. (Confidence: 50%)** As more friends WFH, sharing "I'm in a meeting → flip the desk light red" automations becomes common.

## What I'm buying in 2020

- Coral USB Accelerator ($75) when Frigate's worth it.
- Yale Assure Z-Wave lock + Z-Wave deadbolt module.
- Aqara temp/humidity sensors for outdoor placement.
- A Pi 4 (4GB) — the Pi 3 is starting to feel slow under load.
