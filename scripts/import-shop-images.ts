import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import https from 'https'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Download image from URL
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}) // Delete the file on error
      reject(err)
    })
  })
}

// Normalize filename to lowercase extension
function normalizeFilename(filename: string): string {
  const ext = path.extname(filename)
  const base = path.basename(filename, ext)
  return base + ext.toLowerCase()
}

const importShopImages = async () => {
  const payload = await getPayload({ config })

  console.log('📥 Importing shop item images to Media collection...')

  try {
    // Read shop items
    const dataPath = path.resolve(__dirname, '../../chirp-radio/src/data/shopItems.json')
    const shopData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

    // Create temp directory for downloads
    const tempDir = path.resolve(__dirname, '../temp-images')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const imageMap = new Map<string, number | string>() // URL/filename -> Media ID

    // Get existing media to avoid duplicates
    const { docs: existingMedia } = await payload.find({
      collection: 'media',
      limit: 1000,
    })
    console.log(`  Found ${existingMedia.length} existing media entries`)

    // Download and upload each unique image from URLs
    for (const item of shopData.shopItems) {
      if (item.image && !imageMap.has(item.image)) {
        try {
          const url = item.image
          const originalFilename = path.basename(url)
          const normalizedFilename = normalizeFilename(originalFilename)

          // Check if already exists
          const existing = existingMedia.find(m =>
            m.filename === normalizedFilename ||
            m.filename === originalFilename ||
            m.alt?.includes(item.name)
          )

          if (existing) {
            console.log(`  ⏭️  Already exists: ${normalizedFilename} (ID: ${existing.id})`)
            imageMap.set(url, existing.id)
            continue
          }

          const filepath = path.join(tempDir, normalizedFilename)

          console.log(`  📥 Downloading: ${originalFilename}`)
          await downloadImage(url, filepath)

          console.log(`  📤 Uploading to Media collection: ${normalizedFilename}`)

          // Read the file
          const fileBuffer = fs.readFileSync(filepath)

          // Determine mimetype
          const lowerFilename = normalizedFilename.toLowerCase()
          let mimetype = 'image/jpeg'
          if (lowerFilename.endsWith('.png')) {
            mimetype = 'image/png'
          } else if (lowerFilename.endsWith('.gif')) {
            mimetype = 'image/gif'
          }

          // Create media entry
          const media = await payload.create({
            collection: 'media',
            data: {
              alt: `${item.name} - CHIRP Radio Store`,
              category: 'Shop Items',
            },
            file: {
              data: fileBuffer,
              mimetype,
              name: normalizedFilename,
              size: fileBuffer.length,
            },
            draft: false,
          })

          imageMap.set(url, media.id)
          console.log(`  ✓ Uploaded: ${normalizedFilename} (ID: ${media.id})`)

          // Clean up temp file
          fs.unlinkSync(filepath)
        } catch (error) {
          console.error(`  ❌ Failed to import image for ${item.name}:`, (error as Error).message)
        }
      }
    }

    // Import local images from Desktop/Store
    console.log('\n📂 Importing local images from Desktop/Store...')
    const desktopStorePath = '/Users/ryanwilson/Desktop/Store'

    if (fs.existsSync(desktopStorePath)) {
      const localFiles = fs.readdirSync(desktopStorePath).filter(f =>
        f.toLowerCase().endsWith('.jpg') ||
        f.toLowerCase().endsWith('.jpeg') ||
        f.toLowerCase().endsWith('.png') ||
        f.toLowerCase().endsWith('.gif')
      )

      for (const originalFilename of localFiles) {
        try {
          const normalizedFilename = normalizeFilename(originalFilename)

          // Check if already exists
          const existing = existingMedia.find(m =>
            m.filename === normalizedFilename ||
            m.filename === originalFilename
          )

          if (existing) {
            console.log(`  ⏭️  Already exists: ${normalizedFilename} (ID: ${existing.id})`)
            imageMap.set(normalizedFilename, existing.id)
            continue
          }

          console.log(`  📤 Uploading: ${normalizedFilename}`)

          const filepath = path.join(desktopStorePath, originalFilename)
          const fileBuffer = fs.readFileSync(filepath)

          // Determine mimetype
          const lowerFilename = normalizedFilename.toLowerCase()
          let mimetype = 'image/jpeg'
          if (lowerFilename.endsWith('.png')) {
            mimetype = 'image/png'
          } else if (lowerFilename.endsWith('.gif')) {
            mimetype = 'image/gif'
          }

          // Create media entry
          const media = await payload.create({
            collection: 'media',
            data: {
              alt: `CHIRP Radio Store - ${path.basename(normalizedFilename, path.extname(normalizedFilename))}`,
              category: 'Shop Items',
            },
            file: {
              data: fileBuffer,
              mimetype,
              name: normalizedFilename,
              size: fileBuffer.length,
            },
            draft: false,
          })

          imageMap.set(normalizedFilename, media.id)
          console.log(`  ✓ Uploaded: ${normalizedFilename} (ID: ${media.id})`)
        } catch (error) {
          console.error(`  ❌ Failed to import ${originalFilename}:`, (error as Error).message)
        }
      }
    } else {
      console.log(`  ⚠️  Desktop/Store directory not found`)
    }

    console.log('\n📝 Updating shop items with media references...')

    // Update shop items to reference media
    const { docs: shopItems } = await payload.find({
      collection: 'shopItems',
      limit: 1000,
    })

    for (const shopItem of shopItems) {
      const originalData = shopData.shopItems.find((item: any) => item.name === shopItem.name)
      if (originalData && originalData.image) {
        const mediaId = imageMap.get(originalData.image)
        if (mediaId) {
          // Check if already in images array
          const hasImage = shopItem.images?.some((img: any) => img.image === mediaId)
          if (!hasImage) {
            try {
              await payload.update({
                collection: 'shopItems',
                id: shopItem.id,
                data: {
                  images: [
                    {
                      image: typeof mediaId === 'number' ? mediaId : undefined,
                      alt: originalData.name,
                    },
                  ],
                },
              })
              console.log(`  ✓ Updated: ${shopItem.name}`)
            } catch (error) {
              console.error(`  ⚠️  Failed to update ${shopItem.name}:`, (error as Error).message)
            }
          } else {
            console.log(`  ⏭️  Already linked: ${shopItem.name}`)
          }
        }
      }
    }

    // Clean up temp directory
    fs.rmdirSync(tempDir, { recursive: true })

    console.log('\n✨ Shop item images imported successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error importing images:', error)
    process.exit(1)
  }
}

importShopImages()
