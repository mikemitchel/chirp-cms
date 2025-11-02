import { CollectionConfig } from 'payload/types'

export const ShowSchedules: CollectionConfig = {
  slug: 'showSchedules',
  labels: {
    singular: 'Show Schedule',
    plural: 'Show Schedules',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['dayOfWeek', 'startTime', 'endTime', 'dj', 'isActive'],
    group: 'Programming',
    pagination: {
      defaultLimit: 50,
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Generate title from day + time + DJ/Music Mix
        if (data) {
          const day = data.dayOfWeek?.charAt(0).toUpperCase() + data.dayOfWeek?.slice(1) || ''
          const start = data.startTime || ''
          const end = data.endTime || ''

          let djName = 'Unassigned'
          if (data.isMusicMix) {
            djName = 'Music Mix'
          } else if (data.dj) {
            // Fetch DJ name if it's a relationship ID
            if (typeof data.dj === 'number' || typeof data.dj === 'string') {
              try {
                const djDoc = await req.payload.findByID({
                  collection: 'listeners',
                  id: data.dj,
                })
                djName = djDoc.djName || djDoc.firstName || 'DJ'
              } catch (e) {
                // If fetch fails, use placeholder
                djName = 'DJ'
              }
            } else if (data.dj.djName) {
              djName = data.dj.djName
            }
          }

          data.title = `${day} ${start} - ${end} - ${djName}`
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        // Helper function to format time in compact style
        const formatTime = (timeStr: string): string => {
          // Parse "6:00 AM" or "11:00 PM"
          const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
          if (!match) return timeStr

          const hour = parseInt(match[1])
          const minutes = match[2]
          const period = match[3].toUpperCase()

          // Special cases for noon and midnight
          if (hour === 12 && minutes === '00') {
            return period === 'PM' ? '12n' : '12m'
          }

          // Regular times - remove :00, lowercase am/pm
          if (minutes === '00') {
            return `${hour}${period.toLowerCase()}`
          } else {
            return `${hour}:${minutes}${period.toLowerCase()}`
          }
        }

        // Update DJ's showTime field when they're assigned to a schedule
        if (doc.dj && !doc.isMusicMix) {
          try {
            const djId = typeof doc.dj === 'object' ? doc.dj.id : doc.dj

            // Find all schedules for this DJ
            const { docs: djSchedules } = await req.payload.find({
              collection: 'showSchedules',
              where: {
                dj: {
                  equals: djId,
                },
                isActive: {
                  equals: true,
                },
              },
              limit: 100,
            })

            // Build showTime string from all active schedules
            // Format: "Sun 12n - 2pm"
            const showTimes = djSchedules.map((schedule) => {
              const day = schedule.dayOfWeek.charAt(0).toUpperCase() + schedule.dayOfWeek.slice(1).substring(0, 3)
              const startFormatted = formatTime(schedule.startTime)
              const endFormatted = formatTime(schedule.endTime)
              return `${day} ${startFormatted} - ${endFormatted}`
            }).join(', ')

            // Update DJ's showTime field
            await req.payload.update({
              collection: 'listeners',
              id: djId,
              data: {
                showTime: showTimes || null,
              },
            })
          } catch (e) {
            console.error('Error updating DJ showTime:', e)
          }
        }
        return doc
      },
    ],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-generated title for this schedule slot',
      },
    },
    {
      name: 'dayOfWeek',
      type: 'select',
      required: true,
      options: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
      ],
      admin: {
        description: 'Day of the week for this show',
      },
    },
    {
      name: 'startTime',
      type: 'text',
      required: true,
      admin: {
        description: 'Start time (e.g., "6:00 AM", "11:00 PM")',
      },
    },
    {
      name: 'endTime',
      type: 'text',
      required: true,
      admin: {
        description: 'End time (e.g., "9:00 AM", "1:00 AM")',
      },
    },
    {
      name: 'isMusicMix',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this for automated Music Mix slots (no DJ assignment needed)',
        position: 'sidebar',
      },
    },
    {
      name: 'dj',
      label: 'DJ',
      type: 'relationship',
      relationTo: 'listeners',
      required: false,
      admin: {
        description: 'DJ assigned to this time slot (not required for Music Mix)',
        condition: (data) => !data.isMusicMix,
      },
      filterOptions: ({ data }) => {
        // Filter to only show members with DJ roles
        return {
          roles: {
            contains: 'Regular DJ',
          },
        }
      },
    },
    {
      name: 'showName',
      type: 'text',
      admin: {
        description: 'Show name (optional - will use DJ\'s show name if not provided)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this show is currently active',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this show slot',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order in which to display (lower numbers appear first)',
      },
    },
  ],
}
