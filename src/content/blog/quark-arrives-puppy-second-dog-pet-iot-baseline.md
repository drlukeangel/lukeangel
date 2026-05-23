---
title: "Quark arrives — a second dog, the pet-IoT baseline restarted"
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
excerpt: "Brought home Quark — 9-week chocolate Lab. Atom is 8.5 and gracious. Pet-IoT setup begins again: new Fi collar, new baseline. Same 2013 questions, different answers."
pullquote: "When the same engineer brings home a second puppy nine years apart, the pet-IoT landscape they're shopping has changed completely. In 2013, Whistle was new and risky. In 2022, the right collar is obvious — Fi — and the integration story is mature."
---

Brought home **Quark** this weekend. A 9-week-old chocolate Lab puppy, named per the household convention (Atom: dog, Joule: cat, Boson: cat, Quark: dog, all particle/energy-themed). Atom is 8.5 years old now, gracious about the puppy-energy. Joule and Boson are mildly horrified.

The pet-IoT setup begins again. Same engineer, second puppy, nine years later, very different landscape.

## What's different vs Atom's 2013 setup

Quark gets a Fi collar from day one. Compare to Atom's 2013 Whistle Activity Monitor first collar:

| | **Atom, 2013** | **Quark, 2022** |
|---|---|---|
| First collar | Whistle Activity Monitor (BLE + base) | Fi Series 2 (LTE-M cellular) |
| Cost | $129 + base | $99 + $99/yr |
| Battery | 7-10 days claimed, 5-7 days real | 3 weeks claimed, 14 days real |
| Location tracking | None (no GPS, no cellular) | Continuous GPS + Find-My-style crowdsourced backup |
| Vitals | Activity only | Activity + (no vitals yet on Fi; if I want them, add a Whistle Health) |
| Vendor ownership | Independent (until Mars acquired Whistle in 2016) | Fi independent (Pebble for the Connect-pet-data lineage, but Fi is the player) |
| Cloud dependency | High | Moderate (some functions work LAN-only if base near) |

The Fi for Quark gives me 4 features Atom didn't have until much later: real-time GPS, crowdsourced Find My-style network, multi-week battery, and the option to bypass Mars's ecosystem.

## The setup, in detail (compared to Atom's setup process in 2013)

Atom's 2013 setup (Whistle Activity Monitor):
- BLE pairing dance.
- Base station WiFi setup via "join temporary AP, hand over credentials."
- 15 minutes.

Quark's 2022 setup (Fi):
- Open Fi app on phone.
- Tap "add new pet."
- Hold Fi near phone (BLE pairing).
- LTE-M activation (cell network registers the device automatically).
- Set geofence by dragging a circle on a map.
- Snap collar on Quark.
- Total: 8 minutes.

Pet-IoT setup is genuinely better than it was nine years ago. Same complexity-feature ratio, less friction.

## The two-dog household

Atom (~75 lb adult Lab) wears Fi + Whistle Health & GPS Plus. The vitals data has 8 months of baseline now.

Quark (~14 lb puppy, will grow to ~70-80 lb adult) wears a smaller Fi sized for his current neck. The Fi is rated down to 5 lb dogs; works for him. The geofence and tracking are configured separately from Atom's account.

The Fi app shows both dogs on one screen. Tap to switch between Atom's and Quark's data. Multi-pet works well.

The Whistle Health app — I'm not putting one on Quark yet. He's a growing puppy; "normal" vitals are wildly variable for the first 18 months. The Whistle Health baselines apply to adult dogs. Putting a vitals monitor on Quark now would just generate noise. Maybe in 2024 when he's a year and a half.

## The data-baseline restart

The household pet-data ecosystem has to expand to handle four pets now (Atom + Quark + Joule + Boson):

- **Fi**: two dogs, two profiles. Easy.
- **Whistle Health**: one dog (Atom only). One profile.
- **SureFlap door**: two cats. Atom + Quark can't use the SureFlap door (too big). They use a separate exterior dog door (PetSafe Smart Pet Door, no microchip — anything dog-sized can pass through).
- **Litter-Robot III Connect** (×2 in the house now): both cats. Per-cat attribution by weight (Joule 9.5 lb, Boson now 7 lb growing — gap is narrowing!).
- **Roomba**: scheduled for kitchen/dining area; navigates around two dogs and two cats. The cat-treat conditioning [I documented in the smart-home Roomba post](/blog/robots-roomba-braava-daily-routine/) applies to both Joule and Boson.

The multi-pet expansion is the most interesting engineering problem in the house. Each device's per-pet identification capability is being stress-tested.

## What I'm reading right now

The Halo Collar reviews continue to be problematic. Multiple independent welfare reviews from animal-behavior researchers point out that the boundary-correction (static pulse on virtual-fence violation) is genuinely uncomfortable for dogs and can produce learned anxiety responses.

I've been considering Halo for the new build's backyard (no physical fence yet on the back property line, considering a virtual fence as an option). Going to write a full review post next month when I have it in hand to test (and return).

## Quark's data starts today

The Fi activity baseline for a 9-week Lab puppy is going to be wildly variable for the next 18 months. Quark currently does ~15-25 minute play bursts, sleeps 18 hours per day. Within 4-6 weeks, that'll shift to longer activity blocks + shorter naps. By 12-18 months he'll be in adult-dog activity ranges.

The point of the early data isn't "is Quark healthy" (he is, growing fast). The point is establishing the baseline trajectory so the *future* health-anomaly detection has reference.

Welcome, Quark. The data starts today (for a second time).
