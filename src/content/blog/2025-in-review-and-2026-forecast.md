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
excerpt: "The last year-in-review of the series, for now. SmartThings Edge drivers finally run local, the Bespoke kitchen and Frame TV genuinely cooperate, and the solar bet I'd talked myself out of three years running finally pencils out."
pullquote: "Seven and a half of eight on last year's forecasts — but the most useful line is the one I got wrong twice and finally reversed: the solar math, which I'd said no to three years running, flipped to yes."
cover: "../../assets/blog/2025-in-review-and-2026-forecast-cover.svg"
coverAlt: "A year-end ledger drawn as a forecast scorecard: a column of check marks and one half-filled mark beside a house glyph carrying a solar panel, a robot vacuum, and a local-voice waveform — the close of a thirteen-year notebook."
---

End of 2025, and the end of the year-in-review chain for this series — for now. After [thirteen years and fifty-odd posts](/blog/thirteen-years-on-long-arc-retrospective/) the smart-home stack has gone quiet in the best way, and a quiet stack doesn't need an annual report. So this is the last one of these for a while: how I did against last December's forecasts, what actually got built, and where I think the next interesting work is.

## Scoring last year's forecast

I grade these honestly every year. The point isn't to look good — it's to catch myself being optimistic, which the record says I am. These were the eight calls I made for 2025 last December.

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| SmartThings local-execution post | 95% | March — Edge drivers, finally credible | ✓ |
| Robots — Roomba + Braava routines | 90% | September post shipped | ✓ |
| Frame TV + appliance sync improves | 85% | Cross-device routines now routine | ✓ |
| Thirteen-year retrospective | 100% | November | ✓ |
| Matter camera support in products | 70% | Matter 1.4 ratified, spec has cameras — almost nothing shipping | ◐ |
| HA voice gets usable | 50% | Whisper Turbo + faster Piper — daily-driver, finally | ✓ |
| Solar + Powerwall reconsidered | 30% | Reconsidered — and this time the answer flipped to yes | ✗ |
| End-of-2025 review | 100% | This one | ✓ |

**7.5 / 8 ≈ 94%.** Higher than my usual band, and I don't fully trust it. Two of these were near-locks (the posts I'd already half-written), and a year where most of your calls land tends to be a year that was predictable rather than a year you read well.

The two interesting marks are the ones that aren't clean checks. The **Matter camera** call gets a half: the 1.4 spec ratified with camera support in it, exactly as I guessed, but the consumer products to use it still aren't really here — the same "spec arrives a year before the silicon" lag I keep flagging. And the **solar** call is an outright miss, which is the one I'm happiest about. I'd predicted, for the third year running, that the generator would keep winning the math and I'd pass again. The math finally tipped — better panel pricing, the battery incentives, and a time-of-use rate that punishes evening grid draw hard enough to matter — and I signed a contract in October. Getting a forecast wrong because reality got *better* is the good kind of wrong.

![2025's forecast scorecard: six clean checks (SmartThings Edge post, robots routine post, Frame TV appliance sync, the thirteen-year retrospective, HA voice now daily-driver, this review), one half mark for Matter cameras where the 1.4 spec shipped but products didn't, and one cross for solar where the prediction of 'no again' flipped to a signed contract — scored 7.5 of 8.](../../assets/blog/2025-review-forecast-scorecard.svg)

## What actually got built

Less new hardware than any year since the move, which is itself the headline — the house is saturated and most of 2025's work was at the edges rather than in the walls.

