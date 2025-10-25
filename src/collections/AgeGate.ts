import { CollectionConfig } from 'payload/types'

export const AgeGate: CollectionConfig = {
  slug: 'ageGate',
  labels: {
    singular: 'AgeGate',
    plural: 'AgeGate',
  },
  admin: {
    useAsTitle: 'age',
    defaultColumns: ['age'],
    group: 'Site Assets',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'age',
      type: 'text',
      required: true,
    },
  ],
}
