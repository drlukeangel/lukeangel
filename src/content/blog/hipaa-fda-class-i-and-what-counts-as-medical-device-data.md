---
title: HIPAA, FDA Class I, and what counts as medical-device data
date: 2018-01-22
category: tools
tags:
  - hipaa
  - medical-device
  - fda
  - data-privacy
  - api-platform
excerpt: "Before the API platform can matter, I had to answer a narrower question than 'are we a medical device.' The one that decides the architecture is: which fields are regulated, and what does that classification force on every store they touch?"
pullquote: >-
  A brushing session by itself is product analytics. The same session tagged
  with a name, a birthday, and a dentist's email is protected health
  information. Nothing about the bytes changed — what changed is what they're
  now attached to, and that is the whole job.
cover: "../../assets/blog/hipaa-fda-class-i-medical-device-data-cover.svg"
coverAlt: "A single stream of device-event fields fanning out at a sorting gate into three lanes — open product telemetry, a pseudonymous middle lane, and a locked identifiable lane behind a separate key — showing that what regulates a datum is what it is joined to, not the datum itself."
notebook: building-medical-iot-connected-products
notebookOrder: 2
faq: []
featured: false
draft: false
---
Four months into the platform job, I spent four hours in a conference room with the privacy office and a printout of the device-event payload. Every field, one line at a time. Is brushing *duration* protected health information? Is a *brush-head-replacement* timestamp? Is the *device serial number*? I came in expecting a yes/no per field and left understanding that I'd asked the wrong question. Almost no single field is regulated on its own. What regulates a field is **what it's joined to** — and that turns a compliance question into an architecture question, which is the only reason it landed on my desk.

This is the post the [last one](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/) promised. I'd just spent six weeks establishing that the phone is a flaky gateway and the cloud has to be built for replay. Before any of that architecture earns its keep, there's a more basic question: *what kind of product is this, legally* — and which bytes flowing through the platform carry that weight?

## Two regimes, and the one that's coming

Three things govern this product, and on today's date they're at very different distances.

**FDA Class I** is here now. The connected toothbrushes are Class I medical devices — the lowest-risk tier, general controls only, no premarket submission. "General controls" still means the device does what its labeling claims, manufacturing follows the Quality System Regulation (21 CFR 820), adverse events get reported under MDR, and the device is registered and listed. None of that is the API platform's problem directly. The platform's exposure to the FDA is narrower and sharper, and I'll get to it.

**HIPAA** is here now, but conditionally. HIPAA bites when there's protected health information — health data tied to an identifiable person — held by a *covered entity* or its *business associate*. Selling a toothbrush direct to a consumer makes the company neither. We're a manufacturer with an app, not a clinic. But we're actively chasing dental-practice partnerships, and the day a practice pulls our data into a patient's chart, the company becomes that practice's business associate and signs a BAA. HIPAA doesn't apply to the platform today; it applies the instant a specific deal closes. The architecture has to be ready to flip that switch per-partner without rewiring.

**GDPR** is not here yet — it starts enforcing **25 May 2018**, four months out. I'm writing the classification now specifically so we're not retrofitting in April. It widens the aperture in a way US privacy law doesn't: under GDPR, the *pseudonymous* user IDs I'm about to describe are still personal data, and an EU user gets access and erasure rights over them. I'm designing to the coming rule, not the current one, because the install base already has European users and the regulation won't wait for us to be ready.

That's the whole regulatory weather. Everything below is how I turned it into storage decisions.

## The line that actually defines "medical-device data"

Here's the distinction the four-hour meeting was really about, and it's the one most people get backwards. The thing that makes data *medical-device data* — the thing the FDA cares about — isn't the sensor. It's the **claim**.

The FDA's *General Wellness: Policy for Low Risk Devices* (final guidance, 2016) draws the bright line I lived against. A product that promotes a general healthy lifestyle — "brush twice a day, you'll have healthier habits" — is a **general wellness** product, and the FDA exercises enforcement discretion: it doesn't regulate the software. The moment the same product makes a claim about a **specific disease or condition** — "this detects early gingivitis," "this device treats your periodontitis" — it's no longer wellness. It's a medical claim, and the data feeding that claim, and the software making it, come into scope.

