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
featured: false
draft: true
---

The [Wio Tracker L1 two-pack](/blog/pet-tracker-build-3-the-gear-and-the-plan/) landed, which means I could post a screenshot of Quark as a dot on a map and call the proof-of-concept a success. That would be a lie of omission. A dot moving proves the radio turns on. It doesn't tell me whether this architecture survives *my* neighborhood, *my* trails, and a battery I don't want to charge every other day.

So before I spend another dollar on the custom RAK collar, the PoC has to earn it — against a scorecard with numbers I set *before* I started, so I can't move the goalposts when I get excited.

## The setup

Two nodes: one rides Quark (call it the collar), one stays with me (the handheld), phone paired over Bluetooth with the Meshtastic map open. That's the whole architecture in miniature — collar beacons its position over LoRa, handheld receives it, phone draws the map.

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

Multi-hop mesh — the crowdsourced-recovery magic — I can't test yet; that needs a third node. It waits.

Next post is this same scorecard with the cells filled in, and an honest verdict. If the numbers say stop, I'll say stop — that's the difference between a build log and a highlight reel.
