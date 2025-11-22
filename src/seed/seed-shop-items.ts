import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export async function seedShopItems(payload: Payload, dataDir?: string) {
  console.log('🛍️  Seeding Shop Items...')

  try {
    // Check if we have exported data
    if (dataDir && fs.existsSync(path.join(dataDir, 'shop-items.json'))) {
      const shopItemsData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'shop-items.json'), 'utf-8')
      )

      for (const item of shopItemsData['shop-items'] || []) {
        const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...itemData } = item
        await payload.create({
          collection: 'shopItems',
          data: itemData,
        })
        console.log(`  ✓ ${item.name}`)
      }

      console.log(`✓ ${shopItemsData['shop-items']?.length || 0} Shop Items seeded successfully`)
    } else {
      console.log('✓ No shop items to seed (collection empty)')
    }
  } catch (error) {
    console.error('Error seeding Shop Items:', error)
  }
}
