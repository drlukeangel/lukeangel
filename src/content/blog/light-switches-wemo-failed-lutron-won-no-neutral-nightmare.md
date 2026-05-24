---
title: "Light switches — Wemo failed, Lutron won, no-neutral pain"
date: 2014-03-18T19:00:00-04:00
category: tools
tags:
  - smart-home
  - lighting
  - switches
  - lutron
  - wemo
  - protocols
notebook: smart-home-iot-journey
notebookOrder: 8
excerpt: "Smart bulbs are useless when the switch is off. Three vendors tried; the no-neutral wiring of my old house ruled out two. Lutron Caseta won — notes from a frustrated homeowner."
pullquote: "An old house with no neutral wire in the switch box rules out 80% of smart switches on the market. The remaining 20% earn their premium."
cover: "../../assets/blog/light-switches-wemo-failed-lutron-won-no-neutral-nightmare-cover.png"
coverAlt: "Light switches — Wemo failed, Lutron won, no-neutral pain"
---

Eighteen months of controlling Hue bulbs from an app and from voice (more on Echo later this year). The pain point is now obvious: anyone who flips the physical wall switch off renders all the smart-bulb features useless. The bulb is unpowered. The app can't dim it. Schedules don't fire. Voice control can't reach it.

The wall switch has to be smart too. Tonight I'm writing this from a chair after fighting with my third light-switch vendor in a month. Notes from the fight.

## Attempt 1: Wemo light switch (Belkin) — failed

I bought a Belkin Wemo light switch first. I already had two Wemo plugs working. Same vendor, same app, same WiFi-only architecture. Should be easy.

It wasn't.

- **Installation requires a neutral wire in the switch box.** My 1948-built house has hot + load wires in switch boxes but no neutral. The Wemo switch *physically* won't connect — there's nowhere to bond the white wire.
- **Even in switch boxes where I have neutral** (one in the kitchen, one in the new addition), the Wemo switch was unreliable. It dropped off WiFi about once a week and required a hardware reset (hold the button for 10 s, re-pair via temporary `WemoNet` SSID). Belkin's WiFi stack on the switch was worse than on their plug.
- **Onboarding required pairing in a temporary `WemoNet.<switchname>` SSID** — phone joins switch's local WiFi to configure, then switch joins your home WiFi. This worked maybe one time in three.

After three returns, gave up on Wemo for switches.

## Why my house doesn't have neutral wires (a tangent)

Pre-1970s US residential wiring practice often used a **switch loop** for single-pole switches: the hot wire runs from the panel to the light fixture; from the fixture, a 2-wire cable (typically black + white) runs down to the switch box; the white wire is reassigned as a switched-hot return path. There's no neutral in the switch box because the circuit doesn't need one — the load (the light) is in the ceiling, the switch is just an interrupter.

When the National Electrical Code 2011 cycle added requirement 404.2(C) — neutral wires required in switch boxes for new construction and major remodels — it was specifically because the smart-switch industry needed it. Old houses are grandfathered. My old house is the problem.

What you can do about it:

1. **Re-wire the switch loop with a 3-wire cable** (black + red + white + ground). Pull a new neutral down to the box. Requires opening walls. Expensive.
2. **Install a smart relay at the fixture** (Lutron, Aqara, Shelly). The smart device goes in the ceiling box where there's neutral; the wall switch becomes a momentary trigger. Works, but the relay is hidden and harder to service.
3. **Use a no-neutral-design smart switch.** Few vendors offer these. Lutron Caseta is the gold standard.

## Attempt 2: GE Z-Wave switch — partial fail

I tried a GE Z-Wave switch next (model 12722, common at the time, Z-Wave Plus 500-series chip). Z-Wave is more reliable than WiFi for low-bandwidth control: 908 MHz US band, mesh topology, low congestion. Wired into my SmartThings hub (Z-Wave radio onboard).

Worked — where I had neutral.

- **Still requires neutral.** Same physical wiring problem. Two boxes in the house qualify; the other 14 don't.
- **No native dimmer in the 12722 model** I bought (separate dimmer 12724 module needed). Two SKUs per location.
- **Response time**: Z-Wave command from app → hub → switch took 1-3 seconds. Acceptable for "turn off porch light at sunset"; annoying for "flip the wall switch."

