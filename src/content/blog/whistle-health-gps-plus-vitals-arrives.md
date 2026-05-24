---
title: "Whistle Health & GPS Plus — vet vitals on a consumer collar"
date: 2021-08-26T17:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - whistle
  - vitals
  - veterinary
notebook: pet-iot-field-guide
notebookOrder: 26
excerpt: "Whistle Health & GPS Plus shipped — first consumer collar with temperature, heart-rate, scratching, licking, drinking. Mars-owned but first to cross into vet-grade telemetry."
pullquote: "A collar that measures heart rate, respiratory rate, scratching, and licking is no longer a fitness tracker. It's a continuous-monitoring medical device — which Whistle carefully doesn't call it, because the FDA category for animal-medical-device is a different regulatory beast."
cover: "../../assets/blog/whistle-health-gps-plus-vitals-arrives-cover.png"
coverAlt: "Whistle Health & GPS Plus — vet vitals on a consumer collar"
---

Whistle Health & GPS Plus shipped in June. I held off until August to read reviews. Bought one for Atom in late August — the first collar I've put on him since [decommissioning the Whistle 2 in 2018](/blog/2018-pet-iot-year-in-review/) and replacing with [Fi](/blog/fi-ships-first-units-atom-first-non-mars-tracker/).

This isn't a fitness tracker. It's the first consumer collar with vet-grade physiological sensors.

## The sensor set

Whistle Health & GPS Plus measures, continuously:

- **Activity** (accelerometer, same as previous Whistles).
- **Temperature** (skin-contact thermistor — measures via the collar's underside against the dog's neck).
- **Resting heart rate** (photoplethysmography — PPG, the same green-LED technique smartwatches use).
- **Resting respiratory rate** (chest expansion detected via accelerometer Z-axis).
- **Scratching** (accelerometer pattern recognition).
- **Licking** (accelerometer pattern recognition).
- **Drinking** (accelerometer + tilt pattern).

The PPG heart rate is the interesting one. PPG on a dog's neck (under fur, with a thicker scalp) is *much* harder than on a human wrist. Whistle's claim is they've calibrated it for a range of breeds + coat types. Reviews are mixed; my own data has been... noisy.

## How vitals are extracted

The sensor model uses time-of-day to find quiet periods:

- Heart rate: measured during long stationary periods (Atom napping). Aggregated to "resting heart rate per hour" — not real-time.
- Respiratory rate: same approach; needs the dog to be very still.
- Temperature: measured continuously; reported as "skin temp" not "core temp." Useful for trend, not for "is the dog feverish" (skin temp is several degrees lower than core).

The vitals are **trend metrics**, not real-time. The collar doesn't fire an alert if heart rate spikes momentarily. It looks for sustained changes over hours-to-days.

## My first month's data

Atom's resting numbers, per Whistle:

- Heart rate: 78 bpm avg (normal Lab adult: 60-100; he's mid-range).
- Respiratory rate: 22 breaths/min (normal: 10-30; he's mid-range).
- Skin temperature: ~36.8 °C (varies seasonally; normal core for dogs is 38.3-39.2 °C, skin reads 1-2 degrees lower).
- Scratching: 4-7 events/day (no excessive itching, healthy baseline).
- Licking: 12-18 events/day (normal grooming).
- Drinking: 6-9 events/day (normal hydration).

Everything within normal range for an 8-year-old Lab. The baseline is established; the value is detecting *changes* from baseline.

## When the vitals would matter

The use case Whistle pitches is **early disease detection**. Examples they cite:

- **Skin allergies**: scratching frequency 4x normal for 3+ days → vet visit.
- **Cardiac issues**: resting heart rate elevated 20%+ for a week → vet visit.
- **Respiratory infection**: respiratory rate elevated + temperature trending up → vet visit.
- **Diabetes**: drinking frequency 2-3x normal → vet visit.

The pitch is sound. The execution depends on how well Whistle's sensor calibration actually works in the field. My read: probably 70-80% accurate for major signals, mediocre for subtle ones. The PPG-on-collar heart rate especially is sensor-noisy.

## The medical-device question

Whistle's marketing carefully calls this **"wellness monitoring"** — not "medical monitoring." Reason: in the US, FDA regulates **animal medical devices** under a different framework than the FD&C Act's human-medical-device framework. The line is roughly:

- **Wellness device**: tracks activity/lifestyle. Not regulated as a medical device. Whistle's category.
- **Diagnostic device**: claims to detect/diagnose a specific medical condition. Regulated.

By avoiding diagnostic claims and framing everything as "trends to discuss with your vet," Whistle stays out of FDA scope. Smart play. The data is what matters, not the claim.

## The Mars-ownership concern, revisited

Whistle is still Mars-owned. The vitals data flows to Mars's analytics. The implications:

- **Mars now has continuous physiological data on millions of dogs**. Cross-referenced with food purchase data, this is a market research dataset of unprecedented richness.
- **Recommendation conflicts persist**. The app suggests "Royal Canin for elevated stress markers" — Mars-owned product. Same conflict as 2016.
- **Vet integration is Mars-flavored**. Whistle's "share with your vet" feature works best with Banfield (Mars-owned vet network).

I'm using Whistle Health & GPS Plus for the vitals data. I'm ignoring its recommendations. Same posture as before, more data flowing now.

## How I integrate it

Whistle Health & GPS Plus + Fi simultaneously on Atom:

- Fi for GPS + activity (more reliable battery, no Mars).
- Whistle for vitals (no other consumer collar measures these).

Two collars on one dog. Awkward. The right product would be a single collar that does both — vitals + GPS + LTE-M, no Mars ownership. Doesn't exist.

## What's next

Going to log Atom's vitals for 6 months to establish a real baseline, then see if Whistle's anomaly detection catches anything. The skeptical part of me expects to find false-positive noise. The hopeful part expects to find at least one true signal that an annual vet visit wouldn't have caught.

Either way, the next-gen of pet IoT is here. Vet-grade telemetry on consumer hardware. The data ownership question gets sharper.
