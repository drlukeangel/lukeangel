---
title: "Petnet SmartFeeder — eighteen months in, the cracks are showing"
date: 2017-03-26T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - petnet
  - smart-feeder
  - wifi
  - cloud-dependency
notebook: pet-iot-field-guide
notebookOrder: 11
excerpt: "Eighteen months of Petnet SmartFeeder (1st gen, 2014 Kickstarter). Three missed feeds, two cloud outages this winter. Why cloud-dependent food dispensers are riskier than the marketing admits."
pullquote: "A smart feeder that depends on a cloud to dispense food is a hardware contract on the vendor's solvency. When the cloud goes down at midnight, my cat goes hungry. The product's only as reliable as the company's server uptime."
cover: "../../assets/blog/petnet-smart-feeder-long-term-review-cover.png"
coverAlt: "Petnet SmartFeeder — eighteen months in, the cracks are showing"
---

Petnet SmartFeeder, the original 1st-gen Kickstarter unit, has been in operation for eighteen months. It feeds Atom (twice a day, 3/4 cup of kibble) and Joule (once a day, 1/4 cup). Long enough to write a real review.

## How Petnet works

**Hardware:**
- Plastic hopper + portion-controlled spiral dispenser + bowl.
- 6-lb kibble capacity.
- WiFi 2.4 GHz.
- Internal weighing — knows how much it dispensed.
- Status LEDs + a manual feed button on the device.
- AC-powered (wall-plug). No battery backup beyond keeping the WiFi alive briefly during reboot.

**Software / Service:**
- iOS / Android app for schedule + portion size + manual-feed.
- All control routes through Petnet's cloud — the feeder doesn't operate without internet.
- Schedule lives in Petnet's cloud, not on the device.
- Activity log: each dispense recorded with timestamp + portion.

**Data plan / subscription:**
- One-time hardware ($149 at launch, now $199 second-gen). No subscription.
- Petnet's cloud is "free" — paid for by hardware margins.

## The architecture problem, explicit

Here's the data flow for "feed Atom":

```
Schedule trigger
  → Petnet's cloud server
  → Cloud sends MQTT-or-whatever to the feeder
  → Feeder activates dispenser
  → Atom gets fed
```

The schedule lives in the cloud. The trigger lives in the cloud. The dispense command originates in the cloud.

If the cloud is down: **the feeder does nothing**.

This isn't a hypothetical edge case. It happened twice this winter.

## The two outage events

**Event 1: December 2016, ~6 hours.**
Petnet's servers had what they later described as a "database migration issue." For six hours starting around 11 PM, no scheduled feeds fired. Atom and Joule's 6 AM feed didn't happen. I noticed at 7:30 AM when Atom was, uncharacteristically, sitting next to his empty bowl staring at me. Manually fed them; service was back by 9 AM.

No notification from Petnet during the outage. I had to figure it out myself.

**Event 2: February 2017, ~3 hours overnight.**
Petnet had what they called an "infrastructure event." Cloud-wide outage, my feeder's status went "offline" in the app, no scheduled 6 AM feed fired. Caught it at 6:45 AM, manually fed.

Both events: no proactive communication from Petnet. The app showed "feeder offline" but no explanation, no ETA, no "manual feed recommended" alert.

## What the right design would have been

A feeder that's *actually* robust:

1. **Schedule lives on the device**. Cloud is for changing the schedule; the device executes from local storage.
2. **Last-known-schedule survives offline**. If cloud is unreachable, fall back to last-known schedule. Feed at the same times you fed yesterday, with the same portions.
3. **Watchdog notification**. If a scheduled feed *should* have fired (per local schedule) and the device can't confirm it dispensed (mechanical failure, jam, empty hopper), push a critical notification to the owner.
4. **Manual override redundancy**. A physical button that bypasses all software-driven logic and dispenses a standard portion. (Petnet has this — but you have to be physically there.)

Petnet does none of these correctly. The schedule is cloud-only. There's no local fallback. There's no "we didn't fire your scheduled feed" notification — just "feeder offline."

## The cat-vs-dog risk asymmetry

For Atom (dog, 70 lb, eats twice a day): missing one feed is uncomfortable, not dangerous. He'll be hungry; that's it.

For Joule (cat, 9 lb, eats once a day): missing a feed can be more serious. Cats develop hepatic lipidosis if they don't eat for 24+ hours — a serious metabolic condition. A 12-hour outage is not catastrophic but a 24-48 hour outage starts mattering medically.

**The risk profile is asymmetric**: dogs can miss meals more safely than cats. A device that misses scheduled feeds for cats has a higher safety stake than the marketing communicates.

## What I'm doing about it

- **A second feeder for redundancy** is overkill but tempting. Two cloud-dependent devices both fail together when the cloud is down.
- **A backup auto-feeder that's NOT cloud-dependent** is a better fix. The PetSafe Smart Feed mechanical timer (no WiFi at all) is reliable as a fallback. Going to install one in parallel — Joule's primary feed via Petnet, backup auto-feed at +4 hours if the primary didn't fire.
- **Migration to a non-cloud feeder when one ships** with proper local-execution architecture. Doesn't exist yet.

## The forecasting question

Petnet had two outages this winter. The company is reportedly burning cash; the parent (Petnet Inc.) had layoffs in early 2017 per public reporting. The cloud infrastructure is going to get worse before it gets better.

I'd put **60% probability on a multi-day Petnet outage in 2017 or 2018**. The company is hitting Kickstarter-startup-scaling problems.

If that happens, pet owners' cats will not eat for days. The "smart feeder" category will get a permanent black eye. The cautionary tale every connected-device pitch deck will reference for the next decade will be Petnet.

I hope I'm wrong. I'm not optimistic.

## What's next

The Furbo dog camera shipped to backers this month. Mine arrives next week. Going to write that up after a month of use.

For now, the Petnet feeder runs with a manual-watch routine: I check the feed log every morning at 7 AM. If the 6 AM feed didn't fire, I feed manually and curse Petnet's cloud.

It's not how a "smart" device should work.
