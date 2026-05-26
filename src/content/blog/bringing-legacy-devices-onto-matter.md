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
excerpt: "Two years after Matter 1.0, the bridge story is finally the useful part. A Matter bridge turns 'repurchase 200 sensors' into 'my existing sensors join Apple Home, Google Home, and Alexa through the hub they already talk to.'"
pullquote: "The point of Matter in my house isn't the replacement layer. It's the cross-ecosystem layer. Keep what works; let one device be visible to every controller at once."
cover: "../../assets/blog/bringing-legacy-devices-onto-matter-cover.svg"
coverAlt: "A Matter fabric node branching down to three bridge hubs, each fanning out to a cluster of legacy Zigbee and Z-Wave devices it exposes to the fabric."
---

When [Matter 1.0 shipped](/blog/matter-1-0-ships-protocol-primer/) in late 2022, the pitch I cared least about was "buy new Matter devices." I have a house full of Zigbee and Z-Wave kit that works. The pitch I cared about — and which barely existed at launch — was **bridging**: take the devices I already own and expose them to every ecosystem at once, without rebuying anything.

Two years on, that part finally works. I have three bridges running, and between them they put a few hundred legacy devices on the Matter fabric. Notes on each, and on the parts that still don't.

## The bridge model, in one sentence

A **Matter bridge** is a device that already speaks some non-Matter protocol on one side — Zigbee, Z-Wave, whatever — and advertises everything behind it as Matter devices on the other. You commission the *bridge* once into a Matter fabric, and the controller (Apple Home, Google Home, Alexa) then sees each bridged device individually. No per-device pairing dance, no new hardware on the devices themselves.

That's the whole trick, and it's why bridging is the migration path that makes Matter useful rather than a reason to throw out a working house.

