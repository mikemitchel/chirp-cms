import type { CollectionConfig } from 'payload'
import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'venue', 'category', 'featured'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => `http://localhost:5173/events/${data.slug}`,
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'Select a category for this event',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief summary (max 200 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          LinkFeature({
            enabledCollections: [],
          }),
        ],
      }),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featuredImageUrl',
      type: 'text',
      admin: {
        description: 'Or provide external URL',
      },
    },
    {
      name: 'showPhotoCredit',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display photo credit on the event page',
      },
    },
    {
      name: 'photographerName',
      type: 'text',
      admin: {
        description: 'Name of the photographer',
        condition: (data) => data.showPhotoCredit === true,
      },
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      required: true,
      admin: {
        description: 'Select a venue from the list',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ageRestriction',
      type: 'relationship',
      relationTo: 'ageGate',
      admin: {
        position: 'sidebar',
        description: 'Select age restriction if applicable',
      },
    },
  ],
}
