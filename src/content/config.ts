// Content collections — the schema for everything you write.
// Each .md file in src/content/<collection>/ becomes a typed entry.

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['method', 'teams', 'craft', 'tools', 'people', 'projects', 'programs', 'product', 'give']),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    pullquote: z.string().optional(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    notebook: z.string().optional(),
    notebookOrder: z.number().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const notebooks = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    accent: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const gratitude = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    topic: z.enum(['team', 'home', 'readers', 'world', 'tech', 'everyday', 'craft', 'trailblazers']),
    level: z.enum(['small', 'medium', 'large']).default('small'),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    year: z.string(),
    role: z.string().optional(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    outcome: z.string().optional(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const courses = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number(),
    schedule: z.string(),
    duration: z.string(),
    price: z.string(),
    seats: z.string(),
    summary: z.string(),
    syllabus: z.array(z.object({
      week: z.string(),
      title: z.string(),
      blurb: z.string(),
    })).default([]),
    enrollUrl: z.string().optional(),
    enrollLabel: z.string().default('Sign Up!'),
    recordings: z.string().default('Yes'),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, gratitude, projects, courses, notebooks };
