import type { CollectionConfig } from 'payload'

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
