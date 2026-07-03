// Sitemap dinámico de infografías publicadas (SSR): se genera al vuelo desde
// Supabase, así aparecen sin rebuild. Envíalo en Search Console:
//   https://blog.esquemator.com/sitemap-infografias.xml
export const prerender = false;

import { getPublicaciones } from '../lib/supabase.js';

const BASE = 'https://blog.esquemator.com';
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET() {
  const pubs = await getPublicaciones();
  const urls = pubs.map((p) => {
    const lastmod = p.created_at ? new Date(p.created_at).toISOString() : new Date().toISOString();
    return `  <url><loc>${BASE}/infografia/${esc(p.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq></url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
