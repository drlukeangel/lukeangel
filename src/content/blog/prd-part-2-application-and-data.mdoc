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
excerpt: "Part 2 of the v2 PRD. What the cart, the mobile app, the staff tablet, and the ops dashboard each do — the three-store cloud, the entity model that links them, and where the encryption boundary lands so PII has exactly one place to live."
pullquote: "An entity model is a contract with your future self. Get it wrong and every feature spends the next five years paying interest on the mistake."
cover: "../../assets/blog/prd-part-2-application-and-data-cover.svg"
coverAlt: "A wheeled scanner-and-payment workstation publishing signed messages up to a cloud, which fans the data out to three stores: a locked relational database for entity state and PII, a stack of append-only rows for telemetry, and a bucket for firmware and receipts."
---

This is **Part 2 of 3** in the v2 PRD I'm writing this month. [Part 1](/blog/prd-part-1-hardware-specs/) covers the hardware spec. [Part 3](/blog/prd-part-3-identity-and-compliance/) covers identity, payment, PII, and compliance.

Part 2 is about what each piece of the system does — the cart, the customer's mobile app, the store-staff tablet, the ops dashboard — and the entity model that links them in the cloud. The cart is the visible product; the entity model is the load-bearing platform decision. **I learned that the hard way the first time around.** Previously I [consolidated eight separate device APIs into one entity domain model](/blog/from-eight-device-apis-to-one-entity-domain-model/) over 13 months — work that should have been done at the start, not after eight teams had each built their own incompatible version. This time the entity model is the *first* artifact, not a retrofit.

## System architecture (the one diagram everyone uses)

The PRD has a one-page architecture diagram I'm already drawing on whiteboards. It's the picture I want every engineer, every legal reviewer, and every supermarket-partner BD person to have in their head, so it has exactly one rule: the cart is on the far left, it only ever *publishes*, and everything to its right is the cloud deciding where that message belongs.

![Cloud ingestion architecture. The cart, on the left, publishes over WiFi or LTE-M via MQTT-over-TLS to AWS IoT Core, the MQTT broker, which authenticates each cart with mutual TLS. An IoT Rule routes every message to a Lambda that validates and routes by message type. The Lambda fans out to three stores: RDS Postgres for entity state, DynamoDB for append-only telemetry, and S3 for artifacts and archive. Postgres is read through API Gateway by the three client surfaces — mobile app, staff tablet, ops dashboard — over REST and TLS. DynamoDB holds 90 days hot before aging to S3. The cart never touches a database directly.](../../assets/blog/prd-part-2-cloud-architecture.svg)

In prose:

- **Cart** ↔ in-store WiFi (or LTE-M backup) ↔ **AWS IoT Core** (MQTT broker)
- **AWS IoT Core** → IoT Rules → Lambda functions → **Postgres entity store** + **DynamoDB telemetry store**
- **Postgres** ↔ **API Gateway** ↔ mobile app, staff tablet, ops dashboard
- **DynamoDB** → analytics pipeline → store-partner BI dashboards

The cart never queries Postgres or DynamoDB directly. It publishes to MQTT topics. The cloud processes the message, writes to the appropriate store, and (if needed) sends a response on a response topic. Carts subscribe to a per-cart command topic for cloud-initiated commands (firmware updates, sleep, wake, customer-override). One-way most of the time; bidirectional only when explicitly required. That asymmetry is deliberate: a device that can only publish is a device that can't be commanded into doing something it shouldn't, and the [identity work in Part 3](/blog/prd-part-3-identity-and-compliance/) leans hard on it.

![The publish-mostly topic asymmetry. On the left, the cart — a device. On the right, AWS IoT Core, the MQTT broker, authenticating with mutual TLS. Three solid arrows run from cart up to the broker, labelled "publishes (the common case)": the cart sends on N publish topics — scan, health, fault, session-start, session-end, identify, boot. A single dashed arrow runs back down from the broker to the cart: the cart subscribes to exactly one per-cart command topic, used only for OTA, sleep, wake, and customer-override. The takeaway: a device that can only publish can't be commanded into doing something it shouldn't, so bidirectional is a privilege granted to one topic for one reason and everything else stays one-way.](../../assets/blog/prd-part-2-topic-asymmetry.svg)

