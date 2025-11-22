import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export async function seedListeners(payload: Payload, dataDir?: string) {
  console.log('👥 Seeding Listeners...')

  try {
    // Check if we have exported data
    if (dataDir && fs.existsSync(path.join(dataDir, 'listeners.json'))) {
      const listenersData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'listeners.json'), 'utf-8')
      )

      for (const listener of listenersData['listeners'] || []) {
        const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...listenerData } = listener
        await payload.create({
          collection: 'listeners',
          data: listenerData,
        })
        console.log(`  ✓ ${listener.email}`)
      }

      console.log(`✓ ${listenersData['listeners']?.length || 0} Listeners seeded successfully`)
    } else {
      console.log('✓ No listeners to seed (collection empty)')
    }
  } catch (error) {
    console.error('Error seeding Listeners:', error)
  }
}
