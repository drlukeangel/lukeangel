---
title: "Mars divests Whistle to Tractive — collar market state"
date: 2025-07-08T15:00:00-04:00
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
coverAlt: "Mars Petcare and Tractive shown as two corporate blocks with a divests arrow between them, dated July 2025, and a Whistle cloud goes dark Aug 31 callout below."
---

Mars Petcare sold Whistle to [Tractive](https://tractive.com) yesterday. Whistle's cloud goes dark August 31, 2025. Existing customers get a free Tractive tracker if claimed by September 30; active subscribers get remaining prepaid time credited to a Tractive subscription; non-subscribers get 2 months of Tractive sub for free.

Two surprises in one. The empire that's been buying everything for nine years just **divested**. And Whistle isn't being migrated to a new platform — it's being shut down.

## Why Mars sold (a guess)

Mars hasn't said much beyond the press release. Some speculation:

- **3G sunset finished**. Whistle Go Explore + Whistle Fit run on 3G cellular. US carriers retired 3G consumer networks during 2022 (T-Mobile in July, AT&T in February, Verizon in December). Whistle's remaining install base has been on borrowed enterprise-IoT 3G that's been retiring per-region since. Funding LTE-M / 5G retooling for an aging consumer fleet was a cost Mars chose not to bear.
- **Whistle Health margin**. The vitals product (LTE-M, [I wrote about in 2021](/blog/whistle-health-gps-plus-vitals-arrives/)) was presumably included in the asset sale, but the announcement messaging is about the 3G models. The vitals product may have been the smaller revenue line.
- **Data-graph saturation**. Mars's strategic logic for owning Whistle was the always-on accelerometer feeding the customer-life data graph. Once Petivity (Purina) collected similar data, once Fi + Tractive populated independent datasets, and once veterinary-data integrations gave Mars cheaper alternatives, Whistle's marginal contribution to the data graph dropped below the maintenance cost.
- **The vertical-integration thesis matured past peak**. The empire isn't getting bigger from here — it's contracting. Holding niche / low-margin devices in a fragmenting category is harder than letting them go.

That last bullet is the most interesting. The [Mars Petcare empire post I wrote two years ago](/blog/mars-petcare-data-ownership-conflict/) framed Mars as locking down the category. The empire just got *smaller*. Empires don't divest devices when the strategic value is rising; they divest when the marginal contribution per dollar has dropped below the carrying cost.

## The August 31 dark date

Tractive's announcement: Whistle hardware stops working August 31, 2025 at 11:59 PM PT. Servers go offline. Location reporting stops. Vitals streams stop. App shows offline.

Compare to [Petnet's 2020 collapse](/blog/petnet-collapses-anatomy-of-smart-device-catastrophe/) — which happened without warning, without communication, without compensation. Whistle's shutdown is being executed cleanly: 7-week notice, free replacement hardware, subscription credit. Mars is doing this *right* (within the constraint of doing it at all). Petnet's customers got nothing; Whistle's customers get a working alternative.

That's the new precedent: cloud-dependent device shutdowns can be soft-landed when the vendor wants to do it that way. Mars wanted to. Petnet (insolvent) couldn't.

Data-export window matters here: Whistle's app's CSV export was reportedly disabled mid-August, so customers have ~6 weeks from announcement to extract their pet's historical activity / vitals data. The data Mars chose to release back to customers is finite; the rest stays in Mars's data lake. **Document your data export options** is the post-Petnet doctrine; the Whistle event reinforces it.

## What the connected-collar market looks like post-Whistle

Two main cellular collar vendors in the US:

| Vendor | Cellular | Vitals | Cat tracker | Subscription | Origin |
|---|---|---|---|---|---|
| **Fi** | LTE-M | Activity only | No | $99/yr | Independent, US |
| **Tractive** | LTE-M (+ 2G fallback intl) | HR, activity, sleep, scratch, bark | **Yes (GPS Cat Mini)** | from ~$5/mo | Independent, Austrian |
| Halo Collar | LTE-M | Activity | No | $9.95/mo | Independent, US ([returned mine](/blog/halo-collar-tried-it-returned-it/)) |

Plus BLE / Find My ecosystem:

- **Pebblebee Clip for Cats** ($35) — BLE crowdsourced, no subscription.
- **Chipolo One Spot** ($30) — BLE crowdsourced.
- **Eufy SmartTrack Card** ($25) — BLE crowdsourced.
- AirTag-on-collar — Apple specifically discourages it. The [anti-stalking architectural mismatch](/blog/airtag-on-atoms-collar-anti-stalking-ironies/) hasn't changed.

Plus health-only / non-tracker:

- **PetPace** — vitals-focused collar (HR, temperature, pain detection). No GPS. Currently running aggressive "Whistle is dying, switch to us" marketing to former Whistle Health customers.
- **Petivity** — Purina-owned litter analytics ([my review](/blog/petivity-smart-litter-multi-cat-analytics/)). Health-adjacent, not a collar.
- **Fitbark** — still around, BLE base-station model, niche.

That's the meaningful set. The category consolidated faster than I expected.

## Three things changed in 2025

**1. The cat-tracker gap has a credible option.**
Cat IoT has trailed dog IoT by ~3 years on every axis for twelve years; the missing piece for outdoor cats has been a purpose-built cellular cat tracker. Whistle never made one. Fi never made one. Tractive's GPS Cat Mini — launched late 2022, ~1.4 oz, sized for cats down to ~7 lbs — is the most viable cellular cat tracker at consumer prices. Joule and Boson have worn it since 2022; it covers the off-property outdoor dimension the SureFlap door logs don't capture.

**2. Vitals stopped being Mars-locked.**
Tractive's DOG 6 / DOG 6 XL ship with heart rate + activity + sleep + scratch detection + bark detection — covering most of what Whistle Health & GPS Plus delivered, in an independent (non-food-company-owned) hardware vendor. The [data-ownership conflict I documented two years ago](/blog/mars-petcare-data-ownership-conflict/) just got a meaningful alternative for the first time since Whistle Health shipped in 2021.

**3. The empire framing needs revision.**
Mars still owns Banfield + VCA + AniCura + Royal Canin + Pedigree + Champion. The vertical integration of food + clinics + analytics is intact. But the *device* leg of the empire is severed. The recommendation conflict is now lopsided — Mars can push food + clinic + analytics, but no longer has the always-on accelerometer in your dog's collar feeding into its data graph. The data flow that justified the [2016 Whistle acquisition](/blog/whistle-3-cellular-mars-acquires-whistle/) doesn't exist anymore.

## What I'm buying

- **DOG 6 XL** ($89) + **Base Station** ($19.99) — evaluating against [Quark's Fi](/blog/quark-arrives-puppy-second-dog-pet-iot-baseline/) when his battery degrades. The claimed 6-week battery is the test that decides whether Tractive beats Fi on the engineering Fi pioneered.
- **GPS Cat Mini** for Joule and Boson — already deployed since late 2022. Their outdoor patterns are well-documented via [SureFlap door logs](/blog/sureflap-microchip-cat-door-joules-first-iot/); cellular covers the off-property dimension the door logs don't capture. Will continue evaluating as part of the broader Tractive assessment.
- Not buying: any Whistle device (obviously). PetPace gets a wait.

## What's next

Buying the Tractive hardware now, evaluating over the next 4-6 weeks. The Base Station is the genuinely interesting product — it's a power-saving anchor for the cellular tracker that architecturally echoes the [Whistle 2013 BLE base station](/blog/atom-arrives-whistle-activity-monitor-launches/) almost exactly. The wheel turned twelve years; now it's at the start again, with better silicon and the same architectural choice.

Cracking the case open to figure out the radio when it arrives. Writing it up after.
