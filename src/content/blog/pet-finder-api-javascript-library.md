---
title: Pet Finder API JavaScript library — published to npm
date: 2017-02-25T22:54:35.000Z
category: tools
tags:
  - javascript
  - libraries
  - node
  - npm
  - packages
  - open-source
excerpt: "I just published a JavaScript library that wraps the Petfinder API — because the official one returns JSON that fights you. Here's what it does, how to use it, and why I built it."
pullquote: "The Petfinder API is a great public service wrapped in a JSON shape that violates every API design principle I know. This library is the buffer."
wpCategory: developement
wpUrl: /developement/pet-finder-api-javascript-library/
cover: ../../assets/blog/npde-npm-package-manager-petfinder.jpg
coverAlt: npm logo over the Pet Finder API JavaScript library — published package for Node.js developers
---

Just published a small JavaScript library that wraps the [Petfinder API](https://www.petfinder.com/developers/api-docs). The official API is a great public service — it powers the search-for-an-adoptable-pet feature on Petfinder.com and a long tail of shelter-aggregator sites. *The JSON shape it returns, however, will fight you.*

This library is the buffer between you and the wire format. It handles the calls, normalizes the transformations, and gives you back a clean object you can actually work with.

→ **[npm: pet-finder-api](https://www.npmjs.com/package/pet-finder-api)**  
→ **[GitHub](https://github.com/drlukeangel/Pet-Finder-API-Javascript-Library)**

![GitHub logo icon — Pet Finder API JavaScript library source repository on GitHub](../../assets/blog/dockerizing-nodejs-github-source-icon.png)

## What it does

The library:

- **Wraps every Petfinder API endpoint** — pet.find, pet.get, shelter.find, shelter.get, breed.list, the lot
- **Normalizes the JSON shape** — Petfinder returns objects nested under `{ "$t": "..." }` for every field; the library flattens these to just the value
- **Handles auth** — you pass in your API key once at instantiation; the library handles signing
- **Returns Promises** — works cleanly in async/await flows
- **Has TypeScript-friendly shapes** — even though it's vanilla JS, the returns are typed via JSDoc so editors give you reasonable autocomplete

```js
const PetFinder = require('pet-finder-api');
const client = new PetFinder({ apiKey: process.env.PETFINDER_KEY });

const dogs = await client.pet.find({
  animal: 'dog',
  location: '90210',
  size: 'M',
  count: 25,
});

console.log(`Found ${dogs.length} adoptable dogs near 90210`);
```

That's it. Compare to the raw API where you'd be writing your own `JSON.parse → traverse → flatten → re-shape` pipeline.

![Pet Finder API wrapper flow — diagram showing your app code calling the library, the library signing and transforming the request, hitting the Petfinder API, receiving nested {"$t":"..."} JSON, and the wrapper flattening it to a clean array of objects before returning](../../assets/blog/petfinder-api-wrapper-flow-2017.svg)

## Why I built it

Two reasons:

1. **I was building a side project** that needed adoptable-pet data and got tired of writing the same flattening helpers in three places. Library extraction = future me thanks present me.
2. **The Petfinder API doesn't have an officially blessed Node client** — there are a few abandoned ones on npm, none current. Felt like worth contributing one that actually works.

The reason I made it a *real* npm package and not just a gist is the same reason anyone open-sources a small utility: **somebody else has the same problem.** If three people use this and save themselves a Tuesday afternoon, the package has paid for itself.

## What's in the box

- ~200 lines of vanilla JavaScript, no dependencies beyond a single fetch shim for older Node
- Tests with Mocha (covers ~80% of the surface)
- README with copy-paste examples for the five most common queries
- MIT license — fork, modify, ship; just keep the attribution

## What it doesn't do

- It doesn't cache. Add Redis or LRU yourself if you need it.
- It doesn't handle rate-limiting backoff — wrap it in your own retry logic if you're at volume.
- It doesn't render any UI. It's a thin API client. The rendering is your job.

These are intentional. Small surface area = easy to maintain = library that still works five years from now.

## Why the Petfinder API is worth using

Outside the JSON quirk, the Petfinder API is genuinely useful public infrastructure. It indexes adoptable pets across thousands of shelters in the US and Canada, exposes search by location/breed/size/age, and provides the data feed behind the "adoption" widget on hundreds of community sites. If you're building anything in the pet-adoption, shelter-tech, or rescue-coordination space, you'll almost certainly touch it.

The mission is real. Adoptions go up when discovery is easy. Discovery is easy when developers can ship features against the API in an afternoon, not a week. *That's the work.*

## Gratitude beat

Big thanks to Petfinder for keeping the API alive and free. Public-good APIs from non-public-good companies are rare and worth protecting. If you ship something on top of this library, ping me — I love seeing what people build.

Thanks also to every shelter and rescue volunteer doing the work behind the data feed. The pets in the API are real animals in real shelters. The library is a tiny lever; the lever moves something that matters.

## How to use it in a real project

A pattern that works well for a small adoption-discovery site or shelter widget:

```js
const PetFinder = require('pet-finder-api');
const client = new PetFinder({ apiKey: process.env.PETFINDER_KEY });

async function getNearby(zip, animal) {
  try {
    const results = await client.pet.find({
      animal,
      location: zip,
      count: 20,
      output: 'full',
    });
    return results.map(p => ({
      id: p.id,
      name: p.name,
      breed: p.breeds.breed,
      shelter: p.shelterId,
      photo: p.media.photos?.photo?.[0] || null,
    }));
  } catch (err) {
    console.error('Petfinder lookup failed:', err.message);
    return [];
  }
}
```

Three things this snippet quietly does right that the raw API will not do for you: it **maps to a clean shape** before you hand it to the front-end, **falls back gracefully** when the photo array is empty (extremely common on the underlying data), and **never throws from the route handler** — failures return an empty list and log, because adoptive pet discovery should degrade gracefully rather than 500-page.

## Roadmap and contribution

PRs welcome on the GitHub repo. The two features people most ask for, which I haven't shipped because I haven't personally needed them: built-in retry with exponential backoff, and a streaming pagination helper for large shelter exports. Both are reasonable, both are small, both would make excellent first-PRs. *Open an issue, claim one, ship it — your name in the contributors list looks great.*

The package will keep working as long as Petfinder's API does. If the API ever changes, the library updates with it. That's the pact you make when you publish a thin wrapper. **Thank you for using open-source software.**
