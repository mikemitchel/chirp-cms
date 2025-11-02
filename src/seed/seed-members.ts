import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function seedMembers(payload: Payload, dataDir?: string) {
  console.log('👥 Seeding Members...')

  try {
    // Check if we have exported data from backup
    if (dataDir && fs.existsSync(path.join(dataDir, 'listeners.json'))) {
      const membersData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'listeners.json'), 'utf-8')
      )

      for (const member of membersData['listeners'] || []) {
        const { id, createdAt, updatedAt, ...memberData } = member
        await payload.create({
          collection: 'listeners',
          data: memberData,
        })
        console.log(`  ✓ ${member.email || member.name}`)
      }

      console.log(`✓ ${membersData['listeners']?.length || 0} Members seeded successfully`)
    } else {
      // Import from chirp-radio users.json
      const usersPath = path.resolve(__dirname, '../../../chirp-radio/src/data/users.json')

      if (fs.existsSync(usersPath)) {
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
        console.log(`  Found ${usersData.users.length} users to import...`)

        for (const user of usersData.users) {
          // Map ALL user fields to member fields - keeping full structure
          const memberData = {
            // Remove internal fields
            ...user,
            id: undefined,
            password: undefined,
          }

          try {
            await payload.create({
              collection: 'listeners',
              data: memberData,
            })
            const displayName = user.djName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || user.email
            console.log(`  ✓ ${displayName} (${user.email})`)
          } catch (error) {
            console.log(`  ⚠️  Skipped ${user.email}: ${(error as Error).message}`)
          }
        }

        console.log(`✓ Imported ${usersData.users.length} Members from users.json`)
      } else {
        console.log('  ⚠️  No users.json found, creating sample members...')

        // Create sample members
        const sampleMembers = [
          {
            name: 'Demo Listener',
            email: 'listener@chirpradio.org',
            roles: ['Listener'],
            collection: [],
          },
          {
            name: 'Demo Volunteer',
            email: 'volunteer@chirpradio.org',
            roles: ['Listener', 'Volunteer'],
            collection: [],
          },
          {
            name: 'Demo DJ',
            email: 'dj@chirpradio.org',
            roles: ['Listener', 'Volunteer', 'Regular DJ'],
            collection: [],
          },
        ]

        for (const member of sampleMembers) {
          await payload.create({
            collection: 'listeners',
            data: member,
          })
          console.log(`  ✓ ${member.name}`)
        }

        console.log(`✓ Created ${sampleMembers.length} sample members`)
      }
    }
  } catch (error) {
    console.error('Error seeding Members:', error)
  }
}
