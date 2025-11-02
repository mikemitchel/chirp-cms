import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export async function seedPlayerFallbackImages(payload: Payload, dataDir?: string) {
  console.log('🎨 Seeding Player Fallback Images...')

  try {
    // Check if we have exported data
    if (dataDir && fs.existsSync(path.join(dataDir, 'player-fallback-images.json'))) {
      const fallbackImagesData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'player-fallback-images.json'), 'utf-8')
      )

      for (const image of fallbackImagesData['player-fallback-images'] || []) {
        const { id, createdAt, updatedAt, ...imageData } = image

        // Note: For media/upload collections, we can't easily restore the actual files
        // This will restore the metadata, but files would need to be manually uploaded
        // or copied from the media directory
        await payload.create({
          collection: 'player-fallback-images',
          data: imageData,
        })
        console.log(`  ✓ ${image.alt || image.filename}`)
      }

      console.log(`✓ ${fallbackImagesData['player-fallback-images']?.length || 0} Player Fallback Images seeded successfully`)
      console.log('  ⚠️  Note: Media files need to be restored separately from the media/ directory')
    } else {
      console.log('✓ No player fallback images to seed (collection empty)')
    }
  } catch (error) {
    console.error('Error seeding Player Fallback Images:', error)
  }
}
