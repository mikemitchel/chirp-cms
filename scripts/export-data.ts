import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const exportData = async () => {
  const payload = await getPayload({ config })

  console.log('📦 Starting full CMS data export...\n')

  try {
    // Create export directory
    const exportDir = path.resolve(__dirname, '../export')
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const backupDir = path.join(exportDir, `backup-${timestamp}`)
    fs.mkdirSync(backupDir, { recursive: true })

    // Export all collections
    const collections = [
      'users',
      'categories',
      'venues',
      'announcements',
      'advertisements',
      'articles',
      'events',
      'podcasts',
      'djs',
      'listeners',
      'shop-items',
      'weekly-charts',
      'volunteer-calendar',
      'mobile-page-content',
      'pages',
      'age-gate',
      'media',
      'player-fallback-images',
    ]

    for (const collection of collections) {
      try {
        console.log(`📥 Exporting ${collection}...`)
        const { docs } = await payload.find({
          collection: collection as any,
          limit: 10000,
          depth: 0, // Don't populate relationships to keep file manageable
        })

        fs.writeFileSync(
          path.join(backupDir, `${collection}.json`),
          JSON.stringify({ [collection]: docs }, null, 2)
        )
        console.log(`   ✓ Exported ${docs.length} ${collection}`)
      } catch (error) {
        console.log(`   ⚠️  Could not export ${collection}:`, (error as Error).message)
      }
    }

    // Export globals
    const globals = ['site-settings', 'mobile-app-settings']

    console.log('\n📥 Exporting globals...')
    for (const global of globals) {
      try {
        const data = await payload.findGlobal({
          slug: global as any,
          depth: 0,
        })

        fs.writeFileSync(
          path.join(backupDir, `${global}.json`),
          JSON.stringify(data, null, 2)
        )
        console.log(`   ✓ Exported ${global}`)
      } catch (error) {
        console.log(`   ⚠️  Could not export ${global}:`, (error as Error).message)
      }
    }

    // Create a metadata file
    const metadata = {
      exportDate: new Date().toISOString(),
      collections: collections.length,
      globals: globals.length,
      note: 'Full CMS backup - includes all collections and globals',
    }

    fs.writeFileSync(
      path.join(backupDir, '_metadata.json'),
      JSON.stringify(metadata, null, 2)
    )

    console.log('\n✨ Export completed successfully!')
    console.log(`📁 Backup saved to: ${backupDir}`)
    console.log('\n💡 To restore this backup, use: npm run seed:restore')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error exporting data:', error)
    process.exit(1)
  }
}

exportData()
