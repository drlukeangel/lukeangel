---
title: "Thirteen years on — the long-arc smart-home retrospective"
date: 2025-11-15T16:00:00-05:00
category: craft
tags:
  - smart-home
  - retrospective
  - reflection
  - long-arc
notebook: smart-home-iot-journey
notebookOrder: 55
excerpt: "Thirteen years since the first Hue bulb on the dining-room pendant. Two houses, ten major platform transitions, ~250 connected devices today."
pullquote: "The smart home I have now isn't a continuous evolution of the smart home I started with. It's three different architectures stacked on top of each other, with the seams visible if you look. That's fine. It's also instructive."
---

October 29, 2012 — picked up the Hue starter kit at the Apple Store. November 15, 2025 — writing this in front of 250+ connected devices across two SmartThings hubs, one HA installation, four Matter bridges, and uncounted ESPHome boards.

Thirteen years. Looking back.

## The eras, by architecture

**Era 1 (2012-2014) — Single-vendor walled gardens.**
Hue. Wemo. Lutron. SmartThings. Each had its own app, its own ecosystem, its own cloud. The unification problem was already obvious by 2013.

**Era 2 (2014-2017) — Hub-of-hubs.**
SmartThings as the integration layer. Multiple radios (Z-Wave, Zigbee), a Groovy SmartApps platform, cloud-mediated execution. Worked, sort of. Failed when the cloud was down.

**Era 3 (2017-2020) — Local-first migration.**
Home Assistant on a Pi. Z-Wave JS. Zigbee2MQTT. The realization that cloud-mediated automations were a category mistake.

**Era 4 (2020-2023) — Maturity + cameras + alarm panel.**
Frigate + Coral. PoE camera infrastructure. Proper alarm panel state machine. The smart home as an operations system, not a control surface.

**Era 5 (2023-now) — New house, multi-hub, Matter.**
Designed for connected-from-the-walls-up. Samsung Bespoke ecosystem. Matter bridges. SmartThings Edge drivers locally executing. The end-state of multi-ecosystem cooperation.

## The pattern across all five eras

**Local always wins long-term.** Every cloud-dependent platform I started with died (Wink) or pivoted to local (SmartThings). The platforms I kept (Hue, Lutron, HA) had local execution from day one.

**Mesh protocols outlive WiFi peripherals.** My early Hue bulbs from 2012 still work. The Wemo plugs from 2013 don't (Belkin sunset cloud features). Zigbee + Z-Wave devices age slower than WiFi devices because they don't depend on the cloud for control.

**The hub is the bottleneck.** Every era's limitations came from the hub: SmartThings v1 cloud-only, Hue bridge no third-party Zigbee, SmartThings v2 still cloud-mediated, Home Assistant constraint-bound to the Pi 4. The hub upgrades unblock everything else.

**Vendor lock-in is unstable.** Vendors come and go (Wemo's relevance, Wink's collapse, Insteon's bankruptcy). Open protocols (Zigbee, Z-Wave, MQTT, IP) outlive vendors. Anything I bought built on a vendor's proprietary cloud is now either dead or rescued by a third-party integration.

## What I'd do differently if I started over

If I were buying a smart-home stack from scratch today (2025):

**Architecture**:
1. **Home Assistant on dedicated hardware** (HA Yellow or beefier) as the orchestrator.
2. **Zigbee2MQTT + Sonoff ZBDongle-E** as the primary Zigbee coordinator.
3. **Z-Wave JS UI + Aeotec Z-Stick** as the primary Z-Wave coordinator.
4. **A Matter Border Router** (Apple TV 4K or an Aqara M2) for new Matter devices.
5. **Lutron Caseta** for in-wall switches everywhere.
6. **Reolink PoE cameras** + Frigate + Coral for video.
7. **iPhone / Android Companion App** for presence + push.

**What I'd buy first**:
1. The HA hardware.
2. Lutron Smart Bridge + a starter set of Caseta switches. Reliable, fast, works everywhere.
3. Aqara M2 hub + 5-10 Aqara door/window + motion sensors.
4. A couple of Hue bulbs in the most-used rooms.
5. Echo + Google Home for voice (or skip voice and go HA-voice + local Whisper).
6. *Then* expand based on automation needs, not toy interest.

**What I'd skip**:
- WiFi-only smart plugs and switches.
- The Wink-class vendors (their successors will fold).
- "AI-driven" appliance features that ship before the AI is good (Family Hub food recognition).
- Per-room ceiling speakers (use portable speakers + AirPlay).
- Most "first-generation" hardware (early adoption is expensive).

## What I'd warn the 2012 version of me about

- **The Hue bridge will get hacked in 2016.** Not a worm, exactly — research demonstrating remote firmware update vulnerabilities. Philips patched in time. Lesson: every networked device is a target eventually.
- **Wink will fold.** Don't buy into their ecosystem. (I didn't, mercifully.)
- **The Z-Wave OpenZWave library will be deprecated** in 2020. Migrate to Z-Wave JS. Don't fight it.
- **SmartThings will be acquired by Samsung. Samsung will neglect SmartThings for 5 years. Then they'll make it good again.** Patience required.
- **Matter will take 10 years longer than predicted.** It still hasn't replaced anything; it just bridges things.
- **You'll spend $30k+ on smart-home stuff over 13 years.** It's worth it. But know the budget.

## What 2025 me is wrong about

This is where 2030 me will laugh at 2025 me. Best guesses for what I'm missing:

- **AI-driven home automation** is going to actually work in the next 3-5 years. Voice assistants on-device with LLM-class understanding, context awareness, "the kids are sad — play soft music" emotional inference. I've been dismissive of voice; that's about to be wrong.
- **The security camera ecosystem will collapse into a few major players.** Frigate-class local detection will win, but only after the cloud-camera vendors get acquired or fold.
- **Energy-management automation** is the next era's killer app. Solar + battery + dynamic pricing + smart-appliance scheduling. I've been ignoring this; the math is going to tip.
- **The smart-lock category will get replaced by phone-as-key.** Yale + Schlage + the rest will get disrupted by Apple Wallet keys + UWB-based proximity.

## What stays the same across eras

- **The dining room pendant.** The first Hue bulb is still in that pendant. Different bulb (replaced once), same pendant, same automation.
- **The "sunset porch light" automation.** Built October 2012 as a Python cron. Migrated to IFTTT, then SmartThings, then HA. The behavior hasn't changed: porch light on at sunset, off at sunrise. The implementation has migrated platforms five times.
- **The lessons.** Local > cloud. Mesh > WiFi. Open protocols > vendor lock-in. Hub is the bottleneck. Vendor cloud is rented infrastructure.

## What I'm watching for the next decade

- **Voice assistants with on-device LLMs** (already starting in 2025).
- **Matter cameras + Matter security platforms** (probably 2026-2027).
- **Robot integration with household physical context** (Roombas that know what room you're in).
- **Solar + battery + grid + EV** as a single managed system.
- **Generative interface customization** — the Lovelace dashboard of 2030 builds itself based on usage patterns.

## Closing

The smart home is the longest-running personal-engineering project I've had. Thirteen years. Two houses. ~250 devices. ~50 blog posts.

It's also genuinely useful. The kids don't know any other kind of house — they expect lights to come on automatically, expect to ask "is the front door locked" and get an answer, expect the kitchen to display recipes. That's normal for them.

The arc has been: from "controllable thing" → "automatable system" → "household choreography." The third one is the destination. The first two were the path.

Onto the fourteenth year.
