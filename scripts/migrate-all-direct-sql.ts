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

// Import collections for SQLite connection
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
import { SiteSettings } from '../src/globals/SiteSettings.js'
import { MobileAppSettings } from '../src/globals/MobileAppSettings.js'
import { VolunteerFormSettings } from '../src/globals/VolunteerFormSettings.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { Pool } = pg

interface MigrationStats {
  collection: string
  exported: number
  imported: number
  errors: number
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const migrateAllDirectSQL = async () => {
  console.log('🚀 COMPREHENSIVE Direct SQL Migration\n')
  console.log('   Using explicit transactions for reliable commits\n')

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
  let pgPool: pg.Pool | null = null
  const stats: MigrationStats[] = []

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

    // Migrate Articles
    await migrateArticles(sqlitePayload, pgPool, stats)

    // Migrate Events
    await migrateEvents(sqlitePayload, pgPool, stats)

    // Migrate Podcasts
    await migratePodcasts(sqlitePayload, pgPool, stats)

    // Migrate Pages
    await migratePages(sqlitePayload, pgPool, stats)

    // Migrate simple collections
    await migrateSimple(sqlitePayload, pgPool, stats, 'announcements')
    await migrateSimple(sqlitePayload, pgPool, stats, 'advertisements')
    await migrateSimple(sqlitePayload, pgPool, stats, 'age_gate')
    await migrateSimple(sqlitePayload, pgPool, stats, 'onboarding')
    await migrateSimple(sqlitePayload, pgPool, stats, 'shopItems')
    await migrateSimple(sqlitePayload, pgPool, stats, 'weeklyCharts')
    await migrateSimple(sqlitePayload, pgPool, stats, 'volunteerCalendar')
    await migrateSimple(sqlitePayload, pgPool, stats, 'donations')
    await migrateSimple(sqlitePayload, pgPool, stats, 'purchases')

    // Summary
    console.log('\n' + '='.repeat(70))
    console.log('✨ Migration Complete!')
    console.log('='.repeat(70))
    console.log('\n📊 Results:\n')
    stats.forEach((s) => {
      const icon = s.errors > 0 ? '⚠️' : s.imported > 0 ? '✅' : '⚪'
      console.log(
        `   ${icon} ${s.collection.padEnd(20)} ${s.imported}/${s.exported} imported${s.errors > 0 ? ` (${s.errors} errors)` : ''}`
      )
    })

    console.log('\n📝 Next Steps:')
    console.log('   1. Access: http://localhost:3000/admin')
    console.log('   2. Create admin: npm run create:admin')
    console.log('   3. Verify your data\n')
  } catch (error) {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  } finally {
    if (pgPool) {
      await pgPool.end()
      console.log('🔄 Closed connections\n')
    }
  }
}

