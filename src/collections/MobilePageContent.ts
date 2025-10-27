import { CollectionConfig } from 'payload/types'

export const MobilePageContent: CollectionConfig = {
  slug: 'mobilePageContent',
  labels: {
    singular: 'Mobile Page Content',
    plural: 'Mobile Page Content',
  },
  admin: {
    useAsTitle: 'pageIdentifier',
    defaultColumns: ['pageIdentifier', 'pageTitle', 'isActive', 'updatedAt'],
    group: 'Mobile App',
    description: 'Manage page-specific content for mobile app screens',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageIdentifier',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Make a Request', value: 'make-request' },
        { label: 'Now Playing', value: 'now-playing' },
        { label: 'Recently Played', value: 'recently-played' },
        { label: 'My Collection', value: 'my-collection' },
        { label: 'Account Settings', value: 'account-settings' },
        { label: 'Android Auto', value: 'android-auto' },
      ],
      admin: {
        description: 'Which mobile screen this content is for (one entry per page)',
      },
    },
    {
      name: 'pageTitle',
      type: 'text',
      admin: {
        description: 'Page heading (e.g., "Make a Song Request")',
      },
    },
    {
      name: 'pageSubtitle',
      type: 'text',
      admin: {
        description: 'Optional subheading below the title',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        description: 'Content shown at the top of the page (before main content)',
      },
    },
    {
      name: 'formHintText',
      type: 'text',
      admin: {
        description: 'Hint text for forms (e.g., "Keep it friendly and respectful")',
        condition: (data) => data.pageIdentifier === 'make-request',
      },
    },
    {
      name: 'customNotLoggedInMessage',
      type: 'richText',
      admin: {
        description: 'Override the global not-logged-in message for this specific page (optional)',
      },
    },
    {
      name: 'isLoginRequired',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Does this page require the user to be logged in?',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable/disable this page content',
      },
    },
  ],
}
