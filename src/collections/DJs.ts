import { CollectionConfig } from 'payload/types'

export const DJs: CollectionConfig = {
  slug: 'djs',
  labels: {
    singular: 'DJ',
    plural: 'DJs',
  },
  admin: {
    useAsTitle: 'djName',
    defaultColumns: ['djName', 'showName', 'showTime', 'role'],
    group: 'People',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Basic Info
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },

    // DJ Info
    {
      name: 'djName',
      type: 'text',
      required: true,
    },
    {
      name: 'showName',
      type: 'text',
    },
    {
      name: 'showTime',
      type: 'text',
      admin: {
        description: 'e.g., "Fri 11pm - 1am"',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Regular DJ', value: 'Regular DJ' },
        { label: 'Substitute DJ', value: 'Substitute DJ' },
        { label: 'Board Member', value: 'Board Member' },
        { label: 'President', value: 'President' },
        { label: 'Vice President', value: 'Vice President' },
        { label: 'Treasurer', value: 'Treasurer' },
        { label: 'Content Publisher', value: 'Content Publisher' },
        { label: 'General', value: 'General' },
      ],
      defaultValue: 'Regular DJ',
    },

    // Profile
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'profileImageUrl',
      type: 'text',
      admin: {
        description: 'Or provide external URL',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Short bio for cards/lists',
      },
    },
    {
      name: 'djExcerpt',
      type: 'textarea',
    },
    {
      name: 'djBio',
      type: 'richText',
      admin: {
        description: 'Full DJ biography',
      },
    },

    // Contact
    {
      name: 'primaryPhoneType',
      type: 'select',
      options: [
        { label: 'Mobile', value: 'mobile' },
        { label: 'Home', value: 'home' },
        { label: 'Work', value: 'work' },
      ],
    },
    {
      name: 'primaryPhone',
      type: 'text',
    },
    {
      name: 'secondaryPhoneType',
      type: 'select',
      options: [
        { label: 'Mobile', value: 'mobile' },
        { label: 'Home', value: 'home' },
        { label: 'Work', value: 'work' },
      ],
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
      name: 'location',
      type: 'text',
      admin: {
        description: 'Display location (e.g., "Chicago, IL")',
      },
    },

    // Professional
    {
      name: 'education',
      type: 'text',
    },
    {
      name: 'employer',
      type: 'text',
    },

    // Experience
    {
      name: 'memberSince',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'hasRadioExperience',
      type: 'select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
    },
    {
      name: 'radioStations',
      type: 'textarea',
      admin: {
        description: 'Previous radio experience',
      },
    },

    // Skills & Interests
    {
      name: 'specialSkills',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'select',
          options: [
            { label: 'DJ', value: 'DJ' },
            { label: 'Audio Production', value: 'Audio production' },
            { label: 'Community Outreach', value: 'Community outreach' },
            { label: 'Content Writing', value: 'Content writing' },
            { label: 'Event Planning', value: 'Event planning' },
            { label: 'Fundraising', value: 'Fundraising' },
            { label: 'Journalism', value: 'Journalism' },
            { label: 'Marketing', value: 'Marketing' },
            { label: 'Music Education', value: 'Music education' },
            { label: 'Photography', value: 'Photography' },
            { label: 'Sales', value: 'Sales' },
            { label: 'Other', value: 'Other' },
          ],
        },
      ],
    },
    {
      name: 'interests',
      type: 'array',
      fields: [
        {
          name: 'interest',
          type: 'select',
          options: [
            { label: 'DJ', value: 'DJ' },
            { label: 'Community Radio', value: 'Community radio' },
            { label: 'Content Writing', value: 'Content writing' },
            { label: 'Event Planning', value: 'Event planning' },
            { label: 'Event Working', value: 'Event working' },
            { label: 'Fundraising', value: 'Fundraising' },
            { label: 'Interviews', value: 'Interviews' },
            { label: 'Marketing', value: 'Marketing' },
          ],
        },
      ],
    },

    // Volunteering
    {
      name: 'volunteerOrgs',
      type: 'array',
      fields: [
        {
          name: 'org',
          type: 'text',
        },
      ],
    },
    {
      name: 'wantsToDJ',
      type: 'select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
    },
    {
      name: 'djAvailability',
      type: 'array',
      fields: [
        {
          name: 'time',
          type: 'select',
          options: [
            { label: 'Weekday Mornings', value: 'Weekday mornings' },
            { label: 'Weekday Day', value: 'Weekday day' },
            { label: 'Weekday Evening', value: 'Weekday evening' },
            { label: 'Weekday Night', value: 'Weekday night' },
            { label: 'Weekend Mornings', value: 'Weekend mornings' },
            { label: 'Weekend Day', value: 'Weekend day' },
            { label: 'Weekend Evening', value: 'Weekend evening' },
            { label: 'Weekend Night', value: 'Weekend night' },
          ],
        },
      ],
    },

    // Metadata
    {
      name: 'donorLevel',
      type: 'select',
      options: [
        { label: 'Listener', value: 'Listener' },
        { label: 'Supporter', value: 'Supporter' },
        { label: 'Vinyl Circle', value: 'Vinyl Circle' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'age',
      type: 'select',
      options: [
        { label: '18-24', value: '18-24' },
        { label: '25-34', value: '25-34' },
        { label: '35-44', value: '35-44' },
        { label: '45-54', value: '45-54' },
        { label: '55-64', value: '55-64' },
        { label: '65+', value: '65plus' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
