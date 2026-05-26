---
title: "Matter 1.0 ships — the protocol primer ten years late"
date: 2022-11-08T19:00:00-05:00
category: tools
tags:
  - smart-home
  - matter
  - thread
  - protocols
notebook: smart-home-iot-journey
notebookOrder: 42
excerpt: "CSA ratified Matter 1.0 on October 4 and Apple, Google, Amazon, and Samsung put their names on it at the November 3 launch event. After ten years of 'the unified protocol is coming,' here's what it actually is — and the four problems it pointedly does not solve."
pullquote: "Matter solves vendor-to-vendor commissioning. It does not solve the multi-hub problem, the privacy problem, or the API-versioning problem. It's the foundation, not the building."
cover: "../../assets/blog/matter-1-0-ships-protocol-primer-cover.svg"
coverAlt: "A Matter application layer resting on three interchangeable transport pillars — Wi-Fi, Thread, and Ethernet — with a single device fabric-joined to several ecosystem hubs at once."
---

The Connectivity Standards Alliance ratified Matter 1.0 on **October 4**, and on **November 3** Apple, Google, Amazon, and Samsung stood on a stage and committed production support. Ten years of "the unified smart-home protocol is coming" turned into "the unified smart-home protocol is here." Sort of.

I've run a Zigbee-plus-Z-Wave house for five years, with a [local-first Home Assistant brain](/blog/ripping-out-vendor-clouds-local-first-ha/) tying the protocols together myself. So my interest in Matter is concrete and a little jaded: does it actually fix the thing that's been annoying me for a decade — that the device I want is on the wrong ecosystem — or is it another spec deck? Here's the read, and the four things it deliberately leaves on the floor.

## What Matter actually is

Matter is **an application-layer protocol**. That's the sentence the marketing buries, and it's the one that matters. It defines how devices are commissioned and controlled and what their state looks like — and it rides on top of three existing network transports:

- **Wi-Fi** — for high-bandwidth devices (displays, speakers, the things that move real data).
- **Thread** — a low-power IPv6 mesh on 2.4 GHz 802.15.4, for battery devices (sensors, locks).
- **Ethernet** — for wired devices.

Matter does **not** define a new radio. This trips everyone up, so I'll be blunt: *Thread is not Matter, and Matter is not Thread.* Thread is a transport; Matter is the language spoken over it. A Matter device might speak over Thread, or over Wi-Fi, or be reachable on both.

![The Matter stack: a single Matter application layer — commissioning, control, attributes and clusters — runs over IP/UDP, which in turn runs over any of three interchangeable transports (Thread, Wi-Fi, Ethernet), each on its own radio (802.15.4, 802.11, or wired). Matter defines no new radio; it rides existing ones.](../../assets/blog/matter-protocol-stack.svg)

## The data model is just Zigbee's, relabeled

Here's the part that told me Matter is real and not vaporware: its data model is lifted almost wholesale from the Zigbee Cluster Library. That's not an accident — the ZCL people *became* the Matter people. A Matter device exposes:

- **Endpoints** — each is a "feature" of the device (a two-bulb fixture has two endpoints).
- **Clusters** — groups of attributes and commands (identical concept to Zigbee).
- **Attributes** — state values: `OnOff`, `Brightness`.
- **Commands** — actions: `On`, `Off`, `Identify`.

```
OnOff cluster (0x0006)
  Attributes: OnOff (bool, RW)
  Commands:   Off, On, Toggle
```

If you've written a Zigbee handler, this is your living room with the furniture moved. The CSA deliberately didn't throw out decades of cluster tooling, which means a Zigbee device's cluster definitions wrap into a Matter device with minimal translation. That's a huge tailwind for adoption and the reason I believe the device flood is actually coming this time.

## Commissioning — the one thing it genuinely fixes

The headline feature, and the one I actually care about: **commissioning, and multi-fabric commissioning.** A Matter device pairs into an ecosystem with a single QR code or pairing code, and — the part that matters — it can be joined to *several ecosystems at once*.

```
1. New device shows a QR code (packaging or on-screen).
2. Phone (iOS or Android) scans it.
3. The QR encodes: device discriminator, passcode, vendor ID.
4. Device is already broadcasting in commissioning mode (on Thread or Wi-Fi).
5. Phone discovers it, runs a passcode-authenticated handshake (PASE/CASE).
6. Device is fabric-joined.
7. Repeat for another ecosystem — the device joins multiple fabrics at once.
```

That last step is the whole point. Today, a bulb picks a side: it's a HomeKit bulb *or* a Google bulb. A Matter bulb can be in Apple Home (for Siri), Google Home (for Assistant), and Home Assistant (for local automation) **simultaneously**. The device stops being a hostage to one ecosystem. After ten years of buying two of everything to dodge that exact trap, this is the feature I'll judge Matter on.

![Multi-fabric commissioning: one physical Matter bulb is fabric-joined to three ecosystems at once — Apple Home, Google Home, and Home Assistant — each holding its own credential to the same device. The device no longer has to pick a side.](../../assets/blog/matter-multi-fabric.svg)

## Thread, briefly — the new mesh underneath

