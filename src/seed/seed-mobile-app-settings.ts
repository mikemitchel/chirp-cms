import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export async function seedMobileAppSettings(payload: Payload, dataDir?: string) {
  console.log('📱 Seeding Mobile App Settings...')

  try {
    let settingsData: any = {}

    // Check if we have exported data
    if (dataDir && fs.existsSync(path.join(dataDir, 'mobile-app-settings.json'))) {
      settingsData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'mobile-app-settings.json'), 'utf-8')
      )

      // Remove system fields
      const { id, createdAt, updatedAt, globalType, ...cleanData } = settingsData

      await payload.updateGlobal({
        slug: 'mobile-app-settings',
        data: cleanData,
      })
    } else {
      // Create default mobile app settings
      await payload.updateGlobal({
        slug: 'mobile-app-settings',
        data: {
          // Listen Page
          listenPageTitle: 'Listen Live',
          listenCurrentPlaylistTitle: 'Current Playlist',
          listenPreviousPlaysButtonText: 'View Previous Plays',
          listenUserCollectionTitle: 'Your Collection',
          listenYourCollectionButtonText: 'View Your Collection',

          // Schedule Page
          schedulePageTitle: 'DJ Schedule',
          scheduleFilterAllText: 'All Shows',
          scheduleViewFullScheduleText: 'View Full Schedule',

          // Explore Page
          explorePageTitle: 'Explore',
          exploreSectionsTitle: 'Browse',

          // Settings
          settingsPageTitle: 'Settings',
        },
      })
    }

    console.log('✓ Mobile App Settings seeded successfully')
  } catch (error) {
    console.error('Error seeding Mobile App Settings:', error)
  }
}
