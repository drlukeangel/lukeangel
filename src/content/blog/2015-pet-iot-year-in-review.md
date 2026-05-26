---
title: "2015 in pet IoT — the cat side finally shipped, the dog side split in two"
date: 2015-12-22T17:00:00-05:00
category: tools
tags:
  - pet-iot
  - year-in-review
  - forecast
notebook: pet-iot-field-guide
notebookOrder: 7
excerpt: "A SureFlap door went on the wall for Joule, a second tracker went on Atom's collar, and a feeder finally arrived two years late. I score last year's eight bets, log what actually entered the house, and put 2016 on the record — including the cellular Whistle I've been waiting on since 2013."
pullquote: "The cat side of the house went from one passive chip to a door that reads it six hundred times a month. That's the whole story of 2015: the most analog member of the household finally got a radio pointed at her."
cover: "../../assets/blog/2015-pet-iot-year-in-review-cover.svg"
coverAlt: "An end-of-2015 illustration in warm orange of the household's pet-tech roster: a microchip cat flap set into a wall, a dog collar carrying two small trackers side by side, and a connected food feeder — the cat side instrumented for the first time, the dog side now doubled up."
---

End of 2015. Same ritual as [last December](/blog/2014-pet-iot-year-in-review/): grade the bets I wrote down a year ago, log what physically went on a pet this year, then put next year on the record so I can hold myself to it again.

The one-line version: 2015 is the year the asymmetry I complained about all of last year finally cracked. The cat side of the house — which entering the year was a single passive chip under Joule's skin and nothing else — got a door that reads that chip hundreds of times a month. And the dog side, which already had a year of data, doubled up: a second tracker rode Atom's collar for the back half of the year. The household went from one instrumented animal to two, and from three product categories to four.

## Scoring the 2014 forecast

I wrote down eight bets last December with a confidence on each. Here's the honest grade.

| # | Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|---|
| 1 | Whistle ships/announces a cellular-GPS model, or acquires Tagg | 70% | Rumored for early 2016, nothing shipped in 2015 | ✗ (timing) |
| 2 | Tagg's parent (Snaptracs/Qualcomm) divests or shutters it | 50% | Still alive, still subsidized | ✗ |
| 3 | A connected SureFlap-style cat door reaches retail | 55% | The *manual* chip door shipped (I bought it); the *connected* hub was announced, ships 2016 | ✓ (the door, not the cloud) |
| 4 | Petnet ships to backers in 2015 | 60% | Started shipping late November to early backers; mine arrived | ✓ (barely) |
| 5 | A real dog-camera category forms (more than just PetCube) | 75% | Pawbo shipped, a new Petcube, Furbo on Kickstarter | ✓ |
| 6 | I install a manual SureFlap door for Joule | 85% | Installed in May | ✓ |
| 7 | A second-gen dog fitness band that fixes v1's mistakes | 65% | FitBark finally landed; ran it against the Whistle | ✓ |
| 8 | Somebody pitches "send pet data to your vet" — and it flops | 50% | A few startups, no vet adoption | ✓ (including the flop) |

