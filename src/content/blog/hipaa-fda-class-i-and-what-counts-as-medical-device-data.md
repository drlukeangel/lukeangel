---
title: HIPAA, FDA Class I, and what counts as medical-device data
date: 2018-01-22
category: tools
tags:
  - hipaa
  - medical-device
  - fda
  - data-privacy
  - api-platform
excerpt: "Before the API platform can matter, we have to know what kind of regulated product we're building — and which categories of data trigger which regimes."
pullquote: >-
  A brushing session by itself is not protected health information. A brushing
  session tagged with a name, a date of birth, and a dentist's email is. The
  architecture has to keep the difference clean.
cover: ../../assets/blog/hipaa-fda-class-i-medical-device-data-cover.jpg
coverAlt: "Cover graphic — HIPAA data privacy and security, what counts as medical-device data, and FDA Class I low-risk device classification, illustrated as three connected stations."
notebook: building-medical-iot-connected-products
notebookOrder: 2
faq: []
featured: false
draft: false
---
I'm four months into the platform job. A couple of weeks ago I sat down with the privacy office for a meeting that ran four hours. We went through a printout of every field in the device-event payload, line by line. Is a brushing duration HIPAA-protected? Is a brush-head-replacement timestamp? Is the device serial number? The answers — and the framework I'm building underneath the API platform to make them durable — are the foundation of everything to come.

## The two regulatory regimes that matter

The connected toothbrushes are **FDA Class I medical devices**. Class I is the lowest-risk tier — general controls only, no premarket approval. But "general controls" still means:

- The device has to do what the labeling claims.
- Manufacturing has to follow Good Manufacturing Practice (21 CFR 820 — the Quality System Regulation).
- Adverse events have to be reported under MDR rules.
- The device has to be registered and listed.

None of that is the API platform's problem directly. But the **moment the device records data that could be used to make clinical or therapeutic claims**, you cross into territory where the FDA cares about the software too. We have to keep the line bright between "consumer wellness feature" and "clinical claim."

The other regime: **HIPAA**. HIPAA applies when there's "protected health information" (PHI) — health-related data tied to an identifiable person, held by a covered entity or its business associate.

The company, in the consumer-direct context, is *not* a HIPAA covered entity for the device data flowing through our platform. But the moment we partner with a dental practice that integrates our data into their patient records — and we are pursuing those partnerships — the company becomes a business associate. The API platform has to be architected so that HIPAA-relevant data flows can be activated for those partners without leaking into the consumer-direct flows.

## What we store

Per session, the device emits:

- Session start timestamp (local + UTC offset)
- Duration brushed
- Pressure events (when the user presses too hard, the brush vibrates to back off)
- Coverage estimate (which quadrants are brushed for how long, derived from the device's motion sensors)
- Brush head ID at the time of session
- Battery level at session start
- Firmware version

Per device:

- Device serial number (the manufacturing identifier, baked into the firmware)
- Bluetooth address (the over-the-air identifier)
- Hardware revision

Per user (in the app):

- Email
- Name
- Date of birth (optional, used for the kids' brush's age-appropriate brushing programs)
- Dentist (optional, for the dentist-portal feature)
- Linked device serials

## The classification we landed on

The privacy office and I settled on a three-tier classification:

**Tier 1 — non-PHI device telemetry.**
Anything tied only to a device serial number, with no user identity attached server-side. Brushing duration, pressure events, brush-head ID. Treated as ordinary product analytics. Stored in our event store, available to the data warehouse, no special handling.

**Tier 2 — pseudonymous user-linked telemetry.**
The same telemetry, joined to a stable user ID that is *not* derived from email or any directly identifying field. This tier can be analyzed at the cohort level — "users who replace brush heads on schedule have 12% lower pressure events" — but can't be linked back to an individual without the lookup table.

**Tier 3 — PHI / fully identifiable.**
User identity (email, name, DOB) joined to brushing data. Stored separately in a database with stricter access controls, audit logging, and encryption-at-rest with a separate KMS key. Access requires two-person authorization. This tier is the one HIPAA can touch.

## Architectural consequences

This classification drives three decisions in the API platform.

**First, separate storage paths.** Device events land in the Tier 1 store as a default. A Tier 1 record is promoted to Tier 2 or Tier 3 only by a join service, and only with a logged reason. Promotion is never automatic.

**Second, no PHI in device-event payloads.** The phone app can attach a user ID to the event before posting it. The device itself never knows the user's identity. This means if the device firmware ever leaks data via an unauthorized BLE characteristic read, the leak is at most Tier 1 — device telemetry, no PHI. A small thing that I expect will turn into a very useful property when we run security audits.

**Third, the dentist portal gets its own subsystem.** The dentist-portal feature (in design now) will live behind a separate authentication and audit boundary from the consumer app. A dental practice that signs a BAA with the company will be able to access pseudonymous data for their consented patients through that subsystem — but the consumer-app API will never expose those joins.

## Encryption — at rest and in transit

We use TLS 1.2 end-to-end. The device-to-phone leg is BLE-encrypted by the LTK from bonding. The phone-to-cloud leg is TLS over WiFi/LTE. Inside the cloud, all storage is encrypted at rest with KMS. Tier 3 data uses a separate KMS key with stricter IAM policies.

For HIPAA-business-associate use specifically: we keep Tier 3 data under a separate AWS account from the rest of the platform, with cross-account IAM roles for the few services that need access. AWS account boundaries are the strongest isolation primitive available, and they should pay off as the dentist-partnership product line spins up.

## Retention

Consumer data is retained for the life of the account. Tier 1 device telemetry is retained for 18 months and then aggregated into monthly summaries. PHI is retained per BAA terms — typically seven years per HIPAA's requirements for clinical data, and deleted on patient request via a published process.

## Why this matters for the rest of the platform

Everything I'll write in the next post about [consolidating eight device APIs into one entity domain model](/blog/from-eight-device-apis-to-one-entity-domain-model/) presumes the data classification is settled. You can't build a clean domain model without knowing which entities can be joined, which have to stay separated, and which trigger compliance overhead. The privacy office meeting ran four hours and produced a 12-page memo. I expect to pull that memo out for years.
