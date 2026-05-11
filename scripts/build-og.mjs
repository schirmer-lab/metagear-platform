// Renders a fresh OG image to public/og-image.png from an inline SVG.
// Run via `node scripts/build-og.mjs` after editing copy.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="623" width="1200" height="7" fill="#0d9488"/>

  <!-- hex-cube glyph, top-left -->
  <g transform="translate(96, 96)" fill="none" stroke="#0a0a0e" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M64 0 L120 28 L120 100 L64 128 L8 100 L8 28 Z"/>
    <path d="M64 36 L100 54 L100 82 L64 100 L28 82 L28 54 Z"/>
    <path d="M64 36 L64 72 L28 54"/>
    <path d="M64 72 L100 54"/>
    <path d="M64 72 L64 100"/>
  </g>

  <!-- wordmark, top-right of the glyph -->
  <text x="232" y="178" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#0a0a0e" letter-spacing="-2">MetaGEAR</text>

  <!-- eyebrow above tagline -->
  <g transform="translate(96, 360)">
    <line x1="0" y1="0" x2="44" y2="0" stroke="#0d9488" stroke-width="3"/>
    <text x="56" y="6" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#0d9488" letter-spacing="3">PLATFORM</text>
  </g>

  <!-- tagline -->
  <text x="96" y="450" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#0a0a0e" letter-spacing="-2">Microbiome research,</text>
  <text x="96" y="528" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" font-style="italic" fill="#0d9488" letter-spacing="-2">end-to-end.</text>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(1200, 630, { fit: 'cover' })
  .png({ quality: 90 })
  .toFile('public/og-image.png');

console.log('Wrote public/og-image.png (1200x630)');
