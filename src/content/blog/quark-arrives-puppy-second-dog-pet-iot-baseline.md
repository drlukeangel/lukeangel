---
title: "Quark arrives — a second dog, and the pet-IoT baseline starts over"
date: 2022-04-30T18:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - dog
  - puppy
  - fi
notebook: pet-iot-field-guide
notebookOrder: 28
excerpt: "Brought home Quark — a nine-week chocolate Lab. Atom is eight and a half and gracious about it. The pet-IoT setup begins again, and the gap between 2013 and 2022 is the whole story: in 2013 the right collar was a gamble, in 2022 it's obvious, and it isn't a Whistle."
pullquote: "Same engineer, second puppy, nine years apart — and the collar I reach for without thinking is the one that didn't exist last time and isn't owned by a pet-food company. That's the whole arc of this notebook in one purchase."
cover: "../../assets/blog/quark-arrives-puppy-second-dog-pet-iot-baseline-cover.svg"
coverAlt: "An illustration in warm orange of two dog collars laid side by side — a 2013 collar carrying a coin-shaped activity puck with no location, and a 2022 collar carrying a slim GPS module with a satellite fix and a cellular signal — the same household instrumenting a second dog nine years later with a very different device."
---

Brought home **Quark** this weekend — a nine-week-old chocolate Lab, named to the household convention (Atom the Lab, Joule and Boson the cats, now Quark the second Lab; particles and energy all the way down). Atom is eight and a half now and has been gracious about the puppy energy. Joule and Boson are mildly horrified.

And so the pet-IoT setup begins again. Same engineer, second puppy, nine years apart — and the landscape I'm shopping has changed completely. In 2013 I put a brand-new, slightly-risky Whistle on Atom and hoped. In 2022 the right collar is obvious before I open a browser tab, and the most interesting thing about that obviousness is *which* collar it is.

## What's different from Atom's 2013 setup

