---
title: "FitBark — the pet activity-tracker market in 2015"
date: 2015-09-15T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - whistle
  - fitbark
  - ble
  - activity
notebook: pet-iot-field-guide
notebookOrder: 6
excerpt: "Two activity trackers on one dog's collar for a week — the bone-shaped FitBark next to Atom's Whistle. Notes on what's actually different (it's the radio, not the data), where they disagree, and whether a second number told me anything the first one didn't."
pullquote: "Two accelerometers on one dog for a week. They agree on the shape of every day and disagree on the size of it by a fifth — because they draw the line between 'resting' and 'active' in different places. The shape is the dog. The size is a setting."
cover: "../../assets/blog/fitbark-2-pet-activity-tracker-market-2015-cover.svg"
coverAlt: "Two dog activity trackers riding one collar — a bone-shaped tag and a coin-sized puck — drawn in warm orange above a single jagged accelerometer trace, with two faint dashed thresholds across it, signalling that one motion signal gets counted two different ways."
---

I backed FitBark on Kickstarter back in 2013 — same season Atom came home and I put a [Whistle on his collar](/blog/atom-arrives-whistle-activity-monitor-launches/). The pitch was a Fitbit for dogs, bone-shaped, cheaper than the Whistle, and tiny. It took its time getting here the way crowdfunded hardware always does, but it finally landed, so I did the obvious thing: clipped it onto Atom's collar right next to the Whistle and ran both for a week. Same dog, same walks, two devices counting the same wiggles. I wanted to know what a second activity tracker would tell me that the first one hadn't — and whether two of them on one Lab would even agree.

This isn't a buyer's-guide post. It's the same question I keep circling in this notebook: does more pet data actually help, or am I just collecting numbers I like looking at?

## They look like competitors. The difference is the radio.

On the shelf these read as the same product at two prices — a small thing that clips to the collar, counts how much the dog moves, and shows you a graph on your phone. But the interesting difference isn't the price or the shape. It's the same thing it was when I [put Tagg and Whistle side by side two years ago](/blog/tagg-vs-whistle-cellular-vs-ble-base-station/): *which radio is in the puck, and therefore how the dog's data gets home.*

The Whistle Atom wears carries **two radios — Bluetooth 4.0 (BLE) and Wi-Fi** — right in the puck, and no separate hub. It gets data off the collar two ways, both straight from the device: BLE to my paired phone, which relays to the cloud, or it joins the home Wi-Fi and uploads on its own with no phone in the loop. When Atom's home and I'm at the office, the Whistle still syncs over the house Wi-Fi by itself. I went in two years ago expecting a wall-powered base station and there wasn't one; there still isn't.

The FitBark made the opposite call: **BLE only.** The bone talks Bluetooth Smart to your phone — about a 30-foot reach — and that's the whole radio story on the device itself. No Wi-Fi in the tag. When your phone isn't near it, the FitBark doesn't sync; it just keeps logging activity to its own memory and dumps the backlog the next time an authorized phone is in range. If you want it to sync while the dog's home and your phone is at work, FitBark sells a **separate Wi-Fi Base Station** — a little always-on hub you plug into your router that auto-syncs any FitBark nearby. It's an optional accessory you buy on top of the tag, not part of it. (It showed up earlier this year; I haven't bought one.)

So the thing the marketing photos hide: the base station belongs to **FitBark**, as an add-on for the radio it left out — not to Whistle, which baked Wi-Fi straight into the puck. That's the inverse of what I'd have guessed from the box.

![How each tracker gets its data home, side by side. Left, Whistle: a coin-shaped puck carries both BLE and Wi-Fi, so it reaches the cloud two ways straight from the puck — over BLE to the owner's phone, which relays up, or over the home Wi-Fi network directly with no phone involved — and a crossed-out box marks that there is no base station. Right, FitBark: a bone-shaped tag is BLE only, syncing to the phone which relays to the cloud; a separate, dashed, optional plug-in Wi-Fi base station is the only way it reaches the cloud when the phone isn't near.](../../assets/blog/fitbark-2-data-paths-home.svg)

Everything else falls out of that one radio choice:

