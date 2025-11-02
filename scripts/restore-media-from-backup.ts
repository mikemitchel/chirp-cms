import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const restoreMediaFromBackup = async () => {
  const payload = await getPayload({ config })

  console.log('📦 Restoring Media and Player Fallback Images from backup...\n')

  try {
    // Path to the Oct 31 backup that has the media records
    const backupDir = path.resolve(__dirname, '../export/backup-2025-10-31T15-03-47')

    if (!fs.existsSync(backupDir)) {
      console.error('❌ Backup directory not found:', backupDir)
      process.exit(1)
    }

    // Restore Media collection
    console.log('📥 Restoring Media collection...')
    const mediaBackupPath = path.join(backupDir, 'media.json')
    if (fs.existsSync(mediaBackupPath)) {
      const mediaBackup = JSON.parse(fs.readFileSync(mediaBackupPath, 'utf-8'))

      for (const mediaItem of mediaBackup.media) {
        // Check if media file still exists
        const mediaFilePath = path.resolve(__dirname, '../media', mediaItem.filename)
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
          console.log(`  ✓ Restored: ${mediaItem.filename}`)
        } catch (error) {
          console.log(`  ⚠️  Could not restore ${mediaItem.filename}:`, (error as Error).message)
        }
      }
      console.log(`✓ Media collection restored\n`)
    } else {
      console.log('  ⚠️  No media backup found\n')
    }

    // Restore Player Fallback Images collection
    console.log('📥 Restoring Player Fallback Images collection...')
    const fallbackBackupPath = path.join(backupDir, 'player-fallback-images.json')
    if (fs.existsSync(fallbackBackupPath)) {
      const fallbackBackup = JSON.parse(fs.readFileSync(fallbackBackupPath, 'utf-8'))

      for (const fallbackItem of fallbackBackup['player-fallback-images']) {
        // Check if fallback image file still exists
        const fallbackFilePath = path.resolve(__dirname, '../media', fallbackItem.filename)
        if (!fs.existsSync(fallbackFilePath)) {
          console.log(`  ⚠️  File not found: ${fallbackItem.filename}, skipping...`)
          continue
        }

        try {
          // Read the file and create a File-like object
          const fileBuffer = fs.readFileSync(fallbackFilePath)

          // Upload the file through Payload's API
          await payload.create({
            collection: 'player-fallback-images',
            data: {
              alt: fallbackItem.alt || '',
              isActive: fallbackItem.isActive,
            },
            file: {
              data: fileBuffer,
              mimetype: fallbackItem.mimeType,
              name: fallbackItem.filename,
              size: fallbackItem.filesize,
            },
            draft: false,
          })
          console.log(`  ✓ Restored: ${fallbackItem.filename}`)
        } catch (error) {
          console.log(`  ⚠️  Could not restore ${fallbackItem.filename}:`, (error as Error).message)
        }
      }
      console.log(`✓ Player Fallback Images collection restored\n`)
    } else {
      console.log('  ⚠️  No player fallback images backup found\n')
    }

    console.log('✨ Media restoration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error restoring media:', error)
    process.exit(1)
  }
}

restoreMediaFromBackup()
