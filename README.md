# lukeangel.co

Personal site. Astro + Markdoc + Keystatic + Pagefind. Static, fast, real SEO.

## What's where

| Path                            | What's there                                                        |
|---------------------------------|---------------------------------------------------------------------|
| `src/content/blog/*.mdoc`       | Blog posts. Add a `.mdoc` file → it's a new post.                    |
| `src/content/notebooks/*.mdoc`  | Notebooks — themed collections that group blog posts.               |
| `src/content/gratitude/*.mdoc`  | Daily gratitude entries (the microblog).                            |
| `src/content/projects/*.mdoc`   | Case studies / field studies.                                       |
| `src/content/courses/*.mdoc`    | Course detail pages.                                                |
| `src/content/config.ts`         | Schemas for all of the above (typed frontmatter).                   |
| `src/assets/blog/`              | **Images only** — covers, photos, diagrams (Astro optimizes these). |
| `public/downloads/`             | **Raw downloadable files** — configs, datasets, code (served as-is). |
| `src/pages/`                    | Routes. Filenames map to URLs.                                      |
| `src/layouts/`                  | Page chrome (header + footer + meta tags + OG).                     |
| `src/styles/global.css`         | Palette tokens + global styles.                                     |
| `keystatic.config.ts`           | The local CMS config (collections + field types).                  |

## Local dev

```bash
npm install          # install everything, including devDependencies (the build needs them)
npm run dev          # http://localhost:4321
```

## Edit in the browser (Keystatic)

A local CMS is wired up. With the dev server running, open:

```
http://localhost:4321/keystatic
```

