import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'

dotenv.config()

const createAdmin = async () => {
  const payload = await getPayload({ config })

  console.log('👤 Creating default admin user...')

  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@chirpradio.org',
        password: 'admin123',
      },
    })
    console.log('✓ Default admin user created')
    console.log('   Email: admin@chirpradio.org')
    console.log('   Password: admin123')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdmin()
