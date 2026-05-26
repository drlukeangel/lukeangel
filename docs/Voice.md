# Voice — how to write for lukeangel.co

This blog is a **journal that informs**, and an act of **gratitude** for what the field gave the author. It is **not** SEO bait, **not** a sales funnel, **not** thought-leadership fluff. Write like that.

## The voice in one line
Luke, teaching one person out loud — dry, specific, first-person, honest about what didn't work, and never hand-wavy.

## Do
- **First person, from the work.** "the team I lead," "we," "what I'd tell the next team," "what it cost me."
- **Concrete + technical depth.** Real numbers, named tech (ATECC608A, P-256, IoT Core), actual tradeoffs and decisions. Go deep enough that an AWS doc couldn't have written it.
- **Honest.** Include a "what didn't work / what I'd do differently" beat. Name the mistake and what it cost.
- **Punchy.** Short sentences mixed with depth. An actionable, sometimes blunt closer.
- **Structure:** hook (a concrete situation or a sharp insight) → the meat (depth, decisions, what-it-cost) → "what I'd tell a team" → punchy close → a short "what's next" handoff to the next post.

## Never
- **MLM / selling / marketing-speak.** No "unlock," "supercharge," "game-changing," "you won't believe."
- **Clickbait.** No "N things that will…," no curiosity-gap titles, no buy/click-before-you-understand framing.
- **Hand-waving.** If a post glosses the part that actually matters, it isn't done. Name the real mechanism, the real numbers, the real failure mode.
- **"In this article I'll teach you…" preamble.** Start in the work.

## The time-machine rule (load-bearing — the #1 thing to get right)
A dated post must read as if written **on its date**, and — most important — **its technical content must be the tech that existed and was current on that date.** This goes beyond not *naming* future products: don't *use* them either. Every technical choice — SDK / spec / protocol versions (TLS, BLE, HTTP), cloud services *and their launch dates*, libraries, algorithms, the era's accepted best-practice — must be one the author could actually have reached for on that date. A 2017 design can't lean on a service that launched in 2019, cite TLS 1.3 (2018), or assume a BLE 5 feature. Match the knowledge, framing, and even the uncertainty to the date. When unsure whether something existed yet, pick the period-correct option or flag it. Internal cross-links point to **earlier-dated** posts; frame any forward pointer neutrally so it doesn't leak a date.

## Deployment-agnostic (cloud / IoT posts)
State the concept platform-neutrally, then make it concrete with **AWS as the default** (IoT Core, Lambda, KMS, Device Defender…), plus a short "Azure / GCP equivalent" aside where it helps. Accuracy guardrail: **Google's managed Cloud IoT Core was retired August 2023** — for 2024+ posts, "GCP IoT" means roll-your-own (Pub/Sub + your own stack).

## The right-angle rule (a post must fit its notebook)
A post must attack its topic from **its notebook's** angle. In a *security* notebook, the OTA post is about the **security** of updates (signing, blast radius, key rotation) — not the **operations** of rolling them out. Before shipping, ask: *is this post's framing the one this notebook promises?* A good post in the wrong notebook is still wrong. Scrutinize inherited/KEEP posts as hard as new ones.

## Exemplars — read these for the voice before writing
- `src/content/blog/secure-boot-trusting-your-own-code.md`
- `src/content/blog/pki-behind-a-device-cert.md`
- `src/content/blog/validating-iot-data-at-ingestion-three-patterns.md`
- `src/content/blog/first-week-with-bedrock-a-pm-read.md` (a Luke original — pre-remediation)
