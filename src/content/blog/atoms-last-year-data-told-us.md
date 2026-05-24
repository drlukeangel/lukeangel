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
cover: "../../assets/blog/atoms-last-year-data-told-us-cover.png"
coverAlt: "Atom's last year — what the data told us, and what I missed"
---

Atom passed October 16, 2024. Peacefully at home with the family. He was 11 years old. The diagnosis confirmed at the September vet appointment: end-stage degenerative mitral valve disease, the standard older-Lab cardiac progression.

This is the post I've been not-writing for weeks.

## What the data showed, in the last six months

I have nine years of Whistle Health data on Atom. Six years of [activity tracking](/blog/atom-arrives-whistle-activity-monitor-launches/), three years of [vitals data](/blog/whistle-health-gps-plus-vitals-arrives/). I went back through everything from June 2024 forward looking for the signal I missed.

**What I was watching:**
- **Resting heart rate**: stayed within 5% of baseline through August. Started elevating noticeably in September (~12% above baseline).
- **Activity minutes**: gradual decline, ~10% per month from June onwards. Consistent with the early-stage cardiac decline.
- **Respiratory rate**: stable through July, started elevating in August (~15% above baseline).
- **Temperature**: stable throughout.
- **Wellness score**: noisy. Useless. As [I documented](/blog/behavioral-ai-on-pet-cameras-bullshit-and-real/), wellness scores are vanity metrics.

I was watching the right primary metrics. They told me Atom was declining gracefully through summer. Nothing alarming. Cardiac vet check in September confirmed the disease progression but said his quality of life was still good.

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

That's a clear signal. **Why did I miss it?**

Because I was looking at the *wrong dashboard*. Whistle Health's primary view shows activity + resting heart rate + respiratory rate + temperature. The behavioral metrics (scratching, licking, drinking) are in a secondary view I rarely opened. The dashboard was optimized for "is the dog active?" — the question for a healthy adult dog.

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

- A **senior dog mode** in Whistle Health that promotes scratching, drinking, respiratory rate, and licking to the primary view, demotes activity (which becomes less relevant as the dog ages).
- **Age-aware baselines**. Atom's "normal" at 4 years is not his "normal" at 10 years. The trend detection should compare against age-cohort baselines.
- **Vet-shared dashboards** with annotation. When the cardiac vet says "watch scratching frequency," that observation should flow into the Whistle app as a priority metric until the vet says otherwise.

None of these exist. They're 18-24 months of product roadmap. Maybe Whistle ships them. More likely, a smaller competitor builds them and Whistle copies.

## The Mars-owned recommendations layer, during Atom's decline

For the record, here's what Mars's recommendation engine surfaced as Atom declined:

- **June**: "Atom's activity is trending lower. Consider increased outdoor time."
- **July**: "Atom's resting heart rate has elevated 8%. Consider a cardiovascular-supporting diet (Royal Canin Cardiac Care)."
- **August**: "Atom is showing signs of decreased activity. Talk to your vet about senior dog wellness."
- **September**: After the vet diagnosis: "Royal Canin Renal Support might help with cardiac-related kidney strain."
- **October**: Silence. The app didn't acknowledge Atom's decline in any meaningful way.

The recommendations were structurally biased toward Mars-portfolio products throughout. Atom's actual vet recommended a completely different prescription cardiac diet (Hill's, a competitor). The data flow Mars wanted me to follow would have led me to lower-quality care.

## What I'd do differently

If I could redo Atom's 2024:

1. **Set up custom dashboard views** for senior-dog metrics. Whistle allows this; I never configured it. Default views are designed for marketing-engagement, not for health-monitoring.
2. **Weekly review of secondary metrics** (scratching, licking, drinking) in addition to primary vitals. 10 minutes of looking at trend graphs each week.
3. **Earlier vet consultation** when any secondary metric drifted >20%. Even if I didn't know what scratching meant, escalating to the vet would have surfaced the connection.
4. **Disable Mars-owned recommendations** in the app entirely. They were noise at best, misleading at worst.

## Quark and the future

Quark is 3 now. Active, healthy, on Fi for activity tracking. No vitals device — he's still in the adult-vs-senior boundary; the vitals data wouldn't be particularly useful yet.

But the lesson is going forward. When Quark is 8-9 years old, I'll add a vitals device. I'll configure a senior-dog dashboard from the start. I'll know which secondary metrics to watch.

This is the value of having the [eleven years of pet-IoT documentation](/notebooks/pet-iot-field-guide/) — the next dog's health monitoring is going to be informed by what I learned with Atom.

It doesn't make this easier. But it makes it useful.

## Closing

Atom was a good dog. Eleven years. The data is documented, the lessons are written, the next dog will get better health monitoring because of him.

The smart-pet-health category is real. The dashboards aren't quite right yet. The signals are there if you know where to look.

I miss him.