![A 2025 build timeline down a vertical spine: March, eight SmartThings Edge drivers running locally on the hub in Lua with no cloud round trip; April, a second Coral USB accelerator that dropped Frigate's inference latency; through the year, Home Assistant local voice crossing into daily-driver territory on a Pi 5 at about 1.2 seconds end to end; October, a solar and battery contract signed once the math finally tipped, install slated for Q1 2026; and December, an iRobot j7+ retiring the i7+. A note reads that this was less new hardware than any year since the move.](../../assets/blog/2025-review-build-timeline.svg)

- **Eight SmartThings Edge drivers**, written mostly to bridge HA-managed Z-Wave devices cleanly into the SmartThings view of the world. These run *on the hub*, in Lua, with no cloud round trip — the exact thing I left SmartThings to get back in 2017, now native. That migration is most of why the March post happened.
- **Six more Matter devices** — Eve Door & Window and Eve Motion sensors, a couple of Nanoleaf bulbs — all commissioned once and visible everywhere.
- **A second Coral USB accelerator** in April, which dropped Frigate's inference latency far enough that the camera notifications stopped lagging behind the actual person.
- **Year two of HA local voice**, and this is the one that crossed the line. Whisper Turbo on a dedicated Pi 5 over the Wyoming protocol, with the faster Piper voices, lands around 1.2 seconds end to end — fast and natural enough that the family actually uses it for "turn off the kitchen lights." A year ago I'd called local voice "the right idea, wrong execution." The execution caught up.
- **A solar + battery contract** signed in October, install slated for Q1 2026.
- **An iRobot j7+** in December — a Christmas treat-to-myself that retired the i7+ to a donation box. Better obstacle avoidance, and it stopped eating charging cables.

## What's working at year-end

Three things earned their keep this year, and they're all integration wins rather than new capabilities.

Multi-ecosystem cooperation is the quiet triumph: Apple Home, Google Home, SmartThings, and Home Assistant all see the same devices through the Matter bridges, each via its own commissioning, and after a decade of "wait, which app controls this bulb," that's worth more than any single gadget I bought. The voice split finally makes sense too — the Echos and Google speakers handle music, timers, and trivia, while HA voice owns smart-home control, so the thing that needs to stay in the house stays in the house and the thing that doesn't, doesn't. And two years in, the [new-house wiring](/blog/thirteen-years-on-long-arc-retrospective/) has needed exactly zero retrofits. The 42 Cat6 drops and the conduit I ran "just in case" have all gotten used. Wiring for the house you'll have in five years is the cheapest thing you'll ever do, and you can only do it once.

![The 2025 device topology: a Home Assistant orchestrator and a SmartThings hub running Edge drivers locally, both feeding four ecosystem views — Apple Home, Google Home, SmartThings, Home Assistant — through a Matter bridge layer so each app sees the same devices; HA local voice on a separate Pi handles control while commercial speakers handle music and timers, and the cloud sits to the side as optional rather than in the control path.](../../assets/blog/2025-review-device-topology.svg)

## Forecast for 2026

Standing rules: I keep these even when I get them wrong, because the misses reread better than the hits, and everything below is a guess made at the end of 2025 — forecast, not fact.

**1. Solar + battery install completes in Q1. (95%)** Already contracted; this is the safe one.

**2. An energy-management automation post. (90%)** Once the panels and battery are live, the cookbook — charge the EV off solar, run the big loads in the cheap window, lean on the battery through the expensive evening hours — earns its own write-up.

**3. An on-device AI assistant with real home context. (70%)** Apple Intelligence, Gemini Nano, or an HA-native local LLM answering "what's it cost to run the dryer right now" with actual house state behind it. The pieces are arriving; whether they cohere in 2026 is the open question.

**4. Matter cameras actually ship. (60%)** The spec's been ready since 1.4. Reolink, Eufy, and Eve are all rumored. I've marked this lower than last year precisely because I keep betting on the camera layer and it keeps slipping.

**5. A "smart home for kids" post. (80%)** As the kids age into wanting control of their own rooms, the interesting questions are about what we hand them and what we deliberately don't.

**6. ESPHome on every closed appliance I can reach. (60%)** The old Wi-Fi outlets, the dehumidifier, the air filter — a lot of cheap Wi-Fi gear is one flash away from being local and cloud-free.

**7. Generative dashboard design. (50%)** Lovelace dashboards that build themselves from how the house is actually used. Genuinely speculative; coin flip.

**8. A Matter bridge for the LoRa garden sensors. (75%)** Now that HA-as-Matter-bridge is mature, the long-tail outdoor sensors can finally join the same view as everything else.

## What I'm buying in 2026

Solar plus a battery, installed (low five figures after the federal and state credits). Matter cameras the moment any of them genuinely ship. A second piece of HA hardware as a cold-spare failover — the one box I never want to be without. And a device new enough to run an on-device assistant, so I can test the home-context queries from forecast #3 against a real house instead of a demo.

## What I'm done with

After 56 posts in this notebook, a few patterns are closing out. The year-in-review will keep going, but the deep technical posts get less frequent — most of the stack is stable, and you don't document plumbing that doesn't leak. Hardware shopping has mostly stopped; saturation hit around 2023, and from here it's replacements and the occasional new category, not a steady drip of boxes. The writing that's left is at the seams: AI meeting automation, energy meeting appliances, the cross-platform glue. That's the next decade's work, and it's more interesting than another bulb.

## What's coming next

The energy-management post once the panels are live, probably Q2. The on-device-AI experiment after that. And a cross-series piece tying this notebook to the [connected-products work](/notebook/connected-products/) — the same problems I solve in my own house, at product scale and with someone else's customers on the other end, which turns out to sharpen both.

Thanks for following along this year. The whole series lives on [the notebook page](/notebook/smart-home-iot-journey/), or you can start at [the very first post](/blog/philips-hue-gen-1-zigbee-light-link-debut/) — one Hue bulb, 2012 — and walk it forward.

Onto the next year.
