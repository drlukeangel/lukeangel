---
title: "Petnet SmartFeeder — a long-term review, and why a cloud-dependent feeder scares me"
date: 2017-03-26T15:00:00-04:00
category: tools
tags:
  - pet-iot
  - petnet
  - smart-feeder
  - wifi
  - cloud-dependency
notebook: pet-iot-field-guide
notebookOrder: 11
excerpt: "Sixteen months on the original Petnet SmartFeeder. It works — until the cloud doesn't, and twice this winter it didn't, and my animals went unfed. The schedule lives on Petnet's servers, not the device, which means the product is only as reliable as the company's uptime. Here's the architecture, the two outages, and the design that would have survived them."
pullquote: "A feeder that needs a cloud to dispense food is a bet on the vendor's solvency. When the server is down at midnight, the cat goes hungry — and the device is only as reliable as a company you've never met keeping its servers up."
cover: "../../assets/blog/petnet-smart-feeder-long-term-review-cover.svg"
coverAlt: "A kibble feeder whose dispense command travels up to a cloud and back down — with the cloud link broken, so the schedule never reaches the hopper and the bowl stays empty."
---

The original Petnet SmartFeeder has been running in my kitchen for sixteen months now, since it arrived in late 2015. It feeds Atom twice a day, 3/4 cup of kibble, and tops up Joule's bowl once a day at 1/4 cup. That's long enough — and it's been eventful enough this winter — to write a real review. The short version: it works, right up until the moment it depends on something I can't control, and then it doesn't, and the failure mode lands on the animals.

## What the SmartFeeder actually is

**Hardware:**
- A plastic hopper feeding a portion-controlled auger into a bowl, about a 6-lb kibble capacity.
- 2.4 GHz Wi-Fi.
- Internal weighing — it knows how much it dispensed, not just that it ran.
- Status LEDs and a physical manual-feed button on the unit.
- Wall-powered, no meaningful battery backup.

**Software and service:**
- An iOS/Android app for schedule, portion size, and manual feed.
- Every control path routes through Petnet's cloud. The feeder does not operate without internet.
- The schedule lives in Petnet's cloud, not on the device.
- An activity log: each dispense recorded with a timestamp and portion.

**Cost:** a one-time ~$149 at launch, no subscription. Petnet's cloud is "free" the way these things always are — paid for out of hardware margin, which is exactly the part that worries me below.

## The architecture problem, said plainly

Here's the data flow for the simple act of feeding Atom his breakfast:

```
scheduled time arrives
  → Petnet cloud fires the trigger
  → cloud sends the dispense command down to the feeder
  → feeder runs the auger
  → Atom eats
```

Read that again and notice where every step lives. The schedule lives in the cloud. The trigger fires in the cloud. The command originates in the cloud. The feeder is a dumb actuator waiting to be told what to do by a server in someone else's data center.

So if the cloud is unreachable, **the feeder does nothing.** Not a degraded mode, not a fallback — nothing. And that's not a hypothetical I'm raising to be clever. It happened twice this winter.

![The Petnet dispense path drawn as a round trip with a single point of failure. At the bottom, the feeder and a bowl; the scheduled-feed trigger travels up to a cloud server, which sends the dispense command back down to run the auger. A break is drawn across the cloud link with a red cross; with the link severed the command never returns, the auger never runs, and the bowl stays empty. A note marks that the schedule and the trigger both live in the cloud, not on the device, so an outage means no feed at all.](../../assets/blog/petnet-cloud-dependency-path.svg)

## The two outages

**December 2016, about six hours.** Petnet's servers hit what they later called a "database migration issue." For six hours starting around 11 PM, no scheduled feeds fired. The 6 AM breakfast didn't happen. I found out at 7:30 when Atom was sitting beside an empty bowl staring at me, which he never does. Fed them by hand; the service came back around 9. No notification from Petnet during any of it — I diagnosed it myself.

**February 2017, about three hours overnight.** An "infrastructure event," cloud-wide. The feeder's status flipped to "offline" in the app, the 6 AM feed didn't fire, and I caught it at 6:45 and fed manually.

Both times: no proactive word from Petnet. The app showed "feeder offline" with no explanation, no ETA, and — the part that actually matters — no "we did not fire your scheduled feed, please feed manually" alert. The device knew something was wrong and told me nothing useful.

