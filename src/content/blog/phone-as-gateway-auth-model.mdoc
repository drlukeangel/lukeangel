---
title: "Phone-as-gateway — the auth model for BLE-only devices"
date: 2018-08-09T14:00:00-04:00
category: tools
tags:
  - ble
  - authentication
  - security
  - api-platform
  - medical-device
notebook: building-medical-iot-connected-products
notebookOrder: 4
excerpt: "A BLE-only health device can't authenticate to the cloud directly — the customer's phone has to carry its identity across. So how do you stop that phone from forging the device it's supposed to be speaking for?"
pullquote: "Bonding gives you trust between two specific physical objects. OAuth gives you trust between a human and a cloud. The device touches neither directly — and the only thing standing in the gap is a phone you have no reason to trust."
cover: "../../assets/blog/phone-as-gateway-auth-model-cover.svg"
coverAlt: "Two separate locked trust domains — a device bonded to a phone over Bluetooth on one side, a phone holding a cloud token on the other — joined by a single contested bridge through the phone, with a question mark over whether the cloud should believe what crosses it."
---

The brush has no radio but Bluetooth. I [wrote about what that does to the platform](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/) a while back — late, duplicated, out-of-order telemetry, all of it arriving through the customer's phone because there's no other door. That post ended on a promise I deferred: the device can't reach the cloud to prove who it is, so trust has to bridge two separate domains, and stitching them together is its own problem. This is that post.

Here's the problem stated plainly. Every byte the cloud ever sees about a device — every brushing session, every battery reading, eventually every firmware acknowledgement — arrives inside an HTTPS request made by the *phone*, not the device. The device signs nothing the cloud can check unless we make it. So the cloud is being asked to believe a claim of the form *"a real Device #4471, bonded to me, recorded this session"* — and the entity making that claim is a phone app we shipped to an app store, running on hardware we don't control, that a determined attacker can decompile, instrument, or replace outright. **The phone is a forgeable middleman, and the whole auth model is about making its forgeries useless.**

## Two trust relationships that don't touch

Start by being precise about what trust we actually have, because there are two completely separate relationships here and the temptation is to treat them as one.

**Relationship A: device ↔ phone, established by BLE bonding.** The user pairs in the app; under LE Secure Connections the device and phone run a P-256 ECDH exchange and each cache a long-term key (LTK). After that the link is encrypted under the LTK, and each side recognizes the other on reconnect. The trust here is *between two specific physical objects* — this brush, this phone. It says nothing about which human is holding the phone, and the LTK never leaves either device, so the cloud has never seen it and can't use it.

**Relationship B: phone ↔ cloud, established by OAuth 2.0.** The user logs into their account in the app and gets back an access token — a bearer JWT in our case. The token authorizes API calls on that user's behalf. The trust here is *between an authenticated human session and our backend*. Standard mobile auth, and it says nothing about any particular device.

![Two separate trust relationships that never touch. On the left, the device and the phone are bonded over Bluetooth Low Energy under LE Secure Connections: a P-256 ECDH exchange yields a long-term key cached on both, so the trust is between two physical objects and the key never leaves them. On the right, the phone and the cloud share an OAuth 2.0 access token, so the trust is between an authenticated human and the backend. Between the two domains sits a gap the phone bridges: bonding proves nothing to the cloud, the token proves nothing about the device, and the device never speaks to the cloud at all.](../../assets/blog/phone-gateway-two-domains.svg)

Look at where each relationship terminates and the gap jumps out. Bonding proves *device-to-phone* but dead-ends at the phone; the cloud isn't a party to it. The token proves *human-to-cloud* but says nothing about which device's data is riding along. And the device — the thing whose data we actually care about being authentic — is a party to exactly one of the two relationships and never once talks to the cloud. The phone is the only thing that sits in both domains. That's not a convenience. That's the attack surface.

## The three questions the API has to answer

When an upload lands, the ingestion endpoint has to answer three questions, and — this is the whole point — it has to answer them with *cryptography*, not with policy or trust in the caller:

