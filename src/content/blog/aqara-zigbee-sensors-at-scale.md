---
title: "Aqara Zigbee door/window sensors at scale"
date: 2017-11-26T15:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - zigbee
  - aqara
  - sensors
notebook: smart-home-iot-journey
notebookOrder: 21
excerpt: "Aqara's tiny Xiaomi Zigbee sensors finally reach the US via AliExpress. Six $9 door/window sensors, the slightly-off-spec quirks that come with them, and a 9-device Zigbee mesh for the price of three SmartThings parts."
pullquote: "Aqara door sensors are a third the size of a SmartThings Multipurpose, run two years on a single CR1632 button cell, and cost nine dollars each. The catch: they speak a slightly-off interpretation of the Zigbee HA spec, so the consumer hubs choke on them."
cover: "../../assets/blog/aqara-zigbee-sensors-at-scale-cover.svg"
coverAlt: "A cluster of small thumb-sized two-piece contact sensors fanning out from a single USB coordinator stick, with a few mains-powered plugs acting as routers to keep the sleeping sensors reachable across a house-sized mesh."
---

Aqara — a Xiaomi sub-brand sold through the Mi Home ecosystem — makes Zigbee sensors you couldn't easily buy in the US until this year. The route is AliExpress: order, wait two to three weeks, and a box turns up from Shenzhen. Six MCCGQ11LM door/window sensors landed last week at $9.30 each. The SmartThings Multipurpose I'd been buying is $40. That's not a discount, that's a different category of cost — and the functionality is comparable for the one thing I use these for, which is "is this door open."

Two weeks installed. Here's what works, what doesn't, and the one thing that'll bite you if you skip it.

## The Aqara MCCGQ11LM, hardware

- 41 × 22 × 11 mm — thumb-sized, about a third the volume of a SmartThings Multipurpose. The magnet half is smaller still.
- Adhesive backing (3M VHB on both halves) — sticks to door frames cleanly without screws, which matters on a painted jamb you don't want to drill.
- **CR1632 button cell.** Manufacturer claims roughly two-year battery life at normal usage. I'll believe it when I've replaced one, but the duty cycle (wake, report, sleep) is light enough that it's plausible.
- **Zigbee HA 1.2** — with Aqara-specific extensions that are the whole reason this post exists.
- A reed switch (open/close) and nothing else. No accelerometer, no temperature, no tamper. It is a binary sensor and proud of it.

The minimalism is the point. SmartThings sells one device that does five things for $40; Aqara sells five devices that each do one thing for $9. For door state, I want the cheap single-purpose part.

## The Zigbee-stack compatibility problem

Aqara devices speak a slightly-modified version of the Zigbee HA spec. They join the network like normal end-devices, then about 30 seconds later they go to sleep and *don't* respond to the standard "configure reporting" command the way a compliant device should. Most coordinators expect to set up attribute reporting at join time; Aqara devices have already nodded off by then. So whether they work for you comes down entirely to whether your coordinator's stack has been taught the Aqara quirks:

- **deCONZ + the ConBee stick**: works, after a couple of join-and-reset retries. deCONZ's firmware has explicit handling for the Aqara reporting behaviour, which is why it holds onto them. The quirk that remains is mesh-related, not pairing-related — more on that below.
- **SmartThings hub**: partial. Aqara devices join, then drop off the network within hours. SmartThings' device handlers don't account for the off-spec reporting, so the hub stops hearing from them and eventually evicts them. Community device handlers exist but it's a fight. Not recommended.
- **Hue bridge**: refuses to pair them at all. Hue only admits ZLL- or Hue-certified devices; an unrecognised Xiaomi reed switch never gets in the door.

![A timeline comparison: a compliant Zigbee device stays awake long enough after joining for the coordinator to configure attribute reporting, while an Aqara device joins, the coordinator starts to configure reporting, and the device falls asleep before the configuration lands, leaving a stack that only works if it was pre-taught the Aqara quirk.](../../assets/blog/aqara-join-sleep-timing.svg)

I'm running them on **deCONZ with the ConBee USB stick**, plugged into the same Raspberry Pi as Home Assistant. deCONZ owns the Zigbee radio and exposes the sensor states over its REST/websocket API; the deCONZ integration in HA subscribes to that and surfaces each sensor as a `binary_sensor`. It's one more service in the chain than I'd like, but it's the combination that actually keeps Aqara devices on the network, so it's the combination I run.

## What "drops off the network" actually means

