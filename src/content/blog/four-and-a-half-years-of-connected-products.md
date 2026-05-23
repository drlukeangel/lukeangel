---
title: "4.5 years of connected products — what I'd do again"
date: 2025-11-18T13:15:00-05:00
category: craft
tags:
  - iot
  - hardware
  - leadership
  - retrospective
  - reflection
notebook: connected-products
notebookOrder: 9
excerpt: "Across two connected hardware products and 4.5 years of active build — a BLE-connected consumer-health platform 2017-2019, a payment-and-identity cart 2023-2025."
pullquote: "I had the v1 OTA post on my desk when I scoped v2. I knew exactly what it cost on v1 to ship without OTA. I deferred it anyway. The mistake wasn't ignoring the lesson — it was assuming the cost curve was the same."
cover: "../../assets/blog/iot-2-5-year-retrospective-cover.svg"
coverAlt: "Cover graphic — Four and a half years of connected products, what I'd do differently. November 2025."
---

Two years ago, almost to the week, I [wrote down what I was underestimating](/blog/building-first-connected-product/) about leading my second connected-product engineering team. (My first was 2017-2019 — a BLE-connected consumer-health platform, covered in the [v1 series](/notebooks/building-medical-iot-connected-products/).) Ten thousand cart devices in the field later, this is the long-form follow-up across both eras.

What compounded from v1 to v2, what I still got wrong the second time around, and what v2 had to figure out from scratch because v1 didn't prepare me for it.

## The arc, across two devices

**v1 — BLE-connected consumer-health platform, 2017–2019.** Two years leading the API platform behind a BLE-connected toothbrush portfolio. About a million units shipped. Phone-as-gateway architecture (no WiFi on the device), home-grown REST instead of a managed IoT broker (those were still emerging at the time), HIPAA / FDA Class I compliance, three-tier PII classification, OTA over BLE through the phone. The [v1 series](/notebooks/building-medical-iot-connected-products/) is the full story.

**v2 — The cart, 2023–2025.** Two and a half years leading both hardware and platform on a wheeled scanner-and-payment workstation. Ten thousand units in supermarkets. WiFi-primary + LTE-M backup, MQTT-over-TLS to a managed IoT broker, PCI-DSS / GDPR / EMV compliance, the same three-tier PII model (it worked on v1, it still works), OTA over WiFi directly to the device (no phone in the loop this time).

Net: four years of active build, plus six months of PRD work on v2 at the front, plus a four-year gap in between. The patterns that survived the gap are the ones in the [open-sourced starter kit](/blog/open-sourcing-the-connected-products-starter-kit/) now.

## v2's timeline, by quarter

**Q3 2023 — wrote the PRD.** The [three-part PRD](/blog/prd-part-1-hardware-specs/) for v2 was the first thing the team did. Every section had a v1 lesson sitting behind it: the entity model, the three-tier PII classification, the phone-as-gateway debate (this time, no — the device has its own radio), the OTA architecture (this time, signed firmware direct to device, no phone relay).

