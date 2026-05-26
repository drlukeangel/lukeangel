---
title: "The pet-collar power budget — what a multi-week cellular tracker would actually take"
date: 2018-10-12T16:00:00-04:00
category: tools
tags:
  - pet-iot
  - gps
  - cellular
  - lte-m
  - power
notebook: pet-iot-field-guide
notebookOrder: 15
excerpt: "Every cellular pet tracker dies in days because of one number: the cellular radio's average current. I worked the power budget for a GPS dog collar against the Whistle GPS Pet Tracker's real 3–4-day life — and the new low-power cellular standard, LTE-M, is the one lever that could plausibly turn days into weeks. Here's the math, and what it would take."
pullquote: "Cellular pet-tracker battery life isn't a marketing number, it's a power-budget engineering problem. The whole game is the modem's average current — and LTE-M's Power Saving Mode is the first thing I've seen that could move it by 10×."
cover: "../../assets/blog/fi-announces-gps-power-budget-engineering-cover.svg"
coverAlt: "A power-budget breakdown for a cellular pet collar — the cellular modem dominating the daily energy bar — beside a battery-life comparison showing days for traditional cellular and weeks for an LTE-M design."
---

The cellular pet tracker is the device I've wanted since 2013 and the device that keeps disappointing me on the one axis that matters: battery. The [Whistle GPS Pet Tracker I lived with](/blog/six-months-on-whistle-3-cellular-realities/) claimed seven days and delivered three to four — one, when it was actually tracking a loose dog. That isn't a Whistle failing so much as a physics failing, and I've been turning over the question of what it would take to fix it. So this post is an engineering exercise: I worked the power budget for a GPS dog collar from the components up, and there's exactly one lever in 2018 that could plausibly turn days into weeks.

## Why pet GPS collars die fast

Where the energy actually goes on a cellular collar, per day:

| Component | Active draw | Duty cycle | Daily energy |
|---|---|---|---|
| Cellular modem (GSM/3G) | 0.5–2 W transmit, ~50 mW idle | High (always listening for the network) | ~3,000–5,000 mWh/day |
| GPS module | 60–120 mW when fixing | Periodic (every few minutes when active) | ~500–1,500 mWh/day |
| BLE radio | 5–15 mW | Continuous advertising | ~100–300 mWh/day |
| MCU + sensors + LEDs | 10–30 mW | Continuous | ~250–700 mWh/day |
| **Total** | | | **~3,800–7,500 mWh/day** |

A puck like the Whistle carries roughly **3,700 mWh** (about 1,000 mAh at 3.7 V). Set that against the table: at the ~7,500 mWh/day of active tracking, that's *half a day*. At the ~3,800 mWh/day of mostly-idle standby, it's about a day before the duty-cycling and deep sleep stretch it to the multi-day figures people actually see.

The one row that dominates everything is the cellular modem. A GSM/3G radio is a power hog — it transmits at up to a couple of watts and idles in the tens of milliwatts while it stays attached to the tower. The seven-day claim only works if the device spends nearly all its time in deep sleep with the modem doing nothing but listening for an occasional page. The instant it has to *transmit* — every position update while the dog is out — the budget collapses. Battery life on these things is, almost entirely, a question of how hard you can make the cellular radio sleep.

