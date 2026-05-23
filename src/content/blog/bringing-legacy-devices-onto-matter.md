---
title: "Bringing legacy Zigbee + Z-Wave devices onto Matter — the bridges"
date: 2024-09-17T15:00:00-04:00
category: tools
tags:
  - smart-home
  - matter
  - zigbee
  - zwave
  - bridges
notebook: smart-home-iot-journey
notebookOrder: 50
excerpt: "Two years after Matter 1.0, the legacy-device bridge story is finally usable. Aqara M2 bridges Aqara Zigbee. Hue bridge bridges Hue."
pullquote: "Matter bridges turn 'I need to repurchase 200 sensors' into 'my existing sensors join my Apple Home / Google Home / Alexa via the device they already talk to.' That's the migration path that makes Matter actually useful."
---

Two years after [Matter 1.0 shipped](/blog/matter-1-0-ships-protocol-primer/), the bridge story is finally usable. Three bridges in my house, expose hundreds of legacy Zigbee + Z-Wave devices to the Matter fabric. Notes on each.

## The three bridges

### 1. Aqara M2 Hub → Matter

The Aqara M2 hub already manages my Aqara Zigbee devices (door/window sensors, vibration sensors, motion sensors). Aqara released firmware 4.0 in July with Matter support: the M2 now appears as a **Matter Bridge** on the local network, exposing each Aqara Zigbee device as a Matter device.

Pairing the M2 with Apple Home:
1. M2 shows a Matter setup code in the Aqara app.
2. Open Apple Home → Add Accessory → scan setup code.
3. Apple Home discovers the M2 → asks if I want to add the bridge → shows the 23 Aqara devices behind it.
4. Each device joins Apple Home individually.

Twenty-three devices in 5 minutes. The same M2 bridge is simultaneously commissioned with **Google Home** and **Home Assistant**. Each ecosystem sees its own copy of the device, controls it independently, observes the same state.

The Aqara M2 is also a **Thread Border Router**. So new Matter-over-Thread devices (e.g., Eve sensors) commission through the same M2.

Cost: $60 hub. Bridges 23 existing Zigbee devices to multiple ecosystems. Best $60 I spent this year.

### 2. Hue Bridge → Matter

Philips updated the Hue Bridge v2 firmware in March to support Matter. Same model as Aqara — the bridge exposes all Hue bulbs + Hue Motion sensors as Matter devices.

Pairing to Apple Home:
1. In the Hue app, enable Matter sharing → generates a Matter setup code.
2. Apple Home scans → discovers the bridge → adds devices.
3. 14 Hue bulbs + 4 Hue Motion sensors now visible in Apple Home.

Latency: about 200ms for a brightness change initiated from Apple Home → Matter → Hue Bridge → Zigbee → bulb. Slightly slower than direct-app control (~150ms) but indistinguishable for human use.

### 3. Home Assistant as a Matter Bridge

The big one: HA 2024.7 added a "Matter Server" mode that exposes any HA entity (Z-Wave, ESPHome, the LoRa garden sensors, custom integrations) as Matter devices.

```yaml
matter:
  bridge:
    name: "Home Assistant Bridge"
    discoverable: true
    devices:
      - light.living_room
      - light.kitchen
      - lock.front_door  # Z-Wave Yale lock
      - sensor.garden_bed_1_moisture  # LoRa sensor
      - binary_sensor.front_door_contact  # Zigbee
      # ... 40 entities total
```

After HA reload, the HA-as-Matter-bridge appears on the network. Pair it with Apple Home / Google Home / Alexa using a generated setup code. Each ecosystem now sees those 40 HA entities as Matter devices.

This is the breakthrough for me. Devices that have no Matter support at all (LoRa garden sensors, custom ESPHome stuff, Z-Wave devices) get bridged to Matter ecosystems via Home Assistant. Apple Home shows my soil moisture sensors as "humidity sensors." Voice command works: "Hey Siri, what's the moisture in garden bed 1?"

## What the bridges enable

The architecture now looks like:

```
                ┌─────────────────┐
                │   Matter Fabric │  
                │ (multiple ecos) │  
                └────────┬────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼───────┐ ┌──────▼──────┐ ┌──────▼──────┐
│  Aqara M2     │ │ Hue Bridge  │ │ HA as Bridge│
│  (Zigbee)     │ │ (Zigbee LL) │ │ (everything)│
└───────────────┘ └─────────────┘ └─────────────┘
        │                │                │
   23 Aqara          18 Hue           40 HA-managed
   devices           devices          entities
                                    (Z-Wave, LoRa, 
                                     ESPHome, ...)
```

Each device exists once on the network. Multiple ecosystems see it. Each ecosystem maintains its own automations.

## What doesn't yet

- **Z-Wave native Matter bridging.** No Z-Wave-to-Matter bridge hardware ships yet. My Z-Wave devices reach Matter via the HA-as-Matter-bridge route only.
- **Matter security cameras.** Not in Matter 1.3 spec yet. The Reolink cameras + Frigate stay outside the Matter fabric for now.
- **Matter automations across ecosystems.** Each ecosystem (Apple Home, Google Home, HA) maintains its own automation logic. A Matter device's state changes propagate via Matter; the *decision* to act on the change is per-ecosystem.
- **Matter-over-WiFi-only devices** (e.g., the newer Eve Energy plugs) sometimes have flaky Thread coexistence. The Thread mesh is fine for sensors; for high-bandwidth or low-latency devices, WiFi remains preferable.

## The migration philosophy

I've decided NOT to repurchase devices for the sake of Matter native support. Existing Aqara + Hue + Z-Wave kit is reliable. Bridges expose them to Matter ecosystems. Best of both: keep what works, add Matter as the cross-ecosystem layer.

What I AM buying as Matter-native:
- Eve sensors (already have a few; they're great).
- Eve Energy plugs for power monitoring.
- Nanoleaf bulbs as needed.
- New thermostats when the Ecobees age out.

What I'm NOT going to repurchase:
- The 23 Aqara sensors (bridged via M2).
- The 18 Hue bulbs + 4 Hue Motion (bridged via Hue Bridge).
- The Z-Wave plugs and locks (bridged via HA).
- The LoRa garden sensors (bridged via HA).

The point of Matter for me is the *cross-ecosystem* layer, not the *replacement* layer.

## What's next

- **More Matter Border Routers** — I now have 4 (Aqara M2, Hue bridge, Apple TV 4K, the Frame TV). Adding the new Echo Hub later this year.
- **Matter camera support** in the spec (rumored 1.4, late 2024 / early 2025).
- **Matter-over-Thread sensors at scale** — replacing some of the older Zigbee end-devices with Eve Thread versions as batteries die.
- **The HA Matter bridge → SmartThings** path so the SmartThings ecosystem sees HA-managed devices too.

Two years post-Matter-1.0, the bridge model is the right architectural pattern. Not "Matter replaces everything." Just "Matter exposes everything to multiple ecosystems."
