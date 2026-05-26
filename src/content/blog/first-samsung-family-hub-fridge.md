---
title: "First Samsung Family Hub fridge — kitchen has an OS"
date: 2023-10-21T19:00:00-04:00
category: tools
tags:
  - smart-home
  - samsung
  - bespoke
  - smartthings
  - appliances
notebook: smart-home-iot-journey
notebookOrder: 46
excerpt: "Samsung Bespoke 4-Door Flex with Family Hub installed. 21\" touchscreen on the front door. SmartThings integrated. Talks to the Frame TV."
pullquote: "The fridge is now a SmartThings hub, a display, a camera, a calendar surface, and a recipe-search tool. It's also a fridge. It does all six things well enough that the kitchen actually got more functional."
cover: "../../assets/blog/first-samsung-family-hub-fridge-cover.svg"
coverAlt: "A four-door Bespoke refrigerator with a large touchscreen set into its upper-right door, the screen showing a calendar grid and a few interface bars. Concentric signal arcs radiate from the screen out to the devices the built-in hub talks to — a bulb, a wall-mounted TV, a sensor, and an oven — the fridge acting as the kitchen's smart-home hub, not just a place to keep food cold."
---

Samsung Bespoke 4-Door Flex with Family Hub installed in the new kitchen last Thursday. RF29A9675AP/AA — the 29 cu ft model with the 21" touchscreen on the front-right door.

A week of family use. Notes.

## What the Family Hub actually does

- **21" touchscreen** running Tizen OS. Same OS family as my Frame TV.
- **Three interior cameras** — look at what's in the fridge without opening the door, via the screen or via the SmartThings app on the phone.
- **SmartThings hub** — the fridge IS a SmartThings hub. Has a Zigbee + Z-Wave + Matter radio combo, talks to other SmartThings devices on the LAN.
- **AI Vision food recognition** — the cameras try to identify foods, track expiration dates, suggest recipes based on what's in the fridge.
- **Family calendar / notes / sticky-notes** — synced via Samsung's cloud with phones.
- **Music + speaker** — Bluetooth audio output, internal speakers, Bixby voice assistant (mediocre).
- **Mirroring to Frame TV** — the Family Hub display can mirror to my Frame in the great room, e.g., showing a recipe while you cook.
- **Standard fridge functions** — water + ice dispenser, four temperature zones, beverage center.

## The SmartThings hub function

This is the part I care about most. The Family Hub fridge contains a SmartThings hub. It can join my existing SmartThings ecosystem (now revived for this purpose) and talks to:

- **Zigbee 3.0** devices (radio + protocol stack on the fridge itself).
- **Z-Wave Plus** devices (also on the fridge).
- **Matter** devices via Thread / WiFi (fridge is a Thread Border Router).

The fridge replaces my old SmartThings hub for these protocols. Which means the LoRa gateway + Sonoff ZBDongle-E + Aqara M2 are all still serving their roles (separate Zigbee networks for the LoRa garden sensors, ESPHome devices, Aqara devices), but the Family Hub is the "SmartThings-blessed" hub.

I'm bridging the fridge's SmartThings to Home Assistant via the HA SmartThings integration. HA gets the device list; can issue commands. Latency 1-2 seconds (cloud-mediated for the SmartThings integration).

Tested: from Home Assistant, I can read the fridge's interior temperature (38°F), receive door-open events, see beverage-center temp (34°F), and (via the SmartThings API) trigger ice-maker on/off.

