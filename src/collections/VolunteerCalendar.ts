import type { CollectionConfig } from 'payload'

export const VolunteerCalendar: CollectionConfig = {
  slug: 'volunteerCalendar',
  labels: {
    singular: 'Volunteer Calendar Event',
    plural: 'Volunteer Calendar',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'startDate', 'location'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Event Name',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
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
      label: 'End Date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Optional - leave blank if same as start date',
      },
    },
    {
      name: 'dateTime',
      label: 'Formatted Date/Time Display',
      type: 'text',
      required: true,
      admin: {
        description: 'Human-readable date and time (e.g., "Wednesday, October 15, 2025 at 6:00 PM")',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of the event',
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
      admin: {
        description: 'Full address or virtual meeting info',
      },
    },
    {
      name: 'eventDetails',
      label: 'Event Details',
      type: 'array',
      required: false,
      admin: {
        description: 'Bullet points with additional event details',
      },
      fields: [
        {
          name: 'detail',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'moreInfoUrl',
      label: 'More Info URL',
      type: 'text',
      admin: {
        description: 'Optional link for more information',
      },
    },
  ],
}
