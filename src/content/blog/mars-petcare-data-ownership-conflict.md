---
title: "Mars Petcare — the food company that owns your dog's collar"
date: 2023-05-12T16:00:00-04:00
category: tools
tags:
  - pet-iot
  - mars-petcare
  - data-ownership
  - consolidation
  - whistle
notebook: pet-iot-field-guide
notebookOrder: 32
excerpt: "Seven years after Mars Petcare acquired Whistle, the consolidation is obvious. Same company sells the collar, sells the food, runs the vet, analyzes the data. The conflict isn't theoretical anymore."
pullquote: "Pet wellness 'recommendations' that come from a company that also sells the prescribed food, runs the prescribing vet, and owns the analytics that 'detected' the need are not health advice. They're marketing channels. The conflict isn't subtle anymore."
cover: "../../assets/blog/mars-petcare-data-ownership-conflict-cover.svg"
coverAlt: "An illustration in warm orange of a closed corporate loop drawn inside a single boundary: a dog's collar feeds data to a central analytics hub, which connects out to a food bowl, a vet cross, and a recommendation bubble — all four nodes sitting inside one company's walls, so the data measured at the collar circles back as a pitch for the same company's food and clinic."
---

Mars Petcare's pet-empire consolidation has been the slow-burn story of the last seven years. Time to step back and see where it's landed.

## The Mars Petcare portfolio, mid-2023

