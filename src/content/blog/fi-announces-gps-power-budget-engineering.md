---
title: "Fi announces — and the GPS power-budget engineering"
date: 2018-10-12T16:00:00-04:00
category: tools
tags:
  - pet-iot
  - fi
  - whistle
  - gps
  - cellular
  - power
notebook: pet-iot-field-guide
notebookOrder: 15
excerpt: "Fi closed a $5M seed and announced a smart collar with claimed 3-week battery — 5-10× Whistle 3. Notes on the power-budget engineering for a cellular pet collar, and whether the claim is plausible."
pullquote: "Cellular pet tracker battery life is a power-budget engineering problem disguised as a marketing number. If Fi delivers 3 weeks where Whistle delivers 3-4 days, they've solved something other vendors haven't."
cover: "../../assets/blog/fi-announces-gps-power-budget-engineering-cover.png"
coverAlt: "Fi announces — and the GPS power-budget engineering"
---

Fi closed a $5M seed round in October. The company's product — a smart collar for dogs — isn't shipping yet (planned 2019). What's interesting is the **claimed battery life**: 3 weeks, up from Whistle 3's real-world 3-4 days.

If true, that's a 5-10× improvement in the same power class. Worth understanding the engineering claim.

## Why pet GPS collars die fast

The previous reference point is the [Whistle 3 review I wrote a year ago](/blog/six-months-on-whistle-3-cellular-realities/): claimed 7 days, real 3-4 days, 1 day when actively tracking.

Where the power goes on a cellular pet collar:

| Component | Active draw | Duty cycle | Daily energy |
|---|---|---|---|
| Cellular modem (GSM/3G) | 0.5-2 W transmit, 50 mW idle | High (always-listening for cloud commands) | ~3,000-5,000 mWh/day |
| GPS module | 60-120 mW when fixing | Periodic (every few minutes when active) | ~500-1,500 mWh/day |
| BLE radio | 5-15 mW | Continuous advertising | ~100-300 mWh/day |
| MCU + sensors + LEDs | 10-30 mW | Continuous | ~250-700 mWh/day |
| **Total daily energy** | | | **~3,800-7,500 mWh/day** |

Whistle 3's battery is **~3,700 mWh** (1000 mAh @ 3.7V). At 7,500 mWh/day actively tracking, that's literally half a day. At 3,800 mWh/day on standby, that's a full day.

The 7-day claim assumes most of the device's time is spent in **deep sleep with cellular paging only** — modem listens for tower pings, doesn't transmit. Battery life depends entirely on how aggressively duty-cycled the cellular radio is.

## What Fi's 3-week claim probably means

Fi hasn't published detailed specs. From their materials + interviews:

- **LTE-M / Cat-M1 cellular** (low-power IoT cellular) instead of full GSM/3G. LTE-M's PSM (Power Saving Mode) lets the modem sleep for *hours* between pages. Average current ~5 mA vs traditional cellular's ~50 mA.
- **Bigger battery**: rumored 1,500-2,000 mAh vs Whistle 3's 1,000 mAh.
- **More aggressive sleep states**: GPS only fires when motion is detected; BLE-only when the dog is near a paired "Fi base" (analogous to the old Whistle base station).
- **Better algorithm for when to actually wake the cellular**: only when the dog leaves a known safe zone (geofence violation).

Math check: 1,800 mAh @ 3.7V = ~6,700 mWh battery. With LTE-M at ~200 mW average instead of cellular's ~2,000 mW average — that's a 10× reduction in cellular energy. The math could plausibly support 3 weeks if the dog is mostly stationary and within a known geofence.

The claim is **plausible but conditional**. "3 weeks" is the best case (indoor dog, rarely leaves geofence). Real-world for a moderately active dog: probably 1-2 weeks. Still 2-3× better than Whistle 3.

## What makes this possible — LTE-M

Worth a digression. LTE-M (Cat-M1) is a low-power variant of LTE designed specifically for IoT devices that need cellular but don't need broadband throughput:

- **Throughput**: 1 Mbps peak (vs LTE Cat-4's 150 Mbps).
- **Power**: 5 mA average, 100-200 mA peak. Versus traditional cellular at 50-100 mA average.
- **Coverage**: better than LTE in fringe areas (better link budget).
- **Cost**: lower data plans because the throughput is tiny.

LTE-M started rolling out in 2017-2018 in the US. By 2018, Verizon and AT&T have LTE-M coverage in most metro areas. Fi's bet is that LTE-M is mature enough by their 2019 ship date to support the product nationally.

Whistle 3 doesn't use LTE-M — it uses traditional GSM/3G, which is power-hungry. If Whistle had launched 2-3 years later, they'd probably have gone LTE-M too.

## What Fi's broader pitch looks like

Beyond battery life, Fi's announced positioning:

- **No Mars/conglomerate ownership** — independent VC-backed company.
- **Subscription model**: $99 hardware + ~$10/month or $99/year (similar to Whistle).
- **Activity tracking + location** (similar feature set to Whistle 3).
- **Owner community** (social features I'll ignore).

The Mars-independence is the differentiator I care about. If Fi delivers what they're promising, they're the first credible Whistle-competitor that doesn't have a structural conflict of interest with their data.

## What I'd buy when Fi ships

Strong "yes" if:
- 3-week battery is real (or even 2 weeks).
- LTE-M coverage works in my area.
- Activity tracking is at least as good as Whistle's.

Strong "wait" if:
- Battery life turns out to be 5-7 days like Whistle.
- LTE-M coverage is spotty (the modem fails the same way Whistle's GSM does in low-coverage areas).
- The Series A funding runs out before they ship in volume.

Going to be patient and let the first batch of Fi units land before buying. Re-evaluation post when they ship in 2019.

## What's next

Litter-Robot III Connect (the WiFi-connected smart-litter version) shipped last month. I have one on order for Joule. Going to write about the smart-litter category and what the connected version actually tracks.
