---
title: "Bluetooth Low Energy 4.0 in the smart home — the protocol primer"
date: 2013-03-12T10:00:00-04:00
category: tools
tags:
  - smart-home
  - ble
  - bluetooth
  - protocols
notebook: smart-home-iot-journey
notebookOrder: 3
excerpt: "BLE 4.0 has been shipping in phones since the iPhone 4S (Oct 2011). It's now showing up in fitness trackers, beacons, and the first smart-home devices. A protocol primer before the products land."
pullquote: "BLE solves one specific problem: a peripheral that runs for a year on a coin cell while still being discoverable by your phone. That constraint shapes everything else about the protocol."
cover: "../../assets/blog/bluetooth-low-energy-4-0-in-the-smart-home-primer-cover.png"
coverAlt: "Bluetooth Low Energy 4.0 in the smart home — the protocol primer"
---

BLE 4.0 was ratified in June 2010. iPhone 4S (October 2011) was the first major handset to ship with it. By early 2013, BLE peripherals are common — Fitbit Flex ships next month, Pebble shipped in January, smart locks (Lockitron, August Smart Lock) are about to land. Smart-home is the next wave.

Notes on the protocol underneath, before the smart-home devices arrive.

## What "low energy" actually means

BLE is *not* a faster or longer-range Bluetooth Classic. It's a fundamentally different design optimized for one constraint: **peripheral devices that run for a year on a coin cell**.

The numbers:

- **Classic Bluetooth**: average ~30 mW transmit, ~10 mW idle. A coin cell (225 mAh @ 3V) lasts ~20 hours of active use.
- **BLE 4.0**: ~15 mW peak transmit, **sub-microamp idle**. Same coin cell lasts a year of typical usage.

Two design decisions pull this off:

1. **Advertising-based discovery.** Instead of holding an active connection, a BLE peripheral broadcasts short advertising packets every N milliseconds (configurable, 20 ms to 10.24 s). Radio on ~1 ms per advertisement, then asleep. Tiny duty cycle.
2. **Connection intervals.** When a connection is established, peripheral and central agree on a connection interval (7.5 ms to 4 s). Radio wakes briefly at each interval; otherwise sleeps. Orders of magnitude lower than Classic's continuous radio activity.

Tradeoff: BLE is **slow** compared to Classic. Throughput peaks ~305 kbps theoretical, ~100 kbps practical in 2013-era pairings. Fine for sensor data, terrible for streaming audio.

## GATT, services, and characteristics

BLE 4.0 defines the **Generic Attribute Profile (GATT)** — a hierarchical data model:

- **Service**: a logical group (Battery, Heart Rate, custom-vendor).
- **Characteristic**: a value within a service (battery level, heart rate BPM).
- **Descriptor**: metadata on a characteristic (units, valid range, notification enable).

Every BLE peripheral exposes one or more services with characteristics. The phone (central) discovers services on connect, then reads/writes characteristics by UUID:

```
Heart Rate Service (0x180D)
├── Heart Rate Measurement (0x2A37) — notify
├── Body Sensor Location (0x2A38) — read
└── Heart Rate Control Point (0x2A39) — write

Battery Service (0x180F)
└── Battery Level (0x2A19) — read, notify
```

Standard services have 16-bit UUIDs assigned by the Bluetooth SIG. Vendor-specific services use 128-bit UUIDs (Nest's thermostat service, for example, is custom).

## Apple's iBeacon (rumored for WWDC 2013, soft-leaked already)

Apple's iBeacon spec — coming with iOS 7 this fall — turns BLE advertising into proximity detection. A beacon broadcasts an advertising packet with this payload:

```
Field         Bytes  Meaning
------------- -----  ---------------------------------------
Prefix        9      Apple-defined fixed prefix
UUID          16     128-bit, identifies the beacon owner
Major         2      16-bit, region identifier (e.g., a store)
Minor         2      16-bit, sub-region (a shelf, a room)
TX Power      1      Calibration byte at 1m, signed dBm
```

The phone uses **RSSI (received signal strength) relative to TX Power** to estimate distance:

```
distance ≈ 10 ^ ((TX_Power - RSSI) / (10 * n))
where n is environment factor, ~2-4
```

Three distance bands defined: **immediate** (< 0.5 m), **near** (~3 m), **far** (~10+ m). RSSI-based ranging is noisy but works fine for proximity bands.

For smart-home, this matters: iBeacon is the first widely-adopted standard for "I am near this device." Useful for room-level presence detection long before Hue or anyone builds it natively.

## Where BLE fits in smart home

**Fits:**

- **Proximity / presence sensors** — beacons, tap-to-pair, room-level location.
- **Battery-powered sensor peripherals** — door/window, temperature, leak (when mesh isn't needed).
- **Direct phone-to-device pairing** — fitness trackers, smart locks, the rumored Apple wearable (Bloomberg's been hinting at an "iWatch" since last year — vapor for now).

**Doesn't fit:**

- **Always-on actuators (light bulbs).** Hue uses Zigbee mesh because BLE 4.0 doesn't have a mesh profile yet — there's talk of mesh being added to a future spec revision, but it's not here.
- **Range > 10 m through walls.** BLE in 2.4 GHz loses badly to drywall and brick.
- **High-throughput devices** (cameras, audio streaming).

The architectural rule: **BLE is for peripherals talking to one phone at a time**. Anything that needs a hub, mesh, or many simultaneous controllers wants Zigbee, Z-Wave, or WiFi.

## Power-profile math, in detail

Coin cell (CR2032, 225 mAh @ 3V):

- BLE peripheral advertising at 1 Hz (1 ad packet per second), each packet ~1 ms of radio on at ~10 mA: average current ~10 µA → **~2 year battery life**.
- BLE peripheral in persistent connection at 1 s interval: average ~30 µA → **~10 month battery life**.
- BLE peripheral at 100 ms connection interval (responsive): average ~200 µA → **~6 weeks battery life**.

Door/window sensors and temperature sensors target the advertising-only mode for multi-year life. Locks and locks-class devices use connection mode when active, advertising when idle.

## The first BLE smart-home devices I'm watching

- **Lockitron** (Kickstarter-funded BLE smart lock retrofit): shipping later this year, allegedly.
- **August Smart Lock**: announced this month, ships fall 2013.

I'll write about whichever lands first and is integrate-able.

## What's next

WiFi smart plugs are about to flood the market — Wemo is already on shelves, others are coming. The next primer is on WiFi as a smart-home transport, and what it costs (electrically and architecturally) compared to BLE and Zigbee.
