import { CollectionConfig } from 'payload/types'

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  labels: {
    singular: 'Podcast',
    plural: 'Podcasts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'host', 'category', 'isActive'],
    group: 'Content',
    preview: (doc) => {
      return `http://localhost:5173/podcasts/${doc.slug}`
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
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'host',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Music Interview', value: 'Music Interview' },
        { label: 'Local Music', value: 'Local Music' },
        { label: 'Record Talk', value: 'Record Talk' },
        { label: 'Album Discussion', value: 'Album Discussion' },
        { label: 'Tour Stories', value: 'Tour Stories' },
        { label: 'Experimental', value: 'Experimental' },
        { label: 'Hip-Hop', value: 'Hip-Hop' },
        { label: 'Production', value: 'Production' },
        { label: 'Live Performance', value: 'Live Performance' },
        { label: 'Genre Exploration', value: 'Genre Exploration' },
        { label: 'Music Business', value: 'Music Business' },
        { label: 'Performance', value: 'Performance' },
      ],
      required: true,
    },
    {
      name: 'coverArt',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverArtUrl',
      type: 'text',
      admin: {
        description: 'Or provide external URL',
      },
    },
    {
      name: 'soundCloudEmbedUrl',
      type: 'text',
      admin: {
        description: 'SoundCloud embed URL',
      },
    },
    {
      name: 'pullQuote',
      type: 'textarea',
    },
    {
      name: 'pullQuoteAttribution',
      type: 'text',
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
    },
    {
      name: 'transcriptUrl',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
