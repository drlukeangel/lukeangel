---
title: "Twelve years of pet IoT — the long-arc retrospective"
date: 2025-07-22T16:00:00-04:00
category: craft
tags:
  - pet-iot
  - retrospective
  - reflection
notebook: pet-iot-field-guide
notebookOrder: 40
excerpt: "Twelve years since Whistle launched. Four pets — Atom (2013-2024), Joule, Boson, Quark. Lessons on cloud dependency, vendor consolidation, multi-pet detection, vet telemetry, the DIY response."
pullquote: "Twelve years in. Mars just divested Whistle to Tractive — the empire that bought the device leg in 2016 sold it back nine years later. Cloud-dependency lesson written. DIY response just starting. The pet-IoT category is the smart-home category five years behind — same arc, smaller scale, higher stakes."
---

October 8, 2012 — Whistle shipped the first consumer dog activity tracker. I bought one when [Atom arrived in October 2013](/blog/atom-arrives-whistle-activity-monitor-launches/). Twelve years and change later — Atom's gone, Quark's three, Joule's eleven, Boson's five — time to step back.

Timing note: writing this two weeks after [Mars Petcare divested Whistle to Tractive](/blog/mars-divests-whistle-to-tractive-market-state/) and announced Whistle's August 31 shutdown. The category just rearranged itself in a way I didn't see coming when I started drafting the retrospective. Some sections below have been updated to reflect that news; the eras framework holds, the empire-trajectory section needed a revision.

Looking back across the entire arc.

## The eras

**Era 1 (2012-2015) — fitness trackers for dogs.**
Whistle, FitBark, Tagg. BLE + base station, or cellular with subscription. Activity counting calibrated against breed baselines. The "Fitbit for dogs" era. Cat IoT was the microchip and nothing else.

**Era 2 (2015-2018) — cat IoT joins, Mars consolidates.**
SureFlap microchip doors. Litter-Robot. PetCube cameras. The first non-dog products arrive. Mars Petcare buys Whistle (2016); the consolidation begins. Whistle 3 ships with cellular.

**Era 3 (2018-2020) — cloud-dependency catastrophe + multi-cat.**
Petnet's [9-day collapse in February 2020](/blog/petnet-collapses-anatomy-of-smart-device-catastrophe/) defines the era. Fi launches with LTE-M for genuine multi-week battery life. Boson arrives; multi-cat detection becomes a real engineering problem.

**Era 4 (2020-2023) — vitals + AI bullshit + AirTag.**
Whistle Health & GPS Plus ships with temperature + heart rate + scratching + respiratory rate (2021). Petivity smart litter monitor ships (2022). AirTag launches, the [anti-stalking-vs-pet-tracking architectural mismatch](/blog/airtag-on-atoms-collar-anti-stalking-ironies/) becomes apparent. Halo Collar ships with welfare problems. "AI behavior detection" mostly turns out to be marketing.

**Era 5 (2023-2025) — DIY local-first + Mars empire peak + Atom's passing + the contraction.**
Mars Petcare's vertical integration hits its peak in 2023 — food + clinics + devices + analytics, all under one roof. The DIY ESP32 pet-IoT response begins ([the ESP32 feeder I built this year](/blog/diy-esp32-pet-feeder-vendor-cloud-independence/)). Apple Find My pet trackers offer the first credible third-party tracking ecosystem. [Atom passes in October 2024](/blog/atoms-last-year-data-told-us/) — the data taught me what I missed. Then in July 2025, Mars [divests Whistle to Tractive](/blog/mars-divests-whistle-to-tractive-market-state/). The empire severs its device leg. The story I expected to write — Mars consolidating further — turned out to be the wrong shape of arc.

## Patterns across all five eras

**Cloud dependency is the category's central failure mode.**
Petnet was the headline case. Every other connected pet device has the same vulnerability. The vendor's cloud uptime is the device's reliability ceiling. The vendor's solvency is the device's life expectancy.

**Mars Petcare's vertical integration was the structural threat — until it wasn't.**
From 2016 through July 2025, the same company sold the food, ran the vet, sold the collar, and analyzed the data. The recommendation conflict was real — it shaped the advice owners received, the diagnoses vets gave, and the products that flourished in the category. As of July 2025, Mars divested the collar leg. Food + clinics + analytics remain vertically integrated; the device leg moved to Tractive (independent, Austrian). The structural threat is now lopsided, not gone — and the arc of "the empire that bought everything" turned out to bend back at the end.

**Multi-pet households break single-pet design assumptions.**
Two cats sharing one litter box, two dogs sharing one feeder, three pets visible on one camera — every device that worked for "the pet" needs to work for "which pet." Most devices don't, well.

**Vet-grade telemetry is real, and as of mid-2025, no longer trapped behind consolidation.**
The Whistle Health vitals signal is genuinely useful — caught Atom's mitral valve disease progression earlier than I would have noticed otherwise. For nine years (2016-2025) the only consumer-grade vitals tracker was Mars-owned. Tractive's [post-acquisition DOG 6 lineup](/blog/mars-divests-whistle-to-tractive-market-state/) — shipping vitals as of July 2025 — is the first independent alternative the category has produced. The pattern took twelve years to break.

