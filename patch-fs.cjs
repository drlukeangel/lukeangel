// EMFILE protection on Windows during Astro dev/build.
//
// Astro reads many files concurrently at startup (route manifest, content
// collections). On Windows, the per-process handle ceiling is around 512–2048
// depending on Node build — easy to hit with hundreds of route files.
//
// We patch BOTH:
//   1. The classic `fs` callback/sync API (via graceful-fs)
//   2. The modern `fs.promises` / `node:fs/promises` API (manual wrapper)
//
// `fs.promises` and `require('fs/promises')` are the SAME object in Node, so
// patching `fs.promises.<method>` updates both. ES-module imports via
// `import { readFile } from 'node:fs/promises'` use live bindings that follow
// the export — so the patch reaches them too.

const fs = require('fs');
require('graceful-fs').gracefulify(fs);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function wrapEmfileRetry(originalFn, name) {
  return async function (...args) {
    let delay = 5;
    for (let attempts = 0; attempts < 500; attempts++) {
      try {
        return await originalFn.apply(this, args);
      } catch (e) {
        if (e && (e.code === 'EMFILE' || e.code === 'ENFILE')) {
          await sleep(delay);
          delay = Math.min(delay * 1.4, 250);
          continue;
        }
        throw e;
      }
    }
    throw new Error(`EMFILE retries exhausted for fs.promises.${name}`);
  };
}

const methods = [
  'readFile', 'open', 'stat', 'lstat', 'readdir', 'access',
  'writeFile', 'copyFile', 'opendir', 'realpath', 'readlink',
];

for (const promisesObj of [fs.promises, require('fs/promises')]) {
  for (const method of methods) {
    if (typeof promisesObj[method] === 'function') {
      const original = promisesObj[method].bind(promisesObj);
      Object.defineProperty(promisesObj, method, {
        value: wrapEmfileRetry(original, method),
        writable: true,
        configurable: true,
      });
    }
  }
}
