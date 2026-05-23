---
title: "SureFlap microchip cat door — Joule's first pet IoT"
date: 2015-05-22T11:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - cat
  - sureflap
  - rfid
  - microchip
notebook: pet-iot-field-guide
notebookOrder: 5
excerpt: "Joule turned one. Installed a SureFlap Microchip Pet Door this weekend. Notes on the RFID reader, the chip-allow-list config, the latch, and why this is the first real cat IoT product I've owned."
pullquote: "The SureFlap door reads Joule's chip in under 200 ms as she approaches. The neighbor's cat — which has been getting into my garage by squeezing through gaps — gets denied. Identity-as-physical-access just shipped to consumers."
---

Joule turned a year old last week. She's been an indoor cat until now; we want to give her supervised outdoor access in the fenced yard. The cat-door choice: pet IoT enters the picture for cats, finally.

Installed a **SureFlap Microchip Pet Door** (model DualScan, the version that reads chips on entry *and* exit) yesterday.

## The hardware

- Frame-mounted pet door, ~22 × 22 cm cut-out, install into an exterior door (mine is the back door to the deck).
- Powered by **4× C-cell alkalines** (no mains, no wires). Claimed 1-year battery life.
- **RFID reader** in the frame: 134.2 kHz ISO 11784/11785 + 125 kHz legacy support.
- Latching solenoid driven by the reader logic — unlocks only when an allowed chip is detected.
- **Read range**: ~4 cm. The cat needs to stick her head almost into the doorway before the chip is read. This is intentional — limits false reads from other animals near the door.
- LED indicators: green = ready, yellow = busy, red = denied.

No WiFi. No app. No cloud. Everything happens locally, in the door. This is "smart" in the sense of "embedded logic with sensor + actuator." Not "smart" in the sense of "telemetry to your phone."

In 2015, that's the entire market for cat doors.

## The chip-allow-list setup

Configuration is a brilliant piece of UX:

1. Put the door in "learning mode" (hold the button on the back panel for 3 seconds — LED flashes).
2. Hold the cat near the door (her chip is between her shoulder blades; bring her head to the reader).
3. The door reads the chip, beeps once, and adds it to the allow-list.
4. Exit learning mode.

The door now lets Joule in/out. It does not let anything else in.

Storage capacity: up to **32 chips** in the allow-list, so a multi-cat household with up to 32 cats is supported. (I'm sure someone has tested the 32-cat limit. I will not.)

## The DualScan feature — and why it matters

The basic SureFlap door reads chips on **entry** (lets known cats in, keeps unknown cats out). The **DualScan** model reads chips on **both entry and exit** — letting you set "curfew" rules per cat:

```
Joule:  allowed in always, allowed out 7 AM - 7 PM only
Boson:  (when we get a second cat someday)  allowed in always, allowed out never (full indoor)
```

The curfew prevents Joule from going out at night when foxes and coyotes are active. The door physically refuses to unlatch outward after 7 PM regardless of what Joule wants.

For us today (one cat, fenced yard, supervised outdoor time), the curfew isn't load-bearing. But the DualScan capability is worth the small premium because it's "designed for multi-cat households" and we might be a multi-cat household someday.

## What works after a week

- **Read reliability**: 100% so far. Joule has gone through the door ~40 times. Every read worked first try.
- **Rejection of the neighbor's cat**: confirmed. A gray tabby that's been visiting our deck for months tried to come through the door yesterday. It pushed on the door (which physically didn't budge), looked confused, gave up after three tries. No chip recognized; no entry. Beautiful.
- **Battery indicator**: still at "full" after a week.

## What doesn't, and what I want next

Limitations that bug me:

- **No app, no log.** I don't know when Joule went out today unless I happened to see her. A connected version that logged "Joule out 10:14 AM, back 11:42 AM" to my phone would be useful.
- **No multi-door coordination.** If we had a SureFlap on the front and a SureFlap on the back, they wouldn't know about each other. Cat could go out the front and come in the back; each door would treat that as independent.
- **No integration with home automation.** I'm running Home Assistant; I'd love an "is Joule home" sensor exposed to HA. Currently I have to look at her physically.

Rumors are SureFlap is working on a connected version (the **SureFlap Hub**, supposedly shipping 2016) that adds a base station with WiFi → cloud → app log + multi-door coordination. I'll buy it when it ships.

For now: a non-connected device that does the one job well. Sometimes that's enough.

## The data model that the door doesn't expose

The interesting part of the door is what it *could* tell me but doesn't:

- **Per-cat usage frequency**: how many times Joule goes out per day. Useful for "is she anxious about something" trend analysis.
- **Average duration outside**: useful for routine baselines.
- **Refused-entry events**: how often is the neighbor's cat trying? Surveillance for the cat-cold-war on the deck.
- **Battery health**: at 50% capacity, the solenoid pull strength weakens; a low-battery warning + auto-revert-to-permanent-unlock behavior would prevent the failure mode of "low battery + Joule's locked out at 2 AM."

A network-connected version exposes all of this. Hopefully soon.

## Where Joule fits in the pet-IoT hierarchy

The SureFlap door is the first real "engineering" interaction with a cat IoT product — designed for cats, useful for cats, deployed for a cat. Compared to where the dog side is:

- Whistle has 5+ products in market for dogs (activity monitors, the rumored GPS variant, etc.).
- The cat side has SureFlap + the static microchip + nothing else credible.

The cat-IoT gap from my [2014 forecast](/blog/2014-pet-iot-year-in-review/) is real. The hardware that exists is great (this door works). The catalog is just thin.

## What's next

Whistle has a rumored GPS-enabled product coming this summer or fall. When it ships, I'll do a side-by-side with the current Activity Monitor for Atom. Going to also try a Petnet Smart Feeder if/when it ships — backed the Kickstarter, still waiting.

For now: cat door installed, Joule outside, sun shining, the neighbor's cat across the deck looking confused.