Quark gets a Fi from day one. Set that against [Atom's first collar in 2013](/blog/atom-arrives-whistle-activity-monitor-launches/):

| | **Atom, 2013** | **Quark, 2022** |
|---|---|---|
| First collar | Whistle Activity Monitor | Fi Series 2 |
| Radios | BLE + Wi-Fi in the puck (no hub) | LTE-M cellular + Wi-Fi + GPS |
| Cost | ~$130, no subscription | $149 device + ~$99/year |
| Battery | 7–10 days claimed, ~week real | up to ~3 months on Wi-Fi; ~2 days in Lost Dog Mode |
| Location | None — activity only | Continuous GPS when out of Wi-Fi range |
| Vendor | Independent (until [Mars bought Whistle in 2016](/blog/whistle-3-cellular-mars-acquires-whistle/)) | Independent — not owned by a pet-food company |
| Cloud reliance | High | Lower at home — leans on house Wi-Fi, saves the cell radio for when he's out |

Four things Quark's collar does on day one that Atom's took years to get: real-time location, a battery measured in months instead of days, a sensible radio strategy (cheap Wi-Fi at home, expensive LTE-M only when he leaves), and — the one I care about most after watching [Mars absorb Whistle](/blog/whistle-3-cellular-mars-acquires-whistle/) — an owner that isn't trying to sell me dog food.

The quiet irony: Fi runs on **AT&T's LTE-M network** — the same carrier the [2016 cellular Whistle](/blog/whistle-3-cellular-mars-acquires-whistle/) used. The radio under both is similar. The difference that made me switch isn't the network; it's who owns the data coming off it.

![Fi's radio strategy drawn as a home-versus-away split. On the left, inside a dashed home zone, the collar talks to the house Wi-Fi router — cheap, always-on, good for about three months of battery. On the right, once Quark leaves home base, the collar wakes its LTE-M cellular radio on AT&T and pulls a GPS fix, draining toward roughly two days in Lost Dog Mode. A caption notes it's the same AT&T LTE-M as the 2016 Whistle, but the expensive radio stays asleep until he's off Wi-Fi, which is why the battery lasts months instead of days.](../../assets/blog/quark-fi-radio-strategy.svg)

![A side-by-side of the two first-collars, drawn as labeled stacks. Left, Atom 2013: a coin-shaped puck with two radio glyphs (BLE and Wi-Fi) and a flat line marked "no location," over a row reading independent vendor, about $130, no subscription, roughly a week of battery. Right, Quark 2022: a slim rectangular module with three radio glyphs (LTE-M, Wi-Fi, GPS) and a satellite-fix mark, over a row reading independent vendor, $149 plus ~$99 a year, months of battery on Wi-Fi. A bracket under both notes the four day-one gains in 2022 — real-time location, months of battery, a cheap-radio-at-home strategy, and a non-pet-food owner.](../../assets/blog/quark-2013-vs-2022-collars.svg)

## The setup, side by side

Atom's 2013 Whistle setup was a small ritual: a BLE pairing dance, then the Wi-Fi handoff where you join the device's temporary access point and hand over your home credentials, then wait for the first sync. Call it fifteen minutes, and a couple of those minutes were me re-reading the instructions.

Quark's 2022 Fi setup: open the app, tap "add a pet," hold the collar near the phone for the BLE handshake, let the LTE-M SIM self-activate on the cell network, drag a circle on a map to set the home base, snap it on the dog. Eight minutes, no instructions.

It's genuinely less friction for strictly more capability — which is the rare direction for consumer hardware to move. The feature-to-fuss ratio improved while the feature count went up.

## The two-dog household, and the data partitioning

Atom (~75 lb adult Lab) wears Fi for location plus a [Whistle Health for the behavioral signals](/blog/2021-pet-iot-year-in-review/) — licking, scratching, sleep, eating, drinking — with about eight months of baseline behind it now. Note what that *isn't*: it's not heart rate or temperature. Nobody's putting real cardiac vitals on a consumer collar yet; the behavioral layer is the frontier, and it's a useful one.

Quark (~14 lb now, headed for 70–80) wears a smaller Fi sized to his current neck. The Fi app shows both dogs on one screen and I tap to switch between them — multi-pet works cleanly, which it had no reason to in 2013 because I only had one instrumented animal.

I'm deliberately *not* putting a Whistle Health on Quark yet. He's a growing puppy, and "normal" for a puppy is a moving target — the behavioral baselines are tuned to adult dogs, so a wellness monitor on him right now would manufacture noise, not signal. That's a 2024 decision, when he's a year and a half and his normal has settled.

The real engineering problem is that the household data ecosystem now has to keep **four** animals straight:

- **Fi** — two dogs, two profiles. Clean.
- **Whistle Health** — one dog (Atom). One profile.
- **The cat door** — two cats. The [SureFlap reads Joule and Boson by chip](/blog/sureflap-microchip-cat-door-joules-first-iot/); the dogs are far too big for it and use a separate dog-sized door anyway.
- **The litter boxes** — two cats, and the per-cat attribution is *still* the unsolved problem. The hardware can weigh the cat on the box; it still can't reliably tell me *which* cat without me doing the bookkeeping. Joule and Boson are close enough in weight that weight alone doesn't split them.
- **The Roomba** — navigating around two dogs and two cats now; the [treat-conditioning I wrote up on the smart-home side](/blog/robots-roomba-braava-daily-routine/) applies to both cats.

Every device's per-pet identification is getting stress-tested at once. The single hardest thing in the house isn't any one gadget — it's attributing the right data to the right animal across five of them.

![A data-partitioning diagram for a four-pet household. Four animal labels across the top — Atom, Quark, Joule, Boson — with lines dropping to the devices that must tell them apart. Fi connects to both dogs with two clean profiles. Whistle Health connects to Atom only. The SureFlap door connects to both cats and resolves them by microchip, marked solved. The litter boxes connect to both cats but the link is dashed and marked "by weight only — can't reliably split Joule from Boson," flagged as the open problem. A note reads: the hard part isn't the hardware, it's attributing each reading to the right animal across every device at once.](../../assets/blog/quark-multipet-partitioning.svg)

## What I'm reading right now

The Halo Collar reviews keep landing badly. Independent write-ups from animal-behavior people keep making the same point: the virtual-fence boundary is enforced with a static correction — a shock — and that can teach a dog anxiety rather than a boundary. I have a real reason to care this year: the new place doesn't have a fence on the back line yet, and a virtual fence is on the table as an option. So I'm going to get a Halo in hand, test it, and write it up properly next month — with the welfare question front and center, because a GPS chip on a shock collar is still a shock collar.

## Quark's data starts today

A nine-week Lab's activity numbers are going to be all over the place for the next year and a half. Right now he does fifteen-to-twenty-five-minute play bursts and sleeps something like eighteen hours a day; in a month or two that flips toward longer activity blocks and shorter naps, and by twelve-to-eighteen months he'll settle into adult-dog rhythm. None of that early data answers "is Quark healthy" — he is, and he's growing fast. The point of logging it now is the *trajectory*: when the future version of me is looking for an anomaly, this is the baseline it gets measured against.

Welcome, Quark. The data starts today — for the second time in this house, nine years after the first.