async function migrateArticles(sqlitePayload: any, pgPool: pg.Pool, stats: MigrationStats[]) {
  console.log('📦 Migrating articles...')

  const collectionStats: MigrationStats = {
    collection: 'articles',
    exported: 0,
    imported: 0,
    errors: 0,
  }

  try {
    const { docs } = await sqlitePayload.find({
      collection: 'articles',
      limit: 100000,
      depth: 0,
    })

    collectionStats.exported = docs.length

    if (docs.length === 0) {
      console.log('   ⚠️  No data\n')
      stats.push(collectionStats)
      return
    }

    const client = await pgPool.connect()
    try {
      await client.query('BEGIN')
      await client.query('DELETE FROM articles')

      for (const doc of docs) {
        try {
          const {
            id: _id,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            tags: _tags,
            ...data
          } = doc

          await client.query(
            `INSERT INTO articles (category_id, title, slug, author, featured_image_id, featured_image_url, excerpt, content, video_title, youtube_video_id, published_date)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              data.category || null,
              data.title,
              data.slug || null,
              data.author,
              data.featuredImage || null,
              data.featuredImageUrl || null,
              data.excerpt,
              JSON.stringify(data.content || {}),
              data.videoTitle || null,
              data.youtubeVideoId || null,
              data.publishedDate || new Date(),
            ]
          )
          collectionStats.imported++
        } catch {
          collectionStats.errors++
        }
      }

      await client.query('COMMIT')
      console.log(`   ✅ ${collectionStats.imported}/${docs.length}\n`)
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message.substring(0, 60)}\n`)
  }

  stats.push(collectionStats)
}

async function migrateEvents(sqlitePayload: any, pgPool: pg.Pool, stats: MigrationStats[]) {
  console.log('📦 Migrating events...')

  const collectionStats: MigrationStats = {
    collection: 'events',
    exported: 0,
    imported: 0,
    errors: 0,
  }

  try {
    const { docs } = await sqlitePayload.find({
      collection: 'events',
      limit: 100000,
      depth: 0,
    })

    collectionStats.exported = docs.length

    if (docs.length === 0) {
      console.log('   ⚠️  No data\n')
      stats.push(collectionStats)
      return
    }

    const client = await pgPool.connect()
    try {
      await client.query('BEGIN')
      await client.query('DELETE FROM events')

      for (const doc of docs) {
        try {
          const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc

          await client.query(
            `INSERT INTO events (category_id, title, slug, excerpt, content, featured_image_id, featured_image_url, show_photo_credit, photographer_name, venue_id, date, end_date, featured, age_restriction_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
            [
              data.category || null,
              data.title,
              data.slug || null,
              data.excerpt,
              JSON.stringify(data.content || {}),
              data.featuredImage || null,
              data.featuredImageUrl || null,
              data.showPhotoCredit || false,
              data.photographerName || null,
              data.venue || null,
              data.date || new Date(),
              data.endDate || null,
              data.featured || false,
              data.ageRestriction || null,
            ]
          )
          collectionStats.imported++
        } catch {
          collectionStats.errors++
        }
      }

      await client.query('COMMIT')
      console.log(`   ✅ ${collectionStats.imported}/${docs.length}\n`)
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message.substring(0, 60)}\n`)
  }

  stats.push(collectionStats)
}

async function migratePodcasts(sqlitePayload: any, pgPool: pg.Pool, stats: MigrationStats[]) {
  console.log('📦 Migrating podcasts...')

  const collectionStats: MigrationStats = {
    collection: 'podcasts',
    exported: 0,
    imported: 0,
    errors: 0,
  }

  try {
    const { docs } = await sqlitePayload.find({
      collection: 'podcasts',
      limit: 100000,
      depth: 0,
    })

    collectionStats.exported = docs.length

    if (docs.length === 0) {
      console.log('   ⚠️  No data\n')
      stats.push(collectionStats)
      return
    }

    const client = await pgPool.connect()
    try {
      await client.query('BEGIN')
      await client.query('DELETE FROM podcasts')

      for (const doc of docs) {
        try {
          const {
            id: _id,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            tags: _tags,
            ...data
          } = doc

          await client.query(
            `INSERT INTO podcasts (category_id, title, slug, excerpt, content, host, cover_art_id, cover_art_url, sound_cloud_embed_url, pull_quote, pull_quote_attribution, additional_info, transcript_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
              data.category || null,
              data.title,
              data.slug || null,
              data.excerpt,
              JSON.stringify(data.content || {}),
              data.host,
              data.coverArt || null,
              data.coverArtUrl || null,
              data.soundCloudEmbedUrl || null,
              data.pullQuote || null,
              data.pullQuoteAttribution || null,
              data.additionalInfo || null,
              data.transcriptUrl || null,
            ]
          )
          collectionStats.imported++
        } catch {
          collectionStats.errors++
        }
      }

      await client.query('COMMIT')
      console.log(`   ✅ ${collectionStats.imported}/${docs.length}\n`)
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message.substring(0, 60)}\n`)
  }

  stats.push(collectionStats)
}

async function migratePages(sqlitePayload: any, pgPool: pg.Pool, stats: MigrationStats[]) {
  console.log('📦 Migrating pages...')

  const collectionStats: MigrationStats = {
    collection: 'pages',
    exported: 0,
    imported: 0,
    errors: 0,
  }

  try {
    const { docs } = await sqlitePayload.find({
      collection: 'pages',
      limit: 100000,
      depth: 0,
    })

    collectionStats.exported = docs.length

    if (docs.length === 0) {
      console.log('   ⚠️  No data\n')
      stats.push(collectionStats)
      return
    }

    const client = await pgPool.connect()
    try {
      await client.query('BEGIN')
      await client.query('DELETE FROM pages')

      for (const doc of docs) {
        try {
          const {
            id: _id,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            blocks: _blocks,
            ...data
          } = doc

          await client.query(
            `INSERT INTO pages (title, slug, meta_title, meta_description, published_date)
             VALUES ($1, $2, $3, $4, $5)`,
            [
              data.title,
              data.slug || null,
              data.metaTitle || null,
              data.metaDescription || null,
              data.publishedDate || new Date(),
            ]
          )
          collectionStats.imported++
        } catch {
          collectionStats.errors++
        }
      }

      await client.query('COMMIT')
      console.log(`   ✅ ${collectionStats.imported}/${docs.length}\n`)
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message.substring(0, 60)}\n`)
  }

  stats.push(collectionStats)
}

async function migrateSimple(
  sqlitePayload: any,
  pgPool: pg.Pool,
  stats: MigrationStats[],
  collectionSlug: string
) {
  console.log(`📦 Migrating ${collectionSlug}...`)

  const collectionStats: MigrationStats = {
    collection: collectionSlug,
    exported: 0,
    imported: 0,
    errors: 0,
  }

  try {
    const { docs } = await sqlitePayload.find({
      collection: collectionSlug as any,
      limit: 100000,
      depth: 0,
    })

    collectionStats.exported = docs.length

    if (docs.length === 0) {
      console.log('   ⚠️  No data\n')
      stats.push(collectionStats)
      return
    }

    const tableName = collectionSlug
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')

    const client = await pgPool.connect()
    try {
      await client.query('BEGIN')
      await client.query(`DELETE FROM ${tableName}`)

      for (const doc of docs) {
        try {
          const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = doc
          const columns = Object.keys(data).filter(
            (k) => typeof data[k] !== 'object' || data[k] === null
          )
          const values = columns.map((k) => data[k])
          const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')

          if (columns.length > 0) {
            await client.query(
              `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
              values
            )
            collectionStats.imported++
          }
        } catch {
          collectionStats.errors++
        }
      }

      await client.query('COMMIT')
      console.log(`   ✅ ${collectionStats.imported}/${docs.length}\n`)
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message.substring(0, 60)}\n`)
  }

  stats.push(collectionStats)
}

migrateAllDirectSQL()
