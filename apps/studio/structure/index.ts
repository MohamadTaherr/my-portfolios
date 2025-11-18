import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Creative Studio')
    .items([
      // MAIN CREATIVE WORK
      S.listItem()
        .title('✨ My Work')
        .icon(() => '✨')
        .child(
          S.list()
            .title('Creative Portfolio')
            .items([
              S.listItem()
                .title('All Portfolio Work')
                .icon(() => '🎨')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('All Work')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('🎬 Video & Film')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Video Productions')
                    .filter('_type == "portfolioWork" && workType == "video"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📺 Ads & Commercials')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Advertisements')
                    .filter('_type == "portfolioWork" && workType == "advertisement"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📝 Scripts & Writing')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Scripts')
                    .filter('_type == "portfolioWork" && (workType == "script" || workType == "writing")')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🎭 Theater')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Theater Productions')
                    .filter('_type == "portfolioWork" && workType == "theater"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📰 Articles & Posts')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Articles')
                    .filter('_type == "portfolioWork" && workType == "article"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('📸 Photography & Visuals')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Photography')
                    .filter('_type == "portfolioWork" && workType == "photography"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🎨 Creative Campaigns')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Campaigns')
                    .filter('_type == "portfolioWork" && workType == "campaign"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('⭐ Featured Work')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Featured')
                    .filter('_type == "portfolioWork" && featured == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // BLOG & ARTICLES
      S.listItem()
        .title('✍️ Blog & Writing')
        .icon(() => '✍️')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts & Articles')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.divider(),

      // LEGACY CONTENT (for migration)
      S.listItem()
        .title('📦 Legacy Content')
        .icon(() => '📦')
        .child(
          S.list()
            .title('Legacy Content (For Migration)')
            .items([
              S.listItem()
                .title('Old Video Projects')
                .icon(() => '🎬')
                .child(
                  S.documentTypeList('videoProject')
                    .title('Video Projects (Legacy)')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Old Scripts')
                .icon(() => '📝')
                .child(
                  S.documentTypeList('script')
                    .title('Scripts (Legacy)')
                ),
            ])
        ),

      S.divider(),

      // CLIENTS & COLLABORATORS
      S.listItem()
        .title('🤝 Clients & Collaborators')
        .icon(() => '🤝')
        .child(
          S.documentTypeList('client')
            .title('Clients')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ABOUT & PROFILE
      S.listItem()
        .title('👤 About Me')
        .icon(() => '👤')
        .child(
          S.list()
            .title('Profile & Bio')
            .items([
              S.listItem()
                .title('About Section')
                .icon(() => '👤')
                .child(
                  S.document()
                    .schemaType('aboutSection')
                    .documentId('aboutSection')
                ),
              S.listItem()
                .title('Skills & Expertise')
                .icon(() => '⚡')
                .child(
                  S.document()
                    .schemaType('skillsSection')
                    .documentId('skillsSection')
                ),
              S.listItem()
                .title('Page Copy & Text')
                .icon(() => '📝')
                .child(
                  S.document()
                    .schemaType('pageContent')
                    .documentId('pageContent')
                ),
            ])
        ),

      S.divider(),

      // SITE SETTINGS
      S.listItem()
        .title('⚙️ Site Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('General Settings')
                .icon(() => '🌐')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Navigation')
                .icon(() => '🧭')
                .child(
                  S.document()
                    .schemaType('navigationSettings')
                    .documentId('navigationSettings')
                ),
              S.listItem()
                .title('Footer')
                .icon(() => '🦶')
                .child(
                  S.document()
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                ),
              S.divider(),
              S.listItem()
                .title('Project Categories')
                .icon(() => '🎬')
                .child(
                  S.document()
                    .schemaType('projectCategory')
                    .documentId('projectCategory')
                ),
              S.listItem()
                .title('Script Types')
                .icon(() => '📝')
                .child(
                  S.document()
                    .schemaType('scriptType')
                    .documentId('scriptType')
                ),
            ])
        ),
    ])

export default structure
