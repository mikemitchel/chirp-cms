import { getPayload } from 'payload'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import pg from 'pg'

// Import collections
import { Media } from '../src/collections/Media.js'
import { PlayerFallbackImages } from '../src/collections/PlayerFallbackImages.js'
import { Users } from '../src/collections/Users.js'
import { Members } from '../src/collections/Members.js'
import { ShowSchedules } from '../src/collections/ShowSchedules.js'
import { Articles } from '../src/collections/Articles.js'
import { Events } from '../src/collections/Events.js'
import { Podcasts } from '../src/collections/Podcasts.js'
import { ShopItems } from '../src/collections/ShopItems.js'
import { WeeklyCharts } from '../src/collections/WeeklyCharts.js'
import { VolunteerCalendar } from '../src/collections/VolunteerCalendar.js'
import { Categories } from '../src/collections/Categories.js'
import { Venues } from '../src/collections/Venues.js'
import { Announcements } from '../src/collections/Announcements.js'
import { Advertisements } from '../src/collections/Advertisements.js'
import { AgeGate } from '../src/collections/AgeGate.js'
import { Donations } from '../src/collections/Donations.js'
import { Purchases } from '../src/collections/Purchases.js'
import { Pages } from '../src/collections/Pages.js'
import { MobilePageContent } from '../src/collections/MobilePageContent.js'
import { Onboarding } from '../src/collections/Onboarding.js'
import { SiteSettings } from '../src/globals/SiteSettings.js'
import { MobileAppSettings } from '../src/globals/MobileAppSettings.js'
import { VolunteerFormSettings } from '../src/globals/VolunteerFormSettings.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { Pool } = pg

// Utility: Convert camelCase to snake_case
const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Copy files recursively
const copyDirectory = (src: string, dest: string): number => {
  let fileCount = 0

  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true })
      }
      fileCount += copyDirectory(srcPath, destPath)
    } else {
      // Copy file (overwrite if exists)
      fs.copyFileSync(srcPath, destPath)
      fileCount++
    }
  }

  return fileCount
}

