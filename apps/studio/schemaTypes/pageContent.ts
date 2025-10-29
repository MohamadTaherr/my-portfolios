import { defineType } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content & Copy',
  type: 'document',
  icon: () => '📄',
  fields: [
    // SEO & Meta
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'The title that appears in search engines and browser tabs',
      validation: Rule => Rule.max(60).warning('Titles over 60 characters may be truncated in search results')
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'The description that appears in search engine results',
      validation: Rule => Rule.max(160).warning('Descriptions over 160 characters may be truncated')
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search engine optimization',
      options: {
        layout: 'tags'
      }
    },

    // Hero Section
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline on the homepage hero section',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      description: 'Subheadline or supporting text for the hero'
    },

    // About Section
    {
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      description: 'Main title for the About section',
      validation: Rule => Rule.required()
    },
    {
      name: 'aboutSubtitle',
      title: 'About Section Subtitle',
      type: 'string',
      description: 'Subtitle for the About section (e.g., "The Story", "Behind the Camera")'
    },

    // Skills Section
    {
      name: 'skillsTitle',
      title: 'Skills Section Title',
      type: 'string',
      description: 'Main title for the Skills/Expertise section',
      validation: Rule => Rule.required()
    },
    {
      name: 'skillsSubtitle',
      title: 'Skills Section Subtitle',
      type: 'string',
      description: 'Subtitle for the Skills section (e.g., "By the Numbers", "Expertise")'
    },

    // Projects Section
    {
      name: 'projectsTitle',
      title: 'Projects Section Title',
      type: 'string',
      description: 'Main title for the Projects/Portfolio section',
      validation: Rule => Rule.required()
    },
    {
      name: 'projectsSubtitle',
      title: 'Projects Section Subtitle',
      type: 'string',
      description: 'Subtitle for the Projects section'
    },
    {
      name: 'projectsDescription',
      title: 'Projects Description',
      type: 'text',
      rows: 3,
      description: 'Introductory text for the Projects section'
    },

    // Contact Section
    {
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      description: 'Main title for the Contact section',
      validation: Rule => Rule.required()
    },
    {
      name: 'contactSubtitle',
      title: 'Contact Section Subtitle',
      type: 'string',
      description: 'Subtitle for the Contact section (e.g., "Let\'s Connect", "Start a Conversation")'
    },
    {
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
      rows: 3,
      description: 'Introductory text for the Contact section'
    },

    // Footer
    {
      name: 'footerCopyright',
      title: 'Footer Copyright Text',
      type: 'string',
      description: 'Copyright message in the footer',
      initialValue: 'All rights reserved'
    },
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      description: 'Tagline or motto in the footer (e.g., "Crafted with cinematic precision")'
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Page Content & Copy',
        subtitle: 'Edit all page titles, headlines, and descriptions'
      }
    }
  }
})
