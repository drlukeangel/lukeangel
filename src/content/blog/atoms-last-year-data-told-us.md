---
title: "Atom's last year — what the data told us, and what I missed"
date: 2024-12-04T19:00:00-05:00
category: craft
tags:
  - pet-iot
  - smart-pet-health
  - whistle
  - retrospective
  - reflection
notebook: pet-iot-field-guide
notebookOrder: 35
excerpt: "Atom passed in October — 11 years old, mitral valve disease, peaceful at home. Read the Whistle Health data for signals I missed. Scratching drifted up 40%. I watched activity. Wrong metric."
pullquote: "I read the data for six months. The signal was there. I was watching the wrong metric. The metric a healthy dog tracks is not the same metric a sick dog tracks. Different dashboards for different stages."
cover: "../../assets/blog/atoms-last-year-data-told-us-cover.svg"
coverAlt: "A year of a dog's data drawn as two lines over a single baseline. A dark activity line starts high and slopes gently down, fading to a quiet endpoint — the metric that was watched. A faint orange line rises quietly underneath it and climbs at the end — the scratching trend that went unnoticed. The two lines cross near the end. A soft, low-contrast silhouette of a seated Labrador watches from the left."
---

Atom passed October 16, 2024. Peacefully at home with the family. He was 11 years old. The diagnosis confirmed at the September vet appointment: end-stage degenerative mitral valve disease, the standard older-Lab cardiac progression.

This is the post I've been not-writing for weeks.

## What the data showed, in the last six months

I have eleven years of Whistle data on Atom — [activity from the very first puck in 2013](/blog/atom-arrives-whistle-activity-monitor-launches/), and the last few years on a [Whistle Health collar](/blog/whistle-health-gps-plus-vitals-arrives/) that adds the behavioral metrics: sleep, eating, drinking, licking, scratching. None of it is *vitals* — there's no heart-rate or temperature sensor in a Whistle; it's all one accelerometer and a pile of pattern-recognition. But it's eleven years of a real dog's behavior, and I went back through everything from June 2024 forward looking for the signal I missed.

**What I was watching:**
- **Activity minutes**: gradual decline, ~10% per month from June onward. I read it as the expected slow fade of an old dog with early-stage cardiac disease. It's the number Whistle puts front and center, so it's the number I looked at.
- **Sleep**: longer, more fragmented through late summer. Consistent with an aging dog; nothing that screamed at me.
- **Eating / drinking**: roughly stable, a slight dip in appetite in September.
- **Wellness score**: noisy. Useless. As [I documented](/blog/behavioral-ai-on-pet-cameras-bullshit-and-real/), the composite "wellness score" is a vanity metric — it smooths over exactly the divergences you'd want it to surface.

I thought I was watching the right things. They told me Atom was declining gracefully through summer — slower, sleeping more, eating a touch less. Nothing alarming. The cardiac vet check in September confirmed the disease progression but said his quality of life was still good.

## What I missed

**Scratching frequency drifted up 40% from June.**

I had this data. Whistle tracks scratching events per day via accelerometer pattern recognition. Healthy Atom averaged 4-7 scratches per day. From June 2024 onward, this drifted upward:

| Month | Average scratches/day | Trend |
|---|---|---|
| Apr 2024 | 6.2 | baseline |
| May 2024 | 5.8 | baseline |
| Jun 2024 | 7.4 | +20% |
| Jul 2024 | 8.6 | +40% |
| Aug 2024 | 9.1 | +47% |
| Sep 2024 | 11.3 | +82% |
| Oct 2024 (partial) | 13.4 | +116% |

