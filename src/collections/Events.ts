import { CollectionConfig } from 'payload/types'

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
    preview: (doc) => {
      return `http://localhost:5173/events/${doc.slug}`
    },
  },
  access: {
    read: () => true,
  },
  fields: [
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
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
      name: 'category',
      type: 'select',
      options: [
        { label: 'Fundraiser', value: 'Fundraiser' },
        { label: 'Community Event', value: 'Community Event' },
        { label: 'Concert', value: 'Concert' },
        { label: 'Workshop', value: 'Workshop' },
        { label: 'Festival', value: 'Festival' },
        { label: 'Live Session', value: 'Live Session' },
      ],
      required: true,
    },
    {
      name: 'ticketPrice',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'ticketUrl',
      type: 'text',
    },
    {
      name: 'isFree',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ageRestriction',
      type: 'text',
      admin: {
        description: 'e.g., "21+", "All ages"',
        position: 'sidebar',
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
      name: 'performers',
      type: 'array',
      fields: [
        {
          name: 'performer',
          type: 'text',
        },
      ],
    },
  ],
}
