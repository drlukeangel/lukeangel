---
title: "2018 review — quiet year, Zigbee goes local, the doorbell got scary"
date: 2018-12-27T16:00:00-05:00
category: tools
tags:
  - smart-home
  - year-in-review
  - forecast
notebook: smart-home-iot-journey
notebookOrder: 26
excerpt: "The sparsest year of the journal — exactly as forecast, because the day job became a connected medical device. But the house still moved local-first: Node-RED gave the automations a brain, an MQTT broker gave them a nervous system, and a $40 ConBee stick freed the Zigbee mesh from the cloud. 2018's forecast scored 80%."
pullquote: "A quiet year on the blog was a busy year in the closet. Three posts, but the architecture moved further toward local-first in 2018 than in the three years before it combined."
cover: "../../assets/blog/2018-in-review-quiet-year-zigbee-goes-local-cover.svg"
coverAlt: "A house with three local-first pieces fitted inside it: a Node-RED flow glyph (the brain), an MQTT publish-subscribe bus bar (the nervous system), and a ConBee USB stick with antenna waves (the local radio), plus a green all-local status light on the door. Off to the side floats a single blog page with just three small marks beside it — the three posts of a quiet year, against a year of deep architectural progress."
---

End of 2018. The quietest year here since 2012 — and I called it.

## Scoring the 2018 forecast

| Prediction | Confidence | Outcome | Verdict |
|---|---|---|---|
| Zigbee comes off the SmartThings hub onto a dedicated coordinator | 60% | [ConBee + deCONZ in October](/blog/conbee-deconz-zigbee-off-the-smartthings-hub/) | ✓ |
| Complex automations move off YAML to a flow tool | 65% | [Node-RED, February](/blog/node-red-flows-automations-yaml-couldnt-handle/) | ✓ |
| Smart-home camera category consolidated by a big acquirer | 55% | [Amazon bought Ring](/blog/amazon-buys-ring-surveillance-doorbell-threat-model/) in February | ✓ |
| MQTT becomes the house's internal message bus | 50% | [Mosquitto broker, alongside Node-RED](/blog/node-red-flows-automations-yaml-couldnt-handle/) | ✓ |
| Posts slow to ≤ 3 for the year | 80% | Three posts. Hello. | ✓ |

5/5 ≈ **100%** — but the honest read is that several of these were within my control, so it's less "good forecasting" than "I did the things I planned." The Ring acquisition was the only outside call.

![Grading the 2018 forecast: five green checks. Four of them — Zigbee onto a coordinator I own, complex automations off YAML, MQTT as the message bus, posts slowing to three or fewer — are each tagged "within my control." The fifth, a big acquirer consolidating cameras (Amazon buying Ring), is tagged "the one real outside call." A caption notes five for five, but four were things I planned to do rather than things I foresaw — only Ring was a genuine forecast.](../../assets/blog/2018-review-forecast-scorecard.svg)

## What changed in 2018

Three moves, each pushing the same direction — local-first:

- **[Node-RED](/blog/node-red-flows-automations-yaml-couldnt-handle/)** (Feb) — the automations got a brain that can hold state, and a visual debugger I trust.
- **[MQTT broker](/blog/node-red-flows-automations-yaml-couldnt-handle/)** (Feb) — the house got a nervous system. Everything publishes; anything can subscribe.
- **[ConBee + deCONZ](/blog/conbee-deconz-zigbee-off-the-smartthings-hub/)** (Oct) — the Zigbee mesh came off the SmartThings cloud-bridge onto a coordinator I own.

And one move I *didn't* make but thought hard about: **Ring**. [Amazon's acquisition](/blog/amazon-buys-ring-surveillance-doorbell-threat-model/) crystallized why I keep cameras local. Didn't buy one. Won't.

![The three 2018 moves converging on the house. On the left, three cards: Node-RED (the brain, February), an MQTT bus (the nervous system, February), and a ConBee USB stick (the local radio, October). Arrows from all three converge on a house on the right with a green status light, labelled "about 80% server-independent." A caption notes a brain, a nervous system, and a radio it owns — all pulling the house off the cloud.](../../assets/blog/2018-three-local-first-moves.svg)

## What worked

- **The MQTT bus.** Watching `home/#` scroll by is still the clearest window into what the house is actually doing. Adding a device is now "point it at the broker," not "rewire the integrations."
- **Aqara sensors on deCONZ.** They drop constantly on SmartThings and behave perfectly on a local coordinator. Cheap, reliable, mine.

## What didn't

- **Z-Wave is still on the SmartThings hub.** The migration I keep deferring. The hub now exists almost entirely to be a Z-Wave radio, which is an expensive antenna.
- **Documentation debt.** Three posts means a year of changes that live only in git commit messages and my memory. The day job won that trade, but the journal suffers.

## The day-job thread

For the record on why it was quiet: I spent 2018 building a **connected medical device** — BLE, phone-as-gateway, a compliance surface that makes "move fast" illegal. It's the most relevant work I've ever done to this hobby, and the least time I've ever had for the hobby because of it. The patterns cross-pollinate constantly: the [MQTT event bus at home](/blog/node-red-flows-automations-yaml-couldnt-handle/) is the same shape as the telemetry pipeline at work, just without the auditors.

## Forecast for 2019

| # | Prediction | Confidence |
|---|---|---|
| 1 | Z-Wave finally comes off the SmartThings hub | 55% |
| 2 | A major cloud platform kills a beloved integration, proving the local-first thesis | 65% |
| 3 | MQTT becomes the *primary* integration path, not a side bus | 60% |
| 4 | Posts stay ≤ 3 (day job runs through 2019) | 75% |
| 5 | The house survives at least one more cloud outage untouched | 70% |

## What's next

Z-Wave off the hub — for real this time. And I have a suspicion that 2019 is the year some big platform unceremoniously kills an integration thousands of people depend on, and everyone re-learns the lesson I've been writing down since 2017. The house is ready for it. Most aren't.

Six years in. Quietest year yet, most architectural progress yet. Local-first is no longer the goal — it's most of the way to being the default.
