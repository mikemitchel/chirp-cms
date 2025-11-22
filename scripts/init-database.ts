import { getPayload } from 'payload'
import config from '../payload.config.js'
import dotenv from 'dotenv'

dotenv.config()

const initDatabase = async () => {
  console.log('🚀 Initializing database schema...\n')

  try {
    const _payload = await getPayload({ config })
    console.log('✅ Database schema initialized successfully!\n')
    process.exit(0)
  } catch (error) {
    console.error('❌ Failed to initialize database:', error)
    process.exit(1)
  }
}

initDatabase()
