---
title: "Petivity smart-litter — multi-cat analytics, Purina-built"
date: 2022-10-08T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - petivity
  - cat
  - multi-cat
notebook: pet-iot-field-guide
notebookOrder: 30
excerpt: "Petivity Smart Litterbox Monitor shipped March; bought in July. Sits under any litter box. Reads weight + visit duration + frequency. Multi-cat aware. Purina-built — same conflict as Mars/Whistle."
pullquote: "Petivity is built by Purina to find UTI signals and feed-them-back-to-Royal-Canin-recommendations. The signal is real. The recommendation layer is the conflict. The data is worth the conflict if you ignore the recommendations."
cover: "../../assets/blog/petivity-smart-litter-multi-cat-analytics-cover.png"
coverAlt: "Petivity smart-litter — multi-cat analytics, Purina-built"
---

Petivity Smart Litterbox Monitor shipped in March 2022; bought one in July for evaluation. It's a smart base that sits under any existing litter box — agnostic to the box type. Weight sensor + visit detection + multi-cat profiling.

Made by **Purina** (Nestlé-owned). Same data-ownership-conflict shape as Mars-owned Whistle. Different brand.

Three months in.

## What Petivity is

**Hardware:**
- A flat plastic base, ~50×40 cm, ~3 cm tall.
- 4 weight sensors at the corners.
- WiFi 2.4 GHz, AC-powered.
- No litter mechanism — you place a regular box (or Litter-Robot, or whatever) on top.

**Software:**
- iOS / Android app.
- Multi-cat profile setup (enter each cat's weight; app builds the per-cat identification model).
- Visit logs per cat: timestamp, weight, duration.
- "Wellness signals": frequency / duration anomaly detection.
- Cloud-based ML for the multi-cat attribution.

**Service model:**
- $149 hardware + **$5.99/month subscription** for the wellness analytics. Without subscription, you get visit logs but no anomaly detection.

The subscription is doing the heavy lifting. Petivity is selling analytics-as-a-service on top of a fairly simple weight scale.

## The multi-cat profiling

The interesting differentiator vs Litter-Robot is **explicit multi-cat profiling**. You enter Joule's weight (9.5 lb) and Boson's weight (now ~9.0 lb after a year-plus of growth — they're converging).

Petivity's ML uses:
- **Entry weight** (primary signal).
- **Visit duration distribution** per cat.
- **Time-of-day patterns** per cat.
- **Sequence patterns** (cat-after-cat consistency).

With two cats at similar adult weight, the model has to use the secondary signals. It claims **92% attribution accuracy** in their docs.

My measured accuracy after three months (comparing Petivity's per-cat attribution against my [Litter-Robot weight-based analytics script](/blog/litter-robot-multi-cat-detection-weight-attribution.md)):

- **Agreement rate**: 87%. Of 410 visits, 357 attributed identically.
- **Disagreement**: 53 visits. About half are "Petivity says Joule, my script says Boson" or vice versa.

87% is good but not amazing. For weight-similar cats, neither approach is definitive. The right answer would be RFID-based identification (microchip read at entry); Petivity doesn't ship that.

## The wellness signals

Petivity claims to detect:

- **UTI risk**: frequency increases + visit-time changes.
- **Kidney issues**: persistent weight loss + frequency increase.
- **Diabetes**: polyuria (volume + frequency).
- **Constipation**: long duration + low frequency.
- **General "concern" indicators**: deviation from baseline by 30%+.

Three months in:
- One alert fired: "Boson's visits trending high" — turned out to be coincident with us switching litter brands; she was investigating the new substrate. False positive.
- One I caught manually: Joule had two visits >120 sec each in one day. Investigated; she was hairballing. No vet visit needed. (Petivity didn't flag this; my own eyeballs did.)

The signal quality is reasonable. Slightly more sensitive (more false positives) than I'd like. The alerts are framed as "consider vet attention" not "your cat is sick" — appropriate hedging.

## Petivity vs Litter-Robot Connect, side by side

Three months of both running (Petivity sits under a regular litter box; Litter-Robot is the cleaning unit). The cats use both.

| | **Litter-Robot III Connect** | **Petivity** |
|---|---|---|
| Hardware role | Self-cleaning box | Multi-cat scale |
| Visit logging | Yes | Yes |
| Weight per visit | Yes | Yes |
| Per-cat attribution | None native (CSV + script) | ML-driven, native |
| Anomaly detection | None | Yes (subscription) |
| Vendor | Whisker (independent) | Purina (Nestlé) |
| Subscription | None | $5.99/mo |
| HA / API integration | Unofficial only | None |

Petivity's per-cat ML attribution is genuinely useful for multi-cat households. Litter-Robot's hardware mechanism is genuinely useful for not-scooping-the-box-daily. They're complements, not competitors. I'm keeping both.

## The Purina-ownership concern

Same as Mars-owned Whistle: Petivity exists in part because Purina wants to identify cats with health concerns who could benefit from **prescription diet recommendations** — which is a Purina product line (Pro Plan Veterinary Diets).

The app suggests, when wellness signals fire:
- "Boson's pattern suggests increased water consumption. Consider a urinary-health diet."
- (Recommendation: Pro Plan UR Urinary Ox/St — Purina-owned.)

The recommendation layer is biased. Same pattern as Whistle. Ignore the recommendations; use the data.

## What the right product would look like

If I were designing this:

- Petivity's hardware (multi-cat scale + cloud analytics).
- WITHOUT vendor-aligned diet recommendations.
- WITH explicit "consult your vet, here's the trend data to show them" framing.
- WITH RFID reader at the box entry (would solve attribution definitively).
- WITH HA / API integration so the data lives in my home automation, not Purina's cloud.

None of those features are commercially incentivized. Vet recommendations don't sell anything; vendor-aligned ones do. Open APIs reduce ecosystem lock-in. RFID adds $5 BOM that hardware vendors don't want.

The product I want doesn't exist. The product I have works 80% of the way there.

## What's next

Year-end review for 2022. Big year: Quark arrived, Petivity + Halo evaluated, full Bespoke kitchen ordered for 2023. The cat-IoT category finally mature.
