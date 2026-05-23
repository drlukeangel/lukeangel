---
title: "v2 PRD, Part 2 — applications, data model, cloud"
date: 2023-08-28T10:00:00-04:00
category: tools
tags:
  - prd
  - api-platform
  - domain-driven-design
  - aws-iot-core
  - mqtt
  - connected-products
notebook: connected-products
notebookOrder: 2
excerpt: "Part 2 of the v2 PRD. What the cart, the customer's mobile app, the store-staff tablet, and the ops dashboard each do — plus the entity model."
pullquote: "An entity model is a contract with your future self. Get it wrong and every feature spends the next five years paying interest on the mistake."
---

This is **Part 2 of 3** in the v2 PRD I'm writing this month. [Part 1](/blog/prd-part-1-hardware-specs/) covers the hardware spec. [Part 3](/blog/prd-part-3-identity-and-compliance/) covers identity, payment, PII, and compliance.

Part 2 is about what each piece of the system does — the cart, the customer's mobile app, the store-staff tablet, the ops dashboard — and the entity model that links them in the cloud. The cart is the visible product; the entity model is the load-bearing platform decision. **I learned that the hard way the first time around.** Previously I [consolidated eight separate device APIs into one entity domain model](/blog/from-eight-device-apis-to-one-entity-domain-model/) over 13 months — work that should have been done at the start, not after eight teams had each built their own incompatible version. This time the entity model is the *first* artifact, not a retrofit.

## System architecture (the one diagram everyone uses)

The PRD has a one-page architecture diagram I'm already drawing on whiteboards. In prose:

- **Cart** ↔ in-store WiFi (or LTE-M backup) ↔ **AWS IoT Core** (MQTT broker)
- **AWS IoT Core** → IoT Rules → Lambda functions → **Postgres entity store** + **DynamoDB telemetry store**
- **Postgres** ↔ **API Gateway** ↔ mobile app, staff tablet, ops dashboard
- **DynamoDB** → analytics pipeline → store-partner BI dashboards

Three data stores by design:

- **Postgres** for the entity model (carts, stores, accounts, sessions-in-progress). Relational, transactional, source of truth for state.
- **DynamoDB** for telemetry (each scan, each device-health event, each session-end). Append-only, time-series, single-digit-ms reads at scale.
- **S3** for OTA firmware artifacts, signed session-end receipts, and the analytics raw zone.

The cart never queries Postgres or DynamoDB directly. It publishes to MQTT topics. The cloud processes the message, writes to the appropriate store, and (if needed) sends a response on a response topic. Carts subscribe to a per-cart command topic for cloud-initiated commands (firmware updates, sleep, wake, customer-override). One-way most of the time; bidirectional only when explicitly required.

## What the cart does (the device-side capabilities)

The cart's firmware will have these top-level capabilities:

**Session management.** Start, hold, resume, end. A session corresponds to one shopping trip. Multiple sessions per cart per day.

**Item scanning.** The 2D imager fires when the user pulls the trigger. The cart decodes, posts a `scan` event to MQTT, updates the display. Local cache of product info for the top 2,000 SKUs (so the display can show "Bananas" without a cloud round-trip on the happy path).

**Weight verification.** Each scan's expected weight is checked against the platform's actual delta. Mismatches don't block the session — they're flagged in telemetry for the loss-prevention dashboard.

**Customer identification.** Reads loyalty cards, payment cards, app QR codes. Posts an `identify` event that joins the session to a customer ID.

**Payment hand-off.** At session end, the customer taps payment. The cart hands the payment leg off to the in-store EMV terminal via BLE proximity (the cart never handles raw payment data — see [Part 3](/blog/prd-part-3-identity-and-compliance/)). The cart receives an authorization token, posts a `session-end` event with cart contents + auth-token, and the cloud reconciles.

**Health telemetry.** Battery level, signal strength, scanner laser temperature, weight-platform-calibration drift. Posted every 60 seconds when active, every 5 minutes when idle.

