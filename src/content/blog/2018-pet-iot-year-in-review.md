---
title: "2018 pet IoT — the quiet year before Fi"
date: 2018-12-23T17:00:00-05:00
category: tools
tags:
  - pet-iot
  - year-in-review
  - forecast
notebook: pet-iot-field-guide
notebookOrder: 17
excerpt: "Litter-Robot III Connect joined the house and earned its keep. Fi closed funding and a 2019 ship date. Petnet kept hanging on by single-day outages. The 2017 forecast came in at my worst-ever 45% — almost every miss was a vendor ship date I read off a calendar."
pullquote: "The interesting thing about 2018 wasn't a product. It was the absence of one — Atom went four months bare-collar because nothing on the market was worth buying, and I'd rather wait for Fi than pay Mars again."
cover: "../../assets/blog/2018-pet-iot-year-in-review-cover.svg"
coverAlt: "A calendar year of pet-IoT devices in the household — a self-cleaning litter box, a connected cat door, a feeder with a mechanical backup beside it, and an empty dog collar waiting for next year's tracker."
---

End of 2018. Six years of writing this thing down. This is the one where the most honest entry in the ledger is a blank — Atom spent a third of the year wearing a collar with nothing on it, and that was the right call.

Before the year-end tally, the annual humility exercise: scoring what I predicted twelve months ago.

## Scoring the 2017 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Fi smart collar ships consumer device | 70% | Closed seed funding, announced — ships 2019, not 2018 | ✗ (timing) |
| Litter-Robot III Connect (WiFi) ships | 90% | Yes, and it's in the house | ✓ |
| Petnet first multi-day outage | 65% | Three more single-day outages, still no multi-day catastrophe | ✗ (partial; trend is real) |
| Consumer microchip-activated feeder reaches retail | 60% | SureFeed's connected feeder is real, but it landed in 2017 — I mis-dated it | ✓ (partial; wrong year) |
| Whistle successor with health sensors announced | 50% | Rumored all year; nothing official | ✗ |
| HomeKit-certified pet camera | 35% | Nothing | ✗ |
| Mars acquires another pet-tech startup | 70% | Mars Petcare agreed to acquire AniCura — a 200-hospital European vet network | ✓ (bigger than expected) |
| Pet-health-data-to-vet platform gets traction | 35% | Nothing meaningful | ✗ |

Three clean hits, two partials, three flat misses. Call it **45%** — my worst forecasting year in six. The instructive part is *how* I missed. Almost every miss was timing: Fi slipped a year, the SureFeed Connect feeder shipped a year *earlier* than I logged it, the Whistle health rumor never got an announcement. I keep predicting on quarters, and pet hardware ships on a clock I don't control.

The AniCura hit is the one worth dwelling on. I forecast "Mars acquires another pet-tech startup" expecting a Whistle-sized tuck-in — another collar, another app. Instead Mars Petcare went and agreed to buy **AniCura**: not a device company at all, but a network of roughly 200 animal hospitals across seven European countries, closing late in the year after the EU cleared it. That's a different bet entirely. Mars already owns the food (Pedigree, Whiskas, Royal Canin), the trackers (Whistle, the old Tagg IP), and now a wall of the clinics. The thing I should have been forecasting wasn't "which startup gets bought" — it was "Mars is assembling the whole loop: what your pet eats, what its collar measures, and the vet who reads both."

![How 2018 scored: of eight 2017 predictions, three hit, two were partial, and three missed outright, with nearly every miss attributable to a vendor ship date rather than a wrong call about the product itself.](../../assets/blog/2018-forecast-scorecard.svg)

## What got added this year

- **Litter-Robot III Connect** (the model that shipped late in the year, finally installed). Joule took to it inside a week. It's the first genuinely *connected* litter device in the house, and the first one I'd recommend without a caveat.
- **A second backup feeder.** I now run a non-connected, mechanical-timer PetSafe Smart Feed alongside each Petnet — one for Joule, now one for Atom too. The redundancy is no longer theoretical (see below).

## What got removed

- **Atom's Whistle 3, decommissioned in August.** The battery had degraded past usefulness — a tracker that needs charging every two days isn't tracking, it's a charging chore with a collar attached. Replacement: nothing. Atom went **bare-collar for four months** and the dog did not notice. I did. The decision was deliberate: the only cellular dog tracker worth buying was a newer Whistle, and after two years of Mars locking down Whistle's API post-acquisition, I wasn't going to spend money rewarding that. So I waited for Fi.

