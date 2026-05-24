---
title: "Phone-as-gateway — the auth model for BLE-only devices"
date: 2018-08-09T14:00:00-04:00
category: tools
tags:
  - ble
  - authentication
  - security
  - api-platform
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 4
excerpt: "A consumer device with no WiFi can't authenticate to the cloud directly. The trust model has to bridge two separate auth domains."
pullquote: "Bluetooth bonding gives you trust between two specific physical objects. OAuth gives you trust between a human and a cloud. The interesting work is in the wiring between them."
cover: "../../assets/blog/phone-as-gateway-auth-model-cover.png"
coverAlt: "Phone-as-gateway — the auth model for BLE-only devices"
---

The device has no WiFi. Every byte of telemetry, every firmware update, every command — all of it goes through the user's phone. That sounds obvious until you sit down to design the auth model, and you realize you're trying to authenticate a device-to-cloud relationship through a phone that you can't trust by default.

This is the auth model we've shipped this quarter, and the security properties it gives us.

## The two trust relationships

There are two separate trust relationships in this architecture:

**Relationship A: device ↔ phone.**
This is established by BLE bonding. The user initiates a pairing in the app. The device and the phone exchange long-term keys (LTKs). After bonding, the device "knows" this phone (by its Bluetooth address) and the phone "knows" this device (by its serial number and Bluetooth address). All subsequent BLE traffic is encrypted with the LTK.

The trust here is *between two specific physical objects*. It is not a trust in a human. It is not transitive to the cloud.

**Relationship B: phone ↔ cloud.**
This is established by OAuth 2.0. The user logs into their account in the mobile app. The app gets an access token. The token authorizes the app to make API calls on the user's behalf. Standard mobile auth.

The trust here is *between an authenticated human session and our cloud*. It is not a trust in a specific device.

The hard part is the bridge.

## Where the bridge has to happen

When the phone uploads a session to the cloud, the API has to answer three questions:

1. **Was this session actually recorded by a real device from our manufacturing line?** (Not synthesized by a malicious app, not replayed from another user's account, not crafted to inflate engagement metrics.)
2. **Was the device that recorded this session legitimately bonded to the phone uploading it?** (Not stolen, not transferred to another account without going through the proper transfer flow.)
3. **Is the human currently logged into this phone the one who actually owns the device?** (Not an ex-spouse with the password, not a co-worker who borrowed the phone.)

We need cryptographic answers, not policy answers, to all three.

## What we built

**On the device side, every event is signed.** The device firmware holds a private key, programmed at the factory, paired to a per-device certificate signed by our CA. The cert is tied to the device serial number. When the device records a session, it signs the session payload with that key before storing it in on-device flash.

The phone reads the session from the device over BLE, including the signature. The phone has no way to forge the signature — the device's private key never leaves the device.

**The phone uploads the session unmodified, with its own user-auth token.** The cloud verifies two things:

1. The signature on the session against our CA. This answers Q1 — yes, this was recorded by a real device.
2. That the device serial number embedded in the session matches a device that is currently bonded to this user's account. This answers Q2 — yes, this device belongs to this user.

The user-auth token from the phone answers Q3 — yes, the human logged in is the account owner.

If any of those three checks fail, the event is rejected and logged for review.

## Why we didn't put the device on AWS IoT Core

We evaluated AWS IoT Core earlier this year. The model AWS IoT Core wants is: the device authenticates directly to the IoT broker via TLS with a device certificate, and publishes MQTT messages to its own topic. That model is excellent — for devices that have direct internet access.

A device with only BLE radio cannot speak MQTT to AWS IoT Core. It would have to speak MQTT *to the phone*, which would relay to AWS IoT Core. At which point the phone is doing all the work, and the IoT broker is just an HTTP server with a flaky transport. We modeled the integration cost and the benefit isn't there for our specific topology.

What we did do, and what I'd recommend for any phone-as-gateway architecture today: build the cloud-side ingestion as if it were an IoT broker. Append-only event log, idempotency keys per-device-per-monotonic-counter, per-device signing keys, server-side dedup. The shape is right even if the wire protocol isn't MQTT. If we ever migrate to a real IoT broker — or build a v2 product with WiFi on the device — the cloud-side won't need to change.

## The lost-phone problem

Bonded BLE assumes the phone and device are persistent. They're not. A user buys a new phone every two years. We had to design a flow for "transfer this device's bond from old phone to new phone" that doesn't require shipping the device back to the manufacturer.

The flow we've shipped:

1. User logs into the app on the new phone.
2. The app shows them their registered devices.
3. The user picks "re-pair this device" and presses a button on the brush.
4. The brush, on physical-button confirmation, deletes the old LTK and accepts a new bond.
5. The phone signals the cloud that this device is now bonded to this phone.
6. The cloud records the bond change, invalidates the old phone's authorization to upload events for this device, and logs the event for security review.

The physical-button-press step is load-bearing. Without it, a thief who'd somehow gotten the user's account credentials could remotely re-pair the device to their own phone and start uploading garbage events. With it, the attacker would also need physical possession of the brush. The button press is a low-tech, high-trust signal that no software-side attack can spoof.

## What I want to carry forward

Three principles from this auth design I plan to hold to going forward:

1. **Sign on the device, verify in the cloud, never trust the gateway.** Whatever sits between the device and the cloud — phone, hub, edge gateway — is hostile by default.
2. **Bind authorization to physical pairing events.** Re-pair requires a button press on the device. Bonds are not changeable from software alone.
3. **Build the ingestion API as if it were an IoT broker, even if it isn't.** Append-only, idempotent, per-device attested. The shape pays off if you ever migrate to a real IoT broker later.

The [next post in the series](/blog/ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone/) will be the OTA story. Pushing firmware through the same trust path we use for telemetry is where this design will get stress-tested.
