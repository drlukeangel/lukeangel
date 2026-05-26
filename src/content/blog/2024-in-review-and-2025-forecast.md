---
title: "2024 review — Bespoke kitchen, Frame TV, Matter bridges"
date: 2024-12-29T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 51
excerpt: "The new-house era of automations has run 14 months now — long enough to see what holds. Full Bespoke kitchen and laundry, three Matter bridges live, the EV charger in. Local voice still isn't it."
pullquote: "6/8 on last year's forecasts. The two I missed were both AI-on-camera bets — and that's the honest pattern: the hardware lands on schedule, the intelligence layer keeps slipping a year."
cover: "../../assets/blog/2024-in-review-and-2025-forecast-cover.svg"
coverAlt: "A forecast scorecard ledger with check and cross marks beside a house glyph holding a Family Hub fridge, a connected oven, a Frame TV, and an EV charger."
---

Fourteen months into the new house now. Long enough that the automations have stopped being a project and started being plumbing — the test I actually care about. A thing is done when nobody in the family mentions it anymore, because it just works. By that measure, 2024 was the year the kitchen finally went quiet.

## Scoring last year's forecast

I grade these honestly every year — the point is to catch myself being optimistic, not to look good. These are the eight calls I made for 2024 in last December's review.

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Samsung Bespoke kitchen complete | 95% | Yes — March | ✓ |
| EV charger | 85% | Tesla Wall Connector 48A installed June | ✓ |
| Matter devices proliferate | 80% | 18 devices + 3 bridges live | ✓ |
| Frame TV ecosystem post | 95% | June post shipped | ✓ |
| Third wall-mounted dashboard | 80% | Office one finally up (July) | ✓ |
| AI sensor classification in Frigate | 60% | DoubleTake + CompreFace tested, mediocre — not deployed | ✗ |
| Tesla Powerwall reconsidered | 40% | Considered, again decided against — generator stays | ✓ (no, as predicted) |
| Second LoRa gateway | 65% | Yes, added at the garden edge | ✓ |

6/8 = **76%**. Within the band I usually land in. And the two misses are the same miss: both were bets that the AI-on-camera layer would mature enough to deploy. It didn't. That's worth flagging as a pattern, not a one-off — the hardware in this house lands on schedule; the *intelligence* layer keeps slipping a year.

