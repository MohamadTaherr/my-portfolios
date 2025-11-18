import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import structure from './structure'
import {RevalidateAction} from './actions/RevalidateAction'

export default defineConfig({
  name: 'default',
  title: 'Creative Studio - Production & Writing Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Add the revalidate action to content types that should trigger website updates
      const revalidateTypes = [
        'portfolioWork',
        'post',
        'videoProject',
        'script',
        'client',
        'siteSettings',
        'aboutSection',
        'skillsSection',
        'pageContent',
        'navigationSettings',
        'footerSettings',
      ]

      if (revalidateTypes.includes(context.schemaType)) {
        return [...prev, RevalidateAction]
      }

      return prev
    },
  },
})
