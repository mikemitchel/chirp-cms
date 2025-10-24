import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Articles } from './src/collections/Articles'
import { Events } from './src/collections/Events'
import { DJs } from './src/collections/DJs'
import { Media } from './src/collections/Media'
import { Venues } from './src/collections/Venues'
import { Pages } from './src/collections/Pages'
import { Podcasts } from './src/collections/Podcasts'
import { Announcements } from './src/collections/Announcements'
import { Users } from './src/collections/Users'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    Users,
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
