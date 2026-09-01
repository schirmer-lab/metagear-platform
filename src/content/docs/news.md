---
title: News & releases
description: Announcements, releases, and updates from the MetaGEAR Platform.
---

A running log of platform-level updates. Component-specific release notes live alongside each repository's `CHANGELOG.md`.

## 2026-09-01 — MetaGEAR Pipeline 26.09

A major release, and the first under date-based versioning: the pipeline and MetaGEAR Tools now share
one `YY.MM` number and are released together.

**Five new workflows.** `virus` (viral and plasmid detection, clustering, annotation, host prediction),
`classification` (per-contig classification and bacterial binning), `mag` (cohort MAG catalog with
GTDB-Tk taxonomy), `msp` (MetaSpecies Pangenomes from co-abundance) and `structures` (structural-homology
annotation via PHOLD). See [the pipeline page](/workflows/) and the
[reference pages](/pipeline/).

**Presets.** `profiles`, `genomes` and `microbiome` run several workflows in order in one workspace,
each reusing what the ones before it produced.

**Breaking changes.** `gene_analysis` is now `genes` and builds its catalog with MMseqs2 rather than
CD-HIT, so gene and protein representatives differ from 1.x. The results tree is reorganised by artifact.
Nextflow ≥ 25.10.4 is required.

**The 1.x line stays available.** It is archived, read-only, at
[`schirmer-lab/metagear-pipeline-legacy`](https://github.com/schirmer-lab/metagear-pipeline-legacy),
with its releases intact — install a pinned 1.x from there if you need to reproduce earlier work. New
installs get 26.09 or later.

Releases are archived on Zenodo with a DOI: [10.5281/zenodo.22233494](https://doi.org/10.5281/zenodo.22233494).

## 2026-05-11 — Platform site relaunch

The platform site has been rebuilt from the ground up as the umbrella for MetaGEAR's three components — **MetaGEAR Pipeline**, **MetaGEAR Tools (CLI)**, and **MetaGEAR Explorer** — replacing the previous CLI-focused documentation site. Component-level technical references now live next to their code in each component repository.

- The CLI wrapper that used to live in this repository has moved to [`schirmer-lab/metagear-tools`](https://github.com/schirmer-lab/metagear-tools).
- Detailed pipeline documentation lives in [`schirmer-lab/metagear-pipeline`](https://github.com/schirmer-lab/metagear-pipeline).
- The Explorer portal continues to be available at [metagear-explorer.schirmerlab.de](https://metagear-explorer.schirmerlab.de) as a hosted service.

## Earlier

Open-source component release notes:

- **Pipeline** — [metagear-pipeline releases](https://github.com/schirmer-lab/metagear-pipeline/releases)
- **Tools** — [metagear-tools releases](https://github.com/schirmer-lab/metagear-tools/releases)

Explorer is a hosted service; updates are announced here as platform news.
