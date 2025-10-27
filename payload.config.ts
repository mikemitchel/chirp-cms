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
import { DJs } from './src/collections/DJs'
import { Media } from './src/collections/Media'
import { Venues } from './src/collections/Venues'
import { Pages } from './src/collections/Pages'
import { Podcasts } from './src/collections/Podcasts'
import { Announcements } from './src/collections/Announcements'
import { Advertisements } from './src/collections/Advertisements'
import { ShopItems } from './src/collections/ShopItems'
import { Users } from './src/collections/Users'
import { AgeGate } from './src/collections/AgeGate'
import { Listeners } from './src/collections/Listeners'
import { Categories } from './src/collections/Categories'
import { MobilePageContent } from './src/collections/MobilePageContent'
import { SiteSettings } from './src/globals/SiteSettings'
import { MobileAppSettings } from './src/globals/MobileAppSettings'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    Users,
    AgeGate,
    Listeners,
    Venues,
    Categories,
    Articles,
    Events,
    VolunteerCalendar,
    WeeklyCharts,
    Pages,
    Podcasts,
    Announcements,
    Advertisements,
    ShopItems,
    DJs,
    Media,
    MobilePageContent,
  ],
  globals: [
    SiteSettings,
    MobileAppSettings,
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
