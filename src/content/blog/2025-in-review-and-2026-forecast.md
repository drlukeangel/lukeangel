---
title: "2025 review — Edge drivers local, robots choreographed"
date: 2025-12-28T17:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 56
excerpt: "Final year-in-review of the series, for now. SmartThings Edge drivers finally local. Frame TV + appliances genuinely cooperating."
pullquote: "Looking back: 6.5/8 on 2024's forecasts, ~82%. Steady. The series passes 50 posts. The smart home passes 250 devices. The arc continues."
---

End of 2025. End of the year-in-review chain for the series.

## Scoring the 2024 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| SmartThings Edge drivers post | 95% | March post shipped | ✓ |
| Robots — Roomba + Braava routines | 90% | September post | ✓ |
| Frame TV + appliance sync improves | 85% | Yes — cross-device routines now common | ✓ |
| Thirteen-year retrospective | 100% | November | ✓ |
| Matter camera support in some products | 70% | Matter 1.4 ratified; few products shipping | ✓ (partial) |
| HA voice gets usable | 50% | Whisper Turbo + Wyoming protocol + faster Piper voices — yes, daily-driver | ✓ |
| Solar + Powerwall reconsidered | 30% | Considered. Decided yes this time — installation Q1 2026 | ✓ |
| 2025 year-in-review post | 100% | This one | ✓ |

7/8 = **87.5%**. Best year since 2013 (83%). I'm getting better at this; or 2025 was a predictable year.

## What got added this year

- **Eight Edge drivers** I wrote for SmartThings (mostly to bridge HA-managed Z-Wave devices into the SmartThings ecosystem).
- **Six Matter devices**: Eve Door & Window sensors + Eve Motion + a couple of Nanoleaf bulbs.
- **A second Coral USB** (April) — Frigate inference latency dropped further.
- **HA Voice Assistant Year-2** — Whisper Turbo running on a separate Pi 5, latency ~1.2 sec, daily-driver quality for "turn off the kitchen lights" commands.
- **Solar consult + contract** (October) — installation Q1 2026.
- **An iRobot j7+** (December — Christmas treat-to-myself). Replaces the i7+ which got donated. Better obstacle avoidance.

## What works year-end

- **Multi-ecosystem cooperation.** Apple Home, Google Home, SmartThings, HA — all see the same devices via Matter bridges. No regrets.
- **HA voice for ambient commands.** The Echo + Google Home are still used for music + timers + general queries. HA voice handles smart-home control.
- **The PRD-style new-house wiring.** Two years post-move-in; not one retrofit needed. The 42 Cat6 drops + 12 conduits paid off.

## Forecast for 2026

**1. Solar + battery installation completes Q1. (Confidence: 95%)** Already contracted.

**2. Energy-management automation post. (Confidence: 90%)** Once solar's installed, the automation cookbook for "charge EV when solar generates" + "run appliances during off-peak" + "use battery during expensive grid hours" gets its own post.

**3. AI assistant on-device with home context. (Confidence: 70%)** Apple Intelligence, Google's Gemini Nano, or HA-native solution with a local LLM. "What's the energy cost if I run the dryer now?" type queries. Coming.

**4. Matter cameras at scale. (Confidence: 75%)** Matter 1.4 spec includes cameras. Reolink + Eufy + Eve all rumored to ship.

**5. A "smart home for kids" post. (Confidence: 80%)** As the kids age into smart-home autonomy (controlling their own room, etc.), what we let them control, what we don't.

**6. ESPHome firmware on every closed-source appliance I can get on. (Confidence: 60%)** Custom firmware on old WiFi outlets, the dehumidifier, the air filter. Many cheap WiFi devices are hackable to ESPHome.

**7. Generative AI for dashboard design. (Confidence: 50%)** Lovelace dashboards generated based on usage patterns. Speculative.

**8. The year I finally write a Matter bridge for the LoRa garden sensors. (Confidence: 75%)** Now that HA-as-Matter-bridge is mature.

## What I'm buying in 2026

- Solar + Tesla Powerwall 3 (~$45k installed, partial federal/state credits).
- Eufy or Reolink Matter cameras when they ship.
- A second HA hardware (HA Green, $99) for failover.
- An Apple Intelligence-capable iPhone for testing on-device LLM home queries.

## What I'm done with

After 56 posts in this series:

- **The year-in-review pattern continues** but the technical posts will be less frequent. Most of the smart-home stack is now stable; the interesting work is at the edges (AI integration, energy management).
- **Less hardware shopping.** Saturation hit around 2023. Replacements + occasional new categories only.
- **More cross-platform integration content.** Apple Intelligence + HA, energy + appliances, AI + automation — the next decade's writing.

## What's coming next on the blog

- The energy-management post (Q2 2026).
- The on-device AI experiment post (Q3 2026).
- A cross-series post bridging this notebook with the [v2 connected products work](/notebook/connected-products/) — same problems at different scales.

For 2025: thanks for following. The full series is at [the notebook page](/notebook/smart-home-iot-journey/). Or start at the [first post](/blog/philips-hue-gen-1-zigbee-light-link-debut/) and walk forward.

Onto the next year.
