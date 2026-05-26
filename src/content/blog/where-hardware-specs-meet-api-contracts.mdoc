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
excerpt: "A connected health product is two teams on two clocks — hardware on an 18-month cadence, the API platform on a two-week one — reconciling a 20-byte BLE pipe against a data model that wants to be rich. The room where they negotiate is the most important meeting on my calendar."
pullquote: "The hardware team ships every 18 months. The API team ships every two weeks. The capabilities the device announces are the only bridge between those two clocks — they're what lets the fast side move without breaking the slow side in the field."
cover: "../../assets/blog/where-hardware-specs-meet-api-contracts-cover.svg"
coverAlt: "A slow, large hardware gear and a small, fast API gear meshing at a single shared seam — the data contract — drawn as the point where an 18-month hardware cadence and a two-week software cadence have to agree."
---

There's a recurring sixty-minute meeting on my calendar that I'd defend before almost any other. Four people, one from each engineering discipline that has to ship a connected-health feature: hardware, firmware, the API platform I run, and mobile. We call it the device platform sync, and what actually happens in that room is a negotiation between a 20-byte radio and a data model that wants to be rich — between what the silicon can physically do and what the app expects to read.

Get that negotiation right and a feature ships on time across four teams moving at wildly different speeds. Get it wrong and you ship a **starved device** — hardware that can't feed the data model — or a **starved data model** — a contract that throws away most of what the sensor measured. On a [connected-health platform](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/), where a session record might one day be quoted to a clinician, neither failure is cosmetic.

## Four disciplines, four clocks

Start with the structural problem, because it's the thing the room exists to manage. The same feature has to ship from four teams whose release cadences span two orders of magnitude:

- **Hardware engineering.** Picks the chips, lays out the PCB, designs the physical product. Once a board is in production it is *frozen* — the next revision is 18 to 24 months out.
- **Firmware engineering.** Writes the code on the device. Ships maybe twice a year, and every update has to survive being [pushed through a phone over Bluetooth](/blog/ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone/) to a fleet that's offline 23 hours a day.
- **API platform.** Owns the cloud contract the device and app both speak to. Ships every two weeks.
- **Mobile.** Builds the iOS and Android apps. Two-week cadence, gated by app-store review.

![Four engineering disciplines on four release cadences spanning two orders of magnitude. Hardware ships roughly every eighteen to twenty-four months and is frozen once in production; firmware ships about twice a year; the API platform ships every two weeks; mobile ships every two weeks gated by app-store review. The bar lengths are drawn to scale, showing the hardware cadence dwarfing the others, with a vertical line marking that a joint feature can only ship when the slowest team — hardware — is ready.](../../assets/blog/hardware-api-four-cadences.svg)

A feature only ships when all four agree on what it does. The disagreements are never about effort or intent; they're about **contracts** — the byte format of a sensor reading, the UUID of a BLE characteristic, the JSON shape the app deserializes. And the contracts are where a slow physical reality collides with a fast software one.

## The constraint that starts every argument: 20 bytes

Almost every reconciliation on this platform traces back to one number. The brush has no radio but [Bluetooth Low Energy 4.2](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/), and the default ATT payload is **20 bytes** — 23-byte MTU minus three bytes of header. The Data Length Extension can negotiate it higher, but a large share of the older Android phones in our install base won't, so 20 bytes is the number we design the contract against.

Here is what that does to a real feature. The product team wants a brushing-session record that carries, per session:

- coverage by mouth quadrant (where you brushed, where you missed),
- a pressure track (were you scrubbing too hard, and when),
- duration, motion summary, and the [head ID](/blog/from-eight-device-apis-to-one-entity-domain-model/) of the brush head in use.

Modeled the way the API platform *wants* to model it — the way you'd model it if the device handed you JSON — that's a fat document. Streamed over a 20-byte notify pipe, it's hundreds of packets per two-minute session, every one of them costing radio-on time against a small battery, every one a chance for the phone to miss a notification.

So the room makes a trade, and both sides give something up.

**Firmware gives up self-describing payloads.** The device does not send JSON. It sends a **fixed-layout binary frame** — bit-packed, no field names, no delimiters. Quadrant coverage is a byte of flags. Pressure is a small array of decimated samples, not the raw track. Everything is positional: byte 0 is the message type and version, byte 1 is a flag field, bytes 2–3 are a duration, and so on. Twenty bytes buys you a surprising amount once you stop spending them on the names of things.

