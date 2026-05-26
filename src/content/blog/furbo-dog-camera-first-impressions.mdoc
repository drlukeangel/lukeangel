---
title: "Furbo Dog Camera — first impressions, and the treat-toss is the real engineering"
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
excerpt: "Picked up a Furbo this spring after it had been on the market a while. Six weeks in. The camera and two-way audio are table stakes; the bark detection is marketing-grade AI; but the spring-loaded treat-toss is a genuinely tidy piece of mechanical engineering — and the only feature I'd buy again."
pullquote: "The treat-toss is the engineering achievement, and it's mechanical, not software. A spring paddle, a calibrated launch arc, a click the dog learns in an hour. Atom now stares at the thing like it's a slot machine that pays out in biscuits."
cover: "../../assets/blog/furbo-dog-camera-first-impressions-cover.svg"
coverAlt: "A tall, narrow tower-shaped dog camera with a wooden lid, a treat arcing out of its front toward a waiting dog — the spring-loaded treat-toss that defines the device."
---

I finally picked up a Furbo this spring. It shipped out of its Indiegogo back in 2016 and has been on shelves a while; I held off, then caved when I wanted a way to do *something* for Atom from the office besides stare at him on a webcam. Six weeks in, here's the read — and the surprise is that the one feature worth the money is the most mechanical one.

## The hardware

- **720p HD camera**, 120° wide-angle, 4x digital zoom.
- **Night vision** — an IR illuminator, not "starlight" or thermal.
- **Two-way audio** — built-in speaker and microphone.
- **The treat-toss**: a spring-loaded launcher inside the body, three selectable launch angles, treats landing in a roughly 1.5–2 m arc in front of the device.
- **An internal treat hopper** holding maybe 30 standard training biscuits — the small dry kind Atom likes.
- **2.4 GHz Wi-Fi**, mobile-app control.
- **Wall-powered**, no battery.

The unit is tall and narrow — around 30 cm — weighted at the base with a removable wooden lid on top, deliberately styled to read as a small modern vase rather than a gadget. It mostly succeeds; guests don't immediately clock it as a camera, which is either reassuring or faintly unsettling depending on your view of cameras shaped like décor.

## The treat-toss is the engineering win

The treat-toss is the whole reason Furbo isn't just another Wi-Fi cam, and the nice part is that it's a *mechanical* achievement, not a software one. Watching it through the device's window:

- Biscuits drop from the hopper into a small staging chamber.
- A spring-loaded paddle compresses, then releases, firing into the treat and launching it forward.
- Three angle settings tilt the launch chamber for a low, medium, or high arc.
- Ordinary cylindrical training treats work fine — no proprietary cartridge, which I respect.

Two hundred-plus tosses in, no jams and a consistent landing zone. And the sound design is doing real work: there's a distinct mechanical *click* when the paddle fires, plus an optional chime through the speaker. Atom learned the click-means-biscuit pattern inside an hour, which is faster than he learned most things, food being the great accelerant.

