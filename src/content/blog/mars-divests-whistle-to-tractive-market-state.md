---
title: "Mars divests Whistle to Tractive — collar market state"
date: 2025-07-29T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - whistle
  - tractive
  - mars-petcare
  - market-analysis
notebook: pet-iot-field-guide
notebookOrder: 39
excerpt: "Mars Petcare sold Whistle to Tractive yesterday. Whistle's cloud goes dark August 31. The empire that bought everything for nine years just divested, and Whistle is being euthanized not migrated."
pullquote: "Empires don't sell off devices when the strategic value is rising. Mars's vertical-integration thesis just contracted — the empire that bought Whistle in 2016, AniCura in 2018, VCA in 2017 just let go of one of its data-feed legs. The empire is starting to look smaller from the inside than from the outside."
cover: ../../assets/blog/mars-divests-whistle-tractive-cover.svg
coverAlt: "A large company drawn as a tall stack of holding blocks, with one block — an orange device leg carrying a collar-puck glyph — detaching and sliding away, a red crack marking where it pulled free. A handoff arrow points to a smaller single block, marked with a pet paw, that catches the puck. In the top corner the Whistle cloud is greyed out with a power-off symbol, going dark."
---

Mars Petcare sold Whistle to [Tractive](https://tractive.com) yesterday. Whistle's cloud goes dark August 31, 2025. Existing customers get a free Tractive tracker if claimed by September 30; active subscribers get remaining prepaid time credited to a Tractive subscription; non-subscribers get 2 months of Tractive sub for free.

Two surprises in one. The empire that's been buying everything for nine years just **divested**. And Whistle isn't being migrated to a new platform — it's being shut down.

## Why Mars sold (a guess)

Mars hasn't said much beyond the press release. Some speculation:

- **3G sunset finished**. Whistle Go Explore + Whistle Fit run on 3G cellular. US carriers retired 3G consumer networks during 2022 (T-Mobile in July, AT&T in February, Verizon in December). Whistle's remaining install base has been on borrowed enterprise-IoT 3G that's been retiring per-region since. Funding LTE-M / 5G retooling for an aging consumer fleet was a cost Mars chose not to bear.
- **Whistle Health margin**. The behavioral-health line (LTE-M, [I wrote about in 2021](/blog/whistle-health-gps-plus-vitals-arrives/)) — activity, sleep, scratching, licking, drinking off one accelerometer — was presumably included in the asset sale, but the announcement messaging is about the 3G models. That health line may have been the smaller revenue piece anyway.
- **Data-graph saturation**. Mars's strategic logic for owning Whistle was the always-on accelerometer feeding the customer-life data graph. Once Petivity (Purina) collected similar data, once Fi + Tractive populated independent datasets, and once veterinary-data integrations gave Mars cheaper alternatives, Whistle's marginal contribution to the data graph dropped below the maintenance cost.
- **The vertical-integration thesis matured past peak**. The empire isn't getting bigger from here — it's contracting. Holding niche / low-margin devices in a fragmenting category is harder than letting them go.

That last bullet is the most interesting. The [Mars Petcare empire post I wrote two years ago](/blog/mars-petcare-data-ownership-conflict/) framed Mars as locking down the category. The empire just got *smaller*. Empires don't divest devices when the strategic value is rising; they divest when the marginal contribution per dollar has dropped below the carrying cost.

![Mars's vertical integration drawn as four legs wired to "your dog" at the centre: food (Royal Canin, Pedigree), clinics (Banfield, VCA, AniCura), and analytics (the customer-life data graph) all stay connected with solid green links, while the fourth leg — device (Whistle) — is severed, its link cut with a red scissors mark and the box drawn faded and dashed. A caption notes that food, clinics, and the data graph stay wired to the dog, but the always-on collar that fed them no longer does.](../../assets/blog/mars-empire-device-leg-severed.svg)

## The August 31 dark date

Tractive's announcement: Whistle hardware stops working August 31, 2025 at 11:59 PM PT. Servers go offline. Location reporting stops. Activity and health tracking stop. App shows offline.

Compare to [Petnet's 2020 collapse](/blog/petnet-collapses-anatomy-of-smart-device-catastrophe/) — which happened without warning, without communication, without compensation. Whistle's shutdown is being executed cleanly: 7-week notice, free replacement hardware, subscription credit. Mars is doing this *right* (within the constraint of doing it at all). Petnet's customers got nothing; Whistle's customers get a working alternative.

That's the new precedent: cloud-dependent device shutdowns can be soft-landed when the vendor wants to do it that way. Mars wanted to. Petnet (insolvent) couldn't.

![Two ways a cloud-dependent device can die, drawn as service-availability lines. On the left, Petnet in 2020: a flat "working" line that drops straight off a cliff to zero with no transition, annotated with four crosses — no warning, no communication, no replacement, no data export — and a note that an insolvent vendor couldn't soft-land even if it wanted to. On the right, Whistle in 2025: a flat line that ramps gracefully down through a shaded roughly seven-week notice window, annotated with four checks — seven weeks' notice, a free Tractive tracker, subscription credit, and a roughly six-week data-export window — with a note that a solvent owner chose to land it gently. A caption reads: the difference isn't the shutdown, it's whether someone solvent decided to do it kindly.](../../assets/blog/whistle-vs-petnet-shutdown.svg)

Data-export window matters here: Whistle's app's CSV export was reportedly disabled mid-August, so customers have ~6 weeks from announcement to extract their pet's historical activity and behavioral-health data. The data Mars chose to release back to customers is finite; the rest stays in Mars's data lake. **Document your data export options** is the post-Petnet doctrine; the Whistle event reinforces it.

## What the connected-collar market looks like post-Whistle

Two main cellular collar vendors in the US:

| Vendor | Cellular | Health metrics | Cat tracker | Subscription | Origin |
|---|---|---|---|---|---|
| **Fi** | LTE-M | Activity only | No | $99/yr | Independent, US |
| **Tractive** | LTE-M (+ 2G fallback intl) | Activity, sleep, **resting HR + respiratory rate** (shipped May 2025) | **Yes (GPS Cat Mini)** | from ~$5/mo | Independent, Austrian |
| Halo Collar | LTE-M | Activity | No | $9.95/mo | Independent, US ([returned mine](/blog/halo-collar-tried-it-returned-it/)) |

Plus BLE / Find My ecosystem:

- **Pebblebee Clip** ($30) — BLE crowdsourced, no subscription, small enough for a collar.
- **Chipolo One Spot** ($30) — BLE crowdsourced.
- **Eufy SmartTrack Card** ($25) — BLE crowdsourced.
- AirTag-on-collar — Apple specifically discourages it. The [anti-stalking architectural mismatch](/blog/airtag-on-atoms-collar-anti-stalking-ironies/) hasn't changed.

Plus health-only / non-tracker:

- **PetPace** — vitals-focused collar (HR, temperature, pain detection). No GPS. Currently running aggressive "Whistle is dying, switch to us" marketing to former Whistle Health customers.
- **Petivity** — Purina-owned litter analytics ([my review](/blog/petivity-smart-litter-multi-cat-analytics/)). Health-adjacent, not a collar.
- **Fitbark** — still around, BLE base-station model, niche.

That's the meaningful set. The category consolidated faster than I expected.

![The connected-collar market as of August 2025, drawn as three tiers plus the departed. The cellular LTE-M tier holds three subscription trackers: Fi (activity only, no cat tracker, $99/yr, US independent, the vendor that pioneered the home-anchor idea), Tractive (highlighted as the new owner of Whistle — activity, sleep, resting heart rate and respiratory rate, a GPS Cat Mini, a Base Station anchor, from about $5/mo, Austrian independent), and Halo Collar (activity, no cat tracker, $9.95/mo, US independent, fence-correction model). A BLE / Find My tier lists Pebblebee Clip, Chipolo One Spot, and Eufy SmartTrack Card — crowdsourced, no subscription, no continuous off-grid track — alongside AirTag-on-collar, which Apple discourages over an unchanged anti-stalking architecture mismatch. A health-only tier lists PetPace (vitals collar, no GPS), Petivity (Purina litter analytics), and Fitbark (niche BLE base-station). Below them all, struck through in red, Whistle: cloud dark August 31, 2025, its Go Explore and Fit models stranded by the US consumer 3G retirement through 2022 that Mars chose not to retool around, its health line absorbed by Tractive.](../../assets/blog/mars-divests-whistle-tractive-fig-1.svg)

## Three things changed in 2025

**1. The cat-tracker gap has a credible option.**
Cat IoT has trailed dog IoT by ~3 years on every axis for twelve years; the missing piece for outdoor cats has been a purpose-built cellular cat tracker. Whistle never made one. Fi never made one. Tractive's GPS Cat Mini — launched late 2022, ~1.4 oz, sized for cats down to ~7 lbs — is the most viable cellular cat tracker at consumer prices. Joule and Boson have worn it since 2022; it covers the off-property outdoor dimension the SureFlap door logs don't capture.

**2. Pet vitals finally broke free of Mars — eight weeks before Mars walked away.**
Here's the timing that makes the divestiture land differently than I'd have guessed. For nine years the most developed consumer pet-health product was Whistle's, and it was behavioral only — scratching, licking, drinking, sleep off the accelerometer, no actual physiology. Then in **May 2025**, Tractive shipped *real* vitals: resting heart rate and respiratory rate, pushed as a free software update to its existing trackers (it turns out the sensor was already in the hardware; they just hadn't lit it up). That's the consumer category-first for genuine pet vitals — and it came from an independent, non-food-company vendor. Eight weeks later, Mars divested Whistle to that same vendor. So the [data-ownership conflict I documented two years ago](/blog/mars-petcare-data-ownership-conflict/) didn't resolve by Mars loosening its grip; it resolved because an outsider leapfrogged Mars on the one axis (vitals) Mars never delivered, and *then* absorbed Mars's device. The health data didn't die with Whistle — it moved to an independent owner and leveled up on the way out. (Caveat for my own household: the vitals rolled out on *dog* trackers first; feline-baseline vitals for the cats aren't here yet.)

**3. The empire framing needs revision.**
Mars still owns Banfield + VCA + AniCura + Royal Canin + Pedigree + Champion. The vertical integration of food + clinics + analytics is intact. But the *device* leg of the empire is severed. The recommendation conflict is now lopsided — Mars can push food + clinic + analytics, but no longer has the always-on accelerometer in your dog's collar feeding into its data graph. The data flow that justified the [2016 Whistle acquisition](/blog/whistle-3-cellular-mars-acquires-whistle/) doesn't exist anymore.

## What I'm buying

- **DOG 6** ($69.99) + **Base Station** ($19.99) — evaluating against [Quark's Fi](/blog/quark-arrives-puppy-second-dog-pet-iot-baseline/) when his battery degrades. Tractive claims about two weeks per charge on the DOG 6; whether the Base Station's power-saving zone stretches that past Fi's real-world fortnight is the test that decides whether Tractive beats Fi on the engineering Fi pioneered.
- **GPS Cat Mini** for Joule and Boson — already deployed since late 2022. Their outdoor patterns are well-documented via [SureFlap door logs](/blog/sureflap-microchip-cat-door-joules-first-iot/); cellular covers the off-property dimension the door logs don't capture. Will continue evaluating as part of the broader Tractive assessment.
- Not buying: any Whistle device (obviously). PetPace gets a wait.

## What's next

Buying the Tractive hardware now, evaluating over the next 4-6 weeks. The Base Station is the genuinely interesting product — a plug-in short-range anchor that tells the cellular tracker "you're home, stop spending battery." It rhymes with the very first device in this notebook: the [2013 Whistle](/blog/atom-arrives-whistle-activity-monitor-launches/) leaned on *home-WiFi proximity* for exactly that "the dog's home" signal. Twelve years later the instinct is unchanged — only now it's a dedicated BLE beacon instead of the house WiFi, with much better silicon underneath. Same architectural choice, new radio.

![The home-anchor battery trick drawn twice, twelve years apart. On the left, 2013: the Whistle puck uses home Wi-Fi proximity as its anchor — a house emitting a Wi-Fi signal, a dashed "home" arrow to a collar whose radio goes idle when the network is seen, with a note that there was no cellular yet so seeing Wi-Fi meant home meant stop polling, crude but the right idea. On the right, 2025: the Tractive Base Station is a dedicated plug-in BLE beacon emitting its own signal, a dashed "home" arrow to a DOG 6 collar whose LTE-M radio sleeps inside the beacon's zone, with a note that this is what stretches battery toward the claimed two weeks per charge. A caption notes that the same architectural choice spans twelve years — only the radio and the silicon underneath have changed.](../../assets/blog/mars-divests-whistle-tractive-fig-2.svg)

Cracking the case open to figure out the radio when it arrives. Writing it up after.
