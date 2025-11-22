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

// Collection names to migrate (in order - users first!)
const COLLECTIONS = [
  'users',
  'categories',
  'venues',
  'media',
  'player-fallback-images',
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
]

// Global names to migrate
const GLOBALS = ['siteSettings', 'mobileAppSettings', 'volunteerFormSettings']

// Collections to skip (will log but not process)
const _SKIP_COLLECTIONS = ['redirects'] // Redirects plugin manages its own collection

interface MigrationStats {
  collection: string
  exported: number
  deleted: number
  imported: number
  skipped: number
  errors: number
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const migrateData = async () => {
  console.log('🚀 Starting IMPROVED data migration from SQLite to PostgreSQL...\n')

  // Paths
  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const sourceMediaPath = path.resolve(__dirname, '../data-backups/media')
  const targetMediaPath = path.resolve(__dirname, '../media')
  const postgresUri =
    process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

  // Verify SQLite database exists
  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  console.log(`📂 Source DB: ${sqliteDbPath}`)
  console.log(`📂 Source Media: ${sourceMediaPath}`)
  console.log(`📂 Target DB: ${postgresUri}`)
  console.log(`📂 Target Media: ${targetMediaPath}\n`)

  // Warning about clearing data
  console.log('⚠️  WARNING: This will CLEAR all existing data in PostgreSQL!')
  console.log('   Press Ctrl+C within 5 seconds to cancel...\n')
  await wait(5000)

  const stats: MigrationStats[] = []
  let totalExported = 0
  let totalDeleted = 0
  let totalImported = 0
  let totalSkipped = 0
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
        push: false,
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
        push: false,
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
        deleted: 0,
        imported: 0,
        skipped: 0,
        errors: 0,
      }

      try {
        console.log(`  📥 Processing ${collectionSlug}...`)

        // Special handling for media - skip for now, handle separately
        if (collectionSlug === 'media' || collectionSlug === 'player-fallback-images') {
          console.log(`     ⏭️  Skipping ${collectionSlug} (requires file migration)\n`)
          collectionStats.skipped = 1
          stats.push(collectionStats)
          totalSkipped++
          continue
        }

        // Export from SQLite
        const { docs } = await sqlitePayload.find({
          collection: collectionSlug as any,
          limit: 100000,
          depth: 0,
        })

        collectionStats.exported = docs.length

        if (docs.length === 0) {
          console.log(`     ⚠️  No documents found\n`)
          stats.push(collectionStats)
          continue
        }

        console.log(`     ✓ Exported ${docs.length} documents`)

        // Delete existing data in PostgreSQL
        try {
          const { docs: existingDocs } = await postgresPayload.find({
            collection: collectionSlug as any,
            limit: 100000,
          })

          if (existingDocs.length > 0) {
            console.log(`     🗑️  Deleting ${existingDocs.length} existing documents...`)
            for (const doc of existingDocs) {
              try {
                await postgresPayload.delete({
                  collection: collectionSlug as any,
                  id: doc.id,
                })
                collectionStats.deleted++
              } catch {
                // Ignore delete errors, continue
              }
            }
            totalDeleted += collectionStats.deleted
          }
        } catch (error) {
          // If we can't delete, just log and continue
          console.log(`     ⚠️  Could not delete existing documents: ${(error as Error).message}`)
        }

        // Import to PostgreSQL
        let importedCount = 0
        let errorCount = 0
        let skippedCount = 0

        for (const doc of docs) {
          try {
            // Remove internal fields and problematic fields
            const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanData } = doc

            // Special handling for different collections
            const dataToImport = cleanData

            // For users - ensure we have minimal required fields
            if (collectionSlug === 'users') {
              if (!cleanData.email || !cleanData.password) {
                console.log(`     ⏭️  Skipping user without email/password`)
                skippedCount++
                continue
              }
            }

            // For listeners (members) - handle email validation
            if (collectionSlug === 'listeners') {
              if (!cleanData.email) {
                console.log(`     ⏭️  Skipping listener without email`)
                skippedCount++
                continue
              }
            }

            await postgresPayload.create({
              collection: collectionSlug as any,
              data: dataToImport,
              depth: 0,
            })
            importedCount++
          } catch (error) {
            errorCount++
            const errorMsg = (error as Error).message

            // Only show detailed errors for first 3
            if (errorCount <= 3) {
              console.log(`     ⚠️  Error: ${errorMsg.substring(0, 100)}`)
            }
          }
        }

        collectionStats.imported = importedCount
        collectionStats.skipped = skippedCount
        collectionStats.errors = errorCount

        console.log(
          `     ✓ Imported ${importedCount}/${docs.length} documents${errorCount > 0 ? ` (${errorCount} errors)` : ''}${skippedCount > 0 ? ` (${skippedCount} skipped)` : ''}`
        )
        console.log()

