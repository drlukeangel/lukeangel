---
title: "Designing the new build for SmartThings from day one"
date: 2023-04-18T13:00:00-04:00
category: tools
tags:
  - smart-home
  - construction
  - structured-wiring
  - poe
  - planning
notebook: smart-home-iot-journey
notebookOrder: 44
excerpt: "Construction starts in six weeks. Plans approved last month, framing scheduled for May. Tonight I finished the connected-home wire spec."
pullquote: "Cat6 in the walls during framing costs $40 per drop. Cat6 retrofitted after drywall costs $400 per drop. Plan everything you might possibly want before the studs are covered."
cover: "../../assets/blog/designing-new-build-for-smartthings-day-one-cover.png"
coverAlt: "Designing the new build for SmartThings from day one"
---

Construction starts in six weeks. Tonight finalized the connected-home wire spec for the build. Every Cat6 drop, every PoE camera location, every conduit run, every smart switch box. Anything I forget now is a $400 retrofit later.

## The plan, by zone

**Smart panel + structured wiring closet** (basement utility room):
- 24-port managed PoE switch (UniFi 24-port-PoE-Pro).
- Cat6 patch panel — 36 ports.
- PoE injector for the LoRa gateway.
- Rack-mounted HA host (replacing the HA Yellow when it gets cramped).
- UPS (CyberPower CP1500AVRLCD) for switch + HA host + modem.
- 2× Synology NAS (one for camera storage, one for general).
- Patch cables organized + labeled.

This closet is the brain. Climate-controlled (HVAC duct stub). Door has a Z-Wave lock and a sign that says "do not unplug anything."

**Cat6 drops, by room:**

| Room | Cat6 drops | Notes |
|---|---|---|
| Living room | 4 | TV + audio + Apple TV + future camera |
| Kitchen | 3 | Frame TV + Family Hub fridge + future tablet |
| Master bedroom | 2 | TV + future PoE camera |
| Office | 4 | Desk + Apple TV + wall display |
| Garage | 3 | Camera + future EV charger + future workshop computer |
| Each bedroom | 2 | TV + future device |
| Mechanical room | 2 | HVAC controller + (eventual) Tesla Powerwall API |
| Outdoor zones | 6 | PoE cameras (4) + LoRa gateway antenna run (2) |

Total: ~40 Cat6 drops. $1600 in cable + termination at $40 each. Versus retrofitting any of these after drywall closes: ~$400 per drop = $16,000.

**PoE camera locations**, planned during framing:

- Front entry (above door, ~10 ft high) — porch + walkway.
- Side yard (corner of garage roof, looking down driveway).
- Backyard (under eave, covering deck + lawn).
- Pool fence (corner of pool deck, covering pool + back gate).
- Garage interior (in the rafters, covering both bays + workbench).
- Doorbell (front door, replacing the standard doorbell button + chime).

6 PoE cameras planned, 4 installed at move-in. All on Cat6 to the basement switch.

**Conduit runs**:
A 1.5" smurf tube from the structured wiring closet up through the wall to the attic, and from the attic out to:
- Each exterior camera location (4× exterior cameras need Cat6 runs that go through outside walls — conduit makes that retrofitable).
- The garage (eventual EV charger needs 60A circuit + low-voltage Cat6 for charger telemetry).
- The pool equipment pad (Cat6 + 24V for pool automation).

Conduit is the "I don't know what I'll want here but I want to be able to add it" insurance. The plumbing electrician hated me; I paid for the labor anyway.

## Smart switch boxes

Every switch box gets:
- **Neutral wire required** — this is now National Electrical Code for new construction (NEC 404.2(C) from 2011). Builder confirmed all boxes get neutrals.
- **Deeper boxes** (single-gang 4" deep, double-gang 5") — smart switches like Lutron Caseta or Z-Wave switches are physically deeper than dumb switches. Standard 2.5"-deep boxes won't fit.

Going with **Lutron Caseta in-wall switches** throughout. Same protocol as the current house's switches (compatibility). Lutron Smart Bridge Pro 2 (the rack-mount version, $250) goes in the structured wiring closet.

## Outdoor wiring

The exterior of the house has its own wire spec:
- **Each soffit corner gets a Cat6 stub** — for future cameras.
- **Each landscape lighting transformer gets a Wi-Fi outlet stub** — for smart-control of the landscape lights via Z-Wave.
- **The deck gets a Cat6 + 12V power stub** — for future outdoor speaker + sensor cluster.
- **The mailbox gets a 24-AWG signal pair** to the house — yes, I'm wiring the mailbox. Tipping-bucket-style "mail delivered" sensor on a reed switch.

The mailbox sensor is one of those projects everyone says is silly. I've wanted "mail delivered" notifications for ten years. This is the year.

## The Family Hub fridge prep

Samsung's Family Hub fridge has a 21" touchscreen, integrates with SmartThings, runs Tizen OS, can mirror to the Frame TV. To support it:
- Dedicated 20A circuit (it draws meaningfully more than a non-screen fridge).
- Cat6 drop in the wall behind the fridge (the Family Hub does Ethernet — better than WiFi for the camera + voice features).
- Water line from the filtered municipal water (ice + dispenser).

I'll write up the integration when the appliance is in. Samsung says SmartThings will handle the connection out of the box; I'll see how the local-vs-cloud story is.

## The Frame TV prep

The Frame TV is going on the great-room wall opposite the kitchen — primary entertainment location AND household art display.

Wiring:
- Cat6 + HDMI (from a separate AVR location).
- The Frame's "One Connect" cable runs through the wall.
- Recessed outlet behind the TV for clean install.
- Cat6 specifically so the Frame can be the SmartThings hub (the 2022+ Frames include SmartThings hub functionality).

## What I'm NOT doing in the wires

- **Speakers in the ceilings of every room.** Whole-house audio is a 90s idea; portable speakers + Apple AirPlay 2 + Sonos handles it now. Skipping ceiling speakers in living spaces; doing them only in the home office for video-conferencing.
- **Coax to every room.** No TVs use coax anymore. Maybe one drop in the great room for emergencies; that's it.
- **Telephone wiring.** No.
- **Whole-house FM antenna.** Hilariously, my old house had this. No.

## What I'm doing that the builder pushed back on

- **40+ Cat6 drops.** Builder's electrician originally wanted to install 12. "Why do you need so many?" Long conversation about future-proofing. Won by paying for it.
- **Smurf tube conduit runs.** Same conversation. Built it in anyway.
- **Neutral in every switch box.** This is code in 2023, but the builder's quote tried to omit it on "we don't usually install neutrals where the customer is using LED bulbs." Insisted.
- **Deeper switch boxes throughout.** Standard 2.5" boxes everywhere in their original plan; I pushed to 4" single-gang and 5" double-gang.

The builder is now used to me being the "guy who's planning the connected home." I'm tipping the electrician at the end.

## What I'll write next

Quarter-by-quarter through the build:
- July 2023: structured wiring + conduit + PoE backbone, as installed.
- October 2023: first Samsung Family Hub fridge in the new kitchen.
- December 2023: 2023 in review.
