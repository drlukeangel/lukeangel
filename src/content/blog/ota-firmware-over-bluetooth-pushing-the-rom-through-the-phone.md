---
title: "OTA firmware over Bluetooth — pushing through the phone"
date: 2019-02-04T09:45:00-05:00
category: tools
tags:
  - ble
  - ota
  - firmware
  - api-platform
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 5
excerpt: "The hardest single problem on the connected platform is firmware updates. The device has no WiFi, no internet, no way to download anything on its own."
pullquote: "A brick in the field is a customer-support call, a warranty replacement, and a one-star review. We've shipped about a million units. The math on getting OTA wrong is not subtle."
---

The single hardest problem on our connected-health platform is over-the-air firmware updates. Not because firmware itself is hard — it isn't, particularly. Because the topology makes it hard:

- The device has no internet. It can't download the firmware on its own.
- The phone has internet, but only sometimes (the user's phone, not a controlled gateway).
- BLE 4.2 transfer speed is ~10 kbps practical. A 200 KB firmware image takes 3–4 minutes to transfer.
- The user might walk out of BLE range mid-transfer. The user might close the app. The user's battery might die. The device's battery might die.
- A failed update on a deployed unit is a customer-support call, a return, and a one-star review.

We've shipped about a million units with this platform. This is the OTA system we just rolled out.

## The flow

End-to-end, an OTA update goes like this:

1. **Cloud build.** Engineering builds a new firmware image. The image is signed by our firmware-signing CA. The build is uploaded to a versioned artifact store with metadata about target hardware revision.
2. **Cohort rollout.** The platform decides which devices are eligible for the update — by hardware rev, by current firmware version, by region, by canary tier.
3. **Phone notification.** The app, on its next sync with the platform, learns that the bonded device has an update available. The app downloads the firmware image from the platform over HTTPS. (It does this even if the phone isn't currently in range of the device. The phone caches the image.)
4. **Device transfer.** Next time the user opens the app and the device is in range, the app prompts the user to install the update. The user taps install. The phone transfers the image to the device chunk-by-chunk over BLE.
5. **Device verification and flash.** The device receives the image into its B-bank flash (it has two banks, A and B, for atomic swap). After the full image arrives and the SHA-256 matches the expected hash, the device verifies the signature with the on-device CA root. If verification passes, the device writes a "boot from B next time" flag and reboots.
6. **Boot-and-attest.** The device boots from the B bank. The new firmware sends a "successful boot, version X.Y.Z" message back to the phone on the next BLE connect. The phone forwards it to the cloud.
7. **Rollback if needed.** If the device fails to send the success message within a threshold of boot cycles, the device's bootloader concludes the B bank is broken and reverts to the A bank automatically.

Steps 5, 6, and 7 are the parts that prevent bricks.

## The bootloader is the load-bearing piece

The adult brush uses a Nordic nRF52-series microcontroller. We worked with the firmware team to set up a dual-bank flash layout: two equal-sized regions of flash, A and B, plus a small bootloader region that's never overwritten by an OTA. The bootloader's job:

- On boot, check the "active bank" flag.
- Verify the active bank's firmware signature against the on-chip CA root.
- If verification passes and the boot-counter is below the failsafe threshold, jump to the active bank's entry point.
- If verification fails, or if the boot-counter passes the failsafe threshold without the firmware checking in successfully, swap active banks and reboot.

The boot-counter is the safety net. A new firmware that crashes on startup, or hangs before it can send the success ack, will roll back after a few automatic reboots. The user might experience a device that's flaky for an hour, but they don't experience a permanently dead device.

We never overwrite the bootloader from an OTA. Ever. The bootloader is the only piece of firmware programmed at the factory and never replaced. If we ever have to update it, we'll do it through a service-mode operation at retail. We haven't yet, and I don't plan to.

## Chunking, retries, integrity

The image goes over BLE in chunks. The chunk size is negotiated to fit the connection's MTU after Data Length Extension (so ~240 bytes when the phone supports DLE, ~20 bytes when it doesn't). Each chunk has:

- A 4-byte index (so the device can detect missing chunks).
- A payload sized to the negotiated MTU.
- A CRC-16 over the chunk.

The device responds to each chunk with an ack. If a chunk's CRC fails, the device acks with a nack-and-retry. The phone retransmits up to three times before declaring the connection dead and abandoning the transfer for now (the partial transfer in the B bank is just invalidated; the device still boots from A).

After the full image arrives, the device computes SHA-256 over the entire B bank and compares to the expected hash sent in the manifest header. If it matches, the device verifies the signature with the on-chip CA root. Only if signature verification passes does the device flip the "boot from B" flag.

## Brick scenarios and how the system handles them

**User closes the app mid-transfer.** Phone abandons the transfer. Device sits with a partial B bank. Next time the user opens the app, the OTA flow restarts from chunk zero. No damage.

**BLE drops mid-transfer.** Same as user closing the app. Partial transfer is invalidated on next attempt.

**Phone battery dies mid-transfer.** Same.

**Device battery dies mid-transfer.** The device's RAM is lost. On next charge and boot, the B bank still has whatever it had before the partial write — which might be invalid. The device boots from A (which is unchanged), notices B is in a partial state, and just discards B. On next OTA attempt, B gets rewritten from scratch.

**Signature verification fails after transfer.** The device discards B. Logs an event the phone can forward to the cloud for investigation.

**B-bank firmware boots but hangs.** The boot-counter reaches the failsafe threshold. Bootloader swaps back to A. Device is back to the previous firmware. Reports a failed-update event on next connect.

**B-bank firmware boots but has a bug we didn't catch.** Same as the previous case — we engineered the device firmware to check in within the first 30 seconds of boot. If it doesn't check in (because it crashed, hung, or otherwise misbehaved), the failsafe rolls back.

## The near-disaster

We had one major scare last month. We shipped an OTA to about 2% of the fleet as a canary. The firmware booted fine on the test devices in lab. It booted fine on the canary devices initially. But it had a subtle interaction with a specific hardware revision: a sensor calibration step that read uninitialized flash, which on the affected hardware rev contained values that crashed the firmware about three days after boot.

We caught it because the platform's OTA metrics dashboard tracked "% of cohort still online 72 hours post-update." That number started dropping for the canary cohort on day 3. We held the broader rollout, identified the affected hardware rev, and shipped a corrected firmware to the canary cohort. The bootloader rolled back the 2% that had already crashed.

The dashboard that caught this — "% still online N hours post-update, faceted by hardware rev" — is the most valuable single piece of operational tooling we've built. It's the kind of thing that's obvious in retrospect and not at all obvious before you've had a scare.

## The phone-as-gateway penalty

Everything in this design is harder than it would be on a device with direct internet. AWS IoT Core has a "Jobs" feature (out of beta last year) that handles OTA orchestration for you, with retries, cohorts, monitoring, the works. If our device could speak directly to AWS IoT Core, we'd use it.

We can't, so we built our own. About 18 engineer-months total, spread across firmware, mobile, and platform teams. The result is a system that has pushed firmware to about a million units with low-double-digit bricks (most of which weren't actually our fault — they were clinical-trial-pilot environments where the BLE radio was getting jammed by adjacent equipment).

## What I want to carry forward

Three principles from this OTA design:

1. **The bootloader is the load-bearing piece. Never update it from an OTA.** Factory program it, and treat it as the fallback that gets you out of any other firmware bug.
2. **Boot-counter failsafe. Always.** New firmware has N boot cycles to prove it works. If it doesn't, roll back automatically. No phone-app intervention, no user action.
3. **Operational dashboards must measure post-update fleet health, not just transfer success.** A transfer that completes successfully and bricks the device three days later is a worse failure than a transfer that never started.

The [next post in the series](/blog/where-hardware-specs-meet-api-contracts/) will be the cross-functional product post — how the API team, the firmware team, and the hardware team negotiate specs for features like the brush-head identification protocol. The OTA system is the most extreme example of why that negotiation matters.
