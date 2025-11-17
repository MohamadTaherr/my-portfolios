import { defineType, defineField } from 'sanity';

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Categories',
  type: 'document',
  icon: () => '🎬',
  // Make this a singleton - only one document
  __experimental_singleton: true,
  fields: [
    defineField({
      name: 'categories',
      title: 'Video Project Categories',
      type: 'array',
      description: 'Manage the categories available for video projects. These will appear as options when creating video projects.',
      initialValue: [],
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Category Name',
              type: 'string',
              description: 'Display name (e.g., "Commercial", "Short Film")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Category Value',
              type: 'string',
              description: 'Internal value (usually same as title). Use lowercase and hyphens for consistency.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Optional description of this category',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this category appears (lower numbers first)',
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
                title: title || 'Untitled Category',
                subtitle: `Order: ${order ?? 0}${description ? ` | ${description}` : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).warning('At least one category is recommended'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Project Categories',
        subtitle: 'Manage video project categories',
      };
    },
  },
});