**OTA receive.** Listens for firmware updates on a per-cart command topic. Verifies signature, writes to B-bank, verifies, reboots into new firmware. The OTA pipeline gets its own design doc — out of scope for the PRD.

**Local store-and-forward.** If connectivity drops, all events buffer to local flash. On reconnect, the cart re-publishes in order with original timestamps. The cloud dedups using `(cart-id, monotonic-counter)`.

The cart will **not** do:

- Payment processing (handed off to EMV terminal)
- Customer profile management (lives entirely in the cloud)
- Long-term storage of PII (no PII at rest on the device)
- Direct database access (everything goes through MQTT)

## What the mobile app does

The customer-facing mobile app is **optional** — the cart works fully without it. The app adds:

**Pre-shop list.** Customer builds a list at home. App syncs to cloud. When the customer pairs their cart at the store, the cart's display highlights list items as they're scanned.

**Loyalty + payment management.** Add/remove loyalty cards, payment methods, manage receipts.

**Session history.** Past shopping trips, receipts, item lookups.

**Pair to cart.** Scan a QR on the cart's display, or use BLE auto-pair if the user has explicitly opted in.

The app is a thin client over the cloud's customer-facing API. It is not on the cart's critical path for any functional requirement.

## What the staff tablet does

Each store has 5–10 store-staff tablets paired to that store's fleet of carts. Capabilities:

**Cart locator.** Floor-plan view showing every cart's last-known location with state (idle, in-use, low-battery, fault).

**Session override.** When a customer needs help — a scan won't go through, a payment fails, a child has wandered off with the cart — staff pair their tablet via BLE proximity and can pause/cancel/restart the cart's session.

**Maintenance flags.** Mark a cart as out-of-service for cleaning, charging, repair. Cloud routes future customers to other carts.

**Loss-prevention dashboard.** Real-time view of weight-vs-scan-expected mismatches in the store. Staff can investigate suspicious sessions before checkout.

**Fleet status.** Battery levels, signal strength, firmware versions across the fleet.

The tablet doesn't connect to AWS IoT Core directly. It uses the cloud's REST API. The cart-to-tablet BLE pairing is for proximity authorization only — the actual command ("cancel session 12345") goes through the cloud.

## What the ops dashboard does (the cloud-side admin)

The ops dashboard is for the company running the platform — us, not the supermarket. Capabilities:

**Multi-store fleet view.** Every cart in every store, sliced by store, region, firmware version, battery health, uptime.

**OTA orchestration.** Build firmware images, sign them, define rollout cohorts, monitor rollout health.

**Incident response.** Per-store paging, per-cart audit trail, customer-support escalation tooling.

**Billing.** Per-store usage metering, per-cart-month cost reporting, invoice generation.

**Compliance reporting.** PII access audit logs, payment-data-handling reports, regional data-residency dashboards.

## The entity model (the contract with your future self)

This is the section of the PRD that will matter most for the next several years. Get the entity model wrong and every feature pays interest. Get it right and every new feature gets cheaper.

The seven entities:

**Account.** The human customer. One per person. Held in Postgres. Includes email, optionally name, optionally payment methods, optionally loyalty memberships. Account is the only entity that can hold PII.

**Store.** A physical supermarket location. Owned by a supermarket-chain partner. Has a geofence, a WiFi SSID, a fleet of carts.

**Cart.** A physical device. Belongs to one Store. Has a serial number (factory-burnt), a per-device cert, a current firmware version, a current location, a current battery level, a maintenance status.

**Session.** One shopping trip. Belongs to one Cart and (optionally) one Account. Has start-time, end-time, status (active, paused, complete, abandoned, voided).

**Scan.** One barcode read. Belongs to one Session. Has a timestamp, product SKU, quantity, weight-platform-delta, price-at-scan.

**Item.** A SKU. Belongs to one Store (or a regional catalog). Has product name, price, expected weight, category. Items are the only entity not owned by us — they're synced in from the store's POS system.

