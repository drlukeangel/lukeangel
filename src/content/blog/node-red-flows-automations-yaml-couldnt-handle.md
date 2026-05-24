---
title: "Node-RED for the automations YAML couldn't handle"
date: 2018-02-25T14:00:00-05:00
category: tools
tags:
  - smart-home
  - home-assistant
  - node-red
  - mqtt
  - automation
notebook: smart-home-iot-journey
notebookOrder: 23
excerpt: "The presence-based arming logic in Home Assistant had grown into a 60-line YAML template I was afraid to touch. Node-RED turns stateful automations into flows you can actually see — and an MQTT broker turns the house into an event bus instead of a pile of point-to-point rules. The day the automation brain got a visual debugger."
pullquote: "YAML describes state well and logic badly. The moment an automation has to remember what happened five minutes ago, you want a flow you can watch execute — not a nested template you read like assembly."
---

The day-job calendar is full (the [connected medical device](/notebooks/building-medical-iot-connected-products/) is eating Q1), so this is a quick one — but it solves the problem I [flagged at year-end](/blog/2017-in-review-smart-home-journal-goes-quiet/): the automations had outgrown YAML.

## The problem with YAML automations

[Home Assistant's](/blog/first-home-assistant-install-yaml-configs/) YAML is great for "when X, do Y." It's miserable for "when X, *if* the house has been empty for 10 minutes *and* it's after sunset *and* nobody's phone is home, *then* arm — *unless* the guest mode flag is set."

My presence-arming automation had become a 60-line nested `condition:` block with three `input_boolean` helpers standing in for state I couldn't express cleanly. I stopped trusting it. When you're afraid to edit your own alarm logic, the tool is wrong.

## Node-RED — flows you can watch

Node-RED is a flow-based programming tool — drag nodes, wire them together, watch messages move through in real time. It runs as a Home Assistant add-on now (Hass.io made this a one-click install), talks to HA over a websocket, and gives stateful automations a visual debugger.

The presence-arming logic, rebuilt as a flow:

```
[HA: presence sensors] → [function: all away?] → [delay 10 min]
                                                      ↓
[HA: sun state] → [switch: after sunset?] ────→ [gate: guest mode off?]
                                                      ↓
                                              [HA: arm alarm] → [debug]
```

Every node shows its last message. When the alarm arms (or doesn't), I can see *exactly* which branch fired. The 60-line YAML template became six nodes I can read at a glance.

## MQTT — the house's event bus

The bigger shift: I stood up an **MQTT broker** (Mosquitto, also a Hass.io add-on) and started routing events through it instead of wiring every device directly to every automation.

Before: SmartThings → HA → automation → device. Point to point. Every integration its own special case.

After: everything publishes to topics. A door sensor publishes `home/frontdoor/contact → open`. Anything that cares subscribes. Home Assistant subscribes. Node-RED subscribes. A future device I haven't bought yet can subscribe without me rewiring anything.

```
mosquitto_sub -t 'home/#' -v

home/frontdoor/contact open
home/presence/luke home
home/livingroom/motion detected
home/alarm/state disarmed
```

That `home/#` wildcard — watching every event in the house scroll past one terminal — is the first time the system felt like *a system* instead of a pile of rules.

## Why this matters beyond convenience

The event-bus pattern is the same one I'm building professionally right now for a fleet of connected devices: devices publish telemetry to a broker, services subscribe, nobody's hard-wired to anybody. Doing it at home on Mosquitto and doing it at work on a managed broker are the same architecture at different scales. The house is a free testbed for the day job's patterns.

## What I'd tell past-me

- **Reach for Node-RED the moment an automation needs memory.** Stateless → YAML. Stateful → flows.
- **Stand up MQTT earlier than you think you need it.** Retrofitting point-to-point integrations onto a bus is annoying; starting on the bus is free.
- **Keep the YAML for the simple stuff.** Not everything needs a flow. "Sunset → porch light on" is one line of YAML and should stay there.

## What's next

The Zigbee radios are still trapped on the SmartThings hub. Getting them onto a coordinator I control — and onto this MQTT bus — is the project I keep deferring. Maybe before the day job swallows Q3.