Edit posts, gratitude, projects, notebooks, and courses through a form UI that writes straight to the `.mdoc` files in `src/content/`. It runs in **local mode** — no accounts, no cloud; everything stays in the repo. Editing prose or frontmatter and saving is non-destructive (that's why content is Markdoc, not raw Markdown — tables and structure survive a round-trip through the editor).

## Build for production

```bash
npm run build        # astro build → dist/ (static client in dist/client/), then Pagefind indexes dist/client
npm run preview      # serve the build locally
npm run reindex      # rebuild just the Pagefind search index (no full rebuild)
```

The build runs through `cross-env` + a small `patch-fs.cjs` shim and Pagefind, all of which live in `devDependencies` — so a production-only `npm install --omit=dev` will fail. Install everything.

## Content model

### A blog post

Create `src/content/blog/your-slug.mdoc` (or use Keystatic):

```markdown
---
title: "Your post title"
date: 2026-05-28T09:00:00-04:00
category: projects        # method | teams | craft | tools | people | projects | programs | product | give
tags: [iot, hardware]
excerpt: "One-line preview — reads like a book jacket, not a table of contents."
pullquote: "Optional pull quote."
cover: "../../assets/blog/your-slug-cover.svg"   # relative path into src/assets/blog
coverAlt: "What the cover shows (text-free image; the words live here)."
notebook: your-notebook-slug    # optional — which notebook this belongs to
notebookOrder: 1                # optional — position within the notebook
featured: false
draft: false                    # true = hidden from the build entirely
---

Your post body in Markdoc.
```

That's the whole flow — auto-listed on `/blog/`, routed to `/blog/your-slug/`, related by tag + category, filed under `/category/<category>/` and `/tag/<tag>/`, indexed by Pagefind, and added to `/rss.xml` + the sitemap.

**`.mdoc` vs `.md`:** posts are Markdoc (`.mdoc`) so Keystatic can edit them safely. Plain `.md` still renders and is the escape hatch for posts whose code blocks contain `{% ... %}` (e.g. Home Assistant / Jinja examples) — Markdoc parses `{% %}` even inside fences, so those few posts stay `.md`.

### A gratitude entry

Create `src/content/gratitude/2026-05-28.mdoc`:

```markdown
---
date: 2026-05-28
topic: trailblazers   # team | home | readers | world | tech | everyday | craft | trailblazers
level: small          # small | medium | large  (controls card size)
---

For whoever or whatever. One sentence is best.
```

### Notebooks

A notebook is a themed shelf that groups posts. Create `src/content/notebooks/your-notebook-slug.mdoc` with `title`, `summary`, and an `accent` color; then point posts at it via their `notebook:` + `notebookOrder:` frontmatter. The notebook page sorts members by `notebookOrder` then `date`.

## Assets — where things go

Three homes, three jobs. Keep them separate:

- **`src/assets/blog/`** — **images** (cover SVGs, photos, diagrams). These go through Astro's image pipeline (WebP/AVIF, sizing). Reference them with a **relative path** from the post: `![alt](../../assets/blog/your-image.svg)`, and set the cover via the `cover:` frontmatter field (also a relative path). Flat folder, named `<post-slug>-<descriptor>.<ext>`.
  - ⚠️ **Never delete a *referenced* image** — it 500s every `/blog/` route via Astro's content cache. Overwrite it in place, or orphan it; don't `rm`/`git rm` it.
- **`public/downloads/`** — **raw files a reader downloads byte-for-byte** (configs, datasets, code). Served verbatim. Do **not** put these in `src/assets` — the image pipeline won't serve a raw link and the markdown link 404s on build. Organize by slug:
  - `public/downloads/<post-slug>/<file>` for post-specific files
  - `public/downloads/<notebook-slug>/<file>` for files shared across a series
  - Link them with the absolute URL: `[download the config](/downloads/<slug>/<file>)`
- **`public/`** (root) — site-level static files: `favicon.png`, `og.png`, the generated `pagefind/` index.

Rule of thumb: if Astro should optimize it (an image) → `src/assets/blog/`. If a reader grabs it as-is → `public/downloads/<slug>/`.

## Deploy to Vercel

1. **Push to GitHub.**
2. [vercel.com/new](https://vercel.com/new) → import the repo → **Deploy**. Vercel auto-detects Astro (the `@astrojs/vercel` adapter is already configured).
3. **Add the domain**: project → Settings → Domains → add `lukeangel.co` and `www.lukeangel.co`.
4. **DNS at the registrar:**
   - Apex `lukeangel.co`: A record → `76.76.21.21`
   - `www`: CNAME → `cname.vercel-dns.com`
   - Vercel provisions HTTPS automatically.
5. Push to `master` to deploy. Push to any other branch for a preview URL.

**Cost:** $0/month for traffic well into the millions.

## Deploy to Netlify

1. [netlify.com/start](https://netlify.com/start), connect the repo.
2. Build command: `npm run build` · Publish directory: `dist`
3. Domains tab → add `lukeangel.co`; point DNS at the records Netlify gives you.

## Deploy to Cloudflare Pages

1. [pages.cloudflare.com](https://pages.cloudflare.com), connect the repo.
2. Framework preset: Astro · Build command: `npm run build` · Output: `dist`
3. If `lukeangel.co` is already on Cloudflare DNS, "custom domain" → one click.

## SEO that's already wired

- ✅ Per-page `<title>`, meta description, canonical URL
- ✅ Open Graph tags for social previews
- ✅ JSON-LD structured data (`astro-seo-graph`)
- ✅ Auto-generated `sitemap-index.xml` and `robots.txt`
- ✅ `/rss.xml` feed for blog posts
- ✅ Breadcrumbs, real `<h1>` per page, semantic HTML
- ✅ Pagefind static search (zero server, zero cost) at `/search`
- ✅ Light / dark mode (CSS variables + JS toggle, prefers-color-scheme aware)

## To do after deploy

- [ ] Replace placeholder `og.png` in `public/` with a real cover image (1200×630)
- [ ] Set up privacy-friendly analytics (Plausible/Fathom) in the base layout head
- [ ] Add Google Search Console: verify the site, submit `/sitemap-index.xml`
- [ ] Wire course "Reserve a seat" buttons to a real checkout
