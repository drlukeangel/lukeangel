// Publish-gating helpers for dated content.
//
// A post is "live" when it is not a draft AND its date is today or earlier.
// Future-dated posts are therefore hidden until their day — so you can write
// ahead and let them publish on schedule, without marking them as drafts.
//
// IMPORTANT — static build caveat: this site builds statically (Vercel adapter),
// so `Date.now()` is evaluated at BUILD time, not per request. A future-dated
// post will not appear on its date by itself; it appears on the next rebuild
// that happens on or after that date. Schedule a periodic redeploy (e.g. a daily
// Vercel deploy-hook / cron) so scheduled posts go live automatically.

/** True when a dated, draftable entry should be publicly visible right now. */
export function isLive(data: { draft?: boolean; date: Date }): boolean {
  return !data.draft && data.date.getTime() <= Date.now();
}

/** True when a dated entry (no draft flag, e.g. gratitude) is past its publish date. */
export function isPublished(data: { date: Date }): boolean {
  return data.date.getTime() <= Date.now();
}
