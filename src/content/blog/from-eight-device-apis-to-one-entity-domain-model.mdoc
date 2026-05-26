---
title: "From eight device APIs to one entity domain model"
date: 2018-04-17T10:15:00-04:00
category: tools
tags:
  - api-platform
  - domain-driven-design
  - consolidation
  - rest
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 3
excerpt: "The connected-health portfolio I inherited has eight separate device APIs in production. Each has its own user model, its own session contract."
pullquote: "Eight APIs with eight definitions of 'user' aren't a portfolio. They're a billing engineer's nightmare. Consolidation isn't an aesthetic preference."
cover: "../../assets/blog/from-eight-device-apis-to-one-entity-domain-model-cover.svg"
coverAlt: "Eight separate, mismatched device API boxes on the left — each with its own clashing shape for User, Session, and auth — converging through a funnel into a single clean five-entity domain model on the right: Account, Device, Consumable, Session, Event."
---

When I took the platform role in September 2017, the connected-health portfolio had eight separate device APIs in production. The adult toothbrush had one. The kids' brush had another. The interdental device had a third. There were three more for other body-care lines, plus two legacy services that were technically deprecated but still serving traffic. Each had been built by a different product team at a different time with a different stack.

The first quarter of my tenure was diagnostic. The second quarter — just finished — produced the consolidation plan. The next four quarters are the migration. This is what we're doing and how.

