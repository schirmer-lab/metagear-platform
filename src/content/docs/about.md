---
title: What is MetaGEAR
description: MetaGEAR is an integrated bioinformatics platform for microbiome research, developed at the Schirmer Lab.
---

MetaGEAR is built at the [Schirmer Lab](https://www.mls.ls.tum.de/en/mdi/home/) as an integrated bioinformatics platform for microbiome research. It connects three things that usually live apart — a pipeline, a CLI to drive it, and a web portal for querying bacterial genes across published cohorts — under one consistent design.

## Three components

### MetaGEAR Workflows — the pipeline

A Nextflow / nf-core pipeline that performs:

- **Quality control & decontamination** with Kneaddata and TrimGalore
- **Taxonomic profiling** with MetaPhlAn
- **Functional profiling** with HUMAnN
- **Gene-centric analysis**, with optional contig catalog assembly

Outputs follow a consistent, documented schema designed to be easy to post-process.

### MetaGEAR Tools (CLI) — the wrapper

A small command-line tool (`metagear`) that handles installation, database setup, configuration, and workflow execution. It detects your hardware, installs the matching pipeline release, and runs workflows behind one-word subcommands. The Nextflow learning curve, gone.

### MetaGEAR Explorer — the web portal

A web app and REST API for querying curated catalogs of microbial genes by sequence (BLAST), Pfam domain, or by exploring Metagenomic Species Pangenomes (MSPs), across **24 metagenomic cohorts** covering IBD, colorectal cancer, and healthy controls. Free, hosted, no installation, available at [metagear-explorer.schirmerlab.de](https://metagear-explorer.schirmerlab.de).

## What's inside Explorer today

- **33M+** gene families across all cohorts
- **9,053** stool samples uniformly processed
- **13,795** species pangenomes with gene catalogs

## Where it's going

The platform is actively developed. New cohorts are added as they're curated; new components will be folded in as they mature. If you want to be notified, the [news page](/metagear/news/) is the running log.

## Citing MetaGEAR

The platform is described across multiple publications — see the [Cite & contact](/metagear/cite/) page for the right citation depending on what you used.
