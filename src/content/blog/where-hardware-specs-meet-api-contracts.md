---
title: "Where hardware specs meet API contracts — the room"
date: 2019-05-13T11:00:00-04:00
category: programs
tags:
  - product-management
  - api-platform
  - cross-functional
  - hardware
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 6
excerpt: "Connected hardware products live or die in the cross-functional meeting where hardware, firmware, API, mobile, and ops engineers negotiate."
pullquote: "The hardware team ships every 18 months. The API team ships every two weeks. The forward-compatibility you build into the API contract is the bridge between those two clocks."
cover: "../../assets/blog/where-hardware-specs-meet-api-contracts-cover.png"
coverAlt: "Where hardware specs meet API contracts — the room"
---

A connected hardware product has four engineering disciplines that have to ship the same feature at the same time:

- **Hardware engineering.** Designs the physical product, picks the chips, designs the PCB. Ships on an 18-to-24-month cadence.
- **Firmware engineering.** Writes the code that runs on the device. Ships on a 6-month cadence, give or take.
- **API platform.** Owns the cloud-side contract that the device and the mobile app both talk to. Ships every two weeks.
- **Mobile engineering.** Builds the iOS and Android apps. Ships every two weeks, gated by app-store review.

Four disciplines, four cadences spanning two orders of magnitude. The feature only ships when all four agree on what it does, and the disagreements happen in a specific meeting that has become the most important recurring meeting on my calendar.

## The brush-head identification feature, as a worked example

The adult brush has brush heads with embedded chips that identify the head type. The brush reads the head ID via a small contact-based interface when the head is attached. From there, the platform tracks:

- Which head type the user has attached at any given session.
- How long that specific head has been in use.
- When the head should be replaced (different head types have different recommended lifetimes).
- Which sessions used which head, for analytics.

The feature spans all four disciplines:

- **Hardware** designed the chip interface, the contact pads on the brush, and the chip-embedded-in-head physical assembly.
- **Firmware** reads the chip and exposes the head ID over a BLE characteristic.
- **API platform** models the Consumable entity (see [the entity domain model post](/blog/from-eight-device-apis-to-one-entity-domain-model/)), associates heads with sessions, and exposes it through the timeline endpoints.
- **Mobile** renders the head info in the app and surfaces the "time to replace" notification.

For this feature to work, all four teams have to agree on:

- The byte format of the head ID (hardware/firmware contract).
- The BLE characteristic UUID and read/write semantics (firmware/mobile contract).
- The Consumable entity shape on the cloud (API/mobile contract).
- The product behavior — what the user sees, when (product/everyone).

Get any of those contracts wrong and the feature ships late, or wrong, or has to be ripped out in firmware and re-released six months later.

## The mechanics of the meeting

We run a weekly "device platform sync" with one representative from each discipline. Sixty minutes. The agenda has four items:

1. **Decisions needed this week.** What contracts have to be locked, by whom, before someone is blocked.
2. **Contracts at risk.** What was agreed two months ago but is now being questioned by one of the teams as they implement.
3. **Lookahead.** What's in next quarter's roadmap and which contracts will be needed by when.
4. **Carryover from last week.** What didn't get decided last time and why.

That agenda sounds bureaucratic. It is bureaucratic. The bureaucracy is doing actual work — it's forcing the four teams to commit to contracts before they're forced into them by a missed deadline.

The single most important decision-making rule I hold to: **contracts get versioned, not changed.** If the head-ID byte format was agreed at v1, you don't change v1. You ship a v2 alongside. The hardware in the field running v1 firmware keeps reading the v1 contract. The new hardware shipping with v2 firmware reads v2. The API supports both, forever, until the v1 fleet is small enough to deprecate (which in connected-hardware usually means 5+ years).

This rule is unpopular when it's first stated. After a year of running with it, the team has stopped questioning it.

## The forward-compat trick: capabilities

The device-to-API contract has a capabilities bitmap. On first connect after pairing, the device sends the API a list of what it can do — `head_id_v1`, `pressure_sensing`, `coverage_v2`, etc. The API responds with its own capabilities list — `head_id_v1`, `pressure_sensing`, `coverage_v1` (note the version mismatch).

Both sides then operate on the intersection. The device knows not to send `coverage_v2` events if the API doesn't understand them yet. The API knows not to expose head-type-aware features for devices that don't report a head ID.

This lets us ship new features on the API side before the firmware-on-the-field has caught up. New hardware revs can announce new capabilities the API doesn't know about yet (the API ignores them, gracefully). Old hardware can keep using the old capability set forever.

Negotiating that bitmap into existence took six weeks. It's already paid for itself many times over.

## Who owns the gray zone

The boundary between "firmware" and "API platform" is a gray zone. Whose code parses the head-ID byte format? Whose code computes "time since attached, in hours"? Whose code decides when to notify the user that the head needs replacement?

The default in most organizations is "nobody owns it, and it gets done by whichever team is most desperate this sprint." That's how features end up split between three codebases with three different mental models of the same calculation.

The convention I hold to: **the closest layer to the data owns the canonical interpretation.** The head ID byte format is owned by firmware, because firmware is what reads the chip. The "time since attached" calculation is owned by the API, because the API is what aggregates sessions across time. The "notify the user" decision is owned by the API for the cloud-driven notification and by mobile for the in-app surface.

The team that owns an interpretation also owns the contract that documents it. When the contract changes, that team owns the migration plan.

## What product managers contribute to the meeting

The product manager in the room isn't there as a feature requester. They're there as the arbiter of "what does the user see, and when." When the four engineering teams are arguing about whether the head-ID error case should fail closed (no head ID = don't track this session) or fail open (no head ID = track the session, mark the head as unknown), the product manager is the one who decides based on the user-facing tradeoff.

In our case: fail open, mark unknown. Users brush with off-brand heads occasionally, and refusing to track those sessions is worse than tracking them imperfectly.

That decision is a five-minute conversation if the product manager is in the room and senior. It's a five-week stall if they're not.

## The 18-month-vs-2-week problem

The deepest tension in this whole structure is the cadence mismatch. Hardware ships every 18 months. API ships every two weeks. That means **on any given Tuesday, the API team can ship a feature that the firmware can't fully support for another 14 months.**

The way we manage this:

- **The API can lead.** New API features that don't require firmware support ship as soon as they're ready. New analytics, new aggregations, new dashboard features — the API is the fast layer.
- **The API cannot break firmware.** Backward compat with every shipping firmware version, forever. The capabilities bitmap is what makes this possible.
- **The firmware can lead too.** New firmware features that don't require API support can ship without waiting. The capabilities bitmap lets the firmware report new capabilities; the API learns to use them eventually.
- **Joint features wait for the slow team.** A feature that needs both new firmware *and* new API ships when the firmware does. The API team builds their half in advance and feature-flags it.

This is the model that lets a fast-moving cloud platform live on top of a slow-moving hardware product without anyone breaking anyone else.

## What I want to carry forward

Three principles from running the cross-functional product room:

1. **The weekly contract meeting is non-optional.** It's not a status meeting. It's the place where contracts get committed, and the absence of it shows up as cross-team thrash within a quarter.
2. **Contracts version up, never change.** The fleet in the field is the constraint. Respect it forever.
3. **Closest layer to the data owns the interpretation.** Don't let business logic about a piece of data live in three different codebases.

The [series closer](/blog/cutting-my-teeth-on-medical-iot-products/) will be the retrospective on the whole two-year arc — what worked, what didn't, what I'd undo.
