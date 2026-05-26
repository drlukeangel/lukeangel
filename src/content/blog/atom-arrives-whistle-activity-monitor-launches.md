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
cover: "../../assets/blog/atom-arrives-whistle-activity-monitor-launches-cover.svg"
coverAlt: "A yellow Lab puppy wearing a small clip-on collar monitor that sends short-range Bluetooth waves to a phone — and that also syncs over the home WiFi network — the new shape of consumer pet-tech in 2013."
---

Brought home an 8-week-old yellow lab puppy on Sunday. Named him **Atom**. The name fits — particle-physics-themed because we like that around here, and also he is small and energetic and basically all motion. The plan: pet-tech-curious engineer becomes dog person, dog gets all the gadgets, engineer writes about it.

Two weeks ago — October 8 — a startup called **Whistle** shipped the first consumer-friendly activity tracker for dogs. The timing of Atom's arrival is convenient. I bought one yesterday.

Notes from the install.

## What Whistle is, hardware-wise

- A coin-sized aluminum puck (~30 g) that clips to the collar.
- 3-axis accelerometer + minimal MCU.
- **Two radios on board: Bluetooth 4.0 (BLE) *and* WiFi (802.11 b/g/n).** No separate hub.
- Rechargeable Li-ion battery, claimed 7-10 days.
- Syncs roughly **once an hour** by **either** path — BLE to my paired phone (the phone relays the data to the cloud), **or** the home WiFi network directly (the puck joins our WiFi and uploads to the cloud itself, no phone needed when Atom's home).

The thing I didn't expect: there's no base station. I went in assuming a wall-powered hub — that was the shape of most 2013 home gadgets — and there isn't one. The puck talks to the internet two ways, and it does it on its own. The architecture is **collar puck → (BLE-to-phone *or* WiFi-direct) → Whistle's cloud → iOS app**.

The clever bit is power. Both radios are never on at once. The puck keeps BLE up for the low-cost case — staying loosely aware of the paired phone — and when it's time to actually push a batch of data, it powers BLE *down*, brings WiFi *up* long enough to sync, then drops WiFi and switches back. A WiFi sync is expensive in milliamp-hours; gating it to roughly hourly bursts and never running it alongside BLE is how a coin-sized Li-ion cell still claims a week and a half.

And when neither path is reachable — Atom's out on a walk, away from both my phone and home WiFi — the puck just **buffers to flash**, up to about three weeks of activity, and uploads the backlog the next time it's in range of either the phone or the home network. So there's no live tracking off-property, but there's also no data lost. What it genuinely *cannot* do is tell me where he is the moment he's out of range: there's no GPS and no cellular, only the two short-haul radios.

![Whistle's data path in 2013: the collar puck carries two radios — BLE 4.0 and WiFi 802.11 b/g/n — plus a 3-axis accelerometer, and only one radio is powered at a time. It syncs to the cloud about once an hour by either of two paths: over Bluetooth to the owner's paired phone, which relays the data up to Whistle's cloud, or over the home WiFi network directly, with the puck joining WiFi and uploading on its own with no phone involved. There is no base station. The iOS app reads the daily activity summary back down from the cloud. Out of range of both the phone and home WiFi, the puck buffers up to about three weeks of activity to flash and uploads the backlog when it's next near either one.](../../assets/blog/atom-arrives-whistle-topology.svg)

Compared to Whistle's older competitor:

| | **Whistle Activity Monitor (2013)** | **Tagg The Pet Tracker (2011)** |
|---|---|---|
| Radio | BLE 4.0 + WiFi (phone *or* home network) | Cellular (GSM) direct |
| Primary feature | Activity tracking | GPS location |
| Battery | ~7-10 days | ~2-3 days |
| Out-of-home location | None | Yes (cellular) |
| Subscription | None (one-time $129) | $7.95/month |
| Form factor | Coin-sized clip | Larger puck on collar |

Different products solving different problems. **Tagg is "where is my dog if it gets out."** **Whistle is "how active is my dog."** Whistle is cheaper, smaller, longer battery life — at the cost of zero out-of-home awareness.

The split isn't really about features; it's about which radio you bolt to the collar, and the radio dictates everything downstream.

![Two pet trackers, two radios, two battery realities. Left: the Whistle activity monitor carries short-range radios — BLE and WiFi — that stay mostly asleep, so the battery lasts a week and a half, but it can only report when the dog is near the paired phone or the home WiFi, and it has no GPS. Right: Tagg carries a cellular and GPS radio that must stay awake to hold a network fix, so it tracks the dog anywhere on the cellular network but the battery drains in two to three days and it needs a monthly subscription. The arrow notes the rule: more radio on means more reach and less battery.](../../assets/blog/atom-arrives-ble-vs-cellular.svg)

For Atom (8 weeks old, going nowhere unsupervised), Whistle's the right starting point. If we lose him, we have bigger problems than the tracker.

## The setup, in detail

1. Charge the puck on the included USB cradle (the puck drops onto contact pads, no cable into the device itself).
2. Open the iOS app, set up an account, name the dog (Atom), enter breed (Labrador), weight (currently 9 lbs, growing rapidly), age (8 weeks).
3. Hand the puck your home WiFi. There's no hub to plug in — the WiFi setup happens *on the device* via the iOS app's temporary-AP-mode dance: the puck briefly broadcasts its own `Whistle.xxx` SSID, the phone joins it, the app hands over the home WiFi credentials, the puck stores them and joins the home network, and the phone rejoins home WiFi. After that the puck can upload over WiFi directly.
4. Clip the device to Atom's collar.
5. The app calibrates against the Whistle "breed activity database" — apparently there's a model for what a healthy 8-week Lab should do daily.

Total setup: ~15 minutes. The Lab puppy was uncooperative.

## What the data looks like

The iOS app shows:
- **Activity minutes per day**: target based on breed/age. For an 8-week Lab puppy, target is something like 60-90 minutes/day; we've been hitting 120-150.
- **Rest vs play vs walk** classifications.
- **Comparison to other dogs of similar breed/age** — a kind of percentile rank.

The classification model is reasonable. The puppy plays in 5-15 minute bursts, then naps for 45-90 minutes. Whistle correctly classifies the bursts as "play" and the naps as "rest."

What's actually happening under the hood is simpler than the app makes it look. There are no medical sensors in the puck — just the accelerometer. The motion signal gets bucketed into rest / play / walk, the active buckets get summed into "activity minutes," and that daily total gets compared against a target the breed-and-age model spat out. Three steps, one cheap sensor.

![How a single accelerometer becomes a daily score. Step one: the 3-axis accelerometer produces a jagged motion trace over the day — flat stretches during naps, tall spiky bursts during play. Step two: the device buckets each stretch into rest, play, or walk. Step three: the play and walk minutes are summed into a daily activity total and drawn as a bar against the breed-and-age target line; Atom's puppy total of 120 to 150 minutes sits well above the 60-to-90-minute target. No heart rate, no temperature, no GPS — just motion, classified and counted.](../../assets/blog/atom-arrives-accelerometer-to-score.svg)

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
