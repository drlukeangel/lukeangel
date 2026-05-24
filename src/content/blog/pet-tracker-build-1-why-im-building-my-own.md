---
title: "The Renewal Notice That Made Me Build My Own Pet Tracker"
date: 2026-04-27T09:00:00-04:00
category: product
tags:
  - iot
  - pets
  - hardware
  - build-in-public
  - product-management
notebook: iot-pet-health-tracker-build
notebookOrder: 1
excerpt: "Three pets, three subscriptions, and the bulk of what I get for the money is a green dot that says 'home.' After a decade of paying other people to tell me my pets are where I left them, I'm building the tracker I actually want."
pullquote: "I'm paying a cellular subscription to confirm a cat is asleep on the couch."
featured: false
---

The renewal notice landed for the third time this year — different pet, same number. Add it up across Quark's collar and the two on the cats and I'm spending north of three hundred dollars a year, most of it to confirm that animals who rarely leave my house are, in fact, in my house.

I've been in connected products my whole career, and buying connected-pet gear since [Atom got his first Whistle in 2013](/blog/atom-arrives-whistle-activity-monitor-launches/). Twelve years. It took a renewal email to make me actually do the math on what I'm paying for.

## What I'm actually paying for

Strip it down and the answer is uncomfortable: presence. Ninety-five percent of what these trackers tell me is "your pet is home," which I could get from a two-dollar radio that never leaves the house. The cellular link — the expensive part, the part the subscription exists to fund — earns its keep maybe a handful of times a year, when a pet is actually somewhere it shouldn't be.

And the cellular link is also why I'm on the charging treadmill. Always-on LTE is the reason these collars die every few days. So I'm paying a monthly fee *and* a recurring chore, both in service of a capability my indoor cats use approximately never.

## Tractive just proved my point

Right on cue, Tractive shipped the [CAT 6 Mini this month](/notebooks/pet-iot-field-guide/) — their newest cat tracker, and the first to carry real Health Intelligence: resting heart rate and respiratory rate on a 1.13-ounce collar. It's genuinely impressive, and it tells me the whole category is finally moving toward health, which is where the real value has always been.

But look at what it actually is: another cellular collar, another subscription, *per cat*. Joule and Boson have worn Tractive trackers for years and they don't leave the house. Putting a cellular plan on a cat that's asleep on the couch is the most on-the-nose version of the problem I've been paying into for a decade.

## The same gaps, twelve years running

I started all this with Atom — the first Whistle on his collar two months after he came home in 2013. He's gone now, and across his whole life the trackers got better at counting steps and never once got better at the things that actually bothered me: the cost scaled linearly with every pet I added, the batteries needed charging constantly, and the indoor case always paid full freight for range it never used.

Quark wears the dog version now; the cats wear theirs. Better silicon, glossier app, same three gaps.

## So I'm going to build it

Here's the thing — I do this for a living. I just [open-sourced a reference IoT stack](/blog/open-sourcing-the-connected-products-starter-kit/): AWS IoT Core, device certs, ingest, a dashboard, the works. The cloud half of a pet tracker is already sitting in a repo with my name on it. I have the backend, I have the wireless decision rubric I make every team run, and I have twelve years of receipts on exactly where these products fall short.

So I'm building the one I actually want. The bet is simple and it's the inverse of what everyone ships:

- **Cheap, with little or no subscription** — because most of the value doesn't need a cellular plan.
- **Months of battery, not days** — because nobody wants to charge the thing.
- **Location first, health later** — get the dot reliable before it takes a heart rate.
- **Matched to how pets actually live** — home most of the time, occasionally on a trail, rarely truly lost.

Next post is the part where I resist the urge to start soldering and do the PM work first: the use cases, the rubric, and an honest read on whether this is a product or just a grudge. Then we buy parts.
