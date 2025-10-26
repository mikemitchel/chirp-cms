import { CollectionConfig } from 'payload/types'

export const WeeklyCharts: CollectionConfig = {
  slug: 'weeklyCharts',
  labels: {
    singular: 'Weekly Chart',
    plural: 'Weekly Charts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'listType', 'weekOf', 'isCurrentWeek', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Auto-generated from list type and week, e.g. "Top 50 for the week of October 20, 2025"',
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data.listType && data.weekOf) {
              const date = new Date(data.weekOf)
              const formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
              return `${data.listType} for the week of ${formattedDate}`
            }
            return data.title
          },
        ],
      },
    },
    {
      name: 'listType',
      type: 'select',
      required: true,
      options: [
        { label: 'Top 50', value: 'Top 50' },
        { label: "This Week's Adds", value: "This Week's Adds" },
        { label: 'Top 10 Favorites', value: 'Top 10 Favorites' },
      ],
      admin: {
        description: 'Type of chart/list',
      },
    },
    {
      name: 'weekOf',
      type: 'date',
      required: true,
      admin: {
        description: 'Monday of the week this chart represents',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'csvFile',
      type: 'upload',
      relationTo: 'media',
      label: 'CSV File',
      admin: {
        description: 'Upload a CSV file (format: Position,Artist,Track,Label). Click "Create New" to select and upload a file.',
      },
    },
    {
      name: 'csvImport',
      type: 'textarea',
      label: 'Import CSV Data',
      admin: {
        description: 'Or paste CSV data here (format: Position,Artist,Track,Label). Each line should be one track. This will populate the tracks below when you save.',
      },
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            if (value && value.trim()) {
              const lines = value.trim().split('\n')
              const tracks = lines.map((line, index) => {
                const parts = line.split(',').map(p => p.trim())

                // Handle different formats
                if (parts.length >= 3) {
                  return {
                    position: parts[0] ? parseInt(parts[0]) : index + 1,
                    artist: parts[1] || '',
                    trackName: parts[2] || '',
                    label: parts[3] || '',
                  }
                }
                return null
              }).filter(Boolean)

              if (tracks.length > 0) {
                data.tracks = tracks
              }
            }
            return value
          },
        ],
      },
    },
    {
      name: 'tracks',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'position',
          type: 'number',
          admin: {
            description: 'Chart position (auto-numbered based on order, or manually set)',
          },
        },
        {
          name: 'artist',
          type: 'text',
          required: true,
        },
        {
          name: 'trackName',
          type: 'text',
          required: true,
          admin: {
            description: 'Track/album title',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Record label (use "self-released" if independent)',
          },
        },
      ],
      admin: {
        description: 'Tracks for this chart. Format: Artist – Track (Label)',
      },
    },
    {
      name: 'isCurrentWeek',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this as the current week\'s chart to display on the Listen page',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Optional notes or highlights for this week',
      },
    },
    {
      name: 'featuredTrack',
      type: 'number',
      admin: {
        description: 'Position of the featured/highlighted track (optional)',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Publish status',
      },
    },
  ],
}
