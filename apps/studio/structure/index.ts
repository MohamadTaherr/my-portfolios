import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Creative Studio')
    .items([
      // MAIN PORTFOLIO - Quick Access
      S.listItem()
        .title('✨ All Portfolio Work')
        .icon(() => '✨')
        .child(
          S.documentTypeList('portfolioWork')
            .title('All Portfolio Work')
            .defaultOrdering([{ field: 'featured', direction: 'desc' }, { field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // FILTER BY TYPE
      S.listItem()
        .title('📁 Browse by Type')
        .icon(() => '📁')
        .child(
          S.list()
            .title('Filter by Work Type')
            .items([
              S.listItem()
                .title('⭐ Featured Work')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Featured Work')
                    .filter('_type == "portfolioWork" && featured == true')
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
                .title('📸 Photography')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Photography & Visuals')
                    .filter('_type == "portfolioWork" && workType == "photography"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('🎨 Campaigns')
                .child(
                  S.documentTypeList('portfolioWork')
                    .title('Creative Campaigns')
                    .filter('_type == "portfolioWork" && workType == "campaign"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // BLOG & ARTICLES
      S.listItem()
        .title('✍️ Blog Posts')
        .icon(() => '✍️')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts & Articles')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.divider(),

      // PROFILE & ABOUT
      S.listItem()
        .title('👤 Profile & About')
        .icon(() => '👤')
        .child(
          S.list()
            .title('Profile & Bio')
            .items([
              S.listItem()
                .title('About Me')
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
            ])
        ),

      S.divider(),

      // CLIENTS
      S.listItem()
        .title('🤝 Clients')
        .icon(() => '🤝')
        .child(
          S.documentTypeList('client')
            .title('Clients & Collaborators')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // SITE SETTINGS
      S.listItem()
        .title('⚙️ Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Site Settings')
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
              S.listItem()
                .title('Page Copy')
                .icon(() => '📝')
                .child(
                  S.document()
                    .schemaType('pageContent')
                    .documentId('pageContent')
                ),
            ])
        ),
    ])

export default structure
