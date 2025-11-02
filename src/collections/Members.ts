import { CollectionConfig } from 'payload/types'

export const Members: CollectionConfig = {
  slug: 'listeners', // Keep DB table name as 'listeners' to preserve existing data
  labels: {
    singular: 'Member',
    plural: 'Members',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'roles'],
    group: 'Community',
    pagination: {
      defaultLimit: 50,
    },
  },
  search: {
    fields: ['firstName', 'lastName', 'email', 'djName'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Base Fields (All Users)
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'memberSince',
      type: 'date',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['Listener'],
      options: [
        { label: 'Listener', value: 'Listener' },
        { label: 'Volunteer', value: 'Volunteer' },
        { label: 'Regular DJ', value: 'Regular DJ' },
        { label: 'Substitute DJ', value: 'Substitute DJ' },
        { label: 'Board Member', value: 'Board Member' },
      ],
      admin: {
        description: 'User roles - multiple roles can be selected'
      }
    },

    // Profile
    {
      name: 'profileImage',
      type: 'text',
    },
    {
      name: 'fullProfileImage',
      type: 'text',
    },
    {
      name: 'profileImageOrientation',
      type: 'select',
      options: [
        { label: 'Square', value: 'square' },
        { label: 'Landscape', value: 'landscape' },
        { label: 'Portrait', value: 'portrait' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'General bio for all member types (shown on member profiles and directory listings)'
      }
    },
    {
      name: 'location',
      type: 'text',
    },

    // DJ Fields (for Regular DJ and Substitute DJ roles)
    {
      name: 'djName',
      label: 'DJ Name',
      type: 'text',
      admin: {
        description: 'DJ on-air name (only for members with DJ role)'
      }
    },
    {
      name: 'showName',
      type: 'text',
      admin: {
        description: 'Name of their radio show'
      }
    },
    {
      name: 'showTime',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Show time slot - auto-populated from Show Schedules assignments'
      }
    },
    {
      name: 'djExcerpt',
      label: 'DJ Excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description for DJ cards and listings (1-2 sentences)'
      }
    },
    {
      name: 'djBio',
      label: 'DJ Bio',
      type: 'textarea',
      admin: {
        description: 'Full DJ biography shown on detailed DJ profile page (can be longer and more detailed than general bio)'
      }
    },
    {
      name: 'djDonationLink',
      label: 'DJ Donation Link',
      type: 'text',
      admin: {
        description: 'Optional donation link for the DJ'
      }
    },

    // User Data
    {
      name: 'collection',
      type: 'array',
      label: 'Music Collection',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'trackName', type: 'text', required: true },
        { name: 'artistName', type: 'text', required: true },
        { name: 'albumName', type: 'text' },
        { name: 'labelName', type: 'text' },
        { name: 'albumArt', type: 'text' },
        { name: 'albumArtAlt', type: 'text' },
        { name: 'isLocal', type: 'checkbox' },
        { name: 'dateAdded', type: 'date', required: true },
      ],
      admin: {
        description: 'User\'s saved music collection'
      }
    },
    {
      name: 'favoriteDJs',
      type: 'array',
      label: 'Favorite DJs',
      labels: {
        singular: 'Favorite DJ',
        plural: 'Favorite DJs',
      },
      fields: [
        {
          name: 'djId',
          type: 'text',
          label: 'DJ ID'
        }
      ]
    },
    {
      name: 'preferences',
      type: 'group',
      fields: [
        { name: 'emailNotifications', type: 'checkbox', defaultValue: true },
        { name: 'showNotifications', type: 'checkbox', defaultValue: true },
        { name: 'darkMode', type: 'select', options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'Device', value: 'device' },
        ]},
        { name: 'autoPlay', type: 'checkbox', defaultValue: true },
      ]
    },

    // Volunteer Fields
    {
      name: 'primaryPhoneType',
      type: 'text',
    },
    {
      name: 'primaryPhone',
      type: 'text',
    },
    {
      name: 'secondaryPhoneType',
      type: 'text',
    },
    {
      name: 'secondaryPhone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'state',
      type: 'text',
    },
    {
      name: 'zipCode',
      type: 'text',
    },
    {
      name: 'age',
      type: 'text',
    },
    {
      name: 'education',
      type: 'text',
    },
    {
      name: 'employer',
      type: 'text',
    },
    {
      name: 'volunteerOrgs',
      type: 'array',
      fields: [
        { name: 'org', type: 'text' }
      ]
    },
    {
      name: 'hasRadioExperience',
      type: 'text',
    },
    {
      name: 'radioStations',
      type: 'text',
    },
    {
      name: 'specialSkills',
      type: 'array',
      fields: [
        { name: 'skill', type: 'text' }
      ]
    },
    {
      name: 'hearAboutChirp',
      type: 'array',
      fields: [
        { name: 'source', type: 'text' }
      ]
    },
    {
      name: 'interests',
      type: 'array',
      fields: [
        { name: 'interest', type: 'text' }
      ]
    },
    {
      name: 'wantsToDJ',
      type: 'text',
      label: 'Wants To DJ',
    },
    {
      name: 'djAvailability',
      type: 'array',
      label: 'DJ Availability',
      labels: {
        singular: 'Time Slot',
        plural: 'Time Slots',
      },
      fields: [
        { name: 'time', type: 'text' }
      ]
    },
    {
      name: 'donorLevel',
      type: 'text',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'bluesky', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ]
    },

    // Substitute DJ Fields (for Substitute DJ role)
    {
      name: 'substituteAvailability',
      type: 'array',
      fields: [
        { name: 'time', type: 'text' }
      ]
    },
    {
      name: 'canSubstituteFor',
      type: 'array',
      labels: {
        singular: 'DJ',
        plural: 'DJs',
      },
      fields: [
        {
          name: 'djId',
          type: 'text',
          label: 'DJ ID'
        }
      ],
      admin: {
        description: 'DJs this substitute can fill in for'
      }
    },

    // Board Member Fields
    {
      name: 'boardPosition',
      type: 'text',
    },
    {
      name: 'boardSince',
      type: 'date',
    },
    {
      name: 'boardTermEnd',
      type: 'date',
    },
  ],
}