![Two trends over the same six months, drawn on one timeline from April to October. A dark line for activity starts high in spring and slopes steadily down through summer into October — the number that was watched, on the app's front page. An orange line for scratching starts low and climbs, gently at first, then steeply, ending up 116 percent above baseline by October. The two lines cross in early September, marked with a dashed line for the vet diagnosis. A caption reads: both lines were in the app the whole time; I only ever looked at one of them.](../../assets/blog/atoms-buried-signal-two-trends.svg)

That's a clear signal. **Why did I miss it?**

Because I was looking at the *wrong screen*. Whistle Health leads with activity — minutes, goal rings, a comparison to other dogs. That's the hero number, the one the app opens to. The behavioral signals — scratching, licking, drinking — live a tap deeper, in a "health" view I rarely opened because the front page kept telling me Atom was a slightly-less-active version of a normal dog. The whole product is optimized to answer "is the dog active?" — which is the question for a healthy adult dog.

![The app's screen hierarchy, drawn as two phones. The home screen leads with a large activity ring labelled ACTIVITY — the hero number the app opens to every time — with smaller rows beneath. An arrow labelled "one tap deeper, rarely opened" points to a second HEALTH screen showing a list of behavioral signals, with scratching highlighted and rising at the top, then licking, drinking, and sleep. A side note explains the hierarchy answers one question — "is the dog active?" — the right question for a healthy adult dog and the wrong one for a failing heart.](../../assets/blog/atoms-dashboard-hierarchy.svg)

Atom wasn't a healthy adult dog anymore. He was a senior dog with progressing cardiac disease. The relevant questions had shifted.

## What the scratching trend actually meant

In retrospect, talking to the cardiac vet: increased scratching in senior dogs with mitral valve disease can be a sign of **cardiac edema** — fluid accumulation causing skin discomfort or itching as a downstream symptom. Not a primary diagnostic, but a correlated signal.

If I'd surfaced the scratching trend in June or July when it started clearly elevating, we might have:
- Started diuretics earlier (to manage the edema).
- Adjusted activity to be even gentler.
- Gotten an earlier echo to track left atrial size.

Would it have changed the outcome? Probably not — Atom's disease was already mid-stage by then; the progression was going to play out. But we might have given him more comfort in the last three months.

This is the honest assessment. The data was there. I wasn't watching it.

## The lesson — different dashboards for different stages

For pet-IoT specifically: **the metrics a healthy dog tracks are not the same metrics a sick dog tracks.** A primary dashboard optimized for "fitness" buries the symptoms that matter for "health."

What I want to exist:

- A **senior dog mode** in Whistle Health that promotes scratching, licking, drinking, and sleep-fragmentation to the front page and demotes activity (which says less and less as the dog ages).
- **Age-aware baselines**. Atom's "normal" at 4 years is not his "normal" at 10 years. The trend detection should compare against age-cohort baselines.
- **Vet-shared dashboards** with annotation. When the cardiac vet says "watch scratching frequency," that observation should flow into the Whistle app as a priority metric until the vet says otherwise.

None of these exist. They're 18-24 months of product roadmap. Maybe Whistle ships them. More likely, a smaller competitor builds them and Whistle copies.

## The Mars-owned recommendations layer, during Atom's decline

For the record, here's what Mars's recommendation engine surfaced as Atom declined:

- **June**: "Atom's activity is trending lower. Consider increased outdoor time."
- **July**: "Atom's activity has dropped for a third straight week. A cardiovascular-supporting diet may help (Royal Canin Cardiac Care)."
- **August**: "Atom is showing signs of decreased activity. Talk to your vet about senior dog wellness."
- **September**: After the vet diagnosis: "Royal Canin Renal Support might help with cardiac-related kidney strain."
- **October**: Silence. The app didn't acknowledge Atom's decline in any meaningful way.

The recommendations were structurally biased toward Mars-portfolio products throughout. Atom's actual vet recommended a completely different prescription cardiac diet (Hill's, a competitor). The data flow Mars wanted me to follow would have led me to lower-quality care.

![The same decline signal, fed to two different parties, produced two different prescriptions. From the Whistle app, Mars's recommendation engine surfaced Royal Canin Cardiac Care in July, Royal Canin Renal Support in September, then silence in October — all Mars-portfolio brands. The cardiac vet, working from the same diagnosis, prescribed a Hill's prescription cardiac diet, a competitor's product matched to the actual condition. The engine optimized for what Mars sells, not for what Atom needed.](../../assets/blog/atoms-mars-recommendations.svg)

## What I'd do differently

If I could redo Atom's 2024:

1. **Set up custom dashboard views** for senior-dog metrics. Whistle allows this; I never configured it. Default views are designed for marketing-engagement, not for health-monitoring.
2. **Weekly review of the behavioral metrics** (scratching, licking, drinking, sleep) alongside the activity number. 10 minutes of looking at the trend graphs each week, on the screen I wasn't opening.
3. **Earlier vet consultation** when any secondary metric drifted >20%. Even if I didn't know what scratching meant, escalating to the vet would have surfaced the connection.
4. **Disable Mars-owned recommendations** in the app entirely. They were noise at best, misleading at worst.

## Quark and the future

Quark is 3 now. Active, healthy, on Fi for activity tracking. No health collar yet — he's nowhere near the age where the behavioral trend lines start meaning anything.

But the lesson is going forward. When Quark gets to 8 or 9, I'll add a health-monitoring collar — and this time I'll set up the behavioral view as my home screen on day one, not discover it in hindsight. I'll know which signals to watch, and that the front page isn't where they live.

This is the value of having the [eleven years of pet-IoT documentation](/notebooks/pet-iot-field-guide/) — the next dog's health monitoring is going to be informed by what I learned with Atom.

It doesn't make this easier. But it makes it useful.

## Closing

Atom was a good dog. Eleven years. The data is documented, the lessons are written, the next dog will get better health monitoring because of him.

The smart-pet-health category is real. The dashboards aren't quite right yet. The signals are there if you know where to look.

I miss him.
