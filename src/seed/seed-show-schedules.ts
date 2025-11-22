import type { Payload } from 'payload'

export async function seedShowSchedules(payload: Payload) {
  console.log('📅 Seeding Show Schedules...')

  try {
    // Clear existing schedules
    const { docs: existingSchedules } = await payload.find({
      collection: 'showSchedules',
      limit: 1000,
    })
    for (const schedule of existingSchedules) {
      await payload.delete({ collection: 'showSchedules', id: schedule.id })
    }

    // Get DJs from Members collection to assign to shows
    const { docs: members } = await payload.find({
      collection: 'listeners',
      where: {
        roles: {
          contains: 'Regular DJ',
        },
      },
      limit: 100,
    })

    if (members.length === 0) {
      console.log('  ⚠️  No DJs found in Members collection, creating empty time slots only')
    }

    // Define the actual schedule blocks
    // Weekday blocks (Monday-Friday): 9 blocks per day
    const weekdayBlocks = [
      { start: '12:00 AM', end: '3:00 AM' },
      { start: '3:00 AM', end: '6:00 AM', isMusicMix: true },
      { start: '6:00 AM', end: '9:00 AM' },
      { start: '9:00 AM', end: '12:00 PM' },
      { start: '12:00 PM', end: '3:00 PM' },
      { start: '3:00 PM', end: '6:00 PM' },
      { start: '6:00 PM', end: '8:00 PM' },
      { start: '8:00 PM', end: '10:00 PM' },
      { start: '10:00 PM', end: '12:00 AM' },
    ]

    // Weekend blocks (Saturday-Sunday): 9 blocks per day
    const weekendBlocks = [
      { start: '12:00 AM', end: '3:00 AM' },
      { start: '3:00 AM', end: '6:00 AM', isMusicMix: true },
      { start: '6:00 AM', end: '9:00 AM' },
      { start: '9:00 AM', end: '12:00 PM' },
      { start: '12:00 PM', end: '2:00 PM' },
      { start: '2:00 PM', end: '4:00 PM' },
      { start: '4:00 PM', end: '6:00 PM' },
      { start: '6:00 PM', end: '9:00 PM' },
      { start: '9:00 PM', end: '12:00 AM' },
    ]

    const schedules = []
    let displayOrder = 1
    let djIndex = 0

    // Create schedules for each day
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    for (const day of days) {
      const isWeekend = day === 'saturday' || day === 'sunday'
      const blocks = isWeekend ? weekendBlocks : weekdayBlocks

      for (const block of blocks) {
        const schedule: Record<string, unknown> = {
          dayOfWeek: day,
          startTime: block.start,
          endTime: block.end,
          isActive: true,
          displayOrder: displayOrder++,
        }

        if (block.isMusicMix) {
          // Music Mix slot - automated programming
          schedule.isMusicMix = true
          schedule.showName = 'Music Mix'
          schedule.notes = 'Automated music programming'
          schedule.title = `${day.charAt(0).toUpperCase() + day.slice(1)} ${block.start} - ${block.end} - Music Mix`
          // No DJ assignment needed for Music Mix
        } else {
          // Regular DJ slot - assign a DJ if available
          schedule.isMusicMix = false
          if (members.length > 0) {
            const assignedDJ = members[djIndex % members.length]
            schedule.dj = assignedDJ.id
            const djName = assignedDJ.djName || assignedDJ.firstName || 'DJ'
            schedule.title = `${day.charAt(0).toUpperCase() + day.slice(1)} ${block.start} - ${block.end} - ${djName}`
            djIndex++
          } else {
            schedule.title = `${day.charAt(0).toUpperCase() + day.slice(1)} ${block.start} - ${block.end} - Unassigned`
          }
        }

        schedules.push(schedule)
      }
    }

    // Create all schedules
    let createdCount = 0
    for (const schedule of schedules) {
      // Create if it has a DJ or is a Music Mix slot
      if (schedule.dj || schedule.isMusicMix) {
        await payload.create({
          collection: 'showSchedules',
          data: schedule,
        })
        createdCount++
      }
    }

    console.log(
      `✓ Created ${createdCount} show schedules (${days.length} days × ${weekdayBlocks.length} blocks)`
    )
  } catch (error) {
    console.error('Error seeding show schedules:', error)
  }
}
