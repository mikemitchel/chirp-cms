import type { CollectionConfig } from 'payload'

export const Onboarding: CollectionConfig = {
  slug: 'onboarding',
  labels: {
    singular: 'Onboarding Step',
    plural: 'Onboarding Steps',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featureIdentifier', 'platform', 'order', 'isActive'],
    group: 'Content',
    description: 'Manage onboarding tour steps shown to new users',
  },
  access: {
    read: () => true,
    create: () => true, // Allow public creation for seeding
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of this onboarding step (e.g., "Complete Your Profile")',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Description text explaining this feature to the user',
      },
    },
    {
      name: 'featureIdentifier',
      type: 'select',
      required: true,
      options: [
        { label: 'Welcome', value: 'welcome' },
        { label: 'Profile Completion', value: 'profile' },
        { label: 'Collection / Favorites', value: 'collection' },
        { label: 'Explore Features', value: 'explore-features' },
        { label: 'Support CHIRP', value: 'support' },
        { label: 'Favorite DJs', value: 'favorite-djs' },
        { label: 'Request Songs', value: 'request-songs' },
      ],
      admin: {
        description: 'Which feature this step demonstrates (used by frontend to trigger appropriate UI)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Order in which this step appears (lower numbers appear first)',
        step: 1,
      },
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Both Web and Mobile', value: 'both' },
        { label: 'Web Only', value: 'web' },
        { label: 'Mobile Only', value: 'mobile' },
      ],
      admin: {
        description: 'Which platform(s) should show this step',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional image or video to illustrate this step',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      admin: {
        description: 'Call-to-action button text (e.g., "Get Started", "Next", "Skip")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to temporarily hide this step without deleting it',
      },
    },
  ],
}
