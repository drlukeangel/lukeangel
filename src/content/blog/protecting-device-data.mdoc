---
title: "Protecting device data, at rest and in motion"
date: 2025-09-30T11:00:00-04:00
category: tools
tags:
  - iot
  - security
  - data
  - encryption
  - privacy
notebook: iot-security
notebookOrder: 5
excerpt: "The device is connected, proven, and scoped — now it's sending data. Protecting it means two kinds of encryption (in motion and at rest) and an honest look at which fields are harmless, which are PII, and which you shouldn't keep readable at all."
pullquote: "Encryption at rest and in motion is the floor, not the ceiling. The real question is which data you keep readable at all — and for anything tied to a person, the answer is as little as you can get away with."
cover: "../../assets/blog/protecting-device-data-cover.svg"
coverAlt: "Data leaving a device through an encrypted channel (in motion) into an encrypted store (at rest) — locked at both ends."
---

The device is connected, proven, and [scoped to its job](/blog/authenticated-isnt-authorized/). Now it's doing the thing it exists to do: sending data. A connected product is, underneath, a data pipeline with a radio on one end — and that data has to be protected on two axes people constantly collapse into one: **in motion** (crossing the wire) and **at rest** (sitting in storage). And before either, the question most teams skip: *which of this data actually needs protecting, and how much?*

## In motion: no plaintext hop, ever

The [handshake](/blog/pki-behind-a-device-cert/) already gave us an encrypted channel from device to cloud. The discipline is keeping it encrypted on *every* hop after that one: broker → stream processing → storage → the API that serves it back.

TLS everywhere, and actively *deny* the absence of it. On AWS, an S3 bucket policy that denies requests where `aws:SecureTransport` is `false` means a non-TLS request is rejected outright — not allowed-with-a-warning, rejected. Take the same posture at every hop. There is no "it's the internal network, it's fine" exception; the hop you didn't encrypt is the one in the breach writeup.

## At rest: encrypted, with keys you rotate

Storage encrypted with managed keys — AWS KMS, a per-table or per-bucket customer-managed key (CMK) with rotation enabled. Azure Key Vault and GCP KMS are the equivalents.

The point of a CMK over the provider's default key is control: you rotate on your schedule, you can audit every decrypt call (CloudTrail logs them), and you can revoke. Encryption at rest with a key you can't see being used or rotate is half a control.

![Data is encrypted in motion and at rest: across the pipeline — device, broker, stream processing, store — every hop is TLS-encrypted (in motion), and the store is encrypted with a managed key you control and rotate (at rest).](../../assets/blog/encryption-in-motion-at-rest.svg)

## Not all data is equal — classify it

You can't protect everything to the same degree without wrecking either cost or utility. So classify it, then treat each tier on its merits:

- **Direct identifiers** (an operator's email, a serial tied to a person) → **hash** with a rotating salt. You can still match records; you can't read the value.
- **Quasi-identifiers** (operator ID, a name) → **tokenize** to a stable random string, namespaced per data domain so a token from one table can't be joined against another.
- **Sensitive attributes** (GPS, biometrics) → **generalize**. GPS snapped to a 1 km grid is useful for "where do failures cluster" and useless for following a specific person home.
- **Behavioral data** (battery level, torque readings, usage minutes) → **keep as-is**. It's the product, and it isn't about a person.

The rubric is what turns "we encrypt everything" — true, and not enough — into "we don't even *store* the readable version of the things that could hurt someone."

![Classify data, then treat each tier: direct identifiers (email, serial) become a salted hash; quasi-identifiers (operator id, name) are tokenized and namespaced; sensitive attributes (GPS, biometric) are generalized to a coarse grid; behavioral data (battery, torque, usage) is kept as-is because it's the product, not a person.](../../assets/blog/data-classification-rubric.svg)

## Residency and protection are two different problems

People conflate these constantly. **Residency** is *where the byte physically lives* — a region, a sovereign cloud — and it's an architecture decision. **Protection** is *who can read it* — an IAM and encryption decision. A dataset can be perfectly resident (never leaves the EU) and badly protected (any engineer can read it in the clear), or the reverse. Solve them separately. We conflated them in an early version and had to spend a quarter untangling it.

## Catch what slipped

Classification is a human process, and humans miss fields. Run a scanner over the raw store as a backstop — AWS Macie flags columns that look like PII but weren't classified as such. It's the smoke detector for "someone logged an email address into a behavioral table."

## What I'd tell a team

- **TLS on every hop, and deny the absence of it.** No plaintext, no exceptions.
- **Encrypt at rest with a rotated CMK** you control and can audit.
- **Classify** — direct / quasi / sensitive / behavioral — and treat each tier: hash, tokenize, generalize, keep.
- **Separate residency from protection.** Different problems, different fixes.
- **Run a scanner as a backstop.** Classification will miss things.

Encryption at rest and in motion is the floor, not the ceiling. The harder, more honest question is which data you keep readable *at all* — and for anything tied to a person, the answer is as little as you can get away with. The owner of the device never agreed to be the product.

## What's next

The data's protected and the fleet is running. The next question is how you *notice* when something's wrong — a device behaving in a way it shouldn't. Detection, and the machine learning that flags the anomaly, is the next post.
