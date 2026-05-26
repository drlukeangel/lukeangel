---
title: "SureFlap Hub — finally, a connected cat door for Joule"
date: 2017-08-08T14:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - cat
  - sureflap
  - wifi
notebook: pet-iot-field-guide
notebookOrder: 13
excerpt: "The Sure Petcare hub finally shipped after a long slip, and it networks the microchip cat door I installed for Joule back in 2015 — no new door, just a firmware update and a sub-GHz base station. A month of logged entries and exits, the proprietary radio, the closed ecosystem, and the one thing the data does that watching the cat never could."
pullquote: "The real win isn't knowing Joule went outside — I knew that. It's that three-to-four trips a day is now a baseline, and the day it drops to one is a health flag I'd never have caught by eye. That's what telemetry does that direct observation can't."
cover: "../../assets/blog/sureflap-hub-connected-cat-door-cover.svg"
coverAlt: "A microchip cat door linked by a short-range sub-GHz radio hop to a wired hub, which bridges over Ethernet to a cloud and a phone — the network layer added to a door that was already there."
---

The Sure Petcare hub finally shipped this spring, after being announced back in 2015 and slipping all the way through 2016. I picked one up. The nice part: it networks the [microchip cat door I installed for Joule in 2015](/blog/sureflap-microchip-cat-door-joules-first-iot/) with no hardware swap at all — the door stays in the wall, a firmware update teaches it to talk to the hub, and the hub adds the layer that was missing. A month in, here's the read. (Note the rename, too: SureFlap became Sure Petcare this year, so the hub carries the new brand while the door still says SureFlap.)

## The hardware

The hub itself:

- A small plastic puck that plugs into the wall.
- **Ethernet to the router — no Wi-Fi on the hub at all**, which I think is the right call. A base station that has to hold a rock-solid link is better off wired; Wi-Fi is the flaky part of every home network.
- A **proprietary sub-GHz radio** to talk to the door — 868 MHz in Europe and a similar low band in the US, not 2.4 GHz.
- Range of roughly 10 m through interior walls. Mine sits in a hallway closet about 5 m from the door, with a solid signal the whole month.

The door is the exact same unit from 2015. No change beyond the firmware that wakes up its radio.

The sub-GHz choice is worth dwelling on. It's the same neighborhood of the spectrum Z-Wave uses in the US (around 908 MHz) — a different protocol, but the same physical-layer logic: longer range through walls, a low data rate (which is all a door-event needs), and far less congestion than the 2.4 GHz band where Wi-Fi, Bluetooth, and every microwave oven are already fighting. For a device that sends a few tiny events a day and must never miss one, low-and-slow beats fast-and-crowded.

![The SureFlap hub topology. On the left, the microchip cat door reads Joule's chip and logs an entry or exit. It sends that event over a short-range proprietary sub-GHz radio hop to the hub, drawn a few meters away through an interior wall. The hub is wired by Ethernet to the home router, which bridges the event up to the Sure Petcare cloud and back down to the owner's phone. A note marks that the door already existed — the hub only adds the network layer — and that the sub-GHz radio is chosen for wall penetration and low congestion, not speed.](../../assets/blog/sureflap-hub-topology.svg)

## The protocol path

End to end, a single trip through the door looks like this:

```
Joule approaches → chip read → entry/exit logged on the door
   → door sends the event over sub-GHz RF to the hub
   → hub forwards it to the Sure Petcare cloud over Ethernet
   → cloud → mobile app + history log
```

![A single trip through the cat door, drawn left to right as four stages. The door reads Joule's chip and logs the entry or exit, then sends it over a short-range proprietary sub-GHz radio hop at 868 MHz to the hub a few meters away. The hub, wired by Ethernet with no Wi-Fi of its own, forwards the event to the Sure Petcare cloud, which pushes it to the phone's app and history log. End to end takes about five to ten seconds. A dashed line underneath spans the door, hub, and cloud to mark that the whole path is a closed link — no Home Assistant, no third-party integration.](../../assets/blog/sureflap-protocol-path.svg)

