import type { CollectionConfig } from 'payload'
import { sendWebhook } from '../utils/webhook'

export const PlayerFallbackImages: CollectionConfig = {
  slug: 'player-fallback-images',
  labels: {
    singular: 'Player Fallback Image',
    plural: 'Player Fallback Images',
  },
  admin: {
    group: 'Media',
    description:
      'Fallback images displayed in the music player when album art is unavailable. These images are randomly selected to provide visual variety.',
    useAsTitle: 'alt',
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'player',
        width: 600,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Send webhook notification to front-end
        await sendWebhook({
          collection: 'player-fallback-images',
          operation: operation === 'create' ? 'create' : 'update',
          timestamp: new Date().toISOString(),
          id: doc.id,
        })
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Send webhook notification to front-end
        await sendWebhook({
          collection: 'player-fallback-images',
          operation: 'delete',
          timestamp: new Date().toISOString(),
          id: doc.id,
        })
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Descriptive name for this fallback image (e.g., "Abstract Pattern 1")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to temporarily disable this image from the random pool',
      },
    },
  ],
}
