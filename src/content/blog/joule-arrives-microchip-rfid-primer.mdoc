---
title: "Joule arrives — what a pet microchip actually is"
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
excerpt: "Brought home a 9-week-old tabby and the shelter had already chipped her. So I spent the evening figuring out what's actually under Joule's skin — a battery-less RFID tag the size of a rice grain. It is not a tracker, and that distinction is the whole post."
pullquote: "A microchip doesn't find a lost pet. It identifies a found one. No battery, no GPS, no range past a few centimeters — the chip just answers one question, and only when something else asks it."
cover: "../../assets/blog/joule-arrives-microchip-rfid-primer-cover.svg"
coverAlt: "A vet's handheld scanner held a few centimeters over a cat's shoulder, with concentric inductive-coupling waves passing between them and a short ID number echoing back — a passive microchip being read, not located."
---

Brought home a 9-week-old tabby kitten yesterday. **Joule** — named per the household physics convention (the dog's Atom, so the cat's a unit of energy). She found the highest perch in the house within an hour and stayed there until well after dark.

The shelter had already microchipped her, which is now standard before adoption. The paperwork listed a 15-digit number and a registry name and not much else. I'm six months into [putting gadgets on Atom](/blog/atom-arrives-whistle-activity-monitor-launches/), so my first instinct was to ask the obvious engineer question: *what is this thing, exactly, and how does it work?* The answer turned out to be more interesting than I expected, and it cleared up a misconception I'd been carrying. So this is a primer — for me, mostly, written down so I stop being fuzzy on it.

The short version, and the thing I want to nail down before anything else: **a microchip is an identifier, not a tracker.** It will not tell me where Joule is. It will tell a stranger who finds her *who she belongs to* — and only if that stranger thinks to scan her. Those are completely different jobs, and the whole pet-tech aisle blurs them. Let me take the chip apart.

## What's actually under her skin

The chip the shelter implanted is a glass cylinder about the size of a long grain of rice — roughly 12 mm by 2 mm. It sits in the loose skin between the shoulder blades, injected through a needle that's bigger than a vaccine's but not by much. Joule didn't notice; she was busy being furious about the carrier.

Here's the part that surprised me. **There is no battery in there.** I'd vaguely assumed a chip implanted in an animal must have *some* power source, a tiny cell that dies after a few years and has to be replaced. It doesn't. There's nothing to die. The chip is inert — completely dead — every second of its life except for the handful of seconds a scanner is held over it. It can sit in Joule for twenty years and work exactly as well on the last day as the first, because for nineteen years and 360-odd days it isn't doing anything at all.

Inside that glass capsule are exactly three things:

- a tiny **silicon chip** holding a 15-digit number, burned in once at the factory and never changed;
- a **coil of copper wire** wound around a ferrite core — this is the antenna, and it's also how the thing gets powered;
- a **biocompatible glass** shell, sometimes with a textured cap so the body grows a thin sheath around it and it doesn't migrate.

