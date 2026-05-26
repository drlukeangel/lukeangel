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
excerpt: "Joule turned one and earned yard privileges, so I installed a SureFlap microchip cat door. It reads the same chip the shelter put in her shoulder and unlatches only for her. Notes on the read-and-latch loop, the chip allow-list, and why calling this 'IoT' is generous — there's no network anywhere in it."
pullquote: "I keep calling it Joule's first IoT device. It isn't, really. There's no network in it anywhere — no Wi-Fi, no app, no cloud, no second device to talk to. It's a battery, a coil, and a latch that knows one number. That's the honest description, and it's the most interesting thing about it."
cover: "../../assets/blog/sureflap-microchip-cat-door-joules-first-iot-cover.svg"
coverAlt: "A warm-orange illustration: a cat approaching a pet flap whose frame carries a small RFID reader, faint inductive rings reaching the chip in her shoulder, and a latch bolt drawn back to let her through — a self-contained, battery-powered flap with no network anywhere in the picture."
---

Joule turned a year old last week. She's been an indoor cat since [she arrived as a kitten](/blog/joule-arrives-microchip-rfid-primer/), but the fenced back yard is hers to earn now, and I wanted her to come and go on her own schedule instead of mine. So this weekend I cut a hole in the back door and installed a **SureFlap Microchip Pet Door** — the DualScan model, the one that checks her chip on the way out as well as the way in.

I want to be honest about why I'm writing this one up, because the framing matters. I keep wanting to call it *Joule's first IoT device* — the first connected thing I've put on the cat side of the house, the way [Atom's Whistle](/blog/atom-arrives-whistle-activity-monitor-launches/) was the first on the dog side. But that's not what this is. There is no network in this door anywhere. No Wi-Fi, no Bluetooth, no app, no cloud, nothing it phones home to and nothing it talks to. It's a battery, a coil, a little reader, and a latch. Everything it does, it does inside the door frame, and then it forgets it happened.

That gap between what I want to call it and what it actually is turned out to be the whole point. So let me take it apart.

## What's in the frame

The door is a frame-mounted flap, roughly 22 by 22 cm of clear plastic on a hinge, set into a hole I cut in the back door. No mains power runs to it — it lives on **four C-cell alkalines** in the frame, and SureFlap claims about a year on a set. That single fact tells you most of what you need to know about its ambitions: a device that has to sip from four C-cells for a year is not a device that's running a radio.

Inside the frame, in order of how a read actually happens:

- An **RFID reader coil** wound into the frame around the opening, tuned to read the same passive pet microchips a vet's scanner reads.
- A small **microcontroller** that decodes the chip number and checks it against a stored allow-list.
- A **latching solenoid** on the flap — the actuator. It physically holds the flap locked, or pulls a bolt back to release it.
- A few **status LEDs** on the inside housing: ready, reading, denied.

That's the entire bill of materials, more or less. A reader, a brain, a lock, and a battery. The cleverness is in the loop those four parts run, not in any one of them.

## The read-and-latch loop

When Joule walks up to the door, here's what happens, start to finish, in well under a second:

