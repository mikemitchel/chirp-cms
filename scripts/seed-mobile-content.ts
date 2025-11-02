import { getPayload } from 'payload'
import config from '../payload.config'

async function seedMobileContent() {
  console.log('🌱 Seeding mobile content...')

  const payload = await getPayload({ config })

  try {
    // Clear existing mobile page content
    const existingPages = await payload.find({
      collection: 'mobilePageContent',
      limit: 100,
    })

    for (const page of existingPages.docs) {
      await payload.delete({
        collection: 'mobilePageContent',
        id: page.id,
      })
    }

    // Seed mobile page content
    const mobilePages = [
      {
        pageIdentifier: 'make-request' as const,
        pageTitle: 'Make a Song Request',
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Request your favorite tracks during live DJ shows! Your requests help shape our programming.',
                  },
                ],
              },
            ],
          },
        },
        customNotLoggedInMessage: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'You need to be logged in to make song requests. Creating an account helps us connect your requests to you and ensures the best experience for everyone.',
                  },
                ],
              },
            ],
          },
        },
        formHintText: 'Keep it friendly and respectful',
        isLoginRequired: true,
        isActive: true,
      },
      {
        pageIdentifier: 'now-playing',
        pageTitle: 'Now Playing',
        isLoginRequired: false,
        isActive: true,
      },
      {
        pageIdentifier: 'recently-played',
        pageTitle: 'Recently Played',
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Browse tracks that recently aired on CHIRP Radio',
                  },
                ],
              },
            ],
          },
        },
        isLoginRequired: false,
        isActive: true,
      },
      {
        pageIdentifier: 'my-collection',
        pageTitle: 'Your Collection',
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Tracks you\'ve saved from our live stream',
                  },
                ],
              },
            ],
          },
        },
        customNotLoggedInMessage: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Log in to save your favorite tracks from our live stream and access them anytime across all your devices.',
                  },
                ],
              },
            ],
          },
        },
        isLoginRequired: true,
        isActive: true,
      },
      {
        pageIdentifier: 'account-settings',
        pageTitle: 'Account Settings',
        isLoginRequired: true,
        isActive: true,
      },
    ]

    console.log('📄 Creating mobile page content...')
    for (const page of mobilePages) {
      const created = await payload.create({
        collection: 'mobilePageContent',
        data: page as any,
      })
      console.log(`  ✅ Created: ${created.pageTitle} (${created.pageIdentifier})`)
    }

    // Update mobile app settings global
    console.log('⚙️  Updating mobile app settings...')
    await payload.updateGlobal({
      slug: 'mobileAppSettings',
      data: {
        notLoggedInMessage: {
          title: 'Login Required',
          message: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'You need to be logged in to access this feature. Create an account to unlock the full CHIRP Radio experience.',
                    },
                  ],
                },
              ],
            },
          },
          loginButtonText: 'Log In',
          signupButtonText: 'Sign Up',
        },
      },
    })
    console.log('  ✅ Updated mobile app settings')

    console.log('\n✨ Mobile content seeding complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding mobile content:', error)
    process.exit(1)
  }
}

seedMobileContent()
