---
title: "Joule arrives — pet IoT for cats is a different category"
date: 2014-04-18T18:00:00-04:00
category: tools
tags:
  - pet-iot
  - cat
  - microchip
  - rfid
  - protocols
notebook: pet-iot-field-guide
notebookOrder: 3
excerpt: "Brought home a 9-week-old tabby yesterday. Named her Joule. Cat IoT is barely a category — microchipping is established but smart products are thin. Notes on RFID for indoor cats."
pullquote: "Cat pet-IoT in 2014 is barely a category. The cat IS the device — implanted with an RFID chip — and everything else hasn't caught up yet."
cover: "../../assets/blog/joule-arrives-microchip-rfid-primer-cover.png"
coverAlt: "Joule arrives — pet IoT for cats is a different category"
---

Brought home a 9-week-old tabby kitten yesterday. **Joule.** Named per the household physics convention (Atom: particle, Joule: energy unit). She immediately found the highest perch in the house and stayed there for six hours.

Six months of [Whistle on Atom](/blog/atom-arrives-whistle-activity-monitor-launches/). The dog pet-IoT category is real. The cat pet-IoT category is barely a thing. Notes on what exists and what's missing.

## The one universally-deployed cat IoT: the microchip

Cat IoT in 2014 is almost entirely the **microchip** — and even that isn't really "IoT" in the modern sense. It's passive RFID.

**Hardware:**
- A glass-encased microchip ~12 mm × 2 mm.
- Subcutaneous implant between the shoulder blades (the standard location).
- **Passive RFID** — no battery; energized by the magnetic field of an external scanner.
- Stores a unique ID (typically 15 digits per ISO 11784/11785).

**Frequency:**
- **ISO standard: 134.2 kHz** (LF, low-frequency RFID).
- US-historical: 125 kHz, 128 kHz (legacy AVID, HomeAgain pre-2007).
- The frequency-fragmentation problem: a 125 kHz HomeAgain chip in your cat won't read on a 134.2 kHz ISO-only scanner. Shelters and vets have to stock multi-frequency scanners.

Joule's chip is **134.2 kHz ISO**, registered with the shelter's chosen provider (24PetWatch). I can update the registration through their website.

## The microchip data model

A microchip stores **only the unique 15-digit ID**. Nothing else — no owner contact info, no allergies, no medical history. The ID is a key into a registry database:

```
Microchip ID: 985112005678901
Registry:     24PetWatch
              ↓ (lookup)
Cat name:     Joule
Owner:        Luke
Phone:        ...
Address:      ...
Vet:          ...
```

The registry is the actual data store. The chip is just the key.

This is the design that's been deployed at scale for decades. It works because the data model is minimal — there's no "did the cat use this door" or "where is the cat right now," just "is this cat known."

## The frequency mess in the US

A real annoyance in cat (and dog) microchipping is the **US frequency fragmentation**:

| Chip | Frequency | Format | Era |
|---|---|---|---|
| AVID Eurochip | 134.2 kHz | ISO | Modern |
| HomeAgain (newer) | 134.2 kHz | ISO | Modern |
| HomeAgain (older) | 125 kHz | Proprietary FECAVA | Pre-2007 |
| AVID legacy | 125 kHz | Proprietary | Pre-2007 |
| AVID Friendchip | 128 kHz | Proprietary | Legacy |

Pre-2007 US shelters often used 125 kHz or 128 kHz chips. ISO 11784/11785 (134.2 kHz) is the modern standard adopted in the US after 2007. The Universal Scanner Act (2008) required scanners to read multiple frequencies, but the older chips still exist in older animals.

Joule's an 11-week-old kitten with a modern 134.2 kHz ISO chip. No frequency issues for her. But this matters when I think about smart-pet-door products — they need to read whatever chip the cat has.

## The first smart-pet-door product: SureFlap

The most interesting pet-IoT product for cats today is the **SureFlap Microchip Pet Door**, from a UK company (SureFlap Ltd, founded 2008). The design:

- Battery-powered pet door (4× C batteries, claimed 1-year life).
- Built-in 134.2 kHz ISO + 125 kHz RFID reader in the doorway frame.
- When the cat approaches, the reader detects the chip.
- If the chip ID is in the door's allow-list (configured by holding the cat's chip near the door once), the latch unlocks and the cat can push through.
- If not, the latch stays locked. No mystery cat can enter.

This is the first "cat IoT" product that does something more than passive identity — it gates entry on identity. **Beautiful engineering for a single problem.**

The hardware as of 2014 isn't network-connected. The "smart" is local — chip detection + a latching mechanism. There's no app, no cloud, no Wi-Fi. The data never leaves the door.

A network-connected SureFlap-equivalent (with WiFi + an app to see "Joule went out at 3 PM, came back at 5 PM") would be a meaningful upgrade. The hardware to do this exists; the integration story doesn't yet. Rumors are SureFlap is working on it.

Going to install a SureFlap door for Joule once she's old enough to be allowed outdoor access — probably late 2015 when she's a year old. Topic for a future post.

## What else exists for cats in 2014

Sparse:

- **Cat tracking GPS collars**: a few exist (Loc8tor, etc.) but cats hate wearing collars + the form factor is too big. No mainstream consumer product.
- **Smart litter boxes**: CatGenie self-cleaning has been around since 2008 but isn't really "smart" — it's a self-cleaning mechanism with a timer. No Wi-Fi, no app, no telemetry.
- **Smart cat feeders**: PetSafe and others have timers; none are connected.
- **Cat cameras**: PetCube (just shipped from Kickstarter) is mostly marketed for cats but works for any pet.

The cat IoT category is *years* behind dog. Mostly because:
- Dogs are larger — easier to put a tracker on without affecting comfort.
- Dogs go outdoors more — GPS has obvious value.
- Cats are notoriously hard to track via accelerometer — they're either still or in motion in unpredictable bursts.
- Cat-product designers under-invest because cat people are stereotyped as less spend-happy than dog people. (This may be wrong but it's the market reality.)

## What I'd like to exist

Things I want for Joule that don't exist yet (or aren't viable in 2014):

1. **A smart cat door that logs entry/exit times** to my phone.
2. **A smart litter box** that tracks visit frequency + duration per cat (basis for early UTI detection).
3. **A microchip-activated feeder** so I can portion-control if needed.
4. **A small RFID-based "is Joule home" sensor** at the cat door that pushes to my home automation system.

These all require somebody to ship hardware. I'll watch.

## What's next

End-of-year review for 2014 in a few months. Whistle has shipped a v2 hardware refresh; talking about whether the activity data is showing anything useful for a now-1-year-old dog.

Welcome, Joule. The data starts… well, for cats it doesn't start, yet. We'll see.