**The API platform gives up "the device sends me my contract."** The wire format and the app-facing contract are now two different things, and the platform owns the seam between them. The device speaks compact binary; the cloud **expands** that frame into the rich, self-describing JSON the mobile app actually reads. The app never sees a bit-packed byte. The device never sees a field name. The expansion logic — the canonical map from frame layout vN to JSON schema vN — lives in exactly one place, the platform, and that turns out to be the whole game.

![How a 20-byte BLE constraint reconciles with a rich app-facing contract. On the device side, a fixed-layout binary frame is drawn byte by byte: byte 0 is message type and version, byte 1 a flag field, bytes 2 to 3 a duration, then a packed quadrant-coverage bitmap and a short array of decimated pressure samples — twenty bytes, no field names. An arrow labelled expand crosses the platform boundary into the cloud, where the same data becomes a verbose self-describing JSON document with named fields for quadrant coverage, a pressure track, duration, and head ID. The caption notes the device speaks bit-packed binary, the app reads JSON, and the platform owns the one-way expansion between them.](../../assets/blog/hardware-api-frame-to-contract.svg)

The blunt version of the lesson: **on a BLE product the wire format is a hardware artifact and the API contract is a software artifact, and pretending they're the same thing is how you starve one side to feed the other.** Keep them separate, own the mapping, and each side gets to be good at its own job.

## The other constraints, and what each one costs the contract

The 20-byte MTU is the loud one, but three more hardware specs reach straight into the data model. The pattern is always the same — a physical limit the hardware can't move after production forces a concession in the contract:

**Flash size vs. "I can always backfill."** The session buffer lives in a few kilobytes of on-device flash — a ring buffer of recent sessions, because the part is small and most of it belongs to firmware. The cloud model was originally written assuming it could always replay every session a device ever recorded. It can't: brush all week with the app closed, and the oldest sessions roll off the ring before the phone ever drains them. So the contract grew a distinction it didn't have at first — a record is either *complete* or *partial-with-known-gaps*, and the device reports the lowest counter it still holds so the cloud can tell "I have everything" from "the device had already overwritten sessions 4 through 9." Hardware couldn't grow the flash on a shipped unit; the API gave up the fiction of total recall and learned to represent a hole.

**Battery budget vs. sampling rate.** Every sample the sensor takes, and every minute the radio is on to sync, draws down a small cell. Mobile and product wanted the highest-resolution motion track the sensor could produce. The hardware budget said no — at that rate the published battery life misses its number, and battery life is on the box. The reconciliation happened on the device: sample high *locally* for the real-time in-app experience, but **decimate before transmit** so the synced record is a downsampled summary, not the raw track. The contract carries the summary. Product gave up server-side high-resolution analytics; the battery spec won, because a brush that dies early is a return.

**Clock drift vs. "trust the timestamp."** A device this small doesn't always carry a battery-backed real-time clock, so "now" on the brush is a guess between syncs. The contract can't trust the device's wall-clock time as truth; it carries the device's own monotonic counter as the ordering key and treats the timestamp as a hint to be [corrected server-side](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/). Hardware gave up nothing it could afford (an RTC is parts cost and board space); the data model absorbed the uncertainty.

![A spec-to-contract mapping table. Four rows, each a hardware constraint reconciled against the data contract. Row one: 20-byte BLE MTU — device gives up self-describing payloads and sends a packed binary frame, API gives up receiving JSON and owns the expansion. Row two: a few kilobytes of flash — device keeps only a ring buffer of recent sessions, API gives up total recall and represents complete-versus-partial records with known gaps. Row three: small-battery budget — device decimates samples before transmit, product gives up server-side high-resolution analytics. Row four: no battery-backed real-time clock — device sends a monotonic counter, the API treats the timestamp as a correctable hint. A note reads: the hardware limit is frozen at production; the contract is what bends.](../../assets/blog/hardware-api-spec-to-contract.svg)

