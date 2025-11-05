import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Migrate Show Schedules time fields from text to date format
 * Converts "6:00 AM" format to ISO date strings for time picker
 */
const migrateScheduleTimes = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Starting Show Schedules time migration...\n')

  try {
    // Fetch all show schedules
    const { docs: schedules } = await payload.find({
      collection: 'showSchedules',
      limit: 1000,
    })

    console.log(`Found ${schedules.length} schedules to migrate\n`)

    let successCount = 0
    let errorCount = 0

    for (const schedule of schedules) {
      try {
        // Convert time string to ISO date
        const convertTimeToISO = (timeStr: string): string => {
          const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
          if (!match) {
            throw new Error(`Invalid time format: ${timeStr}`)
          }

          let hours = parseInt(match[1])
          const minutes = parseInt(match[2])
          const period = match[3].toUpperCase()

          // Convert to 24-hour format
          if (period === 'PM' && hours !== 12) hours += 12
          if (period === 'AM' && hours === 12) hours = 0

          // Create ISO date string (date part is today, but will be ignored by timeOnly picker)
          const date = new Date()
          date.setHours(hours, minutes, 0, 0)
          return date.toISOString()
        }

        const startTimeISO = convertTimeToISO(schedule.startTime as string)
        const endTimeISO = convertTimeToISO(schedule.endTime as string)

        await payload.update({
          collection: 'showSchedules',
          id: schedule.id,
          data: {
            startTime: startTimeISO,
            endTime: endTimeISO,
          },
        })

        console.log(`✓ Migrated schedule ${schedule.id}: ${schedule.title}`)
        successCount++
      } catch (err) {
        console.error(`✗ Error migrating schedule ${schedule.id}:`, err)
        errorCount++
      }
    }

    console.log(`\n✨ Migration completed!`)
    console.log(`   Success: ${successCount}`)
    console.log(`   Errors: ${errorCount}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error during migration:', error)
    process.exit(1)
  }
}

migrateScheduleTimes()
