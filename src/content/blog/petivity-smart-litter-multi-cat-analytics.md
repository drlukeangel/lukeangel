---
title: "Petivity smart-litter — multi-cat analytics, built by Purina"
date: 2022-10-08T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - petivity
  - cat
  - multi-cat
notebook: pet-iot-field-guide
notebookOrder: 30
excerpt: "Purina's Petivity Smart Litterbox Monitor just launched — a scale that slides under any litter box and tells two same-size cats apart with no chip or collar. Two weeks in: the multi-cat attribution is the real trick, and the Purina-owned recommendation layer is the catch."
pullquote: "Petivity tells Joule from Boson with no microchip and no collar — just a scale and a model. That's the genuinely hard problem this category has dodged for years. The catch is who built it, and what the app wants to sell me on the way out."
cover: "../../assets/blog/petivity-smart-litter-multi-cat-analytics-cover.svg"
coverAlt: "An illustration in warm orange of a flat sensor base sitting under an ordinary litter box, with two same-sized cat profiles diverging from a single weight reading into two separate labelled trend lines — a scale that splits one signal into two cats with no chip or collar."
---

Purina's **Petivity Smart Litterbox Monitor** launched a couple of weeks ago — late September — and I bought one immediately, because it claims to do the thing this notebook has wanted for years: tell two same-weight cats apart at the litter box with no microchip and no collar. It's a flat scale that slides *under* any existing box — a regular pan, a Litter-Robot, whatever — and watches who steps on.

Two weeks in. First impressions, with the honest caveat up front: two weeks is a baseline, not a verdict. But the shape of what it does — and what it's for — is already clear.

## What Petivity is

**Hardware:**
- A flat plastic base, roughly 23 × 18 inches, a couple inches tall.
- Weight sensors under the platform.
- 2.4 GHz Wi-Fi; runs on a power cord or batteries (not both).
- No litter mechanism of its own — you set any box on top.

**Software:**
- iOS / Android app.
- Multi-cat setup: you enter each cat's weight, and the app builds a per-cat model from there.
- Per-visit logs: timestamp, weight, duration.
- AI "wellness" signals — frequency and duration anomalies against a learned baseline.
- All of it cloud-side; the multi-cat attribution is an ML model running on Purina's servers.

![Petivity's hardware role, drawn as two setups feeding one data stream. On the left, a plain litter pan sits on the flat Petivity scale; on the right, a Litter-Robot globe sits on the same scale. Neither box belongs to Petivity — it owns no litter mechanism of its own, it just slides under whatever box already works. Arrows from both scales converge into a single per-visit record of weight, duration, and timestamp. A caption notes it instruments the box you already have rather than replacing it.](../../assets/blog/petivity-under-the-box.svg)

**The pricing surprised me, in a good way:** about $200 for the hardware, and **no subscription** — the tracking, alerts, monthly reports, and multi-cat profiles are all included. That's a notably different posture from [Mars-owned Whistle's monthly-fee model](/blog/whistle-3-cellular-mars-acquires-whistle/). Which raises the obvious question of how Purina plans to make its money back, and the answer is in the recommendation layer — more on that below.

## The multi-cat profiling is the real trick

The differentiator against my [weight-only Litter-Robot attribution](/blog/litter-robot-multi-cat-detection-weight-attribution/) is that Petivity does explicit, model-driven multi-cat identification, and Purina says it can split up to five cats with no chip or collar — built by analyzing thousands of litter-box visits from thousands of cats.

The hard case is mine: Joule (~9.5 lb) and Boson (~9.0 lb) are both adult now and have converged to within half a pound of each other. At that gap, entry weight alone can't reliably tell them apart — my own script struggles exactly here. So the model has to lean on the secondary signals:

- **Entry weight** — the primary axis, but nearly useless when two cats weigh almost the same.
- **Visit-duration distribution** per cat.
- **Time-of-day patterns** per cat.
- **Sequence patterns** — who tends to follow whom.

