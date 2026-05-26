---
title: "Ripping out vendor clouds — going local-first on Home Assistant"
date: 2020-04-26T15:00:00-04:00
category: tools
tags:
  - smart-home
  - home-assistant
  - local-first
  - privacy
notebook: smart-home-iot-journey
notebookOrder: 32
excerpt: "Three years on HA. A weekend audit + migration: every device on a vendor cloud got either replaced or migrated to a local integration."
pullquote: "When the internet went out during a March storm and the family's school + work calls all dropped, the lights, locks, and security alarm kept running. Local-first was an architectural opinion until the pandemic; now it's a requirement."
cover: "../../assets/blog/ripping-out-vendor-clouds-local-first-ha-cover.svg"
coverAlt: "Smart-home devices being cut loose from the vendor clouds they tethered to and rehomed onto a single local hub on the LAN — the house's control plane pulled back inside the walls."
---

Three years on Home Assistant. Tonight finished a weekend-long audit + migration: every smart-home device that depended on a vendor cloud got either replaced with a local-protocol device or migrated to a local integration. The house runs on the LAN.

The trigger: a March thunderstorm took out the cable internet for six hours during the work-from-home blur. Voice assistants died. Ring doorbell died. The cloud-mediated Wemo plug for the coffee maker died. Lutron Caseta, Hue, Z-Wave, Zigbee2MQTT — all kept running.

That was the moment.

## What got ripped out

