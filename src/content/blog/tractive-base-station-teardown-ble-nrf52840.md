---
title: "Tractive Base Station teardown — 2025 silicon, 2013 arch"
date: 2025-10-14T17:00:00-04:00
category: tools
tags:
  - pet-iot
  - tractive
  - teardown
  - ble
  - nrf52840
  - radio
notebook: pet-iot-field-guide
notebookOrder: 41
excerpt: "Bought the Tractive DOG 6 XL + Base Station post-Whistle. Cracked the case to figure out the radio: plain BLE advertising on a Nordic nRF52840 — a multi-protocol chip Tractive uses at 25% capability."
pullquote: "Tractive's Base Station ships an nRF52840 — a Swiss-army-knife radio that supports BLE 5, LE Coded PHY for 4× range, Thread for mesh, Matter, and 802.15.4. They use it as a plain BLE advertising beacon. The hardware is 2025; the architecture is 2013. The vendor doesn't know how to use what they bought."
cover: ../../assets/blog/tractive-base-station-teardown-cover.svg
coverAlt: "Tractive Base Station PCB illustration with a Nordic nRF52840 chip in the center, surrounded by labels for supported radio protocols (BLE 5, Thread, Matter, 802.15.4) versus what Tractive actually uses (plain BLE advertising)."
---

Bought a DOG 6 XL + Base Station two weeks after Whistle's dark date. The DOG 6 XL is for evaluating against [Quark's current Fi](/blog/quark-arrives-puppy-second-dog-pet-iot-baseline/) when his Fi battery degrades. The Base Station is what I really wanted to understand — it's the architectural piece I have questions about.

Spent a couple evenings on the teardown. Notes here.

## Setup, briefly

The Base Station is a small puck (~80 mm diameter, ~25 mm tall). USB-C power. Detachable external antenna (~10 cm whip). Indoor-only — not waterproof.

Setup:
1. Attach antenna.
2. Plug in USB-C.
3. Tractive app → Profile → Tracker → Power Saving Zones → Add → name the zone.
4. Press the device button to confirm range.

After 24 hours: Quark's DOG 6 XL inside the Base Station's range reports power-saving mode active. Cellular updates drop from every ~2 minutes to "on demand only" (manual app request or geofence event). Tracker power draw visibly drops.

That's the intended behavior. It works.

## The architectural question

The Power Saving Zone replaces what Tractive previously used as the "is the pet at home?" signal: home WiFi proximity. If the tracker's WiFi could detect the home network's SSID, it'd switch to power-saving. That worked for homes with WiFi reaching all the relevant pet space; it failed in homes with patchy WiFi, in outbuildings, in basements.

The Base Station is a dedicated "home anchor" signal independent of WiFi reach. Same architectural role as the **Whistle 2013 BLE base station** — the original Whistle Activity Monitor's home pairing puck I [unboxed twelve years ago](/blog/atom-arrives-whistle-activity-monitor-launches/).

Twelve years of evolution and the architecture came back. Which would be a tidy full-circle narrative — except in 2013, BLE-anchor was the best available option. In 2025, it isn't. The teardown is about what Tractive could have done instead.

## Opening the case

Tri-point screws around the perimeter (manufacturer-grade tamper resistance — same trick Apple uses on AirPods, makes you go find the right driver). 30 seconds with an iFixit precision set.

Inside:

| Component | Identification |
|---|---|
| Primary SoC | **Nordic nRF52840** (under RF shield, 7×7 mm QFN, marking confirmed after shield removal) |
| Power | USB-C input → 3.3V LDO regulator |
| Antenna | PCB trace antenna + U.FL connector for external whip |
| Storage | Small SPI flash (likely 4-8 MB) for firmware staging |
| User I/O | Status LED, push-button |
| PCB | 4-layer FR4, ~50 × 50 mm |

The chip under the RF shield is the interesting one. Push-tab shield (no solder), pulls off easily. Marking confirms **nRF52840**.

That's the punchline. nRF52840 is Nordic Semiconductor's flagship multi-protocol IoT SoC. It supports:

- Bluetooth Low Energy 5.x — all PHY modes (1M, 2M, **LE Coded for ~4× range**).
- IEEE 802.15.4 — Zigbee, **Thread**, Matter underlay.
- Nordic's proprietary 2.4 GHz protocol (ESB / Gazell).
- ANT+.
- NFC-A tag mode (built-in NFC controller).
- Cortex-M4F with FPU, 1 MB flash, 256 KB RAM.

It's the Swiss-army knife of 2.4 GHz IoT radios. Most modern smart-home products under $50 use this chip or its smaller sibling (nRF52832 / nRF52833).

## What protocol Tractive actually uses

