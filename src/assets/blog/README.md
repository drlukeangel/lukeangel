# Asset-pipeline images

**Images only.** Files here are processed by Astro at build time (resized,
converted to WebP/AVIF, lazy-loaded, aspect-ratio preserved). Flat folder,
named `<post-slug>-<descriptor>.<ext>`.

Reference them from a post (`.mdoc` or `.md`) with a **relative path**:

```markdown
![Descriptive alt text](../../assets/blog/your-slug-diagram.svg)
```

And set the post's cover the same way, via frontmatter:

```yaml
cover: "../../assets/blog/your-slug-cover.svg"
coverAlt: "What the cover shows."
```

Notes:
- ⚠️ **Never delete a referenced image** — it 500s every `/blog/` route via
  Astro's content cache. Overwrite in place, or orphan it; don't `rm`/`git rm`.
- **Raw downloadable files** (configs, datasets, code) do **not** go here — the
  image pipeline won't serve a plain link. Put those in `public/downloads/<slug>/`
  and link them with an absolute `/downloads/...` URL. See the root `README.md`.
