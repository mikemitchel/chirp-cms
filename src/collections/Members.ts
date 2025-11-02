import type { CollectionConfig } from 'payload'

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
    // TABS START HERE
    {
      type: 'tabs',
      tabs: [
        // ==========================================
        // LISTENER TAB (Always shown for all members)
        // ==========================================
        {
          label: 'Listener',
          fields: [
            // Base Information
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
            {
              name: 'profileImage',
              type: 'text',
              admin: {
                description: 'URL to cropped/display profile image'
              }
            },
            {
              name: 'fullProfileImage',
              type: 'text',
              admin: {
                description: 'URL to full-size original profile image'
              }
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
          ],
        },

        // ==========================================
        // PREFERENCES TAB (All listeners)
        // ==========================================
        {
          label: 'Preferences',
          fields: [
            {
              name: 'preferences',
              type: 'group',
              fields: [
                { name: 'emailNotifications', type: 'checkbox', defaultValue: true, label: 'Email Notifications' },
                { name: 'showNotifications', type: 'checkbox', defaultValue: true, label: 'Show Notifications' },
                { name: 'darkMode', type: 'select', label: 'Dark Mode', options: [
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                  { label: 'Device', value: 'device' },
                ]},
                { name: 'autoPlay', type: 'checkbox', defaultValue: true, label: 'Auto Play' },
              ]
            },
          ],
        },

        // ==========================================
        // MUSIC COLLECTION TAB (All listeners)
        // ==========================================
        {
          label: 'Music Collection',
          fields: [
            {
              name: 'collection',
              type: 'array',
              label: 'Saved Tracks',
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
          ],
        },

        // ==========================================
        // FAVORITE DJs TAB (All listeners)
        // ==========================================
        {
          label: 'Favorite DJs',
          fields: [
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
          ],
        },

        // ==========================================
        // DONATION HISTORY TAB (All listeners)
        // ==========================================
        {
          label: 'Donation History',
          description: 'All donations made by this member. View and manage donations in the Donations collection.',
          fields: [
            {
              name: 'donorLevel',
              type: 'text',
              admin: {
                description: 'Donor level based on total donations (e.g., Bronze, Silver, Gold)',
              },
            },
          ],
        },

        // ==========================================
        // PURCHASE HISTORY TAB (All listeners)
        // ==========================================
        {
          label: 'Purchase History',
          description: 'All store purchases made by this member. View and manage purchases in the Purchases collection.',
          fields: [
            {
              name: '_purchaseNote',
              type: 'text',
              admin: {
                readOnly: true,
                description: 'Store purchases are managed in the Purchases collection. To view this member\'s purchase history, go to Collections > Purchases and filter by this member.',
              },
            },
          ],
        },

        // ==========================================
        // VOLUNTEER TAB (Conditional)
        // ==========================================
        {
          label: 'Volunteer',
          admin: {
            condition: (data) => data?.roles?.includes('Volunteer'),
          },
          fields: [
            { name: 'primaryPhoneType', type: 'text', label: 'Primary Phone Type' },
            { name: 'primaryPhone', type: 'text', label: 'Primary Phone' },
            { name: 'secondaryPhoneType', type: 'text', label: 'Secondary Phone Type' },
            { name: 'secondaryPhone', type: 'text', label: 'Secondary Phone' },
            { name: 'address', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'state', type: 'text' },
            { name: 'zipCode', type: 'text', label: 'Zip Code' },
            { name: 'age', type: 'text' },
            { name: 'education', type: 'text' },
            { name: 'employer', type: 'text' },
            {
              name: 'volunteerOrgs',
              type: 'array',
              label: 'Other Volunteer Organizations',
              fields: [
                { name: 'org', type: 'text', label: 'Organization' }
              ]
            },
            { name: 'hasRadioExperience', type: 'text', label: 'Has Radio Experience?' },
            { name: 'radioStations', type: 'text', label: 'Radio Stations Worked At' },
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
              label: 'How They Heard About CHIRP',
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
            { name: 'wantsToDJ', type: 'text', label: 'Wants To DJ' },
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
              name: 'socialLinks',
              type: 'group',
              label: 'Social Media Links',
              fields: [
                { name: 'facebook', type: 'text', label: 'Facebook URL' },
                { name: 'instagram', type: 'text', label: 'Instagram URL' },
                { name: 'twitter', type: 'text', label: 'Twitter URL' },
                { name: 'bluesky', type: 'text', label: 'Bluesky URL' },
                { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
              ]
            },
          ],
        },

        // ==========================================
        // DJ TAB (Conditional)
        // ==========================================
        {
          label: 'DJ',
          admin: {
            condition: (data) =>
              data?.roles?.includes('Regular DJ') ||
              data?.roles?.includes('Substitute DJ'),
          },
          fields: [
            { name: 'djName', label: 'DJ Name', type: 'text' },
            { name: 'showName', label: 'Show Name', type: 'text' },
            {
              name: 'showTime',
              label: 'Show Time',
              type: 'text',
              admin: {
                readOnly: true,
                description: 'Auto-populated from Show Schedules assignments'
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
                description: 'Full DJ biography shown on detailed DJ profile page'
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

            // Substitute DJ specific fields (nested condition)
            {
              name: 'substituteAvailability',
              type: 'array',
              label: 'Substitute Availability',
              fields: [{ name: 'time', type: 'text' }],
              admin: {
                condition: (data) => data?.roles?.includes('Substitute DJ'),
                description: 'Only for Substitute DJs'
              },
            },
            {
              name: 'canSubstituteFor',
              type: 'array',
              label: 'Can Substitute For',
              labels: {
                singular: 'DJ',
                plural: 'DJs',
              },
              fields: [
                { name: 'djId', type: 'text', label: 'DJ ID' }
              ],
              admin: {
                condition: (data) => data?.roles?.includes('Substitute DJ'),
                description: 'DJs this substitute can fill in for'
              },
            },
          ],
        },

        // ==========================================
        // BOARD MEMBER TAB (Conditional)
        // ==========================================
        {
          label: 'Board Member',
          admin: {
            condition: (data) => data?.roles?.includes('Board Member'),
          },
          fields: [
            {
              name: 'boardPosition',
              type: 'text',
              label: 'Board Position',
              admin: {
                description: 'e.g., President, Treasurer, Secretary'
              }
            },
            { name: 'boardSince', type: 'date', label: 'Board Member Since' },
            { name: 'boardTermEnd', type: 'date', label: 'Board Term Ends' },
          ],
        },
      ],
    },
  ],
}
