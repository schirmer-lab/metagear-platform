# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This repo (`schirmer-lab/metagear`) hosts the **MetaGEAR Platform** umbrella website — a high-level overview site that introduces the platform and links out to each component's own repository. It is **not** a docs aggregator; deep technical reference lives next to the code in each component repo:

- **MetaGEAR Workflows** → `schirmer-lab/metagear-pipeline` (public Nextflow / nf-core-style pipeline; this is what the platform site links to and mirrors docs from). There is also a private internal `schirmer-lab/metagear-pipeline-dev` where active development happens; changes flow from `-dev` to public over time. The platform must only reference the public repo so visitors don't hit auth walls.
- **MetaGEAR Tools (CLI)** → `schirmer-lab/metagear-tools` (public source, extracted from this repo on 2026-05-07)
- **MetaGEAR Explorer** → hosted at https://metagear-explorer.schirmerlab.de. **Source is not publicly available** — there is a private repo `schirmer-lab/metagear-explorer` you may see referenced in older artifacts, but the platform site must not link to it. Refer to Explorer by its hosted URL only.

**Naming convention on the platform site:** the CLI is referred to as **"MetaGEAR Tools (CLI)"** in headings/sidebar/page titles and **"MetaGEAR Tools"** in prose. Avoid the bare word "Tools" alone — it reads generic. The repo name `metagear-tools` is kept as-is.

The preprint lives in `paper-metagear-explorer-microbiome` (a sibling working tree).

When a task is about CLI flags or pipeline parameters, the right repo is one of the open-source component repos — not this one. For anything Explorer-related, point users at the hosted portal or the preprint; do not promise repo access.

**Important factual constraint:** running the pipeline locally does **not** push results into Explorer. Explorer serves curated catalogs the Schirmer Lab maintains centrally. Don't write content that implies a live data pipe between Workflows and Explorer — they're independent products.

The repo may be renamed to `metagear-platform` later; for now the GitHub repo URL stays `schirmer-lab/metagear`. The site is served from the **custom domain** `https://metagear-platform.schirmerlab.de` (GoDaddy CNAME → `schirmer-lab.github.io`; org-verified; HTTPS enforced in repo Settings → Pages). The `public/CNAME` file is required because the site is deployed via GitHub Actions, not from a branch.

## Stack

