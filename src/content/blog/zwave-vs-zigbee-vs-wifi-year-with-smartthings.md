---
title: "Z-Wave vs Zigbee vs WiFi — a year on SmartThings"
date: 2015-06-17T11:00:00-04:00
category: tools
tags:
  - smart-home
  - zigbee
  - zwave
  - wifi
  - protocols
notebook: smart-home-iot-journey
notebookOrder: 13
excerpt: "A year living with all three protocols on the SmartThings hub plus Hue's separate Zigbee bridge. The frequency bands, the mesh behaviors."
pullquote: "Z-Wave for sensors, Zigbee for lights, WiFi for cameras. If you can't remember anything else from this post, remember that."
---

A year with all three radio protocols running in the same house. The SmartThings hub carries Z-Wave + Zigbee HA; the Hue bridge carries Zigbee Light Link separately; Wemo plugs and a new LIFX bulb hang off WiFi. Time for a proper comparison.

## The three at a glance

| Protocol | Band | Topology | Practical range | Power | Throughput |
|---|---|---|---|---|---|
| **Z-Wave Plus 500-series** | 908.4 MHz (US) | Mesh | 30 m / wall | Sleep-friendly, years on coin cell | ~40 kbps |
| **Zigbee HA / ZLL** | 2.4 GHz | Mesh | 10-15 m / wall | Sleep-friendly | ~250 kbps |
| **WiFi 802.11n** | 2.4 GHz / 5 GHz | Star (router) | 30 m / wall | Always-on, no sleep | 50+ Mbps |

## The 908 MHz advantage Z-Wave has

The biggest reason I now reach for Z-Wave on every battery-powered sensor: **908 MHz lives in its own world**. WiFi, Zigbee, and Bluetooth all share the 2.4 GHz band — which in a typical home is already packed with the router, the laptop, the phone, the microwave, the baby monitor, and now a dozen smart-home devices.

Z-Wave Plus on 908.4 MHz US sees almost no other RF traffic. The result: Z-Wave sensors report reliably, with 5-year battery life, where a Zigbee version of the same sensor might drop messages once a week and chew through a coin cell every nine months.

The tradeoff: throughput. Z-Wave maxes out around 40 kbps; useless for video, fine for "the door just opened."

## Zigbee's two profiles, still not interop

A year in, the most persistent annoyance: **Zigbee HA (Home Automation) and Zigbee Light Link (ZLL) are still separate profiles** and they don't natively talk to each other.

- **Hue bulbs** speak ZLL. They join the Hue bridge.
- **SmartThings Zigbee sensors** speak ZigBee HA. They join the SmartThings hub.

If I add a non-Hue Zigbee bulb (e.g., a GE Link bulb), it speaks ZHA — joins SmartThings fine, but doesn't appear in the Hue app. If I want everything in one app, I have to bridge through SmartThings's Hue integration (cloud-mediated, 2-3s latency).

Zigbee 3.0 is supposed to unify these (spec was ratified late last year). No devices ship Zigbee 3.0 yet. Coming, but not here.

## Mesh behavior in practice

Both Z-Wave and Zigbee are mesh protocols. In theory, every mains-powered node is a repeater; the more nodes you have, the better the coverage.

In practice:

- **Mesh healing is slow.** When I added a new Z-Wave switch, the mesh didn't re-route to use it for two days. SmartThings has a "repair Z-Wave network" command that forces it; never run it during the day because it takes 20 minutes and pauses normal operation.
- **Battery-powered devices don't repeat.** They're end-devices only. Adding ten more door sensors does *not* extend your coverage; only mains-powered devices (switches, outlets, plugs) do.
- **Zigbee mesh through walls is meh.** 2.4 GHz hates drywall. I've got a Zigbee sensor 12 meters from the SmartThings hub, line-of-sight; works fine. The same sensor 8 meters away through two walls drops messages.

## WiFi as the "what else" option

WiFi for everything I haven't figured out how to put on Z-Wave or Zigbee:

- **LIFX bulb** (just got the first one — six months late from their Kickstarter). WiFi-only. Bright. Hot to the touch.
- **Foscam IP camera** in the nursery. WiFi.
- **Wemo plugs** that I haven't replaced yet.

WiFi means each device is on my home network with its own IP and its own always-on radio (the [always-on tax](/blog/wifi-as-smart-home-transport-the-always-on-tax/) from the 2013 primer). I'm now seeing real impact: my 2.4 GHz channel is congested enough that my laptop sometimes prefers 5 GHz even when 2.4 GHz would have been faster.

## What I'd pick for which job, today

- **Door / window sensor**: Z-Wave (low traffic, long battery, dedicated band).
- **Motion sensor**: Z-Wave or Zigbee. Z-Wave if battery; Zigbee if mains-powered.
- **Light bulb**: Zigbee (Hue or HA). Avoid WiFi bulbs unless the form factor demands it.
- **In-wall switch**: Z-Wave (mains-powered, reliable, good ecosystem) — or [Lutron Caseta on its own 434 MHz protocol](/blog/light-switches-wemo-failed-lutron-won-no-neutral-nightmare/) if the box has no neutral.
- **Camera**: WiFi. No other protocol carries the throughput.
- **Plug-in outlet**: prefer Z-Wave (Aeotec, GE) over WiFi (Wemo). Less always-on draw, more reliable.

## What's not here yet

- **A real protocol unifier.** Zigbee 3.0 promises to fix the ZHA/ZLL split; not shipping yet.
- **Thread.** The Thread Group (Nest + Samsung + ARM + others) formed last year and is supposed to ship a low-power IPv6 mesh protocol for smart home. No products yet; rumors say 2016.
- **A way to run Z-Wave commands locally without the SmartThings cloud.** Still working on it.

The protocol stack is fine. The architecture above it (hub-mediated, cloud-required for custom logic) is what's going to need to change.
