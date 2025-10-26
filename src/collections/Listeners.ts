import { CollectionConfig } from 'payload/types'

export const Listeners: CollectionConfig = {
  slug: 'listeners',
  labels: {
    singular: 'Listener',
    plural: 'Listeners',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
    group: 'People',
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
    },
    {
      name: 'email',
      type: 'email',
    },
  ],
}