**Q4 2023 — picked the chip, picked the cloud, picked the protocol.** ESP32-C3 because it had the best price/feature ratio. A managed IoT broker because we didn't want to roll our own again. MQTT-over-TLS because that's what works. (On v1 we'd done home-grown REST. The reason was the BLE-only topology; that constraint is gone here.)

**Q1 2024 — shipped the first hundred devices to internal testers.** Found out our provisioning flow assumed Wi-Fi credentials would be entered by an end-user, not a factory worker. Rewrote it twice in three weeks.

**Q2 2024 — first 1,000 devices in the field with paying customers.** Two near-incidents (one cert misconfiguration, one IoT-rule SQL bug that lost six hours of data) that made us [build observability we should have had on day one](/blog/iot-observability-in-cloudwatch/). Both were new failure modes — v1's BLE-only architecture didn't have either.

**Q3 – Q4 2024 — scale to 5,000 devices.** Hardware Rev B (board respin to fix EMC issues in the refrigerated aisles — a problem v1 never had, because consumer-health devices don't live in front of supermarket compressors). Started the cert-rotation work that took most of Q4. The [device-identity post](/blog/field-grade-device-identity-at-fleet-scale/) came out of this.

**Q1 – Q2 2025 — scale to 10,000.** Shipped [OTA firmware updates](/blog/ota-firmware-without-bricking-the-fleet/). It's the feature I knew from v1 we'd regret deferring, and I deferred it anyway. More below.

**Q3 – Q4 2025 — operational maturity.** Reduced engineering-team-on-call burden by 40% through better observability and dashboard hygiene. Open-sourced [the starter kit](/blog/open-sourcing-the-connected-products-starter-kit/) that captures lessons from both v1 and v2.

## v1 lessons that compounded in v2

**The three-tier PII classification.**
The model I built with the privacy office on v1 in early 2018 — Tier 1 non-PII telemetry, Tier 2 pseudonymous user-linked, Tier 3 directly identifying — ported directly to the cart. The regulatory regime is different (PCI-DSS + GDPR, not HIPAA + FDA Class I) but the data architecture is identical. I dropped that section into the v2 PRD by editing the v1 memo. Saved roughly two weeks of analysis.

**The entity domain model.**
Account / Device / Session / Event was the spine of the v1 platform. On v2 I kept Consumable (which existed on v1 for the brush-head case) and added Store + Cart + Scan + Item + Payment for the retail context. Same shape, more entities. The v2 model in [PRD Part 2](/blog/prd-part-2-application-and-data/) is essentially the v1 model with retail-specific entities added.

**Sign on the device, verify in the cloud, never trust the gateway.**
On v1 the gateway was the user's phone. On v2 the gateway is the in-store WiFi network. Same principle: device cert in a secure element, every event signed, cloud verifies. v2's gateway is more reliable than v1's; that didn't change the architecture — it just made the failure modes less frequent.

**Bond authorization to physical events.**
On v1 a re-pair required a button press on the device. On v2 a cart re-bind to a different store requires physical access to the cart's service port. Same principle: software alone can't change a trust relationship.

**The bootloader is load-bearing. Boot-counter failsafe always.**
[The OTA post](/blog/ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone/) from v1 and [the OTA post](/blog/ota-firmware-without-bricking-the-fleet/) from v2 describe the same bootloader pattern. Different chip family, different signing infrastructure, same structure.

## What I still got wrong, the second time around

**Deferring OTA out of v2's v1.**
I had the v1 OTA post on my desk when I scoped v2. I knew exactly what it cost on v1 to ship without OTA. I deferred it anyway in Q4 2023 because the team capacity wasn't there and OTA didn't seem like it would matter until we were past 5,000 devices.

Then a board-level sensor calibration bug shipped in Q3 2024, we hit 5,000 devices in Q4 2024, and every device with the bug needed an RMA. We finally shipped OTA in Q1 2025. The cost of those RMAs alone funded the OTA project several times over.

The mistake wasn't ignoring the v1 lesson — I understood it. The mistake was assuming the cost curve looked the same as v1. On v1, shipping OTA was hard (BLE through a phone, ~18 engineer-months of work). On v2, OTA was easy (WiFi direct to device with a managed jobs orchestrator, ~4 engineer-months). Because v2's version was easier, I undervalued shipping it early. **Backwards: if the implementation is easy, ship it sooner.**

**Treating the dashboard as engineering-only.**
On v1 a partner-facing portal showed me what a customer-facing dashboard looks like. I built v2's first dashboard for engineers anyway. Customer-support rebuilt it from scratch nine months later. I'd build that one first next time.

**Picking a single cell-carrier MVNO for our cellular variant.**
This one had no v1 lesson — v1 was BLE-only, no cellular. We picked one carrier; their service had a regional outage in Q2 2025; 300 devices went offline for 14 hours. We've since dual-SIM'd new cellular devices. v1 didn't prepare me for this because the situation didn't exist there. v2 paid the new-domain tax.

## What v2 had to figure out from scratch

Things v1 didn't prepare me for because they didn't exist on v1:

**EMC compliance in retail physical environments.**
Refrigerator compressors throw off a lot of 2.4 GHz noise. We learned that the hard way in Q3 2024. Hardware Rev B fixed it with antenna placement. Consumer-health devices don't live in front of compressors — there's no v1 lesson here.

**PCI-DSS scope minimization.**
On v1 we handled HIPAA + FDA. Neither covers payment data. v2 had to learn PCI-DSS scope from scratch — EMV-certified NFC reader, isolated payment account, tokenization at the hardware boundary. The principle (minimize scope) carried from v1's HIPAA work; the specifics were new.

**Multi-tenant retail at scale.**
On v1 every customer had one device. On v2 every supermarket chain has thousands of devices spread across hundreds of stores. The store-staff tablet, the per-store fleet ops, the per-store SLA — none of that existed on v1.

**Loss prevention as a feature.**
v1's biggest fraud risk was someone faking usage data for marketing analytics. v2's biggest fraud risk is someone walking out of a supermarket with un-scanned groceries. Totally different problem.

## The one decision I'd make twice as fast next time

Building the **wireless-decision rubric** as a written artifact and forcing the team to use it.

When we picked BLE + LoRa dual-radio for our second product line in Q3 2024, the architecture conversation that previously took three meetings took twenty minutes. The rubric was written; we walked through five questions; the answers picked the design. The first product took 11 weeks to land that decision. The second took an afternoon.

The rubric is in the [open-sourced kit](/blog/open-sourcing-the-connected-products-starter-kit/) now. If I could go back and hand it to my Q4 2023 self, I'd save the team about eight weeks of architecture-review meetings. That's the post-mortem lesson with the highest leverage.

## What I'm watching for the next two years

Three things I expect to learn:

- **Edge ML on small chips.** Running a tiny model on a more capable chip variant (vector instructions, more RAM) for anomaly detection on sensor data. Will the inference quality be good enough to act on without a cloud round-trip? I genuinely don't know yet.
- **The fleet-management abstraction layer.** A purpose-built fleet manager is the obvious next step once we cross a certain device count. The transition is non-trivial; teams I've talked to who did it earlier are happier than teams that waited.
- **Operator-facing ML features.** "Tell me which devices in the fleet are about to fail" is the killer app for connected hardware data. We're building the first version; the post-mortem on this one will be six months from now.

## The bigger framing

Across two devices and four-plus years of active build, the constant is this: **connected hardware products are operations products that happen to have software on top.** The teams that succeed are the ones that internalize that early. The teams that struggle are the ones that try to ship a connected product the way they'd ship a SaaS product — quarterly releases, fast pivots, "let's iterate."

You can iterate the cloud side. You can sort of iterate the firmware side. You cannot iterate the hardware. You cannot iterate the certificate. You cannot iterate "the thing in someone's hand that's been there for two years."

The discipline that comes with that — the slower-on-purpose decisions, the boring rubrics, the staged rollouts, the inflexible signing process — is what makes connected products *be* products instead of *be* science projects.

I have a list now. The list survived a four-year gap between projects. The list got better the second time through. The kit is open-sourced. The next leader doesn't have to invent it.

Four and a half years in. Onto whatever comes next.