Chip-read to phone notification runs about 5–10 seconds, which is fine for what this is. The part I wish were open is that proprietary radio: there's no Home Assistant or third-party integration because nobody's reverse-engineered the Sure Petcare RF spec yet. It's a closed link from the door all the way to the cloud, and that closedness is the post's recurring complaint below. I'd love for someone to crack it; I'm not holding my breath.

## The data the hub exposes

The app now shows each entry and exit with a timestamp and direction, a daily count, average outdoor duration, a per-cat breakdown (just Joule for now, but it's multi-cat capable), and a timeline for any given day. A month of it:

| Metric | Value |
|---|---|
| Average daily exits | 3.4 |
| Average daily entries | 3.4 (matches — good, no stuck-outside gaps) |
| Average outdoor duration per trip | 23 minutes (July) |
| Longest single trip | 2h 18m (something in the back yard held her attention) |
| Most-common exit time | 7:15 AM |
| Most-common re-entry | 7:38 AM (post-breakfast routine) |

I knew Joule went outside. I didn't know she had a near-clockwork morning loop and that the rest of her outdoor time comes in short bursts. The matched in/out counts are quietly reassuring, too — it means she's never been logged out without a matching return.

## What's actually useful

A few uses I didn't anticipate but lean on:

- **"Is Joule out?" before locking up at night.** The app shows current state, inside or out, so I don't have to hunt the house for her.
- **Vacation monitoring.** When a neighbor watches her, I can confirm she's actually using the door — out for proper bathroom time — without interrogating the neighbor.
- **Health-anomaly spotting, by hand.** Three-to-four trips a day for a month is now a baseline in my head. If that fell to one, that's a flag: is she lethargic, is something wrong?

That last one is the real value, and it's worth stating as a principle: **the best thing a connected pet device does is surface a trend that direct observation can't.** I see Joule every day and I'd never have clocked a gradual drop in her outdoor trips. A logged baseline would.

![Why the baseline matters, drawn as a month of daily outdoor-trip counts. Most days sit in a band around three to four trips — the established normal. Then a short run of days drops to one trip and is marked with a flag: the kind of gradual change a daily eyeball misses but a logged baseline catches. A caption notes this is the device's real value — not knowing the cat went out, but noticing when the pattern quietly changes.](../../assets/blog/sureflap-baseline-anomaly.svg)

## What's missing

- **No HomeKit or Home Assistant integration.** The API is closed; this won't change without a vendor SDK or someone reverse-engineering the radio.
- **No multi-door coordination.** I have one door, but a multi-door home would want it.
- **No "Joule has been out longer than 30 minutes" alert.** You have to go look in the app; the system won't proactively tell you.
- **No webhooks or outbound triggers.** Nothing leaves the closed ecosystem.

The hardware does its job well. It's the integration story that doesn't exist — the device is an island that reports only to its own cloud and its own app.

## The privacy angle

The hub uploads every entry and exit to Sure Petcare's cloud, and per the terms they keep the timestamps and cat IDs indefinitely. It's not sensitive in the way a medical record is, but it's one more stream of household-rhythm telemetry leaving the LAN — when someone's home to let the cat in, when the house goes quiet — and that rhythm is more revealing than it first looks.

So the hub lives on my isolated IoT VLAN, same as the rest of the smart-home gear: it can reach the Sure Petcare cloud and nothing else on my network. A closed device I can't audit gets a segment it can't escape. That's the standing rule here — if I can't see inside the box, I at least fence the box.

## What's next

The 2017 year-in-review lands in December. The question I'll be carrying into 2018: whether a credible *independent* tracker finally appears — one not owned by a pet-food conglomerate — and whether anyone cracks open a closed ecosystem like this one so the data can actually be mine.
