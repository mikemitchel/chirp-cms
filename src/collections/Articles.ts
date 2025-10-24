import { CollectionConfig } from 'payload/types'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'publishedDate', 'featured'],
    group: 'Content',
    preview: (doc) => {
      return `http://localhost:5173/articles/${doc.slug}`
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
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'id',
          type: 'text',
          required: true,
        },
        {
          name: 'profileImage',
          type: 'text',
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'featuredImageUrl',
      type: 'text',
      admin: {
        description: 'Or provide external URL',
      },
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
      name: 'youtubeVideoId',
      type: 'text',
      admin: {
        description: 'YouTube video ID (optional)',
      },
    },
    {
      name: 'videoTitle',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Music Scene', value: 'Music Scene' },
        { label: 'Interview', value: 'Interview' },
        { label: 'Album Reviews', value: 'Album Reviews' },
        { label: 'Vinyl Culture', value: 'Vinyl Culture' },
        { label: 'Venue Guide', value: 'Venue Guide' },
        { label: 'Community Guide', value: 'Community Guide' },
        { label: 'Behind the Scenes', value: 'Behind the Scenes' },
        { label: 'CHIRP History', value: 'CHIRP History' },
        { label: 'News', value: 'News' },
        { label: 'Feature', value: 'Feature' },
      ],
      required: true,
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
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'updatedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
      name: 'readTime',
      type: 'number',
      admin: {
        description: 'Estimated read time in minutes',
        position: 'sidebar',
      },
    },
  ],
}
