---
title: "Picking the Zigbee stack — Zigbee2MQTT vs deCONZ vs ZHA"
date: 2020-08-15T11:00:00-04:00
category: tools
tags:
  - smart-home
  - zigbee
  - zigbee2mqtt
  - deconz
  - protocols
notebook: smart-home-iot-journey
notebookOrder: 33
excerpt: "Three options for talking Zigbee to Home Assistant: ZHA (built in), deCONZ (Phoscon-based), Zigbee2MQTT (MQTT-bridged). Trade-offs differ."
pullquote: "If you're starting fresh in 2020: Sonoff ZBDongle + Zigbee2MQTT. If you want a UI included: ConBee II + deCONZ. If you want zero add-ons: Sonoff dongle + ZHA. The three are within 10% of each other on reliability; they differ on ergonomics."
---

Three options for running Zigbee on Home Assistant. I've used two; reading enough about the third to compare. This is what I'd tell anyone starting fresh in 2020.

## The three stacks

| Stack | Coordinator | UI | Maintained by | Strength |
|---|---|---|---|---|
| **Zigbee2MQTT (Z2M)** | Sonoff ZBDongle / Texas Instruments CC2652 / others | Web UI + MQTT | Koen Kanters + large community | Widest device support |
| **deCONZ + Phoscon** | ConBee II / RaspBee II | Phoscon web app + WebSocket / REST | Dresden Elektronik | Polished UI, vendor-backed |
| **ZHA (Zigbee Home Automation)** | Most USB sticks | HA built-in | HA core team | Zero add-on overhead |

## Coordinator hardware

Three I've used or evaluated:

**ConBee II** (Dresden Elektronik, ~$40):
- ARM Cortex-M4-based Silicon Labs EFR32MG21 — Zigbee 3.0.
- Plugs directly into the Pi's USB.
- Tested range: ~15m through walls.
- Limitation: 32 direct end-device children (router-extensible beyond that).

**Sonoff ZBDongle-P** (Sonoff, ~$25):
- TI CC2652 chip — Zigbee 3.0.
- USB. Optional external antenna kit ($10 more) doubles the range.
- Tested range with external antenna: ~25m through walls.
- Capacity: 200+ direct children with the latest firmware.
- Cheap, well-supported, growing community.

**Aeotec Z-Stick** (Aeotec, ~$60): Z-Wave only — out of scope for Zigbee comparison but worth noting they don't make a Zigbee equivalent.

## The architectural difference

**ZHA** (built into HA): HA core directly drives the coordinator USB device. No add-on. Network state lives in HA's own database. Pros: no extra process; updates with HA core. Cons: less flexible if you want to migrate to another HA install; UI is HA's default integration view (functional, not great).

**deCONZ**: a separate service (vendor's Phoscon) running as a Hass.io add-on. HA talks to it over WebSocket. Pros: polished UI; supports the ConBee/RaspBee specifically very well. Cons: vendor lock-in to Dresden Elektronik hardware; community fixes don't land as fast.

**Zigbee2MQTT**: a separate Node.js service running as a Hass.io add-on. HA talks to it over MQTT (via the Mosquitto broker). Pros: widest device support, community-driven, frequent updates, excellent web UI. Cons: an extra MQTT broker in the chain; debugging MQTT is its own skill.

## Z2M's device-support advantage

The killer feature for Z2M is the **supported-devices database**. As of August 2020, Z2M supports 1,800+ Zigbee devices. The community adds new device definitions weekly. If a vendor ships a quirky Zigbee device (looking at you, Tuya and Aqara), Z2M typically has it working within 2-3 weeks.

ZHA's support is narrower — basically anything that strictly follows the Zigbee HA spec. Tuya and many Aqara devices have non-standard reporting clusters; ZHA handles them poorly.

deCONZ is in the middle — Dresden focuses on widely-deployed devices, less on edge cases.

## My setup, as of August

Migrated from deCONZ → Z2M in April (during the [local-first migration](/blog/ripping-out-vendor-clouds-local-first-ha/)).

```
USB stack:
- Sonoff ZBDongle-P with external antenna at the top of the basement closet (signal central)
- 200+ devices supported potential; running 22

Device mix:
- 8× Aqara MCCGQ11LM (door/window)
- 6× Aqara DJT11LM (vibration)
- 1× Aqara human-body (motion + lux)
- 1× Aqara WSDCGQ11LM (temp/humidity)
- 2× Aqara wall plug (router function + outlet)
- 1× IKEA TRÅDFRI signal repeater (extends mesh to garage)
- 3× IKEA TRÅDFRI bulb (closet/laundry)

Total: 22 Zigbee devices on the mesh. Healthy at this size.
```

Z2M's UI shows the full mesh topology — which device is routing for which, signal strength per hop, last-seen timestamp. Hugely useful for debugging.

## The MQTT contract

Each Zigbee device gets an MQTT topic:

```
zigbee2mqtt/aqara_door_kitchen → {"contact": true, "battery": 87, "linkquality": 102, "voltage": 2965}
```

HA's MQTT integration auto-discovers via MQTT-discovery topic:

```
homeassistant/binary_sensor/aqara_door_kitchen/contact/config →
  { "name": "Aqara Door Kitchen Contact", "device_class": "door", ... }
```

Auto-discovery means: pair a new device in Z2M → it appears in HA within seconds, fully configured. No YAML editing. Best UX of the three stacks.

## When ZHA is the right pick

If you're running fewer than 15 Zigbee devices, mostly standard-spec ones (Philips Hue, IKEA, Sonoff), and don't want to maintain an extra add-on: **ZHA wins on simplicity**. It's right inside HA. Updates with HA. Lower complexity stack to debug.

I'd recommend it specifically for:
- Beginners installing HA for the first time.
- Households with only Hue + IKEA Zigbee.
- Anyone who finds MQTT intimidating.

## When deCONZ is right

If you already own a ConBee II, deCONZ's Phoscon UI is genuinely nice. It's also the path I'd recommend for someone running Zigbee from a non-HA platform (because Phoscon's WebSocket API is callable from anywhere).

But if you're starting from scratch with HA, Z2M usually wins.

## The hardware path I'd take in 2020

Starting fresh:

```
1. Buy Sonoff ZBDongle-P with external antenna: $30 total.
2. Install Hass.io if not already (HA OS).
3. Install Mosquitto add-on.
4. Install Zigbee2MQTT add-on. Configure to use /dev/ttyUSB0 (or wherever the dongle is).
5. Permit join, pair devices.
6. Add the MQTT integration to HA if not already. Z2M devices appear automatically.
```

Total time: 45 minutes. Total cost: $30 + devices.

## What's next

- **Sonoff ZBDongle-E** rumored for late 2020 — TI CC2652RB (different revision) plus open-source firmware. Higher power output. Going to evaluate when available.
- **Zigbee + Thread coexistence.** Project CHIP / Matter will mandate Thread in some devices. Some Thread radios share the 2.4 GHz band with Zigbee. The interference story is being worked out.
- **Z2M moving toward CC2652-only support** at some point. Older CC2530-based sticks (the original Sonoff bridge) may lose support in 2021.
