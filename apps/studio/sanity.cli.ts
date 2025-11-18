import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },

  /**
   * Deployment configuration
   * Learn more at https://www.sanity.io/docs/cli#deployment
   */
  deployment: {
    autoUpdates: true,
    appId: 'cj7igvzmipctxezw3u3afvk8',
  },
})
