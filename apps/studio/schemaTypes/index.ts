import { type SchemaTypeDefinition } from 'sanity'
import videoProject from './videoProject'
import script from './script'
import siteSettings from './siteSettings'
import client from './client'
import { pageContent } from './pageContent'
import { skillsSection } from './skillsSection'
import { navigationSettings } from './navigationSettings'
import { footerSettings } from './footerSettings'
import { aboutSection } from './aboutSection'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Site-wide settings (singleton documents)
  siteSettings,
  pageContent,
  navigationSettings,
  footerSettings,

  // Section-specific content
  aboutSection,
  skillsSection,

  // Collections
  videoProject,
  script,
  client,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
