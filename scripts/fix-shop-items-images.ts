import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const fixShopItemsImages = async () => {
  const payload = await getPayload({ config })

  console.log('🔧 Fixing shop items images field...')

  try {
    // Get all shop items
    const { docs: shopItems } = await payload.find({
      collection: 'shopItems',
      limit: 1000,
    })

    console.log(`  Found ${shopItems.length} shop items`)

    let fixedCount = 0

    for (const item of shopItems) {
      // Check if images field is missing or undefined
      if (!item.images || !Array.isArray(item.images)) {
        await payload.update({
          collection: 'shopItems',
          id: item.id,
          data: {
            images: [],
          },
        })
        console.log(`  ✓ Fixed: ${item.name}`)
        fixedCount++
      }
    }

    console.log(`\n✨ Fixed ${fixedCount} shop items`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error fixing shop items:', error)
    process.exit(1)
  }
}

fixShopItemsImages()
