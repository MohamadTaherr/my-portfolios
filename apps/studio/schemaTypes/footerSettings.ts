import { defineType } from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  icon: () => '🦶',
  fields: [
    {
      name: 'footerNavigation',
      title: 'Footer Navigation Links',
      type: 'array',
      description: 'Navigation links to display in the footer',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The text to display for this link',
              validation: Rule => Rule.required()
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'The URL this link goes to',
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this link appears',
              validation: Rule => Rule.required().min(0)
            }
          ],
          preview: {
            select: {
              label: 'label',
              href: 'href',
              order: 'order'
            },
            prepare({ label, href, order }) {
              return {
                title: label,
                subtitle: `${href} | Order: ${order}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright message (e.g., "All rights reserved")',
      initialValue: 'All rights reserved'
    },
    {
      name: 'tagline',
      title: 'Footer Tagline',
      type: 'string',
      description: 'A motto or tagline to display in the footer (e.g., "Crafted with cinematic precision")'
    },
    {
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      description: 'Display social media links in the footer (social links are managed in Site Settings)',
      initialValue: true
    },
    {
      name: 'additionalSections',
      title: 'Additional Footer Sections',
      type: 'array',
      description: 'Add extra sections to the footer',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 3,
              description: 'Text content for this section'
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string'
                    },
                    {
                      name: 'href',
                      title: 'URL',
                      type: 'string'
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links'
            },
            prepare({ title, links }) {
              return {
                title,
                subtitle: `${links?.length || 0} links`
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings',
        subtitle: 'Manage footer content and navigation'
      }
    }
  }
})
