---
title: "2015 pet IoT review — SureFlap in, FitBark vs Whistle"
date: 2015-12-22T17:00:00-05:00
category: tools
tags:
  - pet-iot
  - year-in-review
  - forecast
notebook: pet-iot-field-guide
notebookOrder: 7
excerpt: "Joule got her SureFlap. FitBark 2 competes with Whistle on Atom's collar. Petnet still hasn't shipped. 2014 scored 75%. 2016: Whistle 3 cellular, Petnet finally, smart cams real."
pullquote: "Looking back: 6 of 8 on 2014's forecasts. The misses were timing (Petnet, no surprise) and Tagg's surprisingly persistent survival despite the obvious threats."
---

End of 2015. Pattern continues — score the forecast, document the year, place 2016 bets.

## Scoring the 2014 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Whistle ships GPS-enabled model (or acquires Tagg) | 70% | GPS model rumored for early 2016, not 2015 | ✗ (timing) |
| Tagg's parent divests/shutters | 50% | Tagg still alive, Snaptracs still subsidizing | ✗ |
| First connected cat product reaches retail | 60% | SureFlap Hub announced, ships 2016 | ✗ (announced, not shipped) |
| Petnet ships to backers | 75% | Started shipping in late 2015 to early Kickstarter backers; still backed up | ✓ (partial) |
| Pet camera category emerges | 80% | Pawbo + new PetCube + Furbo Kickstarter | ✓ |
| Install SureFlap for Joule | 90% | Installed May 2015 | ✓ |
| FitBark Gen 2 ships | 70% | Shipped July 2015 | ✓ |
| Vet integration platform | 50% | A few startups; none with adoption | ✓ (partial) |

5/8 hits + 2 partials = roughly **75%**. The Tagg miss surprises me — they should have died this year given the architectural disadvantages, but cellular pet tracking is a strong moat against newcomers without their existing cellular footprint.

## What got added in 2015

- **SureFlap Microchip Pet Door (DualScan)** — installed May for Joule. Working flawlessly.
- **FitBark 2** — September. Shares Atom's collar with Whistle.
- **A Petnet SmartFeeder** — finally shipped late November. Installing this weekend. Will write separately.
- **An attempted Petcube** — bought, Atom destroyed it, returned the wreckage. The "you cannot have an interactive pet camera in a house with a Lab" lesson learned.

## What worked

- **SureFlap reliability**. ~600 reads of Joule's chip over 7 months. Zero failures.
- **FitBark's official API**. Migrated home-server activity logging from Whistle scrape to FitBark JSON. Clean code, stable API contract.
- **Whistle as a backup**. The double-tracker setup means if one device dies or syncs incorrectly, the other catches it.

## What didn't

- **Petnet's slow shipping**. Pre-ordered in February; arrived November. The Kickstarter-to-mass-market scaling problem is real for hardware startups.
- **Pet vital signs** — still no consumer product measures heart rate, respiratory rate, or temperature on a collar. The accelerometer-only ceiling is hitting hard.

## Forecast for 2016

| # | Prediction | Confidence |
|---|---|---|
| 1 | Whistle 3 ships with built-in cellular + GPS (no base station) | 85% |
| 2 | Whistle gets acquired by a pet conglomerate (Mars, Petco, etc.) | 65% |
| 3 | Furbo Kickstarter ships in 2016 | 50% |
| 4 | SureFlap Hub (the connected version of the door) ships | 80% |
| 5 | Petnet has its first major cloud outage event (server issue, missed feeds) | 60% |
| 6 | A "fitness for cats" attempt by someone | 40% |
| 7 | First HomeKit-compatible pet device | 35% |
| 8 | Tagg finally shuts down or pivots | 55% |

## What I'm buying in 2016

- Whistle 3 if/when it ships.
- SureFlap Hub when it ships (the connected version of Joule's existing door).
- Maybe a Furbo if it ships and the reviews don't say it's a fire hazard.
- A second Whistle base station for redundancy (the current one is a single point of failure).

## What's next

Whistle 3 + Mars acquisition is the big story for 2016. Going to write up both as separate posts when they happen. Plus the Petnet first impressions when I've had it long enough for an opinion.

Two years of pet IoT in the house. Two pets. Three product categories represented (activity, identity, feeding). Cat IoT still a thin market; dog IoT maturing. The Mars consolidation question — will the big pet companies acquire the smart-pet startups — is the question that decides who wins this category long-term.
