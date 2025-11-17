import { defineType, defineField } from 'sanity';

export const scriptType = defineType({
  name: 'scriptType',
  title: 'Script Types',
  type: 'document',
  icon: () => '📝',
  // Make this a singleton - only one document
  __experimental_singleton: true,
  fields: [
    defineField({
      name: 'types',
      title: 'Script Type Options',
      type: 'array',
      description: 'Manage the script types available. These will appear as options when creating scripts.',
      initialValue: [],
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Type Name',
              type: 'string',
              description: 'Display name (e.g., "Commercial Script", "Documentary Script")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Type Value',
              type: 'string',
              description: 'Internal value (usually same as title)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Optional description of this script type',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this type appears (lower numbers first)',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
              order: 'order',
            },
            prepare({ title, description, order }) {
              return {
                title: title || 'Untitled Type',
                subtitle: `Order: ${order ?? 0}${description ? ` | ${description}` : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).warning('At least one script type is recommended'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Script Types',
        subtitle: 'Manage script type options',
      };
    },
  },
});
