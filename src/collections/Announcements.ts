import { CollectionConfig } from 'payload/types'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: 'Announcement',
    plural: 'Announcements',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'priority', 'isActive'],
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
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Event', value: 'event' },
        { label: 'Content', value: 'content' },
        { label: 'Technical', value: 'technical' },
        { label: 'Alert', value: 'alert' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Schedule', value: 'schedule' },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      required: true,
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      defaultValue: 'medium',
    },
    {
      name: 'displayOn',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Landing Page', value: 'landing' },
        { label: 'Articles Page', value: 'articles' },
        { label: 'Events Page', value: 'events' },
        { label: 'Podcast Page', value: 'podcasts' },
        { label: 'DJs Page', value: 'djs' },
        { label: 'About Page', value: 'about' },
        { label: 'Volunteer Page', value: 'volunteer' },
        { label: 'Contact Page', value: 'contact' },
        { label: 'Ways to Give Page', value: 'ways-to-give' },
        { label: 'Ways to Listen Page', value: 'ways-to-listen' },
      ],
      admin: {
        description: 'Select which pages this announcement should appear on',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      admin: {
        description: 'Call-to-action button text (optional)',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: {
        description: 'Call-to-action button URL (optional)',
      },
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Can users dismiss this announcement?',
      },
    },
    {
      name: 'featuredOnLanding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show prominently on landing page',
      },
    },
    {
      name: 'showDonationBar',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show donation progress bar',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        description: 'CSS class for background color (e.g., cr-bg-natural-a500)',
        position: 'sidebar',
      },
    },
  ],
}
