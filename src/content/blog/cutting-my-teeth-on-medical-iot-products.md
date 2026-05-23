---
title: "Two years on medical IoT — the platform retrospective"
date: 2019-09-23T15:00:00-04:00
category: craft
tags:
  - retrospective
  - leadership
  - api-platform
  - connected-products
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 7
excerpt: "September 2017 to September 2019 — timeline of building the API platform behind a connected-health portfolio, things I got right, things I got wrong."
pullquote: "The connected health portfolio was where I learned that 'API team' and 'IoT team' are two names for the same job. The hardware ships once. The platform supports it forever."
---

I spent two years leading the API platform behind a connected-health portfolio at Philips Connected Health — September 2017 to September 2019. It was my first time owning the platform layer of a connected hardware product. The cumulative lesson, in retrospect, was that the boundary between "platform engineering" and "IoT engineering" is mostly fictional.

This is the long-form retrospective on what I learned.

## The timeline, by quarter

**Q4 2017 — diagnosed the state of the portfolio.** Eight separate device APIs in production, five with their own user model. Made the case for consolidation to platform and product leadership.

**Q1 2018 — privacy classification.** Four-hour meeting with the privacy office that produced the three-tier data model. Wrote [the HIPAA and FDA Class I memo](/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data/). This memo set the architecture for everything that came after.

**Q2 2018 — entity domain model.** Six-week design exercise across all product lines. Landed on five entities: Account, Device, Consumable, Session, Event. Started the migration of the adult brush line to the new platform.

**Q3 2018 — auth model.** Designed and shipped the [phone-as-gateway auth scheme](/blog/phone-as-gateway-auth-model/) — per-device signing keys, BLE bonding for trust, OAuth for human-cloud. This was the foundation of everything operational.

**Q4 2018 — adult line on the new platform.** First major device line migrated. 14 weeks of strangler-fig work, dual-write reconciliation, then cut over reads.

**Q1 2019 — OTA system goes live.** Shipped the [over-the-air firmware update pipeline](/blog/ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone/). Had the near-disaster with the canary cohort that taught us to monitor post-update fleet health, not just transfer success.

**Q2 2019 — kids' brush and interdental on the platform.** Two more device lines migrated, faster than the first because we'd learned. Started the dentist-portal feature, which would have been impossible on the old fragmented architecture.

**Q3 2019 — operational maturity.** The [cross-functional weekly platform sync](/blog/where-hardware-specs-meet-api-contracts/) had been running for a year. Cadence mismatches were no longer a chronic source of pain. Started planning my exit.

About a million devices on the new platform by the time I left. A version of this architecture is still running today.

## What I got right

**Consolidating the entity domain model first.**
The hardest decision was committing to 13 months of platform work before any new-feature work shipped. I had to make that case to product leadership three times before it stuck. It paid for itself within a year. The compounding payoff was a feature like the dentist portal becoming a one-week query against a clean model instead of a six-month integration against eight disparate APIs. The teams that succeed on platform investments are the ones that take the unsexy bet early. I took it early.

**Forcing the OTA system to be production-grade before scaling.**
We could have shipped OTA at half-quality and patched it later. It was tempting in Q4 2018 when the rollout was being planned. The discipline of building the bootloader-failsafe, the boot-counter rollback, the post-update fleet-health dashboard — all of that paid off in the canary near-disaster in Q1 2019. We caught a brick-causing firmware bug because the system was monitoring the right things. The version of this story where we'd shipped without those guardrails is the version where we brick 20,000 devices.

**Bonding trust to physical events.**
The decision to require a physical button-press on the device to re-pair was unpopular with the customer-experience team (who wanted seamless transfers). It's the decision that meant no security audit ever turned up a remote-rebond attack surface. Worth the friction.

**Treating the phone as a flaky gateway, not a trusted client.**
Sign on device, verify on cloud. Don't trust the phone for anything load-bearing. This principle is the spine of the [auth model](/blog/phone-as-gateway-auth-model/) and it's the one I've kept using on every connected-product platform since.

