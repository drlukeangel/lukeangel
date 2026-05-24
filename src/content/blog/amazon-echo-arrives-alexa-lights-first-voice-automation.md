---
title: "Amazon Echo arrives — Alexa, lights, first voice automation"
date: 2014-12-04T18:00:00-05:00
category: tools
tags:
  - smart-home
  - alexa
  - voice-assistant
  - echo
notebook: smart-home-iot-journey
notebookOrder: 10
excerpt: "Amazon launched Echo on November 6 as Prime-only invitation pre-order. Mine arrived this week. Notes on what voice control actually does and doesn't do in 2014."
pullquote: "Voice as a control surface fundamentally changes what 'smart home' means. The pain point was never the protocol; it was getting your phone out."
cover: "../../assets/blog/amazon-echo-arrives-alexa-lights-first-voice-automation-cover.png"
coverAlt: "Amazon Echo arrives — Alexa, lights, first voice automation"
---

Amazon Echo launched November 6, 2014 — Prime-only invitation pre-order at $199 ($99 for Prime members). I got in on the early wave; the device arrived Tuesday.

It's the first time I've controlled lights with my voice. That's not a small thing. Notes on the technical bits underneath, plus what's missing.

## What the Echo actually is

Hardware:

- **Texas Instruments DM3725** SoC (ARM Cortex-A8, 1 GHz, 256 MB RAM, 4 GB flash).
- **Seven-microphone circular array** with beamforming. This is the key. The array detects sound source direction and applies acoustic echo cancellation — that's how Echo hears "Alexa" while playing music at moderate volume.
- WiFi 802.11n + Bluetooth 4.0 + a hidden Ethernet input (via wall adapter, not in the box).
- 2.5" woofer + 2" tweeter. Audio is decent but not great.

Architecture:

- **Local wake-word detection.** A dedicated low-power DSP on the device runs the wake-word model for "Alexa" (or alternates "Amazon" / "Echo" / "Computer"). The DSP is small enough that this runs continuously without draining the wall adapter.
- **Cloud-streamed ASR + NLU.** Once wake word fires, the device starts streaming audio to AWS for actual speech recognition (Amazon's own ASR pipeline, not Nuance) + natural-language understanding.
- **LED ring for state.** Blue rotating = listening, white = volume change, yellow = notification, red = mic muted. Useful feedback when speech parsing isn't.

The whole listening path:

```
user says "Alexa, turn off the living room lights"
  ↓
  on-device wake-word DSP detects "Alexa" (~50 ms after the syllable)
  ↓
  LED ring lights blue, device starts streaming audio to AWS
  ↓
  AWS ASR transcribes audio in real-time
  ↓
  Amazon's NLU classifies intent: SmartHomeControl, action=TurnOff, device="living room lights"
  ↓
  Echo's smart-home integration looks up "living room lights" in the user's linked Hue account
  ↓
  Amazon calls Meethue API: PUT /groups/<living-room-id>/action {"on": false}
  ↓
  Meethue forwards to user's Hue bridge over its persistent connection
  ↓
  bridge multicasts Zigbee command to the group
  ↓
  bulbs turn off
  ↓
  Echo says "OK" (or, if confident, no audio response)
```

End-to-end latency: 1-3 seconds for Hue, 4-7 seconds for anything that crosses Amazon cloud → vendor cloud → device.

## What it does in December 2014

Out of the box, no integrations:

- Music (Amazon Prime Music + Pandora + iHeartRadio).
- Timers, alarms, reminders (one timer at a time — multi-timer comes later).
- News briefings ("Alexa, what's the news?").
- Weather.
- Wikipedia facts.
- Shopping list ("Alexa, add milk to the list" — syncs to Amazon app).

With the Hue integration (via Alexa app, OAuth-linked to Meethue):

- "Alexa, turn off the living room lights."
- "Alexa, dim the kitchen to 50 percent."
- "Alexa, turn on Reading scene." (works with named Hue scenes — discovered via Meethue's `/scenes` endpoint).

That last one is the moment that crossed a threshold for me. **Voice + scene is the new primitive.** The smart home becomes something you talk to rather than something you tap.

## What it can't do (yet)

- **No Wemo integration.** Belkin will publish an Alexa skill in early 2015. Not yet.
- **No SmartThings integration.** Same — coming early 2015.
- **No Lutron Caseta.** Coming 2015 as well.
- **No custom skills.** The Alexa Skills Kit (ASK) for third-party developers ships mid-2015. Everything in 2014 is hardcoded Amazon integrations.
- **No multi-room voice.** One Echo per house. You can't have two Echoes in adjacent rooms without both responding to the same command. Amazon will presumably figure out device arbitration eventually; today, one Echo is the answer.
- **No follow-up questions.** Each command is a fresh transaction. "Alexa, turn off the living room lights — and the kitchen too" — the second part is ignored.
- **No conditionals via voice.** No "Alexa, if anyone's home, turn off the porch light." State is in SmartThings; voice can't see it.

## The Skills architecture (announced, coming 2015)

From what Amazon's published: Skills will be Alexa's equivalent of mobile apps. A Skill defines:

- **Invocation name**: "open garage door."
- **Intents**: parameterized actions ("close the garage door" with optional slot "in 5 minutes").
- **Sample utterances**: many variations of the same intent for ASR matching.
- **Cloud endpoint**: where Alexa POSTs the parsed intent — a Lambda function or any HTTPS endpoint.

```
{
  "intents": [
    {
      "intent": "GarageCloseIntent",
      "slots": [
        {"name": "DelayMinutes", "type": "AMAZON.NUMBER"}
      ]
    }
  ]
}
```

Sample utterances:

```
GarageCloseIntent close the garage
GarageCloseIntent close the garage door
GarageCloseIntent close the garage in {DelayMinutes} minutes
GarageCloseIntent shut the garage
```

That's the developer hook that lets every smart-home brand integrate. Looking forward to that becoming the real unifier — voice + cloud actions + cross-vendor.

## What this changes for the smart home

Two unification surfaces now exist:

- **Hub-based unification** (SmartThings): your stuff talks to a hub; the hub talks to other vendors' clouds. Voice is one more endpoint.
- **Voice-assistant unification** (Alexa, eventually Google + Siri): the voice assistant becomes the unifying API. Each vendor publishes a Skill; Alexa orchestrates.

These aren't mutually exclusive. Long-term I expect both: hub for local actions and fast automations, voice for ad-hoc commands.

In 2014, Alexa is **good enough at lights** to use daily. It's bad at everything else smart-home (locks, thermostats, cameras — no integrations yet). That'll be the 2015 story.

## Privacy note (will revisit)

The mic array is always on for the wake word. Audio is processed on-device until wake fires; then it streams to AWS. Amazon retains the audio of post-wake-word commands by default — accessible (and deletable) in the Alexa app.

The "always-listening" panic is overblown for the wake-word DSP (no recording, no streaming pre-wake). The post-wake retention is a real privacy decision — defaults to keep, and most users don't change it. The regulatory pressure on this hasn't materialized yet but probably will eventually; for now the customer is the only one auditing.

## What's next

Last post of 2014 — the year-end review.
