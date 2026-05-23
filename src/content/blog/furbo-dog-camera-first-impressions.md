---
title: "Furbo Dog Camera — first impressions, treat-toss engineering"
date: 2017-05-14T18:00:00-04:00
category: tools
tags:
  - pet-iot
  - furbo
  - camera
  - dog
  - wifi
notebook: pet-iot-field-guide
notebookOrder: 12
excerpt: "Furbo finally shipped in March. Treat-tossing 1080p camera with bark alerts. Six weeks in. Hardware works, bark detection mediocre, treat-toss clever. Atom thinks it's a slot machine."
pullquote: "The treat-toss mechanism is the engineering achievement. Spring-loaded, calibrated for a 2-meter arc, with three different launch angles selectable from the app. Atom now stares at it like it's a slot machine."
---

Furbo Dog Camera shipped to Kickstarter backers in March. Mine arrived early April. Six weeks of use, plenty of treats tossed at Atom.

## Hardware

- **1080p HD camera** with 120° wide-angle.
- **Night vision** (IR illuminator, not "starlight" or thermal).
- **2-way audio** — built-in speaker + microphone.
- **Treat-toss mechanism**: spring-loaded launcher inside the unit. Three launch-angle settings, treats fall in a ~1.5-2m arc in front of the device.
- **Internal treat reservoir**: holds ~30 standard-sized training treats (the small dry biscuits Atom likes).
- **WiFi 2.4 GHz** with mobile app control.
- **Mains-powered** — AC wall plug, no battery.

The unit is tall (~30 cm), narrow, weighted at the base. Looks like a small modern vase. The intent is "blends into furniture, doesn't scream pet device." Mostly succeeds.

## The treat-toss mechanism is the engineering win

The treat-toss is what differentiates Furbo from other dog cameras. Mechanically:

- Treats fall from the internal reservoir into a small chamber.
- A spring-loaded paddle compresses; release fires the paddle into the treat, launching it forward.
- The launch arc is ~1-2m, in front of the device.
- Three selectable angles (low/medium/high) adjust by tilting the launch chamber.
- Treats can be standard cylindrical training treats (the cheap pet-store kind work fine).

I've watched the mechanism through the device's clear window. It's a tidy piece of mechanical engineering — consistent launch, no jams in 200+ tosses.

Sound design is also intentional: there's a distinct "click" when the toss fires that the dog hears, plus an optional "treat coming" chime through the speaker. Atom learned the click-then-treat pattern within an hour.

## The 2-way audio + camera

Video quality is good for the use case (low-light, no IR-induced color shift in daytime). At night the IR illuminator works to about 4-5m — useful for confirming Atom's in his bed.

2-way audio means I can talk to Atom from work. I've tried it; he tilts his head, looks around for the source, doesn't seem distressed but doesn't seem helpfully responsive either. Limited use.

## The bark detection

Furbo claims AI-based bark detection — push notification when Atom barks. My experience over six weeks:

- **True positive rate**: ~70% (barks Furbo actually catches).
- **False positive rate**: high. Doorbells, the mail carrier, kitchen sounds, the TV — all classified as "barking."
- **Useful action**: limited. Even with accurate detection, "Atom is barking" doesn't tell me *why*, and I can't see anything from the camera that explains it.

The bark feature is the kind of "AI" that exists because the marketing department wants to claim AI. Not load-bearing.

## What it costs

- **Hardware**: $249 at launch ($199 since).
- **Furbo Dog Nanny subscription** (announced concept for 2020+, behavioral monitoring): not yet a product. Currently no subscription.

For now: one-time purchase, no subscription. Going to bet this changes — the AI behavioral monitoring will require subscription when (if) it ships.

## The cloud dependency angle

Like every other connected pet device, Furbo's app-based control routes through the vendor cloud. Video streaming is direct WebRTC (peer-to-peer when possible, relay-via-cloud otherwise). Treat-toss commands route through Furbo's cloud.

Failure modes I've observed:
- **Cloud outage**: cannot toss treats remotely. Camera live view still works (WebRTC direct).
- **WiFi loss**: device offline; can't be controlled at all.
- **Treat reservoir empty**: device dispenses nothing. No notification. I've discovered this by trying to toss and getting nothing.

A "reservoir empty" notification would be table stakes. Furbo doesn't ship one. Hopefully a firmware update.

## What I use it for

After six weeks, my actual uses:

- **Treat-toss when I'm at the office** for Atom's "good dog" moments (when the security cam detects him being calm; manual). Daily use.
- **Live view to check on Atom mid-day**. Maybe 2-3 times per week.
- **Two-way audio**: tried twice, stopped. Not useful.
- **Bark detection notifications**: ignored. Too noisy.

The treat-toss is the only feature I'd pay for again. Everything else is camera-table-stakes.

## What I want next from this category

- **Treat reservoir capacity sensor + notification**. Trivial to add.
- **Better bark classification** (or just turn it off by default). The current model is more frustrating than useful.
- **Multi-pet awareness**. Right now it doesn't know if it's Atom or me near the camera. A pet-vs-human classifier on the video stream would be useful for "auto-toss treat only when Atom is near."
- **Local-only mode**. Same complaint as everywhere: a fully-local control path for owners who want it.

## What I'm watching

- **Furbo's next product** — rumored to be a smaller / cheaper variant.
- **PetCube Bites** — competitor product, also treat-tossing, similar price point. Reviews are mixed.
- **The eventual "AI behavioral analysis" features** — Furbo's been hinting for a year. Skeptical based on the bark-detection track record.

## What's next

SureFlap Hub finally shipped this spring. Picking one up to network-connect Joule's existing pet door. Coming up next.
