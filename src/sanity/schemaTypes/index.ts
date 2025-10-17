import { type SchemaTypeDefinition } from 'sanity'
import videoProject from './videoProject'
import script from './script'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoProject, script],
}
