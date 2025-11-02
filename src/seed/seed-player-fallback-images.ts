import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function seedPlayerFallbackImages(payload: Payload) {
  console.log('🎨 Seeding Player Fallback Images...')

  try {
    // Path to the seed data
    const seedDataPath = path.resolve(__dirname, 'player-fallback-images.json')

    if (!fs.existsSync(seedDataPath)) {
      console.log('✓ No player fallback images to seed (file not found)')
      return
    }

    const fallbackImagesData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

    for (const image of fallbackImagesData['player-fallback-images'] || []) {
      // Check if file exists in media directory
      const mediaFilePath = path.resolve(__dirname, '../../media', image.filename)
      if (!fs.existsSync(mediaFilePath)) {
        console.log(`  ⚠️  File not found: ${image.filename}, skipping...`)
        continue
      }

      try {
        // Read the file and create a File-like object
        const fileBuffer = fs.readFileSync(mediaFilePath)

        // Upload the file through Payload's API
        await payload.create({
          collection: 'player-fallback-images',
          data: {
            alt: image.alt || '',
            isActive: image.isActive || false,
          },
          file: {
            data: fileBuffer,
            mimetype: image.mimeType,
            name: image.filename,
            size: image.filesize,
          },
          draft: false,
        })
        console.log(`  ✓ ${image.filename}`)
      } catch (error) {
        console.log(`  ⚠️  Could not restore ${image.filename}:`, (error as Error).message)
      }
    }

    console.log(`✓ Player Fallback Images seeded successfully`)
  } catch (error) {
    console.error('Error seeding Player Fallback Images:', error)
  }
}
