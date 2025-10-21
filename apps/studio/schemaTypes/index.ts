import { type SchemaTypeDefinition } from 'sanity'
import videoProject from './videoProject'
import script from './script'
import siteSettings from './siteSettings'
import client from './client'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  videoProject,
  script,
  client,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
