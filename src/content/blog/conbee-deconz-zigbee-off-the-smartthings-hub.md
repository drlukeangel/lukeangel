---
title: "ConBee + deCONZ — taking Zigbee off the SmartThings hub"
date: 2018-10-15T19:00:00-04:00
category: tools
tags:
  - smart-home
  - zigbee
  - deconz
  - conbee
  - home-assistant
  - local-first
notebook: smart-home-iot-journey
notebookOrder: 25
excerpt: "The Zigbee bulbs and sensors had been hostage to the SmartThings hub for years — local control routed through someone else's cloud-then-bridge. A $40 ConBee USB stick and deCONZ change that: a Zigbee coordinator I own, paired straight to Home Assistant, no vendor in the path. The bulbs answer to my closet now."
pullquote: "A radio you don't control isn't local-first, no matter where the automation logic runs. The SmartThings hub was a cloud account wearing a Zigbee antenna. The ConBee is just an antenna."
---

The project I've deferred since [last year's review](/blog/2017-in-review-smart-home-journal-goes-quiet/) finally happened over a weekend the day job didn't claim. The Zigbee devices are off the SmartThings hub and onto a coordinator I own.

## Why the SmartThings hub had to go (for Zigbee)

[Home Assistant runs the logic locally](/blog/first-home-assistant-install-yaml-configs/), but until now it reached the Zigbee bulbs and sensors *through* the SmartThings hub — which means through SmartThings' cloud-then-local bridge. Every "turn on the kitchen light" round-tripped through a dependency I'd spent a year trying to remove from everything else.

That's not local-first. That's local logic with a cloud-shaped hole in the middle.

## The hardware: ConBee + deCONZ

- **ConBee USB stick** (~$40, Dresden Elektronik). A Zigbee coordinator radio on a USB dongle. Plugs into the Pi.
- **deCONZ** — the software that drives it, available as a Home Assistant add-on. Exposes a REST API + websocket; Home Assistant has a native deCONZ integration.

The principle: the ConBee *is* my Zigbee network's coordinator now. Devices pair directly to it. No SmartThings, no cloud, no bridge.

## The migration, device by device

This is the tedious part nobody warns you about: **Zigbee devices have to be factory-reset and re-paired to move coordinators.** There's no "transfer." Each bulb, each sensor, gets removed from SmartThings, reset (usually a power-cycle dance or a button hold), then paired to deCONZ.

```
deconz pairing log:
  19:42  permit-join opened (60s)
  19:42  new device: Hue White A19  → 0x000b57fffe...  joined
  19:43  new device: Xiaomi contact → 0x00158d0002...  joined
  19:44  new device: Hue White A19  → 0x000b57fffe...  joined
```

Notes from doing ~20 devices in an evening:

- **Hue bulbs**: reset by power-cycling 5 times, or with a Hue dimmer switch held near the bulb. Painless once you know the rhythm.
- **Xiaomi/Aqara sensors**: cheap, excellent, but notoriously picky about coordinators. They paired to deCONZ fine — better than they ever behaved on SmartThings, which kept dropping them.
- **Re-pairing breaks every automation that referenced the old entity ID.** Budget time to fix entity names in Home Assistant after. Mine went from `light.kitchen_smartthings_xxxx` to clean `light.kitchen`.

## The Zigbee mesh lesson

Zigbee is a mesh: mains-powered devices (bulbs, plugs) route for battery devices (sensors). When I moved the coordinator, the mesh had to rebuild. For a day, the far-corner sensors were flaky until the routing tables settled and the bulbs in between started repeating. Patience, not panic — the mesh heals itself if you give it mains-powered routers to lean on.

## Where this leaves the architecture

- **Zigbee**: ConBee + deCONZ, local. ✓
- **Z-Wave**: still on the SmartThings hub. Next migration — a Z-Wave USB stick (Aeotec Z-Stick) is the obvious move, same pattern.
- **Hue**: some bulbs on the Hue Bridge (for the nice [scenes + local API](/blog/hue-scenes-and-the-local-rest-api/)), some moved straight to deCONZ. Still deciding whether the Bridge earns its place.
- **Logic**: Home Assistant + [Node-RED + MQTT](/blog/node-red-flows-automations-yaml-couldnt-handle/), local. ✓

The house is now ~80% server-independent. The SmartThings hub's remaining job is Z-Wave, and its days are numbered.

## What I'd tell past-me

- **The ConBee is the single highest-leverage $40 in the local-first journey.** Do it before anything else.
- **Re-pairing is a whole evening. Block the time, do it in one pass**, fix entity IDs after.
- **deCONZ vs ZHA vs Zigbee2MQTT** — there are three ways to run a local Zigbee coordinator and I picked deCONZ because the ConBee shipped with it. The others are worth a comparison someday. (Deferred — like everything, to whenever the day job lets up.)

## What's next

Z-Wave off the hub. And eventually a real comparison of the Zigbee stacks now that I've committed to local coordinators. The year's nearly out — a review is due, and it's been a quiet one.
