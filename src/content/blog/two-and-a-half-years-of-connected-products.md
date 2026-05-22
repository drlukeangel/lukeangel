---
title: "Two and a half years of connected products — what I'd do differently"
date: 2025-11-18T13:15:00-05:00
category: craft
tags:
  - iot
  - hardware
  - leadership
  - retrospective
  - reflection
excerpt: "From November 2023 to November 2025 — the timeline, the things I got right, the things I'd undo, and the one decision I'd make twice as fast next time."
pullquote: "The hardware decision in week three set a ceiling on what we could do in year three. I still think it was the right ceiling."
cover: "../../assets/blog/iot-2-5-year-retrospective-cover.svg"
coverAlt: "Cover graphic — Two and a half years of connected products, what I'd do differently. November 2025."
---

Two years ago, almost to the week, I [wrote down what I underestimated](/blog/building-first-connected-product/) about leading my first connected-product team. Ten thousand devices in the field later, this is the long-form follow-up.

I'm going to be honest about what went right, what went wrong, and what I'd undo if I started over. The post is for the next leader running this play.

## The timeline, by quarter

**Q4 2023 — picked the chip, picked the cloud, picked the protocol.** ESP32-C3 because it had the best price/feature ratio for what we needed. AWS IoT Core because we were already a Bedrock-adjacent shop and didn't want a second cloud vendor. MQTT-over-TLS because that's what works.

**Q1 2024 — shipped the first hundred devices to internal testers.** Found out our provisioning flow assumed Wi-Fi credentials would be entered by an end-user, not a factory worker. Rewrote it twice in three weeks.

**Q2 2024 — first 1,000 devices in the field with paying customers.** Two near-incidents (one cert misconfiguration, one IoT Rule SQL bug that lost six hours of data) that made us [build observability we should have had on day one](/blog/iot-observability-in-cloudwatch/).

**Q3 – Q4 2024 — scale to 5,000 devices.** Hardware Rev B (small board respin to fix a sensor that had ESD issues in cold environments). Started the cert-rotation work that took most of Q4. The [device-identity post](/blog/field-grade-device-identity-at-fleet-scale/) came out of this.

**Q1 – Q2 2025 — scale to 10,000.** Shipped [OTA firmware updates](/blog/ota-firmware-without-bricking-the-fleet/), the feature that should have been v1.

**Q3 – Q4 2025 — operational maturity.** Reduced engineering-team-on-call burden by 40% through better observability and dashboard hygiene. Open-sourced [the starter kit](/blog/open-sourcing-the-connected-products-starter-kit/) that captures the lessons.

## What I got right

**Picking the secure element in v1, even though it cost BOM.**
We added an ATECC608A on the original board, knowing it was $2 of BOM we wouldn't recover. Two years in, this is the decision I'd defend hardest. Every cert-rotation, every revocation, every regulated-customer conversation became *tractable* because the cryptographic identity was real. The teams I've talked to that deferred this regretted it within a year.

**Scoping v1 to telemetry one-way, no commands.**
We told customers "v1 is read-only — we'll add controls in v2." It hurt the first roadmap presentation. It saved us six months of complexity in idempotency, retries, queueing, and acknowledgments. We added commands in Q3 2024; we shipped on time because we weren't fighting v1's complexity at the same time.

**Building observability before scaling.**
After the two near-incidents in Q2 2024, we paused feature work for three weeks and built the dashboards. That three-week pause is the thing my engineering manager and I agreed cost us a quarter of "perceived velocity" but bought us a year of "actual ability to ship."

## What I'd undo

**Not building OTA in v1.**
We deferred OTA to v2 because the complexity scared us. We then shipped 5,000 devices that we couldn't update remotely, which meant every minor firmware bug was a customer-support escalation and every device with a sensor calibration issue had to be RMA'd to fix.

If I started over: OTA + signing + A/B slots in v1, even if it pushed launch by six weeks. The cost of *not* having OTA at 5,000 devices was substantially more than six weeks of v1 delay.

**Treating the dashboard as engineering-only.**
The dashboard we built for the engineering team turned out to be the dashboard customer-support also needed. We rebuilt it from scratch nine months later with the support team's actual workflow in mind. I'd build that one first next time, and the engineering-only views as a separate tool.

**Picking a single cell-carrier MVNO for our cellular variant without a contingency.**
We picked one carrier for our cellular devices. When their service had a regional outage in Q2 2025, 300 devices in three US states went offline for 14 hours. Customers were not pleased. We've since dual-SIM'd new cellular devices with a fallback carrier; this should have been the v1 design.

## What I got wrong that turned out fine anyway

**Choosing ESP32-C3 instead of a more capable chip.**
We deliberately picked the lower-end ESP32 variant on the theory that we wouldn't need more headroom. Two years in, we're approximately at the chip's headroom. If we'd picked one tier up, we'd have more room for the edge-ML features we're now talking about for 2026. Net assessment: we made the right call for the *first* product, and now we get to make a new call for the next one. Not a mistake, just a constraint.

**Not investing in factory provisioning automation early.**
The first hundred devices were provisioned by an engineer with a USB cable. That worked. The first thousand were provisioned by an automated rig we built in two weeks. By 5,000, we had a manufacturing partner doing it, and they had to redo our rig. Inefficient — but defensible at each scale point.

## The one decision I'd make twice as fast next time

Building the **wireless-decision rubric** as a written artifact and forcing the team to use it.

When we picked BLE + LoRa dual-radio for our second product line in Q3 2024, the architecture conversation that previously took three meetings took twenty minutes. The rubric was written; we walked through five questions; the answers picked the design. The first product took 11 weeks to land that decision. The second took an afternoon.

The rubric is in the [open-sourced kit](/blog/open-sourcing-the-connected-products-starter-kit/) now. If I could go back and hand it to my Q4 2023 self, I'd save the team about eight weeks of architecture-review meetings. That's the post-mortem lesson with the highest leverage.

## What I'm watching for the next two years

Three things I expect to learn:

- **Edge ML on small chips.** Running a tiny model on the ESP32-S3 (its bigger cousin with vector instructions) for anomaly detection on sensor data. Will the inference quality be good enough to act on without a cloud round-trip? I genuinely don't know yet.
- **The fleet-management abstraction layer.** AWS IoT FleetWise is the obvious next step once we cross a certain device count. The transition is non-trivial; teams I've talked to who did it earlier are happier than teams that waited.
- **Operator-facing ML features.** "Tell me which tools in my fleet are about to fail" is the killer app for connected hardware data. We're building the first version; the post-mortem on this one will be six months from now.

## The bigger framing

Connected hardware products are *operations products that happen to have software on top.* The teams that succeed are the ones that internalize that early. The teams that struggle are the ones that try to ship a connected product the way they'd ship a SaaS product — quarterly releases, fast pivots, "let's iterate."

You can iterate the cloud side. You can sort of iterate the firmware side. You cannot iterate the hardware. You cannot iterate the certificate. You cannot iterate "the thing in someone's hand that's been there for two years."

The discipline that comes with that — the slower-on-purpose decisions, the boring rubrics, the staged rollouts, the inflexible signing process — is what makes connected products *be* products instead of *be* science projects.

I have a list. The list works. The kit is open-sourced. The next leader doesn't have to invent it.

Two and a half years in. Onto the next two.
