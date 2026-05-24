---
title: "v2 PRD, Part 1 — hardware specs for a battery device"
date: 2023-08-14T10:00:00-04:00
category: tools
tags:
  - prd
  - hardware
  - iot
  - connected-products
  - mqtt
  - aws-iot-core
notebook: connected-products
notebookOrder: 1
excerpt: "The PRD I'm writing before v2 hardware goes into prototyping. Part 1 of three — the hardware spec for a wheeled scanner-and-payment workstation."
pullquote: "The PRD answers one question at every layer: 'what does this device need to do that a smartphone with the same app couldn't do?' Every part of the spec earns its place against that question."
cover: "../../assets/blog/prd-part-1-hardware-specs-cover.png"
coverAlt: "v2 PRD, Part 1 — hardware specs for a battery device"
---

I'm writing the product requirements document for the v2 connected hardware product. **This is my second time writing one of these.** I led the API platform for a BLE-connected consumer-health portfolio from 2017 to 2019 — the [v1 series](/notebooks/building-medical-iot-connected-products/) is the full story. That experience is shaping every section of this PRD. The team is freshly chartered, the budget just landed, and we have eight weeks to decide what we're building before we run out of "Q3 is for figuring it out" runway.

The PRD runs to 47 pages internally, structured in three parts. I'm publishing all three here, edited for public consumption and with brand-specific details abstracted. **The product in the spec is a wheeled scanner-and-payment workstation — a "smart cart," in industry parlance — that lets a customer scan items as they shop and check out without queueing for a cashier.** That's the worked example. The architecture and the constraints map cleanly to a broader family of "device-identifies-AND-bills-the-user" products — transit gates, parking meters, factory-floor PPE tracking — but the cart makes everything concrete.

This is **Part 1 of 3**: the hardware spec and system-level constraints. [Part 2](/blog/prd-part-2-application-and-data/) covers application capability, data model, and cloud architecture. [Part 3](/blog/prd-part-3-identity-and-compliance/) covers identity, payment, PII, and the compliance threat model.

## Product premise (the one paragraph)

> *A battery-powered, network-connected workstation that travels with the customer through a supermarket. The customer scans items into the station as they shop, sees a running total, and checks out — paying directly at the station — without ever queueing for a cashier. The station identifies itself to the cloud (so we know where each cart is, what state it's in, when it needs charging, when it's been kicked into a wall) and helps the customer identify themselves (loyalty card, tap-to-pay) so we can bill them. The station does not require the customer's phone to function — it has its own radio and its own cloud connection. The customer can choose to use their phone for receipts and history, but the cart shops with or without them.*

That paragraph is what we're showing to legal, finance, and the supermarket-partner business-development team in week one. Every detail in the rest of the PRD answers a question that paragraph raises.

## User stories — four golden paths and three edge cases

**Golden path 1 — known customer, full trip.**
Customer walks up to a cart at the dock. Cart is awake, charged, idle. Customer taps loyalty card on the cart's reader. Cart greets them by first name on the display. Customer shops, scanning items. Cart maintains a running total. Customer wheels to the checkout zone, taps payment card. Cart sends a "session complete" event with contents. Cloud authorizes payment, returns a receipt. Customer leaves.

**Golden path 2 — anonymous customer, full trip.**
Customer walks up. Skips loyalty tap (chooses "shop as guest"). Scans items. Pays at end. Cart never learns who they were. Cloud knows the transaction but not the human.

**Golden path 3 — mid-shop loyalty add.**
Customer starts as guest. Halfway through, they remember they meant to use loyalty for a coupon. Tap loyalty card. Cart links the in-progress session retroactively. Continues normally.

**Golden path 4 — interrupted shop.**
Customer parks the cart at customer service and leaves the store for ten minutes to retrieve a forgotten coupon. Cart goes to sleep, holding the in-progress session in flash. Customer returns, taps to wake the cart, resumes shopping.

**Edge case 1 — connectivity loss during shop.**
In-store WiFi goes down. Cart fails over to cellular. If cellular is also down, cart enters store-and-forward mode — scans buffer locally, payment authorization is held. Customer can finish scanning. Payment at end happens via the in-store payment terminal as a fallback, not via the cart. Cart syncs everything back when connectivity returns.

**Edge case 2 — cart out of battery.**
Cart detects low battery, warns the customer on the display, instructs them to swap to a different cart. In-progress session syncs to cloud over its last few watts. Customer scans loyalty/payment at the new cart and the cloud merges the session.

