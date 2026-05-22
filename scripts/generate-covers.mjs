// Genera portadas (og:image) de los posts del blog.
//
// Uso:   node scripts/generate-covers.mjs
// Salida: public/images/<output>.jpg  (1200x630, JPEG quality 88)
//
// Añadir una nueva portada: empuja un objeto al array COVERS de abajo.
// Re-ejecutar el script regenera todas (idempotente).

import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images');
mkdirSync(outDir, { recursive: true });

// ─── PALETA (espejo de BaseLayout) ────────────────────────────────
const NAVY      = '#0F3D5C';
const NAVY_DARK = '#0A2338';
const CYAN      = '#1FB7D8';
const CYAN_BG   = '#E0F2F8';
const WHITE     = '#FFFFFF';
const SLATE_300 = '#CBD5E1';

// ─── TEMPLATE SVG (1200×630) ──────────────────────────────────────
function svgTemplate({ articulo, ley, subtitulo, kicker = 'Esquema visual' }) {
  // Escape XML-sensitive chars
  const esc = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="${NAVY_DARK}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="${CYAN}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- fondo -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- líneas decorativas tipo "código/esquema" en la esquina -->
  <g opacity="0.10" stroke="${CYAN_BG}" stroke-width="2" fill="none">
    <rect x="940" y="430" width="220" height="14" rx="3"/>
    <rect x="940" y="460" width="180" height="14" rx="3"/>
    <rect x="940" y="490" width="200" height="14" rx="3"/>
    <rect x="940" y="520" width="140" height="14" rx="3"/>
  </g>

  <!-- kicker (tag superior) -->
  <g transform="translate(80, 95)">
    <rect x="0" y="0" width="${esc(kicker).length * 11 + 36}" height="34" rx="17" fill="${CYAN}" fill-opacity="0.15" stroke="${CYAN}" stroke-width="1.5"/>
    <circle cx="20" cy="17" r="4" fill="${CYAN}"/>
    <text x="34" y="23" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="13" fill="${CYAN}" letter-spacing="1.2">${esc(kicker.toUpperCase())}</text>
  </g>

  <!-- "Artículo" label -->
  <text x="80" y="200" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="22" fill="${SLATE_300}" letter-spacing="3">ARTÍCULO</text>

  <!-- número grande -->
  <text x="80" y="370" font-family="Nunito, Inter, sans-serif" font-weight="900" font-size="200" fill="${CYAN}" letter-spacing="-4">${esc(articulo)}</text>

  <!-- ley -->
  <text x="80" y="445" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="40" fill="${WHITE}">${esc(ley)}</text>

  <!-- subtítulo -->
  <text x="80" y="495" font-family="Inter, system-ui, sans-serif" font-weight="500" font-size="26" fill="${SLATE_300}">${esc(subtitulo)}</text>

  <!-- footer brand -->
  <g transform="translate(80, 565)">
    <text x="0" y="0" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="26" fill="${WHITE}">esqu<tspan fill="${CYAN}">=</tspan>mator</text>
    <text x="172" y="0" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="14" fill="${SLATE_300}" letter-spacing="2">BLOG</text>
  </g>
</svg>`;
}

// ─── LISTA DE PORTADAS A GENERAR ──────────────────────────────────
const COVERS = [
  {
    output: 'post-art-24-ce.jpg',
    articulo: '24',
    ley: 'Constitución Española',
    subtitulo: 'Tutela judicial efectiva',
  },
  {
    output: 'post-art-103-ce.jpg',
    articulo: '103',
    ley: 'Constitución Española',
    subtitulo: 'Administración Pública',
  },
  {
    output: 'post-art-112-lpac.jpg',
    articulo: '112',
    ley: 'Ley 39/2015 · LPAC',
    subtitulo: 'Objeto y clases de recursos',
  },
  {
    output: 'post-art-53-ce.jpg',
    articulo: '53',
    ley: 'Constitución Española',
    subtitulo: 'Garantías de los derechos',
  },
  {
    output: 'post-art-35-lpac.jpg',
    articulo: '35',
    ley: 'Ley 39/2015 · LPAC',
    subtitulo: 'Motivación de los actos',
  },
  {
    output: 'post-art-21-lpac.jpg',
    articulo: '21',
    ley: 'Ley 39/2015 · LPAC',
    subtitulo: 'Obligación de resolver',
  },
];

// ─── RENDER ───────────────────────────────────────────────────────
for (const cover of COVERS) {
  const svg = svgTemplate(cover);
  const outPath = resolve(outDir, cover.output);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, progressive: true })
    .toFile(outPath);
  console.log(`✓ ${cover.output}  (art. ${cover.articulo} — ${cover.ley})`);
}

console.log(`\nGeneradas ${COVERS.length} portadas en public/images/`);
