---
title: "Thirteen years on — the long-arc smart-home retrospective"
date: 2025-11-15T16:00:00-05:00
category: craft
tags:
  - smart-home
  - retrospective
  - reflection
  - long-arc
notebook: smart-home-iot-journey
notebookOrder: 55
excerpt: "October 29, 2012 — one Hue bulb in the dining-room pendant. November 2025 — two houses, five stacked architectures, ~250 devices. What thirteen years taught me about which choices aged well and which ones I had to rip out."
pullquote: "The smart home I have now isn't a continuous evolution of the one I started with. It's three architectures stacked on top of each other, the seams still visible if you look. That's not a failure. It's the most honest thing in the house."
cover: "../../assets/blog/thirteen-years-on-long-arc-retrospective-cover.svg"
coverAlt: "A house cross-section with five horizontal strata stacked from foundation to roof, each a different smart-home architecture era, faint seams between them — a long-arc retrospective drawn as sedimentary layers."
---

October 29, 2012: I drove to the Apple Store and bought the Hue starter kit on a whim — three bulbs and a bridge, $199, the first ZigBee Light Link product anyone could buy. One of those bulbs went into the dining-room pendant that evening.

Thirteen years and one move later, I'm writing this in front of something north of 250 connected devices: two SmartThings hubs, a Home Assistant box, four Matter bridges, and more ESPHome boards than I've bothered to count. The bulb in that pendant has been replaced exactly once. The automation that turns it on at dusk has migrated platforms five times and never changed what it does.

That gap — between how little the *behavior* changed and how completely the *implementation* did — is the whole story. So this is the look back across the arc: not a tour of gear, but an account of which architectural bets aged well, which ones I had to rip out, and what I'd tell the version of me holding that first starter kit.

The device count is the easiest way to see the shape of it — one bulb in 2012, something north of 250 today, the curve steepening at every era boundary and again the year we moved.

![Device count across thirteen years plotted as a steepening curve: one device in 2012, about twelve by 2014, roughly forty-five by 2017, ninety-five by 2020, a hundred and fifty by the 2023 move, and around two hundred and fifty by 2025, with the five eras labelled beneath the axis and a dashed marker at the 2023 move where the house was wired from the studs. The slope steepens because each era accreted on the last rather than replacing it.](../../assets/blog/thirteen-years-accretion-curve.svg)

## Five eras, stacked not replaced

The thing nobody warns you about is that you don't *migrate* a smart home. You accrete one. Each era's architecture got layered on top of the last, and the old layers never fully went away — they got bridged, wrapped, or quietly left running because they still worked. The house today is sedimentary.

![A house cross-section in five stacked strata from foundation to roof: Era 1 single-vendor walled gardens at the base, then hub-of-hubs, then local-first Home Assistant, then operations-grade cameras and alarm, then multi-hub Matter at the top, each layer thinner and newer, faint seams between them.](../../assets/blog/thirteen-years-eras-strata.svg)

**Era 1 — single-vendor walled gardens (2012–2014).** Hue, Wemo, Lutron, the first SmartThings. Each was its own app, its own cloud, its own island. By 2013 the unification problem was already the dominant pain: I had four apps to turn off the lights, and no two of them agreed on what "off" meant. The lesson arrived early and I ignored it for years.

**Era 2 — hub of hubs (2014–2017).** SmartThings v1 then v2 as the integration layer, Z-Wave and ZigBee radios under one roof, automations written as Groovy SmartApps. It worked, in the sense that one app could finally see most of the house. It failed in the way that defined the era: execution was cloud-mediated. The hub on my counter relayed a motion event to a Samsung data center, which decided to turn on a light, and sent the command back. When the internet hiccuped, my hallway didn't light up. That's a category mistake, and it took me three years to call it one.

**Era 3 — local-first migration (2017–2020).** Home Assistant on a Raspberry Pi, OpenZWave, then Zigbee2MQTT. The whole move was a reaction to Era 2: I wanted the decision "motion → light" to happen in my house, on hardware I owned, with no round trip to anyone's cloud. It cost me a steep YAML learning curve and a few weekends of re-pairing every device. It bought me a house that kept working when Comcast didn't.

