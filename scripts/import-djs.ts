import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

const CSV_PATH = '/Users/ryanwilson/Downloads/DJ custom names - RYAN.csv'

// Helper to create slug from name
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Helper to create excerpt from bio
function createExcerpt(bio: string, maxLength: number = 200): string {
  if (!bio || bio.length <= maxLength) return bio

  // Try to cut at sentence boundary
  const sentences = bio.match(/[^.!?]+[.!?]+/g)
  if (sentences && sentences[0] && sentences[0].length <= maxLength) {
    return sentences[0].trim()
  }

  // Otherwise cut at word boundary
  const trimmed = bio.substring(0, maxLength)
  const lastSpace = trimmed.lastIndexOf(' ')
  return lastSpace > 0 ? trimmed.substring(0, lastSpace) + '...' : trimmed + '...'
}

// Map CSV role to CMS role
function mapRole(csvRole: string): string {
  const role = csvRole.trim().toLowerCase()
  if (role === 'regular') return 'Regular DJ'
  if (role === 'substitute') return 'Substitute DJ'
  return 'Listener'
}

async function importDJs() {
  console.log('Starting DJ import...\n')

  // Initialize Payload
  const payload = await getPayload({ config })

  // First, delete all existing DJs and Substitute DJs
  console.log('🗑️  Removing existing DJs...')
  const existingDJs = await payload.find({
    collection: 'listeners',
    where: {
      roles: {
        in: ['Regular DJ', 'Substitute DJ']
      }
    },
    limit: 1000
  })

  let deletedCount = 0
  for (const dj of existingDJs.docs) {
    try {
      await payload.delete({
        collection: 'listeners',
        id: dj.id
      })
      console.log(`   Deleted: ${dj.djName || dj.firstName} ${dj.lastName}`)
      deletedCount++
    } catch (error: any) {
      console.error(`   Error deleting ${dj.djName || dj.firstName}: ${error.message}`)
    }
  }

  console.log(`\n✅ Deleted ${deletedCount} existing DJs\n`)

  // Read CSV file
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8')

  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  })

  console.log(`Found ${records.length} records to import\n`)

  let successCount = 0
  let errorCount = 0
  const errors: Array<{ row: number; name: string; error: string }> = []

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    const rowNumber = i + 2 // +2 because of header and 0-index

    try {
      const firstName = record['First Name']?.trim()
      const lastName = record['Last Name']?.trim()
      const email = record['Email']?.trim()
      const djName = record['DJ name']?.trim()
      const showName = record['Show name']?.trim()
      const djBio = record['DJ Bio']?.trim()
      const djDonationLink = record['DJ Donation Link']?.trim()
      const role = record['Role']?.trim()

      // Skip if no essential data
      if (!firstName && !djName) {
        console.log(`⚠️  Row ${rowNumber}: Skipping - no name provided`)
        continue
      }

      // Generate email if not provided
      const memberEmail = email || `${createSlug(firstName || djName)}@chirpradio.org`

      // Check if member already exists (by email only)
      const existing = await payload.find({
        collection: 'listeners',
        where: {
          email: { equals: memberEmail }
        }
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Row ${rowNumber}: ${djName || `${firstName} ${lastName}`} already exists, skipping`)
        continue
      }

      // Prepare member data
      const memberData: any = {
        email: memberEmail,
        password: 'ChirpDJ2024!', // Default password - DJs should reset on first login
        firstName: firstName || djName?.split(' ')[0] || 'Unknown',
        lastName: lastName || djName?.split(' ').slice(1).join(' ') || '',
        roles: [mapRole(role)]
      }

      // Add optional fields if they exist
      if (djName && djName !== 'no content') memberData.djName = djName
      if (showName && showName !== 'no content') memberData.showName = showName
      if (djBio && djBio !== 'no content') {
        memberData.djBio = djBio
        // Also create an excerpt from the bio
        memberData.djExcerpt = createExcerpt(djBio)
      }
      if (djDonationLink && djDonationLink !== 'no content') memberData.djDonationLink = djDonationLink

      // Create member
      await payload.create({
        collection: 'listeners',
        data: memberData
      })

      console.log(`✅ Row ${rowNumber}: Created ${djName || `${firstName} ${lastName}`}`)
      successCount++

    } catch (error: any) {
      const name = record['DJ name'] || `${record['First Name']} ${record['Last Name']}`
      console.error(`❌ Row ${rowNumber}: Error creating ${name}`)
      console.error(`   ${error.message}`)
      errors.push({
        row: rowNumber,
        name,
        error: error.message
      })
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('Import complete!')
  console.log('='.repeat(50))
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`⏭️  Skipped: ${records.length - successCount - errorCount}`)

  if (errors.length > 0) {
    console.log('\n' + 'Errors:')
    errors.forEach(({ row, name, error }) => {
      console.log(`  Row ${row} (${name}): ${error}`)
    })
  }

  process.exit(0)
}

importDJs().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
