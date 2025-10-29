import { defineType } from 'sanity'

export const skillsSection = defineType({
  name: 'skillsSection',
  title: 'Skills & Expertise',
  type: 'document',
  icon: () => '⚡',
  fields: [
    {
      name: 'stats',
      title: 'Statistics & Achievements',
      type: 'array',
      description: 'Key statistics and achievements to display',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number/Value',
              type: 'string',
              description: 'The statistic value (e.g., "20+", "200+", "100%")',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the statistic (e.g., "Years of Experience", "Scripts Written")',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon (Emoji)',
              type: 'string',
              description: 'An emoji to represent this stat (e.g., 📊, 🎬, ✍️)',
              validation: Rule => Rule.max(2)
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this stat appears (lower numbers appear first)',
              validation: Rule => Rule.required().min(0)
            }
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
              icon: 'icon',
              order: 'order'
            },
            prepare({ number, label, icon, order }) {
              return {
                title: `${number} - ${label}`,
                subtitle: `${icon || '📊'} | Order: ${order}`,
                media: undefined
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(12).warning('Between 4-8 stats is recommended for best display')
    },
    {
      name: 'competencies',
      title: 'Core Competencies',
      type: 'array',
      description: 'List of skills and expertise areas',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required().min(1).max(20).warning('Between 6-12 competencies is recommended')
    },
    {
      name: 'competencyCategories',
      title: 'Competency Categories (Optional)',
      type: 'array',
      description: 'Group competencies into categories for better organization',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category Name',
              type: 'string',
              description: 'Category name (e.g., "Production", "Post-Production", "Creative")'
            },
            {
              name: 'skills',
              title: 'Skills in this Category',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags'
              }
            }
          ],
          preview: {
            select: {
              category: 'category',
              skills: 'skills'
            },
            prepare({ category, skills }) {
              return {
                title: category,
                subtitle: `${skills?.length || 0} skills`
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      stats: 'stats',
      competencies: 'competencies'
    },
    prepare({ stats, competencies }) {
      return {
        title: 'Skills & Expertise',
        subtitle: `${stats?.length || 0} stats, ${competencies?.length || 0} competencies`
      }
    }
  }
})
