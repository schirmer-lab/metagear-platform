# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This repo (`schirmer-lab/metagear`) hosts the **MetaGEAR Platform** umbrella website — a high-level overview site that introduces the platform and links out to each component's own repository. It is **not** a docs aggregator; deep technical reference lives next to the code in each component repo:

- **MetaGEAR Workflows** → `schirmer-lab/metagear-pipeline` (Nextflow / nf-core pipeline, public source)
- **MetaGEAR Tools (CLI)** → `schirmer-lab/metagear-tools` (public source, extracted from this repo on 2026-05-07)
- **MetaGEAR Explorer** → hosted at https://metagear-explorer.schirmerlab.de. **Source is not publicly available** — there is a private repo `schirmer-lab/metagear-explorer` you may see referenced in older artifacts, but the platform site must not link to it. Refer to Explorer by its hosted URL only.

**Naming convention on the platform site:** the CLI is referred to as **"MetaGEAR Tools (CLI)"** in headings/sidebar/page titles and **"MetaGEAR Tools"** in prose. Avoid the bare word "Tools" alone — it reads generic. The repo name `metagear-tools` is kept as-is.

The preprint lives in `paper-metagear-explorer-microbiome` (a sibling working tree).

When a task is about CLI flags or pipeline parameters, the right repo is one of the open-source component repos — not this one. For anything Explorer-related, point users at the hosted portal or the preprint; do not promise repo access.

**Important factual constraint:** running the pipeline locally does **not** push results into Explorer. Explorer serves curated catalogs the Schirmer Lab maintains centrally. Don't write content that implies a live data pipe between Workflows and Explorer — they're independent products.

The repo may be renamed to `metagear-platform` later; for now the GitHub repo URL stays `schirmer-lab/metagear`. The site is served from the **custom domain** `https://metagear-platform.schirmerlab.de` (GoDaddy CNAME → `schirmer-lab.github.io`; org-verified; HTTPS enforced in repo Settings → Pages). The `public/CNAME` file is required because the site is deployed via GitHub Actions, not from a branch.

## Stack

Astro 5 + Starlight 0.30. Pure static site, deployed to GitHub Pages via `.github/workflows/pages.yml` on pushes to `main`/`master`/`feature/*`/`release/*` that touch `src/**`, `public/**`, `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, or the workflow itself.

Key config:

- `site: 'https://metagear-platform.schirmerlab.de'` — feeds canonical URLs, sitemap, and OG/Twitter image URLs. No `base` is set; the site is served from the root of the custom domain.
- Pagefind client-side search ships out-of-the-box with Starlight.
- Sitemap is generated automatically (Starlight pulls in `@astrojs/sitemap`).

### Local dev

```bash
npm install
npm run dev          # http://localhost:4321/metagear
npm run build        # → dist/
npm run preview
```

## Content model

The site is intentionally small (8 routes). Pages live in `src/content/docs/`, one per route:

- `index.mdx` — landing, uses Starlight's `template: splash` (hero + CardGrid).
- `about.md`, `get-started.md`, `workflows.md`, `tools.md`, `explorer.md`, `cite.md`, `news.md`.

To add a page: create the file under `src/content/docs/`, then add it to the `sidebar` array in `astro.config.mjs`. The sidebar groups components under one nested section ("Components").

### Authoring conventions

- **Target audience is microbiome researchers / wet-lab PIs**, not bioinformaticians. Biology-first framing. Mention Nextflow/Docker once and move on.
- **One outbound link per component page** to the canonical repository — don't duplicate detailed docs here, link to them.
- **Don't import deep reference here.** If something changes with code (CLI flags, nf-core schema), it stays in the component repo. The platform site is positioning + navigation.

## Styling

Custom palette lives in `src/styles/custom.css` (registered via `customCss` in `astro.config.mjs`). Accent is a teal/emerald (`#0d9488` dark, `#0f766e` light). Hero gradient + card hover polish are also in there. Mobile-first: the hero clamp scales fluidly down to phone widths.

Logo is a hand-authored SVG hex-cube at `src/assets/logo-light.svg` (and `-dark.svg`, currently identical). It uses `currentColor` so the CSS in `custom.css` tints it to the accent.

## Legacy content

The previous Jekyll site lives under `legacy-docs/` (renamed from `docs/`). It's preserved for reference but not part of the build and not published. Don't add new content there. If a piece of old content should survive on the new site, port it into `src/content/docs/`.

## What lives elsewhere

- **CLI / installer / templates** → `metagear-tools` (extracted 2026-05-07 in commit `cbe3311`).
- **Pipeline workflow definitions, schema, nf-core lint config** → `metagear-pipeline`.
- **Web app, FastAPI service, MongoDB schema, Playwright E2E** → `metagear-explorer`.
- **Preprint LaTeX source** → `paper-metagear-explorer-microbiome`.

If you're asked to change something CLI- or workflow-specific while working in this repo, suggest making the change in the right component repo and updating the link here only if needed.
