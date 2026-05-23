---
title: "Fi ships first units — Atom finally has a non-Mars tracker"
date: 2019-11-08T19:00:00-05:00
category: tools
tags:
  - pet-iot
  - fi
  - whistle
  - cellular
  - lte-m
notebook: pet-iot-field-guide
notebookOrder: 19
excerpt: "Fi Series 1 shipped October. Bought one for Atom — first non-Mars cellular tracker. LTE-M, three-week claimed battery, no Mars Petcare ownership. Notes on setup, real battery life, vs Whistle."
pullquote: "Two weeks on Fi. Battery life: 14 days actual, on a healthy active dog. That's 4-5× what Whistle 3 delivered. The LTE-M bet has paid off."
---

Fi Series 1 finally shipped to early-access waitlists in October. Broader availability hit November 1. Bought one for Atom — first cellular pet tracker on him since I [shelved the Whistle 3 in 2016](/blog/six-months-on-whistle-3-cellular-realities/). Two weeks of use.

## The hardware

- Plastic puck, ~38 g (slightly heavier than Whistle 3 because of the larger battery).
- **LTE-M / Cat-M1 cellular** modem (Quectel BG96-class).
- **GPS / GLONASS / Galileo** triple-constellation chipset.
- **BLE 5.0** for base-station / phone proximity.
- Rechargeable Li-ion, claimed **3 weeks battery life**.
- IP68 water rating (better than Whistle's IP67).
- **Snap-on collar mount** with a metal locking ring (vs Whistle's plastic clip).

The mount is the small detail I appreciate. Whistle's plastic clip broke twice on Atom over its lifetime (replacement was $20 each). Fi's metal locking ring feels solid.

## Setup, in detail

1. Unbox. Power on the Fi via the side button.
2. iOS app downloads. Create account.
3. Pair via BLE proximity — phone discovers the Fi, completes a setup handshake.
4. **LTE-M activation** — Fi negotiates cell network registration. Took about 90 seconds; visible progress bar in the app.
5. Configure subscription — $99 hardware + $99/year (cheaper than Whistle 3's $84/year at the time, plus better hardware).
6. Set geofence — drew a 100-meter radius around our house. Fi pushed notification on enter/exit.
7. Snap the Fi onto Atom's collar.

Total setup: 12 minutes. The hardest part was getting Atom to hold still for the collar snap.

## What it does

Same basic feature set as Whistle 3, but the data sync and refresh feel meaningfully better:

- **Location refresh**: cellular ping every ~2 minutes when active, every 15 minutes idle.
- **Geofence alerts**: < 30 seconds from boundary crossing to push notification.
- **Activity tracking**: accelerometer-based step counting + classification (rest/active/play).
- **Multi-pet support**: Fi handles multiple devices per account; useful when we add a second pet.
- **Crowd-sourced lost-pet network** (Fi calls it "Lost Pet Mode"): if your dog escapes and Fi has cell signal, location updates push to the lost-pet map; other Fi owners with the app open see "lost dog in this area" alerts.

The crowd-sourced lost-pet network is interesting. Fi's claim is that the install base is large enough in major US cities that a lost dog would likely be near another Fi-equipped dog within minutes. Untested for me; I hope to never test it.

## Real battery life — the headline result

Marketing claim: **3 weeks**.
My measured: **14 days actual** on Atom (active 6-yr-old Lab, multiple walks daily, generally inside the geofence).

That's still **4-5× better than Whistle 3's real 3 days**. The LTE-M architecture is the differentiator.

Important nuance: the 14 days is at default sync intervals. If you set Fi to "high accuracy" mode (faster GPS polling), battery drops to ~7-8 days. The trade-off is the same as Whistle's, but the starting point is much higher.

Cold-weather test pending — Lithium chemistry hates winter; will see how Boston winters affect the number.

## App quality

Fi's app is well-designed:

- **Map view**: real-time location, geofence, history pin trail.
- **Activity view**: daily/weekly/monthly steps, classifications.
- **Leaderboard**: cross-Fi-owner activity comparison (ignored).
- **Lost Pet Mode**: one-tap escalation that alerts the local Fi community.
- **Multi-pet view**: Atom's profile + a placeholder for future pets.

What I want from a connected pet collar app, Fi delivers. Whistle's app (post-Mars-acquisition) has gotten worse over the past two years; Fi's is fresh-product polish.

## What Fi lacks vs Whistle

- **Less activity history** (Whistle has 5+ years of data on dogs; Fi just started).
- **No microchip integration** (neither does Whistle, but Whistle's marketing claims more).
- **No third-party integrations**. Fi has no official Home Assistant / IFTTT support. (Whistle had unofficial; Fi has nothing yet.)
- **The Lost Pet Network's density** isn't proven outside major cities. In rural areas it'd be useless.

## The migration from Whistle

Decommissioning Whistle has been satisfying. Atom's profile in Whistle is closed. Mars's grip on my dog's data is severed (well, mostly — they have 5 years of historical data still).

The annual cost difference:
- Whistle (Mars): $84/year subscription + Mars-owned data.
- Fi: $99/year subscription + independent company + (claimed) commitment to *not* be acquired by a pet-food giant.

Fi cofounders have said in interviews they've turned down Mars acquisition offers. Whether they'll continue to refuse — that's the long-term question.

## What I'm watching

- **Fi battery life over 6 months**. Li-ion degrades; will 14 days drop to 10 days in mid-2020?
- **Fi's funding sustainability**. They've raised $25M total to date. The cellular subscription is the revenue stream; works only if they don't get acquired.
- **Halo Collar**, which is rumored — GPS-fence concept I'm skeptical about. Will write when it ships.

## What's next

Year-end review for 2019. Petnet, Litter-Robot, Fi, and the slow rotation of dog-tracker leadership. Petnet's fate is the unwritten chapter.