## What I'd undo

**Letting hardware design the brush-head identification protocol without API input.**
The byte format the chip used for head IDs was decided by the hardware team in mid-2017, before I started. By the time the platform was modeling the Consumable entity in Q2 2018, we discovered the byte format had a few decisions that made cloud-side analytics harder than they had to be — no embedded version number in the head ID, no manufacturer field, no lot tracking. We worked around it. But if I'd been in those early hardware-spec meetings, we'd have asked for two more bytes and saved two engineer-months of workarounds. **In any future connected-product role: be in the hardware spec meeting from week one.**

**Treating each device line as a separate platform for longer than needed.**
I let the secondary device line migration drift into Q2 2019 instead of pulling it forward to Q1. The justification at the time was that the user base was smaller and the platform work could "wait." In practice, the longer it waited, the more divergent the device-line customizations became, and the more painful the migration was when we did get to it. **Migrate the smaller systems first when they're cheap, before they accumulate their own weight.**

**Not building telemetry for OTA failure modes early enough.**
The post-update fleet-health dashboard that caught the canary near-disaster was built in Q4 2018, right before the first major rollout. If I'd built it in Q2 2018 instead, we'd have had three more months of baseline data. Wouldn't have changed the outcome of the near-disaster — but the principle that telemetry-before-the-event-you-need-to-detect is the only kind that works applies generally, and I underweighted it.

## What I got wrong that turned out fine

**Picking Postgres over DynamoDB.**
For a connected-product platform with a million devices and ~3 sessions per device per day, the conventional wisdom in 2018 was that DynamoDB was the right answer. We picked Postgres on AWS RDS, partly because the team's expertise was deeper there and partly because the entity domain model was inherently relational (Account-Device-Session-Consumable). It worked great. Years later [I'd default to DynamoDB for the telemetry layer](/blog/dynamodb-for-time-series-iot/) — but Postgres on RDS scaled fine for our shape of workload at our scale.

**Home-grown REST instead of AWS IoT Core.**
At the time we evaluated, AWS IoT Core's model — device-direct MQTT to the broker — didn't fit our phone-as-gateway topology. Home-grown REST with idempotency keys, per-device signing, and append-only ingestion was the right call for 2018. By 2023, [when I went back to connected products with a different team](/blog/building-first-connected-product/), the device had WiFi and IoT Core was the obvious choice. Different era, different architecture. The home-grown REST stack served us faithfully for the era it was built in.

## The bigger framing

This two-year arc was where I learned three things that shape how I think about connected products now:

1. **An API platform and an IoT platform are the same thing under two different brand names.** If you build the API platform right — versioned contracts, append-only events, per-device attestation — you have an IoT platform. The "IoT" branding is mostly about the transport layer and the marketing.

2. **The hardware constraint is the product constraint.** A consumer device with no WiFi is not a device with a missing feature. It's a different product with a different platform architecture. The teams that succeed are the ones that internalize the constraint as a design input, not as a temporary limitation.

3. **The platform compounds. The hardware doesn't.** Every connected hardware product you ship gets a fresh PCB, a fresh BOM, a fresh manufacturing line. The platform stays. If you invest in the platform, every future product gets cheaper. If you don't, every future product gets more expensive.

## What this set up for me

Four years later, [I came back to connected products from a different angle](/blog/building-first-connected-product/) — running my own engineering team, owning the hardware *and* the platform, in an era where AWS IoT Core was the default and BLE wasn't the only radio option. The [v2 of the playbook is in the Connected Products series](/notebooks/connected-products/). It's the same arc — entity domain model, OTA, fleet identity, operational telemetry — but with a newer toolchain and a wider scope. The [4.5-year retrospective](/blog/four-and-a-half-years-of-connected-products/) closes the loop on what compounded across both eras.

The medical-IoT years were v1. Cutting my teeth, literally.

If you're starting on the platform side of a connected hardware product today, my one piece of advice is this: build the architecture that survives the third device line, not the one that ships the first. The work compounds.
