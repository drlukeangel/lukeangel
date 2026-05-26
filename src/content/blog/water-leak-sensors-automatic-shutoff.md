---
title: "Water leak sensors + automatic shutoff"
date: 2018-08-12T11:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - zwave
  - water-leak
  - automation
notebook: smart-home-iot-journey
notebookOrder: 24
excerpt: "Five Z-Wave water leak sensors plus a motorized actuator that clamps over the main shutoff. The first smart-home automation where the insurance math, not the convenience, justifies the spend."
pullquote: "Every other piece of smart-home gear is a quality-of-life argument. Leak detection plus main-valve shutoff is an insurance argument — and that makes it the one piece I'd hand a non-enthusiast first."
cover: "../../assets/blog/water-leak-sensors-automatic-shutoff-cover.svg"
coverAlt: "A house water main with a motorized actuator clamped over the existing quarter-turn ball valve, fed by leak sensors on the floor near a water heater, washer, and sinks; a wet sensor triggers the actuator to rotate the valve closed."
---

Five water leak sensors. One motorized actuator clamped over the main shutoff valve. A screwdriver, no plumber. The house can now shut its own water off when something leaks — and shut it off fast enough to matter.

## The hardware

**Leak sensors (5×):**
- **Aeotec Water Sensor 6** — Z-Wave Plus, CR123A battery (claimed ~2-year life on default settings), four sensing points, detects as little as half a millimetre of water and reports within a couple of seconds. It also has a built-in 60 dB siren, which matters more than I expected — see below.
- ~$35 each. $175 total.

**Main-water shutoff:**
- **Dome Home Automation Water Main Shut-Off (DMWV1)** — Z-Wave Plus. This is the part that surprised me. It's not a valve you plumb in; it's a *motorized actuator* that clamps over your existing quarter-turn ball valve and physically turns it. Works on any standard ball valve up to 1½", mounts with two pipe clamps and a screwdriver, no cutting, no soldering, no draining the system.
- $100.

**Install:**
- Forty-five minutes with a screwdriver and a level. The actuator straddles the existing valve's lever; you set the open and closed end-stops once during pairing and it remembers them.
- $0 — no plumber. That clamp-on design is the whole reason this project went from "schedule a plumber" to "do it Saturday morning."

**Total: ~$275.** Worth keeping that number in mind against what a single water-damage claim runs.

## Sensor placement

Where I put them and why:

1. **Basement floor near the water heater.** The water heater is the most-likely-to-fail item in the house. Tanks corrode through. Pinhole leaks turn into flooded basements overnight.
2. **Laundry room behind the washer.** Hoses degrade. The braided stainless ones I have are rated for 5 years; I've had them for 7. (Replacing them is on the list.)
3. **Under the dishwasher.** Dishwashers leak around the inlet valve solenoid. Sensor sits right under the door area.
4. **Under the master bath vanity.** P-trap, supply lines, shutoff valves — three failure points within 18 inches of each other.
5. **Under the half-bath vanity downstairs.** Same.

That covers ~90% of the residential water-leak failure modes. Anything happening in a wall (slab leak, freeze-burst inside framing) is invisible to floor-mounted sensors — that's why the main-valve shutoff is critical: it stops a wall-leak the floor sensors never saw, because closing the main cuts pressure to *everything*.

![A house cutaway showing the five leak-sensor positions — basement floor by the water heater, behind the washer, under the dishwasher, and under each bathroom vanity — all reporting to the hub, with the main inlet carrying the motorized actuator clamped over the existing shutoff valve.](../../assets/blog/water-leak-sensor-placement.svg)

One thing I underrated: the Aeotec's onboard 60 dB siren. The valve closing is silent, and a push notification is easy to miss in another room. The local siren is what actually gets someone's feet moving toward the basement. I leave it enabled on every sensor.

## The automation

```yaml
- alias: "Water leak detected — shut off main"
  description: "Any sensor reports water → close main valve + notify"
  trigger:
    - platform: state
      entity_id:
        - binary_sensor.water_leak_basement
        - binary_sensor.water_leak_laundry
        - binary_sensor.water_leak_dishwasher
        - binary_sensor.water_leak_master_bath
        - binary_sensor.water_leak_half_bath
      to: "on"
  action:
    - service: switch.turn_off
      data:
        entity_id: switch.main_water_valve  # the Dome actuator, "off" = valve closed
    - service: notify.ios_luke_iphone
      data:
        title: "🚰 LEAK + MAIN VALVE CLOSED"
        message: >
          {{ trigger.to_state.attributes.friendly_name }} at
          {{ now().strftime('%H:%M') }}. Main water shut.
        data:
          push:
            sound: "default"
            badge: 1
          category: "leak"
    - service: notify.ios_wife_iphone
      data:
        title: "🚰 LEAK + MAIN VALVE CLOSED"
        message: >
          {{ trigger.to_state.attributes.friendly_name }}. Main water shut.
    - service: light.turn_on
      data:
        entity_id: group.all_indoor_lights
        rgb_color: [255, 0, 0]   # all lights red
        brightness: 255
    - service: persistent_notification.create
      data:
        title: "💧 Leak event"
        message: >
          Sensor: {{ trigger.to_state.attributes.friendly_name }}.
          Time: {{ now() }}.
          Action taken: main water shut off; lights red.
```

