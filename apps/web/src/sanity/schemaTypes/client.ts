import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      description: 'e.g., Porsche, Tech Corporation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload client logo (PNG with transparent background recommended)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Project Name',
      type: 'string',
      description: 'Name of the project/service provided',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video Production', value: 'Video Production' },
          { title: 'Scriptwriting', value: 'Scriptwriting' },
          { title: 'Both', value: 'Both' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'text',
      rows: 3,
      description: 'What the client said about working with you',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'clientName',
      title: 'Testimonial Author',
      type: 'string',
      description: 'Name and title of the person giving testimonial (optional)',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Year the project was completed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Client rating out of 5',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured clients section',
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
      title: 'name',
      subtitle: 'project',
      media: 'logo',
    },
  },
});
