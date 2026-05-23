---
title: "Whistle 3 ships with cellular — Mars Petcare buys Whistle"
date: 2016-04-14T19:00:00-04:00
category: tools
tags:
  - pet-iot
  - whistle
  - mars-petcare
  - cellular
  - acquisition
notebook: pet-iot-field-guide
notebookOrder: 8
excerpt: "Whistle 3 launched with built-in cellular + GPS — no base station. Three days later, Mars Petcare acquired Whistle. The 2014 and 2015 forecasts both hit in the same week. Notes on what changes."
pullquote: "A pet-food company now owns the device that tells you how active your dog is. The conflict of interest isn't theoretical — it's the same company telling you 'feed more' and selling you the food."
---

Big week. Two predictions from previous year-end forecasts landing within days of each other:

- **April 12**: Whistle 3 ships — built-in cellular + GPS, no base station, no BLE-only model. The convergence I [forecast in 2013](/blog/tagg-vs-whistle-cellular-vs-ble-base-station/) is finally here.
- **April 14**: **Mars Petcare** announces the acquisition of Whistle (price not officially disclosed; rumored ~$117M). The pet-food giant now owns the collar telling you how active your dog is.

These two events landing the same week is not coincidence. Mars buying a company *the same week it launches its big product refresh* is the playbook: acquire when valuation is peaked from the launch hype.

## Whistle 3, hardware

- **Cellular GSM/3G modem** (probably Telit or u-blox-class IoT module) — global cellular footprint via T-Mobile MVNO.
- **GPS chip** — modern AGPS (assisted GPS) with cellular tower triangulation as fallback.
- **BLE 4.2** — backup short-range when in BLE range of the owner's phone.
- **Accelerometer + gyroscope** for activity classification (same sensor model as previous Whistles).
- **Rechargeable Li-ion** — claimed 7 days battery life.
- **Water rating IP67** (better than v2's IP65).
- **Subscription**: $99 hardware + **$6.95/month** ($69 annual, $99 for 2 years).

The subscription is the obvious change. Previous Whistles were one-time-purchase; Whistle 3 reintroduces the monthly-fee model that Tagg used. Cellular costs money; somebody has to pay for it.

## What the cellular gets you

The pitch is "GPS anywhere":

- Set a home geofence (~100 m radius). Get push notification if Atom leaves it.
- Real-time tracking via the app — refresh location every few minutes.
- 24-hour location history available.

In practice, the tracking refresh on a cellular collar isn't *real-time*. It's "report once every few minutes when stationary, more often when moving." Cellular + GPS is power-hungry; collars duty-cycle the radio aggressively. Whistle claims 7-day battery; reality on a tracker that gets queried often is closer to **3-4 days**.

For Atom (well-trained, doesn't escape, mostly in the fenced yard), the GPS feature is overkill. For someone with an escape-artist dog, it's the killer feature.

## What it costs over time

| Year | Hardware | Subscription | Cumulative |
|---|---|---|---|
| Year 1 | $99 | $99 | **$198** |
| Year 2 | (replace device?) | $99 | $297-396 |
| Year 5 | (~$200 in hardware lifetime) | $495 | **$695-800** |

Compare to my [previous breakdown for FitBark](/blog/fitbark-2-pet-activity-tracker-market-2015/) ($69 hardware, no subscription, ~$170 over 5 years counting one battery replacement). Whistle 3 is **4× more expensive over 5 years** for the GPS feature.

Worth it for dogs that escape. Not worth it for Atom.

## The Mars Petcare acquisition

Mars Petcare is the pet-food + pet-care arm of Mars Inc. Owns Pedigree, Whiskas, IAMS, Royal Canin, Banfield Pet Hospital. About $17B in annual revenue from pet products before this acquisition.

Buying Whistle gives them:
- Direct telemetry data on dogs' activity, location, behavior.
- A consumer touchpoint (the app) that Mars otherwise lacks.
- Distribution channels into pet-tech retail.

What it means for Whistle data going forward, in my reading:

- **Data flows to Mars Petcare's broader analytics**. Mars wants to know how active dogs are, which dogs eat which foods (cross-reference with Pedigree/Royal Canin purchase data), and how all of that correlates.
- **The app is going to start recommending Mars products**. Subtle at first — "your Lab's activity is high, here's recommended nutrition" — escalating from there.
- **The conflict of interest is now structural**. The company that tells you "your dog needs more activity" is the same company that wants to sell you more food.

## The cynical read

If Mars's algorithm tells me "Atom's activity is lower than the breed baseline, consider [Royal Canin product]," I have to discount the advice — Royal Canin is Mars-owned. Earlier Whistle was independent; the advice could be trusted as data-driven. Now I have to assume the advice is partially marketing-driven.

This is the kind of conflict every connected-device buyer should think about. The companies acquiring smart-pet startups all have product portfolios to sell. The data isn't neutral once the analytics engine is owned by a stakeholder.

I'll keep using Whistle 3 (actually, I'm not buying one — Whistle 2 + FitBark is enough for Atom). But the recommendations layer of the app gets ignored.

## What I'm watching

- **Petco / Petsmart / VCA's reaction**. Do they acquire competing pet-IoT startups? Bet: yes, within 18 months.
- **Will Whistle data continue to flow to third-party integrations** (the unofficial APIs hobbyists use)? Bet: it gets restricted within a year, post-acquisition.
- **Does Whistle stay an independent brand or get absorbed into Mars's brands**? Bet: it stays Whistle-branded for now, gets quietly integrated into Mars's broader pet-data platform.

## What I'm sticking with

For Atom: Whistle 2 + FitBark, no upgrade to Whistle 3, no subscription. The cellular feature isn't worth it for our use case.

For Joule: SureFlap door, nothing else yet.

For the future: I'm now actively watching for **non-Mars-aligned** pet-IoT alternatives. Fi (rumored, VC-funded, not yet shipping) might be the first credible Whistle-competitor that isn't owned by a food company. Watching closely.
