---
title: Pipeline reference
description: Per-workflow documentation for the MetaGEAR Nextflow pipeline.
---

This section is a deep reference for the MetaGEAR Nextflow pipeline — what each workflow does biologically, what it consumes, what it produces, and the parameters that change its behaviour.

## Where this content lives

The pages under [Workflows](workflows/) are mirrored at build time from the pipeline repository, [`schirmer-lab/metagear-pipeline-dev`](https://github.com/schirmer-lab/metagear-pipeline-dev), under `docs/workflows/`. The pipeline repo is the source of truth; this site renders the same markdown with consistent navigation and search.

## Editing

To change a workflow page, open a pull request against [`docs/workflows/`](https://github.com/schirmer-lab/metagear-pipeline-dev/tree/main/docs/workflows) in the pipeline repo. Once merged, bump the `ref` in [`pipeline-docs.json`](https://github.com/schirmer-lab/metagear/blob/main/pipeline-docs.json) on this site to publish the new content. The bump is a one-line PR.

## Want to run the pipeline?

The pages here are *reference* — they describe what each workflow does in detail. If you're trying to actually run the pipeline, start with [Get started](/get-started/) and the [MetaGEAR Tools (CLI)](/tools/) page, which cover installation and end-to-end usage.
