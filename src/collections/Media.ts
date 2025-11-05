import type { CollectionConfig } from 'payload'
import { generateAltText, capitalizeFirstLetter } from '../utils/generateAltText'
import fs from 'fs'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    group: 'Media',
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 400,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1200,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'jpeg',
      options: {
        quality: 85,
        progressive: true,
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation, previousDoc }) => {
        // Only auto-generate alt text on create (new uploads) if alt text is not already set
        if (operation === 'create' && !doc.alt && doc.filename) {
          try {
            // Construct the file path from the media directory
            const mediaDir = path.join(process.cwd(), 'media')
            const filePath = path.join(mediaDir, doc.filename as string)

            console.log('[Media afterChange] Checking file:', filePath)

            if (fs.existsSync(filePath)) {
              const imageBuffer = fs.readFileSync(filePath)

              // Generate alt text using Hugging Face
              const generatedAlt = await generateAltText(imageBuffer)

              if (generatedAlt) {
                // Capitalize first letter for proper formatting
                const altText = capitalizeFirstLetter(generatedAlt)

                // Update the document with the generated alt text
                await req.payload.update({
                  collection: 'media',
                  id: doc.id,
                  data: {
                    alt: altText,
                  },
                })

                console.log('[Media afterChange] Auto-generated and saved alt text:', altText)
              }
            } else {
              console.log('[Media afterChange] File not found:', filePath)
            }
          } catch (error) {
            console.error('[Media afterChange] Error generating alt text:', error)
            // Don't throw - upload already succeeded
          }
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'General',
      options: [
        { label: 'General', value: 'General' },
        { label: 'Member Profile Images', value: 'Member Profile Images' },
        { label: 'Articles', value: 'Articles' },
        { label: 'Events', value: 'Events' },
        { label: 'Podcasts', value: 'Podcasts' },
        { label: 'Shop Items', value: 'Shop Items' },
        { label: 'Advertisements', value: 'Advertisements' },
      ],
      admin: {
        description: 'Organize media by category',
        position: 'sidebar',
      },
    },
  ],
}
