---
title: "Boson arrives — the multi-cat engineering problem"
date: 2020-06-07T19:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - cat
  - multi-cat
  - sureflap
notebook: pet-iot-field-guide
notebookOrder: 22
excerpt: "Brought home Boson last weekend — 11-week-old tabby, COVID-era addition. Two-cat household now. Same feeder, same litter box, same cat door — two cats, two identities. Notes on what changes."
pullquote: "Multi-cat households break the single-cat assumption in every pet-IoT device. The 'which cat is using this?' question becomes the central engineering problem. Some devices have already solved it. Most haven't."
---

Brought home **Boson** last weekend. An 11-week-old gray tabby kitten, adopted from the local shelter. Pandemic adoptions are surging — adoption fee waived, both cats fixed already, microchipped at the shelter. Standard intake.

Boson is named per the household physics convention (Atom: particle, Joule: energy unit, Boson: Higgs particle). She's tiny (~2 lb) and Joule (now 6 yrs old, 9.5 lb) has not decided how she feels about the situation yet.

## The pet-IoT problem just got more complex

The single-cat assumption breaks today. Every device in the house that interacts with "the cat" now needs to know **which cat**. Specifically:

- **Litter-Robot**: counts visits and weight. Two cats means the visit + weight data needs per-cat attribution.
- **SureFlap microchip door**: was set up for Joule's chip. Boson has a different chip; needs to be added to the allow-list.
- **Auto-feeder (PetSafe Smart Feed)**: dispenses at scheduled times. Both cats can access the bowl. How do I portion-control per cat?
- **Indoor cameras (the new ones I'm adding for the post-Petnet self-monitoring)**: need to identify which cat is in frame.

This is the *multi-pet detection* engineering problem. Some pet-IoT devices have solved it. Most haven't.

## The chips, in brief

Boson's chip from the shelter is **134.2 kHz ISO 11784/11785** (modern standard). Joule's is the same (covered in [the 2014 microchip primer](/blog/joule-arrives-microchip-rfid-primer/)). Both chips have unique 15-digit IDs, registered to me with 24PetWatch.

Adding Boson to the SureFlap door's allow-list:

1. Hold the door's button for 3 seconds (learning mode).
2. Hold Boson near the reader.
3. Door reads her chip, beeps once, adds to allow-list.

30 seconds. Boson is now allowed through the door (curfew rules: indoor-only for now, since she's 11 weeks; will switch to outdoor-allowed at 6 months).

## What works for multi-cat in 2020

**SureFlap microchip door** — solves per-cat identity for entry/exit. Joule and Boson can each have their own access rules. Joule's curfew: out 7am-7pm. Boson's curfew: never out yet (will adjust later). Works perfectly.

**Litter-Robot III Connect** — *partially* solves the multi-cat problem. The unit's weight sensor records entry weight. Joule (~9.5 lb) and Boson (~2 lb growing) have very different weights, so attribution-by-weight is plausible:

```
Joule's typical entry weight: 9.4 - 9.6 lb
Boson's typical entry weight: 2.1 - 4.0 lb (growing rapidly)
```

The Litter-Robot app does NOT do per-cat attribution natively in 2020. It logs "weight at entry" but treats all visits as a single stream. To get per-cat data, I have to manually look at the entry-weight column and infer.

**The connected-litter ecosystem hasn't caught up to multi-cat yet.** I expect Litter-Robot or a competitor to ship "smart per-cat identification" in the next 1-2 years.

## What doesn't work for multi-cat

**The auto-feeder.** PetSafe Smart Feed dispenses into a single bowl. Both cats can access it. There's no way to portion per cat:

- Joule's daily allotment: 1/4 cup (mature adult cat).
- Boson's daily allotment: 1/3 cup (growing kitten, eats more).

If the feeder dispenses 1/3 cup at 6 AM, Joule gets there first and eats some, then Boson eats some — and neither gets the right portion.

The solution: **microchip-activated feeder**. SureFlap makes one (SureFeed Microchip Pet Feeder) but it's US-availability-limited. PetKit has one. The principle:
- Feeder has a chip reader at the bowl opening.
- Reader detects the approaching cat's chip.
- Feeder only opens its lid for chips on the approved list.
- Each cat gets a feeder programmed with their chip ID.

Ordering a SureFeed feeder for Boson today. Joule will keep using the PetSafe Smart Feed (which works fine for one cat).

**Per-cat presence in the SureFlap Hub app.** I have one Hub paired with the door. The app shows entries/exits with cat attribution. So this *does* work for multi-cat indoor/outdoor tracking. Good.

## The multi-cat data goals

By end of 2020, I want:
- **Per-cat outdoor patterns**: how often does Joule go out vs Boson?
- **Per-cat litter use**: visits per day, average duration, weight trend over time per cat.
- **Per-cat feeding**: precise portion control per cat.
- **Per-cat camera/proximity**: which cat is on the couch right now?

SureFlap door + SureFeed feeder = identity-aware per-cat. Litter-Robot Connect + (planned) Petivity smart litter = per-cat litter analytics. Camera-based identification — not yet.

## The cat-cat dynamics

Boson is 11 weeks. Joule is 6 years. The hiss-and-claim-territory week is on. Pet-IoT can't help with this; just patience and separate feeding locations.

Two months in I'll write about how the smart-home integrations adapted. So far: the Roomba (when it comes) has to learn two cats now; the indoor cameras need new no-go zones for Boson's hiding spots; the existing cat data on Joule has to be rebaselined.

## What's next

The Litter-Robot multi-cat analytics question — how does the data actually attribute visits per cat? Going to write that up in a few months once I have enough mixed data.

For now: welcome Boson. The data per Joule needs to be partitioned, and the per-Boson data starts fresh.
