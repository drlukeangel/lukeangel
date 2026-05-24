---
title: "Open-sourcing the Connected Products Starter Kit"
date: 2025-10-22T09:30:00-04:00
category: tools
tags:
  - iot
  - aws
  - aws-iot-core
  - rust
  - typescript
  - open-source
  - hardware
notebook: connected-products
notebookOrder: 8
excerpt: "Two years of private notes, runbooks, and reference code from leading connected-product teams. Cleaned up, scoped down, and pushed to a repo. The starter kit I wish someone had handed me on day one."
pullquote: "The first 30 days of a connected-product team are mostly the same six pitfalls. Open-source what doesn't need to be re-discovered."
cover: "../../assets/blog/open-sourcing-connected-products-kit-cover.svg"
coverAlt: "Cover graphic — Open-sourcing the Connected Products Starter Kit. October 2025."
featured: true
---

I started a private sandbox in late 2023, two months into running a connected-product engineering team for the second time around. (My first was 2017-2019 — a BLE-connected consumer-health platform, covered in the [v1 series](/notebooks/building-medical-iot-connected-products/).) The sandbox started as one Python script that pretended to be a sensor. By mid-2024 it had grown into a full reference stack — device firmware, CDK infrastructure, a tiny dashboard — that I'd hand to new engineers on day one with a "read this before we have the architecture conversation." Most of the patterns in it carried forward from v1; the implementations are all v2-era.

This week I cleaned it up and pushed it public.

→ **[github.com/drlukeangel/Connected-Products-Starter-Kit-Product-Management](https://github.com/drlukeangel/Connected-Products-Starter-Kit-Product-Management)**

![The Connected Products Starter Kit reference dashboard showing live tool telemetry — 20V MAX drills, drivers, and impact wrenches reporting battery, torque, usage minutes, and fault codes per job site, read from DynamoDB through the HTTP API the CDK stack provisions.](../../assets/blog/Connected-Products-Telemetry-Dashboard-Starter-Kit.png)

## What's in the box

A reference IoT stack that runs end to end:

| Path | What it is |
| --- | --- |
| `docs/rubric.md` | The five-question wireless decision rubric |
| `docs/ARCHITECTURE.md` | The reference architecture + the trade-offs behind it |
| `device/python/` | Pure-Python MQTT simulator — quick start, no hardware required |
| `device/rust/` | ESP32-C3 firmware — production-shaped, ready to flash |
| `cloud/cdk/` | TypeScript CDK stack: AWS IoT Core + topic rule + Lambda + DynamoDB + HTTP API |
| `cloud/lambda/` | TypeScript ingest + query Lambdas, shared Zod schema |
| `dashboard/` | Minimal Vite + TS reference dashboard |

Stack is intentionally boring: `typescript (CDK + lambda + dashboard)` · `python (device simulator)` · `rust (embedded)` · `aws iot core / lambda / dynamodb`.

## Who this is for

Different audiences read different files. From the README:

- **Engineering managers** — fork the whole repo as a starting template for a new connected-product squad. The CDK stack, Lambda, and device code are *reference shape* you'll evolve, not artifacts you'll keep verbatim.
- **Product managers** — read `docs/rubric.md` and stop there. The rubric is the conversation; the rest is implementation detail.
- **Architects** — read `docs/ARCHITECTURE.md`, push back on the trade-offs, fork the CDK stack as the basis for the team's real infrastructure.
- **Firmware engineers** — lift `device/rust/` as a known-good MQTT + TLS starting point on ESP32-C3, then replace the synthetic sensors with the real ones.
- **Cloud engineers** — `cloud/cdk/` is the smallest production-shaped IoT-Core-to-DDB stack I know how to write.

## Why this exists

Every PM and engineering manager I've worked with on connected hardware has run the same first 30 days: they Google "AWS IoT Core tutorial," follow a six-screen wizard, end up with a single device publishing MQTT with a hardcoded cert, and have no idea how to scale it to 10,000 units.

The kit collapses those 30 days into a Wednesday afternoon. You clone it, you deploy one CDK stack, you choose either the Python simulator or the Rust firmware, you watch data show up in the dashboard. Then you read the rubric and the architecture doc — which is where the real product-management work lives, and which is the part of the kit that's the same whether you're building a connected drill, a connected coffee machine, or a connected anything.

## The decision rubric

The single most-stolen artifact from this kit is going to be the five-question wireless rubric. I'll restate it here because it's the part that doesn't require running any code:

1. **How far is the device from the nearest gateway, phone, or router?** Range is the wireless decision; everything else is a tax on it.
2. **How often does it phone home, and how big is each message?** Frequency × payload = power draw × bandwidth need.
3. **What's the BOM-cost budget per device?** The radio choice locks the rest of the BOM.
4. **What's the power budget?** Wall-powered, battery-replaceable, or energy-harvest — three different design constraints.
5. **What's the security model the buyer demands?** Consumer, commercial, or industrial — three different secure-element tiers.

Five questions, one table per question, the wireless choice usually picks itself by question two. Full version with worked examples in `docs/rubric.md`.

## What the kit deliberately doesn't do

Worth being explicit about scope:

- **No multi-tenant fleet management.** Single-tenant fleet at moderate scale. Graduate to AWS IoT FleetWise when you need vehicle / equipment fleet management at real scale.
- **No OTA firmware updates.** The OTA story deserves its own kit; I wrote about [the playbook we eventually landed on](/blog/ota-firmware-without-bricking-the-fleet/) earlier this year. AWS IoT Jobs is the obvious next step.
- **No certificate rotation.** The starter provisions a single device cert. Rotation at fleet scale is a separate problem; I [wrote about it last November](/blog/field-grade-device-identity-at-fleet-scale/).
- **No data engineering / analytics layer.** Pair this with a PII masking pipeline when telemetry contains operator PII (it usually does). I'll write that up separately when that kit is ready.

## When you outgrow it

Listed honestly in the README. Short version:

- **AWS IoT FleetWise** — vehicle and equipment fleet management with edge-side filtering. Use when you have ≥ 1k devices and per-device data volumes that make raw forwarding expensive.
- **AWS IoT Greengrass v2** — push compute to the device. Use when latency, bandwidth, or air-gap requirements rule out cloud-only.
- **AWS IoT SiteWise** — industrial telemetry with built-in asset models. Use when devices map to physical assets with hierarchy.
- **AWS IoT Device Defender** — fleet security audits + behavioral anomaly detection. Plug it in once you have more than a handful of devices.

This kit is the smallest useful thing. Graduate when it stops fitting.

## What's next

I have a paired data-engineering kit (PII masking for tool-telemetry pipelines) that's been a private working draft for nine months. That's likely to be next quarter once I've had a chance to harden it. The two go together — one ingests the data, the other masks it before it goes anywhere downstream.

If you fork this and ship a connected product on the back of it, [tell me how it went](/contact/). I'm collecting feedback to fold into the next revision.

For now: clone, deploy, run the simulator, ship something connected. The kit isn't sophisticated. The discipline is.
