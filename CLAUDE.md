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
