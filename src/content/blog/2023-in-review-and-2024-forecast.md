---
title: "2023 review — built the house, kitchen has an OS"
date: 2023-12-29T16:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 47
excerpt: "Construction finished. Move-in October. Family Hub fridge running. 42 Cat6 drops paying off already. 2022 forecast scored 85%."
pullquote: "Looking back: 6.5/8 on 2022's forecasts, ~85%. The new house transformed the smart home from 'a layer on top of a house' to 'the house was designed for this.' Different rules apply now."
---

## Scoring the 2022 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| New house construction | 95% | Yes — moved in October | ✓ |
| Structured wiring + PoE backbone | 100% | 42 Cat6 + 12 conduit + 6 PoE camera locations | ✓ |
| Samsung Bespoke kitchen | 90% | Fridge in (October); rest comes early 2024 | ✓ (partial) |
| First Matter devices | 85% | 3 Eve sensors + 1 Nanoleaf bulb live in HA via Matter | ✓ |
| Frame TV in great room | 80% | Yes, installed November | ✓ |
| HA migrates to new house | 95% | Yes, October | ✓ |
| Wall-mounted touchscreens | 80% | 2 of planned 3 installed; office one delayed | ✓ (partial) |
| Old-house gear migrates | 100% | All Z-Wave + most Zigbee migrated | ✓ |

6.5/8 = **85%**. Best year since 2013 (also 83%). Construction-driven predictions are easier — you control the budget and timeline.

## What got added in the new house

Beyond the structured wiring + Family Hub fridge already documented:

- **Lutron Caseta Pro 2 Smart Bridge** (rack-mounted in closet). 40+ Caseta switches throughout the house.
- **UniFi 24-port PoE switch + UDM Pro router** in the closet.
- **HA Yellow** mounted in the closet (DIN rail).
- **6 Reolink PoE cameras**: front, side, back, garage interior, doorbell, pool fence.
- **Frame TV 65"** (great room) with mounted-flush install. SmartThings hub function active.
- **Samsung Galaxy Tab A8** wall-mounted (kitchen) running Fully Kiosk Browser with HA Lovelace.
- **iPad mini 6** wall-mounted (master bedroom) — second dashboard.
- **3 Eve Matter motion sensors** — first real Matter devices. Joined HA via the Matter beta integration.
- **1 Nanoleaf Matter bulb** — testing Matter Light cluster compatibility.
- **DIY ESPHome sensors** — 24 total in the new house (up from 22 in the old).

## What works year-end

- **Local-first survives the move.** During the move week, the home network was flaky (cable provisioning); all the local automations kept running.
- **Family Hub as a SmartThings hub.** Bridged into HA.
- **Frame TV as a secondary SmartThings hub.** Mostly used for casting from the Family Hub.
- **42 Cat6 drops.** Already used 38 of them. The "future-proofing" is paying off.

## What didn't (yet)

- **The mailbox sensor.** ESPHome firmware works but the LoRa coverage from the structured-wiring closet to the curb (60 ft, through the house wall + landscaping) isn't reliable. Going to try a different antenna mount in spring.
- **The pool fence camera.** Installed, but the angle is wrong — too much fence in the frame, not enough pool. Re-mounting in spring.

## Forecast for 2024

**1. Full Samsung Bespoke kitchen — oven, dishwasher, washer/dryer. (Confidence: 95%)** Already on order. March install.

**2. EV charger install. (Confidence: 85%)** Tesla Wall Connector or Wallbox Pulsar — undecided. April-ish.

**3. Matter devices proliferate. (Confidence: 80%)** By end of 2024, 20+ Matter devices in the house probably. Locks (Eve), sensors (Eve, Aqara), thermostats (Ecobee gets Matter), bulbs (more Nanoleaf).

**4. Frame TV ecosystem post. (Confidence: 95%)** June 2024 — the Frame as household display surface + SmartThings hub + media player.

**5. The third wall-mounted dashboard (office). (Confidence: 80%)** Promised, delayed; doing in Q1.

**6. AI sensor classification in Frigate. (Confidence: 60%)** OpenCV / DeepStack alternatives mature; getting "the cat is on the kitchen counter" detection working.

**7. Tesla Powerwall reconsidered. (Confidence: 40%)** Decided against in 2022 but the natural-gas generator's monthly maintenance + emissions are nagging. Re-evaluate.

**8. A second LoRa gateway. (Confidence: 65%)** For redundancy + extending range further into the yard.

## What I'm buying in 2024

- Samsung Bespoke Oven (NE63B8211SS/AA) + Dishwasher (DW80B7070US/AA) + Washer/Dryer (WF50A8800AV/A5).
- EV charger (Tesla Wall Connector, 48A, gen 3) — once the panel upgrade goes through.
- ~10 more Matter devices as they ship.
- A second Coral if needed.
