import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Import all seed functions
import { seedAdvertisements } from '../src/seed/seed-advertisements'
import { seedAnnouncements } from '../src/seed/seed-announcements'
import { seedPages } from '../src/seed/seed-pages'
import { volunteerCalendarEvents } from '../src/seed/seed-volunteer-calendar'
import { seedSiteSettings } from '../src/seed/seed-site-settings'
import { seedWeeklyCharts } from '../src/seed/seed-weekly-charts'
import { seedShopItems } from '../src/seed/seed-shop-items'
import { seedListeners } from '../src/seed/seed-listeners'
import { seedPlayerFallbackImages } from '../src/seed/seed-player-fallback-images'
import { seedMobileAppSettings } from '../src/seed/seed-mobile-app-settings'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const restoreData = async () => {
  const payload = await getPayload({ config })

  // Get backup directory from command line argument or use latest
  let backupDir = process.argv[2]

  if (!backupDir) {
    // Find latest backup
    const exportDir = path.resolve(__dirname, '../export')
    if (!fs.existsSync(exportDir)) {
      console.error('❌ No backups found. Run npm run export first.')
      process.exit(1)
    }

    const backups = fs
      .readdirSync(exportDir)
      .filter((f) => f.startsWith('backup-'))
      .sort()
      .reverse()

    if (backups.length === 0) {
      console.error('❌ No backups found. Run npm run export first.')
      process.exit(1)
    }

    backupDir = path.join(exportDir, backups[0])
    console.log(`📦 Using latest backup: ${backups[0]}\n`)
  }

  if (!fs.existsSync(backupDir)) {
    console.error(`❌ Backup directory not found: ${backupDir}`)
    process.exit(1)
  }

  console.log('🔄 Starting full CMS data restore...')
  console.log(`📁 Restoring from: ${backupDir}\n`)

  try {
    // ========================================
    // STEP 1: CREATE DEFAULT ADMIN USER
    // ========================================
    console.log('👤 Creating default admin user...')
    const { docs: existingUsers } = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@chirpradio.org',
          password: 'admin123',
        },
      })
      console.log('✓ Default admin user created (email: admin@chirpradio.org, password: admin123)\n')
    } else {
      console.log('✓ Admin user already exists, skipping creation\n')
    }

    // ========================================
    // STEP 2: RESTORE FOUNDATIONAL DATA
    // ========================================

    // Categories (needed for articles, events, podcasts)
    await restoreCollection(payload, backupDir, 'categories', 'Categories')

    // Venues (needed for events)
    await restoreCollection(payload, backupDir, 'venues', 'Venues')

    // Age Gate (needed for events)
    await restoreCollection(payload, backupDir, 'age-gate', 'Age Restrictions')

    // ========================================
    // STEP 3: RESTORE CONTENT COLLECTIONS
    // ========================================

    await restoreCollection(payload, backupDir, 'articles', 'Articles')
    await restoreCollection(payload, backupDir, 'events', 'Events')
    await restoreCollection(payload, backupDir, 'podcasts', 'Podcasts')
    await restoreCollection(payload, backupDir, 'djs', 'DJs')

    // ========================================
    // STEP 4: RESTORE MEDIA COLLECTIONS
    // ========================================

    // Note: These restore metadata only, actual files need manual copy
    await seedPlayerFallbackImages(payload, backupDir)
    await restoreCollection(payload, backupDir, 'media', 'Media Files')

    // ========================================
    // STEP 5: RESTORE SUPPORTING COLLECTIONS
    // ========================================

    await seedListeners(payload, backupDir)
    await seedShopItems(payload, backupDir)
    await seedWeeklyCharts(payload, backupDir)

    // ========================================
    // STEP 6: RESTORE ANNOUNCEMENTS & ADS
    // ========================================

    // Check if we have backup data, otherwise use seed functions
    if (fs.existsSync(path.join(backupDir, 'announcements.json'))) {
      await restoreCollection(payload, backupDir, 'announcements', 'Announcements')
    } else {
      await seedAnnouncements(payload)
    }

    if (fs.existsSync(path.join(backupDir, 'advertisements.json'))) {
      await restoreCollection(payload, backupDir, 'advertisements', 'Advertisements')
    } else {
      await seedAdvertisements(payload)
    }

    // ========================================
    // STEP 7: RESTORE PAGES
    // ========================================

    if (fs.existsSync(path.join(backupDir, 'pages.json'))) {
      await restoreCollection(payload, backupDir, 'pages', 'Pages')
    } else {
      await seedPages(payload)
    }

    // ========================================
    // STEP 8: RESTORE CALENDARS
    // ========================================

    if (fs.existsSync(path.join(backupDir, 'volunteer-calendar.json'))) {
      await restoreCollection(payload, backupDir, 'volunteer-calendar', 'Volunteer Calendar')
    } else {
      console.log('📅 Seeding default volunteer calendar...')
      for (const event of volunteerCalendarEvents) {
        await payload.create({
          collection: 'volunteerCalendar',
          data: event,
        })
      }
      console.log(`✓ ${volunteerCalendarEvents.length} volunteer calendar events seeded`)
    }

    await restoreCollection(payload, backupDir, 'mobile-page-content', 'Mobile Page Content')

    // ========================================
    // STEP 9: RESTORE GLOBALS
    // ========================================

    await seedMobileAppSettings(payload, backupDir)

    if (fs.existsSync(path.join(backupDir, 'site-settings.json'))) {
      console.log('🌐 Restoring Site Settings...')
      const settingsData = JSON.parse(
        fs.readFileSync(path.join(backupDir, 'site-settings.json'), 'utf-8')
      )
      const { id, createdAt, updatedAt, globalType, ...cleanData } = settingsData
      await payload.updateGlobal({
        slug: 'siteSettings',
        data: cleanData,
      })
      console.log('✓ Site Settings restored')
    } else {
      await seedSiteSettings(payload)
    }

    console.log('\n✨ Data restore completed successfully!')
    console.log('\n⚠️  IMPORTANT NOTES:')
    console.log('   • Media files (images/uploads) are NOT automatically restored')
    console.log('   • To restore media files, manually copy the media/ directory from your backup')
    console.log('   • All relationships and references have been restored based on IDs')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error restoring data:', error)
    process.exit(1)
  }
}

/**
 * Generic function to restore a collection from exported JSON
 */
async function restoreCollection(
  payload: any,
  backupDir: string,
  collectionSlug: string,
  displayName: string
) {
  const filePath = path.join(backupDir, `${collectionSlug}.json`)

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No backup data for ${displayName}, skipping...`)
    return
  }

  try {
    console.log(`📥 Restoring ${displayName}...`)
    const collectionData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const items = collectionData[collectionSlug] || []

    // Clear existing data
    const { docs: existingDocs } = await payload.find({
      collection: collectionSlug,
      limit: 10000,
    })

    for (const doc of existingDocs) {
      await payload.delete({ collection: collectionSlug, id: doc.id })
    }

    // Restore data
    for (const item of items) {
      const { id, createdAt, updatedAt, ...itemData } = item

      await payload.create({
        collection: collectionSlug,
        data: itemData,
      })
    }

    console.log(`✓ ${items.length} ${displayName} restored`)
  } catch (error) {
    console.error(`Error restoring ${displayName}:`, error)
  }
}

restoreData()
