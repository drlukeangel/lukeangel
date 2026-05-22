import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'lukeangel.co' },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'Slug', description: 'URL slug (auto-generated from title)' },
        }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Method', value: 'method' },
            { label: 'Teams', value: 'teams' },
            { label: 'Craft', value: 'craft' },
            { label: 'Tools', value: 'tools' },
            { label: 'People', value: 'people' },
            { label: 'Projects', value: 'projects' },
            { label: 'Programs', value: 'programs' },
            { label: 'Product', value: 'product' },
          ],
          defaultValue: 'craft',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        pullquote: fields.text({ label: 'Pullquote', multiline: true }),
        cover: fields.text({
          label: 'Cover image path',
          description: 'e.g. /blog/my-cover.jpg (place file in public/blog/)',
        }),
        coverAlt: fields.text({ label: 'Cover alt text' }),
        wpCategory: fields.text({ label: 'WP category (legacy)' }),
        wpUrl: fields.text({ label: 'Original WP URL (legacy)' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),

    gratitude: collection({
      label: 'Gratitude',
      slugField: 'tag',
      path: 'src/content/gratitude/*',
      format: { contentField: 'content' },
      schema: {
        tag: fields.slug({ name: { label: 'Tag' } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        long: fields.checkbox({ label: 'Long (spans 2 columns)', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        year: fields.text({ label: 'Year' }),
        role: fields.text({ label: 'Role' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        stack: fields.array(fields.text({ label: 'Tech' }), {
          label: 'Stack',
          itemLabel: (props) => props.value,
        }),
        outcome: fields.text({ label: 'Outcome', multiline: true }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),

    courses: collection({
      label: 'Courses',
      slugField: 'title',
      path: 'src/content/courses/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        order: fields.integer({ label: 'Order' }),
        schedule: fields.text({ label: 'Schedule' }),
        duration: fields.text({ label: 'Duration' }),
        price: fields.text({ label: 'Price' }),
        seats: fields.text({ label: 'Seats' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        syllabus: fields.array(
          fields.object({
            week: fields.text({ label: 'Week' }),
            title: fields.text({ label: 'Title' }),
            blurb: fields.text({ label: 'Blurb', multiline: true }),
          }),
          {
            label: 'Syllabus',
            itemLabel: (props) => `${props.fields.week.value} — ${props.fields.title.value}`,
          },
        ),
        cover: fields.text({
          label: 'Cover image path',
          description: 'e.g. /courses/my-cover.svg (place file in public/courses/)',
        }),
        coverAlt: fields.text({ label: 'Cover alt text' }),
        wpUrl: fields.text({ label: 'Original WP URL (legacy)' }),
        wpCategory: fields.text({ label: 'WP category (legacy)' }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
