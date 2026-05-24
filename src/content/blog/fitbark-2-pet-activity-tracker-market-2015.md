---
title: "FitBark 2 — pet activity tracker market in 2015"
date: 2015-09-15T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - whistle
  - fitbark
  - ble
  - activity
notebook: pet-iot-field-guide
notebookOrder: 6
excerpt: "FitBark 2 shipped this summer. Bone-shaped, brightly colored, BLE-only. Tested on Atom alongside Whistle. Notes on what's different, the sensor model, and whether competition improved either."
pullquote: "Two activity trackers on one dog's collar for a week. The accelerometers agree on broad strokes. They disagree on the details. The details are where the marketing claims live."
cover: "../../assets/blog/fitbark-2-pet-activity-tracker-market-2015-cover.png"
coverAlt: "FitBark 2 — pet activity tracker market in 2015"
---

FitBark 2 shipped this summer — bone-shaped (yes), brightly colored, $69. Backed the Kickstarter in 2013, took two years to ship, finally landed. Bought one and put it on Atom's collar next to his Whistle for a week-long side-by-side.

## The hardware comparison

| | **Whistle Activity Monitor v2** | **FitBark 2** |
|---|---|---|
| Form factor | Aluminum puck, 30 g | Bone-shaped plastic, 8 g (lighter) |
| Radio | BLE 4.0 + Whistle base station | BLE 4.0 + phone direct (no base station) |
| Battery | Rechargeable, ~7-10 days | CR2032 coin cell, ~6 months |
| Subscription | None | None |
| Price | $129 + base station included | $69 standalone |
| Water rating | IP65 | IP67 (better) |

The biggest architectural difference: **FitBark talks BLE to your phone directly**. No base station. Range is therefore limited to the phone's BLE range (~10 m) — and the sync happens when you're physically near your dog with the app open.

Whistle's base station model means the dog can be away from your phone (you at work, dog at home) and Whistle still uploads via the base station's WiFi. **FitBark requires phone-in-range to upload anything.**

The trade-off: FitBark's coin-cell battery lasts 6 months unattended (no charging cradle needed). Whistle needs weekly recharging.

## The data comparison — same dog, same week

I put both devices on Atom's collar for seven days. Same dog, same activities, two different opinions.

**Daily activity minutes:**

| Day | Whistle | FitBark |
|---|---|---|
| Mon | 78 min | 92 min |
| Tue | 110 min | 124 min |
| Wed | 65 min | 73 min |
| Thu | 95 min | 108 min |
| Fri | 82 min | 95 min |
| Sat | 145 min | 167 min |
| Sun | 130 min | 148 min |

**Trends agree perfectly.** Saturday and Sunday were higher (longer walks). Wednesday was the low day (rainy, less outdoor time). Both devices saw the pattern.

**Absolute numbers disagree by ~15-20%.** FitBark consistently reports more activity minutes than Whistle. This isn't because one is more "accurate" — they're using different thresholds for what counts as "activity." FitBark's threshold is more lenient (a casual walk counts more).

Practically: both work for trend tracking; neither should be trusted as an absolute measure. If you tell your vet "Atom does 100 minutes of activity per day," that's a useful relative number, but it depends on which device you used.

## The behavioral classification — where the differences matter

Both devices categorize activity into bins:

**Whistle's bins:** Rest, Active (walk), Play (vigorous).
**FitBark's bins:** Sleep, Rest, Active, Play.

FitBark's extra "Sleep" bin is useful. Whistle treats nap-rest and night-sleep as the same thing. FitBark distinguishes them based on duration + accelerometer pattern.

For an 18-month-old Lab, "did the dog sleep enough at night?" is a useful piece of info that Whistle just doesn't surface.

## The phone app comparison

Both apps are functional. Both have a calendar view, a "today" view, a friends/social feature, and goal-setting.

**FitBark's social feature** is the "BarkPoint" — a normalized activity number across breed + size + age, so you can compare your Lab to someone else's Beagle. Cute. Doesn't change anything in my behavior.

**Whistle's social feature** is the "Whistle Pack" — basically the same thing with a different name.

Both pretend friend-comparison matters. It doesn't.

Where the apps *actually* differ: FitBark exposes a **public API**. You can hit `https://app.fitbark.com/api/v2/...` with an OAuth token and get raw daily activity data in JSON. Whistle's API is unofficial — reverse-engineered by hobbyists, can break at any time.

I migrated my home-server activity logging from the Whistle scrape to FitBark's official API last weekend. Cleaner.

## The "no base station" tradeoff in practice

FitBark's no-base-station design has consequences I didn't think about up front:

- **Atom at home, me at the office**: FitBark doesn't sync. Data accumulates on the device. When I come home and open the app, a week's worth of data uploads in 30 seconds.
- **Whistle**: Continuous sync via the home base station. I can check Atom's activity from work.

For my use case, the lag isn't critical. For a worried owner who wants real-time data, Whistle's base station model wins.

## Where each fits in 2015

**Whistle** wins when:
- You want continuous data while you're away from home.
- You don't mind weekly recharging.
- You care about the base station's "Atom is home" signal as a proxy for the dog being present.

**FitBark** wins when:
- 6-month battery life beats weekly charging for you.
- You want the cheaper option ($69 vs $129).
- You're OK with sync-when-near-phone.
- You want an official API (this matters to me, may not to everyone).

I'm keeping both for now. Atom wears the FitBark daily; Whistle is the "long-term archive" with the more-conservative activity numbers.

## What's coming

Whistle has been hinting at a **GPS-enabled** product for the holidays. Rumors are it'll combine the activity tracker with cellular GPS, eat the Tagg market position. Pricing supposedly $129 + monthly subscription. If true, that's the "convergence" I [predicted in 2013](/blog/tagg-vs-whistle-cellular-vs-ble-base-station/).

Going to write that one up when it ships, hopefully before year-end. And there are rumors of a **Whistle / Mars** partnership — Mars Petcare is the giant food company, has dabbled in pet tech via investments, might be making a bigger play. Watching.

For now: two trackers on one dog, both broadly agreeing, both with their own quirks. Competition has not yet improved either; it's mostly given each a reason to chase the same features.
