import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Update all existing Members to populate displayTitle field
 * This script triggers the beforeChange hook for each member to generate their displayTitle
 */
async function updateMemberDisplayTitles() {
  try {
    console.log('🔄 Starting member displayTitle update...')

    const payload = await getPayload({ config })

    // Fetch all members
    const members = await payload.find({
      collection: 'listeners',
      limit: 1000, // Adjust if you have more members
      pagination: false,
    })

    console.log(`📊 Found ${members.docs.length} members to update`)

    let updated = 0
    let failed = 0

    // Update each member to trigger the beforeChange hook
    for (const member of members.docs) {
      try {
        await payload.update({
          collection: 'listeners',
          id: member.id,
          data: {
            // Don't change any data, just trigger the hook
            firstName: member.firstName,
            lastName: member.lastName,
            djName: member.djName,
            email: member.email,
          },
        })
        updated++
        console.log(`✅ Updated member ${member.id}`)
      } catch (error) {
        failed++
        console.error(`❌ Failed to update member ${member.id}:`, error)
      }
    }

    console.log('\n📈 Update Summary:')
    console.log(`   ✅ Successfully updated: ${updated}`)
    console.log(`   ❌ Failed: ${failed}`)
    console.log(`   📊 Total: ${members.docs.length}`)

    console.log('\n✨ Done! Member displayTitles have been updated.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating member displayTitles:', error)
    process.exit(1)
  }
}

updateMemberDisplayTitles()
