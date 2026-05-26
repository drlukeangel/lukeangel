---
title: "Whistle Health & GPS+ — the 'health' collar with no vital sign"
date: 2021-08-26T17:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - whistle
  - vitals
  - veterinary
notebook: pet-iot-field-guide
notebookOrder: 26
excerpt: "Mars shipped the Whistle Health & GPS+ — a collar that watches your dog lick, scratch, drink, eat and sleep, then rolls it into a daily wellness score. It calls all of that 'health.' What it doesn't do is take a single vital sign — and the gap between behavior and vitals is the whole story."
pullquote: "A collar that infers how your dog feels from how your dog moves is a clever accelerometer, not a medical device. Whistle calls scratching and licking 'health monitoring.' It's behavior monitoring with a wellness score on top — and the heart rate everyone actually wants still isn't on any consumer collar you can buy."
cover: "../../assets/blog/whistle-health-gps-plus-vitals-arrives-cover.svg"
coverAlt: "A dog collar surrounded by behavior icons — a scratching paw, a tongue licking, a water drop, a sleep crescent — and, set apart with a question mark, a faded heart-rate trace the collar does not actually measure."
---

Mars shipped the Whistle Health & GPS+ this summer, and the marketing leans on one word so hard it's almost a dare: *health.* I held off until August to read the reviews and put one on Atom — the first Whistle on him since I [shelved his Whistle 3 in 2018](/blog/2018-pet-iot-year-in-review/) and moved to [Fi](/blog/fi-ships-first-units-atom-first-non-mars-tracker/). After [the AirTag experiment](/blog/airtag-on-atoms-collar-anti-stalking-ironies/), I went in wanting to know one specific thing: when a pet company says "health," does it finally mean a *vital sign* — or is it still counting movements and calling that wellness?

It's still counting movements. And once you see that clearly, the Whistle Health is both more honest and more limited than the word on the box implies.

## What it actually measures

Every signal the Whistle Health & GPS+ produces comes from one sensor — the accelerometer — plus GPS for location. There is no heart-rate sensor, no thermometer, no respiratory sensor. What it does is recognize *patterns of motion* and label them:

- **Activity** — running, walking, playing, resting, with calories and distance. The classic Whistle capability.
- **Scratching** — a distinctive repetitive motion the model learned to pick out.
- **Licking** — another learned motion signature.
- **Eating** and **drinking** — head-down-at-the-bowl tilt-and-motion patterns.
- **Sleeping** — long low-motion stretches, scored for how disrupted the night was.
- A daily **Wellness Score** (beta) that rolls all of the above into one glanceable number.

Notice what every one of those has in common: it's an *inference from movement*. The collar never touches a pulse, a breath, or a temperature. It watches *what the dog does* and reasons backward toward *how the dog might be doing.*

![What the Whistle Health & GPS+ actually senses. A single accelerometer feeds a pattern-recognition model that classifies motion into behaviors — scratching, licking, eating, drinking, sleeping, activity — which roll up into a daily wellness score. Set apart, greyed out, are the things it does NOT measure: heart rate, respiratory rate, and body temperature. Every output is an inference from movement, not a vital sign.](../../assets/blog/whistle-health-behavior-vs-vitals.svg)

## Why behavior-as-health is genuinely clever — and genuinely limited

I don't want to be dismissive, because the behavioral approach is smarter than it first sounds. Scratching really is one of the earliest, clearest signals of a skin allergy or a flea problem. A jump in licking can flag joint pain, a hot spot, or stress. A dog drinking far more than usual is a classic early diabetes or kidney sign. These are real veterinary tells, and a collar that quietly counts them every day can plausibly catch a trend a once-a-year checkup would miss. Inference from behavior is the *right* approach for those particular conditions, because those conditions *show up as behavior* before they show up anywhere else.

The limitation is just as real, and it's the part the word "health" papers over: behavior is a lagging, lossy proxy for physiology. By the time a cardiac problem changes how a dog *moves*, it has already changed the dog's *heart rate* — and the collar can see the first and not the second. Anything that doesn't manifest as a recognizable motion is simply invisible to this device. A fever, an arrhythmia, an elevated resting heart rate: none of them have a motion signature the accelerometer can catch.

So the honest framing is: the Whistle Health is excellent at the handful of conditions that announce themselves through behavior, and blind to everything that announces itself through vitals. It is not the "vet-grade telemetry on your dog's neck" the marketing wants you to feel like you're buying.

## The vital sign that isn't here

Here's what I kept waiting for and didn't find: a heart rate.

Measuring a dog's pulse from a collar is genuinely hard. The wrist-watch trick — **photoplethysmography**, shining a green LED at the skin and reading the reflected pulse — fights fur, a thick scruff, and a collar that slides around as the dog moves. Respiratory rate from a collar is harder still. Nobody has shipped a consumer collar that does either reliably, and after using this one, I understand why Whistle didn't try: a noisy, frequently-wrong heart rate would be worse than no heart rate at all, because owners would panic at the false alarms or — worse — be falsely reassured.

