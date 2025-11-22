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
import { Announcements } from '../src/collections/Announcements.js'
import { Advertisements } from '../src/collections/Advertisements.js'
import { ShopItems } from '../src/collections/ShopItems.js'
import { WeeklyCharts } from '../src/collections/WeeklyCharts.js'
import { VolunteerCalendar } from '../src/collections/VolunteerCalendar.js'
import { Donations } from '../src/collections/Donations.js'
import { Purchases } from '../src/collections/Purchases.js'
import { AgeGate } from '../src/collections/AgeGate.js'
import { Onboarding } from '../src/collections/Onboarding.js'
import { Pages } from '../src/collections/Pages.js'
import { Users } from '../src/collections/Users.js'
import { Members } from '../src/collections/Members.js'
import { ShowSchedules } from '../src/collections/ShowSchedules.js'
import { Articles } from '../src/collections/Articles.js'
import { Events } from '../src/collections/Events.js'
import { Podcasts } from '../src/collections/Podcasts.js'
import { Categories } from '../src/collections/Categories.js'
import { Venues } from '../src/collections/Venues.js'
import { Media } from '../src/collections/Media.js'
import { PlayerFallbackImages } from '../src/collections/PlayerFallbackImages.js'
import { MobilePageContent } from '../src/collections/MobilePageContent.js'
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

// Utility: Clean and prepare data for SQL insert
const prepareDataForSQL = (data: any, excludeFields: string[] = []) => {
  const cleaned: any = {}

  for (const [key, value] of Object.entries(data)) {
    // Skip excluded fields
    if (excludeFields.includes(key) || key === 'id' || key === 'createdAt' || key === 'updatedAt') {
      continue
    }

    // Skip undefined values
    if (value === undefined) {
      continue
    }

    // Convert objects to JSON strings (for JSONB fields)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      cleaned[toSnakeCase(key)] = JSON.stringify(value)
    }
    // Skip arrays (these usually go to separate tables)
    else if (Array.isArray(value)) {
      continue
    }
    // Handle primitives
    else {
      cleaned[toSnakeCase(key)] = value
    }
  }

  return cleaned
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface CollectionConfig {
  slug: string
  table: string
  excludeFields?: string[]
}

const migrateRemainingCollections = async () => {
  console.log('🚀 Migrating Remaining Collections with Direct SQL\n')
  console.log('   Using Payload API to export + Direct SQL to import\n')

  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const postgresUri =
    process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  console.log(`📂 Source: ${sqliteDbPath}`)
  console.log(`📂 Target: ${postgresUri}\n`)

  await wait(2000)

  let sqlitePayload: any
  let pgPool: pg.Pool | null = null

  try {
    // Connect to SQLite
    console.log('📤 Connecting to SQLite...\n')
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

    // Connect to Postgres
    console.log('📥 Connecting to Postgres...\n')
    pgPool = new Pool({ connectionString: postgresUri })
    await pgPool.query('SELECT 1')
    console.log('✅ Postgres connected\n')

    // Collections to migrate
    const collections: CollectionConfig[] = [
      { slug: 'announcements', table: 'announcements', excludeFields: ['blocks'] },
      {
        slug: 'advertisements',
        table: 'advertisements',
        excludeFields: ['blocks', 'image', 'video'],
      },
      {
        slug: 'pages',
        table: 'pages',
        excludeFields: ['blocks', 'sidebarAnnouncement', 'sidebarAdvertisement'],
      },
      {
        slug: 'shopItems',
        table: 'shop_items',
        excludeFields: ['images', 'variants', 'sizes', 'additionalImageUrls'],
      },
      { slug: 'weeklyCharts', table: 'weekly_charts', excludeFields: ['tracks', 'csvFile'] },
      { slug: 'volunteerCalendar', table: 'volunteer_calendar', excludeFields: ['eventDetails'] },
      { slug: 'donations', table: 'donations', excludeFields: ['member'] }, // Note: donations may fail due to member_id being required
      {
        slug: 'purchases',
        table: 'purchases',
        excludeFields: ['items', 'member', 'shippingAddress'],
      },
      { slug: 'ageGate', table: 'age_gate' },
      { slug: 'onboarding', table: 'onboarding', excludeFields: ['order', 'media'] },
    ]

    for (const config of collections) {
      console.log(`📦 Migrating ${config.slug}...`)

      try {
        // Export from SQLite
        const { docs } = await sqlitePayload.find({
          collection: config.slug as any,
          limit: 100000,
          depth: 0,
        })

        if (docs.length === 0) {
          console.log(`   ⚠️  No data\n`)
          continue
        }

        console.log(`   📥 Exported ${docs.length} documents`)

        // Direct SQL import with transaction
        const client = await pgPool.connect()

        try {
          await client.query('BEGIN')
          await client.query(`DELETE FROM ${config.table}`)

          let imported = 0
          let errors = 0

          for (const doc of docs) {
            try {
              const data = prepareDataForSQL(doc, config.excludeFields || [])
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
              if (errors <= 2) {
                console.log(`   ⚠️  Error: ${(err as Error).message.substring(0, 80)}`)
              }
            }
          }

          await client.query('COMMIT')
          console.log(
            `   ✅ ${imported}/${docs.length} imported${errors > 0 ? ` (${errors} errors)` : ''}\n`
          )
        } catch (err) {
          await client.query('ROLLBACK')
          console.log(`   ❌ Transaction failed: ${(err as Error).message.substring(0, 80)}\n`)
        } finally {
          client.release()
        }
      } catch (err) {
        console.log(`   ❌ Error: ${(err as Error).message.substring(0, 80)}\n`)
      }
    }

    console.log('\n✨ Migration Complete!\n')
    console.log('📝 Next Steps:')
    console.log('   1. Access: http://localhost:3000/admin')
    console.log('   2. Verify your migrated data\n')
  } catch (error) {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  } finally {
    if (pgPool) {
      await pgPool.end()
      console.log('🔄 Closed connections\n')
    }
    process.exit(0) // CRITICAL: Ensure script exits
  }
}

migrateRemainingCollections()
