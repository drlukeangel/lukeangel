---
title: "Behavioral AI on pet cameras — what works, what's marketing"
date: 2023-09-19T17:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - ai
  - furbo
  - behavioral
notebook: pet-iot-field-guide
notebookOrder: 33
excerpt: "Furbo Dog Nanny shipped its AI subscription. Companion AI dog trainer launched. Tested three pitches against ground truth. Real signals vs AI that exists for marketing."
pullquote: "The behavioral AI that works in 2023 lives in veterinary clinics with $40,000 high-frame-rate cameras and trained-classifier pipelines for lameness detection. The behavioral AI on a $250 consumer camera doing 'is your dog happy' is marketing. The category distinction matters."
cover: "../../assets/blog/behavioral-ai-on-pet-cameras-bullshit-and-real-cover.svg"
coverAlt: "An illustration in warm orange of a pet camera pointed at a dog, its output splitting into two streams — one solid and checked (dog-in-frame detection, real), one dashed and crossed out (an 'anxiety detected' label, marketing) — drawing the line between the AI on a pet camera that works and the AI that's theater."
---

Three "behavioral AI" pitches for pets in 2023:

- **Furbo Dog Nanny** (subscription, $7.99/month): "AI behavior detection" claims via Furbo camera + cloud analytics.
- **Companion** (subscription, $9.99/month): AI dog trainer using camera + LLM-based behavior recognition.
- **Pet wellness scores** in Whistle Health, Petivity, and others: ML-derived "wellness" numbers.

Tested all three against ground truth (= what I observe directly, plus what the vet says). Notes on what's signal, what's noise, what's marketing.

## Furbo Dog Nanny

The subscription that promised to use AI to detect when your dog was anxious, bored, or unwell.

**Marketing claims:**
- "Smart Dog Recognition" — distinguishes dog vs human in frame.
- "Bark Alerts with AI" — classifies bark types (anxious, aggressive, alarm).
- "Selfie Alerts" — notifies you when your dog is in frame.
- "Behavior Alerts" — claims to detect anxiety, restlessness, aggression.

**Testing methodology:**
I left Furbo's behavior alerts enabled for a month. Cross-referenced every fired alert against:
- What was actually happening in the camera view (I could see the video).
- Atom's behavioral signals from Whistle Health (licking, scratching, sleep, restlessness — not cardiac vitals; nobody ships those on a collar yet).
- Any actual behavioral incidents (separation anxiety, illness symptoms).

**Results after a month:**

| Alert type | Total alerts | True positives | False positives |
|---|---|---|---|
| Dog detected in frame | 312 | 295 | 17 (mostly Quark mistaken for "person") |
| Bark alert | 89 | 22 | 67 (most are doorbell + TV + other) |
| "Anxious behavior" detected | 14 | 2 | 12 (most are Atom doing normal idle behavior) |
| "Restless / unwell" | 7 | 0 | 7 (false positives all) |
| "Aggressive behavior" | 4 | 0 | 4 (none were aggressive — two were playing) |

![A month of Furbo alerts, every one checked against the video, drawn as five stacked bars of true positives (green) versus false positives (red), scaled by how often each alert fired. Dog-in-frame is a long, almost-entirely-green bar — 295 right, 17 wrong. Bark-type is short and mostly red — 22 right, 67 wrong. The three behavior alerts are tiny and almost entirely red: "anxious" 2 right and 12 wrong, "restless/unwell" 0 right and 7 wrong, "aggressive" 0 right and 4 wrong with two of those being the dogs playing. A caption notes that detection works while the how-does-your-dog-feel alerts are mostly false.](../../assets/blog/behavioral-ai-furbo-accuracy.svg)

Dog-in-frame works fine (95% accurate). Bark detection is too noisy (25% accurate). The behavior alerts — anxious, restless, aggressive — are **functionally bullshit** at 15-30% accuracy with high false-positive rates.

I disabled all behavior alerts. Kept the dog-in-frame for treat-toss triggering.

## Companion

The AI dog trainer + behavior camera launched in 2023. $300 hardware + $9.99/month.

The pitch: an AI camera that recognizes your dog's specific behaviors (sit, stay, lay down, come) and gives positive reinforcement via treat toss + audio cue. Connected to an LLM for "training conversations" with the owner.

**Tested for two weeks:**

The training-execution side is impressive. The camera correctly identifies sit, stay, lay-down with ~90% accuracy. The treat-toss is well-calibrated.

The "training conversation" LLM side is mediocre — generic dog-training advice you could get from any source.

But here's the issue: **the dog still needs an owner to do the actual training**. The AI doesn't replace the owner; it's a feedback loop. If you don't engage with the LLM's suggested training routines, the camera is just a treat-tosser.

Verdict: useful for engaged owners willing to follow the training program. Largely useless as a "passive AI trainer." Returned after two weeks.

## Wellness scores

Whistle Health gives Atom a daily "wellness score" (1-100). Petivity gives Joule and Boson "wellness signals." Both run ML over multi-dimensional *behavioral* data — activity, sleep, licking, scratching, litter-box patterns — not cardiac vitals, which no consumer collar measures yet.

