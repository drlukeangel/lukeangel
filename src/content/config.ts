// Content collections — the schema for everything you write.
// Each .md file in src/content/<collection>/ becomes a typed entry.

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['method', 'teams', 'craft', 'tools', 'people', 'projects', 'programs', 'product']),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    pullquote: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    wpCategory: z.string().optional(),
    wpUrl: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const gratitude = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    tag: z.string(),
    long: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.string(),
    role: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    outcome: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
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
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    wpCategory: z.string().optional(),
    wpUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, gratitude, projects, courses };
