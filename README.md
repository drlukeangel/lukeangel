# lukeangel.co

Personal site. Astro + Markdown + Pagefind. Static, fast, real SEO.

## What's where

| Path                          | What's there                                    |
|-------------------------------|-------------------------------------------------|
| `src/content/blog/*.md`       | Blog posts. Add a `.md` file → it's a new post. |
| `src/content/gratitude/*.md`  | Daily gratitude entries (the microblog).        |
| `src/content/projects/*.md`   | Case studies / field studies.                   |
| `src/content/courses/*.md`    | Course detail pages.                            |
| `src/content/config.ts`       | Schemas for all of the above (typed frontmatter). |
| `src/pages/`                  | Routes. Filenames map to URLs.                  |
| `src/layouts/Base.astro`      | Page chrome (header + footer + meta tags + OG). |
| `src/styles/global.css`       | Palette tokens + global styles. Ivory + cobalt by default. |

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
```

## Build for production

```bash
npm run build        # builds to ./dist, then runs Pagefind to index
npm run preview      # serve ./dist locally
```

## Adding a blog post

Create `src/content/blog/your-slug.md`:

```markdown
---
title: "Your post title"
date: 2026-05-14
category: method            # method | teams | craft | tools | people
tags: [evals, prompting]
excerpt: "One-line preview."
pullquote: "Optional pull quote."
featured: false
---

Your post body in Markdown.
```

That's the whole flow:
- Auto-listed on `/blog/`
- Auto-routed to `/blog/your-slug/`
- Auto-related to other posts (by tag overlap + same category)
- Auto-categorized at `/category/<category>/`
- Auto-tagged at `/tag/<tag>/`
- Auto-indexed by Pagefind for `/search`
- Auto-included in `/rss.xml` and `/sitemap-index.xml`

## Adding a gratitude entry

Create `src/content/gratitude/2026-05-14.md`:

```markdown
---
date: 2026-05-14
tag: team           # team | home | students | readers | mentees | craft | method | small | editors
long: false         # true to span 2 columns
---

For whoever or whatever. One sentence is best.
```

## Deploy to Vercel (recommended)

1. **Push to GitHub** (private or public).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, click **Deploy**. Vercel auto-detects Astro.
3. **Add your domain**: Vercel project → Settings → Domains → add `lukeangel.co` and `www.lukeangel.co`.
4. **DNS at your registrar** (Namecheap / Cloudflare / wherever):
   - Apex `lukeangel.co`: A record → `76.76.21.21`
   - `www`: CNAME → `cname.vercel-dns.com`
   - Vercel will provision HTTPS automatically.
5. Push to `main` to deploy. Push to a branch to get a preview URL.

**Cost:** $0/month for traffic well into the millions.

## Deploy to Netlify

1. [netlify.com/start](https://netlify.com/start), connect repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Domains tab → add `lukeangel.co`. Netlify gives you DNS records to point at.

## Deploy to Cloudflare Pages (also good)

1. [pages.cloudflare.com](https://pages.cloudflare.com), connect repo.
2. Framework preset: Astro
3. Build command: `npm run build`
4. Output: `dist`
5. If `lukeangel.co` is already on Cloudflare DNS, "custom domain" → one click.

## SEO that's already wired

- ✅ Per-page `<title>`, meta description, canonical URL
- ✅ Open Graph tags for Twitter/LinkedIn previews
- ✅ Auto-generated `sitemap-index.xml`
- ✅ `/rss.xml` feed for blog posts
- ✅ Real `<h1>` per page, semantic HTML
- ✅ Pagefind static search (zero server, zero cost)
- ✅ Light / dark mode (CSS variables + JS toggle, prefers-color-scheme aware)

## To do after deploy

- [ ] Replace placeholder `og.png` in `public/` with a real cover image (1200×630 px)
- [ ] Drop a real portrait into `public/assets/luke.png` and update the home/about page
- [ ] Replace the Buttondown form action on `/contact/` with your real newsletter endpoint
- [ ] Set up Plausible or Fathom analytics (`<script>` in `Base.astro` head)
- [ ] Add Google Search Console: verify the site, submit `/sitemap-index.xml`
- [ ] Hook a "Reserve a seat" button on courses → real Stripe / Lemon Squeezy checkout
