---
title: "Atom arrives — Whistle launches a dog fitness tracker"
date: 2013-10-15T20:00:00-04:00
category: tools
tags:
  - pet-iot
  - whistle
  - ble
  - dog
notebook: pet-iot-field-guide
notebookOrder: 1
excerpt: "Brought home an 8-week-old yellow lab on Sunday. Named him Atom. Two weeks ago a startup called Whistle shipped the first consumer fitness tracker for dogs. Suspiciously perfect timing."
pullquote: "Whistle is Fitbit for dogs. That's the easy comparison. The harder question is whether tracking activity actually tells you anything about a dog's health or whether it's just a number we like to look at."
cover: "../../assets/blog/atom-arrives-whistle-activity-monitor-launches-cover.png"
coverAlt: "Atom arrives — Whistle launches a dog fitness tracker"
---

Brought home an 8-week-old yellow lab puppy on Sunday. Named him **Atom**. The name fits — particle-physics-themed because we like that around here, and also he is small and energetic and basically all motion. The plan: pet-tech-curious engineer becomes dog person, dog gets all the gadgets, engineer writes about it.

Two weeks ago — October 8 — a startup called **Whistle** shipped the first consumer-friendly activity tracker for dogs. The timing of Atom's arrival is convenient. I bought one yesterday.

Notes from the install.

## What Whistle is, hardware-wise

- A coin-sized aluminum puck (~30 g) that clips to the collar.
- 3-axis accelerometer + minimal MCU.
- **Bluetooth 4.0 (BLE)** — talks to a base station, not directly to a phone.
- Rechargeable Li-ion battery, claimed 7-10 days.
- **Base station** (the "Whistle Hub") plugs into a wall outlet on home WiFi. Receives device telemetry when Atom is in BLE range (~10 m through walls).

The architecture is **device → base station → Whistle's cloud → iOS app**. The base station is the WiFi bridge. The collar device itself has no WiFi, no cellular — only BLE.

Compared to Whistle's older competitor:

| | **Whistle Activity Monitor (2013)** | **Tagg The Pet Tracker (2011)** |
|---|---|---|
| Radio | BLE → home base station | Cellular (GSM) direct |
| Primary feature | Activity tracking | GPS location |
| Battery | ~7-10 days | ~2-3 days |
| Out-of-home location | None | Yes (cellular) |
| Subscription | None (one-time $129) | $7.95/month |
| Form factor | Coin-sized clip | Larger puck on collar |

Different products solving different problems. **Tagg is "where is my dog if it gets out."** **Whistle is "how active is my dog."** Whistle is cheaper, smaller, longer battery life — at the cost of zero out-of-home awareness.

For Atom (8 weeks old, going nowhere unsupervised), Whistle's the right starting point. If we lose him, we have bigger problems than the tracker.

## The setup, in detail

1. Plug in the base station. WiFi setup via the iOS app (the temporary-AP-mode dance — phone joins `Whistle.xxx` SSID, hands over home WiFi credentials, phone rejoins home WiFi).
2. Charge the Whistle device on the base station via the included contact pads (no cable).
3. Open the iOS app, set up an account, name the dog (Atom), enter breed (Labrador), weight (currently 9 lbs, growing rapidly), age (8 weeks).
4. Clip the device to Atom's collar.
5. The app calibrates against the Whistle "breed activity database" — apparently there's a model for what a healthy 8-week Lab should do daily.

Total setup: ~15 minutes. The Lab puppy was uncooperative.

## What the data looks like

The iOS app shows:
- **Activity minutes per day**: target based on breed/age. For an 8-week Lab puppy, target is something like 60-90 minutes/day; we've been hitting 120-150.
- **Rest vs play vs walk** classifications.
- **Comparison to other dogs of similar breed/age** — a kind of percentile rank.

The classification model is reasonable. The puppy plays in 5-15 minute bursts, then naps for 45-90 minutes. Whistle correctly classifies the bursts as "play" and the naps as "rest."

What it doesn't show, because the hardware can't sense it:
- Heart rate, respiratory rate, temperature (no medical sensors).
- Location outside the home (no GPS).
- Specific behaviors (no camera).

## The skeptic's question

Whistle is "Fitbit for dogs." The easy comparison. The harder question — and one I expect to revisit — is whether tracking activity actually tells you anything about a dog's health, or whether it's just a number we humans like looking at.

For a puppy: probably mostly the latter. He's growing; activity will fluctuate wildly; the model has no way to know if today's lower-than-baseline activity is "growing pains" or "vet visit needed." The interesting question is whether activity *trends* over months reveal anything a watchful owner wouldn't notice anyway.

Going to write that post in a year, after I have data.

## What I'm wondering

A few open questions:

- **Battery degradation.** Li-ion in 7-day cycles will degrade meaningfully in 18-24 months. Replacement cost / strategy?
- **Cloud dependency.** Whistle's an early-stage startup. If they fold or get acquired, what happens to the cloud? My data?
- **Privacy.** Activity data on a dog is low-stakes. But it's also a household sensor — Whistle implicitly knows when Atom is home or not, which approximates "when are people home."
- **Battery life in winter.** The collar's outdoors a lot. Lithium chemistry hates cold. We'll see.

## Next steps

- Compare against the Tagg cellular option in a month, after I see how often we *actually* need out-of-home location.
- Try the data export — Whistle claims a JSON-format export. Going to see what's in there.
- Set up some kind of integration. Whistle's cloud has an unofficial API; some hobbyists on the forums have reverse-engineered enough of it to fetch daily summaries via curl.

Welcome home, Atom. The data starts today.
