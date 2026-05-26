---
title: "Speccing a Pet Tracker That Doesn't Need a Subscription"
date: 2026-05-13T09:00:00-04:00
category: product
tags:
  - iot
  - pets
  - product-management
  - lora
  - ble
  - cellular
  - build-in-public
notebook: iot-pet-health-tracker-build
notebookOrder: 2
excerpt: "Before I buy a single board, the PM work: three use cases, the wireless rubric, and the product line that falls out of it. The punchline is that the two loudest complaints about pet trackers — price and charging — have the same root cause, and you fix both by refusing to put cellular where it isn't needed."
pullquote: "Everyone ships always-on cellular because it's the obvious spec. It's also over-engineered for a pet that's home 95% of the time."
cover: "../../assets/blog/pet-tracker-build-2-the-prd-and-the-rubric-cover.svg"
coverAlt: "A collar puck with a paw mark radiates three concentric radio rings of increasing range, linked by a direct dashed line straight to its own cloud — no vendor box in between — beside a dollar coin struck through, standing for no recurring subscription."
featured: true
---

[Last time](/blog/pet-tracker-build-1-why-im-building-my-own/) I talked myself into building a pet tracker. This time I do the part that keeps a grudge from becoming a garage full of dead prototypes: the product work, before the soldering iron.

## Three use cases, in priority order

1. **Is my pet home / in the yard?** The 95% case. Wants near-zero power, near-zero data, an instant "they left" alert, and activity tracking.
2. **My pet is off-grid with me — a trail, the woods.** No cell coverage. I want to see where they are relative to me.
3. **My pet got out and is miles away.** Rare, high-emotion — and the fear that actually sells trackers.

Most products are built entirely around #3 and bill you monthly for it. But #1 is where pets spend their lives.

## The rubric, applied

I make every connected-product team I run answer five questions *before* picking a radio. Run them on a pet:

1. **Range?** Home is meters. A trail is kilometers. "Lost in the next county" is anywhere.
2. **How often does it phone home, and how big is the message?** A GPS fix is ~12 bytes, and at home you only need a heartbeat. Tiny.
3. **BOM budget?** Consumer. Every dollar of radio locks the rest of the bill.
4. **Power budget?** Small battery, and — per the [last post](/blog/pet-tracker-build-1-why-im-building-my-own/) — *no charging cult.*
5. **Security model?** Consumer. A device cert to the cloud, TLS, no drama.

Answer those honestly and you do **not** arrive at "always-on cellular for everything." You arrive at a spectrum.

## The connectivity spectrum

| Radio | Range | Power | Cost | Good for |
| --- | --- | --- | --- | --- |
| **BLE** | meters | sips (an AirTag runs ~a year on a coin cell) | ~free | "Is it home?" presence |
| **LoRa (915 MHz)** | kilometers, line-of-sight | low | cheap, no carrier | trail + local recovery, *if you bring the gateway* |
| **Cellular (LTE-M)** | anywhere with a tower | hungry | hardware + monthly data | the genuinely-lost case |

The whole insight is one line: **match the radio to the usage.** A pet that's home 95% of the time should be running its cheapest, lowest-power radio 95% of the time — and only reach for the expensive one during the rare event that needs it.

![Three radios laid out along a range axis from meters to anywhere: BLE for the 95% home case (sips power, ~a year on a coin cell, no carrier), LoRa at 915 MHz for trail and local recovery (low power, cheap, bring your own gateway), and cellular LTE-M for the rare genuinely-lost case (hungry, days-to-two-weeks battery, hardware plus a monthly data plan).](../../assets/blog/pet-tracker-build-2-connectivity-spectrum.svg)

## The product line

That spectrum is the product line. Three SKUs, so the customer picks their own range / cost / battery trade instead of me guessing:

| SKU | Radios | Battery | For | Money |
| --- | --- | --- | --- | --- |
| **LoRa collar** | BLE + LoRa + GPS | **months** | home/indoor pets; trail dogs (with the base station) | hardware + optional ~$20/yr cloud history |
| **Cellular collar** | BLE + LTE-M + GPS | days–~2 wks | roamers / escape artists / "find from the couch" | premium hardware + data sub (still under the incumbents) |
| **Base station / handheld** | BLE + LoRa | weeks (docked = always charged) | every LoRa-collar owner | bundled with the LoRa collar |

## The tiered-power trick