## Attempt 3: Lutron Caseta — won

Lutron Caseta uses Lutron's proprietary ClearConnect Type A protocol, 434 MHz in the US (sub-GHz, different band than everything else in the house). Different architecture from anything else I've installed:

**The Smart Bridge is the brain.**

Lutron's Smart Bridge (model L-BDG2-WH) connects to Ethernet, speaks ClearConnect to switches over RF. No WiFi on the switches themselves — they're RF-only. Range: ~30 m from bridge; mesh-extensible via Pico remotes acting as repeaters.

**The protocol — ClearConnect Type A:**

- 434.5 MHz band (US). Different from 2.4 GHz (WiFi, Zigbee, BLE) and 908 MHz (Z-Wave). Effectively zero congestion in residential environments.
- Frequency-hopping spread spectrum (FHSS), hops across 32 channels in the 433-435 MHz band.
- AES-128 encryption between bridge and devices, paired at commissioning time.
- Mesh — every Caseta switch and Pico remote is a router, extending range as you add more devices.
- Bridge-to-cloud (for Alexa, future SmartThings integration) over the home WiFi/Ethernet; switches don't touch the home network at all.

**The killer feature: no-neutral design.**

Caseta switches don't need a neutral wire. They run on what Lutron calls "no-neutral dimming" — the switch leaks a small amount of current (~5-10 mA) through the load to power its own electronics.

This works because:

- **LED bulbs (which I'm running, Hue and standalone) tolerate the trickle current.** Most incandescents would have, too.
- **The switch's electronics are deliberately low-power**: a small ARM Cortex-M0 + the 434 MHz radio module pulling sub-100 µA average.

The catch: it won't work with **all** LED bulbs. Some LED bulbs flicker because their internal driver circuits can't filter the trickle current cleanly. Lutron publishes a [bulb compatibility list](https://www.lutron.com/) — I had to swap a few cheap LEDs to Lutron-tested models. Hue bulbs play nice with Caseta switches; the cheap Cree bulbs in my office did not.

**Latency is solved.**

ClearConnect Type A is a pure RF protocol — no IP stack on the switch, no cloud round-trip. Wall switch responds in `< 200 ms`. Feels like a regular switch.

**The Pico remote.**

Lutron's Pico (model PJ2-2B-GWH-L01) is a battery-powered button that pairs with the switches. Battery: CR2032, claimed 10 years (the duty cycle is so low — buttons are pressed maybe 10×/day — that this is plausible).

I can put a Pico on any wall or in any drawer. Pico mounted next to the bed for bedside light. Pico on the couch arm. Pico in the kitchen for fan controls. Caseta thinks of it as a virtual second switch.

The Pico is what made me realize Lutron actually understood lighting UX in a way the WiFi vendors did not.

## Cost comparison

| Component | Cost |
|---|---|
| Lutron Smart Bridge (L-BDG2-WH) | $79 |
| Caseta in-wall dimmer (PD-6WCL-WH) | $59 |
| Pico remote (PJ2-2B-GWH-L01) | $15 |
| Plug-in lamp dimmer (PD-3PCL-WH) | $50 |

Wemo or GE Z-Wave switch: $40-45. Lutron Caseta: $59. The premium is ~$15 per switch.

It's worth it for two reasons:

1. **No neutral required.** Works in any switch box. The competition simply can't physically install in 60-70% of older US homes.
2. **Reliability.** Caseta switches don't drop off WiFi (they don't use WiFi). ClearConnect Type A has been shipping since 2010 — mature.

## Integration with the rest of the house

The Smart Bridge has a **limited local API** — Telnet on port 23, undocumented officially but reverse-engineered by the homebrew community already. The exposed commands cover the basics:

```
#OUTPUT,2,1,75   # Set output 2 to 75% brightness
?OUTPUT,2,1      # Query state of output 2
~OUTPUT,2,1,75   # Response: output 2 is at 75%
```

That's what I'm scripting against from my home server. Hoping Lutron eventually publishes a real JSON API; for now Telnet works.

## What's next

Six months in with three vendors. None of them talk to each other except via IFTTT (slow) or my home-server scripts (brittle). The unification attempt is about to happen — Samsung just closed the SmartThings acquisition. Hub coming in August.
