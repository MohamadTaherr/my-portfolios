import { DocumentActionComponent } from 'sanity'

export const RevalidateAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props

  return {
    label: 'Publish & Update Website',
    icon: () => '🔄',
    onHandle: async () => {
      // First publish the document
      if (draft) {
        props.onComplete()
      }

      // Then trigger revalidation
      try {
        const revalidateUrl = process.env.SANITY_STUDIO_REVALIDATE_URL || 'https://your-site.vercel.app/api/revalidate'
        const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET || 'my-super-secret-revalidate-token-12345'

        const response = await fetch(revalidateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${secret}`,
          },
          body: JSON.stringify({ _type: type, _id: id }),
        })

        if (response.ok) {
          console.log('✅ Website updated successfully!')
        } else {
          console.error('Failed to update website:', await response.text())
        }
      } catch (error) {
        console.error('Error updating website:', error)
      }
    },
  }
}
