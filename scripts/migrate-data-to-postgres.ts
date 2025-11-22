import { getPayload } from 'payload'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import all collections
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

// Collection names to migrate
const COLLECTIONS = [
  'users',
  'categories',
  'venues',
  'announcements',
  'advertisements',
  'articles',
  'events',
  'podcasts',
  'listeners', // Members collection
  'shopItems',
  'weeklyCharts',
  'volunteerCalendar',
  'mobilePageContent',
  'showSchedules',
  'pages',
  'ageGate',
  'donations',
  'purchases',
  'onboarding',
  'media',
  'player-fallback-images',
  'redirects',
]

// Global names to migrate
const GLOBALS = ['siteSettings', 'mobileAppSettings', 'volunteerFormSettings']

interface MigrationStats {
  collection: string
  exported: number
  imported: number
  errors: number
}

const migrateData = async () => {
  console.log('🚀 Starting data migration from SQLite to PostgreSQL...\n')

  // Paths
  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const postgresUri =
    process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

  // Verify SQLite database exists
  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  console.log(`📂 Source: ${sqliteDbPath}`)
  console.log(`📂 Target: ${postgresUri}\n`)

  const stats: MigrationStats[] = []
  let totalExported = 0
  let totalImported = 0
  let totalErrors = 0

  try {
    // ==========================================
    // STEP 1: Initialize SQLite connection
    // ==========================================
    console.log('📤 STEP 1: Connecting to SQLite database...\n')

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
        client: {
          url: `file:${sqliteDbPath}`,
        },
        push: false, // Don't modify the SQLite schema
      }),
      typescript: {
        outputFile: path.resolve(__dirname, '../payload-types.ts'),
      },
      editor: lexicalEditor({}),
      sharp,
    })

    const sqlitePayload = await getPayload({ config: sqliteConfig })
    console.log('✅ Connected to SQLite database\n')

    // ==========================================
    // STEP 2: Initialize PostgreSQL connection
    // ==========================================
    console.log('📥 STEP 2: Connecting to PostgreSQL database...\n')

    const postgresConfig = buildConfig({
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
      db: postgresAdapter({
        pool: {
          connectionString: postgresUri,
        },
        push: false, // Schema already exists
      }),
      typescript: {
        outputFile: path.resolve(__dirname, '../payload-types.ts'),
      },
      editor: lexicalEditor({}),
      sharp,
    })

    const postgresPayload = await getPayload({ config: postgresConfig })
    console.log('✅ Connected to PostgreSQL database\n')

    // ==========================================
    // STEP 3: Migrate Collections
    // ==========================================
    console.log('📦 STEP 3: Migrating collections...\n')

    for (const collectionSlug of COLLECTIONS) {
      const collectionStats: MigrationStats = {
        collection: collectionSlug,
        exported: 0,
        imported: 0,
        errors: 0,
      }

      try {
        console.log(`  📥 Processing ${collectionSlug}...`)

        // Export from SQLite
        const { docs } = await sqlitePayload.find({
          collection: collectionSlug as any,
          limit: 100000,
          depth: 0, // Don't populate relationships during export
        })

        collectionStats.exported = docs.length

        if (docs.length === 0) {
          console.log(`     ⚠️  No documents found\n`)
          continue
        }

        console.log(`     ✓ Exported ${docs.length} documents`)

        // Import to PostgreSQL
        let importedCount = 0
        let errorCount = 0

        for (const doc of docs) {
          try {
            // Remove internal fields that shouldn't be copied
            const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanData } = doc

            await postgresPayload.create({
              collection: collectionSlug as any,
              data: cleanData,
            })
            importedCount++
          } catch (error) {
            errorCount++
            if (errorCount <= 3) {
              console.log(`     ⚠️  Error importing document: ${(error as Error).message}`)
            }
          }
        }

        collectionStats.imported = importedCount
        collectionStats.errors = errorCount

        console.log(
          `     ✓ Imported ${importedCount}/${docs.length} documents${errorCount > 0 ? ` (${errorCount} errors)` : ''}`
        )
        console.log()

        totalExported += collectionStats.exported
        totalImported += collectionStats.imported
        totalErrors += collectionStats.errors
        stats.push(collectionStats)
      } catch (error) {
        console.error(`     ❌ Error processing ${collectionSlug}: ${(error as Error).message}\n`)
        collectionStats.errors++
        totalErrors++
        stats.push(collectionStats)
      }
    }

    // ==========================================
    // STEP 4: Migrate Globals
    // ==========================================
    console.log('🌐 STEP 4: Migrating globals...\n')

    for (const globalSlug of GLOBALS) {
      try {
        console.log(`  📥 Processing ${globalSlug}...`)

        // Export from SQLite
        const data = await sqlitePayload.findGlobal({
          slug: globalSlug as any,
          depth: 0,
        })

        if (!data) {
          console.log(`     ⚠️  No data found\n`)
          continue
        }

        console.log(`     ✓ Exported global data`)

        // Remove internal fields
        const {
          id: _id,
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          globalType: _globalType,
          ...cleanData
        } = data as any

        // Import to PostgreSQL
        await postgresPayload.updateGlobal({
          slug: globalSlug as any,
          data: cleanData,
        })

        console.log(`     ✓ Imported global data`)
        console.log()
      } catch (error) {
        console.error(`     ❌ Error processing ${globalSlug}: ${(error as Error).message}\n`)
      }
    }

    // ==========================================
    // SUMMARY
    // ==========================================
    console.log('\n' + '='.repeat(60))
    console.log('✨ Migration completed!')
    console.log('='.repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Total documents exported: ${totalExported}`)
    console.log(`   Total documents imported: ${totalImported}`)
    console.log(`   Total errors: ${totalErrors}`)
    console.log()

    if (stats.length > 0) {
      console.log('📋 Detailed Statistics:')
      console.log()
      stats.forEach((stat) => {
        const status = stat.errors > 0 ? '⚠️' : '✅'
        console.log(
          `   ${status} ${stat.collection.padEnd(25)} Exported: ${String(stat.exported).padStart(4)}  Imported: ${String(stat.imported).padStart(4)}${stat.errors > 0 ? `  Errors: ${stat.errors}` : ''}`
        )
      })
    }

    console.log('\n⚠️  IMPORTANT NOTES:')
    console.log('   • Media files (images/uploads) were NOT migrated')
    console.log('   • You need to manually copy the media/ directory from your backup')
    console.log('   • Verify relationships are intact in the admin panel')
    console.log('   • Some document IDs may have changed during migration\n')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateData()
