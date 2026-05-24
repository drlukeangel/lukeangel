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
excerpt: "SureFlap's connected hub finally shipped. Pairs with my [2015 microchip pet door](/blog/sureflap-microchip-cat-door-joules-first-iot/). Joule's entries/exits log to the app. Notes on protocol + data."
pullquote: "Joule goes outside 3-4 times per day. Average outdoor duration: 23 minutes in summer, 8 minutes in winter. Without the connected hub, I'd never have known. This is what data tells you that direct observation can't."
cover: "../../assets/blog/sureflap-hub-connected-cat-door-cover.png"
coverAlt: "SureFlap Hub — finally, a connected cat door for Joule"
---

SureFlap's connected hub finally shipped this spring after being announced in 2015 and slipping all of 2016. Picked one up. Pairs with my existing [SureFlap microchip cat door for Joule](/blog/sureflap-microchip-cat-door-joules-first-iot/) — door stays, hub adds the network layer.

A month in.

## Hardware

**Sure Petcare Hub** (the connected base station):
- Plastic puck, plugs into a wall outlet.
- Ethernet to router (no WiFi to the hub, smart choice for reliability).
- **Proprietary 868 MHz RF** (Europe) / **915 MHz** (US) for talking to SureFlap doors + feeders.
- Range: ~10m through walls. My hub is in the hallway closet, ~5m from the cat door. Solid signal.

**The door itself** is the same model I installed in 2015. SureFlap firmware update enables it to talk to the hub. No hardware change needed.

The 868/915 MHz frequency is interesting — it's the same band Z-Wave uses in the US (908 MHz) and similar in Europe. Different protocol than Z-Wave but same physical-layer characteristics: long range, low data rate, low congestion vs 2.4 GHz.

## The protocol

The hub talks to the SureFlap door via SureFlap's proprietary RF protocol, then bridges to the cloud over Ethernet. Data flow:

```
Joule approaches door → chip read → entry/exit logged on door
                     → door sends event via 868/915 MHz to hub
                     → hub forwards to SureFlap cloud over Ethernet
                     → SureFlap cloud → mobile app + history log
```

End-to-end latency from chip read to phone notification: ~5-10 seconds. Acceptable.

The proprietary RF is the part I'd love to be open — there's no third-party integration (Home Assistant or otherwise) because nobody's reverse-engineered the SureFlap RF spec. Hopefully someone does in the next year.

## The data the hub exposes

The app now shows:

- **Each entry/exit** with timestamp and direction (in/out).
- **Average daily count** of entries + exits.
- **Average daily outdoor duration**.
- **Per-cat statistics** (still only Joule for me, but multi-cat capable).
- **A timeline view** for any day.

After a month, the patterns are interesting:

| Metric | Value |
|---|---|
| Average daily exits | 3.4 |
| Average daily entries | 3.4 (matches; good) |
| Average outdoor duration per trip | 23 minutes (July) |
| Longest single outdoor trip | 2h 18m (chasing something in the back yard) |
| Most-common exit time | 7:15 AM |
| Most-common re-entry time | 7:38 AM (post-breakfast bathroom break) |

Without the hub, I knew Joule went outside. With the hub, I know she has a pretty regular morning routine, and the rest of her outdoor time is short bursts. 

## What's actually useful from the data

**A few things I didn't expect to use but do:**

- **"Is Joule outside" before locking up at night.** App shows current state (inside / outside). I don't have to find her physically.
- **Vacation monitoring.** When my neighbor watches Joule during vacation, I can verify the cat actually used the door (was let out for proper bathroom time) without asking the neighbor.
- **Health anomaly detection (manual).** Joule has been going outside 3-4 times per day for a month. If that drops to 1 time per day, that's a flag for "something's off — is she lethargic? sick?"

The third one is the real win. Connected pet devices' utility, at their best, is **trend detection that's invisible to direct observation**. I see Joule daily but I don't track her exits. The hub does.

## What's missing

- **No HomeKit / Home Assistant integration.** SureFlap's API is closed. Won't fix without reverse-engineering or vendor releasing one.
- **No multi-door coordination** (I only have one door, but multi-door homes would benefit).
- **No "Joule has been outside for >30 minutes" alert.** Has to be eyeball-checked in the app.
- **No webhook / IFTTT-style outbound triggers.** Closed ecosystem.

The closed-ecosystem nature is the limitation. The hardware does the job; the integration story doesn't exist.

## SureFlap's roadmap (rumored)

- A **microchip-activated feeder** (announced for late 2017). Same RF protocol; would let me feed Joule per-cat (if Atom were ever interested in cat food, he'd be blocked).
- **Multi-cat household analytics** — comparing per-cat exits, durations, etc. Useful when (if) we add a second cat.
- **HomeKit support** rumored "eventually" — no commitment.

## The privacy angle

The hub uploads every entry/exit to SureFlap's cloud. They store the timestamps + cat IDs indefinitely (per the EULA). Not strictly sensitive data, but it's another stream of household-rhythm telemetry leaving the LAN.

VLAN isolation on the IoT network helps. The hub can talk to the SureFlap cloud but can't reach anything else on my home network. Same approach as the rest of my smart-home gear.

## What's next

End-of-year review for 2017 coming in December. The big question for 2018: does Fi finally launch, and how does it compare against Whistle 3?
