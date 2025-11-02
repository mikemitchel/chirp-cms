import { CollectionConfig } from 'payload/types'

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'transactionId',
    defaultColumns: ['member', 'amount', 'date', 'status', 'type'],
    group: 'Commerce',
    pagination: {
      defaultLimit: 50,
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'listeners',
      required: true,
      hasMany: false,
      admin: {
        description: 'Member who made this donation',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Donation amount in USD',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of donation',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'One-time',
      options: [
        { label: 'One-time', value: 'One-time' },
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Annual', value: 'Annual' },
        { label: 'In-kind', value: 'In-kind' },
      ],
      admin: {
        description: 'Type of donation',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'completed',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: {
        description: 'Status of donation transaction',
      },
    },
    {
      name: 'transactionId',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Unique transaction ID from payment processor',
      },
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Neon', value: 'Neon' },
        { label: 'PayPal', value: 'PayPal' },
        { label: 'Manual', value: 'Manual' },
        { label: 'Other', value: 'Other' },
      ],
      admin: {
        description: 'Payment source/processor',
      },
    },
    {
      name: 'taxReceiptSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether tax receipt has been sent to donor',
      },
    },
    {
      name: 'receiptUrl',
      type: 'text',
      admin: {
        description: 'URL to downloadable receipt PDF',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this donation',
      },
    },
  ],
}
