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
notebook: connected-products
notebookOrder: 6
excerpt: "Five questions, one table, one answer. The wireless choice on a connected product is usually decided by the time you finish question two."
pullquote: "If your spec says real-time and your power budget says two AA batteries for a year, the spec is wrong."
cover: "../../assets/blog/ble-lora-cellular-decision-matrix-cover.svg"
coverAlt: "A single connected device at the center of three growing reach rings — a tight ring to a nearby phone (BLE), a wider ring to a field gateway (LoRa), and a far dashed ring to a cellular tower (anywhere) — the radio choice is the reach you need."
---

The engineering team I lead has now argued about wireless choice on three different connected-product designs. The argument always goes the same way, and ends the same way: I ask the same five questions, and the choice picks itself by question two.

I am writing the questions down so I can stop having the argument.

(The rubric started as a one-pager I sketched on my first connected product back in 2018 — the [v1 series](/notebooks/building-medical-iot-connected-products/) — where the answer was always BLE because the device had no WiFi antenna. That constraint forced the choice and we never had to argue about it. Without the constraint, the argument expands to fill the room. Hence the rubric.)

The reason the argument is winnable at all is that the four radios don't actually compete across the whole space — they each own a corner of it. Plot reach against how long the device can run on a battery and you get a frontier: nothing buys you more range without spending more power. BLE lives in the short-range, sips-power corner; cellular lives in the go-anywhere, drinks-power corner; LoRa threads the needle on range *if* you accept a trickle of data; and Wi-Fi is the odd one out — middling range and the worst battery story of the lot, which is why it only shows up where there's a wall socket.

![Reach plotted against battery life. BLE 5.x sits top-left — about 10 m, but a coin cell lasts a year or more. LoRa reaches up to 10 km at a low data rate, still a year-plus on battery. NB-IoT and LTE-M go anywhere with power-save mode. 4G/5G also go anywhere but are power-hungry and high-data. Wi-Fi sits low and to the left — only about 50 m and effectively wall-power only. A dashed frontier curve runs through BLE, LoRa, and the cellular radios: reach is paid for in power, and Wi-Fi sits well below the frontier.](../../assets/blog/ble-lora-cellular-tradeoff-space.svg)

## The five questions, in order

### 1. How far is the device from the nearest gateway, phone, or router?

| Distance, worst case | Likely answer |
| --- | --- |
| ≤ 30 m, line-of-sight to a phone | **BLE** |
| ≤ 100 m indoor, no walls | **Wi-Fi** if the router exists; BLE mesh otherwise |
| 100 m to 10 km outdoors | **LoRa / LoRaWAN** |
| Truly anywhere | **Cellular** (LTE-M / NB-IoT for low data, 4G/5G for high) |

You don't move to the next question until this one is answered. *Range is the wireless decision*; everything else is a tax on the choice you've already made.

![The five questions as a narrowing funnel. Question 1, highlighted, asks how far the device is from a gateway, phone, or router — range, which almost always decides the radio. Question 2 is cadence times payload, which confirms or kills the radio from question 1. Question 3 is per-device BOM budget, which the radio locks. Question 4 is the power budget — wall, battery-year, or energy-harvest — which can force the choice back. Question 5 is the buyer's security model — consumer, commercial, or regulated — which sets the secure element. The questions stay the same across products; the answers don't.](../../assets/blog/ble-lora-cellular-five-questions.svg)

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

![The security model drawn as a three-rung ladder where each tier adds to the one before it. Tier 1, consumer and unmanaged: a cert per device, TLS to the cloud, cloud-side auth, no extra secure-element BOM. Tier 2, commercial and managed-network: everything in Tier 1 plus device attestation, cert rotation, and on-device anti-tamper, adding $1.50 to $5 of BOM. Tier 3, industrial and regulated: everything in Tier 2 plus fleet-behaviour monitoring, a hardware secure element such as the ATECC608A, and the ability to revoke a single device in under sixty seconds — the same BOM add, but now hardware. Arrows show each tier inheriting from the last.](../../assets/blog/ble-lora-cellular-security-tiers.svg)

## Two worked examples — same rubric, very different answers

### Example 1: a connected power tool

