import { CollectionConfig } from 'payload/types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Pages',
    preview: (doc) => {
      return `http://localhost:5173/${doc.slug}`
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description for SEO/previews',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'contentCard',
          labels: {
            singular: 'Content Card',
            plural: 'Content Cards',
          },
          fields: [
            {
              name: 'preheader',
              type: 'text',
              admin: {
                description: 'Small text above the title',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'titleTag',
              type: 'select',
              options: ['h1', 'h2', 'h3', 'h4'],
              defaultValue: 'h2',
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
            },
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              defaultValue: 'none',
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'backgroundImageUrl',
              type: 'text',
              admin: {
                description: 'Or provide external URL',
              },
            },
          ],
        },
        {
          slug: 'imageRow',
          labels: {
            singular: 'Image Row',
            plural: 'Image Rows',
          },
          fields: [
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                },
                {
                  name: 'alt',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display this page in navigation menus',
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Order in navigation (lower numbers first)',
      },
    },
  ],
}
