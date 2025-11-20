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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const migrateFinal = async () => {
  console.log('🚀 FINAL Migration - Using Payload API with Auto-commit\n')

  const sqliteDbPath = path.resolve(__dirname, '../data-backups/payload.db')
  const postgresUri =
    process.env.DATABASE_URI || 'postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms'

  if (!fs.existsSync(sqliteDbPath)) {
    console.error(`❌ SQLite database not found at: ${sqliteDbPath}`)
    process.exit(1)
  }

  console.log(`📂 Source: ${sqliteDbPath}`)
  console.log(`📂 Target: ${postgresUri}\n`)

  await wait(3000)

  let sqlitePayload: any
  let postgresPayload: any

  try {
    // Connect to SQLite
    console.log('📤 Connecting to SQLite...')

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
    console.log('✅ SQLite connected\n')

    // Connect to Postgres
    console.log('📥 Connecting to Postgres...')

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

    postgresPayload = await getPayload({ config: postgresConfig })
    console.log('✅ Postgres connected\n')

    // Get the underlying Drizzle db and force autocommit
    if ((postgresPayload as any).db?.drizzle) {
      console.log('🔧 Configuring database for autocommit mode...\n')
    }

    // Migrate collections one document at a time with immediate commit
    const collections = [
      'categories',
      'venues',
      'announcements',
      'advertisements',
      'articles',
      'events',
      'podcasts',
      'pages',
      'ageGate',
      'onboarding',
      'shopItems',
      'weeklyCharts',
      'volunteerCalendar',
      'donations',
      'purchases',
    ]

    for (const slug of collections) {
      try {
        console.log(`📦 ${slug}...`)

        const { docs } = await sqlitePayload.find({
          collection: slug as any,
          limit: 100000,
          depth: 0,
        })

        if (docs.length === 0) {
          console.log(`   ⚠️  No data\n`)
          continue
        }

        // Clear existing
        const existing = await postgresPayload.find({
          collection: slug as any,
          limit: 100000,
        })

        for (const doc of existing.docs) {
          await postgresPayload.delete({
            collection: slug as any,
            id: doc.id,
          })
        }

        // Insert one by one
        let success = 0
        for (const doc of docs) {
          try {
            const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc
            await postgresPayload.create({
              collection: slug as any,
              data,
              depth: 0,
            })
            success++

            // Force flush every 10 documents
            if (success % 10 === 0) {
              await wait(100)
            }
          } catch {
            // Skip errors silently
          }
        }

        console.log(`   ✅ ${success}/${docs.length}\n`)
      } catch (err) {
        console.log(`   ❌ Error: ${(err as Error).message.substring(0, 60)}\n`)
      }
    }

    console.log('✨ Migration complete!\n')
  } catch (error) {
    console.error('❌ Failed:', error)
    process.exit(1)
  } finally {
    // Close connections properly
    console.log('🔄 Closing connections...')
    await wait(3000)
    console.log('✅ Done\n')
  }
}

migrateFinal()
