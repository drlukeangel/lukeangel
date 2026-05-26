---
title: "v2 PRD, Part 3 — identity, payment, PII, compliance"
date: 2023-09-11T10:00:00-04:00
category: tools
tags:
  - prd
  - security
  - pci-dss
  - gdpr
  - pii
  - identity
  - connected-products
notebook: connected-products
notebookOrder: 3
excerpt: "Part 3 of the v2 PRD. The identity model, the payment-data-handling architecture, the PII classification scheme, and the compliance threat model."
pullquote: "The PRD's job in the compliance section is to draw a small box around payment data and a smaller box around customer identity, and then design every other system component to stay outside both boxes."
cover: "../../assets/blog/prd-part-3-identity-and-compliance-cover.svg"
coverAlt: "Two nested, padlocked boxes sit at the center — a larger one holding a payment card, a smaller one inside it holding a customer's identity. Every other part of the system — the cloud, the wheeled cart, a phone, a staff tablet, an ops dashboard — is drawn outside both boxes, tethered by faint dashed lines. The whole design is about drawing a small box around regulated data and keeping everything else outside it."
---

This is **Part 3 of 3** in the v2 PRD I've been writing across August and September. [Part 1](/blog/prd-part-1-hardware-specs/) covered the hardware spec. [Part 2](/blog/prd-part-2-application-and-data/) covered application capability and the entity model.

Part 3 is the section that's taken three weeks of back-and-forth with legal and the CISO's team. Identity, payment, PII — these are the design decisions that determine the regulatory surface area of the product for its entire life. Get them right at the PRD stage and the next five years of audits go smoothly. Get them wrong and every feature negotiation has to relitigate fundamentals. **I learned this from the wrong side on v1** — the [three-tier PII classification](/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data/) we settled on with the privacy office in early 2018 is the architecture I wish I'd had on paper in week one. The regulatory regime here is different (PCI-DSS + GDPR instead of HIPAA + FDA Class I) but the architecture-of-boundaries principle is identical. This time the three-tier model is in the PRD from day one, not retrofitted six months in.

## The three regulatory regimes that apply

The cart sits at the intersection of three regulatory regimes:

**PCI-DSS.** Any system that "stores, processes, or transmits cardholder data" is in PCI scope. Cardholder data is the primary account number (PAN) plus optionally cardholder name, expiration, service code, and sensitive authentication data (CVV, magnetic stripe, PIN). PCI-DSS has 12 control areas with hundreds of sub-controls. The cost of being in scope is enormous.

**GDPR and state-level US equivalents (CCPA, CPRA, etc).** Personal data of EU/UK/California residents has data-subject rights, retention limits, breach reporting, and right-to-deletion. The definition of "personal data" is broad — anything that "directly or indirectly identifies" a natural person.

**Local sales-tax + payment compliance.** Varies by jurisdiction. In the US: sales tax must be computed and remitted correctly per state and local jurisdiction. In the EU: VAT. In some jurisdictions: tax-receipt requirements with specific data fields.

The PRD addresses each in turn. The PCI-DSS section is the longest by far.