1. **Was this session actually recorded by a real device from our line?** Not synthesized by an instrumented app, not crafted to inflate an engagement metric, not lifted from someone else's account and replayed.
2. **Was that device legitimately bonded to the account uploading it?** Not a unit that was sold on, not one re-pointed at a stranger's account without going through a transfer.
3. **Is the human logged into this phone the one who owns the device?** Not an ex-partner who knows the password, not a borrowed handset.

Each maps to one of the things we can actually establish. Q3 is the OAuth token — it's exactly what Relationship B proves. Q1 and Q2 are the hard ones, because the only entity in a position to assert them is the phone, and the phone is precisely what we can't trust. Answer those two without trusting the phone and the model holds.

![The three questions ingestion must answer, and the cryptographic fact that answers each — none of them a matter of trusting the caller. Q1, whether a real device from our line recorded the session, is answered by the device's ECDSA P-256 signature chaining to our manufacturing CA; it's one of the two hard ones. Q2, whether the device is bonded to the uploading account, is answered by checking that the serial — baked into the signed certificate so it can't be faked — is in that account's bond set; the other hard one. Q3, whether the human owns the device, is answered by the OAuth token, ordinary mobile auth the system already had; the easy one. All three are evaluated against the caller without trusting the caller, and any one failing rejects and logs the event.](../../assets/blog/phone-as-gateway-auth-model-fig-1.svg)

## Why bonding alone doesn't get you there

The seductive wrong answer — and the one I argued against in a design review, so I'll own having had to argue it — is *"the phone is bonded to the device, the phone is authenticated to the cloud, therefore the cloud can trust what the phone says the device recorded."* It chains the two relationships through the phone and calls it done.

It falls apart the moment you write down what an attacker controls. Bonding secures the *Bluetooth link*; it does not produce any artifact the cloud can verify. By the time session data is sitting in the phone's memory, it has already come out the far end of the encrypted BLE link in cleartext — the phone *has* to decrypt it to handle it. A modified app, or a script speaking our REST API directly with a valid token, can hand the cloud any session bytes it likes, stamped with any device serial it likes. The LTK doesn't help: it's a link key, not a signing key, the cloud doesn't have it, and even if it did, "this came over a bonded link" is a claim only the phone can make and the phone is the liar. Chaining the relationships through the phone just means the phone's word is load-bearing, which is the one thing we can't allow.

