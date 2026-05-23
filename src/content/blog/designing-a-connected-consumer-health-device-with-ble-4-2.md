---
title: "Designing a connected health device with BLE 4.2"
date: 2017-09-12T11:00:00-04:00
category: tools
tags:
  - ble
  - consumer-health
  - api-platform
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 1
excerpt: "Taking over the API platform behind a connected toothbrush line means first reckoning with what BLE 4.2 actually offers — and what it doesn't."
pullquote: "A BLE device with no WiFi is a phone-shaped product. Every connected feature pivots through the customer's iPhone, including the ones the customer never asked to participate in."
---

I'm six weeks into running the API platform behind a connected-health portfolio. The flagship is a connected-toothbrush line — an adult brush with brush-head-aware features, and a kids' brush with a companion app that turns brushing into a game. These first six weeks have been a crash course in what consumer-health BLE actually looks like in 2017.

## What BLE 4.2 is, in 2017

Bluetooth Low Energy 4.2 is the dominant standard. BLE 5.0 came out late 2016 but consumer phones — especially the older Android handsets we have to support — are still split. Targeting 4.2 is the only safe call.

The numbers that matter:

- **MTU**: default 23 bytes per ATT packet. Negotiable up to 247 with the Data Length Extension. Plenty of legacy phones won't negotiate.
- **Throughput**: practical max around 10 kbps in 2017-era pairings. Faster on flagship Android, slower on iOS.
- **Connection interval**: 7.5ms to 4s. iOS silently overrides your request to whatever it feels like.
- **Bonding**: long-term key (LTK) cached on the phone and the device after first pair. This is the foundation of trust — more on that later in the series.
- **GATT services and characteristics**: every feature exposed as a service UUID with one or more characteristic UUIDs. Read, write, notify, indicate.

The whole protocol design problem becomes "encode telemetry into characteristics that fit through a 23-byte pipe with a flaky transport."

## The constraint that shapes everything: no WiFi on the device

The brush has no antenna for WiFi. No cellular. No physical port that you'd connect to a network. The only radio is BLE, and the only thing within BLE range is the user's phone.

This single fact dictates the entire architecture:

1. **The phone is the gateway.** Every byte of telemetry from the device reaches the cloud through the phone's app.
2. **Connectivity is intermittent.** The user uses the brush for two minutes twice a day. The brush is in BLE range, with the app open, for maybe four minutes total in 24 hours.
3. **Storage on the device is non-trivial.** If the user's app is closed when they brush, the device has to store the session and replay it on next connect. That means on-device flash for telemetry, plus a sync protocol with backfill.
4. **Auth has to anchor on the phone.** The device can't talk to the cloud directly to prove itself. Trust has to bridge phone-to-cloud (a normal OAuth dance) and device-to-phone (BLE bonding).

I'll write about the auth model separately. Here I want to focus on what the connectivity model implies for the API platform.

## API platform implications

If you come from web services in 2017, you reach for a synchronous REST model: phone sends a session POST, server responds, done. That model breaks immediately:

- Sessions are recorded on the device, not the phone. The phone has to receive them via BLE first.
- Sessions can be days old when they arrive (the user used the device at home, the app was closed, the phone wasn't in BLE range until they opened the app at the airport).
- Sessions can arrive out of order if the device's clock has drifted (small consumer devices don't always have an RTC backed by a battery).
- Sessions can be duplicates if the phone-device sync logic gets confused.

This pushes us toward an **append-only event ingestion** API. Every event from the device — a brushing session, a head-attached, a battery low — goes through one endpoint with idempotency keys derived from `(device-serial, monotonic-counter)`. Dedup happens in the API. Out-of-order arrival is handled by treating timestamp-on-device as authoritative for ordering, with server-side correction when the device clock is obviously wrong.

If that sounds like a lite version of MQTT-on-AWS-IoT, that's because it is. AWS IoT exists in 2017 (the service is being renamed AWS IoT Core at re:Invent later this year) — we evaluated it. We're not picking it for reasons I'll cover in the [API consolidation post](/blog/from-eight-device-apis-to-one-entity-domain-model/) and the [auth post](/blog/phone-as-gateway-auth-model/). The short version: the device-only-talks-to-the-phone model doesn't fit a broker that expects the device to authenticate to it directly.

## iOS Core Bluetooth vs Android BluetoothGatt

I run the API platform. I have two senior engineers running the mobile side. The conversations from those engineers, recurring through these first weeks:

- **iOS Core Bluetooth**: the abstractions are cleaner. Background scan is gated behind specific use-case permissions (Apple does not love consumer health apps doing background BLE scans). State preservation across app backgrounding mostly works. Connection intervals are locked to what iOS wants.
- **Android BluetoothGatt**: the abstractions are messier. The state machine has hidden cliffs (a missed `onConnectionStateChange` can silently leave you in a half-connected state). Vendor differences across Samsung, Huawei, Xiaomi are significant. Auto-reconnect is unreliable.

The lesson for the API platform: build the cloud-side assuming the phone is unreliable. If telemetry shows up late, malformed, duplicated, missing — that's the median case, not the exception.

## What I want to carry forward from this

Three principles from this opening period I intend to hold to:

1. **Treat the phone as a flaky gateway, not a trusted client.** Sign telemetry on the device. Verify on the cloud. Don't take the phone's word for anything load-bearing.
2. **Design the ingestion API for replay.** Events are append-only with idempotency keys. Order is reconstructed server-side. No state on the gateway.
3. **Bake the radio constraint into the product spec.** The hardware team's 10 kbps practical throughput is a product constraint — it determines feature scope. Two-way streaming feedback during a session isn't viable at 10 kbps; one direction is.

The next post in the series will be the [HIPAA and FDA Class I post](/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data/), because before any of this architecture matters we have to know what kind of regulated product we're actually building.