![How the Family Hub fridge sits in the house as a hub. On the left, three radio islands feed into it: Zigbee sensors, Z-Wave switches, and Matter-over-Thread devices like the Eve sensors and Nanoleaf bulb. They all terminate at the fridge in the center, which is the SmartThings hub — carrying Zigbee 3.0, Z-Wave Plus, and a Thread border router. On the right, Home Assistant connects to the fridge not directly but through the SmartThings cloud, drawn as a dashed link through a cloud glyph labelled 1 to 2 seconds, cloud-mediated. A caption notes the fridge owns the radios while HA reads state and issues commands through SmartThings' cloud — convenient, but not local.](../../assets/blog/family-hub-fridge-topology.svg)

## The cooking integrations

This is where Samsung's tightly-integrated approach starts to pay off:

- **Recipe display from the fridge screen → mirror to Frame TV**. Open a recipe on the fridge's 21", tap the cast button, the recipe appears on the 65" Frame TV across the room. Read while cooking from the stove, hands free.
- **Pre-heat the oven from the fridge**. Samsung connects the Bespoke oven to the SmartThings hub on the fridge. Tap "preheat to 425" on the fridge screen → oven starts.
- **Timers across devices**. Start a timer on the fridge, hear it announce on the Frame TV, see it on phones.

![The cooking integrations, drawn as flows out of the fridge screen. The Family Hub fridge — a 21-inch Tizen panel that is itself a SmartThings hub — is the control surface. Tapping a recipe casts it to the Frame TV across the room; tapping "preheat 425" starts the Bespoke oven; starting a timer fans the announcement out to the Frame TV and to phones. Every one of these routes over the SmartThings hub built into the fridge rather than a separate box.](../../assets/blog/family-hub-cooking-flow.svg)

The first time my wife pre-heated the oven from the fridge screen, she said "huh, that actually works." Coming from someone who doesn't normally engage with smart-home stuff, this is high praise.

## The Family Hub display interface

The screen runs Tizen with a custom Family Hub launcher. Apps:

- **Fridge interior cams** — three cameras showing the inside.
- **Calendar** — Google Calendar + Samsung Calendar both sync.
- **Notes / Memo** — shared family note-taking with handwriting.
- **Family Board** — kids' drawings, photos, sticky notes.
- **Mirror display** — show a phone screen on the fridge.
- **Browser** — recipe sites, mostly.
- **Music** — Pandora + Spotify integration.

Most-used: the calendar + memo + interior cams. The cams sound gimmicky but it's actually useful — "what do we have?" without opening the door, especially when the kids have left it open enough times that you don't want to encourage that habit.

## Privacy considerations

The fridge phones home extensively. Samsung's privacy policy is broad. Family Hub features require Samsung account login + cloud sync.

I'm running it with:
- Family Samsung account is a dedicated email (not personal); the Samsung cloud doesn't see personal Google data.
- AI vision food recognition: enabled (cloud-side ML) — the "what's in your fridge" claim requires this.
- Cameras: enabled but on the local SmartThings VLAN; phone-app access works through SmartThings cloud (not Samsung's direct).
- Bixby voice assistant: disabled. The Echo + Google Home in the kitchen are the voice assistants.

The fridge is on the IoT VLAN with limited internet egress — only the Samsung domains needed for app function. About 1.5 MB/day of data uploaded to Samsung. Acceptable.

## What's gimmicky

- **AI Vision food recognition.** Identifies maybe 40% of items in the fridge correctly. Asparagus consistently classified as "lemongrass." Expiration tracking requires manual override often enough that it's not worth it.
- **Bixby voice on the fridge.** Bad enough that I disabled it.
- **Anime sticker family chat features.** No comment.

## What's not gimmicky

- **The SmartThings hub built into the fridge.** Removes one box from the closet (well, would have, except I keep the others for redundancy + separate Zigbee networks).
- **The interior cameras.** Used daily.
- **The recipe mirror-to-Frame.** Used multiple times per week.
- **Pre-heat the oven from anywhere in the kitchen.** Used daily.

![A two-column verdict after a week of family use. The left column, "used daily," carries green checks: the SmartThings hub built into the fridge, the interior cameras for a quick "what do we have?", recipe mirroring to the Frame TV, preheating the oven from the fridge screen, and the shared calendar and memo board. The right column, "switched off," carries red crosses: the AI food recognition that's right about 40% of the time, its habit of calling asparagus lemongrass, Bixby voice on the fridge, and the anime-sticker family chat. A caption sums it up: the hub, the cameras, and the cross-device cooking earned their keep; the "AI" features got switched off in a week.](../../assets/blog/family-hub-gimmicky-vs-useful.svg)

## Where the Frame TV fits

The Frame TV in the great room (mounted opposite the kitchen) is the second screen. From the fridge: cast a recipe to the Frame. From the Frame: SmartThings hub (the Frame is also a hub) controls the kitchen lights via SmartThings. From either device: see camera feeds.

The Frame + Fridge + Frame TV ecosystem is the first time I've had three SmartThings hubs cooperating in one house. Samsung's integration story is genuinely tight. The rest of the Bespoke kitchen — oven, dishwasher, washer/dryer — gets its own post once it's installed, and the Frame TV ecosystem deserves a write-up of its own too.

## What broke during install

- **The water line install** — the previous-house's water filter wasn't compatible. Installed a new under-sink water filter; ran a 1/4" PEX line to the fridge.
- **Initial Family Hub setup wanted internet access** before I'd configured the IoT VLAN firewall rules. Temporarily allowed broader access, then locked down after setup.
- **HA SmartThings integration broke** during the migration — the old hub's token was tied to the old hub. Re-authorized the integration with the Family Hub's hub ID.

Nothing serious. The fridge has been running 7 days. Glad I got the 21" model.

## What's next

- The full Samsung Bespoke kitchen write-up (oven, dishwasher, washer/dryer) once those are installed.
- A dedicated Frame TV ecosystem post.
- Eventually: a "Matter at the appliance level" post if and when Samsung exposes the appliances over Matter — the appliance device types aren't in the spec yet, so this one's a wait-and-see.