There's a through-line in that table worth saying out loud. In every row, **the hardware constraint is the fixed point and the contract is what bends.** That's not a hierarchy of importance; it's a hierarchy of *what can still change*. The board is frozen the day it goes to production. The contract ships every two weeks. When two things have to agree and only one of them can move, the one that can move is the one that moves.

## The bridge between the two clocks: capabilities, not versions-in-lockstep

So how does a platform that ships every two weeks live on top of hardware that ships every 18 months without one constantly breaking the other? Two rules, and they're the most important decisions in the whole arrangement.

**Rule one: contracts get versioned, never changed.** If the session-frame layout was agreed at v1, you do not change v1. You ship v2 *alongside* it. Hardware in the field running v1 firmware keeps emitting the v1 frame; the cloud keeps expanding it, forever, until the v1 fleet is small enough to deprecate — which in connected hardware means five-plus years. This rule is unpopular the first time you state it and invisible after a year, because the alternative — mutating a contract the field already depends on — bricks the meaning of data from a million devices you can't recall.

**Rule two: the device and cloud negotiate a capabilities set.** On first connect after pairing, the device announces what it can do — `session_frame_v1`, `pressure_track`, `head_id_v1`. The cloud announces what it understands — which may be a *superset* or, mid-rollout, a slightly different set. Both sides then operate strictly on the **intersection**.

![The capabilities handshake that bridges a fast cloud and a slow fleet. On the left, a device announces its capability set on first connect — session_frame_v1, pressure_track, head_id_v1. On the right, the cloud announces a larger set it understands — session_frame_v1, session_frame_v2, pressure_track, head_id_v1, coverage_v2. In the middle, the intersection is highlighted as what both sides actually use. Two annotations: the cloud can ship session_frame_v2 ahead of any firmware and simply not use it until a device announces it, so the fast side leads safely; and a future device can announce a capability the cloud has never heard of and the cloud ignores it gracefully, so the slow side can lead too. Old v1 firmware keeps working untouched.](../../assets/blog/hardware-api-capabilities-handshake.svg)

That intersection is the bridge. It buys three things the cadence mismatch otherwise makes impossible:

- **The API can lead.** The platform ships `session_frame_v2` support today; no device announces it yet, so nothing uses it. The day v2 firmware reaches the field, the same fleet starts lighting up the v2 path with zero cloud deploy. New analytics, new aggregations, new [dentist-portal](/blog/from-eight-device-apis-to-one-entity-domain-model/) views that need no firmware change ship at cloud speed.
- **The firmware can lead too.** A new hardware revision can announce a capability the cloud has never heard of. The cloud ignores unknown capabilities gracefully rather than erroring, so firmware doesn't have to wait for a coordinated cloud release to ship.
- **Joint features wait for the slow team, deliberately.** A feature needing *both* new firmware and new cloud ships when the firmware does. The platform builds its half early, feature-flagged, and the capability announcement is the flag.

Negotiating that bitmap into existence cost about six weeks of design and argument. It has paid for itself many times over, because it's the single mechanism that lets the fast clock run without dragging the slow one or getting dragged by it.

## Who owns the gray zone

The boundary between firmware and the API platform is full of work that belongs to no one by default. Whose code parses the head-ID bytes? Whose code computes "hours since this head was attached"? Whose code decides it's time to tell the user to replace it? Left unowned, that logic ends up smeared across firmware, cloud, and the mobile app — three codebases, three subtly different versions of the same calculation, and a bug that only appears when they disagree.

The convention I hold the room to: **the layer closest to the data owns its canonical interpretation.** The head-ID byte format belongs to firmware, because firmware is what physically reads the chip on the head. "Hours since attached" belongs to the cloud, because the cloud is what aggregates sessions across time. The user-facing "replace your head" decision belongs to the cloud for the push notification and to mobile for the in-app surface. Whoever owns an interpretation owns the contract that documents it, and owns the migration plan when it changes. One interpretation, one owner, one place a fix lands.

