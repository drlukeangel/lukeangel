---
title: "Water leak sensors + automatic shutoff — $800 insurance"
date: 2018-08-12T11:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - zwave
  - water-leak
  - automation
series: smart-home-iot-journey
seriesOrder: 25
excerpt: "Five Z-Wave water leak sensors (basement, laundry, dishwasher, under both bathroom sinks) plus a Z-Wave motorized ball valve on the main."
pullquote: "Insurance averages a flooded-basement claim at $11,000. The Z-Wave ball valve + sensors cost $800 installed. It pays for itself the first time it works — and even if it never works, it's still cheaper than the deductible."
cover: "../../assets/blog/water-leak-sensors-automatic-shutoff-cover.png"
coverAlt: "Water leak sensors + automatic shutoff — $800 insurance"
---

Five water leak sensors. One Z-Wave motorized ball valve on the main water inlet. Five hours of plumber time. The house can now shut its own water off when something leaks.

## The hardware

**Leak sensors (5×):**
- **Aeotec Water Sensor 6** — Z-Wave Plus, CR123A battery (~5-year life), reports water-detected within 2 seconds.
- $35 each. $175 total.

**Main-water shutoff valve:**
- **Z-Wave Plus Motorized Ball Valve** by Zooz (ZAC36). Brass body, 3/4" NPT, replaces the existing manual ball valve on the inlet.
- $185.

**Plumber:**
- Cut the existing copper inlet, install the new motorized valve, re-solder, pressure test.
- 5 hours @ $80/hr = $400.

**Total**: $760. Less than one flood-damage insurance claim deductible.

## Sensor placement

Where I put them and why:

1. **Basement floor near the water heater.** The water heater is the most-likely-to-fail item in the house. Tanks corrode through. Pinhole leaks turn into flooded basements overnight.
2. **Laundry room behind the washer.** Hoses degrade. The braided stainless ones I have are rated for 5 years; I've had them for 7. (Replacing them is on the list.)
3. **Under the dishwasher.** Dishwashers leak around the inlet valve solenoid. Sensor sits right under the door area.
4. **Under the master bath vanity.** P-trap, supply lines, shutoff valves — three failure points within 18 inches of each other.
5. **Under the half-bath vanity downstairs.** Same.

That covers ~90% of the residential water-leak failure modes. Anything happening in a wall (slab leak, freeze-burst inside framing) is invisible to floor-mounted sensors — that's why the main valve shutoff is critical: it stops a wall-leak too.

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
        entity_id: switch.main_water_valve  # the Z-Wave ball valve, "off" = closed
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🚰 LEAK + MAIN VALVE CLOSED"
        message: >
          {{ trigger.to_state.attributes.friendly_name }} at
          {{ now().strftime('%H:%M') }}. Main water shut.
        data:
          push:
            sound: "default"
            badge: 1
          priority: high
    - service: notify.mobile_app_wife_iphone
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

End-to-end latency from sensor wet → valve closed: ~3-4 seconds. The valve takes 2 seconds to mechanically rotate 90°.

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

## What about the "valve closed when I want water" problem?

The main valve closed automation runs even if I'm home. Which means: someone is washing dishes, the dishwasher leaks, valve shuts, *all water in the house stops*.

The recovery flow:
1. Push notification arrives on both phones.
2. Tap "investigate" link — opens HA dashboard showing the sensor that triggered.
3. Manually inspect the leak. Fix or contain.
4. From the HA dashboard, tap "Open main valve."
5. Valve opens (3-second rotation), water flows again.

This is exactly the friction I want. The default is "shut things down and ask questions later"; the recovery is one tap from the phone. Insurance would pay $11k to avoid having to do this.

## What's next

- **The other major leak risk: refrigerator water line.** Ice maker + filtered water dispenser. Adding a sensor behind the fridge this weekend.
- **The hot water heater itself.** I have a sensor *next to* it; I don't yet have an "interior temperature" sensor that would catch a burst pipe inside the heater jacket. Putting that on the list.
- **A drain backup sensor.** I have a sump pump in the basement; if the sump backs up because the float switch dies, I'd like to know. A sensor in the sump pit would catch the rising water before it reaches the floor.
- **Eventually: a flow meter on the main inlet.** Detecting "any flow lasting more than 2 hours" would catch slow leaks the threshold-sensors miss. The Flo by Moen device does this. Pricey ($300) but interesting.

## What this changes about the smart-home math

Water-leak shutoff is the first piece of smart-home automation where the *insurance value* clearly exceeds the cost. Every other piece (security, convenience, scenes) is a quality-of-life argument. This one is an insurance argument.

If I had to recommend one piece of smart-home automation to a non-enthusiast, this is now it. Not the bulbs. Not the voice assistant. The leak detection + main valve shutoff.
