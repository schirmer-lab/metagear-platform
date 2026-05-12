---
title: Get started
description: Pick the entry point that matches what you have — sequencing data, or a biological question.
---

Two paths. Pick the one that matches what you have.

## I have a biological question

A protein or nucleotide sequence. A Pfam domain. A specific MSP. You want to know where it shows up across published microbiome cohorts.

**Use [MetaGEAR Explorer](https://metagear-explorer.schirmerlab.de).** No installation, no setup, no data needed of your own. Currently indexing **24 cohorts** spanning IBD, colorectal cancer, and healthy controls.

```text
Sequence ──► BLAST    ──► hits across cohorts, with sample metadata
Domain   ──► Browse   ──► every gene with that Pfam domain
MSP      ──► Explore  ──► all genes in that species pangenome
```

[Open Explorer →](https://metagear-explorer.schirmerlab.de)

## I have my own sequencing data

Paired-end shotgun metagenomic reads. You want quality-controlled, taxonomically profiled, functionally annotated outputs — on your own machine or HPC.

**Use [MetaGEAR Workflows](/workflows/) + [MetaGEAR Tools (CLI)](/tools/).**

1. **Check prerequisites**:
   - Java 17+
   - Nextflow 25+
   - Docker *or* Singularity

2. **Install MetaGEAR Tools (the CLI)**:
   ```bash
   curl -L http://get-metagear.schirmerlab.de | bash
   ```

3. **Download reference databases** (one-time):
   ```bash
   metagear download_databases
   ```

4. **Prepare a samplesheet** (`samples.csv`):
   ```csv
   sample,fastq_1,fastq_2
   SAMPLE-01,/path/to/sample1_R1.fastq.gz,/path/to/sample1_R2.fastq.gz
   ```

5. **Run a workflow**:
   ```bash
   metagear qc_dna --input samples.csv
   metagear microbial_profiles --input samples.csv
   ```

Full reference lives in the [`metagear-tools` repository](https://github.com/schirmer-lab/metagear-tools).

## Not sure which?

The [What is MetaGEAR](/about/) page explains how the components fit together. Or [open an issue](https://github.com/schirmer-lab/issues) and we'll point you in the right direction.
