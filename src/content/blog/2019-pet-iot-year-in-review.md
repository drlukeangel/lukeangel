---
title: "2019 pet IoT — Fi shipped, Whistle went health, Petnet hung on"
date: 2019-12-23T17:00:00-05:00
category: tools
tags:
  - pet-iot
  - year-in-review
  - forecast
notebook: pet-iot-field-guide
notebookOrder: 20
excerpt: "Fi shipped and Atom came off Mars-owned Whistle. Whistle answered with the GO Explore and its behavioral-health platform. Petnet's outages got worse but it's still standing. 2018 scored 50%. The HomeKit blind spot is now four years running."
pullquote: "Seven years in, the lesson I keep relearning is that the device almost never fails — the company behind it does. Fi's battery was the engineering win of the year. Petnet still being alive was the surprise."
cover: "../../assets/blog/2019-pet-iot-year-in-review-cover.svg"
coverAlt: "A year of pet IoT — a new cellular dog collar with a strong signal, a rival collar carrying a small heart-rate health glyph, a connected litter box, and a feeder with a warning mark still precariously running."
---

End of 2019. Seven years of writing this down. The headline is the one I've waited two years for: Atom is finally off Mars-owned hardware, on a Fi, and the battery actually lasts. The runner-up is that Whistle — the company that started this whole journal — answered Fi not with a better radio but with a pivot to *health*.

## Scoring the 2018 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Fi ships its consumer collar | 80% | Yes — announced in spring, reached me in November | ✓ |
| Petnet's first genuine multi-day outage | 75% | Longer, more frequent single-day outages — but no multi-day catastrophe *yet* | ✗ (close; the trend is undeniable) |
| A Whistle successor with on-board health sensing | 55% | Yes — the Whistle GO Explore (August) with a behavioral-health platform | ✓ |
| A second credible smart-litter device challenges Litter-Robot | 60% | A few cheap entrants appeared; none a real threat | ✓ (partial) |
| Mars's vet strategy becomes visibly tied to its devices | 65% | Vet consolidation is visible (AniCura closed, more clinics) — device tie-in still loose | ✓ (partial) |
| First credible HomeKit pet device | 35% | Nothing | ✗ |
| A GPS-fence consumer collar appears | 45% | Halo Collar is in development, hasn't shipped | ✗ (delayed) |
| I buy a Fi and stop paying Mars | 70% | Done | ✓ |

Three clean hits, two partials, three misses. Call it **50%** — dead average for me. The misses were timing again (Halo slipped, Petnet's catastrophe hasn't landed) and the perennial HomeKit shutout.

The forecast I want to dwell on is the one I got *right* for the wrong reason. I predicted "a Whistle successor with health sensing," expecting Mars to bolt a thermometer onto the collar. What actually shipped — the **Whistle GO Explore** in August — is more interesting than that. It doesn't measure vitals like temperature or heart rate. It infers *behavioral* health: how much the dog licks, scratches, sleeps, and how that drifts over time, run against a model Mars built from a multi-year study of tens of thousands of dogs. That's a different and frankly smarter bet than a thermometer. It also tells you exactly what Mars's data strategy is: the collar isn't a tracker that happens to log activity, it's a longitudinal health-data funnel that happens to also tell you where the dog is.

