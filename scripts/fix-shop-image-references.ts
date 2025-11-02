import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const fixShopImageReferences = async () => {
  const payload = await getPayload({ config })

  console.log('🔧 Fixing shop item image references...')

  try {
    // Get all media entries
    const { docs: allMedia } = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    // Build mapping from duplicate filenames to original IDs
    const duplicateToOriginal = new Map<number, number>()

    allMedia.forEach(media => {
      // Check if this is a duplicate (has -# suffix)
      const match = media.filename?.match(/^(.+)-(\d+)(\.\w+)$/)
      if (match) {
        const originalFilename = match[1] + match[3]
        // Find the original
        const original = allMedia.find(m => m.filename === originalFilename)
        if (original) {
          const mediaId = typeof media.id === 'string' ? parseInt(media.id) : media.id
          const originalId = typeof original.id === 'string' ? parseInt(original.id) : original.id
          duplicateToOriginal.set(mediaId, originalId)
          console.log(`  📍 Mapped duplicate ${media.filename} (ID: ${mediaId}) -> ${original.filename} (ID: ${originalId})`)
        }
      }
    })

    console.log(`\n  Found ${duplicateToOriginal.size} duplicate -> original mappings`)

    // Get all shop items
    const { docs: shopItems } = await payload.find({
      collection: 'shopItems',
      limit: 1000,
    })

    console.log(`\n🛍️  Checking ${shopItems.length} shop items...\n`)

    let updatedCount = 0

    // Update shop items that reference duplicates
    for (const shopItem of shopItems) {
      let needsUpdate = false
      const updatedImages: any[] = []

      shopItem.images?.forEach((img: any) => {
        const imageId = typeof img.image === 'number' ? img.image : img.image?.id
        const originalId = duplicateToOriginal.get(imageId)

        if (originalId) {
          needsUpdate = true
          updatedImages.push({
            ...img,
            image: originalId,
          })
          console.log(`  🔄 ${shopItem.name}: Using original image (ID: ${originalId}) instead of duplicate (ID: ${imageId})`)
        } else {
          updatedImages.push(img)
        }
      })

      if (needsUpdate) {
        await payload.update({
          collection: 'shopItems',
          id: shopItem.id,
          data: {
            images: updatedImages,
          },
        })
        console.log(`  ✓ Updated: ${shopItem.name}`)
        updatedCount++
      }
    }

    console.log(`\n✨ Fixed ${updatedCount} shop items to use original images`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error fixing references:', error)
    process.exit(1)
  }
}

fixShopImageReferences()