Six of eight, with two of those carrying an asterisk. The two clean misses were both about **Whistle's location radio** — bet 1 and, indirectly, bet 2. I called it a 70% read that they'd ship cellular GPS or buy their way to it in 2015. They did neither. The puck Atom wears is still the [BLE-and-Wi-Fi activity monitor it's been since 2013](/blog/atom-arrives-whistle-activity-monitor-launches/) — it tells me how much he moves, not where he is. The cellular convergence I [bet on back in 2013](/blog/tagg-vs-whistle-cellular-vs-ble-base-station/) and [kept circling in September](/blog/fitbark-2-pet-activity-tracker-market-2015/) is still an empty box. I was a year early. Writing "70%" on a hardware ship date was the mistake; hardware slips, and I keep paying that lesson the way I [paid it on Petnet](/blog/2014-pet-iot-year-in-review/).

The Tagg miss still surprises me. Architecturally they should have lost by now — cellular pet tracking burns battery in two-to-three days, against a week-plus on the Whistle and six months on the FitBark. But the thing keeping Tagg alive is exactly the thing I keep wishing the others had: an existing cellular footprint. A newcomer can't ship location-anywhere without building a cellular story from scratch, and that turns out to be a real moat even around a battery-poor product. The architecture I'd grade as worst is the one nobody can easily copy.

![A scorecard of eight 2014 predictions for 2015, drawn as a vertical list of rows, each with a verdict mark on the right. Six rows carry a green check: the manual SureFlap door reaching retail and being installed, Petnet shipping to backers late in the year, a dog-camera category forming, a second-generation dog fitness band landing, and a vet-data platform being pitched and flopping. Two rows carry a red cross, both about Whistle's location radio: no cellular-GPS model shipped, and Tagg's parent did not divest. A summary at the foot reads six of eight, with the two misses circled together and labelled as the same bet — location — placed a year too early.](../../assets/blog/2015-pet-iot-scorecard.svg)

## What actually went on a pet this year

Stripped of marketing, here's what physically entered the house in 2015, in order:

- **A SureFlap DualScan microchip pet door**, installed in May for Joule — [her first real piece of IoT](/blog/sureflap-microchip-cat-door-joules-first-iot/). It reads the same passive 134.2 kHz chip the [shelter implanted in her shoulder in 2014](/blog/joule-arrives-microchip-rfid-primer/) and latches the flap on her ID. The DualScan variant reads the chip on the way *out* as well as in, so I can keep one cat in while another goes out. Seven months in, it has been the most boring device in the house, which from a cat door is the highest compliment.
- **A FitBark on Atom's collar**, clipped on in September next to the Whistle and never taken off. I [wrote that week up in detail](/blog/fitbark-2-pet-activity-tracker-market-2015/) — the short version is that the bone-shaped tag and the coin puck agree on the *shape* of every day and disagree on the *size* by about a fifth, because they draw the resting/active line in different places.
- **A Petnet SmartFeeder**, which finally arrived in late November — pre-ordered in February, so call it nine months late, which for crowdfunded hardware is roughly on time. I've had it long enough to fill the hopper and not long enough to trust it. That's a separate post once it's earned an opinion.
- **A Petcube I bought and returned.** I went in knowing [the interactive-camera category had already failed in this house once](/blog/2014-pet-iot-year-in-review/). I bought it anyway, told myself the new model was different, and within a week Atom had destroyed it and I'd shipped the wreckage back. The lesson didn't generalize the first time because I didn't let it. It generalizes now: you cannot keep an interactive pet camera in a house with a Lab. I am done testing that hypothesis.

That's the year. Two devices that stayed, one that's on probation, one return.

![A timeline of the household's pet-tech across 2015, twelve months left to right, drawn as two lanes. The cat lane gains its first-ever device in May — a SureFlap DualScan microchip door — drawn as a flap glyph, and a running bar labelled reads Joule's chip continues to the end of the year. The dog lane already carries a continuous bar labelled Atom on Whistle since 2013; in September a second bar joins it labelled FitBark, so the back third of the year shows two trackers stacked on one collar. A Petcube enters in spring and is struck through within the month. A Petnet feeder appears in late November as a short bar marked on probation. The cat lane, blank all of last year, now runs solid from May; the dog lane runs solid all year and doubles in the fall.](../../assets/blog/2015-pet-iot-timeline.svg)

## What worked, and the canon I got wrong out loud

**The SureFlap's reliability is the standout.** Roughly six hundred reads of Joule's chip over seven months and not one failure — no missed reads, no false latches, no firmware to babysit. It's passive RFID gating a battery-and-latch mechanism, and the reason it's bulletproof is the same reason [the microchip itself is bulletproof](/blog/joule-arrives-microchip-rfid-primer/): there's almost nothing in it to break. The connected version — the one with an app and a cloud — was announced this year and ships in 2016. I'll buy it, but I note the trade going in: every layer of cloud I add to that door is a layer that can fail in a way the dumb latch never will.

The DualScan part is worth a picture, because it's the bit that makes the door useful in a multi-cat house: it reads the chip on the way *out* as well as in, so I can authorize a one-way trip and keep a second cat from following.

![A diagram of the SureFlap DualScan microchip pet door. A wall section in the middle holds the flap, with two RFID antenna coils — one for the way in, one for the way out — drawn around the opening. On the inside, Joule carries a passive 134.2 kHz microchip; a green arrow labelled read on the way out shows the door scanning her chip as she leaves. On the outside, a green arrow labelled read on the way in shows the door scanning on the way back, and a second cat whose chip does not match Joule's is rejected with no latch. A note records about six hundred reads over seven months with zero failures — passive RFID gating a battery-and-latch box.](../../assets/blog/2015-pet-iot-sureflap-dualscan.svg)

**FitBark's official API genuinely changed my behavior.** I've logged Atom's activity to my home server since 2013, and on the Whistle side that meant scraping a reverse-engineered endpoint that breaks every time they ship an app update. FitBark publishes a documented developer API — register an app, do an OAuth handshake, pull daily activity as JSON. I've moved my logging onto it. For most owners that's irrelevant; for the kind of person who keeps a dog's activity in a database next to the thermostat logs, it's most of the reason to lean one way.

Now the correction, because I'd rather log my own error than let it stand. For two years I half-assumed the way these trackers phone home was: tag, base station, cloud. Running the two side by side this fall forced me to actually check, and the canon is the inverse of the box art. **The Whistle has no base station** — it carries *both* BLE and Wi-Fi in the puck, so it reaches the cloud on its own over the house Wi-Fi when Atom's home and I'm at the office. **The FitBark is BLE-only**, and the base station belongs to *it* — a separate, optional Wi-Fi hub you buy on top of the tag to sync it when no phone is near. So when I wrote last year about "the Whistle base station," I was wrong: there isn't one. The hub is FitBark's, and it's the accessory that patches the radio FitBark left out. Getting this right matters because the *whole* tracker comparison falls out of which radio is in the puck.

![How each tracker reaches the cloud, corrected and drawn side by side. On the left, the Whistle: a coin-shaped puck carrying both a BLE radio and a Wi-Fi radio, with two arrows leaving it — one over BLE to the owner's phone which relays up, one straight over the home Wi-Fi network to the cloud with no phone involved — and a crossed-out box beneath labelled no base station. On the right, the FitBark: a bone-shaped tag carrying a BLE radio only, syncing over BLE to the phone which relays to the cloud, with a separate dashed optional Wi-Fi base station drawn as the only way it reaches the cloud when the phone is away. A note across the middle reads the hub belongs to FitBark, the radio Whistle baked into the puck.](../../assets/blog/2015-pet-iot-radio-canon.svg)

## What didn't

**Petnet's slip is the headline failure**, and it's the failure I predicted and backed money on anyway. Nine months late, and the part that worries me isn't the delay — it's the architecture. A feeder that needs the cloud to dispense food is a feeder that stops feeding the day the company's servers do. I'll judge it hard on exactly that: what it does when the cloud is unreachable. A dumb mechanical timer feeds the cat through a power outage and an outage of the vendor's business model both. I want to know the smart one does too, and I don't yet trust that it does.

**Pet vital signs are still vaporware.** Two years in, not one consumer product on the market measures heart rate, respiratory rate, or temperature off a collar. Everything is an accelerometer summing motion above a threshold and calling it "active minutes." That ceiling is the thing I keep hitting: I can tell you how much my dog moved and roughly how well he slept, and nothing about how his heart or his lungs are doing. The day that changes is the day pet-tech stops being a pedometer and starts being a health device.

## Forecast for 2016 — bets, with how sure I am

On the record so I can grade it next December. Confidence is the honest part; some of these are reads and some are wishes, and the number says which.

| # | What I expect in 2016 | Confidence | Read or wish? |
|---|---|---|---|
| 1 | Whistle finally ships cellular + GPS in the puck — location anywhere, no hub | 80% | Read — the rumors are concrete now, and it's the obvious gap |
| 2 | A big pet conglomerate (Mars, Petco, Nestlé Purina) acquires a smart-pet startup | 60% | Read — consolidation is how this category resolves |
| 3 | The Furbo dog camera Kickstarter actually ships | 50% | Coin-flip — crowdfunded hardware, judged by my own scar tissue |
| 4 | The connected SureFlap Hub ships (the cloud version of Joule's door) | 75% | Read — it's announced; the question is the date |
| 5 | Petnet has a visible cloud-outage event — missed or duplicated feeds | 55% | Read of the risk, wish that I'm wrong |
| 6 | Somebody attempts "fitness for cats" in a real product | 35% | Mostly wish — Joule would ignore it, but I want to see it tried |
| 7 | First pet device that talks to a smart-home hub natively | 30% | Wish — the home platforms aren't pointed at pets yet |
| 8 | Tagg finally shuts down or pivots away from consumer cellular | 55% | Read — same bet as last year, and I'll keep making it |

The bet I most want to be right about is the first one. The convergence device — low-power at home, cellular-and-GPS the moment the dog is genuinely *out* — is the piece this whole notebook has circled since 2013. If Whistle ships it in 2016, the empty top-right corner of the map finally fills in, and the question stops being "how much did he move" and starts being "where is he, and is he okay."

![A 2016 forecast chart plotting eight predictions as horizontal bars by confidence from zero to one hundred percent, each bar shaded to mark a grounded read versus a wish. The high-confidence reads cluster on the right: a cellular-GPS Whistle shipping at eighty percent, the connected SureFlap Hub at seventy-five percent. Mid bars sit in the middle: a pet conglomerate acquiring a startup at sixty percent, a Petnet cloud outage and a Tagg shutdown both at fifty-five percent, and the Furbo camera shipping at a fifty-percent coin-flip. The wishful bets sit lowest and are shaded differently: a fitness-for-cats attempt at thirty-five percent and a pet device talking to a smart-home hub at thirty percent. A dividing line separates grounded reads from wishful thinking, and the topmost, highest bar is marked as the one the whole notebook hinges on.](../../assets/blog/2015-pet-iot-forecast-confidence.svg)

## What I'll actually spend money on next year

Separate from the forecast — what I intend to buy, market permitting:

- **The cellular Whistle**, the day it ships, judged on one thing: does it keep a usable battery while adding location, or does it become a two-day Tagg with a nicer app?
- **The connected SureFlap Hub** when it lands — the cloud layer on top of the door that's already working, with the standing caveat that I want it to fail *gracefully* back to the dumb latch.
- **A Furbo, maybe**, if it ships and the reviews don't mention smoke. I'll wait for the second wave of reviews, not the first.
- **A FitBark Wi-Fi base station** so the tag syncs while Atom's home and my phone's at work — the one piece of his setup that still depends on a phone being in range.

## What's next

Two posts I can already see. The cellular Whistle, if and when it grows a location radio — the comparison I've wanted since 2013, the activity-only puck against whatever-it-becomes, on the same dog with three years of baseline in the bank. And the acquisition question this notebook keeps circling: will the big pet companies buy the smart-pet startups, and what happens to my data and my devices when they do. If bet 2 lands, that's the post.

Three years of pet IoT in the house now. Two pets instrumented instead of one. Four product categories — activity, identity, the door, and now feeding. The cat side, blank for two years, finally has a radio pointed at it. The dog side is waiting on the only feature that's ever mattered: knowing where he is when he's gone.

![A grid of the household's four pet-tech categories down the side — activity, identity, the door, and feeding — against the two animals, Atom the dog and Joule the cat, across the top. Activity is filled for Atom only, carrying the Whistle and FitBark, and empty for Joule. Identity is filled for both, each carrying a microchip. The door is filled for Joule only, the SureFlap DualScan, and empty for Atom. Feeding is filled for both at reduced opacity, the Petnet feeder marked on probation. A legend distinguishes a present device from an empty cell. The grid shows the household going from one instrumented animal to two and from three categories to four.](../../assets/blog/2015-pet-iot-four-categories.svg)
