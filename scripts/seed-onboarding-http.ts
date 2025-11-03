// Seed onboarding steps via HTTP API (to running CMS server)

const onboardingSteps = [
  {
    title: 'Welcome to CHIRP Radio',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "We're excited to have you here! CHIRP Radio is Chicago's independent voice, and now you're part of our community.",
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    featureIdentifier: 'welcome',
    order: 1,
    platform: 'both',
    isActive: true,
  },
  {
    title: 'Complete Your Profile',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Add a profile photo, update your bio, and let the CHIRP community get to know you better. Click on your name in the top right to visit your profile page.',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    featureIdentifier: 'profile',
    order: 2,
    platform: 'both',
    isActive: true,
    ctaText: 'Go to Profile',
  },
  {
    title: 'Start Building Your Collection',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'As you listen to CHIRP Radio, you can save your favorite tracks to your collection. Just tap the heart icon on any track to add it!',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    featureIdentifier: 'collection',
    order: 3,
    platform: 'both',
    isActive: true,
  },
  {
    title: 'Explore CHIRP Content',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Check out our weekly charts, DJ profiles, and curated playlists. There's always something new to discover on CHIRP Radio.",
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    featureIdentifier: 'explore-features',
    order: 4,
    platform: 'both',
    isActive: true,
  },
  {
    title: 'Support Independent Radio',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'CHIRP Radio is a volunteer-run, community-supported station. Consider becoming a member or shopping in our store to help keep independent radio alive!',
              },
            ],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    featureIdentifier: 'support',
    order: 5,
    platform: 'both',
    isActive: true,
    ctaText: 'Learn More',
  },
]

async function seedOnboardingSteps() {
  const cmsUrl = 'http://localhost:3000'

  console.log('🌱 Seeding onboarding steps via HTTP...\n')

  try {
    // First, delete any existing onboarding steps
    const existingResponse = await fetch(`${cmsUrl}/api/onboarding?limit=100`)
    const existingData = await existingResponse.json()

    if (existingData.docs && existingData.docs.length > 0) {
      console.log(`🗑️  Deleting ${existingData.docs.length} existing onboarding steps...`)
      for (const doc of existingData.docs) {
        await fetch(`${cmsUrl}/api/onboarding/${doc.id}`, {
          method: 'DELETE',
        })
      }
      console.log('✓ Existing steps deleted\n')
    }

    // Create new onboarding steps
    for (const step of onboardingSteps) {
      const response = await fetch(`${cmsUrl}/api/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(step),
      })

      if (response.ok) {
        console.log(`✅ Created: ${step.title}`)
      } else {
        const errorText = await response.text()
        console.error(`❌ Failed to create "${step.title}" (${response.status}):`, errorText)
      }
    }

    console.log('\n✨ Onboarding steps seeded successfully!')
  } catch (error: any) {
    console.error('❌ Error seeding onboarding steps:', error.message)
    process.exit(1)
  }
}

seedOnboardingSteps()
