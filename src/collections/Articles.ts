import { CollectionConfig } from 'payload/types'
import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'publishedDate'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => `http://localhost:5173/articles/${data.slug}`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
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
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
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
      maxLength: 200,
      admin: {
        description: 'Brief summary (max 200 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
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
      name: 'videoTitle',
      type: 'text',
    },
    {
      name: 'youtubeVideoId',
      type: 'text',
      admin: {
        description: 'YouTube video ID or full URL (e.g., rXeaPSu1JFY or https://www.youtube.com/watch?v=rXeaPSu1JFY)',
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (!value) return value

            // Extract video ID from various YouTube URL formats
            const patterns = [
              /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
              /^([a-zA-Z0-9_-]{11})$/ // Direct video ID format
            ]

            for (const pattern of patterns) {
              const match = value.match(pattern)
              if (match) {
                return match[1]
              }
            }

            return value
          }
        ]
      }
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
  ],
}