![The three regulatory regimes the cart sits inside. PCI-DSS, drawn around a payment card, covers cardholder data — PAN, CVV, magstripe, PIN — with 12 control areas and hundreds of sub-controls, and an enormous scope cost. GDPR plus CCPA/CPRA, drawn around a person, covers personal data — anything that identifies a person — and grants rights of access, deletion, retention limits, and breach reporting across the EU/UK and state-level US. Sales tax and VAT, drawn around a receipt, is per-jurisdiction: tax must be computed and remitted correctly across US state and local rules and EU VAT, with tax-receipt fields, though the platform forwards this to the store's own tax engine. The whole design is a fight to shrink how much of the product sits inside each box.](../../assets/blog/prd-part-3-regulatory-regimes.svg)

## The identity model — three layers, isolated

Identity in the cart system is layered. Three distinct identities, with explicit isolation between them.

**Cart identity (cart-as-thing).**
Every cart has a unique cryptographic identity, established at factory provisioning:

- An ECDSA P-256 keypair generated inside the ATECC608A secure element. The private key never leaves the chip.
- An X.509 certificate signed by our internal CA, embedding the cart's serial number.
- A per-cart credential for AWS IoT Core authentication, derived from the cert.

Cart identity is used for: signing every telemetry message, authenticating MQTT connections to AWS IoT Core, attesting firmware integrity to the cloud during OTA, proving the cart is in a known-good state at session start.

Cart identity is **not** used for: identifying customers, holding payment data, or anything related to a human being. The cart-as-thing identity is orthogonal to all customer identity.

**Customer identity (customer-as-account).**
A customer who chooses to be identified provides one of:

- A loyalty card number (low-PII, just a number, no biometric or financial component).
- A tap-to-pay event at session-start (resolves to a payment-method token, see below).
- A mobile-app QR code (resolves to an account ID via OAuth).

Customer identity is stored only in the cloud, in the Account entity (see [Part 2](/blog/prd-part-2-application-and-data/)). The cart receives a session-scoped customer ID — an ephemeral identifier good only for the duration of one session, dropped from cart memory at session end. The cart never knows the customer's email, name, address, payment method, or loyalty history.

**Session identity (the per-session pseudonym).**
Every session has a UUID generated at session-start. The session ID is what links scans, payment, and (optionally) customer in the cloud. The session ID is what appears in receipts, audit logs, and analytics. It's pseudonymous — meaningful only in conjunction with the cloud's join tables, which require authenticated API access.

The point of this layering: **the cart-as-thing and the customer-as-account are independently controlled, with the session as the disposable join between them.** A leaked cart cert tells an attacker nothing about customers. A leaked customer account tells an attacker nothing about a specific cart. Compromise of one identity layer does not compromise the others.

![Three isolated identity layers. On the left, cart identity — an ECDSA P-256 keypair in an ATECC608A secure element, an X.509 cert carrying the serial number, and an AWS IoT Core MQTT credential; it never identifies a human. On the right, customer identity — established by loyalty tap, tap-to-pay, or app QR, resolved only in the cloud, with the Account entity holding the PII; the cart never learns the customer's name or email. In the center, the session — a per-trip UUID that is pseudonymous and meaningless without the cloud's join tables. The cart receives only a session-scoped ephemeral id; the session-to-customer link is a cloud join that is authenticated and logged. A leaked cart cert reveals nothing about any customer, and a leaked customer account reveals nothing about a specific cart, so compromise of one layer does not compromise the others.](../../assets/blog/prd-part-3-identity-layers.svg)

## Customer authentication options

The PRD specifies three customer-auth options in v1 and explicitly disallows others.

**Loyalty card tap (NFC).**
Customer taps a loyalty card on the cart's NFC reader. The reader returns the loyalty card's identifier (typically a 16-digit number). The cart posts an `identify` event with the loyalty number. The cloud's identity service resolves the loyalty number to an Account, returns a session-scoped customer ID. Cart binds the session to the customer.

The loyalty card number is treated as Tier 2 PII (see classification below) — pseudonymous, joinable to Account by us, not by anyone without API access.

**Tap-to-pay at session start.**
Customer taps a contactless payment card on the NFC reader. The EMV-certified NFC module performs the tap, returns a payment-method token — **not** the PAN (see PCI-DSS section below). The cart sends the payment-method token to the cloud's payment service in the `identify` event. The payment service resolves the token to an Account if one exists (the customer has registered this card before), or creates an anonymous "card-holder" record if not.

**Mobile-app QR.**
Customer opens the mobile app, scrolls to a "Pair to Cart" screen. The app shows a QR code. The customer holds the phone up to the cart's scanner, which reads the QR. The QR contains a short-lived OAuth code. The cart exchanges it via the cloud for a session-scoped customer ID. The customer's account is now bound to the session.

Explicitly disallowed in v1: facial recognition, voice biometrics, fingerprint, license-plate scan, anything that requires the cart to capture a biometric. The privacy-impact analysis rules these out.

![Customer auth — three ways in, one result. Three input methods on the left each feed a cloud identity service: a loyalty card tapped on NFC resolves to a 16-digit number treated as Tier 2 PII; a tap-to-pay at session start resolves to a payment-method token; and a mobile-app QR resolves to a short-lived OAuth code. All three converge on the cloud identity service, which resolves the credential to an Account, or creates an anonymous record. The service returns one thing to the cart: a session-scoped ephemeral ID, good for one trip and dropped at session end — the cart never sees the customer's name, email, or PAN. A bar across the bottom lists what is explicitly disallowed in v1 by the privacy-impact analysis: facial recognition, voice biometrics, fingerprint, license-plate scan, and any biometric.](../../assets/blog/prd-part-3-auth-options.svg)

## Payment scope (the PCI-DSS box)

This is the section that matters most. PCI-DSS scope is the single biggest determinant of audit cost and certification burden. The architectural goal: **the cart is not in PCI scope.**

How we achieve that:

**Raw payment data never enters the cart's main MCU.**
The NFC payment reader is an EMV-certified module from a specialist vendor. It has its own internal microcontroller, runs vendor-certified firmware, and connects to the cart's main MCU via a serial line that carries only EMV-defined responses — never raw PAN, never CVV, never magstripe data. The EMV module produces a payment-method token via tokenization; that's all the cart's main MCU ever sees.

**The cart's MCU treats payment-method tokens as opaque.**
The token is a 24-character string. The cart can store it briefly in RAM, send it to the cloud, and then forget it. The token is not a card number — it can't be used to make a transaction without the merchant's tokenization service authorizing it.

**Payment authorization is server-side, in a separate AWS account with PCI scope.**
The cloud's payment service runs in an isolated AWS account that *is* in PCI scope. It receives tokens from the cart, exchanges them with the payment processor for authorizations, returns auth tokens to the cart. The PCI-scope AWS account has cross-account-IAM access from exactly one Lambda function in the main platform account; no other service can reach it.

**The cart cannot complete payment by itself.**
At session-end, the cart hands off to the in-store EMV terminal via BLE proximity. The EMV terminal (PCI-certified, vendor-managed) completes the payment, returns an auth token. The cart sends the auth token plus session contents to the cloud. The cloud reconciles, sends a receipt.

Result: PCI-DSS audit scope is bounded to (a) the EMV-certified NFC reader vendor's certification, (b) the EMV terminal vendor's certification, and (c) our isolated payment-service AWS account. The cart itself, the main cloud platform, the mobile app, the staff tablet, and the ops dashboard are all out of PCI scope.

![How card data stays off the cart. A contactless card — where the PAN and CVV live — taps an EMV-certified NFC module that has its own MCU and runs vendor firmware. The module tokenizes: PAN becomes an opaque token, and only that token crosses the serial line to the cart's ESP32-C3 MCU, which is explicitly out of PCI scope and holds the 24-character token in RAM before dropping it. The cart forwards the token over MQTT to an isolated AWS account that is in PCI scope, reached by exactly one cross-account Lambda, which swaps the token with the payment processor. Payment itself never completes on the cart either: at session-end the cart hands off to the in-store EMV terminal over BLE proximity, and the PCI-certified terminal completes the charge and returns an auth token the cart forwards to the cloud. The result: PCI scope is small — bounded to the EMV-certified NFC reader, the EMV terminal, and the isolated payment-service AWS account — while everything else, the cart and its MCU, the main cloud platform, the mobile app, the staff tablet, and the ops dashboard, is out of scope.](../../assets/blog/prd-part-3-payment-token-flow.svg)

This isolation is worth, in 2023 dollars, somewhere between $400K and $1.5M per year in saved audit and compensating-control costs.

## PII classification (the three-tier model)

The cloud-side data is classified into three tiers, with separate storage paths, IAM policies, and access logging. Same model I've used at every connected-product platform I've owned.

**Tier 1 — non-PII telemetry.**
Anything tied only to a cart ID and a session ID, with no customer attached server-side. Scan events, weight events, health events, fault events. Stored in DynamoDB telemetry, available to analytics, no special access controls beyond ordinary IAM.

**Tier 2 — pseudonymous customer data.**
Customer ID (a stable UUID, not derived from email or payment info), loyalty card number, session history. Stored in Postgres entity store. Can be analyzed at the customer level but cannot be linked to a real person without access to Tier 3.

**Tier 3 — directly identifying PII.**
Email, name, address, payment-method tokens-tied-to-Account, mobile phone number. Stored in a separate Postgres database in an isolated subnet with stricter IAM, two-person access controls for raw access, and full audit logging. Bridged to Tier 2 only via the identity service, which logs every join.

Each tier has a published retention policy:

- **Tier 1**: 18 months hot, then anonymized aggregation, then deleted after 5 years.
- **Tier 2**: lifetime of the account.
- **Tier 3**: lifetime of the account, plus 7 years post-deletion for tax/audit (where required by jurisdiction), then hard-deleted.

GDPR data-subject rights (access, correction, deletion) are honored against Tier 3 directly and propagate to Tier 2. Tier 1 is not affected because it has no PII to delete — the cart-and-session events are not personal data once disconnected from the customer.

![PII in three tiers, with their storage and retention. Tier 1, non-PII telemetry — scans, weight, health, and fault events tied only to a cart-id and session-id with no customer attached — lives in DynamoDB telemetry under ordinary IAM, open to analytics, retained 18 months hot then anonymized to aggregate then deleted at 5 years. Tier 2, pseudonymous customer data — a customer UUID not derived from email, the loyalty card number, and session history — lives in the Postgres entity store, analyzable but not linkable to a person without Tier 3, retained for the lifetime of the account. Tier 3, directly identifying PII — email, name, address, phone, and payment-tokens-tied-to-Account — lives in a separate Postgres database in an isolated subnet with stricter IAM, two-person access, and full audit logging, retained for the account lifetime plus a seven-year tax-and-audit hold, then hard-deleted. Tier 2 and Tier 3 are bridged only via the identity service, which logs every join. GDPR deletion hits Tier 3 and propagates to Tier 2; Tier 1 has no PII left to delete.](../../assets/blog/prd-part-3-pii-tiers.svg)

## The threat model (the high-level)

The PRD includes a STRIDE threat model that runs 14 pages. The summary:

**Threats we considered and have controls for:**

- A stolen cart used outside an authorized store. *Mitigation*: cart cert is bound to a specific store; the cart refuses to operate without an authenticated store-network attestation.
- A malicious customer scanning items and walking out without paying. *Mitigation*: payment at the EMV terminal is required for session completion; an "exit-without-pay" is a flagged fault, alerts staff, and (with weight-sensor evidence) supports loss-prevention.
- A staff member with the override tablet adjusting sessions improperly. *Mitigation*: every staff-tablet override is logged with the staff ID, requires BLE proximity to the cart (preventing remote abuse), and is auditable.
- A rogue firmware build pushed to the fleet. *Mitigation*: OTA requires a signed firmware image; cart's secure element validates the signature against a CA root burnt at factory time; cart bootloader has dual-bank rollback.
- A phishing attack on a staff member that compromises the ops dashboard. *Mitigation*: mandatory hardware-key MFA on dashboard logins; PII access logged and reviewed weekly.
- A compromised LTE-M data plan exposing roaming patterns. *Mitigation*: the cellular module's IMSI is not associated with any human identity; even with full carrier-records access, the most an attacker learns is "this cart was active in this geographic area."

**Threats we explicitly accept as residual:**

- A customer photographing the cart's display to learn another customer's name (if they pair with loyalty card). *Mitigation*: display never shows full name; first-name-only.
- An EMV terminal vendor breach. *Mitigation*: out of our control; certification exists; cyber insurance covers downstream exposure.
- A long-term cryptographic break of ECDSA P-256. *Mitigation*: we'll plan for a CA-rotation in v2; current threat is post-quantum and not v1-relevant.

![The STRIDE threat model in summary, split two ways. On the left, threats considered and controlled, each with its mitigation: a stolen cart used outside its store (cert bound to a store; refuses to run without a store-network attestation); scan-and-walk-out without paying (EMV-terminal payment required to complete, with weight evidence flagging it); staff misusing the override tablet (every override logged with a staff-id, BLE proximity required, fully auditable); rogue firmware pushed to the fleet (signed image, secure element checks against the factory-burnt CA root, A/B rollback); a phished staff member reaching the ops dashboard (mandatory hardware-key MFA, PII access logged and reviewed weekly); and a cellular plan exposing roaming patterns (IMSI tied to no human, worst case is that a cart was active in some area). On the right, threats accepted as residual: shoulder-surfing a name (the display shows first-name-only), an EMV terminal vendor breach (out of our control, vendor cert exists, cyber insurance covers downstream exposure), and a long-term break of P-256 (a CA-rotation is planned for v2; post-quantum is not a v1 threat). Each control answers a specific abuse, and naming what you won't fix is part of the threat model too.](../../assets/blog/prd-part-3-threat-model.svg)

## Cross-border data flows

The cart system is being designed for US launch with planned EU expansion. The PRD calls out four cross-border considerations:

**Data residency.** EU customer PII will live in EU regions only (eu-west-1 or eu-central-1, depending on store location). US PII lives in US regions. We do not co-locate. This costs more in cloud infra but avoids EU-US data-transfer complications.

![PII stays in-region by design. On the left, US regions hold a cloud and a locked store of US customer PII — Tier 3, US data only. On the right, EU regions (eu-west-1 or eu-central-1) hold a cloud and a locked store of EU customer PII — Tier 3, EU data only. A red dashed boundary runs down the middle with a no-crossing symbol: PII is never co-located across regions. The only sanctioned cross-region flow is a thin engineering- and ops-access path, drawn faintly, permitted only under Standard Contractual Clauses and technical-and-organizational measures. Right-to-deletion is tractable precisely because the PII sits in one isolated place per region rather than sprinkled across telemetry — a Tier-3 deletion lands within 30 days in any region.](../../assets/blog/prd-part-3-data-residency.svg)

**Standard Contractual Clauses.** For any unavoidable data flow between regions (engineering access, ops dashboard from US team), SCCs will be signed with appropriate technical and organizational measures.

**Right to deletion.** Tier 3 PII deletion can be honored within 30 days for any region. The cloud's PII isolation makes this tractable; if PII were sprinkled across telemetry, this requirement would be far harder.

**Tax handling.** Sales tax and VAT computation are integrated with the store's POS system. We don't make tax decisions; we forward sale data to the store's tax engine and surface the resulting receipt to the customer.

## What this PRD prevents

A useful exercise: look at the PRD and ask "what bad outcome does each section prevent?" The Part 3 sections specifically prevent:

- A PCI-DSS audit failure (avoided by scope minimization).
- A GDPR fine (avoided by data residency + retention + right-to-deletion infrastructure).
- A cross-tenant PII leak (avoided by the three-tier classification).
- A "single key compromises everything" failure (avoided by cart-cert / customer-account / session-id separation).
- A "we can't ship to Europe" project delay 18 months in (avoided by designing for residency from day one).

The cost of Part 3 has been approximately three weeks of my time, two weeks of legal review, and one week of security engineering review. The return on that investment is measured in not-having-to-rebuild for the entire life of the product.

## The PRD's final paragraph

The actual final paragraph of the PRD:

> *This document is the v1 baseline. Every variance from it requires explicit approval from product, engineering, security, and legal. The product we ship in v1 will be the product described here. Subsequent versions will revise this document; this version is the contract for the first twelve months of build.*

Next in the series: [the first-month-of-build post](/blog/building-first-connected-product/), where the PRD meets reality.
