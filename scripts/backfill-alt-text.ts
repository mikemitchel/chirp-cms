/**
 * Backfill Alt Text Script
 * Generates alt text for existing media files that don't have alt text
 *
 * Usage: npx tsx scripts/backfill-alt-text.ts
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { generateAltText, capitalizeFirstLetter } from '../src/utils/generateAltText'
import fs from 'fs'
import path from 'path'

async function backfillAltText() {
  console.log('🚀 Starting alt text backfill...\n')

  const payload = await getPayload({ config })

  try {
    // Find all media documents without alt text
    const { docs: mediaWithoutAlt } = await payload.find({
      collection: 'media',
      where: {
        or: [
          { alt: { exists: false } },
          { alt: { equals: '' } },
          { alt: { equals: null } },
        ],
      },
      limit: 1000, // Process up to 1000 images
    })

    console.log(`📊 Found ${mediaWithoutAlt.length} media files without alt text\n`)

    if (mediaWithoutAlt.length === 0) {
      console.log('✅ All media files already have alt text!')
      process.exit(0)
    }

    let successCount = 0
    let failureCount = 0

    for (let i = 0; i < mediaWithoutAlt.length; i++) {
      const media = mediaWithoutAlt[i]
      const progress = `[${i + 1}/${mediaWithoutAlt.length}]`

      console.log(`${progress} Processing: ${media.filename}`)

      try {
        // Construct the file path
        const mediaDir = path.join(process.cwd(), 'media')
        const filePath = path.join(mediaDir, media.filename as string)

        if (!fs.existsSync(filePath)) {
          console.log(`  ⚠️  File not found: ${filePath}`)
          failureCount++
          continue
        }

        // Read the file
        const imageBuffer = fs.readFileSync(filePath)

        // Generate alt text
        const generatedAlt = await generateAltText(imageBuffer)

        if (generatedAlt) {
          const altText = capitalizeFirstLetter(generatedAlt)

          // Update the media document
          await payload.update({
            collection: 'media',
            id: media.id,
            data: {
              alt: altText,
            },
          })

          console.log(`  ✅ Generated alt text: "${altText}"`)
          successCount++
        } else {
          console.log(`  ⚠️  Failed to generate alt text`)
          failureCount++
        }

        // Add a small delay to avoid rate limiting (if needed)
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`  ❌ Error processing ${media.filename}:`, error)
        failureCount++
      }

      console.log('') // Empty line for readability
    }

    console.log('\n📊 Backfill Summary:')
    console.log(`  ✅ Successfully generated: ${successCount}`)
    console.log(`  ❌ Failed: ${failureCount}`)
    console.log(`  📈 Total processed: ${mediaWithoutAlt.length}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error running backfill:', error)
    process.exit(1)
  }
}

backfillAltText()