![Inside a pet microchip, an enlarged cutaway of the roughly 12-by-2-millimeter glass capsule. At one end sits a small silicon die holding a single 15-digit ID burned in once at the factory. Wound along the body is a copper antenna coil around a ferrite core rod; the coil both picks up power from a scanner and sends the ID back. The whole thing is sealed in a biocompatible glass shell the body won't reject. There is no battery anywhere in the device.](../../assets/blog/joule-arrives-chip-anatomy.svg)

That's the entire device. No processor in the sense you'd mean it, no storage beyond the one number, no radio that transmits on its own. The cleverness is entirely in how it borrows power from the scanner — which is the next section, and the part worth slowing down for.

## How a battery-less chip talks: inductive coupling

This is **passive RFID**, and the trick that makes it work is the same physics as a transformer or a wireless toothbrush charger: *inductive coupling*.

When the vet waves the handheld scanner over Joule's shoulder, the scanner isn't listening first. It's **transmitting** — pushing an alternating current through its own coil, which throws out an oscillating magnetic field at **134.2 kHz**. That field is the whole power supply for the chip.

The chip's copper coil sits in that field. A changing magnetic field through a coil *induces* a current in it — that's Faraday's law, the bedrock of every electric motor and generator. So the scanner's field, washing over the chip's antenna, generates just enough current to wake the silicon up. The scanner literally powers the chip across a few centimeters of air and cat. No contact, no battery, no plug.

Once it has power — and only then — the chip does its one trick. It sends its number back. But it doesn't have a transmitter of its own to do that; it has no power to spare for one. Instead it does something subtler called **load modulation**: it switches a load across its own coil on and off in the pattern of its ID bits. Each switch tugs, faintly, on the magnetic field the scanner is still generating — like very lightly resisting a swing someone else is pushing. The scanner feels those tiny tugs as a flicker in the current *it's* driving, and decodes the flicker back into the 15 digits.

![How a passive microchip is read by inductive coupling. The scanner drives an alternating current through its coil, radiating a 134.2 kHz magnetic field. The field passes through the chip's copper antenna coil and induces a current that powers the otherwise dead silicon. The powered chip then switches a load across its coil in the pattern of its ID bits, which perturbs the scanner's own field, and the scanner reads those perturbations back as the 15-digit number. No battery in the chip; the scanner powers it across a few centimeters of air.](../../assets/blog/joule-arrives-inductive-coupling.svg)

So the conversation is one-sided in a way I find genuinely elegant. The scanner is both the power station and the only thing that hears the answer. The chip is a passenger that wakes up, says its name when shouted at from a few centimeters away, and goes back to sleep. That few-centimeters range isn't a flaw to be engineered away — it falls directly out of the physics. The strength of the inducing field drops off steeply with distance, so by the time you're a hand's width away there isn't enough energy reaching the coil to power the chip at all. **A passive tag with no battery cannot have range.** The two ideas are the same idea.

## The number is a key, not a record

The second thing I assumed wrong: I figured the chip stored Joule's name, my phone number, maybe her shots. It stores none of that. It stores **one number** and nothing else.

![The microchip ID is a key into a registry database, not the record itself. On the left, the implant holds a single write-once number — 985 112 005 678 901 — and no personal data at all. An arrow labeled look up the number points to the right, where a registry database such as 24PetWatch holds the real record: the pet's name (Joule), owner (Luke), phone, address, and vet. The caption notes that moving house or changing a phone number means updating the database row, never the chip.](../../assets/blog/joule-arrives-id-as-key.svg)

The 15 digits are a **key into a database**, exactly the way a primary key works in any system I've ever built. The actual record — my name, my number, Joule's details — lives in a registry the shelter enrolled her in (hers is 24PetWatch). When a vet or shelter scans a found animal, they read the number off the chip, then phone or web-lookup the registry that owns that number to reach the owner.

I like this design. It's the right one. Putting only an opaque key on the implant means:

- **The implant never goes stale.** I move, I change my phone number, I rehome her — I update the registry, never the chip. The chip is write-once and that's fine, because it was never the source of truth.
- **There's no personal data riding around in Joule.** Anyone with a scanner reads a meaningless number, not my home address. The privacy boundary is the registry login, where it belongs.

The catch is the same catch as any key-plus-lookup system: it's only as good as the row it points to. A chip whose registry entry was never filled in, or still lists the breeder, or points at a phone number from two moves ago, reads back a perfect number that resolves to nobody reachable. The chip can't be out of date; the *database* can, and that's the failure mode that actually loses pets. So the real task isn't the implant — it's mundane: register the number to me, and keep the contact info current. Did it last night while Joule judged me from the bookshelf.

## The bit I keep coming back to: this is not a tracker

I want to hammer this because the pet-tech aisle actively muddies it, and I'd half-muddied it myself. **A microchip cannot tell me where Joule is.** Not roughly, not "last seen," not at all.

Walk back through the mechanism and it's obvious why. The chip has no power until a reader is pressed almost against it. It has no GPS, no cellular, no Wi-Fi, no clock, no memory of where it's been. It does precisely one thing — recite a number into a reader held a few centimeters away — and only when that reader does the work of powering and interrogating it. If Joule slips out the door and is two streets over, the chip is dark and silent, indistinguishable from a grain of rice, until some human catches her, takes her somewhere with a scanner, and waves it over her shoulder.

That's the line that matters, said plainly:

> A microchip identifies a **found** pet. It does not locate a **lost** one.

![Identifier versus tracker — two different jobs. Left, the microchip: a passive chip that stays dark until a found pet is physically scanned at close range, answering only the question who does this animal belong to. Right, a GPS tracker: a battery-powered, network-connected collar device that continuously reports its own location to answer where is my pet right now. A microchip is reactive identity at a few centimeters; a tracker is active location across a network. The chip cannot do the tracker's job, and no firmware update will ever change that.](../../assets/blog/joule-arrives-id-vs-tracker.svg)

A **tracker** is the opposite animal in every respect. It has a battery, so it can act on its own. It has a radio that reaches a network — GPS to know where it is, cellular or BLE to report it. It pushes its location *out*, continuously, without being asked. That's a whole different device with a whole different bill of materials, and it's exactly what I was weighing with [Tagg's cellular collar against Whistle's BLE-and-Wi-Fi puck](/blog/tagg-vs-whistle-cellular-vs-ble-base-station/) last fall — both of them battery-fed, network-talking things you charge every few days. The microchip is none of that. It's the cheap, permanent, set-and-forget *identity* layer; a tracker is the expensive, power-hungry, maintained *location* layer. Joule has the first. If I ever want the second, that's a collar I buy and recharge, not anything you implant.

Conflating the two isn't pedantry — it sets people up to lose pets. Plenty of owners believe a chip means their cat can be located if it bolts, skip the collar tag, and only discover at the worst possible moment that "chipped" never meant "trackable." So I'm writing it down for myself in the bluntest form: the chip is insurance for *getting her back if someone finds her*, not a way to *find her myself*.

## The one annoyance: which frequency is in there

The one genuinely messy part of pet microchips in the US is frequency. Joule's chip runs at **134.2 kHz**, the international standard set by ISO 11784/11785 (which also defines the FDX-B encoding the number rides on). Most of the world standardized on 134.2 kHz years ago. The US dragged.

For years US chips were sold at **125 kHz** and **128 kHz** instead — the old AVID and HomeAgain implants. The problem is the obvious one: a scanner tuned to power and read 134.2 kHz won't necessarily wake a 125 kHz chip, because inductive coupling is tuned to a frequency. Scan a pet on the wrong frequency and you get nothing — not a wrong answer, just silence, which reads exactly like "no chip." A genuinely chipped animal can come back unchipped to a single-frequency reader.

![Why the chip's frequency matters. On the left, a single-frequency scanner tuned only to 134.2 kHz is held over an old 125 kHz chip; the link is broken with a red cross and the result reads as no chip, so a chipped pet looks unchipped. On the right, a universal scanner that sweeps 125, 128, and 134.2 kHz links successfully to either an old 125 kHz chip or a current 134.2 kHz one, marked with a green check — the responsible-shelter standard now. The caption notes that inductive coupling is tuned to a frequency, so scanning on the wrong one returns silence, not a wrong answer.](../../assets/blog/joule-arrives-frequency-mismatch.svg)

| Implant | Frequency | Encoding | Era |
|---|---|---|---|
| ISO chips (current AVID, HomeAgain) | 134.2 kHz | ISO FDX-B | current |
| HomeAgain (older) | 125 kHz | proprietary | pre-2007 |
| AVID legacy | 125 kHz | proprietary | pre-2007 |
| AVID Friendchip | 128 kHz | proprietary | legacy |

The fix that's now standard is the **universal (forward- and backward-reading) scanner** — a reader that sweeps multiple frequencies so it can wake an old 125 kHz chip or a current 134.2 kHz one and not miss either. Pushed along after AVID and others were prodded to make 134.2 kHz chips detectable, shelters and vets moved to universal scanners over the last few years; that's the equipment a responsible shelter uses now, and it's why the frequency split is more historical headache than live danger today.

Joule's a kitten with a current ISO chip, so none of this bites her directly. But it's the kind of fragmentation I notice as an engineer, because the moment anyone builds a *product* that reads pet chips — a feeder that knows which cat showed up, a cat door that only lets the resident in — that product has to cope with whatever chip frequency the animal happens to carry. The standard finally exists; the installed base of old implants is the long tail.

## What I'd tell someone with a new pet

Stripping it to what actually matters, now that I understand the thing:

- **Get the chip, but it's table stakes, not a safety net.** It's cheap, permanent, and battery-free — there's no reason to skip it. Just don't mistake it for protection it can't provide.
- **Register the number to *you*, and keep it current.** The implant is only a key; the registry row is the part that brings a pet home, and it's the part that silently rots when you move or change numbers. This is the only ongoing maintenance, and it's the one people skip.
- **A chip is not a tracker — if you want location, that's a separate device.** A collar tag with your phone number still does real work the chip can't (a finder reads it without a scanner), and if you genuinely need to *locate* a pet, that's a battery-powered GPS collar you charge, not the implant.
- **Ask whether your vet/shelter uses a universal scanner.** A single-frequency reader can miss an older chip and call a chipped animal blank.

## What's next

The chip settles the *identity* question for Joule — passively, permanently, with no maintenance past keeping one database row honest. The far more interesting question for an indoor cat is whether identity can be made to *do* something: a door or a feeder that reads the same chip already in her shoulder and acts on it. That's where passive RFID stops being a filing system and starts being a sensor. There's a product I've got my eye on for exactly that — once Joule's old enough to earn outdoor privileges, it gets its own post.

Welcome home, Joule. You came pre-chipped, which means in the database, at least, you're already ours.
