import type { CollectionConfig } from 'payload'

export const AgeGate: CollectionConfig = {
  slug: 'ageGate',
  labels: {
    singular: 'AgeGate',
    plural: 'AgeGate',
  },
  admin: {
    useAsTitle: 'age',
    defaultColumns: ['age'],
    group: 'Content Assets',
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
