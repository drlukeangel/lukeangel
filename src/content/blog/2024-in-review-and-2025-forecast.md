---
title: "2024 review — Bespoke kitchen, Frame TV, Matter bridges"
date: 2024-12-29T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 51
excerpt: "Full Samsung Bespoke kitchen + laundry. Frame TV as household display. Three Matter bridges live. EV charger installed."
pullquote: "Looking back: 6/8 on 2023's forecasts, ~76%. Solar + battery slipped again. The new-house era of automations has run for 14 months — long enough to see what works."
---

## Scoring the 2023 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Samsung Bespoke kitchen complete | 95% | Yes — March | ✓ |
| EV charger | 85% | Tesla Wall Connector 48A installed June | ✓ |
| Matter devices proliferate | 80% | 18 devices + 3 bridges live | ✓ |
| Frame TV ecosystem post | 95% | June post shipped | ✓ |
| Third wall-mounted dashboard | 80% | Office one finally up (July) | ✓ |
| AI sensor classification in Frigate | 60% | DoubleTake + CompreFace tested, mediocre — not deployed | ✗ |
| Tesla Powerwall reconsidered | 40% | Considered, again decided against. Generator stays | ✓ (no, as predicted) |
| Second LoRa gateway | 65% | Yes, added at the garden edge | ✓ |

6/8 = **76%**. Within the band.

## What got added in 2024

- **Samsung Bespoke oven + dishwasher + washer/dryer**.
- **EV charger** (Tesla Wall Connector 48A, June).
- **3 Matter bridges** live (Aqara M2, Hue Bridge, HA-as-bridge).
- **18 Matter devices** (Eve sensors, Nanoleaf bulbs, Eve Energy plugs).
- **Second LoRa gateway** at garden edge — fixes coverage to back fence.
- **HA Voice Assistant** experimental (running Whisper + Piper locally) — early days but works for simple commands.

## What works year-end

- **Matter bridges + multi-ecosystem.** Apple Home, Google Home, HA, SmartThings all see the same devices.
- **Frigate 0.13 with proper re-identification** — person walks porch → driveway → side yard, tracked as one event.
- **EV charging automation** — charge from 11 PM - 6 AM (off-peak) unless leaving early; SmartThings sees the Tesla state via the unofficial integration.
- **The mailbox sensor.** Working since spring. LoRa range fixed with antenna repositioning.

## What didn't

- **HA voice assistant for daily use.** The local-only voice (Whisper + Piper) is slow (~3 sec latency for ASR) and the Piper voices are robotic. Pleasant idea, not ready.
- **Frigate face recognition.** Tried DoubleTake + CompreFace. False-positive rate too high. Removed.

## Forecast for 2025

**1. SmartThings Edge drivers post. (Confidence: 95%)** Samsung launched Edge drivers in 2022; mature enough by now for a real post.

**2. Robots — Roomba + Braava routines. (Confidence: 90%)** The iRobot pair has been part of the family for years; the routine integration deserves its own post.

**3. Frame TV + kitchen appliance sync improves. (Confidence: 85%)** Samsung's Bespoke ecosystem is genuinely coupling now.

**4. The long-arc retrospective. (Confidence: 100%)** Thirteen years of smart-home posts. November or so, looking back across all of it.

**5. Matter camera support in some products. (Confidence: 70%)** Matter 1.4 ratified late 2024; consumer cameras in 2025.

**6. HA voice gets usable. (Confidence: 50%)** Whisper Turbo + better Piper voices + HA's Wyoming protocol maturing.

**7. Solar + Tesla Powerwall, AGAIN reconsidered. (Confidence: 30%)** Probably no.

**8. End-of-year 2025 review post. (Confidence: 100%)** The pattern continues.

## What I'm buying in 2025

- A couple of Matter cameras when they ship.
- A pair of Aqara HomeKit-Secure Video upgrades for the doorbell.
- More ESP32-based DIY devices as needed.
- An HA Green or another HA Yellow for backup.
