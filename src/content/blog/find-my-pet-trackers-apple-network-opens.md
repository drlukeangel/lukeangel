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
excerpt: "Apple's Find My opened to third-party trackers in 2021; by 2024 there are small BLE clips — Pebblebee, Chipolo, eufy — light enough to ride a cat collar. Two months on Joule: where the crowdsourced network sees her, where it doesn't, and why none of these is actually a pet device."
pullquote: "Find My-network pet trackers don't replace cellular trackers like Fi. They complement them. BLE + 1 billion iPhones crowdsourced relay works for finding a lost pet in a city. It doesn't work in rural areas, and it never tracks in real-time. For active outdoor tracking, cellular still wins."
cover: "../../assets/blog/find-my-pet-trackers-apple-network-opens-cover.svg"
coverAlt: "A seated cat wears a small clip tag on its collar that sends out a short Bluetooth ping. Three passing phones pick the ping up in turn and relay it onward, the last hop reaching a cloud marked with a padlock — the location is carried by other people's phones and stored encrypted, the way the Find My crowdsourced network works."
---

Apple opened the Find My network to third-party accessories in 2021. The first generation of certified Find My pet trackers landed in 2024:

- **Pebblebee Clip** ($30) — small circular BLE tracker with a clip loop, 12-month coin-cell. Not a pet SKU, but small and light enough to live on a cat collar.
- **Chipolo One Spot** ($30) — generic BLE tracker, marketed for keys but collar-compatible.
- **Eufy SmartTrack Card** ($25) — credit-card-shaped, fits a harness pocket.

None of these is a *pet-specific* device — there's no "for pets" SKU here, just general Find My item-trackers small enough to ride a collar. That matters, because it means they carry the **same** anti-stalking behavior as [AirTag-on-collar](/blog/airtag-on-atoms-collar-anti-stalking-ironies/), the thing Apple specifically warns against for pets. In May, Apple and Google shipped a joint unwanted-tracking standard, and Pebblebee, Chipolo, and eufy all committed to it — so a tracker that's separated from its owner can still announce itself to strangers. There is no "this is a pet, hush" exemption. Worth keeping in mind before you read these as purpose-built pet gear; they aren't.

Tested a Pebblebee Clip for two months on Joule.

## What the Find My-certified pet trackers actually are

- **BLE** advertisement, the same shape as AirTag.
- **CR2032 coin cell** (Pebblebee Clip: ~12 months claimed).
- **Find My network connectivity** — any iPhone within BLE range relays an anonymized, encrypted location blob to iCloud.
- **No cellular, no GPS** on the device itself.
- **Visible in Apple's Find My app** like any other Find My accessory.

