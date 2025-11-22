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

interface MigrationData {
  collections: Record<string, any[]>
  globals: Record<string, any>
  metadata: {
    exportDate: string
    sourceDatabase: string
    targetDatabase: string
    collectionsCount: number
    globalsCount: number
  }
}

const migrateSQLiteToPostgres = async () => {
  console.log('🚀 Starting SQLite to PostgreSQL migration...\n')

  // Paths
  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const tempExportPath = path.resolve(__dirname, '../temp-migration-export.json')

  // Verify SQLite database exists
  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  console.log(`📂 Source: ${sqliteDbPath}`)
  console.log(
    `📂 Target: PostgreSQL (${process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'})\n`
  )

  const migrationData: MigrationData = {
    collections: {},
    globals: {},
    metadata: {
      exportDate: new Date().toISOString(),
      sourceDatabase: sqliteDbPath,
      targetDatabase:
        process.env.DATABASE_URI ||
        'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms',
      collectionsCount: 0,
      globalsCount: 0,
    },
  }

  try {
    // ==========================================
    // STEP 1: Export data from SQLite
    // ==========================================
    console.log('📤 STEP 1: Exporting data from SQLite...\n')

    // Create a custom config for SQLite with only the database adapter changed
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
      }),
      typescript: {
        outputFile: path.resolve(__dirname, '../payload-types.ts'),
      },
      editor: lexicalEditor({}),
      sharp,
    })

    const sqlitePayload = await getPayload({ config: sqliteConfig })

    // Export collections
    for (const collection of COLLECTIONS) {
      try {
        console.log(`  📥 Exporting ${collection}...`)
        const { docs } = await sqlitePayload.find({
          collection: collection as any,
          limit: 100000,
          depth: 0, // Don't populate relationships
        })

        if (docs.length > 0) {
          migrationData.collections[collection] = docs
          migrationData.metadata.collectionsCount++
          console.log(`     ✓ Exported ${docs.length} documents`)
        } else {
          console.log(`     ⚠️  No documents found`)
        }
      } catch (error) {
        console.log(`     ⚠️  Could not export ${collection}:`, (error as Error).message)
      }
    }

    // Export globals
    console.log('\n  📥 Exporting globals...')
    for (const globalSlug of GLOBALS) {
      try {
        const data = await sqlitePayload.findGlobal({
          slug: globalSlug as any,
          depth: 0,
        })

        if (data) {
          migrationData.globals[globalSlug] = data
          migrationData.metadata.globalsCount++
          console.log(`     ✓ Exported ${globalSlug}`)
        }
      } catch (error) {
        console.log(`     ⚠️  Could not export ${globalSlug}:`, (error as Error).message)
      }
    }

    // Save export to temp file
    fs.writeFileSync(tempExportPath, JSON.stringify(migrationData, null, 2))
    console.log(`\n  💾 Temporary export saved to: ${tempExportPath}`)
    console.log(
      `\n✅ STEP 1 Complete: Exported ${migrationData.metadata.collectionsCount} collections and ${migrationData.metadata.globalsCount} globals\n`
    )

    // ==========================================
    // STEP 2: Import data to PostgreSQL
    // ==========================================
    console.log('📥 STEP 2: Importing data to PostgreSQL...\n')

    // Get the Postgres connection string
    const postgresUri =
      process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

    // Create a custom config for PostgreSQL
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
      }),
      typescript: {
        outputFile: path.resolve(__dirname, '../payload-types.ts'),
      },
      editor: lexicalEditor({}),
      sharp,
    })

    const postgresPayload = await getPayload({ config: postgresConfig })

    // Clear confirmation
    console.log('⚠️  WARNING: This will CLEAR all existing data in the PostgreSQL database!')
    console.log('   Press Ctrl+C within 5 seconds to cancel...\n')
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Import collections
    for (const [collectionSlug, docs] of Object.entries(migrationData.collections)) {
      if (docs.length === 0) continue

      try {
        console.log(`  📤 Importing ${collectionSlug}...`)

        // Delete existing data
        const { docs: existingDocs } = await postgresPayload.find({
          collection: collectionSlug as any,
          limit: 100000,
        })

        if (existingDocs.length > 0) {
          console.log(`     🗑️  Deleting ${existingDocs.length} existing documents...`)
          for (const doc of existingDocs) {
            await postgresPayload.delete({
              collection: collectionSlug as any,
              id: doc.id,
            })
          }
        }

        // Import new data
        let successCount = 0
        let errorCount = 0

        for (const doc of docs) {
          try {
            // Remove internal fields
            const { id, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanData } = doc

            await postgresPayload.create({
              collection: collectionSlug as any,
              data: {
                ...cleanData,
                // Preserve the original ID if possible (some adapters support this)
                ...(id && { id }),
              },
            })
            successCount++
          } catch (error) {
            errorCount++
            if (errorCount <= 3) {
              // Only show first 3 errors to avoid spam
              console.log(`     ⚠️  Error importing document:`, (error as Error).message)
            }
          }
        }

        console.log(
          `     ✓ Imported ${successCount}/${docs.length} documents${errorCount > 0 ? ` (${errorCount} errors)` : ''}`
        )
      } catch (error) {
        console.error(`     ❌ Error importing ${collectionSlug}:`, (error as Error).message)
      }
    }

    // Import globals
    console.log('\n  📤 Importing globals...')
    for (const [globalSlug, data] of Object.entries(migrationData.globals)) {
      try {
        // Remove internal fields
        const {
          id: _id,
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          globalType: _globalType,
          ...cleanData
        } = data as any

        await postgresPayload.updateGlobal({
          slug: globalSlug as any,
          data: cleanData,
        })
        console.log(`     ✓ Imported ${globalSlug}`)
      } catch (error) {
        console.error(`     ⚠️  Error importing ${globalSlug}:`, (error as Error).message)
      }
    }

    // ==========================================
    // CLEANUP
    // ==========================================
    console.log('\n🧹 Cleaning up...')
    if (fs.existsSync(tempExportPath)) {
      fs.unlinkSync(tempExportPath)
      console.log('   ✓ Temporary export file removed')
    }

    // ==========================================
    // SUMMARY
    // ==========================================
    console.log('\n' + '='.repeat(60))
    console.log('✨ Migration completed successfully!')
    console.log('='.repeat(60))
    console.log(`📊 Collections migrated: ${migrationData.metadata.collectionsCount}`)
    console.log(`🌐 Globals migrated: ${migrationData.metadata.globalsCount}`)
    console.log(`📅 Migration date: ${migrationData.metadata.exportDate}`)
    console.log('\n⚠️  IMPORTANT NOTES:')
    console.log('   • Media files (images/uploads) were NOT migrated')
    console.log('   • You need to manually copy the media/ directory')
    console.log('   • Some IDs may have changed during migration')
    console.log('   • Verify relationships are intact in the admin panel')
    console.log('   • Update your .env file to use DATABASE_URI pointing to Postgres\n')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)

    // Cleanup on error
    if (fs.existsSync(tempExportPath)) {
      fs.unlinkSync(tempExportPath)
    }

    process.exit(1)
  }
}

// Run migration
migrateSQLiteToPostgres()
