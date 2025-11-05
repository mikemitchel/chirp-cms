import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Update all existing Show Schedules to populate djDisplay field
 * This script triggers the beforeChange hook for each schedule to generate their djDisplay
 */
async function updateShowScheduleDisplay() {
  try {
    console.log('🔄 Starting show schedule djDisplay update...')

    const payload = await getPayload({ config })

    // Fetch all show schedules
    const schedules = await payload.find({
      collection: 'showSchedules',
      limit: 1000,
      pagination: false,
    })

    console.log(`📊 Found ${schedules.docs.length} show schedules to update`)

    let updated = 0
    let failed = 0

    // Update each schedule to trigger the beforeChange hook
    for (const schedule of schedules.docs) {
      try {
        await payload.update({
          collection: 'showSchedules',
          id: schedule.id,
          data: {
            // Don't change any data, just trigger the hook
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isMusicMix: schedule.isMusicMix,
            dj: schedule.dj || null,
            isActive: schedule.isActive,
          },
        })
        updated++
        console.log(`✅ Updated schedule ${schedule.id}`)
      } catch (error) {
        failed++
        console.error(`❌ Failed to update schedule ${schedule.id}:`, error)
      }
    }

    console.log('\n📈 Update Summary:')
    console.log(`   ✅ Successfully updated: ${updated}`)
    console.log(`   ❌ Failed: ${failed}`)
    console.log(`   📊 Total: ${schedules.docs.length}`)

    console.log('\n✨ Done! Show schedule djDisplay fields have been updated.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating show schedule djDisplay:', error)
    process.exit(1)
  }
}

updateShowScheduleDisplay()
