import type { CollectionConfig } from 'payload'
import { sendWebhook } from '../utils/webhook'

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
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Send webhook notification to front-end
        await sendWebhook({
          collection: 'mobile-page-content',
          operation: operation === 'create' ? 'create' : 'update',
          timestamp: new Date().toISOString(),
          id: doc.id,
        })
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Send webhook notification to front-end
        await sendWebhook({
          collection: 'mobile-page-content',
          operation: 'delete',
          timestamp: new Date().toISOString(),
          id: doc.id,
        })
      },
    ],
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
        description: 'Text shown above the form (e.g., "Request a song for the DJ to play during their show")',
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
      name: 'announcement',
      type: 'relationship',
      relationTo: 'announcements',
      admin: {
        description: 'Select announcement to display on this page (optional)',
        condition: (data) =>
          data.pageIdentifier === 'recently-played' || data.pageIdentifier === 'my-collection',
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
        hidden: true,
        description: 'Does this page require the user to be logged in? (Not currently used - login requirements are defined by the app code)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to temporarily hide this page without deleting it. The page will not be shown in the app when inactive.',
      },
    },
  ],
}