- **SmartThings hub**: gone. Its Zigbee devices (the kit's motion sensor and a few Aqara pieces it had adopted) moved to Zigbee2MQTT; its Z-Wave devices (the Smart Outlet, the Multipurpose contact sensors) re-included onto my own Z-Stick under HA's Z-Wave integration. Hub is in the spare-parts drawer.
- **Wemo plugs (3 remaining)**: replaced with Zooz ZEN15 Z-Wave plugs ($30 each). Local control. Energy monitoring still works.
- **Ring doorbell**: replaced with a Reolink doorbell camera (PoE, RTSP, hooked into Frigate-via-Coral). Ring cloud account deleted.
- **Nest thermostat (2nd gen)**: kept the hardware but switched the HA integration to the unofficial **homeassistant-nest** local integration via the local API. Still phones home to Google for service but HA reads/writes locally.
- **LIFX bulbs (1)**: replaced with a Hue Color bulb. WiFi-only bulbs are a category I'm done with.
- **Lutron's cloud-mediated routines**: rewritten as HA automations using Lutron's local LEAP API (which Lutron quietly enabled this year — bridge firmware 8.x).

## What stays cloud-connected

- **Apple Push Notification Service** for the Companion App. APNS requires Apple's cloud by definition.
- **Google for weather + calendar data** in HA's sensor integrations.
- **OAuth for one-off services** (Spotify integration for music casting; Google Calendar for "is there a meeting now" sensors).

These are *data-in* integrations, not *control-out*. They can be down without breaking the house.

![The migration as a before-and-after. Before: each device reaches out to its own vendor cloud for control — Wemo to Belkin, the doorbell to Ring, bulbs to a WiFi vendor, the hub to Samsung — so a dead internet link severs control of all of them. After: the same devices speak local protocols (Z-Wave, Zigbee via Zigbee2MQTT, Lutron's local LEAP, Hue's local bridge) to one Home Assistant hub on the LAN, and only a thin set of optional data-in feeds (weather, calendar, push) still touch the cloud. A caption marks the distinction that drove the whole weekend: control-out moved local, while only harmless data-in still leaves the house.](../../assets/blog/local-first-before-after-cloud-cut.svg)

## The Zigbee2MQTT migration

The Conbee II / deCONZ stack worked but Z2M's device support is broader and updates faster. Migration:

```yaml
# Mosquitto add-on with auth
mqtt:
  broker: core-mosquitto
  username: hassio
  password: !secret mqtt_password

# Z2M as an HA add-on, running its own service
# Pairing devices:
#   1. Z2M UI → "Permit Join" → 60s window
#   2. Aqara sensor: hold button 5s → joins network
#   3. Z2M auto-detects the device + publishes MQTT discovery
#   4. HA picks up via MQTT autodiscovery → entity created
```

Net result: same number of devices, faster reporting, the Z2M UI is significantly better than deCONZ's Phoscon. The breaking change cost: had to re-pair 14 Zigbee devices. Took 4 hours. Done.

## The Z-Wave integration, and the rewrite on the horizon

Z-Wave is the one part of the stack I *didn't* finish this weekend, because the ground is moving under it. HA's current Z-Wave support is built on the aging OpenZWave 1.4 library, and everyone knows it's living on borrowed time — there's an OpenZWave 1.6 beta integration in flight, and further out, a from-scratch **Z-Wave JS** driver (Node.js-based) that the community keeps saying will be faster and support far more devices. I [called the rewrite in my 2019 forecast](/blog/2019-in-review-and-2020-forecast/); it's clearly coming, but it isn't a drop-in HA add-on yet.

So for now I'm staying on the existing Z-Wave integration with the Z-Stick where it is — the network lives on the stick's flash, independent of which driver talks to it, so whenever the JS-based path is actually ready I can swap the software without re-pairing 30 devices. I'm watching it closely; this is the migration I expect to *do* later this year or early next, not one I'm claiming today. Getting it wrong on a working Z-Wave mesh is how you spend a weekend re-including locks.

## What "local-first" actually buys

After the migration, here's the failure-mode test results from a real internet outage two weeks ago (cable was out for 90 minutes):

| What works without internet | What doesn't |
|---|---|
| All lighting (Hue + Lutron + Zigbee bulbs) | Voice assistants (Alexa, Google Home) |
| All Z-Wave devices (sensors, switches, plugs, locks) | Push notifications (queued, fire on reconnect) |
| All Zigbee devices via Z2M | Spotify casting |
| HA dashboard on local network | Off-LAN access via Nabu Casa |
| Local automations (security, fans, lighting scenes) | Remote camera viewing on phone |
| Cameras + recording to NVR | (cloud-mediated portions) |
| iPad wall dashboards | |

The "house works during internet outage" property is the part the pandemic-era reliability concerns made real for me.

![The 90-minute internet-outage test sorted into two columns. Still working, all local: every light (Hue, Lutron, Zigbee bulbs), all Z-Wave devices, all Zigbee devices via Zigbee2MQTT, the local HA dashboard and iPad wall panels, local automations including the security alarm, and the cameras recording to the NVR. Broken until the link returns: the voice assistants, off-LAN access through Nabu Casa, remote camera viewing on the phone, Spotify casting, and push notifications (queued, delivered on reconnect). A caption notes that everything load-bearing for living in the house kept running; only the conveniences that are cloud by nature went dark.](../../assets/blog/local-first-outage-survival.svg)

## The privacy bonus

Pre-migration, the smart home was producing detailed behavioral data shared with:
- Amazon (Echo voice queries)
- Google (Google Home queries, Nest data)
- Belkin (Wemo plug usage)
- Samsung (SmartThings device states)
- iRobot (Roomba run data + house mapping)
- Ring (doorbell video clips)

Post-migration, the cloud-shared data is:
- Amazon (voice queries — kept Echo for music + timers)
- Google (search queries via Google Home — only when used, not ambient)
- iRobot (Roomba run data — house map purged when I disabled cloud sync)

Most of the device telemetry stops at the LAN. Behavioral data that doesn't need to leave my house doesn't.

## What I'm watching

- **HA core moving to calendar-style versioning** (a `YYYY.MM` scheme instead of the long 0.x march). It's been discussed; I expect it to land within the year.
- **The Z-Wave 700-series** entering retail. Will refresh sensors as 500-series batteries die.
- **Project CHIP** progress. Spec hasn't shipped; first dev preview supposedly later this year.
- **Voice-on-device.** Mycroft and Rhasspy are getting interesting. Local-only voice would close the last cloud loop.

The pandemic made the case for local. House operations don't depend on a working internet anymore.