![2024's additions, what held up, and what didn't, beside a 6-of-8 forecast score. Added in 2024: Bespoke oven, dishwasher, washer/dryer; a Tesla Wall Connector 48A; three Matter bridges (Aqara M2, Hue, Home Assistant add-on); 18 Matter devices; a second LoRa gateway at the garden edge. Held up: Matter bridges with multi-ecosystem visibility, Frigate 0.13 re-identification, off-peak EV charging, the LoRa mailbox sensor. Didn't: local Home Assistant voice and Frigate face recognition.](../../assets/blog/2024-additions-and-misses.svg)

## What got added in 2024

- **Samsung Bespoke oven, dishwasher, washer, and dryer.** The kitchen and laundry are now fully connected. Whether that *matters* is a separate question I keep poking at.
- **EV charger** — Tesla Wall Connector 48A, in since June.
- **Three Matter bridges**, live: the Aqara M2, the Hue Bridge, and the Home Assistant add-on bridging everything else. ([How each one works.](/blog/bringing-legacy-devices-onto-matter/))
- **18 Matter devices** — Eve sensors, Nanoleaf bulbs, Eve Energy plugs.
- **Second LoRa gateway** at the garden edge, which fixed the dead spot at the back fence I'd been living with.
- **HA's local voice assistant**, experimental — Whisper for speech-to-text, Piper for the voice, both running on the box. Early days. More below.

## What held up at year-end

- **Matter bridges plus multi-ecosystem visibility.** Apple Home, Google Home, HA, and SmartThings all see the same devices now, each through its own commissioning. After years of "which app controls this bulb again," that's the quiet win of the year.
- **Frigate 0.13's re-identification.** A person walks porch → driveway → side yard and gets tracked as one event instead of three. The difference between a useful notification and a stream of noise.
- **EV charging automation** — charges 11 PM to 6 AM on the off-peak rate unless I've told it I'm leaving early. SmartThings reads the Tesla state through the unofficial integration; not robust, but it's held.
- **The mailbox sensor.** Running since spring once I repositioned the antenna and got the LoRa range back. Small thing, disproportionate satisfaction.

## What didn't

- **Local HA voice for daily use.** The all-local stack (Whisper + Piper) carries about three seconds of ASR latency, and the Piper voices are robotic enough that the family won't use it. The *idea* — voice that never leaves the house — is exactly right. The execution isn't there yet.
- **Frigate face recognition.** Tried DoubleTake and CompreFace. The false-positive rate was high enough that the feature was worse than not having it. Pulled both.

The shape of the year, in one picture — and the same shape that's held for a while now:

![The recurring pattern across the year-in-review forecasts: the hardware lands on its date, the intelligence layer slips a year. On a timeline marked forecast year, plus one year, and plus two years, the hardware row carries a green check — the Bespoke kitchen, EV charger, three Matter bridges, and the second LoRa gateway all shipped on schedule. The intelligence row shows a dashed "predicted" box at the forecast year, an arrow slipping forward, and a red-cross "still not there" box at plus-one — Frigate face recognition and the all-local Home Assistant voice stack, pulled or too robotic to use, deferred again. Six of eight forecasts hit, and both misses were the same bet: that the AI-on-camera layer would mature enough to deploy.](../../assets/blog/2024-hardware-lands-intelligence-slips.svg)

## Forecast for 2025

The standing rule on these: I keep the forecasts even when I get them wrong, because the misses are the most useful part to reread later.

**1. A SmartThings local-execution post. (95%)** Samsung's been pushing custom drivers down onto the hub itself for a couple of years now — rough at first, but it's worth a real write-up on whether the cloud-dependency complaint that drove me off SmartThings in 2017 still holds.

**2. Robots — Roomba + Braava routines. (90%)** The iRobot pair has been part of the family for years and the routine integration has never gotten its own post. Overdue.

**3. Frame TV + kitchen appliance sync, improved. (85%)** The Bespoke ecosystem is genuinely starting to couple — appliances talking to screens. Worth documenting what actually earns its keep versus what's a demo.

**4. The long-arc retrospective. (100%)** Thirteen years of these posts. Sometime around November, a look back across the whole arc.

**5. Matter camera support in some products. (70%)** Matter 1.4 was ratified in November; camera support is the obvious next thing the spec needs. Whether it ships in consumer products in 2025 is the open question.

**6. HA voice gets usable. (50%)** Faster Whisper models, better Piper voices, and HA's Wyoming protocol maturing could close the gap. Coin flip.

**7. Solar + Tesla Powerwall, reconsidered yet again. (30%)** Probably still no. The generator keeps winning the math.

**8. End-of-2025 review. (100%)** The pattern continues.

The eight ranked by confidence — and you can see last year's lesson sitting at the bottom:

![The eight predictions for 2025 ranked by confidence, drawn as a horizontal bar chart. Locked at 100%: the long-arc thirteen-year retrospective and the end-of-2025 review itself. Near-certain: a SmartThings local-execution post at 95% and Roomba-plus-Braava routines at 90%. Likely: improved Frame TV and appliance sync at 85%. Mid-band: Matter camera support in some products at 70%. Coin-flips at the bottom: Home Assistant voice finally getting usable at 50% and a Tesla Powerwall reconsidered yet again at 30% — exactly the intelligence-and-energy bets where last year's misses lived.](../../assets/blog/2025-forecast-confidence-ladder.svg)

## What I'm buying in 2025

- A couple of Matter cameras, if and when they ship.
- A pair of Aqara HomeKit Secure Video upgrades for the doorbell.
- More ESP32-based DIY devices as needs come up.
- An HA Green or another HA Yellow as a cold spare — the one piece of infrastructure I don't want to be without.

The honest summary of 2024: the house got *more* connected and, for the first time, slightly *calmer* for it. The bridge layer is why. Next year's question is whether the intelligence layer — voice, vision — finally catches up to the plumbing.
