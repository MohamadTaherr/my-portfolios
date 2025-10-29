import { defineType } from 'sanity'

export const navigationSettings = defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: () => '🧭',
  fields: [
    {
      name: 'mainNavigation',
      title: 'Main Navigation Items',
      type: 'array',
      description: 'Navigation links for the header menu',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The text to display for this menu item',
              validation: Rule => Rule.required()
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'The URL this menu item links to (e.g., "/", "/about", "#contact")',
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this item appears (lower numbers appear first)',
              validation: Rule => Rule.required().min(0)
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              description: 'Should this link open in a new browser tab?',
              initialValue: false
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
      ],
      validation: Rule => Rule.required().min(1).max(10).warning('5-7 navigation items is recommended for best UX')
    },
    {
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Text to display as the logo (leave empty to use name from Site Settings)',
    },
    {
      name: 'ctaButton',
      title: 'Call-to-Action Button (Optional)',
      type: 'object',
      description: 'Optional highlighted button in the navigation',
      fields: [
        {
          name: 'enabled',
          title: 'Enable CTA Button',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
          description: 'Text on the button (e.g., "Get in Touch", "View Portfolio")'
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
          description: 'Where the button should link to'
        }
      ]
    }
  ],
  preview: {
    select: {
      items: 'mainNavigation'
    },
    prepare({ items }) {
      return {
        title: 'Navigation Settings',
        subtitle: `${items?.length || 0} menu items`
      }
    }
  }
})