Pretend we're scoping a connected power tool — the kind of thing a construction company tracks across a job site.

| Question | Our answer | Implication |
| --- | --- | --- |
| 1. Range? | ≤ 30 m to operator's phone, sometimes 200 m to a job-site gateway | **BLE** + **LoRa** dual radio |
| 2. Cadence? | Telemetry every 10 minutes, event-driven on error | Both BLE and LoRa survive |
| 3. BOM? | $8 of radios on a $300 tool | Within range; LoRa pricey but acceptable |
| 4. Power? | Tool's 20V battery — wall-equivalent | All options open |
| 5. Security? | Commercial; fleet-managed by the construction company | Add secure element ($2), cert per tool, anti-tamper |

End result: BLE + LoRa dual radio, secure element, fleet management via AWS IoT Core Thing Groups. The five questions did the work.

### Example 2: a consumer Bluetooth tracker (Samsung-SmartTag-style)

Same rubric, a wildly different product. Pretend we're scoping a $30 retail Bluetooth tracker — a tag you stick on your keys, your bike, your kid's backpack — that finds itself via a crowdsourced finder network.

| Question | Our answer | Implication |
| --- | --- | --- |
| 1. Range? | ≤ 10 m to the owner's phone; crowdsourced via every nearby phone running the vendor's app beyond that | **BLE only** — finder network does the long range |
| 2. Cadence? | Advertising every 2-10 seconds; no scheduled telemetry uplink | BLE advertising mode (no persistent connection) |
| 3. BOM? | $4 of radio on a $30 retail product | BLE single-chip ($1-2 in volume) — only option that fits |
| 4. Power? | CR2032 coin cell, 12+ months expected | BLE 5.0 advertising-only, sub-µA average draw |
| 5. Security? | Consumer privacy + anti-stalking | Rotating identifier per 15 min, AES-128, finder-network E2E encryption (Apple Find My / Samsung SmartThings Find spec) |

End result: BLE 5.0 only. No LoRa. No cellular. Crowdsourced finder network (the vendor's existing installed-base of phones) for the long-range case. Anti-stalking via rotating identifiers — the pressure on this category comes from state anti-stalking legislation and the Apple/Google "Detecting Unwanted Location Trackers" spec finalized this month, which standardizes the unwanted-tracker alerts the platforms now expect.

### Same rubric, opposite answer

The same five questions on two products: one wants BLE + LoRa + secure element + fleet management; the other wants BLE-only + finder network + rotating IDs + a sub-microamp average draw. The rubric isn't a recipe. It's a question-list that surfaces the constraints. The constraints decide.

![Two products run through the same five questions and land on opposite answers. The connected power tool ($300, job-site fleet, 20V battery) lands on BLE plus LoRa dual radio, a secure element with a cert per tool, and AWS IoT fleet management — its range is 200 m, power is wall-equivalent, security is commercial. The consumer BLE tracker ($30 retail, key tag, CR2032 coin cell) lands on BLE only with no LoRa or cellular, a crowdsourced finder network, and a rotating identifier for anti-stalking — its range is 10 m, power is sub-microamp for 12 months-plus, security is consumer privacy.](../../assets/blog/ble-lora-cellular-two-products.svg)

This is the part that makes the matrix portable across product categories: it doesn't tell you what to build, it tells you what to think about. Power tool vs key fob vs medical device vs cattle tracker — the questions stay the same. The answers don't.

## What about Sigfox?

Briefly: not anymore. Sigfox filed for bankruptcy in early 2022 and the remaining network has been on uncertain footing since. NB-IoT and LTE-M cover most of the same use cases with operator backing. I would not start a new product on Sigfox in 2024.

## The thing the matrix doesn't decide

The matrix decides wireless. It doesn't decide cloud, doesn't decide protocol layer (MQTT vs HTTP — almost always MQTT), doesn't decide topology (device-to-cloud vs device-to-gateway-to-cloud), and doesn't decide OTA strategy. Those are separate decisions that *follow* the wireless one.

But if you can get the wireless choice settled in twenty minutes instead of three meetings, the rest of the architecture conversation goes much faster. Tape the matrix to the wall.
