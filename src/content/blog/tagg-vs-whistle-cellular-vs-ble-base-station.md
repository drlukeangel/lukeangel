---
title: "Tagg vs Whistle — cellular vs BLE pet-tracker philosophies"
date: 2013-11-22T15:00:00-05:00
category: tools
tags:
  - pet-iot
  - whistle
  - tagg
  - cellular
  - ble
  - protocols
notebook: pet-iot-field-guide
notebookOrder: 2
excerpt: "A month into the Whistle Activity Monitor. The fitness-tracker model is clear. Tagg The Pet Tracker — a Qualcomm spin-off from 2011 — took a different approach. Notes on the two architectures."
pullquote: "Cellular pet tracker for $7.95/month. BLE pet tracker for zero/month. The subscription difference dwarfs the hardware difference; the architecture difference is what makes one of these die a slow death."
cover: "../../assets/blog/tagg-vs-whistle-cellular-vs-ble-base-station-cover.png"
coverAlt: "Tagg vs Whistle — cellular vs BLE pet-tracker philosophies"
---

A month into the [Whistle Activity Monitor on Atom](/blog/atom-arrives-whistle-activity-monitor-launches/). The fitness-tracker model is clear: BLE to a home base station, activity counted, no cellular, no subscription, ~7-day battery.

But Whistle wasn't the first pet tracker. **Tagg The Pet Tracker** has been on the market since 2011 — two years before Whistle shipped — and took a completely different architectural approach. Two products, two philosophies. Worth understanding both.

## Tagg, the cellular incumbent

Tagg was launched in 2011 by **Snaptracs**, a subsidiary of Qualcomm. Qualcomm is a cellular-chip company, so the fingerprints of their core competency are all over the device.

**Hardware:**
- Plastic puck (~30 g) that clips to the collar.
- Built-in **cellular GSM modem** + GPS chip.
- Rechargeable battery, claimed 30 days idle but **2-3 days when actively tracking** (cellular kills battery).
- No BLE, no WiFi.

**Service model:**
- $99 hardware + **$7.95/month subscription** (or $79/year).
- Subscription pays for the cellular data plan (T-Mobile MVNO).
- Out of subscription, the device is a brick.

**What it does:**
- Real-time GPS location anywhere the cellular network reaches.
- Geofence around the home — alerts if dog leaves the fence.
- Activity counting (basic accelerometer, secondary feature).

This is the "what if my dog escapes" product. Hunting dogs, working dogs, escape-artist dogs — Tagg is the right answer.

## Whistle, the fitness-tracker challenger

[Whistle](/blog/atom-arrives-whistle-activity-monitor-launches/) shipped October 8, 2013 — two years after Tagg, with a fundamentally different bet.

**Hardware:**
- Coin-sized aluminum puck (~30 g, same weight, smaller).
- **BLE 4.0** only. No cellular. No GPS.
- Rechargeable, claimed 7-10 days actual.
- Requires the **base station** (plug into wall, on WiFi) to bridge BLE → cloud.

**Service model:**
- $129 hardware + **no subscription**.
- Cloud features (history, comparison data) are free.

**What it does:**
- Activity tracking, calibrated by breed + age.
- Rest / play / walk classification.
- No location tracking. None.

This is the "how active is my dog" product. Healthy dogs whose owners want fitness data. The exact use case the human Fitbit also serves.

## The architecture in detail

**Tagg's data path:**
```
Dog wandering → Tagg device GPS lock → cellular uplink to Snaptracs cloud
            → push notification to phone app
            → "Atom has left the geofenced area"
```

Latency: 30-90 seconds (GPS fix + cellular handshake + push delivery). Cellular keeps the radio mostly awake, hence 2-3 day battery in real conditions.

**Whistle's data path:**
```
Dog at home → BLE advertisement → base station receives
           → base station forwards to Whistle cloud over home WiFi
           → app syncs daily aggregate via Whistle API

Dog outside home → BLE out of range → device buffers locally on flash
                 → on return, sync resumes
```

Latency: minutes to hours (the device is largely asleep when not advertising). Off-home behavior is invisible until the dog returns to BLE range of the base station.

The architecture difference is what produces the battery-life difference. Cellular = radio mostly on = 2-3 days. BLE = radio mostly off = 7+ days.

## Subscription cost math

| | Tagg | Whistle |
|---|---|---|
| Hardware | $99 | $129 |
| Annual subscription | $79 | $0 |
| 5-year cost | $99 + $395 = **$494** | $129 + $0 = **$129** |
| 5-year cost minus the lost device when battery dies + you replace once | ~$590 | ~$260 |

The subscription delta dwarfs the hardware delta over any reasonable ownership timeline. Whistle is **half the price** over five years for the average dog owner.

## Where each fits

**Tagg fits:**
- Hunting dogs, working dogs (out of BLE range constantly).
- Escape-artist dogs (jumped fences, slipped collars).
- Travel dogs (car trips, away-from-base-station).
- Dogs you cannot afford to lose.

**Whistle fits:**
- Indoor + yard dogs (rarely out of home BLE range).
- Healthy adult or senior dogs being monitored for activity trends.
- Anyone unwilling to pay $80+/year in subscription.
- Owners interested in fitness data, not location.

Atom is the second category. Whistle. Easy call.

## What's interesting about both

Both are early-stage products solving narrow problems. Both will have to expand. The obvious move for each:

- **Tagg's natural expansion**: add activity tracking (already has the accelerometer; just needs better classification + UX). They've already added a basic step-counter.
- **Whistle's natural expansion**: add GPS + cellular. The only path to "where is my dog" if they want to compete with Tagg directly.

I'd bet on Whistle making the move. They have momentum and a fitness-first brand. Tagg has cellular but a clunky form factor and a high subscription. If Whistle adds cellular at a similar price point, Tagg's in trouble.

(I'd put 70% probability on Whistle shipping a GPS-enabled product by end of 2015 and 50% on Tagg being acquired or shutting down by 2017.)

## What I'd buy for Atom in 2015 if Whistle ships GPS

A single device with both: BLE + base station + GPS + cellular as a hybrid. BLE for "in the house"; cellular for "missing dog." Battery life trade-off split between use cases. That's the convergence I expect.

For now: just Whistle. Atom doesn't go anywhere unsupervised yet anyway.

## What's next

Joule the kitten arrives in spring. Cat pet-IoT is a different category entirely (RFID + microchipping rather than BLE/GPS — short range, identity-focused, indoor-focused). Going to write the microchipping primer when she gets here.