That four-month gap is the truest thing in this year's review. The honest state of consumer dog tracking at the end of 2018 is: the best move available to me was to buy nothing and wait.

![Atom's collar across 2018 on a January-to-December timeline. From January to August he wears the Whistle 3 cellular tracker, drawn as a filled bar, until its degraded battery forces a decommission marked in August. From August to December the bar goes empty and dashed — a deliberate four-month bare collar — ending with an arrow labelled waiting for Fi pointing past year-end. A reasoning row underneath notes the only worthwhile cellular tracker was a newer Whistle, and Mars had locked the API, so the right call was to buy nothing.](../../assets/blog/2018-pet-iot-bare-collar-gap.svg)

## What worked

- **Litter-Robot III Connect.** A real quality-of-life win and a surprising amount of latent health signal — it knows how often the box gets used and roughly by how much weight, which for a single cat is a usable baseline.
- **SureFlap Hub, still boringly reliable.** Joule's outdoor patterns now have eighteen months of unbroken history. Boring is the highest compliment I pay infrastructure.
- **Feeder redundancy, validated.** Petnet missed three feeds this year across short outages. The mechanical backup caught every one. A dumb timer with no cloud dependency beat a smart feeder with one, three times — which is its own quiet lesson about where to put intelligence in a system that has to work when the network doesn't.

![A side-by-side of the two feeders during a cloud outage. On the left, the cloud-dependent Petnet SmartFeeder: a cloud marked down, with a broken, crossed-out arrow failing to reach the feeder below it, and a note that it missed three feeds this year. On the right, the PetSafe Smart Feed mechanical-timer backup: a clock glyph with no network, a solid green arrow reaching the feeder, and a note that it caught all three and fed the animals anyway. The takeaway across the bottom is to put the part that has to work where the network can't reach it.](../../assets/blog/2018-pet-iot-feeder-redundancy.svg)

## What didn't

- **Petnet's slow decline.** No single outage was long. But the *frequency* is climbing year over year, and the company still won't say anything about it. Silence from a vendor whose product I rely on to feed my animals is not a neutral signal.
- **The Mars–Whistle relationship.** It hasn't improved; it's gotten worse. The API restrictions tightened again, more community integrations broke, and my own data-export pipeline is now effectively Litter-Robot plus SureFlap. Whistle, the device that started this whole journal, contributes almost nothing to my data picture anymore — not because the hardware got worse, but because the owner decided openness wasn't strategic.

There's a pattern across both of those: the device kept working, but the *company behind it* changed in a way that made the device worth less to me. Petnet by neglect, Whistle by deliberate lock-down. After six years, I trust hardware I can hold more than I trust the cloud account it phones home to.

## Forecast for 2019

| # | Prediction | Confidence |
|---|---|---|
| 1 | Fi ships its consumer collar | 80% |
| 2 | Petnet has its first genuine multi-day outage | 75% |
| 3 | A Whistle successor with on-board health sensing is announced | 55% |
| 4 | A second credible smart-litter device challenges Litter-Robot | 60% |
| 5 | Mars's vet-clinic strategy becomes visibly tied to its devices (clinic + collar data) | 65% |
| 6 | First credible HomeKit pet device | 35% |
| 7 | A GPS-fence consumer collar (virtual-fence, no buried wire) appears | 45% |
| 8 | I buy a Fi for Atom and stop paying Mars | 70% |

## What I'm buying in 2019

- A Fi the moment it ships and the first reviews look real. Atom's bare collar has a slot reserved.
- A second Litter-Robot only if we add a cat — not in the plan, but I've learned not to write "never."
- Whatever Whistle ships post-Mars: probably nothing. I'll vote with my wallet.

## What's next

The Fi launch is 2019's headline — the first time in years there's a cellular dog tracker not owned by Mars. The Petnet question is the slow-burn: does a feeder company that's stopped communicating make it through another year? And smart litter, having proven itself in my own house this year, is the category I expect to actually grow.

Six years in. Four pets — one dog, one cat, no additions — and a dog collar sitting empty on purpose, waiting for the one device I'm willing to pay for.
