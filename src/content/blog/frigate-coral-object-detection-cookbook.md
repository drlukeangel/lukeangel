---
title: "Frigate + Coral cookbook — eight months of tuning"
date: 2022-08-14T16:00:00-04:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - frigate
  - object-detection
  - cameras
notebook: smart-home-iot-journey
notebookOrder: 41
excerpt: "Eight months of Frigate tuning. Confidence thresholds, masks, zones, motion masks, retained / discarded events. The cookbook of what to set."
pullquote: "The difference between a useful Frigate setup and a noise-fountain isn't the model. It's the masks and thresholds. The model is the easy part; the YAML tuning is the work."
---

Eight months running Frigate 0.10 → 0.11. Five PoE cameras + one WiFi cam, all routing through one Coral USB. Detection runs at 10 fps per stream. ~150 events per day, ~5 push-notification-worthy.

What I tuned to get from "detects everything" to "detects only what matters."

## Confidence thresholds, the obvious knob

Each Frigate label has two parameters:
- **min_score**: minimum classifier confidence to count as a detection at all.
- **threshold**: minimum cumulative confidence (over multiple frames) to count as an "event."

The defaults are 0.5 / 0.7. I've moved them around per camera, per label:

```yaml
cameras:
  front_porch:
    objects:
      filters:
        person:
          min_score: 0.5    # default
          threshold: 0.75   # bumped — fewer false person events
        car:
          min_score: 0.4    # lower — cars at distance can be partial occlusion
          threshold: 0.7
        package:
          min_score: 0.55
          threshold: 0.7
        dog:
          min_score: 0.5
          threshold: 0.8    # bumped — dog false positives were high
  
  backyard:
    objects:
      filters:
        person:
          min_score: 0.5
          threshold: 0.75
        dog:
          min_score: 0.4    # need to catch the real dog quickly
          threshold: 0.65
        # no car / package — backyard doesn't see them
```

Per-camera tuning matters. The backyard sees one dog (mine) and never sees cars — so dog thresholds are lower (catch faster), and car/package aren't tracked at all.

## Motion masks — kill false motion before detection runs

Frigate uses motion detection (cheap, OpenCV-based) as a pre-filter. Only frames with motion get passed to the Coral for object detection. If you mask out areas that have non-relevant motion (trees, neighbor's fence, a ceiling fan if visible), you save inference cycles.

The trick: motion is also masked per-camera. For the backyard cam, the trees in the back of the lot move constantly in wind. Without masking, every gust triggers detection on a frame that's mostly trees.

```yaml
cameras:
  backyard:
    motion:
      mask:
        - "0,0,0,400,800,400,800,0"  # top 50% (trees + sky) — mask out
        - "650,400,800,400,800,720,650,720"  # neighbor's yard (right edge)
```

Coordinates are pixel coordinates in the detect stream (640×360 in my config — scaled here for readability). The mask is a polygon; everything inside is ignored for motion.

After motion masking: false-motion events on the backyard cam dropped from ~80/day to ~12/day.

## Object masks — kill false detections geometrically

A motion mask prevents inference from running. An **object mask** prevents an object detected in a specific zone from being treated as a real detection.

Example: my driveway. The neighbor's car parks at the curb across the street. Frigate detects it as a "car" — accurate, but I don't care about cars across the street.

```yaml
cameras:
  driveway:
    objects:
      filters:
        car:
          mask:
            - "300,500,600,500,600,720,300,720"  # bottom-left of frame = my driveway
            # The mask is INVERTED for objects: detections OUTSIDE the mask are ignored
            # So: only count cars WITHIN the mask box
```

This took me a while to internalize. The motion mask says "ignore motion HERE." The object mask says "only count objects HERE." Opposite semantics.

## Zones — for "where" automations

A **zone** is a polygon you name. Frigate publishes "object entered zone X" events. Useful for "person walked onto porch" vs "person walked past porch on the sidewalk."

```yaml
cameras:
  front_porch:
    zones:
      on_porch:
        coordinates: "100,300,500,300,500,720,100,720"
        objects:
          - person
      sidewalk:
        coordinates: "0,400,800,400,800,500,0,500"
        objects:
          - person
```

HA automation:

```yaml
- alias: "Person entered porch"
  trigger:
    - platform: mqtt
      topic: frigate/events
      payload: "new"
  condition:
    - condition: template
      value_template: >
        {% set e = trigger.payload_json.after %}
        {{ e.camera == "front_porch" and e.label == "person"
           and "on_porch" in e.current_zones }}
  action:
    - service: notify.mobile_app_luke_iphone
      data:
        title: "👤 Person on porch"
        message: "Detected at {{ now().strftime('%H:%M') }}"
```

"Person on sidewalk" is logged but doesn't notify. "Person on porch" notifies.

## What I track now, per camera

| Camera | person | car | dog | package | other |
|---|---|---|---|---|---|
| Front porch | ✓ | (in zone) | ✓ | ✓ | — |
| Doorbell | ✓ | — | — | ✓ | — |
| Backyard | ✓ | — | ✓ | — | — |
| Side yard | ✓ | — | — | — | — |
| Driveway | ✓ | ✓ (in zone) | — | — | — |
| Garage (WiFi) | ✓ | — | — | — | — |

Total inference load across 6 cameras × 10 fps × ~12 ms per frame on Coral = ~720 ms of Coral time per second. Coral is at ~72% utilization. Headroom for one more camera; would need a second Coral after that.

## What broke me until I figured it out

**The "person" label triggering on trees**:
Frigate's MobileNet model trained on COCO sometimes confuses tree-shadow patterns as "person" at low confidence. Bumping `min_score` for person to 0.55 + adding motion masks on tree regions killed this.

**Headlights triggering "car" at night**:
A car's headlights at distance look like a tiny bright blob. The model classifies the blob as "car" with high confidence. Solution: zone-based car tracking — only count cars in the driveway zone, not in the street-distance.

**The Roomba triggering "person"**:
The first time the Roomba ran while I was out of the house, the indoor pet cam detected it as a "person" with 60% confidence. Got a panicked push notification. Removed indoor person tracking on the pet cam.

**Squirrels triggering "dog"**:
Backyard model thinks squirrels are small dogs. Bumped dog threshold to 0.65 + added "squirrel-sized object" filtering by minimum bounding-box area.

## What's still annoying

- **Frigate stops detecting after the Coral hangs every couple weeks.** Restart fixes it. Could be a USB power issue (the Coral draws ~2W). Going to put it on a powered USB hub.
- **No native re-identification.** Person tracked across the porch cam and then the driveway cam is identified as two different events. Frigate 0.12 promises this; not stable.
- **No license-plate recognition.** Going to try OpenALPR Frigate plugin.
- **No "wait, that's just my kid" recognition.** Face recognition would solve this. Frigate doesn't have it natively; DeepStack or CompreFace integrate but add complexity. Not yet sold on the value.

## What's next

- **A second Coral USB** when Frigate 0.12 with re-id ships.
- **OpenALPR for license-plate recognition** on the driveway.
- **An indoor pet cam** with the Roomba excluded from detection zones.
