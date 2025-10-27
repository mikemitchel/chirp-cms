import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: 'Admin',
    plural: 'Admins',
  },
  admin: {
    useAsTitle: 'email',
    group: 'CMS Settings',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
