import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Your full name (e.g., Edmond Haddad)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Professional title (e.g., Award-Winning Scriptwriter & Creative Producer)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short bio for the hero section',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Professional profile photo',
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'string',
      description: 'Welcome badge text (e.g., "Welcome to my portfolio")',
      initialValue: 'Welcome to my portfolio',
    }),
    // Stats
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Number of years in the industry',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed',
      type: 'number',
      description: 'Total number of projects completed',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'clientsServed',
      title: 'Clients Served',
      type: 'number',
      description: 'Number of premium brands/clients',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'industryAwards',
      title: 'Industry Awards',
      type: 'number',
      description: 'Number of awards received',
      validation: (Rule) => Rule.required().min(0),
    }),
    // Contact Information
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
    }),
    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'vimeo', title: 'Vimeo', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'profileImage',
    },
  },
});
