# Image top-up manifest — strict >=1 diagram per 500 words
_Generated 2026-05-25. deficit = ceil(words/500) - inlineImages. Agents hand-draw 'deficit' new SVG diagrams per post (period-correct, real-world-accurate, text-light). The 2 zero-image capstones also need full content polish + a hand-drawn SVG cover._

> **METRIC NOTE (2026-05-26):** the deficit audit MUST strip image alt-text from the word count before computing need — `sed -E 's/!\[[^]]*\]\([^)]*\)//g; s/<[^>]*>//g'` on the body. Agents write 100-200-word rich alt blocks; counting those as prose inflates `ceil(words/500)` and creates a phantom treadmill (a finished post re-flags as needing +1). Also do NOT query the notebook as `smart-home` — it substring-matches `smart-home-iot-journey` and double-counts. Use the exact slug.
>
> **✅ COMPLETE (2026-05-26):** all 6 waves done + verified. Final alt-stripped re-audit = **0 deficit across all 146 IoT posts** — every post now meets the strict ≥1-diagram-per-500-words bar, all routes render 200, all new SVGs byte-safe + text-light, covers text-free. The 2 capstones (thirteen-years-on, 2025-in-review-and-2026-forecast) were fully remediated (cover + prose + diagrams). Done via one-shot fresh subagents per ~4-5-post batch (Luke OK'd subagents for this run; next agent launch should use a real team). NOT committed yet — awaiting Luke's go.

## building-medical-iot-connected-products  (needs +15 diagrams)
| slug | words | imgs | need | add |
|---|---|---|---|---|
| cutting-my-teeth-on-medical-iot-products | 3311 | 3 | 7 | +4 |
| designing-a-connected-consumer-health-device-with-ble-4-2 | 2492 | 4 | 5 | +1 |
| hipaa-fda-class-i-and-what-counts-as-medical-device-data | 2769 | 3 | 6 | +3 |
| ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone | 3892 | 5 | 8 | +3 |
| phone-as-gateway-auth-model | 2798 | 4 | 6 | +2 |
| where-hardware-specs-meet-api-contracts | 2941 | 4 | 6 | +2 |

## connected-products  (needs +15 diagrams)
| slug | words | imgs | need | add |
|---|---|---|---|---|
| ble-vs-lora-vs-cellular-decision-matrix | 1671 | 3 | 4 | +1 |
| four-and-a-half-years-of-connected-products | 2203 | 4 | 5 | +1 |
| iot-observability-in-cloudwatch | 1348 | 2 | 3 | +1 |
| open-sourcing-the-pii-masking-starter-kit | 1267 | 2 | 3 | +1 |
| ota-firmware-without-bricking-the-fleet | 1278 | 2 | 3 | +1 |
| pii-masking-with-glue-databrew-rubric-we-ended-up-with | 1151 | 2 | 3 | +1 |
| prd-part-1-hardware-specs | 2668 | 4 | 6 | +2 |
| prd-part-2-application-and-data | 3658 | 5 | 8 | +3 |
| prd-part-3-identity-and-compliance | 3040 | 5 | 7 | +2 |
| validating-iot-data-at-ingestion-three-patterns | 1205 | 1 | 3 | +2 |

## iot-security  (needs +6 diagrams)
| slug | words | imgs | need | add |
|---|---|---|---|---|
| defense-in-depth-for-a-connected-product-fleet | 1761 | 1 | 4 | +3 |
| field-grade-device-identity-at-fleet-scale | 1520 | 3 | 4 | +1 |
| pki-behind-a-device-cert | 1664 | 3 | 4 | +1 |
| securing-ota-updates | 1091 | 2 | 3 | +1 |

## pet-iot-field-guide  (needs +48 diagrams)
| slug | words | imgs | need | add |
|---|---|---|---|---|
| 2014-pet-iot-year-in-review | 2021 | 3 | 5 | +2 |
| 2015-pet-iot-year-in-review | 2623 | 4 | 6 | +2 |
| 2016-pet-iot-year-in-review | 825 | 1 | 2 | +1 |
| 2017-pet-iot-year-in-review | 771 | 1 | 2 | +1 |
| 2018-pet-iot-year-in-review | 1215 | 1 | 3 | +2 |
| 2019-pet-iot-year-in-review | 1070 | 1 | 3 | +2 |
| 2020-pet-iot-year-in-review | 1029 | 1 | 3 | +2 |
| 2021-pet-iot-year-in-review | 1745 | 3 | 4 | +1 |
| 2024-pet-iot-year-in-review | 1040 | 2 | 3 | +1 |
| 2025-pet-iot-year-in-review | 1345 | 2 | 3 | +1 |
| airtag-on-atoms-collar-anti-stalking-ironies | 1350 | 2 | 3 | +1 |
| atom-arrives-whistle-activity-monitor-launches | 1509 | 3 | 4 | +1 |
| atoms-last-year-data-told-us | 1413 | 2 | 3 | +1 |
| behavioral-ai-on-pet-cameras-bullshit-and-real | 1319 | 2 | 3 | +1 |
| boson-arrives-multi-cat-household-begins | 1332 | 2 | 3 | +1 |
| diy-esp32-pet-feeder-vendor-cloud-independence | 1227 | 2 | 3 | +1 |
| fi-announces-gps-power-budget-engineering | 1313 | 2 | 3 | +1 |
| fi-ships-first-units-atom-first-non-mars-tracker | 1149 | 2 | 3 | +1 |
| find-my-pet-trackers-apple-network-opens | 1450 | 2 | 3 | +1 |
| fitbark-2-pet-activity-tracker-market-2015 | 2349 | 4 | 5 | +1 |
| furbo-dog-camera-first-impressions | 1217 | 2 | 3 | +1 |
| halo-collar-tried-it-returned-it | 1294 | 2 | 3 | +1 |
| joule-arrives-microchip-rfid-primer | 2664 | 5 | 6 | +1 |
| litter-robot-iii-connect-smart-self-cleaning-litter | 1256 | 2 | 3 | +1 |
| mars-divests-whistle-to-tractive-market-state | 1503 | 2 | 4 | +2 |
| mars-petcare-data-ownership-conflict | 1160 | 1 | 3 | +2 |
| petivity-smart-litter-multi-cat-analytics | 1328 | 2 | 3 | +1 |
| petnet-collapses-anatomy-of-smart-device-catastrophe | 1473 | 2 | 3 | +1 |
| petnet-smart-feeder-long-term-review | 1335 | 2 | 3 | +1 |
| quark-arrives-puppy-second-dog-pet-iot-baseline | 1299 | 2 | 3 | +1 |
| six-months-on-whistle-3-cellular-realities | 1362 | 2 | 3 | +1 |
| sureflap-hub-connected-cat-door | 1213 | 2 | 3 | +1 |
| sureflap-microchip-cat-door-joules-first-iot | 2569 | 3 | 6 | +3 |
| tagg-vs-whistle-cellular-vs-ble-base-station | 2095 | 3 | 5 | +2 |
| tractive-base-station-teardown-ble-nrf52840 | 2085 | 3 | 5 | +2 |
| twelve-years-pet-iot-long-arc-retrospective | 1925 | 3 | 4 | +1 |
| whistle-health-gps-plus-vitals-arrives | 1497 | 2 | 3 | +1 |

## smart-home-iot-journey  (needs +57 diagrams)
| slug | words | imgs | need | add |
|---|---|---|---|---|
| 2013-in-review-and-2014-forecast | 874 | 1 | 2 | +1 |
| 2014-in-review-and-2015-forecast | 1064 | 2 | 3 | +1 |
| 2015-in-review-and-2016-forecast | 1076 | 1 | 3 | +2 |
| 2016-in-review-and-2017-forecast | 1244 | 2 | 3 | +1 |
| 2019-in-review-and-2020-forecast | 600 | 1 | 2 | +1 |
| 2020-in-review-and-2021-forecast | 893 | 1 | 2 | +1 |
| 2021-in-review-and-2022-forecast | 591 | 1 | 2 | +1 |
| 2022-in-review-and-2023-forecast | 959 | 1 | 2 | +1 |
| 2024-in-review-and-2025-forecast | 1019 | 1 | 3 | +2 |
| 2025-in-review-and-2026-forecast | 729 | 0 | 2 | +2 |
| aeotec-multisensor-6-five-sensors-one-zwave | 1018 | 2 | 3 | +1 |
| amazon-buys-ring-surveillance-doorbell-threat-model | 781 | 1 | 2 | +1 |
| amazon-echo-arrives-alexa-lights-first-voice-automation | 1219 | 2 | 3 | +1 |
| bluetooth-low-energy-4-0-in-the-smart-home-primer | 1103 | 2 | 3 | +1 |
| bringing-legacy-devices-onto-matter | 1446 | 2 | 3 | +1 |
| building-security-alarm-panel-in-ha | 1095 | 2 | 3 | +1 |
| designing-new-build-for-smartthings-day-one | 1556 | 2 | 4 | +2 |
| doorbell-camera-on-google-home-hub-display | 905 | 1 | 2 | +1 |
| first-home-assistant-install-yaml-configs | 1261 | 2 | 3 | +1 |
| first-samsung-family-hub-fridge | 1338 | 2 | 3 | +1 |
| first-security-automation-door-presence-smartthings | 774 | 1 | 2 | +1 |
| frame-tv-as-household-display-surface | 1126 | 2 | 3 | +1 |
| frame-tv-kitchen-appliance-sync | 1379 | 2 | 3 | +1 |
| frigate-coral-object-detection-cookbook | 1625 | 1 | 4 | +3 |
| google-home-two-voice-assistants-one-house | 1073 | 2 | 3 | +1 |
| homekit-and-the-mfi-chip-moat | 1111 | 2 | 3 | +1 |
| hue-motion-sensor-purpose-built-lighting-automation | 1039 | 2 | 3 | +1 |
| hue-scenes-and-the-local-rest-api | 1124 | 2 | 3 | +1 |
| ifttt-first-cross-vendor-automation | 1043 | 2 | 3 | +1 |
| light-switches-wemo-failed-lutron-won-no-neutral-nightmare | 1870 | 2 | 4 | +2 |
| matter-1-0-ships-protocol-primer | 1412 | 2 | 3 | +1 |
| migrating-smartthings-security-to-home-assistant | 1270 | 2 | 3 | +1 |
| outdoor-watering-with-soil-moisture | 1112 | 2 | 3 | +1 |
| philips-hue-gen-1-zigbee-light-link-debut | 1288 | 2 | 3 | +1 |
| picking-the-zigbee-stack-z2m-deconz-zha | 1264 | 2 | 3 | +1 |
| poe-cameras-and-frigate-nvr | 1110 | 2 | 3 | +1 |
| ripping-out-vendor-clouds-local-first-ha | 1155 | 2 | 3 | +1 |
| robots-roomba-braava-daily-routine | 1131 | 2 | 3 | +1 |
| samsung-oven-dishwasher-washer-dryer | 1144 | 2 | 3 | +1 |
| smartthings-edge-drivers-local-first-samsung | 1091 | 2 | 3 | +1 |
| smartthings-starter-kit-unboxing-zwave-zigbee-first-hub | 1410 | 2 | 3 | +1 |
| structured-wiring-conduit-poe-backbone | 1299 | 2 | 3 | +1 |
| thirteen-years-on-long-arc-retrospective | 1077 | 0 | 3 | +3 |
| wifi-as-smart-home-transport-the-always-on-tax | 1261 | 2 | 3 | +1 |
| wireless-cameras-and-bandwidth-tradeoff | 1068 | 1 | 3 | +2 |
| works-with-nest-is-dead-platform-risk-made-real | 717 | 1 | 2 | +1 |
| zwave-vs-zigbee-vs-wifi-year-with-smartthings | 1022 | 2 | 3 | +1 |

## building-with-ai-ml  (needs +7 diagrams)
| slug | words | imgs | need | add |
|---|---|---|---|---|
| agent-based-devops-with-q-developer | 1570 | 3 | 4 | +1 |
| aws-spend-audit-i-do-every-quarter | 1374 | 2 | 3 | +1 |
| bedrock-agents-just-ga | 1793 | 3 | 4 | +1 |
| knowledge-bases-for-bedrock-production-gotchas | 1638 | 3 | 4 | +1 |
| sagemaker-pipelines-week-three-notes | 1082 | 2 | 3 | +1 |
| strands-plus-agentcore-year-end-inventory | 1642 | 3 | 4 | +1 |
| three-things-from-reinvent-that-change-my-roadmap | 1448 | 2 | 3 | +1 |

---
**Total diagrams to hand-draw: 148**