### Three data stores by design

The single most common pushback I get on this diagram is "why three databases?" The answer is that we don't have one kind of data, we have three, and they have nothing in common except the cart that produced them.

![Three stores, three shapes. Postgres (RDS), the entity store: relational and transactional, the source of truth for state — carts, stores, accounts, sessions-in-progress — and the only store that holds PII; its read pattern is joins, by key. DynamoDB, the telemetry store: append-only and time-series, single-digit-millisecond reads at scale, holding each scan, health event, and session-end, with no PII by design; read by cart and time range. S3: large immutable blobs — OTA firmware images, signed session-end receipts, and the analytics raw zone — read by object key.](../../assets/blog/prd-part-2-three-stores.svg)

- **Postgres (RDS)** for the entity model — carts, stores, accounts, sessions-in-progress. Relational, transactional, the source of truth for state. When a question is "what is true *right now*," it's answered here.
- **DynamoDB** for telemetry — each scan, each device-health event, each session-end. Append-only, time-series, single-digit-ms writes and reads at fleet scale. When a question is "what *happened*," it's answered here.
- **S3** for OTA firmware artifacts, signed session-end receipts, and the analytics raw zone. Large, immutable, write-once objects that don't belong in either of the other two.

The temptation — and I've watched a team give in to it — is to put everything in one Postgres instance because relational is familiar. Telemetry then arrives at tens of thousands of rows per store per day, the table that the whole entity model depends on gets locked behind a write storm, and six months later you're doing the migration anyway, under duress, with live traffic. Picking the store by the *shape* of the data on day one is the cheap version of a decision you will otherwise make the expensive way.

## What each surface does

There are four pieces of software in this product, and they reach the cloud through exactly two doors. The cart speaks MQTT — it's a device, and MQTT is the transport the [hardware spec in Part 1](/blog/prd-part-1-hardware-specs/) is built around. The three human-facing surfaces — the customer's phone, the store-staff tablet, the ops dashboard — are all just REST clients of the same API. None of them talks to the broker, and none of them touches a database directly.

![Four surfaces, two doors into the cloud. The cart — the product itself — does scanning, weighing, identification, payment hand-off, session management, health telemetry, OTA receive, and store-and-forward on connectivity loss; it reaches the cloud over MQTT-over-TLS. The mobile app, which is optional, does the pre-shop list, loyalty and payment management, session history, and pair-to-cart, as a thin client that's never on the cart's critical path. The staff tablet, one per store, does the cart locator, session override, maintenance flags, and loss-prevention, using BLE proximity only as authorization while the actual command goes through the cloud. The ops dashboard, for the company running the platform, does multi-store fleet view, OTA orchestration, incident response, billing, and compliance plus PII-access audit logging. All three human-facing surfaces reach the cloud over REST and TLS.](../../assets/blog/prd-part-2-application-surfaces.svg)

### What the cart does (the device-side capabilities)

The cart's firmware will have these top-level capabilities:

**Session management.** Start, hold, resume, end. A session corresponds to one shopping trip. Multiple sessions per cart per day.

**Item scanning.** The 2D imager fires when the user pulls the trigger. The cart decodes, posts a `scan` event to MQTT, updates the display. Local cache of product info for the top 2,000 SKUs (so the display can show "Bananas" without a cloud round-trip on the happy path).

**Weight verification.** Each scan's expected weight is checked against the platform's actual delta. Mismatches don't block the session — they're flagged in telemetry for the loss-prevention dashboard.

**Customer identification.** Reads loyalty cards, payment cards, app QR codes. Posts an `identify` event that joins the session to a customer ID.