![A cutaway of the Furbo treat-toss mechanism. At the top, a hopper of biscuits feeds a single treat down into a staging chamber. A spring-loaded paddle is shown compressed, then released, striking the treat and launching it out the front of the device along a dashed arc that lands a meter or two away where a dog waits. A small dial marks the three selectable launch angles that tilt the chamber for a low, medium, or high throw. A caption notes the toss is purely mechanical — a spring, a paddle, a calibrated arc — which is why it's reliable.](../../assets/blog/furbo-treat-toss-mechanism.svg)

## The camera and two-way audio

Video quality is fine for the job. Daytime is clean with no IR color cast; the night-vision illuminator reaches maybe 4–5 m, enough to confirm Atom's asleep in his bed and not, say, on the couch he's banned from. The 720p resolution is unremarkable but adequate — you're checking on a dog, not shooting a film.

Two-way audio lets me talk to Atom from work. I've tried it. He tilts his head, hunts around for the disembodied voice, and looks mildly puzzled — not distressed, but not usefully reassured either. A voice with no body attached doesn't mean to a dog what the marketing imagines. Limited use.

## The bark detection is marketing-grade AI

Furbo pushes a notification when it thinks Atom is barking. Six weeks of logging it:

- **Catches maybe 70% of actual barks.**
- **Fires constantly on things that aren't barks** — the doorbell, the mail carrier, kitchen clatter, the TV. The false-positive rate is the real story.
- **Tells me nothing actionable even when it's right.** "Atom is barking" without *why*, and the camera view rarely explains it, so the alert is a dead end.

This is the kind of "AI" that exists because a spec sheet wanted the letters A and I on it. The detector is a noise classifier with the bar set low, and I turned the notifications off in week two. The mechanical treat-toss does more for me than the algorithm does.

![The bark-detection problem drawn as a confusion grid. Real barks split into a roughly seventy-percent caught slice and a thirty-percent missed slice; meanwhile a large pile of non-bark sounds — doorbell, mail carrier, TV, kitchen noise — is shown crossing the same threshold and firing false alerts. A note marks that the false positives, not the misses, are what make the feature useless: an alert that cries bark at the television is an alert you learn to ignore.](../../assets/blog/furbo-bark-detection-false-positives.svg)

## What it costs, and where the subscription is headed

It's a one-time purchase right now — around $199 at the moment, having launched higher — and no subscription. I don't expect that to last. The hints Furbo keeps dropping about "behavioral monitoring" and smarter alerts all point the same direction every connected pet company eventually walks: the hardware sells once, and the recurring revenue comes from an AI-flavored monitoring tier you pay for monthly. I'd bet a subscription product shows up within a couple of years. When it does, the question will be whether the behavioral analysis is real or just the bark detector with a price tag.

## The cloud-dependency angle

Like everything else in this notebook, Furbo's control plane runs through the vendor's cloud. The live video is peer-to-peer when the network allows and relayed through the cloud when it doesn't, which is sensible. But the treat-toss command routes through Furbo's servers. Failure modes I've actually hit:

- **Cloud outage** — can't toss remotely, though live view often still works over the direct path.
- **Wi-Fi loss** — device offline, no control at all.
- **Empty hopper** — it dispenses nothing and *says nothing*. I found out by tossing into a void and watching Atom wait for a biscuit that never came.

![A diagram of the Furbo treat-toss control path and how it breaks. A phone on the left sends the toss command through the Furbo vendor cloud in the middle, which relays it to the Furbo device and its biscuit hopper on the right — the command does not go device-to-device, it routes through the cloud. Below, three failure modes are marked with red crosses: a cloud outage means you can't toss though live view often still works over the direct path; Wi-Fi loss takes the device fully offline with no control; and an empty hopper dispenses nothing and, worst of all, says nothing.](../../assets/blog/furbo-dog-camera-first-impressions-fig-3.svg)

A "hopper empty" notification is table stakes and Furbo doesn't ship one. It's the same lesson as the [Petnet feeder](/blog/petnet-smart-feeder-long-term-review/): the device knows its own state and declines to tell you the one thing you'd want to know.

## What I actually use it for

- **Tossing Atom a treat from the office** when I catch him being calm on the live view. Daily.
- **Checking in mid-day.** Two or three times a week.
- **Two-way audio.** Tried twice, stopped.
- **Bark alerts.** Off.

The treat-toss is the only feature I'd pay for again. Everything else is generic Wi-Fi-camera fare I could get cheaper without the biscuit cannon.

## What I want from this category next

- **A hopper-level sensor and a low-treat alert.** Trivial to add; conspicuously absent.
- **A bark classifier that works, or an honest off-by-default.** The current one is a net negative.
- **Pet-versus-human awareness on the video** — so an auto-toss only fires when it's actually the dog near the camera, not me walking past.
- **A local-only control path** for owners who'd rather not route their dog's treats through a startup's servers.

## What's next

The SureFlap connected hub finally shipped this spring — the thing I've been waiting on since the 2016 announcement — and I'm wiring it up to network-connect the microchip cat door Joule's been using for years. That's the next one.