| | **Whistle Activity Monitor** | **FitBark** |
|---|---|---|
| On-collar radio | BLE 4.0 **+ Wi-Fi** (no hub) | BLE 4.0 only |
| Away-from-phone sync | Yes — over home Wi-Fi, on its own | Only with the optional Wi-Fi Base Station |
| Form factor | Aluminum coin puck, ~30 g | Bone-shaped polycarbonate, ~10 g |
| Battery | Rechargeable Li-ion, ~7–10 days | Replaceable coin cell, ~6 months |
| Subscription | None | None |
| Up-front price | ~$129 | ~$69 |
| Water rating | IP-rated splashproof | IP67 (better; survives a dunk) |

The trade is clean once you see it through the radio. Whistle put Wi-Fi in the puck, so it can phone home by itself — and pays for that radio in milliamp-hours, which is why it's a rechargeable cell I top up about once a week. FitBark left Wi-Fi out, so the tag sips so little that a coin cell lasts roughly six months and you swap it like a watch battery — but the dog's data is stuck on the collar until a phone (or that extra hub) comes to collect it. Lighter, cheaper, longer-lived; quieter when you're not around. Neither is "better." They optimized different ends of the same wire.

## Same dog, same week, two opinions

The hardware is the interesting part. The data turned out to be the *honest* part.

I ran both for seven days — same collar, same walks, same naps. The Whistle's numbers are calibrated to Atom's breed and age the way [they have been since he was a puppy](/blog/atom-arrives-whistle-activity-monitor-launches/); FitBark has its own model. Two accelerometers, two daily "active minutes" totals.

Day over day, the **shape** of the week is identical on both. Saturday and Sunday spike — longer weekend walks. Wednesday sags — it rained and we stayed in. If you laid the two weekly lines on top of each other, every up and every down lands on the same day. Both devices are clearly watching the same dog.

But the **size** is consistently off. FitBark reports somewhere around 15–20% more active minutes than Whistle, every single day. Not noise — a steady offset. And it isn't that one of them is "right." They've each drawn the line between *resting* and *active* in a different place. FitBark's threshold sits lower, so an amble across the yard that the Whistle files under "rest" gets counted as activity. Same motion, lower bar, bigger number.

![One motion signal, counted two ways. Top: a single jagged accelerometer trace for one dog over one day — flat during rests, tall spikes during play — crossed by two dashed horizontal thresholds. FitBark's line sits lower; Whistle's sits higher. A caption notes that a lower bar means more of the same motion gets called active, producing a bigger number. Bottom: a week of daily totals plotted as two lines, FitBark above and Whistle below, rising and falling together day for day — Saturday highest, Wednesday lowest — with a constant gap between them, showing the shape is identical and only the size differs.](../../assets/blog/fitbark-2-same-signal-two-thresholds.svg)

That reframed the whole "which is more accurate" question for me. Neither is measuring minutes the way a stopwatch measures minutes — they're both summing motion above a threshold somebody picked, and calling the sum "active minutes." The number is part dog, part product decision. So:

- **For trends, both are fine.** Is Atom more active this month than last? Either device answers that, because the offset cancels — you're comparing the device to itself.
- **As an absolute, neither travels.** If I tell the vet "Atom does about 100 active minutes a day," that's a Whistle sentence or a FitBark sentence, not a fact about Atom. Switch devices and the number jumps a fifth with no change in the dog.

Which is the thing I'd actually tell another owner: don't quote the number, quote the trend. The trend is the dog. The number is a setting.

## The one place the data genuinely diverges: sleep

The trend lines being parallel means the two devices mostly tell the same story. There's one spot where FitBark surfaces something the Whistle doesn't, and it's the only feature difference I ended up caring about.

The Whistle buckets the day into rest, walk, and a vigorous "play." FitBark adds a distinct **sleep** bucket — it separates a daytime nap from genuine overnight sleep, using how long the dog's still and the shape of the accelerometer trace. The Whistle lumps both under "rest."