So whether our coverage estimate is "medical-device data" is not a property of the coverage estimate. It's a property of *what marketing writes on the box*. The same quadrant-coverage number is wellness data under "build better brushing habits" and regulated data under "detects areas you're missing that lead to gum disease." That's terrifying from an engineering seat, because it means a feature can change regulatory class without a single line of firmware changing — someone in another building edits a claim.

![One sensor reading — quadrant 3 brushed 14 seconds — sits at the top, then the same bytes fork down two paths based only on what marketing writes on the box. The left path, a general-wellness claim like build better brushing habits, lands in general wellness with a green check: the FDA exercises enforcement discretion under the 2016 low-risk wellness guidance, treated as product analytics. The right path, a specific-disease claim like detects areas linked to gum disease, lands in a medical claim marked with a red cross: now in FDA scope, the data and software feeding the claim come into scope with no firmware changed. The caption notes the platform therefore stores the raw signal and keeps claims thin and movable, never baked into the data contract.](../../assets/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data-fig-1.svg)

![A decision tree titled is this regulated medical-device data. First branch: does the product or feature make a claim about a specific disease or condition. The no branch leads to general wellness with a note that the FDA exercises enforcement discretion under the 2016 low-risk wellness guidance, treated as product analytics. The yes branch leads to a medical claim, now in FDA scope. From there a second branch: is the data joined to an identifiable person. The no branch is de-identified clinical-grade data. The yes branch reaches protected health information, and a third branch asks is the company a covered entity or business associate for this flow. Only when that is yes does HIPAA apply with full safeguards. The tree shows that a single sensor reading can land in any leaf depending on the claim and the join, not on the bytes.](../../assets/blog/hipaa-fda-regulated-data-decision-tree.svg)

The defensive move the privacy office and I agreed on: the platform stores and serves the raw signal, and **claims live in the application and marketing layer, never baked into the data contract.** The event store knows "quadrant 3 brushed 14 seconds." It does not know, and must not encode, "user is under-brushing in a way that indicates disease risk." Keep the data dumb and the claims thin and movable, and a marketing decision can't silently drag the whole telemetry pipeline into 21 CFR scope.

## What we actually store

To classify, you have to enumerate. Per session, the device emits:

