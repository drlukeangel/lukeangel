---
title: "OTA firmware updates without bricking the fleet"
date: 2025-05-21T11:33:00-04:00
category: tools
tags:
  - iot
  - firmware
  - aws
  - ota
  - hardware
excerpt: "We finally rolled OTA to production last quarter. Eighteen months of planning, two months of execution, three near-misses. The pieces that actually mattered, written down."
pullquote: "Bricking a device in the field is a quarter you don't get back."
cover: "../../assets/blog/ota-firmware-without-bricking-cover.svg"
coverAlt: "Cover graphic — OTA firmware updates without bricking the fleet. May 2025."
---

We rolled OTA firmware updates to production last quarter. It took eighteen months of *planning,* two months of *execution,* and produced three near-misses that I'll be writing into our runbook for a long time. This is the post I wish I'd had when we started.

## The four pieces, in dependency order

OTA is not one feature. It's four, in a fixed dependency order. Skip one and the rest are pretending.

**1. A/B firmware slots on the device.**
The device has two firmware regions — A and B — and a tiny bootloader that picks which to run. New firmware goes into the *inactive* slot, the bootloader is told to try the new slot next boot, and the new firmware has to "phone home, mark itself good" within N minutes or the bootloader rolls back automatically.

There is no version of OTA that works without this. We tried — we considered an in-place update with backup-to-flash-and-restore. It fails the first time a device loses power mid-update. A/B is the cost of doing this responsibly.

**2. Signed images.**
Every firmware image is signed with a private key we hold; the device firmware has the public key compiled in (and ideally in a secure element). Before flashing the inactive slot, the device verifies the signature. Unsigned or wrong-signed image → reject, no flash.

This is the difference between OTA-as-feature and OTA-as-attack-vector. There's a reason the regulated-product folks make this Step One. We made it Step Two; in hindsight it should've been simultaneous with the A/B work.

**3. Staged rollouts.**
Never ship a firmware update to the whole fleet at once. Stages:

- **Canary** — 10 internal devices. Always-on monitoring. 24 hours.
- **Early** — 1% of the fleet, selected to span hardware revisions, geographies, and use patterns. 72 hours.
- **General** — 10%, then 25%, then 100% in steps. Each step has a "halt rollout" condition tied to fleet metrics.

The halt-rollout condition is the part most teams skip. Ours is hard-coded: if the **per-firmware-version error rate** in the new version exceeds 1.5× the baseline of the old version over a 30-minute window during rollout, the next stage is held automatically and a human has to release it.

**4. Observable rollback.**
When a device rolls back, the *cloud* needs to know it happened. Otherwise you have a quiet failure — the device reverts to old firmware, looks fine, and the rollout dashboard says "shipped" while reality says "rolled back."

We have a metric (`firmware_rollback_count`, dimension: target version) that goes up every time a device boots into the old slot after a failed update attempt. The rollout dashboard shows both "% on new version" and "% that rolled back from new version." The second number being non-zero is *always* a humans-look-now signal.

## What we use to orchestrate it

AWS IoT Jobs for the orchestration. Each rollout is a Job; each device is a Job target. Jobs handles the queueing, the per-device acknowledgments, the failed-device handling. Greengrass v2 is the alternative if you have devices doing edge compute; we don't, so Jobs alone is enough.

Two things to know about Jobs:

- **The Job document is what the device interprets.** Keep it as boring as possible: target version, signed-image URL (S3 presigned), expected SHA256. Everything else is firmware logic.
- **The Job execution status flow is asymmetric.** A device reports `IN_PROGRESS` → `SUCCEEDED` (or `FAILED`). The "rolled back after success-reported" case isn't in the protocol. That's why the rollback metric (#4 above) is a separate channel from Jobs status. You need both.

## The three near-misses

### 1. The clock-skew rollback storm

A subset of devices in one geography had their clocks drift by ~12 hours. The firmware's signature verification was using a server-validated timestamp range and rejected the new image as "not yet valid." Devices rolled back, retried at next interval, rolled back again. We caught it in the canary stage but it would have been a fleet-wide problem at 100%.

**Fix:** signature validation no longer uses the local clock; it uses an explicit issued/expires range that lives in the signed metadata, validated against a server-time challenge during the actual update process, not the device's idea of time.

### 2. The "the eval set was a subset of the test set" mistake

The QA team's OTA eval set was a subset of the firmware test set. Both passed. In the canary stage, devices started crashing on a particular sensor configuration we hadn't included in either set. Three devices rebricked themselves the old-fashioned way (sensor read at boot crashed before the "mark new firmware good" code ran; A/B rollback saved them).

**Fix:** OTA eval set now includes ten representative *deployed* hardware configurations, not the lab-bench config. The lesson: your firmware test environment is not your deployed fleet. They will diverge.

### 3. The certificate-rotation deadlock

Six months into our cert-rotation effort, we shipped a firmware update that needed the new CA cert to validate the image. Some devices hadn't received the new CA yet (the cert rotation was on a separate schedule). Those devices couldn't validate the new image, rejected it, and stayed on the old firmware *which couldn't be updated until they had the new CA*. Deadlock.

**Fix:** the device firmware now carries the old AND new CA simultaneously for a 90-day overlap window during any planned rotation. We also added an explicit dependency check in our rollout planning: the OTA system refuses to start a rollout that requires a cert the fleet hasn't fully received.

## What I'd build differently if starting over

Two changes:

- **Treat OTA as a security feature first, an operations feature second.** We treated it as ops first and bolted on signing as Step Two. The right ordering is signing + A/B in v1, staged rollout in v2.
- **Build the rollback observable from day one.** We didn't have the `firmware_rollback_count` metric until we had a near-miss that taught us we needed it. It should have been part of the design before the first device shipped.

## What's next

Two improvements queued for the next quarter:

- **Delta updates** — ship the *diff* between firmware versions, not the whole image. Cuts bandwidth and update window. AWS IoT Jobs supports this; we just haven't done the firmware-side work.
- **Per-device opt-out**. Some customers want to control when their fleet updates. Currently rollouts are timezone-targeted; we want explicit opt-in tiers.

OTA is the kind of feature where the bad version of it is worse than not having it at all. Bricking a hundred devices is a quarter you don't get back. The four pieces above are the minimum to do this without inducing that quarter.

If you're in the middle of designing OTA: print the four pieces. Tape them to your firmware engineer's monitor. Go.