![How the Whistle GO Explore turns one accelerometer into a health signal. The collar's accelerometer feeds four inferred behaviors — licking, scratching, sleeping, and activity drift — which flow into a model trained on a multi-year study of tens of thousands of dogs, which in turn produces a behavioral-health trend with alerts. A separate dashed box notes what it does not do: no vitals, no temperature, no heart rate yet. The caption frames the collar as a longitudinal health-data funnel for Mars that happens to also tell you where the dog is.](../../assets/blog/2019-pet-iot-behavioral-health-funnel.svg)

![How 2018's eight predictions scored: three clean hits (Fi ships, a health-sensing Whistle successor in the GO Explore, and switching Atom to Fi), two partials (a weak smart-litter challenger and a visible-but-loose Mars vet strategy), and three misses (Petnet's catastrophe still hasn't landed, HomeKit again, and the delayed GPS-fence collar). Most of the slippage was timing, not a wrong read on the product.](../../assets/blog/2019-forecast-scorecard.svg)

## What got added this year

- **Fi Series 1** on Atom (November) — the first non-Mars tracker he's worn, and the first dog tracker I've genuinely liked.
- Nothing else. After the Fi, the household reached a kind of steady state: tracker, litter box, two feeders, a cat door. The gear stopped being the story; reliability did.

## What worked

- **Fi's 14-day real-world battery.** The single biggest engineering result of the year, and the thing that finally made a cellular dog collar livable. LTE-M earned its place.
- **Litter-Robot III Connect's per-visit log.** Two years in, Joule's baseline is solid and boring, which is exactly what a health baseline should be — you want it flat until the day it isn't.

## What didn't

- **Petnet, still declining.** The outages are longer and more frequent and the company still says nothing. I keep predicting the catastrophic multi-day failure and keep being early. It's coming; I just can't time it.
- **The HomeKit pet-device gap.** Four years of forecasting one, four years of nothing. I'm increasingly sure this isn't a timing miss — Apple simply doesn't care about this category, and pet hardware lives in the Wi-Fi/cellular/own-app world instead. I should probably stop predicting it.

There's a throughline in the wins and losses this year, and it's the same one as last year: the **hardware almost never fails — the company behind it does.** Fi's collar is great because Fi is, for now, a focused independent company. Petnet's feeder is fine hardware strangled by a backend its owner can't or won't fund. After seven years I trust the thing in my hand more than the account it phones home to, every time.

![Two products split into a hardware layer and a company layer to show where each one stands. On the left, Fi Series 1: the hardware layer is solid — a 14-day LTE-M battery — and the company layer is solid too, a focused independent firm that is funded, with an up arrow marking it trustworthy for now. On the right, the Petnet SmartFeeder: the hardware layer is still solid, a fine mechanism that still feeds, but the company layer is failing — longer and more frequent outages and a silent company, drawn dashed and red, with a down arrow marking it worth less every year. The same hardware story on both sides; the difference is the company.](../../assets/blog/2019-pet-iot-hardware-vs-company.svg)

## Forecast for 2020

| # | Prediction | Confidence |
|---|---|---|
| 1 | Petnet finally has its catastrophic multi-day outage | 80% |
| 2 | A next-gen Litter-Robot is announced | 55% |
| 3 | A collar ships true *vitals* (temperature or heart rate), beyond behavioral health | 55% |
| 4 | Halo Collar finally ships | 65% |
| 5 | The long-rumored Apple tracker (BLE/UWB tag) materializes | 60% |
| 6 | Multi-cat attribution lands in a smart-litter product | 55% |
| 7 | Mars consolidates further (more vet or pet-tech acquisitions) | 75% |
| 8 | A pet-tech category shock — a vendor failure that strands devices | 70% |

## What I'm buying in 2020

- Whatever a PetSafe Smart Feed successor looks like — the dumb mechanical backup has earned my loyalty by never letting me down.
- Maybe a second Litter-Robot, if we add a cat. We've been talking about it.
- Probably *not* the Halo Collar when it ships — the static-correction approach sits wrong with me, and I'll want to see the welfare case before I'd put one on a dog.

## What's next

The Petnet endgame, which I've now forecast three years running, has to land eventually — and when it does, the cloud-dependency lesson I've been writing in lowercase finally gets written in capitals. Whistle's health pivot is the more interesting thread to watch: if the collar is really a health-data funnel, the question for 2020 is whether anyone ships *vitals* and not just behavior. And we may add a second cat, which would make this a two-cat household and a very different litter-box-analytics problem.

Seven years in. Mars has reshaped the category in ways nobody saw coming in 2013, the cat side is finally as connected as the dog side, and the device I'm proudest of this year is the one made by the company small enough to still care.