**Payment.** One authorization. Belongs to one Session. Has a token (never raw card data), amount, status, timestamp. PCI-DSS scope is bounded to this entity and the EMV-terminal handoff (see [Part 3](/blog/prd-part-3-identity-and-compliance/)).

The cardinalities:

- Account 1 → N Sessions
- Store 1 → N Carts
- Cart 1 → N Sessions
- Session 1 → N Scans (typically 30–80)
- Session 0..1 → Payment
- Session 0..1 → Account (can be anonymous)
- Scan N → 1 Item

Three things this model gets right that I want to flag:

1. **Account is optional on Session.** A session can exist without an account (the guest-shopper case). This is non-negotiable — you cannot force customer identification before they're willing to give it, and the cart has to work without it.

2. **Cart and Account are independent.** Carts belong to Stores. Accounts belong to themselves. A customer can use any cart in any store; the cart doesn't "remember" them. This decouples identity from devices and keeps PII isolation clean.

3. **Item is not owned by us.** We sync from the store's POS system. The store owns its catalog. We never become the source of truth for product data — which means we never become responsible for product recalls, price corrections, or inventory.

## Telemetry payloads (the wire format)

Every cart-to-cloud message is one of seven types. JSON over MQTT with a binary signature appended:

- `scan` — barcode read event
- `session-start` — session began
- `session-end` — session complete (with item count, total, payment token)
- `identify` — customer authenticated to session
- `health` — periodic device telemetry
- `fault` — error event (scanner jam, payment fail, battery cliff)
- `boot` — firmware boot, used for OTA verification

Each message is 200–800 bytes. The binary signature (ECDSA P-256 over the message body) is 64 bytes. We considered Protocol Buffers for size; we're picking JSON for debuggability, and because the size win isn't load-bearing at our message rate.

## Per-device cloud cost model

The PRD's cost section has a per-cart-per-month spreadsheet. Components:

- AWS IoT Core: ~5,000 messages/cart/month × $1/million = $0.005
- Lambda processing: ~$0.02/cart/month
- DynamoDB writes (PROVISIONED capacity): ~$0.08/cart/month
- DynamoDB storage (90 days hot, then to S3): ~$0.03/cart/month
- Postgres (entity store, t3.medium baseline): amortized $0.04/cart/month at 5,000 carts
- LTE-M data plan (backup transport, ~5% of traffic): $0.15/cart/month
- S3 (OTA + receipts + archive): ~$0.03/cart/month
- CloudWatch logs: $0.02/cart/month

**Total: ~$0.39/cart/month** at 5,000-cart scale.

Customer-facing pricing is $4/cart/month to the store partner. Margin: ~$3.50/cart/month before engineering and ops headcount. At 5,000 carts that's $17,500/month — enough to fund a small team plus growth investment.

## Phasing — v1 vs v1.5 vs v2

The PRD scopes the phases hard.

**v1 (launch).** Scan, weigh, pay, OTA, fleet ops, store-staff tablet, anonymous + loyalty + tap-to-pay customers. No mobile app on the customer side. No pre-shop list. No advanced loss-prevention beyond weight-mismatch flagging.

**v1.5 (six months post-launch).** Customer mobile app for receipts and history. Real-time inventory integration with store POS. Cart-recovery for the "left in the parking lot" case.

**v2 (twelve months post-launch).** Pre-shop list with cart-side highlighting. Advanced loss-prevention with computer-vision on a future hardware rev. Optional in-app payment. Optional store-loyalty-only mode (no payment-at-cart, hand-off to manual checkout).

The hard cut on what's in v1 vs not is the thing the PRD does that matters most for shipping on time. Every feature pulled into v1 costs six weeks of v1 schedule. Every feature deferred to v1.5 is a feature we'll revisit with a quarter of field data informing the design.

## Where Part 2 ends

[Part 3 of the PRD](/blog/prd-part-3-identity-and-compliance/) covers identity, payment, PII classification, and the compliance threat model. Those are the sections where legal is making me defend every comma. They're also the sections that will determine the security architecture for the entire life of the product.
