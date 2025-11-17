import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // PORTFOLIO SECTION - Main content
      S.listItem()
        .title('📁 Portfolio')
        .child(
          S.list()
            .title('Portfolio Content')
            .items([
              S.listItem()
                .title('Video Projects')
                .icon(() => '🎬')
                .child(
                  S.documentTypeList('videoProject')
                    .title('Video Projects')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Scripts')
                .icon(() => '📝')
                .child(
                  S.documentTypeList('script')
                    .title('Scripts')
                ),
              S.listItem()
                .title('Clients')
                .icon(() => '🤝')
                .child(
                  S.documentTypeList('client')
                    .title('Clients')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // PAGE CONTENT SECTION
      S.listItem()
        .title('📄 Page Content')
        .child(
          S.list()
            .title('Page Content')
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

      // SETTINGS SECTION
      S.listItem()
        .title('⚙️ Settings')
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
