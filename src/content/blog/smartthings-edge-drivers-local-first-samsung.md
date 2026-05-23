---
title: "SmartThings Edge drivers — local-first Samsung, finally"
date: 2025-03-19T14:00:00-04:00
category: tools
tags:
  - smart-home
  - smartthings
  - edge-drivers
  - local-first
notebook: smart-home-iot-journey
notebookOrder: 52
excerpt: "Samsung's Edge driver framework matured into a real platform. Custom Lua-based drivers run locally on the SmartThings hub (the Family Hub fridge)."
pullquote: "After ten years of cloud-mediated SmartThings, the platform finally executes locally. The lesson: every platform eventually moves toward local-first if it wants to survive."
---

SmartThings shipped its **Edge driver** framework in 2022, but the early version was rough — limited capabilities, sparse documentation, mostly used by Samsung's internal team. As of HA 2025.2 + SmartThings hub firmware 47.x, the platform is finally credible. Local-first is real on SmartThings.

This is the post about what Edge drivers are and why they matter.

## What an Edge driver is

A SmartThings Edge driver is **Lua code that runs on the SmartThings hub** (Family Hub fridge, Frame TV, Aeotec V3 hub, etc.). Each driver implements a specific device protocol — Zigbee, Z-Wave, LAN, Matter — and translates it to SmartThings capabilities.

Before Edge drivers:
- Custom device handlers were Groovy scripts running in Samsung's cloud.
- Every device command went: device → hub → SmartThings cloud → execute Groovy → cloud → hub → device.
- Latency 2-5 seconds. Cloud outage = devices unresponsive.

After Edge drivers:
- Drivers are Lua, run locally on the hub.
- Device commands: device → hub (Lua execution) → device.
- Latency `< 500 ms`. No cloud involvement for device control.

## Writing a custom Edge driver

The example I'll walk through is a driver I wrote for a generic Zigbee garage door controller that SmartThings didn't natively support.

```lua
-- garage_door.lua
local capabilities = require "st.capabilities"
local clusters = require "st.zigbee.zcl.clusters"
local zigbee_driver = require "st.zigbee.driver"

local OnOff = clusters.OnOff

local function refresh(driver, device)
    device:send(OnOff.attributes.OnOff:read(device))
end

local function open(driver, device, command)
    device:send(OnOff.commands.On(device))
end

local function close(driver, device, command)
    device:send(OnOff.commands.Off(device))
end

local function attribute_handler(driver, device, value, zb_rx)
    local state = value.value
    if state then
        device:emit_event(capabilities.doorControl.door.open())
    else
        device:emit_event(capabilities.doorControl.door.closed())
    end
end

local garage_door_driver = {
    NAME = "Generic Zigbee Garage Door",
    zigbee_handlers = {
        attr = {
            [OnOff.ID] = {
                [OnOff.attributes.OnOff.ID] = attribute_handler
            }
        }
    },
    supported_capabilities = {
        capabilities.doorControl,
        capabilities.refresh
    },
    capability_handlers = {
        [capabilities.doorControl.ID] = {
            [capabilities.doorControl.commands.open.NAME] = open,
            [capabilities.doorControl.commands.close.NAME] = close
        },
        [capabilities.refresh.ID] = {
            [capabilities.refresh.commands.refresh.NAME] = refresh
        }
    }
}

return zigbee_driver(garage_door_driver)
```

About 50 lines. Maps the Zigbee OnOff cluster to the SmartThings `doorControl` capability. Deploys via Samsung's `smartthings` CLI:

```bash
$ smartthings edge:drivers:package . --hub HUB_ID
$ smartthings edge:drivers:install <driverId> --hub HUB_ID
```

Driver lands on the hub in ~30 seconds. New device joins; SmartThings discovers the right driver based on the device's Zigbee fingerprint.

## The local-first guarantees

After Edge:

- **Device control runs locally.** Latency < 500 ms.
- **Routines (SmartThings's automations) run locally** if all involved devices are local + the routine uses local-only triggers. Cloud is needed only for cross-device-class routines or cloud-side conditions (weather, etc).
- **Cloud outage tolerance** — Edge devices keep working during SmartThings cloud outages. Tested in 2024; routines still fired.

The architectural shift parallels what HA has had from day one. SmartThings caught up.

## The implication for SmartThings ecosystem

For me personally, Edge drivers mean:

- **I can write drivers for orphaned devices** (devices SmartThings doesn't natively support). My existing 23 Aqara devices, 18 Hue, the bridged-via-HA stuff — all candidates for Edge drivers if needed.
- **Latency on SmartThings-hub-managed devices** drops to HA-equivalent.
- **The two-hub multi-redundancy** (Family Hub fridge + Frame TV both being hubs) is real because Edge drivers replicate across hubs.

For the SmartThings ecosystem broadly:

- **Third-party drivers proliferate.** Community drivers on GitHub for devices Samsung doesn't support — Tuya, Sonoff, generic Zigbee.
- **SmartThings becomes a viable competitor to Home Assistant** for non-DIY users. The local-first guarantee removes the biggest reason I migrated off SmartThings in 2017.
- **The platform's future is more robust.** Cloud-dependent platforms (Wink, original SmartThings) failed when their clouds got sick. Local-first platforms survive.

## Am I migrating back to SmartThings?

No. Home Assistant has 8 years of accumulated automations, custom integrations, ESPHome devices, LoRa sensors — none of which port cleanly to SmartThings Edge.

But the multi-hub architecture I have now (HA primary + SmartThings as secondary for the Samsung Bespoke ecosystem) is more robust because the SmartThings side runs locally too. SmartThings outages don't take down the Samsung appliances anymore.

## What this changes about the "right" smart-home platform recommendation

For 2025, my recommendation tree:

```
Are you a developer / hobbyist / want full control?
  → Home Assistant.

Are you Apple-only? Privacy-focused?
  → Apple Home + HomeKit (with HKSV cameras).

Do you have a Samsung-heavy household + want minimal setup?
  → SmartThings (with Edge drivers, the cloud-dependency complaint goes away).

Do you want maximum cross-vendor compatibility?
  → Any of the above + a Matter strategy.
```

A year ago I'd have said SmartThings was a "starts cloud-dependent, ages poorly" platform. With Edge drivers, that's no longer true.

## What's next

- A post on bridging HA → SmartThings via Matter so SmartThings ecosystems see HA-managed devices.
- More custom Edge drivers I'll need (the LoRa garden sensors should appear in SmartThings via an Edge LAN driver to reach the Family Hub fridge).
