import { defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  icon: () => '👤',
  fields: [
    {
      name: 'bodyParagraphs',
      title: 'About Body Text',
      type: 'array',
      description: 'Detailed paragraphs about your story, journey, and expertise',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'featuredBrands',
      title: 'Featured Brands/Clients',
      type: 'array',
      description: 'List of notable brands or clients you\'ve worked with',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Brand/Client Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: 'Brand logo (optional)',
              options: {
                hotspot: true
              }
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Brief description of the work (optional)'
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required().min(0)
            }
          ],
          preview: {
            select: {
              name: 'name',
              description: 'description',
              logo: 'logo',
              order: 'order'
            },
            prepare({ name, description, logo, order }) {
              return {
                title: name,
                subtitle: description || `Order: ${order}`,
                media: logo
              }
            }
          }
        }
      ]
    },
    {
      name: 'signingName',
      title: 'Signature Name',
      type: 'string',
      description: 'Name to display as signature (leave empty to use name from Site Settings)'
    },
    {
      name: 'philosophy',
      title: 'Philosophy/Approach',
      type: 'object',
      description: 'Your creative philosophy or approach',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'E.g., "My Philosophy", "Creative Approach"'
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 4,
          description: 'Your philosophy or approach statement'
        }
      ]
    },
    {
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      description: 'Notable achievements or milestones',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'achievement',
              title: 'Achievement',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'Year of achievement (optional)'
            },
            {
              name: 'icon',
              title: 'Icon (Emoji)',
              type: 'string',
              description: 'Optional emoji icon',
              validation: Rule => Rule.max(2)
            }
          ],
          preview: {
            select: {
              achievement: 'achievement',
              year: 'year',
              icon: 'icon'
            },
            prepare({ achievement, year, icon }) {
              return {
                title: achievement,
                subtitle: `${icon || '🏆'} ${year || ''}`
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      paragraphs: 'bodyParagraphs',
      brands: 'featuredBrands'
    },
    prepare({ paragraphs, brands }) {
      return {
        title: 'About Section',
        subtitle: `${paragraphs?.length || 0} paragraphs, ${brands?.length || 0} featured brands`
      }
    }
  }
})