![The SureFlap read-and-latch loop drawn as a cycle. A cat approaches the flap and the frame's RFID reader energizes its coil. The coil's field powers the passive microchip in the cat's shoulder, which sends its FDX-B ID number back by load modulation. The microcontroller reads the number and checks it against the stored allow-list. If the number is on the list, the latching solenoid pulls the bolt back and the flap unlocks for a few seconds; if not, the bolt stays thrown and the flap is held shut. Either way the door then re-locks and goes back to idle, waiting for the next approach. The whole loop runs locally inside the frame with no network involved.](../../assets/blog/sureflap-read-and-latch-loop.svg)

1. **The reader energizes.** The frame coil throws out a 134.2 kHz field, the same trick a handheld scanner uses. (I [took this apart in detail when Joule arrived](/blog/joule-arrives-microchip-rfid-primer/) — it's inductive coupling, the same physics as a wireless toothbrush charger.)
2. **Joule's chip answers.** Her implant is a passive **ISO FDX-B** tag — no battery, dead until a reader powers it. The frame's field wakes it across a few centimeters, and it recites its 15-digit number back by load-modulating the coil.

![Inductive coupling between the door's coil and the passive chip in the cat's shoulder. The frame coil drives a 134.2 kHz field that reaches across to the FDX-B implant, which has no battery and is dead until powered. The field wakes the chip, and the chip sends its 15-digit ID back by load-modulating the same coil — the answer riding back on the field that powered it. A side note draws the parallel to a wireless toothbrush charger: power flows one way and the reply rides back on the same field, so the reader has to pay for both halves of the conversation.](../../assets/blog/sureflap-microchip-cat-door-joules-first-iot-fig-1.svg)
3. **The microcontroller checks the number** against the allow-list stored in the door. This is the entire decision: *is this number one I know?*
4. **The latch acts.** Known number, the solenoid pulls the bolt back and the flap is free to swing for a few seconds. Unknown number — or no number at all — the bolt stays thrown and the flap physically won't open.
5. **It re-locks and forgets.** The door goes back to idle, waiting for the next approach. It doesn't log the read. It doesn't count it. The event is gone the instant it's over.

The read range is the thing people get wrong about these doors, and it's worth dwelling on because it's not a flaw — it's the same physics constraint I hit on the implant side. The coil only powers the chip across **a few centimeters**, so Joule has to bring her head most of the way into the opening before the read fires. You can't game that range up. A passive chip with no battery of its own can only be read from as far as the reader can push enough power to wake it, and that distance is short by nature. Here, short is exactly what you want: it means the door reads *the cat going through it*, not every animal milling around on the deck.

![Why the short read range is a feature, not a flaw. On the left, the cat brings her head into the door opening, well inside the small read zone of a few centimeters that hugs the coil — the read fires and a green check confirms it. On the right, across a divider, the neighbor's gray tabby sits on the deck, out of range; with no battery of its own the chip can only answer from as far as the coil can wake it, so too far means never powered and never read, marked with a red X. The short range is what makes the door respond to the cat going through it rather than every animal nearby.](../../assets/blog/sureflap-microchip-cat-door-joules-first-iot-fig-2.svg)

## The allow-list — teaching it Joule

Configuring which animals get in is the part SureFlap got genuinely right, and it's a nice little piece of design precisely because it has no app to lean on. There's no screen, no pairing, no account. The door learns chips by being shown them:

![The allow-list learning flow, drawn as three steps with the door's memory shown as a small table of stored chip numbers. Step one: hold the button on the back of the unit until the LED flashes, which puts the door into learn mode. Step two: hold the cat up to the flap so the reader reads the chip in her shoulder; the door beeps once to confirm. Step three: the chip's number is written into the door's allow-list, shown as one row added to a table that holds up to thirty-two numbers. From then on the read-and-latch loop unlocks for any number in the table and stays locked for any number that is not. The whole list lives in the door with no account or app behind it.](../../assets/blog/sureflap-allow-list-learn.svg)

1. **Hold the button** on the back of the frame until the LED flashes — that's learn mode.
2. **Hold the cat up to the flap.** The reader reads her chip the same way it will in normal use, and the door beeps once to confirm it captured the number.
3. **The number is written to the allow-list.** Done. Back out of learn mode and the door now unlocks for Joule and nothing else.

The door holds up to **32 chips**, which is its honest answer to the multi-cat household — every resident animal you want through that door gets shown to it once. (Whether anyone has a genuine 32-cat use case I'll leave alone.) The list is the door's whole notion of identity: a flat set of numbers it trusts, checked on every read. It's the simplest possible access-control list, and for one cat and a back door, simple is the right amount.

## DualScan — and why I paid the small premium

The base SureFlap reads chips on the way **in** only: known cats enter, strange cats stay out, and anyone inside can leave freely. The **DualScan** model I bought reads on the way **out** as well, which means the door can make per-direction decisions:

```text
Joule:   in  -> allowed always
         out -> allowed (yard privileges)

a future indoor-only cat:
         in  -> allowed always
         out -> denied (kept inside)
```

For us today — one cat, a fenced yard, me usually around — the outbound check isn't doing much load-bearing work yet. Joule's allowed out, full stop. The reason I paid the small premium anyway is that the local "deny exit to this specific animal" capability is the kind of thing you can't add later in software, because there's no software to add it to. If we ever bring home a second cat that should stay strictly indoors, the door already reads it on the way out and can refuse it. Buying the capability now is cheaper than re-cutting the door later.

## A week in

A week of real use, and the honest scorecard:

- **Read reliability has been 100%.** Joule's gone through perhaps forty times. Every read fired on the first approach. I half-expected to see her sit confused at a door that wouldn't open; haven't once.
- **It rejected the neighbor's cat, which was the actual point.** There's a gray tabby that's been treating our deck as its own for months. It walked up to the new door, pushed, and the flap simply didn't move — no chip it recognized, no unlatch. It tried a few times and gave up. That's the moment the whole purchase justified itself: an unfamiliar animal physically can't get the door to act for it, because it isn't carrying a number the door trusts.
- **Battery indicator still reads full.** Too early to grade the year-long claim, but a week in there's no movement.

The failure mode I keep poking at is the battery one. The latch is a *solenoid* — it needs current to pull the bolt. As the C-cells age, the pull weakens, and the obvious bad day is a dead battery at 2 AM with Joule on the wrong side of a door that no longer has the muscle to unlock. I don't yet know how the door fails — whether it fails locked or fails open as the voltage sags. That's the first thing I'll find out when the batteries get low, and it's exactly the kind of behavior I'd want spelled out and, ideally, warned about in advance. Right now I just have a "battery low" LED and my own attention.

## The thing it can't tell me

Here's where I keep circling back, because it's the engineer's itch this door doesn't scratch. It runs that read-and-latch loop dozens of times a day, and it throws every bit of it away. Sitting right there, unrecorded, is data I'd genuinely use:

- **How often Joule goes out.** A count per day is a behavioral baseline. A cat that suddenly doubles its trips, or stops going out entirely, is telling you something — but only if something's keeping score.
- **How long she stays out.** Average duration is the kind of routine signal that makes the *abnormal* day visible.
- **How often the neighbor's cat is trying.** The door knows every refused read. I'd love to know whether the cat cold-war on the deck is escalating or fading.
- **Battery health as a number,** not a binary LED — so the 2 AM failure announces itself days early instead of at the door.

![What becomes of every read the door performs. On the left, a read happens — dozens of times a day, in and out, allowed and denied. Four dashed boxes show the data a connected version could keep from those reads: trips per day as a behavioral baseline, time outside as the routine signal, refused reads as a record of the deck cold war, and battery health as a number rather than a binary LED. Every one of those arrows funnels into a single box on the right marked forgotten — no clock, no storage, no radio to report to — drawn with an empty crossed-out storage glyph in danger red. The door senses, decides, and acts, then throws it all away because there is nothing to record it to.](../../assets/blog/sureflap-microchip-cat-door-joules-first-iot-fig-3.svg)

None of that leaves the frame, because none of it is recorded, because there's nothing to record it *to*. And that's the line I want to sit with rather than gloss over. Every one of those would need the door to *remember* across reads and then *report* somewhere — a clock, some storage, a radio, something on the other end listening. The door has none of those, on purpose, because each one costs power it doesn't have and complexity it doesn't need to do its one job. It is a near-perfect example of a device that is "smart" in the narrow sense — embedded logic wrapping a sensor and an actuator — and not at all "connected." In 2015, for a cat door, that narrow kind of smart is the entire market.

## So is it IoT?

Back to the framing I started with. I wanted to file this as Joule's first IoT device, and I don't think I honestly can. There's a sensor (the RFID reader), there's logic (the allow-list check), there's an actuator (the latch) — the embedded-systems half of the story is all here. What's missing is the part the "internet" in "Internet of Things" is actually pointing at: the network, the other side, the data that outlives the moment. This door is an island. It senses, it decides, it acts, and it forgets, all within four C-cells and a plastic frame, and it never once needs to reach anything beyond itself.

![A side-by-side contrast of a local smart device and a connected IoT device. On the left, the SureFlap door: a closed loop of sense, decide, act, drawn inside a single boundary box labeled as the door frame, with the read-and-latch cycle running entirely inside it and an explicit note that nothing crosses the boundary — no network, no record kept. On the right, a connected device: the same sense-decide-act core but with an arrow leaving the device across a network boundary to a cloud and a phone app, where events are logged and history accumulates over time. The point of the contrast is that both share the embedded core; only the right-hand device adds the network, the other side, and the durable data, which is what the internet in Internet of Things actually refers to.](../../assets/blog/sureflap-local-vs-connected.svg)

Which makes it a clarifying object to own right at the start of the cat-IoT story. It shows you the floor: you can build something genuinely useful — identity-gated physical access, working reliably, rejecting intruders, on a year of battery — with *no network at all*. Everything a connected version would add sits on top of this floor, not under it. The read-and-latch loop is the same loop either way; "connected" would just mean a second device, somewhere, that gets to hear about the reads. SureFlap may well build that someday. The door I installed this weekend doesn't, and watching it work has made me a lot more precise about what I actually mean when I call a thing "smart."

## What I'd tell someone shopping for one

- **Buy it for the access control, not for data — there is no data.** It gates who comes through a door, reliably, and that's the whole job. If you want a record of your cat's comings and goings, this is not that device and doesn't pretend to be.
- **The short read range is the feature.** Don't read "a few centimeters" as a weakness. It's what makes the door respond to the cat using it rather than every animal nearby, and it falls straight out of how a passive chip works.
- **Get DualScan if there's any chance of a second, indoor-only cat.** The per-direction lock is local and can't be bolted on after the fact. It's a cheap insurance against a future you might have.
- **Plan for the battery failure before it happens.** Know which way your door fails when the cells sag, keep an eye on the low-battery LED, and don't let a solenoid that's run a year talk you into ignoring it.

## What's next

The cat side of the house now has exactly one device, and it's a door that forgets everything. The dog side is about to get more crowded — there's a second activity tracker shipping this summer that I want to put on Atom's collar next to his Whistle and run head-to-head, because two accelerometers on one dog is the only honest way I know to find out which one is telling the truth. That comparison is the next post. For now: hole cut, flap hung, Joule outside in the sun, and the gray tabby across the deck looking personally insulted.
