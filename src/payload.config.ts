import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Articles } from './collections/Articles.js'
import { Events } from './collections/Events.js'
import { DJs } from './collections/DJs.js'
import { Media } from './collections/Media.js'
import { Venues } from './collections/Venues.js'
import { Pages } from './collections/Pages.js'
import { Podcasts } from './collections/Podcasts.js'
import { Announcements } from './collections/Announcements.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    Articles,
    Events,
    Pages,
    Podcasts,
    Announcements,
    DJs,
    Media,
    Venues,
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
})
