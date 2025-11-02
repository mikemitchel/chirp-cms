import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Articles } from './src/collections/Articles'
import { Events } from './src/collections/Events'
import { VolunteerCalendar } from './src/collections/VolunteerCalendar'
import { WeeklyCharts } from './src/collections/WeeklyCharts'
import { Media } from './src/collections/Media'
import { PlayerFallbackImages } from './src/collections/PlayerFallbackImages'
import { Venues } from './src/collections/Venues'
import { Pages } from './src/collections/Pages'
import { Podcasts } from './src/collections/Podcasts'
import { Announcements } from './src/collections/Announcements'
import { Advertisements } from './src/collections/Advertisements'
import { ShopItems } from './src/collections/ShopItems'
import { ShowSchedules } from './src/collections/ShowSchedules'
import { Users } from './src/collections/Users'
import { AgeGate } from './src/collections/AgeGate'
import { Members } from './src/collections/Members'
import { Donations } from './src/collections/Donations'
import { Purchases } from './src/collections/Purchases'
import { Categories } from './src/collections/Categories'
import { MobilePageContent } from './src/collections/MobilePageContent'
import { SiteSettings } from './src/globals/SiteSettings'
import { MobileAppSettings } from './src/globals/MobileAppSettings'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    // CMS Settings
    Users,

    // Media
    Media,
    PlayerFallbackImages,

    // People
    Members,
    Donations,
    Purchases,

    // Content Assets
    Categories,
    Venues,
    Announcements,
    Advertisements,

    // Collections
    Articles,
    Events,
    Podcasts,
    ShopItems,
    ShowSchedules,
    WeeklyCharts,
    VolunteerCalendar,

    // Mobile App
    MobilePageContent,

    // Website
    Pages,

    // Other
    AgeGate,
  ],
  globals: [
    // Mobile App
    MobileAppSettings,

    // Website
    SiteSettings,
  ],
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here-change-in-production',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  editor: lexicalEditor({}),
  sharp,
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3001',
  ].filter(Boolean),
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3001',
  ].filter(Boolean),
})
