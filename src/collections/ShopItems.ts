import type { CollectionConfig } from 'payload'

export const ShopItems: CollectionConfig = {
  slug: 'shopItems',
  labels: {
    singular: 'Shop Item',
    plural: 'Shop Items',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'inStock', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Product name',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated from name)',
      },
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            if (!value && data?.name) {
              return data?.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Product description',
      },
    },
    {
      name: 'itemType',
      type: 'text',
      admin: {
        description: 'Display type (e.g., Apparel, Poster, Merchandise)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'merchandise',
      options: [
        { label: 'Apparel', value: 'apparel' },
        { label: 'Accessories', value: 'accessories' },
        { label: 'Poster', value: 'poster' },
        { label: 'Merchandise', value: 'merchandise' },
        { label: 'Music', value: 'music' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Product category',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in USD',
        step: 0.01,
      },
    },
    {
      name: 'images',
      type: 'array',
      defaultValue: [],
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          admin: {
            description: 'Alt text for accessibility',
          },
        },
      ],
      admin: {
        description: 'Product images (first image is the main image)',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'External image URL (if not using uploaded image)',
      },
    },
    {
      name: 'additionalImageUrls',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Additional image URL',
          },
        },
        {
          name: 'alt',
          type: 'text',
          admin: {
            description: 'Alt text for accessibility',
          },
        },
      ],
      admin: {
        description: 'Additional product images (external URLs)',
      },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Is this item currently in stock?',
      },
    },
    {
      name: 'sizes',
      type: 'array',
      fields: [
        {
          name: 'size',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Available sizes (e.g., S, M, L, XL)',
        condition: (data) => data.category === 'apparel',
      },
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Variant name (e.g., Color, Style)',
          },
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'option',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
      admin: {
        description: 'Product variants (colors, styles, etc.)',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'External purchase URL (if sold on another platform)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this item on the shop homepage',
      },
    },
    {
      name: 'soldOut',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as sold out',
      },
    },
    {
      name: 'limitedEdition',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as limited edition',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
}
