---
title: "Petnet collapses — the pet-IoT cautionary tale, written"
date: 2020-02-28T11:00:00-05:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - petnet
  - cloud-dependency
  - failure
notebook: pet-iot-field-guide
notebookOrder: 21
excerpt: "Petnet's cloud went down February 14 and stayed broken for a full week. Scheduled feeds didn't fire, the company went silent, and cats went hungry while the brand died in the tech press. The cautionary tale I forecast back in 2017 finally arrived — and what it should teach the rest of the category."
pullquote: "A week-long outage isn't a bug — it's what a company looks like when there's nobody left to fix it. The thing that promised to feed your cat couldn't, for a week, and couldn't tell you why. The 'smart' became the failure mode."
cover: "../../assets/blog/petnet-collapses-anatomy-of-smart-device-catastrophe-cover.svg"
coverAlt: "A week of calendar days, most marked with an empty food bowl and a severed cloud-link, showing a smart feeder that went dark for seven days while its mechanical backup kept the bowl full."
---

Petnet first acknowledged the outage on February 14 — a tweet saying it was "investigating" while insisting the SmartFeeders would still dispense on schedule. They didn't. The cloud stayed broken for a full week, and Petnet didn't say it was resolved until February 21.

For that week, scheduled feeds did not fire. Pets across the country didn't eat unless their owners noticed and fed them by hand. Petnet didn't email customers, didn't update a status page, and let the phone and the support inbox go dark — calls and emails went unreturned or bounced, and the company simply stopped answering the angry replies piling up on Twitter and Facebook. The press picked it up within days: TechCrunch, Newsweek, Trusted Reviews, Techdirt. "My cat starved for over a week," one owner wrote. That sentence, under a feeder's brand name, is the end of a company even if the corporate shell limps on.

The cautionary tale I [forecast back in 2017](/blog/petnet-smart-feeder-long-term-review/) finally arrived. This is what happened, and what it should teach the rest of the category.

## What broke

Petnet's eventual statement, once they said something at all, was the standard non-answer:

> *"We experienced a service interruption affecting some SmartFeeders. Service has been restored and we apologize for the inconvenience."*

No root cause, no scope, no mention of the pets that went hungry. The technical shape of the failure, pieced together from what owners could observe, is clear enough even without an honest post-mortem:

- The **dispatch service** — whatever ran the scheduled-feed timers in the cloud — stopped firing. This is the load-bearing failure: the feeders weren't deciding *when* to feed; the cloud was, and the cloud went quiet.
- The **device-control endpoints** the feeders polled went unreachable, so the app showed "device offline" for everyone at once. A fleet-wide simultaneous outage points at a backend, not at the hardware.
- The **manual-feed button on the unit still worked**. That's the one mercy in the whole episode, and it's also the tell: the feeder is perfectly capable of dispensing without the cloud — it just isn't *scheduled* without it.

Why a small company's backend stays down for a *week* rather than hours is the part no statement will explain, but the pattern is familiar: a company low on money and people, running infrastructure it can no longer staff or pay for, hitting a failure that a healthy team would have caught in an hour. The outage isn't really the story. The *week* is. A week-long outage is what a company looks like when there's nobody left to fix it.

![The single point of failure in a cloud-scheduled feeder. The feeding schedule and its timer live in the vendor's cloud; the feeder is a dumb dispenser that waits to be told when to act. When the cloud's dispatch service stops firing, every feeder in the fleet goes "offline" at once and no scheduled feed happens anywhere — the only path left is a human walking over and pressing the manual button. The hardware never broke; the one brain it depended on did.](../../assets/blog/petnet-single-point-of-failure.svg)

## What pet owners experienced

The on-the-ground arc, from Twitter and the pet-IoT forums:

- **Feb 14-15**: confusion. "My feeder shows offline; what's going on?" Petnet's own tweet said the units would still dispense on schedule. Many owners believed it, and only found out otherwise when they noticed the bowl was empty.
- **Feb 16-17**: realization. The Petnet subreddit filled with "is everyone else's feeder broken?" threads. Owners who could started feeding by hand.
- **Feb 18-20**: anger, then alarm. Still no real communication from Petnet. Vet visits started — cats showing early signs of hepatic lipidosis after several missed feeds. The tech press (TechCrunch, Techdirt, Newsweek) ran the story; the Petnet brand died in real time, in public.
- **Feb 21**: service restored. The boilerplate statement landed — no mention of compensation, no acknowledgment of the pets harmed.

![The week-long outage drawn as a timeline from February 14 to 21. Each day is a node: the 14th, Petnet tweets "investigating" while feeds stay off; the 15th and 16th, confusion and empty bowls; the 17th, owners asking if everyone's feeder is broken; the 18th through 20th, vet visits and the tech press picking it up; a stretch of total silence with no status page and no email; the 21st, service restored with a boilerplate statement; and after, a brand already dead. A red bracket spans the whole week marking that no scheduled feed fired the entire time. A caption contrasts a six-hour bug with a seven-day outage — what a company looks like when there's nobody left to fix it.](../../assets/blog/petnet-collapse-week-timeline.svg)

