---
title: "Building a connected hardware product — month one"
date: 2023-11-29T14:42:00-05:00
category: tools
tags:
  - iot
  - hardware
  - aws
  - mqtt
  - product
notebook: connected-products
notebookOrder: 4
excerpt: "Notes from the first month leading a connected-product team for the second time. What changed from v1 (2017-2019) to v2, what didn't, and the three decisions that mattered more than the rest."
pullquote: "The hardware decision is a five-year contract with your past self. On v1 I argued for two more bytes and lost. This time the room is mine."
cover: "../../assets/blog/building-first-connected-product-cover.svg"
coverAlt: "Cover graphic — Building a connected hardware product, first month, second time around. November 2023."
---

I'm leading the engineering team building a connected hardware product. We're a month in. This is my second time around — 2017 to 2019 I led the API platform side of a BLE-connected consumer-health portfolio (the [v1 series](/notebooks/building-medical-iot-connected-products/) is the full story). This time the device has WiFi and I own the hardware and the firmware too. Different stack, different scale, mostly the same mental model.

Notes from the first month, in case it helps the next person — or the next-me, four years from now.

## What I underestimated

**One.** The hardware decision is a five-year contract with your past self. The microcontroller we picked in week three sets a ceiling on what we can do in firmware in year four. There is no `npm install` for "different chip." The same is not true for a SaaS feature, where you can refactor underneath the UI for a year and nobody knows.

On v1 I argued for two more bytes in a device-ID byte format. I lost the argument. I then built workarounds in the API for 18 months. This time the room is mine — *I'm* the one picking the chip, the BOM, and the radio. The five-year contract with my future self is one I'm signing in my own handwriting. That's more nerve-wracking than I expected.

**Two.** The cloud bill scales with the *device count*, not the user count. I learned this previously and had to re-explain it to the team here in a budget meeting that did not go great. With IoT, every device you ship is a persistent customer of the cloud whether the user opens the app or not. We're used to "if a feature gets popular, infra grows." With IoT, "if hardware ships, infra grows" — and hardware ships even when nobody opens the app for a week.

**Three.** Provisioning is its own product. On v1 this was almost trivial — the device had only BLE, the user paired in the app, done. On v2 the device has WiFi, which means putting a device on Wi-Fi for the first time, getting a certificate onto it, getting that certificate registered with the IoT broker, and having all of that survive the user being out of cell range — that flow is its own project. We are still on the first draft.

## What we got right (informed by v1)

Two things we did almost reflexively that I'd recommend in writing now:

We picked **a managed IoT broker + MQTT** for the cloud side and didn't try to roll our own. On v1 we'd rolled our own — home-grown REST — because the BLE-only device topology didn't fit a device-direct-MQTT broker. Here, the device has WiFi. The managed broker fits. There is still a *strong* temptation, when you have engineers who've built distributed systems, to "just run a few Mosquitto containers" anyway. Don't. The certificate-management story alone is a six-week project we didn't have to take on. MQTT-over-TLS into the broker, one cert per device, a routing rule into a serverless function. Boring. Works.

We **scoped the v1 to telemetry one-way**, no cloud-to-device commands. Same call I made on the first connected product — telemetry up first, commands down later. Same reasoning: telemetry up is one problem; commands down is a *different* problem (idempotency, retries, acknowledgment, queueing) and combining the two in v1 is how teams ship six months late. We'll add commands in a later release.

## What I'm worried about for v2

Three things on the watch list:

- **OTA firmware updates.** We're going to need this. We don't have it yet. I [shipped OTA on the first connected product](/blog/ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone/) and I know what it costs to ship without it — every minor firmware bug becomes a customer-support escalation, every sensor-calibration issue an RMA. We're deferring out of capacity, not naïveté, which is worse in some ways. The cost is going to come due in 12-18 months.
- **Per-device certificates at fleet scale.** A cert per device is fine when there are five devices on a desk. Previously we got this right by accident — the hardware team baked the cert into the firmware at factory provisioning and we never rotated. We won't get away with that here; this market has cert-rotation expectations. I'm reading about Just-in-Time Provisioning and Multi-Account Registration this weekend.
- **What we do when the cloud has an outage.** Our device is useless without the cloud right now. On v1 the device worked offline — the device ran, the user used it, the session got recorded to flash, synced later. Here the cart can't accept payment offline. That's an architecture choice we made and didn't think hard enough about. Whether to push compute to the device or accept the dependency is a real product question, not a tech question.

## The framing that's helped most

Two sentences I keep repeating to the team — both lifted directly from v1:

> **The device is the customer.** Every wire-format change is a backward-compatibility problem. Every cert rotation is a fleet operation. Every firmware version is something we have to support for the life of the unit, which is probably longer than my tenure.

> **Treat ship date as the start of operations, not the end.** When you ship a SaaS feature, you turn it on. When you ship hardware, you start a relationship that goes for years and that you can never quite finish.

The team isn't always thrilled when I say either of those, but it changes which arguments we even have, which is the only point of a framing.

More from the field next month.
