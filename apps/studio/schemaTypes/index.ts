import { type SchemaTypeDefinition } from 'sanity'
// New unified schemas
import portfolioWork from './portfolioWork'
import post from './post'

// Legacy schemas (keeping for now)
import videoProject from './videoProject'
import script from './script'

// Settings and content
import siteSettings from './siteSettings'
import client from './client'
import { pageContent } from './pageContent'
import { skillsSection } from './skillsSection'
import { navigationSettings } from './navigationSettings'
import { footerSettings } from './footerSettings'
import { aboutSection } from './aboutSection'
import { projectCategory } from './projectCategory'
import { scriptType } from './scriptType'

export const schemaTypes: SchemaTypeDefinition[] = [
  // PRIMARY CONTENT - Creative Work
  portfolioWork,
  post,

  // Legacy schemas (for backward compatibility)
  videoProject,
  script,

  // Site-wide settings (singleton documents)
  siteSettings,
  pageContent,
  navigationSettings,
  footerSettings,
  projectCategory,
  scriptType,

  // Section-specific content
  aboutSection,
  skillsSection,

  // Collections
  client,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