![Why chaining trust through the phone fails, and what an attacker actually controls. The BLE link from device to phone is encrypted under the bonding key, but session data exits that link in cleartext inside the phone, which must decrypt it to use it. An attacker who controls the app — by decompiling and re-signing it, or by driving the REST API directly with a valid user token — can submit fabricated session bytes stamped with any device serial, replay another account's captured upload, or inflate counts. The bonding key is a link key the cloud never holds, so 'this arrived over a bonded link' is a claim only the untrusted phone can make. Three forgeries succeed: synthesized data, replayed uploads, and inflated metrics.](../../assets/blog/phone-gateway-forgeable-middleman.svg)

The lesson generalizes past Bluetooth: **whatever sits between the device and the cloud is hostile by default** — phone, hub, home gateway, doesn't matter. If the only thing vouching for the device's data is the box in the middle, you've authenticated the box, not the device.

## What we built: sign on the device, verify in the cloud

The fix is to give the device a voice the phone can carry but can't fake. Every session is **signed on the device**, and the cloud verifies that signature against a chain that has nothing to do with the phone.

Each unit ships from the factory with its own keypair generated inside a hardware secure element — the same crypto co-processor the platform already relies on for the BLE pairing — and a per-device X.509 certificate signed by our manufacturing CA, with the device serial as the subject. The private key is generated on-chip and never leaves it; not in manufacturing test, not over BLE, not ever. (This is the same factory-PKI posture the connected-products line uses; I'm not reinventing it here, just pointing it at telemetry.)

When the device records a session, before it writes the record to flash it signs the payload — the session bytes plus the device's own monotonic counter — with that private key, using ECDSA on P-256. The signature and the device's certificate travel with the record. The phone drains the record over BLE exactly as before, and uploads it **unmodified**, wrapped in its own user-auth token. The phone can read the bytes. It cannot alter them without invalidating a signature it has no key to recompute.

On the cloud side, ingestion runs three checks against that one upload:

- **The signature, against our CA.** Does the certificate chain to our manufacturing root, and does the signature verify over the payload with the public key in that cert? Pass means *a real device from our line produced these exact bytes* — that's **Q1**, answered in math.
- **The serial, against the account's bond set.** The serial is baked into the signed certificate, so the phone can't lie about it. Is that serial in the set of devices currently bonded to this user's account? Pass means *this device belongs to this user* — that's **Q2**.
- **The token, against the session.** The OAuth token identifies the human. Pass means *the account owner is the one uploading* — that's **Q3**.

All three must pass or the event is rejected and logged for review. Notice what the phone's role has shrunk to: it's a pipe. It carries a signed blob it can't forge and a token that authenticates a human, and it gets no say in whether the cloud believes the device. That's exactly where you want a hostile middleman — load-bearing for *delivery*, irrelevant to *trust*.

![The verification flow that demotes the phone to a pipe. The device signs each session payload — bytes plus its own monotonic counter — with a P-256 private key held in its secure element, and attaches its factory-issued certificate; the private key never leaves the chip. The phone drains the record over Bluetooth and uploads it unmodified, wrapped in the user's OAuth token, able to read the bytes but unable to alter them without breaking a signature it cannot recompute. The cloud runs three checks: the signature verifies against the manufacturing CA, answering whether a real device produced these exact bytes; the serial embedded in the signed certificate is in this account's bonded-device set; and the OAuth token identifies the account owner. All three must pass, or the event is rejected and logged.](../../assets/blog/phone-gateway-signed-verify.svg)

### Replay, while we're here

Signing the bytes stops forgery but not replay — a captured upload replays with a perfectly valid signature, because it *is* valid. Two things close that. The monotonic counter is inside the signed payload, so ingestion dedupes on `(device-serial, counter)` exactly as the [replay-tolerant ingestion design](/blog/designing-a-connected-consumer-health-device-with-ble-4-2/) already does for honest duplicates; a replayed session lands on a counter value the log has already accepted and is dropped. And the bond-set check means a session captured from one account can't be replayed into another — the serial won't be in the attacker's bond set. The work I'd already done to tolerate a *flaky* gateway turned out to be most of what I needed to tolerate a *hostile* one.

![Why two further checks close replay even though a replayed signature is genuinely valid. A captured upload for serial 4471 at counter 88 still verifies — its signature is real — so signing alone can't stop it. The first check is the monotonic counter carried inside the signed payload: ingestion dedupes on the pair of serial and counter, so a replay of counter 88 lands on a value the accepted log already holds and is dropped exactly like an honest duplicate, which stops re-upload into the same account. The second check is the bond set: the replay carries serial 4471, but that serial is not in the attacker's bonded-device set, so the event is rejected, which stops cross-account replay. The work to tolerate a flaky gateway turned out to be most of what was needed to tolerate a hostile one.](../../assets/blog/phone-as-gateway-auth-model-fig-2.svg)

## Why not just put the device on AWS IoT Core

We looked hard at AWS IoT Core — it's been GA since 2015 and it's the obvious place a question like "authenticate a device to a cloud" points you. The model it wants is clean: the device authenticates directly to the broker over mutual TLS with its device certificate and publishes MQTT to its own topic. For a device with its own internet radio, that's the right answer and I'd reach for it without hesitating.

Our device has no internet radio. It can't open a TLS socket to anything; the nearest IP-capable thing in its world is the phone. To use IoT Core we'd have the device speak MQTT *to the phone*, which relays to the broker — at which point the phone is doing all the work and the broker is an HTTPS endpoint with a flakier transport bolted in front. Worse, mTLS terminates at the phone, so the broker would authenticate *the phone's* TLS session, not the device's — which drops us right back into trusting the middleman, the exact thing we just spent a design eliminating.

So we kept ingestion as our own signed-event endpoint and borrowed the *shape* IoT Core would have given us: per-device certs and keys, an append-only log, idempotency keyed on a per-device counter, server-side dedup, every event attributable to a specific attested device. The wire protocol isn't MQTT and the front door isn't the broker, but the trust model is the one a broker would have enforced — pushed up to the application layer where, for a phone-gateway product, it actually belongs. If we ever ship a unit with Wi-Fi on board, the device can connect to a real broker and the cloud-side contract barely moves. (Azure IoT Hub and GCP's Cloud IoT Core have the same directly-connected-device assumption baked in; none of the managed brokers fit a BLE-only product until the hardware grows its own radio.)

## The lost-phone problem

Bonding assumes the phone and device are a stable pair. They aren't — people replace a phone every couple of years, and the device long outlives any one handset. So there has to be a way to move a device's bond from an old phone to a new one without mailing the brush back to us. And that flow is a gift to an attacker if you build it wrong: if "re-point this device at my account" is a pure software operation, then anyone who phishes a user's credentials can remotely steal the device's data stream into their own account.

The flow we shipped puts a physical act in the middle of it:

1. The user signs into the app on the new phone and sees their registered devices.
2. They pick "re-pair this device" and the app prompts them to **press and hold the button on the brush**.
3. The brush, *only* on that physical button-hold, deletes the old LTK and accepts a new bond.
4. The phone tells the cloud the device is now bonded to this account.
5. The cloud records the bond change, revokes the old phone's authorization to upload for that serial, and logs the transfer for security review.

Step 2 is the load-bearing one. Without it, an attacker with stolen credentials re-pairs from their own phone and starts uploading — and because their forged sessions would now carry a *real* device's signature relationship, the cloud might even believe them. With it, the attacker also needs to be physically holding the brush and pressing its button. A button-hold is a low-tech, high-assurance signal that no amount of software-side compromise can spoof, and it's the cheapest strong control on the whole platform.

![The lost-phone re-pair flow, and the remote-takeover attack the physical button blocks. A legitimate transfer: the user signs in on a new phone, selects re-pair, and presses and holds the device button; only on that physical press does the device delete its old long-term key and accept a new bond; the cloud then revokes the old phone's upload authorization for that serial and logs the change. The attack it defeats: an attacker who has phished the user's credentials tries to re-point the device to their own account purely in software, but with no physical possession they cannot trigger the button-hold, so the device refuses the new bond and the takeover fails. The button-hold is the one signal no software-side compromise can forge.](../../assets/blog/phone-gateway-repair-button.svg)

## What I'd tell a team

- **Sign on the device, verify in the cloud, never trust the gateway.** Whatever sits in the middle — phone, hub, edge box — is hostile by default. Give the device a cryptographic voice the gateway can carry but can't fake, and the gateway's trustworthiness stops mattering.
- **Don't confuse a link key with an identity key.** BLE bonding secures the radio between two objects; it proves nothing to a cloud that never saw the key. If the cloud needs to trust the device, the device needs a key the *cloud* can check.
- **Bind authorization changes to a physical act.** Re-pairing requires a button-hold on the hardware. The one control a remote attacker can't satisfy is the one that needs hands on the device.
- **Build ingestion as if it were an IoT broker even when it can't be one.** Per-device attestation, append-only, idempotent on the device's own counter. The shape is right regardless of whether the wire protocol ever becomes MQTT — and it ports cleanly the day the hardware gets a radio.

## What's next

The same trust path I just described carries telemetry *up*. The harder direction is *down*: pushing a firmware image through that hostile phone and onto the device without ever letting the phone substitute its own. Everything here gets stress-tested when the payload stops being a session record and starts being executable code. That's the [next post](/blog/ota-firmware-over-bluetooth-pushing-the-rom-through-the-phone/).