const migrateMedia = async () => {
  console.log('🚀 Media Migration\n')
  console.log('   Copying files and migrating database records\n')

  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const sourceMediaPath = path.resolve(__dirname, '../data-backups/media')
  const targetMediaPath = path.resolve(__dirname, '../media')
  const postgresUri =
    process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  if (!fs.existsSync(sourceMediaPath)) {
    console.error(`❌ Source media directory not found at: ${sourceMediaPath}`)
    process.exit(1)
  }

  console.log(`📂 Source DB: ${sqliteDbPath}`)
  console.log(`📂 Source Media: ${sourceMediaPath}`)
  console.log(`📂 Target Media: ${targetMediaPath}`)
  console.log(`📂 Target DB: ${postgresUri}\n`)

  await wait(2000)

  let sqlitePayload: any
  let pgPool: pg.Pool | null = null
  let filesCopied = 0
  let recordsImported = 0

  try {
    // ==========================================
    // STEP 1: Copy Media Files
    // ==========================================
    console.log('📁 STEP 1: Copying media files...\n')

    try {
      filesCopied = copyDirectory(sourceMediaPath, targetMediaPath)
      console.log(`✅ Copied ${filesCopied} media files\n`)
    } catch (error) {
      console.error(`❌ Error copying media files: ${(error as Error).message}\n`)
      throw error
    }

    // ==========================================
    // STEP 2: Connect to Databases
    // ==========================================
    console.log('📤 STEP 2: Connecting to SQLite...\n')

    const sqliteConfig = buildConfig({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here-change-in-production',
      collections: [
        Users,
        Members,
        ShowSchedules,
        Articles,
        Events,
        Podcasts,
        ShopItems,
        WeeklyCharts,
        VolunteerCalendar,
        Categories,
        Venues,
        Announcements,
        Advertisements,
        AgeGate,
        Media,
        PlayerFallbackImages,
        Donations,
        Purchases,
        Pages,
        MobilePageContent,
        Onboarding,
      ],
      globals: [MobileAppSettings, VolunteerFormSettings, SiteSettings],
      db: sqliteAdapter({
        client: { url: `file:${sqliteDbPath}` },
        push: false,
      }),
      typescript: { outputFile: path.resolve(__dirname, '../payload-types.ts') },
      editor: lexicalEditor({}),
      sharp,
    })

    sqlitePayload = await getPayload({ config: sqliteConfig })
    console.log('✅ SQLite connected\n')

    console.log('📥 Connecting to Postgres...\n')
    pgPool = new Pool({ connectionString: postgresUri })
    await pgPool.query('SELECT 1')
    console.log('✅ Postgres connected\n')

    // ==========================================
    // STEP 3: Migrate Media Collection Records
    // ==========================================
    console.log('📦 STEP 3: Migrating Media collection records...\n')

    const mediaCollections = [
      { slug: 'media', table: 'media', excludeFields: ['sizes'] },
      { slug: 'player-fallback-images', table: 'player_fallback_images', excludeFields: ['sizes'] },
    ]

    for (const config of mediaCollections) {
      console.log(`   📥 Processing ${config.slug}...`)

      try {
        // Export from SQLite
        const { docs } = await sqlitePayload.find({
          collection: config.slug as any,
          limit: 100000,
          depth: 0,
        })

        if (docs.length === 0) {
          console.log(`      ⚠️  No records found\n`)
          continue
        }

        console.log(`      ✓ Exported ${docs.length} records`)

        // Direct SQL import with transaction
        const client = await pgPool.connect()

        try {
          await client.query('BEGIN')
          await client.query(`DELETE FROM ${config.table}`)

          let imported = 0
          let errors = 0

          for (const doc of docs) {
            try {
              // Prepare data: exclude internal fields and complex fields
              const data: any = {}
              for (const [key, value] of Object.entries(doc)) {
                // Skip these fields
                if (
                  [
                    'id',
                    'createdAt',
                    'updatedAt',
                    'sizes',
                    ...(config.excludeFields || []),
                  ].includes(key)
                ) {
                  continue
                }
                if (value === undefined) continue

                // Convert to snake_case and handle types
                const snakeKey = toSnakeCase(key)

                // Handle objects (convert to JSON)
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                  data[snakeKey] = JSON.stringify(value)
                }
                // Skip arrays
                else if (Array.isArray(value)) {
                  continue
                }
                // Handle primitives
                else {
                  data[snakeKey] = value
                }
              }

              const columns = Object.keys(data)
              const values = Object.values(data)
              const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')

              if (columns.length > 0) {
                await client.query(
                  `INSERT INTO ${config.table} (${columns.join(', ')}) VALUES (${placeholders})`,
                  values
                )
                imported++
              }
            } catch (err) {
              errors++
              if (errors <= 3) {
                console.log(`      ⚠️  Error: ${(err as Error).message.substring(0, 100)}`)
              }
            }
          }

          await client.query('COMMIT')
          console.log(
            `      ✅ ${imported}/${docs.length} records imported${errors > 0 ? ` (${errors} errors)` : ''}\n`
          )
          recordsImported += imported
        } catch (err) {
          await client.query('ROLLBACK')
          console.log(`      ❌ Transaction failed: ${(err as Error).message.substring(0, 100)}\n`)
        } finally {
          client.release()
        }
      } catch (err) {
        console.log(`      ❌ Error: ${(err as Error).message.substring(0, 100)}\n`)
      }
    }

    // ==========================================
    // SUMMARY
    // ==========================================
    console.log('\n' + '='.repeat(70))
    console.log('✨ Media Migration Complete!')
    console.log('='.repeat(70))
    console.log(`\n📊 Summary:`)
    console.log(`   Files copied:        ${filesCopied}`)
    console.log(`   Records migrated:    ${recordsImported}`)
    console.log()

    console.log('📝 Next Steps:')
    console.log('   1. 🌐 Access admin panel: http://localhost:3000/admin')
    console.log('   2. 🖼️  Navigate to Media collection to verify files')
    console.log('   3. ✓  Check that images display correctly\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  } finally {
    if (pgPool) {
      await pgPool.end()
      console.log('🔄 Closed connections\n')
    }
    process.exit(0) // Ensure script exits
  }
}

migrateMedia()
