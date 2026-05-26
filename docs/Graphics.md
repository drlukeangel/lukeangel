# Graphics — covers & diagrams for lukeangel.co

Every image is **hand-drawn SVG**. **No scripts** — never bulk-generate art; each artifact is made by hand, one at a time. (Bulk scripts are what produced the garbage this whole effort is fixing.)

## Covers (one per post, viewBox 1200×630)
- **Text-free illustrations — no text at all, including functional labels.** No title/notebook №/part №/date (those go stale and aren't SEO-indexed), AND no object labels like "BANK 0" or "SIGNED ROM" either — those belong on inline diagrams, never on covers. A cover is a clean hero illustration the visual alone carries. The page H1 + metadata carry the words.
- **Content-accurate.** The cover depicts the post's actual subject; it must not imply a structure that doesn't exist (e.g. a 7-layer diagram for a 3-post notebook).
- Cream background `#fdfaf2` + a faint dot pattern + a **24px left accent bar** in the notebook's accent color.

## Inline diagrams
- **~1 per 500 words is a floor, not a cap** — more is better; exact placement is loose; visuals that break up text help the reader (Luke is a visual learner who uses diagrams to think).
- Functional labels only; the ranking keywords live in the **body + the `alt` text** (text inside an SVG served as `<img>` is *not* SEO-indexed).
- Cream bg + a subtle border (`fill #fdfaf2 stroke #1a1d24 stroke-opacity 0.12`), not the dot pattern.
- **Rich `alt` text** that mirrors what the diagram shows (SEO + accessibility).

## Color tokens
- ink `#1a1d24` · muted `#7a808c` / `#5b616b` · valid/✓ green `#3a7d44` · semantic bad/✗/danger red `#c14a3a`.
- **Per-notebook accent** (cover bar + brand elements in diagrams):
  - iot-security `#c14a3a` · connected-products `#2a52be` · pet-iot `#c87533` · smart-home `#6a4c93` · medical `#357a8c` · predictions `#0066cc` · building-with-ai-ml `#4f46b8`.

## Type & icons
- Labels: `ui-monospace, 'JetBrains Mono', monospace`. Captions: `Newsreader, Georgia, serif`, italic. Use generic fallbacks; never depend on an exotic font being installed.
- **No emoji as glyphs** — draw icons as paths: locks, keys, shields, checks, ✗, chips (rect + pins), clouds, device pucks, certificate seals (circle + ribbon + ✓).

## Wiring
- Inline: markdown `![rich alt text](../../assets/blog/<name>.svg)` in the `.md` body.
- Cover: frontmatter `cover: "../../assets/blog/<name>.svg"` + `coverAlt: "..."`.

## Gotcha — the 1000-byte SVG landmine (this one 500s the whole blog)
Astro's bundled `image-size` detector scans only the **first 1000 bytes** of an SVG to identify it. If the root `<svg …>` tag's closing `>` lands *past* byte 1000 — which happens when the root `aria-label` is long — detection fails (`NoImageMetadata`) and the route 500s. The blog layout eagerly resolves sibling covers, so **one over-long SVG 500s _every_ `/blog/*` route, not just its own post.**
- **Keep the root `<svg>` `aria-label` short** (a few words) or omit it. The rich SEO/a11y description goes in the markdown `![alt]` (inline) or frontmatter `coverAlt` (cover) — **never** the SVG root tag.
- Before shipping any SVG, confirm its root tag closes under 1000 bytes.

## QA every SVG before shipping
1. **Rasterize and look at it.** `node -e "require('sharp')('src/assets/blog/X.svg').png().toFile(require('os').tmpdir()+'/X.png')"` then read the PNG. Fix overlaps, clipping, text running off the box.
2. **Render the post** on the dev server: `curl http://localhost:4321/blog/<slug>/` → HTTP 200, the SVG referenced, no `astro-error` / `vite-error`.
3. Covers text-free; every diagram's information also present in its `alt` + the prose.
