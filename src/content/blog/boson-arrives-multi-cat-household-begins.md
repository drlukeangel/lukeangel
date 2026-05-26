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
cover: "../../assets/blog/boson-arrives-multi-cat-household-begins-cover.svg"
coverAlt: "A large adult cat and a tiny kitten side by side, each carrying a distinct microchip-ID tag, in front of a shared feeder and cat door — two animals, two identities, the devices have to tell them apart."
---

Brought home **Boson** last weekend. An 11-week-old gray tabby kitten, adopted from the local shelter. Pandemic adoptions are surging — adoption fee waived, both cats fixed already, microchipped at the shelter. Standard intake.

Boson is named per the household physics convention (Atom: particle, Joule: energy unit, Boson: Higgs particle). She's tiny (~2 lb) and Joule (now 6 yrs old, 9.5 lb) has not decided how she feels about the situation yet.

## The pet-IoT problem just got more complex

The single-cat assumption breaks today. Every device in the house that interacts with "the cat" now needs to know **which cat**. Specifically:

- **Litter-Robot**: counts visits and weight. Two cats means the visit + weight data needs per-cat attribution.
- **SureFlap microchip door**: was set up for Joule's chip. Boson has a different chip; needs to be added to the allow-list.
- **Auto-feeder (PetSafe Smart Feed)**: dispenses at scheduled times. Both cats can access the bowl. How do I portion-control per cat?
- **Indoor cameras (the new ones I'm adding for the post-Petnet self-monitoring)**: need to identify which cat is in frame.

This is the *multi-pet detection* engineering problem, and there are really only two ways to solve it. Either the device reads a unique **identity** off the animal at the moment it acts (a microchip at the point of access), or it **infers** which animal from a signal it can measure (weight, size, behavior) and hopes the inference holds. The first is exact and the second is a guess that degrades — and the gap between those two approaches is the whole story of what works in my house and what doesn't.

![Two ways a device tells two cats apart. Identity-based: a chip reader at the point of access — the cat door and the microchip feeder each read the cat's unique chip ID right where it acts, so they know exactly which cat with no guessing. Inference-based: the litter box reads entry weight and the owner infers the cat from the number, which works only while the two cats' weights stay far apart. Identity is exact; inference is a guess that degrades as a kitten grows.](../../assets/blog/boson-identity-vs-inference.svg)

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

The Litter-Robot app does NOT do per-cat attribution natively in 2020. It logs "weight at entry" but treats all visits as a single stream. To get per-cat data, I have to look at the entry-weight column and infer — and the inference is only clean *because* Joule and Boson are nine pounds apart right now. That window is closing: Boson is a growing kitten, and the day her entry weight starts overlapping Joule's measurement noise (call it within a half-pound), weight-attribution quietly stops working and I won't get a warning when it does.

![Why weight-based cat attribution is a temporary trick. Today Joule sits near 9.5 lb and Boson around 2-4 lb, so a visit's entry weight cleanly says which cat it was. But Boson is growing, and her weight band climbs month over month toward Joule's. Once the two bands overlap within the sensor's noise, the same entry weight could be either cat and the inference breaks — silently. A microchip read never has this problem.](../../assets/blog/boson-weight-attribution-window.svg)

**The connected-litter ecosystem hasn't caught up to multi-cat yet.** It can record a weight; it can't yet bind that weight to a cat. I expect Litter-Robot or a competitor to ship real per-cat identification in the next year or two — but until they do, the only litter device that *knows* which cat is the one that reads a chip.

## What doesn't work for multi-cat

**The auto-feeder.** PetSafe Smart Feed dispenses into a single bowl. Both cats can access it. There's no way to portion per cat:

- Joule's daily allotment: 1/4 cup (mature adult cat).
- Boson's daily allotment: 1/3 cup (growing kitten, eats more).

If the feeder dispenses 1/3 cup at 6 AM, Joule gets there first and eats some, then Boson eats some — and neither gets the right portion.

The solution is the same one SureFlap already applied to the cat door: put the **chip reader at the point of access**. Their **SureFeed Microchip Pet Feeder** does exactly that — and after the Petnet collapse I went out of my way to confirm it's a *local* device, not a cloud-scheduled one. The principle:
- A chip reader sits at the lip of the bowl, under a motorized lid.
- The cat approaches; the reader detects its chip.
- The lid opens only for chips on that feeder's approved list, and closes when the cat leaves.
- Each cat gets a feeder bound to its own chip ID — so Joule physically cannot eat from Boson's bowl, and vice versa.

It's the cat door's logic pointed at a food bowl: identity gates access. I ordered a SureFeed for Boson today. Joule keeps the PetSafe Smart Feed, which is fine for one cat. Worth noting what the SureFeed gets me beyond portioning — because the lid only opens for the right cat, it also gives me a clean per-cat *eating log* without a camera or a cloud account: the feeder knows who ate, and when, locally.

**Per-cat presence in the SureFlap Hub app.** I have one Hub paired with the door. The app shows entries/exits with cat attribution. So this *does* work for multi-cat indoor/outdoor tracking. Good.

## The multi-cat data goals

By end of 2020, I want:
- **Per-cat outdoor patterns**: how often does Joule go out vs Boson?
- **Per-cat litter use**: visits per day, average duration, weight trend over time per cat.
- **Per-cat feeding**: precise portion control per cat.
- **Per-cat camera/proximity**: which cat is on the couch right now?

The pattern that actually works in 2020 is **identity at the point of access**: SureFlap door + SureFeed feeder both read the chip right where the cat acts, so they *know* which cat with no inference. The Litter-Robot is the half-measure — it captures entry weight but doesn't bind it to a cat, so per-cat litter analytics is something I have to reconstruct by hand from the weight column. Camera-based identification (which cat is on the couch right now) — not yet; that's a harder computer-vision problem than any consumer pet device solves today.

Laid out device by device, the split is stark: the things that read the chip at the moment the cat acts *know*; everything else either guesses or can't tell at all.

![A device-by-device scorecard of how each pet-IoT device in a two-cat house tells Joule from Boson in 2020. The SureFlap microchip door and the SureFeed microchip feeder both read the chip at the point of access and know exactly which cat — marked identity, passing. The Litter-Robot Connect only logs entry weight with no binding to a cat, so attribution is inferred by weight — a partial pass. The PetSafe Smart Feed shares one bowl with no gate, and the indoor camera has no per-cat vision yet — both fail, marked can't-tell. The takeaway: only devices that read the chip at the point of access actually know which cat.](../../assets/blog/boson-arrives-multi-cat-household-begins-fig-3.svg)

## The cat-cat dynamics

Boson is 11 weeks. Joule is 6 years. The hiss-and-claim-territory week is on. Pet-IoT can't help with this; just patience and separate feeding locations.

Two months in I'll write about how the smart-home integrations adapted. So far: the Roomba (when it comes) has to learn two cats now; the indoor cameras need new no-go zones for Boson's hiding spots; the existing cat data on Joule has to be rebaselined.

## What's next

The Litter-Robot multi-cat analytics question — how does the data actually attribute visits per cat? Going to write that up in a few months once I have enough mixed data.

For now: welcome Boson. The data per Joule needs to be partitioned, and the per-Boson data starts fresh.