![A stacked daily-energy budget for a cellular pet collar, drawn as a single tall bar broken into segments. The cellular modem segment dwarfs the rest — roughly 3,000 to 5,000 mWh a day — while GPS, BLE, and the MCU together make up a much smaller share. A bracket marks the modem as the segment that decides the whole battery life, and a note states the engineering goal plainly: shrink the modem's average current and everything else is rounding error.](../../assets/blog/cellular-collar-power-budget.svg)

## The one lever: LTE-M

The thing that could actually move this number is a cellular standard that only got real in the last year or two: **LTE-M (Cat-M1)**, a low-power flavor of LTE built specifically for IoT devices that need cellular reach but not broadband speed.

- **Throughput**: about 1 Mbps peak, versus LTE Cat-4's 150 Mbps. A position fix is a few dozen bytes — you do not need broadband to send a lat/long.
- **Power**: an average of single-digit milliamps, with 100–200 mA peaks during transmit, against traditional cellular's tens of milliamps of *average* draw.
- **The real trick — Power Saving Mode.** PSM lets the modem tell the network "don't expect me for the next few hours," then drop into a deep sleep that draws microamps while *staying registered*. It wakes on its own schedule, sends its updates, and goes back down. That's the difference between a radio that's always half-awake and one that's asleep 95% of the time.
- **Coverage**: a better link budget than standard LTE, so it reaches into fringe and indoor spots where a normal modem drops.

The rollout timing is what makes this a 2018 conversation and not a 2016 one. AT&T lit up nationwide LTE-M in 2017; Verizon's followed through early this year. By now both carriers have LTE-M across most metro areas — which means a tracker built on it could actually work for a real customer rather than a lab. The Whistle GPS Pet Tracker can't take advantage of any of this: it shipped on GSM/3G in 2016, before LTE-M was deployable. A tracker designed two or three years later would be built on Cat-M1 from the start, and that single choice is worth more to battery life than any other decision in the device.

![A battery-life comparison drawn as two horizontal bars on the same scale. The top bar, a traditional GSM/3G collar, runs out in three to four days. The bottom bar, an LTE-M design with Power Saving Mode and motion-gated GPS, stretches to roughly two to three weeks — several times longer — with a marked caveat that the long figure assumes a mostly-stationary dog inside a known geofence and that an active escape still drains it fast. A note attributes nearly the entire gap to the modem's average current, not the battery size.](../../assets/blog/cellular-collar-battery-comparison.svg)

## Working the multi-week number

Could an LTE-M collar actually hit the "weeks, not days" figure the category needs? Run the math:

- Put a slightly larger cell in it — say **1,800 mAh at 3.7 V, about 6,700 mWh**, which fits a collar puck without making it a brick.
- Swap GSM/3G for **LTE-M with PSM**, taking the modem's average power from the ~2,000 mW-while-active regime down toward a couple hundred milliwatts averaged across a day of mostly sleeping. That's the ~10× reduction in the dominant term.
- **Gate the GPS on motion** — only fix when the accelerometer says the dog is moving — and lean on BLE when the dog is home near a paired base, so the expensive radios stay off until the dog is genuinely out and elsewhere.
- **Wake the cellular only on a geofence break**, not on a fixed timer.

![A state diagram of the radio wake logic that turns a cellular collar's days into weeks. Three states run left to right. Home, near the base station: cellular off, GPS off, BLE talking only to the base, drawing microamps and lasting weeks. Out but inside the geofence, triggered by the dog leaving the base: the cellular modem sleeps in LTE-M Power Saving Mode and the GPS is gated on motion, with only brief wakes lasting days to weeks. Escape, triggered by a geofence break: the cellular modem is on and transmitting and GPS fixes every minute, so the budget collapses to about a day. A footnote stresses that the dominant term is the modem's average current, that PSM keeps it registered while drawing microamps asleep about ninety-five percent of the day, and that no radio standard saves you once the dog is genuinely loose and being located every minute.](../../assets/blog/fi-announces-gps-power-budget-engineering-fig-3.svg)

Do all of that and the arithmetic plausibly supports **two to three weeks** of standby — for a mostly-stationary dog inside a known geofence. The honest caveat is the same one that bit the Whistle: the instant the dog is actually loose and being located every few minutes, the modem is transmitting and the budget collapses toward days again. So "three weeks" would be a real and meaningful improvement, but it's a *standby* number. The number that matters in an emergency — dog out, fixes flying — is still measured in a day or two, and no radio standard changes that.

## What I'd want from whoever builds it

There's an obvious opening here for a tracker that isn't owned by a pet-food conglomerate — the independent-data argument I've made since [Mars bought Whistle](/blog/whistle-3-cellular-mars-acquires-whistle/) — but the thing I'd actually judge it on is engineering honesty:

- **Publish the battery number under load, not just standby.** "Three weeks" on the box and three days when the dog escapes is the same bait-and-switch I logged on the Whistle. Tell me both.
- **Be on LTE-M, and say which carrier.** If it's still GSM/3G in 2018, the battery story is already lost. If it's Cat-M1, tell me whose network, because coverage *is* the product for a device that has to phone home from wherever the dog ended up.
- **Motion-gated GPS and a real home/away model**, so the device isn't burning the cellular budget while the dog naps on the couch.

The power budget is the whole ballgame, and for the first time there's a standard that could actually change it. Whether anyone ships a collar that uses it well — and is honest about the load number — is the thing I'll be watching.

## What's next

The Litter-Robot's Wi-Fi connected version finally shipped, and I have one on order for Joule. The smart-litter category turns out to be where the genuinely *medical* pet data lives — visit frequency, duration, weight — so that's the next one.
