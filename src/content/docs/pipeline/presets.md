---
title: Presets
description: Three ready-made chains of MetaGEAR workflows — profiles, genomes and microbiome — that run in dependency order and reuse what the earlier steps produced.
---

Most cohorts do not need one workflow at a time. **MetaGEAR Tools** ships three presets that run
several workflows in dependency order in a single workspace, with `--reuse-outputs` switched on so
each step picks up what the ones before it produced instead of recomputing it.

<div class="mg-preset-cards not-content">

  <div class="mg-preset-card">
    <div class="mg-preset-card__head">
      <span class="mg-preset-card__name">profiles</span>
      <span class="mg-preset-card__for">Reference-based only — no assembly</span>
    </div>
    <div class="mg-presets__chain">
      <span class="mg-presets__step">microbial_profiles</span>
    </div>
    <ul class="mg-preset-card__gives">
      <li>MetaPhlAn taxonomic profiles</li>
      <li>HUMAnN pathway and gene-family abundances</li>
    </ul>
    <div class="mg-preset-card__cmd"><span class="p">$</span> metagear profiles --input samples.csv --outdir results/</div>
  </div>

  <div class="mg-preset-card">
    <div class="mg-preset-card__head">
      <span class="mg-preset-card__name">genomes</span>
      <span class="mg-preset-card__for">The assembled bacterial picture</span>
    </div>
    <div class="mg-presets__chain">
      <span class="mg-presets__step">genes</span>
      <i class="mg-presets__sep">→</i>
      <span class="mg-presets__step">classification</span>
      <i class="mg-presets__sep">→</i>
      <span class="mg-presets__step">mag</span>
      <i class="mg-presets__sep">→</i>
      <span class="mg-presets__step">msp</span>
    </div>
    <ul class="mg-preset-card__gives">
      <li>Contigs, gene and protein catalogs, with AMRFinderPlus and Pfam annotation</li>
      <li>Per-contig classification and per-sample bacterial bins</li>
      <li>A dereplicated MAG catalog with GTDB-Tk taxonomy and MAG&times;sample abundance</li>
      <li>Species pangenomes with MSP&times;sample abundance and a MetaPhlAn cross-walk</li>
    </ul>
    <div class="mg-preset-card__cmd"><span class="p">$</span> metagear genomes --input samples.csv --outdir results/</div>
  </div>

  <div class="mg-preset-card">
    <div class="mg-preset-card__head">
      <span class="mg-preset-card__name">microbiome</span>
      <span class="mg-preset-card__for">Everything in <code>genomes</code>, with viruses and plasmids alongside</span>
    </div>
    <div class="mg-presets__chain">
      <span class="mg-presets__step mg-presets__step--ref">genomes</span>
      <i class="mg-presets__sep">+</i>
      <span class="mg-presets__step">virus</span>
    </div>
    <ul class="mg-preset-card__gives">
      <li>Everything <code>genomes</code> produces</li>
      <li>Viral and plasmid contigs, and their gene and protein catalogs</li>
      <li>Viral-specific annotation — AMGs, PHROG, host prediction and lifestyle calls</li>
    </ul>
    <div class="mg-preset-card__cmd"><span class="p">$</span> metagear microbiome --input samples.csv --outdir results/</div>
  </div>

</div>

## What a preset is, and is not

A preset is not a separate analysis. It is the same workflows in dependency order, with
`--reuse-outputs` on. Running them by hand in that order, in the same output directory, gives the same
result — the preset just saves you from typing four commands and from getting the order wrong.

`microbiome` is `genomes` plus `virus`. The reason `virus` runs second rather than last is that it
performs its own assembly and gene calling; putting it after `genes` lets it read the existing contigs
and gene catalog instead of rebuilding them. Rebuilding would matter: MMseqs2 picks different cluster
representatives on a re-run, which silently invalidates the classification and MSP tables.

## Before you run one

Reference databases are installed once per machine, not per run:

```bash
metagear download_databases
```

You can see exactly what a preset will do without running any of it:

```bash
metagear microbiome --input samples.csv --outdir results/ --preview
```

## When a step fails

The steps after it do not start. Fix what the failing step reported and run the same command again —
the steps that already finished resume from their own caches rather than starting over.

## Cost

`profiles` skips assembly, which is the single most expensive stage, so it is the cheapest of the three
in CPU-hours. It is not necessarily the *quickest* to finish: HUMAnN's translated search against
UniRef90 is slow, and on a small cohort it can dominate the wall clock.

`genomes` and `microbiome` both assemble. Plan for them at the cohort scale, on a cluster — see
[running across machines](/tools/#running-across-machines).

## Where to go next

- **[MetaGEAR Pipeline](/workflows/)** — what the individual workflows do.
- **[Pipeline reference](/pipeline/)** — per-workflow parameters and outputs.
- **[MetaGEAR Tools](/tools/)** — installing the CLI that provides these presets.
