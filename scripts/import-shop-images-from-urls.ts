import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import https from 'https'
import http from 'http'
import type { FileData } from 'payload'

dotenv.config()

const downloadImage = (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }

      const chunks: Buffer[] = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    })
  })
}

const importShopImagesFromUrls = async () => {
  const payload = await getPayload({ config })

  console.log('🖼️  Importing shop images from external URLs...\n')

  try {
    // Fetch all shop items
    const shopItems = await payload.find({
      collection: 'shopItems',
      limit: 100,
    })

    for (const item of shopItems.docs) {
      // Skip if already has uploaded images
      if (item.images && item.images.length > 0) {
        console.log(`  ⏭️  ${item.name} already has uploaded images, skipping...`)
        continue
      }

      // Skip if no external image URL
      if (!item.imageUrl) {
        console.log(`  ⚠️  ${item.name} has no imageUrl, skipping...`)
        continue
      }

      console.log(`📥 Downloading image for: ${item.name}`)
      console.log(`   URL: ${item.imageUrl}`)

      try {
        // Download the image
        const imageBuffer = await downloadImage(item.imageUrl)

        // Extract filename from URL
        const urlParts = item.imageUrl.split('/')
        const filename = urlParts[urlParts.length - 1]

        // Determine mime type from filename
        const ext = filename.split('.').pop()?.toLowerCase()
        let mimeType = 'image/jpeg'
        if (ext === 'png') mimeType = 'image/png'
        else if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg'
        else if (ext === 'webp') mimeType = 'image/webp'
        else if (ext === 'gif') mimeType = 'image/gif'

        // Upload to Media collection
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `${item.name} product image`,
          },
          file: {
            data: imageBuffer,
            mimetype: mimeType,
            name: filename,
            size: imageBuffer.length,
          },
        })

        console.log(`   ✓ Uploaded to Media collection (ID: ${mediaDoc.id})`)

        // Update shop item to reference the uploaded media
        await payload.update({
          collection: 'shopItems',
          id: item.id,
          data: {
            images: [
              {
                image: mediaDoc.id,
                alt: `${item.name} product image`,
              },
            ],
          },
        })

        console.log(`   ✓ Linked to shop item\n`)
      } catch (error) {
        console.log(`   ⚠️  Could not import image: ${(error as Error).message}\n`)
      }
    }

    console.log('✨ Shop image import completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error importing shop images:', error)
    process.exit(1)
  }
}

importShopImagesFromUrls()
