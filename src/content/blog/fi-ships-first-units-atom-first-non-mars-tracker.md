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
cover: "../../assets/blog/fi-ships-first-units-atom-first-non-mars-tracker-cover.svg"
coverAlt: "A cellular GPS tracker puck seated on a dog collar with a metal locking ring, a faint satellite-and-signal halo above it — a self-contained LTE-M pet tracker."
---

Fi announced back in March and the Series 1 finally started reaching waitlists this fall. Bought one for Atom — the first cellular tracker on him since I [shelved his Whistle 3 last year](/blog/2018-pet-iot-year-in-review/), when the battery degraded past usefulness and I decided to wait rather than re-up with Mars. Two weeks of use, and this is the first dog tracker I've been genuinely happy with.

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
5. Configure subscription — **$149 hardware + $99/year**. That's more up-front than Whistle's puck and a higher annual than Whistle 3's ~$84/year, but you're paying for hardware that lasts the day instead of needing a charge before dinner.
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

![How Fi's Lost Pet Mode works versus the device's own cellular fix. Normally the collar gets its own GPS location and reports it over LTE-M — that works anywhere there's cell signal. Lost Pet Mode adds a second path: when a dog is flagged lost, nearby Fi collars whose owners have the app open relay sightings to the lost-pet map. The crowd-sourced layer only helps where Fi density is high — useful in a dense city, near-useless in a rural area.](../../assets/blog/fi-lost-pet-network.svg)

## Real battery life — the headline result

Marketing claim: **up to three months** — but read the fine print, and that number is for a dog that mostly sits at home in Wi-Fi range, with the cellular and GPS radios barely waking up.
My measured: **14 days actual** on Atom (active 6-yr-old Lab, multiple walks a day, in and out of the home geofence).

Fourteen days is well short of the headline "months," and I'd push back on Fi for marketing the best case. But it's still **4-5× better than Whistle 3's real 3 days** — and the gap is the whole story. The LTE-M architecture is the differentiator: a radio designed for a water meter that phones home occasionally, not a phone that's always live.

![Why Fi's battery lasts where Whistle's didn't. Whistle 3 used a 2G/3G modem that stays in a high-power always-listening state, draining a small battery in about three days. Fi uses an LTE-M (Cat-M1) modem that supports power-saving and extended-idle modes — it sleeps deeply between brief check-ins, drawing a fraction of the power, so the same job stretches to roughly two weeks on an active dog. The radio's idle behaviour, not the GPS chip, is what sets the battery life.](../../assets/blog/fi-ltem-power-budget.svg)

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

The cost picture, honestly:
- Whistle (Mars): ~$84/year subscription + Mars-owned data + a battery I had to babysit.
- Fi: $149 up front, $99/year subscription + an independent company + a battery I check weekly instead of nightly.

So Fi is the *more* expensive choice on paper — higher device price, higher annual. I'm paying for two things the spreadsheet doesn't capture: a battery that actually lasts, and not handing my dog's location history to the company that owns his food.

Fi cofounders have said in interviews they've turned down Mars acquisition offers. Whether they'll continue to refuse — that's the long-term question.

## What I'm watching

- **Fi battery life over 6 months**. Li-ion degrades; will 14 days drop to 10 days in mid-2020?
- **Fi's funding sustainability**. They've raised $25M total to date. The cellular subscription is the revenue stream; works only if they don't get acquired.
- **Halo Collar**, which is rumored — GPS-fence concept I'm skeptical about. Will write when it ships.

## What's next

Year-end review for 2019. Petnet, Litter-Robot, Fi, and the slow rotation of dog-tracker leadership. Petnet's fate is the unwritten chapter.
