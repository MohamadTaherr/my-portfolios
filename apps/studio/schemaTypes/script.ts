import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'script',
  title: 'Script',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Script Type',
      type: 'string',
      description: 'Select a type. To add/edit script types, go to "Script Types" in the sidebar.',
      options: {
        list: [
          { title: 'Commercial Script', value: 'commercial' },
          { title: 'Documentary Script', value: 'documentary' },
          { title: 'Social Media Scripts', value: 'social-media' },
          { title: 'Short Film Script', value: 'short-film' },
          { title: 'Corporate Script', value: 'corporate' },
          { title: 'E-Learning Script', value: 'e-learning' },
          { title: 'Theater Script', value: 'theater' },
          { title: 'Podcast Script', value: 'podcast' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "60 seconds", "12 minutes", "5 minutes per episode"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Script Excerpt',
      type: 'text',
      rows: 10,
      description: 'A sample excerpt from the script',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'wordCount',
      title: 'Word Count',
      type: 'string',
      description: 'e.g., "145", "2,400", "750 per episode"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
});
