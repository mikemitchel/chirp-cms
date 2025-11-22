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

// Import all collections for SQLite connection
import { Articles } from '../src/collections/Articles.js'
import { Events } from '../src/collections/Events.js'
import { VolunteerCalendar } from '../src/collections/VolunteerCalendar.js'
import { WeeklyCharts } from '../src/collections/WeeklyCharts.js'
import { Media } from '../src/collections/Media.js'
import { PlayerFallbackImages } from '../src/collections/PlayerFallbackImages.js'
import { Venues } from '../src/collections/Venues.js'
import { Pages } from '../src/collections/Pages.js'
import { Podcasts } from '../src/collections/Podcasts.js'
import { Announcements } from '../src/collections/Announcements.js'
import { Advertisements } from '../src/collections/Advertisements.js'
import { ShopItems } from '../src/collections/ShopItems.js'
import { ShowSchedules } from '../src/collections/ShowSchedules.js'
import { Users } from '../src/collections/Users.js'
import { AgeGate } from '../src/collections/AgeGate.js'
import { Members } from '../src/collections/Members.js'
import { Donations } from '../src/collections/Donations.js'
import { Purchases } from '../src/collections/Purchases.js'
import { Categories } from '../src/collections/Categories.js'
import { MobilePageContent } from '../src/collections/MobilePageContent.js'
import { Onboarding } from '../src/collections/Onboarding.js'

// Import all globals
import { SiteSettings } from '../src/globals/SiteSettings.js'
import { MobileAppSettings } from '../src/globals/MobileAppSettings.js'
import { VolunteerFormSettings } from '../src/globals/VolunteerFormSettings.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { Pool } = pg

const SIMPLE_COLLECTIONS = [
  'categories',
  'venues',
  'announcements',
  'advertisements',
  'ageGate',
  'onboarding',
]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const migrateDirectSQL = async () => {
  console.log('🚀 Direct SQL Migration from SQLite to PostgreSQL...\n')

  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const postgresUri =
    process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  console.log(`📂 Source: ${sqliteDbPath}`)
  console.log(`📂 Target: ${postgresUri}\n`)
  console.log('⚠️  This will use direct SQL inserts to bypass Payload transaction issues\n')

  await wait(3000)

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
      typescript: {
        outputFile: path.resolve(__dirname, '../payload-types.ts'),
      },
      editor: lexicalEditor({}),
      sharp,
    })

    sqlitePayload = await getPayload({ config: sqliteConfig })
    console.log('✅ Connected to SQLite\n')

    // Connect to Postgres using direct connection
    console.log('📥 Connecting to Postgres with direct SQL...\n')

    pgPool = new Pool({
      connectionString: postgresUri,
    })

    await pgPool.query('SELECT 1')
    console.log('✅ Connected to Postgres\n')

    // Migrate simple collections
    console.log('📦 Migrating collections with direct SQL...\n')

    for (const collectionSlug of SIMPLE_COLLECTIONS) {
      try {
        console.log(`  📥 Processing ${collectionSlug}...`)

        // Export from SQLite using Payload
        const { docs } = await sqlitePayload.find({
          collection: collectionSlug as any,
          limit: 100000,
          depth: 0,
        })

        if (docs.length === 0) {
          console.log(`     ⚠️  No documents found\n`)
          continue
        }

        console.log(`     ✓ Exported ${docs.length} documents`)

        // Delete existing data in Postgres
        await pgPool.query(`DELETE FROM ${collectionSlug}`)
        console.log(`     🗑️  Cleared existing data`)

        // Insert using direct SQL with explicit transaction
        const client = await pgPool.connect()

        try {
          await client.query('BEGIN')

          let insertedCount = 0
          for (const doc of docs) {
            try {
              const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc

              // Simple insert for name-only collections
              if (collectionSlug === 'categories' || collectionSlug === 'venues') {
                await client.query(`INSERT INTO ${collectionSlug} (name) VALUES ($1)`, [data.name])
                insertedCount++
              } else {
                // For other collections, insert the whole JSON as-is
                const columns = Object.keys(data).filter(
                  (k) => typeof data[k] !== 'object' || data[k] === null
                )
                const values = columns.map((k) => data[k])
                const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')

                await client.query(
                  `INSERT INTO ${collectionSlug} (${columns.join(', ')}) VALUES (${placeholders})`,
                  values
                )
                insertedCount++
              }
            } catch (insertError) {
              console.log(
                `     ⚠️  Error inserting document: ${(insertError as Error).message.substring(0, 80)}`
              )
            }
          }

          await client.query('COMMIT')
          console.log(`     ✅ Inserted ${insertedCount}/${docs.length} documents`)
          console.log()
        } catch (error) {
          await client.query('ROLLBACK')
          throw error
        } finally {
          client.release()
        }
      } catch (error) {
        console.error(`     ❌ Error: ${(error as Error).message}\n`)
      }
    }

    // Verify the data
    console.log('\n🔍 Verifying data in database...\n')

    for (const collectionSlug of SIMPLE_COLLECTIONS) {
      const result = await pgPool.query(`SELECT COUNT(*) FROM ${collectionSlug}`)
      const count = parseInt(result.rows[0].count)
      console.log(`  ${count > 0 ? '✅' : '⚠️'}  ${collectionSlug}: ${count} documents`)
    }

    console.log('\n✨ Migration completed!\n')
    console.log('📝 Next Steps:')
    console.log('   1. Access admin panel: http://localhost:3000/admin')
    console.log('   2. Verify the migrated data')
    console.log('   3. Run the full migration for complex collections if needed\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  } finally {
    if (pgPool) {
      await pgPool.end()
      console.log('🔄 Closed database connections')
    }
  }
}

migrateDirectSQL()
