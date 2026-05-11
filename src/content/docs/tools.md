---
title: MetaGEAR Tools (CLI)
description: The command-line wrapper that drives the MetaGEAR pipeline with sensible defaults.
---

**MetaGEAR Tools** is a small command-line wrapper (`metagear`) that installs the pipeline, configures defaults for your machine, manages reference databases, and launches workflows — so you can run a full metagenomic analysis without writing Nextflow.

→ **[schirmer-lab/metagear-tools ↗](https://github.com/schirmer-lab/metagear-tools)** — installer, CLI source, configuration templates, and full reference.

## Why a wrapper

Nextflow and nf-core are powerful but have a learning curve. MetaGEAR Tools removes it by:

- **Detecting your hardware** (CPUs, RAM) and setting resource limits to roughly 80% of available capacity, capped at 48 CPUs and 80 GB.
- **Installing the matching pipeline version** alongside itself, so you don't have to coordinate Nextflow + pipeline versions yourself.
- **Centralizing configuration** under `~/.metagear/` with editable defaults.
- **Wrapping every workflow** behind a one-word subcommand.

## Prerequisites

- [Java 17+](https://ubuntu.com/tutorials/install-jre#2-installing-openjdk-jre)
- [Nextflow 25+](https://www.nextflow.io/docs/latest/install.html)
- [Docker](https://docs.docker.com/engine/install/) **or** [Singularity](https://docs.sylabs.io/guides/3.0/user-guide/installation.html)

## Install

**1. Run the installer.**

```bash
curl -L http://get-metagear.schirmerlab.de | bash
```

Latest stable release, installed to `~/.metagear/`.

**2. (Optional) Pin a specific pipeline version.**

```bash
curl -L http://get-metagear.schirmerlab.de | bash -s -- --pipeline 1.0
```

**3. Review generated configuration** in `~/.metagear/metagear.config` and `~/.metagear/metagear.env`. Adjust paths or resource limits if needed.

## Basic usage

```bash
# Install reference databases (one-time, per machine)
metagear download_databases

# Run workflows
metagear qc_dna --input samples.csv
metagear microbial_profiles --input samples.csv

# Generate the launch script without executing it (useful for HPC)
metagear qc_dna --input samples.csv -preview
```

Input samplesheet:

```csv
sample,fastq_1,fastq_2
SAMPLE-01,/path/to/sample1_R1.fastq.gz,/path/to/sample1_R2.fastq.gz
SAMPLE-02,/path/to/sample2_R1.fastq.gz,/path/to/sample2_R2.fastq.gz
```

## Where to go next

- [metagear-tools repository](https://github.com/schirmer-lab/metagear-tools) — full reference, configuration options, troubleshooting
- [MetaGEAR Workflows](/metagear/workflows/) — what each workflow actually does
- [Open an issue](https://github.com/schirmer-lab/metagear-tools/issues) — bug reports for the installer or CLI