End-to-end latency from sensor wet to valve fully closed: about 10 seconds. The sensor reports within a couple of seconds, the automation fires instantly, and then the slow part is mechanical — the Dome actuator drives the ball-valve lever through its 90° arc in roughly eight seconds. That's the trade for a clamp-on actuator versus a plumbed-in motorized valve: it's torquing a stiff manual lever, not spinning a purpose-built motor, so it's deliberate rather than fast. Ten seconds is still orders of magnitude faster than "nobody's home for the weekend."

## The "we just turned the dishwasher on" false-positive problem

The dishwasher inlet, when running, sometimes drips a few drops onto the sensor. Initial deployment fired the leak automation twice in the first week — both times during normal dishwasher runs.

Fix: the dishwasher sensor reports only after **the same sensor reports wet for 30 continuous seconds**. Brief moisture (a drop or two) doesn't trigger; a continuous flow does. YAML:

```yaml
- alias: "Water leak — debounced"
  trigger:
    - platform: state
      entity_id: binary_sensor.water_leak_dishwasher
      to: "on"
      for: "00:00:30"
  # ... rest of action ...
```

The 30-second debounce is unique to the dishwasher sensor; the other four trigger immediately because their false-positive risk is much lower. A basement floor next to the water heater either is wet or isn't.

![The leak-response sequence: a wet sensor fires the automation, the dishwasher sensor passing through a thirty-second debounce while the others trigger at once; the automation then drives the main valve closed, sounds the sensor siren, sends a push to both phones, and turns the indoor lights red.](../../assets/blog/water-leak-response-sequence.svg)

## What about the "valve closed when I want water" problem?

The main valve closed automation runs even if I'm home. Which means: someone is washing dishes, the dishwasher leaks, valve shuts, *all water in the house stops*.

The recovery flow:
1. Push notification arrives on both phones.
2. Tap "investigate" link — opens HA dashboard showing the sensor that triggered.
3. Manually inspect the leak. Fix or contain.
4. From the HA dashboard, tap "Open main valve."
5. Actuator drives the lever back open (about eight seconds), water flows again.

This is exactly the friction I want. The default is "shut things down and ask questions later"; the recovery is one tap from a phone. The Insurance Information Institute puts the average non-weather water claim around $11,000 — I'll happily walk to the basement to re-open a valve to never file one of those.

The whole design comes down to which failure you'd rather have, and the two are not symmetric: a false shutoff costs you a one-tap re-open, while a missed leak costs a five-figure claim. When the downside of one branch is a minor annoyance and the downside of the other is the basement, you bias hard toward shutting off.

![A fail-safe trade-off comparison: a false alarm leads to a brief no-water annoyance recovered with one tap, while a missed leak leads to a five-figure water-damage claim — the lopsided cost is why the automation defaults to closing the valve and asking questions later.](../../assets/blog/water-leak-failsafe-tradeoff.svg)

## What's next

- **The other major leak risk: refrigerator water line.** Ice maker + filtered water dispenser. Adding a sensor behind the fridge this weekend.
- **The hot water heater itself.** I have a sensor *next to* it; I don't yet have an "interior temperature" sensor that would catch a burst pipe inside the heater jacket. Putting that on the list.
- **A drain backup sensor.** I have a sump pump in the basement; if the sump backs up because the float switch dies, I'd like to know. A sensor in the sump pit would catch the rising water before it reaches the floor.
- **Eventually: a flow meter on the main inlet.** Detecting "any flow lasting more than 2 hours" would catch slow leaks the threshold-sensors miss. The Flo by Moen device does this. Pricey ($300) but interesting.

## What this changes about the smart-home math

Water-leak shutoff is the first piece of smart-home automation where the *insurance value* clearly exceeds the cost. Every other piece (security, convenience, scenes) is a quality-of-life argument. This one is an insurance argument.

If I had to recommend one piece of smart-home automation to a non-enthusiast, this is now it. Not the bulbs. Not the voice assistant. The leak detection + main valve shutoff.