![Existing Zigbee and Z-Wave devices — a door sensor, a Hue bulb, a Z-Wave lock, none with Matter support of their own — feed into a single Matter bridge, an Aqara M2, a Hue Bridge v2, or a Home Assistant add-on. One setup code, scanned once, fans the bridge out to three controllers: Apple Home, Google Home, and Alexa or Home Assistant, each holding its own commissioning via Matter's multi-admin. Each ecosystem enumerates every device behind the bridge with no per-device pairing, and a note reads that Matter shares state, not decisions, so automation logic stays in each brain.](../../assets/blog/matter-bridge-commission-once.svg)

## 1. Aqara M2 hub → Matter

The Aqara M2 already manages my Aqara Zigbee devices — door/window sensors, vibration sensors, motion sensors. Aqara pushed a firmware update this summer that adds Matter support: the M2 now advertises itself as a **Matter Bridge** on the local network, exposing each Aqara Zigbee device behind it.

Commissioning it into Apple Home:

1. The Aqara app generates a Matter setup code for the M2.
2. Apple Home → Add Accessory → scan the code.
3. Apple Home discovers the M2, asks whether to add the bridge, then enumerates the 23 Aqara devices behind it.
4. Each device joins Apple Home individually.

Twenty-three devices in about five minutes. The same M2 is *simultaneously* commissioned into Google Home and Home Assistant — Matter allows a device into multiple fabrics at once (the multi-admin feature), so each ecosystem holds its own commissioning and observes the same device state.

The M2 is also a **Thread Border Router**, so new Matter-over-Thread devices (the Eve sensors) commission through the same box. Sixty-dollar hub, 23 existing Zigbee devices bridged to three ecosystems, plus a Thread router. Best $60 I spent on the house this year.

## 2. Hue Bridge v2 → Matter

Philips added Matter support to the Hue Bridge v2 firmware earlier this year. Same shape as the Aqara: the bridge exposes all the Hue bulbs and Hue Motion sensors as Matter devices.

1. In the Hue app, enable Matter sharing → it generates a setup code.
2. Apple Home scans, discovers the bridge, adds the devices.
3. 14 Hue bulbs + 4 Hue Motion sensors, now visible in Apple Home alongside everything else.

The latency cost is real but small. A brightness change from Apple Home travels Apple Home → Matter → Hue Bridge → Zigbee → bulb, and lands in roughly 200 ms. Direct control through the Hue app is closer to 150 ms. You can measure the difference; you can't feel it.

## 3. Home Assistant as a Matter bridge

This is the one I care about most, and also the one with the asterisk.

HA has had a Matter *controller* for a while — it can join Matter devices the way Apple Home does. What changed this year is the other direction: a way to take entities Home Assistant *already owns* — Z-Wave, ESPHome, the LoRa garden sensors, custom integrations — and re-advertise them outward as Matter devices to other ecosystems.

The honest version: this is **not** a flip-a-switch core feature yet. It runs as a separate bridge service alongside HA (the community add-on built on the same `python-matter-server` project HA uses for its own Matter support). You point it at a list of entities, it stands up a virtual Matter bridge on the network, and you commission *that* into Apple Home / Google Home / Alexa with a generated setup code. You pick which entities to expose by domain or by name:

```yaml
# bridge service config — expose a subset of HA entities as Matter
bridge:
  name: "Home Assistant Bridge"
  expose:
    - light.living_room
    - light.kitchen
    - lock.front_door          # Z-Wave Yale lock
    - sensor.garden_bed_1_moisture  # LoRa sensor
    - binary_sensor.front_door_contact  # Zigbee
    # ~40 entities total
```

Once it's up, each ecosystem sees those 40 HA entities as Matter devices. Apple Home renders my soil-moisture sensors as generic humidity sensors — close enough — and "Hey Siri, what's the moisture in garden bed 1?" actually answers.

The asterisk: it's an add-on, not core; the device-type mapping is imperfect (a soil sensor masquerading as a humidity sensor is the tell); and it's the piece most likely to need a restart after an HA upgrade. But the capability is the breakthrough — **devices with no Matter support of their own get onto Matter through HA.** A Z-Wave lock and a homemade LoRa sensor end up in Apple Home. That's the part Matter promised and bridges actually deliver.

## What the bridges add up to

![Three Matter bridges feeding one fabric: the Aqara M2 exposes 23 Zigbee sensors, the Hue Bridge v2 exposes 14 bulbs plus 4 motion sensors at about 200 ms per round trip, and a Home Assistant add-on exposes 40 entities including Z-Wave, ESPHome, and LoRa devices. Each device exists once on the network; every ecosystem sees its own copy and runs its own automations on the shared state.](../../assets/blog/matter-bridges-three-paths.svg)

Each device exists exactly once on the network. Multiple ecosystems see it. Each ecosystem keeps its own automation logic. That last point matters and trips people up: Matter shares *state*, not *decisions*. A motion sensor's "occupied" propagates to every controller; the choice of what to do about it lives independently in each one.

## What doesn't bridge yet

![What bridges today versus what doesn't as of September 2024. Bridges: Zigbee via hub firmware (Aqara M2, Hue Bridge), anything Home Assistant controls via the add-on, Matter-over-Thread sensors commissioned directly, and device state across ecosystems. Not yet: native Z-Wave-to-Matter bridge hardware, Matter cameras (not in the 1.3 spec), cross-ecosystem automations, and rock-solid Thread coexistence for some Wi-Fi plugs.](../../assets/blog/matter-bridges-what-doesnt.svg)

- **Native Z-Wave → Matter.** No Z-Wave-to-Matter bridge *hardware* ships. My Z-Wave devices reach Matter only through the HA route. (Z-Wave's governance and Matter's are different worlds; a clean native bridge is still a wish.)
- **Matter cameras.** Not in the Matter 1.3 spec. The Reolink cameras and Frigate stay outside the fabric, in HA, where they were anyway.
- **Cross-ecosystem automations.** As above — state crosses, logic doesn't. There is no "Matter automation" that fires in Apple Home off a Google Home condition.
- **Thread coexistence for some Wi-Fi/Thread devices.** The Thread mesh is rock-solid for battery sensors; a couple of the newer mains-powered Thread plugs are flaky enough that I left them on Wi-Fi.

## The migration call I actually made

I decided **not** to repurchase devices for Matter-native support. The Aqara, Hue, and Z-Wave kit is reliable; the bridges expose it; that's enough.

What I *am* buying Matter-native, going forward: Eve sensors (already have a few — they're excellent), Eve Energy plugs for power monitoring, the odd Nanoleaf bulb, and new thermostats whenever the Ecobees age out.

What I'm *not* rebuying: the 23 Aqara sensors, the 18 Hue lights, the Z-Wave plugs and locks, the LoRa garden sensors. They're bridged, they work, and rebuying them as Matter devices would buy me nothing.

The point of Matter in this house isn't the replacement layer. It's the cross-ecosystem layer.

## What I'd tell a team

- **Bridge before you rebuy.** The math almost never favors replacing a working sensor fleet to get a native Matter SKU. A $60 hub firmware update beats $2,000 of new sensors.
- **Expect state, not orchestration.** If your mental model is "Matter unifies my automations," reset it. It unifies *visibility*. Automations stay in whichever brain you trust — for me, that's HA.
- **The HA-as-bridge path is powerful and rough.** Treat it as the escape hatch for orphaned protocols (Z-Wave, LoRa, ESPHome), not as your primary plumbing, and expect to babysit it across upgrades.
- **Mind the Thread/Wi-Fi split.** Sensors love Thread; some mains devices don't yet. Don't force it.

## What's next

I now have four Matter/Thread border routers in the house (Aqara M2, Hue Bridge, an Apple TV 4K, the Frame TV), with another hub on the shopping list. The bridge model is the right architectural pattern two years into Matter — not "Matter replaces everything," just "Matter exposes everything to everything." Next I want to push the HA bridge the other way, into SmartThings, so the Samsung side of the house sees HA-managed devices too — which lands me squarely in SmartThings' local story, and that's its own post.
