---
title: "2017 review — Home Assistant lands, cheap Zigbee opens"
date: 2017-12-28T17:30:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
series: smart-home-iot-journey
seriesOrder: 23
excerpt: "HA on the Pi. Z-Wave + Zigbee local. Six Aqara door sensors. SmartThings hub heading to the spare-parts drawer."
pullquote: "Looking back: 5/8 on 2016's forecasts. ~64% — my worst year so far. Two of the misses were timing (Apple HomePod slipped, Echo Show shipped earlier than I expected). The big call I got right: Home Assistant is the unifier I'd been waiting for since 2013."
---

2017 done. Time for the year-end pattern.

## Scoring the 2016 forecast

Eight predictions for 2017:

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Install HA on a Pi | 90% | Did it in July | ✓ |
| Apple HomePod ships in 2017 | 80% | Announced June, delayed to 2018 | ✗ |
| SmartThings v2 hub | 70% | Samsung announced ADT-partnered hub but no new mainline | ✗ |
| Aqara/Xiaomi Zigbee in US | 70% | Yes (via AliExpress) | ✓ |
| Matter / unified protocol | 10% | Nothing | ✓ (the "no" held) |
| Amazon Echo Show / screen-Echo | 75% | Echo Show launched June | ✓ |
| Google opens routines | 60% | Google Home Routines launched October | ✓ |
| Wink bankruptcy / pivot | 30% | Wink limped along, raised emergency funding | ✗ (partial credit; they're zombies, not dead) |

5/8 with one partial = ~64%. My worst year so far. Two of the three misses were Apple-timing-related (HomePod) or Samsung-timing (SmartThings v2). The Wink prediction was too aggressive.

The big call I got right: **Home Assistant is the unifier**. Eight months in, HA is more capable than SmartThings + Hue + Lutron combined, runs locally, and is configurable in version-controlled YAML.

## What got added to the house this year

- **Raspberry Pi 3 + microSD + Aeotec Z-Stick Gen5 + Conbee II** (March-September). The HA stack.
- **6× Aqara door/window sensors** (November). Total contact-sensor count: 6 (up from 2 last year).
- **1× Aqara human-body sensor** (November). Hallway upstairs.
- **2× Aqara wall plugs** (November). Zigbee router function + small-load switching.
- **1× Aqara vibration sensor** (December). Dryer "load done" detector.
- **2× iPhone X with HA Companion App** (November). Phone-based presence detection, GPS + iBeacon-equivalent room-level via the app.
- **3× IKEA TRÅDFRI bulbs** (April). Closet and laundry — cheap Zigbee bulbs.
- **A Reolink RLC-410 PoE camera** (Dec 2016, set up properly this March). Backyard, RTSP into Synology Surveillance Station.

## What works at year-end

- **HA is the brain.** All security automations, all sensor-driven logic, all dashboards — HA. Latency < 1 second across the board (local).
- **Aqara sensors at scale.** $10 door sensors mean I have one on every exterior door + several interior priority locations. Six are running, three more on the way.
- **The Companion App + iBeacon presence.** Phone GPS for "home / not home"; iBeacons placed in specific rooms for "which room am I in." The room-presence side is new this month and changes what's possible for automations.

## What still doesn't

- **HA dashboards.** The default Lovelace UI is functional but ugly. I want to build a wall-mounted dashboard for the kitchen. Project for 2018.
- **The Reolink camera in HA.** RTSP works for recording in Surveillance Station; I can't easily display the live feed in HA without ffmpeg gymnastics. Coming.
- **Apple HomePod's nonexistence.** Pushed to 2018. The HomeKit gap continues.
- **Multi-protocol single-hub.** Three radios in the closet (Z-Wave, Zigbee via Conbee, Hue Zigbee via the Hue bridge). Wish I could collapse these into one.

## Forecast for 2018

**1. HA's Lovelace UI gets a real overhaul. (Confidence: 80%)**

The dashboard is the weakest part of HA today. The community knows it. Lovelace as a customizable UI layer is supposed to ship in 2018. Major improvement expected.

**2. Apple finally ships HomePod. (Confidence: 95%)**

It's been promised twice. 2018 is the year — or the project gets quietly killed. I'd bet ships, but mediocre.

**3. Water leak + smoke detector integrations land in HA. (Confidence: 90%)**

I already have the Aeotec Water Leak. Going to add a Z-Wave smoke detector this year (probably the First Alert ZCOMBO). Automations: water leak → automatic main-water shutoff (need a Z-Wave water valve too) + push notification + lights to red. Smoke → call 911? Probably not 911; just notification + lights to red.

**4. The Conbee/deCONZ → Zigbee2MQTT migration. (Confidence: 70%)**

deCONZ works but Z2M's community + device support is bigger. Going to migrate the Aqara devices to Z2M. Expect a weekend project.

**5. Wink finally folds. (Confidence: 50%)**

Three years of bad cloud reliability + the parent company (Quirky) bankruptcy + Flex Capital ownership. Wink is a deadbeat in slow motion. 2018 might be the year.

**6. Cameras enter HA. (Confidence: 75%)**

I have one PoE camera. Going to add more (front porch, side yard). The ffmpeg + RTSP integration in HA is improving; should be usable by mid-2018. NVR side: Synology works but I want Frigate-class local object detection when that ships (rumored).

**7. iBeacon + room-level presence becomes the default. (Confidence: 65%)**

The iBeacon experiment this month is good. Going to deploy beacons in every major room and add presence automations like "Luke walks into kitchen + after sunset → kitchen lights warm".

**8. A real dashboard hanging on a wall. (Confidence: 70%)**

A tablet (probably an old iPad mini) mounted in the kitchen running a fullscreen Lovelace dashboard. Building it this winter.

## What I'm buying in 2018

- Z-Wave water valve (Zooz ZAC36 or equivalent) + water leak sensors on every floor.
- First Alert ZCOMBO smoke + CO detector (Z-Wave).
- Front-porch PoE camera + side-yard PoE camera.
- Old iPad mini (refurb) as kitchen wall dashboard.
- Maybe an Apple HomePod if reviews are kind.

## What's next

May 2018: a post on building the first Lovelace dashboard. Should arrive after the new HA UI lands.
