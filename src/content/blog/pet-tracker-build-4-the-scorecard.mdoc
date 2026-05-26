---
title: "A Scorecard, Not a Vibe: How I'll Decide Whether to Build the Collar"
date: 2026-05-26T09:00:00-04:00
category: projects
tags:
  - iot
  - pets
  - hardware
  - lora
  - meshtastic
  - build-in-public
  - testing
notebook: iot-pet-health-tracker-build
notebookOrder: 4
excerpt: "The proof-of-concept hardware is here, so the temptation is to post a screenshot of a dot moving and call it a win. Instead, here's the scorecard — range, fix time, battery, presence reliability — with pass/fail targets, so the decision to build the custom collar gets made on numbers, not adrenaline."
pullquote: "A dot moving on a map isn't proof. A dot that moves reliably at 300 meters, for a week on a charge, is."
cover: "../../assets/blog/pet-tracker-build-4-the-scorecard-cover.svg"
coverAlt: "A decision scorecard on a clipboard: five weighted criterion rows, four passing with green checks and one failing with a red X, feeding a fork that splits into an open gate (go, build the collar) and a closed gate (hold, reconsider)."
featured: false
draft: true
---

The [Wio Tracker L1 two-pack](/blog/pet-tracker-build-3-the-gear-and-the-plan/) landed, which means I could post a screenshot of Quark as a dot on a map and call the proof-of-concept a success. That would be a lie of omission. A dot moving proves the radio turns on. It doesn't tell me whether this architecture survives *my* neighborhood, *my* trails, and a battery I don't want to charge every other day.

So before I spend another dollar on the custom RAK collar, the PoC has to earn it — against a scorecard with numbers I set *before* I started, so I can't move the goalposts when I get excited.

## What landed

It doesn't show up as a finished gadget. Each unit is a flat-pack: a board, a 3D-printed enclosure in two halves, a 3000 mAh lithium pouch, a GPS patch antenna on a u.FL lead, a stubby LoRa whip, and a baggie of screws. No soldering and no firmware — but some assembly, which is honest about what this stage actually is.

![Wio Tracker L1 unboxed on a work mat: a 3.7-volt 3000 mAh lithium pouch cell, the Wio-SX1262 board with a stubby LoRa antenna and a GPS patch antenna on a u.FL lead, a 3D-printed handheld enclosure, and a bag of assembly screws.](../../assets/blog/pet-tracker-iot-poc-whats-in-the-box.jpg)

Wired up before I closed the case, it's exactly the bill of materials from [last post](/blog/pet-tracker-build-3-the-gear-and-the-plan/): the nRF52840 and the Wio-SX1262 LoRa radio on one board, the L76K GPS antenna on its pigtail, the LoRa antenna on an SMA bulkhead, the battery on a JST plug.

![The Wio Tracker L1 wired up before closing the case: the nRF52840 plus Wio-SX1262 board with the L76K GPS patch antenna on a u.FL pigtail, an SMA LoRa antenna connector, and the 3000 mAh battery on a JST lead, resting in one half of the printed enclosure.](../../assets/blog/pet-tracker-iot-poc-wired.jpg)

Put a ruler against the enclosure and the verdict writes itself: about 10 cm tall. That's a fine handheld — clip it to a belt, drop it in a truck cradle — and obviously not something a cat wears. Which is the split this whole series keeps circling back to: **the base station you can buy off the shelf; the collar you still have to build small.** This unit is the base. The collar is the custom job behind it.

![The Wio Tracker L1 enclosure against a centimeter ruler — roughly 10 cm tall, clearly handheld-sized rather than collar-sized.](../../assets/blog/pet-tracker-iot-poc-demensions.jpg)

![The other half of the enclosure with a ruler for scale, about 6 cm across — a reminder that this unit is the handheld base station, not the wearable collar.](../../assets/blog/pet-tracker-iot-poc-demensions-2.jpg)

## The setup

Two nodes: one rides Quark (call it the collar), one stays with me (the handheld), phone paired over Bluetooth with the Meshtastic map open. That's the whole architecture in miniature — collar beacons its position over LoRa, handheld receives it, phone draws the map.

![Two-node proof-of-concept setup: a collar node riding Quark beacons its GPS position over LoRa to a handheld node that stays with me; the handheld is paired to a phone over BLE, and the phone draws the position on a Meshtastic map.](../../assets/blog/pet-tracker-build-4-poc-setup.svg)

## Getting it on the air — and what bit me

Two units, a foot apart, both powered on, both completely deaf to each other. Meshtastic ships with the **LoRa region unset**, and an unset radio won't transmit — legally it can't, because it doesn't yet know which band and duty cycle it's allowed to use. Set **Region = US** on each and they found each other instantly. First lesson, and a good one for any radio project: *"powered on" is not "transmitting."*

