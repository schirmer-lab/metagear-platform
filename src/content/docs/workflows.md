---
title: MetaGEAR Workflows
description: The Nextflow / nf-core pipeline at the core of MetaGEAR — from raw shotgun reads to harmonized outputs.
---

**MetaGEAR Workflows** is the Nextflow / nf-core pipeline at the core of the platform. It takes shotgun metagenomic data through four cohesive workflows that can be run independently or in sequence, with outputs in a consistent schema designed to be easy to post-process.

→ **[schirmer-lab/metagear-pipeline ↗](https://github.com/schirmer-lab/metagear-pipeline)** — source, releases, and the canonical pipeline reference.

## What it does

**Database setup.** Installs the reference databases the other workflows need: Kneaddata host + contaminant genomes, MetaPhlAn marker database, HUMAnN nucleotide and protein databases.

**Quality control.** Read-level quality assessment, adapter trimming (TrimGalore), and host / contaminant removal (Kneaddata) for DNA and RNA inputs.

**Microbial profiles.** Taxonomic profiling with MetaPhlAn and functional profiling with HUMAnN, producing per-sample abundance tables for taxa, gene families, and pathways.

**Gene analysis.** Gene-centric analysis with optional contig catalog assembly — for downstream lab-specific work or as the foundation for searchable indexes.

## How you run it

You can invoke the pipeline directly with Nextflow if you're already a Nextflow user:

```bash
nextflow run schirmer-lab/metagear-pipeline \
  -profile docker \
  --input samplesheet.csv \
  --outdir results/
```

But the recommended path — especially if you aren't a regular Nextflow user — is via **MetaGEAR Tools**, the CLI that installs the pipeline, manages reference databases, and applies sensible defaults. See the [MetaGEAR Tools (CLI)](/metagear/tools/) page.

## Inputs and outputs

The pipeline takes a CSV samplesheet pointing at paired-end FASTQ files:

```csv
sample,fastq_1,fastq_2
SAMPLE-01,/path/to/sample1_R1.fastq.gz,/path/to/sample1_R2.fastq.gz
```

Outputs are written to a results directory with one subdirectory per workflow and consistent file naming — easy to feed into your own downstream scripts or notebooks.

## Built on nf-core

MetaGEAR Workflows uses the [nf-core](https://nf-co.re) framework, inheriting community conventions for reproducibility, containerization, and testing. It runs with Docker, Singularity, or any nf-core-supported execution profile, on a laptop or an HPC cluster.

## Where to go next

- [MetaGEAR Tools (CLI)](/metagear/tools/) — install and drive the pipeline from one command
- [Pipeline repository](https://github.com/schirmer-lab/metagear-pipeline) — source, releases, full parameter reference
- [Open an issue](https://github.com/schirmer-lab/metagear-pipeline/issues) — bug reports and feature requests
