// Seed data for Mobile Page Content and Mobile App Settings
// Run this after the CMS server is started to populate initial content

import type { Payload } from 'payload'

export async function seedMobileContent(payload: Payload): Promise<void> {
  console.log('Seeding Mobile Content...')

  // 1. Create Mobile App Settings (Global)
  try {
    const existingSettings = await payload.findGlobal({
      slug: 'mobileAppSettings',
    })

    if (!existingSettings) {
      await payload.updateGlobal({
        slug: 'mobileAppSettings',
        data: {
          notLoggedInMessage: {
            title: 'Login Required',
            message: {
              root: {
                type: 'root',
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'You need to be logged in to access this feature. This helps us provide a better experience and keep track of your preferences.',
                      },
                    ],
                  },
                ],
              },
            },
            loginButtonText: 'log in',
            signupButtonText: 'sign up',
          },
          loginModal: {
            loginMessage: {
              root: {
                type: 'root',
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Log in to your CHIRP Radio listener account to add songs to your collection.',
                      },
                    ],
                  },
                ],
              },
            },
            signupMessage: {
              root: {
                type: 'root',
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Create a CHIRP Radio listener account to save songs to your collection and more.',
                      },
                    ],
                  },
                ],
              },
            },
          },
          accountBenefits: {
            title: 'Benefits of Creating an Account:',
            benefits: [
              { benefit: 'Save your favorite songs from our live stream to your personal collection' },
              { benefit: 'Make song requests directly to our DJs during their shows' },
              { benefit: 'Access your saved tracks across web and mobile apps' },
              { benefit: 'Save your information for store purchases and donations' },
              { benefit: 'Sync your preferences and settings between devices' },
              { benefit: 'Get personalized recommendations based on your listening history' },
              { benefit: 'Receive updates about upcoming shows and events' },
            ],
          },
        },
      })
      console.log('✓ Mobile App Settings created')
    } else {
      console.log('✓ Mobile App Settings already exists')
    }
  } catch (error) {
    console.error('Error creating Mobile App Settings:', error)
  }

  // 2. Create Mobile Page Content - Make Request
  try {
    const existingMakeRequest = await payload.find({
      collection: 'mobilePageContent',
      where: {
        pageIdentifier: {
          equals: 'make-request',
        },
      },
    })

    if (existingMakeRequest.docs.length === 0) {
      await payload.create({
        collection: 'mobilePageContent',
        data: {
          pageIdentifier: 'make-request',
          pageTitle: 'Make a Song Request',
          customNotLoggedInMessage: {
            root: {
              type: 'root',
              version: 1,
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'You need to be logged in to make a song request. This helps us know who the request is coming from and ensures a better experience for everyone.',
                    },
                  ],
                },
              ],
            },
          },
          isLoginRequired: true,
          isActive: true,
        },
      })
      console.log('✓ Make Request page content created')
    } else {
      console.log('✓ Make Request page content already exists')
    }
  } catch (error) {
    console.error('Error creating Make Request content:', error)
  }

  // 3. Create Mobile Page Content - Your Collection
  try {
    const existingCollection = await payload.find({
      collection: 'mobilePageContent',
      where: {
        pageIdentifier: {
          equals: 'my-collection',
        },
      },
    })

    if (existingCollection.docs.length === 0) {
      await payload.create({
        collection: 'mobilePageContent',
        data: {
          pageIdentifier: 'my-collection',
          pageTitle: 'Your Collection',
          customNotLoggedInMessage: {
            root: {
              type: 'root',
              version: 1,
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'A profile allows you to interact with the site in all sorts of helpful ways. Create your profile today, and start getting the maximum benefit from CHIRPradio.org!',
                    },
                  ],
                },
              ],
            },
          },
          isLoginRequired: true,
          isActive: true,
        },
      })
      console.log('✓ Your Collection page content created')
    } else {
      console.log('✓ Your Collection page content already exists')
    }
  } catch (error) {
    console.error('Error creating Your Collection content:', error)
  }

  console.log('Mobile Content seeding complete!')
}
