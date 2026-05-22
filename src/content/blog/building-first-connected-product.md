---
title: "Building our first connected hardware product"
date: 2023-11-29T14:42:00-05:00
category: tools
tags:
  - iot
  - hardware
  - aws
  - mqtt
  - product
excerpt: "Notes from the first month leading a team building a connected hardware product. What nobody warned us about — and the three decisions that mattered more than the rest."
pullquote: "The hardware decision is a five-year contract with your past self."
cover: "../../assets/blog/building-first-connected-product-cover.svg"
coverAlt: "Cover graphic — Building our first connected product. What nobody warned us about. Field notes from November 2023."
---

I'm leading the engineering team building our company's first connected hardware product. We're a month in. I've shipped software for years and managed engineers for longer; I've never had a *thing with a battery* downstream of a decision I make. The mental model is different.

Notes from the first month, in case it helps the next person.

## What I underestimated

**One.** The hardware decision is a five-year contract with your past self. The microcontroller we picked in week three sets a ceiling on what we can do in firmware in year four. There is no `npm install` for "different chip." The same is not true for a SaaS feature, where you can refactor underneath the UI for a year and nobody knows.

**Two.** The cloud bill scales with the *device count*, not the user count. We're used to "if a feature gets popular, infra grows." With IoT, every device you ship is a persistent customer of the cloud whether the user opens the app or not. We had to learn this in a budget meeting that did not go great.

**Three.** Provisioning is its own product. Putting a device on Wi-Fi for the first time, getting a certificate onto it, getting that certificate registered in AWS IoT Core, and having all of that survive the user being out of cell range — that flow is its own project. We are still on the first draft.

## What we got right (by accident)

Two things we did almost reflexively that I'd recommend in writing now:

We picked **AWS IoT Core + MQTT** for the cloud side and didn't try to roll our own broker. There is a *strong* temptation, when you have engineers who've built distributed systems, to "just run a few Mosquitto containers." Don't. The certificate-management story alone is a six-week project we didn't have to take on. MQTT-over-TLS into IoT Core, one cert per device, an IoT rule routing into Lambda. Boring. Works.

We **scoped the v1 to telemetry one-way**, no cloud-to-device commands. We have a long list of features that want to push instructions down to the device — schedule changes, OTA, calibration tweaks — and we deferred all of them. Telemetry up is one problem; commands down is a *different* problem (idempotency, retries, acknowledgment, queueing) and combining the two in v1 is how teams ship six months late. We'll add commands in v2.

## What I'm worried about for v2

Three things on the watch list:

- **OTA firmware updates.** We're going to need this. We don't have it. Every connected-product team I've talked to says the OTA story is what gets them — bricking a hundred devices in the field is a quarter you don't get back. AWS IoT Jobs handles the orchestration but doesn't solve the rollback question.
- **Per-device certificates at fleet scale.** A cert per device is fine when there are five devices on a desk. At ten thousand, we need a provisioning template and a story for cert rotation. I'm reading about Just-in-Time Provisioning and Multi-Account Registration this weekend.
- **What we do when AWS has an outage.** Our device is useless without the cloud right now. That's an architecture choice we made and didn't think hard enough about. Whether to push compute to the device (Greengrass) or accept the dependency is a real product question, not a tech question.

## The framing that's helped most

Two sentences I keep repeating to the team:

> **The device is the customer.** Every wire-format change is a backward-compatibility problem. Every cert rotation is a fleet operation. Every firmware version is something we have to support for the life of the unit, which is probably longer than my tenure.

> **Treat ship date as the start of operations, not the end.** When you ship a SaaS feature, you turn it on. When you ship hardware, you start a relationship that goes for years and that you can never quite finish.

The team isn't always thrilled when I say either of those, but it changes which arguments we even have, which is the only point of a framing.

More from the field next month.