![Two winter outages on one timeline. December 2016: Petnet's cloud went down for roughly six hours starting around 11 PM after a database-migration issue, the 6 AM feed never fired, and I found the empty bowl at 7:30 and fed Atom by hand. February 2017: a cloud-wide infrastructure event ran a few hours overnight, the 6 AM feed skipped again, and I caught it at 6:45. Both outage windows are shaded red with a crossed-circle on the missed 6 AM feed. A caption notes that both times the app showed only "offline" with no missed-feed alert, so I diagnosed each one myself.](../../assets/blog/petnet-outage-timeline.svg)

## What a robust design would have done

A feeder built to survive its own vendor's bad night looks like this:

1. **The schedule lives on the device.** The cloud is for *editing* the schedule; the device executes it from local storage.
2. **Last-known schedule survives offline.** If the cloud is unreachable, keep feeding at yesterday's times and portions. A feeder going quiet is the one failure it must never have.
3. **A watchdog alert.** If a feed *should* have fired per the local schedule and the device can't confirm it dispensed — jam, empty hopper, dead motor — push a critical notification. "Offline" is not that alert.
4. **A manual override that bypasses all of it.** Petnet has the physical button, which is the one thing it got right — but you have to be standing there.

Petnet does none of the first three. Cloud-only schedule, no local fallback, no missed-feed alert. The entire reliability of feeding my animals rests on a startup's server uptime.

![Two feeder architectures side by side. On the left, the cloud-dependent design: the schedule and trigger live in the cloud, the device is a dumb actuator, and a severed cloud link means no feed. On the right, the device-resident design: the schedule and trigger live on the device with the cloud only used to edit it, so a severed link still feeds from the last-known schedule, and a watchdog pushes a missed-feed alert. A caption notes the difference is where the schedule lives — and that it decides whether an outage is an inconvenience or a hungry animal.](../../assets/blog/petnet-cloud-vs-local-architecture.svg)

## The cat-versus-dog risk asymmetry

For Atom — 70-lb dog, eats twice a day — a missed feed is uncomfortable, not dangerous. He's hungry for a few hours and that's the end of it.

For Joule it's different. Cats that stop eating for a stretch are at risk of hepatic lipidosis, a serious liver condition that can set in after a day or two without food — and it's worse in an overweight cat. A six-hour outage isn't a medical event. But the *category* of failure — a feeder that can silently stop feeding a cat — has a higher stake than the cheerful marketing admits. The risk is asymmetric: a device that occasionally skips a meal is a nuisance for a dog and a creeping danger for a cat.

## What I'm doing about it

- **A non-cloud backup feeder running in parallel.** A plain battery-powered mechanical timer feeder — no Wi-Fi, no app, no cloud, nothing to go offline — set to drop Joule's portion a few hours after the Petnet feed *should* have fired. If Petnet missed it, the dumb feeder catches it. Belt and suspenders, and the suspenders don't phone home.

![The backup architecture drawn as two feeders over one cat. On the left, the Petnet feeder hangs off a cloud schedule; the link down to it is broken with a red mark and its bowl is marked "6 AM feed missed." On the right, a mechanical-timer feeder runs from an on-device clock with no Wi-Fi; its link is solid and its bowl is marked "portion drops on time." A dashed line from the missed Petnet feed and a solid green arrow from the mechanical feeder both point at Joule, who gets fed regardless. A caption notes the dumb feeder catches every feed the smart one drops, because the one that fed her never needed a server.](../../assets/blog/petnet-backup-feeder-redundancy.svg)
- **A morning watch routine** until I trust it again: I check the feed log at 7 AM, and if the 6 AM feed didn't fire I feed by hand and note the date.
- **Migrating off cloud-only feeders the moment a device-resident one ships.** As of today I don't know of one that executes its schedule locally. The category needs it.

## The forecasting question

Two outages in one winter is a trend, not bad luck. Petnet is, by every account I can find, a startup burning cash and looking for its next round, and cloud reliability is exactly the thing that slips when the money gets tight and the ops team gets thin. I'd put **better-than-even odds on a multi-day Petnet outage within the next year or two** — long enough that it stops being an inconvenience and becomes the story the whole "smart feeder" category gets judged by.

If that day comes, somebody's cat doesn't eat for days, and the cautionary tale every connected-device pitch deck reaches for over the next decade will have Petnet's name on it. I hope I'm wrong. Watching the pattern, I'm not optimistic.

## What's next

I finally have a Furbo on the shelf — the treat-tossing dog camera everyone's been waiting on — and I'm living with it for a few weeks before I write it up. First impressions after a month of Atom triggering it from across the room are coming next.

For now the Petnet runs under supervision, which rather defeats the word "smart." A device I have to babysit every morning to make sure it did the one job it has is not the future I was promised.
