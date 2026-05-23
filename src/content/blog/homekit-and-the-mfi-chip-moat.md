---
title: "HomeKit and the MFi chip moat — the hardware tax"
date: 2016-06-09T19:00:00-04:00
category: tools
tags:
  - smart-home
  - homekit
  - apple
  - protocols
  - hap
notebook: smart-home-iot-journey
notebookOrder: 16
excerpt: "Nine months with HomeKit (since iOS 9). Three HomeKit devices working, ten more I wish would work but can't. The MFi chip is the moat."
pullquote: "Every HomeKit device costs $2-5 of BOM for an Apple-licensed authentication chip. The chip is the wall. Inside the wall, the security model is the best in the industry. Outside, you don't exist."
---

Nine months on HomeKit, since iOS 9 shipped in September 2015. Three devices in the house work with Siri:

- **Lutron Caseta Smart Bridge** (firmware updated for HomeKit late last year)
- **Ecobee3 thermostat** (the model I bought specifically because it was HomeKit)
- **Hue (via the v2 bridge)** (Philips shipped the square bridge with HomeKit support last June)

Ten more devices in the house don't work with Siri:

- All SmartThings-integrated Z-Wave sensors.
- All SmartThings-integrated Zigbee HA devices.
- Wemo plugs.
- LIFX bulbs (LIFX hasn't done a HomeKit firmware).
- The two Aeotec Multisensors.

Why? The **MFi authentication chip**.

## What MFi actually is

MFi = "Made for iPhone / iPad / Mac." Apple's hardware accessory licensing program, going back to the 30-pin dock connector era. Apple licenses an authentication coprocessor — a small dedicated chip — to vendors who pay the program fee and pass certification. The chip:

- Holds an Apple-signed certificate.
- Performs a challenge-response handshake with iOS during initial pairing.
- Without the chip's signed response, iOS refuses to talk to the device.

In the HomeKit context, the MFi chip is specifically required for HomeKit Accessory Protocol (HAP) compliance. Without it, you can build a device that *looks* like a HomeKit device, but iOS won't let it pair.

## What the MFi chip costs

- **Program fee**: licensing costs are confidential, but the figure that gets repeated is $0.10-$2 per shipped device royalty, plus annual program fees.
- **Chip cost**: the actual MFi coprocessor adds ~$0.50-$1 to BOM. (Updated chips with newer Apple support push the chip cost to ~$1-2.)
- **Certification cost**: development time + Apple's certification cycle (multi-week, sometimes multi-month) easily adds tens of thousands of dollars to a small-vendor product launch.

End-to-end, MFi adds **$2-5 of effective cost per device** plus 3-6 months of certification delay. For a $20 smart plug, that's a deal-killer. For a $200 thermostat or smart bridge, it's noise.

That's the moat: HomeKit excludes the cheap-end devices structurally.

## The HomeKit Accessory Protocol (HAP)

HAP is what runs on the wire between iOS and a HomeKit accessory. Two transports:

**HAP over IP (WiFi):**
- Device advertises itself via Bonjour (`_hap._tcp.local.`).
- iOS discovers it, initiates pairing with an 8-digit setup code (printed on the device).
- After pairing, HAP runs over HTTP with custom encryption (ChaCha20-Poly1305).
- Per-device key, per-iOS-device key, mutual auth on every connection.

**HAP over Bluetooth LE (BLE):**
- For battery-powered devices (door locks, sensors).
- Same pairing flow, GATT-based transport.
- BLE characteristics map to HAP services.

## The data model — services and characteristics

HomeKit services look like Zigbee Light Link clusters or BLE GATT services — they're standardized device "types" with required characteristics:

```
Lightbulb Service (0x00000043)
  On (0x00000025)              — bool, read/write
  Brightness (0x00000008)      — int 0-100, read/write
  Hue (0x00000013)             — float 0-360, read/write
  Saturation (0x0000002F)      — float 0-100, read/write
  Color Temperature (0x000000CE) — int mireds, read/write
```

Compared with my Hue REST API JSON, the HomeKit data is almost identical content — the abstractions match because lighting is lighting. The difference is the **wire encryption + pairing model**, which HomeKit takes seriously.

## What HomeKit gets right

**Security**. The mutual-auth + per-key model means a HomeKit device on your network can't be controlled by anyone who isn't paired with it. No "guest jumps on WiFi and turns off the lights" attack. This is *much* stronger than Hue's local REST (anyone on LAN), Wemo's UPnP (anyone on LAN), or SmartThings (anyone who can hit your cloud account).

**The Home app is good**. Siri integration is tight. Latency on Lutron Caseta + Siri is 1-2 seconds — faster than any Echo + SmartThings command path.

**Scenes and automations are local-when-possible**. With Apple TV 4 (or now the rumored HomePod) as the HomeKit hub, automations run locally when you're home and through iCloud when you're away. No vendor cloud required.

## What HomeKit gets wrong

**The MFi tax means most cheap devices never get certified**. The $20 smart plug market is locked out structurally. The Wemo plug in my kitchen can't be HomeKit, and that's not changing.

**iOS-only**. No Android. If half the household is on Android, HomeKit isn't the unifier.

**Per-iCloud-account ecosystem**. Sharing HomeKit with the family requires sharing iCloud accounts, which most families don't do.

**Vendor lock-in is structural**. A device that's HomeKit-compatible can't easily *also* work with Alexa or Google Home without separate cloud-side integrations. Each ecosystem requires its own vendor effort.

## Where I've landed

HomeKit is the *secondary* control surface in my house, behind SmartThings + Alexa. Siri controls the three HomeKit devices reliably and quickly. Everything else routes through SmartThings's broader integration set.

I'd love HomeKit to be the primary, but the device support is too narrow. Until the cheap-Zigbee crowd gets HomeKit-certified bridges (Hue already has one — Lutron has one — IKEA's rumored to have one coming), HomeKit can't carry the whole house.

## What I'm watching

- **Apple's rumored smart speaker** (the AppleHome / HomePod). If Apple ships their own Echo competitor with a HomeKit hub built in, that changes the math.
- **IKEA TRÅDFRI**. Rumored to launch later this year — IKEA's first connected lighting, supposedly with HomeKit support via their hub. If they price it under Hue (likely — IKEA prices to disrupt), the consumer market shifts.
- **Hue Motion sensor** (rumored August). Hue's first native motion device. If it works with HomeKit through the Hue v2 bridge, the HomeKit ecosystem gets a real automation primitive.