Sniffing the over-the-air traffic with an nRF52-DK running [Nordic's nRF Sniffer](https://www.nordicsemi.com/Products/Development-tools/nRF-Sniffer-for-Bluetooth-LE) into Wireshark:

**Plain BLE advertising + GATT.** Standard 1M PHY. No coded PHY, no extended advertising, no LE Audio, no 802.15.4 frames, no Thread, no Matter.

The Base Station broadcasts BLE advertising packets with a Tractive-specific manufacturer-data field (Tractive's BLE manufacturer ID is in the Bluetooth SIG assigned-numbers registry — I'm not publishing the specific data-field layout). The tracker, when in BLE range, sees the advertisement, recognizes the manufacturer ID + a base-station identifier in the data field, and switches cellular duty cycle to "power saving."

GATT services on the Base Station expose configuration (range setting, zone identifier) for the Tractive app to write during setup. After setup, the Base Station is essentially an advertising-only beacon. The tracker doesn't need to maintain a GATT connection; it just needs to see the advertising packets.

Standard BLE proximity beacon architecture. 2013-era topology. Reliable, simple, ships.

## What Tractive could have used (and didn't)

The nRF52840 supports everything in this list. Tractive used the radio's least capable mode:

### LE Coded PHY (4× range, same chip)

Bluetooth 5.0 added LE Coded PHY — a different physical-layer encoding (S=2 or S=8 coded modes) that trades data rate for **range**. At S=8 coding, BLE achieves approximately **4× the range** of the standard 1M PHY with the same TX power, same antenna, same battery. The trade-off is data rate (1 Mbps → 125 kbps) — irrelevant for a proximity beacon that sends a few bytes per advertising interval.

A Base Station running LE Coded PHY S=8 would cover roughly the same area as four standard-BLE Base Stations. Solves the multi-floor house problem the marketing acknowledges (range varies by environmental factors).

Tractive ships standard 1M PHY. They're using the chip but not the radio's headline 2020-era feature.

### Thread (mesh)

802.15.4 + Thread would let multiple Base Stations form a mesh network covering an entire property — outbuildings, basements, second-floor bedrooms, garage. The tracker would see "any Base Station in the mesh" as power-saving, not just "the specific Base Station in line of sight."

nRF52840 supports 802.15.4 natively. Thread requires the Thread stack on the firmware side. Nordic ships SDK support.

Tractive uses none of it.

### Matter (interop)

Matter 1.x supports door sensors, occupancy sensors, and generic Thread / BLE-discovered devices. A Matter-compatible Base Station would be discoverable by HomeKit, Google Home, Amazon Alexa, Home Assistant — the user could trigger automations on "tracker entered home zone" without needing Tractive's app.

Tractive ships no Matter support. Closed ecosystem.

### Find My-style relay

Apple's Find My third-party API (the one [Pebblebee uses](/blog/find-my-pet-trackers-apple-network-opens/)) would let *every iPhone in the house* act as an anchor. The user buys a Tractive tracker; every passing iPhone is a Base Station. No additional hardware needed in dense areas.

Tractive doesn't participate in Find My. Single-vendor network.

### UWB (sub-meter ranging)

UWB would require a different SoC (Apple's U1/U2, NXP's Trimension, or Qorvo's DW3000-series). It enables sub-meter ranging, which would let the Power Saving Zone be a precise shape instead of "BLE RSSI fuzzy radius." This is the only alternative that requires different silicon.

Tractive doesn't ship UWB.

## Why "2013 architecture with 2025 silicon"

The Base Station's hardware is current. nRF52840 is a 2018 chip with multiple revisions since; the supporting components are 2024-25 commodity. Tractive's engineering team picked good silicon.

The architecture is 2013. Plain BLE advertising. Same role as the Whistle Activity Monitor's home pairing puck.

The gap between the silicon's capability and the protocol Tractive ships is wide. **They have the radio for LE Coded PHY, Thread, Matter, multi-protocol mesh — and they ship advertising-only BLE.**

I understand the why. It's a $19.99 product. The engineering budget is small. Plain BLE works, ships in two sprints, and is well-understood by Tractive's existing team. The alternatives — Thread, Matter, LE Coded PHY — require deeper protocol-stack engineering and more interop testing. That's where the cost gets paid.

But "good enough" with the same silicon could have been meaningfully better. The Base Station could cover a multi-floor home with LE Coded PHY. Two of them could mesh with Thread. Matter would expose it to Home Assistant for cross-vendor automations. Same chip. Different firmware.

**The wheel-came-around story isn't a story about optimal architecture rediscovered. It's a story about the vendor reaching for what's familiar.** The familiar thing is BLE advertising. The available thing is much more.

## The subscription wrinkle

The Base Station is $19.99 hardware + **$5/month subscription** on top of the tracker subscription.

A passive BLE advertising beacon costs Tractive essentially zero per month to run. The $5/mo is pure margin, justified by "service" — but the device doesn't connect to the internet, doesn't sync anything cloud-side, and operates entirely as a local advertising beacon. The subscription is contractual, not technical.

I'm paying it for now (the device requires the Tractive app to enable the Power Saving Zone integration, and the app requires the sub). If community firmware ever surfaces for the nRF52840 with this role (it's a well-documented chip, the protocol is straightforward, OpenThread + community Matter stacks exist) — I'd flash it and skip the subscription. Same hardware, no monthly fee. That project is in the queue.

## What's next

DOG 6 XL battery test ongoing — 3 weeks in, I'm at 18 days on a charge with the Base Station active. Not the claimed 6 weeks; still well above Fi's 14-day real-world. Reporting at the 6-week mark.

GPS Cat Mini still on Joule and Boson — both cats have worn them since late 2022. Separately evaluating how the cat tracker performs against the Base Station's power-saving zone; writing that up.

The Base Station teardown is the headline finding: post-Whistle, the vendor that took the category's torch ships an architecture that's twelve years behind what its own silicon can deliver. The category is going to take another product cycle — or another vendor — to actually use the radio it ships.
