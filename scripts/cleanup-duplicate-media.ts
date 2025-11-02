import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const cleanupDuplicateMedia = async () => {
  const payload = await getPayload({ config })

  console.log('🧹 Cleaning up duplicate media entries...')

  try {
    // Get all media entries
    const { docs: allMedia } = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    console.log(`  Found ${allMedia.length} total media entries`)

    // Get all shop items to check which media are referenced
    const { docs: shopItems } = await payload.find({
      collection: 'shopItems',
      limit: 1000,
    })

    // Build set of referenced media IDs
    const referencedMediaIds = new Set<number>()
    shopItems.forEach(item => {
      item.images?.forEach((img: any) => {
        if (typeof img.image === 'number') {
          referencedMediaIds.add(img.image)
        } else if (img.image?.id) {
          referencedMediaIds.add(img.image.id)
        }
      })
    })

    console.log(`  Found ${referencedMediaIds.size} media entries in use by shop items`)

    // Find duplicates with -# suffix
    const duplicates = allMedia.filter(m => /-\d+\.\w+$/.test(m.filename || ''))

    console.log(`  Found ${duplicates.length} duplicate entries`)

    // Delete only unreferenced duplicates
    let deletedCount = 0
    let skippedCount = 0

    for (const media of duplicates) {
      const mediaId = typeof media.id === 'string' ? parseInt(media.id) : media.id
      if (referencedMediaIds.has(mediaId)) {
        console.log(`  ⏭️  Skipped (in use): ${media.filename} (ID: ${media.id})`)
        skippedCount++
      } else {
        try {
          await payload.delete({
            collection: 'media',
            id: media.id,
          })
          console.log(`  ✓ Deleted: ${media.filename} (ID: ${media.id})`)
          deletedCount++
        } catch (error) {
          console.error(`  ⚠️  Failed to delete ${media.filename}:`, (error as Error).message)
        }
      }
    }

    console.log(`\n✨ Cleanup completed! Deleted ${deletedCount}, skipped ${skippedCount} (in use)`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error cleaning up duplicates:', error)
    process.exit(1)
  }
}

cleanupDuplicateMedia()