**Devices:**
- Whistle (acquired 2016).
- Tagg (Whistle acquired it in January 2015, *before* Mars bought Whistle; product since discontinued, its cellular IP folded into Whistle's GPS line).

**Vet clinics:**
- Banfield Pet Hospital (~1,000 US clinics) — Mars subsidiary since 2007.
- BluePearl Veterinary Partners (specialty + emergency) — Mars-owned since 2015.
- VCA Animal Hospitals (~800+ clinics) — acquired 2017.
- AniCura (~430 European clinics) — acquired 2018.
- Linnaeus Group (UK vet network) — acquired 2018.

**Food:**
- Royal Canin (premium, prescription-style).
- Pedigree (mass-market dog).
- Whiskas (mass-market cat).
- IAMS (mid-market).
- EUKANUBA (premium dog).
- Champion Petfoods (Acana + Orijen, premium) — deal closed February this year.

**Other:**
- Sheba (cat).
- Cesar (small dog).
- Greenies (treats).
- Antinol-class supplements.

Mars Petcare's annual revenue: ~$20 billion. About **40% of all global premium pet food** flows through Mars-owned brands. About **20% of US veterinary visits** happen at a Mars-owned clinic. About **25% of premium connected pet collars sold** are Whistle-branded.

That's the empire.

![The Mars Petcare empire as of mid-2023, drawn as three pillars converging on one dog. The devices pillar holds Whistle (acquired 2016, a GPS and behavior collar) and Tagg (folded into Whistle, discontinued), about 25% of premium connected collars. The vet-clinics pillar lists Banfield (about 1,000 US clinics since 2007), VCA (about 800-plus, 2017), BluePearl (specialty, 2015), AniCura (about 430 European, 2018), and Linnaeus (UK network, 2018), about 20% of US vet visits. The food pillar lists Royal Canin (prescription-style), Pedigree, Whiskas, IAMS, EUKANUBA, Champion (Acana and Orijen, 2023), Sheba, Cesar, and Greenies, about 40% of global premium pet food. Lines from all three pillars converge on a single highlighted box: one dog, measured, fed, treated, and advised all by the same owner. A caption notes that the device that watches the dog, the clinic that treats it, and the food it eats all roll up to one balance sheet.](../../assets/blog/mars-petcare-data-ownership-conflict-fig-1.svg)

## The data flow

Here's where data flows in the Mars ecosystem. The collar's activity, location, and behavioral signals land in a cloud that Mars also fills from its clinics and its checkout lines — every Banfield or VCA visit, every Royal Canin or Pedigree purchase, every treat — and then the same lake feeds the recommendations that come back at me.

![The Mars data pipeline, drawn left to right. On the left, the collar feeds activity, location, and behavioral data into a central box labelled one data lake. Three feeders rise into that lake from below — Banfield/VCA clinic visits, Royal Canin/Pedigree purchases, and treat purchases — so the lake holds the dog's diagnoses and the household's buying history alongside the sensor data. On the right, an arrow out of the lake leads to a funnel labelled "comes back as a pitch": recommendations in the Whistle app, wellness reports from the Mars clinic, targeted marketing for Mars-brand food — all pointing back at Mars-owned products. A caption notes that every interaction Mars has with the dog is informed by every other one: one lake, one owner.](../../assets/blog/mars-data-pipeline.svg)

The data ownership structure means **every interaction Mars has with my dog is informed by every other interaction Mars has with my dog**. The collar's "recommendation" the vet's "diagnosis," the food's "ingredient choice" — all sourced from the same data lake.

## The conflict, concretely

A Whistle Health app message I got last month — and to be clear about what Whistle Health actually measures, it's *behavioral* signals (licking, scratching, sleep, eating, drinking), not cardiac vitals; nobody ships heart-rate-on-a-collar to consumers yet. The message:

> *"Atom's scratching is up 30% over his baseline this month. Increased scratching can be an early sign of skin or allergy issues. Some Royal Canin formulas are designed to support skin and coat health — talk to your vet about whether a diet change might help."*

Translation: Mars's analytics noticed a trend in a real signal. Mars's recommendation engine surfaced a Mars-owned product. Mars's app nudged me toward bringing it up at a Mars-owned vet clinic.

Each step is a Mars revenue opportunity. Each step is structurally aligned with Mars's interests, not necessarily with Atom's.

What would an independent recommendation look like?
- "Atom's scratching is up 30% over baseline this month."
- *That's it.* Take it to your vet — any vet — and let them decide whether it's fleas, allergy, anxiety, dry winter air, or nothing.

The "talk to your vet about a diet" framing is the conflict. Increased scratching has a dozen possible causes, most of which a diet change does nothing for; a vet would rule out parasites and allergens before anyone touched the food bowl. But Mars's app skips the differential and shortcuts straight to "buy this product." The signal is real and genuinely useful. The leap from signal to *Mars-owned remedy* is the part that isn't health advice.

![One real signal — "scratching up 30%" off the collar — drawn forking into two paths. The independent-report path, in green, surfaces the signal and stops there ("take it to any vet and let them decide"), leading to a full differential: rule out fleas and parasites, rule out allergy, anxiety, and dry winter air, and touch the food bowl last if at all. The Mars-ecosystem path, in red, skips the differential ("some Royal Canin formulas support skin and coat…") and goes straight to a Mars-owned remedy: Mars food, a visit to a Mars clinic, each step a Mars revenue opportunity. A caption notes that the signal is real and useful, but the leap from signal to Mars-owned remedy is the part that isn't health advice.](../../assets/blog/mars-petcare-data-ownership-conflict-fig-2.svg)

## Where else this shows up

I've documented this conflict over multiple posts. The pattern:

- [2016, the acquisition](/blog/whistle-3-cellular-mars-acquires-whistle/): Mars buys the device.
- [2016, six months in](/blog/six-months-on-whistle-3-cellular-realities/): the recommendation layer starts pushing Mars products.
- [2021, Whistle Health](/blog/whistle-health-gps-plus-vitals-arrives/): the behavioral-signal layer arrives, and Mars's data graph gets denser.
- 2022–2023: with the clinics, the food, and the device under one roof, Mars controls the whole pipeline.

Same pattern at Purina (Nestlé-owned): Petivity smart litter recommends Pro Plan diets. Same pattern emerging at other consolidations.

## What independent alternatives exist

The non-Mars, non-Purina pet IoT options as of 2023:

- **Fi** (independent, VC-backed): GPS + activity. No vitals. No food/vet integration.
- **Litter-Robot / Whisker** (independent): hardware + visit data. No diet recommendations.
- **SureFlap / Sure Petcare** (owned by Merck Animal Health since the 2019 Antelliq deal — *not* Mars, but not a scrappy independent either): hardware + access logs, no food/vet funnel.
- **Pawscout, Pebblebee** (BLE crowdsourced trackers): no data analytics.
- **Apple AirTag** (Apple): no food/vet ecosystem.

For *behavioral health signals* specifically — the licking/scratching/sleep/eating/drinking layer — there is no non-Mars consumer product. Anyone who wants that on a dog collar has to buy Whistle, which means handing the data to Mars. (True cardiac vitals — heart rate, respiratory rate — aren't a shipping consumer category at all yet; everyone's collar is still an accelerometer with a behavior model on top.) On the wellness-signal layer, Mars has the category to itself.

## The regulatory question

In human medicine, this kind of vertical integration would draw regulatory attention. If the same company sold the diagnostic device AND prescribed the medication AND ran the clinic AND owned the pharmaceutical — that's an antitrust + ethics scenario. Multiple regulatory bodies would look at it.

In veterinary medicine, there's no equivalent regulatory body. No FDA-for-pets enforcing conflicts. State veterinary boards don't have jurisdiction over device-manufacturer ownership. Antitrust enforcement doesn't really see pet care as a priority category.

Mars's consolidation has happened in regulatory white space. It's not unique to Mars — Nestlé Purina is consolidating similarly — but Mars is the most advanced.

## What I do about it

For my four pets:

- **Use Fi for collars** (independent — verified non-Mars).
- **Continue Whistle Health on Atom** (for the behavioral-signal data — there's no non-Mars alternative).
- **Use independent vets** (we drive 30 minutes to a non-Mars clinic).
- **Disable in-app recommendations** wherever possible.
- **Buy food from independent brands** (Acana — wait, Acana was acquired by Mars last year. Fromm. Or actually-independent labels.)

The non-Mars defaults are getting harder to maintain. The empire keeps absorbing the independents.

## What's next

The "AI behavior detection" pitch from multiple vendors (Furbo Dog Nanny, Companion, others) is reaching peak hype this year. Going to evaluate one and write about whether it's signal or marketing.

Mars Petcare's empire isn't going to stop expanding. Champion's acquisition last year was a sign. Whatever the next acquisition is — probably a competitor to Fi, or another smart-litter brand — it's coming.
