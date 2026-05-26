---
title: "Litter-Robot multi-cat detection — Joule vs Boson"
date: 2020-10-19T16:00:00-04:00
category: tools
tags:
  - pet-iot
  - smart-pet-health
  - litter-robot
  - cat
  - multi-cat
notebook: pet-iot-field-guide
notebookOrder: 23
excerpt: "Four months with Joule + Boson sharing a Litter-Robot. Pulled the CSV export and analyzed entry weights. Joule (9.5 lb) and Boson (3.5 lb) separate 90% of the time. The other 10% is interesting."
pullquote: "Multi-cat attribution by weight works when the cats are weight-different. Litter-Robot's data plus a 30-line Python script give per-cat analytics today, despite the official app not supporting it."
cover: "../../assets/blog/litter-robot-multi-cat-detection-weight-attribution-cover.svg"
coverAlt: "A self-cleaning litter globe with a weight readout that fans out into two cat profiles of different sizes — one heavy, one light — the entry weight sorting each visit to the right cat."
---

Four months of Joule + Boson sharing the same Litter-Robot III Connect. The official app still doesn't do per-cat attribution. The data is there in the entry-weight column; just no UI to slice it.

Pulled the CSV export, wrote 30 lines of Python, and now have per-cat litter analytics.

## The data export

Litter-Robot's iOS app has a "download history" feature that emails you a CSV. One row per cycle:

```csv
timestamp,                  cycle_time_sec, weight_lb, drawer_status
2020-10-15T06:42:13-04:00,  19,             9.5,       OK
2020-10-15T08:17:55-04:00,  18,             3.7,       OK
2020-10-15T10:31:02-04:00,  20,             9.4,       OK
2020-10-15T13:18:44-04:00,  18,             3.6,       OK
2020-10-15T16:55:21-04:00,  19,             9.6,       OK
2020-10-15T18:48:00-04:00,  18,             3.7,       OK
2020-10-15T21:12:34-04:00,  20,             9.5,       OK
2020-10-15T22:30:50-04:00,  18,             3.9,       OK
```

Five visits at ~9.5 lb (Joule), three visits at ~3.7 lb (Boson). The weight gap is wide enough that attribution is obvious.

![A histogram of every logged entry weight over four months. The visits cluster into two clean peaks — a tall one near 9.5 lb (Joule) and another near 3.7 lb (Boson) — separated by a wide empty gap with almost nothing in it. A small scatter of ambiguous readings sits in the middle, caused by the cat moving during the weigh. The clean separation between the two peaks is exactly what makes weight-based attribution reliable today.](../../assets/blog/litter-robot-weight-histogram.svg)

## The Python script

```python
import csv
from datetime import datetime
from collections import defaultdict

# Joule's stable adult weight band: 9.0 - 10.0
# Boson's growing kitten weight (Oct 2020): 3.5 - 4.5
def attribute(weight):
    if 9.0 <= weight <= 10.0:
        return "joule"
    if 3.0 <= weight <= 5.0:
        return "boson"
    return "ambiguous"

visits = defaultdict(list)
with open("litter-robot-history.csv") as f:
    for row in csv.DictReader(f):
        w = float(row["weight_lb"])
        cat = attribute(w)
        ts = datetime.fromisoformat(row["timestamp"])
        visits[cat].append((ts, w, int(row["cycle_time_sec"])))

for cat, vs in visits.items():
    print(f"{cat}: {len(vs)} visits, avg weight {sum(v[1] for v in vs)/len(vs):.2f} lb")
```

30 lines. Outputs per-cat counts + average weights. I run it weekly and dump the results into a tiny dashboard in [Home Assistant](/blog/first-home-assistant-install-yaml-configs/).

## The four-month results

```
joule:     387 visits, avg 9.45 lb
boson:     412 visits, avg 3.61 lb (growing — early data 3.1, late data 4.2)
ambiguous:  18 visits  (3.6% — overlap or unusual weights)
```

Two cats sharing one Litter-Robot. 96.4% attribution accuracy without a line of per-cat-aware code from AutoPets, the company that makes it.

**The ambiguous 3.6%** are interesting:
- A few "weight = 5.5 lb" visits. Probably Boson during a growth spurt + the weight-during-rotation hesitation (cat moved during measurement).
- Three "weight = 8.0 lb" visits. Possibly Joule when she was holding still on the way in, or Boson piggybacking after Joule.
- Zero "both cats simultaneously" visits — they apparently never both use the box at the same time (cats hate audiences).

## The attribution problem when cats are weight-similar

If Joule and Boson were the same weight, this wouldn't work. The weight gap (9.5 vs 3.5) is what makes attribution easy. As Boson grows, she'll approach adult weight (maybe 8-10 lb when full grown). At that point, weight-only attribution becomes unreliable.

The fallback strategy:
- **Visit duration**: Joule's average is 62 sec, Boson's is 41 sec (kittens are faster). Some discrimination here even at adult weight.
- **Visit timing patterns**: Joule has consistent morning + late-evening visits. Boson is more random. Time-of-day distribution can supplement.
- **Eventually, a RFID upgrade**: if Whisker added an RFID reader at the entry (~$5 BOM addition), per-cat identity would be definitive.

When Boson reaches adult weight, the script will need duration + timing supplements. That's a 2021 problem.

## Why per-cat analytics matters medically

A four-month trend by cat reveals patterns that combined data hides:

**Joule (this month vs three months ago):**
- Average visits/day: 3.2 → 3.4 (slight uptick)
- Average duration: 62s → 58s (slight decrease)
- Verdict: Within normal range, no action.

**Boson (this month vs three months ago):**
- Average visits/day: 3.4 → 4.5 (significant uptick — kittens drink more water, eat more, output more — expected as she grows)
- Average duration: 39s → 42s (stable)
- Verdict: Expected for kitten development.

If Joule's pattern shifted to 6 visits/day with 20s duration each, that's a **strong UTI signal** — frequent + brief is the classic urinary-tract-infection presentation. The per-cat baseline lets me detect that. The aggregated multi-cat data would hide it.

![Why per-cat baselines catch what the combined feed misses. In the aggregated view, both cats' visits are summed into one daily number; a spike in one cat's visits gets diluted by the other cat's steady pattern and looks like normal noise. Split by cat, Joule's line jumps from a flat ~3 visits a day to 6 short visits — the frequent-and-brief shape of a urinary-tract infection — standing out clearly against her own baseline. The signal only exists once each cat is measured against itself.](../../assets/blog/litter-robot-per-cat-uti-signal.svg)

## What I want AutoPets to add

- **Native per-cat attribution** in the app, using weight bands the user defines.
- **Anomaly alerts**: "Joule's visits dropped 40% vs last month, consider vet attention."
- **Weight trend graphs** per cat over time.
- **A data API** so I don't have to scrape CSVs.

Litter-Robot 4 is rumored for 2021-2022 and supposedly has multi-cat features built-in. We'll see.

## What's next

End-of-year review in two months. The Petnet collapse + Boson + multi-cat dynamics + Fi's 14-day battery are the year's themes. 2020 has been a heavy year for pet-IoT lessons.