**Edge case 3 — cart left in the parking lot.**
Customer wheels the cart out of the store with their groceries. Cart pings via cellular every hour with location. Store staff retrieves it. Cart never enters a state where it can be used outside the store's account (carts are paired to a store, not a customer).

## Functional requirements (the must-do list)

The PRD lists 47 functional requirements. The top 10:

1. Scan items via 1D and 2D barcode (95% scan success in <500 ms).
2. Maintain a running session of scanned items with running subtotal.
3. Display session contents on a 7-inch touch panel.
4. Authenticate the customer via NFC loyalty card OR contactless payment card OR QR code in the mobile app.
5. Accept payment via NFC contactless OR magstripe-as-fallback at session end.
6. Communicate with the cloud via MQTT-over-TLS as the primary transport.
7. Operate for a full 12-hour shift on a single charge.
8. Survive a supermarket environment for 5 years (3-foot drops, freezer aisles, cleaning solvents, kid-kicks).
9. Locate itself within the store to within 10 meters (for cart-recovery and analytics).
10. Allow store staff to override any session state via a paired tablet.

The other 37 are mostly "if X then Y" branches that came out of the user-story workshops.

## Non-functional requirements (the don't-do list)

These are the constraints that disqualify implementations:

- **Latency**: a scan event must be acknowledged on the local display in under 200 ms. Cloud round-trips cannot be in this path.
- **Battery**: 12 hours of mixed-use on a single charge. Charge to 80% in under two hours at the dock.
- **Uptime**: 99% of carts in a store should be operational at any given store-open hour. Fleet-wide cloud-side uptime: 99.95%.
- **Connectivity tolerance**: cart must continue to function for at least one full shopping session if all external connectivity (WiFi and cellular) drops.
- **Cost**: BOM target $180/cart at v1 volumes (5,000 carts). Landed COGS target $240/cart. Five-year amortization; store pays $4/cart/month for the SaaS.
- **Privacy**: no PII on the cart at rest. Customer ID held in volatile memory only, dropped at session end.
- **Security**: every event signed by the cart's secure element. No cleartext payment data ever traverses the cart.

The cost line is the most load-bearing. The cart only makes sense at $4/cart/month if it can be built at $240 landed and run on $0.40/cart/month of cloud spend.

## Hardware spec (the actual parts)

The PRD's hardware section is specific:

**Compute**
- Microcontroller: ESP32-C3 (RISC-V single-core, 160 MHz, integrated WiFi + BLE 5.0)
- 4 MB SPI flash for firmware + local session buffer
- Secure element: ATECC608A for device cert, payment-token wrapping, attestation

**Radios**
- WiFi 802.11 b/g/n 2.4 GHz, primary transport, MQTT-over-TLS to AWS IoT Core
- LTE-M (Cat-M1) cellular module, backup transport, MQTT-over-TLS over LTE
- BLE 5.0 (integrated in ESP32-C3) — used only for short-range pairing with the in-store payment terminal, staff-tablet override, and optional customer-phone QR sync

**Sensors and I/O**
- 2D imager barcode scanner (Honeywell-class, 1D + 2D, ~500 ms read time)
- Weight platform on the cart's tray, 0–30 kg, ±20g, used for anti-shrink detection
- 7-inch capacitive touch display, 1024×600
- NFC reader for loyalty/payment tap (ISO 14443, EMV-certified module from a specialist vendor)
- Speaker for scan-success feedback and accessibility prompts
- Buttons: power, scan-trigger, help

**Power**
- 7.4 V 7800 mAh Li-ion pack, swappable at the dock
- Charging via dock contacts at 2A
- Battery-management IC with low-battery cutoff at 6.4 V
- Estimated draw: 0.4A average across a shift (mixed scanning + idle), 0.1A in deep sleep

**Mechanicals**
- IP54 ingress rating (dust + splash, not submersion)
- Drop tested to 3 feet onto vinyl
- Operating temperature: -10°C to +40°C (refrigerated-aisles consideration)
- Weight target: under 3.5 kg without battery, under 4.5 kg with

## Why MQTT over WiFi (the architecture decision the rest pivots on)

I'm summarizing the trade study here; the [BLE-vs-LoRa-vs-cellular post](/blog/ble-vs-lora-vs-cellular-decision-matrix/) will cover the broader rubric for connected-product wireless choice once we're past the spec phase.

