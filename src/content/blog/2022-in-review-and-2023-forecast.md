---
title: "2022 review — Matter shipped, the LoRa garden worked"
date: 2022-12-27T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 43
excerpt: "Matter 1.0 ratified on schedule. The LoRa garden ran a full season unattended. Frigate's face recognition slipped to next year. And the biggest news isn't a gadget — we bought a lot, and I get to wire a house from the studs out."
pullquote: "5.5 of 8 on last year's forecast — about 70%. Matter hit on schedule, ESPHome kept exploding, HA Yellow shipped. The honest miss: I scored myself a Powerwall and then talked myself out of it."
cover: "../../assets/blog/2022-in-review-and-2023-forecast-cover.svg"
coverAlt: "A year-end scorecard of checks and crosses beside the foundation lines of a house plan, marking the pivot from a retrofitted home to one wired from the studs out."
---

Every December I score last year's forecast honestly — the misses included — and then bet on the next twelve months. This year the scorecard is solid, but the headline isn't on it. The headline is that we bought a lot, and 2023 is the year I stop retrofitting and get to wire a house from the studs out.

First, the receipts.

## Scoring the 2022 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Matter 1.0 ships, products by Q4 | 75% | [CSA ratified Oct 4](/blog/matter-1-0-ships-protocol-primer/); the big four committed Nov 3. Products thin so far | ✓ |
| Frigate 0.12 + proper face recognition | 65% | 0.11 shipped (Sept); face-rec still isn't native — only bolt-on via DoubleTake. 0.12 slipped to 2023 | ✗ (partial) |
| New-house build planning starts | 90% | Plans drawn, lot purchased in October, framing Q2 2023 | ✓ |
| ESPHome keeps exploding | 95% | 22 ESP devices now, up from 14 | ✓ |
| Aqara Matter-bridge for Zigbee | 70% | M2 hub shipped; Matter-via-firmware arriving Q4 | ✓ |
| Home Assistant Yellow ships | 80% | Shipped; it's the primary HA host now | ✓ |
| A DIY weather station | 60% | Half-built. The wind/rain sensors are still in a box | ✗ (partial) |
| Tesla Powerwall in the plan | 50% | Talked myself out of it — going natural-gas standby instead | ✗ |

5.5 of 8 = **70%**. The two partials are both timing, not bad calls: Frigate's face recognition is real, it just isn't *native* yet, and the weather station is a weekend I never spent. The clean miss is the Powerwall — I forecast it at a coin-flip and then the math on solar-plus-storage for our climate didn't close, so the new build gets a natural-gas standby generator instead. Honest is honest.

The Frigate line deserves a footnote, because it's the kind of thing I'd want a teammate to flag rather than fudge: I scored myself a "0.12 with face recognition." What actually landed in 2022 was **0.11**, in September, which added *sub-labels* — the hook that lets an external recognizer like DoubleTake (running CompreFace under it) write a name back onto an event. That's face recognition you wire up yourself, not face recognition in the box, and the 0.12 release that's supposed to clean it up is now a 2023 problem. So: partial, not a hit. I bought a second Coral in December anyway, betting on 0.12 landing early next year.

![The 2022 scorecard: five clean hits — Matter 1.0 ratified on schedule, the new-build planning done with the lot purchased, ESPHome past twenty devices, the Aqara Matter bridge shipped, and Home Assistant Yellow now the primary host — against two timing-slip partials (Frigate face recognition still bolt-on, not native; the DIY weather station half-built) and one clean miss (no Tesla Powerwall — going natural-gas standby instead). About seventy percent, with the misses all timing rather than wrong calls.](../../assets/blog/2022-smart-home-scorecard.svg)

## What got added this year

- **[LoRa garden irrigation](/blog/outdoor-watering-with-soil-moisture/)** — the project I'm proudest of. Eight RAK soil sensors and three B-Hyve valves, talking LoRa to a gateway, watering off real soil-moisture data instead of a dumb timer. Ran a full season unattended and skipped watering through the wet weeks on its own.

![The LoRa garden irrigation loop, left to right. Eight RAK soil sensors in the beds report moisture percentages over a sub-GHz LoRa link — drawn as radio arcs — to a LoRa gateway that forwards readings to Home Assistant via MQTT. Home Assistant holds the decision: is moisture below the setpoint? If a zone is dry it opens the valve; if it's wet it skips the cycle. From there, control fans out to three B-Hyve valves driving the vegetable beds, the borders, and the lawn drip. The caption states the whole point: watering off real soil data, not a dumb timer — and it ran a full season unattended.](../../assets/blog/2022-in-review-and-2023-forecast-fig-2.svg)
- **22 ESPHome devices** total, eight added this year: outdoor temp/humidity, plant moisture, a garage-door reed switch, and a mailbox-open detector.
- **Aqara M2 hub** (December) as the Thread Border Router — and a Zigbee bridge for my existing Aqara sensors, so it earns its slot twice.
- **Home Assistant Yellow** running HA OS, which replaced the Pi 4 as the primary host.
- **A second Coral USB** (December) for the Frigate box.

## The big news: we're building

We bought a lot in October. Construction starts Q2 2023. A custom build is the first time I get to design a connected home from the wires up instead of fishing Cat6 through finished walls and apologizing to drywall. Every stud is, briefly, an opportunity — and every opportunity I miss before the drywall closes is a $400 retrofit later. So most of my 2023 is going to be a wire spec.

## Forecast for 2023

1. **New-house construction, Q2–Q4.** *(95%)* The lot's ours; the plans are approved.
2. **A structured-wiring and PoE backbone, designed before framing.** *(100%)* Every room gets at least two Cat6 drops; the garage and outdoor zones get PoE conduit. This is the buildable-once decision and I will not get it wrong.
3. **A Samsung Bespoke kitchen suite.** *(90%)* Fridge, oven, dishwasher, washer/dryer in matching panels — the Family Hub fridge carries the touchscreen.
4. **First Matter devices on the network.** *(85%)* A few Eve sensors, a Nanoleaf bulb, maybe a thermostat — once the firmware wave settles.
5. **A Frame TV in the great room.** *(80%)* Art display that doubles as a SmartThings hub.
6. **HA migrates to the new house, Q4.** *(95%)* Physically move the Yellow plus the Z-Wave stick and the Sonoff dongle; re-install most sensors.
7. **A wall-mounted dashboard on every floor.** *(80%)* Three iPad-mini dashboards, minimum.
8. **The current house's gear migrates with us.** *(100%)* The devices come; the wiring obviously doesn't.

## What I'm buying in 2023

A 1,000-foot box of Cat6. Eight PoE cameras for the new place (five now, three new zones). The Samsung Bespoke suite. A 65-inch Frame TV. Ten or so in-wall keystones. And a 24-port managed PoE switch — a UniFi 24-PoE-Pro, most likely, in the structured-wiring closet.

## What's next

The very next post is the one I've wanted to write for a decade: the full connected-home wire spec for the build, drop by drop, before a single stud goes up. After ten years of retrofits, this is the buildable-once chance to get it right.