![Why photoplethysmography reads a pulse on a wrist but not on a dog's collar, drawn as two side-by-side cross-sections. On the left, the wrist: the PPG sensor sits flush against taut skin, its green LED shining straight down and a clean reflected pulse coming straight back. On the right, the collar: a layer of fur stands between the sensor and the skin, the sensor floats at a tilt over a loose scruff rather than pressing flat, and the light scatters into a noisy signal with no usable pulse. Underneath, three obstacles the wrist doesn't have are listed — fur between the LED and the skin, a loose scruff instead of taut skin, and a collar that slides as the dog moves.](../../assets/blog/whistle-health-why-no-heart-rate.svg)

That's a defensible engineering call. But it means the category's headline promise — *a collar that watches your dog's actual vital signs* — is still vaporware in 2021. The collar that finally reads a resting heart rate and a respiratory rate off a pet, and does it well enough to trust, is somewhere out in the future. (When it does arrive, it won't be a behavioral pivot — it'll be a real sensor breakthrough, and it'll be worth its own post.)

![The gap between what's promised and what ships. Pet-tech marketing in 2021 invokes 'health' and 'vitals' — heart rate, respiratory rate, temperature. What actually ships is a behavioral monitor: motion patterns rolled into a wellness score. The two are drawn as separate tiers with an open gap between them, labeled 'still unbuilt' — the vital-sign collar everyone keeps forecasting hasn't been built yet.](../../assets/blog/whistle-health-promise-vs-reality.svg)

## Atom's first month — a baseline, honestly read

What I *can* report is a clean behavioral baseline for an 8-year-old Lab:

- **Scratching**: a handful of events a day — low, no itching problem.
- **Licking**: light, ordinary grooming.
- **Drinking**: steady, no spikes.
- **Sleeping**: long, mostly undisrupted nights.
- **Wellness Score**: high and flat.

Everything sits in a normal band, which is exactly what a baseline should look like — boring until the day it isn't. The *value*, if it materializes, is in detecting a sustained departure from that band: scratching that quadruples for a week, drinking that doubles. The collar isn't telling me anything about Atom today; it's building the reference I'll need the day something changes. That's a real, if patient, kind of usefulness — and it's a behavioral kind, not a medical one.

## The medical-device line Whistle is careful not to cross

Whistle calls this **"wellness monitoring,"** never "medical monitoring," and that word choice is deliberate and legally load-bearing. A device that *claims to diagnose a condition* steps into a regulated medical-device framework. A device that "surfaces trends to discuss with your veterinarian" does not. By never making a diagnostic claim — and by adding an in-app "ask a vet" chat that puts a human between the data and any medical conclusion — Whistle stays firmly on the unregulated wellness side of the line.

It's a smart play, and it's also a tell. The same framing that keeps regulators away is the framing that admits what the device is: a behavioral tracker that hands *you* patterns, leaving every actual medical judgment to a vet. The collar doesn't diagnose because it can't, and "wellness" is the word that makes can't sound like won't.

## The Mars problem, sharper than ever

Whistle is still Mars-owned, and a behavioral-health funnel makes the old conflict worse, not better:

- **Mars now collects continuous behavioral data on a huge population of dogs**, and Mars also sells the food, runs the vet clinics, and makes the supplements. Scratching, drinking, sleep quality — cross-referenced against what you buy — is an extraordinarily rich first-party dataset for a company that profits from the answer.
- **The recommendations still point inward.** The app's nudges trend toward Mars-owned brands. Same conflict I [flagged back in 2016](/blog/2016-pet-iot-year-in-review/), now fed by more intimate data.
- **The "share with your vet" path is smoothest into Mars's own clinic network.**

So my posture is unchanged, just with more data flowing: I'll take the behavioral baseline, and I'll ignore every recommendation the app makes about what to buy.

## Two collars on one dog

In practice Atom now wears two devices, which is faintly ridiculous:

- **Fi** for GPS and activity — better battery, no Mars, the tracker I actually trust.
- **Whistle Health** for the behavioral baseline — because nothing else logs scratching and drinking trends the same way.

The product I actually want is one collar: location, long battery, *and* real vitals, without a pet-food conglomerate downstream of the data. It doesn't exist. The Whistle Health gets the "health" word but not the vitals; Fi gets the tracking but not the health; and the thing that would unify them — a trustworthy heart-rate sensor on a collar — still hasn't been built by anyone.

## What's next

I'll run Atom's behavioral baseline for six months and find out whether the wellness score's anomaly detection catches anything real, or just generates noise I'll learn to ignore. My honest expectation is a mix of both.

The bigger thread is the one this post keeps circling: the category has gotten very good at *inferring* health from behavior and has not yet learned to *measure* it. Every "health" collar so far watches the dog and guesses. The year someone ships a collar that reads an actual resting heart rate — accurately enough to trust — is the year pet health tracking stops being a clever accelerometer and starts being telemetry. I keep betting it's next year. So far it never is.