![How each tracker slices the same 24 hours, drawn as two stacked rows of labeled bars. Whistle's row: one large "rest" block that quietly contains both nap and night sleep, then "walk" and "play." FitBark's row: the still hours are split into a separate "sleep" block and a "rest" block, followed by "active" and "play." An arrow marks that FitBark pulls overnight sleep out of "rest" — the one bucket Whistle doesn't model. Same motion, same day; the difference is how finely each device names the still hours.](../../assets/blog/fitbark-2-activity-buckets.svg)

For a two-year-old Lab in good health that's a curiosity more than a tool. But "did he actually settle and sleep through the night, or was he restless?" is a real question I can imagine mattering later — an older dog, a dog on a new medication, a dog you're watching for a reason. The Whistle simply can't answer it; it doesn't model sleep as its own thing. FitBark can. Noted for the day it's not academic.

Everything else in the two apps is a wash. Both have a calendar, a daily view, goals, and a social feature for comparing your dog to other dogs — FitBark normalizes activity across breed and size so you can stack your Lab against someone's Beagle; Whistle does the same thing under a different name. I have never once changed anything I do because of a friend-comparison screen, on either app. It's the pet-tech version of a leaderboard nobody asked for.

## The thing that actually earned its keep: an official API

Here's the difference that changed my own behavior, and it has nothing to do with the dog.

I've been logging Atom's activity to my home server since 2013, and on the Whistle side that's meant scraping an **unofficial, reverse-engineered endpoint** — the hobbyist trick I mentioned [the week he arrived](/blog/atom-arrives-whistle-activity-monitor-launches/). It works until Whistle ships an app update and quietly changes something, and then it doesn't, and I find out when the graph goes flat. There's no contract; I'm a guest who hasn't been invited.

FitBark is going the other way — opening up an **official developer API**, the documented kind where you register an application, do a normal OAuth handshake, and pull daily activity back as JSON from an endpoint they actually *want* third parties on. That's the difference between an integration I have to babysit and one with a contract behind it. So I've started moving my home-server logging over to it. For most owners this is irrelevant. For the kind of person who keeps a dog's activity in a database next to the thermostat logs, it's most of the reason to lean one way — and it's the more telling signal about which company is thinking about its data as a platform versus a walled garden.

## Where each one sits in 2015

Laying the field out by what I actually care about — how long between charges, and how far from home it can still tell me anything — the two of them land almost on top of each other, and a long way from the thing I keep wishing existed.

![The 2015 dog-tracker landscape mapped on two axes: battery life increasing to the right, reach increasing upward from home-only at the bottom to anywhere at the top. Tagg sits top-left — cellular GPS that finds the dog anywhere, but only two to three days of battery. Whistle and FitBark sit together along the bottom — both home-range only, Whistle with about a week of battery and FitBark with about six months. The entire top-right quadrant, long battery and anywhere-reach at once, is an empty green dashed box labelled the 2013 forecast, marked still empty in 2015.](../../assets/blog/fitbark-2-activity-tracker-landscape-2015.svg)

**The Whistle** is the right call when you want the data to reach you without you doing anything — it phones home over the house Wi-Fi on its own — and you don't mind charging it weekly. **The FitBark** wins on the boring virtues: six months between battery swaps, lighter on the collar, cheaper, IP67 so a creek crossing isn't a funeral, and an API I can build on. Both share the same hard ceiling, the bottom row of that chart: the instant Atom is genuinely *out* — off the property, in the car, lost — neither one has the faintest idea where he is. They count motion. They don't do place.

Which is exactly the gap I [pointed at in 2013](/blog/tagg-vs-whistle-cellular-vs-ble-base-station/). I bet then that the endgame was **convergence** — one device that leans on a low-power radio while the dog's home and flips to cellular-and-GPS the moment he isn't, so you sip battery in the house and only spend it when the dog's actually missing. That top-right corner of the chart, long battery *and* anywhere-reach in one puck. Two years on, it's still an empty box. Nobody's shipped it. FitBark and Whistle have spent the interval racing each other on sleep bins and friend-comparison screens — chasing the same features on the same side of the map — while the device I actually want for the day Atom finally figures out the gate doesn't exist yet.

So I'm keeping both, for unglamorous reasons. Atom wears the FitBark day to day — lighter, I forget it's there, the battery is a non-event, and my logging runs off its API. The Whistle stays on as the second opinion with the more conservative numbers and the Wi-Fi that phones home on its own. Two trackers on one dog, agreeing on the shape of every day, disagreeing on the size by a fifth, and neither one able to answer the only question I'd genuinely panic about.

## What's next

The convergence bet is still a bet. But the location half of it — cellular and GPS small enough and cheap enough to live on a dog's collar without a two-day battery — is the piece the whole forecast hinges on, and it's the piece I want to dig into next: what's actually keeping a single puck from being low-power at home and findable anywhere, and how close the radios are to closing that gap. That's the next one.
