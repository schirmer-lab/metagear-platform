#!/usr/bin/env node
/**
 * Mirror docs/workflows/ from the pipeline repo into the platform site at
 * build time. Source of truth is the pipeline repo; this script lets the
 * platform site render those pages with Starlight chrome without
 * duplicating the markdown into this repo.
 *
 * Behaviour:
 *   - Reads pipeline-docs.json at the repo root for { repo, ref, sourceDir, files }.
 *   - Downloads each file via raw.githubusercontent.com.
 *   - Strips the H1 into Starlight frontmatter (title + editUrl).
 *   - Rewrites `../path` style links (escaping the workflows/ dir) to
 *     absolute github.com/<repo>/blob/<ref> URLs so they resolve.
 *   - Writes results to src/content/docs/pipeline/workflows/ (gitignored).
 *
 * Local override: set PIPELINE_DOCS_LOCAL=/path/to/metagear-pipeline-dev to
 * copy from a local checkout instead of fetching from GitHub. Useful for
 * iterating on docs before the pipeline branch is pushed.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const PIN_FILE = path.join(repoRoot, 'pipeline-docs.json');
const TARGET_DIR = path.join(repoRoot, 'src/content/docs/pipeline/workflows');
const LOCAL_ENV = 'PIPELINE_DOCS_LOCAL';

const pin = JSON.parse(await fs.readFile(PIN_FILE, 'utf8'));
const { repo, ref, sourceDir, files } = pin;

if (!repo || !ref || !sourceDir || !Array.isArray(files)) {
  throw new Error(
    'pipeline-docs.json must define { repo, ref, sourceDir, files: [...] }'
  );
}

const localRoot = process.env[LOCAL_ENV];
const useLocal = Boolean(localRoot);

async function readSource(relPath) {
  if (useLocal) {
    return fs.readFile(path.join(localRoot, sourceDir, relPath), 'utf8');
  }
  const url = `https://raw.githubusercontent.com/${repo}/${ref}/${sourceDir}/${relPath}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GET ${url} → HTTP ${res.status}`);
  }
  return res.text();
}

function rewriteOutboundLinks(md, relPath) {
  // Resolve `../foo` links (paths that leave the mirrored sourceDir) to
  // absolute GitHub URLs at the pinned ref. Intra-workflows links stay
  // relative; Astro/Starlight resolves them at build time.
  return md.replace(/\]\((\.\.\/[^)\s]+)\)/g, (_match, rel) => {
    const fileDirInRepo = path.posix.dirname(`${sourceDir}/${relPath}`);
    const resolvedInRepo = path.posix.normalize(
      path.posix.join(fileDirInRepo, rel)
    );
    return `](https://github.com/${repo}/blob/${ref}/${resolvedInRepo})`;
  });
}

function promoteTitle(md) {
  const h1 = md.match(/^#\s+(.+?)\s*$/m);
  if (!h1) return { title: null, body: md };
  const body = md.replace(/^#\s+.+\n+/m, '');
  return { title: h1[1], body };
}

function makeFrontmatter({ title, relPath, leadingNote }) {
  const sourceUrl = `https://github.com/${repo}/blob/${ref}/${sourceDir}/${relPath}`;
  const lines = [
    '---',
    `title: ${JSON.stringify(title ?? relPath.replace(/\.md$/, ''))}`,
    `editUrl: ${sourceUrl}`,
    '---',
    '',
  ];
  // Trailing blank lines ensure a paragraph break between the frontmatter
  // (and optional note) and the body — the H1-stripping pass removes the
  // body's leading blank line, so we add one back here.
  if (leadingNote) lines.push(leadingNote, '', '');
  else lines.push('');
  return lines.join('\n');
}

async function processFile(relPath) {
  const raw = await readSource(relPath);
  const linked = rewriteOutboundLinks(raw, relPath);
  const { title, body } = promoteTitle(linked);
  const sourceUrl = `https://github.com/${repo}/blob/${ref}/${sourceDir}/${relPath}`;
  const shortRef = ref.length === 40 ? ref.slice(0, 7) : ref;
  const leadingNote = `:::note\nMirrored from the MetaGEAR Pipeline repository: [\`${sourceDir}/${relPath}\`](${sourceUrl}) (${shortRef}). Check there directly for up-to-date information.\n:::`;
  const frontmatter = makeFrontmatter({ title, relPath, leadingNote });
  const dest = path.join(TARGET_DIR, relPath);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, frontmatter + body, 'utf8');
  console.log(`  ${useLocal ? 'copied' : 'fetched'} ${relPath}`);
}

const sourceLabel = useLocal
  ? `local ${localRoot}`
  : `${repo}@${ref.length === 40 ? ref.slice(0, 7) : ref}`;
console.log(
  `Mirroring ${sourceDir}/ from ${sourceLabel} → src/content/docs/pipeline/workflows/`
);

await fs.rm(TARGET_DIR, { recursive: true, force: true });
await fs.mkdir(TARGET_DIR, { recursive: true });

let failed = 0;
for (const file of files) {
  try {
    await processFile(file);
  } catch (err) {
    console.error(`  FAILED ${file}: ${err.message}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`${failed} file(s) failed to mirror.`);
  process.exit(1);
}
console.log('Done.');
