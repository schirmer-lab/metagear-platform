# MetaGEAR Platform

This repository hosts the umbrella website for the **MetaGEAR Platform** — an integrated bioinformatics platform for microbiome research developed at the [Schirmer Lab](https://www.mls.ls.tum.de/en/mdi/home/).

The site is published at <https://schirmer-lab.github.io/metagear/>.

The platform consists of three components, each with its own repository:

| Component | Where it lives | What it does |
|-----------|----------------|--------------|
| **MetaGEAR Workflows** | [schirmer-lab/metagear-pipeline](https://github.com/schirmer-lab/metagear-pipeline) | Nextflow / nf-core pipeline for end-to-end metagenomic analysis. |
| **MetaGEAR Tools (CLI)** | [schirmer-lab/metagear-tools](https://github.com/schirmer-lab/metagear-tools) | Command-line wrapper and installer for the pipeline. |
| **MetaGEAR Explorer** | [metagear-explorer.schirmerlab.de](https://metagear-explorer.schirmerlab.de) | Hosted web portal and REST API for querying curated microbial gene catalogs. Source is not publicly available. |

This repository contains only the **platform-level website** (overview, getting started, component summaries, citation). Component-specific technical documentation lives in each component's repository.

## Site

The site is built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) docs theme.

### Local development

```bash
npm install
npm run dev          # http://localhost:4321/metagear
```

### Build

```bash
npm run build        # outputs to dist/
npm run preview      # serve the built site locally
```

### Deployment

Pushes to `main` are built and deployed to GitHub Pages via the workflow in `.github/workflows/pages.yml`. The site is published under the `/metagear` path (configured via `base` in `astro.config.mjs`).

## Project layout

```
.
├── astro.config.mjs        # Astro + Starlight config (base path, sidebar, SEO)
├── package.json
├── public/                 # Static assets (favicon, og-image)
├── src/
│   ├── assets/             # Logo SVGs imported by config / pages
│   ├── content/docs/       # Markdown/MDX pages — one per route
│   ├── content.config.ts   # Starlight content collection
│   └── styles/custom.css   # Theme overrides (palette, hero polish)
├── .github/workflows/pages.yml
└── legacy-docs/            # Previous Jekyll site, kept for reference
```

## Content

The site is intentionally small. Adding a page = creating a Markdown file under `src/content/docs/` and adding it to the `sidebar` in `astro.config.mjs`. The landing page at `src/content/docs/index.mdx` uses Starlight's `splash` template; other pages use the default docs layout.

For deep component documentation (pipeline parameters, CLI flag reference, API endpoints), update the corresponding component repository — this site links out rather than duplicates.

## License

[MIT](LICENSE).
