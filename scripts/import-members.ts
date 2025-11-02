import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const importMembers = async () => {
  const payload = await getPayload({ config })

  console.log('👥 Starting Members import...\n')

  try {
    // Import from chirp-radio users.json
    const usersPath = path.resolve(__dirname, '../../chirp-radio/src/data/users.json')

    if (!fs.existsSync(usersPath)) {
      console.error(`❌ Could not find users.json at: ${usersPath}`)
      process.exit(1)
    }

    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
    console.log(`📥 Found ${usersData.users.length} users to import...\n`)

    let imported = 0
    let skipped = 0

    for (const user of usersData.users) {
      // Transform arrays to PayloadCMS format
      const transformArray = (arr: any[] | undefined, key: string) => {
        if (!arr || !Array.isArray(arr)) return []
        return arr.map(item => typeof item === 'string' ? { [key]: item } : item)
      }

      // Map ALL user fields to member fields - keeping full structure
      const memberData = {
        ...user,
        // Remove internal fields
        id: undefined,
        password: undefined,
        // Transform array fields to match PayloadCMS schema
        volunteerOrgs: transformArray(user.volunteerOrgs, 'org'),
        specialSkills: transformArray(user.specialSkills, 'skill'),
        hearAboutChirp: transformArray(user.hearAboutChirp, 'source'),
        interests: transformArray(user.interests, 'interest'),
        djAvailability: transformArray(user.djAvailability, 'time'),
        substituteAvailability: transformArray(user.substituteAvailability, 'time'),
        canSubstituteFor: transformArray(user.canSubstituteFor, 'djId'),
        favoriteDJs: transformArray(user.favoriteDJs, 'djId'),
      }

      try {
        await payload.create({
          collection: 'listeners',
          data: memberData,
        })

        const displayName = user.djName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || user.email
        console.log(`  ✓ ${displayName} (${user.email})`)
        imported++
      } catch (error) {
        if (imported === 0 && skipped === 0) {
          // Log detailed error for first user only
          console.error(`  ⚠️  First user error details:`)
          console.error(`     Email: ${user.email}`)
          console.error(`     Error: ${(error as Error).message}`)
          console.error(`     Error data:`, JSON.stringify((error as any).data, null, 2))
        } else {
          console.log(`  ⚠️  Skipped ${user.email}: ${(error as Error).message}`)
        }
        skipped++
      }
    }

    console.log(`\n✨ Import complete!`)
    console.log(`   Imported: ${imported}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Total: ${usersData.users.length}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error importing members:', error)
    process.exit(1)
  }
}

importMembers()
