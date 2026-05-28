# Project guidance for Claude

## Public-facing output rules

**Never reference Claude in anything that ends up public.** This includes:

- **Commit messages**: Do not add `Co-Authored-By: Claude` trailers. Do not mention Claude, Anthropic, or "AI assistance" in the commit message body.
- **Pull request titles or bodies**: No `Generated with Claude Code` footers. No "🤖" emoji credit lines. PR descriptions should read as if a human wrote them.
- **README, docs, blog posts, code comments**: No mention of Claude, Anthropic, Claude Code, or the assistance pipeline. No "this file was AI-generated" markers.
- **Public artifacts of any kind** (Gists, deploy logs, status pages, social posts drafted via this repo): same rule.

The `lukeangel.co` domain, the site itself, and the author's name are fine to reference publicly — those are the product. Claude is the tool used to build it and stays invisible.

## What this means in practice

- When generating a commit, **omit** the `Co-Authored-By: Claude ...` line from the HEREDOC.
- When generating a PR body, **omit** the `🤖 Generated with [Claude Code]` footer.
- Internal scratch files inside `.claude/` or local memory directories are fine — those don't ship.

If asked to add a credit line that mentions Claude, push back and ask whether the user really wants it public, then default to omitting unless they confirm.

## Blog remediation — how this work runs

The `new-blog.md` cleanup (100+ bulk-generated IoT posts → publish bar) runs as an **orchestrator + worker** split, because doing it all in one context blows the token budget:

- **Claude (orchestrator + QA):** plans order, spawns writer-agents, and does the *judgment* review — voice fidelity, right-angle-for-notebook, anachronisms, clickbait, taste, FUBAR-vs-polish calls. QA by *sampling* (read a few, render a few) to stay lean.
- **Writer-agents (ephemeral Opus):** do the writing + hand-drawn SVGs, one post at a time, per `docs/agents/post-creator.md`, which points them at `docs/Voice.md` + `docs/Graphics.md`. They self-check renders; they're disposable — restart fresh when one fills its context or drifts. **Every spawn prompt must remind them: the technical content must be the tech available on the post's date** (the time-machine rule — the thing that breaks most).
- **Convergence:** when output misses, fix the **docs/spec** (not just the one post) and restart. The docs are the durable brain; the agents are cheap hands.

**Authoring standards:** `docs/Voice.md`, `docs/Graphics.md`. **Running flags** (missing / FUBAR notebooks): `remediation-notes.md`. Any agent touching blog content reads Voice + Graphics first.

### QA checklist (orchestrator, every post)
**I own the output quality — never trust an agent's report.** A self-report is an unverified claim (agents drift and misreport on long runs); the `git diff` and the rendered page are the only truth. For *every* post, no sampling: read the full prose, rasterize + view *every* SVG, confirm the render, read the diff. Checklist: Voice (per Voice.md) · right angle for its notebook · **period-correct tech only — the technical content must be what existed and was current on the post's date (time-machine)** · no clickbait / selling / hand-waving · real technical depth · cover text-free + content-accurate · ≥1 diagram / 500 words · renders 200, no errors · cross-links valid and backward-dated.

### Lesson — the OTA miss (bake into review)
We once shipped an *operations* post inside the *security* notebook, because review only asked "is the post good?" and "does the notebook cover the topic?" — never "does this post attack its topic from **this notebook's** angle?" Compounded by giving inherited/KEEP posts a lighter pass than newly-written ones, and by glossing a title that signaled the wrong frame. **Standing fix:** the right-angle check is part of QA, applied to inherited posts as hard as new ones.

## Repository layout — where assets go

Three homes, three jobs — keep them separate:

- **`src/content/blog/`** — post `.mdoc`/`.md` files. Routes render at `/blog/<slug>/`.
- **`src/assets/blog/`** — **images only** (cover SVGs, photos, diagrams), processed by Astro's image pipeline. Referenced from posts with relative paths (`../../assets/blog/<file>`). Flat folder, named `<post-slug>-<descriptor>.<ext>`. Never delete a *referenced* image — it 500s every `/blog/` route via the Astro cache; overwrite or orphan instead.
- **`public/downloads/`** — **raw downloadable files** a reader grabs byte-for-byte (configs, datasets, code). Served verbatim at `/downloads/...`. Do NOT put these in `src/assets` — the image pipeline won't serve a raw link and the markdown link 404s on build. Organize per slug: `public/downloads/<post-slug>/<file>` for post-specific files, `public/downloads/<notebook-slug>/<file>` for files shared across a series. Link from a post with the absolute URL `/downloads/<slug>/<file>`.

Rule of thumb: if Astro should optimize it (an image), it's `src/assets`; if a reader downloads it as-is, it's `public/downloads`.
