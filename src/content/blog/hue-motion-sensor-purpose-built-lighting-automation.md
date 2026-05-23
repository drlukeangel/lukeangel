---
title: "Hue Motion sensor — Hue's first native automation device"
date: 2016-08-30T20:00:00-04:00
category: tools
tags:
  - smart-home
  - hue
  - zigbee
  - motion-sensor
  - lighting
notebook: smart-home-iot-journey
notebookOrder: 17
excerpt: "Philips finally shipped the Hue Motion sensor. Battery-powered, Zigbee Light Link, joins the Hue bridge natively. First hardware that lets us automate without rules."
pullquote: "A motion sensor that's actually paired to its bulb ecosystem reacts in under 200 ms. Cross-ecosystem (SmartThings → Hue cloud → bulb) is 2-3 seconds. The difference is between 'magic' and 'frustrating'."
---

Hue Motion sensor finally shipped this month after nine months of rumors. Battery-powered (2× AAA, claimed 2-year life), Zigbee Light Link, pairs with the Hue v2 bridge directly. $40.

Two installed already — hallway and basement stairs. Notes.

## What it is

- 60° wide x 90° tall PIR field of view.
- Effective range ~5 m.
- Integrated **lux sensor** (illuminance, 0.1 lx resolution).
- Integrated temperature sensor (±1 °C, not great).
- Sleep modes: motion-detected events are immediate; periodic state updates every 5 minutes (battery-conserving).
- Pairs by Touchlink — bring it near the bridge, press the bridge button, done. 30 seconds.

## Why a native Hue motion sensor is a different thing

I've had motion sensors for two years — the SmartThings starter kit motion, the Aeotec Multisensors with PIR. They all *work*. But they go through this chain:

```
Motion detected (PIR fires)
  → Zigbee/Z-Wave message to SmartThings hub (~200 ms)
  → SmartThings cloud (~1-2 s for non-whitelisted SmartApp)
  → SmartApp evaluates
  → Cloud back to SmartThings hub
  → Hub → Hue cloud (Hue is a cloud integration on SmartThings)
  → Hue cloud → Hue bridge
  → Hue bridge → Zigbee command to bulbs
```

End-to-end: 2-4 seconds. When you walk into a dark room, two seconds is long enough that you reach for the wall switch out of habit.

The Hue Motion sensor lives **on the same Zigbee mesh as the bulbs**, paired to the same bridge:

```
Motion detected (PIR fires)
  → Zigbee message to Hue bridge (~50 ms)
  → Bridge rule evaluates (local)
  → Bridge → Zigbee command to bulbs
```

End-to-end: **under 200 ms**. Light is on before your foot touches the second tile. That's the difference between "magic" and "frustrating."

## The Hue bridge's rules engine

The Hue bridge has had a Rules + Schedules + Sensors API for about a year, but no one outside of Philips's app could really use it because the motion sensor didn't exist. Now there's hardware that produces sensor data, and the rules engine can actually drive automations.

Rule structure (simplified):

```json
{
  "name": "Hallway motion on after dark",
  "conditions": [
    {"address": "/sensors/2/state/presence", "operator": "eq", "value": "true"},
    {"address": "/sensors/3/state/dark",     "operator": "eq", "value": "true"}
  ],
  "actions": [{
    "address": "/groups/4/action",
    "method": "PUT",
    "body": {"on": true, "bri": 100, "transitiontime": 4}
  }]
}
```

Sensors 2 and 3 are the same physical device — sensor 2 is the motion endpoint, sensor 3 is the daylight (lux) endpoint. The bridge models them as separate logical sensors on a shared physical chassis.

The **dark** boolean on the daylight sensor is computed from the lux reading against a configurable threshold. So "trigger only when actually dark" doesn't need an external sunset/sunrise calculation — the sensor knows.

I set up:

- Hallway: motion + dark → 30% warm white for 90 seconds, then back to off.
- Basement stairs: motion → 80% cool white immediately, off after 3 minutes of no motion.

Both work flawlessly. The latency is genuinely sub-200 ms.

## What it doesn't do

- **No vibration / accelerometer.** The Aeotec Multisensor's tamper detection has spoiled me; this one is just PIR.
- **No humidity.** Bathroom fan automation stays on Aeotec.
- **Not visible to SmartThings.** The Hue Motion is paired with the *Hue bridge*, not the SmartThings hub. It does not show up in SmartThings as a motion sensor. To use it for non-Hue automations (e.g., "motion → SmartThings security event"), I'd need a custom Hue integration that exposes the sensor state to SmartThings. Possible (the Hue bridge has the sensor API exposed), but I haven't done it yet.

That last one is the architecture problem. I now have *two* PIR sensors in the hallway:
- The Hue Motion (paired to Hue bridge, controls lights instantly).
- An Aeotec Multisensor (paired to SmartThings hub, feeds the security SmartApp).

Both work. Both report independently. Neither knows about the other. That's the multi-hub world.

## Battery + range observations

Two months in:
- Battery: still at 100% reported. The bridge has been polling each sensor's battery characteristic; no measurable drain yet. We'll see by next summer.
- Range: hallway sensor (closest to bridge) is 6 m line-of-sight. Basement stairs sensor is 12 m through one floor — works but the Zigbee mesh routes through a Hue bulb halfway. If I had no intermediate bulb, that signal would not make it.

The mesh routing on the Hue bridge is actually *good* — it picks the best route automatically, and I can see in the bridge's logs which intermediate bulb is being used.

## What I want next

- **A way to expose Hue sensor state to SmartThings.** Either Hue publishes a richer cloud integration with sensor data, or I write a custom polling SmartApp. The polling option is ugly (polls every few seconds, latency in the security path).
- **A second Hue Motion for the bathroom.** Replace one of the Aeotec PIRs for the lighting-only case, since latency matters there too.
- **The Hue dimmer remote** as the wall-mounted control. Already on the bridge, integrates with motion sensors, gives a Pico-equivalent wireless control without Lutron.

Hue's becoming a more complete platform. Slower than I'd like but real.
