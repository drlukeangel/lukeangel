import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Luke Angel — The Journal',
    description: 'Notes from the desk: product, programs, AI, and an attitude of gratitude.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.excerpt,
      link: `/blog/${p.slug}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
