import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post / Article',
  type: 'document',
  icon: () => '✍️',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short preview of the post',
      validation: (Rule) => Rule.required().max(200),
      group: 'content',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Industry Insights', value: 'insights' },
          { title: 'Behind the Scenes', value: 'bts' },
          { title: 'Creative Process', value: 'process' },
          { title: 'Writing Tips', value: 'writing-tips' },
          { title: 'Production Stories', value: 'production' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Opinion', value: 'opinion' },
        ],
      },
      group: 'settings',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'settings',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post prominently',
      initialValue: false,
      group: 'settings',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g., "5 min read"',
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, category, media, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : '';
      const categoryLabel = category ? category.replace('-', ' ') : '';

      return {
        title: `✍️ ${title}`,
        subtitle: [categoryLabel, date].filter(Boolean).join(' • '),
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});