**Why MQTT, not HTTP REST.**
On a battery-powered device, HTTP costs you on every message:

- TCP three-way handshake per request (3 round trips of TX/RX over the radio)
- TLS handshake (another 4–6 round trips depending on session resumption)
- Headers (a typical signed REST request is 600+ bytes of HTTP plumbing)
- Connection teardown

A modest-sized scan event becomes a 2 KB TX/RX over a radio that's hard-on for 200–300 ms. Multiply by 50 scans/session × 3 sessions/cart/day × 365 = ~55,000 wake-cycles per year. Each wake-cycle costs battery and shaves cart-uptime.

MQTT, by contrast, holds a single persistent TLS connection. After the initial handshake (which happens once per cart power-up or radio re-association), every subsequent message is ~50 bytes of MQTT framing + 50 bytes of TLS framing. The radio can be in low-power-listen mode between messages, kicked into TX for milliseconds to publish, back to listen. Battery savings on the radio path are measured in 3–5×.

For a cart that has to last 12 hours on a single charge, MQTT is the only transport that hits the budget.

**Why WiFi primary.**
Every supermarket has WiFi. We're paired to a specific store; in-store WiFi has known coverage and known QoS. The store pays the WiFi bill. We can negotiate priority on the corporate SSID. WiFi throughput is 5–50 Mbps, more than we need (we need ~10 kbps sustained per cart).

**Why LTE-M backup.**
LTE-M (Cat-M1) is the cellular standard designed for battery IoT. Power profile: 50–100 mW transmit, deep-sleep paging that lets the radio sleep for minutes at a time. Data plan: $1–3/cart/month for 1 MB/day of usage, more than enough for backup. Coverage: every major US carrier, every major EU carrier. Roaming-aware. Latency: 200–400 ms — fine for "fallback only when WiFi drops" use.

Full 4G LTE (Cat-4 or higher) would give us 10× more throughput but cost 5× more power and a more expensive module. We don't need the throughput. LTE-M is the right answer.

**Why BLE only for proximity.**
BLE in this design is not the primary radio. It's used for short-range pairing with three specific peer devices: the in-store payment terminal (for hand-off at checkout), the staff-override tablet (for incident response), and optionally the customer's phone (for app-QR-to-cart pairing). BLE bonds are stored in flash and survive reboots.

## BOM target (the ugly math)

Component costs at 5,000-cart volumes, current 2023 pricing:

| Component | Unit cost |
|---|---|
| ESP32-C3 module (WROOM) | $3.20 |
| LTE-M module (Quectel-class) | $14.00 |
| ATECC608A secure element | $0.90 |
| 2D imager barcode scanner | $42.00 |
| 7" touch display | $24.00 |
| NFC reader (EMV-certified) | $11.50 |
| Weight platform | $18.00 |
| Battery pack (7.4 V 7.8 Ah) | $22.00 |
| Mechanicals / chassis / wheels | $26.00 |
| Misc (speakers, buttons, PCBs, antennas, connectors) | $14.40 |
| **BOM subtotal** | **$176.00** |
| Assembly + test (Mexico) | $24.00 |
| Logistics / packaging | $18.00 |
| **Landed COGS** | **$218.00** |

We're projecting $22 under the $240 target with no compromises on the spec. The barcode scanner is the single biggest line item; we evaluated three vendors and the Honeywell-equivalent at $42 is the best perf/$ at our volume.

## Where the PRD ends (Part 1)

The hardware section closes with a 3-page table of "open questions for hardware engineering" — supplier selection, mechanical revision schedule, certification timing (FCC, CE, EMV for the NFC reader), and a half-page of "things that might bite us in production."

The single biggest open question I expect to matter: **EMC compliance in the refrigerated aisles.** Refrigerator compressors throw off a lot of 2.4 GHz noise. We don't know yet how bad it will be — that's a prototype-against-a-real-fridge test that hasn't happened. The antenna placement and shielding plan in the current spec is a best guess; we'll learn what's actually needed once we have hardware to point at the problem.

[Part 2 of the PRD](/blog/prd-part-2-application-and-data/) covers the cloud-side and the app: what the cart talks to, what runs on the store-staff tablet, what data we store, and the entity model the platform will be built on. [Part 3](/blog/prd-part-3-identity-and-compliance/) covers identity, payment, PII, and the compliance threat model — the parts of the document where legal has made me defend every comma.