Then the collar looked dead anyway. It was in the node list, but its "last heard" read **thirty minutes** — no fresh beacons. Two defaults conspire there: the position broadcast interval ships at roughly **15 minutes**, and **smart positioning** only beacons when the node has *moved* far enough. A collar sitting still on a bench is, by design, silent — wonderful for battery life, useless for a range walk, where I need a steady heartbeat to catch the exact second the link drops. So I forced it: **fixed 1-minute interval, smart positioning off.** Now it chirps every 60 seconds whether it's moved or not.

I rehearsed the signal before trusting it. Powered the collar off — "last heard" climbed and stuck: one minute, two, four. Powered it back on — it snapped to "now" within ten seconds. That climb-and-stick versus snap-back is the whole language of the range test: heartbeat alive, or heartbeat gone stale.

## The surprise: my block was already a mesh

Here's the part I didn't see coming. The first time the app finished scanning, my node list had **41 nodes** in it. I'd added two. The other **39 were my neighbors.**

Meshtastic's default channel is a public commons — every node within radio earshot shows up. Thirty-nine of them around my block, most reachable only over **two hops**, which means my little handheld's signal was *already* being relayed across the neighborhood by strangers' nodes I'll never meet.

That cuts two ways. First, it's a problem for an honest range test: if a neighbor's node rebroadcasts my collar's beacon, my handheld keeps "hearing" the collar long after the *direct* link is dead — and I'd be measuring the neighborhood's mesh instead of my own radio. The fix was to move my two nodes off the public commons onto their own named channel. Because Meshtastic derives the radio's frequency slot from a hash of the channel name, renaming it also lifts the pair onto their own frequency, clear of the public traffic — then I switched the node view to a **direct-only (zero-hop) filter**, so the only thing I count is what my handheld hears firsthand.

But step back from the annoyance and that accidental discovery *is the moat I sketched in the [PRD](/blog/pet-tracker-build-2-the-prd-and-the-rubric/).* The reason a crowd-sourced tracker beats a pure-cellular one is the network effect: every unit sold becomes a relay that improves recovery for everyone — the same model behind Apple's Find My and Amazon Sidewalk. I'd assumed I'd have to bootstrap that network from zero, one sale at a time. Instead, **39 nodes of it already exist within a few hundred meters of my front door, before I've shipped a thing.** The mesh isn't a someday feature on a roadmap. On my street, it's already on the air.

## The scorecard

**1. LoRa range — the make-or-break.** If this fails, nothing else matters.

| Setting | Target |
| --- | --- |
| Open line-of-sight | ≥ 1.0 km |
| Suburban / through houses | ≥ 300 m |
| Dense foliage / trail | ≥ 150 m |

**2. GPS.**

| Test | Target |
| --- | --- |
| Time-to-first-fix (cold) | ≤ 60 s |
| Time-to-first-fix (warm) | ≤ 15 s |
| Position accuracy vs phone | ≤ 10 m |

**3. Battery — the second make-or-break.** The whole pitch is "you don't charge it constantly."

| Test | Target |
| --- | --- |
| Active beaconing → projected runtime | ≥ 3 days |
| Idle / presence mode → projected runtime | ≥ 2 weeks |

**4. Presence + link.**

| Test | Target |
| --- | --- |
| Home ↔ away detection (10 transitions) | ≥ 9/10 correct |
| BLE reconnect after walking out of range | ≤ 30 s, no manual fix |

**5. The real test — Quark.** Fit in a collar pouch, watch him cross the yard in real time, and an "escape" sim: someone walks him down the block while I re-acquire him on foot with the handheld's proximity readout.

## The decision gate

This is the part that keeps it honest:

- **Build the custom collar** if all three range targets hold for how I'd actually use it, GPS passes, and projected active battery clears three days.
- **Reconsider** if range falls short in the neighborhood — that points to a better antenna, or leaning cellular-first. If battery fails, power tuning becomes priority one *before* any collar work.

![The decision gate as a scorecard: four criteria with pass targets — LoRa range and battery runtime are hard stops, GPS fix and presence/BLE link are required — all feeding a single AND gate. If every criterion holds for real-world use, the gate opens to build the collar; if range or battery falls short, it routes to reconsider: a better antenna, going cellular-first, or power tuning before any collar work.](../../assets/blog/pet-tracker-build-4-decision-gate.svg)

Multi-hop mesh — the crowdsourced-recovery magic — I can't test yet; that needs a third node. It waits.

Next post is this same scorecard with the cells filled in, and an honest verdict. If the numbers say stop, I'll say stop — that's the difference between a build log and a highlight reel.
