import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.esquemator.com',
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
});
