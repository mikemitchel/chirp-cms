import dotenv from 'dotenv'
// Load environment variables FIRST before importing config
dotenv.config()

import { getPayload } from 'payload'
import config from '../payload.config.js'
import { seedOnboardingSteps } from '../src/seed/seed-onboarding.js'

const runOnboardingSeed = async () => {
  console.log('🌱 Seeding onboarding steps...')

  try {
    const payload = await getPayload({ config })

    // Clear existing onboarding steps
    const { docs: existing } = await payload.find({
      collection: 'onboarding',
      limit: 1000,
    })

    if (existing.length > 0) {
      console.log(`🗑️  Clearing ${existing.length} existing onboarding steps...`)
      for (const step of existing) {
        await payload.delete({
          collection: 'onboarding',
          id: step.id,
        })
      }
    }

    // Seed new onboarding steps
    await seedOnboardingSteps(payload)

    console.log('✅ Onboarding steps seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding onboarding steps:', error)
    process.exit(1)
  }
}

runOnboardingSeed()
