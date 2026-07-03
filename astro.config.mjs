import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';

// https://astro.build/config
// output 'hybrid': el blog sigue siendo ESTÁTICO por defecto; solo las rutas
// marcadas con `export const prerender = false` (las infografías publicadas y
// su sitemap) se renderizan en el servidor leyendo de Supabase. Así publicar
// una infografía = escribir una fila en Supabase, SIN rebuild del blog.
export default defineConfig({
  site: 'https://blog.esquemator.com',
  output: 'hybrid',
  adapter: netlify(),
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
});
