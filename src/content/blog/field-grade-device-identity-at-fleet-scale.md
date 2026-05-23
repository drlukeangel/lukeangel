---
title: "Field-grade device identity at fleet scale"
date: 2024-11-12T12:24:00-05:00
category: tools
tags:
  - iot
  - aws
  - security
  - hardware
  - certificates
notebook: iot-security
notebookOrder: 1
excerpt: "Per-device certs are easy when there are ten devices on a desk. At ten thousand, the cert-rotation problem becomes a fleet-operations problem. Notes from designing for it."
pullquote: "If you can't revoke a single device in under a minute, you don't have device identity. You have hope."
cover: "../../assets/blog/field-grade-device-identity-cover.svg"
coverAlt: "Cover graphic — Field-grade device identity at fleet scale. November 2024."
---

We crossed five thousand devices in the field last month. Cert-rotation, which had been a quarterly problem, became a Tuesday-morning problem. This is what I'd tell the next team about designing the device-identity layer.

## The four problems device identity has to solve

Worth being explicit about what we're actually solving, because the conversation gets confused fast.

1. **Authentication.** When a device shows up at our cloud endpoint claiming to be `device-abc-123`, how do we *know* it's the device, not someone with a stolen credential?
2. **Provisioning.** How does a brand-new device, fresh off the assembly line, get its first credential without a human typing anything?
3. **Rotation.** When a credential needs to change — because the cert is expiring, because the device was sold, because we suspect compromise — how does that happen without bricking the device?
4. **Revocation.** When a single device is compromised, how do we kick it off the network within minutes, not days?

All four are answered the same way in toy demos: "use AWS IoT Core's per-device certs." All four are different problems at fleet scale.

## Authentication: mTLS with the cert in a secure element

The starting point is mutual TLS with a per-device X.509 cert. AWS IoT Core supports this out of the box. The interesting question is *where the private key lives on the device.*

Three options, increasing in cost and trust:

- **Key in flash.** Cheapest. Easiest. Anyone with the board and a logic analyzer can extract the key in about an hour. Fine for non-regulated consumer products. Not fine for anything else.
- **Key in a hardware secure element.** ATECC608A, NXP SE05x, Microchip's CryptoAuthentication family. Adds $1.50 – $4 to BOM. The key never leaves the chip; you can sign things with it but you can't read it out. This is what we picked.
- **Key in a full TPM.** $5 – $15 of BOM, way more capability, mostly used in industrial / regulated products. Overkill for our use case; right call for medical or critical-infrastructure.

The single biggest design decision: **the secure element is a BOM line item that has to be specced in v1**. Adding it in v2 means a new board revision, a new firmware build, and a forked fleet. We added it in v1; teams I've talked to who deferred it regretted the decision before they hit a thousand devices.

## Provisioning: Just-In-Time Registration

The dumb version of provisioning: pre-bake a cert into every device at the factory, manually upload that cert into IoT Core ahead of time. This breaks at any kind of scale — you're maintaining a database of "devices we made vs devices we've registered" and they go out of sync.

AWS IoT's better answer is **Just-In-Time Registration (JITR)** or its newer cousin **Just-In-Time Provisioning (JITP)**. The shape: provision a *bootstrap* cert per device at the factory, signed by *your* CA, which IoT Core trusts. The first time the device connects, IoT Core sees the unfamiliar cert, validates the CA, runs a Lambda you wrote, and the Lambda decides whether to register the device. If yes, the device gets its real per-device cert and policy; if no, it's rejected.

This is the right pattern. Three things to know:

- **The bootstrap cert is shared at the manufacturing line, not per-device-unique.** You provision the CA cert; the device cert is generated on-device at first boot and signed by the bootstrap chain.
- **The first-connect Lambda is where you put your business logic.** "Has this device been sold yet? Is it on the recall list? Does the firmware version match what we expect?" Anything you'd want to check before letting a device into the fleet.
- **You need to think about the firmware-side state machine** — what does the device do if its first attempt at provisioning fails? Retry? Wait? Phone home over a fallback channel? You will hit this and you'd rather hit it on a workbench than in the field.

## Rotation: the part no one prepares for

Certificates expire. The IoT-Core-issued ones default to 30 years, which is meant to make the rotation problem go away. It does not, because:

- The CA cert (yours or AWS's) rotates. When it does, every device needs to trust the new one.
- A device gets resold. The cert tied to the previous owner needs to be revoked and a new one issued, ideally without the buyer needing to do anything.
- A device gets reflashed. The new firmware version is signed differently; the cert chain needs to follow.

We're an early-enough fleet that we haven't *forced* a rotation yet. We've designed for it: the firmware supports two trust anchors (current + next) for any given role, and the device-side code knows how to receive a new cert over a secured channel (IoT Jobs) and switch to it on next boot.

What I've learned reading other teams' postmortems: **the worst-case is a partial rotation**. Half the fleet gets the new cert, half doesn't, and the half that doesn't is offline for a week because the rotation script crashed. The mitigation is staged rollouts (10% canary, then 50%, then everything) and explicit human confirmation gates between stages.

## Revocation: the test of whether you actually have identity

Here's the question I ask any team claiming to have device-identity figured out: *if I tell you a specific device has been compromised, how long until it can no longer connect?*

If the answer is "a couple of days, we have to update the deny list," they don't have device identity. They have hope.

The right answer is **minutes**, and the mechanism is one of:

- A short-lived cert + frequent rotation, so revocation is "stop signing new certs for that device." Operationally heavy.
- A revocation list (CRL or OCSP-style) that IoT Core checks at connect time. AWS IoT Core supports updating device policies in real time, which is the closest thing to fast revocation in the AWS-managed flow — flip the policy to deny:* for the affected device, and within the next connection attempt (often immediate) the device can't talk.

We use the second. Our incident-response runbook has a one-button "revoke device" tool that flips the policy in IoT Core; the device-side state machine handles "got disconnected, can't reconnect, light the LED and stop publishing" appropriately.

## Where Device Defender fits

AWS IoT Device Defender is the managed service for *detecting* the situations where you'd want to revoke. It runs behavioral analytics on the fleet — "this device suddenly started publishing to topics it never has before" — and integrates with Security Hub for alerting. We turned it on six months ago; it has caught one real issue (a misconfigured firmware build that was talking to debug topics in production) and a handful of false positives that taught us how to tune it.

It's the cheapest piece of fleet security tooling AWS offers. If you have devices in the field and you haven't turned it on, do that this week.

## The bigger framing

A connected product without a story for cert rotation and revocation isn't a connected product. It's a brick farm waiting to happen.

The decision that's mattered most: **picking the secure element in v1, even though it cost us BOM**. Every other identity decision is recoverable in software. The secure element is the one decision you can't fix without a board respin.

If you're starting a connected product today, spec the secure element in v1. Pick JITR for provisioning. Design the firmware for two-trust-anchor rotation. Test revocation end-to-end before you ship the first hundred devices. The whole thing is six weeks of work in v1 and twelve months of regret in v2.

Six months from now I'll have actually run a fleet-wide rotation. I'll write a follow-up.