I tracked Atom's Whistle wellness score against:
- His actual vet check-ups (annual + 1 follow-up).
- His subjective "is he OK" assessment from me.

**Results across 8 months:**

- Atom's daily wellness score averaged 73 ± 12. Range 51-94.
- His vet check-ups (3 visits) all showed "healthy senior dog."
- My subjective assessment: he had two "off days" where he seemed lethargic.

Were the two off days flagged by the wellness score? Vaguely: scores were 58 and 62 on those days. Statistically distinguishable from his average; not flagged as "concerning."

What about the days the wellness score was lowest (51)? Atom was *fine*. The 51 was, apparently, randomness in the underlying data.

The "wellness score" feels like a compressed-into-one-number version of multi-dimensional data that's worse than the underlying data. A trained eye looking at the raw activity and behavior traces could spot the same patterns better.

![Atom's daily Whistle wellness score over eight months, plotted against ground truth. Grey dots scatter from 51 to 94 around an average band at 73 ± 12, labeled as noisy and not predictive. Three vet visits all returned "healthy senior dog." Two orange dots mark the two days Atom actually seemed off — they scored 58 and 62, only vaguely below average rather than flagged as concerning. A red dot marks the single lowest score, 51, on a day Atom was perfectly fine. A ground-truth panel summarizes the mismatch and lands the verdict: vanity metric. A caption notes the underlying data is real, but the single-number score compresses it into something worse than the data it came from.](../../assets/blog/behavioral-ai-wellness-score-vs-truth.svg)

**Verdict on wellness scores**: marketing-grade "AI." The underlying data is real. The score itself is a vanity metric.

## What veterinary AI actually does

There IS real behavioral AI in veterinary medicine — just not in consumer products.

**Lameness / gait detection** (clinical gait-analysis systems): high-frame-rate video analysis at vet clinics, trained on labeled gait data. Detects subtle lameness a human eye misses. Real signal — used at the vet office, not in your living room.

**Feline pain scoring** (Sylvester.ai's Tably): facial-expression analysis on cats, built on a clinically validated feline grimace scale — ear position, eye tightness, muzzle tension. It's a phone app, but it's grounded in a real veterinary instrument, and it's framed as "should you book a vet visit," not "your cat is fine." That grounding is exactly what the consumer behavior-detectors lack.

**Ophthalmic and other imaging screens** (veterinary research): fundus and similar imaging plus ML. Research-grade, reviewed by specialists, not a living-room product.

**Behavior analysis from real-world video** (academic research, mostly at vet schools): trained on years of labeled veterinary behavior data.

These work because they're trained on labeled, high-quality data, deployed in controlled environments, and reviewed by veterinary professionals.

Consumer "behavior detection" is trained on user-shared video (variable quality), deployed in random homes (variable conditions), and used as an emotional reassurance tool. The accuracy isn't there.

![The split between real pet AI and theater, drawn as two columns. The left column, green, is labeled real signal — labeled clinical data, controlled setting, vet-reviewed — and lists clinic gait/lameness analysis, feline grimace-scale pain scoring, dog-vs-human-in-frame at about 95 percent, and treat-toss target detection. The right column, red and dashed, is labeled theater — user video, random homes, reassurance UX — and lists, each struck through, "anxiety detected" on a camera, bark-type classification, collar wellness scores, and generic AI training chat. A caption notes the data is real on both sides; the difference is whether the interpretation was earned.](../../assets/blog/behavioral-ai-real-vs-theater.svg)

## Where the AI is and isn't

| Domain | AI status |
|---|---|
| Veterinary lameness detection (clinic) | Real signal |
| Veterinary pain scoring (clinic) | Real signal |
| Dog-vs-human classification on camera | Real (~95% accurate) |
| Treat-toss target detection | Real |
| Bark type classification | Marketing-grade |
| Anxiety detection on a camera | Bullshit |
| "Wellness scores" on collars | Vanity metric |
| Generic "training conversation" LLMs | Filler content |

## What I'd use, what I'd skip

**Use:**
- Frigate object detection for "person/car/dog/package" — proven, local, works.
- Veterinary-grade lameness detection if your vet uses it.
- Whistle Health raw vitals (interpret yourself, ignore the wellness score).
- Petivity raw visit data (interpret yourself, ignore the alerts).

**Skip:**
- Furbo Dog Nanny behavior subscriptions.
- Companion's LLM training conversations.
- "Wellness scores" as standalone metrics.

The lesson: **AI claims on consumer pet products are mostly marketing**. The data is real. The interpretation layer is theatrical.

## What's next

Year-end review next month. Atom's behavioral baseline is starting to shift — the elevated scratching I [mentioned in the Mars post](/blog/mars-petcare-data-ownership-conflict/), and his sleep is getting a little more broken. He's ten now. Watching closely. 2024 is going to be the year Atom's health moves to the center of the pet-IoT story in this house.