        totalExported += collectionStats.exported
        totalImported += collectionStats.imported
        totalSkipped += collectionStats.skipped
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
    // STEP 4: Copy Media Files
    // ==========================================
    console.log('📁 STEP 4: Copying media files...\n')

    if (fs.existsSync(sourceMediaPath)) {
      console.log(`  📂 Copying from ${sourceMediaPath} to ${targetMediaPath}...`)

      try {
        // Create target directory if it doesn't exist
        if (!fs.existsSync(targetMediaPath)) {
          fs.mkdirSync(targetMediaPath, { recursive: true })
        }

        // Copy directory recursively
        const copyRecursive = (src: string, dest: string) => {
          const entries = fs.readdirSync(src, { withFileTypes: true })
          let fileCount = 0

          for (const entry of entries) {
            const srcPath = path.join(src, entry.name)
            const destPath = path.join(dest, entry.name)

            if (entry.isDirectory()) {
              if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true })
              }
              fileCount += copyRecursive(srcPath, destPath)
            } else {
              fs.copyFileSync(srcPath, destPath)
              fileCount++
            }
          }

          return fileCount
        }

        const copiedFiles = copyRecursive(sourceMediaPath, targetMediaPath)
        console.log(`  ✓ Copied ${copiedFiles} media files\n`)
      } catch (error) {
        console.error(`  ❌ Error copying media files: ${(error as Error).message}\n`)
      }
    } else {
      console.log(`  ⚠️  Source media directory not found: ${sourceMediaPath}\n`)
    }

    // ==========================================
    // STEP 5: Migrate Globals
    // ==========================================
    console.log('🌐 STEP 5: Migrating globals...\n')

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
        try {
          await postgresPayload.updateGlobal({
            slug: globalSlug as any,
            data: cleanData,
            depth: 0,
          })
          console.log(`     ✓ Imported global data`)
        } catch (error) {
          console.log(`     ⚠️  Error importing: ${(error as Error).message}`)
        }
        console.log()
      } catch (error) {
        console.error(`     ❌ Error processing ${globalSlug}: ${(error as Error).message}\n`)
      }
    }

    // ==========================================
    // SUMMARY
    // ==========================================
    console.log('\n' + '='.repeat(70))
    console.log('✨ Migration completed!')
    console.log('='.repeat(70))
    console.log(`\n📊 Summary:`)
    console.log(`   Total documents exported:  ${totalExported}`)
    console.log(`   Total documents deleted:   ${totalDeleted}`)
    console.log(`   Total documents imported:  ${totalImported}`)
    console.log(`   Total documents skipped:   ${totalSkipped}`)
    console.log(`   Total errors:              ${totalErrors}`)
    console.log()

    if (stats.length > 0) {
      console.log('📋 Detailed Statistics:')
      console.log()
      console.log(
        '   Collection'.padEnd(30) +
          'Exported'.padStart(10) +
          'Deleted'.padStart(10) +
          'Imported'.padStart(10) +
          'Skipped'.padStart(10) +
          'Errors'.padStart(10)
      )
      console.log('   ' + '-'.repeat(78))

      stats.forEach((stat) => {
        const status =
          stat.errors > 0 ? '⚠️' : stat.skipped > 0 ? '⏭️' : stat.imported > 0 ? '✅' : '⚪'
        console.log(
          `   ${status} ${stat.collection.padEnd(27)}${String(stat.exported).padStart(10)}${String(stat.deleted).padStart(10)}${String(stat.imported).padStart(10)}${String(stat.skipped).padStart(10)}${String(stat.errors).padStart(10)}`
        )
      })
    }

    console.log('\n📝 Next Steps:')
    console.log('   1. ✅ Media files have been copied')
    console.log('   2. 🔍 Review any errors above')
    console.log('   3. 🌐 Access admin panel: http://localhost:3000/admin')
    console.log('   4. ✓  Verify data and relationships')
    console.log('   5. 👤 Create an admin user if needed: npm run create:admin\n')

    // ==========================================
    // CLEANUP: Close database connections
    // ==========================================
    console.log('🔄 Closing database connections...')

    try {
      // Properly close Payload instances to ensure transactions are committed
      if (sqlitePayload && typeof (sqlitePayload as any).db?.client?.close === 'function') {
        await (sqlitePayload as any).db.client.close()
      }
      if (postgresPayload && typeof (postgresPayload as any).db?.client?.end === 'function') {
        await (postgresPayload as any).db.client.end()
      }

      // Give time for any pending operations to complete
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('✅ Database connections closed\n')
    } catch (closeError) {
      console.warn('⚠️  Warning closing connections:', (closeError as Error).message)
    }

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateData()
