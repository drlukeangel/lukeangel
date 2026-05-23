---
title: "AirTag on Atom's collar — anti-stalking vs pet tracking"
date: 2021-05-08T14:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - airtag
  - apple
  - find-my
  - privacy
notebook: pet-iot-field-guide
notebookOrder: 25
excerpt: "AirTag shipped April 30. Strapped one to Atom's collar — Apple tells you not to. Notes on why anti-stalking design is structurally incompatible with intentional pet tracking, and Find My's limits."
pullquote: "AirTag's anti-stalking features are designed to alert an unsuspecting person that an AirTag is following them. When the AirTag is on your dog who's exited the geofence, your dog gets the 'someone is tracking you' chirp. Apple's design assumes the tagged entity is a person, and pet tracking breaks that assumption in interesting ways."
---

Apple shipped AirTag April 30. Bought a four-pack ($99) immediately. Strapped one to Atom's collar in a silicone case.

Apple specifically says don't do this. In the AirTag setup flow, there's a dedicated screen warning that AirTag is not designed for pet tracking. Apple recommends a dedicated pet tracker.

Did it anyway. Notes on what works, what doesn't, and why Apple's design philosophy is structurally incompatible with pet tracking.

## The hardware

- 31.9 mm diameter, 8 mm thick, 11 g. Smallest cellular-tracker-class device I've seen.
- **BLE 5.0** + **U1 ultra-wideband chip** for precision finding (within 1 m, iPhone 11+ only).
- **NFC** for "found this AirTag" handoff with iPhones.
- **CR2032 coin cell** — claimed 12+ months.
- No GPS, no cellular. The "location" comes from Apple's **Find My network** — every iPhone in the world that's BLE-near the AirTag relays its position back to iCloud anonymously.

The CR2032 + crowdsourced model is what differentiates AirTag from Whistle/Fi. No subscription. No cellular dongle. No GPS chip. Year-long battery.

## What it does for pet tracking

**Best case** (Atom escapes, walks past someone with an iPhone):
- The bystander's iPhone hears Atom's AirTag's BLE advertisement.
- iPhone reports the encrypted location to iCloud.
- I see Atom's last-known location in the Find My app on my phone.
- I drive over and pick up Atom.

**Worst case** (Atom in deep woods, no iPhones around):
- AirTag silently broadcasts to no one.
- Last-known location is wherever I last saw him. Stale data.

For dense suburban areas: works well. Find My network has ~1 billion iPhones globally. In my neighborhood, an AirTag goes ~30-60 seconds without being seen by some passing iPhone.

For rural areas / hiking trails / national parks: useless. No iPhones nearby.

## Where Apple's anti-stalking design breaks pet tracking

This is the interesting engineering tradeoff.

AirTag has aggressive **anti-stalking features**:

1. **Audio chirp**: if an AirTag is separated from its owner (i.e., not near the iPhone that registered it) for ~8-24 hours, it emits a loud chirp every few hours. Audible from ~3-5 meters away.

2. **iPhone alert to bystanders**: if a foreign AirTag is detected near a bystander's iPhone for too long (~1-4 hours moving), the bystander's iPhone alerts them: "Unknown AirTag detected near you. Tap to find out more."

3. **NFC handoff**: the chirping/alerted bystander can tap their phone to the AirTag and see the last 4 digits of the owner's phone number for return.

For Atom:

- **The audio chirp is a problem.** If Atom is lost and away from my iPhone for 24+ hours, the AirTag will start chirping. Useful for someone finding him to know "this AirTag is currently lost, contact owner." But for a scared lost dog, the random chirp from his own collar will spook him. He's going to associate the noise with his own movement and potentially try to dislodge the collar.

- **The "unknown AirTag" alert is annoying.** Anyone who walks near Atom for more than an hour or two gets a "stranger AirTag near you" alert. If we go to the park, every iPhone-carrying parkgoer gets pinged. Slightly creepy from the bystander's perspective.

- **The NFC handoff is the actually-useful one.** If someone finds Atom, they tap their iPhone to the AirTag and see my phone number. Works.

## Apple's stated workarounds for pet tracking

Apple recommends:
- Disable the audio chirp on AirTags you intentionally put on pets (you can't, this isn't a setting).
- Don't put AirTags on pets at all; use a dedicated pet tracker.
- Use Fi or Whistle or Tagg-class cellular trackers.

Apple's position: AirTag is for *objects you own* that you don't expect to move on their own. Pets violate that assumption. The design assumes "if this is moving away from you, it's probably stolen, alert everyone." For a dog who slipped his leash, "alert everyone" is the right behavior. For a dog you take to the park, "alert everyone" is too noisy.

## The structural incompatibility

The core issue: **AirTag's anti-stalking design is fundamentally human-centric**. It assumes the tagged entity is a human who might unknowingly be tracked. The mitigations (chirp, bystander alert) are designed to surface the AirTag to the unwilling tagged person.

For a pet, the "tagged person" is the pet — and pets don't have iPhones. They can't see alerts. They can't disable the chirp. The mitigations are all designed for a use case that doesn't apply.

This isn't Apple being careless. It's a deliberate design tradeoff: AirTag is anti-stalker-first, pet-tracker-by-misuse-second. The category Apple wants to address is "keys, wallet, luggage" — objects. Pets are not in the design target.

## What I'd use AirTag for

After three weeks of testing on Atom:

- **Atom**: removed. The chirp is genuinely problematic when he's away from me. Going to keep using Fi as primary tracker.
- **Joule's outdoor collar**: not using (cats aren't outdoor enough for Find My network density to matter for us).
- **My keys**: using.
- **My laptop bag**: using.
- **My car**: using (won't help if stolen, but useful for finding in parking lots).

For pet tracking specifically: AirTag is the wrong tool. Fi is the right tool.

## What I want — but won't get

The right product would be:
- AirTag-class hardware (12-month coin cell, BLE crowdsourced network).
- WITHOUT the audio chirp.
- With explicit "this is a pet, please contact owner" NFC handoff.
- Owner-controlled bystander alert behavior.

Apple won't ship this because it would undermine the anti-stalking guarantees that make AirTag socially acceptable. The category would need a third-party device using a separate crowdsourced network — Tile-for-pets has tried but the network is much smaller than Apple's.

Per anti-stalking regulation efforts coming in 2022-2023, the trade-off only gets stricter. AirTag's design will become *more* aggressive about unsolicited tagging, not less. Pet-tracking via AirTag will get harder, not easier.

## What's next

Whistle Health & GPS Plus shipped this month with vitals (temperature, heart rate, scratching). Going to evaluate against Fi — the vitals are interesting even if the Mars-ownership is still a problem.
