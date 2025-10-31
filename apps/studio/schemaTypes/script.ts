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
        list: async (parent, context) => {
          const { getClient } = context;
          const client = getClient({ apiVersion: '2025-10-21' });

          try {
            // Fetch script types from the scriptType singleton
            const result = await client.fetch(
              `*[_type == "scriptType"][0].types[] | order(order asc) {title, value}`
            );

            if (result && result.length > 0) {
              return result;
            }
          } catch (error) {
            console.error('Error fetching script types:', error);
          }

          // Fallback to default types if fetch fails or no types exist
          return [
            { title: 'Commercial Script', value: 'Commercial Script' },
            { title: 'Documentary Script', value: 'Documentary Script' },
            { title: 'Social Media Scripts', value: 'Social Media Scripts' },
            { title: 'Short Film Script', value: 'Short Film Script' },
            { title: 'Corporate Script', value: 'Corporate Script' },
            { title: 'E-Learning Script', value: 'E-Learning Script' },
          ];
        },
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
