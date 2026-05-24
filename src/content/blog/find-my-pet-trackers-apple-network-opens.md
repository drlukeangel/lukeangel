---
title: "Find My pet trackers — Apple's network opens to third-party"
date: 2024-08-22T11:00:00-04:00
category: tools
tags:
  - pet-iot
  - apple
  - find-my
  - airtag
  - third-party
notebook: pet-iot-field-guide
notebookOrder: 36
excerpt: "Apple's Find My opened to third-party trackers in 2021. 2024 brought pet-specific versions: Pebblebee Clip for Cats, Chipolo One Spot, Eufy SmartTrack. Do they replace cellular trackers like Fi?"
pullquote: "Find My-network pet trackers don't replace cellular trackers like Fi. They complement them. BLE + 1 billion iPhones crowdsourced relay works for finding a lost pet in a city. It doesn't work in rural areas, and it never tracks in real-time. For active outdoor tracking, cellular still wins."
cover: "../../assets/blog/find-my-pet-trackers-apple-network-opens-cover.png"
coverAlt: "Find My pet trackers — Apple's network opens to third-party"
---

Apple opened the Find My network to third-party accessories in 2021. The first generation of certified Find My pet trackers landed in 2024:

- **Pebblebee Clip for Cats** ($35) — BLE tracker explicitly designed for collar attachment, sized small for cats.
- **Chipolo One Spot** ($30) — generic BLE tracker, marketed for keys but pet-compatible.
- **Eufy SmartTrack Card** ($25) — credit-card-shaped, for collars or harnesses.

These are different from [AirTag-on-collar](/blog/airtag-on-collars-anti-stalking-ironies/) (which Apple specifically warns against). They're built for pet use cases and don't have AirTag's audio-chirp anti-stalking behavior in the same way.

Tested Pebblebee Clip for Cats for two months on Joule.

## What the Find My-certified pet trackers actually are

- **BLE 5.0** advertisement, similar to AirTag.
- **CR2032 coin cell** (Pebblebee Clip: ~12 months claimed).
- **Find My network connectivity** — any iPhone within BLE range relays anonymized location to iCloud.
- **No cellular, no GPS** on the device itself.
- **Anti-stalking mitigations** designed for pets (notifications to bystanders without the audio chirp on tagged-as-pet accessories — the third-party manufacturer's choice within Apple's framework).
- **Visible in Apple's Find My app** like any other Find My accessory.

The pet-specific tweak: Apple's third-party API lets manufacturers indicate "this is a pet accessory" — which slightly modifies the anti-stalking behavior. Specifically, the audio chirp can be suppressed (the pet wearing the tracker doesn't get a 24-hour-separated chirp). The bystander alert still fires for unknown trackers near someone.

## Joule on Pebblebee Clip

Joule wears the Pebblebee Clip on her collar. She's an outdoor cat (in the new yard, supervised) with [SureFlap door access](/blog/sureflap-microchip-cat-door-joules-first-iot/). I wanted to test whether Find My's crowdsourced network sees her on the days she's out.

**Density results in my (suburban) neighborhood:**

- **Within 50m of the house**: Joule's tracker is visible in Find My ~95% of the time. Density of iPhones on the street is high enough.
- **Within the yard (50-100m)**: ~80% — fewer iPhone-bearing humans pass by.
- **Beyond the yard, in the woods**: <20%. Almost no human traffic, Find My doesn't see her.

For "did Joule wander off" — works for confirming she's still in the home BLE area, less useful for tracking her wherever she went.

## What it doesn't do that cellular does

The major gap: **no real-time tracking, no continuous location**. Find My is **last-seen** based. If Joule is in the woods and no iPhones pass by, her last-known location is the last time someone walked past with an iPhone — which might be hours ago.

Compare to Fi (cellular):
- **Fi**: 14-day battery, $99 + $99/yr, cellular real-time tracking.
- **Find My pet tracker**: 12-month battery, $35 one-time, crowdsourced delayed location.

For Atom-style escape-artist outdoor dogs: cellular is the right choice. For Joule-style indoor-mostly cat: Find My is the right complement to the SureFlap door.

## The use case where Find My pet trackers shine

**Indoor pets that occasionally wander.** A house cat that sneaks out one in twenty times when the door opens. A small dog that bolts when the front door is left ajar. These are the scenarios where:
- The escape probability is low (don't need to pay for continuous cellular).
- The recovery scenario is "the cat is somewhere within a mile of home, mostly likely on the block."
- A passing dog walker with an iPhone is likely to detect the tracker within an hour.

In my house: Joule is the right candidate. Boson too (we put one on her after Joule's was working). Atom + Quark — overkill (Quark is on Fi cellular; we don't need the BLE backup).

## What Pebblebee specifically gets right vs AirTag

- **Smaller form factor**: Pebblebee Clip is ~70% AirTag's size. Less collar bulk.
- **Replaceable battery** (AirTag is user-replaceable too, but Pebblebee's design is more obvious).
- **Pet-specific marketing**: makes the bystander alert behavior clearer.
- **No 24-hour separation chirp** by default for pet-flagged accessories.

The Pebblebee is a better pet-specific Find My device than AirTag. Apple's design for AirTag is fundamentally anti-stalker-first; Pebblebee's design for pets is just pet-first.

## What I'm thinking about for Quark

Quark currently wears Fi (cellular). I'm considering adding a Pebblebee Clip as a redundancy — the BLE crowdsourced layer as backup if Fi's cellular gets unreliable (it has, twice this year, in T-Mobile dead zones). Two-tracker redundancy is the answer for dogs you can't lose.

## Privacy considerations

Find My data is end-to-end encrypted in Apple's design. Apple itself can't see the location of my Joule. Only my iCloud account can. The crowdsourcing iPhones relay anonymized encrypted blobs.

This is genuinely better privacy than Whistle/Fi's cellular trackers, where the vendor cloud has plaintext location data. For a pet tracker, "the device manufacturer can't track your pet" is a meaningful privacy improvement.

## What's next

Year-end review for 2024. Atom's passing was the big personal story. Find My pet trackers + the post-Atom assessment of what I learned over 11 years are the technical stories.