**Payment hand-off.** At session end, the customer taps payment. The cart hands the payment leg off to the in-store EMV terminal via BLE proximity (the cart never handles raw payment data — see [Part 3](/blog/prd-part-3-identity-and-compliance/)). The cart receives an authorization token, posts a `session-end` event with cart contents + auth-token, and the cloud reconciles.

**Health telemetry.** Battery level, signal strength, scanner laser temperature, weight-platform-calibration drift. Posted every 60 seconds when active, every 5 minutes when idle.

**OTA receive.** Listens for firmware updates on a per-cart command topic. Verifies signature, writes to B-bank, verifies, reboots into new firmware. The OTA pipeline gets its own design doc — out of scope for the PRD.

**Local store-and-forward.** If connectivity drops, all events buffer to local flash. On reconnect, the cart re-publishes in order with original timestamps. The cloud dedups using `(cart-id, monotonic-counter)`.

![Store-and-forward on connectivity loss, in three stages. Stage 1, the link drops — WiFi and LTE-M both down — and the cart keeps scanning, continuing the session locally. Stage 2, events queue to local flash as an ordered list (scan #104, scan #105, health #106) with their original timestamps preserved. Stage 3, on reconnect the cart re-publishes them in order to the cloud, which dedups on the (cart-id, counter) key. The explainer below notes that MQTT may redeliver on a flaky reconnect, so the cart could re-send #104 twice; keying every event on (cart-id, counter) and dropping the duplicate gives exactly-once at the data layer even though the transport only promises at-least-once.](../../assets/blog/prd-part-2-store-and-forward.svg)

The cart will **not** do:

- Payment processing (handed off to EMV terminal)
- Customer profile management (lives entirely in the cloud)
- Long-term storage of PII (no PII at rest on the device)
- Direct database access (everything goes through MQTT)

### What the mobile app does

The customer-facing mobile app is **optional** — the cart works fully without it. The app adds:

**Pre-shop list.** Customer builds a list at home. App syncs to cloud. When the customer pairs their cart at the store, the cart's display highlights list items as they're scanned.

**Loyalty + payment management.** Add/remove loyalty cards, payment methods, manage receipts.

**Session history.** Past shopping trips, receipts, item lookups.

**Pair to cart.** Scan a QR on the cart's display, or use BLE auto-pair if the user has explicitly opted in.

The app is a thin client over the cloud's customer-facing API. It is not on the cart's critical path for any functional requirement.

### What the staff tablet does

Each store has 5–10 store-staff tablets paired to that store's fleet of carts. Capabilities:

**Cart locator.** Floor-plan view showing every cart's last-known location with state (idle, in-use, low-battery, fault).

**Session override.** When a customer needs help — a scan won't go through, a payment fails, a child has wandered off with the cart — staff pair their tablet via BLE proximity and can pause/cancel/restart the cart's session.

**Maintenance flags.** Mark a cart as out-of-service for cleaning, charging, repair. Cloud routes future customers to other carts.

**Loss-prevention dashboard.** Real-time view of weight-vs-scan-expected mismatches in the store. Staff can investigate suspicious sessions before checkout.

**Fleet status.** Battery levels, signal strength, firmware versions across the fleet.

The tablet doesn't connect to AWS IoT Core directly. It uses the cloud's REST API. The cart-to-tablet BLE pairing is for proximity authorization only — the actual command ("cancel session 12345") goes through the cloud.

### What the ops dashboard does (the cloud-side admin)

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

![The entity model. Store owns N Carts; each Cart has N Sessions. Account, the only entity that holds PII, has N Sessions but a Session has only 0..1 Account, so a session can be anonymous. The Session sits at the center: it has N Scans, where each Scan maps to exactly 1 Item, and it has 0..1 Payment, which carries a token and never raw card data. Item is drawn dashed because it is synced from the store's point-of-sale system and not owned by the platform. Account is outlined in a distinct color to mark it as the single home of personally identifiable information.](../../assets/blog/prd-part-2-entity-model.svg)

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

A wire format is only half the contract — the other half is what happens when a payload *doesn't* match it. MQTT acks the moment the broker receives a message, so by the time validation runs, the cart already thinks it succeeded. Whether the cart ever finds out it sent garbage is an architecture decision, not a detail, and it splits three ways depending on whether the device needs to know. That question gets [its own post on validating at ingestion](/blog/validating-iot-data-at-ingestion-three-patterns/) — for the PRD, the relevant line is that routine telemetry takes the async-filter path and the payment leg takes the synchronous one.

## Encryption — in motion and at rest

This is the section legal reads twice. The rule the PRD states up front is blunt: **nothing crosses the wire in the clear, and nothing sits on disk in the clear.** Both halves matter, and they fail in different ways, so I spec them separately.

![Encryption boundaries, in motion and at rest. In motion, every hop is TLS: the cart connects to AWS IoT Core over MQTT-over-TLS with mutual TLS, the broker and Lambda reach the data stores over in-VPC TLS, and the three client surfaces reach API Gateway over HTTPS with TLS 1.2 or better. At rest, every store is encrypted with keys held in AWS KMS: a customer master key per data domain, rotated annually, with access audited. RDS Postgres uses AES-256 volume encryption and column-encrypts the PII fields; DynamoDB has encryption at rest and holds no PII by design; S3 uses SSE-KMS per object for OTA images, signed receipts, and archive. The boundary that matters: PII lives in exactly one place — the Account row in Postgres, column-encrypted under its own KMS key — so the blast radius is a single table.](../../assets/blog/prd-part-2-encryption-boundaries.svg)

**In motion.** Every hop is TLS, no exceptions. The cart-to-cloud leg is MQTT-over-TLS 1.2 with **mutual TLS** — the cart authenticates the cloud against a pinned CA, and the cloud authenticates the cart against the per-device certificate burned in at the factory ([Part 1](/blog/prd-part-1-hardware-specs/) specified the ATECC608A that holds the private key). There is no anonymous or username/password path to the broker; a cart without a valid client cert never gets a session. Inside the VPC, Lambda-to-RDS and Lambda-to-DynamoDB ride TLS as well — "it's inside our network" is not a reason to send a Postgres connection in the clear. The three client surfaces reach API Gateway over HTTPS, TLS 1.2 minimum, with the weak cipher suites disabled in the gateway's security policy.

**At rest.** Every store is encrypted, and — this is the part that matters — **the keys live in AWS KMS, not in the service.** RDS gets AES-256 volume encryption under a customer-managed key. DynamoDB gets encryption at rest under its own key. S3 gets SSE-KMS, per object, for firmware images, signed receipts, and the archive zone. One KMS customer master key per data domain, rotation enabled, and — the reason you bother with customer-managed keys instead of the default AWS-managed ones — **every decrypt is a CloudTrail event.** When legal asks "who could read the account table, and when did they," the answer is a query, not a shrug.

**The boundary that actually does the work** is narrower than "encrypt everything," and it's the one I'd defend hardest: **PII lives in exactly one place.** It's the `Account` row in Postgres, and inside that row the genuinely sensitive columns — email, payment-method references, loyalty identifiers — are **column-encrypted under their own KMS key**, separate from the volume key. Telemetry never carries PII. Receipts in S3 reference an account by opaque ID, not by name. So a compromise of the telemetry store, or the receipts bucket, or a leaked DynamoDB backup, exposes no person — it exposes cart serials and timestamps. The blast radius of the scariest failure is one table, encrypted twice, behind an audited key. That containment is a *data-model* decision as much as a crypto one, which is why it belongs in this PRD and not in a separate security appendix nobody reads.

**What I got wrong the first time.** On the v1 health platform I treated "TLS everywhere + RDS encryption on" as done, and called it encrypted. It technically was. But PII was scattered across four tables because the schema grew organically, so when a regulator asked the blast-radius question, the honest answer was "most of the database," and the remediation was a quarter of schema surgery to corral PII into one place after the fact. The lesson I carried into this PRD: **encryption is the easy 80%; deciding where the sensitive data is allowed to live is the 20% that's actually load-bearing,** and it has to be a constraint on the entity model from day one, not a cleanup later. The detailed PII classification and the regulatory framing are [Part 3](/blog/prd-part-3-identity-and-compliance/)'s job — but the *architecture* that makes Part 3 tractable is decided right here, in where the bytes are allowed to sit.

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

![Per-cart-per-month cloud cost and margin at 5,000 carts. A stacked bar breaks the ~$0.39 monthly cloud cost into its components: IoT Core $0.005, Lambda $0.02, DynamoDB writes $0.08, DynamoDB storage $0.03, Postgres $0.04, LTE-M backup $0.15, S3 $0.03, and CloudWatch $0.02 — the LTE-M backup plan being the single largest line. Below it, a margin breakdown of the $4.00 charged to the store partner: subtract the $0.39 cloud cost and ~$3.50 of gross margin per cart per month remains, before headcount. At 5,000 carts that is roughly $17,500 a month gross, enough to fund a small team plus growth.](../../assets/blog/prd-part-2-cost-model.svg)

## Phasing — v1 vs v1.5 vs v2

The PRD scopes the phases hard.

**v1 (launch).** Scan, weigh, pay, OTA, fleet ops, store-staff tablet, anonymous + loyalty + tap-to-pay customers. No mobile app on the customer side. No pre-shop list. No advanced loss-prevention beyond weight-mismatch flagging.

**v1.5 (six months post-launch).** Customer mobile app for receipts and history. Real-time inventory integration with store POS. Cart-recovery for the "left in the parking lot" case.

**v2 (twelve months post-launch).** Pre-shop list with cart-side highlighting. Advanced loss-prevention with computer-vision on a future hardware rev. Optional in-app payment. Optional store-loyalty-only mode (no payment-at-cart, hand-off to manual checkout).

The hard cut on what's in v1 vs not is the thing the PRD does that matters most for shipping on time. Every feature pulled into v1 costs six weeks of v1 schedule. Every feature deferred to v1.5 is a feature we'll revisit with a quarter of field data informing the design.

## What I'd tell a team writing the same document

- **Write the entity model before you write the features.** Every capability above is a sentence about entities and the edges between them. If the nouns aren't settled, the features are quicksand. We did this backwards once and paid [13 months consolidating eight incompatible models](/blog/from-eight-device-apis-to-one-entity-domain-model/) back into one.
- **Pick the data store by the shape of the data, not by what's familiar.** State, time-series, and blobs want different engines. Cramming them into one is a decision you make for free now or expensively later.
- **Decide where PII is allowed to live, and make it a constraint, not a convention.** One entity, one place, encrypted under its own key. "Encrypt everything" is the easy part; *containing* the sensitive data is what shrinks your blast radius and your audit.
- **Keep the device on the publish side of the asymmetry.** A cart that can only publish can't be told to misbehave. Bidirectional is a privilege you grant a specific topic for a specific reason.
- **Spec the error and audit paths in the same breath as the happy path.** Who reads the reject topic, who can decrypt the account table, who finds out when a payload is garbage — write those down now, because they're the questions you'll be asked under pressure.

The cart is the part everyone wants to talk about in the demo. The entity model and the encryption boundary are the parts that decide whether this thing is still cheap to build on in year five. Get the visible product wrong and you ship late. Get the data layer wrong and you pay interest forever.

## What's next

[Part 3 of the PRD](/blog/prd-part-3-identity-and-compliance/) takes the boundary this part drew — PII in one place, payment reduced to a token — and turns it into the identity, payment, and compliance design. Those are the sections where legal is making me defend every comma. They're also the ones that lock in the security architecture for the entire life of the product, which is exactly why the data model had to come first.