- Session start timestamp (local + UTC offset)
- Duration brushed
- Pressure events (when the user presses too hard and the brush vibrates to back off)
- Coverage estimate (which quadrants, how long, derived from the device's motion sensors)
- Brush-head ID at the time of session
- Battery level at session start
- Firmware version

Per device:

- Device serial number (the manufacturing identifier, baked into firmware)
- Bluetooth address (the over-the-air identifier)
- Hardware revision

Per user, in the app:

- Email
- Name
- Date of birth (optional — used by the kids' brush for age-appropriate programs)
- Dentist (optional — for the dentist-portal feature in design)
- Linked device serials

Read that list and the trap is obvious in hindsight: nothing in the *device* block is health information, and nothing in the *user* block is, on its own. Email is just email. Coverage is just a number. The regulated thing only exists at the **join** — the row that says *this person* brushed *this badly*. Which means the architecture problem isn't protecting fields. It's controlling joins.

![Two boxes side by side, neither of them health information on its own. The left box, device and telemetry, lists duration brushed, pressure events, coverage estimate, and brush-head ID and serial — just numbers, no person attached. The right box, user in the app, lists email, name, date of birth, and dentist — just identity, no health claim alone. Red join arrows point inward from both boxes to a single highlighted row at the bottom that reads this person brushed this badly, labelled the one row that is protected health information. The caption reads: so the architecture problem isn't protecting fields — it's controlling joins.](../../assets/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data-fig-2.svg)

## The three tiers we landed on

The privacy office and I settled on three tiers, defined not by sensitivity-in-the-abstract but by *what identity is attached server-side.*

**Tier 1 — device telemetry, no identity.** Anything keyed only to a device serial, with no user identity attached on the server. Duration, pressure, coverage, brush-head ID. Ordinary product analytics. Lands in the event store, flows to the data warehouse, no special handling. The overwhelming majority of events live here, and they're allowed to.

**Tier 2 — pseudonymous, user-linked.** The same telemetry joined to a stable user ID that is *not* derived from email or any directly identifying field — a random surrogate key, with the mapping held in a separate table. You can ask cohort questions of Tier 2 ("users who replace heads on schedule have 12% fewer pressure events") without ever resolving a row to a human. Under HIPAA's analysis this isn't PHI, because it isn't identifiable without the lookup. Under the GDPR that's coming in May, it *is* personal data — pseudonymous, but still in scope — which is exactly why I keep the mapping table as its own access-controlled thing rather than a column.

**Tier 3 — identifiable.** Identity (email, name, DOB) joined to brushing data. This is the only tier HIPAA can ever touch. Stored apart, stricter access, audit logging, encryption at rest under its own key, and a published deletion path.

![A data-classification table mapping the device-event and user fields into three tiers. Tier 1, device telemetry no identity: keyed only to a device serial, examples brushing duration, pressure events, coverage estimate, brush-head ID; treated as product analytics; no PII; not PHI; not in GDPR scope. Tier 2, pseudonymous user-linked: the same telemetry joined to a random surrogate user ID with the mapping held separately; cohort-analyzable; not PHI because not identifiable without the lookup table, but personal data under the coming GDPR. Tier 3, identifiable: identity such as email, name, date of birth joined to brushing data; the only tier HIPAA can touch; PII yes, PHI when a business-associate flow is active, GDPR in scope. An arrow notes that a record only moves up a tier through a logged join service, never automatically.](../../assets/blog/hipaa-fda-data-classification-tiers.svg)

The point of defining tiers by *attached identity* rather than by field name is that it survives new fields. When the next sensor or feature shows up, I don't relitigate its sensitivity in the abstract — I ask the only question that matters: *does it arrive with identity, and can it be joined to it?* The tier falls out of that.

## What the classification forces on the platform

Three architectural consequences, and they're the reason this post exists before the domain-model post.

**Default to Tier 1; promote only through a logged join.** Device events land in the Tier 1 store, full stop. A record is *promoted* to Tier 2 or Tier 3 only by an explicit join service, and only with a logged reason and actor. Promotion is never a side effect of a write. This inverts the usual instinct — most pipelines collect everything identifiable and lock it down later. We collect de-identified by default and *earn* our way up, per record, on the record. The audit log of promotions is, in effect, the map of where our regulatory exposure actually is.

![The inverted pipeline. Across the top, greyed out, the usual instinct: stamp identity at ingest so every event is Tier 3, which drags the whole telemetry firehose into the regulated zone — encrypt and isolate everything, more risk not less. Below, what we built: device events with no identity attached land by default in the Tier 1 de-identified store, full stop. The only path upward is a lock-gated join service that is explicit and logged with a reason and actor; only through it can a record be promoted to Tier 2 pseudonymous or Tier 3 identifiable. A note reads that the promotion log is the map of where regulatory exposure actually is, and the caption: your surface shrinks to exactly the rows you chose to elevate — the set you can hand an auditor without a sweep.](../../assets/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data-fig-3.svg)

**No identity in device-event payloads — ever.** The phone attaches a user ID to an event *before* posting it to the cloud; the device firmware never knows who owns it. This is a security property dressed as a privacy rule. Recall from the [BLE work](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/) that the device exposes its data as GATT characteristics over a link any bonded phone can read. If a firmware bug ever leaks data through an unauthorized characteristic read, the worst case is Tier 1 — anonymous device telemetry, no person attached. The identity lives one hop away, on the phone, behind the app's auth. I expect that to be the single most useful property we have the first time someone runs a security audit against the brush.

**The dentist portal is a separate subsystem, not a feature flag.** The dentist-portal work (in design now) lives behind its own authentication and audit boundary, physically separate from the consumer app. A practice that signs a BAA can reach the consented patients' data through *that* door — and the consumer API can never expose those joins, because it has no code path to them. A BAA-gated flow you can turn on per-partner is the switch I mentioned up top; building it as a distinct subsystem is what makes the switch real instead of aspirational.

## Encryption and isolation — what 2018 actually gives me

End to end: the device-to-phone leg is BLE-encrypted under the long-term key from bonding; the phone-to-cloud leg is **TLS 1.2** over Wi-Fi or LTE. Inside the cloud, everything is encrypted at rest with KMS, and Tier 3 gets its own KMS key under stricter IAM.

The part worth being concrete about — because it's where the era bites — is *where* Tier 3 can live. AWS will sign a BAA, but only a subset of services are HIPAA-eligible, and the list in early 2018 is shorter than people assume. The managed primitives I'd reach for reflexively aren't all on it yet. Our high-volume Tier 1 event store leans on DynamoDB, which is **not** HIPAA-eligible at this writing — fine, because Tier 1 carries no PHI. But that means Tier 3 can't just be "the same store with a flag." Identifiable data goes into HIPAA-eligible services: RDS and S3 with encryption, on EC2 capacity we're allowed to run PHI on, under the signed BAA. The tiering isn't only a privacy model; it's the thing that lets the bulk of our data sit on the convenient, cheap, *not-yet-eligible* service while the small regulated slice sits on the eligible one. If I'd designed a single identifiable store, I'd have had to put *all* of it on the eligible subset and pay for that everywhere.

For HIPAA-business-associate flows specifically, Tier 3 lives in a **separate AWS account** from the rest of the platform, reached by cross-account IAM roles for the few services that need it. The account boundary is the strongest isolation primitive AWS offers — stronger than IAM policy alone, because a misconfigured policy in the main account can't reach across an account line it was never granted. As the dentist-partnership product spins up, that boundary is what I'll point an auditor at.

![A diagram of the storage and isolation consequences of the three tiers. On the left, device events arrive over TLS 1.2 and land by default in the Tier 1 event store, drawn on DynamoDB and labelled not HIPAA-eligible, no PHI, flowing onward to the data warehouse. A logged join service is the only path upward. Tier 2 pseudonymous data sits with its identity-mapping table held separately. On the right, inside a separate AWS account boundary, Tier 3 identifiable data sits in HIPAA-eligible RDS and S3, encrypted under its own KMS key with stricter IAM and audit logging, reached only by cross-account roles. A dentist-portal subsystem behind its own auth boundary is the sole consumer-facing path that can read Tier 3, gated on a signed BAA. The consumer app API has no edge to Tier 3 at all.](../../assets/blog/hipaa-fda-storage-isolation-consequences.svg)

## Retention, because someone always forgets it

Consumer data is retained for the life of the account. Tier 1 telemetry is kept 18 months, then rolled into monthly aggregates — small enough to keep forever, identifiable of nothing. Tier 3 under a BAA follows the BAA's terms, which for clinical records tend to land around seven years, with deletion on patient request through a documented process. Writing the deletion process down now matters more than it looks: the GDPR erasure right arriving in May means "we can delete a person on request" stops being a nice-to-have and becomes a thing I have to be able to *demonstrate*, across Tier 2 and Tier 3 both. A deletion you can't prove you performed is, to a regulator, a deletion you didn't perform.

## What it cost me to get here

I'll name the mistake, because it shaped the whole tiering. My first instinct — straight from web-services habits — was to mint one durable user ID and stamp it on every event at ingestion, identity and all, then restrict reads later. Clean joins, simple pipeline, one ID to rule them all. The privacy office killed it in about ten minutes, and they were right: that design makes *every* event Tier 3 the moment it lands, drags the entire high-volume telemetry stream into the regulated, HIPAA-eligible, separate-account world, and means a single over-broad read grant exposes identifiable health data at fleet scale. I'd have been encrypting and isolating *everything* — paying the cost of PHI handling on millions of events that didn't need it — and still carrying more risk, not less, because the identifiable join was everywhere instead of nowhere.

The reframe that fixed it is the one principle I'd hand the next team: **don't ask how sensitive a field is; ask what it's joined to, and default to joining it to nothing.** Sensitivity is a property of relationships, not values. Build the pipeline so the default state of every datum is de-identified, make every promotion an explicit, logged act, and your regulatory surface shrinks to exactly the rows you chose to elevate — which is also exactly the set you can hand an auditor without a sweep.

## What's next

All of this presumes one thing I haven't built yet: a clean model of which entities exist and which are allowed to touch which. You can't enforce "promote only through a logged join" if you have eight different definitions of "user" and "device" scattered across eight APIs — and that's exactly the portfolio I inherited. The next post takes on [consolidating those eight device APIs into one entity domain model](/blog/from-eight-device-apis-to-one-entity-domain-model/), because the classification I just spent four hours and twelve memo pages on is only as good as the domain it's enforced against.
