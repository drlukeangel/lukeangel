---
title: "BLE vs LoRa vs cellular — the connected-product decision matrix"
date: 2024-05-08T10:12:00-04:00
category: tools
tags:
  - iot
  - wireless
  - ble
  - lora
  - cellular
  - hardware
excerpt: "Five questions, one table, one answer. The wireless choice on a connected product is usually decided by the time you finish question two."
pullquote: "If your spec says real-time and your power budget says two AA batteries for a year, the spec is wrong."
cover: "../../assets/blog/ble-lora-cellular-decision-matrix-cover.svg"
coverAlt: "Cover graphic — BLE vs LoRa vs cellular, the connected-product decision matrix. May 2024."
---

The engineering team I lead has now argued about wireless choice on three different connected-product designs. The argument always goes the same way, and ends the same way: I ask the same five questions, and the choice picks itself by question two.

I am writing the questions down so I can stop having the argument.

## The five questions, in order

### 1. How far is the device from the nearest gateway, phone, or router?

| Distance, worst case | Likely answer |
| --- | --- |
| ≤ 30 m, line-of-sight to a phone | **BLE** |
| ≤ 100 m indoor, no walls | **Wi-Fi** if the router exists; BLE mesh otherwise |
| 100 m to 10 km outdoors | **LoRa / LoRaWAN** |
| Truly anywhere | **Cellular** (LTE-M / NB-IoT for low data, 4G/5G for high) |

You don't move to the next question until this one is answered. *Range is the wireless decision*; everything else is a tax on the choice you've already made.

### 2. How often does it phone home, and how big is each message?

Frequency × payload = bandwidth need × power draw. Both go up linearly; battery life goes down exponentially.

| Cadence | Survives? |
| --- | --- |
| Once per hour, < 100 bytes | BLE, LoRa, NB-IoT all fine |
| Once per minute, < 1 KB | BLE, Wi-Fi, cellular fine; LoRa marginal |
| Once per second | Wi-Fi or cellular; LoRa is out |
| Real-time / event-driven | Wi-Fi or cellular with sticky connection |

The trap here: if your PRD says "real-time" and your power budget says "two AA batteries for a year," your PRD is wrong. Renegotiate before you pick a chip.

### 3. What's the BOM-cost budget per device?

Per-unit cost dominates everything at scale. Rough 2024 numbers:

| Component | Per-device BOM |
| --- | --- |
| ESP32-C3 module (Wi-Fi + BLE) | $1.50 – $3 |
| LoRa module (RAK, Murata) | $7 – $12 |
| Cellular LTE-M module | $12 – $25 |
| GPS module (u-blox) | $4 – $8 |
| Cellular eSIM + data plan, per year | $5 – $20 |

A $40 device with cellular + GPS spends most of its BOM on radios. A $40 device with BLE has $35 left for everything else. **The radio choice locks the rest of the BOM**, which is why you can't defer it.

### 4. What's the power budget?

Three regimes, very different design constraints:

- **Wall powered** — anything goes. Wi-Fi, cellular always-on, frequent polling — no problem.
- **Battery, replaceable, year+ lifetime** — sub-1 mA average. BLE advertising, LoRa with long intervals, NB-IoT PSM mode. Aggressive sleep states; *no Wi-Fi*.
- **Energy-harvest** (solar, kinetic) — sub-100 µA average. Backscatter protocols, beacon-only, no acknowledgments. Real engineering problem.

The power budget often forces the wireless choice retroactively. A year-on-two-AAs spec rules out Wi-Fi before any of the other constraints kick in.

### 5. What's the security model the buyer demands?

Consumer, commercial, and industrial deployments have wildly different threat models.

- **Consumer / unmanaged** — cert per device, TLS to cloud, cloud handles auth.
- **Commercial / managed network** — add device attestation (TPM, secure element), cert rotation, on-device anti-tamper.
- **Industrial / regulated** — everything above + fleet behavior monitoring, hardware secure element (ATECC608A, NXP A71CH), the ability to revoke a single device in < 60 seconds.

Tier 2 and 3 add $1.50 – $5 of BOM for the secure element. If the buyer is regulated and your BOM doesn't include this, you have a problem before you ship.

## A worked example

Pretend we're scoping a connected hand-tool.

| Question | Our answer | Implication |
| --- | --- | --- |
| 1. Range? | ≤ 30 m to operator's phone, sometimes 200 m to a job-site gateway | **BLE** + **LoRa** dual radio |
| 2. Cadence? | Telemetry every 10 minutes, event-driven on error | Both BLE and LoRa survive |
| 3. BOM? | $8 of radios on a $300 tool | Within range; LoRa pricey but acceptable |
| 4. Power? | Tool's 20V battery — wall-equivalent | All options open |
| 5. Security? | Commercial; fleet-managed by the construction company | Add secure element ($2), cert per tool, anti-tamper |

End result: BLE + LoRa dual radio, secure element, fleet management via AWS IoT Core Thing Groups. The five questions did the work.

## What about Sigfox?

Briefly: not anymore. Sigfox filed for bankruptcy in early 2022 and the remaining network has been on uncertain footing since. NB-IoT and LTE-M cover most of the same use cases with operator backing. I would not start a new product on Sigfox in 2024.

## The thing the matrix doesn't decide

The matrix decides wireless. It doesn't decide cloud, doesn't decide protocol layer (MQTT vs HTTP — almost always MQTT), doesn't decide topology (device-to-cloud vs device-to-gateway-to-cloud), and doesn't decide OTA strategy. Those are separate decisions that *follow* the wireless one.

But if you can get the wireless choice settled in twenty minutes instead of three meetings, the rest of the architecture conversation goes much faster. Tape the matrix to the wall.
