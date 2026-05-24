---
title: "Petnet's cracks are visible — the early warning"
date: 2019-04-22T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - petnet
  - smart-feeder
  - cloud-dependency
  - failure
notebook: pet-iot-field-guide
notebookOrder: 18
excerpt: "Petnet had two outages in April — one 18-hour, one 6-hour. No communication. Layoffs rumored in pet-tech press. Three+ years of consolidation about to claim a victim. Notes on what to do."
pullquote: "When a connected pet device's cloud goes down repeatedly without explanation, the company is in trouble. The outage history is the leading indicator of the company's solvency. By the time the bankruptcy notice comes, the pets have already been hungry for days."
cover: "../../assets/blog/petnets-cracks-visible-early-warning-cover.png"
coverAlt: "Petnet's cracks are visible — the early warning"
---

[Petnet had two outages this month](/blog/petnet-smart-feeder-long-term-review/). One 18-hour event, one 6-hour event. The 18-hour outage missed *three* feeds for Joule + Atom. My backup PetSafe Smart Feed feeder caught two of them. One was missed entirely.

The Petnet company has gone silent. No status page updates. No emails to customers. The pet-tech press is reporting rumored layoffs.

This is the slow-motion failure I [predicted three years ago](/blog/2016-pet-iot-year-in-review/) but kept being wrong on timing. The timing is finally here.

## The pattern of a cloud-dependent vendor failing

This is a category that's playing out for the first time in pet IoT. The pattern, from observable history of other cloud-dependent consumer hardware:

1. **Initial outages become more frequent**. Petnet's outage cadence:
   - 2017: 2 single-day outages.
   - 2018: 3 single-day outages.
   - 2019 Q1: 4 outages in 3 months.
   - This trend doesn't reverse. Companies that can't afford reliable infrastructure don't suddenly find the budget.

2. **Communication degrades**. Petnet's email response time has gone from same-day in 2017 to weeks-or-never in 2019. Their status page hasn't been updated in months.

3. **Software development slows**. The Petnet iOS app hasn't had a meaningful update in 8 months. iOS 12 compatibility was patched late. iOS 13 (rumored September) is going to be a problem.

4. **Hardware shipping slows or stops**. Petnet 2.0 was announced 2017, never shipped in volume. Inventory of replacement parts is rumored low.

5. **Then the company quietly stops responding**. Servers eventually go offline.

6. **THEN the bankruptcy notice arrives** (or doesn't, and the company just vanishes — happens with foreign-owned VC-backed startups).

We're somewhere between steps 3 and 5 with Petnet.

## What pets actually experience

The user-visible failure mode for Petnet specifically:

- Scheduled feeds don't fire.
- The app shows "device offline" without explanation.
- Manual button on the unit *does* still work (Petnet has a physical feed-now button that bypasses the cloud).
- Customer service emails aren't returned.

For a dog like Atom: missing two consecutive feeds is uncomfortable, not catastrophic. He'll be very hungry; nothing more.

For a cat like Joule: missing 36-48 hours of feeds is medically serious. Cats develop **hepatic lipidosis** (fatty liver disease) if they don't eat for 2+ days. It's a life-threatening condition that develops fast in inadequately-fed cats, especially overweight ones.

**This is why Petnet's failure mode is genuinely dangerous, not just inconvenient.** The risk profile is asymmetric.

## What I'm doing now (and what every Petnet customer should be doing)

1. **The backup PetSafe Smart Feed is now primary**. Mechanical timer, no WiFi, no app. Tested daily.
2. **Petnet is secondary** — runs in parallel, dispenses if it can. I no longer rely on it.
3. **Daily 7 AM check**: did the morning feed happen? Manual override if not.
4. **Smaller hopper fills**. If I'm going on vacation, the kibble in Petnet is small enough that it's gone in 3-4 days, forcing me to come back to manual feeding before catastrophe.

If you're a Petnet customer and don't have a backup feeder, get one. PetSafe Smart Feed ($90) is the right choice — mechanical timer, no software, no WiFi. It will outlive every connected feeder.

## The broader lesson for connected pet hardware

The cloud-dependency risk for connected pet devices is **categorically different** from the same risk for connected smart-home devices.

A smart bulb that won't turn on because its cloud is down is annoying. A smart feeder that won't dispense food is animal welfare. A smart litter box that won't cycle creates an unpleasant cat. A smart pet door that won't unlock locks your cat outside in the cold.

The pet-IoT category is the first connected-hardware category where **vendor solvency is a safety-of-pet question**. That changes the calculus. Specifically:

- **Never buy a cloud-dependent pet device without a non-cloud-dependent backup**.
- **Never trust a small-startup pet-device company's "feature roadmap"** — be skeptical of post-purchase software updates.
- **Read the EULA** — what happens if the company is acquired or fails? Does the device brick? (For Petnet: yes, the device bricks if the cloud is unreachable.)
- **Prefer devices with mechanical fallback** (Petnet's manual button is something, but it requires being physically present).

## What I want to see next in the category

A class of pet devices that **schedule lives on the device, not the cloud**. The cloud is for *changing* the schedule. If the cloud is unreachable, the device executes the last-known schedule from local storage.

This is the architecture I've been arguing for since [Petnet's first outage in 2018](/blog/petnet-smart-feeder-long-term-review/). Nobody has built it yet. The market opportunity is real.

## What's next

I expect Petnet to have a multi-day outage in 2019 — probably summer or fall when their infrastructure budget runs low. The "year-end review" post might be writing the company's eulogy.

For now: backup feeder primary. Petnet secondary. Daily check. The list of "things to do because Petnet might collapse" gets longer every month.
