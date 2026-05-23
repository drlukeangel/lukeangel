---
title: "Matter 1.0 ships — the protocol primer ten years late"
date: 2022-11-08T19:00:00-05:00
category: tools
tags:
  - smart-home
  - matter
  - thread
  - protocols
notebook: smart-home-iot-journey
notebookOrder: 42
excerpt: "CSA ratified Matter 1.0 on October 4 and Apple, Google, Amazon, and Samsung committed support on November 3. After ten years of standards drama."
pullquote: "Matter solves vendor-to-vendor commissioning. It does not solve the multi-hub problem, the privacy problem, or the API-versioning problem. It is the foundation, not the building."
---

Matter 1.0 was ratified by the Connectivity Standards Alliance (CSA) on October 4. On November 3, Apple, Google, Amazon, and Samsung announced production support. Ten years of "the unified smart-home protocol is coming" turned into "the unified smart-home protocol is here." Sort of.

Notes for anyone running a smart home this week.

## What Matter actually is

Matter is **an application-layer protocol** sitting on top of three possible network transports:
- **WiFi**: for high-bandwidth devices (cameras, displays, speakers).
- **Thread**: a low-power 6LoWPAN mesh at 2.4 GHz, designed for battery devices (sensors, locks).
- **Ethernet**: for wired devices.

Matter does NOT define a new physical layer. It rides on top of existing radios. Thread devices are not Matter; Thread is a transport. Matter devices may speak over Thread, or over WiFi, or both.

The protocol stack:

```
Matter (application: commissioning, control, attributes/clusters)
  └─ IP (UDP)
     └─ Thread / WiFi / Ethernet (transports)
        └─ 802.15.4 (Thread) or 802.11 (WiFi) (radios)
```

## The clusters / data model

Matter inherits Zigbee Cluster Library semantics (because the ZCL team became the Matter team). A Matter device exposes:

- **Endpoints** (each endpoint is a "feature" of the device — e.g., a multi-bulb fixture has multiple endpoints).
- **Clusters** (groups of attributes + commands — same as Zigbee).
- **Attributes** (state values: On/Off, Brightness).
- **Commands** (actions: TurnOn, Identify).

```
OnOff cluster (0x0006)
  Attributes: OnOff (bool, RW)
  Commands: Off, On, Toggle
```

The model is *identical* to Zigbee HA. A Zigbee device's cluster definitions can be wrapped into a Matter device with minimal protocol translation. This is intentional — the CSA didn't want to throw out decades of Zigbee tooling.

## Commissioning — the magic phrase

The thing Matter actually fixes: **commissioning**. A Matter device pairs with a Matter ecosystem (Apple Home, Google Home, Alexa, SmartThings) via a single QR code or pairing pin code.

```
1. New Matter device: shows a QR code on packaging (or in the device's display).
2. iOS / Android scans the QR.
3. The QR encodes: device discriminator, passcode, vendor ID.
4. Device is on Thread or WiFi already in its commissioning mode.
5. Phone discovers the device, completes a Diffie-Hellman handshake using the passcode.
6. Device is fabric-joined.
7. Optionally: the device can be commissioned to *multiple fabrics* simultaneously — i.e., joined to Apple Home AND Google Home AND HA at the same time.
```

That last point is the killer feature. A Matter bulb can be paired with Apple Home (for Siri), Google Home (for Google Assistant), and Home Assistant (for local automation) simultaneously. The bulb doesn't have to pick a side.

## Thread — the new networking layer

Thread is the IPv6 mesh network underlying many Matter devices. It is *not* Zigbee, but it shares the same 2.4 GHz 802.15.4 PHY. Different network layer (IPv6/UDP) and different security model.

The interesting Thread properties:

- **IPv6-native**: every Thread device has a globally-routable address. No NAT.
- **Self-healing mesh**: any mains-powered Thread device can be a router. Battery devices are "sleepy end devices."
- **Border Router**: a device with both Thread and another network (usually WiFi) bridges Thread devices to the rest of the IP world. Apple TV 4K, HomePod Mini, Google Nest Hub Max, Aqara M2, Amazon Echo (4th gen) are all Border Routers.
- **Battery devices on Thread**: years on a coin cell. Better than Zigbee's 1-2 years.

If you have one Thread Border Router in your house, you have a Thread network. Add more Border Routers for redundancy + better coverage; they self-discover and form a multi-leader Thread network.

## What Matter doesn't solve

A few things to be clear about:

**1. Matter doesn't replace Zigbee or Z-Wave overnight.**
Existing Zigbee devices keep working with existing Zigbee coordinators. Matter is an *additional* path, not a replacement. Aqara's M2 hub bridges existing Aqara Zigbee devices into Matter; Hue's bridge will do the same eventually.

**2. Matter doesn't solve the camera problem.**
Matter 1.0 includes basic device types: lighting, locks, thermostats, sensors. Cameras are *not* in 1.0; they're on the 1.x roadmap. Existing camera ecosystems (Reolink, Ring, Arlo) keep doing their own thing.

**3. Matter doesn't solve API versioning across vendors.**
A Hue bulb advertised as Matter still has Hue-specific behaviors. Some clusters are vendor-extended. The "one protocol, all devices identical" dream isn't real; vendors still differentiate.

**4. Matter doesn't make ecosystems share data.**
Apple Home, Google Home, and Alexa each maintain *their own* state graph. If you control a Matter bulb from Apple Home, Google Home sees the bulb's new state via the Matter protocol but doesn't share the *automation logic*. Each ecosystem still runs its own routines.

**5. Matter doesn't help my Z-Wave devices, yet.**
Z-Wave is structurally separate. Long-term, Z-Wave devices might be bridged through Matter via a "Matter bridge" device, but no such bridge exists yet.

## What to do as a Matter user, today

For me, very little. The five-year-old Zigbee + Z-Wave setup works. I'm not ripping out anything.

What I'll do:

- **Buy a Thread Border Router** for the closet. Going with the Aqara M2 hub ($60) — it doubles as a Zigbee bridge for existing Aqara devices AND a Thread Border Router. Two birds.
- **Wait six months** before buying any "Matter" certified devices. The first wave will be early-firmware buggy.
- **Watch Home Assistant's Matter integration** — landed in HA 2022.12 as experimental. Will be production-ready in 2023.
- **NOT replace my Hue bridge** even though Philips says the bridge will Matter-bridge. The Hue bridge already does everything I need; Matter changes nothing for my Hue setup.

## What I'm betting

- By end of 2023: Matter devices outsell pure-Zigbee in new device sales.
- By end of 2024: HA + Matter is the primary unifier (replacing the per-protocol-bridge approach I have now).
- By end of 2025: legacy Zigbee + Z-Wave devices are bridged through Matter for all new installs, but existing installs (mine) keep running side-by-side for 5+ years.

Long arc. Worth following.

## Useful reading

- The Matter spec: developer.csa-iot.org (free download for the 800-page PDF).
- Thread spec: threadgroup.org.
- HA's Matter integration: home-assistant.io/integrations/matter.

I'll write more on this once I have actual Matter devices in the house. Probably summer 2023.