![The single question "when do we tell the user to replace the head?" split across three layers by which one is closest to the data. Firmware owns the head-ID byte format, because firmware is what physically reads the chip on the head, and with it owns the contract documenting those bytes and the migration plan when they change. The cloud owns hours-since-attached and the replace decision itself, because it is the layer that aggregates every session over time, which makes its interpretation canonical. Mobile owns the in-app replace surface, rendering the cloud's decision rather than recomputing it. An axis runs from closest-to-the-silicon on the firmware side to closest-to-the-user on the mobile side: one interpretation, one owner, one place a fix lands.](../../assets/blog/where-hardware-specs-meet-api-contracts-fig-1.svg)

## What the product manager is doing in the room

The PM in that meeting isn't there to request features. They're there as the arbiter of *what the user sees, and when* — the one decision the four engineering teams can't resolve among themselves because it isn't an engineering question.

The sharpest example we hit: what should happen when a brush head reports no ID — an off-brand head, or a chip that didn't read? **Fail closed** (no ID, don't record the session) or **fail open** (record it, mark the head unknown)? That's not firmware's call or the platform's; it's a product tradeoff about real users. We chose fail open, mark unknown — people do brush with off-brand heads, and refusing to count those sessions is a worse experience than counting them imperfectly. With a senior PM in the room that's a five-minute decision. Without one it's a five-week stall while four teams guess at a question that was never theirs to answer.

## What it cost me to learn the seam matters

I'll name the mistake, because it cost a firmware release we couldn't take back for months. Early on, before the binary-frame-versus-JSON discipline was settled, we let a single field get defined *twice* — the head-replacement threshold lived in a firmware constant *and* in a cloud config, because at the time it was easier to ship that way than to decide who owned it.

They drifted. Firmware on one product line said a given head type was good for 90 days; the cloud, updated later with a revised recommendation, said 100. The app showed one number from a cached firmware value on one screen and the cloud's number on another, and a careful user noticed their brush head was apparently due for replacement and not-yet-due at the same time.

![How one number defined in two layers drifted, and the fix. The head-replacement threshold lived in two homes because that was easier than deciding the owner. The firmware constant — baked into units already in the field, frozen until the next OTA — said the head was good for 90 days. The cloud config — a revised recommendation shipped later, and shippable every two weeks — said 100 days. Both fed the app, which showed one screen saying the head was due and another saying not yet due; a number that means two things at once is the kind of inconsistency that ends up in front of an auditor. The fix was for the platform to override the stale firmware value, treating the field device's number as a hint and the cloud's as canonical. The lesson: a value that lives in two layers will drift, and the layer you can't update on demand is the one that will be wrong.](../../assets/blog/where-hardware-specs-meet-api-contracts-fig-2.svg) For a body-care product that's an embarrassing inconsistency. For the [regulated parts of this platform](/blog/hipaa-fda-class-i-and-what-counts-as-medical-device-data/), a number that means two things at once is the kind of defect that ends up in front of an auditor.

The cloud side we fixed in a two-week sprint. The firmware constant was baked into units already in the field — we couldn't correct it until the next OTA, and we couldn't ship that OTA early just for this. So the platform absorbed the fix the only way it could: it learned to *override* the stale firmware value, treating the field device's number as a hint and the cloud's as canonical. Which is exactly the closest-layer-owns-the-data rule, learned the expensive way instead of agreed up front. The lesson I'd hand the next platform lead: **a value that lives in two layers will drift, and the layer you can't update on demand is the one that will be wrong.** Decide the owner before you ship, not after the field disagrees with itself.

## What I want to carry forward

Four principles from running the room where the silicon meets the schema:

1. **Keep the wire format and the API contract separate, and own the seam.** The device's job is to fit through the radio; the contract's job is to be good to consume. One team owning the expansion between them is what lets each side optimize for its own constraint instead of compromising both.
2. **In every spec-versus-contract fight, the frozen thing wins and the shippable thing bends.** The board is fixed at production. The contract ships every two weeks. Design the contract to absorb the hardware's limits, not the other way around.
3. **Capabilities, not lockstep versions.** A negotiated capability intersection is the only mechanism I've found that lets a two-week cloud and an 18-month fleet each move at their own speed without breaking each other.
4. **Closest layer to the data owns the interpretation.** Don't let the meaning of a datum live in three codebases. It will drift, and the copy you can't hot-fix is the one that will be wrong in the field.

The [retrospective that closes this series](/blog/cutting-my-teeth-on-medical-iot-products/) steps back from the individual decisions to the whole arc — what the platform got right over two years, what it got wrong, and what I'd undo if I were starting it again.
