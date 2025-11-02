import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const exportShopItems = async () => {
  const payload = await getPayload({ config })

  console.log('📤 Exporting shop items to seed data...')

  try {
    // Get all shop items
    const { docs: shopItems } = await payload.find({
      collection: 'shopItems',
      limit: 1000,
      sort: '-createdAt',
    })

    console.log(`  Found ${shopItems.length} shop items`)

    // Transform to seed format
    const seedData = {
      shopItems: shopItems.map((item) => {
        // Use imageUrl field (original URL) instead of Media collection URLs
        // additionalImageUrls are stored in the CMS but we'll skip exporting them
        // since they should be managed via the Media collection

        return {
          id: `item-${String(item.id).padStart(3, '0')}`,
          name: item.name,
          price: item.price,
          image: item.imageUrl || '',
          itemType: item.itemType,
          category: item.category,
          description: item.description,
          details: (item as any).details || `${item.name} from CHIRP Radio's official store.`,
          sizes: (item.sizes as Array<{ size: string }>)?.map((s) => s.size) || [],
          inStock: item.inStock,
        }
      }),
    }

    // Write to file
    const outputPath = path.resolve(__dirname, '../../chirp-radio/src/data/shopItems.json')
    fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2))

    console.log(`\n✨ Exported ${seedData.shopItems.length} shop items to ${outputPath}`)

    // Show items with multiple images
    const multiImageItems = seedData.shopItems.filter((item: any) => item.additionalImages)
    if (multiImageItems.length > 0) {
      console.log(`\n📸 Items with multiple images:`)
      multiImageItems.forEach((item: any) => {
        console.log(`  - ${item.name}: ${(item.additionalImages?.length || 0) + 1} images`)
      })
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error exporting shop items:', error)
    process.exit(1)
  }
}

exportShopItems()
