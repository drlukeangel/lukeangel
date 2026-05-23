---
title: "Doorbell camera on the Google Home Hub display"
date: 2021-08-08T18:00:00-05:00
category: tools
tags:
  - smart-home
  - smart-home-security
  - cameras
  - doorbell
  - google-home
notebook: smart-home-iot-journey
notebookOrder: 37
excerpt: "Reolink doorbell PoE camera + WebRTC bridge + Google Home Hub display + Frigate-detected person events. When someone rings, every display shows them."
pullquote: "Three platforms (Reolink, Frigate, Google) participating in one experience: when the doorbell button is pressed, every screen shows the visitor in under 2 seconds. That's the smart-home magic that justifies all the YAML."
---

The Reolink doorbell PoE camera arrived in May. Took until August to make the full experience work end-to-end. Notes.

## Hardware

**Reolink Video Doorbell PoE** (RVD-820A):
- 5MP camera + microphone + speaker + doorbell button.
- PoE — single Cat6 from the basement up to the door frame.
- Onboard person detection (used as backup to Frigate).
- RTSP streams (main + sub), two-way audio.
- IP65 weatherproof.
- $120.

**Mounting**: replaced the existing 1980s chime + button with the Reolink unit. Used an external angled mount to point the camera 15° downward (kid-height visitor capture). Cable runs through the existing 18-gauge bell wire conduit; ran a parallel Cat6 alongside it.

The plumber-electrician-camera-installer hat I wore for 3 hours was its own experience.

## The protocol chain

```
Doorbell button pressed
  → Reolink ONVIF event ("DoorBellRing")
  → Frigate's ONVIF listener publishes MQTT: frigate/doorbell/event = "ring"
  → HA automation fires:
     • Cast camera feed to Google Home Hub displays (3 of them)
     • Echo announcement on kitchen Echo
     • Push notification to both phones with thumbnail
     • Log event in HA logbook
```

Total end-to-end latency from button press to all-displays-showing: **~2 seconds**.

## Casting the camera feed to Google Home displays

This is the part that took most of the August troubleshooting.

Google Home / Nest displays cast video via the Google Cast protocol. They accept either:
- A YouTube / Cast-API video URL.
- An HTTP/MJPEG stream (low quality, high CPU).
- A WebRTC stream (high quality, native).

Reolink's RTSP isn't natively Cast-compatible. The bridge I'm using is **WebRTC Camera** (a custom HA integration that converts RTSP → WebRTC via go2rtc):

```yaml
go2rtc:
  webrtc:
    candidates:
      - 192.168.10.10:8555

  streams:
    doorbell: rtsp://reolink:!secret_pw@192.168.30.30:554/h264Preview_01_sub
```

go2rtc runs as a Hass.io add-on. HA → go2rtc → Chromecast device receives a WebRTC stream → display shows live feed.

```yaml
# automations.yaml
- alias: "Doorbell ring → cast to displays"
  trigger:
    - platform: mqtt
      topic: frigate/doorbell/event
      payload: "ring"
  action:
    - service: media_player.play_media
      data:
        entity_id:
          - media_player.kitchen_nest_hub
          - media_player.master_bedroom_nest_hub
          - media_player.living_room_chromecast
        media_content_type: "application/webrtc"
        media_content_id: "/api/webrtc/doorbell"
    - service: notify.alexa_media_kitchen
      data:
        message: "Someone is at the door."
        data:
          type: announce
    - service: notify.mobile_app_luke_iphone
      data:
        title: "🛎️ Doorbell"
        message: "Person at the door at {{ now().strftime('%H:%M') }}"
        data:
          image: "/api/frigate/notifications/{{ states('sensor.frigate_doorbell_person').last_event_id }}/thumbnail.jpg"
```

## The Echo announce trick

The kitchen Echo is the most-listened device in the house. Voice announcements through Alexa Media Player + the "announce" type bypass Alexa's normal "say it back to you" voice and use a different, more attention-grabbing tone.

When the doorbell rings, the Echo says: "Someone is at the door." Across the open-plan kitchen-dining-living-room space, that's how everyone knows to look at the nearest display.

## What works after 3 months

- **Casting reliability**: 95% — the Google Hub displays show the feed within 2 seconds, 9 out of 10 button presses. Occasional WebRTC negotiation timeout when the Hub display has been idle for hours.
- **Frigate person detection on the doorbell stream**: 99% — every actual person ringing the doorbell gets detected and classified.
- **Two-way audio**: works (via go2rtc) but my kids are afraid of the doorbell speaker so I rarely use it.
- **Recording**: 30 days of doorbell events with thumbnails saved on the NAS.

## What doesn't (yet)

- **Person recognition on the doorbell stream.** Frigate can detect a person but doesn't know if it's me or the mail carrier. Face-detection-via-FaceBox or DeepStack would do this; both are heavy ML add-ons and I haven't found the value yet.
- **iPhone displays.** No iPhone-equivalent of Cast for a "show me the doorbell view automatically." The Companion App push notification + tap-to-open is the workaround.
- **Outdoor temperature in the doorbell feed.** Would be nice to overlay current temp + weather as a HUD on the display. Frigate has zone-overlay; doesn't do data-overlay.

## The integration loop closes

Three years ago, the smart-home stack was multiple parallel systems (SmartThings, Hue, Lutron, Wemo) that each handled their own slice. The doorbell experience touches:

- Reolink (camera + button event)
- Frigate (person detection)
- HA (orchestration)
- Google Home (displays + announcement)
- Amazon Alexa (audio announcement)
- iPhones (push notifications with thumbnail)
- NAS (recording storage)

Seven systems, all participating in one experience, all triggered by a single button press. That's the smart-home maturity that takes about ten years to assemble.
