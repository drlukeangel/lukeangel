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
excerpt: "Petnet's servers went down February 14. Stayed down over a week. Cats and dogs didn't get fed. The cautionary tale I [forecast in 2017](/blog/petnet-smart-feeder-long-term-review/) finally arrived."
pullquote: "Petnet's nine-day outage is the case study every connected-device pitch deck will cite for the next decade. The company that promised to feed your pet failed to feed your pet for a week and a half. The 'smart' became the failure mode."
cover: "../../assets/blog/petnet-collapses-anatomy-of-smart-device-catastrophe-cover.png"
coverAlt: "Petnet collapses — the pet-IoT cautionary tale, written"
---

Petnet's cloud went down February 14. Stayed down until February 23. Nine days.

For nine days, Petnet customers' scheduled feeds did not fire. Pets across the country didn't eat unless owners manually fed them. Petnet didn't communicate during the outage, didn't email customers, didn't update their status page. Customer service didn't respond. Their phone tree played a recording. Some customers' cats developed hepatic lipidosis; vet bills got submitted; lawyers got hired.

The cautionary tale I [forecast in 2017](/blog/petnet-smart-feeder-long-term-review/) finally arrived. This is what happened.

## What broke

Petnet's company-public-statement (issued after the outage, after pressure from a small group of customers organized on Twitter):

> *"Our cloud services experienced a critical infrastructure failure on February 14 affecting scheduled-feed dispatching. We have restored service and apologize for the disruption."*

That's the official version. The unofficial / pieced-together version, from former employees + technical reverse-engineering by some of the more technically-inclined Petnet owners:

- Petnet's cloud was AWS-hosted. They got cut off — non-payment of cloud bill, per multiple reports.
- The dispatch service (Lambda-based, fired scheduled feeds) was offline.
- The device-control service (HTTP endpoints the feeders polled) was offline.
- The mobile app showed "device offline" for everyone.
- Manual-feed buttons on the feeders themselves still worked (the only saving grace).

The company had been hemorrhaging cash for 18+ months. Series B funding fell through in early 2019. Layoffs happened in March. The remaining team couldn't afford the AWS bill.

## What pet owners experienced

The on-the-ground impact, from Twitter and the pet-IoT forums:

- **Day 1-2**: confusion. "My feeder shows offline; what's going on?" Pet owners not on Twitter mostly didn't know anything was wrong until they noticed their cats weren't eating.
- **Day 3-4**: realization. The Petnet subreddit exploded with "is everyone else's feeder broken?" threads. Owners started manually feeding.
- **Day 5-7**: anger. No communication from Petnet. Vet visits started — cats showing early signs of hepatic lipidosis after multiple missed feeds.
- **Day 8-9**: media coverage. The Verge wrote about it. Mainstream pet press picked it up. The Petnet brand died in real time.
- **Day 10 (Feb 24)**: service restored. Company statement issued. No mention of compensation, no acknowledgment of pets harmed.

## The pet harm

I don't have hard numbers (Petnet won't release any) but anecdotally:
- Dozens of cats developed measurable health issues from missed feeds.
- At least four reported severe cases of hepatic lipidosis requiring extended vet care.
- One reported feline death (cat with pre-existing conditions, the missed feeding sequence pushed her over).
- Hundreds of dogs went hungry but no reported lasting harm (dogs handle short-term hunger better than cats).

The pet-tech press has been more cautious than the consumer-tech press about reporting this, perhaps because pet-tech vendors are touchy advertisers. The actual scale of harm is probably worse than what's been documented.

## My household — what happened

My household survived because of the redundancy I [set up two years ago](/blog/petnet-smart-feeder-long-term-review/):

- Joule's primary feeder: Petnet (offline).
- Joule's backup feeder: PetSafe Smart Feed (mechanical timer, working fine).

The PetSafe fired all 9 of Joule's missed feeds. She had no idea anything was wrong.

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

The COVID-era pet adoption surge is starting. People stuck at home in March-April 2020 are getting puppies and kittens. The pet-IoT category is going to surge in demand. The Petnet failure is going to be forgotten by most new pet owners within 12 months.

The cautionary tale is documented. Whether anyone listens is the next decade's question.
