---
title: MetaGEAR Pipeline
description: The Nextflow / nf-core pipeline at the core of MetaGEAR — from raw shotgun reads to gene catalogs, MAGs, viruses and pangenomes.
---

**MetaGEAR Pipeline** is the Nextflow / nf-core pipeline at the core of the platform. It takes shotgun
metagenomic data through a set of workflows that run independently or chain together, with outputs in a
consistent schema designed to be easy to post-process.

→ **[schirmer-lab/metagear-pipeline ↗](https://github.com/schirmer-lab/metagear-pipeline)** — source,
releases, and the canonical pipeline reference.

## The workflows

You pick one with `--workflow`. The first four run from reads; the rest read an earlier run's outputs
from the same directory.

| Workflow                                                                        | What it produces                                                              | Builds on        |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------- |
| [`download_databases`](/pipeline/workflows/download_databases)                  | Installs every reference database the others need                             | —                |
| [`qc_dna`](/pipeline/workflows/qc_dna) / [`qc_rna`](/pipeline/workflows/qc_rna) | Trimmed, host-decontaminated reads and a QC report                            | raw reads        |
| [`microbial_profiles`](/pipeline/workflows/microbial_profiles)                  | MetaPhlAn taxonomic and HUMAnN functional profiles                            | clean reads      |
| [`genes`](/pipeline/workflows/genes)                                            | Assembly, gene and protein catalogs, abundance matrices                       | clean reads      |
| [`virus`](/pipeline/workflows/virus)                                            | Viral and plasmid catalogs, annotation, host prediction, lifestyle calls      | clean reads      |
| [`classification`](/pipeline/workflows/classification)                          | Per-contig classification and per-sample bacterial bins                       | clean reads      |
| [`mag`](/pipeline/workflows/mag)                                                | Cohort MAG catalog with GTDB-Tk taxonomy and MAG×sample abundance             | `classification` |
| [`msp`](/pipeline/workflows/msp)                                                | MetaSpecies Pangenomes from co-abundance, with taxonomy                       | `genes`          |
| [`structures`](/pipeline/workflows/structures)                                  | Structural-homology annotation for proteins sequence search leaves unassigned | `genes`/`virus`  |

Each has its own reference page under [Pipeline reference](/pipeline/), mirrored from the pipeline
repository so it always matches the released code.

## Presets

Most cohorts do not need one workflow at a time. **MetaGEAR Tools** ships presets that run several in
order in one workspace, each reusing what the ones before it produced:

| Preset       | Runs                                                 | Use it when                                                          |
| ------------ | ---------------------------------------------------- | -------------------------------------------------------------------- |
| `profiles`   | `microbial_profiles`                                 | You want reference-based profiles only. No assembly, so much faster. |
| `genomes`    | `genes` → `classification` → `mag` → `msp`           | You want the assembled prokaryotic picture.                          |
| `microbiome` | `genes` → `virus` → `classification` → `mag` → `msp` | You want everything, viruses and plasmids included.                  |

```bash
metagear microbiome --input samplesheet.csv --outdir results/
```

A preset is not a separate analysis — it is the same workflows in dependency order, with
`--reuse-outputs` switched on so nothing is recomputed. Running them by hand in the same order gives
the same result.

## How you run it

Directly with Nextflow, if you already use it:

```bash
nextflow run schirmer-lab/metagear-pipeline \
  -profile docker \
  --workflow genes \
  --input samplesheet.csv \
  --outdir results/
```

`--workflow` is required — without it the run validates the samplesheet and exits without analysing
anything.

The recommended path, especially if you are not a regular Nextflow user, is
**[MetaGEAR Tools](/tools/)**: it installs the pipeline, manages the reference databases, applies
sensible resource defaults, and adds the presets above.

## Inputs and outputs

A CSV samplesheet pointing at paired-end FASTQ files:

```csv
sample,fastq_1,fastq_2
SAMPLE-01,/path/to/sample1_R1.fastq.gz,/path/to/sample1_R2.fastq.gz
```

`classification` also reads an optional `biome` column between `sample` and `fastq_1`, used to pick the
SemiBin2 model.

Outputs go to one directory shared by every workflow, organised by artifact rather than by workflow —
`catalogs/`, `abundance/`, `annotations/`, `assemblies/` — which is what lets a later workflow discover
what an earlier one produced.

## Built on nf-core

MetaGEAR Pipeline uses the [nf-core](https://nf-co.re) framework, inheriting community conventions for
reproducibility, containerization and testing. It runs with Docker, Singularity or any nf-core-supported
execution profile, on a laptop or an HPC cluster.

## Where to go next

- [Pipeline reference](/pipeline/) — a page per workflow, mirrored from the pipeline repository
- [MetaGEAR Tools (CLI)](/tools/) — install and drive the pipeline from one command
- [Pipeline repository](https://github.com/schirmer-lab/metagear-pipeline) — source, releases, full parameter reference
- [Open an issue](https://github.com/schirmer-lab/metagear-pipeline/issues) — bug reports and feature requests
