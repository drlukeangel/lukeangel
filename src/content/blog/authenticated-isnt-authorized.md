---
title: "Authenticated isn't authorized"
date: 2025-09-09T11:00:00-04:00
category: tools
tags:
  - iot
  - security
  - authorization
  - iam
  - least-privilege
notebook: iot-security
notebookOrder: 4
excerpt: "The device proved who it is and the channel is up — but identity isn't permission. Authorization is the layer that decides what a verified device is actually allowed to do, and it's where most post-identity breaches really happen."
pullquote: "A device that proved who it is and can still touch everything isn't secure. It's one stolen cert away from being the whole problem."
cover: "../../assets/blog/authenticated-isnt-authorized-cover.svg"
coverAlt: "A verified device facing a set of permissions — one unlocked and allowed, the rest locked. Authenticated is not authorized."
---

The device proved who it is and the [channel is up](/blog/pki-behind-a-device-cert/). Here's the trap teams walk into next: they treat that proof as a hall pass. It isn't.

**Authentication is "I know who you are." Authorization is "here is the one thing you're allowed to do."** Two different layers — and the second is where most breaches that get *past* identity actually happen. A stolen-but-valid credential doesn't fail the handshake. What stops it is everything it's *not* allowed to do once it's in.

![Authentication and authorization are two different questions: authentication asks "who are you?" and is answered by the device's verified identity; authorization asks "what may you do?" and is answered by a small set of permitted actions with everything else denied. Passing the first says nothing about the second.](../../assets/blog/auth-vs-authz.svg)

## Default deny

The starting posture is deny everything, then open the smallest holes the device needs to do its job.

A telemetry sensor publishes its readings and receives its commands. That is the entire list. It has no business publishing to another device's topic, subscribing to the firmware bucket, or calling an admin API — and if your policy *lets* it, you're carrying a latent breach whether or not anyone's found it yet. Least privilege isn't a hardening step you do later; it's the default the device ships with.

## Per-device policies, scoped by identity

The mistake I see most: one shared policy across the whole fleet, with a wildcard topic like `telemetry/*`. It onboards fast and it means a single stolen cert can read or write *every* device's data. Don't.

The right shape: device `abc-123` may publish `telemetry/abc-123` and subscribe to `commands/abc-123` — and nothing else.

- **AWS:** IoT Core policies with **policy variables** — `${iot:Connection.Thing.ThingName}` — so one policy *template* scopes itself per-device automatically at connect time. No wildcards, no per-device policy sprawl, and the policy is attached to the cert at provisioning so identity and permission arrive together.
- **Azure:** IoT Hub scopes messaging to the device's own identity; **GCP:** you enforce it yourself on the broker, since the managed IoT Core is gone.

The principle is the same everywhere: a device's permissions are derived from *its own* identity, never from a shared grant.

![One device's policy, scoped to itself: device abc-123 is allowed to publish its own telemetry and subscribe to its own commands, and denied everything else — wildcard topics, the firmware bucket, any admin API. Scoped by its own identity, with no wildcards and no shared policy.](../../assets/blog/per-device-policy-scoping.svg)

## Authorize *what* it sends, not just *where*

Scoping topics is half of it. The other half is the shape of the payload. The ingest rule should select the specific fields you expect, with type coercion — not `SELECT *`. A device publishing junk — whether it's buggy or compromised — gets dropped at the rule layer before it ever reaches a Lambda or a table. Authorization includes "this doesn't even look like what this device is supposed to say." *How* you drop it — silently at the rule, or with a `400` the device has to reckon with — is its own architecture call worth making on purpose: [three patterns for validating at ingestion →](/blog/validating-iot-data-at-ingestion-three-patterns/).

## Least privilege is for the cloud, too

The device isn't the only actor that needs scoping. The ingest function writes to *one* table. The query function reads *one* index. The IAM is tight enough that a reviewer reads it in five minutes and finds nothing surprising. Authorization is a property of every actor in the system — the device, the function, the human with console access — not a thing you do to devices alone.

## It fails by misconfiguration, not attack

Here's the uncomfortable part. The authorization layer gets breached by *mistakes* far more often than by clever attacks. A wildcard someone added "temporarily." An IAM role with a `*` because it was faster on a Friday. A shared policy that made a demo easier. The exploit is usually nothing more than someone finding the door you left open.

That's why authorization has to be *audited continuously*, not reviewed once and forgotten. AWS IoT Device Defender Audit flags overly-permissive policies, wildcard topics, and shared credentials automatically; it costs almost nothing. Turn it on, and treat a new wildcard the way you'd treat a failing test.

## What I'd tell a team

- **Default deny.** Open the smallest holes the job requires.
- **Per-device policies via policy variables** — never a wildcard, never a shared fleet policy.
- **Validate the payload shape at the rule layer**, not just the topic.
- **Least-privilege IAM on every cloud actor** — a reviewer should read it in five minutes.
- **Audit continuously.** The breach is almost always a misconfiguration, not an exploit.

Authentication is the bouncer checking your ID at the door. Authorization is the rule that even a verified guest only gets into certain rooms — and that every other room is locked by default. Getting identity right and then handing a device the keys to everything isn't security. It's a single stolen cert away from being the whole story.

## What's next

The device is connected, proven, and scoped to exactly its job. Now there's the data it's actually allowed to send — and protecting that, both at rest and in motion, is the next post.
