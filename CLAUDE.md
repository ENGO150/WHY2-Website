# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing/documentation site for **WHY2 Chat**, an encrypted terminal chat application (text, voice, screenshare, file transfer), with the REX cipher it runs on as a secondary story. Upstream Rust workspace: https://git.satan.red/ENGO150/WHY2 (mirror https://github.com/ENGO150/WHY2) ,  `core/` is the `why2` crate, `chat/` is the `why2-chat` crate. Locally that workspace lives at `/mnt/data/Rust/WHY2`, and a separate desktop client at `/mnt/data/Rust/WHY2-Desktop`; both are reference only ,  never edit them from this repo. This repo contains only the website. Deployed to GitHub Pages at why2.satan.red.

`/download` is the downloads page (`components/download-hub.tsx`).

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # next build -> static export in ./out
```

- There is no test suite.
- `npm run lint` is declared in package.json but **eslint is not installed** ,  it will fail. Don't rely on it; type-check with `npx tsc --noEmit` instead (note `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `next build` will not catch type errors).
- `package-lock.json` is the real lockfile; `pnpm-lock.yaml` is a stub ,  use npm.
- The export writes `out/download.html`, so a plain static server (e.g. `python3 -m http.server` in `out/`) only serves it at `/download.html`; GitHub Pages resolves `/download`.

## Architecture

Next.js 16 App Router + React 19 with **plain CSS** (no Tailwind, no component library), configured as a **static export** (`output: 'export'`). No server, no API routes, no data layer ,  every dynamic thing happens client-side in the browser.

- `app/layout.tsx` ,  the only layout: fonts, metadata, favicons, and an inline script that applies the saved theme before paint.
- `app/page.tsx` ,  the home page, written for prospective users rather than protocol reviewers. Sections render in order with their own `id` anchors (`#features`, `#security`, `#start`, `#rex`); `lib/sections.ts` lists them for the header nav and the footer. Adding a section means adding the component here *and* an entry in `SECTIONS`.
  - `hero.tsx` ,  wordmark, tagline, the REX logo (`public/icon.svg` via the `.logo-mark` mask) and a plain-language fact strip.
  - `features.tsx` (`#features`), `security.tsx` (`#security`), `cipher.tsx` (`#rex`).
  - `quick-start.tsx` (`#start`) ,  a three-step walkthrough (start a server, get a client, connect), deliberately without install commands: those live on the downloads page, so don't duplicate them here.
  - `kit.tsx` ,  shared `SecHead` and `CopyButton`. `version.tsx` ,  `<Version />`, the crates.io version badge.
- `app/globals.css` ,  the whole stylesheet: tokens on `:root`, the dark variant on `:root[data-theme="dark"]`, then one block per section.

### Design language

A security project, not a product page: two monospace faces only (Martian Mono for headings, labels and buttons; JetBrains Mono for body text), paper, ink and one red, 1px rules, no rotations or ornaments. Bracket notation for status (`[+]`, `[!]`). The logo is the REX image (`public/icon.svg`), never the TUI's block-character logo.

Keep content user-facing. Terminal UI showcases, the command reference, protocol diagrams, threat tables and cipher spec sheets were tried and removed as not of interest to people deciding whether to use it; technical depth belongs upstream (README, SECURITY, docs.rs). Talk about safety simply. An earlier zine-style pass (blackletter, tape, stamps) was also rejected as too busy.

### Things that bite

- **Theme:** the `[dark]`/`[light]` toggle sets `data-theme` on `<html>` and stores it in `localStorage` (`why2-theme`); with nothing stored it follows `prefers-color-scheme`.
- **Entrance animations must not start at `opacity: 0`** for whole blocks; headless capture and stalled animations then leave the content invisible. Terminal lines (`.ln`) fade in individually, which is fine.
- **Grid children need `min-width: 0`** when they hold nowrap content (commands, filenames), or they widen the column past the viewport on phones. Wide tables collapse columns (`.col-wide`) below their breakpoint.
- **`.copy` is the copy button's class**; don't reuse it for text.
- **Anything that must stay dark (command snippets, `.term`) should use the `--term*` tokens**, not `--fg`/`--bg`, because those two swap with the theme.
- **Only live external call:** `components/version.tsx` fetches `https://crates.io/api/v1/crates/why2-chat` for the version, with a hardcoded fallback string. Keep the fallback plausible. The site tracks the *chat* crate's version, not the core crate's ,  the two are versioned independently.
- Claims about features, commands, crypto and defaults should be checked against the upstream workspace (`chat/README.md`, `chat/src/command.rs`, `chat/src/consts.rs`) ,  the chat README is not always current, so source wins.
- `.next/` and `out/` are gitignored build output that happens to be present on disk ,  never edit or commit them.

- **Quantum wording:** only the *key exchange* is post-quantum (hybrid P-521 + ML-KEM-768). REX is a symmetric cipher and quantum-resistant by nature; never call "the encryption" post-quantum.
- **Docker image tags** (upstream `.github/workflows/docker.yml`): `release` and the version number come from the release branch, `stable` and `latest` from the stable branch, `development` from development. The site points at `:release`, matching upstream `chat/docker-compose.yml` and the downloads page's "pick Release if unsure".
- Copy rules for this site: **no em dashes** anywhere in page text, and **never describe the chat as end-to-end encrypted**. Traffic is encrypted between client and server; the server decrypts to route, store history and moderate. The server being able to read messages is **intentional** and the site says so: end-to-end encryption depends on whoever distributes the keys, usually a third-party key or certificate server that could be malicious, which makes it eye candy; WHY2 instead has you trust one server you choose or run. Present it as a design decision, not a shortcoming. Also avoid implying the terminal client is the only client: a separate desktop app exists (`/mnt/data/Rust/WHY2-Desktop`), and the downloads page ships it.

## Deploy

`.github/workflows/nextjs.yml` builds on push to `master` and publishes `./out` to GitHub Pages. `basePath` is commented out in `next.config.mjs` because the site is served from a custom domain root ,  restore it only if deploying under a repo subpath.