![The mess on the left, the target on the right. Eight separate device API boxes — adult brush, kids' brush, interdental, three body-care lines, two deprecated legacy services — each drawn with its own clashing shape for User, its own Session concept, and its own auth scheme. Arrows funnel all eight through a consolidation gate into a single shared entity domain model on the right.](../../assets/blog/eight-apis-to-one-model.svg)

## What "eight APIs" actually means

Each device line has:

- Its own definition of `User` (email-only in some, email+phone+DOB in others, OAuth-federated in two).
- Its own concept of `Session` (the toothbrushes have brushing sessions, the interdental has flossing sessions, body-care has usage events).
- Its own auth (some use OAuth 2.0 with the internal IDP, some use per-device tokens, two use custom HMAC headers).
- Its own analytics pipeline (some write to Redshift, some to a third-party warehouse, the legacy two write to flat files in S3).
- Its own SDK for the mobile app (each app team integrated a different SDK).

A single user with a brush and an interdental device has two accounts, two SDK integrations, and zero shared session history. From a product perspective, "see your full oral-care timeline in one place" is a feature request that doesn't fit without platform work first. From a billing-engineering perspective, deduplicating that user across systems for marketing is a quarterly fire drill.

## The domain model we landed on

I led a six-week design exercise with senior engineers from each product line, plus product and privacy. We came out the other end (last month) with a shared entity model:

- **Account**: the human, with one identity (email + DOB as needed) and a privacy classification tier.
- **Device**: a physical object with a serial number, a hardware revision, a firmware version, and a product type. Devices belong to Accounts (via a join entity that supports transfer of ownership).
- **Consumable**: brush heads, in our context. A Consumable has a type, an attached-at timestamp, and a lifetime estimate. Consumables belong to Devices.
- **Session**: a discrete usage event. A Session has a Device, an optional Consumable, a start and duration, and a payload of measurements. Sessions belong to Accounts via the Device join.
- **Event**: a non-session occurrence. Battery low, firmware upgrade complete, device unbonded. Events are append-only and feed analytics.

Five entities. They cover every device line we have. They cover the ones the roadmap is adding through 2019.

![The five-entity domain model and how they relate. An Account (the human, one identity, a privacy tier) owns many Devices through an ownership join that supports transfer. A Device (serial, hardware revision, firmware version, product type) holds many Consumables (brush heads, with an attached-at timestamp and a lifetime estimate) and produces many Sessions and Events. A Session (start, duration, a measurement payload) references its Device and optionally the Consumable in use; an Event (battery-low, firmware-upgrade-complete, device-unbonded) is append-only and feeds analytics. Cardinality is marked one-to-many on every relationship.](../../assets/blog/entity-domain-model.svg)

The shape that matters is the spine: everything hangs off **Account → Device**, and Session and Event both anchor back to a real Account through the Device they came from. That's the property the old world didn't have — no event in any of the eight services could be reliably traced to a single human without a deduplication job. Here it's a foreign key.

## The conversation that made it work

Domain consolidation is 20% modeling and 80% getting product teams to give up sovereignty. The conversation that broke the logjam, almost verbatim, in a room with the interdental product manager last month:

> *Me: "I can rebuild your service to use the shared domain model in eight weeks. You'll have one engineer to integrate the new SDK in the app, three weeks of effort. After that, every feature in the platform shows up in your product for free — joined timelines, shared analytics, the new dentist portal."*
>
> *PM: "What do I lose?"*
>
> *Me: "Eight weeks of headcount you weren't going to spend on this. And the ability to ship a one-off auth scheme next time you have a new device type."*
>
> *PM: "I have never wanted to ship a one-off auth scheme."*

That kind of trade has been repeatable. I have a slide that says "what you gain / what you lose / what it costs you" for every product line, and the column where I name what they actually give up is always shorter than the gain column once we've talked through it.

## The API surface over the model

Settling the entities is the hard 80%. The shape of the API on top of them is the easier 20%, but it's where I had to make a call I expect to get second-guessed, so I'll show my work.

The platform exposes a **resource-oriented REST API** — `/v2/accounts/{id}`, `/v2/devices/{serial}`, `/v2/devices/{serial}/sessions`. Five entities, predictable nesting, JSON over HTTPS. The runtime is AWS API Gateway in front of Lambda, with the gateway doing JSON-schema request validation on the way in so a malformed body never reaches a function. Nothing exotic — that's the point. Every mobile engineer on every one of those app teams already knows how to consume REST, and the institutional muscle for caching, pagination, and versioning a REST surface is decades deep. For a platform whose first job is to *stop being eight things*, the boring choice is the correct one.

I did seriously look at the alternative. The "see your full oral-care timeline" feature is exactly the multi-entity, nested read that REST is clumsy at — fetching an Account, its Devices, each Device's recent Sessions, and the attached Consumable is four or five round trips or a pile of bespoke `?include=` query params. **GraphQL** solves precisely that: the client asks for the graph it wants in one query, and our five-entity model is, almost literally, a graph already. Facebook open-sourced it in 2015 and the tooling is maturing fast; the mobile leads have been reading about it.

I'm not building on it yet, and the reason is risk, not taste. It's young, the server-side libraries are still churning, and — the real blocker — I can't put a brand-new query layer on the critical path of a migration whose entire selling point to the product teams is *low risk, low effort*. The move I'm actually making is to model the domain so a GraphQL layer could be laid over the same entities later without reshaping anything underneath. The entities are the contract; REST is just the first projection of them. If GraphQL is the right read API in 2019, the model won't have to change to get there.

![Two API projections over the same five-entity model. On the left, the REST surface I'm shipping now: separate endpoints for accounts, devices, and nested sessions, with a multi-device timeline read costing four or five round trips. On the right, a GraphQL layer I'm explicitly leaving for later: one query returns the Account-Device-Session-Consumable graph in a single request. Both sit on the identical domain model underneath, labelled as the durable contract; the API style is just a projection of it.](../../assets/blog/rest-graphql-projection.svg)

## The strangler-fig migration

Each existing API stays live during the migration. The new platform exposes equivalent endpoints under `/v2/`. The mobile SDKs are being updated to dual-write — every event posted goes to both the old service and the new platform. Reconciliation runs nightly. After 30 days of clean reconciliation per device line, we cut reads over to v2. After 90 days, we shut down the old write path.

![The strangler-fig migration in three phases for one device line. Phase one, dual-write: the mobile SDK posts every event to both the live legacy service and the new v2 platform, and a nightly reconciliation job compares the two stores. Phase two, after thirty days of clean reconciliation: reads cut over to v2 while writes still go to both. Phase three, after ninety days: the old write path is shut off and the legacy service is drained, leaving only the v2 platform. The legacy box shrinks across the three phases as the v2 box becomes the system of record.](../../assets/blog/strangler-fig-migration.svg)

The adult toothbrush is migrating first — biggest user base, most engineering investment available, most to gain from the new dentist portal feature. We're estimating 14 weeks end to end. The kids' brush is second; we expect 8 weeks (we should have learned by then). The interdental device is third; 6 weeks. The two legacy services will be drained by attrition — write-only adapters, no further investment, deprecated in the apps after one more release cycle.

Projected total elapsed: roughly 13 months from the design exercise to the last device line fully on the new platform. That puts the finish line around March 2019.

## What this enables

Three things, in roughly the order they should pay off.

**One: shared OTA.** Once every device line is on the same platform, the OTA pipeline becomes a single product instead of N copies. We'll be able to ship firmware updates to the secondary devices using the primary pipeline with no additional infrastructure. The cost-per-device-line for new firmware features should drop to near-zero.

**Two: the dentist portal.** A multi-device timeline for a single patient becomes a one-week query, not a six-week integration. The dentist portal would be impossible at any reasonable cost on the old fragmented architecture.

**Three: the next-device experience.** When the product team adds the next brush model later this year, the API integration should be three days. Not three weeks. Not three months. The hardware team designs a new firmware build, sends us a sample device, and we onboard it through the existing API.

## The cost

I won't pretend this is free. We'll burn about 2.5 FTE-years on the consolidation, drawn from the engineering team. The legacy services keep paging two of those engineers during their migrations. I've already lost one product manager partly because the migration delayed a feature they cared about by a quarter. Two security audits will have to be redone because the model changed mid-cycle.

The honest assessment is that the consolidation is the highest-leverage thing I'm doing in this role. It should pay for itself within the first year and compound every year after.

## The takeaway for any platform leader

If you're inheriting a portfolio of connected products built at different times by different teams, the entity domain model is the highest-leverage place to invest. The hardware will refresh on its own cadence. The mobile apps will rewrite themselves on the front-end framework du jour. The cloud infrastructure will change vendors twice. The domain model — what is a User, what is a Device, what is a Session — is the thing that survives all of it.

If the model is wrong, every feature in the platform pays tax on it forever. If the model is right, the next ten years of product launches get cheaper.

The [next post](/blog/phone-as-gateway-auth-model/) will be on the auth model we're designing to anchor every event in this domain to a real device and a real human — without the device ever talking to the cloud directly.
