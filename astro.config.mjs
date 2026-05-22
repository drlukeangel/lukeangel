import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import seoGraph from '@jdevalk/astro-seo-graph/integration';

// https://astro.build/config
export default defineConfig({
  site: 'https://lukeangel.co',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
    seoGraph({
      // Build-time SEO checks. All on by default.
      // Internal-links check is noisy on this site (legacy WP slugs) — disable for now.
      validateInternalLinks: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