A sleeping Zigbee end-device doesn't talk to the coordinator directly across the house. It attaches to a *parent* — a mains-powered Zigbee Router that's always awake — and the router relays its messages and buffers anything that arrives while the device naps. Aqara devices are aggressive sleepers, and they're also fussy about which routers they'll stay attached to. Lose the parent and the sleeping sensor goes silent: it still thinks it's joined, but nothing it sends reaches the coordinator. The dreaded "it worked for a day then stopped."

The mitigation is the standard Zigbee one, applied carefully: **put a Zigbee Router within line-of-sight-ish range of every Aqara end-device.** The trap is that not all the routers in my house are on the right network. My Hue bulbs are routers — but on the *Hue bridge's* separate Zigbee network, useless to a sensor that joined deCONZ. Same story for the GE in-wall switches living on the SmartThings hub. A sensor on the ConBee network needs a router *on the ConBee network*.

So I added a couple of mains-powered Aqara wall plugs ($15 each) at the far corners. They join deCONZ as routers and give every door sensor a strong, always-awake parent on the right mesh. The drop-offs stopped the day I powered them up.

(A known footnote, learned the hard way: some Aqara end-devices don't roam well between routers, and a few brands of router — certain Tuya and older bulbs — make them sleepier still. Sticking to Aqara's own plugs as the routers for Aqara sensors sidesteps most of it.)

The total so far for the Aqara network:
- 6× door/window sensors: $56
- 2× wall plugs (routers + actual smart plugs): $30
- 1× Aqara motion + lux + temperature sensor: $13
- 1× ConBee USB stick: $40
- **Total: $139** for a nine-device Zigbee network.

About what three or four SmartThings parts would have cost — and the ConBee stick is a one-time spend that every future Aqara device rides on for free.

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

Coverage went from two monitored entry points to six for $56 of hardware. That's the real shift: the marginal cost of one more sensor dropped from $40 to $9, and below some threshold you stop rationing. I'd been picking which doors were "worth" a sensor. Now every exterior opening gets one because not doing it would be silly.

![A house outline with six door and window openings each marked by a small two-piece contact sensor, every sensor's signal routed through two mains-powered plug routers to a coordinator stick on a Raspberry Pi; sensors out of router range are shown dropping their connection.](../../assets/blog/aqara-mesh-coverage.svg)

## The privacy angle, which is the actual reason for all this

Here's the part that justifies the whole deCONZ rigmarole. Joined to a Xiaomi Mi Home hub the normal way, these sensors phone home to Xiaomi's cloud — servers in mainland China, by default, with no way to turn it off short of not using the hub. Door-open events are exactly the kind of telemetry I don't want leaving the house: a log of when my home is empty is a burglary aid.

So I never join them to Mi Home. The radio protocol is open Zigbee; the cloud dependency lives entirely in Xiaomi's *hub and app*, not in the sensors. Run them on my own coordinator and the data never touches a vendor cloud at all — it goes sensor → ConBee → deCONZ → Home Assistant, all on hardware I own, all on my LAN.

That's the distinction worth internalising: **Aqara the hardware is excellent and cheap; Aqara the cloud is not something I'd feed household-occupancy data into.** Local-only Zigbee on a non-Mi coordinator gets you the first without the second. It's the same pattern I keep landing on — buy the radio, refuse the cloud.

![Two data paths from the same Aqara sensor: the Mi Home path sends door-open events through a Xiaomi hub out to a Xiaomi cloud overseas, while the path I use keeps the sensor on my own coordinator so events stay on the local network and reach Home Assistant without leaving the house.](../../assets/blog/aqara-local-vs-cloud-path.svg)

## What's next

- **Move the remaining SmartThings Zigbee devices onto deCONZ.** The smart outlet, the motion sensors — they're all standard enough to re-pair to the ConBee. Once they're across, the SmartThings hub has nothing left to do and comes off the shelf entirely. A holiday-week project.
- **An Aqara vibration sensor (DJT11LM, $15).** Not the same as the Multipurpose's accelerometer — it's a dedicated tap/knock/tilt detector. I want one on the basement windows and, honestly, one on the dryer to know when a load finishes.
- **An Aqara wireless mini switch (WXKG01LM, $12).** A stick-anywhere button, no wiring, CR2032 for a couple of years. Bedside "all lights off."

The lesson two weeks in: the Zigbee world outside Hue and SmartThings is far bigger and far cheaper than the retail shelf suggests. The only thing gatekeeping it is the hub story. Get past that — a ConBee and deCONZ on a Pi — and a whole catalogue of $9 Aqara, Xiaomi, and Sonoff parts opens up that the consumer hubs simply pretend doesn't exist.