Thread is the IPv6 mesh many battery Matter devices ride. It shares the 2.4 GHz 802.15.4 PHY with Zigbee but is otherwise a different animal — IPv6/UDP network layer, different security model. The properties worth knowing:

- **IPv6-native.** Every Thread device has a routable address; no NAT.
- **Self-healing mesh.** Any mains-powered Thread device can route. Battery devices are "sleepy end devices."
- **Border Routers** bridge Thread to the rest of your IP network. Today that's an Apple TV 4K, a HomePod mini, a Nest Hub Max, an Echo (4th gen), or an Aqara M2.
- **Battery life beats Zigbee** — years on a coin cell rather than the one-to-two I've measured on Zigbee sensors.

One Border Router gives you a Thread network. Add more for coverage and redundancy; they self-discover and form one mesh.

## The four things Matter does *not* solve

This is where I part ways with the launch-day enthusiasm. Matter fixes commissioning. It does not fix these, and pretending otherwise will burn you:

**1. It doesn't replace Zigbee or Z-Wave.** Existing Zigbee devices keep talking to existing coordinators. Matter is an *additional* path, not a migration. Bridges (Aqara's M2, eventually Hue's) expose existing Zigbee gear *into* Matter — they don't convert it.

**2. It doesn't do cameras.** Matter 1.0 covers lighting, locks, thermostats, sensors, plugs. Cameras are on the 1.x roadmap, not in this release. Reolink, Ring, and Arlo keep doing their own thing for the foreseeable future.

**3. It doesn't end vendor differentiation.** A Hue bulb advertised as Matter still has Hue-specific behavior behind vendor-extended clusters. "One protocol, every device identical" is not the reality; vendors still differentiate, and the interesting features live in the extensions.

**4. It doesn't make ecosystems share *logic*.** This is the subtle one. Apple Home, Google Home, and Alexa each keep their own state graph. Control a Matter bulb from Apple Home and Google Home sees the new *state* — but not the automation that set it. Each ecosystem still runs its own routines independently. Matter syncs state, not intent.

And a fifth, for me specifically: **it doesn't help my Z-Wave gear at all.** Z-Wave is structurally outside Matter. A "Matter bridge" for Z-Wave is conceivable but doesn't exist yet.

![What Matter 1.0 fixes versus what it pointedly leaves on the floor. At the top, the one thing it solves cleanly, marked with a green check: multi-fabric commissioning — one QR code joins a device to Apple Home, Google Home, and Home Assistant at once. Below it, four red-cross boxes for the things it does not solve: it doesn't replace Zigbee or Z-Wave (it's an additional path, not a migration; bridges expose old gear, they don't convert it); it has no camera support in 1.0 (only lighting, locks, thermostats, sensors, plugs — cameras are on the 1.x roadmap); it doesn't end vendor differentiation (vendor-extended clusters keep the interesting features vendor-specific); and it doesn't share ecosystem logic (it syncs state, not intent — each hub still runs its own routines independently). A fifth, dashed note: Z-Wave is structurally outside Matter, and a Z-Wave bridge, while conceivable, doesn't exist yet. The takeaway: treat Matter as a commissioning win, not a re-platform — it's the foundation, not the building.](../../assets/blog/matter-what-it-does-not-solve.svg)

## What I'd tell a team — and what I'm doing

- **Treat Matter as a commissioning win, not a re-platform.** If your pitch is "Matter unifies everything," you've already overpromised. The honest, durable claim is "Matter lets a device join every ecosystem at once." Sell that; it's enough.
- **A Border Router is the prerequisite, not the bulb.** No Thread Border Router, no Thread Matter devices. Buy the infrastructure before the gadgets.
- **Wait out the first firmware wave.** Early Matter devices will ship buggy, the way every 1.0 does. Six months of other people's bug reports is cheap.
- **Don't rip anything out.** A working Zigbee/Z-Wave install owes you nothing. Matter is additive; let it earn its place one device at a time.

Concretely, for my own house: I'm buying **one Aqara M2** ($60) for the closet — it's both a Zigbee bridge for my existing Aqara sensors *and* a Thread Border Router, so it earns its slot twice. I'm **not** replacing the Hue bridge (it already does everything I need; Matter changes nothing for Hue today). And I'm watching Home Assistant — Matter support isn't in the current 2022.11 release, but it's clearly the next thing they're building, so I expect to be able to commission a Matter device locally within a release or two.

## What I'm betting

- By end of 2023: Matter devices outsell pure-Zigbee in *new* sales.
- By end of 2024: Home Assistant's Matter support is my primary unifier, replacing the per-protocol-bridge tangle I run now.
- By end of 2025: new installs bridge legacy Zigbee/Z-Wave through Matter — but existing installs like mine keep running side by side for five-plus years.

Long arc. Worth following.

## Useful reading

- The Matter spec: a free 800-page PDF at developer.csa-iot.org.
- Thread: threadgroup.org.

## What's next

I'll write this up again once there are actual Matter devices on my network and a Border Router in the closet — probably summer 2023, once the firmware-wave dust settles. For now the bigger project on the bench is the new build: we bought the lot, and I'm about to get to design a connected house from the studs out instead of retrofitting one.