The thing I expected and didn't find: a "pet mode." There isn't one. A third-party Find My accessory is a Find My accessory — it's enrolled through the same Made-for-iPhone program and follows the same unwanted-tracking rules as everything else on the network. The joint Apple/Google standard that landed in May is explicitly *device-type-agnostic*: a tracker that's been separated from its owner for a while can be made to chirp by a stranger's phone and surfaces a bystander alert, regardless of whether it's clipped to keys or a cat. That's the whole anti-stalking design, and it doesn't carve out pets. So the "is this safe to leave on the cat?" question is the *same* question as it is for an AirTag — which is exactly the [tension I wrote about putting one on Atom's collar](/blog/airtag-on-atoms-collar-anti-stalking-ironies/).

The piece worth being clear-eyed about is how the tag gets located at all, because it explains everything that follows about where it works and where it doesn't. The tag has no GPS and no cellular — it can't sense its own position. All it does is shout a short, rotating, encrypted "I'm here" identifier over BLE. The locating is done by *other people's phones*: any iPhone that walks past hears the shout, stamps it with the phone's own GPS fix, and uploads an encrypted blob that only my iCloud account can open. The location of the tag is, quite literally, borrowed from whoever happened to wander by.

![How a tag with no GPS still produces a location. A Bluetooth tag with no GPS and no cellular emits only "I'm here" pings; a stranger's passing phone hears the ping, stamps it with its own GPS fix, and uploads an end-to-end-encrypted blob to the Find My cloud, which only the owner's phone can decrypt. A red callout marks the catch: the location is just the last time a phone happened by, so with no phones nearby there is no fix. A caption notes the tag never knows where it is — it borrows a location from whatever phone wandered past.](../../assets/blog/find-my-crowdsourced-relay.svg)

That borrowing is the whole story. It's why the tag is wonderfully cheap and lasts a year on a coin cell — and it's why the location is *last-seen*, never live.

## Joule on Pebblebee Clip

Joule wears the Pebblebee Clip on her collar. She's an outdoor cat (in the new yard, supervised) with [SureFlap door access](/blog/sureflap-microchip-cat-door-joules-first-iot/). I wanted to test whether Find My's crowdsourced network sees her on the days she's out.

**Density results in my (suburban) neighborhood:**

- **Within 50m of the house**: Joule's tracker is visible in Find My ~95% of the time. Density of iPhones on the street is high enough.
- **Within the yard (50-100m)**: ~80% — fewer iPhone-bearing humans pass by.
- **Beyond the yard, in the woods**: <20%. Almost no human traffic, Find My doesn't see her.

For "did Joule wander off" — works for confirming she's still in the home BLE area, less useful for tracking her wherever she went.

![Find My detection rate by zone around the house, drawn as concentric rings with a house at the centre and scattered iPhone dots that thin out with distance. Within about 50 metres of the house the tracker is seen roughly 95 percent of the time; out in the yard at 50 to 100 metres it drops to about 80 percent; off in the woods with no foot traffic it falls below 20 percent. A note observes this is the exact opposite of where you most need to find a wandering pet, and a caption reads: crowdsourced coverage is best where you needed it least, and worst where the pet actually got lost.](../../assets/blog/find-my-density-by-distance.svg)

The shape of that result is the thing to internalize: detection tracks *foot traffic*, not the pet. The crowdsourced network is densest exactly where I least need it — on my own street, where I'd find her anyway — and effectively blind in the woods behind the house, which is the one place a missing cat actually ends up.

## What it doesn't do that cellular does

The major gap: **no real-time tracking, no continuous location**. Find My is **last-seen** based. If Joule is in the woods and no iPhones pass by, her last-known location is the last time someone walked past with an iPhone — which might be hours ago.

Compare to Fi (cellular):
- **Fi**: 14-day battery, $99 + $99/yr, cellular real-time tracking.
- **Find My pet tracker**: 12-month battery, $35 one-time, crowdsourced delayed location.

For Atom-style escape-artist outdoor dogs: cellular is the right choice. For Joule-style indoor-mostly cat: Find My is the right complement to the SureFlap door.

![A side-by-side comparison of a Find My BLE clip against a cellular collar like Fi, framed as complements that fail in opposite places. The Find My clip lasts about twelve months on a coin cell, costs roughly thirty-five dollars one-time with no fee, gives only a last-seen location that is never live, needs a passing iPhone to be seen, and is end-to-end encrypted; it wins for an indoor-mostly pet that rarely slips out where foot traffic is dense, but goes blind in the woods where a cat actually ends up. The cellular collar lasts about fourteen days and needs frequent charging, costs ninety-nine dollars plus ninety-nine a year, gives real-time continuous location, works wherever there is a tower, and exposes location to the vendor cloud; it wins for an escape-artist dog you can't lose by following it live, but dies in carrier dead zones and needs daily charging. The bottom line: for a dog you can't lose, run both — cellular for live tracking, the clip as a crowdsourced backup.](../../assets/blog/find-my-pet-trackers-apple-network-opens-fig-3.svg)

## The use case where Find My pet trackers shine

**Indoor pets that occasionally wander.** A house cat that sneaks out one in twenty times when the door opens. A small dog that bolts when the front door is left ajar. These are the scenarios where:
- The escape probability is low (don't need to pay for continuous cellular).
- The recovery scenario is "the cat is somewhere within a mile of home, mostly likely on the block."
- A passing dog walker with an iPhone is likely to detect the tracker within an hour.

In my house: Joule is the right candidate. Boson too (we put one on her after Joule's was working). Atom + Quark — overkill (Quark is on Fi cellular; we don't need the BLE backup).

## What Pebblebee specifically gets right vs AirTag

- **Smaller form factor**: the Clip is roughly 70% of AirTag's footprint and clips flush — less to swing off a collar.
- **A clip loop, not a holder**: it attaches to a collar directly; AirTag needs a separate (often bulkier) collar holder.
- **Replaceable coin cell** with a design that makes the swap obvious.

I want to be careful here, because it's the thing the marketing on all of these glosses: the Pebblebee is a nicer *form factor* for a collar than an AirTag, but it is **not** a safer-for-pets device in any anti-stalking sense. Both ride the same Find My network and follow the same separation-alert rules. The collar ergonomics are better; the fundamental "a stranger can be told this tracker is near them" behavior is identical. Pick it for the size and the clip, not because it somehow sidesteps the part Apple built on purpose.

## What I'm thinking about for Quark

Quark currently wears Fi (cellular). I'm considering adding a Pebblebee Clip as a redundancy — the BLE crowdsourced layer as backup if Fi's cellular gets unreliable (it has, twice this year, in T-Mobile dead zones). Two-tracker redundancy is the answer for dogs you can't lose.

## Privacy considerations

Find My data is end-to-end encrypted in Apple's design. Apple itself can't see the location of my Joule. Only my iCloud account can. The crowdsourcing iPhones relay anonymized encrypted blobs.

This is genuinely better privacy than Whistle/Fi's cellular trackers, where the vendor cloud has plaintext location data. For a pet tracker, "the device manufacturer can't track your pet" is a meaningful privacy improvement.

## What's next

Year-end review for 2024. Atom's passing was the big personal story. Find My pet trackers + the post-Atom assessment of what I learned over 11 years are the technical stories.
