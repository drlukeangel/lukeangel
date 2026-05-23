---
title: "Google Home — two voice assistants, one house"
date: 2016-11-15T21:00:00-05:00
category: tools
tags:
  - smart-home
  - google-home
  - voice-assistant
  - alexa
notebook: smart-home-iot-journey
notebookOrder: 18
excerpt: "Google Home launched November 4. Mine arrived three days ago. Echo and Google Home in the same house, both listening for wake words."
pullquote: "Two voice assistants in one house means two wake words, two skill ecosystems, two integration accounts. The 'unified smart home' was supposed to solve this. It made it worse."
---

Google Home launched November 4. I ordered one immediately ($129); arrived Saturday. It's been running for three days alongside the Echo in the kitchen and the Echo Dot in the bedroom.

The voice-assistant landscape is now Amazon vs Google in the home, Apple via Siri on phones (and via the rumored AppleHome speaker eventually), and Cortana on PCs that nobody cares about for smart home.

## What Google Home is, hardware-wise

- Marvell Armada 1500 Mini Plus SoC (dual-core ARM, 64-bit).
- **Two-mic array** (vs Echo's seven). Smaller, less expensive, less aggressive beamforming. Performance in noisy environments is noticeably worse than Echo — Echo can hear "Alexa" with the TV at conversation volume; Google Home struggles.
- WiFi (2.4 + 5 GHz dual-band) + Bluetooth.
- Single full-range speaker plus dual passive radiators. Better-than-Echo audio quality for music.
- LED ring under the top surface, similar to Echo's, indicates listening / responding / volume.

The hardware is a downgrade from Echo on the mic side, an upgrade on the audio side, and a wash on everything else.

## Actions on Google — the developer surface

Google's equivalent of Alexa Skills Kit, announced this summer:

- **Conversation actions**: full back-and-forth conversations (Echo Show / Google Assistant has these).
- **Smart Home actions**: structured device-control via the Home Graph.

The Smart Home actions side is what matters for my use case. Vendors integrate by publishing a fulfillment endpoint that Google calls when the user says "Hey Google, turn off the kitchen lights." Vendor's endpoint:

```json
POST https://vendor.example.com/google-home-fulfillment
{
  "requestId": "req-uuid",
  "inputs": [{
    "intent": "action.devices.EXECUTE",
    "payload": {
      "commands": [{
        "devices": [{"id": "kitchen-light"}],
        "execution": [{
          "command": "action.devices.commands.OnOff",
          "params": {"on": false}
        }]
      }]
    }
  }]
}
```

Vendor responds with success/failure per device. Compared to Alexa's "Smart Home API" (which routes through Lambda by default and uses a similar JSON schema), Google's is slightly simpler — fewer layers between phrase and device.

## The Home Graph — Google's structured smart-home data

This is the part that's genuinely different. Google has built a graph database that knows:

- Every device in your home (linked via Google account).
- Each device's type (light, thermostat, lock, speaker).
- Each device's location ("kitchen", "living room"), determined either by user-assignment or by inference from setup language.
- Relationships between devices ("the lights in the kitchen are: a, b, c").

When you say "Hey Google, turn off the lights," the Home Graph resolves "the lights" to the set of light-type devices in your inferred current room (based on which Google Home device heard the request) or in the room you specified.

Echo doesn't have this. Alexa requires you to define "groups" explicitly in the Alexa app; without a group, "turn off the lights" doesn't work. Google figures it out from the graph automatically.

In daily use, **Google's natural language is better at smart home**. Echo wins at music, lists, and timers.

## The multi-assistant problem, demonstrated

Day one of having both in the kitchen:

- Wife says "Alexa, what's the weather?" → Alexa responds normally.
- Wife says "OK Google, turn off the dining lights" → Google Home responds, lights go off.
- Five-year-old says "Alexa, play Frozen songs" → music starts.
- Five-year-old says "OK Google, stop the music" → Google starts asking which music ("I don't see a music session" because Google didn't start it).
- Five-year-old says "Alexa, stop" → music stops.

In practice: **the wake word disambiguates which assistant responds**. There's no overlap on wake-word matching as long as you don't have an Echo named "Google" or vice versa.

But mental overhead is real. You have to remember which wake word for which task. The five-year-old already has both memorized; the wife has not.

## Smart-home integrations on Google Home, three days in

What works:
- **Hue**: linked via OAuth in the Google Home app. Latency 1-2 s. Names imported from Hue.
- **Nest thermostat**: linked. "OK Google, set the thermostat to 68" works.
- **SmartThings**: integration *exists*, OAuth-linked, but device naming hasn't synced. I have to use SmartThings's device names verbatim, which are auto-generated and ugly ("Multipurpose Sensor 2").

What doesn't yet:
- **Lutron Caseta**: no Google Home support. Lutron's been focused on HomeKit. Probably coming in 2017.
- **Ecobee3**: support announced for "later this year" — not yet.
- **Custom routines / scripts**: Google Home has no equivalent of Alexa's "skills you write yourself yet." Coming, supposedly.

## What I think this means

Echo wins on:
- Custom skills (1000s available; I use a Twilio-based "find my phone" skill).
- Multi-room music (when configured well; still buggy).
- Aggressive far-field mic.

Google Home wins on:
- Natural-language smart-home control via the Home Graph.
- General knowledge questions ("How tall is the Empire State Building?" — Google nails it; Alexa often fumbles).
- Audio quality for music.

In the house long-term: probably both. Different surfaces for different jobs. Two ecosystems, two skill registries, two integration accounts — that's the world now. The unification problem just got worse, not better.

## What I'm watching

- **Apple's response.** The HomePod (rumored for WWDC 2017) needs to ship. Apple's three years behind on voice; that's a long time.
- **Whether Google opens up routines / scripting** on Google Home.
- **Whether Amazon and Google ever support each other's smart-home APIs.** They won't.
