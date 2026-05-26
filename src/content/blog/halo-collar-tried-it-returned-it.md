---
title: "Halo Collar — I tried it, returned it within the trial window"
date: 2022-07-15T16:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - halo-collar
  - gps-fence
  - ethics
notebook: pet-iot-field-guide
notebookOrder: 29
excerpt: "Bought a Halo Collar 2 for the new house's backyard — no physical fence. Used on Atom and Quark two weeks. Returned. Engineering is sound; the application is a welfare problem."
pullquote: "Halo's GPS-fence engineering is impressive — sub-meter accuracy, low-latency boundary detection, multi-mode correction options. The application — delivering uncomfortable stimuli to a dog who doesn't understand the boundary as an abstraction — is where the engineering excellence stops mattering."
cover: "../../assets/blog/halo-collar-tried-it-returned-it-cover.svg"
coverAlt: "An illustration in warm orange and red: a side-profile dog stands inside a yard facing a tall dashed red boundary line it cannot see, marked with warning chevrons, while a GPS satellite overhead projects that invisible line and the dog's collar emits a warning beep — a virtual fence enforced on an animal that has no natural way to perceive the edge."
---

Bought a Halo Collar 2 for the new house. The backyard doesn't have a physical fence on the back property line, and a virtual fence is pitched as the modern alternative — which is exactly the option I said I'd test [when Quark came home in the spring](/blog/quark-arrives-puppy-second-dog-pet-iot-baseline/).

Two weeks with the Halo on Atom and Quark. Returned within the trial window. Won't buy another. This is the welfare post I've been promising the notebook [since last year](/blog/2021-pet-iot-year-in-review/), and the verdict is harder than I expected to write, because the engineering is genuinely good.

## What Halo is

**Hardware:**
- GPS-enabled smart collar, ~120 g (heavier than Fi due to bigger battery + active correction module).
- LTE-M cellular + WiFi + BLE.
- **Correction stimuli** (this is the controversial part):
  - Audio (a beep).
  - Vibration.
  - **Static "correction"** — adjustable intensity. A short, brief electrical stimulus.
- 12-hour battery life when actively GPS-monitoring (a different universe from Fi, which runs weeks on the home Wi-Fi and only burns down in lost-dog mode).

**Software / Service:**
- $999 hardware + $9.95/month subscription.
- iOS app for setting GPS-based virtual fences.
- "Halo Trainer" app component to train the dog to recognize the boundary.

The pitch is: train your dog to associate the boundary with audio + vibration → eventually you don't need static correction. The dog learns the invisible line.

![The Halo correction ladder, drawn as three escalating stages along an arrow as the dog nears the invisible boundary. Stage one, in green: a beep — just a sound, neutral. Stage two, in amber: a vibration — mildly unpleasant. Stage three, in red: a static "correction" — a shock, adjustable across sixteen intensity levels, drawn as a lightning bolt. A caption notes that a trained adult dog may stop at the beep, but a puppy with no priors escalates to the shock and generalizes anxiety from a line it never saw, smelled, or heard.](../../assets/blog/halo-correction-escalation.svg)

## What worked, engineering-wise

I have to give Halo credit for engineering execution:

- **GPS accuracy**: sub-meter in open yard (better than Fi's ~5m). They've done careful work on multi-constellation GPS + WiFi positioning.
- **Latency**: from boundary crossing to first audio cue, ~200-500 ms. Fast.
- **Boundary mapping**: drawing a polygon on the app's satellite view is intuitive. Multi-boundary support (front-yard-OK, back-yard-not).
- **Stim adjustability**: 16 intensity levels for the static correction. Two minutes of "feel the stim on your hand to understand what the dog feels" calibration in the setup flow.

If you were going to build a GPS-fence consumer product, Halo's executed it as well as it can be done.

## Why I returned it anyway

Three reasons, in order of importance.

**1. The dog doesn't understand "boundary" as an abstraction.**

A physical fence is a physical object the dog encounters and learns: this is the wall. A virtual fence is an *idea* — there's no physical encounter. The dog gets a beep (positive: just a sound) and then a vibration (mildly unpleasant) and then static (clearly unpleasant) for crossing a line they cannot see, smell, or hear in any natural sensory way.

Atom learned the front-yard boundary within ~3 days. He'd get the beep, look puzzled, retreat. Within a week he was reliable on the front-yard side.

Quark (9-month-old puppy by then) took **much longer**. He didn't connect the boundary to the stimulus. Got beeps + vibrations + (once, accidentally on a higher setting) a static correction. His response: visible distress, freezing, refusing to leave the porch for the next 4 hours.

A puppy with no priors about invisible boundaries doesn't generalize well from the punishment.

**2. The static correction is uncomfortable enough that dogs *do* generalize anxiety from it.**

I tested the static on my own hand at the level Halo's app recommended for an 70-lb dog. It's uncomfortable — described as "muscle contraction startle." Worse than a static-shock from carpet, less than a TENS unit medical electrical stim. The marketing language calls it "tap" or "stim." It's not nothing.

After Quark's one accidental static correction at the higher setting, his behavior changed measurably for a week. More cautious about the porch. More clingy in general. Cortisol-marker behavioral changes I associate with stress.

The animal-behavior research is clear on this: GPS-fence + correction-based training can produce **learned anxiety** that generalizes beyond the boundary scenario. Even dogs that "learn" the fence often show stress markers elsewhere.

**3. The fail-safe failures.**

In two weeks, the GPS lost lock twice in our yard (under a partial tree canopy):
- Once: Atom got a stim correction while standing in the middle of the yard because the GPS estimate momentarily put him "outside the boundary." False positive.
- Once: Quark walked through the boundary undetected because the GPS lag was about 4 seconds.

Halo's marketing emphasizes the *system reliability*. Reality is GPS-based boundary detection has edge cases. Edge cases plus correction stimuli equals the dog occasionally getting punished for nothing they did.

![Two GPS-fence failure modes drawn side by side over a dashed boundary. Left, the false positive: the dog stands safely inside, but a jittered GPS estimate jumps its position across the line, so the stim fires while the dog is mid-yard — punished for nothing. Right, the lag: the dog walks across the boundary along a path, but a roughly four-second detection delay means it is already outside before any cue fires — crossed undetected. A caption notes that GPS jitter and lag are ordinary edge cases, and edge cases plus a shock means the dog is occasionally punished for nothing, or escapes with no cue at all.](../../assets/blog/halo-gps-failure-modes.svg)

## What I think about the category

GPS-fence collars are a **legitimate engineering category** in the sense that the technology works. They're **not a legitimate ethics category** in the sense that they substitute a software system for a relationship.

The training approach that works is: teach the dog the boundary with positive reinforcement, treats, repetition, and physical boundary markers (flags). Halo's "audio + vibration + static" is the substitute for that training. It works on adult dogs that already have decent training; it fails on puppies and high-anxiety dogs.

For the specific question "should we use a Halo for our back property line," my answer is no. The alternative is a physical fence (more expensive, more permanent, but actually solves the problem with no welfare cost). We're going to install one.

## The Halo apologists' counter

Halo's defenders will say:
- "But owners use it correctly with training."
- "The static is mild, dogs don't really mind."
- "It's better than a dog getting hit by a car."

Counter-counters:
- Most owners *don't* use it correctly. The training takes weeks of consistency. Many give up and rely on the correction.
- I tested the static intensity. It's not mild.
- "Better than hit by a car" assumes the fence is the alternative to no boundary at all. The actual alternative is a physical fence. Halo is the alternative to *that*.

## What I'd buy instead

For the new house's back property line: physical wood-and-wire fence. Estimated $3,500-5,000. Permanent. No welfare cost. Solves the actual problem.

For tracking, in case a dog gets out (gate left open, fence damaged): the Fi collar I already have. LTE-M cellular tracking, with the home Wi-Fi handling the everyday case so the battery lasts. Not a fence — a recovery tool, and an honest one: it tells me where the dog *is*, it doesn't punish him for where he isn't supposed to be.

![A side-by-side comparison of what a virtual fence and a physical fence actually are to the dog. On the left, the virtual fence: a dog faces an invisible dashed red boundary line marked with warning chevrons that it cannot see, smell, or hear; it costs nine hundred ninety-nine dollars plus a monthly subscription, runs twelve hours on a charge, and escalates beep to vibration to static correction — and GPS jitter can punish a dog for nothing it did. On the right, the physical fence: a dog stands at a solid green fence it can actually meet and learn as a wall; it costs roughly three and a half to five thousand dollars once, is permanent, and has no stimulus, no subscription, and no edge cases — it solves the actual problem with no welfare cost. The caption drives the point home: Halo isn't the alternative to no boundary, it's the alternative to a real fence, and that's the comparison that matters.](../../assets/blog/halo-collar-tried-it-returned-it-fig-3.svg)

## What's next

Purina's been signaling a smart-litter monitor — Petivity — for the multi-cat litter problem I keep complaining about. If it actually reaches retail this year, I'll put one on the floor and write up the multi-cat analytics: Petivity against the Litter-Robot, and whether either finally solves *which cat* without my spreadsheet.
