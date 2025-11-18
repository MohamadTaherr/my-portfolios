import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portfolioWork',
  title: 'Portfolio Work',
  type: 'document',
  icon: () => '✨',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    // BASIC INFO
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of your work',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'workType',
      title: 'Work Type',
      type: 'string',
      description: 'What kind of creative work is this?',
      options: {
        list: [
          { title: '🎬 Video Production', value: 'video' },
          { title: '📝 Script / Writing', value: 'script' },
          { title: '🎭 Theater Production', value: 'theater' },
          { title: '📺 Advertisement / Commercial', value: 'advertisement' },
          { title: '📰 Article / Blog Post', value: 'article' },
          { title: '📸 Photography / Visual Story', value: 'photography' },
          { title: '🎨 Creative Campaign', value: 'campaign' },
          { title: '📖 Other Written Work', value: 'writing' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used for the web URL',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // CONTENT
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
      description: 'Rich text description of your work',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // TEXT EXCERPT (for scripts, articles, theater)
    defineField({
      name: 'textExcerpt',
      title: 'Text Excerpt',
      type: 'text',
      rows: 10,
      description: 'A sample of the writing (script excerpt, article preview, etc.)',
      hidden: ({ document }) =>
        !['script', 'article', 'theater', 'writing'].includes(document?.workType as string),
      group: 'content',
    }),

    // MEDIA
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image or thumbnail for this work',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video link (MP4, WebM)',
      hidden: ({ document }) =>
        !['video', 'advertisement', 'campaign', 'theater'].includes(document?.workType as string),
      group: 'media',
    }),

    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Additional images showcasing your work',
      group: 'media',
    }),

    // DETAILS
    defineField({
      name: 'client',
      title: 'Client / Production Company',
      type: 'string',
      description: 'Who did you create this for?',
      group: 'details',
    }),

    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., "Writer", "Director", "Creative Director", "Scriptwriter"',
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),

    defineField({
      name: 'duration',
      title: 'Duration / Length',
      type: 'string',
      description: 'e.g., "3:24", "60 seconds", "2,400 words", "90 minutes"',
      group: 'details',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Commercial', value: 'commercial' },
          { title: 'Documentary', value: 'documentary' },
          { title: 'Drama', value: 'drama' },
          { title: 'Comedy', value: 'comedy' },
          { title: 'Educational', value: 'educational' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Corporate', value: 'corporate' },
          { title: 'Music Video', value: 'music-video' },
          { title: 'Event', value: 'event' },
          { title: 'Experimental', value: 'experimental' },
        ],
      },
      group: 'details',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for filtering and search',
      group: 'details',
    }),

    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'award', title: 'Award Name', type: 'string' },
            { name: 'year', title: 'Year', type: 'string' },
          ],
        },
      ],
      group: 'details',
    }),

    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to published work, IMDb, etc.',
      group: 'details',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Work',
      type: 'boolean',
      description: 'Show this work prominently on your portfolio',
      initialValue: false,
      group: 'details',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      group: 'details',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      workType: 'workType',
      client: 'client',
      year: 'year',
      media: 'featuredImage',
    },
    prepare({ title, workType, client, year, media }) {
      const typeLabel = {
        video: '🎬',
        script: '📝',
        theater: '🎭',
        advertisement: '📺',
        article: '📰',
        photography: '📸',
        campaign: '🎨',
        writing: '📖',
      }[workType as string] || '✨';

      return {
        title: `${typeLabel} ${title}`,
        subtitle: [client, year].filter(Boolean).join(' • '),
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});
