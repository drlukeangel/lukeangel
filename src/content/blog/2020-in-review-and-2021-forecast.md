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
excerpt: "The pandemic year. Internet outages cost more, local-first paid off. The Z2M migration finished, the Yale Assure lock finally went on the door, Frigate got a Coral — and Wink showed the whole category what platform risk really looks like."
pullquote: "Looking back: ~7/8 on 2019's forecasts, the best year since I started scoring. Smart lock and the Coral hit; Wink pivoted to a ransom-note subscription instead of folding; the Z-Wave rewrite is right on the doorstep but not quite shipped. The pandemic compressed two years of smart-home maturation into nine months."
cover: "../../assets/blog/2020-in-review-and-2021-forecast-cover.svg"
coverAlt: "A 2020 scorecard motif — verdict marks against the year's forecast beside a smart-home hub that kept running while the internet link to it was cut, the pandemic year local-first paid off."
---

2020 done. Pattern.

## Scoring the 2019 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Matter / CHIP makes serious progress | 60% | First spec drafts; no products | ✓ (partial) |
| Apple Watch as control surface | 70% | Companion App watch support shipped in June | ✓ |
| Smart lock | 90% | Yale Assure Z-Wave installed (March) | ✓ |
| Frigate matures with Coral | 75% | Bought a Coral USB in May; Frigate 0.8 + person detection working | ✓ |
| HA Z-Wave overhaul | 80% | OpenZWave 1.6 beta in flight; the Z-Wave JS rewrite is imminent but not shipped as an HA integration yet | ✓ (partial — landing early next year) |
| Z-Wave 700-series in real products | 65% | Aeotec shipped the first 700-series units — Z-Stick 7, Door/Range Extender 7 | ✓ |
| Wink folds or subscribes | 60% | Wink dropped a surprise $5/mo subscription in May — pay up or your hub bricks. Bleeding users | ✓ |
| Coordinated WFH automations | 50% | The "in-meeting → flip desk light red" automation became real for me + 4 friends | ✓ |

Six clean hits plus two partials — call it **7/8, ~88%**. Best year since I started keeping score.

![The 2020 scorecard as a ledger against the 2019 forecast. Six green hits — Apple Watch as a control surface, the Yale smart lock installed, Frigate matured with a Coral, the first Z-Wave 700-series products from Aeotec, Wink's pivot to a forced subscription, and the work-from-home automations — sit beside checks. Two amber partials: Matter making spec progress but no products, and the HA Z-Wave rewrite imminent but not quite shipped. A tally on the right reads about 7 of 8, roughly 88%, the best score yet, with a note that the pandemic is what made the local-first case land.](../../assets/blog/smart-home-2020-forecast-scorecard.svg) The pandemic did that: when the internet going down meant the kids' school and both our jobs dropped at once, every reason to pull the house local stopped being theoretical.

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

![Why local-first paid off in 2020, drawn as the house LAN with the internet link cut. Home Assistant on a Pi 4 sits at the center running automations locally, wired to four local subsystems — Zigbee2MQTT on a CC2652 stick for sensors, Z-Wave for the Yale lock and alarm, Frigate plus a Coral for PoE-camera object detection, and ESPHome devices over MQTT for DIY temperature and humidity. All of that lives inside a box labelled "the house LAN — runs without internet." A single dashed line runs out to a cloud/WAN box, and it is severed by a red X marked "link cut"; the cloud box notes it was down four times this year and now only carries push notifications. The point: when the WAN drops, everything inside the LAN keeps running and only notifications queue.](../../assets/blog/2020-in-review-and-2021-forecast-fig-2.svg)
- **Frigate.** Person-vs-car-vs-dog object detection on the porch cam means push notifications only fire for actual people, not for the mail carrier's truck. False positive rate dropped from ~10/day to ~1/week.
- **Auto-arming alarm.** Family hasn't manually armed in 6 weeks. Just works.
- **Yale lock auto-locking**. Front door locks itself 5 minutes after the last person leaves the geofence. Wife loves this — she used to worry whether she'd locked the door.

## What didn't

- **Voice assistants for control during the workday.** Both Echo and Google Home picked up enough TV / Zoom audio that they fired false-positive wake-words almost daily. Wife's coworker once heard "Alexa, set timer 5 minutes" in the background of a Zoom call. The Echoes got muted.
- **Apple HomePod (refurbished, bought July)**. Still a great speaker. Siri still fumbles smart-home commands. Sold it October.

## Forecast for 2021

**1. Frigate + multi-camera person-tracking. (Confidence: 80%)** Frigate 0.10+ rumored to support cross-camera identity tracking (person enters porch cam → recognized as the same person when they enter the side-yard cam).

**2. Matter / CHIP first dev spec released. (Confidence: 80%)** CSA's been steady; Q1 2021 likely. No consumer products in 2021 — those are 2022.

**3. The "Aqara hub" replacement story.** (Confidence: 65%) Aqara keeps hinting at Matter-readiness. A future Aqara hub that speaks Matter natively could shift the cheap-Zigbee ecosystem. Rumored; nothing concrete yet.

**4. ESPHome on a dozen more DIY devices. (Confidence: 90%)** The bathroom SHT31 was a one-off; ESPHome made me realize how cheap and easy DIY is. Plant moisture, garage temperature, mailbox door — all coming.

**5. The Aeotec Heavy Duty Switch finally goes on the garage door. (Confidence: 75%)** Z-Wave-controlled relay + Hall-effect sensor for "is the garage door open?" — finally automate this.

**6. A second PoE camera + a fourth — front, back, side, driveway. (Confidence: 85%)** Going to spec a 4-channel PoE system in early 2021.

**7. Voice assistant fatigue gets formalized. (Confidence: 60%)** Either Alexa/Google add a "Zoom mode" mic-off, or they bleed users. WFH households are tired of accidental triggers.

**8. Wink finally fully collapses. (Confidence: 70%)** They've been on life support for years. The $5/month subscription bought them a year. 2021 is the year.

## What I'm buying in 2021

- 3× Reolink RLC-820A PoE cameras (4K, person detection on-device backup to Frigate).
- ESP32-based DIY ambient + moisture sensors for ~12 locations.
- A spare CC2652-based Zigbee coordinator (a second slaesh stick) as a cold backup for the Z2M setup.
- A Zooz garage door controller for the actual garage automation.