The LoRa collar does one clever thing: it lives in **BLE presence mode** at home (months of battery, ~no data), and only flips to **findable mode** — GPS fixes + LoRa beacons — when it crosses the geofence. The expensive radio work only happens during the rare event, so the months-long battery survives. That single decision is what delivers *both* of the things people complain about: low cost and no charging.

![The collar's two power states. BLE presence mode at home — GPS off, LoRa quiet, BLE heartbeat only, accelerometer logging activity — gives months of battery. Crossing the geofence flips it to findable mode: GPS fixes on, LoRa beacons out to the base station, an RSSI proximity beep on approach; battery drains fast but only briefly. Coming back inside flips it down to presence mode again.](../../assets/blog/pet-tracker-build-2-tiered-power-flip.svg)

## The base station is the network

Normally it's a docked listener at home. But it's built as a **handheld in a charging cradle** — Garmin-Alpha style — so you grab it off the dock and it becomes a mobile LoRa gateway. Pet got out? You drive a grid around the neighborhood and re-acquire its beacon; the collar's GPS gets you to the block, and an **RSSI proximity beep** (faster and louder as you close in) gets you to the actual bush. On a trail, you just carry it and watch the pet relative to you, phone over BLE for the map.

And the strategic part: **crowdsource the base stations.** Every docked unit passively listens for *any* lost collar nearby and reports it. At neighborhood density that's a pet-specialized recovery mesh — the Apple Find My / Amazon Sidewalk model, seeded by always-on home base stations instead of phones. Tractive can't copy it; pure cellular has no network effect. The honest catch is cold-start: the mesh is only magic once it's dense, so early on recovery leans on you and your own handheld. Same chicken-and-egg every crowdsourced network faced.

## Little features that punch above their BOM

A piezo buzzer costs pennies, so both the collar and the base get one:
- **Collar:** beep to find it (it fell off, or the pet's hiding), a recall/training cue, and a humane no-shock "you're leaving the yard" boundary warning.
- **Base:** an audible "he got out" alert the moment the pet crosses the geofence or drops off the radio — so you're not glued to the app — plus that proximity beep while you search.

## The build phases

1. **Location — BLE + LoRa.** The novel, can't-buy-it part: presence, the geofence flip, the mesh, the base station. The hardest phase, on purpose.
2. **Cellular.** The "anywhere" premium SKU. A paved road (Nordic's nRF9160 + reference firmware), so it's a low-risk bolt-on.
3. **Health.** And here's why it's last: pet vitals are mostly an **IMU + algorithms** problem, not a new sensor. A sensitive accelerometer picks up the body's micro-vibrations at rest — that's how the incumbents derive resting heart rate and respiratory rate, fur and all. So the accelerometer I put on the collar in phase 1 *becomes* the vitals sensor in phase 3, once tracking is rock-solid.

![The connectivity spectrum drawn as three SKUs and the build order. The LoRa collar (BLE plus LoRa plus GPS, months of battery, hardware plus optional cloud history) for home and trail; the cellular collar (BLE plus LTE-M plus GPS, days-to-two-weeks battery, premium hardware plus a data sub) for roamers; and the base/handheld (BLE plus LoRa, always charged on its dock) that is the gateway and the recovery mesh, bundled with the LoRa collar. Below, the phased build runs location first (BLE plus LoRa, geofence, mesh — the hardest), then cellular as an nRF9160 bolt-on, then health, where the phase-1 accelerometer becomes the vitals sensor.](../../assets/blog/pet-tracker-build-2-skus-and-phases.svg)

A phase-4 idea worth writing down now: the base station is stationary, right where the pet sleeps. It could later carry a **mm-wave radar for fully contactless resting vitals** — heart and respiratory rate with no collar contact at all. That's the magic version of "the base station is more than a charger."

## The honest part

- **AirTag already owns cheap + no-subscription + find-my-network at $29.** So my moat is *not* raw location — it's the pet features Apple won't build (activity, sleep, vitals trends, multi-pet, family alerts, vet-shareable data) plus the pet-specialized mesh. The position is *Whistle's features, AirTag's price model.*
- **A LoRa collar can't find a pet past the edge of the mesh and your car's reach.** That's exactly what the cellular SKU is for. The line lets the buyer choose.
- **At volume the hardware BOM is ~$30.** The reason incumbents charge $120/yr is the cellular data plan — remove cellular and you remove the cost basis for the subscription, which is how ~$20/yr for cloud history is honest and still 6× cheaper.

Spec's done. [Next post](/blog/pet-tracker-build-3-the-gear-and-the-plan/): I stop typing and hit *buy*.