**Era 4 — the house as an operations system (2020–2023).** Frigate plus a Coral TPU for local object detection, PoE cameras on their own VLAN, a real alarm-panel state machine instead of a pile of "if door then notify" rules. This is the era the smart home stopped being a control surface — a fancier light switch — and became something closer to infrastructure I operated. State machines, not toggles.

**Era 5 — new house, multi-hub, Matter (2023–now).** We moved, and I got to wire a house from the studs out: 42 Cat6 drops, conduit where I'd want it later, PoE everywhere. Samsung Bespoke appliances, Matter bridges tying the ecosystems together, and — the genuine surprise of the era — SmartThings Edge drivers executing *locally* on the hub, finally giving back the thing I'd left SmartThings to get in 2017. The end-state isn't one ecosystem winning. It's several of them cooperating through a thin bridging layer.

## The patterns that held across all five

Squint across thirteen years and the same four laws keep asserting themselves, no matter which logo was on the hub.

**Local execution wins long-term, every time.** Every cloud-dependent platform I started on either died (Wink, Insteon) or was dragged back to local execution (SmartThings, with Edge). The platforms I never had to think about — Hue, Lutron, Home Assistant — all had local control from day one. The cloud is rented infrastructure. You don't build a house on rented land if you can avoid it.

**Mesh protocols outlive Wi-Fi peripherals.** My 2012 Hue bulbs still work. The 2013 Wemo plugs don't — Belkin sunset the cloud features they depended on, and a Wi-Fi plug whose brain lives in someone else's data center is a brick the day that data center logs off. ZigBee and Z-Wave devices age slower because control is local to the mesh; the vendor's cloud going dark doesn't reach into my hallway.

**The hub is always the bottleneck, and upgrading it unblocks everything else.** Every era's ceiling was the hub. SmartThings v1 was cloud-only. The Hue bridge wouldn't talk to third-party ZigBee. The Pi 4 ran out of headroom once Frigate showed up. In each case the fix wasn't more devices — it was a better hub, after which a backlog of "someday" automations suddenly became possible. I now budget for the hub the way you'd budget for a furnace.

**Open protocols outlive vendors.** Vendors come and go — Wemo's slow fade, Wink's collapse, Insteon's overnight bankruptcy that bricked thousands of homes when its servers went dark. ZigBee, Z-Wave, MQTT, and plain IP outlived all of them. Everything I bought that was built on a proprietary cloud is now either dead or kept alive only by a third-party integration someone reverse-engineered out of stubbornness.

![Four smart-home laws that held across thirteen years, each as a winner-beats-loser pairing: local execution beats the cloud (rented infrastructure that bricked homes when Wink and Insteon went dark); mesh radios beat Wi-Fi peripherals (2012 Zigbee bulbs still run, the 2013 Wi-Fi plugs died with their cloud); open protocols beat vendor lock-in (Zigbee, Z-Wave, MQTT and IP outlived every proprietary-cloud vendor); and the hub is always the bottleneck, so upgrade it first.](../../assets/blog/thirteen-years-four-laws.svg)

## What I'd build if I started clean today

People ask what stack they should buy now, in 2025, and I have a real answer — shaped entirely by the four laws above. Home Assistant on dedicated hardware as the orchestrator, because it's the only piece that's never let me down and never phoned home. Zigbee2MQTT on a Sonoff dongle and Z-Wave JS UI on an Aeotec stick as the two mesh coordinators, kept separate so one radio's problems don't take down the other. A Matter border router — an Apple TV 4K or an Aqara M2 — to onboard anything new. Lutron Caseta for every in-wall switch, because it is the single most reliable thing in my house and I've never once thought about it. Reolink PoE cameras into Frigate with a Coral for the video. And the phone Companion app for presence and push, because the phone is the one sensor everybody already carries.

