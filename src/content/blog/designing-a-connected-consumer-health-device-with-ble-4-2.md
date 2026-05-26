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
cover: "../../assets/blog/designing-a-connected-consumer-health-device-with-ble-4-2-cover.svg"
coverAlt: "A BLE-only health device puck with no Wi-Fi or cellular radio, reaching the cloud only by hopping through the customer's phone — the phone drawn as the single, intermittent bridge between the device and the backend."
---

I'm six weeks into running the API platform behind a connected-health portfolio. The flagship is a connected-toothbrush line — an adult brush with brush-head-aware features, and a kids' brush with a companion app that turns brushing into a game. These first six weeks have been a crash course in what consumer-health BLE actually looks like in 2017, and most of what I assumed coming from web services turned out to be wrong.

Here's the one fact that reorganizes everything else: the brush has no radio but Bluetooth. The only device in BLE range is the customer's phone, so every connected feature — telemetry up, firmware down, the auth that proves any of it is real — pivots through that phone. You don't get to decide whether the phone is in your architecture. It already is, on every path that matters.

![BLE-only connectivity topology: the toothbrush connects over Bluetooth Low Energy to the customer's phone, which is the only path on to the cloud over Wi-Fi or cellular. The device has no direct internet link, so the phone is the sole, intermittent gateway between device and backend.](../../assets/blog/ble-4-2-topology.svg)

## What BLE 4.2 is, in 2017

Bluetooth Low Energy 4.2 is the standard we build to. BLE 5.0 was adopted in late 2016, but consumer phones are still split — plenty of the Android handsets in our install base will never see a 5.0 stack, and Apple hasn't said much about what's in the next iPhone. Targeting 4.2 is the only call that covers the customers we actually have.

The numbers that shape every decision downstream:

- **MTU**: 23 bytes per ATT packet by default — three of those bytes are header, so you get 20 bytes of payload. Negotiable up to 247 with the **LE Data Length Extension**, a 4.2 feature. Plenty of older phones won't negotiate it, so 20 bytes is the number you design against.
- **Throughput**: practical max around 10 kbps in 2017-era pairings once you account for connection-interval throttling and the BLE link layer. Faster on a flagship Android, slower on iOS.
- **Connection interval**: anywhere from 7.5 ms to 4 s. You *request* an interval; iOS overrides it to whatever it prefers, and the phone — not the device — owns that decision.
- **Bonding**: after the first pair, a long-term key (LTK) is cached on both the phone and the device. That's the foundation of trust on this platform; I'll come back to it.
- **GATT**: every feature is exposed as a *service* (a UUID) holding one or more *characteristics* (each its own UUID), and each characteristic supports some mix of read, write, notify, and indicate. This is the entire API surface the phone sees over the air.
- **LE Secure Connections**: also new in 4.2 — pairing backed by ECDH key agreement (P-256) instead of the easily-broken "Just Works" exchange that 4.0/4.1 left us with. It matters more here than on a fitness band, because the data is health data.

So the protocol-design problem reduces to one sentence: *encode telemetry into GATT characteristics that fit through a 20-byte pipe over a transport you don't control.* The cloud platform's job is to be sane about everything that pipe drips out the far end.

## How the brush exposes itself: a GATT profile, not an API

Before the architecture, the thing on the wire. The brush doesn't have an HTTP API; it has a **GATT profile** — a little tree the phone walks after it connects. Services group related characteristics; each characteristic is a typed value the phone can read, write, or subscribe to. For our brush it looks roughly like this: a device-information service (serial, firmware revision), a battery service, and a vendor brushing service whose characteristics carry session data out and accept configuration in.

![GATT profile of the toothbrush: a tree of services, each holding characteristics. Device Information service exposes serial number and firmware revision (read). Battery service exposes battery level (read and notify). A vendor brushing service holds a session-record characteristic (notify, to stream session data out), a control-point characteristic (write, for commands like sync and time-set), and a sync-cursor characteristic (read and write, to track replay position). Each characteristic advertises which operations it supports: read, write, notify, indicate.](../../assets/blog/ble-4-2-gatt-profile.svg)

The operation each characteristic supports is the part that bites you. **Notify** lets the device push a value without an ack — cheap, but lossy if the phone misses it. **Indicate** is the acked version — reliable, but it costs a round trip per packet, and at a 20-byte MTU a single brushing session is a *lot* of packets. We stream bulk session data over notify and reserve indicate for the control point, where losing a "sync complete" would actually corrupt state. That choice — notify for volume, indicate for correctness — is the kind of thing no spec tells you; the radio budget tells you.

## The constraint that shapes everything: no Wi-Fi on the device

The brush has no antenna for Wi-Fi. No cellular. No port you'd plug into a network. The only radio is BLE, and the only thing in BLE range is the user's phone. That single fact dictates the architecture:

1. **The phone is the gateway.** Every byte of telemetry reaches the cloud through the phone's app — there is no other door.
2. **Connectivity is intermittent.** Someone brushes for two minutes, twice a day. The brush is in range, with the app foregrounded, for maybe four minutes out of every twenty-four hours. The other 23 hours and 56 minutes, the cloud has no idea the device exists.
3. **Storage on the device is non-trivial.** If the app is closed when they brush — the common case — the device has to store the session and replay it on next connect. That means on-device flash for telemetry, plus a sync protocol with backfill and a cursor.
4. **Auth has to anchor on the phone.** The device can't reach the cloud to prove itself. Trust has to bridge two domains: phone-to-cloud (a normal OAuth dance) and device-to-phone (BLE bonding). Stitching those two together is its own problem, and I'll give it its own post.

Here I want to stay on what this connectivity model does to the API platform.

## API platform implications

Coming from web services, my instinct was a synchronous REST model: phone POSTs a session, server responds, done. That instinct breaks immediately, in four separate ways:

- Sessions are recorded on the *device*, not the phone. The phone has to drain them over BLE before it can upload anything.
- Sessions can be **days old** when they arrive. Someone brushes all week at home with the app closed; the phone first comes into range and foregrounds the app at an airport gate on Friday. Five days of sessions land at once.
- Sessions can arrive **out of order** if the device's clock has drifted — small consumer devices don't always carry a battery-backed RTC, so "now" on the brush is a guess between syncs.
- Sessions can be **duplicates** if the phone-device sync logic loses its place and re-drains a range it already uploaded.

So the API can't be a request/response that trusts what the phone hands it. It has to be an **append-only event ingestion** endpoint built for replay. Every event — a brushing session, a head-attached, a battery-low — carries an idempotency key derived from `(device-serial, monotonic-counter)`. The counter is the device's, not the phone's, and it only ever increases. Dedup happens server-side on that key, so a re-drained range is harmless. Ordering is reconstructed from the device's own timestamp, with server-side correction when the clock is obviously wrong (a session dated 1970, or three years in the future, gets clamped to its arrival window and flagged).

![Append-only ingestion built for replay: the device writes each session to on-device flash with a monotonic counter; the phone drains a range over BLE and uploads, possibly days late and possibly re-sending a range it already sent. The cloud ingestion endpoint deduplicates on the (device-serial, counter) idempotency key and reconstructs order from the device timestamp, so late, duplicate, and out-of-order arrivals all converge to the same correct event log.](../../assets/blog/ble-4-2-ingestion-replay.svg)

If that shape sounds like a hand-rolled, lighter-weight version of MQTT-on-AWS-IoT, that's because it is. AWS IoT exists today — the service is being renamed AWS IoT Core at re:Invent later this year — and we evaluated it seriously. We're not adopting it, and the reason is topology, not religion: an IoT broker expects the *device* to authenticate and publish directly, and our device can't reach the broker at all. It would have to speak MQTT *to the phone*, which relays to the broker — at which point the phone is doing all the work and the broker is an HTTP endpoint with a flakier transport in front of it. The right move is to build the cloud side *as if* it were a broker — append-only, idempotent, per-device attested — so that a future product with Wi-Fi on the device could adopt a real broker without the backend changing shape. I'll write up that decision, and the auth model that anchors it on the phone, on their own.

> The same principle holds on Azure or GCP: their device gateways (IoT Hub, the Cloud IoT Core that Google currently offers) also assume a directly-connected device. None of them fit a BLE-only product without the phone in the middle — so the gateway buys you little until the hardware grows its own radio.

## The pairing handshake, and why bonding is the trust anchor

The reason the phone can be a *gateway* and not just a relay is bonding. On first pair under LE Secure Connections, the device and phone run an ECDH (P-256) exchange, derive a shared long-term key, and each store it. From then on the link is encrypted with that LTK, and either side can recognize the other on reconnect without re-pairing. That stored LTK is the device's only durable relationship with anything in the world.

![LE Secure Connections pairing and bonding on first pair: the device and phone each generate an elliptic-curve (P-256) keypair and exchange public keys; both compute the same shared secret by ECDH without it ever crossing the air; from that secret each side derives and stores a long-term key (LTK). After bonding, every reconnection is encrypted under the cached LTK with no re-pairing, and the device recognizes that specific phone. Contrast with the older Just Works exchange, which derived no such mutually-authenticated secret and was trivially intercepted.](../../assets/blog/ble-4-2-pairing-bonding.svg)

It's worth being blunt about what that key is and isn't. Bonding establishes trust between *two specific physical objects* — this brush and this phone. It says nothing about *which human* is holding the phone, and it does not extend to the cloud. So the LTK secures the BLE link, but it can't be the thing the cloud trusts; the cloud has never seen it. That gap — link trust on one side, account trust on the other, and a device that touches neither directly — is exactly the bridge I'll have to build when I get to the auth model. For now it's enough to see that bonding is necessary and nowhere near sufficient.

## iOS Core Bluetooth vs Android BluetoothGatt

I run the API platform; two senior engineers run the mobile side. The same two complaints surface from them every week, and both land back on my doorstep as ingestion behavior:

- **iOS Core Bluetooth**: cleaner abstractions, stricter cage. Background scanning is gated behind specific declared use cases — Apple does not love a consumer-health app scanning for BLE in the background — so we can't assume the app wakes itself to drain the brush. State preservation across backgrounding mostly works. Connection intervals are whatever iOS decides; our request is a suggestion.
- **Android `BluetoothGatt`**: messier abstractions, hidden cliffs. A missed `onConnectionStateChange` callback can leave the stack in a half-connected state the app thinks is healthy. Behavior diverges hard across Samsung, Huawei, and Xiaomi, and auto-reconnect is unreliable enough that we treat it as best-effort.

![iOS Core Bluetooth and Android BluetoothGatt compared, each unreliable in its own way. The iOS side has cleaner abstractions but a stricter cage: background scanning is gated behind declared use cases, the connection interval is whatever iOS decides, and state preservation across backgrounding mostly works — the upshot being that the app cannot be assumed to wake itself to drain the brush. The Android side has messier abstractions and hidden cliffs: a missed onConnectionStateChange callback can leave the stack half-connected, behavior diverges across OEMs like Samsung, Huawei, and Xiaomi, and auto-reconnect is best-effort only. Two arrows show both stacks ultimately landing on the cloud's ingestion behavior, because the unreliability cannot be fixed from the phone.](../../assets/blog/designing-a-connected-consumer-health-device-with-ble-4-2-fig-1.svg)

The throughline for the platform: **the gateway is unreliable on every axis at once.** Telemetry shows up late, out of order, duplicated, or not at all — and on mobile OS terms we don't control. That's the median case, not the tail. The cloud has to be built for it, because there is no fixing it from the phone.

## What it cost me to learn this

I'll name the mistake, because it set us back a sprint. Coming in, I had the cloud team stand up the obvious thing first: a `POST /sessions` endpoint that took the phone's payload, trusted its timestamp, and wrote a row. It demoed perfectly on a desk, where the phone is always in range and the clock is always right.

It fell apart the first week real units were in real pockets. Sessions arrived in clumps days late, stamped with a drifted device clock, and — the one that actually hurt — **duplicated**, because our first sync-cursor logic re-drained a range after a dropped connection. Engagement dashboards showed people brushing twelve times a day. For a *health* product, inflated adherence numbers aren't a cosmetic bug; they're the kind of thing that, downstream, someone might quote to a clinician. We caught it, but only because the numbers were absurd enough to disbelieve. Had the duplication been 10% instead of 100%, it would have shipped.

The fix was to stop trusting the gateway and move idempotency and ordering server-side — the append-only model above. The lesson I'd hand the next team: **the demo that works on your desk is lying to you**, because your desk has none of the conditions the product lives in. Build for late, duplicated, and out-of-order on day one, or rebuild for it on day thirty.

## What I want to carry forward from this

Three principles from this opening period I intend to hold to:

1. **Treat the phone as a flaky gateway, not a trusted client.** Sign telemetry on the device, verify in the cloud, and don't take the phone's word for anything load-bearing — least of all timestamps and counts.
2. **Design the ingestion API for replay.** Append-only events, idempotency keyed on the device's own monotonic counter, ordering reconstructed server-side. No durable state on the gateway, because the gateway forgets.
3. **Bake the radio constraint into the product spec.** The hardware team's ~10 kbps practical throughput isn't a detail — it's a product constraint that sets feature scope. Two-way streaming feedback *during* a brushing session isn't viable through a 20-byte pipe; one direction, batched and replayed, is. Features that ignore the radio budget don't ship; they just find out later.

## What's next

Before any of this architecture earns its keep, there's a more basic question I skipped past: *what kind of product is this, legally?* A toothbrush that gamifies brushing and a device that records a physiological signal are governed very differently, and the answer decides which of these design choices are nice-to-have and which are non-negotiable. The next post takes that on — HIPAA, FDA Class I, and what actually counts as medical-device data.
