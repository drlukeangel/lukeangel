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
excerpt: "Two things I'd chased for a decade landed in the same year, from the same scrappy independent. In May, Tractive shipped real resting heart-rate and respiratory-rate monitoring — the vitals no consumer collar had managed. In July, Mars sold Whistle to that same Tractive. The giant bailed on the category right as the underdog delivered what it never could. My worst forecasting year, ~56%, and the most instructive."
pullquote: "The same year, the same small company inverted two of my calls. Tractive shipped the resting-vitals collar a decade of giants never managed — then bought Whistle from the giant that gave up. The empire didn't expand; it sold its device leg to the underdog that had just out-engineered it."
cover: "../../assets/blog/2025-pet-iot-review-cover.svg"
coverAlt: "Three text-free highlight cards for the year. The first shows a DIY ESP32 circuit board — the DIY era arriving. The second shows a large company block handing a collar puck across an arrow to a smaller block marked with a pet paw — Mars divesting Whistle to Tractive. The third shows a settled arc with marked endpoints — the twelve-year long-arc retrospective."
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
| Credible non-Mars vitals tracker | 35% | **Yes** — Tractive shipped resting heart-rate + respiratory-rate monitoring in May, free to existing trackers. The first real consumer vitals, from an independent | ✓ (my 35% was too low) |
| Matter-compatible smart litter or feeder | 45% | Aqara Matter-feeder rumored, not yet shipping | ✗ |
| Long-arc retrospective | 100% | [Yes, August](/blog/twelve-years-pet-iot-long-arc-retrospective/) | ✓ |

![Scoring the 2024 forecast: four green checks (DIY ESP32 hardware mainstream, AI behavior detection stays marketing, the long-arc retrospective written, and a credible non-Mars vitals tracker — Tractive's resting heart-rate and respiratory-rate launch in May), one orange partial (local-first pet camera), and three red crosses (a senior-pet-mode UX, a Matter smart litter or feeder, and the big one). The big miss is called out on its own: "Mars consolidates another player," held at 80% confidence and flatly wrong because Mars divested Whistle instead — the high-confidence "trend continues" call is the one that blew up. Tally: four hits, one partial, three misses, about 56 percent, the worst year. A caption notes the box-score barely captures it; the error was about the shape of the whole arc.](../../assets/blog/2025-forecast-scorecard.svg)

Four hits, one partial, three misses — ~56%, my worst forecasting year, and the most instructive of the twelve. The box-score barely captures *why*, because the two things I got most wrong were wrong in opposite directions and they're the same story.

I held "Mars consolidates another player" at **80% confidence** and it was flatly, directionally wrong: in July, Mars *divested* Whistle to Tractive. Seven years of watching the empire only ever buy made the one year it sold impossible for me to see coming. That's the classic failure — the high-confidence call resting on "the trend continues" is exactly the one that blows up.

And the prediction I'd lowballed at **35% — a credible non-Mars vitals tracker — actually hit**, and I still almost missed it, because I'd spent a decade certain real vitals were perpetually "next year." In May, Tractive rolled resting heart-rate and respiratory-rate monitoring out to its existing trackers, free — derived from motion against a personalized baseline, the first time a mainstream consumer collar measured an actual vital sign instead of inferring behavior. No Whistle, no Fi, no Mars money ever managed it. The scrappy Austrian independent did.

Put the two together and the irony writes itself: the same company that shipped the vitals feature a decade of giants couldn't is the company that *bought Whistle* two months later. Mars spent nine years owning the device leg and never produced real vitals; the moment it gave up and sold, the buyer had already delivered them. I was wrong about the shape of the arc, and wrong about who'd close the gap — and the answer to both turned out to be the same small name.

![A timeline of the two 2025 events that inverted my calls, both from Tractive. In May, Tractive pushed resting heart-rate and respiratory-rate monitoring free over the air to trackers I already owned — the vital sign a decade of giants never shipped. In July, Mars divested Whistle to that same Tractive, handing the device puck across to the smaller company marked with a pet paw. First it out-engineered the giant, then it bought the giant's hardware. The empire didn't expand — it sold its device leg to the company that had just beaten it.](../../assets/blog/2025-tractive-inverts-mars.svg)

![A line chart of the Mars Petcare empire's size from 2016 to 2025. A solid rising line through 2023 is labelled "Mars buys everything." At a 2023 branch point the chart forks: a dashed grey line continues upward, labelled "forecast: keeps expanding, 80% confidence," while the orange actual line runs flat and then drops sharply at a marked "July 2025: divests Whistle" point, labelled "actual: contracts." A caption notes that seven years of "the empire only grows" made the one year it shrank impossible to see coming.](../../assets/blog/2025-empire-expected-vs-actual.svg)

## What got added this year

- **DIY ESP32 pet feeder for Boson** (March).
- **Second Pebblebee Clip for Boson's collar** (May).
- **The long-arc retrospective post** (August) — written two weeks after Mars's Whistle divestiture, with the empire-trajectory section revised to acknowledge it.
- **Tractive DOG 6 + Base Station** (September) — evaluating against Fi for Quark. The DOG 6 is the first collar in the house to report a real resting heart rate and respiratory rate, not just behavior.
- **The May vitals update on the cats' GPS Cat Minis** — Joule and Boson have worn Tractive's cellular cat tracker since late 2022, and in May the heart-rate/respiratory-rate feature simply *appeared* on the trackers I already owned, free. A decade waiting for consumer vitals, and they arrived as a software update to hardware that was already on my cats.
- **A small DIY ESP32 cat-water-fountain monitor** (September) — knows when the water filter needs replacing.

## What worked

- **Tractive's vitals, finally.** After a decade of "health" collars that only ever counted movements, a resting heart rate and respiratory rate showed up against a real per-pet baseline. It's still motion-derived, not a chest electrode — but it's a genuine vital sign, baselined and trended, and it's the first time the category delivered the thing I'd been predicting and being wrong about since the first Whistle. That it came from the independent and not the conglomerate is the year's quiet vindication of everything this notebook has argued about who builds good hardware.
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
| 2 | Tractive (DOG 6 + Base Station) beats Fi for Quark's next collar | 55% |
| 3 | Mars divests another portfolio piece (BluePearl, a food brand, or another device) | 35% |
| 4 | A Matter-compatible smart litter or feeder ships | 60% |
| 5 | DIY pet-IoT becomes a stable indie maker category | 75% |
| 6 | Community firmware emerges for Tractive Base Station (nRF52840 is openly tooled) | 30% |
| 7 | Apple ships pet-specific Find My API features at WWDC | 55% |
| 8 | Three pets (Joule + Boson + Quark) stay healthy | 80% (the only forecast that matters) |

## What I'm buying in 2026

- Whatever Apple ships for pet-specific Find My (rumored at WWDC 2026).
- Quark's next collar — Fi or Tractive DOG 6, depending on how the Base Station's power-saving zone stretches the DOG 6's roughly two-week battery against Fi's real-world fortnight.
- More Tractive evaluation — GPS Cat Mini on the cats, and the DOG 6 battery-test result that decides Quark's next collar.
- A few more ESP32 modules for the next round of DIY pet-IoT projects — possibly including a community-firmware attempt on the Tractive Base Station.

## What's next

The series ends on annual cadence here. Going forward, pet-IoT posts will be event-driven — when something interesting ships, when a new pet joins, when something fails publicly.

Forty posts across twelve years (plus this one). Documented arc. The longest single project I've maintained on the blog after the [Smart Home IoT series](/notebooks/smart-home-iot-journey/).

Three pets, currently healthy. The data carries forward.

Onto whatever comes next.
