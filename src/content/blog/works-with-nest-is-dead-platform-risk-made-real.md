---
title: "Works with Nest is dead — platform risk, made real"
date: 2019-05-20T17:00:00-04:00
category: tools
tags:
  - smart-home
  - nest
  - google
  - local-first
  - platform-risk
notebook: smart-home-iot-journey
notebookOrder: 27
excerpt: "Google announced it's shutting down the Works with Nest program — the integration API thousands of people built their homes around. Overnight, every cross-vendor automation touching a Nest device is on a countdown. This is the exact failure I've been designing against since 2017, happening to everyone else at once. A field report on platform risk, and why the closet beats the cloud."
pullquote: "The cloud integration you built your morning routine on is a feature someone else can delete in a blog post. Works with Nest didn't break. It was withdrawn. That's a different kind of failure, and you can't engineer around a business decision — only around the dependency."
---

Google announced it's killing **Works with Nest**. The API that let your Nest thermostat, cameras, and protect talk to everything else — SmartThings, IFTTT, Hue, a thousand hobbyist scripts — is being shut down and folded into the tighter, narrower "Works with Google Assistant."

If you built a cross-vendor automation that touches a Nest device, it's on a countdown now. This is the failure mode I've been writing about since I [moved the house local-first in 2017](/blog/2017-in-review-smart-home-journal-goes-quiet/) — and it just happened to the entire smart-home world simultaneously.

## What actually died

Works with Nest was an OAuth-based API: you'd authorize a third party (SmartThings, IFTTT, your own script) to read Nest state and send commands. "If the Nest goes to Away, turn off the Hue lights." "If the Nest Protect detects smoke, flash every light red." Thousands of these existed.

Google's replacement, Works with Google Assistant, is **voice-first and command-only**. You can tell Google to set the temperature. You largely *cannot* read Nest state into your own automation logic the way you could before. The programmable integration is gone; a voice command remains.

For a hobbyist with a closet full of local logic, that's not an upgrade. It's an amputation.

## Why this is the local-first thesis, proven

I've been making one argument in this journal for years: **a dependency you don't control is a liability, no matter how convenient it is today.** People pushed back — "the cloud integration just works, why run a Pi in your closet?"

This is why. The Works with Nest API didn't have an outage. It didn't get hacked. It was *withdrawn* — a deliberate business decision by Google to consolidate control. You cannot engineer around that. No amount of clever automation survives the vendor deciding the door is closed.

The only defense is to not depend on it in the first place.

| Failure type | Can you engineer around it? |
|---|---|
| Cloud outage | Partly — local logic keeps running |
| Vendor breach | Partly — local data isn't exposed |
| **API withdrawal** | **No — only by not depending on it** |
| Company shutdown | No — same |

## What I'm doing about Nest specifically

I have a Nest thermostat. After this, my options:

1. **Keep it, lose the integration.** It still heats the house; it just stops talking to my automations cleanly.
2. **Bridge it locally.** There are emerging community integrations that talk to Nest through unofficial paths — fragile, against the grain, and exactly the kind of thing Google can break again.
3. **Replace it with something locally controllable** — a Z-Wave or Zigbee thermostat that answers to my [ConBee coordinator](/blog/conbee-deconz-zigbee-off-the-smartthings-hub/) and never phones home.

I'm leaning toward (3) on the next failure. Not today — the thermostat works — but it's now on the list of devices to replace with local equivalents when they die. The lesson tax gets paid eventually; better to pay it on my schedule.

## The broader pattern

Every few years a platform does this. A big company acquires a beloved product, runs it for a while, then narrows or kills the open integration to consolidate the experience inside its own walls. Nest is this year's example. It won't be the last.

The house that depends on those integrations gets quietly worse over time, one deprecation at a time. The house that treats the cloud as optional — logic local, radios local, data local — barely notices.

## What's next

This pushed MQTT up my priority list. If everything in the house publishes to [my own broker](/blog/node-red-flows-automations-yaml-couldnt-handle/), then a vendor killing an API is a localized problem — I lose one device's cloud features, not a web of automations. Making MQTT the *primary* integration path, not a side bus, is the summer project. If the day job lets up.
