import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videoProject',
  title: 'Video Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Select a category. To add/edit categories, go to "Project Categories" in the sidebar.',
      options: {
        list: async (parent, context) => {
          const { getClient } = context;
          const client = getClient({ apiVersion: '2025-10-21' });

          try {
            // Fetch categories from the projectCategory singleton
            const result = await client.fetch(
              `*[_type == "projectCategory"][0].categories[] | order(order asc) {title, value}`
            );

            if (result && result.length > 0) {
              return result;
            }
          } catch (error) {
            console.error('Error fetching categories:', error);
          }

          // Fallback to default categories if fetch fails or no categories exist
          return [
            { title: 'Commercial', value: 'Commercial' },
            { title: 'Short Film', value: 'Short Film' },
            { title: 'Documentary', value: 'Documentary' },
            { title: 'Script', value: 'Script' },
            { title: 'Social Media', value: 'Social Media' },
            { title: 'Event', value: 'Event' },
            { title: 'Music Video', value: 'Music Video' },
          ];
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3:24" or "15:42"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Supports Vimeo, YouTube, or direct video file URLs (MP4, WebM). Examples: vimeo.com/123456789, youtube.com/watch?v=xxxxx, or https://your-cdn.com/video.mp4',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      subtitle: 'client',
      media: 'thumbnail',
    },
  },
});