**The cat-IoT category is a decade behind the dog-IoT category.**
Same complaint I had in 2014, still mostly true in 2025. SureFlap and Litter-Robot are the cat-IoT mainstays. Petivity is the third entrant. The category is thin compared to the dog-side market.

**DIY local-first is the only sustainable response.**
Vendor consolidation + cloud dependency + recommendation conflicts mean the only architecture that's robust against all three is hardware you control, firmware you write, automations that run on your LAN. ESPHome made this accessible. The DIY pet-IoT community is small but growing.

## What I'd warn the 2013 version of me

- **Don't trust vendor cloud uptime for pet-life-critical functions.** Always have a non-cloud backup for feeding.
- **Mars will buy Whistle in 2016, and the recommendation layer will start pushing Mars products immediately.** Vote with your wallet by buying Fi when it ships in 2019.
- **Mars will divest Whistle to Tractive in July 2025**, nine years after acquiring it. The empire is not permanent. The "vendor consolidation is forever" framing I'll use through most of the 2020s turns out to be wrong at the end.
- **Petnet will collapse in February 2020 for nine days.** Cats will die. Don't rely on it.
- **AirTag will launch in 2021 with anti-stalking features that are incompatible with intentional pet tracking.** Don't bother with it for pets.
- **The "AI behavior detection" subscriptions will mostly be marketing-grade bullshit.** Don't subscribe.
- **Atom will get mitral valve disease at age 10.** Watch his scratching frequency starting at age 8 — that's the early-warning signal Whistle Health surfaces in 2021 but I won't notice until 2024.
- **You'll spend ~$8k on pet IoT over 12 years.** It was mostly worth it. The Litter-Robot, Fi, Whistle Health, and DIY-ESP32 are the wins. The Petnet, Halo, Furbo subscriptions are the losses.

## What 2025 me is wrong about

Best guesses for what 2030-me will laugh at:

- **On-device AI for pet behavior.** Real (non-bullshit) behavior detection is going to start working when the models can run on-device with low latency. 2027-2028 maybe.
- **Mars Petcare facing antitrust regulation.** I don't believe it'll happen in the US. Could happen in EU first.
- **The category collapsing into Apple's Find My ecosystem.** Apple's network density is going to make crowdsourced Find My pet trackers the default. Cellular collars will become niche for outdoor adventure dogs.
- **Veterinary integration that's not vendor-locked.** Some open standard for pet-health data exchange between consumer devices and vet records. Years away.

## What stays the same

- **Joule's microchip.** Implanted 2014. Still there. Still works.
- **The SureFlap door's reliability.** Ten years of perfect chip-reading.
- **The Litter-Robot's mechanism.** The III in the kitchen is six years old. Still working.
- **The pattern: track activity (or in cat case, identity); detect anomalies (or in cat case, weight); integrate with broader smart-home (or in cat case, smart-pet-door analytics).** The framework is durable; the implementations rotate.

## The pets, currently

- **Joule** (cat, ~11 years old). Healthy. Wears Pebblebee Clip via Find My. Uses Litter-Robot III + SureFlap door + SureFeed feeder.
- **Boson** (cat, ~5 years old). Healthy. Wears Pebblebee Clip. Uses Litter-Robot 4 + SureFlap door + SureFeed feeder.
- **Quark** (dog, ~3 years old). Healthy. Wears Fi cellular collar. No vitals device yet (will add at age 7-8).

Three pets. ~$1,200 of currently-deployed pet-IoT hardware. About $200/year in subscriptions (mostly Fi).

## Closing

Pet IoT is the smart-home category, five years behind. Same evolutionary pattern: vendor sprawl → consolidation → cloud-dependency catastrophe → DIY local-first response. Smaller market, smaller engineering investment, higher stakes (the failure mode is animal welfare, not lights-stuck-on).

If you're shopping pet IoT in 2025:

1. **Buy the SureFlap door** (or equivalent microchip door). Best $200 in the category.
2. **Buy a Litter-Robot** if you have cats. The cleaning is worth it; the data is bonus.
3. **Buy a Fi or Tractive collar** for outdoor dogs. Both independent vendors. Real engineering on battery life. Tractive's DOG 6 XL claims 6-week battery; evaluating against Fi for Quark's next collar.
3b. **Tractive CAT 6 Mini for outdoor cats.** First credible consumer cellular cat tracker the category has produced. Twelve years late, finally here.
4. **DIY your feeder** with ESP32 + ESPHome. Vendor-cloud-independent.
5. **Add a Pebblebee Clip** to indoor pets' collars for Find My backup.
6. **Skip the wellness subscriptions** (Furbo Dog Nanny, etc.). They're not signal.
7. **Maintain a non-cloud-dependent backup** for any pet-feeding device. Always.

Twelve years in. The data carries forward to Quark, to Joule, to Boson. The next dog (whenever there's a next dog) will get a senior-mode dashboard from the start.

Atom is missed. The lessons are written.

Onto the next decade.
