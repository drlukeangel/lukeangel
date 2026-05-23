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
      previewUrl: '/blog/{slug}/',
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
            { label: 'Give', value: 'give' },
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
          description: 'Drop image into src/assets/blog/, then reference it with the relative path ../../assets/blog/my-cover.svg. Optimal dimensions: 1200×630 (16:9 / OG-card ratio). SVG preferred; JPG/PNG/WebP fine.',
        }),
        coverAlt: fields.text({
          label: 'Cover alt text',
          description: 'Plain-language description of the image for screen readers and SEO. One short sentence.',
        }),
        notebook: fields.text({
          label: 'Notebook',
          description: 'Optional. Slug of the notebook this post belongs to (e.g. iot-predictions).',
        }),
        notebookOrder: fields.integer({
          label: 'Notebook order',
          description: 'Optional. Position of this post within the notebook.',
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.q.value || 'New question',
          },
        ),
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
      previewUrl: '/projects/{slug}/',
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

    notebooks: collection({
      label: 'Notebooks',
      slugField: 'title',
      path: 'src/content/notebooks/*',
      format: { contentField: 'content' },
      previewUrl: '/notebooks/{slug}/',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        cover: fields.text({
          label: 'Cover image path',
          description: 'Drop image into src/assets/blog/ (notebooks share the blog assets directory), then reference it with the relative path ../../assets/blog/my-cover.svg. Optimal dimensions: 1200×630 (16:9 / OG-card ratio). SVG preferred; JPG/PNG/WebP fine.',
        }),
        coverAlt: fields.text({
          label: 'Cover alt text',
          description: 'Plain-language description of the image for screen readers and SEO. One short sentence.',
        }),
        accent: fields.text({
          label: 'Accent color',
          description: 'Optional hex color (e.g. #0066cc) for notebook-specific accents.',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),

    courses: collection({
      label: 'Courses',
      slugField: 'title',
      path: 'src/content/courses/*',
      format: { contentField: 'content' },
      previewUrl: '/courses/{slug}/',
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
        enrollUrl: fields.text({
          label: 'Enroll button URL',
          description: 'Where the "Sign Up!" button goes (e.g. https://btreepress.teachable.com/p/...).',
        }),
        enrollLabel: fields.text({
          label: 'Enroll button label',
          defaultValue: 'Sign Up!',
        }),
        recordings: fields.text({ label: 'Recordings', defaultValue: 'Yes' }),
        cover: fields.text({
          label: 'Cover image path',
          description: 'Drop image into src/assets/courses/, then reference it with the relative path ../../assets/courses/my-cover.svg. Optimal dimensions: 1200×630 (16:9 / OG-card ratio). SVG preferred; JPG/PNG/WebP fine.',
        }),
        coverAlt: fields.text({
          label: 'Cover alt text',
          description: 'Plain-language description of the image for screen readers and SEO. One short sentence.',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
