---
title: "Aqara Zigbee door/window sensors at scale — title: 0 each"
date: 2017-11-26T15:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - zigbee
  - aqara
  - sensors
series: smart-home-iot-journey
seriesOrder: 22
excerpt: "Forecast #4 hit: Aqara/Xiaomi Zigbee sensors available in the US (via AliExpress). Six door/window sensors ordered."
pullquote: "Aqara door sensors are 1/3 the size of SmartThings Multipurpose, last 2 years on a single CR1632 button cell, and cost $10 each. The catch: you need a Zigbee coordinator that speaks their slightly-non-standard interpretation of the HA cluster spec."
cover: "../../assets/blog/aqara-zigbee-sensors-at-scale-cover.png"
coverAlt: "Aqara Zigbee door/window sensors at scale — title: 0 each"
---

Aqara (sub-brand of Xiaomi/Mi Home) Zigbee sensors are finally available in the US — via AliExpress with 2-3 week shipping. Six MCCGQ11LM door/window sensors landed last week. $9.30 each. Compared to SmartThings's $40 Multipurpose, that's a fourfold price drop with comparable functionality.

Two weeks installed; here's what works and what doesn't.

## The Aqara MCCGQ11LM, hardware

- 41 × 22 × 11 mm — thumb-sized, about 1/3 the volume of a SmartThings Multipurpose.
- Adhesive backing (3M VHB) — sticks to door frames cleanly without screws.
- **CR1632 button cell** — 120 mAh capacity. Manufacturer claims 2-year battery life at normal usage. Will see.
- **Zigbee HA 1.2** with some Aqara-specific extensions.
- Reed switch (open/close detection) only. No accelerometer, no temperature. Minimal sensor.

The minimalism is the point: cheap and small wins where SmartThings's multi-function-in-one device costs more and is bulkier.

## The Zigbee-stack compatibility problem

Aqara devices speak a slightly-modified version of the Zigbee HA spec. They join the network like normal devices, then ~30 seconds later they go to sleep and *don't* respond to the standard "configure reporting" command. This means:

- **deCONZ + Conbee II stick**: works after a couple of join-and-reset retries. Some Aqara-specific quirks (sensors drop off the network if they don't see traffic for ~30 min; need a Zigbee router nearby to keep them online).
- **Zigbee2MQTT (Z2M)**: works very well; the Z2M community has extensive support for Aqara devices, including the proprietary reporting quirks.
- **SmartThings hub**: partial. Aqara devices join but drop off the network frequently. Not recommended.
- **Hue bridge**: refuses to pair them. Hue only accepts ZLL-certified or Hue-certified devices.

I'm running them on the **Conbee II + deCONZ** add-on on Home Assistant. The deCONZ REST API publishes the sensor states to HA via the deCONZ HA integration, which works fine for me but is one more service in the chain.

Migrating to Zigbee2MQTT is on my list — Z2M's UI is better and the Aqara support is more mature — but the deCONZ setup works for now.

## What "drops off the network" actually means

Aqara devices implement Zigbee HA's "polling" model: they wake briefly, send any pending events, then go back to sleep. If there's no Zigbee Router (mains-powered Zigbee device) nearby, the sleeping end-device can lose its parent and stop being routable.

Mitigation: **keep a Zigbee router within 10m of every Aqara end-device**. In my house this means making sure Hue bulbs (which are Zigbee Routers on the Hue bridge's network — separate from the Conbee network) and the GE Zigbee in-wall switches I have on the SmartThings hub are not the right routers; I need routers on the *Conbee* network.

Practical fix: I added a couple of mains-powered Aqara wall plugs (also $15 each) at strategic locations. They act as Zigbee Routers for the deCONZ network. Now every Aqara end-device has a strong parent.

The total cost so far for the Aqara network:
- 6× door/window sensors: $56
- 2× wall plugs (as Zigbee routers + smart-plug functionality): $30
- 1× Aqara human-body / temperature sensor (added bonus): $13
- 1× Conbee II stick: $40
- **Total**: $139 for a 9-device Zigbee network.

Same money as 3-4 SmartThings devices.

## Where I've put them

- **6× door/window sensors** on:
  - Front door (replaces SmartThings Multipurpose, now in spare-parts bin)
  - Back deck door
  - Basement bulkhead (replaces SmartThings Multipurpose)
  - Kitchen patio sliding door
  - Garage entry (the one between garage and house)
  - Master bedroom window (interior alarm only — high-priority window)

- **1× human-body sensor** in the upstairs hallway (motion + lux + temperature; complement to the Hue Motion already there, which doesn't expose to HA cleanly).

That's six new contact sensors integrated into the security automation. Updating the YAML:

```yaml
# Add the new sensors to the security automation
- alias: "Security: door/window opened while away"
  trigger:
    - platform: state
      entity_id:
        - binary_sensor.front_door_contact
        - binary_sensor.back_deck_contact
        - binary_sensor.bulkhead_contact
        - binary_sensor.kitchen_patio_contact
        - binary_sensor.garage_entry_contact
        - binary_sensor.master_window_contact
      to: "on"
  condition:
    - condition: state
      entity_id: group.family
      state: "not_home"
  action:
    # same as before
```

Coverage went from 2 monitored entry points to 6 for an additional $56 of hardware. The marginal cost of adding more sensors is now low enough that it changes the calculus.

## The privacy angle (worth noting)

The Aqara devices, if joined to a Xiaomi Mi Home hub, phone home to Xiaomi's cloud (in China, by default). That's why I'm running them on **deCONZ via my own Zigbee coordinator** instead of through the Mi Home app. The radio protocol is open; the cloud is not.

This is a meaningful distinction: Aqara hardware is great, Aqara cloud is not something I'd put PII into. Local-only Zigbee, on a non-Mi coordinator, is the safe path.

## What's next

- **Migrate the rest of the SmartThings Zigbee devices to deCONZ**. The Smart Outlet, the motion sensors — they all work on deCONZ + Conbee. SmartThings hub is then unnecessary entirely. Going to do that over the holidays.
- **A vibration sensor** (Aqara has one too — DJT11LM, $15). Different from the SmartThings Multipurpose accelerometer; this is a dedicated tap/knock detector for windows and the dryer.
- **A wireless wall switch** (Aqara WXKG01LM) as a placeable button for "all lights off bedtime" — costs $12 and runs on a CR2032 for 2 years.

The Zigbee ecosystem outside of Hue and SmartThings is much bigger and cheaper than I realized. The barrier is the hub story; once you've got Conbee + deCONZ (or Z2M), you have access to hundreds of Aqara/Xiaomi/Sonoff devices that the consumer hubs ignore.
