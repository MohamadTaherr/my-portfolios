import { DocumentActionComponent } from 'sanity'

export const RevalidateAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props

  return {
    label: 'Publish & Update Website',
    icon: () => '🔄',
    tone: 'primary',
    onHandle: async () => {
      // First publish the document using the default publish action
      if (draft) {
        props.onComplete()
      }

      // Then trigger revalidation
      try {
        const revalidateUrl = process.env.SANITY_STUDIO_REVALIDATE_URL
        const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET

        if (!revalidateUrl || revalidateUrl.includes('YOUR-WEB-APP')) {
          console.error('⚠️ Please set SANITY_STUDIO_REVALIDATE_URL in your .env.local file')
          alert('Please configure your revalidate URL in .env.local')
          return
        }

        console.log('🔄 Updating website...')

        // Get the full document to include slug if it exists
        const doc = draft || published
        const payload: any = {
          _type: type,
          _id: id
        }

        // Add slug if it exists (for portfolioWork and post types)
        if (doc && 'slug' in doc) {
          payload.slug = doc.slug
        }

        const response = await fetch(revalidateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${secret}`,
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Website updated successfully!', data)
          alert('✅ Website updated successfully!')
        } else {
          const errorText = await response.text()
          console.error('❌ Failed to update website:', errorText)
          alert(`❌ Failed to update website: ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        console.error('❌ Error updating website:', error)
        alert(`❌ Error updating website: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    },
  }
}
