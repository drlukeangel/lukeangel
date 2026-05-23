---
title: "2018 review — Lovelace, leak shutoff, smoke + CO"
date: 2018-12-26T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
series: smart-home-iot-journey
seriesOrder: 27
excerpt: "HA Lovelace shipped (predicted). HomePod shipped — mediocre (predicted). Water shutoff + smoke / CO on the platform (predicted)."
pullquote: "Looking back: 6.5/8 on 2017's forecasts. ~81%. Better than 2016 (64%) and 2015 (71%), worse than 2013 (83%). The arc seems to be: my confidence calibration is improving; my Apple-timing intuition is not."
---

End of year. Pattern continues.

## Scoring the 2017 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Lovelace UI overhaul | 80% | Shipped April | ✓ |
| Apple HomePod ships | 95% | Yes — February. Mediocre | ✓ |
| Leak + smoke detector integrations | 90% | Five leak sensors + main valve (August); three ZCOMBOs (October) | ✓ |
| Conbee → Z2M migration | 70% | Not done — Z2M docs intimidating, didn't get to it | ✗ |
| Wink finally folds | 50% | They're still limping; raised more emergency funding | ✗ (partial) |
| Cameras enter HA | 75% | Reolink in HA, two cameras now | ✓ |
| iBeacon + room-level presence | 65% | Partial — beacons placed, automations being refined | ½ |
| Real dashboard on the wall | 70% | iPad mini 2 + Heckler mount + Lovelace, kitchen | ✓ |

6.5/8 = **81%**. Best year since 2013. My calibration is improving on technology timing; still bad on platform-execution (Wink stays alive longer than it deserves to).

## What got added this year

- **HA 0.65 → 0.85 across the year**. Lovelace, the Z-Wave 2.0 integration overhaul, the iOS Companion App going to 1.0 in May. Major HA growth.
- **5× Aeotec Water Sensor 6** (August). Five places.
- **1× Zooz ZAC36 motorized ball valve** (August). Main inlet.
- **3× First Alert ZCOMBO smoke + CO** (October). Replaces old Kiddes.
- **1× Aeotec Doorbell 6** (November). Siren mode for security automation.
- **1× Refurbished iPad mini 2 + Heckler mount** (April). Kitchen wall dashboard.
- **1× Reolink RLC-410 front porch** (September). Second camera.
- **iOS Companion App on both phones** (May → November). Person tracking via Apple Location, room-level beacon presence.

## What works at year-end

- **Lovelace + custom cards** on the kitchen wall. The family uses it daily. Five-year-old taps "Goodnight 🌙."
- **Leak detection + main valve shutoff**. Fired exactly once for real (a slow drip behind the dishwasher I hadn't noticed). Saved an unknown amount of subfloor damage.
- **Smoke + CO interconnect via HA**. Tested with the "test alarm" Z-Wave command on the kitchen ZCOMBO. All three sounded within a second. Lights to white at max bright. Push notifications fired correctly.
- **iBeacons in three rooms** (kitchen, master bedroom, basement workshop). Per-room presence working roughly 80% of the time — when the iPhone's BLE scanner is in a usable state.

## What still doesn't

- **iBeacon presence reliability**. iOS aggressively backgrounds BLE scanning; the Companion App's room-level detection is unreliable enough that I haven't built load-bearing automations on top of it.
- **Z2M migration**. Conbee + deCONZ still working but the community is moving to Z2M. Going to do it in 2019.
- **HomePod**. Bought one in March. It's a great speaker. It's a mediocre voice assistant. Siri's knowledge graph is years behind Google's. Returned it in April.

## Forecast for 2019

**1. The Wink platform finally collapses. (Confidence: 70%)**

Three years of "Wink will fold" predictions, finally betting hard. Wink's quality-of-life has been declining; their cloud outages are weekly now. The community on r/homeautomation is full of "migrating off Wink" posts. They're not going to make it through 2019 without either folding or being acquired (probably folding — no one wants the bad-quality Wink brand).

**2. Glass-break and vibration sensors enter my house. (Confidence: 85%)**

Aqara DJT11LM vibration sensors and a few generic Z-Wave glass-break (Ecolink) are on the shopping list. Expanding the security arc to non-door entry detection.

**3. The HA Companion App fixes background presence. (Confidence: 75%)**

Apple's adding new BLE background scan permissions in iOS 13 (rumored for September). The HA Companion App should be able to use them. Room-level presence reliability should jump to 95%+.

**4. Frigate or equivalent local-only object detection in HA. (Confidence: 60%)**

There's a project called Frigate (started this year, open-source, runs on RPi with a Coral USB accelerator) that does local-only object detection on RTSP camera streams. Person / car / dog / package classification. If it matures, replaces cloud-based "is this a person" services. I'm watching.

**5. A smart lock — finally. (Confidence: 80%)**

I've been resistant. Yale Assure has Z-Wave and HomeKit support, $250. Decision year.

**6. Matter is rumored but doesn't ship. (Confidence: 50%)**

The CSA (Connectivity Standards Alliance, formerly Zigbee Alliance) is starting to make noises about a unified protocol. Apple + Google + Amazon + Samsung all on board. Code name floating around: "Project CHIP" (Connected Home over IP). 2020 launch maybe; 2019 will be rumors only.

**7. A second wall dashboard. (Confidence: 70%)**

The kitchen one is great; family wants one in the master bedroom for a "nightstand" version. Picking up a second iPad mini 2 refurb.

**8. Aqara expands to outdoor sensors. (Confidence: 60%)**

Aqara has been adding products quarterly. Outdoor IP66-rated motion + temperature is rumored for 2019. If it lands, replaces the patchwork of outdoor lighting + sensor setups I have.

## What I'm buying in 2019

- A Yale Assure lock (Z-Wave + HomeKit).
- Two Ecolink Z-Wave glass-break sensors.
- A few Aqara vibration sensors for windows.
- A second iPad mini + wall mount (master bedroom dashboard).
- A Coral USB Accelerator if Frigate matures.

## What's next

April 2019 post: BLE room-presence with the HA Companion App, after iOS 12.2 ships some improvements.
