---
title: "Litter-Robot III Connect — first smart-litter device"
date: 2018-11-26T20:00:00-05:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - litter-robot
  - cat
  - wifi
notebook: pet-iot-field-guide
notebookOrder: 16
excerpt: "Whisker's Litter-Robot III Connect arrived. Self-cleaning + WiFi + iOS app. Joule has been side-eyeing the rotating spaceship. Notes on the mechanism, the sensor model, and what 'smart' means here."
pullquote: "Litter-Robot is the rare smart-pet device where the connected layer adds something the basic device cannot. A self-cleaning litter box is already great; one that tells you when the cat used it, how long, and what their weight is — that's medical-grade telemetry no other device delivers."
---

Litter-Robot III Connect arrived this month. $549 (pricey). The Connect version is Whisker's existing self-cleaning litter robot (which has been around since 2000-ish in some form) with WiFi added in 2017. Joule has been side-eyeing it for two weeks.

## The mechanism, briefly

The Litter-Robot is a rotating globe sitting on a base:

1. Cat enters the globe (sensors detect entry via weight).
2. Cat does their business.
3. Cat exits.
4. A 7-minute delay starts (give the litter clumps time to harden).
5. The globe rotates 90° — clumps slide into a separator screen.
6. Globe rotates back — clean litter settles back in the bowl.
7. Clumps fall into a sealed waste drawer underneath.

Empty the waste drawer once every 7-10 days for a single cat. Less hands-on than scooping daily.

## What "Connect" adds

The base model has been around for years; this is the connected version. The Connect features:

- **WiFi**: 2.4 GHz, joins my home network.
- **iOS / Android app**: status, history, manual cycle, troubleshooting.
- **Push notifications**:
  - Waste drawer full (when the internal weight sensor exceeds threshold).
  - Cycle complete.
  - Cat in the unit (real-time presence indication).
  - Mechanical errors (motor stall, sensor fault).
- **Cycle history log**: timestamp of every cycle.
- **Visit detection** (via weight): each entry/exit logged.

The hardware that enables this is just two additional sensors (weight + WiFi radio) on top of the existing mechanical platform. About $30 BOM addition. Whisker charges +$50 retail for the Connect version. Margins on connected upgrades.

## The data the Connect collects

Two weeks of use:

| Metric | Value |
|---|---|
| Average visits per day | 3.2 |
| Average visit duration | 64 seconds |
| Weight detected at entry | 9.4 lb (Joule weighed in at the vet 3 months ago at 9.5 lb — sensor accurate) |
| Cycles per day | 3.2 (matches visits) |
| Waste drawer "fill rate" | ~10% per day |

The weight sensor in the base reports the *delta* when the cat enters. Joule consistently weighs 9.4 lb according to the unit. The vet says 9.5 lb. The agreement gives confidence the weight number is real.

**For a multi-cat household, the weight + visit-duration combination would identify which cat used the unit.** I only have Joule today, so this is moot. But it's the foundation of multi-cat litter analytics that Petivity is building toward (the rumored Purina smart litter monitor coming in a year or two).

## The veterinary potential

This is where the connected litter box gets interesting beyond "convenient":

- **UTI / kidney issues**: cats with urinary problems often visit the litter box much more frequently (4-8 times per day vs the normal 2-4) and stay shorter (10-30 seconds vs 60-90). A sudden change in either pattern is a red flag for vet attention.
- **Diabetes screening**: increased urination volume and frequency (polyuria) is a classic diabetes presentation in cats. The litter box sees it first.
- **Inflammatory bowel issues**: changes in defecation frequency / duration.
- **Weight loss tracking**: ongoing weight via the entry sensor catches gradual loss (a major cancer / hyperthyroidism warning) earlier than annual vet visits.

In humans, you'd see your doctor for a routine annual checkup. In cats, the equivalent is the once-yearly vet visit — which often misses subtle trends because the data points are too sparse. A connected litter box tracks the data continuously.

**This is the first piece of pet IoT where the medical-data potential is real.** Not bark detection. Not activity scores. Litter-box analytics.

## What's missing in 2018

- **No vet-integration**. The data lives in Whisker's app; no export-to-vet feature, no integration with Banfield / VCA / vet-records systems.
- **No anomaly detection**. The app shows "visits this week: 22" but doesn't say "this is 30% higher than last month, consider vet attention."
- **No multi-cat identification yet** (I only have one cat, but this is the obvious gap for multi-cat homes).
- **No API**. Closed ecosystem. Same complaint as SureFlap.

The data is collected but the actionable layer doesn't exist. Whisker is a hardware company; the analytics layer is an opportunity for someone else (or for Whisker to acquire).

## Joule's adjustment

She was suspicious of the unit for 4 days. We left the old litter box next to it; she gradually switched over. By day 6 she was using the Litter-Robot exclusively. Two weeks in, no complaints.

The "cat acceptance" is non-trivial. Whisker's marketing claims 90% of cats adapt within a week. Sample size of one, but the claim held.

## What I'd want next

- **A version with per-cat identification** via weight + entry-pattern profiling. Critical for multi-cat households.
- **Anomaly detection** with threshold alerts ("Joule's visits dropped 40% this week — schedule a vet visit?").
- **HomeKit / HA integration**. I should be able to monitor litter-box state from my Home Assistant dashboard.
- **A way to export data** for vet records.

Whisker has been hinting at most of these. Maybe 2020.

## What's next

End-of-year review for 2018 in a month. The big story is whether Fi delivers when it ships next year + whether Petnet survives.
