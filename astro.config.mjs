import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import robotsTxt from 'astro-robots-txt';

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
    robotsTxt({
      sitemap: true,
      policy: [{ userAgent: '*', allow: '/', disallow: ['/keystatic/'] }],
    }),
    seoGraph({
      // Build-time SEO checks. All on by default.
      // Internal-links check is noisy on this site (legacy WP slugs) — disable for now.
      validateInternalLinks: false,
      // Lower mins: defaults (title 30, desc 70) are too aggressive for short, punchy posts.
      validateMetadataLength: { title: { min: 15 }, description: { min: 50 } },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
