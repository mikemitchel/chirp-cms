import { getPayload } from 'payload'
import config from '../payload.config'

async function verifyAllDJs() {
  console.log('Starting DJ verification...\n')

  // Initialize Payload
  const payload = await getPayload({ config })

  // Get all DJs and Substitute DJs
  console.log('📋 Finding all DJs...')
  const allDJs = await payload.find({
    collection: 'listeners',
    where: {
      roles: {
        in: ['Regular DJ', 'Substitute DJ']
      }
    },
    limit: 1000
  })

  console.log(`Found ${allDJs.docs.length} DJs to verify\n`)

  let verifiedCount = 0
  let errorCount = 0
  const errors: Array<{ name: string; error: string }> = []

  for (const dj of allDJs.docs) {
    const djName = dj.djName || `${dj.firstName} ${dj.lastName}`

    try {
      // Check if already verified
      if (dj._verified) {
        console.log(`⏭️  ${djName} - already verified`)
        continue
      }

      // Update member to mark as verified
      await payload.update({
        collection: 'listeners',
        id: dj.id,
        data: {
          _verified: true
        }
      })

      console.log(`✅ ${djName} - verified`)
      verifiedCount++

    } catch (error: any) {
      console.error(`❌ ${djName} - Error: ${error.message}`)
      errors.push({
        name: djName,
        error: error.message
      })
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('Verification complete!')
  console.log('='.repeat(50))
  console.log(`✅ Verified: ${verifiedCount}`)
  console.log(`⏭️  Already verified: ${allDJs.docs.length - verifiedCount - errorCount}`)
  console.log(`❌ Errors: ${errorCount}`)

  if (errors.length > 0) {
    console.log('\nErrors:')
    errors.forEach(({ name, error }) => {
      console.log(`  ${name}: ${error}`)
    })
  }

  process.exit(0)
}

verifyAllDJs().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
