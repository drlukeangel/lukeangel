---
title: "MQTT as the house's nervous system — one broker, every device"
date: 2019-09-16T18:00:00-04:00
category: tools
tags:
  - smart-home
  - mqtt
  - home-assistant
  - architecture
  - local-first
notebook: smart-home-iot-journey
notebookOrder: 28
excerpt: "MQTT started as a side bus in 2018. After Google killed Works with Nest, it became the plan: route every device through one broker I own, so no vendor's API decision can unravel a web of automations. The topic hierarchy, the bridge pattern, the retained-message trick, and why this is the same architecture I build at work for fleets of connected devices."
pullquote: "When every device speaks to one broker instead of to each other, killing a vendor's cloud API stops being a catastrophe and becomes a footnote. You lose one device's features, not the web. That's the whole point of a nervous system — you can lose a finger without losing the hand."
cover: "../../assets/blog/mqtt-house-nervous-system-one-broker-every-device-cover.svg"
coverAlt: "Every device in the house publishing to a single MQTT broker at the center, and every controller subscribing from it — one nervous system the homeowner owns, instead of a tangle of point-to-point vendor links."
---

[Works with Nest dying in the spring](/blog/works-with-nest-is-dead-platform-risk-made-real/) was the push. The plan it pushed me toward: make **MQTT the primary nervous system of the house**, not the side bus it's been since [I stood up Mosquitto in 2018](/blog/node-red-flows-automations-yaml-couldnt-handle/).

The thesis: if every device publishes to one broker I own, a vendor killing an API costs me one device's cloud features — not a tangle of cross-vendor automations.

## The topic hierarchy

The single most important design decision in an MQTT house is the topic naming scheme. Get it right once; everything downstream gets easier. Mine, after a couple of false starts:

```
home/<area>/<device>/<property>     → state (published by device)
home/<area>/<device>/<property>/set → command (published by controller)

home/kitchen/main_light/state        on
home/kitchen/main_light/state/set     off
home/livingroom/motion/occupancy      detected
home/frontdoor/contact/state          open
home/_presence/luke                   home
home/_alarm/state                     disarmed
```

Rules I settled on:
- **`<area>/<device>/<property>`** — readable, greppable, sorts sensibly.
- **State and command on separate topics** (`/set` suffix). Never let a device's reported state and a command to change it collide on one topic — that way lies feedback loops.
- **`_`-prefixed areas** (`_presence`, `_alarm`) for virtual/house-level state that isn't tied to a physical room.

## The bridge pattern

Not every device speaks MQTT natively. The job is to bridge each protocol island onto the bus:

| Source | Bridge | Result |
|---|---|---|
| Zigbee | [deCONZ](/blog/conbee-deconz-zigbee-off-the-smartthings-hub/) → MQTT bridge | Zigbee events on `home/...` |
| Z-Wave | Z-Wave → MQTT (zwave2mqtt) | Z-Wave events on `home/...` |
| Hue | Home Assistant → MQTT | Hue state mirrored to bus |
| Custom ESP sensors | native MQTT (they publish directly) | cheapest, cleanest path |
| Home Assistant | MQTT integration (two-way) | HA both publishes and subscribes |

Home Assistant sits on the bus like everything else — it subscribes for its dashboards and automations, and publishes commands. It's a *participant*, not the spine. If HA goes down for an upgrade, the bus keeps carrying messages and Node-RED keeps reacting.

![The bridge pattern drawn as a hub-and-spoke around one MQTT broker. On the left, four protocol islands feed in through bridges: Zigbee via deCONZ, Z-Wave via zwave2mqtt, Hue mirrored through Home Assistant, and custom ESP sensors publishing native MQTT directly. All of them land on a single broker in the center, publishing to the home/ topic tree. On the right, the consumers subscribe from the same broker: Home Assistant for dashboards and automations, and Node-RED for flows. A note marks Home Assistant as just another participant on the bus, not the spine — so if it restarts, the broker and Node-RED keep the house running.](../../assets/blog/mqtt-bridge-pattern-bus.svg)

## The retained-message trick

The detail that made this feel solid: **retained messages.** Publish a device's state with the retain flag, and the broker holds the last value. Anything that subscribes later immediately gets the current state instead of waiting for the next change.

```
mosquitto_pub -t 'home/frontdoor/contact/state' -m 'closed' -r
```

So when Home Assistant restarts, it doesn't come up blind — it subscribes, and the broker immediately replays the retained state of every door, light, and sensor. The house's current state lives in the broker, durably, independent of any one application.

![The retained-message trick on a timeline. A door sensor publishes "closed" with the retain flag set, and the broker holds that last value. Later, Home Assistant restarts and comes up blank. The moment it re-subscribes, the broker immediately replays the retained state of every topic — door closed, light on, motion clear — so HA is fully caught up without waiting for the next change. A caption contrasts this with a non-retained bus, where a restarting consumer would sit blind until each device happened to report again, and notes that the house's authoritative current state therefore lives in the broker, not in any one app.](../../assets/blog/mqtt-retained-message-restart.svg)

## Why this is the day job in miniature

I keep noting this because it keeps being true: the architecture I'm building at home is the architecture I build at work for [connected-device fleets](/notebooks/building-medical-iot-connected-products/). Devices publish telemetry to a broker. Services subscribe. Nobody's point-to-point wired. State is retained so a restarting consumer catches up instantly.

At work it's a managed broker, TLS mutual auth, a compliance auditor reading the topic ACLs. At home it's Mosquitto on a Pi. Same shape. The house is where I get to feel the architecture in my hands before I have to defend it in a design review.

## Where the house stands now

- **Logic**: Home Assistant + Node-RED, local.
- **Nervous system**: MQTT, one broker, mine.
- **Zigbee**: deCONZ → bus. ✓
- **Z-Wave**: bridging onto the bus now — which finally gets it off the SmartThings hub as a side effect. ✓ (the migration I've deferred since 2017, done almost by accident).
- **Cloud dependencies**: shrinking to near-zero. A vendor API death is now a shrug, not a crisis.

## What's next

Year-end review is due — and unlike the last two, 2019 ends with the local-first project essentially *done*. The closet runs the house. The cloud is optional. Now to write down how it held up, and whether the day job will finally let this journal speed back up in 2020.