![How Petivity splits two same-weight cats, drawn as a signal fork. On the left, a single litter-box visit produces one weight reading — and with Joule at about 9.5 pounds and Boson at about 9.0, the weight axis alone can't separate them, shown as two overlapping bell curves. On the right, the model adds three secondary axes — visit duration, time-of-day, and who-follows-whom sequence — and those pull the two cats apart into separate labelled profiles. A caption notes the trick is that weight starts the guess and the behavioral signals finish it; no microchip or collar is involved.](../../assets/blog/petivity-multicat-attribution.svg)

Two weeks isn't enough to grade the accuracy hard, but the early read against my own script is encouraging-not-perfect: across the visits so far, the two methods agree on the clear majority and disagree on a minority — and the disagreements cluster exactly where you'd expect, the near-identical-weight visits with no distinguishing duration or timing. For weight-similar cats, neither approach is definitive, and I suspect neither ever fully will be. The truly definitive answer is RFID — read the cat's existing microchip at the box entry, the same trick [the SureFlap door already uses on these two cats](/blog/sureflap-microchip-cat-door-joules-first-iot/). Petivity doesn't do that. It's solving by inference what a $5 chip reader would solve by identity.

## The wellness signals

Petivity watches for deviations from each cat's baseline — the kind of changes that *can* point at a problem: more frequent or longer visits (a UTI tell), weight loss plus increased frequency (kidney), high-volume frequency (diabetes-range polyuria), long-duration low-frequency visits (constipation). The framing is appropriately hedged: "consider veterinary attention," not "your cat is sick."

Two weeks gives me exactly one data point on the signal quality, and it was a false positive: the app flagged Boson's visits trending high right as we'd switched litter brands — she was investigating the new substrate, not unwell. That's the expected failure mode of an anomaly detector during a baseline it hasn't finished learning, and I won't hold an early false positive against it. The thing I *can* say is that it leans sensitive, which for a screen-don't-diagnose tool is the right direction to err — better a few "go check" nudges than a missed one.

## Petivity vs the Litter-Robot, side by side

The cats use both — the [Litter-Robot III Connect](/blog/litter-robot-iii-connect-smart-self-cleaning-litter/) for the not-scooping-daily virtue, the Petivity scale under a second, plain box. They're complements, not rivals.

| | **Litter-Robot III Connect** | **Petivity** |
|---|---|---|
| Hardware role | Self-cleaning box | Multi-cat scale under any box |
| Per-visit weight | Yes | Yes |
| Per-cat attribution | None native (my CSV + script) | ML-driven, native, up to 5 cats |
| Anomaly detection | None | Yes (included, no fee) |
| Vendor | Whisker (independent) | Purina (Nestlé) |
| Subscription | None | None |
| Local API / automation | Unofficial only | None |

Petivity's attribution is the genuinely useful part for a multi-cat house; the Litter-Robot's mechanism is useful for not living next to a scoop. I'm keeping both.

## The Purina-ownership catch

Here's where the no-subscription generosity gets explained. Petivity exists, in part, because Purina wants to surface cats with health signals who could be sold a **prescription diet** — Pro Plan Veterinary Diets, a Purina line. When a wellness signal fires, the app's next move is a nudge:

- "Boson's pattern suggests increased water intake. Consider a urinary-health diet."
- And the recommended diet is, of course, Purina's own.

It's the [exact shape of the Mars/Whistle conflict](/blog/whistle-3-cellular-mars-acquires-whistle/): the company measuring the animal also sells the remedy. The free hardware isn't charity — the data *is* the business, and the recommendation is the funnel. My rule holds the way it did for Whistle: the *signal* is real and worth having; the *recommendation* is a sales channel wearing a lab coat. Use the trend, take it to your own vet, ignore the suggested SKU.

![The Purina conflict-of-interest loop, drawn the same way as the Mars/Whistle one. The litter-box scale sends weight and visit data up into a Petivity/Purina analytics box, which produces a wellness signal; an arrow labelled recommendation flows back into the owner's app — "consider a urinary-health diet" — and a dashed arrow points from there to a shelf of the same company's prescription-diet brand. A note marks the closed loop: free hardware, because the data is the product and the diet recommendation is the funnel; the party measuring the cat is the party selling the food.](../../assets/blog/petivity-purina-conflict.svg)

## What the right product would look like

If I were drawing it up: Petivity's scale-plus-analytics, but with the diet recommendations stripped out and replaced by "here's the trend, show your vet"; an RFID reader at the box entry to make attribution a matter of identity instead of inference; and a local API so the data lands in my home automation instead of only Purina's cloud. None of those are commercially incentivized — vendor-neutral advice sells nothing, open APIs reduce lock-in, and an RFID reader is a few dollars of bill-of-materials a vendor would rather not spend. So the product I want doesn't exist. The one I have gets most of the way there, and I can supply the skepticism myself.

## What's next

The 2022 year-end review. It was the year the household went to four animals and the cat side finally got the analytics layer the dog side had for years — Quark arrived, and Halo and Petivity both got real evaluations. The cat-IoT category, thin for so long in this notebook, finally has some depth to write about.