The buy order matters more than the list. Start with the HA hardware and a Lutron bridge plus a starter set of Caseta switches — reliable, instant, works in every room before you've automated a thing. Then an Aqara hub with a fistful of door, window, and motion sensors, a couple of Hue bulbs in the rooms you actually use, and voice last (or skip the commercial assistants and run HA's local voice). *Then* expand based on an automation you actually want, not on a gadget that looked clever in a video.

The skip list is shorter and blunter: Wi-Fi-only plugs and switches; any Wink-class vendor whose moat is a proprietary cloud; "AI-powered" appliance features that shipped before the AI was any good (the Family Hub fridge's food recognition is the standing example); and most first-generation anything. Early adoption is a hobby with a tuition bill, and I've paid it.

## What I'd warn the 2012 version of me about

Some of these I could have known. Some I only learned by getting hurt.

The Hue bridge will turn up in security research in 2016 — not a worm in the wild, but a demonstrated remote-firmware-update weakness. Philips patched it in time. The lesson generalizes: every networked thing in the house is a target eventually, including the lightbulbs. Don't buy into Wink (I didn't, by luck more than wisdom). When OpenZWave gets deprecated around 2020, don't fight it — migrate to Z-Wave JS and move on. SmartThings will get bought by Samsung, neglected for the better part of five years, and then quietly made good again; patience, not panic. Matter will arrive roughly a decade later than the hype promised and *still* won't replace anything — it bridges, which it turns out is the more useful job anyway. And the budget across thirteen years lands somewhere past $30k. It was worth it. But know that number going in.

## Where I expect 2030 me to laugh at 2025 me

This is the part I have to flag clearly as guesswork — forecast, not fact, written in late 2025 with no idea how it lands. Four bets:

I've been dismissive of voice assistants for a decade because they were dumb. On-device LLM-class understanding is about to make that dismissal wrong — context-aware, able to reason about household state rather than match a command string. The security-camera market will consolidate into a few survivors, and local detection of the Frigate kind will win, but only after the cloud-camera vendors get acquired or fold and take their subscriptions down with them. Energy management — solar, battery, dynamic pricing, scheduling the big loads against generation — is the next era's killer app, and I've been ignoring the math right up until it started obviously favoring action. And the smart lock as a category gets absorbed into phone-as-key: Apple Wallet keys and UWB proximity making the dedicated lock app vestigial. Ask me in 2030 how many of those I got right; the misses will be the useful part.

## What never changed

For all the churn underneath, a few things have run continuously since the beginning. The dining-room pendant — same fixture, second bulb, same job. The sunset porch light, which started life in October 2012 as a literal Python cron job on a laptop, then became an IFTTT recipe, then a SmartThings SmartApp, then a Home Assistant automation. Porch light on at sunset, off at sunrise. The behavior hasn't changed in thirteen years; the implementation has been rewritten five times.

![One automation across thirteen years: 'porch light on at sunset' as a horizontal timeline migrating through five implementations — a 2012 Python cron job, an IFTTT recipe, a SmartThings Groovy SmartApp, a Home Assistant YAML automation, and a Home Assistant trigger today — the input (sunset) and output (light on) identical at both ends, only the engine in the middle swapped out each era.](../../assets/blog/thirteen-years-porch-light-migration.svg)

And the four laws, which I'd now carve over the door: local beats cloud, mesh beats Wi-Fi, open protocols beat vendor lock-in, and the hub is always the thing to upgrade next.

## The arc, in one line

The smart home is the longest-running personal-engineering project I have — thirteen years, two houses, ~250 devices, about fifty posts in this notebook. It's also, finally, genuinely useful in a way I can measure by the fact that nobody mentions it. The kids don't know any other kind of house; they expect the lights to come up on their own, expect to ask whether the front door's locked and get a real answer, expect the kitchen to show them a recipe. That's just *house* to them.

The arc was: controllable thing → automatable system → household choreography. The third one was always the destination. The first two were the path.

Onto the fourteenth year.