Astro 5 + Starlight 0.30. Pure static site, deployed to GitHub Pages via `.github/workflows/pages.yml` on pushes to `main`/`master`/`feature/*`/`release/*` that touch `src/**`, `public/**`, `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, `pipeline-docs.json`, `scripts/**`, or the workflow itself.

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

The hand-authored part of the site stays intentionally small (~8 routes). Pages live in `src/content/docs/`, one per route:

- `index.mdx` — landing, uses Starlight's `template: splash` (hero + CardGrid).
- `about.md`, `get-started.md`, `workflows.md`, `tools.md`, `explorer.md`, `cite.md`, `news.md`.
- `pipeline/index.md` — landing for the mirrored Pipeline reference section (see [Mirrored docs](#mirrored-docs)).

To add a page: create the file under `src/content/docs/`, then add it to the `sidebar` array in `astro.config.mjs`. The sidebar groups components under one nested section ("Components") and pipeline reference under another ("Pipeline reference").

### Authoring conventions

- **Target audience is microbiome researchers / wet-lab PIs**, not bioinformaticians. Biology-first framing. Mention Nextflow/Docker once and move on.
- **One outbound link per component page** to the canonical repository — don't duplicate detailed docs here, link to them.
- **Don't author deep reference here.** Source of truth for technical reference (per-workflow parameters, output schemas, CLI flags) lives in the component repos. Some of that content is *mirrored* into the platform site at build time so readers see it with Starlight chrome and Pagefind search — see [Mirrored docs](#mirrored-docs) — but the markdown source still belongs in the component repo. Edits go there.

## Styling

Custom palette lives in `src/styles/custom.css` (registered via `customCss` in `astro.config.mjs`). Accent is a teal/emerald (`#0d9488` dark, `#0f766e` light). Hero gradient + card hover polish are also in there. Mobile-first: the hero clamp scales fluidly down to phone widths.

Logo is a hand-authored SVG hex-cube at `src/assets/logo-light.svg` (and `-dark.svg`, currently identical). It uses `currentColor` so the CSS in `custom.css` tints it to the accent.

## nf-core lint: do not modify template-locked files

Both pipeline repos (`metagear-pipeline` and `metagear-pipeline-dev`) run `nf-core lint` in CI. The `files_unchanged` lint test enforces byte-for-byte equality against the nf-core template for a set of files. The **explicit** list in each repo's `.nf-core.yml` (`lint.files_unchanged`) is not the whole story — nf-core lint also enforces an **implicit default** list that is not spelled out there. Known template-locked files include:

- `docs/README.md` — the two-bullet index file. Only `[Usage](usage.md)` and `[Output](output.md)` entries are permitted; the build fails the moment a third bullet is added.
- `CODE_OF_CONDUCT.md`, `LICENSE`, `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md`, various email/logo assets.

`docs/usage.md` and the root `README.md` are **not** template-locked — they are expected to carry pipeline-specific content, so additions there are fine (this is where workflow-selection pointers go).

When adding new documentation in either pipeline repo, put it under a new subdirectory like `docs/workflows/` and link to it from `docs/usage.md` or root `README.md`. Never edit `docs/README.md`. The platform site is the primary discovery surface anyway (see [Mirrored docs](#mirrored-docs)), so inside the pipeline repo, a single pointer from `docs/usage.md` is sufficient.

If a deliberate divergence from the template is required, the only legitimate path is to add the file to `lint.files_unchanged` in `.nf-core.yml` — but that is a real architectural decision, not a workaround.

## Mirrored docs

The `Pipeline reference` section under `/pipeline/` is mirrored from the **public** pipeline repo [`schirmer-lab/metagear-pipeline`](https://github.com/schirmer-lab/metagear-pipeline) at build time (default branch `master`). The platform repo never holds a committed copy of the markdown — it is downloaded fresh each build. The private `-dev` repo must never be referenced from the platform site (auth wall).

How it works:

- `pipeline-docs.json` at the repo root pins the source: `{ repo, ref, sourceDir, files }`. Pin `ref` to a commit SHA for reproducibility; the public pipeline's default branch (`master`) is acceptable as a fallback.
- `scripts/fetch-pipeline-docs.mjs` downloads each listed file via `raw.githubusercontent.com`, strips the H1 into Starlight frontmatter (`title` + `editUrl`), rewrites `../` links to absolute GitHub URLs at the pinned ref, and prepends a small "Mirrored from …" note. Output lands in `src/content/docs/pipeline/workflows/`, which is gitignored.
- npm `predev`/`prebuild` hooks invoke the fetcher before `astro dev` / `astro build`. CI runs it transparently via `npm run build`.
- The Starlight sidebar uses `autogenerate: { directory: 'pipeline/workflows' }`, so adding/removing files in `pipeline-docs.json` does not require an `astro.config.mjs` edit.

To update mirrored content on the live site: bump `ref` in `pipeline-docs.json` and commit. To iterate locally against an unpushed branch in the pipeline repo: `PIPELINE_DOCS_LOCAL=/path/to/metagear-pipeline-dev npm run dev`.

To add a new mirror file: append its path to the `files` array in `pipeline-docs.json`. The same mechanism extends to other component repos (e.g. `metagear-tools`) when needed — either add a second source to the pin file (multi-source refactor) or add a second pin file alongside.

## Legacy content

The previous Jekyll site lives under `legacy-docs/` (renamed from `docs/`). It's preserved for reference but not part of the build and not published. Don't add new content there. If a piece of old content should survive on the new site, port it into `src/content/docs/`.

## What lives elsewhere

- **CLI / installer / templates** → `metagear-tools` (extracted 2026-05-07 in commit `cbe3311`).
- **Pipeline workflow definitions, schema, nf-core lint config** → `metagear-pipeline`.
- **Web app, FastAPI service, MongoDB schema, Playwright E2E** → `metagear-explorer`.
- **Preprint LaTeX source** → `paper-metagear-explorer-microbiome`.

If you're asked to change something CLI- or workflow-specific while working in this repo, suggest making the change in the right component repo and updating the link here only if needed.
