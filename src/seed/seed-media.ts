import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function seedMedia(payload: Payload) {
  console.log('🖼️  Seeding Media...')

  try {
    // Path to the seed data
    const seedDataPath = path.resolve(__dirname, 'media.json')

    if (!fs.existsSync(seedDataPath)) {
      console.log('✓ No media to seed (file not found)')
      return
    }

    const mediaData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

    for (const mediaItem of mediaData.media || []) {
      // Check if media file exists in media directory
      const mediaFilePath = path.resolve(__dirname, '../../media', mediaItem.filename)
      if (!fs.existsSync(mediaFilePath)) {
        console.log(`  ⚠️  File not found: ${mediaItem.filename}, skipping...`)
        continue
      }

      try {
        // Read the file and create a File-like object
        const fileBuffer = fs.readFileSync(mediaFilePath)

        // Upload the file through Payload's API
        await payload.create({
          collection: 'media',
          data: {
            alt: mediaItem.alt || '',
            category: 'General',
          },
          file: {
            data: fileBuffer,
            mimetype: mediaItem.mimeType,
            name: mediaItem.filename,
            size: mediaItem.filesize,
          },
          draft: false,
        })
        console.log(`  ✓ ${mediaItem.filename}`)
      } catch (error) {
        console.log(`  ⚠️  Could not restore ${mediaItem.filename}:`, (error as Error).message)
      }
    }

    console.log(`✓ Media seeded successfully`)
  } catch (error) {
    console.error('Error seeding Media:', error)
  }
}
