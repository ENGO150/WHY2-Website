# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing/documentation site for **WHY2 Chat**, an encrypted terminal chat application (text, voice, screenshare, file transfer), with the REX cipher it runs on as a secondary story. Upstream Rust workspace: https://git.satan.red/ENGO150/WHY2 (mirror https://github.com/ENGO150/WHY2) ,  `core/` is the `why2` crate, `chat/` is the `why2-chat` crate. Locally that workspace lives at `/mnt/data/Rust/WHY2`, and a separate desktop client at `/mnt/data/Rust/WHY2-Desktop`; both are reference only ,  never edit them from this repo. This repo contains only the website. Deployed to GitHub Pages at why2.satan.red.

A downloads page is planned but not built yet.

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # next build -> static export in ./out
```

- There is no test suite.
- `npm run lint` is declared in package.json but **eslint is not installed** ,  it will fail. Don't rely on it; type-check with `npx tsc --noEmit` instead (note `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `next build` will not catch type errors).
- `package-lock.json` is the real lockfile; `pnpm-lock.yaml` is a stub ,  use npm.

## Architecture

Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui (new-york style), configured as a **static export** (`output: 'export'`). No server, no API routes, no data layer ,  every dynamic thing happens client-side in the browser.

- `app/layout.tsx` ,  the only layout: fonts (Inter / JetBrains Mono as `--font-inter` / `--font-jetbrains`), metadata, favicons, and `<SmoothScroller />`.
- `app/page.tsx` ,  the entire site. Sections are composed in order and wrapped in `<div id="...">` anchors (`#client`, `#features`, `#security`, `#start`, `#cipher`) that `components/navbar.tsx` links to via `NAV_LINKS`. Adding a section means adding the component here *and* an entry in `NAV_LINKS`.
  - `chat-showcase` (`#client`) ,  TUI mock with Text/Voice/Screenshare/Files scenes; mirrors the real ratatui layout (title `WHY2 ── server ── #channel`, Online/Channels/Voice sidebars) and the real slash commands from `chat/src/command.rs`.
  - `encryption-demo` (`#security`) ,  stepper walking a message from handshake to wire (P-521 + ML-KEM-768, Argon2 auth, CTR keystream, HMAC-SHA256, 10-minute rekey).
  - `cipher-section` (`#cipher`) ,  the `why2` crate itself, demoted below the chat story.
- `components/*.tsx` ,  one file per page section, all `"use client"`. `components/ui/` is generated shadcn/ui; most of it is unused boilerplate ,  prefer editing section components over adding UI primitives.
- `app/globals.css` ,  the live stylesheet (Tailwind v4 CSS-first config: `@theme inline`, oklch design tokens, custom keyframes/utilities, the `.noise-overlay` grain). `styles/globals.css` is a stale duplicate that nothing imports.

### Things that bite

- **Scrolling is doubly managed.** `SmoothScroller` runs Lenis globally; `Navbar.scrollToSection` separately calls `window.scrollTo`. Changing scroll behavior means touching both.
- **Theme is dark-only in practice.** `:root` and `.dark` in `app/globals.css` hold identical values, and `components/theme-provider.tsx` (next-themes) is never mounted. Adding a light theme means wiring the provider *and* differentiating the two token blocks.
- **Only live external call:** `HeroSection` fetches `https://crates.io/api/v1/crates/why2-chat` for the version badge, with a hardcoded fallback string. Keep the fallback plausible. Note the site tracks the *chat* crate's version, not the core crate's ,  the two are versioned independently.
- `components/encryption-demo.tsx` is a *visual analogy*, not a real implementation ,  its `transformValue` math is decorative. Don't "fix" it toward cryptographic correctness; do keep step labels/descriptions in sync with the crates. Its grids are hardcoded constants rather than `Math.random()` on purpose: the page is statically prerendered, and random initial state would desync hydration.
- Claims about features, commands, crypto and defaults should be checked against the upstream workspace (`chat/README.md`, `chat/src/command.rs`, `chat/src/consts.rs`) ,  the chat README is not always current, so source wins.
- `.next/` and `out/` are gitignored build output that happens to be present on disk ,  never edit or commit them.

- Copy rules for this site: **no em dashes** anywhere in page text, and **never describe the chat as end-to-end encrypted**. Traffic is encrypted between client and server; the server decrypts to route, store history and moderate. Also avoid implying the terminal client is the only client: a separate desktop app exists (`/mnt/data/Rust/WHY2-Desktop`) even though this site does not cover it yet.
- Terminal mock text in `hero-section` and `chat-showcase` is copied from the client's real output in `chat/src/bin/client/tui/event.rs`. Server notices are prefixed `[server]` (the `server_username` config default), private messages render as `[PM TO] user (id): text`, and `/files` prints a `├─ ╰─` tree of owner then file IDs. Keep new lines faithful to that file rather than inventing plausible-looking ones.

## Deploy

`.github/workflows/nextjs.yml` builds on push to `master` and publishes `./out` to GitHub Pages. `basePath` is commented out in `next.config.mjs` because the site is served from a custom domain root ,  restore it only if deploying under a repo subpath.
