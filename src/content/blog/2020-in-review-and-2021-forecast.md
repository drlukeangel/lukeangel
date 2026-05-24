---
title: "2020 review — local-first arrived early, alarm landed"
date: 2020-12-30T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 35
excerpt: "The pandemic year. Internet outages cost more, local-first paid off. Z2M migration done. Z-Wave JS replaced OpenZWave. Yale Assure lock — finally."
pullquote: "Looking back: 6.5/8 on 2019's forecasts, ~78%. Smart lock and BLE presence hit; Wink still alive; Matter still vapor. The pandemic compressed two years of smart-home maturation into nine months."
cover: "../../assets/blog/2020-in-review-and-2021-forecast-cover.png"
coverAlt: "2020 review — local-first arrived early, alarm landed"
---

2020 done. Pattern.

## Scoring the 2019 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Matter / CHIP makes serious progress | 60% | First spec drafts; no products | ✓ (partial) |
| Apple Watch as control surface | 70% | Companion App watch support shipped in June | ✓ |
| Smart lock | 90% | Yale Assure Z-Wave installed (March) | ✓ |
| Frigate matures with Coral | 75% | Bought a Coral USB in May; Frigate 0.8 + person detection working | ✓ |
| HA Z-Wave overhaul | 80% | Z-Wave JS shipped, migrated | ✓ |
| Z-Wave 700-series in real products | 65% | Zooz ZEN15 plugs (700-series) shipped — bought 3 | ✓ |
| Wink folds or subscribes | 60% | Wink launched a $5/mo subscription. Bleeding users | ✓ (partial — they pivoted) |
| Coordinated WFH automations | 50% | The "in-meeting → flip desk light red" automation became real for me + 4 friends | ✓ |

6.5/8 = **78%**. Best year since 2013 (83%).

## What got added this year

- **Yale Assure Lock Z-Wave** + ZW3 module (March). Replaces the brass deadbolt; auto-locks after geofence-leave.
- **Coral USB Accelerator** + Frigate 0.8 (May). Object detection on PoE cameras, person/car/dog classification at 10 fps per stream.
- **Zooz ZEN15 plugs (3×)** (April). Replaced the last Wemos.
- **DIY ESP-based temperature/humidity sensors** in 8 rooms (Oct-Dec). ESPHome firmware, MQTT to HA, $6 per sensor in parts.
- **Pi 4 4GB** + SSD-via-USB3 (June). Migrated HA off the Pi 3 + microSD. Massive performance bump.
- **The alarm panel** (November). Auto-arms via geofence.
- **Roomba i7+** with self-emptying base (December — Christmas to ourselves).

## What worked this year

- **Local-first.** Survived four internet outages during the year (cable, fiber, both) with no smart-home degradation beyond push notifications queueing.
- **Frigate.** Person-vs-car-vs-dog object detection on the porch cam means push notifications only fire for actual people, not for the mail carrier's truck. False positive rate dropped from ~10/day to ~1/week.
- **Auto-arming alarm.** Family hasn't manually armed in 6 weeks. Just works.
- **Yale lock auto-locking**. Front door locks itself 5 minutes after the last person leaves the geofence. Wife loves this — she used to worry whether she'd locked the door.

## What didn't

- **Voice assistants for control during the workday.** Both Echo and Google Home picked up enough TV / Zoom audio that they fired false-positive wake-words almost daily. Wife's coworker once heard "Alexa, set timer 5 minutes" in the background of a Zoom call. The Echoes got muted.
- **Apple HomePod (refurbished, bought July)**. Still a great speaker. Siri still fumbles smart-home commands. Sold it October.

## Forecast for 2021

**1. Frigate + multi-camera person-tracking. (Confidence: 80%)** Frigate 0.10+ rumored to support cross-camera identity tracking (person enters porch cam → recognized as the same person when they enter the side-yard cam).

**2. Matter / CHIP first dev spec released. (Confidence: 80%)** CSA's been steady; Q1 2021 likely. No consumer products in 2021 — those are 2022.

**3. The "Aqara hub" replacement story.** (Confidence: 65%) Aqara has been moving toward Matter-readiness. Their G3 hub (rumored) speaks Matter natively. Could shift the cheap-Zigbee ecosystem.

**4. ESPHome on a dozen more DIY devices. (Confidence: 90%)** The bathroom SHT31 was a one-off; ESPHome made me realize how cheap and easy DIY is. Plant moisture, garage temperature, mailbox door — all coming.

**5. The Aeotec Heavy Duty Switch finally goes on the garage door. (Confidence: 75%)** Z-Wave-controlled relay + Hall-effect sensor for "is the garage door open?" — finally automate this.

**6. A second PoE camera + a fourth — front, back, side, driveway. (Confidence: 85%)** Going to spec a 4-channel PoE system in early 2021.

**7. Voice assistant fatigue gets formalized. (Confidence: 60%)** Either Alexa/Google add a "Zoom mode" mic-off, or they bleed users. WFH households are tired of accidental triggers.

**8. Wink finally fully collapses. (Confidence: 70%)** They've been on life support for years. The $5/month subscription bought them a year. 2021 is the year.

## What I'm buying in 2021

- 3× Reolink RLC-820A PoE cameras (4K, person detection on-device backup to Frigate).
- ESP32-based DIY ambient + moisture sensors for ~12 locations.
- A Sonoff ZBDongle-E (the newer chip) for the eventual Z2M upgrade.
- A Zooz garage door controller for the actual garage automation.
