import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export async function seedMobileAppSettings(payload: Payload, dataDir?: string) {
  console.log('📱 Seeding Mobile App Settings...')

  try {
    let settingsData: Record<string, unknown> = {}

    // Check if we have exported data
    if (dataDir && fs.existsSync(path.join(dataDir, 'mobile-app-settings.json'))) {
      settingsData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'mobile-app-settings.json'), 'utf-8')
      )

      // Remove system fields
      const {
        id: _id,
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        globalType: _globalType,
        ...cleanData
      } = settingsData

      await payload.updateGlobal({
        slug: 'mobileAppSettings',
        data: cleanData,
      })
    } else {
      // Create default mobile app settings
      await payload.updateGlobal({
        slug: 'mobileAppSettings',
        data: {
          accountBenefitsTitle: 'Benefits of Creating an Account',
        },
      })
    }

    console.log('✓ Mobile App Settings seeded successfully')
  } catch (error) {
    console.error('Error seeding Mobile App Settings:', error)
  }
}
