---
title: "2025 pet IoT — the DIY era, properly arrived"
date: 2025-12-23T17:00:00-05:00
category: tools
tags:
  - pet-iot
  - year-in-review
  - forecast
notebook: pet-iot-field-guide
notebookOrder: 42
excerpt: "DIY pet-IoT shipped. Long-arc written. Mars divested Whistle to Tractive in July — the forecast that flipped two rows. 2024 net-scored 69%. 2026: Tractive evaluation, Quark's collar, next dog."
pullquote: "Two forecasts flipped on a single July event: Mars divested Whistle to Tractive, which made the 'Mars consolidates' forecast wrong AND the 'non-Mars vitals tracker' forecast right. Net score unchanged; the underlying model of the category was wrong in a more interesting way than the box-score suggests."
cover: ../../assets/blog/2025-pet-iot-review-cover.svg
coverAlt: "2025 pet-IoT year-in-review cover with three highlight cards — DIY ESP32 pet feeder shipped, Mars divested Whistle to Tractive, twelve-year long-arc retrospective written — on a warm gradient background."
---

End of 2025. Closing the annual cadence of the pet-IoT field guide.

## Scoring the 2024 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| DIY ESP32 pet hardware mainstream | 80% | DIY communities grew; my own feeder + others published builds | ✓ |
| Senior pet mode UX | 35% | Nothing meaningful | ✗ |
| Mars consolidates another player | 80% | Inverted — Mars divested Whistle to Tractive in July | ✗ (direction wrong, high confidence) |
| Local-first pet camera mainstream awareness | 50% | Frigate + Reolink replacing Furbo conversations | ✓ (partial) |
| AI behavior detection stays mostly marketing | 90% | Yes — no breakthrough in 2025 | ✓ |
| Credible non-Mars vitals tracker | 35% | Tractive DOG 6 / DOG 6 XL — ships HR + activity + sleep + scratch + bark, independent Austrian vendor, emerged via the Whistle acquisition | ✓ (right answer, wrong reason) |
| Matter-compatible smart litter or feeder | 45% | Aqara Matter-feeder rumored, not yet shipping | ✗ |
| Long-arc retrospective | 100% | [Yes, July](/blog/twelve-years-pet-iot-long-arc-retrospective/) | ✓ |

5/8 + 1 partial = ~69%. Same net score as a quiet year, but two forecasts flipped on one event (Mars divests Whistle → "Mars consolidates" wrong + "non-Mars vitals tracker" right). The forecasting humility lesson: the box-score hides model error. I was wrong about the *shape* of the arc — empire contracting, not expanding — and got the box-score win on the vitals tracker only because the divestiture happened to produce one. Right answer, wrong reason.

## What got added this year

- **DIY ESP32 pet feeder for Boson** (March).
- **Second Pebblebee Clip for Boson's collar** (May).
- **The long-arc retrospective post** (July) — written two weeks after Mars's Whistle divestiture, then revised to acknowledge it.
- **Tractive DOG 6 XL + Base Station** (September) — evaluating against Fi for Quark.
- **Tractive CAT 6 Mini ×2** (October) — first cellular cat trackers in the house in 12 years of pet IoT.
- **A small DIY ESP32 cat-water-fountain monitor** (September) — knows when the water filter needs replacing.

## What worked

- **DIY ESP32 reliability**. Eight months in, zero failures.
- **Find My pet trackers** on both cats. Quietly reliable.
- **Quark's Fi battery life** is still holding at ~12 days; minor degradation from year 1.

## What didn't

- **Apple's Find My anti-stalking updates in iOS 18** made Pebblebee Clip more aggressive about bystander alerts. Some friends with iPhones report seeing "unknown tracker nearby" alerts when our cats are outside. Slight UX regression.
- **Tractive Base Station's architectural laziness**. nRF52840 silicon used as plain BLE advertising — no LE Coded PHY, no Thread, no Matter, no Find My relay. [Teardown writeup](/blog/tractive-base-station-teardown-ble-nrf52840/). 2013 architecture on 2025 components.
- **The Whistle data-export window**. Six weeks from announcement to dark date; mid-August Mars disabled CSV export. Anyone who didn't extract by August 15 lost their pet's historical data.

## Forecast for 2026

| # | Prediction | Confidence |
|---|---|---|
| 1 | We add another dog (Atom-replacement-process eventually) | 65% |
| 2 | Tractive DOG 6 XL beats Fi for Quark's next collar | 55% |
| 3 | Mars divests another portfolio piece (BluePearl, a food brand, or another device) | 35% |
| 4 | A Matter-compatible smart litter or feeder ships | 60% |
| 5 | DIY pet-IoT becomes a stable indie maker category | 75% |
| 6 | Community firmware emerges for Tractive Base Station (nRF52840 is openly tooled) | 30% |
| 7 | Apple ships pet-specific Find My API features at WWDC | 55% |
| 8 | Three pets (Joule + Boson + Quark) stay healthy | 80% (the only forecast that matters) |

## What I'm buying in 2026

- Whatever Apple ships for pet-specific Find My (rumored at WWDC 2026).
- Quark's next collar — Fi or Tractive DOG 6 XL, depending on the 6-week battery test.
- More Tractive evaluation if the CAT 6 Mini holds up through winter.
- A few more ESP32 modules for the next round of DIY pet-IoT projects — possibly including a community-firmware attempt on the Tractive Base Station.

## What's next

The series ends on annual cadence here. Going forward, pet-IoT posts will be event-driven — when something interesting ships, when a new pet joins, when something fails publicly.

Forty posts across twelve years (plus this one). Documented arc. The longest single project I've maintained on the blog after the [Smart Home IoT series](/notebooks/smart-home-iot-journey/).

Three pets, currently healthy. The data carries forward.

Onto whatever comes next.