## The pet harm

There are no hard numbers — Petnet won't release any, and the harm is scattered across individual households. But the shape of it, from the posts and the press, is consistent and grim:

- Many cats missed enough consecutive feeds to be at real risk. Owners who were traveling and trusting the feeder were the worst hit — "my cat starved while we were out of town, neighbors had to save her" was a recurring story.
- Cats are the danger case. A cat that stops eating for two-plus days can develop **hepatic lipidosis** — fatty liver disease — which is life-threatening and develops fast, especially in overweight cats. Several owners reported vet visits for exactly this.
- Dogs went hungry too, but dogs tolerate a short fast far better than cats; the lasting-harm reports are overwhelmingly feline.

The asymmetry is the whole point: a feeder outage isn't a uniform inconvenience. For a dog it's a bad day. For a cat it can be a vet bill or worse. A device that can't tell the difference, owned by a company that won't answer the phone, is a genuinely dangerous combination — not a buggy one.

![Why the same outage is a nuisance for a dog and an emergency for a cat. A dog tolerates a missed day or two of food and recovers; the risk curve stays low for days. A cat that stops eating crosses into hepatic-lipidosis risk after roughly two days, and the danger climbs steeply from there. A week-long feeder outage sits well past the cat's danger threshold while barely troubling the dog — so the harm from a single failure depends entirely on which animal was relying on it.](../../assets/blog/petnet-cat-dog-harm-asymmetry.svg)

## My household — what happened

My household survived because of the redundancy I [set up two years ago](/blog/petnet-smart-feeder-long-term-review/):

- Joule's primary feeder: Petnet (offline).
- Joule's backup feeder: PetSafe Smart Feed (mechanical timer, working fine).

The PetSafe fired every one of Joule's feeds across the whole week. She had no idea anything was wrong.

Atom is fed manually by family (no auto-feeder), so he was unaffected.

I had been [advocating for this backup architecture since 2017](/blog/petnet-smart-feeder-long-term-review/). It paid off. The lesson is the lesson: **never have a single cloud-dependent device responsible for pet feeding**.

## What pet-IoT customers should do now

For anyone with a connected pet device:

1. **Get a non-connected backup**. Mechanical-timer feeder for feeders. Manual-cleaning litter box as backup for connected litter. SureFlap door is mostly mechanical (the connectivity is layered on; the door works without the hub).

2. **Set a "did it fire?" check routine**. Every morning, verify scheduled feeds happened. Every week, verify cycles happened.

3. **Don't trust the vendor's status page**. They're financially incentivized to under-communicate outages.

4. **Look at the company's financial health publicly**. Layoff announcements, missed funding rounds, declining App Store reviews — these are leading indicators.

5. **Document your data export options**. If the vendor folds, can you still get your historical data? Most vendors have NO data export. Plan accordingly.

## What the industry will (and won't) learn

What the industry **should** learn:
- Schedule lives on the device, not the cloud.
- Watchdog notifications when scheduled events don't fire.
- Mechanical fallback paths for any pet-care function.
- Status pages and outage communication, mandatorily.

What the industry will **actually** learn:
- "Petnet was different." (No they weren't.)
- "Our infrastructure is more robust." (Until it isn't.)
- "We have better customer service." (Until you don't.)
- Marketing department additions to the privacy policy ("we will notify customers within 24 hours of outages"). Implementation: none.

I do not expect the pet-IoT category to structurally improve from the Petnet collapse. Same playbook as Wink in smart home. Same lessons reluctantly half-learned.

## What I'm doing differently going forward

- **Petnet feeder unplugged from my network**. It's a brick now.
- **PetSafe Smart Feed primary** for Joule.
- **Looking into ESP-based DIY pet feeders** — the same DIY firmware approach I'm using for [smart-home temperature sensors](/blog/humidity-triggered-bathroom-fans/) should work for a simple servo-driven pet feeder. Local-only, no cloud, no vendor solvency dependency.
- **Refusing to buy any future "smart" pet device** that doesn't have:
  - Local schedule storage.
  - Mechanical fallback.
  - At least 12 months of public reliability data.
  - A company that's been profitable for at least 24 months.

## What's next

Here's the depressing part: the Petnet failure will be forgotten by most new pet owners within a year. The category keeps growing, the next buyer doesn't read the post-mortems, and the next vendor's pitch deck will say "we're not Petnet" right up until the morning their backend doesn't wake up. The market does not punish cloud fragility — it forgets it.

The cautionary tale is documented. Whether anyone listens is the next decade's question. My own answer is on my bench: a feeder whose schedule lives on the device, that I built so that no company's solvency stands between my cat and her dinner.

The DIY build is the next thread.
